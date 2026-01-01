"use client"

import { useState, useEffect } from "react"
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

interface NavbarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showSellerModal, setShowSellerModal] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<"signin" | "signup">("signin")
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, profile, signOut, loading } = useAuth()
  const { itemCount } = useCart()

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: "landing", label: "Home" },
    { id: "marketplace", label: "Marketplace" },
    { id: "contact", label: "Contact" },
  ]

  const handleSignOut = async () => {
    await signOut()
    onNavigate("landing")
  }

  const openAuthModal = (tab: "signin" | "signup") => {
    setAuthModalTab(tab)
    setShowAuthModal(true)
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <nav className={`sticky top-4 z-50 mx-auto max-w-[90%] rounded-2xl border transition-all duration-500 ${scrolled
        ? 'border-border/60 bg-background/90 backdrop-blur-2xl shadow-xl shadow-ambient-500/5'
        : 'border-border/40 bg-background/70 backdrop-blur-xl shadow-lg shadow-black/5'
        }`}>
        {/* Gradient border effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-ambient-500/0 via-ambient-400/0 to-ambient-500/0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ padding: '1px' }} />

        <div className="px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate("landing")}>
              <div className="relative">
                <div className="w-14 h-14 bg-white dark:bg-zinc-900 rounded-xl flex items-center justify-center shadow-lg shadow-ambient-500/10 group-hover:shadow-ambient-500/25 transition-all duration-500 group-hover:scale-105 overflow-hidden border border-border/50 group-hover:border-ambient-400/50">
                  <img src="/logo.png" alt="Digiteria Logo" className="w-full h-full object-contain p-0.5" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-ambient-400 to-ambient-600 rounded-xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-ambient-600 group-hover:to-ambient-500 transition-all duration-500">
                  Digiteria
                </span>
                <span className="text-xs text-ambient-600 dark:text-ambient-400 -mt-1 font-medium opacity-80 group-hover:opacity-100 transition-opacity">Software Solutions</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 relative">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => onNavigate(item.id)}
                  className={`relative text-sm font-medium transition-all duration-300 rounded-xl px-4 py-2 overflow-hidden group ${currentPage === item.id
                    ? "bg-gradient-to-r from-ambient-100 to-ambient-50 dark:from-ambient-900/60 dark:to-ambient-950/40 text-ambient-700 dark:text-ambient-300 shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {currentPage === item.id && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-ambient-400 to-ambient-600 rounded-full" />
                  )}
                </Button>
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full group">
                          <Avatar className="h-10 w-10 border-2 border-ambient-200/50 dark:border-ambient-800/50 group-hover:border-ambient-400 transition-colors duration-300">
                            <AvatarImage src={profile?.avatar_url || ""} />
                            <AvatarFallback className="bg-gradient-to-br from-ambient-500 to-ambient-600 text-white font-medium">
                              {profile?.full_name?.[0] || profile?.email[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-ambient-400 to-ambient-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 rounded-xl border-ambient-200/50 dark:border-ambient-800/30 shadow-xl shadow-ambient-500/10" align="end" forceMount>
                        <div className="flex items-center justify-start gap-2 p-3">
                          <div className="flex flex-col space-y-1 leading-none">
                            <p className="font-medium">{profile?.full_name || "User"}</p>
                            <p className="w-[200px] truncate text-sm text-muted-foreground">{profile?.email}</p>
                          </div>
                        </div>
                        <DropdownMenuSeparator className="bg-border/50" />
                        <DropdownMenuItem onClick={() => onNavigate("profile")} className="rounded-lg mx-1 cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </DropdownMenuItem>
                        {profile?.role === "creator" && (
                          <DropdownMenuItem onClick={() => onNavigate("dashboard")} className="rounded-lg mx-1 cursor-pointer">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                          </DropdownMenuItem>
                        )}
                        {profile?.role === "admin" && (
                          <DropdownMenuItem onClick={() => onNavigate("admin")} className="rounded-lg mx-1 cursor-pointer">
                            <Shield className="mr-2 h-4 w-4" />
                            Admin Panel
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => onNavigate("analytics")} className="rounded-lg mx-1 cursor-pointer">
                          <LineChart className="mr-2 h-4 w-4" />
                          Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg mx-1 cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-border/50" />
                        <DropdownMenuItem onClick={handleSignOut} className="rounded-lg mx-1 cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/20">
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate("cart")}
                className="relative rounded-xl hover:bg-muted/50 group transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-ambient-500 to-ambient-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-ambient-500/30 animate-scale-in-bounce">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Button>

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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate("cart")}
                className="relative rounded-xl"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-ambient-500 to-ambient-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-ambient-500/30">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Button>
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
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => {
                      onNavigate(item.id)
                      setIsMenuOpen(false)
                    }}
                    className={`justify-start text-sm font-medium rounded-xl animate-fade-in-up ${currentPage === item.id
                      ? "bg-gradient-to-r from-ambient-100 to-ambient-50 dark:from-ambient-900/50 dark:to-ambient-950/30 text-ambient-700 dark:text-ambient-300"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item.label}
                  </Button>
                ))}

                {!loading && (
                  <div className="flex flex-col space-y-2 pt-2 mt-2 border-t border-border/40">
                    {user ? (
                      <>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            onNavigate("profile")
                            setIsMenuOpen(false)
                          }}
                          className="justify-start rounded-xl"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </Button>
                        {profile?.role === "creator" && (
                          <Button
                            variant="ghost"
                            onClick={() => {
                              onNavigate("dashboard")
                              setIsMenuOpen(false)
                            }}
                            className="justify-start rounded-xl"
                          >
                            <LayoutDashboard className="w-4 h-4 mr-2" />
                            Dashboard
                          </Button>
                        )}
                        {profile?.role === "admin" && (
                          <Button
                            variant="ghost"
                            onClick={() => {
                              onNavigate("admin")
                              setIsMenuOpen(false)
                            }}
                            className="justify-start rounded-xl"
                          >
                            <Shield className="w-4 h-4 mr-2" />
                            Admin Panel
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          onClick={() => {
                            onNavigate("analytics")
                            setIsMenuOpen(false)
                          }}
                          className="justify-start rounded-xl"
                        >
                          <LineChart className="w-4 h-4 mr-2" />
                          Analytics
                        </Button>
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
        onSuccess={() => onNavigate("profile")}
      />
      <SellerApplicationModal isOpen={showSellerModal} onClose={() => setShowSellerModal(false)} />
    </>
  )
}
