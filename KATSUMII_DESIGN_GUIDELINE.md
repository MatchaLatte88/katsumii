# Katsumii Design Guideline

Dieses Dokument beschreibt das aktuelle Design-System der Katsumii-Marketing-Website ("V6" / "Living Data") vollständig genug, um eine neue Unterseite zu bauen, die sich nahtlos einfügt — ohne die bestehende Seite gesehen zu haben. Es gilt für alle produktiven Unterseiten (Landing, Features, Pricing, Manual, FAQ, Contact, Legal, Analytics, Customization, Bug Report, ...). Es beschreibt NICHT die älteren Prototyp-Landingpages `/v2`–`/v5`, die parallel existieren, aber ein eigenes Design tragen.

---

## 1. Grundidee der Design-Sprache

**Name:** "Living Data" — warme Tinte + diszipliniert eingesetzte Akzentfarbe auf dunklem (oder hellem) Grund, mit einem lebendigen Partikel-Hintergrund aus WebGL, der wie ein fließender Datenstrom wirkt.

**Charakter:**
- Dunkel, ruhig, fokussiert — kein verspieltes SaaS-Bunt. Ein einziger Akzentton pro Seite/Disziplin trägt die gesamte Farbigkeit.
- Redaktionell/editorial statt "Dashboard-UI": große, enge, fette Display-Typografie kombiniert mit sehr kleinem, gesperrtem Mono-Text für Meta-Informationen (Eyebrows, Labels, Captions).
- Ruhige Bewegung: sanfte Scroll-Reveals, ein treibender Partikelstrom im Hintergrund, magnetische Buttons — nichts hüpft oder blinkt aggressiv.
- Jede Seite/Disziplin bekommt eine eigene Akzentfarbe (Retinting), aber Layout, Typografie, Radien, Spacing-Rhythmus bleiben über die ganze Seite identisch.

---

## 2. Farbsystem

Alle Farben sind CSS Custom Properties auf dem Root-Element `.v6`, gesetzt in `src/styles/v6.css`. Sie werden pro Theme (`.v6` = dark, `.v6.light` = light) überschrieben, und der Akzent (`--v6-gold` / `--v6-gold-hi`) wird zusätzlich pro Route/Disziplin per Inline-Style überschrieben (siehe Abschnitt 6).

### 2.1 Basis-Tokens (Dark, Default)

| Token | Wert | Verwendung |
|---|---|---|
| `--v6-bg` | `#070d16` | Seitenhintergrund |
| `--v6-bg-soft` | `#0d1626` | Sekundärer Hintergrund (z. B. Screenshot-Rahmen) |
| `--v6-panel` | `rgba(30,41,59,0.42)` | Karten-/Panel-Hintergrund (in Gradients) |
| `--v6-line` | `rgba(226,232,240,0.08)` | Standard-Trennlinie/Border |
| `--v6-line-strong` | `rgba(34,211,238,0.3)` | Betonte Border, oft akzentbasiert (wird pro Akzent neu berechnet) |
| `--v6-ink` | `#eef2f7` | Haupttext |
| `--v6-muted` | `#94a3b8` | Fließtext/sekundärer Text |
| `--v6-faint` | `#64748b` | Tertiärer Text (Captions, Footer) |
| `--v6-gold` | `#22d3ee` (Default-Akzent, Cyan) | Primärakzent — wird pro Seite überschrieben |
| `--v6-gold-hi` | `#67e8f9` | Heller Akzent-Ton (Hover, Gradient-Ende, Emphasis) |
| `--v6-ember` | `#ff7847` | Warmer Zweitakzent, sparsam (z. B. `.v6-dot`, Notiz-Rahmen) |

Trotz der Variablennamen `--v6-gold*` ist der **Default-Akzent Cyan** (`#22d3ee`), nicht Gold — die Namen sind ein Überbleibsel und werden pro Route mit anderen Hex-Werten belegt. Neue Seiten sollten diese Variablennamen weiterverwenden, nicht neue Farbvariablen erfinden.

### 2.2 Light-Theme-Überschreibung (`.v6.light`)

