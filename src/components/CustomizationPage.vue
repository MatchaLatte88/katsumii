<template>
  <main ref="rootEl" class="v6-custom">
    <!-- HERO -->
    <section class="v6cu-hero">
      <div class="v6cu-hero-copy">
        <p class="v6-eyebrow v6-reveal"><i></i>Customization</p>
        <h1 class="v6-h1 v6-reveal">Your journal. <em>Your rules</em><b class="v6-dot">.</b></h1>
        <p class="v6cu-sub v6-reveal">
          No two traders read the market the same way — so no two cockpits should look the same.
          Katsumii lets you hide what distracts, color what matters and tune every surface until
          the app disappears behind your process.
        </p>
        <ul class="v6-card-chips v6cu-chips v6-reveal">
          <li>Focus mode</li>
          <li>Per-mode accent colors</li>
          <li>Light &amp; dark backgrounds</li>
          <li>Three dark base tones</li>
        </ul>
        <div class="v6cu-actions v6-reveal">
          <RouterLink :to="`/${lang}/pricing`" class="v6-btn v6-magnetic">Get Katsumii <span aria-hidden="true">→</span></RouterLink>
          <RouterLink :to="`/${lang}/features`" class="v6-quiet v6-magnetic">All features</RouterLink>
        </div>
      </div>
      <figure class="v6cu-shot v6-reveal">
        <img
          :src="asset(isDark ? 'Screenshots/opt/customize_d.webp' : 'Screenshots/opt/customize_l.webp')"
          alt="Katsumii customization settings with theme, accent and layout options"
          width="1600" height="1000"
          loading="eager" decoding="async"
        />
        <figcaption>Settings — every surface, tunable</figcaption>
      </figure>
    </section>

    <!-- FOCUS / HIDE UI -->
    <section id="focus" class="v6cu-section">
      <div class="v6cu-section-copy">
        <p class="v6-eyebrow v6-reveal"><i></i>Focus mode</p>
        <h2 class="v6-h2 v6-reveal">Show only what earns its place on screen.</h2>
        <p class="v6cu-section-sub v6-reveal">
          Every panel in Katsumii can step aside. Strip the interface down to the essentials on
          execution days, bring the full instrument board back for deep reviews — the app follows
          your attention, not the other way around.
        </p>
        <div class="v6cu-rows v6-reveal">
          <button
            v-for="c in LAYOUT_CONTROLS" :key="c.key"
            type="button" class="v6cu-row v6cu-control"
            role="switch" :aria-checked="c.on.value ? 'true' : 'false'"
            @click="c.on.value = !c.on.value"
          >
            <span class="v6cu-row-toggle" :class="{ off: !c.on.value }" aria-hidden="true"><i></i></span>
            <span class="v6cu-control-copy">
              <span class="v6cu-control-name">{{ c.name }}</span>
              <span class="v6cu-control-note">{{ c.on.value ? c.onCopy : c.offCopy }}</span>
            </span>
          </button>
        </div>
        <p class="v6cu-control-hint v6-reveal">Try it — the screenshot follows your choice.</p>
      </div>
      <figure class="v6cu-shot v6-reveal">
        <img
          :src="asset(layoutShot)"
          :alt="layoutAlt"
          width="1600" height="1000"
          loading="lazy" decoding="async"
        />
        <figcaption>Dashboard — declutter on demand</figcaption>
      </figure>
    </section>

    <!-- MODE COLOR THEMES -->
    <section id="mode-colors" class="v6cu-section flip">
      <div class="v6cu-section-copy">
        <p class="v6-eyebrow v6-reveal"><i></i>Mode color themes</p>
        <h2 class="v6-h2 v6-reveal">Four disciplines, four colors — you pick them.</h2>
        <p class="v6cu-section-sub v6-reveal">
          Funded, Challenge, Personal and Backtest each carry their own accent color, with separate
          shades for light and dark mode. Start from the curated presets or open the color picker
          and dial in any shade exactly to your taste. One glance at the screen and you know which
          capital is on the line — before you read a single number.
        </p>
        <p class="v6cu-note v6-reveal">
          Turn on mode-dependent accents and the ambient background and modal glows follow the
          active trading mode too — the whole room changes with the stakes.
        </p>
      </div>
      <div class="v6cu-swatch-panel v6-reveal">
        <div v-for="m in MODE_SWATCHES" :key="m.name" class="v6cu-swatch-row">
          <span class="v6cu-swatch-name">{{ m.name }}</span>
          <span class="v6cu-swatch-sub">{{ m.sub }}</span>
          <span class="v6cu-swatch-dots" aria-hidden="true">
            <i v-for="c in m.palette" :key="c" :style="{ background: c }" :class="{ active: c === (isDark ? m.dark : m.light) }"></i>
          </span>
          <span class="v6cu-swatch-pair" aria-hidden="true">
            <b :style="{ background: m.light }"></b><small>Light</small>
            <b :style="{ background: m.dark }"></b><small>Dark</small>
          </span>
        </div>
        <p class="v6cu-swatch-foot">Presets or free color picker — every mode, tuned separately for light and dark.</p>
      </div>
    </section>

    <!-- BACKGROUNDS & TONE -->
    <section id="backgrounds" class="v6cu-section">
      <div class="v6cu-section-copy">
        <p class="v6-eyebrow v6-reveal"><i></i>Backgrounds &amp; tone</p>
        <h2 class="v6-h2 v6-reveal">A canvas for day sessions, another for the night.</h2>
        <p class="v6cu-section-sub v6-reveal">
          Choose separate background styles for light and dark mode — flowing lines for one, a calm
          honeycomb for the other. Then set the dark base tone itself: Ink for warm navy, Midnight
          for bluish near-black, or pure Black for OLED silence.
        </p>
        <div class="v6cu-rows v6-reveal">
          <div v-for="r in CANVAS_ROWS" :key="r.name" class="v6cu-row plain">
            <div>
              <h3>{{ r.name }}</h3>
              <p>{{ r.copy }}</p>
            </div>
            <span class="v6cu-row-value">{{ r.value }}</span>
          </div>
        </div>
      </div>
      <div class="v6cu-tone v6-reveal">
        <figure class="v6cu-shot" @mouseleave="hoveredTone = null">
          <div class="v6cu-tone-layers">
            <div
              v-for="(t, i) in toneLayers" :key="t.file"
              class="v6cu-tl" :class="{ lifted: hoveredTone === i }"
              :style="{ zIndex: hoveredTone === i ? toneLayers.length + 1 : i + 1 }"
            >
              <div
                class="v6cu-tl-clip"
                :style="{ clipPath: hoveredTone === i ? FULL_CLIP : bandClip(i, toneLayers.length) }"
                @mouseenter="hoveredTone = i"
              >
                <img
                  :src="asset(`Screenshots/opt/themes/${t.file}.webp`)"
                  :alt="`Katsumii in the ${t.name} theme`"
                  width="1600" height="1000"
                  loading="lazy" decoding="async"
                />
              </div>
            </div>
          </div>
          <figcaption>{{ toneCaption }}</figcaption>
        </figure>
        <div class="v6cu-tone-switch" role="group" aria-label="Preview theme">
          <button
            v-for="o in ['light', 'dark']" :key="o"
            type="button" class="v6cu-tone-btn"
            :class="{ on: toneMode === o }" :aria-pressed="toneMode === o ? 'true' : 'false'"
            @click="toneOverride = o"
          >{{ o === "light" ? "Light" : "Dark" }}</button>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="v6cu-cta">
      <h2 class="v6cu-cta-title v6-reveal">Make it <em>yours</em><b class="v6-dot">.</b></h2>
      <p class="v6cu-cta-sub v6-reveal">
        A journal you shaped yourself is a journal you actually open every day.
      </p>
      <div class="v6cu-cta-actions v6-reveal">
        <RouterLink :to="`/${lang}/pricing`" class="v6-btn v6-btn-lg v6-magnetic">Get Katsumii <span aria-hidden="true">→</span></RouterLink>
        <RouterLink :to="`/${lang}/features`" class="v6-quiet">Explore all features <span aria-hidden="true">→</span></RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { initMagnetic, initV6Reveals } from "../v6/motion.js"
