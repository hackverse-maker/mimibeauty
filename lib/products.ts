export interface Product {
  id: number
  slug: string
  name: string
  category: string
  categorySlug: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  emoji: string
  description: string
  longDescription: string
  ingredients: string[]
  benefits: string[]
  skinTypes: string[]
  size: string
  inStock: boolean
  featured?: boolean
  bestSeller?: boolean
  isNew?: boolean
}

export interface Category {
  name: string
  slug: string
  emoji: string
  description: string
  gradient: string
}

export const categories: Category[] = [
  { name: 'Cleansers', slug: 'cleansers', emoji: '🧴', description: 'Gentle cleansing for every skin type', gradient: 'from-blue-200 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/20' },
  { name: 'Serums', slug: 'serums', emoji: '✨', description: 'Concentrated active ingredients', gradient: 'from-amber-200 to-amber-100 dark:from-amber-900/40 dark:to-amber-800/20' },
  { name: 'Moisturizers', slug: 'moisturizers', emoji: '💧', description: 'Hydration and nourishment', gradient: 'from-rose-200 to-rose-100 dark:from-rose-900/40 dark:to-rose-800/20' },
  { name: 'Sunscreens', slug: 'sunscreens', emoji: '☀️', description: 'UV protection & defense', gradient: 'from-yellow-200 to-yellow-100 dark:from-yellow-900/40 dark:to-yellow-800/20' },
  { name: 'Masks', slug: 'masks', emoji: '🎭', description: 'Intensive treatments', gradient: 'from-emerald-200 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/20' },
  { name: 'Eye Care', slug: 'eye-care', emoji: '👁️', description: 'Delicate eye area solutions', gradient: 'from-orange-200 to-orange-100 dark:from-orange-900/40 dark:to-orange-800/20' },
]

