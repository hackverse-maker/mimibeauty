'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from './ThemeProvider'
import { CartProvider } from './CartProvider'
import { WishlistProvider } from './WishlistProvider'
import { ToastProvider } from './ToastProvider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
