<template>
  <div :class="[!isDark ? 'relative overflow-x-hidden min-h-screen bg-slate-50 text-gray-900' : 'relative overflow-x-hidden min-h-screen bg-slate-950 text-slate-100']">
    <div class="k-bg" :class="!isDark ? 'k-bg-light' : 'k-bg-dark'" aria-hidden="true">
      <div class="k-bg-gradient" />
      <svg class="k-bg-grid" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="hc-impressum" x="0" y="0" width="69.28" height="60" patternUnits="userSpaceOnUse">
            <path d="M34.64,0 L51.96,10 L51.96,30 L34.64,40 L17.32,30 L17.32,10 Z M0,0 L17.32,10 M17.32,30 L0,40 M51.96,10 L69.28,0 M69.28,40 L51.96,30 M34.64,40 L34.64,60 M0,40 L0,60" style="fill:none;stroke:var(--hc-stroke);stroke-width:1.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hc-impressum)"/>
      </svg>
      <div class="k-bg-band" />
    </div>

    <AppNav
      :navigation="navigation"
      :brand-title="t('common.brandTitle')"
      :brand-subtitle="t('impressumPage.brandSubtitle')"
      :brand-href="appHomePath"
    />

    <section class="relative isolate px-6 pb-20 pt-28 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <p :class="['text-sm font-semibold tracking-[0.2em] uppercase', !isDark ? 'text-teal-600' : 'text-teal-300']">{{ t('impressumPage.hero.label') }}</p>
        <h1 :class="['mt-4 text-4xl font-semibold tracking-tight sm:text-6xl', !isDark ? 'text-gray-900' : 'text-white']">{{ t('impressumPage.hero.title') }}</h1>
        <p :class="['mx-auto mt-6 max-w-2xl text-lg', !isDark ? 'text-gray-600' : 'text-gray-300']">{{ t('impressumPage.hero.description') }}</p>
      </div>

      <div class="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2">
        <article
          v-for="card in cards"
          :key="card.title"
          :class="[
            'rounded-2xl border p-6 backdrop-blur sm:p-7',
            !isDark ? 'border-gray-200 bg-white/85' : 'border-white/10 bg-gray-800/70'
          ]"
        >
          <h2 :class="['text-sm font-semibold uppercase tracking-[0.12em]', !isDark ? 'text-teal-600' : 'text-teal-300']">{{ card.title }}</h2>
          <p :class="['mt-3 whitespace-pre-line leading-7', !isDark ? 'text-gray-700' : 'text-gray-300']">{{ card.body }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, inject } from "vue"
import { useI18n } from "vue-i18n"
import AppNav from "./AppNav.vue"
import { useSiteNavigation } from "../composables/useSiteNavigation.js"
import { appHomePath } from "../utils/routes.js"

const isDark = inject("isDark")
const { t, tm } = useI18n()

const navigation = useSiteNavigation()

const cards = computed(() => tm("impressumPage.cards"))
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
</style>
