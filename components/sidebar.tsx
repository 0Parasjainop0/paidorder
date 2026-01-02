"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
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
    LineChart,
    Sparkles
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface SidebarProps {
    currentPage?: string
}

export function Sidebar({ currentPage }: SidebarProps) {
    const { profile, signOut } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    // Use pathname to determine active page
    const activePage = currentPage || pathname

    const menuItems = [
        { id: "/", label: "Home", icon: Home },
    ]

    if (profile?.role === "creator" || profile?.role === "admin") {
        menuItems.push({ id: "/dashboard", label: "Dashboard", icon: LayoutDashboard })
    }
    menuItems.push(
        { id: "/dashboard/analytics", label: "Analytics", icon: LineChart },
        { id: "/dashboard/profile", label: "Profile", icon: User },
        { id: "/contact", label: "Contact", icon: MessageSquare },
    )

    if (profile?.role === "admin") {
        menuItems.push({ id: "/dashboard/admin", label: "Admin Panel", icon: Shield })
    }

    const handleSignOut = async () => {
        await signOut()
        router.push("/")
    }

    const isActive = (path: string) => {
        if (path === "/") return activePage === "/" || activePage === "landing"
        if (path === "/dashboard") return activePage === "/dashboard" || activePage === "dashboard"
        return activePage === path || activePage === path.replace("/dashboard/", "")
    }

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-background backdrop-blur-3xl border-r border-border/50 flex flex-col z-50 shadow-2xl">
            {/* Ambient Nebula Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-ambient-500/5 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-purple-500/5 to-transparent" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:100%_40px] opacity-20" />
            </div>

            {/* Logo */}
            <Link href="/" className="relative p-6 flex items-center space-x-3 cursor-pointer group border-b border-border">
                <div className="relative">
                    <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center border border-border shadow-xl group-hover:shadow-ambient-500/20 transition-all duration-500 group-hover:scale-105 overflow-hidden">
                        <img src="/logo.png" alt="Logo" className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-ambient-400/20 to-ambient-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-500 -z-10" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-bold text-foreground group-hover:text-ambient-500 transition-colors">Digiteria</span>
                    <span className="text-[9px] text-ambient-600 dark:text-ambient-500/50 font-mono tracking-[0.2em] uppercase">Dashboard</span>
                </div>
            </Link>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1 mt-6 relative">
                {/* Section Header */}
                <div className="flex items-center px-3 mb-3">
                    <span className="text-[9px] font-mono text-muted-foreground tracking-[0.2em] uppercase">Navigation</span>
                </div>

                {menuItems.map((item, index) => {
                    const Icon = item.icon
                    const active = isActive(item.id)
                    return (
                        <Link
                            key={item.id}
                            href={item.id}
                            className={`group w-full flex items-center justify-start rounded-xl px-4 py-5 text-sm font-medium transition-all duration-300 relative overflow-hidden ${active
                                ? "bg-ambient-500/10 text-foreground shadow-lg shadow-ambient-500/10"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                }`}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {/* Active Indicator */}
                            {active && (
                                <>
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-gradient-to-b from-ambient-400 to-ambient-600 rounded-r-full shadow-lg shadow-ambient-500/50" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-ambient-500/5 to-transparent" />
                                </>
                            )}

                            <Icon className={`w-4 h-4 mr-3 transition-all duration-300 ${active ? 'text-ambient-400' : 'group-hover:text-ambient-400 group-hover:scale-110'}`} />
                            <span className="flex-1">{item.label}</span>

                            <ChevronRight className={`w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-300 ${active ? 'opacity-100 translate-x-0 text-ambient-400' : ''}`} />
                        </Link>
                    )
                })}
            </nav>

            {/* User Section */}
            <div className="p-4 mt-auto border-t border-border">
                {/* User Card */}
                <div className="flex items-center space-x-3 mb-4 px-3 py-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 cursor-pointer group border border-border">
                    <div className="relative">
                        <Avatar className="h-10 w-10 border border-ambient-500/30 group-hover:border-ambient-400/50 transition-colors duration-300">
                            <AvatarImage src={profile?.avatar_url || ""} />
                            <AvatarFallback className="bg-gradient-to-br from-ambient-600 to-ambient-700 text-white font-medium text-sm">
                                {profile?.full_name?.[0] || profile?.email?.[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background shadow-lg shadow-green-500/40 animate-pulse" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">{profile?.full_name || "User"}</p>
                        <p className="text-[10px] text-muted-foreground truncate capitalize flex items-center gap-1.5 font-mono">
                            <Sparkles className="w-2.5 h-2.5 text-ambient-500" />
                            {profile?.role}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-1">
                    <Link href="/dashboard/profile">
                        <Button
                            variant="ghost"
                            className="w-full justify-start rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300 group text-sm"
                        >
                            <Settings className="w-4 h-4 mr-3 group-hover:rotate-90 transition-transform duration-500" />
                            Settings
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        onClick={handleSignOut}
                        className="w-full justify-start rounded-xl text-red-500/70 hover:text-red-400 hover:bg-red-500/5 transition-all duration-300 group text-sm"
                    >
                        <LogOut className="w-4 h-4 mr-3 group-hover:-translate-x-1 transition-transform" />
                        Sign Out
                    </Button>
                </div>
            </div>
        </aside>
    )
}
