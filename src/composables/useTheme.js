import { computed, ref, watch } from "vue"

const getInitialTheme = () => {
  const saved = localStorage.getItem("katsumii-theme")
  if (saved === "light" || saved === "dark") return saved
  if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light"
  return "dark"
}

export function useTheme() {
  const theme = ref(getInitialTheme())
  const isDark = computed(() => theme.value === "dark")

  const applyTheme = (value) => {
    theme.value = value
    localStorage.setItem("katsumii-theme", value)
    document.documentElement.classList.toggle("dark", value === "dark")
  }

  const toggleTheme = () => applyTheme(isDark.value ? "light" : "dark")

  // Apply on init
  document.documentElement.classList.toggle("dark", isDark.value)

  return { theme, isDark, toggleTheme }
}
