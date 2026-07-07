# Visual Regression / Typography Checklist

Lightweight manual + scripted checks to catch hero typography mismatches between
the Home hero (`src/routes/index.tsx`) and the shared `PageHero`
(`src/components/site.tsx`) used by every subpage.

## Why this exists

The home `<h1>` and the `PageHero` `<h1>` are authored separately but MUST share
the same font scale, leading, tracking, color, and mobile wrapping behavior. A
diff in either file can desync them silently.

## Source-of-truth typography tokens (must match in BOTH files)

| Property      | Value                                                        |
| ------------- | ------------------------------------------------------------ |
| font-family   | `font-display` (Archivo)                                     |
| size          | `text-[clamp(2.25rem,9vw,3rem)] sm:text-6xl md:text-7xl lg:text-[88px]` |
| leading       | `leading-[1.02] sm:leading-[0.98] lg:leading-[0.95]`         |
| tracking      | `tracking-[-0.02em]`                                         |
| color         | `text-white`                                                 |
| wrapping      | `[text-wrap:balance] break-words`                            |

If you change one, change the other in the same commit.

## Breakpoint matrix to verify

| Width  | Device class         | Expect                                                  |
| ------ | -------------------- | ------------------------------------------------------- |
| 320 px | iPhone SE 1st gen    | Headline fits, no horizontal scroll, no clipped letters |
| 375 px | iPhone SE / 12 mini  | Max 4 wrapped lines, brand-green word on its own line OK |
| 414 px | iPhone Pro Max       | Headline still ≤ 3rem (clamp ceiling holds)             |
| 640 px | sm breakpoint        | Jumps to `text-6xl`, leading tightens                   |
| 768 px | md / tablet          | `text-7xl`                                              |
| 1280 px| lg / desktop         | `text-[88px]`, single-line "for a better tomorrow."     |

## Manual checklist (per release)

For each route in `[/ , /about , /solutions , /products , /quality , /partners , /contact]`:

- [ ] Hero `<h1>` does not overflow viewport at 320 px width.
- [ ] No mid-word breaks except where `break-words` is the intended fallback.
- [ ] Subpage `PageHero` headline visually matches home headline size at the
      same breakpoint (open both in two tabs, compare).
- [ ] Brand-green accent word stays on the same baseline as surrounding text.
- [ ] Lead paragraph wraps to ≤ 4 lines on mobile.
- [ ] CTA row does not wrap into more than 2 lines on mobile.
- [ ] No layout shift after hero image decodes (backplate visible immediately).

## Scripted screenshot pass (Playwright)

Run the snippet below from the sandbox shell to capture all hero variants at
three widths. Compare the resulting PNGs in `/tmp/browser/hero-vr/screenshots/`
against the previous build's set.

```python
import asyncio, os
from pathlib import Path
from playwright.async_api import async_playwright

ROUTES = ["/", "/about", "/solutions", "/products", "/quality", "/partners", "/contact"]
WIDTHS = [(320, "xs"), (375, "sm-phone"), (768, "tablet"), (1280, "desktop")]
OUT = Path("/tmp/browser/hero-vr/screenshots"); OUT.mkdir(parents=True, exist_ok=True)

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        for w, label in WIDTHS:
            ctx = await browser.new_context(viewport={"width": w, "height": 900})
            page = await ctx.new_page()
            for r in ROUTES:
                await page.goto(f"http://localhost:8080{r}", wait_until="networkidle")
                slug = r.strip("/") or "home"
                await page.screenshot(path=str(OUT / f"{label}_{slug}.png"), clip={
                    "x": 0, "y": 0, "width": w, "height": 900,
                })
            await ctx.close()
        await browser.close()

asyncio.run(main())
```

## Pass criteria

- Hero `<h1>` rendered height is within ±8 px between Home and the closest
  PageHero variant at the same width.
- No PNG shows a horizontal scrollbar or clipped glyphs.
- The brand-green accent word color resolves to `oklch(0.62 0.18 152)` (sample
  with browser dev tools if a diff is suspected).