| Token | Wert |
|---|---|
| `--v6-bg` | `#f8fafc` |
| `--v6-bg-soft` | `#eef2f7` |
| `--v6-panel` | `rgba(255,255,255,0.68)` |
| `--v6-line` | `rgba(15,23,42,0.10)` |
| `--v6-ink` | `#0f172a` |
| `--v6-muted` | `#475569` |
| `--v6-faint` | `#64748b` |
| `--v6-gold` (Default-Akzent light) | `#0369a1` |
| `--v6-gold-hi` | `#075985` |
| `--v6-ember` | `#d4531d` |

Regel: Jede Farbe, die im Dark-Theme kräftig/hell ist, wird im Light-Theme dunkler/gesättigter, damit der Kontrast auf hellem Grund erhalten bleibt (z. B. Cyan → Sattblau, nicht dasselbe Cyan auf Weiß).

### 2.3 Disziplin-Akzente (pro Trading-Modus)

Die vier Trading-Disziplinen des Produkts haben feste Akzentpaare, definiert in `src/router.js` (`V6_ACCENTS`) und gespiegelt in `V6Shell.vue` (Nav-Dropdown-Punkte) sowie `CustomizationPage.vue` (Swatches). **Bei neuen Seiten, die zu einer bestehenden Disziplin gehören, immer diese Werte wiederverwenden — nie neu erfinden.**

| Disziplin | Dark (`gold` / `gold-hi`) | Light (`gold` / `gold-hi`) |
|---|---|---|
| Funded | `#22d3ee` / `#67e8f9` (Cyan) | `#0369a1` / `#075985` |
| Challenge | `#facc15` / `#fde68a` (Gelb) | `#ab7503` / `#8a5e02` |
| Personal | `#4ade80` / `#a7f3c0` (Grün) | `#047857` / `#065f46` |
| Backtest | `#818cf8` / `#c4b5fd` (Indigo) | `#6d28d9` / `#5b21b6` |

Seiten ohne eigene Disziplin (Landing, Features-Übersicht, Pricing, Manual, FAQ, Contact, Customization, Analytics, Bug Report, Legal) nutzen den **Default-Akzent** (Cyan/Sattblau, siehe 2.1/2.2) — sie setzen kein `v6Accent` in der Route-Meta.

### 2.4 Wie eine neue Seite ihre Akzentfarbe bekommt

- **Neutrale Seite:** kein `v6Accent` in der Route-Meta setzen → Default-Cyan wird verwendet.
- **Disziplin-Seite:** in `router.js` `v6Accent: V6_ACCENTS.funded` (o. ä.) an der Route-Meta übergeben.
- **Neue eigene Farbe nötig?** Nur nach Rücksprache — das bestehende Palettensystem ist bewusst auf diese fünf Akzente (Default + 4 Disziplinen) begrenzt.
- Der Akzent lässt sich zur Laufzeit auch dynamisch ändern (`inject("v6Accent").set([hex, hexHi])`), das wird aktuell aber nicht in normalen Unterseiten genutzt, nur als Mechanismus vorhanden.

### 2.5 Wichtige Farbregeln

- Nie Farben inline hart codieren, wenn ein Token existiert — immer `var(--v6-*)` verwenden.
- `--v6-line-strong` wird aus dem aktuellen Akzent berechnet (`hexToRgba(accent, alpha)`), damit Card-Borders/Chips automatisch zur Seiten-Disziplin passen.
- Fließtext ist nie reines Weiß/Schwarz — immer `--v6-muted` oder `--v6-ink`.
- `--v6-ember` (Warmton) ist ein bewusst seltenes drittes Signal (z. B. der Punkt nach "Katsumii." im Logo, Notiz-Boxen mit linker Akzentlinie) — nicht als zweite Hauptfarbe verwenden.

---

## 3. Typografie

### 3.1 Schriftfamilien (self-hosted, `public/fonts/`, eingebunden über `public/fonts/fonts.css` im `<head>` von `index.html`)

