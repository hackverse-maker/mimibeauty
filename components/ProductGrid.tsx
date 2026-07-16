'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Eye } from 'lucide-react'

interface Product {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
}

interface ProductGridProps {
  products?: Product[]
  itemsPerPage?: number
}

const defaultProducts: Product[] = [
  {
    id: 1,
    name: 'Radiant Cleanser',
    category: 'Cleansers',
    price: 42,
    originalPrice: 55,
    rating: 4.8,
    reviews: 248,
    image: '🧴',
  },
  {
    id: 2,
    name: 'Glow Serum',
    category: 'Serums',
    price: 68,
    originalPrice: 85,
    rating: 4.9,
    reviews: 356,
    image: '✨',
  },
  {
    id: 3,
    name: 'Luxe Moisturizer',
    category: 'Moisturizers',
    price: 52,
    originalPrice: 68,
    rating: 4.7,
    reviews: 192,
    image: '💧',
  },
  {
    id: 4,
    name: 'Sun Guardian SPF50',
    category: 'Sunscreens',
    price: 38,
    originalPrice: 48,
    rating: 4.9,
    reviews: 421,
    image: '☀️',
  },
  {
    id: 5,
    name: 'Gold Mask Treatment',
    category: 'Masks',
    price: 45,
    originalPrice: 60,
    rating: 4.8,
    reviews: 187,
    image: '🎭',
  },
  {
    id: 6,
    name: 'Eye Contour Cream',
    category: 'Eye Care',
    price: 55,
    originalPrice: 72,
    rating: 4.6,
    reviews: 134,
    image: '👁️',
  },
]

export default function ProductGrid({
  products = defaultProducts,
  itemsPerPage = 12,
}: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'price-asc' | 'price-desc'>(
    'newest'
  )

  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedProducts = products.slice(startIndex, startIndex + itemsPerPage)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'text-luxury-gold' : 'text-gray-300'}>
        ★
      </span>
    ))
  }

  const discount = (product: Product) => {
    if (!product.originalPrice) return 0
    return Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  }

  return (
    <div>
      {/* Sort Bar */}
      <div className="mb-8 flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
        <p className="text-luxury-charcoal/60">Showing {displayedProducts.length} products</p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-2 border border-luxury-rose/20 rounded-lg text-luxury-charcoal focus:outline-none focus:ring-2 focus:ring-luxury-gold"
        >
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={currentPage}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        {displayedProducts.map((product) => (
          <motion.div key={product.id} variants={itemVariants}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg-lg group">
              {/* Image Container */}
              <div className="relative h-64 bg-gradient-to-br from-luxury-gold/10 to-luxury-rose/10 flex items-center justify-center overflow-hidden">
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="absolute top-4 right-4 z-10 bg-luxury-rose text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{discount(product)}%
                  </div>
                )}

                <button className="absolute top-4 left-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-luxury-gold hover:text-white transition-all duration-300 ease-out group-hover:scale-110">
                  <Heart size={20} />
                </button>

                <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </div>

                <button className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white text-luxury-charcoal p-3 rounded-full">
                    <Eye size={24} />
                  </div>
                </button>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <p className="text-xs uppercase tracking-wide text-luxury-charcoal/50 mb-2 font-semibold">
                  {product.category}
                </p>
                <h3 className="text-lg font-bold text-luxury-charcoal mb-3 line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">{renderStars(product.rating)}</div>
                  <span className="text-sm text-luxury-charcoal/60">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-luxury-charcoal">
                    ${product.price}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-luxury-charcoal/50 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button className="w-full py-3 bg-luxury-gold text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 ease-out shadow-md">
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-luxury-rose/20 rounded-lg text-luxury-charcoal hover:bg-luxury-cream disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-out"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg transition-all duration-300 ease-out ${
                  currentPage === page
                    ? 'bg-luxury-gold text-white'
                    : 'border border-luxury-rose/20 text-luxury-charcoal hover:bg-luxury-cream'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-luxury-rose/20 rounded-lg text-luxury-charcoal hover:bg-luxury-cream disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-out"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
