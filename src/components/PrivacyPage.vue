<template>
  <div :class="[theme === 'light' ? 'relative overflow-x-hidden min-h-screen bg-slate-50 text-gray-900' : 'relative overflow-x-hidden min-h-screen bg-slate-950 text-slate-100']">
    <div class="k-bg" :class="theme === 'light' ? 'k-bg-light' : 'k-bg-dark'" aria-hidden="true">
      <div class="k-bg-gradient" />
      <svg class="k-bg-grid" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="hc-privacy" x="0" y="0" width="69.28" height="60" patternUnits="userSpaceOnUse">
            <path d="M34.64,0 L51.96,10 L51.96,30 L34.64,40 L17.32,30 L17.32,10 Z M0,0 L17.32,10 M17.32,30 L0,40 M51.96,10 L69.28,0 M69.28,40 L51.96,30 M34.64,40 L34.64,60 M0,40 L0,60" style="fill:none;stroke:var(--hc-stroke);stroke-width:1.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hc-privacy)"/>
      </svg>
      <div class="k-bg-band" />
    </div>
    <AppNav
      :theme="theme"
      :navigation="navigation"
      brand-title="Katsumii"
      brand-subtitle="Datenschutz"
      :brand-href="appHomePath"
      @toggle-theme="toggleTheme"
    />

    <section class="relative isolate px-6 pb-20 pt-28 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <p :class="['text-sm font-semibold tracking-[0.2em] uppercase', theme === 'light' ? 'text-teal-600' : 'text-teal-300']">
          Legal
        </p>
        <h1 :class="['mt-4 text-4xl font-semibold tracking-tight sm:text-6xl', theme === 'light' ? 'text-gray-900' : 'text-white']">
          Datenschutzerklarung
        </h1>
        <p :class="['mx-auto mt-6 max-w-2xl text-lg', theme === 'light' ? 'text-gray-600' : 'text-gray-300']">
          Informationen gemaess Art. 13 DSGVO zum Umgang mit deinen Daten auf katsumii.com.
        </p>
      </div>

      <div class="mx-auto mt-14 max-w-3xl space-y-4">

        <!-- Verantwortlicher -->
        <article :class="cardClass">
          <h2 :class="headingClass">1. Verantwortlicher</h2>
          <p :class="textClass">
            Verantwortlicher im Sinne der DSGVO ist:<br /><br />
            Frederik Morbe<br />
            E-Mail: <a href="mailto:info@katsumii.com" :class="linkClass">info@katsumii.com</a><br />
            Website: katsumii.com
          </p>
        </article>

        <!-- Hosting -->
        <article :class="cardClass">
          <h2 :class="headingClass">2. Hosting</h2>
          <p :class="textClass">
            Diese Website wird ueber einen externen Hosting-Anbieter betrieben. Beim Aufruf der Seite werden
            technisch notwendige Verbindungsdaten (IP-Adresse, Uhrzeit, aufgerufene Seite) kurzzeitig im
            Server-Log verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
            an einem sicheren und stabilen Betrieb).
          </p>
        </article>

        <!-- Umami Analytics -->
        <article :class="cardClass">
          <h2 :class="headingClass">3. Webanalyse mit Umami</h2>
          <p :class="textClass">
            Diese Website nutzt Umami, ein datenschutzfreundliches Analyse-Tool.
          </p>
          <ul :class="['mt-4 space-y-2 text-sm', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span><strong>Keine Cookies</strong> – Umami setzt keinerlei Cookies und benoetigt daher keine Cookie-Einwilligung.</span>
            </li>
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span><strong>Keine personenbezogenen Daten</strong> – IP-Adressen werden nicht gespeichert; es werden ausschliesslich anonymisierte Nutzungsstatistiken erhoben (z. B. Seitenaufrufe, Herkunftsland).</span>
            </li>
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span><strong>Kein Cross-Site-Tracking</strong> – Daten werden nicht mit anderen Websites oder Diensten verknuepft.</span>
            </li>
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span><strong>Kein Opt-out erforderlich</strong> – Da keine personenbezogenen Daten verarbeitet werden, ist eine Abmeldeoption nicht notwendig.</span>
            </li>
          </ul>
          <p :class="['mt-4 text-sm', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Verbesserung des Angebots
            bei gleichzeitig minimialer Datenverar­beitung).
          </p>
        </article>

        <!-- LemonSqueezy -->
        <article :class="cardClass">
          <h2 :class="headingClass">4. Zahlungsabwicklung ueber Lemon Squeezy</h2>
          <p :class="textClass">
            Kaufe werden ueber <strong>Lemon Squeezy</strong> (Lemon Squeezy, LLC, 2261 Market Street #5368,
            San Francisco, CA 94114, USA) abgewickelt. Lemon Squeezy fungiert als
            <strong>Merchant of Record</strong> – das bedeutet, dass Lemon Squeezy rechtlich als Verkaeufer
            auftritt und die gesamte Zahlungsverarbeitung, Rechnungsstellung sowie die steuerliche Abwicklung
            eigenverantwortlich uebernimmt.
          </p>
          <p :class="['mt-4 text-sm', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            Im Rahmen des Kaufvorgangs verarbeitet Lemon Squeezy die fuer die Transaktion erforderlichen
            Daten (z. B. Name, E-Mail-Adresse, Zahlungsdaten) in eigener Verantwortung. Katsumii erhaelt
            nach einem Kauf lediglich eine Bestaetigung (Kauf-ID, E-Mail-Adresse) zur Lizenzauslieferung.
          </p>
          <p :class="['mt-4 text-sm', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            Weitere Informationen zum Datenschutz bei Lemon Squeezy findest du unter:
            <a href="https://www.lemonsqueezy.com/privacy" target="_blank" rel="noopener noreferrer" :class="linkClass">
              lemonsqueezy.com/privacy
            </a>.
            Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfullung).
          </p>
        </article>

        <!-- Kontaktformular / E-Mail -->
        <article :class="cardClass">
          <h2 :class="headingClass">5. Kontaktaufnahme per E-Mail</h2>
          <p :class="textClass">
            Wenn du uns per E-Mail kontaktierst, werden deine Angaben (E-Mail-Adresse, Nachrichteninhalt)
            zur Bearbeitung deiner Anfrage gespeichert. Diese Daten geben wir nicht ohne deine Einwilligung
            weiter und loeschen sie, sobald die Anfrage abschliessend bearbeitet ist.
            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </article>

        <!-- Betroffenenrechte -->
        <article :class="cardClass">
          <h2 :class="headingClass">6. Deine Rechte</h2>
          <p :class="textClass">
            Nach der DSGVO stehen dir folgende Rechte zu:
          </p>
          <ul :class="['mt-4 space-y-2 text-sm', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            <li class="flex items-start gap-2"><span :class="dotClass" aria-hidden="true" /><span><strong>Auskunft</strong> (Art. 15) – Welche Daten wir ueber dich gespeichert haben.</span></li>
            <li class="flex items-start gap-2"><span :class="dotClass" aria-hidden="true" /><span><strong>Berichtigung</strong> (Art. 16) – Korrektur unrichtiger Daten.</span></li>
            <li class="flex items-start gap-2"><span :class="dotClass" aria-hidden="true" /><span><strong>Loeschung</strong> (Art. 17) – Entfernung deiner Daten, soweit keine gesetzliche Aufbewahrungspflicht besteht.</span></li>
            <li class="flex items-start gap-2"><span :class="dotClass" aria-hidden="true" /><span><strong>Einschraenkung</strong> (Art. 18) – Begrenzung der Verarbeitung in bestimmten Faellen.</span></li>
            <li class="flex items-start gap-2"><span :class="dotClass" aria-hidden="true" /><span><strong>Widerspruch</strong> (Art. 21) – Widerspruch gegen Verarbeitungen auf Basis berechtigten Interesses.</span></li>
            <li class="flex items-start gap-2"><span :class="dotClass" aria-hidden="true" /><span><strong>Beschwerde</strong> – Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehoerde zu beschweren.</span></li>
          </ul>
          <p :class="['mt-4 text-sm', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            Fur Anfragen wende dich an:
            <a href="mailto:info@katsumii.com" :class="linkClass">info@katsumii.com</a>
          </p>
        </article>

        <!-- Aktualitaet -->
        <article :class="cardClass">
          <h2 :class="headingClass">7. Aktualitat dieser Erklarung</h2>
          <p :class="textClass">
            Diese Datenschutzerklarung ist aktuell gueltig und datiert vom Mai 2025. Wir behalten uns vor,
            sie bei Anderungen unserer Dienste oder bei neuen gesetzlichen Anforderungen anzupassen.
          </p>
        </article>

      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue"