| CSS-Variable | Fonts | Verwendung |
|---|---|---|
| `--v6-display` | `"DM Sans", "Manrope", sans-serif` | Überschriften, Buttons, Markenname, Card-Titel — immer `font-weight: 700` |
| `--v6-body` | `"Manrope", "Segoe UI", sans-serif` | Fließtext, Standard-Body-Font der ganzen Seite |
| `--v6-mono` | `"DM Mono", ui-monospace, monospace` | Eyebrows, Nav-Links, Chips, Captions, Labels — immer in UPPERCASE mit großem `letter-spacing` |

(`Fraunces` und `Sora` liegen ebenfalls als Font-Face vor, sind aber Relikte der älteren `/v5`- bzw. Legacy-Design-Systeme — für V6-Seiten nicht verwenden.)

### 3.2 Typografische Rollen & vorgefertigte Klassen

Alle in `src/styles/v6.css` global definiert — in neuen Seiten wiederverwenden, nicht neu bauen:

- **`.v6-eyebrow`** — kleines Label über jeder Sektion/Hero: Mono, `0.75rem`, `letter-spacing: 0.2em`, uppercase, Farbe `--v6-gold`, mit einem `<i>`-Strich davor (22px Linie).
  ```html
  <p class="v6-eyebrow v6-reveal"><i></i>Section Label</p>
  ```
- **`.v6-h1`** — große Hero-Headline: `--v6-display`, `font-weight: 700`, `clamp(2.9rem, 8.4vw, 6.4rem)`, `line-height: 1.02`, `letter-spacing: -0.035em`. Enthält oft ein `<em>` für den hervorgehobenen Teil (kursiv, `--v6-gold-hi`) und endet oft mit `<b class="v6-dot">.</b>` (Ember-farbener Punkt als Markenzeichen).
  ```html
  <h1 class="v6-h1 v6-reveal">Your journal. <em>Your rules</em><b class="v6-dot">.</b></h1>
  ```
- **`.v6-h2`** — Sektions-Headline: `clamp(1.9rem, 4.4vw, 3.3rem)`, sonst wie `.v6-h1` (kleiner, kein Bottom-Margin standardmäßig).
- Fließtext unter Headlines: eigene Utility-Klasse pro Seite (z. B. `.v6cu-sub`), aber immer `color: var(--v6-muted)` und `max-width` (~30–34rem), damit Zeilen nicht zu breit werden.

### 3.3 Größen-Rhythmus (Richtwerte)

- H1 (Hero): 2.9rem–6.4rem (clamp, viewport-abhängig)
- H2 (Section): 1.9rem–3.3rem
- Card-Titel (`h3`): 1.18rem, `font-weight: 700`
- Body: Basis `1.0625rem` (Root, `.v6`), Card-Text/Sub-Text meist `0.9rem`–`0.96rem`
- Mono-Labels: `0.6rem`–`0.85rem`, immer mit `letter-spacing` zwischen `0.08em` und `0.24em`

---

## 4. Layout & Spacing

### 4.1 Container

- Max-Breite für Seiteninhalt: **`1240px`**, zentriert, mit responsivem horizontalem Padding `clamp(1.1rem, 4vw, 3rem)`. Diese Kombination (`max-width: 1240px; margin: 0 auto; padding: 0 clamp(1.1rem, 4vw, 3rem);`) ist der Standard-Container jeder Sektion — siehe `.v6-section-head`, `.v6-footer`, `.v6cu-hero`, `.v6cu-section`.
- Vertikaler Sektionsabstand: `clamp(2.5rem, 7vh, 4.5rem)` für normale Sections, `clamp(8rem, 18vh, 11rem)` Top-Padding für Hero-Sections (Platz für die fixe Nav).

### 4.2 Zwei-Spalten-Sektionsmuster ("Text + Screenshot")

Das dominante Layout-Pattern jeder Feature-/Content-Seite: Grid mit `grid-template-columns: minmax(300px, 5fr) 6fr;`, Text links, Bildschirmfoto rechts (oder umgekehrt via `.flip`-Modifier, der die Grid-`order` vertauscht). Unter 900px wird das Grid zu einer Spalte.

