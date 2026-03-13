import { createI18n } from "vue-i18n"
import de from "./locales/de.json"
import en from "./locales/en.json"
import tw from "./locales/tw.json"
import es from "./locales/es.json"

const SUPPORTED = ["de", "en", "es", "tw"]

const savedLocale = localStorage.getItem("katsumii-locale")
const browserLocale = navigator.language.slice(0, 2)
const locale = SUPPORTED.includes(savedLocale)
  ? savedLocale
  : SUPPORTED.includes(browserLocale)
    ? browserLocale
    : "en"

const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: "en",
  messages: { en, de, es, tw },
})

export default i18n
