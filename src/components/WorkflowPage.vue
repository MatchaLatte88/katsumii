<template>
  <main ref="rootEl" class="v6-workflow">
    <!-- HERO -->
    <section class="v6wf-hero">
      <div class="v6wf-hero-copy">
        <p class="v6-eyebrow v6-reveal"><i></i>Workflow &amp; automation</p>
        <h1 class="v6-h1 v6-reveal">Less <em>bookkeeping</em>, more <em>trading</em><b class="v6-dot">.</b></h1>
        <p class="v6wf-sub v6-reveal">
          Between the first tick and the monthly review sits a lot of quiet work — importing
          fills, writing down what you saw, running the numbers. Katsumii keeps that layer
          fast, local and out of your way, so the journal you meant to keep is the journal
          you actually keep.
        </p>
        <ul class="v6-card-chips v6wf-chips v6-reveal">
          <li>CSV &amp; FXReplay imports</li>
          <li>Broker API sync</li>
          <li>Daily journal &amp; calendar</li>
          <li>Built-in trader tools</li>
          <li>Offline HTML reports</li>
        </ul>
        <div class="v6wf-actions v6-reveal">
          <RouterLink :to="`/${lang}/pricing`" class="v6-btn v6-magnetic">Get Katsumii <span aria-hidden="true">→</span></RouterLink>
          <RouterLink :to="`/${lang}/features`" class="v6-quiet v6-magnetic">All features</RouterLink>
        </div>
      </div>
      <figure class="v6wf-shot v6-reveal">
        <img
          :src="asset(isDark ? 'Dashboard_dark.png' : 'Dashboard_light.png')"
          alt="Katsumii dashboard combining imported trades, journal entries and reports"
          width="2559" height="1599"
          loading="eager" decoding="async"
        />
        <figcaption>Cockpit — everything that follows lands here</figcaption>
      </figure>
    </section>

    <!-- SECTION 1 · IMPORTS & SYNC -->
    <section id="imports" class="v6wf-section">
      <div class="v6wf-section-copy">
        <p class="v6-eyebrow v6-reveal"><i></i>Imports &amp; broker sync</p>
        <h2 class="v6-h2 v6-reveal">Your fills, from anywhere, without retyping.</h2>
        <p class="v6wf-section-sub v6-reveal">
          Every broker exports data a little differently — Katsumii speaks the common
          formats and connects to the platforms most prop-firm traders actually use.
          Import once, map columns once, and future syncs land straight in the right
          mode against the right account.
        </p>
        <div class="v6wf-rows v6-reveal">
          <div v-for="row in IMPORT_ROWS" :key="row.name" class="v6wf-row plain">
            <div>
              <h3>{{ row.name }}</h3>
              <p>{{ row.copy }}</p>
            </div>
            <span class="v6wf-row-value">{{ row.value }}</span>
          </div>
        </div>
      </div>
      <div class="v6wf-panel v6-reveal">
        <p class="v6wf-panel-head">Supported providers</p>
        <ul class="v6wf-provider-list">
          <li v-for="p in PROVIDERS" :key="p.name">
            <span class="v6wf-provider-name">{{ p.name }}</span>
            <span class="v6wf-provider-copy">{{ p.copy }}</span>
            <span class="v6wf-tag" :class="{ soon: p.soon }">{{ p.tag }}</span>
          </li>
        </ul>
        <p class="v6wf-panel-foot">Symbol-to-asset mapping remembers what you told it — repeat imports just work.</p>
      </div>
    </section>

    <!-- SECTION 2 · DAILY WORKFLOW & JOURNAL -->
    <section id="journal" class="v6wf-section flip">
      <div class="v6wf-section-copy">
        <p class="v6-eyebrow v6-reveal"><i></i>Daily workflow &amp; journal</p>
        <h2 class="v6-h2 v6-reveal">The day, the trade and the reason — in one place.</h2>
        <p class="v6wf-section-sub v6-reveal">
          The Today screen keeps the current session's P&amp;L, streaks and account
          status in view while you trade. Quick Entry captures a fill in seconds; the
          journal captures the story behind it. When you review, the calendar shows
          both — the numbers and the notes — day by day.
        </p>
        <div class="v6wf-rows v6-reveal">
          <div v-for="r in JOURNAL_ROWS" :key="r.name" class="v6wf-row">
            <span class="v6wf-row-dot" aria-hidden="true"></span>
            <div>
              <h3>{{ r.name }}</h3>
              <p>{{ r.copy }}</p>
            </div>
          </div>
        </div>
      </div>
      <figure class="v6wf-shot v6-reveal">
        <img
          :src="asset(isDark ? 'Calendar_dark.png' : 'Calendar_light.png')"
          alt="Katsumii calendar with per-day P&L, trade counts and journal markers"
          width="2532" height="1332"
          loading="lazy" decoding="async"
        />
        <figcaption>Calendar — numbers and notes, one grid</figcaption>
      </figure>
    </section>

    <!-- SECTION 3 · TOOLS & REPORTS -->
    <section id="tools" class="v6wf-section">
      <div class="v6wf-section-copy">
        <p class="v6-eyebrow v6-reveal"><i></i>Tools &amp; reports</p>
        <h2 class="v6-h2 v6-reveal">The utilities you were already keeping in tabs.</h2>
        <p class="v6wf-section-sub v6-reveal">
          Every desk gets cluttered with the same six utilities — a position size
          calculator, an R:R visualizer, a timezone helper. Katsumii ships them inside
          the app, next to the data they act on, and turns any filter into a shareable
          offline report.
        </p>
        <p class="v6wf-note v6-reveal">
          Automated local backups run in the background on a schedule you set — restore
          your last known-good state with one click.
        </p>
      </div>
      <div class="v6wf-tools v6-reveal">
        <div v-for="tool in TOOLS" :key="tool.name" class="v6wf-tool">
          <span class="v6wf-tool-kicker">{{ tool.kicker }}</span>
          <h3>{{ tool.name }}</h3>
          <p>{{ tool.copy }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="v6wf-cta">
      <h2 class="v6wf-cta-title v6-reveal">The tools, out of the way<b class="v6-dot">.</b></h2>
      <p class="v6wf-cta-sub v6-reveal">
        Every part of the loop — capture, import, reflect, review — inside one local app.
      </p>
      <div class="v6wf-cta-actions v6-reveal">
        <RouterLink :to="`/${lang}/pricing`" class="v6-btn v6-btn-lg v6-magnetic">See pricing <span aria-hidden="true">→</span></RouterLink>
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

const IMPORT_ROWS = [
  {
    name: "CSV import wizard", value: "4 steps",
    copy: "Upload, resolve mapping issues, review, done. Broker presets auto-detect the common formats — or map columns yourself and save it as a custom preset.",
  },
  {
    name: "Execution modes", value: "3 modes",
    copy: "Import completed trades, raw executions, or executions paired by ID — Katsumii pairs the fills into round-turn trades on the way in.",
  },
  {
    name: "FXReplay imports", value: "Backtest",
    copy: "Send FXReplay exports straight into a new or existing backtest session with strategy, hypothesis and starting balance attached.",
  },
  {
    name: "Symbol mapping", value: "Persistent",
    copy: "Map broker symbols to Katsumii assets once. Unknown symbols surface in the mapping modal and can spawn new assets in place.",
  },
]

const PROVIDERS = [
  { name: "MetaTrader 5",     copy: "Reads closed trades from a running local MT5 terminal (Windows).", tag: "Windows" },
  { name: "ProjectX / TopstepX", copy: "ProjectX Gateway API — sync futures fills across mapped accounts.", tag: "API" },
  { name: "Capital.com",      copy: "REST API for demo and live accounts — closed trades on demand.",     tag: "API" },
  { name: "OANDA",            copy: "v20 REST API for practice and live accounts — FX fills, mapped in.", tag: "API" },
  { name: "Generic CSV",      copy: "Any broker that can export a CSV — map columns, save a preset, reuse.", tag: "Universal" },
  { name: "FXReplay",         copy: "Backtest exports into dedicated backtest sessions.",                 tag: "Backtest" },
]

const JOURNAL_ROWS = [
  {
    name: "Today screen",
    copy: "Session P&L, trade count, W/L, streaks, account health and personal goals — the state of the day, at a glance.",
  },
  {
    name: "Quick Entry & Trade Presets",
    copy: "Log a fill in seconds. Presets pre-fill strategy, risk, session and fees so recurring setups stop costing you clicks.",
  },
  {
    name: "Tiptap journal",
    copy: "Rich-text entries with autosave, bullet lists, blockquotes and screenshots. Per-day stats stay pinned to the top of the page you're writing on.",
  },
  {
    name: "Emotions, mistakes, tags",
    copy: "Attach the human context to every trade — moods, execution mistakes, color tags — so the analytics side has something to break down.",
  },
  {
    name: "Calendar with journal markers",
    copy: "Monthly and yearly heatmaps of P&L, trade count and (crucially) which days you actually wrote something down.",
  },
]

const TOOLS = [
  { kicker: "T1", name: "R:R visualizer",         copy: "Model a trade before you take it — entry, stop, target, risk multiple, planned outcome." },
  { kicker: "T2", name: "Position size calculator", copy: "From account risk to contract size across futures, FX, CFDs — tick size and value baked in." },
  { kicker: "T3", name: "Equity simulator",       copy: "Project account growth from win rate, RRR and risk per trade. See variance, not just the average." },
  { kicker: "T4", name: "Timezone converter",     copy: "Line up session opens, prop-firm cutoffs and your local clock without a browser tab." },
  { kicker: "T5", name: "Currency converter",     copy: "Cross-currency P&L in one place — useful when the firm settles in a currency you don't quote in." },
  { kicker: "T6", name: "Futures contract specs", copy: "Tick size, tick value, expiry, session — for every contract you actually trade." },
  { kicker: "R1", name: "HTML performance report", copy: "Self-contained offline report from the current filters — equity curve, calendar heatmap, breakdowns, key metrics. Dark and light modes ship inside the file." },
  { kicker: "R2", name: "CSV export",             copy: "Export the filtered trade log for spreadsheets, tax software or your own analysis pipeline." },
  { kicker: "R3", name: "Automated backups",      copy: "Weekly and monthly backups run in the background. Keep the last N, restore the latest with one click." },
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
/* Workflow page layout — shared tokens/chrome live in src/styles/v6.css */
.v6-workflow { position: relative; z-index: 1; }

/* ── hero ── */
.v6wf-hero {
  position: relative;
  max-width: 1240px;
  margin: 0 auto;
  padding: var(--v6-page-hero-top) var(--v6-gutter) var(--v6-page-hero-bottom);
  display: grid;
  grid-template-columns: minmax(320px, 5fr) 6fr;
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: center;
}
.v6wf-hero::before {
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
.v6wf-hero .v6-h1 { font-size: clamp(2.5rem, 5.4vw, 4.4rem); }
.v6wf-sub { max-width: 34rem; color: var(--v6-muted); }
.v6wf-chips { margin-top: 1.6rem; }
.v6wf-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-top: 2.2rem;
}

/* ── shared screenshot frame ── */
.v6wf-shot {
  margin: 0;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--v6-line-strong);
  background: var(--v6-bg-soft);
  box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.8), 0 0 60px -20px var(--v6-line-strong);
}
.v6.light .v6wf-shot {
  box-shadow: 0 30px 70px -32px rgba(20, 60, 50, 0.45), 0 0 50px -24px var(--v6-line-strong);
}
.v6wf-shot img { display: block; width: 100%; height: auto; }
.v6wf-shot figcaption {
  padding: 0.7rem 1.1rem;
  border-top: 1px solid var(--v6-line);
  font-family: var(--v6-mono);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--v6-faint);
}

