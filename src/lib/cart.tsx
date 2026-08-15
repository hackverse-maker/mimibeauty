"use client";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./products";
import type { Bundle } from "./bundles";

export type CartLine = { product: Product; qty: number };
export type CartBundle = {
  bundle: Bundle;
  selectedProducts: Product[];
  selectedOptions?: Record<string, string>;
  qty: number;
};

type CartItem = CartLine | CartBundle;

type CartCtx = {
  lines: CartLine[];
  bundles: CartBundle[];
  addProduct: (p: Product, qty?: number) => void;
  addBundle: (bundle: Bundle, selectedProducts: Product[], selectedOptions?: Record<string, string>, qty?: number) => void;
  removeProduct: (slug: string) => void;
  removeBundle: (bundleId: string) => void;
  setProductQty: (slug: string, qty: number) => void;
  setBundleQty: (bundleId: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (o: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [bundles, setBundles] = useState<CartBundle[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mimi-cart");
      if (raw) {
        const data = JSON.parse(raw);
        setLines(data.lines || []);
        setBundles(data.bundles || []);
      }
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem("mimi-cart", JSON.stringify({ lines, bundles }));
  }, [lines, bundles]);

  const value = useMemo<CartCtx>(() => {
    const addProduct = (p: Product, qty = 1) => {
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

    const addBundle = (bundle: Bundle, selectedProducts: Product[], selectedOptions?: Record<string, string>, qty = 1) => {
      setBundles((prev) => {
        const idx = prev.findIndex((b) => b.bundle.id === bundle.id);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: next[idx].qty + qty };
          return next;
        }
        return [...prev, { bundle, selectedProducts, selectedOptions, qty }];
      });
      setOpen(true);
    };

    return {
      lines,
      bundles,
      addProduct,
      addBundle,
      removeProduct: (slug) => setLines((p) => p.filter((l) => l.product.slug !== slug)),
      removeBundle: (bundleId) => setBundles((b) => b.filter((b) => b.bundle.id !== bundleId)),
      setProductQty: (slug, qty) =>
        setLines((p) =>
          p.map((l) => (l.product.slug === slug ? { ...l, qty: Math.max(1, qty) } : l)),
        ),
      setBundleQty: (bundleId, qty) =>
        setBundles((b) =>
          b.map((b) => (b.bundle.id === bundleId ? { ...b, qty: Math.max(1, qty) } : b)),
        ),
      clear: () => {
        setLines((prev) => (prev.length === 0 ? prev : []));
        setBundles((prev) => (prev.length === 0 ? prev : []));
      },
      count: lines.reduce((n, l) => n + l.qty, 0) + bundles.reduce((n, b) => n + b.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.product.price, 0) + bundles.reduce((n, b) => n + b.qty * b.bundle.finalPrice, 0),
      open,
      setOpen,
    };
  }, [lines, bundles, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
