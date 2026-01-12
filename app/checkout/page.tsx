"use client"

import { PublicLayout } from "@/components/layouts/public-layout"
import { CheckoutPage } from "@/components/checkout-page"

export default function CheckoutRoute() {
    return (
        <PublicLayout>
            <CheckoutPage />
        </PublicLayout>
    )
}
