"use client"

import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/hooks/use-auth"
import { CartProvider } from "@/hooks/use-cart"
import { Preloader } from '@/components/ui/preloader'
import { GlowingOrbs, GridPattern, SparkleEffect } from '@/components/ui/animated-backgrounds'

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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            <CartProvider>
              <Preloader />
              <div className="min-h-screen bg-gradient-to-br from-background via-background to-ambient-50/30 dark:to-ambient-950/20 relative overflow-hidden">
                {/* Enhanced Global ambient effects */}
                <div className="fixed inset-0 mesh-gradient dark:mesh-gradient-dark opacity-50 pointer-events-none" />

                {/* Floating Orbs */}
                <GlowingOrbs orbCount={4} className="opacity-60" />

                {/* Grid Pattern Overlay */}
                <GridPattern className="opacity-30" />

                {/* Sparkle Effects */}
                <SparkleEffect className="opacity-40" />

                {/* Floating Gradient Blobs */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                  <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-gradient-to-br from-ambient-400/10 to-transparent rounded-full blur-3xl animate-float-orb" />
                  <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-gradient-to-br from-purple-400/8 to-transparent rounded-full blur-3xl animate-float-orb-reverse" />
                  <div className="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-gradient-to-br from-cyan-400/5 to-transparent rounded-full blur-3xl animate-morph" />
                </div>

                {/* Scan Line Effect (subtle) */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.02]">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-ambient-400 to-transparent animate-scan-line" />
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
