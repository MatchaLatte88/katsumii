<template>
  <div :class="pageClass">
    <KbBackground pattern="lines" :isDark="isDark" />

    <AppNav
      :navigation="navigation"
      :brand-title="t('common.brandTitle')"
      :brand-subtitle="t('notFoundPage.brandSubtitle')"
      :brand-href="pagePath('app')"
    />

    <main class="relative z-10 flex min-h-screen items-center justify-center px-6 py-32">
      <section
        class="k-main-tile k-glass max-w-2xl border p-8 text-center sm:p-12"
        :class="!isDark ? 'border-gray-200 bg-white/85 shadow-xl' : 'border-cyan-300/20 bg-slate-900/75'"
      >
        <p :class="['text-sm font-semibold uppercase tracking-[0.18em]', !isDark ? 'text-teal-700' : 'text-cyan-300']">
          {{ t('notFoundPage.label') }}
        </p>
        <h1 :class="['mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl', !isDark ? 'text-gray-900' : 'text-slate-100']">
          {{ t('notFoundPage.title') }}
        </h1>
        <p :class="['mx-auto mt-4 max-w-md text-sm leading-relaxed sm:text-base', !isDark ? 'text-gray-600' : 'text-slate-300']">
          {{ t('notFoundPage.description') }}
        </p>
        <RouterLink
          :to="pagePath('app')"
          class="mt-8 inline-flex rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
          :class="!isDark ? 'bg-teal-600 text-white hover:bg-teal-500' : 'bg-cyan-300 text-slate-950 hover:bg-cyan-200'"
        >
          {{ t('notFoundPage.cta') }}
        </RouterLink>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, inject } from "vue"
import { useI18n } from "vue-i18n"
import AppNav from "./AppNav.vue"
import KbBackground from "../backgrounds/KbBackground.vue"
import { useSiteNavigation } from "../composables/useSiteNavigation.js"
import { pagePath } from "../utils/routes.js"

const isDark = inject("isDark")
const { t } = useI18n()

const navigation = useSiteNavigation()

const pageClass = computed(() =>
  isDark.value
    ? "relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100"
    : "relative min-h-screen overflow-x-hidden bg-slate-50 text-gray-900"
)
</script>
