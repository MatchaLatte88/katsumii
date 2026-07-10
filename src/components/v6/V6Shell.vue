<template>
  <div ref="rootEl" class="v6" :class="{ light: !isDark, 'v6-landing-shell': isLandingRoute }" :style="accentStyle">
    <canvas ref="glEl" class="v6-gl" :class="{ dim: route.meta.v6DimBg, off: route.meta.v6NoBg }" aria-hidden="true"></canvas>
    <div class="v6-noise" aria-hidden="true"></div>
    <div class="v6-progress" aria-hidden="true"><span ref="progressEl"></span></div>

    <PreviewNoticeModal v-if="isLandingRoute" />

    <div class="v6-bgswitch" role="group" aria-label="Background style">
      <button
        v-for="option in V6_BG_OPTIONS"
        :key="option.key"
        type="button"
        :class="{ active: bgMode === option.key }"
        :aria-pressed="bgMode === option.key"
        @click="setBg(option.key)"
      >
        {{ option.label }}
      </button>
    </div>

    <!-- NAV -->
    <header ref="navEl" class="v6-nav" :class="{ scrolled }">
      <RouterLink class="v6-brand" :to="`/${lang}/app`">
        <img :src="asset('logo.png')" alt="Katsumii logo" width="32" height="32" />
        <span>Katsumii<b class="v6-dot" aria-hidden="true">.</b></span>
      </RouterLink>

      <nav class="v6-nav-links" aria-label="Main navigation">
        <div class="v6-nav-drop">
          <RouterLink :to="`/${lang}/features`" aria-haspopup="true">Features</RouterLink>
          <div class="v6-nav-menu" role="menu" aria-label="Feature pages">
            <p class="v6-nav-menu-head" aria-hidden="true">Four disciplines</p>
            <RouterLink
              v-for="(item, index) in FEATURE_PAGES"
              :key="item.path"
              role="menuitem"
              :to="`/${lang}/${item.path}`"
            >
              <span
                class="v6-nav-menu-idx"
                :style="{ color: isDark ? item.dot.dark : item.dot.light }"
                aria-hidden="true"
              >
                0{{ index + 1 }}
              </span>
              <span class="v6-nav-menu-text">
                {{ item.label }}
                <small>{{ item.sub }}</small>
              </span>
              <svg class="v6-nav-menu-arrow" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true">
                <path d="M2.5 6h7M6.6 3.1 9.5 6l-2.9 2.9" />
              </svg>
            </RouterLink>
          </div>
        </div>
        <RouterLink :to="`/${lang}/pricing`">Pricing</RouterLink>
        <RouterLink :to="`/${lang}/manual`">Manual</RouterLink>
        <RouterLink :to="`/${lang}/faq`">FAQ</RouterLink>
      </nav>

      <div class="v6-nav-right">
        <button
          ref="menuToggleEl"
          type="button"
          class="v6-theme"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
        >
          <svg v-if="isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
            <circle cx="12" cy="12" r="4.4" />
            <path d="M12 2.8v2.2M12 19v2.2M2.8 12h2.2M19 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.4 14.2A8.4 8.4 0 0 1 9.8 3.6a8.4 8.4 0 1 0 10.6 10.6z" />
          </svg>
        </button>
        <RouterLink class="v6-nav-ghost" :to="`/${lang}/contact`">Contact</RouterLink>
        <span class="v6-btn v6-btn-sm v6-btn-static" aria-disabled="true">Coming soon</span>
        <button
          type="button"
          class="v6-menu-toggle"
          :class="{ active: mobileOpen }"
          :aria-expanded="mobileOpen"
          aria-controls="v6-mobile-menu"
          :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
          @click="mobileOpen = !mobileOpen"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <Transition name="v6-mobile-menu">
      <div v-if="mobileOpen" id="v6-mobile-menu" class="v6-mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
        <button class="v6-mobile-backdrop" type="button" aria-label="Close menu" @click="mobileOpen = false"></button>
        <nav ref="mobilePanelEl" class="v6-mobile-panel" aria-label="Mobile navigation">
          <p class="v6-mobile-kicker">Explore Katsumii</p>
          <RouterLink :to="`/${lang}/features`" class="v6-mobile-primary">Features <span>→</span></RouterLink>
          <div class="v6-mobile-disciplines">
            <RouterLink
              v-for="(item, index) in FEATURE_PAGES"
              :key="item.path"
              :to="`/${lang}/${item.path}`"
            >
              <span class="v6-mobile-index" :style="{ color: isDark ? item.dot.dark : item.dot.light }">0{{ index + 1 }}</span>
              <span><b>{{ item.label }}</b><small>{{ item.sub }}</small></span>
            </RouterLink>
          </div>
          <div class="v6-mobile-links">
            <RouterLink :to="`/${lang}/pricing`">Pricing</RouterLink>
            <RouterLink :to="`/${lang}/manual`">Manual</RouterLink>
            <RouterLink :to="`/${lang}/faq`">FAQ</RouterLink>
            <RouterLink :to="`/${lang}/contact`">Contact</RouterLink>
          </div>
          <span class="v6-btn v6-btn-static" aria-disabled="true">Coming soon</span>
          <p class="v6-mobile-note">Local. Offline. Entirely yours.</p>
        </nav>
      </div>
    </Transition>

    <slot />

    <footer class="v6-footer">
      <p>© {{ year }} Katsumii — local & offline trading journal</p>
      <nav aria-label="Legal">
        <RouterLink :to="`/${lang}/contact`">Contact</RouterLink>
        <RouterLink :to="`/${lang}/privacy`">Privacy</RouterLink>
        <RouterLink :to="`/${lang}/terms`">Terms</RouterLink>
        <RouterLink :to="`/${lang}/impressum`">Impressum</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup>
