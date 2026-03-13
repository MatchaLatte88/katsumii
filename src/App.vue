<template>
  <div :class="pageClass">
    <div class="k-bg" :class="theme === 'light' ? 'k-bg-light' : 'k-bg-dark'" aria-hidden="true">
      <div class="k-bg-gradient" />
      <svg class="k-bg-grid" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="hc" x="0" y="0" width="69.28" height="60" patternUnits="userSpaceOnUse">
            <path d="M34.64,0 L51.96,10 L51.96,30 L34.64,40 L17.32,30 L17.32,10 Z M0,0 L17.32,10 M17.32,30 L0,40 M51.96,10 L69.28,0 M69.28,40 L51.96,30 M34.64,40 L34.64,60 M0,40 L0,60" style="fill:none;stroke:var(--hc-stroke);stroke-width:1.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hc)"/>
      </svg>
      <div class="k-bg-band" />
    </div>

    <AppNav
      :theme="theme"
      :navigation="navigation"
      brand-title="Katsumii"
      :brand-subtitle="t('brand.subtitle')"
      brand-href="#top"
      @toggle-theme="toggleTheme"
    />

    <main>
      <section id="top" class="relative px-6 pb-40 !pt-80 sm:pt-28 lg:px-10">
        <div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div class="reveal">
            <p
              :class="[
                'inline-flex items-center rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em]',
                theme === 'light'
                  ? 'border-teal-200 bg-teal-50 text-teal-700'
                  : 'border-cyan-300/30 bg-cyan-400/10 text-cyan-200'
              ]"
            >
              {{ t('hero.badge') }}
            </p>

            <div class="mt-7 flex items-center gap-5">
              <img :src="assetUrl('logo.png')" alt="Katsumii logo" class="h-20 w-20 flex-shrink-0 object-contain sm:h-24 sm:w-24" />
              <div>
                <h1
                  :class="[
                    'font-display !text-5xl font-semibold leading-none tracking-tight sm:text-6xl lg:text-7xl',
                    theme === 'light' ? 'text-gray-900' : 'text-slate-100'
                  ]"
                >
                  KATSUMII
                </h1>
                <p :class="['mt-2 text-xl font-light tracking-tight sm:text-2xl', theme === 'light' ? 'text-gray-500' : 'text-slate-400']">
                  {{ t('hero.tagline') }}
                  <span
                    ref="typedWordEl"
                    :class="['font-semibold', theme === 'light' ? 'text-teal-600' : 'text-cyan-300']"
                  >clarity</span><span
                    class="typed-cursor"
                    :class="theme === 'light' ? 'text-teal-600' : 'text-cyan-300'"
                  >|</span>
                </p>
              </div>
            </div>

            <p
              :class="[
                'mt-7 max-w-xl text-lg leading-relaxed',
                theme === 'light' ? 'text-gray-600' : 'text-slate-300'
              ]"
            >
              {{ t('hero.description') }}
            </p>

            <div class="mt-9 flex flex-wrap gap-3">
              <a
                :href="checkoutUrl"
                :target="linkTarget(checkoutUrl)"
                :rel="linkRel(checkoutUrl)"
                :class="[
                  'rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5',
                  theme === 'light'
                    ? 'bg-teal-600 text-white hover:bg-teal-500'
                    : 'bg-cyan-300 text-slate-950 hover:bg-cyan-200'
                ]"
              >
                {{ t('hero.ctaBuy') }}
              </a>
              <a
                href="#showcase"
                :class="[
                  'rounded-full border px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5',
                  theme === 'light'
                    ? 'border-gray-300 bg-white/80 text-gray-700 hover:bg-white'
                    : 'border-blue-400/30 bg-slate-900/70 text-slate-200 hover:bg-slate-800/80'
                ]"
              >
                {{ t('hero.ctaTour') }}
              </a>
            </div>
          </div>

          <div class="reveal relative">
            <div
              :class="[
                'k-card overflow-hidden rounded-2xl border',
                theme === 'light'
                  ? 'border-gray-200 bg-white/90 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.35)]'
                  : 'border-blue-400/25 bg-slate-900/85 shadow-[0_24px_80px_-36px_rgba(0,0,0,0.7)]'
              ]"
            >
              <!-- Window chrome bar -->
              <div
                :class="[
                  'flex items-center justify-between border-b px-4 py-2.5',
                  theme === 'light' ? 'border-gray-200 bg-gray-50/80' : 'border-blue-400/20 bg-slate-950/60'
                ]"
              >
                <span :class="['text-xs font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-300']">{{ t('showcase.dashboardWindowLabel') }}</span>
                <div class="flex items-center gap-1.5">
                  <span class="h-2.5 w-2.5 rounded-full bg-red-400/50" />
                  <span class="h-2.5 w-2.5 rounded-full bg-yellow-400/50" />
                  <span class="h-2.5 w-2.5 rounded-full bg-green-400/50" />
                </div>
              </div>

              <!-- Screenshot cropped -->
              <div class="relative overflow-hidden" style="max-height: 260px;">
                <img
                  :src="theme === 'light' ? assetUrl('Dashboard_light.png') : assetUrl('Dashboard_dark.png')"
                  alt="Katsumii dashboard"
                  class="w-full object-cover object-top"
                />
                <div
                  class="pointer-events-none absolute inset-x-0 bottom-0 h-20"
                  :class="theme === 'light' ? 'bg-gradient-to-t from-white/80 to-transparent' : 'bg-gradient-to-t from-slate-900/80 to-transparent'"
                />
              </div>

              <!-- Stats row -->
              <div
                :class="[
                  'grid grid-cols-3 divide-x border-t',
                  theme === 'light' ? 'divide-gray-200 border-gray-200' : 'divide-blue-400/20 border-blue-400/20'
                ]"
              >
                <div
                  v-for="item in heroStats"
                  :key="item.label"
                  class="px-3 py-3 text-center"
                >
                  <p :class="['text-base font-semibold', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">{{ item.value }}</p>
                  <p :class="['text-[11px] mt-0.5', theme === 'light' ? 'text-gray-500' : 'text-slate-400']">{{ item.label }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" class="px-6 py-20 lg:px-10">
        <div class="mx-auto max-w-7xl">
          <div class="reveal max-w-3xl">
            <p :class="['text-sm font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">
              {{ t('features.label') }}
            </p>
            <h2 :class="['mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">
              {{ t('features.headline') }}
            </h2>
          </div>

          <div class="reveal mt-8 overflow-hidden rounded-full border py-2" :class="theme === 'light' ? 'border-gray-200 bg-white/75' : 'border-blue-400/20 bg-slate-900'">
            <div class="feature-marquee flex min-w-max gap-2 px-2">
              <span
                v-for="item in featureTicker"
                :key="item"
                :class="[
                  'rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.12em]',
                  theme === 'light' ? 'border-teal-200 bg-teal-50 text-teal-700' : 'border-cyan-300/30 bg-cyan-400/10 text-cyan-200'
                ]"
              >
                {{ item }}
              </span>
              <span
                v-for="item in featureTicker"
                :key="`${item}-clone`"
                :class="[
                  'rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.12em]',
                  theme === 'light' ? 'border-teal-200 bg-teal-50 text-teal-700' : 'border-cyan-300/30 bg-cyan-400/10 text-cyan-200'
                ]"
              >
                {{ item }}
              </span>
            </div>
          </div>

          <article
            class="reveal feature-spotlight mt-10 grid gap-8 overflow-hidden rounded-[2rem] border p-6 sm:p-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12"
            :class="theme === 'light' ? 'border-gray-200 bg-white/90' : 'border-blue-400/25 bg-slate-900/85'"

          >
            <div class="relative z-10">
              <p :class="['text-xs font-semibold uppercase tracking-[0.18em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">
                {{ t('features.spotlight.label') }}
              </p>
              <h3 :class="['mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">
                {{ t('features.spotlight.headline') }}
              </h3>
              <p :class="['mt-4 max-w-xl text-sm leading-relaxed sm:text-base', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">
                {{ t('features.spotlight.description') }}
              </p>

              <ul class="mt-6 space-y-3">
                <li
                  v-for="point in spotlightPoints"
                  :key="point"
                  class="flex items-start gap-3 rounded-xl border px-4 py-3"
                  :class="theme === 'light' ? 'border-gray-200 bg-gray-50/80' : 'border-blue-400/20 bg-slate-900'"
                >
                  <CheckIcon class="mt-0.5 h-5 w-5 flex-none" :class="theme === 'light' ? 'text-teal-600' : 'text-cyan-200'" />
                  <span :class="['text-sm', theme === 'light' ? 'text-gray-700' : 'text-slate-200']">{{ point }}</span>
                </li>
              </ul>
            </div>

            <div class="relative z-10 flex items-center">
              <div class="relative w-full">
                <img
                  :src="theme === 'light' ? assetUrl('Main_light.png') : assetUrl('Main_dark.png')"
                  alt="Katsumii feature spotlight"
                  class="w-full rounded-2xl border"
                  :class="theme === 'light' ? 'border-gray-200 shadow-xl' : 'border-blue-400/25 shadow-2xl shadow-black/30'"
                />
                <div class="mt-4 grid grid-cols-3 gap-3">
                  <div
                    v-for="kpi in spotlightKpis"
                    :key="kpi.label"
                    class="rounded-xl border px-3 py-2 text-center"
                    :class="theme === 'light' ? 'border-gray-200 bg-white/95' : 'border-blue-400/25 bg-slate-950/75'"
                  >
                    <p :class="['text-base font-semibold', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">{{ kpi.value }}</p>
                    <p :class="['text-[11px]', theme === 'light' ? 'text-gray-500' : 'text-slate-400']">{{ kpi.label }}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <article
              v-for="feature in features"
              :key="feature.name"
              class="reveal feature-card group rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1"
              :class="theme === 'light' ? 'border-gray-200 bg-white/85 hover:shadow-lg' : 'border-blue-400/20 bg-slate-900/70 hover:bg-slate-800/80'"

            >
              <component
                :is="feature.icon"
                class="h-6 w-6"
                :class="theme === 'light' ? 'text-teal-600' : 'text-cyan-200'"
              />
              <h3 :class="['mt-4 text-lg font-semibold', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">{{ feature.name }}</h3>
              <p :class="['mt-3 text-sm leading-relaxed', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">{{ feature.description }}</p>
            </article>
          </div>
        </div>
      </section>
