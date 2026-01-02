import type { Product, Profile, Order, Review } from "./supabase"
import { subDays } from "date-fns"

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
export const SEED_DATA: MockDB = {
    users: [
        {
            id: "admin-user",
            email: "shourya-admin.digiteria@gmail.com",
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
            company: "Digiteria",
            location: "San Francisco, CA",
            website: "https://digiteria.com",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            github_url: "",
            twitter_url: "",
            linkedin_url: "",
            stripe_account_id: null,
        },
        {
            id: "trade-master",
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
            stripe_account_id: "acct_test_123",
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
            stripe_account_id: null,
        }
    ],
    products: [
        {
            id: "prod-1",
            creator_id: "trade-master",
            title: "Advanced Trading Bot",
            description: "A professional trading bot for crypto and stocks.",
            short_description: "Best trading bot in the market.",
            price: 49.99,
            compare_price: 99.99,
            pricing_type: "one_time",
            subscription_interval: null,
            category_id: "Code",
            tags: ["trading", "bot", "crypto"],
            status: "approved",
            rejection_reason: null,
            is_featured: true,
            views: 1240,
            downloads: 45,
            sales_count: 45,
            rating: 4.8,
            review_count: 5,
            thumbnail_url: "https://images.unsplash.com/photo-1611974717482-480928d74ccb?q=80&w=2670&auto=format&fit=crop",
            gallery_urls: [],
            slug: "trading-bot",
            created_at: subDays(new Date(), 10).toISOString(),
            updated_at: new Date().toISOString(),
            file_url: null,
            file_name: null,
            file_size: null
        },
        {
            id: "prod-2",
            creator_id: "trade-master",
            title: "SaaS Dashboard Template",
            description: "Modern UI kit for SaaS applications.",
            short_description: "Modern UI kit for SaaS.",
            price: 29.99,
            compare_price: 59.99,
            pricing_type: "one_time",
            subscription_interval: null,
            category_id: "Templates",
            tags: ["saas", "dashboard", "ui"],
            status: "approved",
            rejection_reason: null,
            is_featured: false,
            views: 850,
            downloads: 28,
            sales_count: 28,
            rating: 4.9,
            review_count: 3,
            thumbnail_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
            gallery_urls: [],
            slug: "saas-dashboard",
            created_at: subDays(new Date(), 5).toISOString(),
            updated_at: new Date().toISOString(),
            file_url: null,
            file_name: null,
            file_size: null
        }
    ],
    orders: [
        {
            id: "ord-1",
            order_number: "ORD-001",
            buyer_id: "user-1",
            seller_id: "trade-master",
            product_id: "prod-1",
            amount: 49.99,
            platform_fee: 4.99,
            seller_amount: 45.00,
            status: "completed",
            created_at: subDays(new Date(), 1).toISOString(),
            updated_at: subDays(new Date(), 1).toISOString(),
            payment_method: "stripe",
            payment_id: "pi_123"
        },
        {
            id: "ord-2",
            order_number: "ORD-002",
            buyer_id: "user-2",
            seller_id: "trade-master",
            product_id: "prod-1",
            amount: 49.99,
            platform_fee: 4.99,
            seller_amount: 45.00,
            status: "completed",
            created_at: subDays(new Date(), 2).toISOString(),
            updated_at: subDays(new Date(), 2).toISOString(),
            payment_method: "stripe",
            payment_id: "pi_124"
        },
        {
            id: "ord-3",
            order_number: "ORD-003",
            buyer_id: "user-3",
            seller_id: "trade-master",
            product_id: "prod-2",
            amount: 29.99,
            platform_fee: 2.99,
            seller_amount: 27.00,
            status: "completed",
            created_at: subDays(new Date(), 0).toISOString(),
            updated_at: subDays(new Date(), 0).toISOString(),
            payment_method: "stripe",
            payment_id: "pi_125"
        }
    ],
    reviews: [],
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
