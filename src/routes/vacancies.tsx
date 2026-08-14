import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Users,
  Heart,
  Globe,
  Leaf,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Mail,
} from "lucide-react";
import { Reveal, SectionLabel } from "@/components/site";

export const Route = createFileRoute("/vacancies")({
  head: () => ({
    meta: [
      { title: "Careers & Vacancies - Favored PLC" },
      {
        name: "description",
        content:
          "Join the Favored PLC team. Explore job opportunities across pharmaceutical distribution, logistics, regulatory affairs, and more in Ethiopia.",
      },
      { property: "og:title", content: "Careers & Vacancies - Favored PLC" },
      {
        property: "og:description",
        content: "Help us build a healthier Ethiopia. View open positions at Favored PLC.",
      },
      { property: "og:url", content: "/vacancies" },
    ],
    links: [{ rel: "canonical", href: "/vacancies" }],
  }),
  component: Vacancies,
});

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const responsibilities = [
  {
    icon: Heart,
    title: "Patient-First Care",
    body: "We are committed to ensuring that the communities we serve have uninterrupted access to the medicines and medical supplies they need. Every decision we make is anchored in patient welfare.",
  },
  {
    icon: Globe,
    title: "Ethical Business Conduct",
    body: "Favored PLC upholds the highest standards of transparency and integrity in every supplier relationship, regulatory submission, and business partnership we pursue.",
  },
  {
    icon: Leaf,
    title: "Sustainability & Environment",
    body: "We actively minimise our environmental footprint through responsible sourcing, waste reduction in cold-chain operations, and an ongoing commitment to sustainable logistics.",
  },
  {
    icon: Users,
    title: "People & Community",
    body: "Our people are our greatest asset. We invest in professional growth, foster an inclusive workplace, and engage local communities through health education and outreach programmes.",
  },
  {
    icon: ShieldCheck,
    title: "Regulatory Responsibility",
    body: "Compliance is never optional at Favored PLC. We maintain full alignment with Ethiopian Food and Drug Authority requirements and international WHO-GMP standards.",
  },
];

