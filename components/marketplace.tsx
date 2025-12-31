"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Search, Grid, List, Eye, Download, SlidersHorizontal, Settings, ShoppingCart, Check } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { mockDb } from "@/lib/mock-db"
import { useCart, type CartProduct } from "@/hooks/use-cart"

interface MarketplaceProps {
  onNavigate: (page: string) => void
  onSelectProduct: (product: any) => void
}

export function Marketplace({ onNavigate, onSelectProduct }: MarketplaceProps) {
  const { user, profile } = useAuth()
  const { addToCart, isInCart } = useCart()
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("trending")

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.stopPropagation()
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
        return "bg-ambient-100 text-ambient-700 dark:bg-ambient-900/50 dark:text-ambient-300"
      case "Top Seller":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
      case "Exclusive":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
      case "Top Pick":
        return "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
      case "New":
        return "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
      case "Popular":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen py-8">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-ambient-50/30 via-transparent to-ambient-100/20 dark:from-ambient-950/20 dark:via-transparent dark:to-ambient-900/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Marketplace
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover premium digital products created by the Digiteria community
            </p>
          </div>

          {/* Dashboard Button - Only show for logged in users */}
          {user && (
            <Button
              onClick={() => onNavigate("dashboard")}
              className="mt-4 md:mt-0 bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-2xl shadow-lg shadow-ambient-500/25"
            >
              <Settings className="w-4 h-4 mr-2" />
              Marketplace Dashboard
            </Button>
          )}
        </div>

        {/* Filters and Search */}
        <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search products, creators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 border-ambient-200/50 dark:border-ambient-800/30 focus:border-ambient-400 dark:focus:border-ambient-500 rounded-xl bg-background/50 backdrop-blur-sm"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48 border-ambient-200/50 dark:border-ambient-800/30 rounded-xl bg-background/50 backdrop-blur-sm">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48 border-ambient-200/50 dark:border-ambient-800/30 rounded-xl bg-background/50 backdrop-blur-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border border-ambient-200/50 dark:border-ambient-800/30 rounded-xl bg-background/50 backdrop-blur-sm">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-l-xl rounded-r-none ${viewMode === "grid" ? "bg-ambient-500 hover:bg-ambient-600 text-white" : "hover:bg-muted/50"
                    }`}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`rounded-r-xl rounded-l-none ${viewMode === "list" ? "bg-ambient-500 hover:bg-ambient-600 text-white" : "hover:bg-muted/50"
                    }`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="border-ambient-200/50 dark:border-ambient-800/30 rounded-xl"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {sortedProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
        >
          {sortedProducts.map((product) => (
            <Card
              key={product.id}
              className="border-ambient-200/50 dark:border-ambient-800/30 hover:shadow-xl hover:shadow-ambient-500/10 dark:hover:shadow-ambient-500/5 transition-all duration-500 cursor-pointer group bg-card/50 backdrop-blur-sm rounded-2xl hover:scale-105"
              onClick={() => {
                onSelectProduct(product)
                onNavigate("product")
              }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={product.thumbnail || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {product.badges.map((badge: string, index: number) => (
                      <Badge key={index} className={`text-xs rounded-full ${getBadgeColor(badge)}`}>
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    ${product.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-ambient-600 dark:group-hover:text-ambient-400 transition-colors duration-300">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">by {product.creator}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{product.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>{product.downloads}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={(e) => handleAddToCart(product, e)}
                    className={`w-full rounded-xl transition-all duration-300 ${isInCart(String(product.id))
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white"
                      }`}
                  >
                    {isInCart(String(product.id)) ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-ambient-200/60 dark:border-ambient-800/60 text-ambient-700 dark:text-ambient-300 hover:bg-ambient-50/80 dark:hover:bg-ambient-950/50 rounded-2xl px-8 py-6 backdrop-blur-sm"
          >
            Load More Products
          </Button>
        </div>
      </div>
    </div>
  )
}
