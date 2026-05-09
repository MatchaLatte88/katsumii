<template>
  <button
    type="button"
    class="toggle-track"
    :class="isDark ? 'track-dark' : 'track-light'"
    :aria-pressed="isDark"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="emit('toggle')"
  >
    <span class="knob" :class="isDark ? 'knob-right' : 'knob-left'">
      <Transition name="icon-swap" mode="out-in">
        <SunIcon v-if="!isDark" key="sun" class="icon" />
        <MoonIcon v-else key="moon" class="icon" />
      </Transition>
    </span>
  </button>
</template>

<script setup>
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'

defineProps({ isDark: { type: Boolean, default: false } })
const emit = defineEmits(['toggle'])
</script>

<style scoped>
.toggle-track {
  position: relative;
  display: inline-flex;
  width: 42px;
  height: 22px;
  border-radius: 999px;
  border: none;
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
  transition:
    background 320ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 320ms ease;
}

.track-light {
  background: linear-gradient(135deg, #14b3a2 0%, #22d3ee 100%);
  box-shadow:
    inset 0 0 0 1px rgba(15, 159, 143, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.track-dark {
  background: linear-gradient(135deg, #0b1624 0%, #111f33 100%);
  box-shadow:
    inset 0 0 0 1px rgba(34, 211, 238, 0.18),
    inset 0 1px 0 rgba(34, 211, 238, 0.06);
}

.toggle-track:hover.track-light {
  box-shadow:
    inset 0 0 0 1px rgba(15, 159, 143, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
}

.toggle-track:hover.track-dark {
  box-shadow:
    inset 0 0 0 1px rgba(34, 211, 238, 0.32),
    inset 0 1px 0 rgba(34, 211, 238, 0.12);
}

.toggle-track:focus-visible {
  outline: 2px solid rgba(15, 159, 143, 0.45);
  outline-offset: 2px;
}

.toggle-track:active .knob {
  transform: scaleX(1.1);
}

.knob {
  position: absolute;
  top: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 1px 2px rgba(2, 6, 23, 0.20),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  transition:
    left 320ms cubic-bezier(0.34, 1.25, 0.64, 1),
    transform 160ms cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.knob-left  { left: 2px; }
.knob-right { left: 22px; }

.icon {
  width: 11px;
  height: 11px;
  display: block;
  position: relative;
  z-index: 1;
}

.track-light .icon {
  color: #0f9f8f;
}

.track-dark .icon {
  color: #67e8f9;
}

.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}

.icon-swap-enter-from {
  opacity: 0;
  transform: scale(0.55) rotate(-40deg);
}

.icon-swap-leave-to {
  opacity: 0;
  transform: scale(0.55) rotate(40deg);
}

@media (prefers-reduced-motion: reduce) {
  .toggle-track,
  .knob,
  .icon-swap-enter-active,
  .icon-swap-leave-active {
    transition-duration: 0.01ms !important;
  }
  .toggle-track:active .knob {
    transform: none;
  }
}
</style>
