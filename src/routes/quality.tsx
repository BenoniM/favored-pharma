import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  BadgeCheck,
  ShieldCheck,
  ClipboardCheck,
  Microscope,
  Snowflake,
  FileCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Reveal, PageHero, SectionLabel } from "@/components/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

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
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=1600",
  },
  {
    t: "Regulatory Compliance",
    d: "Aligned with local authority requirements and international best practice.",
    i: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1600",
  },
  {
    t: "Batch Tracking",
    d: "Lot-level traceability from manufacturer to dispensary shelf.",
    i: ClipboardCheck,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600",
  },
  {
    t: "Quality Assurance",
    d: "Independent QA at intake and dispatch. Reject rate published quarterly.",
    i: Microscope,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1600",
  },
  {
    t: "Cold Chain Logistics",
    d: "Validated 2-8C storage and transport with continuous temperature logging.",
    i: Snowflake,
    image:
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=1600",
  },
  {
    t: "Reliable Documentation",
    d: "CoA, CoO, and import certificates available on demand for every lot.",
    i: FileCheck,
    image:
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1600",
  },
];

const certs = [
  ["WHO-GMP", "Manufacturing Standards"],
  ["ISO 9001:2015", "Quality Management"],
  ["GDP Certified", "Good Distribution Practice"],
  ["ISO 13485", "Medical Devices QMS"],
];

