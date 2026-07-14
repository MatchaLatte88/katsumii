<template>
  <main ref="rootEl" class="v6-features">
    <!-- HERO -->
    <section class="v6ft-hero">
      <div class="v6ft-hero-copy">
        <p class="v6-eyebrow v6-reveal"><i></i>{{ t('featuresPage.hero.label') }}</p>
        <h1 class="v6-h1 v6-reveal">{{ featureHeadline }}<b class="v6-dot">.</b></h1>
        <p class="v6ft-sub v6-reveal">{{ t('featuresPage.hero.description') }}</p>
        <ul class="v6-card-chips v6ft-chips v6-reveal">
          <li v-for="tag in heroTags" :key="tag">{{ tag }}</li>
        </ul>
        <div class="v6ft-actions v6-reveal">
          <RouterLink :to="`/${lang}/pricing`" class="v6-btn v6-magnetic">{{ t('featuresPage.footerCta.primary') }} <span aria-hidden="true">→</span></RouterLink>
          <RouterLink :to="`/${lang}/manual`" class="v6-quiet v6-magnetic">{{ t('featuresPage.footerCta.secondary') }}</RouterLink>
        </div>
      </div>
      <figure class="v6ft-shot v6-reveal">
        <img
          :src="asset(isDark ? 'Dashboard_dark.png' : 'Dashboard_light.png')"
          :alt="t('featuresPage.alts.hero')"
          width="2559" height="1599"
          loading="eager" decoding="async"
        />
        <figcaption>{{ t('featuresPage.hero.windowLabel') }}</figcaption>
      </figure>
    </section>

    <!-- MODULES -->
    <section class="v6ft-modules" :aria-label="t('featuresPage.nav.modules')">
      <article v-for="(m, i) in modules" :key="m.title" class="v6-card v6ft-module v6-reveal">
        <p class="v6ft-module-head">
          <span class="v6ft-idx">{{ pad(i + 1) }}</span>
          <span class="v6ft-kicker" :style="m.accent ? { color: isDark ? m.accent.dark : m.accent.light } : null">{{ m.kicker }}</span>
        </p>
        <h2>{{ m.title }}</h2>
        <p class="v6ft-benefit">{{ m.benefit }}</p>
        <ul>
          <li v-for="point in m.points" :key="point">{{ point }}</li>
        </ul>
        <RouterLink v-if="m.path" :to="`/${lang}/${m.path}`" class="v6ft-module-link">
          {{ t('featuresPage.cardLink') }} <span aria-hidden="true">→</span>
        </RouterLink>
      </article>
    </section>

    <!-- COCKPIT INDEX -->
    <section class="v6ft-cockpit">
      <div class="v6ft-cockpit-head">
        <p class="v6-eyebrow v6-reveal"><i></i>Inside the cockpit</p>
        <h2 class="v6-h2 v6-reveal">One workspace, every screen a trader needs.</h2>
      </div>
      <div class="v6ft-screens v6-reveal">
        <div v-for="s in COCKPIT_SCREENS" :key="s.name">
          <b>{{ s.name }}</b>
          <span>{{ s.desc }}</span>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="v6ft-cta">
      <p class="v6-eyebrow v6-reveal" style="justify-content: center"><i></i>{{ t('featuresPage.footerCta.label') }}</p>
      <h2 class="v6ft-cta-title v6-reveal">{{ t('featuresPage.footerCta.headline') }}</h2>
      <p class="v6ft-cta-sub v6-reveal">{{ t('featuresPage.footerCta.description') }}</p>
      <div class="v6ft-cta-actions v6-reveal">
        <RouterLink :to="`/${lang}/pricing`" class="v6-btn v6-btn-lg v6-magnetic">{{ t('featuresPage.footerCta.primary') }} <span aria-hidden="true">→</span></RouterLink>
        <RouterLink :to="`/${lang}/manual`" class="v6-quiet">{{ t('featuresPage.footerCta.secondary') }} <span aria-hidden="true">→</span></RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
