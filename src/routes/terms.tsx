import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions · MIMIbeauty" },
      { name: "description", content: "MIMIbeauty's terms and conditions of use." },
    ],
  }),
  component: () => (
    <section className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] uppercase tracking-[0.4em] text-gold">Legal</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 font-display text-5xl md:text-6xl">Terms & Conditions</motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8 prose prose-invert">
        <p>Last updated: January 2026</p>
        <h2>Acceptance of Terms</h2>
        <p>By accessing and using MIMIbeauty's website, you accept and agree to be bound by these terms and conditions.</p>
        <h2>Products and Pricing</h2>
        <p>All prices are in USD unless otherwise stated. We reserve the right to modify prices or discontinue products without notice.</p>
        <h2>Orders and Payment</h2>
        <p>We accept various payment methods. All orders are subject to availability and confirmation of the order price.</p>
        <h2>Shipping and Returns</h2>
        <p>Please refer to our shipping and return policies for detailed information.</p>
        <h2>Intellectual Property</h2>
        <p>All content on this website, including text, images, and designs, is the property of MIMIbeauty and protected by copyright laws.</p>
      </motion.div>
    </section>
  ),
});
