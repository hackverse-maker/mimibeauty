"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Leaf, Droplet } from "lucide-react";
import { products } from "@/lib/products";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ease = [0.22, 1, 0.36, 1] as const;

const WHO_WE_ARE = [
  "Mimi Beauty is a premium Pakistani skincare brand built on a simple belief that the best care works with your body, not against it.",
  "We thoughtfully formulate products using naturally derived ingredients that support healthy skin, hair, and body care without complexity. Every formula is intentionally designed to deliver effective results while respecting your body's natural balance.",
  "Our collection is centered around fast-absorbing dry oil formulations that nourish deeply without leaving a heavy or greasy feel. From face and hair to body care, each product is designed to fit seamlessly into your daily routine while delivering purposeful, long-term care.",
  "At Mimi Beauty, we believe luxury is found in thoughtful formulation, honest ingredients, and products that truly deserve a place in your routine. We don't believe in creating more. We believe in creating better.",
  "This is more than skincare. It is a commitment to helping you care for yourself with intention, confidence, and simplicity.",
  "Working in harmony with nature, helping your body restore, protect, and strengthen from within.",
];

const BRAND_PHILOSOPHY = [
  "Your skin and hair were never meant to depend on products forever. They were designed to protect, heal, and thrive naturally.",
  "Many conventional products deliver quick, visible results by treating the surface rather than the root cause. Over time, harsh ingredients can weaken the skin barrier, damage the hair cuticle, and leave your skin and hair relying on continuous use instead of becoming healthier.",
  "At Mimi Beauty, we believe skincare and haircare should support your body's natural ability to restore itself, not replace it.",
  "Every formula is thoughtfully crafted with naturally derived ingredients that promote long-term skin, hair, and body health. Rather than offering temporary results, our products work with your body to nourish, repair, and strengthen from within.",
  "You will never find long ingredient lists or complicated routines at Mimi Beauty. Every ingredient is chosen with intention because we believe quality matters more than quantity.",
  "Every product has a purpose, every formula serves a function, and every step is designed to deliver meaningful care without complexity.",
  "We are not here to create dependency. We are here to help your skin, hair, and body become healthier, stronger, and more resilient with every use.",
  "Because true beauty is not about covering imperfections. It is about restoring balance, protecting what is already yours, and helping your natural beauty flourish.",
  "Your journey to healthier skin, stronger hair, and lasting body wellness begins with the choices you make today. Discover naturally derived care that restores, protects, and strengthens from within, because lasting beauty begins with lasting skin, hair, and body health.",
  "Choose care that restores, not conceals.",
  "Welcome to a new standard of naturally intentional beauty.",
  "Welcome to Mimi Beauty.",
];

const cards = [
  {
    id: "journal" as const,
    title: "Journal",
    description: "Thoughts, stories, and insights on skincare, self-care, and everything in between.",
    icon: BookOpen,
  },
  {
    id: "philosophy" as const,
    title: "Brand Philosophy",
    description: "Our beliefs, our values, and our promise to you and the planet.",
    icon: Leaf,
  },
  {
    id: "products" as const,
    title: "Product Description",
    description: "The details behind our formulas, ingredients, and how they work.",
    icon: Droplet,
  },
];

