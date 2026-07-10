<template>
  <div ref="rootEl" class="lv2">
    <!-- ambient hero canvas -->
    <canvas ref="sporeCanvas" class="lv2-spores" aria-hidden="true"></canvas>

    <!-- NAV -->
    <header ref="navEl" class="lv2-nav">
      <a class="lv2-nav-brand" href="#top" @click.prevent="scrollTop">
        <img :src="asset('logo.png')" alt="Katsumii logo" width="34" height="34" />
        <span>Katsumii</span>
      </a>
      <nav class="lv2-nav-links" aria-label="Page sections">
        <a href="#modes">Modes</a>
        <a href="#craft">Craft</a>
        <a href="#manifesto">Manifesto</a>
        <RouterLink to="/en/pricing">Pricing</RouterLink>
      </nav>
      <div class="lv2-nav-cta">
        <RouterLink class="lv2-nav-classic" to="/en/app">Classic site</RouterLink>
        <RouterLink class="lv2-btn lv2-btn-sm" to="/en/pricing">Get Katsumii</RouterLink>
      </div>
    </header>

    <main id="top">
      <!-- HERO -->
      <section class="lv2-hero">
        <div class="lv2-hero-copy">
          <p class="lv2-kicker lv2-hero-kicker">Katsumii — a local offline trading journal</p>
          <h1 class="lv2-h1">
            <span class="lv2-hline"><span class="lv2-hline-in">Your edge,</span></span>
            <span class="lv2-hline"><span class="lv2-hline-in lv2-accent">cultivated<span class="lv2-ember">.</span></span></span>
          </h1>
          <p class="lv2-hero-sub">
            Katsumii turns raw trades into a living record of your craft —
            funded, challenge and personal trading, journaled and analyzed
            entirely on your machine. No cloud. No noise.
          </p>
          <div class="lv2-hero-actions">
            <RouterLink to="/en/pricing" class="lv2-btn lv2-magnetic">Get Katsumii <span aria-hidden="true">→</span></RouterLink>
            <a href="#modes" class="lv2-link-quiet lv2-magnetic">See it grow <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div ref="tiltWrap" class="lv2-hero-visual">
          <div ref="tiltCard" class="lv2-hero-frame">
            <img
              :src="asset('Dashboard_dark.png')"
              alt="Katsumii dashboard showing net P&amp;L, equity curve and trade breakdown"
              width="1999"
              height="1249"
              fetchpriority="high"
            />
            <div class="lv2-chip lv2-chip-a"><span class="lv2-chip-num">71.4%</span><span class="lv2-chip-label">win rate</span></div>
            <div class="lv2-chip lv2-chip-b"><span class="lv2-chip-num">5.39</span><span class="lv2-chip-label">profit factor</span></div>
          </div>
          <div class="lv2-orb" aria-hidden="true"></div>
        </div>

        <div class="lv2-scrollhint" aria-hidden="true"><span></span></div>
      </section>

      <!-- MARQUEE -->
      <div class="lv2-marquee" aria-hidden="true">
        <div class="lv2-marquee-track">
          <span v-for="n in 2" :key="n" class="lv2-marquee-group">
            <span v-for="item in marqueeItems" :key="item" class="lv2-marquee-item">{{ item }} <i>✦</i></span>
          </span>
        </div>
      </div>

      <!-- MODES -->
      <section id="modes" class="lv2-section">
        <svg class="lv2-branch" viewBox="0 0 120 160" fill="none" aria-hidden="true">
          <path class="lv2-branch-path" d="M60 4 C 60 40, 34 52, 30 84 C 27 108, 52 118, 60 156 M60 62 C 78 70, 92 66, 102 48" stroke-linecap="round" />
          <circle class="lv2-branch-leaf" cx="102" cy="46" r="4" />
          <circle class="lv2-branch-leaf" cx="29" cy="86" r="4" />
        </svg>
        <p class="lv2-kicker lv2-reveal">Three disciplines</p>
        <h2 class="lv2-h2 lv2-reveal">One journal.<br />Three ways to trade it.</h2>
        <p class="lv2-lead lv2-reveal">
          Every mode keeps its own silo of data — trades never blur across worlds.
          Switch context, keep clarity.
        </p>

        <div class="lv2-stack">
          <article
            v-for="(mode, i) in modes"
            :key="mode.name"
            class="lv2-mode"
            :style="{ top: `calc(84px + ${i * 22}px)` }"
          >
            <div class="lv2-mode-copy">
              <span class="lv2-mode-index">0{{ i + 1 }}</span>
              <h3>{{ mode.name }}</h3>
              <p>{{ mode.text }}</p>
              <ul>
                <li v-for="point in mode.points" :key="point">{{ point }}</li>
              </ul>
            </div>
            <div class="lv2-mode-shot">
              <img :src="asset(mode.img)" :alt="mode.alt" loading="lazy" width="1600" height="1000" />
            </div>
          </article>
        </div>
      </section>

      <!-- SHOWCASE -->
      <section class="lv2-showcase">
        <div ref="showcaseImg" class="lv2-showcase-frame">
          <img
            :src="asset('Main_dark.png')"
            alt="Katsumii account workspace with active funded accounts"
            loading="lazy"
            width="1999"
            height="1249"
          />
        </div>
        <p class="lv2-showcase-caption lv2-reveal">
          <span class="lv2-mono">ACCOUNT WORKSPACE</span> — every account, its limits and its billing, one calm view.
        </p>
      </section>

      <!-- CRAFT / FEATURES -->
      <section id="craft" class="lv2-section">
        <p class="lv2-kicker lv2-reveal">The craft</p>
        <h2 class="lv2-h2 lv2-reveal">Tools that reward<br />patience.</h2>

        <div class="lv2-bento">
          <article class="lv2-tile lv2-tile-wide lv2-reveal">
            <div class="lv2-tile-head">
              <h3>Equity Curve Monitor</h3>
              <p>Watch curve behavior and regime shifts without leaving the dashboard — per trade, per day, in $, % or R.</p>
            </div>
            <div class="lv2-tile-img"><img :src="asset('Dashboard_dark.png')" alt="Equity curve progression chart" loading="lazy" width="1999" height="1249" /></div>
          </article>

          <article class="lv2-tile lv2-reveal">
            <div class="lv2-tile-head">
              <h3>Calendar heat</h3>
              <p>Your month, win by win. Loss days included — they teach the most.</p>
            </div>
            <div class="lv2-tile-img lv2-tile-img-top"><img :src="asset('Calendar_dark.png')" alt="Trading calendar with wins and losses" loading="lazy" width="1600" height="1000" /></div>
          </article>

          <article class="lv2-tile lv2-tile-quote lv2-reveal">
            <span class="lv2-tile-big">R&nbsp;2.16</span>
            <p>Execution quality, distilled — effective R:R, win rate and profit factor on one dial.</p>
          </article>

          <article class="lv2-tile lv2-reveal">
            <div class="lv2-tile-head">
              <h3>Setup analytics</h3>
              <p>Know which setups actually pay — distribution, contribution and average per trade.</p>
            </div>
            <div class="lv2-tile-img lv2-tile-img-top"><img :src="asset('Stats_dark.png')" alt="Setup distribution and performance statistics" loading="lazy" width="1654" height="1599" /></div>
          </article>

          <article class="lv2-tile lv2-tile-text lv2-reveal">
            <h3>Screenshots, attached</h3>
            <p>Pin chart screenshots to every trade and setup. Your future self will thank you during review.</p>
          </article>

          <article class="lv2-tile lv2-tile-text lv2-reveal">
            <h3>Quiet backups</h3>
            <p>Weekly and monthly database backups run on a background daemon. Set once, forget forever.</p>
          </article>
        </div>
      </section>

      <!-- MANIFESTO -->
      <section id="manifesto" class="lv2-manifesto">
        <svg class="lv2-branch" viewBox="0 0 120 160" fill="none" aria-hidden="true">
          <path class="lv2-branch-path" d="M60 4 C 60 44, 88 54, 90 88 C 92 112, 66 120, 60 156 M60 66 C 44 76, 30 72, 18 54" stroke-linecap="round" />
          <circle class="lv2-branch-leaf" cx="18" cy="52" r="4" />
          <circle class="lv2-branch-leaf" cx="91" cy="90" r="4" />
        </svg>
        <p ref="manifestoEl" class="lv2-manifesto-text">
          <span v-for="(word, i) in manifestoWords" :key="i" class="lv2-word">{{ word }}&nbsp;</span>
        </p>
        <div class="lv2-manifesto-notes lv2-reveal">
          <span class="lv2-mono">SQLITE · WAL MODE</span>
          <span class="lv2-mono">WORKS OFFLINE</span>
          <span class="lv2-mono">NO ACCOUNT REQUIRED</span>
        </div>
      </section>

      <!-- STATS -->
      <section class="lv2-stats">
        <div v-for="stat in stats" :key="stat.label" class="lv2-stat lv2-reveal">
          <span class="lv2-stat-num"><span class="lv2-count" :data-count="stat.value">0</span>{{ stat.suffix }}</span>
          <span class="lv2-stat-label">{{ stat.label }}</span>
        </div>
      </section>

      <!-- CTA -->
      <section class="lv2-cta">
        <img class="lv2-cta-logo lv2-reveal" :src="asset('logo.png')" alt="" width="72" height="72" loading="lazy" />
        <h2 class="lv2-h2 lv2-reveal">Begin the practice.</h2>
        <p class="lv2-lead lv2-reveal">A journal only works if you keep it. Katsumii makes keeping it the easiest part of your day.</p>
        <div class="lv2-hero-actions lv2-cta-actions lv2-reveal">
          <RouterLink to="/en/pricing" class="lv2-btn lv2-magnetic">Get Katsumii <span aria-hidden="true">→</span></RouterLink>
          <RouterLink to="/en/app" class="lv2-link-quiet">Prefer the classic site?</RouterLink>
        </div>
      </section>
    </main>

    <footer class="lv2-footer">
      <div class="lv2-footer-brand">
        <img :src="asset('logo.png')" alt="" width="26" height="26" loading="lazy" />
        <span>Katsumii</span>
        <span class="lv2-footer-dim">© {{ new Date().getFullYear() }}</span>
      </div>
      <nav class="lv2-footer-links" aria-label="Site pages">
        <RouterLink to="/en/features">Features</RouterLink>
        <RouterLink to="/en/pricing">Pricing</RouterLink>
        <RouterLink to="/en/manual">Manual</RouterLink>
        <RouterLink to="/en/faq">FAQ</RouterLink>
        <RouterLink to="/en/contact">Contact</RouterLink>
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

