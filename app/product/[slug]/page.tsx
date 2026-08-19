"use client";
import Link from "next/link";
import { findProduct, products } from "@/lib/products";
import { useState, useRef, useEffect, use } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowLeft, Heart, Minus, Plus, Share2, Star, ChevronDown, Check, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { ProductCard } from "@/components/site/product-card";

function AccordionItem({ title, children, open, onClick, accent }: {
  title: string; children: React.ReactNode; open: boolean; onClick: () => void; accent: string;
}) {
  return (
    <div className="border-b border-white/10">
      <button onClick={onClick} className="group flex w-full items-center justify-between py-6 text-left">
        <span className="font-display text-lg tracking-wide transition-colors" style={{ color: open ? accent : "rgba(255,255,255,0.9)" }}>{title}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
          <ChevronDown className="h-5 w-5 transition-colors" strokeWidth={1.5} style={{ color: open ? accent : "rgba(255,255,255,0.4)" }} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <div className="pb-8 text-sm leading-relaxed text-white/60 md:text-base">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MagneticButton({ children, onClick, className, style }: {
  children: React.ReactNode; onClick?: () => void; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) * 0.2);
    y.set((e.clientY - (top + height / 2)) * 0.2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={onClick}
      style={{ x: mouseXSpring, y: mouseYSpring, ...style }}
      className={`group relative overflow-hidden transition-all duration-300 ${className}`}>
      <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1.5s] ease-in-out group-hover:translate-x-[150%]" />
      {children}
    </motion.button>
  );
}

