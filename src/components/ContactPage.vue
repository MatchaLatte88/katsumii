<template>
  <div :class="[theme === 'light' ? 'relative overflow-x-hidden min-h-screen bg-slate-50 text-gray-900' : 'relative overflow-x-hidden min-h-screen bg-slate-950 text-slate-100']">
    <div class="k-bg" :class="theme === 'light' ? 'k-bg-light' : 'k-bg-dark'" aria-hidden="true">
      <div class="k-bg-gradient" />
      <svg class="k-bg-grid" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="hc-contact" x="0" y="0" width="69.28" height="60" patternUnits="userSpaceOnUse">
            <path d="M34.64,0 L51.96,10 L51.96,30 L34.64,40 L17.32,30 L17.32,10 Z M0,0 L17.32,10 M17.32,30 L0,40 M51.96,10 L69.28,0 M69.28,40 L51.96,30 M34.64,40 L34.64,60 M0,40 L0,60" style="fill:none;stroke:var(--hc-stroke);stroke-width:1.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hc-contact)"/>
      </svg>
      <div class="k-bg-band" />
    </div>

    <AppNav
      :theme="theme"
      :navigation="navigation"
      brand-title="Katsumii"
      brand-subtitle="Contact"
      :brand-href="appHomePath"
      @toggle-theme="toggleTheme"
    />

    <section class="relative isolate px-6 pb-24 pt-28 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <p :class="['text-sm font-semibold tracking-[0.2em] uppercase', theme === 'light' ? 'text-teal-600' : 'text-teal-300']">
          Get in touch
        </p>
        <h1 :class="['mt-4 text-4xl font-semibold tracking-tight sm:text-6xl', theme === 'light' ? 'text-gray-900' : 'text-white']">
          Contact Us
        </h1>
        <p :class="['mx-auto mt-6 max-w-2xl text-lg', theme === 'light' ? 'text-gray-600' : 'text-gray-300']">
          Questions about the license, the app, or your workflow? We're happy to help — usually within 1–2 business days.
        </p>
      </div>

      <div class="mx-auto mt-14 max-w-2xl">
        <!-- Success state -->
        <div
          v-if="submitted"
          :class="['rounded-2xl border p-8 text-center backdrop-blur', theme === 'light' ? 'border-teal-200 bg-teal-50/80' : 'border-teal-400/20 bg-teal-400/8']"
        >
          <div :class="['mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full', theme === 'light' ? 'bg-teal-100' : 'bg-teal-400/15']">
            <CheckIcon :class="['h-6 w-6', theme === 'light' ? 'text-teal-600' : 'text-teal-300']" />
          </div>
          <h2 :class="['text-lg font-semibold', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">Message sent!</h2>
          <p :class="['mt-2 text-sm', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">
            Your email client should have opened with your message pre-filled. If nothing happened,
            <a href="mailto:info@katsumii.com" :class="linkClass">send us an email directly</a>.
          </p>
          <button
            @click="reset"
            :class="['mt-6 rounded-full border px-5 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5', theme === 'light' ? 'border-gray-300 text-gray-700 hover:bg-gray-50' : 'border-blue-400/30 text-slate-200 hover:bg-slate-800/60']"
          >
            Send another message
          </button>
        </div>

        <!-- Contact form -->
        <form
          v-else
          @submit.prevent="handleSubmit"
          :class="['rounded-2xl border p-6 backdrop-blur sm:p-8', theme === 'light' ? 'border-gray-200 bg-white/85' : 'border-white/10 bg-gray-800/70']"
        >
          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label :for="'contact-name'" :class="labelClass">Name</label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                required
                autocomplete="name"
                placeholder="Your name"
                :class="inputClass"
              />
            </div>
            <div>
              <label :for="'contact-email'" :class="labelClass">Email</label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                required
                autocomplete="email"
                placeholder="you@example.com"
                :class="inputClass"
              />
            </div>
          </div>

          <div class="mt-5">
            <label :for="'contact-subject'" :class="labelClass">Subject</label>
            <input
              id="contact-subject"
              v-model="form.subject"
              type="text"
              required
              placeholder="e.g. License question"
              :class="inputClass"
            />
          </div>

          <div class="mt-5">
            <label :for="'contact-message'" :class="labelClass">Message</label>
            <textarea
              id="contact-message"
              v-model="form.message"
              required
              rows="6"
              placeholder="Describe your question or issue..."
              :class="[inputClass, 'resize-none']"
            />
          </div>

          <div class="mt-6 flex items-center justify-between gap-4">
            <p :class="['text-xs', theme === 'light' ? 'text-gray-400' : 'text-slate-500']">
              Sends via your email client to <strong>info@katsumii.com</strong>
            </p>
            <button
              type="submit"
              :class="[
                'inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5',
                theme === 'light'
                  ? 'bg-teal-600 text-white shadow-[0_12px_32px_-16px_rgba(13,148,136,0.8)] hover:bg-teal-500'
                  : 'bg-cyan-300 text-slate-950 shadow-[0_12px_32px_-16px_rgba(34,211,238,0.7)] hover:bg-cyan-200'
              ]"
            >
              Send Message
            </button>
          </div>
        </form>

        <!-- Direct email fallback -->
        <p :class="['mt-8 text-center text-sm', theme === 'light' ? 'text-gray-500' : 'text-slate-400']">
          Prefer to write directly?
          <a href="mailto:info@katsumii.com" :class="linkClass">info@katsumii.com</a>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue"
import { CheckIcon } from "@heroicons/vue/20/solid"
import AppNav from "./AppNav.vue"
import { appHomePath, pagePath } from "../utils/routes.js"

const baseUrl = import.meta.env.BASE_URL

const navigation = [
  { name: "FAQ", href: pagePath("faq") },
  { name: "Imprint", href: pagePath("impressum") },
  { name: "Back", href: appHomePath },
]

const theme = ref("light")
const submitted = ref(false)

const form = reactive({ name: "", email: "", subject: "", message: "" })

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

const handleSubmit = () => {
  const subject = encodeURIComponent(form.subject || "Contact from katsumii.com")
  const body = encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
  )
  window.location.href = `mailto:info@katsumii.com?subject=${subject}&body=${body}`
  submitted.value = true
}

const reset = () => {
  form.name = ""
  form.email = ""
  form.subject = ""
  form.message = ""
  submitted.value = false
}

const labelClass = computed(() => [
  "mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em]",
  theme.value === "light" ? "text-gray-600" : "text-slate-400",
])

const inputClass = computed(() => [
  "mt-1 block w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors duration-200",
  "focus:ring-2",
  theme.value === "light"
    ? "border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-teal-400 focus:ring-teal-100"
    : "border-white/10 bg-slate-900/80 text-slate-100 placeholder-slate-500 focus:border-cyan-400/50 focus:ring-cyan-400/10",
])

const linkClass = computed(() => [
  "underline underline-offset-2 transition-colors",
  theme.value === "light" ? "text-teal-600 hover:text-teal-500" : "text-cyan-400 hover:text-cyan-300",
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
