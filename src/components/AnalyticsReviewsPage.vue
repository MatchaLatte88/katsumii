<template>
  <main ref="rootEl" class="v6-analytics">
    <!-- HERO -->
    <section class="v6an-hero">
      <div class="v6an-hero-copy">
        <p class="v6-eyebrow v6-reveal"><i></i>Analytics &amp; Reviews</p>
        <h1 class="v6-h1 v6-reveal">Find your edge. <em>Keep it</em><b class="v6-dot">.</b></h1>
        <p class="v6an-sub v6-reveal">
          Logging trades is the easy part. Katsumii turns that log into answers: which setups pay,
          which sessions bleed, where your sizing breaks down — across every account, mode and
          backtest, without a single spreadsheet.
        </p>
        <ul class="v6-card-chips v6an-chips v6-reveal">
          <li>Execution quality</li>
          <li>Edge drivers</li>
          <li>Diagnostics lab</li>
          <li>Offline reports</li>
        </ul>
        <div class="v6an-actions v6-reveal">
          <RouterLink :to="`/${lang}/pricing`" class="v6-btn v6-magnetic">Get Katsumii <span aria-hidden="true">→</span></RouterLink>
          <RouterLink :to="`/${lang}/features`" class="v6-quiet v6-magnetic">All features</RouterLink>
        </div>
      </div>
      <figure class="v6an-shot v6-reveal">
        <img
          :src="asset(isDark ? 'Dashboard_dark.png' : 'Dashboard_light.png')"
          alt="Katsumii dashboard with net P&L hero, execution quality and equity curve"
          width="2559" height="1599"
          loading="eager" decoding="async"
        />
        <figcaption>Dashboard — your performance, distilled</figcaption>
      </figure>
    </section>

    <!-- DASHBOARD -->
    <section id="dashboard" class="v6an-section">
      <div class="v6an-section-copy">
        <p class="v6-eyebrow v6-reveal"><i></i>Dashboard</p>
        <h2 class="v6-h2 v6-reveal">One calm screen that carries the whole story.</h2>
        <p class="v6an-section-sub v6-reveal">
          Net P&amp;L up front, and everything that explains it right behind: gross versus fees,
          expectancy, effective R:R and a full trade breakdown — scoped to the mode, accounts and
          date range you're actually asking about.
        </p>
        <div class="v6an-rows v6-reveal">
          <div v-for="r in DASHBOARD_ROWS" :key="r.name" class="v6an-row">
            <div>
              <h3>{{ r.name }}</h3>
              <p>{{ r.copy }}</p>
            </div>
            <span class="v6an-row-value">{{ r.value }}</span>
          </div>
        </div>
      </div>
      <figure class="v6an-shot v6-reveal">
        <img
          :src="asset('Stats_dark.png')"
          alt="Katsumii execution quality and edge driver statistics"
          width="1654" height="1599"
          loading="lazy" decoding="async"
        />
        <figcaption>Execution quality — winrate, R:R, profit factor</figcaption>
      </figure>
    </section>

    <!-- ANALYSIS LAB -->
    <section id="analysis" class="v6an-section flip">
      <div class="v6an-section-copy">
        <p class="v6-eyebrow v6-reveal"><i></i>Analysis lab</p>
        <h2 class="v6-h2 v6-reveal">A diagnostics lab for your trading, not just charts.</h2>
        <p class="v6an-section-sub v6-reveal">
          The Analysis screen goes where dashboards stop: key metrics across trade extremes,
          ratios, period extremes and trade mechanics, baseline averages down to median win and
          loss, fee impact against gross — and a diagnostics lab that stress-tests the results.
          Every panel closes with a plain-English verdict, so "Sharpe 11" also tells you what it
          means.
        </p>
        <p class="v6an-note v6-reveal">
          A configurable BE threshold treats near-zero trades as breakeven, so a handful of
          scratches doesn't distort your win rate — include or exclude them with one toggle.
        </p>
      </div>
      <div class="v6an-rows v6-reveal">
        <div v-for="r in ANALYSIS_ROWS" :key="r.name" class="v6an-row">
          <div>
            <h3>{{ r.name }}</h3>
            <p>{{ r.copy }}</p>
          </div>
          <span class="v6an-row-value">{{ r.value }}</span>
        </div>
      </div>
    </section>

    <!-- SLICING / FILTERS -->
    <section id="breakdowns" class="v6an-slice">
      <div class="v6an-slice-head">
        <p class="v6-eyebrow v6-reveal"><i></i>Deep breakdowns</p>
        <h2 class="v6-h2 v6-reveal">Slice performance by anything you tag.</h2>
        <p class="v6an-section-sub v6-reveal">
          Every stat in Katsumii obeys the global filter bar. Combine dimensions freely — "London
          session shorts on NQ, tagged FOMO, last quarter" is one filter away, and every dashboard,
          breakdown and report answers for exactly that slice. The edge profile radar overlays
          average P&amp;L against trade count across weekdays, sessions, strategies, durations and
          lot size, and strategy bubble charts plot winrate against average P&amp;L — bubble size is
          trade count, so thin samples can't fool you.
        </p>
      </div>
      <ul class="v6an-dimensions v6-reveal" aria-label="Breakdown dimensions">
        <li v-for="d in DIMENSIONS" :key="d">{{ d }}</li>
      </ul>
    </section>

    <!-- CALENDAR & REPORTS -->
    <section id="reviews" class="v6an-section">
      <div class="v6an-section-copy">
        <p class="v6-eyebrow v6-reveal"><i></i>Reviews &amp; reports</p>
        <h2 class="v6-h2 v6-reveal">Review in rhythm, report with one click.</h2>
        <p class="v6an-section-sub v6-reveal">
          The calendar grades every day by outcome, with weekly and monthly summaries in the
          margins and journal markers where you wrote. When it's time to share or archive, Katsumii
          generates a self-contained HTML performance report — equity curve, heatmap, breakdowns
          and key metrics in one file that opens anywhere, no server, no upload.
        </p>
        <div class="v6an-rows v6-reveal">
          <div v-for="r in REVIEW_ROWS" :key="r.name" class="v6an-row">
            <div>
              <h3>{{ r.name }}</h3>
              <p>{{ r.copy }}</p>
            </div>
            <span class="v6an-row-value">{{ r.value }}</span>
          </div>
        </div>
      </div>
      <figure class="v6an-shot v6-reveal">
        <img
          :src="asset(isDark ? 'Calendar_dark.png' : 'Calendar_light.png')"
          alt="Katsumii calendar with color-graded trading days and weekly summaries"
          width="2532" height="1332"
          loading="lazy" decoding="async"
        />
        <figcaption>Calendar — time, color-graded</figcaption>
      </figure>
    </section>

    <!-- DISCLAIMER -->
    <section class="v6an-disclaimer">
      <div class="v6an-disclaimer-inner">
        <p class="v6-eyebrow v6-reveal"><i></i>Important context</p>
        <h2 class="v6-h2 v6-reveal">Built to explain your results, not predict them.</h2>
        <div class="v6an-disclaimer-points">
          <p class="v6-reveal">Analytics describe your recorded trading history; they are documentation and review aids, not trading advice or signals.</p>
          <p class="v6-reveal">Metrics depend on the data you enter — fees, corrections and BE settings change how results are displayed.</p>
          <p class="v6-reveal">Past performance patterns do not guarantee future outcomes; no statistic can prevent losses.</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="v6an-cta">
      <h2 class="v6an-cta-title v6-reveal">Know your <em>numbers</em><b class="v6-dot">.</b></h2>
      <p class="v6an-cta-sub v6-reveal">
        The market doesn't remember your trades. Katsumii does — and tells you what they mean.
      </p>
      <div class="v6an-cta-actions v6-reveal">
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