<!-- Dashboard -->
      <section id="showcase" class="px-6 py-20 lg:px-10">
        <div class="mx-auto max-w-7xl space-y-12">
          <article class="grid items-center gap-10 lg:grid-cols-2">
            <div class="reveal rounded-3xl border p-4" :class="theme === 'light' ? 'border-gray-200 bg-white/85 shadow-xl' : 'border-blue-400/25 bg-slate-900/80 shadow-2xl shadow-black/30'">
              <p :class="['mb-3 text-xs font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">
                {{ t('showcase.dashboardWindowLabel') }}
              </p>
              <img
                :src="theme === 'light' ? assetUrl('Dashboard_light.png') : assetUrl('Dashboard_dark.png')"
                alt="Katsumii dashboard analytics screenshot"
                class="w-full rounded-2xl border"
                :class="theme === 'light' ? 'border-gray-200' : 'border-blue-400/25'"
              />
            </div>

            <div class="reveal flex items-center lg:min-h-full">
              <div>
                <p :class="['text-sm font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">{{ t('showcase.dashboard.label') }}</p>
                <h2 :class="['mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">
                  {{ t('showcase.dashboard.headline') }}
                </h2>
                <p :class="['mt-4 text-sm leading-relaxed', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">
                  {{ t('showcase.dashboard.description') }}
                </p>
                <ul class="mt-8 space-y-4">
                  <li
                    v-for="step in dashboardSteps"
                    :key="step.title"
                    class="rounded-2xl border p-4"
                    :class="theme === 'light' ? 'border-gray-200 bg-white/80' : 'border-blue-400/20 bg-slate-900'"
                  >
                    <p :class="['text-sm font-semibold', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">{{ step.title }}</p>
                    <p :class="['mt-1 text-sm', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">{{ step.description }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </article>
<!-- Calendar -->
          <article class="grid items-center mt-40 gap-10 lg:grid-cols-2">
            <div class="reveal flex items-center order-2 lg:order-1 lg:min-h-full">
              <div>
                <p :class="['text-sm font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">{{ t('showcase.calendar.label') }}</p>
                <h2 :class="['mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">
                  {{ t('showcase.calendar.headline') }}
                </h2>
                <p :class="['mt-4 text-sm leading-relaxed', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">
                  {{ t('showcase.calendar.description') }}
                </p>
                <ul class="mt-8 space-y-4">
                  <li
                    v-for="step in calendarSteps"
                    :key="step.title"
                    class="rounded-2xl border p-4"
                    :class="theme === 'light' ? 'border-gray-200 bg-white/80' : 'border-blue-400/20 bg-slate-900'"
                  >
                    <p :class="['text-sm font-semibold', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">{{ step.title }}</p>
                    <p :class="['mt-1 text-sm', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">{{ step.description }}</p>
                  </li>
                </ul>
              </div>
            </div>

            <div class="reveal rounded-3xl border p-4 order-1 lg:order-2" :class="theme === 'light' ? 'border-gray-200 bg-white/85 shadow-xl' : 'border-blue-400/25 bg-slate-900/80 shadow-2xl shadow-black/30'">
              <p :class="['mb-3 text-xs font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">
                {{ t('showcase.calendarWindowLabel') }}
              </p>
              <img
                :src="theme === 'light' ? assetUrl('Calendar_light.png') : assetUrl('Calendar_dark.png')"
                alt="Katsumii trading calendar screenshot"
                class="w-full rounded-2xl border"
                :class="theme === 'light' ? 'border-gray-200' : 'border-blue-400/25'"
              />
            </div>
          </article>
        </div>

        <div class="mx-auto mt-8 max-w-7xl text-center reveal">
          <a
            :href="pageUrl('features')"
            :class="[
              'inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5',
              theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-slate-400 hover:text-cyan-200'
            ]"
          >
            {{ t('showcase.seeAll') }}
            <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
      </section>

      <section id="pricing" class="px-6 pb-20 pt-20 lg:px-10">
        <div class="mx-auto max-w-5xl text-center reveal">
          <p :class="['text-sm font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">{{ t('pricing.label') }}</p>
          <h2 :class="['mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">
            {{ t('pricing.headline') }}
          </h2>
          <p :class="['mx-auto mt-5 max-w-2xl text-base', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">
            {{ t('pricing.description') }}
          </p>
        </div>

        <div class="mx-auto mt-14 max-w-6xl">
          <div class="relative flex flex-col gap-6 lg:min-h-[42rem] lg:flex-row lg:items-start lg:justify-center">
            <article
              class="reveal rounded-3xl border p-8 text-left lg:w-[28rem] lg:translate-x-10 lg:translate-y-8 lg:scale-[0.965] lg:opacity-95"
              :class="theme === 'light' ? 'border-gray-200 bg-white shadow-lg' : 'border-blue-400/20 bg-slate-900'"
            >
              <p :class="['text-sm font-semibold uppercase tracking-[0.12em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">{{ starterTier.name }}</p>
              <p :class="['mt-4 text-5xl font-semibold', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">{{ starterTier.price }}</p>
              <p :class="['mt-1 text-sm', theme === 'light' ? 'text-gray-500' : 'text-slate-400']">{{ t('pricing.oneTime') }}</p>
              <p :class="['mt-4 text-sm leading-relaxed', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">{{ starterTier.description }}</p>
              <ul class="mt-6 space-y-3">
                <li v-for="feature in starterTier.features" :key="feature" class="flex items-start gap-2">
                  <CheckIcon class="mt-0.5 h-5 w-5 flex-none" :class="theme === 'light' ? 'text-teal-600' : 'text-cyan-200'" />
                  <span :class="['text-sm', theme === 'light' ? 'text-gray-700' : 'text-slate-200']">{{ feature }}</span>
                </li>
              </ul>
              <a
                :href="starterTier.href"
                :target="linkTarget(starterTier.href)"
                :rel="linkRel(starterTier.href)"
                class="mt-7 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                :class="theme === 'light' ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-slate-800 text-slate-100 hover:bg-slate-700'"
              >
                {{ t('pricing.buy') }} {{ starterTier.name }}
              </a>
            </article>

            <article
              class="reveal relative z-20 rounded-3xl border p-8 text-left lg:-translate-x-12 lg:w-[30rem]"
              :class="theme === 'light' ? 'border-teal-300 bg-teal-50 shadow-2xl' : 'border-cyan-300/35 bg-slate-900 shadow-[0_24px_90px_-36px_rgba(34,211,238,0.55)]'"
            >
              <span
                :class="[
                  'inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.13em]',
                  theme === 'light' ? 'border-teal-300 bg-white text-teal-700' : 'border-cyan-200/40 bg-slate-950 text-cyan-200'
                ]"
              >
                {{ t('pricing.mainProgram') }}
              </span>
              <p :class="['mt-4 text-sm font-semibold uppercase tracking-[0.12em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">{{ featuredTier.name }}</p>
              <p :class="['mt-4 text-5xl font-semibold', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">{{ featuredTier.price }}</p>
              <p :class="['mt-1 text-sm', theme === 'light' ? 'text-gray-500' : 'text-slate-400']">{{ t('pricing.oneTime') }}</p>
              <p :class="['mt-4 text-sm leading-relaxed', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">{{ featuredTier.description }}</p>
              <ul class="mt-6 space-y-3">
                <li v-for="feature in featuredTier.features" :key="feature" class="flex items-start gap-2">
                  <CheckIcon class="mt-0.5 h-5 w-5 flex-none" :class="theme === 'light' ? 'text-teal-600' : 'text-cyan-200'" />
                  <span :class="['text-sm', theme === 'light' ? 'text-gray-700' : 'text-slate-200']">{{ feature }}</span>
                </li>
              </ul>
              <a
                :href="featuredTier.href"
                :target="linkTarget(featuredTier.href)"
                :rel="linkRel(featuredTier.href)"
                class="mt-7 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                :class="theme === 'light' ? 'bg-teal-700 text-white hover:bg-teal-600' : 'bg-cyan-300 text-slate-950 hover:bg-cyan-200'"
              >
                {{ t('pricing.buy') }} {{ featuredTier.name }}
              </a>
            </article>
          </div>
        </div>
      </section>

      <section class="px-6 pb-20 lg:px-10">
        <div
          class="reveal mx-auto max-w-xl rounded-3xl border px-8 py-10 text-center"
          :class="theme === 'light' ? 'border-gray-200 bg-white/80' : 'border-blue-400/15 bg-slate-900/60'"
        >
          <!-- Badge -->
          <span
            class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest"
            :class="theme === 'light' ? 'border-teal-500/30 bg-teal-50 text-teal-700' : 'border-cyan-400/25 bg-cyan-400/8 text-cyan-300'"
          >
            {{ t('demo.badge') }}
          </span>

          <!-- Headline -->
          <h2
            class="mt-5 font-display text-2xl font-semibold sm:text-3xl"
            :class="theme === 'light' ? 'text-gray-900' : 'text-slate-100'"
          >
            {{ t('demo.headline') }}
          </h2>

          <!-- Description -->
          <p
            class="mx-auto mt-3 max-w-sm text-sm leading-relaxed"
            :class="theme === 'light' ? 'text-gray-500' : 'text-slate-400'"
          >
            {{ t('demo.description') }}
          </p>

          <!-- Points -->
          <ul class="mt-6 flex flex-col items-center gap-2">
            <li
              v-for="point in tm('demo.points')"
              :key="point"
              class="flex items-center gap-2 text-sm"
              :class="theme === 'light' ? 'text-gray-600' : 'text-slate-300'"
            >
              <CheckIcon
                class="h-4 w-4 flex-shrink-0"
                :class="theme === 'light' ? 'text-teal-600' : 'text-cyan-400'"
              />
              {{ point }}
            </li>
          </ul>

          <!-- CTA -->
          <a
            :href="baseUrl"
            class="mt-7 inline-flex rounded-full border px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            :class="theme === 'light' ? 'border-gray-300 text-gray-700 hover:bg-gray-50' : 'border-blue-400/30 text-slate-200 hover:bg-slate-800/60'"
          >
            {{ t('demo.cta') }}
          </a>
        </div>
      </section>
    </main>

    <footer
      class="relative overflow-hidden border-t"
      :class="theme === 'light' ? 'border-gray-200/90 bg-white/88' : 'border-blue-400/20 bg-slate-950/95'"
    >
      <div
        class="pointer-events-none absolute inset-x-0 top-0 h-px"
        :class="theme === 'light' ? 'bg-gradient-to-r from-transparent via-teal-400/50 to-transparent' : 'bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent'"
      />

      <div class="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div
          class="reveal relative overflow-hidden rounded-[2rem] border p-6 sm:p-8"
          :class="theme === 'light' ? 'border-gray-200 bg-white/92 shadow-[0_24px_80px_-50px_rgba(15,23,42,0.28)]' : 'border-blue-400/20 bg-slate-900/72 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.8)]'"
        >
          <div
            class="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full blur-3xl"
            :class="theme === 'light' ? 'bg-teal-200/60' : 'bg-cyan-400/16'"
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
                  href="mailto:support@katsumii.app"
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
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue"
import { useI18n } from "vue-i18n"
import { CheckIcon } from "@heroicons/vue/20/solid"
import { ChartBarIcon, CloudArrowUpIcon, LockClosedIcon, ServerIcon } from "@heroicons/vue/24/outline"
import AppNav from "./components/AppNav.vue"

