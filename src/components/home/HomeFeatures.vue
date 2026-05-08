<template>
  <section id="features" class="section-band px-5 py-20 sm:px-6 sm:py-24 lg:px-10">
    <div class="mx-auto max-w-7xl">
      <div class="reveal max-w-3xl">
        <p :class="['text-sm font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">
          {{ t('features.label') }}
        </p>
        <h2 :class="['mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">
          {{ t('features.headline') }}
        </h2>
      </div>

      <div class="reveal mt-8 overflow-hidden rounded-full border py-2" :class="theme === 'light' ? 'border-gray-200 bg-white/75' : 'border-blue-400/20 bg-slate-900'">
        <div class="feature-marquee flex min-w-max gap-2 px-2">
          <span
            v-for="item in featureTicker"
            :key="item"
            :class="[
              'rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.12em]',
              theme === 'light' ? 'border-teal-200 bg-teal-50 text-teal-700' : 'border-cyan-300/30 bg-cyan-400/10 text-cyan-200'
            ]"
          >
            {{ item }}
          </span>
          <span
            v-for="item in featureTicker"
            :key="`${item}-clone`"
            :class="[
              'rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.12em]',
              theme === 'light' ? 'border-teal-200 bg-teal-50 text-teal-700' : 'border-cyan-300/30 bg-cyan-400/10 text-cyan-200'
            ]"
          >
            {{ item }}
          </span>
        </div>
      </div>

      <div
        class="reveal mt-5 flex max-w-4xl items-start gap-3 rounded-2xl border px-4 py-3 sm:items-center"
        :class="theme === 'light' ? 'border-teal-200/80 bg-teal-50/75 text-gray-700 shadow-sm' : 'border-cyan-300/20 bg-cyan-400/10 text-slate-300'"
      >
        <InformationCircleIcon class="mt-0.5 h-5 w-5 flex-none sm:mt-0" :class="theme === 'light' ? 'text-teal-600' : 'text-cyan-200'" />
        <p class="text-sm leading-relaxed">
          {{ t('brokerSyncNote') }}
        </p>
      </div>

      <article
        class="reveal feature-spotlight k-main-tile k-glass mt-10 grid gap-8 overflow-hidden border p-5 sm:p-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12"
        :class="theme === 'light' ? 'border-gray-200/85 bg-white/82 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.38)]' : 'border-cyan-300/18 bg-slate-900/72 shadow-[0_28px_90px_-54px_rgba(0,0,0,0.82)]'"
      >
        <div class="relative z-10">
          <p :class="['text-xs font-semibold uppercase tracking-[0.18em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">
            {{ t('features.spotlight.label') }}
          </p>
          <h3 :class="['mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">
            {{ t('features.spotlight.headline') }}
          </h3>
          <p :class="['mt-4 max-w-xl text-sm leading-relaxed sm:text-base', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">
            {{ t('features.spotlight.description') }}
          </p>

          <ul class="mt-6 space-y-3">
            <li
              v-for="point in spotlightPoints"
              :key="point"
              class="flex items-start gap-3 rounded-2xl border px-4 py-3"
              :class="theme === 'light' ? 'border-gray-200 bg-gray-50/80' : 'border-blue-400/20 bg-slate-900'"
            >
              <CheckIcon class="mt-0.5 h-5 w-5 flex-none" :class="theme === 'light' ? 'text-teal-600' : 'text-cyan-200'" />
              <span :class="['text-sm', theme === 'light' ? 'text-gray-700' : 'text-slate-200']">{{ point }}</span>
            </li>
          </ul>
        </div>

        <div class="relative z-10 flex items-center">
          <div class="relative w-full">
            <img
              :src="theme === 'light' ? assetUrl('Main_light.png') : assetUrl('Main_dark.png')"
              alt="Katsumii feature spotlight"
              class="w-full rounded-2xl border"
              :class="theme === 'light' ? 'border-gray-200 shadow-xl' : 'border-blue-400/25 shadow-2xl shadow-black/30'"
            />
            <div class="mt-4 grid grid-cols-3 gap-3">
              <div
                v-for="kpi in spotlightKpis"
                :key="kpi.label"
                class="rounded-xl border px-3 py-2 text-center"
                :class="theme === 'light' ? 'border-gray-200 bg-white/95' : 'border-blue-400/25 bg-slate-950/75'"
              >
                <p :class="['text-base font-semibold', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">{{ kpi.value }}</p>
                <p :class="['text-[11px]', theme === 'light' ? 'text-gray-500' : 'text-slate-400']">{{ kpi.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="feature in features"
          :key="feature.name"
          class="reveal feature-card k-sub-tile k-glass k-hover-lift group border p-6"
          :class="theme === 'light' ? 'border-gray-200/85 bg-white/78 hover:border-teal-200 hover:shadow-[0_18px_55px_-35px_rgba(15,23,42,0.34)]' : 'border-cyan-300/14 bg-slate-900/62 hover:border-cyan-300/28 hover:bg-slate-900/82'"
        >
          <component
            :is="feature.icon"
            class="h-6 w-6"
            :class="theme === 'light' ? 'text-teal-600' : 'text-cyan-200'"
          />
          <h3 :class="['mt-4 text-lg font-semibold', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">{{ feature.name }}</h3>
          <p :class="['mt-3 text-sm leading-relaxed', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">{{ feature.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { CheckIcon } from "@heroicons/vue/20/solid"
import { ChartBarIcon, CloudArrowUpIcon, InformationCircleIcon, LockClosedIcon, ServerIcon } from "@heroicons/vue/24/outline"

defineProps({
  theme: { type: String, required: true },
  assetUrl: { type: Function, required: true },
})

const { t, tm } = useI18n()
const featureTicker = computed(() => tm('featureTicker'))
const spotlightPoints = computed(() => tm('features.spotlight.points'))
const spotlightKpis = computed(() => tm('spotlightKpis'))

const features = computed(() => [
  { name: t('features.cards.0.name'), description: t('features.cards.0.description'), icon: ServerIcon },
  { name: t('features.cards.1.name'), description: t('features.cards.1.description'), icon: CloudArrowUpIcon },
  { name: t('features.cards.2.name'), description: t('features.cards.2.description'), icon: ChartBarIcon },
  { name: t('features.cards.3.name'), description: t('features.cards.3.description'), icon: LockClosedIcon },
])
</script>
