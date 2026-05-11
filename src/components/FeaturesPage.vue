<template>
  <div
    :class="[
      'relative overflow-x-hidden min-h-screen',
      !isDark ? 'bg-slate-50 text-gray-900' : 'bg-slate-950 text-slate-100',
    ]"
  >
    <KbBackground :pattern="bg" :isDark="isDark" />

    <AppNav
      :navigation="navigation"
      :brand-title="t('common.brandTitle')"
      :brand-subtitle="t('featuresPage.brandSubtitle')"
      :brand-href="appHomePath"
    />

    <!-- ── HERO ─────────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden px-6 pb-0 pt-28 lg:px-10">
      <div
        v-if="isDark"
        aria-hidden="true"
        class="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full blur-[140px] bg-cyan-500/8"
      />

      <div class="relative mx-auto max-w-6xl">
        <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-2xl">
            <p
              class="hero-label text-sm font-semibold uppercase tracking-[0.2em]"
              :class="!isDark ? 'text-teal-700' : 'text-cyan-400'"
            >
              {{ t('featuresPage.hero.label') }}
            </p>
            <h1
              class="hero-title mt-4 text-5xl font-semibold tracking-[-0.02em] sm:text-6xl lg:text-7xl"
              :class="!isDark ? 'text-gray-900' : 'text-slate-100'"
            >
              {{ t('featuresPage.hero.headlineA') }}<br />
              <span :class="!isDark ? 'text-teal-600' : 'text-cyan-400'">{{ t('featuresPage.hero.headlineB') }}</span>
            </h1>
          </div>

          <div class="hero-meta lg:max-w-xs lg:pb-2">
            <p
              class="text-sm leading-relaxed"
              :class="!isDark ? 'text-gray-500' : 'text-slate-400'"
            >
              {{ t('featuresPage.hero.description') }}
            </p>
            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="tag in tm('featuresPage.hero.tags')"
                :key="tag"
                class="rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
                :class="!isDark
                  ? 'border-teal-200 bg-teal-50 text-teal-700'
                  : 'border-cyan-400/20 bg-cyan-400/8 text-cyan-300'"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- Hero screenshot -->
        <div
          class="hero-screen mt-14 overflow-hidden rounded-t-[2rem] border-x border-t"
          :class="!isDark ? 'border-gray-200' : 'border-blue-400/20'"
        >
          <div
            class="flex items-center gap-1.5 border-b px-4 py-3"
            :class="!isDark
              ? 'border-gray-200 bg-gray-100'
              : 'border-blue-400/15 bg-slate-900'"
          >
            <span class="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span class="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span class="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <span
              class="ml-4 rounded-md px-10 py-1 text-[11px]"
              :class="!isDark ? 'bg-white text-gray-400' : 'bg-slate-800 text-slate-500'"
            >katsumii.app</span>
          </div>
          <img :src="assetUrl('Slide1.png')" :alt="t('featuresPage.alts.hero')" class="w-full" />
        </div>
      </div>
    </section>

    <!-- ── STICKY FEATURE NAV ─────────────────────────────────────── -->
    <div
      class="feature-nav sticky top-0 z-10 overflow-x-auto border-b"
      :class="!isDark
        ? 'border-gray-200 bg-slate-50/90 backdrop-blur-md'
        : 'border-slate-800/60 bg-slate-950/90 backdrop-blur-md'"
    >
      <div class="mx-auto flex max-w-6xl items-center px-6 lg:px-10">
        <a
          v-for="feature in features"
          :key="feature.id"
          :href="`#${feature.id}`"
          class="nav-tab shrink-0 border-b-2 px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200"
          :class="activeFeatureId === feature.id
            ? !isDark
              ? 'border-teal-700 text-teal-700'
              : 'border-cyan-400 text-cyan-400'
            : !isDark
              ? 'border-transparent text-gray-400 hover:border-teal-500 hover:text-gray-700'
              : 'border-transparent text-slate-500 hover:border-cyan-400 hover:text-slate-200'"
        >
          <span class="mr-1.5 opacity-40">{{ feature.num }}</span>{{ feature.eyebrow }}
        </a>
      </div>
    </div>

    <!-- ── FEATURE CHAPTERS ───────────────────────────────────────── -->
    <section class="px-6 lg:px-10">
      <div class="mx-auto max-w-6xl">
        <article
          v-for="(feature, i) in features"
          :key="feature.id"
          :id="feature.id"
          class="feature-chapter py-20 lg:py-28"
          :class="i < features.length - 1
            ? !isDark ? 'border-b border-gray-100' : 'border-b border-slate-800/50'
            : ''"
          :data-index="i"
        >
          <div
            class="flex flex-col gap-10 lg:grid lg:gap-16"
            :class="i % 2 === 0 ? 'lg:grid-cols-[1fr_1.6fr]' : 'lg:grid-cols-[1.6fr_1fr]'"
          >
            <!-- Text block -->
            <div
              class="chapter-text flex flex-col justify-center"
              :class="i % 2 === 0 ? 'order-2 lg:order-1' : 'order-2 lg:order-2'"
            >
              <div class="flex items-center gap-3">
                <span
                  class="font-mono text-[11px] font-bold tracking-[0.2em] opacity-40"
                  :class="!isDark ? 'text-gray-900' : 'text-slate-100'"
                >{{ feature.num }}</span>
                <div class="h-px max-w-[32px] flex-1" :class="!isDark ? 'bg-gray-300' : 'bg-slate-700'" />
                <span
                  class="text-xs font-semibold uppercase tracking-[0.16em]"
                  :class="!isDark ? 'text-teal-700' : 'text-cyan-400'"
                >{{ feature.eyebrow }}</span>
              </div>

              <h2
                class="mt-5 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl"
                :class="!isDark ? 'text-gray-900' : 'text-slate-100'"
              >
                {{ feature.title }}
              </h2>

              <p
                class="mt-5 text-[0.9375rem] leading-relaxed"
                :class="!isDark ? 'text-gray-500' : 'text-slate-400'"
              >
                {{ feature.description }}
              </p>

              <ul class="mt-8 space-y-3">
                <li v-for="point in feature.points" :key="point" class="flex items-start gap-3">
                  <span
                    class="mt-[7px] h-1 w-4 shrink-0 rounded-full"
                    :class="!isDark ? 'bg-teal-400' : 'bg-cyan-500'"
                  />
                  <span
                    class="text-sm leading-relaxed"
                    :class="!isDark ? 'text-gray-600' : 'text-slate-300'"
                  >{{ point }}</span>
                </li>
              </ul>

              <div class="mt-8">
                <span
                  class="inline-flex rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]"
                  :class="!isDark
                    ? 'border-teal-200 bg-teal-50 text-teal-600'
                    : 'border-cyan-400/20 bg-cyan-400/8 text-cyan-400'"
                >{{ feature.badge }}</span>
              </div>
            </div>

            <!-- Screenshot block -->
            <div
              class="chapter-image relative"
              :class="i % 2 === 0 ? 'order-1 lg:order-2' : 'order-1 lg:order-1'"
            >
              <span
                aria-hidden="true"
                class="pointer-events-none absolute -top-6 select-none font-mono text-[7rem] font-black leading-none opacity-[0.04] lg:-top-10 lg:text-[10rem]"
                :class="[
                  i % 2 === 0 ? '-right-4 lg:-right-6' : '-left-4 lg:-left-6',
                  !isDark ? 'text-gray-900' : 'text-slate-100',
                ]"
              >{{ feature.num }}</span>

              <div
                class="k-main-tile k-glass overflow-hidden border transition-all duration-500"
                :class="!isDark
                  ? 'border-gray-200 shadow-[0_32px_80px_-20px_rgba(15,23,42,0.18)]'
                  : 'border-blue-400/15 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.7)]'"
              >
                <img :src="assetUrl(feature.image)" :alt="feature.alt" class="w-full" loading="lazy" />
              </div>

              <div
                class="absolute -bottom-3 right-4 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
                :class="!isDark
                  ? 'border-gray-200 bg-white text-gray-400 shadow-sm'
                  : 'border-slate-700/80 bg-slate-900 text-slate-500'"
              >
                {{ t('featuresPage.liveScreen') }}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- ── CTA ───────────────────────────────────────────────────── -->
    <section class="px-6 pb-24 pt-10 lg:px-10">
      <div class="mx-auto max-w-6xl">
        <div
          class="cta-block k-main-tile k-glass relative overflow-hidden border px-8 py-16 text-center sm:px-12"
          :class="!isDark
            ? 'border-gray-200 bg-white shadow-[0_30px_80px_-20px_rgba(15,23,42,0.1)]'
            : 'border-slate-800/60 bg-slate-900/60 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]'"
        >
          <div
            v-if="isDark"
            aria-hidden="true"
            class="pointer-events-none absolute left-1/2 top-0 h-64 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] bg-cyan-500/6"
          />
          <div class="relative">
            <p
              class="text-xs font-semibold uppercase tracking-[0.2em]"
              :class="!isDark ? 'text-teal-700' : 'text-cyan-400'"
            >
              {{ t('featuresPage.cta.label') }}
            </p>
            <h3
              class="mt-4 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl"
              :class="!isDark ? 'text-gray-900' : 'text-slate-100'"
            >
              {{ t('featuresPage.cta.headline') }}
            </h3>
            <p
              class="mx-auto mt-5 max-w-lg text-[0.9375rem] leading-relaxed"
              :class="!isDark ? 'text-gray-500' : 'text-slate-400'"
            >
              {{ t('featuresPage.cta.description') }}
            </p>
            <div class="mt-9 flex flex-wrap justify-center gap-3">
              <RouterLink
                :to="pagePath('pricing')"
                class="rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                :class="!isDark
                  ? 'bg-teal-700 text-white hover:bg-teal-600 hover:shadow-lg'
                  : 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.5)]'"
              >
                {{ t('featuresPage.cta.buyLicense') }}
              </RouterLink>
              <RouterLink
                :to="appHomePath"
                class="rounded-full border px-7 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                :class="!isDark
                  ? 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  : 'border-slate-700/80 bg-transparent text-slate-300 hover:border-slate-500 hover:bg-slate-800/50'"
              >
                {{ t('featuresPage.cta.tryDemo') }}
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FOOTER ─────────────────────────────────────────────────── -->
    <footer
      class="relative border-t px-6 py-5 lg:px-10"
      :class="!isDark ? 'border-gray-200/90 bg-white/88' : 'border-blue-400/20 bg-slate-950/95'"
    >
      <div
        class="mx-auto flex max-w-6xl items-center justify-between text-xs"
        :class="!isDark ? 'text-gray-400' : 'text-slate-500'"
      >
        <span>&copy; {{ year }} Katsumii</span>
        <div class="flex gap-5">
          <RouterLink
            :to="appHomePath"
            class="transition-colors duration-150"
            :class="!isDark ? 'hover:text-gray-700' : 'hover:text-slate-300'"
          >{{ t('featuresPage.nav.home') }}</RouterLink>
          <RouterLink
            :to="pagePath('pricing')"
            class="transition-colors duration-150"
            :class="!isDark ? 'hover:text-gray-700' : 'hover:text-slate-300'"
          >{{ t('featuresPage.nav.pricing') }}</RouterLink>
          <RouterLink
            :to="pagePath('faq')"
            class="transition-colors duration-150"
            :class="!isDark ? 'hover:text-gray-700' : 'hover:text-slate-300'"
          >{{ t('featuresPage.nav.faq') }}</RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import AppNav from "./AppNav.vue"
