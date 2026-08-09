"use client";
import Link from "next/link";
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
      className="group relative rounded-[24px] border border-transparent transition-all duration-[500ms] ease-out hover:-translate-y-2 hover:border-gold/40 hover:bg-white/5 hover:shadow-[0_0_50px_rgba(201,168,106,0.15)]"
    >
      <Link href={`/product/${product.slug}`} className="block p-4">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#F3EBDC]">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.05]"
            loading="lazy"
          />

          {/* Discount badge */}
          {hasDiscount && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-[#1A271D] px-3 py-1.5 text-[10px] font-medium tracking-wide text-white">
              -{discountPct}%
            </span>
          )}

          {/* Hover/Touch action buttons - Always visible on mobile, hover on desktop */}
          <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-100 lg:opacity-0 transition-opacity duration-300 lg:group-hover:opacity-100">
            {/* Wishlist button */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleToggleWishlist}
              className={`flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full backdrop-blur-md transition-colors duration-200 ${
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
              className={`flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 ${
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
        <div className="mt-6 flex flex-col gap-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/80">
            {product.category}
          </p>
          <h3
            className="mt-1 font-display text-[34px] leading-none text-[#F5F2EC]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {product.name}
          </h3>
          <p className="mt-1 text-[17px] text-[#A3A3A3]">{product.tagline}</p>

          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
            <div className="flex items-center gap-2.5">
              {hasDiscount && (
                <span className="text-[14px] text-gray-500 line-through">
                  Rs. {product.originalPrice}
                </span>
              )}
              <span className="text-[16px] font-semibold text-gold">Rs. {product.price}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[14px] text-white">
              <Star className="h-4 w-4 fill-gold text-gold" strokeWidth={0} />{" "}
              {product.rating?.toFixed(1) || "5.0"}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
