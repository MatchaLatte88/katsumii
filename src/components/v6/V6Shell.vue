<template>
  <div ref="rootEl" class="v6" :class="{ light: !isDark, 'v6-landing-shell': isLandingRoute }" :style="accentStyle">
    <canvas ref="glEl" class="v6-gl" :class="{ dim: route.meta.v6DimBg, off: route.meta.v6NoBg }" aria-hidden="true"></canvas>
    <div class="v6-noise" aria-hidden="true"></div>
    <div class="v6-progress" aria-hidden="true"><span ref="progressEl"></span></div>

    <PreviewNoticeModal v-if="isLandingRoute" />

    <!-- NAV -->
    <header ref="navEl" class="v6-nav" :class="{ scrolled }">
      <RouterLink class="v6-brand" :to="`/${lang}/app`">
        <img :src="asset('logo.png')" alt="Katsumii logo" width="32" height="32" />
        <span>Katsumii<b class="v6-dot" aria-hidden="true">.</b></span>
      </RouterLink>

      <nav class="v6-nav-links" aria-label="Main navigation">
        <span class="v6-nav-home-slot" :class="{ 'is-visible': !isLandingRoute }">
          <RouterLink
            :to="`/${lang}/app`"
            :aria-hidden="isLandingRoute"
          :tabindex="isLandingRoute ? -1 : undefined"
          >
            Home
          </RouterLink>
        </span>
        <div class="v6-nav-drop">
          <RouterLink :to="`/${lang}/features`" aria-haspopup="true">Features</RouterLink>
          <div class="v6-nav-menu" role="menu" aria-label="Feature pages">
            <RouterLink role="menuitem" :to="`/${lang}/features`">
              <span class="v6-nav-menu-idx" aria-hidden="true">00</span>
              <span class="v6-nav-menu-text">
                Features
                <small>Complete overview</small>
              </span>
              <svg class="v6-nav-menu-arrow" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true">
                <path d="M2.5 6h7M6.6 3.1 9.5 6l-2.9 2.9" />
              </svg>
            </RouterLink>
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
            <p class="v6-nav-menu-head" aria-hidden="true">Go deeper</p>
            <RouterLink role="menuitem" :to="`/${lang}/analytics-reviews`">
              <span class="v6-nav-menu-idx" aria-hidden="true">05</span>
              <span class="v6-nav-menu-text">
                Analytics
                <small>Edge, breakdowns & reports</small>
              </span>
              <svg class="v6-nav-menu-arrow" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true">
                <path d="M2.5 6h7M6.6 3.1 9.5 6l-2.9 2.9" />
              </svg>
            </RouterLink>
            <RouterLink role="menuitem" :to="`/${lang}/customization`">
              <span class="v6-nav-menu-idx" aria-hidden="true">06</span>
              <span class="v6-nav-menu-text">
                Customization
                <small>Focus mode & themes</small>
              </span>
              <svg class="v6-nav-menu-arrow" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true">
                <path d="M2.5 6h7M6.6 3.1 9.5 6l-2.9 2.9" />
              </svg>
            </RouterLink>
            <RouterLink role="menuitem" :to="`/${lang}/workflow`">
              <span class="v6-nav-menu-idx" aria-hidden="true">07</span>
              <span class="v6-nav-menu-text">
                Workflow
                <small>Imports, journal & tools</small>
              </span>
              <svg class="v6-nav-menu-arrow" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true">
                <path d="M2.5 6h7M6.6 3.1 9.5 6l-2.9 2.9" />
              </svg>
            </RouterLink>
            <RouterLink role="menuitem" :to="`/${lang}/local-offline`">
              <span class="v6-nav-menu-idx" aria-hidden="true">08</span>
              <span class="v6-nav-menu-text">
                Local &amp; offline
                <small>Your data, on your disk</small>
              </span>
              <svg class="v6-nav-menu-arrow" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true">
                <path d="M2.5 6h7M6.6 3.1 9.5 6l-2.9 2.9" />
              </svg>
            </RouterLink>
          </div>
        </div>
        <RouterLink :to="`/${lang}/pricing`">Pricing</RouterLink>
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
          <div class="v6-mobile-nav">
            <RouterLink
              v-for="item in MOBILE_TOP_LINKS"
              :key="item.path"
              :to="`/${lang}/${item.path}`"
            >
              {{ item.label }}<small v-if="item.sub">{{ item.sub }}</small>
            </RouterLink>

            <div v-for="group in MOBILE_GROUPS" :key="group.key" class="v6-mobile-group">
              <button
                type="button"
                class="v6-mobile-group-head"
                :class="{ open: openGroup === group.key }"
                :aria-expanded="openGroup === group.key"
                :aria-controls="`v6-mobile-group-${group.key}`"
                @click="openGroup = openGroup === group.key ? null : group.key"
              >
                {{ group.label }}
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true">
                  <path d="M3.1 4.6 6 7.5l2.9-2.9" />
                </svg>
              </button>
              <div
                :id="`v6-mobile-group-${group.key}`"
                class="v6-mobile-sub"
                :class="{ open: openGroup === group.key }"
              >
                <div class="v6-mobile-sub-inner">
                  <RouterLink
                    v-for="item in group.items"
                    :key="item.path"
                    :to="`/${lang}/${item.path}`"
                    :tabindex="openGroup === group.key ? undefined : -1"
                  >
                    {{ item.label }}<small v-if="item.sub">{{ item.sub }}</small>
                  </RouterLink>
                </div>
              </div>
            </div>

            <RouterLink
              v-for="item in MOBILE_END_LINKS"
              :key="item.path"
              :to="`/${lang}/${item.path}`"
            >
              {{ item.label }}<small v-if="item.sub">{{ item.sub }}</small>
            </RouterLink>
          </div>
          <span class="v6-btn v6-btn-static" aria-disabled="true">Coming soon</span>
          <p class="v6-mobile-note">Local. Offline. Entirely yours.</p>
        </nav>
      </div>
    </Transition>

    <slot />

    <footer class="v6-footer">
      <div class="v6-footer-cols">
        <div class="v6-footer-brand">
          <RouterLink class="v6-brand v6-footer-brand-link" :to="`/${lang}/app`">
            <img :src="asset('logo.png')" alt="Katsumii logo" width="28" height="28" />
            <span>Katsumii<b class="v6-dot" aria-hidden="true">.</b></span>
          </RouterLink>
          <a
            class="v6-social"
            :href="INSTAGRAM_URL"
            target="_blank"
            rel="noopener"
            aria-label="Katsumii on Instagram"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <defs>
                <!-- Instagram brand gradient, corner-to-corner as in the official mark -->
                <linearGradient id="v6-ig" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#FFC107" />
                  <stop offset="28%" stop-color="#F76B1C" />
                  <stop offset="55%" stop-color="#E1306C" />
                  <stop offset="80%" stop-color="#C13584" />
                  <stop offset="100%" stop-color="#5851DB" />
                </linearGradient>
              </defs>
              <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.4" stroke="url(#v6-ig)" stroke-width="1.9" />
              <circle cx="12" cy="12" r="4.1" stroke="url(#v6-ig)" stroke-width="1.9" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="url(#v6-ig)" />
            </svg>
            <span>@katsumii.journal</span>
          </a>
        </div>

        <nav class="v6-footer-col" aria-label="Product">
          <p class="v6-footer-head">Product</p>
          <RouterLink :to="`/${lang}/app`">Home</RouterLink>
          <RouterLink :to="`/${lang}/pricing`">Pricing</RouterLink>
          <RouterLink :to="`/${lang}/app#system-requirements`">System requirements</RouterLink>
          <RouterLink :to="`/${lang}/local-offline`">Local &amp; offline</RouterLink>
        </nav>

        <nav class="v6-footer-col" aria-label="Features">
          <p class="v6-footer-head">Features</p>
          <RouterLink :to="`/${lang}/features`">Overview</RouterLink>
          <RouterLink :to="`/${lang}/analytics-reviews`">Analytics</RouterLink>
          <RouterLink :to="`/${lang}/customization`">Customization</RouterLink>
          <RouterLink :to="`/${lang}/workflow`">Workflow</RouterLink>
        </nav>

        <nav class="v6-footer-col" aria-label="Disciplines">
          <p class="v6-footer-head">Four disciplines</p>
          <RouterLink :to="`/${lang}/funded-accounts`">Funded</RouterLink>
          <RouterLink :to="`/${lang}/prop-firm-challenges`">Challenge</RouterLink>
          <RouterLink :to="`/${lang}/personal-trading`">Personal</RouterLink>
          <RouterLink :to="`/${lang}/backtesting`">Backtest</RouterLink>
        </nav>

        <nav class="v6-footer-col" aria-label="Support">
          <p class="v6-footer-head">Support</p>
          <RouterLink :to="`/${lang}/manual`">Manual</RouterLink>
          <RouterLink :to="`/${lang}/faq`">FAQ</RouterLink>
          <RouterLink :to="`/${lang}/contact`">Contact</RouterLink>
          <a :href="INSTAGRAM_URL" target="_blank" rel="noopener">Instagram</a>
        </nav>

        <nav class="v6-footer-col" aria-label="Legal">
          <p class="v6-footer-head">Legal</p>
          <RouterLink :to="`/${lang}/privacy`">Privacy</RouterLink>
          <RouterLink :to="`/${lang}/terms`">Terms</RouterLink>
          <RouterLink :to="`/${lang}/impressum`">Impressum</RouterLink>
          <button type="button" @click="openSettings">{{ t('consent.settings') }}</button>
        </nav>
      </div>

      <div class="v6-footer-bottom">
        <p>© {{ year }} Katsumii — trading journal</p>
        <p class="v6-footer-version">v{{ siteVersion }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, inject, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
import { createV6Background } from "../../v6/gl.js"
import { initMagnetic, prefersReducedMotion } from "../../v6/motion.js"
import { normalizeLocale } from "../../utils/routes.js"
import { useConsent } from "../../composables/useConsent.js"
import PreviewNoticeModal from "./PreviewNoticeModal.vue"
import changelog from "../../../changelog.json"

/* newest changelog entry is the deployed version — see changelog.json */
const siteVersion = changelog[0].version

const { t } = useI18n()
const { openSettings } = useConsent()

const baseUrl = import.meta.env.BASE_URL
const asset = (path) => `${baseUrl}${path}`
const year = new Date().getFullYear()

const INSTAGRAM_URL = "https://instagram.com/katsumii.journal"

/* Discipline pages in the Features dropdown — dots mirror V6_ACCENTS in router.js */
const FEATURE_PAGES = [
  { label: "Funded", sub: "Live prop accounts", path: "funded-accounts", dot: { dark: "#22d3ee", light: "#0369a1" } },
  { label: "Challenge", sub: "Evaluations & combines", path: "prop-firm-challenges", dot: { dark: "#facc15", light: "#ab7503" } },
  { label: "Personal", sub: "Own capital", path: "personal-trading", dot: { dark: "#4ade80", light: "#047857" } },
  { label: "Backtest", sub: "Sessions & replay", path: "backtesting", dot: { dark: "#818cf8", light: "#6d28d9" } },
]

/* Mobile menu: same grouping as the desktop dropdown, but collapsible */
const MOBILE_TOP_LINKS = [
  { label: "Features", sub: "Overview", path: "features" },
]

const MOBILE_GROUPS = [
  {
    key: "disciplines",
    label: "Four disciplines",
    items: FEATURE_PAGES.map(({ label, sub, path }) => ({ label, sub, path })),
  },
  {
    key: "deeper",
    label: "Go deeper",
    items: [
      { label: "Analytics", sub: "Edge, breakdowns & reports", path: "analytics-reviews" },
      { label: "Customization", sub: "Focus mode & themes", path: "customization" },
      { label: "Workflow", sub: "Imports, journal & tools", path: "workflow" },
      { label: "Local & offline", sub: "Your data, on your disk", path: "local-offline" },
    ],
  },
]

const MOBILE_END_LINKS = [
  { label: "Pricing", path: "pricing" },
  { label: "FAQ", path: "faq" },
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
const mobileOpen = ref(false)
const openGroup = ref(null)
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

/* ── background quiet zone ──────────────────────────────────────
   Readability over the particle river is solved in the river, not on top of
   it: pages hand us the elements holding their copy, we measure the real text
   box and the shader thins the stream out there. Dimming the page instead
   always left a visible scrim edge once the copy went near-full-width. */
const QUIET_PAD_X = 26
const QUIET_PAD_Y = 20
let quietEls = []
let quietRight = 0
let quietActive = false
let quietSettleTimers = []

/* tight bounds of an element's inline content — a Range hugs the line boxes,
   so a left-aligned headline doesn't claim its whole block width */
const contentRect = (el) => {
  const range = document.createRange()
  range.selectNodeContents(el)
  const r = range.getBoundingClientRect()
  return r.width > 0 && r.height > 0 ? r : el.getBoundingClientRect()
}

/* only clears when a zone is actually set — setQuiet repaints the still frame
   under reduced motion, so a no-op call per scroll event would be costly */
const clearQuiet = () => {
  quietSettleTimers.forEach(clearTimeout)
  quietSettleTimers = []
  if (!quietActive) return
  glApi?.setQuiet(null)
  quietActive = false
}

const measureQuiet = () => {
  if (!glApi) return
  const live = quietEls.filter((el) => el?.isConnected)
  if (!live.length || window.scrollY > window.innerHeight * 1.5) {
    clearQuiet()
    return
  }

  let left = Infinity
  let right = -Infinity
  let top = Infinity
  let bottom = -Infinity
  for (const el of live) {
    const r = contentRect(el)
    if (!r.width || !r.height) continue
    left = Math.min(left, r.left)
    right = Math.max(right, r.right)
    top = Math.min(top, r.top)
    bottom = Math.max(bottom, r.bottom)
  }
  if (left === Infinity) {
    clearQuiet()
    return
  }

  /* the landing headline types itself in and out — hold the widest edge seen
     so the zone settles instead of breathing with every character */
  quietRight = Math.max(quietRight, right)

  const w = window.innerWidth
  const h = window.innerHeight
  const x0 = left - QUIET_PAD_X
  const x1 = quietRight + QUIET_PAD_X
  const y0 = top - QUIET_PAD_Y
  const y1 = bottom + QUIET_PAD_Y
  glApi.setQuiet({
    x: ((x0 + x1) / 2 / w) * 2 - 1,
    y: -((((y0 + y1) / 2) / h) * 2 - 1),
    halfW: (x1 - x0) / w,
    halfH: (y1 - y0) / h,
  })
  quietActive = true
}

provide("v6Quiet", {
  /* target: a container whose element children hold the copy, or an explicit
     element list when the copy sits deeper (the landing h1 wraps its lines) */
  set: (target) => {
    const list = Array.isArray(target) ? target : [...(target?.children ?? [])]
    clearQuiet()
    quietEls = list.filter(Boolean)
    quietRight = 0
    measureQuiet()
    /* hero copy animates in on most pages — settle the zone once it has landed */
    quietSettleTimers = [400, 1400].map((ms) => setTimeout(measureQuiet, ms))
  },
  clear: () => {
    quietEls = []
    quietRight = 0
    clearQuiet()
  },
  /* set() always measures once; live refreshes are skipped under reduced
     motion for the same reason as in onScroll */
  refresh: () => { if (!prefersReducedMotion()) measureQuiet() },
})

watch(() => route.path, () => {
  accentOverride.value = null
  mobileOpen.value = false
  quietEls = []
  quietRight = 0
  clearQuiet()
  onScroll()
})
watch(mobileOpen, async (open) => {
  if (!open) openGroup.value = null
  document.documentElement.classList.toggle("v6-menu-open", open)
  await nextTick()
  if (open) mobilePanelEl.value?.querySelector("a")?.focus()
  else menuToggleEl.value?.focus()
})
watch(accent, (value) => glApi?.setAccent(value[0], value[1]))

const onScroll = () => {
  const y = window.scrollY
  scrolled.value = y > 60
  const max = document.documentElement.scrollHeight - window.innerHeight
  if (progressEl.value) {
    progressEl.value.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`
  }
  if (glApi && !prefersReducedMotion()) {
    glApi.setScroll(route.meta.v6DimBg ? 0 : Math.min(1, y / (window.innerHeight * 0.35)) * 0.8)
    /* reduced motion keeps a still frame — leave its zone where it was measured
       instead of repainting the whole scene on every scroll event */
    measureQuiet()
  }
}

const onResize = () => {
  quietRight = 0
  measureQuiet()
}

const onKeydown = (event) => {
  if (event.key === "Escape" && mobileOpen.value) mobileOpen.value = false
  if (event.key !== "Tab" || !mobileOpen.value || !mobilePanelEl.value) return

  /* links inside a collapsed group carry tabindex="-1" and stay out of the cycle */
  const focusable = [...mobilePanelEl.value.querySelectorAll('a[href]:not([tabindex="-1"]), button:not([disabled])')]
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
  glApi = createV6Background(glEl.value, {
    light: !isDark.value,
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
  window.addEventListener("resize", onResize)
  cleanups.push(() => window.removeEventListener("resize", onResize))
  window.addEventListener("keydown", onKeydown)
  cleanups.push(() => window.removeEventListener("keydown", onKeydown))
  onScroll()
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove("v6-menu-open")
  quietSettleTimers.forEach(clearTimeout)
  quietSettleTimers = []
  cleanups.forEach((off) => off && off())
  cleanups = []
  glApi = null
})
</script>
