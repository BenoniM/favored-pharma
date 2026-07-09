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
      <Footer />
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
              className={`lg:hidden p-2 ${
                onDark ? "text-white" : "text-[var(--ink)]"
              }`}
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden border-t py-4 px-6 flex flex-col gap-2"
          style={{
            background: "#ffffff",
            borderColor: "rgba(0,0,0,0.08)",
          }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="py-3 text-sm font-medium text-[var(--ink)]/80 hover:text-[var(--ink)] border-b border-black/5 last:border-0"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-2 inline-flex items-center justify-center bg-[#00A651] text-white text-sm font-medium px-5 py-3"
          >
            Contact Us
          </Link>
        </div>
      )}
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
      className="relative w-full"
      style={{
        height: "100vh",
        backgroundImage: `url(${CTA_BG_URL})`,
        backgroundSize: "cover",
        backgroundPosition: "center 35%",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(5,22,18,0.45)" }} />

      {/* Layout */}
      <div
        className="relative h-full flex flex-col"
        style={{ padding: "clamp(2rem,5vw,5rem)" }}
      >
        {/* TOP-LEFT — kicker + heading */}
        <div
          className="gsap-cta-reveal"
          style={{ maxWidth: 420 }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.52)",
              fontFamily: "var(--font-mono)",
              marginBottom: "1.25rem",
            }}
          >
            — WORK WITH FAVORED
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem,3.5vw,2.75rem)",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.05,
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
              textTransform: "capitalize"
            }}
          >
            Build a healthier future, with
            <br />
            Favored PLC.
          </h2>
        </div>

        {/* BOTTOM-RIGHT — sub-heading, description, buttons */}
        <div
          className="gsap-cta-reveal"
          style={{
            marginTop: "auto",
            marginLeft: "auto",
            maxWidth: 500,
            textAlign: "right",
          }}
        >
          <h3
            style={{
              fontSize: "clamp(1.25rem,2vw,1.75rem)",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.1,
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.025em",
              marginBottom: "1rem",
            }}
          >
            To deliver, not just distribute
          </h3>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.58)",
              lineHeight: 1.95,
              fontFamily: "var(--font-mono)",
              marginBottom: "2rem",
            }}
          >
            FAVORED PLC SUPPLIES VERIFIED PHARMACEUTICALS,
            <br />
            MEDICAL DEVICES AND LABORATORY ESSENTIALS
            <br />
            ACROSS HOSPITALS AND CLINICS NATIONWIDE.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "flex-end" }}>
            <Link
              to="/contact"
              className="transition-transform duration-300 hover:scale-105"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "white",
                color: "#03332F",
                padding: "0.85rem 1.75rem",
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 9999,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontFamily: "var(--font-mono)",
              }}
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
      <div
        style={{
          padding: "5rem 1.75rem 2.25rem",
          height: "100%",
        }}
      >
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
    <div style={{ padding: "5rem 1.75rem 2.25rem", height: "100%" }}>
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
            padding: "0.6rem 0.875rem 0.6rem 1.25rem",
            fontSize: 12,
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
            padding: "0.6rem 1rem",
            background: "#009F5C",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowRight style={{ width: 14, height: 14, color: "white" }} />
        </button>
      </div>
    </div>
  );
}

function FooterContent() {
  return (
    <div
      style={{
        background: "transparent",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Nav columns grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          flex: "0 0 auto",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              borderRight: i < 3 ? "1px solid rgba(0,0,0,0.08)" : "none",
            }}
          >
            <FooterNavColumn index={i} />
          </div>
        ))}
      </div>

      {/* Large SVG logo — CTA image shows through it via CSS mask */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem 2rem",
          overflow: "hidden",
        }}
      >
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
      <div
        style={{
          borderTop: "1px solid rgba(0,0,0,0.08)",
          padding: "1rem 1.75rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flex: "0 0 auto",
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "rgba(0,0,0,0.35)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.06em",
          }}
        >
          © {new Date().getFullYear()} FAVORED PLC — ALL RIGHTS RESERVED.
        </span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["PRIVACY", "TERMS", "COMPLIANCE"].map((t) => (
            <a
              key={t}
              href="#"
              style={{
                fontSize: 11,
                color: "rgba(0,0,0,0.35)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.1em",
                textDecoration: "none",
              }}
            >
              {t}
            </a>
          ))}
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

    // Reset initial state
    gsap.set(bars, { yPercent: -100 });
    gsap.set(footerEl, { opacity: 0, pointerEvents: "none" });

    // Main timeline scrubbed by scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        id: "site-footer-curtain",
        trigger: scene,
        start: "top top",
        // pin for 2 extra screenheights of scroll travel
        end: "+=200%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        refreshPriority: -1,
      },
    });

    // Reset initial state — bars start subtly rounded at bottom
    gsap.set(bars, { borderBottomLeftRadius: "3rem", borderBottomRightRadius: "3rem" });

    // Each bar drops rounded, then flattens ONLY at the very bottom of its travel
    tl.to(bars, {
      keyframes: [
        // Phase 1: full drop, corners stay round
        { yPercent: 0, borderBottomLeftRadius: "3rem", borderBottomRightRadius: "3rem", duration: 0.34, ease: "power2.inOut" },
        // Phase 2: landed — snap to flat rectangle
        { borderBottomLeftRadius: "0rem", borderBottomRightRadius: "0rem", duration: 0.06, ease: "power2.in" },
      ],
      stagger: 0.12,
    });

    // Footer content fades in after bars are mostly down
    tl.to(
      footerEl,
      {
        opacity: 1,
        duration: 0.25,
        ease: "power1.in",
        onStart: () => { if (footerEl) footerEl.style.pointerEvents = "auto"; },
        onReverseComplete: () => { if (footerEl) footerEl.style.pointerEvents = "none"; },
      },
      ">-0.05",
    );

    // Simultaneously fade out the full-height borders on the bars
    // so they don't cut through the logo in the bottom half
    tl.to(
      bars,
      {
        borderRightColor: "rgba(0,0,0,0)",
        duration: 0.25,
        ease: "power1.in",
      },
      "<"
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
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
      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            ref={(el) => { if (el) barsRef.current[i] = el; }}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${i * 25}%`,
              width: "25%",
              background: FOOTER_BG,
              // right border of bars 0,1,2 = left dividers at 25%, 50%, 75%
              // exactly where the footer grid has its column borders
              borderRight: i < 3 ? "2px solid rgba(0,0,0,0.12)" : "none",
              overflow: "hidden",
            }}
          >
            <FooterNavColumn index={i} />
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
          overflow: "hidden",
        }}
      >
        <FooterContent />
      </div>
    </div>
  );
}

