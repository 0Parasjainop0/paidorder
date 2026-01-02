import { NextResponse } from "next/server"
import Stripe from "stripe"
import { SEED_DATA } from "@/lib/seed-data"

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover", // Use latest or appropriate version
})

export async function POST(req: Request) {
    try {
        const { items, stripeAccountId } = await req.json()

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

            // Fetch product from seed data (server-side safe)
            const product = SEED_DATA.products.find(p => p.id === item.id)
            let price = 0

            if (product) {
                price = product.price
            } else if (item.price) {
                // Fallback to client price for dynamically created items
                price = Number(item.price)
            } else {
                console.warn(`Product not found and no price provided: ${item.id}`)
                continue
            }

            const quantity = item.quantity

            // Add to total
            total += price * quantity
        }

        const finalTotal = total

        // Create PaymentIntent
        // Amount in cents (USD)
        const amountInCents = Math.round(finalTotal * 100)

        if (amountInCents < 50) {
            return new NextResponse("Amount too small", { status: 400 })
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: "inr",
            payment_method_types: ["card"],
            application_fee_amount: Math.round(amountInCents * 0.15), // 15% to platform
            transfer_data: {
                destination: stripeAccountId || 'acct_123456789', // Use dynamic ID or fallback
            },
        })

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            amount: finalTotal, // Return formulated total for UI verification if needed
        })

    } catch (error: any) {
        console.error("[PAYMENT_INTENT_ERROR]", error)
        return new NextResponse(`Internal Error: ${error.message}`, { status: 500 })
    }
}
