<template>
  <button
    class="toggle-track"
    :class="isDark ? 'track-night' : 'track-day'"
    @click="toggle"
    :aria-pressed="isDark"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    type="button"
  >
    <transition name="fade-scene">
      <div v-if="!isDark" class="scene-fill day-scene" key="day">
        <div class="sky-layer sky-1" />
        <div class="sky-layer sky-2" />

        <div class="sun" :class="{ 'sun-enter': sunEnter }">
          <div class="sun-core" />
        </div>

        <div class="cloud cloud-a" :class="{ 'cloud-slide': !isDark }">
          <div class="cloud-puff puff-1" />
          <div class="cloud-puff puff-2" />
          <div class="cloud-puff puff-3" />
        </div>
        <div class="cloud cloud-b" :class="{ 'cloud-slide-b': !isDark }">
          <div class="cloud-puff puff-b1" />
          <div class="cloud-puff puff-b2" />
        </div>
      </div>
    </transition>

    <transition name="fade-scene">
      <div v-if="isDark" class="scene-fill night-scene" key="night">
        <div
          v-for="star in stars"
          :key="star.id"
          class="star"
          :style="{
            left: star.x + '%',
            top: star.y + '%',
            width: star.size + 'px',
            height: star.size + 'px',
            animationDelay: star.delay + 's',
            animationDuration: star.duration + 's',
          }"
        />
      </div>
    </transition>

    <div class="knob-wrapper" :class="isDark ? 'knob-right' : 'knob-left'">
      <div v-if="!isDark" class="knob knob-day">
        <div class="knob-sun-core" />
        <div class="knob-sun-ring" />
      </div>
      <div v-else class="knob knob-night">
        <div class="moon-face">
          <div class="crater crater-a" />
          <div class="crater crater-b" />
          <div class="crater crater-c" />
        </div>
        <div class="moon-shine" />
      </div>
    </div>
  </button>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  isDark: { type: Boolean, default: false },
})
const emit = defineEmits(['toggle'])

const sunEnter = ref(false)
const stars = ref([])

function generateStars() {
  const s = []
  for (let i = 0; i < 20; i++) {
    s.push({
      id: i,
      x: Math.random() * 78,
      y: Math.random() * 90,
      size: Math.random() * 2.4 + 1.2,
      delay: Math.random() * 3,
      duration: 1.5 + Math.random() * 2,
    })
  }
  stars.value = s
}

function triggerSunEntrance() {
  sunEnter.value = false
  setTimeout(() => { sunEnter.value = true }, 30)
  setTimeout(() => { sunEnter.value = false }, 520)
}

function toggle() {
  emit('toggle')
}

watch(() => props.isDark, (next, prev) => {
  if (prev && !next) triggerSunEntrance()
})

onMounted(() => {
  generateStars()
  if (!props.isDark) triggerSunEntrance()
})
</script>

<style scoped>
.toggle-track {
  position: relative;
  display: block;
  width: 100px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  overflow: hidden;
  outline: none;
  padding: 0;
  background: transparent;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease;
}

.toggle-track:hover {
  transform: translateY(-1px);
}

.toggle-track:focus-visible {
  border-color: rgba(34, 211, 238, 0.55);
  box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.18);
}

.track-day {
  border-color: rgba(120, 185, 230, 0.4);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 12px -4px rgba(34,160,220,0.25);
}

.track-night {
  border-color: rgba(34, 211, 238, 0.18);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 12px -4px rgba(0,0,0,0.4);
}

/* ── Scenes ── */
.scene-fill {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  overflow: hidden;
}

.day-scene {
  background: #74bdf0;
}

.sky-layer {
  position: absolute;
  inset: 0;
  border-radius: 999px;
}

