"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "mimi_popup_dismissed";
const COUPON_KEY = "mimi_welcome_coupon";

function BotanicalCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      className={className}
      aria-hidden
    >
      {/* Main stem */}
      <path d="M10 110 Q 40 70 80 15" strokeLinecap="round" />
      {/* Left leaves */}
      <path d="M28 82 Q 55 76 65 52 Q 44 62 28 82" />
      <path d="M48 52 Q 30 44 22 22 Q 38 32 48 52" />
      {/* Right leaves */}
      <path d="M55 38 Q 78 32 88 12 Q 70 22 55 38" />
      <path d="M70 20 Q 90 14 98 0 Q 80 10 70 20" />
      {/* Small buds */}
      <circle cx="36" cy="90" r="1.8" fill="currentColor" opacity="0.6" />
      <circle cx="56" cy="58" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="76" cy="24" r="1.2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function WelcomePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (dismissed) return;
    } catch {
      // localStorage unavailable — show anyway
    }
    const timer = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch { /* noop */ }
  };

  const claim = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
      localStorage.setItem(COUPON_KEY, "WELCOME10");
    } catch { /* noop */ }
    setVisible(false);
    // Scroll to top to surface the discount banner rendered by providers
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[900] bg-black/65 backdrop-blur-[2px]"
        onClick={dismiss}
        aria-hidden
      />

      {/* Popup */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Welcome offer"
        className="fixed inset-0 z-[901] flex items-center justify-center p-4"
      >
        <div
          className="relative w-full max-w-md overflow-hidden rounded-2xl"
          style={{
            background: "#08140E",
            border: "1px solid rgba(207,167,106,0.45)",
            boxShadow: "0 40px 100px -20px rgba(0,0,0,0.85), 0 0 0 1px rgba(207,167,106,0.12)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botanical corner decorations */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-28 w-28 opacity-20"
            style={{ color: "#CFA76A", transform: "scaleX(-1) scaleY(-1)" }}
          >
            <BotanicalCorner />
          </div>
          <div
            className="pointer-events-none absolute bottom-0 right-0 h-28 w-28 opacity-20"
            style={{ color: "#CFA76A" }}
          >
            <BotanicalCorner />
          </div>

          {/* Close button */}
          <button
            onClick={dismiss}
            aria-label="Close welcome offer"
            className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full transition-colors"
            style={{
              color: "rgba(207,167,106,0.7)",
              border: "1px solid rgba(207,167,106,0.25)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(207,167,106,0.1)";
              (e.currentTarget as HTMLButtonElement).style.color = "#CFA76A";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(207,167,106,0.7)";
            }}
          >
            <X className="h-4 w-4" />
          </button>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-8 py-10 sm:px-12 sm:py-12 text-center">
            {/* Brand */}
            <p
              className="mb-1 text-[10px] font-bold uppercase tracking-[0.45em]"
              style={{ color: "rgba(207,167,106,0.65)" }}
            >
              MIMI BEAUTY
            </p>

            {/* Thin gold rule */}
            <div
              className="mb-6 h-px w-16"
              style={{ background: "rgba(207,167,106,0.35)" }}
            />

            {/* Headline */}
            <p
              className="mb-2 text-[11px] font-semibold uppercase tracking-[0.35em]"
              style={{ color: "#CFA76A" }}
            >
              EXCLUSIVE WELCOME
            </p>

            {/* Large discount */}
            <div className="my-3 flex items-start leading-none" style={{ color: "#F6F2EB" }}>
              <span
                style={{
                  fontFamily: "var(--font-cormorant, serif)",
                  fontSize: "clamp(5rem, 20vw, 7rem)",
                  fontWeight: 300,
                  lineHeight: 0.9,
                  color: "#CFA76A",
                  letterSpacing: "-0.02em",
                }}
              >
                10
              </span>
              <div className="flex flex-col items-start pt-3 pl-1">
                <span
                  style={{
                    fontFamily: "var(--font-cormorant, serif)",
                    fontSize: "2rem",
                    color: "#CFA76A",
                    lineHeight: 1,
                    fontWeight: 400,
                  }}
                >
                  %
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-cormorant, serif)",
                    fontSize: "1.25rem",
                    color: "rgba(207,167,106,0.8)",
                    lineHeight: 1.1,
                    fontWeight: 400,
                    letterSpacing: "0.05em",
                  }}
                >
                  OFF
                </span>
              </div>
            </div>

            {/* Sub-label */}
            <p
              className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ color: "rgba(246,242,235,0.55)" }}
            >
              FOR OUR FIRST 100 CUSTOMERS
            </p>

            {/* Divider */}
            <div className="my-6 flex w-full items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "rgba(207,167,106,0.2)" }} />
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M9 0 L9 18 M0 9 L18 9" stroke="rgba(207,167,106,0.4)" strokeWidth="0.7" />
                <circle cx="9" cy="9" r="2" fill="rgba(207,167,106,0.4)" />
              </svg>
              <div className="flex-1 h-px" style={{ background: "rgba(207,167,106,0.2)" }} />
            </div>

            {/* Body copy */}
            <p
              className="mb-8 text-sm leading-relaxed"
              style={{ color: "rgba(246,242,235,0.75)" }}
            >
              Be among the first to experience
              <br />
              the world of Mimi Beauty.
            </p>

            {/* Primary CTA */}
            <button
              id="popup-claim-btn"
              onClick={claim}
              className="mb-3 w-full rounded-full py-4 text-[11px] font-bold uppercase tracking-[0.3em] transition-all"
              style={{
                background: "#CFA76A",
                color: "#08140E",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#D8B67B";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#CFA76A";
              }}
            >
              CLAIM 10% OFF
            </button>

            {/* Secondary option */}
            <button
              id="popup-no-thanks-btn"
              onClick={dismiss}
              className="text-[10px] uppercase tracking-[0.25em] transition-colors"
              style={{ color: "rgba(246,242,235,0.35)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(246,242,235,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(246,242,235,0.35)";
              }}
            >
              NO THANK YOU
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
