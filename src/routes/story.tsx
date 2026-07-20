import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { assets } from "@/lib/products";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story · MIMIbeauty" },
      { name: "description", content: "The story of MIMIbeauty - from a Copenhagen kitchen to a global ritual." },
      { property: "og:image", content: assets.stone },
    ],
  }),
  component: () => (
    <section className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] uppercase tracking-[0.4em] text-gold">Our Story</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 font-display text-5xl md:text-6xl">From Kitchen to Ritual</motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8 prose prose-invert">
        <p>It started in a small Copenhagen kitchen in 2024. A chemist, a botanist, and a shared obsession with slow beauty.</p>
        <p>We asked ourselves a simple question: what if skincare felt as considered as the ritual around it?</p>
        <p>Three years of formulation. Forty dermatologists. Hundreds of prototypes. One uncompromising standard: clinical efficacy without compromise.</p>
        <p>Today, MIMIbeauty is more than products. It's a practice. A moment of intention in a chaotic world. A reminder that the best things in life take time.</p>
        <p>This is just the beginning of our ritual. We invite you to be part of it.</p>
      </motion.div>
    </section>
  ),
});
