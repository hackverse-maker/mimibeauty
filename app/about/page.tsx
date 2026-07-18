'use client'

import { motion } from 'framer-motion'
import TeamSection from '@/components/TeamSection'
import FAQ from '@/components/FAQ'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageTransition from '@/components/PageTransition'

const values = [
  { title: 'Quality', icon: '✨', description: 'We never compromise on the quality of our ingredients or formulations.' },
  { title: 'Ethics', icon: '🤝', description: 'Cruelty-free, vegan, and ethically sourced — always.' },
  { title: 'Sustainability', icon: '🌍', description: 'Eco-friendly packaging and responsible sourcing for a better planet.' },
  { title: 'Innovation', icon: '🔬', description: 'Science-backed formulas that deliver real, visible results.' },
]

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 mt-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Luxe Glow
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our journey to bring premium, ethical skincare to the world
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 2014, Luxe Glow was born from a passion for creating skincare products
              that are both effective and ethical. We believe that beauty should never come at the
              cost of the environment or animal welfare.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we proudly serve over 50,000 customers worldwide, each trusting us with their
              skincare journey.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-luxury-gold/20 to-luxury-rose/20 rounded-3xl p-12 flex items-center justify-center text-7xl"
          >
            <motion.span animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 6, repeat: Infinity }}>🌿</motion.span>
          </motion.div>
        </div>

        <div id="values" className="mb-20 scroll-mt-32">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-card rounded-2xl p-8 shadow-md text-center hover:shadow-xl transition-shadow"
              >
                <motion.div whileHover={{ scale: 1.15 }} className="text-5xl mb-4 inline-block">{value.icon}</motion.div>
                <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div id="team" className="scroll-mt-32">
          <TeamSection />
        </div>

        <div className="bg-muted/50 rounded-3xl p-12 text-center mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Our Certifications</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: '✓', label: 'Dermatologist Tested' },
              { icon: '🐰', label: 'Cruelty Free' },
              { icon: '🌱', label: 'Vegan' },
              { icon: '♻️', label: 'Eco-Friendly Packaging' },
            ].map((c) => (
              <div key={c.label} className="text-center">
                <div className="text-4xl mb-2">{c.icon}</div>
                <p className="text-sm font-medium text-foreground">{c.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <FAQ />
        </div>
      </div>
    </PageTransition>
  )
}
