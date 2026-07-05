import { createI18n } from "vue-i18n"
import de from "./locales/de.json"
import en from "./locales/en.json"
import tw from "./locales/tw.json"
import es from "./locales/es.json"
import { preferredLocale } from "./utils/routes.js"

const SUPPORTED = ["de", "en", "es", "tw"]

const locale = SUPPORTED.includes(preferredLocale()) ? preferredLocale() : "en"

const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: "en",
  messages: { en, de, es, tw },
})

export default i18n
