import { createFileRoute } from "@tanstack/react-router";
import { ingredientsShowcase } from "@/lib/products";
import { motion } from "framer-motion";

export const Route = createFileRoute("/ingredients")({
  head: () => ({
    meta: [
      { title: "Ingredients · MIMIbeauty" },
      { name: "description", content: "Clinically-dosed actives and botanical carriers behind every MIMIbeauty formula." },
      { property: "og:title", content: "Ingredients · MIMIbeauty" },
      { property: "og:description", content: "Molecular poetry." },
    ],
  }),
  component: () => (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pt-32 pb-16">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Ingredients</p>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[1] tracking-tight">Molecular poetry.</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">The actives we trust, the carriers we love, and the reason behind every drop.</p>
      </section>
      <section className="mx-auto grid max-w-[1400px] gap-4 px-6 pb-32 md:grid-cols-2 lg:grid-cols-3">
        {ingredientsShowcase.map((it, i) => (
          <motion.div key={it.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-secondary to-background p-8">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gold/20 blur-2xl transition group-hover:bg-gold/40" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute right-6 top-6 h-16 w-16 rounded-full border border-gold/40">
              <div className="absolute inset-2 rounded-full border border-gold/60" />
              <div className="absolute inset-5 rounded-full bg-gold/40" />
            </motion.div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">0{i + 1}</p>
            <div className="absolute inset-x-8 bottom-8">
              <h3 className="font-display text-3xl">{it.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.note}</p>
            </div>
          </motion.div>
        ))}
      </section>
    </>
  ),
});