const { t, tm } = useI18n()

const baseUrl = import.meta.env.BASE_URL
const assetUrl = (path) => `${baseUrl}${path.replace(/^\/+/, "")}`
const pageUrl = (page) => `${baseUrl}app.html?page=${page}`
const checkoutUrl = baseUrl

const navigation = computed(() => [
  { name: t('nav.top'), href: "#top" },
  { name: t('nav.features'), href: "#features" },
  { name: t('nav.showcase'), href: "#showcase" },
  { name: t('nav.pricing'), href: "#pricing" },
])

const footerHighlights = computed(() => tm('footer.highlights'))

const footerProductLinks = computed(() => [
  { name: tm('footer.productLinks')[0], href: "#features" },
  { name: tm('footer.productLinks')[1], href: "#showcase" },
  { name: tm('footer.productLinks')[2], href: "#pricing" },
  { name: tm('footer.productLinks')[3], href: checkoutUrl },
])

const footerCompanyLinks = computed(() => [
  { name: tm('footer.companyLinks')[0], href: pageUrl("faq") },
  { name: tm('footer.companyLinks')[1], href: pageUrl("impressum") },
  { name: tm('footer.companyLinks')[2], href: "mailto:support@katsumii.app" },
])

const footerLegalLinks = computed(() => [
  { name: tm('footer.legalLinks')[0], href: pageUrl("faq") },
  { name: tm('footer.legalLinks')[1], href: pageUrl("impressum") },
  { name: tm('footer.legalLinks')[2], href: "mailto:support@katsumii.app" },
])

