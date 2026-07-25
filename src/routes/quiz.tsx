import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Skin Quiz · MIMIbeauty" },
      { name: "description", content: "A 60-second skin quiz to build your personal MIMIbeauty ritual." },
      { property: "og:title", content: "Skin Quiz · MIMIbeauty" },
      { property: "og:description", content: "Build your personal ritual in 60 seconds." },
    ],
  }),
  component: Quiz,
});

const steps = [
  { q: "How would you describe your skin?", opts: ["Dry", "Oily", "Combination", "Sensitive"] },
  { q: "What is your primary concern?", opts: ["Dullness", "Fine lines", "Breakouts", "Barrier repair"] },
  { q: "How reactive is your skin?", opts: ["Very calm", "Occasionally reactive", "Often reactive", "Highly sensitive"] },
  { q: "How much time will you give the ritual?", opts: ["2 min", "5 min", "10 min", "Slow ritual"] },
];

function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const done = step >= steps.length;

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-3xl flex-col justify-center px-6 pt-20 pb-16 md:pt-32 md:pb-24">
      <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Skin Quiz</p>

      <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div className="h-full bg-gold" animate={{ width: `${(Math.min(step, steps.length) / steps.length) * 100}%` }} transition={{ duration: 0.6 }} />
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div key={step} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45 }} className="mt-12">
            <p className="text-sm text-muted-foreground">Question {step + 1} of {steps.length}</p>
            <h2 className="mt-3 font-display text-2xl leading-tight sm:text-4xl md:text-5xl">{steps[step].q}</h2>
            <div className="mt-10 grid gap-3 md:grid-cols-2">
              {steps[step].opts.map((o) => (
                <button
                  key={o}
                  onClick={() => { setAnswers([...answers, o]); setStep(step + 1); }}
                  className="group flex items-center justify-between rounded-2xl border border-border bg-background p-5 text-left transition hover:border-gold hover:bg-secondary"
                >
                  <span className="font-display text-xl">{o}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-gold" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="done" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-12 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold text-gold"><Check className="h-6 w-6" /></div>
            <h2 className="mt-6 font-display text-3xl leading-tight md:text-5xl">Your ritual is ready.</h2>
            <p className="mt-3 text-muted-foreground">We've built a routine based on your answers.</p>
            <ul className="mx-auto mt-6 max-w-md text-left text-sm text-muted-foreground">
              {answers.map((a, i) => <li key={i} className="flex justify-between border-b border-border py-2">{steps[i].q.replace("?", "")} <span className="text-foreground">{a}</span></li>)}
            </ul>
            <Link to="/shop" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm text-background">See your ritual <ArrowRight className="h-4 w-4" /></Link>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
