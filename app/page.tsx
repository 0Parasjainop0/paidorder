"use client"

import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/hooks/use-auth"
import { CartProvider } from "@/hooks/use-cart"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LandingPage } from "@/components/landing-page"
import { Marketplace } from "@/components/marketplace"
import { ProductPage } from "@/components/product-page"
import { CreatorDashboard } from "@/components/creator-dashboard"
import { AdminPanel } from "@/components/admin-panel"
import { ContactPage } from "@/components/contact-page"
import { ProfilePage } from "@/components/profile/profile-page"
import { CartPage } from "@/components/cart-page"
import { CheckoutPage } from "@/components/checkout-page"
import { Sidebar } from "@/components/sidebar"

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing")
  const [selectedProduct, setSelectedProduct] = useState(null)

  const isDashboard = ["admin", "profile", "dashboard"].includes(currentPage)

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onNavigate={setCurrentPage} onSelectProduct={setSelectedProduct} />
      case "marketplace":
        return <Marketplace onNavigate={setCurrentPage} onSelectProduct={setSelectedProduct} />
      case "product":
        return <ProductPage product={selectedProduct} onNavigate={setCurrentPage} />
      case "dashboard":
        return <CreatorDashboard onNavigate={setCurrentPage} />
      case "admin":
        return <AdminPanel onNavigate={setCurrentPage} onSelectProduct={setSelectedProduct} />
      case "contact":
        return <ContactPage onNavigate={setCurrentPage} />
      case "profile":
        return <ProfilePage onNavigate={setCurrentPage} />
      case "cart":
        return <CartPage onNavigate={setCurrentPage} />
      case "checkout":
        return <CheckoutPage onNavigate={setCurrentPage} />
      default:
        return <LandingPage onNavigate={setCurrentPage} onSelectProduct={setSelectedProduct} />
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gradient-to-br from-background via-background to-ambient-50/30 dark:to-ambient-950/20">
            {!isDashboard && <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />}
            {isDashboard && <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />}
            <main className={`min-h-screen ${isDashboard ? "pl-64" : ""}`}>
              {renderPage()}
            </main>
            {!isDashboard && <Footer />}
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
