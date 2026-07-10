<template>
  <div ref="rootEl" class="v5">
    <canvas ref="glEl" class="v5-gl" aria-hidden="true"></canvas>
    <div class="v5-grain" aria-hidden="true"></div>

    <div class="v5-bgswitch" role="group" aria-label="Background scene">
      <span class="v5-bgswitch-label" aria-hidden="true">garden</span>
      <button
        v-for="o in BG_OPTIONS" :key="o.key" type="button"
        :class="{ active: bgMode === o.key }" :aria-pressed="bgMode === o.key"
        @click="setBg(o.key)"
      >{{ o.label }}</button>
    </div>

    <!-- NAV -->
    <header ref="navEl" class="v5-nav">
      <a class="v5-brand" href="#top" @click.prevent="scrollToTop">
        <img :src="asset('logo.png')" alt="Katsumii bonsai logo" width="30" height="30" />
        <span>Katsumii</span>
      </a>
      <nav class="v5-nav-links" aria-label="Page sections">
        <a href="#garden">The garden</a>
        <a href="#modes">Modes</a>
        <a href="#practice">Practice</a>
        <a href="#local">Local</a>
      </nav>
      <div class="v5-nav-right">
        <RouterLink class="v5-nav-ghost" to="/en/app">Classic site</RouterLink>
        <RouterLink class="v5-btn v5-btn-sm v5-magnetic" to="/en/pricing">Get Katsumii</RouterLink>
      </div>
    </header>

    <main id="top">
      <!-- HERO -->
      <section class="v5-hero">
        <div class="v5-hero-copy">
          <p class="v5-eyebrow v5-load v5-load-1">
            <span class="v5-seal v5-seal-sm" aria-hidden="true">勝</span>
            Katsumii — a local offline trading journal
          </p>
          <h1 class="v5-h1">
            <span class="v5-hline"><span class="v5-hline-in v5-load-h1a">Trade with</span></span>
            <span class="v5-hline"><span class="v5-hline-in v5-load-h1b">a <em>quiet</em> mind.</span></span>
          </h1>
          <p class="v5-hero-sub v5-load v5-load-2">
            Katsumii is the calm home for your trading — a journal and
            prop-firm cockpit that lives on your machine, keeps every rule
            in sight, and lets your edge grow like a well-kept tree.
          </p>
          <div class="v5-hero-actions v5-load v5-load-3">
            <RouterLink to="/en/pricing" class="v5-btn v5-magnetic">Begin your practice <span aria-hidden="true">→</span></RouterLink>
            <a href="#garden" class="v5-quiet v5-magnetic">Walk the garden <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div class="v5-hero-tree v5-load v5-load-tree" aria-hidden="true">
          <svg ref="ensoEl" class="v5-enso" viewBox="0 0 200 200" fill="none">
            <circle
              ref="ensoPathEl" cx="100" cy="100" r="88"
              pathLength="100" stroke-linecap="round"
              transform="rotate(-64 100 100)"
            />
          </svg>
          <div class="v5-tree-float">
            <img :src="asset('logo.png')" alt="" width="380" height="380" decoding="async" />
          </div>
          <div class="v5-tree-ground"></div>
        </div>

        <p class="v5-hero-hint v5-load v5-load-4" aria-hidden="true"><span></span>scroll slowly</p>
      </section>

      <!-- FACTS -->
      <section class="v5-facts v5-reveal" aria-label="Katsumii in numbers">
        <span v-for="(f, i) in facts" :key="f">
          {{ f }}<i v-if="i < facts.length - 1" aria-hidden="true">·</i>
        </span>
      </section>

      <!-- MANIFESTO -->
      <section class="v5-manifesto">
        <span class="v5-ghost" aria-hidden="true">静</span>
        <p class="v5-eyebrow v5-reveal"><i></i>Why a bonsai</p>
        <p class="v5-manifesto-lines">
          <span class="v5-reveal">Most trading software shouts.</span>
          <span class="v5-reveal">Katsumii is the room that stays quiet —</span>
          <span class="v5-reveal">so you can hear <em>your own edge</em>.</span>
        </p>
        <p class="v5-manifesto-copy v5-reveal">
          The name comes from the bonsai on our mark: patient, deliberate,
          shaped by small honest corrections. Your journal works the same
          way. Log the trade, keep the rules in sight, prune what doesn't
          pay — and let the good branches grow.
        </p>
      </section>

      <!-- GARDEN / SCREENS -->
      <section id="garden" class="v5-garden">
        <div class="v5-section-head">
          <p class="v5-eyebrow v5-reveal"><i></i>Walk the garden</p>
          <h2 class="v5-h2 v5-reveal">Four rooms,<br />one quiet practice.</h2>
        </div>
        <div ref="roomsEl" class="v5-rooms">
          <figure v-for="(r, i) in rooms" :key="r.title" class="v5-room">
            <div class="v5-room-card">
              <figcaption class="v5-room-cap">
                <span class="v5-room-num" aria-hidden="true">0{{ i + 1 }}</span>
                <strong>{{ r.title }}</strong>
                <em>{{ r.tag }}</em>
                <span class="v5-room-note">{{ r.caption }}</span>
              </figcaption>
              <div class="v5-room-frame">
                <img
                  :src="asset(r.img)" :alt="r.alt" :width="r.w" :height="r.h"
                  :loading="i === 0 ? 'eager' : 'lazy'" decoding="async"
                />
              </div>
            </div>
          </figure>
        </div>
      </section>

      <!-- MODES / BYOBU -->
      <section id="modes" class="v5-modes">
        <div class="v5-section-head">
          <p class="v5-eyebrow v5-reveal"><i></i>Four gardens</p>
          <h2 class="v5-h2 v5-reveal">Every way you trade,<br />kept apart — and in order.</h2>
        </div>
        <div class="v5-folds v5-reveal">
          <article
            v-for="(g, i) in gardens" :key="g.name"
            class="v5-fold" :class="{ open: i === openFold }"
            :style="{ '--fold-dot': g.dot }"
          >
            <button
              type="button" class="v5-fold-head"
              :aria-expanded="i === openFold" :aria-controls="`v5-fold-${i}`"
              @click="openFold = openFold === i ? -1 : i"
            >
              <span class="v5-fold-num" aria-hidden="true">0{{ i + 1 }}</span>
              <span class="v5-fold-name">{{ g.name }}</span>
              <span class="v5-fold-dot" aria-hidden="true"></span>
            </button>
            <div :id="`v5-fold-${i}`" class="v5-fold-body">
              <div class="v5-fold-body-in">
                <p class="v5-fold-tag">{{ g.tag }}</p>
                <h3>{{ g.headline }}</h3>
                <p class="v5-fold-copy">{{ g.copy }}</p>
                <ul>
                  <li v-for="p in g.points" :key="p">{{ p }}</li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- PRACTICE / FEATURES -->
      <section id="practice" class="v5-practice">
        <div class="v5-section-head">
          <p class="v5-eyebrow v5-reveal"><i></i>The daily practice</p>
          <h2 class="v5-h2 v5-reveal">Everything a serious<br />journal should carry.</h2>
        </div>
        <div class="v5-practice-grid">
          <article v-for="f in practices" :key="f.title" :class="['v5-card', 'v5-reveal', f.span]">
            <h3>{{ f.title }}</h3>
            <p>{{ f.copy }}</p>
            <ul v-if="f.chips" class="v5-card-chips">
              <li v-for="c in f.chips" :key="c">{{ c }}</li>
            </ul>
          </article>
        </div>
      </section>

      <!-- LOCAL OFFLINE -->
      <section id="local" class="v5-local">
        <div class="v5-local-inner">
          <span ref="sealEl" class="v5-seal v5-seal-lg" aria-hidden="true">勝</span>
          <p class="v5-eyebrow v5-eyebrow-light v5-reveal"><i></i>Local and offline, always</p>
          <p class="v5-local-lines">
            <span class="v5-reveal">Your trades</span>
            <span class="v5-reveal">never leave <em>home</em>.</span>
          </p>
          <p class="v5-local-copy v5-reveal">
            Katsumii writes to a single SQLite file on your machine. Backups
            run on your schedule, exports are one click away, and reports
            open offline. No cloud. No account. No one reading over your
            shoulder.
          </p>
          <ul class="v5-local-chips v5-reveal">
            <li>SQLite on your disk</li>
            <li>Automatic backups</li>
            <li>Offline HTML reports</li>
            <li>CSV export anytime</li>
          </ul>
        </div>
      </section>

      <!-- CTA -->
      <section class="v5-cta">
        <h2 class="v5-cta-title v5-reveal">Begin your <em>practice</em>.</h2>
        <p class="v5-cta-sub v5-reveal">One quiet app, on your machine, for every trade you take.</p>
        <div class="v5-cta-actions v5-reveal">
          <RouterLink to="/en/pricing" class="v5-btn v5-btn-lg v5-magnetic">Get Katsumii <span aria-hidden="true">→</span></RouterLink>
          <RouterLink to="/en/app" class="v5-quiet">or explore the classic site</RouterLink>
        </div>
      </section>
    </main>

    <footer class="v5-footer">
      <p>© {{ year }} Katsumii — grown with patience</p>
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
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector4,
  WebGLRenderer,
} from "three"

