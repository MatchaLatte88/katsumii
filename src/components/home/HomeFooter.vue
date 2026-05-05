<template>
  <footer
    class="relative overflow-hidden border-t"
    :class="theme === 'light' ? 'border-gray-200/90 bg-white/82' : 'border-cyan-300/16 bg-slate-950/92'"
  >
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-px"
      :class="theme === 'light' ? 'hidden' : 'bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent'"
    />

    <div class="mx-auto max-w-7xl px-6 py-14 lg:px-10">
      <div
        class="reveal k-main-tile k-glass relative overflow-hidden border p-6 sm:p-8"
        :class="theme === 'light' ? 'border-gray-200/85 bg-white/86 shadow-[0_24px_80px_-50px_rgba(15,23,42,0.28)]' : 'border-cyan-300/16 bg-slate-900/70 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.8)]'"
      >
        <div
          class="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full blur-3xl"
          :class="theme === 'light' ? 'hidden' : 'bg-cyan-400/16'"
        />

        <div class="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr]">
          <div>
            <div class="flex items-center gap-3">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl border"
                :class="theme === 'light' ? 'border-teal-200 bg-teal-50' : 'border-cyan-300/20 bg-slate-950/70'"
              >
                <img :src="assetUrl('logo.png')" alt="Katsumii logo" class="h-8 w-8 object-contain" />
              </div>
              <div>
                <p :class="['font-display text-xl font-semibold tracking-tight', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">Katsumii</p>
                <p :class="['text-xs uppercase tracking-[0.18em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">{{ t('footer.tagline') }}</p>
              </div>
            </div>

            <p :class="['mt-5 max-w-md text-sm leading-relaxed', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">
              {{ t('footer.description') }}
            </p>

            <div class="mt-6 flex flex-wrap gap-3">
              <span
                v-for="item in footerHighlights"
                :key="item"
                :class="[
                  'rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]',
                  theme === 'light' ? 'border-teal-200 bg-teal-50 text-teal-700' : 'border-cyan-300/20 bg-cyan-400/10 text-cyan-200'
                ]"
              >
                {{ item }}
              </span>
            </div>
          </div>

          <div>
            <p :class="['text-sm font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">{{ t('footer.product') }}</p>
            <div class="mt-5 space-y-3">
              <a
                v-for="item in footerProductLinks"
                :key="item.name"
                :href="item.href"
                :class="[
                  'block text-sm transition-colors duration-300',
                  theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-slate-400 hover:text-cyan-200'
                ]"
              >
                {{ item.name }}
              </a>
            </div>
          </div>

          <div>
            <p :class="['text-sm font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">{{ t('footer.company') }}</p>
            <div class="mt-5 space-y-3">
              <a
                v-for="item in footerCompanyLinks"
                :key="item.name"
                :href="item.href"
                :target="linkTarget(item.href)"
                :rel="linkRel(item.href)"
                :class="[
                  'block text-sm transition-colors duration-300',
                  theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-slate-400 hover:text-cyan-200'
                ]"
              >
                {{ item.name }}
              </a>
            </div>
          </div>

          <div>
            <div
              class="rounded-2xl border p-5"
              :class="theme === 'light' ? 'border-gray-200 bg-gray-50/90' : 'border-blue-400/20 bg-slate-950/70'"
            >
              <p :class="['text-sm font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">{{ t('footer.support.label') }}</p>
              <p :class="['mt-3 text-sm leading-relaxed', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">
                {{ t('footer.support.description') }}
              </p>
              <a
                href="mailto:info@katsumii.com"
                class="mt-5 inline-flex rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                :class="theme === 'light' ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-cyan-300 text-slate-950 hover:bg-cyan-200'"
              >
                {{ t('footer.support.contact') }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        class="reveal mt-8 flex flex-col gap-4 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between"
        :class="theme === 'light' ? 'border-gray-200 text-gray-500' : 'border-blue-400/15 text-slate-500'"
      >
        <p>
          {{ t('footer.copyright', { year }) }}
        </p>
        <div class="flex flex-wrap gap-x-5 gap-y-2">
          <a
            v-for="item in footerLegalLinks"
            :key="item.name"
            :href="item.href"
            :class="theme === 'light' ? 'transition-colors hover:text-gray-900' : 'transition-colors hover:text-cyan-200'"
          >
            {{ item.name }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { pagePath } from "../../utils/routes.js"

const props = defineProps({
  theme: { type: String, required: true },
  assetUrl: { type: Function, required: true },
  checkoutUrl: { type: String, required: true },
  linkTarget: { type: Function, required: true },
  linkRel: { type: Function, required: true },
})

const { t, tm } = useI18n()
const year = computed(() => new Date().getFullYear())
const footerHighlights = computed(() => tm('footer.highlights'))

const footerProductLinks = computed(() => [
  { name: tm('footer.productLinks')[0], href: "#features" },
  { name: tm('footer.productLinks')[1], href: "#showcase" },
  { name: tm('footer.productLinks')[2], href: pagePath("pricing") },
  { name: tm('footer.productLinks')[3], href: props.checkoutUrl },
])

const footerCompanyLinks = computed(() => [
  { name: tm('footer.companyLinks')[0], href: pagePath("faq") },
  { name: tm('footer.companyLinks')[1], href: pagePath("contact") },
])

const footerLegalLinks = computed(() => [
  { name: tm('footer.legalLinks')[0], href: pagePath("faq") },
  { name: tm('footer.legalLinks')[1], href: pagePath("impressum") },
  { name: tm('footer.legalLinks')[2], href: pagePath("privacy") },
  { name: tm('footer.legalLinks')[3], href: pagePath("terms") },
  { name: tm('footer.legalLinks')[4], href: "mailto:info@katsumii.com" },
])
</script>
