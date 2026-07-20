import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect, useCallback } from "react";
import { MapPin, Truck, Quote, Snowflake, Package, Clock, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useEmblaCarousel from "embla-carousel-react";
import { Reveal, PageHero, SectionLabel } from "@/components/site";
import ethiopiaMapUrl from "@/assets/maps/Ethiopia_administrative_boundaries.svg?url";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners & Network - Favored PLC" },
      {
        name: "description",
        content:
          "Manufacturers we represent, hospitals we serve, and the network that connects them.",
      },
      { property: "og:title", content: "Partners - Favored PLC" },
      {
        property: "og:description",
        content: "Global manufacturers, regional distribution, local impact.",
      },
      { property: "og:url", content: "/partners" },
    ],
    links: [{ rel: "canonical", href: "/partners" }],
  }),
  component: Partners,
});

const manufacturers = [
  "PharmaCorp",
  "MediGlobal",
  "LabTech",
  "VitaCare",
  "HealthSys",
  "BioGen",
  "CureMed",
  "NovaPharm",
  "ClinIQ",
  "OrthoMax",
  "ZenithRx",
  "AlphaMed",
];

type Hub = {
  city: string;
  units: string;
  x: number;
  y: number;
  region: string;
  lead: string;
  coldChain: boolean;
};
const hubs: Hub[] = [
  {
    city: "Addis Ababa",
    units: "4,210",
    x: 38.6,
    y: 51.0,
    region: "Central HQ",
    lead: "12h",
    coldChain: true,
  },
  {
    city: "Bahir Dar",
    units: "1,840",
    x: 29.6,
    y: 28.0,
    region: "Amhara",
    lead: "28h",
    coldChain: true,
  },
  {
    city: "Mekelle",
    units: "2,150",
    x: 42.9,
    y: 10.9,
    region: "Tigray",
    lead: "34h",
    coldChain: true,
  },
  {
    city: "Hawassa",
    units: "1,520",
    x: 37.2,
    y: 67.5,
    region: "Sidama",
    lead: "22h",
    coldChain: false,
  },
  {
    city: "Dire Dawa",
    units: "1,980",
    x: 59.1,
    y: 45.5,
    region: "East",
    lead: "26h",
    coldChain: true,
  },
  {
    city: "Jimma",
    units: "1,140",
    x: 25.8,
    y: 62.2,
    region: "Oromia SW",
    lead: "30h",
    coldChain: false,
  },
];

const reviews = [
  {
    q: "Favored has been our most dependable partner. Their cold chain is flawless and documentation arrives before the shipment does.",
    a: "Dr. Amani Reta",
    r: "Procurement Director, Tikur Anbessa",
  },
  {
    q: "We rely on Favored for over 60% of our pharmacy inventory. In five years we have never had a stock-out on essentials.",
    a: "Samuel B.",
    r: "Owner, Bethel Pharmacy Chain",
  },
  {
    q: "The breadth of their catalog is matched only by the consistency of their service. A true institutional partner.",
    a: "Helen Mengistu",
    r: "Hospital Administrator",
  },
  {
    q: "Their compliance team made our last regulatory audit painless. Every batch traceable, every certificate ready.",
    a: "Yonas K.",
    r: "QA Manager, Regional Lab",
  },
];

function Partners() {
  return (
    <main className="bg-white text-[var(--ink)] overflow-x-hidden">
      <section className="bg-white pt-28 sm:pt-40 px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <h2 
            className="font-display text-[1.75rem] sm:text-[2.75rem] lg:text-[3.75rem] leading-[1.05] font-medium text-[#26221f] mb-6"
            style={{ letterSpacing: "-0.04em" }}
          >
            Global makers. <span className="text-[var(--brand)]">Local impact.</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--ink)]/70 max-w-2xl mx-auto font-medium leading-relaxed">
            The world's most trusted manufacturers, connected to the country's most demanding healthcare institutions through a logistics network that does not sleep.
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
            <source src="https://www.pexels.com/download/video/8851864/" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* <ManufacturerMarquee /> */}
      <ParallaxReviews />
      <NetworkMap />
    </main>
  );
}

const MARQUEE_TINTS = [
  "from-emerald-50 to-white",
  "from-amber-50 to-white",
  "from-sky-50 to-white",
  "from-rose-50 to-white",
  "from-violet-50 to-white",
  "from-teal-50 to-white",
];

