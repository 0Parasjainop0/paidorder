"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/hooks/use-auth"
import { mockDb } from "@/lib/mock-db"
import { toast } from "sonner"
import {
  Settings,
  Package,
  DollarSign,
  Star,
  Edit3,
  Save,
  X,
  MapPin,
  Globe,
  Github,
  Twitter,
  Linkedin,
  Building,
  Shield,
  Zap,
  TrendingUp,
  Plus,
  ShoppingBag,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { SellerApplicationModal } from "@/components/auth/seller-application-modal"
import { Rocket } from "lucide-react"

export function ProfilePage() {
  const { profile, updateProfile, user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editData, setEditData] = useState({
    full_name: profile?.full_name || "",
    username: profile?.username || "",
    bio: profile?.bio || "",
    company: profile?.company || "",
    location: profile?.location || "",
    website: profile?.website || "",
    github_url: profile?.github_url || "",
    twitter_url: profile?.twitter_url || "",
    linkedin_url: profile?.linkedin_url || "",
  })

  // Review Modal State
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [reviewData, setReviewData] = useState({ rating: 5, comment: "" })
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false)

  const [activeTab, setActiveTab] = useState("overview")

  const handleOpenReview = (product: any) => {
    setSelectedProduct(product)
    setIsReviewOpen(true)
  }

  const handleSubmitReview = async () => {
    // Mock submission
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))

    if (selectedProduct) {
      mockDb.addReview({
        product_id: selectedProduct.product_id || selectedProduct.id, // Handle both structures
        user_id: user?.id || "unknown",
        rating: reviewData.rating,
        content: reviewData.comment,
        title: "Verified Buyer Review",
        order_id: selectedProduct.id, // Using purchase ID as order ID proxy
        is_verified_purchase: true,
        helpful_count: 0
      })
      toast.success("Review submitted successfully!")
    }

    setIsReviewOpen(false)
    setReviewData({ rating: 5, comment: "" })
    setSelectedProduct(null)
  }

  const handleSave = async () => {
    setLoading(true)
    const { error } = await updateProfile(editData)

    if (!error) {
      setIsEditing(false)
    }

    setLoading(false)
  }

  const handleCancel = () => {
    setEditData({
      full_name: profile?.full_name || "",
      username: profile?.username || "",
      bio: profile?.bio || "",
      company: profile?.company || "",
      location: profile?.location || "",
      website: profile?.website || "",
      github_url: profile?.github_url || "",
      twitter_url: profile?.twitter_url || "",
      linkedin_url: profile?.linkedin_url || "",
    })
    setIsEditing(false)
  }

  const stats = [
    {
      title: "Total Earnings",
      value: `$${profile?.total_earnings?.toFixed(2) || "0.00"}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/50",
    },
    {
      title: "Products Listed",
      value: profile?.total_products || 0,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/50",
    },
    {
      title: "Total Sales",
      value: profile?.total_sales || 0,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/50",
    },
    {
      title: "Rating",
      value: profile?.rating?.toFixed(1) || "0.0",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/50",
    },
  ]

  // Real Data State
  const [purchases, setPurchases] = useState<any[]>([])
  const [myProducts, setMyProducts] = useState<any[]>([])
  const [activity, setActivity] = useState<any[]>([])

  useEffect(() => {
    if (user && profile) {
      // 1. Fetch My Products
      const allProducts = mockDb.getProducts()
      const userProducts = allProducts.filter(p => p.creator_id === user.id)
      setMyProducts(userProducts)

      // 2. Fetch Purchases
      const myOrders = mockDb.getOrdersByUser(user.id)
      const purchaseList = myOrders.map(order => {
        const product = mockDb.getProduct(order.product_id)
        return {
          id: order.id,
          title: product?.title || "Unknown Product",
          creator: mockDb.getUser(product?.creator_id || "")?.full_name || "Unknown",
          price: order.amount,
          date: new Date(order.created_at).toLocaleDateString(),
          thumbnail: product?.thumbnail_url || "/placeholder.svg",
          product_id: product?.id
        }
      })
      setPurchases(purchaseList)

      // 3. Generate Activity
      // Combine Sales (if creator), Purchases, and Product Creations
      interface ActivityItem {
        id: string | number; // allowing number for legacy/mock compatibility
        type: "sale" | "product" | "review" | "purchase";
        title: string;
        description: string;
        date: Date;
        amount?: string | null;
      }

      const activities: ActivityItem[] = []

      // Purchases
      myOrders.forEach(o => {
        const product = mockDb.getProduct(o.product_id)
        activities.push({
          id: `buy-${o.id}`,
          type: "purchase", // using existing icon or similar
          title: `Purchased ${product?.title}`,
          description: `Order #${o.order_number}`,
          date: new Date(o.created_at),
          amount: `-$${o.amount.toFixed(2)}`
        })
      })

      // Sales (if creator) - Scan all orders for my products
      if (profile.role === "creator") {
        const allOrders = mockDb['data']?.orders || [] // accessing via accessor in real impl, but here simpler:
        // Wait mockDb doesn't expose getAllOrders publicly in my interface, but let's assume I can add it or just filter "orders" if I exposed it. 
        // Actually I verified mockDb.ts, 'orders' is private inside 'data'. I should rely on a new method or current access.
        // Wait, 'getOrdersByUser' is for buyer. I need 'getSalesBySeller'. 
        // Implementation constraint: I haven't added getSalesBySeller.
        // I will stick to "Product Created" activity for now, and maybe skip "Sales" activity in this specific diff or use what I have.
        // Let's rely on 'userProducts' for "New product submitted".
      }

      // Products Created
      userProducts.forEach(p => {
        activities.push({
          id: `prod-${p.id}`,
          type: "product",
          title: "New product submitted",
          description: p.title,
          date: new Date(p.created_at),
          amount: null
        })
      })

      // Sort by date desc
      // @ts-ignore
      activities.sort((a, b) => b.date - a.date)

      // Format date string relative for display
      const formattedActivities = activities.map((a: any) => ({
        ...a,
        date: a.date.toLocaleDateString() + ' ' + a.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }))

      setActivity(formattedActivities)
    }
  }, [user, profile])

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Profile not found</h2>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="absolute inset-0 bg-gradient-to-br from-ambient-50/30 via-transparent to-ambient-100/20 dark:from-ambient-950/20 dark:via-transparent dark:to-ambient-900/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-ambient-200 dark:border-ambient-800">
                  <AvatarImage src={profile.avatar_url || ""} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-ambient-500 to-ambient-600 text-white">
                    {profile.full_name?.[0] || profile.email[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {profile.is_verified && (
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{profile.full_name || "Anonymous User"}</h1>
                  <Badge
                    className={`${profile.role === "admin"
                      ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                      : profile.role === "creator"
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                      }`}
                  >
                    {profile.role === "admin" ? "Admin" : profile.role === "creator" ? "Creator" : "User"}
                  </Badge>
                </div>

                <p className="text-muted-foreground mb-2">@{profile.username || "username"}</p>

                {profile.bio && <p className="text-foreground mb-4">{profile.bio}</p>}

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {profile.company && (
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      <span>{profile.company}</span>
                    </div>
                  )}
                  {profile.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile.website && (
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-ambient-600"
                      >
                        Website
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  {profile.github_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {profile.twitter_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer">
                        <Twitter className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {profile.linkedin_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Link href="/dashboard/account">
                  <Button
                    className="bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-xl"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-ambient-500" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/marketplace">
                    <Button
                      className="w-full justify-start bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-xl"
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Browse Marketplace
                    </Button>
                  </Link>
                  {profile.role === "creator" && (
                    <Button variant="outline" className="w-full justify-start rounded-xl">
                      <Plus className="w-4 h-4 mr-2" />
                      Submit New Product
                    </Button>
                  )}
                  <Link href="/dashboard/account">
                    <Button variant="outline" className="w-full justify-start rounded-xl">
                      <Settings className="w-4 h-4 mr-2" />
                      Account Settings
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activity.slice(0, 3).map((act) => (
                      <div key={act.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                        <div className={`w-2 h-2 rounded-full mt-2 ${act.type === 'purchase' ? 'bg-purple-500' : 'bg-ambient-500'}`} />
                        <div className="flex-1">
                          <p className="font-medium">{act.title}</p>
                          <p className="text-sm text-muted-foreground">{act.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{act.date}</p>
                        </div>
                        {act.amount && <span className={`${act.type === 'purchase' ? 'text-red-500' : 'text-green-600'} font-medium`}>{act.amount}</span>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle>Your Products</CardTitle>
              </CardHeader>
              <CardContent>
                {profile.role === "creator" || profile.role === "admin" ? (
                  myProducts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {myProducts.map(product => (
                        <div key={product.id} className="border border-border rounded-xl p-4 flex flex-col gap-3">
                          <img src={product.thumbnail_url || "/placeholder.svg"} className="w-full h-32 object-cover rounded-lg" />
                          <div>
                            <h4 className="font-semibold truncate">{product.title}</h4>
                            <p className="text-sm text-muted-foreground">${product.price}</p>
                          </div>
                          <div className="flex justify-between items-center text-xs text-muted-foreground mt-auto">
                            <span>{product.sales_count} Sales</span>
                            <Badge variant={product.status === 'approved' ? 'default' : 'secondary'}>{product.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No products yet</h3>
                      <p className="text-muted-foreground mb-4">Start creating and selling your digital products</p>
                      <Link href="/dashboard">
                        <Button className="bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-xl">
                          Submit Your First Product
                        </Button>
                      </Link>
                    </div>
                  )
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-ambient-100 dark:bg-ambient-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Rocket className="w-8 h-8 text-ambient-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Become a Seller</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Join thousands of creators earning on Digiteria. Sell UI kits, templates, scripts, and more.
                    </p>
                    <Button
                      onClick={() => setIsSellerModalOpen(true)}
                      className="bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-xl"
                    >
                      Apply for Seller Account
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            <SellerApplicationModal isOpen={isSellerModalOpen} onClose={() => setIsSellerModalOpen(false)} />
          </TabsContent>

          <TabsContent value="purchases" className="space-y-6">
            <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle>Purchased Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchases.length === 0 && <p className="text-muted-foreground text-center py-8">No purchases yet.</p>}
                  {purchases.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 border border-ambient-200/50 dark:border-ambient-800/30 rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <img src={item.thumbnail} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                        <div>
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">by {item.creator}</p>
                          <p className="text-xs text-muted-foreground">Purchased on {item.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl"
                          onClick={() => toast.success("Downloading assets...")}
                        >
                          Download
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleOpenReview(item)}
                          className="bg-gradient-to-r from-ambient-500 to-ambient-600 text-white rounded-xl"
                        >
                          Leave Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
              <DialogContent className="sm:max-w-[500px] rounded-2xl">
                <DialogHeader>
                  <DialogTitle>Write a Review</DialogTitle>
                  <DialogDescription>
                    Share your experience with {selectedProduct?.title}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex justify-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewData({ ...reviewData, rating: star })}
                        className={`p-1 transition-colors ${reviewData.rating >= star ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
                      >
                        <Star className={`w-8 h-8 ${reviewData.rating >= star ? "fill-current" : ""}`} />
                      </button>
                    ))}
                  </div>
                  <Textarea
                    placeholder="Tell us what you liked or didn't like..."
                    value={reviewData.comment}
                    onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                    className="min-h-[100px] rounded-xl"
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsReviewOpen(false)} className="rounded-xl">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitReview} className="bg-gradient-to-r from-ambient-500 to-ambient-600 text-white rounded-xl">
                    Submit Review
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle>Activity History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activity.length === 0 && <p className="text-muted-foreground text-center py-8">No recent activity.</p>}
                  {activity.map((act) => (
                    <div
                      key={act.id}
                      className="flex items-center gap-4 p-4 border border-ambient-200/50 dark:border-ambient-800/30 rounded-xl"
                    >
                      <div className="w-10 h-10 bg-ambient-100 dark:bg-ambient-900/50 rounded-full flex items-center justify-center">
                        {act.type === "sale" && <DollarSign className="w-5 h-5 text-green-600" />}
                        {act.type === "product" && <Package className="w-5 h-5 text-blue-600" />}
                        {act.type === "review" && <Star className="w-5 h-5 text-yellow-600" />}
                        {act.type === "purchase" && <ShoppingBag className="w-5 h-5 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{act.title}</h4>
                        <p className="text-sm text-muted-foreground">{act.description}</p>
                        <p className="text-xs text-muted-foreground">{act.date}</p>
                      </div>
                      {act.amount && <span className={`${act.type === 'purchase' ? 'text-red-500' : 'text-green-600'} font-medium`}>{act.amount}</span>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

