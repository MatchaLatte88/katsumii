<template>
  <div :class="[!isDark ? 'relative overflow-x-hidden min-h-screen bg-slate-50 text-gray-900' : 'relative overflow-x-hidden min-h-screen bg-slate-950 text-slate-100']">
    <div class="k-bg" :class="!isDark ? 'k-bg-light' : 'k-bg-dark'" aria-hidden="true">
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
      :navigation="navigation"
      :brand-title="t('common.brandTitle')"
      :brand-subtitle="t('faq.brandSubtitle')"
      :brand-href="appHomePath"
    />

    <section class="relative isolate px-6 pb-24 pt-28 lg:px-8">
      <!-- Hero -->
      <div class="faq-hero mx-auto max-w-4xl text-center">
        <p
          :class="[
            'faq-hero-label inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]',
            !isDark
              ? 'border-teal-200 bg-teal-50 text-teal-700'
              : 'border-cyan-300/30 bg-cyan-400/10 text-cyan-300'
          ]"
        >
          {{ t('faq.hero.label') }}
        </p>
        <h1
          :class="[
            'faq-hero-title mt-5 text-4xl font-semibold tracking-tight sm:text-6xl',
            !isDark ? 'text-gray-900' : 'text-white'
          ]"
        >
          {{ t('faq.hero.title') }}
        </h1>
        <p :class="['faq-hero-sub mx-auto mt-5 max-w-2xl text-lg', !isDark ? 'text-gray-500' : 'text-gray-400']">
          {{ t('faq.hero.subtitle') }}
        </p>
      </div>

      <!-- Search -->
      <div class="faq-search mx-auto mt-10 max-w-2xl">
        <div
          :class="[
            'flex items-center gap-3 rounded-2xl border px-4 py-3 k-glass transition-all duration-200',
            !isDark
              ? 'border-gray-200 bg-white/80 focus-within:border-teal-400 focus-within:shadow-[0_0_0_3px_rgba(20,184,166,0.12)]'
              : 'border-white/10 bg-slate-800/60 focus-within:border-cyan-400/50 focus-within:shadow-[0_0_0_3px_rgba(34,211,238,0.1)]'
          ]"
        >
          <MagnifyingGlassIcon :class="['size-5 shrink-0', !isDark ? 'text-gray-400' : 'text-gray-500']" />
          <input
            v-model="searchQuery"
            type="search"
            :placeholder="t('faq.search.placeholder')"
            :class="[
              'w-full bg-transparent text-sm outline-none placeholder:text-gray-400',
              !isDark ? 'text-gray-900' : 'text-slate-100'
            ]"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            :class="['shrink-0 rounded-full p-0.5 transition-colors', !isDark ? 'text-gray-400 hover:text-gray-700' : 'text-gray-500 hover:text-gray-300']"
            :aria-label="t('common.aria.clearSearch')"
          >
            <XMarkIcon class="size-4" />
          </button>
        </div>
      </div>

      <!-- Category filter -->
      <div class="faq-filter mx-auto mt-5 max-w-4xl">
        <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            :class="[
              'shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200',
              selectedCategory === cat
                ? !isDark
                  ? 'border-teal-500 bg-teal-600 text-white shadow-sm'
                  : 'border-cyan-400/50 bg-cyan-400/15 text-cyan-300'
                : !isDark
                  ? 'border-gray-200 bg-white/70 text-gray-500 hover:border-teal-300 hover:text-teal-700'
                  : 'border-white/10 bg-white/5 text-gray-400 hover:border-cyan-400/30 hover:text-gray-300'
            ]"
          >
            {{ cat === 'all' ? t('faq.filter.all') : cat }}
          </button>
        </div>
      </div>

      <!-- FAQ items -->
      <div class="mx-auto mt-8 max-w-4xl space-y-3">
        <template v-if="filteredItems.length > 0">
          <div
            v-for="(item, idx) in filteredItems"
            :key="itemKey(item)"
            class="faq-item revealed"
            :style="{ '--stagger': idx }"
          >
            <div
              :class="[
                'k-glass rounded-2xl border transition-all duration-300',
                isOpen(item)
                  ? !isDark
                    ? 'border-teal-300/70 shadow-[0_8px_24px_-12px_rgba(20,184,166,0.25)]'
                    : 'border-cyan-400/30 shadow-[0_8px_24px_-12px_rgba(34,211,238,0.15)]'
                  : !isDark
                    ? 'border-gray-200/80 bg-white/80 hover:border-teal-200 hover:shadow-[0_8px_24px_-16px_rgba(15,23,42,0.2)]'
                    : 'border-white/8 bg-slate-800/55 hover:border-cyan-400/20',
              ]"
            >
              <button
                type="button"
                class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                :aria-expanded="isOpen(item)"
                @click="toggleItem(item)"
              >
                <div class="min-w-0">
                  <span
                    :class="[
                      'inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.13em]',
                      !isDark
                        ? 'border-teal-200 bg-teal-50 text-teal-600'
                        : 'border-cyan-400/25 bg-cyan-400/8 text-cyan-400'
                    ]"
                  >
                    {{ item.category }}
                  </span>
                  <h2 :class="['mt-2 text-base font-semibold sm:text-lg', !isDark ? 'text-gray-900' : 'text-white']">
                    {{ item.question }}
                  </h2>
                </div>
                <ChevronDownIcon
                  :class="[
                    'size-5 shrink-0 transition-transform duration-300',
                    isOpen(item) ? 'rotate-180' : 'rotate-0',
                    !isDark ? 'text-teal-500' : 'text-cyan-400'
                  ]"
                />
              </button>

              <div v-show="isOpen(item)">
                <div
                  :class="[
                    'border-t px-5 pb-5 pt-4 text-sm leading-relaxed sm:px-6 sm:pb-6 sm:text-base',
                    !isDark ? 'border-gray-100 text-gray-600' : 'border-white/6 text-gray-300'
                  ]"
                >
                  {{ item.answer }}
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Empty state -->
        <div
          v-else
          :class="[
            'rounded-2xl border py-14 text-center k-glass',
            !isDark ? 'border-gray-200 bg-white/70' : 'border-white/8 bg-slate-800/40'
          ]"
        >
          <MagnifyingGlassIcon :class="['mx-auto mb-3 size-8 opacity-30', !isDark ? 'text-gray-500' : 'text-gray-400']" />
          <p :class="['text-sm font-medium', !isDark ? 'text-gray-500' : 'text-gray-400']">{{ t('faq.empty') }}</p>
          <button
            @click="searchQuery = ''; selectedCategory = 'all'"
            :class="['mt-4 text-xs font-semibold underline underline-offset-2', !isDark ? 'text-teal-600' : 'text-cyan-400']"
          >
            {{ t('faq.filter.all') }}
          </button>
        </div>
      </div>

      <!-- CTA -->
      <div class="mx-auto mt-14 max-w-4xl">
        <div
          :class="[
            'faq-cta k-main-tile k-glass border p-8 text-center sm:p-10',
            !isDark
              ? 'border-gray-200/80 bg-white/70 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.18)]'
              : 'border-white/8 bg-slate-800/40 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)]'
          ]"
        >
          <div
            :class="[
              'mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border',
              !isDark ? 'border-teal-200 bg-teal-50' : 'border-cyan-400/25 bg-cyan-400/8'
            ]"
          >
            <EnvelopeIcon :class="['size-5', !isDark ? 'text-teal-600' : 'text-cyan-400']" />
          </div>
          <h3 :class="['text-xl font-semibold', !isDark ? 'text-gray-900' : 'text-white']">{{ t('faq.cta.title') }}</h3>
          <p :class="['mx-auto mt-2 max-w-sm text-sm', !isDark ? 'text-gray-500' : 'text-gray-400']">
            {{ t('faq.cta.body') }}
          </p>
          <a
            href="mailto:info@katsumii.com"
            :class="[
              'mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5',
              !isDark
                ? 'bg-teal-600 text-white hover:bg-teal-500 shadow-[0_8px_20px_-8px_rgba(13,148,136,0.5)]'
                : 'bg-cyan-400/15 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-400/25'
            ]"
          >
            {{ t('faq.cta.button') }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, inject, ref, watch } from "vue"
