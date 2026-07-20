import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";

export function CartDrawer() {
  const { open, setOpen, lines, remove, setQty, subtotal, count, clear } = useCart();
  const { user, setIsOpen: setAuthOpen } = useAuth();

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please sign in to checkout");
      setAuthOpen(true);
      return;
    }
    if (lines.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    // Simulate checkout process
    toast.success("Proceeding to checkout...");
    // In a real app, this would navigate to a checkout page
    setTimeout(() => {
      toast.success("Order placed successfully!");
      clear();
      setOpen(false);
    }, 2000);
  };
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[70] bg-foreground/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            className="fixed right-0 top-0 z-[71] flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Your Ritual</p>
                <h3 className="font-display text-2xl">Cart ({count})</h3>
              </div>
              <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {lines.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <p className="font-display text-2xl">Your cart is quiet.</p>
                    <p className="mt-2 text-sm text-muted-foreground">Discover a ritual made for you.</p>
                    <Link to="/shop" onClick={() => setOpen(false)} className="mt-6 inline-block rounded-full bg-foreground px-6 py-3 text-sm text-background">Shop</Link>
                  </div>
                </div>
              ) : (
                <ul className="space-y-6">
                  {lines.map(({ product, qty }) => (
                    <li key={product.slug} className="flex gap-4">
                      <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-secondary">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate font-display text-lg">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.tagline}</p>
                          </div>
                          <button onClick={() => remove(product.slug)} className="text-muted-foreground hover:text-foreground">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-border px-1">
                            <button onClick={() => setQty(product.slug, qty - 1)} className="grid h-7 w-7 place-items-center"><Minus className="h-3 w-3" /></button>
                            <span className="w-6 text-center text-sm">{qty}</span>
                            <button onClick={() => setQty(product.slug, qty + 1)} className="grid h-7 w-7 place-items-center"><Plus className="h-3 w-3" /></button>
                          </div>
                          <p className="text-sm font-medium">${(product.price * qty).toFixed(2)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {lines.length > 0 && (
              <div className="border-t border-border px-6 py-5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p>
                <button 
                  onClick={handleCheckout}
                  className="mt-5 w-full rounded-full bg-gold py-3.5 text-sm font-medium tracking-wide text-background transition hover:bg-gold-soft"
                >
                  Checkout · ${subtotal.toFixed(2)}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
