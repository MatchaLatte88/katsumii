<template>
  <div :class="[theme === 'light' ? 'relative overflow-x-hidden min-h-screen bg-slate-50 text-gray-900' : 'relative overflow-x-hidden min-h-screen bg-slate-950 text-slate-100']">
    <div class="k-bg" :class="theme === 'light' ? 'k-bg-light' : 'k-bg-dark'" aria-hidden="true">
      <div class="k-bg-gradient" />
      <svg class="k-bg-grid" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="hc-faq" x="0" y="0" width="69.28" height="60" patternUnits="userSpaceOnUse">
            <path d="M34.64,0 L51.96,10 L51.96,30 L34.64,40 L17.32,30 L17.32,10 Z M0,0 L17.32,10 M17.32,30 L0,40 M51.96,10 L69.28,0 M69.28,40 L51.96,30 M34.64,40 L34.64,60 M0,40 L0,60" style="fill:none;stroke:var(--hc-stroke);stroke-width:1.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hc-faq)"/>
      </svg>
      <div class="k-bg-band" />
    </div>
    <AppNav
      :theme="theme"
      :navigation="navigation"
      brand-title="Katsumii"
      brand-subtitle="FAQ"
      :brand-href="appHomePath"
      @toggle-theme="toggleTheme"
    />

    <section class="relative isolate px-6 pb-20 pt-28 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <p :class="['text-sm font-semibold tracking-[0.2em] uppercase', theme === 'light' ? 'text-teal-600' : 'text-teal-300']">
          Support
        </p>
        <h1
          :class="[
            'mt-4 text-4xl font-semibold tracking-tight sm:text-6xl',
            theme === 'light' ? 'text-gray-900' : 'text-white'
          ]"
        >
          Frequently Asked Questions
        </h1>
        <p :class="['mx-auto mt-6 max-w-2xl text-lg', theme === 'light' ? 'text-gray-600' : 'text-gray-300']">
          Alles Wichtige zu Lizenz, Daten, Updates und Nutzung von Katsumii in einer klaren Uebersicht.
        </p>
      </div>

      <div class="mx-auto mt-14 max-w-4xl space-y-4">
        <Disclosure v-for="item in faqItems" :key="item.question" v-slot="{ open }">
          <div
            :class="[
              'rounded-2xl border backdrop-blur transition-all duration-300',
              theme === 'light'
                ? 'border-gray-200 bg-white/85 hover:shadow-[0_10px_30px_-20px_rgba(15,23,42,0.35)]'
                : 'border-white/10 bg-gray-800/70 hover:bg-gray-800/85'
            ]"
          >
            <DisclosureButton class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5">
              <div>
                <p :class="['text-xs font-semibold uppercase tracking-[0.14em]', theme === 'light' ? 'text-teal-600' : 'text-teal-300']">
                  {{ item.category }}
                </p>
                <h2 :class="['mt-1 text-lg font-semibold', theme === 'light' ? 'text-gray-900' : 'text-white']">
                  {{ item.question }}
                </h2>
              </div>
              <ChevronDownIcon
                :class="[
                  'size-5 shrink-0 transition-transform duration-300',
                  open ? 'rotate-180' : 'rotate-0',
                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                ]"
              />
            </DisclosureButton>

            <DisclosurePanel>
              <div :class="['px-5 pb-5 sm:px-6 sm:pb-6', theme === 'light' ? 'text-gray-600' : 'text-gray-300']">
                {{ item.answer }}
              </div>
            </DisclosurePanel>
          </div>
        </Disclosure>
      </div>

      <div class="mx-auto mt-14 max-w-4xl">
        <div
          :class="[
            'rounded-2xl border p-6 text-center sm:p-8',
            theme === 'light' ? 'border-gray-200 bg-gray-50/90' : 'border-white/10 bg-white/5'
          ]"
        >
          <h3 :class="['text-xl font-semibold', theme === 'light' ? 'text-gray-900' : 'text-white']">Noch eine Frage offen?</h3>
          <p :class="['mt-2', theme === 'light' ? 'text-gray-600' : 'text-gray-300']">
            Schreib uns jederzeit an info@katsumii.com - wir helfen dir schnell weiter.
          </p>
          <a
            href="mailto:info@katsumii.com"
            :class="[
              'mt-5 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5',
              theme === 'light' ? 'bg-teal-600 text-white hover:bg-teal-500' : 'bg-teal-500 text-gray-950 hover:bg-teal-400'
            ]"
          >
            Support kontaktieren
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue"
import { ChevronDownIcon } from "@heroicons/vue/24/outline"
import AppNav from "./AppNav.vue"
import { appHomePath, pagePath } from "../utils/routes.js"

