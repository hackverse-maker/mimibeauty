"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Plus, Minus, ShoppingBag } from "lucide-react";
import { findBundle, type Bundle } from "@/lib/bundles";
import { products, findProduct, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { notFound, redirect } from "next/navigation";

export default function BundleDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  
  if (resolvedParams.slug === "make-your-own-bundle") {
    redirect("/bundles/make-your-own-bundle");
  }

  const bundle = findBundle(resolvedParams.slug);
  const { addBundle } = useCart();

  const [selectedBodyOil, setSelectedBodyOil] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("2");
  const [quantity, setQuantity] = useState(1);

  if (!bundle) {
    notFound();
  }

  const bundleProducts = bundle.productIds
    .map(id => findProduct(id))
    .filter((p): p is Product => p !== undefined);

  const bodyOils = products.filter(p => p.category === "BODY");

  const handleBodyOilSelect = (productId: string) => {
    setSelectedBodyOil(productId);
  };

  const handleProductToggle = (productId: string) => {
    if (bundle.configuration.selectionMode === "single") {
      setSelectedProducts([productId]);
    } else {
      const maxSelections = bundle.configuration.maxSelections || 7;
      const currentSelections = selectedOption === "2" ? 2 : (bundle.configuration.maxSelections || 4);
      
      if (selectedProducts.includes(productId)) {
        setSelectedProducts(selectedProducts.filter(id => id !== productId));
      } else if (selectedProducts.length < currentSelections) {
        setSelectedProducts([...selectedProducts, productId]);
      }
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setSelectedProducts([]);
  };

  const getFinalProducts = () => {
    if (bundle.id === "all-4-products") {
      const bodyOil = selectedBodyOil ? findProduct(selectedBodyOil) : null;
      return [...bundleProducts, bodyOil].filter((p): p is Product => p !== undefined);
    }
    if (bundle.id === "body-lava-bundle") {
      return selectedProducts.map(id => findProduct(id)).filter((p): p is Product => p !== undefined);
    }
    if (bundle.id === "make-your-own-bundle") {
      return selectedProducts.map(id => findProduct(id)).filter((p): p is Product => p !== undefined);
    }
    return bundleProducts;
  };

  const getFinalPrice = () => {
    if (bundle.id === "body-lava-bundle") {
      const option = bundle.configuration.selectionOptions?.find(o => o.count === parseInt(selectedOption));
      return option?.price || bundle.finalPrice;
    }
    if (bundle.id === "make-your-own-bundle") {
      const selected = selectedProducts.map(id => findProduct(id)).filter((p): p is Product => p !== undefined);
      const originalPrice = selected.reduce((sum, p) => sum + p.price, 0);
      const discount = originalPrice * 0.1;
      return originalPrice - discount;
    }
    return bundle.finalPrice;
  };

  const getOriginalPrice = () => {
    if (bundle.id === "body-lava-bundle") {
      const option = bundle.configuration.selectionOptions?.find(o => o.count === parseInt(selectedOption));
      return option?.price ? option.price / 0.9 : bundle.originalPrice;
    }
    if (bundle.id === "make-your-own-bundle") {
      const selected = selectedProducts.map(id => findProduct(id)).filter((p): p is Product => p !== undefined);
      return selected.reduce((sum, p) => sum + p.price, 0);
    }
    return bundle.originalPrice;
  };

  const canAddToCart = () => {
    if (bundle.id === "all-4-products") {
      return selectedBodyOil !== "";
    }
    if (bundle.id === "body-lava-bundle") {
      const required = parseInt(selectedOption);
      return selectedProducts.length === required;
    }
    if (bundle.id === "make-your-own-bundle") {
      return selectedProducts.length >= 2;
    }
    return true;
  };

  const handleAddToCart = () => {
    const finalProducts = getFinalProducts();
    const selectedOptions: Record<string, string> = {};
    
    if (bundle.id === "all-4-products") {
      selectedOptions.bodyOil = selectedBodyOil;
    }
    if (bundle.id === "body-lava-bundle") {
      selectedOptions.option = selectedOption;
    }

    addBundle(bundle, finalProducts, selectedOptions, quantity);
  };

  const selectionCount = selectedOption === "2" ? 2 : (bundle.configuration.maxSelections || 4);
  const selectedCount = selectedProducts.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/bundles" className="text-sm text-muted-foreground hover:text-gold transition-colors">
            ← Back to Bundles
          </Link>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-8">
              <div className="aspect-square rounded-2xl overflow-hidden bg-secondary/30 border border-border/50 mb-4">
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Flagship Badge */}
              {bundle.isFlagship && (
                <div className="absolute top-4 left-4 bg-foreground text-background px-4 py-2 text-sm font-medium uppercase tracking-wider">
                  Flagship Collection
                </div>
              )}
            </div>
          </motion.div>

          {/* Right - Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Discount Badge */}
            {bundle.discountPercent > 0 && (
              <div className="inline-block bg-gold text-background px-4 py-2 text-sm font-medium uppercase tracking-wider mb-6">
                {bundle.discountPercent}% OFF
              </div>
            )}

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-foreground mb-4">
              {bundle.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">{bundle.description}</p>

            {/* Pricing */}
            <div className="flex items-baseline gap-4 mb-8">
              <p className="text-3xl font-display text-foreground">
                PKR {getFinalPrice().toLocaleString()}
              </p>
              {getOriginalPrice() > getFinalPrice() && (
                <>
                  <p className="text-xl text-muted-foreground line-through">
                    PKR {getOriginalPrice().toLocaleString()}
                  </p>
                  <p className="text-lg text-gold">
                    Save PKR {(getOriginalPrice() - getFinalPrice()).toLocaleString()}
                  </p>
                </>
              )}
            </div>

            {/* Configuration */}
            {bundle.id === "all-4-products" && (
              <div className="mb-8">
                <h3 className="text-sm font-medium uppercase tracking-wider text-gold mb-4">
                  Choose Your Body Oil
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {bodyOils.map((oil) => (
                    <button
                      key={oil.slug}
                      onClick={() => handleBodyOilSelect(oil.slug)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedBodyOil === oil.slug
                          ? "border-gold bg-gold/10"
                          : "border-border hover:border-gold/50"
                      }`}
                    >
                      <img
                        src={oil.image}
                        alt={oil.name}
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <p className="text-sm font-medium">{oil.name}</p>
                      {selectedBodyOil === oil.slug && (
                        <div className="absolute top-2 right-2 bg-gold text-background rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {bundle.id === "body-lava-bundle" && (
              <div className="mb-8">
                <h3 className="text-sm font-medium uppercase tracking-wider text-gold mb-4">
                  Choose Your Set
                </h3>
                <div className="flex gap-4 mb-6">
                  {bundle.configuration.selectionOptions?.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => handleOptionSelect(option.count.toString())}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                        selectedOption === option.count.toString()
                          ? "border-gold bg-gold/10"
                          : "border-border hover:border-gold/50"
                      }`}
                    >
                      <p className="font-display text-lg">{option.name}</p>
                      <p className="text-gold">PKR {option.price.toLocaleString()}</p>
                    </button>
                  ))}
                </div>

                <h3 className="text-sm font-medium uppercase tracking-wider text-gold mb-4">
                  Select Products ({selectedCount}/{selectionCount})
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {bodyOils.map((oil) => (
                    <button
                      key={oil.slug}
                      onClick={() => handleProductToggle(oil.slug)}
                      disabled={!selectedProducts.includes(oil.slug) && selectedProducts.length >= selectionCount}
                      className={`p-4 rounded-lg border-2 transition-all relative ${
                        selectedProducts.includes(oil.slug)
                          ? "border-gold bg-gold/10"
                          : "border-border hover:border-gold/50"
                      } ${!selectedProducts.includes(oil.slug) && selectedProducts.length >= selectionCount ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <img
                        src={oil.image}
                        alt={oil.name}
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <p className="text-sm font-medium">{oil.name}</p>
                      {selectedProducts.includes(oil.slug) && (
                        <div className="absolute top-2 right-2 bg-gold text-background rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {bundle.id === "make-your-own-bundle" && (
              <div className="mb-8">
                <h3 className="text-sm font-medium uppercase tracking-wider text-gold mb-4">
                  Select Products ({selectedProducts.length}/7)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <button
                      key={product.slug}
                      onClick={() => handleProductToggle(product.slug)}
                      className={`p-4 rounded-lg border-2 transition-all relative ${
                        selectedProducts.includes(product.slug)
                          ? "border-gold bg-gold/10"
                          : "border-border hover:border-gold/50"
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">PKR {product.price.toLocaleString()}</p>
                      {selectedProducts.includes(product.slug) && (
                        <div className="absolute top-2 right-2 bg-gold text-background rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {selectedProducts.length >= 2 && (
                  <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Original Total:</span>
                      <span>PKR {getOriginalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Bundle Discount (10%):</span>
                      <span className="text-gold">-PKR {(getOriginalPrice() * 0.1).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-medium">
                      <span>Final Price:</span>
                      <span className="text-gold">PKR {getFinalPrice().toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-medium uppercase tracking-wider text-gold mb-4">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-gold transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-gold transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!canAddToCart()}
              className="w-full rounded-full bg-gold py-4 text-sm font-medium uppercase tracking-[0.2em] text-background hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              Add to Cart · PKR {(getFinalPrice() * quantity).toLocaleString()}
            </button>

            <Link
              href="/checkout"
              className="block w-full rounded-full border border-gold py-4 text-sm font-medium uppercase tracking-[0.2em] text-gold hover:bg-gold/10 transition-colors text-center"
            >
              Buy Now
            </Link>
          </motion.div>
        </div>

        {/* What's Inside Section */}
        <section className="mt-20">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-8 text-center">
            What's Inside
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {getFinalProducts().map((product) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl bg-secondary/20 border border-border/50 flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-28 flex items-center justify-center mb-3 overflow-hidden rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain mx-auto"
                    />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-1">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{product.tagline}</p>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border/20">
                  <p className="text-gold font-medium text-xs sm:text-sm">PKR {product.price.toLocaleString()}</p>
                  <Link
                    href={`/product/${product.slug}`}
                    className="text-xs text-foreground hover:text-gold transition-colors"
                  >
                    View Product →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
