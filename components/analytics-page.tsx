"use client"

import { useState, useEffect } from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell
} from "recharts"
import {
    TrendingUp,
    Users,
    ShoppingBag,
    Eye,
    ArrowUpRight,
    ArrowDownRight,
    Rocket,
    BarChart3,
    PieChart as PieChartIcon,
    LineChart,
    Calendar,
    Filter
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { SellerApplicationModal } from "@/components/auth/seller-application-modal"

const salesData = [
    { name: "Mon", sales: 40, revenue: 2400 },
    { name: "Tue", sales: 30, revenue: 1398 },
    { name: "Wed", sales: 20, revenue: 9800 },
    { name: "Thu", sales: 27, revenue: 3908 },
    { name: "Fri", sales: 18, revenue: 4800 },
    { name: "Sat", sales: 23, revenue: 3800 },
    { name: "Sun", sales: 34, revenue: 4300 },
]

const categoryData = [
    { name: "Templates", value: 400 },
    { name: "Design", value: 300 },
    { name: "Code", value: 300 },
    { name: "Courses", value: 200 },
]

const COLORS = ["#8b5cf6", "#06b6d4", "#f59e0b", "#10b981"]

interface AnalyticsPageProps {
    onNavigate: (page: string) => void
}

export function AnalyticsPage({ onNavigate }: AnalyticsPageProps) {
    const { profile, loading } = useAuth()
    const [showSellerModal, setShowSellerModal] = useState(false)
    const isSeller = profile?.role === "creator" || profile?.role === "admin"

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-ambient-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!isSeller) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-ambient-500 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                    <Card className="relative bg-background/80 backdrop-blur-xl border-border/50 rounded-[2rem] overflow-hidden p-12 text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-ambient-500/10 text-ambient-600 mb-8 animate-float">
                            <TrendingUp className="w-10 h-10" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight gradient-text">
                            Unlock Your Seller Insights
                        </h1>
                        <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
                            Join our community of creators today! Once you're a verified seller,
                            you'll get access to powerful analytics, detailed sales reports,
                            and advanced customer insights to grow your business.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                size="lg"
                                onClick={() => setShowSellerModal(true)}
                                className="group relative bg-gradient-to-r from-ambient-500 via-ambient-600 to-ambient-500 hover:from-ambient-600 hover:via-ambient-700 hover:to-ambient-600 text-white rounded-2xl px-10 py-8 text-xl font-bold shadow-xl shadow-ambient-500/30 hover:shadow-ambient-500/50 transition-all duration-500 hover:scale-105 btn-shine overflow-hidden"
                            >
                                <Rocket className="w-6 h-6 mr-2 animate-pulse" />
                                Apply to be a Seller
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => onNavigate("marketplace")}
                                className="border-2 border-ambient-200 dark:border-ambient-800 rounded-2xl px-10 py-8 text-xl font-semibold hover:bg-ambient-50 dark:hover:bg-ambient-950/30 transition-all duration-300"
                            >
                                Browse Products
                            </Button>
                        </div>
                    </Card>
                </div>
                <SellerApplicationModal isOpen={showSellerModal} onClose={() => setShowSellerModal(false)} />
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight gradient-text">Seller Analytics</h1>
                    <p className="text-muted-foreground mt-1">Detailed performance tracking for your digital products.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl border-border/50">
                        <Calendar className="w-4 h-4 mr-2" />
                        Last 30 Days
                    </Button>
                    <Button variant="outline" className="rounded-xl border-border/50">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </Button>
                </div>
            </header>

            {/* Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Revenue", value: "$24,560", trend: "+12.5%", trendUp: true, icon: TrendingUp },
                    { label: "Active Customers", value: "1,240", trend: "+5.2%", trendUp: true, icon: Users },
                    { label: "Total Sales", value: "856", trend: "-2.4%", trendUp: false, icon: ShoppingBag },
                    { label: "Product Views", value: "45,280", trend: "+18.3%", trendUp: true, icon: Eye },
                ].map((stat, i) => (
                    <Card key={i} className="relative border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden group hover:border-ambient-400/50 transition-all duration-500 rounded-2xl">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2.5 rounded-xl bg-ambient-500/10 text-ambient-600 transition-colors group-hover:bg-ambient-500 group-hover:text-white duration-500">
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <Badge variant={stat.trendUp ? "default" : "destructive"} className="rounded-lg px-2 py-0.5 text-xs font-bold">
                                    {stat.trendUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                    {stat.trend}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Revenue Chart */}
                <Card className="lg:col-span-2 border-border/50 bg-background/50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 py-6">
                        <div>
                            <CardTitle className="flex items-center">
                                <LineChart className="w-5 h-5 mr-2 text-ambient-600" />
                                Revenue Overview
                            </CardTitle>
                            <CardDescription>Daily revenue performance over time.</CardDescription>
                        </div>
                        <Tabs defaultValue="revenue" className="w-[200px]">
                            <TabsList className="grid w-full grid-cols-2 rounded-xl h-9">
                                <TabsTrigger value="revenue" className="text-xs rounded-lg">Revenue</TabsTrigger>
                                <TabsTrigger value="sales" className="text-xs rounded-lg">Sales</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </CardHeader>
                    <CardContent className="p-8 pt-10">
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888820" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#888888", fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#888888", fontSize: 12 }}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                                            borderRadius: "12px",
                                            border: "none",
                                            color: "#fff",
                                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                                        }}
                                        cursor={{ stroke: "#8b5cf6", strokeWidth: 2 }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#8b5cf6"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorRev)"
                                        animationDuration={2000}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Distribution Chart */}
                <Card className="border-border/50 bg-background/50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-sm">
                    <CardHeader className="border-b border-border/50 py-6">
                        <CardTitle className="flex items-center">
                            <PieChartIcon className="w-5 h-5 mr-2 text-ambient-600" />
                            Sales Distribution
                        </CardTitle>
                        <CardDescription>Sales by product category.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pt-10 flex flex-col items-center">
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                                            borderRadius: "12px",
                                            border: "none",
                                            color: "#fff",
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full mt-6">
                            {categoryData.map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                    <span className="text-sm font-medium">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Activity Table */}
            <Card className="border-border/50 bg-background/50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-sm">
                <CardHeader className="border-b border-border/50 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center">
                                <BarChart3 className="w-5 h-5 mr-2 text-ambient-600" />
                                Top Performing Products
                            </CardTitle>
                            <CardDescription>Your most popular digital items.</CardDescription>
                        </div>
                        <Button variant="ghost" className="text-ambient-600 hover:text-ambient-700 font-semibold px-4 rounded-xl">View All</Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-border/50 bg-muted/20">
                                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Product Name</th>
                                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Sales</th>
                                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Revenue</th>
                                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50 text-sm">
                                {[
                                    { name: "Modern Dash Dashboard UI", cat: "Templates", sales: 245, rev: "$6,125", status: "Trending" },
                                    { name: "Full Stack SaaS Starter Kit", cat: "Code", sales: 189, rev: "$9,450", status: "Hot" },
                                    { name: "Premium Icon Set - 500+", cat: "Design", sales: 156, rev: "$1,560", status: "Stable" },
                                    { name: "React Component Library", cat: "Code", sales: 132, rev: "$3,300", status: "New" },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-muted/30 transition-colors group cursor-pointer font-medium">
                                        <td className="px-6 py-5 group-hover:text-ambient-600 transition-colors">{row.name}</td>
                                        <td className="px-6 py-5 text-muted-foreground">{row.cat}</td>
                                        <td className="px-6 py-5">{row.sales}</td>
                                        <td className="px-6 py-5 font-bold">{row.rev}</td>
                                        <td className="px-6 py-5">
                                            <Badge variant="outline" className={`rounded-xl px-3 border-ambient-200/50 text-ambient-600`}>
                                                {row.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
