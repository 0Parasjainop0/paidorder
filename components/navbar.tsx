"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun, Menu, X, Zap, User, Settings, LogOut, ShoppingCart, LayoutDashboard, Shield, Rocket, LineChart } from "lucide-react"
import { useTheme } from "next-themes"
import { AuthModal } from "@/components/auth/auth-modal"
import { SellerApplicationModal } from "@/components/auth/seller-application-modal"
import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"

interface NavbarProps {
  currentPage?: string
}

export function Navbar({ currentPage }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showSellerModal, setShowSellerModal] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<"signin" | "signup">("signin")
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, profile, signOut, loading } = useAuth()
  const { itemCount } = useCart()
  const router = useRouter()
  const pathname = usePathname()

  // Use pathname to determine active page
  const activePage = currentPage || pathname

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: "/", label: "Home" },
    { id: "/marketplace", label: "Marketplace" },
    { id: "/contact", label: "Contact" },
    { id: "/terms", label: "Terms & Policy" },
  ]

  const handleSignOut = async () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      try {
        await signOut()
        toast.success("Signed out successfully")
        router.push("/")
      } catch (error) {
        console.error("Sign out error:", error)
        toast.error("Failed to sign out")
      }
    }
  }

  const openAuthModal = (tab: "signin" | "signup") => {
    setAuthModalTab(tab)
    setShowAuthModal(true)
  }

  const isActive = (path: string) => {
    if (path === "/") return activePage === "/" || activePage === "landing"
    return activePage === path || activePage === path.replace("/", "")
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <nav className={`sticky top-4 z-50 mx-auto max-w-[90%] rounded-3xl border transition-all duration-700 ${scrolled
        ? 'border-border/60 bg-background/90 backdrop-blur-3xl shadow-2xl shadow-ambient-500/5'
        : 'border-border/40 bg-background/80 backdrop-blur-2xl shadow-xl shadow-black/10'
        }`}>
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-ambient-500/0 via-ambient-400/10 to-purple-500/0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Ambient glow behind navbar */}
        <div className={`absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-ambient-500/30 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

        <div className="px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative">
                <img src="/logo.png" alt="Digiteria Logo" className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-ambient-400/30 to-ambient-600/30 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground group-hover:text-ambient-500 dark:group-hover:text-white transition-all duration-500">
                  Digiteria
                </span>
                <span className="text-[10px] text-ambient-600 dark:text-ambient-500/70 -mt-0.5 font-mono tracking-[0.2em] uppercase group-hover:text-ambient-500 dark:group-hover:text-white/70 transition-colors">Software</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 relative">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.id}
                  className={`relative text-sm font-medium transition-all duration-300 rounded-xl px-4 py-2 overflow-hidden group ${isActive(item.id)
                    ? "bg-gradient-to-r from-ambient-100 to-ambient-50 dark:from-ambient-900/60 dark:to-ambient-950/40 text-ambient-700 dark:text-ambient-300 shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive(item.id) && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-ambient-400 to-ambient-600 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-2">
              {!loading && user && profile?.role === "user" && (
                <Button
                  onClick={() => setShowSellerModal(true)}
                  className="group bg-transparent hover:bg-gradient-to-r hover:from-ambient-100 hover:to-ambient-50 dark:hover:from-ambient-900/50 dark:hover:to-ambient-950/30 text-ambient-600 dark:text-ambient-400 border border-ambient-200/50 dark:border-ambient-800/50 rounded-xl mr-2 transition-all duration-300 hover:border-ambient-400/50 hover:shadow-lg hover:shadow-ambient-500/10"
                  size="sm"
                >
                  <Rocket className="w-4 h-4 mr-2 group-hover:rotate-12 group-hover:-translate-y-0.5 transition-transform" />
                  Start Selling
                </Button>
              )}
              {!loading && (
                <>
                  {user ? (
                    <div className="flex items-center gap-4">
                      <Link
                        href="/dashboard/profile"
                        className="relative h-9 pl-1 pr-4 rounded-full group bg-ambient-700 hover:bg-ambient-800 transition-all duration-300 shadow-lg shadow-ambient-500/20 active:scale-95 border-none flex items-center"
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-ambient-300 flex items-center justify-center text-ambient-900 font-bold text-sm shadow-sm">
                            {profile?.avatar_url ? (
                              <img src={profile.avatar_url} className="h-full w-full rounded-full object-cover" />
                            ) : (
                              <span>{profile?.full_name?.[0] || profile?.email[0].toUpperCase()}</span>
                            )}
                          </div>
                          <span className="text-xs font-bold text-white tracking-tight">Dashboard</span>
                        </div>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSignOut}
                        className="text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Sign out</span>
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        onClick={() => openAuthModal("signin")}
                        className="text-sm font-medium rounded-xl hover:bg-muted/50 transition-all duration-300"
                      >
                        Sign In
                      </Button>
                      <Button
                        onClick={() => openAuthModal("signup")}
                        className="bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-xl font-medium shadow-lg shadow-ambient-500/25 hover:shadow-ambient-500/40 transition-all duration-300 hover:scale-105 btn-shine"
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </>
              )}

              {/* Cart Button */}
              <Link
                href="/cart"
                className="relative rounded-xl hover:bg-muted/50 group transition-all duration-300 p-2"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-ambient-500 to-ambient-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-ambient-500/30 animate-scale-in-bounce">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Link>

              <div className="flex items-center space-x-1 ml-2 pl-2 border-l border-border/60">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-xl hover:bg-muted/50 group transition-all duration-300"
                >
                  <div className="relative w-4 h-4">
                    <Sun className={`w-4 h-4 absolute inset-0 transition-all duration-500 ${theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
                    <Moon className={`w-4 h-4 absolute inset-0 transition-all duration-500 ${theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
                  </div>
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <Link
                href="/cart"
                className="relative rounded-xl p-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-ambient-500 to-ambient-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-ambient-500/30">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-xl"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-xl"
              >
                <div className="relative w-4 h-4">
                  <X className={`w-4 h-4 absolute inset-0 transition-all duration-300 ${isMenuOpen ? "rotate-0 scale-100" : "rotate-90 scale-0"}`} />
                  <Menu className={`w-4 h-4 absolute inset-0 transition-all duration-300 ${isMenuOpen ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`} />
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="py-4 border-t border-border/40">
              <div className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.id}
                    href={item.id}
                    onClick={() => setIsMenuOpen(false)}
                    className={`justify-start text-sm font-medium rounded-xl px-4 py-2 animate-fade-in-up ${isActive(item.id)
                      ? "bg-gradient-to-r from-ambient-100 to-ambient-50 dark:from-ambient-900/50 dark:to-ambient-950/30 text-ambient-700 dark:text-ambient-300"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item.label}
                  </Link>
                ))}

                {!loading && (
                  <div className="flex flex-col space-y-2 pt-2 mt-2 border-t border-border/40">
                    {user ? (
                      <>
                        <Link
                          href="/dashboard/profile"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-start rounded-xl px-4 py-2 text-muted-foreground hover:text-foreground"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </Link>
                        {(profile?.role === "creator" || profile?.role === "admin") && (
                          <Link
                            href="/dashboard"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-start rounded-xl px-4 py-2 text-muted-foreground hover:text-foreground"
                          >
                            <LayoutDashboard className="w-4 h-4 mr-2" />
                            Dashboard
                          </Link>
                        )}
                        {profile?.role === "admin" && (
                          <Link
                            href="/dashboard/admin"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-start rounded-xl px-4 py-2 text-muted-foreground hover:text-foreground"
                          >
                            <Shield className="w-4 h-4 mr-2" />
                            Admin Panel
                          </Link>
                        )}
                        <Link
                          href="/dashboard/analytics"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-start rounded-xl px-4 py-2 text-muted-foreground hover:text-foreground"
                        >
                          <LineChart className="w-4 h-4 mr-2" />
                          Analytics
                        </Link>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            handleSignOut()
                            setIsMenuOpen(false)
                          }}
                          className="justify-start rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            openAuthModal("signin")
                            setIsMenuOpen(false)
                          }}
                          className="justify-start rounded-xl"
                        >
                          Sign In
                        </Button>
                        <Button
                          onClick={() => {
                            openAuthModal("signup")
                            setIsMenuOpen(false)
                          }}
                          className="justify-start bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-xl shadow-lg shadow-ambient-500/25"
                        >
                          Sign Up
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={authModalTab}
        onSuccess={() => router.push("/dashboard/profile")}
      />
      <SellerApplicationModal isOpen={showSellerModal} onClose={() => setShowSellerModal(false)} />
    </>
  )
}
