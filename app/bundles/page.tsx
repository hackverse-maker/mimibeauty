"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { bundles } from "@/lib/bundles";
import { findProduct, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export default function BundlesPage() {
  const { addBundle } = useCart();

  return (
    <div className="min-h-screen bg-background text-foreground py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1360px] mx-auto space-y-12 sm:space-y-16 lg:space-y-20">
        
        {/* 1. HERO SECTION — Horizontal Side-by-Side Composition */}
        <section className="bg-card border border-border/40 rounded-2xl lg:rounded-3xl p-6 sm:p-10 lg:p-14 relative overflow-hidden">
          {/* Ambient Lighting Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center relative z-10">
            {/* Left Side — Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-left"
            >
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-cormorant, serif)" }}
              >
                Mimi Sets
              </h1>

              <div className="space-y-3 max-w-lg">
                <p className="text-lg sm:text-xl text-foreground/90 font-light leading-relaxed">
                  Curated combinations for your skin, hair, and body.
                </p>
                <div className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed space-y-0.5">
                  <p>Thoughtfully paired. Effortlessly essential.</p>
                  <p>Everything you need, in harmony.</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="#bundles"
                  className="inline-flex items-center justify-center border border-gold/50 text-foreground hover:bg-gold hover:text-background transition-all duration-300 text-xs font-semibold uppercase tracking-[0.25em] px-8 py-3.5 rounded-sm min-h-[44px]"
                >
                  SHOP SETS
                </Link>
              </div>
            </motion.div>

            {/* Right Side — Lifestyle/Product Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="w-full flex items-center justify-center"
            >
              <div className="relative w-full h-[300px] sm:h-[380px] lg:h-[420px] flex items-center justify-center p-2">
                <img
                  src="/media__1784439730149.png"
                  alt="Mimi Sets Collection"
                  className="w-full h-full object-contain filter drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. OUR BUNDLES SECTION — Centered Header & 4-Column Desktop Grid */}
        <section id="bundles" className="space-y-10 sm:space-y-12">
          {/* Centered Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground tracking-tight"
              style={{ fontFamily: "var(--font-cormorant, serif)" }}
            >
              Our Bundles
            </h2>

            {/* Decorative Diamond Divider */}
            <div className="flex items-center justify-center gap-3 text-gold/60 my-3">
              <span className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
              <span className="text-xs sm:text-sm text-gold">✦</span>
              <span className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.25em] font-light">
              Care, simplified. Results, amplified.
            </p>
          </div>

          {/* Bundles Grid — 1 Col Mobile, 2 Col Tablet, 4 Col Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {bundles.filter((b) => b.id !== "make-your-own-bundle").map((bundle, index) => {
              const bundleProducts = bundle.productIds
                .map((id) => findProduct(id))
                .filter((p): p is Product => p !== undefined);

              return (
                <motion.div
                  key={bundle.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="group flex flex-col justify-between h-full bg-card border border-border/30 hover:border-gold/50 transition-all duration-300 p-5 sm:p-6 text-center rounded-xl relative"
                >
                  <div>
                    {/* Bundle Product Image Box */}
                    <Link
                      href={`/bundles/${bundle.slug}`}
                      className="block overflow-hidden mb-5 relative aspect-[4/3] bg-secondary/30 rounded-lg p-4 flex items-center justify-center"
                    >
                      <img
                        src={bundle.image}
                        alt={bundle.name}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                      {bundle.discountPercent > 0 && (
                        <div className="absolute top-2.5 right-2.5 bg-gold text-background px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm">
                          {bundle.discountPercent}% OFF
                        </div>
                      )}
                      {bundle.isFlagship && (
                        <div className="absolute top-2.5 left-2.5 bg-foreground text-background px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm">
                          Flagship
                        </div>
                      )}
                    </Link>

                    {/* Bundle Title */}
                    <Link href={`/bundles/${bundle.slug}`} className="block group-hover:text-gold transition-colors">
                      <h3
                        className="text-2xl sm:text-3xl text-foreground font-normal mb-2 leading-tight"
                        style={{ fontFamily: "var(--font-cormorant, serif)" }}
                      >
                        {bundle.name}
                      </h3>
                    </Link>

                    {/* Short Description */}
                    <p className="text-xs text-muted-foreground font-light line-clamp-2 min-h-[36px] mb-3 px-1">
                      {bundle.description}
                    </p>

                    {/* Included Items Summary */}
                    <div className="text-[11px] text-gold/90 mb-4 px-1 font-medium tracking-wide truncate">
                      {bundleProducts.map((p) => p.name).join(" + ")}
                    </div>
                  </div>

                  {/* Pricing & ADD TO BAG Button */}
                  <div className="pt-3 border-t border-border/20 mt-auto">
                    <p className="text-sm sm:text-base font-semibold text-foreground tracking-wide mb-4">
                      PKR {bundle.finalPrice.toLocaleString()}
                    </p>

                    <button
                      type="button"
                      onClick={() => addBundle(bundle, bundleProducts)}
                      className="w-full py-3 px-4 uppercase text-[11px] tracking-[0.2em] font-semibold border border-gold/50 text-foreground hover:bg-gold hover:text-background transition-all duration-300 text-center min-h-[44px] rounded-sm"
                    >
                      ADD TO BAG
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 3. MADE FOR YOU SECTION — 50% Left Image + 50% Right Text */}
        <section className="bg-card border border-border/40 rounded-2xl lg:rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px] lg:min-h-[460px]">
            
            {/* LEFT — 50% Banner Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-full h-[300px] sm:h-[360px] lg:h-full min-h-[300px] lg:min-h-[460px] bg-secondary/40"
            >
              <img
                src="/media__1784439898781.jpg"
                alt="Made for You Custom Mimi Gift Set"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* RIGHT — 50% Centered Text & Action */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col items-center justify-center text-center p-8 sm:p-12 lg:p-16 space-y-4 h-full"
            >
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground tracking-tight"
                style={{ fontFamily: "var(--font-cormorant, serif)" }}
              >
                Made for You
              </h2>

              {/* Decorative Diamond Divider */}
              <div className="flex items-center justify-center gap-3 text-gold/60 my-1">
                <span className="w-10 sm:w-14 h-px bg-gradient-to-r from-transparent to-gold/40" />
                <span className="text-xs text-gold">✦</span>
                <span className="w-10 sm:w-14 h-px bg-gradient-to-l from-transparent to-gold/40" />
              </div>

              <div className="space-y-1 text-muted-foreground font-light text-sm sm:text-base max-w-md">
                <p className="text-foreground/90 font-medium">Can’t find the perfect set?</p>
                <p>Create your own bundle and get <span className="text-gold font-medium">10% off</span>.</p>
              </div>

              <div className="pt-3">
                <Link
                  href="/bundles/make-your-own-bundle"
                  className="inline-flex items-center justify-center border border-gold/50 text-foreground hover:bg-gold hover:text-background transition-all duration-300 text-xs font-semibold uppercase tracking-[0.25em] px-8 py-3.5 rounded-sm min-h-[44px]"
                >
                  BUILD YOUR SET
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
}
