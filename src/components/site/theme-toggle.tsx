import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="group relative grid h-10 w-10 place-items-center text-foreground/70 transition-colors duration-300 hover:text-gold"
    >
      <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 ring-1 ring-gold/30 transition-opacity duration-300 group-hover:opacity-100" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          className="text-current"
        >
          {theme === "dark" ? (
            <Sun className="h-[1.05rem] w-[1.05rem] stroke-[1.35]" />
          ) : (
            <Moon className="h-[1.05rem] w-[1.05rem] stroke-[1.35]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
