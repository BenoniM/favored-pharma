import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useRef } from "react";
import {
  Pill, Microscope, FlaskConical, Stethoscope, Syringe, ShieldCheck,
  Truck, BadgeCheck, Snowflake, Globe, ArrowRight, ArrowUpRight, Sparkles, MapPin,
} from "lucide-react";
import { Reveal, fadeUp, SectionLabel } from "@/components/site";



export const Route = createFileRoute("/")({
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
});



function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section
      className="relative h-screen min-h-[600px] overflow-hidden text-white"
      aria-label="Favored PLC introduction"
    >
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      {/* Bottom-left content: headline + buttons */}
      <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-16 sm:pb-20 max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
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
            Trusted Pharmaceutical 
            & Healthcare Solutions<br />
            for a Better Tomorrow.
          </h1>

          {/* CTA buttons */}
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
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="opacity-70">
                <path d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM7.25 4h1.5v5.25H12v1.5H7.25V4z"/>
              </svg>
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


function StatsMarquee() {
  const items = ["20+ YEARS EXPERIENCE", "500+ HEALTHCARE PARTNERS", "1,000+ MEDICAL PRODUCTS", "14 WAREHOUSES", "96.4% ON-TIME", "WHO-GMP CERTIFIED", "COLD-CHAIN VALIDATED"];
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

function TrustedCollage() {
  const tiles = [
    { label: "Quality Checked", icon: BadgeCheck, h: "h-64", color: "from-[var(--brand)]/20 to-[var(--brand)]/5", emoji: "🏥" },
    { label: "Cold Chain Ready", icon: Snowflake, h: "h-80", color: "from-sky-100 to-white", emoji: "❄️" },
    { label: "Regulatory Compliant", icon: ShieldCheck, h: "h-72", color: "from-[var(--ink)]/10 to-white", emoji: "📋" },
    { label: "Fast Distribution", icon: Truck, h: "h-56", color: "from-amber-50 to-white", emoji: "🚚" },
    { label: "Lab Verified", icon: Microscope, h: "h-72", color: "from-emerald-50 to-white", emoji: "🔬" },
    { label: "Pharmacy Network", icon: Pill, h: "h-60", color: "from-[var(--mist)] to-white", emoji: "💊" },
  ];
  return (
    <section className="py-24 sm:py-32 overflow-hidden bg-[var(--mist)]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <Reveal className="max-w-3xl">
          <SectionLabel>Trusted By Institutions</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl text-[var(--ink)]">From hospital wards to neighborhood pharmacies we keep healthcare moving.</h2>
        </Reveal>
        <Link to="/partners" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink)] hover:text-[var(--brand)] shrink-0">
          Meet our partners <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <motion.div initial={{ x: 0 }} animate={{ x: "-50%" }} transition={{ duration: 30, ease: "linear", repeat: Infinity }} className="flex gap-5 px-6 w-max">
        {[...tiles, ...tiles].map((t, i) => (
          <div key={i} className={`relative w-64 ${t.h} rounded-3xl bg-gradient-to-br ${t.color} border border-black/5 overflow-hidden shrink-0 shadow-[var(--shadow-card)]`}>
            <div className="absolute inset-0 grid place-items-center text-7xl opacity-30">{t.emoji}</div>
            <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-3 flex items-center gap-2">
              <t.icon className="h-4 w-4 text-[var(--brand)] shrink-0" />
              <span className="text-xs font-medium text-[var(--ink)] truncate">{t.label}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function PillarsTeaser() {
  const blocks = [
    { n: "01", title: "Pharmaceutical Imports", desc: "Globally certified manufacturers, full chain-of-custody.", icon: Pill },
    { n: "02", title: "Medical Equipment", desc: "Imaging, monitoring, and surgical devices.", icon: Stethoscope },
    { n: "03", title: "Laboratory Supplies", desc: "Reagents and precision instruments calibrated for accuracy.", icon: FlaskConical },
    { n: "04", title: "Hospital Consumables", desc: "Daily-use supplies, delivered on schedule.", icon: Syringe },
  ];
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl mb-16">
          <SectionLabel>Solutions</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl text-[var(--ink)]">Four pillars of dependable supply.</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {blocks.map((b, i) => (
            <motion.div key={b.n} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
              transition={{ delay: i * 0.06, duration: 0.7 }}
              className="group relative rounded-3xl bg-gradient-to-br from-[var(--mist)] to-white border border-black/5 p-8 sm:p-10 overflow-hidden">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedTeasers() {
  return (
    <section className="py-24 sm:py-32 bg-[var(--mist)]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-6">
        <Link to="/quality" className="lg:col-span-7 group relative rounded-[32px] bg-[var(--ink)] text-white p-10 sm:p-14 overflow-hidden min-h-[440px] flex flex-col justify-between">
          <div aria-hidden className="absolute top-0 right-0 w-[600px] h-[600px] opacity-40" style={{ background: "var(--gradient-glow)" }} />
          <div className="relative">
            <SectionLabel>Quality & Compliance</SectionLabel>
            <h3 className="mt-6 font-display text-3xl sm:text-4xl max-w-md">Built on quality, safety & trust.</h3>
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

function NetworkPreview() {
  const hubs = [
    { city: "Addis Ababa", x: "20%", y: "35%" }, { city: "Bahir Dar", x: "42%", y: "22%" },
    { city: "Mekelle", x: "62%", y: "18%" }, { city: "Hawassa", x: "35%", y: "62%" },
    { city: "Dire Dawa", x: "72%", y: "48%" }, { city: "Jimma", x: "15%", y: "70%" },
  ];
  return (
    <section className="py-24 sm:py-32">
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
                <motion.line key={i} x1="20" y1="35" x2={parseFloat(h.x)} y2={parseFloat(h.y)}
                  stroke="var(--brand)" strokeWidth="0.2" strokeDasharray="1 1"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: i * 0.15 }} />
              ))}
            </svg>
            {hubs.map((h, i) => (
              <motion.div key={h.city} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.3 }}
                style={{ left: h.x, top: h.y }} className="absolute -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[var(--brand)]/30 animate-ping" />
                  <div className="relative h-3 w-3 rounded-full bg-[var(--brand)] ring-4 ring-white" />
                </div>
                <div className="absolute left-5 top-0 glass rounded-xl px-3 py-1.5 shadow-[var(--shadow-card)] whitespace-nowrap">
                  <div className="text-[10px] font-mono text-[var(--ink)]/60 flex items-center gap-1"><MapPin className="h-2.5 w-2.5" />{h.city}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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
