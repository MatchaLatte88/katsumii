<template>
  <main class="v6-bugreport">
    <section class="v6b-wrap">
      <header class="v6b-hero">
        <p class="v6-eyebrow"><i></i>{{ t('bugReportPage.hero.label') }}</p>
        <h1 class="v6-h1 v6b-title">{{ t('bugReportPage.hero.title') }}<b class="v6-dot">.</b></h1>
        <p class="v6b-sub">{{ t('bugReportPage.hero.description') }}</p>
      </header>

      <div class="v6b-panel">
        <span class="v6-btn v6-btn-static" aria-disabled="true">Coming soon</span>
      </div>

      <p class="v6b-direct">
        {{ t('bugReportPage.direct.prefix') }}
        <a href="mailto:bugs@katsumii.com">bugs@katsumii.com</a>
      </p>
    </section>
  </main>
</template>

<script setup>
import { useI18n } from "vue-i18n"

const { t } = useI18n()
</script>

<style scoped>
/* Bug report layout — shared tokens/chrome live in src/styles/v6.css */
.v6-bugreport { position: relative; z-index: 1; }

.v6b-wrap {
  max-width: 680px;
  margin: 0 auto;
  padding: clamp(8rem, 18vh, 11rem) clamp(1.1rem, 4vw, 3rem) clamp(6rem, 15vh, 10rem);
}
.v6b-hero { text-align: center; margin-bottom: clamp(2.2rem, 5vh, 3.5rem); }
.v6b-hero .v6-eyebrow { justify-content: center; }
.v6b-title { font-size: clamp(2.2rem, 4.6vw, 3.6rem); }
.v6b-sub { max-width: 32rem; margin: 0 auto; color: var(--v6-muted); }

.v6b-panel {
  display: flex;
  justify-content: center;
  padding: clamp(2.2rem, 5vw, 3.2rem);
  border: 1px solid var(--v6-line);
  border-radius: 18px;
  background: linear-gradient(165deg, var(--v6-panel), rgba(12, 21, 18, 0.22));
}
.v6.light .v6b-panel {
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.72), rgba(238, 244, 240, 0.4));
}

.v6b-direct {
  margin: 1.8rem 0 0;
  text-align: center;
  font-size: 0.88rem;
  color: var(--v6-muted);
}
.v6b-direct a {
  color: var(--v6-gold);
  text-decoration: none;
  border-bottom: 1px solid var(--v6-line-strong);
  transition: color 0.2s ease;
}
.v6b-direct a:hover { color: var(--v6-gold-hi); }
</style>
