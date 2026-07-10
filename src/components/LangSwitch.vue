<template>
  <Menu as="div" class="relative">
    <MenuButton
      :class="[
        'flex items-center gap-1 rounded-xl px-2 py-1 text-xs font-semibold uppercase tracking-widest transition-all duration-200',
        isDark
          ? 'text-slate-300 hover:bg-slate-800/80 hover:text-slate-100'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      ]"
    >
      <GlobeAltIcon class="h-4 w-4" />
      {{ LABELS[locale] ?? locale }}
    </MenuButton>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <MenuItems
        :class="[
          'absolute right-0 mt-1 w-32 origin-top-right rounded-xl border py-1 shadow-lg focus:outline-none',
          isDark
            ? 'border-blue-400/25 bg-slate-900/95 shadow-black/40'
            : 'border-gray-200 bg-white/95 shadow-gray-200/60'
        ]"
      >
        <MenuItem
          v-for="lang in LOCALES"
          :key="lang"
          v-slot="{ active }"
        >
          <button
            @click="setLocale(lang)"
            :class="[
              'flex w-full items-center gap-2.5 px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-colors duration-150',
              locale === lang
                ? isDark ? 'text-cyan-300' : 'text-teal-700'
                : isDark
                  ? active ? 'bg-slate-800/60 text-slate-100' : 'text-slate-400'
                  : active ? 'bg-gray-50 text-gray-900' : 'text-gray-600'
            ]"
          >
            <span class="w-4 text-center">{{ locale === lang ? '✓' : '' }}</span>
            {{ NAMES[lang] ?? lang.toUpperCase() }}
          </button>
        </MenuItem>
      </MenuItems>
    </Transition>
  </Menu>
</template>

<script setup>
import { inject } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute, useRouter } from "vue-router"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue"
import { GlobeAltIcon } from "@heroicons/vue/24/outline"
import { setI18nLocale } from "../i18n.js"
import { localizedPathForRoute, unlocalizedPathFromRoute } from "../utils/routes.js"

const isDark = inject("isDark")
const { locale } = useI18n()
const route = useRoute()
const router = useRouter()

const LOCALES = ["en", "de", "es", "tw"]

const LABELS = {
  tw: "zh",
}

const NAMES = {
  de: "Deutsch",
  en: "English",
  es: "Español",
  tw: "繁體中文",
}

const setLocale = async (lang) => {
  const normalized = await setI18nLocale(lang)
  localStorage.setItem("katsumii-locale", normalized)
  const canonicalPath = route.meta.canonicalPath || unlocalizedPathFromRoute(route.path)
  void router.push({
    path: localizedPathForRoute(canonicalPath, normalized),
    query: route.query,
    hash: route.hash,
  })
}
</script>
