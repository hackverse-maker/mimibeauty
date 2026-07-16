'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, Heart, User, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-luxury-gold text-white text-center py-2 text-sm font-medium">
        ✨ Free Shipping Worldwide | 15% OFF Your First Order with CODE: LUXE15
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ease-out ${
          isScrolled
            ? 'bg-white shadow-lg border-b border-luxury-rose/10'
            : 'bg-luxury-cream/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-luxury-gold to-luxury-rose rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">LG</span>
              </div>
              <span className="hidden sm:inline text-xl font-bold text-luxury-charcoal">
                Luxe Glow
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-luxury-charcoal hover:text-luxury-gold transition-all duration-300 ease-out font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4 md:space-x-6">
              <button
                className="p-2 hover:text-luxury-gold transition-all duration-300 ease-out"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                className="p-2 hover:text-luxury-gold transition-all duration-300 ease-out hidden sm:block"
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </button>
              <button
                className="p-2 hover:text-luxury-gold transition-all duration-300 ease-out hidden sm:block"
                aria-label="Account"
              >
                <User size={20} />
              </button>
              <button
                className="p-2 hover:text-luxury-gold transition-all duration-300 ease-out relative"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={20} />
                <span className="absolute top-0 right-0 w-4 h-4 bg-luxury-rose text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-luxury-rose/10 bg-white"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 text-luxury-charcoal hover:bg-luxury-cream hover:text-luxury-gold transition-all duration-300 ease-out rounded-md font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex items-center space-x-3 px-3 py-2 border-t border-luxury-rose/10 mt-2">
                  <button className="p-2 hover:text-luxury-gold transition-all duration-300 ease-out">
                    <Heart size={20} />
                  </button>
                  <button className="p-2 hover:text-luxury-gold transition-all duration-300 ease-out">
                    <User size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>
    </>
  )
}
