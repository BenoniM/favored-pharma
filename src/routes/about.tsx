import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Heart, Globe, ShieldCheck, Sparkles, Building2, Rocket, Stethoscope, Snowflake, Package, Network } from "lucide-react";
import { Reveal, PageHero, SectionLabel, fadeUp, AnimatedHeadline } from "@/components/site";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Favored PLC — Two Decades of Healthcare Distribution" },
      { name: "description", content: "How Favored PLC became one of the most trusted pharmaceutical distributors in the region." },
      { property: "og:title", content: "About Favored PLC" },
      { property: "og:description", content: "Two decades delivering medicine, equipment, and trust." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const timeline = [
  { year: "2004", title: "Founded in Addis Ababa", body: "Started as a single-warehouse importer of essential medicines.", icon: Building2, metric: "1", metricLabel: "Warehouse" },
  { year: "2009", title: "First regional expansion", body: "Opened distribution hubs in Bahir Dar and Hawassa to serve regional hospitals.", icon: Network, metric: "3", metricLabel: "Hubs" },
  { year: "2014", title: "Medical equipment division", body: "Began direct distribution agreements with global OEMs.", icon: Stethoscope, metric: "40+", metricLabel: "OEM partners" },
  { year: "2018", title: "WHO-GMP alignment", body: "Cold-chain logistics validated. ISO 9001:2015 certification achieved.", icon: Snowflake, metric: "2-8°C", metricLabel: "Chain validated" },
  { year: "2022", title: "1,000+ SKU milestone", body: "Catalog grows past one thousand medical products in active distribution.", icon: Package, metric: "1,000+", metricLabel: "Products" },
  { year: "2026", title: "Nationwide today", body: "Six regional hubs, 500+ healthcare partners, one promise.", icon: Rocket, metric: "500+", metricLabel: "Partners" },
];

const values = [
  { icon: Heart, t: "Patient First", d: "Every shipment ends with a human being. We act like it." },
  { icon: ShieldCheck, t: "Uncompromising Quality", d: "We refuse what we wouldn't give our own family." },
  { icon: Globe, t: "Open Sourcing", d: "Full chain-of-custody. Country of origin disclosed for every lot." },
  { icon: Sparkles, t: "Always Improving", d: "We measure ourselves on patient outcomes, not invoices." },
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
      <PageHero
        kicker="About Favored PLC"
        variant="pulse"
        title={<>Healthcare is <span className="text-[var(--brand)]">trust</span>, delivered.</>}
        lead="For more than twenty years, we have moved medicine across the country with one obsession: the patient on the other end of every box."
      />

      {/* Editorial split */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-32">
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl">From one warehouse to a national network.</h2>
          </Reveal>
          <div className="lg:col-span-7 space-y-6 text-[var(--ink)]/75 text-lg leading-relaxed">
            <Reveal><p>Favored PLC was founded on a simple belief: a healthcare system is only as strong as the supply chain behind it. When a hospital runs out of an essential medicine, the failure is not pharmaceutical — it is logistical.</p></Reveal>
            <Reveal delay={0.05}><p>We started with one warehouse, a handful of import licences, and a long list of hospitals that had been let down. Two decades later, we serve over 500 partners across the country, and the principle has not changed.</p></Reveal>
            <Reveal delay={0.1}><p className="font-display text-3xl text-[var(--ink)] leading-[1.1]">"We don't sell boxes. We move outcomes."</p></Reveal>
          </div>
        </div>
      </section>

      {/* Big counters */}
      <section className="py-16 sm:py-24 bg-[var(--mist)]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[["20+","YEARS"],["500+","PARTNERS"],["1,000+","PRODUCTS"],["14","WAREHOUSES"]].map(([k, v], i) => (
            <Reveal key={v} delay={i * 0.05}>
              <div className="rounded-3xl bg-white border border-black/5 p-8 aspect-square flex flex-col justify-between hover:shadow-[var(--shadow-glow)] transition-shadow">
                <div className="font-mono text-xs text-[var(--ink)]/40">/0{i+1}</div>
                <div>
                  <div className="font-display text-6xl sm:text-7xl text-[var(--ink)]">{k}</div>
                  <div className="mt-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--brand)]">{v}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <EditorialTimeline />


      {/* Values */}
      <section className="py-24 bg-[var(--ink)] text-white relative overflow-hidden">
        <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-30" style={{ background: "var(--gradient-glow)" }} />
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

      {/* Leadership */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <Reveal className="max-w-3xl mb-16">
            <SectionLabel>Leadership</SectionLabel>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">The people behind the promise.</h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {leadership.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.05}>
                <div className="group">
                  <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-[var(--mist)] to-[var(--brand)]/15 border border-black/5 grid place-items-center overflow-hidden relative">
                    <div className="font-display text-7xl sm:text-8xl text-[var(--ink)]/30 group-hover:text-[var(--brand)] transition-colors">{p.init}</div>
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

      <section className="py-24 sm:py-32">
        <Reveal className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="font-display text-3xl sm:text-5xl">Want to work with us?</h2>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--brand)] text-white px-7 py-4 font-medium hover:bg-[var(--ink)] transition-colors shadow-[var(--shadow-glow)]">
            Get in touch <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}

function EditorialTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const driftX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-60, 60]);

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-gradient-to-b from-white via-[var(--mist)] to-white">
      {/* Giant drifting background word */}
      <motion.div
        aria-hidden
        style={{ x: driftX }}
        className="absolute top-1/2 -translate-y-1/2 left-0 right-0 font-display text-[22vw] leading-none text-[var(--brand)]/[0.05] select-none pointer-events-none whitespace-nowrap"
      >
        SINCE · 2004 · SINCE · 2004
      </motion.div>

      {/* Decorative blueprint grid */}
      <div aria-hidden className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl mb-20">
          <SectionLabel>Editorial Timeline</SectionLabel>
          <AnimatedHeadline text="Two decades, one direction." as="h2"
            className="mt-4 font-display text-3xl lg:text-4xl leading-[0.95]" />
          <p className="mt-6 text-[var(--ink)]/65 max-w-xl text-lg">
            A short biography of the boxes we've moved, the partners we've earned, and the standards we've kept.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-white border border-black/5 px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[var(--brand)] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink)]/60">
              {timeline.length} chapters · scroll to unfold
            </span>
          </div>
        </Reveal>

        <div ref={ref} className="relative">
          {/* Center rail (desktop) / left rail (mobile) */}
          <div className="absolute lg:left-1/2 left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--border)] to-transparent lg:-translate-x-px" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute lg:left-1/2 left-6 top-0 w-[3px] -translate-x-[1px] rounded-full bg-gradient-to-b from-[var(--brand)] via-[var(--brand)] to-[var(--brand)]/0 shadow-[0_0_20px_var(--brand)]"
          />

          <ul className="space-y-16 sm:space-y-24">
            {timeline.map((t, i) => {
              const right = i % 2 === 1;
              const Icon = t.icon;
              return (
                <li key={t.year} className="relative">
                  {/* Node on rail */}
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute lg:left-1/2 left-6 top-8 -translate-x-1/2 z-10"
                  >
                    <div className="relative h-12 w-12 rounded-full bg-white border-2 border-[var(--brand)] grid place-items-center shadow-[0_8px_24px_-8px_var(--brand)]">
                      <Icon className="h-5 w-5 text-[var(--brand)]" strokeWidth={2} />
                      <span aria-hidden className="absolute inset-0 rounded-full border-2 border-[var(--brand)]/40 animate-ping" />
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-full ml-2 hidden lg:block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]/40 whitespace-nowrap">
                      {right ? "" : `chapter · 0${i + 1}`}
                    </div>
                  </motion.div>

                  {/* Card row */}
                  <div className={`grid lg:grid-cols-2 gap-6 lg:gap-16 items-center ${right ? "lg:[&>*:first-child]:order-2" : ""}`}>
                    {/* Side A — year + metric */}
                    <motion.div
                      initial={{ opacity: 0, x: right ? 60 : -60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className={`pl-20 lg:pl-0 ${right ? "lg:pl-20 lg:text-left" : "lg:pr-20 lg:text-right"}`}
                    >
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink)]/40">
                        chapter / 0{i + 1}
                      </div>
                      <div className="mt-2 font-display text-7xl sm:text-8xl lg:text-[120px] text-[var(--ink)] leading-[0.85] tracking-[-0.04em]">
                        <span className="text-stroke">{t.year.slice(0, 2)}</span>
                        <span className="text-[var(--brand)]">{t.year.slice(2)}</span>
                      </div>
                      <div className={`mt-5 inline-flex items-baseline gap-3 rounded-2xl bg-white border border-black/5 px-5 py-3 shadow-sm`}>
                        <span className="font-display text-3xl text-[var(--brand)]">{t.metric}</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]/60">{t.metricLabel}</span>
                      </div>
                    </motion.div>

                    {/* Side B — narrative card */}
                    <motion.div
                      initial={{ opacity: 0, x: right ? -60 : 60, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className={`pl-20 lg:pl-0 ${right ? "lg:pr-20" : "lg:pl-20"}`}
                    >
                      <div className="group relative rounded-3xl bg-white border border-black/5 p-7 sm:p-9 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-shadow overflow-hidden">
                        {/* corner stripe */}
                        <div aria-hidden className="absolute -top-px -left-px h-12 w-12 rounded-tl-3xl border-t-2 border-l-2 border-[var(--brand)]" />
                        <div aria-hidden className="absolute -bottom-px -right-px h-12 w-12 rounded-br-3xl border-b-2 border-r-2 border-[var(--brand)]/40" />

                        <AnimatedHeadline
                          text={t.title}
                          as="h3"
                          className="font-display text-xl sm:text-2xl lg:text-4xl text-[var(--ink)] leading-[1.1]"
                        />
                        <motion.p
                          initial={{ opacity: 0, y: 14 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.7, delay: 0.35 }}
                          className="mt-4 text-[var(--ink)]/65 text-base sm:text-lg leading-relaxed"
                        >
                          {t.body}
                        </motion.p>

                        {/* progress bar accent */}
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          style={{ originX: 0 }}
                          className="mt-6 h-[3px] rounded-full bg-gradient-to-r from-[var(--brand)] via-[var(--brand)]/60 to-transparent"
                        />
                      </div>
                    </motion.div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* End cap */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mt-16 flex justify-center"
          >
            <div className="lg:ml-0 ml-12 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] text-white px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em]">
              <Sparkles className="h-3.5 w-3.5 text-[var(--brand)]" />
              the story continues
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


