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
  // Separate the Make Your Own bundle from the grid
  const gridBundles = bundles.filter((b) => !b.isCustom);
  const customBundle = bundles.find((b) => b.isCustom);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-gold/20 selection:text-gold">
      {/* BACK TO HOME */}
      <div className="mx-auto max-w-[1400px] px-6 pt-8 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-full border border-border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground hover:bg-gold hover:text-background hover:border-gold transition-all shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" /> BACK TO HOME
        </Link>
      </div>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-12 md:py-20 border-b border-border/40">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-5">
                <Sparkles className="h-3.5 w-3.5" /> Curated Ritual Sets
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl leading-[1.05] tracking-tight text-foreground mb-4">
                Our Bundles
              </h1>
              <p className="text-muted-foreground text-base sm:text-xl font-sans max-w-lg mb-8 leading-relaxed">
                Care, simplified. Results, amplified.
              </p>
              <a
                href="#bundle-collection"
                className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-background hover:bg-gold-soft transition-all shadow-md"
              >
                Explore Sets ↓
              </a>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease, delay: 0.15 }}
              className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-secondary border border-border/40 shadow-xl"
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

      {/* BUNDLE GRID */}
      <section id="bundle-collection" className="py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold/70 mb-2">
              The Collection
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight">
              Curated Bundles
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Thoughtfully paired rituals designed to bring out your skin and hair's natural glow.
            </p>
          </div>

          {/* Desktop: 3 per row | Mobile: 1 per row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {gridBundles.map((bundle, index) => (
              <BundleCard key={bundle.id} bundle={bundle} index={index} />
            ))}
          </div>

          {/* MAKE YOUR OWN BUNDLE CTA */}
          <div className="mt-12 lg:mt-16">
            <CustomBundleSection bundle={customBundle} />
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
  const [added, setAdded] = useState(false);

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
            : "Please select 2 body oils."
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
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`group flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl bg-secondary/30 ${
        bundle.isFlagship
          ? "border-gold/40 ring-1 ring-gold/15"
          : "border-border/50 hover:border-gold/40"
      }`}
    >
      {/* Image — compact aspect ratio */}
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary/60 flex items-center justify-center">
        <img
          src={bundle.image}
          alt={bundle.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 [image-rendering:-webkit-optimize-contrast]"
          loading="lazy"
          decoding="async"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-background/85 backdrop-blur border border-border/40 text-foreground/80 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] rounded-full">
          {bundle.category}
        </div>

        {/* Discount Badge */}
        <div
          className={`absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded text-background ${
            bundle.discountPercent >= 20 ? "bg-gold" : "bg-foreground/90"
          }`}
        >
          {bundle.discountPercent}% OFF
        </div>

        {/* Flagship ribbon */}
        {bundle.isFlagship && (
          <div className="absolute bottom-0 left-0 right-0 bg-gold/90 text-background text-[9px] font-bold uppercase tracking-[0.3em] text-center py-1.5">
            Bestseller Collection
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Name */}
        <Link href={`/bundles/${bundle.slug}`} className="block group-hover:text-gold transition-colors">
          <h3 className="font-display text-xl text-foreground font-medium mb-1">
            {bundle.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
          {bundle.description}
        </p>

        {/* Products included */}
        {fixedProducts.length > 0 && (
          <div className="mb-3 bg-background/40 px-3 py-2 rounded-xl border border-border/30">
            <p className="text-[9px] text-gold uppercase tracking-wider mb-1 font-semibold">
              Includes ({fixedProducts.length}{isConfigurable ? "+" : ""} items)
            </p>
            <p className="text-xs text-foreground/85 font-medium">
              {fixedProducts.map((p) => p.name).join(" + ")}
              {isConfigurable && bodyOilCountRequired === 1 ? " + 1 Body Oil" : ""}
              {isConfigurable && bodyOilCountRequired === 2 ? " + 2 Body Oils" : ""}
            </p>
          </div>
        )}
        {fixedProducts.length === 0 && isConfigurable && (
          <div className="mb-3 bg-background/40 px-3 py-2 rounded-xl border border-border/30">
            <p className="text-[9px] text-gold uppercase tracking-wider mb-1 font-semibold">
              Choose {bodyOilCountRequired} Body Oils
            </p>
            <p className="text-xs text-muted-foreground">
              HALO · PEARL · SANTORINI · AMALFI
            </p>
          </div>
        )}

        {/* Configurable Body Oil Selector */}
        {isConfigurable && (
          <div className="mb-3 space-y-2 bg-background/30 p-2.5 rounded-xl border border-border/30">
            <p className="text-[10px] uppercase tracking-wider text-gold font-bold">
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
                    className={`flex items-center justify-between gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-all min-h-[36px] ${
                      isSelected
                        ? "border-gold bg-gold text-background"
                        : "border-border/40 bg-secondary/40 text-foreground/70 hover:border-gold/40"
                    }`}
                  >
                    <span className="truncate">{oil.name}</span>
                    {isSelected && <Check className="h-3 w-3 shrink-0 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
            {errorMsg && (
              <p className="text-[10px] text-red-400 font-medium">{errorMsg}</p>
            )}
          </div>
        )}

        {/* Price & Actions */}
        <div className="mt-auto pt-3 border-t border-border/30">
          <div className="flex items-baseline justify-between gap-2 mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-display text-foreground font-bold">
                PKR {bundle.finalPrice.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground line-through">
                PKR {bundle.originalPrice.toLocaleString()}
              </span>
            </div>
            <span className="text-[10px] font-bold text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/20 whitespace-nowrap">
              Save PKR {bundle.savings.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full rounded-full py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-sm min-h-[44px] ${
                added
                  ? "bg-green-700 text-white"
                  : "bg-gold text-background hover:bg-gold-soft"
              }`}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              {added ? "Added ✓" : "ADD TO BAG"}
            </button>
            <Link
              href={`/bundles/${bundle.slug}`}
              className="w-full text-center py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground hover:text-gold transition-colors"
            >
              View Details →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CustomBundleSection({ bundle }: { bundle?: Bundle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl border border-gold/20 bg-secondary/30 p-6 sm:p-10 lg:p-12 shadow-xl overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Image */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary/50 border border-border/30 flex items-center justify-center">
          <img
            src="/09_mimis_edit.jpg"
            alt="Mimi Edits — Custom Bundle"
            className="h-full w-full object-contain [image-rendering:-webkit-optimize-contrast]"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute top-4 left-4 bg-gold text-background text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded">
            Custom Edition
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center space-y-5">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold/70 block">
            Custom Beauty Ritual
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground font-medium leading-tight">
            Mimi&apos;s Edit
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Create your perfect Mimi Beauty ritual, your way.
          </p>

          <div className="space-y-2 pt-2 text-xs font-medium text-foreground/80">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span>Select any 2 or more products from the collection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span>
                Receive an automatic{" "}
                <strong className="text-gold">10% OFF</strong> discount
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span>Custom price calculated dynamically at checkout</span>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/bundles/make-your-own-bundle"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-background hover:bg-gold-soft transition-all shadow-md"
            >
              Build Your Bundle <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
