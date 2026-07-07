import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, Plus, Minus, Loader2, Check } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Reveal, PageHero, SectionLabel } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Favored PLC — Talk to a Specialist" },
      { name: "description", content: "Request a quote, become a partner, or visit one of our regional offices." },
      { property: "og:title", content: "Contact Favored PLC" },
      { property: "og:description", content: "A specialist responds within one business day." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const offices = [
  { city: "Addis Ababa", role: "Headquarters", addr: "Bole Sub-City, Addis Ababa", phone: "+251 11 000 0000" },
  { city: "Bahir Dar", role: "Regional Hub", addr: "Industrial Zone, Bahir Dar", phone: "+251 58 000 0000" },
  { city: "Hawassa", role: "Distribution Center", addr: "SNNPR Industrial Park, Hawassa", phone: "+251 46 000 0000" },
];

const faqs = [
  { id: "moq", q: "What is your minimum order quantity?", a: "MOQ varies by product line — most consumables ship from a single carton, while specialty pharmaceuticals may have lot-based minimums. Our team will confirm at quote." },
  { id: "emergency", q: "How quickly can you fulfill an emergency order?", a: "Cold-chain and life-saving supplies in regional stock typically dispatch within 4 hours; nationwide delivery averages 48 hours." },
  { id: "coverage", q: "Do you supply outside major cities?", a: "Yes — through our six regional hubs we deliver to facilities in every region of the country." },
  { id: "compliance", q: "Can I see compliance documentation before ordering?", a: "Absolutely. We share CoA, CoO, and import certificates ahead of every order on request." },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  org: z.string().trim().min(2, "Organization is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  type: z.string(),
  message: z.string().trim().min(10, "Tell us a bit more (10+ chars)").max(1000),
});
type FormState = { name: string; org: string; email: string; phone: string; type: string; message: string };

function Contact() {
  const [openFaq, setOpenFaq] = useState<string | null>("moq");
  const [form, setForm] = useState<FormState>({ name: "", org: "", email: "", phone: "", type: "Product Quote", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // FAQ deep-link via hash (#faq-emergency)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sync = () => {
      const h = window.location.hash.replace("#faq-", "");
      if (h && faqs.some((f) => f.id === h)) {
        setOpenFaq(h);
        const el = document.getElementById(`faq-${h}`);
        if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as keyof FormState;
        fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setErrors({});
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Inquiry received — we'll be in touch within one business day.");
  };

  return (
    <main className="bg-white text-[var(--ink)] overflow-x-hidden">
      <PageHero
        kicker="Get In Touch"
        variant="pulse"
        title={<>Let's talk <span className="text-[var(--brand)]">supply.</span></>}
        lead="Whether you're a hospital procurement officer, pharmacy owner, or manufacturer looking for a distribution partner — a specialist will respond within one business day."
      />

      {/* Form + offices split */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-12 gap-8">
          <Reveal className="lg:col-span-7">
            <form noValidate onSubmit={handleSubmit} className="rounded-[32px] bg-[var(--mist)] border border-black/5 p-8 sm:p-12">
              <div className="flex items-center gap-2 mb-8">
                <div className="h-2 w-2 rounded-full bg-[var(--brand)] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--ink)]/60">Inquiry Form</span>
              </div>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl bg-white border border-[var(--brand)]/30 p-8 text-center">
                  <div className="mx-auto h-14 w-14 rounded-full bg-[var(--brand)] text-white grid place-items-center"><Check className="h-7 w-7" /></div>
                  <h3 className="mt-4 font-display text-3xl">Inquiry received</h3>
                  <p className="mt-2 text-[var(--ink)]/65">A specialist will be in touch within one business day.</p>
                </motion.div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {([
                      ["name", "Full name", "Dr. Amani Reta", "text"],
                      ["org", "Organization", "Tikur Anbessa Hospital", "text"],
                      ["email", "Email", "you@hospital.org", "email"],
                      ["phone", "Phone", "+251 9...", "tel"],
                    ] as const).map(([k, l, p, type]) => (
                      <label key={k} className="block">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ink)]/50">{l}</span>
                        <input
                          type={type}
                          value={form[k as keyof FormState]}
                          onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
                          placeholder={p}
                          aria-invalid={!!errors[k as keyof FormState]}
                          className={`mt-2 w-full rounded-2xl bg-white border px-4 py-3 text-sm outline-none transition-colors ${errors[k as keyof FormState] ? "border-red-400" : "border-black/5 focus:border-[var(--brand)]"}`}
                        />
                        {errors[k as keyof FormState] && <span className="mt-1 block text-xs text-red-500">{errors[k as keyof FormState]}</span>}
                      </label>
                    ))}
                  </div>
                  <label className="block mt-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ink)]/50">Inquiry Type</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["Partnership", "Product Quote", "Catalog Request", "Other"].map((t) => (
                        <button type="button" key={t} onClick={() => setForm((f) => ({ ...f, type: t }))}
                          className={`rounded-full px-4 py-2 text-sm border transition-colors ${form.type === t ? "bg-[var(--ink)] text-white border-[var(--ink)]" : "bg-white text-[var(--ink)]/70 border-black/10 hover:border-[var(--brand)]"}`}>{t}</button>
                      ))}
                    </div>
                  </label>
                  <label className="block mt-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ink)]/50">Message</span>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Tell us what you need…"
                      aria-invalid={!!errors.message}
                      className={`mt-2 w-full rounded-2xl bg-white border px-4 py-3 text-sm outline-none transition-colors resize-none ${errors.message ? "border-red-400" : "border-black/5 focus:border-[var(--brand)]"}`}
                    />
                    {errors.message && <span className="mt-1 block text-xs text-red-500">{errors.message}</span>}
                  </label>
                  <button type="submit" disabled={submitting} className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] text-white px-7 py-4 font-medium hover:bg-[var(--ink)] transition-colors shadow-[var(--shadow-glow)] disabled:opacity-60">
                    {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Send inquiry <ArrowRight className="h-4 w-4" /></>}
                  </button>
                </>
              )}
            </form>
          </Reveal>

          <div className="lg:col-span-5 space-y-4">
            <Reveal>
              <div className="rounded-3xl bg-[var(--ink)] text-white p-8 relative overflow-hidden">
                <div aria-hidden className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-30" style={{ background: "var(--gradient-glow)" }} />
                <SectionLabel>Direct Lines</SectionLabel>
                <div className="mt-6 space-y-4">
                  <a href="mailto:hello@favoredplc.com" className="flex items-center gap-3 group">
                    <div className="h-10 w-10 rounded-2xl glass-dark grid place-items-center"><Mail className="h-4 w-4 text-[var(--brand)]" /></div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">Email</div>
                      <div className="text-white group-hover:text-[var(--brand)] transition-colors">hello@favoredplc.com</div>
                    </div>
                  </a>
                  <a href="tel:+251110000000" className="flex items-center gap-3 group">
                    <div className="h-10 w-10 rounded-2xl glass-dark grid place-items-center"><Phone className="h-4 w-4 text-[var(--brand)]" /></div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">Phone</div>
                      <div className="text-white group-hover:text-[var(--brand)] transition-colors">+251 11 000 0000</div>
                    </div>
                  </a>
                </div>
              </div>
            </Reveal>
            {offices.map((o, i) => (
              <Reveal key={o.city} delay={i * 0.05}>
                <div className="rounded-3xl bg-white border border-black/5 p-6 hover:shadow-[var(--shadow-card)] transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--brand)]">{o.role}</div>
                      <div className="font-display text-2xl mt-1">{o.city}</div>
                    </div>
                    <MapPin className="h-5 w-5 text-[var(--ink)]/40" />
                  </div>
                  <div className="mt-4 text-sm text-[var(--ink)]/70">{o.addr}</div>
                  <div className="text-sm font-mono text-[var(--ink)]/60">{o.phone}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal className="mb-12 text-center">
            <SectionLabel>Frequently Asked</SectionLabel>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl">Before you write to us.</h2>
            <p className="mt-4 text-sm text-[var(--ink)]/50 font-mono">Tip: deep-link any question, e.g. /contact#faq-emergency</p>
          </Reveal>
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const open = openFaq === f.id;
              return (
                <Reveal key={f.id} delay={i * 0.04}>
                  <div id={`faq-${f.id}`} className="scroll-mt-32">
                    <button onClick={() => {
                      const next = open ? null : f.id;
                      setOpenFaq(next);
                      if (next && typeof window !== "undefined") {
                        history.replaceState(null, "", `#faq-${f.id}`);
                      }
                    }} className="w-full text-left rounded-3xl bg-[var(--mist)] border border-black/5 p-6 sm:p-7 hover:border-[var(--brand)]/30 transition-colors">
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-display text-xl sm:text-2xl text-[var(--ink)]">{f.q}</span>
                        <div className="h-9 w-9 shrink-0 rounded-full bg-white grid place-items-center border border-black/5">
                          {open ? <Minus className="h-4 w-4 text-[var(--brand)]" /> : <Plus className="h-4 w-4 text-[var(--ink)]" />}
                        </div>
                      </div>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                            <p className="mt-4 text-[var(--ink)]/70 leading-relaxed">{f.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }) }} />
    </main>
  );
}

