'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

interface FAQItem {
  id: number
  question: string
  answer: string
}

interface FAQProps {
  items?: FAQItem[]
  title?: string
  description?: string
}

const defaultFAQItems: FAQItem[] = [
  {
    id: 1,
    question: 'How long does it take to see results?',
    answer:
      'Most customers see visible improvements in their skin within 2-4 weeks of consistent use. For best results, use our products as directed for at least 8 weeks.',
  },
  {
    id: 2,
    question: 'Are your products suitable for sensitive skin?',
    answer:
      'Yes! All our products are dermatologist-tested and formulated to be gentle on sensitive skin. However, we recommend doing a patch test first, especially if you have very reactive skin.',
  },
  {
    id: 3,
    question: 'Do you offer international shipping?',
    answer:
      'Absolutely! We ship to over 150 countries worldwide. Orders typically arrive within 7-14 business days. Shipping is always free!',
  },
  {
    id: 4,
    question: 'What is your return policy?',
    answer:
      'We offer a 60-day money-back guarantee on all products. If you\'re not satisfied for any reason, simply return the product for a full refund.',
  },
  {
    id: 5,
    question: 'Are your products vegan and cruelty-free?',
    answer:
      'Yes! All our products are 100% vegan and cruelty-free. We never test on animals and only use ethically sourced ingredients.',
  },
  {
    id: 6,
    question: 'Can I use multiple serums together?',
    answer:
      'Absolutely! We recommend layering serums from lightest to thickest consistency. Always apply serums to clean skin and wait a minute between applications for optimal absorption.',
  },
]

export default function FAQ({
  items = defaultFAQItems,
  title = 'Frequently Asked Questions',
  description = 'Find answers to common questions about our products and services.',
}: FAQProps) {
  const [openId, setOpenId] = useState<number | null>(null)

  const toggleOpen = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-luxury-charcoal mb-4">
            {title}
          </h2>
          <p className="text-luxury-charcoal/60 text-lg">{description}</p>
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-4"
        >
          {items.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <button
                onClick={() => toggleOpen(item.id)}
                className="w-full text-left"
              >
                <div
                  className={`w-full px-6 py-4 rounded-lg transition-all duration-300 ease-out ${
                    openId === item.id
                      ? 'bg-luxury-gold/10 border border-luxury-gold'
                      : 'bg-luxury-cream border border-luxury-rose/10 hover:border-luxury-gold/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-luxury-charcoal pr-4">
                      {item.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openId === item.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown
                        size={24}
                        className={`${
                          openId === item.id
                            ? 'text-luxury-gold'
                            : 'text-luxury-charcoal/50'
                        }`}
                      />
                    </motion.div>
                  </div>
                </div>
              </button>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={
                  openId === item.id
                    ? { opacity: 1, height: 'auto' }
                    : { opacity: 0, height: 0 }
                }
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 text-luxury-charcoal/70 leading-relaxed border-l-2 border-luxury-gold/30 ml-3">
                  {item.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center p-8 bg-luxury-cream rounded-2xl"
        >
          <p className="text-luxury-charcoal/70 mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-luxury-gold text-white font-semibold rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg-lg transition-all duration-300 ease-out"
          >
            Contact Our Support Team
          </a>
        </motion.div>
      </div>
    </section>
  )
}