const DASHBOARD_ROWS = [
  {
    name: "Net P&L hero", value: "$ · % · R",
    copy: "The number that matters — with funding size, gross vs. fees, expectancy and effective R:R right behind it.",
  },
  {
    name: "Execution quality", value: "Graded",
    copy: "Winrate donut, effective R:R, profit factor, risk efficiency and average duration — condensed into one quality grade.",
  },
  {
    name: "Edge drivers", value: "Best of",
    copy: "Best day, best session, best strategy plus your win and loss streaks — the patterns behind the P&L.",
  },
  {
    name: "Equity curve monitor", value: "Trade · Day",
    copy: "Per trade or per day, in amount, percent or R — last 10, 30 or 100, with corrections included if you want.",
  },
  {
    name: "Daily rhythm", value: "Heatmap",
    copy: "A mini win/loss calendar and a daily P&L heatmap show your consistency at a glance, month by month.",
  },
]

const ANALYSIS_ROWS = [
  {
    name: "Edge summary", value: "Headline",
    copy: "Best tags, best asset, best timeframe and your most expensive mistake — before any digging.",
  },
  {
    name: "Drawdown risk curve", value: "Max · Current DD",
    copy: "Max and current drawdown, recovery factor, longest streak and time to recover — your pain, quantified.",
  },
  {
    name: "Rolling edge", value: "10 · 20 · 50",
    copy: "Winrate, profit factor and P&L over your last 10, 20 and 50 trades — is the edge growing or fading right now?",
  },
  {
    name: "Outliers & quality ratios", value: "Sharpe · Sortino",
    copy: "Top-trade concentration shows if a few outliers carry you; Sharpe, Sortino and consistency grade the rest.",
  },
  {
    name: "Risk & sizing", value: "Kelly",
    copy: "Declared vs. missing risk, realized R against planned R:R, risk breaks and a Kelly fraction for sane sizing.",
  },
  {
    name: "P&L distribution", value: "Histogram",
    copy: "The shape of your results, bucket by bucket — how much of your edge lives in a handful of trades.",
  },
]

