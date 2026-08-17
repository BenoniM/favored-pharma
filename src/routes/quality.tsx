import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, FileCheck2, ShieldCheck } from "lucide-react";
import { Reveal, SectionLabel } from "@/components/site";
import qualityHero from "@/assets/hero-img/141e1c02-19e2-44f2-9041-a2d665dffe4e.png";

export const Route = createFileRoute("/quality")({
  head: () => ({
    meta: [
      { title: "Quality & Compliance - Favored PLC" },
      {
        name: "description",
        content:
          "Favored PLC's EFDA compliance approach and product-level WHO-GMP and ISO 13485 documentation.",
      },
      { property: "og:title", content: "Quality & Compliance - Favored PLC" },
      {
        property: "og:description",
        content: "Clear separation between company compliance and product certifications.",
      },
      { property: "og:url", content: "/quality" },
    ],
    links: [{ rel: "canonical", href: "/quality" }],
  }),
  component: Quality,
});

const standards = [
  {
    label: "Favored PLC",
    title: "EFDA compliance",
    body: "Favored's importing and distribution activities are managed in line with the applicable requirements of the Ethiopian Food and Drug Authority.",
    note: "Company operating compliance",
    icon: ShieldCheck,
  },
  {
    label: "Pharmaceutical products",
    title: "WHO-GMP certified products",
    body: "WHO-GMP is used only for products supplied by manufacturers whose current documentation supports that claim.",
    note: "Manufacturer or product credential",
    icon: BadgeCheck,
  },
  {
    label: "Medical devices",
    title: "ISO 13485 certified products",
    body: "ISO 13485 is used only where the relevant medical-device manufacturer or product documentation supports it.",
    note: "Manufacturer or product credential",
    icon: FileCheck2,
  },
];

function Quality() {
  return (
    <main className="overflow-x-hidden bg-white text-[var(--ink)]">
      <section className="flex flex-col items-center bg-white px-6 pb-16 pt-28 text-center sm:px-8 sm:pt-40 lg:px-12">
        <div className="mx-auto mb-12 max-w-4xl sm:mb-16">
          <h1
            className="mb-6 font-display text-[1.75rem] font-medium leading-[1.05] text-[#26221f] sm:text-[2.75rem] lg:text-[3.75rem]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Specific claims. <span className="text-[var(--brand)]">Supporting records.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-[var(--ink)]/70 sm:text-lg">
            Favored's compliance and supplier-product certifications are different things. We
            present each one clearly.
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[2rem] bg-[#E6F6ED] sm:rounded-[3.5rem]">
          <img
            src={qualityHero}
            alt="Quality & Compliance"
            className="h-[30vh] w-full object-contain sm:h-[70vh] lg:h-[80vh]"
          />
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <Reveal className="max-w-3xl">
            <SectionLabel>What we state</SectionLabel>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
              Three claims, with the owner of each claim made clear.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {standards.map(({ label, title, body, note, icon: Icon }, index) => (
              <Reveal key={title} delay={index * 0.05}>
                <article className="flex h-full flex-col rounded-[2rem] border border-black/5 bg-[var(--mist)] p-8">
                  <div className="flex items-center justify-between gap-4">
                    <Icon className="h-7 w-7 text-[var(--brand)]" strokeWidth={1.5} />
                    <span className="rounded-full bg-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.16em] text-[var(--ink)]/55">
                      {label}
                    </span>
                  </div>
                  <h2 className="mt-14 font-display text-3xl">{title}</h2>
                  <p className="mt-5 flex-1 leading-relaxed text-[var(--ink)]/65">{body}</p>
                  <p className="mt-8 border-t border-black/10 pt-5 text-xs font-semibold uppercase tracking-[.12em] text-[var(--brand)]">
                    {note}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#082923] py-24 text-white sm:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 sm:px-8 lg:grid-cols-12 lg:px-12">
          <Reveal className="lg:col-span-5">
            <SectionLabel>Verification</SectionLabel>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
              Documents before decoration.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7">
            <div className="space-y-5">
              {[
                "Confirm the product's EFDA registration or applicable authorization before supply.",
                "Check the current manufacturer certificate when a WHO-GMP claim is made.",
                "Check the relevant ISO 13485 certificate for medical-device claims.",
                "Match certificates and product records to the correct manufacturer, site, and validity period.",
                "Provide relevant documentation to eligible procurement partners on request.",
              ].map((item, index) => (
                <div key={item} className="flex gap-4 border-b border-white/10 pb-5">
                  <span className="font-mono text-xs text-[var(--brand)]">0{index + 1}</span>
                  <p className="text-lg leading-relaxed text-white/70">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <Reveal className="rounded-[2.5rem] bg-[var(--mist)] p-8 sm:p-14 lg:flex lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-3xl">
              <SectionLabel>Procurement support</SectionLabel>
              <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
                Need to review a product's documentation?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[var(--ink)]/65">
                Send the product name, pack details, intended use, and your organization. Our team
                will confirm availability and share the applicable documentation.
              </p>
            </div>
            <Link
              to="/contact"
              className="mt-8 inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--brand)] px-7 py-3.5 text-sm font-semibold text-white lg:mt-0"
            >
              Start an inquiry <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
