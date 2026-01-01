import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Digiteria',
  description: 'The ultimate marketplace for digital creators',
  generator: 'Digiteria',
  icons: {
    icon: '/logo.png',
  },
}

import { Preloader } from '@/components/ui/preloader'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Preloader />
        {children}
      </body>
    </html>
  )
}
