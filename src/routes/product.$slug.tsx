import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { findProduct, products } from "@/lib/products";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowLeft, Heart, Minus, Plus, Share2, Star, ChevronDown, Check, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { ProductCard } from "@/components/site/product-card";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} · MIMIbeauty` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} · MIMIbeauty` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-[60vh] place-items-center bg-[#030303] text-foreground">
      <p>Product not found. <Link to="/shop" className="text-gold underline">Back to shop</Link></p>
    </div>
  ),
  errorComponent: () => <div className="p-24 text-center bg-[#030303] text-foreground">Something went wrong.</div>,
  component: ProductPage,
});

function AccordionItem({ title, children, open, onClick }: { title: string; children: React.ReactNode; open: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onClick}
        className="group flex w-full items-center justify-between py-6 text-left transition-colors hover:text-gold"
      >
        <span className="font-display text-lg tracking-wide text-foreground/90 transition-colors group-hover:text-gold">{title}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown className="h-5 w-5 text-foreground/50 transition-colors group-hover:text-gold" strokeWidth={1.5} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-sm leading-relaxed text-foreground/70 md:text-base">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// Magnetic Button Component
// -------------------------------------------------------------
function MagneticButton({ children, onClick, active, className }: { children: React.ReactNode, onClick?: () => void, active?: boolean, className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: e.clientX - center.x, y: e.clientY - center.y };
    x.set(distance.x * 0.2);
    y.set(distance.y * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className={`group relative overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1.5s] ease-in-out group-hover:translate-x-[150%]" />
      {children}
    </motion.button>
  );
}

// -------------------------------------------------------------
// Cinematic Stage Component (Left Side)
// -------------------------------------------------------------
function CinematicStage({ image }: { image: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseXSpring = useSpring(x, { stiffness: 40, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 40, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);
  
  // Spotlight movement
  const spotX = useTransform(mouseXSpring, [-0.5, 0.5], ['-30%', '30%']);
  const spotY = useTransform(mouseYSpring, [-0.5, 0.5], ['-30%', '30%']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };
  
  // Create an array for particles without relying on window on first render
  const particles = Array.from({ length: 12 });

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-[60vh] w-full items-center justify-center overflow-hidden rounded-[2.5rem] bg-[#020202] shadow-2xl lg:h-[calc(100vh-4rem)] lg:min-h-0"
      style={{ perspective: "1500px" }}
    >
      {/* Noise Grain Background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      
      {/* Deep Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,106,0.03)_0%,transparent_70%)]" />
      
      {/* Interactive Spotlight */}
      <motion.div 
        className="pointer-events-none absolute inset-0 rounded-full bg-gold opacity-[0.08] blur-[100px]"
        style={{ x: spotX, y: spotY, scale: 1.5 }}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 z-0">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              x: `${Math.random() * 100}%`,
              y: "110%" 
            }}
            animate={{ 
              opacity: [0, Math.random() * 0.4 + 0.1, 0],
              y: ["110%", "-10%"]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute h-1 w-1 rounded-full bg-gold blur-[2px]"
          />
        ))}
      </div>
      
      {/* 3D Bottle */}
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 flex h-full w-full items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.img 
            key={image}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              filter: "blur(0px)",
              y: [0, -12, 0] 
            }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{
              opacity: { duration: 0.6 },
              scale: { duration: 0.6, ease: "easeOut" },
              filter: { duration: 0.6 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            src={image} 
            alt="Product" 
            className="relative z-10 h-3/4 max-h-[700px] w-full object-contain p-4 drop-shadow-[0_40px_50px_rgba(0,0,0,0.8)] mix-blend-screen" 
            style={{ transform: "translateZ(80px)" }}
          />
        </AnimatePresence>
        
        {/* Dynamic Glass Reflection */}
        <motion.div 
          animate={{ opacity: isHovered ? 0.3 : 0.1 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none absolute inset-0 z-20 mix-blend-soft-light"
          style={{ transform: "translateZ(100px)" }}
        >
          <motion.div 
            style={{ 
              x: useTransform(mouseXSpring, [-0.5, 0.5], ['-100%', '100%']),
              y: useTransform(mouseYSpring, [-0.5, 0.5], ['-100%', '100%'])
            }}
            className="absolute h-[200%] w-[50%] -rotate-45 bg-gradient-to-r from-transparent via-white to-transparent blur-3xl" 
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

// -------------------------------------------------------------
// Main Page Component
// -------------------------------------------------------------
function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const { toggle, has } = useWishlist();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<string>("ingredients");
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const wishlisted = has(product.slug);
  
  const gallery = [product.image, product.hoverImage].filter(Boolean);
  const related = products.filter((p) => p.slug !== product.slug);

  const handleAddToCart = () => {
    setStatus("loading");
    setTimeout(() => {
      add(product, qty);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2500);
    }, 600); // Simulate network request for premium feel
  };

  return (
    <div className="min-h-screen bg-[#000000] text-foreground selection:bg-gold/30">
      
      {/* Background ambient lighting */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="relative z-10 pt-24 lg:pt-32">
        {/* Back Button & Category */}
        <div className="mx-auto max-w-[1800px] px-6 pb-6 lg:px-12 xl:px-20">
          <div className="flex items-center gap-6">
            <Link to="/shop" className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-foreground/50 transition-colors hover:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:border-gold group-hover:bg-gold/10 group-hover:text-gold">
                <ArrowLeft className="h-3.5 w-3.5" />
              </span>
              Back to Shop
            </Link>
            <span className="h-3 w-[1px] bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/40">
              {product.category}
            </span>
          </div>
        </div>

        <section className="mx-auto max-w-[1800px] lg:grid lg:grid-cols-[1.5fr_1fr] lg:gap-12 xl:gap-20">
          
          {/* Left Column: Cinematic Stage */}
          <div className="relative px-6 lg:pl-12 xl:pl-20">
            <CinematicStage image={gallery[active]} />
            
            {/* Premium Glass Thumbnails */}
            <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-4 lg:bottom-16">
              {gallery.map((src, i) => (
                <button 
                  key={i} 
                  onClick={() => setActive(i)} 
                  className={`relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border bg-black/40 backdrop-blur-xl transition-all duration-300 ${active === i ? "border-gold/50" : "border-white/10 hover:border-white/30"}`}
                >
                  <img src={src} className="h-full w-full object-contain p-2 mix-blend-screen opacity-80" alt="" />
                  {active === i && (
                    <motion.div 
                      layoutId="active-thumb-border"
                      className="absolute inset-0 rounded-2xl border-2 border-gold shadow-[0_0_15px_rgba(201,168,106,0.3)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Sticky Typography & Details */}
          <div className="relative mt-12 px-6 lg:mt-0 lg:pr-12 xl:pr-20">
            <div className="lg:sticky lg:top-12 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
                <div className="flex items-center gap-4">
                  <span className="h-[1px] w-8 bg-gold" />
                  <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-gold">{product.collection} Collection</p>
                </div>
                
                <h1 className="mt-6 font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] tracking-tight">{product.name}</h1>
                <p className="mt-4 text-lg text-foreground/60 md:text-xl">{product.tagline}</p>

                {/* Reviews */}
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-gold text-gold" : "text-white/20"}`} strokeWidth={1} />
                    ))}
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-foreground/60">{product.rating} <span className="mx-1">·</span> {product.reviews} reviews</span>
                </div>

                <p className="mt-10 text-base leading-relaxed text-foreground/70 md:text-lg">{product.description}</p>
              </motion.div>

              {/* Glassmorphism Purchase Panel */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} 
                className="mt-12 rounded-[2rem] border border-white/10 dark:border-white/10 bg-white/[0.02] dark:bg-white/[0.02] p-8 shadow-2xl backdrop-blur-3xl"
              >
                <div className="flex items-end justify-between border-b border-white/10 pb-8">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-5xl tracking-tight">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xl text-foreground/40 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-foreground/50">{product.size}</span>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  {/* Premium Quantity Selector */}
                  <div className="flex h-16 w-full items-center justify-between rounded-full border border-white/10 bg-black/40 px-6 sm:w-1/3">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-gold transition hover:scale-110"><Minus className="h-4 w-4" strokeWidth={2.5} /></button>
                    <AnimatePresence mode="popLayout">
                      <motion.span key={qty} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} className="w-8 text-center text-lg font-medium">
                        {qty}
                      </motion.span>
                    </AnimatePresence>
                    <button onClick={() => setQty(qty + 1)} className="text-gold transition hover:scale-110"><Plus className="h-4 w-4" strokeWidth={2.5} /></button>
                  </div>
                  
                  {/* Magnetic Add to Bag */}
                  <MagneticButton 
                    onClick={handleAddToCart} 
                    className={`flex h-16 w-full flex-1 items-center justify-center rounded-full sm:w-2/3 ${status === "success" ? "bg-gold text-black shadow-[0_0_40px_rgba(201,168,106,0.4)]" : "bg-white text-black hover:bg-gold hover:shadow-[0_0_40px_rgba(201,168,106,0.3)]"}`}
                  >
                    <AnimatePresence mode="wait">
                      {status === "idle" && (
                        <motion.span key="idle" initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }} className="text-xs font-bold uppercase tracking-[0.25em]">
                          Add to Bag
                        </motion.span>
                      )}
                      {status === "loading" && (
                        <motion.span key="loading" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
                          <Loader2 className="h-5 w-5 animate-spin" strokeWidth={2.5} />
                        </motion.span>
                      )}
                      {status === "success" && (
                        <motion.span key="success" initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }} className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em]">
                          <Check className="h-4 w-4" strokeWidth={3} /> Added
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </MagneticButton>
                </div>
                
                <div className="mt-8 flex justify-center gap-10">
                  <button onClick={() => toggle(product.slug)} className={`group flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] transition-colors ${wishlisted ? "text-gold" : "text-foreground/50 hover:text-white"}`}>
                    <Heart className={`h-4 w-4 transition-transform group-hover:scale-110 ${wishlisted ? "fill-gold" : ""}`} strokeWidth={1.5} /> {wishlisted ? "Saved" : "Wishlist"}
                  </button>
                  <button className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-foreground/50 transition-colors hover:text-white">
                    <Share2 className="h-4 w-4 transition-transform group-hover:scale-110" strokeWidth={1.5} /> Share
                  </button>
                </div>
              </motion.div>

              {/* Accordion Details */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }} className="mt-16 pb-32">
                <AccordionItem title="Ingredients" open={activeTab === "ingredients"} onClick={() => setActiveTab(activeTab === "ingredients" ? "" : "ingredients")}>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {product.ingredients.map((i: string) => (
                      <div key={i} className="rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4 backdrop-blur-sm transition hover:bg-white/[0.05]">
                        <span className="text-foreground/90">{i}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex gap-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Clean</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Vegan</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Cruelty-Free</span>
                  </div>
                </AccordionItem>
                
                <AccordionItem title="Benefits" open={activeTab === "benefits"} onClick={() => setActiveTab(activeTab === "benefits" ? "" : "benefits")}>
                  <ul className="space-y-6">
                    {product.benefits.map((b: string) => (
                      <li key={b} className="flex items-start gap-5">
                        <span className="mt-1.5 grid h-3 w-3 shrink-0 place-items-center rounded-full bg-gold/20">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        </span> 
                        <span className="text-lg text-foreground/80">{b}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
                
                <AccordionItem title="The Ritual" open={activeTab === "directions"} onClick={() => setActiveTab(activeTab === "directions" ? "" : "directions")}>
                  <p className="text-lg leading-loose text-foreground/80">{product.directions}</p>
                </AccordionItem>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Related Products - Premium Section */}
      <section className="relative z-10 border-t border-white/5 bg-black/50 py-24 md:py-32 backdrop-blur-2xl">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12 xl:px-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-[1px] w-8 bg-gold" />
                <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-gold">Explore</p>
              </div>
              <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl">Ritual companions</h2>
            </div>
            <Link to="/shop" className="group flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-foreground/60 transition hover:text-white">
              View Collection 
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-gold group-hover:bg-gold/10">
                <ArrowRight className="h-4 w-4 text-gold" />
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
