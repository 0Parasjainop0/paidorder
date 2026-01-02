"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag, Sparkles, Shield, Zap } from "lucide-react"

export function CartPage() {
    const { items, itemCount, subtotal, removeFromCart, updateQuantity, clearCart } = useCart()

    const total = subtotal

    if (items.length === 0) {
        return (
            <div className="min-h-screen py-20 relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 mesh-gradient dark:mesh-gradient-dark pointer-events-none" />
                <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-ambient-400/20 to-transparent rounded-full blur-3xl animate-float-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-400/15 to-transparent rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '-5s' }} />

                <div className="relative max-w-2xl mx-auto px-4 text-center animate-fade-in-up">
                    <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-gradient-to-br from-ambient-100 to-ambient-50 dark:from-ambient-900/50 dark:to-ambient-950/30 flex items-center justify-center shadow-xl shadow-ambient-500/20 border border-ambient-200/50 dark:border-ambient-700/30">
                        <ShoppingCart className="w-14 h-14 text-ambient-500 animate-bounce-soft" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 gradient-text">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-8 text-lg max-w-md mx-auto">
                        Looks like you haven't added any products yet. Explore our marketplace to find amazing
                        digital products!
                    </p>
                    <Link href="/marketplace">
                        <Button
                            className="group bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-2xl px-8 py-6 text-lg shadow-xl shadow-ambient-500/30 hover:shadow-ambient-500/50 transition-all duration-500 hover:scale-105 btn-shine"
                        >
                            <ShoppingBag className="w-5 h-5 mr-2 group-hover:animate-wiggle" />
                            Browse Marketplace
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-12 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 mesh-gradient dark:mesh-gradient-dark pointer-events-none" />
            <div className="absolute top-20 right-[10%] w-72 h-72 bg-gradient-to-br from-ambient-400/20 to-transparent rounded-full blur-3xl animate-float-slow" />
            <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-gradient-to-br from-purple-400/15 to-transparent rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '-8s' }} />

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 animate-fade-in-up">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            <span className="gradient-text-animated">Shopping Cart</span>
                        </h1>
                        <p className="text-muted-foreground flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
                        </p>
                    </div>
                    <Link href="/marketplace">
                        <Button
                            variant="ghost"
                            className="group text-muted-foreground hover:text-foreground hover:bg-ambient-100/50 dark:hover:bg-ambient-900/30 rounded-xl transition-all duration-300"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Continue Shopping
                        </Button>
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item, index) => (
                            <Card
                                key={item.id}
                                className="group border-ambient-200/50 dark:border-ambient-800/30 bg-card/60 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-ambient-500/10 transition-all duration-500 animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <CardContent className="p-6">
                                    <div className="flex gap-6">
                                        <div className="relative">
                                            <img
                                                src={item.product.thumbnail_url || "/placeholder.svg?height=100&width=100"}
                                                alt={item.product.title}
                                                className="w-24 h-24 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-lg mb-1 group-hover:text-ambient-600 dark:group-hover:text-ambient-400 transition-colors">{item.product.title}</h3>
                                                    <p className="text-sm text-muted-foreground">by {item.product.creator}</p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className="text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all duration-300 hover:scale-110"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </Button>
                                            </div>
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                        className="w-9 h-9 rounded-xl border-ambient-200/50 dark:border-ambient-800/30 hover:bg-ambient-100/50 dark:hover:bg-ambient-900/30 hover:border-ambient-400/50 transition-all duration-300"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </Button>
                                                    <span className="w-10 text-center font-bold text-lg">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        className="w-9 h-9 rounded-xl border-ambient-200/50 dark:border-ambient-800/30 hover:bg-ambient-100/50 dark:hover:bg-ambient-900/30 hover:border-ambient-400/50 transition-all duration-300"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                                <span className="text-xl font-bold gradient-text">
                                                    ₹{(item.product.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {/* Clear Cart Button */}
                        <div className="flex justify-end animate-fade-in-up" style={{ animationDelay: `${items.length * 100}ms` }}>
                            <Button
                                variant="ghost"
                                onClick={clearCart}
                                className="group text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all duration-300"
                            >
                                <Trash2 className="w-4 h-4 mr-2 group-hover:animate-wiggle" />
                                Clear Cart
                            </Button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/60 backdrop-blur-md rounded-2xl sticky top-24 shadow-xl shadow-ambient-500/5 overflow-hidden">
                            {/* Premium header */}
                            <div className="bg-gradient-to-r from-ambient-500/10 to-purple-500/5 border-b border-ambient-200/30 dark:border-ambient-800/20 px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold">Order Summary</h2>
                                    <Badge className="bg-gradient-to-r from-ambient-500/20 to-purple-500/10 text-ambient-600 dark:text-ambient-400 border border-ambient-500/20">
                                        <Sparkles className="w-3 h-3 mr-1" />
                                        Premium
                                    </Badge>
                                </div>
                            </div>

                            <CardContent className="p-6">
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                                    </div>

                                    <div className="border-t border-border/50 pt-4">
                                        <div className="flex justify-between text-xl font-bold">
                                            <span>Total</span>
                                            <span className="gradient-text">₹{total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <Link href="/checkout">
                                    <Button
                                        className="group w-full bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-2xl py-6 text-lg font-semibold shadow-xl shadow-ambient-500/30 hover:shadow-ambient-500/50 transition-all duration-500 hover:scale-[1.02] btn-shine"
                                    >
                                        Proceed to Checkout
                                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>

                                {/* Trust badges */}
                                <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Shield className="w-4 h-4 text-green-500" />
                                        <span>Secure checkout powered by Stripe</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Zap className="w-4 h-4 text-amber-500" />
                                        <span>Instant digital delivery</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
