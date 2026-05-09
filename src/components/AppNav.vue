<!-- components/AppNav.vue -->
<template>
  <Disclosure
    as="nav"
    :class="[
      'fixed inset-x-0 top-0 z-[60] px-3 pt-3',
      theme === 'light'
        ? 'bg-transparent'
        : 'bg-transparent'
    ]"
    v-slot="{ open }"
  >
    <div
      :class="[
        'nav-shell mx-auto max-w-7xl rounded-[1.35rem] border px-3 sm:px-4',
        theme === 'light'
          ? 'nav-shell-light border-white/70 bg-white/62 shadow-[0_18px_60px_-32px_rgba(15,23,42,0.35)] supports-[backdrop-filter]:bg-white/45'
          : 'nav-shell-dark border-cyan-300/20 bg-slate-950/62 shadow-[0_20px_70px_-34px_rgba(0,0,0,0.76)] supports-[backdrop-filter]:bg-slate-950/45'
      ]"
    >
      <div class="relative flex h-16 items-center justify-between gap-3">
        <component
          :is="isRouteLink(brandHref) ? 'RouterLink' : 'a'"
          :to="isRouteLink(brandHref) ? brandHref : undefined"
          :href="isRouteLink(brandHref) ? undefined : brandHref"
          class="group flex items-center gap-3"
        >
          <div class="brand-mark size-11 overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-[1.04]">
            <img :src="assetUrl('logo.png')" alt="Katsumii Logo" class="h-full w-full object-contain" />
          </div>
          <div class="brand-copy leading-tight">
            <div
              :class="[
                'text-lg font-medium tracking-tight transition-colors duration-300 sm:text-xl',
                theme === 'light' ? 'text-gray-900 group-hover:text-gray-950' : 'text-slate-100 group-hover:text-cyan-200'
              ]"
            >
              {{ brandTitle }}
            </div>
            <div :class="['text-xs', theme === 'light' ? 'text-gray-500' : 'text-slate-400']">
              {{ brandSubtitle }}
            </div>
          </div>
        </component>

        <div class="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border px-1.5 py-1 lg:flex"
          :class="theme === 'light' ? 'border-gray-200/75 bg-white/44' : 'border-cyan-300/12 bg-white/[0.03]'"
        >
          <component
            v-for="item in visibleNavigation"
            :key="item.name"
            :is="isRouteLink(item.href) ? 'RouterLink' : 'a'"
            :to="isRouteLink(item.href) ? item.href : undefined"
            :href="isRouteLink(item.href) ? undefined : item.href"
            :class="[
              isTopLink(item)
                ? 'inline-flex h-9 w-9 items-center justify-center rounded-full p-0 transition-all duration-300'
                : 'rounded-full px-3.5 py-2 text-sm font-semibold tracking-tight transition-all duration-300',
              theme === 'light' ? 'text-gray-600 hover:bg-white hover:text-gray-950 hover:shadow-sm' : 'text-slate-300/90 hover:bg-cyan-300/10 hover:text-cyan-100'
            ]"
            :aria-label="isTopLink(item) ? item.name : undefined"
            :title="isTopLink(item) ? item.name : undefined"
          >
            <ArrowUpIcon v-if="isTopLink(item)" class="h-4 w-4" aria-hidden="true" />
            <span v-if="isTopLink(item)" class="sr-only">{{ item.name }}</span>
            <template v-else>{{ item.name }}</template>
          </component>
        </div>

        <div class="nav-actions flex items-center gap-0.5">
          <LangSwitch :theme="theme" />

          <BgSwitch :theme="theme" :model-value="bg" @update:model-value="emit('change-bg', $event)" />

          <div class="theme-switch-wrap ml-1.5">
            <DarkLightSwitch :is-dark="theme === 'dark'" @toggle="emit('toggle-theme')" />
          </div>

          <div class="-mr-2 flex lg:hidden">
            <DisclosureButton
              :class="[
              'relative inline-flex items-center justify-center rounded-xl p-2 focus:outline-2 focus:outline-offset-2 transition-all duration-300',
                theme === 'light'
                  ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-teal-600'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-slate-100 focus:outline-cyan-400'
              ]"
            >
              <span class="sr-only">Open menu</span>
              <Bars3Icon v-if="!open" class="block size-6 transition-transform duration-300" aria-hidden="true" />
              <XMarkIcon v-else class="block size-6 transition-transform duration-300" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel
      :class="[
        'mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border lg:hidden',
        theme === 'light'
          ? 'border-gray-200 bg-white'
          : 'border-blue-400/25 bg-slate-900'
      ]"
    >
      <div class="space-y-1 px-4 py-3">
        <component
          v-for="item in visibleNavigation"
          :key="item.name"
          :is="isRouteLink(item.href) ? 'RouterLink' : 'a'"
          :to="isRouteLink(item.href) ? item.href : undefined"
          :href="isRouteLink(item.href) ? undefined : item.href"
          :class="[
            isTopLink(item)
              ? 'flex h-11 items-center justify-center rounded-xl px-3 py-2.5 transition-all duration-300 hover:translate-x-0.5'
              : 'block rounded-xl px-3 py-2.5 text-base font-semibold transition-all duration-300 hover:translate-x-0.5',
            theme === 'light' ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900' : 'text-slate-300 hover:bg-slate-800/80 hover:text-cyan-200'
          ]"
          :aria-label="isTopLink(item) ? item.name : undefined"
          :title="isTopLink(item) ? item.name : undefined"
        >
          <ArrowUpIcon v-if="isTopLink(item)" class="h-5 w-5" aria-hidden="true" />
          <span v-if="isTopLink(item)" class="sr-only">{{ item.name }}</span>
          <template v-else>{{ item.name }}</template>
        </component>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue"
