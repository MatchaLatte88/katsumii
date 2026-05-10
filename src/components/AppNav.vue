<!-- components/AppNav.vue -->
<template>
  <Disclosure
    as="nav"
    class="fixed inset-x-0 top-0 z-[60]"
    v-slot="{ open }"
  >
    <div
      :class="[
        'nav-shell w-full border-b px-0',
        isDark
          ? 'nav-shell-dark border-cyan-300/18 bg-slate-950/74 shadow-[0_18px_54px_-34px_rgba(0,0,0,0.82)] supports-[backdrop-filter]:bg-slate-950/58'
          : 'nav-shell-light border-white/72 bg-white/78 shadow-[0_16px_48px_-34px_rgba(15,23,42,0.36)] supports-[backdrop-filter]:bg-white/60'
      ]"
    >
      <div class="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-3 sm:px-4">
        <component
          :is="isRouteLink(brandHref) ? 'RouterLink' : 'a'"
          :to="isRouteLink(brandHref) ? brandHref : undefined"
          :href="isRouteLink(brandHref) ? undefined : brandHref"
          class="group flex items-center gap-3"
        >
          <div class="brand-mark size-11 overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-[1.04]">
            <img :src="assetUrl('logo.png')" :alt="t('common.alts.logo')" class="h-full w-full object-contain" />
          </div>
          <div class="brand-copy leading-tight">
            <div
              :class="[
                'text-lg font-medium tracking-tight transition-colors duration-300 sm:text-xl',
                isDark ? 'text-slate-100 group-hover:text-cyan-200' : 'text-gray-900 group-hover:text-gray-950'
              ]"
            >
              {{ brandTitle }}
            </div>
            <div :class="['text-xs', isDark ? 'text-slate-400' : 'text-gray-500']">
              {{ brandSubtitle }}
            </div>
          </div>
        </component>

        <div class="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border px-1.5 py-1 lg:flex"
          :class="isDark ? 'border-cyan-300/12 bg-white/[0.03]' : 'border-gray-200/75 bg-white/44'"
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
              isDark ? 'text-slate-300/90 hover:bg-cyan-300/10 hover:text-cyan-100' : 'text-gray-600 hover:bg-white hover:text-gray-950 hover:shadow-sm'
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
          <LangSwitch />

          <BgSwitch />

          <div class="theme-switch-wrap ml-1.5">
            <DarkLightSwitch :is-dark="isDark" @toggle="toggleTheme()" />
          </div>

          <div class="-mr-2 flex lg:hidden">
            <DisclosureButton
              :class="[
              'relative inline-flex items-center justify-center rounded-xl p-2 focus:outline-2 focus:outline-offset-2 transition-all duration-300',
                isDark
                  ? 'text-slate-300 hover:bg-slate-800/80 hover:text-slate-100 focus:outline-cyan-400'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-teal-600'
              ]"
            >
              <span class="sr-only">{{ t('common.aria.openMenu') }}</span>
              <Bars3Icon v-if="!open" class="block size-6 transition-transform duration-300" aria-hidden="true" />
              <XMarkIcon v-else class="block size-6 transition-transform duration-300" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel
      :class="[
        'overflow-hidden border-b lg:hidden',
        isDark
          ? 'border-blue-400/22 bg-slate-950/98'
          : 'border-gray-200 bg-white/98'
      ]"
    >
      <div class="mx-auto max-w-7xl space-y-1 px-4 py-3">
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
            isDark ? 'text-slate-300 hover:bg-slate-800/80 hover:text-cyan-200' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
import { computed, inject, onMounted, onUnmounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue"
import { ArrowUpIcon, Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline"
import DarkLightSwitch from "./DarkLightSwitch.vue"
import LangSwitch from "./LangSwitch.vue"
import BgSwitch from "./BgSwitch.vue"

const isDark = inject("isDark")
const toggleTheme = inject("toggleTheme")
const { t } = useI18n()

const baseUrl = import.meta.env.BASE_URL
const assetUrl = (path) => `${baseUrl}${path.replace(/^\/+/, "")}`

const props = defineProps({
  brandTitle:    { type: String, default: "Katsumii" },
  brandSubtitle: { type: String, default: "Offline Trading Journal" },
  brandHref:     { type: String, default: "#top" },
  navigation: {
    type: Array,
    default: () => [],
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
