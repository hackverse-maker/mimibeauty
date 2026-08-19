import Link from "next/link";
import { Facebook, Instagram, Mail, ArrowUpRight } from "lucide-react";

const columns = [
  { 
    title: "SHOP", 
    links: [
      ["All products", "/shop"], 
      ["Mimi Sets", "/bundles"], 
      ["New arrivals", "/shop"]
    ] 
  },
  { 
    title: "ABOUT", 
    links: [
      ["Our story", "/about"], 
      ["Ingredients", "/about"], 
      ["Journal", "/blog"]
    ] 
  },
  { 
    title: "HELP", 
    links: [
      ["Contact us", "/contact"], 
      ["Shipping", "/contact"], 
      ["FAQs", "/contact"]
    ] 
  },
];

export function BundlesFooter() {
  return (
    <footer className="border-t border-[#C9A86A]/10 bg-background text-[#D8D2C8] transition-colors duration-300">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr_1.4fr] lg:gap-16">
          {/* Left Column: Brand Area */}
          <div className="max-w-xs">
            <Link href="/bundles" className="font-serif text-3xl tracking-[0.25em] text-[#FAF6F0] transition-colors hover:text-[#C9A86A]" style={{ fontFamily: "Cinzel", fontWeight: "500" }}>
              MIMI
            </Link>
            <p className="mt-6 text-xs leading-relaxed text-[#D8D2C8] opacity-80 font-light" style={{ fontFamily: "Montserrat" }}>
              Thoughtful beauty for skin, hair, and body. Made to bring you back to yourself.
            </p>
          </div>

          {/* Center Column: Navigation links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-5">
                <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A86A]" style={{ fontFamily: "Montserrat" }}>
                  {column.title}
                </h2>
                <div className="flex flex-col gap-3">
                  {column.links.map(([label, href]) => (
                    <Link 
                      key={label} 
                      href={href} 
                      className="text-xs text-[#D8D2C8]/80 transition-colors duration-300 hover:text-[#FAF6F0]"
                      style={{ fontFamily: "Montserrat", fontWeight: "300" }}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Newsletter & Socials */}
          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A86A]" style={{ fontFamily: "Montserrat" }}>
              STAY CONNECTED
            </h2>
            <p className="mt-4 text-xs leading-relaxed text-[#D8D2C8] opacity-80 font-light" style={{ fontFamily: "Montserrat" }}>
              Notes on beauty and the little things that make a difference.
            </p>
            <form className="mt-6 flex border-b border-[#C9A86A]/25 pb-1" onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="bundles-email" className="sr-only">Email address</label>
              <input 
                id="bundles-email" 
                type="email" 
                placeholder="Your email address" 
                className="min-w-0 flex-1 bg-transparent py-2.5 text-xs text-[#FAF6F0] outline-none placeholder:text-[#FAF6F0]/30 font-light"
                style={{ fontFamily: "Montserrat" }}
                required 
              />
              <button 
                type="submit" 
                aria-label="Subscribe to newsletter" 
                className="text-[#C9A86A] transition-all duration-300 hover:text-[#FAF6F0] hover:translate-x-0.5 hover:-translate-y-0.5"
              >
                <ArrowUpRight className="size-4" />
              </button>
            </form>
            <div className="mt-6 flex items-center gap-5">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram" 
                className="text-[#D8D2C8]/80 hover:text-[#C9A86A] transition-colors duration-300"
              >
                <Instagram className="size-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook" 
                className="text-[#D8D2C8]/80 hover:text-[#C9A86A] transition-colors duration-300"
              >
                <Facebook className="size-4" />
              </a>
              <a 
                href="mailto:rainamalik@mimibeauty.com.pk" 
                aria-label="Email Mimi Beauty" 
                className="text-[#D8D2C8]/80 hover:text-[#C9A86A] transition-colors duration-300"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright area with subtle contrast */}
        <div className="mt-16 border-t border-[#C9A86A]/10 pt-8 bg-black/10 -mx-6 px-6 sm:-mx-8 sm:px-8">
          <div className="flex flex-col gap-4 text-[10px] tracking-wider text-[#D8D2C8]/50 md:flex-row md:items-center md:justify-between" style={{ fontFamily: "Montserrat", fontWeight: "300" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#C9A86A]/20 bg-background text-[8px] font-semibold text-[#C9A86A] shadow-inner select-none">
                N
              </div>
              <p>© {new Date().getFullYear()} MIMI Beauty. All rights reserved.</p>
            </div>
            <p className="font-light italic text-[#C9A86A]/70 tracking-normal">Made with care, for your everyday.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default BundlesFooter;
