"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Search, Grid, List, Eye, Download, SlidersHorizontal, Settings, ShoppingCart, Check, Sparkles } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { mockDb } from "@/lib/mock-db"
import { useCart, type CartProduct } from "@/hooks/use-cart"

export function Marketplace() {
  const router = useRouter()
  const { user, profile } = useAuth()
  const { addToCart, isInCart } = useCart()
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("trending")
  const [isLoading, setIsLoading] = useState(true)

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // If product is already in cart, redirect to cart page
    if (isInCart(String(product.id))) {
      router.push("/cart")
      return
    }

    const cartProduct: CartProduct = {
      id: String(product.id),
      title: product.title,
      price: product.price,
      thumbnail_url: product.thumbnail,
      creator: product.creator,
      creator_id: String(product.id),
    }
    addToCart(cartProduct)
  }

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "ui", label: "UI Kits" },
    { id: "templates", label: "Templates" },
    { id: "games", label: "Full Games" },
    { id: "plugins", label: "Plugins" },
    { id: "scripts", label: "Scripts" },
    { id: "models", label: "3D Models" },
    { id: "audio", label: "Audio" },
  ]

  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    const fetchProducts = () => {
      setIsLoading(true)
      const allProducts = mockDb.getProducts()
      const approvedProducts = allProducts.filter(p => p.status === "approved" || p.status === undefined)

      const mappedProducts = approvedProducts.map(p => {
        const creatorData = mockDb.getUser(p.creator_id)
        const creatorName = creatorData?.full_name || "Unknown Creator"
        return {
          id: p.id,
          title: p.title,
          creator: creatorName,
          price: p.price,
          rating: p.rating || 0,
          reviews: p.review_count || 0,
          views: p.views || 0,
          downloads: p.sales_count || 0,
          category: p.category_id,
          badges: p.tags?.includes("new") ? ["New"] : [],
          thumbnail: p.thumbnail_url || "/placeholder.svg?height=200&width=300",
          description: p.description
        }
      })
      setProducts(mappedProducts)
      setTimeout(() => setIsLoading(false), 300)
    }

    fetchProducts()
    return mockDb.subscribe(fetchProducts)
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.creator.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "trending":
        return b.views - a.views
      case "newest":
        return b.id - a.id
      case "rating":
        return b.rating - a.rating
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      default:
        return 0
    }
  })

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Verified":
        return "bg-gradient-to-r from-ambient-100 to-ambient-50 text-ambient-700 dark:from-ambient-900/50 dark:to-ambient-950/30 dark:text-ambient-300 border-ambient-200/50 dark:border-ambient-700/30"
      case "Top Seller":
        return "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 dark:from-amber-900/50 dark:to-amber-950/30 dark:text-amber-300 border-amber-200/50 dark:border-amber-700/30"
      case "Exclusive":
        return "bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 dark:from-purple-900/50 dark:to-purple-950/30 dark:text-purple-300 border-purple-200/50 dark:border-purple-700/30"
      case "Top Pick":
        return "bg-gradient-to-r from-green-100 to-green-50 text-green-700 dark:from-green-900/50 dark:to-green-950/30 dark:text-green-300 border-green-200/50 dark:border-green-700/30"
      case "New":
        return "bg-gradient-to-r from-red-100 to-red-50 text-red-700 dark:from-red-900/50 dark:to-red-950/30 dark:text-red-300 border-red-200/50 dark:border-red-700/30"
      case "Popular":
        return "bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 dark:from-orange-900/50 dark:to-orange-950/30 dark:text-orange-300 border-orange-200/50 dark:border-orange-700/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  // Skeleton loader component
  const SkeletonCard = () => (
    <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden">
      <CardContent className="p-0">
        <div className="w-full h-48 skeleton" />
        <div className="p-6 space-y-3">
          <div className="h-6 w-3/4 skeleton rounded" />
          <div className="h-4 w-1/2 skeleton rounded" />
          <div className="h-4 w-full skeleton rounded" />
          <div className="h-4 w-2/3 skeleton rounded" />
          <div className="h-10 w-full skeleton rounded-xl mt-4" />
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen pt-20 pb-8 bg-background relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
      </div>
      <div className="absolute top-40 right-[10%] w-72 h-72 bg-gradient-to-br from-ambient-500/10 to-transparent rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-40 left-[5%] w-96 h-96 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '-8s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-foreground">
              Marketplace
            </h1>
            <p className="text-muted-foreground font-mono text-sm tracking-wide">
              Discover premium digital products created by the Digiteria community
            </p>
          </div>

          {/* Dashboard Button - Only show for creators */}
          {user && profile?.role === "creator" && (
            <Link href="/dashboard">
              <Button
                className="group mt-4 md:mt-0 bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-2xl shadow-lg shadow-ambient-500/25 hover:shadow-ambient-500/40 transition-all duration-300 hover:scale-105 btn-shine"
              >
                <Settings className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-500" />
                Creator Dashboard
              </Button>
            </Link>
          )}
        </div>

        {/* Filters and Search */}
        <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/60 backdrop-blur-md rounded-2xl mb-8 shadow-lg shadow-ambient-500/5 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-ambient-500 transition-colors" />
                <Input
                  placeholder="Search products, creators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 border-ambient-200/50 dark:border-ambient-800/30 focus:border-ambient-400 dark:focus:border-ambient-500 rounded-xl bg-background/50 backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-ambient-500/10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48 border-ambient-200/50 dark:border-ambient-800/30 rounded-xl bg-background/50 backdrop-blur-sm hover:border-ambient-400/50 transition-colors">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-ambient-200/50 dark:border-ambient-800/30 shadow-xl">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id} className="rounded-lg">
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48 border-ambient-200/50 dark:border-ambient-800/30 rounded-xl bg-background/50 backdrop-blur-sm hover:border-ambient-400/50 transition-colors">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-ambient-200/50 dark:border-ambient-800/30 shadow-xl">
                  <SelectItem value="trending" className="rounded-lg">Trending</SelectItem>
                  <SelectItem value="newest" className="rounded-lg">Newest</SelectItem>
                  <SelectItem value="rating" className="rounded-lg">Top Rated</SelectItem>
                  <SelectItem value="price-low" className="rounded-lg">Price: Low to High</SelectItem>
                  <SelectItem value="price-high" className="rounded-lg">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border border-ambient-200/50 dark:border-ambient-800/30 rounded-xl bg-background/50 backdrop-blur-sm overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-none rounded-l-xl transition-all duration-300 ${viewMode === "grid" ? "bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white shadow-lg shadow-ambient-500/25" : "hover:bg-muted/50"
                    }`}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`rounded-none rounded-r-xl transition-all duration-300 ${viewMode === "list" ? "bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white shadow-lg shadow-ambient-500/25" : "hover:bg-muted/50"
                    }`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="border-ambient-200/50 dark:border-ambient-800/30 rounded-xl hover:border-ambient-400/50 hover:bg-ambient-50/50 dark:hover:bg-ambient-950/30 transition-all duration-300"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <p className="text-muted-foreground">
            Showing <span className="font-medium text-foreground">{sortedProducts.length}</span> of <span className="font-medium text-foreground">{products.length}</span> products
          </p>
          {sortedProducts.length > 0 && (
            <Badge className="bg-gradient-to-r from-ambient-100 to-ambient-50 dark:from-ambient-900/50 dark:to-ambient-950/30 text-ambient-700 dark:text-ambient-300 border border-ambient-200/50 dark:border-ambient-700/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Premium Selection
            </Badge>
          )}
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
        >
          {isLoading ? (
            // Skeleton loading
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            sortedProducts.map((product, index) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card
                  className="group border-ambient-200/50 dark:border-ambient-800/30 hover:shadow-2xl hover:shadow-ambient-500/15 dark:hover:shadow-ambient-500/10 transition-all duration-700 cursor-pointer bg-card/60 backdrop-blur-sm rounded-2xl hover:scale-[1.02] hover:-translate-y-1 animate-fade-in-up overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.thumbnail || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                        {product.badges.map((badge: string, i: number) => (
                          <Badge key={i} className={`text-xs rounded-full border ${getBadgeColor(badge)}`}>
                            {badge}
                          </Badge>
                        ))}
                      </div>
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                        ₹{product.price}
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <p className="text-white text-sm font-medium bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 inline-block">
                          View Details →
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-ambient-600 dark:group-hover:text-ambient-400 transition-colors duration-300 line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">by {product.creator}</p>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1.5">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{product.rating}</span>
                          <span className="text-sm text-muted-foreground">({product.reviews})</span>
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3.5 h-3.5" />
                            <span>{product.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Download className="w-3.5 h-3.5" />
                            <span>{product.downloads}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`w-full rounded-xl transition-all duration-500 font-medium ${isInCart(String(product.id))
                          ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/25"
                          : "bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white shadow-lg shadow-ambient-500/25 hover:shadow-ambient-500/40 hover:scale-[1.02]"
                          }`}
                      >
                        {isInCart(String(product.id)) ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Added to Cart
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2 group-hover:animate-wiggle" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>

        {/* Empty State */}
        {!isLoading && sortedProducts.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-ambient-100 to-ambient-50 dark:from-ambient-900/50 dark:to-ambient-950/30 flex items-center justify-center">
              <Search className="w-10 h-10 text-ambient-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}
              className="bg-gradient-to-r from-ambient-500 to-ambient-600 text-white rounded-xl"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Load More */}
        {sortedProducts.length > 0 && (
          <div className="text-center mt-12 animate-fade-in-up">
            <Button
              variant="outline"
              size="lg"
              className="group border-ambient-200/60 dark:border-ambient-800/60 text-ambient-700 dark:text-ambient-300 hover:bg-gradient-to-r hover:from-ambient-50/80 hover:to-ambient-100/50 dark:hover:from-ambient-950/50 dark:hover:to-ambient-900/30 rounded-2xl px-8 py-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-ambient-500/10"
            >
              Load More Products
              <Sparkles className="w-4 h-4 ml-2 group-hover:animate-pulse" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