import { normalizeLocale } from "../utils/routes.js"

const isDark = inject("isDark")

const baseUrl = import.meta.env.BASE_URL
const asset = (path) => `${baseUrl}${path}`

const route = useRoute()
const lang = computed(() => {
  const raw = Array.isArray(route.params.locale) ? route.params.locale[0] : route.params.locale
  return normalizeLocale(raw)
})

/* Layout playground — two switches pick one of four screenshots per theme.
   Only the selected one sits in the DOM; the other three are warmed during
   browser idle time so switching never waits on a download. */
const sidebars = ref(true)
const compact = ref(false)

const LAYOUT_CONTROLS = [
  {
    key: "sidebars", name: "Sidebars", on: sidebars,
    onCopy: "Left navigation and the right stats rail are in view.",
    offCopy: "Both rails hidden — only the board you trade on.",
  },
  {
    key: "compact", name: "Compact density", on: compact,
    onCopy: "Tighter spacing — more of the session on one screen.",
    offCopy: "Full spacing, the way the cockpit ships.",
  },
]

const LAYOUT_VARIANTS = ["full_S1", "full_S0", "compact_S1", "compact_S0"]
const layoutShotFor = (variant, dark) =>
  `Screenshots/opt/layout/dash_${variant}_${dark ? "d" : "l"}.webp`

