"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { products, findProduct, type Product } from "@/lib/products";
import { bundles, type Bundle } from "@/lib/bundles";
import { ShoppingBag, ArrowLeft, Check, Sparkles, ChevronRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

// Body oil choices pool for configurable bundles
const bodyOilProducts = products.filter((p) => p.category === "BODY");

export default function BundlesPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0C1810] font-sans selection:bg-[#0C1810]/10 selection:text-[#0C1810]">
      {/* 2. BACK TO HOME BUTTON */}
      <div className="mx-auto max-w-[1400px] px-6 pt-8 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-full border border-[#0C1810]/25 bg-transparent px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#0C1810] hover:bg-[#0C1810] hover:text-[#FAF7F2] transition-all shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" /> BACK TO HOME
        </Link>
      </div>

      {/* 3. BUNDLES HERO SECTION */}
      <section className="relative overflow-hidden py-12 md:py-20 border-b border-[#0C1810]/10">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0C1810]/5 border border-[#0C1810]/15 text-[10px] font-bold uppercase tracking-[0.3em] text-[#0C1810] mb-5">
                <Sparkles className="h-3.5 w-3.5 text-[#0C1810]" /> Curated Ritual Sets
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl leading-[1.05] tracking-tight font-medium text-[#0C1810] mb-4">
                Our Bundles
              </h1>
              <p className="text-[#4A5D50] text-base sm:text-xl font-sans max-w-lg mb-8 leading-relaxed">
                Care, simplified. Results, amplified.
              </p>
              <a
                href="#bundle-collection"
                className="inline-flex items-center gap-3 rounded-full bg-[#0C1810] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#FAF7F2] hover:bg-[#1A2E20] transition-all shadow-md"
              >
                Explore Sets ↓
              </a>
            </motion.div>

            {/* High-Resolution Editorial Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease, delay: 0.15 }}
              className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#F3EFE6] border border-[#0C1810]/10 shadow-xl"
            >
              <img
                src="/01_hero_mimi_sets.jpg.png"
                alt="Mimi Beauty Our Bundles Collection"
                className="h-full w-full object-cover [image-rendering:-webkit-optimize-contrast]"
                loading="eager"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. BUNDLE GRID */}
      <section id="bundle-collection" className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#0C1810]/70 mb-2">
              The Collection
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#0C1810] tracking-tight">
              Curated Bundles
            </h2>
            <p className="mt-3 text-sm text-[#4A5D50]">
              Thoughtfully paired rituals designed to bring out your skin and hair’s natural glow.
            </p>
          </div>

          {/* Desktop: 4 per row | Mobile: 1 per row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bundles.slice(0, 7).map((bundle, index) => (
              <BundleCard key={bundle.id} bundle={bundle} index={index} />
            ))}
          </div>

          {/* 6. MADE FOR YOU / CUSTOM BUNDLE SECTION (50/50 Desktop Layout) */}
          <div className="mt-16 lg:mt-24">
            <CustomBundleSection bundle={bundles[7]} />
          </div>
        </div>
      </section>
    </div>
  );
}

