"use client";
import Link from "next/link";


import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight, Leaf, ShieldCheck, Sparkles, Truck, Rabbit, Recycle,
  Star, Heart,
} from "lucide-react";
import { assets, collections, products } from "@/lib/products";
import { ProductCard } from "@/components/site/product-card";
import { Hero } from "@/components/site/hero";
import { IngredientsSection } from "@/components/site/ingredients-section";
import { NewsletterSection } from "@/components/site/newsletter-section";



export default function Home() {
  return (
    <>
      <Hero />
      <BestSellers />

      <WhyChoose />
      <IngredientsSection />
      <Compare />
      <Testimonials />
      <NewsletterSection />
    </>
  );
}

function BottomFeatureBar() {
  const features = [
    { title: "Purposeful Ingredients", desc: "Naturally sourced. Honestly chosen.", icon: Leaf },
    { title: "Visible Results", desc: "Real change you can see and feel.", icon: Sparkles },
    { title: "Made for You", desc: "Formulated for all, with care.", icon: Heart },
    { title: "Trusted by Many", desc: "Loved by thousands of real customers.", icon: Star },
  ];

  return (
    <div className="border-t border-gold/30 bg-[#1A271D] py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center md:items-start md:text-left">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold mb-5">
                <f.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h4 className="font-display text-[18px] text-[#F5F2EC]">{f.title}</h4>
              <p className="mt-2 text-[15px] leading-relaxed text-[#D8D2C8] opacity-80">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, kicker }: { eyebrow: string; title: string; kicker?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
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
      {kicker && (
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{kicker}</p>
      )}
    </div>
  );
}



function BestSellers() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="w-full max-w-[1000px]">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">
              CUSTOMER FAVORITES
            </p>
            <h2
              className="mt-5 font-medium leading-[1.08] text-[#F6F2EB]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {/* Line 1 — Skincare that */}
              <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-[96px] tracking-tight">
                Skincare <span className="italic text-[#F6F2EB]/60">that</span>
              </span>
              {/* Line 2 — gold italic, stays with you. */}
              <em className="not-italic block text-4xl sm:text-5xl md:text-7xl lg:text-[80px] text-gold tracking-tight italic">
                stays with you.
              </em>
            </h2>
            <p className="mt-5 text-[15px] md:text-[16px] font-medium text-white/90">
              Thoughtfully formulated to work with your skin, not against it. Results you can feel. Confidence that lasts.
            </p>
          </div>
          <div className="shrink-0 mb-1">
            <Link href="/shop" className="inline-flex items-center gap-2 text-[12px] font-medium tracking-wide text-gold hover:text-gold-soft transition-colors group">
              View all products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
        
        <div className="mt-16 md:mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FloralDecoration({ index }: { index: number }) {
  const svgs = [
    // Type 1: Elegant fern
    <svg viewBox="0 0 60 100" fill="none" stroke="currentColor" strokeWidth="1" className="h-full w-full">
      <path d="M10 100 Q 30 50 50 10" />
      <path d="M20 75 Q 40 70 50 50 Q 35 60 20 75" />
      <path d="M30 45 Q 50 40 55 20 Q 40 30 30 45" />
      <path d="M38 20 Q 55 15 60 0 Q 45 10 38 20" />
    </svg>,
    // Type 2: Eucalyptus leaves
    <svg viewBox="0 0 60 100" fill="none" stroke="currentColor" strokeWidth="1" className="h-full w-full">
      <path d="M20 100 Q 25 50 40 10" />
      <path d="M22 70 C 40 70 45 50 30 45 C 15 45 15 65 22 70" />
      <path d="M30 35 C 50 35 55 15 40 10 C 25 10 25 30 30 35" />
      <path d="M25 90 C 10 90 5 70 15 65 C 25 65 30 85 25 90" />
    </svg>,
    // Type 3: Minimalist stem with buds
    <svg viewBox="0 0 60 100" fill="none" stroke="currentColor" strokeWidth="1" className="h-full w-full">
      <path d="M10 100 Q 40 60 35 10" />
      <circle cx="33" cy="70" r="3" />
      <circle cx="38" cy="40" r="2.5" />
      <circle cx="30" cy="20" r="2" />
      <path d="M25 80 L 31 72" />
      <path d="M33 50 L 37 42" />
      <path d="M34 28 L 30 22" />
    </svg>,
    // Type 4: Lotus motif
    <svg viewBox="0 0 60 100" fill="none" stroke="currentColor" strokeWidth="1" className="h-full w-full">
      <path d="M40 100 L 40 60" />
      <path d="M40 60 C 15 60 25 20 40 30 C 55 20 65 60 40 60" />
      <path d="M40 75 Q 55 65 65 80 Q 50 85 40 75" />
      <path d="M40 75 Q 25 65 15 80 Q 30 85 40 75" />
    </svg>,
    // Type 5: Delicate twin leaves
    <svg viewBox="0 0 60 100" fill="none" stroke="currentColor" strokeWidth="1" className="h-full w-full">
      <path d="M15 100 Q 30 50 50 15" />
      <path d="M22 65 Q 45 60 55 40 Q 35 50 22 65" />
      <path d="M32 35 Q 15 30 10 10 Q 25 20 32 35" />
    </svg>,
    // Type 6: Dense branching
    <svg viewBox="0 0 60 100" fill="none" stroke="currentColor" strokeWidth="1" className="h-full w-full">
      <path d="M15 100 Q 45 60 30 10" />
      <path d="M25 80 Q 50 70 55 50 Q 35 65 25 80" />
      <path d="M32 50 Q 50 40 55 25 Q 40 35 32 50" />
      <path d="M20 70 Q 5 60 0 45 Q 15 55 20 70" />
      <path d="M25 40 Q 10 30 5 15 Q 20 25 25 40" />
    </svg>,
  ];
  return svgs[index % svgs.length];
}