const layoutShot = computed(() =>
  layoutShotFor(`${compact.value ? "compact" : "full"}_${sidebars.value ? "S1" : "S0"}`, isDark.value)
)
const layoutAlt = computed(() =>
  `Katsumii dashboard at ${compact.value ? "compact" : "full"} density, sidebars ${sidebars.value ? "shown" : "hidden"}`
)

const warmed = new Set()
const warmLayoutShots = (dark) => {
  /* metered or slow connections keep on-demand loading instead */
  const conn = navigator.connection
  if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ""))) return
  for (const variant of LAYOUT_VARIANTS) {
    const path = layoutShotFor(variant, dark)
    if (warmed.has(path)) continue
    warmed.add(path)
    const img = new Image()
    img.decoding = "async"
    img.src = asset(path)
  }
}
const whenIdle = (fn) =>
  typeof requestIdleCallback === "function"
    ? requestIdleCallback(fn, { timeout: 3000 })
    : setTimeout(fn, 1200)

/* Dark base tones / light papers, shown side by side in one frame: each variant
   is clipped to its own diagonal band, hovering one expands it to the full shot.
   The preview starts on the site's theme but can be switched independently. */
const TONE_SETS = {
  dark: [
    { name: "Ink", file: "theme_ink_d" },
    { name: "Midnight", file: "theme_midnight_d" },
    { name: "Black", file: "theme_black_d" },
  ],
  light: [
    { name: "Paper", file: "theme_paper_l" },
    { name: "Snow", file: "theme_snow_l" },
  ],
}

const toneOverride = ref(null)
const toneMode = computed(() => toneOverride.value ?? (isDark.value ? "dark" : "light"))
const toneLayers = computed(() => TONE_SETS[toneMode.value])
const hoveredTone = ref(null)
const toneCaption = computed(() => {
  const layers = toneLayers.value
  const hovered = layers[hoveredTone.value]
  return hovered
    ? `${hovered.name} — hover another band to compare`
    : layers.map((t) => t.name).join(" · ")
})
/* switching the set must not leave a stale index hovered */
watch(toneMode, () => { hoveredTone.value = null })

const FULL_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
const TONE_SKEW = 5.5 // how far the separator leans, in % of the frame width
/* band i spans boundary i → i+1; the +1px keeps antialiasing from showing a seam */
const bandClip = (i, count) => {
  const top = (n) => (n === 0 ? "0%" : n === count ? "100%" : `${(n / count) * 100 + TONE_SKEW}%`)
  const bot = (n) => (n === 0 ? "0%" : n === count ? "100%" : `${(n / count) * 100 - TONE_SKEW}%`)
  const pad = i + 1 === count ? "" : " + 1px"
  return `polygon(${top(i)} 0, calc(${top(i + 1)}${pad}) 0, calc(${bot(i + 1)}${pad}) 100%, ${bot(i)} 100%)`
}

