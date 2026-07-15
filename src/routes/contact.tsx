import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, Plus, Minus, Loader2, Check } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Reveal, PageHero, SectionLabel } from "@/components/site";
import logoCroppedSvgUrl from "@/assets/logo/Logo-Cropped.svg?url";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Favored PLC — Talk to a Specialist" },
      {
        name: "description",
        content: "Request a quote, become a partner, or visit one of our regional offices.",
      },
      { property: "og:title", content: "Contact Favored PLC" },
      { property: "og:description", content: "A specialist responds within one business day." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});


const AnimatedText = ({ children }: { children: React.ReactNode }) => (
  <span className="group relative overflow-hidden inline-flex cursor-default">
    <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
      {children}
    </span>
    <span className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-full group-hover:translate-y-0" aria-hidden="true">
      {children}
    </span>
  </span>
);

const faqs = [
  {
    id: "moq",
    q: "What is your minimum order quantity?",
    a: "MOQ varies by product line — most consumables ship from a single carton, while specialty pharmaceuticals may have lot-based minimums. Our team will confirm at quote.",
  },
  {
    id: "emergency",
    q: "How quickly can you fulfill an emergency order?",
    a: "Cold-chain and life-saving supplies in regional stock typically dispatch within 4 hours; nationwide delivery averages 48 hours.",
  },
  {
    id: "coverage",
    q: "Do you supply outside major cities?",
    a: "Yes — through our six regional hubs we deliver to facilities in every region of the country.",
  },
  {
    id: "compliance",
    q: "Can I see compliance documentation before ordering?",
    a: "Absolutely. We share CoA, CoO, and import certificates ahead of every order on request.",
  },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  org: z.string().trim().min(2, "Organization is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  type: z.string(),
  message: z.string().trim().min(10, "Tell us a bit more (10+ chars)").max(1000),
});
type FormState = {
  name: string;
  org: string;
  email: string;
  phone: string;
  type: string;
  message: string;
};

