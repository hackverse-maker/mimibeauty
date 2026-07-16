'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-charcoal text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container-premium py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-serif mb-3 text-white">Join Our Skin Community</h3>
            <p className="text-white/70 mb-6">Get expert skincare tips, new product launches, and exclusive offers delivered to your inbox.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-premium flex-1 bg-white/10 border-white/20 text-white placeholder-white/50"
                required
              />
              <button
                type="submit"
                className="btn-primary bg-pink text-charcoal hover:bg-white"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-pink mt-2 text-sm"
              >
                Thanks for subscribing!
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-premium py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Company */}
          <div>
            <h4 className="font-serif text-lg mb-4 text-white">SkinScience</h4>
            <p className="text-white/60 text-sm mb-4">Premium, science-backed skincare for every skin type.</p>
            <div className="space-y-2 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>1-800-SKINCARE</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>hello@skinscience.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Los Angeles, CA</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Products</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/products?category=cleansers" className="hover:text-white transition-premium">Cleansers</Link></li>
              <li><Link href="/products?category=serums" className="hover:text-white transition-premium">Serums</Link></li>
              <li><Link href="/products?category=moisturizers" className="hover:text-white transition-premium">Moisturizers</Link></li>
              <li><Link href="/products?category=sunscreen" className="hover:text-white transition-premium">Sunscreen</Link></li>
              <li><Link href="/products" className="hover:text-white transition-premium">All Products</Link></li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/about" className="hover:text-white transition-premium">About Us</Link></li>
              <li><Link href="/" className="hover:text-white transition-premium">Our Story</Link></li>
              <li><Link href="/" className="hover:text-white transition-premium">Research</Link></li>
              <li><Link href="/" className="hover:text-white transition-premium">Sustainability</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-premium">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/" className="hover:text-white transition-premium">Help Center</Link></li>
              <li><Link href="/" className="hover:text-white transition-premium">Shipping Info</Link></li>
              <li><Link href="/" className="hover:text-white transition-premium">Returns</Link></li>
              <li><Link href="/" className="hover:text-white transition-premium">FAQs</Link></li>
              <li><Link href="/" className="hover:text-white transition-premium">Track Order</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Policies</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/" className="hover:text-white transition-premium">Privacy Policy</Link></li>
              <li><Link href="/" className="hover:text-white transition-premium">Terms of Service</Link></li>
              <li><Link href="/" className="hover:text-white transition-premium">Cookie Policy</Link></li>
              <li><Link href="/" className="hover:text-white transition-premium">Accessibility</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © 2024 SkinScience. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
