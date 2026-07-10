<template>
  <div ref="rootEl" class="v3">
    <div class="v3-noise" aria-hidden="true"></div>
    <div class="v3-progress" aria-hidden="true"><span ref="progressEl"></span></div>

    <!-- NAV -->
    <header ref="navEl" class="v3-nav">
      <a class="v3-brand" href="#top" @click.prevent="scrollToTop">
        <img :src="asset('logo.png')" alt="Katsumii logo" width="34" height="34" />
        <span>Katsumii</span>
      </a>
      <nav class="v3-nav-links" aria-label="Page sections">
        <a href="#modes">Modes</a>
        <a href="#showcase">Inside</a>
        <a href="#craft">Craft</a>
        <a href="#local">Local offline</a>
      </nav>
      <div class="v3-nav-right">
        <RouterLink class="v3-nav-ghost" to="/en/app">Classic site</RouterLink>
        <RouterLink class="v3-btn v3-btn-nav" to="/en/pricing">Get Katsumii</RouterLink>
      </div>
    </header>

    <main id="top">
      <!-- HERO -->
      <section class="v3-hero">
        <canvas ref="canvasEl" class="v3-hero-canvas" aria-hidden="true"></canvas>
        <span class="v3-kanji v3-kanji-hero" aria-hidden="true">勝</span>

        <div class="v3-hero-inner">
          <p class="v3-eyebrow v3-load v3-load-1"><i></i>Katsumii — a local offline trading journal</p>
          <h1 class="v3-h1">
            <span class="v3-hline"><span class="v3-hline-in v3-load-h1a">Turn raw trades</span></span>
            <span class="v3-hline"><span class="v3-hline-in v3-load-h1b">into <em>mastery</em><b class="v3-dot">.</b></span></span>
          </h1>
          <p class="v3-hero-sub v3-load v3-load-2">
            The journal and prop-firm cockpit that lives entirely on your machine.
            Log every trade, watch every drawdown rule, study your edge —
            no cloud, no account, no compromise.
          </p>
          <div class="v3-hero-actions v3-load v3-load-3">
            <RouterLink to="/en/pricing" class="v3-btn v3-magnetic">Get Katsumii <span aria-hidden="true">→</span></RouterLink>
            <a href="#modes" class="v3-quiet v3-magnetic">Step inside <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div class="v3-hero-stage v3-load v3-load-4">
          <div ref="tiltEl" class="v3-hero-shot">
            <img
              :src="asset('Dashboard_dark.png')"
              alt="Katsumii dashboard with net P&amp;L, execution quality and equity curve"
              width="2559" height="1599" fetchpriority="high"
            />
            <div class="v3-shot-fade" aria-hidden="true"></div>
          </div>
          <div ref="chipA" class="v3-chip v3-chip-a"><strong>71.4%</strong><span>win rate</span></div>
          <div ref="chipB" class="v3-chip v3-chip-b"><strong>5.39</strong><span>profit factor</span></div>
          <div ref="chipC" class="v3-chip v3-chip-c"><strong>2,16R</strong><span>eff. RRR</span></div>
        </div>
      </section>

      <!-- NUMBERS -->
      <section class="v3-numbers" aria-label="Katsumii in numbers">
        <div v-for="s in stats" :key="s.label" class="v3-num v3-reveal">
          <span class="v3-num-val"><b :data-count="s.value">0</b><i>{{ s.suffix }}</i></span>
          <span class="v3-num-label">{{ s.label }}</span>
        </div>
      </section>

      <!-- MODES -->
      <section id="modes" ref="modesEl" class="v3-modes">
        <div class="v3-modes-pin">
          <div class="v3-section-head">
            <p class="v3-eyebrow v3-reveal"><i></i>Four disciplines</p>
            <h2 class="v3-h2 v3-reveal">One journal.<br />Every way you trade.</h2>
          </div>

          <!-- desktop: pinned stage -->
          <div class="v3-modes-stage" :style="{ '--mode-c': modes[activeMode].color }">
            <div class="v3-modes-side">
              <span class="v3-modes-count" aria-hidden="true">0{{ activeMode + 1 }}</span>
              <div class="v3-modes-names" role="tablist" aria-label="Trading modes">
                <button
                  v-for="(m, i) in modes" :key="m.name" type="button" role="tab"
                  :aria-selected="i === activeMode" :class="{ active: i === activeMode }"
                  :style="{ '--mode-c': m.color }"
                  @click="goToMode(i)"
                >
                  <em aria-hidden="true"></em>{{ m.name }}
                </button>
              </div>
            </div>
            <div class="v3-modes-panel">
              <Transition name="v3-mode" mode="out-in">
                <article :key="activeMode" class="v3-mode-card">
                  <p class="v3-mode-tag">{{ modes[activeMode].tag }}</p>
                  <h3>{{ modes[activeMode].headline }}</h3>
                  <p class="v3-mode-copy">{{ modes[activeMode].copy }}</p>
                  <ul>
                    <li v-for="p in modes[activeMode].points" :key="p">{{ p }}</li>
                  </ul>
                </article>
              </Transition>
            </div>
          </div>

          <!-- mobile: stacked cards -->
          <div class="v3-modes-stack">
            <article
              v-for="(m, i) in modes" :key="`stack-${m.name}`"
              class="v3-mode-card v3-reveal" :style="{ '--mode-c': m.color }"
            >
              <p class="v3-mode-tag"><span aria-hidden="true">0{{ i + 1 }}</span> {{ m.name }} — {{ m.tag }}</p>
              <h3>{{ m.headline }}</h3>
              <p class="v3-mode-copy">{{ m.copy }}</p>
              <ul>
                <li v-for="p in m.points" :key="p">{{ p }}</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <!-- SHOWCASE -->
      <section id="showcase" ref="showcaseEl" class="v3-showcase">
        <div class="v3-section-head v3-showcase-head">
          <p class="v3-eyebrow v3-reveal"><i></i>Inside the cockpit</p>
          <h2 class="v3-h2 v3-reveal">Calm. Dense.<br />Built for daily use.</h2>
          <p class="v3-showcase-hint" aria-hidden="true">scroll <span>→</span></p>
        </div>
        <div class="v3-track-clip">
          <div ref="trackEl" class="v3-track">
            <figure v-for="(slide, i) in slides" :key="slide.title" class="v3-slide">
              <div class="v3-slide-frame">
                <img
                  :src="asset(slide.img)" :alt="slide.alt"
                  :width="slide.w" :height="slide.h" loading="lazy" decoding="async"
                />
              </div>
              <figcaption>
                <span class="v3-slide-index" aria-hidden="true">0{{ i + 1 }} / 0{{ slides.length }}</span>
                <strong>{{ slide.title }}</strong>
                <span>{{ slide.caption }}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <!-- CRAFT -->
      <section id="craft" class="v3-craft">
        <div class="v3-section-head">
          <p class="v3-eyebrow v3-reveal"><i></i>The craft</p>
          <h2 class="v3-h2 v3-reveal">Everything a serious<br />journal should carry.</h2>
        </div>
        <div class="v3-craft-grid">
          <article v-for="f in features" :key="f.title" :class="['v3-card', 'v3-reveal', f.span]">
            <span class="v3-card-icon" aria-hidden="true" v-html="f.icon"></span>
            <h3>{{ f.title }}</h3>
            <p>{{ f.copy }}</p>
            <ul v-if="f.chips" class="v3-card-chips">
              <li v-for="c in f.chips" :key="c">{{ c }}</li>
            </ul>
          </article>
        </div>
      </section>

      <!-- LOCAL OFFLINE -->
      <section id="local" class="v3-local">
        <span class="v3-kanji v3-kanji-local" aria-hidden="true">守</span>
        <div class="v3-local-inner">
          <p class="v3-eyebrow v3-reveal"><i></i>Local and offline, always</p>
          <p class="v3-local-lines">
            <span class="v3-reveal">No cloud.</span>
            <span class="v3-reveal">No account.</span>
            <span class="v3-reveal">No one watching<b class="v3-dot">.</b></span>
          </p>
          <p class="v3-local-copy v3-reveal">
            Katsumii writes to a single SQLite database on your disk. Backups run
            automatically on your schedule, exports are one click away, and your
            reports work offline. Your trading history belongs to you — nobody else.
          </p>
          <ul class="v3-local-chips v3-reveal">
            <li>SQLite on your disk</li>
            <li>Automatic backups</li>
            <li>Offline HTML reports</li>
            <li>CSV export anytime</li>
          </ul>
        </div>
      </section>

      <!-- CTA -->
      <section class="v3-cta">
        <h2 class="v3-cta-title v3-reveal">Own your <em>edge</em><b class="v3-dot">.</b></h2>
        <p class="v3-cta-sub v3-reveal">Katsumii runs on your machine. Start journaling tonight.</p>
        <div class="v3-cta-actions v3-reveal">
          <RouterLink to="/en/pricing" class="v3-btn v3-btn-lg v3-magnetic">Get Katsumii <span aria-hidden="true">→</span></RouterLink>
          <RouterLink to="/en/app" class="v3-quiet">Explore the classic site</RouterLink>
        </div>
      </section>
    </main>

    <footer class="v3-footer">
      <p>© {{ year }} Katsumii — local offline trading journal</p>
      <nav aria-label="Legal">
        <RouterLink to="/en/privacy">Privacy</RouterLink>
        <RouterLink to="/en/terms">Terms</RouterLink>
        <RouterLink to="/en/impressum">Impressum</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const baseUrl = import.meta.env.BASE_URL