const openings = [
  {
    id: "req-001",
    title: "Pharmaceutical Sales Representative",
    department: "Commercial",
    location: "Addis Ababa, Ethiopia",
    type: "Full-time",
    posted: "2 days ago",
    description:
      "Drive sales growth by building and sustaining relationships with hospitals, clinics and pharmacies across assigned territories. You will represent Favored PLC's full pharmaceutical portfolio and deliver product training to healthcare professionals.",
    requirements: [
      "BSc in Pharmacy, Nursing or a related health science",
      "2+ years of pharmaceutical or medical sales experience",
      "Strong communication and negotiation skills",
      "Fluency in Amharic; working English",
      "Willingness to travel within the assigned region",
    ],
  },
  {
    id: "req-002",
    title: "Regulatory Affairs Officer",
    department: "Regulatory",
    location: "Addis Ababa, Ethiopia",
    type: "Full-time",
    posted: "5 days ago",
    description:
      "Manage product registration dossiers, import permit applications, and regulatory submissions with the Ethiopian Food and Drug Authority. You will monitor compliance across the active product portfolio and advise on label and documentation requirements.",
    requirements: [
      "BSc/MSc in Pharmacy or Life Sciences",
      "Minimum 3 years of regulatory affairs experience in Ethiopia",
      "Hands-on experience with EFDA submission processes",
      "Exceptional attention to detail and document management skills",
      "Proficient in Microsoft Office and dossier management software",
    ],
  },
  {
    id: "req-003",
    title: "Warehouse & Logistics Coordinator",
    department: "Operations",
    location: "Addis Ababa, Ethiopia",
    type: "Full-time",
    posted: "1 week ago",
    description:
      "Oversee the receipt, storage, and dispatch of pharmaceutical products in compliance with GDP guidelines. You will coordinate cold-chain logistics, manage inventory accuracy, and ensure on-time delivery to nationwide customers.",
    requirements: [
      "Diploma or degree in Logistics, Supply Chain or related field",
      "2+ years of warehouse operations experience (pharmaceutical preferred)",
      "Working knowledge of cold-chain management and temperature monitoring",
      "Proficiency with inventory management systems",
      "Strong organisational and problem-solving ability",
    ],
  },
  {
    id: "req-004",
    title: "Finance & Procurement Associate",
    department: "Finance",
    location: "Addis Ababa, Ethiopia",
    type: "Full-time",
    posted: "2 weeks ago",
    description:
      "Support the finance team with day-to-day accounting, vendor payments, and procurement cycle management. You will assist in preparing financial reports, tracking purchase orders, and ensuring budget adherence across departments.",
    requirements: [
      "BSc in Accounting, Finance or Business Administration",
      "1–3 years of finance or procurement experience",
      "Experience with ERP or accounting software (e.g. Odoo, QuickBooks)",
      "Strong analytical and numerical skills",
      "Fluency in Amharic and English (written and spoken)",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Responsibility Card
// ─────────────────────────────────────────────────────────────────────────────
function ResponsibilityCard({
  item,
  index,
}: {
  item: (typeof responsibilities)[number];
  index: number;
}) {
  const Icon = item.icon;
  return (
    <Reveal delay={index * 0.06}>
      <div className="group relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-black/5 bg-white p-7 sm:p-10 h-full flex flex-col transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--brand)]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative flex items-center gap-4 mb-5">
          <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--brand)]/10 text-[var(--brand)]">
            <Icon className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <h3 className="font-semibold text-[var(--ink)] text-base sm:text-lg leading-snug">
            {item.title}
          </h3>
        </div>
        <p className="relative text-sm sm:text-[0.95rem] text-[var(--ink)]/65 leading-[1.75] flex-1">
          {item.body}
        </p>
      </div>
    </Reveal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Job Card (accordion)
// ─────────────────────────────────────────────────────────────────────────────
function JobCard({
  job,
  index,
}: {
  job: (typeof openings)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={index * 0.07}>
      <div
        className={`group rounded-[1.5rem] sm:rounded-[2rem] border bg-white transition-all duration-300 overflow-hidden ${
          open
            ? "border-[var(--brand)]/30 shadow-[0_8px_32px_rgba(0,166,81,0.10)]"
            : "border-black/5 hover:border-black/10 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
        }`}
      >
        {/* Header row */}
        <button
          id={`job-${job.id}`}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="w-full text-left px-7 sm:px-10 py-7 flex items-start sm:items-center gap-4 sm:gap-6"
        >
          {/* Icon */}
          <div
            className={`shrink-0 flex items-center justify-center w-11 h-11 rounded-xl transition-colors duration-300 ${
              open
                ? "bg-[var(--brand)] text-white"
                : "bg-[var(--brand)]/10 text-[var(--brand)]"
            }`}
          >
            <Briefcase className="w-5 h-5" strokeWidth={1.75} />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--brand)]">
                {job.department}
              </span>
              <span className="hidden sm:inline text-[var(--ink)]/20">·</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--ink)]/40">
                {job.posted}
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl text-[var(--ink)] leading-snug">
              {job.title}
            </h3>
            <div className="mt-2 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-[var(--ink)]/50">
                <MapPin className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                {job.location}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[var(--ink)]/50">
                <Clock className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                {job.type}
              </span>
            </div>
          </div>

          {/* Chevron */}
          <div className="shrink-0 ml-auto">
            {open ? (
              <ChevronUp className="w-5 h-5 text-[var(--brand)]" strokeWidth={2} />
            ) : (
              <ChevronDown
                className="w-5 h-5 text-[var(--ink)]/30 group-hover:text-[var(--brand)] transition-colors"
                strokeWidth={2}
              />
            )}
          </div>
        </button>

        {/* Expanded panel */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-7 sm:px-10 pb-8 sm:pb-10 border-t border-black/5 pt-7 sm:pt-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--ink)]/40 mb-3">
                  Role Overview
                </p>
                <p className="text-sm sm:text-[0.95rem] text-[var(--ink)]/70 leading-[1.8]">
                  {job.description}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--ink)]/40 mb-3">
                  Requirements
                </p>
                <ul className="space-y-2.5">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--ink)]/70">
                      <span className="mt-[5px] shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Apply CTA */}
            <div className="mt-8 flex flex-wrap gap-3 items-center">
              <a
                href={`mailto:hello@favoredplc.com?subject=Application: ${encodeURIComponent(job.title)}`}
                className="inline-flex items-center gap-2 bg-[var(--brand)] text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-[var(--ink)] transition-all duration-300 hover:scale-105"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </a>
              <span className="text-xs text-[var(--ink)]/40">
                Send your CV to hello@favoredplc.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Marquee strip (mirrors quality page pattern)
