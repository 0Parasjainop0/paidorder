"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { usePathname } from "next/navigation"

interface PublicLayoutProps {
    children: React.ReactNode
    showNavbar?: boolean
    showFooter?: boolean
}

export function PublicLayout({
    children,
    showNavbar = true,
    showFooter = true
}: PublicLayoutProps) {
    const pathname = usePathname()

    return (
        <>
            {showNavbar && <Navbar currentPage={pathname} />}
            <main className="relative min-h-screen">
                {children}
            </main>
            {showFooter && <Footer />}
        </>
    )
}
