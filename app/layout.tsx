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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
