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
    MessageSquare
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
        { id: "marketplace", label: "Marketplace", icon: ShoppingBag },
        { id: "profile", label: "Profile", icon: User },
        { id: "contact", label: "Contact", icon: MessageSquare },
    ]

    if (profile?.role === "admin") {
        menuItems.push({ id: "admin", label: "Admin Panel", icon: Shield })
    }

    if (profile?.role === "creator") {
        menuItems.push({ id: "dashboard", label: "Creator Dashboard", icon: LayoutDashboard })
    }

    const handleSignOut = async () => {
        await signOut()
        onNavigate("landing")
    }

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-background border-r border-border flex flex-col z-50">
            <div className="p-6 flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate("landing")}>
                <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-lg flex items-center justify-center border border-border/50 shadow-sm">
                    <img src="/logo.png" alt="Logo" className="w-full h-full object-contain p-0.5" />
                </div>
                <span className="text-xl font-bold gradient-text">Digiteria</span>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <Button
                            key={item.id}
                            variant="ghost"
                            onClick={() => onNavigate(item.id)}
                            className={`w-full justify-start rounded-xl px-4 py-6 text-base ${currentPage === item.id
                                ? "bg-ambient-100 dark:bg-ambient-900/50 text-ambient-700 dark:text-ambient-300"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <Icon className="w-5 h-5 mr-3" />
                            {item.label}
                        </Button>
                    )
                })}
            </nav>

            <div className="p-4 mt-auto border-t border-border">
                <div className="flex items-center space-x-3 mb-6 px-2">
                    <Avatar className="h-10 w-10 border-2 border-ambient-200 dark:border-ambient-800">
                        <AvatarImage src={profile?.avatar_url || ""} />
                        <AvatarFallback className="bg-gradient-to-br from-ambient-500 to-ambient-600 text-white">
                            {profile?.full_name?.[0] || profile?.email?.[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                        <p className="text-sm font-medium truncate">{profile?.full_name || "User"}</p>
                        <p className="text-xs text-muted-foreground truncate capitalize">{profile?.role}</p>
                    </div>
                </div>

                <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start rounded-xl text-muted-foreground">
                        <Settings className="w-5 h-5 mr-3" />
                        Settings
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={handleSignOut}
                        className="w-full justify-start rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Sign Out
                    </Button>
                </div>
            </div>
        </aside>
    )
}