const heroStats = computed(() => tm('heroStats'))
const featureTicker = computed(() => tm('featureTicker'))
const spotlightPoints = computed(() => tm('features.spotlight.points'))
const spotlightKpis = computed(() => tm('spotlightKpis'))
const dashboardSteps = computed(() => tm('showcase.dashboardSteps'))
const calendarSteps = computed(() => tm('showcase.calendarSteps'))

const features = computed(() => [
  { name: t('features.cards.0.name'), description: t('features.cards.0.description'), icon: ServerIcon },
  { name: t('features.cards.1.name'), description: t('features.cards.1.description'), icon: CloudArrowUpIcon },
  { name: t('features.cards.2.name'), description: t('features.cards.2.description'), icon: ChartBarIcon },
  { name: t('features.cards.3.name'), description: t('features.cards.3.description'), icon: LockClosedIcon },
])

const tiers = computed(() => [
  {
    name: t('tiers.light.name'),
    id: "tier-light",
    href: baseUrl,
    price: t('tiers.light.price'),
    description: t('tiers.light.description'),
    features: tm('tiers.light.features'),
    featured: false,
  },
  {
    name: t('tiers.professional.name'),
    id: "tier-pro",
    href: baseUrl,
    price: t('tiers.professional.price'),
    description: t('tiers.professional.description'),
    features: tm('tiers.professional.features'),
    featured: true,
  },
])

