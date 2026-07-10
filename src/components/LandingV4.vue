<template>
  <div ref="rootEl" class="v4" :class="{ light: theme === 'light' }">
    <canvas ref="glEl" class="v4-gl" aria-hidden="true"></canvas>
    <div class="v4-noise" aria-hidden="true"></div>
    <div class="v4-progress" aria-hidden="true"><span ref="progressEl"></span></div>

    <div class="v4-bgswitch" role="group" aria-label="Background style">
      <button
        v-for="o in BG_OPTIONS" :key="o.key" type="button"
        :class="{ active: bgMode === o.key }" :aria-pressed="bgMode === o.key"
        @click="setBg(o.key)"
      >{{ o.label }}</button>
    </div>

    <!-- NAV -->
    <header ref="navEl" class="v4-nav">
      <a class="v4-brand" href="#top" @click.prevent="scrollToTop">
        <img :src="asset('logo.png')" alt="Katsumii logo" width="32" height="32" />
        <span>Katsumii</span>
      </a>
      <nav class="v4-nav-links" aria-label="Page sections">
        <a href="#story">Inside</a>
        <a href="#modes">Modes</a>
        <a href="#craft">Craft</a>
        <a href="#local">Local</a>
      </nav>
      <div class="v4-nav-right">
        <button
          type="button" class="v4-theme"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
        >
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
            <circle cx="12" cy="12" r="4.4" />
            <path d="M12 2.8v2.2M12 19v2.2M2.8 12h2.2M19 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.4 14.2A8.4 8.4 0 0 1 9.8 3.6a8.4 8.4 0 1 0 10.6 10.6z" />
          </svg>
        </button>
        <RouterLink class="v4-nav-ghost" to="/en/app">Classic site</RouterLink>
        <RouterLink class="v4-btn v4-btn-sm v4-magnetic" to="/en/pricing">Get Katsumii</RouterLink>
      </div>
    </header>

    <main id="top">
      <!-- HERO -->
      <section class="v4-hero">
        <div class="v4-hero-inner">
          <p class="v4-eyebrow v4-load v4-load-1"><i></i>Katsumii — local offline trading journal</p>
          <h1 class="v4-h1">
            <span class="v4-hline"><span class="v4-hline-in v4-load-h1a">Your edge,</span></span>
            <span class="v4-hline"><span class="v4-hline-in v4-load-h1b">made <em>visible</em><b class="v4-dot">.</b></span></span>
          </h1>
          <p class="v4-hero-sub v4-load v4-load-2">
            A living journal and prop-firm cockpit that runs entirely on your
            machine. Log trades in seconds, watch every drawdown rule, and
            study the patterns behind your P&amp;L.
          </p>
          <div class="v4-hero-actions v4-load v4-load-3">
            <RouterLink to="/en/pricing" class="v4-btn v4-magnetic">Get Katsumii <span aria-hidden="true">→</span></RouterLink>
            <a href="#story" class="v4-quiet v4-magnetic">See it breathe <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <p class="v4-hero-hint v4-load v4-load-4" aria-hidden="true"><span></span>scroll</p>
      </section>

      <!-- MARQUEE -->
      <div class="v4-marquee" aria-hidden="true">
        <div class="v4-marquee-track">
          <span v-for="n in 2" :key="n" class="v4-marquee-seq">
            journal <i>·</i> accounts <i>·</i> challenges <i>·</i> backtests <i>·</i>
            analytics <i>·</i> payouts <i>·</i> drawdown rules <i>·</i> imports <i>·</i>
            reports <i>·</i> your disk <i>·</i>
          </span>
        </div>
      </div>

      <!-- NUMBERS -->
      <section class="v4-numbers" aria-label="Katsumii in numbers">
        <div v-for="s in stats" :key="s.label" class="v4-num v4-reveal">
          <span class="v4-num-val"><b :data-count="s.value">0</b><i>{{ s.suffix }}</i></span>
          <span class="v4-num-label">{{ s.label }}</span>
        </div>
      </section>

      <!-- STORY (pinned scrollytelling on desktop) -->
      <section id="story" ref="storyEl" class="v4-story">
        <div ref="storyPinEl" class="v4-story-pin">
          <div class="v4-story-copy">
            <p class="v4-eyebrow v4-reveal"><i></i>Inside the cockpit</p>
            <h2 class="v4-h2 v4-reveal">Four screens,<br />one living picture.</h2>
            <div class="v4-story-steps">
              <div
                v-for="(s, i) in slides" :key="s.title"
                class="v4-story-step" :class="{ active: i === activeStory }"
              >
                <span class="v4-story-num" aria-hidden="true">0{{ i + 1 }}</span>
                <h3>{{ s.title }} <em>— {{ s.tag }}</em></h3>
                <p>{{ s.caption }}</p>
              </div>
            </div>
            <div class="v4-story-dots" role="presentation">
              <button
                v-for="(s, i) in slides" :key="`dot-${s.title}`" type="button"
                :class="{ active: i === activeStory }" :aria-label="`Show ${s.title}`"
                @click="goToStory(i)"
              ></button>
            </div>
          </div>
          <div class="v4-story-stage">
            <figure
              v-for="(s, i) in slides" :key="`shot-${s.title}`"
              class="v4-story-shot" :class="{ active: i === activeStory }"
            >
              <img
                :src="asset(s.img)" :alt="s.alt" :width="s.w" :height="s.h"
                :loading="i === 0 ? 'eager' : 'lazy'" decoding="async"
              />
            </figure>
          </div>
        </div>

        <!-- mobile: plain stacked story -->
        <div class="v4-story-stack">
          <figure v-for="(s, i) in slides" :key="`stack-${s.title}`" class="v4-stack-item v4-reveal">
            <div class="v4-stack-frame">
              <img :src="asset(s.img)" :alt="s.alt" :width="s.w" :height="s.h" loading="lazy" decoding="async" />
            </div>
            <figcaption>
              <span class="v4-story-num" aria-hidden="true">0{{ i + 1 }}</span>
              <strong>{{ s.title }} <em>— {{ s.tag }}</em></strong>
              <span>{{ s.caption }}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <!-- MODES -->
      <section id="modes" class="v4-modes">
        <div class="v4-section-head">
          <p class="v4-eyebrow v4-reveal"><i></i>Four disciplines</p>
          <h2 class="v4-h2 v4-reveal">One journal.<br />Every way you trade.</h2>
        </div>
        <div class="v4-mode-list">
          <article
            v-for="(m, i) in modes" :key="m.name"
            class="v4-mode v4-reveal" :class="{ open: i === openMode }"
          >
            <button
              type="button" class="v4-mode-head"
              :aria-expanded="i === openMode" :aria-controls="`v4-mode-${i}`"
              @click="openMode = openMode === i ? -1 : i"
            >
              <span class="v4-mode-num" aria-hidden="true">0{{ i + 1 }}</span>
              <span class="v4-mode-name">{{ m.name }}</span>
              <span class="v4-mode-tag">{{ m.tag }}</span>
              <span class="v4-mode-ic" aria-hidden="true"></span>
            </button>
            <div :id="`v4-mode-${i}`" class="v4-mode-body">
              <div class="v4-mode-body-in">
                <p class="v4-mode-line">{{ m.headline }}</p>
                <p class="v4-mode-copy">{{ m.copy }}</p>
                <ul>
                  <li v-for="p in m.points" :key="p">{{ p }}</li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- CRAFT -->
      <section id="craft" class="v4-craft">
        <div class="v4-section-head">
          <p class="v4-eyebrow v4-reveal"><i></i>The craft</p>
          <h2 class="v4-h2 v4-reveal">Everything a serious<br />journal should carry.</h2>
        </div>
        <div class="v4-craft-grid">
          <article v-for="f in features" :key="f.title" :class="['v4-card', 'v4-reveal', f.span]">
            <span class="v4-card-icon" aria-hidden="true" v-html="f.icon"></span>
            <h3>{{ f.title }}</h3>
            <p>{{ f.copy }}</p>
            <ul v-if="f.chips" class="v4-card-chips">
              <li v-for="c in f.chips" :key="c">{{ c }}</li>
            </ul>
          </article>
        </div>
      </section>

      <!-- LOCAL OFFLINE -->
      <section id="local" class="v4-local">
        <div class="v4-local-inner">
          <p class="v4-eyebrow v4-reveal"><i></i>Local and offline, always</p>
          <p class="v4-local-lines">
            <span class="v4-reveal">No cloud.</span>
            <span class="v4-reveal">No account.</span>
            <span class="v4-reveal">One file, <em>on your disk</em><b class="v4-dot">.</b></span>
          </p>
          <p class="v4-local-copy v4-reveal">
            Katsumii writes to a single SQLite database on your machine.
            Backups run automatically on your schedule, exports are one click
            away, and your reports open offline. Your trading history belongs
            to you — nobody else.
          </p>
          <ul class="v4-local-chips v4-reveal">
            <li>SQLite on your disk</li>
            <li>Automatic backups</li>
            <li>Offline HTML reports</li>
            <li>CSV export anytime</li>
          </ul>
        </div>
      </section>

      <!-- CTA -->
      <section class="v4-cta">
        <h2 class="v4-cta-title v4-reveal">Trade. Log. <em>Evolve</em><b class="v4-dot">.</b></h2>
        <p class="v4-cta-sub v4-reveal">Katsumii runs on your machine. Start journaling tonight.</p>
        <div class="v4-cta-actions v4-reveal">
          <RouterLink to="/en/pricing" class="v4-btn v4-btn-lg v4-magnetic">Get Katsumii <span aria-hidden="true">→</span></RouterLink>
          <RouterLink to="/en/app" class="v4-quiet">Explore the classic site</RouterLink>
        </div>
      </section>
    </main>

    <footer class="v4-footer">
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
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  NormalBlending,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three"

