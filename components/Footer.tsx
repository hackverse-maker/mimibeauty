'use client'

import Link from 'next/link'
import { Share2, Heart, Mail, Phone, MapPin, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', href: '/products' },
        { label: 'Cleansers', href: '/products?category=cleansers' },
        { label: 'Serums', href: '/products?category=serums' },
        { label: 'Moisturizers', href: '/products?category=moisturizers' },
        { label: 'Sunscreens', href: '/products?category=sunscreens' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Wishlist', href: '/wishlist' },
        { label: 'My Account', href: '/account' },
        { label: 'Cart', href: '/cart' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Team', href: '/about#team' },
        { label: 'Sustainability', href: '/about#values' },
        { label: 'Login', href: '/login' },
        { label: 'Register', href: '/register' },
      ],
    },
  ]

  return (
    <footer className="bg-luxury-charcoal text-white">
      {/* Newsletter Section */}
      <div className="bg-luxury-gold py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Join Our Glow Club</h3>
            <p className="text-white/80 mb-6">
              Subscribe for exclusive deals, skincare tips, and early access to new launches.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-luxury-charcoal focus:outline-none focus:ring-2 focus:ring-luxury-charcoal bg-white"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-luxury-charcoal text-luxury-gold font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-luxury-gold to-luxury-rose rounded-lg flex items-center justify-center">
                <span className="text-luxury-charcoal font-bold">LG</span>
              </div>
              <span className="text-xl font-bold">Luxe Glow</span>
            </div>
            <p className="text-white/70 text-sm mb-4 max-w-xs">
              Premium skincare crafted with natural ingredients for your most radiant skin.
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex items-center space-x-2">
                <MapPin size={16} /> <span>Los Angeles, CA 90001</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} /> <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} /> <span>hello@luxeglow.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} /> <span>Mon-Fri 9AM-6PM PST</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-luxury-gold">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-luxury-gold transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex items-center justify-center space-x-6 mb-6">
            {[
              { icon: <Heart size={20} />, label: 'Instagram', href: 'https://instagram.com' },
              { icon: <Share2 size={20} />, label: 'Twitter', href: 'https://twitter.com' },
              { icon: <Mail size={20} />, label: 'LinkedIn', href: 'https://linkedin.com' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-white/70 hover:text-luxury-gold transition-colors duration-300"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div className="text-center text-white/60 text-xs">
            <div className="flex items-center justify-center space-x-4 mb-3 flex-wrap">
              <span>✓ Dermatologist Tested</span>
              <span>✓ Cruelty Free</span>
              <span>✓ Vegan</span>
              <span>✓ Natural Ingredients</span>
            </div>
            <p>
              Copyright © {currentYear} Luxe Glow. All rights reserved. |{' '}
              <Link href="/about" className="hover:text-luxury-gold transition-colors">Privacy Policy</Link>{' '}
              |{' '}
              <Link href="/about" className="hover:text-luxury-gold transition-colors">Terms of Service</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
