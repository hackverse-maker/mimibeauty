'use client'

import { Beaker, Shield, Leaf, Zap } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

const REASONS = [
  {
    icon: Beaker,
    title: 'Clinically Tested',
    description: 'Every formula is dermatologist-tested and proven effective through rigorous clinical trials.',
  },
  {
    icon: Shield,
    title: 'Safe for All',
    description: 'Suitable for all skin types, including sensitive skin. Gentle yet powerful formulations.',
  },
  {
    icon: Leaf,
    title: 'Clean Ingredients',
    description: 'No harsh chemicals, parabens, or sulfates. Ethically sourced, natural ingredients.',
  },
  {
    icon: Zap,
    title: 'Fast Results',
    description: 'See visible improvements in 2-4 weeks. Dermatologists recommend our regimens.',
  },
]

export default function WhyChooseUs() {

  return (
    <section className="section-padding bg-beige">
      <div className="container-premium">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl font-serif text-charcoal mb-3">Why Choose SkinScience</h2>
          <p className="text-charcoal/70 max-w-2xl mx-auto">
            We&apos;re committed to delivering premium skincare that works.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {REASONS.map((reason, index) => {
            const Icon = reason.icon
            return (
              <AnimatedSection
                key={reason.title}
                delay={index * 0.1}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-pink rounded-lg flex items-center justify-center">
                    <Icon size={32} className="text-charcoal" />
                  </div>
                </div>
                <h3 className="text-lg font-serif text-charcoal mb-2">{reason.title}</h3>
                <p className="text-charcoal/70 text-sm">{reason.description}</p>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
