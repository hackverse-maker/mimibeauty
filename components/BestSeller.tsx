'use client'

import { motion } from 'framer-motion'
import { Heart, Eye } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

export default function BestSeller() {
  const products = [
    {
      id: 1,
      name: 'Radiant Cleanser',
      price: 42,
      originalPrice: 55,
      rating: 4.8,
      reviews: 248,
      image: '🧴',
      category: 'Cleansers',
    },
    {
      id: 2,
      name: 'Glow Serum',
      price: 68,
      originalPrice: 85,
      rating: 4.9,
      reviews: 356,
      image: '✨',
      category: 'Serums',
    },
    {
      id: 3,
      name: 'Luxe Moisturizer',
      price: 52,
      originalPrice: 68,
      rating: 4.7,
      reviews: 192,
      image: '💧',
      category: 'Moisturizers',
    },
    {
      id: 4,
      name: 'Sun Guardian SPF50',
      price: 38,
      originalPrice: 48,
      rating: 4.9,
      reviews: 421,
      image: '☀️',
      category: 'Sunscreens',
    },
    {
      id: 5,
      name: 'Gold Mask Treatment',
      price: 45,
      originalPrice: 60,
      rating: 4.8,
      reviews: 187,
      image: '🎭',
      category: 'Masks',
    },
    {
      id: 6,
      name: 'Eye Contour Cream',
      price: 55,
      originalPrice: 72,
      rating: 4.6,
      reviews: 134,
      image: '👁️',
      category: 'Eye Care',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'text-luxury-gold' : 'text-gray-300'}>
        ★
      </span>
    ))
  }

  const discount = (product: any) => {
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  }

  return (
    <section className="py-16 md:py-24 bg-luxury-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 bg-luxury-gold/10 text-luxury-gold rounded-full text-sm font-semibold mb-4">
            Customer Favorites
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-luxury-charcoal mb-4">
            Our Best Sellers
          </h2>
          <p className="text-luxury-charcoal/60 text-lg max-w-2xl mx-auto">
            Discover the products our customers love most. Handpicked and proven to deliver exceptional results.
          </p>
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={productVariants}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg-lg group">
                {/* Image Container */}
                <div className="relative h-64 bg-gradient-to-br from-luxury-gold/10 to-luxury-rose/10 flex items-center justify-center overflow-hidden">
                  {/* Discount Badge */}
                  {product.originalPrice > product.price && (
                    <div className="absolute top-4 right-4 z-10 bg-luxury-rose text-white px-3 py-1 rounded-full text-sm font-semibold">
                      -{discount(product)}%
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button className="absolute top-4 left-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-luxury-gold hover:text-white transition-all duration-300 ease-out group-hover:scale-110">
                    <Heart size={20} />
                  </button>

                  {/* Product Image (Icon placeholder) */}
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </div>

                  {/* Quick View Button */}
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
                    <div className="flex gap-0.5">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-luxury-charcoal/60">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-luxury-charcoal">
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
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

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-luxury-charcoal text-white font-semibold rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg-lg shadow-lg transition-all duration-300 ease-out">
            View All Products
          </button>
        </div>
      </div>
    </section>
  )
}
