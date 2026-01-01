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
import { InvoicePage, InvoiceData } from "@/components/invoice-page"
import { AnalyticsPage } from "@/components/analytics-page"

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState<InvoiceData | null>(null)

  const isDashboard = ["admin", "profile", "dashboard", "analytics"].includes(currentPage)

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
        return <CheckoutPage onNavigate={setCurrentPage} onSelectOrder={setSelectedOrder} />
      case "invoice":
        return <InvoicePage invoiceData={selectedOrder || undefined} onNavigate={setCurrentPage} />
      case "analytics":
        return <AnalyticsPage onNavigate={setCurrentPage} />
      default:
        return <LandingPage onNavigate={setCurrentPage} onSelectProduct={setSelectedProduct} />
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gradient-to-br from-background via-background to-ambient-50/30 dark:to-ambient-950/20 relative overflow-hidden">
            {/* Global ambient effects */}
            <div className="fixed inset-0 mesh-gradient dark:mesh-gradient-dark opacity-50 pointer-events-none" />
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-gradient-to-br from-ambient-400/10 to-transparent rounded-full blur-3xl animate-float-slow" />
              <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-gradient-to-br from-purple-400/8 to-transparent rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '-10s' }} />
            </div>

            {!isDashboard && <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />}
            {isDashboard && <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />}
            <main className={`relative min-h-screen ${isDashboard ? "pl-64" : ""}`}>
              {renderPage()}
            </main>
            {!isDashboard && <Footer />}
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
