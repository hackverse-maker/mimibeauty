'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X, ShoppingCart, Heart, Star } from 'lucide-react'
import { Product } from '@/lib/products'
import { useCart } from '@/lib/providers/CartProvider'
import { useWishlist } from '@/lib/providers/WishlistProvider'
import { useToast } from '@/lib/providers/ToastProvider'

interface Props {
  product: Product | null
  open: boolean
  onClose: () => void
}

export default function QuickView({ product, open, onClose }: Props) {
  const { addItem } = useCart()
  const { toggleItem, has } = useWishlist()
  const { toast } = useToast()

  if (!product) return null

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      emoji: product.emoji,
    })
    toast(`${product.name} added to cart`)
    onClose()
  }

  const handleWishlist = () => {
    toggleItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      emoji: product.emoji,
    })
    toast(
      has(product.id) ? 'Removed from wishlist' : 'Added to wishlist',
      has(product.id) ? 'info' : 'success'
    )
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="relative h-64 md:h-full min-h-[300px] bg-gradient-to-br from-luxury-gold/20 to-luxury-rose/20 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="text-8xl"
                >
                  {product.emoji}
                </motion.div>
              </div>

              {/* Details */}
              <div className="p-8 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2 font-semibold">
                  {product.category}
                </p>
                <h2 className="text-2xl font-bold text-foreground mb-3">{product.name}</h2>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(product.rating) ? 'text-luxury-gold fill-luxury-gold' : 'text-muted-foreground/40'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-2">Key Benefits</h4>
                  <ul className="space-y-1">
                    {product.benefits.map((b) => (
                      <li key={b} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="text-luxury-gold">✓</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold text-foreground">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="flex-1 py-3 bg-luxury-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWishlist}
                    className="p-3 border-2 border-luxury-gold/30 rounded-lg hover:border-luxury-gold transition-colors"
                    aria-label="Wishlist"
                  >
                    <Heart size={20} fill={has(product.id) ? 'currentColor' : 'none'} className={has(product.id) ? 'text-red-500' : 'text-foreground'} />
                  </motion.button>
                </div>

                <button
                  onClick={() => (window.location.href = `/products/${product.slug}`)}
                  className="w-full mt-3 text-sm text-luxury-gold hover:underline font-medium"
                >
                  View full details →
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
