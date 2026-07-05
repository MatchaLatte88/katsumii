const baseUrl = import.meta.env.BASE_URL

export const routePath = (path = "") => {
  const cleanPath = path.replace(/^\/+/, "")
  return `${baseUrl}${cleanPath}` || "/"
}

export const appHomePath = routePath("app")

export const pagePath = (page) => {
  if (!page || page === "home" || page === "app") return appHomePath
  return routePath(page)
}

export const legacyPageToPath = {
  faq: pagePath("faq"),
  impressum: pagePath("impressum"),
  features: pagePath("features"),
  welcome: pagePath("welcome"),
  manual: pagePath("manual"),
  pricing: pagePath("pricing"),
  privacy: pagePath("privacy"),
  contact: pagePath("contact"),
  bugreport: pagePath("bugreport"),
  terms: pagePath("terms"),
}