/* ── sections ── */
.v6wf-section {
  max-width: 1240px;
  margin: 0 auto;
  padding: var(--v6-section-block) var(--v6-gutter);
  display: grid;
  grid-template-columns: minmax(300px, 5fr) 6fr;
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: center;
}
.v6wf-section.flip > :first-child { order: 2; }
.v6wf-section.flip > :last-child { order: 1; }
.v6wf-section-sub { color: var(--v6-muted); margin: 1.2rem 0 0; max-width: 30rem; }
.v6wf-note {
  margin: 1.6rem 0 0;
  padding: 0.9rem 1.1rem;
  border-left: 2px solid var(--v6-ember);
  color: var(--v6-muted);
  font-size: 0.9rem;
  background: linear-gradient(90deg, var(--v6-panel), transparent 80%);
  border-radius: 0 10px 10px 0;
  max-width: 30rem;
}

/* ── setting rows (shared shape with Customization) ── */
.v6wf-rows {
  margin-top: 1.8rem;
  border: 1px solid var(--v6-line);
  border-radius: 18px;
  background: linear-gradient(165deg, var(--v6-panel), rgba(12, 21, 18, 0.22));
  overflow: hidden;
}
.v6.light .v6wf-rows {
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.72), rgba(238, 244, 240, 0.4));
}
.v6wf-row {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.1rem clamp(1.1rem, 2.2vw, 1.5rem);
  border-bottom: 1px solid var(--v6-line);
}
.v6wf-row:last-child { border-bottom: 0; }
.v6wf-row h3 {
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: -0.01em;
  margin: 0;
}
.v6wf-row p { color: var(--v6-muted); font-size: 0.88rem; margin: 0.4rem 0 0; }
.v6wf-row.plain { justify-content: space-between; align-items: center; }
.v6wf-row-value {
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
.v6wf-row-dot {
  flex: none;
  margin-top: 0.55em;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--v6-gold);
  opacity: 0.85;
}

