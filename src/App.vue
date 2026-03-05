<!-- pages/Landing.vue  (oder App.vue) -->
<template>
  <div class="bg-gray-900 text-white">
    <!-- Sticky Nav (separat) -->
    <AppNav
      :navigation="navigation"
      :cta="{ label: 'Lizenz kaufen', href: checkoutUrl }"
      brand-title="Katsumii"
      brand-subtitle="Offline Prop Trading Journal"
      brand-href="#top"
    />

    <!-- HERO -->
    <div id="top" class="relative isolate px-6 lg:px-8">
      <div
        class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-teal-400 to-sky-500 opacity-25 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        />
      </div>

      <div class="mx-auto max-w-2xl py-24 sm:py-32 lg:py-36">
        <div class="hidden sm:mb-8 sm:flex sm:justify-center">
          <div class="relative rounded-full px-3 py-1 text-sm text-gray-300 ring-1 ring-white/10 hover:ring-white/20">
            Local-first: alles bleibt auf deinem Gerät — keine Cloud, kein Login, kein Abo.
            <a href="#features" class="font-semibold text-teal-300">
              <span class="absolute inset-0" aria-hidden="true" />
              Features ansehen <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div class="text-center">
          <h1 class="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
            Prop Trading Journal<br />
            lokal. schnell. übersichtlich.
          </h1>

          <p class="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
            Erfasse Trades mit Screenshots, dokumentiere Setups & Regeln, führe mehrere Prop- und Personal-Accounts
            und analysiere deine Performance — komplett offline.
          </p>

          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a
              :href="checkoutUrl"
              target="_blank"
              rel="noreferrer"
              class="rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-gray-950 shadow-xs hover:bg-teal-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
            >
              Jetzt starten
            </a>

            <a href="#pricing" class="text-sm font-semibold hover:text-gray-100">
              Lizenz <span aria-hidden="true">→</span>
            </a>
          </div>

          <p class="mt-6 text-xs text-gray-400">Einmalzahlung · Offline-first · Prop-Firm & Personal Accounts</p>
        </div>
      </div>

      <div
        class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-sky-500 to-teal-400 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72rem]"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        />
      </div>
    </div>





  <div class="bg-gray-900">
    <div class="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
      <div class="relative isolate overflow-hidden bg-gray-800 px-6 pt-16 after:pointer-events-none after:absolute after:inset-0 after:inset-ring after:inset-ring-white/10 sm:rounded-3xl sm:px-16 after:sm:rounded-3xl md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
        <svg viewBox="0 0 1024 1024" class="absolute top-1/2 left-1/2 -z-10 size-256 -translate-y-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
          <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.7" />
          <defs>
            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
              <stop stop-color="#7775D6" />
              <stop offset="1" stop-color="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
        <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
          <h2 class="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">Boost your productivity. Start using our app today.</h2>
          <p class="mt-6 text-lg/8 text-pretty text-gray-300">Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.</p>
          <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <a href="#" class="rounded-md bg-gray-700 px-3.5 py-2.5 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"> Get started </a>
            <a href="#" class="text-sm/6 font-semibold text-white hover:text-gray-100">
              Learn more
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div class="relative mt-16 h-80 lg:mt-8">
          <img class="absolute top-0 left-0 w-228 max-w-none rounded-md bg-white/5 ring-1 ring-white/10" src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png" alt="App screenshot" width="1824" height="1080" />
        </div>
      </div>
    </div>
  </div>



