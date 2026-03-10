<template>
  <div :class="pageClass">
    <div class="k-bg" :class="theme === 'light' ? 'k-bg-light' : 'k-bg-dark'" aria-hidden="true">
      <div class="k-bg-orb k-bg-orb-a" />
      <div class="k-bg-orb k-bg-orb-b" />
      <div class="k-bg-grid" />
      <div class="k-bg-structure" />
      <div class="k-bg-noise" />
    </div>

    <AppNav
      :theme="theme"
      :navigation="navigation"
      brand-title="Katsumii"
      brand-subtitle="Offline Trading Journal"
      brand-href="#top"
      @toggle-theme="toggleTheme"
    />

    <main>
      <section id="top" class="relative px-6 pb-20 pt-20 sm:pt-28 lg:px-10">
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
              Kaizen Trading Workflow
            </p>

            <div class="mt-7 flex items-center gap-5">
              <img :src="assetUrl('logo.png')" alt="Katsumii logo" class="h-20 w-20 object-contain sm:h-24 sm:w-24" />
              <h1
                :class="[
                  'font-display text-5xl font-semibold leading-none tracking-tight sm:text-6xl lg:text-7xl',
                  theme === 'light' ? 'text-gray-900' : 'text-slate-100'
                ]"
              >
                KATSUMII
              </h1>
            </div>

            <p
              :class="[
                'mt-7 max-w-xl text-lg leading-relaxed',
                theme === 'light' ? 'text-gray-600' : 'text-slate-300'
              ]"
            >
              Modernes Trading Journal mit Fokus auf Klarheit, Struktur und Disziplin. Lokal, schnell und gebaut fuer
              Prop Trader, die professionell wachsen wollen.
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
                Buy License
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
                Product Tour
              </a>
            </div>
          </div>

          <div class="reveal relative">
            <div
              :class="[
                'k-card relative overflow-hidden rounded-3xl border p-5 sm:p-6',
                theme === 'light'
                  ? 'border-gray-200 bg-white/85 shadow-[0_30px_90px_-45px_rgba(15,23,42,0.45)]'
                  : 'border-blue-400/25 bg-slate-900/80 shadow-[0_30px_100px_-45px_rgba(0,0,0,0.8)]'
              ]"
            >
              <div
                :class="[
                  'absolute -right-16 -top-16 h-44 w-44 rounded-full blur-2xl',
                  theme === 'light' ? 'bg-teal-200/70' : 'bg-cyan-400/25'
                ]"
              />
              <img
                :src="theme === 'light' ? assetUrl('Sc1_Light.png') : assetUrl('Sc1_Dark.png')"
                alt="Katsumii dashboard"
                class="w-full rounded-2xl border"
                :class="theme === 'light' ? 'border-gray-200' : 'border-blue-400/25'"
              />
              <div class="mt-5 grid grid-cols-3 gap-3">
                <article
                  v-for="item in heroStats"
                  :key="item.label"
                  :class="[
                    'rounded-2xl border p-3 text-center',
                    theme === 'light' ? 'border-gray-200 bg-gray-50' : 'border-blue-400/20 bg-slate-900/75'
                  ]"
                >
                  <p :class="['text-xl font-semibold', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">{{ item.value }}</p>
                  <p :class="['text-xs', theme === 'light' ? 'text-gray-500' : 'text-slate-400']">{{ item.label }}</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" class="px-6 py-20 lg:px-10">
        <div class="mx-auto max-w-7xl">
          <div class="reveal max-w-3xl">
            <p :class="['text-sm font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">
              Why Katsumii
            </p>
            <h2 :class="['mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">
              Professional structure with dominant, high-clarity feature workflows
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
                Feature Spotlight
              </p>
              <h3 :class="['mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">
                Build conviction through calm, measurable execution
              </h3>
              <p :class="['mt-4 max-w-xl text-sm leading-relaxed sm:text-base', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">
                Die wichtigsten Features sind jetzt bewusst im Zentrum: schneller Trade-Flow, glasklare Prop-Regel-Uebersicht und
                Analytics, die direkt Entscheidungen verbessern.
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
                  :src="theme === 'light' ? assetUrl('Sc1_Light.png') : assetUrl('Sc1_Dark.png')"
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

      <section id="showcase" class="px-6 py-20 lg:px-10">
        <div class="mx-auto max-w-7xl space-y-12">
          <article class="grid items-center gap-10 lg:grid-cols-2">
            <div class="reveal rounded-3xl border p-4" :class="theme === 'light' ? 'border-gray-200 bg-white/85 shadow-xl' : 'border-blue-400/25 bg-slate-900/80 shadow-2xl shadow-black/30'">
              <p :class="['mb-3 text-xs font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">
                Dashboard
              </p>
              <img
                :src="theme === 'light' ? assetUrl('Sc1_Light.png') : assetUrl('Sc1_Dark.png')"
                alt="Katsumii dashboard analytics screenshot"
                class="w-full rounded-2xl border"
                :class="theme === 'light' ? 'border-gray-200' : 'border-blue-400/25'"
              />
            </div>

            <div class="reveal flex items-center lg:min-h-full">
              <div>
                <p :class="['text-sm font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">Dashboard Analytics</p>
                <h2 :class="['mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">
                  Measure your edge.
                </h2>
                <p :class="['mt-4 text-sm leading-relaxed', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">
                  Das Dashboard zeigt Balance, PnL, Regelstatus und Setup-Qualitaet in einem klaren Analytics-Flow.
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

          <article class="grid items-center gap-10 lg:grid-cols-2">
            <div class="reveal flex items-center order-2 lg:order-1 lg:min-h-full">
              <div>
                <p :class="['text-sm font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">Trading Calendar</p>
                <h2 :class="['mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">
                  Plan with clarity.
                </h2>
                <p :class="['mt-4 text-sm leading-relaxed', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">
                  Der Kalender macht Trading-Tage, Tages-PnL und Monatsmuster sofort sichtbar, damit Reviews schneller
                  und praeziser werden.
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
                Trading Calendar
              </p>
              <img
                :src="theme === 'light' ? assetUrl('Sc2_Light.png') : assetUrl('Sc2_Dark.png')"
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
            See all features
            <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
      </section>

      <section id="pricing" class="px-6 pb-20 pt-20 lg:px-10">
        <div class="mx-auto max-w-5xl text-center reveal">
          <p :class="['text-sm font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">License</p>
          <h2 :class="['mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">
            One-time payment. Long-term edge.
          </h2>
          <p :class="['mx-auto mt-5 max-w-2xl text-base', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">
            Kein Abo, keine Cloud Bindung. Deine Daten bleiben lokal und du behaeltst volle Kontrolle.
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
              <p :class="['mt-1 text-sm', theme === 'light' ? 'text-gray-500' : 'text-slate-400']">one-time</p>
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
                Buy {{ starterTier.name }}
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
                Main Program
              </span>
              <p :class="['mt-4 text-sm font-semibold uppercase tracking-[0.12em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">{{ featuredTier.name }}</p>
              <p :class="['mt-4 text-5xl font-semibold', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">{{ featuredTier.price }}</p>
              <p :class="['mt-1 text-sm', theme === 'light' ? 'text-gray-500' : 'text-slate-400']">one-time</p>
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
                Buy {{ featuredTier.name }}
              </a>
            </article>
          </div>
        </div>
      </section>

      <section class="px-6 pb-20 lg:px-10">
        <div
          class="reveal mx-auto max-w-6xl rounded-3xl border px-6 py-12 text-center sm:px-10"
          :class="theme === 'light' ? 'border-gray-200 bg-white/90' : 'border-blue-400/20 bg-slate-900'"
        >
          <h2 :class="['font-display text-3xl font-semibold sm:text-4xl', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">
            Ready to build your edge with discipline?
          </h2>
          <p :class="['mx-auto mt-4 max-w-2xl text-base', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">
            Start with the full version or test the demo first. Same mindset, same clean workflow.
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-3">
            <a
              :href="checkoutUrl"
              :target="linkTarget(checkoutUrl)"
              :rel="linkRel(checkoutUrl)"
              :class="[
                'rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5',
                theme === 'light' ? 'bg-teal-600 text-white hover:bg-teal-500' : 'bg-cyan-300 text-slate-950 hover:bg-cyan-200'
              ]"
            >
              Buy License
            </a>
            <a
              href="coming_soon.html"
              :class="[
                'rounded-full border px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5',
                theme === 'light' ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50' : 'border-blue-400/30 bg-slate-900/70 text-slate-200 hover:bg-slate-800/80'
              ]"
            >
              Try Free Demo
            </a>
          </div>
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
                  <p :class="['text-xs uppercase tracking-[0.18em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-200']">Offline Trading Journal</p>
                </div>
              </div>

              <p :class="['mt-5 max-w-md text-sm leading-relaxed', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">
                Entwickelt fuer Trader, die mit Klarheit arbeiten, Regeln respektieren und ihre Performance systematisch verbessern wollen.
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
              <p :class="['text-sm font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">Product</p>
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
              <p :class="['text-sm font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">Company</p>
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
                <p :class="['text-sm font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">Support</p>
                <p :class="['mt-3 text-sm leading-relaxed', theme === 'light' ? 'text-gray-600' : 'text-slate-300']">
                  Fragen zu License, Demo oder Workflow? Wir helfen dir direkt weiter.
                </p>
                <a
                  href="mailto:support@katsumii.app"
                  class="mt-5 inline-flex rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                  :class="theme === 'light' ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-cyan-300 text-slate-950 hover:bg-cyan-200'"
                >
                  Contact Support
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
            Copyright {{ year }} Katsumii. Trading involves risk. The app is for documentation and analysis only.
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
import { CheckIcon } from "@heroicons/vue/20/solid"
import { ChartBarIcon, CloudArrowUpIcon, LockClosedIcon, ServerIcon } from "@heroicons/vue/24/outline"
import AppNav from "./components/AppNav.vue"