/* Global filter-bar dimensions — see Katsumii_overview.md */
const DIMENSIONS = [
  "Account", "Strategy", "Asset", "Timeframe", "Direction", "Market session",
  "Tag", "Emotion", "Mistake", "Color tag", "Closed by", "Scaled trades",
  "What-if outcome", "Date range",
]

const REVIEW_ROWS = [
  {
    name: "Calendar review", value: "Day · Week · Month",
    copy: "Color-graded days with trade counts, weekly P&L summaries and day modals with full trade context.",
  },
  {
    name: "Journal markers", value: "Linked",
    copy: "Days with journal entries are marked on the calendar — your notes stay attached to the numbers.",
  },
  {
    name: "HTML report", value: "1 file",
    copy: "Self-contained offline performance report with equity curve, heatmap, breakdowns and a dark/light toggle.",
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
/* Analytics page layout — shared tokens/chrome live in src/styles/v6.css */
.v6-analytics { position: relative; z-index: 1; }

/* ── hero ── */
.v6an-hero {
  position: relative;
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(8rem, 18vh, 11rem) clamp(1.1rem, 4vw, 3rem) clamp(3rem, 8vh, 5rem);
  display: grid;
  grid-template-columns: minmax(320px, 5fr) 6fr;
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: center;
}
/* soft scrim in page-bg color so the particle river stays quiet behind the copy
   (same approach as the landing hero) */
.v6an-hero::before {
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
.v6an-hero .v6-h1 { font-size: clamp(2.5rem, 5.4vw, 4.4rem); }
.v6an-sub { max-width: 34rem; color: var(--v6-muted); }
.v6an-chips { margin-top: 1.6rem; }
.v6an-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-top: 2.2rem;
}

/* ── screenshots ── */
.v6an-shot {
  margin: 0;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--v6-line-strong);
  background: var(--v6-bg-soft);
  box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.8), 0 0 60px -20px var(--v6-line-strong);
}
.v6.light .v6an-shot {
  box-shadow: 0 30px 70px -32px rgba(20, 60, 50, 0.45), 0 0 50px -24px var(--v6-line-strong);
}
.v6an-shot img { display: block; width: 100%; height: auto; }
.v6an-shot figcaption {
  padding: 0.7rem 1.1rem;
  border-top: 1px solid var(--v6-line);
  font-family: var(--v6-mono);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--v6-faint);
}

