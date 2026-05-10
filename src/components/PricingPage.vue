<template>
  <div
    :class="[
      'relative overflow-x-hidden min-h-screen',
      !isDark ? 'bg-slate-50 text-gray-900' : 'bg-slate-950 text-slate-100',
    ]"
  >
    <KbBackground :pattern="bg" :isDark="isDark" />

    <AppNav
      :navigation="navigation"
      brand-title="Katsumii"
      :brand-subtitle="t('pricingPage.brandSubtitle')"
      :brand-href="appHomePath"
    />

    <!-- ── HERO ─────────────────────────────────────────────────────── -->
    <section class="pricing-hero k-section-layer overflow-hidden px-5 pb-0 pt-32 sm:px-6 sm:pt-36 lg:px-10 lg:pt-40">
      <div class="relative mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <p
            class="hero-label inline-flex rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] shadow-sm"
            :class="!isDark ? 'border-[#4e9b91]/30 bg-[#4e9b91]/8 text-[#4e9b91]' : 'border-cyan-300/25 bg-cyan-400/10 text-cyan-200'"
          >
            {{ t('pricingPage.hero.label') }}
          </p>
          <h1
            class="hero-title mt-5 font-display text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
            :class="!isDark ? 'text-gray-950' : 'text-slate-100'"
          >
            {{ t('pricingPage.hero.headlineA') }}<br />
            <span :class="!isDark ? 'text-[#4e9b91]' : 'text-cyan-300'">{{ t('pricingPage.hero.headlineB') }}</span>
          </h1>
          <p
            class="hero-meta mt-6 max-w-2xl text-base leading-8 sm:text-lg"
            :class="!isDark ? 'text-gray-600' : 'text-slate-300'"
          >
            {{ t('pricingPage.hero.description') }}
          </p>
        </div>

        <div
          class="hero-meta pricing-proof k-main-tile k-glass grid gap-3 border p-3 sm:grid-cols-3"
          :class="!isDark ? 'border-gray-200/85 bg-white/72 shadow-[0_24px_80px_-52px_rgba(15,23,42,0.38)]' : 'border-cyan-300/16 bg-slate-900/64 shadow-[0_28px_90px_-54px_rgba(0,0,0,0.82)]'"
        >
          <div
            v-for="item in pricingHighlights"
            :key="item.title"
            class="k-sub-tile border px-4 py-4"
            :class="!isDark ? 'border-gray-200/75 bg-white/70' : 'border-cyan-300/12 bg-slate-950/38'"
          >
            <p :class="['text-sm font-bold', !isDark ? 'text-gray-950' : 'text-slate-50']">{{ item.title }}</p>
            <p :class="['mt-1 text-xs leading-5', !isDark ? 'text-gray-500' : 'text-slate-400']">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── PRICING CARDS ──────────────────────────────────────────── -->
    <section class="k-section-layer px-5 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-10">
      <div class="pricing-card-row mx-auto flex max-w-7xl flex-col items-center justify-center gap-5 lg:flex-row lg:items-start lg:gap-5">
        <div
          v-for="(tier, index) in tiers"
          :key="tier.key"
          class="pricing-card k-main-tile relative flex w-full max-w-[29rem] flex-col overflow-hidden border px-7 pb-8 pt-7 sm:px-8 lg:w-[31%] lg:max-w-none"
          :class="[
            tier.highlighted
              ? !isDark
                ? 'recommended-card z-20 border-[#4e9b91]/55 bg-white hover:bg-[#00e5d4]/5 shadow-[0_32px_80px_-40px_rgba(78,155,145,0.55)] lg:scale-[1.04]'
                : 'recommended-card z-20 border-cyan-300/45 bg-slate-800/95 hover:bg-[#0d2540] shadow-[0_32px_88px_-40px_rgba(34,211,238,0.52)] lg:scale-[1.04]'
              : !isDark
                ? 'pricing-card--side border-[#4e9b91]/35 bg-white/82 hover:bg-[#00e5d4]/5 shadow-[0_18px_60px_-48px_rgba(15,23,42,0.28)]'
                : 'pricing-card--side border-slate-700/55 bg-slate-900/85 hover:bg-[#0d2540] shadow-[0_18px_60px_-48px_rgba(0,0,0,0.55)]',
          ]"
          :data-index="index"
        >
          <!-- Decorative SVG art (top-right corner) -->
          <div class="pointer-events-none absolute right-0 top-0 h-36 w-36 overflow-hidden" aria-hidden="true">
            <svg viewBox="0 0 144 144" fill="none" class="absolute -right-3 -top-3 h-40 w-40">
              <polygon
                points="144,0 64,0 144,80"
                :fill="tier.highlighted ? (!isDark ? '#4e9b91' : '#22d3ee') : (!isDark ? '#94a3b8' : '#334155')"
                opacity="0.32"
              />
              <polygon
                points="144,32 100,0 144,100"
                :fill="tier.highlighted ? (!isDark ? '#0e9488' : '#67e8f9') : (!isDark ? '#64748b' : '#1e293b')"
                opacity="0.22"
              />
              <polygon
                points="144,78 118,24 144,138"
                :fill="tier.highlighted ? (!isDark ? '#4e9b91' : '#a5f3fc') : (!isDark ? '#cbd5e1' : '#0f172a')"
                opacity="0.14"
              />
            </svg>
          </div>

          <!-- "Most popular" vertical ribbon (left edge) -->
          <div
            v-if="tier.highlighted"
            class="recommended-ribbon absolute bottom-0 right-0 px-2 py-3 text-[10px] font-bold uppercase tracking-[0.13em]"
            :class="!isDark
              ? 'bg-linear-to-b from-cyan-300 to-[#4e9b91] text-white'
              : 'bg-linear-to-b from-cyan-200 to-cyan-500 text-slate-950'"
          >
            {{ t('pricingPage.popular') }}
          </div>

          <!-- Top row: icon circle -->
          <div class="relative flex items-start">
            <div
              class="flex h-11 w-11 items-center justify-center rounded-full border"
              :class="tier.highlighted
                ? !isDark ? 'border-[#4e9b91]/40 bg-[#4e9b91]/10' : 'border-cyan-300/40 bg-cyan-400/10'
                : !isDark ? 'border-gray-200 bg-gray-50' : 'border-slate-700 bg-slate-800/80'"
            >
              <!-- Demo: eye icon -->
              <svg v-if="tier.key === 'demo'" class="h-5 w-5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
              <!-- Professional: sparkle icon -->
              <svg v-else-if="tier.key === 'professional'" class="h-5 w-5" :class="!isDark ? 'text-[#4e9b91]' : 'text-cyan-300'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <!-- Light: check-circle icon -->
              <svg v-else class="h-5 w-5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
          </div>

          <!-- Plan name -->
          <h3
            class="relative mt-5 text-xl font-bold tracking-tight"
            :class="!isDark ? 'text-gray-950' : 'text-slate-50'"
          >{{ tier.name }}</h3>

          <!-- Description -->
          <p
            class="relative mt-2 text-sm leading-relaxed"
            :class="!isDark ? 'text-gray-500' : 'text-slate-400'"
          >{{ tier.description }}</p>

          <!-- Price -->
          <div class="relative mt-5 flex items-end gap-2">
            <span
              class="text-5xl font-bold tracking-tight"
              :class="!isDark ? 'text-gray-950' : 'text-slate-50'"
            >{{ tier.price }}</span>
            <span
              v-if="tier.priceNote"
              class="mb-1.5 text-sm"
              :class="!isDark ? 'text-gray-400' : 'text-slate-500'"
            >/ {{ tier.priceNote }}</span>
          </div>

          <!-- CTA button -->
          <div class="relative mt-5">
            <a
              :href="tier.ctaHref"
              class="pricing-cta block w-full rounded-xl px-5 py-3.5 text-center text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
              :class="tier.highlighted
                ? !isDark
                  ? 'bg-gradient-to-r from-[#4e9b91] to-teal-400 text-white shadow-[0_14px_36px_-14px_rgba(78,155,145,0.8)]'
                  : 'bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 shadow-[0_14px_36px_-14px_rgba(34,211,238,0.75)]'
                : !isDark
                  ? 'border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  : 'border border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700/80'"
            >
              {{ tier.cta }}
            </a>
          </div>

          <!-- Divider -->
          <div
            class="relative mt-6 h-px w-full"
            :class="!isDark ? 'bg-gray-100' : 'bg-slate-700/55'"
          />

          <!-- Meta: Accounts + Entries -->
          <div class="relative mt-4 space-y-2.5">
            <div class="flex items-center gap-2.5">
              <svg class="h-5 w-5 flex-shrink-0 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span class="text-sm" :class="!isDark ? 'text-gray-600' : 'text-slate-400'">
                <strong :class="!isDark ? 'text-gray-900' : 'text-slate-200'">{{ tier.seats }}</strong> {{ tier.seatsLabel }}
              </span>
            </div>
            <div class="flex items-center gap-2.5">
              <svg class="h-5 w-5 flex-shrink-0 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
              </svg>
              <span class="text-sm" :class="!isDark ? 'text-gray-600' : 'text-slate-400'">
                <strong :class="!isDark ? 'text-gray-900' : 'text-slate-200'">{{ tier.entries }}</strong> {{ tier.entriesLabel }}
              </span>
            </div>
          </div>

          <!-- Features divider (with optional "PLAN +" label) -->
          <div class="relative mt-5 flex items-center gap-3">
            <div class="h-px flex-1" :class="!isDark ? 'bg-gray-100' : 'bg-slate-700/55'" />
            <span
              v-if="tier.inclusionLabel"
              class="whitespace-nowrap text-xs font-bold uppercase tracking-widest"
              :class="!isDark ? 'text-gray-300' : 'text-slate-600'"
            >{{ tier.inclusionLabel }}</span>
            <div class="h-px flex-1" :class="!isDark ? 'bg-gray-100' : 'bg-slate-700/55'" />
          </div>

          <!-- Feature list -->
          <ul class="relative mt-4 flex-1 space-y-2.5">
            <li v-for="feat in tier.displayFeatures" :key="feat" class="flex items-start gap-2.5">
              <svg
                class="mt-0.5 h-4 w-4 flex-shrink-0"
                :class="tier.highlighted
                  ? !isDark ? 'text-[#4e9b91]' : 'text-cyan-300'
                  : 'opacity-35'"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span class="text-sm leading-snug" :class="!isDark ? 'text-gray-600' : 'text-slate-400'">{{ feat }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ── FEATURE COMPARISON TABLE ───────────────────────────────── -->
    <section class="k-section-layer px-5 pb-24 pt-8 sm:px-6 lg:px-10">
      <div class="mx-auto max-w-7xl">
        <div class="comparison-title flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p
              class="text-xs font-bold uppercase tracking-[0.18em]"
              :class="!isDark ? 'text-[#4e9b91]' : 'text-cyan-300'"
            >
              {{ t('pricingPage.comparison.kicker') }}
            </p>
            <h2
              class="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl"
              :class="!isDark ? 'text-gray-950' : 'text-slate-100'"
            >
              {{ t('pricingPage.comparison.headline') }}
            </h2>
          </div>
          <p
            class="max-w-xl text-sm leading-7 lg:text-right"
            :class="!isDark ? 'text-gray-500' : 'text-slate-400'"
          >
            {{ t('pricingPage.comparison.description') }}
          </p>
        </div>

        <!-- Table -->
        <div
          class="comparison-table k-main-tile k-glass mt-10 overflow-x-auto border"
          :class="!isDark
            ? 'border-gray-300/90 bg-white/86 shadow-[0_24px_80px_-54px_rgba(15,23,42,0.35)]'
            : 'border-cyan-300/22 bg-slate-900/66 shadow-[0_28px_90px_-54px_rgba(0,0,0,0.82)]'"
        >
          <!-- Table header -->
          <div
            class="grid min-w-[760px] grid-cols-[1fr_repeat(3,140px)] items-center gap-4 border-b px-6 py-5"
            :class="!isDark ? 'border-gray-300/90 bg-gray-50/95' : 'border-cyan-300/18 bg-slate-950/52'"
          >
            <span
              class="text-xs font-semibold uppercase tracking-[0.14em]"
              :class="!isDark ? 'text-gray-400' : 'text-slate-500'"
            >
              {{ t('pricingPage.comparison.feature') }}
            </span>
            <span
              v-for="col in ['Demo', 'Light', 'Professional']"
              :key="col"
              class="border-l text-center text-xs font-bold uppercase tracking-[0.14em]"
              :class="!isDark ? 'border-gray-300/70 text-gray-700' : 'border-cyan-300/12 text-slate-300'"
            >
              {{ col }}
            </span>
          </div>

          <!-- Table rows grouped by category -->
          <template v-for="(group, gi) in comparisonGroups" :key="gi">
            <!-- Category header -->
            <div
              class="grid min-w-[760px] grid-cols-[1fr_repeat(3,140px)] items-center gap-4 border-b px-6 py-4"
              :class="!isDark ? 'border-gray-200/90 bg-[#4e9b91]/12' : 'border-cyan-300/12 bg-cyan-400/8'"
            >
              <span
                class="text-sm font-bold uppercase tracking-[0.16em]"
                :class="!isDark ? 'text-[#4e9b91]' : 'text-cyan-400'"
              >
                {{ group.category }}
              </span>
              <span /><span /><span />
            </div>

            <!-- Feature rows -->
            <div
              v-for="(row, ri) in group.rows"
              :key="ri"
              class="grid min-w-[760px] grid-cols-[1fr_repeat(3,140px)] items-center gap-4 border-b px-6 py-4"
              :class="!isDark ? 'border-gray-200/90' : 'border-cyan-300/12'"
            >
              <span
                class="text-sm"
                :class="!isDark ? 'text-gray-600' : 'text-slate-300'"
              >
                {{ row.label }}
              </span>
              <span
                v-for="(val, vi) in [row.demo, row.light, row.pro]"
                :key="vi"
                class="border-l text-center text-sm"
                :class="!isDark ? 'border-gray-200/90' : 'border-cyan-300/10'"
              >
                <template v-if="val === true">
                  <span
                    class="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
                    :class="!isDark ? 'bg-[#4e9b91]/8 text-[#4e9b91] ring-1 ring-[#4e9b91]/24' : 'bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-300/20'"
                  >✓</span>
                </template>
                <template v-else-if="val === false">
                  <span :class="!isDark ? 'text-gray-300' : 'text-slate-600'">—</span>
                </template>
                <template v-else>
                  <span :class="!isDark ? 'text-gray-600' : 'text-slate-300'">{{ val }}</span>
                </template>
              </span>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- ── CTA ───────────────────────────────────────────────────── -->
    <section class="k-section-layer px-6 pb-24 pt-2 lg:px-10">
      <div class="mx-auto max-w-5xl">
        <div
          class="cta-block k-main-tile k-glass relative overflow-hidden border px-8 py-16 text-center sm:px-12"
          :class="!isDark
            ? 'border-gray-200 bg-white shadow-[0_30px_80px_-20px_rgba(15,23,42,0.1)]'
            : 'border-slate-800/60 bg-slate-900/60 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]'"
        >
          <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-x-8 top-0 h-px"
            :class="!isDark ? 'bg-gradient-to-r from-transparent via-[#4e9b91]/38 to-transparent' : 'bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent'"
          />
          <div class="relative">
            <p
              class="text-xs font-semibold uppercase tracking-[0.2em]"
              :class="!isDark ? 'text-[#4e9b91]' : 'text-cyan-400'"
            >
              {{ t('pricingPage.cta.label') }}
            </p>
            <h3
              class="mt-4 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl"
              :class="!isDark ? 'text-gray-900' : 'text-slate-100'"
            >
              {{ t('pricingPage.cta.headline') }}
            </h3>
            <p
              class="mx-auto mt-5 max-w-lg text-[0.9375rem] leading-relaxed"
              :class="!isDark ? 'text-gray-500' : 'text-slate-400'"
            >
              {{ t('pricingPage.cta.description') }}
            </p>
            <div class="mt-9 flex flex-wrap justify-center gap-3">
              <RouterLink
                :to="appHomePath"
                class="rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                :class="!isDark
                  ? 'bg-[#4e9b91] text-white hover:bg-[#438b82] hover:shadow-lg'
                  : 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.5)]'"
              >
                {{ t('pricingPage.cta.backHome') }}
              </RouterLink>
              <RouterLink
                :to="pagePath('features')"
                class="rounded-full border px-7 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                :class="!isDark
                  ? 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  : 'border-slate-700/80 bg-transparent text-slate-300 hover:border-slate-500 hover:bg-slate-800/50'"
              >
                {{ t('pricingPage.cta.seeFeatures') }}
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FOOTER ─────────────────────────────────────────────────── -->
    <footer
      class="k-section-layer border-t px-6 py-5 lg:px-10"
      :class="!isDark ? 'border-gray-200/90 bg-white/88' : 'border-blue-400/20 bg-slate-950/95'"
    >
      <div
        class="mx-auto flex max-w-5xl items-center justify-between text-xs"
        :class="!isDark ? 'text-gray-400' : 'text-slate-500'"
      >
        <span>&copy; {{ year }} Katsumii</span>
        <div class="flex gap-5">
          <RouterLink
            :to="appHomePath"
            class="transition-colors duration-150"
            :class="!isDark ? 'hover:text-gray-700' : 'hover:text-slate-300'"
          >{{ t('pricingPage.nav.home') }}</RouterLink>
          <RouterLink
            :to="pagePath('features')"
            class="transition-colors duration-150"
            :class="!isDark ? 'hover:text-gray-700' : 'hover:text-slate-300'"
          >{{ t('pricingPage.nav.features') }}</RouterLink>
          <RouterLink
            :to="pagePath('faq')"
            class="transition-colors duration-150"
            :class="!isDark ? 'hover:text-gray-700' : 'hover:text-slate-300'"
          >{{ t('pricingPage.nav.faq') }}</RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, inject, nextTick, onMounted } from "vue"
