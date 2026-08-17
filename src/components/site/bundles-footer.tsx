"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Instagram, Check } from "lucide-react";

export function BundlesFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#FAF7F2] text-[#0C1810] border-t border-[#0C1810]/15 pt-16 pb-12 font-sans">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Desktop 5-Column Grid / Mobile Vertical Stack */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-16 border-b border-[#0C1810]/10">
          {/* COLUMN 1 — BRAND */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl font-bold tracking-[0.2em] text-[#0C1810] uppercase">
                MIMI BEAUTY
              </span>
            </Link>
            <p className="text-xs text-[#0C1810]/70 leading-relaxed max-w-xs">
              Skincare and haircare, made with naturally derived ingredients.
            </p>
          </div>

          {/* COLUMN 2 — SHOP */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0C1810]">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs text-[#0C1810]/75">
              <li>
                <Link href="/shop" className="hover:text-[#0C1810] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/bundles" className="hover:text-[#0C1810] transition-colors font-medium">
                  Mimi Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=HAIR" className="hover:text-[#0C1810] transition-colors">
                  Hair Collection
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=BODY" className="hover:text-[#0C1810] transition-colors">
                  Body Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 — ABOUT */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0C1810]">
              ABOUT
            </h4>
            <ul className="space-y-2.5 text-xs text-[#0C1810]/75">
              <li>
                <Link href="/about" className="hover:text-[#0C1810] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0C1810] transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0C1810] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4 — HELP */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0C1810]">
              HELP
            </h4>
            <ul className="space-y-2.5 text-xs text-[#0C1810]/75">
              <li>
                <Link href="/about" className="hover:text-[#0C1810] transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0C1810] transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0C1810] transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0C1810] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 5 — STAY CONNECTED */}
          <div className="space-y-4 lg:col-span-1">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0C1810]">
              STAY CONNECTED
            </h4>
            <p className="text-xs text-[#0C1810]/70 leading-relaxed">
              Be the first to know about new launches and offers.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#0C1810]/5 border border-[#0C1810]/20 rounded-xl text-xs text-[#0C1810] flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-700 shrink-0" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-full border border-[#0C1810]/25 bg-transparent px-4 py-2.5 text-xs text-[#0C1810] placeholder:text-[#0C1810]/40 focus:border-[#0C1810] focus:outline-none pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 p-1.5 rounded-full bg-[#0C1810] text-[#FAF7F2] hover:bg-[#1A2E20] transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="grid h-8 w-8 place-items-center rounded-full border border-[#0C1810]/20 text-[#0C1810]/80 hover:border-[#0C1810] hover:text-[#0C1810] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="grid h-8 w-8 place-items-center rounded-full border border-[#0C1810]/20 text-[#0C1810]/80 hover:border-[#0C1810] hover:text-[#0C1810] transition-all"
                aria-label="TikTok"
              >
                <span className="text-[11px] font-bold font-mono">TT</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0C1810]/60">
          <p>© 2025 Mimi Beauty. All rights reserved.</p>
          <div className="flex gap-6 text-[11px]">
            <Link href="/about" className="hover:text-[#0C1810]">Terms</Link>
            <Link href="/about" className="hover:text-[#0C1810]">Privacy</Link>
            <Link href="/about" className="hover:text-[#0C1810]">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
