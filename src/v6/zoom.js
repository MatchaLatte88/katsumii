import { openLightbox } from "../composables/useLightbox.js"

/* v-zoom — makes an <img> open in the shared screenshot lightbox.
   Registered globally in main.js.

   The source is read from the element at click time, not at mount time, so the
   dark/light ternaries, the layout playground computed and the workflow tab
   showcase all keep working without passing anything to the directive. */

const label = (el) => (el.alt ? `${el.alt} — view larger` : "View screenshot larger")

const open = (el) => () =>
  openLightbox({
    src: el.currentSrc || el.src,
    alt: el.alt,
    /* the image is loaded whenever it can be clicked, so these are the real
       intrinsic dimensions — the lightbox uses them as its 100% target */
    naturalWidth: el.naturalWidth,
    naturalHeight: el.naturalHeight,
  })

export const vZoom = {
  mounted(el) {
    el.classList.add("v6-zoomable")
    el.setAttribute("role", "button")
    el.setAttribute("tabindex", "0")
    el.setAttribute("aria-label", label(el))

    const onClick = open(el)
    const onKeydown = (e) => {
      if (e.key !== "Enter" && e.key !== " ") return
      e.preventDefault() // Space would scroll the page
      onClick()
    }

    el._v6Zoom = { onClick, onKeydown }
    el.addEventListener("click", onClick)
    el.addEventListener("keydown", onKeydown)
  },

  /* alt changes when the showcase swaps shots in place */
  updated(el) {
    el.setAttribute("aria-label", label(el))
  },

  unmounted(el) {
    if (!el._v6Zoom) return
    el.removeEventListener("click", el._v6Zoom.onClick)
    el.removeEventListener("keydown", el._v6Zoom.onKeydown)
    delete el._v6Zoom
  },
}
