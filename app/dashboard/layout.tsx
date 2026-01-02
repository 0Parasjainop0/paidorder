"use client"

import { Sidebar } from "@/components/sidebar"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <>
            <Sidebar currentPage={pathname} />
            <main className="relative min-h-screen pl-64">
                {children}
            </main>
        </>
    )
}
