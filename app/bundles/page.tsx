"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { bundles } from "@/lib/bundles";
import { products, findProduct, type Product } from "@/lib/products";

export default function BundlesPage() {
  return (
    <>
      <style>{`
        .bundles-hero-bg {
          background: linear-gradient(135deg, rgba(10,22,15,0.95) 0%, rgba(15,31,23,0.88) 50%, rgba(12,25,18,0.92) 100%);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bundles-hero-bg">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.3em] text-gold mb-3"
          >
            Mimi Sets
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-foreground mb-4"
          >
            Curated combinations for your skin, hair, and body.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground mb-6"
          >
            Thoughtfully paired. Effortlessly essential.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="#bundles"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-background hover:bg-gold/90 transition-colors"
            >
              Shop Bundles <ArrowRight className="h-3 w-3" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Our Bundles Section */}
      <section id="bundles" className="py-12 md:py-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-4">Our Bundles</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl leading-[1.1] text-foreground mb-4">
              Care, simplified. Results, amplified.
            </h2>
            <div className="w-24 h-px bg-gold/30 mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bundles.filter(b => b.id !== 'make-your-own-bundle').map((bundle, index) => {
              const bundleProducts = bundle.productIds
                .map(id => findProduct(id))
                .filter((p): p is Product => p !== undefined);

              return (
                <motion.div
                  key={bundle.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/bundles/${bundle.slug}`} className="block">
                    <div className="relative overflow-hidden rounded-xl bg-secondary/30 border border-border/50">
                      {/* Bundle Image */}
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={bundle.image}
                          alt={bundle.name}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* Discount Badge */}
                      {bundle.discountPercent > 0 && (
                        <div className="absolute top-2 right-2 bg-gold text-background px-2 py-1 text-[10px] font-medium uppercase tracking-wider">
                          {bundle.discountPercent}% OFF
                        </div>
                      )}

                      {/* Flagship Badge */}
                      {bundle.isFlagship && (
                        <div className="absolute top-2 left-2 bg-foreground text-background px-2 py-1 text-[10px] font-medium uppercase tracking-wider">
                          Flagship
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-display text-lg text-foreground mb-1">{bundle.name}</h3>
                        <p className="text-xs text-muted-foreground mb-3">{bundle.description}</p>
                        
                        {/* Products */}
                        <div className="mb-3">
                          <p className="text-[10px] text-gold uppercase tracking-wider mb-1">Includes</p>
                          <p className="text-xs text-foreground/80">
                            {bundleProducts.map(p => p.name).join(" + ")}
                          </p>
                        </div>

                        {/* Pricing */}
                        <div className="flex items-baseline gap-2 mb-3">
                          <p className="text-lg font-display text-foreground">
                            PKR {bundle.finalPrice.toLocaleString()}
                          </p>
                          {bundle.originalPrice > bundle.finalPrice && (
                            <>
                              <p className="text-xs text-muted-foreground line-through">
                                PKR {bundle.originalPrice.toLocaleString()}
                              </p>
                              <p className="text-xs text-gold">
                                Save PKR {bundle.savings.toLocaleString()}
                              </p>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-gold text-xs font-medium uppercase tracking-wider">
                          View Bundle <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Made for You Section */}
      <section className="py-12 md:py-16 px-6 bg-secondary/20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-3">Made for You</p>
              <h2 className="font-display text-2xl md:text-3xl leading-[1.1] text-foreground mb-3">
                Can't find the perfect set?
              </h2>
              <p className="text-base text-muted-foreground mb-5">
                Create your own bundle and get 10% off.
              </p>
              <Link
                href="/bundles/make-your-own-bundle"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-background hover:bg-gold/90 transition-colors"
              >
                Build Your Set <ArrowRight className="h-3 w-3" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square max-w-sm mx-auto relative">
                <div className="absolute inset-0 bg-gold/10 rounded-full blur-3xl" />
                <img
                  src="/media__1784439730149.png"
                  alt="Build your own bundle"
                  className="relative w-full h-full object-contain rounded-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