const baseUrl = import.meta.env.BASE_URL
const asset = (path) => `${baseUrl}${path}`
const year = new Date().getFullYear()

const rootEl = ref(null)
const glEl = ref(null)
const navEl = ref(null)
const progressEl = ref(null)
const storyEl = ref(null)
const storyPinEl = ref(null)
const activeStory = ref(0)
const openMode = ref(0)

const BG_OPTIONS = [
  { key: "river", label: "River" },
  { key: "logo", label: "Logo" },
]
const bgMode = ref("river")
const theme = ref("dark")
let glApi = null

const setBg = (key) => {
  if (bgMode.value === key) return
  bgMode.value = key
  try { localStorage.setItem("katsumii-v4-bg", key) } catch { /* private mode */ }
  glApi?.setMode(key)
}

const toggleTheme = () => {
  theme.value = theme.value === "dark" ? "light" : "dark"
  try { localStorage.setItem("katsumii-v4-theme", theme.value) } catch { /* private mode */ }
  glApi?.setTheme(theme.value === "light")
}

const stats = [
  { value: 4, suffix: "", label: "trading modes" },
  { value: 100, suffix: "%", label: "local data" },
  { value: 6, suffix: "", label: "built-in tools" },
  { value: 4, suffix: "", label: "live sync providers" },
]

const slides = [
  {
    img: "Dashboard_dark.png", w: 2559, h: 1599,
    alt: "Katsumii dashboard with net P&L hero, execution quality and equity curve",
    title: "Dashboard", tag: "the day, distilled",
    caption: "Net P&L, execution quality, edge drivers and your equity curve — one calm screen that carries the whole story.",
  },
  {
    img: "Calendar_dark.png", w: 2532, h: 1332,
    alt: "Katsumii calendar with color-graded trading days and weekly summaries",
    title: "Calendar", tag: "time, color-graded",
    caption: "Every day graded by outcome, weekly and monthly performance in the margins, journal markers where you reflected.",
  },
  {
    img: "Stats_dark.png", w: 1654, h: 1599,
    alt: "Katsumii analysis view with weekday, session and strategy breakdowns",
    title: "Analysis", tag: "where the edge lives",
    caption: "Slice performance by weekday, session, strategy, emotion or mistake — and find out what actually pays you.",
  },
  {
    img: "Main_dark.png", w: 2559, h: 1599,
    alt: "Katsumii account overview with balance, drawdown distance and billing state",
    title: "Accounts", tag: "rules, always in sight",
    caption: "Drawdown distance, winning days, payouts and rebill dates per account — before you take the next trade.",
  },
]

const modes = [
  {
    name: "Funded", tag: "Live prop capital",
    headline: "Guarded, every session.",
    copy: "Your funded accounts on one board — with the rules that keep them alive always in sight.",
    points: [
      "Distance to daily and max loss limits, per account",
      "Payout history, winning days and consistency tracking",
      "Rebill dates, billing state and account health at a glance",
    ],
  },
  {
    name: "Challenge", tag: "Evaluations & combines",
    headline: "Pass with proof.",
    copy: "Every evaluation tracked from first trade to funded — targets, minimum days and the moment you convert.",
    points: [
      "Profit target and minimum-days progress",
      "Pass / fail state with full trade history behind it",
      "One step to convert a passed challenge into a funded account",
    ],
  },
  {
    name: "Personal", tag: "Your own capital",
    headline: "Same discipline, your money.",
    copy: "Personal accounts get the same cockpit — daily goals, personal loss limits and streaks that keep you honest.",
    points: [
      "Personal daily loss limits and daily goals",
      "Day and trade streaks across your accounts",
      "Fully siloed from prop data — clean statistics",
    ],
  },
  {
    name: "Backtest", tag: "Sessions, not accounts",
    headline: "Rehearse the edge.",
    copy: "Import FXReplay or CSV sessions, attach a hypothesis, and review backtests with the same analytics as live trading.",
    points: [
      "FXReplay and CSV imports into named sessions",
      "Hypothesis notes, session sparklines and win rates",
      "Compare strategies before risking a cent",
    ],
  },
]