// ─────────────────────────────────────────────────────────────────────────────
function VacanciesMarquee() {
  const items = [
    "PHARMACEUTICAL DISTRIBUTION",
    "REGULATORY AFFAIRS",
    "COLD CHAIN LOGISTICS",
    "HEALTHCARE EXCELLENCE",
  ];
  return (
    <section className="bg-white overflow-hidden py-5 border-y border-black/5">
      <div className="flex marquee gap-24 whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <div
            key={i}
            className="flex items-center text-sm sm:text-base font-semibold text-gray-300 tracking-tight"
          >
            <span>{t}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────────────────────
function Vacancies() {
  return (
    <main className="bg-white text-[var(--ink)] overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="bg-white pt-28 sm:pt-40 px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <h2
            className="font-display text-[1.75rem] sm:text-[2.75rem] lg:text-[3.75rem] leading-[1.05] font-medium text-[#26221f] mb-6"
            style={{ letterSpacing: "-0.04em" }}
          >
            Shape a healthier Ethiopia <span className="text-[var(--brand)]">with us.</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--ink)]/70 max-w-2xl mx-auto font-medium leading-relaxed">
            We are a growing pharmaceutical distribution company powered by a team that believes access to quality medicine saves lives. If that mission excites you, we would love to meet you.
          </p>
        </div>

        <div className="w-full max-w-[1440px] mx-auto rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden bg-black/5 relative">
          <img
            src="https://images.pexels.com/photos/5452190/pexels-photo-5452190.jpeg"
            alt="Careers at Favored PLC"
            className="w-full h-[30vh] sm:h-[70vh] lg:h-[80vh] object-cover"
          />
        </div>
      </section>

      {/* ── Marquee ── */}
      <VacanciesMarquee />

      {/* ── Corporate Responsibilities ── */}
      <section className="py-24 sm:py-32 bg-white px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-14 max-w-3xl">
            <SectionLabel>Corporate Responsibilities</SectionLabel>
            <h2
              className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--ink)] leading-[1.08]"
              style={{ letterSpacing: "-0.025em" }}
            >
              How we show up for{" "}
              <span className="text-[var(--brand)]">people and planet.</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[var(--ink)]/60 max-w-2xl leading-relaxed">
              At Favored PLC, responsibility is not a checkbox—it is central to why we exist.
              Here is what that commitment looks like in practice.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {responsibilities.map((item, i) => (
              <ResponsibilityCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Dark stat strip ── */}
      <Reveal>
        <section className="bg-[#07221E] py-16 px-6 sm:px-8">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { value: "15+", label: "Team Members" },
                { value: "26", label: "Products Distributed" },
                { value: "All", label: "Regions Served" },
                { value: "2020", label: "Founded" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-2">
                  <span className="font-display text-4xl sm:text-5xl text-white">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/40">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Open Positions ── */}
      <section className="py-24 sm:py-32 bg-[#F7F8F6] px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-14 max-w-3xl">
            <SectionLabel>Open Positions</SectionLabel>
            <h2
              className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--ink)] leading-[1.08]"
              style={{ letterSpacing: "-0.025em" }}
            >
              Current{" "}
              <span className="text-[var(--brand)]">vacancies.</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[var(--ink)]/60 max-w-2xl leading-relaxed">
              We hire people who are curious, driven, and care deeply about healthcare.
              Explore our open roles below.
            </p>
          </Reveal>

          <div className="flex flex-col gap-5">
            {openings.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))}
          </div>

          {/* Speculative application CTA */}
          <Reveal className="mt-14">
            <div className="rounded-[2rem] bg-white border border-black/5 px-8 sm:px-14 py-10 sm:py-14 flex flex-col sm:flex-row items-start sm:items-center gap-8 justify-between">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--brand)] mb-3">
                  Don't see your role?
                </p>
                <h3 className="font-display text-2xl sm:text-3xl text-[var(--ink)] leading-snug">
                  Send us a speculative application.
                </h3>
                <p className="mt-3 text-sm sm:text-[0.95rem] text-[var(--ink)]/60 max-w-md leading-relaxed">
                  We are always keen to hear from talented professionals who share our mission.
                  Drop us your CV and tell us how you can contribute.
                </p>
              </div>
              <a
                href="mailto:hello@favoredplc.com?subject=Speculative%20Application"
                className="shrink-0 inline-flex items-center gap-2.5 bg-[var(--brand)] text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-[var(--ink)] transition-all duration-300 hover:scale-105 whitespace-nowrap"
              >
                <Mail className="w-4 h-4" strokeWidth={2} />
                Get in Touch
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}