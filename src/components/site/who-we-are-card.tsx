"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const paragraphs = [
  "Mimi Beauty is a premium Pakistani skincare brand built on a simple belief that the best care works with your body, not against it.",
  "We thoughtfully formulate products using naturally derived ingredients that support healthy skin, hair, and body care without complexity.",
  "Every formula is intentionally designed to deliver effective results while respecting your body's natural balance.",
  "Our collection is centered around fast-absorbing dry oil formulations that nourish deeply without leaving a heavy or greasy feel.",
  "From face and hair to body care, each product is designed to fit seamlessly into your daily routine while delivering purposeful, long-term care.",
  "At Mimi Beauty, we believe luxury is found in thoughtful formulation, honest ingredients, and products that truly deserve a place in your routine.",
  "We don't believe in creating more. We believe in creating better.",
  "This is more than skincare. It is a commitment to helping you care for yourself with intention, confidence, and simplicity.",
  "Working in harmony with nature, helping your body restore, protect, and strengthen from within.",
];

export function WhoWeAreCard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const mimiBgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 py-20 md:py-32 px-4 sm:px-6 lg:px-12 xl:px-20"
      aria-label="Who We Are"
    >
      {/* Ambient glow behind the card */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(207,167,106,0.055), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease }}
        className="who-we-are-card relative mx-auto max-w-[960px] overflow-hidden rounded-[32px] sm:rounded-[40px] lg:rounded-[52px]"
      >
        {/* Card background layers */}
        <div className="absolute inset-0 -z-10" aria-hidden>
          {/* Base surface */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(145deg, #0e1f17 0%, #0a1810 40%, #0d1d15 70%, #0b1a12 100%)",
            }}
          />
          {/* Warm editorial overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 15% 20%, rgba(207,167,106,0.07), transparent 55%), radial-gradient(ellipse 60% 70% at 85% 80%, rgba(207,167,106,0.045), transparent 50%)",
            }}
          />
          {/* Subtle grain texture overlay */}
          <div className="absolute inset-0 who-we-are-grain opacity-[0.18]" />
        </div>

        {/* Thin luxury border */}
        <div
          className="absolute inset-0 rounded-[32px] sm:rounded-[40px] lg:rounded-[52px] pointer-events-none"
          style={{
            border: "1px solid",
            borderColor: "rgba(207,167,106,0.18)",
            boxShadow:
              "inset 0 1px 0 rgba(207,167,106,0.12), inset 0 -1px 0 rgba(207,167,106,0.06)",
          }}
        />

        {/* Oversized MIMI watermark */}
        <motion.div
          style={{ y: mimiBgY }}
          className="pointer-events-none absolute -right-8 top-0 select-none overflow-hidden"
          aria-hidden
        >
          <span
            className="who-we-are-watermark block font-display leading-none tracking-[-0.04em] text-transparent"
            style={{
              fontSize: "clamp(8rem, 24vw, 22rem)",
              WebkitTextStroke: "1px rgba(207,167,106,0.055)",
              fontFamily: "var(--font-display)",
            }}
          >
            MIMI
          </span>
        </motion.div>

        {/* Thin top accent line */}
        <div
          className="absolute left-12 right-12 top-0 h-px sm:left-16 sm:right-16 lg:left-20 lg:right-20"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(207,167,106,0.5) 30%, rgba(207,167,106,0.5) 70%, transparent)",
          }}
        />

        {/* Main card content */}
        <div className="relative z-10 px-7 pb-14 pt-12 sm:px-12 sm:pb-16 sm:pt-14 lg:px-20 lg:pb-20 lg:pt-18">

          {/* READ SLOWLY label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="flex items-center gap-4"
          >
            <div
              className="h-px w-10 shrink-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(207,167,106,0.8), rgba(207,167,106,0.2))",
              }}
            />
            <span
              className="font-sans text-[10px] font-semibold uppercase tracking-[0.45em]"
              style={{ color: "rgba(207,167,106,0.75)" }}
            >
              Read Slowly
            </span>
          </motion.div>

          {/* Who We Are heading */}
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.18, ease }}
            className="mt-6 font-display leading-[1.05] tracking-tight text-[#F6F2EB]"
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 4.8rem)",
              fontFamily: "var(--font-display)",
            }}
          >
            Who We Are
          </motion.h2>

          {/* Decorative line below heading */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.3, ease }}
            className="mt-7 origin-left"
          >
            <div
              className="h-px w-full max-w-[320px]"
              style={{
                background:
                  "linear-gradient(to right, rgba(207,167,106,0.45), rgba(207,167,106,0.08), transparent)",
              }}
            />
          </motion.div>

          {/* Editorial layout: asymmetrical two-column on lg */}
          <div className="mt-10 lg:mt-12 lg:grid lg:grid-cols-[1fr_1.15fr] lg:gap-x-16 xl:gap-x-24">

            {/* Left column — first 4 paragraphs */}
            <div className="space-y-6">
              {paragraphs.slice(0, 4).map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.85, delay: 0.08 * i, ease }}
                  className={`font-sans leading-[1.85] font-light ${
                    i === 0
                      ? "text-[15px] sm:text-[16px] text-[#F6F2EB]/90"
                      : "text-[14px] sm:text-[15px] text-[#F6F2EB]/65"
                  }`}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Right column — remaining paragraphs + closing statements */}
            <div className="mt-6 space-y-6 lg:mt-0">
              {paragraphs.slice(4, 7).map((para, i) => (
                <motion.p
                  key={i + 4}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.85, delay: 0.1 + 0.08 * i, ease }}
                  className="font-sans text-[14px] sm:text-[15px] leading-[1.85] font-light text-[#F6F2EB]/65"
                >
                  {para}
                </motion.p>
              ))}

              {/* Closing two statements — typographically elevated */}
              <div className="mt-8 space-y-5 border-t pt-8" style={{ borderColor: "rgba(207,167,106,0.12)" }}>
                {paragraphs.slice(7).map((para, i) => (
                  <motion.p
                    key={i + 7}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.12 * i + 0.1, ease }}
                    className={`font-sans leading-[1.75] ${
                      i === 0
                        ? "text-[14.5px] sm:text-[15.5px] font-light italic text-[#F6F2EB]/80"
                        : "text-[13.5px] sm:text-[14.5px] font-light text-[#F6F2EB]/55"
                    }`}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom editorial footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease }}
            className="mt-12 flex items-center justify-between border-t pt-7"
            style={{ borderColor: "rgba(207,167,106,0.1)" }}
          >
            <div className="flex items-center gap-3">
              <span
                className="font-display text-[11px] font-normal uppercase tracking-[0.35em]"
                style={{ color: "rgba(207,167,106,0.5)" }}
              >
                Mimi Beauty
              </span>
              <span
                className="h-px w-6 shrink-0"
                style={{ background: "rgba(207,167,106,0.3)" }}
              />
              <span
                className="font-sans text-[10px] uppercase tracking-[0.3em]"
                style={{ color: "rgba(246,242,235,0.3)" }}
              >
                Pakistan
              </span>
            </div>
            <div className="flex items-center gap-2 opacity-40">
              <div
                className="h-px w-8"
                style={{
                  background:
                    "linear-gradient(to left, rgba(207,167,106,0.6), transparent)",
                }}
              />
              <span
                className="font-display text-[9px] uppercase tracking-[0.4em]"
                style={{ color: "rgba(207,167,106,0.6)" }}
              >
                Est. 2024
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom accent glow */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(207,167,106,0.2) 30%, rgba(207,167,106,0.2) 70%, transparent)",
          }}
        />
        {/* Soft vignette depth shadow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[32px] sm:rounded-[40px] lg:rounded-[52px]"
          style={{
            boxShadow:
              "0 48px 120px -40px rgba(0,0,0,0.9), 0 0 0 1px rgba(207,167,106,0.08)",
          }}
        />
      </motion.div>
    </section>
  );
}