const icon = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`

const features = [
  {
    title: "A quiet place to think",
    copy: "A rich-text daily journal with autosave, screenshots and per-day stats pinned to every entry. Your calendar remembers which days you reflected.",
    icon: icon('<path d="M16.86 4.49a1.87 1.87 0 1 1 2.65 2.65L7.5 19.14 4 20l.86-3.5L16.86 4.49z"/><path d="M15 6.5l2.5 2.5"/>'),
    span: "v4-span-7",
    chips: ["Rich text", "Autosave", "Screenshots", "Day markers"],
  },
  {
    title: "Your history, in minutes",
    copy: "A CSV wizard with broker presets, FXReplay backtest imports, and live sync for MetaTrader 5, ProjectX, Capital.com and OANDA.",
    icon: icon('<path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 21h16"/>'),
    span: "v4-span-5",
    chips: ["CSV wizard", "FXReplay", "MT5", "ProjectX", "Capital.com", "OANDA"],
  },
  {
    title: "Rules that never sleep",
    copy: "Inactivity alerts before deadlines bite, corrections that keep balances honest, and copy groups for leader–follower accounts.",
    icon: icon('<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/><path d="M9.5 12l2 2 3.5-3.5"/>'),
    span: "v4-span-5",
  },
  {
    title: "One file, the whole story",
    copy: "Self-contained HTML performance reports — equity curve, calendar heatmap, breakdowns — that open offline and travel anywhere.",
    icon: icon('<path d="M6 3h9l4 4v14H6V3z"/><path d="M15 3v4h4"/><path d="M9 13l2.2 2.2L15 11"/>'),
    span: "v4-span-7",
    chips: ["Equity curve", "Heatmap", "Dark / light"],
  },
  {
    title: "Six sharp little blades",
    copy: "R:R visualizer, position size calculator, equity simulator, timezone and currency converters, futures contract specs — built in.",
    icon: icon('<path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14 13l-3-3 3.7-3.7z"/>'),
    span: "v4-span-6",
  },
  {
    title: "Slice by anything",
    copy: "Strategy, session, emotion, mistake, asset, timeframe, direction, tags — flip a filter and every metric recalculates instantly.",
    icon: icon('<path d="M4 5h16"/><path d="M7 12h10"/><path d="M10 19h4"/>'),
    span: "v4-span-6",
  },
]

let gsapCtx = null
let storyTrigger = null
let cleanups = []

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

const scrollToTop = () => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })

const goToStory = (i) => {
  if (storyTrigger) {
    const { start, end } = storyTrigger
    const target = start + ((end - start) * (i + 0.5)) / slides.length
    window.scrollTo({ top: target, behavior: prefersReducedMotion() ? "auto" : "smooth" })
  } else {
    activeStory.value = i
  }
}

/* ── Three.js backgrounds ────────────────────────────────────────
   Interchangeable scenes on one fixed canvas + renderer:
   river  — GPU particle stream, all motion in the vertex shader
   logo   — the bonsai mark assembled from image-sampled particles
   Each reacts gently to the pointer and dims with uScroll.      */

function initGL(startLight) {
  const canvas = glEl.value
  if (!canvas) return null

  let renderer
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" })
  } catch {
    return null
  }

  const reduced = prefersReducedMotion()
  const pointer = { x: 99, y: 99, tx: 99, ty: 99 }
  let scroll = 0
  let current = null
  let currentKey = "river"
  let themeLight = !!startLight
  let raf = 0
  let invalidate = () => {} // async builders request a repaint (reduced motion)
  const start = performance.now()

  // particle golds per theme — darker amber reads on paper, bright gold on ink
  const golds = () => (themeLight
    ? { a: "#a8690f", b: "#7c4d08" }
    : { a: "#e8a33d", b: "#ffd9a0" })

  /* river — golden particle stream, one draw call */
  const buildRiver = () => {
    const scene = new Scene()
    const camera = new PerspectiveCamera(55, 1, 0.1, 10)
    camera.position.z = 2.2
    const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z

    const area = window.innerWidth * window.innerHeight
    const count = reduced
      ? 1600
      : Math.max(2500, Math.min(9000, Math.round(area / 240)))

    const aU = new Float32Array(count)
    const aLane = new Float32Array(count)
    const aSpeed = new Float32Array(count)
    const aSize = new Float32Array(count)
    const aShade = new Float32Array(count)
    const aScatter = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      aU[i] = Math.random()
      aLane[i] = (Math.random() * 2 - 1) * (0.35 + Math.random() * 0.65)
      aSpeed[i] = 0.5 + Math.random()
      aSize[i] = 1.1 + Math.random() * 2.3
      aShade[i] = Math.random()
      aScatter[i * 3] = Math.random() * 2 - 1
      aScatter[i * 3 + 1] = Math.random() * 2 - 1
      aScatter[i * 3 + 2] = Math.random() * 2 - 1
    }
    const geo = new BufferGeometry()
    // three needs a position attribute even though the shader derives its own
    geo.setAttribute("position", new BufferAttribute(new Float32Array(count * 3), 3))
    geo.setAttribute("aU", new BufferAttribute(aU, 1))
    geo.setAttribute("aLane", new BufferAttribute(aLane, 1))
    geo.setAttribute("aSpeed", new BufferAttribute(aSpeed, 1))
    geo.setAttribute("aSize", new BufferAttribute(aSize, 1))
    geo.setAttribute("aShade", new BufferAttribute(aShade, 1))
    geo.setAttribute("aScatter", new BufferAttribute(aScatter, 3))

    const uniforms = {
      uTime: { value: reduced ? 14 : 0 },
      uScroll: { value: 0 },
      uPointer: { value: { x: 99, y: 99 } },
      uPixelRatio: { value: 1 },
      uColorA: { value: new Color(golds().a) },
      uColorB: { value: new Color(golds().b) },
    }

    const material = new ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: themeLight ? NormalBlending : AdditiveBlending,
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uScroll;
        uniform vec2 uPointer;
        uniform float uPixelRatio;
        attribute float aU;
        attribute float aLane;
        attribute float aSpeed;
        attribute float aSize;
        attribute float aShade;
        attribute vec3 aScatter;
        varying float vShade;
        varying float vAlpha;

        void main() {
          float u = fract(aU + uTime * 0.0084 * aSpeed);
          float env = sin(3.14159265 * u);

          // river state: layered waves inside a soft envelope
          float w1 = sin(u * 9.0 + uTime * 0.385 + aLane * 2.0);
          float w2 = sin(u * 4.2 - uTime * 0.224 + aLane * 5.0);
          vec3 river = vec3(
            mix(-2.7, 2.7, u),
            aLane * 0.42 * env + (w1 * 0.16 + w2 * 0.1) * env - 0.12,
            aScatter.z * 0.5
          );

          // dispersed state: slow drifting dust across the page
          vec3 dust = vec3(
            aScatter.x * 3.2,
            aScatter.y * 1.9 + sin(uTime * 0.084 * aSpeed + aU * 20.0) * 0.08,
            aScatter.z * 1.1
          );

          vec3 pos = mix(river, dust, uScroll);

          // barely-there deflection — a soft current change around the pointer
          vec2 d = pos.xy - uPointer;
          float dist = max(length(d), 0.0001);
          vec2 dir = d / dist;
          float infl = exp(-dist * 2.2);
          pos.xy += (vec2(-dir.y, dir.x) * 0.04 + dir * 0.01) * infl;

          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = aSize * uPixelRatio * (2.4 / -mv.z);

          float tw = 0.62 + 0.38 * sin(uTime * (1.2 + aSpeed) + aU * 43.0);
          float riverA = (0.2 + 0.8 * env) * tw;
          float dustA = 0.34 * tw;
          vAlpha = mix(riverA, dustA, uScroll);
          vShade = aShade;
        }
      `,
      fragmentShader: /* glsl */ `
        precision mediump float;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        varying float vShade;
        varying float vAlpha;

        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.06, d) * vAlpha;
          if (a < 0.012) discard;
          gl_FragColor = vec4(mix(uColorA, uColorB, vShade), a);
        }
      `,
    })

    scene.add(new Points(geo, material))

    const smooth = { x: 99, y: 99 }

    return {
      scene,
      camera,
      tick(t, p) {
        uniforms.uTime.value = t
        // extra-lazy pointer follow so the current shifts, never snaps
        const tx = p.x > 50 ? 99 : p.x * halfH * camera.aspect
        const ty = p.y > 50 ? 99 : p.y * halfH
        smooth.x += (tx - smooth.x) * 0.03
        smooth.y += (ty - smooth.y) * 0.03
        uniforms.uPointer.value.x = smooth.x
        uniforms.uPointer.value.y = smooth.y
      },
      setScroll(v) { uniforms.uScroll.value = v },
      resize(w, h, dpr) {
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        uniforms.uPixelRatio.value = dpr
      },
      dispose() { geo.dispose(); material.dispose() },
    }
  }

  /* logo — the bonsai mark assembled from drifting colored particles.
     Targets and colors are sampled from logo.png at runtime; the points
     gather from dust into the mark once the image has loaded.          */
  const buildLogo = () => {
    const scene = new Scene()
    const camera = new PerspectiveCamera(55, 1, 0.1, 10)
    camera.position.z = 2.2
    const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z

    let geo = null
    let material = null
    let disposed = false
    let formStart = null
    const view = { w: 1, h: 1, dpr: 1 }

    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPointer: { value: { x: 99, y: 99 } },
      uPixelRatio: { value: 1 },
      uForm: { value: reduced ? 1 : 0 },
      uOffset: { value: { x: 0, y: 0 } },
      uScale: { value: 1.5 },
      uDim: { value: 1 },
    }

    const applyLayout = () => {
      const aspect = view.w / view.h
      if (aspect > 0.9) {
        uniforms.uOffset.value.x = halfH * aspect * 0.45
        uniforms.uOffset.value.y = 0
        uniforms.uScale.value = 1.5
        uniforms.uDim.value = 1
      } else {
        // narrow screens: a quiet watermark behind the hero copy
        uniforms.uOffset.value.x = 0
        uniforms.uOffset.value.y = 0.12
        uniforms.uScale.value = Math.min(halfH * aspect * 1.9, 1.1)
        uniforms.uDim.value = 0.3
      }
    }

    const img = new Image()
    img.decoding = "async"
    img.src = asset("logo.png")
    img.onload = () => {
      if (disposed) return
      const S = 140
      const cv = document.createElement("canvas")
      cv.width = S
      cv.height = S
      const cx = cv.getContext("2d", { willReadFrequently: true })
      const s = Math.min(S / img.width, S / img.height)
      cx.drawImage(img, (S - img.width * s) / 2, (S - img.height * s) / 2, img.width * s, img.height * s)
      const data = cx.getImageData(0, 0, S, S).data

      const px = []
      for (let y = 0; y < S; y++) {
        for (let x = 0; x < S; x++) {
          const i = (y * S + x) * 4
          if (data[i + 3] > 120) px.push(i)
        }
      }
      const MAX = reduced ? 3000 : 7000
      const keep = Math.min(1, MAX / px.length)
      const chosen = px.filter(() => Math.random() < keep)
      const n = chosen.length

      const aTarget = new Float32Array(n * 3)
      const aScatter = new Float32Array(n * 3)
      const aColor = new Float32Array(n * 3)
      const aSeed = new Float32Array(n)
      const aSize = new Float32Array(n)
      for (let j = 0; j < n; j++) {
        const i = chosen[j]
        const p = i / 4
        aTarget[j * 3] = (p % S) / S - 0.5
        aTarget[j * 3 + 1] = 0.5 - Math.floor(p / S) / S
        aTarget[j * 3 + 2] = (Math.random() - 0.5) * 0.08
        aScatter[j * 3] = (Math.random() * 2 - 1) * 1.6
        aScatter[j * 3 + 1] = (Math.random() * 2 - 1) * 1.1
        aScatter[j * 3 + 2] = (Math.random() - 0.5) * 0.8
        const tint = 0.88 + Math.random() * 0.24
        aColor[j * 3] = Math.min(1, (data[i] / 255) * tint)
        aColor[j * 3 + 1] = Math.min(1, (data[i + 1] / 255) * tint)
        aColor[j * 3 + 2] = Math.min(1, (data[i + 2] / 255) * tint)
        aSeed[j] = Math.random()
        aSize[j] = 1.7 + Math.random() * 1.9
      }

      geo = new BufferGeometry()
      geo.setAttribute("position", new BufferAttribute(new Float32Array(n * 3), 3))
      geo.setAttribute("aTarget", new BufferAttribute(aTarget, 3))
      geo.setAttribute("aScatter", new BufferAttribute(aScatter, 3))
      geo.setAttribute("aColor", new BufferAttribute(aColor, 3))
      geo.setAttribute("aSeed", new BufferAttribute(aSeed, 1))
      geo.setAttribute("aSize", new BufferAttribute(aSize, 1))

      material = new ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        vertexShader: /* glsl */ `
          uniform float uTime;
          uniform float uScroll;
          uniform vec2 uPointer;
          uniform float uPixelRatio;
          uniform float uForm;
          uniform vec2 uOffset;
          uniform float uScale;
          uniform float uDim;
          attribute vec3 aTarget;
          attribute vec3 aScatter;
          attribute vec3 aColor;
          attribute float aSeed;
          attribute float aSize;
          varying vec3 vColor;
          varying float vAlpha;

          void main() {
            vec3 target = vec3(aTarget.xy * uScale + uOffset, aTarget.z);

            // the pointer doesn't displace — it stirs: nearby particles
            // swing faster and on a wider radius
            float ex = exp(-max(length(target.xy - uPointer), 0.0001) * 2.4);

            vec2 hover = vec2(
              sin(uTime * (0.45 + aSeed * 0.6) + aSeed * 43.0),
              cos(uTime * (0.38 + aSeed * 0.5) + aSeed * 61.0)
            ) * 0.013;
            hover += vec2(
              sin(uTime * (2.6 + aSeed * 1.8) + aSeed * 91.0),
              cos(uTime * (2.2 + aSeed * 1.5) + aSeed * 57.0)
            ) * 0.035 * ex;
            target.xy += hover;

            vec3 scatter = vec3(aScatter.xy + uOffset, aScatter.z);

            // staggered, eased assembly from dust to mark
            float f = clamp(uForm * 1.35 - aSeed * 0.35, 0.0, 1.0);
            f = f * f * (3.0 - 2.0 * f);
            vec3 pos = mix(scatter, target, f);

            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = aSize * uPixelRatio * (2.4 / -mv.z);

            vAlpha = mix(0.18, 0.92, f) * (1.0 - uScroll * 0.5) * uDim;
            vColor = aColor;
          }
        `,
        fragmentShader: /* glsl */ `
          precision mediump float;
          varying vec3 vColor;
          varying float vAlpha;

          void main() {
            float d = length(gl_PointCoord - 0.5);
            float a = smoothstep(0.5, 0.12, d) * vAlpha;
            if (a < 0.015) discard;
            gl_FragColor = vec4(vColor, a);
          }
        `,
      })

      applyLayout()
      scene.add(new Points(geo, material))
      invalidate()
    }

    const smooth = { x: 99, y: 99 }

    return {
      scene,
      camera,
      tick(t, p) {
        uniforms.uTime.value = t
        if (geo && formStart === null) formStart = t
        if (!reduced && formStart !== null) {
          uniforms.uForm.value = Math.min(1, (t - formStart) / 4.5)
        }
        const tx = p.x > 50 ? 99 : p.x * halfH * camera.aspect
        const ty = p.y > 50 ? 99 : p.y * halfH
        smooth.x += (tx - smooth.x) * 0.025
        smooth.y += (ty - smooth.y) * 0.025
        uniforms.uPointer.value.x = smooth.x
        uniforms.uPointer.value.y = smooth.y
      },
      setScroll(v) { uniforms.uScroll.value = v },
      resize(w, h, dpr) {
        view.w = w
        view.h = h
        view.dpr = dpr
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        uniforms.uPixelRatio.value = dpr
        applyLayout()
      },
      dispose() {
        disposed = true
        geo?.dispose()
        material?.dispose()
      },
    }
  }

  const builders = {
    river: buildRiver,
    logo: buildLogo,
  }

  const resize = () => {
    const w = window.innerWidth
    const h = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6)
    renderer.setPixelRatio(dpr)
    renderer.setSize(w, h, false)
    current?.resize(w, h, dpr)
  }

  const renderStill = () => {
    current.tick(14, pointer)
    renderer.render(current.scene, current.camera)
  }
  invalidate = () => { if (reduced && current) renderStill() }

  const frame = (now) => {
    pointer.x += (pointer.tx - pointer.x) * 0.06
    pointer.y += (pointer.ty - pointer.y) * 0.06
    current.tick((now - start) / 1000, pointer)
    renderer.render(current.scene, current.camera)
    raf = requestAnimationFrame(frame)
  }
  const play = () => { if (!raf && !document.hidden) raf = requestAnimationFrame(frame) }
  const stop = () => { cancelAnimationFrame(raf); raf = 0 }
  const onVis = () => (document.hidden ? stop() : play())
  const onPointer = (e) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1
    pointer.ty = -((e.clientY / window.innerHeight) * 2 - 1)
  }
  const onPointerOut = () => { pointer.tx = 99; pointer.ty = 99 }

  const setMode = (key) => {
    currentKey = key
    current?.dispose()
    current = (builders[key] || buildRiver)()
    resize()
    current.setScroll(scroll)
    if (reduced) renderStill()
  }
  setMode(bgMode.value)

  window.addEventListener("resize", resize)
  if (!reduced) {
    window.addEventListener("pointermove", onPointer, { passive: true })
    window.addEventListener("pointerleave", onPointerOut)
    document.addEventListener("visibilitychange", onVis)
    play()
  }

  return {
    setMode,
    setTheme(light) {
      themeLight = light
      setMode(currentKey) // rebuild the scene with theme-appropriate colors
    },
    setScroll(v) { scroll = v; current?.setScroll(v) },
    dispose() {
      stop()
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onPointer)
      window.removeEventListener("pointerleave", onPointerOut)
      document.removeEventListener("visibilitychange", onVis)
      current?.dispose()
      renderer.dispose()
    },
  }
}

