import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { useWishlist } from "@/lib/wishlist";
import { assets } from "@/lib/products";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Product" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();
  const { user, setIsOpen: setAuthOpen } = useAuth();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div className="relative z-50 overflow-hidden border-b border-border/60 bg-foreground text-background">
        <div className="flex animate-marquee whitespace-nowrap py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em]">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 gap-8 sm:gap-16 px-4 sm:px-8">
              <span className="hidden sm:inline">Complimentary shipping over $75</span>
              <span className="sm:hidden">Free shipping over $75</span>
              <span>·</span>
              <span>Dermatologist tested</span>
              <span>·</span>
              <span>Cruelty free & vegan</span>
              <span>·</span>
              <span className="hidden sm:inline">New: Hálo body oil</span>
              <span className="sm:hidden">New: Hálo</span>
              <span>·</span>
            </div>
          ))}
        </div>
      </div>

      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "var(--background)" : "transparent",
          borderColor: scrolled ? "var(--border)" : "transparent",
        }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-40 border-b backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-6 py-3 sm:py-4 md:py-5">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-start lg:hidden text-foreground/80 hover:text-foreground"
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Centered Logo on Mobile, Left on Desktop */}
          <Link to="/" className="flex items-center justify-center gap-2 sm:gap-3 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <img src="/logo.png" alt="Mimi Beauty." className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full object-cover shadow-sm" />
            <span className="font-script text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-none text-gold">
              Mimi Beauty.
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden justify-center gap-6 sm:gap-8 text-sm lg:flex flex-1 ml-8 sm:ml-12">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="group relative py-1 text-foreground/80 transition hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {n.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 justify-end">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden h-10 w-10 place-items-center rounded-full text-foreground/70 hover:text-foreground md:grid" 
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            <button 
              onClick={() => user ? window.location.href = '/wishlist' : setAuthOpen(true)}
              className="relative hidden h-10 w-10 place-items-center rounded-full text-foreground/70 hover:text-foreground md:grid" 
              aria-label="Wishlist"
            >
              <Heart className="h-4 w-4" />
              {wishlistCount > 0 && (
                <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-semibold text-background">
                  {wishlistCount}
                </span>
              )}
            </button>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <button
              onClick={() => setCartOpen(true)}
              className="relative grid h-10 w-10 place-items-center rounded-full text-foreground/80 hover:text-foreground"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-semibold text-background">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between px-6 py-4 md:py-5">
              <div className="w-10" />
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <span className="font-script text-3xl leading-none text-gold md:text-4xl">Mimi Beauty.</span>
              </Link>
              <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-end text-foreground/70 hover:text-foreground">
                <X className="h-7 w-7" />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="flex flex-col items-center justify-center gap-8 h-[60vh]"
            >
              {nav.map((n) => (
                <motion.div
                  key={n.to}
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                >
                  <Link
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="block font-display text-4xl tracking-tight text-foreground/90 hover:text-gold active:scale-95 transition-all"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="absolute bottom-12 left-0 right-0 flex justify-center gap-8"
            >
              <Link to="/shop" onClick={() => setOpen(false)} className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-gold transition-colors">Shop</Link>
              <Link to="/about" onClick={() => setOpen(false)} className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-gold transition-colors">Story</Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-gold transition-colors">Contact</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] bg-background/95 backdrop-blur-2xl"
            onClick={() => setSearchOpen(false)}
          >
            <div className="mx-auto max-w-2xl px-6 pt-32" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-transparent border-b-2 border-border pb-4 text-3xl font-display outline-none focus:border-gold transition-colors"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setSearchOpen(false);
                  if (e.key === 'Enter') {
                    window.location.href = `/shop?q=${encodeURIComponent(e.currentTarget.value)}`;
                    setSearchOpen(false);
                  }
                }}
              />
              <p className="mt-4 text-sm text-muted-foreground">Press Enter to search or Escape to close</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
