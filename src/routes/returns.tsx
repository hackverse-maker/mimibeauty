import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Return Policy · MIMIbeauty" },
      { name: "description", content: "MIMIbeauty's return policy - returns, exchanges, and refunds." },
    ],
  }),
  component: () => (
    <section className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] uppercase tracking-[0.4em] text-gold">Support</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 font-display text-5xl md:text-6xl">Return Policy</motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8 prose prose-invert">
        <h2>30-Day Return Policy</h2>
        <p>We accept returns within 30 days of purchase for products in their original, unopened condition.</p>
        <h2>How to Initiate a Return</h2>
        <p>Contact our concierge team at hello@mimibeauty.com to initiate a return. We will provide you with a return shipping label and instructions.</p>
        <h2>Refunds</h2>
        <p>Refunds are processed within 5-7 business days of receiving the returned item. The refund will be credited to the original payment method.</p>
        <h2>Exchanges</h2>
        <p>We offer exchanges for different sizes or product types. Please contact us to arrange an exchange.</p>
        <h2>Damaged or Defective Products</h2>
        <p>If you receive a damaged or defective product, please contact us immediately. We will replace the item at no additional cost.</p>
      </motion.div>
    </section>
  ),
});
