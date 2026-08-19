"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const INTERVAL_MS = 3500;

const testimonials = [
  {
    name: "Khadija Faisal",
    product: "DEW — Barrier Repair Face Serum",
    stars: 5,
    quote:
      "I've actually been really happy with the face serum. I've struggled with random breakouts and acne for a while, so I was honestly a bit hesitant to try it. But my skin has been so much calmer since I started using it, and I've had way fewer breakouts. Even the marks from old acne are starting to look better. Definitely one of my favourite products from Mimi so far.",
  },
  {
    name: "Aitezaz Malik",
    product: "DEW — Barrier Repair Face Serum",
    stars: 5,
    quote:
      "I've been using Mimi for a few days now and I actually really like it. My skin feels so much softer and the glow is definitely there. I was a little unsure at first because I'm always scared of trying new products but so far it's been really good. Also the packaging is SO pretty.",
  },
  {
    name: "Meerab Bilal",
    product: "Face, Hair & Body",
    stars: 5,
    quote:
      "I'm genuinely loving these products! The hair serum has made my hair feel so much softer and smoother, while the face serum gives such a fresh, dewy glow — skin bilkul fresh lagti hai. The body oil is honestly my favourite, it leaves the skin super soft and hydrated without that heavy, greasy feeling. And the scent is just next level, noticeable but not overpowering. Packaging is so pretty and gives such a luxurious feel. Overall, I'm really happy with everything and already excited for the next products.",
  },
  {
    name: "Haider Shah",
    product: "VEIL — Post Wash Hair Serum",
    stars: 5,
    quote:
      "Post wash hair serum bhi honestly kaafi acha laga. Hair ko smooth aur manageable feel karwata hai, aur frizz bhi kaafi control ho jata hai. Sabse achi baat ye hai ke hair oily ya heavy feel nahi hotay. I've been using it and the overall finish is very clean, nourishing yet lightweight and worth trying. 💗",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-[#C9A86A] text-[#C9A86A]" />
      ))}
    </div>
  );
}

export function TestimonialsCarousel() {
  const count = testimonials.length;
  const [index, setIndex] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const pausedRef = useRef(false);
  const rootRef = useRef<HTMLElement>(null);
  const timerRef = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex(((next % count) + count) % count);
  }, [count]);

  const stopTimer = useCallback(() => {
    if (timerRef.current != null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    if (pausedRef.current) return;
    timerRef.current = window.setInterval(() => {
      if (document.hidden || pausedRef.current) return;
      setIndex((i) => (i + 1) % count);
    }, INTERVAL_MS);
  }, [count, stopTimer]);

  useEffect(() => {
    startTimer();
    const onVis = () => {
      if (document.hidden) stopTimer();
      else startTimer();
    };
    document.addEventListener("visibilitychange", onVis);

    const el = rootRef.current;
    let io: IntersectionObserver | undefined;
    if (el && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([entry]) => {
          pausedRef.current = !entry.isIntersecting;
          if (entry.isIntersecting) startTimer();
          else stopTimer();
        },
        { threshold: 0.05 },
      );
      io.observe(el);
    }

    return () => {
      stopTimer();
      document.removeEventListener("visibilitychange", onVis);
      io?.disconnect();
    };
  }, [startTimer, stopTimer]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
    pausedRef.current = true;
    stopTimer();
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const delta = e.clientX - startX.current;
    dragging.current = false;
    if (Math.abs(delta) > 40) {
      go(delta < 0 ? index + 1 : index - 1);
    }
    pausedRef.current = false;
    startTimer();
  };

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden border-y border-[#C9A86A]/15 bg-[#07110D] py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 18% 20%, rgba(201,168,106,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C9A86A]">
            Community
          </span>
          <h2
            className="mt-4 text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] leading-[1.05] tracking-tight text-[#F5F2EC]"
            style={{ fontFamily: "var(--font-cormorant, serif)" }}
          >
            Words from our customers.
          </h2>
          <div className="mt-4 flex items-center gap-3">
            <Stars count={5} />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#F5F2EC]/45">
              5.0 · All verified customers
            </span>
          </div>
        </div>

        <div
          className="relative overflow-hidden"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{ touchAction: "pan-y" }}
        >
          <div
            className="flex"
            style={{
              transform: `translate3d(-${index * 100}%, 0, 0)`,
              transition: "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {testimonials.map((t) => (
              <article key={t.name} className="relative w-full min-w-0 shrink-0 basis-full">
                <div className="relative mx-auto max-w-4xl overflow-hidden rounded-sm border border-[#C9A86A]/20 bg-[#0B1510] px-6 py-10 sm:px-12 sm:py-14">
                  <span
                    className="pointer-events-none absolute -top-6 left-4 select-none text-[8rem] leading-none text-[#C9A86A]/15 sm:text-[11rem]"
                    style={{ fontFamily: "var(--font-cormorant, serif)" }}
                    aria-hidden
                  >
                    “
                  </span>
                  <div className="relative min-h-[280px] sm:min-h-[240px]">
                    <Stars count={t.stars} />
                    <p className="mt-8 text-[17px] sm:text-[22px] md:text-[24px] leading-[1.55] text-[#F5F2EC]/90 font-light italic">
                      {t.quote}
                    </p>
                    <div className="mt-10 border-t border-[#C9A86A]/15 pt-6">
                      <p className="font-display text-[20px] sm:text-[22px] tracking-wide text-[#F5F2EC]">
                        {t.name}
                      </p>
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C9A86A]/75">
                        {t.product}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2" aria-hidden>
          {testimonials.map((t, i) => (
            <span
              key={t.name}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-8 bg-[#C9A86A]" : "w-2 bg-[#C9A86A]/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
