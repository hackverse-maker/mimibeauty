"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { CartLine } from "@/lib/cart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const WHATSAPP_NUMBER = "923274984584"; // Using the phone number from footer (03274984584)

interface CustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  address: string;
  orderNotes: string;
  paymentMethod: string;
}

export function CheckoutForm() {
  const { lines, subtotal, setOpen } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: "",
    phone: "",
    email: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    address: "",
    orderNotes: "",
    paymentMethod: "Cash on Delivery",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerInfo, string>> = {};

    if (!customerInfo.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!customerInfo.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[+]?[\d\s-]{10,}$/.test(customerInfo.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!customerInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!customerInfo.country.trim()) {
      newErrors.country = "Country is required";
    }
    if (!customerInfo.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!customerInfo.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!customerInfo.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    }
    if (!customerInfo.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!customerInfo.paymentMethod || customerInfo.paymentMethod.includes("coming soon")) {
      newErrors.paymentMethod = "Please select a payment method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatWhatsAppMessage = (): string => {
    const shipping = 0;
    const discount = 0;
    const tax = subtotal * 0.1;
    const grandTotal = subtotal + shipping - discount + tax;

    const now = new Date();
    const orderDate = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const orderTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    let message = `🛍 *NEW ORDER*

━━━━━━━━━━━━━━━━━━

👤 Customer Information

Name: ${customerInfo.fullName}
Phone: ${customerInfo.phone}
Email: ${customerInfo.email}

━━━━━━━━━━━━━━━━━━

📍 Shipping Address

Country: ${customerInfo.country}
State: ${customerInfo.state}
City: ${customerInfo.city}
ZIP: ${customerInfo.zipCode}
Street Address: ${customerInfo.address}

━━━━━━━━━━━━━━━━━━

� Payment Method: ${customerInfo.paymentMethod}

━━━━━━━━━━━━━━━━━━

�🛒 Order Items

`;

    lines.forEach((line: CartLine, index: number) => {
      const { product, qty } = line;
      const totalPrice = product.price * qty;
      message += `• ${index + 1}. ${product.name}
   Variant: ${product.size}
   Color: ${product.collection}
   Size: ${product.size}
   Quantity: ${qty}
   Unit Price: PKR ${product.price.toLocaleString()}
   Item Total: PKR ${totalPrice.toLocaleString()}

`;
    });

    message += `━━━━━━━━━━━━━━━━━━

💰 Order Summary

Subtotal: PKR ${subtotal.toLocaleString()}
Shipping: PKR ${shipping.toLocaleString()}
Discount: PKR ${discount.toLocaleString()}
Tax: PKR ${tax.toLocaleString()}
Grand Total: PKR ${grandTotal.toLocaleString()}

━━━━━━━━━━━━━━━━━━

📝 Notes

${customerInfo.orderNotes || "None"}

━━━━━━━━━━━━━━━━━━

📅 Order Date: ${orderDate}
🕒 Order Time: ${orderTime}

━━━━━━━━━━━━━━━━━━

Please confirm my order.`;

    return message;
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    if (lines.length === 0) {
      setSubmitError("Your cart is empty. Please add items before checkout.");
      setIsSubmitting(false);
      return;
    }

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Validate product data
      for (const line of lines) {
        if (!line.product || !line.product.price || line.product.price <= 0) {
          setSubmitError(`Invalid product data for ${line.product?.name || 'unknown product'}. Please remove this item and try again.`);
          setIsSubmitting(false);
          return;
        }
      }

      // Prepare order data for email
      const shipping = 0;
      const discount = 0;
      const tax = subtotal * 0.1;
      const grandTotal = subtotal + shipping - discount + tax;

      const now = new Date();
      const orderDate = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const orderTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const orderItems = lines.map((line) => ({
        name: line.product.name,
        size: line.product.size,
        collection: line.product.collection,
        quantity: line.qty,
        unitPrice: line.product.price,
        itemTotal: line.product.price * line.qty,
      }));

      const orderData = {
        customerInfo,
        orderItems,
        orderSummary: {
          subtotal,
          shipping,
          discount,
          tax,
          grandTotal,
        },
        orderDate,
        orderTime,
      };

      // Send order email to owner
      try {
        const emailResponse = await fetch('/api/send-order-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        if (!emailResponse.ok) {
          const errorText = await emailResponse.text();
          console.error('Failed to send order email:', errorText);
          // Continue with WhatsApp even if email fails
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Continue with WhatsApp even if email fails
      }

      // Generate WhatsApp message
      const message = formatWhatsAppMessage();
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, "_blank");

      // Close cart drawer
      setOpen(false);
    } catch (error) {
      console.error('Checkout error:', error);
      setSubmitError('There was an error processing your order. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    if (method.includes('coming soon')) return; // Prevent selecting disabled methods
    setCustomerInfo((prev) => ({ ...prev, paymentMethod: method }));
    if (errors.paymentMethod) {
      setErrors((prev) => ({ ...prev, paymentMethod: undefined }));
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full rounded-full bg-gold py-3.5 text-sm font-medium tracking-wide text-background transition hover:bg-gold-soft"
      >
        Checkout · PKR {subtotal.toLocaleString()}
      </button>
    );
  }

  return (
    <form onSubmit={handleCheckout} className="space-y-3 pt-4 border-t border-border">
      {submitError && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {submitError}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="fullName">
          Full Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="fullName"
          value={customerInfo.fullName}
          onChange={(e) => handleInputChange("fullName", e.target.value)}
          placeholder="John Doe"
          className={errors.fullName ? "border-red-500" : ""}
        />
        {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">
          Phone <span className="text-red-500">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          value={customerInfo.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          placeholder="+92 300 1234567"
          className={errors.phone ? "border-red-500" : ""}
        />
        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={customerInfo.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="john@example.com"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-2">
          <Label htmlFor="country">
            Country <span className="text-red-500">*</span>
          </Label>
          <Input
            id="country"
            value={customerInfo.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
            placeholder="Pakistan"
            className={errors.country ? "border-red-500" : ""}
          />
          {errors.country && <p className="text-xs text-red-500">{errors.country}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">
            State <span className="text-red-500">*</span>
          </Label>
          <Input
            id="state"
            value={customerInfo.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            placeholder="Punjab"
            className={errors.state ? "border-red-500" : ""}
          />
          {errors.state && <p className="text-xs text-red-500">{errors.state}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-2">
          <Label htmlFor="city">
            City <span className="text-red-500">*</span>
          </Label>
          <Input
            id="city"
            value={customerInfo.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            placeholder="Lahore"
            className={errors.city ? "border-red-500" : ""}
          />
          {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">
            ZIP <span className="text-red-500">*</span>
          </Label>
          <Input
            id="zipCode"
            value={customerInfo.zipCode}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            placeholder="54000"
            className={errors.zipCode ? "border-red-500" : ""}
          />
          {errors.zipCode && <p className="text-xs text-red-500">{errors.zipCode}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">
          Address <span className="text-red-500">*</span>
        </Label>
        <Input
          id="address"
          value={customerInfo.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          placeholder="123 Main Street"
          className={errors.address ? "border-red-500" : ""}
        />
        {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="orderNotes">Notes (Optional)</Label>
        <Input
          id="orderNotes"
          value={customerInfo.orderNotes}
          onChange={(e) => handleInputChange("orderNotes", e.target.value)}
          placeholder="Special instructions..."
        />
      </div>

      <div className="space-y-2">
        <Label>Payment Method <span className="text-red-500">*</span></Label>
        <div className="space-y-2">
          {["Cash on Delivery", "Bank Transfer", "Stripe (coming soon)", "PayPal (coming soon)"].map((method) => (
            <label key={method} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${customerInfo.paymentMethod === method ? 'border-gold bg-gold/10' : 'border-border hover:border-gold/50 bg-background'} ${method.includes('soon') ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${customerInfo.paymentMethod === method ? 'border-gold' : 'border-border'}`}>
                {customerInfo.paymentMethod === method && <div className="w-2 h-2 rounded-full bg-gold"></div>}
              </div>
              <span className="text-sm">{method}</span>
            </label>
          ))}
        </div>
        {errors.paymentMethod && <p className="text-xs text-red-500">{errors.paymentMethod}</p>}
      </div>

      <div className="border-t pt-3 space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Subtotal</span>
          <span>PKR {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Shipping</span>
          <span>PKR 0</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Tax (10%)</span>
          <span>PKR {(subtotal * 0.1).toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm font-bold">
          <span>Total</span>
          <span>PKR {(subtotal * 1.1).toLocaleString()}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="flex-1 rounded-full border border-border py-3 text-sm font-medium tracking-wide transition hover:bg-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-full border border-gold/50 bg-gold/10 py-3 text-sm font-medium uppercase tracking-[0.2em] text-foreground transition-all duration-400 hover:border-gold hover:bg-gold hover:text-background disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Processing..." : "Place Order"}
        </button>
      </div>
    </form>
  );
}
