'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  badge?: string
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  badge,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="card-premium"
    >
      <Link href={`/products/${id}`} className="block group">
        {/* Image Container */}
        <div className="product-image-wrapper relative">
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
          
          {/* Badges */}
          {badge && (
            <div className="absolute top-4 left-4 bg-pink text-charcoal px-3 py-1 text-xs font-semibold rounded">
              {badge}
            </div>
          )}
          
          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-charcoal text-white px-3 py-1 text-xs font-semibold rounded">
              -{discount}%
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-premium"></div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-serif text-lg text-charcoal mb-1 line-clamp-2 group-hover:text-pink transition-premium">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className={`text-xs ${i < Math.floor(rating) ? 'text-charcoal' : 'text-gray'}`}>
                    ★
                  </span>
                ))}
            </div>
            <span className="text-xs text-charcoal/60">({reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-semibold text-charcoal">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-sm text-charcoal/40 line-through">${originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="px-4 pb-4 space-y-2">
        <button className="btn-primary w-full flex items-center justify-center gap-2">
          <ShoppingCart size={18} />
          Add to Cart
        </button>
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`w-full py-2 border-2 rounded font-semibold transition-premium ${
            isWishlisted
              ? 'bg-pink border-pink text-charcoal'
              : 'bg-white border-charcoal text-charcoal hover:bg-beige'
          }`}
        >
          <Heart size={18} className="inline mr-2" fill={isWishlisted ? 'currentColor' : 'none'} />
          {isWishlisted ? 'Wishlisted' : 'Wishlist'}
        </button>
      </div>
    </motion.div>
  )
}
