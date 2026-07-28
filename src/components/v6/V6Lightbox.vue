<template>
  <Transition name="v6lb">
    <div v-if="shot" class="v6lb" role="presentation">
      <div class="v6lb__backdrop" aria-hidden="true" @click="close"></div>

      <section
        ref="dialogEl"
        class="v6lb__dialog"
        role="dialog"
        aria-modal="true"
        :aria-label="shot.alt || 'Screenshot'"
        tabindex="-1"
      >
        <header class="v6lb__bar">
          <p class="v6lb__caption">{{ shot.alt }}</p>
          <div class="v6lb__tools">
            <button
              v-if="canZoom"
              type="button"
              class="v6lb__toggle"
              :aria-pressed="zoomed ? 'true' : 'false'"
              @click="toggleZoom()"
            >{{ zoomed ? "Fit" : "100%" }}</button>
            <button type="button" class="v6lb__close" aria-label="Close" @click="close">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="m4 4 8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>
        </header>

        <div
          ref="stageEl"
          class="v6lb__stage"
          :class="{ zoomed, grabbing: dragging }"
          @click="onStageClick"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointercancel="onPointerUp"
        >
          <img
            ref="imgEl"
            :src="shot.src"
            :alt="shot.alt"
            :style="imgStyle"
            :class="{ zoomable: canZoom }"
            draggable="false"
            decoding="async"
            @load="measure"
          />
        </div>
      </section>
    </div>
  </Transition>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { useLightbox } from "../../composables/useLightbox.js"

const { shot, closeLightbox } = useLightbox()
const route = useRoute()

const dialogEl = ref(null)
const stageEl = ref(null)
const imgEl = ref(null)

const zoomed = ref(false)
const dragging = ref(false)
/* intrinsic size comes from the clicked image; re-read on load as a fallback
   for the (unexpected) case where it was not decoded yet */
const natural = ref({ w: 0, h: 0 })
const fitWidth = ref(0)

let previousFocus = null
let previousOverflow = ""
let drag = null
let suppressClick = false

/* Zooming only makes sense while the fitted image is actually downscaled. */
const canZoom = computed(() => natural.value.w > 0 && fitWidth.value > 0 && natural.value.w > fitWidth.value + 1)

const imgStyle = computed(() =>
  zoomed.value ? { width: `${natural.value.w}px` } : null
)

const measure = () => {
  const img = imgEl.value
  if (!img) return
  if (img.naturalWidth) natural.value = { w: img.naturalWidth, h: img.naturalHeight }
  if (!zoomed.value) fitWidth.value = img.clientWidth
}

const close = () => {
  closeLightbox()
}

const toggleZoom = (event) => {
  if (!canZoom.value) return
  if (zoomed.value) {
    zoomed.value = false
    nextTick(measure)
    return
  }

  /* keep the point under the cursor centred when blowing the image up */
  const rect = imgEl.value.getBoundingClientRect()
  const fx = event ? (event.clientX - rect.left) / rect.width : 0.5
  const fy = event ? (event.clientY - rect.top) / rect.height : 0.5

  zoomed.value = true
  nextTick(() => {
    const stage = stageEl.value
    if (!stage) return
    stage.scrollLeft = fx * stage.scrollWidth - stage.clientWidth / 2
    stage.scrollTop = fy * stage.scrollHeight - stage.clientHeight / 2
  })
}

const onStageClick = (event) => {
  if (suppressClick) {
    suppressClick = false
    return
  }
  /* While zoomed the stage holds the pointer capture, so click events land on
     the stage even when the cursor is over the image — target is useless here.
     A plain click anywhere therefore just zooms back out; closing stays with
     Escape, the close button and the backdrop. */
  if (zoomed.value) {
    toggleZoom()
    return
  }
  /* Fitted: the image zooms in, the empty area around it closes. */
  if (event.target === imgEl.value) toggleZoom(event)
  else close()
}

const onPointerDown = (event) => {
  suppressClick = false // never let a stale pan flag swallow a fresh click
  if (!zoomed.value || event.button !== 0) return
  drag = {
    x: event.clientX,
    y: event.clientY,
    left: stageEl.value.scrollLeft,
    top: stageEl.value.scrollTop,
    moved: false,
  }
  dragging.value = true
  stageEl.value.setPointerCapture?.(event.pointerId)
}

const onPointerMove = (event) => {
  if (!drag) return
  const dx = event.clientX - drag.x
  const dy = event.clientY - drag.y
  if (!drag.moved && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) drag.moved = true
  stageEl.value.scrollLeft = drag.left - dx
  stageEl.value.scrollTop = drag.top - dy
}

const onPointerUp = (event) => {
  if (!drag) return
  suppressClick = drag.moved // a pan must not toggle the zoom on release
  drag = null
  dragging.value = false
  stageEl.value?.releasePointerCapture?.(event.pointerId)
}

const focusableElements = () => [
  ...dialogEl.value?.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  ) || [],
]

