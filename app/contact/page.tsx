"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Clock3, Mail, MapPin, Phone, Sprout } from "lucide-react";

const topics = ["General Inquiry", "Product Question", "Order Support", "Skin Consultation", "Wholesale", "Collaboration", "Other"];
const details = [
  { icon: MapPin, label: "Our studio", value: "12 rue de Sévigné, Paris 75004, France" },
  { icon: Mail, label: "Email us", value: "concierge@mimibeauty.com", href: "mailto:concierge@mimibeauty.com" },
  { icon: Phone, label: "Direct care line", value: "03274984584", href: "tel:03274984584" },
  { icon: Clock3, label: "Hours", value: "Monday – Friday\n10:00 AM – 6:00 PM (PKT)" },
];
type FormState = { firstName: string; lastName: string; email: string; topic: string; message: string };
type Errors = Partial<Record<keyof FormState, string>>;
const initialForm: FormState = { firstName: "", lastName: "", email: "", topic: "", message: "" };
function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.firstName.trim()) errors.firstName = "Please add your first name.";
  if (!form.lastName.trim()) errors.lastName = "Please add your last name.";
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Please enter a valid email.";
  if (!form.topic) errors.topic = "Please choose a topic.";
  if (form.message.trim().length < 10) errors.message = "Please share a little more with us.";
  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSent(false);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSubmitting(true);
    window.setTimeout(() => { setSubmitting(false); setSent(true); setForm(initialForm); }, 700);
  };
  return (
    <main className="relative isolate overflow-hidden bg-[#08140E]">
      <section className="relative min-h-[calc(100vh-4.75rem)]">
        <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-16 sm:px-8 md:px-12 md:pb-32 md:pt-24 lg:px-16">
          <div className="rounded-[2rem] bg-[#0D1C14] p-8 sm:p-12 md:p-16 lg:p-20">
            <div className="grid gap-12 md:grid-cols-[0.45fr_0.55fr] md:gap-16 lg:gap-24">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col justify-center">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.36em] text-gold">We&apos;re here for you</p>
            <h1 className="max-w-xl text-balance text-[clamp(3.25rem,7vw,6.7rem)] leading-[0.94] text-foreground">Let&apos;s care<br />for your skin,<br /><em className="text-gold">together.</em></h1>
            <div className="my-8 h-px w-28 bg-gold/60" />
            <p className="max-w-md text-pretty font-serif text-lg leading-relaxed text-foreground/80">Have a question, need guidance, or want to collaborate? Our team is here to help you with anything you need.</p>
            <div className="mt-10 flex flex-col gap-5">{details.map(({ icon: Icon, label, value, href }) => <div key={label} className="flex items-start gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/20 bg-forest/80 text-gold"><Icon size={18} strokeWidth={1.3} /></span><div className="pt-0.5"><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">{label}</p>{href ? <a href={href} className="mt-1 block whitespace-pre-line text-sm leading-relaxed text-foreground/80 transition-colors hover:text-gold">{value}</a> : <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-foreground/80">{value}</p>}</div></div>)}</div>
            <p className="mt-9 flex items-center gap-3 font-serif text-base text-gold/90"><Sprout size={20} strokeWidth={1.2} /> We typically respond within 24 hours.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.12 }} className="rounded-[1.5rem] border border-gold/20 bg-[#0D1C14]/90 p-6 shadow-2xl backdrop-blur-md sm:p-9 lg:p-11">
            <div className="mb-8 flex items-center gap-3"><Sprout className="text-gold" size={26} strokeWidth={1.2} /><h2 className="text-3xl text-foreground sm:text-4xl">Send us a message</h2></div>
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              <div className="grid gap-6 sm:grid-cols-2">{(["firstName", "lastName"] as const).map((key) => <label key={key} className="flex flex-col gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/85">{key === "firstName" ? "First name" : "Last name"}<input value={form[key]} onChange={(e) => update(key, e.target.value)} placeholder={key === "firstName" ? "Your first name" : "Your last name"} aria-invalid={Boolean(errors[key])} className="h-14 rounded-xl border border-foreground/15 bg-transparent px-5 text-sm font-normal normal-case tracking-normal text-foreground outline-none transition-colors placeholder:text-foreground/35 focus:border-gold" />{errors[key] && <span className="text-[10px] font-normal normal-case tracking-normal text-red-300">{errors[key]}</span>}</label>)}</div>
              <label className="flex flex-col gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/85">Email address<input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Your email address" aria-invalid={Boolean(errors.email)} className="h-14 rounded-xl border border-foreground/15 bg-transparent px-5 text-sm font-normal normal-case tracking-normal text-foreground outline-none transition-colors placeholder:text-foreground/35 focus:border-gold" />{errors.email && <span className="text-[10px] font-normal normal-case tracking-normal text-red-300">{errors.email}</span>}</label>
              <label className="flex flex-col gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/85">Topic / subject<select value={form.topic} onChange={(e) => update("topic", e.target.value)} aria-invalid={Boolean(errors.topic)} className="h-14 rounded-xl border border-foreground/15 bg-card px-5 text-sm font-normal normal-case tracking-normal text-foreground outline-none transition-colors focus:border-gold"><option value="">Choose a topic</option>{topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}</select>{errors.topic && <span className="text-[10px] font-normal normal-case tracking-normal text-red-300">{errors.topic}</span>}</label>
              <label className="flex flex-col gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/85">Message<textarea value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Write your message here..." aria-invalid={Boolean(errors.message)} className="min-h-40 resize-y rounded-xl border border-foreground/15 bg-transparent px-5 py-4 text-sm font-normal normal-case tracking-normal text-foreground outline-none transition-colors placeholder:text-foreground/35 focus:border-gold" />{errors.message && <span className="text-[10px] font-normal normal-case tracking-normal text-red-300">{errors.message}</span>}</label>
              <button type="submit" disabled={submitting} className="mt-1 flex h-14 items-center justify-center gap-3 rounded-xl bg-[#E8D7BE] px-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#08140E] transition-all hover:bg-[#F5F2EC] hover:translate-x-1 disabled:cursor-wait disabled:opacity-70">{submitting ? "SENDING..." : "SEND MESSAGE"}<ArrowRight size={17} /></button>
              <AnimatePresence mode="wait">{sent && <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status" className="flex items-center justify-center gap-2 text-center text-sm text-gold"><Check size={16} /> Thank you for reaching out. We&apos;ll be in touch shortly.</motion.p>}</AnimatePresence>
            </form>
          </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