import AppNav from "./AppNav.vue"
import { appHomePath, pagePath } from "../utils/routes.js"

const baseUrl = import.meta.env.BASE_URL

const navigation = [
  { name: "FAQ", href: pagePath("faq") },
  { name: "Impressum", href: pagePath("impressum") },
  { name: "Zuruck", href: appHomePath },
]

const theme = ref("light")

const applyTheme = (value) => {
  theme.value = value
  localStorage.setItem("katsumii-theme", value)
}

const toggleTheme = () => {
  applyTheme(theme.value === "dark" ? "light" : "dark")
}

onMounted(() => {
  const savedTheme = localStorage.getItem("katsumii-theme")
  if (savedTheme === "light" || savedTheme === "dark") {
    theme.value = savedTheme
  }
})

watch(theme, (value) => {
  document.documentElement.classList.toggle("dark", value === "dark")
})

const cardClass = computed(() => [
  "rounded-2xl border p-6 backdrop-blur sm:p-8",
  theme.value === "light" ? "border-gray-200 bg-white/85" : "border-white/10 bg-gray-800/70",
])

const headingClass = computed(() => [
  "text-sm font-semibold uppercase tracking-[0.12em]",
  theme.value === "light" ? "text-teal-600" : "text-teal-300",
])

const textClass = computed(() => [
  "mt-3 text-sm leading-7",
  theme.value === "light" ? "text-gray-700" : "text-gray-300",
])

