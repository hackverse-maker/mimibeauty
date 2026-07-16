import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SkinScience - Dermatologist-Tested Skincare',
  description: 'Premium, science-backed skincare formulated for every skin type. Dermatologist-tested, clean ingredients, clinically proven results.',
  generator: 'v0.app',
  openGraph: {
    title: 'SkinScience - Dermatologist-Tested Skincare',
    description: 'Premium, science-backed skincare formulated for every skin type.',
    url: 'https://skinscience.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkinScience - Dermatologist-Tested Skincare',
    description: 'Premium, science-backed skincare formulated for every skin type.',
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
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#FFFFFF' },
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
      <body className="antialiased bg-white text-charcoal">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
