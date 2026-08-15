"use client";
import { motion } from "framer-motion";
import { assets } from "@/lib/products";
import { Sparkles, Shield, Leaf, Heart } from "lucide-react";

const timeline = [
  {
    year: "2024",
    title: "The Copenhagen Kitchen",
    label: "Initial formulation and botanical studies begin in Copenhagen.",
  },
  {
    year: "2025",
    title: "Dermatological Testing",
    label: "First batch of Dew tested and refined with 40 leading dermatologists.",
  },
  {
    year: "2026",
    title: "The Launch of MIMIbeauty",
    label: "MIMIbeauty officially opens its doors to the public.",
  },
  {
    year: "2027",
    title: "Worldwide Expansion",
    label: "Refillable luxury glass packaging launches globally.",
  },
];

export default function About() {
  return (
    <div className="relative min-h-screen bg-background text-white selection:bg-gold/20 selection:text-gold overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-stone-500/5 blur-[200px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative isolate min-h-[90vh] flex items-center overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 -z-10">
          <img
            src={assets.stone}
            alt="Background Stone"
            className="h-full w-full object-cover opacity-45 scale-105 filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </div>

        <div className="mx-auto max-w-[1800px] w-full px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4"
            >
              <span className="h-[1px] w-12 bg-gold/60" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-gold">
                The House of MIMI
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-8 font-display text-[clamp(2.5rem,7.5vw,7.5rem)] leading-[0.9] tracking-tighter text-balance"
            >
              A quiet obsession <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gold/70">
                with skin.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-foreground/70"
            >
              We design intentional skincare formulated to integrate seamlessly into your
              daily space. Crafting botanically-infused, clinically-proven formulas in small
              batches.
            </motion.p>
          </div>
        </div>

        {/* Scroll indicator micro-animation */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/50">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-6 rounded-full bg-gold/50"
          />
        </div>
      </section>

      {/* Who We Are */}
      <section className="relative z-10 mx-auto max-w-[1800px] px-6 lg:px-12 xl:px-20 pt-24 md:pt-36 pb-12 md:pb-16 border-t border-white/5">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-[1px] w-8 bg-gold" />
              <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-gold">
                Who We Are
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
              The best care works with your body, not against it.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed font-light"
          >
            <p>
              Mimi Beauty is a premium Pakistani skincare brand built on a simple belief that the best care works with your body, not against it. We thoughtfully formulate products using naturally derived ingredients that support healthy skin, hair, and body care without complexity.
            </p>
            <p className="text-foreground/60 text-base md:text-lg">
              Our collection is centered around fast-absorbing dry oil formulations that nourish deeply without leaving a heavy or greasy feel. From face and hair to body care, each product is designed to fit seamlessly into your daily routine while delivering purposeful, long-term care.
            </p>
            <p className="text-foreground/60 text-base md:text-lg">
              At Mimi Beauty, we believe luxury is found in thoughtful formulation, honest ingredients, and products that truly deserve a place in your routine. We don’t believe in creating more. We believe in creating better.
            </p>
            <p className="text-foreground/60 text-base md:text-lg">
              This is more than skincare. It is a commitment to helping you care for yourself with intention, confidence, and simplicity. Working in harmony with nature, helping your body restore, protect, and strengthen from within.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="relative z-10 mx-auto max-w-[1800px] px-6 lg:px-12 xl:px-20 pb-24 md:pb-36">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-[1px] w-8 bg-gold" />
              <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-gold">
                Brand Philosophy
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
              Care that restores, not conceals.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed font-light"
          >
            <p>
              Your skin and hair were never meant to depend on products forever. They were designed to protect, heal, and thrive naturally. At Mimi Beauty, we believe skincare and haircare should support your body’s natural ability to restore itself, not replace it.
            </p>
            <p className="text-foreground/60 text-base md:text-lg">
              Many conventional products deliver quick, visible results by treating the surface rather than the root cause. Over time, harsh ingredients can weaken the skin barrier, damage the hair cuticle, and leave your skin and hair relying on continuous use instead of becoming healthier.
            </p>
            <p className="text-foreground/60 text-base md:text-lg">
              Every formula is thoughtfully crafted with naturally derived ingredients that promote long term skin, hair, and body health. You will never find long ingredient lists or complicated routines at Mimi Beauty. Every product has a purpose, every formula serves a function, and every step is designed to deliver meaningful care without complexity.
            </p>
            <p className="text-foreground/60 text-base md:text-lg">
              We are not here to create dependency. We are here to help your skin, hair, and body become healthier, stronger, and more resilient with every use. Because true beauty is not about covering imperfections. It is about restoring balance, protecting what is already yours, and helping your natural beauty flourish.
            </p>
            <p className="text-foreground/60 text-base md:text-lg">
              Your journey to healthier skin, stronger hair, and lasting body wellness begins with the choices you make today. Welcome to a new standard of naturally intentional beauty. Welcome to Mimi Beauty.
            </p>
          </motion.div>
        </div>
      </section>


      {/* Timeline Section */}
      <section className="relative z-10 mx-auto max-w-[1800px] px-6 lg:px-12 xl:px-20 py-24 md:py-36">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="sticky top-32">
              <div className="flex items-center gap-4">
                <span className="h-[1px] w-8 bg-gold" />
                <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-gold">
                  Chronology
                </p>
              </div>
              <h2 className="mt-6 font-display text-4xl md:text-6xl">Our journey.</h2>
              <p className="mt-6 text-foreground/50 max-w-sm font-light leading-relaxed">
                From a small design and chemistry studio to a globally recognized standard for
                intentional care.
              </p>
            </div>
          </div>

          <div className="relative border-l border-white/10 pl-8 md:pl-16 space-y-16 md:space-y-24 py-4">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="relative group"
              >
                {/* Custom glowing dot */}
                <span className="absolute -left-[41px] md:-left-[73px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-gold bg-background transition-all duration-300 group-hover:scale-125">
                  <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                </span>

                <span className="font-display text-4xl md:text-5xl text-gold/80 block group-hover:text-gold transition-colors duration-300">
                  {t.year}
                </span>
                <h4 className="mt-2 text-xl font-medium tracking-tight text-white">{t.title}</h4>
                <p className="mt-3 text-base md:text-lg text-foreground/60 font-light max-w-xl leading-relaxed">
                  {t.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