const baseUrl = import.meta.env.BASE_URL

const navigation = [
  { name: "Manual", href: pagePath("manual") },
  { name: "Back Home", href: appHomePath },
]

const faqItems = [
  {
    category: "Allgemein",
    question: "Was ist Katsumii?",
    answer: "Katsumii ist ein Trading Journal zum Erfassen von Trades, Accounts, Setups, Screenshots, Journalnotizen, Performance-Statistiken und Reports.",
  },
  {
    category: "Lizenz",
    question: "Ist Katsumii ein Abo oder eine Einmalzahlung?",
    answer: "Katsumii ist als One-Time-License gedacht. Du zahlst einmal und kannst die App lokal nutzen, ohne monatliche Gebuehren.",
  },
  {
    category: "Nutzung",
    question: "Welche Account-Typen werden unterstuetzt?",
    answer: "Katsumii unterstuetzt Funded Accounts, Challenge-/Demo-Accounts und persoenliche Accounts. Jeder Modus fuehrt eigene Accounts und Trades getrennt voneinander.",
  },
  {
    category: "Prop Trading",
    question: "Kann ich Prop-Firm-Challenges tracken?",
    answer: "Ja. Challenge-Accounts koennen Profit-Targets, Max-Loss, Daily-Loss-Limits, Trailing Drawdown, Activity Requirements, Consistency Rules, Zeitlimits und weitere Prop-Firm-Regeln abbilden.",
  },
  {
    category: "Datenschutz",
    question: "Wo werden meine Daten gespeichert?",
    answer: "Alle Daten liegen lokal auf deinem Geraet. Das Backend nutzt eine lokale SQLite-Datenbank, Bilder werden in lokalen Upload-Ordnern gespeichert.",
  },
  {
    category: "Datenschutz",
    question: "Braucht Katsumii eine Internetverbindung?",
    answer: "Nein. Journal, Accounts, Trades und Reports sind vollstaendig lokale Features. Deine Kerndaten sind jederzeit offline verfuegbar.",
  },
  {
    category: "Features",
    question: "Welche Informationen kann ich zu einem Trade speichern?",
    answer: "Du kannst P&L, Risiko, Richtung, Groesse, Asset, Setup, geplantes R:R, Pips/Punkte, Entry/Exit, Zeiten, Duration, Fees, Mood, Mistakes, Tags, Timeframe, Farbe, Links, Notizen und bis zu vier Screenshots speichern.",
  },
  {
    category: "Import / Export",
    question: "Kann ich Trades aus CSV importieren?",
    answer: "Ja. Der CSV-Import-Wizard fuehrt durch Upload, Spalten-Mapping, Vorschau, Duplikat-Pruefung und finalen Import. Vorgefertigte Presets fuer Tradovate, NinjaTrader, Rithmic, TopstepX und Interactive Brokers sind enthalten.",
  },
  {
    category: "Statistiken",
    question: "Welche Statistiken berechnet Katsumii?",
    answer: "P&L, Win Rate, Profit Factor, Effective R:R, Planned R:R, Expectancy, Trade Count, Average Win/Loss, Best/Worst Trade, Streaks, Winning Days, Drawdown Distance, Daily Loss Distance und Consistency-Metriken.",
  },
  {
    category: "Features",
    question: "Kann ich Reports erstellen?",
    answer: "Ja. Katsumii enthaelt einen Strategy Report und einen HTML Performance Report – ein offline-faehiges Dokument mit Equity Curve, Calendar Heatmap und Auswertungen nach Tag, Session, Setup und weiteren Filtern.",
  },
  {
    category: "Daten",
    question: "Werden Backups unterstuetzt?",
    answer: "Ja. Katsumii unterstuetzt Backup-Export und -Import, Wiederherstellung des letzten Backups, benutzerdefinierte Backup-Pfade, Retention-Einstellungen und automatische Backups (woechentlich oder monatlich).",
  },
  {
    category: "Support",
    question: "Wie kann ich Support kontaktieren?",
    answer: "Direkt per E-Mail an info@katsumii.com. Beschreibe kurz dein Anliegen und idealerweise dein Setup fuer schnellere Hilfe.",
  },
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