gsap.registerPlugin(ScrollTrigger)

const baseUrl = import.meta.env.BASE_URL
const asset = (path) => `${baseUrl}${path}`

const rootEl = ref(null)
const navEl = ref(null)
const sporeCanvas = ref(null)
const tiltWrap = ref(null)
const tiltCard = ref(null)
const showcaseImg = ref(null)
const manifestoEl = ref(null)

const marqueeItems = [
  "Local & offline", "Three trading modes", "Equity curves", "Setup analytics",
  "Prop-firm ready", "Automated backups", "Screenshot journal", "SQLite, yours",
]

const modes = [
  {
    name: "Funded",
    text: "Live prop-firm capital deserves a calm cockpit. Katsumii keeps the rules in sight so you can keep your head in the trade.",
    points: ["Distance to max loss limits, always visible", "Winning-day progress per account", "Billing and rebill dates tracked"],
    img: "Main_dark.png",
    alt: "Funded accounts overview with balance, limits and billing",
  },
  {
    name: "Challenge",
    text: "Evaluations without the guesswork. Every attempt becomes data — pass or fail, you walk away knowing why.",
    points: ["Each challenge logged as its own account", "Rule thresholds tracked against your trades", "Compare attempts across time"],
    img: "Sc1_Dark.png",
    alt: "Challenge mode trade tracking screen",
  },
  {
    name: "Personal",
    text: "Your own capital, your own rules. A private, unhurried record of how your trading grows year over year.",
    points: ["Separate database — never mixed with prop data", "Full analytics on your private trades", "Journal notes and screenshots per trade"],
    img: "Sc2_Dark.png",
    alt: "Personal trading mode analytics screen",
  },
]

