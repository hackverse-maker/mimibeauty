"use client";
import { useState } from "react";
import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";
import type { SVGProps } from "react";

const Tiktok = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const shop = [
  { label: "Shop All", href: "/shop" },
];

const house = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
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
    <footer className="relative w-full bg-[#08140E]">
      {/* ── Masthead background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#08140E]">
        <div className="absolute inset-0 bg-[#08140E]" />
      </div>

      <div className="relative z-10 flex flex-col pt-4 md:pt-10">
        {/* Top Masthead */}
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start justify-start px-6 text-left md:px-10 pb-16 sm:pb-24 md:pb-40">
          <Link href="/" className="no-underline">
            <h2 className="text-[2rem] sm:text-[2.75rem] md:text-[6rem] lg:text-[8rem] leading-[0.85] tracking-tight text-[#F5F2EC]">
              Mimi<span className="italic text-[#C9A86A]">Beauty</span>
            </h2>
          </Link>
          <p className="mt-6 sm:mt-8 text-[14px] sm:text-[16px] leading-relaxed text-[#F5F2EC] opacity-90">
            Botanical skincare. Clinical actives. Quiet luxury.
          </p>

          <div className="mt-8 sm:mt-14 flex flex-col items-start gap-4 sm:gap-5">
            {/* Botanical Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-[#C9A86A]"
            >
              <path d="M12 2C12 2 12 7 15 9C15 9 12 9 12 14C12 9 9 9 9 9C12 7 12 2 12 2Z" />
              <path
                d="M12 14L12 22"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path d="M12 18C12 18 16 18 18 15C18 15 15 15 12 18Z" />
              <path d="M12 16C12 16 8 16 6 13C6 13 9 13 12 16Z" />
            </svg>

            <Link
              href="/shop"
              className="text-[12px] uppercase tracking-[0.3em] text-[#C9A86A] transition-colors hover:text-white font-medium border-b border-[#C9A86A]/40 pb-1"
            >
              BEGIN THE JOURNEY
            </Link>
          </div>
        </div>

        {/* Footer Navigation Section */}
        <div className="border-t border-[#C9A86A]/20 bg-[#0A100C]/80 backdrop-blur-sm">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="grid gap-8 py-12 sm:py-16 md:grid-cols-12 md:gap-0">
              {/* Newsletter Section */}
              <div className="md:col-span-4 md:pr-12">
                <Link href="/" className="no-underline">
                  <p
                    className="text-2xl sm:text-3xl text-[#C9A86A]"
                    style={{ fontFamily: "var(--font-script, cursive)" }}
                  >
                    Mimi Beauty.
                  </p>
                </Link>
                <p className="mt-4 sm:mt-5 max-w-xs text-[11px] sm:text-[12px] leading-relaxed text-[#D8D2C8] opacity-70">
                  Tested in small batches to ensure quality.
                </p>
                <form
                  className="mt-6 sm:mt-8 flex w-full max-w-sm overflow-hidden rounded-[4px] border border-[#C9A86A]/30 bg-transparent transition-colors focus-within:border-[#C9A86A]"
                  onSubmit={handleSubscribe}
                >
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email for quiet news"
                    disabled={joined}
                    className="flex-1 min-w-0 bg-transparent px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs text-[#F5F2EC] outline-none placeholder:text-[#F5F2EC]/40 disabled:text-[#C9A86A]"
                    aria-label="Email"
                  />
                  <button
                    type="submit"
                    disabled={joined}
                    className="shrink-0 bg-[#C9A86A] px-3 sm:px-4 sm:px-6 py-2.5 sm:py-3 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#0A100C] transition-colors hover:bg-[#F5F2EC]"
                  >
                    {joined ? "JOINED" : "JOIN"}
                  </button>
                </form>
              </div>

              {/* Vertical Divider 1 */}
              <div className="hidden md:block md:col-span-1 border-l border-[#C9A86A]/20" />

              {/* SHOP Section */}
              <nav className="md:col-span-2 md:pl-6" aria-label="Shop">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A86A]">
                  SHOP
                </p>
                <ul className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                  {shop.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[13px] sm:text-[14px] text-[#F5F2EC] transition-colors hover:text-[#C9A86A]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Vertical Divider 2 */}
              <div className="hidden md:block md:col-span-1 border-l border-[#C9A86A]/20" />

              {/* HOUSE Section */}
              <nav className="md:col-span-1 md:pl-6" aria-label="House">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A86A]">
                  HOUSE
                </p>
                <ul className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                  {house.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[13px] sm:text-[14px] text-[#F5F2EC] transition-colors hover:text-[#C9A86A]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Vertical Divider 3 */}
              <div className="hidden md:block md:col-span-1 border-l border-[#C9A86A]/20" />

              {/* CONTACT Section */}
              <div className="md:col-span-2 md:pl-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A86A]">
                  CONTACT & FOLLOW
                </p>
                <p className="mt-4 sm:mt-6 text-[12px] sm:text-[13px] text-[#F5F2EC]">
                  Direct Care:{" "}
                  <a href="tel:03239847938" className="hover:text-[#C9A86A] transition-colors">
                    03239847938
                  </a>
                </p>
                <div className="mt-4 sm:mt-6 flex gap-3 sm:gap-4">
                  {[
                    {
                      Icon: Instagram,
                      label: "Instagram",
                      href: "https://www.instagram.com/mimibeauty.pk",
                    },
                    { Icon: Facebook, label: "Facebook", href: "#" },
                    { Icon: Tiktok, label: "TikTok", href: "#" },
                    { Icon: Youtube, label: "YouTube", href: "#" },
                  ].map(({ Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={label}
                      className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center text-[#C9A86A] transition-colors hover:text-white"
                    >
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
                <p className="mt-6 sm:mt-8 text-[11px] sm:text-[12px] text-[#D8D2C8] opacity-80">
                  Dermatologically tested · Vegan · Cruelty free
                </p>
              </div>
            </div>

            {/* Colophon */}
            <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 border-t border-[#C9A86A]/20 py-6 sm:py-8 text-[10px] sm:text-[11px] text-[#D8D2C8] opacity-70 md:flex-row">
              <p>© {new Date().getFullYear()} Mimi Beauty. All rights reserved.</p>
              <div className="flex gap-4 sm:gap-6">
                <a href="#" className="transition-colors hover:text-[#C9A86A]">
                  Privacy
                </a>
                <span>|</span>
                <a href="#" className="transition-colors hover:text-[#C9A86A]">
                  Terms
                </a>
              </div>
              <p className="tracking-[0.2em] text-[9px] sm:text-[10px] uppercase text-[#C9A86A]">DESIGNED WITH ELEGANCE</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