const linkClass = computed(() => [
  "underline underline-offset-2 transition-colors",
  theme.value === "light" ? "text-teal-600 hover:text-teal-500" : "text-cyan-400 hover:text-cyan-300",
])

const dotClass = computed(() => [
  "mt-1.5 h-1.5 w-1.5 flex-none rounded-full",
  theme.value === "light" ? "bg-teal-500" : "bg-cyan-400",
])
</script>

<style scoped>
.k-bg {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}
.k-bg-dark { --orb-a: rgba(59,130,246,0.28); --orb-b: rgba(34,211,238,0.22); --hc-stroke: rgba(34,211,238,0.02); }
.k-bg-light { --orb-a: rgba(6,182,212,0.16); --orb-b: rgba(59,130,246,0.12); --hc-stroke: rgba(8,145,178,0.04); }
.k-bg-gradient {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 70% 55% at 8% 18%, var(--orb-a), transparent 60%),
    radial-gradient(ellipse 55% 45% at 88% 80%, var(--orb-b), transparent 55%);
}
.k-bg-grid {
  position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.8;
  mask-image: linear-gradient(180deg, transparent 0%, black 12%, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, black 12%, black 80%, transparent 100%);
}
.k-bg-band {
  position: absolute; top: -30%; right: 0; width: 52%; height: 160%;
  background: linear-gradient(to bottom, transparent, rgba(34,211,238,0.018) 40%, transparent);
  transform: skewX(-6deg); border-left: 1px solid rgba(34,211,238,0.055); transform-origin: top right;
}
</style>
