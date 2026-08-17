import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Baby,
  BadgeCheck,
  Building2,
  HeartPulse,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Stethoscope,
  Truck,
  Users,
} from "lucide-react";
import { Reveal, SectionLabel } from "@/components/site";
import ethiopiaMapUrl from "@/assets/maps/Ethiopia_administrative_boundaries.svg?url";

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
    body: "A focused supply offer for healthcare providers supporting pregnancy, childbirth, and postnatal care.",
    icon: HeartPulse,
  },
  {
    id: "child-care",
    title: "Child care",
    body: "Selected pharmaceuticals, medical supplies, and equipment for paediatric and newborn care.",
    icon: Baby,
  },
  {
    id: "critical-care",
    title: "Critical care",
    body: "Priority products for hospitals, emergency units, intensive care, and time-sensitive clinical needs.",
    icon: Stethoscope,
  },
];

const audiences = [
  { title: "Hospitals & clinics", icon: Building2 },
  { title: "Pharmacies & wholesalers", icon: PackageCheck },
  { title: "Manufacturers", icon: Users },
];

function Home() {
  return (
    <main className="overflow-x-hidden bg-white text-[var(--ink)]">
      <section
        className="relative h-screen min-h-[600px] overflow-hidden text-white"
        aria-label="Favored PLC introduction"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src="https://www.pexels.com/download/video/7089367/" type="video/mp4" />
        </video>
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

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
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
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {focusAreas.map(({ id, title, body, icon: Icon }, index) => (
              <Reveal key={id} delay={index * 0.06}>
                <article
                  id={id}
                  className="h-full rounded-[2rem] border border-black/5 bg-[var(--mist)] p-7 sm:p-9"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[var(--brand)] shadow-sm">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-12 font-display text-3xl">{title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-[var(--ink)]/65">{body}</p>
                  <Link
                    to="/products"
                    hash={id}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]"
                  >
                    Explore this area <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
                Favored's future plan is to develop a clearly defined family-care offer for women,
                children, and households. It remains a future initiative; today's operating focus is
                pharmaceutical and healthcare-product trading.
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
