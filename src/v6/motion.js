import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/* ── magnetic buttons (fine pointers only) ── */
export function initMagnetic(root) {
  if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {}
  const els = root.querySelectorAll(".v6-magnetic")
  const offs = []
  els.forEach((el) => {
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      gsap.to(el, { x: dx * 0.18, y: dy * 0.3, duration: 0.4, ease: "power3.out" })
    }
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.45)" })
    el.addEventListener("pointermove", move)
    el.addEventListener("pointerleave", leave)
    offs.push(() => {
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerleave", leave)
    })
  })
  return () => offs.forEach((off) => off())
}

/* ── generic scroll reveals + count-ups for V6 pages ──
   Pages with bespoke timelines build their own gsap.context and can
   call the setup functions inside it instead. Returns a cleanup fn. */
export function initV6Reveals(root) {
  gsap.registerPlugin(ScrollTrigger)

  if (prefersReducedMotion()) {
    gsap.set(root.querySelectorAll(".v6-load, .v6-hline-in, .v6-reveal"), { clearProps: "all", opacity: 1 })
    root.querySelectorAll("[data-count]").forEach((el) => {
      el.textContent = el.dataset.count
    })
    return () => {}
  }

  const ctx = gsap.context(() => {
    setupReveals()
    setupCountUps()
  }, root)
  return () => ctx.revert()
}

/* generic reveals — call inside a gsap.context */
export function setupReveals() {
  gsap.utils.toArray(".v6-reveal").forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 26 },
      {
        autoAlpha: 1, y: 0, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
      }
    )
  })
}

/* count-up numbers — call inside a gsap.context */
export function setupCountUps() {
  gsap.utils.toArray("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count)
    gsap.fromTo(
      el,
      { textContent: 0 },
      {
        textContent: target, duration: 1.4, ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      }
    )
  })
}
