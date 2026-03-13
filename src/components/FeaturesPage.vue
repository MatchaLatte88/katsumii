<template>
  <div
    :class="[
      theme === 'light'
        ? 'relative overflow-x-hidden min-h-screen bg-slate-50 text-gray-900'
        : 'relative overflow-x-hidden min-h-screen bg-slate-950 text-slate-100',
    ]"
  >
    <div class="k-bg" :class="theme === 'light' ? 'k-bg-light' : 'k-bg-dark'" aria-hidden="true">
      <div class="k-bg-gradient" />
      <svg class="k-bg-grid" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="hc-features" x="0" y="0" width="69.28" height="60" patternUnits="userSpaceOnUse">
            <path d="M34.64,0 L51.96,10 L51.96,30 L34.64,40 L17.32,30 L17.32,10 Z M0,0 L17.32,10 M17.32,30 L0,40 M51.96,10 L69.28,0 M69.28,40 L51.96,30 M34.64,40 L34.64,60 M0,40 L0,60" style="fill:none;stroke:var(--hc-stroke);stroke-width:1.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hc-features)"/>
      </svg>
      <div class="k-bg-band" />
    </div>
    <AppNav
      :theme="theme"
      :navigation="navigation"
      brand-title="Katsumii"
      brand-subtitle="Feature Overview"
      :brand-href="baseUrl"
      @toggle-theme="toggleTheme"
    />

    <!-- ─────────────────────────────────────────────────────────── -->
    <!-- HERO                                                        -->
    <!-- ─────────────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden px-6 pb-0 pt-28 lg:px-10">
      <!-- Ambient glow -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full blur-[140px]"
        :class="theme === 'light' ? 'bg-teal-200/35' : 'bg-cyan-500/8'"
      />

      <div class="relative mx-auto max-w-6xl">
        <!-- Two-column headline row -->
        <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-2xl">
            <p
              class="hero-label text-sm font-semibold uppercase tracking-[0.2em]"
              :class="theme === 'light' ? 'text-teal-700' : 'text-cyan-400'"
            >
              Feature Deep Dive
            </p>
            <h1
              class="hero-title mt-4 text-5xl font-semibold tracking-[-0.02em] sm:text-6xl lg:text-7xl"
              :class="theme === 'light' ? 'text-gray-900' : 'text-slate-100'"
            >
              Built for how<br />
              traders actually<br />
              <span :class="theme === 'light' ? 'text-teal-600' : 'text-cyan-400'">work.</span>
            </h1>
          </div>

          <div class="hero-meta lg:max-w-xs lg:pb-2">
            <p
              class="text-sm leading-relaxed"
              :class="theme === 'light' ? 'text-gray-500' : 'text-slate-400'"
            >
              Statt nur Features aufzulisten zeigt diese Seite die wichtigsten Bereiche von Katsumii
              direkt mit echten Screens — damit Struktur, Nutzen und Qualität sofort greifbar werden.
            </p>
            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="tag in featureTags"
                :key="tag"
                class="rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
                :class="
                  theme === 'light'
                    ? 'border-teal-200 bg-teal-50 text-teal-700'
                    : 'border-cyan-400/20 bg-cyan-400/8 text-cyan-300'
                "
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- Hero screenshot — full width, bleeds to bottom -->
        <div
          class="hero-screen mt-14 overflow-hidden rounded-t-[2rem] border-x border-t"
          :class="theme === 'light' ? 'border-gray-200' : 'border-blue-400/20'"
        >
          <!-- Window chrome bar -->
          <div
            class="flex items-center gap-1.5 border-b px-4 py-3"
            :class="
              theme === 'light'
                ? 'border-gray-200 bg-gray-100'
                : 'border-blue-400/15 bg-slate-900'
            "
          >
            <span class="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span class="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span class="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <span
              class="ml-4 rounded-md px-10 py-1 text-[11px]"
              :class="
                theme === 'light'
                  ? 'bg-white text-gray-400'
                  : 'bg-slate-800 text-slate-500'
              "
            >katsumii.app</span>
          </div>
          <img
            :src="assetUrl('Slide1.png')"
            alt="Katsumii – full system overview"
            class="w-full"
          />
        </div>
      </div>
    </section>

    <!-- ─────────────────────────────────────────────────────────── -->
    <!-- STICKY FEATURE NAV                                         -->
    <!-- ─────────────────────────────────────────────────────────── -->
    <div
      class="feature-nav sticky top-0 z-10 overflow-x-auto border-b"
      :class="
        theme === 'light'
          ? 'border-gray-200 bg-slate-50/90 backdrop-blur-md'
          : 'border-slate-800/60 bg-slate-950/90 backdrop-blur-md'
      "
    >
      <div class="mx-auto flex max-w-6xl items-center px-6 lg:px-10">
        <a
          v-for="feature in features"
          :key="feature.id"
          :href="`#${feature.id}`"
          class="nav-tab shrink-0 border-b-2 px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200"
          :class="
            theme === 'light'
              ? 'border-transparent text-gray-400 hover:border-teal-500 hover:text-gray-700'
              : 'border-transparent text-slate-500 hover:border-cyan-400 hover:text-slate-200'
          "
        >
          <span class="mr-1.5 opacity-50">{{ feature.num }}</span>
          {{ feature.eyebrow }}
        </a>
      </div>
    </div>

    <!-- ─────────────────────────────────────────────────────────── -->
    <!-- FEATURE CHAPTERS                                           -->
    <!-- ─────────────────────────────────────────────────────────── -->
    <section class="px-6 lg:px-10">
      <div class="mx-auto max-w-6xl">
        <article
          v-for="(feature, i) in features"
          :key="feature.id"
          :id="feature.id"
          class="feature-chapter py-20 lg:py-28"
          :class="
            i < features.length - 1
              ? theme === 'light'
                ? 'border-b border-gray-100'
                : 'border-b border-slate-800/50'
              : ''
          "
          :data-index="i"
        >
          <div
            class="flex flex-col gap-10 lg:grid lg:gap-16"
            :class="i % 2 === 0 ? 'lg:grid-cols-[1fr_1.6fr]' : 'lg:grid-cols-[1.6fr_1fr]'"
          >
            <!-- TEXT BLOCK -->
            <div
              class="chapter-text flex flex-col justify-center"
              :class="i % 2 === 0 ? 'order-2 lg:order-1' : 'order-2 lg:order-2'"
            >
              <div class="flex items-center gap-3">
                <span
                  class="font-mono text-[11px] font-bold tracking-[0.2em] opacity-40"
                  :class="theme === 'light' ? 'text-gray-900' : 'text-slate-100'"
                >{{ feature.num }}</span>
                <div
                  class="h-px max-w-[32px] flex-1"
                  :class="theme === 'light' ? 'bg-gray-300' : 'bg-slate-700'"
                />
                <span
                  class="text-xs font-semibold uppercase tracking-[0.16em]"
                  :class="theme === 'light' ? 'text-teal-700' : 'text-cyan-400'"
                >{{ feature.eyebrow }}</span>
              </div>

              <h2
                class="mt-5 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl"
                :class="theme === 'light' ? 'text-gray-900' : 'text-slate-100'"
              >
                {{ feature.title }}
              </h2>

              <p
                class="mt-5 text-[0.9375rem] leading-relaxed"
                :class="theme === 'light' ? 'text-gray-500' : 'text-slate-400'"
              >
                {{ feature.description }}
              </p>

              <ul class="mt-8 space-y-3">
                <li v-for="point in feature.points" :key="point" class="flex items-start gap-3">
                  <span
                    class="mt-[7px] h-1 w-4 shrink-0 rounded-full"
                    :class="theme === 'light' ? 'bg-teal-400' : 'bg-cyan-500'"
                  />
                  <span
                    class="text-sm leading-relaxed"
                    :class="theme === 'light' ? 'text-gray-600' : 'text-slate-300'"
                  >{{ point }}</span>
                </li>
              </ul>

              <div class="mt-8">
                <span
                  class="inline-flex rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]"
                  :class="
                    theme === 'light'
                      ? 'border-teal-200 bg-teal-50 text-teal-600'
                      : 'border-cyan-400/20 bg-cyan-400/8 text-cyan-400'
                  "
                >{{ feature.badge }}</span>
              </div>
            </div>

            <!-- SCREENSHOT BLOCK -->
            <div
              class="chapter-image relative"
              :class="i % 2 === 0 ? 'order-1 lg:order-2' : 'order-1 lg:order-1'"
            >
              <!-- Ghost chapter number -->
              <span
                aria-hidden="true"
                class="pointer-events-none absolute -top-6 select-none font-mono text-[7rem] font-black leading-none opacity-[0.04] lg:-top-10 lg:text-[10rem]"
                :class="[
                  i % 2 === 0 ? '-right-4 lg:-right-6' : '-left-4 lg:-left-6',
                  theme === 'light' ? 'text-gray-900' : 'text-slate-100',
                ]"
              >{{ feature.num }}</span>

              <!-- Screenshot frame -->
              <div
                class="overflow-hidden rounded-[1.75rem] border transition-all duration-500"
                :class="
                  theme === 'light'
                    ? 'border-gray-200 shadow-[0_32px_80px_-20px_rgba(15,23,42,0.18)]'
                    : 'border-blue-400/15 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.7)]'
                "
              >
                <img
                  :src="assetUrl(feature.image)"
                  :alt="feature.alt"
                  class="w-full"
                  loading="lazy"
                />
              </div>

              <!-- Floating "Live screen" badge -->
              <div
                class="absolute -bottom-3 right-4 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
                :class="
                  theme === 'light'
                    ? 'border-gray-200 bg-white text-gray-400 shadow-sm'
                    : 'border-slate-700/80 bg-slate-900 text-slate-500'
                "
              >
                Live screen
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- ─────────────────────────────────────────────────────────── -->
    <!-- CTA                                                         -->
    <!-- ─────────────────────────────────────────────────────────── -->
    <section class="px-6 pb-24 pt-10 lg:px-10">
      <div class="mx-auto max-w-6xl">
        <div
          class="cta-block relative overflow-hidden rounded-[2.5rem] border px-8 py-16 text-center sm:px-12"
          :class="
            theme === 'light'
              ? 'border-gray-200 bg-white shadow-[0_30px_80px_-20px_rgba(15,23,42,0.1)]'
              : 'border-slate-800/60 bg-slate-900/60 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]'
          "
        >
          <div
            aria-hidden="true"
            class="pointer-events-none absolute left-1/2 top-0 h-64 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
            :class="theme === 'light' ? 'bg-teal-100/80' : 'bg-cyan-500/6'"
          />

          <div class="relative">
            <p
              class="text-xs font-semibold uppercase tracking-[0.2em]"
              :class="theme === 'light' ? 'text-teal-700' : 'text-cyan-400'"
            >
              That's the full picture
            </p>
            <h3
              class="mt-4 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl"
              :class="theme === 'light' ? 'text-gray-900' : 'text-slate-100'"
            >
              Ready to see it live?
            </h3>
            <p
              class="mx-auto mt-5 max-w-lg text-[0.9375rem] leading-relaxed"
              :class="theme === 'light' ? 'text-gray-500' : 'text-slate-400'"
            >
              Zurück auf der Landingpage bekommst du den kompakten Produktüberblick —
              oder spring direkt zum Pricing.
            </p>
            <div class="mt-9 flex flex-wrap justify-center gap-3">
              <a
                :href="baseUrl"
                class="rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300"
                :class="
                  theme === 'light'
                    ? 'bg-gray-900 text-white hover:bg-gray-700 hover:shadow-lg'
                    : 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.5)]'
                "
              >
                Back to Overview
              </a>
              <a
                :href="`${baseUrl}#pricing`"
                class="rounded-full border px-7 py-3 text-sm font-semibold transition-all duration-300"
                :class="
                  theme === 'light'
                    ? 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    : 'border-slate-700/80 bg-transparent text-slate-300 hover:border-slate-500 hover:bg-slate-800/50'
                "
              >
                Go to Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue"
