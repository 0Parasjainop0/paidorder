"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Flag,
  Users,
  Package,
  DollarSign,
  Search,
  Filter,
  Edit,
  Trash2,
  MoreVertical,
  Upload
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { mockDb, SellerApplication } from "@/lib/mock-db"
import { Product, Profile } from "@/lib/supabase"
import { toast } from "sonner"

interface AdminPanelProps {
  onNavigate: (page: string) => void
  onSelectProduct: (product: any) => void
}

export function AdminPanel({ onNavigate, onSelectProduct }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("pending")
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [users, setUsers] = useState<Profile[]>([])
  const [applications, setApplications] = useState<SellerApplication[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editForm, setEditForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    status: ""
  })

  useEffect(() => {
    const refreshData = () => {
      setProducts(mockDb.getProducts())
      setUsers(mockDb.getUsers())
      setApplications(mockDb.getApplications())
    }

    refreshData()
    return mockDb.subscribe(refreshData)
  }, [activeTab])

  const pendingProducts = products.filter(p => p.status === "pending")

  const handleProductAction = (productId: string, action: "approved" | "rejected") => {
    mockDb.updateProduct(productId, { status: action })
    toast.success(`Product ${action} successfully`)
  }

  const handleApplicationAction = (appId: string, action: "approved" | "rejected") => {
    mockDb.updateApplicationStatus(appId, action)
    toast.success(`Application ${action}`)
  }

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      mockDb.deleteProduct(productId)
      toast.success("Product deleted successfully")
    }
  }

  const handleEditClick = (product: Product) => {
    setEditingProduct(product)
    setEditForm({
      title: product.title,
      price: product.price.toString(),
      description: product.description || "",
      category: product.category_id || "",
      status: product.status
    })
    setIsEditModalOpen(true)
  }

  const handleUpdateProduct = () => {
    if (!editingProduct) return

    mockDb.updateProduct(editingProduct.id, {
      title: editForm.title,
      price: parseFloat(editForm.price),
      description: editForm.description,
      category_id: editForm.category,
      status: editForm.status as any,
      updated_at: new Date().toISOString()
    })

    toast.success("Product updated successfully")
    setIsEditModalOpen(false)
  }



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

  return (
    <div className="min-h-screen py-8 bg-background relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-white/50 font-mono text-sm tracking-wide">Manage product submissions and platform oversight</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm rounded-2xl hover:bg-zinc-900/70 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/40">Pending Products</p>
                  <p className="text-3xl font-bold text-white">{pendingProducts.length}</p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/20">
                  <Clock className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm rounded-2xl hover:bg-zinc-900/70 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/40">Total Products</p>
                  <p className="text-3xl font-bold text-white">{products.length}</p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-ambient-500/20 to-ambient-600/10 border border-ambient-500/20">
                  <Package className="w-6 h-6 text-ambient-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm rounded-2xl hover:bg-zinc-900/70 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/40">Active Creators</p>
                  <p className="text-3xl font-bold text-white">
                    {users.filter(u => u.role === 'creator').length}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/20">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm rounded-2xl hover:bg-zinc-900/70 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/40">System Users</p>
                  <p className="text-3xl font-bold text-white">{users.length}</p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/20">
                  <DollarSign className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="pending">Reviews</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="sellers">Sellers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            <Card className="glass-morphism rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Pending Product Reviews
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64 rounded-2xl"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="shadow-md rounded-2xl">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {pendingProducts.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      No pending products to review.
                    </div>
                  ) : (
                    pendingProducts.map((product) => (
                      <div
                        key={product.id}
                        className="glass-morphism border-stone-200/50 dark:border-stone-800/30 rounded-2xl p-6"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{product.title}</h3>
                              <Badge className={getStatusColor(product.status)}>
                                <Clock className="w-3 h-3 mr-1" />
                                {product.status}
                              </Badge>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                              <div>
                                <span className="font-medium text-slate-600 dark:text-slate-300">Creator ID:</span>
                                <span className="ml-2 text-slate-900 dark:text-white">{product.creator_id}</span>
                              </div>
                              <div>
                                <span className="font-medium text-slate-600 dark:text-slate-300">Category:</span>
                                <span className="ml-2 text-slate-900 dark:text-white capitalize">{product.category_id}</span>
                              </div>
                              <div>
                                <span className="font-medium text-slate-600 dark:text-slate-300">Price:</span>
                                <span className="ml-2 text-slate-900 dark:text-white">${product.price}</span>
                              </div>
                              <div>
                                <span className="font-medium text-slate-600 dark:text-slate-300">Views:</span>
                                <span className="ml-2 text-slate-900 dark:text-white">{product.views}</span>
                              </div>
                            </div>

                            <p className="text-slate-700 dark:text-slate-300 mb-4">{product.description}</p>
                          </div>

                          <div className="flex flex-col space-y-3 lg:w-48">
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full shadow-md rounded-2xl"
                              onClick={() => {
                                const fullProduct = {
                                  ...product,
                                  badges: [product.status === 'approved' ? 'Verified' : 'Pending', 'Admin Preview'],
                                  creator: mockDb.getUser(product.creator_id)?.full_name || 'Creator'
                                }
                                onSelectProduct(fullProduct)
                                onNavigate("product")
                              }}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleProductAction(product.id, "approved")}
                              className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md rounded-2xl"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleProductAction(product.id, "rejected")}
                              className="w-full shadow-md rounded-2xl"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <Card className="glass-morphism rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  All Products
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search all products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64 rounded-2xl"
                    />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-stone-200 dark:border-stone-800">
                        <th className="py-4 px-2 font-semibold">Product</th>
                        <th className="py-4 px-2 font-semibold">Creator</th>
                        <th className="py-4 px-2 font-semibold">Price</th>
                        <th className="py-4 px-2 font-semibold">Status</th>
                        <th className="py-4 px-2 font-semibold">Sales</th>
                        <th className="py-4 px-2 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products
                        .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((product) => (
                          <tr key={product.id} className="border-b border-stone-100 dark:border-stone-900/50 hover:bg-stone-50/50 dark:hover:bg-stone-800/20 transition-colors">
                            <td className="py-4 px-2">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={product.thumbnail_url || ""}
                                  alt=""
                                  className="w-10 h-10 rounded-lg object-cover bg-stone-200 dark:bg-stone-800"
                                />
                                <div>
                                  <p className="font-medium text-slate-900 dark:text-white line-clamp-1">{product.title}</p>
                                  <p className="text-xs text-slate-500 capitalize">{product.category_id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-2 text-sm text-slate-600 dark:text-slate-300">
                              {product.creator_id}
                            </td>
                            <td className="py-4 px-2 text-sm font-medium">
                              ${product.price}
                            </td>
                            <td className="py-4 px-2">
                              <Badge className={getStatusColor(product.status)}>
                                {product.status}
                              </Badge>
                            </td>
                            <td className="py-4 px-2 text-sm">
                              {product.sales_count || 0}
                            </td>
                            <td className="py-4 px-2 text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-xl h-8 w-8 text-stone-600 hover:text-stone-700 hover:bg-stone-100"
                                  onClick={() => {
                                    onSelectProduct(product)
                                    onNavigate("product")
                                  }}
                                  title="Preview"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-xl h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                  onClick={() => handleEditClick(product)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-xl h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {products.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      No products found.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass-morphism rounded-2xl">
                <CardHeader>
                  <CardTitle>Review Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Average Review Time</span>
                      <span className="font-semibold">2.3 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Approval Rate</span>
                      <span className="font-semibold text-green-600">78%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Products This Month</span>
                      <span className="font-semibold">156</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Active Reviewers</span>
                      <span className="font-semibold">5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-morphism rounded-2xl">
                <CardHeader>
                  <CardTitle>Category Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>UI Kits</span>
                      <span className="font-semibold">34%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Scripts</span>
                      <span className="font-semibold">28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Templates</span>
                      <span className="font-semibold">22%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Full Games</span>
                      <span className="font-semibold">16%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <Card className="glass-morphism rounded-2xl">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-stone-200/50 dark:border-stone-800/30 rounded-xl">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">{user.full_name || "Unknown"}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{user.role}</Badge>
                          {user.is_verified && (
                            <Badge className="bg-blue-100 text-blue-700">Verified</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Select
                          value={user.role}
                          onValueChange={(value: any) => {
                            mockDb.updateUser(user.id, { role: value })
                            toast.success("User role updated")
                          }}
                        >
                          <SelectTrigger className="w-[120px] rounded-xl h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="creator">Creator</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="rounded-xl"
                          onClick={() => {
                            if (window.confirm(`Delete user ${user.email}?`)) {
                              mockDb.deleteUser(user.id)
                              toast.success("User deleted")
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sellers" className="mt-6">
            <Card className="glass-morphism rounded-2xl">
              <CardHeader>
                <CardTitle>Seller Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No pending applications.</div>
                  ) : (
                    applications.map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-4 border border-stone-200/50 dark:border-stone-800/30 rounded-xl">
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">{app.businessName}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-300">Applicant: {app.fullName} ({app.email})</p>
                          <p className="text-xs text-slate-500 mb-1">Category: {app.category}</p>
                          <Badge className={
                            app.status === "approved" ? "bg-green-100 text-green-700" :
                              app.status === "rejected" ? "bg-red-100 text-red-700" :
                                "bg-yellow-100 text-yellow-700"
                          }>
                            {app.status}
                          </Badge>
                          <p className="mt-2 text-sm text-muted-foreground italic">"{app.bio}"</p>
                        </div>
                        <div className="flex gap-2 flex-col sm:flex-row">
                          {app.status === "pending" && (
                            <>
                              <Button onClick={() => handleApplicationAction(app.id, "approved")} size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-xl">Approve</Button>
                              <Button onClick={() => handleApplicationAction(app.id, "rejected")} variant="destructive" size="sm" className="rounded-xl">Reject</Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disputes" className="mt-6">
            <Card className="glass-morphism rounded-2xl">
              <CardHeader>
                <CardTitle>Active Disputes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 1, id_code: "DSP-1023", buyer: "User123", seller: "DevMaster", issue: "Item not working", status: "open" },
                  ].map((dispute) => (
                    <div key={dispute.id} className="flex items-center justify-between p-4 border border-stone-200/50 dark:border-stone-800/30 rounded-xl">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">{dispute.id_code}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Issue: {dispute.issue}</p>
                        <p className="text-xs text-slate-500">Parties: {dispute.buyer} vs {dispute.seller}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl"
                        onClick={() => toast.info("Dispute details view under construction")}
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Make changes to the product details as an administrator.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price ($)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={editForm.status}
                  onValueChange={(value) => setEditForm({ ...editForm, status: value })}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select
                value={editForm.category}
                onValueChange={(value) => setEditForm({ ...editForm, category: value })}
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
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                rows={4}
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="rounded-xl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button onClick={handleUpdateProduct} className="bg-ambient-600 text-white rounded-xl">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div >
  )
}
