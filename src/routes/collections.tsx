import { createFileRoute, Link } from "@tanstack/react-router";
import { collections } from "@/lib/products";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections · MIMIbeauty" },
      { name: "description", content: "Curated skincare collections by MIMIbeauty — Glow, Hydration, Anti-Aging, Sensitive, and Acne Care." },
      { property: "og:title", content: "Collections · MIMIbeauty" },
      { property: "og:description", content: "Curated ritual collections." },
    ],
  }),
  component: () => (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pt-32 pb-12">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Collections</p>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[1] tracking-tight">Rituals, composed.</h1>
      </section>
      <section className="mx-auto grid max-w-[1400px] gap-4 px-6 pb-32 md:grid-cols-2">
        {collections.map((c, i) => (
          <motion.div key={c.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className={`group relative min-h-[420px] overflow-hidden rounded-3xl p-10 bg-gradient-to-br ${c.tone}`}>
            <p className="text-[11px] uppercase tracking-[0.3em] text-background/70">Collection · 0{i + 1}</p>
            <h2 className="mt-6 font-display text-5xl text-background md:text-6xl">{c.name}</h2>
            <Link to="/shop" className="absolute bottom-10 left-10 inline-flex items-center gap-2 rounded-full bg-background/95 px-5 py-2.5 text-sm text-foreground">
              Explore <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ))}
      </section>
    </>
  ),
});