const featuredTier = computed(() => tiers.value.find((tier) => tier.featured) ?? tiers.value[0])
const starterTier = computed(() => tiers.value.find((tier) => !tier.featured) ?? tiers.value[1] ?? tiers.value[0])

const getInitialTheme = () => {
  const saved = localStorage.getItem('katsumii-theme')
             || localStorage.getItem('katsumii-coming-soon-theme')
  if (saved === 'light' || saved === 'dark') return saved
  const hour = new Date().getHours()
  return (hour >= 6 && hour < 19) ? 'light' : 'dark'
}

const theme = ref(getInitialTheme())
const observer = ref(null)
const typedWordEl = ref(null)
let typingTimer = null

const startTypewriter = () => {
  const words = ['discipline.', 'consistancy.', 'precision.', 'confidence.', 'clarity.']
  let wordIdx = 0
  let charIdx = words[0].length
  let deleting = false

  const tick = () => {
    if (!typedWordEl.value) return
    const word = words[wordIdx]
    if (deleting) {
      charIdx--
      typedWordEl.value.textContent = word.slice(0, charIdx)
      if (charIdx === 0) {
        deleting = false
        wordIdx = (wordIdx + 1) % words.length
        typingTimer = setTimeout(tick, 280)
      } else {
        typingTimer = setTimeout(tick, 55)
      }
    } else {
      charIdx++
      typedWordEl.value.textContent = word.slice(0, charIdx)
      if (charIdx === word.length) {
        deleting = true
        typingTimer = setTimeout(tick, 3500)
      } else {
        typingTimer = setTimeout(tick, 85)
      }
    }
  }

  typingTimer = setTimeout(() => { deleting = true; tick() }, 2200)
}