<!-- FEATURES (Text links, Bild rechts) - gleicher overlap-sicherer Ansatz -->
<section id="features" class="overflow-hidden bg-gray-900">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div
      class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20
             lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center"
    >
      <!-- TEXT (links) -->
      <div class="lg:pr-8">
        <div class="lg:max-w-lg">
          <h2 class="text-base font-semibold text-teal-300">Für echte Auswertung gebaut</h2>

          <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl">
            Accounts, Regeln, Statistik — in einer lokalen App
          </p>

          <p class="mt-6 text-lg/8 text-gray-300">
            Lokale Datenbank, schnelle Suche, saubere Auswertungen und klare Account-Übersicht für Prop-Firm-Challenges
            und Personal-Accounts.
          </p>

          <dl class="mt-10 max-w-xl space-y-8 text-base/7 text-gray-300 lg:max-w-none">
            <div v-for="feature in features" :key="feature.name" class="relative pl-9">
              <dt class="inline font-semibold text-white">
                <component
                  :is="feature.icon"
                  class="absolute top-1 left-1 size-5 text-teal-300"
                  aria-hidden="true"
                />
                {{ feature.name }}
              </dt>
              {{ " " }}
              <dd class="inline text-gray-300">{{ feature.description }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- IMAGE (rechts) -->
      <div class="lg:pl-8">
        <img
          src="/Sc1.png"
          alt="Katsumii – Journal & Statistik Screenshot"
          class="w-full rounded-xl shadow-xl ring-1 ring-white/10"
          width="2432"
          height="1442"
        />
      </div>
    </div>
  </div>
</section>

<!-- FEATURES (Bild links, Text rechts) -->
<section class="overflow-hidden bg-gray-900">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div
      class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20
             lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center"
    >
      <!-- IMAGE -->
      <div class="lg:pr-8">
        <img
          src="/Sc1.png"
          alt="Katsumii – Strategy Management & Trading Overview"
          class="w-full rounded-xl shadow-xl ring-1 ring-white/10"
          width="2432"
          height="1442"
        />
      </div>

      <!-- TEXT -->
      <div class="lg:pl-8">
        <div class="lg:max-w-lg">

          <h2 class="text-base font-semibold text-teal-300">
            Struktur für dein Trading
          </h2>

          <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl">
            Strategien, Accounts und Regeln an einem Ort
          </p>

          <p class="mt-6 text-lg/8 text-gray-300">
            Katsumii hilft dir, dein Trading strukturiert zu organisieren:
            dokumentiere Strategien, tracke deine Performance im Kalender
            und behalte Prop-Firm-Regeln immer im Blick — komplett lokal
            und ohne Cloud-Abhängigkeit.
          </p>

          <dl class="mt-10 max-w-xl space-y-8 text-base/7 text-gray-300 lg:max-w-none">

            <div class="relative pl-9">
              <dt class="inline font-semibold text-white">
                <component :is="features[0].icon" class="absolute top-1 left-1 size-5 text-teal-300" />
                Strategie-Management & Library
              </dt>
              <dd class="inline text-gray-300">
                Erstelle deine eigene Strategie-Bibliothek, dokumentiere Regeln,
                Setups und Notizen — und verknüpfe Trades direkt mit deiner Strategie.
              </dd>
            </div>

            <div class="relative pl-9">
              <dt class="inline font-semibold text-white">
                <component :is="features[1].icon" class="absolute top-1 left-1 size-5 text-teal-300" />
                Trading Kalender & Tages-PnL
              </dt>
              <dd class="inline text-gray-300">
                Behalte deine Performance im Kalender im Blick: Tages-PnL,
                Gewinn- und Verlusttage sowie deine Trading-Aktivität
                werden übersichtlich visualisiert.
              </dd>
            </div>

            <div class="relative pl-9">
              <dt class="inline font-semibold text-white">
                <component :is="features[2].icon" class="absolute top-1 left-1 size-5 text-teal-300" />
                Prop-Firm Account Presets
              </dt>
              <dd class="inline text-gray-300">
                Nutze vorbereitete Account-Presets für typische Prop-Firm Regeln
                wie Daily Max Loss, Max Drawdown oder Mindest-Tradingtage.
              </dd>
            </div>

            <div class="relative pl-9">
              <dt class="inline font-semibold text-white">
                <component :is="features[3].icon" class="absolute top-1 left-1 size-5 text-teal-300" />
                Risk- & Inactivity Alerts
              </dt>
              <dd class="inline text-gray-300">
                Lass dich warnen, wenn du dein Daily Loss Limit erreichst,
                dein Max Drawdown näherkommt oder wenn längere
                Trading-Inaktivität erkannt wird.
              </dd>
            </div>

          </dl>
        </div>
      </div>
    </div>
  </div>
</section>


    <!-- BENTO / SCREENS -->
    <section id="screens" class="bg-gray-900 py-20 sm:py-28">
      <div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 class="text-center text-base font-semibold text-teal-300">Workflows, die du wirklich nutzt</h2>
        <p class="mx-auto mt-2 max-w-2xl text-center text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Von Trade-Eintrag bis Monatsreport — ohne Browser, ohne Cloud
        </p>

        <div class="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          <!-- Big left -->
          <div class="relative lg:row-span-2">
            <div class="absolute inset-px rounded-3xl bg-gray-800" />
            <div class="relative flex h-full flex-col overflow-hidden rounded-3xl ring-1 ring-white/10">
              <div class="px-8 pt-8 pb-3 sm:px-10 sm:pt-10">
                <p class="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                  Trade-Einträge mit Screenshot & Notizen
                </p>
                <p class="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                  Entry/Exit markieren, Setup taggen, Fehler tracken, Charts anhängen und Reviews schreiben — alles lokal.
                </p>
              </div>
              <div class="relative min-h-72 w-full grow">
                <div class="absolute inset-x-8 top-8 bottom-0 overflow-hidden rounded-2xl bg-gray-900/50 ring-1 ring-white/10">
                  <img class="size-full object-cover object-top opacity-90" src="/Sc2.png" alt="Screenshot Review" />
                </div>
              </div>
            </div>
          </div>

          <!-- Top middle -->
          <div class="relative max-lg:row-start-1">
            <div class="absolute inset-px rounded-3xl bg-gray-800" />
            <div class="relative flex h-full flex-col overflow-hidden rounded-3xl ring-1 ring-white/10">
              <div class="px-8 pt-8 sm:px-10 sm:pt-10">
                <p class="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                  Prop-Account Management
                </p>
                <p class="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                  Accounts, Ziele, Limits und Regeln im Blick (Drawdown, Daily Loss, Trading Days).
                </p>
              </div>
              <div class="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-8">
                <div class="w-full rounded-2xl bg-gray-900/50 ring-1 ring-white/10 p-6">
                  <div class="text-sm text-gray-300 font-medium">Account Snapshot</div>
                  <div class="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-400">
                    <div class="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
                      <div class="text-gray-300">Equity</div>
                      <div class="text-white font-semibold">€ 52,480</div>
                    </div>
                    <div class="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
                      <div class="text-gray-300">Max DD</div>
                      <div class="text-white font-semibold">-€ 2,500</div>
                    </div>
                    <div class="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
                      <div class="text-gray-300">Winrate</div>
                      <div class="text-white font-semibold">57%</div>
                    </div>
                    <div class="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
                      <div class="text-gray-300">Expectancy</div>
                      <div class="text-white font-semibold">+0.18R</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom middle -->
          <div class="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div class="absolute inset-px rounded-3xl bg-gray-800" />
            <div class="relative flex h-full flex-col overflow-hidden rounded-3xl ring-1 ring-white/10">
              <div class="px-8 pt-8 sm:px-10 sm:pt-10">
                <p class="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                  Statistiken, die Entscheidungen verbessern
                </p>
                <p class="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                  R-Multiples, Reports, Setup-Performance, Fehlerhäufigkeit, Sessions, Instrumente.
                </p>
              </div>
              <div class="flex flex-1 items-center max-lg:py-6 lg:pb-8 px-8 sm:px-10">
                <div class="w-full rounded-2xl bg-gray-900/50 ring-1 ring-white/10 p-6 text-sm text-gray-400">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-300 font-medium">Top Setup</span>
                    <span class="text-teal-300 font-semibold">Breakout</span>
                  </div>
                  <div class="mt-3 grid grid-cols-3 gap-3">
                    <div class="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
                      <div class="text-gray-300">Trades</div>
                      <div class="text-white font-semibold">128</div>
                    </div>
                    <div class="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
                      <div class="text-gray-300">Ø R</div>
                      <div class="text-white font-semibold">+0.32</div>
                    </div>
                    <div class="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
                      <div class="text-gray-300">PF</div>
                      <div class="text-white font-semibold">1.41</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Big right -->
          <div class="relative lg:row-span-2">
            <div class="absolute inset-px rounded-3xl bg-gray-800" />
            <div class="relative flex h-full flex-col overflow-hidden rounded-3xl ring-1 ring-white/10">
              <div class="px-8 pt-8 pb-3 sm:px-10 sm:pt-10">
                <p class="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                  Regel-Check & Review-Routine
                </p>
                <p class="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                  Regeln abhaken, Regelbrüche tracken und Daily/Weekly/Monthly Reviews aufbauen.
                </p>
              </div>
              <div class="relative min-h-72 w-full grow">
                <div class="absolute top-8 right-8 bottom-8 left-8 overflow-hidden rounded-2xl bg-gray-900/50 ring-1 ring-white/10 p-6">
                  <div class="flex items-center gap-3 text-sm text-gray-300 font-medium">
                    <LockClosedIcon class="size-5 text-teal-300" />
                    Rule Checklist
                  </div>
                  <ul class="mt-4 space-y-3 text-sm text-gray-400">
                    <li class="flex items-center gap-3">
                      <span class="size-2 rounded-full bg-teal-300" />
                      Nur A+ Setups gehandelt
                    </li>
                    <li class="flex items-center gap-3">
                      <span class="size-2 rounded-full bg-teal-300" />
                      Max. Risiko pro Trade eingehalten
                    </li>
                    <li class="flex items-center gap-3">
                      <span class="size-2 rounded-full bg-gray-600" />
                      Kein Revenge Trading (Review)
                    </li>
                    <li class="flex items-center gap-3">
                      <span class="size-2 rounded-full bg-gray-600" />
                      Session-Ende dokumentiert
                    </li>
                  </ul>
                  <div class="mt-6 rounded-xl bg-white/5 ring-1 ring-white/10 p-4 text-sm text-gray-400">
                    Tipp: Bei Regelbrüchen immer kurz „Warum?“ notieren — das macht Statistik später ehrlich.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PRICING -->
    <section id="pricing" class="relative isolate bg-gray-900 px-6 pb-5 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-base/7 font-semibold text-teal-300">Lizenz</h2>
        <p class="mt-2 text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
          Einmal zahlen. Lokal nutzen.
        </p>
      </div>

      <p class="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
        Keine monatlichen Gebühren, keine Cloud-Abhängigkeit. Du kaufst eine Lizenz — deine Daten bleiben bei dir.
      </p>

      <div class="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        <div
          v-for="(tier, tierIdx) in tiers"
          :key="tier.id"
          :class="[
            tier.featured ? 'relative bg-gray-800' : 'bg-white/2.5 sm:mx-8 lg:mx-0',
            tier.featured
              ? ''
              : tierIdx === 0
                ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
                : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
            'rounded-3xl p-8 ring-1 ring-white/10 sm:p-10'
          ]"
        >
          <h3 :id="tier.id" class="text-base/7 font-semibold text-teal-300">{{ tier.name }}</h3>

          <p class="mt-4 flex items-baseline gap-x-2">
            <span class="text-5xl font-semibold tracking-tight text-white">{{ tier.price }}</span>
            <span class="text-base text-gray-400">einmalig</span>
          </p>

          <p class="mt-6 text-base/7 text-gray-300">{{ tier.description }}</p>

          <ul role="list" class="mt-8 space-y-3 text-sm/6 text-gray-300 sm:mt-10">
            <li v-for="feature in tier.features" :key="feature" class="flex gap-x-3">
              <CheckIcon class="h-6 w-5 flex-none text-teal-300" aria-hidden="true" />
              {{ feature }}
            </li>
          </ul>

          <a
            :href="tier.href"
            :aria-describedby="tier.id"
            target="_blank"
            rel="noreferrer"
            :class="[
              tier.featured
                ? 'bg-teal-500 text-gray-950 hover:bg-teal-400 focus-visible:outline-teal-500'
                : 'bg-white/10 text-white ring-1 ring-inset ring-white/10 hover:bg-white/15 focus-visible:outline-white/75',
              'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10'
            ]"
          >
            Jetzt kaufen
          </a>

          <p v-if="tier.featured" class="mt-3 text-xs text-gray-400">
            Empfehlung: Für aktive Trader, die Regeln testen und Auswertung ernst nehmen.
          </p>
        </div>
      </div>
    </section>
    <div class="mt-10 text-center">

   <!-- DEMO-->
  <p class="text-gray-400 text-sm">
    Noch unsicher?
  </p>

  <a
    href="/demo"
    class="mt-2 inline-block text-teal-300 font-semibold hover:text-teal-200"
  >
    Teste Katsumii kostenlos in der Demo-Version →
  </a>

  <p class="mt-2 text-xs text-gray-500 pb-10">
    Keine Registrierung · Offline Demo · Direkter Download
  </p>
