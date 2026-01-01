"use client"

import { Product, Profile, Order, Review } from "./supabase"

import { SEED_DATA, MockDB, SellerApplication, ContactMessage } from "./seed-data"

// Re-export types for backward compatibility if needed, or just use them
export type { MockDB, SellerApplication, ContactMessage }
class MockDatabase {
    private data: MockDB
    private listeners: (() => void)[] = []

    constructor() {
        this.data = this.loadData()
        this.setupStorageListener()
    }

    private setupStorageListener() {
        if (typeof window !== "undefined") {
            window.addEventListener('storage', (e) => {
                if (e.key === 'digitera_mock_db') {
                    this.data = this.loadData()
                    this.notifyListeners()
                }
            })
        }
    }

    private loadData(): MockDB {
        if (typeof window === "undefined") return SEED_DATA

        const stored = localStorage.getItem("digitera_mock_db")
        if (stored) {
            try {
                return JSON.parse(stored)
            } catch (e) {
                console.error("Failed to parse mock db", e)
                return SEED_DATA
            }
        }

        // Initialize persistence
        localStorage.setItem("digitera_mock_db", JSON.stringify(SEED_DATA))
        return SEED_DATA
    }

    private saveData() {
        if (typeof window !== "undefined") {
            localStorage.setItem("digitera_mock_db", JSON.stringify(this.data))
            this.notifyListeners()
        }
    }

    subscribe(listener: () => void) {
        this.listeners.push(listener)
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener)
        }
    }

    private notifyListeners() {
        this.listeners.forEach(l => l())
    }

    // --- Products ---
    getProducts() {
        return this.data.products
    }

    getProduct(id: string) {
        return this.data.products.find(p => p.id === id)
    }

    addProduct(product: Partial<Product>) {
        const newProduct = {
            ...product,
            id: `prod-${Math.random().toString(36).substr(2, 9)}`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            views: 0,
            sales_count: 0,
            rating: 0,
            review_count: 0,
            status: product.status || "pending"
        } as Product

        this.data.products.unshift(newProduct)
        this.saveData()
        return newProduct
    }

    updateProduct(id: string, updates: Partial<Product>) {
        const index = this.data.products.findIndex(p => p.id === id)
        if (index !== -1) {
            this.data.products[index] = { ...this.data.products[index], ...updates, updated_at: new Date().toISOString() }
            this.saveData()
            return this.data.products[index]
        }
        return null
    }

    deleteProduct(id: string) {
        this.data.products = this.data.products.filter(p => p.id !== id)
        this.saveData()
    }

    // --- Users ---
    getUser(id: string) {
        return this.data.users.find(u => u.id === id)
    }

    getUsers() {
        return this.data.users
    }

    updateUser(id: string, updates: Partial<Profile>) {
        const index = this.data.users.findIndex(u => u.id === id)
        if (index !== -1) {
            this.data.users[index] = { ...this.data.users[index], ...updates }
            this.saveData()
            return this.data.users[index]
        }
        return null
    }

    ensureUserExists(user: Profile) {
        const exists = this.data.users.find(u => u.email === user.email)
        if (!exists) {
            this.data.users.push(user)
            this.saveData()
        }
    }

    deleteUser(id: string) {
        this.data.users = this.data.users.filter(u => u.id !== id)
        this.saveData()
    }

    // --- Applications ---
    getApplications() {
        return this.data.applications
    }

    createApplication(app: Omit<SellerApplication, "id" | "status" | "submittedAt">) {
        const newApp: SellerApplication = {
            ...app,
            id: `app-${Math.random().toString(36).substr(2, 9)}`,
            status: "pending",
            submittedAt: new Date().toISOString().split('T')[0]
        }
        this.data.applications.unshift(newApp)
        this.saveData()
        return newApp
    }

    updateApplicationStatus(id: string, status: "approved" | "rejected") {
        const app = this.data.applications.find(a => a.id === id)
        if (app) {
            app.status = status
            this.saveData()

            if (status === "approved") {
                const user = this.data.users.find(u => u.id === app.userId)
                // Use email as fallback
                const userByEmail = this.data.users.find(u => u.email === app.email)

                if (userByEmail) {
                    userByEmail.role = "creator"
                    userByEmail.company = app.businessName
                    userByEmail.bio = app.bio
                    this.saveData()
                }
            }
        }
    }

    // --- Orders ---
    getAllOrders() {
        return this.data.orders
    }

    getOrdersByUser(userId: string) {
        return this.data.orders.filter(o => o.buyer_id === userId)
    }

    createOrder(order: Omit<Order, "id" | "status" | "created_at" | "updated_at">) {
        const newOrder: Order = {
            ...order,
            id: `ord-${Math.random().toString(36).substr(2, 9)}`,
            status: "completed",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }

        this.data.orders.unshift(newOrder)

        // Update Product Stats
        const product = this.getProduct(order.product_id)
        if (product) {
            product.sales_count = (product.sales_count || 0) + 1
            product.downloads = (product.downloads || 0) + 1
            this.updateProduct(product.id, {
                sales_count: product.sales_count,
                downloads: product.downloads
            })

            // Update Creator Stats
            const creator = this.getUser(product.creator_id)
            if (creator) {
                creator.total_sales = (creator.total_sales || 0) + 1
                creator.total_earnings = (creator.total_earnings || 0) + order.seller_amount
                this.updateUser(creator.id, {
                    total_sales: creator.total_sales,
                    total_earnings: creator.total_earnings
                })
            }
        }

        this.saveData()
        return newOrder
    }

    // --- Stats ---
    getStats() {
        const activeUsers = this.data.users.length
        const productsSold = this.data.products.reduce((acc, p) => acc + (p.sales_count || 0), 0)
        const creatorEarnings = this.data.users.reduce((acc, u) => acc + (u.total_earnings || 0), 0)
        const avgRating = this.data.products.reduce((acc, p) => acc + (p.rating || 0), 0) / (this.data.products.length || 1)

        return {
            activeUsers,
            productsSold,
            creatorEarnings,
            avgRating
        }
    }

    // --- Messages ---
    addMessage(message: Omit<ContactMessage, "id" | "createdAt">) {
        const newMessage: ContactMessage = {
            ...message,
            id: `msg-${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString()
        }
        this.data.messages = this.data.messages || [] // Safety init
        this.data.messages.unshift(newMessage)
        this.saveData()
        return newMessage
    }

    getMessages() {
        return this.data.messages || []
    }

    // --- Reviews ---
    getReviewsByProduct(productId: string) {
        return (this.data.reviews || []).filter(r => r.product_id === productId)
    }

    addReview(review: Omit<Review, "id" | "created_at" | "updated_at">) {
        const newReview: Review = {
            ...review,
            id: `rev-${Math.random().toString(36).substr(2, 9)}`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }
        this.data.reviews = this.data.reviews || []
        this.data.reviews.unshift(newReview)
        this.saveData()
        return newReview
    }
}

export const mockDb = new MockDatabase()