import { initMagnetic, initV6Reveals } from "../v6/motion.js"
import { normalizeLocale } from "../utils/routes.js"

const { t, tm } = useI18n()
const isDark = inject("isDark")

const baseUrl = import.meta.env.BASE_URL
const asset = (path) => `${baseUrl}${path}`
const pad = (n) => String(n).padStart(2, "0")
const stripTerminalDot = (value) => String(value ?? "").replace(/[.。]\s*$/, "")

const route = useRoute()
const lang = computed(() => {
  const raw = Array.isArray(route.params.locale) ? route.params.locale[0] : route.params.locale
  return normalizeLocale(raw)
})

/* deep-dive routes + discipline accents per module position (mirrors V6_ACCENTS) */
const MODULE_META = [
  { path: "prop-firm-challenges", accent: { dark: "#facc15", light: "#ab7503" } },
  { path: "funded-accounts",      accent: { dark: "#22d3ee", light: "#0369a1" } },
  { path: "personal-trading",     accent: { dark: "#4ade80", light: "#047857" } },
  { path: "backtesting",          accent: { dark: "#818cf8", light: "#6d28d9" } },
  { path: "analytics-reviews" },
  {},
  {},
  { path: "local-offline" },
]

/* primary app screens — see Katsumii_overview.md */
const COCKPIT_SCREENS = [
  { name: "Today",     desc: "Daily command center: P&L, streaks, loss-limit status" },
  { name: "Dashboard", desc: "Net P&L hero, execution quality, edge drivers, equity" },
  { name: "Accounts",  desc: "Health board with MLL/DLL distance and payout history" },
  { name: "Trades",    desc: "Full trade log with gallery view and screenshot viewer" },
  { name: "Calendar",  desc: "Monthly P&L rhythm with day modals and journal markers" },
  { name: "Analysis",  desc: "Edge summary, diagnostics lab, deep breakdown tabs" },
  { name: "Journal",   desc: "Daily rich-text reflections with per-day trade stats" },
  { name: "Sessions",  desc: "Backtest sessions with hypotheses and sparklines" },
  { name: "Imports",   desc: "CSV wizard, FXReplay import, broker API sync" },
  { name: "Reports",   desc: "Self-contained HTML performance reports, offline" },
  { name: "Tools",     desc: "Position size, R:R visualizer, equity simulator" },
  { name: "Managers",  desc: "Accounts, strategies, assets, tags, and presets" },
]

const heroTags = computed(() => {
  const raw = tm("featuresPage.hero.tags")
  return Array.isArray(raw) ? raw : []
})

const featureHeadline = computed(() => stripTerminalDot(t("featuresPage.hero.headline")))

const modules = computed(() => {
  const raw = tm("featuresPage.modules")
  if (!Array.isArray(raw)) return []
  return raw.map((m, i) => ({ ...m, ...MODULE_META[i] }))
})

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
/* Feature hub layout — shared tokens/chrome live in src/styles/v6.css */
.v6-features { position: relative; z-index: 1; }

/* ── hero ── */
.v6ft-hero {
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
.v6ft-hero::before {
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
.v6ft-hero .v6-h1 { font-size: clamp(2.5rem, 5.4vw, 4.4rem); }
.v6ft-sub { max-width: 34rem; color: var(--v6-muted); }
.v6ft-chips { margin-top: 1.6rem; }
.v6ft-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-top: 2.2rem;
}
.v6ft-shot {
  margin: 0;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--v6-line-strong);
  background: var(--v6-bg-soft);
  box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.8), 0 0 60px -20px var(--v6-line-strong);
}
.v6.light .v6ft-shot {
  box-shadow: 0 30px 70px -32px rgba(20, 60, 50, 0.45), 0 0 50px -24px var(--v6-line-strong);
}
.v6ft-shot img { display: block; width: 100%; height: auto; }
.v6ft-shot figcaption {
  padding: 0.7rem 1.1rem;
  border-top: 1px solid var(--v6-line);
  font-family: var(--v6-mono);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--v6-faint);
}