import KbBackground from "../backgrounds/KbBackground.vue"
import { useSiteNavigation } from "../composables/useSiteNavigation.js"
import { appHomePath, pagePath } from "../utils/routes.js"

const { t, tm } = useI18n()

const baseUrl = import.meta.env.BASE_URL
const assetUrl = (path) => `${baseUrl}${path.replace(/^\/+/, "")}`
const year = new Date().getFullYear()

const navigation = useSiteNavigation()

const FEATURE_STATIC = [
  { id: "journaling", num: "01", image: "Slide3.png", altKey: "featuresPage.alts.journaling" },
  { id: "accounts",   num: "02", image: "Slide4.png", altKey: "featuresPage.alts.accounts" },
  { id: "analytics",  num: "03", image: "Slide2.png", altKey: "featuresPage.alts.analytics" },
  { id: "calendar",   num: "04", image: "Slide5.png", altKey: "featuresPage.alts.calendar" },
]

const features = computed(() =>
  FEATURE_STATIC.map((s, i) => ({ ...s, alt: t(s.altKey), ...tm('featuresPage.features')[i] }))
)

const activeFeatureId = ref(null)

const isDark = inject("isDark")
const bg = inject("bg")

const markVisible = (el) => {
  el.dataset.revealed = "true"
  el.classList.add("is-visible")
}

