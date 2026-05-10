import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { appHomePath, pagePath } from "../utils/routes.js"

export const useSiteNavigation = () => {
  const { t } = useI18n()

  return computed(() => [
    { name: t("common.navigation.home"), href: appHomePath },
    { name: t("common.navigation.features"), href: pagePath("features") },
    { name: t("common.navigation.pricing"), href: pagePath("pricing") },
    { name: t("common.navigation.manual"), href: pagePath("manual") },
    { name: t("common.navigation.faq"), href: pagePath("faq") },
    { name: t("common.navigation.contact"), href: pagePath("contact") },
  ])
}
