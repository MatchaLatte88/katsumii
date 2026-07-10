---
name: v2-design
description: Design language & implementation guide for the Katsumii "V2" experience (the /v2 landing page built with GSAP). Use whenever building or extending V2-style pages/sections — new subpages, new sections, redesigns that should match /v2. Trigger words - "v2", "v2 design", "new landing style", "match the v2 page".
---

# Katsumii V2 Design Language — "quiet & alive"

The reference implementation is `src/components/LandingV2.vue` (route `/v2`).
**Read that file before writing any new V2 code and copy its patterns literally.**
Every rule below exists in that file — when in doubt, imitate it instead of inventing.

## Concept (do not drift from this)

- One idea: **trading progress as cultivated growth** (bonsai metaphor, matches the logo).
- Mood: calm, dark, elegant, zen. NOT "finance-serious", NOT flashy SaaS.
- Signature elements (use these, don't invent new ones):
  1. Self-drawing **branch SVG dividers** between major sections
  2. **Moss-green accent** + rare ember-orange detail
  3. Big Sora display type with line-mask reveals
- English copy only on V2 pages. Short sentences, unhurried tone, no hype words
  ("revolutionary", "supercharge", "unleash" are banned). Honest facts only —
  never invent testimonials, user counts, or metrics.

## Tokens (copy exactly — never introduce new colors)

```css
--ink: #070c0a;        /* page background */
--ink-2: #0b1210;      /* card background */
--ink-3: #101a16;      /* card gradient top */
--paper: #e9f0ea;      /* primary text */
--dim: #90a598;        /* secondary text */
--moss: #6fdc9c;       /* THE accent: CTAs, highlights, kickers */
--ember: #ff9457;      /* rare warm detail: index numbers, single punctuation */
--line: rgba(233, 240, 234, 0.09);  /* all borders */
--font-display: "Sora", "Manrope", sans-serif;   /* headings */
--font-body: "Manrope", "Segoe UI", sans-serif;  /* body */
--font-mono: "DM Mono", ui-monospace, monospace; /* labels, numbers, kickers */
```

Rules:
- Moss is scarce: buttons, kickers, small marks. If everything is green, nothing is.
- Ember is even scarcer: one dot, one index number per screen at most.
- No blue, no violet, no gradients-on-black except the two soft radial washes
  already used in `.lv2` background. Never `#3b82f6`, never glassmorphism cards.
- Fonts are already self-hosted in `public/fonts/` (loaded globally). Available
  weights: Sora 500–700, Manrope 400–800, DM Mono 400/500. Do NOT add new fonts
  or external font/CDN links.

## Layout system

- Section container: `max-width: 1240px` (wide showcases: 1500px), horizontal
  padding `clamp(1.1rem, 4vw, 3rem)`, vertical padding `clamp(6rem, 14vh, 10rem)`.
- Every section starts with the same anatomy:
  ```html
  <p class="lv2-kicker lv2-reveal">Mono uppercase label</p>
  <h2 class="lv2-h2 lv2-reveal">Two short lines,<br />with attitude.</h2>
  <p class="lv2-lead lv2-reveal">One dim paragraph, max ~2 sentences.</p>
  ```
- Type scale (never freestyle font sizes):
  - h1 `clamp(2.9rem, 8.2vw, 6.2rem)`, h2 `clamp(2rem, 4.6vw, 3.4rem)`,
    both letter-spacing negative (-0.035em / -0.025em), line-height ≤ 1.1
  - body 17px / 1.65, leads 1.06rem in `--dim`
  - mono labels 0.72–0.78rem, `letter-spacing: 0.16em+`, uppercase
- Rhythm: alternate section shapes (full-bleed showcase → grid → centered
  manifesto). Never stack two identical "headline + 3 cards" sections.
- Cards: `border: 1px solid var(--line)`, radius 20–24px, background `--ink-2`,
  hover = `translateY(-6px)` + moss border tint. No drop-shadows on hover.
- Buttons: pill (`border-radius: 999px`), moss background, dark text `#06130c`,
  min-height 44px. Secondary action = `.lv2-link-quiet` text link, never a
  second filled button.

## Motion system (GSAP) — follow this or break the page

Setup, always identical:

```js
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
```

**The five hard rules (these caused real bugs — do not skip):**

1. **Everything inside `gsap.context`**, scoped to the component root ref, and
   `ctx.revert()` in `onBeforeUnmount`. Also remove every manual event listener
   you add (keep a `removeListeners` array like the reference file).
2. **Never hide elements in CSS** and reveal them with JS. Always use
   `gsap.from(...)` so the no-JS / reduced-motion state is the final visible
   state. If GSAP never runs, the page must still be fully readable.
3. **Selectors must not leak.** Class selectors in a timeline hit EVERY match in
   the component. If a class appears in two places (e.g. hero + CTA both use
   `.lv2-hero-actions`), scope it: `".lv2-hero .lv2-hero-actions"`. This exact
   collision made the CTA invisible once — two `gsap.from` tweens on one element
   fight each other via `immediateRender`.
4. **Gate all motion behind reduced-motion**:
   ```js
   if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
     /* set final static states (counters to target, words to opacity 1), return */
   }
   ```
   Also disable CSS keyframe loops via `@media (prefers-reduced-motion: reduce)`.
5. **Motion vocabulary is fixed** — reuse, don't invent:
   - Enter reveal: `y: 44, autoAlpha: 0, duration 0.9, ease "power3.out"`,
     `scrollTrigger: { trigger: el, start: "top 86%", once: true }` on class `lv2-reveal`
   - Headline reveal: overflow-hidden line wrapper, inner span `yPercent: 115`
   - Scrub effects (branch draw, image grow, word reveal): `ease: "none"` + `scrub`
   - Micro: `back.out` only for tiny elements (chips, leaf dots)
   - Durations 0.6–1.2s. Nothing loops except marquee + scroll-hint. No parallax
     on text, no rotation gimmicks, no bounce on large surfaces.

Canvas/particles: only the hero has one. Don't add more ambient canvases —
one per page maximum, IntersectionObserver-paused, capped at ~50 particles.

## Vue / project integration

- One self-contained SFC per page in `src/components/`, plain **scoped CSS with
  the `lv2-` class prefix** (V2 pages do NOT use Tailwind classes — that's the
  legacy system). Reuse existing `lv2-` classes before writing new ones.
- No i18n on V2 pages: hardcoded English, do NOT import `useI18n`.
- Do NOT inject `theme` / `isDark` / `bg` — V2 is dark-only by design and
  ignores the site-wide theme system.
- Assets: `const asset = (p) => `${import.meta.env.BASE_URL}${p}``. Use the
  `_dark`/`_Dark` screenshots from `public/`. Every `<img>` gets explicit
  `width`/`height` (prevents layout shift) and `loading="lazy"` (except the
  hero image: `fetchpriority="high"`).
- Routing: register in `src/router.js` next to the existing `/v2` route, as a
  plain non-localized path with `robots: "noindex, follow"` while V2 is an
  alternative. Links between V2 pages use plain paths (`/v2/...`); links into
  the legacy site use `/en/...` paths.
- Never modify the legacy pages, composables, `style.css`, or the i18n files to
  make V2 work. V2 must stay fully parallel and removable.
- New dependency policy: GSAP is already installed; add nothing else (no
  Three.js, no lottie, no animation kits) without the user asking.

## Accessibility & semantics

- Exactly one `<h1>` per page, logical h2/h3 order, `header/main/section/footer`.
- Decorative things (canvas, SVG branches, marquee, orbs) get `aria-hidden="true"`.
- Meaningful screenshots get real descriptive `alt` text.
- Focus states come from the global stylesheet — don't remove outlines.
- Touch targets ≥ 44px; interactive hover effects (tilt, magnetic) must be
  wrapped in `window.matchMedia("(pointer: fine)")` and skipped on touch.

## Definition of done (verify all before claiming finished)

1. `npm run build` passes.
2. In the browser at **375px and 1280px**: scroll the entire page. No horizontal
   overflow (`document.documentElement.scrollWidth === clientWidth`), no
   layout jumps, sticky/scroll effects behave.
3. Console has zero errors/warnings.
4. Every animated element is visible after its animation (nothing stuck at
   opacity 0 — this is the most common GSAP failure; check the page END first).
5. The 3-second test on the hero/section: a stranger understands what is offered.
6. Mobile: mode-card sticky stacking is disabled (`position: static`), marquee
   and hero still look intentional.
