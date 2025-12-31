"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag } from "lucide-react"

interface CartPageProps {
    onNavigate: (page: string) => void
}

export function CartPage({ onNavigate }: CartPageProps) {
    const { items, itemCount, subtotal, removeFromCart, updateQuantity, clearCart } = useCart()

    const platformFee = subtotal * 0.05 // 5% platform fee
    const total = subtotal + platformFee

    if (items.length === 0) {
        return (
            <div className="min-h-screen py-20">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-ambient-100 dark:bg-ambient-900/50 flex items-center justify-center">
                        <ShoppingCart className="w-12 h-12 text-ambient-500" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-8">
                        Looks like you haven't added any products yet. Explore our marketplace to find amazing
                        digital products!
                    </p>
                    <Button
                        onClick={() => onNavigate("marketplace")}
                        className="bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-2xl px-8 py-6 text-lg"
                    >
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        Browse Marketplace
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-12">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-ambient-50/30 via-transparent to-ambient-100/20 dark:from-ambient-950/20 dark:via-transparent dark:to-ambient-900/10 pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
                        <p className="text-muted-foreground">
                            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => onNavigate("marketplace")}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Continue Shopping
                    </Button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <Card
                                key={item.id}
                                className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden"
                            >
                                <CardContent className="p-6">
                                    <div className="flex gap-6">
                                        <img
                                            src={item.product.thumbnail_url || "/placeholder.svg?height=100&width=100"}
                                            alt={item.product.title}
                                            className="w-24 h-24 object-cover rounded-xl"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-lg mb-1">{item.product.title}</h3>
                                                    <p className="text-sm text-muted-foreground">by {item.product.creator}</p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className="text-muted-foreground hover:text-red-500 rounded-xl"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </Button>
                                            </div>
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-3">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                        className="w-8 h-8 rounded-lg"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </Button>
                                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        className="w-8 h-8 rounded-lg"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                                <span className="text-xl font-bold">
                                                    ${(item.product.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {/* Clear Cart Button */}
                        <div className="flex justify-end">
                            <Button
                                variant="ghost"
                                onClick={clearCart}
                                className="text-muted-foreground hover:text-red-500"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Clear Cart
                            </Button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl sticky top-24">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Platform fee (5%)</span>
                                        <span>${platformFee.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-border pt-4">
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => onNavigate("checkout")}
                                    className="w-full bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-2xl py-6 text-lg font-semibold shadow-lg shadow-ambient-500/25"
                                >
                                    Proceed to Checkout
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>

                                <p className="text-xs text-muted-foreground text-center mt-4">
                                    Secure checkout powered by Stripe
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