function ManufacturerMarquee() {
  const [paused, setPaused] = useState(false);
  const rowA = manufacturers;
  const rowB = [...manufacturers].reverse();

  const Row = ({
    items,
    dir = 1,
    speed = 40,
  }: {
    items: string[];
    dir?: 1 | -1;
    speed?: number;
  }) => (
    <div className="relative overflow-hidden py-3 group/marquee">
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: dir === 1 ? "normal" : "reverse",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {[...items, ...items, ...items].map((p, i) => (
          <div
            key={`${p}-${i}`}
            className={`shrink-0 min-w-[200px] sm:min-w-[240px] rounded-2xl border border-black/5 bg-gradient-to-br ${MARQUEE_TINTS[i % MARQUEE_TINTS.length]} px-7 py-6 grid place-items-center shadow-[0_1px_0_rgba(0,0,0,0.02)] hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]`}
          >
            <span className="font-display text-xl sm:text-2xl tracking-tight text-[var(--ink)]/55 group-hover/marquee:text-[var(--ink)]/70 transition-colors hover:!text-[var(--brand)]">
              {p}
            </span>
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--mist)] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--mist)] to-transparent"
      />
    </div>
  );

/*   return (
    <section
      className="py-20 sm:py-28 bg-[var(--mist)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <Reveal className="mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <SectionLabel>Manufacturers</SectionLabel>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl max-w-2xl leading-[1.05]">
              Tier-1 makers, <span className="text-[var(--brand)]">continuously in motion.</span>
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ink)]/50">
            <Sparkles className="h-3 w-3 text-[var(--brand)]" />
            Hover to pause
          </div>
        </Reveal>
        <div className="rounded-[28px] border border-black/5 bg-white/40 backdrop-blur-sm p-3 sm:p-4">
          <Row items={rowA} dir={1} speed={42} />
          <Row items={rowB} dir={-1} speed={52} />
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.3333%) } }`}</style>
    </section>
  ); */
}

const REVIEW_TINTS = [
  {
    bg: "linear-gradient(135deg,#ECFDF5 0%,#FFFFFF 60%)",
    chip: "bg-emerald-100 text-emerald-700",
    accent: "#00A651",
  },
  {
    bg: "linear-gradient(135deg,#FEF3C7 0%,#FFFFFF 60%)",
    chip: "bg-amber-100 text-amber-700",
    accent: "#D97706",
  },
  {
    bg: "linear-gradient(135deg,#E0F2FE 0%,#FFFFFF 60%)",
    chip: "bg-sky-100 text-sky-700",
    accent: "#0284C7",
  },
  {
    bg: "linear-gradient(135deg,#FCE7F3 0%,#FFFFFF 60%)",
    chip: "bg-rose-100 text-rose-700",
    accent: "#DB2777",
  },
];

function ParallaxReviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!emblaApi) {
      setIsReady(false);
      return;
    }

    setIsReady(true);

    const updateIndex = () => {
      try {
        const idx = emblaApi.selectedScrollSnap();
        setSelectedIndex(idx);
      } catch (e) {
        // silently handle if embla isn't ready
      }
    };

    // Initial update
    updateIndex();

    // Listen for all navigation events
    emblaApi.on("select", updateIndex);
    emblaApi.on("reInit", updateIndex);
    emblaApi.on("settle", updateIndex);

    return () => {
      try {
        emblaApi.off("select", updateIndex);
        emblaApi.off("reInit", updateIndex);
        emblaApi.off("settle", updateIndex);
      } catch (e) {
        // cleanup errors are ok
      }
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      <section className="py-8">
        <div className="mx-auto max-w-[1500px] px-6 sm:px-8">
          <Reveal className="max-w-3xl flex flex-col gap-4">
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="font-display text-3xl sm:text-4xl">
              Trusted by hospitals <span className="text-[var(--brand)]">across the region.</span>
            </h2>
            <p className="text-base text-[var(--ink)]/70 font-medium leading-relaxed max-w-2xl">
              Hear from the healthcare institutions and pharmacy chains that depend on Favored for their most critical supply needs.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="py-0 bg-[var(--brand)] overflow-hidden">
        <div className="mx-auto max-w-full px-0">
          <div className="relative min-h-[620px] md:min-h-[560px] pb-24 md:pb-28">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {reviews.map((r) => (
                <div
                  key={r.a}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_78%] lg:flex-[0_0_64%]"
                >
                  <div className="relative min-h-[520px] md:min-h-[480px] p-6 md:p-10 lg:p-12 flex flex-col justify-between bg-[rgba(255,255,255,0.08)] backdrop-blur-xl border border-[rgba(255,255,255,0.12)] rounded-xl md:rounded-2xl m-4 md:m-6 lg:m-8">
                    <div>
                      <div className="text-5xl md:text-6xl lg:text-7xl text-[#c9a961] opacity-30 font-serif mb-6 leading-none">
                        "
                      </div>
                      <p className="text-lg md:text-2xl lg:text-3xl text-white leading-relaxed font-light [text-wrap:balance]">
                        {r.q}
                      </p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.1)]">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm font-semibold text-white mb-1">{r.a}</div>
                          <div className="text-xs text-[rgba(255,255,255,0.7)]">{r.r}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 lg:left-12 flex items-center gap-3 z-10">
            <div className="text-xs md:text-sm font-mono text-[rgba(255,255,255,0.5)]">
              {String(selectedIndex + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
            </div>
          </div>

          <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 lg:right-12 flex items-center gap-2 md:gap-3 z-10">
            <button
              onClick={scrollPrev}
              className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-[rgba(255,255,255,0.3)] text-[rgba(255,255,255,0.7)] hover:text-white hover:border-white transition-all flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)]"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button
              onClick={scrollNext}
              className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-[rgba(255,255,255,0.3)] text-[rgba(255,255,255,0.7)] hover:text-white hover:border-white transition-all flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)]"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}

