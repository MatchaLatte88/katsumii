<template>
  <Transition name="preview-notice">
    <div
      v-if="isOpen"
      class="preview-notice"
      :class="{ 'preview-notice--light': !isDark }"
      role="presentation"
    >
      <div class="preview-notice__backdrop" aria-hidden="true"></div>

      <section
        ref="dialogEl"
        class="preview-notice__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-notice-title"
        aria-describedby="preview-notice-description"
        tabindex="-1"
      >
        <div class="preview-notice__hero">
          <p class="preview-notice__eyebrow">
            <i aria-hidden="true"></i>
            Development preview
          </p>

          <div class="preview-notice__brand" aria-label="Katsumii — offline trading journal">
            <img :src="asset('logo.png')" alt="Katsumii logo" width="96" height="96" />
            <div>
              <p class="preview-notice__wordmark">Katsumii<span>.</span></p>
              <p class="preview-notice__tagline">offline trading journal</p>
            </div>
          </div>

          <h1 id="preview-notice-title">
            A first look at<br />
            <em>what’s taking shape.</em>
          </h1>
        </div>

        <div class="preview-notice__body">
          <div id="preview-notice-description" class="preview-notice__copy">
            <p>
              You’re viewing an early development preview, not the finished Katsumii
              experience. The data, copy, visuals, and screenshots shown throughout
              this website are placeholders and do not represent the final Katsumii
              Trading Journal.
            </p>
            <p>
              If curiosity has already gotten the better of you, you’re more than
              welcome to take an early look around.
            </p>
          </div>

          <div class="preview-notice__actions">
            <button type="button" class="preview-notice__button" @click="dismiss">
              Explore the preview
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2.5 8h10M8.7 4.2 12.5 8l-3.8 3.8" />
              </svg>
            </button>
            <p><span aria-hidden="true"></span> Preview content is not final</p>
          </div>
        </div>
      </section>
    </div>
  </Transition>
</template>

<script setup>
import { inject, nextTick, onBeforeUnmount, onMounted, ref } from "vue"

const SESSION_KEY = "katsumii-preview-notice-seen"
const baseUrl = import.meta.env.BASE_URL
const asset = (path) => `${baseUrl}${path}`
const isDark = inject("isDark")
const isOpen = ref(false)
const dialogEl = ref(null)
let previousFocus = null
let previousOverflow = ""

const focusableElements = () => [
  ...dialogEl.value?.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  ) || [],
]

const dismiss = () => {
  try { sessionStorage.setItem(SESSION_KEY, "true") } catch { /* storage may be unavailable */ }
  isOpen.value = false
  document.documentElement.style.overflow = previousOverflow
  previousFocus?.focus?.()
}

const onKeydown = (event) => {
  if (!isOpen.value) return
  if (event.key === "Escape") {
    event.preventDefault()
    dismiss()
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

onMounted(async () => {
  let seen = false
  try { seen = sessionStorage.getItem(SESSION_KEY) === "true" } catch { /* storage may be unavailable */ }
  if (seen) return

  previousFocus = document.activeElement
  previousOverflow = document.documentElement.style.overflow
  document.documentElement.style.overflow = "hidden"
  isOpen.value = true
  window.addEventListener("keydown", onKeydown)
  await nextTick()
  dialogEl.value?.focus()
})

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown)
  if (isOpen.value) document.documentElement.style.overflow = previousOverflow
})
</script>

<style scoped>
.preview-notice {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: clamp(0.8rem, 3vw, 2rem);
  isolation: isolate;
}

.preview-notice__backdrop {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: rgba(3, 8, 15, 0.8);
  backdrop-filter: blur(12px) saturate(0.8);
}

.preview-notice__dialog {
  position: relative;
  width: min(100%, 850px);
  max-height: calc(100dvh - 1.6rem);
  overflow-x: hidden;
  overflow-y: auto;
  color: var(--v6-ink);
  background:
    radial-gradient(ellipse 75% 62% at 82% 7%, rgba(34, 211, 238, 0.12), transparent 64%),
    var(--v6-bg);
  border: 1px solid var(--v6-line-strong);
  border-radius: 16px;
  box-shadow: 0 32px 90px -28px rgba(0, 0, 0, 0.9);
  outline: none;
}

.preview-notice__hero {
  padding: clamp(1.7rem, 5vw, 3.4rem) clamp(1.35rem, 6vw, 4.2rem) clamp(1.8rem, 4vw, 3rem);
}

.preview-notice__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  margin: 0 0 clamp(1.35rem, 3vw, 2rem);
  font-family: var(--v6-mono);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--v6-gold);
}

.preview-notice__eyebrow i {
  width: 22px;
  height: 1px;
  background: currentColor;
  opacity: 0.7;
}

.preview-notice__brand {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 3vw, 1.45rem);
}

.preview-notice__brand img {
  display: block;
  width: clamp(70px, 10vw, 96px);
  height: clamp(70px, 10vw, 96px);
  border-radius: 15px;
  filter: drop-shadow(0 12px 22px rgba(0, 0, 0, 0.28));
}

