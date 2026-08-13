"use client";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const GOLD = "#C9A86A";

function MoleculeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <circle cx="16" cy="8" r="2.2" stroke={GOLD} strokeWidth="1.2" />
      <circle cx="8" cy="22" r="2.2" stroke={GOLD} strokeWidth="1.2" />
      <circle cx="24" cy="22" r="2.2" stroke={GOLD} strokeWidth="1.2" />
      <circle cx="16" cy="16" r="1.6" fill={GOLD} opacity="0.85" />
      <path
        d="M16 10.2V14.2M14.6 17.2L10 20.4M17.4 17.2L22 20.4"
        stroke={GOLD}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

const newIngredients = [
  {
    name: "Rosehip Oil",
    note: "Nature’s retinol, rich in antioxidants and essential fatty acids to support smoother, brighter,\nhealthier-looking skin.",
    category: "RENEWAL",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80",
  },
  {
    name: "Cyperus Rotundus Oil",
    note: "An antioxidant-rich botanical that helps calm, strengthen, and support the skin’s natural\nbarrier for a balanced complexion.",
    category: "SOOTHING",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80",
  },
  {
    name: "Argan Oil",
    note: "Rich in vitamin E and essential fatty acids to deeply nourish, soften, and strengthen the skin\nfor a smooth, healthy-looking glow.",
    category: "NOURISHING",
    image: "/images/ingredients/argan.jpg",
  },
  {
    name: "Castor Oil",
    note: "Rich in essential fatty acids to deeply condition the scalp and hair while supporting softer,\nstronger, healthier-looking strands.",
    category: "CONDITIONING",
    image: "/images/ingredients/castor.jpg",
  },
  {
    name: "Jojoba Oil",
    note: "Lightweight and fast-absorbing, Jojoba Oil helps smooth, soften, and protect hair while\nlocking in lasting moisture without weighing it down",
    category: "BALANCING",
    image: "/images/ingredients/jojoba.jpg",
  },
  {
    name: "Vitamin E",
    note: "An antioxidant-rich vitamin that helps protect, condition, and strengthen hair while enhancing\nsoftness, moisture, and natural shine.",
    category: "ANTIOXIDANT",
    image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80",
  },
  {
    name: "Jaborandi Root Extract",
    note: "Traditionally valued in botanical hair care to help nourish the scalp and support stronger,\nhealthier-looking hair.",
    category: "STRENGTHENING",
    image: "/images/ingredients/jaborandi.jpg",
  },
  {
    name: "Lemongrass Botanical Infusion",
    note: "An invigorating botanical infusion that helps refresh, rebalance, and purify the scalp for a\nclean, revitalised feel",
    category: "PURIFYING",
    image: "/images/ingredients/lemongrass.jpg",
  },
  {
    name: "Mimi Signature Accord",
    note: "An exclusive fragrance composition developed to give every formula its distinctive, elegant\nidentity .",
    category: "FRAGRANCE",
    image: "/images/ingredients/signature.jpg",
  },
];

function IngredientCard({ item, index }: { item: (typeof newIngredients)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      <div className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-gold/20 bg-[#121A15] p-6 transition-colors hover:border-gold/50">
        <div className="flex items-start justify-between relative z-10">
          <span className="font-display text-xs tracking-wider text-gold/80">
            {String(index + 1).padStart(2, "0")}
          </span>
          <MoleculeIcon className="h-6 w-6 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 -right-4 h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden border border-gold/10 opacity-90 transition-transform duration-700 group-hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#121A15] opacity-40 z-10" />
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        </div>

        <div className="relative z-10 mt-12 pr-28 md:pr-32">
          <h3
            className="text-2xl text-[#F5F2EC] mb-3"
            style={{ fontFamily: "var(--font-cormorant, serif)" }}
          >
            {item.name}
          </h3>
          <p className="text-[13px] leading-relaxed text-[#D8D2C8] opacity-80 whitespace-pre-line mb-6">
            {item.note.split("\n").map((line, idx) => (
              <span key={idx}>
                {line}
                {idx !== item.note.split("\n").length - 1 && <br />}
              </span>
            ))}
          </p>
          <div className="inline-flex items-center justify-center rounded-full border border-gold/40 px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] text-gold transition-colors group-hover:border-gold">
            {item.category}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function IngredientsSection() {
  return (
    <section className="relative overflow-hidden bg-[#0A100C] py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-[1400px] px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold"
          >
            INGREDIENTS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.1] tracking-tight text-[#F5F2EC]"
            style={{ fontFamily: "var(--font-cormorant, serif)" }}
          >
            Nature, Perfected
            <br className="hidden md:block" />
            <em className="italic text-gold">by Formulation</em>
          </motion.h2>

          <div className="flex items-center justify-center gap-4 my-8">
            <svg width="40" height="12" viewBox="0 0 40 12" fill="none" className="text-gold">
              <path d="M10 6H30" stroke="currentColor" strokeWidth="0.5" />
              <path d="M20 6C20 4 22 2 24 2C24 4 22 6 20 6Z" fill="currentColor" />
              <path d="M20 6C20 8 18 10 16 10C16 8 18 6 20 6Z" fill="currentColor" />
              <path d="M20 6C20 4 18 2 16 2C16 4 18 6 20 6Z" fill="currentColor" />
              <path d="M20 6C20 8 22 10 24 10C24 8 22 6 20 6Z" fill="currentColor" />
            </svg>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto max-w-2xl text-[16px] md:text-[20px] leading-relaxed text-[#D8D2C8] opacity-90"
          >
            Every ingredient is carefully selected to
            <br className="hidden md:block" />
            nourish, strengthen, and support healthy skin and hair.
          </motion.p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {newIngredients.map((item, i) => (
            <IngredientCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
