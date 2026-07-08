import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import {
  Heart,
  Globe,
  ShieldCheck,
  Sparkles,
  Building2,
  Rocket,
  Stethoscope,
  Snowflake,
  Package,
  Network,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Reveal, PageHero, SectionLabel, AnimatedHeadline } from "@/components/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Favored PLC - Two Decades of Healthcare Distribution" },
      {
        name: "description",
        content:
          "How Favored PLC became one of the most trusted pharmaceutical distributors in the region.",
      },
      { property: "og:title", content: "About Favored PLC" },
      {
        property: "og:description",
        content: "Two decades delivering medicine, equipment, and trust.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const timeline = [
  {
    year: "2004",
    title: "Founded in Addis Ababa",
    body: "Started as a single-warehouse importer of essential medicines.",
    icon: Building2,
    metric: "1",
    metricLabel: "Warehouse",
  },
  {
    year: "2009",
    title: "First regional expansion",
    body: "Opened distribution hubs in Bahir Dar and Hawassa to serve regional hospitals.",
    icon: Network,
    metric: "3",
    metricLabel: "Hubs",
  },
  {
    year: "2014",
    title: "Medical equipment division",
    body: "Began direct distribution agreements with global OEMs.",
    icon: Stethoscope,
    metric: "40+",
    metricLabel: "OEM partners",
  },
  {
    year: "2018",
    title: "WHO-GMP alignment",
    body: "Cold-chain logistics validated. ISO 9001:2015 certification achieved.",
    icon: Snowflake,
    metric: "2-8C",
    metricLabel: "Chain validated",
  },
  {
    year: "2022",
    title: "1,000+ SKU milestone",
    body: "Catalog grows past one thousand medical products in active distribution.",
    icon: Package,
    metric: "1,000+",
    metricLabel: "Products",
  },
  {
    year: "2026",
    title: "Nationwide today",
    body: "Six regional hubs, 500+ healthcare partners, one promise.",
    icon: Rocket,
    metric: "500+",
    metricLabel: "Partners",
  },
];

const values = [
  { icon: Heart, t: "Patient First", d: "Every shipment ends with a human being. We act like it." },
  {
    icon: ShieldCheck,
    t: "Uncompromising Quality",
    d: "We refuse what we wouldn't give our own family.",
  },
  {
    icon: Globe,
    t: "Open Sourcing",
    d: "Full chain-of-custody. Country of origin disclosed for every lot.",
  },
  {
    icon: Sparkles,
    t: "Always Improving",
    d: "We measure ourselves on patient outcomes, not invoices.",
  },
];

const leadership = [
  { name: "A. Mekonnen", role: "Chief Executive", init: "AM" },
  { name: "S. Tadesse", role: "Head of Quality", init: "ST" },
  { name: "Y. Hailu", role: "Chief Operations", init: "YH" },
  { name: "M. Bekele", role: "Regulatory Affairs", init: "MB" },
];

