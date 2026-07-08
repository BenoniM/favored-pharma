import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight, ArrowUpRight, MapPin, ShieldCheck, Stethoscope
} from "lucide-react";
import { Reveal, SectionLabel } from "@/components/site";
import ethiopiaMapUrl from "@/assets/maps/Ethiopia_administrative_boundaries.svg?url";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "Favored PLC — Pharmaceutical & Healthcare Distribution" },
      { name: "description", content: "Premium pharmaceutical import & distribution. Hospitals, pharmacies, and clinics nationwide." },
      { property: "og:title", content: "Favored PLC — Healthcare Distribution" },
      { property: "og:description", content: "Trusted pharmaceutical and healthcare distribution for a better tomorrow." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
} as any));

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".gsap-hero-reveal",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, delay: 0.3, ease: "power2.out" }
    );
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[600px] overflow-hidden text-white"
      aria-label="Favored PLC introduction"
    >
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.2) 100%)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-16 sm:pb-20 max-w-[1440px] mx-auto">
        <div className="gsap-hero-reveal">
          <h1
            className="text-white leading-[1.05]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5.5vw, 3.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              maxWidth: "800px",
            }}
          >
            Trusted Pharmaceutical{" "}
            &amp; Healthcare Solutions
            <br />
            for a Better Tomorrow.
          </h1>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-white bg-primary px-8 py-3.5 hover:bg-primary/80 hover:scale-105 transition-all"
              style={{ borderRadius: 9999 }}
            >
              Explore Products
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-white px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-105 transition-all"
              style={{ borderRadius: 9999 }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stats Marquee
// ─────────────────────────────────────────────────────────────────────────────
function StatsMarquee() {
  const items = [
    "20+ YEARS EXPERIENCE", "500+ HEALTHCARE PARTNERS", "1,000+ MEDICAL PRODUCTS",
    "14 WAREHOUSES", "96.4% ON-TIME", "WHO-GMP CERTIFIED", "COLD-CHAIN VALIDATED",
  ];
  return (
    <section className="py-8 bg-white overflow-hidden border-b border-black/5">
      <div className="flex marquee gap-24 whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <div key={i} className="flex items-center text-sm sm:text-base font-semibold text-[var(--ink)]/40 tracking-tight">
            <span>{t}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Trusted Collage — two-slide full-page pinned grid
// ─────────────────────────────────────────────────────────────────────────────
function TrustedCollage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ── initial states ──────────────────────────────────────────────────────
    gsap.set(".img-a", { clipPath: "inset(0 100% 0 0)" });
    gsap.set(".title-a", { y: "120%" });
    gsap.set(".desc-a", { autoAlpha: 0, y: "120%", clipPath: "inset(100% 0 0 0)" });
    gsap.set(".slide-b-cell", { autoAlpha: 0 });
    gsap.set(".img-b", { clipPath: "inset(0 100% 0 0)" });
    gsap.set(".title-b", { y: "120%" });
    gsap.set(".desc-b", { autoAlpha: 0, y: "120%", clipPath: "inset(100% 0 0 0)" });

    const tl = gsap.timeline({
      scrollTrigger: {
        id: "home-trusted-collage",
        trigger: gridRef.current,
        pin: gridRef.current,
        start: "top top",
        end: "+=900%",    // 9× viewport — footer stays well below
        scrub: 1.2,
        anticipatePin: 1,
        refreshPriority: 1,
      },
    });

    // 1. Pause — empty grid visible
    tl.to({}, { duration: 0.4 });

    // 2. Slide A images expand left → right
    tl.to(".img-a", { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power2.inOut", stagger: 0.3 });

    // 3. Slide A titles + descs rise from below
    tl.to(".title-a", { y: "0%", duration: 0.8, ease: "power3.out", stagger: 0.2 });
    tl.to(".desc-a", { autoAlpha: 1, y: "0%", clipPath: "inset(0% 0 0 0)", duration: 0.8, ease: "power3.out", stagger: 0.2 }, "<0.1");

    // 4. Hold
    tl.to({}, { duration: 0.5 });

    // 5. Slide A exits: images collapse left, text exits upward
    tl.to(".img-a", { clipPath: "inset(0 0% 0 100%)", duration: 1.2, ease: "power2.inOut", stagger: 0.2 });
    tl.to(".title-a", { y: "-120%", duration: 0.6, ease: "power2.in", stagger: 0.15 }, "<");
    tl.to(".desc-a", { autoAlpha: 0, y: "-120%", clipPath: "inset(0 0 100% 0)", duration: 0.6, ease: "power2.in", stagger: 0.15 }, "<");

    // 6. Slide B images enter from left
    tl.set(".slide-b-cell", { autoAlpha: 1 });
    tl.to(".img-b", { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power2.inOut", stagger: 0.3 }, "<0.2");

    // 7. Slide B titles + descs rise from below
    tl.to(".title-b", { y: "0%", duration: 0.8, ease: "power3.out", stagger: 0.2 });
    tl.to(".desc-b", { autoAlpha: 1, y: "0%", clipPath: "inset(0% 0 0 0)", duration: 0.8, ease: "power3.out", stagger: 0.2 }, "<0.1");

    // 8. Final hold before unpin
    tl.to({}, { duration: 0.6 });
  }, { scope: wrapperRef });

  // Helper: grid cell positions (5 cols × 3 rows)
  const col = (n: number) => `${(n - 1) * 20}%`;
  const row = (n: number) => `${((n - 1) * 100) / 3}%`;
  const W = "20%";
  const H = "calc(100% / 3)";

  return (
    <div ref={wrapperRef}>
      {/* Heading — scrolls away, NOT pinned */}
      <div className="bg-white border-t border-black/5 pt-24 sm:pt-32 pb-12">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <Reveal className="max-w-3xl">
            <SectionLabel>Trusted By Institutions</SectionLabel>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl text-[var(--ink)]">
              From hospital wards to neighborhood pharmacies we keep healthcare moving.
            </h2>
          </Reveal>
          <Link to="/partners" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink)] hover:text-[var(--brand)] shrink-0">
            Meet our partners <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Full-page pinned grid */}
      <div ref={gridRef} className="relative w-full h-screen bg-white border-t border-[#228B22]/25 overflow-hidden isolate">

        {/* ── SLIDE A — CSS grid ─────────────────────────────────────────────
            Row 1: [empty] [title-a col2] [img-a col3] [desc-a col4] [empty]
            Row 2: [title-a col1] [img-a col2] [desc-a col3] [empty] [empty]
            Row 3: [empty] [empty] [title-a col3] [img-a col4] [desc-a col5]   */}
        <div className="grid grid-cols-5 grid-rows-3 w-full h-full border-l border-[#228B22]/25">

          {/* ROW 1 */}
          <div className="border-r border-b border-[#228B22]/25" />
          <div className="border-r border-b border-[#228B22]/25 p-6 lg:p-10 flex items-center justify-end text-right">
            <div className="overflow-hidden py-2">
              <h3 className="title-a font-display text-2xl lg:text-3xl text-[var(--ink)] leading-[1.1]">Premium<br />Healthcare</h3>
            </div>
          </div>
          <div className="border-r border-b border-[#228B22]/25 relative overflow-visible">
            <img
              src="https://images.pexels.com/photos/13176452/pexels-photo-13176452.jpeg"
              className="img-a absolute inset-0 w-full h-full object-cover"
              alt="Healthcare Professionals"
            />
          </div>
          <div className="border-r border-b border-[#228B22]/25 p-6 lg:p-10 flex items-center pointer-events-none">
            <div className="overflow-hidden py-4">
              <p className="desc-a text-[15px] text-[var(--ink)]/70 font-normal leading-relaxed">
                We source premium medical supplies from globally certified manufacturers, ensuring every clinic has access to top-tier essentials.
              </p>
            </div>
          </div>
          <div className="border-r border-b border-[#228B22]/25" />

          {/* ROW 2 */}
          <div className="border-r border-b border-[#228B22]/25 p-6 lg:p-10 flex items-center justify-end text-right">
            <div className="overflow-hidden py-2">
              <h3 className="title-a font-display text-2xl lg:text-3xl text-[var(--ink)] leading-[1.1]">Quality<br />Ensured</h3>
            </div>
          </div>
          <div className="border-r border-b border-[#228B22]/25 relative overflow-visible">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
              className="img-a absolute inset-0 w-full h-full object-cover"
              alt="Laboratory"
            />
          </div>
          <div className="border-r border-b border-[#228B22]/25 p-6 lg:p-10 flex items-center pointer-events-none">
            <div className="overflow-hidden py-4">
              <p className="desc-a text-[15px] text-[var(--ink)]/70 font-normal leading-relaxed">
                Every product undergoes rigorous quality assurance checks, ensuring adherence to WHO-GMP standards for maximum patient safety.
              </p>
            </div>
          </div>
          <div className="border-r border-b border-[#228B22]/25" />
          <div className="border-r border-b border-[#228B22]/25" />

          {/* ROW 3 */}
          <div className="border-r border-b border-[#228B22]/25" />
          <div className="border-r border-b border-[#228B22]/25" />
          <div className="border-r border-b border-[#228B22]/25 p-6 lg:p-10 flex items-center justify-end text-right">
            <div className="overflow-hidden py-2">
              <h3 className="title-a font-display text-2xl lg:text-3xl text-[var(--ink)] leading-[1.1]">Cold-chain<br />Ready</h3>
            </div>
          </div>
          <div className="border-r border-b border-[#228B22]/25 relative overflow-visible">
            <img
              src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=800"
              className="img-a absolute inset-0 w-full h-full object-cover"
              alt="Cold-chain logistics"
            />
          </div>
          <div className="border-r border-b border-[#228B22]/25 p-6 lg:p-10 flex items-center pointer-events-none">
            <div className="overflow-hidden py-4">
              <p className="desc-a text-[15px] text-[var(--ink)]/70 font-normal leading-relaxed">
                Our logistics network guarantees temperature-controlled transit so vaccines and biologics arrive safely and on schedule nationwide.
              </p>
            </div>
          </div>
        </div>

        {/* ── SLIDE B — absolutely positioned at DIFFERENT columns ─────────────
            Row 1 → col1(title) col2(img) col3(desc)   [img was at col3 in A]
            Row 2 → col3(title) col4(img) col5(desc)   [img was at col2 in A]
            Row 3 → col2(title) col3(img) col4(desc)   [img was at col4 in A]  */}

        {/* ROW 1 ── col1 title-b */}
        <div
          className="slide-b-cell absolute bg-white border-r border-b border-[#228B22]/25 p-6 lg:p-10 flex items-center justify-end text-right z-10"
          style={{ left: col(1), top: row(1), width: W, height: H }}
        >
          <div className="overflow-hidden py-2">
            <h3 className="title-b font-display text-2xl lg:text-3xl text-[var(--ink)] leading-[1.1]">Trusted<br />Partners</h3>
          </div>
        </div>
        {/* ROW 1 ── col2 img-b */}
        <div
          className="slide-b-cell absolute border-r border-b border-[#228B22]/25 overflow-visible"
          style={{ left: col(2), top: row(1), width: W, height: H }}
        >
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
            className="img-b absolute inset-0 w-full h-full object-cover"
            alt="Partners"
          />
        </div>
        {/* ROW 1 col3 desc-b */}
        <div
          className="slide-b-cell absolute bg-white border-r border-b border-[#228B22]/25 p-6 lg:p-10 flex items-center pointer-events-none"
          style={{ left: col(3), top: row(1), width: W, height: H }}
        >
          <div className="overflow-hidden py-4">
            <p className="desc-b text-[15px] text-[var(--ink)]/70 font-normal leading-relaxed">
              We partner with 500+ hospitals, pharmacies, and clinics - relationships built on trust, reliability, and a shared commitment to care.
            </p>
          </div>
        </div>

        {/* ROW 2 ── col3 title-b */}
        <div
          className="slide-b-cell absolute bg-white border-r border-b border-[#228B22]/25 p-6 lg:p-10 flex items-center justify-end text-right z-10"
          style={{ left: col(3), top: row(2), width: W, height: H }}
        >
          <div className="overflow-hidden py-2">
            <h3 className="title-b font-display text-2xl lg:text-3xl text-[var(--ink)] leading-[1.1]">24 / 7<br />Support</h3>
          </div>
        </div>
        {/* ROW 2 ── col4 img-b */}
        <div
          className="slide-b-cell absolute border-r border-b border-[#228B22]/25 overflow-visible"
          style={{ left: col(4), top: row(2), width: W, height: H }}
        >
          <img
            src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800"
            className="img-b absolute inset-0 w-full h-full object-cover"
            alt="Support"
          />
        </div>
        {/* ROW 2 col5 desc-b */}
        <div
          className="slide-b-cell absolute bg-white border-r border-b border-[#228B22]/25 p-6 lg:p-10 flex items-center pointer-events-none"
          style={{ left: col(5), top: row(2), width: W, height: H }}
        >
          <div className="overflow-hidden py-4">
            <p className="desc-b text-[15px] text-[var(--ink)]/70 font-normal leading-relaxed">
              Our teams are available round-the-clock to ensure your supply chain never stops - no matter the time or place.
            </p>
          </div>
        </div>

        {/* ROW 3 ── col2 title-b */}
        <div
          className="slide-b-cell absolute bg-white border-r border-b border-[#228B22]/25 p-6 lg:p-10 flex items-center justify-end text-right z-10"
          style={{ left: col(2), top: row(3), width: W, height: H }}
        >
          <div className="overflow-hidden py-2">
            <h3 className="title-b font-display text-2xl lg:text-3xl text-[var(--ink)] leading-[1.1]">On-Time<br />Delivery</h3>
          </div>
        </div>
        {/* ROW 3 ── col3 img-b */}
        <div
          className="slide-b-cell absolute border-r border-b border-[#228B22]/25 overflow-visible"
          style={{ left: col(3), top: row(3), width: W, height: H }}
        >
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
            className="img-b absolute inset-0 w-full h-full object-cover"
            alt="Delivery"
          />
        </div>
        {/* ROW 3 col4 desc-b */}
        <div
          className="slide-b-cell absolute bg-white border-r border-b border-[#228B22]/25 p-6 lg:p-10 flex items-center pointer-events-none"
          style={{ left: col(4), top: row(3), width: W, height: H }}
        >
          <div className="overflow-hidden py-4">
            <p className="desc-b text-[15px] text-[var(--ink)]/70 font-normal leading-relaxed">
              With a 96.4% on-time record and 14 strategically placed warehouses, the right product reaches the right place - every time.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Pillars Teaser
// ─────────────────────────────────────────────────────────────────────────────
function PillarsTeaser() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".gsap-pillar-reveal",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      }
    );
  }, { scope: containerRef });

  const pillars = [
    {
      n: "01",
      title: <>Pharmaceutical<br />Imports</>,
      desc: "Globally certified manufacturers, dependable sourcing, and full chain-of-custody for essential medicines.",
      color: "#018541",
      shape: "rounded-none",
      position: "lg:left-[3%] lg:top-[88px]",
      content: "items-start justify-start text-left",
    },
    {
      n: "02",
      title: <>Medical<br />Equipment</>,
      desc: "Imaging, monitoring, surgical devices, and installation support for facilities that need reliable uptime.",
      color: "#06080F",
      shape: "rounded-full",
      position: "lg:left-[21%] lg:top-[88px]",
      content: "items-center justify-center text-center",
    },
    {
      n: "03",
      title: <>Laboratory<br />Supplies</>,
      desc: "Reagents, calibrated instruments, and lab essentials selected for accuracy, traceability, and daily use.",
      color: "#03332F",
      shape: "rounded-b-full",
      position: "lg:left-[44%] lg:top-[88px]",
      content: "items-start justify-start text-left",
    },
    {
      n: "04",
      title: <>Hospital<br />Consumables</>,
      desc: "Daily-use supplies, sterile essentials, and scheduled replenishment that keep clinical teams moving.",
      color: "#009F5C",
      shape: "rounded-tr-[220px]",
      position: "lg:right-[3%] lg:top-[88px]",
      content: "items-center justify-center text-center",
    },
  ];

  const getPillarTransform = (index: number) => {
    if (hoveredPillar === null || hoveredPillar === index) return undefined;
    if (hoveredPillar === 2 && index === 3) return "translateX(16rem)";
    return `translateX(${index < hoveredPillar ? "-12rem" : "12rem"})`;
  };

  return (
    <section className="bg-white py-24 sm:py-32" ref={containerRef}>
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl">
          <SectionLabel>Solutions</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl text-[var(--ink)]">Four pillars of dependable supply.</h2>
        </Reveal>
        <div className="relative mt-16 min-h-[640px] overflow-visible lg:mt-10">
          <div className="grid gap-4 lg:block">
            {pillars.map((pillar, index) => (
              <article
                key={pillar.n}
                className={`gsap-pillar-reveal group relative min-h-[320px] overflow-hidden p-8 text-white opacity-0 transition-transform duration-500 sm:p-10 lg:absolute lg:h-[500px] lg:w-[500px] ${pillar.position} ${pillar.shape}`}
                style={{ background: pillar.color, transform: getPillarTransform(index) }}
                onMouseEnter={() => setHoveredPillar(index)}
                onMouseLeave={() => setHoveredPillar(null)}
                onFocus={() => setHoveredPillar(index)}
                onBlur={() => setHoveredPillar(null)}
                tabIndex={0}
              >
                <div className={`flex h-full min-h-[220px] flex-col ${pillar.content}`}>
                  <h3 className="font-display text-3xl leading-[1.05] text-white sm:text-4xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-6 max-w-sm translate-y-3 text-base font-semibold leading-relaxed text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {pillar.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Featured Teasers
// ─────────────────────────────────────────────────────────────────────────────
function FeaturedTeasers() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 noise-overlay">
        <img
          src="https://images.pexels.com/photos/7615557/pexels-photo-7615557.jpeg"
          alt="Pharmacy background"
          className="w-full h-full object-cover scale-[1.05] translate-x-0 md:-translate-x-2"
        />
        {/* Overlays to integrate with brand palette and ensure text readability */}
        <div className="absolute inset-0 bg-[var(--ink)]/50 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">

          <Link to="/quality" className="group relative rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-10 sm:p-14 flex flex-col items-center justify-between text-center transition-all duration-500 hover:bg-white/10 hover:border-white/20 aspect-[4/5] max-h-[600px]">
            <div className="flex flex-col items-center w-full">
              <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-widest text-white mb-16">
                Quality & Compliance
              </h3>

              <div className="relative w-32 h-32 mb-12 flex items-center justify-center text-[var(--brand)]/80 group-hover:text-[var(--brand)] group-hover:scale-110 transition-all duration-700">
                <ShieldCheck className="w-24 h-24 stroke-[1.5]" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-8 w-full">
              <p className="text-sm sm:text-base leading-relaxed text-white/90 max-w-sm">
                Built on quality, safety & trust.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["WHO-GMP", "ISO 9001", "GDP"].map((c) => (
                  <span key={c} className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-white border border-[var(--brand)]/50 tracking-wide uppercase">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Link>

          <Link to="/products" className="group relative rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-10 sm:p-14 flex flex-col items-center justify-between text-center transition-all duration-500 hover:bg-white/10 hover:border-white/20 aspect-[4/5] max-h-[600px]">
            <div className="flex flex-col items-center w-full">
              <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-widest text-white mb-16">
                Product Catalog
              </h3>

              <div className="relative w-32 h-32 mb-12 flex items-center justify-center text-[var(--brand)]/80 group-hover:text-[var(--brand)] group-hover:scale-110 transition-all duration-700">
                <Stethoscope className="w-24 h-24 stroke-[1.5]" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-8 w-full">
              <p className="text-sm sm:text-base leading-relaxed text-white/90 max-w-sm">
                1,000+ medical products in stock.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Prescription", "OTC", "Devices", "Lab", "Consumables", "Emergency"].map((c) => (
                  <span key={c} className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-white border border-[var(--brand)]/50 tracking-wide uppercase">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Network Preview
// ─────────────────────────────────────────────────────────────────────────────
function NetworkPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHub, setActiveHub] = useState(0);

  const hubs = [
    {
      city: "Addis Ababa",
      region: "Central command",
      // Green SVG paths cluster: avg x≈38.6%, y≈51%
      x: 38.6,
      y: 51.0,
      stat: "Daily dispatch control",
      detail: "Our primary distribution hub, fulfilling daily deliveries to major hospitals and pharmacies across the capital.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200",
    },
    {
      city: "Bahir Dar",
      region: "Northwest corridor",
      // Green SVG path start: x=29.6%, y=28%
      x: 29.6,
      y: 28.0,
      stat: "Hospital and pharmacy supply",
      detail: "We distribute extensively throughout the Amhara region, ensuring continuous supply to healthcare facilities in Bahir Dar and beyond.",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=1200",
    },
    {
      city: "Mekelle",
      region: "Northern reach",
      // Green SVG path start: x=42.9%, y=10.9%
      x: 42.9,
      y: 10.9,
      stat: "Long-haul validated lanes",
      detail: "Our northern distribution lanes deliver temperature-sensitive pharmaceuticals and critical supplies directly to Mekelle's medical centers.",
      image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=1200",
    },
    {
      city: "Hawassa",
      region: "Southern corridor",
      // Green SVG path start: x=37.2%, y=67.5%
      x: 37.2,
      y: 67.5,
      stat: "Clinic and lab coverage",
      detail: "We supply the southern corridor, distributing essential medicines and medical devices directly to clinics and hospitals in Hawassa.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=1200",
    },
    {
      city: "Dire Dawa",
      region: "Eastern gateway",
      // Green SVG paths cluster: avg x≈59.1%, y≈45.5%
      x: 59.1,
      y: 45.5,
      stat: "Fast regional transfer",
      detail: "Our eastern distribution network ensures rapid fulfillment and delivery of critical healthcare supplies to facilities in Dire Dawa.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
    },
    {
      city: "Jimma",
      region: "Southwest route",
      // Green SVG path start: x=25.8%, y=62.2%
      x: 25.8,
      y: 62.2,
      stat: "Reliable replenishment",
      detail: "We consistently distribute essential pharmaceutical stock and recurring medical consumables to healthcare providers throughout Jimma.",
      image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=1200",
    },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: "top 75%" } });
    tl.fromTo(".gsap-network-highlight", { opacity: 0 }, { opacity: 1, duration: 0.9, stagger: 0.08, ease: "power2.out" }, 0);
  }, { scope: containerRef });

  const selectedHub = hubs[activeHub];
  return (
    <section className="bg-white" ref={containerRef}>
      <div className="grid overflow-hidden border-y border-black/5 bg-white lg:min-h-[760px] lg:grid-cols-[52vw_48vw]">
        <div className="relative flex min-h-[720px] flex-col px-6 py-12 sm:px-10 lg:px-12">
          <Reveal className="relative z-20 max-w-[690px]">
            <SectionLabel>Network</SectionLabel>
            <h2 className="mt-4 max-w-[660px] font-display text-3xl text-[var(--ink)] sm:text-4xl">
              A nationwide network, always moving.
            </h2>
            <p className="mt-7 max-w-[640px] text-sm font-semibold uppercase leading-snug text-[var(--ink)]/70 sm:text-base">
              From hospital wards to neighborhood pharmacies we keep healthcare moving.
            </p>
          </Reveal>

          <div className="relative z-10 mt-12 flex-1 min-h-[410px] overflow-hidden bg-white/45">
            <div className="absolute inset-5 flex items-center justify-center sm:inset-8">
              <div className="relative aspect-[800/611] h-full max-h-full max-w-full">
                <img
                  src={ethiopiaMapUrl}
                  alt="Map of Ethiopia"
                  className="absolute inset-0 h-full w-full object-contain drop-shadow-sm"
                />

                {hubs.map((hub, index) => {
                  const isActive = activeHub === index;

                  return (
                    <button
                      key={hub.city}
                      onMouseEnter={() => setActiveHub(index)}
                      className={`absolute z-20 origin-bottom -translate-x-1/2 -translate-y-full transition-transform hover:scale-125 text-[#228b22] ${isActive ? "scale-125 drop-shadow-md" : ""
                        }`}
                      style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                      aria-label={`Select ${hub.city}`}
                    >
                      <MapPin
                        className={`h-5 w-5 sm:h-6 sm:w-6 ${isActive ? "fill-[#228b22] stroke-white" : "fill-white stroke-[#228b22]"
                          }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="relative min-h-[620px] overflow-hidden bg-[var(--ink)] text-white lg:min-h-[760px]">
          {/* Background image mirrors the footer CTA treatment */}
          <div
            key={selectedHub.image}
            aria-hidden
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              backgroundImage: `url(${selectedHub.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center 35%",
            }}
          />
          <div className="absolute inset-0 bg-[rgba(5,22,18,0.45)]" />

          {/* Top Right Box */}
          <div
            className="absolute bg-white p-8 flex flex-col justify-between z-10"
            style={{ width: "220px", height: "200px", top: "0px", right: "10px" }}
          >
            <p className="font-display text-2xl text-[#4A5143] leading-tight break-words">Network role</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] leading-relaxed text-[#4A5143]/80 break-words">
              {selectedHub.region}
            </p>
          </div>

          {/* Left/Lower Box */}
          <div
            className="absolute bg-white p-8 flex flex-col justify-between shadow-2xl z-20"
            style={{ width: "210px", height: "200px", top: "200px", right: "230px" }}
          >
            <p className="font-display text-2xl text-[#4A5143] leading-tight break-words">Movement</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] leading-relaxed text-[#4A5143]/80 break-words">
              ACTIVE ROUTE —<br />
              {selectedHub.stat}
            </p>
          </div>

          {/* Bottom Left Content */}
          <div className="absolute bottom-0 left-0 w-full p-8 sm:p-10 lg:p-12 z-30">
            <div className="max-w-[480px]">
              <h3 className="font-display text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.05] tracking-tight text-white">
                {selectedHub.city}
                <br />
                distribution lane.
              </h3>
              <p className="mt-4 max-w-[380px] text-sm sm:text-base leading-relaxed text-white/90">
                {selectedHub.detail}
              </p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
function Home() {
  return (
    <main className="bg-white text-[var(--ink)] overflow-x-hidden">
      <Hero />
      <StatsMarquee />
      <TrustedCollage />
      <PillarsTeaser />
      <FeaturedTeasers />
      <NetworkPreview />
    </main>
  );
}


