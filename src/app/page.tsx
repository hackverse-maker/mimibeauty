"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Sparkles,
  Truck,
  Rabbit,
  Recycle,
  Star,
} from "lucide-react";
import { assets, products, findProduct, type Product } from "@/lib/products";
import { bundles } from "@/lib/bundles";
import { useCart } from "@/lib/cart";
import { ShoppingBag } from "lucide-react";
import { ProductCard } from "@/components/site/product-card";
import { Hero } from "@/components/site/hero";
import { IngredientsSection } from "@/components/site/ingredients-section";
import { TestimonialsCarousel } from "@/components/site/testimonials-carousel";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <BestSellers />
      <WhyChoose />
      <Compare />
      <TestimonialsCarousel />
      <QuizPreview />
      <Newsletter />
    </>
  );
}

function SectionHeader({
  eyebrow,
  title,
  kicker,
}: {
  eyebrow: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[11px] uppercase tracking-[0.4em] text-gold"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight text-balance"
      >
        {title}
      </motion.h2>
      {kicker && <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{kicker}</p>}
    </div>
  );
}

function BestSellers() {
  const { addBundle } = useCart();

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">MIMI SETS & BUNDLES</p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance">
              Luxury sets that stay with you.
            </h2>
          </div>
          <Link href="/bundles" className="inline-flex items-center gap-2 text-sm hover:text-gold">
            View all bundles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bundles.filter(b => b.id !== 'make-your-own-bundle').slice(0, 4).map((bundle, index) => {
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
                className="group flex flex-col h-full"
              >
                <div className="relative flex flex-col justify-between h-full overflow-hidden rounded-xl bg-secondary/30 border border-border/50 transition-all duration-300 hover:border-gold/50">
                  <div>
                    <Link href={`/bundles/${bundle.slug}`} className="block">
                      {/* Bundle Image */}
                      <div className="aspect-[4/3] overflow-hidden bg-secondary/50 relative">
                        <img
                          src={bundle.image}
                          alt={bundle.name}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Discount Badge */}
                        {bundle.discountPercent > 0 && (
                          <div className="absolute top-2 right-2 bg-gold text-background px-2 py-1 text-[10px] font-medium uppercase tracking-wider rounded-sm">
                            {bundle.discountPercent}% OFF
                          </div>
                        )}

                        {/* Flagship Badge */}
                        {bundle.isFlagship && (
                          <div className="absolute top-2 left-2 bg-foreground text-background px-2 py-1 text-[10px] font-medium uppercase tracking-wider rounded-sm">
                            Flagship
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-3 flex-1">
                      <Link href={`/bundles/${bundle.slug}`} className="block group-hover:text-gold transition-colors">
                        <h3 className="font-display text-base text-foreground mb-1">{bundle.name}</h3>
                      </Link>
                      <p className="text-[11px] text-muted-foreground mb-2 line-clamp-1">{bundle.description}</p>
                      
                      {/* Products */}
                      <div className="mb-3 bg-background/40 p-2 rounded-lg border border-border/30">
                        <p className="text-[9px] text-gold uppercase tracking-wider mb-0.5 font-semibold">Includes ({bundleProducts.length})</p>
                        <p className="text-[11px] text-foreground/90 font-medium truncate">
                          {bundleProducts.map(p => p.name).join(" + ")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Actions */}
                  <div className="p-3 pt-0 border-t border-border/20 mt-auto">
                    <div className="flex items-baseline justify-between gap-2 mb-3 pt-2">
                      <div>
                        <p className="text-lg font-display text-foreground font-semibold">
                          PKR {bundle.finalPrice.toLocaleString()}
                        </p>
                        {bundle.originalPrice > bundle.finalPrice && (
                          <p className="text-[11px] text-muted-foreground line-through">
                            PKR {bundle.originalPrice.toLocaleString()}
                          </p>
                        )}
                      </div>
                      {bundle.savings > 0 && (
                        <span className="text-[10px] text-gold font-medium bg-gold/10 px-1.5 py-0.5 rounded">
                          Save PKR {bundle.savings.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => addBundle(bundle, bundleProducts)}
                        className="flex items-center justify-center gap-1.5 rounded-full bg-gold py-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-background hover:bg-gold/90 transition-all shadow-sm active:scale-95 min-h-[40px]"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Add to Cart
                      </button>
                      <Link
                        href={`/bundles/${bundle.slug}`}
                        className="flex items-center justify-center gap-1 rounded-full border border-border bg-secondary/40 px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-foreground hover:border-gold/60 hover:text-gold transition-colors text-center min-h-[40px]"
                      >
                        Details <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const whyItems = [
  {
    icon: ShieldCheck,
    title: "Dermatologically Tested",
    body: "Every formula evaluated for skin compatibility.",
  },
  {
    icon: Rabbit,
    title: "Cruelty Free",
    body: "Never tested on animals. Always made with compassion.",
  },
  {
    icon: Leaf,
    title: "Botanical Actives",
    body: "Powered by concentrated plant-derived ingredients.",
  },
  {
    icon: Sparkles,
    title: "Purposefully Formulated",
    body: "Every ingredient selected with a clear purpose.",
  },
  {
    icon: Recycle,
    title: "Non-Comedogenic",
    body: "Won't clog pores or leave skin congested.",
  },
  {
    icon: Truck,
    title: "Fast Absorbing",
    body: "Lightweight dry oils that absorb in seconds.",
  },
];

function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.97_0.01_95)] py-16 md:py-24 dark:bg-background/50">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionHeader eyebrow="Why MIMIbeauty" title="Six promises, kept quietly." />
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyItems.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative rounded-2xl border border-border bg-background/60 p-5 backdrop-blur transition hover:border-gold/60 hover:shadow-[0_20px_60px_-25px_rgba(0,0,0,0.35)] md:p-8"
            >
              <div className="grid h-11 w-11 place-items-center rounded-full border border-border transition group-hover:border-gold group-hover:text-gold">
                <it.icon className="h-4 w-4" />
              </div>
              <h3 className="mt-6 font-display text-2xl">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Compare() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 md:py-24">
      <SectionHeader eyebrow="Proof, not promises" title="Before · After · Always." />
      <BeforeAfter />
    </section>
  );
}

function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const setPct = (pct: number) => {
    const clamped = Math.max(4, Math.min(96, pct));
    if (dividerRef.current) dividerRef.current.style.left = `${clamped}%`;
    if (beforeRef.current) beforeRef.current.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
  };

  const onMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPct(((e.clientX - rect.left) / rect.width) * 100);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      onPointerDown={(e) => {
        draggingRef.current = true;
        onMove(e);
      }}
      onPointerMove={onMove}
      onPointerUp={() => (draggingRef.current = false)}
      onPointerLeave={() => (draggingRef.current = false)}
      className="relative mt-16 aspect-[16/9] w-full select-none overflow-hidden rounded-3xl border border-border touch-none"
    >
      <img src="/after.png" alt="After" className="absolute inset-0 h-full w-full object-cover" />
      <div ref={beforeRef} className="absolute inset-0" style={{ clipPath: "inset(0 50% 0 0)" }}>
        <img
          src="/before.png"
          alt="Before"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div
        ref={dividerRef}
        className="absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-gold"
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-gold bg-background/90 cursor-ew-resize">
          <span className="text-gold">◀ ▶</span>
        </div>
      </div>
      <div className="pointer-events-none absolute left-6 top-6 rounded-full bg-background/85 px-3 py-1 text-[11px] uppercase tracking-[0.3em]">
        Before
      </div>
      <div className="pointer-events-none absolute right-6 top-6 rounded-full bg-gold/90 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-background">
        After · 28 days
      </div>
    </motion.div>
  );
}


