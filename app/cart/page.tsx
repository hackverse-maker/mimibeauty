'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/lib/providers/CartProvider'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageTransition from '@/components/PageTransition'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart, count } = useCart()

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center mt-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-8xl mb-6"
            >
              🛍️
            </motion.div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8 max-w-md">
              Discover our luxury skincare products and start your glow journey today.
            </p>
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-luxury-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Continue Shopping
              </motion.button>
            </Link>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />

        <div className="flex items-center justify-between mt-6 mb-8">
          <h1 className="text-4xl font-bold text-foreground">Shopping Cart ({count})</h1>
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:underline font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-card rounded-2xl p-4 shadow-md flex gap-4"
                >
                  <Link href={`/products/${item.slug}`} className="w-24 h-24 rounded-xl bg-gradient-to-br from-luxury-gold/20 to-luxury-rose/20 flex items-center justify-center text-5xl flex-shrink-0">
                    {item.emoji}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.slug}`} className="font-semibold text-foreground hover:text-luxury-gold transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-luxury-gold font-bold text-lg mt-1">${item.price}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-border rounded-lg">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-muted transition-colors" aria-label="Decrease">
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-muted transition-colors" aria-label="Increase">
                          <Plus size={14} />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors" aria-label="Remove">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="bg-card rounded-2xl p-6 shadow-md h-fit sticky top-32">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <ShoppingBag size={20} /> Order Summary
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-emerald-500 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (estimated)</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
            </div>
            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-foreground">${(total * 1.08).toFixed(2)}</span>
              </div>
            </div>
            <Link href="/checkout">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-luxury-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link href="/products" className="block text-center mt-4 text-sm text-muted-foreground hover:text-luxury-gold transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