const baseUrl = import.meta.env.BASE_URL
const asset = (path) => `${baseUrl}${path}`
const year = new Date().getFullYear()

const rootEl = ref(null)
const glEl = ref(null)
const navEl = ref(null)
const ensoEl = ref(null)
const ensoPathEl = ref(null)
const sealEl = ref(null)
const roomsEl = ref(null)
const openFold = ref(0)

const BG_OPTIONS = [
  { key: "sand", label: "Sand" },
  { key: "ink", label: "Ink" },
  { key: "pond", label: "Pond" },
  { key: "light", label: "Light" },
]
const bgMode = ref("sand")
let glApi = null

const setBg = (key) => {
  if (bgMode.value === key) return
  bgMode.value = key
  try { localStorage.setItem("katsumii-v5-bg", key) } catch { /* private mode */ }
  glApi?.setMode(key)
}

const facts = ["4 trading modes", "100 % local data", "6 built-in tools", "4 sync providers"]

const rooms = [
  {
    img: "Dashboard_dark.png", w: 2559, h: 1599,
    alt: "Katsumii dashboard with net P&L hero, execution quality and equity curve",
    title: "Dashboard", tag: "the whole season",
    caption: "Net P&L, execution quality, edge drivers and your equity curve — one calm screen that carries the story.",
  },
  {
    img: "Calendar_dark.png", w: 2532, h: 1332,
    alt: "Katsumii calendar with color-graded trading days and weekly summaries",
    title: "Calendar", tag: "days as leaves",
    caption: "Every day graded by outcome, weeks summarized in the margins, journal marks where you paused to reflect.",
  },
  {
    img: "Stats_dark.png", w: 1654, h: 1599,
    alt: "Katsumii analysis view with weekday, session and strategy breakdowns",
    title: "Analysis", tag: "what grows, what doesn't",
    caption: "Slice performance by weekday, session, strategy, emotion or mistake — see what deserves water, and what needs pruning.",
  },
  {
    img: "Main_dark.png", w: 2559, h: 1599,
    alt: "Katsumii account overview with balance, drawdown distance and billing state",
    title: "Accounts", tag: "the fence line",
    caption: "Drawdown distance, winning days, payouts and rebill dates per account — the rules, always in sight.",
  },
]

const gardens = [
  {
    name: "Funded", tag: "Live prop capital", dot: "#3f7268",
    headline: "Guarded, every session.",
    copy: "Your funded accounts on one board — with the rules that keep them alive always in sight.",
    points: [
      "Distance to daily and max loss limits, per account",
      "Payout history, winning days and consistency tracking",
      "Rebill dates, billing state and account health at a glance",
    ],
  },
  {
    name: "Challenge", tag: "Evaluations & combines", dot: "#a8842f",
    headline: "Pass with proof.",
    copy: "Every evaluation tracked from first trade to funded — targets, minimum days, and the moment you convert.",
    points: [
      "Profit target and minimum-days progress",
      "Pass / fail state with the full trade history behind it",
      "One step to convert a passed challenge into a funded account",
    ],
  },
  {
    name: "Personal", tag: "Your own capital", dot: "#5b6b8f",
    headline: "Same discipline, your money.",
    copy: "Personal accounts get the same cockpit — daily goals, personal loss limits and streaks that keep you honest.",
    points: [
      "Personal daily loss limits and daily goals",
      "Day and trade streaks across your accounts",
      "Fully siloed from prop data — clean statistics",
    ],
  },
  {
    name: "Backtest", tag: "Sessions, not accounts", dot: "#8a6752",
    headline: "Rehearse the edge.",
    copy: "Import FXReplay or CSV sessions, attach a hypothesis, and review backtests with the same analytics as live trading.",
    points: [
      "FXReplay and CSV imports into named sessions",
      "Hypothesis notes, session sparklines and win rates",
      "Compare strategies before risking a cent",
    ],
  },
]

