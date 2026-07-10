---
name: v3-design
description: Design system and implementation guide for the Katsumii v3 landing design ("cinematic ink"). Use whenever building or extending pages/sections in the v3 look — new subpages, new sections, redesigns of existing pages to match /v3. Trigger words — "v3", "v3 design", "new landing design", "match the v3 page".
---

# Katsumii v3 Design System — "Cinematic Ink"

The reference implementation is `src/components/LandingV3.vue` (route `/v3`).
**When in doubt: open that file and copy the existing pattern.** Never invent a new
variant of something that already exists there.

## 0. Hard rules (read first, weaker models: follow literally)

1. **English only.** All UI copy on v3 pages is English, regardless of the request language.
2. **Dark only.** v3 pages do NOT use the site's light/dark toggle, `isDark` inject, or
   Tailwind `dark:` classes. Everything is styled with the `--v3-*` CSS variables below.
3. **No Tailwind utility classes** in v3 components. v3 uses scoped CSS with `v3-` prefixed
   class names. (The rest of the site uses Tailwind — do not mix the two systems in one file.)
4. **Copy the tokens, don't approximate.** Use the exact hex values in section 1.
   Never introduce new accent colors, purples, blues or gradients that are not listed.
5. **Reuse existing classes** (`v3-btn`, `v3-eyebrow`, `v3-card`, `v3-reveal`, …) before
   writing new CSS. New class names must start with `v3-`.
6. **No invented content.** No fake testimonials, fake user counts, fake logos, fake
   metrics. Product facts come from the app itself (see `CLAUDE.md` → X25V section).
   Real numbers already vetted: 4 trading modes, 100% local data, 6 built-in tools,
   4 sync providers (MT5, ProjectX, Capital.com, OANDA).
7. **Never edit** `src/App.vue`, `HomeHero.vue`, `LandingV2.vue`, `index.html` or other
   legacy pages when working on v3 — the legacy site must keep working unchanged.
8. **Every animation must respect `prefers-reduced-motion`** (pattern in section 5).
9. Assets are referenced via `import.meta.env.BASE_URL`:
   ```js
   const baseUrl = import.meta.env.BASE_URL
   const asset = (path) => `${baseUrl}${path}`   // asset('logo.png')
   ```

## 1. Design tokens (copy verbatim)

Every v3 page root gets the class `v3` (or copies this block into its own root class):

```css
--v3-bg: #04100e;            /* page background — deep teal-black ink */
--v3-bg-soft: #071b17;       /* slightly lifted surfaces */
--v3-panel: rgba(13, 38, 33, 0.42);   /* card fill (use in a gradient, see cards) */
--v3-line: rgba(94, 234, 212, 0.1);   /* default hairline border */
--v3-line-strong: rgba(94, 234, 212, 0.24); /* emphasized border (image frames, chips) */
--v3-ink: #eaf6f2;           /* primary text */
--v3-muted: #93b3ab;         /* secondary text */
--v3-faint: #557069;         /* tertiary text, labels */
--v3-accent: #2dd4bf;        /* teal accent (interactive, highlights) */
--v3-accent-deep: #0f9f8f;   /* legacy brand teal (gradients, depth) */
--v3-accent-hi: #7ff0dd;     /* bright teal (italic em-words, hover, mono numbers) */
```

Page background (on the root element, not on body):

```css
background:
  radial-gradient(ellipse 90% 60% at 70% -10%, rgba(15, 159, 143, 0.16), transparent 60%),
  radial-gradient(ellipse 60% 50% at 8% 40%, rgba(15, 159, 143, 0.07), transparent 60%),
  var(--v3-bg);
```

Per-mode colors (only when content is about a specific trading mode):
Funded `#2dd4bf` · Challenge `#facc15` · Personal `#60a5fa` · Backtest `#c084fc`.
Applied via a CSS variable: `style="--mode-c: #facc15"`, consumed as `var(--mode-c)`.

## 2. Typography

| Role | Font | Rules |
|---|---|---|
| Display (h1/h2/h3, big statements) | `"Sora", "Manrope", sans-serif` | weight 600, `letter-spacing: -0.035em` to `-0.045em`, `line-height: 1.0–1.08` |
| Accent word inside a display line | `"DM Sans", sans-serif` italic, weight 300 | color `var(--v3-accent-hi)` — max ONE em-word per headline |
| Body | `"Manrope", "Segoe UI", sans-serif` | 1.0625rem base, `line-height: 1.65`, body text color `var(--v3-muted)` |
| Numbers, labels, eyebrows, chips | `"DM Mono", monospace` | uppercase labels with `letter-spacing: 0.1em–0.22em`, small sizes (0.68–0.78rem) |