.sky-1 {
  background: linear-gradient(135deg, #5aaee8 0%, #a2d4f8 60%, #d6ecfb 100%);
}

.sky-2 {
  background: radial-gradient(ellipse at 72% 18%, rgba(210,240,255,0.5) 0%, transparent 62%);
}

.night-scene {
  background: radial-gradient(ellipse at 32% 50%, #0d1a3a 0%, #070f20 70%, #020617 100%);
}

/* ── Sun ── */
.sun {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%) scale(0.72);
  opacity: 0;
  transition: transform 0.42s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.28s ease;
  width: 22px;
  height: 22px;
}

.sun-enter {
  transform: translateY(-50%) scale(1);
  opacity: 1;
}

.sun-core {
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #fff3a8, #f5b02e 65%, #ea8d1e);
}

/* ── Clouds ── */
.cloud {
  position: absolute;
  transition: transform 0.58s cubic-bezier(0.34, 1.3, 0.64, 1), opacity 0.42s ease;
}

.cloud-a {
  width: 38px;
  height: 18px;
  right: 5px;
  top: 5px;
  transform: translateX(43px);
  opacity: 0;
}

.cloud-slide { transform: translateX(0) !important; opacity: 1 !important; }

.cloud-b {
  width: 26px;
  height: 14px;
  right: 13px;
  bottom: 4px;
  transform: translateX(31px);
  opacity: 0;
  transition-delay: 0.05s;
}

.cloud-slide-b { transform: translateX(0) !important; opacity: 1 !important; }

.cloud-puff {
  position: absolute;
  background: rgba(255, 255, 255, 0.93);
  border-radius: 50%;
}

/* Cloud A – breite Basis + zwei runde Buckel oben */
.puff-1  { width: 38px; height: 11px; left: 0; bottom: 0; border-radius: 6px; }
.puff-2  { width: 18px; height: 18px; left: 5px;  top: 0; }
.puff-3  { width: 13px; height: 13px; left: 20px; top: 3px; }

/* Cloud B – schmale Basis + ein Buckel oben */
.puff-b1 { width: 26px; height: 9px;  left: 0; bottom: 0; border-radius: 5px; background: rgba(255,255,255,0.90); }
.puff-b2 { width: 15px; height: 15px; left: 5px;  top: 0; background: rgba(255,255,255,0.90); }

/* ── Stars ── */
.star {
  position: absolute;
  border-radius: 50%;
  background: rgba(200, 230, 255, 0.92);
  animation: twinkle var(--dur, 2s) ease-in-out infinite;
  box-shadow: 0 0 4px rgba(34, 211, 238, 0.55);
}

@keyframes twinkle {
  0%, 100% { opacity: 0.15; transform: scale(0.65); }
  50%       { opacity: 1;    transform: scale(1.2); }
}

/* ── Knob ── */
.knob-wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: left 0.46s cubic-bezier(0.34, 1.3, 0.64, 1);
  z-index: 10;
}

.knob-left  { left: 5px; }
.knob-right { left: calc(100% - 35px); }

.knob {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}

/* Sun knob */
.knob-day {
  background: radial-gradient(circle at 38% 35%, #ffe986, #f5a623 58%, #e38925);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.18),
    inset 0 -2px 6px rgba(180, 80, 0, 0.22),
    inset 0 2px 6px rgba(255, 240, 180, 0.34);
}

.knob-sun-core {
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, rgba(255, 255, 210, 0.6), transparent 60%);
}

.knob-sun-ring {
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 220, 100, 0.22);
  animation: spin-ring 7s linear infinite;
}

@keyframes spin-ring {
  to { transform: rotate(360deg); }
}

/* Moon knob */
.knob-night {
  background: radial-gradient(circle at 40% 35%, #d8ddf0, #a8aec4 55%, #8890a8);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.28),
    inset 0 -3px 8px rgba(0, 0, 40, 0.22),
    inset 0 2px 6px rgba(255, 255, 255, 0.14);
}

.moon-face {
  position: absolute;
  inset: 0;
  border-radius: 50%;
}

.crater {
  position: absolute;
  border-radius: 50%;
  background: rgba(100, 110, 135, 0.45);
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.2), inset -1px -1px 1px rgba(255, 255, 255, 0.07);
}

.crater-a { width: 7px; height: 5px; top: 8px;  left: 9px; }
.crater-b { width: 5px; height: 4px; top: 16px; left: 17px; }
.crater-c { width: 3px; height: 3px; top: 6px;  left: 19px; }

.moon-shine {
  position: absolute;
  top: 3px;
  left: 4px;
  width: 8px;
  height: 5px;
  border-radius: 50%;
  background: rgba(34, 211, 238, 0.12);
  transform: rotate(-30deg);
  filter: blur(2px);
}

/* ── Transitions ── */
.fade-scene-enter-active { transition: opacity 0.35s ease 0.06s; }
.fade-scene-leave-active { transition: opacity 0.22s ease; }
.fade-scene-enter-from,
.fade-scene-leave-to     { opacity: 0; }
</style>
