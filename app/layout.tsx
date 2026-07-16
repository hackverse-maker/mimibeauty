import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Luxe Glow - Premium Skincare',
  description: 'Discover luxury skincare products crafted with natural ingredients. Dermatologist-tested, cruelty-free, and vegan. Transform your skin with Luxe Glow.',
  generator: 'v0.app',
  openGraph: {
    title: 'Luxe Glow - Premium Skincare',
    description: 'Luxury skincare products for radiant, healthy skin.',
    url: 'https://luxeglow.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxe Glow - Premium Skincare',
    description: 'Luxury skincare products for radiant, healthy skin.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f7' },
    { media: '(prefers-color-scheme: dark)', color: '#faf9f7' },
  ],
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-luxury-cream text-luxury-charcoal">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
