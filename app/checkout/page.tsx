'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CreditCard, Lock, Check, ArrowLeft } from 'lucide-react'
import { useCart } from '@/lib/providers/CartProvider'
import { useToast } from '@/lib/providers/ToastProvider'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageTransition from '@/components/PageTransition'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { toast } = useToast()
  const [step, setStep] = useState<'info' | 'payment' | 'done'>('info')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', zip: '', country: '',
    cardName: '', cardNumber: '', expiry: '', cvc: '',
  })

  const tax = total * 0.08
  const grandTotal = total + tax

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('done')
      clearCart()
      toast('Order placed successfully!')
    }, 1500)
  }

  if (step === 'done') {
    return (
      <PageTransition>
        <div className="max-w-2xl mx-auto px-4 py-32 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check size={40} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. A confirmation email has been sent to {form.email || 'your inbox'}.
          </p>
          <Link href="/products">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="px-8 py-4 bg-luxury-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all">
              Continue Shopping
            </motion.button>
          </Link>
        </div>
      </PageTransition>
    )
  }

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 py-32 text-center">
          <div className="text-6xl mb-4">🛍️</div>
          <h1 className="text-2xl font-bold text-foreground mb-3">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add items to your cart before checking out.</p>
          <Link href="/products" className="px-6 py-3 bg-luxury-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all inline-block">
            Shop Products
          </Link>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} />

        <Link href="/cart" className="mt-6 mb-8 inline-flex items-center gap-2 text-muted-foreground hover:text-luxury-gold transition-colors">
          <ArrowLeft size={18} /> Back to Cart
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-8">Checkout</h1>

        {/* Steps indicator */}
        <div className="flex items-center gap-4 mb-10">
          {['Information', 'Payment', 'Done'].map((label, i) => {
            const stepIndex = ['info', 'payment', 'done'].indexOf(step)
            const active = i <= stepIndex
            return (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${active ? 'bg-luxury-gold text-white' : 'bg-muted text-muted-foreground'}`}>
                  {i + 1}
                </div>
                <span className={active ? 'text-foreground font-medium' : 'text-muted-foreground'}>{label}</span>
                {i < 2 && <div className="w-8 h-0.5 bg-border mx-2" />}
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 'info' && (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleInfoSubmit}
                className="bg-card rounded-2xl p-6 shadow-md space-y-4"
              >
                <h2 className="text-xl font-bold text-foreground mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'email', label: 'Email', type: 'email', full: true },
                    { name: 'firstName', label: 'First Name', type: 'text' },
                    { name: 'lastName', label: 'Last Name', type: 'text' },
                    { name: 'address', label: 'Address', type: 'text', full: true },
                    { name: 'city', label: 'City', type: 'text' },
                    { name: 'zip', label: 'ZIP Code', type: 'text' },
                    { name: 'country', label: 'Country', type: 'text', full: true },
                  ].map((f) => (
                    <div key={f.name} className={f.full ? 'md:col-span-2' : ''}>
                      <label className="block text-sm font-medium text-foreground mb-1">{f.label}</label>
                      <input
                        type={f.type}
                        name={f.name}
                        value={(form as any)[f.name]}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                      />
                    </div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-luxury-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Continue to Payment
                </motion.button>
              </motion.form>
            )}

            {step === 'payment' && (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handlePaymentSubmit}
                className="bg-card rounded-2xl p-6 shadow-md space-y-4"
              >
                <h2 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <CreditCard size={20} /> Payment Details
                </h2>
                <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
                  <Lock size={14} /> Your payment information is secure and encrypted
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1">Name on Card</label>
                    <input type="text" name="cardName" value={form.cardName} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1">Card Number</label>
                    <input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} required placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Expiry</label>
                    <input type="text" name="expiry" value={form.expiry} onChange={handleChange} required placeholder="MM/YY" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">CVC</label>
                    <input type="text" name="cvc" value={form.cvc} onChange={handleChange} required placeholder="123" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep('info')} className="px-6 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors">
                    Back
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 bg-luxury-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? (
                      <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full spinner" /> Processing...</>
                    ) : (
                      <><Lock size={16} /> Place Order · ${grandTotal.toFixed(2)}</>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </div>

          {/* Summary */}
          <div className="bg-card rounded-2xl p-6 shadow-md h-fit">
            <h2 className="text-lg font-bold text-foreground mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-luxury-gold/20 to-luxury-rose/20 flex items-center justify-center text-2xl flex-shrink-0">
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-muted-foreground text-sm">
                <span>Subtotal</span><span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground text-sm">
                <span>Shipping</span><span className="text-emerald-500">FREE</span>
              </div>
              <div className="flex justify-between text-muted-foreground text-sm">
                <span>Tax</span><span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-foreground pt-2 border-t border-border">
                <span>Total</span><span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
