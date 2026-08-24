import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  ExternalLink,
  Factory,
  Handshake,
  MapPin,
  Truck,
} from "lucide-react";
import { Reveal, SectionLabel } from "@/components/site";
import ethiopiaMapUrl from "@/assets/maps/Ethiopia_administrative_boundaries.svg?url";
import partnersHero from "@/assets/hero-img/ChatGPT Image Aug 17, 2026, 10_14_42 AM.png";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners & Distribution - Favored PLC" },
      {
        name: "description",
        content:
          "Favored PLC's healthcare working network and Addis Ababa-centred nationwide distribution approach.",
      },
      { property: "og:title", content: "Partners - Favored PLC" },
      {
        property: "og:description",
        content: "Collaborations with trusted healthcare institutions and pharmaceutical partners across Ethiopia.",
      },
      { property: "og:url", content: "/partners" },
    ],
    links: [{ rel: "canonical", href: "/partners" }],
  }),
  component: Partners,
});

const workingNetwork = [
  {
    name: "Myung Sung Christian Medical Center",
    type: "Healthcare institution",
    body: "Addis Ababa healthcare institution included in Favored's working network.",
    href: "https://www.google.com/maps/search/?api=1&query=Korea+Hospital+Addis+Ababa",
    linkLabel: "View location",
    icon: Building2,
  },
  {
    name: "Droga Pharma PLC",
    type: "Pharmaceutical-sector partner",
    body: "Ethiopian pharmaceutical import, wholesale, and healthcare-products company.",
    href: "https://drogapharma.com/",
    linkLabel: "Official website",
    icon: Handshake,
  },
  {
    name: "MSI Ethiopia",
    type: "Healthcare organization",
    body: "Ethiopian programme of MSI Reproductive Choices, working in sexual, reproductive, maternal, and child health.",
    href: "https://www.msichoices.org/what-we-do/where-we-work/ethiopia/",
    linkLabel: "Official profile",
    icon: Building2,
  },
];

function Partners() {
  return (
    <main className="overflow-x-hidden bg-white text-[var(--ink)]">
      <section className="flex flex-col items-center bg-white px-6 pb-16 pt-28 text-center sm:px-8 sm:pb-24 sm:pt-40 lg:px-12">
        <div className="mx-auto mb-12 max-w-4xl sm:mb-16">
          <h1
            className="mb-6 font-display text-[1.75rem] font-medium leading-[1.05] text-[#26221f] sm:text-[2.75rem] lg:text-[3.75rem]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Relationships that <span className="text-[var(--brand)]">support access.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-[var(--ink)]/70 sm:text-lg">
            Favored works with healthcare institutions, pharmaceutical-sector partners, wholesalers,
            and manufacturers to connect compliant products with the Ethiopian market.
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[2rem] bg-[#E6F6ED] sm:rounded-[3.5rem]">
          <img
            src={partnersHero}
            alt="Partners"
            className="h-[30vh] w-full object-contain object-left sm:h-[70vh] lg:h-[80vh]"
          />
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <Reveal className="max-w-3xl">
            <SectionLabel>Working network</SectionLabel>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
              Collaborating with trusted healthcare institutions and partners.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--ink)]/65">
              Favored works alongside reputable healthcare providers, clinical institutions, and industry
              partners to ensure reliable access to essential pharmaceutical and medical products across Ethiopia.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {workingNetwork.map(({ name, type, body, href, linkLabel, icon: Icon }, index) => (
              <Reveal key={name} delay={index * 0.05}>
                <article className="flex h-full flex-col rounded-[2rem] border border-black/5 bg-[var(--mist)] p-8">
                  <div className="flex items-center justify-between gap-4">
                    <Icon className="h-7 w-7 text-[var(--brand)]" strokeWidth={1.5} />
                    <span className="rounded-full bg-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.14em] text-[var(--ink)]/55">
                      {type}
                    </span>
                  </div>
                  <h3 className="mt-14 font-display text-3xl">{name}</h3>
                  <p className="mt-4 flex-1 leading-relaxed text-[var(--ink)]/65">{body}</p>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]"
                  >
                    {linkLabel} <ExternalLink className="h-4 w-4" />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#082923] py-24 text-white sm:py-32">
        <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:px-12">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white/[.06] p-8 sm:p-12">
              <div className="relative mx-auto aspect-[800/611] w-full max-w-[800px]">
                <img
                  src={ethiopiaMapUrl}
                  alt="Map of Ethiopia"
                  className="absolute inset-0 h-full w-full object-contain invert opacity-30"
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
            <SectionLabel>Distribution network</SectionLabel>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
              Addis Ababa is the central hub.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/65">
              Favored coordinates procurement and distribution from Addis Ababa. Nationwide coverage
              is developed through wholesale strategic partnerships, with routes and delivery
              arrangements confirmed for each order.
            </p>
            <div className="mt-8 flex gap-4 border-t border-white/10 pt-7">
              <Truck className="h-6 w-6 shrink-0 text-[var(--brand)]" strokeWidth={1.5} />
              <p className="text-sm leading-relaxed text-white/60">
                Logistics and delivery routes are tailored to meet stringent storage, cold-chain, and regulatory standards across the supply chain.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <Reveal className="grid gap-10 rounded-[2.5rem] bg-[var(--mist)] p-8 sm:p-14 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionLabel>Manufacturing partners</SectionLabel>
              <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
                Global manufacturing partnerships.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--ink)]/65">
                We partner with certified global pharmaceutical and medical equipment manufacturers committed to international quality standards, rigorous regulatory compliance, and sustainable healthcare access in Ethiopia.
              </p>
            </div>
            <div className="flex items-center lg:col-span-4 lg:justify-end">
              <div className="grid h-28 w-28 place-items-center rounded-[2rem] bg-white text-[var(--brand)] shadow-sm">
                <Factory className="h-11 w-11" strokeWidth={1.3} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
