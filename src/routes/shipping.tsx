import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping Policy · MIMIbeauty" },
      { name: "description", content: "MIMIbeauty's shipping policy - delivery times, costs, and procedures." },
    ],
  }),
  component: () => (
    <section className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] uppercase tracking-[0.4em] text-gold">Support</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 font-display text-5xl md:text-6xl">Shipping Policy</motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8 prose prose-invert">
        <h2>Complimentary Shipping</h2>
        <p>We offer free carbon-neutral delivery on orders over $75 within the continental United States.</p>
        <h2>Processing Time</h2>
        <p>Orders are typically processed within 1-2 business days. You will receive a confirmation email with tracking information once your order ships.</p>
        <h2>Delivery Times</h2>
        <p>Standard shipping: 5-7 business days. Express shipping: 2-3 business days. International shipping: 7-14 business days.</p>
        <h2>International Orders</h2>
        <p>We ship to select countries. International orders may be subject to customs duties and taxes, which are the responsibility of the recipient.</p>
      </motion.div>
    </section>
  ),
});
