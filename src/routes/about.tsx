import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { assets } from "@/lib/products";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · MIMIbeauty" },
      { name: "description", content: "MIMIbeauty is a slow, ritualistic skincare house crafting botanical-clinical formulas in small batches." },
      { property: "og:title", content: "About · MIMIbeauty" },
      { property: "og:description", content: "A slow, ritualistic skincare house." },
      { property: "og:image", content: assets.stone },
    ],
  }),
  component: About,
});

const timeline = [
  { year: "2024", label: "Formulation begins in a Copenhagen kitchen." },
  { year: "2025", label: "First batch of Dew tested with 40 dermatologists." },
  { year: "2026", label: "MIMIbeauty opens its doors." },
  { year: "2027", label: "Refillable glass ritual launches worldwide." },
];

export default function About() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 -z-10">
          <img src={assets.stone} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        </div>
        <div className="mx-auto max-w-[1400px] px-6">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] uppercase tracking-[0.4em] text-gold">Our story</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0)" }} transition={{ duration: 1.1 }} className="mt-4 max-w-3xl font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight text-balance">
            A quiet obsession with skin.
          </motion.h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24">
        <p className="font-display text-2xl leading-relaxed md:text-3xl">
          MIMIbeauty was born from a simple question: what if skincare felt as considered as the ritual around it? Every object we make is designed to slow you down — to
          make the two minutes at the sink feel like the best minutes of the day.
        </p>
        <p className="mt-8 text-muted-foreground leading-loose">
          We formulate in small batches with dermatologists in Copenhagen and botanists in Provence. We test on humans, never animals. We use clinically-dosed actives and
          botanical carriers. We refuse fillers, silicones, and theatre. And we design every bottle to live on your shelf for years, not months.
        </p>
      </section>

      <section className="border-t border-border/60 bg-secondary/40 py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <h2 className="font-display text-4xl md:text-5xl">Values, quietly held.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { t: "Clinical honesty", b: "Actives at the dose the study used. No half-measures." },
              { t: "Botanical craft", b: "Cold-pressed. Wild-harvested. Traceable to the field." },
              { t: "Objects that last", b: "Refillable glass, replaceable pumps, no plastic sleeves." },
            ].map((v, i) => (
              <motion.div key={v.t} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl border border-border bg-background p-8">
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold">0{i + 1}</p>
                <h3 className="mt-4 font-display text-2xl">{v.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        <h2 className="font-display text-4xl md:text-5xl">Journey.</h2>
        <ol className="mt-12 space-y-8 border-l border-border pl-8">
          {timeline.map((t, i) => (
            <motion.li key={t.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
              <span className="absolute -left-[42px] top-2 grid h-4 w-4 place-items-center rounded-full border border-gold bg-background">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              </span>
              <p className="font-display text-3xl text-gold">{t.year}</p>
              <p className="mt-1 text-lg text-foreground/85">{t.label}</p>
            </motion.li>
          ))}
        </ol>
      </section>
    </>
  );
}
