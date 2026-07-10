import { createRouter, createWebHistory } from "vue-router"
import { SUPPORTED_LOCALES, legacyPageToPath, localeFromPath, localizedPathForRoute, preferredLocale } from "./utils/routes.js"

const FaqPage = () => import("./components/FaqPage.vue")
const ImpressumPage = () => import("./components/ImpressumPage.vue")
const FeaturesPage = () => import("./components/FeaturesPage.vue")
const PropFirmChallengesPage = () => import("./components/PropFirmChallengesPage.vue")
const FundedAccountsPage = () => import("./components/FundedAccountsPage.vue")
const PersonalTradingPage = () => import("./components/PersonalTradingPage.vue")
const BacktestingPage = () => import("./components/BacktestingPage.vue")
const AnalyticsReviewsPage = () => import("./components/AnalyticsReviewsPage.vue")
const LocalFirstPage = () => import("./components/LocalFirstPage.vue")
const WelcomePage = () => import("./components/WelcomePage.vue")
const ManualPage = () => import("./components/ManualPage.vue")
const PricingPage = () => import("./components/PricingPage.vue")
const PrivacyPage = () => import("./components/PrivacyPage.vue")
const ContactPage = () => import("./components/ContactPage.vue")
const BugReportPage = () => import("./components/BugReportPage.vue")
const TermsPage = () => import("./components/TermsPage.vue")
const NotFoundPage = () => import("./components/NotFoundPage.vue")
const LandingV2 = () => import("./components/LandingV2.vue")
const LandingV3 = () => import("./components/LandingV3.vue")
const LandingV4 = () => import("./components/LandingV4.vue")
const LandingV5 = () => import("./components/LandingV5.vue")
const LandingV6 = () => import("./components/LandingV6.vue")

const localePattern = SUPPORTED_LOCALES.join("|")

/* V6 discipline accents — mirror the "Four disciplines" stage on the landing */
const V6_ACCENTS = {
  funded:    { dark: ["#22d3ee", "#67e8f9"], light: ["#0369a1", "#075985"] },
  challenge: { dark: ["#facc15", "#fde68a"], light: ["#ab7503", "#8a5e02"] },
  personal:  { dark: ["#4ade80", "#a7f3c0"], light: ["#047857", "#065f46"] },
  backtest:  { dark: ["#818cf8", "#c4b5fd"], light: ["#6d28d9", "#5b21b6"] },
}

const withLocale = (path, component, meta) => ({
  path: `/:locale(${localePattern})${path}`,
  component,
  meta: { ...meta, canonicalPath: path },
})

const LOCAL_OFFLINE_PATH = "/local-offline"
const LEGACY_LOCAL_OFFLINE_PATH = "/local" + "-first"

const legacyRedirect = (path) => ({
  path,
  redirect: (to) => ({
    path: localizedPathForRoute(path, preferredLocale()),
    query: to.query,
    hash: to.hash,
    replace: true,
  }),
})

const legacyRedirectTo = (fromPath, toPath) => ({
  path: fromPath,
  redirect: (to) => ({
    path: localizedPathForRoute(toPath, preferredLocale()),
    query: to.query,
    hash: to.hash,
    replace: true,
  }),
})