function About() {
  return (
    <main className="bg-white text-[var(--ink)] overflow-x-hidden">
      <section className="bg-white pt-28 sm:pt-40 px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <h2 
            className="font-display text-[1.75rem] sm:text-[2.75rem] lg:text-[3.75rem] leading-[1.05] font-medium text-[#26221f] mb-6"
            style={{ letterSpacing: "-0.04em" }}
          >
            Healthcare is <span className="text-[var(--brand)]">trust</span>, delivered.
          </h2>
          <p className="text-base sm:text-lg text-[var(--ink)]/70 max-w-2xl mx-auto font-medium leading-relaxed">
            For more than twenty years, we have moved medicine across the country with one obsession: the patient on the other end of every box.
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
            <source src="https://www.pexels.com/download/video/7033928/" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="py-24 bg-white px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          {/* Title */}
          <Reveal className="mb-12">
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl text-[var(--ink)]">
              From one warehouse to a national network.
            </h2>
          </Reveal>

          {/* Bento Grid */}
          <div className="grid lg:grid-cols-3 gap-5 min-h-screen">

            {/* ── LEFT COLUMN ── */}
            <div className="flex flex-col gap-4 sm:gap-5">

              {/* TOP-LEFT: 20+ Years — number top / icon mid / tag bottom */}
              <Reveal delay={0.1} className="flex-[3] flex">
                <div className="w-full rounded-[2rem] bg-[var(--mist)] flex flex-col items-center justify-between py-10 px-8 text-center relative overflow-hidden group">
                  {/* Number — top */}
                  <div className="font-display text-[6rem] leading-none text-[var(--ink)] tracking-tighter">
                    20+
                  </div>

                  {/* Icon — middle */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border-2 border-[var(--ink)]/10 bg-white/60 backdrop-blur-sm grid place-items-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-[var(--ink)]">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Pill tag — bottom */}
                  <div className="px-6 py-2.5 rounded-full bg-[var(--ink)] text-white text-sm font-medium tracking-wide">
                    Years of service
                  </div>
                </div>
              </Reveal>

              {/* BOTTOM-LEFT: Video box */}
              <Reveal delay={0.2} className="flex-[2] flex min-h-[260px]">
                <div className="w-full rounded-[2rem] overflow-hidden relative group">
                  <video
                    autoPlay muted loop playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://www.pexels.com/download/video/6130310/"
                  />
                  {/* subtle dark scrim */}
                  <div className="absolute inset-0 bg-[var(--ink)]/20" />
                  {/* pill badge */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                    <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium whitespace-nowrap">
                      Nationwide delivery
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── MIDDLE COLUMN: Our Story ── */}
            <div className="flex flex-col">
              <Reveal className="flex-1 flex" delay={0.3}>
                <div className="w-full rounded-[2rem] bg-[var(--mist)] p-10 sm:p-14 flex flex-col text-center relative overflow-hidden group">
                  {/* Header */}
                  <div className="mx-auto flex flex-col items-center gap-3 mb-10">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[var(--ink)]/60">
                      <path d="M12 2V22M17 5H9.5a3 3 0 0 0 0 6h5a3 3 0 0 1 0 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="font-display text-2xl text-[var(--ink)]">Our Story</div>
                  </div>

                  {/* Body */}
                  <div className="flex-1 flex flex-col justify-center space-y-6 text-[var(--ink)]/75 text-[1.05rem] leading-relaxed">
                    <p>
                      Favored PLC was founded on a simple belief: a healthcare system is only as strong as
                      the supply chain behind it. When a hospital runs out of an essential medicine, the
                      failure is not pharmaceutical — it is logistical.
                    </p>
                    <p>
                      We started with one warehouse, a handful of import licences, and a long list of
                      hospitals that had been let down. Two decades later, we serve over 500 partners
                      across the country, and the principle has not changed.
                    </p>
                  </div>

                  {/* Pull-quote */}
                  <div className="mt-10 pt-10 border-t border-[var(--ink)]/8 relative z-10">
                    <p className="font-display text-[1.65rem] text-[var(--ink)] leading-[1.2]">
                      "We don't sell boxes.<br/>We move outcomes."
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="flex flex-col gap-4 sm:gap-5">

              {/* TOP-RIGHT: Video box */}
              <Reveal delay={0.4} className="flex-[2] flex min-h-[260px]">
                <div className="w-full rounded-[2rem] overflow-hidden relative group">
                  <video
                    autoPlay muted loop playsInline
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    src="https://www.pexels.com/download/video/8851865/"
                  />
                  <div className="absolute inset-0 bg-[var(--ink)]/20" />
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                    <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium whitespace-nowrap">
                      Cold-chain certified
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* BOTTOM-RIGHT: 14 Warehouses — number top / icon mid / tag bottom */}
              <Reveal delay={0.5} className="flex-[3] flex">
                <div className="w-full rounded-[2rem] bg-[var(--mist)] flex flex-col items-center justify-between py-10 px-8 text-center relative overflow-hidden group">

                  {/* Number — top */}
                  <div className="font-display text-[6rem] leading-none text-[var(--ink)] tracking-tighter">
                    14
                  </div>

                  {/* Icon — middle */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border-2 border-[var(--ink)]/10 bg-white/60 backdrop-blur-sm grid place-items-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-[var(--ink)]">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                        <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Pill tag — bottom */}
                  <div className="px-6 py-2.5 rounded-full bg-[var(--ink)] text-white text-sm font-medium tracking-wide">
                    Warehouses nationwide
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      <EditorialTimeline />

      <section className="py-24 bg-[var(--ink)] text-white relative overflow-hidden">
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-30"
          style={{ background: "var(--gradient-glow)" }}
        />
        <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <Reveal className="max-w-3xl mb-16">
            <SectionLabel>Values</SectionLabel>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">Four non-negotiables.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.06}>
                <div className="rounded-3xl glass-dark p-7 h-full hover:bg-white/5 transition-colors">
                  <v.icon className="h-7 w-7 text-[var(--brand)]" />
                  <h3 className="font-display text-2xl mt-6">{v.t}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <Reveal className="max-w-3xl mb-16">
            <SectionLabel>Leadership</SectionLabel>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">
              The people behind the promise.
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {leadership.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.05}>
                <div className="group">
                  <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-[var(--mist)] to-[var(--brand)]/15 border border-black/5 grid place-items-center overflow-hidden relative">
                    <div className="font-display text-7xl sm:text-8xl text-[var(--ink)]/30 group-hover:text-[var(--brand)] transition-colors">
                      {p.init}
                    </div>
                    <div className="absolute inset-x-4 bottom-4 glass rounded-2xl px-4 py-3">
                      <div className="font-display text-lg text-[var(--ink)]">{p.name}</div>
                      <div className="text-xs text-[var(--ink)]/60">{p.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function EditorialTimeline() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.fromTo(
        ".gsap-timeline-line",
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom 30%", scrub: true },
        },
      );

      if (!reduce) {
        gsap.fromTo(
          ".gsap-timeline-word",
          { x: -60 },
          {
            x: 60,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="py-24 sm:py-32 relative overflow-hidden bg-gradient-to-b from-white via-[var(--mist)] to-white"
    >
      <div
        aria-hidden
        className="gsap-timeline-word absolute top-1/2 -translate-y-1/2 left-0 right-0 font-display text-[22vw] leading-none text-[var(--brand)]/[0.05] select-none pointer-events-none whitespace-nowrap"
      >
        SINCE - 2004 - SINCE - 2004
      </div>

      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl mb-20">
          <SectionLabel>Editorial Timeline</SectionLabel>
          <AnimatedHeadline
            text="Two decades, one direction."
            as="h2"
            className="mt-4 font-display text-3xl lg:text-4xl leading-[0.95]"
          />
          <p className="mt-6 text-[var(--ink)]/65 max-w-xl text-lg">
            A short biography of the boxes we've moved, the partners we've earned, and the standards
            we've kept.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-white border border-black/5 px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[var(--brand)] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink)]/60">
              {timeline.length} chapters - scroll to unfold
            </span>
          </div>
        </Reveal>

        <div className="relative">
          <div className="absolute lg:left-1/2 left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--border)] to-transparent lg:-translate-x-px" />
          <div className="gsap-timeline-line absolute lg:left-1/2 left-6 top-0 w-[3px] -translate-x-[1px] rounded-full bg-gradient-to-b from-[var(--brand)] via-[var(--brand)] to-[var(--brand)]/0 shadow-[0_0_20px_var(--brand)]" />

          <ul className="space-y-16 sm:space-y-24">
            {timeline.map((t, i) => {
              const right = i % 2 === 1;
              const Icon = t.icon;
              return (
                <li key={t.year} className="relative">
                  <Reveal className="absolute lg:left-1/2 left-6 top-8 -translate-x-1/2 z-10">
                    <div className="relative h-12 w-12 rounded-full bg-white border-2 border-[var(--brand)] grid place-items-center shadow-[0_8px_24px_-8px_var(--brand)]">
                      <Icon className="h-5 w-5 text-[var(--brand)]" strokeWidth={2} />
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-full border-2 border-[var(--brand)]/40 animate-ping"
                      />
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-full ml-2 hidden lg:block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]/40 whitespace-nowrap">
                      {right ? "" : `chapter - 0${i + 1}`}
                    </div>
                  </Reveal>

                  <div
                    className={`grid lg:grid-cols-2 gap-6 lg:gap-16 items-center ${right ? "lg:[&>*:first-child]:order-2" : ""}`}
                  >
                    <Reveal
                      className={`pl-20 lg:pl-0 ${right ? "lg:pl-20 lg:text-left" : "lg:pr-20 lg:text-right"}`}
                    >
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink)]/40">
                        chapter / 0{i + 1}
                      </div>
                      <div className="mt-2 font-display text-7xl sm:text-8xl lg:text-[120px] text-[var(--ink)] leading-[0.85] tracking-[-0.04em]">
                        <span className="text-stroke">{t.year.slice(0, 2)}</span>
                        <span className="text-[var(--brand)]">{t.year.slice(2)}</span>
                      </div>
                      <div className="mt-5 inline-flex items-baseline gap-3 rounded-2xl bg-white border border-black/5 px-5 py-3 shadow-sm">
                        <span className="font-display text-3xl text-[var(--brand)]">
                          {t.metric}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]/60">
                          {t.metricLabel}
                        </span>
                      </div>
                    </Reveal>

                    <Reveal
                      className={`pl-20 lg:pl-0 ${right ? "lg:pr-20" : "lg:pl-20"}`}
                      delay={0.1}
                    >
                      <div className="group relative rounded-3xl bg-white border border-black/5 p-7 sm:p-9 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-shadow overflow-hidden">
                        <div
                          aria-hidden
                          className="absolute -top-px -left-px h-12 w-12 rounded-tl-3xl border-t-2 border-l-2 border-[var(--brand)]"
                        />
                        <div
                          aria-hidden
                          className="absolute -bottom-px -right-px h-12 w-12 rounded-br-3xl border-b-2 border-r-2 border-[var(--brand)]/40"
                        />
                        <AnimatedHeadline
                          text={t.title}
                          as="h3"
                          className="font-display text-xl sm:text-2xl lg:text-4xl text-[var(--ink)] leading-[1.1]"
                        />
                        <p className="mt-4 text-[var(--ink)]/65 text-base sm:text-lg leading-relaxed">
                          {t.body}
                        </p>
                        <div className="mt-6 h-[3px] origin-left rounded-full bg-gradient-to-r from-[var(--brand)] via-[var(--brand)]/60 to-transparent" />
                      </div>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ul>

          <Reveal className="relative mt-16 flex justify-center">
            <div className="lg:ml-0 ml-12 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] text-white px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em]">
              <Sparkles className="h-3.5 w-3.5 text-[var(--brand)]" />
              the story continues
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