import { useI18n } from "vue-i18n"
import AppNav from "./AppNav.vue"
import KbBackground from "../backgrounds/KbBackground.vue"
import { appHomePath, pagePath } from "../utils/routes.js"

const { t, tm } = useI18n()

const baseUrl = import.meta.env.BASE_URL
const year = new Date().getFullYear()

const navigation = computed(() => [
  { name: t('pricingPage.nav.home'), href: appHomePath },
  { name: t('pricingPage.nav.features'), href: pagePath("features") },
  { name: t('pricingPage.nav.faq'), href: pagePath("faq") },
])

const pricingHighlights = computed(() => tm('pricingPage.highlights'))

const tiers = computed(() => {
  const t0 = tm('pricingPage.tiers.demo')
  const t1 = tm('pricingPage.tiers.light')
  const t2 = tm('pricingPage.tiers.professional')
  const meta = tm('pricingPage.tierMeta')
  return [
    {
      key: 'demo',
      name: t0.name,
      price: t0.price,
      priceNote: null,
      oldPrice: '',
      description: t0.description,
      features: t0.features,
      cardFeatures: t0.features.slice(0, 4),
      displayFeatures: t0.features,
      cta: t0.cta,
      ctaHref: baseUrl,
      highlighted: false,
      metaLabel: meta.demo.label,
      metaValue: meta.demo.value,
      seats: t0.seats,
      seatsLabel: t0.seatsLabel,
      entries: t0.entries,
      entriesLabel: t0.entriesLabel,
      inclusionLabel: t0.inclusionLabel,
    },
    {
      key: 'professional',
      name: t2.name,
      price: t2.price,
      priceNote: t2.priceNote,
      oldPrice: '',
      description: t2.description,
      features: t2.features,
      cardFeatures: t2.features.slice(0, 4),
      displayFeatures: t2.features.slice(1),
      cta: t2.cta,
      ctaHref: baseUrl,
      highlighted: true,
      metaLabel: meta.professional.label,
      metaValue: meta.professional.value,
      seats: t2.seats,
      seatsLabel: t2.seatsLabel,
      entries: t2.entries,
      entriesLabel: t2.entriesLabel,
      inclusionLabel: t2.inclusionLabel,
    },
    {
      key: 'light',
      name: t1.name,
      price: t1.price,
      priceNote: t1.priceNote,
      oldPrice: '',
      description: t1.description,
      features: t1.features,
      cardFeatures: t1.features.slice(0, 4),
      displayFeatures: t1.features,
      cta: t1.cta,
      ctaHref: baseUrl,
      highlighted: false,
      metaLabel: meta.light.label,
      metaValue: meta.light.value,
      seats: t1.seats,
      seatsLabel: t1.seatsLabel,
      entries: t1.entries,
      entriesLabel: t1.entriesLabel,
      inclusionLabel: t1.inclusionLabel,
    },
  ]
})