/* ── sections ── */
.v6an-section {
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(2.5rem, 7vh, 4.5rem) clamp(1.1rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: minmax(300px, 5fr) 6fr;
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: center;
}
.v6an-section.flip > :first-child { order: 2; }
.v6an-section.flip > :last-child { order: 1; }
.v6an-section-sub { color: var(--v6-muted); margin: 1.2rem 0 0; max-width: 30rem; }
.v6an-note {
  margin: 1.6rem 0 0;
  padding: 0.9rem 1.1rem;
  border-left: 2px solid var(--v6-ember);
  color: var(--v6-muted);
  font-size: 0.9rem;
  background: linear-gradient(90deg, var(--v6-panel), transparent 80%);
  border-radius: 0 10px 10px 0;
  max-width: 30rem;
}

/* ── metric rows ── */
.v6an-rows {
  margin-top: 1.8rem;
  border: 1px solid var(--v6-line);
  border-radius: 18px;
  background: linear-gradient(165deg, var(--v6-panel), rgba(12, 21, 18, 0.22));
  overflow: hidden;
}
.v6.light .v6an-rows {
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.72), rgba(238, 244, 240, 0.4));
}
.v6an-section.flip .v6an-rows { margin-top: 0; }
.v6an-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem clamp(1.1rem, 2.2vw, 1.5rem);
  border-bottom: 1px solid var(--v6-line);
}
.v6an-row:last-child { border-bottom: 0; }
.v6an-row h3 {
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: -0.01em;
  margin: 0;
}
.v6an-row p { color: var(--v6-muted); font-size: 0.88rem; margin: 0.4rem 0 0; }
.v6an-row-value {
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

/* ── slicing ── */
.v6an-slice {
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(2.5rem, 7vh, 4.5rem) clamp(1.1rem, 4vw, 3rem);
}
.v6an-slice-head { max-width: 40rem; }
.v6an-dimensions {
  list-style: none;
  margin: 2rem 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}
.v6an-dimensions li {
  padding: 0.5rem 0.95rem;
  border: 1px solid var(--v6-line);
  border-radius: 999px;
  font-family: var(--v6-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--v6-muted);
  background: linear-gradient(165deg, var(--v6-panel), transparent);
}

/* ── disclaimer ── */
.v6an-disclaimer { padding: clamp(3rem, 9vh, 6rem) clamp(1.1rem, 4vw, 3rem); }
.v6an-disclaimer-inner { max-width: 1240px; margin: 0 auto; }
.v6an-disclaimer-points {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.1rem;
  margin-top: 2.2rem;
}
.v6an-disclaimer-points p {
  margin: 0;
  padding: 1.2rem 1.3rem;
  border: 1px solid var(--v6-line);
  border-radius: 14px;
  color: var(--v6-muted);
  font-size: 0.92rem;
  background: linear-gradient(165deg, var(--v6-panel), transparent);
}

/* ── cta ── */
.v6an-cta {
  text-align: center;
  padding: clamp(4rem, 12vh, 8rem) clamp(1.1rem, 4vw, 3rem) clamp(6rem, 15vh, 10rem);
}
.v6an-cta-title {
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: clamp(2.2rem, 6vw, 4.4rem);
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 0 0 1rem;
}
.v6an-cta-title em {
  font-style: italic;
  font-weight: 600;
  color: var(--v6-gold-hi);
}
.v6an-cta-sub { color: var(--v6-muted); margin: 0 0 2.2rem; }
.v6an-cta-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.6rem;
}

/* ── responsive ── */
@media (max-width: 900px) {
  .v6an-hero { grid-template-columns: 1fr; padding-top: 7rem; }
  .v6an-section { grid-template-columns: 1fr; gap: 1.6rem; }
  .v6an-section.flip > :first-child { order: 1; }
  .v6an-section.flip > :last-child { order: 2; }
  .v6an-disclaimer-points { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .v6an-row { flex-wrap: wrap; }
}
@media (max-width: 420px) {
  .v6an-actions,
  .v6an-cta-actions { display: grid; grid-template-columns: 1fr; gap: 0.45rem; }
  .v6an-actions .v6-quiet,
  .v6an-cta-actions .v6-quiet { justify-content: center; }
}
</style>