const baseUrl = import.meta.env.BASE_URL
const assetUrl = (path) => `${baseUrl}${path.replace(/^\/+/, "")}`
const pageUrl = (page) => `${baseUrl}?page=${page}`
const checkoutUrl = assetUrl("coming_soon.html")

const navigation = [
  { name: "Top", href: "#top" },
  { name: "Features", href: "#features" },
  { name: "Showcase", href: "#showcase" },
  { name: "Pricing", href: "#pricing" },
]

const footerHighlights = ["100% Offline-first", "Structured Reviews", "Prop-Ready Workflow"]

const footerProductLinks = [
  { name: "Features", href: "#features" },
  { name: "Showcase", href: "#showcase" },
  { name: "License", href: "#pricing" },
  { name: "Buy License", href: checkoutUrl },
]

const footerCompanyLinks = [
  { name: "FAQ", href: pageUrl("faq") },
  { name: "Imprint", href: pageUrl("impressum") },
  { name: "Email Support", href: "mailto:support@katsumii.app" },
]

const footerLegalLinks = [
  { name: "FAQ", href: pageUrl("faq") },
  { name: "Imprint", href: pageUrl("impressum") },
  { name: "Support", href: "mailto:support@katsumii.app" },
]

const heroStats = [
  { label: "Offline-first", value: "100%" },
  { label: "App speed", value: "Fast" },
  { label: "Focused UI", value: "Clean" },
]

