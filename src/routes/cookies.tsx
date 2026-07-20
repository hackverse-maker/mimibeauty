import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy · MIMIbeauty" },
      { name: "description", content: "MIMIbeauty's cookie policy - how we use cookies on our website." },
    ],
  }),
  component: () => (
    <section className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] uppercase tracking-[0.4em] text-gold">Legal</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 font-display text-5xl md:text-6xl">Cookie Policy</motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8 prose prose-invert">
        <p>Last updated: January 2026</p>
        <h2>What Are Cookies</h2>
        <p>Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience.</p>
        <h2>How We Use Cookies</h2>
        <p>We use cookies to remember your preferences, analyze site traffic, and personalize content. We use both session cookies and persistent cookies.</p>
        <h2>Managing Cookies</h2>
        <p>You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website.</p>
        <h2>Third-Party Cookies</h2>
        <p>We may use third-party services that use cookies for analytics and advertising purposes.</p>
      </motion.div>
    </section>
  ),
});
