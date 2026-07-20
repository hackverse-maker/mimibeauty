import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { findProduct, products } from "@/lib/products";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Minus, Plus, Share2, Star } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { toast } from "sonner";
import { ProductCard } from "@/components/site/product-card";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} · MIMIbeauty` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} · MIMIbeauty` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-[60vh] place-items-center">
      <p>Product not found. <Link to="/shop" className="text-gold underline">Back to shop</Link></p>
    </div>
  ),
  errorComponent: () => <div className="p-24 text-center">Something went wrong.</div>,
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const { toggle, has } = useWishlist();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"ingredients" | "benefits" | "directions">("ingredients");
  const gallery = [product.image, product.hoverImage];
  const [active, setActive] = useState(0);
  const related = products.filter((p) => p.slug !== product.slug);
  const wishlisted = has(product.slug);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.tagline,
          url: window.location.href,
        });
        toast.success("Shared successfully!");
      } catch (err) {
        toast.error("Failed to share");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pt-24 md:pt-32">
        <p className="text-xs text-muted-foreground">
          <Link to="/shop" className="hover:text-gold">Shop</Link> · {product.category}
        </p>

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <motion.div layoutId={product.slug} className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-secondary">
              <motion.img key={active} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} src={gallery[active]} alt={product.name} className="h-full w-full object-cover" />
            </motion.div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((g, i) => (
                <button key={i} onClick={() => setActive(i)} className={`aspect-square overflow-hidden rounded-lg border transition ${active === i ? "border-gold" : "border-border hover:border-gold/50"}`}>
                  <img src={g} className="h-full w-full object-cover" alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="md:sticky md:top-32 md:h-fit">
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">{product.collection} Collection</p>
            <h1 className="mt-3 font-display text-5xl md:text-6xl leading-[1.05]">{product.name}</h1>
            <p className="mt-2 text-muted-foreground">{product.tagline}</p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-gold" : ""}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} · {product.reviews} reviews</span>
            </div>

            <p className="mt-6 text-foreground/85">{product.description}</p>

            <div className="mt-8 flex items-baseline gap-3">
              <span className="font-display text-4xl">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
              )}
              <span className="text-sm text-muted-foreground">/ {product.size}</span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-border px-1">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-10 w-10 place-items-center"><Minus className="h-4 w-4" /></button>
                <span className="w-8 text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="grid h-10 w-10 place-items-center"><Plus className="h-4 w-4" /></button>
              </div>
              <button onClick={() => add(product, qty)} className="flex-1 rounded-full bg-foreground py-4 text-sm font-medium text-background transition hover:bg-gold">
                Add to bag · ${(product.price * qty).toFixed(2)}
              </button>
            </div>
            <div className="mt-4 flex gap-3">
              <button 
                onClick={() => toggle(product.slug)}
                className={`flex-1 rounded-full border py-3 text-sm flex items-center justify-center gap-2 transition ${
                  wishlisted 
                    ? "border-gold text-gold bg-gold/10" 
                    : "border-border hover:border-gold hover:text-gold"
                }`}
              >
                <Heart className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`} /> 
                {wishlisted ? "Wishlisted" : "Wishlist"}
              </button>
              <button 
                onClick={handleShare}
                className="flex-1 rounded-full border border-border py-3 text-sm hover:border-gold hover:text-gold flex items-center justify-center gap-2 transition"
              >
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>

            <div className="mt-10 border-t border-border pt-6">
              <div className="flex gap-6 text-sm">
                {(["ingredients", "benefits", "directions"] as const).map((t) => (
                  <button key={t} onClick={() => setTab(t)} className={`uppercase tracking-widest text-xs pb-1 border-b-2 transition ${tab === t ? "border-gold text-gold" : "border-transparent text-muted-foreground"}`}>{t}</button>
                ))}
              </div>
              <div className="mt-5 text-sm text-foreground/85">
                {tab === "ingredients" && (
                  <ul className="grid grid-cols-2 gap-2">
                    {product.ingredients.map((i: string) => <li key={i} className="rounded-lg border border-border px-3 py-2">{i}</li>)}
                  </ul>
                )}
                {tab === "benefits" && (
                  <ul className="space-y-2">
                    {product.benefits.map((b: string) => <li key={b} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold" /> {b}</li>)}
                  </ul>
                )}
                {tab === "directions" && <p className="leading-relaxed">{product.directions}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-4xl md:text-5xl">Ritual companions</h2>
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm hover:text-gold">Shop all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-3">
          {related.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
        </div>
      </section>
    </>
  );
}
