# V6-Migration — Agent-Prompts für Phasen 3–6

Jeder Abschnitt unten ist ein **fertiger, in sich geschlossener Prompt**: kopiere ihn 1:1 in
einen neuen Agent. Die Prompts wiederholen bewusst alle Regeln und Vorlagen, damit der Agent
nichts herleiten muss. Reihenfolge einhalten: Phase 3 → 4 → 5 → 6 (Phase 6 räumt auf und
verifiziert alles; sie muss zuletzt laufen). Nach jeder Phase kurz selbst gegenprüfen, bevor
du die nächste startest.

Ergänzend existiert `docs/v6-migration-plan.md` mit demselben Inhalt in Planform — die
Prompts hier sind die maßgebliche, ausführlichere Fassung.

---
---

## PROMPT — PHASE 3: Pricing-Seite

```
Du arbeitest im Repo "Katsumii Website" (Vue 3 + Vite, Composition API mit <script setup>).
Die Website wird auf das neue V6-Design ("Living Data") umgestellt. Landing, vier Mode-Seiten
und die gesamte Infrastruktur sind bereits fertig. Deine Aufgabe: die Pricing-Seite
(src/components/PricingPage.vue) vollständig auf das V6-Design umbauen.

═══ SCHRITT 0 — PFLICHTLEKTÜRE (in dieser Reihenfolge lesen, bevor du irgendetwas schreibst) ═══
1. src/components/v6/V6ModePage.vue   → so sehen V6-Seiten aus (Template-Struktur, scoped CSS,
                                        Klassen v6m-metric-val, v6m-status, v6m-cta, v6m-section)
2. src/components/FundedAccountsPage.vue → Beispiel einer fertigen V6-Seite
3. src/styles/v6.css                  → alle globalen Klassen und CSS-Variablen
4. src/components/PricingPage.vue     → die ALTE Seite, die du ersetzt. Notiere dir: alle
                                        verwendeten i18n-Keys (t('pricingPage.…')), die
                                        Datenstrukturen tiers / pricingHighlights und was
                                        unterhalb der Preis-Karten kommt (Detail-Sektionen, FAQ).
5. src/router.js                      → nur ansehen, du änderst später 1 Zeile.

═══ ARCHITEKTUR (nicht hinterfragen, nicht ändern) ═══
- Jede Route mit meta v6:true wird automatisch von V6Shell.vue umschlossen. Die Shell liefert:
  Nav, Footer, animierter WebGL-Hintergrund, Theme-Toggle, Progress-Bar.
- Deine Seite rendert deshalb NUR den Inhalt: <main ref="rootEl" class="v6-pricing"> … </main>
- KEIN eigenes <nav>, KEIN Footer, KEIN Canvas, KEIN Theme-Handling in der Seite.

═══ EISERNE REGELN ═══
1. Farben NUR über CSS-Variablen: var(--v6-gold), var(--v6-gold-hi), var(--v6-ink),
   var(--v6-muted), var(--v6-faint), var(--v6-line), var(--v6-line-strong), var(--v6-panel),
   var(--v6-bg-soft), var(--v6-ember). Niemals Hex-Werte, niemals Tailwind-Farbklassen.
2. KEINE Tailwind-Utility-Klassen im Template (kein px-5, kein text-gray-600, kein dark:…).
   Die alte Seite nutzt Tailwind — du ersetzt sie komplett durch semantische Klassen + <style scoped>.
3. Light-Mode: läuft automatisch über die CSS-Variablen. Falls du eine Fläche brauchst, die im
   Light-Mode anders aussieht, nutze den Selektor `.v6.light .deine-klasse { … }` im scoped CSS
   (funktioniert, weil .v6 auf dem Shell-Root liegt).
4. Schriften: Headlines font-family var(--v6-display); Fließtext var(--v6-body); Labels,
   Preise und Zahlen var(--v6-mono) mit letter-spacing 0.14–0.2em und text-transform uppercase.
5. Vorhandene globale Klassen WIEDERVERWENDEN statt neue zu erfinden:
   - .v6-eyebrow  → kleines Mono-Label, immer mit <i></i> als erstem Kind: 
     <p class="v6-eyebrow v6-reveal"><i></i>Pricing</p>
   - .v6-h1 / .v6-h2 → Headlines; Akzentwort in <em>…</em>, Punkt am Ende als
     <b class="v6-dot">.</b>
   - .v6-btn (+ .v6-btn-lg) → Primär-CTA; .v6-quiet → Sekundär-Link
   - .v6-card → Panel-Karte; .v6-card-chips → Chip-Liste (ul>li)
   - .v6-reveal → Element blendet beim Scrollen ein (NICHT auf Dutzende Kleinstelemente
     streuen — EIN Reveal pro Karte/Block)
   - .v6-magnetic → Magnet-Hover, nur auf Buttons/CTAs
6. Alle Texte weiter aus i18n beziehen: useI18n() + t()/tm() mit den EXAKT gleichen Keys wie
   die alte Seite (pricingPage.…). Keys niemals umbenennen oder löschen — 4 Sprachen hängen daran.
7. Interne Links immer lokalisiert bauen: :to="`/${lang}/contact`" (lang-computed siehe Vorlage).
8. Erste Sektion braucht padding-top: clamp(7rem, 16vh, 9rem) — die Nav der Shell ist fixed.
9. Ein Problem nach dem anderen; keine Refactorings an anderen Dateien.

═══ SCRIPT-VORLAGE (so beginnt dein <script setup> — wörtlich übernehmen) ═══
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
import { initMagnetic, initV6Reveals } from "../v6/motion.js"
import { normalizeLocale } from "../utils/routes.js"

const { t, tm } = useI18n()
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

// … danach: tiers / pricingHighlights aus der alten Seite übernehmen (i18n-basiert)

═══ SEITENAUFBAU (von oben nach unten) ═══
1. HERO (max-width 1240px, zentriert wie überall: padding: … clamp(1.1rem, 4vw, 3rem)):
   - .v6-eyebrow mit t('pricingPage.hero.label')
   - .v6-h1: t('pricingPage.hero.headlineA') als erste Zeile, zweite Zeile
     <em>{{ t('pricingPage.hero.headlineB') }}</em><b class="v6-dot">.</b>
   - Sub-Absatz (color: var(--v6-muted); max-width: 34rem) mit hero.description
2. HIGHLIGHTS: die 3 pricingHighlights als Reihe kleiner .v6-card-Elemente
   (Titel fett in --v6-ink, Text in --v6-muted, font-size 0.9rem).
3. TIER-KARTEN: display:grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem;
   bei max-width 900px → 1 Spalte. Pro Tier eine .v6-card mit zusätzlich eigener Klasse:
   - Tier-Name als Mono-Label (Muster .v6m-metric-label aus V6ModePage.vue kopieren)
   - Preis groß: font-family var(--v6-mono); font-size clamp(2.2rem, 3vw, 3rem);
     color var(--v6-ink); Zeitraum/Zusatz klein daneben in --v6-faint
   - Feature-Liste: ul ohne list-style; jedes li bekommt per ::before einen 6px-Punkt in
     var(--v6-gold) mit box-shadow 0 0 12px var(--v6-gold) — Muster ".v6-mode-card li::before"
     aus src/components/LandingV6.vue wörtlich kopieren
   - CTA unten: hervorgehobener Tier .v6-btn, andere Tiers .v6-quiet
   - Hervorgehobener Tier zusätzlich: border-color var(--v6-line-strong);
     box-shadow: 0 0 60px -20px var(--v6-line-strong); und ein Badge "…" mit
     t('pricingPage.popular') im Stil von .v6m-status (Muster aus V6ModePage.vue kopieren)
   - Die dekorativen SVG-Polygone und Ribbons der alten Seite NICHT übernehmen.
4. ALLE weiteren Inhaltssektionen der alten Seite (Details, Vergleich, Pricing-FAQ, Hinweise)
   inhaltlich übernehmen. Layout-Muster: zweispaltige Sektion wie .v6m-section aus
   V6ModePage.vue (links eyebrow + .v6-h2 + Text, rechts Karten/Liste). FAQ-Einträge als
   native <details>/<summary> mit border-bottom: 1px solid var(--v6-line);
   summary::after { content: "+"; color: var(--v6-gold); } und
   details[open] summary::after { content: "–"; }
5. ABSCHLUSS-CTA: Muster .v6m-cta aus V6ModePage.vue (zentriert, große Headline mit <em> und
   v6-dot, darunter .v6-btn-lg zu einem sinnvollen Ziel oder der Kauf-Aktion der alten Seite).

═══ ROUTER ═══
In src/router.js bei der /pricing-Route im meta-Objekt NUR `v6: true` ergänzen:
  withLocale("/pricing", PricingPage, { titleKey: …, descriptionKey: …, v6: true }),
KEIN v6Accent setzen (Teal-Default ist richtig). Sonst nichts in router.js ändern.

═══ VERBOTEN ═══
- <div class="v6"> in der Seite (setzt nur die Shell)
- import aus "three" oder src/v6/gl.js
- eigene GSAP-Timelines (initV6Reveals reicht)
- neue Einträge in src/styles/v6.css
- Änderungen an V6Shell.vue, V6ModePage.vue, LandingV6.vue, motion.js, gl.js
- git commit / git push

═══ VERIFIKATION (Pflicht, in dieser Reihenfolge) ═══
1. npm run build → muss fehlerfrei sein.
2. npm run dev starten, http://localhost:<port>/en/pricing öffnen:
   - V6-Nav + Footer + Partikel-Hintergrund sichtbar, keine Konsolen-Fehler
   - alle Preise/Texte da (Vergleich mit alter Seite: kein Inhalt verloren)
   - Theme-Toggle oben rechts klicken → Light-Mode: alles lesbar, keine weißen auf weiß
   - Fenster auf 375px Breite → 1-spaltig, kein horizontales Scrollen
3. Kurz melden: was geändert, was geprüft, was unsicher.
```

