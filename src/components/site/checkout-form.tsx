"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { CartLine } from "@/lib/cart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const WHATSAPP_NUMBER = "923239847938"; // Using the phone number from footer (03239847938)

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
}

export function CheckoutForm() {
  const { lines, subtotal, setOpen } = useCart();
  const [showForm, setShowForm] = useState(false);
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
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerInfo, string>> = {};

    if (!customerInfo.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!customerInfo.phone.trim()) {
      newErrors.phone = "Phone number is required";
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatWhatsAppMessage = (): string => {
    const shipping = 0;
    const discount = 0;
    const tax = 0;
    const grandTotal = subtotal;

    const subtotalInDollars = subtotal;
    const shippingInDollars = shipping;
    const discountInDollars = discount;
    const taxInDollars = tax;
    const grandTotalInDollars = grandTotal;

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

🛒 Order Items

`;

    lines.forEach((line: CartLine, index: number) => {
      const { product, qty, isBundle, bundlePrice, giftPackaging } = line;
      const unitPrice = isBundle && bundlePrice ? bundlePrice : product.price;
      const totalPrice = unitPrice * qty;
      message += `• ${index + 1}. ${product.name}${giftPackaging ? " (Gift Packaging)" : ""}
   Variant: ${product.size}
   Color: ${product.collection}
   Size: ${product.size}
   Quantity: ${qty}
   Unit Price: PKR ${unitPrice.toLocaleString()}
   Item Total: PKR ${totalPrice.toLocaleString()}

`;
    });

    message += `━━━━━━━━━━━━━━━━━━

💰 Order Summary

Subtotal: PKR ${subtotalInDollars.toLocaleString()}
Shipping: Free
Discount: Free
Tax: Free
Grand Total: PKR ${grandTotalInDollars.toLocaleString()}

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

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (lines.length === 0) {
      alert("Your cart is empty. Please add items before checkout.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    const message = formatWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    // Close cart drawer
    setOpen(false);
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
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

      <div className="border-t pt-3 space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Subtotal</span>
          <span>PKR {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Tax</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between text-sm font-bold">
          <span>Total</span>
          <span>PKR {subtotal.toLocaleString()}</span>
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
          className="flex-1 rounded-full bg-gold py-3 text-sm font-medium tracking-wide text-background transition hover:bg-gold-soft"
        >
          Place Order
        </button>
      </div>
    </form>
  );
}
