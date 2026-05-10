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
    { path: "/app",       component: App,           meta: { titleKey: "common.pageTitles.app" } },
    { path: "/features",  component: FeaturesPage,  meta: { titleKey: "common.pageTitles.features" } },
    { path: "/pricing",   component: PricingPage,   meta: { titleKey: "common.pageTitles.pricing" } },
    { path: "/manual",    component: ManualPage,    meta: { titleKey: "common.pageTitles.manual" } },
    { path: "/faq",       component: FaqPage,       meta: { titleKey: "common.pageTitles.faq" } },
    { path: "/contact",   component: ContactPage,   meta: { titleKey: "common.pageTitles.contact" } },
    { path: "/impressum", component: ImpressumPage, meta: { titleKey: "common.pageTitles.impressum" } },
    { path: "/privacy",   component: PrivacyPage,   meta: { titleKey: "common.pageTitles.privacy" } },
    { path: "/terms",     component: TermsPage,     meta: { titleKey: "common.pageTitles.terms" } },
    { path: "/welcome",   component: WelcomePage,   meta: { titleKey: "common.pageTitles.welcome" } },
    { path: "/:pathMatch(.*)*", component: NotFoundPage, meta: { titleKey: "common.pageTitles.notFound" } },
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
