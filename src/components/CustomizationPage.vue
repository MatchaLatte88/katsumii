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
          :src="asset(isDark ? 'Main_dark.png' : 'Main_light.png')"
          alt="Katsumii cockpit with customized layout"
          width="2559" height="1599"
          loading="eager" decoding="async"
        />
        <figcaption>Cockpit — your layout, your palette</figcaption>
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
          <div v-for="r in FOCUS_ROWS" :key="r.name" class="v6cu-row">
            <span class="v6cu-row-toggle" :class="{ off: !r.on }" aria-hidden="true"><i></i></span>
            <div>
              <h3>{{ r.name }}</h3>
              <p>{{ r.copy }}</p>
            </div>
          </div>
        </div>
      </div>
      <figure class="v6cu-shot v6-reveal">
        <img
          :src="asset(isDark ? 'Dashboard_dark.png' : 'Dashboard_light.png')"
          alt="Katsumii dashboard reduced to the essentials"
          width="2559" height="1599"
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
      <figure class="v6cu-shot v6-reveal">
        <img
          :src="asset(isDark ? 'Calendar_dark.png' : 'Calendar_light.png')"
          alt="Katsumii calendar on a customized background"
          width="2532" height="1332"
          loading="lazy" decoding="async"
        />
        <figcaption>Calendar — same data, your atmosphere</figcaption>
      </figure>
    </section>

    <!-- NUMBERS -->
    <section id="numbers" class="v6cu-section flip">
      <div class="v6cu-section-copy">
        <p class="v6-eyebrow v6-reveal"><i></i>Numbers, your way</p>
        <h2 class="v6-h2 v6-reveal">Read P&amp;L in the language you think in.</h2>
        <p class="v6cu-section-sub v6-reveal">
          Some traders think in percent, some in R-multiples, some want both next to every dollar
          figure. Katsumii renders P&amp;L across the entire app the way you actually reason about
          risk — and the quick-stats bar keeps win rate, R and profit factor one glance away, or
          out of sight entirely.
        </p>
        <div class="v6cu-rows v6-reveal">
          <div v-for="r in NUMBER_ROWS" :key="r.name" class="v6cu-row plain">
            <div>
              <h3>{{ r.name }}</h3>
              <p>{{ r.copy }}</p>
            </div>
            <span class="v6cu-row-value">{{ r.value }}</span>
          </div>
        </div>
      </div>
      <figure class="v6cu-shot v6-reveal">
        <img
          :src="asset('Stats_dark.png')"
          alt="Katsumii statistics with percentage and R-multiple display"
          width="1654" height="1599"
          loading="lazy" decoding="async"
        />
        <figcaption>Stats — %, R-multiples, or both</figcaption>
      </figure>
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
import { computed, inject, onBeforeUnmount, onMounted, ref } from "vue"
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

const FOCUS_ROWS = [
  {
    name: "Right sidebar", on: true,
    copy: "Weekly performance, risk monitor and strategy stats — there when you review, gone when you execute.",
  },
  {
    name: "Quick-stats bar", on: true,
    copy: "P&L, win rate, R and profit factor below the filter bar. One toggle shows or hides the whole strip.",
  },
  {
    name: "Copy follower accounts", on: false,
    copy: "Keep follower accounts tucked behind the group leader card until you actually need them.",
  },
  {
    name: "Global mode tabs", on: true,
    copy: "Only trade two of the four modes? Hide the tabs you never use and the top bar stays clean.",
  },
]

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

const NUMBER_ROWS = [
  {
    name: "PnL extra info", value: "% · R · Both",
    copy: "Percentages, R-multiples or both — shown next to every P&L value across the entire app.",
  },
  {
    name: "Quick-stats bar", value: "On / Off",
    copy: "The at-a-glance strip with P&L, WR, R and PF — visible when you want feedback, hidden when you don't.",
  },
]

const rootEl = ref(null)
let cleanups = []

onMounted(() => {
  cleanups.push(initV6Reveals(rootEl.value))
  cleanups.push(initMagnetic(rootEl.value))
})

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