</div>

<!-- FOOTER -->
<footer class="border-t border-white/10 bg-gray-900">
  <div class="mx-auto max-w-7xl px-6 lg:px-8 py-14">

    <div class="grid grid-cols-1 gap-10 md:grid-cols-4">

      <!-- BRAND -->
      <div>
        <h3 class="text-white font-semibold text-lg">Katsumii</h3>
        <p class="mt-3 text-sm text-gray-400 leading-relaxed">
          Local-first Trading Journal für Prop Trader und private Accounts.
          Analysiere deine Trades, verwalte Strategien und behalte deine
          Trading-Regeln im Blick – komplett offline.
        </p>

        <p class="mt-4 text-xs text-gray-500">
          © {{ year }} Katsumii
        </p>
      </div>

      <!-- PRODUCT -->
      <div>
        <h4 class="text-sm font-semibold text-white">Produkt</h4>
        <ul class="mt-4 space-y-3 text-sm text-gray-400">
          <li>
            <a href="#features" class="hover:text-white">Features</a>
          </li>
          <li>
            <a href="#pricing" class="hover:text-white">Lizenz</a>
          </li>
          <li>
            <a href="/demo" class="hover:text-white">Kostenlose Demo</a>
          </li>
          <li>
            <a href="/download" class="hover:text-white">Download</a>
          </li>
        </ul>
      </div>

      <!-- RESOURCES -->
      <div>
        <h4 class="text-sm font-semibold text-white">Ressourcen</h4>
        <ul class="mt-4 space-y-3 text-sm text-gray-400">
          <li>
            <a href="/faq" class="hover:text-white">FAQ</a>
          </li>
          <li>
            <a href="/guide" class="hover:text-white">User Guide</a>
          </li>
          <li>
            <a href="/changelog" class="hover:text-white">Changelog</a>
          </li>
          <li>
            <a href="mailto:support@katsumii.app" class="hover:text-white">Support</a>
          </li>
        </ul>
      </div>

      <!-- LEGAL -->
      <div>
        <h4 class="text-sm font-semibold text-white">Rechtliches</h4>
        <ul class="mt-4 space-y-3 text-sm text-gray-400">
          <li>
            <a href="/impressum" class="hover:text-white">Impressum</a>
          </li>
          <li>
            <a href="/privacy" class="hover:text-white">Datenschutz</a>
          </li>
          <li>
            <a href="/terms" class="hover:text-white">Nutzungsbedingungen</a>
          </li>
          <li>
            <a href="/eula" class="hover:text-white">Lizenzvereinbarung (EULA)</a>
          </li>
        </ul>
      </div>

    </div>

    <!-- BOTTOM BAR -->
    <div class="mt-12 border-t border-white/10 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

      <p class="text-xs text-gray-500">
        Trading beinhaltet Risiken. Diese Software dient ausschließlich zur Analyse und Dokumentation von Trades.
      </p>

      <div class="flex items-center gap-5 text-sm text-gray-400">
        <a href="#top" class="hover:text-white">Nach oben ↑</a>
      </div>

    </div>

  </div>
