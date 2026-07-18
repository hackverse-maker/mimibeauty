'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import { categories } from '@/lib/products'

export default function FeaturedCategories() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 bg-luxury-gold/10 text-luxury-gold rounded-full text-sm font-semibold mb-4">
            Shop By Category
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Discover Our Collections
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our carefully curated skincare collections, each designed to address specific skin concerns and deliver visible results.
          </p>
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.slug} variants={itemVariants} whileHover={{ y: -8 }}>
              <Link href={`/products?category=${category.slug}`}>
                <div className={`relative h-64 rounded-2xl bg-gradient-to-br ${category.gradient} overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300`}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-2 right-2 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
                  </div>

                  <div className="relative h-full flex flex-col items-center justify-center text-center p-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="text-5xl mb-4"
                    >
                      {category.emoji}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{category.name}</h3>
                    <p className="text-foreground/70 text-sm">{category.description}</p>

                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                      <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
