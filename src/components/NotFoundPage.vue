<template>
  <div :class="pageClass">
    <KbBackground pattern="lines" :isDark="theme === 'dark'" />

    <AppNav
      :theme="theme"
      bg="lines"
      :navigation="navigation"
      brand-title="Katsumii"
      brand-subtitle="Page not found"
      :brand-href="appHomePath"
      @toggle-theme="toggleTheme"
    />

    <main class="relative z-10 flex min-h-screen items-center justify-center px-6 py-32">
      <section
        class="k-main-tile k-glass max-w-2xl border p-8 text-center sm:p-12"
        :class="theme === 'light' ? 'border-gray-200 bg-white/85 shadow-xl' : 'border-cyan-300/20 bg-slate-900/75'"
      >
        <p :class="['text-sm font-semibold uppercase tracking-[0.18em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-300']">
          404
        </p>
        <h1 :class="['mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">
          Page not found
        </h1>
        <p :class="['mx-auto mt-4 max-w-md text-sm leading-relaxed sm:text-base', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">
          This Katsumii page does not exist or has moved.
        </p>
        <RouterLink
          :to="appHomePath"
          class="mt-8 inline-flex rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
          :class="theme === 'light' ? 'bg-teal-600 text-white hover:bg-teal-500' : 'bg-cyan-300 text-slate-950 hover:bg-cyan-200'"
        >
          Back to Katsumii
        </RouterLink>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue"
import AppNav from "./AppNav.vue"
import KbBackground from "../backgrounds/KbBackground.vue"
import { appHomePath, pagePath } from "../utils/routes.js"

const savedTheme = localStorage.getItem("katsumii-theme")
const theme = ref(savedTheme === "dark" ? "dark" : "light")

const navigation = [
  { name: "Features", href: pagePath("features") },
  { name: "Pricing", href: pagePath("pricing") },
  { name: "FAQ", href: pagePath("faq") },
]

const toggleTheme = () => {
  const next = theme.value === "dark" ? "light" : "dark"
  theme.value = next
  localStorage.setItem("katsumii-theme", next)
}

watch(theme, (value) => {
  document.documentElement.classList.toggle("dark", value === "dark")
}, { immediate: true })

const pageClass = computed(() =>
  theme.value === "light"
    ? "relative min-h-screen overflow-x-hidden bg-slate-50 text-gray-900"
    : "relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100"
)
</script>