const practices = [
  {
    title: "A quiet place to think",
    copy: "A rich-text daily journal with autosave, screenshots and per-day stats pinned to every entry. Your calendar remembers which days you reflected.",
    span: "v5-span-7",
    chips: ["Rich text", "Autosave", "Screenshots", "Day markers"],
  },
  {
    title: "Your history, in minutes",
    copy: "A CSV wizard with broker presets, FXReplay backtest imports, and live sync for MetaTrader 5, ProjectX, Capital.com and OANDA.",
    span: "v5-span-5",
    chips: ["CSV wizard", "FXReplay", "MT5", "ProjectX", "Capital.com", "OANDA"],
  },
  {
    title: "Rules that never sleep",
    copy: "Inactivity alerts before deadlines bite, corrections that keep balances honest, and copy groups for leader–follower accounts.",
    span: "v5-span-5",
  },
  {
    title: "One file, the whole story",
    copy: "Self-contained HTML performance reports — equity curve, calendar heatmap, breakdowns — that open offline and travel anywhere.",
    span: "v5-span-7",
    chips: ["Equity curve", "Heatmap", "Dark / light"],
  },
  {
    title: "Six small tools",
    copy: "R:R visualizer, position size calculator, equity simulator, timezone and currency converters, futures contract specs — built in.",
    span: "v5-span-6",
  },
  {
    title: "Slice by anything",
    copy: "Strategy, session, emotion, mistake, asset, timeframe, direction, tags — flip a filter and every metric recalculates instantly.",
    span: "v5-span-6",
  },
]

let gsapCtx = null
let cleanups = []

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

const scrollToTop = () => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })

/* ── WebGL backgrounds ───────────────────────────────────────────
   Four interchangeable fullscreen-quad shaders on one fixed canvas:
   sand  — raked zen-garden grooves; the cursor rakes its own rings
   ink   — sumi-e mist bleeding at the edges; the cursor parts it
   pond  — still water; ambient raindrop rings, the cursor adds its own
   light — komorebi: dappled sunlight and leaf shadow drifting by
   All of them move slowly on purpose. uPointer is heavily smoothed
   so nothing ever snaps.                                          */

const NOISE_GLSL = /* glsl */ `
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  vec2 grad(vec2 p) {
    float a = hash(p) * 6.2831853;
    return vec2(cos(a), sin(a));
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(grad(i), f), dot(grad(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(grad(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(grad(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y
    ) * 0.5 + 0.5;
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
    for (int i = 0; i < 4; i++) { v += a * noise(p); p = rot * p * 2.03 + vec2(1.7, 9.2); a *= 0.5; }
    return v;
  }
`

const QUAD_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`

/* raked sand — long grooves bent by a soft mound under the cursor */
const SAND_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uPointer;
  uniform float uAspect;
  varying vec2 vUv;
  ${NOISE_GLSL}

  void main() {
    vec2 uv = vec2(vUv.x * uAspect, vUv.y);
    vec2 pt = vec2(uPointer.x * uAspect, uPointer.y);
    float t = uTime * 0.018;

    float warp = fbm(uv * 1.25 + vec2(t * 0.6, -t * 0.35));
    float h = uv.y * 24.0 + warp * 2.4;

    // two half-buried stones; the rake circles around them
    vec2 s1 = vec2(uAspect * 0.24, 0.66);
    vec2 s2 = vec2(uAspect * 0.76, 0.24);
    float d1 = distance(uv, s1);
    float d2 = distance(uv, s2);
    float dm = min(d1, d2);
    float rings = mix(d1, d2, step(d2, d1));
    float m = smoothstep(0.30, 0.08, dm);
    h = mix(h, rings * 24.0 + warp * 0.8, m);

    // the cursor rakes a slow circle of its own
    float pd = distance(uv, pt);
    float pm = smoothstep(0.26, 0.02, pd);
    h = mix(h, pd * 24.0 + warp * 0.6, pm * 0.85);

    float f = abs(fract(h) - 0.5);
    float w = fwidth(h);
    float line = smoothstep(w * 1.7, 0.0, f);

    // stone bodies as soft dark pebbles
    float stone = smoothstep(0.052, 0.028, d1) * 0.55 + smoothstep(0.040, 0.020, d2) * 0.55;

    vec3 col = vec3(0.36, 0.36, 0.30);
    float alpha = line * 0.085 * (1.0 - uScroll * 0.45) + stone * 0.16;

    float vig = smoothstep(0.0, 0.16, vUv.y) * smoothstep(1.0, 0.86, vUv.y);
    alpha *= 0.55 + 0.45 * vig;
    gl_FragColor = vec4(col, alpha);
  }
`

/* sumi-e mist — domain-warped veils, parted gently by the cursor */
const INK_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uPointer;
  uniform float uAspect;
  varying vec2 vUv;
  ${NOISE_GLSL}

  void main() {
    vec2 uv = vec2(vUv.x * uAspect, vUv.y);
    vec2 pt = vec2(uPointer.x * uAspect, uPointer.y);
    float t = uTime * 0.022;

    // the cursor pushes the mist aside, never abruptly
    vec2 away = uv - pt;
    float pd = max(length(away), 0.0001);
    uv += (away / pd) * exp(-pd * 2.6) * 0.10;

    vec2 q = vec2(fbm(uv * 1.1 + vec2(t, -t * 0.7)), fbm(uv * 1.1 + vec2(4.2 - t * 0.5, 1.3 + t)));
    float v = fbm(uv * 1.5 + q * 1.9 + vec2(t * 0.4, 0.0));

    float veil = smoothstep(0.34, 0.72, v);
    // heavier where the paper meets the sky — top edge and corners
    float edge = 1.0 - smoothstep(0.0, 0.62, distance(vUv, vec2(0.5, 0.4)));
    float body = smoothstep(0.7, 1.0, vUv.y) * 0.8 + edge * 0.7;

    vec3 col = vec3(0.20, 0.23, 0.19);
    float alpha = veil * (0.08 + body * 0.13) * (1.0 - uScroll * 0.4);
    gl_FragColor = vec4(col, alpha);
  }
