# V6-Migrationsplan — Phasen 3–6

Dieses Dokument ist die Arbeitsanweisung für die Umstellung der restlichen Katsumii-Website
auf das V6-Design ("Living Data"). Phasen 1 und 2 sind **fertig implementiert** — nutze sie
als Referenz. Jede Phase ist eigenständig umsetzbar; halte dich exakt an die Muster.

---

## 0. Was bereits existiert (NICHT neu bauen, NICHT verändern)

| Datei | Zweck |
|---|---|
| `src/styles/v6.css` | Globale V6-Tokens + geteilte Klassen (`.v6`, `.v6-btn`, `.v6-card`, `.v6-eyebrow`, `.v6-h1/.v6-h2`, `.v6-card-chips`, Nav/Footer-Chrome). Wird in `main.js` global importiert. |
| `src/components/v6/V6Shell.vue` | Rendert Nav, Footer, WebGL-Canvas, Noise, Progress-Bar, BG-Switcher und setzt die Akzentfarbe pro Route. Umschließt automatisch jede Route mit `meta.v6: true` (siehe `AppShell.vue`). |
| `src/components/v6/V6ModePage.vue` | Wiederverwendbares Deep-Dive-Template (Hero + Screenshot + 4 Metrik-Karten + 3 Sektionen + Disclaimer + CTA). Nimmt ein `page`-Datenobjekt als Prop. |
| `src/v6/motion.js` | `initV6Reveals(rootEl)` (Scroll-Reveals + Count-ups inkl. reduced-motion), `initMagnetic(rootEl)`, `prefersReducedMotion()`. |
| `src/v6/gl.js` | Three.js-Hintergründe. Wird NUR von V6Shell benutzt — nie direkt importieren. |
| `src/router.js` | `withLocale(...)`-Routen. V6-Seiten bekommen `v6: true` (+ optional `v6Accent`) in der Meta. `V6_ACCENTS` ist dort definiert. |

Referenz-Implementierungen (lesen, bevor du anfängst):
- **Landing:** `src/components/LandingV6.vue` (Content-Seite in der Shell)
- **Mode-Seite:** `src/components/FundedAccountsPage.vue` (Daten-Wrapper um `V6ModePage`)

---

## 1. Eiserne Regeln (gelten für jede Seite)

1. **Kein eigenes Chrome.** Keine Nav, kein Footer, kein Canvas, kein Theme-Toggle in der
   Seite — das liefert `V6Shell`. Die Seite rendert nur `<main>`-Inhalt.
2. **Route-Meta setzen.** In `src/router.js` bei der Route `v6: true` ergänzen. Nur die vier
   Mode-Seiten haben zusätzlich `v6Accent`; alle anderen Seiten nutzen den Teal-Default (kein
   `v6Accent` setzen).
3. **Nur CSS-Variablen für Farben:** `var(--v6-gold)`, `--v6-gold-hi`, `--v6-ink`, `--v6-muted`,
   `--v6-faint`, `--v6-line`, `--v6-line-strong`, `--v6-panel`, `--v6-bg-soft`, `--v6-ember`.
   **Niemals** Hex-Farben oder Tailwind-Farbklassen (`text-gray-600`, `bg-slate-900` …) in
   V6-Seiten. Keine `dark:`-Klassen — Light-Mode läuft über `.v6.light`-Selektoren.
4. **Keine Tailwind-Utilities im Template.** V6-Seiten nutzen semantische Klassen + scoped CSS
   (siehe LandingV6/V6ModePage als Stilreferenz). Die alten Seiten (Tailwind) komplett ersetzen,
   nicht mischen.
5. **Geteilte Klassen wiederverwenden statt neue erfinden:** `.v6-eyebrow` (mit `<i></i>` davor),
   `.v6-h1`/`.v6-h2` (mit `<em>` für das Akzentwort und `<b class="v6-dot">.</b>` am Ende),
   `.v6-btn` / `.v6-btn-sm` / `.v6-btn-lg` / `.v6-quiet`, `.v6-card`, `.v6-card-chips`,
   `.v6-section-head`, `.v6-reveal` (Scroll-Einblendung), `.v6-magnetic` (Magnet-Hover auf Buttons).
6. **Typografie:** Headlines `var(--v6-display)`, Fließtext `var(--v6-body)`, Labels/Zahlen
   `var(--v6-mono)` mit `letter-spacing: 0.14–0.2em; text-transform: uppercase`.
