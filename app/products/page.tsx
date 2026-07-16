import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import AnimatedSection from '@/components/AnimatedSection'

const ALL_PRODUCTS = [
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
  {
    id: '5',
    name: 'Retinol Eye Cream',
    price: 52,
    image: '/images/hero-skincare.png',
    rating: 4.8,
    reviews: 178,
  },
  {
    id: '6',
    name: 'Hydrating Toner',
    price: 28,
    image: '/images/hero-skincare.png',
    rating: 4.6,
    reviews: 234,
  },
  {
    id: '7',
    name: 'Clay Face Mask',
    price: 36,
    image: '/images/hero-skincare.png',
    rating: 4.7,
    reviews: 156,
  },
  {
    id: '8',
    name: 'Gentle Exfoliant',
    price: 34,
    image: '/images/hero-skincare.png',
    rating: 4.8,
    reviews: 289,
  },
]

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-beige pt-32 pb-12">
          <div className="container-premium">
            <AnimatedSection className="text-center">
              <h1 className="text-5xl font-serif text-charcoal mb-4">Our Products</h1>
              <p className="text-charcoal/70 max-w-2xl mx-auto">
                Discover our complete collection of science-backed skincare products formulated for every skin type.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-premium">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ALL_PRODUCTS.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
