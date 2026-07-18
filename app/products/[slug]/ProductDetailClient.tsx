'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Heart, ShoppingCart, Minus, Plus, ArrowLeft, Check, Truck, Shield, RotateCcw } from 'lucide-react'
import { getProductBySlug, getRelatedProducts, getRecommendedProducts } from '@/lib/products'
import { useCart } from '@/lib/providers/CartProvider'
import { useWishlist } from '@/lib/providers/WishlistProvider'
import { useToast } from '@/lib/providers/ToastProvider'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductCard from '@/components/ProductCard'
import PageTransition from '@/components/PageTransition'

export default function ProductDetailClient({ slug }: { slug: string }) {
  const router = useRouter()
  const product = useMemo(() => getProductBySlug(slug), [slug])

  const { addItem } = useCart()
  const { toggleItem, has } = useWishlist()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <PageTransition>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center pt-32">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Product not found</h1>
          <p className="text-muted-foreground mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/products" className="px-6 py-3 bg-luxury-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all">
            Back to Products
          </Link>
        </div>
      </PageTransition>
    )
  }

  const related = getRelatedProducts(product, 4)
  const recommended = getRecommendedProducts(product, 4)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      emoji: product.emoji,
    }, quantity)
    toast(`${quantity} × ${product.name} added to cart`)
  }

  const handleWishlist = () => {
    toggleItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      emoji: product.emoji,
    })
    toast(has(product.id) ? 'Removed from wishlist' : 'Added to wishlist', has(product.id) ? 'info' : 'success')
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: product.category, href: `/products?category=${product.categorySlug}` },
            { label: product.name },
          ]}
        />

        <button
          onClick={() => router.back()}
          className="mt-6 mb-8 flex items-center gap-2 text-muted-foreground hover:text-luxury-gold transition-colors"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-[500px] bg-gradient-to-br from-luxury-gold/20 to-luxury-rose/20 rounded-3xl flex items-center justify-center overflow-hidden"
          >
            {discount > 0 && (
              <div className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                -{discount}%
              </div>
            )}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-9xl"
            >
              {product.emoji}
            </motion.div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm uppercase tracking-wide text-luxury-gold font-semibold mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? 'text-luxury-gold fill-luxury-gold' : 'text-muted-foreground/40'}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">{product.longDescription}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-foreground">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
              )}
              {discount > 0 && (
                <span className="text-sm font-semibold text-red-500">Save {discount}%</span>
              )}
            </div>

            {/* Benefits */}
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">Key Benefits</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.benefits.map((b) => (
                  <div key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check size={16} className="text-luxury-gold" /> {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">Key Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span key={ing} className="px-3 py-1 bg-muted rounded-full text-sm text-foreground">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Skin types */}
            <div className="mb-8">
              <h3 className="font-semibold text-foreground mb-3">Suitable For</h3>
              <div className="flex flex-wrap gap-2">
                {product.skinTypes.map((st) => (
                  <span key={st} className="px-3 py-1 border border-border rounded-full text-sm text-foreground">
                    {st} Skin
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 hover:bg-muted transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 hover:bg-muted transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-luxury-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} /> Add to Cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWishlist}
                className="p-4 border-2 border-border rounded-lg hover:border-luxury-gold transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart size={20} fill={has(product.id) ? 'currentColor' : 'none'} className={has(product.id) ? 'text-red-500' : 'text-foreground'} />
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              {[
                { icon: <Truck size={20} />, label: 'Free Shipping' },
                { icon: <Shield size={20} />, label: 'Secure Payment' },
                { icon: <RotateCcw size={20} />, label: '60-Day Returns' },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center text-center gap-2">
                  <span className="text-luxury-gold">{b.icon}</span>
                  <span className="text-xs text-muted-foreground">{b.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* Recommended Products */}
        {recommended.length > 0 && (
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommended.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  )
}