7. **Seiten-Boilerplate (Pflicht in jedem `<script setup>`):**
   ```vue
   <script setup>
   import { computed, onBeforeUnmount, onMounted, ref } from "vue"
   import { useRoute } from "vue-router"
   import { initMagnetic, initV6Reveals } from "../v6/motion.js"
   import { normalizeLocale } from "../utils/routes.js"

   const baseUrl = import.meta.env.BASE_URL
   const asset = (path) => `${baseUrl}${path}`   // nur falls Bilder gebraucht werden

   const route = useRoute()
   const lang = computed(() => {
     const raw = Array.isArray(route.params.locale) ? route.params.locale[0] : route.params.locale
     return normalizeLocale(raw)
   })

   const rootEl = ref(null)
   let cleanups = []
   onMounted(() => {
     cleanups.push(initV6Reveals(rootEl.value))
     cleanups.push(initMagnetic(rootEl.value))
   })
   onBeforeUnmount(() => { cleanups.forEach((off) => off && off()); cleanups = [] })
   </script>
   ```
   Template-Wurzel: `<main ref="rootEl" class="v6-<seitenname>">` mit
   `position: relative; z-index: 1;` im scoped CSS.
8. **Interne Links immer lokalisiert:** `:to="`/${lang}/pricing`"` — nie hartkodiert `/en/...`.
9. **Erster Abschnitt braucht Platz für die fixe Nav:** oberstes Padding
   `padding-top: clamp(7rem, 16vh, 9rem)` (Nav ist `position: fixed`).
10. **Inhalte:** Wo die bestehende Seite i18n-Texte nutzt und die Texte unverändert bleiben,
    weiter `useI18n()` + `t()`/`tm()` verwenden (Lokalisierung bleibt gratis erhalten). Neue
    Texte auf Englisch hart einbauen — i18n dafür kommt in einer späteren Phase.
11. **Nichts in `v6.css` ergänzen**, außer der Plan verlangt es ausdrücklich (Phase 5:
    `.v6-prose`). Seiten-Styles bleiben `<style scoped>` in der Komponente.
12. **Ein Commit pro Seite/Phase ist nicht nötig — aber niemals committen/pushen, außer der
    User verlangt es.**

### Verifikations-Checkliste (nach JEDER Seite durchführen)
1. `npm run build` → muss ohne Fehler durchlaufen.
2. Dev-Server öffnen (`npm run dev`), Seite unter `/en/<pfad>` aufrufen:
   - Keine Konsolen-Fehler.
   - V6-Nav + Footer sichtbar (kommt aus der Shell), Partikel-Hintergrund läuft.
   - Theme-Toggle (Mond/Sonne oben rechts) → Seite muss in Light lesbar sein (Kontraste prüfen!).
   - Viewport 375 px breit testen: kein horizontales Scrollen, Grids brechen um.
3. Alte, jetzt ungenutzte Hilfskomponenten NICHT löschen (passiert gesammelt in Phase 6).

---

## 2. Phase 3 — Pricing (`src/components/PricingPage.vue`)

Wichtigste Conversion-Seite. Die bestehende Datei (746 Zeilen, Tailwind + AppNav) wird
vollständig durch eine V6-Version ersetzt. Inhalte kommen weiter aus i18n
(`pricingPage.*`-Keys, via `t()`/`tm()`) — die bestehende Datei zuerst lesen und die
Datenlogik (`tiers`, `pricingHighlights`, FAQ-Teile etc.) übernehmen.

Aufbau (von oben nach unten):
1. **Hero:** `.v6-eyebrow` = `t('pricingPage.hero.label')`, `.v6-h1` aus `headlineA` +
   `<em>{{ t('pricingPage.hero.headlineB') }}</em><b class="v6-dot">.</b>`, Sub-Text
   (`--v6-muted`, max-width 34rem).
2. **Drei Highlight-Chips** (`pricingHighlights`) als `.v6-card-chips` oder drei kleine
   `.v6-card`s in einer Reihe.
3. **Tier-Karten:** Grid `repeat(3, 1fr)` (≤900 px: 1 Spalte). Jede Karte = `.v6-card` mit:
   - Tier-Name als Mono-Label, Preis groß in `var(--v6-mono)` (Zahl) — Preis-Styling wie
     `.v6m-metric-val` in `V6ModePage.vue`,
   - Feature-Liste wie `.v6-mode-card li` (Punkt mit Akzent-Dot + Glow — Muster aus
     `LandingV6.vue` kopieren),
   - CTA: hervorgehobener Tier `.v6-btn`, andere `.v6-quiet`.
   - Hervorgehobener Tier: `border-color: var(--v6-line-strong)` + dezenter
     `box-shadow: 0 0 60px -20px var(--v6-line-strong)` + Mono-Badge "Most popular"
     (Muster: `.v6m-status` in `V6ModePage.vue`).
   - KEINE dekorativen SVG-Polygone der Alt-Seite übernehmen.
