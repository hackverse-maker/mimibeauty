"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const SESSION_KEY = "mimi_popup_dismissed_v2";

export function PromotionalPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(SESSION_KEY);
    if (!dismissed) {
      const t = setTimeout(() => setIsOpen(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Keyboard: Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    sessionStorage.setItem(SESSION_KEY, "true");
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-[200] bg-[#050e09]/75 backdrop-blur-[3px]"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* ── Modal ── */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              key="modal"
              role="dialog"
              aria-modal="true"
              aria-label="Exclusive welcome offer from Mimi Beauty"
              initial={{ opacity: 0, scale: 0.97, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto relative w-full max-w-[420px] select-none"
            >
              {/* ── Double border wrapper ── */}
              <div
                className="relative rounded-sm"
                style={{
                  background: "linear-gradient(145deg, #1a0d0a, #130c09, #1c0f0b)",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(166,130,80,0.35), inset 0 0 0 1px rgba(253,245,230,0.04)",
                }}
              >
                {/* ── Outer gold border ── */}
                <div
                  className="absolute inset-0 rounded-sm pointer-events-none"
                  style={{ border: "1px solid rgba(166,130,80,0.3)" }}
                />
                {/* ── Inner ivory border ── */}
                <div
                  className="absolute inset-[5px] rounded-[1px] pointer-events-none"
                  style={{ border: "1px solid rgba(253,245,230,0.06)" }}
                />

                {/* ── Botanical corner SVGs ── */}
                {/* Top-left */}
                <svg className="absolute top-0 left-0 w-28 h-28 pointer-events-none" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.18 }}>
                  <path d="M10 110 C10 110 12 70 30 55 C30 55 18 80 10 110Z" fill="#C9A86A"/>
                  <path d="M10 110 C10 110 40 85 55 65 C55 65 30 88 10 110Z" fill="#C9A86A"/>
                  <path d="M10 110 C10 110 35 60 20 30 C20 30 15 60 10 110Z" fill="#C9A86A"/>
                  <path d="M10 110 C10 110 50 70 65 40 C65 40 40 65 10 110Z" fill="#C9A86A"/>
                  <path d="M12 95 C20 75 35 62 50 55" stroke="#C9A86A" strokeWidth="0.6" strokeLinecap="round"/>
                  <path d="M10 80 C22 62 40 48 58 42" stroke="#C9A86A" strokeWidth="0.5" strokeLinecap="round"/>
                  <path d="M15 110 L15 20" stroke="#C9A86A" strokeWidth="0.4" strokeLinecap="round"/>
                  <path d="M15 20 C15 20 20 10 10 10" stroke="#C9A86A" strokeWidth="0.5" strokeLinecap="round"/>
                  <circle cx="15" cy="20" r="1.5" fill="#C9A86A"/>
                  <circle cx="30" cy="56" r="1" fill="#C9A86A"/>
                  <circle cx="55" cy="65" r="0.8" fill="#C9A86A"/>
                </svg>

                {/* Top-right */}
                <svg className="absolute top-0 right-0 w-28 h-28 pointer-events-none" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.18 }}>
                  <path d="M110 110 C110 110 108 70 90 55 C90 55 102 80 110 110Z" fill="#C9A86A"/>
                  <path d="M110 110 C110 110 80 85 65 65 C65 65 90 88 110 110Z" fill="#C9A86A"/>
                  <path d="M110 110 C110 110 85 60 100 30 C100 30 105 60 110 110Z" fill="#C9A86A"/>
                  <path d="M110 110 C110 110 70 70 55 40 C55 40 80 65 110 110Z" fill="#C9A86A"/>
                  <path d="M108 95 C100 75 85 62 70 55" stroke="#C9A86A" strokeWidth="0.6" strokeLinecap="round"/>
                  <path d="M105 15 L105 110" stroke="#C9A86A" strokeWidth="0.4" strokeLinecap="round"/>
                  <path d="M105 15 C105 15 100 10 110 10" stroke="#C9A86A" strokeWidth="0.5" strokeLinecap="round"/>
                  <circle cx="105" cy="15" r="1.5" fill="#C9A86A"/>
                </svg>

                {/* Bottom-left */}
                <svg className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.14 }}>
                  <path d="M8 72 C8 72 20 50 40 42" stroke="#C9A86A" strokeWidth="0.6" strokeLinecap="round"/>
                  <path d="M8 60 C8 60 25 42 42 38" stroke="#C9A86A" strokeWidth="0.4" strokeLinecap="round"/>
                  <circle cx="40" cy="42" r="1" fill="#C9A86A"/>
                </svg>

                {/* Bottom-right */}
                <svg className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.14 }}>
                  <path d="M72 72 C72 72 60 50 40 42" stroke="#C9A86A" strokeWidth="0.6" strokeLinecap="round"/>
                  <path d="M72 60 C72 60 55 42 38 38" stroke="#C9A86A" strokeWidth="0.4" strokeLinecap="round"/>
                  <circle cx="40" cy="42" r="1" fill="#C9A86A"/>
                </svg>

                {/* ── Close button ── */}
                <button
                  onClick={handleClose}
                  aria-label="Close popup"
                  className="absolute right-4 top-4 z-10 flex h-7 w-7 items-center justify-center text-[#FDFBF7]/30 transition-all duration-300 hover:text-[#FDFBF7]/70 hover:scale-110"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </button>

                {/* ── Content ── */}
                <div className="relative z-10 flex flex-col items-center px-10 pt-12 pb-10 sm:px-14 sm:pt-14 sm:pb-12 text-center">

                  {/* Brand eyebrow */}
                  <p className="text-[9px] font-semibold uppercase tracking-[0.45em] text-[#C9A86A] mb-4">
                    Mimi Beauty
                  </p>

                  {/* Thin gold rule */}
                  <div className="w-12 mb-4" style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(201,168,106,0.7), transparent)" }} />

                  {/* Invitation headline */}
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#FDFBF7]/60 mb-8">
                    An Exclusive Welcome
                  </p>

                  {/* Main offer — large editorial serif */}
                  <div className="flex items-start justify-center leading-none mb-3">
                    <span
                      className="text-[96px] sm:text-[108px] leading-none text-[#FDFBF7]"
                      style={{ fontFamily: "'Cormorant Garamond', 'Bodoni Moda', Georgia, serif", fontWeight: 300, letterSpacing: "-0.02em" }}
                    >
                      10
                    </span>
                    <div className="flex flex-col items-start pt-5 ml-1">
                      <span
                        className="text-[28px] sm:text-[32px] leading-none text-[#C9A86A]"
                        style={{ fontFamily: "'Cormorant Garamond', 'Bodoni Moda', Georgia, serif", fontWeight: 300 }}
                      >
                        %
                      </span>
                      <span
                        className="text-[13px] sm:text-[14px] leading-none text-[#FDFBF7]/70 mt-1"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, letterSpacing: "0.12em" }}
                      >
                        OFF
                      </span>
                    </div>
                  </div>

                  {/* Subheading */}
                  <p className="text-[9px] uppercase tracking-[0.35em] text-[#FDFBF7]/40 mb-8">
                    For Our First 100 Customers
                  </p>

                  {/* Gold divider with diamond */}
                  <div className="flex items-center gap-3 w-full mb-8">
                    <div className="flex-1" style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(201,168,106,0.4))" }} />
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                      <path d="M3 0L6 3L3 6L0 3Z" fill="rgba(201,168,106,0.6)"/>
                    </svg>
                    <div className="flex-1" style={{ height: "1px", background: "linear-gradient(to left, transparent, rgba(201,168,106,0.4))" }} />
                  </div>

                  {/* Emotional message */}
                  <p
                    className="text-[14px] sm:text-[15px] leading-relaxed text-[#FDFBF7]/60 mb-10 italic"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
                  >
                    Be among the first to experience<br />the Mimi Beauty ritual.
                  </p>

                  {/* CTA — luxury outlined button */}
                  <Link
                    href="/shop"
                    onClick={handleClose}
                    className="group relative inline-flex items-center justify-center w-full h-11 overflow-hidden"
                    style={{ border: "1px solid rgba(201,168,106,0.45)" }}
                  >
                    {/* hover fill */}
                    <span
                      className="absolute inset-0 translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0"
                      style={{ background: "rgba(201,168,106,0.08)" }}
                    />
                    <span
                      className="relative text-[10px] font-medium uppercase tracking-[0.4em] text-[#C9A86A] transition-colors duration-300 group-hover:text-[#FDFBF7]"
                    >
                      Claim Your 10%
                    </span>
                  </Link>

                  {/* Dismiss link */}
                  <button
                    onClick={handleClose}
                    className="mt-5 text-[9px] uppercase tracking-[0.3em] text-[#FDFBF7]/20 transition-colors duration-300 hover:text-[#FDFBF7]/45"
                  >
                    No thank you
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
