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
import BugReportPage from "./components/BugReportPage.vue"
import TermsPage from "./components/TermsPage.vue"
import NotFoundPage from "./components/NotFoundPage.vue"
import { SUPPORTED_LOCALES, legacyPageToPath, localeFromPath, localizedPathForRoute, preferredLocale } from "./utils/routes.js"

const localePattern = SUPPORTED_LOCALES.join("|")

const withLocale = (path, component, meta) => ({
  path: `/:locale(${localePattern})${path}`,
  component,
  meta: { ...meta, canonicalPath: path },
})

const legacyRedirect = (path) => ({
  path,
  redirect: (to) => ({
    path: localizedPathForRoute(path, preferredLocale()),
    query: to.query,
    hash: to.hash,
    replace: true,
  }),
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: () => localizedPathForRoute("/app", preferredLocale()) },
    { path: `/:locale(${localePattern})`, redirect: (to) => localizedPathForRoute("/app", to.params.locale) },
    withLocale("/app",       App,           { titleKey: "common.pageTitles.app",       descriptionKey: "common.pageDescriptions.app" }),
    withLocale("/features",  FeaturesPage,  { titleKey: "common.pageTitles.features",  descriptionKey: "common.pageDescriptions.features" }),
    withLocale("/pricing",   PricingPage,   { titleKey: "common.pageTitles.pricing",   descriptionKey: "common.pageDescriptions.pricing" }),
    withLocale("/manual",    ManualPage,    { titleKey: "common.pageTitles.manual",    descriptionKey: "common.pageDescriptions.manual" }),
    withLocale("/faq",       FaqPage,       { titleKey: "common.pageTitles.faq",       descriptionKey: "common.pageDescriptions.faq" }),
    withLocale("/contact",   ContactPage,   { titleKey: "common.pageTitles.contact",   descriptionKey: "common.pageDescriptions.contact" }),
    withLocale("/bugreport", BugReportPage, { titleKey: "common.pageTitles.bugreport", descriptionKey: "common.pageDescriptions.bugreport", robots: "noindex, follow" }),
    withLocale("/impressum", ImpressumPage, { titleKey: "common.pageTitles.impressum", descriptionKey: "common.pageDescriptions.impressum" }),
    withLocale("/privacy",   PrivacyPage,   { titleKey: "common.pageTitles.privacy",   descriptionKey: "common.pageDescriptions.privacy" }),
    withLocale("/terms",     TermsPage,     { titleKey: "common.pageTitles.terms",     descriptionKey: "common.pageDescriptions.terms" }),
    withLocale("/welcome",   WelcomePage,   { titleKey: "common.pageTitles.welcome",   descriptionKey: "common.pageDescriptions.welcome", robots: "noindex, follow" }),
    { path: `/:locale(${localePattern})/:pathMatch(.*)*`, component: NotFoundPage, meta: { titleKey: "common.pageTitles.notFound", descriptionKey: "common.pageDescriptions.notFound", robots: "noindex, follow" } },
    legacyRedirect("/app"),
    legacyRedirect("/features"),
    legacyRedirect("/pricing"),
    legacyRedirect("/manual"),
    legacyRedirect("/faq"),
    legacyRedirect("/contact"),
    legacyRedirect("/bugreport"),
    legacyRedirect("/impressum"),
    legacyRedirect("/privacy"),
    legacyRedirect("/terms"),
    legacyRedirect("/welcome"),
    { path: "/:pathMatch(.*)*", component: NotFoundPage, meta: { titleKey: "common.pageTitles.notFound", descriptionKey: "common.pageDescriptions.notFound", robots: "noindex, follow" } },
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
      return { path: legacyPageToPath[legacyPage](preferredLocale()), replace: true }
    }

    if (fallbackPath && fallbackPath.startsWith("/")) {
      const target = new URL(fallbackPath, window.location.origin)
      const targetLocale = localeFromPath(target.pathname) || preferredLocale()
      return {
        path: localizedPathForRoute(target.pathname, targetLocale),
        query: Object.fromEntries(target.searchParams.entries()),
        hash: target.hash,
        replace: true,
      }
    }

    return { path: localizedPathForRoute("/app", preferredLocale()), replace: true }
  }
})

export default router
