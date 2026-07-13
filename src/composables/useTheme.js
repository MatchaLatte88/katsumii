import { computed, ref } from "vue"

const GLITCH_SWAP_DELAY = 140
const GLITCH_DURATION = 720

const getInitialTheme = () => {
  const saved = localStorage.getItem("katsumii-theme")
  if (saved === "light" || saved === "dark") return saved
  if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light"
  return "dark"
}

export function useTheme() {
  const theme = ref(getInitialTheme())
  const isDark = computed(() => theme.value === "dark")
  const isThemeGlitching = ref(false)
  const nextTheme = ref(theme.value)

  const applyTheme = (value) => {
    theme.value = value
    localStorage.setItem("katsumii-theme", value)
    document.documentElement.classList.toggle("dark", value === "dark")
  }

  const toggleTheme = () => {
    if (isThemeGlitching.value) return

    const value = isDark.value ? "light" : "dark"
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduceMotion) {
      applyTheme(value)
      return
    }

    nextTheme.value = value
    isThemeGlitching.value = true
    document.documentElement.classList.add("theme-glitching")

    window.setTimeout(() => applyTheme(value), GLITCH_SWAP_DELAY)
    window.setTimeout(() => {
      isThemeGlitching.value = false
      document.documentElement.classList.remove("theme-glitching")
    }, GLITCH_DURATION)
  }

  // Apply on init
  document.documentElement.classList.toggle("dark", isDark.value)

  return { theme, isDark, toggleTheme, isThemeGlitching, nextTheme }
}