```css
.page-section {
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(2.5rem, 7vh, 4.5rem) clamp(1.1rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: minmax(300px, 5fr) 6fr;
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: center;
}
.page-section.flip > :first-child { order: 2; }
.page-section.flip > :last-child { order: 1; }
```

Screenshots stecken in einem `<figure>` mit `border: 1px solid var(--v6-line-strong)`, `border-radius: 14px`, Glow-Shadow, und `<figcaption>` im Mono-Caption-Stil.

### 4.3 Radien

- Große Panels/Cards/Screenshots: `14px`–`18px`
- Buttons, Pills, Chips: `999px` (voll gerundet)
- Kein Radius unter 10px außer bei sehr kleinen UI-Elementen (Toggle-Knopf).

### 4.4 Grids für Karten (z. B. Feature-Grid)

`.v6-card` (siehe 5.3) wird typischerweise in einem `display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: ...` Raster verwendet.

---

## 5. Wiederverwendbare Komponenten (aus `src/styles/v6.css`)

Diese Klassen sind global verfügbar für jede Seite, die im `V6Shell` gerendert wird — **immer zuerst prüfen, ob eine bestehende Klasse passt, bevor eine seitenspezifische erfunden wird** (Projekt-Regel).

### 5.1 Buttons

- `.v6-btn` — Primär-CTA: voll gerundete Pill, Hintergrund `--v6-gold`, Text dunkel (`#031820`), `font-weight: 700`, Hover wechselt zu `--v6-gold-hi` + Glow-Shadow. Varianten: `.v6-btn-sm`, `.v6-btn-lg`. Für "Coming soon"/nicht-klickbare CTAs: `.v6-btn-static` (sieht aus wie Button, ist keiner: `pointer-events: none`).
  ```html
  <RouterLink class="v6-btn v6-magnetic" to="/pricing">Get Katsumii <span aria-hidden="true">→</span></RouterLink>
  ```
- `.v6-quiet` — sekundärer Text-Link (kein Hintergrund), Hover-Farbe `--v6-gold-hi`.
- `.v6-magnetic` — Zusatzklasse (kombiniert mit Button/Link), aktiviert den magnetischen Cursor-Effekt aus `src/v6/motion.js` (nur bei Fine-Pointer/kein reduced-motion).

### 5.2 Eyebrow / Headlines

Siehe Abschnitt 3.2 (`.v6-eyebrow`, `.v6-h1`, `.v6-h2`, `.v6-dot`).

### 5.3 Cards

`.v6-card` — Standard-Feature-Karte: 1px Border (`--v6-line`), `border-radius: 16px`, Gradient-Hintergrund aus `--v6-panel`, Hover: Border wird `--v6-line-strong`, `translateY(-4px)`. Enthält optional `.v6-card-icon` (26×26px Icon in Akzentfarbe), `h3`, `p`, und `.v6-card-chips` (Liste kleiner Mono-Pills).

```html
<div class="v6-card">
  <span class="v6-card-icon"><svg>...</svg></span>
  <h3>Card title</h3>
  <p>Card description text.</p>
  <ul class="v6-card-chips"><li>Tag one</li><li>Tag two</li></ul>
</div>
```

### 5.4 Panels/Reihen (Settings-Listen, wie in Customization)

Wiederkehrendes Muster für Listen von Eigenschaften: `.v6cu-rows`/`.v6cu-row` in `CustomizationPage.vue` ist seitenspezifisch benannt, folgt aber einem generischen Muster (Panel mit `border`, `border-radius: 18px`, gleicher Gradient-Hintergrund wie Cards, innen Reihen mit `border-bottom` zwischen Items). Bei neuen Seiten mit ähnlichem Bedarf dieses Muster kopieren (Klassenpräfix der neuen Seite verwenden, nicht `v6cu-*` fremdnutzen).

### 5.5 Chips/Pills

`.v6-card-chips li` — Mono-Text, `0.68rem`, uppercase, `--v6-gold`-farbener Text, `border: 1px solid var(--v6-line-strong)`, `border-radius: 999px`.

### 5.6 Notiz-Box

