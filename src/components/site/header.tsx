import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { collections, products } from "@/lib/products";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Products", mega: true },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);

  const { count, setOpen: setCartOpen } = useCart();
  const { items: wishItems, count: wishCount, remove } = useWishlist();

  const wishProducts = products.filter((p) => wishItems.includes(p.slug));
  const searchResults = query.trim()
    ? products.filter((p) =>
        (p.name + p.tagline + p.category).toLowerCase().includes(query.toLowerCase()),
      )
    : products.slice(0, 4);

  useEffect(() => {
    // rAF-throttled scroll flag — only setState when boolean flips
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

  // Click-outside listener for Product dropdown menu
  useEffect(() => {
    if (!megaOpen) return;
    const onPointerDownOutside = (e: MouseEvent | TouchEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDownOutside);
    document.addEventListener("touchstart", onPointerDownOutside);
    return () => {
      document.removeEventListener("mousedown", onPointerDownOutside);
      document.removeEventListener("touchstart", onPointerDownOutside);
    };
  }, [megaOpen]);

  const closeOverlays = () => {
    setMobileOpen(false);
    setSearchOpen(false);
    setWishlistOpen(false);
    setMegaOpen(false);
  };

  return (
    <>
      {/* Announcement marquee */}
      <div className="relative z-50 overflow-hidden border-b border-gold/20 bg-foreground text-background">
        <div className="flex animate-marquee whitespace-nowrap py-2 text-[11px] uppercase tracking-[0.32em] md:text-[11px]">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 gap-16 px-8">
              <span>Complimentary shipping over $75</span>
              <span aria-hidden>·</span>
              <span>Dermatologist tested</span>
              <span aria-hidden>·</span>
              <span>Cruelty free & vegan</span>
              <span aria-hidden>·</span>
              <span>New: Hálo body oil</span>
              <span aria-hidden>·</span>
            </div>
          ))}
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-[background,box-shadow,border-color] duration-500 ${
          scrolled
            ? "border-b border-gold/40 bg-background/75 shadow-[0_8px_40px_-20px_oklch(0_0_0/0.3)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="relative mx-auto grid h-[4.25rem] max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-2 px-4 sm:px-5 md:h-[4.75rem] md:grid-cols-[1fr_auto_1fr] md:gap-4 md:px-8">
          {/* Logo — left */}
          <Link
            to="/"
            onClick={closeOverlays}
            className="group z-10 flex min-w-0 max-w-[58vw] items-center gap-2 justify-self-start sm:max-w-none sm:gap-2.5"
          >
            <motion.span
              className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full sm:h-9 sm:w-9 md:h-10 md:w-10"
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
            >
              <img
                src="/logo.png"
                alt=""
                className="h-full w-full rounded-full object-cover"
              />
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 30%, color-mix(in oklab, var(--gold) 55%, transparent) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
              />
            </motion.span>
            <span className="truncate font-script text-[clamp(1.2rem,4.2vw,2.15rem)] leading-none tracking-tight text-gold transition-opacity duration-300 group-hover:opacity-90">
              Mimi Beauty.
            </span>
          </Link>

          {/* Desktop nav — center */}
          <nav className="hidden items-center gap-9 justify-self-center lg:flex">
            {nav.map((item) =>
              "mega" in item && item.mega ? (
                <div
                  key={item.to}
                  className="relative"
                  ref={megaRef}
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
                  key={item.to}
                  to={item.to}
                  className="group relative py-2 text-[12px] font-medium uppercase tracking-[0.22em] text-foreground/75 transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                >
                  {item.label}
                  <NavUnderline />
                </Link>
              ),
            )}
          </nav>

          {/* Actions — right */}
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
              to="/shop"
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
              className="absolute inset-x-0 top-full hidden border-b border-gold/25 bg-background/92 shadow-[0_30px_80px_-40px_oklch(0_0_0/0.4)] backdrop-blur-md lg:block"
            >
              <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_1.4fr] gap-10 px-8 py-10">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-gold">Collections</p>
                  <ul className="mt-5 space-y-1">
                    {collections.map((c) => (
                      <li key={c.slug}>
                        <Link
                          to="/collections"
                          onClick={() => setMegaOpen(false)}
                          className="group flex items-center justify-between border-b border-border/40 py-3 text-sm text-foreground/80 transition-colors hover:text-gold"
                        >
                          <span className="font-display text-lg tracking-tight">{c.name}</span>
                          <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/shop"
                    onClick={() => setMegaOpen(false)}
                    className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-gold"
                  >
                    View all products <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-gold">Featured rituals</p>
                  <div className="mt-5 grid grid-cols-2 gap-4 xl:grid-cols-4">
                    {products.map((p) => (
                      <Link
                        key={p.slug}
                        to="/product/$slug"
                        params={{ slug: p.slug }}
                        onClick={() => setMegaOpen(false)}
                        className="group"
                      >
                        <div className="relative aspect-[4/5] overflow-hidden bg-secondary/40">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-80" />
                          <div className="absolute inset-x-0 bottom-0 p-3">
                            <p className="font-display text-base text-foreground">{p.name}</p>
                            <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                              ${p.price}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
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
                  placeholder="Search the ritual…"
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
                    No matches for “{query}”
                  </p>
                ) : (
                  searchResults.map((p) => (
                    <Link
                      key={p.slug}
                      to="/product/$slug"
                      params={{ slug: p.slug }}
                      onClick={() => {
                        setSearchOpen(false);
                        setQuery("");
                      }}
                      className="flex items-center gap-4 rounded-sm px-3 py-3 transition-colors hover:bg-gold/10"
                    >
                      <img
                        src={p.image}
                        alt=""
                        className="h-14 w-14 object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-lg">{p.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{p.tagline}</p>
                      </div>
                      <span className="text-sm text-gold">${p.price}</span>
                    </Link>
                  ))
                )}
              </div>
              <div className="flex items-center justify-between border-t border-border/50 px-5 py-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span>⌘K to search</span>
                <Link
                  to="/shop"
                  onClick={() => setSearchOpen(false)}
                  className="hover:text-gold"
                >
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
              <Link to="/" onClick={closeOverlays} className="font-script text-3xl text-gold">
                Mimi Beauty.
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
                  key={item.to}
                  variants={{
                    hidden: { opacity: 0, y: 36 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
                  }}
                >
                  <Link
                    to={item.to}
                    onClick={closeOverlays}
                    className="block font-display text-4xl tracking-tight text-foreground/90 transition-colors hover:text-gold sm:text-5xl"
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
                  to="/shop"
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
                to="/collections"
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
            Your wishlist awaits its first ritual.
          </p>
        ) : (
          list.map((p) => (
            <div
              key={p.slug}
              className="flex items-center gap-3 border-b border-border/40 px-4 py-3"
            >
              <Link
                to="/product/$slug"
                params={{ slug: p.slug }}
                onClick={onClose}
                className="flex min-w-0 flex-1 items-center gap-3"
              >
                <img src={p.image} alt="" className="h-12 w-12 object-cover" />
                <div className="min-w-0">
                  <p className="truncate font-display text-base">{p.name}</p>
                  <p className="text-xs text-gold">${p.price}</p>
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
            to="/shop"
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
