export const WHATSAPP_CONFIG = {
  // Replace with your actual business WhatsApp number (without + or spaces)
  // Example: "1234567890" for +1 234 567 890
  businessNumber: "1234567890",
  
  // WhatsApp API base URL
  apiBaseUrl: "https://wa.me",
};

export type CustomerDetails = {
  fullName: string;
  phoneNumber: string;
  alternativeContact?: string;
  email: string;
  houseShop: string;
  streetRoad: string;
  areaSector: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  landmark?: string;
  deliveryTime?: string;
  deliveryNotes?: string;
};

export function generateWhatsAppMessage(
  customerDetails: CustomerDetails,
  cartLines: Array<{ product: any; qty: number }>,
  subtotal: number,
  shipping: number = 0,
  discount: number = 0
): string {
  const finalTotal = subtotal + shipping - discount;

  let message = `NEW ORDER\n\n`;

  // Customer Details
  message += `Customer Details:\n`;
  message += `Name: ${customerDetails.fullName.trim()}\n`;
  message += `WhatsApp: ${customerDetails.phoneNumber.trim()}\n`;
  message += `Alternative Contact: ${customerDetails.alternativeContact?.trim() || "N/A"}\n`;
  message += `Email: ${customerDetails.email.trim()}\n\n`;

  // Delivery Address
  message += `Delivery Address:\n`;
  message += `House/Shop: ${customerDetails.houseShop.trim()}\n`;
  message += `Street/Road: ${customerDetails.streetRoad.trim()}\n`;
  message += `Area: ${customerDetails.areaSector.trim()}\n`;
  message += `City: ${customerDetails.city.trim()}\n`;
  message += `Province/State: ${customerDetails.province.trim()}\n`;
  message += `Postal Code: ${customerDetails.postalCode.trim()}\n`;
  message += `Country: ${customerDetails.country.trim()}\n`;
  message += `Nearest Landmark: ${customerDetails.landmark?.trim() || "N/A"}\n`;
  message += `Preferred Delivery Time: ${customerDetails.deliveryTime?.trim() || "N/A"}\n`;
  message += `Delivery Notes: ${customerDetails.deliveryNotes?.trim() || "N/A"}\n\n`;

  // Order Items
  message += `Order Items:\n\n`;
  cartLines.forEach((line, index) => {
    const itemPrice = line.product.price;
    const itemSubtotal = itemPrice * line.qty;
    const variant = line.product.size || line.product.variant || "Standard";
    message += `${index + 1}. ${line.product.name}\n`;
    message += `   Variant: ${variant}\n`;
    message += `   Quantity: ${line.qty}\n`;
    message += `   Price: $${itemPrice.toFixed(2)}\n`;
    message += `   Subtotal: $${itemSubtotal.toFixed(2)}\n\n`;
  });

  // Order Summary
  message += `Order Summary:\n`;
  message += `Subtotal: $${subtotal.toFixed(2)}\n`;
  message += `Shipping: ${shipping === 0 ? "$0.00" : `$${shipping.toFixed(2)}`}\n`;
  message += `Discount: ${discount === 0 ? "$0.00" : `-$${discount.toFixed(2)}`}\n`;
  message += `TOTAL: $${finalTotal.toFixed(2)}\n\n`;

  message += `Please confirm my order.`;

  return message;
}

export function openWhatsApp(message: string): boolean {
  try {
    const encodedMessage = encodeURIComponent(message);
    const url = `${WHATSAPP_CONFIG.apiBaseUrl}/${WHATSAPP_CONFIG.businessNumber}?text=${encodedMessage}`;
    const newWin = window.open(url, "_blank", "noopener,noreferrer");
    if (!newWin || newWin.closed || typeof newWin.closed === "undefined") {
      window.location.href = url;
    }
    return true;
  } catch (err) {
    console.error("Failed to open WhatsApp:", err);
    return false;
  }
}

