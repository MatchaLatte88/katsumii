<!-- components/AppNav.vue -->
<template>
  <Disclosure
    as="nav"
    class="sticky top-0 z-50 ring-1 ring-white/10 border-b border-white/10
           bg-gray-900/80 supports-[backdrop-filter]:bg-gray-900/60 backdrop-blur"
    v-slot="{ open }"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Brand -->
        <a :href="brandHref" class="flex items-center gap-3">
          <div class="size-9 rounded-xl bg-white/5 ring-1 ring-white/10 grid place-items-center">
            <span class="text-sm font-semibold text-teal-300">K</span>
          </div>
          <div class="leading-tight">
            <div class="text-sm font-semibold">{{ brandTitle }}</div>
            <div class="text-xs text-gray-400">{{ brandSubtitle }}</div>
          </div>
        </a>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center gap-2">
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
          >
            {{ item.name }}
          </a>

          <a
            v-if="cta"
            :href="cta.href"
            target="_blank"
            rel="noreferrer"
            class="ml-2 rounded-md bg-teal-500 px-3.5 py-2 text-sm font-semibold text-gray-950 shadow-xs hover:bg-teal-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
          >
            {{ cta.label }}
          </a>
        </div>

        <!-- Mobile menu button -->
        <div class="-mr-2 flex md:hidden">
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-white/5 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-teal-500"
          >
            <span class="sr-only">Menü öffnen</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <!-- Mobile panel -->
    <DisclosurePanel class="md:hidden">
      <div class="space-y-1 px-4 py-3">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
        >
          {{ item.name }}
        </a>

        <a
          v-if="cta"
          :href="cta.href"
          target="_blank"
          rel="noreferrer"
          class="mt-2 block rounded-md bg-teal-500 px-3.5 py-2.5 text-center text-base font-semibold text-gray-950 hover:bg-teal-400"
        >
          {{ cta.label }}
        </a>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue"
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline"

defineProps({
  brandTitle: { type: String, default: "Katsumii" },
  brandSubtitle: { type: String, default: "Offline Prop Trading Journal" },
  brandHref: { type: String, default: "#top" },
  navigation: {
    type: Array,
    default: () => [
      { name: "Features", href: "#features" },
      { name: "Screens", href: "#screens" },
      { name: "Lizenz", href: "#pricing" },
    ],
  },
  cta: {
    type: Object,
    default: () => ({ label: "Lizenz kaufen", href: "#" }),
  },
})
</script>