const isExternalLink = (href) => {
  if (!href) return false
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return true

  const url = new URL(href, window.location.origin)
  return url.origin !== window.location.origin
}

const linkTarget = (href) => (isExternalLink(href) ? "_blank" : undefined)
const linkRel = (href) => (isExternalLink(href) ? "noreferrer noopener" : undefined)

const applyTheme = (value) => {
  theme.value = value
  localStorage.setItem("katsumii-theme", value)
}

const toggleTheme = () => {
  applyTheme(theme.value === "dark" ? "light" : "dark")
}


const pageClass = computed(() =>
  theme.value === "light"
    ? "relative min-h-screen overflow-x-hidden bg-slate-50 text-gray-900 transition-colors duration-300"
    : "relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100 transition-colors duration-300"
)

const setupRevealAnimations = () => {
  observer.value?.disconnect()

  const revealItems = Array.from(document.querySelectorAll(".reveal"))
  const revealGroups = document.querySelectorAll("section, footer")

  revealGroups.forEach((group) => {
    const groupItems = group.querySelectorAll(".reveal")
    groupItems.forEach((item, index) => {
      const delay = Math.min(index * 90, 420)
      item.style.setProperty("--reveal-delay", `${delay}ms`)
    })
  })

  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
          observer.value?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  )

  revealItems.forEach((item) => {
    if (item.classList.contains("is-visible")) return

    const rect = item.getBoundingClientRect()
    const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.08

    if (inView) {
      item.classList.add("is-visible")
      return
    }

    observer.value?.observe(item)
  })
}