4. **Vergleich/Details + Pricing-FAQ** der Alt-Seite: als schlichte zweispaltige Sektion
   (Muster `.v6m-section` in `V6ModePage.vue`) bzw. Accordion (siehe FAQ-Spec in Phase 5).
5. **Abschluss-CTA:** Muster `.v6m-cta` aus `V6ModePage.vue` (Titel + `.v6-btn-lg`).

Route-Meta: in `router.js` bei `/pricing` nur `v6: true` ergänzen.

---

## 3. Phase 4 — Features-Hub, Analytics & Reviews, Local-First

### 3a. `AnalyticsReviewsPage.vue` und `LocalFirstPage.vue` (einfach)
Beide sind heute 7-Zeilen-Wrapper um `PropWorkflowDeepDive` mit den Keys
`analyticsReviews` bzw. `localFirst`. Umstellung exakt wie die vier Mode-Seiten:
1. Inhalte aus `src/locales/en.json` → `propDeepDive.pages.analyticsReviews` bzw.
   `propDeepDive.pages.localFirst` entnehmen (Struktur: hero, heroStrip, metrics,
   sections[3] mit rows[3], disclaimer).
2. In das `page`-Objekt von `V6ModePage` umschreiben — **exakt dasselbe Format wie in
   `src/components/FundedAccountsPage.vue`** (Feldnamen: `eyebrow`, `h1: {pre, em}`, `sub`,
   `chips`, `image: {src, alt, w, h}`, `strip`, `metrics[{label, value, status, progress, copy}]`,
   `sections[{id, kicker, title, copy, note, rows[{name, status, value, progress, copy}]}]`,
   `disclaimer`, `cta`). `tone`-Felder der JSON entfallen ersatzlos.
3. Eyebrow-Texte: "The craft — Analytics & Reviews" bzw. "The craft — Local-first".
   `cta.next` weglassen oder auf `/features` zeigen.
4. Route-Meta `v6: true` ergänzen (KEIN `v6Accent` — Teal-Default).

### 3b. `FeaturesPage.vue` (Hub, anspruchsvoller)
Komplett neu als V6-Übersichtsseite:
1. **Hero:** eyebrow "Features", H1 z. B. `Every tool, one <em>cockpit</em>.`, Sub-Text.
2. **Vier Discipline-Karten** (Funded/Challenge/Personal/Backtest): Grid 2×2 (mobil 1 Spalte).
   Jede Karte nutzt das `.v6-mode-card`-Muster aus `LandingV6.vue` (linke Akzentleiste über
   `--mode-c`), mit per Karte gesetztem Inline-Style
   `:style="{ '--mode-c': isDark ? m.accent.dark[0] : m.accent.light[0] }"`
   (`isDark` via `inject("isDark")`). Akzentwerte identisch zu `V6_ACCENTS` in `router.js`.
   Jede Karte verlinkt via `RouterLink` auf ihre Unterseite (`/${lang}/funded-accounts` usw.).
3. **Zwei weitere Karten** für Analytics & Reviews und Local-First (Teal-Akzent) → verlinken
   auf die 3a-Seiten.
4. **Craft-Grid:** die 6 Feature-Karten aus `LandingV6.vue` (`features`-Array dort kopieren)
   als `.v6-card`-Grid `v6-span-*`-Spans wie auf der Landing.
5. **CTA** wie `.v6m-cta`.
6. Route-Meta `v6: true`.

---

## 4. Phase 5 — FAQ, Contact, Manual, Welcome, Bugreport

Zuerst **einmalig** in `src/styles/v6.css` am Ende ergänzen (wörtlich):
```css
/* ── prose (legal pages, manual, long-form text) ── */
.v6-prose { max-width: 46rem; color: var(--v6-muted); }
.v6-prose h2 {
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: 1.45rem;
  letter-spacing: -0.015em;
  color: var(--v6-ink);
  margin: 2.4rem 0 0.8rem;
}
.v6-prose h3 {
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--v6-ink);
  margin: 1.8rem 0 0.5rem;
}
.v6-prose p, .v6-prose li { font-size: 0.98rem; line-height: 1.75; }
.v6-prose a { color: var(--v6-gold); text-decoration: underline; text-underline-offset: 3px; }
.v6-prose a:hover { color: var(--v6-gold-hi); }
```

Alle Seiten dieser Phase: bestehende i18n-Keys weiterverwenden (`faqPage.*`, `contactPage.*`,
`manualPage.*`, … — jeweils die alte Komponente lesen und die `t()`-Aufrufe übernehmen).
Seitenkopf-Muster überall gleich: schmaler Hero (eyebrow + `.v6-h1` in reduzierter Größe
`font-size: clamp(2.2rem, 5vw, 3.6rem)` + Sub-Text), dann Inhalt.

