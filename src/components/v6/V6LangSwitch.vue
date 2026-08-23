<template>
  <div ref="rootEl" class="v6-lang">
    <button
      type="button"
      class="v6-theme v6-lang-btn"
      :class="{ open }"
      aria-haspopup="menu"
      :aria-expanded="open"
      aria-controls="v6-lang-menu"
      :aria-label="t('common.aria.changeLanguage')"
      @click="open = !open"
    >
      {{ LOCALE_META[lang].short }}
    </button>

    <div
      id="v6-lang-menu"
      class="v6-nav-menu v6-lang-menu"
      :class="{ open }"
      role="menu"
      :aria-label="t('common.aria.changeLanguage')"
    >
      <RouterLink
        v-for="locale in SUPPORTED_LOCALES"
        :key="locale"
        role="menuitem"
        :to="pathFor(locale)"
        :lang="HREFLANG_BY_LOCALE[locale]"
        :aria-current="locale === lang ? 'true' : undefined"
        :tabindex="open ? undefined : -1"
        @click="open = false"
      >
        <span class="v6-nav-menu-idx" aria-hidden="true">{{ LOCALE_META[locale].short }}</span>
        <!-- set like the wordmark: display face, same size, ember full stop -->
        <span class="v6-lang-name">{{ LOCALE_META[locale].name }}<b class="v6-dot" aria-hidden="true">.</b></span>
        <svg v-if="locale === lang" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M2.5 6.4 4.9 8.8 9.5 3.6" />
        </svg>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
import {
  HREFLANG_BY_LOCALE,
  SUPPORTED_LOCALES,
  localizedPathForRoute,
  normalizeLocale,
} from "../../utils/routes.js"

/* Language names stay in their own language — a reader looking for their
   language recognises it written the way they write it, not translated. */
const LOCALE_META = {
  en: { short: "EN", name: "English" },
  de: { short: "DE", name: "Deutsch" },
  zht: { short: "繁", name: "繁體中文" },
}

const { t } = useI18n()
const route = useRoute()
const rootEl = ref(null)
const open = ref(false)

const lang = computed(() => {
  const raw = Array.isArray(route.params.locale) ? route.params.locale[0] : route.params.locale
  return normalizeLocale(raw)
})

/* Switching language is a real navigation, not just an i18n swap — the URL
   carries the locale, so /de/pricing becomes /zht/pricing and hreflang holds.
   Query and hash ride along so a deep link like #system-requirements survives. */
const pathFor = (locale) => ({
  path: localizedPathForRoute(route.path, locale),
  query: route.query,
  hash: route.hash,
})

const onPointerDown = (event) => {
  if (open.value && !rootEl.value?.contains(event.target)) open.value = false
}
const onKeydown = (event) => {
  if (event.key === "Escape" && open.value) open.value = false
}

watch(() => route.fullPath, () => { open.value = false })

onMounted(() => {
  document.addEventListener("pointerdown", onPointerDown)
  document.addEventListener("keydown", onKeydown)
})
onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onPointerDown)
  document.removeEventListener("keydown", onKeydown)
})
</script>