import { useI18n } from "vue-i18n"
import { ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon, EnvelopeIcon } from "@heroicons/vue/24/outline"
import AppNav from "./AppNav.vue"
import { useSiteNavigation } from "../composables/useSiteNavigation.js"
import { appHomePath } from "../utils/routes.js"

const { locale, t, tm } = useI18n()

const navigation = useSiteNavigation()

const isDark = inject("isDark")
const searchQuery = ref("")
const selectedCategory = ref("all")
const openItems = ref(new Set())

const faqItems = computed(() => {
  const raw = tm("faq.items")
  return Array.isArray(raw) ? raw : []
})

const categories = computed(() => {
  const cats = [...new Set(faqItems.value.map((i) => i.category))]
  return ["all", ...cats]
})

const filteredItems = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return faqItems.value.filter((item) => {
    const matchCat = selectedCategory.value === "all" || item.category === selectedCategory.value
    if (!matchCat) return false
    if (!q) return true
    return item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
  })
})

const itemKey = (item) => `${item.category}:${item.question}`

const isOpen = (item) => openItems.value.has(itemKey(item))

const toggleItem = (item) => {
  const next = new Set(openItems.value)
  const key = itemKey(item)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  openItems.value = next
}

watch([categories, locale], () => {
  if (!categories.value.includes(selectedCategory.value)) {
    selectedCategory.value = "all"
  }
  openItems.value = new Set()
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

/* Scroll reveal */
.faq-item,
.faq-hero,
.faq-search,
.faq-filter,
.faq-cta {
  opacity: 1;
  transform: none;
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.faq-search { transition-delay: 0.06s; }
.faq-filter { transition-delay: 0.1s; }
.revealed {
  opacity: 1;
  transform: none;
}

/* Hide scrollbar on filter row */
.scrollbar-hide { scrollbar-width: none; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
</style>
