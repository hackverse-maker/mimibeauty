import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/site/product-card";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

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
    <>
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 pt-24 pb-10 md:pt-32">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gold">The Wardrobe</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0)" }} transition={{ duration: 0.9 }} className="mt-3 font-display text-[clamp(2.5rem,6vw,4rem)] sm:text-[clamp(2.5rem,7vw,6rem)] leading-[1] tracking-tight">
          Shop the ritual
        </motion.h1>
        <p className="mt-4 max-w-lg text-sm sm:text-base text-muted-foreground">Four objects. Endless combinations. Every formula clinically dosed and small-batch bottled.</p>
      </section>

      <section className="sticky top-[73px] z-30 border-y border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3 px-4 sm:px-6 py-4">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-2">
            <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className="w-full bg-transparent text-sm outline-none min-w-0" />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm">
            <option value="featured">Featured</option>
            <option value="price-asc">Price · Low</option>
            <option value="price-desc">Price · High</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div className="mx-auto flex max-w-[1400px] gap-2 overflow-x-auto px-4 sm:px-6 pb-4 text-xs scrollbar-hide">
          {chips.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-full border px-4 py-1.5 uppercase tracking-widest transition ${cat === c ? "border-gold bg-gold text-background" : "border-border hover:border-gold/60"}`}>{c}</button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 py-14">
        {filtered.length === 0 ? (
          <p className="py-24 text-center text-muted-foreground">No products match this ritual — yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-14 sm:gap-x-6">
            {filtered.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        )}
      </section>
    </>
  );
}
