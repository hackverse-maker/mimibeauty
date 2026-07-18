'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface CartItem {
  id: number
  slug: string
  name: string
  price: number
  image: string
  emoji: string
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, qty: number) => void
  clearCart: () => void
  total: number
  count: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem: CartContextValue['addItem'] = (item, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id)
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + qty } : p
        )
      }
      return [...prev, { ...item, quantity: qty }]
    })
    setIsOpen(true)
  }

  const removeItem = (id: number) =>
    setItems((prev) => prev.filter((p) => p.id !== id))

  const updateQuantity = (id: number, qty: number) =>
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, qty) } : p))
    )

  const clearCart = () => setItems([])

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        count,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
