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
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Toaster } from "sonner";


import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import logoImg from "@/assets/logo/Logo.png";

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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "0% 50%" }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--brand)] z-[60] pointer-events-none"
      />
      {/* Route reveal curtain */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
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
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const onDark = !scrolled;

  return (
    <header
      className={`fixed z-50 transition-all duration-300 ${
        scrolled ? "top-4 inset-x-4 sm:inset-x-8" : "top-0 inset-x-0"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <div
          className={`flex items-center transition-all duration-300 ${
            scrolled
              ? "bg-white px-6 sm:px-8 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-black/5"
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
              className={`hidden sm:inline-flex items-center gap-1.5 text-sm font-medium px-6 py-3 transition-all duration-300 hover:scale-105 ${
                onDark
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
              style={{ borderRadius: scrolled ? "9999px" : "0" }}
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

function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand)]/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white inline-block p-4">
              <img src={logoImg} alt="Favored PLC" className="h-12 w-auto" />
            </div>
            <h3 className="font-display text-4xl sm:text-5xl mt-8 text-white max-w-md leading-[0.95]">
              Healthcare delivered. <span className="text-[var(--brand)]">Promise kept.</span>
            </h3>
            <form className="mt-8 max-w-sm">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">// Newsletter</label>
              <div className="mt-3 flex glass-dark rounded-full p-1">
                <input type="email" placeholder="your@email.com" className="flex-1 bg-transparent px-4 py-2 text-sm placeholder:text-white/40 outline-none" />
                <button className="rounded-full bg-[var(--brand)] text-white px-4 py-2 text-sm font-medium hover:bg-white hover:text-[var(--ink)] transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
          {[
            { t: "Sitemap", l: NAV_LINKS.map(n => ({ label: n.label, to: n.to })) },
            {
              t: "Products", l: [
                { label: "Prescription", to: "/products" }, { label: "OTC", to: "/products" },
                { label: "Devices", to: "/products" }, { label: "Laboratory", to: "/products" },
                { label: "Consumables", to: "/products" },
              ]
            },
            {
              t: "Contact", l: [
                { label: "+251 11 000 0000", to: "/contact" }, { label: "hello@favoredplc.com", to: "/contact" },
                { label: "Addis Ababa, ET", to: "/contact" }, { label: "LinkedIn", to: "/contact" },
              ]
            },
          ].map((c) => (
            <div key={c.t} className="lg:col-span-2">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 mb-5">// {c.t}</div>
              <ul className="space-y-3">
                {c.l.map((i) => (
                  <li key={i.label}>
                    <Link to={i.to as any} className="text-white/80 hover:text-[var(--brand)] transition-colors text-sm">{i.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-20">
          <div className="font-display text-[18vw] sm:text-[16vw] lg:text-[14vw] leading-[0.85] text-white/5 select-none">FAVORED</div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Favored PLC — All rights reserved.</div>
          <div className="flex gap-6 font-mono">
            <a href="#" className="hover:text-white">PRIVACY</a>
            <a href="#" className="hover:text-white">TERMS</a>
            <a href="#" className="hover:text-white">COMPLIANCE</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