const asset = (path) => `${baseUrl}${path}`
const year = new Date().getFullYear()

const rootEl = ref(null)
const navEl = ref(null)
const progressEl = ref(null)
const canvasEl = ref(null)
const tiltEl = ref(null)
const chipA = ref(null)
const chipB = ref(null)
const chipC = ref(null)
const modesEl = ref(null)
const showcaseEl = ref(null)
const trackEl = ref(null)
const activeMode = ref(0)

const stats = [
  { value: 4, suffix: "", label: "trading modes" },
  { value: 100, suffix: "%", label: "local data" },
  { value: 6, suffix: "", label: "built-in tools" },
  { value: 4, suffix: "", label: "live sync providers" },
]

const modes = [
  {
    name: "Funded",
    color: "#2dd4bf",
    tag: "Live prop capital",
    headline: "Guarded, every session.",
    copy: "Your funded accounts on one board — with the rules that keep them alive always in sight.",
    points: [
      "Distance to daily and max loss limits, per account",
      "Payout history, winning days and consistency tracking",
      "Rebill dates, billing state and account health at a glance",
    ],
  },
  {
    name: "Challenge",
    color: "#facc15",
    tag: "Evaluations & combines",
    headline: "Pass with proof.",
    copy: "Every evaluation tracked from first trade to funded — targets, minimum days and the moment you convert.",
    points: [
      "Profit target and minimum-days progress",
      "Pass / fail state with full trade history behind it",
      "One step to convert a passed challenge into a funded account",
    ],
  },
  {
    name: "Personal",
    color: "#60a5fa",
    tag: "Your own capital",
    headline: "Same discipline, your money.",
    copy: "Personal accounts get the same cockpit — daily goals, personal loss limits and streaks that keep you honest.",
    points: [
      "Personal daily loss limits and daily goals",
      "Day and trade streaks across your accounts",
      "Fully siloed from prop data — clean statistics",
    ],
  },
  {
    name: "Backtest",
    color: "#c084fc",
    tag: "Sessions, not accounts",
    headline: "Rehearse the edge.",
    copy: "Import FXReplay or CSV sessions, attach a hypothesis, and review backtests with the same analytics as live trading.",
    points: [
      "FXReplay and CSV imports into named sessions",
      "Hypothesis notes, session sparklines and win rates",
      "Compare strategies before risking a cent",
    ],
  },
]