function BundleCard({ bundle, index }: { bundle: Bundle; index: number }) {
  const { addBundle } = useCart();
  const [selectedBodyOils, setSelectedBodyOils] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isConfigurable = bundle.configuration.requiresBodyOil;
  const bodyOilCountRequired = bundle.configuration.bodyOilCount || 0;

  const fixedProducts = bundle.productIds
    .map((id) => findProduct(id))
    .filter((p): p is Product => p !== undefined);

  const handleOilToggle = (oilSlug: string) => {
    setErrorMsg(null);
    if (bodyOilCountRequired === 1) {
      setSelectedBodyOils([oilSlug]);
    } else if (bodyOilCountRequired === 2) {
      if (selectedBodyOils.includes(oilSlug)) {
        setSelectedBodyOils(selectedBodyOils.filter((s) => s !== oilSlug));
      } else {
        if (selectedBodyOils.length < 2) {
          setSelectedBodyOils([...selectedBodyOils, oilSlug]);
        } else {
          setSelectedBodyOils([selectedBodyOils[0], oilSlug]);
        }
      }
    }
  };

  const handleAddToCart = () => {
    if (isConfigurable) {
      if (selectedBodyOils.length < bodyOilCountRequired) {
        setErrorMsg(
          bodyOilCountRequired === 1
            ? "Please select 1 body oil."
            : "Please select 2 unique body oils."
        );
        return;
      }
    }

    const chosenOilProducts = selectedBodyOils
      .map((slug) => findProduct(slug))
      .filter((p): p is Product => p !== undefined);

    const allFinalProducts = [...fixedProducts, ...chosenOilProducts];
    const optionsObj =
      selectedBodyOils.length > 0
        ? { bodyOils: selectedBodyOils.join(", ") }
        : undefined;

    addBundle(bundle, allFinalProducts, optionsObj, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`group flex flex-col h-full rounded-2xl overflow-hidden border bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:border-[#0C1810]/40 ${
        bundle.isFlagship ? "border-[#0C1810]/40 ring-1 ring-[#0C1810]/20" : "border-[#0C1810]/15"
      }`}
    >
      {/* 1. High Quality Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F3EFE6] border-b border-[#0C1810]/10 flex items-center justify-center p-3">
        <img
          src={bundle.image}
          alt={bundle.name}
          className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105 [image-rendering:-webkit-optimize-contrast]"
          loading="lazy"
          decoding="async"
        />

        {/* Category Badge */}
        <div className="absolute top-2 left-2 bg-[#FAF7F2]/90 backdrop-blur border border-[#0C1810]/15 text-[#0C1810] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.2em] rounded-full">
          {bundle.category}
        </div>

        {/* Discount Badge */}
        <div className="absolute top-2 right-2 bg-[#0C1810] text-[#FAF7F2] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded">
          {bundle.discountPercent}% OFF
        </div>
      </div>

      {/* 2-5. Card Content (Centered Hierarchy) */}
      <div className="flex flex-col flex-1 p-3 text-center">
        {/* 2. Bundle Name */}
        <Link href={`/bundles/${bundle.slug}`} className="block group-hover:text-[#0C1810]/80 transition-colors">
          <h3 className="font-display text-xl text-[#0C1810] font-medium mb-1">
            {bundle.name}
          </h3>
        </Link>

        {/* 3. Short Description */}
        <p className="text-xs text-[#5A6D60] mb-4 line-clamp-2 leading-relaxed">
          {bundle.description}
        </p>

        {/* Configurable Body Oil Selector UI */}
        {isConfigurable && (
          <div className="mb-4 space-y-2 text-left bg-[#FAF7F2] p-3 rounded-xl border border-[#0C1810]/10">
            <p className="text-[10px] uppercase tracking-wider text-[#0C1810] font-bold">
              Select {bodyOilCountRequired === 1 ? "1 Body Oil" : "2 Body Oils"}:
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {bodyOilProducts.map((oil) => {
                const isSelected = selectedBodyOils.includes(oil.slug);
                return (
                  <button
                    key={oil.slug}
                    type="button"
                    onClick={() => handleOilToggle(oil.slug)}
                    className={`flex items-center justify-between gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-all ${
                      isSelected
                        ? "border-[#0C1810] bg-[#0C1810] text-[#FAF7F2]"
                        : "border-[#0C1810]/20 bg-white text-[#0C1810]/70 hover:border-[#0C1810]/40"
                    }`}
                  >
                    <span className="truncate">{oil.name}</span>
                    {isSelected && <Check className="h-3 w-3 shrink-0 text-[#FAF7F2] stroke-[3]" />}
                  </button>
                );
              })}
            </div>
            {errorMsg && <p className="text-[10px] text-red-600 font-medium">{errorMsg}</p>}
          </div>
        )}

        {/* Price & Actions (Bottom) */}
        <div className="mt-auto pt-4 border-t border-[#0C1810]/10">
          {/* 4. PKR Price */}
          <div className="flex flex-col items-center justify-center gap-1 mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-display text-[#0C1810] font-bold">
                PKR {bundle.finalPrice.toLocaleString()}
              </span>
              <span className="text-xs text-[#0C1810]/50 line-through">
                PKR {bundle.originalPrice.toLocaleString()}
              </span>
            </div>
            <span className="text-[10px] font-bold text-[#0C1810] bg-[#0C1810]/5 px-2 py-0.5 rounded border border-[#0C1810]/15">
              Save PKR {bundle.savings.toLocaleString()}
            </span>
          </div>

          {/* 5. ADD TO BAG Button */}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full rounded-full bg-[#0C1810] py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FAF7F2] hover:bg-[#1A2E20] transition-all flex items-center justify-center gap-2 shadow-sm min-h-[44px]"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              ADD TO BAG
            </button>
            <Link
              href={`/bundles/${bundle.slug}`}
              className="w-full text-center py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#0C1810]/70 hover:text-[#0C1810] transition-colors"
            >
              View Details →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

{/* 6. MADE FOR YOU / CUSTOM BUNDLE SECTION (50/50 Desktop Composition) */}
function CustomBundleSection({ bundle }: { bundle?: Bundle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl bg-[#F3EFE6] border border-[#0C1810]/15 p-6 sm:p-10 lg:p-12 shadow-xl overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left 50%: High-Resolution Image */}
        <div className="relative aspect-[4/3] sm:aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-white/60 border border-[#0C1810]/10 flex items-center justify-center p-4">
          <img
            src="/09_mimis_edit.jpg"
            alt="Mimi Edits — Custom Mimi Edit"
            className="h-full w-full object-contain [image-rendering:-webkit-optimize-contrast]"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute top-4 left-4 bg-[#0C1810] text-[#FAF7F2] text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded">
            08 — Special Edition
          </div>
        </div>

        {/* Right 50%: Vertically Centered Text */}
        <div className="flex flex-col justify-center space-y-5">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0C1810]/70 block">
            Custom Beauty Ritual
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#0C1810] font-medium leading-tight">
            Mimi Edits
          </h2>
          <p className="text-base sm:text-lg text-[#4A5D50] leading-relaxed">
            Create your perfect Mimi Beauty ritual, your way.
          </p>

          <div className="space-y-2 pt-2 text-xs font-medium text-[#0C1810]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0C1810]" />
              <span>Select any 2 or more products from the collection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0C1810]" />
              <span>Receive an automatic <strong>10% OFF</strong> discount</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0C1810]" />
              <span>Custom price calculated dynamically</span>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/bundles/make-your-own-bundle"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#0C1810] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#FAF7F2] hover:bg-[#1A2E20] transition-all shadow-md"
            >
              Build Your Bundle <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