/* ── magnetic buttons (fine pointers only) ── */
function initMagnetic() {
  if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {}
  const els = rootEl.value.querySelectorAll(".v4-magnetic")
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
  gsap.registerPlugin(ScrollTrigger)

  try {
    const saved = localStorage.getItem("katsumii-v4-bg")
    if (BG_OPTIONS.some((o) => o.key === saved)) bgMode.value = saved
    const savedTheme = localStorage.getItem("katsumii-v4-theme")
    if (savedTheme === "light" || savedTheme === "dark") theme.value = savedTheme
  } catch { /* private mode */ }

  glApi = initGL(theme.value === "light")
  if (glApi) cleanups.push(glApi.dispose)
  cleanups.push(initMagnetic())

  const reduced = prefersReducedMotion()

  gsapCtx = gsap.context(() => {
    /* scroll → background state (river disperses, veils dim) */
    if (glApi && !reduced) {
      ScrollTrigger.create({
        start: 0,
        end: () => window.innerHeight * 1.4,
        onUpdate: (self) => glApi.setScroll(self.progress),
      })
    } else if (glApi) {
      glApi.setScroll(0.35)
    }

    /* top progress hairline */
    gsap.to(progressEl.value, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    })

    /* nav gains a floor once you leave the hero */
    ScrollTrigger.create({
      start: 60,
      onEnter: () => navEl.value?.classList.add("scrolled"),
      onLeaveBack: () => navEl.value?.classList.remove("scrolled"),
    })

    if (reduced) {
      gsap.set(".v4-load, .v4-hline-in, .v4-reveal", { clearProps: "all", opacity: 1 })
      rootEl.value.querySelectorAll("[data-count]").forEach((el) => {
        el.textContent = el.dataset.count
      })
      return
    }

    /* hero entrance */
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } })
    intro
      .fromTo(".v4-load-h1a", { yPercent: 112 }, { yPercent: 0, duration: 1.0 }, 0.15)
      .fromTo(".v4-load-h1b", { yPercent: 112 }, { yPercent: 0, duration: 1.0 }, 0.28)
      .fromTo(".v4-load-1", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.1)
      .fromTo(".v4-load-2", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.55)
      .fromTo(".v4-load-3", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.7)
      .fromTo(".v4-load-4", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.0 }, 1.1)

    /* generic reveals */
    gsap.utils.toArray(".v4-reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1, y: 0, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        }
      )
    })

    /* count-up numbers */
    gsap.utils.toArray("[data-count]").forEach((el) => {
      const target = Number(el.dataset.count)
      gsap.fromTo(
        el,
        { textContent: 0 },
        {
          textContent: target, duration: 1.4, ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      )
    })

    /* pinned story — desktop only */
    ScrollTrigger.matchMedia({
      "(min-width: 901px)": () => {
        storyTrigger = ScrollTrigger.create({
          trigger: storyPinEl.value,
          start: "top top",
          end: () => `+=${window.innerHeight * (slides.length - 1) * 1.1}`,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const i = Math.min(slides.length - 1, Math.floor(self.progress * slides.length))
            if (activeStory.value !== i) activeStory.value = i
          },
        })
        return () => {
          storyTrigger?.kill()
          storyTrigger = null
        }
      },
    })
  }, rootEl.value)
})

