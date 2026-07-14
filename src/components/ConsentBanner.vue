<template>
  <div v-if="visible" class="consent-mount">
    <div
      class="consent"
      :class="{ light: !isDark }"
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-desc"
    >
      <div class="consent-card">
        <p id="consent-title" class="consent-eyebrow">
          <i aria-hidden="true"></i>{{ t('consent.title') }}
        </p>
        <p id="consent-desc" class="consent-text">{{ t('consent.text') }}</p>

        <div class="consent-actions">
          <button type="button" class="consent-btn consent-btn-ghost" @click="decline">
            {{ t('consent.decline') }}
          </button>
          <button type="button" class="consent-btn consent-btn-accept" @click="accept">
            {{ t('consent.accept') }}
          </button>
        </div>

        <RouterLink class="consent-link" :to="pagePath('privacy', locale)">
          {{ t('consent.privacy') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from "vue"
import { useI18n } from "vue-i18n"
import { useConsent } from "../composables/useConsent.js"
import { pagePath } from "../utils/routes.js"

const { t, locale } = useI18n()
const isDark = inject("isDark")
const { bannerVisible, accept, decline } = useConsent()
const visible = computed(() => bannerVisible.value)
</script>

<style scoped>
.consent-mount { display: contents; }

/* Self-contained so the banner does not inherit the full-page .v6 background. */
.consent {
  --v6-bg: #070d16;
  --v6-bg-soft: #0d1626;
  --v6-line: rgba(226, 232, 240, 0.08);
  --v6-line-strong: rgba(34, 211, 238, 0.3);
  --v6-ink: #eef2f7;
  --v6-muted: #94a3b8;
  --v6-faint: #64748b;
  --v6-gold: #22d3ee;
  --v6-gold-hi: #67e8f9;
  --v6-display: "DM Sans", "Manrope", sans-serif;
  --v6-body: "Manrope", "Segoe UI", sans-serif;
  --v6-mono: "DM Mono", ui-monospace, monospace;
  position: fixed;
  inset: auto 0 0 auto;
  min-height: 0;
  z-index: 90;
  max-width: min(22rem, calc(100vw - 2rem));
  margin: 0 clamp(0.9rem, 3vw, 1.6rem) clamp(0.9rem, 3vw, 1.6rem) 0;
  animation: consent-in 0.34s cubic-bezier(0.16, 1, 0.3, 1);
}
.consent.light {
  --v6-bg: #f8fafc;
  --v6-bg-soft: #eef2f7;
  --v6-line: rgba(15, 23, 42, 0.10);
  --v6-line-strong: rgba(3, 105, 161, 0.4);
  --v6-ink: #0f172a;
  --v6-muted: #475569;
  --v6-faint: #64748b;
  --v6-gold: #0369a1;
  --v6-gold-hi: #075985;
}
@keyframes consent-in {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: none; }
}

.consent-card {
  padding: clamp(0.85rem, 2.4vw, 1.05rem);
  border: 1px solid var(--v6-line-strong);
  border-radius: 14px;
  background: linear-gradient(165deg, var(--v6-bg-soft), var(--v6-bg));
  box-shadow: 0 24px 60px -22px rgba(0, 0, 0, 0.7);
}
.consent.light .consent-card {
  background: linear-gradient(165deg, #ffffff, var(--v6-bg-soft));
  box-shadow: 0 24px 60px -24px rgba(15, 23, 42, 0.28);
}

.consent-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.45rem;
  font-family: var(--v6-mono);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--v6-gold);
}
.consent-eyebrow i {
  width: 20px;
  height: 1px;
  background: currentColor;
  opacity: 0.7;
}

.consent-text {
  margin: 0;
  color: var(--v6-muted);
  font-family: var(--v6-body);
  font-size: 0.82rem;
  line-height: 1.5;
}

.consent-actions {
  display: flex;
  gap: 0.5rem;
  margin: 0.85rem 0 0;
}

.consent-btn {
  flex: 1;
  min-height: 2.4rem;
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  cursor: pointer;
  font-family: var(--v6-display);
  font-size: 0.84rem;
  font-weight: 700;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.consent-btn-ghost {
  border: 1px solid var(--v6-line-strong);
  background: transparent;
  color: var(--v6-ink);
}
.consent-btn-ghost:hover,
.consent-btn-ghost:focus-visible {
  border-color: var(--v6-gold);
  color: var(--v6-gold-hi);
}

.consent-btn-accept {
  border: 1px solid var(--v6-gold);
  background: var(--v6-gold);
  color: #031820;
}
.consent.light .consent-btn-accept { color: #ecfeff; }
.consent-btn-accept:hover,
.consent-btn-accept:focus-visible { background: var(--v6-gold-hi); border-color: var(--v6-gold-hi); }

.consent-btn:focus-visible { outline: 2px solid var(--v6-gold); outline-offset: 2px; }

.consent-link {
  display: inline-block;
  margin: 0.65rem 0 0;
  color: var(--v6-faint);
  font-family: var(--v6-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border-bottom: 1px solid var(--v6-line);
  transition: color 0.2s ease;
}
.consent-link:hover,
.consent-link:focus-visible { color: var(--v6-gold-hi); }

@media (max-width: 480px) {
  .consent { max-width: none; inset: auto 0 0 0; margin: 0 0.7rem 0.7rem; }
}

@media (prefers-reduced-motion: reduce) {
  .consent { animation: none; }
  .consent-btn { transition: none; }
}
</style>
