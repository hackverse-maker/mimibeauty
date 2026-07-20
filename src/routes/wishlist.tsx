import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/site/product-card";
import { products } from "@/lib/products";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist · MIMIbeauty" },
      { name: "description", content: "Your MIMIbeauty wishlist - saved products for your ritual." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { items, remove, clear } = useWishlist();
  const { add } = useCart();
  const wishlistedProducts = products.filter((p) => items.includes(p.slug));

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach((p) => add(p));
  };

  return (
    <section className="mx-auto max-w-[1400px] px-6 pt-32 pb-24">
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] uppercase tracking-[0.4em] text-gold">Your Ritual</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 font-display text-5xl md:text-6xl">Wishlist</motion.h1>
      
      {wishlistedProducts.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-12 text-center py-24">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-border text-muted-foreground">
            <Heart className="h-8 w-8" />
          </div>
          <h2 className="mt-6 font-display text-2xl">Your wishlist is empty</h2>
          <p className="mt-2 text-muted-foreground">Save products you love for later.</p>
          <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm text-background hover:bg-gold">
            <ShoppingBag className="h-4 w-4" /> Start shopping
          </Link>
        </motion.div>
      ) : (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8 flex items-center justify-between">
            <p className="text-muted-foreground">{wishlistedProducts.length} items saved</p>
            <button onClick={handleAddAllToCart} className="rounded-full bg-gold px-6 py-2 text-sm text-background hover:bg-gold-soft transition">
              Add all to cart
            </button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
            {wishlistedProducts.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </motion.div>
        </>
      )}
    </section>
  );
}
