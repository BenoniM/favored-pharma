import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { Pill, Plus, Activity, Stethoscope } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import heroWarehouseAsset from "@/assets/hero-warehouse.jpg.asset.json";
import heroCheckupAsset from "@/assets/hero-checkup.jpg.asset.json";
import heroVialsAsset from "@/assets/hero-vials.jpg.asset.json";
import heroVaccineAsset from "@/assets/hero-vaccine.jpg.asset.json";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const heroWarehouse = heroWarehouseAsset.url;
const heroCheckup = heroCheckupAsset.url;
const heroVials = heroVialsAsset.url;
const heroVaccine = heroVaccineAsset.url;

const heroImages: Record<string, string> = {
  pill: heroWarehouse,
  cross: heroCheckup,
  pulse: heroVials,
  stethoscope: heroVaccine,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export const stagger = {
  hidden: {},
  show: {},
};

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [delay] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function AnimatedHeadline({
  text,
  className = "",
  as: Tag = "h1",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current.querySelectorAll(".gsap-word"),
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          delay,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            once: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [text, delay] },
  );

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <span className="gsap-word inline-block">{w}</span>
        </span>
      ))}
    </Tag>
  );
}

export function HeroPictogram({
  variant = "pill",
}: {
  variant?: "pill" | "cross" | "pulse" | "stethoscope";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon =
    variant === "cross"
      ? Plus
      : variant === "pulse"
        ? Activity
        : variant === "stethoscope"
          ? Stethoscope
          : Pill;

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !ref.current) return;

      gsap.to(".gsap-orbit", { rotate: 360, duration: 28, repeat: -1, ease: "none" });
      gsap.to(".gsap-orbit-reverse", { rotate: -360, duration: 40, repeat: -1, ease: "none" });
      gsap.to(".gsap-picto-card", {
        y: -14,
        rotate: 4,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.fromTo(
        ".gsap-chip",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, delay: 0.8, ease: "power2.out" },
      );
      gsap.to(".gsap-chip-inner", {
        y: -4,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        stagger: 0.18,
        ease: "sine.inOut",
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative w-full aspect-square max-w-[480px] mx-auto">
      <div
        aria-hidden
        className="absolute inset-6 rounded-full opacity-70 blur-2xl"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div
        aria-hidden
        className="gsap-orbit absolute inset-0 rounded-full border border-[var(--brand)]/30"
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[var(--brand)] shadow-[0_0_24px_var(--brand)]" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-2 w-2 rounded-full bg-[var(--ink)]" />
      </div>
      <div
        aria-hidden
        className="gsap-orbit-reverse absolute inset-8 rounded-full border border-dashed border-[var(--brand)]/30"
      />
      <div className="gsap-picto-card absolute inset-0 grid place-items-center">
        <div className="glass rounded-[32px] p-8 shadow-[var(--shadow-card)] border border-white/40">
          <Icon className="h-16 w-16 sm:h-20 sm:w-20 text-[var(--brand)]" strokeWidth={1.5} />
        </div>
      </div>
      {[
        { t: "WHO-GMP", c: "top-2 left-0" },
        { t: "Cold chain - 2-8C", c: "bottom-6 right-0" },
        { t: "Lot traceable", c: "bottom-0 left-6" },
      ].map((chip) => (
        <div
          key={chip.t}
          className={`gsap-chip absolute ${chip.c} glass rounded-full px-3 py-1.5 text-[10px] font-mono tracking-wide text-[var(--ink)] shadow-[var(--shadow-card)]`}
        >
          <span className="gsap-chip-inner inline-block">{chip.t}</span>
        </div>
      ))}
    </div>
  );
}

export function PageHero({
  kicker,
  title,
  lead,
  children,
  visual,
  variant = "pill",
}: {
  kicker: string;
  title: ReactNode;
  lead?: string;
  children?: ReactNode;
  visual?: ReactNode;
  variant?: "pill" | "cross" | "pulse" | "stethoscope";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const heroSrc = heroImages[variant] ?? heroWarehouse;

  useEffect(() => {
    if (typeof document === "undefined") return;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = heroSrc;
    link.setAttribute("fetchpriority", "high");
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [heroSrc]);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.fromTo(
        ".gsap-page-hero-reveal",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" },
      );
      gsap.fromTo(
        ".gsap-hero-image",
        { opacity: 0, scale: 1.08 },
        { opacity: 0.45, scale: 1, duration: 1.1, ease: "power3.out" },
      );
      gsap.fromTo(
        ".gsap-hero-visual",
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.9, delay: 0.3, ease: "power3.out" },
      );

      if (!reduce) {
        gsap.to(".gsap-hero-image", {
          y: 120,
          scale: 1.08,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".gsap-scroll-cue-line", {
          scaleY: 0.2,
          duration: 0.9,
          repeat: -1,
          yoyo: true,
          transformOrigin: "0% 0%",
          ease: "sine.inOut",
        });
        gsap.to(".gsap-hero-dot", {
          scale: 1.8,
          opacity: 0.4,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      const onMove = (e: MouseEvent) => {
        if (reduce) return;
        const r = root.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(".gsap-hero-glow-main", {
          x: x * 40,
          y: y * 30,
          duration: 0.7,
          ease: "power3.out",
        });
        gsap.to(".gsap-hero-glow-sub", {
          x: x * -25,
          y: y * -20,
          duration: 0.7,
          ease: "power3.out",
        });
        gsap.to(".gsap-hero-image", { x: x * 22, duration: 0.7, ease: "power3.out" });
      };

      root.addEventListener("mousemove", onMove);
      return () => root.removeEventListener("mousemove", onMove);
    },
    { scope: ref, dependencies: [heroSrc] },
  );

  return (
    <section
      ref={ref}
      className="relative pt-36 sm:pt-44 pb-24 overflow-hidden text-white"
      style={{ background: "linear-gradient(180deg, #07221E 0%, #0B2B26 55%, #0A2521 100%)" }}
    >
      <div
        aria-hidden
        className="absolute -left-40 top-1/4 w-[900px] h-[900px] rounded-full border border-white/[0.04]"
      />
      <div
        aria-hidden
        className="absolute -left-24 top-1/3 w-[640px] h-[640px] rounded-full border border-white/[0.05]"
      />

      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <img
          src={heroSrc}
          alt=""
          width={1600}
          height={1200}
          decoding="async"
          loading="eager"
          sizes="100vw"
          fetchPriority="high"
          className="gsap-hero-image absolute inset-0 w-full h-full object-cover mix-blend-luminosity will-change-transform"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,34,30,0.55) 0%, rgba(7,34,30,0.78) 60%, #07221E 100%)",
          }}
        />
      </div>

      <div
        aria-hidden
        className="gsap-hero-glow-main absolute top-[10%] right-[3%] w-[560px] h-[560px] rounded-full opacity-40 blur-3xl"
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,166,81,0.55), transparent 60%)" }}
        />
      </div>
      <div
        aria-hidden
        className="gsap-hero-glow-sub absolute bottom-[-10%] left-[-5%] w-[380px] h-[380px] rounded-full opacity-25 blur-3xl"
      >
        <div className="w-full h-full rounded-full bg-[var(--brand)]/40" />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="gsap-page-hero-reveal inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur border border-white/10 px-3.5 py-1.5">
              <span className="gsap-hero-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/70">
                // {kicker}
              </div>
            </div>

            <h1 className="gsap-page-hero-reveal mt-6 font-display text-[clamp(2.25rem,9vw,3rem)] sm:text-6xl md:text-7xl lg:text-[88px] leading-[1.02] sm:leading-[0.98] lg:leading-[0.95] text-white tracking-[-0.02em] [text-wrap:balance] break-words">
              {title}
            </h1>

            {lead && (
              <p className="gsap-page-hero-reveal mt-8 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
                {lead}
              </p>
            )}
            {children && <div className="gsap-page-hero-reveal mt-10">{children}</div>}
          </div>

          <div className="gsap-hero-visual lg:col-span-5 hidden md:block">
            {visual ?? <HeroPictogram variant={variant} />}
          </div>
        </div>

        <div className="gsap-page-hero-reveal hidden sm:flex absolute right-4 sm:right-6 bottom-0 items-center gap-3 text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">
          <span>Scroll</span>
          <span className="gsap-scroll-cue-line block h-8 w-px bg-white/30" />
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--brand)]">
      // {children}
    </div>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