onMounted(() => {
  nextTick(() => {
    setupRevealAnimations()
    startTypewriter()
  })
})

onUnmounted(() => {
  observer.value?.disconnect()
  clearTimeout(typingTimer)
})

watch(theme, (value) => {
  document.documentElement.classList.toggle("dark", value === "dark")
  nextTick(() => {
    setupRevealAnimations()
  })
})

const year = computed(() => new Date().getFullYear())
</script>

<style scoped>
.k-bg {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.k-bg-dark {
  --orb-a: rgba(59, 130, 246, 0.28);
  --orb-b: rgba(34, 211, 238, 0.22);
  --hc-stroke: rgba(34, 211, 238, 0.02);
}

.k-bg-light {
  --orb-a: rgba(6, 182, 212, 0.16);
  --orb-b: rgba(59, 130, 246, 0.12);
  --hc-stroke: rgba(8, 145, 178, 0.04);
}

.k-bg-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 55% at 8% 18%, var(--orb-a), transparent 60%),
    radial-gradient(ellipse 55% 45% at 88% 80%, var(--orb-b), transparent 55%);
}

.k-bg-grid {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  mask-image: linear-gradient(180deg, transparent 0%, black 12%, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, black 12%, black 80%, transparent 100%);
}

.k-bg-band {
  position: absolute;
  top: -30%;
  right: 0;
  width: 52%;
  height: 160%;
  background: linear-gradient(to bottom, transparent, rgba(34, 211, 238, 0.018) 40%, transparent);
  transform: skewX(-6deg);
  border-left: 1px solid rgba(34, 211, 238, 0.055);
  transform-origin: top right;
}

.k-card {
  backdrop-filter: blur(14px);
}

.typed-cursor {
  display: inline-block;
  font-weight: 300;
  margin-left: 0.02em;
  animation: typedCursorBlink 0.75s step-end infinite;
}

@keyframes typedCursorBlink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}


.feature-marquee {
  animation: feature-marquee 30s linear infinite;
}

.reveal {
  opacity: 0;
  filter: blur(6px);
  transform: translate3d(0, 26px, 0) scale(0.985);
  transition:
    opacity 0.78s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.78s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.78s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--reveal-delay, 0ms);
  will-change: transform, opacity, filter;
}

.reveal.is-visible {
  opacity: 1;
  filter: blur(0);
  transform: translate3d(0, 0, 0) scale(1);
}


@keyframes feature-marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
    filter: none;
  }

  .feature-marquee {
    animation: none;
  }
}
</style>
