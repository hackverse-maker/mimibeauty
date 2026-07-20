import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, ShieldCheck, Leaf, Rabbit } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { assets } from "@/lib/products";

// Custom SVGs for icons not in lucide by default
const Tiktok = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Pinterest = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="22" x2="12" y2="12" />
    <path d="M12 2a8 8 0 1 0 0 16c4 0 7-3.5 7-8" />
  </svg>
);

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      setLoading(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Successfully subscribed!");
    setEmail("");
    setLoading(false);
  };

  const companyLinks = [
    ["About Us", "/about"],
    ["Our Story", "/story"],
    ["Contact", "/contact"],
    ["FAQ", "/faq"],
  ];
  
  const supportLinks = [
    ["Shipping", "/shipping"],
    ["Returns", "/returns"],
    ["Privacy Policy", "/privacy"],
    ["Terms & Conditions", "/terms"],
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <footer className="relative mt-20 md:mt-32 overflow-hidden bg-black text-white pt-12 md:pt-24 pb-8 transition-colors duration-700">
      {/* Subtle Premium Glow Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent shadow-[0_0_15px_rgba(212,175,55,0.4)]" />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-12">
        {/* Top CTA Section */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="flex flex-col items-center text-center pb-12 md:pb-24 border-b border-white/10 px-4"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-tight text-balance">
            Your Journey to Radiant Skin Starts Here.
          </h2>
          <p className="mt-6 max-w-lg text-sm sm:text-base md:text-base text-white/70 leading-relaxed">
            Join the MIMIbeauty inner circle for early access to drops, exclusive rituals, and quiet skincare education.
          </p>
          
          <div className="mt-10 flex w-full max-w-md flex-col sm:flex-row gap-3 relative group">
            <form onSubmit={handleSubscribe} className="flex w-full flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full flex-1 rounded-full border border-white/20 bg-transparent px-4 sm:px-6 py-3.5 sm:py-4 text-sm text-white placeholder:text-white/50 outline-none transition-all duration-400 focus:border-gold focus:ring-1 focus:ring-gold"
                required
              />
              <button 
                type="submit"
                disabled={loading}
                className="relative overflow-hidden rounded-full bg-gold px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-medium text-white transition-all duration-400 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group-button min-h-[44px]"
              >
                <span className="relative z-10">{loading ? "Subscribing..." : "Subscribe"}</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 hover:translate-x-full" />
              </button>
            </form>
          </div>
        </motion.div>

        {/* Footer Layout (3 Columns) */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger}
          className="grid gap-12 md:gap-16 py-12 md:py-24 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* Column 1 - Brand */}
          <motion.div variants={fadeUp} className="flex flex-col sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <img src={assets.logo} alt="MIMIbeauty" className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover shadow-sm" />
              <span className="font-script text-3xl sm:text-4xl leading-none tracking-tight text-gold">Mimi Beauty.</span>
            </div>
            <p className="mt-6 text-sm text-white/70 leading-relaxed max-w-xs">
              Ritualistic skincare crafted in small batches. Botanical actives, clinical results, quiet luxury.
            </p>
            <div className="mt-8 flex gap-4 text-white/40">
              <div className="flex flex-col items-center gap-1"><ShieldCheck className="h-5 w-5" /><span className="text-[9px] uppercase tracking-widest">Tested</span></div>
              <div className="flex flex-col items-center gap-1"><Leaf className="h-5 w-5" /><span className="text-[9px] uppercase tracking-widest">Vegan</span></div>
              <div className="flex flex-col items-center gap-1"><Rabbit className="h-5 w-5" /><span className="text-[9px] uppercase tracking-widest">Cruelty-free</span></div>
            </div>
            <p className="mt-10 text-[11px] uppercase tracking-[0.3em] font-semibold text-gold">ESTD. 2026</p>
          </motion.div>



          {/* Column 3 - Company */}
          <motion.div variants={fadeUp}>
            <h4 className="mb-6 sm:mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">Company</h4>
            <ul className="space-y-3 sm:space-y-4 text-sm">
              {companyLinks.map(([label, to]) => (
                <li key={label} className="group flex w-max items-center">
                  <Link to={to} className="relative text-white/70 transition-all duration-400 hover:text-white group-hover:translate-x-2">
                    {label}
                    <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gold transition-all duration-400 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 - Support & Social */}
          <motion.div variants={fadeUp}>
            <h4 className="mb-6 sm:mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">Support</h4>
            <ul className="space-y-3 sm:space-y-4 text-sm mb-8 sm:mb-12">
              {supportLinks.map(([label, to]) => (
                <li key={label} className="group flex w-max items-center">
                  <Link to={to} className="relative text-white/70 transition-all duration-400 hover:text-white group-hover:translate-x-2">
                    {label}
                    <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gold transition-all duration-400 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://instagram.com/mimibeauty" 
                target="_blank" 
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/70 transition-all duration-400 hover:scale-110 hover:border-gold hover:text-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="https://facebook.com/mimibeauty" 
                target="_blank" 
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/70 transition-all duration-400 hover:scale-110 hover:border-gold hover:text-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://tiktok.com/@mimibeauty" 
                target="_blank" 
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/70 transition-all duration-400 hover:scale-110 hover:border-gold hover:text-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                aria-label="TikTok"
              >
                <Tiktok className="h-4 w-4" />
              </a>
              <a 
                href="https://pinterest.com/mimibeauty" 
                target="_blank" 
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/70 transition-all duration-400 hover:scale-110 hover:border-gold hover:text-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                aria-label="Pinterest"
              >
                <Pinterest className="h-4 w-4" />
              </a>
              <a 
                href="https://youtube.com/@mimibeauty" 
                target="_blank" 
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/70 transition-all duration-400 hover:scale-110 hover:border-gold hover:text-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col items-center justify-between gap-6 border-t border-white/10 py-8 text-center sm:text-left sm:flex-row"
        >
          <p className="text-[11px] text-white/50">
            © 2026 Mimi Beauty. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[11px] text-white/50">
            <Link to="/privacy" className="transition-colors hover:text-gold">Privacy Policy</Link>
            <Link to="/terms" className="transition-colors hover:text-gold">Terms of Service</Link>
            <Link to="/cookies" className="transition-colors hover:text-gold">Cookies</Link>
          </div>
          <p className="text-[11px] text-white/40 italic">
            Designed with elegance.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
