'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface ProductFiltersProps {
  onFilterChange?: (filters: FilterState) => void
  showMobile?: boolean
  onClose?: () => void
}

interface FilterState {
  categories: string[]
  priceRange: [number, number]
  skinTypes: string[]
  ratings: number | null
}

export default function ProductFilters({
  onFilterChange,
  showMobile = false,
  onClose,
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 300],
    skinTypes: [],
    ratings: null,
  })

  const categories = [
    'Cleansers',
    'Serums',
    'Moisturizers',
    'Sunscreens',
    'Masks',
    'Eye Care',
  ]

  const skinTypes = ['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal']

  const handleCategoryChange = (category: string) => {
    const updated = {
      ...filters,
      categories: filters.categories.includes(category)
        ? filters.categories.filter((c) => c !== category)
        : [...filters.categories, category],
    }
    setFilters(updated)
    onFilterChange?.(updated)
  }

  const handleSkinTypeChange = (type: string) => {
    const updated = {
      ...filters,
      skinTypes: filters.skinTypes.includes(type)
        ? filters.skinTypes.filter((t) => t !== type)
        : [...filters.skinTypes, type],
    }
    setFilters(updated)
    onFilterChange?.(updated)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = {
      ...filters,
      priceRange: [filters.priceRange[0], Number(e.target.value)] as [number, number],
    }
    setFilters(updated)
    onFilterChange?.(updated)
  }

  const handleRatingChange = (rating: number) => {
    const updated = {
      ...filters,
      ratings: filters.ratings === rating ? null : rating,
    }
    setFilters(updated)
    onFilterChange?.(updated)
  }

  const filterContent = (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-bold text-luxury-charcoal mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="w-4 h-4 rounded border-luxury-rose/30 text-luxury-gold accent-luxury-gold"
              />
              <span className="ml-3 text-luxury-charcoal/70">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-bold text-luxury-charcoal mb-4">Price Range</h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="300"
            value={filters.priceRange[1]}
            onChange={handlePriceChange}
            className="w-full h-2 bg-luxury-rose/20 rounded-lg appearance-none cursor-pointer accent-luxury-gold"
          />
          <div className="flex justify-between text-sm text-luxury-charcoal/60">
            <span>$0</span>
            <span className="font-semibold text-luxury-gold">
              ${filters.priceRange[1]}
            </span>
          </div>
        </div>
      </div>

      {/* Skin Type */}
      <div>
        <h3 className="text-lg font-bold text-luxury-charcoal mb-4">Skin Type</h3>
        <div className="space-y-2">
          {skinTypes.map((type) => (
            <label key={type} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.skinTypes.includes(type)}
                onChange={() => handleSkinTypeChange(type)}
                className="w-4 h-4 rounded border-luxury-rose/30 text-luxury-gold accent-luxury-gold"
              />
              <span className="ml-3 text-luxury-charcoal/70">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-lg font-bold text-luxury-charcoal mb-4">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 ease-out ${
                filters.ratings === rating
                  ? 'bg-luxury-gold/10 border border-luxury-gold'
                  : 'hover:bg-luxury-cream border border-transparent'
              }`}
            >
              <div className="flex items-center">
                {Array.from({ length: rating }).map((_, i) => (
                  <span key={i} className="text-luxury-gold">
                    ★
                  </span>
                ))}
                <span className="ml-2 text-sm text-luxury-charcoal/70">
                  {rating} Stars & Up
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          const defaultFilters = {
            categories: [],
            priceRange: [0, 300] as [number, number],
            skinTypes: [],
            ratings: null,
          }
          setFilters(defaultFilters)
          onFilterChange?.(defaultFilters)
        }}
        className="w-full py-2 text-luxury-gold font-semibold hover:bg-luxury-gold/5 rounded-lg transition-all duration-300 ease-out"
      >
        Reset Filters
      </button>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        className="hidden lg:block w-64 bg-white rounded-2xl p-6 shadow-md h-fit sticky top-32"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        {filterContent}
      </motion.aside>

      {/* Mobile Drawer */}
      {showMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        >
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed left-0 top-0 h-full w-80 bg-white p-6 shadow-lg overflow-y-auto z-50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-luxury-charcoal">Filters</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-luxury-cream rounded-lg transition-all duration-300 ease-out"
              >
                <X size={24} />
              </button>
            </div>
            {filterContent}
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
