'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Package, Heart, Settings, LogOut, ShoppingBag, CreditCard as Edit } from 'lucide-react'
import { useWishlist } from '@/lib/providers/WishlistProvider'
import { useCart } from '@/lib/providers/CartProvider'
import { useToast } from '@/lib/providers/ToastProvider'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageTransition from '@/components/PageTransition'

type Tab = 'profile' | 'orders' | 'wishlist' | 'settings'

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const { items: wishlistItems } = useWishlist()
  const { items: cartItems } = useCart()
  const { toast } = useToast()

  const tabs = [
    { id: 'profile' as Tab, label: 'Profile', icon: <User size={18} /> },
    { id: 'orders' as Tab, label: 'Orders', icon: <Package size={18} /> },
    { id: 'wishlist' as Tab, label: `Wishlist (${wishlistItems.length})`, icon: <Heart size={18} /> },
    { id: 'settings' as Tab, label: 'Settings', icon: <Settings size={18} /> },
  ]

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'My Account' }]} />

        <div className="flex items-center gap-4 mt-6 mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-luxury-gold to-luxury-rose rounded-2xl flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Account</h1>
            <p className="text-muted-foreground">Welcome back to Luxe Glow</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <nav className="bg-card rounded-2xl p-4 shadow-md space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    activeTab === tab.id
                      ? 'bg-luxury-gold/10 text-luxury-gold font-semibold'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
              <button
                onClick={() => toast('Logged out (Demo mode)', 'info')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors text-left"
              >
                <LogOut size={18} /> Logout
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-card rounded-2xl p-6 md:p-8 shadow-md"
              >
                {activeTab === 'profile' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-foreground">Profile Information</h2>
                      <button className="flex items-center gap-2 text-sm text-luxury-gold hover:underline">
                        <Edit size={14} /> Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: 'Full Name', value: 'Jane Doe' },
                        { label: 'Email', value: 'jane@example.com' },
                        { label: 'Phone', value: '+1 (555) 123-4567' },
                        { label: 'Member Since', value: 'January 2024' },
                      ].map((f) => (
                        <div key={f.label} className="bg-muted/50 rounded-xl p-4">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{f.label}</p>
                          <p className="font-medium text-foreground">{f.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-4">
                      <div className="bg-luxury-gold/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-luxury-gold">12</div>
                        <p className="text-xs text-muted-foreground mt-1">Total Orders</p>
                      </div>
                      <div className="bg-luxury-rose/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-foreground">{wishlistItems.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">Wishlist Items</p>
                      </div>
                      <div className="bg-luxury-sage/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-foreground">{cartItems.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">In Cart</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-6">Order History</h2>
                    <div className="space-y-4">
                      {[
                        { id: '#LG-2024-001', date: 'Jan 15, 2024', total: '$165.00', status: 'Delivered', items: 3 },
                        { id: '#LG-2024-002', date: 'Feb 02, 2024', total: '$92.00', status: 'Shipped', items: 2 },
                        { id: '#LG-2024-003', date: 'Feb 20, 2024', total: '$128.00', status: 'Processing', items: 4 },
                      ].map((order) => (
                        <div key={order.id} className="bg-muted/50 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold text-foreground">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date} · {order.items} items</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500' :
                              order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500' :
                              'bg-amber-500/10 text-amber-500'
                            }`}>
                              {order.status}
                            </span>
                            <span className="font-bold text-foreground">{order.total}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'wishlist' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-foreground">My Wishlist</h2>
                      <Link href="/wishlist" className="text-sm text-luxury-gold hover:underline">View all</Link>
                    </div>
                    {wishlistItems.length === 0 ? (
                      <div className="text-center py-12">
                        <Heart size={48} className="mx-auto text-muted-foreground/40 mb-3" />
                        <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
                        <Link href="/products" className="text-luxury-gold font-medium hover:underline">Browse products</Link>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {wishlistItems.map((item) => (
                          <Link key={item.id} href={`/products/${item.slug}`} className="bg-muted/50 rounded-xl p-4 hover:shadow-md transition-shadow">
                            <div className="text-4xl mb-2">{item.emoji}</div>
                            <p className="font-medium text-foreground text-sm line-clamp-1">{item.name}</p>
                            <p className="text-luxury-gold font-bold">${item.price}</p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-6">Account Settings</h2>
                    <div className="space-y-4">
                      {[
                        { label: 'Email Notifications', desc: 'Receive updates about orders and offers', defaultChecked: true },
                        { label: 'SMS Notifications', desc: 'Get text alerts for order updates', defaultChecked: false },
                        { label: 'Marketing Emails', desc: 'Tips, deals, and new product launches', defaultChecked: true },
                      ].map((s) => (
                        <div key={s.label} className="flex items-center justify-between bg-muted/50 rounded-xl p-4">
                          <div>
                            <p className="font-medium text-foreground">{s.label}</p>
                            <p className="text-sm text-muted-foreground">{s.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked={s.defaultChecked} className="sr-only peer" />
                            <div className="w-11 h-6 bg-muted-foreground/30 rounded-full peer peer-checked:bg-luxury-gold transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-5" />
                          </label>
                        </div>
                      ))}
                      <button
                        onClick={() => toast('Settings saved')}
                        className="px-6 py-3 bg-luxury-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