const localizedLegacyRedirectTo = (fromPath, toPath) => ({
  path: `/:locale(${localePattern})${fromPath}`,
  redirect: (to) => ({
    path: localizedPathForRoute(toPath, to.params.locale),
    query: to.query,
    hash: to.hash,
    replace: true,
  }),
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: () => localizedPathForRoute("/app", preferredLocale()) },
    { path: "/v2", component: LandingV2, meta: { titleKey: "common.pageTitles.app", descriptionKey: "common.pageDescriptions.app", robots: "noindex, follow" } },
    { path: "/v3", component: LandingV3, meta: { titleKey: "common.pageTitles.app", descriptionKey: "common.pageDescriptions.app", robots: "noindex, follow" } },
    { path: "/v4", component: LandingV4, meta: { titleKey: "common.pageTitles.app", descriptionKey: "common.pageDescriptions.app", robots: "noindex, follow" } },
    { path: "/v5", component: LandingV5, meta: { titleKey: "common.pageTitles.app", descriptionKey: "common.pageDescriptions.app", robots: "noindex, follow" } },
    { path: "/v6", redirect: () => localizedPathForRoute("/app", preferredLocale()) },
    { path: `/:locale(${localePattern})`, redirect: (to) => localizedPathForRoute("/app", to.params.locale) },
    withLocale("/app",       LandingV6,     { titleKey: "common.pageTitles.app",       descriptionKey: "common.pageDescriptions.app", v6: true }),
    withLocale("/features",  FeaturesPage,  { titleKey: "common.pageTitles.features",  descriptionKey: "common.pageDescriptions.features", v6: true }),
    withLocale("/prop-firm-challenges", PropFirmChallengesPage, { titleKey: "common.pageTitles.propFirmChallenges", descriptionKey: "common.pageDescriptions.propFirmChallenges", v6: true, v6Accent: V6_ACCENTS.challenge }),
    withLocale("/funded-accounts", FundedAccountsPage, { titleKey: "common.pageTitles.fundedAccounts", descriptionKey: "common.pageDescriptions.fundedAccounts", v6: true, v6Accent: V6_ACCENTS.funded }),
    withLocale("/personal-trading", PersonalTradingPage, { titleKey: "common.pageTitles.personalTrading", descriptionKey: "common.pageDescriptions.personalTrading", v6: true, v6Accent: V6_ACCENTS.personal }),
    withLocale("/backtesting", BacktestingPage, { titleKey: "common.pageTitles.backtesting", descriptionKey: "common.pageDescriptions.backtesting", v6: true, v6Accent: V6_ACCENTS.backtest }),
    withLocale("/analytics-reviews", AnalyticsReviewsPage, { titleKey: "common.pageTitles.analyticsReviews", descriptionKey: "common.pageDescriptions.analyticsReviews" }),
    withLocale(LOCAL_OFFLINE_PATH, LocalFirstPage, { titleKey: "common.pageTitles.localFirst", descriptionKey: "common.pageDescriptions.localFirst" }),
    withLocale("/pricing",   PricingPage,   { titleKey: "common.pageTitles.pricing",   descriptionKey: "common.pageDescriptions.pricing", v6: true, v6DimBg: true }),
    withLocale("/manual",    ManualPage,    { titleKey: "common.pageTitles.manual",    descriptionKey: "common.pageDescriptions.manual", v6: true, v6NoBg: true }),
    withLocale("/faq",       FaqPage,       { titleKey: "common.pageTitles.faq",       descriptionKey: "common.pageDescriptions.faq", v6: true, v6DimBg: true }),
    withLocale("/contact",   ContactPage,   { titleKey: "common.pageTitles.contact",   descriptionKey: "common.pageDescriptions.contact", v6: true, v6DimBg: true }),
    withLocale("/bugreport", BugReportPage, { titleKey: "common.pageTitles.bugreport", descriptionKey: "common.pageDescriptions.bugreport", robots: "noindex, follow", v6: true, v6DimBg: true }),
    withLocale("/impressum", ImpressumPage, { titleKey: "common.pageTitles.impressum", descriptionKey: "common.pageDescriptions.impressum", v6: true, v6NoBg: true }),
    withLocale("/privacy",   PrivacyPage,   { titleKey: "common.pageTitles.privacy",   descriptionKey: "common.pageDescriptions.privacy", v6: true, v6NoBg: true }),
    withLocale("/terms",     TermsPage,     { titleKey: "common.pageTitles.terms",     descriptionKey: "common.pageDescriptions.terms", v6: true, v6NoBg: true }),
    withLocale("/welcome",   WelcomePage,   { titleKey: "common.pageTitles.welcome",   descriptionKey: "common.pageDescriptions.welcome", robots: "noindex, follow" }),
    localizedLegacyRedirectTo(LEGACY_LOCAL_OFFLINE_PATH, LOCAL_OFFLINE_PATH),
    { path: `/:locale(${localePattern})/:pathMatch(.*)*`, component: NotFoundPage, meta: { titleKey: "common.pageTitles.notFound", descriptionKey: "common.pageDescriptions.notFound", robots: "noindex, follow" } },
    legacyRedirect("/app"),
    legacyRedirect("/features"),
    legacyRedirect("/prop-firm-challenges"),
    legacyRedirect("/funded-accounts"),
    legacyRedirect("/personal-trading"),
    legacyRedirect("/backtesting"),
    legacyRedirect("/analytics-reviews"),
    legacyRedirectTo(LEGACY_LOCAL_OFFLINE_PATH, LOCAL_OFFLINE_PATH),
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