- **FAQ (`FaqPage.vue`):** Fragen als Accordion. Ein `<details>`-Element pro Frage —
  KEIN Headless-UI mehr. Styling: `border-bottom: 1px solid var(--v6-line)`, `summary`
  in `--v6-ink` (display-Font, 1.05rem) mit `cursor: pointer` und einem `+`-Indikator
  (`summary::after { content: "+"; color: var(--v6-gold); }`,
  `details[open] summary::after { content: "–"; }`), Antwort in `.v6-prose`-Typo.
- **Contact (`ContactPage.vue`):** Alte Seite lesen; E-Mail/Kanäle als `.v6-card`s mit
  Mono-Labels. Falls ein Formular existiert: Inputs mit
  `background: var(--v6-panel); border: 1px solid var(--v6-line); border-radius: 10px;
  color: var(--v6-ink); padding: 0.8rem 1rem;` und `:focus { border-color: var(--v6-gold); }`.
- **Manual (`ManualPage.vue`):** Kapitel der Alt-Seite übernehmen. Layout: links sticky
  Kapitel-Liste (Mono-Links, `position: sticky; top: 6rem`; ≤900 px ausblenden), rechts
  `.v6-prose`-Inhalt. Screenshots in Frames wie `.v6m-shot` (Muster aus `V6ModePage.vue`).
- **Welcome (`WelcomePage.vue`):** Kurze zentrierte Seite (Danke/Download-Hinweise der
  Alt-Seite), Muster `.v6m-cta`. Route bleibt `robots: noindex`.
- **Bugreport (`BugReportPage.vue`):** Wie Contact (Formular-/Link-Styling identisch).

Route-Metas: jeweils `v6: true` ergänzen. Nichts weiter.

---

## 5. Phase 6 — Legal, 404, Aufräumen, Gesamtverifikation

1. **Impressum / Privacy / Terms:** Inhalt 1:1 übernehmen (rechtlich — Texte NICHT umformulieren,
   NICHT kürzen). Layout: Hero-Kopf (eyebrow "Legal" + Titel) + `.v6-prose`-Spalte.
   Route-Metas `v6: true`.
2. **NotFoundPage.vue:** Zentriert, `.v6-h1` mit "404", Mono-Sub `page not found`,
   `.v6-btn` zurück zu `/${lang}/app`. Meta `v6: true`.
3. **Aufräumen** (erst wenn 1+2 verifiziert sind):
   - Prüfen mit `grep`, dass `PropWorkflowDeepDive.vue` nirgends mehr importiert wird → Datei
     löschen. Gleiches für jetzt ungenutzte Alt-Komponenten (`AppNav.vue`, `KbBackground.vue`,
     `BgSwitch.vue`, `DarkLightSwitch.vue`, `LangSwitch.vue`, `App.vue`, `home/*`,
     `useSiteNavigation.js`, `useBg.js`) — **nur löschen, was wirklich referenzlos ist**
     (`/v2`–`/v5`-Landings bleiben und dürfen weiter Altkomponenten nutzen!).
   - `src/components/LandingV4 - Copy.vue` löschen (nirgends geroutet).
   - Die Redirect-Route `/v6` in `router.js` bleibt.
4. **Gesamtverifikation:**
   - `npm run build` fehlerfrei.
   - Jede Route in `/en/` einmal im Dev-Server öffnen (app, features, 4 Mode-Seiten,
     analytics-reviews, local-first, pricing, manual, faq, contact, bugreport, impressum,
     privacy, terms, welcome, irgendein 404-Pfad) — Konsole fehlerlos, Dark + Light geprüft.
   - Stichprobe `/de/app` (Locale-Routing intakt).
   - `/v2`, `/v3`, `/v4`, `/v5` müssen unverändert funktionieren.

---

## 6. Häufige Fehler (unbedingt vermeiden)

- ❌ `<div class="v6">` in einer Seite — die Klasse setzt NUR `V6Shell`.
- ❌ `import ... from "three"` oder `gl.js` in einer Seite.
- ❌ GSAP-Timelines selbst schreiben — für normale Seiten reicht `initV6Reveals`.
  (Nur die Landing hat eine eigene Timeline.)
- ❌ `v6Accent` auf Nicht-Mode-Seiten setzen.
- ❌ `.v6-reveal` auf Dutzende kleiner Elemente streuen — pro Block/Karte EIN Reveal.
- ❌ `localStorage`-Zugriffe ohne `try/catch`.
- ❌ Neue Google-Font-Imports — DM Sans/Manrope/DM Mono sind bereits eingebunden.
- ❌ Texte in `t('…')`-Keys ändern oder Keys löschen — andere Locales hängen daran.