function QuizPreview() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 md:py-24">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-secondary via-background to-secondary p-6 md:p-10 lg:p-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/15" />
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">
              Skin Quiz · 60 seconds
            </p>
            <h2 className="mt-4 font-display text-3xl md:text-5xl lg:text-6xl leading-tight text-balance">
              Your routine, <em className="text-gold">designed for you</em>.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Four gentle questions. A personalised routine built by dermatologists, delivered
              instantly.
            </p>
            <Link
              href="/quiz"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm text-background hover:bg-gold"
            >
              Begin the quiz <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {["Skin type", "Concerns", "Sensitivity", "Routine time"].map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="flex items-center gap-4 rounded-xl border border-border bg-background/80 p-4"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-background text-sm font-medium">
                  {i + 1}
                </span>
                <span className="font-medium">{step}</span>
                <div className="ml-auto h-1 w-24 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-gold" style={{ width: `${25 * (i + 1)}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
      <div className="relative overflow-hidden rounded-3xl bg-secondary/50 p-6 text-foreground md:p-10 lg:p-20">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold/15" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-gold/10" />
        <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">The Letter</p>
            <h2 className="mt-4 font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance">
              Slow drops, quiet news.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Occasional letters on skincare, ingredients, and new arrivals. Never noise.
            </p>
          </div>
          <form className="flex flex-col gap-3 md:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full flex-1 rounded-full border border-border bg-background/50 px-6 py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold"
            />
            <button className="rounded-full bg-gold px-8 py-4 text-sm font-medium text-background transition hover:bg-gold-soft">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
