import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { Toaster } from "sonner";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);


import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import logoImg from "@/assets/logo/Logo.png";
import logoCroppedSvgUrl from "@/assets/logo/Logo-Cropped.svg?url";
import logoCroppedPngUrl from "@/assets/logo/Logo-Cropped.png";

const CTA_BG_URL = "https://images.pexels.com/photos/7615614/pexels-photo-7615614.jpeg";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Favored PLC — Trusted Pharmaceutical & Healthcare Solutions" },
      { name: "description", content: "Favored PLC imports and distributes premium pharmaceuticals, medical supplies, healthcare equipment and life-saving solutions for hospitals, clinics and pharmacies." },
      { property: "og:site_name", content: "Favored PLC" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Favored PLC — Trusted Pharmaceutical & Healthcare Solutions" },
      { name: "twitter:title", content: "Favored PLC — Trusted Pharmaceutical & Healthcare Solutions" },
      { property: "og:description", content: "Favored PLC imports and distributes premium pharmaceuticals, medical supplies, healthcare equipment and life-saving solutions for hospitals, clinics and pharmacies." },
      { name: "twitter:description", content: "Favored PLC imports and distributes premium pharmaceuticals, medical supplies, healthcare equipment and life-saving solutions for hospitals, clinics and pharmacies." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d4461a09-b016-4819-902d-798107afaf4d/id-preview-889ad667--6f3735cb-2248-44a9-a24d-120fe6510a38.lovable.app-1782466793892.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d4461a09-b016-4819-902d-798107afaf4d/id-preview-889ad667--6f3735cb-2248-44a9-a24d-120fe6510a38.lovable.app-1782466793892.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: logoCroppedPngUrl, type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "/#organization",
              name: "Favored PLC",
              url: "/",
              logo: "/favicon.ico",
              description: "Pharmaceutical imports, medical equipment, laboratory supplies, and hospital consumables for healthcare providers.",
              sameAs: [],
            },
            {
              "@type": "WebSite",
              "@id": "/#website",
              url: "/",
              name: "Favored PLC",
              publisher: { "@id": "/#organization" },
              inLanguage: "en",
            },
            {
              "@type": "LocalBusiness",
              "@id": "/#localbusiness",
              name: "Favored PLC",
              image: "/favicon.ico",
              telephone: "+251-11-000-0000",
              email: "hello@favoredplc.com",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Bole Sub-City",
                addressLocality: "Addis Ababa",
                addressCountry: "ET",
              },
              areaServed: "ET",
              openingHours: "Mo-Fr 08:30-17:30",
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const progressBarRef = useRef<HTMLDivElement>(null);
  const outletRef = useRef<HTMLDivElement>(null);

  // GSAP scroll progress bar — no stacking context issues
  useEffect(() => {
    if (!progressBarRef.current) return;
    const bar = progressBarRef.current;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      gsap.set(bar, { scaleX: progress, transformOrigin: "0% 50%", immediateRender: true });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP route transition — opacity ONLY, never y/transform on this wrapper
  // A transform on the outlet wrapper permanently breaks position:sticky on children
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (!outletRef.current) return;
    const el = outletRef.current;
    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power2.out", clearProps: "all" });
  }, [pathname]);

  // Ensure ScrollTrigger updates if images or dynamic content changes the body height
  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      {/* Scroll progress bar — pure GSAP, no framer stacking context */}
      <div
        ref={progressBarRef}
        style={{ transform: "scaleX(0)", transformOrigin: "0% 50%" }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--brand)] z-[60] pointer-events-none"
      />
      {/* Plain div — no transform/filter parent that breaks sticky */}
      <div ref={outletRef}>
        <Outlet />
      </div>
      <Footer key={pathname} />
      <Toaster position="bottom-right" richColors closeButton />
    </QueryClientProvider>
  );
}


