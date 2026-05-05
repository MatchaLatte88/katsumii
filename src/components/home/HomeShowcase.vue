<template>
  <section id="showcase" class="section-band px-5 py-20 sm:px-6 sm:py-24 lg:px-10">
    <div class="mx-auto max-w-7xl space-y-16 lg:space-y-24">
      <article class="showcase-row grid items-center gap-8 lg:grid-cols-[1.14fr_0.86fr] lg:gap-14">
        <div class="reveal screenshot-shell k-main-tile k-glass border p-3 sm:p-4" :class="theme === 'light' ? 'border-gray-200/85 bg-white/78 shadow-[0_24px_80px_-44px_rgba(15,23,42,0.35)]' : 'border-cyan-300/18 bg-slate-900/72 shadow-[0_28px_90px_-50px_rgba(0,0,0,0.82)]'">
          <p :class="['mb-3 text-xs font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">
            {{ t('showcase.dashboardWindowLabel') }}
          </p>
          <img
            :src="theme === 'light' ? assetUrl('Dashboard_light.png') : assetUrl('Dashboard_dark.png')"
            alt="Katsumii dashboard analytics screenshot"
            class="w-full rounded-2xl border"
            :class="theme === 'light' ? 'border-gray-200' : 'border-blue-400/25'"
          />
        </div>

        <div class="reveal flex items-center lg:min-h-full">
          <div>
            <p :class="['text-sm font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">{{ t('showcase.dashboard.label') }}</p>
            <h2 :class="['mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">
              {{ t('showcase.dashboard.headline') }}
            </h2>
            <p :class="['mt-4 text-sm leading-relaxed', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">
              {{ t('showcase.dashboard.description') }}
            </p>
            <ul class="mt-8 space-y-4">
              <li
                v-for="step in dashboardSteps"
                :key="step.title"
                class="rounded-2xl border p-4"
                :class="theme === 'light' ? 'border-gray-200 bg-white/80' : 'border-blue-400/20 bg-slate-900'"
              >
                <p :class="['text-sm font-semibold', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">{{ step.title }}</p>
                <p :class="['mt-1 text-sm', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">{{ step.description }}</p>
              </li>
            </ul>
          </div>
        </div>
      </article>

      <article class="showcase-row grid items-center gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14">
        <div class="reveal flex items-center order-2 lg:order-1 lg:min-h-full">
          <div>
            <p :class="['text-sm font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">{{ t('showcase.calendar.label') }}</p>
            <h2 :class="['mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">
              {{ t('showcase.calendar.headline') }}
            </h2>
            <p :class="['mt-4 text-sm leading-relaxed', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">
              {{ t('showcase.calendar.description') }}
            </p>
            <ul class="mt-8 space-y-4">
              <li
                v-for="step in calendarSteps"
                :key="step.title"
                class="rounded-2xl border p-4"
                :class="theme === 'light' ? 'border-gray-200 bg-white/80' : 'border-blue-400/20 bg-slate-900'"
              >
                <p :class="['text-sm font-semibold', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">{{ step.title }}</p>
                <p :class="['mt-1 text-sm', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">{{ step.description }}</p>
              </li>
            </ul>
          </div>
        </div>

        <div class="reveal screenshot-shell k-main-tile k-glass border p-3 order-1 sm:p-4 lg:order-2" :class="theme === 'light' ? 'border-gray-200/85 bg-white/78 shadow-[0_24px_80px_-44px_rgba(15,23,42,0.35)]' : 'border-cyan-300/18 bg-slate-900/72 shadow-[0_28px_90px_-50px_rgba(0,0,0,0.82)]'">
          <p :class="['mb-3 text-xs font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">
            {{ t('showcase.calendarWindowLabel') }}
          </p>
          <img
            :src="theme === 'light' ? assetUrl('Calendar_light.png') : assetUrl('Calendar_dark.png')"
            alt="Katsumii trading calendar screenshot"
            class="w-full rounded-2xl border"
            :class="theme === 'light' ? 'border-gray-200' : 'border-blue-400/25'"
          />
        </div>
      </article>
    </div>

    <div class="mx-auto mt-8 max-w-7xl text-center reveal">
      <RouterLink
        :to="pagePath('features')"
        :class="[
          'inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5',
          theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-slate-400 hover:text-cyan-200'
        ]"
      >
        {{ t('showcase.seeAll') }}
        <span aria-hidden="true">-&gt;</span>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { pagePath } from "../../utils/routes.js"

defineProps({
  theme: { type: String, required: true },
  assetUrl: { type: Function, required: true },
})

const { t, tm } = useI18n()
const dashboardSteps = computed(() => tm('showcase.dashboardSteps'))
const calendarSteps = computed(() => tm('showcase.calendarSteps'))
</script>
