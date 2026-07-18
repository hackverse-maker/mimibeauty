import { products } from '@/lib/products'
import ProductDetailClient from './ProductDetailClient'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  return <ProductDetailClient slug={params.slug} />
}
