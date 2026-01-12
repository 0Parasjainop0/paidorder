"use client"

import { PublicLayout } from "@/components/layouts/public-layout"
import { InvoicePage } from "@/components/invoice-page"

export default function InvoiceRoute() {
    return (
        <PublicLayout>
            <InvoicePage />
        </PublicLayout>
    )
}
