'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Filter, SlidersHorizontal } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageTransition from '@/components/PageTransition'
import { products as allProducts, categories } from '@/lib/products'

interface FilterState {
  categories: string[]
  priceRange: [number, number]
  skinTypes: string[]
  ratings: number | null
}

const skinTypesList = ['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal']

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-muted-foreground">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  )
}

function ProductsContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category')

  const [filters, setFilters] = useState<FilterState>({
    categories: initialCategory ? [initialCategory] : [],
    priceRange: [0, 300],
    skinTypes: [],
    ratings: null,
  })
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'price-asc' | 'price-desc'>('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = allProducts.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.categorySlug)) return false
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false
      if (filters.skinTypes.length && !filters.skinTypes.some((st) => p.skinTypes.includes(st))) return false
      if (filters.ratings && p.rating < filters.ratings) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        if (!p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false
      }
      return true
    })

    switch (sortBy) {
      case 'popular': result = [...result].sort((a, b) => b.reviews - a.reviews); break
      case 'price-asc': result = [...result].sort((a, b) => a.price - b.price); break
      case 'price-desc': result = [...result].sort((a, b) => b.price - a.price); break
      default: result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    }
    return result
  }, [filters, sortBy, searchQuery])

  const toggleCategory = (slug: string) =>
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(slug)
        ? f.categories.filter((c) => c !== slug)
        : [...f.categories, slug],
    }))

  const toggleSkinType = (type: string) =>
    setFilters((f) => ({
      ...f,
      skinTypes: f.skinTypes.includes(type)
        ? f.skinTypes.filter((t) => t !== type)
        : [...f.skinTypes, type],
    }))

  const resetFilters = () =>
    setFilters({ categories: [], priceRange: [0, 300], skinTypes: [], ratings: null })

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.skinTypes.length > 0 ||
    filters.ratings !== null ||
    filters.priceRange[1] < 300

  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.slug} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat.slug)}
                onChange={() => toggleCategory(cat.slug)}
                className="w-4 h-4 rounded accent-luxury-gold"
              />
              <span className="ml-3 text-muted-foreground group-hover:text-foreground transition-colors">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Price Range</h3>
        <input
          type="range"
          min="0"
          max="300"
          value={filters.priceRange[1]}
          onChange={(e) => setFilters((f) => ({ ...f, priceRange: [0, Number(e.target.value)] }))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-luxury-gold"
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>$0</span>
          <span className="font-semibold text-luxury-gold">${filters.priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Skin Type</h3>
        <div className="space-y-2">
          {skinTypesList.map((type) => (
            <label key={type} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.skinTypes.includes(type)}
                onChange={() => toggleSkinType(type)}
                className="w-4 h-4 rounded accent-luxury-gold"
              />
              <span className="ml-3 text-muted-foreground group-hover:text-foreground transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3].map((rating) => (
            <button
              key={rating}
              onClick={() => setFilters((f) => ({ ...f, ratings: f.ratings === rating ? null : rating }))}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                filters.ratings === rating
                  ? 'bg-luxury-gold/10 border border-luxury-gold'
                  : 'hover:bg-muted border border-transparent'
              }`}
            >
              <div className="flex items-center">
                {Array.from({ length: rating }).map((_, i) => (
                  <span key={i} className="text-luxury-gold">★</span>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">{rating} Stars & Up</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="w-full py-2 text-luxury-gold font-semibold hover:bg-luxury-gold/5 rounded-lg transition-colors"
        >
          Clear Filters
        </button>
      )}
    </div>
  )

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Products' }]} />

        <div className="mb-12 mt-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Products</h1>
          <p className="text-lg text-muted-foreground">
            Discover our full collection of premium skincare products, carefully curated for your skin&apos;s needs.
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-5 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-luxury-gold"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 bg-card rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal size={18} className="text-luxury-gold" />
                <h2 className="text-lg font-bold text-foreground">Filters</h2>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center gap-2 px-4 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors w-full justify-center"
            >
              <Filter size={20} /> Filters
              {hasActiveFilters && <span className="ml-1 w-2 h-2 rounded-full bg-luxury-gold" />}
            </button>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between bg-card rounded-xl p-4 shadow-sm">
              <p className="text-muted-foreground text-sm">
                Showing <span className="font-semibold text-foreground">{filtered.length}</span> products
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-luxury-gold"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-2xl">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or search</p>
                <button onClick={() => { resetFilters(); setSearchQuery('') }} className="px-6 py-3 bg-luxury-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                  Clear All
                </button>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filtered.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            >
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                onClick={(e) => e.stopPropagation()}
                className="fixed left-0 top-0 h-full w-80 bg-card p-6 shadow-lg overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Filters</h2>
                  <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-muted rounded-lg">
                    <X size={24} />
                  </button>
                </div>
                <FilterContent />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