---
---

## PROMPT — PHASE 4: Features-Hub + Analytics & Reviews + Local-First

```
Du arbeitest im Repo "Katsumii Website" (Vue 3 + Vite, <script setup>). Die Website wird auf
das V6-Design umgestellt; Landing, vier Mode-Seiten und Pricing sind fertig. Deine Aufgabe
(3 Seiten, in dieser Reihenfolge):
  A) src/components/AnalyticsReviewsPage.vue  → V6-Deep-Dive (einfach)
  B) src/components/LocalFirstPage.vue        → V6-Deep-Dive (einfach)
  C) src/components/FeaturesPage.vue          → neuer V6-Feature-Hub (anspruchsvoller)

═══ SCHRITT 0 — PFLICHTLEKTÜRE ═══
1. src/components/v6/V6ModePage.vue      → das Template, das A und B benutzen
2. src/components/FundedAccountsPage.vue → GENAU dieses Muster kopierst du für A und B
3. src/components/LandingV6.vue          → für C: Abschnitte "MODES … v6-modes-stack"
   (Mode-Karten mit --mode-c) und "CRAFT" (features-Array + v6-craft-grid)
4. src/styles/v6.css                     → globale Klassen und CSS-Variablen
5. src/locales/en.json                   → Abschnitt propDeepDive.pages.analyticsReviews und
   propDeepDive.pages.localFirst (Inhalte für A und B)
6. src/router.js                         → V6_ACCENTS-Objekt oben ansehen (Akzentwerte für C)

═══ TEIL A + B: AnalyticsReviewsPage / LocalFirstPage ═══
Beide Dateien sind heute 7-Zeilen-Wrapper um PropWorkflowDeepDive. Ersetze sie durch exakt
dasselbe Muster wie FundedAccountsPage.vue:

<template>
  <V6ModePage :page="page" />
</template>

<script setup>
import V6ModePage from "./v6/V6ModePage.vue"
const page = { … }
</script>

Das page-Objekt füllst du aus den en.json-Daten (propDeepDive.pages.analyticsReviews bzw.
.localFirst). Feld-Mapping (links = dein page-Objekt, rechts = en.json):
- eyebrow: "The craft — Analytics & Reviews" bzw. "The craft — Local-first"  (fester Text)
- h1: { pre, em }  → aus hero.headline eine kurze, zweiteilige Version bauen; das letzte
  sinntragende Wort wird em. Beispiel Funded: headline "Guarded, every session." →
  { pre: "Guarded, every", em: "session" }. Der Punkt kommt automatisch als v6-dot.
- sub    → hero.description (wörtlich)
- chips  → hero.tags (wörtlich)
- image  → { src: hero.image, alt: hero.alt, w: 2559, h: 1599 }
  (für Stats_dark.png: w: 1654, h: 1599)
- strip  → heroStrip (value/label wörtlich)
- metrics → metrics, aber Feld "description" heißt bei uns "copy"; Feld "tone" ERSATZLOS weglassen
- sections → sections; pro Section: id, kicker, title, copy (=description), note, rows;
  pro Row: name, status, value, progress, copy (=description); "tone" und "shortTitle" weglassen
- disclaimer → wörtlich (headline + points)
- cta → selbst formulieren, kurz und im Stil der anderen Seiten. Muster:
  { title: "See it.", em: "Fix it", sub: "…ein Satz…", next: { name: "Features", path: "/features" } }
  Für localFirst passt z. B. title "Your data.", em "Your disk".

WICHTIG: Texte aus en.json wörtlich übernehmen (nur "P&L"-Schreibweise mit &amp; wenn nötig
im Template — hier sind es JS-Strings, also einfach "P&L"). Nichts dazu erfinden.

═══ TEIL C: FeaturesPage.vue (neuer Hub) ═══
Die alte Datei (442 Zeilen, Tailwind + AppNav) komplett ersetzen. Aufbau:

1. Script-Grundgerüst (wörtlich übernehmen):
   import { computed, inject, onBeforeUnmount, onMounted, ref } from "vue"
   import { useRoute } from "vue-router"
   import { initMagnetic, initV6Reveals } from "../v6/motion.js"
   import { normalizeLocale } from "../utils/routes.js"

   const isDark = inject("isDark")
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

2. Template-Wurzel: <main ref="rootEl" class="v6-features">, scoped CSS:
   .v6-features { position: relative; z-index: 1; }

3. HERO: .v6-eyebrow "Features" + .v6-h1 `Every tool, one <em>cockpit</em><b class="v6-dot">.</b>`
   + Sub-Text (2 Sätze, --v6-muted, max-width 34rem). padding-top: clamp(7rem, 16vh, 9rem).

4. DISCIPLINE-GRID: 4 große Karten (Funded / Challenge / Personal / Backtest), Grid 2×2,
   bei max-width 900px 1 Spalte. Datenquelle: kopiere aus src/components/LandingV6.vue das
   modes-Array (name, tag, path, accent, headline, copy, points). Jede Karte:
   - als <RouterLink :to="`/${lang}${m.path}`"> gerendert (ganze Karte klickbar,
     text-decoration: none; color: inherit)
   - Klassen und Aufbau wie .v6-mode-card in LandingV6.vue: linke 3px-Akzentleiste über
     ::before mit var(--mode-c), Tag-Zeile, headline als h2/h3, copy, Punkte-Liste
   - Akzent pro Karte per Inline-Style:
     :style="{ '--mode-c': isDark ? m.accent.dark[0] : m.accent.light[0] }"
   - Hover: border-color var(--mode-c) + transform translateY(-4px) (transition wie .v6-card)
   Kopiere die CSS-Regeln von .v6-mode-card (inkl. li::before) aus LandingV6.vue in dein
   scoped CSS — sie sind dort scoped und gelten nicht automatisch hier.

5. WEITERE BEREICHE: 2 Karten im selben Stil, aber ohne --mode-c (Teal-Default greift):
   - "Analytics & Reviews" → /${lang}/analytics-reviews — 2 Sätze Beschreibung + 3 Punkte
     (aus en.json propDeepDive.pages.analyticsReviews.hero ableiten)
   - "Local-first" → /${lang}/local-first — dito aus localFirst
   Layout: Grid 2 Spalten (mobil 1).

6. CRAFT-GRID: kopiere aus LandingV6.vue das features-Array (6 Einträge mit icon/title/copy/
   chips/span) UND die icon()-Helferfunktion UND die Grid-CSS (.v6-craft-grid, .v6-span-5/6/7
   inkl. der responsive Regeln). Abschnittskopf: .v6-eyebrow "The craft" + .v6-h2.

7. ABSCHLUSS-CTA: Muster .v6m-cta aus V6ModePage.vue — Headline
   `Trade. Log. <em>Evolve</em><b class="v6-dot">.</b>`, .v6-btn-lg → /${lang}/pricing.

═══ ROUTER (genau diese 3 Zeilen anpassen) ═══
In src/router.js bei /features, /analytics-reviews und /local-first jeweils im meta-Objekt
`v6: true` ergänzen. KEIN v6Accent (alle drei nutzen den Teal-Default). Sonst nichts ändern.

═══ EISERNE REGELN (gelten für alle 3 Seiten) ═══
- Kein eigenes Nav/Footer/Canvas — liefert die Shell (Route-Meta v6: true).
- Farben nur über var(--v6-…)-Variablen; keine Hex-Werte, keine Tailwind-Klassen, keine dark:-Klassen.
- Light-Mode-Sonderfälle über `.v6.light .deine-klasse { … }` im scoped CSS.
- Globale Klassen wiederverwenden: .v6-eyebrow (mit <i></i>), .v6-h1/.v6-h2 (<em> + v6-dot),
  .v6-btn/.v6-quiet, .v6-card, .v6-card-chips, .v6-reveal (1× pro Block), .v6-magnetic (nur CTAs).
- Keine Imports aus "three" oder src/v6/gl.js; keine eigenen GSAP-Timelines.
- Nichts in src/styles/v6.css, V6Shell.vue, V6ModePage.vue, LandingV6.vue ändern.
- PropWorkflowDeepDive.vue NICHT löschen (passiert in Phase 6).
- Kein git commit / push.

═══ VERIFIKATION (Pflicht) ═══
1. npm run build → fehlerfrei.
2. npm run dev; /en/analytics-reviews, /en/local-first, /en/features öffnen:
   - keine Konsolen-Fehler; Nav/Footer/Partikel da
   - /en/features: die 4 Discipline-Karten zeigen 4 VERSCHIEDENE Akzentfarben
     (teal / gelb / grün / indigo) und verlinken auf die richtigen Unterseiten
   - Theme-Toggle → Light-Mode lesbar
   - 375px Breite → 1-spaltig, kein horizontales Scrollen
3. Kurz melden: was geändert, was geprüft, was unsicher.
```

