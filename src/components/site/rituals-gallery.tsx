import { Link, ClientOnly } from "@tanstack/react-router";
import { ArrowRight, Leaf, Rabbit, ShieldCheck, Heart, Recycle } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { products } from "@/lib/products";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const GOLD = "#C9A86A";

const features = [
  { icon: Leaf, title: "Natural Ingredients" },
  { icon: Rabbit, title: "Cruelty Free" },
  { icon: ShieldCheck, title: "Paraben Free" },
  { icon: Heart, title: "Handmade With Care" },
  { icon: Recycle, title: "Sustainable Beauty" },
];

const productGallery = [
  {
    products: [products[0], products[1]], // Dew, Veil
    labels: ["NOURISH", "RENEW"],
    shape: "rounded-rectangle",
    className: "md:col-span-1 md:row-span-1 min-h-[280px] md:min-h-[340px]",
  },
  {
    products: [products[3]], // Hálo
    labels: ["REVIVE"],
    shape: "circular",
    className: "md:col-span-1 md:row-span-1 aspect-square max-w-[280px] mx-auto",
  },
  {
    products: [products[2], products[0]], // Herbé, Dew
    labels: ["BALANCE", "GLOW"],
    shape: "rounded-rectangle",
    className: "md:col-span-1 md:row-span-1 min-h-[280px] md:min-h-[340px]",
  },
  {
    products: [products[1], products[3]], // Veil, Hálo
    labels: ["RENEW", "REVIVE"],
    shape: "rounded-rectangle",
    className: "md:col-span-1 md:row-span-1 min-h-[280px] md:min-h-[340px]",
  },
  {
    products: [products[0]], // Dew
    labels: ["NOURISH"],
    shape: "circular",
    className: "md:col-span-1 md:row-span-1 aspect-square max-w-[280px] mx-auto",
  },
  {
    products: [products[2], products[1]], // Herbé, Veil
    labels: ["BALANCE", "RENEW"],
    shape: "rounded-rectangle",
    className: "md:col-span-1 md:row-span-1 min-h-[280px] md:min-h-[340px]",
  },
] as const;

function ProductGalleryCard({
  item,
  index,
}: {
  item: (typeof productGallery)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
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

  const isCircular = item.shape === "circular";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.2 }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.08, 0.4), ease }}
      className={item.className}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        className={`ritual-card group relative h-full min-h-[280px] overflow-hidden ${
          isCircular ? "rounded-full" : "rounded-[32px]"
        }`}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glow }}
        />

        {/* Product images */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 p-6">
          {item.products.map((product, i) => (
            <Link
              key={product.slug}
              to="/product/$slug"
              params={{ slug: product.slug }}
              className="relative transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            >
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className={`object-cover ${
                  isCircular
                    ? "h-full w-full rounded-full"
                    : "h-full w-auto max-h-[200px] rounded-2xl"
                }`}
              />
              {item.labels[i] && (
                <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-medium uppercase tracking-[0.3em] text-white/90 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
                  {item.labels[i]}
                </p>
              )}
            </Link>
          ))}
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/12 via-transparent to-transparent opacity-35"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
        />
      </div>
    </motion.div>
  );
}

export function RitualsGallery() {
  return (
    <ClientOnly fallback={<RitualsGalleryFallback />}>
      {() => <RitualsGalleryAnimated />}
    </ClientOnly>
  );
}

function RitualsGalleryFallback() {
  return (
    <section id="rituals" className="section-cv relative overflow-hidden bg-[#0a1a0f] py-20 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 70% 30%, rgba(201,168,106,0.06), transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.5em] text-[#C9A86A]">
            MINIHAUTY
          </p>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-[#F5F0E8]">
            Rituals, in the Wild.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-[#C9A86A]/80">
            Skincare inspired by nature.
          </p>
        </div>

        {/* Product Gallery Grid */}
        <div className="mt-20 hidden gap-6 md:mt-28 md:grid md:grid-cols-3 md:gap-8">
          {productGallery.map((item, i) => (
            <div key={`gallery-${i}`} className={item.className}>
              <div className={`ritual-card group relative h-full min-h-[280px] overflow-hidden ${
                item.shape === "circular" ? "rounded-full" : "rounded-[32px]"
              }`}>
                <div className="absolute inset-0 flex items-center justify-center gap-3 p-6">
                  {item.products.map((product, i) => (
                    <Link
                      key={product.slug}
                      to="/product/$slug"
                      params={{ slug: product.slug }}
                      className="relative transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className={`object-cover ${
                          item.shape === "circular"
                            ? "h-full w-full rounded-full"
                            : "h-full w-auto max-h-[200px] rounded-2xl"
                        }`}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Product Gallery */}
        <div className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {productGallery.map((item, i) => (
            <div key={`m-gallery-${i}`} className="w-[85vw] shrink-0 snap-center">
              <div className={`ritual-card group relative h-full min-h-[280px] overflow-hidden ${
                item.shape === "circular" ? "rounded-full" : "rounded-[32px]"
              }`}>
                <div className="absolute inset-0 flex items-center justify-center gap-3 p-6">
                  {item.products.map((product, i) => (
                    <Link
                      key={product.slug}
                      to="/product/$slug"
                      params={{ slug: product.slug }}
                      className="relative transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className={`object-cover ${
                          item.shape === "circular"
                            ? "h-full w-full rounded-full"
                            : "h-full w-auto max-h-[200px] rounded-2xl"
                        }`}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-24 md:mt-32">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {features.map((feature, i) => (
              <div key={feature.title} className="flex flex-col items-center text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-[#C9A86A]/40 text-[#C9A86A]">
                  <feature.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.3em] text-[#C9A86A]/90">
                  {feature.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* M Logo */}
        <div className="mt-20 flex justify-center md:mt-24">
          <div className="grid h-20 w-20 place-items-center rounded-full border-2 border-[#C9A86A]/30 bg-[#C9A86A]/5">
            <span className="font-display text-3xl text-[#C9A86A]">M</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function RitualsGalleryAnimated() {
  return (
    <section id="rituals" className="section-cv relative overflow-hidden bg-[#0a1a0f] py-20 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 70% 30%, rgba(201,168,106,0.06), transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-medium uppercase tracking-[0.5em] text-[#C9A86A]"
          >
            MINIHAUTY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease }}
            className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-[#F5F0E8]"
          >
            Rituals, in the Wild.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.7, ease }}
            className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-[#C9A86A]/80"
          >
            Skincare inspired by nature.
          </motion.p>
        </div>

        {/* Product Gallery Grid */}
        <div className="mt-20 hidden gap-6 md:mt-28 md:grid md:grid-cols-3 md:gap-8">
          {productGallery.map((item, i) => (
            <ProductGalleryCard key={`gallery-${i}`} item={item} index={i} />
          ))}
        </div>

        {/* Mobile Product Gallery */}
        <div className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {productGallery.map((item, i) => (
            <div key={`m-gallery-${i}`} className="w-[85vw] shrink-0 snap-center">
              <ProductGalleryCard item={item} index={i} />
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-24 md:mt-32">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="flex flex-col items-center text-center"
              >
                <div className="grid h-14 w-14 place-items-center rounded-full border border-[#C9A86A]/40 text-[#C9A86A]">
                  <feature.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.3em] text-[#C9A86A]/90">
                  {feature.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* M Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mt-20 flex justify-center md:mt-24"
        >
          <div className="grid h-20 w-20 place-items-center rounded-full border-2 border-[#C9A86A]/30 bg-[#C9A86A]/5">
            <span className="font-display text-3xl text-[#C9A86A]">M</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
