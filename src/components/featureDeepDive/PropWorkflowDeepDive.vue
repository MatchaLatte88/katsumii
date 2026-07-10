<template>
  <div
    :class="[
      'relative min-h-screen overflow-x-hidden',
      !isDark ? 'bg-slate-50 text-gray-900' : 'bg-slate-950 text-slate-100',
    ]"
  >
    <KbBackground :pattern="bg" :isDark="isDark" />

    <AppNav
      :navigation="navigation"
      :brand-title="t('common.brandTitle')"
      :brand-subtitle="page.brandSubtitle"
      :brand-href="pagePath('features')"
    />

    <main class="relative z-[1]">
      <section class="px-5 pb-12 pt-28 sm:px-6 lg:px-10 lg:pt-32">
        <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <div class="deep-reveal">
            <RouterLink
              :to="pagePath('features')"
              :class="[
                'inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors',
                !isDark ? 'text-teal-700 hover:text-teal-600' : 'text-cyan-300 hover:text-cyan-200',
              ]"
            >
              <ArrowLeftIcon class="h-4 w-4" />
              {{ t('propDeepDive.backToHub') }}
            </RouterLink>
            <p
              :class="[
                'mt-7 text-sm font-semibold uppercase tracking-[0.18em]',
                !isDark ? 'text-teal-700' : 'text-cyan-300',
              ]"
            >
              {{ page.hero.label }}
            </p>
            <h1
              :class="[
                'mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl',
                !isDark ? 'text-gray-950' : 'text-slate-100',
              ]"
            >
              {{ page.hero.headline }}
            </h1>
            <p
              :class="[
                'mt-5 max-w-2xl text-base leading-8 sm:text-lg',
                !isDark ? 'text-gray-600' : 'text-slate-300',
              ]"
            >
              {{ page.hero.description }}
            </p>
            <div class="mt-7 flex flex-wrap gap-2">
              <span
                v-for="tag in page.hero.tags"
                :key="tag"
                :class="[
                  'rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.13em]',
                  !isDark
                    ? 'border-teal-200 bg-teal-50 text-teal-700'
                    : 'border-cyan-300/25 bg-cyan-400/10 text-cyan-200',
                ]"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <div
            class="deep-reveal k-main-tile k-glass overflow-hidden border"
            :class="!isDark
              ? 'border-gray-200/90 bg-white/82 shadow-[0_28px_90px_-48px_rgba(15,23,42,0.38)]'
              : 'border-cyan-300/18 bg-slate-900/72 shadow-[0_28px_90px_-46px_rgba(0,0,0,0.82)]'"
          >
            <div
              class="flex items-center justify-between border-b px-4 py-2.5"
              :class="!isDark ? 'border-gray-200 bg-gray-50/85' : 'border-blue-400/20 bg-slate-950/60'"
            >
              <span
                :class="[
                  'text-xs font-semibold uppercase tracking-[0.16em]',
                  !isDark ? 'text-teal-700' : 'text-cyan-300',
                ]"
              >
                {{ page.hero.windowLabel }}
              </span>
              <div class="flex items-center gap-1.5">
                <span class="h-2.5 w-2.5 rounded-full bg-red-400/50" />
                <span class="h-2.5 w-2.5 rounded-full bg-yellow-400/50" />
                <span class="h-2.5 w-2.5 rounded-full bg-green-400/50" />
              </div>
            </div>
            <div class="relative">
              <img :src="assetUrl(page.hero.image)" :alt="page.hero.alt" class="w-full object-cover object-top" />
              <div
                class="absolute inset-x-0 bottom-0 grid grid-cols-3 border-t backdrop-blur-xl"
                :class="!isDark ? 'border-gray-200 bg-white/82' : 'border-blue-400/20 bg-slate-950/74'"
              >
                <div
                  v-for="metric in page.heroStrip"
                  :key="metric.label"
                  class="border-r px-3 py-3 last:border-r-0"
                  :class="!isDark ? 'border-gray-200' : 'border-blue-400/20'"
                >
                  <p :class="['text-sm font-bold', !isDark ? 'text-gray-950' : 'text-slate-100']">{{ metric.value }}</p>
                  <p :class="['mt-0.5 text-[11px] leading-tight', !isDark ? 'text-gray-500' : 'text-slate-400']">{{ metric.label }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav
        class="deep-nav sticky top-0 z-20 border-y px-5 sm:px-6 lg:px-10"
        :class="!isDark
          ? 'border-gray-200 bg-slate-50/88 backdrop-blur-xl'
          : 'border-blue-400/15 bg-slate-950/86 backdrop-blur-xl'"
        :aria-label="t('propDeepDive.sectionNav')"
      >
        <div class="mx-auto flex max-w-7xl gap-2 overflow-x-auto py-2">
          <a
            v-for="section in page.sections"
            :key="section.id"
            :href="`#${section.id}`"
            class="shrink-0 rounded-full border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.13em] transition-all duration-200"
            :class="activeSectionId === section.id
              ? !isDark
                ? 'border-teal-600 bg-teal-600 text-white'
                : 'border-cyan-300 bg-cyan-300 text-slate-950'
              : !isDark
                ? 'border-gray-200 bg-white/70 text-gray-500 hover:border-teal-200 hover:text-gray-900'
                : 'border-slate-800 bg-slate-900/64 text-slate-400 hover:border-cyan-300/30 hover:text-slate-100'"
          >
            {{ section.shortTitle }}
          </a>
        </div>
      </nav>

      <section id="health" class="px-5 py-14 sm:px-6 sm:py-16 lg:px-10">
        <div class="mx-auto max-w-7xl">
          <div class="deep-reveal grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article
              v-for="metric in page.metrics"
              :key="metric.label"
              class="k-sub-tile k-glass border p-5"
              :class="!isDark ? 'border-gray-200/90 bg-white/78 shadow-sm' : 'border-cyan-300/14 bg-slate-900/62'"
            >
              <p :class="['text-xs font-semibold uppercase tracking-[0.16em]', !isDark ? 'text-gray-500' : 'text-slate-400']">
                {{ metric.label }}
              </p>
              <div class="mt-3 flex items-end justify-between gap-3">
                <p :class="['font-display text-3xl font-semibold', !isDark ? 'text-gray-950' : 'text-slate-100']">
                  {{ metric.value }}
                </p>
                <span
                  class="rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
                  :class="statusClass(metric.tone)"
                >
                  {{ metric.status }}
                </span>
              </div>
              <div class="mt-4 h-2 overflow-hidden rounded-full" :class="!isDark ? 'bg-gray-100' : 'bg-slate-950'">
                <div class="progress-strip h-full rounded-full" :style="{ width: metric.progress }" :class="barClass(metric.tone)" />
              </div>
              <p :class="['mt-3 text-sm leading-relaxed', !isDark ? 'text-gray-600' : 'text-slate-300']">
                {{ metric.description }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        v-for="section in page.sections"
        :id="section.id"
        :key="section.id"
        class="deep-section px-5 pb-14 sm:px-6 sm:pb-16 lg:px-10"
      >
        <div class="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div
            class="deep-reveal k-main-tile k-glass border p-5 sm:p-6"
            :class="!isDark ? 'border-gray-200/90 bg-white/78 shadow-[0_20px_70px_-50px_rgba(15,23,42,0.38)]' : 'border-cyan-300/14 bg-slate-900/62'"
          >
            <p :class="['text-xs font-semibold uppercase tracking-[0.18em]', !isDark ? 'text-teal-700' : 'text-cyan-300']">
              {{ section.kicker }}
            </p>
            <h2 :class="['mt-3 font-display text-3xl font-semibold tracking-tight', !isDark ? 'text-gray-950' : 'text-slate-100']">
              {{ section.title }}
            </h2>
            <p :class="['mt-4 text-sm leading-relaxed', !isDark ? 'text-gray-600' : 'text-slate-300']">
              {{ section.description }}
            </p>
            <div
              class="mt-6 rounded-2xl border px-4 py-3"
              :class="!isDark ? 'border-amber-200 bg-amber-50 text-amber-900' : 'border-amber-300/18 bg-amber-300/10 text-amber-100'"
            >
              <p class="text-sm leading-relaxed">
                {{ section.note }}
              </p>
            </div>
          </div>

          <div
            class="deep-reveal k-main-tile k-glass overflow-hidden border"
            :class="!isDark ? 'border-gray-200/90 bg-white/78 shadow-[0_20px_70px_-50px_rgba(15,23,42,0.38)]' : 'border-cyan-300/14 bg-slate-900/62'"
          >
            <div
              v-for="row in section.rows"
              :key="row.name"
              class="grid gap-3 border-b px-5 py-4 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center"
              :class="!isDark ? 'border-gray-200' : 'border-blue-400/15'"
            >
              <div>
                <div class="flex flex-wrap items-center gap-2">
                  <h3 :class="['text-base font-semibold', !isDark ? 'text-gray-950' : 'text-slate-100']">{{ row.name }}</h3>
                  <span class="rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]" :class="statusClass(row.tone)">
                    {{ row.status }}
                  </span>
                </div>
                <p :class="['mt-1 text-sm leading-relaxed', !isDark ? 'text-gray-600' : 'text-slate-300']">
                  {{ row.description }}
                </p>
              </div>
              <div class="min-w-36">
                <div class="flex items-center justify-between gap-3">
                  <span :class="['font-mono text-xs', !isDark ? 'text-gray-500' : 'text-slate-400']">{{ row.value }}</span>
                  <span :class="['font-mono text-xs', !isDark ? 'text-gray-400' : 'text-slate-500']">{{ row.progress }}</span>
                </div>
                <div class="mt-2 h-2 overflow-hidden rounded-full" :class="!isDark ? 'bg-gray-100' : 'bg-slate-950'">
                  <div class="progress-strip h-full rounded-full" :style="{ width: row.progress }" :class="barClass(row.tone)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="px-5 pb-24 sm:px-6 lg:px-10">
        <div
          class="deep-reveal k-main-tile k-glass mx-auto max-w-7xl border p-5 sm:p-6"
          :class="!isDark ? 'border-gray-200/90 bg-white/78 shadow-[0_22px_75px_-52px_rgba(15,23,42,0.4)]' : 'border-cyan-300/14 bg-slate-900/62'"
        >
          <div class="grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p :class="['text-xs font-semibold uppercase tracking-[0.18em]', !isDark ? 'text-teal-700' : 'text-cyan-300']">
                {{ t('propDeepDive.disclaimer.label') }}
              </p>
              <h2 :class="['mt-3 font-display text-2xl font-semibold tracking-tight', !isDark ? 'text-gray-950' : 'text-slate-100']">
                {{ page.disclaimer.headline }}
              </h2>
            </div>
            <div class="grid gap-3 md:grid-cols-3">
              <p
                v-for="item in page.disclaimer.points"
                :key="item"
                :class="[
                  'rounded-2xl border px-4 py-3 text-sm leading-relaxed',
                  !isDark ? 'border-gray-200 bg-gray-50/72 text-gray-700' : 'border-blue-400/15 bg-slate-950/36 text-slate-300',
                ]"
              >
                {{ item }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, onUnmounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { ArrowLeftIcon } from "@heroicons/vue/20/solid"
import AppNav from "../AppNav.vue"
import KbBackground from "../../backgrounds/KbBackground.vue"
import { useSiteNavigation } from "../../composables/useSiteNavigation.js"
import { pagePath } from "../../utils/routes.js"

const props = defineProps({
  pageKey: { type: String, required: true },
})

const { t, tm } = useI18n()
const isDark = inject("isDark")
const bg = inject("bg")
const navigation = useSiteNavigation()
const baseUrl = import.meta.env.BASE_URL
const assetUrl = (path) => `${baseUrl}${path.replace(/^\/+/, "")}`
const activeSectionId = ref("health")
let revealObserver
let activeObserver

const page = computed(() => tm(`propDeepDive.pages.${props.pageKey}`))

const statusClass = (tone = "info") => {
  if (tone === "good") return !isDark.value ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-emerald-300/25 bg-emerald-400/10 text-emerald-200"
  if (tone === "warn") return !isDark.value ? "border-amber-200 bg-amber-50 text-amber-700" : "border-amber-300/25 bg-amber-400/10 text-amber-100"
  if (tone === "danger") return !isDark.value ? "border-rose-200 bg-rose-50 text-rose-700" : "border-rose-300/25 bg-rose-400/10 text-rose-100"
  return !isDark.value ? "border-teal-200 bg-teal-50 text-teal-700" : "border-cyan-300/25 bg-cyan-400/10 text-cyan-200"
}

const barClass = (tone = "info") => {
  if (tone === "good") return "bg-emerald-400"
  if (tone === "warn") return "bg-amber-300"
  if (tone === "danger") return "bg-rose-400"
  return !isDark.value ? "bg-teal-500" : "bg-cyan-300"
}

const markVisible = (el) => {
  el.dataset.revealed = "true"
}

onMounted(() => {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        markVisible(entry.target)
        revealObserver.unobserve(entry.target)
      })
    },
    { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
  )

  document.querySelectorAll(".deep-reveal").forEach((el) => revealObserver.observe(el))

  activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeSectionId.value = entry.target.id
      })
    },
    { threshold: 0.32, rootMargin: "-18% 0px -55% 0px" },
  )

  document.querySelectorAll(".deep-section, #health").forEach((el) => activeObserver.observe(el))
})

onUnmounted(() => {
  revealObserver?.disconnect()
  activeObserver?.disconnect()
})
</script>

<style scoped>
.deep-reveal {
  opacity: 0;
  filter: blur(6px);
  transform: translate3d(0, 24px, 0) scale(0.99);
  transition:
    opacity 0.76s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.76s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.76s cubic-bezier(0.22, 1, 0.36, 1);
}

.deep-reveal[data-revealed="true"] {
  opacity: 1;
  filter: blur(0);
  transform: translate3d(0, 0, 0) scale(1);
}

.deep-nav {
  scrollbar-width: none;
}

.deep-nav::-webkit-scrollbar {
  display: none;
}

.progress-strip {
  background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.36));
  animation: progressPulse 2.8s ease-in-out infinite;
}

@keyframes progressPulse {
  0%, 100% { opacity: 0.82; }
  50% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .deep-reveal {
    opacity: 1;
    filter: none;
    transform: none;
    transition: none;
  }

  .progress-strip {
    animation: none;
  }
}
</style>
