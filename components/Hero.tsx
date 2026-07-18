'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { animationVariants } from '@/lib/theme'

export default function Hero() {
  const trustBadges = [
    { icon: '✓', label: 'Dermatologist Tested' },
    { icon: '🌿', label: 'Natural Ingredients' },
    { icon: '🐰', label: 'Cruelty Free' },
    { icon: '🌱', label: 'Vegan' },
  ]

  return (
    <section className="relative min-h-[90vh] bg-gradient-to-br from-background via-luxury-rose/5 to-background overflow-hidden pt-12 md:pt-16">
      <div className="absolute top-20 left-10 w-72 h-72 bg-luxury-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-luxury-rose/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-[500px] lg:min-h-[600px]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationVariants.container}
            className="space-y-6 md:space-y-8"
          >
            <motion.div variants={animationVariants.fadeUp}>
              <span className="inline-block px-3 py-1 bg-luxury-gold/10 text-luxury-gold rounded-full text-sm font-semibold">
                ✨ Premium Skincare
              </span>
            </motion.div>

            <motion.h1
              variants={animationVariants.fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
            >
              Radiant Skin Starts <span className="gradient-text">Here</span>
            </motion.h1>

            <motion.p
              variants={animationVariants.fadeUp}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
            >
              Luxury skincare crafted with nature&apos;s finest ingredients. Dermatologist-tested, cruelty-free, and results-driven. Discover the glow you deserve.
            </motion.p>

            <motion.div variants={animationVariants.fadeUp} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 py-4 bg-luxury-gold text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  Shop Now
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 py-4 border-2 border-luxury-gold text-luxury-gold font-semibold rounded-lg hover:bg-luxury-gold/5 transition-colors"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              variants={animationVariants.fadeUp}
              className="grid grid-cols-2 gap-4 pt-6 border-t border-border"
            >
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center space-x-2 text-sm">
                  <span className="text-xl">{badge.icon}</span>
                  <span className="text-foreground font-medium">{badge.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[400px] md:h-[500px] lg:h-[600px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/20 to-luxury-rose/20 rounded-3xl blur-2xl"></div>

            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-10 right-10 w-32 h-32 bg-luxury-gold/20 rounded-full blur-xl"
            ></motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-20 left-10 w-40 h-40 bg-luxury-rose/20 rounded-full blur-xl"
            ></motion.div>

            <div className="relative h-full w-full rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold to-luxury-rose opacity-20"></div>
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-64 h-80 bg-gradient-to-br from-luxury-gold/30 to-luxury-rose/30 rounded-2xl flex items-center justify-center mx-auto"
                  >
                    <span className="text-8xl">✨</span>
                  </motion.div>
                  <p className="text-muted-foreground text-sm mt-4">Premium Skincare</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <p className="text-muted-foreground text-xs mb-2">Scroll to explore</p>
          <svg className="w-5 h-5 text-muted-foreground mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
