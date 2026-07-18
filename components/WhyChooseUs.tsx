'use client'

import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

export default function WhyChooseUs() {
  const features = [
    { icon: '🌿', title: 'Natural Ingredients', description: 'Sourced from sustainable suppliers, our formulations feature clean ingredients without harmful chemicals.' },
    { icon: '🐰', title: 'Cruelty Free', description: 'We never test on animals and partner with ethical suppliers committed to animal welfare.' },
    { icon: '⚗️', title: 'Dermatologist Tested', description: 'Every product is dermatologist-tested for safety and efficacy across all skin types.' },
    { icon: '🌍', title: 'Free Shipping Worldwide', description: 'Enjoy complimentary shipping on all orders, anywhere in the world. Because beautiful skin is global.' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 bg-luxury-gold/10 text-luxury-gold rounded-full text-sm font-semibold mb-4">
            Why Luxe Glow
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">We Stand for Quality</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our commitment to excellence means every product meets the highest standards of quality, ethics, and efficacy.
          </p>
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} whileHover={{ y: -8 }}>
              <div className="glass rounded-2xl p-8 text-center h-full hover:shadow-xl transition-shadow duration-300">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="text-5xl mb-4 inline-block"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {[
            { number: '10+', label: 'Years in Business' },
            { number: '50K+', label: 'Happy Customers' },
            { number: '100%', label: 'Satisfaction Guaranteed' },
            { number: '150+', label: 'Products Available' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-luxury-gold mb-2">{stat.number}</div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
