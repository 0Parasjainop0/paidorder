"use client"

import { PublicLayout } from "@/components/layouts/public-layout"
import { ContactPage } from "@/components/contact-page"

export default function ContactRoute() {
    return (
        <PublicLayout>
            <ContactPage />
        </PublicLayout>
    )
}
