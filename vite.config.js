import { readFileSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const appRoutes = new Set([
  '/app',
  '/features',
  '/prop-firm-challenges',
  '/funded-accounts',
  '/personal-trading',
  '/backtesting',
  '/analytics-reviews',
  '/local-offline',
  '/local' + '-first',
  '/pricing',
  '/manual',
  '/faq',
  '/contact',
  '/bugreport',
  '/impressum',
  '/privacy',
  '/terms',
  '/welcome',
])

const SITE_URL = 'https://www.katsumii.com'
const SOCIAL_IMAGE = `${SITE_URL}/Dashboard_dark.png`
const LASTMOD = '2026-07-05'

const SUPPORTED_LOCALES = ['en', 'de', 'es', 'tw']
const HREFLANG_BY_LOCALE = {
  en: 'en',
  de: 'de',
  es: 'es',
  tw: 'zh-TW',
}

const localeMessages = Object.fromEntries(
  SUPPORTED_LOCALES.map((locale) => [
    locale,
    JSON.parse(readFileSync(resolve(__dirname, `src/locales/${locale}.json`), 'utf8')),
  ]),
)

const localeText = (locale, key) => {
  const value = key.split('.').reduce((current, segment) => current?.[segment], localeMessages[locale])
  if (typeof value === 'string') return value
  const fallback = key.split('.').reduce((current, segment) => current?.[segment], localeMessages.en)
  return typeof fallback === 'string' ? fallback : key
}

const staticRouteMeta = [
  {
    path: '/app',
    titleKey: 'common.pageTitles.app',
    descriptionKey: 'common.pageDescriptions.app',
    priority: '1.0',
  },
  {
    path: '/features',
    titleKey: 'common.pageTitles.features',
    descriptionKey: 'common.pageDescriptions.features',
    priority: '0.9',
  },
  {
    path: '/prop-firm-challenges',
    titleKey: 'common.pageTitles.propFirmChallenges',
    descriptionKey: 'common.pageDescriptions.propFirmChallenges',
    priority: '0.8',
  },
  {
    path: '/funded-accounts',
    titleKey: 'common.pageTitles.fundedAccounts',
    descriptionKey: 'common.pageDescriptions.fundedAccounts',
    priority: '0.8',
  },
  {
    path: '/personal-trading',
    titleKey: 'common.pageTitles.personalTrading',
    descriptionKey: 'common.pageDescriptions.personalTrading',
    priority: '0.8',
  },
  {
    path: '/backtesting',
    titleKey: 'common.pageTitles.backtesting',
    descriptionKey: 'common.pageDescriptions.backtesting',
    priority: '0.8',
  },
  {
    path: '/analytics-reviews',
    titleKey: 'common.pageTitles.analyticsReviews',
    descriptionKey: 'common.pageDescriptions.analyticsReviews',
    priority: '0.8',
  },
  {
    path: '/local-offline',
    titleKey: 'common.pageTitles.localFirst',
    descriptionKey: 'common.pageDescriptions.localFirst',
    priority: '0.8',
  },
  {
    path: '/pricing',
    titleKey: 'common.pageTitles.pricing',
    descriptionKey: 'common.pageDescriptions.pricing',
    priority: '0.9',
  },
  {
    path: '/manual',
    titleKey: 'common.pageTitles.manual',
    descriptionKey: 'common.pageDescriptions.manual',
    priority: '0.7',
  },
  {
    path: '/faq',
    titleKey: 'common.pageTitles.faq',
    descriptionKey: 'common.pageDescriptions.faq',
    priority: '0.7',
  },
  {
    path: '/contact',
    titleKey: 'common.pageTitles.contact',
    descriptionKey: 'common.pageDescriptions.contact',
    priority: '0.5',
  },
  {
    path: '/impressum',
    titleKey: 'common.pageTitles.impressum',
    descriptionKey: 'common.pageDescriptions.impressum',
    priority: '0.3',
  },
  {
    path: '/privacy',
    titleKey: 'common.pageTitles.privacy',
    descriptionKey: 'common.pageDescriptions.privacy',
    priority: '0.3',
  },
  {
    path: '/terms',
    titleKey: 'common.pageTitles.terms',
    descriptionKey: 'common.pageDescriptions.terms',
    priority: '0.3',
  },
  {
    path: '/welcome',
    titleKey: 'common.pageTitles.welcome',
    descriptionKey: 'common.pageDescriptions.welcome',
    robots: 'noindex, follow',
  },
  {
    path: '/bugreport',
    titleKey: 'common.pageTitles.bugreport',
    descriptionKey: 'common.pageDescriptions.bugreport',
    robots: 'noindex, follow',
  },
]

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

const upsertMetaTag = (html, matcher, tag) => {
  if (matcher.test(html)) return html.replace(matcher, tag)
  return html.replace('</head>', `  ${tag}\n</head>`)
}

const localizedRoutePath = (route, locale) => `/${locale}${route.path}`

const routeUrl = (route, locale) => `${SITE_URL}${localizedRoutePath(route, locale)}`

const normalizePreviewPath = (pathname = '/') => pathname.replace(/\/+$/, '') || '/'

const staticPreviewPaths = new Set([
  ...staticRouteMeta.flatMap((route) => [
    route.path,
    ...SUPPORTED_LOCALES.map((locale) => localizedRoutePath(route, locale)),
  ]),
  ...SUPPORTED_LOCALES.map((locale) => `/${locale}`),
])

const hasStaticPreviewPage = (pathname) => staticPreviewPaths.has(normalizePreviewPath(pathname))

const alternateTags = (route) => [
  ...SUPPORTED_LOCALES.map((locale) =>
    `<link rel="alternate" hreflang="${HREFLANG_BY_LOCALE[locale]}" href="${routeUrl(route, locale)}" data-katsumii-hreflang="true" />`
  ),
  `<link rel="alternate" hreflang="x-default" href="${routeUrl(route, 'en')}" data-katsumii-hreflang="true" />`,
].join('\n  ')

const stripAlternateTags = (html) =>
  html.replace(/\n\s*<link\s+rel="alternate"[^>]*data-katsumii-hreflang="true"[^>]*>/gi, '')

const structuredDataJson = (route, locale, title, description, canonical) => {
  const appRoute = staticRouteMeta.find((item) => item.path === '/app')
  const softwareUrl = routeUrl(appRoute, 'en')
  const lang = HREFLANG_BY_LOCALE[locale]
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Katsumii',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      email: 'info@katsumii.com',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Katsumii',
      url: SITE_URL,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: lang,
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${softwareUrl}#software`,
      name: 'Katsumii',
      url: softwareUrl,
      description: localeText(locale, 'common.pageDescriptions.app'),
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Windows 10, Windows 11, macOS 12 or newer',
      image: SOCIAL_IMAGE,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${softwareUrl}#software` },
      inLanguage: lang,
    },
  ]

  if (route.path !== '/app') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Katsumii',
          item: softwareUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: title.replace(/\s-\sKatsumii$/, ''),
          item: canonical,
        },
      ],
    })
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2)
    .replace(/</g, '\\u003c')
}

