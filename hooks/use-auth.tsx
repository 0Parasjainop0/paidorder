"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/lib/supabase"
import { mockDb } from "@/lib/mock-db"
import { sendWelcomeEmail } from "@/lib/email-service"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>
  signInWithGoogle: () => Promise<{ error: any }>
  signInWithDiscord: () => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// SET THIS TO FALSE TO USE REAL SUPABASE AUTH
const MOCK_MODE = false

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // Helper to create a mock user object compliant with Supabase User type
  const createMockUser = (email: string, data: any = {}): User => ({
    id: "mock-user-id-" + Math.random().toString(36).substring(7),
    app_metadata: {},
    user_metadata: { ...data },
    aud: "authenticated",
    created_at: new Date().toISOString(),
    email: email,
    phone: "",
    confirmed_at: new Date().toISOString(),
    email_confirmed_at: new Date().toISOString(),
    last_sign_in_at: new Date().toISOString(),
    role: "authenticated",
    updated_at: new Date().toISOString(),
    identities: [],
    factors: [],
  })

  useEffect(() => {
    if (MOCK_MODE) {
      const syncProfile = () => {
        const storedUser = localStorage.getItem("mock_user")
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser)
            const dbUser = mockDb.getUser(parsedUser.id) || mockDb.getUsers().find(u => u.email === parsedUser.email)
            if (dbUser) {
              setProfile(dbUser)
              // Also sync session/user if needed, though they are usually static
              setUser(prev => prev ? { ...prev, user_metadata: { ...prev.user_metadata, ...dbUser } } : parsedUser)
            }
          } catch (e) {
            console.error("Failed to sync mock profile", e)
          }
        }
      }

      // Initial Load
      const storedUser = localStorage.getItem("mock_user")
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          const dbUser = mockDb.getUser(parsedUser.id) || mockDb.getUsers().find(u => u.email === parsedUser.email)
          if (dbUser) {
            setUser(parsedUser)
            setProfile(dbUser)
          } else {
            setUser(parsedUser)
            setProfile({
              id: parsedUser.id,
              email: parsedUser.email!,
              full_name: parsedUser.user_metadata?.full_name || "Mock User",
              role: "user",
              is_verified: false,
              username: "user",
              avatar_url: null,
              total_earnings: 0,
              total_products: 0,
              total_sales: 0,
              rating: 0,
              bio: null,
              company: null,
              location: null,
              website: null,
              github_url: null,
              twitter_url: null,
              linkedin_url: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              stripe_account_id: null,
            })
          }
        } catch (e) {
          console.error("Failed to parse mock user", e)
          localStorage.removeItem("mock_user")
        }
      }
      setLoading(false)

      // Subscribe to changes
      return mockDb.subscribe(syncProfile)
    }

    // --- REAL SUPABASE LOGIC BELOW ---

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    const { subscription } = data

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const fetchProfile = async (userId: string) => {
    if (MOCK_MODE) {
      // Already handled in useEffect for initial load
      return
    }
    try {
      console.log("[Auth] Fetching profile for user:", userId)
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      console.log("[Auth] Profile fetch result:", { data, error })

      if (error && error.code === "PGRST116") {
        // Profile doesn't exist, create one
        console.log("[Auth] Profile not found, creating new profile...")
        const { data: userData } = await supabase.auth.getUser()
        if (userData.user) {
          const newProfile = {
            id: userData.user.id,
            email: userData.user.email!,
            full_name: userData.user.user_metadata?.full_name || null,
            username: userData.user.user_metadata?.username || null,
            avatar_url: userData.user.user_metadata?.avatar_url || null,
            role: "user",
            is_verified: false,
          }

          console.log("[Auth] Creating profile:", newProfile)
          const { data: createdProfile, error: createError } = await supabase
            .from("profiles")
            .insert(newProfile)
            .select()
            .single()

          if (createError) {
            console.error("[Auth] Error creating profile:", createError)
          } else {
            console.log("[Auth] Profile created:", createdProfile)
            // Add default values for missing columns
            setProfile({
              ...createdProfile,
              total_earnings: createdProfile.total_earnings || 0,
              total_products: createdProfile.total_products || 0,
              total_sales: createdProfile.total_sales || 0,
              rating: createdProfile.rating || 0,
            })
          }
        }
      } else if (error) {
        console.error("[Auth] Error fetching profile:", error)
      } else if (data) {
        // Add default values for missing columns
        setProfile({
          ...data,
          total_earnings: data.total_earnings || 0,
          total_products: data.total_products || 0,
          total_sales: data.total_sales || 0,
          rating: data.rating || 0,
        })
      }
    } catch (error) {
      console.error("[Auth] Exception fetching profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Check if user has signed up (credentials exist)
      const hasCredential = mockDb.getCredential(email)
      if (!hasCredential) {
        return { error: { message: "No account found with this email. Please sign up first." } }
      }

      // Validate password
      const isValidPassword = mockDb.validateCredential(email, password)
      if (!isValidPassword) {
        return { error: { message: "Invalid password. Please try again." } }
      }

      // Get user from database
      const dbUser = mockDb.getUsers().find(u => u.email === email)
      if (!dbUser) {
        return { error: { message: "Account error. Please contact support." } }
      }

      // Create mock user object
      const mockUser = createMockUser(email, { full_name: dbUser.full_name })
      mockUser.id = dbUser.id

      setUser(mockUser)
      setProfile(dbUser)
      localStorage.setItem("mock_user", JSON.stringify(mockUser))
      return { error: null }
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Check if account already exists
      const existingCredential = mockDb.getCredential(email)
      if (existingCredential) {
        return { error: { message: "An account with this email already exists. Please sign in." } }
      }

      // Store credentials
      mockDb.addCredential(email, password)

      const userId = "user-" + Math.random().toString(36).substr(2, 9)
      const mockUser = createMockUser(email, userData)
      mockUser.id = userId

      // All new users start as regular users
      const role: "user" | "creator" | "admin" = "user"

      const mockProfile: Profile = {
        id: userId,
        email: email,
        full_name: userData.full_name || "New User",
        username: userData.username || "newuser",
        avatar_url: null,
        role: role,
        is_verified: false,
        total_earnings: 0,
        total_products: 0,
        total_sales: 0,
        rating: 0,
        bio: null,
        company: null,
        location: null,
        website: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        github_url: null,
        twitter_url: null,
        linkedin_url: null,
        stripe_account_id: null,
      }

      mockDb.ensureUserExists(mockProfile)

      setUser(mockUser)
      setProfile(mockProfile)
      localStorage.setItem("mock_user", JSON.stringify(mockUser))

      return { error: null }
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    })

    // Send welcome email on successful signup
    if (!error) {
      try {
        await sendWelcomeEmail(email, userData?.full_name)
        console.log("[Auth] Welcome email sent to:", email)
      } catch (emailError) {
        console.error("[Auth] Failed to send welcome email:", emailError)
        // Don't fail signup if email fails
      }
    }

    return { error }
  }

  const signOut = async () => {
    if (MOCK_MODE) {
      setUser(null)
      setProfile(null)
      setSession(null)
      localStorage.removeItem("mock_user")
      return
    }
    await supabase.auth.signOut()
  }

  const signInWithGoogle = async () => {
    if (MOCK_MODE) {
      return { error: { message: "OAuth not available in mock mode" } }
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    return { error }
  }

  const signInWithDiscord = async () => {
    if (MOCK_MODE) {
      return { error: { message: "OAuth not available in mock mode" } }
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    return { error }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (MOCK_MODE) {
      if (!user) return { error: "No user logged in" }

      const updatedProfile = mockDb.updateUser(user.id, updates)
      if (updatedProfile) {
        setProfile(updatedProfile)
        return { error: null }
      } else {
        return { error: "Failed to update profile" }
      }
    }

    if (!user) return { error: "No user logged in" }

    const { error } = await supabase
      .from("profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", user.id)

    if (!error) {
      setProfile((prev) => (prev ? { ...prev, ...updates } : null))
    }

    return { error }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        signInWithGoogle,
        signInWithDiscord,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
