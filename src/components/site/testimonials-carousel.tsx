"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Amelia R.",
    city: "New York",
    product: "DEW — Barrier Repair Face Serum",
    quote:
      "The Dew serum genuinely changed my skin. Two weeks in, my barrier feels rebuilt. It's the first product I've re-ordered twice.",
    image: "/hero_dew_girl_left.jpg",
  },
  {
    name: "Sofia L.",
    city: "Milan",
    product: "HALÒ — Illuminating Body Oil",
    quote:
      "Hálo is the most beautiful body oil I've ever owned. The fragrance is subtle and the shine is unreal.",
    image: "/hero_dew_girl_right.jpg",
  },
  {
    name: "Yuki T.",
    city: "Tokyo",
    product: "The Signature Ritual",
    quote:
      "Every detail feels intentional. The packaging, the care, the results. Rhode meets Aesop.",
    image: "/media__1784439898541.jpg",
  },
  {
    name: "Chloé D.",
    city: "Paris",
    product: "HERBÉ — Scalp & Hair Oil",
    quote:
      "Herbé transformed my scalp. My hair grows faster and shinier. This brand is quietly extraordinary.",
    image: "/media__1784439898491.jpg",
  },
  {
    name: "Elena M.",
    city: "London",
    product: "DEW — Barrier Repair Face Serum",
    quote:
      "The texture is like nothing else. It absorbs instantly but leaves this incredible, lasting luminosity.",
    image: "/brand-story-editorial.jpg",
  }
];

export function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    let scrollPos = el.scrollLeft;

    const scroll = () => {
      if (!isHovered && el) {
        scrollPos += 0.6; 
        
        // When we scroll past the first set, jump back to start for a seamless loop
        if (scrollPos >= (el.scrollWidth / 3)) {
          scrollPos = 0;
        }
        
        el.scrollLeft = scrollPos;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    const onScroll = () => {
      if (isHovered) {
        scrollPos = el.scrollLeft;
      }
    };
    
    el.addEventListener('scroll', onScroll, { passive: true });
    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      el.removeEventListener('scroll', onScroll);
    };
  }, [isHovered]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  // Duplicate items for infinite scroll effect
  const displayTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="relative border-y border-[#C9A86A]/20 bg-[#08140E] overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-[#08140E] opacity-50 pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-[1500px] px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col items-start gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A86A]">
              Loved worldwide
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#F5F2EC]">
              Words from our community.
            </h2>
          </div>
          <div className="hidden md:flex gap-3 pb-2">
            <button 
              onClick={scrollLeft}
              className="grid h-12 w-12 place-items-center rounded-full border border-[#C9A86A]/30 text-[#F5F2EC] transition-all hover:bg-[#C9A86A] hover:text-[#08140E]"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={scrollRight}
              className="grid h-12 w-12 place-items-center rounded-full border border-[#C9A86A]/30 text-[#F5F2EC] transition-all hover:bg-[#C9A86A] hover:text-[#08140E]"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-16 md:mt-24">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 px-6 md:px-12 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          style={{ scrollBehavior: 'auto' }}
        >
          {displayTestimonials.map((t, i) => (
            <motion.div
              key={`${t.name}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % testimonials.length) * 0.1 }}
              className="relative flex-none w-[85vw] sm:w-[420px] md:w-[480px] rounded-3xl bg-[#0F1813] p-6 shadow-2xl border border-[#C9A86A]/20 overflow-hidden group flex flex-col transition-all duration-300 hover:border-[#C9A86A]/40"
            >
              {/* Image Header */}
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden mb-8">
                <img 
                  src={t.image} 
                  alt={t.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1813] via-[#0F1813]/20 to-transparent opacity-90" />
                <div className="absolute bottom-5 left-5 flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-[#C9A86A] text-[#C9A86A]" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1">
                <p className="font-sans text-base sm:text-lg leading-relaxed text-[#F5F2EC]/90 mb-10 italic">
                  "{t.quote}"
                </p>
                <footer className="mt-auto pt-6 border-t border-[#C9A86A]/15 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                  <div>
                    <p className="font-display text-xl text-[#F5F2EC]">{t.name}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#F5F2EC]/60 mt-2">{t.city}</p>
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A86A] sm:text-right max-w-[180px]">
                    {t.product}
                  </p>
                </footer>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
