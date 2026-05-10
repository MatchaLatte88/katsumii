<template>
  <RouterView />
</template>

<script setup>
import { provide, watch } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
import { useTheme } from "./composables/useTheme.js"
import { useBg } from "./composables/useBg.js"

const route = useRoute()
const { locale, t } = useI18n()
const { theme, isDark, toggleTheme } = useTheme()
const { bg, changeBg } = useBg()

provide("theme", theme)
provide("isDark", isDark)
provide("toggleTheme", toggleTheme)
provide("bg", bg)
provide("changeBg", changeBg)

watch(
  [() => route.meta.titleKey, locale],
  ([titleKey]) => {
    document.title = typeof titleKey === "string" ? t(titleKey) : t("common.pageTitles.default")
  },
  { immediate: true },
)
</script>