const slides = [
  {
    img: "Dashboard_dark.png", w: 2559, h: 1599,
    alt: "Katsumii dashboard with net P&L hero, trade breakdown and equity curve",
    title: "Dashboard",
    caption: "Your entire edge on one screen — net P&L, execution quality, edge drivers.",
  },
  {
    img: "Calendar_dark.png", w: 2532, h: 1332,
    alt: "Katsumii calendar with color-graded trading days and weekly summaries",
    title: "Calendar",
    caption: "Every day color-graded, with weekly and monthly performance in the margins.",
  },
  {
    img: "Stats_dark.png", w: 1654, h: 1599,
    alt: "Katsumii analysis view with weekday, session and setup breakdowns",
    title: "Analysis",
    caption: "Slice performance by weekday, session, setup — find where the edge really lives.",
  },
  {
    img: "Main_dark.png", w: 2559, h: 1599,
    alt: "Katsumii account overview with balance, drawdown distance and billing state",
    title: "Accounts",
    caption: "Drawdown distance, winning days and rebill dates — before you take the next trade.",
  },
]

const icon = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`

const features = [
  {
    title: "A quiet place to think",
    copy: "A rich-text daily journal with autosave, screenshots and per-day stats pinned to every entry. Your calendar remembers which days you reflected.",
    icon: icon('<path d="M16.86 4.49a1.87 1.87 0 1 1 2.65 2.65L7.5 19.14 4 20l.86-3.5L16.86 4.49z"/><path d="M15 6.5l2.5 2.5"/>'),
    span: "v3-span-7",
    chips: ["Rich text", "Autosave", "Screenshots", "Day markers"],
  },
  {
    title: "Your history, in minutes",
    copy: "A CSV wizard with broker presets, FXReplay backtest imports, and live sync for MetaTrader 5, ProjectX, Capital.com and OANDA.",
    icon: icon('<path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 21h16"/>'),
    span: "v3-span-5",
    chips: ["CSV wizard", "FXReplay", "MT5", "ProjectX", "Capital.com", "OANDA"],
  },
  {
    title: "Rules that never sleep",
    copy: "Inactivity alerts before deadlines bite, corrections that keep balances honest, and copy groups for leader–follower accounts.",
    icon: icon('<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/><path d="M9.5 12l2 2 3.5-3.5"/>'),
    span: "v3-span-5",
  },
  {
    title: "One file, the whole story",
    copy: "Self-contained HTML performance reports — equity curve, calendar heatmap, breakdowns — that open offline and travel anywhere.",
    icon: icon('<path d="M6 3h9l4 4v14H6V3z"/><path d="M15 3v4h4"/><path d="M9 13l2.2 2.2L15 11"/>'),
    span: "v3-span-7",
    chips: ["Equity curve", "Heatmap", "Dark / light"],
  },
  {
    title: "Six sharp little blades",
    copy: "R:R visualizer, position size calculator, equity simulator, timezone and currency converters, futures contract specs — built in.",
    icon: icon('<path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14 13l-3-3 3.7-3.7z"/>'),
    span: "v3-span-6",
  },
  {
    title: "Slice by anything",
    copy: "Strategy, session, emotion, mistake, asset, timeframe, direction, tags — flip a filter and every metric recalculates instantly.",
    icon: icon('<path d="M4 5h16"/><path d="M7 12h10"/><path d="M10 19h4"/>'),
    span: "v3-span-6",
  },
]

let gsapCtx = null
let matchMedia = null
let modesTrigger = null
let cleanups = []
const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

const scrollToTop = () => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })

const goToMode = (i) => {
  if (modesTrigger) {
    const { start, end } = modesTrigger
    const target = start + ((end - start) * (i + 0.5)) / modes.length
    window.scrollTo({ top: target, behavior: prefersReducedMotion() ? "auto" : "smooth" })
  } else {
    activeMode.value = i
  }
}

/* ── hero canvas: drifting teal equity ribbons + spores ── */
function initCanvas() {
  const canvas = canvasEl.value
  if (!canvas) return () => {}
  const c = canvas.getContext("2d")
  let w = 0
  let h = 0
  let raf = 0
  let visible = true
  const pointer = { y: 0, ty: 0 }

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    w = canvas.clientWidth
    h = canvas.clientHeight
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    c.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  resize()

  const ribbons = [
    { base: 0.58, amp: 0.11, freq: 1.6, speed: 0.00035, phase: 0.0, color: "45,212,191", alpha: 0.5, width: 1.4, depth: 1.0 },
    { base: 0.5, amp: 0.15, freq: 1.1, speed: 0.00022, phase: 2.1, color: "94,234,212", alpha: 0.26, width: 1.1, depth: 0.55 },
    { base: 0.68, amp: 0.08, freq: 2.2, speed: 0.00045, phase: 4.4, color: "15,159,143", alpha: 0.34, width: 1.0, depth: 1.5 },
  ]
  const dotCount = Math.max(24, Math.min(64, Math.round((w * h) / 30000)))
  const dots = Array.from({ length: dotCount }, () => ({
    x: Math.random(), y: Math.random(),
    vx: 0.00002 + Math.random() * 0.00004,
    vy: -(0.00002 + Math.random() * 0.00005),
    r: 0.6 + Math.random() * 1.3,
    tw: Math.random() * Math.PI * 2,
  }))

  const ribbonY = (r, u, t) => {
    const envelope = Math.pow(Math.sin(Math.PI * u), 0.85)
    const wave = Math.sin(u * r.freq * 7 + t * r.speed * 8 + r.phase)
    const drift = Math.sin(u * 2.4 + t * r.speed * 3 + r.phase * 1.7) * 0.35
    return (r.base + pointer.y * 0.04 * r.depth + (wave + drift) * r.amp * envelope) * h
  }

  const draw = (t) => {
    pointer.y += (pointer.ty - pointer.y) * 0.04
    c.clearRect(0, 0, w, h)
    for (const r of ribbons) {
      for (let pass = 0; pass < 2; pass++) {
        c.beginPath()
        for (let x = 0; x <= w; x += 14) {
          const y = ribbonY(r, x / w, t)
          x === 0 ? c.moveTo(x, y) : c.lineTo(x, y)
        }
        c.strokeStyle = `rgba(${r.color},${pass === 0 ? r.alpha * 0.16 : r.alpha})`
        c.lineWidth = pass === 0 ? r.width * 4.5 : r.width
        c.stroke()
      }
    }
    for (const d of dots) {
      d.x += d.vx * 16
      d.y += d.vy * 16
      if (d.y < -0.02) { d.y = 1.02; d.x = Math.random() }
      if (d.x > 1.02) d.x = -0.02
      const a = 0.12 + 0.22 * (0.5 + 0.5 * Math.sin(t * 0.0012 + d.tw))
      c.fillStyle = `rgba(127,240,221,${a})`
      c.beginPath()
      c.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2)
      c.fill()
    }
    raf = requestAnimationFrame(draw)
  }

  const start = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(draw) }
  const stop = () => { cancelAnimationFrame(raf); raf = 0 }

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    visible ? start() : stop()
  })
  io.observe(canvas)

  const onPointer = (e) => { pointer.ty = (e.clientY / window.innerHeight) * 2 - 1 }
  const onVis = () => (document.hidden ? stop() : start())
  window.addEventListener("pointermove", onPointer, { passive: true })
  window.addEventListener("resize", resize)
  document.addEventListener("visibilitychange", onVis)
  start()

  return () => {
    stop()
    io.disconnect()
    window.removeEventListener("pointermove", onPointer)
    window.removeEventListener("resize", resize)
    document.removeEventListener("visibilitychange", onVis)
  }
}

/* ── magnetic buttons (fine pointers only) ── */
function initMagnetic() {
  if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {}
  const els = rootEl.value.querySelectorAll(".v3-magnetic")
  const offs = []
  els.forEach((el) => {
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      gsap.to(el, { x: dx * 0.18, y: dy * 0.3, duration: 0.4, ease: "power3.out" })
    }
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.45)" })
    el.addEventListener("pointermove", move)
    el.addEventListener("pointerleave", leave)
    offs.push(() => {
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerleave", leave)
    })
  })
  return () => offs.forEach((off) => off())
}

onMounted(() => {
  document.body.classList.add("v3-body")
  gsap.registerPlugin(ScrollTrigger)
  const reduced = prefersReducedMotion()

  if (!reduced) cleanups.push(initCanvas())
  cleanups.push(initMagnetic())

  gsapCtx = gsap.context(() => {
    /* nav backdrop after scroll */
    ScrollTrigger.create({
      start: 60,
      end: "max",
      onEnter: () => navEl.value?.classList.add("is-scrolled"),
      onLeaveBack: () => navEl.value?.classList.remove("is-scrolled"),
    })

    if (reduced) {
      gsap.set(".v3-reveal", { opacity: 1, y: 0 })
      return
    }

    /* reading progress */
    gsap.to(progressEl.value, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    })

    /* scroll reveals */
    gsap.set(".v3-reveal", { opacity: 0, y: 26 })
    ScrollTrigger.batch(".v3-reveal", {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, stagger: 0.09, ease: "power3.out", overwrite: true }),
    })

    /* hero shot straightens as it scrolls in */
    gsap.fromTo(
      tiltEl.value,
      { rotateX: 16, y: 70, scale: 0.94 },
      {
        rotateX: 0, y: 0, scale: 1, ease: "none",
        scrollTrigger: { trigger: ".v3-hero-stage", start: "top bottom", end: "top 32%", scrub: 0.5 },
      },
    )

    /* floating metric chips */
    ;[chipA.value, chipB.value, chipC.value].forEach((chip, i) => {
      gsap.to(chip, {
        y: i % 2 ? 14 : -14,
        duration: 3.2 + i * 0.7,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      })
    })

    /* stat counters */
    gsap.utils.toArray("[data-count]").forEach((el) => {
      const target = Number(el.dataset.count)
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: target,
          duration: 1.6,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        },
      )
    })

    matchMedia = gsap.matchMedia()

    /* pinned modes scene — desktop only */
    matchMedia.add("(min-width: 900px)", () => {
      modesTrigger = ScrollTrigger.create({
        trigger: modesEl.value,
        start: "top top",
        end: `+=${modes.length * 90}%`,
        pin: ".v3-modes-pin",
        onUpdate: (self) => {
          const next = Math.min(modes.length - 1, Math.floor(self.progress * modes.length))
          if (next !== activeMode.value) activeMode.value = next
        },
      })
      return () => {
        modesTrigger = null
      }
    })

    /* horizontal showcase — desktop only */
    matchMedia.add("(min-width: 900px)", () => {
      const track = trackEl.value
      const clip = track.parentElement
      const amount = () => track.scrollWidth - clip.clientWidth
      const tween = gsap.to(track, {
        x: () => -amount(),
        ease: "none",
        scrollTrigger: {
          trigger: showcaseEl.value,
          start: "top top",
          end: () => `+=${amount()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
      return () => tween.scrollTrigger?.kill()
    })
  }, rootEl.value)
})