const manifestoWords =
  ("Your trades are your story. They belong on your machine, not on someone else's server. " +
    "Katsumii keeps everything in a local database — offline, private, and entirely yours.").split(" ")

const stats = [
  { value: 3, suffix: "", label: "trading modes, fully siloed" },
  { value: 0, suffix: "", label: "cloud dependencies" },
  { value: 100, suffix: "%", label: "of your data stays local" },
]

let ctx = null
let sporesRaf = 0
let sporesVisible = true
let sporeObserver = null
let removeListeners = []

const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

/* ---------- ambient spore particles (hero) ---------- */
function startSpores() {
  const canvas = sporeCanvas.value
  if (!canvas) return
  const ctx2d = canvas.getContext("2d")
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  let w = 0
  let h = 0
  let spores = []

  const resize = () => {
    w = canvas.offsetWidth
    h = canvas.offsetHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0)
    const count = w < 768 ? 26 : 54
    spores = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.8,
      vy: 0.12 + Math.random() * 0.35,
      vx: (Math.random() - 0.5) * 0.12,
      phase: Math.random() * Math.PI * 2,
      warm: Math.random() < 0.14,
    }))
  }

  const tick = () => {
    if (sporesVisible && !document.hidden) {
      ctx2d.clearRect(0, 0, w, h)
      const t = performance.now() / 1000
      for (const s of spores) {
        s.y -= s.vy
        s.x += s.vx + Math.sin(t + s.phase) * 0.08
        if (s.y < -6) { s.y = h + 6; s.x = Math.random() * w }
        const alpha = 0.14 + 0.22 * Math.abs(Math.sin(t * 0.6 + s.phase))
        ctx2d.beginPath()
        ctx2d.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx2d.fillStyle = s.warm
          ? `rgba(255, 148, 87, ${alpha})`
          : `rgba(111, 220, 156, ${alpha})`
        ctx2d.fill()
      }
    }
    sporesRaf = requestAnimationFrame(tick)
  }

  resize()
  window.addEventListener("resize", resize)
  removeListeners.push(() => window.removeEventListener("resize", resize))

  sporeObserver = new IntersectionObserver(([entry]) => {
    sporesVisible = entry.isIntersecting
  })
  sporeObserver.observe(canvas)
  tick()
}

