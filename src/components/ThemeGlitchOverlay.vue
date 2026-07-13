<template>
  <div
    class="theme-glitch"
    :class="`theme-glitch--to-${targetTheme}`"
    aria-hidden="true"
  >
    <span v-for="slice in 6" :key="slice" class="theme-glitch__slice" />
    <span class="theme-glitch__scanlines" />
    <span class="theme-glitch__flash" />
  </div>
</template>

<script setup>
defineProps({
  targetTheme: {
    type: String,
    default: "dark",
    validator: (value) => value === "light" || value === "dark",
  },
})
</script>

<style scoped>
.theme-glitch {
  --glitch-cyan: rgba(34, 211, 238, 0.42);
  --glitch-ember: rgba(249, 115, 22, 0.34);
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  overflow: hidden;
  pointer-events: none;
  isolation: isolate;
  background:
    linear-gradient(90deg, var(--glitch-ember), transparent 13% 82%, var(--glitch-cyan)),
    rgba(3, 10, 18, 0.08);
  background-blend-mode: screen;
  animation: theme-glitch-gate 720ms steps(1, end) both;
}

.theme-glitch--to-light {
  --glitch-cyan: rgba(8, 145, 178, 0.36);
  --glitch-ember: rgba(234, 88, 12, 0.28);
}

.theme-glitch__slice {
  position: absolute;
  left: -5%;
  width: 110%;
  height: var(--slice-h);
  top: var(--slice-y);
  opacity: 0;
  background: linear-gradient(90deg, transparent 2%, var(--slice-color) 12%, transparent 46% 72%, var(--slice-color) 92%);
  backdrop-filter: hue-rotate(var(--slice-hue)) saturate(1.8) contrast(1.18);
  -webkit-backdrop-filter: hue-rotate(var(--slice-hue)) saturate(1.8) contrast(1.18);
  box-shadow: 0 0 18px color-mix(in srgb, var(--slice-color) 55%, transparent);
  animation: theme-glitch-slice 680ms steps(2, jump-none) both;
}

.theme-glitch__slice:nth-child(1) { --slice-y: 7%;  --slice-h: 6%;  --slice-x: -3.5%; --slice-hue: 28deg;  --slice-color: var(--glitch-cyan); animation-delay: 22ms; }
.theme-glitch__slice:nth-child(2) { --slice-y: 23%; --slice-h: 2%;  --slice-x: 5%;    --slice-hue: -34deg; --slice-color: var(--glitch-ember); animation-delay: 70ms; }
.theme-glitch__slice:nth-child(3) { --slice-y: 39%; --slice-h: 11%; --slice-x: -2%;   --slice-hue: 42deg;  --slice-color: var(--glitch-cyan); animation-delay: 8ms; }
.theme-glitch__slice:nth-child(4) { --slice-y: 58%; --slice-h: 3%;  --slice-x: 4%;    --slice-hue: -22deg; --slice-color: var(--glitch-ember); animation-delay: 112ms; }
.theme-glitch__slice:nth-child(5) { --slice-y: 72%; --slice-h: 8%;  --slice-x: -4%;   --slice-hue: 35deg;  --slice-color: var(--glitch-cyan); animation-delay: 48ms; }
.theme-glitch__slice:nth-child(6) { --slice-y: 91%; --slice-h: 2%;  --slice-x: 3%;    --slice-hue: -40deg; --slice-color: var(--glitch-ember); animation-delay: 88ms; }

.theme-glitch__scanlines {
  position: absolute;
  inset: 0;
  opacity: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 2px,
    rgba(255, 255, 255, 0.08) 3px,
    rgba(2, 8, 16, 0.14) 4px
  );
  mix-blend-mode: overlay;
  animation: theme-glitch-scanlines 720ms linear both;
}

.theme-glitch__flash {
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.16) 46%, var(--glitch-cyan) 50%, transparent 55%);
  transform: translateX(-120%);
  mix-blend-mode: screen;
  animation: theme-glitch-flash 720ms cubic-bezier(0.65, 0, 0.35, 1) both;
}

:global(html.theme-glitching) {
  overflow-x: hidden;
}

:global(html.theme-glitching #app > :not(.theme-glitch)) {
  animation: theme-glitch-viewport 720ms steps(1, end) both;
}

@keyframes theme-glitch-gate {
  0% { opacity: 0; }
  3%, 82% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes theme-glitch-viewport {
  0%, 100% { transform: none; filter: none; }
  8% { transform: translateX(-3px) skewX(-0.25deg); filter: contrast(1.08); }
  14% { transform: translateX(4px); filter: saturate(1.35); }
  21% { transform: translateX(-2px); filter: hue-rotate(7deg) contrast(1.12); }
  34% { transform: translateX(3px) skewX(0.18deg); filter: none; }
  48% { transform: translateX(-1px); filter: saturate(0.82); }
  63% { transform: translateX(2px); filter: contrast(1.06); }
  78% { transform: translateX(-1px); filter: none; }
}

@keyframes theme-glitch-slice {
  0%, 100% { opacity: 0; transform: translateX(0); }
  8% { opacity: 0.7; transform: translateX(var(--slice-x)); }
  24% { opacity: 0.32; transform: translateX(-2.4%); }
  39% { opacity: 0.78; transform: translateX(1.8%); }
  58% { opacity: 0.18; transform: translateX(-1.1%); }
  76% { opacity: 0.5; transform: translateX(0.6%); }
  88% { opacity: 0; transform: translateX(0); }
}

@keyframes theme-glitch-scanlines {
  0%, 100% { opacity: 0; transform: translateY(-6px); }
  5% { opacity: 0.75; }
  35% { opacity: 0.35; transform: translateY(3px); }
  70% { opacity: 0.55; transform: translateY(-2px); }
  90% { opacity: 0; }
}

@keyframes theme-glitch-flash {
  0%, 12% { opacity: 0; transform: translateX(-120%); }
  20% { opacity: 0.8; }
  46% { opacity: 0.25; transform: translateX(120%); }
  100% { opacity: 0; transform: translateX(120%); }
}

@media (prefers-reduced-motion: reduce) {
  .theme-glitch { display: none; }
}
</style>
