import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Pill, FlaskConical, Stethoscope, Syringe, ArrowRight, ArrowUpRight, MapPin,
} from "lucide-react";
import { Reveal, SectionLabel } from "@/components/site";

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
  const gridRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ── initial states ──────────────────────────────────────────────────────
    gsap.set(".img-a",   { clipPath: "inset(0 100% 0 0)" });
    gsap.set(".title-a", { y: "120%" });
    gsap.set(".desc-a",  { y: "120%" });
    gsap.set(".img-b",   { clipPath: "inset(0 100% 0 0)" });
    gsap.set(".title-b", { y: "120%" });
    gsap.set(".desc-b",  { y: "120%" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: gridRef.current,
        pin:     gridRef.current,
        start:   "top top",
        end:     "+=900%",    // 9× viewport — footer stays well below
        scrub:   1.2,
        anticipatePin: 1,
      },
    });

    // 1. Pause — empty grid visible
    tl.to({}, { duration: 0.4 });

    // 2. Slide A images expand left → right
    tl.to(".img-a", { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power2.inOut", stagger: 0.3 });

    // 3. Slide A titles + descs rise from below
    tl.to(".title-a", { y: "0%", duration: 0.8, ease: "power3.out", stagger: 0.2 });
    tl.to(".desc-a",  { y: "0%", duration: 0.8, ease: "power3.out", stagger: 0.2 }, "<0.1");

    // 4. Hold
    tl.to({}, { duration: 0.5 });

    // 5. Slide A exits: images collapse left, text exits upward
    tl.to(".img-a",   { clipPath: "inset(0 0% 0 100%)", duration: 1.2, ease: "power2.inOut", stagger: 0.2 });
    tl.to(".title-a", { y: "-120%", duration: 0.6, ease: "power2.in", stagger: 0.15 }, "<");
    tl.to(".desc-a",  { y: "-120%", duration: 0.6, ease: "power2.in", stagger: 0.15 }, "<");

    // 6. Slide B images enter from left
    tl.to(".img-b", { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power2.inOut", stagger: 0.3 }, "<0.2");

    // 7. Slide B titles + descs rise from below
    tl.to(".title-b", { y: "0%", duration: 0.8, ease: "power3.out", stagger: 0.2 });
    tl.to(".desc-b",  { y: "0%", duration: 0.8, ease: "power3.out", stagger: 0.2 }, "<0.1");

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
      <div ref={gridRef} className="relative w-full h-screen bg-white border-t border-black/15 overflow-hidden">

        {/* ── SLIDE A — CSS grid ─────────────────────────────────────────────
            Row 1: [empty] [title-a col2] [img-a col3] [desc-a col4] [empty]
            Row 2: [title-a col1] [img-a col2] [desc-a col3] [empty] [empty]
            Row 3: [empty] [empty] [title-a col3] [img-a col4] [desc-a col5]   */}
        <div className="grid grid-cols-5 grid-rows-3 w-full h-full border-l border-black/15">

          {/* ROW 1 */}
          <div className="border-r border-b border-black/15" />
          <div className="border-r border-b border-black/15 p-6 lg:p-10 flex items-center justify-end text-right">
            <div className="overflow-hidden py-2">
              <h3 className="title-a font-display text-2xl lg:text-3xl text-[var(--ink)] leading-[1.1]">Premium<br />Healthcare</h3>
            </div>
          </div>
          <div className="border-r border-b border-black/15 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=800"
              className="img-a absolute inset-0 w-full h-full object-cover"
              alt="Healthcare Professionals"
            />
          </div>
          <div className="border-r border-b border-black/15 p-6 lg:p-10 flex items-center pointer-events-none">
            <div className="overflow-hidden py-4 w-full">
              <p className="desc-a text-sm text-white mix-blend-difference font-medium leading-relaxed">
                We source premium medical supplies from globally certified manufacturers, ensuring every clinic has access to top-tier essentials.
              </p>
            </div>
          </div>
          <div className="border-r border-b border-black/15" />

          {/* ROW 2 */}
          <div className="border-r border-b border-black/15 p-6 lg:p-10 flex items-center justify-end text-right">
            <div className="overflow-hidden py-2">
              <h3 className="title-a font-display text-2xl lg:text-3xl text-[var(--ink)] leading-[1.1]">Quality<br />Ensured</h3>
            </div>
          </div>
          <div className="border-r border-b border-black/15 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
              className="img-a absolute inset-0 w-full h-full object-cover"
              alt="Laboratory"
            />
          </div>
          <div className="border-r border-b border-black/15 p-6 lg:p-10 flex items-center pointer-events-none">
            <div className="overflow-hidden py-4 w-full">
              <p className="desc-a text-sm text-white mix-blend-difference font-medium leading-relaxed">
                Every product undergoes rigorous quality assurance checks, ensuring adherence to WHO-GMP standards for maximum patient safety.
              </p>
            </div>
          </div>
          <div className="border-r border-b border-black/15" />
          <div className="border-r border-b border-black/15" />

          {/* ROW 3 */}
          <div className="border-r border-b border-black/15" />
          <div className="border-r border-b border-black/15" />
          <div className="border-r border-b border-black/15 p-6 lg:p-10 flex items-center justify-end text-right">
            <div className="overflow-hidden py-2">
              <h3 className="title-a font-display text-2xl lg:text-3xl text-[var(--ink)] leading-[1.1]">Cold-chain<br />Ready</h3>
            </div>
          </div>
          <div className="border-r border-b border-black/15 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=800"
              className="img-a absolute inset-0 w-full h-full object-cover"
              alt="Cold-chain logistics"
            />
          </div>
          <div className="border-r border-b border-black/15 p-6 lg:p-10 flex items-center pointer-events-none">
            <div className="overflow-hidden py-4 w-full">
              <p className="desc-a text-sm text-white mix-blend-difference font-medium leading-relaxed">
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
          className="absolute bg-white border-r border-b border-black/15 p-6 lg:p-10 flex items-center justify-end text-right z-10"
          style={{ left: col(1), top: row(1), width: W, height: H }}
        >
          <div className="overflow-hidden py-2">
            <h3 className="title-b font-display text-2xl lg:text-3xl text-[var(--ink)] leading-[1.1]">Trusted<br />Partners</h3>
          </div>
        </div>
        {/* ROW 1 ── col2 img-b */}
        <div
          className="absolute border-r border-b border-black/15 overflow-hidden z-10"
          style={{ left: col(2), top: row(1), width: W, height: H }}
        >
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
            className="img-b absolute inset-0 w-full h-full object-cover"
            alt="Partners"
          />
        </div>
        {/* ROW 1 ── col3 desc-b */}
        <div
          className="absolute bg-white border-r border-b border-black/15 p-6 lg:p-10 flex items-center pointer-events-none z-10"
          style={{ left: col(3), top: row(1), width: W, height: H }}
        >
          <div className="overflow-hidden py-4 w-full">
            <p className="desc-b text-sm text-white mix-blend-difference font-medium leading-relaxed">
              We partner with 500+ hospitals, pharmacies, and clinics — relationships built on trust, reliability, and a shared commitment to care.
            </p>
          </div>
        </div>

        {/* ROW 2 ── col3 title-b */}
        <div
          className="absolute bg-white border-r border-b border-black/15 p-6 lg:p-10 flex items-center justify-end text-right z-10"
          style={{ left: col(3), top: row(2), width: W, height: H }}
        >
          <div className="overflow-hidden py-2">
            <h3 className="title-b font-display text-2xl lg:text-3xl text-[var(--ink)] leading-[1.1]">24 / 7<br />Support</h3>
          </div>
        </div>
        {/* ROW 2 ── col4 img-b */}
        <div
          className="absolute border-r border-b border-black/15 overflow-hidden z-10"
          style={{ left: col(4), top: row(2), width: W, height: H }}
        >
          <img
            src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800"
            className="img-b absolute inset-0 w-full h-full object-cover"
            alt="Support"
          />
        </div>
        {/* ROW 2 ── col5 desc-b */}
        <div
          className="absolute bg-white border-r border-b border-black/15 p-6 lg:p-10 flex items-center pointer-events-none z-10"
          style={{ left: col(5), top: row(2), width: W, height: H }}
        >
          <div className="overflow-hidden py-4 w-full">
            <p className="desc-b text-sm text-white mix-blend-difference font-medium leading-relaxed">
              Our teams are available round-the-clock to ensure your supply chain never stops — no matter the time or place.
            </p>
          </div>
        </div>

        {/* ROW 3 ── col2 title-b */}
        <div
          className="absolute bg-white border-r border-b border-black/15 p-6 lg:p-10 flex items-center justify-end text-right z-10"
          style={{ left: col(2), top: row(3), width: W, height: H }}
        >
          <div className="overflow-hidden py-2">
            <h3 className="title-b font-display text-2xl lg:text-3xl text-[var(--ink)] leading-[1.1]">On-Time<br />Delivery</h3>
          </div>
        </div>
        {/* ROW 3 ── col3 img-b */}
        <div
          className="absolute border-r border-b border-black/15 overflow-hidden z-10"
          style={{ left: col(3), top: row(3), width: W, height: H }}
        >
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
            className="img-b absolute inset-0 w-full h-full object-cover"
            alt="Delivery"
          />
        </div>
        {/* ROW 3 ── col4 desc-b */}
        <div
          className="absolute bg-white border-r border-b border-black/15 p-6 lg:p-10 flex items-center pointer-events-none z-10"
          style={{ left: col(4), top: row(3), width: W, height: H }}
        >
          <div className="overflow-hidden py-4 w-full">
            <p className="desc-b text-sm text-white mix-blend-difference font-medium leading-relaxed">
              With a 96.4% on-time record and 14 strategically placed warehouses, the right product reaches the right place — every time.
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

  useGSAP(() => {
    gsap.fromTo(
      ".gsap-pillar-reveal",
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      }
    );
  }, { scope: containerRef });

  const blocks = [
    { n: "01", title: "Pharmaceutical Imports",  desc: "Globally certified manufacturers, full chain-of-custody.", icon: Pill },
    { n: "02", title: "Medical Equipment",       desc: "Imaging, monitoring, and surgical devices.",              icon: Stethoscope },
    { n: "03", title: "Laboratory Supplies",     desc: "Reagents and precision instruments calibrated for accuracy.", icon: FlaskConical },
    { n: "04", title: "Hospital Consumables",    desc: "Daily-use supplies, delivered on schedule.",              icon: Syringe },
  ];

  return (
    <section className="py-24 sm:py-32" ref={containerRef}>
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl mb-16">
          <SectionLabel>Solutions</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl text-[var(--ink)]">Four pillars of dependable supply.</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {blocks.map((b) => (
            <div key={b.n} className="gsap-pillar-reveal opacity-0 group relative rounded-3xl bg-gradient-to-br from-[var(--mist)] to-white border border-black/5 p-8 sm:p-10 overflow-hidden">
              <div aria-hidden className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[var(--brand)]/10 blur-3xl group-hover:bg-[var(--brand)]/20 transition-colors" />
              <div className="relative">
                <div className="flex items-center justify-between mb-12">
                  <div className="font-mono text-xs text-[var(--ink)]/40">— {b.n}</div>
                  <div className="h-14 w-14 rounded-2xl bg-white border border-black/5 grid place-items-center shadow-[var(--shadow-card)]">
                    <b.icon className="h-7 w-7 text-[var(--brand)]" />
                  </div>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-[var(--ink)] mb-3">{b.title}</h3>
                <p className="text-[var(--ink)]/65 leading-relaxed max-w-md">{b.desc}</p>
                <Link to="/products" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
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
    <section className="py-24 sm:py-32 bg-[var(--mist)]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-6">
        <Link to="/quality" className="lg:col-span-7 group relative rounded-[32px] bg-[var(--ink)] text-white p-10 sm:p-14 overflow-hidden min-h-[440px] flex flex-col justify-between">
          <div aria-hidden className="absolute top-0 right-0 w-[600px] h-[600px] opacity-40" style={{ background: "var(--gradient-glow)" }} />
          <div className="relative">
            <SectionLabel>Quality &amp; Compliance</SectionLabel>
            <h3 className="mt-6 font-display text-3xl sm:text-4xl max-w-md">Built on quality, safety &amp; trust.</h3>
          </div>
          <div className="relative flex items-end justify-between">
            <div className="grid grid-cols-3 gap-3">
              {["WHO-GMP", "ISO 9001", "GDP"].map((c) => (
                <div key={c} className="glass-dark rounded-2xl px-4 py-3 text-xs font-mono">{c}</div>
              ))}
            </div>
            <ArrowUpRight className="h-8 w-8 text-[var(--brand)] group-hover:rotate-45 transition-transform" />
          </div>
        </Link>
        <Link to="/products" className="lg:col-span-5 group relative rounded-[32px] bg-white border border-black/5 p-10 sm:p-14 overflow-hidden min-h-[440px] flex flex-col justify-between">
          <div className="relative">
            <SectionLabel>Product Catalog</SectionLabel>
            <h3 className="mt-6 font-display text-2xl sm:text-3xl text-[var(--ink)]">1,000+ medical products in stock.</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Prescription", "OTC", "Devices", "Lab", "Consumables", "Emergency"].map((c) => (
              <span key={c} className="rounded-full bg-[var(--mist)] px-3 py-1.5 text-xs font-medium text-[var(--ink)] border border-black/5">{c}</span>
            ))}
          </div>
          <ArrowUpRight className="absolute top-10 right-10 h-8 w-8 text-[var(--brand)] group-hover:rotate-45 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Network Preview
// ─────────────────────────────────────────────────────────────────────────────
function NetworkPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  const hubs = [
    { city: "Addis Ababa", x: "20%", y: "35%" },
    { city: "Bahir Dar",   x: "42%", y: "22%" },
    { city: "Mekelle",     x: "62%", y: "18%" },
    { city: "Hawassa",     x: "35%", y: "62%" },
    { city: "Dire Dawa",   x: "72%", y: "48%" },
    { city: "Jimma",       x: "15%", y: "70%" },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: "top 75%" } });
    tl.fromTo(".gsap-network-line", { opacity: 0 }, { opacity: 1, duration: 1.5, stagger: 0.15, ease: "power2.inOut" }, 0);
    tl.fromTo(".gsap-network-node", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" }, 0.3);
  }, { scope: containerRef });

  return (
    <section className="py-24 sm:py-32" ref={containerRef}>
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl mb-12">
          <SectionLabel>Network</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl text-[var(--ink)]">A nationwide network, always moving.</h2>
        </Reveal>
        <div className="relative rounded-[32px] bg-gradient-to-br from-[var(--mist)] via-white to-[var(--brand)]/5 border border-black/5 p-6 sm:p-10 overflow-hidden">
          <div className="relative h-[420px] sm:h-[520px] rounded-3xl bg-white/50 border border-black/5 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full opacity-40">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(49,78,74,0.08)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              {hubs.slice(1).map((h, i) => (
                <line key={i} x1="20" y1="35" x2={parseFloat(h.x)} y2={parseFloat(h.y)}
                  className="gsap-network-line"
                  stroke="var(--brand)" strokeWidth="0.2" strokeDasharray="1 1" />
              ))}
            </svg>
            {hubs.map((h) => (
              <div key={h.city} className="gsap-network-node absolute -translate-x-1/2 -translate-y-1/2 opacity-0" style={{ left: h.x, top: h.y }}>
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[var(--brand)]/30 animate-ping" />
                  <div className="relative h-3 w-3 rounded-full bg-[var(--brand)] ring-4 ring-white" />
                </div>
                <div className="absolute left-5 top-0 glass rounded-xl px-3 py-1.5 shadow-[var(--shadow-card)] whitespace-nowrap">
                  <div className="text-[10px] font-mono text-[var(--ink)]/60 flex items-center gap-1">
                    <MapPin className="h-2.5 w-2.5" />{h.city}
                  </div>
                </div>
              </div>
            ))}
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
