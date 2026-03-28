<template>
  <div :class="[theme === 'light' ? 'relative overflow-x-hidden min-h-screen bg-slate-50 text-gray-900' : 'relative overflow-x-hidden min-h-screen bg-slate-950 text-slate-100']">
    <!-- Background -->
    <div class="k-bg" :class="theme === 'light' ? 'k-bg-light' : 'k-bg-dark'" aria-hidden="true">
      <div class="k-bg-gradient" />
      <svg class="k-bg-grid" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="hc-welcome" x="0" y="0" width="69.28" height="60" patternUnits="userSpaceOnUse">
            <path d="M34.64,0 L51.96,10 L51.96,30 L34.64,40 L17.32,30 L17.32,10 Z M0,0 L17.32,10 M17.32,30 L0,40 M51.96,10 L69.28,0 M69.28,40 L51.96,30 M34.64,40 L34.64,60 M0,40 L0,60" style="fill:none;stroke:var(--hc-stroke);stroke-width:1.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hc-welcome)"/>
      </svg>
      <div class="k-bg-band" />
    </div>

    <AppNav
      :theme="theme"
      :navigation="navigation"
      brand-title="Katsumii"
      brand-subtitle="Welcome"
      :brand-href="baseUrl"
      @toggle-theme="toggleTheme"
    />

    <section class="relative isolate px-6 pb-28 pt-32 lg:px-8">
      <!-- Hero -->
      <div class="mx-auto max-w-3xl text-center">
        <p :class="['inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]', theme === 'light' ? 'border-teal-200 bg-teal-50 text-teal-700' : 'border-cyan-300/30 bg-cyan-400/10 text-cyan-300']">
          <SparklesIcon class="size-3.5" />
          {{ t('welcomePage.eyebrow') }}
        </p>
        <h1 :class="['mt-6 font-display text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">
          {{ t('welcomePage.heading') }}
        </h1>
        <p :class="['mx-auto mt-6 max-w-2xl text-lg leading-relaxed', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">
          {{ t('welcomePage.subheading') }}
        </p>
      </div>

      <!-- Onboarding steps -->
      <div class="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
        <div
          v-for="step in onboardingSteps"
          :key="step.number"
          :class="[
            'relative rounded-2xl border p-6 backdrop-blur transition-all duration-300 hover:-translate-y-0.5',
            theme === 'light'
              ? 'border-gray-200 bg-white/85 shadow-[0_8px_28px_-16px_rgba(15,23,42,0.2)]'
              : 'border-white/10 bg-gray-800/70 hover:bg-gray-800/80'
          ]"
        >
          <span :class="['font-display text-5xl font-bold leading-none', theme === 'light' ? 'text-teal-100' : 'text-cyan-400/20']">
            {{ step.number }}
          </span>
          <h3 :class="['mt-3 text-lg font-semibold', theme === 'light' ? 'text-gray-900' : 'text-white']">
            {{ step.title }}
          </h3>
          <p :class="['mt-2 text-sm leading-relaxed', theme === 'light' ? 'text-gray-600' : 'text-slate-400']">
            {{ step.description }}
          </p>
        </div>
      </div>

      <!-- What to do next checklist -->
      <div class="mx-auto mt-10 max-w-2xl">
        <div
          :class="[
            'rounded-2xl border p-6 sm:p-8',
            theme === 'light' ? 'border-gray-200 bg-white/85 backdrop-blur' : 'border-white/10 bg-gray-800/70 backdrop-blur'
          ]"
        >
          <h2 :class="['text-lg font-semibold', theme === 'light' ? 'text-gray-900' : 'text-white']">
            {{ t('welcomePage.nextSteps.heading') }}
          </h2>
          <ul class="mt-4 space-y-3">
            <li
              v-for="(item, i) in nextStepItems"
              :key="i"
              class="flex items-start gap-3"
            >
              <CheckCircleIcon :class="['mt-0.5 size-5 shrink-0', theme === 'light' ? 'text-teal-600' : 'text-cyan-400']" />
              <span :class="['text-sm', theme === 'light' ? 'text-gray-700' : 'text-slate-300']">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a
          :href="`${baseUrl}app.html?page=manual`"
          :class="[
            'inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5',
            theme === 'light'
              ? 'bg-teal-700 text-white shadow-[0_8px_24px_-10px_rgba(15,118,110,0.6)] hover:bg-teal-600'
              : 'bg-cyan-400 text-slate-950 shadow-[0_8px_24px_-10px_rgba(34,211,238,0.5)] hover:bg-cyan-300'
          ]"
        >
          {{ t('welcomePage.cta') }}
          <ArrowRightIcon class="size-4" />
        </a>
        <a
          :href="baseUrl"
          :class="['text-sm font-medium transition-colors duration-300', theme === 'light' ? 'text-gray-500 hover:text-gray-800' : 'text-slate-400 hover:text-slate-200']"
        >
          {{ t('welcomePage.nav.home') }}
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue"
import { useI18n } from "vue-i18n"
import { ArrowRightIcon, CheckCircleIcon, SparklesIcon } from "@heroicons/vue/24/outline"
import AppNav from "./AppNav.vue"

const { t, tm } = useI18n()
const baseUrl = import.meta.env.BASE_URL

// FOUC fix: read theme synchronously before mount
const savedTheme = localStorage.getItem("katsumii-theme")
const theme = ref(savedTheme === "dark" ? "dark" : "light")

const navigation = computed(() => [
  { name: t("welcomePage.nav.manual"), href: `${baseUrl}app.html?page=manual` },
  { name: t("welcomePage.nav.home"), href: baseUrl },
])

const onboardingSteps = computed(() => tm("welcomePage.onboarding"))
const nextStepItems = computed(() => tm("welcomePage.nextSteps.items"))

const toggleTheme = () => {
  const next = theme.value === "dark" ? "light" : "dark"
  theme.value = next
  localStorage.setItem("katsumii-theme", next)
}

watch(
  theme,
  (value) => {
    document.documentElement.classList.toggle("dark", value === "dark")
  },
  { immediate: true }
)
</script>

<style scoped>
.font-display { font-family: "Sora", sans-serif; }

.k-bg {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}
.k-bg-dark  { --orb-a: rgba(59,130,246,0.28); --orb-b: rgba(34,211,238,0.22); --hc-stroke: rgba(34,211,238,0.02); }
.k-bg-light { --orb-a: rgba(6,182,212,0.16);  --orb-b: rgba(59,130,246,0.12); --hc-stroke: rgba(8,145,178,0.04); }
.k-bg-gradient {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 70% 55% at 50% 10%, var(--orb-a), transparent 60%),
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
</style>