onBeforeUnmount(() => {
  document.body.classList.remove("v3-body")
  matchMedia?.revert()
  gsapCtx?.revert()
  cleanups.forEach((fn) => fn?.())
  cleanups = []
})
</script>

<style scoped>
/* ═══ tokens ═══ */
.v3 {
  --v3-bg: #04100e;
  --v3-bg-soft: #071b17;
  --v3-panel: rgba(13, 38, 33, 0.42);
  --v3-line: rgba(94, 234, 212, 0.1);
  --v3-line-strong: rgba(94, 234, 212, 0.24);
  --v3-ink: #eaf6f2;
  --v3-muted: #93b3ab;
  --v3-faint: #557069;
  --v3-accent: #2dd4bf;
  --v3-accent-deep: #0f9f8f;
  --v3-accent-hi: #7ff0dd;
  position: relative;
  background:
    radial-gradient(ellipse 90% 60% at 70% -10%, rgba(15, 159, 143, 0.16), transparent 60%),
    radial-gradient(ellipse 60% 50% at 8% 40%, rgba(15, 159, 143, 0.07), transparent 60%),
    var(--v3-bg);
  color: var(--v3-ink);
  font-family: "Manrope", "Segoe UI", sans-serif;
  font-size: 1.0625rem;
  line-height: 1.65;
  overflow: clip;
}

