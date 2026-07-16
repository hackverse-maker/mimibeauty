'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, Heart, User, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const categories = [
    { name: 'Cleansers', href: '/products?category=cleansers' },
    { name: 'Serums', href: '/products?category=serums' },
    { name: 'Moisturizers', href: '/products?category=moisturizers' },
    { name: 'Sunscreen', href: '/products?category=sunscreen' },
    { name: 'Eye Cream', href: '/products?category=eye-cream' },
    { name: 'Toners', href: '/products?category=toners' },
    { name: 'Face Masks', href: '/products?category=masks' },
    { name: 'Exfoliants', href: '/products?category=exfoliants' },
  ]

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-charcoal text-white text-center py-2 text-sm">
        Free Shipping on Orders Over $50 | Shop Now
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-40 transition-premium ${
          isScrolled ? 'bg-white shadow-md-premium' : 'bg-white'
        }`}
      >
        <div className="container-premium flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-semibold text-serif text-charcoal">
            SkinScience
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="header-link">
              Home
            </Link>
            <div className="relative group">
              <button className="header-link flex items-center gap-1">
                Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {/* Mega Menu */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute left-0 mt-0 w-48 bg-white rounded shadow-lg-premium hidden group-hover:block py-2"
              >
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="block px-4 py-2 text-charcoal hover:bg-beige transition-premium"
                  >
                    {cat.name}
                  </Link>
                ))}
              </motion.div>
            </div>
            <Link href="/about" className="header-link">
              About Us
            </Link>
            <Link href="/contact" className="header-link">
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 hover:bg-beige rounded-full transition-premium">
              <Search size={20} className="text-charcoal" />
            </button>
            <button className="p-2 hover:bg-beige rounded-full transition-premium">
              <Heart size={20} className="text-charcoal" />
            </button>
            <button className="p-2 hover:bg-beige rounded-full transition-premium">
              <User size={20} className="text-charcoal" />
            </button>
            <button className="p-2 hover:bg-beige rounded-full transition-premium relative">
              <ShoppingCart size={20} className="text-charcoal" />
              <span className="absolute top-1 right-1 w-5 h-5 bg-pink text-charcoal text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-beige rounded-full transition-premium"
          >
            {isOpen ? (
              <X size={24} className="text-charcoal" />
            ) : (
              <Menu size={24} className="text-charcoal" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray bg-white"
          >
            <nav className="container-premium py-4 space-y-3">
              <Link href="/" className="block py-2 text-charcoal hover:text-pink transition-premium">
                Home
              </Link>
              <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className="block w-full text-left py-2 text-charcoal hover:text-pink transition-premium font-semibold"
              >
                Products
              </button>
              {isMegaMenuOpen && (
                <div className="pl-4 space-y-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      className="block py-2 text-charcoal/60 hover:text-pink transition-premium text-sm"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
              <Link href="/about" className="block py-2 text-charcoal hover:text-pink transition-premium">
                About Us
              </Link>
              <Link href="/contact" className="block py-2 text-charcoal hover:text-pink transition-premium">
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </header>
    </>
  )
}
