import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Star, Check } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();
  const { toggle, has } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);
  const wishlisted = has(product.slug);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.slug);
  };

  const hasDiscount = product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
      className="group relative"
    >
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />

          {/* Discount badge */}
          {hasDiscount && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-[oklch(0.45_0.18_15)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-lg">
              -{discountPct}%
            </span>
          )}

          {/* Hover/Touch action buttons - Always visible on mobile, hover on desktop */}
          <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-100 lg:opacity-0 transition-opacity duration-300 lg:group-hover:opacity-100">
            {/* Wishlist button */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleToggleWishlist}
              className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-colors duration-200 ${
                wishlisted
                  ? "bg-[oklch(0.55_0.22_15)] text-white shadow-lg shadow-[oklch(0.55_0.22_15/0.3)]"
                  : "bg-white/70 text-neutral-700 hover:bg-white hover:text-[oklch(0.55_0.22_15)]"
              }`}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`} />
            </motion.button>

            {/* Add to cart button */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleAddToCart}
              className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 ${
                justAdded
                  ? "bg-[oklch(0.55_0.16_145)] text-white shadow-lg shadow-[oklch(0.55_0.16_145/0.3)]"
                  : "bg-white/70 text-neutral-700 hover:bg-white hover:text-gold"
              }`}
              aria-label="Add to cart"
            >
              <AnimatePresence mode="wait">
                {justAdded ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="bag"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{product.category}</p>
            <h3 className="mt-1 truncate font-display text-xl">{product.name}</h3>
            <p className="mt-1 truncate text-xs text-muted-foreground">{product.tagline}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5">
              {hasDiscount && (
                <p className="text-xs text-muted-foreground line-through">${product.originalPrice}</p>
              )}
              <p className={`text-sm font-medium ${hasDiscount ? "text-[oklch(0.55_0.18_15)]" : ""}`}>
                ${product.price}
              </p>
            </div>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
              <Star className="h-3 w-3 fill-gold text-gold" /> {product.rating}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