/* ---------- magnetic buttons + hero tilt ---------- */
function initPointerFX() {
  if (!window.matchMedia("(pointer: fine)").matches) return

  rootEl.value.querySelectorAll(".lv2-magnetic").forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" })
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * 0.25)
      yTo((e.clientY - (r.top + r.height / 2)) * 0.25)
    }
    const leave = () => { xTo(0); yTo(0) }
    el.addEventListener("mousemove", move)
    el.addEventListener("mouseleave", leave)
    removeListeners.push(() => {
      el.removeEventListener("mousemove", move)
      el.removeEventListener("mouseleave", leave)
    })
  })

  const wrap = tiltWrap.value
  const card = tiltCard.value
  if (wrap && card) {
    const rxTo = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3" })
    const ryTo = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3" })
    const move = (e) => {
      const r = wrap.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      rxTo(py * -7)
      ryTo(px * 9)
    }
    const leave = () => { rxTo(0); ryTo(0) }
    wrap.addEventListener("mousemove", move)
    wrap.addEventListener("mouseleave", leave)
    removeListeners.push(() => {
      wrap.removeEventListener("mousemove", move)
      wrap.removeEventListener("mouseleave", leave)
    })
  }
}

/* ---------- scroll choreography ---------- */
function initAnimations() {
  ctx = gsap.context(() => {
    const root = rootEl.value

    // nav backdrop once scrolled
    ScrollTrigger.create({
      start: 40,
      onUpdate: (self) => navEl.value?.classList.toggle("is-scrolled", self.scroll() > 40),
    })

    // hero intro
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".lv2-hero-kicker", { y: 24, autoAlpha: 0, duration: 0.7 }, 0.1)
      .from(".lv2-hline-in", { yPercent: 115, duration: 1.0, stagger: 0.12 }, 0.15)
      .from(".lv2-hero-sub", { y: 28, autoAlpha: 0, duration: 0.8 }, 0.55)
      .from(".lv2-hero .lv2-hero-actions", { y: 22, autoAlpha: 0, duration: 0.7 }, 0.7)
      .from(".lv2-hero-frame", { y: 70, autoAlpha: 0, rotationY: -10, duration: 1.2 }, 0.4)
      .from(".lv2-chip", { scale: 0.6, autoAlpha: 0, duration: 0.6, stagger: 0.12, ease: "back.out(2)" }, 1.1)
      .from(".lv2-scrollhint", { autoAlpha: 0, duration: 0.8 }, 1.3)

    // generic reveals
    gsap.utils.toArray(".lv2-reveal").forEach((el) => {
      gsap.from(el, {
        y: 44,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
      })
    })

    // branch dividers draw themselves
    gsap.utils.toArray(".lv2-branch").forEach((svg) => {
      const path = svg.querySelector(".lv2-branch-path")
      const len = path.getTotalLength()
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: { trigger: svg, start: "top 92%", end: "bottom 45%", scrub: 0.6 },
      })
      gsap.from(svg.querySelectorAll(".lv2-branch-leaf"), {
        scale: 0,
        transformOrigin: "center",
        ease: "back.out(3)",
        scrollTrigger: { trigger: svg, start: "top 55%", once: true },
      })
    })

    // sticky mode cards: dim + scale previous as next arrives
    const cards = gsap.utils.toArray(".lv2-mode")
    cards.forEach((card, i) => {
      if (i === 0) return
      gsap.to(cards[i - 1], {
        scale: 0.94,
        autoAlpha: 0.45,
        transformOrigin: "center top",
        ease: "none",
        scrollTrigger: { trigger: card, start: "top bottom", end: "top 120px", scrub: true },
      })
    })

    // showcase image grows in
    gsap.fromTo(showcaseImg.value,
      { scale: 0.9, y: 40 },
      {
        scale: 1, y: 0, ease: "none",
        scrollTrigger: { trigger: showcaseImg.value, start: "top 92%", end: "top 30%", scrub: 0.5 },
      })

    // manifesto word-by-word ink reveal
    gsap.fromTo(manifestoEl.value.querySelectorAll(".lv2-word"),
      { opacity: 0.13 },
      {
        opacity: 1, stagger: 0.4, ease: "none",
        scrollTrigger: { trigger: manifestoEl.value, start: "top 78%", end: "bottom 45%", scrub: 0.4 },
      })

    // stat count-ups
    gsap.utils.toArray(".lv2-count").forEach((el) => {
      const target = Number(el.dataset.count)
      const state = { v: 0 }
      gsap.to(state, {
        v: target,
        duration: 1.4,
        ease: "power2.out",
        snap: { v: 1 },
        onUpdate: () => { el.textContent = String(Math.round(state.v)) },
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      })
    })
  }, rootEl.value)
}

