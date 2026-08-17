"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, X, Menu } from "lucide-react";
import { useCart } from "@/lib/cart";
import { motion, AnimatePresence } from "framer-motion";

export function BundlesHeader() {
  const { count, setOpen } = useCart();
  const [announcementOpen, setAnnouncementOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF7F2] font-sans border-b border-[#0C1810]/10 transition-colors">
      {/* Top Announcement Bar */}
      <AnimatePresence>
        {announcementOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#0C1810] text-[#FAF7F2] py-2 px-4 text-center text-[11px] font-medium tracking-[0.18em] uppercase flex items-center justify-between relative overflow-hidden"
          >
            <div className="w-full text-center pr-6">
              Complimentary delivery on all orders above PKR 5000.
            </div>
            <button
              onClick={() => setAnnouncementOpen(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FAF7F2]/70 hover:text-[#FAF7F2] p-1 transition-colors"
              aria-label="Close announcement"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Bundles Page Navigation */}
      <div className="mx-auto max-w-[1400px] px-6 py-4 md:py-6">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#0C1810] p-1 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* LEFT: Shop, About, Journal (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 min-w-[200px]">
            <Link
              href="/shop"
              className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#0C1810]/80 hover:text-[#0C1810] transition-colors"
            >
              SHOP
            </Link>
            <Link
              href="/about"
              className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#0C1810]/80 hover:text-[#0C1810] transition-colors"
            >
              ABOUT
            </Link>
            <Link
              href="/blog"
              className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#0C1810]/80 hover:text-[#0C1810] transition-colors"
            >
              JOURNAL
            </Link>
          </nav>

          {/* CENTER: MIMI BEAUTY Stacked Logo */}
          <div className="flex-1 text-center">
            <Link href="/" className="inline-flex flex-col items-center justify-center group leading-none py-1">
              <span className="font-display text-2xl sm:text-3xl md:text-4xl tracking-[0.28em] font-bold text-[#0C1810] uppercase">
                MIMI
              </span>
              <span className="font-display text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.45em] font-semibold text-[#0C1810]/80 uppercase mt-0.5">
                BEAUTY
              </span>
            </Link>
          </div>

          {/* RIGHT: Search, Account, Shopping Bag (Desktop & Mobile) */}
          <div className="flex items-center justify-end gap-5 min-w-[120px] md:min-w-[200px]">
            {/* Search Button */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-[#0C1810]/80 hover:text-[#0C1810] p-1 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5 stroke-[1.75]" />
              </button>

              {/* Quick Search Popover */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-10 w-72 bg-[#FAF7F2] border border-[#0C1810]/15 p-3 rounded-xl shadow-2xl z-50"
                  >
                    <div className="flex items-center gap-2 border-b border-[#0C1810]/20 pb-2">
                      <Search className="h-4 w-4 text-[#0C1810]/60 shrink-0" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search bundles or products..."
                        className="w-full bg-transparent text-xs text-[#0C1810] focus:outline-none placeholder:text-[#0C1810]/40"
                        autoFocus
                      />
                      <button onClick={() => setSearchOpen(false)}>
                        <X className="h-3.5 w-3.5 text-[#0C1810]/50 hover:text-[#0C1810]" />
                      </button>
                    </div>
                    {searchQuery.trim() && (
                      <div className="pt-2 text-xs text-[#0C1810]/70">
                        <Link
                          href={`/shop?search=${encodeURIComponent(searchQuery)}`}
                          onClick={() => setSearchOpen(false)}
                          className="block p-2 hover:bg-[#0C1810]/5 rounded text-[11px] uppercase tracking-wider font-semibold"
                        >
                          Search for "{searchQuery}" →
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Account Link */}
            <Link
              href="/about"
              className="hidden sm:inline-block text-[#0C1810]/80 hover:text-[#0C1810] p-1 transition-colors"
              aria-label="Account"
            >
              <User className="h-5 w-5 stroke-[1.75]" />
            </Link>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => setOpen(true)}
              className="relative text-[#0C1810]/80 hover:text-[#0C1810] p-1 transition-colors flex items-center"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="h-5 w-5 stroke-[1.75]" />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#0C1810] text-[#FAF7F2] text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-[#0C1810]/10 bg-[#FAF7F2] px-6 py-6"
          >
            <div className="flex flex-col gap-4 text-center">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-[0.25em] text-[#0C1810] py-2 border-b border-[#0C1810]/10"
              >
                SHOP
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-[0.25em] text-[#0C1810] py-2 border-b border-[#0C1810]/10"
              >
                ABOUT
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-[0.25em] text-[#0C1810] py-2 border-b border-[#0C1810]/10"
              >
                JOURNAL
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
