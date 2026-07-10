import { createApp } from "vue"
import "./style.css"
import "./backgrounds/kb-tokens.css"
import "./backgrounds/kb-blobs.css"
import "./backgrounds/kb-glass.css"
import "./styles/v6.css"
import AppShell from "./AppShell.vue"
import router from "./router.js"
import i18n, { initialLocale, loadLocaleMessages } from "./i18n.js"

loadLocaleMessages(initialLocale).then(() => {
  createApp(AppShell).use(router).use(i18n).mount("#app")
})
