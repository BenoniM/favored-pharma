import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useCallback } from "react";
import {
  Building2,
  Rocket,
  Stethoscope,
  Snowflake,
  Package,
  Network,
  ShieldCheck,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Reveal, SectionLabel, AnimatedHeadline } from "@/components/site";
import { company } from "@/lib/company";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Favored PLC - Healthcare Distribution in Ethiopia" },
      {
        name: "description",
        content:
          "Learn about Favored PLC, a pharmaceutical import and distribution company serving customers across Ethiopia.",
      },
      { property: "og:title", content: "About Favored PLC" },
      {
        property: "og:description",
        content: "Quality pharmaceutical and healthcare solutions within reach.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const timeline = [
  {
    year: "2020",
    title: "Favored PLC is established",
    body: "Favored PLC begins its work as a pharmaceutical import and distribution company in Addis Ababa.",
    icon: Building2,
    metric: "1",
    metricLabel: "Company",
  },
  {
    year: "Today",
    title: "Serving all regions of Ethiopia",
    body: "The company supplies customers across the country through reliable sourcing, efficient distribution, and strong partnerships.",
    icon: Network,
    metric: "All",
    metricLabel: "Regions served",
  },
  {
    year: "Today",
    title: "A broader healthcare portfolio",
    body: "The portfolio includes 26 pharmaceutical and healthcare products across medicines, supplies, equipment, nutrition, and critical care.",
    icon: Stethoscope,
    metric: company.productCount,
    metricLabel: "Products",
  },
  {
    year: "Our focus",
    title: "Quality care within reach",
    body: company.mission,
    icon: Snowflake,
    metric: "15",
    metricLabel: "Team members",
  },
];

const leadership = [
  { 
    name: "Alemayehu Mekonnen", 
    role: "Founder & Board Chair", 
    bio: "Alemayehu founded Favored PLC with a mission to close the gap between Ethiopia's hospitals and the medicines they need.", 
    image: "https://images.pexels.com/photos/7648251/pexels-photo-7648251.jpeg",
    linkedin: "#",
    twitter: null,
  },
  { 
    name: "Selamawit Tadesse", 
    role: "Chief Executive Officer", 
    bio: "Selamawit leads Favored PLC's pharmaceutical supply chain, regulatory affairs, and nationwide distribution strategy.", 
    image: "https://images.pexels.com/photos/8297149/pexels-photo-8297149.jpeg",
    linkedin: "#",
    twitter: "#",
  },
  { 
    name: "Yohannes Hailu", 
    role: "Chief Operations Officer", 
    bio: "Yohannes oversees Favored PLC's logistics and warehouse operations, helping keep healthcare products moving reliably across the country.", 
    image: "https://images.pexels.com/photos/13801827/pexels-photo-13801827.jpeg",
    linkedin: "#",
    twitter: "#",
  },
];

type CompanyValue = (typeof company.values)[number];

function ValueCard({ value }: { value: CompanyValue }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[1.5rem] bg-[var(--brand)]/10 px-5 py-6 text-left sm:rounded-[2rem] sm:px-8 sm:py-10"
      aria-label={`Company value: ${value.title}`}
    >
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[var(--brand)]/10 blur-2xl" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--brand)]">Our values</span>
          <ShieldCheck className="h-5 w-5 text-[var(--brand)]/70" strokeWidth={1.5} />
        </div>
        <div className="mt-10 sm:mt-16">
          <h3 className="font-display text-3xl leading-[0.95] text-[var(--ink)] sm:text-4xl">{value.title.toUpperCase()}</h3>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--ink)]/75">{value.body}</p>
        </div>
      </div>
    </div>
  );
}

