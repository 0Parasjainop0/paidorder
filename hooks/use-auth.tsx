"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/lib/supabase"
import { mockDb } from "@/lib/mock-db"

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// SET THIS TO FALSE TO USE REAL SUPABASE AUTH
const MOCK_MODE = true

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
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error && error.code === "PGRST116") {
        // Profile doesn't exist, create one
        const { data: userData } = await supabase.auth.getUser()
        if (userData.user) {
          const newProfile = {
            id: userData.user.id,
            email: userData.user.email!,
            full_name: userData.user.user_metadata?.full_name || null,
            username: userData.user.user_metadata?.username || null,
            avatar_url: userData.user.user_metadata?.avatar_url || null,
            role: "user" as const,
            is_verified: false,
            total_earnings: 0,
            total_products: 0,
            total_sales: 0,
            rating: 0,
          }

          const { data: createdProfile, error: createError } = await supabase
            .from("profiles")
            .insert(newProfile)
            .select()
            .single()

          if (!createError) {
            setProfile(createdProfile)
          }
        }
      } else if (!error) {
        setProfile(data)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const dbUser = mockDb.getUsers().find(u => u.email === email)

      let mockUser: User
      let mockProfile: Profile

      if (dbUser) {
        // Use existing user from DB

        // STRICT ADMIN AUTH CHECK FOR EXISTING USER
        if (dbUser.role === "admin") {
          if (email !== "shourya-admin.digiteria@gmail.com" || password !== "shourya91mcDigiteria") {
            return { error: { message: "Invalid admin credentials" } }
          }
        }

        mockUser = createMockUser(email, { full_name: dbUser.full_name })
        mockUser.id = dbUser.id // Important: keep ID consistent
        mockProfile = dbUser
      } else {
        // Create new user if not found
        const userId = "user-" + Math.random().toString(36).substr(2, 9)
        mockUser = createMockUser(email, { full_name: "Demo User" })
        mockUser.id = userId

        // Determine role based on strict admin check
        let role: "user" | "creator" | "admin" = "user"
        if (email === "shourya-admin.digiteria@gmail.com" && password === "shourya91mcDigiteria") {
          role = "admin"
        } else if (email.includes("creator")) {
          role = "creator"
        }

        mockProfile = {
          id: userId,
          email: email,
          full_name: "Demo User",
          username: "demouser",
          avatar_url: null,
          role: role,
          is_verified: role !== "user",
          total_earnings: role === "creator" ? 1250.00 : 0,
          total_products: role === "creator" ? 5 : 0,
          total_sales: role === "creator" ? 12 : 0,
          rating: 5.0,
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
        }

        // Save to DB
        mockDb.ensureUserExists(mockProfile)
      }

      setUser(mockUser)
      setProfile(mockProfile)
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

      const userId = "user-" + Math.random().toString(36).substr(2, 9)
      const mockUser = createMockUser(email, userData)
      mockUser.id = userId

      // Determine role
      let role: "user" | "creator" | "admin" = "user"
      if (email.includes("admin")) role = "admin"
      else if (email.includes("creator")) role = "creator"

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
