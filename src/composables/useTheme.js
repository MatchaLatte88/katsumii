import { computed, ref } from "vue"

const GLITCH_SWAP_DELAY = 140
const GLITCH_DURATION = 720

// Muss mit dem Pre-Render-Script in index.html / app.html übereinstimmen,
// sonst flackert das Theme beim ersten Besuch.
const DAY_START_HOUR = 6
const DAY_END_HOUR = 19

const getInitialTheme = () => {
  const saved = localStorage.getItem("katsumii-theme")
  if (saved === "light" || saved === "dark") return saved
  const hour = new Date().getHours()
  return hour >= DAY_START_HOUR && hour < DAY_END_HOUR ? "light" : "dark"
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
