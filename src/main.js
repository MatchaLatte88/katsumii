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
}

createApp(ActivePage).use(i18n).mount("#app")
