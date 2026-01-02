"use client"

import { PublicLayout } from "@/components/layouts/public-layout"
import { CartPage } from "@/components/cart-page"

export default function CartRoute() {
    return (
        <PublicLayout>
            <CartPage />
        </PublicLayout>
    )
}
