import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useCallback, type KeyboardEvent } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import {
  Pill,
  Thermometer,
  Activity,
  Microscope,
  FlaskConical,
  Building2,
  Syringe,
  HeartPulse,
  ArrowRight,
  Search,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Reveal, PageHero, SectionLabel } from "@/components/site";

const filters = ["All", "In Stock", "Cold Chain", "New", "Featured"] as const;
type Filter = (typeof filters)[number];

const productSearchSchema = z.object({
  filter: fallback(z.enum(filters), "All" as Filter).default("All"),
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/products")({
  validateSearch: zodValidator(productSearchSchema),
  head: () => ({
    meta: [
      { title: "Products - Favored PLC Catalog" },
      {
        name: "description",
        content: "Browse 1,000+ pharmaceutical and medical products across eight categories.",
      },
      { property: "og:title", content: "Products - Favored PLC" },
      { property: "og:description", content: "Eight categories. One reliable partner." },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: Products,
});

type Cat = {
  id: string;
  t: string;
  count: number;
  i: LucideIcon;
  e: string;
  size: "lg" | "md" | "sm";
  tags: string[];
  tagline: string;
  sample: string[];
};

const categories: Cat[] = [
  {
    id: "rx",
    t: "Prescription Medicines",
    count: 412,
    i: Pill,
    e: "RX",
    size: "lg",
    tags: ["Rx", "In Stock", "Featured"],
    tagline: "Antibiotics, cardiovascular, oncology and beyond.",
    sample: ["Amoxicillin 500mg", "Atorvastatin 20mg", "Metformin 850mg"],
  },
  {
    id: "otc",
    t: "OTC Products",
    count: 188,
    i: Thermometer,
    e: "OTC",
    size: "sm",
    tags: ["OTC", "In Stock"],
    tagline: "Trusted pharmacy-shelf staples.",
    sample: ["Paracetamol", "Vitamin C 1g", "Antacid syrup"],
  },
  {
    id: "dev",
    t: "Medical Devices",
    count: 96,
    i: Activity,
    e: "DEV",
    size: "md",
    tags: ["Devices", "Featured"],
    tagline: "Monitoring, imaging, surgical.",
    sample: ["BP monitors", "Pulse oximeters", "ECG machines"],
  },
  {
    id: "dia",
    t: "Diagnostic Equipment",
    count: 74,
    i: Microscope,
    e: "DX",
    size: "md",
    tags: ["Devices", "New"],
    tagline: "Lab-grade diagnostics for every tier.",
    sample: ["Microscopes", "Hematology analyzers", "X-ray viewers"],
  },
  {
    id: "lab",
    t: "Laboratory Reagents",
    count: 238,
    i: FlaskConical,
    e: "LAB",
    size: "lg",
    tags: ["Lab", "Cold Chain", "In Stock"],
    tagline: "Calibrated reagents, lot-tracked.",
    sample: ["ELISA kits", "PCR mixes", "Buffers"],
  },
  {
    id: "fur",
    t: "Hospital Furniture",
    count: 52,
    i: Building2,
    e: "FUR",
    size: "sm",
    tags: ["Furniture"],
    tagline: "Beds, trolleys, theatre tables.",
    sample: ["ICU beds", "Bedside cabinets", "Stretchers"],
  },
  {
    id: "con",
    t: "Medical Consumables",
    count: 314,
    i: Syringe,
    e: "CON",
    size: "md",
    tags: ["Consumables", "In Stock", "Featured"],
    tagline: "The everyday backbone of care.",
    sample: ["Syringes", "Gloves", "Surgical gauze"],
  },
  {
    id: "ec",
    t: "Emergency Care Supplies",
    count: 121,
    i: HeartPulse,
    e: "EMS",
    size: "md",
    tags: ["Emergency", "Cold Chain"],
    tagline: "Crash-cart, ambulance and trauma.",
    sample: ["Defibrillators", "IV fluids", "Resus kits"],
  },
];

function Products() {
  const { filter: active, q: urlQ } = Route.useSearch();
  const navigate = useNavigate({ from: "/products" });
  const [query, setQuery] = useState(urlQ ?? "");
  const [expanded, setExpanded] = useState<string | null>(null);

  const setActive = useCallback(
    (f: Filter) => {
      navigate({
        search: (prev: { filter: Filter; q: string }) => ({ ...prev, filter: f }),
        replace: true,
      });
      setExpanded(null);
    },
    [navigate],
  );

  const visible = useMemo(
    () =>
      categories.filter((c) => {
        const matchFilter = active === "All" ? true : c.tags.includes(active);
        const matchQuery = !query
          ? true
          : (c.t + " " + c.sample.join(" ")).toLowerCase().includes(query.toLowerCase());
        return matchFilter && matchQuery;
      }),
    [active, query],
  );

  return (
    <main className="bg-white text-[var(--ink)] overflow-x-hidden">
      <section className="bg-white pt-28 sm:pt-40 px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <h2 
            className="font-display text-[1.75rem] sm:text-[2.75rem] lg:text-[3.75rem] leading-[1.05] font-medium text-[#26221f] mb-6"
            style={{ letterSpacing: "-0.04em" }}
          >
            1,000+ products. <span className="text-[var(--brand)]">Eight categories.</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--ink)]/70 max-w-2xl mx-auto font-medium leading-relaxed">
            From a single emergency syringe to a fully stocked operating theatre, our catalog is built around what real hospitals, pharmacies, and labs actually run out of.
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
            <source src="https://www.pexels.com/download/video/7033919/" type="video/mp4" />
          </video>
        </div>

        <div className="mt-12 sm:mt-16 flex flex-col items-center gap-6 w-full max-w-4xl mx-auto px-4">
          <div className="flex glass rounded-full px-5 py-3 items-center gap-3 w-full max-w-2xl border border-black/10">
            <Search className="h-4 w-4 text-[var(--ink)]/50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands, lot numbers..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-[var(--ink)]/40 text-left"
            />
          </div>
          
          <div
            role="tablist"
            aria-label="Product filters"
            className="flex flex-wrap justify-center gap-2 sm:gap-3"
          >
            {filters.map((f) => {
              const selected = active === f;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(f)}
                  className={`relative rounded-full px-5 py-2 sm:py-2.5 text-sm border transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${selected ? "bg-[var(--ink)] text-white border-[var(--ink)] shadow-md" : "bg-white text-[var(--ink)]/70 border-black/10 hover:border-[var(--brand)]"}`}
                >
                  {f}
                </button>
              );
            })}
          </div>

          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ink)]/50 mt-2">
            {visible.length} {visible.length === 1 ? "category" : "categories"} -{" "}
            {visible.reduce((s, c) => s + c.count, 0)} SKUs
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[200px] sm:auto-rows-[230px] gap-3 sm:gap-4">
            {visible.map((c, i) => {
              const isExpanded = expanded === c.id;
              const baseSpan =
                c.size === "lg"
                  ? "lg:col-span-2 lg:row-span-2"
                  : c.size === "md"
                    ? "row-span-2"
                    : "";
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
                <Reveal key={c.id} delay={i * 0.03} className={span}>
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    aria-label={`${c.t}, ${c.count} SKUs. ${c.tagline} Activate to ${isExpanded ? "collapse" : "expand"}.`}
                    title={`${c.t} - ${c.tagline}`}
                    onClick={() => setExpanded(isExpanded ? null : c.id)}
                    onKeyDown={onKey}
                    className="group relative h-full rounded-3xl bg-gradient-to-br from-[var(--mist)] to-white border border-black/5 overflow-hidden cursor-pointer hover:shadow-[var(--shadow-glow)] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-white hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div className="h-10 w-10 rounded-2xl bg-white border border-black/5 grid place-items-center shadow-[var(--shadow-card)]">
                          <c.i className="h-5 w-5 text-[var(--brand)]" aria-hidden />
                        </div>
                        <div className="font-mono text-[10px] text-[var(--ink)]/40">
                          /{String(i + 1).padStart(2, "0")}
                        </div>
                      </div>
                      <div
                        aria-hidden
                        className={`absolute top-1/2 right-4 -translate-y-1/2 font-display text-5xl sm:text-6xl pointer-events-none text-[var(--brand)] transition-all duration-300 ${isExpanded ? "scale-125 opacity-20 -rotate-6" : "opacity-10"}`}
                      >
                        {c.e}
                      </div>
                      <div className="relative">
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--brand)]">
                          {c.count} SKUs
                        </div>
                        <h3 className="mt-1 font-display text-xl sm:text-2xl leading-tight text-[var(--ink)]">
                          {c.t}
                        </h3>
                        <div
                          className={`grid transition-[grid-template-rows,opacity] duration-300 ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                        >
                          <div className="overflow-hidden">
                            <p className="mt-3 text-sm text-[var(--ink)]/65 max-w-md">
                              {c.tagline}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {c.sample.map((s) => (
                                <span
                                  key={s}
                                  className="rounded-full bg-white border border-black/10 px-2.5 py-1 text-[10px] font-mono text-[var(--ink)]/70"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Link
                          to="/contact"
                          onClick={(e) => e.stopPropagation()}
                          className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[var(--ink)]/60 group-hover:text-[var(--brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] rounded-md"
                        >
                          Explore{" "}
                          <ArrowRight
                            className="h-3 w-3 transition-transform group-hover:translate-x-1"
                            aria-hidden
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          {visible.length === 0 && (
            <div className="mt-12 text-center py-20 rounded-3xl border border-dashed border-black/10">
              <Sparkles className="h-6 w-6 text-[var(--brand)] mx-auto" />
              <p className="mt-3 text-sm text-[var(--ink)]/60">
                No categories match - try a different filter.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-[var(--ink)] text-white">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <SectionLabel>Featured This Quarter</SectionLabel>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">
              Cold-chain biologics, now in regional stock.
            </h2>
            <p className="mt-6 text-white/70 leading-relaxed max-w-md">
              Insulin, vaccines, and biologic therapies are now warehoused regionally, slashing lead
              times from days to hours for cold-chain orders.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--brand)] text-white px-6 py-3 font-medium hover:bg-white hover:text-[var(--ink)] transition-colors"
            >
              Request availability <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Insulin Glargine", "100 IU/ml", "2-8C"],
                ["Hepatitis B Vaccine", "10 dose vial", "2-8C"],
                ["Erythropoietin", "4000 IU", "2-8C"],
                ["Influenza Vaccine", "0.5 ml", "2-8C"],
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
    </main>
  );
}
