import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/site/product-card";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop · MIMIbeauty" },
      { name: "description", content: "Shop MIMIbeauty's ritualistic skincare and body oils. Small-batch luxury formulas." },
      { property: "og:title", content: "Shop · MIMIbeauty" },
      { property: "og:description", content: "Ritualistic skincare and body oils." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (cat !== "All") list = list.filter((p) => p.category === cat);
    if (q.trim()) list = list.filter((p) => (p.name + p.tagline).toLowerCase().includes(q.toLowerCase()));
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
    }
    return list;
  }, [q, cat, sort]);

  const chips = ["All", ...Array.from(new Set(products.map((p) => p.category))), ...categories.filter((c) => !products.some((p) => p.category === c))];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-gold/20 selection:text-gold">
      {/* Page Title & Intro */}
      <section className="mx-auto max-w-[1800px] px-6 lg:px-12 xl:px-20 pt-28 pb-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
          <span className="h-[1px] w-12 bg-gold/60" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-gold">The Collection</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.15 }} className="mt-6 font-display text-[clamp(2.5rem,6.5vw,6rem)] leading-[0.95] tracking-tighter">
          Shop the ritual
        </motion.h1>
        <p className="mt-4 max-w-lg text-lg text-foreground/60 font-light leading-relaxed">
          Four objects. Endless combinations. Every formula clinically dosed and small-batch bottled.
        </p>
      </section>

      {/* Premium Filters Bar */}
      <section className="sticky top-[68px] z-30 border-y border-white/5 bg-black/80 backdrop-blur-xl md:top-[76px] py-4">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12 xl:px-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Minimalist Search & Filter Toggle */}
            <div className="flex items-center gap-4 flex-1 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input 
                  type="text"
                  value={q} 
                  onChange={(e) => setQ(e.target.value)} 
                  placeholder="Search products..." 
                  className="w-full rounded-full border border-white/10 bg-white/[0.02] py-3.5 pl-11 pr-6 text-sm outline-none placeholder:text-white/30 focus:border-gold/40 transition-colors" 
                />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)} 
                className={`flex h-12 items-center justify-center gap-2 rounded-full border px-5 text-xs font-semibold uppercase tracking-wider transition ${showFilters ? "border-gold bg-gold text-black" : "border-white/10 bg-white/[0.02] text-white hover:border-white/30"}`}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Categories</span>
              </button>
            </div>

            {/* Custom Premium Sort Dropdown */}
            <div className="flex items-center gap-3 self-end md:self-auto">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Sort By</span>
              <div className="relative">
                <select 
                  value={sort} 
                  onChange={(e) => setSort(e.target.value as typeof sort)} 
                  className="appearance-none rounded-full border border-white/10 bg-white/[0.02] py-3.5 pl-6 pr-12 text-xs font-medium uppercase tracking-widest text-white outline-none cursor-pointer focus:border-gold/40 transition-colors"
                >
                  <option value="featured" className="bg-black text-white">Featured</option>
                  <option value="price-asc" className="bg-black text-white">Price · Low to High</option>
                  <option value="price-desc" className="bg-black text-white">Price · High to Low</option>
                  <option value="rating" className="bg-black text-white">Rating</option>
                </select>
                <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white/50 text-[8px]">▼</div>
              </div>
            </div>
          </div>

          {/* Animate-in premium category chips */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pt-6 pb-2">
                  {chips.map((c) => (
                    <button 
                      key={c} 
                      onClick={() => setCat(c)} 
                      className={`shrink-0 rounded-full border px-5 py-3 text-[10px] font-semibold uppercase tracking-widest transition-all duration-300 ${cat === c ? "border-gold bg-gold text-black shadow-[0_4px_20px_-5px_rgba(201,168,106,0.3)]" : "border-white/5 bg-white/[0.01] text-foreground/75 hover:border-white/20 hover:text-white"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mx-auto max-w-[1800px] px-6 lg:px-12 xl:px-20 py-16">
        {filtered.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-lg text-foreground/40 font-light">No products match this ritual — yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-16 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
