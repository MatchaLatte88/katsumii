<template>
  <section class="px-5 pb-20 sm:px-6 lg:px-10">
    <div
      class="reveal k-main-tile k-glass mx-auto max-w-3xl border px-6 py-10 text-center sm:px-10"
      :class="isDark ? 'border-cyan-300/14 bg-slate-900/62' : 'border-gray-200/85 bg-white/80 shadow-[0_22px_75px_-52px_rgba(15,23,42,0.4)]'"
    >
      <span
        class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest"
        :class="isDark ? 'border-cyan-400/25 bg-cyan-400/8 text-cyan-300' : 'border-teal-500/30 bg-teal-50 text-teal-700'"
      >
        {{ t('demo.badge') }}
      </span>

      <h2
        class="mt-5 font-display text-2xl font-semibold sm:text-3xl"
        :class="isDark ? 'text-slate-100' : 'text-gray-900'"
      >
        {{ t('demo.headline') }}
      </h2>

      <p
        class="mx-auto mt-3 max-w-sm text-sm leading-relaxed"
        :class="isDark ? 'text-slate-400' : 'text-gray-500'"
      >
        {{ t('demo.description') }}
      </p>

      <ul class="mt-6 flex flex-col items-center gap-2">
        <li
          v-for="point in tm('demo.points')"
          :key="point"
          class="flex items-center gap-2 text-sm"
          :class="isDark ? 'text-slate-300' : 'text-gray-600'"
        >
          <CheckIcon
            class="h-4 w-4 flex-shrink-0"
            :class="isDark ? 'text-cyan-400' : 'text-teal-600'"
          />
          {{ point }}
        </li>
      </ul>

      <RouterLink
        :to="pagePath('pricing')"
        class="mt-7 inline-flex rounded-full border px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
        :class="isDark ? 'border-blue-400/30 text-slate-200 hover:bg-slate-800/60' : 'border-gray-300 text-gray-700 hover:bg-gray-50'"
      >
        {{ t('demo.cta') }}
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { inject } from "vue"
import { useI18n } from "vue-i18n"
import { CheckIcon } from "@heroicons/vue/20/solid"
import { pagePath } from "../../utils/routes.js"

const isDark = inject("isDark")
const { t, tm } = useI18n()
</script>