onMounted(() => {
  // Hero entrance
  const heroEls = [
    [".hero-label", 0],
    [".hero-title", 80],
    [".hero-meta", 180],
    [".hero-screen", 300],
    [".feature-nav", 480],
  ]
  heroEls.forEach(([sel, delay]) => {
    const el = document.querySelector(sel)
    if (el) setTimeout(() => markVisible(el), delay)
  })

  // Chapter scroll-reveal
  const chapterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const text = entry.target.querySelector(".chapter-text")
        const image = entry.target.querySelector(".chapter-image")
        setTimeout(() => text && markVisible(text), 0)
        setTimeout(() => image && markVisible(image), 130)
        chapterObserver.unobserve(entry.target)
      })
    },
    { threshold: 0.1 }
  )
  document.querySelectorAll(".feature-chapter").forEach((el) => chapterObserver.observe(el))

  // CTA reveal
  const ctaObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          markVisible(entry.target)
          ctaObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )
  const cta = document.querySelector(".cta-block")
  if (cta) ctaObserver.observe(cta)

  // Active nav highlight
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeFeatureId.value = entry.target.id
      })
    },
    { threshold: 0.45 }
  )
  document.querySelectorAll(".feature-chapter").forEach((el) => navObserver.observe(el))
})
</script>

<style scoped>
/* ── Hero entrance ─────────────────────────────────────────────── */
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
.feature-nav.is-visible,
.hero-label[data-revealed="true"],
.hero-title[data-revealed="true"],
.hero-meta[data-revealed="true"],
.feature-nav[data-revealed="true"] { opacity: 1; transform: translateY(0); }

.hero-screen.is-visible,
.hero-screen[data-revealed="true"] { opacity: 1; transform: translateY(0) scale(1); }

/* ── Chapter scroll-reveal ──────────────────────────────────────── */
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

.feature-chapter:nth-child(even) .chapter-text  { transform: translateX(24px); }
.feature-chapter:nth-child(even) .chapter-image { transform: translateX(-24px); }

.chapter-text.is-visible,
.chapter-image.is-visible,
.chapter-text[data-revealed="true"],
.chapter-image[data-revealed="true"] { opacity: 1; transform: translateX(0); }

/* ── CTA ──────────────────────────────────────────────────────── */
.cta-block {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.cta-block.is-visible,
.cta-block[data-revealed="true"] { opacity: 1; transform: translateY(0); }
</style>
