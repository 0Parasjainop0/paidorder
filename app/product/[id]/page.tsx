"use client"

import { PublicLayout } from "@/components/layouts/public-layout"
import { ProductPage } from "@/components/product-page"

export default function ProductRoute() {
    return (
        <PublicLayout>
            <ProductPage />
        </PublicLayout>
    )
}
