import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "@/lib/products";

export function LoadingScreen() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("mimi-loaded")) return;
    setShow(true);
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("mimi-loaded", "1");
    }, 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <img src={assets.logo} className="h-16 w-16 rounded-full object-cover" alt="" />
            <div className="h-px w-24 overflow-hidden bg-border">
              <motion.div className="h-full w-full bg-gold" initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1.1, ease: "easeInOut" }} />
            </div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">MIMIbeauty</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
