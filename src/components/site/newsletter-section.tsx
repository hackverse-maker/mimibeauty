"use client";
import { useState } from "react";
import { Mail, Heart } from "lucide-react";

function LeafIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      <path d="M12 4c-3 3-4 6-4 8s1.5 4 4 4 4-2 4-4-1-5-4-8z" />
      <path d="M12 16v-6" />
    </svg>
  );
}

function BottleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <path d="M10 2h4v3h-4z" />
      <path d="M9 5h6v2H9z" />
      <path d="M7 7h10v13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7z" />
      <path d="M12 11v4" />
      <path d="M10 13h4" />
    </svg>
  );
}

function FloralIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 4C12 4 15 2 18 5C21 8 19 11 19 11C19 11 22 13 19 16C16 19 13 17 13 17C13 17 10 20 7 17C4 14 6 11 6 11C6 11 3 9 6 6C9 3 12 5 12 5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 4L12 20M12 20L9 17M12 20L15 17"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setJoined(true);
    setTimeout(() => {
      setJoined(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#111A15] py-20 md:py-32">
      <div className="absolute inset-0 z-0">
        <img
          src="/dew-serum-hero.jpg"
          alt="Mimi Beauty DEW Radiant Glow Facial Serum"
          className="h-full w-full object-cover object-center"
          style={{ filter: "brightness(0.75) saturate(0.85) sepia(0.18)" }}
          loading="lazy"
          decoding="async"
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to right, #08100b 0%, #08100b 30%, rgba(8,16,11,0.82) 48%, rgba(8,16,11,0.3) 65%, rgba(8,16,11,0.0) 80%)",
          }}
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,16,11,0.7) 0%, transparent 25%, transparent 70%, rgba(8,16,11,0.75) 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 72% 55%, rgba(180,130,60,0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col px-6 md:px-12">
        <div className="max-w-xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A86A]">
            THE LETTER
          </p>
          <h2
            className="mt-6 text-[3rem] sm:text-[4.5rem] md:text-[5rem] leading-[1.05] tracking-tight text-[#F5F2EC]"
            style={{ fontFamily: "var(--font-cormorant, serif)" }}
          >
            Thoughtful
            <br />
            notes, <em className="italic text-[#C9A86A]">real</em> care.
          </h2>

          <div className="mt-8 flex items-center gap-4">
            <svg width="24" height="12" viewBox="0 0 40 12" fill="none" className="text-[#C9A86A]">
              <path d="M10 6H30" stroke="currentColor" strokeWidth="0.5" />
              <path d="M20 6C20 4 22 2 24 2C24 4 22 6 20 6Z" fill="currentColor" />
              <path d="M20 6C20 8 18 10 16 10C16 8 18 6 20 6Z" fill="currentColor" />
              <path d="M20 6C20 4 18 2 16 2C16 4 18 6 20 6Z" fill="currentColor" />
              <path d="M20 6C20 8 22 10 24 10C24 8 22 6 20 6Z" fill="currentColor" />
            </svg>
          </div>

          <p className="mt-8 text-[14px] md:text-[16px] leading-relaxed text-[#D8D2C8] opacity-90 max-w-md">
            Occasional letters on ingredients, our formulations, and what's new at Mimi Beauty.
            <br />
            <br />
            No spam. Just the good stuff.
          </p>

          <form
            className="mt-10 flex flex-col sm:flex-row w-full max-w-md gap-3 sm:gap-0 sm:items-center sm:overflow-hidden sm:rounded-[8px] sm:border sm:border-white/10 sm:bg-[#0C120E]/60 sm:p-2 sm:backdrop-blur-sm sm:transition-colors sm:focus-within:border-[#C9A86A]/40"
            onSubmit={handleSubscribe}
          >
            <div className="flex flex-1 items-center gap-3 pl-3 rounded-[8px] border border-white/10 bg-[#0C120E]/60 p-2 backdrop-blur-sm sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
              <Mail className="h-4 w-4 text-[#C9A86A]/70" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={joined}
                className="w-full min-w-0 bg-transparent text-[13px] text-[#F5F2EC] outline-none placeholder:text-[#F5F2EC]/40 disabled:text-[#C9A86A] py-2 sm:py-0"
                aria-label="Email"
              />
            </div>
            <button
              type="submit"
              disabled={joined}
              className="w-full sm:w-auto shrink-0 rounded-[6px] bg-[#C9A86A] px-4 sm:px-6 py-3 sm:py-2.5 text-[12px] font-medium text-[#0A100C] transition-colors hover:bg-[#F5F2EC]"
            >
              {joined ? "Subscribed" : "Subscribe"}
            </button>
          </form>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 gap-10 border-t border-white/10 pt-10 sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A86A]/50 text-[#C9A86A]">
                <LeafIcon className="h-5 w-5" />
              </div>
              <span className="mt-4 text-[12px] leading-tight text-[#D8D2C8] opacity-80">
                Ingredient
                <br />
                Insights
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A86A]/50 text-[#C9A86A]">
                <BottleIcon className="h-5 w-5" />
              </div>
              <span className="mt-4 text-[12px] leading-tight text-[#D8D2C8] opacity-80">
                New Arrivals &<br />
                Updates
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A86A]/50 text-[#C9A86A]">
                <Heart className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <span className="mt-4 text-[12px] leading-tight text-[#D8D2C8] opacity-80">
                Made with
                <br />
                Intent
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative flex justify-center mt-20 z-10 w-full pt-6">
        <div className="flex items-center gap-4 text-[#C9A86A] text-[10px] font-medium tracking-[0.3em]">
          <FloralIcon className="h-4 w-4" />
          MIMIBEAUTY · EST. 2026
          <FloralIcon className="h-4 w-4" />
        </div>
      </div>
    </section>
  );
}