Linksbündige Akzentbox mit `--v6-ember`-Border (siehe `.v6cu-note` in `CustomizationPage.vue`) für einen einzelnen hervorgehobenen Hinweis pro Seite — sparsam einsetzen (max. 1× pro Seite).

---

## 6. Seiten-Grundgerüst (Chrome) — `V6Shell.vue`

**Jede neue Unterseite wird NICHT selbst Nav/Footer/Hintergrund bauen.** Alle V6-Seiten werden von `src/components/v6/V6Shell.vue` umschlossen (gesteuert über `route.meta.v6: true` in `router.js`, verdrahtet in `src/AppShell.vue`). Der Shell liefert automatisch:

- Fixe **Nav-Leiste** oben (Logo, Features-Dropdown mit den 4 Disziplinen + Analytics/Customization, Pricing/Manual/FAQ-Links, Theme-Toggle, Contact, "Coming soon"-Pill, Mobile-Hamburger-Menü)
- **WebGL-Partikelhintergrund** (`v6-gl`, aus `src/v6/gl.js`) + Noise-Overlay + Scroll-Progress-Leiste
- **Footer** (Copyright, Contact/Privacy/Terms/Impressum)
- Theme-Klasse (`.v6` dark / `.v6.light`) und den aktuellen Akzent als CSS-Variablen

Eine neue Seite liefert nur ihren `<main>`-Inhalt als Component, der über die Router-Route in den `<slot />` des Shells gerendert wird.

### 6.1 Route-Meta-Flags, die jede neue Seite setzen muss (`router.js`)

```js
const NewPage = () => import("./components/NewPage.vue")
// ...
withLocale("/new-page", NewPage, {
  titleKey: "common.pageTitles.newPage",
  descriptionKey: "common.pageDescriptions.newPage",
  v6: true,                       // aktiviert V6Shell (Pflicht für neue Seiten)
  // v6Accent: V6_ACCENTS.funded, // nur falls die Seite zu einer Disziplin gehört
  // v6DimBg: true,               // Partikel-BG auf 20% Opazität (textlastige Seiten: Pricing, FAQ, Contact, Bug Report)
  // v6NoBg: true,                // Partikel-BG komplett aus (sehr textlastige Seiten: Manual, Impressum, Privacy, Terms)
})
```

Faustregel für `v6DimBg` vs. `v6NoBg` vs. voller Partikel-BG:
- **Voller BG** — Landing, Features-Übersicht, Disziplin-Seiten, Customization, Analytics: bildlastig/verkaufsorientiert, Partikel dürfen dominant sein.
- **`v6DimBg`** — Pricing, FAQ, Contact, Bug Report: Text-/Formular-lastig, Hintergrund soll dezent im Auge bleiben.
- **`v6NoBg`** — Manual, Legal-Seiten (Impressum/Privacy/Terms): reine Lesetexte, Partikel wären Ablenkung.

Zusätzlich muss der Legacy-Redirect-Eintrag ergänzt werden (`legacyRedirect("/new-page")`), damit unlokalisierte alte URLs weiterhin funktionieren — siehe bestehende Einträge als Vorlage.

---

## 7. Bewegung & Interaktion

Alle Motion-Utilities liegen in `src/v6/motion.js` und respektieren `prefers-reduced-motion` automatisch.

### 7.1 Scroll-Reveals

Jedes Element, das beim Reinscrollen sanft einblenden soll, bekommt die Klasse **`.v6-reveal`**. Beim `onMounted()` der Seite wird `initV6Reveals(rootEl.value)` aufgerufen (GSAP + ScrollTrigger), Cleanup in `onBeforeUnmount()`.

```js
import { initV6Reveals, initMagnetic } from "../v6/motion.js"

const rootEl = ref(null)
let cleanups = []
onMounted(() => {
  cleanups.push(initV6Reveals(rootEl.value))
  cleanups.push(initMagnetic(rootEl.value))
})
onBeforeUnmount(() => {
  cleanups.forEach((off) => off && off())
  cleanups = []
})
```

