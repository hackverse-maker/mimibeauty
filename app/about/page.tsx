"use client";
import { motion } from "framer-motion";
import { assets } from "@/lib/products";
import { ArrowRight, Sparkles, Shield, Leaf, Heart } from "lucide-react";
import { WhoWeAreCard } from "@/components/site/who-we-are-card";



export default function About() {
  return (
    <div className="relative min-h-screen bg-background text-white selection:bg-gold/20 selection:text-gold overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-stone-500/5 blur-[200px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative isolate min-h-[90vh] flex items-center overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 -z-10">
          <img src={assets.stone} alt="Background Stone" className="h-full w-full object-cover opacity-45 scale-105 filter grayscale contrast-125" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </div>
        
        <div className="mx-auto max-w-[1800px] w-full px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4"
            >
              <span className="h-[1px] w-12 bg-gold/60" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-gold">The House of MIMI</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: 0.2 }} 
              className="mt-8 font-display text-[clamp(2.5rem,7.5vw,7.5rem)] leading-[0.9] tracking-tighter text-balance"
            >
              A quiet obsession <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gold/70">with skin.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-foreground/70"
            >
              We design slow, intentional skincare formulated to integrate seamlessly into your daily space. Crafting botanically-infused, clinically-proven formulas in small batches.
            </motion.p>
          </div>
        </div>
        
        {/* Scroll indicator micro-animation */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/50">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-6 rounded-full bg-gold/50"
          />
        </div>
      </section>

      {/* Who We Are Editorial Card */}
      <WhoWeAreCard />

      {/* Philosophy Statement */}
      <section className="relative z-10 mx-auto max-w-[1800px] px-6 lg:px-12 xl:px-20 py-24 md:py-36 border-t border-white/5">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] items-start">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-[1px] w-8 bg-gold" />
              <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-gold">About Us</p>
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
              At Mimi Beauty, we believe skincare should feel effortless, luxurious, and inspired by nature.
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-8 text-lg md:text-xl text-foreground/80 leading-relaxed font-light"
          >
            <p>
              Created in Pakistan, our collection is thoughtfully formulated with naturally derived ingredients to nourish your skin with lightweight, fast-absorbing care. Every product is designed to fit seamlessly into your daily collection while delivering effective, uncompromising results.
            </p>
            <p className="text-foreground/60 text-base md:text-lg">
              As one of the first local brands to introduce a complete head-to-toe range of specialized dry oils, we’re redefining modern skincare with formulas crafted for face, body, hair, and intimate areas.
            </p>
            <p className="text-foreground/60 text-base md:text-lg">
              Our products are free from sulphates, parabens, silicones, and harsh synthetic additives because we believe what you leave out is just as important as what you put in.
            </p>
            <p className="font-medium text-gold">
              Simple. Intentional. Naturally beautiful.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="relative z-10 border-y border-white/5 bg-white/[0.01] py-24 md:py-36 backdrop-blur-3xl">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12 xl:px-20">
          <div className="flex items-center gap-4">
            <span className="h-[1px] w-8 bg-gold" />
            <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-gold">The Pillars</p>
          </div>
          <h2 className="mt-6 font-display text-4xl md:text-6xl">Values, quietly held.</h2>
          
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { 
                icon: Shield,
                t: "Clinical Honesty", 
                b: "We formulate with active ingredients at the exact percentages validated in clinical research. No watered-down components, no compromise." 
              },
              { 
                icon: Leaf,
                t: "Botanical Craft", 
                b: "Cold-pressed, organic, and ethically wild-harvested elements. Fully traceable from the soil to the glass container." 
              },
              { 
                icon: Heart,
                t: "Objects of Permanence", 
                b: "Designed to reside permanently on your dresser. Refillable heavyweight glass structures with fully recyclable dispenser systems." 
              },
            ].map((v, i) => (
              <motion.div 
                key={v.t} 
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.7, delay: i * 0.15 }} 
                className="group relative rounded-2xl border border-white/5 bg-background/60 p-8 md:p-12 hover:border-gold/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.02] border border-white/10 text-gold group-hover:scale-110 transition-transform duration-500">
                  <v.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold/60">0{i + 1}</p>
                <h3 className="mt-4 font-display text-2xl md:text-3xl text-white group-hover:text-gold transition-colors duration-300">{v.t}</h3>
                <p className="mt-4 text-base text-foreground/60 leading-relaxed font-light">{v.b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