:global(body.v3-body) {
  background: #04100e;
}

.v3-noise {
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  opacity: 0.032;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
}

.v3-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 90;
  pointer-events: none;
}

.v3-progress span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--v3-accent-deep), var(--v3-accent-hi));
  transform: scaleX(0);
  transform-origin: left;
}

.v3 ::selection {
  background: rgba(45, 212, 191, 0.3);
  color: #eafffa;
}

/* ═══ shared ═══ */
.v3-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-family: "DM Mono", monospace;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--v3-accent);
}

.v3-eyebrow i {
  width: 26px;
  height: 1px;
  background: var(--v3-accent);
  opacity: 0.7;
}

.v3-h2 {
  font-family: "Sora", "Manrope", sans-serif;
  font-size: clamp(2.1rem, 4.6vw, 3.7rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1.04;
  margin-top: 1.1rem;
}

.v3-dot {
  color: var(--v3-accent);
  font-style: normal;
  font-weight: inherit;
}

.v3-section-head {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 5vw, 4rem);
}

.v3-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.95rem 1.9rem;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--v3-accent-deep), var(--v3-accent));
  color: #02110d;
  font-weight: 800;
  font-size: 0.95rem;
  letter-spacing: 0.01em;
  text-decoration: none;
  box-shadow: 0 18px 50px -18px rgba(20, 184, 166, 0.55);
  transition: box-shadow 0.3s ease, filter 0.3s ease;
  will-change: transform;
}

.v3-btn:hover {
  filter: brightness(1.12);
  box-shadow: 0 22px 60px -16px rgba(45, 212, 191, 0.65);
}

.v3-btn span {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.v3-btn:hover span {
  transform: translateX(4px);
}

.v3-btn-lg {
  padding: 1.15rem 2.4rem;
  font-size: 1.05rem;
}

.v3-quiet {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--v3-muted);
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  padding: 0.95rem 0.6rem;
  transition: color 0.25s ease;
}

.v3-quiet:hover {
  color: var(--v3-accent-hi);
}

.v3 a:focus-visible,
.v3 button:focus-visible {
  outline: 2px solid var(--v3-accent);
  outline-offset: 3px;
  border-radius: 6px;
}

/* ═══ nav ═══ */
.v3-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem clamp(1.25rem, 4vw, 3rem);
  transition: background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease;
  border-bottom: 1px solid transparent;
}

.v3-nav.is-scrolled {
  background: rgba(4, 16, 14, 0.72);
  border-bottom-color: var(--v3-line);
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
}

.v3-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--v3-ink);
  text-decoration: none;
  font-family: "Sora", sans-serif;
  font-weight: 600;
  font-size: 1.05rem;
  letter-spacing: -0.01em;
}

.v3-brand img {
  display: block;
}

.v3-nav-links {
  display: flex;
  gap: clamp(1rem, 2.5vw, 2.2rem);
}

.v3-nav-links a {
  color: var(--v3-muted);
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 600;
  transition: color 0.2s ease;
}

.v3-nav-links a:hover {
  color: var(--v3-accent-hi);
}

.v3-nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.v3-nav-ghost {
  color: var(--v3-faint);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  transition: color 0.2s ease;
}

