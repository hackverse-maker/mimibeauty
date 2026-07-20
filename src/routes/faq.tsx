import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ · MIMIbeauty" },
      { name: "description", content: "Frequently asked questions about MIMIbeauty products, shipping, and returns." },
    ],
  }),
  component: () => (
    <section className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] uppercase tracking-[0.4em] text-gold">Support</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 font-display text-5xl md:text-6xl">FAQ</motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8 space-y-8">
        {[
          { q: "Are your products vegan?", a: "Yes, all MIMIbeauty products are 100% vegan and cruelty-free." },
          { q: "How long until I see results?", a: "Most customers notice improvements in skin texture and hydration within 2-4 weeks of consistent use." },
          { q: "Can I use multiple products together?", a: "Yes, our products are formulated to work synergistically. We recommend following our suggested ritual for best results." },
          { q: "Are your products safe for sensitive skin?", a: "All our products are dermatologist-tested and formulated for sensitive skin. However, we always recommend patch testing new products." },
          { q: "Do you ship internationally?", a: "Yes, we ship to select countries. Shipping times and costs vary by destination." },
          { q: "What is your return policy?", a: "We accept returns within 30 days for unopened products in their original condition." },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }} className="border-b border-border pb-6">
            <h3 className="font-display text-xl">{item.q}</h3>
            <p className="mt-2 text-muted-foreground">{item.a}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  ),
});