export const products: Product[] = [
  {
    id: 1, slug: 'radiant-cleanser', name: 'Radiant Cleanser', category: 'Cleansers', categorySlug: 'cleansers',
    price: 42, originalPrice: 55, rating: 4.8, reviews: 248, image: '/images/luxury-cleanser.png', emoji: '🧴',
    description: 'Gentle foaming cleanser that removes impurities without stripping skin.',
    longDescription: 'Our Radiant Cleanser is a luxurious foaming cleanser formulated with natural botanicals to gently remove makeup, dirt, and impurities while maintaining your skin\'s natural moisture barrier. Infused with chamomile and green tea extracts, it leaves skin feeling fresh, soft, and perfectly prepared for the rest of your routine.',
    ingredients: ['Chamomile Extract', 'Green Tea', 'Aloe Vera', 'Glycerin', 'Vitamin B5'],
    benefits: ['Deeply cleanses', 'Maintains moisture barrier', 'Soothes irritation', 'pH balanced'],
    skinTypes: ['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal'], size: '150ml', inStock: true, bestSeller: true,
  },
  {
    id: 2, slug: 'glow-serum', name: 'Glow Serum', category: 'Serums', categorySlug: 'serums',
    price: 68, originalPrice: 85, rating: 4.9, reviews: 356, image: '/images/glow-serum.png', emoji: '✨',
    description: 'Vitamin C brightening serum for radiant, even-toned skin.',
    longDescription: 'The Glow Serum is our hero product, packed with 15% stabilized Vitamin C, hyaluronic acid, and niacinamide. This powerful yet gentle formula visibly brightens, evens skin tone, and boosts collagen production for a youthful, luminous complexion. Lightweight and fast-absorbing.',
    ingredients: ['15% Vitamin C', 'Hyaluronic Acid', 'Niacinamide', 'Vitamin E', 'Ferulic Acid'],
    benefits: ['Brightens dark spots', 'Boosts collagen', 'Hydrates deeply', 'Antioxidant protection'],
    skinTypes: ['Dry', 'Oily', 'Combination', 'Normal'], size: '30ml', inStock: true, bestSeller: true, featured: true,
  },
  {
    id: 3, slug: 'luxe-moisturizer', name: 'Luxe Moisturizer', category: 'Moisturizers', categorySlug: 'moisturizers',
    price: 52, originalPrice: 68, rating: 4.7, reviews: 192, image: '/images/moisturizer-cream.png', emoji: '💧',
    description: 'Rich daily moisturizer with hyaluronic acid and ceramides.',
    longDescription: 'Luxe Moisturizer delivers intense 48-hour hydration with a blend of hyaluronic acid, ceramides, and shea butter. Its silky texture melts into skin, restoring suppleness and strengthening the moisture barrier. Perfect for daily use, morning and night.',
    ingredients: ['Hyaluronic Acid', 'Ceramides', 'Shea Butter', 'Squalane', 'Peptides'],
    benefits: ['48-hour hydration', 'Strengthens barrier', 'Plumps fine lines', 'Non-greasy finish'],
    skinTypes: ['Dry', 'Combination', 'Sensitive', 'Normal'], size: '50ml', inStock: true, bestSeller: true,
  },
  {
    id: 4, slug: 'sun-guardian-spf50', name: 'Sun Guardian SPF50', category: 'Sunscreens', categorySlug: 'sunscreens',
    price: 38, originalPrice: 48, rating: 4.9, reviews: 421, image: '/images/moisturizer-cream.png', emoji: '☀️',
    description: 'Lightweight broad-spectrum SPF 50 with no white cast.',
    longDescription: 'Sun Guardian SPF50 offers broad-spectrum protection against UVA and UVB rays with a weightless, invisible finish. Formulated with mineral and chemical filters plus antioxidant-rich botanicals, it protects without leaving a white cast. Suitable for all skin tones.',
    ingredients: ['Zinc Oxide', 'Green Tea Extract', 'Vitamin E', 'Niacinamide'],
    benefits: ['SPF 50 protection', 'No white cast', 'Antioxidant defense', 'Lightweight feel'],
    skinTypes: ['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal'], size: '60ml', inStock: true, bestSeller: true,
  },
  {
    id: 5, slug: 'gold-mask-treatment', name: 'Gold Mask Treatment', category: 'Masks', categorySlug: 'masks',
    price: 45, originalPrice: 60, rating: 4.8, reviews: 187, image: '/images/glow-serum.png', emoji: '🎭',
    description: 'Luxurious overnight mask with 24K gold and peptides.',
    longDescription: 'Indulge in our Gold Mask Treatment, an overnight ritual infused with 24K gold, peptides, and rosehip oil. Wake up to firmer, smoother, and more radiant skin. This creamy mask works while you sleep to repair, hydrate, and rejuvenate.',
    ingredients: ['24K Gold', 'Peptides', 'Rosehip Oil', 'Hyaluronic Acid'],
    benefits: ['Firms skin', 'Repairs overnight', 'Deeply hydrates', 'Boosts radiance'],
    skinTypes: ['Dry', 'Combination', 'Normal'], size: '50ml', inStock: true, bestSeller: true, isNew: true,
  },
  {
    id: 6, slug: 'eye-contour-cream', name: 'Eye Contour Cream', category: 'Eye Care', categorySlug: 'eye-care',
    price: 55, originalPrice: 72, rating: 4.6, reviews: 134, image: '/images/luxury-cleanser.png', emoji: '👁️',
    description: 'Targeted eye cream for dark circles and fine lines.',
    longDescription: 'Our Eye Contour Cream is specifically formulated for the delicate eye area, with caffeine, peptides, and vitamin K to reduce puffiness, dark circles, and fine lines. Its cooling metal applicator massages the formula gently into skin for instant refreshment.',
    ingredients: ['Caffeine', 'Peptides', 'Vitamin K', 'Hyaluronic Acid'],
    benefits: ['Reduces puffiness', 'Brightens dark circles', 'Smooths fine lines', 'Cooling applicator'],
    skinTypes: ['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal'], size: '15ml', inStock: true, bestSeller: true,
  },
  {
    id: 7, slug: 'gentle-foaming-cleanser', name: 'Gentle Foaming Cleanser', category: 'Cleansers', categorySlug: 'cleansers',
    price: 36, rating: 4.7, reviews: 156, image: '/images/luxury-cleanser.png', emoji: '🫧',
    description: 'Daily gentle cleanser for sensitive skin.',
    longDescription: 'A fragrance-free, ultra-gentle foaming cleanser designed for sensitive and reactive skin. Formulated with soothing oat extract and panthenol to cleanse without irritation.',
    ingredients: ['Oat Extract', 'Panthenol', 'Glycerin', 'Allantoin'],
    benefits: ['Fragrance-free', 'Soothes sensitive skin', 'Non-stripping', 'Dermatologist tested'],
    skinTypes: ['Sensitive', 'Dry', 'Normal'], size: '150ml', inStock: true, isNew: true,
  },
  {
    id: 8, slug: 'hyaluronic-acid-serum', name: 'Hyaluronic Acid Serum', category: 'Serums', categorySlug: 'serums',
    price: 58, rating: 4.9, reviews: 289, image: '/images/glow-serum.png', emoji: '💧',
    description: 'Multi-weight hyaluronic acid for deep hydration.',
    longDescription: 'Our Hyaluronic Acid Serum features three molecular weights of HA to hydrate every layer of skin. Plumps fine lines, smooths texture, and locks in moisture for a dewy, supple finish.',
    ingredients: ['3-Weight Hyaluronic Acid', 'Vitamin B5', 'Glycerin'],
    benefits: ['Multi-layer hydration', 'Plumps fine lines', 'Dewy finish', 'Layer-friendly'],
    skinTypes: ['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal'], size: '30ml', inStock: true, featured: true,
  },
  {
    id: 9, slug: 'night-repair-cream', name: 'Night Repair Cream', category: 'Moisturizers', categorySlug: 'moisturizers',
    price: 72, originalPrice: 90, rating: 4.8, reviews: 203, image: '/images/moisturizer-cream.png', emoji: '🌙',
    description: 'Overnight repair cream with retinol and peptides.',
    longDescription: 'Wake up to renewed skin. Our Night Repair Cream combines encapsulated retinol with peptides and ceramides to smooth wrinkles, even tone, and restore firmness while you sleep.',
    ingredients: ['Encapsulated Retinol', 'Peptides', 'Ceramides', 'Squalane'],
    benefits: ['Smooths wrinkles', 'Renews overnight', 'Restores firmness', 'Gentle retinol'],
    skinTypes: ['Dry', 'Combination', 'Normal'], size: '50ml', inStock: true, isNew: true,
  },
  {
    id: 10, slug: 'mineral-sunscreen-spf30', name: 'Mineral Sunscreen SPF30', category: 'Sunscreens', categorySlug: 'sunscreens',
    price: 34, rating: 4.6, reviews: 167, image: '/images/moisturizer-cream.png', emoji: '🛡️',
    description: 'Pure mineral sunscreen for sensitive skin.',
    longDescription: 'A 100% mineral sunscreen with zinc oxide and titanium dioxide, designed for sensitive and reactive skin. Lightweight, non-greasy, and reef-safe.',
    ingredients: ['Zinc Oxide', 'Titanium Dioxide', 'Green Tea Extract'],
    benefits: ['100% mineral', 'Reef-safe', 'Sensitive-skin friendly', 'No white cast'],
    skinTypes: ['Sensitive', 'Oily', 'Combination', 'Normal'], size: '60ml', inStock: true,
  },
  {
    id: 11, slug: 'clay-purifying-mask', name: 'Clay Purifying Mask', category: 'Masks', categorySlug: 'masks',
    price: 40, rating: 4.7, reviews: 145, image: '/images/glow-serum.png', emoji: '🌿',
    description: 'Detoxifying clay mask for oily and combination skin.',
    longDescription: 'Our Clay Purifying Mask draws out impurities and excess oil with kaolin clay and charcoal, while niacinamide refines pores. Leaves skin balanced, smooth, and matte without tightness.',
    ingredients: ['Kaolin Clay', 'Activated Charcoal', 'Niacinamide', 'Tea Tree Oil'],
    benefits: ['Detoxifies pores', 'Controls oil', 'Refines texture', 'Non-drying'],
    skinTypes: ['Oily', 'Combination'], size: '100ml', inStock: true,
  },
  {
    id: 12, slug: 'firming-eye-serum', name: 'Firming Eye Serum', category: 'Eye Care', categorySlug: 'eye-care',
    price: 62, rating: 4.8, reviews: 98, image: '/images/luxury-cleanser.png', emoji: '💫',
    description: 'Advanced eye serum for firming and lifting.',
    longDescription: 'A powerful eye serum with peptides, caffeine, and bakuchiol to firm, lift, and brighten the eye area. Targets crow\'s feet, puffiness, and loss of elasticity.',
    ingredients: ['Peptides', 'Caffeine', 'Bakuchiol', 'Vitamin C'],
    benefits: ['Firms and lifts', 'Smooths crow\'s feet', 'De-puffs', 'Brightens'],
    skinTypes: ['Dry', 'Combination', 'Normal'], size: '15ml', inStock: true, isNew: true,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
    .slice(0, limit)
}

export function getRecommendedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.categorySlug !== product.categorySlug)
    .slice(0, limit)
}

export function getBestSellers(limit = 6): Product[] {
  return products.filter((p) => p.bestSeller).slice(0, limit)
}

export function getNewArrivals(limit = 4): Product[] {
  return products.filter((p) => p.isNew).slice(0, limit)
}

export function getFeaturedProducts(limit = 3): Product[] {
  return products.filter((p) => p.featured).slice(0, limit)
}
