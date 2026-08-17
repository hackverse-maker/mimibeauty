"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Check, Plus, Minus, ShoppingBag, Sparkles, X, AlertCircle } from "lucide-react";
import { products, type Product } from "@/lib/products";
import { type Bundle } from "@/lib/bundles";
import { useCart } from "@/lib/cart";

export default function MakeYourOwnBundlePage() {
  const { addBundle } = useCart();
  const [selectedProductSlugs, setSelectedProductSlugs] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState<string | null>(null);

  const selectedProducts = products.filter((p) => selectedProductSlugs.includes(p.slug));

  const originalPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const discountPercent = selectedProducts.length >= 2 ? 10 : 0;
  const savings = Math.round((originalPrice * discountPercent) / 100);
  const finalPrice = originalPrice - savings;

  const toggleProduct = (slug: string) => {
    setValidationError(null);
    setSelectedProductSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleAddToCart = () => {
    if (selectedProducts.length < 2) {
      setValidationError("Please select at least 2 products to create your custom bundle (10% discount applied).");
      return;
    }

    const customBundle: Bundle = {
      id: `custom-bundle-${Date.now()}`,
      slug: "make-your-own-bundle",
      name: `Mimi's Edit — Custom Set (${selectedProducts.length} Items)`,
      category: "Custom Bundle",
      description: `Custom bundle containing ${selectedProducts.map((p) => p.name).join(", ")}`,
      productIds: selectedProducts.map((p) => p.slug),
      image: selectedProducts[0]?.image || "/09_mimis_edit.jpg",
      originalPrice,
      discountPercent: 10,
      finalPrice,
      savings,
      configuration: {
        type: "custom",
        productIds: selectedProducts.map((p) => p.slug),
      },
    };

    addBundle(customBundle, selectedProducts, {}, quantity);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/bundles"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors font-semibold"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Bundles
          </Link>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4"
          >
            <Sparkles className="h-3.5 w-3.5" /> Mimi Edits
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.1] text-foreground mb-4"
          >
            Mimi Edits
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto"
          >
            Create your perfect Mimi Beauty ritual, your way. Select any 2 or more products to receive an instant <strong className="text-gold font-medium">10% OFF</strong>.
          </motion.p>
        </div>

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step 1: Product Selection Grid */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <div>
                <h2 className="font-display text-xl sm:text-2xl text-foreground">Choose Products</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Select 2 or more items from the collection</p>
              </div>
              <span className="text-xs font-mono bg-secondary px-3 py-1 rounded-full text-gold font-semibold">
                {selectedProducts.length} Selected
              </span>
            </div>

            {validationError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-3"
              >
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{validationError}</span>
              </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product) => {
                const isSelected = selectedProductSlugs.includes(product.slug);
                return (
                  <motion.div
                    key={product.slug}
                    whileHover={{ y: -4 }}
                    onClick={() => toggleProduct(product.slug)}
                    className={`relative cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 p-4 flex flex-col justify-between ${
                      isSelected
                        ? "bg-gold/10 border-gold shadow-[0_0_25px_rgba(201,168,106,0.15)]"
                        : "bg-secondary/20 border-border/40 hover:border-gold/40"
                    }`}
                  >
                    <div>
                      {/* Selection Checkmark Badge */}
                      <div
                        className={`absolute top-3 right-3 grid h-7 w-7 place-items-center rounded-full transition-all ${
                          isSelected
                            ? "bg-gold text-background scale-100"
                            : "bg-background/80 text-muted-foreground border border-border scale-90"
                        }`}
                      >
                        {isSelected ? <Check className="h-4 w-4 stroke-[3]" /> : <Plus className="h-4 w-4" />}
                      </div>

                      {/* Product Image */}
                      <div className="aspect-square overflow-hidden rounded-xl bg-secondary/40 mb-3 flex items-center justify-center p-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold mb-1 block">
                        {product.category}
                      </span>
                      <h3 className="font-display text-base font-medium text-foreground mb-1">{product.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{product.tagline}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/20">
                      <span className="font-display text-sm font-semibold text-foreground">
                        PKR {product.price.toLocaleString()}
                      </span>
                      <span
                        className={`text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          isSelected
                            ? "bg-gold text-background font-semibold"
                            : "bg-secondary text-foreground hover:bg-gold/20"
                        }`}
                      >
                        {isSelected ? "Selected" : "+ Select"}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bundle Summary Tray */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="rounded-2xl bg-secondary/30 border border-border/60 p-6 shadow-xl space-y-6">
              <div className="border-b border-border/40 pb-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-1 font-bold">Custom Ritual</p>
                <h3 className="font-display text-xl text-foreground">Bundle Summary</h3>
              </div>

              {/* Selected Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {selectedProducts.length === 0 ? (
                  <div className="text-center py-8 px-4 rounded-xl border border-dashed border-border/50 text-muted-foreground text-xs">
                    No products selected yet. Click products on the left to build your custom set.
                  </div>
                ) : (
                  selectedProducts.map((p) => (
                    <div key={p.slug} className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-background/50 border border-border/30">
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={p.image} alt={p.name} className="h-10 w-10 object-contain rounded bg-secondary/40 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">{p.name}</p>
                          <p className="text-[10px] text-muted-foreground">PKR {p.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleProduct(p.slug)}
                        className="text-muted-foreground hover:text-red-400 p-1 shrink-0 transition-colors"
                        title="Remove product"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Discount Notice */}
              {selectedProducts.length > 0 && (
                <div className={`p-3 rounded-xl text-xs flex items-center justify-between ${
                  selectedProducts.length >= 2 ? "bg-gold/10 border border-gold/30 text-gold" : "bg-secondary border border-border text-muted-foreground"
                }`}>
                  <span>{selectedProducts.length >= 2 ? "🎉 10% Bundle Discount Applied!" : "Add 1 more product for 10% OFF"}</span>
                  {selectedProducts.length >= 2 && <span className="font-bold">-10%</span>}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="border-t border-border/40 pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Original Items Total</span>
                  <span>PKR {originalPrice.toLocaleString()}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-gold font-medium">
                    <span>Bundle Discount (10%)</span>
                    <span>- PKR {savings.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-display text-foreground font-semibold pt-2 border-t border-border/20">
                  <span>Final Bundle Total</span>
                  <span className="text-gold">PKR {finalPrice.toLocaleString()}</span>
                </div>
                {savings > 0 && (
                  <p className="text-[11px] text-gold font-semibold text-right">
                    You save PKR {savings.toLocaleString()}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className="pt-2">
                <p className="text-xs uppercase tracking-wider text-gold mb-2 font-semibold">Bundle Quantity</p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:border-gold transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:border-gold transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full rounded-full bg-gold py-4 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-background hover:bg-gold-soft transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98 min-h-[48px]"
              >
                <ShoppingBag className="h-4 w-4" />
                Add Bundle to Cart · PKR {(finalPrice * quantity).toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