onMounted(() => {
  if (prefersReducedMotion()) {
    // static page: show final states, no motion, no particles
    rootEl.value.querySelectorAll(".lv2-count").forEach((el) => {
      el.textContent = el.dataset.count
    })
    rootEl.value.querySelectorAll(".lv2-word").forEach((el) => { el.style.opacity = 1 })
    return
  }
  startSpores()
  initAnimations()
  initPointerFX()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(sporesRaf)
  sporeObserver?.disconnect()
  removeListeners.forEach((fn) => fn())
  ctx?.revert()
})
</script>

<style scoped>
/* ============ tokens ============ */
.lv2 {
  --ink: #070c0a;
  --ink-2: #0b1210;
  --ink-3: #101a16;
  --paper: #e9f0ea;
  --dim: #90a598;
  --moss: #6fdc9c;
  --ember: #ff9457;
  --line: rgba(233, 240, 234, 0.09);
  --font-display: "Sora", "Manrope", sans-serif;
  --font-body: "Manrope", "Segoe UI", sans-serif;
  --font-mono: "DM Mono", ui-monospace, monospace;

  position: relative;
  background:
    radial-gradient(1200px 800px at 85% -10%, rgba(111, 220, 156, 0.07), transparent 60%),
    radial-gradient(900px 700px at -10% 40%, rgba(255, 148, 87, 0.045), transparent 55%),
    var(--ink);
  color: var(--paper);
  font-family: var(--font-body);
  font-size: 17px;
  line-height: 1.65;
  overflow: clip;
}

/* subtle grain */
.lv2::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 60;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E");
}

.lv2 :is(h1, h2, h3) { font-family: var(--font-display); margin: 0; }
.lv2 p { margin: 0; }
.lv2 a { color: inherit; text-decoration: none; }
.lv2 img { display: block; max-width: 100%; height: auto; }

.lv2-mono { font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.16em; color: var(--dim); }
.lv2-accent { color: var(--moss); }
.lv2-ember { color: var(--ember); }

.lv2-kicker {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--moss);
  margin-bottom: 1.1rem;
}

