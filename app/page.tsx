"use client"

import { PublicLayout } from "@/components/layouts/public-layout"
import { LandingPage } from "@/components/landing-page"

export default function Home() {
  return (
    <PublicLayout>
      <LandingPage />
    </PublicLayout>
  )
}