import { ArrowUpIcon, Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline"
import DarkLightSwitch from "./DarkLightSwitch.vue"
import LangSwitch from "./LangSwitch.vue"
import BgSwitch from "./BgSwitch.vue"

const emit = defineEmits(["toggle-theme", "change-bg"])
const baseUrl = import.meta.env.BASE_URL
const assetUrl = (path) => `${baseUrl}${path.replace(/^\/+/, "")}`

const props = defineProps({
  theme: { type: String, default: "light" },
  bg:    { type: String, default: "lines" },
  brandTitle: { type: String, default: "Katsumii" },
  brandSubtitle: { type: String, default: "Offline Trading Journal" },
  brandHref: { type: String, default: "#top" },
  navigation: {
    type: Array,
    default: () => [
      { name: "Features", href: "/features" },
      { name: "Screens", href: "#screens" },
      { name: "License", href: "/pricing" },
    ],
  },
})

const hasScrolled = ref(false)
const isTopLink = (item) => item?.href === "#top"
const isRouteLink = (href) => Boolean(href?.startsWith("/") && !href.startsWith("//") && !href.includes("#"))
const visibleNavigation = computed(() =>
  props.navigation.filter((item) => !isTopLink(item) || hasScrolled.value)
)

const updateScrollState = () => {
  hasScrolled.value = window.scrollY > 140
}

onMounted(() => {
  updateScrollState()
  window.addEventListener("scroll", updateScrollState, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollState)
})
</script>

<style scoped>
.nav-shell {
  backdrop-filter: blur(22px) saturate(175%);
  animation: nav-fade-in 360ms ease-out;
}

.brand-mark {
  filter: drop-shadow(0 10px 18px rgba(15, 118, 110, 0.16));
}

:deep(a),
:deep(button),
:deep([role="button"]) {
  cursor: pointer;
  user-select: none;
}

:deep(a *),
:deep(button *),
:deep([role="button"] *) {
  cursor: inherit;
}

.theme-switch-wrap {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

@keyframes nav-fade-in {
  0% {
    opacity: 0;
    transform: translateY(-8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1120px) {
  .nav-shell {
    max-width: calc(100vw - 1.5rem);
  }
}

@media (max-width: 1023px) {
  .nav-shell-light {
    background-color: rgba(255, 255, 255, 0.96) !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
  .nav-shell-dark {
    background-color: rgba(2, 6, 23, 0.97) !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
}

@media (max-width: 520px) {
  .brand-copy div:last-child {
    display: none;
  }


}

@media (max-width: 420px) {
  .brand-copy {
    display: none;
  }

  .nav-actions {
    gap: 0.125rem;
  }
}
</style>