import { computed, inject, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { createV6Background, V6_BG_OPTIONS } from "../../v6/gl.js"
import { initMagnetic, prefersReducedMotion } from "../../v6/motion.js"
import { normalizeLocale } from "../../utils/routes.js"
import PreviewNoticeModal from "./PreviewNoticeModal.vue"

const baseUrl = import.meta.env.BASE_URL
const asset = (path) => `${baseUrl}${path}`
const year = new Date().getFullYear()

/* Discipline pages in the Features dropdown — dots mirror V6_ACCENTS in router.js */
const FEATURE_PAGES = [
  { label: "Funded", sub: "Live prop accounts", path: "funded-accounts", dot: { dark: "#22d3ee", light: "#0369a1" } },
  { label: "Challenge", sub: "Evaluations & combines", path: "prop-firm-challenges", dot: { dark: "#facc15", light: "#ab7503" } },
  { label: "Personal", sub: "Own capital", path: "personal-trading", dot: { dark: "#4ade80", light: "#047857" } },
  { label: "Backtest", sub: "Sessions & replay", path: "backtesting", dot: { dark: "#818cf8", light: "#6d28d9" } },
]

const route = useRoute()
const isDark = inject("isDark")
const toggleTheme = inject("toggleTheme")
const isLandingRoute = computed(() => route.meta.canonicalPath === "/app")

const rootEl = ref(null)
const glEl = ref(null)
const navEl = ref(null)
const progressEl = ref(null)
const menuToggleEl = ref(null)
const mobilePanelEl = ref(null)
const scrolled = ref(false)
const bgMode = ref("river")
const mobileOpen = ref(false)
let glApi = null
let cleanups = []

const lang = computed(() => {
  const raw = Array.isArray(route.params.locale) ? route.params.locale[0] : route.params.locale
  return normalizeLocale(raw)
})

/* Route meta sets the page tint; pages can override live. */
const DEFAULT_ACCENT = {
  dark: ["#22d3ee", "#67e8f9"],
  light: ["#0369a1", "#075985"],
}
const accentOverride = ref(null)

const hexToRgba = (hex, alpha) => {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
}

const accent = computed(() => {
  const pair = accentOverride.value || route.meta.v6Accent || DEFAULT_ACCENT
  return isDark.value ? pair.dark : pair.light
})

const accentStyle = computed(() => ({
  "--v6-gold": accent.value[0],
  "--v6-gold-hi": accent.value[1],
  "--v6-line-strong": hexToRgba(accent.value[0], isDark.value ? 0.3 : 0.4),
}))

provide("v6Accent", {
  set: (pair) => { accentOverride.value = pair },
  clear: () => { accentOverride.value = null },
})

watch(() => route.path, () => {
  accentOverride.value = null
  mobileOpen.value = false
  onScroll()
})
watch(mobileOpen, async (open) => {
  document.documentElement.classList.toggle("v6-menu-open", open)
  await nextTick()
  if (open) mobilePanelEl.value?.querySelector("a")?.focus()
  else menuToggleEl.value?.focus()
})
watch(accent, (value) => glApi?.setAccent(value[0], value[1]))

const setBg = (key) => {
  if (bgMode.value === key) return
  bgMode.value = key
  try { localStorage.setItem("katsumii-v6-bg", key) } catch { /* private mode */ }
  glApi?.setMode(key)
}

const onScroll = () => {
  const y = window.scrollY
  scrolled.value = y > 60
  const max = document.documentElement.scrollHeight - window.innerHeight
  if (progressEl.value) {
    progressEl.value.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`
  }
  if (glApi && !prefersReducedMotion()) {
    glApi.setScroll(route.meta.v6DimBg ? 0 : Math.min(1, y / (window.innerHeight * 0.35)) * 0.8)
  }
}

const onKeydown = (event) => {
  if (event.key === "Escape" && mobileOpen.value) mobileOpen.value = false
  if (event.key !== "Tab" || !mobileOpen.value || !mobilePanelEl.value) return

  const focusable = [...mobilePanelEl.value.querySelectorAll("a[href], button:not([disabled])")]
  if (!focusable.length) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

onMounted(() => {
  try {
    const saved = localStorage.getItem("katsumii-v6-bg")
    if (V6_BG_OPTIONS.some((option) => option.key === saved)) bgMode.value = saved
  } catch { /* private mode */ }

  glApi = createV6Background(glEl.value, {
    light: !isDark.value,
    mode: bgMode.value,
    logoUrl: asset("logo.png"),
    accent: accent.value,
  })
  if (glApi) {
    cleanups.push(glApi.dispose)
    if (prefersReducedMotion()) glApi.setScroll(0.35)
  }

  watch(isDark, (dark) => {
    glApi?.setTheme(!dark)
    const value = accent.value
    glApi?.setAccent(value[0], value[1])
  })

  cleanups.push(initMagnetic(navEl.value))

  window.addEventListener("scroll", onScroll, { passive: true })
  cleanups.push(() => window.removeEventListener("scroll", onScroll))
  window.addEventListener("keydown", onKeydown)
  cleanups.push(() => window.removeEventListener("keydown", onKeydown))
  onScroll()
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove("v6-menu-open")
  cleanups.forEach((off) => off && off())
  cleanups = []
  glApi = null
})
</script>
