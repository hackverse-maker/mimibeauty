"use client";

import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, Sun, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const navItems = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Help", href: "/contact" },
];

export function BundlesHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count: itemCount } = useCart();

  return (
    <header className="relative z-40 border-b border-white/10 bg-background text-white">
      <div className="mx-auto flex min-h-20 max-w-[1400px] items-center justify-between gap-6 px-6 py-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-xs uppercase tracking-[0.18em] transition-colors hover:text-gold">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/bundles" className="font-serif text-center text-3xl tracking-[0.22em] text-white" aria-label="Mimi Beauty home">
          <div className="text-3xl">MIMI</div>
          <div className="text-xs tracking-[0.3em]">beauty</div>
        </Link>

        <div className="flex items-center justify-end gap-4">
          <button type="button" className="hidden transition-colors hover:text-gold lg:block" aria-label="Search">
            <Search className="size-4" />
          </button>
          <Link href="/wishlist" className="hidden transition-colors hover:text-gold lg:block" aria-label="Wishlist">
            <Heart className="size-4" />
          </Link>
          <Link href="#cart" className="relative transition-colors hover:text-gold" aria-label={`Shopping bag with ${itemCount} items`}>
            <ShoppingBag className="size-4" />
            {itemCount > 0 && <span className="absolute -right-3 -top-3 text-[10px] text-gold">{itemCount}</span>}
          </Link>
          <button type="button" className="hidden transition-colors hover:text-gold lg:block" aria-label="Toggle theme">
            <Sun className="size-4" />
          </button>
          <button type="button" className="lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-5 border-t border-white/10 px-6 py-6 lg:hidden" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="text-xs uppercase tracking-[0.18em]">
              {item.label}
            </Link>
          ))}
          <Link href="/wishlist" onClick={() => setMenuOpen(false)} className="text-xs uppercase tracking-[0.18em]">Wishlist</Link>
        </nav>
      )}
    </header>
  );
}

export default BundlesHeader;