function CinematicStage({ image, accent, glow }: { image: string; accent: string; glow: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const mouseXSpring = useSpring(x, { stiffness: 40, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 40, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);
  const spotX = useTransform(mouseXSpring, [-0.5, 0.5], ["-30%", "30%"]);
  const spotY = useTransform(mouseYSpring, [-0.5, 0.5], ["-30%", "30%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    setIsHovered(true);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); setIsHovered(false); };

  useEffect(() => { setIsMounted(true); }, []);
  const particles = Array.from({ length: 12 });

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="relative flex min-h-[60vh] w-full items-center justify-center overflow-hidden rounded-[2.5rem] shadow-2xl lg:min-h-[680px]"
      style={{ perspective: "1500px", background: "rgba(0,0,0,0.3)" }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at center, ${glow} 0%, transparent 70%)` }} />
      <motion.div className="pointer-events-none absolute inset-0 rounded-full blur-[100px] opacity-[0.12]"
        style={{ x: spotX, y: spotY, scale: 1.5, backgroundColor: accent }} />
      {isMounted && (
        <div className="absolute inset-0 z-0">
          {particles.map((_, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: `${Math.random() * 100}%`, y: "110%" }}
              animate={{ opacity: [0, Math.random() * 0.4 + 0.1, 0], y: ["110%", "-10%"] }}
              transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
              className="absolute h-1 w-1 rounded-full blur-[2px]"
              style={{ backgroundColor: accent }} />
          ))}
        </div>
      )}
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative z-10 flex h-full w-full items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img key={image}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: [0, -12, 0] }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ opacity: { duration: 0.6 }, scale: { duration: 0.6, ease: "easeOut" }, filter: { duration: 0.6 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
            src={image} alt="Product"
            className="relative z-10 h-3/4 max-h-[700px] w-full object-contain p-4 drop-shadow-[0_40px_50px_rgba(0,0,0,0.8)] mix-blend-screen"
            style={{ transform: "translateZ(80px)" }} />
        </AnimatePresence>
        <motion.div animate={{ opacity: isHovered ? 0.3 : 0.1 }} transition={{ duration: 0.5 }}
          className="pointer-events-none absolute inset-0 z-20 mix-blend-soft-light" style={{ transform: "translateZ(100px)" }}>
          <motion.div
            style={{ x: useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "100%"]), y: useTransform(mouseYSpring, [-0.5, 0.5], ["-100%", "100%"]) }}
            className="absolute h-[200%] w-[50%] -rotate-45 bg-gradient-to-r from-transparent via-white to-transparent blur-3xl" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const product = findProduct(resolvedParams.slug);

  const { add } = useCart();
  const { toggle, has } = useWishlist();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<string>("ingredients");
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  if (!product) return (
    <div className="grid min-h-[60vh] place-items-center bg-background text-foreground">
      <p>Product not found. <Link href="/shop" className="underline">Back to shop</Link></p>
    </div>
  );

  const { theme } = product;
  const wishlisted = has(product.slug);
  const gallery = product.gallery?.length ? product.gallery : [product.image, product.hoverImage].filter(Boolean);
  const related = products.filter((p) => p.slug !== product.slug);

  const handleAddToCart = () => {
    setStatus("loading");
    setTimeout(() => { add(product, qty); setStatus("success"); setTimeout(() => setStatus("idle"), 2500); }, 600);
  };

  return (
    <div className="min-h-screen overflow-x-hidden text-white selection:bg-white/20" style={{ backgroundColor: theme.bg }}>
      {/* Ambient blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-[55vw] h-[55vw] rounded-full blur-[140px]" style={{ backgroundColor: theme.glow }} />
        <div className="absolute bottom-[-15%] left-[-10%] w-[45vw] h-[45vw] rounded-full blur-[140px]" style={{ backgroundColor: theme.glow }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${theme.accentMuted}, transparent 70%)` }} />
      </div>

      <div className="relative z-10 pt-24 lg:pt-32">
        {/* Back Button */}
        <div className="mx-auto max-w-[1800px] px-6 pb-6 lg:px-12 xl:px-20">
          <div className="flex items-center gap-6">
            <Link href="/shop" className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors"
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = theme.accent; el.style.backgroundColor = theme.accentMuted; el.style.color = theme.accent; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = ""; el.style.backgroundColor = ""; el.style.color = ""; }}>
                <ArrowLeft className="h-3.5 w-3.5" />
              </span>
              Back to Shop
            </Link>
            <span className="h-3 w-[1px] bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: `${theme.accent}99` }}>{product.category}</span>
          </div>
        </div>

        <section className="mx-auto max-w-[1800px] flex flex-col lg:grid lg:grid-cols-[1.5fr_1fr] lg:gap-12 xl:gap-20">
          {/* Left: Cinematic Stage - Mobile Second */}
          <div className="relative order-2 px-6 lg:order-1 lg:pl-12 xl:pl-20">
            <CinematicStage image={gallery[active]} accent={theme.accent} glow={theme.glow} />


            {/* Accordions on left */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }} className="mt-16 pb-16">
              <AccordionItem title="Ingredients" open={activeTab === "ingredients"} onClick={() => setActiveTab(activeTab === "ingredients" ? "" : "ingredients")} accent={theme.accent}>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {product.ingredients.map((i: string) => (
                    <div key={i} className="rounded-xl border px-5 py-4 backdrop-blur-sm transition"
                      style={{ borderColor: `${theme.accent}15`, backgroundColor: theme.surface }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = theme.accentMuted; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = theme.surface; }}>
                      <span className="text-white/90">{i}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-6">
                  {["Clean", "Vegan", "Cruelty-Free"].map((tag) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: theme.accent }}>{tag}</span>
                  ))}
                </div>
              </AccordionItem>

              <AccordionItem title="Benefits" open={activeTab === "benefits"} onClick={() => setActiveTab(activeTab === "benefits" ? "" : "benefits")} accent={theme.accent}>
                <ul className="space-y-6">
                  {product.benefits.map((b: string) => (
                    <li key={b} className="flex items-start gap-5">
                      <span className="mt-1.5 grid h-3 w-3 shrink-0 place-items-center rounded-full" style={{ backgroundColor: theme.accentMuted }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                      </span>
                      <span className="text-lg text-white/75">{b}</span>
                    </li>
                  ))}
                </ul>
              </AccordionItem>

              {product.directions && (
                <AccordionItem title="Directions" open={activeTab === "directions"} onClick={() => setActiveTab(activeTab === "directions" ? "" : "directions")} accent={theme.accent}>
                  <p className="text-lg text-white/75 leading-relaxed whitespace-pre-wrap">{product.directions}</p>
                </AccordionItem>
              )}

              {product.storageCaution && (
                <AccordionItem title="Storage & Caution" open={activeTab === "storage"} onClick={() => setActiveTab(activeTab === "storage" ? "" : "storage")} accent={theme.accent}>
                  <p className="text-lg text-white/75 leading-relaxed whitespace-pre-wrap">{product.storageCaution}</p>
                </AccordionItem>
              )}
            </motion.div>
          </div>

          {/* Right: Product Info - Mobile First */}
          <div className="relative order-1 mt-12 px-6 lg:order-2 lg:mt-0 lg:pr-12 xl:pr-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              <div className="flex items-center gap-4">
                <span className="h-[1px] w-8" style={{ backgroundColor: theme.accent }} />
                <p className="text-[11px] font-medium uppercase tracking-[0.4em]" style={{ color: theme.accent }}>{product.collection} Collection</p>
              </div>
              <h1 className="mt-6 font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] tracking-tight text-white">{product.name}</h1>
              <p className="mt-4 text-lg text-white/60 md:text-xl">{product.tagline}</p>



              <div className="mt-10">
                <div className="text-base leading-relaxed text-white/65 md:text-lg whitespace-pre-wrap">{product.description}</div>
              </div>
            </motion.div>

            {/* Purchase Panel */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 rounded-[2rem] border p-8 shadow-2xl backdrop-blur-3xl"
              style={{ borderColor: `${theme.accent}20`, backgroundColor: theme.surface }}>
              <div className="flex items-end justify-between border-b pb-8" style={{ borderColor: `${theme.accent}15` }}>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-5xl tracking-tight text-white">Rs. {product.price}</span>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-white/40">{product.size}</span>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <div className="flex h-16 w-full items-center justify-between rounded-full border px-6 sm:w-1/3"
                  style={{ borderColor: `${theme.accent}20`, backgroundColor: "rgba(0,0,0,0.2)" }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="transition hover:scale-110" style={{ color: theme.accent }}>
                    <Minus className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                  <AnimatePresence mode="popLayout">
                    <motion.span key={qty} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }}
                      className="w-8 text-center text-lg font-medium text-white">{qty}</motion.span>
                  </AnimatePresence>
                  <button onClick={() => setQty(qty + 1)} className="transition hover:scale-110" style={{ color: theme.accent }}>
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                </div>

                <MagneticButton onClick={handleAddToCart}
                  className="flex h-16 w-full flex-1 items-center justify-center rounded-full sm:w-2/3"
                  style={{ backgroundColor: theme.accent, color: theme.bg, boxShadow: status === "success" ? `0 0 40px ${theme.accentMuted}` : "none" }}>
                  <AnimatePresence mode="wait">
                    {status === "idle" && (
                      <motion.span key="idle" initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }}
                        className="text-xs font-bold uppercase tracking-[0.25em]">Add to Bag</motion.span>
                    )}
                    {status === "loading" && (
                      <motion.span key="loading" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
                        <Loader2 className="h-5 w-5 animate-spin" strokeWidth={2.5} />
                      </motion.span>
                    )}
                    {status === "success" && (
                      <motion.span key="success" initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em]">
                        <Check className="h-4 w-4" strokeWidth={3} /> Added
                      </motion.span>
                    )}
                  </AnimatePresence>
                </MagneticButton>
              </div>

              <div className="mt-8 flex justify-center gap-10">
                <button onClick={() => toggle(product.slug)}
                  className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] transition-colors"
                  style={{ color: wishlisted ? theme.accent : "rgba(255,255,255,0.4)" }}>
                  <Heart className="h-4 w-4 transition-transform group-hover:scale-110" strokeWidth={1.5}
                    style={{ fill: wishlisted ? theme.accent : "transparent" }} />
                  {wishlisted ? "Saved" : "Wishlist"}
                </button>
                <button className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/40 transition-colors hover:text-white">
                  <Share2 className="h-4 w-4 transition-transform group-hover:scale-110" strokeWidth={1.5} /> Share
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Related Products */}
      <section className="relative z-10 border-t py-24 md:py-32 backdrop-blur-2xl"
        style={{ borderColor: `${theme.accent}15`, backgroundColor: `${theme.bg}cc` }}>
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12 xl:px-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-[1px] w-8" style={{ backgroundColor: theme.accent }} />
                <p className="text-[11px] font-medium uppercase tracking-[0.4em]" style={{ color: theme.accent }}>Explore</p>
              </div>
              <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl text-white">Complete your collection</h2>
            </div>
            <Link href="/shop" className="group flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/50 transition hover:text-white">
              View Collection
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-colors"
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = theme.accent; el.style.backgroundColor = theme.accentMuted; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.1)"; el.style.backgroundColor = ""; }}>
                <ArrowRight className="h-4 w-4" style={{ color: theme.accent }} />
              </span>
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {related.slice(0, 4).map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