`

/* still pond — ambient raindrop rings; the cursor lays rings of its own */
const POND_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uPointer;
  uniform float uAspect;
  uniform vec4 uRings[12];
  varying vec2 vUv;
  ${NOISE_GLSL}

  void main() {
    vec2 uv = vec2(vUv.x * uAspect, vUv.y);
    float t = uTime;

    // faint weave of light on the water
    float c = fbm(uv * 2.6 + vec2(t * 0.045, t * 0.028));
    float alpha = smoothstep(0.5, 0.88, c) * 0.085;
    vec3 col = vec3(0.22, 0.30, 0.28);

    for (int i = 0; i < 12; i++) {
      vec4 r = uRings[i];
      float age = t - r.z;
      if (r.w <= 0.0 || age < 0.0 || age > 11.0) continue;
      float rad = age * 0.055;
      float d = distance(uv, r.xy);
      float decay = exp(-age * 0.34) * smoothstep(0.0, 0.35, age) * r.w;
      float band  = smoothstep(0.022, 0.0, abs(d - rad));
      float band2 = smoothstep(0.015, 0.0, abs(d - rad * 0.62));
      alpha += (band * 0.75 + band2 * 0.45) * decay * 0.28;
    }

    alpha *= (1.0 - uScroll * 0.4);
    gl_FragColor = vec4(col, alpha);
  }
`

/* komorebi — sunlight through leaves, drifting across the paper */
const LIGHT_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uPointer;
  uniform float uAspect;
  varying vec2 vUv;
  ${NOISE_GLSL}

  void main() {
    vec2 uv = vec2(vUv.x * uAspect, vUv.y);
    vec2 pt = vec2(uPointer.x * uAspect, uPointer.y);
    float t = uTime * 0.02;

    // the whole canopy leans very slightly toward the cursor
    vec2 lean = (pt - vec2(uAspect * 0.5, 0.5)) * 0.05;
    vec2 p = uv - lean;

    float sun = fbm(p * 2.0 + vec2(t * 0.9, t * 0.5));
    float spots = smoothstep(0.46, 0.62, sun);
    float leaf = fbm(p * 3.1 - vec2(t * 0.6, t * 0.8) + 7.3);
    float shade = smoothstep(0.5, 0.68, leaf);

    vec3 warm = vec3(0.93, 0.72, 0.30);
    vec3 dark = vec3(0.24, 0.29, 0.20);
    float wsum = spots + shade + 0.0001;
    vec3 col = mix(dark, warm, spots / wsum);
    float alpha = (spots * 0.24 + shade * 0.11) * (1.0 - uScroll * 0.4);

    float vig = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
    alpha *= 0.6 + 0.4 * vig;
    gl_FragColor = vec4(col, alpha);
  }