Sizes always with `clamp()`, e.g. h2: `clamp(2.1rem, 4.6vw, 3.7rem)`.
Headlines may end with a teal period: `<b class="v3-dot">.</b>` — this is a signature detail.
Fonts are already self-hosted (`public/fonts/fonts.css`) — never add Google Fonts links.

## 3. Recurring components (reuse, don't reinvent)

All of these exist in `LandingV3.vue` — copy the CSS if building a separate component.

- **Eyebrow** — every section starts with one:
  ```html
  <p class="v3-eyebrow"><i></i>Section topic</p>
  ```
  (DM Mono, uppercase, teal, 26px line before the text.)
- **Primary button** `v3-btn`: pill, teal gradient `linear-gradient(135deg, var(--v3-accent-deep), var(--v3-accent))`,
  dark text `#02110d`, teal glow shadow. Arrow suffix: `<span aria-hidden="true">→</span>`.
- **Quiet link** `v3-quiet`: muted text link, hover → `var(--v3-accent-hi)`.
- **Card** `v3-card`: `border: 1px solid var(--v3-line)`, `border-radius: 20px`,
  `background: linear-gradient(160deg, var(--v3-panel), rgba(7, 27, 23, 0.12))`,
  hover lifts 4px and brightens the border. Icons: 42px rounded square, inline stroke SVG
  (stroke-width 1.5), never emoji.
- **Mono chips** `v3-card-chips` / `v3-local-chips`: pill, DM Mono uppercase ~0.7rem, teal text.
- **Screenshot frame** `v3-slide-frame` / `v3-hero-shot`: `border-radius: 18px`,
  `border: 1px solid var(--v3-line-strong)`, heavy soft shadow
  `0 34px 90px -40px rgba(0,0,0,0.85)`; dark app screenshots only (`*_dark.png`).
- **Kanji watermark** (signature element, use sparingly — max one per page section, only
  where there is empty space): huge outlined CJK glyph, decorative only:
  ```css
  font-family: "Yu Mincho", "Hiragino Mincho ProN", "Noto Serif CJK JP", serif;
  color: transparent; -webkit-text-stroke: 1px rgba(94, 234, 212, 0.13);
  ```
  Always `aria-hidden="true"`. Established glyphs: 勝 (hero/win), 守 (protect/local-first).
  Do not add new kanji without checking their meaning.
- **Noise overlay + reading progress bar**: already global on the v3 page root — do not duplicate per section.

## 4. Layout rhythm

- Content column: `max-width: 1240px; margin: 0 auto; padding: 0 clamp(1.25rem, 5vw, 4rem)`.
- Vertical gap between sections: `margin-top: clamp(6rem, 14vh, 10rem)` — generous, never cramped.
- **Vary the section pattern.** Never stack the same "centered heading + 3 cards" twice.
  Existing rhythm on /v3: full-bleed hero → thin stat strip → pinned scene → horizontal
  gallery → asymmetric 12-col grid (spans 5/6/7) → full-width manifesto band → centered CTA.
  New sections must pick a *different* shape than their neighbors.
- Manifesto-style bands sit between `border-top/bottom: 1px solid var(--v3-line)` with a
  subtle vertical gradient fill.
- Footer: single line, faint, minimal.

## 5. Motion (GSAP) — exact patterns

GSAP + ScrollTrigger are dependencies already (`gsap@^3.15`). Register inside the component:

```js
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
// in onMounted:
gsap.registerPlugin(ScrollTrigger)
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
gsapCtx = gsap.context(() => {
  if (reduced) { gsap.set(".v3-reveal", { opacity: 1, y: 0 }); return }
  gsap.set(".v3-reveal", { opacity: 0, y: 26 })
  ScrollTrigger.batch(".v3-reveal", {
    start: "top 88%", once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, stagger: 0.09, ease: "power3.out", overwrite: true }),
  })
}, rootEl.value)
// in onBeforeUnmount: gsapCtx?.revert()
```