onBeforeUnmount(() => {
  gsapCtx?.revert()
  gsapCtx = null
  storyTrigger = null
  glApi = null
  cleanups.forEach((off) => off && off())
  cleanups = []
})
</script>

<style scoped>
/* ════ v4 tokens — "Living Data": warm ink + ember gold ════ */
.v4 {
  --v4-bg: #0b0a08;
  --v4-bg-soft: #14110c;
  --v4-panel: rgba(36, 29, 19, 0.42);
  --v4-line: rgba(244, 239, 230, 0.08);
  --v4-line-strong: rgba(232, 163, 61, 0.3);
  --v4-ink: #f4efe6;
  --v4-muted: #a99f8c;
  --v4-faint: #6f6759;
  --v4-gold: #e8a33d;
  --v4-gold-hi: #ffd9a0;
  --v4-ember: #ff7847;
  --v4-display: "DM Sans", "Manrope", sans-serif;
  --v4-body: "Manrope", "Segoe UI", sans-serif;
  --v4-mono: "DM Mono", ui-monospace, monospace;

  position: relative;
  min-height: 100vh;
  background:
    radial-gradient(ellipse 85% 55% at 65% -8%, rgba(232, 163, 61, 0.09), transparent 62%),
    radial-gradient(ellipse 55% 45% at 6% 42%, rgba(255, 120, 71, 0.045), transparent 60%),
    var(--v4-bg);
  color: var(--v4-ink);
  font-family: var(--v4-body);
  font-size: 1.0625rem;
  line-height: 1.65;
  overflow-x: clip;
}
.v4 ::selection { background: rgba(232, 163, 61, 0.32); color: var(--v4-ink); }

