"use client";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, Star, Leaf, Rabbit } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";

const GOLD = "#CFA76A";
const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  { title: "Dermatologically", subtitle: "Tested", icon: Leaf },
  { title: "Naturally Derived", subtitle: "Ingredients", icon: Leaf },
  { title: "Cruelty Free", subtitle: "Always", icon: Rabbit },
] as const;

const FILM = [
  { src: "/hero_dew_girl_left.jpg", caption: "Pure Radiance · Skin" },
  { src: "/hero_dew_girl_right.jpg", caption: "Slow Beauty · Skin" },
  { src: "/hero_dew_collection.jpg", caption: "The Collection · Complete Care" },
] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease },
  };
}

function useMagnetic() {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.35 });

  const onMove = (e: MouseEvent) => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.22);
    y.set((e.clientY - r.top - r.height / 2) * 0.22);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, springX, springY, onMove, onLeave };
}

function MagneticLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const { ref, springX, springY, onMove, onLeave } = useMagnetic();
  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-flex w-full sm:w-auto">
      <Link
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={className}
      >
        {children}
      </Link>
    </motion.div>
  );
}

function MagneticAction({
  onClick,
  className,
  children,
}: {
  onClick: () => void;
  className?: string;
  children: ReactNode;
}) {
  const { ref, springX, springY, onMove, onLeave } = useMagnetic();
  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-flex w-full sm:w-auto">
      <button
        ref={ref as RefObject<HTMLButtonElement>}
        type="button"
        onClick={onClick}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={className}
      >
        {children}
      </button>
    </motion.div>
  );
}

/** CSS particles — no Framer Motion per-dot RAF cost */
function Particles() {
  return (
    <div
      className="hero-particles pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    />
  );
}

