'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
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
    <section className="relative min-h-screen bg-gradient-to-br from-luxury-cream via-luxury-rose/5 to-luxury-cream overflow-hidden pt-0">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-luxury-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-luxury-rose/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-[500px] lg:min-h-[600px]">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationVariants.container}
            className="space-y-6 md:space-y-8"
          >
            {/* Subheading */}
            <motion.div variants={animationVariants.fadeUp}>
              <span className="inline-block px-3 py-1 bg-luxury-gold/10 text-luxury-gold rounded-full text-sm font-semibold">
                ✨ Premium Skincare
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={animationVariants.fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-luxury-charcoal leading-tight"
            >
              Radiant Skin Starts <span className="gradient-text">Here</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={animationVariants.fadeUp}
              className="text-lg md:text-xl text-luxury-charcoal/70 leading-relaxed"
            >
              Luxury skincare crafted with nature&apos;s finest ingredients. Dermatologist-tested, cruelty-free, and results-driven. Discover the glow you deserve.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={animationVariants.fadeUp}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link href="/products">
                <button className="w-full sm:w-auto px-8 py-4 bg-luxury-gold text-white font-semibold rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg-lg shadow-lg transition-all duration-300 ease-out">
                  Shop Now
                </button>
              </Link>
              <Link href="/about">
                <button className="w-full sm:w-auto px-8 py-4 border-2 border-luxury-gold text-luxury-gold font-semibold rounded-lg hover:bg-luxury-gold/5 transition-all duration-300 ease-out">
                  Learn More
                </button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={animationVariants.fadeUp}
              className="grid grid-cols-2 gap-4 pt-6 border-t border-luxury-rose/20"
            >
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center space-x-2 text-sm">
                  <span className="text-xl">{badge.icon}</span>
                  <span className="text-luxury-charcoal font-medium">{badge.label}</span>
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
            {/* Background shape */}
            <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/20 to-luxury-rose/20 rounded-3xl blur-2xl"></div>

            {/* Floating elements */}
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

            {/* Main image placeholder with gradient */}
            <div className="relative h-full w-full rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold to-luxury-rose opacity-20"></div>
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="inline-block">
                    <div className="w-64 h-80 bg-gradient-to-br from-luxury-gold/30 to-luxury-rose/30 rounded-2xl flex items-center justify-center">
                      <svg
                        className="w-32 h-32 text-luxury-gold/50"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-luxury-charcoal/50 text-sm mt-4">Premium Product Image</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <p className="text-luxury-charcoal/50 text-xs mb-2">Scroll to explore</p>
          <svg
            className="w-5 h-5 text-luxury-charcoal/50 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
