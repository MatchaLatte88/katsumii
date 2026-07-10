import { createI18n } from "vue-i18n"
import en from "./locales/en.json"
import { DEFAULT_LOCALE, normalizeLocale, preferredLocale } from "./utils/routes.js"

const localeLoaders = {
  de: () => import("./locales/de.json"),
  en: () => Promise.resolve({ default: en }),
  es: () => import("./locales/es.json"),
  tw: () => import("./locales/tw.json"),
}

export const initialLocale = normalizeLocale(preferredLocale())

const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: DEFAULT_LOCALE,
  messages: { [DEFAULT_LOCALE]: en },
})

const loadedLocales = new Set([DEFAULT_LOCALE])

export const loadLocaleMessages = async (locale) => {
  const normalized = normalizeLocale(locale)
  if (loadedLocales.has(normalized)) return normalized

  const messages = await localeLoaders[normalized]()
  i18n.global.setLocaleMessage(normalized, messages.default)
  loadedLocales.add(normalized)
  return normalized
}

export const setI18nLocale = async (locale) => {
  const normalized = await loadLocaleMessages(locale)
  i18n.global.locale.value = normalized
  return normalized
}

export default i18n