function HeroVideo({
  parallaxX,
  parallaxY,
}: {
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState(0);
  const [active, setActive] = useState(true);
  const frameX = useTransform(parallaxX, [-1, 1], [-10, 10]);
  const frameY = useTransform(parallaxY, [-1, 1], [-8, 8]);
  const bottleX = useTransform(parallaxX, [-1, 1], [12, -12]);
  const bottleY = useTransform(parallaxY, [-1, 1], [8, -8]);

  // Pause slideshow when offscreen — stops timer + GPU work
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => {
      if (document.hidden) return;
      setScene((s) => (s + 1) % FILM.length);
    }, 4200);
    return () => clearInterval(t);
  }, [active]);

  return (
    <motion.div
      ref={rootRef}
      style={{ x: frameX, y: frameY }}
      className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.2, ease }}
        className="group relative"
      >
        <div
          className="pointer-events-none absolute -inset-6 rounded-[40px] opacity-40 transition-opacity duration-500 group-hover:opacity-70"
          style={{
            background: `radial-gradient(circle at 50% 40%, ${GOLD}40, transparent 65%)`,
          }}
        />

        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-1.5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)] transition-[border-color] duration-500 group-hover:border-gold/55">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-background">
            {FILM.map((f, i) => (
              <img
                key={f.src}
                src={f.src}
                alt=""
                width={800}
                height={1000}
                fetchPriority={i === 0 ? "high" : "low"}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                // GPU-friendly crossfade: opacity + transform only
                className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-out ${
                  i === scene ? "scale-[1.04] opacity-100" : "scale-110 opacity-0"
                }`}
              />
            ))}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-background/25" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#D4AF37]/12 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.35em] text-gold/90">
                  Collection · Film
                </p>
                <p className="mt-1 font-display text-lg text-white/90">{FILM[scene].caption}</p>
              </div>
              <div className="flex gap-1.5">
                {FILM.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Scene ${i + 1}`}
                    onClick={() => setScene(i)}
                    className={`h-1 rounded-full transition-all duration-500 ${i === scene ? "w-6 bg-gold" : "w-1.5 bg-white/40"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          style={{ x: bottleX, y: bottleY }}
          className="pointer-events-none absolute -bottom-4 right-2 z-20 w-24 sm:right-0 sm:w-32 md:-right-2 md:w-36"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease }}
        >
          {/* CSS float — one compositor animation, not Framer infinite */}
          <img
            src="/herbe.png"
            alt="Herbé bottle in hand"
            width={200}
            height={280}
            loading="lazy"
            decoding="async"
            className="hero-float w-full drop-shadow-[0_30px_50px_rgba(0,0,0,0.7)]"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const parallaxX = useSpring(mx, { stiffness: 50, damping: 22 });
  const parallaxY = useSpring(my, { stiffness: 50, damping: 22 });
  const glowX = useTransform(parallaxX, [-1, 1], ["42%", "58%"]);
  const glowY = useTransform(parallaxY, [-1, 1], ["28%", "42%"]);
  const glowBackground = useMotionTemplate`radial-gradient(ellipse 70% 55% at ${glowX} ${glowY}, rgba(212,175,55,0.16), transparent 70%)`;
  const rafMove = useRef(0);

  // Throttled parallax via rAF — skip on coarse pointers (touch)
  const onMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const el = sectionRef.current;
      if (!el) return;
      const cx = e.clientX;
      const cy = e.clientY;
      if (rafMove.current) return;
      rafMove.current = requestAnimationFrame(() => {
        rafMove.current = 0;
        const r = el.getBoundingClientRect();
        mx.set(((cx - r.left) / r.width) * 2 - 1);
        my.set(((cy - r.top) / r.height) * 2 - 1);
      });
    },
    [mx, my],
  );

  const scrollToCollections = () => {
    document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" });
  };

  const btnPrimary =
    "inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#050505] transition-[filter] duration-300 hover:brightness-110 sm:w-auto";
  const btnSecondary =
    "inline-flex w-full items-center justify-center gap-3 rounded-full border border-gold/40 bg-transparent px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-gold hover:text-gold sm:w-auto";

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      className="relative isolate min-h-[100svh] overflow-hidden bg-background text-white"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div className="absolute inset-0" style={{ background: glowBackground }} />
        <div
          className="absolute -left-24 top-1/4 h-[200px] w-[200px] rounded-full opacity-80 md:h-[320px] md:w-[320px]"
          style={{ background: `${GOLD}14` }}
        />
        <div
          className="absolute -right-16 bottom-0 h-[180px] w-[180px] rounded-full md:h-[280px] md:w-[280px]"
          style={{ background: `${GOLD}10` }}
        />
        <Particles />
        <div className="hero-grain absolute inset-0 opacity-[0.22]" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1400px] grid-cols-1 items-center gap-10 px-6 pb-16 pt-28 md:gap-14 md:px-8 lg:grid-cols-2 lg:gap-16 lg:pb-20 lg:pt-32">
        <div className="order-2 lg:order-2">
          <HeroVideo parallaxX={parallaxX} parallaxY={parallaxY} />
        </div>

        <div className="order-1 flex flex-col items-start text-left lg:order-1">
          <motion.span
            {...fadeUp(0.05)}
            className="inline-flex items-center rounded-full border border-gold/40 bg-transparent px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold"
          >
            NATURE LED • RESULTS DRIVEN
          </motion.span>

          <motion.h1
            {...fadeUp(0.12)}
            className="mt-6 font-display text-[clamp(2.25rem,7vw,4.5rem)] font-normal leading-[1.1] tracking-normal text-white"
          >
            Real Ingredients.
            <br />
            Real Results.
            <br />
            <em className="italic text-gold">Naturally You.</em>
          </motion.h1>

          <motion.div {...fadeUp(0.18)} className="mt-8 flex items-center gap-3">
            <div className="h-px w-12 bg-gold/70" />
            <Leaf className="h-4 w-4 text-gold/70" />
          </motion.div>

          <motion.p
            {...fadeUp(0.22)}
            className="mt-6 max-w-md font-display text-[15px] leading-relaxed text-white/80 md:text-[17px] lg:max-w-lg"
          >
            Scientifically formulated skincare that hydrates deeply, nourishes intensely, and brings
            out your natural glow with every use.
          </motion.p>

          <motion.div
            {...fadeUp(0.32)}
            className="mt-9 flex w-full max-w-md flex-col items-stretch gap-4 sm:max-w-none sm:flex-row sm:items-center sm:justify-start lg:justify-start"
          >
            <MagneticLink href="/shop" className={btnPrimary}>
              SHOP COLLECTION
              <ArrowRight className="h-4 w-4" />
            </MagneticLink>
            <MagneticAction onClick={scrollToCollections} className={btnSecondary}>
              EXPLORE PRODUCTS
            </MagneticAction>
          </motion.div>



          <motion.ul
            {...fadeUp(0.48)}
            className="mt-10 grid w-full max-w-lg grid-cols-1 gap-6 sm:grid-cols-3 lg:max-w-[600px]"
          >
            {features.map((feature, i) => (
              <li
                key={i}
                className={`flex items-center gap-3 ${i !== 0 ? "sm:border-l sm:border-white/10 sm:pl-6" : ""}`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <feature.icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <span className="text-[11px] leading-snug tracking-wider text-white/80">
                  {feature.title}
                  <br />
                  {feature.subtitle}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