/* ── light theme ── */
.v4.light {
  --v4-bg: #f6f1e7;
  --v4-bg-soft: #efe7d6;
  --v4-panel: rgba(255, 252, 245, 0.65);
  --v4-line: rgba(32, 26, 18, 0.11);
  --v4-line-strong: rgba(168, 105, 15, 0.38);
  --v4-ink: #221b12;
  --v4-muted: #6d6353;
  --v4-faint: #97896f;
  --v4-gold: #a8690f;
  --v4-gold-hi: #7c4d08;
  --v4-ember: #d4531d;
  background:
    radial-gradient(ellipse 85% 55% at 65% -8%, rgba(232, 163, 61, 0.16), transparent 62%),
    radial-gradient(ellipse 55% 45% at 6% 42%, rgba(255, 120, 71, 0.07), transparent 60%),
    var(--v4-bg);
}
.v4.light .v4-noise { opacity: 0.04; }
.v4.light .v4-nav.scrolled { background: rgba(246, 241, 231, 0.82); }
.v4.light .v4-bgswitch { background: rgba(246, 241, 231, 0.78); }
.v4.light .v4-btn { color: #fff8ec; }
.v4.light .v4-bgswitch button.active { color: #fff8ec; }
.v4.light .v4-card {
  background: linear-gradient(165deg, rgba(255, 252, 245, 0.72), rgba(246, 241, 231, 0.4));
}
.v4.light .v4-story-shot,
.v4.light .v4-stack-frame {
  box-shadow: 0 30px 70px -32px rgba(70, 50, 20, 0.45), 0 0 50px -24px rgba(168, 105, 15, 0.18);
}

/* fixed WebGL stage behind everything */
.v4-gl {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
.v4 main, .v4-footer { position: relative; z-index: 1; }

.v4-noise {
  position: fixed;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.v4-progress {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 2px;
  z-index: 40;
  pointer-events: none;
}
.v4-progress span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--v4-gold), var(--v4-gold-hi));
  transform: scaleX(0);
  transform-origin: left;
}

/* ── background switcher ── */
.v4-bgswitch {
  position: fixed;
  right: 1.1rem;
  bottom: 1.1rem;
  z-index: 25;
  display: flex;
  align-items: center;
  gap: 0.1rem;
  padding: 0.28rem 0.4rem;
  border: 1px solid var(--v4-line);
  border-radius: 999px;
  background: rgba(11, 10, 8, 0.62);
  backdrop-filter: blur(10px);
}
.v4-bgswitch button {
  border: 0;
  background: none;
  cursor: pointer;
  font-family: var(--v4-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--v4-faint);
  padding: 0.38rem 0.65rem;
  border-radius: 999px;
  transition: color 0.25s ease, background-color 0.25s ease;
}
.v4-bgswitch button:hover { color: var(--v4-ink); }
.v4-bgswitch button.active { color: #161005; background: var(--v4-gold); }

/* ── nav ── */
.v4-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0.9rem clamp(1.1rem, 4vw, 3rem);
  transition: background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease;
  border-bottom: 1px solid transparent;
}
.v4-nav.scrolled {
  background: rgba(11, 10, 8, 0.72);
  backdrop-filter: blur(14px);
  border-bottom-color: var(--v4-line);
}
.v4-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--v4-ink);
  text-decoration: none;
  font-family: var(--v4-display);
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.01em;
}
.v4-brand img { border-radius: 8px; }
.v4-nav-links {
  display: flex;
  gap: 1.6rem;
  margin-inline: auto;
}
.v4-nav-links a {
  color: var(--v4-muted);
  text-decoration: none;
  font-family: var(--v4-mono);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: color 0.25s ease;
}
.v4-nav-links a:hover, .v4-nav-links a:focus-visible { color: var(--v4-gold-hi); }
.v4-nav-right { display: flex; align-items: center; gap: 1.1rem; margin-left: auto; }
.v4-nav-ghost {
  color: var(--v4-faint);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.25s ease;
}
.v4-nav-ghost:hover, .v4-nav-ghost:focus-visible { color: var(--v4-ink); }
.v4-theme {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: 1px solid var(--v4-line);
  border-radius: 999px;
  background: none;
  color: var(--v4-muted);
  cursor: pointer;
  transition: color 0.25s ease, border-color 0.25s ease;
}
.v4-theme svg { width: 17px; height: 17px; }
.v4-theme:hover, .v4-theme:focus-visible {
  color: var(--v4-gold);
  border-color: var(--v4-line-strong);
}

/* ── buttons ── */
.v4-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.85rem 1.7rem;
  border-radius: 999px;
  background: var(--v4-gold);
  color: #161005;
  font-family: var(--v4-display);
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.01em;
  text-decoration: none;
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 0 0 0 rgba(232, 163, 61, 0);
  will-change: transform;
}
.v4-btn:hover, .v4-btn:focus-visible {
  background: var(--v4-gold-hi);
  box-shadow: 0 8px 34px -8px rgba(232, 163, 61, 0.55);
}
.v4-btn-sm { padding: 0.55rem 1.15rem; font-size: 0.85rem; }
.v4-btn-lg { padding: 1.05rem 2.2rem; font-size: 1.05rem; }
.v4-quiet {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--v4-muted);
  text-decoration: none;
  font-size: 0.95rem;
  padding: 0.85rem 0.4rem;
  transition: color 0.25s ease;
  will-change: transform;
}
.v4-quiet:hover, .v4-quiet:focus-visible { color: var(--v4-gold-hi); }
.v4 a:focus-visible, .v4 button:focus-visible {
  outline: 2px solid var(--v4-gold);
  outline-offset: 3px;
  border-radius: 4px;
}

