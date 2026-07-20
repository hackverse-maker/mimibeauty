import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight, Leaf, ShieldCheck, Sparkles, Truck, Rabbit, Recycle,
  Star, ChevronDown, Play,
} from "lucide-react";
import { assets, categories, collections, ingredientsShowcase, products } from "@/lib/products";
import { ProductCard } from "@/components/site/product-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MIMIbeauty · Reveal Your Natural Beauty" },
      { name: "description", content: "Small-batch luxury skincare & body rituals. Botanical actives, clinical results, quiet luxury." },
      { property: "og:title", content: "MIMIbeauty · Reveal Your Natural Beauty" },
      { property: "og:description", content: "Small-batch luxury skincare & body rituals." },
      { property: "og:image", content: assets.water },
      { name: "twitter:image", content: assets.water },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <BestSellers />

      <WhyChoose />
      <Ingredients />
      <Compare />
      <Testimonials />
      <VideoSection />
      <QuizPreview />

      <Instagram />
      <Newsletter />
    </>
  );
}

function Hero() {
  const [activeBanner, setActiveBanner] = useState(0);
  
  const banners = [
    {
      eyebrow: "ESTD. 2026",
      title: "Glow begins with a ",
      italic: "ritual.",
      description: "Luxury skincare crafted with botanical ingredients and modern science.",
      image: "/luxury_skincare_hero.png",
      pan: { x: [0, -15, 0], y: [0, 10, 0] }
    },
    {
      eyebrow: "Skincare Routine",
      title: "The art of the ",
      italic: "daily ritual.",
      description: "A beautiful elegant woman with glowing skin using a luxury skincare product in a modern minimalist bathroom.",
      image: "/videos/scene_face.png",
      pan: { x: [0, 15, 0], y: [0, -10, 0] }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <section className="relative min-h-[90svh] overflow-hidden pt-20 pb-12 flex items-center bg-gradient-to-br from-[#faf9f7] to-white dark:from-background dark:to-background/80">
      <div className="mx-auto max-w-[1400px] w-full px-4 sm:px-6 grid gap-8 md:gap-12 lg:grid-cols-2 lg:items-center relative z-10">
        
        {/* Left Side: Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${activeBanner}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start pt-4 md:pt-10 text-center lg:text-start"
          >
            <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gold font-medium mb-4 md:mb-6">
              {banners[activeBanner].eyebrow}
            </p>
            <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] sm:text-[clamp(3rem,9vw,5.5rem)] md:text-[clamp(3.25rem,10vw,6rem)] leading-[1.05] tracking-tight text-foreground text-balance">
              {banners[activeBanner].title} <span className="text-gold italic font-normal block md:inline">{banners[activeBanner].italic}</span>
            </h1>
            <p className="mt-4 md:mt-6 max-w-xl text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground/80 leading-relaxed">
              {banners[activeBanner].description}
            </p>
            <Link
              to="/shop"
              className="mt-6 md:mt-10 inline-flex items-center justify-center lg:justify-start gap-3 rounded-full bg-foreground px-6 py-3.5 sm:px-8 sm:py-4 md:px-10 md:py-5 text-sm sm:text-base md:text-base font-medium text-background transition-all hover:bg-gold hover:shadow-lg hover:shadow-gold/20 active:scale-95 min-h-[44px]"
            >
              Explore Collection
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Right Side: Image */}
        <div className="relative aspect-[4/5] lg:aspect-auto h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[88vh] w-full overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl shadow-gold/5 order-first lg:order-last">
          <AnimatePresence mode="wait">
            <motion.img 
              key={`img-${activeBanner}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: [1, 1.15, 1], x: banners[activeBanner].pan.x, y: banners[activeBanner].pan.y }}
              exit={{ opacity: 0 }}
              transition={{ 
                opacity: { duration: 1.2 },
                scale: { duration: 25, ease: "linear", repeat: Infinity },
                x: { duration: 25, ease: "linear", repeat: Infinity },
                y: { duration: 25, ease: "linear", repeat: Infinity }
              }}
              src={banners[activeBanner].image}
              alt="Luxury skincare banner" 
              className="absolute inset-0 h-[115%] w-[115%] -left-[7.5%] -top-[7.5%] object-cover origin-center"
            />
          </AnimatePresence>
          {/* Soft luxury lighting & glass reflection overlays for premium feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-white/10 to-transparent mix-blend-overlay pointer-events-none" />
          
          {/* Progress Indicators */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
            {banners.map((_, i) => (
              <button 
                key={i}
                onClick={() => setActiveBanner(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === activeBanner ? 'w-8 bg-gold' : 'w-2 bg-white/50 hover:bg-white'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


function SectionHeader({ eyebrow, title, kicker }: { eyebrow: string; title: string; kicker?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center px-4">
      <motion.p
        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gold"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
        className="mt-4 font-display text-[clamp(1.75rem,4vw,3rem)] sm:text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight text-balance"
      >
        {title}
      </motion.h2>
      {kicker && (
        <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-muted-foreground">{kicker}</p>
      )}
    </div>
  );
}



function BestSellers() {
  return (
    <section className="py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
      <div className="grid gap-6 md:gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gold">Best Sellers</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance">
            Loved into permanence.
          </h2>
        </div>
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm hover:text-gold">
          Shop all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-14">
        {products.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
      </div>
    </section>
  );
}

const whyItems = [
  { icon: ShieldCheck, title: "Dermatologist tested", body: "Every formula clinically evaluated for sensitive skin." },
  { icon: Rabbit, title: "Cruelty free", body: "Never tested on animals. Certified by Leaping Bunny." },
  { icon: Leaf, title: "100% vegan", body: "Plant-based actives. No compromise on efficacy." },
  { icon: Sparkles, title: "Botanical actives", body: "Wild-harvested, cold-pressed, and clinically dosed." },
  { icon: Recycle, title: "Sustainable packaging", body: "Refillable glass. Post-consumer recycled cartons." },
  { icon: Truck, title: "Complimentary shipping", body: "Free carbon-neutral delivery on orders over $75." },
];

function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.97_0.01_95)] py-12 md:py-16 lg:py-24 dark:bg-background/50">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <SectionHeader eyebrow="Why MIMIbeauty" title="Six promises, kept quietly." />
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {whyItems.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative rounded-2xl border border-border bg-background/60 p-6 sm:p-8 backdrop-blur transition hover:border-gold/60 hover:shadow-[0_20px_60px_-25px_rgba(0,0,0,0.35)]"
            >
              <div className="grid h-11 w-11 place-items-center rounded-full border border-border transition group-hover:border-gold group-hover:text-gold">
                <it.icon className="h-4 w-4" />
              </div>
              <h3 className="mt-6 font-display text-xl sm:text-2xl">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ingredients() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6 py-12 md:py-16 lg:py-24">
      <SectionHeader eyebrow="Ingredients" title="Molecular poetry." kicker="Every actives dosed at the clinically-effective level. No fillers, no theatre." />
      <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {ingredientsShowcase.map((it, i) => (
          <motion.div
            key={it.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.05 }}
            className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-secondary to-background p-6 sm:p-8"
          >
            <img 
              src={[
                "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1611078449921-2a134a413d42?auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1608248593875-f947e9541da0?auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80"
              ][i]}
              alt={it.name}
              className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40 transition duration-700 group-hover:scale-110 group-hover:opacity-60"
            />
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gold/20 blur-2xl transition group-hover:bg-gold/40" />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute right-6 top-6 h-16 w-16 rounded-full border border-gold/40"
            >
              <div className="absolute inset-2 rounded-full border border-gold/60" />
              <div className="absolute inset-5 rounded-full bg-gold/40" />
            </motion.div>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-muted-foreground">0{i + 1}</p>
            <div className="absolute inset-x-6 sm:inset-x-8 bottom-6 sm:bottom-8">
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl">{it.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.note}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Compare() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6 py-12 md:py-16 lg:py-24">
      <SectionHeader eyebrow="Proof, not promises" title="Before · After · Always." />
      <BeforeAfter />
    </section>
  );
}

function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const setPct = (pct: number) => {
    const clamped = Math.max(4, Math.min(96, pct));
    if (dividerRef.current) dividerRef.current.style.left = `${clamped}%`;
    if (beforeRef.current) beforeRef.current.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
  };

  const onMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPct(((e.clientX - rect.left) / rect.width) * 100);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      onPointerDown={(e) => { draggingRef.current = true; onMove(e); }}
      onPointerMove={onMove}
      onPointerUp={() => (draggingRef.current = false)}
      onPointerLeave={() => (draggingRef.current = false)}
      className="relative mt-16 aspect-[16/9] w-full select-none overflow-hidden rounded-3xl border border-border touch-none"
    >
      <img src="/after.png" alt="After" className="absolute inset-0 h-full w-full object-cover" />
      <div ref={beforeRef} className="absolute inset-0" style={{ clipPath: "inset(0 50% 0 0)" }}>
        <img src="/before.png" alt="Before" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div ref={dividerRef} className="absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-gold">
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-gold bg-background/80 backdrop-blur cursor-ew-resize">
          <span className="text-gold">◀ ▶</span>
        </div>
      </div>
      <div className="pointer-events-none absolute left-6 top-6 rounded-full bg-background/70 px-3 py-1 text-[11px] uppercase tracking-[0.3em] backdrop-blur">Before</div>
      <div className="pointer-events-none absolute right-6 top-6 rounded-full bg-gold/90 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-background">After · 28 days</div>
    </motion.div>
  );
}

const testimonials = [
  { name: "Amelia R.", city: "New York", quote: "The Dew serum genuinely changed my skin. Two weeks in, my barrier feels rebuilt. It's the first product I've re-ordered twice." },
  { name: "Sofia L.", city: "Milan", quote: "Hálo is the most beautiful body oil I've ever owned. The fragrance is subtle and the shine is unreal." },
  { name: "Yuki T.", city: "Tokyo", quote: "Every detail feels intentional. The packaging, the ritual, the results. Rhode meets Aesop." },
  { name: "Chloé D.", city: "Paris", quote: "Herbé transformed my scalp. My hair grows faster and shinier. This brand is quietly extraordinary." },
];

function Testimonials() {
  return (
    <section className="border-y border-border/60 bg-secondary/40 py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <SectionHeader eyebrow="Loved worldwide" title="Words from our community." />
        <div className="mt-12 md:mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="glass rounded-2xl p-5 sm:p-6 md:p-7"
            >
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3.5 w-3.5 fill-gold" />)}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">"{t.quote}"</p>
              <footer className="mt-6">
                <p className="font-display text-base sm:text-lg">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.city}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

const cinematicScenes = [
  {
    src: "/media__1784439898781.jpg",
    label: "Herbé · Pre Wash",
    title: "Nourish. Strengthen. Balance.",
    caption: "Scalp Treatment · 50ml",
    pan: { x: [0, -14, 0], y: [0, 6, 0] },
  },
  {
    src: "/media__1784439898181.jpg",
    label: "The Collection",
    title: "A ritual for every need.",
    caption: "Dew · Veil · Herbé · Hálo",
    pan: { x: [0, 10, 0], y: [0, -8, 0] },
  },
  {
    src: "/media__1784439898596.jpg",
    label: "Dew · Barrier Repair",
    title: "Hydrate. Repair. Glow.",
    caption: "Dewy Glow Face Serum · 30ml",
    pan: { x: [0, -10, 0], y: [0, 10, 0] },
  },
  {
    src: "/media__1784439898491.jpg",
    label: "Mimi Beauty · Ritual",
    title: "Crafted for the considered.",
    caption: "Botanical · Clinical · Precise",
    pan: { x: [0, 8, 0], y: [0, -6, 0] },
  },
  {
    src: "/media__1784439898541.jpg",
    label: "The Ritual · Pure",
    title: "Every gesture, intentional.",
    caption: "Radiance · Strength · Grace",
    pan: { x: [0, -12, 0], y: [0, 8, 0] },
  },
];

const SCENE_DURATION = 4000; // ms per scene

function VideoSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startPlayback = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);
    const tick = 50;
    const steps = SCENE_DURATION / tick;
    let step = 0;
    progressRef.current = setInterval(() => {
      step++;
      setProgress((step / steps) * 100);
    }, tick);

    intervalRef.current = setInterval(() => {
      setActiveIndex(i => (i + 1) % cinematicScenes.length);
      setProgress(0);
      step = 0;
    }, SCENE_DURATION);
  };

  useEffect(() => {
    if (isPlaying) startPlayback();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPlaying]);

  const scene = cinematicScenes[activeIndex];

  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6 py-12 md:py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-2xl sm:rounded-3xl"
      >
        {/* ── Cinematic scenes with cross-fade ── */}
        {cinematicScenes.map((s, i) => (
          <motion.img
            key={s.src}
            src={s.src}
            alt={s.title}
            aria-hidden={i !== activeIndex}
            animate={{
              opacity: i === activeIndex ? 1 : 0,
              scale: i === activeIndex ? [1.12, 1.04] : 1.12,
              x: i === activeIndex ? s.pan.x : 0,
              y: i === activeIndex ? s.pan.y : 0,
            }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" },
              scale: { duration: SCENE_DURATION / 1000, ease: "easeInOut" },
              x: { duration: SCENE_DURATION / 1000, ease: "easeInOut" },
              y: { duration: SCENE_DURATION / 1000, ease: "easeInOut" },
            }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ))}

        {/* Cinematic vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-background/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/20 z-10" />

        {/* Warm golden shimmer */}
        <motion.div
          animate={{ opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-yellow-900/10 z-10"
        />

        {/* Top right label */}
        <div className="absolute top-8 right-10 flex items-center gap-3 z-20">
          <span className="h-px w-10 bg-gold/60" />
          <p className="text-[10px] uppercase tracking-[0.45em] text-gold/80">Mimi Beauty · The Ritual</p>
        </div>

        {/* Pulsing orb */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.32, 0.18] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-gold/10 blur-3xl pointer-events-none z-10"
        />

        {/* Center play/pause button */}
        <div className="absolute inset-0 grid place-items-center z-20">
          <button
            onClick={() => setIsPlaying(p => !p)}
            className="group relative grid h-20 w-20 place-items-center rounded-full border border-gold/70 bg-background/30 backdrop-blur-sm cursor-pointer hover:bg-gold/20 transition-colors duration-500"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-gold/20" />
            <span className="absolute inset-[-8px] rounded-full border border-gold/20 animate-pulse" />
            {isPlaying ? (
              <span className="flex gap-1">
                <span className="h-4 w-1 rounded-sm bg-gold" />
                <span className="h-4 w-1 rounded-sm bg-gold" />
              </span>
            ) : (
              <Play className="h-5 w-5 translate-x-0.5 text-gold" />
            )}
          </button>
        </div>

        {/* Bottom left – animated scene text */}
        <div className="absolute bottom-10 left-10 z-20">
          <motion.p
            key={scene.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[11px] uppercase tracking-[0.4em] text-gold"
          >
            {scene.label}
          </motion.p>
          <motion.h3
            key={scene.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-3 font-display text-4xl md:text-5xl leading-tight"
          >
            {scene.title}
          </motion.h3>
          <motion.div
            key={`line-${activeIndex}`}
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-4 h-px bg-gold/60"
          />
        </div>

        {/* Bottom right – caption + scene dots */}
        <div className="absolute bottom-10 right-10 text-right z-20 flex flex-col items-end gap-3">
          <motion.p
            key={scene.caption}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70"
          >
            {scene.caption}
          </motion.p>
          {/* Scene selector dots */}
          <div className="flex gap-2">
            {cinematicScenes.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActiveIndex(i); if (isPlaying) startPlayback(); }}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === activeIndex ? "w-6 bg-gold" : "w-2 bg-gold/30 hover:bg-gold/60"
                }`}
                aria-label={`Go to scene ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-30">
          <motion.div
            className="h-full bg-gradient-to-r from-gold/60 to-gold"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function QuizPreview() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6 py-12 md:py-16 lg:py-24">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-gradient-to-br from-secondary via-background to-secondary p-6 sm:p-8 md:p-10 lg:p-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 sm:h-96 w-64 sm:w-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="grid gap-8 md:gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gold">Skin Quiz · 60 seconds</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-balance">
              Your ritual, <em className="text-gold">designed for you</em>.
            </h2>
            <p className="mt-4 max-w-md text-sm sm:text-base text-muted-foreground">
              Four gentle questions. A personalised routine built by dermatologists, delivered instantly.
            </p>
            <Link to="/quiz" className="mt-6 sm:mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 sm:px-7 sm:py-4 text-sm text-background hover:bg-gold min-h-[44px]">
              Begin the quiz <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {["Skin type", "Concerns", "Sensitivity", "Ritual time"].map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="flex items-center gap-3 sm:gap-4 rounded-xl border border-border bg-background/60 p-3 sm:p-4 backdrop-blur"
              >
                <span className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-gold text-background text-sm font-medium flex-shrink-0">{i + 1}</span>
                <span className="font-medium text-sm sm:text-base">{step}</span>
                <div className="ml-auto h-1 w-16 sm:w-24 overflow-hidden rounded-full bg-secondary flex-shrink-0">
                  <div className="h-full bg-gold" style={{ width: `${25 * (i + 1)}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CollectionsGrid() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6 py-16 md:py-24 lg:py-32">
      <SectionHeader eyebrow="Collections" title="Rituals, composed." />
      <div className="mt-12 md:mt-16 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.06 }}
            className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border p-6 sm:p-8 aspect-[3/4] md:aspect-auto md:min-h-[380px] ${i === 0 ? "md:col-span-3 md:row-span-2" : "md:col-span-3"} bg-gradient-to-br ${c.tone}`}
          >
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-background/70">Collection · 0{i + 1}</p>
            <h3 className="mt-4 font-display text-3xl sm:text-4xl text-background md:text-5xl">{c.name}</h3>
            <Link to="/collections" className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 inline-flex items-center gap-2 rounded-full bg-background/90 px-4 sm:px-5 py-2 sm:py-2.5 text-sm text-foreground opacity-0 transition group-hover:opacity-100">
              Explore <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Instagram() {
  const imgs = [
    "/media__1784439898491.jpg",
    "/media__1784439898596.jpg",
    "/media__1784439898541.jpg",
    "/media__1784439898181.jpg",
    "/media__1784439898781.jpg",
    "/media__1784439898491.jpg",
    "/media__1784439898596.jpg",
    "/media__1784439898541.jpg"
  ];
  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6 py-16 md:py-24 lg:py-32">
      <SectionHeader eyebrow="@mimibeauty" title="Rituals, in the wild." />
      <div className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-4 items-center gap-4 sm:gap-6 md:gap-8">
        {imgs.map((src, i) => (
          <motion.a
            key={i}
            href="https://instagram.com/mimibeauty"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className={`block relative overflow-hidden bg-secondary/10 shadow-sm ${
              i % 4 === 0 ? "aspect-[2/3] rounded-t-[80px] sm:rounded-t-[100px] rounded-b-2xl md:-translate-y-8" :
              i % 4 === 1 ? "aspect-square rounded-full" :
              i % 4 === 2 ? "aspect-[3/4] rounded-3xl md:translate-y-12" :
              "aspect-[4/5] rounded-br-[60px] sm:rounded-br-[80px] rounded-tl-[60px] sm:rounded-tl-[80px] rounded-tr-2xl rounded-bl-2xl"
            }`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}

const posts = [
  { title: "The barrier repair diary", excerpt: "How ceramides rebuild the moisture barrier in 28 days.", tag: "Journal" },
  { title: "On slow beauty", excerpt: "Why the ritual matters as much as the formula.", tag: "Philosophy" },
  { title: "A guide to layering", excerpt: "The right order for serums, oils, and moisturisers.", tag: "How-to" },
];

function Blog() {
  return (
    <section className="border-y border-border/60 bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[11px] uppercase tracking-[0.5em] text-gold"
          >
            — The Journal —
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
            className="mt-6 font-script text-[clamp(4rem,10vw,8rem)] leading-[0.9] text-gold"
          >
            Read, slowly.
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="mx-auto mt-6 h-px w-32 origin-left bg-gold/60"
          />
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              className="group flex flex-col"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-none bg-secondary/20">
                <img 
                  src={[
                    "https://images.unsplash.com/photo-1611078449921-2a134a413d42?auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80"
                  ][i]} 
                  alt="" 
                  className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-105" 
                  loading="lazy" 
                />
              </div>
              <div className="pt-6">
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{p.tag}</p>
                <h3 className="mt-3 font-display text-2xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm">
                  Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !email.includes("@")) {
      setLoading(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setEmail("");
    setLoading(false);
  };

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
      <div className="relative overflow-hidden rounded-3xl bg-secondary/50 p-10 text-foreground md:p-20 grain">
        <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">The Letter</p>
            <h2 className="mt-4 font-display text-5xl md:text-6xl leading-[1.05] tracking-tight text-balance">
              Slow drops, quiet news.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Occasional letters on ritual, ingredients, and new arrivals. Never noise.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full flex-1 rounded-full border border-border bg-background/50 px-6 py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold"
              required
            />
            <button 
              type="submit"
              disabled={loading}
              className="rounded-full bg-gold px-8 py-4 text-sm font-medium text-background transition hover:bg-gold-soft disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