function ValueVideoCard({ value, src }: { value: CompanyValue; src: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      tabIndex={0}
      onClick={() => setIsOpen(!isOpen)}
      className="group relative w-full cursor-pointer overflow-hidden rounded-[1.5rem] bg-[var(--ink)] text-white outline-none ring-[var(--brand)]/50 focus-visible:ring-2 sm:rounded-[2rem]"
      aria-label={`Company value: ${value.title}`}
    >
      <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[var(--ink)]/35" />
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${isOpen ? "!opacity-100" : ""}`}
        style={{ background: "color-mix(in oklab, var(--brand) 10%, white)" }}
      />

      <div className={`absolute inset-x-0 bottom-0 p-5 transition-all duration-500 sm:p-8 translate-y-0 opacity-100 group-hover:translate-y-3 group-hover:opacity-0 ${isOpen ? "!translate-y-3 !opacity-0" : ""}`}>
        <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/70">Our values</div>
        <h3 className="mt-3 max-w-xs font-display text-3xl leading-[0.95] sm:text-4xl">{value.title.toUpperCase()}</h3>
        <div className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-white/60">
          <span className="sm:hidden">Click to read</span>
          <span className="hidden sm:inline">Hover to read</span>
        </div>
      </div>

      <div className={`absolute inset-0 flex flex-col justify-center p-5 transition-all duration-500 sm:p-8 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ${isOpen ? "!translate-y-0 !opacity-100" : ""}`}>
        <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--brand)]">Our values</div>
        <h3 className="mt-3 font-display text-3xl leading-[0.95] text-[var(--ink)] sm:text-4xl">{value.title.toUpperCase()}</h3>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-[var(--ink)]/75 sm:text-lg">{value.body}</p>
      </div>
    </div>
  );
}

function LeadershipCard({ p, i }: { p: typeof leadership[0]; i: number }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Reveal delay={i * 0.05}>
      <div 
        className="group flex flex-col h-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/50 rounded-[2rem]"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        {/* Image Container */}
        <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden bg-[var(--mist)]">
          {p.image ? (
            <img
              src={p.image}
              alt={p.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-[var(--brand)]/10">
              <span className="font-display text-8xl text-[var(--brand)]/40">LT</span>
            </div>
          )}

          {/* Overlay panel — slides up from below, meets the outside caption as it travels up */}
          <div
            className={`absolute inset-0 z-10 flex flex-col justify-end translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? '!translate-y-0' : ''}`}
          >
            <div className="absolute inset-0 bg-white" />
            <div className="absolute inset-0 bg-[var(--brand)]/10" />

            <div className="relative px-6 sm:px-8 py-6 sm:py-8 w-full">
              <h3 className="font-semibold text-[1.05rem] text-[var(--ink)] mb-0.5 tracking-tight">
                {p.name}
              </h3>
              <p className="text-[0.9rem] text-[var(--ink)]/50 mb-3">
                {p.role}
              </p>
              <p className="text-[0.85rem] text-[var(--ink)]/80 leading-[1.6]">
                {p.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Outside caption — same padding/typography as the inside version, so it lines up exactly.
            On hover it travels upward and fades, reading as if it's being pulled up into the overlay. */}
        <div
          className={`px-6 sm:px-8 pt-4 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-6 group-hover:opacity-0 ${isOpen ? '!-translate-y-6 !opacity-0' : ''}`}
        >
          <h3 className="font-semibold text-[1.05rem] text-[var(--ink)] mb-0.5 tracking-tight">
            {p.name}
          </h3>
          <p className="text-[0.9rem] text-[var(--ink)]/50">
            {p.role}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function About() {
  return (
    <main className="bg-white text-[var(--ink)] overflow-x-hidden">
      <section className="bg-white pt-28 sm:pt-40 px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <h2 
            className="font-display text-[1.75rem] sm:text-[2.75rem] lg:text-[3.75rem] leading-[1.05] font-medium text-[#26221f] mb-6"
            style={{ letterSpacing: "-0.04em" }}
          >
            Protecting life <span className="text-[var(--brand)]">from its very first breath.</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--ink)]/70 max-w-2xl mx-auto font-medium leading-relaxed">
            Since 2020, Favored PLC has stood beside Ethiopian healthcare providers—delivering the vital medicines and specialized equipment required to nurture new life, support early growth, and sustain patients through their most critical hours.
          </p>
        </div>
        
        <div className="w-full max-w-[1440px] mx-auto rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden bg-black/5 relative">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-[30vh] sm:h-[70vh] lg:h-[80vh] object-cover"
          >
            <source src="https://www.pexels.com/download/video/5853201/" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="py-24 bg-white px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          {/* Title */}
          <Reveal className="mb-12">
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl text-[var(--ink)]">
              From one warehouse to a national network.
            </h2>
          </Reveal>

          {/* Bento Grid */}
          <div className="grid lg:grid-cols-3 gap-5 min-h-screen">

            {/* ── LEFT COLUMN ── */}
            <div className="flex flex-col gap-3 sm:gap-5">

              {/* TOP-LEFT: 20+ Years — number top / icon mid / tag bottom */}
              <Reveal delay={0.1} className="flex-[4] lg:flex-[3] flex">
                {false ? (
                <div className="w-full rounded-[1.5rem] sm:rounded-[2rem] bg-[var(--brand)]/10 flex flex-col items-center justify-between py-6 sm:py-10 px-4 sm:px-8 text-center relative overflow-hidden group">
                  {/* Number — top */}
                  <div className="font-display text-[4rem] sm:text-[6rem] leading-none text-[var(--brand)] tracking-tighter">
                    {company.established}
                  </div>

                  {/* Icon — middle */}
                  <div className="flex-1 flex items-center justify-center my-4 sm:my-0">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 border-[var(--brand)]/20 bg-[var(--brand)]/12 backdrop-blur-sm grid place-items-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--brand)]">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Pill tag — bottom */}
                <div className="px-3 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[var(--brand)]/15 text-[var(--brand)] border border-[var(--brand)]/20 text-xs sm:text-base font-medium tracking-wide">
                    Year established
                  </div>
                </div>
                ) : (
                  <ValueCard value={company.values[0]} />
                )}
              </Reveal>

              {/* BOTTOM-LEFT: Video box */}
              <Reveal delay={0.2} className="flex-[3] lg:flex-[2] flex min-h-[340px] sm:min-h-[260px]">
                <ValueVideoCard value={company.values[1]} src="https://www.pexels.com/download/video/8325857/" />
              </Reveal>
            </div>

            {/* ── MIDDLE COLUMN: Our Story ── */}
            <div className="flex flex-col">
              <Reveal className="flex-1 flex" delay={0.3}>
                <div className="w-full rounded-[2rem] bg-[var(--brand)]/10 p-10 sm:p-14 flex flex-col text-center relative overflow-hidden group">
                  {/* Header */}
                  <div className="mx-auto flex flex-col items-center gap-3 mb-8 sm:mb-10">
                    <div className="font-display text-3xl sm:text-4xl text-[var(--ink)]">Our Story</div>
                  </div>

                  {/* Body */}
                  <div className="flex-1 flex flex-col justify-center space-y-6 text-[var(--ink)]/80 text-lg sm:text-xl leading-relaxed font-medium">
                    <p>
                      {company.profile}
                    </p>
                    <p>
                      Our work is guided by integrity, trusted quality, responsive customer service, and operational excellence.
                    </p>
                  </div>

                  {/* Pull-quote */}
                  <div className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-[var(--ink)]/8 relative z-10">
                    <p className="font-display text-2xl sm:text-[2rem] text-[var(--ink)] leading-[1.2]">
                      "Trusted healthcare solutions.<br/>Within reach."
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="flex flex-col gap-3 sm:gap-5">

              {/* TOP-RIGHT: Video box */}
              <Reveal delay={0.4} className="flex-[3] lg:flex-[2] flex min-h-[340px] sm:min-h-[260px]">
                <ValueVideoCard value={company.values[2]} src="https://www.pexels.com/download/video/7706816/" />
              </Reveal>

              {/* BOTTOM-RIGHT: 14 Warehouses — number top / icon mid / tag bottom */}
              <Reveal delay={0.5} className="flex-[4] lg:flex-[3] flex">
                {false ? (
                <div className="w-full rounded-[1.5rem] sm:rounded-[2rem] bg-[var(--brand)]/10 flex flex-col items-center justify-between py-6 sm:py-10 px-4 sm:px-8 text-center relative overflow-hidden group">

                  {/* Number — top */}
                  <div className="font-display text-[4rem] sm:text-[6rem] leading-none text-[var(--brand)] tracking-tighter">
                    {company.productCount}
                  </div>

                  {/* Icon — middle */}
                  <div className="flex-1 flex items-center justify-center my-4 sm:my-0">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 border-[var(--brand)]/20 bg-[var(--brand)]/12 backdrop-blur-sm grid place-items-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--brand)]">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                        <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Pill tag — bottom */}
                <div className="px-3 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[var(--brand)]/15 text-[var(--brand)] border border-[var(--brand)]/20 text-xs sm:text-base font-medium tracking-wide">
                    Products in portfolio
                  </div>
                </div>
                ) : (
                  <ValueCard value={company.values[3]} />
                )}
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      <EditorialTimeline />

      <MissionVisionSection />

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6">
          <Reveal className="max-w-3xl mb-16">
            <SectionLabel>Leadership</SectionLabel>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">
              The people behind the promise.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {leadership.map((p, i) => (
              <LeadershipCard key={p.name} p={p} i={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Mission and vision — full-screen video container with stacked hover cards
// ─────────────────────────────────────────────────────────────────────────────
function MissionVisionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const missionVision = [
    {
      title: "Mission",
      desc: company.mission,
      color: "#018541",
      borderRadius: "9999px",
    },
    {
      title: "Vision",
      desc: company.vision,
      color: "#042A27",
      borderRadius: "1.25rem",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-white pt-24 sm:pt-32 pb-0"
    >
      {/* ── Title & description — outside the video box */}
      <div className="mx-auto max-w-[1440px] px-2 mb-10 sm:mb-14">
        <Reveal>
          <SectionLabel>Mission &amp; vision</SectionLabel>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl text-[var(--ink)]">
            The direction we share.
          </h2>
          <p className="mt-4 max-w-xl text-sm sm:text-base text-[var(--ink)]/60 leading-relaxed">
            Our mission and vision guide how Favored PLC brings quality healthcare solutions within reach.
          </p>
        </Reveal>
      </div>

      {/* ── h-screen video box with side margin, rounded top */}
      <div
        className="relative mx-4 sm:mx-12 overflow-hidden"
        style={{
          height: "100vh",
          minHeight: "640px",
          borderRadius: "2.5rem",
        }}
      >
        {/* Video */}
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
        >
          <source src="https://www.pexels.com/download/video/8666761/" type="video/mp4" />
        </video>

        {/* Subtle overlay */}
        <div className="absolute inset-0" style={{ background: "rgba(2,18,14,0.28)" }} />

        {/* ── Stacked cards — centred vertically + horizontally, zero gap */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-8">
          {/* Inner container fits the widest text, buttons stretch to fill it */}
          <div className="flex flex-col w-fit max-w-3xl">
          {missionVision.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <button
                key={item.title}
                className="group focus:outline-none w-full"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                onMouseLeave={(e) => {
                  const inner = e.currentTarget.querySelector('.mission-vision-card-inner') as HTMLElement;
                  if (inner) inner.style.transform = "translate(0px, 0px)";
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const cx = (e.clientX - rect.left) / rect.width - 0.5;
                  const cy = (e.clientY - rect.top) / rect.height - 0.5;
                  const inner = e.currentTarget.querySelector('.mission-vision-card-inner') as HTMLElement;
                  if (inner) {
                    // Playful, slightly exaggerated parallax with no random jitter
                    inner.style.transform = `translate(${cx * 70}px, ${cy * 35}px)`;
                  }
                }}
                aria-expanded={isOpen}
              >
                <div
                  className={`mission-vision-card-inner text-center px-[3.5rem] py-[3.25rem] group-hover:pt-[3rem] group-hover:pb-[3.25rem] ${isOpen ? '!pt-[3rem] !pb-[3.25rem]' : ''}`}
                  style={{
                    borderRadius: item.borderRadius,
                    background: item.color,
                    transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), padding 0.42s cubic-bezier(0.23,1,0.32,1), border-radius 0.4s ease",
                  }}
                >
                  <span
                    className="font-display text-2xl sm:text-3xl text-white block select-none"
                    style={{
                      letterSpacing: "-0.025em",
                      textShadow: "0 2px 6px rgba(0,0,0,0.35), 0 -1px 0 rgba(255,255,255,0.06)",
                    }}
                  >
                    {item.title}
                  </span>
                  <div
                    className={`overflow-hidden max-h-0 opacity-0 group-hover:max-h-[180px] group-hover:opacity-100 ${isOpen ? '!max-h-[180px] !opacity-100' : ''}`}
                    style={{
                      transition: "max-height 0.45s cubic-bezier(0.23,1,0.32,1), opacity 0.3s ease",
                    }}
                  >
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/80" style={{ fontWeight: 400 }}>
                      {item.desc}
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

function EditorialTimeline() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cards = gsap.utils.toArray<HTMLElement>(".sui-scroll-card");
      const visuals = gsap.utils.toArray<HTMLElement>(".sui-scroll-visual");
      const cursor = ref.current.querySelector<HTMLElement>(".sui-scroll-cursor");
      const cursorTrail = ref.current.querySelector<HTMLElement>(".sui-scroll-cursor-trail");
      let cursorReturn: gsap.core.Tween | undefined;
      const moveCursor = cursor
        ? gsap.quickTo(cursor, "y", { duration: 0.42, ease: "power3.out" })
        : undefined;
      const moveTrail = cursorTrail
        ? gsap.quickTo(cursorTrail, "scaleY", { duration: 0.42, ease: "power3.out" })
        : undefined;
      const moveTrailOffset = cursorTrail
        ? gsap.quickTo(cursorTrail, "y", { duration: 0.42, ease: "power3.out" })
        : undefined;

      if (reduce) {
        gsap.set(cards, { opacity: 1, y: 0 });
        gsap.set(visuals, { opacity: 1, scale: 1 });
        return;
      }

      gsap.set(cards, { autoAlpha: 0, y: "76vh", scale: 0.98 });
      gsap.set(visuals, { autoAlpha: 0, scale: 0.9, rotateX: -10 });
      if (cursor) gsap.set(cursor, { y: 0 });
      if (cursorTrail) {
        gsap.set(cursorTrail, {
          xPercent: -50,
          yPercent: -100,
          y: 0,
          scaleY: 0,
          transformOrigin: "50% 100%",
          backgroundImage: "linear-gradient(to top, var(--brand), var(--brand))",
        });
      }

      const sequence = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: () => `+=${timeline.length * window.innerHeight}`,
          scrub: 0.65,
          pin: ".sui-scroll-stage",
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (!moveCursor) return;
            const velocity = self.getVelocity();
            const offset = gsap.utils.clamp(-46, 46, velocity / 22);
            cursorReturn?.kill();
            moveCursor(offset);
            if (cursorTrail && moveTrail && moveTrailOffset) {
              const trailingDown = offset >= 0;
              gsap.set(cursorTrail, {
                yPercent: trailingDown ? -100 : 0,
                transformOrigin: trailingDown ? "50% 100%" : "50% 0%",
                backgroundImage: trailingDown
                  ? "linear-gradient(to top, var(--brand), var(--brand))"
                  : "linear-gradient(to bottom, var(--brand), var(--brand))",
              });
              moveTrail(Math.max(0.08, Math.min(1, Math.abs(offset) / 46)));
              moveTrailOffset(offset);
            }
            cursorReturn = gsap.delayedCall(0.18, () => {
              moveCursor(0);
              moveTrail?.(0);
              moveTrailOffset?.(0);
            });
          },
        },
      });

      cards.forEach((card, i) => {
        const visual = visuals[i];
        const position = i * 2;
        sequence
          .to(
            card,
            { autoAlpha: 1, y: "18vh", scale: 1, duration: 0.42 },
            position,
          )
          .to(
            visual,
            { autoAlpha: 1, scale: 1, rotateX: 0, duration: 0.45 },
            position + 0.05,
          )
          .to(card, { y: "-18vh", duration: 0.9, ease: "none" }, position + 0.45);

        sequence
          .to(card, { autoAlpha: 0, y: "-76vh", scale: 0.98, duration: 0.48 }, position + 1.34)
          .to(visual, { autoAlpha: 0, scale: 0.94, rotateX: 10, duration: 0.48 }, position + 1.34);
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-white via-[var(--mist)] to-white text-[var(--ink)]"
      style={{ minHeight: `${timeline.length * 100}vh` }}
    >
      <div className="sui-scroll-stage relative h-screen min-h-[760px] overflow-hidden">
        <div className="relative mx-auto h-full max-w-[1440px] px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
          <div className="absolute left-6 top-4 z-10 max-w-2xl sm:left-8 sm:top-5 lg:left-2">
            <Reveal>
              <SectionLabel>Editorial Timeline</SectionLabel>
              <AnimatedHeadline
                text="One direction: quality care within reach."
                as="h2"
                className="mt-3 font-display text-2xl leading-[0.95] text-[var(--ink)] sm:text-3xl lg:text-4xl"
              />
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--ink)]/65 sm:text-base">
                A short biography of the boxes we've moved, the partners we've earned, and the
                standards we've kept.
              </p>
            </Reveal>
          </div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden h-[40vh] -translate-x-1/2 -translate-y-1/2 lg:block">
            <div
              className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
              style={{
                backgroundImage:
                  "radial-gradient(circle, color-mix(in oklab, var(--ink) 70%, transparent) 2.8px, transparent 3.2px)",
                backgroundPosition: "center top",
                backgroundRepeat: "repeat-y",
                backgroundSize: "1px 16px",
              }}
            />
            <div className="sui-scroll-cursor-trail absolute left-1/2 top-1/2 h-[104px] w-[3px] rounded-full" />
            <div
              className="sui-scroll-cursor absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-white bg-[var(--brand)]"
            />
          </div>

          <div className="absolute inset-0 z-40 px-6 sm:px-8 lg:px-12">
            {timeline.map((t, i) => {
              const Icon = t.icon;
              const sideClass =
                i % 2 === 0
                  ? "lg:left-auto lg:right-12 lg:text-left"
                  : "lg:left-12 lg:right-auto lg:text-right";
              return (
                <article
                  key={`${t.year}-${i}`}
                  className={`sui-scroll-card absolute inset-x-6 top-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] border border-[var(--brand)]/15 bg-[var(--brand)]/10 shadow-[var(--shadow-card)] backdrop-blur-xl sm:inset-x-8 lg:inset-x-auto lg:w-[calc(50%-160px)] lg:max-w-[500px] ${sideClass}`}
                >
                  <div className="flex items-center border-b border-black/5">
                    <div className="grid h-14 w-14 shrink-0 place-items-center border-r border-black/5 bg-[var(--brand)]/10 font-mono text-sm font-semibold text-[var(--ink)] sm:h-16 sm:w-16">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="sui-scroll-reveal px-4 font-mono text-base uppercase tracking-[0.02em] text-[var(--ink)] sm:px-5 sm:text-lg lg:text-base">
                      {t.title}
                    </h3>
                  </div>

                  <div className="grid min-h-[170px] border-b border-black/5 p-4 sm:p-5">
                    <div className="sui-scroll-visual m-auto grid w-full max-w-[150px] place-items-center">
                      <div className="relative aspect-square w-full">
                        <div className="absolute inset-[17%] rotate-45 border border-[var(--ink)]/10" />
                        <div className="absolute inset-[27%] rotate-45 border border-[var(--brand)]/55" />
                        <div className="absolute left-1/2 top-[16%] h-[68%] w-px -translate-x-1/2 bg-[var(--ink)]/10" />
                        <div className="absolute left-[16%] top-1/2 h-px w-[68%] -translate-y-1/2 bg-[var(--ink)]/10" />
                        <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--brand)]/60 bg-white">
                          <Icon className="h-6 w-6 text-[var(--brand)]" strokeWidth={1.6} />
                        </div>
                        <span className="absolute left-[26%] top-[30%] h-3 w-3 rounded-full border border-[var(--brand)] bg-white" />
                        <span className="absolute right-[28%] top-[37%] h-3 w-3 rounded-full border border-[var(--brand)] bg-white" />
                        <span className="absolute bottom-[26%] left-[47%] h-3 w-3 rounded-full border border-[var(--brand)] bg-white" />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:p-5">
                    <div className="sui-scroll-reveal">
                      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink)]/40">
                        {t.year}
                      </div>
                      <p className="mt-2 max-w-xl text-xs leading-relaxed text-[var(--ink)]/65 sm:text-sm">
                        {t.body}
                      </p>
                    </div>
                    <div className="sui-scroll-reveal flex items-end gap-3 sm:justify-end">
                      <span className="font-display text-2xl leading-none text-[var(--brand)] sm:text-3xl">
                        {t.metric}
                      </span>
                      <span className="pb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink)]/45">
                        {t.metricLabel}
                      </span>
                    </div>
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
