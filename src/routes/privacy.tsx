import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy · MIMIbeauty" },
      { name: "description", content: "MIMIbeauty's privacy policy - how we collect, use, and protect your personal information." },
    ],
  }),
  component: () => (
    <section className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] uppercase tracking-[0.4em] text-gold">Legal</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 font-display text-5xl md:text-6xl">Privacy Policy</motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8 prose prose-invert">
        <p>Last updated: January 2026</p>
        <h2>Information We Collect</h2>
        <p>We collect information you provide directly, such as when you create an account, make a purchase, or contact us. This may include your name, email address, shipping address, and payment information.</p>
        <h2>How We Use Your Information</h2>
        <p>We use your information to process orders, send you updates about your orders, provide customer support, and send you marketing communications if you've opted in.</p>
        <h2>Data Security</h2>
        <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, or destruction.</p>
        <h2>Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal information. Contact us at hello@mimibeauty.com for any privacy-related requests.</p>
      </motion.div>
    </section>
  ),
});
