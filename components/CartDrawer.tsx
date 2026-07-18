'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/lib/providers/CartProvider'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, count } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[95]"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card z-[96] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <ShoppingBag size={20} /> Cart ({count})
              </h2>
              <button onClick={closeCart} aria-label="Close cart" className="p-2 hover:bg-muted rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <div className="text-6xl mb-4">🛍️</div>
                <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Discover our luxury skincare products
                </p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="px-6 py-3 bg-luxury-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="flex gap-4 bg-muted/50 rounded-xl p-3"
                    >
                      <Link href={`/products/${item.slug}`} onClick={closeCart} className="w-16 h-16 rounded-lg bg-gradient-to-br from-luxury-gold/20 to-luxury-rose/20 flex items-center justify-center text-3xl flex-shrink-0">
                        {item.emoji}
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.slug}`} onClick={closeCart} className="font-semibold text-sm hover:text-luxury-gold transition-colors line-clamp-1">
                          {item.name}
                        </Link>
                        <p className="text-luxury-gold font-bold mt-1">${item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-md border border-border hover:bg-background transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-md border border-border hover:bg-background transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto p-1 text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-border p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-xl font-bold">${total.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Shipping & taxes calculated at checkout</p>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="block w-full py-3 bg-luxury-gold text-white font-semibold rounded-lg text-center hover:shadow-lg transition-all"
                  >
                    Checkout
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="block w-full py-3 border border-border text-center rounded-lg hover:bg-muted transition-colors font-medium"
                  >
                    View Cart
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