function Contact() {
  const [openFaq, setOpenFaq] = useState<string | null>("moq");
  const [form, setForm] = useState<FormState>({
    name: "",
    org: "",
    email: "",
    phone: "",
    type: "Product Quote",
    message: "",
  });
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
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[var(--ink)] text-white">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-110 pointer-events-none"
        >
          <source src="https://www.pexels.com/download/video/10577610/" type="video/mp4" />
        </video>

        {/* Glass Overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-lg pointer-events-none z-0" />

        {/* Left Text */}
        <div className="absolute left-6 sm:left-12 md:left-24 top-1/2 -translate-y-1/2 z-10 hidden sm:block">
          <span className="font-display text-lg md:text-xl lg:text-2xl text-white/90 tracking-wide">
            Get In Touch
          </span>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <img
            src={logoCroppedSvgUrl}
            alt="Logo"
            className="h-24 sm:h-32 md:h-40 w-auto brightness-0 invert"
          />
        </div>

        {/* Right Text */}
        <div className="absolute right-6 sm:right-12 md:right-24 top-1/2 -translate-y-1/2 z-10 hidden sm:block">
          <span className="font-display text-lg md:text-xl lg:text-2xl text-white/90 tracking-wide">
            Let's Talk supply
          </span>
        </div>

        {/* Bottom Text */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 text-center z-10">
          <p className="text-white/80 text-lg sm:text-xl md:text-2xl leading-relaxed font-medium">
            Whether you're a hospital procurement officer, pharmacy owner, or manufacturer looking for a distribution partner — a specialist will respond within one business day.
          </p>
        </div>
      </section>

      {/* Headquarter & Contact Info Section */}
      <section className="bg-white py-16 border-y border-black/5">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Headers */}
            <div className="border-b border-black/10 pb-4 md:pr-12 lg:pr-24 md:border-r">
              <h2 className="text-xl sm:text-2xl font-display tracking-wide text-[var(--ink)]">Headquarter</h2>
            </div>
            <div className="border-b border-black/10 pb-4 pt-8 md:pt-0 md:pl-12 lg:pl-24">
              <h2 className="text-xl sm:text-2xl font-display tracking-wide text-[var(--ink)]">Contact</h2>
            </div>

            {/* Content */}
            <div className="pt-8 md:pr-12 lg:pr-24 md:border-r border-black/10 relative flex flex-col justify-center">
              <div className="text-lg sm:text-xl md:text-2xl text-[var(--ink)]/80 leading-snug tracking-tight flex flex-col items-start gap-1">
                <AnimatedText>Bole Sub-City,</AnimatedText>
                <AnimatedText>Addis Ababa</AnimatedText>
                <AnimatedText>Ethiopia</AnimatedText>
              </div>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#bbf7d0]" />
            </div>

            <div className="pt-8 md:pl-12 lg:pl-24 flex flex-col justify-center">
              <div className="text-lg sm:text-xl md:text-2xl text-[var(--ink)]/80 leading-snug tracking-tight flex flex-col items-start gap-1">
                <AnimatedText>Phone - +251 11 000 0000</AnimatedText>
                <AnimatedText>Mail - hello@favoredplc.com</AnimatedText>
                <AnimatedText>TIN & VAT - 0000000000</AnimatedText>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form & FAQ Split Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-16 lg:gap-24">
          <Reveal>
            <form
              noValidate
              onSubmit={handleSubmit}
              className="bg-transparent"
            >
              <div className="flex items-center gap-2 mb-10">
                <div className="h-2 w-2 rounded-full bg-[var(--brand)] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--ink)]/60">
                  Inquiry Form
                </span>
              </div>

              {submitted ? (
                <div className="rounded-2xl bg-white border border-[var(--brand)]/30 p-8 text-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="mx-auto h-14 w-14 rounded-full bg-[var(--brand)] text-white grid place-items-center">
                    <Check className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-display text-3xl">Inquiry received</h3>
                  <p className="mt-2 text-[var(--ink)]/65">
                    A specialist will be in touch within one business day.
                  </p>
                </div>
              ) : (
                <div className="space-y-10">
                  <div className="space-y-8">
                    {(
                      [
                        ["name", "Name", true, "Hello...", "text"],
                        ["email", "Email", true, "Where can I reply?", "email"],
                        ["org", "Organization Name", false, "Your organization or website?", "text"],
                        ["phone", "Phone", false, "Your phone number?", "tel"],
                      ] as const
                    ).map(([k, l, req, p, type]) => (
                      <label key={k} className="block relative">
                        <span className="block text-sm font-semibold text-[var(--ink)] mb-2">
                          {l}
                          {req && <span className="text-red-400 ml-0.5">*</span>}
                        </span>
                        <input
                          type={type}
                          value={form[k as keyof FormState]}
                          onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
                          placeholder={p}
                          aria-invalid={!!errors[k as keyof FormState]}
                          className={`w-full bg-transparent border-b py-3 text-sm outline-none transition-colors placeholder:text-[var(--ink)]/40 ${errors[k as keyof FormState] ? "border-red-400" : "border-black/10 focus:border-[var(--brand)]"}`}
                        />
                        {errors[k as keyof FormState] && (
                          <span className="absolute -bottom-5 left-0 text-xs text-red-500">
                            {errors[k as keyof FormState]}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>

                  <label className="block">
                    <span className="block text-sm font-semibold text-[var(--ink)] mb-4">
                      What's in your mind?<span className="text-red-400 ml-0.5">*</span>
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {["Partnership", "Product Quote", "Catalog Request", "Other"].map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setForm((f) => ({ ...f, type: t }))}
                          className={`rounded-full px-5 py-2.5 text-sm transition-colors border ${form.type === t ? "bg-[var(--brand)] text-white border-[var(--brand)]" : "bg-white text-[var(--ink)]/70 border-black/15 hover:border-black/30"}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </label>

                  <label className="block relative">
                    <span className="block text-sm font-semibold text-[var(--ink)] mb-2">
                      Message<span className="text-red-400 ml-0.5">*</span>
                    </span>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="I want to discuss..."
                      aria-invalid={!!errors.message}
                      className={`w-full bg-transparent border-b py-3 text-sm outline-none transition-colors resize-none placeholder:text-[var(--ink)]/40 ${errors.message ? "border-red-400" : "border-black/10 focus:border-[var(--brand)]"}`}
                    />
                    {errors.message && (
                      <span className="absolute -bottom-5 left-0 text-xs text-red-500">{errors.message}</span>
                    )}
                  </label>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] text-white px-8 py-4 text-sm font-medium transition-transform duration-200 hover:scale-110 active:scale-95 disabled:opacity-60"
                    >
                      {submitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          Submit <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </Reveal>

          {/* FAQs */}
          <div>
            <Reveal>
              <div className="flex items-center gap-2 mb-10">
                <div className="h-2 w-2 rounded-full bg-[var(--brand)] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--ink)]/60">
                  Frequently Asked
                </span>
              </div>
            </Reveal>
            <div className="border-t border-black/10">
              {faqs.map((f, i) => {
                const open = openFaq === f.id;
                return (
                  <Reveal key={f.id} delay={i * 0.04}>
                    <div id={`faq-${f.id}`} className="scroll-mt-32">
                      <button
                        onClick={() => {
                          setOpenFaq(open ? null : f.id);
                        }}
                        className="w-full text-left bg-transparent border-b border-black/10 py-6 hover:border-black/30 transition-colors group"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-lg md:text-xl font-medium text-[var(--ink)] transition-colors">
                            {f.q}
                          </span>
                          <div className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--ink)]/60 group-hover:text-[var(--ink)]">
                              <path d="m6 9 6 6 6-6"/>
                            </svg>
                          </div>
                        </div>
                        <div
                          className={`grid transition-[grid-template-rows,opacity] duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                        >
                          <div className="overflow-hidden">
                            <p className="pt-4 text-[var(--ink)]/60 text-sm sm:text-base leading-relaxed pr-8">{f.a}</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </main>
  );
}