/* ── shared type ── */
.v4-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--v4-mono);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--v4-gold);
}
.v4-eyebrow i {
  width: 22px;
  height: 1px;
  background: var(--v4-gold);
  opacity: 0.7;
}
.v4-h1 {
  font-family: var(--v4-display);
  font-weight: 700;
  font-size: clamp(2.9rem, 8.4vw, 6.4rem);
  line-height: 1.02;
  letter-spacing: -0.035em;
  margin: 1.4rem 0 1.6rem;
}
.v4-h1 em, .v4-h2 em, .v4-local-lines em, .v4-cta-title em {
  font-style: italic;
  font-weight: 600;
  color: var(--v4-gold-hi);
}
.v4-dot { color: var(--v4-ember); font-style: normal; }
.v4-hline { display: block; overflow: hidden; }
.v4-hline-in { display: block; will-change: transform; }
.v4-h2 {
  font-family: var(--v4-display);
  font-weight: 700;
  font-size: clamp(1.9rem, 4.4vw, 3.3rem);
  line-height: 1.08;
  letter-spacing: -0.025em;
  margin: 1rem 0 0;
}
.v4-section-head { max-width: 1240px; margin: 0 auto; padding: 0 clamp(1.1rem, 4vw, 3rem); }

/* ── hero ── */
.v4-hero {
  position: relative;
  z-index: 1;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(6rem, 16vh, 9rem) clamp(1.1rem, 4vw, 3rem) 4rem;
}
.v4-hero-inner { max-width: 1240px; margin: 0 auto; width: 100%; }
.v4-hero-sub {
  max-width: 34rem;
  color: var(--v4-muted);
  font-size: clamp(1rem, 1.4vw, 1.15rem);
}
.v4-hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.4rem;
  margin-top: 2.4rem;
}
.v4-hero-hint {
  position: absolute;
  bottom: 1.6rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--v4-mono);
  font-size: 0.7rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--v4-faint);
}
.v4-hero-hint span {
  width: 1px;
  height: 44px;
  background: linear-gradient(to bottom, transparent, var(--v4-gold));
  animation: v4-drip 2.2s ease-in-out infinite;
}
@keyframes v4-drip {
  0% { transform: scaleY(0); transform-origin: top; }
  45% { transform: scaleY(1); transform-origin: top; }
  55% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

/* ── marquee ── */
.v4-marquee {
  position: relative;
  z-index: 1;
  overflow: hidden;
  border-block: 1px solid var(--v4-line);
  padding: 0.85rem 0;
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}
.v4-marquee-track {
  display: flex;
  width: max-content;
  animation: v4-marquee 36s linear infinite;
}
.v4-marquee-seq {
  white-space: nowrap;
  font-family: var(--v4-mono);
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--v4-faint);
  padding-right: 0.6rem;
}
.v4-marquee-seq i { color: var(--v4-gold); font-style: normal; padding: 0 0.5rem; }
@keyframes v4-marquee { to { transform: translateX(-50%); } }

/* ── numbers ── */
.v4-numbers {
  position: relative;
  z-index: 1;
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(4rem, 9vh, 6.5rem) clamp(1.1rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.v4-num { display: flex; flex-direction: column; gap: 0.4rem; }
.v4-num-val {
  font-family: var(--v4-mono);
  font-size: clamp(2.1rem, 4.4vw, 3.3rem);
  color: var(--v4-ink);
  line-height: 1;
}
.v4-num-val i { color: var(--v4-gold); font-style: normal; }
.v4-num-label {
  font-family: var(--v4-mono);
  font-size: 0.74rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--v4-faint);
}

/* ── story (pinned) ── */
.v4-story { position: relative; z-index: 1; }
.v4-story-pin {
  min-height: 100vh;
  max-width: 1500px;
  margin: 0 auto;
  padding: clamp(4rem, 10vh, 6rem) clamp(1.1rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: minmax(320px, 5fr) 7fr;
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: center;
}
.v4-story-steps { position: relative; margin-top: 2.6rem; min-height: 11rem; }
.v4-story-step {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.45s ease, transform 0.45s ease;
  pointer-events: none;
}
.v4-story-step.active { opacity: 1; transform: none; }
.v4-story-num {
  font-family: var(--v4-mono);
  font-size: 0.78rem;
  color: var(--v4-ember);
  letter-spacing: 0.16em;
}
.v4-story-step h3 {
  font-family: var(--v4-display);
  font-weight: 700;
  font-size: 1.45rem;
  letter-spacing: -0.015em;
  margin: 0.5rem 0 0.7rem;
}
.v4-story-step h3 em, .v4-stack-item strong em {
  font-style: italic;
  font-weight: 500;
  color: var(--v4-gold);
  font-size: 0.9em;
}
.v4-story-step p { color: var(--v4-muted); max-width: 26rem; margin: 0; }
.v4-story-dots { display: flex; gap: 0.6rem; margin-top: 2.2rem; }
.v4-story-dots button {
  width: 30px;
  height: 4px;
  border: 0;
  border-radius: 2px;
  background: var(--v4-line);
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.v4-story-dots button.active { background: var(--v4-gold); }
.v4-story-stage { position: relative; aspect-ratio: 16 / 10; }
.v4-story-shot {
  position: absolute;
  inset: 0;
  margin: 0;
  opacity: 0;
  transform: scale(0.965);
  transition: opacity 0.55s ease, transform 0.55s ease;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--v4-line-strong);
  box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.8), 0 0 60px -20px rgba(232, 163, 61, 0.14);
  background: var(--v4-bg-soft);
}
.v4-story-shot.active { opacity: 1; transform: none; }
.v4-story-shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
  display: block;
}
.v4-story-stack { display: none; }

