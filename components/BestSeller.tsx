'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import AnimatedSection from './AnimatedSection'
import ProductCard from './ProductCard'
import { getBestSellers } from '@/lib/products'

export default function BestSeller() {
  const products = getBestSellers(6)

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 bg-luxury-gold/10 text-luxury-gold rounded-full text-sm font-semibold mb-4">
            Customer Favorites
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Best Sellers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the products our customers love most. Handpicked and proven to deliver exceptional results.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-foreground text-background font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