// ─────────────────────────────────────────────────────────────────────────────
// Quality Stats Marquee (mirrors index's StatsMarquee)
// ─────────────────────────────────────────────────────────────────────────────
function QualityStatsMarquee() {
  const items = [
    "100% DOCUMENTED BATCHES",
    "0.04% REJECT RATE (Q3)",
    "96.4% ON-TIME DELIVERY",
    "24/7 COLD CHAIN MONITORING",
  ];
  return (
    <section className=" bg-white overflow-hidden">
      <div className="flex marquee gap-24 whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <div
            key={i}
            className="flex items-center text-sm sm:text-base font-semibold text-gray-400 tracking-tight"
          >
            <span>{t}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Certifications Tabs
// ─────────────────────────────────────────────────────────────────────────────
function CertificationsTabs() {
  const [active, setActive] = useState(0);

  const certs = [
    {
      name: "WHO-GMP",
      label: "Manufacturing Standards",
      body: "Every partnered manufacturer operates under World Health Organization Good Manufacturing Practice guidelines, audited annually against current pharmacopoeial standards.",
    },
    {
      name: "ISO 9001:2015",
      label: "Quality Management",
      body: "Our quality management system is independently certified to ISO 9001, covering intake, storage, and dispatch across every warehouse we operate.",
    },
    {
      name: "GDP Certified",
      label: "Good Distribution Practice",
      body: "Good Distribution Practice certification confirms that medicines retain their quality throughout the supply chain, from receipt to final delivery.",
    },
    {
      name: "ISO 13485",
      label: "Medical Devices QMS",
      body: "Devices move through a dedicated quality management system built to ISO 13485, the international standard specific to medical device handling.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <style>{`
        @keyframes lineRise {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .line-mask { overflow: hidden; display: block; }
        .line-inner {
          display: block;
          animation: lineRise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        <Reveal className="text-left mb-12">
          <SectionLabel>Certifications</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">
            Audited. Verified. Renewed.
          </h2>
        </Reveal>

        <Reveal className="w-full max-w-[1500px] mx-auto rounded-[2rem] sm:rounded-[2.5rem] bg-white border border-black/5 overflow-hidden">
          {/* Tab bar */}
          <div className="flex flex-wrap border-b border-black/5">
            {certs.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.name}
                  onClick={() => setActive(i)}
                  className={`relative flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-5 text-sm sm:text-base font-medium transition-colors ${
                    isActive
                      ? "bg-[#EAF6EF] text-[var(--ink)]"
                      : "bg-primary text-white/70 hover:text-white"
                  } ${i !== 0 ? "border-l border-black/5" : ""}`}
                >
                  <span
                    className={`h-2 w-2 rounded-full transition-colors ${
                      isActive ? "bg-[var(--brand)]" : "bg-white/50"
                    }`}
                  />
                  N&deg;{String(i + 1).padStart(2, "0")}
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div className="px-8 sm:px-14 py-16 sm:py-24 bg-[#EAF6EF] min-h-[420px] flex flex-col justify-center overflow-hidden">
            <div key={active} className="max-w-2xl">
              <span className="line-mask pb-4 mb-8 border-b border-black/50 w-fit">
                <span
                  className="line-inner text-sm font-semibold text-[var(--ink)]"
                  style={{ animationDelay: "0ms" }}
                >
                  {certs[active].label}
                </span>
              </span>

              <span className="line-mask mb-6">
                <span
                  className="line-inner font-display text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1] text-[var(--ink)]"
                  style={{ animationDelay: "120ms" }}
                >
                  {certs[active].name}
                </span>
              </span>

              <span className="line-mask">
                <span
                  className="line-inner text-base sm:text-lg text-[var(--ink)]/65 leading-relaxed"
                  style={{ animationDelay: "240ms" }}
                >
                  {certs[active].body}
                </span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Six Standards Showcase — full-bleed image w/ floating card, click to swap
// ─────────────────────────────────────────────────────────────────────────────
function StandardsShowcase() {
  const [active, setActive] = useState(0);
  const current = standards[active];

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        <Reveal className="max-w-3xl mb-16">
          <SectionLabel>Six Standards</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">
            Non-negotiable, every shipment.
          </h2>
        </Reveal>

        <Reveal>
          <div className="relative w-full h-[560px] sm:h-[640px] lg:h-[680px] rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-black">
            {/* Background image */}
            <img
              key={current.image}
              src={current.image}
              alt={current.t}
              className="absolute inset-0 h-full w-full object-cover animate-in fade-in duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />

            {/* Floating card */}
            <div className="absolute top-4 left-4 bottom-4 sm:top-6 sm:left-6 sm:bottom-6 w-[86%] xs:w-[75%] sm:w-[340px] lg:w-[380px] rounded-[1.5rem] sm:rounded-[2rem] bg-[var(--mist,#F4F1EC)] p-6 sm:p-8 flex flex-col">
              <h3 className="font-display text-2xl sm:text-[1.75rem] leading-[1.1] text-[var(--ink)] mb-3">
                {current.t}
              </h3>
              <p className="text-sm text-[var(--ink)]/60 leading-relaxed">
                {current.d}
              </p>

              <div className="flex-1 min-h-16 sm:min-h-24" />

              <div className="flex flex-col gap-3">
                {standards.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={s.t}
                      onClick={() => setActive(i)}
                      className={`w-full text-left rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
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
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 font-mono text-xs text-white/70">
              0{active + 1} / 0{standards.length}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Quality() {
  return (
    <main className="bg-white text-[var(--ink)] overflow-x-hidden">
      <section className="bg-white pt-28 sm:pt-40 px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center pb-16">
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <h2 
            className="font-display text-[1.75rem] sm:text-[2.75rem] lg:text-[3.75rem] leading-[1.05] font-medium text-[#26221f] mb-6"
            style={{ letterSpacing: "-0.04em" }}
          >
            Zero margin for error when <span className="text-[var(--brand)]">the stakes are highest.</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--ink)]/70 max-w-2xl mx-auto font-medium leading-relaxed">
            When it comes to early-stage development and critical care, a supply chain is only as strong as its weakest checkpoint. Every shipment of life-saving medicine passes through a strictly documented and independently verified process.
          </p>
        </div>
        
        <div className="w-full max-w-[1440px] mx-auto rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden bg-black/5 relative">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-[30vh] sm:h-[70vh] lg:h-[80vh] object-cover"
          >
            <source src="https://www.pexels.com/download/video/7033928/" type="video/mp4" />
          </video>
        </div>
      </section>

      <QualityStatsMarquee />

      <StandardsShowcase />

      <CertificationsTabs />

      <ScrollProcess />
    </main>
  );
}

const STEPS = [
  {
    t: "Source",
    d: "Vetted manufacturers, audited annually.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200",
  },
  {
    t: "Inspect",
    d: "Visual + documentary QA at intake.",
    image: "https://images.pexels.com/photos/37121460/pexels-photo-37121460.jpeg",
  },
  {
    t: "Document",
    d: "CoA, CoO, lot record - no exceptions.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200",
  },
  {
    t: "Store",
    d: "Climate-zoned, 24/7 monitored warehouses.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    t: "Pick",
    d: "Barcoded, double-verified per order.",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=1200",
  },
  {
    t: "Pack",
    d: "Validated cold-chain packaging.",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=1200",
  },
  {
    t: "Ship",
    d: "Tracked, temperature-logged delivery.",
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1200",
  },
];

function ScrollProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const activeStepRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const setStep = (nextStep: number) => {
        const clampedStep = Math.max(0, Math.min(STEPS.length - 1, nextStep));
        if (activeStepRef.current === clampedStep) return;
        activeStepRef.current = clampedStep;
        setActiveStep(clampedStep);
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        start: "top top",
        end: `+=${STEPS.length * 100}%`,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        onUpdate: (self) => {
          setStep(Math.round(self.progress * (STEPS.length - 1)));
        },
        onLeave: () => {
          setStep(STEPS.length - 1);
        },
        onEnterBack: () => {
          setStep(STEPS.length - 1);
        },
        onLeaveBack: () => {
          setStep(0);
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-white text-[var(--ink)]"
    >
      <div className="absolute inset-x-0 top-4 sm:top-8 bottom-4 sm:bottom-12 lg:bottom-[22vh] mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="grid h-full items-start gap-4 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.92fr)] lg:grid-rows-[auto_minmax(0,1fr)] lg:gap-x-28 lg:gap-y-0 xl:gap-x-36">
          <Reveal className="w-full lg:col-start-1 lg:row-start-1">
            <div className="max-w-3xl">
              <SectionLabel>QA Process</SectionLabel>
              <h2 className="mt-2 sm:mt-4 font-display text-[1.65rem] sm:text-4xl leading-tight">
                Seven checkpoints, zero shortcuts.
              </h2>
              <p className="mt-2 sm:mt-6 max-w-xl text-xs sm:text-base leading-relaxed text-[var(--ink)]/65">
                A scroll-linked diagram of the path every shipment takes, from manufacturer
                agreement to client dock.
              </p>
            </div>
          </Reveal>

          <Reveal className="w-full lg:col-start-1 lg:row-start-2 lg:h-full">
            <ol className="relative mt-4 sm:mt-7 space-y-2 sm:space-y-[1.125rem] lg:flex lg:h-full lg:flex-col lg:justify-between lg:gap-2.5 lg:space-y-0">
              <span
                aria-hidden
                className="absolute left-5 z-20 hidden h-3 w-3 rounded-full bg-[var(--brand)] shadow-[0_10px_24px_rgba(1,133,65,0.28)] transition-[top,transform] duration-300 ease-[cubic-bezier(.18,.89,.32,1.28)] sm:left-9 sm:block"
                style={{
                  top: `calc(${(activeStep / (STEPS.length - 1)) * 100}%)`,
                  transform: "translateY(calc(-50% + 12px))",
                }}
              />
              {STEPS.map((step, index) => {
                const isActive = index === activeStep;

                return (
                  <li
                    key={step.t}
                    className={`grid gap-x-5 transition-[grid-template-columns,transform,opacity] duration-500 ease-out sm:gap-x-6 ${
                      isActive
                        ? "grid-cols-[32px_28px_1fr] translate-x-1 sm:grid-cols-[48px_32px_1fr] sm:translate-x-2"
                        : "grid-cols-[32px_1fr] translate-x-0 sm:grid-cols-[48px_1fr]"
                    }`}
                  >
                    <div className="flex items-start justify-end gap-3 pt-1 sm:gap-4">
                      {!isActive && (
                        <span
                          className="font-mono text-sm leading-none text-[var(--ink)]/24 transition-colors duration-300"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      )}
                    </div>

                    {isActive && (
                      <span
                        className="pt-1 font-mono text-sm leading-none text-[var(--ink)]/65 transition-colors duration-300"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}

                    <div
                      className={`transition-[color,transform] duration-500 ease-out ${
                        isActive
                          ? "translate-x-0 text-[var(--ink)]"
                          : "translate-x-0 text-[var(--ink)]/30"
                      }`}
                    >
                      <h3
                        className={`font-display text-lg leading-[1.05] sm:text-xl lg:text-[1.45rem] ${
                          isActive ? "font-medium" : ""
                        }`}
                      >
                        {step.t}.
                      </h3>
                      <p
                        className={`mt-2 max-w-[520px] text-xs leading-relaxed ${
                          isActive ? "text-[var(--ink)]/62" : "text-[var(--ink)]/25"
                        }`}
                      >
                        {step.d}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <Reveal delay={0.1} className="w-full justify-self-end lg:col-start-2 lg:row-start-2 lg:h-full">
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-card)] lg:h-full">
              <img
                key={STEPS[activeStep].image}
                src={STEPS[activeStep].image}
                alt={`${STEPS[activeStep].t} quality assurance process`}
                className="h-[22vh] w-full animate-in fade-in zoom-in-[1.02] object-cover object-center duration-500 sm:h-[40vh] lg:h-full"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}