"use client";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, type MouseEvent } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const GOLD = "#C9A86A";

const rituals = [
  {
    src: "/media__1784439898596.jpg",
    name: "Dew",
    description: "Barrier repair in morning light.",
    slug: "dew",
    className: "md:col-span-2 md:row-span-2 min-h-[320px] md:min-h-[560px]",
  },
  {
    src: "/media__1784439898491.jpg",
    name: "Veil",
    description: "Silken finish for every length.",
    slug: "veil",
    className: "min-h-[300px] aspect-[3/4] md:translate-y-8",
  },
  {
    src: "/media__1784439898781.jpg",
    name: "Herbé",
    description: "Scalp ritual, rooted in botanicals.",
    slug: "herbe",
    className: "min-h-[320px] aspect-[4/5] md:-translate-y-4",
  },
  {
    src: "/media__1784439898541.jpg",
    name: "Hálo",
    description: "Satin glow for body & air.",
    slug: "halo",
    className: "md:col-span-2 min-h-[260px] aspect-[16/10] md:translate-y-6",
  },
  {
    src: "/videos/scene_hands.png",
    name: "The Hold",
    description: "Every gesture, intentional.",
    slug: "dew",
    className: "min-h-[300px] aspect-[3/4] md:-translate-y-10",
  },
  {
    src: "/videos/hero-openair.png",
    name: "Open Air",
    description: "Glow carried into the day.",
    slug: "halo",
    className: "min-h-[320px] aspect-[4/5] md:translate-y-4",
  },
  {
    src: "/media__1784439898181.jpg",
    name: "The Wardrobe",
    description: "Four formulas. Endless rituals.",
    slug: "dew",
    className: "md:col-span-2 min-h-[220px] aspect-[21/9]",
  },
] as const;

function RitualCard({
  item,
  index,
  forceClass,
}: {
  item: (typeof rituals)[number];
  index: number;
  forceClass?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(380px circle at ${mx}% ${my}%, ${GOLD}28, transparent 55%)`;
  const raf = useRef(0);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const cx = e.clientX;
    const cy = e.clientY;
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const r = el.getBoundingClientRect();
      mx.set(((cx - r.left) / r.width) * 100);
      my.set(((cy - r.top) / r.height) * 100);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.2 }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.06, 0.36), ease }}
      className={forceClass ?? item.className}
    >
      <Link
        ref={ref}
        href={`/product/${item.slug}`}
        onMouseMove={onMove}
        className="ritual-card group relative block h-full min-h-[280px] overflow-hidden rounded-[28px]"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glow }}
        />

        <img
          src={item.src}
          alt={item.name}
          loading="lazy"
          decoding="async"
          // Hover zoom via CSS transform — no continuous JS animation
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/12 via-transparent to-transparent opacity-35"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background/75 via-background/10 to-transparent"
        />

        <div className="absolute inset-0 z-30 flex flex-col justify-end p-6 md:p-8">
          <div className="translate-y-0 opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
            <p className="font-display text-2xl text-white md:text-3xl">{item.name}</p>
            <p className="mt-1 max-w-xs text-sm text-white/65">{item.description}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold">
              Discover Ritual <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function RitualsGallery() {
  return (
    <section
      id="rituals"
      className="section-cv relative overflow-hidden bg-background py-20 md:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 70% 30%, rgba(201,168,106,0.08), transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-medium uppercase tracking-[0.4em] text-gold"
          >
            Rituals
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease }}
            className="mt-5 font-display text-[clamp(3rem,6vw,5rem)] leading-[1.05] tracking-tight text-[#F6F2EB]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Rituals, <em className="italic text-gold">in the Wild.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.7, ease }}
            className="mx-auto mt-6 max-w-md text-[16px] leading-relaxed text-white/80 font-light"
          >
            Experience skincare as a daily ritual, inspired by nature and crafted with science.
          </motion.p>
        </div>

        <div className="mt-20 hidden gap-5 md:mt-24 md:grid md:grid-cols-4 md:gap-6">
          {rituals.map((item, i) => (
            <RitualCard key={`${item.src}-${i}`} item={item} index={i} />
          ))}
        </div>

        <div className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {rituals.map((item, i) => (
            <div key={`m-${item.src}-${i}`} className="w-[78vw] shrink-0 snap-center">
              <RitualCard item={item} index={i} forceClass="aspect-[3/4] min-h-[360px]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
