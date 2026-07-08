import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { MapPin, Truck, Quote, Snowflake, Package, Clock, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Reveal, PageHero, SectionLabel } from "@/components/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners & Network - Favored PLC" },
      {
        name: "description",
        content:
          "Manufacturers we represent, hospitals we serve, and the network that connects them.",
      },
      { property: "og:title", content: "Partners - Favored PLC" },
      {
        property: "og:description",
        content: "Global manufacturers, regional distribution, local impact.",
      },
      { property: "og:url", content: "/partners" },
    ],
    links: [{ rel: "canonical", href: "/partners" }],
  }),
  component: Partners,
});

const manufacturers = [
  "PharmaCorp",
  "MediGlobal",
  "LabTech",
  "VitaCare",
  "HealthSys",
  "BioGen",
  "CureMed",
  "NovaPharm",
  "ClinIQ",
  "OrthoMax",
  "ZenithRx",
  "AlphaMed",
];

type Hub = {
  city: string;
  units: string;
  x: string;
  y: string;
  region: string;
  lead: string;
  coldChain: boolean;
};
const hubs: Hub[] = [
  {
    city: "Addis Ababa",
    units: "4,210",
    x: "20%",
    y: "35%",
    region: "Central HQ",
    lead: "12h",
    coldChain: true,
  },
  {
    city: "Bahir Dar",
    units: "1,840",
    x: "42%",
    y: "22%",
    region: "Amhara",
    lead: "28h",
    coldChain: true,
  },
  {
    city: "Mekelle",
    units: "2,150",
    x: "62%",
    y: "18%",
    region: "Tigray",
    lead: "34h",
    coldChain: true,
  },
  {
    city: "Hawassa",
    units: "1,520",
    x: "35%",
    y: "62%",
    region: "Sidama",
    lead: "22h",
    coldChain: false,
  },
  {
    city: "Dire Dawa",
    units: "1,980",
    x: "72%",
    y: "48%",
    region: "East",
    lead: "26h",
    coldChain: true,
  },
  {
    city: "Jimma",
    units: "1,140",
    x: "15%",
    y: "70%",
    region: "Oromia SW",
    lead: "30h",
    coldChain: false,
  },
];

const reviews = [
  {
    q: "Favored has been our most dependable partner. Their cold chain is flawless and documentation arrives before the shipment does.",
    a: "Dr. Amani Reta",
    r: "Procurement Director, Tikur Anbessa",
  },
  {
    q: "We rely on Favored for over 60% of our pharmacy inventory. In five years we have never had a stock-out on essentials.",
    a: "Samuel B.",
    r: "Owner, Bethel Pharmacy Chain",
  },
  {
    q: "The breadth of their catalog is matched only by the consistency of their service. A true institutional partner.",
    a: "Helen Mengistu",
    r: "Hospital Administrator",
  },
  {
    q: "Their compliance team made our last regulatory audit painless. Every batch traceable, every certificate ready.",
    a: "Yonas K.",
    r: "QA Manager, Regional Lab",
  },
];

function Partners() {
  return (
    <main className="bg-white text-[var(--ink)] overflow-x-hidden">
      <section className="bg-white pt-28 sm:pt-40 px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <h2 
            className="font-display text-[1.75rem] sm:text-[2.75rem] lg:text-[3.75rem] leading-[1.05] font-medium text-[#26221f] mb-6"
            style={{ letterSpacing: "-0.04em" }}
          >
            Global makers. <span className="text-[var(--brand)]">Local impact.</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--ink)]/70 max-w-2xl mx-auto font-medium leading-relaxed">
            The world's most trusted manufacturers, connected to the country's most demanding healthcare institutions through a logistics network that does not sleep.
          </p>
        </div>
        
        <div className="w-full max-w-[1440px] mx-auto rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden bg-black/5 relative">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-[50vh] sm:h-[70vh] lg:h-[80vh] object-cover"
          >
            <source src="https://www.pexels.com/download/video/8851864/" type="video/mp4" />
          </video>
        </div>
      </section>

      <ManufacturerMarquee />
      <NetworkMap />
      <ParallaxReviews />
    </main>
  );
}

const MARQUEE_TINTS = [
  "from-emerald-50 to-white",
  "from-amber-50 to-white",
  "from-sky-50 to-white",
  "from-rose-50 to-white",
  "from-violet-50 to-white",
  "from-teal-50 to-white",
];

