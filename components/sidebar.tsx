"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    User,
    Settings,
    LogOut,
    LayoutDashboard,
    Shield,
    Home,
    ShoppingBag,
    MessageSquare,
    ChevronRight,
    LineChart
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface SidebarProps {
    currentPage: string
    onNavigate: (page: string) => void
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
    const { profile, signOut } = useAuth()

    const menuItems = [
        { id: "landing", label: "Home", icon: Home },
        { id: profile?.role === "creator" || profile?.role === "admin" ? "dashboard" : "marketplace", label: "Marketplace", icon: ShoppingBag },
    ]

    // Dashboard (Seller/Marketplace Management) is separate for sellers
    if (profile?.role === "creator" || profile?.role === "admin") {
        menuItems.push({ id: "dashboard", label: "Dashboard", icon: LayoutDashboard })
    }

    menuItems.push(
        { id: "analytics", label: "Analytics", icon: LineChart },
        { id: "profile", label: "Profile", icon: User },
        { id: "contact", label: "Contact", icon: MessageSquare },
    )

    if (profile?.role === "admin") {
        menuItems.push({ id: "admin", label: "Admin Panel", icon: Shield })
    }

    const handleSignOut = async () => {
        await signOut()
        onNavigate("landing")
    }

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-background/95 backdrop-blur-xl border-r border-border/50 flex flex-col z-50 shadow-xl shadow-ambient-500/5">
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-ambient-500/5 to-transparent pointer-events-none" />

            {/* Logo */}
            <div className="relative p-6 flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate("landing")}>
                <div className="relative">
                    <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-xl flex items-center justify-center border border-border/50 shadow-lg shadow-ambient-500/10 group-hover:shadow-ambient-500/25 transition-all duration-500 group-hover:scale-105">
                        <img src="/logo.png" alt="Logo" className="w-full h-full object-contain p-0.5" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-ambient-400 to-ambient-600 rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-bold gradient-text">Digiteria</span>
                    <span className="text-xs text-muted-foreground -mt-0.5">Dashboard</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1.5 mt-4">
                {menuItems.map((item, index) => {
                    const Icon = item.icon
                    const isActive = currentPage === item.id
                    return (
                        <Button
                            key={item.id}
                            variant="ghost"
                            onClick={() => onNavigate(item.id)}
                            className={`group w-full justify-start rounded-xl px-4 py-6 text-base transition-all duration-300 relative overflow-hidden ${isActive
                                ? "bg-gradient-to-r from-ambient-100 to-ambient-50 dark:from-ambient-900/60 dark:to-ambient-950/40 text-ambient-700 dark:text-ambient-300 shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                }`}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {/* Active indicator */}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-ambient-400 to-ambient-600 rounded-r-full shadow-lg shadow-ambient-500/50" />
                            )}

                            <Icon className={`w-5 h-5 mr-3 transition-all duration-300 ${isActive ? 'text-ambient-600 dark:text-ambient-400' : 'group-hover:scale-110'}`} />
                            <span className="flex-1">{item.label}</span>

                            {/* Hover arrow */}
                            <ChevronRight className={`w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : ''}`} />
                        </Button>
                    )
                })}
            </nav>

            {/* User Section */}
            <div className="p-4 mt-auto border-t border-border/50">
                {/* User Info */}
                <div className="flex items-center space-x-3 mb-6 px-3 py-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group">
                    <div className="relative">
                        <Avatar className="h-11 w-11 border-2 border-ambient-200/50 dark:border-ambient-800/50 group-hover:border-ambient-400 transition-colors duration-300">
                            <AvatarImage src={profile?.avatar_url || ""} />
                            <AvatarFallback className="bg-gradient-to-br from-ambient-500 to-ambient-600 text-white font-medium">
                                {profile?.full_name?.[0] || profile?.email?.[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        {/* Online indicator */}
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background shadow-lg shadow-green-500/50" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{profile?.full_name || "User"}</p>
                        <p className="text-xs text-muted-foreground truncate capitalize flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${profile?.role === 'admin' ? 'bg-red-400' : profile?.role === 'creator' ? 'bg-amber-400' : 'bg-green-400'}`} />
                            {profile?.role}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-1.5">
                    <Button
                        variant="ghost"
                        className="w-full justify-start rounded-xl text-muted-foreground hover:text-foreground transition-all duration-300 group"
                    >
                        <Settings className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform duration-500" />
                        Settings
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={handleSignOut}
                        className="w-full justify-start rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300 group"
                    >
                        <LogOut className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
                        Sign Out
                    </Button>
                </div>
            </div>
        </aside>
    )
}
