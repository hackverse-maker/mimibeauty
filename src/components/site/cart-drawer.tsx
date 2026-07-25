import { Minus, Plus, X, ArrowRight, Check, Loader2, Edit2, ShieldCheck, AlertCircle, ShoppingBag, ExternalLink } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { generateWhatsAppMessage, openWhatsApp, type CustomerDetails } from "@/lib/whatsapp-config";

// Dynamic import for framer-motion to avoid SSR issues
const AnimatePresence = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  const [AnimatePresenceComp, setAnimatePresenceComp] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    import("framer-motion").then((mod) => {
      setAnimatePresenceComp(() => mod.AnimatePresence);
    });
  }, []);

  if (!isClient || !AnimatePresenceComp) {
    return <>{children}</>;
  }

  return <AnimatePresenceComp>{children}</AnimatePresenceComp>;
};

const MotionDiv = ({ children, className, ...props }: any) => {
  const [isClient, setIsClient] = useState(false);
  const [Motion, setMotion] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    import("framer-motion").then((mod) => {
      setMotion(() => mod.motion.div);
    });
  }, []);

  if (!isClient || !Motion) {
    return <div className={className}>{children}</div>;
  }

  return <Motion className={className} {...props}>{children}</Motion>;
};

type CheckoutStep = "cart" | "form" | "review" | "success";

