"use client"

import { Product, Profile, Order, Review } from "./supabase"

// Types
export interface SellerApplication {
    id: string
    userId: string
    fullName: string
    email: string
    businessName: string
    category: string
    bio: string
    status: "pending" | "approved" | "rejected"
    submittedAt: string
}

export type MockDB = {
    users: Profile[]
    products: Product[]
    orders: Order[]
    reviews: Review[]
    applications: SellerApplication[]
    messages: ContactMessage[]
}

export interface ContactMessage {
    id: string
    name: string
    email: string
    subject: string
    category: string
    message: string
    createdAt: string
}

// Seed Data
const SEED_DATA: MockDB = {
    users: [
        {
            id: "admin-user",
            email: "shourya-admin.digitera@gmail.com",
            full_name: "Shourya Admin",
            role: "admin",
            is_verified: true,
            username: "admin_shourya",
            avatar_url: "https://i.pravatar.cc/150?u=admin",
            total_earnings: 0,
            total_products: 0,
            total_sales: 0,
            rating: 5,
            bio: "Platform Administrator",
            company: "Digitera",
            location: "San Francisco, CA",
            website: "https://digitera.com",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            github_url: "",
            twitter_url: "",
            linkedin_url: "",
        },
        {
            id: "creator-1",
            email: "trade@master.com",
            full_name: "TradeMaster",
            role: "creator",
            is_verified: true,
            username: "trademaster",
            avatar_url: "https://i.pravatar.cc/150?u=trade",
            total_earnings: 15400,
            total_products: 5,
            total_sales: 450,
            rating: 4.8,
            bio: "Expert in trading algorithms and financial tools.",
            company: "Trade Systems Inc.",
            location: "New York, NY",
            website: "https://tradesystems.com",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            github_url: "",
            twitter_url: "",
            linkedin_url: "",
        },
        {
            id: "creator-2",
            email: "neon@design.com",
            full_name: "NeonDesigner",
            role: "creator",
            is_verified: true,
            username: "neondesigner",
            avatar_url: "https://i.pravatar.cc/150?u=neon",
            total_earnings: 8900,
            total_products: 12,
            total_sales: 320,
            rating: 4.9,
            bio: "Creating vibrant and modern UI kits for developers.",
            company: "Neon Studios",
            location: "Berlin, Germany",
            website: "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            github_url: "",
            twitter_url: "",
            linkedin_url: "",
        }
    ],
    products: [
        {
            id: "prod-1",
            title: "Advanced Trading System",
            slug: "advanced-trading-system",
            description: "A complete trading system with GUI and database integration. Perfect for roleplay servers.",
            price: 34.99,
            creator_id: "creator-1",
            thumbnail_url: "https://images.unsplash.com/photo-1611974765275-fa4c03b87913?w=800&q=80",
            category_id: "scripts",
            status: "approved", // Changed to approved to show up in real list
            is_featured: true,
            views: 1240,
            sales_count: 85,
            rating: 4.8,
            review_count: 12,
            created_at: "2024-01-20T10:00:00Z",
            updated_at: "2024-01-20T10:00:00Z",
            tags: ["trading", "gui", "script"],
            gallery_urls: [],
            pricing_type: "one_time",
            subscription_interval: null,
            short_description: "Complete trading system with GUI",
            compare_price: 49.99,
            rejection_reason: null,
            downloads: 0
        },
        {
            id: "prod-2",
            title: "Neon UI Kit",
            slug: "neon-ui-kit",
            description: "Modern neon-themed UI components with smooth animations and responsive design.",
            price: 19.99,
            creator_id: "creator-2",
            thumbnail_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
            category_id: "ui",
            status: "approved",
            is_featured: true,
            views: 890,
            sales_count: 45,
            rating: 4.9,
            review_count: 8,
            created_at: "2024-01-19T14:30:00Z",
            updated_at: "2024-01-19T14:30:00Z",
            tags: ["ui", "neon", "modern"],
            gallery_urls: [],
            pricing_type: "one_time",
            subscription_interval: null,
            short_description: "Modern neon-themed UI components",
            compare_price: null,
            rejection_reason: null,
            downloads: 0
        },
        {
            id: "prod-3",
            title: "Battle Royale Template",
            slug: "battle-royale-template",
            description: "Full game template for Battle Royale style games. Includes map, weapons, and lobby.",
            price: 89.99,
            creator_id: "creator-1",
            thumbnail_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
            category_id: "templates",
            status: "approved",
            is_featured: false,
            views: 2100,
            sales_count: 24,
            rating: 4.5,
            review_count: 15,
            created_at: "2024-01-18T09:15:00Z",
            updated_at: "2024-01-18T09:15:00Z",
            tags: ["game", "template", "fps"],
            gallery_urls: [],
            pricing_type: "one_time",
            subscription_interval: null,
            short_description: "Full game template for Battle Royale",
            compare_price: 129.99,
            rejection_reason: null,
            downloads: 0
        },
        {
            id: "prod-4",
            title: "Modern Admin Panel",
            slug: "modern-admin-panel",
            description: "Comprehensive administration dashboard for managing users and content.",
            price: 15.99,
            creator_id: "creator-2",
            thumbnail_url: "https://file.garden/aU4n1IV5_n1pLO-4/Videoshot_20251023_201147.jpg",
            category_id: "ui",
            status: "pending",
            is_featured: false,
            views: 45,
            sales_count: 0,
            rating: 0,
            review_count: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            tags: ["admin", "dashboard", "ui"],
            gallery_urls: [],
            pricing_type: "one_time",
            subscription_interval: null,
            short_description: "Comprehensive administration dashboard",
            compare_price: null,
            rejection_reason: null,
            downloads: 0
        }
    ],
    orders: [],
    reviews: [
        {
            id: "rev-1",
            user_id: "user-1",
            rating: 5,
            content: "Amazing quality! Saved me weeks of development time.",
            title: "Amazing!",
            created_at: new Date("2024-02-15").toISOString(),
            updated_at: new Date("2024-02-15").toISOString(),
            helpful_count: 12,
            product_id: "prod-1",
            order_id: "ord-1",
            is_verified_purchase: true
        },
        {
            id: "rev-2",
            user_id: "user-2",
            rating: 4,
            content: "Great product, well documented. Minor issues with setup but support was helpful.",
            title: "Good but needs docs",
            created_at: new Date("2024-02-10").toISOString(),
            updated_at: new Date("2024-02-10").toISOString(),
            helpful_count: 8,
            product_id: "prod-1",
            order_id: "ord-2",
            is_verified_purchase: true
        }
    ],
    applications: [
        {
            id: "app-1",
            userId: "user-application-1",
            fullName: "Alex Code",
            email: "alex@codefactory.com",
            businessName: "CodeFactory",
            category: "Scripts",
            bio: "I make high quality scripts for roleplay servers.",
            status: "pending",
            submittedAt: "2024-01-22"
        }
    ],
    messages: []
}
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