Rules:
- Default entrance = the `.v3-reveal` batch above. Add the class in the template; done.
- Ease: `power3.out` (or CSS `cubic-bezier(0.22, 1, 0.36, 1)`); durations 0.3–0.9s; reveals fire **once**.
- Pinned/scrubbed scenes (like the modes scene or horizontal gallery) are **desktop only**:
  wrap them in `gsap.matchMedia().add("(min-width: 900px)", () => { ... return cleanup })`
  and provide a plain stacked/swipeable fallback for mobile (see `.v3-modes-stack` and the
  scroll-snap `.v3-track-clip` in the reference file).
- Hero-style load-ins use pure CSS keyframes (`v3-rise`, `v3-fade`) with animation-delays —
  no JS needed. Reduced-motion media query disables them (already in the reference CSS).
- Always clean up: `gsap.context` scoped to the component root + `revert()` on unmount;
  remove every event listener you add.
- Maximum ONE "wow" scene per page (pin, canvas, horizontal scroll). Everything else stays
  subtle. Do not add parallax to body text.

## 6. Performance checklist (must pass before "done")

- [ ] No Three.js, no new animation libraries — GSAP + 2D canvas at most.
- [ ] Canvas (if any): cap `devicePixelRatio` at 1.5, pause via IntersectionObserver and
      `visibilitychange`, skip entirely under reduced motion.
- [ ] All `<img>` have `width`, `height`, and descriptive `alt`; below-the-fold images get
      `loading="lazy" decoding="async"`; only the hero image gets `fetchpriority="high"`.
- [ ] New pages are lazy route imports: `const X = () => import("./components/X.vue")`.
- [ ] `npm run build` passes.
- [ ] No horizontal page scroll at 375px width (check `document.documentElement.scrollWidth === innerWidth`).

## 7. Routing & page skeleton

New v3 pages follow the `/v3` route pattern in `src/router.js` (noindex while in preview):

```js
{ path: "/v3/<name>", component: LandingV3X, meta: { titleKey: "common.pageTitles.app", descriptionKey: "common.pageDescriptions.app", robots: "noindex, follow" } },
```

Component skeleton (matches the reference file):

```
<template>
  <div ref="rootEl" class="v3">            ← tokens + background come from this class
    <header class="v3-nav"> …              ← copy nav from LandingV3.vue, keep links consistent
    <main>
      <section> eyebrow → h2 → content </section> × n
    </main>
    <footer class="v3-footer"> …
  </div>
</template>
```

- `document.body.classList.add("v3-body")` on mount / remove on unmount (dark body behind overscroll).
- Internal links: `<RouterLink to="/en/pricing">` etc. CTA always targets `/en/pricing`.
- One `<h1>` per page; sections use `<h2>`, cards `<h3>`.
- Buttons that switch state are real `<button type="button">`; decorations get `aria-hidden="true"`;
  keep visible `:focus-visible` outlines (`2px solid var(--v3-accent)`).

## 8. Voice & copy style

- Tone: calm, confident, craft-focused — **not** hypey finance marketing. No "🚀", no
  "unlock", no "supercharge", no exclamation marks.
- Short declarative headlines, often two lines, ending on the teal period:
  "Own your edge." / "Calm. Dense. Built for daily use." / "No cloud. No account. No one watching."
- Card headlines may be evocative ("A quiet place to think"), body text stays concrete and
  factually accurate to the product.
- Numbers and technical terms (MLL/DLL, R:R, SQLite) are features — show them in DM Mono, don't hide them.

## 9. What NOT to do (instant design breakers)

- Purple/blue gradients, glassmorphism cards, emoji icons, stock illustrations.
- White or light section backgrounds; Tailwind `dark:`/`isDark` logic on v3 pages.
- Centered-everything layouts; identical card grids repeated down the page.
- Autoplaying carousels, scroll-jacking on mobile, animations that loop forever in the text column.
- Adding i18n (`useI18n`/`t()`) to v3 components — v3 is English-only by design.
- Touching legacy components, `style.css` globals, or `index.html` to make v3 work — v3 styles stay scoped inside v3 components.

## 10. Verify before finishing

1. Run the dev server, open the page at desktop (~1280px) and mobile (375px).
2. Scroll the full page once at each size: check section rhythm, no layout jumps, pinned
   scenes release cleanly, mobile fallbacks appear below 900px.
3. Check the browser console for errors.
4. `npm run build` must succeed.
5. Three-second test: does a first-time visitor immediately understand this sells a
   local-first trading journal? If not, the hero/headline of the section is wrong.