`

const RING_MAX = 12

function initGL() {
  const canvas = glEl.value
  if (!canvas) return null

  let renderer
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" })
  } catch {
    return null
  }

  const reduced = prefersReducedMotion()
  // pointer lives in uv space (0..1); parked far away when it leaves
  const pointer = { x: -9, y: -9, tx: -9, ty: -9 }
  let scroll = 0
  let current = null
  let raf = 0
  let aspect = 1
  const start = performance.now()
  const nowSec = () => (performance.now() - start) / 1000

  const buildQuad = (fragmentShader, extraUniforms = {}) => {
    const scene = new Scene()
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const uniforms = {
      uTime: { value: reduced ? 30 : 0 },
      uScroll: { value: 0 },
      uPointer: { value: new Vector2(-9, -9) },
      uAspect: { value: 1 },
      ...extraUniforms,
    }
    const geo = new PlaneGeometry(2, 2)
    const material = new ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      vertexShader: QUAD_VERTEX,
      fragmentShader,
    })
    scene.add(new Mesh(geo, material))
    return {
      scene,
      camera,
      uniforms,
      tick(t, p) {
        uniforms.uTime.value = t
        uniforms.uPointer.value.set(p.x, p.y)
      },
      setScroll(v) { uniforms.uScroll.value = v },
      resize(w, h) { uniforms.uAspect.value = w / h },
      dispose() { geo.dispose(); material.dispose() },
    }
  }

  /* pond gets a ring buffer: ambient drops plus rings laid by the cursor */
  const buildPond = () => {
    const rings = Array.from({ length: RING_MAX }, () => new Vector4(0, 0, -100, 0))
    const quad = buildQuad(POND_FRAG, { uRings: { value: rings } })
    let idx = 0
    let nextAmbient = reduced ? Infinity : 1.2
    let lastPing = -10

    const spawn = (x, y, amp) => {
      rings[idx].set(x * quad.uniforms.uAspect.value, y, nowSec(), amp)
      idx = (idx + 1) % RING_MAX
    }

    if (reduced) {
      // a few frozen rings so the still frame reads as water
      spawn(0.28, 0.62, 0.9)
      spawn(0.7, 0.3, 0.7)
      quad.uniforms.uTime.value = 33
      rings[0].z = 30
      rings[1].z = 31.2
    }

    const baseTick = quad.tick.bind(quad)
    quad.tick = (t, p) => {
      baseTick(t, p)
      if (t >= nextAmbient) {
        spawn(0.12 + hash2(t) * 0.76, 0.15 + hash2(t * 1.7) * 0.7, 0.55 + hash2(t * 2.3) * 0.45)
        nextAmbient = t + 3.2 + hash2(t * 3.1) * 3.4
      }
    }
    quad.ping = (x, y) => {
      const t = nowSec()
      if (t - lastPing < 0.9) return
      lastPing = t
      spawn(x, y, 0.8)
    }
    return quad
  }

  // tiny deterministic pseudo-random for ambient drop placement
  const hash2 = (n) => {
    const s = Math.sin(n * 127.1) * 43758.5453
    return s - Math.floor(s)
  }

  const builders = {
    sand: () => buildQuad(SAND_FRAG),
    ink: () => buildQuad(INK_FRAG),
    pond: buildPond,
    light: () => buildQuad(LIGHT_FRAG),
  }

  const resize = () => {
    const w = window.innerWidth
    const h = window.innerHeight
    aspect = w / h
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    renderer.setPixelRatio(dpr)
    renderer.setSize(w, h, false)
    current?.resize(w, h)
    if (reduced) renderStill()
  }

  const renderStill = () => {
    if (!current) return
    current.tick(current.uniforms.uTime.value, pointer)
    renderer.render(current.scene, current.camera)
  }

  const frame = () => {
    // very lazy pointer follow — the garden shifts, it never snaps
    pointer.x += (pointer.tx - pointer.x) * 0.045
    pointer.y += (pointer.ty - pointer.y) * 0.045
    current.tick(nowSec(), pointer)
    renderer.render(current.scene, current.camera)
    raf = requestAnimationFrame(frame)
  }
  const play = () => { if (!raf && !document.hidden) raf = requestAnimationFrame(frame) }
  const stop = () => { cancelAnimationFrame(raf); raf = 0 }
  const onVis = () => (document.hidden ? stop() : play())
  const onPointer = (e) => {
    const x = e.clientX / window.innerWidth
    const y = 1 - e.clientY / window.innerHeight
    pointer.tx = x
    pointer.ty = y
    current?.ping?.(x, y)
  }
  const onPointerOut = () => { pointer.tx = -9; pointer.ty = -9 }

  const setMode = (key) => {
    current?.dispose()
    current = (builders[key] || builders.sand)()
    current.resize(window.innerWidth, window.innerHeight)
    current.setScroll(scroll)
    if (reduced) renderStill()
  }
  setMode(bgMode.value)
  resize()

  window.addEventListener("resize", resize)
  if (!reduced) {
    window.addEventListener("pointermove", onPointer, { passive: true })
    window.addEventListener("pointerleave", onPointerOut)
    document.addEventListener("visibilitychange", onVis)
    play()
  }

  return {
    setMode,
    setScroll(v) { scroll = v; current?.setScroll(v); if (reduced) renderStill() },
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

/* ── magnetic buttons — a whisper, fine pointers only ── */
function initMagnetic() {
  if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {}
  const els = rootEl.value.querySelectorAll(".v5-magnetic")
  const offs = []
  els.forEach((el) => {
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      gsap.to(el, { x: dx * 0.12, y: dy * 0.2, duration: 0.6, ease: "power3.out" })
    }
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" })
    el.addEventListener("pointermove", move)
    el.addEventListener("pointerleave", leave)
    offs.push(() => {
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerleave", leave)
    })
  })
  return () => offs.forEach((off) => off())
}

/* ── hero bonsai — slow bob plus a lazy pointer parallax ── */
function initTree() {
  if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {}
  const tree = rootEl.value.querySelector(".v5-hero-tree")
  if (!tree) return () => {}
  const toX = gsap.quickTo(tree, "x", { duration: 1.6, ease: "power2.out" })
  const toY = gsap.quickTo(tree, "y", { duration: 1.6, ease: "power2.out" })
  const move = (e) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1
    const ny = (e.clientY / window.innerHeight) * 2 - 1
    toX(nx * 10)
    toY(ny * 8)
  }
  window.addEventListener("pointermove", move, { passive: true })
  return () => window.removeEventListener("pointermove", move)
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  try {
    const saved = localStorage.getItem("katsumii-v5-bg")
    if (BG_OPTIONS.some((o) => o.key === saved)) bgMode.value = saved
  } catch { /* private mode */ }

  glApi = initGL()
  if (glApi) cleanups.push(glApi.dispose)
  cleanups.push(initMagnetic())
  cleanups.push(initTree())

  const reduced = prefersReducedMotion()

  gsapCtx = gsap.context(() => {
    /* scroll softens the garden below the hero */
    if (glApi && !reduced) {
      ScrollTrigger.create({
        start: 0,
        end: () => window.innerHeight * 1.4,
        onUpdate: (self) => glApi.setScroll(self.progress),
      })
    } else if (glApi) {
      glApi.setScroll(0.3)
    }

    /* nav gains a paper floor once you leave the hero */
    ScrollTrigger.create({
      start: 60,
      onEnter: () => navEl.value?.classList.add("scrolled"),
      onLeaveBack: () => navEl.value?.classList.remove("scrolled"),
    })

    if (reduced) {
      gsap.set(".v5-load, .v5-hline-in, .v5-reveal, .v5-hero-tree, .v5-seal-lg", { clearProps: "all", opacity: 1 })
      if (ensoPathEl.value) ensoPathEl.value.style.strokeDashoffset = "0"
      return
    }

    /* hero entrance — unhurried on purpose */
    if (ensoPathEl.value) {
      gsap.set(ensoPathEl.value, { strokeDasharray: "88 12", strokeDashoffset: 88 })
    }
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } })
    intro
      .fromTo(".v5-load-h1a", { yPercent: 112 }, { yPercent: 0, duration: 1.1 }, 0.2)
      .fromTo(".v5-load-h1b", { yPercent: 112 }, { yPercent: 0, duration: 1.1 }, 0.34)
      .fromTo(".v5-load-1", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.12)
      .fromTo(".v5-load-2", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.65)
      .fromTo(".v5-load-3", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.82)
      .fromTo(".v5-load-tree", { autoAlpha: 0, y: 22, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.4 }, 0.5)
      .to(ensoPathEl.value, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" }, 0.7)
      .fromTo(".v5-load-4", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 }, 1.5)

    /* the bonsai breathes */
    gsap.to(".v5-tree-float", { y: -10, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1 })

    /* generic reveals */
    gsap.utils.toArray(".v5-reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 87%", once: true },
        }
      )
    })

    /* the seal stamps itself onto the page */
    if (sealEl.value) {
      gsap.fromTo(
        sealEl.value,
        { autoAlpha: 0, scale: 1.7, rotate: 4 },
        {
          autoAlpha: 1, scale: 1, rotate: -4, duration: 0.45, ease: "power4.in",
          scrollTrigger: { trigger: sealEl.value, start: "top 78%", once: true },
        }
      )
    }

    /* garden rooms — the deck settles as the next card arrives (desktop) */
    const mm = gsap.matchMedia()
    mm.add("(min-width: 861px)", () => {
      const cards = gsap.utils.toArray(".v5-room")
      cards.forEach((card, i) => {
        if (i === 0) return
        const prev = cards[i - 1].querySelector(".v5-room-card")
        gsap.to(prev, {
          scale: 0.955,
          autoAlpha: 0.45,
          transformOrigin: "center top",
          ease: "none",
          scrollTrigger: { trigger: card, start: "top 90%", end: "top 20%", scrub: true },
        })
      })
    })
  }, rootEl.value)
})

onBeforeUnmount(() => {
  gsapCtx?.revert()
  cleanups.forEach((fn) => fn && fn())
  cleanups = []
  glApi = null
})
</script>

<style scoped>
/* ════ v5 tokens — "The Quiet Garden": washi paper, sumi ink, moss ════ */
.v5 {
  --paper: #f2eee2;
  --paper-2: #f9f6ec;
  --ink: #23281f;
  --ink-2: #4a5044;
  --ink-3: #6b7060;
  --moss: #45704d;
  --moss-deep: #35603e;
  --seal: #b23a26;
  --line: rgba(35, 40, 31, 0.16);
  --line-soft: rgba(35, 40, 31, 0.09);
  --dark: #1d221a;
  --dark-2: #262c22;
  --paper-on-dark: #ece8da;

  --font-display: "Fraunces", Georgia, "Times New Roman", serif;
  --font-body: "DM Sans", system-ui, sans-serif;
  --font-mono: "DM Mono", ui-monospace, monospace;

  position: relative;
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-body);
  font-weight: 400;
  line-height: 1.6;
  overflow-x: clip;
}

.v5 ::selection { background: rgba(69, 112, 77, 0.22); }
.v5 :focus-visible { outline: 2px solid var(--moss); outline-offset: 3px; border-radius: 2px; }

.v5-gl {
  position: fixed;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.v5-grain {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.055;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.v5 main, .v5-footer { position: relative; z-index: 2; }

/* ── background switcher ── */
.v5-bgswitch {
  position: fixed;
  left: 1.1rem;
  bottom: 1.1rem;
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.55rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: color-mix(in srgb, var(--paper-2) 82%, transparent);
  backdrop-filter: blur(8px);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.06em;
}
.v5-bgswitch-label { color: var(--ink-3); padding-right: 0.2rem; text-transform: lowercase; }
.v5-bgswitch button {
  border: 0;
  background: transparent;
  color: var(--ink-2);
  font: inherit;
  padding: 0.28rem 0.55rem;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}
.v5-bgswitch button:hover { color: var(--ink); }
.v5-bgswitch button.active { background: var(--ink); color: var(--paper); }

/* ── nav ── */
.v5-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem clamp(1.1rem, 4vw, 2.6rem);
  transition: background 0.4s, border-color 0.4s, backdrop-filter 0.4s;
  border-bottom: 1px solid transparent;
}
.v5-nav.scrolled {
  background: color-mix(in srgb, var(--paper) 86%, transparent);
  border-bottom-color: var(--line-soft);
  backdrop-filter: blur(10px);
}
.v5-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  text-decoration: none;
  color: var(--ink);
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 480;
  letter-spacing: 0.01em;
}
.v5-brand img { display: block; }
.v5-nav-links { display: flex; gap: clamp(1rem, 2.6vw, 2rem); }
.v5-nav-links a {
  color: var(--ink-2);
  text-decoration: none;
  font-size: 0.86rem;
  letter-spacing: 0.02em;
  transition: color 0.3s;
}
.v5-nav-links a:hover { color: var(--ink); }
.v5-nav-right { display: flex; align-items: center; gap: 1rem; }
.v5-nav-ghost {
  color: var(--ink-3);
  text-decoration: none;
  font-size: 0.82rem;
  transition: color 0.3s;
}
.v5-nav-ghost:hover { color: var(--ink); }

/* ── buttons ── */
.v5-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--ink);
  color: var(--paper);
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  transition: background 0.35s, color 0.35s;
}
.v5-btn:hover { background: var(--moss-deep); }
.v5-btn span { transition: transform 0.35s; }
.v5-btn:hover span { transform: translateX(3px); }
.v5-btn-sm { padding: 0.55rem 1.1rem; font-size: 0.82rem; }
.v5-btn-lg { padding: 1.05rem 2.1rem; font-size: 1rem; }
.v5-quiet {
  color: var(--ink-2);
  text-decoration: none;
  font-size: 0.92rem;
  border-bottom: 1px solid var(--line);
  padding-bottom: 2px;
  transition: color 0.3s, border-color 0.3s;
}
.v5-quiet:hover { color: var(--ink); border-color: var(--ink-2); }

/* ── shared type ── */
.v5-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-3);
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.v5-eyebrow i { width: 26px; height: 1px; background: var(--moss); flex: none; }
.v5-eyebrow-light { color: rgba(236, 232, 218, 0.6); }

.v5-h1 {
  font-family: var(--font-display);
  font-weight: 390;
  font-optical-sizing: auto;
  font-size: clamp(2.9rem, 7.2vw, 5.6rem);
  line-height: 1.04;
  letter-spacing: -0.02em;
  margin: 1.4rem 0 0;
}
.v5-h1 em, .v5-h2 em { font-style: italic; color: var(--moss-deep); }
.v5-hline { display: block; overflow: hidden; padding-bottom: 0.08em; margin-bottom: -0.08em; }
.v5-hline-in { display: inline-block; will-change: transform; }

.v5-h2 {
  font-family: var(--font-display);
  font-weight: 400;
  font-optical-sizing: auto;
  font-size: clamp(1.9rem, 4vw, 3.1rem);
  line-height: 1.12;
  letter-spacing: -0.015em;
  margin: 1.1rem 0 0;
}
.v5-section-head { max-width: 1120px; margin: 0 auto; padding: 0 clamp(1.1rem, 4vw, 2.6rem); }

/* ── seal ── */
.v5-seal {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--seal);
  color: #f6efe2;
  font-family: "Yu Mincho", "Hiragino Mincho ProN", "Noto Serif CJK JP", serif;
  border-radius: 4px;
  transform: rotate(-4deg);
  box-shadow: inset 0 0 5px rgba(60, 12, 4, 0.35);
  user-select: none;
}
.v5-seal-sm { width: 1.35rem; height: 1.35rem; font-size: 0.82rem; border-radius: 3px; }
.v5-seal-lg { width: 3.6rem; height: 3.6rem; font-size: 2.1rem; margin-bottom: 1.6rem; }

/* ── hero ── */
.v5-hero {
  position: relative;
  min-height: 100svh;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  align-items: center;
  gap: clamp(1.5rem, 4vw, 4rem);
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(6rem, 14vh, 9rem) clamp(1.1rem, 4vw, 2.6rem) 4.5rem;
}
.v5-hero-sub {
  max-width: 46ch;
  font-size: clamp(1rem, 1.35vw, 1.14rem);
  line-height: 1.7;
  color: var(--ink-2);
  margin: 1.7rem 0 0;
}
.v5-hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.4rem;
  margin-top: 2.4rem;
}

.v5-hero-tree {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 380px;
}
.v5-enso {
  position: absolute;
  width: min(120%, 520px);
  aspect-ratio: 1;
}
.v5-enso circle {
  stroke: var(--ink);
  stroke-width: 2.6;
  opacity: 0.14;
}
.v5-tree-float { position: relative; z-index: 1; }
.v5-tree-float img {
  display: block;
  width: clamp(230px, 26vw, 360px);
  height: auto;
  filter: drop-shadow(0 22px 30px rgba(35, 40, 31, 0.18));
}
.v5-tree-ground {
  position: absolute;
  bottom: 12%;
  width: 58%;
  height: 34px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(35, 40, 31, 0.14), transparent 68%);
}

.v5-hero-hint {
  position: absolute;
  left: 50%;
  bottom: 1.6rem;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.v5-hero-hint span {
  width: 1px;
  height: 34px;
  background: linear-gradient(var(--ink-3), transparent);
  animation: v5-drip 2.6s ease-in-out infinite;
}
@keyframes v5-drip {
  0% { transform: scaleY(0); transform-origin: top; }
  45% { transform: scaleY(1); transform-origin: top; }
  55% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

/* ── facts strip ── */
.v5-facts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem 0;
  padding: 1.6rem clamp(1.1rem, 4vw, 2.6rem);
  border-top: 1px solid var(--line-soft);
  border-bottom: 1px solid var(--line-soft);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  color: var(--ink-2);
}
.v5-facts i { padding: 0 1.4rem; color: var(--moss); font-style: normal; }

/* ── manifesto ── */
.v5-manifesto {
  position: relative;
  max-width: 880px;
  margin: 0 auto;
  padding: clamp(6rem, 13vh, 10rem) clamp(1.1rem, 4vw, 2.6rem);
  text-align: center;
}
.v5-manifesto .v5-eyebrow { justify-content: center; }
.v5-ghost {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Yu Mincho", "Hiragino Mincho ProN", "Noto Serif CJK JP", serif;
  font-size: clamp(16rem, 34vw, 30rem);
  line-height: 1;
  color: var(--ink);
  opacity: 0.035;
  pointer-events: none;
  user-select: none;
}
.v5-manifesto-lines {
  font-family: var(--font-display);
  font-weight: 390;
  font-size: clamp(1.7rem, 3.6vw, 2.9rem);
  line-height: 1.28;
  letter-spacing: -0.01em;
  margin: 2.2rem 0 0;
}
.v5-manifesto-lines span { display: block; }
.v5-manifesto-lines em { font-style: italic; color: var(--moss-deep); }
.v5-manifesto-copy {
  max-width: 56ch;
  margin: 2.2rem auto 0;
  color: var(--ink-2);
  font-size: 1.02rem;
  line-height: 1.75;
}

/* ── garden rooms (sticky deck) ── */
.v5-garden { padding: clamp(4rem, 9vh, 7rem) 0 clamp(5rem, 10vh, 8rem); }
.v5-rooms {
  display: flex;
  flex-direction: column;
  gap: 18vh;
  max-width: 1060px;
  margin: 4rem auto 0;
  padding: 0 clamp(1.1rem, 4vw, 2.6rem);
}
.v5-room { position: sticky; top: clamp(4.5rem, 9vh, 6.5rem); margin: 0; }
.v5-room-card {
  background: var(--paper-2);
  border: 1px solid var(--line-soft);
  border-radius: 12px;
  padding: clamp(0.9rem, 2vw, 1.5rem);
  box-shadow: 0 30px 60px -30px rgba(35, 40, 31, 0.35);
  will-change: transform;
}
.v5-room-cap {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.3rem 0.9rem;
  padding: 0.2rem 0.3rem 1rem;
}
.v5-room-num { font-family: var(--font-mono); font-size: 0.72rem; color: var(--moss); letter-spacing: 0.1em; }
.v5-room-cap strong {
  font-family: var(--font-display);
  font-weight: 480;
  font-size: 1.25rem;
  letter-spacing: -0.01em;
}
.v5-room-cap em { font-family: var(--font-display); font-style: italic; color: var(--ink-3); font-size: 1rem; }
.v5-room-note { flex-basis: 100%; color: var(--ink-2); font-size: 0.92rem; max-width: 68ch; }
.v5-room-frame {
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 8 / 5;
  border: 1px solid rgba(35, 40, 31, 0.25);
  background: #10141a;
}
.v5-room-frame img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

/* ── modes / folding screen ── */
.v5-modes { padding: clamp(4rem, 9vh, 7rem) 0; }
.v5-folds {
  display: flex;
  gap: 0.7rem;
  max-width: 1120px;
  height: 520px;
  margin: 3.4rem auto 0;
  padding: 0 clamp(1.1rem, 4vw, 2.6rem);
}
.v5-fold {
  position: relative;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--line-soft);
  border-radius: 12px;
  background: var(--paper-2);
  transition: flex-grow 0.85s cubic-bezier(0.32, 0.72, 0.15, 1), background 0.5s;
}
.v5-fold:hover { background: #fbf9f1; }
.v5-fold.open { flex-grow: 3.1; }
.v5-fold-head {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 1.4rem 1.5rem;
  font: inherit;
  color: inherit;
  text-align: left;
}
.v5-fold-num { font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.1em; color: var(--ink-3); }
.v5-fold-name {
  writing-mode: vertical-rl;
  font-family: var(--font-display);
  font-weight: 420;
  font-size: clamp(1.4rem, 2.2vw, 1.9rem);
  letter-spacing: 0.04em;
  color: var(--ink);
}
.v5-fold-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--fold-dot);
}
.v5-fold-body {
  position: absolute;
  top: 0;
  bottom: 0;
  left: clamp(4.4rem, 6vw, 5.6rem);
  width: clamp(280px, 26vw, 420px);
  display: flex;
  align-items: center;
  opacity: 0;
  transform: translateX(14px);
  transition: opacity 0.4s 0s, transform 0.4s 0s;
  pointer-events: none;
}
.v5-fold.open .v5-fold-body {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.6s 0.3s, transform 0.7s 0.3s;
  pointer-events: auto;
}
.v5-fold-body-in { padding: 1.5rem 1.5rem 1.5rem 0; }
.v5-fold-tag {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fold-dot);
  margin: 0 0 0.7rem;
}
.v5-fold-body h3 {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 420;
  font-size: 1.5rem;
  letter-spacing: -0.01em;
  margin: 0 0 0.7rem;
}
.v5-fold-copy { color: var(--ink-2); font-size: 0.94rem; margin: 0 0 1.1rem; }
.v5-fold-body ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.55rem; }
.v5-fold-body li {
  position: relative;
  padding-left: 1.1rem;
  font-size: 0.88rem;
  color: var(--ink-2);
}
.v5-fold-body li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--fold-dot);
}

/* ── practice grid ── */
.v5-practice { padding: clamp(4rem, 9vh, 7rem) 0; }
.v5-practice-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2.6rem 2.4rem;
  max-width: 1120px;
  margin: 3.4rem auto 0;
  padding: 0 clamp(1.1rem, 4vw, 2.6rem);
}
.v5-span-5 { grid-column: span 5; }
.v5-span-6 { grid-column: span 6; }
.v5-span-7 { grid-column: span 7; }
.v5-card { border-top: 1px solid var(--line); padding-top: 1.3rem; }
.v5-card h3 {
  font-family: var(--font-display);
  font-weight: 440;
  font-size: 1.35rem;
  letter-spacing: -0.01em;
  margin: 0 0 0.6rem;
}
.v5-card p { color: var(--ink-2); font-size: 0.95rem; margin: 0; max-width: 52ch; }
.v5-card-chips {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 1rem 0 0;
  padding: 0;
}
.v5-card-chips li {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.05em;
  color: var(--ink-2);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 0.22rem 0.6rem;
}

/* ── local offline (the one dark room) ── */
.v5-local {
  background: var(--dark);
  color: var(--paper-on-dark);
  margin: clamp(4rem, 9vh, 7rem) 0 0;
}
.v5-local-inner {
  max-width: 880px;
  margin: 0 auto;
  padding: clamp(5rem, 11vh, 8rem) clamp(1.1rem, 4vw, 2.6rem);
  text-align: center;
}
.v5-local .v5-eyebrow { justify-content: center; }
.v5-local .v5-eyebrow i { background: var(--seal); }
.v5-local-lines {
  font-family: var(--font-display);
  font-weight: 380;
  font-size: clamp(2.3rem, 5.4vw, 4.1rem);
  line-height: 1.1;
  letter-spacing: -0.015em;
  margin: 1.6rem 0 0;
}
.v5-local-lines span { display: block; }
.v5-local-lines em { font-style: italic; color: #a8c3a0; }
.v5-local-copy {
  max-width: 54ch;
  margin: 2rem auto 0;
  color: rgba(236, 232, 218, 0.72);
  font-size: 1.02rem;
  line-height: 1.75;
}
.v5-local-chips {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
  margin: 2.4rem 0 0;
  padding: 0;
}
.v5-local-chips li {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  border: 1px solid rgba(236, 232, 218, 0.22);
  border-radius: 999px;
  padding: 0.35rem 0.85rem;
  color: rgba(236, 232, 218, 0.85);
}

/* ── cta ── */
.v5-cta {
  text-align: center;
  padding: clamp(6rem, 13vh, 10rem) clamp(1.1rem, 4vw, 2.6rem);
}
.v5-cta-title {
  font-family: var(--font-display);
  font-weight: 390;
  font-size: clamp(2.5rem, 6vw, 4.6rem);
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin: 0;
}
.v5-cta-title em { font-style: italic; color: var(--moss-deep); }
.v5-cta-sub { color: var(--ink-2); font-size: 1.05rem; margin: 1.4rem 0 0; }
.v5-cta-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  margin-top: 2.6rem;
}

/* ── footer ── */
.v5-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.8rem 2rem;
  max-width: 1240px;
  margin: 0 auto;
  padding: 2rem clamp(1.1rem, 4vw, 2.6rem) 4.4rem;
  border-top: 1px solid var(--line-soft);
  font-size: 0.82rem;
  color: var(--ink-3);
}
.v5-footer p { margin: 0; }
.v5-footer nav { display: flex; gap: 1.4rem; }
.v5-footer a { color: var(--ink-3); text-decoration: none; transition: color 0.3s; }
.v5-footer a:hover { color: var(--ink); }

/* ── responsive ── */
@media (max-width: 1100px) {
  .v5-span-5, .v5-span-6, .v5-span-7 { grid-column: span 6; }
}

@media (max-width: 900px) {
  .v5-nav-links { display: none; }
  .v5-hero {
    grid-template-columns: 1fr;
    padding-top: 7rem;
    text-align: left;
  }
  .v5-hero-tree { order: -1; min-height: 0; margin-bottom: 0.5rem; }
  .v5-tree-float img { width: clamp(150px, 34vw, 230px); }
  .v5-enso { width: min(78vw, 340px); }
  .v5-hero-hint { display: none; }

  /* folding screen becomes a quiet accordion */
  .v5-folds { flex-direction: column; height: auto; }
  .v5-fold { flex: none; }
  .v5-fold-head {
    position: relative;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    padding: 1.1rem 1.2rem;
  }
  .v5-fold-name { writing-mode: horizontal-tb; font-size: 1.25rem; flex: 1; }
  .v5-fold-dot { margin-left: auto; }
  .v5-fold-body {
    position: static;
    width: auto;
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    transform: none;
    transition: grid-template-rows 0.6s cubic-bezier(0.32, 0.72, 0.15, 1), opacity 0.45s;
  }
  .v5-fold.open .v5-fold-body {
    grid-template-rows: 1fr;
    opacity: 1;
    transform: none;
    transition: grid-template-rows 0.6s cubic-bezier(0.32, 0.72, 0.15, 1), opacity 0.5s 0.15s;
  }
  .v5-fold-body-in {
    overflow: hidden;
    min-height: 0;
    padding: 0 1.2rem;
  }
  .v5-fold.open .v5-fold-body-in { padding-bottom: 1.4rem; }
}

@media (max-width: 860px) {
  .v5-room { position: static; }
  .v5-rooms { gap: 3.2rem; }
}

@media (max-width: 640px) {
  .v5-span-5, .v5-span-6, .v5-span-7 { grid-column: span 12; }
  .v5-nav-ghost { display: none; }
  .v5-facts { flex-direction: column; align-items: center; gap: 0.55rem; }
  .v5-facts i { display: none; }
  .v5-footer { flex-direction: column; align-items: flex-start; }
  .v5-bgswitch { left: 50%; transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .v5-hero-hint span { animation: none; transform: none; }
  .v5-fold, .v5-fold-body, .v5-btn span, .v5-quiet, .v5-bgswitch button { transition: none; }
}
</style>
