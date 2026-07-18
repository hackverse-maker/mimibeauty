'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useToast } from '@/lib/providers/ToastProvider'

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStatus('success')
      toast('Message sent successfully!')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const fieldClass = 'w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-luxury-gold transition-all'

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-2xl p-6 md:p-8 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required className={fieldClass} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required className={fieldClass} />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className={fieldClass} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <label className="block text-sm font-semibold text-foreground mb-2">Subject</label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" required className={fieldClass} />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us what you think..." required rows={6} className={`${fieldClass} resize-none`} />
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className={`w-full py-4 rounded-lg font-semibold transition-all ${
          status === 'success' ? 'bg-emerald-500 text-white' : 'bg-luxury-gold text-white hover:shadow-lg'
        } disabled:opacity-60`}
      >
        {status === 'loading' ? 'Sending...' : status === 'success' ? '✓ Message Sent!' : 'Send Message'}
      </motion.button>

      {status === 'error' && (
        <p className="text-red-500 text-center font-medium">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}