const features = [
  {
    name: "Account clarity",
    description: "Prop and personal accounts in one view with clear goals, limits and progress.",
    icon: ServerIcon,
  },
  {
    name: "Structured journaling",
    description: "Capture trades with screenshots, notes, setup tags and disciplined review logs.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Actionable analytics",
    description: "Track expectancy, R-multiples, setup quality and consistency over time.",
    icon: ChartBarIcon,
  },
  {
    name: "Private by design",
    description: "No login and no cloud dependency. Your trading data stays local.",
    icon: LockClosedIcon,
  },
]


const featureTicker = [
  "100% Offline-first",
  "Prop Rule Guardrails",
  "Screenshot Journaling",
  "Advanced Performance Stats",
  "Fast Local Search",
  "Kaizen Review Routine",
]

const spotlightPoints = [
  "Trade Entry mit Screenshots, Notizen und Setup-Context in Sekunden.",
  "Prop Account Limits immer sichtbar, inklusive Rule-Break Risiko.",
  "Analyse nach Setup, Session und Fehlern fuer gezielte Verbesserung.",
]

const spotlightKpis = [
  { value: "A+", label: "Setup Score" },
  { value: "+0.31R", label: "Avg. Edge" },
  { value: "100%", label: "Local Data" },
]

const dashboardSteps = [
  {
    title: "Account and PnL at a glance",
    description: "Sieh Balance, Gesamt-PnL und aktive Konten auf einen Blick.",
  },
  {
    title: "Rule-focused monitoring",
    description: "Behalte Limits und Risiko-Status live im Blick, bevor Regeln brechen.",
  },
  {
    title: "Setup quality tracking",
    description: "Vergleiche Setups und erkenne schnell, was deinen Edge wirklich treibt.",
  },
]

