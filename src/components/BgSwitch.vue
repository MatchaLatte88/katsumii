<template>
  <Menu as="div" class="relative">
    <MenuButton
      :class="[
        'flex items-center gap-1 rounded-xl px-2 py-1 text-xs font-semibold uppercase tracking-widest transition-all duration-200',
        theme === 'light'
          ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          : 'text-slate-300 hover:bg-slate-800/80 hover:text-slate-100'
      ]"
      :title="selectedOption?.label ?? 'Background'"
    >
      <SwatchIcon class="h-4 w-4" />
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
import { SwatchIcon } from "@heroicons/vue/24/outline"

const props = defineProps({
  theme:      { type: String, default: "light" },
  modelValue: { type: String, default: "lines" },
})

const emit = defineEmits(["update:modelValue"])

const OPTIONS = [
  { value: "honeycomb", label: "Honeycomb" },
  { value: "lines",     label: "Lines"     },
]

const selectedOption = computed(() =>
  OPTIONS.find((option) => option.value === props.modelValue)
)

const select = (val) => {
  emit("update:modelValue", val)
}
</script>
