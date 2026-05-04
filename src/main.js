import { createApp } from "vue"
import "./style.css"
import "./backgrounds/kb-tokens.css"
import "./backgrounds/kb-blobs.css"
import "./backgrounds/kb-glass.css"
import App from "./App.vue"
import FaqPage from "./components/FaqPage.vue"
import ImpressumPage from "./components/ImpressumPage.vue"
import FeaturesPage from "./components/FeaturesPage.vue"
import WelcomePage from "./components/WelcomePage.vue"
import ManualPage from "./components/ManualPage.vue"
import PricingPage from "./components/PricingPage.vue"
import PrivacyPage from "./components/PrivacyPage.vue"
import ContactPage from "./components/ContactPage.vue"
import TermsPage from "./components/TermsPage.vue"
import i18n from "./i18n.js"

const params = new URLSearchParams(window.location.search)
const page = params.get("page")

let ActivePage = App
if (page === "faq") {
  ActivePage = FaqPage
} else if (page === "impressum") {
  ActivePage = ImpressumPage
} else if (page === "features") {
  ActivePage = FeaturesPage
} else if (page === "welcome") {
  ActivePage = WelcomePage
} else if (page === "manual") {
  ActivePage = ManualPage
} else if (page === "pricing") {
  ActivePage = PricingPage
} else if (page === "privacy") {
  ActivePage = PrivacyPage
} else if (page === "contact") {
  ActivePage = ContactPage
} else if (page === "terms") {
  ActivePage = TermsPage
}

createApp(ActivePage).use(i18n).mount("#app")
