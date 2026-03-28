<template>
  <Menu as="div" class="relative">
    <MenuButton
      :class="[
        'flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-semibold uppercase tracking-widest transition-all duration-200',
        theme === 'light'
          ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          : 'text-slate-300 hover:bg-slate-800/80 hover:text-slate-100'
      ]"
      :title="OPTIONS.find(o => o.value === modelValue)?.label ?? 'Background'"
    >
      <SunIcon        v-if="modelValue === 'sky'"           class="h-4 w-4" />
      <SparklesIcon   v-else-if="modelValue === 'seasonal' || modelValue === 'stars'" class="h-4 w-4" />
      <ArrowPathIcon  v-else-if="modelValue === 'lines'"     class="h-4 w-4" />
      <Squares2X2Icon v-else class="h-4 w-4" />
    </MenuButton>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <MenuItems
        :class="[
          'absolute right-0 mt-1 w-36 origin-top-right rounded-xl border py-1 shadow-lg focus:outline-none',
          theme === 'light'
            ? 'border-gray-200 bg-white/95 shadow-gray-200/60'
            : 'border-blue-400/25 bg-slate-900/95 shadow-black/40'
        ]"
      >
        <MenuItem
          v-for="option in OPTIONS"
          :key="option.value"
          v-slot="{ active }"
        >
          <button
            @click="select(option.value)"
            :class="[
              'flex w-full items-center gap-2.5 px-3 py-2 text-xs font-semibold transition-colors duration-150',
              modelValue === option.value
                ? theme === 'light' ? 'text-teal-700' : 'text-cyan-300'
                : theme === 'light'
                  ? active ? 'bg-gray-50 text-gray-900' : 'text-gray-600'
                  : active ? 'bg-slate-800/60 text-slate-100' : 'text-slate-400'
            ]"
          >
            <span class="w-4 text-center flex-shrink-0">{{ modelValue === option.value ? '✓' : '' }}</span>
            <component :is="option.icon" class="h-3.5 w-3.5 flex-shrink-0" />
            {{ option.label }}
          </button>
        </MenuItem>
      </MenuItems>
    </Transition>
  </Menu>
</template>

<script setup>
import { computed } from "vue"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue"
import { SparklesIcon, Squares2X2Icon, ArrowPathIcon, SunIcon } from "@heroicons/vue/24/outline"

const props = defineProps({
  theme:      { type: String, default: "light" },
  modelValue: { type: String, default: "honeycomb" },
})

const emit = defineEmits(["update:modelValue"])

const ALL_OPTIONS = [
  { value: "honeycomb", label: "Honeycomb", icon: Squares2X2Icon },
  { value: "stars",     label: "Stars",     icon: SparklesIcon,  darkOnly: true },
  { value: "lines",     label: "Lines",     icon: ArrowPathIcon  },
  { value: "sky",       label: "Rain",      icon: SunIcon        },
  { value: "seasonal",  label: "Seasonal",  icon: SparklesIcon   },
]

const OPTIONS = computed(() =>
  ALL_OPTIONS.filter(o => !o.darkOnly || props.theme === "dark")
)

const select = (val) => {
  localStorage.setItem("katsumii-bg", val)
  emit("update:modelValue", val)
}
</script>