export function ReadSlowlySection() {
  const [open, setOpen] = useState<"philosophy" | "products" | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#07110D] py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 12% 20%, rgba(201,168,106,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.08] tracking-tight text-[#F5F2EC]"
            style={{ fontFamily: "var(--font-cormorant, serif)" }}
          >
            Read Slowly,
            <br />
            Everything <em className="italic text-gold">Matters.</em>
          </motion.h2>

          <div className="my-8 flex items-center justify-center gap-4">
            <svg width="40" height="12" viewBox="0 0 40 12" fill="none" className="text-gold">
              <path d="M10 6H30" stroke="currentColor" strokeWidth="0.5" />
              <path d="M20 6C20 4 22 2 24 2C24 4 22 6 20 6Z" fill="currentColor" />
              <path d="M20 6C20 8 18 10 16 10C16 8 18 6 20 6Z" fill="currentColor" />
              <path d="M20 6C20 4 18 2 16 2C16 4 18 6 20 6Z" fill="currentColor" />
              <path d="M20 6C20 8 22 10 24 10C24 8 22 6 20 6Z" fill="currentColor" />
            </svg>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-xl text-[15px] md:text-[17px] leading-relaxed text-[#D8D2C8]/85"
          >
            Take a moment to understand what goes into our formulas, what we believe in, and what you're choosing for your skin.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            const inner = (
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="group relative flex h-full min-h-[240px] flex-col rounded-2xl border border-gold/20 bg-[#121A15] p-7 sm:p-8 text-left transition-colors hover:border-gold/50"
              >
                <Icon className="h-6 w-6 text-gold" strokeWidth={1.4} />
                <h3
                  className="mt-8 text-2xl text-[#F5F2EC]"
                  style={{ fontFamily: "var(--font-cormorant, serif)" }}
                >
                  {card.title}
                </h3>
                <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-[#D8D2C8]/80">
                  {card.description}
                </p>
                <ArrowRight className="mt-auto ml-auto h-4 w-4 text-gold transition-transform duration-300 group-hover:translate-x-1" />
              </motion.article>
            );

            if (card.id === "journal") {
              return (
                <Link key={card.id} href="/blog" className="block h-full">
                  {inner}
                </Link>
              );
            }

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setOpen(card.id)}
                className="block h-full text-left"
              >
                {inner}
              </button>
            );
          })}
        </div>
      </div>

      <Dialog open={open === "philosophy"} onOpenChange={(isOpen) => setOpen(isOpen ? "philosophy" : null)}>
        <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto border-gold/20 bg-[#0D1C14] text-[#F5F2EC] sm:rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl tracking-tight" style={{ fontFamily: "Cinzel" }}>
              Who We Are
            </DialogTitle>
            <DialogDescription className="text-[#D8D2C8]">
              Brand description and philosophy.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 pt-2">
            {WHO_WE_ARE.map((para) => (
              <p key={para.slice(0, 40)} className="text-[15px] leading-[1.8] text-[#F5F2EC]/80 font-light">
                {para}
              </p>
            ))}
            <div className="border-t border-gold/15 pt-8">
              <h3 className="font-display text-2xl text-[#F5F2EC] mb-5" style={{ fontFamily: "Cinzel" }}>
                Brand Philosophy
              </h3>
              {BRAND_PHILOSOPHY.map((para) => (
                <p key={para.slice(0, 40)} className="mb-5 text-[15px] leading-[1.8] text-[#F5F2EC]/80 font-light last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={open === "products"} onOpenChange={(isOpen) => setOpen(isOpen ? "products" : null)}>
        <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto border-gold/20 bg-[#0D1C14] text-[#F5F2EC] sm:rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl tracking-tight" style={{ fontFamily: "Cinzel" }}>
              Product Description
            </DialogTitle>
            <DialogDescription className="text-[#D8D2C8]">
              The details behind our formulas, from the collection.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-8 pt-2">
            {products.map((product) => (
              <article key={product.slug} className="border-t border-gold/10 pt-6 first:border-t-0 first:pt-0">
                <p className="text-[10px] uppercase tracking-[0.22em] text-gold">{product.category}</p>
                <h3 className="mt-2 font-display text-2xl text-[#F5F2EC]" style={{ fontFamily: "Cinzel" }}>
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-[#D8D2C8]">{product.tagline}</p>
                <p className="mt-4 whitespace-pre-line text-[15px] leading-[1.8] text-[#F5F2EC]/80 font-light">
                  {product.description}
                </p>
                <Link
                  href={`/product/${product.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gold hover:text-gold-soft"
                >
                  View product <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
