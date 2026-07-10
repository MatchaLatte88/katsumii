<template>
  <footer class="relative z-10 border-t border-gray-200 bg-slate-50 px-6 py-6 dark:border-white/10 dark:bg-slate-950">
    <div class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3">
      <p class="text-sm text-gray-500 dark:text-slate-400">© {{ year }} Katsumii — local &amp; offline trading journal</p>
      <nav class="flex flex-wrap gap-x-6 gap-y-2" aria-label="Legal">
        <RouterLink v-for="link in links" :key="link.page" :to="pagePath(link.page)" class="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-slate-400 dark:hover:text-white">
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </footer>
</template>

<script setup>
import { pagePath } from "../utils/routes.js"

const year = new Date().getFullYear()

const links = [
  { page: "contact", label: "Contact" },
  { page: "privacy", label: "Privacy" },
  { page: "terms", label: "Terms" },
  { page: "impressum", label: "Impressum" },
]
</script>