```html
<main ref="rootEl">
  <p class="v6-eyebrow v6-reveal">...</p>
  <h1 class="v6-h1 v6-reveal">...</h1>
</main>
```

Effekt: `autoAlpha 0→1`, `y: 26→0`, `duration: 0.85`, ease `power3.out`, triggert einmalig bei `top 86%` im Viewport.

### 7.2 Magnetische Buttons

Klasse `.v6-magnetic` auf CTA-Links/Buttons + `initMagnetic(rootEl.value)` im Setup — Button folgt dezent dem Cursor (nur bei Maus/Trackpad, nie auf Touch).

### 7.3 Zahlen-Zähler (Count-up)

Für animierte Statistik-Zahlen: `[data-count]`-Attribut mit Zielwert, wird automatisch von `initV6Reveals` erfasst.
```html
<span data-count="87">0</span>
```

### 7.4 Was NICHT selbst gebaut wird

- Kein eigener WebGL-Hintergrund pro Seite (kommt vom Shell).
- Keine neue Scroll-/Reveal-Library — immer `v6-reveal` + `initV6Reveals`.
- Nav-Highlighting, Mobile-Menü, Theme-Toggle-Icon-Logik gehören in den Shell, nicht in Unterseiten.

---

## 8. Dark/Light Mode

- Theme-Zustand kommt injiziert von `AppShell.vue`/`useTheme.js`: `const isDark = inject("isDark")`.
- Fast alle Farb-Unterschiede laufen automatisch über CSS-Variablen (Abschnitt 2) — in eigenem Component-CSS i. d. R. **keine** `.v6.light`-Sonderregel nötig.
- Ausnahme: Wo ein Gradient/Shadow im Light-Theme spürbar anders wirken muss (z. B. Panel-Gradient heller/wärmer statt dunkler), wird gezielt `.v6.light .meine-klasse { ... }` ergänzt — siehe `.v6.light .v6cu-shot`, `.v6.light .v6cu-rows` als Vorlage.
- Bild-Assets, die sich je nach Theme unterscheiden (App-Screenshots): Dateinamen-Konvention `Name_dark.png` / `Name_light.png`, Auswahl per `isDark.value ? '..._dark.png' : '..._light.png'`.
  ```js
  const asset = (path) => `${import.meta.env.BASE_URL}${path}`
  // <img :src="asset(isDark ? 'Dashboard_dark.png' : 'Dashboard_light.png')" ... />
  ```

---

## 9. Responsive Verhalten

Zwei feste Breakpoints dominieren das System:

- **`900px`** — Zwei-Spalten-Grids (Hero, Content-Sections) werden zu einer Spalte; Desktop-Nav-Links verschwinden zugunsten des Hamburger-Menüs.
- **`640px`** — Feintuning: kleinere Radien/Schriftgrößen, Footer wird zu vertikalem Stack, Card-Hover-Transform wird deaktiviert (kein `translateY` auf Touch), Buttons werden `min-height: 48px` mit zentriertem Text.
- Zusätzlicher Mikro-Breakpoint `360px` nur für Nav-Icon-Größen bei sehr schmalen Screens.

Neue Seiten übernehmen dieselben zwei Breakpoints für ihr eigenes `<style scoped>` — keine neuen Breakpoints einführen, außer eine Komponente braucht zwingend einen dritten (z. B. Tabellen).

---

## 10. Internationalisierung (i18n)

Jede neue Seite MUSS lokalisierbaren Text über `vue-i18n` liefern, kein hartcodiertes Englisch außer in Ausnahmefällen (Bug Report nutzt aktuell noch teils Platzhalter-Copy — kein Vorbild für neue Seiten, dort besser vollständig lokalisieren).

1. Neuer Namespace in **allen vier** `src/locales/{en,de,es,tw}.json`, z. B.:
   ```json
   "newPage": {
     "hero": { "label": "...", "title": "...", "description": "..." }
   }
   ```
