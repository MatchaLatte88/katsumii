<template>
  <section id="compatibility" class="px-5 py-16 sm:px-6 sm:py-20 lg:px-10">
    <div class="mx-auto max-w-7xl">
      <div class="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div class="reveal">
          <p :class="['text-sm font-semibold uppercase tracking-[0.16em]', isDark ? 'text-cyan-200' : 'text-teal-700']">
            {{ t('compatibility.label') }}
          </p>
          <h2 :class="['mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl', isDark ? 'text-slate-100' : 'text-gray-900']">
            {{ t('compatibility.headline') }}
          </h2>
          <p :class="['mt-4 max-w-xl text-sm leading-relaxed sm:text-base', isDark ? 'text-slate-300' : 'text-gray-600']">
            {{ t('compatibility.description') }}
          </p>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <article
            v-for="group in requirementGroups"
            :key="group.title"
            class="reveal k-sub-tile k-glass border p-5 sm:p-6"
            :class="isDark ? 'border-cyan-300/14 bg-slate-900/62' : 'border-gray-200/85 bg-white/78 shadow-[0_18px_55px_-38px_rgba(15,23,42,0.3)]'"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                :class="isDark ? 'border-cyan-300/20 bg-cyan-400/10 text-cyan-200' : 'border-teal-200 bg-teal-50 text-teal-700'"
              >
                <component :is="group.icon" class="h-5 w-5" />
              </div>
              <h3 :class="['text-base font-semibold', isDark ? 'text-slate-100' : 'text-gray-900']">
                {{ group.title }}
              </h3>
            </div>

            <ul class="mt-5 space-y-3">
              <li
                v-for="item in group.items"
                :key="item"
                class="flex items-start gap-3 text-sm leading-relaxed"
                :class="isDark ? 'text-slate-300' : 'text-gray-600'"
              >
                <CheckIcon class="mt-0.5 h-4 w-4 shrink-0" :class="isDark ? 'text-cyan-300' : 'text-teal-600'" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>

      <div class="mt-5 grid gap-4 lg:grid-cols-2">
        <article
          v-for="note in notes"
          :key="note.title"
          class="reveal flex items-start gap-3 rounded-2xl border px-4 py-4 sm:px-5"
          :class="isDark ? 'border-cyan-300/18 bg-cyan-400/10' : 'border-teal-200/80 bg-teal-50/75 shadow-sm'"
        >
          <component
            :is="note.icon"
            class="mt-0.5 h-5 w-5 shrink-0"
            :class="isDark ? 'text-cyan-200' : 'text-teal-600'"
          />
          <div>
            <h3 :class="['text-sm font-semibold', isDark ? 'text-slate-100' : 'text-gray-900']">
              {{ note.title }}
            </h3>
            <p :class="['mt-1 text-sm leading-relaxed', isDark ? 'text-slate-300' : 'text-gray-700']">
              {{ note.body }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, inject } from "vue"
import { useI18n } from "vue-i18n"
import { CheckIcon } from "@heroicons/vue/20/solid"
import { ComputerDesktopIcon, CpuChipIcon, InformationCircleIcon, KeyIcon } from "@heroicons/vue/24/outline"

const isDark = inject("isDark")
const { t, tm } = useI18n()

const list = (key) => {
  const value = tm(key)
  return Array.isArray(value) ? value : []
}

const requirementGroups = computed(() => [
  {
    title: t("compatibility.platforms.title"),
    items: list("compatibility.platforms.items"),
    icon: ComputerDesktopIcon,
  },
  {
    title: t("compatibility.requirements.title"),
    items: list("compatibility.requirements.items"),
    icon: CpuChipIcon,
  },
])

const notes = computed(() => [
  {
    title: t("compatibility.integration.title"),
    body: t("compatibility.integration.body"),
    icon: InformationCircleIcon,
  },
  {
    title: t("compatibility.api.title"),
    body: t("compatibility.api.body"),
    icon: KeyIcon,
  },
])
</script>
