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
import { Moon, Sun, Menu, X, Zap, User, Settings, LogOut, ShoppingCart, LayoutDashboard, Shield, Rocket } from "lucide-react"
import { useTheme } from "next-themes"
import { AmbientColorPicker } from "@/components/ambient-color-picker"
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
  const { theme, setTheme } = useTheme()
  const { user, profile, signOut, loading } = useAuth()
  const { itemCount } = useCart()

  useEffect(() => {
    setMounted(true)
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
      <nav className="sticky top-4 z-50 mx-auto max-w-[90%] rounded-2xl border border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-lg shadow-black/5">
        <div className="px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate("landing")}>
              <div className="relative">
                <div className="w-10 h-10 bg-white dark:bg-zinc-900 rounded-xl flex items-center justify-center shadow-lg shadow-black/5 group-hover:shadow-ambient-500/20 transition-all duration-300 group-hover:scale-105 overflow-hidden border border-border/50">
                  <img src="/logo.png" alt="Digiteria Logo" className="w-full h-full object-contain p-0.5" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-ambient-400 to-ambient-500 rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Digiteria
                </span>
                <span className="text-xs text-ambient-600 dark:text-ambient-400 -mt-1 font-medium">Software</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => onNavigate(item.id)}
                  className={`text-sm font-medium transition-all duration-200 rounded-xl px-4 py-2 ${currentPage === item.id
                    ? "bg-ambient-100 dark:bg-ambient-900/50 text-ambient-700 dark:text-ambient-300 shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                >
                  {item.label}
                </Button>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-2">
              {!loading && user && profile?.role === "user" && (
                <Button
                  onClick={() => setShowSellerModal(true)}
                  className="bg-transparent hover:bg-ambient-100 dark:hover:bg-ambient-900/50 text-ambient-600 dark:text-ambient-400 border border-ambient-200 dark:border-ambient-800 rounded-xl mr-2"
                  size="sm"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Start Selling
                </Button>
              )}
              {!loading && (
                <>
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                          <Avatar className="h-10 w-10 border-2 border-ambient-200 dark:border-ambient-800">
                            <AvatarImage src={profile?.avatar_url || ""} />
                            <AvatarFallback className="bg-gradient-to-br from-ambient-500 to-ambient-600 text-white">
                              {profile?.full_name?.[0] || profile?.email[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end" forceMount>
                        <div className="flex items-center justify-start gap-2 p-2">
                          <div className="flex flex-col space-y-1 leading-none">
                            <p className="font-medium">{profile?.full_name || "User"}</p>
                            <p className="w-[200px] truncate text-sm text-muted-foreground">{profile?.email}</p>
                          </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onNavigate("profile")}>
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </DropdownMenuItem>
                        {profile?.role === "creator" && (
                          <DropdownMenuItem onClick={() => onNavigate("dashboard")}>
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                          </DropdownMenuItem>
                        )}
                        {profile?.role === "admin" && (
                          <DropdownMenuItem onClick={() => onNavigate("admin")}>
                            <Shield className="mr-2 h-4 w-4" />
                            Admin Panel
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
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
                        className="text-sm font-medium rounded-xl"
                      >
                        Sign In
                      </Button>
                      <Button
                        onClick={() => openAuthModal("signup")}
                        className="bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-xl font-medium"
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
                className="relative rounded-xl"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-ambient-500 to-ambient-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Button>

              <div className="flex items-center space-x-1 ml-2 pl-2 border-l border-border/60">
                <AmbientColorPicker />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-xl"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
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
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-ambient-500 to-ambient-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Button>
              <AmbientColorPicker />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-xl"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="rounded-xl">
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border/40">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => {
                      onNavigate(item.id)
                      setIsMenuOpen(false)
                    }}
                    className={`justify-start text-sm font-medium rounded-xl ${currentPage === item.id
                      ? "bg-ambient-100 dark:bg-ambient-900/50 text-ambient-700 dark:text-ambient-300"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
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
                            handleSignOut()
                            setIsMenuOpen(false)
                          }}
                          className="justify-start rounded-xl"
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
                          className="justify-start bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-xl"
                        >
                          Sign Up
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} defaultTab={authModalTab} />
      <SellerApplicationModal isOpen={showSellerModal} onClose={() => setShowSellerModal(false)} />
    </>
  )
}
