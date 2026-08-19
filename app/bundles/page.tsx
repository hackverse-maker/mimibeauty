"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { bundles, BundleCard } from "@/components/site/bundle-card";

const ease = [0.22, 1, 0.36, 1] as const;

export default function BundlesPage() {
  return (
    <div className="min-h-screen bg-background text-white">
      {/* Back to Home Button */}
      <div className="mx-auto max-w-[1400px] px-6 py-4">
        <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold hover:text-white transition-colors">
          ← Back to Home
        </Link>
      </div>

      {/* Hero Section - Mimi Sets */}
      <section className="relative overflow-hidden bg-background">
        <div className="relative mx-auto max-w-[1400px] px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease }}
              className="order-2 lg:order-1"
            >
              <h1 className="text-[#F5F2EC] mb-8" style={{ fontFamily: "Cinzel", fontWeight: "500", fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: "0.9" }}>
                Mimi Sets
              </h1>
              <p className="text-xl md:text-2xl text-[#D8D2C8] mb-6 leading-relaxed max-w-lg" style={{ fontFamily: "Montserrat", fontWeight: "400" }}>
                Curated combinations for your skin, hair, and body.
              </p>
              <p className="text-lg text-[#D8D2C8] mb-10 leading-relaxed max-w-md" style={{ fontFamily: "Montserrat", fontWeight: "400" }}>
                Thoughtfully paired. Effortlessly essential.<br />
                Everything you need, in harmony.
              </p>
              <Link
                href="#bundles"
                className="inline-flex items-center gap-3 border-2 border-gold bg-transparent px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:bg-gold hover:text-background"
              >
                SHOP SETS
                <ShoppingBag className="h-5 w-5" />
              </Link>
            </motion.div>

            {/* Right - Product Composition */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="relative aspect-square bg-[#0A100C] rounded-lg overflow-hidden">
                <img
                  src="/01_hero_mimi_sets.jpg.png"
                  alt="Mimi Beauty Products"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Bundles Section */}
      <section id="bundles" className="relative py-16 md:py-28 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-14 md:mb-16"
          >
            <h2 className="text-[#F5F2EC] mb-3" style={{ fontFamily: "Cinzel", fontWeight: "500", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: "0.95" }}>
              Our Bundles
            </h2>
            <p className="text-lg md:text-xl text-[#D8D2C8] mb-6" style={{ fontFamily: "Montserrat", fontWeight: "400" }}>
              Care, simplified. Results, amplified.
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-12 bg-[#C9A86A]/50" />
              <Star className="h-4 w-4 text-[#C9A86A] fill-[#C9A86A]" />
              <div className="h-px w-12 bg-[#C9A86A]/50" />
            </div>
          </motion.div>

          {/* Bundle Cards Grid - 4 per row desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {bundles.map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        </div>
      </section>

      {/* Make Your Own Bundle CTA */}
      <section className="px-6 pb-16 md:pb-24" aria-labelledby="custom-bundle-title">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-lg bg-[#FAF6F0] shadow-xl border border-gold/10">
            {/* Left - Elegant Beauty Still Life Image */}
            <div className="relative order-2 md:order-1 aspect-[4/3] md:aspect-auto min-h-[350px] md:min-h-[500px] overflow-hidden">
              <img
                src="/mimis_edits_editorial.PNG"
                alt="Mimi's Edit Collection"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
            </div>

            {/* Right - Text and CTA */}
            <div className="flex flex-col justify-center items-center md:items-start px-8 py-12 sm:px-12 md:px-20 lg:px-24 text-center md:text-left text-[#2A2A2A] order-1 md:order-2">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8C765C]" style={{ fontFamily: "Montserrat" }}>
                YOUR RITUAL, YOUR WAY
              </p>
              <h2
                id="custom-bundle-title"
                className="text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] font-light tracking-wide mb-6"
                style={{ fontFamily: "Cinzel" }}
              >
                MIMI’S EDIT
              </h2>
              <p className="text-sm leading-relaxed text-[#5C5C5C] max-w-sm mb-8" style={{ fontFamily: "Montserrat", fontWeight: "300" }}>
                Choose the essentials that make you feel most like yourself.
              </p>
              <Link
                href="/shop"
                className="inline-flex border border-[#2A2A2A] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#2A2A2A] transition-all duration-300 hover:bg-[#2A2A2A] hover:text-[#FAF6F0] hover:tracking-[0.28em]"
                style={{ fontFamily: "Montserrat" }}
              >
                BUILD YOUR BUNDLE
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

