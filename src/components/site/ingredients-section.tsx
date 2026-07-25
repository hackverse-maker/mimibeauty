import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { ingredientsShowcase } from "@/lib/products";

const ease = [0.22, 1, 0.36, 1] as const;
const GOLD = "#C9A86A";

function MoleculeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx="16" cy="8" r="2.2" stroke={GOLD} strokeWidth="1.2" />
      <circle cx="8" cy="22" r="2.2" stroke={GOLD} strokeWidth="1.2" />
      <circle cx="24" cy="22" r="2.2" stroke={GOLD} strokeWidth="1.2" />
      <circle cx="16" cy="16" r="1.6" fill={GOLD} opacity="0.85" />
      <path d="M16 10.2V14.2M14.6 17.2L10 20.4M17.4 17.2L22 20.4" stroke={GOLD} strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function IngredientCard({
  item,
  index,
}: {
  item: (typeof ingredientsShowcase)[number];
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const glowX = useTransform(sx, [-40, 40], ["20%", "80%"]);
  const glowY = useTransform(sy, [-40, 40], ["20%", "80%"]);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const cx = e.clientX;
    const cy = e.clientY;
    // Soft parallax without layout thrash
    const r = el.getBoundingClientRect();
    mx.set(((cx - r.left) / r.width - 0.5) * 20);
    my.set(((cy - r.top) / r.height - 0.5) * 20);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease }}
    >
      <Link
        ref={ref}
        to="/ingredients"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="ingredient-card group relative flex min-h-[280px] flex-col overflow-hidden rounded-[24px] p-7 md:min-h-[300px] md:p-8"
      >
        {/* Moving gradient border */}
        <span className="ingredient-border" aria-hidden />

        {/* Soft mouse parallax glow */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-[600ms] group-hover:opacity-100"
          style={{
            left: glowX,
            top: glowY,
            background: `radial-gradient(circle, ${GOLD}33, transparent 70%)`,
            x: sx,
            y: sy,
          }}
        />

        {/* Floating shimmer */}
        <span className="ingredient-shimmer" aria-hidden />

        <div className="relative z-10 flex items-start justify-between">
          <span className="font-display text-sm tracking-[0.2em] text-[#C9A86A]/80">
            {String(index + 1).padStart(2, "0")}
          </span>
          <MoleculeIcon className="h-8 w-8 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className="relative z-10 mt-auto pt-16">
          <h3 className="font-display text-[1.85rem] leading-tight tracking-tight text-white md:text-[2.1rem]">
            {item.name}
          </h3>
          <p className="mt-2 text-sm text-white/50">{item.note}</p>
          <div className="mt-5 flex items-center justify-between gap-3">
            <span className="rounded-full border border-[#C9A86A]/25 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#C9A86A]/90">
              {item.category}
            </span>
            <span className="grid h-8 w-8 place-items-center text-[#C9A86A]/70 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-[#C9A86A]">
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function IngredientsSection() {
  return (
    <section className="section-cv relative overflow-hidden bg-[#050505] py-16 md:py-28 lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(201,168,106,0.12), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="text-[11px] font-medium uppercase tracking-[0.4em] text-[#C9A86A]"
          >
            Ingredients
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.08, ease }}
            className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.1] tracking-tight text-white text-balance"
          >
            The Science Behind Every Drop
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-white/50"
          >
            Clinically selected active ingredients that nourish, protect and restore your skin
            naturally.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mt-20 md:gap-6">
          {ingredientsShowcase.map((item, i) => (
            <IngredientCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
