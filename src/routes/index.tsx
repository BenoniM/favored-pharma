import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";
import { Reveal, SectionLabel } from "@/components/site";
import ethiopiaMapUrl from "@/assets/maps/Ethiopia_administrative_boundaries.svg?url";
import homeHero from "@/assets/hero-img/ChatGPT Image Aug 17, 2026, 10_58_47 AM.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Favored PLC - Pharmaceutical Import & Distribution" },
      {
        name: "description",
        content:
          "Favored PLC imports and distributes pharmaceuticals, medical supplies, and medical equipment for healthcare institutions in Ethiopia.",
      },
      { property: "og:title", content: "Favored PLC - Healthcare Distribution" },
      {
        property: "og:description",
        content: "Trusted Pharmaceutical & Healthcare Solutions, Delivered with Excellence.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const focusAreas = [
  {
    id: "maternal-care",
    title: "Maternal care",
    quote: "BORN READY",
    body: "A focused supply offer for healthcare providers supporting pregnancy, childbirth, and postnatal care.",
  },
  {
    id: "child-care",
    title: "Child care",
    quote: "SMALL BODIES BIG STAKES",
    body: "Selected pharmaceuticals, medical supplies, and equipment for paediatric and newborn care.",
  },
  {
    id: "critical-care",
    title: "Critical care",
    quote: "WHEN SECOND COUNTS",
    body: "Priority products for hospitals, emergency units, intensive care, and time-sensitive clinical needs.",
  },
];

const audiences = [
  { title: "Hospitals & clinics", icon: Building2 },
  { title: "Pharmacies & wholesalers", icon: PackageCheck },
  { title: "NGOs", icon: Users },
];

const focusTreatments = [
  {
    color: "#018541",
    shape: "rounded-none",
    content: "items-start justify-start text-left",
  },
  {
    color: "#042A27",
    shape: "aspect-square rounded-full mx-auto w-full",
    content: "items-center justify-center text-center",
  },
  {
    color: "#009F5C",
    shape: "rounded-b-full",
    content: "items-start justify-start text-left",
  },
];

