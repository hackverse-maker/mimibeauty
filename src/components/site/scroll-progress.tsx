import { motion, useScroll, useSpring } from "framer-motion";

/** Lightweight top progress — spring is cheap vs layout thrash */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-transparent via-gold to-transparent will-change-transform"
    />
  );
}
