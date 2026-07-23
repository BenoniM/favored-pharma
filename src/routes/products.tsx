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
  "Medicines",
  "Medical Supplies",
  "Medical Equipments",
  "Nutritional suppliments",
  "other Healthcare solutions",
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
        content: "Browse Favored PLC's pharmaceutical and healthcare products across five practical categories.",
      },
      { property: "og:title", content: "Products - Favored PLC" },
      { property: "og:description", content: "Five healthcare categories. One reliable partner." },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: Products,
});

// ─── Data ──────────────────────────────────────────────────────────────────────
const catIcons: Record<Category, React.ElementType> = {
  "All": Pill,
  "Medicines": Pill,
  "Medical Supplies": Syringe,
  "Medical Equipments": Activity,
  "Nutritional suppliments": HeartPulse,
  "other Healthcare solutions": FlaskConical,
};

type Product = {
  name: string;
  category: Category;
  manufacturer: string;
  origin: string;
  desc: string;
  tags?: string[];
};

type RawProduct = Omit<Product, "category"> & { category: string };

const rawProducts: RawProduct[] = [
  // ── Maternity ────────────────────────────────────────────────────────────────
  { name: "Ferrous Sulphate + Folic Acid Tablet", category: "Maternity", manufacturer: "ILKO", origin: "Turkey", desc: "Iron and folate supplement for pregnancy — Antenatal Care", tags: ["In Stock", "Featured"] },
  { name: "Oxytocin 10IU/ml Injection", category: "Maternity", manufacturer: "Virchow", origin: "India", desc: "Uterotonic agent for labour induction and PPH prevention — Obstetrics", tags: ["In Stock", "Cold Chain", "Featured"] },
  { name: "Misoprostol 200mcg Tablet", category: "Maternity", manufacturer: "ILKO", origin: "Turkey", desc: "Prostaglandin E1 for PPH prevention and cervical ripening — Obstetrics", tags: ["In Stock", "Featured"] },
  { name: "Magnesium Sulphate 50% Injection", category: "Maternity", manufacturer: "Virchow", origin: "India", desc: "First-line treatment for eclampsia and pre-eclampsia — Obstetrics", tags: ["In Stock"] },
  { name: "Doxylamine + Pyridoxine DR Tablet", category: "Maternity", manufacturer: "ILKO", origin: "Turkey", desc: "Anti-emetic combination for nausea of pregnancy — OBGYN", tags: ["In Stock"] },
  { name: "Calcium Carbonate 500mg + Vitamin D3 Tablet", category: "Maternity", manufacturer: "BIOFARM", origin: "Poland", desc: "Calcium and vitamin D supplementation in pregnancy — Antenatal Care", tags: ["In Stock"] },
  { name: "Nifedipine 10mg Capsule", category: "Maternity", manufacturer: "ILKO", origin: "Turkey", desc: "Calcium-channel blocker for acute hypertension in pregnancy — Obstetrics", tags: ["In Stock"] },
  { name: "Hydralazine 20mg Injection", category: "Maternity", manufacturer: "Virchow", origin: "India", desc: "Vasodilator for severe hypertension in pregnancy — Obstetrics", tags: ["In Stock"] },
  { name: "Betamethasone 12mg Injection (Antenatal Corticosteroid)", category: "Maternity", manufacturer: "Virchow", origin: "India", desc: "Antenatal corticosteroid for fetal lung maturation — Neonatology", tags: ["In Stock", "Cold Chain"] },
  { name: "Tranexamic Acid 1g/10ml Injection", category: "Maternity", manufacturer: "ILKO", origin: "Turkey", desc: "Antifibrinolytic for postpartum haemorrhage — Obstetrics", tags: ["In Stock", "Featured"] },
  { name: "Methyldopa 250mg Tablet", category: "Maternity", manufacturer: "BIOFARM", origin: "Poland", desc: "Centrally acting antihypertensive safe in pregnancy — OBGYN", tags: ["In Stock"] },
  { name: "Amoxicillin-Clavulanate 875/125mg Tablet", category: "Maternity", manufacturer: "ILKO", origin: "Turkey", desc: "Broad-spectrum antibiotic for obstetric infections — Anti-Infective", tags: ["In Stock"] },

  // ── Children & Fertility ─────────────────────────────────────────────────────
  { name: "Amoxicillin 250mg/5ml Oral Suspension", category: "Children & Fertility", manufacturer: "ILKO", origin: "Turkey", desc: "Penicillin antibiotic suspension for paediatric infections — Paediatrics", tags: ["In Stock", "Featured"] },
  { name: "Paracetamol 120mg/5ml Syrup", category: "Children & Fertility", manufacturer: "Various", origin: "Ethiopia", desc: "Paediatric antipyretic and analgesic syrup — Paediatrics", tags: ["In Stock", "Featured"] },
  { name: "Zinc Sulphate 20mg Dispersible Tablet", category: "Children & Fertility", manufacturer: "Various", origin: "India", desc: "Zinc for diarrhoea management in under-5s — Paediatrics", tags: ["In Stock"] },
  { name: "Oral Rehydration Salts (ORS) Sachet", category: "Children & Fertility", manufacturer: "Various", origin: "Ethiopia", desc: "WHO-formulated electrolyte replacement — Paediatric Hydration", tags: ["In Stock"] },
  { name: "Vitamin A 200,000 IU Capsule", category: "Children & Fertility", manufacturer: "Various", origin: "India", desc: "High-dose vitamin A supplementation — Paediatrics", tags: ["In Stock"] },
  { name: "Albendazole 400mg Chewable Tablet", category: "Children & Fertility", manufacturer: "ILKO", origin: "Turkey", desc: "Broad-spectrum anthelmintic for children — Paediatrics", tags: ["In Stock"] },
  { name: "Ibuprofen 100mg/5ml Suspension", category: "Children & Fertility", manufacturer: "ILKO", origin: "Turkey", desc: "Paediatric NSAID antipyretic and anti-inflammatory — Paediatrics", tags: ["In Stock"] },
  { name: "Clomiphene Citrate 50mg Tablet", category: "Children & Fertility", manufacturer: "ILKO", origin: "Turkey", desc: "Selective oestrogen receptor modulator for ovulation induction — Fertility", tags: ["In Stock", "Featured"] },
  { name: "Progesterone 200mg Vaginal Capsule", category: "Children & Fertility", manufacturer: "BIOFARM", origin: "Poland", desc: "Luteal phase support in ART and recurrent miscarriage — Fertility", tags: ["In Stock", "Cold Chain"] },
  { name: "Gonadotrophin (hCG) 5000 IU Injection", category: "Children & Fertility", manufacturer: "Virchow", origin: "India", desc: "Trigger injection for final oocyte maturation — Fertility", tags: ["In Stock", "Cold Chain", "Featured"] },
  { name: "Letrozole 2.5mg Tablet", category: "Children & Fertility", manufacturer: "ILKO", origin: "Turkey", desc: "Aromatase inhibitor for ovulation induction — Fertility", tags: ["In Stock"] },
  { name: "Multivitamin Paediatric Drops (30ml)", category: "Children & Fertility", manufacturer: "Various", origin: "India", desc: "Daily micronutrient drops for infants and toddlers — Paediatrics", tags: ["In Stock"] },
  { name: "Cetirizine 5mg/5ml Syrup", category: "Children & Fertility", manufacturer: "ILKO", origin: "Turkey", desc: "Non-sedating antihistamine syrup for paediatric allergies — Paediatrics", tags: ["In Stock"] },

  // ── ICU / Emergency ──────────────────────────────────────────────────────────
  { name: "Epinephrine (Adrenaline) 1mg/ml Injection", category: "ICU / Emergency", manufacturer: "Virchow", origin: "India", desc: "First-line vasopressor for anaphylaxis and cardiac arrest — Emergency", tags: ["In Stock", "Featured"] },
  { name: "Normal Saline 0.9% IV Fluid 500ml", category: "ICU / Emergency", manufacturer: "Various", origin: "Ethiopia", desc: "Isotonic crystalloid for volume resuscitation — Resuscitation", tags: ["In Stock"] },
  { name: "Ringer's Lactate IV Fluid 500ml", category: "ICU / Emergency", manufacturer: "Various", origin: "Ethiopia", desc: "Balanced crystalloid for trauma and surgical resuscitation — Resuscitation", tags: ["In Stock", "Featured"] },
  { name: "Dextrose 5% IV Fluid 500ml", category: "ICU / Emergency", manufacturer: "Various", origin: "Ethiopia", desc: "Isotonic glucose solution for hypoglycaemia and hydration — ICU", tags: ["In Stock"] },
  { name: "Morphine Sulphate 10mg/ml Injection", category: "ICU / Emergency", manufacturer: "Virchow", origin: "India", desc: "Opioid analgesic for severe acute pain — Pain Management", tags: ["In Stock", "Cold Chain"] },
  { name: "Ketamine 500mg/10ml Injection", category: "ICU / Emergency", manufacturer: "Virchow", origin: "India", desc: "Dissociative anaesthetic for procedural sedation — Anaesthesia", tags: ["In Stock"] },
  { name: "Midazolam 5mg/ml Injection", category: "ICU / Emergency", manufacturer: "ILKO", origin: "Turkey", desc: "Short-acting benzodiazepine for sedation and seizures — ICU", tags: ["In Stock"] },
  { name: "Norepinephrine 4mg/4ml Injection", category: "ICU / Emergency", manufacturer: "Virchow", origin: "India", desc: "Vasopressor for septic and cardiogenic shock — ICU", tags: ["In Stock", "Cold Chain", "Featured"] },
  { name: "Dopamine 200mg/5ml Injection", category: "ICU / Emergency", manufacturer: "Virchow", origin: "India", desc: "Inotrope and vasopressor for haemodynamic support — ICU", tags: ["In Stock", "Cold Chain"] },
  { name: "Furosemide 10mg/ml Injection", category: "ICU / Emergency", manufacturer: "ILKO", origin: "Turkey", desc: "Loop diuretic for acute pulmonary oedema and fluid overload — ICU", tags: ["In Stock"] },
  { name: "Dexamethasone 4mg/ml Injection", category: "ICU / Emergency", manufacturer: "BIOFARM", origin: "Poland", desc: "Corticosteroid for cerebral oedema, anaphylaxis, and sepsis — ICU", tags: ["In Stock", "Featured"] },
  { name: "Atropine 1mg/ml Injection", category: "ICU / Emergency", manufacturer: "Virchow", origin: "India", desc: "Anticholinergic for bradycardia and organophosphate poisoning — Emergency", tags: ["In Stock"] },
  { name: "Sodium Bicarbonate 8.4% Injection", category: "ICU / Emergency", manufacturer: "Various", origin: "India", desc: "Alkalinising agent for metabolic acidosis and cardiac arrest — Emergency", tags: ["In Stock"] },
  { name: "Heparin Sodium 5000 IU/ml Injection", category: "ICU / Emergency", manufacturer: "Virchow", origin: "India", desc: "Anticoagulant for DVT, PE, and extracorporeal circuits — ICU", tags: ["In Stock", "Cold Chain"] },
  { name: "Amiodarone 150mg/3ml Injection", category: "ICU / Emergency", manufacturer: "ILKO", origin: "Turkey", desc: "Antiarrhythmic for life-threatening ventricular arrhythmias — Emergency", tags: ["In Stock"] },
  { name: "Hydrocortisone 100mg Injection", category: "ICU / Emergency", manufacturer: "BIOFARM", origin: "Poland", desc: "Corticosteroid for adrenal crisis, anaphylaxis, and severe asthma — Emergency", tags: ["In Stock"] },
  { name: "Mannitol 20% IV Solution 250ml", category: "ICU / Emergency", manufacturer: "Various", origin: "India", desc: "Osmotic diuretic for raised intracranial pressure — Neurocritical Care", tags: ["In Stock", "Featured"] },
  { name: "Propofol 200mg/20ml Emulsion", category: "ICU / Emergency", manufacturer: "BIOFARM", origin: "Poland", desc: "Short-acting IV anaesthetic for ICU sedation — Anaesthesia", tags: ["In Stock", "Cold Chain"] },

  // ── Maternity Supplies & Equipment ─────────────────────────────────────────────
  { name: "Umbilical Cord Clamp (Sterile)", category: "Medical Supplies", manufacturer: "SMI", origin: "Belgium", desc: "Disposable sterile umbilical cord clamp — Obstetrics", tags: ["In Stock", "Featured"] },
  { name: "Amniotic Membrane Perforator (Amnihook)", category: "Medical Supplies", manufacturer: "Various", origin: "India", desc: "Disposable instrument for artificial rupture of membranes — Obstetrics", tags: ["In Stock"] },
  { name: "Fetal Doppler Ultrasound (Handheld)", category: "Medical Equipments", manufacturer: "BOSCH+SOHN", origin: "Germany", desc: "Portable fetal heart rate monitor — Antenatal Care", tags: ["In Stock", "Featured"] },
  { name: "Delivery Bed (Adjustable)", category: "Medical Equipments", manufacturer: "Various", origin: "China", desc: "Multi-position obstetric delivery bed — Labour & Delivery", tags: ["In Stock"] },

  // ── ICU / Emergency Supplies & Equipment ───────────────────────────────────────
  { name: "Endotracheal Tube (Cuffed, Various Sizes)", category: "Medical Supplies", manufacturer: "Various", origin: "India", desc: "Sterile PVC airway tube for mechanical ventilation — Airway Management", tags: ["In Stock", "Featured"] },
  { name: "Central Venous Catheter Kit (CVC)", category: "Medical Supplies", manufacturer: "Various", origin: "Germany", desc: "Multi-lumen central venous access kit — ICU", tags: ["In Stock"] },
  { name: "Portable Transport Ventilator", category: "Medical Equipments", manufacturer: "Various", origin: "Germany", desc: "Compact emergency ventilator for patient transport — Emergency", tags: ["In Stock", "Featured"] },
  { name: "Syringe Infusion Pump", category: "Medical Equipments", manufacturer: "Various", origin: "China", desc: "Precise automated continuous syringe driver — ICU", tags: ["In Stock"] },
  { name: "Multiparameter Patient Monitor", category: "Medical Equipments", manufacturer: "Various", origin: "China", desc: "Continuous monitoring of ECG, SpO2, NIBP, and temp — ICU", tags: ["In Stock", "Featured"] },
  { name: "Guedel Airway (Oropharyngeal)", category: "Medical Supplies", manufacturer: "Various", origin: "India", desc: "Colour-coded oral airway adjunct — Emergency", tags: ["In Stock"] },
];

const categoryAliases: Record<string, Exclude<Category, "All">> = {
  "Maternity": "Medicines",
  "Children & Fertility": "Nutritional suppliments",
  "ICU / Emergency": "other Healthcare solutions",
};

const allProducts: Product[] = rawProducts.map((product) => {
  const category = categoryAliases[product.category] ?? (product.category as Category);
  return { ...product, category };
});

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
            Nurturing beginnings. <span className="text-[var(--brand)]">Sustaining futures.</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--ink)]/70 max-w-2xl mx-auto font-medium leading-relaxed">
            From essential vitamins that support early human development to life-saving crash-cart vasopressors in the ICU — every product we supply is clinically proven, regulatory-cleared, and ready when it's needed most.
          </p>
        </div>

        <div className="w-full max-w-[1440px] mx-auto rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden bg-black/5 relative">
          <video autoPlay muted loop playsInline className="w-full h-[30vh] sm:h-[70vh] lg:h-[80vh] object-cover">
            <source src="https://www.pexels.com/download/video/8173246/" type="video/mp4" />
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
