<template>
  <div :class="[theme === 'light' ? 'min-h-screen bg-white text-gray-900' : 'min-h-screen bg-gray-900 text-white']">
    <AppNav
      :theme="theme"
      :navigation="navigation"
      brand-title="Katsumii"
      brand-subtitle="FAQ"
      :brand-href="baseUrl"
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
            Schreib uns jederzeit an support@katsumii.app - wir helfen dir schnell weiter.
          </p>
          <a
            href="mailto:support@katsumii.app"
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

const baseUrl = import.meta.env.BASE_URL

const navigation = [
  { name: "Overview", href: "#" },
  { name: "Back Home", href: baseUrl },
]

const faqItems = [
  {
    category: "License",
    question: "Ist Katsumii ein Abo oder eine Einmalzahlung?",
    answer: "Katsumii ist als One-Time-License gedacht. Du zahlst einmal und kannst die App lokal nutzen, ohne monatliche Gebuehren.",
  },
  {
    category: "Privacy",
    question: "Werden meine Trading-Daten in eine Cloud geladen?",
    answer: "Nein. Der Fokus liegt auf offline-first. Deine Daten bleiben lokal auf deinem Geraet.",
  },
  {
    category: "Usage",
    question: "Kann ich mehrere Prop- und Personal-Accounts verwalten?",
    answer: "Ja, genau dafuer ist Katsumii gebaut. Du kannst mehrere Accounts parallel organisieren und getrennt auswerten.",
  },
  {
    category: "Features",
    question: "Unterstuetzt die App Screenshots und Trade-Notizen?",
    answer: "Ja. Du kannst zu Trades Screenshots, Notizen, Setups, Fehler und Review-Eintraege dokumentieren.",
  },
  {
    category: "Updates",
    question: "Wie erhalte ich neue Versionen?",
    answer: "Neue Versionen werden ueber deine offiziellen Download-Kanaele bereitgestellt. Changelog und Hinweise sind im Resource-Bereich vorgesehen.",
  },
  {
    category: "Support",
    question: "Wie kann ich Support kontaktieren?",
    answer: "Direkt per E-Mail an support@katsumii.app. Beschreibe kurz dein Anliegen und idealerweise dein Setup fuer schnellere Hilfe.",
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


