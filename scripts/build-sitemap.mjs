// Generate public/sitemap.xml from the canonical route list.
// Run via `node scripts/build-sitemap.mjs` — the prebuild hook does this
// automatically before `vite build`, so `npm run build` always ships a fresh file.

import { writeFileSync, mkdirSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = resolve(__dirname, "..", "public", "sitemap.xml")

const SITE = "https://www.katsumii.com"

const LOCALES = [
  { locale: "en", hreflang: "en" },
  { locale: "de", hreflang: "de" },
  { locale: "es", hreflang: "es" },
  { locale: "tw", hreflang: "zh-TW" },
]
const DEFAULT_LOCALE = "en"

// Only pages that should be indexed. Excludes /welcome, /bugreport, /v2..v5, 404.
const PAGES = [
  { path: "/app",                  priority: "1.0", changefreq: "weekly" },
  { path: "/features",             priority: "0.9", changefreq: "monthly" },
  { path: "/prop-firm-challenges", priority: "0.8", changefreq: "monthly" },
  { path: "/funded-accounts",      priority: "0.8", changefreq: "monthly" },
  { path: "/personal-trading",     priority: "0.8", changefreq: "monthly" },
  { path: "/backtesting",          priority: "0.8", changefreq: "monthly" },
  { path: "/analytics-reviews",    priority: "0.8", changefreq: "monthly" },
  { path: "/customization",        priority: "0.8", changefreq: "monthly" },
  { path: "/workflow",             priority: "0.8", changefreq: "monthly" },
  { path: "/local-offline",        priority: "0.7", changefreq: "monthly" },
  { path: "/pricing",              priority: "0.9", changefreq: "monthly" },
  { path: "/manual",               priority: "0.7", changefreq: "monthly" },
  { path: "/faq",                  priority: "0.7", changefreq: "monthly" },
  { path: "/contact",              priority: "0.5", changefreq: "yearly" },
  { path: "/privacy",              priority: "0.3", changefreq: "yearly" },
  { path: "/terms",                priority: "0.3", changefreq: "yearly" },
  { path: "/impressum",            priority: "0.3", changefreq: "yearly" },
]

const today = new Date().toISOString().slice(0, 10)
const urlFor = (locale, path) => `${SITE}/${locale}${path}`

const urls = []
for (const page of PAGES) {
  for (const { locale } of LOCALES) {
    const alternates = LOCALES
      .map(({ locale: l, hreflang }) =>
        `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${urlFor(l, page.path)}" />`
      )
      .join("\n")
    const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(DEFAULT_LOCALE, page.path)}" />`

    urls.push(
      `  <url>\n` +
      `    <loc>${urlFor(locale, page.path)}</loc>\n` +
      `    <lastmod>${today}</lastmod>\n` +
      `    <changefreq>${page.changefreq}</changefreq>\n` +
      `    <priority>${page.priority}</priority>\n` +
      `${alternates}\n${xDefault}\n` +
      `  </url>`
    )
  }
}

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
  `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  urls.join("\n") + "\n" +
  `</urlset>\n`

mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, xml, "utf8")
console.log(`sitemap.xml written: ${urls.length} URLs → ${outPath}`)
