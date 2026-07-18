'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import FAQ from '@/components/FAQ'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageTransition from '@/components/PageTransition'

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 mt-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Reach out to our team anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="space-y-8">
            {[
              { icon: <Mail className="w-6 h-6 text-luxury-gold" />, title: 'Email', value: 'hello@luxeglow.com' },
              { icon: <Phone className="w-6 h-6 text-luxury-gold" />, title: 'Phone', value: '+1 (555) 123-4567' },
              { icon: <MapPin className="w-6 h-6 text-luxury-gold" />, title: 'Address', value: '123 Glow Street\nLos Angeles, CA 90001' },
              { icon: <Clock className="w-6 h-6 text-luxury-gold" />, title: 'Hours', value: 'Mon - Fri: 9AM - 6PM PST\nSat - Sun: 10AM - 4PM PST' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden shadow-lg h-96 bg-gradient-to-br from-luxury-gold/10 to-luxury-rose/10 flex items-center justify-center mb-16"
        >
          <div className="text-center">
            <MapPin className="w-16 h-16 text-luxury-gold/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Visit our flagship store in Los Angeles</p>
          </div>
        </motion.div>

        <FAQ />
      </div>
    </PageTransition>
  )
}