/* ── modules ── */
.v6ft-modules {
  max-width: 1240px;
  margin: 0 auto;
  padding: var(--v6-section-block-compact) var(--v6-gutter) var(--v6-page-hero-bottom);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.1rem;
}
.v6ft-module { display: flex; flex-direction: column; }
.v6ft-module-head {
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
  margin: 0;
  font-family: var(--v6-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.v6ft-idx { color: var(--v6-faint); font-variant-numeric: tabular-nums; }
.v6ft-kicker { color: var(--v6-gold); }
.v6ft-module h2 {
  margin: 0.8rem 0 0.5rem;
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: -0.015em;
  color: var(--v6-ink);
}
.v6ft-benefit { color: var(--v6-muted); font-size: 0.92rem; margin: 0 0 1rem; }
.v6ft-module ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  flex: 1;
}
.v6ft-module ul li {
  position: relative;
  padding-left: 1.1rem;
  color: var(--v6-muted);
  font-size: 0.88rem;
  line-height: 1.5;
}
.v6ft-module ul li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.58em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--v6-gold);
  opacity: 0.7;
}
.v6ft-module-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.2rem;
  padding-top: 0.9rem;
  border-top: 1px solid var(--v6-line);
  text-decoration: none;
  font-family: var(--v6-mono);
  font-size: 0.64rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--v6-faint);
  transition: color 0.2s ease;
}
.v6ft-module-link:hover, .v6ft-module-link:focus-visible { color: var(--v6-gold); }

/* ── cockpit index ── */
.v6ft-cockpit {
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(2rem, 6vh, 4rem) var(--v6-gutter) var(--v6-page-hero-bottom);
}
.v6ft-cockpit-head { max-width: 40rem; margin-bottom: 2.2rem; }
.v6ft-screens {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid var(--v6-line);
  border-radius: 18px;
  background: linear-gradient(165deg, var(--v6-panel), rgba(12, 21, 18, 0.22));
  overflow: hidden;
}
.v6.light .v6ft-screens {
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.72), rgba(238, 244, 240, 0.4));
}
.v6ft-screens div {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem clamp(1.2rem, 2.4vw, 1.6rem);
  border-bottom: 1px solid var(--v6-line);
}
.v6ft-screens div:nth-child(odd) { border-right: 1px solid var(--v6-line); }
.v6ft-screens div:nth-last-child(-n + 2) { border-bottom: 0; }
.v6ft-screens b {
  font-family: var(--v6-mono);
  font-weight: 500;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--v6-gold);
}
.v6ft-screens span { color: var(--v6-muted); font-size: 0.86rem; }

/* ── cta ── */
.v6ft-cta {
  text-align: center;
  padding: clamp(3rem, 9vh, 6rem) var(--v6-gutter) var(--v6-page-bottom);
}
.v6ft-cta-title {
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: clamp(2.2rem, 6vw, 4.4rem);
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 1.4rem 0 1rem;
}
.v6ft-cta-sub { color: var(--v6-muted); max-width: 34rem; margin: 0 auto 2.2rem; }
.v6ft-cta-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.6rem;
}

/* ── responsive ── */
@media (max-width: 900px) {
  .v6ft-hero { grid-template-columns: 1fr; padding-top: 7rem; }
  .v6ft-modules { grid-template-columns: 1fr; }
  .v6ft-screens { grid-template-columns: 1fr; }
  .v6ft-screens div:nth-child(odd) { border-right: 0; }
  .v6ft-screens div:nth-last-child(-n + 2) { border-bottom: 1px solid var(--v6-line); }
  .v6ft-screens div:last-child { border-bottom: 0; }
}
@media (max-width: 420px) {
  .v6ft-actions,
  .v6ft-cta-actions { display: grid; grid-template-columns: 1fr; gap: 0.45rem; }
  .v6ft-actions .v6-quiet,
  .v6ft-cta-actions .v6-quiet { justify-content: center; }
}
</style>
