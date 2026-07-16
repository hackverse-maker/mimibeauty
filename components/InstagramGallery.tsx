'use client'

import { motion } from 'framer-motion'
import { Share2 } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

export default function InstagramGallery() {
  const images = [
    { id: 1, icon: '🌿', alt: 'Natural ingredients' },
    { id: 2, icon: '✨', alt: 'Glow effect' },
    { id: 3, icon: '🧴', alt: 'Product showcase' },
    { id: 4, icon: '💧', alt: 'Hydration' },
    { id: 5, icon: '🌸', alt: 'Fresh beauty' },
    { id: 6, icon: '👑', alt: 'Luxury care' },
    { id: 7, icon: '🎀', alt: 'Self care' },
    { id: 8, icon: '🌺', alt: 'Skin glow' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 bg-luxury-gold/10 text-luxury-gold rounded-full text-sm font-semibold mb-4">
            Follow Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-luxury-charcoal mb-4">
            @LuxeGlow on Instagram
          </h2>
          <p className="text-luxury-charcoal/60 text-lg max-w-2xl mx-auto mb-8">
            Join our community and share your glow journey with us
          </p>
        </AnimatedSection>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {images.map((image) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className="group relative aspect-square bg-gradient-to-br from-luxury-gold/20 to-luxury-rose/20 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg-lg"
            >
              {/* Image placeholder */}
              <div className="w-full h-full flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                {image.icon}
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Share2 className="text-white" size={32} />
              </div>

              {/* Border effect */}
              <div className="absolute inset-0 border-2 border-luxury-gold/0 group-hover:border-luxury-gold/50 rounded-2xl transition-colors"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-luxury-charcoal/70 mb-6">
            Tag <span className="font-bold text-luxury-gold">#LuxeGlow</span> in your posts for a chance to be featured!
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-luxury-gold to-luxury-rose text-white font-semibold rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <Share2 size={20} />
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  )
}