---
---

## PROMPT — PHASE 5: FAQ, Contact, Manual, Welcome, Bugreport

```
Du arbeitest im Repo "Katsumii Website" (Vue 3 + Vite, <script setup>). Die Website läuft
bereits im V6-Design (Landing, Mode-Seiten, Pricing, Features). Deine Aufgabe: fünf
Sekundärseiten umstellen, in dieser Reihenfolge:
  A) src/components/FaqPage.vue
  B) src/components/ContactPage.vue
  C) src/components/BugReportPage.vue
  D) src/components/WelcomePage.vue
  E) src/components/ManualPage.vue   (die aufwendigste — zuletzt)

═══ SCHRITT 0 — PFLICHTLEKTÜRE ═══
1. src/components/v6/V6ModePage.vue      → V6-Seitenaufbau, Muster .v6m-cta, .v6m-section, .v6m-shot
2. src/components/FundedAccountsPage.vue → fertige V6-Seite als Referenz
3. src/styles/v6.css                     → globale Klassen und CSS-Variablen
4. Die jeweilige ALTE Seite, bevor du sie ersetzt → notiere ALLE i18n-Keys (t('faqPage.…') usw.)
   und die komplette Inhaltsstruktur. Es darf kein Inhalt verloren gehen.

═══ EINMALIG ZUERST: .v6-prose in src/styles/v6.css ergänzen ═══
Am ENDE der Datei src/styles/v6.css wörtlich anhängen (einzige erlaubte Änderung an v6.css):

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

═══ GEMEINSAMES SEITENGERÜST (für alle 5 Seiten) ═══
<script setup>-Beginn wörtlich:
  import { computed, onBeforeUnmount, onMounted, ref } from "vue"
  import { useI18n } from "vue-i18n"
  import { useRoute } from "vue-router"
  import { initMagnetic, initV6Reveals } from "../v6/motion.js"
  import { normalizeLocale } from "../utils/routes.js"

  const { t, tm } = useI18n()
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

Template-Wurzel: <main ref="rootEl" class="v6-faq"> (Klassenname pro Seite anpassen),
scoped CSS: .v6-faq { position: relative; z-index: 1; }

Seitenkopf überall gleich (kleinerer Hero als die Landing):
  <section class="…-hero">   → padding: clamp(7rem, 16vh, 9rem) clamp(1.1rem, 4vw, 3rem) 3rem;
                               max-width: 1240px; margin: 0 auto;
  <p class="v6-eyebrow v6-reveal"><i></i>{{ t('…label…') }}</p>
  <h1 class="v6-h1 v6-reveal" style-Hinweis: im scoped CSS die Größe reduzieren:
    .…-hero .v6-h1 { font-size: clamp(2.2rem, 5vw, 3.6rem); }
  Akzentwort in <em>, Punkt als <b class="v6-dot">.</b>
  + Sub-Absatz (color: var(--v6-muted); max-width: 34rem)

═══ A) FaqPage.vue ═══
- Alle Fragen/Antworten aus den bestehenden i18n-Keys übernehmen (alte Seite lesen; Headless-UI
  Disclosure wird ersetzt).
- Jede Frage als natives <details>-Element:
  <details class="v6-faq-item v6-reveal">
    <summary>{{ frage }}</summary>
    <p>{{ antwort }}</p>
  </details>
- Scoped CSS:
  .v6-faq-item { border-bottom: 1px solid var(--v6-line); }
  .v6-faq-item summary {
    display: flex; justify-content: space-between; align-items: center; gap: 1rem;
    cursor: pointer; list-style: none; padding: 1.2rem 0;
    font-family: var(--v6-display); font-weight: 700; font-size: 1.05rem; color: var(--v6-ink);
  }
  .v6-faq-item summary::-webkit-details-marker { display: none; }
  .v6-faq-item summary::after { content: "+"; color: var(--v6-gold); font-family: var(--v6-mono); font-size: 1.2rem; }
  .v6-faq-item[open] summary::after { content: "–"; }
  .v6-faq-item p { color: var(--v6-muted); margin: 0 0 1.3rem; max-width: 42rem; line-height: 1.7; }
- Liste in einen Container mit max-width: 780px; margin: 0 auto.
- Unten kleiner CTA-Block: "Question not answered?" + .v6-quiet-Link zu /${lang}/contact.

═══ B) ContactPage.vue und C) BugReportPage.vue ═══
- Inhalte (E-Mail-Adressen, Kanäle, Hinweise, ggf. Formular) aus der alten Seite übernehmen.
- Kontaktwege als .v6-card-Grid (2 Spalten, mobil 1): Mono-Label oben (Muster .v6m-metric-label
  aus V6ModePage.vue), darunter Wert/Link.
- Falls Formularfelder existieren, einheitliches Input-Styling im scoped CSS:
  input, textarea, select {
    width: 100%; background: var(--v6-panel); border: 1px solid var(--v6-line);
    border-radius: 10px; color: var(--v6-ink); padding: 0.8rem 1rem;
    font-family: var(--v6-body); font-size: 0.95rem;
  }
  input:focus, textarea:focus, select:focus { outline: none; border-color: var(--v6-gold); }
  label { font-family: var(--v6-mono); font-size: 0.7rem; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--v6-faint); }
  Submit-Button: <button class="v6-btn v6-magnetic" type="submit">
- Bestehende Formular-LOGIK (mailto-Bau, Validierung, v-model) unverändert übernehmen.

═══ D) WelcomePage.vue ═══
- Kurze zentrierte Seite; Inhalte der alten Seite übernehmen (Danke-/Download-Hinweise).
- Muster: .v6m-cta aus V6ModePage.vue (text-align: center, große Headline mit <em>+v6-dot,
  Sub-Text, .v6-btn). Zusätzliche Hinweise darunter als .v6-card mittig (max-width 34rem).
- Route hat bereits robots noindex — nicht anfassen.

═══ E) ManualPage.vue ═══
- Alle Kapitel/Inhalte der alten Seite vollständig übernehmen (i18n-Keys weiterverwenden).
- Layout zweispaltig: 
  .v6-manual-grid { max-width: 1240px; margin: 0 auto; display: grid;
    grid-template-columns: 220px 1fr; gap: clamp(2rem, 4vw, 4rem);
    padding: 0 clamp(1.1rem, 4vw, 3rem) 6rem; }
  Links Kapitel-Navigation: <nav> mit Ankerlinks (#kapitel-id), position: sticky; top: 6rem;
  Link-Stil wie .v6-nav-links a aus v6.css (Mono, uppercase, --v6-muted, hover --v6-gold-hi).
  Bei max-width 900px: grid-template-columns: 1fr und die Sticky-Nav ausblenden (display:none).
- Rechts Inhalt: jedes Kapitel als <section :id="…" class="v6-prose v6-reveal"> mit h2/h3/p/li.
- Screenshots (falls die alte Seite welche zeigt) in Rahmen: Muster .v6m-shot aus
  V6ModePage.vue kopieren (border 1px var(--v6-line-strong), border-radius 14px, Schatten).

═══ ROUTER ═══
In src/router.js bei /faq, /contact, /bugreport, /welcome und /manual jeweils `v6: true`
im meta-Objekt ergänzen. KEIN v6Accent. Sonst nichts ändern.

═══ EISERNE REGELN ═══
- Kein eigenes Nav/Footer/Canvas; Farben nur var(--v6-…); keine Tailwind-/dark:-Klassen;
  Light-Mode-Sonderfälle via `.v6.light .klasse`; globale Klassen wiederverwenden;
  .v6-reveal sparsam (1× pro Block); keine three/gl.js-Imports; keine GSAP-Timelines;
  i18n-Keys unverändert weiterverwenden; interne Links mit /${lang}/…;
  alte Hilfskomponenten (AppNav, KbBackground, Headless UI) nicht löschen (Phase 6);
  kein git commit/push.

═══ VERIFIKATION (nach JEDER Seite, nicht erst am Ende) ═══
1. npm run build → fehlerfrei.
2. npm run dev; Seite unter /en/<pfad> öffnen: keine Konsolen-Fehler, Inhalte vollständig
   (mit alter Seite vergleichen), FAQ-Accordion öffnet/schließt, Formulare funktionieren
   (Submit-Verhalten der alten Seite erhalten), Theme-Toggle → Light lesbar, 375px ok.
3. Am Ende kurz melden: was geändert, was geprüft, was unsicher.
```