/* ── providers panel (imports) ── */
.v6wf-panel {
  border: 1px solid var(--v6-line);
  border-radius: 18px;
  background: linear-gradient(165deg, var(--v6-panel), rgba(12, 21, 18, 0.22));
  overflow: hidden;
}
.v6.light .v6wf-panel {
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.72), rgba(238, 244, 240, 0.4));
}
.v6wf-panel-head,
.v6wf-panel-foot {
  margin: 0;
  padding: 0.85rem clamp(1.1rem, 2.2vw, 1.5rem);
  font-family: var(--v6-mono);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--v6-faint);
}
.v6wf-panel-head {
  border-bottom: 1px solid var(--v6-line);
  color: var(--v6-gold);
}
.v6wf-panel-foot {
  border-top: 1px solid var(--v6-line);
  text-transform: none;
  letter-spacing: 0;
  font-family: inherit;
  font-size: 0.82rem;
  color: var(--v6-muted);
}
.v6wf-provider-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.v6wf-provider-list li {
  display: grid;
  grid-template-columns: minmax(140px, 1fr) 2fr auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem clamp(1.1rem, 2.2vw, 1.5rem);
  border-bottom: 1px solid var(--v6-line);
}
.v6wf-provider-list li:last-child { border-bottom: 0; }
.v6wf-provider-name {
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: 0.98rem;
  letter-spacing: -0.01em;
  color: var(--v6-ink);
}
.v6wf-provider-copy { color: var(--v6-muted); font-size: 0.86rem; line-height: 1.5; }
.v6wf-tag {
  flex: none;
  font-family: var(--v6-mono);
  font-size: 0.58rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--v6-gold);
  border: 1px solid var(--v6-line-strong);
  border-radius: 999px;
  padding: 0.26rem 0.65rem;
  white-space: nowrap;
}
.v6wf-tag.soon { color: var(--v6-faint); }

