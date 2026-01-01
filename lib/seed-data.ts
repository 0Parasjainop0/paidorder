import type { Product, Profile, Order, Review } from "./supabase"

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
    products: [],
    orders: [],
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
