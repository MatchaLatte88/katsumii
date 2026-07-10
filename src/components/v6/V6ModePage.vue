<template>
  <main ref="rootEl" class="v6-mode-page">
    <!-- HERO -->
    <section class="v6m-hero">
      <div class="v6m-hero-copy">
        <p class="v6-eyebrow v6-reveal"><i></i>{{ page.eyebrow }}</p>
        <h1 class="v6-h1 v6-reveal">
          {{ page.h1.pre }} <em>{{ page.h1.em }}</em><b class="v6-dot">.</b>
        </h1>
        <p class="v6m-hero-sub v6-reveal">{{ page.sub }}</p>
        <ul class="v6-card-chips v6m-hero-chips v6-reveal">
          <li v-for="c in page.chips" :key="c">{{ c }}</li>
        </ul>
        <div class="v6m-hero-actions v6-reveal">
          <RouterLink :to="`/${lang}/pricing`" class="v6-btn v6-magnetic">Get Katsumii <span aria-hidden="true">→</span></RouterLink>
          <RouterLink :to="`/${lang}/features`" class="v6-quiet v6-magnetic">All features</RouterLink>
        </div>
      </div>
    </section>

    <!-- METRICS -->
    <section class="v6m-metrics" aria-label="Cockpit metrics">
      <article v-for="m in page.metrics" :key="m.label" class="v6-card v6-reveal">
        <p class="v6m-metric-label">{{ m.label }}</p>
        <div class="v6m-metric-row">
          <span class="v6m-metric-val">{{ m.value }}</span>
          <span class="v6m-status">{{ m.status }}</span>
        </div>
        <span class="v6m-bar" role="presentation"><i :style="{ width: m.progress }"></i></span>
        <p>{{ m.copy }}</p>
      </article>
    </section>

    <!-- SECTIONS -->
    <section
      v-for="(s, idx) in page.sections" :id="s.id" :key="s.id"
      class="v6m-section" :class="{ flip: idx % 2 === 1 }"
    >
      <div class="v6m-section-copy">
        <p class="v6-eyebrow v6-reveal"><i></i>{{ s.kicker }}</p>
        <h2 class="v6-h2 v6-reveal">{{ s.title }}</h2>
        <p class="v6m-section-sub v6-reveal">{{ s.copy }}</p>
        <p class="v6m-note v6-reveal">{{ s.note }}</p>
      </div>
      <div class="v6m-rows v6-reveal">
        <div v-for="r in s.rows" :key="r.name" class="v6m-row">
          <div class="v6m-row-head">
            <h3>{{ r.name }}</h3>
            <span class="v6m-status">{{ r.status }}</span>
          </div>
          <p>{{ r.copy }}</p>
          <div class="v6m-row-meter">
            <span class="v6m-row-val">{{ r.value }}</span>
            <span class="v6m-bar" role="presentation"><i :style="{ width: r.progress }"></i></span>
            <span class="v6m-row-pct">{{ r.progress }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- DISCLAIMER -->
    <section class="v6m-disclaimer">
      <div class="v6m-disclaimer-inner">
        <p class="v6-eyebrow v6-reveal"><i></i>Important context</p>
        <h2 class="v6-h2 v6-reveal">{{ page.disclaimer.headline }}</h2>
        <div class="v6m-disclaimer-points">
          <p v-for="p in page.disclaimer.points" :key="p" class="v6-reveal">{{ p }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="v6m-cta">
      <h2 class="v6m-cta-title v6-reveal">{{ page.cta.title }} <em>{{ page.cta.em }}</em><b class="v6-dot">.</b></h2>
      <p class="v6m-cta-sub v6-reveal">{{ page.cta.sub }}</p>
      <div class="v6m-cta-actions v6-reveal">
        <RouterLink :to="`/${lang}/pricing`" class="v6-btn v6-btn-lg v6-magnetic">Get Katsumii <span aria-hidden="true">→</span></RouterLink>
        <RouterLink v-if="page.cta.next" :to="`/${lang}${page.cta.next.path}`" class="v6-quiet">
          Next discipline: {{ page.cta.next.name }} <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { initMagnetic, initV6Reveals } from "../../v6/motion.js"
import { normalizeLocale } from "../../utils/routes.js"

defineProps({
  page: { type: Object, required: true },
})

const route = useRoute()
const lang = computed(() => {
  const raw = Array.isArray(route.params.locale) ? route.params.locale[0] : route.params.locale
  return normalizeLocale(raw)
})

const rootEl = ref(null)
let cleanups = []

onMounted(() => {
  cleanups.push(initV6Reveals(rootEl.value))
  cleanups.push(initMagnetic(rootEl.value))
})

onBeforeUnmount(() => {
  cleanups.forEach((off) => off && off())
  cleanups = []
})
</script>

<style scoped>
/* Mode deep-dive layout — shared tokens/chrome live in src/styles/v6.css */
.v6-mode-page { position: relative; z-index: 1; }

/* ── hero ── */
.v6m-hero {
  position: relative;
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(8rem, 18vh, 11rem) clamp(1.1rem, 4vw, 3rem) clamp(3rem, 8vh, 5rem);
}
/* soft scrim in page-bg color so the particle river stays quiet behind the copy
   (same approach as the landing hero) */
.v6m-hero::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 52% 46% at 30% 55%,
    color-mix(in srgb, var(--v6-bg) 80%, transparent) 42%,
    transparent 100%
  );
}
.v6m-hero .v6-h1 { font-size: clamp(2.5rem, 5.4vw, 4.4rem); }
.v6m-hero-sub { max-width: 34rem; color: var(--v6-muted); }
.v6m-hero-chips { margin-top: 1.6rem; }
.v6m-hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-top: 2.2rem;
}

