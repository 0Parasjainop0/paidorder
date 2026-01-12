"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
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
import dynamic from "next/dynamic"
const HeroLottie = dynamic(() => import("@/components/hero-lottie").then(mod => mod.HeroLottie), { ssr: false })
import { useAuth } from "@/hooks/use-auth"
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel"
import { useState, useEffect, useRef } from "react"
import { supabaseDb } from "@/lib/supabase-db"

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

export function LandingPage() {
  const { user, profile } = useAuth()
  const router = useRouter()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showSellerModal, setShowSellerModal] = useState(false)
  const [landingStats, setLandingStats] = useState(stats)
  const [featured, setFeatured] = useState<any[]>([])
  const [currentShowcase, setCurrentShowcase] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Real Stats
        const realStats = await supabaseDb.getStats()
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
        const allProducts = await supabaseDb.getFeaturedProducts()
        const featuredList = await Promise.all(
          allProducts.slice(0, 3).map(async p => {
            const creator = await supabaseDb.getUser(p.creator_id)
            return {
              id: p.id,
              title: p.title,
              creator: creator?.full_name || "Unknown",
              price: p.price,
              rating: p.rating || 4.5,
              sales: p.sales_count || 0,
              thumbnail: p.thumbnail_url || "/placeholder.svg?height=200&width=300"
            }
          })
        )
        setFeatured(featuredList)
      } catch (error) {
        console.error("Error fetching landing page data:", error)
      }
    }

    fetchData()
  }, [])

  const handleStartSelling = () => {
    if (!user) {
      setShowAuthModal(true)
    } else if (profile?.role === "creator" || profile?.role === "admin") {
      router.push("/dashboard")
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
              <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-ambient-100 to-ambient-50 dark:from-ambient-900/60 dark:to-ambient-950/40 text-ambient-700 dark:text-ambient-300 text-sm font-medium mb-8 animate-reveal opacity-0 shadow-lg shadow-ambient-500/10 border border-ambient-200/50 dark:border-ambient-700/30" style={{ animationDelay: '0.1s' }}>
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                The #1 Digital Marketplace for Creators
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight animate-reveal opacity-0 whitespace-nowrap" style={{ animationDelay: '0.2s' }}>
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
              <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed animate-reveal opacity-0" style={{ animationDelay: '0.3s' }}>
                The ultimate marketplace for digital creators. Sell templates, courses, software,
                designs, and more. Turn your expertise into income.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-10 animate-reveal opacity-0" style={{ animationDelay: '0.4s' }}>
                <Link href="/marketplace">
                  <Button
                    size="lg"
                    className="group relative bg-gradient-to-r from-ambient-500 via-ambient-600 to-ambient-500 hover:from-ambient-600 hover:via-ambient-700 hover:to-ambient-600 text-white rounded-2xl px-8 py-6 text-lg font-semibold shadow-xl shadow-ambient-500/30 hover:shadow-ambient-500/50 transition-all duration-500 hover:scale-105 btn-shine overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Explore Marketplace
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
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
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-muted-foreground animate-reveal opacity-0" style={{ animationDelay: '0.5s' }}>
                {["No monthly fees", "Low commission", "Instant payouts", "24/7 Support"].map((text, i) => (
                  <div key={text} className="flex items-center gap-2 group" style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                    <CheckCircle className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-foreground transition-colors">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Animated Tech Illustration */}
            <div className="hidden lg:flex items-center justify-center animate-reveal opacity-0" style={{ animationDelay: '0.3s' }}>
              <HeroLottie />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By / Logo Marquee Section */}
      <section className="py-12 border-y border-ambient-200/30 dark:border-ambient-800/20 bg-gradient-to-r from-ambient-50/50 via-background to-ambient-50/50 dark:from-ambient-950/50 dark:via-background dark:to-ambient-950/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest">
            Trusted by creators and companies worldwide
          </p>
          <div className="relative">
            {/* Gradient Fades - extend beyond container */}
            <div className="absolute -left-4 top-0 bottom-0 w-48 bg-gradient-to-r from-background via-background to-transparent z-10 pointer-events-none" />
            <div className="absolute -right-4 top-0 bottom-0 w-48 bg-gradient-to-l from-background via-background to-transparent z-10 pointer-events-none" />

            {/* Scrolling Logos */}
            <div className="flex animate-marquee space-x-12">
              {[
                { name: "TechCorp", icon: Monitor, color: "from-blue-500 to-cyan-500" },
                { name: "DesignHub", icon: Palette, color: "from-pink-500 to-rose-500" },
                { name: "DevStudio", icon: Zap, color: "from-yellow-500 to-orange-500" },
                { name: "CreatorCo", icon: Rocket, color: "from-purple-500 to-violet-500" },
                { name: "InnovateLab", icon: Sparkles, color: "from-amber-500 to-yellow-500" },
                { name: "PixelPerfect", icon: Layout, color: "from-green-500 to-emerald-500" },
                { name: "CloudBase", icon: HardDrive, color: "from-sky-500 to-blue-500" },
                { name: "NextGen", icon: Globe, color: "from-indigo-500 to-purple-500" },
              ].map((company, i) => (
                <div key={i} className="flex items-center gap-3 text-muted-foreground/70 hover:text-foreground transition-all duration-300 cursor-default whitespace-nowrap group">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <company.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold tracking-tight">{company.name}</span>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                { name: "TechCorp", icon: Monitor, color: "from-blue-500 to-cyan-500" },
                { name: "DesignHub", icon: Palette, color: "from-pink-500 to-rose-500" },
                { name: "DevStudio", icon: Zap, color: "from-yellow-500 to-orange-500" },
                { name: "CreatorCo", icon: Rocket, color: "from-purple-500 to-violet-500" },
                { name: "InnovateLab", icon: Sparkles, color: "from-amber-500 to-yellow-500" },
                { name: "PixelPerfect", icon: Layout, color: "from-green-500 to-emerald-500" },
                { name: "CloudBase", icon: HardDrive, color: "from-sky-500 to-blue-500" },
                { name: "NextGen", icon: Globe, color: "from-indigo-500 to-purple-500" },
              ].map((company, i) => (
                <div key={`dup-${i}`} className="flex items-center gap-3 text-muted-foreground/70 hover:text-foreground transition-all duration-300 cursor-default whitespace-nowrap group">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <company.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold tracking-tight">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-ambient-50/30 to-background dark:via-ambient-950/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white mb-4 border-0 px-4 py-1.5 text-sm font-medium shadow-lg shadow-green-500/25">
              <Zap className="w-3.5 h-3.5 mr-1.5 inline" />
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Start Selling in{" "}
              <span className="gradient-text-animated">3 Easy Steps</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Go from idea to income in minutes. No technical experience required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-24 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-ambient-500 via-purple-500 to-green-500" />

            {[
              {
                step: "01",
                icon: Rocket,
                title: "Create Your Store",
                description: "Sign up and set up your digital storefront in under 5 minutes. Customize your profile and brand.",
                color: "from-ambient-500 to-ambient-600"
              },
              {
                step: "02",
                icon: Code,
                title: "Upload Products",
                description: "Add your digital products - templates, courses, software, designs. Set pricing and descriptions.",
                color: "from-purple-500 to-purple-600"
              },
              {
                step: "03",
                icon: DollarSign,
                title: "Get Paid",
                description: "Start earning instantly. We handle payments, delivery, and customer support. You focus on creating.",
                color: "from-green-500 to-emerald-600"
              }
            ].map((item, index) => (
              <Card
                key={item.step}
                className="group relative bg-white/80 dark:bg-ambient-950/50 border-ambient-200/50 dark:border-ambient-800/30 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-ambient-500/15 transition-all duration-500 hover:-translate-y-2"
              >
                <CardContent className="p-8 text-center relative">
                  {/* Step Number Badge */}
                  <div className={`absolute -top-1 -right-1 w-16 h-16 bg-gradient-to-br ${item.color} rounded-bl-3xl flex items-end justify-start p-3`}>
                    <span className="text-white font-bold text-lg">{item.step}</span>
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${item.color} shadow-xl shadow-ambient-500/20 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <item.icon className="w-9 h-9 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-ambient-600 dark:group-hover:text-ambient-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Below Steps */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={handleStartSelling}
              className="group bg-gradient-to-r from-ambient-500 via-ambient-600 to-ambient-500 hover:from-ambient-600 hover:via-ambient-700 hover:to-ambient-600 text-white rounded-2xl px-10 py-6 text-lg font-semibold shadow-xl shadow-ambient-500/30 hover:shadow-ambient-500/50 transition-all duration-500 hover:scale-105 btn-shine"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-ambient-50/50 to-background dark:via-ambient-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-ambient-600 to-purple-600 text-white mb-4 border-0 px-4 py-1.5 text-sm font-medium shadow-lg shadow-ambient-500/25">
              <TrendingUp className="w-3.5 h-3.5 mr-1.5 inline" />
              Platform Stats
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Creators Worldwide</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of creators who have already transformed their digital products into thriving businesses.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {landingStats.map((stat, index) => (
              <Card
                key={stat.label}
                className="group border-ambient-200/50 dark:border-ambient-800/30 bg-white/80 dark:bg-ambient-950/50 backdrop-blur-sm rounded-3xl hover:shadow-2xl hover:shadow-ambient-500/15 dark:hover:shadow-ambient-500/10 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center relative">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-ambient-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon */}
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-ambient-100 to-ambient-50 dark:from-ambient-900/80 dark:to-ambient-800/50 shadow-lg shadow-ambient-500/10 text-ambient-600 dark:text-ambient-400 mb-5 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-ambient-500/25 transition-all duration-500 border border-ambient-200/50 dark:border-ambient-700/30">
                    <stat.icon className="w-7 h-7" />
                  </div>

                  {/* Value */}
                  <div className="relative text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-ambient-600 via-ambient-500 to-purple-500 bg-clip-text text-transparent">
                    <AnimatedCounter value={stat.value} />
                  </div>

                  {/* Label */}
                  <div className="relative text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-wider">
                    {stat.label}
                  </div>

                  {/* Decorative element */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-ambient-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ambient-950/5 to-transparent dark:via-ambient-950/30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge className="bg-gradient-to-r from-ambient-600 to-purple-600 text-white mb-4 border-0 px-4 py-1.5 text-sm font-medium shadow-lg shadow-ambient-500/25">
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
            {/* Glow effect behind card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-ambient-500/20 via-purple-500/20 to-ambient-500/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-700" />

            <Card className="relative border border-ambient-500/20 bg-gradient-to-br from-[#0c0c0e] via-[#0f0f12] to-[#131316] rounded-[2rem] overflow-hidden shadow-2xl shadow-ambient-500/10 hover:shadow-ambient-500/25 transition-all duration-700">
              {/* Animated border gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-ambient-500/10 via-purple-500/10 to-ambient-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <CardContent className="p-0 relative">
                <div className="flex flex-col lg:flex-row min-h-[520px]">
                  {/* Content Area */}
                  <div className="flex-1 p-8 lg:p-14 flex flex-col justify-center relative">
                    {/* Decorative orb */}
                    <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-ambient-500/10 to-purple-500/5 rounded-full blur-3xl" />

                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ambient-500/30 to-purple-500/20 flex items-center justify-center mb-8 shadow-xl shadow-ambient-500/30 border border-ambient-400/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      {(() => {
                        const Icon = showcaseData[currentShowcase].icon
                        return <Icon className="w-8 h-8 text-ambient-300" />
                      })()}
                    </div>

                    <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-5 text-white leading-tight">
                      {showcaseData[currentShowcase].title}
                    </h3>

                    <p className="text-stone-400 text-lg mb-8 leading-relaxed max-w-lg">
                      {showcaseData[currentShowcase].description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {showcaseData[currentShowcase].features.map((feature, i) => (
                        <Badge
                          key={feature}
                          variant="secondary"
                          className="bg-white/10 text-white border border-white/20 hover:border-ambient-400/50 hover:bg-white/20 py-2 px-5 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-ambient-500/20 text-sm font-medium"
                          style={{ animationDelay: `${i * 50}ms` }}
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Image Area */}
                  <div className="flex-1 relative bg-gradient-to-br from-ambient-950/50 via-purple-950/30 to-stone-900/20 border-l border-white/5 p-6 lg:p-10 flex items-center justify-center overflow-hidden">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_60%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.1),transparent_60%)]" />

                    {/* Floating particles */}
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-ambient-400 rounded-full animate-pulse opacity-50" />
                    <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }} />

                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:scale-[1.03] group-hover:shadow-ambient-500/30 transition-all duration-700">
                      <img
                        src={showcaseData[currentShowcase].image}
                        alt={showcaseData[currentShowcase].title}
                        className="w-full h-full object-cover"
                      />
                      {/* Image overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-ambient-500/20 via-transparent to-purple-500/15 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
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
        <div className="absolute inset-0 bg-gradient-to-b from-background via-ambient-50/30 to-background dark:via-ambient-950/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge className="bg-gradient-to-r from-ambient-600 to-purple-600 text-white mb-4 border-0 px-4 py-1.5 text-sm font-medium shadow-lg shadow-ambient-500/25">
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {categories.map((category, index) => (
              <Link key={category.name} href="/marketplace">
                <Card
                  className="group border-0 bg-white dark:bg-ambient-950/60 backdrop-blur-sm rounded-3xl cursor-pointer hover:shadow-2xl hover:shadow-ambient-500/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in-up overflow-hidden shadow-lg shadow-ambient-100 dark:shadow-none"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-ambient-500/0 to-purple-500/0 group-hover:from-ambient-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
                  <CardContent className="relative p-6 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ambient-100 to-ambient-50 dark:from-ambient-800/50 dark:to-ambient-900/50 flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-ambient-500 group-hover:to-purple-600 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-ambient-500/40 group-hover:rotate-3">
                      <category.icon className="w-8 h-8 text-ambient-600 dark:text-ambient-400 group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="font-bold text-base mb-1 group-hover:text-ambient-600 dark:group-hover:text-ambient-400 transition-colors">{category.name}</h3>
                    <p className="text-sm font-medium text-ambient-600/70 dark:text-ambient-400/70">{category.count.toLocaleString()} items</p>
                  </CardContent>
                </Card>
              </Link>
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
            <Link href="/marketplace">
              <Button
                variant="ghost"
                className="group text-ambient-600 dark:text-ambient-400 mt-4 md:mt-0 hover:bg-ambient-100/50 dark:hover:bg-ambient-900/30"
              >
                View All Products
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featured.length > 0 ? featured.map((product, index) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card
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
              </Link>
            )) : (
              <p className="col-span-3 text-center text-muted-foreground py-8">No featured products available at the moment.</p>
            )}
          </div>
        </div>
      </section>

      <TestimonialCarousel />

      {/* Why Choose Us Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-ambient-50/30 to-background dark:via-ambient-950/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white mb-4 border-0 px-4 py-1.5 text-sm font-medium shadow-lg shadow-purple-500/25">
              <Shield className="w-3.5 h-3.5 mr-1.5 inline" />
              Why Digiteria
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="gradient-text-animated">Succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help creators build, sell, and grow their digital business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Secure Payments",
                description: "Bank-grade security with Stripe integration. Your earnings are always protected.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Zap,
                title: "Instant Delivery",
                description: "Automated file delivery. Customers get their purchases immediately.",
                gradient: "from-yellow-500 to-orange-500"
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Track sales, views, and conversions with real-time insights dashboard.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Globe,
                title: "Global Reach",
                description: "Sell worldwide with multi-currency support and localized experiences.",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: MessageCircle,
                title: "24/7 Support",
                description: "Get help anytime with our dedicated support team and community.",
                gradient: "from-red-500 to-rose-500"
              },
              {
                icon: Sparkles,
                title: "No Monthly Fees",
                description: "Keep more of what you earn. Only pay when you make a sale.",
                gradient: "from-ambient-500 to-ambient-600"
              }
            ].map((feature, index) => (
              <Card
                key={feature.title}
                className="group bg-white/80 dark:bg-ambient-950/50 border-ambient-200/50 dark:border-ambient-800/30 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-ambient-500/15 transition-all duration-500 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-ambient-600 dark:group-hover:text-ambient-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ambient-50/50 to-transparent dark:via-ambient-950/30" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-amber-600 to-orange-600 text-white mb-4 border-0 px-4 py-1.5 text-sm font-medium shadow-lg shadow-amber-500/25">
              <MessageCircle className="w-3.5 h-3.5 mr-1.5 inline" />
              FAQ
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked{" "}
              <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How do I start selling on Digiteria?",
                answer: "Getting started is easy! Simply sign up for a free account, apply to become a seller, and once approved, you can start uploading your digital products immediately."
              },
              {
                question: "What types of products can I sell?",
                answer: "You can sell a wide variety of digital products including templates, UI kits, software, scripts, courses, ebooks, design assets, and more."
              },
              {
                question: "What are the fees?",
                answer: "We only charge a small commission on successful sales - no monthly fees, no setup costs. You keep the majority of your earnings."
              },
              {
                question: "How do payouts work?",
                answer: "Payouts are processed automatically to your connected bank account or PayPal. You can request a payout once you reach the minimum threshold of $50."
              },
              {
                question: "Is my content protected?",
                answer: "Yes! We use secure file delivery with download limits and license key generation to protect your digital products from unauthorized distribution."
              }
            ].map((faq, index) => (
              <Card
                key={index}
                className="group bg-white/80 dark:bg-ambient-950/50 border-ambient-200/50 dark:border-ambient-800/30 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-ambient-500/10 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2 flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-ambient-500 to-ambient-600 flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="pt-1">{faq.question}</span>
                  </h3>
                  <p className="text-muted-foreground pl-11 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ambient-600 via-purple-600 to-ambient-600" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent_70%)]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
            <span className="text-white/80 font-medium">Join 50,000+ creators</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Creator Tips & Updates
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for the latest tips, resources, and updates to help you grow your digital business.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
            />
            <Button
              className="bg-white text-ambient-600 hover:bg-white/90 rounded-xl px-6 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <p className="text-white/50 text-sm mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>

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
                    onClick={handleStartSelling}
                    className="group bg-white text-ambient-600 hover:bg-white/95 rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-2xl btn-shine"
                  >
                    Create Your Store
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Link href="/marketplace">
                    <Button
                      size="lg"
                      className="group bg-white text-ambient-600 hover:bg-white/95 rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-2xl btn-shine"
                    >
                      Browse Products
                      <ShoppingBag className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                    </Button>
                  </Link>
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
