import { NextResponse } from "next/server"
import Stripe from "stripe"
import { mockDb } from "@/lib/mock-db"

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-02-24.acacia", // Use latest or appropriate version
})

export async function POST(req: Request) {
    try {
        const { items } = await req.json()

        if (!items || !Array.isArray(items)) {
            return new NextResponse("Invalid request body", { status: 400 })
        }

        // Calculate total amount on server side
        let total = 0

        // Validate items and calculate total
        for (const item of items) {
            if (!item.id || !item.quantity) {
                continue
            }

            // Fetch product from mock DB (server-side safe via SEED_DATA fallback)
            const product = mockDb.getProduct(item.id)

            if (!product) {
                console.warn(`Product not found: ${item.id}`)
                continue
            }

            const price = product.price
            const quantity = item.quantity

            // Add to total
            total += price * quantity
        }

        // Add 5% platform fee
        const platformFee = total * 0.05
        const finalTotal = total + platformFee

        // Create PaymentIntent
        // Amount in cents (USD)
        const amountInCents = Math.round(finalTotal * 100)

        if (amountInCents < 50) {
            return new NextResponse("Amount too small", { status: 400 })
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        })

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            amount: finalTotal, // Return formulated total for UI verification if needed
        })

    } catch (error) {
        console.error("[PAYMENT_INTENT_ERROR]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