function ManufacturerMarquee() {
  const [paused, setPaused] = useState(false);
  const rowA = manufacturers;
  const rowB = [...manufacturers].reverse();

  const Row = ({
    items,
    dir = 1,
    speed = 40,
  }: {
    items: string[];
    dir?: 1 | -1;
    speed?: number;
  }) => (
    <div className="relative overflow-hidden py-3 group/marquee">
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: dir === 1 ? "normal" : "reverse",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {[...items, ...items, ...items].map((p, i) => (
          <div
            key={`${p}-${i}`}
            className={`shrink-0 min-w-[200px] sm:min-w-[240px] rounded-2xl border border-black/5 bg-gradient-to-br ${MARQUEE_TINTS[i % MARQUEE_TINTS.length]} px-7 py-6 grid place-items-center shadow-[0_1px_0_rgba(0,0,0,0.02)] hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]`}
          >
            <span className="font-display text-xl sm:text-2xl tracking-tight text-[var(--ink)]/55 group-hover/marquee:text-[var(--ink)]/70 transition-colors hover:!text-[var(--brand)]">
              {p}
            </span>
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--mist)] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--mist)] to-transparent"
      />
    </div>
  );

  return (
    <section
      className="py-20 sm:py-28 bg-[var(--mist)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <Reveal className="mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <SectionLabel>Manufacturers</SectionLabel>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl max-w-2xl leading-[1.05]">
              Tier-1 makers, <span className="text-[var(--brand)]">continuously in motion.</span>
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ink)]/50">
            <Sparkles className="h-3 w-3 text-[var(--brand)]" />
            Hover to pause
          </div>
        </Reveal>
        <div className="rounded-[28px] border border-black/5 bg-white/40 backdrop-blur-sm p-3 sm:p-4">
          <Row items={rowA} dir={1} speed={42} />
          <Row items={rowB} dir={-1} speed={52} />
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.3333%) } }`}</style>
    </section>
  );
}

const REVIEW_TINTS = [
  {
    bg: "linear-gradient(135deg,#ECFDF5 0%,#FFFFFF 60%)",
    chip: "bg-emerald-100 text-emerald-700",
    accent: "#00A651",
  },
  {
    bg: "linear-gradient(135deg,#FEF3C7 0%,#FFFFFF 60%)",
    chip: "bg-amber-100 text-amber-700",
    accent: "#D97706",
  },
  {
    bg: "linear-gradient(135deg,#E0F2FE 0%,#FFFFFF 60%)",
    chip: "bg-sky-100 text-sky-700",
    accent: "#0284C7",
  },
  {
    bg: "linear-gradient(135deg,#FCE7F3 0%,#FFFFFF 60%)",
    chip: "bg-rose-100 text-rose-700",
    accent: "#DB2777",
  },
];

function ParallaxReviewCard({ r, i }: { r: (typeof reviews)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const tint = REVIEW_TINTS[i % REVIEW_TINTS.length];

  useGSAP(
    () => {
      if (!ref.current) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.fromTo(
        ref.current,
        { y: 40, rotate: i % 2 ? -1.2 : 1.2 },
        {
          y: -40,
          rotate: i % 2 ? 1.2 : -1.2,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="will-change-transform">
      <div
        className="rounded-3xl border border-black/5 p-8 sm:p-10 h-full shadow-[0_1px_0_rgba(0,0,0,0.03)] hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
        style={{ background: tint.bg }}
      >
        <div
          aria-hidden
          className="absolute -right-16 -top-16 w-56 h-56 rounded-full opacity-50 blur-3xl"
          style={{ background: `radial-gradient(circle, ${tint.accent}33, transparent 70%)` }}
        />
        <div className="relative">
          <Quote className="h-6 w-6" style={{ color: tint.accent }} />
          <p className="mt-6 font-display text-xl sm:text-2xl text-[var(--ink)] leading-[1.15] [text-wrap:balance]">
            {r.q}
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-full grid place-items-center font-semibold ${tint.chip}`}
            >
              {r.a[0]}
            </div>
            <div>
              <div className="text-sm font-semibold text-[var(--ink)]">{r.a}</div>
              <div className="text-xs text-[var(--ink)]/60">{r.r}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ParallaxReviews() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-white to-[var(--mist)] overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl mb-16">
          <SectionLabel>What Partners Say</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl [text-wrap:balance]">
            Trusted by people who <span className="text-[var(--brand)]">can't afford</span> to be
            let down.
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {reviews.map((r, i) => (
            <ParallaxReviewCard key={r.a} r={r} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NetworkMap() {
  const [selected, setSelected] = useState<Hub>(hubs[0]);
  const ref = useRef<HTMLDivElement>(null);
  const stats = [
    { i: Package, k: selected.units, v: "Units / 90d" },
    { i: Clock, k: selected.lead, v: "Avg lead time" },
    { i: Snowflake, k: selected.coldChain ? "Yes" : "Standard", v: "Cold chain" },
  ];

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ".gsap-network-path",
        { strokeDashoffset: 1, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 72%", once: true },
        },
      );
      gsap.fromTo(
        ".gsap-network-node",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          stagger: 0.08,
          delay: 0.25,
          ease: "back.out(1.8)",
          scrollTrigger: { trigger: ref.current, start: "top 72%", once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl mb-12 flex flex-col gap-4">
          <SectionLabel>Interactive Network</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl">
            Six hubs. Fourteen warehouses.{" "}
            <span className="text-[var(--brand)]">Click any node.</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 relative rounded-[32px] bg-gradient-to-br from-[var(--mist)] via-white to-[var(--brand)]/5 border border-black/5 p-4 sm:p-6">
            <div className="relative h-[420px] sm:h-[560px] rounded-3xl bg-white/60 border border-black/5 overflow-hidden">
              <svg className="absolute inset-0 w-full h-full opacity-50">
                <defs>
                  <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="rgba(49,78,74,0.08)"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid2)" />
              </svg>
              <svg
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <defs>
                  <linearGradient id="brand-line" x1="0" x2="1">
                    <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="var(--brand)" stopOpacity="0.15" />
                  </linearGradient>
                </defs>
                {hubs.slice(1).map((h) => {
                  const x1 = 20,
                    y1 = 35;
                  const x2 = parseFloat(h.x),
                    y2 = parseFloat(h.y);
                  const mx = (x1 + x2) / 2;
                  const my = (y1 + y2) / 2 - 10;
                  const isSel = selected.city === h.city;
                  return (
                    <path
                      key={h.city}
                      className="gsap-network-path"
                      d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
                      stroke={isSel ? "var(--brand)" : "url(#brand-line)"}
                      strokeWidth={isSel ? 0.45 : 0.25}
                      strokeDasharray={isSel ? "0" : "1 1.2"}
                      fill="none"
                    />
                  );
                })}
              </svg>

              {hubs.map((h) => {
                const isSel = selected.city === h.city;
                return (
                  <button
                    key={h.city}
                    type="button"
                    onClick={() => setSelected(h)}
                    style={{ left: h.x, top: h.y }}
                    className="gsap-network-node absolute -translate-x-1/2 -translate-y-1/2 outline-none transition-transform hover:scale-110"
                  >
                    <span className="relative block">
                      {isSel && (
                        <span className="absolute -inset-3 rounded-full bg-[var(--brand)]/20 animate-ping" />
                      )}
                      <span
                        className={`relative block rounded-full ring-4 ring-white transition-all ${isSel ? "h-4 w-4 bg-[var(--brand)] shadow-[0_0_0_4px_rgba(0,166,81,0.25)]" : "h-3 w-3 bg-[var(--brand)]/80"}`}
                      />
                    </span>
                    <span
                      className={`absolute left-5 -top-1 glass rounded-xl px-2.5 py-1 shadow-[var(--shadow-card)] whitespace-nowrap transition-opacity ${isSel ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
                    >
                      <span className="block text-[10px] font-mono text-[var(--ink)]/60">
                        {h.city}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[32px] glass border border-black/5 p-7 shadow-[var(--shadow-card)] h-full flex flex-col transition-all duration-300">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--brand)]">
                <MapPin className="h-3 w-3" /> {selected.region}
              </div>
              <h3 className="mt-3 font-display text-4xl text-[var(--ink)] leading-none">
                {selected.city}
              </h3>
              <p className="mt-2 text-sm text-[var(--ink)]/60">
                Distribution hub serving the surrounding region with daily dispatch and validated
                cold-chain handling.
              </p>
              <div className="mt-6 space-y-3">
                {stats.map((s) => (
                  <div
                    key={s.v}
                    className="flex items-center justify-between rounded-2xl bg-white/70 border border-black/5 px-4 py-3"
                  >
                    <div className="flex items-center gap-2 text-xs text-[var(--ink)]/60">
                      <s.i className="h-3.5 w-3.5 text-[var(--brand)]" />
                      {s.v}
                    </div>
                    <div className="font-display text-xl text-[var(--ink)]">{s.k}</div>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-6">
                <div className="flex items-center gap-2 text-xs text-[var(--ink)]/60">
                  <Truck className="h-4 w-4 text-[var(--brand)]" />
                  <span>Live dispatch - 96.4% on-time (90d)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            ["6", "Regional Hubs"],
            ["14", "Warehouses"],
            ["48hrs", "Avg. Delivery"],
            ["24/7", "Dispatch"],
          ].map(([k, v]) => (
            <div key={v} className="rounded-2xl bg-[var(--mist)] border border-black/5 p-4">
              <div className="font-display text-xl sm:text-2xl text-[var(--ink)]">{k}</div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ink)]/60 mt-1">
                {v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