/* ── tools grid ── */
.v6wf-tools {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.9rem;
}
.v6wf-tool {
  border: 1px solid var(--v6-line);
  border-radius: 14px;
  padding: 1.1rem 1.15rem;
  background: linear-gradient(165deg, var(--v6-panel), rgba(12, 21, 18, 0.22));
  transition: border-color 0.25s ease, transform 0.25s ease;
}
.v6.light .v6wf-tool {
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.72), rgba(238, 244, 240, 0.4));
}
.v6wf-tool:hover { border-color: var(--v6-line-strong); transform: translateY(-2px); }
.v6wf-tool-kicker {
  font-family: var(--v6-mono);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--v6-gold);
}
.v6wf-tool h3 {
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: -0.01em;
  margin: 0.4rem 0 0.35rem;
}
.v6wf-tool p { margin: 0; color: var(--v6-muted); font-size: 0.86rem; line-height: 1.55; }

/* ── cta ── */
.v6wf-cta {
  text-align: center;
  padding: var(--v6-cta-top) var(--v6-gutter) var(--v6-page-bottom);
}
.v6wf-cta-title {
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: clamp(2.2rem, 6vw, 4.4rem);
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 0 0 1rem;
}
.v6wf-cta-sub { color: var(--v6-muted); margin: 0 0 2.2rem; }
.v6wf-cta-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.6rem;
}

/* ── responsive ── */
@media (max-width: 900px) {
  .v6wf-hero { grid-template-columns: 1fr; padding-top: 7rem; }
  .v6wf-section { grid-template-columns: 1fr; gap: 1.6rem; }
  .v6wf-section.flip > :first-child { order: 1; }
  .v6wf-section.flip > :last-child { order: 2; }
  .v6wf-tools { grid-template-columns: 1fr; }
  .v6wf-provider-list li { grid-template-columns: 1fr auto; }
  .v6wf-provider-copy { grid-column: 1 / -1; }
}
@media (max-width: 640px) {
  .v6wf-row.plain { flex-wrap: wrap; }
}
@media (max-width: 420px) {
  .v6wf-actions,
  .v6wf-cta-actions { display: grid; grid-template-columns: 1fr; gap: 0.45rem; }
  .v6wf-actions .v6-quiet,
  .v6wf-cta-actions .v6-quiet { justify-content: center; }
}
</style>