/* Mode accents — mirror V6_ACCENTS in router.js / app mode themes */
const MODE_SWATCHES = [
  {
    name: "Funded", sub: "Live prop accounts",
    light: "#0369a1", dark: "#22d3ee",
    palette: ["#22d3ee", "#facc15", "#4ade80", "#818cf8"],
  },
  {
    name: "Challenge", sub: "Prop Evaluations",
    light: "#ab7503", dark: "#facc15",
    palette: ["#22d3ee", "#facc15", "#4ade80", "#818cf8"],
  },
  {
    name: "Personal", sub: "Own capital",
    light: "#047857", dark: "#4ade80",
    palette: ["#22d3ee", "#facc15", "#4ade80", "#818cf8"],
  },
  {
    name: "Backtest", sub: "Sessions & replay",
    light: "#6d28d9", dark: "#818cf8",
    palette: ["#22d3ee", "#facc15", "#4ade80", "#818cf8"],
  },
]

const CANVAS_ROWS = [
  {
    name: "Background per theme", value: "Lines / Honeycomb",
    copy: "Pick a different app background for light and dark mode — each half of your day gets its own texture.",
  },
  {
    name: "Dark base tone", value: "Ink · Midnight · Black",
    copy: "The dark theme itself has three moods: warm navy, bluish near-black, or true black.",
  },
  {
    name: "Theme", value: "Light / Dark / System",
    copy: "Follow the OS, or lock the cockpit to the side of the day you trade in.",
  },
]

const rootEl = ref(null)
let cleanups = []

onMounted(() => {
  cleanups.push(initV6Reveals(rootEl.value))
  cleanups.push(initMagnetic(rootEl.value))
  whenIdle(() => warmLayoutShots(isDark.value))
})

/* the other theme's set is only worth fetching once the user switches */
watch(isDark, (dark) => whenIdle(() => warmLayoutShots(dark)))

onBeforeUnmount(() => {
  cleanups.forEach((off) => off && off())
  cleanups = []
})
</script>

<style scoped>
/* Customization page layout — shared tokens/chrome live in src/styles/v6.css */
.v6-custom { position: relative; z-index: 1; }

/* ── hero ── */
.v6cu-hero {
  position: relative;
  max-width: 1240px;
  margin: 0 auto;
  padding: var(--v6-page-hero-top) var(--v6-gutter) var(--v6-page-hero-bottom);
  display: grid;
  grid-template-columns: minmax(320px, 5fr) 6fr;
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: center;
}
/* soft scrim in page-bg color so the particle river stays quiet behind the copy
   (same approach as the landing hero) */
.v6cu-hero::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 48% 46% at 24% 55%,
    color-mix(in srgb, var(--v6-bg) 80%, transparent) 42%,
    transparent 100%
  );
}
.v6cu-hero .v6-h1 { font-size: clamp(2.5rem, 5.4vw, 4.4rem); }
.v6cu-sub { max-width: 34rem; color: var(--v6-muted); }
.v6cu-chips { margin-top: 1.6rem; }
.v6cu-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-top: 2.2rem;
}

/* ── screenshots ── */
.v6cu-shot {
  margin: 0;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--v6-line-strong);
  background: var(--v6-bg-soft);
  box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.8), 0 0 60px -20px var(--v6-line-strong);
}
.v6.light .v6cu-shot {
  box-shadow: 0 30px 70px -32px rgba(20, 60, 50, 0.45), 0 0 50px -24px var(--v6-line-strong);
}
.v6cu-shot img { display: block; width: 100%; height: auto; }
.v6cu-shot figcaption {
  padding: 0.7rem 1.1rem;
  border-top: 1px solid var(--v6-line);
  font-family: var(--v6-mono);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--v6-faint);
}

