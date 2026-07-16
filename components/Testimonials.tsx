'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      role: 'Beauty Enthusiast',
      content:
        'I&apos;ve tried countless skincare lines, but Luxe Glow is truly exceptional. My skin has never looked better!',
      rating: 5,
      image: '👩',
    },
    {
      id: 2,
      name: 'Emma Johnson',
      role: 'Skincare Professional',
      content:
        'The quality of ingredients and visible results are unmatched. I recommend Luxe Glow to all my clients.',
      rating: 5,
      image: '👩‍⚕️',
    },
    {
      id: 3,
      name: 'Jessica Lee',
      role: 'Sensitive Skin',
      content:
        'Finally found products that don&apos;t irritate my sensitive skin. The serum is absolutely a game-changer!',
      rating: 5,
      image: '👱‍♀️',
    },
    {
      id: 4,
      name: 'Rachel Green',
      role: 'Dermatologist',
      content:
        'I&apos;m impressed by the formulation quality and commitment to clean, science-backed ingredients.',
      rating: 5,
      image: '👩‍🔬',
    },
  ]

  const [current, setCurrent] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlay, testimonials.length])

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlay(false)
  }

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlay(false)
  }

  return (
    <section className="py-16 md:py-24 bg-luxury-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 bg-luxury-gold/10 text-luxury-gold rounded-full text-sm font-semibold mb-4">
            Customer Love
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-luxury-charcoal mb-4">
            Loved by Our Community
          </h2>
          <p className="text-luxury-charcoal/60 text-lg max-w-2xl mx-auto">
            Hear from real customers who have transformed their skin with Luxe Glow products.
          </p>
        </AnimatedSection>

        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-lg p-8 md:p-12"
              >
                {/* Star Rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <span key={i} className="text-2xl text-luxury-gold">
                      ★
                    </span>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-lg md:text-xl text-luxury-charcoal text-center mb-8 italic">
                  &quot;{testimonials[current].content}&quot;
                </p>

                {/* Author Info */}
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-3">{testimonials[current].image}</div>
                  <h4 className="text-lg font-bold text-luxury-charcoal">
                    {testimonials[current].name}
                  </h4>
                  <p className="text-luxury-charcoal/60 text-sm">
                    {testimonials[current].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute -left-4 md:-left-16 top-1/2 transform -translate-y-1/2 p-3 bg-luxury-gold text-white rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg-lg shadow-lg transition-all duration-300 ease-out hover:bg-opacity-90"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute -right-4 md:-right-16 top-1/2 transform -translate-y-1/2 p-3 bg-luxury-gold text-white rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg-lg shadow-lg transition-all duration-300 ease-out hover:bg-opacity-90"
              aria-label="Next testimonial"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrent(index)
                  setIsAutoPlay(false)
                }}
                className={`h-2 rounded-full transition-all duration-300 ease-out ${
                  index === current ? 'w-8 bg-luxury-gold' : 'w-2 bg-luxury-gold/30 hover:bg-luxury-gold/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