/* ── metrics ── */
.v6m-metrics {
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(1rem, 4vh, 2.5rem) clamp(1.1rem, 4vw, 3rem) clamp(3rem, 8vh, 5rem);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.1rem;
}
.v6m-metric-label {
  font-family: var(--v6-mono);
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--v6-faint);
  margin: 0;
}
.v6m-metric-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.8rem;
  margin: 0.7rem 0 0.9rem;
}
.v6m-metric-val {
  font-family: var(--v6-mono);
  font-size: 1.7rem;
  line-height: 1;
  color: var(--v6-ink);
}
.v6m-status {
  font-family: var(--v6-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--v6-gold);
  border: 1px solid var(--v6-line-strong);
  border-radius: 999px;
  padding: 0.22rem 0.6rem;
  white-space: nowrap;
}
.v6m-bar {
  display: block;
  height: 2px;
  border-radius: 2px;
  background: var(--v6-line);
  overflow: hidden;
}
.v6m-bar i {
  display: block;
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--v6-gold), var(--v6-gold-hi));
}
.v6m-metrics .v6-card > p:last-child { margin-top: 0.9rem; }

/* ── sections ── */
.v6m-section {
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(2.5rem, 7vh, 4.5rem) clamp(1.1rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: minmax(300px, 5fr) 6fr;
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: start;
}
.v6m-section.flip .v6m-section-copy { order: 2; }
.v6m-section.flip .v6m-rows { order: 1; }
.v6m-section-sub { color: var(--v6-muted); margin: 1.2rem 0 0; max-width: 30rem; }
.v6m-note {
  margin: 1.6rem 0 0;
  padding: 0.9rem 1.1rem;
  border-left: 2px solid var(--v6-ember);
  color: var(--v6-muted);
  font-size: 0.9rem;
  background: linear-gradient(90deg, var(--v6-panel), transparent 80%);
  border-radius: 0 10px 10px 0;
  max-width: 30rem;
}
.v6m-rows {
  border: 1px solid var(--v6-line);
  border-radius: 18px;
  background: linear-gradient(165deg, var(--v6-panel), rgba(12, 21, 18, 0.22));
  overflow: hidden;
}
.v6.light .v6m-rows {
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.72), rgba(238, 244, 240, 0.4));
}
.v6m-row { padding: 1.4rem clamp(1.2rem, 2.4vw, 1.8rem); border-bottom: 1px solid var(--v6-line); }
.v6m-row:last-child { border-bottom: 0; }
.v6m-row-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
}
.v6m-row-head h3 {
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: -0.01em;
  margin: 0;
}
.v6m-row > p { color: var(--v6-muted); font-size: 0.92rem; margin: 0.5rem 0 0.9rem; }
.v6m-row-meter {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.9rem;
}
.v6m-row-val, .v6m-row-pct {
  font-family: var(--v6-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--v6-faint);
}
.v6m-row-pct { color: var(--v6-gold); }

/* ── disclaimer ── */
.v6m-disclaimer { padding: clamp(3rem, 9vh, 6rem) clamp(1.1rem, 4vw, 3rem); }
.v6m-disclaimer-inner { max-width: 1240px; margin: 0 auto; }
.v6m-disclaimer-points {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.1rem;
  margin-top: 2.2rem;
}
.v6m-disclaimer-points p {
  margin: 0;
  padding: 1.2rem 1.3rem;
  border: 1px solid var(--v6-line);
  border-radius: 14px;
  color: var(--v6-muted);
  font-size: 0.92rem;
  background: linear-gradient(165deg, var(--v6-panel), transparent);
}

/* ── cta ── */
.v6m-cta {
  text-align: center;
  padding: clamp(4rem, 12vh, 8rem) clamp(1.1rem, 4vw, 3rem) clamp(6rem, 15vh, 10rem);
}
.v6m-cta-title {
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: clamp(2.2rem, 6vw, 4.4rem);
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 0 0 1rem;
}
.v6m-cta-title em {
  font-style: italic;
  font-weight: 600;
  color: var(--v6-gold-hi);
}
.v6m-cta-sub { color: var(--v6-muted); margin: 0 0 2.2rem; }
.v6m-cta-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.6rem;
}

/* ── responsive ── */
@media (max-width: 1100px) {
  .v6m-metrics { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 900px) {
  .v6m-hero { padding-top: 7rem; }
  .v6m-section { grid-template-columns: 1fr; gap: 1.6rem; }
  .v6m-section.flip .v6m-section-copy { order: 1; }
  .v6m-section.flip .v6m-rows { order: 2; }
  .v6m-disclaimer-points { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .v6m-metrics { grid-template-columns: 1fr; }
  .v6m-row { padding: 1.2rem 1.05rem; }
  .v6m-row-head { align-items: flex-start; }
  .v6m-row-meter { grid-template-columns: 1fr auto; }
  .v6m-row-meter .v6m-row-val { grid-column: 1 / -1; }
  .v6m-note { margin-top: 1.2rem; }
}
@media (max-width: 420px) {
  .v6m-hero-actions,
  .v6m-cta-actions { display: grid; grid-template-columns: 1fr; gap: 0.45rem; }
  .v6m-hero-actions .v6-quiet,
  .v6m-cta-actions .v6-quiet { justify-content: center; }
}
</style>