/* ── tone comparison stack ── */
.v6cu-tone-layers { position: relative; aspect-ratio: 16 / 10; }
/* the drop-shadow lives on the outer element: on the same element as clip-path
   the clip would cut the shadow away */
.v6cu-tl {
  position: absolute;
  inset: 0;
  pointer-events: none;
  filter: drop-shadow(-4px 0 9px rgba(0, 0, 0, 0.5));
}
.v6.light .v6cu-tl { filter: drop-shadow(-4px 0 9px rgba(20, 60, 50, 0.28)); }
.v6cu-tl-clip {
  position: absolute;
  inset: 0;
  pointer-events: auto;
  cursor: pointer;
  transition: clip-path 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.v6cu-tl img { display: block; width: 100%; height: 100%; object-fit: cover; }

.v6cu-tone-switch {
  display: flex;
  gap: 0.4rem;
  margin-top: 0.9rem;
}
.v6cu-tone-btn {
  border: 1px solid var(--v6-line-strong);
  border-radius: 999px;
  padding: 0.34rem 0.95rem;
  background: none;
  color: var(--v6-muted);
  font-family: var(--v6-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.v6cu-tone-btn:hover { color: var(--v6-ink); }
.v6cu-tone-btn.on {
  color: var(--v6-gold);
  border-color: var(--v6-gold);
  background: color-mix(in srgb, var(--v6-gold) 10%, transparent);
}
.v6cu-tone-btn:focus-visible { outline: 2px solid var(--v6-gold); outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  .v6cu-tl-clip { transition: none; }
}

/* ── sections ── */
.v6cu-section {
  max-width: 1240px;
  margin: 0 auto;
  padding: var(--v6-section-block) var(--v6-gutter);
  display: grid;
  grid-template-columns: minmax(300px, 5fr) 6fr;
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: center;
}
.v6cu-section.flip > :first-child { order: 2; }
.v6cu-section.flip > :last-child { order: 1; }
.v6cu-section-sub { color: var(--v6-muted); margin: 1.2rem 0 0; max-width: 30rem; }
.v6cu-note {
  margin: 1.6rem 0 0;
  padding: 0.9rem 1.1rem;
  border-left: 2px solid var(--v6-ember);
  color: var(--v6-muted);
  font-size: 0.9rem;
  background: linear-gradient(90deg, var(--v6-panel), transparent 80%);
  border-radius: 0 10px 10px 0;
  max-width: 30rem;
}

/* ── setting rows ── */
.v6cu-rows {
  margin-top: 1.8rem;
  border: 1px solid var(--v6-line);
  border-radius: 18px;
  background: linear-gradient(165deg, var(--v6-panel), rgba(12, 21, 18, 0.22));
  overflow: hidden;
}
.v6.light .v6cu-rows {
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.72), rgba(238, 244, 240, 0.4));
}
.v6cu-row {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.1rem clamp(1.1rem, 2.2vw, 1.5rem);
  border-bottom: 1px solid var(--v6-line);
}
.v6cu-row:last-child { border-bottom: 0; }
.v6cu-row h3 {
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: -0.01em;
  margin: 0;
}
.v6cu-row p { color: var(--v6-muted); font-size: 0.88rem; margin: 0.4rem 0 0; }
.v6cu-row.plain { justify-content: space-between; align-items: center; }
.v6cu-row-value {
  flex: none;
  font-family: var(--v6-mono);
  font-size: 0.64rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--v6-gold);
  border: 1px solid var(--v6-line-strong);
  border-radius: 999px;
  padding: 0.28rem 0.7rem;
  white-space: nowrap;
}
/* real switches — same row look, but a button, so keyboard and AT get it too */
.v6cu-control {
  width: 100%;
  border: 0;
  border-bottom: 1px solid var(--v6-line);
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
}
.v6cu-control:last-child { border-bottom: 0; }
.v6cu-control:hover { background: color-mix(in srgb, var(--v6-gold) 7%, transparent); }
.v6cu-control:focus-visible { outline: 2px solid var(--v6-gold); outline-offset: -3px; }
.v6cu-control-copy { display: block; }
.v6cu-control-name {
  display: block;
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: -0.01em;
}
.v6cu-control-note {
  display: block;
  margin-top: 0.4rem;
  color: var(--v6-muted);
  font-size: 0.88rem;
}
.v6cu-control-hint {
  margin: 0.9rem 0 0;
  font-family: var(--v6-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--v6-faint);
}

