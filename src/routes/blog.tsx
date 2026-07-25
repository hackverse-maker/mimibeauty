import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { assets } from "@/lib/products";

const posts = [
  { title: "The barrier repair diary", excerpt: "How ceramides rebuild the moisture barrier in 28 days.", tag: "Journal", img: assets.water },
  { title: "On slow beauty", excerpt: "Why the ritual matters as much as the formula.", tag: "Philosophy", img: assets.stone },
  { title: "A guide to layering", excerpt: "The right order for serums, oils, and moisturisers.", tag: "How-to", img: assets.lineup },
  { title: "Notes on rose absolute", excerpt: "Why we cold-press instead of steam-distill.", tag: "Ingredients", img: assets.halo },
];

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal · MIMIbeauty" },
      { name: "description", content: "The MIMIbeauty journal — essays on ritual, ingredients, and the science of slow skincare." },
      { property: "og:title", content: "Journal · MIMIbeauty" },
      { property: "og:description", content: "Essays on ritual and slow skincare." },
    ],
  }),
  component: () => (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pt-20 pb-8 md:pt-32 md:pb-12">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Journal</p>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[1] tracking-tight">Read, slowly.</h1>
      </section>
      <section className="mx-auto grid max-w-[1400px] gap-6 px-6 pb-16 md:pb-32 md:grid-cols-2">
        {posts.map((p, i) => (
          <motion.article key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group overflow-hidden rounded-3xl border border-border bg-background hover-lift">
            <div className="aspect-[16/10] overflow-hidden">
              <img src={p.img} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="p-5 md:p-8">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{p.tag}</p>
              <h2 className="mt-3 font-display text-3xl">{p.title}</h2>
              <p className="mt-2 text-muted-foreground">{p.excerpt}</p>
            </div>
          </motion.article>
        ))}
      </section>
    </>
  ),
});
