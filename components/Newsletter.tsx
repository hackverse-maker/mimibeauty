'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate form submission
    setTimeout(() => {
      if (email) {
        setStatus('success')
        setEmail('')
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        setStatus('error')
      }
    }, 1000)
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-luxury-rose via-luxury-rose/10 to-luxury-cream relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-luxury-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-luxury-rose/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block px-3 py-1 bg-luxury-gold/20 text-luxury-gold rounded-full text-sm font-semibold mb-4">
            Stay Updated
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-luxury-charcoal mb-4">
            Join Our Glow Club
          </h2>
          <p className="text-luxury-charcoal/70 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to get exclusive deals, skincare tips, and be the first to know about new launches.
            Plus, receive 15% off your first order!
          </p>

          {/* Newsletter Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-lg text-luxury-charcoal placeholder:text-luxury-charcoal/40 focus:outline-none focus:ring-2 focus:ring-luxury-gold shadow-md"
              required
              disabled={status === 'loading'}
            />
            <motion.button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 ease-out shadow-md ${
                status === 'success'
                  ? 'bg-green-500 text-white'
                  : 'bg-luxury-gold text-white hover:bg-opacity-90'
              }`}
            >
              {status === 'loading' ? 'Subscribing...' : status === 'success' ? '✓ Subscribed!' : 'Subscribe'}
            </motion.button>
          </motion.form>

          {/* Status Message */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-green-600 text-sm font-medium"
              >
                Welcome to Luxe Glow! Check your inbox for your exclusive discount code.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-600 text-sm font-medium"
              >
                Please enter a valid email address.
              </motion.p>
            )}
          </AnimatePresence>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-luxury-charcoal/70"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">📧</span>
              <span>Weekly Tips</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-luxury-gold/50"></div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🎁</span>
              <span>Exclusive Offers</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-luxury-gold/50"></div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🚀</span>
              <span>Early Access</span>
            </div>
          </motion.div>

          <p className="text-xs text-luxury-charcoal/50 mt-8">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