/* decorative toggle echoing the in-app switches */
.v6cu-row-toggle {
  flex: none;
  margin-top: 0.2rem;
  width: 34px;
  height: 19px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--v6-gold), var(--v6-gold-hi));
  position: relative;
  transition: background 0.2s ease;
}
.v6cu-row-toggle i {
  position: absolute;
  top: 2.5px;
  left: 17.5px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--v6-bg);
  transition: left 0.2s ease;
}
.v6cu-row-toggle.off { background: var(--v6-line); }
.v6cu-row-toggle.off i { left: 2.5px; }

/* ── mode swatch panel ── */
.v6cu-swatch-panel {
  border: 1px solid var(--v6-line);
  border-radius: 18px;
  background: linear-gradient(165deg, var(--v6-panel), rgba(12, 21, 18, 0.22));
  overflow: hidden;
}
.v6.light .v6cu-swatch-panel {
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.72), rgba(238, 244, 240, 0.4));
}
.v6cu-swatch-row {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem clamp(1.1rem, 2.2vw, 1.5rem);
  border-bottom: 1px solid var(--v6-line);
}
.v6cu-swatch-name {
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: -0.01em;
  color: var(--v6-ink);
}
.v6cu-swatch-sub { color: var(--v6-faint); font-size: 0.82rem; }
.v6cu-swatch-dots { display: inline-flex; gap: 0.45rem; }
.v6cu-swatch-dots i {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  opacity: 0.45;
}
.v6cu-swatch-dots i.active {
  opacity: 1;
  box-shadow: 0 0 0 2px var(--v6-bg), 0 0 0 3.5px currentColor;
}
.v6cu-swatch-pair {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--v6-mono);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--v6-faint);
}
.v6cu-swatch-pair b { width: 12px; height: 12px; border-radius: 50%; }
.v6cu-swatch-pair small { font-size: inherit; margin-right: 0.4rem; }
.v6cu-swatch-foot {
  margin: 0;
  padding: 0.8rem clamp(1.1rem, 2.2vw, 1.5rem);
  font-family: var(--v6-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--v6-faint);
}

/* ── cta ── */
.v6cu-cta {
  text-align: center;
  padding: var(--v6-cta-top) var(--v6-gutter) var(--v6-page-bottom);
}
.v6cu-cta-title {
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: clamp(2.2rem, 6vw, 4.4rem);
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 0 0 1rem;
}
.v6cu-cta-title em {
  font-style: italic;
  font-weight: 600;
  color: var(--v6-gold-hi);
}
.v6cu-cta-sub { color: var(--v6-muted); margin: 0 0 2.2rem; }
.v6cu-cta-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.6rem;
}

/* ── responsive ── */
@media (max-width: 900px) {
  .v6cu-hero { grid-template-columns: 1fr; padding-top: 7rem; }
  .v6cu-section { grid-template-columns: 1fr; gap: 1.6rem; }
  .v6cu-section.flip > :first-child { order: 1; }
  .v6cu-section.flip > :last-child { order: 2; }
  .v6cu-swatch-row { grid-template-columns: auto 1fr auto; }
  .v6cu-swatch-dots { display: none; }
}
@media (max-width: 640px) {
  .v6cu-row.plain { flex-wrap: wrap; }
  .v6cu-swatch-row { grid-template-columns: 1fr auto; }
  .v6cu-swatch-sub { display: none; }
}
@media (max-width: 420px) {
  .v6cu-actions,
  .v6cu-cta-actions { display: grid; grid-template-columns: 1fr; gap: 0.45rem; }
  .v6cu-actions .v6-quiet,
  .v6cu-cta-actions .v6-quiet { justify-content: center; }
}
</style>