const comparisonGroups = computed(() => tm('pricingPage.comparison.groups'))

const isDark = inject("isDark")
const bg = inject("bg")

const markVisibleContent = () => {
  const heroEls = [
    ".hero-label",
    ".hero-title",
    ".hero-meta",
    ".pricing-card",
    ".comparison-title",
    ".comparison-table",
    ".cta-block",
  ]
  heroEls.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => el.classList.add("is-visible"))
  })
}

onMounted(() => {
  const heroEls = [
    [".hero-label", 0],
    [".hero-title", 80],
    [".hero-meta", 180],
  ]
  heroEls.forEach(([sel, delay]) => {
    const el = document.querySelector(sel)
    if (el) setTimeout(() => el.classList.add("is-visible"), delay)
  })

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.dataset.index || '0', 10)
          setTimeout(() => entry.target.classList.add("is-visible"), idx * 120)
          cardObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )
  document.querySelectorAll(".pricing-card").forEach((el) => cardObserver.observe(el))

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )
  const reveals = document.querySelectorAll(".comparison-title, .comparison-table, .cta-block")
  reveals.forEach((el) => revealObserver.observe(el))

  window.setTimeout(markVisibleContent, 700)
})
</script>

<style scoped>
.hero-label,
.hero-title,
.hero-meta {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-label.is-visible,
.hero-title.is-visible,
.hero-meta.is-visible { opacity: 1; transform: translateY(0); }

.pricing-card {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.3s ease,
    border-color 0.3s ease,
    background-color 0.3s ease;
}

.recommended-ribbon {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 8.1rem;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  border-radius: 0 0 var(--katsumii-radius-lg) 0;
  line-height: 1;
  box-shadow: 0 14px 34px -24px rgba(15, 23, 42, 0.8);
}

.recommended-card {
  isolation: isolate;
}

.recommended-card::after {
  position: absolute;
  inset: 0;
  content: "";
  border-radius: inherit;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 0 0 1px rgba(78, 155, 145, 0.1);
  pointer-events: none;
}

.pricing-card.is-visible { opacity: 1; transform: translateY(0); }

@media (min-width: 1024px) {
  .pricing-card--side {
    transform: translateY(28px);
  }

  .pricing-card--side.is-visible {
    transform: translateY(0);
  }

  .pricing-card--side.is-visible:hover {
    transform: translateY(-4px);
  }

  .recommended-card.is-visible {
    transform: translateY(0) scale(1.04);
  }

  .recommended-card.is-visible:hover {
    transform: translateY(-5px) scale(1.04);
  }
}

.pricing-cta {
  position: relative;
  overflow: hidden;
}

.pricing-cta::after {
  position: absolute;
  inset: 0;
  content: "";
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.28), transparent);
  transform: translateX(-120%);
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.pricing-cta:hover::after {
  transform: translateX(120%);
}

.comparison-table {
  scrollbar-width: thin;
}

.comparison-table > div:hover:not(:first-child) {
  background: rgba(78, 155, 145, 0.035);
}

.comparison-title,
.comparison-table {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.comparison-title.is-visible,
.comparison-table.is-visible { opacity: 1; transform: translateY(0); }

.cta-block {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.cta-block.is-visible { opacity: 1; transform: translateY(0); }

@media (max-width: 640px) {
  .pricing-card.is-visible:hover {
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-label,
  .hero-title,
  .hero-meta,
  .pricing-card,
  .comparison-title,
  .comparison-table,
  .cta-block {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .pricing-card.is-visible:hover {
    transform: none;
  }
}
</style>
