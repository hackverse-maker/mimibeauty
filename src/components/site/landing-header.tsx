"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  X,
  Sparkles,
  Wind,
  Droplet,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { collections, products } from "@/lib/products";

const nav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Products", mega: true },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

function NavUnderline({ active }: { active?: boolean }) {
  return (
    <span
      className={`absolute inset-x-0 -bottom-1 h-px origin-left bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-500 ease-out ${
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`}
    />
  );
}

function IconButton({
  label,
  onClick,
  children,
  className = "",
}: {
  label: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group relative grid h-11 w-11 place-items-center text-foreground/70 transition-colors duration-300 hover:text-gold ${className}`}
    >
      {children}
      <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 ring-1 ring-gold/30 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const { count, setOpen: setCartOpen } = useCart();
  const { items: wishItems, count: wishCount, remove } = useWishlist();

  const wishProducts = products.filter((p) => wishItems.includes(p.slug));
  const searchResults = query.trim()
    ? products.filter((p) =>
        (p.name + p.tagline + p.category).toLowerCase().includes(query.toLowerCase()),
      )
    : products.slice(0, 4);

  useEffect(() => {
    // rAF-throttled scroll flag ÔÇö only setState when boolean flips
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const next = window.scrollY > 24;
        setScrolled((prev) => (prev === next ? prev : next));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen || wishlistOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen, wishlistOpen]);

  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => searchRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setWishlistOpen(false);
        setMegaOpen(false);
        setMobileOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!wishlistOpen) return;
    const onPointer = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest("[data-wishlist-root]")) setWishlistOpen(false);
    };
    window.addEventListener("mousedown", onPointer);
    return () => window.removeEventListener("mousedown", onPointer);
  }, [wishlistOpen]);

  const closeOverlays = () => {
    setMobileOpen(false);
    setSearchOpen(false);
    setWishlistOpen(false);
    setMegaOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-[background,box-shadow,border-color] duration-500 ${
          scrolled
            ? "border-b border-gold/40 bg-background/75 shadow-[0_8px_40px_-20px_oklch(0_0_0/0.3)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >

        <div className="relative mx-auto grid h-[100px] md:h-[120px] max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-2 px-3 sm:px-5 md:grid-cols-[1fr_auto_1fr] md:gap-4 md:px-8">
          {/* Logo ÔÇö left */}
          <Link
            href="/"
            onClick={closeOverlays}
            className="z-10 justify-self-start no-underline flex items-center gap-2"
          >
            <img src="/logo.png" alt="Mimi Beauty" className="h-[70px] md:h-[100px] max-w-[90px] sm:max-w-none object-contain" />
            <span className="font-['Playfair_Display'] text-2xl sm:text-3xl font-medium tracking-wide text-foreground mt-1">
              Mimi<span className="italic text-gold font-light">Beauty</span>
            </span>
          </Link>

          {/* Desktop nav ÔÇö center */}
          <nav className="hidden items-center gap-9 justify-self-center lg:flex">
            {nav.map((item) =>
              "mega" in item && item.mega ? (
                <div
                  key={item.href}
                  className="relative"
                >
                  <button
                    type="button"
                    className="group relative flex items-center gap-1 py-2 text-[12px] font-medium uppercase tracking-[0.22em] text-foreground/75 transition-colors hover:text-foreground"
                    aria-expanded={megaOpen}
                    onClick={() => setMegaOpen((v) => !v)}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-300 ${megaOpen ? "rotate-180 text-gold" : ""}`}
                    />
                    <NavUnderline active={megaOpen} />
                  </button>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative py-2 text-[12px] font-medium uppercase tracking-[0.22em] transition-colors hover:text-foreground ${
                    pathname === item.href ? "text-foreground" : "text-foreground/75"
                  }`}
                >
                  {item.label}
                  <NavUnderline active={pathname === item.href} />
                </Link>
              ),
            )}
          </nav>

          {/* Actions ÔÇö right */}
          <div className="z-10 flex items-center gap-0.5 justify-self-end md:gap-1">
            <IconButton
              label="Search"
              onClick={() => {
                setWishlistOpen(false);
                setSearchOpen(true);
              }}
              className="hidden sm:grid"
            >
              <Search className="h-[1.05rem] w-[1.05rem] stroke-[1.4]" />
            </IconButton>

            <div className="relative hidden sm:block" data-wishlist-root>
              <IconButton
                label="Wishlist"
                onClick={() => {
                  setSearchOpen(false);
                  setWishlistOpen((v) => !v);
                }}
              >
                <Heart
                  className={`h-[1.05rem] w-[1.05rem] stroke-[1.4] ${wishCount > 0 ? "fill-gold/20 text-gold" : ""}`}
                />
                {wishCount > 0 && (
                  <span className="absolute right-1 top-1 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-gold px-1 text-[9px] font-semibold leading-none text-background">
                    {wishCount}
                  </span>
                )}
              </IconButton>

              <AnimatePresence>
                {wishlistOpen && (
                  <WishlistPanel
                    products={wishProducts}
                    onClose={() => setWishlistOpen(false)}
                    onRemove={remove}
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            <IconButton
              label="Cart"
              onClick={() => {
                setWishlistOpen(false);
                setCartOpen(true);
              }}
            >
              <ShoppingBag className="h-[1.1rem] w-[1.1rem] stroke-[1.4]" />
              {count > 0 && (
                <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] font-semibold leading-none text-background">
                  {count}
                </span>
              )}
            </IconButton>

            <Link
              href="/shop"
              className="ml-2 hidden items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground transition-all duration-400 hover:border-gold hover:bg-gold hover:text-background md:inline-flex"
            >
              Shop Now
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="ml-1 grid h-11 w-11 place-items-center text-foreground/80 transition-colors hover:text-gold lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 stroke-[1.35]" />
            </button>
          </div>
        </div>

        {/* Products mega menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease }}
              className="absolute inset-x-0 top-full hidden border-b border-gold/25 bg-[#0a110c] shadow-[0_30px_80px_-40px_oklch(0_0_0/0.6)] lg:block"
            >
              <div className="mx-auto max-w-[1500px]">
                {/* Top Section */}
                <div className="grid grid-cols-[300px_1fr] border-b border-gold/10">
                  {/* Sidebar Collections */}
                  <div className="border-r border-gold/10 p-10 pr-12 text-white">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A86A] mb-8">
                      COLLECTIONS
                    </p>

                    <ul className="space-y-8">
                      <li className="group cursor-pointer">
                        <Link
                          href="/coming-soon/body-lava-collection"
                          className="flex items-start gap-4"
                        >
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#151c17] text-[#C9A86A] border border-[#C9A86A]/20 transition group-hover:bg-[#C9A86A] group-hover:text-black">
                            <Sparkles className="h-4 w-4" />
                          </div>
                          <div className="flex-1 border-b border-transparent pb-3 group-hover:border-gold/20">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-display text-[17px] text-[#F5F2EC]">
                                Body Lava Collection
                              </span>
                              <ChevronDown className="h-3.5 w-3.5 -rotate-90 opacity-50 group-hover:opacity-100 group-hover:text-[#C9A86A] transition-all" />
                            </div>
                            <span className="text-xs text-white/50 leading-relaxed font-light block">
                              Luminous body oils in 4 radiant shades.
                            </span>
                          </div>
                        </Link>
                      </li>

                      <li className="group cursor-pointer">
                        <Link
                          href="/coming-soon/hair-collection"
                          className="flex items-start gap-4"
                        >
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#151c17] text-[#C9A86A] border border-[#C9A86A]/20 transition group-hover:bg-[#C9A86A] group-hover:text-black">
                            <Wind className="h-4 w-4" />
                          </div>
                          <div className="flex-1 border-b border-transparent pb-3 group-hover:border-gold/20">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-display text-[17px] text-[#F5F2EC]">
                                Hair Collection
                              </span>
                              <ChevronDown className="h-3.5 w-3.5 -rotate-90 opacity-50 group-hover:opacity-100 group-hover:text-[#C9A86A] transition-all" />
                            </div>
                            <span className="text-xs text-white/50 leading-relaxed font-light block">
                              Nourish, strengthen & restore.
                            </span>
                          </div>
                        </Link>
                      </li>

                      <li className="group cursor-pointer">
                        <Link href="/coming-soon/face-serum" className="flex items-start gap-4">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#151c17] text-[#C9A86A] border border-[#C9A86A]/20 transition group-hover:bg-[#C9A86A] group-hover:text-black">
                            <Droplet className="h-4 w-4" />
                          </div>
                          <div className="flex-1 border-b border-transparent pb-3 group-hover:border-gold/20">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-display text-[17px] text-[#F5F2EC]">
                                Face Serum
                              </span>
                              <ChevronDown className="h-3.5 w-3.5 -rotate-90 opacity-50 group-hover:opacity-100 group-hover:text-[#C9A86A] transition-all" />
                            </div>
                            <span className="text-xs text-white/50 leading-relaxed font-light block">
                              Targeted care for healthy, balanced skin.
                            </span>
                          </div>
                        </Link>
                      </li>
                    </ul>

                    <div className="mt-10">
                      <Link
                        href="/shop"
                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A86A] hover:text-white transition-colors flex items-center gap-2"
                      >
                        VIEW ALL PRODUCTS <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Product Grid */}
                  <div className="p-10 flex flex-col justify-between">
                    {/* Row 1 */}
                    <div className="border-b border-gold/10 pb-6 mb-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A86A] mb-4">
                        BODY LAVA COLLECTION
                      </p>
                      <div className="grid grid-cols-4 gap-8">
                        {["Hal├▓", "Pearl", "Amalfi", "Santorini"].map(
                          (n) => (
                            <Link href="/shop" key={n} className="group text-white">
                              <p className="font-display text-lg text-[#F5F2EC] group-hover:text-[#C9A86A] transition-colors">
                                {n}
                              </p>
                              <p className="text-xs text-white/50 mt-2 mb-1">100ml</p>
                              <p className="text-xs text-white/80">Rs. 5000</p>
                            </Link>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="border-b border-gold/10 pb-6 mb-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A86A] mb-4">
                        HAIR COLLECTION
                      </p>
                      <div className="grid grid-cols-4 gap-8">
                        <Link href="/shop" className="group text-white">
                          <p className="font-display text-lg text-[#F5F2EC] group-hover:text-[#C9A86A] transition-colors">
                            Veil
                          </p>
                          <p className="text-[11px] text-white/60 mt-1">Post-Wash Hair Serum</p>
                          <p className="text-xs text-white/50 mt-2 mb-1">30ml</p>
                          <p className="text-xs text-white/80">Rs. 3500</p>
                        </Link>
                        <Link href="/shop" className="group text-white">
                          <p className="font-display text-lg text-[#F5F2EC] group-hover:text-[#C9A86A] transition-colors">
                            Herb├®
                          </p>
                          <p className="text-[11px] text-white/60 mt-1">Pre-Wash Hair Oil</p>
                          <p className="text-xs text-white/50 mt-2 mb-1">50ml</p>
                          <p className="text-xs text-white/80">Rs. 4500</p>
                        </Link>
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A86A] mb-4">
                        FACE SERUM
                      </p>
                      <div className="grid grid-cols-4 gap-8">
                        <Link href="/shop" className="group text-white">
                          <p className="font-display text-lg text-[#F5F2EC] group-hover:text-[#C9A86A] transition-colors">
                            Dew
                          </p>
                          <p className="text-[11px] text-white/60 mt-1">Daily Glow Face Serum</p>
                          <p className="text-xs text-white/50 mt-2 mb-1">30ml</p>
                          <p className="text-xs text-white/80">Rs. 3500</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Banner */}
                <div className="relative h-64 overflow-hidden bg-[#070b09] flex items-center px-10 border-t border-gold/10">
                  <div className="absolute inset-0 z-0">
                    <img
                      src="/hero_dew_collection.jpg"
                      alt="Collection lineup"
                      className="h-full w-full object-cover object-right opacity-80 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a110c] via-[#0a110c]/80 to-transparent" />
                  </div>

                  <div className="relative z-10 max-w-xl">
                    <h3 className="font-display text-5xl text-[#F5F2EC]">
                      Natural <span className="italic text-[#C9A86A]">Glow</span>
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-white/80 font-light max-w-md">
                      Discover scientifically formulated skincare that hydrates, nourishes and
                      restores radiant skin with every application.
                    </p>

                    <div className="mt-6 flex items-center gap-4">
                      <Link
                        href="/shop"
                        className="rounded-full bg-[#E8D7BE] px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition hover:bg-white flex items-center gap-2"
                      >
                        SHOP COLLECTION <ArrowRight className="h-3 w-3" />
                      </Link>
                      <Link
                        href="/shop"
                        className="rounded-full border border-white/30 bg-transparent px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:border-[#C9A86A] hover:text-[#C9A86A]"
                      >
                        WATCH ROUTINE
                      </Link>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-[#C9A86A] text-[#C9A86A]" />
                        ))}
                      </div>
                      <span className="text-xs text-white/60">
                        Trusted by 25,000+ Happy Customers
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search popup */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[8vh] md:pt-[18vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              aria-label="Close search"
              className="absolute inset-0 bg-background/70 backdrop-blur-md"
              onClick={() => setSearchOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Search products"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.4, ease }}
              className="relative z-10 w-full max-w-xl overflow-hidden border border-gold/30 bg-background/95 shadow-luxe backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 border-b border-gold/20 px-5 py-4">
                <Search className="h-4 w-4 shrink-0 text-gold" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search productsÔÇª"
                  className="w-full bg-transparent font-display text-xl outline-none placeholder:text-muted-foreground/50 md:text-2xl"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="max-h-[50vh] overflow-y-auto p-2">
                {searchResults.length === 0 ? (
                  <p className="px-4 py-10 text-center text-sm text-muted-foreground">
                    No matches for ÔÇ£{query}ÔÇØ
                  </p>
                ) : (
                  searchResults.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/product/${p.slug}`}

                      onClick={() => {
                        setSearchOpen(false);
                        setQuery("");
                      }}
                      className="flex items-center gap-4 rounded-sm px-3 py-3 transition-colors hover:bg-gold/10"
                    >
                      <img src={p.image} alt="" className="h-14 w-14 object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-lg">{p.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{p.tagline}</p>
                      </div>
                      <span className="text-sm text-gold">Rs. {p.price}</span>
                    </Link>
                  ))
                )}
              </div>
              <div className="flex items-center justify-between border-t border-border/50 px-5 py-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span>ÔîÿK to search</span>
                <Link href="/shop" onClick={() => setSearchOpen(false)} className="hover:text-gold">
                  Shop all
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in oklab, var(--gold) 28%, transparent), transparent)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
            />

            <div className="relative flex items-center justify-between px-5 py-4">
              <Link
                href="/"
                onClick={closeOverlays}
                className="no-underline"
              >
                <img src="/logo.png" alt="Mimi Beauty" className="h-[120px] w-[132px] object-contain" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="grid h-11 w-11 place-items-center text-foreground/70 transition-colors hover:text-gold"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <motion.nav
              className="relative flex flex-1 flex-col items-center justify-center gap-7 px-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
              }}
            >
              {nav.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 36 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={closeOverlays}
                    className="block font-display text-3xl tracking-tight text-foreground/90 transition-colors hover:text-gold sm:text-5xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                }}
                className="mt-4"
              >
                <Link
                  href="/shop"
                  onClick={closeOverlays}
                  className="inline-flex items-center gap-2 rounded-full border border-gold bg-gold px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-background"
                >
                  Shop Now <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="relative flex items-center justify-center gap-2 border-t border-gold/20 px-6 py-6 sm:gap-4"
            >
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setSearchOpen(true);
                }}
                className="grid h-11 w-11 place-items-center text-foreground/60 transition-colors hover:text-gold"
                aria-label="Search"
              >
                <Search className="h-5 w-5 stroke-[1.35]" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setWishlistOpen(true);
                }}
                className="relative grid h-11 w-11 place-items-center text-foreground/60 transition-colors hover:text-gold"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5 stroke-[1.35]" />
                {wishCount > 0 && (
                  <span className="absolute right-1 top-1 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-gold text-[8px] font-semibold text-background">
                    {wishCount}
                  </span>
                )}
              </button>
              <ThemeToggle />
              <Link
                href="/coming-soon/body-lava-collection"
                onClick={closeOverlays}
                className="min-h-11 px-2 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-gold inline-flex items-center"
              >
                Collections
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile wishlist sheet */}
      <AnimatePresence>
        {wishlistOpen && (
          <div className="sm:hidden" data-wishlist-root>
            <motion.button
              type="button"
              aria-label="Close wishlist"
              className="fixed inset-0 z-[74] bg-background/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setWishlistOpen(false)}
            />
            <WishlistPanel
              products={wishProducts}
              onClose={() => setWishlistOpen(false)}
              onRemove={remove}
              mobile
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function WishlistPanel({
  products: list,
  onClose,
  onRemove,
  mobile,
}: {
  products: typeof products;
  onClose: () => void;
  onRemove: (slug: string) => void;
  mobile?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: mobile ? 40 : 8, scale: mobile ? 1 : 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: mobile ? 24 : 6, scale: mobile ? 1 : 0.98 }}
      transition={{ duration: 0.35, ease }}
      className={
        mobile
          ? "fixed inset-x-0 bottom-0 z-[75] max-h-[70vh] overflow-hidden rounded-t-2xl border border-gold/30 bg-background shadow-luxe"
          : "absolute right-0 top-[calc(100%+0.75rem)] z-50 w-80 overflow-hidden border border-gold/30 bg-background/95 shadow-luxe backdrop-blur-xl"
      }
    >
      <div className="flex items-center justify-between border-b border-gold/20 px-4 py-3">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Wishlist</p>
        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="max-h-72 overflow-y-auto">
        {list.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-muted-foreground">
            Your wishlist awaits its first product.
          </p>
        ) : (
          list.map((p) => (
            <div
              key={p.slug}
              className="flex items-center gap-3 border-b border-border/40 px-4 py-3"
            >
              <Link
                href={`/product/${p.slug}`}
                onClick={onClose}
                className="flex min-w-0 flex-1 items-center gap-3"
              >
                <img src={p.image} alt="" className="h-12 w-12 object-cover" />
                <div className="min-w-0">
                  <p className="truncate font-display text-base">{p.name}</p>
                  <p className="text-xs text-gold">Rs. {p.price}</p>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => onRemove(p.slug)}
                className="text-muted-foreground transition-colors hover:text-gold"
                aria-label={`Remove ${p.name}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
      {list.length > 0 && (
        <div className="border-t border-border/50 p-3">
          <Link
            href="/shop"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gold/40 py-2.5 text-xs uppercase tracking-[0.22em] transition-colors hover:border-gold hover:bg-gold/10"
          >
            Continue shopping
          </Link>
        </div>
      )}
    </motion.div>
  );
}
