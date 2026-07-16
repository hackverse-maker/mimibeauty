'use client'

import ProductCard from './ProductCard'
import AnimatedSection from './AnimatedSection'

const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Gentle Cleanser',
    price: 32,
    originalPrice: 42,
    image: '/images/hero-skincare.png',
    rating: 4.8,
    reviews: 245,
    badge: 'Best Seller',
  },
  {
    id: '2',
    name: 'Vitamin C Serum',
    price: 48,
    image: '/images/hero-skincare.png',
    rating: 4.9,
    reviews: 189,
  },
  {
    id: '3',
    name: 'Hydrating Moisturizer',
    price: 54,
    originalPrice: 64,
    image: '/images/hero-skincare.png',
    rating: 4.7,
    reviews: 312,
  },
  {
    id: '4',
    name: 'SPF 50 Sunscreen',
    price: 38,
    image: '/images/hero-skincare.png',
    rating: 4.9,
    reviews: 456,
    badge: 'New',
  },
]

export default function FeaturedProducts() {
  return (
    <section className="section-padding bg-beige">
      <div className="container-premium">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl font-serif text-charcoal mb-3">Bestsellers</h2>
          <p className="text-charcoal/70 max-w-2xl mx-auto">
            Loved by thousands of customers. Discover our most popular skincare essentials backed by dermatologists.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}
