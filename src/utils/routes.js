const baseUrl = import.meta.env.BASE_URL

export const SUPPORTED_LOCALES = ["en", "de", "es", "tw"]
export const DEFAULT_LOCALE = "en"

export const HREFLANG_BY_LOCALE = {
  en: "en",
  de: "de",
  es: "es",
  tw: "zh-TW",
}

const normalizeBrowserLocale = (lang = "") => {
  const lower = lang.toLowerCase()
  if (lower.startsWith("zh")) return "tw"
  return lower.slice(0, 2)
}

export const normalizeLocale = (locale) =>
  SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE

export const localeFromPath = (pathname = "") => {
  const cleanPath = pathname.replace(/^\/+/, "")
  const [segment] = cleanPath.split("/")
  return SUPPORTED_LOCALES.includes(segment) ? segment : null
}

export const preferredLocale = () => {
  if (typeof window === "undefined") return DEFAULT_LOCALE

  const pathLocale = localeFromPath(window.location.pathname)
  if (pathLocale) return pathLocale

  const savedLocale = window.localStorage.getItem("katsumii-locale")
  if (SUPPORTED_LOCALES.includes(savedLocale)) return savedLocale

  const browserLocale = normalizeBrowserLocale(window.navigator.language)
  return SUPPORTED_LOCALES.includes(browserLocale) ? browserLocale : DEFAULT_LOCALE
}

export const routePath = (path = "", locale = preferredLocale()) => {
  const cleanPath = path.replace(/^\/+/, "")
  const cleanBase = baseUrl.replace(/\/+$/, "")
  const prefix = cleanBase ? `${cleanBase}/` : "/"
  const localizedPath = [normalizeLocale(locale), cleanPath].filter(Boolean).join("/")
  return `${prefix}${localizedPath}`.replace(/\/{2,}/g, "/")
}

export const pagePath = (page, locale) => {
  if (!page || page === "home" || page === "app") return routePath("app", locale)
  return routePath(page, locale)
}

export const unlocalizedPathFromRoute = (path = "") => {
  const cleanPath = path.replace(/^\/+/, "")
  const segments = cleanPath.split("/")
  if (SUPPORTED_LOCALES.includes(segments[0])) segments.shift()
  const rest = segments.join("/")
  return `/${rest || "app"}`
}

export const localizedPathForRoute = (path = "/app", locale = preferredLocale()) =>
  routePath(unlocalizedPathFromRoute(path), locale)

export const localizedAlternatesForPath = (path = "/app") =>
  SUPPORTED_LOCALES.map((locale) => ({
    locale,
    hreflang: HREFLANG_BY_LOCALE[locale],
    path: localizedPathForRoute(path, locale),
  }))

export const legacyPageToPath = {
  faq: (locale) => pagePath("faq", locale),
  impressum: (locale) => pagePath("impressum", locale),
  features: (locale) => pagePath("features", locale),
  welcome: (locale) => pagePath("welcome", locale),
  manual: (locale) => pagePath("manual", locale),
  pricing: (locale) => pagePath("pricing", locale),
  privacy: (locale) => pagePath("privacy", locale),
  contact: (locale) => pagePath("contact", locale),
  bugreport: (locale) => pagePath("bugreport", locale),
  terms: (locale) => pagePath("terms", locale),
}
