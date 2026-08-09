"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";

export default function CheckoutSuccessPage() {
  const { clear } = useCart();
  
  useEffect(() => {
    // Ensure the cart is empty
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0F0D] flex items-center justify-center p-6 relative overflow-hidden">
      {/* ─── Ambient glow orbs ─── */}
      <div 
        className="absolute rounded-full blur-[80px] pointer-events-none" 
        style={{ width: 480, height: 480, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: "rgba(212,180,131,0.08)" }} 
      />

      <div className="max-w-lg w-full z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1
          }}
          className="mb-8"
        >
          <div className="w-24 h-24 rounded-full border border-[#D4B483]/30 bg-[#D4B483]/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-[#D4B483]" strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="font-display text-4xl md:text-5xl text-[#F8F4ED] mb-4">
            Order Sent <br /><em className="italic text-[#D4B483]">Successfully</em>
          </h1>
          <p className="text-[#B8B5AC] mb-10 text-base leading-relaxed max-w-md mx-auto">
            Thank you for choosing MIMIbeauty. Your order request has been sent to our concierge via WhatsApp. We will confirm your order shortly.
          </p>

          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full bg-[#D4B483] px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#0B0F0D] transition-all hover:shadow-[0_0_20px_rgba(212,180,131,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          >
            CONTINUE SHOPPING →
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
