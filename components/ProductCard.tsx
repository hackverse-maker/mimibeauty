'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Eye, ShoppingCart } from 'lucide-react'
import { Product } from '@/lib/products'
import { useCart } from '@/lib/providers/CartProvider'
import { useWishlist } from '@/lib/providers/WishlistProvider'
import { useToast } from '@/lib/providers/ToastProvider'
import QuickView from './QuickView'

interface Props {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { addItem } = useCart()
  const { toggleItem, has } = useWishlist()
  const { toast } = useToast()
  const [quickView, setQuickView] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'text-luxury-gold' : 'text-muted-foreground/40'}>
        ★
      </span>
    ))

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      emoji: product.emoji,
    })
    toast(`${product.name} added to cart`)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()
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
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
        whileHover={{ y: -8 }}
        className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        onClick={() => (window.location.href = `/products/${product.slug}`)}
      >
        {/* Image */}
        <div className="relative h-64 bg-gradient-to-br from-luxury-gold/10 to-luxury-rose/10 dark:from-luxury-gold/15 dark:to-luxury-rose/15 flex items-center justify-center overflow-hidden">
          {discount > 0 && (
            <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              -{discount}%
            </div>
          )}
          {product.isNew && (
            <div className="absolute top-4 left-4 z-10 bg-luxury-gold text-white px-3 py-1 rounded-full text-xs font-semibold">
              NEW
            </div>
          )}

          <button
            onClick={handleWishlist}
            aria-label="Toggle wishlist"
            className="absolute bottom-4 left-4 z-10 p-2 bg-background/90 rounded-full shadow-md hover:bg-luxury-gold hover:text-white transition-all duration-300 hover:scale-110"
          >
            <Heart size={18} fill={has(product.id) ? 'currentColor' : 'none'} className={has(product.id) ? 'text-red-500' : ''} />
          </button>

          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="text-6xl"
          >
            {product.emoji}
          </motion.div>

          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setQuickView(true)
              }}
              className="bg-background text-foreground p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
              aria-label="Quick view"
            >
              <Eye size={20} />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-6">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2 font-semibold">
            {product.category}
          </p>
          <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5 text-sm">{renderStars(product.rating)}</div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews})
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-foreground">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-luxury-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </motion.button>
        </div>
      </motion.div>

      <QuickView product={product} open={quickView} onClose={() => setQuickView(false)} />
    </>
  )
}
