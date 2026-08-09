"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart";

const WHATSAPP_NUMBER = "923274984584";

interface CustomerInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  zipCode: string;
  address: string;
  paymentMethod: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotal, clear } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    zipCode: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerInfo, string>> = {};

    if (!customerInfo.firstName.trim()) newErrors.firstName = "Required";
    if (!customerInfo.lastName.trim()) newErrors.lastName = "Required";
    if (!customerInfo.phone.trim()) newErrors.phone = "Required";
    if (!customerInfo.email.trim()) {
      newErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = "Invalid email";
    }
    if (!customerInfo.country.trim()) newErrors.country = "Required";
    if (!customerInfo.city.trim()) newErrors.city = "Required";
    if (!customerInfo.zipCode.trim()) newErrors.zipCode = "Required";
    if (!customerInfo.address.trim()) newErrors.address = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const shipping = 0;
  const tax = subtotal * 0.1;
  const grandTotal = subtotal + shipping + tax;

  const formatWhatsAppMessage = (): string => {
    let message = `🛍 *NEW ORDER*\n\n`;
    message += `👤 *Customer Information*\n`;
    message += `Name: ${customerInfo.firstName} ${customerInfo.lastName}\n`;
    message += `Phone: ${customerInfo.phone}\n`;
    message += `Email: ${customerInfo.email}\n\n`;
    message += `📍 *Shipping Address*\n`;
    message += `Address: ${customerInfo.address}\n`;
    message += `City: ${customerInfo.city}, ${customerInfo.zipCode}\n`;
    message += `Country: ${customerInfo.country}\n\n`;
    message += `💳 *Payment Method*: ${customerInfo.paymentMethod}\n\n`;
    message += `🛒 *Order Items*\n\n`;

    lines.forEach((line, index) => {
      const { product, qty } = line;
      message += `• ${index + 1}. ${product.name}\n`;
      message += `   Quantity: ${qty}\n`;
      message += `   Unit Price: $${(product.price / 100).toFixed(2)}\n`;
      message += `   Item Total: $${((product.price * qty) / 100).toFixed(2)}\n\n`;
    });

    message += `💰 *Order Summary*\n`;
    message += `Subtotal: $${(subtotal / 100).toFixed(2)}\n`;
    message += `Shipping: $${(shipping / 100).toFixed(2)}\n`;
    message += `Tax: $${(tax / 100).toFixed(2)}\n`;
    message += `Grand Total: $${(grandTotal / 100).toFixed(2)}\n\n`;
    message += `Please confirm my order.`;

    return message;
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    const message = formatWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
    
    // Clear cart and redirect
    clear();
    router.push("/checkout/success");
  };

  if (lines.length === 0) {
    return (
      <main className="min-h-screen bg-[#0B0F0D] pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-[#F8F4ED] mb-4">Your Cart is Empty</h1>
          <p className="text-[#B8B5AC] mb-8">Add some luxury items to proceed to checkout.</p>
          <button
            onClick={() => router.push("/shop")}
            className="rounded-full bg-[#D4B483] px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#0B0F0D] transition hover:shadow-[0_0_20px_rgba(212,180,131,0.3)]"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <style>{`
        .checkout-input {
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(229,212,192,0.14);
          border-radius: 8px;
          color: #F8F4ED;
          font-family: var(--font-sans);
          font-size: 14px;
          padding: 12px 16px;
          width: 100%;
          outline: none;
          transition: border-color 0.25s, background 0.25s;
        }
        .checkout-input::placeholder { color: rgba(229,212,192,0.28); }
        .checkout-input:focus {
          border-color: rgba(229,212,192,0.45);
          background: rgba(255,255,255,0.055);
        }
        .checkout-input.error { border-color: rgba(239, 68, 68, 0.5); }
      `}</style>

      <main className="min-h-screen bg-[#0B0F0D] pt-32 pb-20 px-6 relative">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="font-display text-4xl lg:text-5xl text-[#F8F4ED] mb-12 italic">Checkout</h1>

          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-start">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-8">
                
                {/* Shipping Details */}
                <section>
                  <h2 className="text-[#D4B483] text-sm uppercase tracking-[0.2em] font-semibold mb-6">Shipping Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <input
                        placeholder="First Name"
                        value={customerInfo.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={`checkout-input ${errors.firstName ? 'error' : ''}`}
                      />
                      {errors.firstName && <span className="text-[10px] text-red-400 mt-1 block">{errors.firstName}</span>}
                    </div>
                    <div>
                      <input
                        placeholder="Last Name"
                        value={customerInfo.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={`checkout-input ${errors.lastName ? 'error' : ''}`}
                      />
                      {errors.lastName && <span className="text-[10px] text-red-400 mt-1 block">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={customerInfo.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`checkout-input ${errors.email ? 'error' : ''}`}
                      />
                      {errors.email && <span className="text-[10px] text-red-400 mt-1 block">{errors.email}</span>}
                    </div>
                    <div>
                      <input
                        placeholder="Phone Number"
                        value={customerInfo.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={`checkout-input ${errors.phone ? 'error' : ''}`}
                      />
                      {errors.phone && <span className="text-[10px] text-red-400 mt-1 block">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="mb-4">
                    <input
                      placeholder="Street Address"
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className={`checkout-input ${errors.address ? 'error' : ''}`}
                    />
                    {errors.address && <span className="text-[10px] text-red-400 mt-1 block">{errors.address}</span>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <input
                        placeholder="City"
                        value={customerInfo.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className={`checkout-input ${errors.city ? 'error' : ''}`}
                      />
                      {errors.city && <span className="text-[10px] text-red-400 mt-1 block">{errors.city}</span>}
                    </div>
                    <div>
                      <input
                        placeholder="Postal Code"
                        value={customerInfo.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        className={`checkout-input ${errors.zipCode ? 'error' : ''}`}
                      />
                      {errors.zipCode && <span className="text-[10px] text-red-400 mt-1 block">{errors.zipCode}</span>}
                    </div>
                    <div>
                      <input
                        placeholder="Country"
                        value={customerInfo.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        className={`checkout-input ${errors.country ? 'error' : ''}`}
                      />
                      {errors.country && <span className="text-[10px] text-red-400 mt-1 block">{errors.country}</span>}
                    </div>
                  </div>
                </section>

                <div className="w-full border-t border-white/10"></div>

                {/* Payment Method */}
                <section>
                  <h2 className="text-[#D4B483] text-sm uppercase tracking-[0.2em] font-semibold mb-6">Payment Method</h2>
                  <div className="space-y-3">
                    {["Cash on Delivery", "Bank Transfer", "Stripe (coming soon)", "PayPal (coming soon)"].map((method) => (
                      <label key={method} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${customerInfo.paymentMethod === method ? 'border-[#D4B483] bg-[#D4B483]/5' : 'border-white/10 hover:border-white/20 bg-white/5'} ${method.includes('soon') ? 'opacity-50 pointer-events-none' : ''}`}>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${customerInfo.paymentMethod === method ? 'border-[#D4B483]' : 'border-white/30'}`}>
                          {customerInfo.paymentMethod === method && <div className="w-2 h-2 rounded-full bg-[#D4B483]"></div>}
                        </div>
                        <span className="text-[#F8F4ED] text-sm">{method}</span>
                      </label>
                    ))}
                  </div>
                </section>
              </form>
            </motion.div>

            {/* Order Summary Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-[#111814] border border-white/5 rounded-2xl p-6 lg:p-8 sticky top-32">
                <h2 className="text-[#D4B483] text-sm uppercase tracking-[0.2em] font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {lines.map((line) => (
                    <div key={line.product.slug} className="flex gap-4">
                      <div className="h-20 w-16 shrink-0 rounded-md overflow-hidden bg-white/5">
                        <img src={line.product.image} alt={line.product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <p className="text-[#F8F4ED] font-display text-lg leading-tight">{line.product.name}</p>
                        <p className="text-xs text-[#B8B5AC] mt-1">Qty: {line.qty}</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-[#F8F4ED] text-sm">${((line.product.price * line.qty) / 100).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Box */}
                <div className="flex gap-2 mb-8">
                  <input placeholder="Gift card or discount code" className="checkout-input flex-1" />
                  <button className="bg-white/10 hover:bg-white/15 transition text-[#F8F4ED] px-4 rounded-lg text-sm font-medium">Apply</button>
                </div>

                <div className="space-y-3 mb-8 border-t border-white/10 pt-6">
                  <div className="flex justify-between text-sm text-[#B8B5AC]">
                    <span>Subtotal</span>
                    <span>${(subtotal / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#B8B5AC]">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#B8B5AC]">
                    <span>Tax (10%)</span>
                    <span>${(tax / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg text-[#D4B483] font-display pt-3 border-t border-white/10 mt-3">
                    <span>Total</span>
                    <span>${(grandTotal / 100).toFixed(2)}</span>
                  </div>
                </div>

                <motion.button
                  form="checkout-form"
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-[#D4B483] py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#0B0F0D] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(212,180,131,0.3)] flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "PLACE ORDER"
                  )}
                </motion.button>
                <p className="text-center text-[11px] text-[#B8B5AC] mt-4">
                  By placing your order, you agree to our Terms of Service.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
