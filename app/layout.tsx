"use client"

import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/hooks/use-auth"
import { CartProvider } from "@/hooks/use-cart"
import { Preloader } from '@/components/ui/preloader'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Digiteria</title>
        <meta name="description" content="The ultimate marketplace for digital creators" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <CartProvider>
              <Preloader />
              <div className="min-h-screen bg-gradient-to-br from-background via-background to-ambient-50/30 dark:to-ambient-950/20 relative overflow-hidden">
                {/* Global ambient effects */}
                <div className="fixed inset-0 mesh-gradient dark:mesh-gradient-dark opacity-50 pointer-events-none" />
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                  <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-gradient-to-br from-ambient-400/10 to-transparent rounded-full blur-3xl animate-float-slow" />
                  <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-gradient-to-br from-purple-400/8 to-transparent rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '-10s' }} />
                </div>
                {children}
              </div>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
