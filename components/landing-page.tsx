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
} from "lucide-react"
import { AuthModal } from "@/components/auth/auth-modal"
import { SellerApplicationModal } from "@/components/auth/seller-application-modal"
import { useAuth } from "@/hooks/use-auth"
import { useState, useEffect } from "react"
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

const testimonials = [
  {
    name: "Alex Chen",
    role: "UI Designer",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Digiteria transformed my side projects into a profitable business. The platform is incredibly easy to use!",
    earnings: "$15,000+",
  },
  {
    name: "Sarah Miller",
    role: "Full-Stack Developer",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "I've tried many platforms, but Digiteria offers the best combination of features and fair commission rates.",
    earnings: "$42,000+",
  },
  {
    name: "Marcus Johnson",
    role: "Course Creator",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "The analytics dashboard helps me understand my customers better. My sales have tripled since joining!",
    earnings: "$28,000+",
  },
]

export function LandingPage({ onNavigate, onSelectProduct }: LandingPageProps) {
  const { user, profile } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showSellerModal, setShowSellerModal] = useState(false)
  const [landingStats, setLandingStats] = useState(stats)
  const [featured, setFeatured] = useState<any[]>([])

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Ambient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-ambient-100/50 via-transparent to-ambient-200/30 dark:from-ambient-950/30 dark:via-transparent dark:to-ambient-900/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-ambient-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-ambient-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-ambient-100 dark:bg-ambient-900/50 text-ambient-700 dark:text-ambient-300 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              The #1 Digital Marketplace for Creators
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-ambient-600 via-ambient-500 to-ambient-400 bg-clip-text text-transparent">
                Build.
              </span>{" "}
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Sell.
              </span>{" "}
              <span className="bg-gradient-to-r from-ambient-400 via-ambient-500 to-ambient-600 bg-clip-text text-transparent">
                Grow.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              The ultimate marketplace for digital creators. Sell templates, courses, software,
              designs, and more. Turn your expertise into income.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Button
                size="lg"
                onClick={() => onNavigate("marketplace")}
                className="bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-2xl px-8 py-6 text-lg font-semibold shadow-xl shadow-ambient-500/25 hover:shadow-ambient-500/40 transition-all duration-300 hover:scale-105"
              >
                Explore Marketplace
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("dashboard")}
                className="border-2 border-ambient-300 dark:border-ambient-700 text-ambient-700 dark:text-ambient-300 hover:bg-ambient-50 dark:hover:bg-ambient-950/50 rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Start Selling
                <Rocket className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>No monthly fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Low commission</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Instant payouts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-ambient-50 via-ambient-100/50 to-ambient-50 dark:from-ambient-950/50 dark:via-ambient-900/30 dark:to-ambient-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {landingStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-ambient-500/10 text-ambient-600 dark:text-ambient-400 mb-4">
                  <stat.icon className="w-7 h-7" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-ambient-100 text-ambient-700 dark:bg-ambient-900/50 dark:text-ambient-300 mb-4">
              Why Choose Digiteria
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-ambient-500 to-ambient-600 bg-clip-text text-transparent">
                succeed
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide the tools, platform, and support to help you build a thriving digital
              business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:shadow-ambient-500/10 transition-all duration-500 hover:scale-105 group"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ambient-500 to-ambient-600 flex items-center justify-center mb-6 shadow-lg shadow-ambient-500/25 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-ambient-100 text-ambient-700 dark:bg-ambient-900/50 dark:text-ambient-300 mb-4">
              Browse Categories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Discover{" "}
              <span className="bg-gradient-to-r from-ambient-500 to-ambient-600 bg-clip-text text-transparent">
                digital products
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From UI kits to full applications, find the perfect digital assets for your projects.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card
                key={category.name}
                onClick={() => onNavigate("marketplace")}
                className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl cursor-pointer hover:shadow-lg hover:shadow-ambient-500/10 transition-all duration-300 hover:scale-105 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-ambient-100 dark:bg-ambient-900/50 flex items-center justify-center mx-auto mb-4 group-hover:bg-ambient-500 transition-colors duration-300">
                    <category.icon className="w-6 h-6 text-ambient-600 dark:text-ambient-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count.toLocaleString()} items</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <Badge className="bg-ambient-100 text-ambient-700 dark:bg-ambient-900/50 dark:text-ambient-300 mb-4">
                Featured Products
              </Badge>
              <h2 className="text-4xl font-bold">Trending Now</h2>
            </div>
            <Button
              variant="ghost"
              onClick={() => onNavigate("marketplace")}
              className="text-ambient-600 dark:text-ambient-400 mt-4 md:mt-0"
            >
              View All Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featured.length > 0 ? featured.map((product) => (
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
                className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-ambient-500/10 transition-all duration-500 cursor-pointer group hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <Badge className="absolute top-3 right-3 bg-ambient-500 text-white">Featured</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-ambient-600 dark:group-hover:text-ambient-400 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">by {product.creator}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${product.price}</span>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{product.rating}</span>
                      <span>•</span>
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

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-ambient-50 to-ambient-100/50 dark:from-ambient-950/50 dark:to-ambient-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-white dark:bg-ambient-900 text-ambient-700 dark:text-ambient-300 mb-4">
              Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Creators{" "}
              <span className="bg-gradient-to-r from-ambient-500 to-ambient-600 bg-clip-text text-transparent">
                love
              </span>{" "}
              Digiteria
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.name}
                className="border-ambient-200/50 dark:border-ambient-800/30 bg-white dark:bg-card rounded-2xl"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-2 text-ambient-600 dark:text-ambient-400 font-semibold">
                    <DollarSign className="w-5 h-5" />
                    <span>Earned {testimonial.earnings}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-ambient-500/20 via-ambient-400/20 to-ambient-500/20 rounded-3xl blur-3xl" />
            <Card className="relative border-ambient-200 dark:border-ambient-800 bg-gradient-to-br from-ambient-500 to-ambient-600 rounded-3xl overflow-hidden">
              <CardContent className="p-12 md:p-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
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
                    className="bg-white text-ambient-600 hover:bg-white/90 rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Create Your Store
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => onNavigate("marketplace")}
                    className="border-2 border-white text-white hover:bg-white/10 rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Browse Products
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
