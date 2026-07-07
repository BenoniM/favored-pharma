import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { Pill, Plus, Activity, Stethoscope } from "lucide-react";
import heroWarehouseAsset from "@/assets/hero-warehouse.jpg.asset.json";
import heroCheckupAsset from "@/assets/hero-checkup.jpg.asset.json";
import heroVialsAsset from "@/assets/hero-vials.jpg.asset.json";
import heroVaccineAsset from "@/assets/hero-vaccine.jpg.asset.json";

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

/** Per-variant tinted backplate — matches image hue so there is no flash before decode. */
const heroBackplates: Record<string, string> = {
  pill:        "radial-gradient(60% 60% at 75% 30%, color-mix(in oklab, var(--brand) 18%, transparent), transparent 70%), var(--mist)",
  cross:       "radial-gradient(55% 55% at 70% 35%, color-mix(in oklab, var(--brand) 22%, transparent), transparent 72%), var(--mist)",
  pulse:       "radial-gradient(70% 50% at 65% 50%, color-mix(in oklab, var(--brand) 14%, transparent), transparent 75%), var(--mist)",
  stethoscope: "radial-gradient(55% 60% at 70% 40%, color-mix(in oklab, var(--brand) 20%, transparent), transparent 70%), var(--mist)",
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Per-word reveal — awwwards-style headline choreography. */
export function AnimatedHeadline({
  text,
  className = "",
  as: Tag = "h1",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: any;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.85, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Decorative animated pictogram used as the default hero visual. */
export function HeroPictogram({ variant = "pill" }: { variant?: "pill" | "cross" | "pulse" | "stethoscope" }) {
  const reduce = useReducedMotion();
  const Icon = variant === "cross" ? Plus : variant === "pulse" ? Activity : variant === "stethoscope" ? Stethoscope : Pill;
  const float = reduce ? {} : { y: [0, -14, 0], rotate: [0, 4, 0] };
  const orbit = reduce ? {} : { rotate: [0, 360] };

  return (
    <div className="relative w-full aspect-square max-w-[480px] mx-auto">
      {/* Soft gradient backplate */}
      <div aria-hidden className="absolute inset-6 rounded-full opacity-70 blur-2xl" style={{ background: "var(--gradient-glow)" }} />
      {/* Orbit ring */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full border border-[var(--brand)]/30"
        animate={orbit}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[var(--brand)] shadow-[0_0_24px_var(--brand)]" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-2 w-2 rounded-full bg-[var(--ink)]" />
      </motion.div>
      <motion.div
        aria-hidden
        className="absolute inset-8 rounded-full border border-dashed border-[var(--brand)]/30"
        animate={reduce ? {} : { rotate: [360, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      {/* Center card */}
      <motion.div
        className="absolute inset-0 grid place-items-center"
        animate={float}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="glass rounded-[32px] p-8 shadow-[var(--shadow-card)] border border-white/40">
          <Icon className="h-16 w-16 sm:h-20 sm:w-20 text-[var(--brand)]" strokeWidth={1.5} />
        </div>
      </motion.div>
      {/* Floating chips */}
      {[
        { t: "WHO-GMP", c: "top-2 left-0" },
        { t: "Cold chain · 2-8°C", c: "bottom-6 right-0" },
        { t: "Lot traceable", c: "bottom-0 left-6" },
      ].map((chip, i) => (
        <motion.div
          key={chip.t}
          className={`absolute ${chip.c} glass rounded-full px-3 py-1.5 text-[10px] font-mono tracking-wide text-[var(--ink)] shadow-[var(--shadow-card)]`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
        >
          <motion.span animate={reduce ? {} : { y: [0, -4, 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }} className="inline-block">
            {chip.t}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

/** Hero with mouse-parallax orb + animated kicker, lead, CTA + pictorial visual. */
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
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const orbX = useTransform(sx, (v) => (reduce ? 0 : v * 40));
  const orbY = useTransform(sy, (v) => (reduce ? 0 : v * 30));

  // Scroll-linked parallax — consistent across every route.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);
  const scrollScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.08]);
  const scrollFade = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.55, 0.2]);
  const mouseY = useTransform(sy, (v) => (reduce ? 0 : v * 18));
  const mouseX = useTransform(sx, (v) => (reduce ? 0 : v * 22));

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  // Preload the active hero image so it lands as the LCP candidate.
  const heroSrc = heroImages[variant] ?? heroWarehouse;
  useEffect(() => {
    if (typeof document === "undefined") return;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = heroSrc;
    (link as any).fetchPriority = "high";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, [heroSrc]);

  return (
    <section
      ref={ref}
      className="relative pt-36 sm:pt-44 pb-24 overflow-hidden text-white"
      style={{ background: "linear-gradient(180deg, #07221E 0%, #0B2B26 55%, #0A2521 100%)" }}
    >
      {/* Faint brand rings */}
      <div aria-hidden className="absolute -left-40 top-1/4 w-[900px] h-[900px] rounded-full border border-white/[0.04]" />
      <div aria-hidden className="absolute -left-24 top-1/3 w-[640px] h-[640px] rounded-full border border-white/[0.05]" />

      {/* Pictorial backdrop image with scroll + variant crossfade */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="sync" initial={false}>
          <motion.img
            key={heroSrc}
            src={heroSrc}
            alt=""
            width={1600}
            height={1200}
            decoding="async"
            loading="eager"
            sizes="100vw"
            // @ts-expect-error — supported HTML attr
            fetchpriority="high"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.45, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: scrollY, scale: scrollScale, x: mouseX }}
            className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity will-change-transform"
          />
        </AnimatePresence>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,34,30,0.55) 0%, rgba(7,34,30,0.78) 60%, #07221E 100%)" }} />
        <motion.div style={{ opacity: scrollFade }} className="absolute inset-0" />
      </div>

      {/* Brand glow */}
      <motion.div
        aria-hidden
        style={{ x: orbX, y: orbY }}
        className="absolute top-[10%] right-[3%] w-[560px] h-[560px] rounded-full opacity-40 blur-3xl"
      >
        <motion.div
          className="w-full h-full rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,166,81,0.55), transparent 60%)" }}
          animate={reduce ? {} : { scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x: useTransform(sx, (v) => (reduce ? 0 : v * -25)), y: useTransform(sy, (v) => (reduce ? 0 : v * -20)) }}
        className="absolute bottom-[-10%] left-[-5%] w-[380px] h-[380px] rounded-full opacity-25 blur-3xl"
      >
        <div className="w-full h-full rounded-full bg-[var(--brand)]/40" />
      </motion.div>

      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur border border-white/10 px-3.5 py-1.5"
            >
              <motion.span
                className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand)]"
                animate={reduce ? {} : { scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/70">// {kicker}</div>
            </motion.div>

            <h1 className="mt-6 font-display text-[clamp(2.25rem,9vw,3rem)] sm:text-6xl md:text-7xl lg:text-[88px] leading-[1.02] sm:leading-[0.98] lg:leading-[0.95] text-white tracking-[-0.02em] [text-wrap:balance] break-words">
              {title}
            </h1>

            {lead && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-8 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed"
              >
                {lead}
              </motion.p>
            )}
            {children && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="mt-10"
              >
                {children}
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 hidden md:block"
          >
            {visual ?? <HeroPictogram variant={variant} />}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="hidden sm:flex absolute right-4 sm:right-6 bottom-0 items-center gap-3 text-[10px] font-mono uppercase tracking-[0.25em] text-white/40"
        >
          <span>Scroll</span>
          <motion.span
            className="block h-8 w-px bg-white/30"
            animate={reduce ? {} : { scaleY: [0.2, 1, 0.2], originY: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--brand)]">// {children}</div>;
}

/** Wraps a route in a page transition (mounted via AnimatePresence in __root). */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}