const whyItems = [
  { icon: ShieldCheck, title: "Dermatologically Tested", body: "Every formula evaluated for skin compatibility." },
  { icon: Rabbit, title: "Cruelty Free", body: "Never tested on animals.\nAlways made with compassion." },
  { icon: Leaf, title: "Botanical Actives", body: "Powered by concentrated plant-derived ingredients." },
  { icon: Sparkles, title: "Purposefully Formulated", body: "Every ingredient selected with a clear purpose." },
  { icon: Recycle, title: "Non-Comedogenic", body: "Won’t clog pores or leave skin congested." },
  { icon: Truck, title: "Fast Absorbing", body: "Lightweight dry oils that absorb in seconds." },
];

function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-[#0A100C] py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold"
          >
            WHY MIMIBEAUTY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.1] tracking-tight text-[#F5F2EC]"
            style={{ fontFamily: "var(--font-cormorant, serif)" }}
          >
            Skincare that's honest,<br className="hidden md:block" />
            <em className="italic text-gold">effective, and made for you.</em>
          </motion.h2>
          
          <div className="flex items-center justify-center gap-4 my-10">
             <svg width="40" height="12" viewBox="0 0 40 12" fill="none" className="text-gold">
               <path d="M10 6H30" stroke="currentColor" strokeWidth="0.5"/>
               <path d="M20 6C20 4 22 2 24 2C24 4 22 6 20 6Z" fill="currentColor"/>
               <path d="M20 6C20 8 18 10 16 10C16 8 18 6 20 6Z" fill="currentColor"/>
               <path d="M20 6C20 4 18 2 16 2C16 4 18 6 20 6Z" fill="currentColor"/>
               <path d="M20 6C20 8 22 10 24 10C24 8 22 6 20 6Z" fill="currentColor"/>
             </svg>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto max-w-2xl text-[18px] md:text-[24px] leading-relaxed text-[#D8D2C8] opacity-90"
          >
            We make clean, high-performance skincare with<br className="hidden md:block" />
            real ingredients and real purpose.
          </motion.p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyItems.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative flex h-full min-h-[240px] flex-col overflow-hidden rounded-2xl border border-gold/20 bg-[#121A15] p-6 sm:p-8 md:p-10 transition-colors hover:border-gold/50"
            >
              <div className="absolute bottom-0 right-0 h-40 w-24 opacity-20 transition-opacity duration-500 group-hover:opacity-40 pointer-events-none text-gold">
                <FloralDecoration index={i} />
              </div>
              
              <div className="grid h-12 w-12 place-items-center rounded-full border border-gold/30 text-gold mb-8 relative z-10 transition-colors duration-300 group-hover:border-gold">
                <it.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl text-[#F5F2EC] relative z-10" style={{ fontFamily: "var(--font-cormorant, serif)" }}>
                {it.title}
              </h3>
              <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-[#D8D2C8] opacity-80 relative z-10 pr-12">
                {it.body.split('\n').map((line, idx) => (
                  <span key={idx}>
                    {line}
                    {idx !== it.body.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
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
      onPointerDown={(e) => { draggingRef.current = true; onMove(e); }}
      onPointerMove={onMove}
      onPointerUp={() => (draggingRef.current = false)}
      onPointerLeave={() => (draggingRef.current = false)}
      className="relative mt-16 aspect-[16/9] w-full select-none overflow-hidden rounded-3xl border border-border touch-none"
    >
      <img src="/after.png" alt="After" className="absolute inset-0 h-full w-full object-cover" />
      <div ref={beforeRef} className="absolute inset-0" style={{ clipPath: "inset(0 50% 0 0)" }}>
        <img src="/before.png" alt="Before" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div ref={dividerRef} className="absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-gold">
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-gold bg-background/90 cursor-ew-resize">
          <span className="text-gold">◀ ▶</span>
        </div>
      </div>
      <div className="pointer-events-none absolute left-6 top-6 rounded-full bg-background/85 px-3 py-1 text-[11px] uppercase tracking-[0.3em]">Before</div>
      <div className="pointer-events-none absolute right-6 top-6 rounded-full bg-gold/90 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-background">After · 28 days</div>
    </motion.div>
  );
}

const testimonials = [
  { name: "Amelia R.", city: "New York", quote: "The Dew serum genuinely changed my skin. Two weeks in, my barrier feels rebuilt. It's the first product I've re-ordered twice." },
  { name: "Sofia L.", city: "Milan", quote: "Hálo is the most beautiful body oil I've ever owned. The fragrance is subtle and the shine is unreal." },
  { name: "Yuki T.", city: "Tokyo", quote: "Every detail feels intentional. The packaging, the collection, the results. Rhode meets Aesop." },
  { name: "Chloé D.", city: "Paris", quote: "Herbé transformed my scalp. My hair grows faster and shinier. This brand is quietly extraordinary." },
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
              className="glass rounded-2xl p-5 sm:p-7"
            >
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3.5 w-3.5 fill-gold" />)}
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



const posts = [
  { title: "The barrier repair diary", excerpt: "How ceramides rebuild the moisture barrier in 28 days.", tag: "Journal" },
  { title: "On slow beauty", excerpt: "Why the collection matters as much as the formula.", tag: "Philosophy" },
  { title: "A guide to layering", excerpt: "The right order for serums, oils, and moisturisers.", tag: "How-to" },
];

function Blog() {
  return (
    <section className="border-y border-border/60 bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[11px] uppercase tracking-[0.5em] text-gold"
          >
            — The Journal —
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-script text-[clamp(4rem,10vw,8rem)] leading-[0.9] text-gold"
          >
            Read, slowly.
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="mx-auto mt-6 h-px w-32 origin-left bg-gold/60"
          />
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              className="group flex flex-col"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-none bg-secondary/20">
                <img 
                  src={[
                    "https://images.unsplash.com/photo-1611078449921-2a134a413d42?auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80"
                  ][i]} 
                  alt="" 
                  className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-105" 
                  loading="lazy" 
                />
              </div>
              <div className="pt-6">
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{p.tag}</p>
                <h3 className="mt-3 font-display text-2xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm">
                  Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}


