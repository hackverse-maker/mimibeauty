'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-sm text-muted-foreground">
      {items.map((item, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center gap-1"
        >
          {item.href ? (
            <Link href={item.href} className="hover:text-luxury-gold transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight size={14} className="text-muted-foreground/50" />}
        </motion.span>
      ))}
    </nav>
  )
}