function FocusAreasSection() {
  const [hoveredArea, setHoveredArea] = useState<number | null>(null);

  const getTransform = (index: number) => {
    if (hoveredArea === null || hoveredArea === index) return undefined;
    return `translateX(${index < hoveredArea ? "-12rem" : "12rem"})`;
  };

  return (
    <section className="bg-white px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="max-w-3xl">
          <SectionLabel>What Favored does</SectionLabel>
          <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
            Focused trading for essential areas of care.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink)]/65">
            Our current business is importing and distributing. We concentrate our core portfolio
            in three therapeutic areas and handle other opportunities selectively.
          </p>
        </Reveal>
        <div className="relative mt-16 min-h-[640px] overflow-visible lg:mt-10">
          <div className="grid gap-8 lg:block">
            {focusAreas.map(({ id, title, quote, body }, index) => {
              const treatment = focusTreatments[index];
              const positions = [
                "lg:left-[16%] lg:top-[88px]",
                "lg:left-[34%] lg:top-[88px]",
                "lg:left-[52%] lg:top-[88px]",
              ];
              return (
                <article
                  key={id}
                  id={id}
                  className={`group relative min-h-[320px] w-full max-w-[460px] overflow-hidden p-8 text-white transition-transform duration-500 sm:p-10 lg:absolute lg:h-[500px] lg:w-[460px] lg:max-w-none ${positions[index]} ${treatment.shape} ${hoveredArea === index ? "z-20" : "z-10"}`}
                  style={{
                    background: treatment.color,
                    transform: getTransform(index),
                  }}
                  onMouseEnter={() => setHoveredArea(index)}
                  onMouseLeave={() => setHoveredArea(null)}
                  onFocus={() => setHoveredArea(index)}
                  onBlur={() => setHoveredArea(null)}
                  tabIndex={0}
                >
                  <div className={`flex h-full min-h-[220px] flex-col ${treatment.content}`}>
                    <p className="mb-5 font-mono text-xs text-white/55">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-display text-3xl leading-[1.05] text-white sm:text-4xl">
                      {title}
                    </h3>
                    <div className="mt-4 inline-flex items-center rounded-full border border-white/20 bg-white/15 px-5 py-2 font-mono text-sm font-semibold tracking-[0.16em] uppercase text-white backdrop-blur-md sm:px-6 sm:py-2.5 sm:text-base">
                      &ldquo;{quote}&rdquo;
                    </div>
                    <p className="mt-6 max-w-sm translate-y-0 text-base font-semibold leading-relaxed text-white opacity-100 transition-all duration-300 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus:translate-y-0 lg:group-focus:opacity-100">
                      {body}
                    </p>
                    <Link
                      to="/products"
                      hash={id}
                      className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/80 opacity-100 transition-all duration-300 hover:text-white lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus:opacity-100"
                    >
                      Explore this area <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <main className="overflow-x-hidden bg-white text-[var(--ink)]">
      <section
        className="relative h-screen min-h-[600px] overflow-hidden text-white"
        aria-label="Favored PLC introduction"
      >
        <img
          src={homeHero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.2) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-16 sm:px-8 sm:pb-20 lg:px-12">
          <div className="mx-auto flex max-w-[1440px] items-end justify-between gap-8">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/65">
                Pharmaceutical import & distribution · Ethiopia
              </p>
              <h1 className="mt-5 max-w-[800px] font-display text-[clamp(2.5rem,5.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-.02em] text-white">
                Trusted Pharmaceutical & Healthcare Solutions, Delivered with Excellence
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
                Favored imports and distributes pharmaceuticals, medical supplies, and medical
                equipment for hospitals, clinics, pharmacies, wholesalers, and institutional buyers.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-[15px] font-semibold text-white transition-all hover:scale-105 hover:bg-primary/80"
                >
                  Send an inquiry <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-[15px] font-semibold text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20"
                >
                  View our focus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/5 bg-white py-8">
        <div className="mx-auto grid max-w-[1440px] gap-3 px-6 sm:grid-cols-3 sm:px-8 lg:px-12">
          {audiences.map(({ title, icon: Icon }) => (
            <div
              key={title}
              className="flex items-center gap-3 rounded-2xl bg-[var(--mist)] px-5 py-4"
            >
              <Icon className="h-5 w-5 text-[var(--brand)]" strokeWidth={1.6} />
              <span className="text-sm font-semibold">{title}</span>
            </div>
          ))}
        </div>
      </section>

      <FocusAreasSection />

      <section className="bg-[#082923] py-24 text-white sm:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 sm:px-8 lg:grid-cols-12 lg:px-12">
          <Reveal className="lg:col-span-5">
            <SectionLabel>Why institutions can trust us</SectionLabel>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
              Compliance belongs in the evidence.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/65">
              Favored operates in line with EFDA requirements. Product-level quality claims are
              supported by the applicable manufacturer documentation.
            </p>
            <Link
              to="/quality"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold hover:bg-white/10"
            >
              Review our quality approach <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
            {[
              {
                title: "EFDA compliance",
                body: "Favored's importing and distribution activities follow the applicable Ethiopian regulatory requirements.",
                icon: ShieldCheck,
              },
              {
                title: "WHO-GMP products",
                body: "WHO-GMP is presented as a manufacturer or product credential, subject to document verification.",
                icon: BadgeCheck,
              },
              {
                title: "ISO 13485 products",
                body: "Medical-device certification is stated only where the relevant product documentation supports it.",
                icon: PackageCheck,
              },
            ].map(({ title, body, icon: Icon }) => (
              <article
                key={title}
                className="rounded-[1.75rem] border border-white/10 bg-white/[.055] p-6"
              >
                <Icon className="h-6 w-6 text-[var(--brand)]" strokeWidth={1.5} />
                <h3 className="mt-10 font-display text-2xl">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:px-12">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#edf7f1] p-8 sm:p-12">
              <div className="relative mx-auto aspect-[800/611] w-full max-w-[800px]">
                <img
                  src={ethiopiaMapUrl}
                  alt="Map of Ethiopia"
                  className="absolute inset-0 h-full w-full object-contain opacity-55"
                />
                <button
                  type="button"
                  aria-label="Addis Ababa - Central hub"
                  className="group absolute z-20 origin-bottom -translate-x-1/2 -translate-y-full text-[#228b22] transition-transform hover:scale-125 focus-visible:scale-125 focus-visible:outline-none"
                  style={{ left: "38.6%", top: "51%" }}
                >
                  <MapPin className="h-6 w-6 fill-white stroke-[#228b22] drop-shadow-md transition-colors group-hover:fill-[#228b22] group-hover:stroke-white group-focus-visible:fill-[#228b22] group-focus-visible:stroke-white" />
                  <span className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[calc(100%+0.5rem)] whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-semibold text-[var(--ink)] opacity-0 shadow-lg transition-all group-hover:-translate-y-[calc(100%+0.75rem)] group-hover:opacity-100 group-focus-visible:-translate-y-[calc(100%+0.75rem)] group-focus-visible:opacity-100">
                    Addis Ababa · Central hub
                  </span>
                </button>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <SectionLabel>Nationwide distribution</SectionLabel>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
              One central hub. A nationwide partner network.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--ink)]/65">
              Favored coordinates distribution from Addis Ababa and extends its reach through
              wholesale strategic partnerships.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm font-semibold">
              <Truck className="h-5 w-5 text-[var(--brand)]" /> Distribution plans are confirmed
              against each customer's location and order requirements.
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--mist)] py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <Reveal className="rounded-[2.5rem] bg-white p-8 sm:p-14 lg:flex lg:items-end lg:justify-between lg:gap-16">
            <div className="max-w-3xl">
              <SectionLabel>Future plan</SectionLabel>
              <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
                A future family-care business, built in stages.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[var(--ink)]/65">
                A dedicated family-care line for women, children, and households, built on our established pharmaceutical and healthcare-product trading business.
              </p>
            </div>
            <Link
              to="/about"
              className="mt-8 inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--ink)] px-7 py-3.5 text-sm font-semibold text-white lg:mt-0"
            >
              Read our story <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