export function CartDrawer() {
  const { open, setOpen, lines, remove, setQty, subtotal, count, clear } = useCart();
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [launchUrl, setLaunchUrl] = useState<string | null>(null);
  
  const formContainerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: "",
    phoneNumber: "",
    alternativeContact: "",
    email: "",
    houseShop: "",
    streetRoad: "",
    areaSector: "",
    city: "",
    province: "",
    postalCode: "",
    country: "Pakistan",
    landmark: "",
    deliveryTime: "",
    deliveryNotes: "",
  });

  // Calculate pricing based on application logic
  const shippingThreshold = 75;
  const shippingCost = subtotal > 0 && subtotal < shippingThreshold ? 10 : 0;
  const discountCost = 0;
  const finalTotal = subtotal + shippingCost - discountCost;

  // Reset checkout step when drawer opens/closes
  useEffect(() => {
    if (!open) {
      if (step === "success") {
        setStep("cart");
      }
    }
  }, [open, step]);

  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter a valid full name";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Mobile / WhatsApp number is required";
    } else if (!/^[+0-9\s\-()]{7,20}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Please enter a valid phone number (e.g. +92 300 1234567)";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.houseShop.trim()) {
      newErrors.houseShop = "House / Flat / Shop number is required";
    }

    if (!formData.streetRoad.trim()) {
      newErrors.streetRoad = "Street / Road name is required";
    }

    if (!formData.areaSector.trim()) {
      newErrors.areaSector = "Area / Sector / Block is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.province.trim()) {
      newErrors.province = "Province / State is required";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal / ZIP code is required";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (formContainerRef.current) {
        formContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
      return false;
    }

    return true;
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setStep("review");
    }
  };

  const handleConfirmOrder = async () => {
    if (lines.length === 0) {
      setErrors({ general: "Your cart is empty." });
      setStep("cart");
      return;
    }

    if (!validateForm()) {
      setStep("form");
      return;
    }

    setIsProcessing(true);
    setErrors({});
    setLaunchUrl(null);

    try {
      const message = generateWhatsAppMessage(
        formData,
        lines,
        subtotal,
        shippingCost,
        discountCost
      );

      const success = openWhatsApp(message);
      
      if (success) {
        // Clear cart ONLY after successful WhatsApp launch
        clear();
        setStep("success");
      } else {
        const encoded = encodeURIComponent(message);
        const fallbackUrl = `https://wa.me/1234567890?text=${encoded}`;
        setLaunchUrl(fallbackUrl);
        setErrors({
          general: "WhatsApp could not be opened automatically. Please use the button below to complete your order."
        });
      }
    } catch (err) {
      console.error("Order submission error:", err);
      setErrors({ general: "Failed to process order. Please try again." });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[70] bg-foreground/40 backdrop-blur-sm"
          />
          <MotionDiv
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            className="fixed right-0 top-0 z-[71] flex h-full w-full max-w-lg flex-col bg-background shadow-2xl"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
                  {step === "cart" && "Your Ritual"}
                  {step === "form" && "Checkout Step 1 of 2"}
                  {step === "review" && "Checkout Step 2 of 2"}
                  {step === "success" && "Order Completed"}
                </p>
                <h3 className="font-display text-2xl">
                  {step === "cart" && `Cart (${count})`}
                  {step === "form" && "Customer Details"}
                  {step === "review" && "Review Order"}
                  {step === "success" && "Order Initiated"}
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-secondary"
                aria-label="Close cart drawer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* STEP 1: CART VIEW */}
            {step === "cart" && (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  {lines.length === 0 ? (
                    <div className="grid h-full place-items-center text-center py-12">
                      <div>
                        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-gold/10 text-gold">
                          <ShoppingBag className="h-8 w-8 stroke-[1.2]" />
                        </div>
                        <p className="font-display text-2xl">Your cart is quiet.</p>
                        <p className="mt-2 text-sm text-muted-foreground">Discover a ritual made for you.</p>
                        <Link
                          to="/shop"
                          onClick={handleClose}
                          className="mt-6 inline-block rounded-full bg-foreground px-8 py-3 text-sm text-background transition hover:bg-gold"
                        >
                          Explore Shop
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Free shipping threshold banner */}
                      <div className="rounded-lg border border-gold/30 bg-gold/5 p-3 text-xs text-center text-foreground">
                        {subtotal >= shippingThreshold ? (
                          <span className="font-medium text-gold">🎉 You've unlocked Complimentary Shipping!</span>
                        ) : (
                          <span>
                            Add <strong className="text-gold">${(shippingThreshold - subtotal).toFixed(2)}</strong> more for <strong>Complimentary Shipping</strong>
                          </span>
                        )}
                      </div>

                      <ul className="space-y-6">
                        {lines.map(({ product, qty }) => (
                          <li key={product.slug} className="flex gap-4 border-b border-border/40 pb-5 last:border-0">
                            <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-secondary">
                              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="truncate font-display text-lg">{product.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Variant: {product.size || "Standard"}
                                  </p>
                                </div>
                                <button
                                  onClick={() => remove(product.slug)}
                                  className="text-muted-foreground transition-colors hover:text-foreground"
                                  aria-label={`Remove ${product.name}`}
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-2 rounded-full border border-border px-1">
                                  <button
                                    onClick={() => setQty(product.slug, qty - 1)}
                                    className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="w-6 text-center text-sm font-medium">{qty}</span>
                                  <button
                                    onClick={() => setQty(product.slug, qty + 1)}
                                    className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                                <p className="text-sm font-semibold">${(product.price * qty).toFixed(2)}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {lines.length > 0 && (
                  <div className="border-t border-border px-6 py-5 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Estimated Shipping</span>
                      <span className="font-medium">
                        {subtotal >= shippingThreshold ? "FREE" : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-border/50 flex justify-between font-display text-lg">
                      <span>Total</span>
                      <span className="text-gold">${finalTotal.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => setStep("form")}
                      className="mt-4 w-full rounded-full bg-gold py-3.5 text-sm font-medium tracking-wide text-background transition hover:bg-gold-soft flex items-center justify-center gap-2"
                    >
                      Proceed to Checkout <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </>
            )}

            {/* STEP 2: CUSTOMER DETAILS FORM */}
            {step === "form" && (
              <>
                <div ref={formContainerRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                  {errors.general && (
                    <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{errors.general}</span>
                    </div>
                  )}

                  <form onSubmit={handleProceedToReview} className="space-y-5">
                    {/* Section 1: Customer Contact Info */}
                    <div>
                      <h4 className="font-display text-lg border-b border-border pb-2 mb-4 text-gold">
                        1. Contact Information
                      </h4>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                            Full Name <span className="text-destructive">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:border-gold ${
                              errors.fullName ? "border-destructive bg-destructive/5" : "border-border bg-background"
                            }`}
                            placeholder="e.g. Ayesha Khan"
                          />
                          {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                              Mobile / WhatsApp <span className="text-destructive">*</span>
                            </label>
                            <input
                              type="tel"
                              value={formData.phoneNumber}
                              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                              className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:border-gold ${
                                errors.phoneNumber ? "border-destructive bg-destructive/5" : "border-border bg-background"
                              }`}
                              placeholder="+92 300 1234567"
                            />
                            {errors.phoneNumber && <p className="text-xs text-destructive mt-1">{errors.phoneNumber}</p>}
                          </div>
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                              Alternative Contact
                            </label>
                            <input
                              type="tel"
                              value={formData.alternativeContact}
                              onChange={(e) => handleInputChange("alternativeContact", e.target.value)}
                              className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-gold"
                              placeholder="Optional secondary number"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                            Email Address <span className="text-destructive">*</span>
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:border-gold ${
                              errors.email ? "border-destructive bg-destructive/5" : "border-border bg-background"
                            }`}
                            placeholder="ayesha@example.com"
                          />
                          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Delivery Address */}
                    <div>
                      <h4 className="font-display text-lg border-b border-border pb-2 mb-4 text-gold">
                        2. Delivery Address
                      </h4>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                            House / Flat / Shop Number <span className="text-destructive">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.houseShop}
                            onChange={(e) => handleInputChange("houseShop", e.target.value)}
                            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:border-gold ${
                              errors.houseShop ? "border-destructive bg-destructive/5" : "border-border bg-background"
                            }`}
                            placeholder="House # 42, Flat B-12, or Shop # 5"
                          />
                          {errors.houseShop && <p className="text-xs text-destructive mt-1">{errors.houseShop}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                            Street / Road Name <span className="text-destructive">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.streetRoad}
                            onChange={(e) => handleInputChange("streetRoad", e.target.value)}
                            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:border-gold ${
                              errors.streetRoad ? "border-destructive bg-destructive/5" : "border-border bg-background"
                            }`}
                            placeholder="Main Boulevard, Street 14"
                          />
                          {errors.streetRoad && <p className="text-xs text-destructive mt-1">{errors.streetRoad}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                            Area / Sector / Block <span className="text-destructive">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.areaSector}
                            onChange={(e) => handleInputChange("areaSector", e.target.value)}
                            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:border-gold ${
                              errors.areaSector ? "border-destructive bg-destructive/5" : "border-border bg-background"
                            }`}
                            placeholder="Gulberg III, Sector F-7, Block B"
                          />
                          {errors.areaSector && <p className="text-xs text-destructive mt-1">{errors.areaSector}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                              City <span className="text-destructive">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.city}
                              onChange={(e) => handleInputChange("city", e.target.value)}
                              className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:border-gold ${
                                errors.city ? "border-destructive bg-destructive/5" : "border-border bg-background"
                              }`}
                              placeholder="Lahore, Karachi, etc."
                            />
                            {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
                          </div>
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                              Province / State <span className="text-destructive">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.province}
                              onChange={(e) => handleInputChange("province", e.target.value)}
                              className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:border-gold ${
                                errors.province ? "border-destructive bg-destructive/5" : "border-border bg-background"
                              }`}
                              placeholder="Punjab, Sindh, NY"
                            />
                            {errors.province && <p className="text-xs text-destructive mt-1">{errors.province}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                              Postal / ZIP Code <span className="text-destructive">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.postalCode}
                              onChange={(e) => handleInputChange("postalCode", e.target.value)}
                              className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:border-gold ${
                                errors.postalCode ? "border-destructive bg-destructive/5" : "border-border bg-background"
                              }`}
                              placeholder="54000"
                            />
                            {errors.postalCode && <p className="text-xs text-destructive mt-1">{errors.postalCode}</p>}
                          </div>
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                              Country <span className="text-destructive">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.country}
                              onChange={(e) => handleInputChange("country", e.target.value)}
                              className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:border-gold ${
                                errors.country ? "border-destructive bg-destructive/5" : "border-border bg-background"
                              }`}
                              placeholder="Pakistan"
                            />
                            {errors.country && <p className="text-xs text-destructive mt-1">{errors.country}</p>}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                            Nearest Landmark
                          </label>
                          <input
                            type="text"
                            value={formData.landmark}
                            onChange={(e) => handleInputChange("landmark", e.target.value)}
                            className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-gold"
                            placeholder="Near Grand Mosque, Opposite Liberty Park"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                            Preferred Delivery Time
                          </label>
                          <select
                            value={formData.deliveryTime}
                            onChange={(e) => handleInputChange("deliveryTime", e.target.value)}
                            className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-gold"
                          >
                            <option value="">Anytime (Default)</option>
                            <option value="Morning (9:00 AM - 1:00 PM)">Morning (9:00 AM - 1:00 PM)</option>
                            <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                            <option value="Evening (5:00 PM - 9:00 PM)">Evening (5:00 PM - 9:00 PM)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                            Delivery Instructions / Notes
                          </label>
                          <textarea
                            value={formData.deliveryNotes}
                            onChange={(e) => handleInputChange("deliveryNotes", e.target.value)}
                            className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-gold resize-none"
                            placeholder="Please call upon arrival..."
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="border-t border-border px-6 py-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("cart")}
                    className="flex-1 rounded-full border border-border py-3 text-sm font-medium tracking-wide transition hover:bg-secondary"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="button"
                    onClick={handleProceedToReview}
                    className="flex-[2] rounded-full bg-gold py-3 text-sm font-medium tracking-wide text-background transition hover:bg-gold-soft flex items-center justify-center gap-2"
                  >
                    Review Order <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}

            {/* STEP 3: COMPLETE ORDER REVIEW */}
            {step === "review" && (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                  {errors.general && (
                    <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
                      <div className="flex items-center gap-2 font-medium">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{errors.general}</span>
                      </div>
                      {launchUrl && (
                        <a
                          href={launchUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
                        >
                          Open WhatsApp Manually <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  )}

                  {/* Review Card 1: Customer Details */}
                  <div className="rounded-xl border border-border bg-secondary/20 p-4 relative">
                    <div className="flex items-center justify-between border-b border-border/50 pb-2 mb-3">
                      <h4 className="font-display text-base text-gold flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" /> Customer Information
                      </h4>
                      <button
                        onClick={() => setStep("form")}
                        className="text-xs text-muted-foreground hover:text-gold flex items-center gap-1 transition-colors"
                      >
                        <Edit2 className="h-3 w-3" /> Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground block">Full Name</span>
                        <span className="font-medium text-foreground">{formData.fullName}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">WhatsApp Number</span>
                        <span className="font-medium text-foreground">{formData.phoneNumber}</span>
                      </div>
                      {formData.alternativeContact && (
                        <div>
                          <span className="text-muted-foreground block">Alternative Contact</span>
                          <span className="font-medium text-foreground">{formData.alternativeContact}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-muted-foreground block">Email Address</span>
                        <span className="font-medium text-foreground truncate block">{formData.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Review Card 2: Delivery Address */}
                  <div className="rounded-xl border border-border bg-secondary/20 p-4 relative">
                    <div className="flex items-center justify-between border-b border-border/50 pb-2 mb-3">
                      <h4 className="font-display text-base text-gold flex items-center gap-2">
                        📍 Delivery Address
                      </h4>
                      <button
                        onClick={() => setStep("form")}
                        className="text-xs text-muted-foreground hover:text-gold flex items-center gap-1 transition-colors"
                      >
                        <Edit2 className="h-3 w-3" /> Edit
                      </button>
                    </div>
                    <div className="space-y-1 text-xs">
                      <p className="font-medium text-foreground">{formData.houseShop}, {formData.streetRoad}</p>
                      <p className="text-muted-foreground">{formData.areaSector}, {formData.city}, {formData.province} {formData.postalCode}</p>
                      <p className="text-muted-foreground">{formData.country}</p>
                      {formData.landmark && (
                        <p className="text-xs text-gold/80 mt-1">Landmark: {formData.landmark}</p>
                      )}
                      {formData.deliveryTime && (
                        <p className="text-xs text-muted-foreground">Time: {formData.deliveryTime}</p>
                      )}
                      {formData.deliveryNotes && (
                        <p className="text-xs text-muted-foreground italic mt-1">Notes: "{formData.deliveryNotes}"</p>
                      )}
                    </div>
                  </div>

                  {/* Review Card 3: Order Items */}
                  <div className="rounded-xl border border-border bg-secondary/20 p-4">
                    <h4 className="font-display text-base text-gold border-b border-border/50 pb-2 mb-3">
                      🛍️ Order Details ({lines.length} {lines.length === 1 ? "item" : "items"})
                    </h4>
                    <div className="space-y-3">
                      {lines.map(({ product, qty }) => (
                        <div key={product.slug} className="flex items-center justify-between text-xs py-1.5 border-b border-border/30 last:border-0">
                          <div className="flex items-center gap-3 min-w-0">
                            <img src={product.image} alt={product.name} className="h-10 w-10 rounded-md object-cover bg-secondary" />
                            <div className="min-w-0">
                              <p className="font-medium truncate text-foreground text-sm">{product.name}</p>
                              <p className="text-muted-foreground">
                                Variant: {product.size || "Standard"} · Qty: {qty}
                              </p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-semibold text-foreground">${(product.price * qty).toFixed(2)}</p>
                            <p className="text-[10px] text-muted-foreground">${product.price.toFixed(2)} each</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Review Card 4: Pricing Breakdown */}
                  <div className="rounded-xl border border-gold/30 bg-gold/5 p-4 space-y-2 text-xs">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping Charges</span>
                      <span>{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                    {discountCost > 0 && (
                      <div className="flex justify-between text-emerald-500 font-medium">
                        <span>Discount</span>
                        <span>-${discountCost.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-gold/20 flex justify-between font-display text-base font-semibold text-foreground">
                      <span>Total Amount</span>
                      <span className="text-gold">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border px-6 py-4 space-y-3">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep("form")}
                      disabled={isProcessing}
                      className="flex-1 rounded-full border border-border py-3 text-sm font-medium tracking-wide transition hover:bg-secondary disabled:opacity-50"
                    >
                      Back to Edit
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmOrder}
                      disabled={isProcessing}
                      className="flex-[2] rounded-full bg-gold py-3 text-sm font-medium tracking-wide text-background transition hover:bg-gold-soft disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing Order...
                        </>
                      ) : (
                        <>
                          Confirm Order on WhatsApp <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-center text-muted-foreground">
                    Your details will be formatted into a WhatsApp order request.
                  </p>
                </div>
              </>
            )}

            {/* STEP 4: SUCCESS VIEW */}
            {step === "success" && (
              <div className="flex-1 flex flex-col justify-between p-8 text-center">
                <div className="my-auto space-y-6">
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5">
                    <Check className="h-10 w-10 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-semibold">
                      Order Initiated
                    </span>
                    <h3 className="font-display text-3xl mt-1 text-foreground">
                      Complete Order on WhatsApp
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    Your order details have been prepared in WhatsApp. Please ensure you tap <strong>Send</strong> in WhatsApp to submit your order to our team.
                  </p>
                  <div className="rounded-xl border border-border bg-secondary/20 p-4 text-xs text-left space-y-2">
                    <div className="flex justify-between border-b border-border/40 pb-2">
                      <span className="text-muted-foreground">Customer</span>
                      <span className="font-medium text-foreground">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/40 pb-2">
                      <span className="text-muted-foreground">Contact</span>
                      <span className="font-medium text-foreground">{formData.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Order Amount</span>
                      <span className="font-semibold text-gold">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={handleClose}
                    className="w-full rounded-full bg-gold py-3.5 text-sm font-medium tracking-wide text-background transition hover:bg-gold-soft"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </MotionDiv>
        </>
      )}
    </AnimatePresence>
  );
}

