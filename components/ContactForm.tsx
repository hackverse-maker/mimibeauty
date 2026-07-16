'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void
}

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (onSubmit) {
        onSubmit(formData)
      }

      setStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })

      setTimeout(() => setStatus('idle'), 3000)
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-semibold text-luxury-charcoal mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="w-full px-4 py-3 rounded-lg border border-luxury-rose/20 bg-white text-luxury-charcoal placeholder:text-luxury-charcoal/40 focus:outline-none focus:ring-2 focus:ring-luxury-gold transition-all duration-300 ease-out"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-luxury-charcoal mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
            className="w-full px-4 py-3 rounded-lg border border-luxury-rose/20 bg-white text-luxury-charcoal placeholder:text-luxury-charcoal/40 focus:outline-none focus:ring-2 focus:ring-luxury-gold transition-all duration-300 ease-out"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-semibold text-luxury-charcoal mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="w-full px-4 py-3 rounded-lg border border-luxury-rose/20 bg-white text-luxury-charcoal placeholder:text-luxury-charcoal/40 focus:outline-none focus:ring-2 focus:ring-luxury-gold transition-all duration-300 ease-out"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-luxury-charcoal mb-2">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="How can we help?"
            required
            className="w-full px-4 py-3 rounded-lg border border-luxury-rose/20 bg-white text-luxury-charcoal placeholder:text-luxury-charcoal/40 focus:outline-none focus:ring-2 focus:ring-luxury-gold transition-all duration-300 ease-out"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label className="block text-sm font-semibold text-luxury-charcoal mb-2">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us what you think..."
          required
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-luxury-rose/20 bg-white text-luxury-charcoal placeholder:text-luxury-charcoal/40 focus:outline-none focus:ring-2 focus:ring-luxury-gold transition-all duration-300 ease-out resize-none"
        />
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 ease-out ${
          status === 'success'
            ? 'bg-green-500 text-white'
            : 'bg-luxury-gold text-white hover:bg-opacity-90'
        } disabled:opacity-50`}
      >
        {status === 'loading'
          ? 'Sending...'
          : status === 'success'
            ? '✓ Message Sent!'
            : 'Send Message'}
      </motion.button>

      {status === 'error' && (
        <p className="text-red-600 text-center font-medium">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}
