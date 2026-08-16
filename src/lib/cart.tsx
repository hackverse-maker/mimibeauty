"use client";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./products";
import type { Bundle } from "./bundles";

export type CartLine = { product: Product; qty: number };
export type CartBundle = {
  cartItemId?: string;
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
  removeBundle: (bundleKey: string) => void;
  setProductQty: (slug: string, qty: number) => void;
  setBundleQty: (bundleKey: string, qty: number) => void;
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

    const getBundleKey = (bundle: Bundle, prods: Product[], opts?: Record<string, string>) => {
      const pSlugs = (prods || []).map((p) => p.slug).sort().join("_");
      const optStr = opts ? JSON.stringify(opts) : "";
      return `${bundle.id}:${pSlugs}:${optStr}`;
    };

    const addBundle = (bundle: Bundle, selectedProducts: Product[], selectedOptions?: Record<string, string>, qty = 1) => {
      const cartItemId = getBundleKey(bundle, selectedProducts, selectedOptions);
      setBundles((prev) => {
        const idx = prev.findIndex((b) => (b.cartItemId || b.bundle.id) === cartItemId);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: next[idx].qty + qty };
          return next;
        }
        return [...prev, { cartItemId, bundle, selectedProducts, selectedOptions, qty }];
      });
      setOpen(true);
    };

    return {
      lines,
      bundles,
      addProduct,
      addBundle,
      removeProduct: (slug) => setLines((p) => p.filter((l) => l.product.slug !== slug)),
      removeBundle: (bundleKey) => setBundles((b) => b.filter((b) => (b.cartItemId || b.bundle.id) !== bundleKey)),
      setProductQty: (slug, qty) =>
        setLines((p) =>
          p.map((l) => (l.product.slug === slug ? { ...l, qty: Math.max(1, qty) } : l)),
        ),
      setBundleQty: (bundleKey, qty) =>
        setBundles((b) =>
          b.map((b) => ((b.cartItemId || b.bundle.id) === bundleKey ? { ...b, qty: Math.max(1, qty) } : b)),
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
