"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Khadija Faisal",
    city: "Verified Buyer",
    product: "DEW — Barrier Repair Face Serum",
    quote:
      "I've actually been really happy with the face serum. I've struggled with random breakouts and acne for a while, so I was honestly a bit hesitant to try it. But my skin has been so much calmer since I started using it, and I've had way fewer breakouts. Even the marks from old acne are starting to look better. Definitely one of my favourite products from Mimi so far.",
  },
  {
    name: "Aitezaz Malik",
    city: "Verified Buyer",
    product: "Mimi Beauty Ritual",
    quote:
      "I've been using Mimi for a few days now and I actually really like it. My skin feels so much softer and the glow is definitely there. I was a little unsure at first because I'm always scared of trying new products but so far it's been really good. Also the packaging is SO pretty.",
  },
  {
    name: "Meerab Bilal",
    city: "Verified Buyer",
    product: "The Complete Mimi Collection",
    quote:
      "I'm genuinely loving these products! The hair serum has made my hair feel so much softer and smoother, while the face serum gives such a fresh, dewy glow—skin bilkul fresh lagti hai. The body oil is honestly my favourite, it leaves the skin super soft and hydrated without that heavy, greasy feeling. And the scent is just next level, noticeable but not overpowering. Packaging is so pretty and gives such a luxurious feel. Overall, I'm really happy with everything and already excited for the next products.",
  },
  {
    name: "Haider Shah",
    city: "Verified Buyer",
    product: "VEIL — Post Wash Leave-In Serum",
    quote:
      "Post wash hair serum bhi honestly kaafi acha laga. Hair ko smooth aur manageable feel karwata hai, aur frizz bhi kaafi control ho jata hai. Sabse achi baat ye hai ke hair oily ya heavy feel nahi hotay. I've been using it and the overall finish is very clean, nourishing yet lightweight and worth trying. 💗",
  },
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
        if (scrollPos >= el.scrollWidth / 3) {
          scrollPos = 0;
        }
        el.scrollLeft = scrollPos;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    const onScroll = () => {
      if (isHovered) scrollPos = el.scrollLeft;
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      el.removeEventListener("scroll", onScroll);
    };
  }, [isHovered]);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -420, behavior: "smooth" });
  };
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 420, behavior: "smooth" });
  };

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
          className="flex overflow-x-auto gap-6 px-6 md:px-12 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          style={{ scrollBehavior: "auto" }}
        >
          {displayTestimonials.map((t, i) => (
            <motion.div
              key={`${t.name}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % testimonials.length) * 0.1 }}
              className="relative flex-none w-[85vw] sm:w-[400px] md:w-[440px] rounded-3xl bg-[#0F1813] p-7 shadow-2xl border border-[#C9A86A]/20 overflow-hidden group flex flex-col transition-all duration-300 hover:border-[#C9A86A]/40"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-[#C9A86A] text-[#C9A86A]" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-sans text-base leading-relaxed text-[#F5F2EC]/85 italic flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Footer */}
              <footer className="mt-8 pt-6 border-t border-[#C9A86A]/15 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
                <div>
                  <p className="font-display text-xl text-[#F5F2EC]">{t.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#F5F2EC]/50 mt-1.5">
                    {t.city}
                  </p>
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A86A] sm:text-right max-w-[180px]">
                  {t.product}
                </p>
              </footer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
