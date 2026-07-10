<template>
  <main class="v6-contact">
    <section class="v6c-wrap">
      <header class="v6c-hero">
        <p class="v6-eyebrow"><i></i>{{ t('contactPage.hero.label') }}</p>
        <h1 class="v6-h1 v6c-title">{{ t('contactPage.hero.title') }}<b class="v6-dot">.</b></h1>
        <p class="v6c-sub">{{ t('contactPage.hero.description') }}</p>
      </header>

      <!-- success state -->
      <div v-if="submitted" class="v6c-panel v6c-success">
        <span class="v6c-success-icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="m4 10.6 4.2 4.2L16 6.4" />
          </svg>
        </span>
        <h2>{{ t('contactPage.success.title') }}</h2>
        <p>
          {{ t('contactPage.success.description') }}
          <a href="mailto:info@katsumii.com">{{ t('contactPage.success.directLink') }}</a>.
        </p>
        <button type="button" class="v6-quiet" @click="reset">{{ t('contactPage.success.reset') }} <span aria-hidden="true">→</span></button>
      </div>

      <!-- form -->
      <form v-else class="v6c-panel" @submit.prevent="handleSubmit">
        <div class="v6c-grid">
          <div class="v6c-field">
            <label for="contact-name">{{ t('contactPage.form.name') }}</label>
            <input
              id="contact-name" v-model="form.name" type="text" required
              autocomplete="name" :placeholder="t('contactPage.form.namePlaceholder')"
            />
          </div>
          <div class="v6c-field">
            <label for="contact-email">{{ t('contactPage.form.email') }}</label>
            <input
              id="contact-email" v-model="form.email" type="email" required
              autocomplete="email" :placeholder="t('contactPage.form.emailPlaceholder')"
            />
          </div>
        </div>

        <div class="v6c-field">
          <label for="contact-subject">{{ t('contactPage.form.subject') }}</label>
          <input
            id="contact-subject" v-model="form.subject" type="text" required
            :placeholder="t('contactPage.form.subjectPlaceholder')"
          />
        </div>

        <div class="v6c-field">
          <label for="contact-message">{{ t('contactPage.form.message') }}</label>
          <textarea
            id="contact-message" v-model="form.message" required rows="7"
            :placeholder="t('contactPage.form.messagePlaceholder')"
          ></textarea>
        </div>

        <div class="v6c-foot">
          <p>{{ t('contactPage.form.mailHint') }} <b>info@katsumii.com</b></p>
          <button type="submit" class="v6-btn v6-magnetic">{{ t('contactPage.form.submit') }} <span aria-hidden="true">→</span></button>
        </div>
      </form>

      <p class="v6c-direct">
        {{ t('contactPage.direct.prefix') }}
        <a href="mailto:info@katsumii.com">info@katsumii.com</a>
      </p>
    </section>
  </main>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const submitted = ref(false)
const form = reactive({ name: "", email: "", subject: "", message: "" })

const handleSubmit = () => {
  const subject = encodeURIComponent(form.subject || t("contactPage.mailtoFallbackSubject"))
  const body = encodeURIComponent(
    `${t("contactPage.mailtoName")}: ${form.name}\n${t("contactPage.mailtoEmail")}: ${form.email}\n\n${form.message}`
  )
  window.location.href = `mailto:info@katsumii.com?subject=${subject}&body=${body}`
  submitted.value = true
}

const reset = () => {
  form.name = ""
  form.email = ""
  form.subject = ""
  form.message = ""
  submitted.value = false
}
</script>

<style scoped>
/* Contact layout — shared tokens/chrome live in src/styles/v6.css */
.v6-contact { position: relative; z-index: 1; }

.v6c-wrap {
  max-width: 680px;
  margin: 0 auto;
  padding: clamp(8rem, 18vh, 11rem) clamp(1.1rem, 4vw, 3rem) clamp(6rem, 15vh, 10rem);
}
.v6c-hero { text-align: center; margin-bottom: clamp(2.2rem, 5vh, 3.5rem); }
.v6c-hero .v6-eyebrow { justify-content: center; }
.v6c-title { font-size: clamp(2.2rem, 4.6vw, 3.6rem); }
.v6c-sub { max-width: 32rem; margin: 0 auto; color: var(--v6-muted); }

.v6c-panel {
  padding: clamp(1.4rem, 3vw, 2.2rem);
  border: 1px solid var(--v6-line);
  border-radius: 18px;
  background: linear-gradient(165deg, var(--v6-panel), rgba(12, 21, 18, 0.22));
}
.v6.light .v6c-panel {
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.72), rgba(238, 244, 240, 0.4));
}

.v6c-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.1rem;
}
.v6c-field { margin-bottom: 1.1rem; }
.v6c-field label {
  display: block;
  margin-bottom: 0.45rem;
  font-family: var(--v6-mono);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--v6-faint);
}
.v6c-field input,
.v6c-field textarea {
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--v6-line);
  border-radius: 10px;
  background: rgba(2, 8, 14, 0.25);
  color: var(--v6-ink);
  font-size: 0.92rem;
  font-family: var(--v6-body);
  outline: none;
  resize: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
.v6.light .v6c-field input,
.v6.light .v6c-field textarea { background: rgba(255, 255, 255, 0.6); }
.v6c-field input::placeholder,
.v6c-field textarea::placeholder { color: var(--v6-faint); }
.v6c-field input:focus,
.v6c-field textarea:focus {
  border-color: var(--v6-line-strong);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--v6-gold) 10%, transparent);
}

.v6c-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  flex-wrap: wrap;
  margin-top: 0.4rem;
}
.v6c-foot p {
  margin: 0;
  font-size: 0.78rem;
  color: var(--v6-faint);
}
.v6c-foot b { color: var(--v6-muted); font-weight: 600; }

/* success */
.v6c-success { text-align: center; padding: clamp(2.2rem, 5vw, 3.2rem); }
.v6c-success-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  margin-bottom: 1.2rem;
  border: 1px solid var(--v6-line-strong);
  border-radius: 50%;
  color: var(--v6-gold);
}
.v6c-success-icon svg { width: 20px; height: 20px; }
.v6c-success h2 {
  margin: 0 0 0.6rem;
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: -0.01em;
}
.v6c-success p {
  max-width: 26rem;
  margin: 0 auto 1.6rem;
  color: var(--v6-muted);
  font-size: 0.92rem;
}
.v6c-success a,
.v6c-direct a {
  color: var(--v6-gold);
  text-decoration: none;
  border-bottom: 1px solid var(--v6-line-strong);
  transition: color 0.2s ease;
}
.v6c-success a:hover,
.v6c-direct a:hover { color: var(--v6-gold-hi); }

.v6c-direct {
  margin: 1.8rem 0 0;
  text-align: center;
  font-size: 0.88rem;
  color: var(--v6-muted);
}

@media (max-width: 640px) {
  .v6c-wrap { padding-top: 7rem; }
  .v6c-grid { grid-template-columns: 1fr; gap: 0; }
  .v6c-field input,
  .v6c-field textarea { min-height: 48px; font-size: 1rem; }
  .v6c-field textarea { min-height: 9rem; }
  .v6c-foot { align-items: stretch; }
  .v6c-foot .v6-btn { width: 100%; }
}
</style>
