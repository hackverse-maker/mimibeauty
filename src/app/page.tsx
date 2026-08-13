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
import { assets, products } from "@/lib/products";
import { ProductCard } from "@/components/site/product-card";
import { Hero } from "@/components/site/hero";
import { IngredientsSection } from "@/components/site/ingredients-section";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <BestSellers />

      <WhyChoose />
      <Compare />
      <Testimonials />
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
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Best Sellers</p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance">
              Loved into permanence.
            </h2>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm hover:text-gold">
            Shop all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-12 md:grid-cols-2 lg:grid-cols-4 md:gap-x-6 md:gap-y-14">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
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
        <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
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

const testimonials = [
  {
    name: "Amelia R.",
    city: "New York",
    quote:
      "The Dew serum genuinely changed my skin. Two weeks in, my barrier feels rebuilt. It's the first product I've re-ordered twice.",
  },
  {
    name: "Sofia L.",
    city: "Milan",
    quote:
      "Hálo is the most beautiful body oil I've ever owned. The fragrance is subtle and the shine is unreal.",
  },
  {
    name: "Yuki T.",
    city: "Tokyo",
    quote:
      "Every detail feels intentional. The packaging, the care, the results. Rhode meets Aesop.",
  },
  {
    name: "Chloé D.",
    city: "Paris",
    quote:
      "Herbé transformed my scalp. My hair grows faster and shinier. This brand is quietly extraordinary.",
  },
];

function Testimonials() {
  return (
    <section className="border-y border-border/60 bg-secondary/40 py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionHeader eyebrow="Loved worldwide" title="Words from our community." />
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="glass rounded-2xl p-7"
            >
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-gold" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">"{t.quote}"</p>
              <footer className="mt-6">
                <p className="font-display text-lg">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.city}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
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
