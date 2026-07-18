'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, Heart, User, ShoppingCart } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '@/lib/providers/CartProvider'
import { useWishlist } from '@/lib/providers/WishlistProvider'
import ThemeToggle from './ThemeToggle'
import SearchModal from './SearchModal'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const { count } = useCart()
  const { count: wishlistCount } = useWishlist()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      {/* Announcement Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-luxury-gold text-white text-center py-2 text-sm font-medium"
      >
        ✨ Free Shipping Worldwide | 15% OFF Your First Order with CODE: LUXE15
      </motion.div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-card/95 backdrop-blur-md shadow-lg border-b border-border'
            : 'bg-background/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-9 h-9 bg-gradient-to-br from-luxury-gold to-luxury-rose rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-bold">LG</span>
              </motion.div>
              <span className="hidden sm:inline text-xl font-bold text-foreground">
                Luxe Glow
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-medium transition-colors duration-300 hover:text-luxury-gold ${
                    pathname === link.href ? 'text-luxury-gold' : 'text-foreground'
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-luxury-gold rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:text-luxury-gold transition-colors duration-300"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <ThemeToggle />
              <Link
                href="/wishlist"
                className="p-2 hover:text-luxury-gold transition-colors duration-300 relative hidden sm:block"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-luxury-rose text-white text-[10px] rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                href="/account"
                className="p-2 hover:text-luxury-gold transition-colors duration-300 hidden sm:block"
                aria-label="Account"
              >
                <User size={20} />
              </Link>
              <Link
                href="/cart"
                className="p-2 hover:text-luxury-gold transition-colors duration-300 relative"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={20} />
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-luxury-gold text-white text-[10px] rounded-full flex items-center justify-center"
                  >
                    {count}
                  </motion.span>
                )}
              </Link>

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
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-border bg-card overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`block px-3 py-3 rounded-md font-medium transition-colors ${
                        pathname === link.href
                          ? 'bg-luxury-gold/10 text-luxury-gold'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex items-center gap-4 px-3 py-3 border-t border-border mt-2"
                >
                  <Link href="/wishlist" className="flex items-center gap-2 text-foreground hover:text-luxury-gold transition-colors">
                    <Heart size={20} /> Wishlist
                  </Link>
                  <Link href="/account" className="flex items-center gap-2 text-foreground hover:text-luxury-gold transition-colors">
                    <User size={20} /> Account
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
