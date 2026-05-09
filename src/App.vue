<template>
  <div :class="pageClass">
    <KbBackground :pattern="bg" :isDark="theme === 'dark'" />

    <AppNav
      :theme="theme"
      :bg="bg"
      :navigation="navigation"
      brand-title="Katsumii"
      :brand-subtitle="t('brand.subtitle')"
      brand-href="#top"
      @toggle-theme="toggleTheme"
      @change-bg="changeBg"
    />

    <main>
      <HomeHero
        :theme="theme"
        :asset-url="assetUrl"
      />
      <HomeFeatures :theme="theme" :asset-url="assetUrl" />
      <HomeShowcase :theme="theme" :asset-url="assetUrl" />
      <HomeDemoCta :theme="theme" />
    </main>

    <HomeFooter
      :theme="theme"
      :asset-url="assetUrl"
      :checkout-url="checkoutUrl"
      :link-target="linkTarget"
      :link-rel="linkRel"
    />
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue"
import { useI18n } from "vue-i18n"
import AppNav from "./components/AppNav.vue"
import KbBackground from "./backgrounds/KbBackground.vue"
import HomeDemoCta from "./components/home/HomeDemoCta.vue"
import HomeFeatures from "./components/home/HomeFeatures.vue"
import HomeFooter from "./components/home/HomeFooter.vue"
import HomeHero from "./components/home/HomeHero.vue"
import HomeShowcase from "./components/home/HomeShowcase.vue"
import { pagePath } from "./utils/routes.js"

const { t } = useI18n()

const BG_MIGRATE = { flow: 'lines', stars: 'lines', sky: 'honeycomb', seasonal: 'honeycomb' }
const _savedBg = localStorage.getItem('katsumii-bg') || 'lines'
const _isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768
const bg = ref(_isMobile ? 'honeycomb' : (BG_MIGRATE[_savedBg] ?? _savedBg))

const changeBg = (val) => {
  bg.value = val
  localStorage.setItem('katsumii-bg', val)
}

const baseUrl = import.meta.env.BASE_URL
const assetUrl = (path) => `${baseUrl}${path.replace(/^\/+/, "")}`
const checkoutUrl = baseUrl

const navigation = computed(() => [
  { name: t('nav.top'), href: "#top" },
  { name: t('nav.showcase'), href: "#features" },
  { name: t('nav.features'), href: pagePath("features") },
  { name: t('nav.pricing'), href: pagePath("pricing") },
  { name: "Manual", href: pagePath("manual") },
])

const getInitialTheme = () => {
  const saved = localStorage.getItem('katsumii-theme')
  if (saved === 'light' || saved === 'dark') return saved
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
  return 'dark'
}

const theme = ref(getInitialTheme())
const observer = ref(null)

const isExternalLink = (href) => {
  if (!href) return false
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return true

  const url = new URL(href, window.location.origin)
  return url.origin !== window.location.origin
}

const linkTarget = (href) => (isExternalLink(href) ? "_blank" : undefined)
const linkRel = (href) => (isExternalLink(href) ? "noreferrer noopener" : undefined)

const applyTheme = (value) => {
  theme.value = value
  localStorage.setItem("katsumii-theme", value)
}

const toggleTheme = () => {
  applyTheme(theme.value === "dark" ? "light" : "dark")
}

const pageClass = computed(() =>
  theme.value === "light"
    ? "k-page-light relative min-h-screen overflow-x-hidden bg-slate-50 text-gray-900 transition-colors duration-300"
    : "k-page-dark relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100 transition-colors duration-300"
)

const setupRevealAnimations = () => {
  observer.value?.disconnect()

  const revealItems = Array.from(document.querySelectorAll(".reveal"))
  const revealGroups = document.querySelectorAll("section, footer")

  revealGroups.forEach((group) => {
    const groupItems = group.querySelectorAll(".reveal")
    groupItems.forEach((item, index) => {
      const delay = Math.min(index * 90, 420)
      item.style.setProperty("--reveal-delay", `${delay}ms`)
    })
  })

  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
          observer.value?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  )

  revealItems.forEach((item) => {
    if (item.classList.contains("is-visible")) return

    const rect = item.getBoundingClientRect()
    const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.08

    if (inView) {
      item.classList.add("is-visible")
      return
    }

    observer.value?.observe(item)
  })
}

onMounted(() => {
  nextTick(setupRevealAnimations)
})

onUnmounted(() => {
  observer.value?.disconnect()
})

watch(theme, (value) => {
  document.documentElement.classList.toggle("dark", value === "dark")
  nextTick(setupRevealAnimations)
})
</script>

<style>
.hero-section::before {
  position: absolute;
  inset: 7rem max(1rem, calc((100vw - 80rem) / 2)) auto;
  height: clamp(18rem, 34vw, 30rem);
  content: "";
  border-radius: 999px;
  background:
    radial-gradient(circle at 26% 35%, rgba(20, 184, 166, 0.18), transparent 34%),
    radial-gradient(circle at 72% 42%, rgba(34, 211, 238, 0.15), transparent 38%);
  filter: blur(44px);
  opacity: 0.85;
  pointer-events: none;
}

.k-page-light .hero-section::before {
  display: none;
}

.hero-logo {
  filter: drop-shadow(0 20px 30px rgba(15, 118, 110, 0.18));
}

.hero-visual::before {
  position: absolute;
  inset: 8% -5% auto auto;
  width: 42%;
  aspect-ratio: 1;
  content: "";
  border-radius: 999px;
  background: rgba(45, 212, 191, 0.18);
  filter: blur(62px);
  pointer-events: none;
}

.k-page-light .hero-visual::before {
  display: none;
}

.k-card {
  backdrop-filter: blur(14px);
}

.section-band {
  position: relative;
}

.section-band::before {
  position: absolute;
  inset: 0;
  content: "";
  background: linear-gradient(180deg, transparent, rgba(15, 23, 42, 0.025) 48%, transparent);
  pointer-events: none;
}

.k-page-light .section-band::before {
  display: none;
}

.feature-spotlight {
  position: relative;
}

.feature-spotlight::after {
  position: absolute;
  inset: 0;
  content: "";
  background:
    linear-gradient(135deg, rgba(20, 184, 166, 0.09), transparent 36%),
    radial-gradient(circle at 95% 8%, rgba(34, 211, 238, 0.16), transparent 30%);
  pointer-events: none;
}

.k-page-light .feature-spotlight::after {
  display: none;
}

.feature-card {
  min-height: 14.25rem;
}

.screenshot-shell img {
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.screenshot-shell:hover img {
  transform: scale(1.012);
}

.typed-cursor {
  display: inline-block;
  font-weight: 300;
  margin-left: 0.02em;
  animation: typedCursorBlink 0.75s step-end infinite;
}

@keyframes typedCursorBlink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

.feature-marquee {
  animation: feature-marquee 30s linear infinite;
}

.reveal {
  opacity: 0;
  filter: blur(6px);
  transform: translate3d(0, 26px, 0) scale(0.985);
  transition:
    opacity 0.78s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.78s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.78s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--reveal-delay, 0ms);
  will-change: transform, opacity, filter;
}

.reveal.is-visible {
  opacity: 1;
  filter: blur(0);
  transform: translate3d(0, 0, 0) scale(1);
}

@keyframes feature-marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
    filter: none;
  }

  .feature-marquee {
    animation: none;
  }

  .screenshot-shell:hover img {
    transform: none;
  }
}

@media (max-width: 900px) {
  .hero-section::before {
    top: 5rem;
    height: 22rem;
  }
}

@media (max-width: 640px) {
  .feature-card {
    min-height: auto;
  }
}
</style>
