import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import {
  BadgeCheck,
  ShieldCheck,
  ClipboardCheck,
  Microscope,
  Snowflake,
  FileCheck,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Reveal, PageHero, SectionLabel } from "@/components/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const Route = createFileRoute("/quality")({
  head: () => ({
    meta: [
      { title: "Quality & Compliance - Favored PLC" },
      {
        name: "description",
        content: "WHO-GMP, ISO 9001, GDP. Every shipment documented, every lot traceable.",
      },
      { property: "og:title", content: "Quality & Compliance - Favored PLC" },
      { property: "og:description", content: "Built on quality, safety, and trust." },
      { property: "og:url", content: "/quality" },
    ],
    links: [{ rel: "canonical", href: "/quality" }],
  }),
  component: Quality,
});

const standards = [
  {
    t: "Certified Suppliers",
    d: "Vetted, audited, and continuously monitored against WHO-GMP standards.",
    i: BadgeCheck,
  },
  {
    t: "Regulatory Compliance",
    d: "Aligned with local authority requirements and international best practice.",
    i: ShieldCheck,
  },
  {
    t: "Batch Tracking",
    d: "Lot-level traceability from manufacturer to dispensary shelf.",
    i: ClipboardCheck,
  },
  {
    t: "Quality Assurance",
    d: "Independent QA at intake and dispatch. Reject rate published quarterly.",
    i: Microscope,
  },
  {
    t: "Cold Chain Logistics",
    d: "Validated 2-8C storage and transport with continuous temperature logging.",
    i: Snowflake,
  },
  {
    t: "Reliable Documentation",
    d: "CoA, CoO, and import certificates available on demand for every lot.",
    i: FileCheck,
  },
];

const certs = [
  ["WHO-GMP", "Manufacturing Standards"],
  ["ISO 9001:2015", "Quality Management"],
  ["GDP Certified", "Good Distribution Practice"],
  ["ISO 13485", "Medical Devices QMS"],
];

function Quality() {
  return (
    <main className="bg-white text-[var(--ink)] overflow-x-hidden">
      <PageHero
        kicker="Quality & Compliance"
        variant="cross"
        title={
          <>
            Built on quality, <span className="text-[var(--brand)]">safety, and trust.</span>
          </>
        }
        lead="A pharmaceutical supply chain is only as strong as its weakest checkpoint. Every shipment that leaves our warehouses passes through a documented, auditable, and independently verified process."
      />

      <section className="py-12 bg-[var(--ink)] text-white">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            ["100%", "Documented batches"],
            ["0.04%", "Reject rate (Q3)"],
            ["96.4%", "On-time delivery"],
            ["24/7", "Cold chain monitoring"],
          ].map(([k, v]) => (
            <Reveal key={v}>
              <div className="font-display text-3xl sm:text-5xl text-[var(--brand)]">{k}</div>
              <div className="mt-2 text-xs font-mono uppercase tracking-[0.2em] text-white/60">
                {v}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <Reveal className="max-w-3xl mb-16">
            <SectionLabel>Six Standards</SectionLabel>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">
              Non-negotiable, every shipment.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {standards.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.05}>
                <div
                  className={`group relative rounded-3xl p-8 border border-black/5 overflow-hidden ${i % 2 === 0 ? "bg-white" : "bg-[var(--mist)]"} hover:shadow-[var(--shadow-glow)] transition-shadow`}
                >
                  <div className="font-mono text-xs text-[var(--ink)]/40 mb-8">/0{i + 1}</div>
                  <s.i className="h-10 w-10 text-[var(--brand)]" />
                  <h3 className="mt-6 font-display text-2xl">{s.t}</h3>
                  <p className="mt-3 text-sm text-[var(--ink)]/65 leading-relaxed">{s.d}</p>
                  <div
                    aria-hidden
                    className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[var(--brand)]/5 blur-2xl group-hover:bg-[var(--brand)]/15 transition-colors"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--mist)]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <Reveal className="text-center mb-12">
            <SectionLabel>Certifications</SectionLabel>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">Audited. Verified. Renewed.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certs.map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.05}>
                <div className="rounded-3xl bg-white border border-black/5 p-8 aspect-square flex flex-col justify-between">
                  <BadgeCheck className="h-10 w-10 text-[var(--brand)]" />
                  <div>
                    <div className="font-display text-2xl text-[var(--ink)]">{k}</div>
                    <div className="text-xs text-[var(--ink)]/60 mt-2">{v}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollProcess />
    </main>
  );
}

const STEPS = [
  { t: "Source", d: "Vetted manufacturers, audited annually." },
  { t: "Inspect", d: "Visual + documentary QA at intake." },
  { t: "Document", d: "CoA, CoO, lot record - no exceptions." },
  { t: "Store", d: "Climate-zoned, 24/7 monitored warehouses." },
  { t: "Pick", d: "Barcoded, double-verified per order." },
  { t: "Pack", d: "Validated cold-chain packaging." },
  { t: "Ship", d: "Tracked, temperature-logged delivery." },
];

function ScrollProcess() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ".gsap-process-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 20%", scrub: true },
        },
      );
      gsap.fromTo(
        ".gsap-step",
        { opacity: 0.35, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl mb-16">
          <SectionLabel>QA Process</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">
            Seven checkpoints, zero shortcuts.
          </h2>
          <p className="mt-6 text-[var(--ink)]/65 max-w-xl">
            A scroll-linked diagram of the path every shipment takes, from manufacturer agreement to
            client dock.
          </p>
        </Reveal>

        <div className="relative">
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-[var(--ink)]/10" />
          <div className="gsap-process-line absolute left-6 sm:left-8 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-[var(--brand)] via-[var(--brand)] to-transparent" />

          <ol className="space-y-10 sm:space-y-14">
            {STEPS.map((s, i) => (
              <li key={s.t} className="gsap-step relative pl-20 sm:pl-28">
                <div className="absolute left-0 top-0 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white border-2 border-[var(--brand)] grid place-items-center font-mono text-xs text-[var(--brand)] shadow-[var(--shadow-card)] z-10">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="rounded-3xl border border-black/5 bg-[var(--mist)] p-6 sm:p-8 hover:shadow-[var(--shadow-card)] transition-shadow">
                  <h3 className="font-display text-2xl sm:text-3xl">{s.t}</h3>
                  <p className="mt-2 text-[var(--ink)]/65 max-w-lg">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
