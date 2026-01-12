"use client"

import { supabase } from "./supabase"
import type { Product, Profile, Order, Review } from "./supabase"

// Types for seller applications and contact messages
export interface SellerApplication {
    id: string
    user_id: string
    email: string
    business_name: string
    bio: string
    portfolio_url: string | null
    status: "pending" | "approved" | "rejected"
    created_at: string
}

export interface ContactMessage {
    id: string
    name: string
    email: string
    subject: string
    message: string
    created_at: string
}

/**
 * Supabase Database Service
 * Replaces mockDb with real Supabase operations
 */
class SupabaseDatabase {
    // ============================================
    // PRODUCTS
    // ============================================

    async getProducts(): Promise<Product[]> {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false })

        if (error) {
            console.error("[SupabaseDB] Error fetching products:", error)
            return []
        }
        return data || []
    }

    async getApprovedProducts(): Promise<Product[]> {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("status", "approved")
            .order("created_at", { ascending: false })

        if (error) {
            console.error("[SupabaseDB] Error fetching approved products:", error)
            return []
        }
        return data || []
    }

    async getFeaturedProducts(): Promise<Product[]> {
        // First try to get featured products
        const { data: featured, error: featuredError } = await supabase
            .from("products")
            .select("*")
            .eq("is_featured", true)
            .eq("status", "approved")
            .order("created_at", { ascending: false })
            .limit(6)

        if (!featuredError && featured && featured.length > 0) {
            return featured
        }

        // Fallback to approved products if no featured ones
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("status", "approved")
            .order("created_at", { ascending: false })
            .limit(6)

        if (error) {
            console.error("[SupabaseDB] Error fetching featured products:", error)
            return []
        }
        return data || []
    }

    async getProduct(id: string): Promise<Product | null> {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("id", id)
            .single()

        if (error) {
            console.error("[SupabaseDB] Error fetching product:", error)
            return null
        }
        return data
    }

    async getProductBySlug(slug: string): Promise<Product | null> {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("slug", slug)
            .single()

        if (error) {
            console.error("[SupabaseDB] Error fetching product by slug:", error)
            return null
        }
        return data
    }

    async getProductsByCreator(creatorId: string): Promise<Product[]> {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("creator_id", creatorId)
            .order("created_at", { ascending: false })

        if (error) {
            console.error("[SupabaseDB] Error fetching creator products:", error)
            return []
        }
        return data || []
    }

    async addProduct(product: Partial<Product>): Promise<Product | null> {
        // Generate slug from title
        const slug = product.title
            ? product.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Date.now()
            : "product-" + Date.now()

        const newProduct = {
            ...product,
            slug,
            views: 0,
            sales_count: 0,
            downloads: 0,
            rating: 0,
            review_count: 0,
            is_featured: false,
            status: product.status || "pending",
            tags: product.tags || [],
            gallery_urls: product.gallery_urls || [],
        }

        const { data, error } = await supabase
            .from("products")
            .insert(newProduct)
            .select()
            .single()

        if (error) {
            console.error("[SupabaseDB] Error adding product:", error)
            return null
        }
        return data
    }

    async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
        const { data, error } = await supabase
            .from("products")
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq("id", id)
            .select()
            .single()

        if (error) {
            console.error("[SupabaseDB] Error updating product:", error)
            return null
        }
        return data
    }

    async deleteProduct(id: string): Promise<boolean> {
        const { error } = await supabase.from("products").delete().eq("id", id)

        if (error) {
            console.error("[SupabaseDB] Error deleting product:", error)
            return false
        }
        return true
    }

    async incrementProductViews(id: string): Promise<void> {
        const { error } = await supabase.rpc("increment_product_views", { product_id: id })
        if (error) {
            // Fallback: manual update
            const product = await this.getProduct(id)
            if (product) {
                await this.updateProduct(id, { views: (product.views || 0) + 1 })
            }
        }
    }

    // ============================================
    // USERS / PROFILES
    // ============================================

    async getUser(id: string): Promise<Profile | null> {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", id)
            .single()

        if (error) {
            console.error("[SupabaseDB] Error fetching user:", error)
            return null
        }
        return data
    }

    async getUserByEmail(email: string): Promise<Profile | null> {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("email", email)
            .single()

        if (error) {
            console.error("[SupabaseDB] Error fetching user by email:", error)
            return null
        }
        return data
    }

    async getUsers(): Promise<Profile[]> {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .order("created_at", { ascending: false })

        if (error) {
            console.error("[SupabaseDB] Error fetching users:", error)
            return []
        }
        return data || []
    }

    async updateUser(id: string, updates: Partial<Profile>): Promise<Profile | null> {
        const { data, error } = await supabase
            .from("profiles")
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq("id", id)
            .select()
            .single()

        if (error) {
            console.error("[SupabaseDB] Error updating user:", error)
            return null
        }
        return data
    }

    async deleteUser(id: string): Promise<boolean> {
        const { error } = await supabase.from("profiles").delete().eq("id", id)

        if (error) {
            console.error("[SupabaseDB] Error deleting user:", error)
            return false
        }
        return true
    }

    // ============================================
    // ORDERS
    // ============================================

    async getAllOrders(): Promise<Order[]> {
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .order("created_at", { ascending: false })

        if (error) {
            console.error("[SupabaseDB] Error fetching orders:", error)
            return []
        }
        return data || []
    }

    async getOrdersByUser(userId: string): Promise<Order[]> {
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("buyer_id", userId)
            .order("created_at", { ascending: false })

        if (error) {
            console.error("[SupabaseDB] Error fetching user orders:", error)
            return []
        }
        return data || []
    }

    async getOrdersBySeller(sellerId: string): Promise<Order[]> {
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("seller_id", sellerId)
            .order("created_at", { ascending: false })

        if (error) {
            console.error("[SupabaseDB] Error fetching seller orders:", error)
            return []
        }
        return data || []
    }

    async createOrder(order: Omit<Order, "id" | "created_at" | "updated_at">): Promise<Order | null> {
        const { data, error } = await supabase
            .from("orders")
            .insert(order)
            .select()
            .single()

        if (error) {
            console.error("[SupabaseDB] Error creating order:", error)
            return null
        }

        // Update product sales_count and downloads
        if (data) {
            const product = await this.getProduct(order.product_id)
            if (product) {
                await this.updateProduct(product.id, {
                    sales_count: (product.sales_count || 0) + 1,
                    downloads: (product.downloads || 0) + 1,
                })

                // Update seller stats
                const seller = await this.getUser(product.creator_id)
                if (seller) {
                    await this.updateUser(seller.id, {
                        total_sales: (seller.total_sales || 0) + 1,
                        total_earnings: (seller.total_earnings || 0) + order.seller_amount,
                    })
                }
            }
        }

        return data
    }

    // ============================================
    // REVIEWS
    // ============================================

    async getReviewsByProduct(productId: string): Promise<Review[]> {
        const { data, error } = await supabase
            .from("reviews")
            .select("*")
            .eq("product_id", productId)
            .order("created_at", { ascending: false })

        if (error) {
            console.error("[SupabaseDB] Error fetching reviews:", error)
            return []
        }
        return data || []
    }

    async addReview(review: Omit<Review, "id" | "created_at" | "updated_at">): Promise<Review | null> {
        const { data, error } = await supabase
            .from("reviews")
            .insert({ ...review, helpful_count: 0 })
            .select()
            .single()

        if (error) {
            console.error("[SupabaseDB] Error adding review:", error)
            return null
        }

        // Update product rating
        if (data) {
            const reviews = await this.getReviewsByProduct(review.product_id)
            const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
            await this.updateProduct(review.product_id, {
                rating: avgRating,
                review_count: reviews.length,
            })
        }

        return data
    }

    // ============================================
    // SELLER APPLICATIONS
    // ============================================

    async getApplications(): Promise<SellerApplication[]> {
        const { data, error } = await supabase
            .from("seller_applications")
            .select("*")
            .order("created_at", { ascending: false })

        if (error) {
            console.error("[SupabaseDB] Error fetching applications:", error)
            return []
        }
        return data || []
    }

    async createApplication(app: Omit<SellerApplication, "id" | "created_at" | "status">): Promise<SellerApplication | null> {
        const { data, error } = await supabase
            .from("seller_applications")
            .insert({ ...app, status: "pending" })
            .select()
            .single()

        if (error) {
            console.error("[SupabaseDB] Error creating application:", error)
            return null
        }
        return data
    }

    async updateApplicationStatus(id: string, status: "approved" | "rejected"): Promise<boolean> {
        const { data: app, error: fetchError } = await supabase
            .from("seller_applications")
            .select("*")
            .eq("id", id)
            .single()

        if (fetchError || !app) {
            console.error("[SupabaseDB] Error fetching application:", fetchError)
            return false
        }

        const { error } = await supabase
            .from("seller_applications")
            .update({ status })
            .eq("id", id)

        if (error) {
            console.error("[SupabaseDB] Error updating application status:", error)
            return false
        }

        // If approved, update user role to creator and send notification
        if (status === "approved") {
            const user = await this.getUserByEmail(app.email)
            if (user) {
                await this.updateUser(user.id, {
                    role: "creator",
                    company: app.business_name,
                    bio: app.bio,
                })
            }

            // Send seller approval email
            try {
                const { sendSellerApprovedEmail } = await import("./email-service")
                await sendSellerApprovedEmail(app.email, app.business_name || user?.full_name)
                console.log("[SupabaseDB] Seller approval email sent to:", app.email)
            } catch (emailError) {
                console.error("[SupabaseDB] Failed to send seller approval email:", emailError)
                // Don't fail the operation if email fails
            }
        }

        return true
    }

    // ============================================
    // CONTACT MESSAGES
    // ============================================

    async addMessage(message: Omit<ContactMessage, "id" | "created_at">): Promise<ContactMessage | null> {
        const { data, error } = await supabase
            .from("contact_messages")
            .insert(message)
            .select()
            .single()

        if (error) {
            console.error("[SupabaseDB] Error adding message:", error)
            return null
        }
        return data
    }

    async getMessages(): Promise<ContactMessage[]> {
        const { data, error } = await supabase
            .from("contact_messages")
            .select("*")
            .order("created_at", { ascending: false })

        if (error) {
            console.error("[SupabaseDB] Error fetching messages:", error)
            return []
        }
        return data || []
    }

    // ============================================
    // STATS / ANALYTICS
    // ============================================

    async getStats(): Promise<{
        activeUsers: number
        productsSold: number
        creatorEarnings: number
        avgRating: number
        totalProducts: number
    }> {
        const [usersRes, productsRes] = await Promise.all([
            supabase.from("profiles").select("id, total_earnings, total_sales"),
            supabase.from("products").select("id, sales_count, rating, status"),
        ])

        const users = usersRes.data || []
        const products = productsRes.data || []

        const activeUsers = users.length
        const productsSold = products.reduce((acc, p) => acc + (p.sales_count || 0), 0)
        const creatorEarnings = users.reduce((acc, u) => acc + ((u as any).total_earnings || 0), 0)
        const approvedProducts = products.filter(p => p.status === "approved")
        const avgRating = approvedProducts.length > 0
            ? approvedProducts.reduce((acc, p) => acc + (p.rating || 0), 0) / approvedProducts.length
            : 0
        const totalProducts = products.length

        return {
            activeUsers,
            productsSold,
            creatorEarnings,
            avgRating,
            totalProducts,
        }
    }

    // ============================================
    // FILE STORAGE (Supabase Storage)
    // ============================================

    async uploadProductFile(file: File, productId: string): Promise<string | null> {
        const fileName = `${productId}/${Date.now()}-${file.name}`
        const { data, error } = await supabase.storage
            .from("product-files")
            .upload(fileName, file)

        if (error) {
            console.error("[SupabaseDB] Error uploading file:", error)
            return null
        }

        const { data: urlData } = supabase.storage
            .from("product-files")
            .getPublicUrl(data.path)

        return urlData.publicUrl
    }

    async uploadProductThumbnail(file: File, productId: string): Promise<string | null> {
        const fileName = `thumbnails/${productId}/${Date.now()}-${file.name}`
        const { data, error } = await supabase.storage
            .from("product-images")
            .upload(fileName, file)

        if (error) {
            console.error("[SupabaseDB] Error uploading thumbnail:", error)
            return null
        }

        const { data: urlData } = supabase.storage
            .from("product-images")
            .getPublicUrl(data.path)

        return urlData.publicUrl
    }
}

// Export singleton instance
export const supabaseDb = new SupabaseDatabase()