import AppNav from "./AppNav.vue"

const baseUrl = import.meta.env.BASE_URL
const assetUrl = (path) => `${baseUrl}${path.replace(/^\/+/, "")}`

const navigation = [
  { name: "Back Home", href: baseUrl },
  { name: "Pricing", href: `${baseUrl}#pricing` },
  { name: "FAQ", href: `${baseUrl}?page=faq` },
]

const featureTags = ["Offline-first", "Prop-ready", "Structured Reviews", "Actionable Analytics"]

const features = [
  {
    id: "journaling",
    num: "01",
    eyebrow: "Core Workflow",
    badge: "Essential",
    title: "Structured journaling",
    image: "Slide3.png",
    alt: "Katsumii structured journaling",
    description:
      "Trade-Dokumentation mit Screenshots, Kontext und Review-Disziplin. Kein loses Notizchaos — sondern ein klarer Entry-Flow, der sich anfühlt wie ein Profi-Prozess.",
    points: [
      "Screenshots, Notizen und Setup-Kontext in einem einzigen Flow.",
      "Fehler und Erkenntnisse direkt pro Trade festhalten.",
      "Solide Grundlage für Wochen- und Monatsreviews.",
    ],
  },
  {
    id: "accounts",
    num: "02",
    eyebrow: "Account Control",
    badge: "Pro",
    title: "Prop & personal account clarity",
    image: "Slide4.png",
    alt: "Katsumii prop account overview",
    description:
      "Mehrere Accounts, Prop-Regeln und persönliche Limits — alles in einer gemeinsamen Struktur. Kein Wechseln zwischen Tools, kein Kontext-Verlust.",
    points: [
      "Prop-Regeln und persönliche Konten gemeinsam verwalten.",
      "Limit- und Risiko-Kontext immer im Blick.",
      "Status und Fortschritt bleiben auch bei mehreren Accounts klar.",
    ],
  },
  {
    id: "analytics",
    num: "03",
    eyebrow: "Analytics",
    badge: "Insight",
    title: "Performance insights that stay practical",
    image: "Slide2.png",
    alt: "Katsumii analytics",
    description:
      "Auswertungen die nicht nur schön aussehen, sondern konkrete Entscheidungen ermöglichen. Analyse nach Setup, Session-Typ und wiederkehrenden Mustern.",
    points: [
      "Edge, Konstanz und Prozessqualität messbar machen.",
      "Fehlerbilder erkennen bevor sie teuer werden.",
      "Optimierung auf Datenbasis statt Bauchgefühl.",
    ],
  },
  {
    id: "calendar",
    num: "04",
    eyebrow: "Review System",
    badge: "Review",
    title: "Calendar & history view",
    image: "Slide5.png",
    alt: "Katsumii calendar and history",
    description:
      "Trading-Tage, PnL-Muster und Aktivitätszyklen auf einen Blick. Der Zeitverlauf macht sichtbar, was im Tagesrauschen unsichtbar bleibt.",
    points: [
      "Monatsbild für schnelle Pattern-Erkennung.",
      "Reviews werden präziser durch lückenlose Historie.",
      "Tagesergebnisse im größeren Prozess eingebettet.",
    ],
  },
]

