'use client'

import FAQ from '@/components/FAQ'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageTransition from '@/components/PageTransition'

export default function FAQPage() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
      </div>
      <FAQ />
    </PageTransition>
  )
}