const onKeydown = (event) => {
  if (!shot.value) return
  if (event.key === "Escape") {
    event.preventDefault()
    close()
    return
  }
  if (event.key !== "Tab") return

  const focusable = focusableElements()
  if (!focusable.length) {
    event.preventDefault()
    dialogEl.value?.focus()
    return
  }

  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

const onResize = () => {
  if (zoomed.value) return
  measure()
}

watch(shot, async (value, previous) => {
  if (value && !previous) {
    previousFocus = document.activeElement
    previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"
    zoomed.value = false
    natural.value = { w: value.naturalWidth || 0, h: value.naturalHeight || 0 }
    fitWidth.value = 0
    window.addEventListener("keydown", onKeydown)
    window.addEventListener("resize", onResize)
    await nextTick()
    dialogEl.value?.focus()
    measure()
  } else if (!value && previous) {
    document.documentElement.style.overflow = previousOverflow
    window.removeEventListener("keydown", onKeydown)
    window.removeEventListener("resize", onResize)
    zoomed.value = false
    drag = null
    dragging.value = false
    previousFocus?.focus?.()
  } else if (value) {
    /* swapped to another shot without closing */
    zoomed.value = false
    natural.value = { w: value.naturalWidth || 0, h: value.naturalHeight || 0 }
    await nextTick()
    measure()
  }
})

watch(() => route.fullPath, () => {
  if (shot.value) close()
})

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown)
  window.removeEventListener("resize", onResize)
  if (shot.value) document.documentElement.style.overflow = previousOverflow
})
</script>

<style scoped>
.v6lb {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: grid;
  place-items: center;
  padding: clamp(0.5rem, 2vw, 1.5rem);
  isolation: isolate;
}

.v6lb__backdrop {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: rgba(3, 8, 15, 0.86);
  backdrop-filter: blur(12px) saturate(0.8);
}

.v6lb__dialog {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 1720px;
  border: 1px solid var(--v6-line-strong);
  border-radius: 14px;
  background: var(--v6-bg);
  box-shadow: 0 32px 90px -28px rgba(0, 0, 0, 0.9);
  overflow: hidden;
  outline: none;
}

.v6lb__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.55rem 0.6rem 0.55rem 1.1rem;
  border-bottom: 1px solid var(--v6-line);
  background: color-mix(in srgb, var(--v6-panel) 44%, transparent);
}

.v6lb__caption {
  margin: 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--v6-mono);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--v6-faint);
}

.v6lb__tools {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex: none;
}

.v6lb__toggle {
  min-width: 3.6rem;
  padding: 0.4rem 0.7rem;
  border: 1px solid var(--v6-line-strong);
  border-radius: 999px;
  background: transparent;
  color: var(--v6-muted);
  cursor: pointer;
  font-family: var(--v6-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.v6lb__toggle:hover {
  color: var(--v6-gold-hi);
  border-color: var(--v6-gold-hi);
}

.v6lb__close {
  display: grid;
  place-items: center;
  width: 2.1rem;
  height: 2.1rem;
  border: 1px solid var(--v6-line-strong);
  border-radius: 999px;
  background: transparent;
  color: var(--v6-muted);
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.v6lb__close svg {
  width: 0.85rem;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
}

.v6lb__close:hover {
  color: var(--v6-gold-hi);
  border-color: var(--v6-gold-hi);
}

.v6lb__toggle:focus-visible,
.v6lb__close:focus-visible {
  outline: 2px solid var(--v6-gold-hi);
  outline-offset: 2px;
}

.v6lb__stage {
  flex: 1;
  min-height: 0;
  display: grid;
  /* minmax(0, 1fr) pins the track to the stage box — an auto track would grow
     to the image's intrinsic height and max-height: 100% would resolve against
     that, letting the fitted image overflow instead of scaling down */
  grid-template-rows: minmax(0, 1fr);
  grid-template-columns: minmax(0, 1fr);
  place-items: center;
  overflow: hidden;
  padding: clamp(0.4rem, 1.5vw, 1rem);
  background: var(--v6-bg-soft);
}

.v6lb__stage img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
}

.v6lb__stage img.zoomable { cursor: zoom-in; }

.v6lb__stage.zoomed {
  display: block;
  overflow: auto;
  touch-action: none; /* pan is driven by the pointer handlers */
  cursor: grab;
}

.v6lb__stage.zoomed img {
  max-width: none;
  max-height: none;
  margin: 0 auto;
  cursor: grab;
}

.v6lb__stage.grabbing,
.v6lb__stage.grabbing img { cursor: grabbing; }

:global(.v6.light) .v6lb__backdrop { background: rgba(226, 232, 240, 0.86); }
:global(.v6.light) .v6lb__dialog { box-shadow: 0 32px 90px -28px rgba(15, 23, 42, 0.32); }

.v6lb-enter-active,
.v6lb-leave-active { transition: opacity 0.25s ease; }
.v6lb-enter-active .v6lb__dialog,
.v6lb-leave-active .v6lb__dialog { transition: opacity 0.25s ease, transform 0.38s cubic-bezier(0.16, 1, 0.3, 1); }
.v6lb-enter-from,
.v6lb-leave-to { opacity: 0; }
.v6lb-enter-from .v6lb__dialog { opacity: 0; transform: scale(0.985); }
.v6lb-leave-to .v6lb__dialog { opacity: 0; transform: scale(0.99); }

@media (max-width: 560px) {
  .v6lb { padding: 0.4rem; }
  .v6lb__dialog { border-radius: 12px; }
  .v6lb__bar { padding-left: 0.8rem; }
}

@media (prefers-reduced-motion: reduce) {
  .v6lb-enter-active,
  .v6lb-leave-active,
  .v6lb-enter-active .v6lb__dialog,
  .v6lb-leave-active .v6lb__dialog,
  .v6lb__toggle,
  .v6lb__close { transition: none; }
}
</style>
