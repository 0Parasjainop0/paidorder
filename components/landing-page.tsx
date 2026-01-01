"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Users,
  Code,
  Palette,
  Sparkles,
  Zap,
  Globe,
  Shield,
  Rocket,
  TrendingUp,
  Star,
  ShoppingBag,
  DollarSign,
  CheckCircle,
  Play,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Layout,
  HardDrive,
  MessageCircle,
  BarChart3,
  Search,
  Download,
  ShieldCheck,
} from "lucide-react"
import { AuthModal } from "@/components/auth/auth-modal"
import { SellerApplicationModal } from "@/components/auth/seller-application-modal"
import { AnimatedTechCubes } from "@/components/ui/animated-tech-cubes"
import { useAuth } from "@/hooks/use-auth"
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel"
import { useState, useEffect, useRef } from "react"
import { mockDb } from "@/lib/mock-db"

interface LandingPageProps {
  onNavigate: (page: string) => void
  onSelectProduct: (product: any) => void
}

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Active Users",
  },
  {
    icon: ShoppingBag,
    value: "100K+",
    label: "Products Sold",
  },
  {
    icon: DollarSign,
    value: "$2M+",
    label: "Creator Earnings",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Average Rating",
  },
]

const features = [
  {
    icon: Rocket,
    title: "Launch Instantly",
    description: "Set up your digital storefront in minutes. No technical skills required.",
  },
  {
    icon: Shield,
    title: "Secure Delivery",
    description: "Automated, secure file delivery. Your products are protected.",
  },
  {
    icon: TrendingUp,
    title: "Grow Revenue",
    description: "Analytics, marketing tools, and insights to scale your business.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Sell to customers worldwide with multi-currency support.",
  },
]

const categories = [
  { name: "UI Kits", icon: Palette, count: 2400 },
  { name: "Templates", icon: Code, count: 1800 },
  { name: "Scripts & Plugins", icon: Zap, count: 3200 },
  { name: "Full Applications", icon: Rocket, count: 890 },
  { name: "Design Assets", icon: Sparkles, count: 4100 },
  { name: "Courses", icon: Play, count: 650 },
]

const featuredProducts = [
  {
    id: 1,
    title: "Premium Dashboard UI Kit",
    creator: "DesignPro",
    price: 49.99,
    rating: 4.9,
    sales: 1240,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "E-commerce Starter Template",
    creator: "DevMaster",
    price: 79.99,
    rating: 4.8,
    sales: 890,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "SaaS Landing Page Bundle",
    creator: "WebCraft",
    price: 39.99,
    rating: 4.7,
    sales: 2100,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]



const showcaseData = [
  {
    id: "01",
    title: "Creator Insights",
    description: "Get a comprehensive view of your digital business. Track revenue, monitor active users, and analyze conversion rates with our advanced analytics dashboard.",
    image: "/showcase/dashboard.png",
    features: ["Revenue Charts", "Active Users", "Conversion Rates", "Top Products"],
    icon: BarChart3
  },
  {
    id: "02",
    title: "Global Marketplace",
    description: "Discover high-quality digital assets from creators worldwide. Our optimized marketplace makes finding UI kits, 3D models, and plugins effortless.",
    image: "/showcase/marketplace.png",
    features: ["Smart Search", "Category Grid", "Asset Preview", "Creator Profiles"],
    icon: Search
  },
  {
    id: "03",
    title: "Secure Delivery",
    description: "Instant, worry-free digital fulfillment. Every purchase is verified and delivered securely with automated license management for your peace of mind.",
    image: "/showcase/delivery.png",
    features: ["Instant Downloads", "Verified Badge", "License Keys", "Multiple Formats"],
    icon: Download
  },
  {
    id: "04",
    title: "Smart Administration",
    description: "Total platform control at your fingertips. Manage users, approve products, and monitor system health from a single, sophisticated administrative interface.",
    image: "/showcase/admin.png",
    features: ["User Management", "Approval Workflow", "Health Monitoring", "System Audit"],
    icon: ShieldCheck
  }
]

// Animated counter component
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState("0")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
    const prefix = value.match(/^[^0-9]*/)?.[0] || ''
    const valueSuffix = value.match(/[^0-9]*$/)?.[0] || ''

    let start = 0
    const duration = 2000
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(easeOutQuart * numericValue)

      setDisplayValue(`${prefix}${current.toLocaleString()}${valueSuffix}`)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(animate)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value])

  return <div ref={ref}>{displayValue}{suffix}</div>
}