// ── Theme ──────────────────────────────────────────────────────────
const theme = ref("light")

const applyTheme = (value) => {
  theme.value = value
  localStorage.setItem("katsumii-theme", value)
}

const toggleTheme = () => {
  applyTheme(theme.value === "dark" ? "light" : "dark")
}

onMounted(() => {
  const savedTheme = localStorage.getItem("katsumii-theme")
  if (savedTheme === "light" || savedTheme === "dark") {
    theme.value = savedTheme
  }

  // ── Hero entrance (staggered timeouts) ────────────────────────
  const heroEls = [
    [".hero-label", 0],
    [".hero-title", 80],
    [".hero-meta", 180],
    [".hero-screen", 300],
    [".feature-nav", 480],
  ]
  heroEls.forEach(([sel, delay]) => {
    const el = document.querySelector(sel)
    if (!el) return
    setTimeout(() => el.classList.add("is-visible"), delay)
  })

  // ── Chapter scroll-reveal ──────────────────────────────────────
  const chapterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const chapter = entry.target
        const text = chapter.querySelector(".chapter-text")
        const image = chapter.querySelector(".chapter-image")
        setTimeout(() => text?.classList.add("is-visible"), 0)
        setTimeout(() => image?.classList.add("is-visible"), 130)
        chapterObserver.unobserve(chapter)
      })
    },
    { threshold: 0.1 }
  )
  document.querySelectorAll(".feature-chapter").forEach((el) => chapterObserver.observe(el))

  // ── CTA reveal ────────────────────────────────────────────────
  const ctaObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
          ctaObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )
  const cta = document.querySelector(".cta-block")
  if (cta) ctaObserver.observe(cta)

  // ── Active nav tab highlight on scroll ────────────────────────
  const tabs = document.querySelectorAll(".nav-tab")
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          tabs.forEach((tab) => {
            const isActive = tab.getAttribute("href") === `#${id}`
            tab.classList.toggle("nav-active", isActive)
          })
        }
      })
    },
    { threshold: 0.45 }
  )
  document.querySelectorAll(".feature-chapter").forEach((el) => navObserver.observe(el))
})