/* ── modes ── */
.v4-modes {
  position: relative;
  z-index: 1;
  padding: clamp(6rem, 14vh, 10rem) 0;
}
.v4-mode-list {
  max-width: 1240px;
  margin: 3.2rem auto 0;
  padding: 0 clamp(1.1rem, 4vw, 3rem);
}
.v4-mode { border-top: 1px solid var(--v4-line); }
.v4-mode:last-child { border-bottom: 1px solid var(--v4-line); }
.v4-mode-head {
  display: grid;
  grid-template-columns: 3.4rem 1fr auto 2.4rem;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1.5rem 0.2rem;
  background: none;
  border: 0;
  cursor: pointer;
  color: inherit;
  text-align: left;
  font: inherit;
}
.v4-mode-num {
  font-family: var(--v4-mono);
  font-size: 0.8rem;
  color: var(--v4-faint);
  transition: color 0.3s ease;
}
.v4-mode-name {
  font-family: var(--v4-display);
  font-weight: 700;
  font-size: clamp(1.5rem, 3.4vw, 2.4rem);
  letter-spacing: -0.02em;
  transition: color 0.3s ease, transform 0.35s ease;
}
.v4-mode-tag {
  font-family: var(--v4-mono);
  font-size: 0.74rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--v4-faint);
}
.v4-mode-ic {
  position: relative;
  width: 20px;
  height: 20px;
  justify-self: end;
}
.v4-mode-ic::before, .v4-mode-ic::after {
  content: "";
  position: absolute;
  inset: 50% auto auto 0;
  width: 100%;
  height: 1.5px;
  background: var(--v4-muted);
  transition: transform 0.35s ease, background-color 0.3s ease;
}
.v4-mode-ic::after { transform: rotate(90deg); }
.v4-mode.open .v4-mode-ic::after { transform: rotate(0deg); }
.v4-mode.open .v4-mode-ic::before, .v4-mode.open .v4-mode-ic::after { background: var(--v4-gold); }
.v4-mode-head:hover .v4-mode-name, .v4-mode-head:focus-visible .v4-mode-name,
.v4-mode.open .v4-mode-name { color: var(--v4-gold-hi); transform: translateX(6px); }
.v4-mode.open .v4-mode-num { color: var(--v4-ember); }
.v4-mode-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.5s cubic-bezier(0.65, 0, 0.35, 1);
}
.v4-mode-body-in { overflow: hidden; }
.v4-mode.open .v4-mode-body { grid-template-rows: 1fr; }
.v4-mode-line {
  font-family: var(--v4-display);
  font-style: italic;
  font-weight: 500;
  color: var(--v4-gold);
  font-size: 1.1rem;
  margin: 0 0 0.6rem;
  padding-left: 4.4rem;
}
.v4-mode-copy {
  color: var(--v4-muted);
  max-width: 38rem;
  margin: 0 0 1rem;
  padding-left: 4.4rem;
}
.v4-mode-body ul {
  list-style: none;
  margin: 0;
  padding: 0 0 1.8rem 4.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.v4-mode-body li {
  position: relative;
  padding-left: 1.3rem;
  color: var(--v4-muted);
  font-size: 0.95rem;
}
.v4-mode-body li::before {
  content: "—";
  position: absolute;
  left: 0;
  color: var(--v4-gold);
}

/* ── craft ── */
.v4-craft {
  position: relative;
  z-index: 1;
  padding: clamp(5rem, 12vh, 9rem) 0;
}
.v4-craft-grid {
  max-width: 1240px;
  margin: 3.2rem auto 0;
  padding: 0 clamp(1.1rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.1rem;
}
.v4-span-5 { grid-column: span 5; }
.v4-span-6 { grid-column: span 6; }
.v4-span-7 { grid-column: span 7; }
.v4-card {
  border: 1px solid var(--v4-line);
  border-radius: 16px;
  padding: 1.8rem 1.7rem 1.7rem;
  background: linear-gradient(165deg, var(--v4-panel), rgba(20, 17, 12, 0.24));
  transition: border-color 0.35s ease, transform 0.35s ease;
}
.v4-card:hover {
  border-color: var(--v4-line-strong);
  transform: translateY(-4px);
}
.v4-card-icon {
  display: inline-flex;
  width: 26px;
  height: 26px;
  color: var(--v4-gold);
  margin-bottom: 1.1rem;
}
.v4-card-icon :deep(svg) { width: 100%; height: 100%; }
.v4-card h3 {
  font-family: var(--v4-display);
  font-weight: 700;
  font-size: 1.18rem;
  letter-spacing: -0.01em;
  margin: 0 0 0.55rem;
}
.v4-card p { color: var(--v4-muted); font-size: 0.96rem; margin: 0; }
.v4-card-chips {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 1.1rem 0 0;
  padding: 0;
}
.v4-card-chips li {
  font-family: var(--v4-mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--v4-gold);
  border: 1px solid var(--v4-line-strong);
  border-radius: 999px;
  padding: 0.28rem 0.7rem;
}

/* ── local ── */
.v4-local {
  position: relative;
  z-index: 1;
  padding: clamp(6rem, 15vh, 11rem) clamp(1.1rem, 4vw, 3rem);
}
.v4-local-inner { max-width: 1240px; margin: 0 auto; }
.v4-local-lines {
  font-family: var(--v4-display);
  font-weight: 700;
  font-size: clamp(2.3rem, 6.4vw, 4.8rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin: 1.6rem 0 2rem;
}
.v4-local-lines span { display: block; }
.v4-local-copy { max-width: 36rem; color: var(--v4-muted); }
.v4-local-chips {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin: 2rem 0 0;
  padding: 0;
}
.v4-local-chips li {
  font-family: var(--v4-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--v4-muted);
  border: 1px solid var(--v4-line);
  border-radius: 999px;
  padding: 0.4rem 0.95rem;
}

/* ── cta ── */
.v4-cta {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: clamp(6rem, 16vh, 11rem) clamp(1.1rem, 4vw, 3rem) clamp(7rem, 18vh, 12rem);
}
.v4-cta-title {
  font-family: var(--v4-display);
  font-weight: 700;
  font-size: clamp(2.6rem, 7.4vw, 5.6rem);
  letter-spacing: -0.03em;
  line-height: 1.04;
  margin: 0 0 1.1rem;
}
.v4-cta-sub { color: var(--v4-muted); margin: 0 0 2.4rem; }
.v4-cta-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.6rem;
}

/* ── footer ── */
.v4-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 1240px;
  margin: 0 auto;
  padding: 2rem clamp(1.1rem, 4vw, 3rem) 2.6rem;
  border-top: 1px solid var(--v4-line);
  color: var(--v4-faint);
  font-size: 0.85rem;
}
.v4-footer p { margin: 0; }
.v4-footer nav { display: flex; gap: 1.4rem; }
.v4-footer a {
  color: var(--v4-faint);
  text-decoration: none;
  transition: color 0.25s ease;
}
.v4-footer a:hover, .v4-footer a:focus-visible { color: var(--v4-gold-hi); }

/* ── responsive ── */
@media (max-width: 1100px) {
  .v4-span-5, .v4-span-6, .v4-span-7 { grid-column: span 6; }
}
@media (max-width: 900px) {
  .v4-nav-links { display: none; }
  .v4-numbers { grid-template-columns: repeat(2, 1fr); gap: 2.2rem 1.2rem; }
  .v4-story-pin { display: none; }
  .v4-story-stack {
    display: flex;
    flex-direction: column;
    gap: 3.4rem;
    max-width: 1240px;
    margin: 0 auto;
    padding: clamp(4rem, 10vh, 6rem) clamp(1.1rem, 4vw, 3rem);
  }
  .v4-stack-item { margin: 0; }
  .v4-stack-frame {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--v4-line-strong);
    background: var(--v4-bg-soft);
    box-shadow: 0 24px 60px -28px rgba(0, 0, 0, 0.8);
  }
  .v4-stack-frame img { display: block; width: 100%; height: auto; }
  .v4-stack-item figcaption {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding-top: 1rem;
  }
  .v4-stack-item strong {
    font-family: var(--v4-display);
    font-size: 1.15rem;
    letter-spacing: -0.01em;
  }
  .v4-stack-item figcaption > span:last-child { color: var(--v4-muted); font-size: 0.95rem; }
  .v4-mode-head { grid-template-columns: 2.4rem 1fr 2rem; }
  .v4-mode-tag { display: none; }
  .v4-mode-line, .v4-mode-copy, .v4-mode-body ul { padding-left: 3.4rem; }
}
@media (max-width: 640px) {
  .v4-span-5, .v4-span-6, .v4-span-7 { grid-column: span 12; }
  .v4-hero { padding-bottom: 5.5rem; }
  .v4-nav-ghost { display: none; }
  .v4-mode-line, .v4-mode-copy, .v4-mode-body ul { padding-left: 0; }
  .v4-footer { flex-direction: column; align-items: flex-start; }
}

/* ── reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .v4-marquee-track { animation: none; }
  .v4-hero-hint span { animation: none; transform: none; }
  .v4-story-step, .v4-story-shot, .v4-mode-body,
  .v4-card, .v4-mode-name, .v4-mode-ic::before, .v4-mode-ic::after { transition: none; }
}
</style>
