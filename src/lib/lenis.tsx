import { useEffect } from "react";
import Lenis from "lenis";

/** Tuned for Apple-like smooth scroll without overshoot lag. */
export function useSmoothScroll() {
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) return;

    const lenis = new Lenis({
      // Shorter duration + lerp = responsive, not floaty
      duration: 0.9,
      lerp: 0.09,
      smoothWheel: true,
      touchMultiplier: 1.35,
      wheelMultiplier: 0.95,
      // Avoid fighting native iOS momentum
      syncTouch: false,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}
