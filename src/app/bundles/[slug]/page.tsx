"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Check, Plus, Minus, ShoppingBag, Sparkles } from "lucide-react";
import { findBundle, type Bundle } from "@/lib/bundles";
import { products, findProduct, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { notFound, redirect } from "next/navigation";

export default function BundleDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);

  if (resolvedParams.slug === "make-your-own-bundle") {
    redirect("/bundles/make-your-own-bundle");
  }

  const bundle = findBundle(resolvedParams.slug);
  const { addBundle } = useCart();

  const [selectedBodyOils, setSelectedBodyOils] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!bundle) {
    notFound();
  }

  const bodyOils = products.filter((p) => p.category === "BODY");
  const isConfigurable = bundle.configuration.requiresBodyOil;
  const bodyOilCountRequired = bundle.configuration.bodyOilCount || 0;

  const fixedProducts = bundle.productIds
    .map((id) => findProduct(id))
    .filter((p): p is Product => p !== undefined);

  const selectedOilProducts = selectedBodyOils
    .map((id) => findProduct(id))
    .filter((p): p is Product => p !== undefined);

  const allFinalProducts = [...fixedProducts, ...selectedOilProducts];

  const handleBodyOilToggle = (oilSlug: string) => {
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

  const canAddToCart = () => {
    if (isConfigurable) {
      return selectedBodyOils.length === bodyOilCountRequired;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!canAddToCart()) {
      setErrorMsg(
        bodyOilCountRequired === 1
          ? "Please select 1 body oil option to continue."
          : "Please select 2 unique body oils to continue."
      );
      return;
    }

    const optionsObj = selectedBodyOils.length > 0 ? { bodyOils: selectedBodyOils.join(", ") } : undefined;
    addBundle(bundle, allFinalProducts, optionsObj, quantity);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Navigation */}
        <nav className="mb-8">
          <Link
            href="/bundles"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Bundles
          </Link>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-28">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/30 border border-border/50 p-6 flex items-center justify-center">
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  className="w-full h-full object-contain"
                />

                {bundle.discountPercent > 0 && (
                  <div className="absolute top-4 right-4 bg-gold text-background px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md">
                    {bundle.discountPercent}% OFF
                  </div>
                )}

                {bundle.isFlagship && (
                  <div className="absolute top-4 left-4 bg-foreground text-background px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md">
                    Complete Collection
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: Bundle Configuration & Purchase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-8"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold block mb-2">
                {bundle.category}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-3">
                {bundle.name}
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                {bundle.description}
              </p>
            </div>

            {/* Price display */}
            <div className="p-6 rounded-2xl bg-secondary/30 border border-border/40 space-y-2">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-display font-semibold text-foreground">
                  PKR {bundle.finalPrice.toLocaleString()}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  PKR {bundle.originalPrice.toLocaleString()}
                </span>
                <span className="ml-auto text-xs font-bold text-gold bg-gold/10 border border-gold/30 px-3 py-1 rounded-full">
                  Save PKR {bundle.savings.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Prices include all taxes. Instant discount applied.</p>
            </div>

            {/* Configurable Body Oil Selection */}
            {isConfigurable && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-border/40 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                    Choose Your Body Oil {bodyOilCountRequired === 1 ? "(Select 1)" : "(Select 2 Unique)"}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {selectedBodyOils.length} / {bodyOilCountRequired} Selected
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {bodyOils.map((oil) => {
                    const isSelected = selectedBodyOils.includes(oil.slug);
                    return (
                      <button
                        key={oil.slug}
                        type="button"
                        onClick={() => handleBodyOilToggle(oil.slug)}
                        className={`relative p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                          isSelected
                            ? "border-gold bg-gold/10 shadow-[0_0_20px_rgba(201,168,106,0.15)]"
                            : "border-border/60 bg-secondary/20 hover:border-gold/50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-display font-medium text-sm">{oil.name}</span>
                          <div
                            className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                              isSelected ? "border-gold bg-gold text-background" : "border-border"
                            }`}
                          >
                            {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                          </div>
                        </div>
                        <p className="text-[11px] text-muted-foreground line-clamp-1">{oil.tagline}</p>
                        <p className="text-xs font-medium text-gold mt-1">PKR {oil.price.toLocaleString()}</p>
                      </button>
                    );
                  })}
                </div>
                {errorMsg && <p className="text-xs text-red-400 font-medium">{errorMsg}</p>}
              </div>
            )}

            {/* Included Products Overview - Separated by Category */}
            <div className="space-y-6 border-t border-border/40 pt-6">
              {/* Face Actives Section */}
              {allFinalProducts.filter(p => p.category === "SERUM").length > 0 && (
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-display text-foreground font-medium">DEW — Face Serum</h3>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold mt-1">Face Actives</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {allFinalProducts.filter(p => p.category === "SERUM").map((prod, i) => (
                      <div
                        key={`${prod.slug}-face-${i}`}
                        className="flex items-center gap-3 p-2 rounded-xl bg-secondary/20 border border-border/30 h-16"
                      >
                        <img src={prod.image} alt={prod.name} className="h-10 w-10 object-contain rounded-lg bg-secondary/40 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-display text-xs text-foreground font-medium truncate">{prod.name}</p>
                          <p className="text-[10px] text-muted-foreground">PKR {prod.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hair Actives Section */}
              {allFinalProducts.filter(p => p.category === "HAIR" || p.category === "SCALP").length > 0 && (
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-display text-foreground font-medium">VEIL + HERBÉ — Hair & Scalp</h3>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold mt-1">Hair Actives</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {allFinalProducts.filter(p => p.category === "HAIR" || p.category === "SCALP").map((prod, i) => (
                      <div
                        key={`${prod.slug}-hair-${i}`}
                        className="flex items-center gap-3 p-2 rounded-xl bg-secondary/20 border border-border/30 h-16"
                      >
                        <img src={prod.image} alt={prod.name} className="h-10 w-10 object-contain rounded-lg bg-secondary/40 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-display text-xs text-foreground font-medium truncate">{prod.name}</p>
                          <p className="text-[10px] text-muted-foreground">PKR {prod.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Products (Body Oils, etc.) */}
              {allFinalProducts.filter(p => p.category !== "SERUM" && p.category !== "HAIR" && p.category !== "SCALP").length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                    Other Products ({allFinalProducts.filter(p => p.category !== "SERUM" && p.category !== "HAIR" && p.category !== "SCALP").length} Items)
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {allFinalProducts.filter(p => p.category !== "SERUM" && p.category !== "HAIR" && p.category !== "SCALP").map((prod, i) => (
                      <div
                        key={`${prod.slug}-other-${i}`}
                        className="flex items-center gap-3 p-2 rounded-xl bg-secondary/20 border border-border/30 h-16"
                      >
                        <img src={prod.image} alt={prod.name} className="h-10 w-10 object-contain rounded-lg bg-secondary/40 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-display text-xs text-foreground font-medium truncate">{prod.name}</p>
                          <p className="text-[10px] text-muted-foreground">PKR {prod.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="space-y-2 border-t border-border/40 pt-6">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-gold block">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-11 w-11 rounded-full border border-border flex items-center justify-center hover:border-gold transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-display text-lg font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-11 w-11 rounded-full border border-border flex items-center justify-center hover:border-gold transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full rounded-full bg-gold py-4 text-xs font-semibold uppercase tracking-[0.2em] text-background hover:bg-gold-soft transition-all shadow-lg shadow-gold/10 flex items-center justify-center gap-2 min-h-[50px]"
              >
                <ShoppingBag className="h-4 w-4" /> Add Bundle to Cart · PKR {(bundle.finalPrice * quantity).toLocaleString()}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
