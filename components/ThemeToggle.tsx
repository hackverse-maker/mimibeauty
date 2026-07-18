'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/lib/providers/ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative p-2 hover:text-luxury-gold transition-colors duration-300 overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.25 }}
          className="block"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