.lv2-h1 {
  font-size: clamp(2.9rem, 8.2vw, 6.2rem);
  line-height: 1.02;
  font-weight: 700;
  letter-spacing: -0.035em;
}
.lv2-h2 {
  font-size: clamp(2rem, 4.6vw, 3.4rem);
  line-height: 1.08;
  font-weight: 700;
  letter-spacing: -0.025em;
}
.lv2-lead {
  max-width: 34rem;
  margin-top: 1.2rem;
  color: var(--dim);
  font-size: 1.06rem;
}

.lv2-hline { display: block; overflow: hidden; padding-bottom: 0.08em; }
.lv2-hline-in { display: inline-block; will-change: transform; }

/* ============ buttons ============ */
.lv2-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.95rem 1.7rem;
  border-radius: 999px;
  background: var(--moss);
  color: #06130c;
  font-weight: 700;
  font-size: 0.98rem;
  letter-spacing: -0.01em;
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 10px 40px -14px rgba(111, 220, 156, 0.55);
  min-height: 44px;
}
.lv2-btn:hover { background: #8ceab1; box-shadow: 0 14px 50px -12px rgba(111, 220, 156, 0.7); }
.lv2-btn-sm { padding: 0.55rem 1.15rem; font-size: 0.86rem; min-height: 40px; }

.lv2-link-quiet {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--dim);
  font-weight: 600;
  min-height: 44px;
  border-bottom: 1px solid transparent;
  transition: color 0.25s ease;
}
.lv2-link-quiet:hover { color: var(--paper); }

/* ============ nav ============ */
.lv2-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem clamp(1.1rem, 4vw, 3rem);
  transition: background-color 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease;
  border-bottom: 1px solid transparent;
}
.lv2-nav.is-scrolled {
  background: rgba(7, 12, 10, 0.72);
  border-bottom-color: var(--line);
  backdrop-filter: blur(14px) saturate(140%);
}
.lv2-nav-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: -0.02em;
}
.lv2-nav-links { display: flex; gap: 1.7rem; font-size: 0.92rem; color: var(--dim); }
.lv2-nav-links a { transition: color 0.2s ease; padding: 0.4rem 0; }
.lv2-nav-links a:hover { color: var(--paper); }
.lv2-nav-cta { display: flex; align-items: center; gap: 1.1rem; }
.lv2-nav-classic { font-size: 0.82rem; color: var(--dim); }
.lv2-nav-classic:hover { color: var(--paper); }

/* ============ hero ============ */
.lv2-spores {
  position: absolute;
  inset: 0 0 auto 0;
  height: 120vh;
  width: 100%;
  pointer-events: none;
  z-index: 1;
}
.lv2-hero {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  align-items: center;
  gap: clamp(2rem, 5vw, 4.5rem);
  min-height: 100svh;
  padding: clamp(6.5rem, 12vh, 9rem) clamp(1.1rem, 4vw, 3rem) 4rem;
  max-width: 1500px;
  margin: 0 auto;
}
.lv2-hero-sub { max-width: 30rem; margin-top: 1.6rem; color: var(--dim); font-size: 1.1rem; }
.lv2-hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 1.6rem; margin-top: 2.4rem; }

.lv2-hero-visual { position: relative; perspective: 1400px; }
.lv2-hero-frame {
  position: relative;
  border-radius: 18px;
  border: 1px solid var(--line);
  background: var(--ink-2);
  padding: 10px;
  transform-style: preserve-3d;
  box-shadow: 0 60px 120px -50px rgba(0, 0, 0, 0.85);
  will-change: transform;
}
.lv2-hero-frame > img { border-radius: 10px; }
.lv2-orb {
  position: absolute;
  inset: -18% -12%;
  z-index: -1;
  background: radial-gradient(closest-side, rgba(111, 220, 156, 0.16), transparent 70%);
  filter: blur(10px);
}
.lv2-chip {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: 0.7rem 1rem;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: rgba(11, 18, 16, 0.85);
  backdrop-filter: blur(10px);
  transform: translateZ(60px);
}
.lv2-chip-num { font-family: var(--font-mono); font-size: 1.25rem; color: var(--moss); }
.lv2-chip-label { font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--dim); }
.lv2-chip-a { top: -1.4rem; right: 8%; }
.lv2-chip-b { bottom: -1.6rem; left: 6%; }
.lv2-chip-b .lv2-chip-num { color: var(--ember); }

