"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { mockDb } from "@/lib/mock-db"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { stripePromise } from "@/lib/stripe"
import {
    Lock,
    ArrowLeft,
    CheckCircle,
    Download,
    ShoppingBag,
    Loader2
} from "lucide-react"
import { toast } from "sonner"

interface CheckoutPageProps {
    onNavigate: (page: string) => void
}

// Inner form component that has access to Stripe Elements context
function CheckoutForm({ onNavigate, orderNumber, setOrderNumber, setIsComplete }: {
    onNavigate: (page: string) => void
    orderNumber: string
    setOrderNumber: (n: string) => void
    setIsComplete: (b: boolean) => void
}) {
    const stripe = useStripe()
    const elements = useElements()
    const { items, subtotal, clearCart } = useCart()
    const { user, profile } = useAuth()

    // Local state for UI
    const [isProcessing, setIsProcessing] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    const platformFee = subtotal * 0.05
    const total = subtotal + platformFee

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return
        }

        setIsProcessing(true)

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: window.location.href, // In this SPA, we might want to handle it manually or let it redirect
            },
            redirect: "if_required", // Prevent redirect if not needed (e.g. valid card)
        })

        if (error) {
            setMessage(error.message ?? "An unexpected error occurred.")
            setIsProcessing(false)
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            // Payment succeeded!

            // Create mock order records to persist the purchase in our "db"
            const newOrderNumber = `DIG-${Date.now().toString(36).toUpperCase()}`

            items.forEach(item => {
                const amount = item.product.price * item.quantity
                const pFee = amount * 0.05
                const sellerAmt = amount - pFee

                mockDb.createOrder({
                    order_number: newOrderNumber,
                    buyer_id: user?.id || "guest",
                    seller_id: item.product.creator_id,
                    product_id: item.product.id,
                    amount: amount,
                    platform_fee: pFee,
                    seller_amount: sellerAmt,
                    payment_method: "stripe",
                    payment_id: paymentIntent.id
                })
            })

            setOrderNumber(newOrderNumber)
            setIsComplete(true)
            clearCart()
            setIsProcessing(false)
        } else {
            setMessage("Payment status: " + paymentIntent?.status)
            setIsProcessing(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Checkout Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Contact Information */}
                    <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        defaultValue={profile?.full_name || ""}
                                        className="mt-2 rounded-xl"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        defaultValue={profile?.email || ""}
                                        className="mt-2 rounded-xl"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Method */}
                    <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-bold mb-6">Payment Details</h2>
                            {/* Stripe Payment Element */}
                            <PaymentElement />
                            {message && (
                                <div className="mt-4 text-red-500 text-sm font-medium">
                                    {message}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl sticky top-24">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            {/* Items */}
                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <img
                                            src={item.product.thumbnail_url || "/placeholder.svg?height=60&width=60"}
                                            alt={item.product.title}
                                            className="w-14 h-14 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-sm line-clamp-1">{item.product.title}</h4>
                                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                        <span className="font-medium">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-border pt-4 space-y-3 mb-6">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Platform fee</span>
                                    <span>${platformFee.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-border pt-3">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isProcessing || !stripe || !elements}
                                className="w-full bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-2xl py-6 text-lg font-semibold shadow-lg shadow-ambient-500/25 disabled:opacity-50"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-5 h-5 mr-2" />
                                        Pay ${total.toFixed(2)}
                                    </>
                                )}
                            </Button>

                            <p className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-1">
                                <Lock className="w-3 h-3" />
                                Your payment is secured with Stripe
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    )
}

export function CheckoutPage({ onNavigate }: CheckoutPageProps) {
    const { items, subtotal } = useCart()
    const [clientSecret, setClientSecret] = useState("")
    const [isComplete, setIsComplete] = useState(false)
    const [orderNumber, setOrderNumber] = useState("")

    // Generate PaymentIntent when page loads
    useEffect(() => {
        if (items.length > 0) {
            // Create PaymentIntent as soon as the page loads
            fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: items.map(item => ({ id: item.product.id, quantity: item.quantity }))
                }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret))
                .catch((err) => console.error("Error creating payment intent:", err))
        }
    }, [items])

    if (items.length === 0 && !isComplete) {
        return (
            <div className="min-h-screen py-20">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-ambient-100 dark:bg-ambient-900/50 flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-ambient-500" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-8">
                        Add some products to your cart before checking out.
                    </p>
                    <Button
                        onClick={() => onNavigate("marketplace")}
                        className="bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-2xl px-8 py-6 text-lg"
                    >
                        Browse Marketplace
                    </Button>
                </div>
            </div>
        )
    }

    if (isComplete) {
        return (
            <div className="min-h-screen py-20">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Order Complete!</h1>
                    <p className="text-muted-foreground mb-2">Thank you for your purchase.</p>
                    <p className="text-lg font-medium mb-8">
                        Order Number: <span className="text-ambient-600 dark:text-ambient-400">{orderNumber}</span>
                    </p>

                    <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl mb-8">
                        <CardContent className="p-8">
                            <h3 className="font-semibold text-lg mb-4">Your Downloads</h3>
                            <p className="text-muted-foreground mb-6">
                                Your purchased items are ready for download. You can also access them anytime from
                                your profile.
                            </p>
                            <Button className="bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-xl">
                                <Download className="w-4 h-4 mr-2" />
                                Download All Products
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button
                            onClick={() => onNavigate("profile")}
                            variant="outline"
                            className="rounded-xl"
                        >
                            View My Purchases
                        </Button>
                        <Button
                            onClick={() => onNavigate("marketplace")}
                            className="bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-xl"
                        >
                            Continue Shopping
                        </Button>
                    </div>
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
                        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
                        <p className="text-muted-foreground">Complete your purchase</p>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => onNavigate("cart")}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Cart
                    </Button>
                </div>

                {clientSecret ? (
                    <Elements options={{ clientSecret, appearance: { theme: 'night' } }} stripe={stripePromise}>
                        <CheckoutForm
                            onNavigate={onNavigate}
                            orderNumber={orderNumber}
                            setOrderNumber={setOrderNumber}
                            setIsComplete={setIsComplete}
                        />
                    </Elements>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-ambient-500" />
                        <span className="ml-3 text-muted-foreground">Initializing secure checkout...</span>
                    </div>
                )}
            </div>
        </div>
    )
}
