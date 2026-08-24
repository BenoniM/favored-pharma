import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, FileCheck2, ShieldCheck } from "lucide-react";
import { Reveal, SectionLabel } from "@/components/site";
import qualityHero from "@/assets/hero-img/141e1c02-19e2-44f2-9041-a2d665dffe4e.png";

export const Route = createFileRoute("/quality")({
  head: () => ({
    meta: [
      { title: "Quality & Compliance - Favored PLC" },
      {
        name: "description",
        content:
          "Favored PLC's EFDA compliance approach and product-level WHO-GMP and ISO 13485 documentation.",
      },
      { property: "og:title", content: "Quality & Compliance - Favored PLC" },
      {
        property: "og:description",
        content: "Clear separation between company compliance and product certifications.",
      },
      { property: "og:url", content: "/quality" },
    ],
    links: [{ rel: "canonical", href: "/quality" }],
  }),
  component: Quality,
});

const claims = [
  {
    label: "Favored PLC",
    title: "EFDA compliance",
    body: "Favored's importing and distribution activities are managed in line with the applicable requirements of the Ethiopian Food and Drug Authority.",
    note: "Company operating compliance",
    icon: ShieldCheck,
  },
  {
    label: "Pharmaceutical products",
    title: "WHO-GMP certified products",
    body: "WHO-GMP is used only for products supplied by manufacturers whose current documentation supports that claim.",
    note: "Manufacturer or product credential",
    icon: BadgeCheck,
  },
  {
    label: "Medical devices",
    title: "ISO 13485 certified products",
    body: "ISO 13485 is used only where the relevant medical-device manufacturer or product documentation supports it.",
    note: "Manufacturer or product credential",
    icon: FileCheck2,
  },
];

const standards = [
  {
    t: "Certified Suppliers",
    d: "Vetted, audited, and continuously monitored against EFDA standards.",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=1600",
  },
  {
    t: "Regulatory Compliance",
    d: "Aligned with local authority requirements and international best practice.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1600",
  },
  {
    t: "Quality Assurance",
    d: "Independent QA at intake and dispatch. Reject rate published quarterly.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1600",
  },
  {
    t: "Reliable Documentation",
    d: "CoA, CoO, and import certificates available on demand for every lot.",
    image:
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1600",
  },
];

const qaSteps = [
  {
    t: "Source",
    d: "Vetted manufacturers, audited annually.",
  },
  {
    t: "Inspect",
    d: "Visual + documentary QA at intake.",
  },
  {
    t: "Document",
    d: "CoA, CoO, lot record — no exceptions.",
  },
  {
    t: "Store",
    d: "Climate-zoned, 24/7 monitored warehouses.",
  },
  {
    t: "Pick",
    d: "Barcoded, double-verified per order.",
  },
  {
    t: "Pack",
    d: "Validated cold-chain packaging.",
  },
  {
    t: "Ship",
    d: "Tracked, temperature-logged delivery.",
  },
];

