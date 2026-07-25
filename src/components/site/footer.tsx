import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Check } from "lucide-react";
import type { SVGProps } from "react";

const Tiktok = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const shop = [
  { label: "Shop All", to: "/shop" as const },
  { label: "Collections", to: "/collections" as const },
  { label: "Ingredients", to: "/ingredients" as const },
  { label: "Skin Quiz", to: "/quiz" as const },
];

const house = [
  { label: "About", to: "/about" as const },
  { label: "Journal", to: "/blog" as const },
  { label: "Contact", to: "/contact" as const },
];

const legal = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
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
    <footer className="relative overflow-hidden bg-[#050505] text-white">
      {/* Hairline gold rule */}
      <div
        aria-hidden
        className="h-px w-full bg-gradient-to-r from-transparent via-[#C9A86A]/50 to-transparent"
      />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Premium typographic masthead */}
        <div className="border-b border-white/[0.08] py-16 md:py-24">
          <p className="text-center text-xs uppercase tracking-[0.45em] text-[#C9A86A]">
            MIMIbeauty · Est. 2026
          </p>
          <h2 className="mt-6 text-center font-display text-[clamp(3.5rem,14vw,11rem)] font-normal leading-[0.85] tracking-[-0.04em] text-white">
            Mimi<span className="italic text-[#C9A86A]">Beauty</span>
          </h2>
          <p className="mx-auto mt-8 max-w-md text-center text-sm leading-relaxed text-white/45 md:text-[15px]">
            Ritualistic skincare. Botanical actives. Clinical quiet luxury.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 border-b border-[#C9A86A]/50 pb-1 text-[11px] uppercase tracking-[0.28em] text-[#C9A86A] transition-colors hover:border-[#C9A86A] hover:text-white"
            >
              Begin the ritual
            </Link>
          </div>
        </div>

        {/* Link columns — type-led, minimal */}
        <div className="grid gap-8 py-14 md:grid-cols-12 md:gap-8 md:py-20">
          <div className="md:col-span-5">
            <p className="font-script text-3xl text-[#C9A86A]">Mimi Beauty.</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
              Small-batch formulas for the considered. Never noise — only ritual.
            </p>
            <form
              className="mt-8 flex max-w-sm border-b border-white/15 pb-2"
              onSubmit={handleSubscribe}
            >
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={joined ? "Added to the list" : "Email for quiet news"}
                disabled={joined}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30 disabled:text-gold"
                aria-label="Email"
              />
              <button
                type="submit"
                disabled={joined}
                className="shrink-0 text-xs uppercase tracking-[0.25em] text-[#C9A86A] transition-colors hover:text-white flex items-center gap-1.5"
              >
                {joined ? <><Check className="h-3 w-3 text-gold" /> Subscribed</> : "Join"}
              </button>
            </form>
          </div>

          <nav className="md:col-span-2" aria-label="Shop">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">Shop</p>
            <ul className="mt-5 space-y-3">
              {shop.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="font-display text-xl tracking-tight text-white/70 transition-colors hover:text-[#C9A86A] md:text-2xl"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="House">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">House</p>
            <ul className="mt-5 space-y-3">
              {house.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="font-display text-xl tracking-tight text-white/70 transition-colors hover:text-[#C9A86A] md:text-2xl"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3 md:text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">Contact & Follow</p>
            <p className="mt-4 text-sm font-light text-white/60">
              Direct Care: <a href="tel:03274984584" className="hover:text-[#C9A86A] transition-colors">03274984584</a>
            </p>
            <div className="mt-5 flex gap-4 md:justify-end">
              {[
                { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/mimibeauty.pk?igsh=MTBmMHB3NGVyZ2Iydw==" },
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
                  className="grid h-11 w-11 place-items-center text-white/40 transition-colors hover:text-[#C9A86A]"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.4} />
                </a>
              ))}
            </div>
            <p className="mt-10 text-[11px] leading-relaxed text-white/30 md:ml-auto md:max-w-[200px]">
              Dermatologist tested · Vegan · Cruelty free
            </p>
          </div>
        </div>

        {/* Colophon */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] py-8 text-[11px] text-white/30 md:flex-row">
          <p>© {new Date().getFullYear()} Mimi Beauty. All rights reserved.</p>
          <div className="flex gap-6">
            {legal.map((l) => (
              <a key={l.label} href={l.href} className="transition-colors hover:text-[#C9A86A]">
                {l.label}
              </a>
            ))}
          </div>
          <p className="tracking-[0.2em] uppercase">Designed with elegance</p>
        </div>
      </div>
    </footer>
  );
}
