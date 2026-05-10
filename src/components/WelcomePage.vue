<template>
  <div :class="[!isDark ? 'relative overflow-x-hidden min-h-screen bg-slate-50 text-gray-900' : 'relative overflow-x-hidden min-h-screen bg-slate-950 text-slate-100']">
    <KbBackground :pattern="bg" :isDark="isDark" />

    <AppNav
      :navigation="navigation"
      brand-title="Katsumii"
      brand-subtitle="Welcome"
      :brand-href="appHomePath"
    />

    <section class="relative isolate px-6 pb-28 pt-32 lg:px-8">
      <!-- Hero -->
      <div class="mx-auto max-w-3xl text-center">
        <p :class="['inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]', !isDark ? 'border-teal-200 bg-teal-50 text-teal-700' : 'border-cyan-300/30 bg-cyan-400/10 text-cyan-300']">
          <SparklesIcon class="size-3.5" />
          {{ t('welcomePage.eyebrow') }}
        </p>
        <h1 :class="['mt-6 font-display text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl', !isDark ? 'text-gray-900' : 'text-slate-100']">
          {{ t('welcomePage.heading') }}
        </h1>
        <p :class="['mx-auto mt-6 max-w-2xl text-lg leading-relaxed', !isDark ? 'text-gray-600' : 'text-slate-300']">
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
            !isDark
              ? 'border-gray-200 bg-white/85 shadow-[0_8px_28px_-16px_rgba(15,23,42,0.2)]'
              : 'border-white/10 bg-gray-800/70 hover:bg-gray-800/80'
          ]"
        >
          <span :class="['font-display text-5xl font-bold leading-none', !isDark ? 'text-teal-100' : 'text-cyan-400/20']">
            {{ step.number }}
          </span>
          <h3 :class="['mt-3 text-lg font-semibold', !isDark ? 'text-gray-900' : 'text-white']">
            {{ step.title }}
          </h3>
          <p :class="['mt-2 text-sm leading-relaxed', !isDark ? 'text-gray-600' : 'text-slate-400']">
            {{ step.description }}
          </p>
        </div>
      </div>

      <!-- What to do next checklist -->
      <div class="mx-auto mt-10 max-w-2xl">
        <div
          :class="[
            'rounded-2xl border p-6 sm:p-8',
            !isDark ? 'border-gray-200 bg-white/85 backdrop-blur' : 'border-white/10 bg-gray-800/70 backdrop-blur'
          ]"
        >
          <h2 :class="['text-lg font-semibold', !isDark ? 'text-gray-900' : 'text-white']">
            {{ t('welcomePage.nextSteps.heading') }}
          </h2>
          <ul class="mt-4 space-y-3">
            <li
              v-for="(item, i) in nextStepItems"
              :key="i"
              class="flex items-start gap-3"
            >
              <CheckCircleIcon :class="['mt-0.5 size-5 shrink-0', !isDark ? 'text-teal-600' : 'text-cyan-400']" />
              <span :class="['text-sm', !isDark ? 'text-gray-700' : 'text-slate-300']">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <RouterLink
          :to="pagePath('manual')"
          :class="[
            'inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5',
            !isDark
              ? 'bg-teal-700 text-white shadow-[0_8px_24px_-10px_rgba(15,118,110,0.6)] hover:bg-teal-600'
              : 'bg-cyan-400 text-slate-950 shadow-[0_8px_24px_-10px_rgba(34,211,238,0.5)] hover:bg-cyan-300'
          ]"
        >
          {{ t('welcomePage.cta') }}
          <ArrowRightIcon class="size-4" />
        </RouterLink>
        <RouterLink
          :to="appHomePath"
          :class="['text-sm font-medium transition-colors duration-300', !isDark ? 'text-gray-500 hover:text-gray-800' : 'text-slate-400 hover:text-slate-200']"
        >
          {{ t('welcomePage.nav.home') }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, inject } from "vue"
import { useI18n } from "vue-i18n"
import { ArrowRightIcon, CheckCircleIcon, SparklesIcon } from "@heroicons/vue/24/outline"
import AppNav from "./AppNav.vue"
import KbBackground from "../backgrounds/KbBackground.vue"
import { appHomePath, pagePath } from "../utils/routes.js"

const { t, tm } = useI18n()

const isDark = inject("isDark")
const bg = inject("bg")

const navigation = computed(() => [
  { name: t("welcomePage.nav.manual"), href: pagePath("manual") },
  { name: t("welcomePage.nav.home"), href: appHomePath },
])

const onboardingSteps = computed(() => tm("welcomePage.onboarding"))
const nextStepItems = computed(() => tm("welcomePage.nextSteps.items"))
</script>

<style scoped>
.font-display { font-family: "Sora", sans-serif; }
</style>