.v3-nav-ghost:hover {
  color: var(--v3-muted);
}

.v3-btn-nav {
  padding: 0.55rem 1.25rem;
  font-size: 0.85rem;
}

/* ═══ hero ═══ */
.v3-hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: clamp(7rem, 14vh, 10rem);
}

.v3-hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.v3-kanji {
  position: absolute;
  pointer-events: none;
  user-select: none;
  font-family: "Yu Mincho", "Hiragino Mincho ProN", "Noto Serif CJK JP", serif;
  color: transparent;
  -webkit-text-stroke: 1px rgba(94, 234, 212, 0.13);
  line-height: 1;
}

.v3-kanji-hero {
  top: 8vh;
  right: 2vw;
  font-size: clamp(16rem, 34vw, 34rem);
}

.v3-hero-inner {
  position: relative;
  z-index: 2;
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 5vw, 4rem);
}

.v3-h1 {
  margin-top: 1.4rem;
  font-family: "Sora", "Manrope", sans-serif;
  font-size: clamp(2.9rem, 8.4vw, 7rem);
  font-weight: 600;
  letter-spacing: -0.045em;
  line-height: 1.01;
}

.v3-h1 em {
  font-family: "DM Sans", sans-serif;
  font-style: italic;
  font-weight: 300;
  letter-spacing: -0.02em;
  color: var(--v3-accent-hi);
}

.v3-hline {
  display: block;
  overflow: hidden;
  padding-bottom: 0.08em;
  margin-bottom: -0.08em;
}

.v3-hline-in {
  display: inline-block;
  transform: translateY(112%);
  animation: v3-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.v3-load-h1a { animation-delay: 0.15s; }
.v3-load-h1b { animation-delay: 0.27s; }

@keyframes v3-rise {
  to { transform: translateY(0); }
}

.v3-load {
  opacity: 0;
  transform: translateY(18px);
  animation: v3-fade 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.v3-load-1 { animation-delay: 0.05s; }
.v3-load-2 { animation-delay: 0.5s; }
.v3-load-3 { animation-delay: 0.65s; }
.v3-load-4 { animation-delay: 0.55s; }

@keyframes v3-fade {
  to { opacity: 1; transform: translateY(0); }
}

.v3-hero-sub {
  max-width: 34rem;
  margin-top: 1.6rem;
  color: var(--v3-muted);
  font-size: clamp(1rem, 1.4vw, 1.15rem);
}

.v3-hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.4rem;
  margin-top: 2.2rem;
}

.v3-hero-stage {
  position: relative;
  z-index: 2;
  max-width: 1240px;
  width: 100%;
  margin: clamp(3rem, 7vh, 5rem) auto 0;
  padding: 0 clamp(1.25rem, 5vw, 4rem);
  perspective: 1200px;
}

.v3-hero-shot {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid var(--v3-line-strong);
  box-shadow:
    0 40px 120px -40px rgba(0, 0, 0, 0.85),
    0 0 90px -30px rgba(20, 184, 166, 0.4);
  transform-origin: center bottom;
  will-change: transform;
}

.v3-hero-shot img {
  display: block;
  width: 100%;
  height: auto;
}

.v3-shot-fade {
  position: absolute;
  inset: auto 0 0;
  height: 30%;
  background: linear-gradient(180deg, transparent, rgba(4, 16, 14, 0.9));
  pointer-events: none;
}

.v3-chip {
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: 0.7rem 1rem;
  border-radius: 14px;
  border: 1px solid var(--v3-line-strong);
  background: rgba(7, 27, 23, 0.82);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 22px 60px -24px rgba(0, 0, 0, 0.8);
}

.v3-chip strong {
  font-family: "DM Mono", monospace;
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--v3-accent-hi);
}

.v3-chip span {
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--v3-muted);
}

.v3-chip-a { top: 6%; left: 1%; }
.v3-chip-b { top: 30%; right: 0.5%; }
.v3-chip-c { bottom: 26%; left: 4%; }

/* ═══ numbers ═══ */
.v3-numbers {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  max-width: 1240px;
  margin: clamp(5rem, 10vh, 8rem) auto 0;
  padding: 0 clamp(1.25rem, 5vw, 4rem);
}

.v3-num {
  padding: 1.8rem 1rem;
  border-top: 1px solid var(--v3-line);
  border-bottom: 1px solid var(--v3-line);
  text-align: center;
}

.v3-num-val {
  display: block;
  font-family: "DM Mono", monospace;
  font-size: clamp(1.9rem, 3.4vw, 2.9rem);
  color: var(--v3-ink);
}

.v3-num-val i {
  font-style: normal;
  color: var(--v3-accent);
  font-size: 0.7em;
}

.v3-num-label {
  display: block;
  margin-top: 0.3rem;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--v3-faint);
}

/* ═══ modes ═══ */
.v3-modes {
  position: relative;
  margin-top: clamp(6rem, 14vh, 10rem);
}

.v3-modes-pin {
  padding: clamp(3rem, 8vh, 5rem) 0;
}

.v3-modes-stage {
  display: grid;
  grid-template-columns: minmax(280px, 0.9fr) 1.4fr;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
  max-width: 1240px;
  margin: clamp(2.5rem, 6vh, 4rem) auto 0;
  padding: 0 clamp(1.25rem, 5vw, 4rem);
  min-height: 46vh;
}

.v3-modes-side {
  position: relative;
}

