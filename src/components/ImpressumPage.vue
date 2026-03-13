<template>
  <div :class="[theme === 'light' ? 'relative overflow-x-hidden min-h-screen bg-slate-50 text-gray-900' : 'relative overflow-x-hidden min-h-screen bg-slate-950 text-slate-100']">
    <div class="k-bg" :class="theme === 'light' ? 'k-bg-light' : 'k-bg-dark'" aria-hidden="true">
      <div class="k-bg-gradient" />
      <svg class="k-bg-grid" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="hc-impressum" x="0" y="0" width="69.28" height="60" patternUnits="userSpaceOnUse">
            <path d="M34.64,0 L51.96,10 L51.96,30 L34.64,40 L17.32,30 L17.32,10 Z M0,0 L17.32,10 M17.32,30 L0,40 M51.96,10 L69.28,0 M69.28,40 L51.96,30 M34.64,40 L34.64,60 M0,40 L0,60" style="fill:none;stroke:var(--hc-stroke);stroke-width:1.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hc-impressum)"/>
      </svg>
      <div class="k-bg-band" />
    </div>
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

