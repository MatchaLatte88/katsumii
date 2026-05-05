import { createRouter, createWebHistory } from "vue-router"
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
import NotFoundPage from "./components/NotFoundPage.vue"
import { legacyPageToPath } from "./utils/routes.js"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/app" },
    { path: "/app", component: App },
    { path: "/features", component: FeaturesPage },
    { path: "/pricing", component: PricingPage },
    { path: "/manual", component: ManualPage },
    { path: "/faq", component: FaqPage },
    { path: "/contact", component: ContactPage },
    { path: "/impressum", component: ImpressumPage },
    { path: "/privacy", component: PrivacyPage },
    { path: "/terms", component: TermsPage },
    { path: "/welcome", component: WelcomePage },
    { path: "/:pathMatch(.*)*", component: NotFoundPage },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: "smooth" }
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  if (to.path === "/app.html") {
    const legacyPage = Array.isArray(to.query.page) ? to.query.page[0] : to.query.page
    const fallbackPath = Array.isArray(to.query.path) ? to.query.path[0] : to.query.path

    if (legacyPage && legacyPageToPath[legacyPage]) {
      return { path: legacyPageToPath[legacyPage], replace: true }
    }

    if (fallbackPath && fallbackPath.startsWith("/")) {
      const target = new URL(fallbackPath, window.location.origin)
      return {
        path: target.pathname,
        query: Object.fromEntries(target.searchParams.entries()),
        hash: target.hash,
        replace: true,
      }
    }

    return { path: "/app", replace: true }
  }
})

export default router