.v3-modes-count {
  display: block;
  font-family: "DM Mono", monospace;
  font-size: clamp(4.5rem, 8vw, 7.5rem);
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1.5px var(--mode-c, var(--v3-accent));
  opacity: 0.85;
  transition: -webkit-text-stroke-color 0.5s ease;
}

.v3-modes-names {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  margin-top: 1.6rem;
}

.v3-modes-names button {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  background: none;
  border: none;
  padding: 0.35rem 0;
  cursor: pointer;
  font-family: "Sora", sans-serif;
  font-size: clamp(1.15rem, 1.9vw, 1.55rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--v3-faint);
  transition: color 0.35s ease;
}

.v3-modes-names button em {
  width: 20px;
  height: 1px;
  background: var(--mode-c, var(--v3-accent));
  opacity: 0;
  transform: scaleX(0.4);
  transform-origin: left;
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.v3-modes-names button.active {
  color: var(--v3-ink);
}

.v3-modes-names button.active em {
  opacity: 1;
  transform: scaleX(1);
}

.v3-modes-names button:hover {
  color: var(--v3-muted);
}

.v3-modes-names button.active:hover {
  color: var(--v3-ink);
}

.v3-mode-card {
  position: relative;
  border: 1px solid var(--v3-line);
  border-radius: 22px;
  padding: clamp(1.6rem, 3vw, 2.6rem);
  background: linear-gradient(150deg, var(--v3-panel), rgba(7, 27, 23, 0.2));
}

.v3-mode-card::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  border-radius: 3px;
  background: var(--mode-c, var(--v3-accent));
  opacity: 0.85;
}

.v3-mode-tag {
  font-family: "DM Mono", monospace;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--mode-c, var(--v3-accent));
}

.v3-mode-tag span {
  opacity: 0.6;
  margin-right: 0.4rem;
}

.v3-mode-card h3 {
  margin-top: 0.9rem;
  font-family: "Sora", sans-serif;
  font-size: clamp(1.6rem, 2.6vw, 2.3rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.08;
}

.v3-mode-copy {
  margin-top: 0.9rem;
  color: var(--v3-muted);
  max-width: 34rem;
}

.v3-mode-card ul {
  list-style: none;
  margin: 1.4rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.65rem;
}

.v3-mode-card li {
  display: flex;
  gap: 0.7rem;
  align-items: flex-start;
  color: var(--v3-muted);
  font-size: 0.95rem;
}

.v3-mode-card li::before {
  content: "";
  flex: 0 0 auto;
  width: 6px;
  height: 6px;
  margin-top: 0.55em;
  border-radius: 999px;
  background: var(--mode-c, var(--v3-accent));
  box-shadow: 0 0 12px var(--mode-c, var(--v3-accent));
}

.v3-mode-enter-active,
.v3-mode-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.v3-mode-enter-from {
  opacity: 0;
  transform: translateY(22px);
}

.v3-mode-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}

.v3-modes-stack {
  display: none;
}

/* ═══ showcase ═══ */
.v3-showcase {
  margin-top: clamp(6rem, 14vh, 10rem);
  padding-top: clamp(2rem, 5vh, 4rem);
}

.v3-showcase-head {
  position: relative;
  padding-bottom: clamp(2rem, 5vh, 3.5rem);
}

.v3-showcase-hint {
  position: absolute;
  right: clamp(1.25rem, 5vw, 4rem);
  bottom: clamp(2rem, 5vh, 3.5rem);
  font-family: "DM Mono", monospace;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--v3-faint);
}

.v3-showcase-hint span {
  color: var(--v3-accent);
  animation: v3-nudge 1.6s ease-in-out infinite;
  display: inline-block;
}

@keyframes v3-nudge {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(6px); }
}

.v3-track-clip {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding-bottom: 1.5rem;
}

.v3-track-clip::-webkit-scrollbar {
  display: none;
}

.v3-track {
  display: flex;
  gap: clamp(1.5rem, 3vw, 3rem);
  padding: 0 clamp(1.25rem, 5vw, 4rem);
  width: max-content;
  will-change: transform;
}

.v3-slide {
  margin: 0;
  width: min(78vw, 1020px);
  scroll-snap-align: center;
  flex: 0 0 auto;
}

.v3-slide-frame {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid var(--v3-line-strong);
  background: var(--v3-bg-soft);
  box-shadow: 0 34px 90px -40px rgba(0, 0, 0, 0.85);
  aspect-ratio: 16 / 9.4;
}

.v3-slide-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.v3-slide figcaption {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.4rem 1.1rem;
  margin-top: 1.1rem;
  color: var(--v3-muted);
  font-size: 0.92rem;
}

.v3-slide-index {
  font-family: "DM Mono", monospace;
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  color: var(--v3-faint);
}

.v3-slide figcaption strong {
  font-family: "Sora", sans-serif;
  font-size: 1.1rem;
  color: var(--v3-ink);
  letter-spacing: -0.02em;
}

/* ═══ craft ═══ */
.v3-craft {
  margin-top: clamp(6rem, 14vh, 10rem);
}

.v3-craft-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.1rem;
  max-width: 1240px;
  margin: clamp(2.5rem, 6vh, 4rem) auto 0;
  padding: 0 clamp(1.25rem, 5vw, 4rem);
}

.v3-span-5 { grid-column: span 5; }
.v3-span-6 { grid-column: span 6; }
.v3-span-7 { grid-column: span 7; }

