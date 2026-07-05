<template>
  <div :class="[!isDark ? 'relative overflow-x-hidden min-h-screen bg-slate-50 text-gray-900' : 'relative overflow-x-hidden min-h-screen bg-slate-950 text-slate-100']">
    <div class="k-bg" :class="!isDark ? 'k-bg-light' : 'k-bg-dark'" aria-hidden="true">
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
      :navigation="navigation"
      :brand-title="t('common.brandTitle')"
      :brand-subtitle="t('contactPage.brandSubtitle')"
      :brand-href="pagePath('app')"
    />

    <section class="relative isolate px-6 pb-24 pt-28 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <p :class="['text-sm font-semibold tracking-[0.2em] uppercase', !isDark ? 'text-teal-600' : 'text-teal-300']">
          {{ t('contactPage.hero.label') }}
        </p>
        <h1 :class="['mt-4 text-4xl font-semibold tracking-tight sm:text-6xl', !isDark ? 'text-gray-900' : 'text-white']">
          {{ t('contactPage.hero.title') }}
        </h1>
        <p :class="['mx-auto mt-6 max-w-2xl text-lg', !isDark ? 'text-gray-600' : 'text-gray-300']">
          {{ t('contactPage.hero.description') }}
        </p>
      </div>

      <div class="mx-auto mt-14 max-w-2xl">
        <!-- Success state -->
        <div
          v-if="submitted"
          :class="['rounded-2xl border p-8 text-center backdrop-blur', !isDark ? 'border-teal-200 bg-teal-50/80' : 'border-teal-400/20 bg-teal-400/8']"
        >
          <div :class="['mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full', !isDark ? 'bg-teal-100' : 'bg-teal-400/15']">
            <CheckIcon :class="['h-6 w-6', !isDark ? 'text-teal-600' : 'text-teal-300']" />
          </div>
          <h2 :class="['text-lg font-semibold', !isDark ? 'text-gray-900' : 'text-slate-100']">{{ t('contactPage.success.title') }}</h2>
          <p :class="['mt-2 text-sm', !isDark ? 'text-gray-600' : 'text-slate-300']">
            {{ t('contactPage.success.description') }}
            <a href="mailto:info@katsumii.com" :class="linkClass">{{ t('contactPage.success.directLink') }}</a>.
          </p>
          <button
            @click="reset"
            :class="['mt-6 rounded-full border px-5 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5', !isDark ? 'border-gray-300 text-gray-700 hover:bg-gray-50' : 'border-blue-400/30 text-slate-200 hover:bg-slate-800/60']"
          >
            {{ t('contactPage.success.reset') }}
          </button>
        </div>

        <!-- Contact form -->
        <form
          v-else
          @submit.prevent="handleSubmit"
          :class="['rounded-2xl border p-6 backdrop-blur sm:p-8', !isDark ? 'border-gray-200 bg-white/85' : 'border-white/10 bg-gray-800/70']"
        >
          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label :for="'contact-name'" :class="labelClass">{{ t('contactPage.form.name') }}</label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                required
                autocomplete="name"
                :placeholder="t('contactPage.form.namePlaceholder')"
                :class="inputClass"
              />
            </div>
            <div>
              <label :for="'contact-email'" :class="labelClass">{{ t('contactPage.form.email') }}</label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                required
                autocomplete="email"
                :placeholder="t('contactPage.form.emailPlaceholder')"
                :class="inputClass"
              />
            </div>
          </div>

          <div class="mt-5">
            <label :for="'contact-subject'" :class="labelClass">{{ t('contactPage.form.subject') }}</label>
            <input
              id="contact-subject"
              v-model="form.subject"
              type="text"
              required
              :placeholder="t('contactPage.form.subjectPlaceholder')"
              :class="inputClass"
            />
          </div>

          <div class="mt-5">
            <label :for="'contact-message'" :class="labelClass">{{ t('contactPage.form.message') }}</label>
            <textarea
              id="contact-message"
              v-model="form.message"
              required
              rows="6"
              :placeholder="t('contactPage.form.messagePlaceholder')"
              :class="[inputClass, 'resize-none']"
            />
          </div>

          <div class="mt-6 flex items-center justify-between gap-4">
            <p :class="['text-xs', !isDark ? 'text-gray-400' : 'text-slate-500']">
              {{ t('contactPage.form.mailHint') }} <strong>info@katsumii.com</strong>
            </p>
            <button
              type="submit"
              :class="[
                'inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5',
                !isDark
                  ? 'bg-teal-600 text-white shadow-[0_12px_32px_-16px_rgba(13,148,136,0.8)] hover:bg-teal-500'
                  : 'bg-cyan-300 text-slate-950 shadow-[0_12px_32px_-16px_rgba(34,211,238,0.7)] hover:bg-cyan-200'
              ]"
            >
              {{ t('contactPage.form.submit') }}
            </button>
          </div>
        </form>

        <!-- Direct email fallback -->
        <p :class="['mt-8 text-center text-sm', !isDark ? 'text-gray-500' : 'text-slate-400']">
          {{ t('contactPage.direct.prefix') }}
          <a href="mailto:info@katsumii.com" :class="linkClass">info@katsumii.com</a>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, inject, reactive, ref } from "vue"
import { useI18n } from "vue-i18n"
import { CheckIcon } from "@heroicons/vue/20/solid"
import AppNav from "./AppNav.vue"
import { useSiteNavigation } from "../composables/useSiteNavigation.js"
import { pagePath } from "../utils/routes.js"

const { t } = useI18n()

const navigation = useSiteNavigation()

const isDark = inject("isDark")
const submitted = ref(false)

const form = reactive({ name: "", email: "", subject: "", message: "" })

const handleSubmit = () => {
  const subject = encodeURIComponent(form.subject || t("contactPage.mailtoFallbackSubject"))
  const body = encodeURIComponent(
    `${t("contactPage.mailtoName")}: ${form.name}\n${t("contactPage.mailtoEmail")}: ${form.email}\n\n${form.message}`
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
  !isDark.value ? "text-gray-600" : "text-slate-400",
])

const inputClass = computed(() => [
  "mt-1 block w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors duration-200",
  "focus:ring-2",
  !isDark.value
    ? "border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-teal-400 focus:ring-teal-100"
    : "border-white/10 bg-slate-900/80 text-slate-100 placeholder-slate-500 focus:border-cyan-400/50 focus:ring-cyan-400/10",
])

const linkClass = computed(() => [
  "underline underline-offset-2 transition-colors",
  !isDark.value ? "text-teal-600 hover:text-teal-500" : "text-cyan-400 hover:text-cyan-300",
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
