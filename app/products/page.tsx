'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductFilters from '@/components/ProductFilters'
import ProductGrid from '@/components/ProductGrid'
import { Filter } from 'lucide-react'

export default function ProductsPage() {
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-luxury-charcoal mb-4">
              Our Products
            </h1>
            <p className="text-lg text-luxury-charcoal/60">
              Discover our full collection of premium skincare products, carefully curated for your skin's needs.
            </p>
          </div>

          {/* Products Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block">
              <ProductFilters />
            </div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-luxury-rose/20 rounded-lg text-luxury-charcoal hover:bg-luxury-cream transition-all duration-300 ease-out w-full justify-center"
              >
                <Filter size={20} />
                Filters
              </button>
              <ProductFilters
                showMobile={showMobileFilters}
                onClose={() => setShowMobileFilters(false)}
              />
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              <ProductGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