.v3-card {
  position: relative;
  border: 1px solid var(--v3-line);
  border-radius: 20px;
  padding: 1.8rem;
  background: linear-gradient(160deg, var(--v3-panel), rgba(7, 27, 23, 0.12));
  transition: border-color 0.35s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.v3-card:hover {
  border-color: var(--v3-line-strong);
  transform: translateY(-4px);
}

.v3-card-icon {
  display: inline-flex;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid var(--v3-line-strong);
  background: rgba(15, 159, 143, 0.1);
  color: var(--v3-accent-hi);
}

.v3-card-icon :deep(svg) {
  width: 20px;
  height: 20px;
}

.v3-card h3 {
  margin-top: 1.1rem;
  font-family: "Sora", sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.v3-card p {
  margin-top: 0.6rem;
  color: var(--v3-muted);
  font-size: 0.95rem;
}

.v3-card-chips {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 1.1rem 0 0;
  padding: 0;
}

.v3-card-chips li {
  font-family: "DM Mono", monospace;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--v3-accent);
  border: 1px solid var(--v3-line);
  border-radius: 999px;
  padding: 0.28rem 0.65rem;
}

/* ═══ local offline ═══ */
.v3-local {
  position: relative;
  margin-top: clamp(7rem, 16vh, 12rem);
  padding: clamp(4rem, 9vh, 7rem) 0;
  border-top: 1px solid var(--v3-line);
  border-bottom: 1px solid var(--v3-line);
  background: linear-gradient(180deg, rgba(7, 27, 23, 0.5), rgba(4, 16, 14, 0.2));
  overflow: hidden;
}

.v3-kanji-local {
  top: 50%;
  right: 4vw;
  transform: translateY(-50%);
  font-size: clamp(14rem, 26vw, 26rem);
}

.v3-local-inner {
  position: relative;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 5vw, 4rem);
}

.v3-local-lines {
  margin-top: 1.4rem;
  font-family: "Sora", sans-serif;
  font-size: clamp(2.4rem, 6.4vw, 5.2rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.06;
}

.v3-local-lines span {
  display: block;
}

.v3-local-copy {
  max-width: 36rem;
  margin-top: 1.8rem;
  color: var(--v3-muted);
}

.v3-local-chips {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 2rem 0 0;
  padding: 0;
}

.v3-local-chips li {
  font-family: "DM Mono", monospace;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--v3-accent-hi);
  border: 1px solid var(--v3-line-strong);
  border-radius: 999px;
  padding: 0.45rem 0.95rem;
  background: rgba(15, 159, 143, 0.08);
}

/* ═══ cta ═══ */
.v3-cta {
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(7rem, 16vh, 11rem) clamp(1.25rem, 5vw, 4rem);
  text-align: center;
}

.v3-cta-title {
  font-family: "Sora", sans-serif;
  font-size: clamp(3rem, 9vw, 7.5rem);
  font-weight: 600;
  letter-spacing: -0.045em;
  line-height: 1;
}

.v3-cta-title em {
  font-family: "DM Sans", sans-serif;
  font-style: italic;
  font-weight: 300;
  color: var(--v3-accent-hi);
}

.v3-cta-sub {
  margin-top: 1.3rem;
  color: var(--v3-muted);
  font-size: 1.05rem;
}

.v3-cta-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
  margin-top: 2.6rem;
}

/* ═══ footer ═══ */
.v3-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.8rem;
  max-width: 1240px;
  margin: 0 auto;
  padding: 1.6rem clamp(1.25rem, 5vw, 4rem) 2.2rem;
  border-top: 1px solid var(--v3-line);
  color: var(--v3-faint);
  font-size: 0.82rem;
}

.v3-footer nav {
  display: flex;
  gap: 1.4rem;
}

.v3-footer a {
  color: var(--v3-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.v3-footer a:hover {
  color: var(--v3-accent-hi);
}

/* ═══ responsive ═══ */
@media (min-width: 900px) {
  .v3-track-clip {
    overflow: hidden;
    scroll-snap-type: none;
    padding-bottom: 0;
  }

  .v3-slide {
    width: min(66vw, 1020px);
  }
}

@media (max-width: 899px) {
  .v3-nav-links,
  .v3-nav-ghost {
    display: none;
  }

  .v3-modes-stage {
    display: none;
  }

  .v3-modes-stack {
    display: grid;
    gap: 1.1rem;
    max-width: 1240px;
    margin: 2.2rem auto 0;
    padding: 0 clamp(1.25rem, 5vw, 4rem);
  }

  .v3-numbers {
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
  }

  .v3-num {
    border-bottom: none;
  }

  .v3-num:nth-child(3),
  .v3-num:nth-child(4) {
    border-top: none;
    border-bottom: 1px solid var(--v3-line);
    padding-top: 0.4rem;
  }

  .v3-craft-grid {
    grid-template-columns: 1fr;
  }

  .v3-span-5,
  .v3-span-6,
  .v3-span-7 {
    grid-column: auto;
  }

  .v3-chip-c {
    display: none;
  }

  .v3-chip strong {
    font-size: 0.95rem;
  }

  .v3-chip {
    padding: 0.55rem 0.75rem;
  }

  .v3-kanji-local {
    opacity: 0.5;
  }

  .v3-slide {
    width: 86vw;
  }

  .v3-showcase-hint {
    position: static;
    margin-top: 1.4rem;
  }

  .v3-hero {
    min-height: auto;
    padding-top: 6.5rem;
  }
}

/* ═══ reduced motion ═══ */
@media (prefers-reduced-motion: reduce) {
  .v3-load,
  .v3-hline-in {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .v3-showcase-hint span {
    animation: none;
  }

  .v3-card,
  .v3-btn span {
    transition: none;
  }
}
</style>
