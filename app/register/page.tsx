'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Check } from 'lucide-react'
import { useToast } from '@/lib/providers/ToastProvider'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageTransition from '@/components/PageTransition'

export default function RegisterPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      toast('Passwords do not match', 'error')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast('Account created! (Demo mode)')
    }, 1200)
  }

  return (
    <PageTransition>
      <div className="max-w-md mx-auto px-4 py-32">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Register' }]} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl p-8 shadow-lg mt-8"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-luxury-gold to-luxury-rose rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">LG</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
            <p className="text-muted-foreground text-sm mt-1">Join the Luxe Glow community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Confirm Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                />
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm text-muted-foreground cursor-pointer">
              <input type="checkbox" required className="accent-luxury-gold mt-0.5" />
              <span>I agree to the <Link href="/about" className="text-luxury-gold hover:underline">Terms</Link> and <Link href="/about" className="text-luxury-gold hover:underline">Privacy Policy</Link></span>
            </label>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-luxury-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full spinner" /> Creating account...</>
              ) : (
                <>Create Account <ArrowRight size={18} /></>
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-luxury-gold font-semibold hover:underline">Sign in</Link>
          </p>

          {/* Benefits */}
          <div className="mt-6 pt-6 border-t border-border space-y-2">
            {['Exclusive member deals', 'Early access to new launches', 'Faster checkout experience'].map((b) => (
              <div key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check size={14} className="text-luxury-gold" /> {b}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