2. SEO-Metadaten in `common.pageTitles.newPage` und `common.pageDescriptions.newPage` (ebenfalls in allen vier Sprachdateien) — werden von `AppShell.vue` automatisch für `<title>`, `og:title`, Twitter-Card, JSON-LD verwendet, sobald `titleKey`/`descriptionKey` in der Route-Meta gesetzt sind.
3. Im Component: `const { t } = useI18n()`, dann `{{ t('newPage.hero.title') }}`.
4. Interne Links immer lokalisiert bauen: `` `/${lang}/pricing` `` mit `lang` aus `normalizeLocale(route.params.locale)` (siehe `utils/routes.js`), nie `/pricing` ohne Locale-Präfix.

---

## 11. Assets

- Alle öffentlichen Assets (Bilder, Screenshots) über `import.meta.env.BASE_URL` referenzieren, nicht absolute `/`-Pfade:
  ```js
  const asset = (path) => `${import.meta.env.BASE_URL}${path}`
  ```
- Icons sind Inline-SVG (keine Icon-Font, kein externes Sprite) — Stroke-Style, `stroke-width` meist `1.4`–`1.6`, `stroke-linecap="round"`, Farbe über `currentColor`/`--v6-gold`.
- Logo: `logo.png`, 32×32 in der Nav, `border-radius: 8px`.

---

## 12. Checkliste: Neue V6-Unterseite bauen (z. B. "Bugreport")

1. `src/components/<Name>Page.vue` anlegen, `<main class="v6-<kurzpräfix>">` als Root.
2. Struktur: Hero-Section (Eyebrow + H1 + Sub-Text + optional CTA) → 1–n Content-Sections (Zwei-Spalten-Pattern aus 4.2, mit `.flip` alternierend) → optional CTA-Section am Ende (siehe `.v6cu-cta` in `CustomizationPage.vue` als Vorlage).
3. Ausschließlich bestehende globale Klassen (`v6-eyebrow`, `v6-h1`, `v6-h2`, `v6-dot`, `v6-btn`, `v6-quiet`, `v6-card`, `v6-card-chips`) verwenden; seitenspezifisches CSS nur für Layout/Anordnung im `<style scoped>`-Block mit eigenem Klassenpräfix (z. B. `v6br-*` für Bugreport).
4. `v6-reveal` auf alle Text-/Bildblöcke, `initV6Reveals` + `initMagnetic` in `onMounted`/`onBeforeUnmount`.
5. `isDark = inject("isDark")` für themeabhängige Bild-Assets, falls Screenshots verwendet werden.
6. Route in `router.js` ergänzen: Lazy-Import, `withLocale(...)` mit `v6: true`, passendem `v6DimBg`/`v6NoBg` (siehe 6.1), `titleKey`/`descriptionKey`, plus `legacyRedirect("/<pfad>")`.
7. Nav-Eintrag ergänzen, falls die Seite in der Hauptnavigation erscheinen soll (`V6Shell.vue`: `v6-nav-links`, ggf. `v6-nav-menu`-Dropdown, und `MOBILE_LINKS`-Array für das Mobile-Menü).
8. Übersetzungstexte + SEO-Keys in allen vier `src/locales/*.json` ergänzen (Abschnitt 10).
9. Light- und Dark-Mode beider Sprachen visuell prüfen (`npm run dev`), Mobile-Breakpoints (900px/640px) testen.

---

## 13. Was bewusst NICHT Teil dieses Systems ist

- **`/v2`, `/v3`, `/v4`, `/v5`** — ältere, parallele Landing-Page-Prototypen mit eigener Design-Sprache (GSAP-Showcases, andere Fonts/Paletten). Nicht als Referenz für neue V6-Seiten verwenden; jeweils eigene Skills/Guidelines dokumentieren sie separat, falls an ihnen weitergearbeitet wird.
- **Tailwind-Utility-Klassen** — das V6-System ist fast vollständig handgeschriebenes CSS mit eigenen Tokens (`src/styles/v6.css` + `<style scoped>` pro Seite), nicht Tailwind-getrieben. Tailwind ist im Projekt vorhanden (ältere/Legacy-Bereiche), aber neue V6-Seiten folgen dem Custom-CSS-Muster der bestehenden V6-Seiten.
