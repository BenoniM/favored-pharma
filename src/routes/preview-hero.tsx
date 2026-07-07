import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/preview-hero")({
  head: () => ({
    meta: [
      { title: "Hero Preview — Favored PLC" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: PreviewHeroPage,
});

const ROUTES = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About (PageHero · cross)" },
  
  { path: "/products", label: "Products (PageHero · pill)" },
  { path: "/quality", label: "Quality (PageHero · stethoscope)" },
  { path: "/partners", label: "Partners" },
  { path: "/contact", label: "Contact" },
];

const BREAKPOINTS = [
  { w: 320, label: "320 · iPhone SE" },
  { w: 375, label: "375 · iPhone 12 mini" },
  { w: 414, label: "414 · Pro Max" },
  { w: 640, label: "640 · sm" },
  { w: 768, label: "768 · md" },
  { w: 1024, label: "1024 · lg" },
  { w: 1280, label: "1280 · xl" },
];

function PreviewHeroPage() {
  const [selected, setSelected] = useState<string[]>(["/", "/about"]);
  const [widths, setWidths] = useState<number[]>([320, 375, 768, 1280]);
  const [heroHeight, setHeroHeight] = useState(820);

  const toggle = <T,>(arr: T[], v: T, set: (a: T[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-20">
      <div className="mx-auto max-w-[1440px] px-6">
        <header className="mb-8">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-700">
            // Internal · hero preview
          </div>
          <h1 className="font-display text-3xl sm:text-4xl mt-2 tracking-tight">
            Hero typography & breakpoint preview
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl text-sm">
            Side-by-side iframes of the Home hero and every <code>PageHero</code> variant across
            mobile, tablet, and desktop widths. Use to spot wrapping, leading, and tracking
            mismatches before shipping.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Routes</div>
            <div className="flex flex-wrap gap-1.5">
              {ROUTES.map((r) => {
                const on = selected.includes(r.path);
                return (
                  <button
                    key={r.path}
                    onClick={() => toggle(selected, r.path, setSelected)}
                    className={`text-xs px-2.5 py-1.5 rounded-full border transition-colors ${
                      on
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Widths (px)</div>
            <div className="flex flex-wrap gap-1.5">
              {BREAKPOINTS.map((b) => {
                const on = widths.includes(b.w);
                return (
                  <button
                    key={b.w}
                    onClick={() => toggle(widths, b.w, setWidths)}
                    className={`text-xs px-2.5 py-1.5 rounded-full border transition-colors ${
                      on
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {b.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
              Frame height · {heroHeight}px
            </div>
            <input
              type="range"
              min={500}
              max={1400}
              step={20}
              value={heroHeight}
              onChange={(e) => setHeroHeight(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="mt-3 text-[11px] text-slate-500">
              Tip: open <code>/preview-hero</code> in a wide window for the best side-by-side view.
            </div>
          </div>
        </div>

        <div className="space-y-10">
          {selected.map((path) => {
            const route = ROUTES.find((r) => r.path === path)!;
            return (
              <section key={path}>
                <div className="flex items-baseline justify-between mb-3">
                  <h2 className="font-display text-xl tracking-tight">{route.label}</h2>
                  <code className="text-xs text-slate-500">{route.path}</code>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2">
                  {widths.map((w) => (
                    <figure
                      key={w}
                      className="shrink-0 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm"
                      style={{ width: w + 2 }}
                    >
                      <figcaption className="flex items-center justify-between text-[11px] font-mono px-3 py-2 bg-slate-100 border-b border-slate-200">
                        <span className="text-slate-700">{w}px</span>
                        <a
                          href={path}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-700 hover:underline"
                        >
                          open ↗
                        </a>
                      </figcaption>
                      <iframe
                        title={`${route.label} @ ${w}`}
                        src={path}
                        loading="lazy"
                        style={{ width: w, height: heroHeight, border: 0, display: "block" }}
                      />
                    </figure>
                  ))}
                </div>
              </section>
            );
          })}
          {selected.length === 0 && (
            <div className="text-center py-20 text-slate-500 text-sm">
              Select at least one route above to start previewing.
            </div>
          )}
        </div>

        <footer className="mt-16 pt-6 border-t border-slate-200 text-xs text-slate-500">
          Reference tokens are documented in{" "}
          <code>docs/visual-regression-checklist.md</code>. Update both the home hero and
          <code> PageHero</code> when changing any typography token.
        </footer>
      </div>
    </div>
  );
}