.preview-notice__wordmark {
  margin: 0;
  font-family: var(--v6-display);
  font-size: clamp(2.25rem, 6vw, 4rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.preview-notice__wordmark span { color: var(--v6-ember); }

.preview-notice__tagline {
  margin: 0.65rem 0 0;
  font-family: var(--v6-mono);
  font-size: clamp(0.62rem, 1.7vw, 0.76rem);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--v6-gold-hi);
}

.preview-notice h1 {
  margin: clamp(1.6rem, 4vw, 2.6rem) 0 0;
  font-family: var(--v6-display);
  font-size: clamp(2.35rem, 6.8vw, 4.75rem);
  font-weight: 700;
  line-height: 1.01;
  letter-spacing: -0.04em;
}

.preview-notice h1 em {
  color: var(--v6-gold-hi);
  font-style: italic;
  font-weight: 600;
}

.preview-notice__body {
  padding: clamp(1.4rem, 3.5vw, 2.2rem) clamp(1.35rem, 6vw, 4.2rem) clamp(1.5rem, 4vw, 2.4rem);
  border-top: 1px solid var(--v6-line);
  background: color-mix(in srgb, var(--v6-panel) 44%, transparent);
}

.preview-notice__copy {
  max-width: 46rem;
  color: var(--v6-muted);
  font-size: clamp(0.9rem, 1.7vw, 1rem);
  line-height: 1.7;
}

.preview-notice__copy p { margin: 0; }
.preview-notice__copy p + p { margin-top: 0.7rem; color: var(--v6-ink); }

.preview-notice__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  margin-top: 1.6rem;
}

.preview-notice__button {
  min-height: 3.25rem;
  padding: 0.8rem 1.4rem 0.8rem 1.65rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border: 0;
  border-radius: 999px;
  background: var(--v6-gold);
  color: #031820;
  cursor: pointer;
  font-family: var(--v6-display);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  box-shadow: 0 0 0 0 rgba(34, 211, 238, 0);
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
}

.preview-notice__button svg {
  width: 1rem;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.25s ease;
}

.preview-notice__button:hover {
  background: var(--v6-gold-hi);
  box-shadow: 0 8px 34px -8px rgba(34, 211, 238, 0.5);
}

.preview-notice__button:hover svg { transform: translateX(3px); }
.preview-notice__button:focus-visible {
  border-radius: 999px;
  outline: 2px solid var(--v6-gold-hi);
  outline-offset: 3px;
}

.preview-notice__actions p {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0;
  font-family: var(--v6-mono);
  font-size: 0.64rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--v6-faint);
}

.preview-notice__actions p span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--v6-ember);
}

:global(.v6.light) .preview-notice__backdrop { background: rgba(226, 232, 240, 0.8); }
:global(.v6.light) .preview-notice__dialog {
  background:
    radial-gradient(ellipse 75% 62% at 82% 7%, rgba(3, 105, 161, 0.1), transparent 64%),
    var(--v6-bg);
  box-shadow: 0 32px 90px -28px rgba(15, 23, 42, 0.32);
}
.preview-notice--light .preview-notice__button { color: #ffffff; }

.preview-notice-enter-active,
.preview-notice-leave-active { transition: opacity 0.3s ease; }
.preview-notice-enter-active .preview-notice__dialog,
.preview-notice-leave-active .preview-notice__dialog { transition: opacity 0.3s ease, transform 0.42s cubic-bezier(0.16, 1, 0.3, 1); }
.preview-notice-enter-from,
.preview-notice-leave-to { opacity: 0; }
.preview-notice-enter-from .preview-notice__dialog { opacity: 0; transform: translateY(14px) scale(0.985); }
.preview-notice-leave-to .preview-notice__dialog { opacity: 0; transform: translateY(-6px) scale(0.99); }

@media (max-width: 560px) {
  .preview-notice { padding: 0.65rem; }
  .preview-notice__dialog { max-height: calc(100dvh - 1.3rem); border-radius: 14px; }
  .preview-notice__brand img { border-radius: 12px; }
  .preview-notice h1 { font-size: clamp(2.15rem, 11vw, 3rem); }
  .preview-notice__body { background: color-mix(in srgb, var(--v6-panel) 58%, transparent); }
  .preview-notice__copy { line-height: 1.6; }
  .preview-notice__actions { display: grid; gap: 0.9rem; }
  .preview-notice__button { width: 100%; min-height: 3.1rem; }
  .preview-notice__actions p { justify-content: center; }
}

@media (max-height: 720px) and (min-width: 561px) {
  .preview-notice__hero { padding-block: 1.6rem; }
  .preview-notice__brand img { width: 70px; height: 70px; border-radius: 12px; }
  .preview-notice h1 { margin-top: 1.35rem; font-size: clamp(2.5rem, 7vh, 3.4rem); }
  .preview-notice__body { padding-block: 1.3rem; }
  .preview-notice__copy { line-height: 1.55; }
  .preview-notice__actions { margin-top: 1.1rem; }
}

@media (prefers-reduced-motion: reduce) {
  .preview-notice-enter-active,
  .preview-notice-leave-active,
  .preview-notice-enter-active .preview-notice__dialog,
  .preview-notice-leave-active .preview-notice__dialog,
  .preview-notice__button,
  .preview-notice__button svg { transition: none; }
}
</style>