.lv2-scrollhint {
  position: absolute;
  bottom: 1.6rem;
  left: 50%;
  width: 1px;
  height: 56px;
  background: var(--line);
  overflow: hidden;
}
.lv2-scrollhint span {
  position: absolute;
  top: -40%;
  left: 0;
  width: 100%;
  height: 40%;
  background: var(--moss);
  animation: lv2-drip 2.2s ease-in-out infinite;
}
@keyframes lv2-drip { to { top: 110%; } }

/* ============ marquee ============ */
.lv2-marquee {
  position: relative;
  z-index: 2;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 1.05rem 0;
  overflow: hidden;
  background: rgba(11, 18, 16, 0.5);
}
.lv2-marquee-track { display: flex; width: max-content; animation: lv2-marquee 36s linear infinite; }
.lv2-marquee-group { display: flex; flex-shrink: 0; }
.lv2-marquee-item {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--dim);
  padding-right: 2.4rem;
  white-space: nowrap;
}
.lv2-marquee-item i { font-style: normal; color: var(--moss); padding-left: 2.4rem; }
@keyframes lv2-marquee { to { transform: translateX(-50%); } }

/* ============ sections ============ */
.lv2-section {
  position: relative;
  z-index: 2;
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(6rem, 14vh, 10rem) clamp(1.1rem, 4vw, 3rem) 2rem;
}
.lv2-branch { width: 74px; height: auto; margin: 0 auto 3rem; display: block; }
.lv2-branch-path { stroke: var(--moss); stroke-width: 2.4; opacity: 0.75; }
.lv2-branch-leaf { fill: var(--ember); }

/* modes: sticky stack */
.lv2-stack { margin-top: 4rem; display: flex; flex-direction: column; gap: 3.5rem; }
.lv2-mode {
  position: sticky;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: center;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: linear-gradient(160deg, var(--ink-3), var(--ink-2) 65%);
  padding: clamp(1.4rem, 3.5vw, 3rem);
  box-shadow: 0 40px 90px -50px rgba(0, 0, 0, 0.9);
  will-change: transform;
}
.lv2-mode-index {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--ember);
  letter-spacing: 0.2em;
}
.lv2-mode-copy h3 {
  font-size: clamp(1.7rem, 3vw, 2.4rem);
  letter-spacing: -0.02em;
  margin: 0.5rem 0 1rem;
}
.lv2-mode-copy > p { color: var(--dim); max-width: 26rem; }
.lv2-mode-copy ul { margin: 1.4rem 0 0; padding: 0; list-style: none; display: grid; gap: 0.55rem; }
.lv2-mode-copy li {
  position: relative;
  padding-left: 1.4rem;
  font-size: 0.95rem;
  color: var(--paper);
}
.lv2-mode-copy li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--moss);
}
.lv2-mode-shot img {
  border-radius: 14px;
  border: 1px solid var(--line);
}

/* showcase */
.lv2-showcase {
  position: relative;
  z-index: 2;
  padding: clamp(5rem, 12vh, 9rem) clamp(1.1rem, 4vw, 3rem);
  max-width: 1500px;
  margin: 0 auto;
}
.lv2-showcase-frame {
  border-radius: 22px;
  border: 1px solid var(--line);
  overflow: hidden;
  box-shadow: 0 70px 140px -60px rgba(0, 0, 0, 0.9);
  will-change: transform;
}
.lv2-showcase-caption {
  margin-top: 1.6rem;
  text-align: center;
  color: var(--dim);
  font-size: 0.95rem;
}

