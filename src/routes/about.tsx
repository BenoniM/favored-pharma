import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Baby,
  CheckCircle2,
  HeartPulse,
  PackageCheck,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Reveal, SectionLabel } from "@/components/site";
import { company } from "@/lib/company";
import aboutHero from "@/assets/hero-img/10418438_recolored_exact.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Favored PLC - Import & Distribution in Ethiopia" },
      {
        name: "description",
        content:
          "Who Favored PLC is, what it does, why it exists, and how it is building a responsible healthcare distribution business in Ethiopia.",
      },
      { property: "og:title", content: "About Favored PLC" },
      { property: "og:description", content: company.tagline },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const overview = [
  { title: "Who We Are", body: company.profile },
  {
    title: "What We Do",
    body: "We source, import, and distribute pharmaceuticals, medical supplies, and medical equipment.",
  },
  { title: "Our Purpose", body: company.purpose },
  { title: "Our Commitment", body: company.commitment },
];

const featured = [
  {
    title: "Maternal care",
    body: "Selected products for pregnancy, childbirth, and postnatal care.",
    icon: HeartPulse,
  },
  {
    title: "Child care",
    body: "Selected products for newborn and paediatric care.",
    icon: Baby,
  },
  {
    title: "Critical care",
    body: "Selected products for emergency and intensive-care settings.",
    icon: Stethoscope,
  },
];

const whyFavored = [
  {
    title: "Focused offer",
    body: "A clear core across pharmaceuticals, medical supplies, and medical equipment.",
    label: "Clear priorities",
    icon: PackageCheck,
  },
  {
    title: "Compliance-led",
    body: "EFDA requirements guide Favored's operations; supplier claims are tied to product documentation.",
    label: "Documented quality",
    icon: ShieldCheck,
  },
  {
    title: "Responsive partnership",
    body: "Institutional needs are handled through direct inquiry, product confirmation, and agreed distribution plans.",
    label: "Direct support",
    icon: CheckCircle2,
  },
];

function FeaturedFocusSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const colors = ["#018541", "#042A27", "#0B6F58"];
  const radii = ["9999px", "1.25rem", "9999px"];

  return (
    <section className="bg-white pb-0 pt-24 sm:pt-32">
      <div className="mx-auto mb-10 max-w-[1440px] px-6 sm:mb-14 sm:px-8 lg:px-12">
        <Reveal>
          <SectionLabel>Featured focus</SectionLabel>
          <h2 className="mt-4 font-display text-3xl leading-[1.08] text-[var(--ink)] sm:text-4xl">
            Three care areas. Three core product types.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--ink)]/60 sm:text-base">
            Pharmaceuticals, medical supplies, and medical equipment form the core offer. Other
            opportunities are handled transactionally after review.
          </p>
        </Reveal>
      </div>

      <div className="relative mx-4 h-screen min-h-[640px] overflow-hidden rounded-[2.5rem] sm:mx-12">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src="https://www.pexels.com/download/video/8666761/" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#02120e]/30" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-8">
          <div className="flex w-full max-w-3xl flex-col sm:w-fit">
            {featured.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <button
                  key={item.title}
                  type="button"
                  className="group w-full focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  onMouseLeave={(event) => {
                    const inner = event.currentTarget.querySelector(
                      ".featured-focus-card-inner",
                    ) as HTMLElement;
                    if (inner) inner.style.transform = "translate(0px, 0px)";
                  }}
                  onMouseMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const cx = (event.clientX - rect.left) / rect.width - 0.5;
                    const cy = (event.clientY - rect.top) / rect.height - 0.5;
                    const inner = event.currentTarget.querySelector(
                      ".featured-focus-card-inner",
                    ) as HTMLElement;
                    if (inner) inner.style.transform = `translate(${cx * 70}px, ${cy * 35}px)`;
                  }}
                  aria-expanded={isOpen}
                >
                  <div
                    className={`featured-focus-card-inner px-10 py-[3.25rem] text-center group-hover:pb-[3.25rem] group-hover:pt-[3rem] sm:px-[3.5rem] ${
                      isOpen ? "!pb-[3.25rem] !pt-[3rem]" : ""
                    }`}
                    style={{
                      borderRadius: radii[index],
                      background: colors[index],
                      transition:
                        "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), padding 0.42s cubic-bezier(0.23,1,0.32,1), border-radius 0.4s ease",
                    }}
                  >
                    <span
                      className="block select-none font-display text-2xl text-white sm:text-3xl"
                      style={{
                        letterSpacing: "-0.025em",
                        textShadow: "0 2px 6px rgba(0,0,0,0.35), 0 -1px 0 rgba(255,255,255,0.06)",
                      }}
                    >
                      {item.title}
                    </span>
                    <div
                      className={`max-h-0 overflow-hidden opacity-0 transition-[max-height,opacity] duration-500 group-hover:max-h-[180px] group-hover:opacity-100 ${
                        isOpen ? "!max-h-[180px] !opacity-100" : ""
                      }`}
                    >
                      <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CoreValuesSection() {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const treatments = [
    {
      color: "#018541",
      shape: "rounded-none",
      position: "lg:left-[3%] lg:top-[88px]",
      content: "items-start justify-start text-left",
    },
    {
      color: "#042A27",
      shape: "aspect-square rounded-full mx-auto w-full",
      position: "lg:left-[21%] lg:top-[88px]",
      content: "items-center justify-center text-center",
    },
    {
      color: "#009F5C",
      shape: "rounded-b-full",
      position: "lg:left-[44%] lg:top-[88px]",
      content: "items-start justify-start text-left",
    },
    {
      color: "#03332F",
      shape: "rounded-tr-[220px]",
      position: "lg:right-[3%] lg:top-[88px]",
      content: "items-center justify-center text-center",
    },
  ];

  const getValueTransform = (index: number) => {
    if (hoveredValue === null || hoveredValue === index) return undefined;
    if (hoveredValue === 2 && index === 3) return "translateX(16rem)";
    return `translateX(${index < hoveredValue ? "-12rem" : "12rem"})`;
  };

  return (
    <section className="bg-white px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="max-w-3xl">
          <SectionLabel>Core values</SectionLabel>
          <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
            How we intend to work.
          </h2>
        </Reveal>
        <div className="relative mt-16 min-h-[640px] overflow-visible lg:mt-10">
          <div className="grid gap-8 lg:block">
            {company.values.map((value, index) => {
              const treatment = treatments[index];

              return (
                <article
                  key={value.title}
                  className={`group relative min-h-[320px] max-w-[500px] overflow-hidden p-8 text-white transition-transform duration-500 sm:p-10 lg:absolute lg:h-[500px] lg:w-[500px] lg:max-w-none ${
                    treatment.position
                  } ${treatment.shape} ${hoveredValue === index ? "z-20" : "z-10"}`}
                  style={{
                    background: treatment.color,
                    transform: getValueTransform(index),
                  }}
                  onMouseEnter={() => setHoveredValue(index)}
                  onMouseLeave={() => setHoveredValue(null)}
                  onFocus={() => setHoveredValue(index)}
                  onBlur={() => setHoveredValue(null)}
                  tabIndex={0}
                >
                  <div className={`flex h-full min-h-[220px] flex-col ${treatment.content}`}>
                    <p className="mb-5 font-mono text-xs text-white/55">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-display text-3xl leading-[1.05] text-white sm:text-4xl">
                      {value.title}
                    </h3>
                    <p className="mt-6 max-w-sm translate-y-0 text-base font-semibold leading-relaxed text-white opacity-100 transition-all duration-300 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus:translate-y-0 lg:group-focus:opacity-100">
                      {value.body}
                    </p>
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

function About() {
  return (
    <main className="overflow-x-hidden bg-white text-[var(--ink)]">
      <section className="flex flex-col items-center bg-white px-6 pb-16 pt-28 text-center sm:px-8 sm:pb-24 sm:pt-40 lg:px-12">
        <div className="mx-auto mb-12 max-w-4xl sm:mb-16">
          <h1
            className="mb-6 font-display text-[1.75rem] font-medium leading-[1.05] text-[#26221f] sm:text-[2.75rem] lg:text-[3.75rem]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Built for dependable <span className="text-[var(--brand)]">healthcare supply.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-[var(--ink)]/70 sm:text-lg">
            Favored PLC is an Ethiopian pharmaceutical and healthcare trading company established in
            2020. {company.tagline}
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[2rem] bg-[#E6F6ED] sm:rounded-[3.5rem]">
          <img
            src={aboutHero}
            alt="About Favored PLC"
            className="h-[30vh] w-full object-cover object-bottom sm:h-[70vh] lg:h-[80vh]"
          />
        </div>
      </section>

      <section className="bg-white px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-12">
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] text-[var(--ink)] sm:text-4xl">
              From one warehouse to a national network.
            </h2>
          </Reveal>

          <div className="grid gap-5 lg:min-h-[760px] lg:grid-cols-3">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {overview.slice(0, 2).map((item, index) => (
                <Reveal key={item.title} delay={(index + 1) * 0.08} className="flex">
                  <article className="flex w-full flex-col justify-between rounded-[2rem] bg-[var(--brand)]/10 p-8 sm:p-10">
                    <p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--brand)]">
                      0{index + 1}
                    </p>
                    <div className="mt-16">
                      <h3 className="font-display text-3xl sm:text-4xl">{item.title}</h3>
                      <p className="mt-5 text-base leading-relaxed text-[var(--ink)]/70">
                        {item.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal className="flex" delay={0.24}>
              <article className="flex w-full flex-col rounded-[2rem] bg-[var(--brand)]/10 p-8 text-center sm:p-12">
                <h3 className="font-display text-3xl sm:text-4xl">Our Story</h3>
                <div className="flex flex-1 flex-col justify-center space-y-6 text-lg font-medium leading-relaxed text-[var(--ink)]/80 sm:text-xl">
                  <p>
                    Favored PLC was established in January 2020 by experienced healthcare
                    professionals. The company began with a clear trading focus: connecting
                    qualified suppliers with Ethiopian healthcare institutions through responsible
                    importing, wholesale, and distribution.
                  </p>
                  <p>
                    As the company grows, Favored continues to strengthen its service,
                    documentation, and trusted partnerships.
                  </p>
                </div>
                <div className="mt-10 border-t border-[var(--ink)]/10 pt-8">
                  <p className="font-display text-2xl leading-[1.2] sm:text-[2rem]">
                    “{company.tagline}”
                  </p>
                </div>
              </article>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {overview.slice(2).map((item, index) => (
                <Reveal key={item.title} delay={(index + 4) * 0.08} className="flex">
                  <article className="flex w-full flex-col justify-between rounded-[2rem] bg-[var(--brand)]/10 p-8 sm:p-10">
                    <p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--brand)]">
                      0{index + 3}
                    </p>
                    <div className="mt-16">
                      <h3 className="font-display text-3xl sm:text-4xl">{item.title}</h3>
                      <p className="mt-5 text-base leading-relaxed text-[var(--ink)]/70">
                        {item.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white via-[var(--mist)] to-white py-24 text-[var(--ink)] sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <Reveal className="mb-16 sm:mb-20">
            <SectionLabel>Why Favored</SectionLabel>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] text-[var(--ink)] sm:text-4xl">
              A practical partner for institutional buyers.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--ink)]/65 sm:text-base">
              Three practical reasons healthcare institutions choose to start a conversation with
              Favored.
            </p>
          </Reveal>

          <div className="relative">
            <div
              className="absolute bottom-0 left-5 top-0 w-px sm:left-7"
              style={{
                background:
                  "linear-gradient(to bottom, var(--brand), color-mix(in oklab, var(--brand) 20%, transparent))",
              }}
            />
            <div className="flex flex-col gap-12 sm:gap-16">
              {whyFavored.map(({ title, body, label, icon: Icon }, index) => (
                <Reveal key={title} delay={index * 0.08}>
                  <div className="relative pl-16 sm:pl-20">
                    <div className="absolute left-[13px] top-5 h-5 w-5 -translate-x-1/2 rounded-full border-[3px] border-white bg-[var(--brand)] shadow-sm sm:left-[27px]" />
                    <article className="overflow-hidden rounded-lg border border-[var(--brand)]/15 bg-[var(--brand)]/10 shadow-sm">
                      <div className="flex items-center border-b border-black/5">
                        <div className="grid h-14 w-14 shrink-0 place-items-center border-r border-black/5 bg-[var(--brand)]/10 font-mono text-sm font-semibold sm:h-16 sm:w-16">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <h3 className="px-4 font-mono text-base uppercase tracking-[0.02em] sm:px-5 sm:text-lg lg:text-base">
                          {title}
                        </h3>
                      </div>
                      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:p-5">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink)]/40">
                            {label}
                          </p>
                          <p className="mt-2 max-w-xl text-xs leading-relaxed text-[var(--ink)]/65 sm:text-sm">
                            {body}
                          </p>
                        </div>
                        <div className="flex items-end sm:justify-end">
                          <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-[var(--brand)] shadow-sm">
                            <Icon className="h-5 w-5" strokeWidth={1.5} />
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#082923] py-24 text-white sm:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:px-12">
          <Reveal>
            <SectionLabel>Mission</SectionLabel>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
              What we work toward.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/65">{company.mission}</p>
          </Reveal>
          <Reveal>
            <SectionLabel>Vision</SectionLabel>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
              Where we want to go.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/65">{company.vision}</p>
          </Reveal>
        </div>
      </section>

      <CoreValuesSection />

      <FeaturedFocusSection />

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <Reveal className="rounded-[2.5rem] border border-black/5 bg-white p-8 shadow-[var(--shadow-card)] sm:p-14">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <SectionLabel>Future of Favored</SectionLabel>
                <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
                  Family care is a future plan.
                </h2>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--ink)]/65">
                  Favored plans to explore a family-care business focused on practical products and
                  services for women, children, and households. The concept will be developed in
                  stages and launched only when its model, compliance requirements, and operating
                  resources are ready.
                </p>
              </div>
              <div className="flex items-end lg:col-span-4 lg:justify-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-7 py-3.5 text-sm font-semibold text-white"
                >
                  Discuss a partnership <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