const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/quality", label: "Quality" },
  { to: "/partners", label: "Partners" },
] as const;

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 60);

      // Hide if scrolling down past 200px, show if scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isSpecialHero = ["/about", "/products", "/quality", "/partners"].includes(pathname);
  const effectiveScrolled = scrolled || isSpecialHero;
  const onDark = !effectiveScrolled;

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        effectiveScrolled ? "top-4 inset-x-4 sm:inset-x-8" : "top-0 inset-x-0"
      }`}
      style={{ transform: hidden ? "translateY(-150%)" : "translateY(0)" }}
    >
      <div className="mx-auto max-w-[1440px]">
        <div
          className={`flex items-center transition-all duration-300 ${
            effectiveScrolled
              ? "bg-white px-6 sm:px-8 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-black/5 rounded-full"
              : "px-6 sm:px-10 py-5"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center">
            <img
              src={logoImg}
              alt="Favored PLC"
              className="h-10 sm:h-12 w-auto object-contain"
              style={{
                filter: onDark ? "brightness(0) invert(1)" : "none",
                transition: "filter 0.3s",
              }}
            />
          </Link>

          {/* Main nav links */}
          <nav className="hidden lg:flex items-center justify-start gap-10 flex-1 ml-12">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-base font-medium transition-colors ${
                  onDark
                    ? "text-white hover:text-white"
                    : "text-[var(--ink)] hover:text-[var(--ink)]"
                } data-[status=active]:text-[var(--brand)] data-[status=active]:font-semibold`}
                activeProps={{ "data-status": "active" } as any}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Contact Us */}
          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/contact"
              className={`hidden sm:inline-flex items-center gap-1.5 text-sm font-medium px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 ${
                onDark
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              Contact Us
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className={`lg:hidden p-2 relative w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
                onDark ? "text-white" : "text-[var(--brand)]"
              }`}
              aria-label="Menu"
              aria-expanded={open}
            >
              <Menu className={`absolute w-7 h-7 stroke-[3] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "scale-50 opacity-0 rotate-90" : "scale-100 opacity-100 rotate-0"}`} />
              <X className={`absolute w-7 h-7 stroke-[3] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "scale-100 opacity-100 rotate-0" : "scale-50 opacity-0 -rotate-90"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {typeof document !== "undefined" && createPortal(
        <div 
          className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[40] lg:hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setOpen(false)} 
          aria-hidden="true"
        />,
        document.body
      )}
      
      {/* Mobile menu dropdown */}
      <div 
        className={`mx-auto max-w-[1440px] lg:hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] absolute inset-x-0 top-full pt-2 sm:pt-4 origin-top ${
          open ? "opacity-100 pointer-events-auto translate-y-0 scale-y-100" : "opacity-0 pointer-events-none -translate-y-4 scale-y-95"
        }`}
      >
        <div className="rounded-3xl bg-white p-8 shadow-[0_20px_40px_rgb(0,0,0,0.1)] border border-black/5 flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-5 mt-2">
            {NAV_LINKS.map((l) => {
              const isActive = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 text-3xl sm:text-4xl font-display text-[var(--ink)] hover:text-[var(--brand)] transition-colors"
                >
                  {isActive ? (
                    <div className="w-3.5 h-3.5 bg-[var(--brand)] rounded-full shrink-0 shadow-sm" />
                  ) : (
                    <div className="w-3.5 h-3.5 opacity-0 shrink-0" />
                  )}
                  {l.label}
                </Link>
              );
            })}
          </div>
          
          <div className="mt-4 pt-8 border-t border-black/5 flex flex-col gap-5">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ink)]/40 mb-3">Contact</div>
              <div className="text-sm font-medium text-[var(--ink)]/80">hello@favoredplc.com</div>
              <div className="text-sm font-medium text-[var(--ink)]/80 mt-1">+251 11 000 0000</div>
            </div>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--brand)] text-white text-sm font-medium px-6 py-4 hover:bg-[var(--ink)] transition-colors w-full"
            >
              Let's Talk Supply
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

/** ─────────────────────────────────────────
 *  CTA SECTION
 * ───────────────────────────────────────── */
function CtaSection() {
  const ctaRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.gsap-cta-reveal', {
      scrollTrigger: {
        trigger: ctaRef.current,
        start: 'top 75%',
      },
      y: 24,
      opacity: 0,
      duration: 0.85,
      stagger: 0.15,
      ease: 'power2.out',
    });
  }, { scope: ctaRef });

  return (
    <section
      ref={ctaRef}
      className="relative w-full h-screen bg-cover bg-[center_35%]"
      style={{
        backgroundImage: `url(${CTA_BG_URL})`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#051612]/45" />

      {/* Layout */}
      <div
        className="relative h-full flex flex-col md:flex-row md:justify-between p-8 sm:p-12 md:p-20"
      >
        {/* TOP-LEFT — kicker + heading */}
        <div
          className="gsap-cta-reveal flex flex-col items-start w-full md:w-auto max-w-[420px]"
        >
          <p
            className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/50 font-mono mb-3 md:mb-5"
          >
            — WORK WITH FAVORED
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-[2.75rem] font-bold text-white font-display leading-[1.05] tracking-[-0.03em] capitalize mb-12 md:mb-0"
          >
            Build a healthier future, with
            <br />
            Favored PLC.
          </h2>
        </div>

        {/* BOTTOM-RIGHT — sub-heading, description, buttons */}
        <div
          className="gsap-cta-reveal flex flex-col items-start md:items-end text-left md:text-right mt-auto md:ml-auto w-full md:w-auto max-w-[500px]"
        >
          <h3
            className="text-2xl md:text-[1.75rem] font-bold text-white font-display leading-[1.1] tracking-[-0.025em] mb-4"
          >
            To deliver, not just distribute
          </h3>
          <p
            className="text-[10px] md:text-[11px] uppercase tracking-[0.1em] text-white/60 font-mono leading-[1.95] mb-8"
          >
            FAVORED PLC SUPPLIES VERIFIED PHARMACEUTICALS,
            <br className="hidden md:block" />
            MEDICAL DEVICES AND LABORATORY ESSENTIALS
            <br className="hidden md:block" />
            ACROSS HOSPITALS AND CLINICS NATIONWIDE.
          </p>
          <div className="flex flex-wrap justify-start md:justify-end gap-3.5 w-full">
            <Link
              to="/contact"
              className="inline-flex items-center bg-white text-[#03332F] px-7 py-3.5 text-xs font-semibold rounded-full tracking-[0.08em] uppercase font-mono transition-transform duration-300 hover:scale-105"
            >
              · GET IN TOUCH ·
            </Link>
            <Link
              to="/products"
              className="transition-transform duration-300 hover:scale-105"
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "1.5px solid rgba(255,255,255,0.5)",
                color: "white",
                padding: "0.85rem 1.75rem",
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 9999,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontFamily: "var(--font-mono)",
                backdropFilter: "blur(8px)",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              · EXPLORE PRODUCTS ·
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** ─────────────────────────────────────────
 *  FOOTER CONTENT (cream layout)
 * ───────────────────────────────────────── */
const FOOTER_BG = "#FFFFFF";

const FOOTER_COLS = [
  {
    label: "NAVIGATION",
    links: [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Products", to: "/products" },
      { label: "Quality", to: "/quality" },
      { label: "Partners", to: "/partners" },
    ],
  },
  {
    label: "PRODUCTS",
    links: [
      { label: "Prescription Medicines", to: "/products" },
      { label: "OTC & Consumer Health", to: "/products" },
      { label: "Medical Devices", to: "/products" },
      { label: "Laboratory Supplies", to: "/products" },
      { label: "Hospital Consumables", to: "/products" },
    ],
  },
  {
    label: "COMPANY",
    links: [
      { label: "About Favored PLC", to: "/about" },
      { label: "Quality Standards", to: "/quality" },
      { label: "Partner Program", to: "/partners" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
] as const;

function FooterNavColumn({ index }: { index: number }) {
  if (index < 3) {
    const col = FOOTER_COLS[index];
    return (
      <div className="px-4 py-8 sm:px-8 sm:py-10 lg:px-7 lg:pt-20 lg:pb-9 h-full flex flex-col">
        <p
          style={{
            fontSize: 10,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.36)",
            marginBottom: "1.1rem",
          }}
        >
          {col.label}
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
          {col.links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to as any}
                className="text-[#03332F] hover:text-[#009F5C] transition-colors duration-300"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  fontFamily: "var(--font-sans)",
                  textTransform: "uppercase",
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 sm:px-8 sm:py-10 lg:px-7 lg:pt-20 lg:pb-9 h-full flex flex-col">
      <p
        style={{
          fontSize: 10,
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(0,0,0,0.36)",
          marginBottom: "0.875rem",
          lineHeight: 1.75,
        }}
      >
        IF YOU HAVE ANY QUESTIONS
        <br />
        FEEL FREE TO CONTACT US:
      </p>
      <a
        href="mailto:hello@favoredplc.com"
        style={{
          display: "block",
          fontSize: 15,
          fontWeight: 700,
          color: "#03332F",
          textDecoration: "none",
          fontFamily: "var(--font-display)",
          marginBottom: "1.75rem",
          letterSpacing: "-0.01em",
        }}
      >
        HELLO@FAVOREDPLC.COM
      </a>

      <p
        style={{
          fontSize: 10,
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(0,0,0,0.36)",
          marginBottom: "0.6rem",
        }}
      >
        NEWSLETTER
      </p>
      <div
        style={{
          display: "flex",
          border: "1px solid rgba(0,0,0,0.12)",
          background: "white",
          marginBottom: "1.25rem",
          borderRadius: 9999,
          overflow: "hidden",
        }}
      >
        <input
          type="email"
          placeholder="your@email.com"
          style={{
            flex: 1,
            padding: "1rem 1.25rem",
            fontSize: 14,
            border: "none",
            outline: "none",
            background: "transparent",
            color: "#03332F",
            fontFamily: "var(--font-sans)",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "1rem 1.5rem",
            background: "#009F5C",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowRight style={{ width: 16, height: 16, color: "white" }} />
        </button>
      </div>
    </div>
  );
}

function FooterContent() {
  return (
    <div className="bg-transparent h-full w-full flex flex-col pointer-events-auto">
      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden lg:flex flex-col h-full w-full">
        {/* Nav columns grid */}
        <div className="grid grid-cols-4 flex-none border-b border-black/10">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="border-r border-black/10 last:border-r-0"
            >
              <FooterNavColumn index={i} />
            </div>
          ))}
        </div>

        {/* Large SVG logo */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-8 overflow-hidden">
          <img
            src={CTA_BG_URL}
            alt="Favored PLC"
            style={{
              width: "68%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 40%",
              WebkitMaskImage: `url(${logoCroppedSvgUrl})`,
              maskImage: `url(${logoCroppedSvgUrl})`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
        </div>

        {/* Bottom copyright bar */}
        <div className="border-t border-black/10 p-4 lg:px-7 flex justify-between items-center flex-none">
          <span className="text-[11px] text-black/35 font-mono tracking-[0.06em]">
            © {new Date().getFullYear()} FAVORED PLC — ALL RIGHTS RESERVED.
          </span>
          <div className="flex gap-6">
            {["PRIVACY", "TERMS", "COMPLIANCE"].map((t) => (
              <a
                key={t}
                href="#"
                className="text-[11px] text-black/35 font-mono tracking-[0.1em] hover:text-black transition-colors"
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="flex lg:hidden flex-col h-full w-full">
        {/* Box 1: Nav & Company */}
        <div className="flex border-b border-black/10 flex-none">
          <div className="flex-1 border-r border-black/10"><FooterNavColumn index={0} /></div>
          <div className="flex-1"><FooterNavColumn index={2} /></div>
        </div>
        {/* Box 2: Contact (Email Form, full width) */}
        <div className="w-full border-b border-black/10 flex-none">
          <FooterNavColumn index={3} />
        </div>
        {/* Box 3: Logo */}
        <div className="flex-1 border-b border-black/10 flex items-center justify-center min-h-[160px] p-8">
          <img
            src={CTA_BG_URL}
            alt="Favored PLC"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 40%",
              WebkitMaskImage: `url(${logoCroppedSvgUrl})`,
              maskImage: `url(${logoCroppedSvgUrl})`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
        </div>
        {/* Box 4: Privacy */}
        <div className="flex flex-col items-center justify-center gap-5 p-8 flex-none bg-white">
          <div className="flex gap-6">
            {["PRIVACY", "TERMS", "COMPLIANCE"].map((t) => (
              <a
                key={t}
                href="#"
                className="text-[11px] text-black/40 font-mono tracking-[0.1em] hover:text-[#009F5C] transition-colors"
              >
                {t}
              </a>
            ))}
          </div>
          <span className="text-[10px] text-black/30 font-mono tracking-[0.06em]">
            © {new Date().getFullYear()} FAVORED PLC
          </span>
        </div>
      </div>
    </div>
  );
}

/** ─────────────────────────────────────────
 *  FOOTER — GSAP ScrollTrigger curtain
 *  • GSAP pins the scene so it never unpeels at scroll end
 *  • 4 white bars drop down (staggered), aligned to the 4-column footer grid
 *  • FooterContent fades in on top once bars settle
 * ───────────────────────────────────────── */
function Footer() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);
  const footerContentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const bars = barsRef.current;
    const footerEl = footerContentRef.current;

    gsap.set(footerEl, { opacity: 0, pointerEvents: "none" });

    const mm = gsap.matchMedia();

    // Desktop: Curtain drops from top
    mm.add("(min-width: 1024px)", () => {
      gsap.set(bars, { yPercent: -100, x: 0, borderBottomLeftRadius: "3rem", borderBottomRightRadius: "3rem", borderTopRightRadius: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "site-footer-curtain-desktop",
          trigger: scene,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.to(bars, {
        keyframes: [
          { yPercent: 0, borderBottomLeftRadius: "3rem", borderBottomRightRadius: "3rem", duration: 0.34, ease: "power2.inOut" },
          { borderBottomLeftRadius: "0rem", borderBottomRightRadius: "0rem", duration: 0.06, ease: "power2.in" },
        ],
        stagger: 0.12,
      });

      tl.to(
        footerEl,
        {
          opacity: 1,
          duration: 0.25,
          ease: "power1.in",
          onStart: () => { if (footerEl) footerEl.style.pointerEvents = "auto"; },
          onReverseComplete: () => { if (footerEl) footerEl.style.pointerEvents = "none"; },
        },
        ">-0.05"
      );

      tl.to(bars, { borderColor: "rgba(0,0,0,0)", duration: 0.25, ease: "power1.in" }, "<");
    });

    // Mobile: Curtain slides from left to right
    mm.add("(max-width: 1023px)", () => {
      gsap.set(bars, { x: "-100vw", yPercent: 0, borderTopRightRadius: "3rem", borderBottomRightRadius: "3rem", borderBottomLeftRadius: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "site-footer-curtain-mobile",
          trigger: scene,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.to(bars, {
        keyframes: [
          { x: 0, borderTopRightRadius: "3rem", borderBottomRightRadius: "3rem", duration: 0.34, ease: "power2.inOut" },
          { borderTopRightRadius: "0rem", borderBottomRightRadius: "0rem", duration: 0.06, ease: "power2.in" },
        ],
        stagger: 0.12,
      });

      tl.to(
        footerEl,
        {
          opacity: 1,
          duration: 0.25,
          ease: "power1.in",
          onStart: () => { if (footerEl) footerEl.style.pointerEvents = "auto"; },
          onReverseComplete: () => { if (footerEl) footerEl.style.pointerEvents = "none"; },
        },
        ">-0.05"
      );

      tl.to(bars, { borderColor: "rgba(0,0,0,0)", duration: 0.25, ease: "power1.in" }, "<");
    });

    return () => mm.revert();
  }, { scope: sceneRef });

  return (
    // This outer div is what GSAP pins — it stays locked in viewport
    <div ref={sceneRef} style={{ position: "relative", height: "100vh", overflow: "hidden" }}>

      {/* ── CTA — bottom layer ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <CtaSection />
      </div>

      {/* ── 4 curtain bars — aligned to footer column grid ── */}
      {/* pointer-events:none so CTA buttons stay clickable */}
      <div className="absolute inset-0 z-[2] pointer-events-none grid grid-cols-1 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            ref={(el) => { if (el) barsRef.current[i] = el; }}
            className="bg-white overflow-hidden border-black/10 border-b last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
          >
            <div className="hidden lg:block h-full">
              <FooterNavColumn index={i} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer content — fades in above bars ── */}
      <div
        ref={footerContentRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          opacity: 0,
          pointerEvents: "none",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <FooterContent />
      </div>
    </div>
  );
}

