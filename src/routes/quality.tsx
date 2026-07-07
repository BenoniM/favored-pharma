import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BadgeCheck, ShieldCheck, ClipboardCheck, Microscope, Snowflake, FileCheck, ArrowRight } from "lucide-react";
import { Reveal, PageHero, SectionLabel, fadeUp } from "@/components/site";

export const Route = createFileRoute("/quality")({
  head: () => ({
    meta: [
      { title: "Quality & Compliance — Favored PLC" },
      { name: "description", content: "WHO-GMP, ISO 9001, GDP. Every shipment documented, every lot traceable." },
      { property: "og:title", content: "Quality & Compliance — Favored PLC" },
      { property: "og:description", content: "Built on quality, safety, and trust." },
      { property: "og:url", content: "/quality" },
    ],
    links: [{ rel: "canonical", href: "/quality" }],
  }),
  component: Quality,
});

const standards = [
  { t: "Certified Suppliers", d: "Vetted, audited, and continuously monitored against WHO-GMP standards.", i: BadgeCheck },
  { t: "Regulatory Compliance", d: "Aligned with local authority requirements and international best practice.", i: ShieldCheck },
  { t: "Batch Tracking", d: "Lot-level traceability from manufacturer to dispensary shelf.", i: ClipboardCheck },
  { t: "Quality Assurance", d: "Independent QA at intake and dispatch. Reject rate published quarterly.", i: Microscope },
  { t: "Cold Chain Logistics", d: "Validated 2–8°C storage and transport with continuous temperature logging.", i: Snowflake },
  { t: "Reliable Documentation", d: "CoA, CoO, and import certificates available on demand for every lot.", i: FileCheck },
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
        title={<>Built on quality, <span className="text-[var(--brand)]">safety, and trust.</span></>}
        lead="A pharmaceutical supply chain is only as strong as its weakest checkpoint. Every shipment that leaves our warehouses passes through a documented, auditable, and independently verified process."
      />

      {/* Big stats bar */}
      <section className="py-12 bg-[var(--ink)] text-white">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            ["100%", "Documented batches"],
            ["0.04%", "Reject rate (Q3)"],
            ["96.4%", "On-time delivery"],
            ["24/7", "Cold chain monitoring"],
          ].map(([k, v]) => (
            <Reveal key={v}>
              <div className="font-display text-4xl sm:text-6xl text-[var(--brand)]">{k}</div>
              <div className="mt-2 text-xs font-mono uppercase tracking-[0.2em] text-white/60">{v}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Six standards in offset grid */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <Reveal className="max-w-3xl mb-16">
            <SectionLabel>Six Standards</SectionLabel>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl">Non-negotiable, every shipment.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {standards.map((s, i) => (
              <motion.div key={s.t} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} transition={{ delay: i * 0.05 }}
                className={`group relative rounded-3xl p-8 border border-black/5 overflow-hidden ${i % 2 === 0 ? "bg-white" : "bg-[var(--mist)]"} hover:shadow-[var(--shadow-glow)] transition-shadow`}>
                <div className="font-mono text-xs text-[var(--ink)]/40 mb-8">/0{i+1}</div>
                <s.i className="h-10 w-10 text-[var(--brand)]" />
                <h3 className="mt-6 font-display text-2xl">{s.t}</h3>
                <p className="mt-3 text-sm text-[var(--ink)]/65 leading-relaxed">{s.d}</p>
                <div aria-hidden className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[var(--brand)]/5 blur-2xl group-hover:bg-[var(--brand)]/15 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications wall */}
      <section className="py-24 bg-[var(--mist)]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <Reveal className="text-center mb-12">
            <SectionLabel>Certifications</SectionLabel>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl">Audited. Verified. Renewed.</h2>
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


      <section className="py-24 sm:py-32 bg-[var(--ink)] text-white text-center">
        <Reveal className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <h2 className="font-display text-4xl sm:text-6xl">Need our compliance pack?</h2>
          <p className="mt-6 text-white/65">Certificates, audit reports, and validation records — available on request.</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--brand)] text-white px-7 py-4 font-medium hover:bg-white hover:text-[var(--ink)] transition-colors">
            Request documentation <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}

const STEPS = [
  { t: "Source", d: "Vetted manufacturers, audited annually." },
  { t: "Inspect", d: "Visual + documentary QA at intake." },
  { t: "Document", d: "CoA, CoO, lot record — no exceptions." },
  { t: "Store", d: "Climate-zoned, 24/7 monitored warehouses." },
  { t: "Pick", d: "Barcoded, double-verified per order." },
  { t: "Pack", d: "Validated cold-chain packaging." },
  { t: "Ship", d: "Tracked, temperature-logged delivery." },
];

function ScrollProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl mb-16">
          <SectionLabel>QA Process</SectionLabel>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl">Seven checkpoints, zero shortcuts.</h2>
          <p className="mt-6 text-[var(--ink)]/65 max-w-xl">A scroll-linked diagram of the path every shipment takes — from manufacturer agreement to client dock.</p>
        </Reveal>

        <div className="relative">
          {/* Rail */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-[var(--ink)]/10" />
          <motion.div
            style={{ scaleY: lineScale, transformOrigin: "0% 0%" }}
            className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--brand)] via-[var(--brand)] to-transparent"
          />

          <ol className="space-y-10 sm:space-y-14">
            {STEPS.map((s, i) => {
              const start = i / STEPS.length;
              const end = (i + 1) / STEPS.length;
              return <StepRow key={s.t} index={i} step={s} progress={scrollYProgress} start={start} end={end} />;
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function StepRow({ index, step, progress, start, end }: { index: number; step: { t: string; d: string }; progress: any; start: number; end: number }) {
  const opacity = useTransform(progress, [start - 0.05, start + 0.05, end], [0.3, 1, 1]);
  const scale = useTransform(progress, [start - 0.05, start + 0.05], [0.95, 1]);
  return (
    <motion.li style={{ opacity }} className="relative pl-20 sm:pl-28">
      <motion.div
        style={{ scale }}
        className="absolute left-0 top-0 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white border-2 border-[var(--brand)] grid place-items-center font-mono text-xs text-[var(--brand)] shadow-[var(--shadow-card)] z-10"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>
      <div className="rounded-3xl border border-black/5 bg-[var(--mist)] p-6 sm:p-8 hover:shadow-[var(--shadow-card)] transition-shadow">
        <h3 className="font-display text-3xl sm:text-4xl">{step.t}</h3>
        <p className="mt-2 text-[var(--ink)]/65 max-w-lg">{step.d}</p>
      </div>
    </motion.li>
  );
}

