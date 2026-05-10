import { ref } from "vue"

const KNOWN_BG = new Set(["honeycomb", "lines"])
const BG_MIGRATE = { flow: "lines", sky: "honeycomb", seasonal: "honeycomb" }

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function useBg() {
  const _savedBg = localStorage.getItem("katsumii-bg") || "lines"
  const _isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768
  const _migrated = BG_MIGRATE[_savedBg] ?? _savedBg
  const _resolved = KNOWN_BG.has(_migrated) ? _migrated : "lines"

  const _forceHoneycomb = _isMobile || prefersReducedMotion()
  const bg = ref(_forceHoneycomb ? "honeycomb" : _resolved)

  const changeBg = (val) => {
    bg.value = prefersReducedMotion() ? "honeycomb" : val
    localStorage.setItem("katsumii-bg", val)
  }

  return { bg, changeBg }
}
