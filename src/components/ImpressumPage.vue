<template>
  <div :class="[theme === 'light' ? 'min-h-screen bg-white text-gray-900' : 'min-h-screen bg-gray-900 text-white']">
    <AppNav
      :theme="theme"
      :navigation="navigation"
      brand-title="Katsumii"
      brand-subtitle="Impressum"
      :brand-href="baseUrl"
      @toggle-theme="toggleTheme"
    />

    <section class="relative isolate px-6 pb-20 pt-28 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <p :class="['text-sm font-semibold tracking-[0.2em] uppercase', theme === 'light' ? 'text-teal-600' : 'text-teal-300']">
          Legal
        </p>
        <h1
          :class="[
            'mt-4 text-4xl font-semibold tracking-tight sm:text-6xl',
            theme === 'light' ? 'text-gray-900' : 'text-white'
          ]"
        >
          Impressum
        </h1>
        <p :class="['mx-auto mt-6 max-w-2xl text-lg', theme === 'light' ? 'text-gray-600' : 'text-gray-300']">
          Anbieterkennzeichnung gemaess 5 TMG. Bitte ersetze die Platzhalter mit deinen echten Firmendaten.
        </p>
      </div>

      <div class="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2">
        <article
          :class="[
            'rounded-2xl border p-6 backdrop-blur sm:p-7',
            theme === 'light' ? 'border-gray-200 bg-white/85' : 'border-white/10 bg-gray-800/70'
          ]"
        >
          <h2 :class="['text-sm font-semibold uppercase tracking-[0.12em]', theme === 'light' ? 'text-teal-600' : 'text-teal-300']">Anbieter</h2>
          <p :class="['mt-3 leading-7', theme === 'light' ? 'text-gray-700' : 'text-gray-300']">
            Katsumii GmbH
            <br />
            Max Mustermann
            <br />
            Musterstrasse 12
            <br />
            12345 Musterstadt
            <br />
            Deutschland
          </p>
        </article>

        <article
          :class="[
            'rounded-2xl border p-6 backdrop-blur sm:p-7',
            theme === 'light' ? 'border-gray-200 bg-white/85' : 'border-white/10 bg-gray-800/70'
          ]"
        >
          <h2 :class="['text-sm font-semibold uppercase tracking-[0.12em]', theme === 'light' ? 'text-teal-600' : 'text-teal-300']">Kontakt</h2>
          <p :class="['mt-3 leading-7', theme === 'light' ? 'text-gray-700' : 'text-gray-300']">
            E-Mail: support@katsumii.app
            <br />
            Telefon: +49 000 0000000
            <br />
            Website: katsumii.app
          </p>
        </article>

        <article
          :class="[
            'rounded-2xl border p-6 backdrop-blur sm:p-7',
            theme === 'light' ? 'border-gray-200 bg-white/85' : 'border-white/10 bg-gray-800/70'
          ]"
        >
          <h2 :class="['text-sm font-semibold uppercase tracking-[0.12em]', theme === 'light' ? 'text-teal-600' : 'text-teal-300']">Vertretungsberechtigt</h2>
          <p :class="['mt-3 leading-7', theme === 'light' ? 'text-gray-700' : 'text-gray-300']">
            Geschaeftsfuehrer: Max Mustermann
          </p>
        </article>

        <article
          :class="[
            'rounded-2xl border p-6 backdrop-blur sm:p-7',
            theme === 'light' ? 'border-gray-200 bg-white/85' : 'border-white/10 bg-gray-800/70'
          ]"
        >
          <h2 :class="['text-sm font-semibold uppercase tracking-[0.12em]', theme === 'light' ? 'text-teal-600' : 'text-teal-300']">Registereintrag</h2>
          <p :class="['mt-3 leading-7', theme === 'light' ? 'text-gray-700' : 'text-gray-300']">
            Handelsregister: HRB 123456
            <br />
            Registergericht: Amtsgericht Musterstadt
            <br />
            USt-IdNr.: DE123456789
          </p>
        </article>
      </div>

      <div class="mx-auto mt-4 max-w-5xl">
        <article
          :class="[
            'rounded-2xl border p-6 backdrop-blur sm:p-7',
            theme === 'light' ? 'border-gray-200 bg-white/85' : 'border-white/10 bg-gray-800/70'
          ]"
        >
          <h2 :class="['text-sm font-semibold uppercase tracking-[0.12em]', theme === 'light' ? 'text-teal-600' : 'text-teal-300']">Inhaltlich verantwortlich</h2>
          <p :class="['mt-3 leading-7', theme === 'light' ? 'text-gray-700' : 'text-gray-300']">
            Max Mustermann, Anschrift wie oben.
          </p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue"
import AppNav from "./AppNav.vue"

const baseUrl = import.meta.env.BASE_URL

const navigation = [
  { name: "FAQ", href: `${baseUrl}?page=faq` },
  { name: "Back Home", href: baseUrl },
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


