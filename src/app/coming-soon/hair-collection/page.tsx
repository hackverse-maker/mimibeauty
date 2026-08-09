"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Wind } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease },
  };
}

export default function HairCollectionPage() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-background text-white">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute -left-24 top-1/4 h-[200px] w-[200px] rounded-full opacity-80 md:h-[320px] md:w-[320px]"
          style={{ background: "#CFA76A14" }}
        />
        <div
          className="absolute -right-16 bottom-0 h-[180px] w-[180px] rounded-full md:h-[280px] md:w-[280px]"
          style={{ background: "#CFA76A10" }}
        />
        <div className="hero-grain absolute inset-0 opacity-[0.22]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col items-center justify-center px-6 py-20 text-center md:px-8 md:py-24 lg:px-12 lg:py-32">
        {/* Icon */}
        <motion.div {...fadeUp(0.1)} className="mb-8">
          <div className="grid h-20 w-20 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold md:h-24 md:w-24">
            <Wind className="h-8 w-8 md:h-10 md:w-10" />
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.span
          {...fadeUp(0.15)}
          className="inline-flex items-center rounded-full border border-gold/40 bg-transparent px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold"
        >
          New Collection
        </motion.span>

        {/* Main heading */}
        <motion.h1
          {...fadeUp(0.2)}
          className="mt-6 font-display text-[clamp(2.75rem,6vw,4.5rem)] font-normal leading-[1.1] tracking-normal text-white"
        >
          COMING SOON
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.25)}
          className="mt-6 text-xl md:text-2xl text-foreground/90 font-light"
        >
          Hair Collection
        </motion.p>

        {/* Description */}
        <motion.p
          {...fadeUp(0.3)}
          className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground"
        >
          We're preparing something special for you. This collection is currently under development
          and will be available soon.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.35)}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#050505] transition-[filter] duration-300 hover:brightness-110 sm:w-auto"
          >
            Return Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-gold/40 bg-transparent px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-gold hover:text-gold sm:w-auto"
          >
            Explore Products <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