export function LandingPage({ onNavigate, onSelectProduct }: LandingPageProps) {
  const { user, profile } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showSellerModal, setShowSellerModal] = useState(false)
  const [landingStats, setLandingStats] = useState(stats)
  const [featured, setFeatured] = useState<any[]>([])
  const [currentShowcase, setCurrentShowcase] = useState(0)

  useEffect(() => {
    const fetchData = () => {
      // 1. Fetch Real Stats
      const realStats = mockDb.getStats()
      setLandingStats([
        {
          icon: Users,
          value: `${realStats.activeUsers}+`,
          label: "Active Users",
        },
        {
          icon: ShoppingBag,
          value: `${realStats.productsSold}+`,
          label: "Products Sold",
        },
        {
          icon: DollarSign,
          value: `$${realStats.creatorEarnings.toLocaleString()}+`,
          label: "Creator Earnings",
        },
        {
          icon: Star,
          value: `${realStats.avgRating.toFixed(1)}/5`,
          label: "Average Rating",
        },
      ])

      // 2. Fetch Featured Products
      const allProducts = mockDb.getProducts()
      const featuredList = allProducts
        .filter(p => p.is_featured && p.status === 'approved')
        .slice(0, 3)
        .map(p => ({
          id: p.id,
          title: p.title,
          creator: mockDb.getUser(p.creator_id)?.full_name || "Unknown",
          price: p.price,
          rating: p.rating,
          sales: p.sales_count,
          thumbnail: p.thumbnail_url || "/placeholder.svg?height=200&width=300"
        }))

      if (featuredList.length > 0) {
        setFeatured(featuredList)
      } else {
        const approved = allProducts
          .filter(p => p.status === 'approved')
          .slice(0, 3)
          .map(p => ({
            id: p.id,
            title: p.title,
            creator: mockDb.getUser(p.creator_id)?.full_name || "Unknown",
            price: p.price,
            rating: p.rating,
            sales: p.sales_count,
            thumbnail: p.thumbnail_url || "/placeholder.svg?height=200&width=300"
          }))
        setFeatured(approved)
      }
    }

    fetchData()
    return mockDb.subscribe(fetchData)
  }, [])

  const handleStartSelling = () => {
    if (!user) {
      setShowAuthModal(true)
    } else if (profile?.role === "creator") {
      onNavigate("dashboard")
    } else {
      setShowSellerModal(true)
    }
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Animated Mesh Background */}
        <div className="absolute inset-0 mesh-gradient dark:mesh-gradient-dark" />

        {/* Floating Orbs */}
        <div className="absolute top-20 left-[10%] w-80 h-80 bg-gradient-to-br from-ambient-400/30 via-ambient-500/20 to-transparent rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-[15%] w-96 h-96 bg-gradient-to-br from-ambient-600/20 via-ambient-400/15 to-transparent rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '-5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-ambient-500/10 to-transparent rounded-full blur-3xl" />

        {/* Decorative Elements */}
        <div className="absolute top-32 right-[20%] w-3 h-3 bg-ambient-400 rounded-full animate-pulse-glow opacity-60" />
        <div className="absolute bottom-40 left-[25%] w-2 h-2 bg-ambient-500 rounded-full animate-bounce-soft opacity-50" />
        <div className="absolute top-40 left-[30%] w-4 h-4 bg-gradient-to-r from-ambient-400 to-ambient-600 rounded-full animate-float opacity-40" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-ambient-100 to-ambient-50 dark:from-ambient-900/60 dark:to-ambient-950/40 text-ambient-700 dark:text-ambient-300 text-sm font-medium mb-8 animate-reveal opacity-0 shadow-lg shadow-ambient-500/10 border border-ambient-200/50 dark:border-ambient-700/30" style={{ animationDelay: '1.6s' }}>
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                The #1 Digital Marketplace for Creators
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight animate-reveal opacity-0 whitespace-nowrap" style={{ animationDelay: '1.7s' }}>
                <span className="gradient-text-animated inline-block">
                  Build.
                </span>{" "}
                <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent inline-block">
                  Sell.
                </span>{" "}
                <span className="gradient-text-animated inline-block">
                  Grow.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed animate-reveal opacity-0" style={{ animationDelay: '1.8s' }}>
                The ultimate marketplace for digital creators. Sell templates, courses, software,
                designs, and more. Turn your expertise into income.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-10 animate-reveal opacity-0" style={{ animationDelay: '1.9s' }}>
                <Button
                  size="lg"
                  onClick={() => onNavigate("marketplace")}
                  className="group relative bg-gradient-to-r from-ambient-500 via-ambient-600 to-ambient-500 hover:from-ambient-600 hover:via-ambient-700 hover:to-ambient-600 text-white rounded-2xl px-8 py-6 text-lg font-semibold shadow-xl shadow-ambient-500/30 hover:shadow-ambient-500/50 transition-all duration-500 hover:scale-105 btn-shine overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Explore Marketplace
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleStartSelling}
                  className="group border-2 border-ambient-300 dark:border-ambient-700 text-ambient-700 dark:text-ambient-300 hover:bg-ambient-50 dark:hover:bg-ambient-950/50 rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-500 hover:scale-105 hover:border-ambient-400 dark:hover:border-ambient-600 hover:shadow-lg hover:shadow-ambient-500/10"
                >
                  Start Selling
                  <Rocket className="w-5 h-5 ml-2 group-hover:rotate-12 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-muted-foreground animate-reveal opacity-0" style={{ animationDelay: '2.0s' }}>
                {["No monthly fees", "Low commission", "Instant payouts", "24/7 Support"].map((text, i) => (
                  <div key={text} className="flex items-center gap-2 group" style={{ animationDelay: `${2.1 + i * 0.1}s` }}>
                    <CheckCircle className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-foreground transition-colors">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Animated Tech Illustration */}
            <div className="hidden lg:flex items-center justify-center animate-reveal opacity-0" style={{ animationDelay: '2.2s' }}>
              <AnimatedTechCubes />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-ambient-50 via-ambient-100/70 to-ambient-50 dark:from-ambient-950/60 dark:via-ambient-900/40 dark:to-ambient-950/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {landingStats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white dark:bg-ambient-900/50 shadow-lg shadow-ambient-500/10 text-ambient-600 dark:text-ambient-400 mb-4 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-ambient-500/20 transition-all duration-500 border border-ambient-200/50 dark:border-ambient-700/30">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-1 gradient-text">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-muted-foreground group-hover:text-foreground transition-colors">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ambient-950/5 to-transparent dark:via-ambient-950/30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge className="bg-gradient-to-r from-ambient-500/20 to-purple-500/20 text-ambient-600 dark:text-ambient-400 mb-4 border-ambient-500/30 px-4 py-1.5 text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 inline" />
              Showcase
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Making Management{" "}
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">Easy</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Advanced control panels with terminal access, file management, and real-time monitoring.
              Built for developers, designed for everyone.
            </p>
          </div>

          <div className="relative group">
            <Card className="border-ambient-800/30 bg-gradient-to-br from-[#0a0a0b] to-[#111113] dark:from-[#0a0a0b] dark:to-[#111113] rounded-[2rem] overflow-hidden shadow-2xl shadow-ambient-500/10 hover:shadow-ambient-500/20 transition-all duration-700">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row min-h-[500px]">
                  {/* Content Area */}
                  <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-ambient-500/20 to-ambient-600/10 flex items-center justify-center mb-6 shadow-lg shadow-ambient-500/20 border border-ambient-500/20 group-hover:scale-110 transition-transform duration-500">
                      {(() => {
                        const Icon = showcaseData[currentShowcase].icon
                        return <Icon className="w-7 h-7 text-ambient-400" />
                      })()}
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-white">{showcaseData[currentShowcase].title}</h3>
                    <p className="text-stone-400 text-lg mb-8 leading-relaxed max-w-md">
                      {showcaseData[currentShowcase].description}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-8">
                      {showcaseData[currentShowcase].features.map((feature, i) => (
                        <Badge
                          key={feature}
                          variant="secondary"
                          className="bg-white/5 text-stone-300 border-white/10 hover:bg-white/10 py-1.5 px-4 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                          style={{ animationDelay: `${i * 50}ms` }}
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Image Area */}
                  <div className="flex-1 relative bg-gradient-to-br from-stone-900/30 to-stone-900/10 border-l border-white/5 p-4 lg:p-8 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-700">
                      <img
                        src={showcaseData[currentShowcase].image}
                        alt={showcaseData[currentShowcase].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-ambient-500/20 via-transparent to-purple-500/10 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="border-t border-white/5 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/[0.02]">
                  <div className="flex items-center gap-12 order-2 sm:order-1">
                    <button
                      onClick={() => setCurrentShowcase((prev) => (prev === 0 ? showcaseData.length - 1 : prev - 1))}
                      className="flex items-center gap-2 text-sm font-medium text-stone-400 hover:text-white transition-colors group/btn"
                    >
                      <ChevronLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                      Previous
                    </button>
                    <div className="hidden md:flex items-center gap-4">
                      {showcaseData.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentShowcase(i)}
                          className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500 border ${currentShowcase === i
                            ? "bg-gradient-to-r from-ambient-500 to-ambient-600 border-ambient-400 text-white shadow-lg shadow-ambient-500/30 scale-110"
                            : "border-stone-800 text-stone-500 hover:border-stone-600 hover:text-stone-300 hover:scale-105"
                            }`}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentShowcase((prev) => (prev === showcaseData.length - 1 ? 0 : prev + 1))}
                      className="flex items-center gap-2 text-sm font-medium text-stone-400 hover:text-white transition-colors group/btn"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 order-1 sm:order-2">
                    <span className="text-xs font-mono text-stone-600">Panel {currentShowcase + 1} of 4</span>
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-ambient-500/15 to-ambient-600/10 border border-ambient-500/25">
                      <div className="w-2 h-2 rounded-full bg-ambient-500 animate-pulse shadow-lg shadow-ambient-500/50" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-ambient-400">Live System Preview</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-muted/40 to-muted/20" />
        <div className="absolute inset-0 mesh-gradient opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge className="bg-gradient-to-r from-ambient-100 to-ambient-50 text-ambient-700 dark:bg-gradient-to-r dark:from-ambient-900/50 dark:to-ambient-950/30 dark:text-ambient-300 mb-4 border border-ambient-200/50 dark:border-ambient-700/30 px-4 py-1.5">
              Browse Categories
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Discover{" "}
              <span className="gradient-text-animated">digital products</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From UI kits to full applications, find the perfect digital assets for your projects.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card
                key={category.name}
                onClick={() => onNavigate("marketplace")}
                className="group border-ambient-200/50 dark:border-ambient-800/30 bg-card/80 backdrop-blur-sm rounded-2xl cursor-pointer hover:shadow-xl hover:shadow-ambient-500/15 transition-all duration-500 hover:scale-105 hover:-translate-y-1 card-hover-lift animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-ambient-500/0 to-ambient-600/0 group-hover:from-ambient-500/5 group-hover:to-ambient-600/10 transition-all duration-500" />
                <CardContent className="relative p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-ambient-100 to-ambient-50 dark:from-ambient-900/50 dark:to-ambient-950/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-ambient-500 group-hover:to-ambient-600 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-ambient-500/30 border border-ambient-200/50 dark:border-ambient-700/30 group-hover:border-ambient-400">
                    <category.icon className="w-7 h-7 text-ambient-600 dark:text-ambient-400 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-semibold mb-1 group-hover:text-ambient-600 dark:group-hover:text-ambient-400 transition-colors">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count.toLocaleString()} items</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ambient-50/30 to-transparent dark:via-ambient-950/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 animate-fade-in-up">
            <div>
              <Badge className="bg-gradient-to-r from-ambient-100 to-ambient-50 text-ambient-700 dark:bg-gradient-to-r dark:from-ambient-900/50 dark:to-ambient-950/30 dark:text-ambient-300 mb-4 border border-ambient-200/50 dark:border-ambient-700/30 px-4 py-1.5">
                Featured Products
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold">Trending Now</h2>
            </div>
            <Button
              variant="ghost"
              onClick={() => onNavigate("marketplace")}
              className="group text-ambient-600 dark:text-ambient-400 mt-4 md:mt-0 hover:bg-ambient-100/50 dark:hover:bg-ambient-900/30"
            >
              View All Products
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featured.length > 0 ? featured.map((product, index) => (
              <Card
                key={product.id}
                onClick={() => {
                  onSelectProduct({
                    ...product,
                    badges: ["Featured"], // Add badge for display 
                    longDescription: product.description, // Ensure full description is available
                    reviews: product.rating * 12 + 4 // Mock review count for now or fetch real
                  })
                  onNavigate("product")
                }}
                className="group border-ambient-200/50 dark:border-ambient-800/30 bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-ambient-500/15 transition-all duration-700 cursor-pointer hover:scale-[1.03] hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-ambient-500 to-ambient-600 text-white border-0 shadow-lg shadow-ambient-500/30 group-hover:scale-110 transition-transform">
                    Featured
                  </Badge>
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <p className="text-white text-sm font-medium">View Details →</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-ambient-600 dark:group-hover:text-ambient-400 transition-colors duration-300">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">by {product.creator}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold gradient-text">${product.price}</span>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{product.rating}</span>
                      <span className="opacity-50">•</span>
                      <span>{product.sales.toLocaleString()} sales</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <p className="col-span-3 text-center text-muted-foreground py-8">No featured products available at the moment.</p>
            )}
          </div>
        </div>
      </section>

      <TestimonialCarousel />


      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative animate-fade-in-up">
            {/* Glow effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-ambient-500/30 via-purple-500/20 to-ambient-500/30 rounded-3xl blur-3xl animate-pulse-glow" />
            <div className="absolute -inset-4 bg-gradient-to-r from-ambient-400/20 to-purple-400/20 rounded-[3rem] blur-2xl" />

            <Card className="relative border-0 bg-gradient-to-br from-ambient-500 via-ambient-600 to-ambient-700 rounded-3xl overflow-hidden shadow-2xl shadow-ambient-500/30">
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.1),transparent_50%)]" />

              <CardContent className="relative p-12 md:p-16">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Ready to start earning?
                </h2>
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                  Join thousands of creators who are building successful businesses on Digiteria. Start
                  selling today – it's free to get started!
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    size="lg"
                    onClick={() => onNavigate("dashboard")}
                    className="group bg-white text-ambient-600 hover:bg-white/95 rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-2xl btn-shine"
                  >
                    Create Your Store
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => onNavigate("marketplace")}
                    className="group bg-white text-ambient-600 hover:bg-white/95 rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-2xl btn-shine"
                  >
                    Browse Products
                    <ShoppingBag className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} defaultTab="signup" />
      <SellerApplicationModal isOpen={showSellerModal} onClose={() => setShowSellerModal(false)} />
    </div>
  )
}
