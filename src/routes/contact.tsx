import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Send, ArrowRight, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Concierge & Contact · MIMIbeauty" },
      { name: "description", content: "Get in touch with MIMIbeauty. Concierge care, wholesale, and press enquiries." },
      { property: "og:title", content: "Concierge & Contact · MIMIbeauty" },
      { property: "og:description", content: "Concierge care, wholesale, and press enquiries." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-gold/20 selection:text-gold overflow-hidden">
      {/* Luxury Background Ambient Glows */}
      <div className="absolute top-[-5%] right-[-10%] h-[700px] w-[700px] rounded-full bg-gold/5 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] h-[700px] w-[700px] rounded-full bg-white/[0.02] blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-[1800px] px-6 lg:px-12 xl:px-20 pt-32 pb-24 md:pt-40 md:pb-36">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] items-start">
          
          {/* Information & Details */}
          <div>
            <div className="sticky top-32">
              <motion.div 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
                className="flex items-center gap-4"
              >
                <span className="h-[1px] w-12 bg-gold/60" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-gold">Inquiries</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.9, delay: 0.15 }} 
                className="mt-8 font-display text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1] tracking-tighter"
              >
                Let's talk <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gold/70">about skin.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.9, delay: 0.3 }} 
                className="mt-6 max-w-lg text-lg text-foreground/60 leading-relaxed font-light"
              >
                Whether you seek personalized product guidance, have order questions, or want to discuss a partnership—our concierge team is ready to assist.
              </motion.p>

              {/* Cards block */}
              <div className="mt-12 space-y-6">
                {[
                  { icon: MapPin, title: "Our Paris Studio", detail: "12 rue de Sévigné, Paris 75004" },
                  { icon: Mail, title: "Digital Correspondence", detail: "concierge@mimibeauty.com" },
                  { icon: Phone, title: "Direct Care Line", detail: "03274984584" },
                ].map((c, i) => (
                  <motion.div 
                    key={c.title} 
                    initial={{ opacity: 0, x: -20 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="flex items-start gap-5 rounded-2xl border border-white/5 bg-white/[0.01] p-6 hover:border-gold/20 transition-all duration-300"
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/20 bg-gold/5 text-gold">
                      <c.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold/80">{c.title}</p>
                      <p className="mt-1 text-lg font-light text-white/90">{c.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mini Map */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-8 aspect-video overflow-hidden rounded-2xl border border-white/5 filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
              >
                <iframe
                  title="MIMIbeauty studio location"
                  className="h-full w-full opacity-80"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=2.3577%2C48.855%2C2.3677%2C48.860&layer=mapnik"
                />
              </motion.div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 md:p-12 lg:p-16 backdrop-blur-xl relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold/5 to-transparent pointer-events-none" />
            
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-gold" strokeWidth={1.5} />
              <h2 className="text-xl font-display tracking-tight text-white">Send a Message</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/50">First name</span>
                  <input required type="text" className="w-full rounded-full border border-white/10 bg-black px-6 py-4 text-base outline-none focus:border-gold/60 transition" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/50">Last name</span>
                  <input required type="text" className="w-full rounded-full border border-white/10 bg-black px-6 py-4 text-base outline-none focus:border-gold/60 transition" />
                </label>
              </div>
              
              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/50">Email Address</span>
                <input required type="email" value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} className="w-full rounded-full border border-white/10 bg-black px-6 py-4 text-base outline-none focus:border-gold/60 transition" />
              </label>
              
              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/50">Topic / Subject</span>
                <select className="w-full rounded-full border border-white/10 bg-black px-6 py-4 text-base outline-none focus:border-gold/60 text-foreground/60 transition">
                  <option className="bg-black text-white">Skin Concierge Guidance</option>
                  <option className="bg-black text-white">Order & Shipment Inquiry</option>
                  <option className="bg-black text-white">Partnerships & Wholesale</option>
                  <option className="bg-black text-white">Press & Media Relationship</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/50">Message</span>
                <textarea required rows={5} value={formState.message} onChange={(e) => setFormState({...formState, message: e.target.value})} className="w-full resize-none rounded-2xl border border-white/10 bg-black p-6 text-base outline-none focus:border-gold/60 transition" placeholder="Tell us about your skincare ritual details or inquiries..." />
              </label>
              
              <button 
                type="submit" 
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gold py-5 text-xs font-semibold uppercase tracking-[0.3em] text-black transition-all hover:bg-white hover:scale-[1.01]"
              >
                {submitted ? (
                  <motion.span initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-2">
                    Transmission Sent <Send className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
