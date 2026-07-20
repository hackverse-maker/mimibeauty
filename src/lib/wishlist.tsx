import { createContext, useContext, useEffect, useMemo, useState, useCallback, type ReactNode } from "react";

type WishlistCtx = {
  items: string[];
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
  remove: (slug: string) => void;
  clear: () => void;
  count: number;
};

const Ctx = createContext<WishlistCtx | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mimi-wishlist");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("mimi-wishlist", JSON.stringify(items));
  }, [items]);

  const toggle = useCallback((slug: string) => {
    setItems((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  const has = useCallback(
    (slug: string) => items.includes(slug),
    [items],
  );

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<WishlistCtx>(
    () => ({ items, toggle, has, remove, clear, count: items.length }),
    [items, toggle, has, remove, clear],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWishlist() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useWishlist outside WishlistProvider");
  return c;
}