</footer>
  </div>
</template>

<script setup>
import { computed } from "vue"
import AppNav from "./components/AppNav.vue"
import { CheckIcon } from "@heroicons/vue/20/solid"
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon, ChartBarIcon } from "@heroicons/vue/20/solid"

/**
 * TODO: set your real checkout link (e.g. Lemonsqueezy)
 */
const checkoutUrl = "#"

const navigation = [
  { name: "Features", href: "#features" },
  { name: "Screens", href: "#screens" },
  { name: "Lizenz", href: "#pricing" },
]

const features = [
  {
    name: "Account-Übersicht (Prop & Personal)",
    description: "Mehrere Accounts verwalten, Ziele & Limits tracken und den Fortschritt klar sehen.",
    icon: ServerIcon,
  },
  {
    name: "Trades + Screenshots + Review",
    description: "Einträge mit Chart-Screenshots, Notizen, Tags, Fehlern und Regel-Check — ideal für Post-Trade Reviews.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Statistiken & Performance Analyse",
    description: "Winrate, R-Multiples, Expectancy, Profit Factor, Setup-Performance, Tages-/Wochenreports.",
    icon: ChartBarIcon,
  },
  {
    name: "Lokale Daten & Privatsphäre",
    description: "Kein Login, keine Cloud: deine Daten bleiben auf deinem Gerät (offline-first).",
    icon: LockClosedIcon,
  },
]

const tiers = [
  {
    name: "Light",
    id: "tier-light",
    href: checkoutUrl,
    price: "49 €",
    description: "Für sauberes Journaling mit den wichtigsten Auswertungen.",
    features: ["Trade-Journal inkl. Screenshots", "Tags & Basis-Filter", "Basis-Statistiken (Winrate, ØR, PF)", "Lifetime-Lizenz (einmalig)"],
    featured: false,
  },
  {
    name: "Professional",
    id: "tier-pro",
    href: checkoutUrl,
    price: "89 €",
    description: "Für aktive Trader, die Regeln testen und Performance messbar verbessern wollen.",
    features: [
      "Alles aus Light",
      "Prop-Account Management (Ziele/Regeln/Limits)",
      "Erweiterte Statistik (Setup/Session/Instrument)",
      "Review-Routinen & Regelbruch-Tracking",
      "Priorisierter Support",
    ],
    featured: true,
  },
]

const year = computed(() => new Date().getFullYear())
</script>