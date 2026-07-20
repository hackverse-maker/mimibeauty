import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./products";

export type CartLine = { product: Product; qty: number };

type CartCtx = {
  lines: CartLine[];
  add: (p: Product, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (o: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mimi-cart");
      if (raw) setLines(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem("mimi-cart", JSON.stringify(lines));
  }, [lines]);

  const value = useMemo<CartCtx>(() => {
    const add = (p: Product, qty = 1) => {
      setLines((prev) => {
        const idx = prev.findIndex((l) => l.product.slug === p.slug);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: next[idx].qty + qty };
          return next;
        }
        return [...prev, { product: p, qty }];
      });
      setOpen(true);
    };
    return {
      lines,
      add,
      remove: (slug) => setLines((p) => p.filter((l) => l.product.slug !== slug)),
      setQty: (slug, qty) =>
        setLines((p) =>
          p.map((l) => (l.product.slug === slug ? { ...l, qty: Math.max(1, qty) } : l)),
        ),
      clear: () => setLines([]),
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      open,
      setOpen,
    };
  }, [lines, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