/* bento */
.lv2-bento {
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.1rem;
}
.lv2-tile {
  position: relative;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: var(--ink-2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease;
}
.lv2-tile:hover { transform: translateY(-6px); border-color: rgba(111, 220, 156, 0.35); }
.lv2-tile-wide { grid-column: span 2; }
.lv2-tile-head { padding: 1.7rem 1.7rem 1.2rem; }
.lv2-tile-head h3 { font-size: 1.18rem; letter-spacing: -0.015em; margin-bottom: 0.5rem; }
.lv2-tile-head p { color: var(--dim); font-size: 0.94rem; max-width: 34rem; }
.lv2-tile-img { margin: auto 0 0; padding: 0 0 0 1.7rem; }
.lv2-tile-img img {
  border-radius: 12px 0 0 0;
  border: 1px solid var(--line);
  border-right: 0;
  border-bottom: 0;
}
.lv2-tile-img-top img { object-fit: cover; object-position: top; max-height: 260px; width: 100%; }
.lv2-tile-quote { align-items: flex-start; justify-content: center; padding: 1.7rem; gap: 0.8rem; }
.lv2-tile-big {
  font-family: var(--font-mono);
  font-size: clamp(2.6rem, 4vw, 3.6rem);
  color: var(--moss);
  line-height: 1;
}
.lv2-tile-quote p { color: var(--dim); font-size: 0.94rem; }
.lv2-tile-text { padding: 1.7rem; justify-content: center; gap: 0.6rem; }
.lv2-tile-text h3 { font-size: 1.18rem; }
.lv2-tile-text p { color: var(--dim); font-size: 0.94rem; }

/* manifesto */
.lv2-manifesto {
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0 auto;
  padding: clamp(6rem, 16vh, 11rem) clamp(1.1rem, 4vw, 3rem);
  text-align: center;
}
.lv2-manifesto-text {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.4vw, 2.6rem);
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.02em;
}
.lv2-word { display: inline-block; }
.lv2-manifesto-notes {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.2rem 2.2rem;
  margin-top: 2.6rem;
}

/* stats */
.lv2-stats {
  position: relative;
  z-index: 2;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 clamp(1.1rem, 4vw, 3rem) clamp(4rem, 10vh, 7rem);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.1rem;
}
.lv2-stat {
  border-top: 1px solid var(--line);
  padding-top: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.lv2-stat-num {
  font-family: var(--font-mono);
  font-size: clamp(2.6rem, 5vw, 4rem);
  color: var(--moss);
  line-height: 1;
}
.lv2-stat-label { color: var(--dim); font-size: 0.92rem; }

/* cta */
.lv2-cta {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: clamp(5rem, 14vh, 9rem) clamp(1.1rem, 4vw, 3rem);
  border-top: 1px solid var(--line);
  background:
    radial-gradient(700px 400px at 50% 110%, rgba(111, 220, 156, 0.1), transparent 65%),
    var(--ink);
}
.lv2-cta-logo { margin: 0 auto 1.6rem; }
.lv2-cta .lv2-lead { margin-left: auto; margin-right: auto; }
.lv2-cta-actions { justify-content: center; margin-top: 2.6rem; }

/* footer */
.lv2-footer {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.2rem;
  padding: 1.8rem clamp(1.1rem, 4vw, 3rem);
  border-top: 1px solid var(--line);
  font-size: 0.86rem;
  color: var(--dim);
}
.lv2-footer-brand { display: flex; align-items: center; gap: 0.6rem; font-weight: 700; color: var(--paper); }
.lv2-footer-dim { color: var(--dim); font-weight: 400; }
.lv2-footer-links { display: flex; flex-wrap: wrap; gap: 0.4rem 1.4rem; }
.lv2-footer-links a { padding: 0.35rem 0; transition: color 0.2s ease; }
.lv2-footer-links a:hover { color: var(--paper); }

/* ============ responsive ============ */
@media (max-width: 1023px) {
  .lv2-nav-links { display: none; }
  .lv2-hero {
    grid-template-columns: 1fr;
    min-height: auto;
    padding-top: 7rem;
    gap: 3.5rem;
  }
  .lv2-hero-visual { max-width: 640px; }
  .lv2-mode { grid-template-columns: 1fr; }
  .lv2-mode-shot { order: -1; }
  .lv2-bento { grid-template-columns: 1fr 1fr; }
  .lv2-tile-wide { grid-column: span 2; }
}

@media (max-width: 639px) {
  .lv2 { font-size: 16px; }
  .lv2-nav-classic { display: none; }
  .lv2-bento { grid-template-columns: 1fr; }
  .lv2-tile-wide { grid-column: span 1; }
  .lv2-stats { grid-template-columns: 1fr; gap: 2rem; }
  .lv2-chip-a { top: -1rem; right: 4%; }
  .lv2-chip-b { bottom: -1.1rem; left: 3%; }
  .lv2-hero-actions { gap: 1.1rem; }
  .lv2-scrollhint { display: none; }
  .lv2-mode { position: static; }
}

/* reduced motion: kill the ambient loops */
@media (prefers-reduced-motion: reduce) {
  .lv2-marquee-track { animation: none; }
  .lv2-scrollhint span { animation: none; }
  .lv2-spores { display: none; }
}
</style>
