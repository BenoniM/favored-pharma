import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useCallback, type KeyboardEvent } from "react";
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from "framer-motion";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import {
  Pill, Thermometer, Activity, Microscope, FlaskConical, Building2,
  Syringe, HeartPulse, ArrowRight, Search, Sparkles,
} from "lucide-react";
import { Reveal, PageHero, SectionLabel } from "@/components/site";

const filters = ["All", "In Stock", "Cold Chain", "New", "Featured"] as const;
type Filter = typeof filters[number];

const productSearchSchema = z.object({
  filter: fallback(z.enum(filters), "All" as Filter).default("All"),
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/products")({
  validateSearch: zodValidator(productSearchSchema),
  head: () => ({
    meta: [
      { title: "Products — Favored PLC Catalog" },
      { name: "description", content: "Browse 1,000+ pharmaceutical and medical products across eight categories." },
      { property: "og:title", content: "Products — Favored PLC" },
      { property: "og:description", content: "Eight categories. One reliable partner." },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: Products,
});

type Cat = {
  id: string; t: string; count: number; i: any; e: string; size: "lg" | "md" | "sm";
  tags: string[]; tagline: string; sample: string[];
};

const categories: Cat[] = [
  { id: "rx",  t: "Prescription Medicines",  count: 412, i: Pill,         e: "💊", size: "lg", tags: ["Rx","In Stock","Featured"], tagline: "Antibiotics, cardiovascular, oncology and beyond.", sample: ["Amoxicillin 500mg","Atorvastatin 20mg","Metformin 850mg"] },
  { id: "otc", t: "OTC Products",            count: 188, i: Thermometer,  e: "🧴", size: "sm", tags: ["OTC","In Stock"], tagline: "Trusted pharmacy-shelf staples.", sample: ["Paracetamol","Vitamin C 1g","Antacid syrup"] },
  { id: "dev", t: "Medical Devices",         count:  96, i: Activity,     e: "🩺", size: "md", tags: ["Devices","Featured"], tagline: "Monitoring, imaging, surgical.", sample: ["BP monitors","Pulse oximeters","ECG machines"] },
  { id: "dia", t: "Diagnostic Equipment",    count:  74, i: Microscope,   e: "🔬", size: "md", tags: ["Devices","New"], tagline: "Lab-grade diagnostics for every tier.", sample: ["Microscopes","Hematology analyzers","X-ray viewers"] },
  { id: "lab", t: "Laboratory Reagents",     count: 238, i: FlaskConical, e: "🧪", size: "lg", tags: ["Lab","Cold Chain","In Stock"], tagline: "Calibrated reagents, lot-tracked.", sample: ["ELISA kits","PCR mixes","Buffers"] },
  { id: "fur", t: "Hospital Furniture",      count:  52, i: Building2,    e: "🛏️", size: "sm", tags: ["Furniture"], tagline: "Beds, trolleys, theatre tables.", sample: ["ICU beds","Bedside cabinets","Stretchers"] },
  { id: "con", t: "Medical Consumables",     count: 314, i: Syringe,      e: "💉", size: "md", tags: ["Consumables","In Stock","Featured"], tagline: "The everyday backbone of care.", sample: ["Syringes","Gloves","Surgical gauze"] },
  { id: "ec",  t: "Emergency Care Supplies", count: 121, i: HeartPulse,   e: "🚑", size: "md", tags: ["Emergency","Cold Chain"], tagline: "Crash-cart, ambulance & trauma.", sample: ["Defibrillators","IV fluids","Resus kits"] },
];

function Products() {
  const { filter: active, q: urlQ } = Route.useSearch();
  const navigate = useNavigate({ from: "/products" });
  const [query, setQuery] = useState(urlQ ?? "");
  const [expanded, setExpanded] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const setActive = useCallback((f: Filter) => {
    navigate({ search: (prev: { filter: Filter; q: string }) => ({ ...prev, filter: f }), replace: true });
    setExpanded(null);
  }, [navigate]);

  const visible = useMemo(() => categories.filter((c) => {
    const matchFilter = active === "All" ? true : c.tags.includes(active);
    const matchQuery = !query ? true : (c.t + " " + c.sample.join(" ")).toLowerCase().includes(query.toLowerCase());
    return matchFilter && matchQuery;
  }), [active, query]);

  return (
    <main className="bg-white text-[var(--ink)] overflow-x-hidden">
      <PageHero
        kicker="Catalog"
        variant="pill"
        title={<>1,000+ products. <span className="text-[var(--brand)]">Eight categories.</span></>}
        lead="From a single emergency syringe to a fully stocked operating theatre — our catalog is built around what real hospitals, pharmacies, and labs actually run out of."
      >
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="flex glass rounded-full px-5 py-3 items-center gap-3 flex-1 max-w-md">
            <Search className="h-4 w-4 text-[var(--ink)]/50" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, brands, lot numbers…" className="flex-1 bg-transparent outline-none text-sm placeholder:text-[var(--ink)]/40" />
          </div>
          <LayoutGroup id="filters">
            <div role="tablist" aria-label="Product filters" className="flex gap-2 overflow-x-auto -mx-1 px-1">
              {filters.map((f) => {
                const selected = active === f;
                return (
                  <button
                    key={f}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(f)}
                    className={`relative shrink-0 rounded-full px-4 py-2 text-sm border transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${selected ? "text-white border-[var(--ink)]" : "bg-white text-[var(--ink)]/70 border-black/10 hover:border-[var(--brand)]"}`}>
                    {selected && (
                      <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-[var(--ink)] -z-0" transition={{ type: "spring", stiffness: 350, damping: 30 }} />
                    )}
                    <span className="relative z-10">{f}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>
        <div className="mt-4 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ink)]/50">
          {visible.length} {visible.length === 1 ? "category" : "categories"} — {visible.reduce((s, c) => s + c.count, 0)} SKUs
        </div>
      </PageHero>

      {/* Bento catalog */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <LayoutGroup id="bento">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[200px] sm:auto-rows-[230px] gap-3 sm:gap-4"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {visible.map((c, i) => {
                    const isExpanded = expanded === c.id;
                    const baseSpan = c.size === "lg" ? "lg:col-span-2 lg:row-span-2" : c.size === "md" ? "row-span-2" : "";
                    const span = isExpanded ? "col-span-2 lg:col-span-2 row-span-2" : baseSpan;
                    const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setExpanded(isExpanded ? null : c.id);
                      } else if (e.key === "Escape" && isExpanded) {
                        setExpanded(null);
                      }
                    };
                    return (
                      <motion.div
                        key={c.id}
                        layout
                        role="button"
                        tabIndex={0}
                        aria-expanded={isExpanded}
                        aria-label={`${c.t}, ${c.count} SKUs. ${c.tagline} Activate to ${isExpanded ? "collapse" : "expand"}.`}
                        title={`${c.t} — ${c.tagline}`}
                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                        transition={reduce ? { duration: 0.2 } : {
                          opacity: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                          y: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                          layout: { type: "spring", stiffness: 180, damping: 26, mass: 0.9 },
                        }}
                        whileHover={reduce ? undefined : { y: -4 }}
                        onClick={() => setExpanded(isExpanded ? null : c.id)}
                        onKeyDown={onKey}
                        className={`group relative rounded-3xl bg-gradient-to-br from-[var(--mist)] to-white border border-black/5 overflow-hidden cursor-pointer hover:shadow-[var(--shadow-glow)] transition-shadow outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${span}`}
                      >
                        <motion.div layout="position" className="absolute inset-0 p-6 flex flex-col justify-between">
                          <div className="flex items-start justify-between">
                            <div className="h-10 w-10 rounded-2xl bg-white border border-black/5 grid place-items-center shadow-[var(--shadow-card)]">
                              <c.i className="h-5 w-5 text-[var(--brand)]" aria-hidden />
                            </div>
                            <div className="font-mono text-[10px] text-[var(--ink)]/40">/{String(i+1).padStart(2,"0")}</div>
                          </div>
                          <motion.div aria-hidden layout
                            animate={{ scale: isExpanded ? 1.3 : 1, opacity: isExpanded ? 0.35 : 0.15, rotate: isExpanded ? -8 : 0 }}
                            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 22 }}
                            className="absolute top-1/2 right-4 -translate-y-1/2 text-7xl sm:text-8xl pointer-events-none">
                            {c.e}
                          </motion.div>
                          <motion.div layout="position" className="relative">
                            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--brand)]">{c.count} SKUs</div>
                            <h3 className="mt-1 font-display text-2xl sm:text-3xl leading-tight text-[var(--ink)]">{c.t}</h3>
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                                  style={{ overflow: "hidden" }}
                                >
                                  <p className="mt-3 text-sm text-[var(--ink)]/65 max-w-md">{c.tagline}</p>
                                  <div className="mt-3 flex flex-wrap gap-1.5">
                                    {c.sample.map((s) => (
                                      <span key={s} className="rounded-full bg-white border border-black/10 px-2.5 py-1 text-[10px] font-mono text-[var(--ink)]/70">{s}</span>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                            <Link to="/contact" onClick={(e) => e.stopPropagation()} className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[var(--ink)]/60 group-hover:text-[var(--brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] rounded-md">
                              Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" aria-hidden />
                            </Link>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </LayoutGroup>
          {visible.length === 0 && (
            <div className="mt-12 text-center py-20 rounded-3xl border border-dashed border-black/10">
              <Sparkles className="h-6 w-6 text-[var(--brand)] mx-auto" />
              <p className="mt-3 text-sm text-[var(--ink)]/60">No categories match — try a different filter.</p>
            </div>
          )}
        </div>
      </section>


      {/* Featured callout */}
      <section className="py-24 sm:py-32 bg-[var(--ink)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <SectionLabel>Featured This Quarter</SectionLabel>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl">Cold-chain biologics, now in regional stock.</h2>
            <p className="mt-6 text-white/70 leading-relaxed max-w-md">Insulin, vaccines, and biologic therapies are now warehoused regionally — slashing lead times from days to hours for cold-chain orders.</p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--brand)] text-white px-6 py-3 font-medium hover:bg-white hover:text-[var(--ink)] transition-colors">
              Request availability <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Insulin Glargine", "100 IU/ml", "2–8°C"],
                ["Hepatitis B Vaccine", "10 dose vial", "2–8°C"],
                ["Erythropoietin", "4000 IU", "2–8°C"],
                ["Influenza Vaccine", "0.5 ml", "2–8°C"],
              ].map(([n, d, t]) => (
                <div key={n} className="glass-dark rounded-3xl p-5">
                  <div className="text-xs font-mono text-[var(--brand)]">{t}</div>
                  <div className="mt-3 font-display text-lg">{n}</div>
                  <div className="text-xs text-white/50 mt-1">{d}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <Reveal className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <h2 className="font-display text-5xl sm:text-7xl">Need the full product list?</h2>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--brand)] text-white px-7 py-4 font-medium hover:bg-[var(--ink)] transition-colors shadow-[var(--shadow-glow)]">
            Request catalog (PDF) <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
