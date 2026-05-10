<template>
  <RouterView />
</template>

<script setup>
import { provide } from "vue"
import { useTheme } from "./composables/useTheme.js"
import { useBg } from "./composables/useBg.js"

const { theme, isDark, toggleTheme } = useTheme()
const { bg, changeBg } = useBg()

provide("theme", theme)
provide("isDark", isDark)
provide("toggleTheme", toggleTheme)
provide("bg", bg)
provide("changeBg", changeBg)
</script>
