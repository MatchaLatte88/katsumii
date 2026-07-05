import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
import { normalizeLocale, pagePath } from "../utils/routes.js"

export const useSiteNavigation = () => {
  const { t } = useI18n()
  const route = useRoute()

  return computed(() => [
    { name: t("common.navigation.home"), href: pagePath("app", normalizeLocale(route.params.locale)) },
    { name: t("common.navigation.features"), href: pagePath("features", normalizeLocale(route.params.locale)) },
    { name: t("common.navigation.pricing"), href: pagePath("pricing", normalizeLocale(route.params.locale)) },
    { name: t("common.navigation.manual"), href: pagePath("manual", normalizeLocale(route.params.locale)) },
    { name: t("common.navigation.faq"), href: pagePath("faq", normalizeLocale(route.params.locale)) },
    { name: t("common.navigation.contact"), href: pagePath("contact", normalizeLocale(route.params.locale)) },
  ])
}
