'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface WishlistItem {
  id: number
  slug: string
  name: string
  price: number
  image: string
  emoji: string
}

interface WishlistContextValue {
  items: WishlistItem[]
  toggleItem: (item: WishlistItem) => void
  addItem: (item: WishlistItem) => void
  removeItem: (id: number) => void
  has: (id: number) => boolean
  count: number
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  const has = (id: number) => items.some((i) => i.id === id)

  const addItem = (item: WishlistItem) =>
    setItems((prev) => (prev.some((i) => i.id === item.id) ? prev : [...prev, item]))

  const removeItem = (id: number) =>
    setItems((prev) => prev.filter((i) => i.id !== id))

  const toggleItem = (item: WishlistItem) =>
    setItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    )

  return (
    <WishlistContext.Provider
      value={{ items, toggleItem, addItem, removeItem, has, count: items.length }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
