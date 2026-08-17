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

const faceIngredients = [
  {
    name: "Thyme / Thymol",
    category: "ANTI-ACNE",
    note: "A botanical extract rich in thymol, known for its antimicrobial properties. Helps support a clearer-looking complexion and may help reduce the appearance of blemish-prone skin. Designed to work alongside the skin's natural defence mechanisms.",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80",
  },
  {
    name: "Black Seed Oil",
    category: "ANTIOXIDANT",
    note: "Rich in thymoquinone and essential fatty acids, Black Seed Oil helps protect the skin from oxidative stress. Supports a balanced, healthier-looking complexion while helping to maintain the skin's natural resilience.",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80",
  },
  {
    name: "Rosehip — Natural Retinoid",
    category: "RENEWAL",
    note: "Rosehip contains trans-retinoic acid precursors — a natural retinoid analog — alongside a rich concentration of essential fatty acids. Supports skin cell renewal and helps promote a smoother, more even-looking skin tone over time.",
    image: "https://images.unsplash.com/photo-1548021682-1720ed403a5b?auto=format&fit=crop&q=80",
  },
  {
    name: "Glycolic Acid",
    category: "EXFOLIATING",
    note: "A gentle alpha-hydroxy acid derived from sugar cane. Helps support the removal of dull surface cells to reveal a fresher, brighter-looking complexion. Designed to contribute to a smooth, healthy-looking glow with regular use.",
    image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80",
  },
  {
    name: "Jojoba — Gadoleic Acid",
    category: "BALANCING",
    note: "Structurally similar to the skin's own sebum, making it one of nature's most effective balancing oils. Lightweight and fast-absorbing, it helps maintain a healthy moisture balance without clogging pores, while helping to protect the skin from oxidative stress.",
    image: "https://images.unsplash.com/photo-1611078449921-2a134a413d42?auto=format&fit=crop&q=80",
  },
  {
    name: "Argan & Endogenous Squalene",
    category: "NOURISHING",
    note: "Argan oil provides deep nourishment through vitamin E and essential fatty acids, helping to soften and strengthen the skin's surface. Combined with squalane — a lightweight lipid naturally found in skin — it helps support the skin barrier for a smooth, healthy-looking glow.",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80",
  },
  {
    name: "Cyperus — Alpha Cyperone",
    category: "SOOTHING",
    note: "Extracted from Cyperus rotundus root, alpha cyperone is a naturally occurring sesquiterpene rich in antioxidants. Helps protect the skin from oxidative stress and supports a more balanced, calm-looking complexion. Also used in formulations designed to help manage scalp follicle activity.",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80",
  },
];

const hairIngredients = [
  {
    name: "Castor Oil — Ricinoleic Acid",
    category: "CONDITIONING",
    note: "Rich in ricinoleic acid, castor oil is designed to help support the scalp environment and microcirculation. Helps condition the hair shaft, and is included in formulations that aim to support a healthy-looking scalp while contributing to stronger-feeling strands.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80",
  },
  {
    name: "Jaborandi — Pilocarpine",
    category: "STRENGTHENING",
    note: "Jaborandi root extract contains pilocarpine, a compound traditionally used to support scalp health. Helps stimulate scalp microcirculation and revitalize hair follicles. Designed to support stronger-looking, healthier hair and help reduce the appearance of excessive hair fall over time.",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80",
  },
  {
    name: "Lemongrass — Citral",
    category: "PURIFYING",
    note: "Lemongrass botanical infusion, rich in citral, provides anti-dandruff support and helps regulate excess scalp sebum. Its deep-cleansing properties help maintain a refreshed scalp environment while helping to reduce the appearance of scalp discomfort and irritation.",
    image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80",
  },
  {
    name: "Vitamin E — Tocopherols",
    category: "ANTIOXIDANT",
    note: "A powerful antioxidant that helps protect the scalp and hair from oxidative stress caused by environmental aggressors. Helps maintain the hair cuticle and supports moisture retention, helping to reduce water loss from both the scalp and hair strands for softer, more nourished-looking hair.",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80",
  },
];

function IngredientCard({
  item,
  index,
}: {
  item: (typeof faceIngredients)[0];
  index: number;
}) {
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
          <p className="text-[13px] leading-relaxed text-[#D8D2C8] opacity-80 mb-6">
            {item.note}
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
        {/* Section header */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold"
          >
            ACTIVE INGREDIENTS
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

        {/* Face Actives */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-10"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold/70 mb-1">
                DEW — Face Serum
              </p>
              <h3
                className="text-2xl sm:text-3xl text-[#F5F2EC]"
                style={{ fontFamily: "var(--font-cormorant, serif)" }}
              >
                Face Actives
              </h3>
            </div>
            <div className="flex-1 h-px" style={{ background: "rgba(207,167,106,0.2)" }} />
          </motion.div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {faceIngredients.map((item, i) => (
              <IngredientCard key={item.name} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 flex items-center gap-6">
          <div className="flex-1 h-px" style={{ background: "rgba(207,167,106,0.15)" }} />
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-gold opacity-40">
            <path d="M14 1 Q 20 10 14 14 Q 8 18 14 27" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
            <path d="M1 14 Q 10 8 14 14 Q 18 20 27 14" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
          <div className="flex-1 h-px" style={{ background: "rgba(207,167,106,0.15)" }} />
        </div>

        {/* Hair Actives */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-10"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold/70 mb-1">
                VEIL + HERBÉ — Hair & Scalp
              </p>
              <h3
                className="text-2xl sm:text-3xl text-[#F5F2EC]"
                style={{ fontFamily: "var(--font-cormorant, serif)" }}
              >
                Hair Actives
              </h3>
            </div>
            <div className="flex-1 h-px" style={{ background: "rgba(207,167,106,0.2)" }} />
          </motion.div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {hairIngredients.map((item, i) => (
              <IngredientCard key={item.name} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
