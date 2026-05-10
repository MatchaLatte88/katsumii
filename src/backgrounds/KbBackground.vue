<template>
  <!--
    KbBackground.vue — Portable background component (Vue 3, no Pinia required)

    Props:
      pattern  String  'honeycomb' | 'lines'                         default: 'lines'
      isDark   Boolean                                                default: false

    Requires in your project:
      kb-tokens.css  (CSS variables for dark/light)
      kb-blobs.css   (optional, body blob effects)

    Usage:
      <KbBackground :pattern="bgPattern" :isDark="isDark" />

    Place this as the FIRST element in your App.vue template.
    Your main content wrapper needs: position: relative; z-index: 1 (or higher).

    CSS-only alternative (honeycomb only): use kb-grid.css instead of this component.
  -->
  <div class="k-bg" :class="isDark ? 'k-bg-dark' : 'k-bg-light'" aria-hidden="true">
    <div class="k-bg-gradient" />

    <!-- Honeycomb SVG pattern -->
    <svg v-if="pattern === 'honeycomb'" class="k-bg-grid" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="hc" x="0" y="0" width="69.28" height="60" patternUnits="userSpaceOnUse">
          <path d="M34.64,0 L51.96,10 L51.96,30 L34.64,40 L17.32,30 L17.32,10 Z M0,0 L17.32,10 M17.32,30 L0,40 M51.96,10 L69.28,0 M69.28,40 L51.96,30 M34.64,40 L34.64,60 M0,40 L0,60"
            style="fill:none;stroke:var(--hc-stroke);stroke-width:1.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hc)" />
    </svg>

    <!-- Canvas patterns -->
    <canvas v-else-if="pattern === 'lines'" ref="linesCanvas" class="k-bg-canvas" aria-hidden="true" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  pattern: { type: String,  default: 'lines' }, // 'honeycomb' | 'lines'
  isDark:  { type: Boolean, default: false },
})

// ── Flowing Lines ──────────────────────────────────────────────────────────
const linesCanvas = ref(null)
let linesRaf = null

function startFlow() {
  const canvas = linesCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = window.innerWidth + 'px'
    canvas.style.height = window.innerHeight + 'px'
    ctx.scale(dpr, dpr)
  }
  resize()
  window.addEventListener('resize', resize)
  canvas._resizeHandler = resize
  const ribbons = Array.from({ length: 20 }, () => ({
    baseY: Math.random() * window.innerHeight,
    amp1: 30 + Math.random() * 60, amp2: 15 + Math.random() * 35,
    freq1: 0.0008 + Math.random() * 0.0012, freq2: 0.0018 + Math.random() * 0.0022,
    speed1: 0.12 + Math.random() * 0.18, speed2: 0.07 + Math.random() * 0.13,
    hue: 180 + Math.random() * 60, alphaBase: 0.015 + Math.random() * 0.025,
    breathFreq: 0.3 + Math.random() * 0.4, breathOff: Math.random() * Math.PI * 2,
  }))
  let t = 0
  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    for (const r of ribbons) {
      const breath = 0.5 + 0.5 * Math.sin(t * r.breathFreq + r.breathOff)
      const modeBoost = props.isDark ? 1 : 2.2
      const alpha = r.alphaBase * (0.6 + 0.4 * breath) * modeBoost
      ctx.beginPath()
      ctx.strokeStyle = `hsla(${r.hue},80%,${props.isDark ? 68 : 52}%,${alpha})`
      ctx.lineWidth = 1.2
      ctx.shadowColor = `hsla(${r.hue},90%,70%,${alpha * 0.3})`
      ctx.shadowBlur = 3
      let first = true
      for (let x = 0; x <= window.innerWidth; x += 3) {
        const y = r.baseY + r.amp1 * Math.sin(x * r.freq1 + t * r.speed1) + r.amp2 * Math.sin(x * r.freq2 + t * r.speed2)
        if (first) { ctx.moveTo(x, y); first = false } else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
    t += 0.016
    linesRaf = requestAnimationFrame(draw)
  }
  linesRaf = requestAnimationFrame(draw)
}

function stopFlow() {
  if (linesRaf) { cancelAnimationFrame(linesRaf); linesRaf = null }
  if (linesCanvas.value?._resizeHandler) window.removeEventListener('resize', linesCanvas.value._resizeHandler)
}

// ── Lifecycle ──────────────────────────────────────────────────────────────
function handleVisibilityChange() {
  if (document.hidden) {
    if (linesRaf) { cancelAnimationFrame(linesRaf); linesRaf = null }
  } else {
    if (props.pattern === 'lines') setTimeout(startFlow, 0)
  }
}

watch(() => props.pattern, (val, old) => {
  if (old === 'lines') stopFlow()
  if (val === 'lines') setTimeout(startFlow, 0)
}, { flush: 'post' })

onMounted(() => {
  if (props.pattern === 'lines') setTimeout(startFlow, 0)
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onBeforeUnmount(() => {
  stopFlow()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<style scoped>
.k-bg {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.k-bg-dark  { --orb-a: rgba(59,130,246,0.08); --orb-b: rgba(34,211,238,0.06); --hc-stroke: rgba(34,211,238,0.02); }
.k-bg-light { --orb-a: transparent; --orb-b: transparent; --hc-stroke: rgba(8,145,178,0.04); }

.k-bg-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 55% at 8% 18%, var(--orb-a), transparent 60%),
    radial-gradient(ellipse 55% 45% at 88% 80%, var(--orb-b), transparent 55%);
}

.k-bg-grid {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  mask-image: linear-gradient(180deg, transparent 0%, black 12%, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, black 12%, black 80%, transparent 100%);
}

.k-bg-canvas {
  position: absolute;
  inset: 0;
  display: block;
}
</style>
