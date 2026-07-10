<template>
  <main class="v6-imprint">
    <section class="v6i-wrap">
      <p class="v6-eyebrow"><i></i>{{ t('impressumPage.hero.label') }}</p>
      <h1 class="v6-h1 v6i-title">{{ t('impressumPage.hero.title') }}<b class="v6-dot">.</b></h1>
      <p class="v6i-sub">{{ t('impressumPage.hero.description') }}</p>

      <div class="v6i-cards">
        <article v-for="(card, i) in cards" :key="card.title" class="v6i-card">
          <p class="v6i-card-head"><span>{{ pad(i + 1) }}</span>{{ card.title }}</p>
          <p class="v6i-card-body">{{ card.body }}</p>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from "vue"
import { useI18n } from "vue-i18n"

const { t, tm } = useI18n()

const cards = computed(() => {
  const raw = tm("impressumPage.cards")
  return Array.isArray(raw) ? raw : []
})

const pad = (n) => String(n).padStart(2, "0")
</script>

<style scoped>
/* Imprint layout — shared tokens/chrome live in src/styles/v6.css */
.v6-imprint { position: relative; z-index: 1; }

.v6i-wrap {
  max-width: 880px;
  margin: 0 auto;
  padding: clamp(8rem, 18vh, 11rem) clamp(1.1rem, 4vw, 3rem) clamp(6rem, 15vh, 10rem);
}
.v6i-title { font-size: clamp(2.2rem, 4.6vw, 3.6rem); }
.v6i-sub { max-width: 38rem; color: var(--v6-muted); margin: 0; }

.v6i-cards {
  display: flex;
  flex-direction: column;
  margin-top: clamp(2.5rem, 6vh, 4rem);
  border: 1px solid var(--v6-line);
  border-radius: 18px;
  background: linear-gradient(165deg, var(--v6-panel), rgba(12, 21, 18, 0.22));
  overflow: hidden;
}
.v6.light .v6i-cards {
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.72), rgba(238, 244, 240, 0.4));
}
.v6i-card { padding: 1.5rem clamp(1.2rem, 2.4vw, 1.8rem); border-bottom: 1px solid var(--v6-line); }
.v6i-card:last-child { border-bottom: 0; }
.v6i-card-head {
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
  margin: 0 0 0.8rem;
  font-family: var(--v6-mono);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--v6-gold);
}
.v6i-card-head span {
  font-size: 0.64rem;
  color: var(--v6-faint);
  font-variant-numeric: tabular-nums;
}
.v6i-card-body {
  margin: 0;
  white-space: pre-line;
  color: var(--v6-muted);
  font-size: 0.96rem;
  line-height: 1.7;
}
</style>
