'use client'

import AnimatedSection from './AnimatedSection'

const INGREDIENTS = [
  {
    name: 'Vitamin C',
    description: 'Brightens skin and reduces hyperpigmentation while providing antioxidant protection.',
    benefits: ['Brightening', 'Anti-aging', 'Antioxidant'],
  },
  {
    name: 'Niacinamide',
    description: 'Strengthens skin barrier and minimizes pores for a smoother, clearer complexion.',
    benefits: ['Pore Minimizing', 'Barrier Support', 'Oil Control'],
  },
  {
    name: 'Hyaluronic Acid',
    description: 'Deeply hydrates and plumps skin for a radiant, youthful appearance.',
    benefits: ['Hydrating', 'Anti-aging', 'Plumping'],
  },
  {
    name: 'Retinol',
    description: 'Accelerates cell turnover and reduces fine lines and wrinkles over time.',
    benefits: ['Anti-aging', 'Resurfacing', 'Firming'],
  },
  {
    name: 'Ceramides',
    description: 'Reinforces skin barrier to lock in moisture and protect against irritants.',
    benefits: ['Barrier Support', 'Hydrating', 'Protective'],
  },
]

export default function IngredientEducation() {
  return (
    <section className="section-padding bg-white">
      <div className="container-premium">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl font-serif text-charcoal mb-3">Science Behind Skincare</h2>
          <p className="text-charcoal/70 max-w-2xl mx-auto">
            We use clinically-proven ingredients backed by dermatological research. Learn about the key actives in our formulations.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {INGREDIENTS.map((ingredient, index) => (
            <AnimatedSection
              key={ingredient.name}
              delay={index * 0.1}
              className="card-premium p-6 text-center hover-lift"
            >
              <h3 className="text-xl font-serif text-charcoal mb-2">{ingredient.name}</h3>
              <p className="text-sm text-charcoal/70 mb-4">{ingredient.description}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {ingredient.benefits.map((benefit) => (
                  <span key={benefit} className="text-xs bg-pink/20 text-charcoal px-2 py-1 rounded">
                    {benefit}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
