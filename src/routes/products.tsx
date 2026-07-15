import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useCallback } from "react";
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
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/site";

// ─── Search schema ─────────────────────────────────────────────────────────────
const categories = [
  "All",
  "Prescription Medicines",
  "OTC Products",
  "Medical Devices",
  "Diagnostic Equipment",
  "Laboratory Reagents",
  "Hospital Furniture",
  "Medical Consumables",
  "Emergency Care Supplies",
] as const;
type Category = (typeof categories)[number];

const productSearchSchema = z.object({
  cat: fallback(z.enum(categories), "All" as Category).default("All"),
  q: fallback(z.string(), "").default(""),
  page: fallback(z.number(), 1).default(1),
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

// ─── Data ──────────────────────────────────────────────────────────────────────
const catIcons: Record<Category, React.ElementType> = {
  "All": Pill,
  "Prescription Medicines": Pill,
  "OTC Products": Thermometer,
  "Medical Devices": Activity,
  "Diagnostic Equipment": Microscope,
  "Laboratory Reagents": FlaskConical,
  "Hospital Furniture": Building2,
  "Medical Consumables": Syringe,
  "Emergency Care Supplies": HeartPulse,
};

type Product = {
  name: string;
  category: Category;
  manufacturer: string;
  origin: string;
  desc: string;
  tags?: string[];
};

const allProducts: Product[] = [
  // Prescription Medicines
  { name: "Amoxicillin 500mg Capsule", category: "Prescription Medicines", manufacturer: "ILKO", origin: "Turkey", desc: "Broad-spectrum penicillin antibiotic — Anti-Infection", tags: ["In Stock", "Featured"] },
  { name: "Atorvastatin 20mg Tablet", category: "Prescription Medicines", manufacturer: "BIOFARM", origin: "Poland", desc: "HMG-CoA reductase inhibitor — Cardiovascular", tags: ["In Stock"] },
  { name: "Metformin 850mg Tablet", category: "Prescription Medicines", manufacturer: "ILKO", origin: "Turkey", desc: "Biguanide anti-diabetic — Endocrinology & Metabolism", tags: ["In Stock", "Featured"] },
  { name: "Amlodipine 5mg Tablet", category: "Prescription Medicines", manufacturer: "BIOFARM", origin: "Poland", desc: "Calcium channel blocker — Cardiovascular", tags: ["In Stock"] },
  { name: "Metoprolol Succinate 25mg CR", category: "Prescription Medicines", manufacturer: "ILKO", origin: "Turkey", desc: "Beta-1 selective blocker — Cardiovascular", tags: ["In Stock"] },
  { name: "Metoprolol Succinate 50mg CR", category: "Prescription Medicines", manufacturer: "ILKO", origin: "Turkey", desc: "Beta-1 selective blocker — Cardiovascular", tags: ["In Stock"] },
  { name: "Rosuvastatin 10mg Tablet", category: "Prescription Medicines", manufacturer: "ILKO", origin: "Turkey", desc: "Statin lipid-lowering agent — Cardiovascular", tags: ["In Stock"] },
  { name: "Pantoprazole 40mg EC Tablet", category: "Prescription Medicines", manufacturer: "ILKO", origin: "Turkey", desc: "Proton pump inhibitor — Gastroenterology", tags: ["In Stock", "Featured"] },
  { name: "Cefixime 400mg FCT", category: "Prescription Medicines", manufacturer: "ILKO", origin: "Turkey", desc: "Third-generation cephalosporin — Anti-Infection", tags: ["In Stock"] },
  { name: "Meloxicam 15mg Tablet", category: "Prescription Medicines", manufacturer: "BIOFARM", origin: "Poland", desc: "Selective COX-2 inhibitor NSAID — Rheumatology & Pain", tags: ["In Stock"] },
  { name: "Desloratadine 5mg Tablet", category: "Prescription Medicines", manufacturer: "ILKO", origin: "Turkey", desc: "Non-sedating antihistamine — Anti-Allergy", tags: ["In Stock"] },
  { name: "Valsartan + Hydrochlorothiazide 160/12.5mg", category: "Prescription Medicines", manufacturer: "ILKO", origin: "Turkey", desc: "ARB + diuretic combination — Cardiovascular", tags: ["In Stock"] },
  { name: "Vildagliptin + Metformin 50/850mg", category: "Prescription Medicines", manufacturer: "ILKO", origin: "Turkey", desc: "DPP-4 inhibitor combination — Endocrinology", tags: ["In Stock"] },
  { name: "Tadalafil 20mg Tablet", category: "Prescription Medicines", manufacturer: "ILKO", origin: "Turkey", desc: "PDE-5 inhibitor — Urology & Sexual Health", tags: ["In Stock"] },
  { name: "Sodium Hyaluronate 10mg/ml Injection", category: "Prescription Medicines", manufacturer: "Virchow", origin: "India", desc: "Intra-articular viscosupplement — Rheumatology & Orthopedics", tags: ["In Stock"] },
  { name: "Doxylamine + Pyridoxine DR Tablet", category: "Prescription Medicines", manufacturer: "ILKO", origin: "Turkey", desc: "Anti-emetic combination — OBGYN", tags: ["In Stock"] },

  // OTC Products
  { name: "Paracetamol 500mg Tablet", category: "OTC Products", manufacturer: "Various", origin: "Ethiopia", desc: "Analgesic & antipyretic — Pain & Fever", tags: ["In Stock", "Featured"] },
  { name: "Vitamin C 1000mg Effervescent", category: "OTC Products", manufacturer: "Various", origin: "Ethiopia", desc: "Antioxidant supplement — Vitamins & Supplements", tags: ["In Stock"] },
  { name: "Antacid Suspension 200ml", category: "OTC Products", manufacturer: "Various", origin: "Ethiopia", desc: "Aluminium hydroxide + magnesium hydroxide — GI Relief", tags: ["In Stock"] },
  { name: "Oral Rehydration Salts Sachet", category: "OTC Products", manufacturer: "Various", origin: "Ethiopia", desc: "Electrolyte replacement — Hydration", tags: ["In Stock"] },
  { name: "Multivitamin + Mineral Tablet", category: "OTC Products", manufacturer: "Various", origin: "Ethiopia", desc: "Daily nutritional supplement — Vitamins & Supplements", tags: ["In Stock"] },

  // Medical Devices
  { name: "Digital Blood Pressure Monitor (Upper Arm)", category: "Medical Devices", manufacturer: "BOSCH+SOHN", origin: "Germany", desc: "Oscillometric BP measurement with memory — Diagnostic Equipment", tags: ["In Stock", "Featured"] },
  { name: "Adult & Paediatric Stethoscope", category: "Medical Devices", manufacturer: "Luxamed", origin: "Germany", desc: "Dual-head acoustic stethoscope — Auscultation", tags: ["In Stock"] },
  { name: "Cardiology Stethoscope", category: "Medical Devices", manufacturer: "Luxamed", origin: "Germany", desc: "High-sensitivity cardiology stethoscope — Auscultation", tags: ["In Stock", "New"] },
  { name: "Pulse Oximeter (Fingertip)", category: "Medical Devices", manufacturer: "Various", origin: "Germany", desc: "SpO2 and pulse rate measurement — Monitoring", tags: ["In Stock"] },
  { name: "ECG Machine (12-Lead)", category: "Medical Devices", manufacturer: "Various", origin: "Germany", desc: "Hospital-grade 12-lead electrocardiograph — Cardiology", tags: ["In Stock", "Featured"] },

  // Diagnostic Equipment
  { name: "Blood Glucose Test Kit", category: "Diagnostic Equipment", manufacturer: "Fia BioMed", origin: "Germany", desc: "Self-monitoring blood glucose system — Endocrinology", tags: ["In Stock", "Featured"] },
  { name: "Immunofluorescence Quantitative Analyzer", category: "Diagnostic Equipment", manufacturer: "Getein Biotech", origin: "China", desc: "Point-of-care fluorescence immunoassay analyzer — Laboratory", tags: ["In Stock", "New"] },
  { name: "Hematology Analyzer (3-Part)", category: "Diagnostic Equipment", manufacturer: "Various", origin: "China", desc: "CBC with 3-part WBC differential — Hematology", tags: ["In Stock"] },
  { name: "Chemistry Analyzer (Semi-Auto)", category: "Diagnostic Equipment", manufacturer: "Various", origin: "China", desc: "Photometric clinical chemistry analysis — Biochemistry", tags: ["In Stock"] },

  // Laboratory Reagents
  { name: "ELISA Kit — Hepatitis B Surface Antigen", category: "Laboratory Reagents", manufacturer: "Various", origin: "USA", desc: "Enzyme-linked immunosorbent assay — Serology", tags: ["In Stock", "Cold Chain"] },
  { name: "PCR Master Mix (2×)", category: "Laboratory Reagents", manufacturer: "Various", origin: "USA", desc: "Ready-to-use PCR amplification mix — Molecular Biology", tags: ["In Stock", "Cold Chain", "Featured"] },
  { name: "PBS Buffer Tablets", category: "Laboratory Reagents", manufacturer: "Various", origin: "Germany", desc: "Phosphate buffered saline tablets — General Laboratory", tags: ["In Stock"] },
  { name: "Gram Stain Reagent Kit", category: "Laboratory Reagents", manufacturer: "Various", origin: "Germany", desc: "Complete gram staining reagent set — Microbiology", tags: ["In Stock"] },
  { name: "HIV Rapid Test (Whole Blood/Serum)", category: "Laboratory Reagents", manufacturer: "Various", origin: "South Korea", desc: "One-step immunochromatographic assay — Serology", tags: ["In Stock"] },
  { name: "Malaria RDT (Pf/Pan)", category: "Laboratory Reagents", manufacturer: "Various", origin: "South Korea", desc: "Rapid detection of Plasmodium antigens — Parasitology", tags: ["In Stock", "Featured"] },

  // Hospital Furniture
  { name: "Manual ICU Bed (5-Function)", category: "Hospital Furniture", manufacturer: "Various", origin: "China", desc: "5-function manual patient bed with side rails — Intensive Care", tags: ["In Stock"] },
  { name: "Bedside Cabinet (Lockable)", category: "Hospital Furniture", manufacturer: "Various", origin: "China", desc: "Powder-coated steel bedside storage — Ward Equipment", tags: ["In Stock"] },
  { name: "Stainless Steel Instrument Trolley", category: "Hospital Furniture", manufacturer: "Various", origin: "China", desc: "2-tier stainless steel procedure trolley — Theatre & Ward", tags: ["In Stock", "Featured"] },
  { name: "Fowler Bed (Electric, 3-Function)", category: "Hospital Furniture", manufacturer: "Various", origin: "China", desc: "Electric 3-function hospital bed — General Ward", tags: ["In Stock"] },
  { name: "Overbed Table (Height Adjustable)", category: "Hospital Furniture", manufacturer: "Various", origin: "China", desc: "Swivel-top height-adjustable overbed table — Ward Equipment", tags: ["In Stock"] },

  // Medical Consumables
  { name: "Surgical Gloves (Latex, Sterile) — Size 7.5", category: "Medical Consumables", manufacturer: "SMI", origin: "Belgium", desc: "Sterile powdered surgical gloves — Infection Control", tags: ["In Stock", "Featured"] },
  { name: "Disposable Syringes (5ml, 23G)", category: "Medical Consumables", manufacturer: "Various", origin: "India", desc: "Luer-lock disposable syringe — Injectable Administration", tags: ["In Stock"] },
  { name: "IV Cannula (18G)", category: "Medical Consumables", manufacturer: "Various", origin: "India", desc: "Short peripheral IV catheter — Vascular Access", tags: ["In Stock"] },
  { name: "Surgical Gauze Swabs (10×10cm, Pack 100)", category: "Medical Consumables", manufacturer: "Various", origin: "Ethiopia", desc: "Sterile absorbent gauze swabs — Wound Care", tags: ["In Stock"] },
  { name: "Disposable Surgical Mask (3-Ply, Box 50)", category: "Medical Consumables", manufacturer: "Various", origin: "China", desc: "Type IIR fluid-resistant surgical mask — Infection Control", tags: ["In Stock"] },
  { name: "N95 Respirator (FFP2, Box 20)", category: "Medical Consumables", manufacturer: "Various", origin: "China", desc: "NIOSH-approved particulate respirator — Infection Control", tags: ["In Stock", "Featured"] },
  { name: "Absorbable Suture — PGA 2/0 (Round, 75cm)", category: "Medical Consumables", manufacturer: "SMI", origin: "Belgium", desc: "Polyglycolic acid absorbable suture — Surgery", tags: ["In Stock"] },
  { name: "Non-Absorbable Suture — Silk 3/0 (Cutting)", category: "Medical Consumables", manufacturer: "SMI", origin: "Belgium", desc: "Braided silk non-absorbable suture — Surgery", tags: ["In Stock"] },
  { name: "Bone Wax", category: "Medical Consumables", manufacturer: "SMI", origin: "Belgium", desc: "Sterile haemostatic bone wax — Surgery", tags: ["In Stock"] },
  { name: "Polypropylene Surgical Mesh (7.5×15cm)", category: "Medical Consumables", manufacturer: "SMI", origin: "Belgium", desc: "Macroporous monofilament hernia mesh — Surgery", tags: ["In Stock"] },

  // Emergency Care Supplies
  { name: "Automated External Defibrillator (AED)", category: "Emergency Care Supplies", manufacturer: "Various", origin: "Germany", desc: "Semi-automatic defibrillator with CPR feedback — Emergency", tags: ["In Stock", "Featured"] },
  { name: "Normal Saline 0.9% IV Fluid (500ml)", category: "Emergency Care Supplies", manufacturer: "Various", origin: "Ethiopia", desc: "Isotonic crystalloid IV fluid — Resuscitation", tags: ["In Stock"] },
  { name: "Ringer's Lactate IV Fluid (500ml)", category: "Emergency Care Supplies", manufacturer: "Various", origin: "Ethiopia", desc: "Balanced crystalloid IV fluid — Resuscitation", tags: ["In Stock", "Featured"] },
  { name: "Emergency Resuscitation Kit", category: "Emergency Care Supplies", manufacturer: "Various", origin: "Germany", desc: "Complete crash-cart resuscitation set — Emergency", tags: ["In Stock"] },
  { name: "Epinephrine 1mg/ml Injection", category: "Emergency Care Supplies", manufacturer: "Various", origin: "India", desc: "First-line anaphylaxis & cardiac arrest medication — Emergency", tags: ["In Stock", "Cold Chain"] },
  { name: "Trauma Dressing Kit (Large)", category: "Emergency Care Supplies", manufacturer: "Various", origin: "Germany", desc: "Haemostatic wound packing & pressure bandage — Trauma", tags: ["In Stock"] },
];

const ITEMS_PER_PAGE = 12;

// ─── Component ─────────────────────────────────────────────────────────────────
function Products() {
  const { cat: activeCat, q: urlQ, page: urlPage } = Route.useSearch();
  const navigate = useNavigate({ from: "/products" });
  const [query, setQuery] = useState(urlQ ?? "");
  const [expanded, setExpanded] = useState<string | null>(null);

  const setActiveCat = useCallback(
    (c: Category) => {
      navigate({ search: () => ({ cat: c, q: query, page: 1 }), replace: true, resetScroll: false });
      setExpanded(null);
    },
    [navigate, query],
  );

  const setPage = useCallback(
    (p: number) => {
      navigate({ search: (prev: { cat: Category; q: string; page: number }) => ({ ...prev, page: p }), replace: true, resetScroll: false });
      document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
    },
    [navigate],
  );

  const filtered = useMemo(
    () =>
      allProducts.filter((p) => {
        const matchCat = activeCat === "All" || p.category === activeCat;
        const matchQ = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.desc.toLowerCase().includes(query.toLowerCase());
        return matchCat && matchQ;
      }),
    [activeCat, query],
  );

  // Group for headers
  const grouped = useMemo(() => {
    const map = new Map<Category, Product[]>();
    for (const p of filtered) {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category)!.push(p);
    }
    return map;
  }, [filtered]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(urlPage ?? 1, totalPages);
  const paginatedFiltered = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <main className="bg-white text-[var(--ink)] overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
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
          <video autoPlay muted loop playsInline className="w-full h-[30vh] sm:h-[70vh] lg:h-[80vh] object-cover">
            <source src="https://www.pexels.com/download/video/7033919/" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* ── Catalog ──────────────────────────────────────────────────────────── */}
      <section id="catalog-section" className="pb-32 bg-white">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">

          {/* Filters Row */}
          <div className="sticky top-16 z-20 bg-white/90 backdrop-blur-md border-b border-black/5 py-5 -mx-6 sm:-mx-8 lg:-mx-12 px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => {
                  const Icon = catIcons[c];
                  const isActive = activeCat === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setActiveCat(c)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 border ${
                        isActive
                          ? "bg-[var(--brand)] text-white border-[var(--brand)] shadow-md"
                          : "bg-white text-[var(--ink)]/70 border-black/10 hover:border-[var(--brand)]/50 hover:text-[var(--ink)]"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {c}
                    </button>
                  );
                })}
              </div>

              {/* Search */}
              <div className="relative shrink-0 w-full sm:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--ink)]/40" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    navigate({ search: (prev: { cat: Category; q: string; page: number }) => ({ ...prev, q: e.target.value, page: 1 }), replace: true, resetScroll: false });
                  }}
                  placeholder="Search products..."
                  className="w-full rounded-full bg-[var(--mist)] border border-black/5 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[var(--brand)] transition-colors placeholder:text-[var(--ink)]/40"
                />
              </div>
            </div>
          </div>

          {/* Product list */}
          <div className="mt-8">
            {filtered.length === 0 ? (
              <div className="py-32 text-center rounded-3xl border border-dashed border-black/10 mt-4">
                <Sparkles className="h-6 w-6 text-[var(--brand)] mx-auto" />
                <p className="mt-3 text-sm text-[var(--ink)]/60">No products match — try a different filter or search term.</p>
              </div>
            ) : (
              <>
                {/* Group headers + rows */}
                {(() => {
                  const rows: React.ReactNode[] = [];
                  let lastCat = "";
                  for (const product of paginatedFiltered) {
                    if (product.category !== lastCat) {
                      lastCat = product.category;
                      const Icon = catIcons[product.category];
                      rows.push(
                        <div key={`hdr-${product.category}`} className="mt-10 mb-1 flex items-center gap-3">
                          <div className="h-8 w-8 rounded-xl bg-[var(--brand)]/10 grid place-items-center">
                            <Icon className="h-4 w-4 text-[var(--brand)]" />
                          </div>
                          <h2 className="font-display text-2xl sm:text-3xl text-[var(--ink)]">{product.category}</h2>
                          <span className="ml-2 font-mono text-xs text-[var(--ink)]/40 mt-1">
                            {grouped.get(product.category)?.length ?? 0} items
                          </span>
                        </div>
                      );
                      rows.push(<div key={`div-${product.category}`} className="h-px w-full bg-black/8 mb-0" />);
                    }

                    const isOpen = expanded === product.name;
                    rows.push(
                      <Reveal key={product.name}>
                        <div className="border-b border-black/8">
                          <button
                            onClick={() => setExpanded(isOpen ? null : product.name)}
                            className="w-full text-left flex items-center justify-between gap-4 py-5 px-2 group hover:bg-[var(--mist)] transition-colors rounded-2xl"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0">
                              <span className="font-medium text-[var(--ink)] text-base sm:text-lg leading-snug">{product.name}</span>
                              <div className="flex flex-wrap gap-1.5">
                                {product.tags?.map((tag) => (
                                  <span
                                    key={tag}
                                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wide border ${
                                      tag === "Featured"
                                        ? "bg-[var(--brand)]/10 text-[var(--brand)] border-[var(--brand)]/20"
                                        : tag === "Cold Chain"
                                          ? "bg-blue-50 text-blue-600 border-blue-200"
                                          : tag === "New"
                                            ? "bg-amber-50 text-amber-600 border-amber-200"
                                            : "bg-black/5 text-[var(--ink)]/50 border-transparent"
                                    }`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div
                              className={`shrink-0 h-8 w-8 rounded-full grid place-items-center transition-all duration-300 border ${
                                isOpen
                                  ? "bg-[var(--brand)] border-[var(--brand)] text-white rotate-180"
                                  : "bg-white border-black/10 text-[var(--ink)]/50 group-hover:border-[var(--brand)]/40"
                              }`}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </div>
                          </button>

                          {/* Expanded details */}
                          <div
                            className={`grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                          >
                            <div className="overflow-hidden">
                              <div className="px-4 pb-6 pt-2 rounded-2xl bg-[var(--mist)] mx-2 mb-3">
                                <ul className="space-y-2.5">
                                  {[
                                    ["Manufacturer", product.manufacturer],
                                    ["Country of Origin", product.origin],
                                    ["Description", product.desc],
                                  ].map(([label, value]) => (
                                    <li key={label} className="flex items-start gap-3 text-sm">
                                      <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-[var(--brand)] shrink-0" />
                                      <span className="text-[var(--ink)]/60 min-w-28 shrink-0">{label}</span>
                                      <span className="text-[var(--ink)] font-medium">{value}</span>
                                    </li>
                                  ))}
                                </ul>
                                <Link
                                  to="/contact"
                                  onClick={(e) => e.stopPropagation()}
                                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--brand)] hover:underline"
                                >
                                  Request a quote <ArrowRight className="h-3 w-3" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    );
                  }
                  return rows;
                })()}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-14">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setPage(currentPage - 1)}
                      className="h-10 w-10 rounded-full border border-black/10 grid place-items-center hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`h-10 w-10 rounded-full text-sm font-medium transition-all ${
                            p === currentPage
                              ? "bg-[var(--brand)] text-white shadow-md"
                              : "border border-black/10 text-[var(--ink)]/60 hover:border-[var(--brand)]/50"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setPage(currentPage + 1)}
                      className="h-10 w-10 rounded-full border border-black/10 grid place-items-center hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Featured banner ───────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-[var(--ink)] text-white">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--brand)]">Featured This Quarter</span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">
              Cold-chain biologics, now in regional stock.
            </h2>
            <p className="mt-6 text-white/70 leading-relaxed max-w-md">
              Insulin, vaccines, and biologic therapies are now warehoused regionally, slashing lead times from days to hours for cold-chain orders.
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
                ["Insulin Glargine", "100 IU/ml", "2–8°C"],
                ["Hepatitis B Vaccine", "10 dose vial", "2–8°C"],
                ["Erythropoietin", "4000 IU", "2–8°C"],
                ["Influenza Vaccine", "0.5 ml", "2–8°C"],
              ].map(([n, d, t]) => (
                <div key={n} className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
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
