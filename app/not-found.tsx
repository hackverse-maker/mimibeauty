'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-32">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-9xl mb-6"
      >
        🔍
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-6xl font-bold text-foreground mb-4"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl text-muted-foreground mb-8 max-w-md"
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 bg-luxury-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            Back to Home
          </motion.button>
        </Link>
        <Link href="/products">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 border-2 border-luxury-gold text-luxury-gold font-semibold rounded-lg hover:bg-luxury-gold/5 transition-colors"
          >
            Browse Products
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}