function NetworkMap() {
  const [selected, setSelected] = useState<Hub>(hubs[0]);
  const ref = useRef<HTMLDivElement>(null);
  const stats = [
    { i: Package, k: selected.units, v: "Units / 90d" },
    { i: Clock, k: selected.lead, v: "Avg lead time" },
    { i: Snowflake, k: selected.coldChain ? "Yes" : "Standard", v: "Cold chain" },
  ];

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ".gsap-map-surface",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 72%", once: true },
        },
      );
      gsap.fromTo(
        ".gsap-network-node",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.35,
          stagger: 0.08,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 72%", once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-8">
        <Reveal className="max-w-3xl mb-12 flex flex-col gap-4">
          <SectionLabel>Interactive Network</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl">
            Six hubs. Fourteen warehouses.{" "}
            <span className="text-[var(--brand)]">Hover any node.</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 relative rounded-[32px] bg-white border border-black/10 p-4 sm:p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="relative h-[420px] sm:h-[560px] rounded-3xl overflow-hidden">
              <div className="absolute inset-5 flex items-center justify-center sm:inset-8">
                <div className="relative aspect-[800/611] h-full max-h-full max-w-full">
                  <img
                    src={ethiopiaMapUrl}
                    alt="Map of Ethiopia"
                    className="gsap-map-surface absolute inset-0 h-full w-full object-contain drop-shadow-sm"
                  />

                  {hubs.map((h) => {
                    const isSel = selected.city === h.city;
                    return (
                      <button
                        key={h.city}
                        type="button"
                        onMouseEnter={() => setSelected(h)}
                        onFocus={() => setSelected(h)}
                        className="gsap-network-node absolute z-20 text-[#228b22] cursor-default"
                        style={{
                          left: `${h.x}%`,
                          top: `${h.y}%`,
                          transform: isSel ? "translate(-50%, -100%) scale(1.25)" : "translate(-50%, -100%)",
                          transformOrigin: "bottom center",
                          transition: "transform 160ms ease",
                        }}
                        aria-label={`View ${h.city} hub details`}
                      >
                        <MapPin
                          className={`h-5 w-5 sm:h-6 sm:w-6 ${isSel ? "fill-[#228b22] stroke-white" : "fill-white stroke-[#228b22]"}`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[32px] glass border border-black/5 p-7 shadow-[var(--shadow-card)] h-full flex flex-col transition-all duration-300">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--brand)]">
                <MapPin className="h-3 w-3" /> {selected.region}
              </div>
              <h3 className="mt-3 font-display text-4xl text-[var(--ink)] leading-none">
                {selected.city}
              </h3>
              <p className="mt-2 text-sm text-[var(--ink)]/60">
                Distribution hub serving the surrounding region with daily dispatch and validated
                cold-chain handling.
              </p>
              <div className="mt-6 space-y-3">
                {stats.map((s) => (
                  <div
                    key={s.v}
                    className="flex items-center justify-between rounded-2xl bg-white/70 border border-black/5 px-4 py-3"
                  >
                    <div className="flex items-center gap-2 text-xs text-[var(--ink)]/60">
                      <s.i className="h-3.5 w-3.5 text-[var(--brand)]" />
                      {s.v}
                    </div>
                    <div className="font-display text-xl text-[var(--ink)]">{s.k}</div>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-6">
                <div className="flex items-center gap-2 text-xs text-[var(--ink)]/60">
                  <Truck className="h-4 w-4 text-[var(--brand)]" />
                  <span>Live dispatch - 96.4% on-time (90d)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            ["6", "Regional Hubs"],
            ["14", "Warehouses"],
            ["48hrs", "Avg. Delivery"],
            ["24/7", "Dispatch"],
          ].map(([k, v]) => (
            <div key={v} className="rounded-2xl bg-[var(--mist)] border border-black/5 p-4">
              <div className="font-display text-xl sm:text-2xl text-[var(--ink)]">{k}</div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ink)]/60 mt-1">
                {v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
