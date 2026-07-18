'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import { useWishlist } from '@/lib/providers/WishlistProvider'
import { useCart } from '@/lib/providers/CartProvider'
import { useToast } from '@/lib/providers/ToastProvider'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageTransition from '@/components/PageTransition'

export default function WishlistPage() {
  const { items, removeItem } = useWishlist()
  const { addItem } = useCart()
  const { toast } = useToast()

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Wishlist' }]} />
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center mt-12">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-8xl mb-6">
              💝
            </motion.div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-8 max-w-md">
              Save your favorite products here for later.
            </p>
            <Link href="/products">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="px-8 py-4 bg-luxury-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                Browse Products
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
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Wishlist' }]} />
        <h1 className="text-4xl font-bold text-foreground mt-6 mb-8">My Wishlist ({items.length})</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-card rounded-2xl overflow-hidden shadow-md group"
              >
                <Link href={`/products/${item.slug}`} className="relative h-48 bg-gradient-to-br from-luxury-gold/20 to-luxury-rose/20 flex items-center justify-center text-6xl block">
                  {item.emoji}
                </Link>
                <div className="p-5">
                  <Link href={`/products/${item.slug}`} className="font-semibold text-foreground hover:text-luxury-gold transition-colors line-clamp-1 block mb-2">
                    {item.name}
                  </Link>
                  <p className="text-luxury-gold font-bold text-lg mb-4">${item.price}</p>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        addItem({
                          id: item.id, slug: item.slug, name: item.name, price: item.price, image: item.image, emoji: item.emoji,
                        })
                        toast(`${item.name} added to cart`)
                      }}
                      className="flex-1 py-2.5 bg-luxury-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <ShoppingCart size={16} /> Add to Cart
                    </motion.button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2.5 border border-border rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  )
}
