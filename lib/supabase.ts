import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          username: string | null
          avatar_url: string | null
          bio: string | null
          company: string | null
          location: string | null
          website: string | null
          github_url: string | null
          twitter_url: string | null
          linkedin_url: string | null
          created_at: string
          updated_at: string
          role: "user" | "creator" | "admin"
          is_verified: boolean
          total_earnings: number
          total_products: number
          total_sales: number
          rating: number
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          location?: string | null
          website?: string | null
          github_url?: string | null
          twitter_url?: string | null
          linkedin_url?: string | null
          role?: "user" | "creator" | "admin"
          is_verified?: boolean
          total_earnings?: number
          total_products?: number
          total_sales?: number
          rating?: number
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          location?: string | null
          website?: string | null
          github_url?: string | null
          twitter_url?: string | null
          linkedin_url?: string | null
          role?: "user" | "creator" | "admin"
          is_verified?: boolean
          total_earnings?: number
          total_products?: number
          total_sales?: number
          rating?: number
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          parent_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          parent_id?: string | null
        }
        Update: {
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          parent_id?: string | null
        }
      }
      products: {
        Row: {
          id: string
          creator_id: string
          title: string
          slug: string
          description: string
          short_description: string | null
          price: number
          compare_price: number | null
          pricing_type: "one_time" | "subscription" | "free"
          subscription_interval: "monthly" | "yearly" | null
          category_id: string | null
          tags: string[]
          thumbnail_url: string | null
          gallery_urls: string[]
          status: "draft" | "pending" | "approved" | "rejected" | "archived"
          rejection_reason: string | null
          is_featured: boolean
          views: number
          downloads: number
          sales_count: number
          rating: number
          review_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          creator_id: string
          title: string
          slug: string
          description: string
          short_description?: string | null
          price: number
          compare_price?: number | null
          pricing_type?: "one_time" | "subscription" | "free"
          subscription_interval?: "monthly" | "yearly" | null
          category_id?: string | null
          tags?: string[]
          thumbnail_url?: string | null
          gallery_urls?: string[]
          status?: "draft" | "pending" | "approved" | "rejected" | "archived"
          is_featured?: boolean
        }
        Update: {
          title?: string
          slug?: string
          description?: string
          short_description?: string | null
          price?: number
          compare_price?: number | null
          pricing_type?: "one_time" | "subscription" | "free"
          subscription_interval?: "monthly" | "yearly" | null
          category_id?: string | null
          tags?: string[]
          thumbnail_url?: string | null
          gallery_urls?: string[]
          status?: "draft" | "pending" | "approved" | "rejected" | "archived"
          rejection_reason?: string | null
          is_featured?: boolean
          views?: number
          downloads?: number
          sales_count?: number
          rating?: number
          review_count?: number
        }
      }
      digital_files: {
        Row: {
          id: string
          product_id: string
          file_name: string
          file_url: string
          file_size: number
          file_type: string
          version: string | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          file_name: string
          file_url: string
          file_size: number
          file_type: string
          version?: string | null
        }
        Update: {
          file_name?: string
          file_url?: string
          file_size?: number
          file_type?: string
          version?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          buyer_id: string
          seller_id: string
          product_id: string
          amount: number
          platform_fee: number
          seller_amount: number
          status: "pending" | "completed" | "refunded" | "disputed"
          payment_method: string | null
          payment_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          buyer_id: string
          seller_id: string
          product_id: string
          amount: number
          platform_fee: number
          seller_amount: number
          status?: "pending" | "completed" | "refunded" | "disputed"
          payment_method?: string | null
          payment_id?: string | null
        }
        Update: {
          status?: "pending" | "completed" | "refunded" | "disputed"
          payment_method?: string | null
          payment_id?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          product_id: string
          user_id: string
          order_id: string
          rating: number
          title: string | null
          content: string | null
          is_verified_purchase: boolean
          helpful_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          user_id: string
          order_id: string
          rating: number
          title?: string | null
          content?: string | null
          is_verified_purchase?: boolean
        }
        Update: {
          rating?: number
          title?: string | null
          content?: string | null
          helpful_count?: number
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          quantity: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          quantity?: number
        }
        Update: {
          quantity?: number
        }
      }
      wishlists: {
        Row: {
          id: string
          user_id: string
          product_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
        }
        Update: {}
      }
      payouts: {
        Row: {
          id: string
          creator_id: string
          amount: number
          status: "pending" | "processing" | "completed" | "failed"
          payout_method: string
          payout_details: string | null
          processed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          creator_id: string
          amount: number
          status?: "pending" | "processing" | "completed" | "failed"
          payout_method: string
          payout_details?: string | null
        }
        Update: {
          status?: "pending" | "processing" | "completed" | "failed"
          processed_at?: string | null
        }
      }
      disputes: {
        Row: {
          id: string
          order_id: string
          initiated_by: string
          reason: string
          description: string
          status: "open" | "under_review" | "resolved" | "closed"
          resolution: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          initiated_by: string
          reason: string
          description: string
          status?: "open" | "under_review" | "resolved" | "closed"
        }
        Update: {
          status?: "open" | "under_review" | "resolved" | "closed"
          resolution?: string | null
        }
      }
    }
  }
}

// Helper types for easier usage
export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type Category = Database["public"]["Tables"]["categories"]["Row"]
export type Product = Database["public"]["Tables"]["products"]["Row"]
export type DigitalFile = Database["public"]["Tables"]["digital_files"]["Row"]
export type Order = Database["public"]["Tables"]["orders"]["Row"]
export type Review = Database["public"]["Tables"]["reviews"]["Row"]
export type CartItem = Database["public"]["Tables"]["cart_items"]["Row"]
export type Wishlist = Database["public"]["Tables"]["wishlists"]["Row"]
export type Payout = Database["public"]["Tables"]["payouts"]["Row"]
export type Dispute = Database["public"]["Tables"]["disputes"]["Row"]