const calendarSteps = [
  {
    title: "Daily performance map",
    description: "Jeder Tag zeigt sofort Gewinn, Verlust und Aktivitaet im Monatsbild.",
  },
  {
    title: "Pattern recognition",
    description: "Erkenne Wochenmuster und wiederkehrende Fehler in deinem Timing.",
  },
  {
    title: "Review-ready history",
    description: "Nutze die Kalender-Historie fuer strukturierte Wochen- und Monatsreviews.",
  },
]

const tiers = [
  {
    name: "Light",
    id: "tier-light",
    href: "coming_soon.html",
    price: "$49",
    description: "For clean journaling with essential analytics.",
    features: [
      "Trade journal with screenshots",
      "Tags and basic filters",
      "Core statistics and reports",
      "Lifetime license"
    ],
    featured: false,
  },
  {
    name: "Professional",
    id: "tier-pro",
    href: "coming_soon.html",
    price: "$89",
    description: "For serious traders who optimize process and performance.",
    features: [
      "Everything in Light",
      "Prop account management",
      "Advanced strategy breakdowns",
      "Review routine and rule tracking",
      "Priority support"
    ],
    featured: true,
  },
]
const featuredTier = computed(() => tiers.find((tier) => tier.featured) ?? tiers[0])
const starterTier = computed(() => tiers.find((tier) => !tier.featured) ?? tiers[1] ?? tiers[0])
const theme = ref("light")
const observer = ref(null)

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
  const savedTheme = localStorage.getItem("katsumii-theme")
  if (savedTheme === "light" || savedTheme === "dark") {
    theme.value = savedTheme
  }

  nextTick(() => {
    setupRevealAnimations()
  })
})

onUnmounted(() => {
  observer.value?.disconnect()
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
}


.k-bg-light {
  --k-grid: rgba(15, 23, 42, 0.075);
  --k-structure: rgba(20, 184, 166, 0.095);
  --k-noise: rgba(255, 255, 255, 0.05);
}

.k-bg-dark {
  --k-grid: rgba(30, 64, 175, 0.16);
  --k-structure: rgba(34, 211, 238, 0.09);
  --k-noise: rgba(255, 255, 255, 0.025);
}
.k-bg-orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(80px);
  opacity: 0.4;
}

.k-bg-orb-a {
  left: -8%;
  top: -12%;
  height: 360px;
  width: 360px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0) 72%);
  animation: driftA 14s ease-in-out infinite;
}

.k-bg-orb-b {
  bottom: -8%;
  right: -8%;
  height: 420px;
  width: 420px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.38) 0%, rgba(34, 211, 238, 0) 70%);
  animation: driftB 17s ease-in-out infinite;
}

.k-bg-grid {
  position: absolute;
  inset: 0;
  opacity: 0.3;
  background-image: linear-gradient(var(--k-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--k-grid) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: radial-gradient(circle at center, black 22%, transparent 78%);
}

.k-bg-structure {
  position: absolute;
  inset: 0;
  opacity: 0.34;
  background:
    radial-gradient(120% 65% at 50% -10%, var(--k-structure), transparent 60%),
    repeating-linear-gradient(
      30deg,
      transparent 0 22px,
      var(--k-structure) 22px 23px
    ),
    repeating-linear-gradient(
      -30deg,
      transparent 0 22px,
      var(--k-structure) 22px 23px
    ),
    repeating-linear-gradient(
      90deg,
      transparent 0 38px,
      var(--k-structure) 38px 39px
    );
  mask-image: radial-gradient(circle at 50% 35%, black 20%, transparent 88%);
}

.k-bg-noise {
  position: absolute;
  inset: 0;
  opacity: 0.08;
  background-image: radial-gradient(var(--k-noise) 0.7px, transparent 0.7px);
  background-size: 3px 3px;
}

.k-card {
  backdrop-filter: blur(14px);
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

@keyframes driftA {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(24px, 22px, 0);
  }
}

@keyframes driftB {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(-26px, -20px, 0);
  }
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

  .k-bg-orb-a,
  .k-bg-orb-b {
    animation: none;
  }

  .feature-marquee {
    animation: none;
  }
}
</style>





