const upsertStructuredData = (html, payload) => {
  const json = payload.split('\n').map((line) => `    ${line}`).join('\n')
  const tag = `<script id="katsumii-structured-data" type="application/ld+json">\n${json}\n  </script>`
  const matcher = /<script\s+id="katsumii-structured-data"[^>]*>[\s\S]*?<\/script>/i
  if (matcher.test(html)) return html.replace(matcher, tag)
  return html.replace('</head>', `  ${tag}\n</head>`)
}

const routeHtml = (html, route, locale, options = {}) => {
  const canonical = options.canonical || routeUrl(route, locale)
  const rawTitle = localeText(locale, route.titleKey)
  const rawDescription = localeText(locale, route.descriptionKey)
  const title = escapeHtml(rawTitle)
  const description = escapeHtml(rawDescription)
  const robots = options.robots || route.robots || 'index, follow'
  const lang = HREFLANG_BY_LOCALE[locale]
  const alternates = alternateTags(route)
  const structuredData = structuredDataJson(route, locale, rawTitle, rawDescription, canonical)

  return [
    (value) => value.replace(/<html\s+lang="[^"]*">/i, `<html lang="${lang}">`),
    (value) => value.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`),
    (value) => upsertMetaTag(value, /<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${description}" />`),
    (value) => upsertMetaTag(value, /<meta\s+name="robots"[^>]*>/i, `<meta name="robots" content="${robots}" />`),
    (value) => upsertMetaTag(value, /<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonical}" />`),
    (value) => upsertMetaTag(value, /<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${title}" />`),
    (value) => upsertMetaTag(value, /<meta\s+property="og:description"[^>]*>/i, `<meta property="og:description" content="${description}" />`),
    (value) => upsertMetaTag(value, /<meta\s+property="og:url"[^>]*>/i, `<meta property="og:url" content="${canonical}" />`),
    (value) => upsertMetaTag(value, /<meta\s+property="og:image"[^>]*>/i, `<meta property="og:image" content="${SOCIAL_IMAGE}" />`),
    (value) => upsertMetaTag(value, /<meta\s+property="og:locale"[^>]*>/i, `<meta property="og:locale" content="${lang.replace('-', '_')}" />`),
    (value) => upsertMetaTag(value, /<meta\s+name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${title}" />`),
    (value) => upsertMetaTag(value, /<meta\s+name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${description}" />`),
    (value) => upsertMetaTag(value, /<meta\s+name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${SOCIAL_IMAGE}" />`),
    (value) => stripAlternateTags(value).replace('</head>', `  ${alternates}\n</head>`),
    (value) => upsertStructuredData(value, structuredData),
  ].reduce((value, transform) => transform(value), html)
}

const sitemapXml = () => {
  const indexableRoutes = staticRouteMeta.filter((route) => !route.robots?.includes('noindex'))
  const urls = indexableRoutes.flatMap((route) =>
    SUPPORTED_LOCALES.map((locale) => {
      const alternates = [
        ...SUPPORTED_LOCALES.map((alternateLocale) =>
          `    <xhtml:link rel="alternate" hreflang="${HREFLANG_BY_LOCALE[alternateLocale]}" href="${routeUrl(route, alternateLocale)}" />`
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${routeUrl(route, 'en')}" />`,
      ].join('\n')

      return [
        '  <url>',
        `    <loc>${routeUrl(route, locale)}</loc>`,
        `    <lastmod>${LASTMOD}</lastmod>`,
        `    <changefreq>${route.path === '/impressum' || route.path === '/privacy' || route.path === '/terms' ? 'yearly' : 'monthly'}</changefreq>`,
        `    <priority>${route.priority}</priority>`,
        alternates,
        '  </url>',
      ].join('\n')
    })
  ).join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urls,
    '</urlset>',
    '',
  ].join('\n')
}

const routeFallbackPlugin = () => ({
  name: 'katsumii-route-fallback',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const pathname = new URL(req.url, 'http://localhost').pathname
      const acceptsHtml = req.headers.accept?.includes('text/html')
      if (acceptsHtml && (appRoutes.has(pathname) || (pathname !== '/' && !pathname.includes('.')))) {
        req.url = '/app.html'
      }
      next()
    })
  },
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      const pathname = new URL(req.url, 'http://localhost').pathname
      const acceptsHtml = req.headers.accept?.includes('text/html')
      if (acceptsHtml && pathname !== '/' && !pathname.includes('.') && !hasStaticPreviewPage(pathname)) {
        req.url = '/app.html'
      }
      next()
    })
  },
})

