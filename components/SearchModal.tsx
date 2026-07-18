'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { products } from '@/lib/products'
import Link from 'next/link'

interface Props {
  open: boolean
  onClose: () => void
}

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const results = query
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 6)
    : []

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[95] flex items-start justify-center pt-24 px-4"
        >
          <motion.div
            initial={{ y: -30, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -30, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <Search size={20} className="text-muted-foreground" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories..."
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
              <button onClick={onClose} aria-label="Close" className="p-1 hover:bg-muted rounded-md">
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {query && results.length === 0 && (
                <div className="px-5 py-12 text-center text-muted-foreground">
                  No products found for &quot;{query}&quot;
                </div>
              )}
              {!query && (
                <div className="px-5 py-8 text-center text-muted-foreground text-sm">
                  Start typing to search our products
                </div>
              )}
              {results.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={`/products/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 px-5 py-3 hover:bg-muted transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-luxury-gold/20 to-luxury-rose/20 flex items-center justify-center text-2xl">
                      {p.emoji}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.category} · ${p.price}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