---
---

## PROMPT — PHASE 6: Legal-Seiten, 404, Aufräumen, Gesamtverifikation

```
Du arbeitest im Repo "Katsumii Website" (Vue 3 + Vite, <script setup>). Die gesamte Website
läuft inzwischen im V6-Design — nur die Rechtsseiten und die 404-Seite fehlen noch. Danach
räumst du tote Altdateien auf und verifizierst die komplette Site. Reihenfolge strikt einhalten.

═══ SCHRITT 0 — PFLICHTLEKTÜRE ═══
1. src/components/v6/V6ModePage.vue + src/components/FundedAccountsPage.vue → V6-Muster
2. src/styles/v6.css → globale Klassen; .v6-prose existiert bereits (in Phase 5 ergänzt)
3. Die alten Seiten ImpressumPage.vue / PrivacyPage.vue / TermsPage.vue / NotFoundPage.vue
4. src/router.js

═══ TEIL 1: Impressum, Privacy, Terms ═══
KRITISCH: Das sind RECHTSTEXTE. Inhalt 1:1 übernehmen — nichts umformulieren, nichts kürzen,
nichts weglassen, keine Links entfernen. Nur das Layout ändert sich. i18n-Keys (t()/tm())
exakt weiterverwenden wie in den alten Dateien.

Gerüst pro Seite (Script-Boilerplate wie in allen V6-Seiten):
  import { computed, onBeforeUnmount, onMounted, ref } from "vue"
  import { useI18n } from "vue-i18n"
  import { useRoute } from "vue-router"
  import { initMagnetic, initV6Reveals } from "../v6/motion.js"
  import { normalizeLocale } from "../utils/routes.js"
  const { t, tm } = useI18n()
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

Template:
  <main ref="rootEl" class="v6-legal">
    <section class="v6-legal-head">
      <p class="v6-eyebrow v6-reveal"><i></i>Legal</p>
      <h1 class="v6-h1 v6-reveal">{{ Seitentitel aus i18n }}</h1>
    </section>
    <section class="v6-prose v6-legal-body">
      … kompletter Rechtstext (Struktur der alten Seite: h2/h3/p/ul) …
    </section>
  </main>
Scoped CSS:
  .v6-legal { position: relative; z-index: 1; }
  .v6-legal-head { max-width: 1240px; margin: 0 auto;
    padding: clamp(7rem, 16vh, 9rem) clamp(1.1rem, 4vw, 3rem) 1rem; }
  .v6-legal-head .v6-h1 { font-size: clamp(2.2rem, 5vw, 3.4rem); }
  .v6-legal-body { margin: 0 auto; padding: 1rem clamp(1.1rem, 4vw, 3rem) 6rem; }
Auf Rechtsseiten KEIN <em>/v6-dot-Spiel im Titel, kein CTA-Block — nüchtern lassen.

═══ TEIL 2: NotFoundPage.vue ═══
Zentrierte Mini-Seite:
  <main ref="rootEl" class="v6-404">
    <section>
      <p class="v6-eyebrow v6-reveal"><i></i>404</p>
      <h1 class="v6-h1 v6-reveal">Lost in the <em>data</em><b class="v6-dot">.</b></h1>
      <p class="v6-reveal">This page does not exist. The journal, however, does.</p>
      <RouterLink :to="`/${lang}/app`" class="v6-btn v6-magnetic v6-reveal">Back to Katsumii</RouterLink>
    </section>
  </main>
CSS: min-height: 70vh; display: flex; align-items: center; justify-content: center;
text-align: center; Absatz in var(--v6-muted). (Falls die alte 404 i18n-Texte nutzt,
diese stattdessen verwenden.)

═══ TEIL 3: Router ═══
`v6: true` bei /impressum, /privacy, /terms ergänzen UND bei den BEIDEN NotFound-Routen
(die Route mit :pathMatch innerhalb des Locale-Prefixes und die globale ganz unten).
KEIN v6Accent. Sonst nichts ändern.

═══ TEIL 4: Aufräumen (ERST nachdem Teil 1–3 gebaut und im Browser verifiziert sind) ═══
Vorgehen pro Kandidat: erst mit Grep über src/ prüfen, ob die Datei noch irgendwo importiert
wird. NUR löschen, wenn es KEINEN Import mehr gibt. ACHTUNG: /v2–/v5 (LandingV2–V5.vue)
bleiben erreichbar und dürfen Altkomponenten weiter nutzen — was sie importieren, bleibt!

Kandidaten (Reihenfolge einhalten):
1. src/components/LandingV4 - Copy.vue        → wird nirgends geroutet → löschen
2. src/components/featureDeepDive/PropWorkflowDeepDive.vue → sollte nach Phase 4 referenzlos sein
3. src/App.vue (alte Startseite) und src/components/home/* → nur löschen, wenn referenzlos
4. src/components/AppNav.vue, BgSwitch.vue, DarkLightSwitch.vue, LangSwitch.vue,
   src/backgrounds/KbBackground.vue, src/composables/useSiteNavigation.js,
   src/composables/useBg.js → EINZELN per Grep prüfen; wenn noch von LandingV2–V5 oder
   AppShell.vue genutzt → BEHALTEN und im Abschlussbericht auflisten statt löschen.
Nach JEDER Löschung: npm run build. Schlägt er fehl → Löschung rückgängig machen und
die Datei im Bericht als "noch referenziert" vermerken.

═══ TEIL 5: Gesamtverifikation ═══
1. npm run build → fehlerfrei.
2. npm run dev und JEDE dieser URLs öffnen; pro Seite: rendert, keine Konsolen-Fehler,
   V6-Nav/Footer da:
   /en/app, /en/features, /en/funded-accounts, /en/prop-firm-challenges,
   /en/personal-trading, /en/backtesting, /en/analytics-reviews, /en/local-first,
   /en/pricing, /en/manual, /en/faq, /en/contact, /en/bugreport,
   /en/impressum, /en/privacy, /en/terms, /en/welcome, /en/gibtesnicht (→ 404-Seite)
3. Stichproben: /de/app (Locale-Routing), /v6 (→ Redirect auf /en/app oder /de/app),
   /v2 /v3 /v4 /v5 (alte Landings rendern unverändert).
4. Auf /en/app: Theme-Toggle testen (Light lesbar) und einmal komplett durchscrollen
   (Modes-Sektion wechselt Akzentfarben).

═══ EISERNE REGELN ═══
- Kein eigenes Nav/Footer/Canvas in Seiten; Farben nur var(--v6-…); keine Tailwind-/dark:-
  Klassen in V6-Seiten; keine three/gl.js-Imports; keine Änderungen an V6Shell.vue,
  V6ModePage.vue, LandingV6.vue, motion.js, gl.js, v6.css; i18n-Keys unverändert;
  Rechtstexte unverändert; kein git commit/push.

═══ ABSCHLUSSBERICHT ═══
Kurz auflisten: (1) umgestellte Seiten, (2) gelöschte Dateien, (3) bewusst behaltene
Altdateien mit Grund, (4) Ergebnis der Gesamtverifikation, (5) offene Punkte/Unsicherheiten.
```
