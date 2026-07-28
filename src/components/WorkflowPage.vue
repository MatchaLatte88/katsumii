<template>
  <main ref="rootEl" class="v6-workflow">
    <!-- HERO -->
    <section class="v6wf-hero v6-band v6-band-snap">
      <div ref="heroCopyEl" class="v6wf-hero-copy v6-copy-glow">
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
          v-zoom
          :src="asset(isDark ? 'Screenshots/opt/hero_d.webp' : 'Screenshots/opt/hero_l.webp')"
          alt="Katsumii dashboard combining imported trades, journal entries and reports"
          width="1600" height="1000"
          loading="eager" decoding="async"
        />
        <figcaption>Cockpit — everything that follows lands here</figcaption>
      </figure>
    </section>

    <!-- SECTION 1 · IMPORTS & SYNC -->
    <section id="imports" class="v6wf-section v6-band v6-band-snap">
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
    <section id="journal" class="v6wf-section flip v6-band v6-band-snap">
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
          v-zoom
          :src="asset(isDark ? 'Screenshots/opt/calendar_f_d.webp' : 'Screenshots/opt/calendar_f_l.webp')"
          alt="Katsumii calendar with per-day P&L, trade counts and journal markers"
          width="1600" height="1000"
          loading="lazy" decoding="async"
        />
        <figcaption>Calendar — numbers and notes, one grid</figcaption>
      </figure>
    </section>

    <!-- SECTION 3 · TOOLS & REPORTS -->
    <section id="tools" class="v6wf-toolbox v6-band v6-band-snap">
      <div class="v6wf-toolbox-head">
        <div>
          <p class="v6-eyebrow v6-reveal"><i></i>Tools &amp; reports</p>
          <h2 class="v6-h2 v6-reveal">The utilities you were already keeping in tabs.</h2>
        </div>
        <div class="v6wf-toolbox-aside">
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
      </div>
      <div class="v6wf-tools v6-reveal">
        <div v-for="tool in TOOLS" :key="tool.name" class="v6wf-tool">
          <span class="v6wf-tool-kicker">{{ tool.kicker }}</span>
          <h3>{{ tool.name }}</h3>
          <p>{{ tool.copy }}</p>
        </div>
      </div>
    </section>

    <!-- SECTION 3b · TOOL SHOWCASE (tabbed) -->
    <section
      ref="showcaseEl" class="v6wf-showcase v6-band"
      aria-label="Trader tools in Katsumii"
    >
      <div id="v6wf-frames" class="v6wf-frames v6-reveal" role="tabpanel" :aria-labelledby="`v6wf-tab-${TOOL_SHOTS[activeShot].key}`">
        <figure
          v-for="(s, i) in TOOL_SHOTS" :key="s.key"
          class="v6wf-shot v6wf-frame" :class="{ on: i === activeShot }"
          :inert="i !== activeShot"
        >
          <img
            v-zoom
            :src="shotSrc(s)"
            :alt="s.alt"
            width="1600" height="1000"
            loading="lazy" decoding="async"
          />
          <figcaption>{{ s.caption }}</figcaption>
        </figure>
      </div>
      <ol
        ref="tablistEl" class="v6wf-steps v6-reveal"
        role="tablist" aria-label="Trader tools" aria-orientation="vertical"
        @keydown="onTabKey"
      >
        <li v-for="(s, i) in TOOL_SHOTS" :key="s.key">
          <button
            type="button" role="tab"
            :id="`v6wf-tab-${s.key}`"
            :class="{ on: i === activeShot }"
            :aria-selected="i === activeShot"
            :tabindex="i === activeShot ? 0 : -1"
            aria-controls="v6wf-frames"
            @click="selectShot(i)"
          >
            <span class="v6wf-step-n">{{ String(i + 1).padStart(2, "0") }}</span>
            <span class="v6wf-step-body">
              <span class="v6wf-step-name">{{ s.name }}</span>
              <span class="v6wf-step-copy">{{ s.copy }}</span>
            </span>
          </button>
        </li>
      </ol>
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
import { computed, inject, nextTick, onBeforeUnmount, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
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

/* Tabbed showcase: the four shots swap in place, driven by the step list.
   File names differ in shape (tools_l_1 vs. report_l), so each carries its own
   prefix/suffix around the theme letter. */
const TOOL_SHOTS = [
  {
    key: "tools1", pre: "tools", suf: "_1",
    name: "Plan & sizing",
    copy: "R:R visualizer and position size calculator, side by side with the timezone and currency helpers.",
    alt: "Katsumii R:R visualizer, position size calculator and timezone converter",
    caption: "Tools — R:R, contracts, sessions",
  },
  {
    key: "tools2", pre: "tools", suf: "_2",
    name: "Equity simulator",
    copy: "Project account growth from win rate, RRR and risk per trade — ten possible paths, not one flattering average.",
    alt: "Katsumii equity simulator projecting possible account paths",
    caption: "Equity simulator — variance made visible",
  },
  {
    key: "report", pre: "report", suf: "",
    name: "HTML report",
    copy: "The current filter, exported as one self-contained file — equity curve, heatmap, breakdowns, dark and light inside.",
    alt: "Katsumii self-contained HTML performance report",
    caption: "Report — one file, opens anywhere",
  },
  {
    key: "backup", pre: "backup", suf: "",
    name: "Automated backups",
    copy: "Weekly and monthly snapshots run in the background. Keep the last N, restore the latest with one click.",
    alt: "Katsumii backup settings with scheduled local snapshots",
    caption: "Backups — scheduled, local, one-click restore",
  },
]
const shotSrc = (s) => asset(`Screenshots/opt/${s.pre}_${isDark.value ? "d" : "l"}${s.suf}.webp`)

const activeShot = ref(0)
const showcaseEl = ref(null)
const tablistEl = ref(null)

/* The section holds still while the scroll steps through the four shots, so the
   whole set is seen before the page moves on. Null on small screens and with
   reduced motion — there the steps are plain buttons. */
let showcasePin = null

/* Clicking a step means "take me to that shot": inside the pin that is a scroll
   position, outside it a plain state change. */
const selectShot = (i) => {
  if (!showcasePin) {
    activeShot.value = i
    return
  }
  const { start, end } = showcasePin
  const top = start + ((end - start) * i) / (TOOL_SHOTS.length - 1)
  window.scrollTo({ top, behavior: "smooth" })
}

const onTabKey = (event) => {
  const last = TOOL_SHOTS.length - 1
  let next = activeShot.value
  if (event.key === "ArrowDown" || event.key === "ArrowRight") next = next === last ? 0 : next + 1
  else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = next === 0 ? last : next - 1
  else if (event.key === "Home") next = 0
  else if (event.key === "End") next = last
  else return

  event.preventDefault()
  selectShot(next)
  nextTick(() => tablistEl.value?.querySelectorAll("button")[next]?.focus())
}

const v6Quiet = inject("v6Quiet")
const rootEl = ref(null)
const heroCopyEl = ref(null)
let cleanups = []

onMounted(() => {
  cleanups.push(initV6Reveals(rootEl.value))
  cleanups.push(initMagnetic(rootEl.value))

  /* the particle river thins out behind the hero copy — see v6Quiet in V6Shell */
  v6Quiet?.set(heroCopyEl.value)
  cleanups.push(() => v6Quiet?.clear())

  /* Full-viewport sections snap while this page is mounted — see v6.css.
     The showcase deliberately carries no snap point of its own; the pin below
     owns the scroll there and the two would fight over it. */
  document.documentElement.classList.add("v6-snap")

  gsap.registerPlugin(ScrollTrigger)
  const mm = gsap.matchMedia()
  mm.add("(min-width: 901px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)", () => {
    const steps = TOOL_SHOTS.length
    const st = ScrollTrigger.create({
      trigger: showcaseEl.value,
      start: "top top",
      /* one viewport of scroll per step after the first */
      end: () => `+=${window.innerHeight * (steps - 1)}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      /* rest on a shot instead of between two */
      snap: { snapTo: 1 / (steps - 1), duration: 0.25, delay: 0.04, ease: "power2.inOut" },
      onUpdate: (self) => {
        activeShot.value = Math.round(self.progress * (steps - 1))
      },
      onRefresh: (self) => {
        showcasePin = { start: self.start, end: self.end }
      },
    })
    showcasePin = { start: st.start, end: st.end }

    return () => {
      st.kill()
      showcasePin = null
      activeShot.value = 0
    }
  })
  cleanups.push(() => mm.revert())
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove("v6-snap")
  cleanups.forEach((off) => off && off())
  cleanups = []
})
</script>

<style scoped>
/* Workflow page layout — shared tokens/chrome live in src/styles/v6.css */
.v6-workflow { position: relative; z-index: 1; }

/* Bands (.v6-band / .v6-band-snap) live in src/styles/v6.css. The showcase is a
   band without a snap point: it is pinned and steps through its shots on
   scroll, so it owns that stretch outright and a snap point would fight it. */

/* ── hero ── */
.v6wf-hero {
  position: relative;
  /* text column deliberately narrow — the screenshot carries the section */
  grid-template-columns: minmax(300px, 4fr) 8fr;
  gap: clamp(2rem, 4vw, 3.5rem);
  align-items: center;
}
.v6wf-hero .v6-h1 {
  font-size: clamp(2.1rem, 3.5vw, 3.3rem);
  margin: 1rem 0 1rem;
}
.v6wf-sub {
  max-width: 32rem;
  color: var(--v6-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}
.v6wf-chips { margin-top: 1.2rem; }
.v6wf-chips li { font-size: 0.62rem; padding: 0.24rem 0.6rem; }
.v6wf-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-top: 1.7rem;
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
  grid-template-columns: minmax(300px, 5.2fr) 6.8fr;
  gap: clamp(2rem, 4vw, 3.5rem);
  align-items: center;
}
.v6wf-section.flip > :first-child { order: 2; }
.v6wf-section.flip > :last-child { order: 1; }
.v6wf-section .v6-h2 { font-size: clamp(1.6rem, 2.8vw, 2.4rem); }
.v6wf-section-sub {
  color: var(--v6-muted);
  margin: 0.9rem 0 0;
  max-width: 33rem;
  font-size: 0.92rem;
  line-height: 1.6;
}
.v6wf-note {
  margin: 1.2rem 0 0;
  padding: 0.8rem 1rem;
  border-left: 2px solid var(--v6-ember);
  color: var(--v6-muted);
  font-size: 0.86rem;
  line-height: 1.55;
  background: linear-gradient(90deg, var(--v6-panel), transparent 80%);
  border-radius: 0 10px 10px 0;
  max-width: 33rem;
}

/* ── setting rows (shared shape with Customization) ── */
.v6wf-rows {
  margin-top: 1.4rem;
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
  gap: 0.9rem;
  padding: 0.85rem clamp(1rem, 2vw, 1.4rem);
  border-bottom: 1px solid var(--v6-line);
}
.v6wf-row:last-child { border-bottom: 0; }
.v6wf-row h3 {
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: 0.94rem;
  letter-spacing: -0.01em;
  margin: 0;
}
.v6wf-row p { color: var(--v6-muted); font-size: 0.83rem; line-height: 1.5; margin: 0.3rem 0 0; }
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
  padding: 0.8rem clamp(1rem, 2vw, 1.4rem);
  border-bottom: 1px solid var(--v6-line);
}
.v6wf-provider-list li:last-child { border-bottom: 0; }
.v6wf-provider-name {
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: 0.92rem;
  letter-spacing: -0.01em;
  color: var(--v6-ink);
}
.v6wf-provider-copy { color: var(--v6-muted); font-size: 0.82rem; line-height: 1.45; }
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

/* ── tools ──
   Nine utilities read better as a full-width 3×3 index than as a tall column
   beside the copy, and it keeps the whole set inside one screen. */
.v6wf-toolbox { grid-template-rows: auto auto; }
.v6wf-toolbox-head {
  display: grid;
  grid-template-columns: minmax(300px, 5.2fr) 6.8fr;
  gap: clamp(2rem, 4vw, 3.5rem);
  align-items: start;
  margin-bottom: clamp(1.6rem, 3.5vh, 2.4rem);
}
.v6wf-toolbox-head .v6-h2 { font-size: clamp(1.6rem, 2.8vw, 2.4rem); }
.v6wf-toolbox-aside .v6wf-section-sub { margin-top: 0; }
.v6wf-tools {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.9rem;
}
.v6wf-tool {
  border: 1px solid var(--v6-line);
  border-radius: 14px;
  padding: 1rem 1.1rem;
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
  font-size: 0.96rem;
  letter-spacing: -0.01em;
  margin: 0.35rem 0 0.3rem;
}
.v6wf-tool p { margin: 0; color: var(--v6-muted); font-size: 0.82rem; line-height: 1.5; }

/* ── tool showcase ──
   The step list drives the shots directly, so the whole set is reachable
   without spending scroll distance on it. */
.v6wf-showcase {
  /* screenshot column deliberately dominant */
  grid-template-columns: 7fr minmax(280px, 4.4fr);
  gap: clamp(2rem, 4vw, 3.5rem);
  align-items: center;
}
/* frames are stacked; the first one in flow sets the height, the rest overlay it */
.v6wf-frames { position: relative; }
.v6wf-frame {
  transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: scale(1.015);
  pointer-events: none;
}
.v6wf-frame:first-child { position: relative; }
.v6wf-frame.on {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}

.v6wf-steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.2rem;
}
.v6wf-steps button {
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.9rem;
  padding: 0.8rem 1rem;
  border: 0;
  border-left: 2px solid var(--v6-line);
  border-radius: 0 10px 10px 0;
  background: none;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
  opacity: 0.42;
  transition: opacity 0.4s ease, border-color 0.4s ease, background 0.4s ease;
}
.v6wf-steps button:hover { opacity: 0.75; }
.v6wf-steps button.on {
  opacity: 1;
  border-left-color: var(--v6-gold);
  background: linear-gradient(90deg, var(--v6-panel), transparent 85%);
}
.v6wf-step-n {
  font-family: var(--v6-mono);
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  color: var(--v6-gold);
  padding-top: 0.3rem;
}
.v6wf-step-name {
  display: block;
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: -0.01em;
}
.v6wf-step-copy {
  display: block;
  margin-top: 0.25rem;
  color: var(--v6-muted);
  font-size: 0.84rem;
  line-height: 1.5;
}

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
@media (max-width: 1200px) {
  .v6wf-tools { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 900px) {
  .v6wf-hero { grid-template-columns: 1fr; }
  .v6wf-section { grid-template-columns: 1fr; gap: 1.6rem; }
  .v6wf-section.flip > :first-child { order: 1; }
  .v6wf-section.flip > :last-child { order: 2; }
  .v6wf-toolbox-head { grid-template-columns: 1fr; gap: 1.2rem; }
  .v6wf-tools { grid-template-columns: 1fr; }
  .v6wf-showcase { grid-template-columns: 1fr; gap: 1.6rem; }
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