function StandardsShowcase() {
  const [active, setActive] = useState(0);
  const current = standards[active];

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <Reveal className="mb-16 max-w-3xl">
          <SectionLabel>Standards</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">
            Non-negotiable, every shipment.
          </h2>
        </Reveal>

        <Reveal>
          <div className="relative h-[560px] w-full overflow-hidden rounded-[2rem] bg-black sm:h-[640px] sm:rounded-[3rem] lg:h-[680px]">
            {/* Background image */}
            <img
              key={current.image}
              src={current.image}
              alt={current.t}
              className="absolute inset-0 h-full w-full animate-in fade-in object-cover duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />

            {/* Floating card */}
            <div className="absolute bottom-4 left-4 top-4 flex w-[86%] flex-col justify-between rounded-[1.5rem] bg-[var(--mist,#F4F1EC)] p-6 sm:bottom-6 sm:left-6 sm:top-6 sm:w-[340px] sm:rounded-[2rem] sm:p-8 xs:w-[75%] lg:w-[380px]">
              <div>
                <h3 className="mb-3 font-display text-2xl leading-[1.1] text-[var(--ink)] sm:text-[1.75rem]">
                  {current.t}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--ink)]/60">
                  {current.d}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {standards.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={s.t}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className={`w-full rounded-full px-5 py-2.5 text-left text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-[var(--brand)] text-white"
                          : "bg-black/[0.04] text-[var(--ink)]/50 hover:bg-black/[0.07] hover:text-[var(--ink)]/70"
                      }`}
                    >
                      {s.t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Index badge, bottom right */}
            <div className="absolute bottom-6 right-6 font-mono text-xs text-white/70 sm:bottom-8 sm:right-8">
              0{active + 1} / 0{standards.length}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function QAProcessSection() {
  return (
    <section className="bg-[#082923] py-24 text-white sm:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 sm:px-8 lg:grid-cols-12 lg:px-12">
        <Reveal className="lg:col-span-5">
          <SectionLabel>QA Process</SectionLabel>
          <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
            Seven checkpoints, zero shortcuts.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
            A defined path every shipment takes, from manufacturer agreement to client dock.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-7">
          <div className="space-y-5">
            {qaSteps.map((step, index) => (
              <div key={step.t} className="flex gap-4 border-b border-white/10 pb-5">
                <span className="font-mono text-xs text-[var(--brand)]">0{index + 1}</span>
                <div>
                  <h3 className="font-display text-lg font-medium text-white sm:text-xl">
                    {step.t}
                  </h3>
                  <p className="mt-1 text-base leading-relaxed text-white/70">
                    {step.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Quality() {
  return (
    <main className="overflow-x-hidden bg-white text-[var(--ink)]">
      <section className="flex flex-col items-center bg-white px-6 pb-16 pt-28 text-center sm:px-8 sm:pt-40 lg:px-12">
        <div className="mx-auto mb-12 max-w-4xl sm:mb-16">
          <h1
            className="mb-6 font-display text-[1.75rem] font-medium leading-[1.05] text-[#26221f] sm:text-[2.75rem] lg:text-[3.75rem]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Specific claims. <span className="text-[var(--brand)]">Supporting records.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-[var(--ink)]/70 sm:text-lg">
            Favored's compliance and supplier-product certifications are different things. We
            present each one clearly.
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[2rem] bg-[#E6F6ED] sm:rounded-[3.5rem]">
          <img
            src={qualityHero}
            alt="Quality & Compliance"
            className="h-[30vh] w-full object-contain sm:h-[70vh] lg:h-[80vh]"
          />
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <Reveal className="max-w-3xl">
            <SectionLabel>What we state</SectionLabel>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
              Three claims, with the owner of each claim made clear.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {claims.map(({ label, title, body, note, icon: Icon }, index) => (
              <Reveal key={title} delay={index * 0.05}>
                <article className="flex h-full flex-col rounded-[2rem] border border-black/5 bg-[var(--mist)] p-8">
                  <div className="flex items-center justify-between gap-4">
                    <Icon className="h-7 w-7 text-[var(--brand)]" strokeWidth={1.5} />
                    <span className="rounded-full bg-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.16em] text-[var(--ink)]/55">
                      {label}
                    </span>
                  </div>
                  <h2 className="mt-14 font-display text-3xl">{title}</h2>
                  <p className="mt-5 flex-1 leading-relaxed text-[var(--ink)]/65">{body}</p>
                  <p className="mt-8 border-t border-black/10 pt-5 text-xs font-semibold uppercase tracking-[.12em] text-[var(--brand)]">
                    {note}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StandardsShowcase />

      <QAProcessSection />

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <Reveal className="rounded-[2.5rem] bg-[var(--mist)] p-8 sm:p-14 lg:flex lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-3xl">
              <SectionLabel>Procurement support</SectionLabel>
              <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
                Need to review a product's documentation?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[var(--ink)]/65">
                Send the product name, pack details, and your organization. Our team
                will confirm availability and share the applicable documentation.
              </p>
            </div>
            <Link
              to="/contact"
              className="mt-8 inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--brand)] px-7 py-3.5 text-sm font-semibold text-white lg:mt-0"
            >
              Start an inquiry <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
