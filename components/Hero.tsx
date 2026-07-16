'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen bg-white flex items-center">
      <div className="container-premium grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4 px-4 py-2 bg-pink rounded-full text-sm font-semibold text-charcoal"
          >
            Science Meets Skincare
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl font-serif text-charcoal mb-6 leading-tight text-balance"
          >
            Your Skin&apos;s Best Friend
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-charcoal/70 mb-8 leading-relaxed max-w-lg"
          >
            Dermatologist-tested, clinically proven skincare formulated with clean ingredients for every skin type. Experience the science of beautiful skin.
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-3 mb-8"
          >
            {[
              'Dermatologist Tested',
              'Clinically Proven Results',
              'Clean Ingredients',
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check size={20} className="text-charcoal" />
                <span className="text-charcoal/70">{badge}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-4"
          >
            <Link
              href="/products"
              className="btn-primary bg-charcoal text-white hover:bg-pink hover:text-charcoal"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="btn-secondary border-charcoal text-charcoal"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative hidden md:block"
        >
          <div className="bg-beige rounded-lg overflow-hidden aspect-square shadow-lg-premium">
            <Image
              src="/images/hero-skincare.png"
              alt="Premium Skincare Products"
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg-premium p-4 max-w-xs"
          >
            <p className="text-sm font-semibold text-charcoal mb-1">Recommended for All Skin Types</p>
            <p className="text-xs text-charcoal/60">Gentle yet effective formulations</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
