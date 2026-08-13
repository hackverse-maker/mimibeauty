"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

import { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  }),
};

const TOPICS = [
  "Product Recommendations",
  "Order & Shipping Inquiry",
  "Wholesale & Partnerships",
  "Press & Media",
  "General Inquiry",
  "Other",
];

const CONTACT_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Our Studio",
    value: "12 Rue de Sévigné\nParis 75004, France",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Concierge Email",
    value: "concierge@mimibeauty.com",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l1.27-.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "Direct Care Line",
    value: "+33 1 45 67 89 00",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Working Hours",
    value: "Mon – Fri  ·  9:00 – 18:00 CET\nSaturday  ·  10:00 – 15:00 CET",
  },
];

export default function ContactPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    topic: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4500);
  };

  return (
    <>
      {/* ─── Google Fonts ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap');

        .contact-font-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .contact-font-sans  { font-family: 'Inter', system-ui, sans-serif; }

        .contact-input {
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(229,212,192,0.14);
          border-radius: 10px;
          color: #EDE5D8;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 14px;
          padding: 14px 16px;
          width: 100%;
          outline: none;
          transition: border-color 0.25s, background 0.25s;
          appearance: none;
          -webkit-appearance: none;
        }
        .contact-input::placeholder { color: rgba(229,212,192,0.28); }
        .contact-input:focus {
          border-color: rgba(229,212,192,0.45);
          background: rgba(255,255,255,0.055);
        }
        .contact-input option { background: #182F24; color: #EDE5D8; }

        .contact-textarea {
          resize: none;
          min-height: 130px;
        }

        /* Custom select arrow */
        .contact-select-wrap { position: relative; }
        .contact-select-arrow {
          pointer-events: none;
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(229,212,192,0.45);
        }

        /* Leaf glow orbs */
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        /* Scrollbar */
        .contact-scroll::-webkit-scrollbar { width: 4px; }
        .contact-scroll::-webkit-scrollbar-track { background: transparent; }
        .contact-scroll::-webkit-scrollbar-thumb { background: rgba(229,212,192,0.2); border-radius: 4px; }
      `}</style>

      <main
        className="contact-font-sans"
        style={{
          minHeight: "100vh",
          background: "#0F1F17",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ─── Background image + overlay ─── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <img
            src="/contact_organic_bg.jpg"
            alt=""
            aria-hidden
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              filter: "saturate(0.7) brightness(0.5)",
            }}
          />
          {/* dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(10,22,15,0.90) 0%, rgba(15,31,23,0.82) 50%, rgba(12,25,18,0.92) 100%)",
            }}
          />
          {/* vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(6,14,10,0.65) 100%)",
            }}
          />
        </div>

        {/* ─── Ambient glow orbs ─── */}
        <div className="glow-orb" style={{ width: 480, height: 480, top: -120, left: -140, background: "rgba(38,85,55,0.22)" }} />
        <div className="glow-orb" style={{ width: 320, height: 320, bottom: 40, right: -80, background: "rgba(229,212,192,0.06)" }} />
        <div className="glow-orb" style={{ width: 220, height: 220, top: "40%", right: "30%", background: "rgba(28,68,42,0.18)" }} />

        {/* ─── Content ─── */}
        <div
          ref={ref}
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: 1360,
            margin: "0 auto",
            padding: "clamp(80px, 10vw, 110px) clamp(24px, 5vw, 72px) clamp(80px, 10vw, 110px)",
          }}
        >
          {/* ─── Two-column grid ─── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,42%) minmax(0,58%)",
              gap: "clamp(40px,5vw,80px)",
              alignItems: "start",
            }}
            className="contact-grid"
          >
            {/* ══════════ LEFT COLUMN ══════════ */}
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              style={{ display: "flex", flexDirection: "column", gap: 32 }}
            >
              {/* Top label */}
              <motion.p
                variants={fadeUp}
                custom={0}
                style={{
                  fontSize: 11,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(229,212,192,0.55)",
                  fontWeight: 500,
                }}
              >
                WE'RE HERE FOR YOU
              </motion.p>

              {/* Main heading */}
              <motion.h1
                variants={fadeUp}
                custom={1}
                className="contact-font-serif"
                style={{
                  fontSize: "clamp(38px, 4.5vw, 60px)",
                  fontWeight: 300,
                  lineHeight: 1.1,
                  color: "#EDE5D8",
                  letterSpacing: "-0.01em",
                  marginTop: -8,
                }}
              >
                Let's care for{" "}
                <em style={{ color: "#E5D4C0", fontStyle: "italic" }}>
                  your skin,
                </em>
                <br />
                <em style={{ color: "#C9A86A", fontStyle: "italic" }}>together.</em>
              </motion.h1>

              {/* Paragraph */}
              <motion.p
                variants={fadeUp}
                custom={2}
                style={{
                  fontSize: 15,
                  lineHeight: 1.78,
                  color: "rgba(220,210,195,0.68)",
                  fontWeight: 300,
                  maxWidth: 380,
                }}
              >
                Have a question, need guidance, or want to collaborate? Our concierge team is here to help you with anything you need — from product collections to bespoke recommendations.
              </motion.p>

              {/* Contact detail list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 4 }}>
                {CONTACT_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    custom={3 + i}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    style={{ display: "flex", alignItems: "flex-start", gap: 16 }}
                  >
                    {/* Icon badge */}
                    <div
                      style={{
                        flexShrink: 0,
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "rgba(229,212,192,0.07)",
                        border: "1px solid rgba(229,212,192,0.18)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#C9A86A",
                        marginTop: 2,
                      }}
                    >
                      {item.icon}
                    </div>

                    <div>
                      <p
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "rgba(201,168,106,0.7)",
                          fontWeight: 500,
                          marginBottom: 5,
                        }}
                      >
                        {item.label}
                      </p>
                      <p
                        style={{
                          fontSize: 14,
                          lineHeight: 1.65,
                          color: "rgba(237,229,216,0.82)",
                          fontWeight: 300,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer note */}
              <motion.div
                variants={fadeUp}
                custom={8}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 8,
                  paddingTop: 24,
                  borderTop: "1px solid rgba(229,212,192,0.1)",
                }}
              >
                {/* Leaf icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A86A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.75">
                  <path d="M2 22s4-2 8-8 10-12 12-12c0 0-2 8-8 12S2 22 2 22z" />
                  <path d="M2 22 12 12" />
                </svg>
                <p style={{ fontSize: 12.5, color: "rgba(201,168,106,0.65)", fontStyle: "italic" }}>
                  We typically respond within 24 hours.
                </p>
              </motion.div>
            </motion.div>

            {/* ══════════ RIGHT COLUMN — FORM CARD ══════════ */}
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              <div
                style={{
                  background: "rgba(18,36,26,0.82)",
                  backdropFilter: "blur(28px)",
                  WebkitBackdropFilter: "blur(28px)",
                  border: "1px solid rgba(229,212,192,0.13)",
                  borderRadius: 22,
                  padding: "clamp(28px,4vw,46px)",
                  boxShadow:
                    "0 32px 80px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(229,212,192,0.07) inset, 0 1px 0 rgba(229,212,192,0.1) inset",
                }}
              >
                {/* Card header */}
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 30 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A86A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 22s4-2 8-8 10-12 12-12c0 0-2 8-8 12S2 22 2 22z" />
                    <path d="M2 22 12 12" />
                  </svg>
                  <h2
                    className="contact-font-serif"
                    style={{
                      fontSize: 22,
                      fontWeight: 400,
                      fontStyle: "italic",
                      color: "#EDE5D8",
                      letterSpacing: "0.01em",
                    }}
                  >
                    Send us a message
                  </h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                  {/* Row: First + Last Name */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    {[
                      { name: "firstName", label: "First Name", placeholder: "Amara" },
                      { name: "lastName", label: "Last Name", placeholder: "Laurent" },
                    ].map((field) => (
                      <div key={field.name} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                        <label
                          htmlFor={field.name}
                          style={{
                            fontSize: 10,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "rgba(142,159,148,0.85)",
                            fontWeight: 500,
                          }}
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.name}
                          name={field.name}
                          required
                          placeholder={field.placeholder}
                          value={(form as Record<string, string>)[field.name]}
                          onChange={handleChange}
                          className="contact-input"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Email */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    <label
                      htmlFor="email"
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(142,159,148,0.85)",
                        fontWeight: 500,
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="contact-input"
                    />
                  </div>

                  {/* Topic dropdown */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    <label
                      htmlFor="topic"
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(142,159,148,0.85)",
                        fontWeight: 500,
                      }}
                    >
                      Topic / Subject
                    </label>
                    <div className="contact-select-wrap">
                      <select
                        id="topic"
                        name="topic"
                        required
                        value={form.topic}
                        onChange={handleChange}
                        className="contact-input"
                        style={{ cursor: "pointer", paddingRight: 40 }}
                      >
                        <option value="" disabled>
                          Select a topic…
                        </option>
                        {TOPICS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <span className="contact-select-arrow">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    <label
                      htmlFor="message"
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(142,159,148,0.85)",
                        fontWeight: 500,
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Write your message here…"
                      value={form.message}
                      onChange={handleChange}
                      className="contact-input contact-textarea"
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.012 }}
                    whileTap={{ scale: 0.985 }}
                    disabled={sent}
                    style={{
                      marginTop: 4,
                      width: "100%",
                      padding: "16px 24px",
                      borderRadius: 100,
                      background: sent ? "rgba(201,168,106,0.18)" : "#E5D4C0",
                      color: sent ? "#C9A86A" : "#0F1F17",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      border: sent ? "1px solid rgba(201,168,106,0.35)" : "none",
                      cursor: sent ? "default" : "pointer",
                      fontFamily: "'Inter', system-ui, sans-serif",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {sent ? "✓  Message Sent" : "SEND MESSAGE →"}
                  </motion.button>

                  {/* Privacy note */}
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 11.5,
                      color: "rgba(142,159,148,0.5)",
                      marginTop: -4,
                      lineHeight: 1.6,
                    }}
                  >
                    Your information is handled with complete discretion and respect.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ─── Responsive overrides ─── */}
        <style>{`
          @media (max-width: 820px) {
            .contact-grid {
              grid-template-columns: 1fr !important;
              gap: 56px !important;
            }
          }
        `}</style>
      </main>
    </>
  );
}
