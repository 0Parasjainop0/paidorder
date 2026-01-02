"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  Package,
  Eye,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Upload,
  FileArchive,
  AlertCircle,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth"
import { mockDb } from "@/lib/mock-db"
import { Product } from "@/lib/supabase"
import { toast } from "sonner"

export function CreatorDashboard() {
  const { user, profile } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "ui",
  })
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number; dataUrl: string } | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [stripeAccountId, setStripeAccountId] = useState("")
  const [isSettingsProcessing, setIsSettingsProcessing] = useState(false)

  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  useEffect(() => {
    const refreshData = () => {
      if (user) {
        const allProducts = mockDb.getProducts()
        const myProducts = allProducts.filter(p => p.creator_id === user.id)
        setProducts(myProducts)
        // Load Stripe Connect ID
        const currentUser = mockDb.getUser(user.id)
        if (currentUser?.stripe_account_id) {
          setStripeAccountId(currentUser.stripe_account_id)
        }
      }
    }

    refreshData()
    return mockDb.subscribe(refreshData)
    refreshData()
    return mockDb.subscribe(refreshData)
  }, [user])

  // Check for tab query param
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const tab = searchParams.get('tab')
    if (tab && ['overview', 'products', 'orders', 'analytics', 'settings'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProductFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFileError(null)
    if (file) {
      // Max 100MB limit
      if (file.size > 100 * 1024 * 1024) {
        setFileError("File size must be less than 100MB")
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedFile({
          name: file.name,
          size: file.size,
          dataUrl: reader.result as string
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProduct = () => {
    if (!user) return

    if (!stripeAccountId) {
      toast.error("Please configure your Stripe Connect ID in Settings before selling products.")
      return
    }

    // Validation for new products (require file)
    if (!editingProduct && !uploadedFile) {
      setFileError("Product file is required")
      toast.error("Please upload a product file")
      return
    }

    if (!newProduct.title.trim()) {
      toast.error("Please enter a product title")
      return
    }

    const price = Number.parseFloat(newProduct.price) || 0
    if (price <= 0) {
      toast.error("Please enter a valid price")
      return
    }

    if (editingProduct) {
      mockDb.updateProduct(editingProduct.id, {
        title: newProduct.title,
        description: newProduct.description,
        price: price,
        category_id: newProduct.category,
        thumbnail_url: uploadedImage || editingProduct.thumbnail_url,
        // Store file info if updated
        file_url: uploadedFile?.dataUrl || editingProduct.file_url,
        file_name: uploadedFile?.name || editingProduct.file_name,
        file_size: uploadedFile?.size || editingProduct.file_size,
        updated_at: new Date().toISOString()
      })
      toast.success("Product updated successfully")
    } else {
      // @ts-ignore - Partial product construction
      const productData: Partial<Product> = {
        title: newProduct.title,
        description: newProduct.description,
        price: price,
        category_id: newProduct.category,
        creator_id: user.id,
        status: "pending",
        tags: [newProduct.category, "new"],
        thumbnail_url: uploadedImage || "/placeholder.svg?height=400&width=600",
        // Store product file
        file_url: uploadedFile!.dataUrl,
        file_name: uploadedFile!.name,
        file_size: uploadedFile!.size,
      }
      mockDb.addProduct(productData)
      toast.success("Product submitted for review!")
    }


    setIsAddProductOpen(false)
    setEditingProduct(null)
    setNewProduct({ title: "", price: "", description: "", category: "ui" })
    setUploadedImage(null)
    setUploadedFile(null)
    setFileError(null)
    setActiveTab("products")
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setNewProduct({
      title: product.title,
      price: product.price.toString(),
      description: product.description || "",
      category: product.category_id || "ui"
    })
    setIsAddProductOpen(true)
    setUploadedImage(product.thumbnail_url || null)
    // Set file info if editing existing product
    if (product.file_name) {
      setUploadedFile({
        name: product.file_name,
        size: product.file_size || 0,
        dataUrl: product.file_url || ""
      })
    }
  }

  const handleDeleteProduct = (productId: string) => {
    mockDb.deleteProduct(productId)
    toast.success("Product deleted")
  }

  // Calculate dynamic stats
  const totalEarnings = products.reduce((acc, p) => acc + ((p.sales_count || 0) * p.price), 0)
  const totalSales = products.reduce((acc, p) => acc + (p.sales_count || 0), 0)
  const totalViews = products.reduce((acc, p) => acc + (p.views || 0), 0)
  const avgRating = products.length > 0
    ? (products.reduce((acc, p) => acc + (p.rating || 0), 0) / products.length).toFixed(1)
    : "0.0"

  const stats = [
    {
      title: "Total Earnings",
      value: `₹${totalEarnings.toFixed(2)}`,
      change: "+0%", // Placeholder for real trend
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Products Listed",
      value: products.length.toString(),
      change: "+0",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Total Views",
      value: totalViews.toLocaleString(),
      change: "+0%",
      icon: Eye,
      color: "text-purple-600",
    },
    {
      title: "Average Rating",
      value: avgRating,
      change: "0.0",
      icon: Star,
      color: "text-yellow-600",
    },
  ]

  // Placeholder recent orders logic (since we don't have per-order tracking fully linked to creator view in mockDb yet)
  const recentOrders = [
    {
      id: 1,
      product: "Modern Admin Panel UI",
      buyer: "GameDev123",
      amount: 15.99,
      date: "2024-01-21",
      license: "Standard",
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300"
      case "rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/50 dark:text-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen py-8 bg-background relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/marketplace">
          <Button
            variant="ghost"
            className="mb-6 text-ambient-400 hover:text-ambient-300 hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Button>
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
              Marketplace Dashboard
            </h1>
            <p className="text-muted-foreground font-mono text-sm tracking-wide">Manage your products and track your performance</p>
          </div>

          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0 bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-2xl shadow-lg shadow-ambient-500/25">
                <Plus className="w-4 h-4 mr-2" />
                Submit New Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-2xl">
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Edit Product" : "Submit New Product"}</DialogTitle>
                <DialogDescription>
                  {editingProduct ? "Update your product details." : "Create a new product to list on the marketplace."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Product Title</Label>
                  <Input
                    id="title"
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                    placeholder="e.g., Ultimate UI Kit"
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newProduct.category}
                    onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ui">UI Kits</SelectItem>
                      <SelectItem value="templates">Templates</SelectItem>
                      <SelectItem value="games">Full Games</SelectItem>
                      <SelectItem value="scripts">Scripts</SelectItem>
                      <SelectItem value="models">3D Models</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="0.00"
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Describe your product..."
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Product Image</Label>
                  <div className="flex items-center gap-4">
                    {uploadedImage ? (
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-border/50 shadow-sm">
                        <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          onClick={() => setUploadedImage(null)}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                        >
                          <XCircle className="w-6 h-6 text-white" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-xl border-2 border-dashed border-ambient-200 dark:border-ambient-800 flex items-center justify-center bg-ambient-50/50 dark:bg-ambient-900/20">
                        <Upload className="w-6 h-6 text-ambient-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="rounded-xl"
                      />
                      <p className="text-[10px] text-muted-foreground mt-1">Recommended: 800x600px. Max: 2MB.</p>
                    </div>
                  </div>
                </div>
                {/* Product File Upload - MANDATORY */}
                <div className="grid gap-2">
                  <Label htmlFor="productFile" className="flex items-center gap-2">
                    Product File <span className="text-red-500">*</span>
                    <span className="text-xs text-muted-foreground font-normal">(Required)</span>
                  </Label>
                  <div className="border-2 border-dashed border-ambient-200 dark:border-ambient-800 rounded-xl p-4 bg-ambient-50/30 dark:bg-ambient-900/20">
                    {uploadedFile ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ambient-500 to-ambient-600 flex items-center justify-center">
                            <FileArchive className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-sm truncate max-w-[200px]">{uploadedFile.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setUploadedFile(null)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <FileArchive className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Upload your product file</p>
                        <Input
                          id="productFile"
                          type="file"
                          accept=".zip,.rar,.7z,.tar,.gz,.pdf,.psd,.ai,.sketch,.fig,.xd"
                          onChange={handleProductFileChange}
                          className="rounded-xl"
                        />
                        <p className="text-[10px] text-muted-foreground mt-2">
                          Supported: .zip, .rar, .7z, .pdf, .psd, .ai, .sketch, .fig, .xd • Max: 100MB
                        </p>
                      </div>
                    )}
                    {fileError && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {fileError}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsAddProductOpen(false)
                  setEditingProduct(null)
                  setNewProduct({ title: "", price: "", description: "", category: "ui" })
                }} className="rounded-xl">
                  Cancel
                </Button>
                <Button onClick={handleSaveProduct} className="bg-gradient-to-r from-ambient-500 to-ambient-600 text-white rounded-xl">
                  {editingProduct ? "Save Changes" : "Create Product"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

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
                    <p className={`text-sm ${stat.color}`}>{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-ambient-100 dark:bg-ambient-900/50`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Orders
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toast.info("Full order history coming soon!")}
                    >
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-slate-500 text-center py-4">No recent orders (simulation pending)</div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Chart */}
              <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Sales</span>
                        <span>83 / 100</span>
                      </div>
                      <Progress value={83} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle>Your Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">You have no products listed. Create one!</div>
                  ) : (
                    products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-4 border border-ambient-200/50 dark:border-ambient-800/30 rounded-xl"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold">{product.title}</h3>
                            <Badge className={getStatusColor(product.status)}>
                              {getStatusIcon(product.status)}
                              <span className="ml-1 capitalize">{product.status}</span>
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-muted-foreground">
                            <div>
                              <span className="font-medium">Price:</span> ₹{product.price}
                            </div>
                            <div>
                              <span className="font-medium">Sales:</span> {product.sales_count}
                            </div>
                            <div>
                              <span className="font-medium">Revenue:</span> ₹{(product.sales_count || 0) * product.price}
                            </div>
                            <div>
                              <span className="font-medium">Views:</span> {product.views}
                            </div>
                            <div>
                              <span className="font-medium">Rating:</span> {product.rating || "N/A"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8 text-muted-foreground">No orders found.</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle>Top Performing Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products
                      .filter((p) => p.status === "approved")
                      .map((product, index) => (
                        <div key={product.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{product.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {product.sales_count} sales • ₹{(product.sales_count || 0) * product.price}
                            </p>
                          </div>
                          <Badge variant="secondary">#{index + 1}</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Revenue</span>
                      <span className="font-semibold">₹{totalEarnings.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Platform Fee (15%)</span>
                      <span className="text-red-600">-₹{(totalEarnings * 0.15).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Your Earnings (85%)</span>
                      <span className="font-semibold text-green-600">₹{(totalEarnings * 0.85).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>
                  Configure your payout details to receive earnings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="stripeId">Stripe Connect Account ID</Label>
                  <div className="flex gap-2">
                    <Input
                      id="stripeId"
                      placeholder="acct_..."
                      value={stripeAccountId}
                      onChange={(e) => setStripeAccountId(e.target.value)}
                      className="rounded-xl"
                    />
                    <Button
                      onClick={() => {
                        if (!user) return
                        setIsSettingsProcessing(true)
                        // Persist to MockDB (and logically Supabase)
                        mockDb.updateUser(user.id, { stripe_account_id: stripeAccountId })
                        toast.success("Stripe Account ID saved!")
                        setIsSettingsProcessing(false)
                      }}
                      disabled={isSettingsProcessing}
                      className="bg-ambient-600 hover:bg-ambient-700 text-white rounded-xl"
                    >
                      Save
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is required to receive your 85% share of sales.
                  </p>
                </div>

                {!stripeAccountId && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-900/50 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900 dark:text-red-200">Action Required</p>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        You must configure your Stripe Connect ID before you can list new products.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
