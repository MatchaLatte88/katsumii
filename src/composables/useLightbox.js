import { ref } from "vue"

/* Shared state for the screenshot lightbox. A single <V6Lightbox /> lives in
   V6Shell; the v-zoom directive (src/v6/zoom.js) pushes the clicked image into
   this state from anywhere in the tree — no provide/inject needed. */

const shot = ref(null) // { src, alt, naturalWidth, naturalHeight } | null

export const openLightbox = (payload) => {
  shot.value = payload
}

export const closeLightbox = () => {
  shot.value = null
}

export function useLightbox() {
  return { shot, openLightbox, closeLightbox }
}