watch(theme, (value) => {
  document.documentElement.classList.toggle("dark", value === "dark")
})
</script>

<style scoped>
.k-bg {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}
.k-bg-dark { --orb-a: rgba(59,130,246,0.28); --orb-b: rgba(34,211,238,0.22); --hc-stroke: rgba(34,211,238,0.02); }
.k-bg-light { --orb-a: rgba(6,182,212,0.16); --orb-b: rgba(59,130,246,0.12); --hc-stroke: rgba(8,145,178,0.04); }
.k-bg-gradient {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 70% 55% at 8% 18%, var(--orb-a), transparent 60%),
    radial-gradient(ellipse 55% 45% at 88% 80%, var(--orb-b), transparent 55%);
}
.k-bg-grid {
  position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.8;
  mask-image: linear-gradient(180deg, transparent 0%, black 12%, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, black 12%, black 80%, transparent 100%);
}
.k-bg-band {
  position: absolute; top: -30%; right: 0; width: 52%; height: 160%;
  background: linear-gradient(to bottom, transparent, rgba(34,211,238,0.018) 40%, transparent);
  transform: skewX(-6deg); border-left: 1px solid rgba(34,211,238,0.055); transform-origin: top right;
}

/* ── Hero entrance ────────────────────────────────────────────── */
.hero-label,
.hero-title,
.hero-meta,
.feature-nav {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-screen {
  opacity: 0;
  transform: translateY(36px) scale(0.985);
  transition:
    opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

.feature-nav { transform: none; }

.hero-label.is-visible,
.hero-title.is-visible,
.hero-meta.is-visible,
.feature-nav.is-visible { opacity: 1; transform: translateY(0); }

.hero-screen.is-visible { opacity: 1; transform: translateY(0) scale(1); }

/* ── Chapter scroll-reveal ────────────────────────────────────── */
.chapter-text {
  opacity: 0;
  transform: translateX(-24px);
  transition:
    opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
}

.chapter-image {
  opacity: 0;
  transform: translateX(24px);
  transition:
    opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Flip directions for even chapters (image is on the left) */
.feature-chapter:nth-child(even) .chapter-text  { transform: translateX(24px); }
.feature-chapter:nth-child(even) .chapter-image { transform: translateX(-24px); }

.chapter-text.is-visible,
.chapter-image.is-visible { opacity: 1; transform: translateX(0); }

/* ── CTA ──────────────────────────────────────────────────────── */
.cta-block {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.cta-block.is-visible { opacity: 1; transform: translateY(0); }

/* ── Active nav tab ───────────────────────────────────────────── */
.nav-tab.nav-active {
  color: rgb(34 211 238); /* cyan-400 */
  border-color: rgb(34 211 238);
}

/* Light theme override for active tab */
:global(.bg-slate-50) .nav-tab.nav-active {
  color: rgb(15 118 110); /* teal-700 */
  border-color: rgb(15 118 110);
}
</style>