const staticRoutePagesPlugin = () => {
  let outDir

  return {
    name: 'katsumii-static-route-pages',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      const appHtml = await readFile(resolve(outDir, 'app.html'), 'utf8')

      await Promise.all(staticRouteMeta.flatMap((route) => [
        ...SUPPORTED_LOCALES.map(async (locale) => {
          const routeDir = resolve(outDir, locale, route.path.replace(/^\/+/, ''))
          await mkdir(routeDir, { recursive: true })
          await writeFile(resolve(routeDir, 'index.html'), routeHtml(appHtml, route, locale))
        }),
        (async () => {
          const legacyDir = resolve(outDir, route.path.replace(/^\/+/, ''))
          await mkdir(legacyDir, { recursive: true })
          await writeFile(resolve(legacyDir, 'index.html'), routeHtml(appHtml, route, 'en', {
            canonical: routeUrl(route, 'en'),
            robots: 'noindex, follow',
          }))
        })(),
      ]))

      const appRoute = staticRouteMeta.find((route) => route.path === '/app')
      if (appRoute) {
        await Promise.all(SUPPORTED_LOCALES.map(async (locale) => {
          const localeRootDir = resolve(outDir, locale)
          await mkdir(localeRootDir, { recursive: true })
          await writeFile(resolve(localeRootDir, 'index.html'), routeHtml(appHtml, appRoute, locale, {
            canonical: routeUrl(appRoute, locale),
            robots: 'noindex, follow',
          }))
        }))
      }

      await writeFile(resolve(outDir, 'sitemap.xml'), sitemapXml())
    },
  }
}

export default defineConfig({
  plugins: [routeFallbackPlugin(), vue(), staticRoutePagesPlugin()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        app: resolve(__dirname, 'app.html'),
      },
    },
  },
})


