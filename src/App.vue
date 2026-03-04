<template>
  <div class="bg-gray-900 text-white">
    <!-- Header -->
    <header class="absolute inset-x-0 top-0 z-50">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <!-- Brand -->
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5 flex items-center gap-3" @click.prevent="scrollToTop">
            <span class="sr-only">Katsumii Trading Journal</span>
            <!-- Replace with your own logo later -->
            <div class="grid size-9 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
              🍵
            </div>
            <div class="hidden sm:block leading-tight">
              <div class="font-semibold">Katsumii</div>
              <div class="text-xs text-gray-400">Trading Journal · local-first</div>
            </div>
          </a>
        </div>

        <!-- Mobile menu button -->
        <div class="flex lg:hidden">
          <button
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200 hover:bg-white/5"
            @click="mobileMenuOpen = true"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="size-6" aria-hidden="true" />
          </button>
        </div>

        <!-- Desktop links -->
        <div class="hidden lg:flex lg:gap-x-10">
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            class="text-sm/6 font-semibold text-gray-200 hover:text-white"
          >
            {{ item.name }}
          </a>
        </div>

        <!-- Desktop CTA -->
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            :href="checkoutUrl"
            target="_blank"
            rel="noreferrer"
            class="rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-gray-950 shadow-xs hover:bg-teal-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
          >
            Jetzt starten <span aria-hidden="true">→</span>
          </a>
        </div>
      </nav>

      <!-- Mobile menu dialog -->
      <Dialog class="lg:hidden" :open="mobileMenuOpen" @close="mobileMenuOpen = false">
        <div class="fixed inset-0 z-50 bg-black/40"></div>
        <DialogPanel
          class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10"
        >
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5 flex items-center gap-3" @click.prevent="scrollToTop">
              <div class="grid size-9 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">🍵</div>
              <div class="leading-tight">
                <div class="font-semibold">Katsumii</div>
                <div class="text-xs text-gray-400">local-first journal</div>
              </div>
            </a>

            <button
              type="button"
              class="-m-2.5 rounded-md p-2.5 text-gray-200 hover:bg-white/5"
              @click="mobileMenuOpen = false"
            >
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="size-6" aria-hidden="true" />
            </button>
          </div>

          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-white/10">
              <div class="space-y-2 py-6">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                  @click="mobileMenuOpen = false"
                >
                  {{ item.name }}
                </a>
              </div>

              <div class="py-6">
                <a
                  :href="checkoutUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold bg-teal-500 text-gray-950 hover:bg-teal-400"
                  @click="mobileMenuOpen = false"
                >
                  Jetzt starten →
                </a>
                <p class="mt-3 text-sm text-gray-400 px-3">
                  Einmalzahlung · keine Cloud · deine Daten bleiben bei dir
                </p>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>

    <!-- HERO -->
    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div
          class="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-teal-400 to-sky-500 opacity-25 sm:left-[calc(50%-30rem)] sm:w-288.75"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        ></div>
      </div>

      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div class="hidden sm:mb-8 sm:flex sm:justify-center">
          <div class="relative rounded-full px-3 py-1 text-sm/6 text-gray-300 ring-1 ring-white/10 hover:ring-white/20">
            Local-first Trading Journal: keine Cloud, kein Abo.
            <a href="#features" class="font-semibold text-teal-300">
              <span class="absolute inset-0" aria-hidden="true"></span>
              Features ansehen <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div class="text-center">
          <h1 class="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            Dein Trading –<br />
            klar. lokal. glücklich.
          </h1>

          <p class="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
            Journal deine Trades, dokumentiere Setups, tracke Regeln und analysiere Ergebnisse – ohne Cloud.
            Katsumii speichert alles lokal, damit du fokussiert besser wirst.
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

            <a href="#features" class="text-sm/6 font-semibold text-white hover:text-gray-100">
              Features <span aria-hidden="true">→</span>
            </a>
          </div>

          <p class="mt-6 text-xs text-gray-400">
            Einmalzahlung · Offline-first · Für Prop & Personal Accounts
          </p>
        </div>
      </div>

      <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div
          class="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-sky-500 to-teal-400 opacity-20 sm:left-[calc(50%+36rem)] sm:w-288.75"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        ></div>
      </div>
    </div>

    <!-- FEATURE SECTION (screenshot + bullets) -->
    <section id="features" class="overflow-hidden bg-gray-900 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div class="lg:pt-4 lg:pr-8">
            <div class="lg:max-w-lg">
              <h2 class="text-base/7 font-semibold text-teal-300">Mehr als nur ein Journal</h2>
              <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                Accounts, Regeln, Auswertung – alles an einem Ort
              </p>
              <p class="mt-6 text-lg/8 text-gray-300">
                Analysiere deine Trades, optimiere Strategien und behalte die Kontrolle – mit einer Software,
                die dir gehört. Keine Monatsgebühren. Keine Cloud. Nur du, dein Wissen und Katsumii.
              </p>

              <dl class="mt-10 max-w-xl space-y-8 text-base/7 text-gray-300 lg:max-w-none">
                <div v-for="feature in features" :key="feature.name" class="relative pl-9">
                  <dt class="inline font-semibold text-white">
                    <component :is="feature.icon" class="absolute top-1 left-1 size-5 text-teal-300" aria-hidden="true" />
                    {{ feature.name }}
                  </dt>
                  {{ ' ' }}
                  <dd class="inline text-gray-300">{{ feature.description }}</dd>
                </div>
              </dl>
            </div>
          </div>

          <img
            src="/Sc1.png"
            alt="Katsumii screenshot"
            class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-[57rem] mt-12 md:-ml-4 lg:-ml-0"
            width="2432"
            height="1442"
          />
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="bg-gray-900">
      <div class="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div
          class="relative isolate overflow-hidden bg-gray-800 px-6 pt-16 ring-1 ring-white/10 sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0"
        >
          <svg
            viewBox="0 0 1024 1024"
            class="absolute top-1/2 left-1/2 -z-10 size-256 -translate-y-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle cx="512" cy="512" r="512" fill="url(#katsuGradient)" fill-opacity="0.55" />
            <defs>
              <radialGradient id="katsuGradient">
                <stop stop-color="#2dd4bf" />
                <stop offset="1" stop-color="#38bdf8" />
              </radialGradient>
            </defs>
          </svg>

          <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 class="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
              Mehr Klarheit in deinen Trades — ab heute.
            </h2>
            <p class="mt-6 text-lg/8 text-pretty text-gray-300">
              Starte mit Katsumii und baue ein Journal, das du wirklich nutzt: schnell, ruhig, lokal gespeichert.
              Perfekt für Prop- und Personal-Accounts.
            </p>

            <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                :href="checkoutUrl"
                target="_blank"
                rel="noreferrer"
                class="rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-gray-950 shadow-xs hover:bg-teal-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
              >
                Katsumii kaufen →
              </a>
              <a href="#pricing" class="text-sm/6 font-semibold text-white hover:text-gray-100">
                Preise ansehen <span aria-hidden="true">→</span>
              </a>
            </div>

            <p class="mt-4 text-xs text-gray-400">Checkout über Lemonsqueezy · Einmalzahlung · Sofort download</p>
          </div>

          <div class="relative mt-16 h-80 lg:mt-8">
            <img
              class="absolute top-0 left-0 w-[45rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src="/Sc2.png"
              alt="Katsumii screenshot"
              width="1824"
              height="1080"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- PRICING -->
    <section id="pricing" class="relative isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-base/7 font-semibold text-teal-300">Preise</h2>
        <p class="mt-2 text-5xl font-semibold tracking-tight text-balance text-white sm:text-6xl">
          Einmal zahlen. Für immer nutzen.
        </p>
      </div>

      <p class="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
        Keine monatlichen Gebühren, keine Cloud-Abhängigkeit. Du kaufst eine Lizenz — Katsumii gehört dir.
      </p>

      <div class="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        <div
          v-for="(tier, tierIdx) in tiers"
          :key="tier.id"
          :class="[
            tier.featured ? 'relative bg-gray-800' : 'bg-white/2.5 sm:mx-8 lg:mx-0',
            tier.featured ? '' : tierIdx === 0 ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl' : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
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
            Empfehlung: Für aktive Trader, die aus Daten klare Regeln machen wollen.
          </p>
        </div>
      </div>

      <div class="mx-auto mt-10 max-w-2xl text-center text-sm text-gray-400">
        Bezahlung &amp; Lizenzabwicklung über Lemonsqueezy. Sofort-Download nach dem Kauf.
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { Dialog, DialogPanel } from "@headlessui/vue"
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline"
import { CheckIcon } from "@heroicons/vue/20/solid"
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from "@heroicons/vue/20/solid"

/**
 * TODO: set your real checkout links (Lemonsqueezy)
 */
const checkoutUrl = "#" // primary CTA (e.g. Pro plan)

const navigation = [
  { name: "Features", href: "#features" },
  { name: "Screenshots", href: "#features" },
  { name: "Preise", href: "#pricing" },
]

const mobileMenuOpen = ref(false)

const features = [
  {
    name: "Accounts im Blick",
    description: "Verwalte Prop- und Personal-Accounts in einer klaren Übersicht.",
    icon: ServerIcon,
  },
  {
    name: "Strategien dokumentieren",
    description: "Regeln, Setups und Marktnotizen sauber festhalten — konsistent traden.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Analyse, die zählt",
    description: "Sieh, was funktioniert: Winrate, R-Multiples, Erwartungswert & mehr.",
    icon: LockClosedIcon,
  },
]

const tiers = [
  {
    name: "Light",
    id: "tier-light",
    href: "#",
    price: "49 €",
    description: "Für alle, die ein sauberes Journal wollen — ohne Overkill.",
    features: ["Trade-Journal + Screenshots", "Basis-Auswertung", "Lifetime-Lizenz (einmalig)"],
    featured: false,
  },
  {
    name: "Professional",
    id: "tier-pro",
    href: "#",
    price: "89 €",
    description: "Für aktive Trader, die Regeln testen und Performance wirklich messen wollen.",
    features: ["Alles aus Light", "Kategorien, Tags & Filter", "Erweiterte Auswertung", "Priorisierter Support"],
    featured: true,
  },
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}
</script>