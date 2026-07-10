<template>
  <main ref="rootEl" class="v6-faq">
    <!-- HERO -->
    <section class="v6f-hero">
      <p class="v6-eyebrow v6-reveal"><i></i>{{ t('faq.hero.label') }}</p>
      <h1 class="v6-h1 v6-reveal">{{ t('faq.hero.title') }}<b class="v6-dot">.</b></h1>
      <p class="v6f-sub v6-reveal">{{ t('faq.hero.subtitle') }}</p>

      <div class="v6f-search v6-reveal">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
          <circle cx="9" cy="9" r="5.5" />
          <path d="m13.2 13.2 3.6 3.6" />
        </svg>
        <input
          ref="searchEl"
          v-model="searchQuery"
          type="search"
          :placeholder="t('faq.search.placeholder')"
          @keydown.esc="searchQuery = ''"
        />
        <button
          v-if="searchQuery"
          type="button"
          class="v6f-clear"
          :aria-label="t('common.aria.clearSearch')"
          @click="searchQuery = ''; searchEl?.focus()"
        >×</button>
        <kbd v-else aria-hidden="true">/</kbd>
      </div>
    </section>

    <!-- BODY -->
    <section class="v6f-body">
      <aside class="v6f-side v6-reveal">
        <nav class="v6f-cats" :aria-label="t('faq.hero.label')">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            :class="{ active: selectedCategory === cat }"
            @click="selectedCategory = cat"
          >
            <span>{{ cat === 'all' ? t('faq.filter.all') : cat }}</span>
            <span class="v6f-cat-count">{{ pad(categoryCounts[cat]) }}</span>
          </button>
        </nav>
        <div class="v6f-side-contact">
          <p>{{ t('faq.cta.title') }}</p>
          <a href="mailto:info@katsumii.com" class="v6-quiet">{{ t('faq.cta.button') }} <span aria-hidden="true">→</span></a>
        </div>
      </aside>

      <div class="v6f-list v6-reveal">
        <div class="v6f-list-head" aria-hidden="true">
          <span>{{ selectedCategory === 'all' ? t('faq.filter.all') : selectedCategory }}</span>
          <span>{{ pad(filteredItems.length) }} / {{ pad(faqItems.length) }}</span>
        </div>

        <template v-if="filteredItems.length > 0">
          <article v-for="(item, idx) in filteredItems" :key="itemKey(item)" class="v6f-item">
            <h2 class="v6f-q-wrap">
              <button
                type="button"
                class="v6f-q"
                :aria-expanded="isOpen(item)"
                @click="toggleItem(item)"
              >
                <span class="v6f-idx" :class="{ lit: isOpen(item) }">{{ pad(idx + 1) }}</span>
                <span class="v6f-q-text">
                  <template v-for="(seg, i) in highlight(item.question)" :key="i"><mark v-if="seg.hit">{{ seg.text }}</mark><template v-else>{{ seg.text }}</template></template>
                </span>
                <span class="v6f-toggle" :class="{ open: isOpen(item) }" aria-hidden="true"><i></i><i></i></span>
              </button>
            </h2>
            <div class="v6f-a" :class="{ open: isOpen(item) }">
              <div class="v6f-a-clip">
                <div class="v6f-a-inner">
                  <p>
                    <template v-for="(seg, i) in highlight(item.answer)" :key="i"><mark v-if="seg.hit">{{ seg.text }}</mark><template v-else>{{ seg.text }}</template></template>
                  </p>
                  <span class="v6f-chip">{{ item.category }}</span>
                </div>
              </div>
            </div>
          </article>
        </template>

        <div v-else class="v6f-empty">
          <p>{{ t('faq.empty') }}</p>
          <button type="button" class="v6-quiet" @click="searchQuery = ''; selectedCategory = 'all'">
            {{ t('faq.filter.all') }} <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="v6f-cta">
      <h2 class="v6f-cta-title v6-reveal">{{ t('faq.cta.title') }}</h2>
      <p class="v6f-cta-sub v6-reveal">{{ t('faq.cta.body') }}</p>
      <div class="v6f-cta-actions v6-reveal">
        <a href="mailto:info@katsumii.com" class="v6-btn v6-magnetic">{{ t('faq.cta.button') }} <span aria-hidden="true">→</span></a>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { useI18n } from "vue-i18n"
import { initMagnetic, initV6Reveals } from "../v6/motion.js"

const { locale, t, tm } = useI18n()

const rootEl = ref(null)
const searchEl = ref(null)
const searchQuery = ref("")
const selectedCategory = ref("all")
const openItems = ref(new Set())
let cleanups = []

const faqItems = computed(() => {
  const raw = tm("faq.items")
  return Array.isArray(raw) ? raw : []
})

const categories = computed(() => {
  const cats = [...new Set(faqItems.value.map((i) => i.category))]
  return ["all", ...cats]
})

const categoryCounts = computed(() => {
  const counts = { all: faqItems.value.length }
  faqItems.value.forEach((i) => { counts[i.category] = (counts[i.category] || 0) + 1 })
  return counts
})

const query = computed(() => searchQuery.value.trim().toLowerCase())

const filteredItems = computed(() => {
  const q = query.value
  return faqItems.value.filter((item) => {
    const matchCat = selectedCategory.value === "all" || item.category === selectedCategory.value
    if (!matchCat) return false
    if (!q) return true
    return item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
  })
})

const pad = (n) => String(n ?? 0).padStart(2, "0")

const itemKey = (item) => `${item.category}:${item.question}`

/* while searching, matches stay expanded so hits in answers are visible */
const isOpen = (item) => query.value.length >= 2 || openItems.value.has(itemKey(item))

const toggleItem = (item) => {
  if (query.value.length >= 2) return
  const next = new Set(openItems.value)
  const key = itemKey(item)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  openItems.value = next
}

/* split text into plain/hit segments for <mark> rendering without v-html */
const highlight = (text) => {
  const q = query.value
  if (q.length < 2) return [{ text, hit: false }]
  const segments = []
  const lower = text.toLowerCase()
  let pos = 0
  let hit = lower.indexOf(q)
  while (hit !== -1) {
    if (hit > pos) segments.push({ text: text.slice(pos, hit), hit: false })
    segments.push({ text: text.slice(hit, hit + q.length), hit: true })
    pos = hit + q.length
    hit = lower.indexOf(q, pos)
  }
  if (pos < text.length) segments.push({ text: text.slice(pos), hit: false })
  return segments
}

/* "/" focuses the search from anywhere on the page */
const onKeydown = (e) => {
  if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return
  const tag = document.activeElement?.tagName
  if (tag === "INPUT" || tag === "TEXTAREA") return
  e.preventDefault()
  searchEl.value?.focus()
}

watch([categories, locale], () => {
  if (!categories.value.includes(selectedCategory.value)) {
    selectedCategory.value = "all"
  }
  openItems.value = new Set()
})

onMounted(() => {
  cleanups.push(initV6Reveals(rootEl.value))
  cleanups.push(initMagnetic(rootEl.value))
  window.addEventListener("keydown", onKeydown)
  cleanups.push(() => window.removeEventListener("keydown", onKeydown))
})

onBeforeUnmount(() => {
  cleanups.forEach((off) => off && off())
  cleanups = []
})
</script>

<style scoped>
/* FAQ layout — shared tokens/chrome live in src/styles/v6.css */
.v6-faq { position: relative; z-index: 1; }

/* ── hero ── */
.v6f-hero {
  max-width: 880px;
  margin: 0 auto;
  padding: clamp(8rem, 18vh, 11rem) clamp(1.1rem, 4vw, 3rem) clamp(2.5rem, 6vh, 4rem);
  text-align: center;
}
.v6f-hero .v6-eyebrow { justify-content: center; }
.v6f-hero .v6-h1 { font-size: clamp(2.5rem, 5.4vw, 4.4rem); }
.v6f-sub {
  max-width: 36rem;
  margin: 0 auto;
  color: var(--v6-muted);
}

/* ── search ── */
.v6f-search {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  max-width: 34rem;
  margin: 2.4rem auto 0;
  padding: 0.85rem 1.1rem;
  border: 1px solid var(--v6-line);
  border-radius: 12px;
  background: var(--v6-panel);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
.v6f-search:focus-within {
  border-color: var(--v6-line-strong);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--v6-gold) 12%, transparent);
}
.v6f-search svg {
  flex: none;
  width: 18px;
  height: 18px;
  color: var(--v6-faint);
}
.v6f-search:focus-within svg { color: var(--v6-gold); }
.v6f-search input {
  width: 100%;
  background: transparent;
  border: 0;
  outline: none;
  color: var(--v6-ink);
  font-size: 0.95rem;
}
.v6f-search input::placeholder { color: var(--v6-faint); }
.v6f-search input::-webkit-search-cancel-button { display: none; }
.v6f-search kbd {
  flex: none;
  font-family: var(--v6-mono);
  font-size: 0.68rem;
  color: var(--v6-faint);
  border: 1px solid var(--v6-line);
  border-radius: 5px;
  padding: 0.1rem 0.45rem;
}
.v6f-clear {
  flex: none;
  border: 0;
  background: transparent;
  color: var(--v6-faint);
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s ease;
}
.v6f-clear:hover { color: var(--v6-ink); }

/* ── body grid ── */
.v6f-body {
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(1rem, 4vh, 2.5rem) clamp(1.1rem, 4vw, 3rem) clamp(3rem, 8vh, 5rem);
  display: grid;
  grid-template-columns: minmax(220px, 3fr) 8fr;
  gap: clamp(1.6rem, 4vw, 3.5rem);
  align-items: start;
}

/* ── sidebar ── */
.v6f-side { position: sticky; top: 6rem; }
.v6f-cats {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--v6-line);
}
.v6f-cats button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 0.75rem 0.2rem;
  border: 0;
  border-bottom: 1px solid var(--v6-line);
  background: transparent;
  cursor: pointer;
  font-family: var(--v6-mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--v6-muted);
  text-align: left;
  transition: color 0.2s ease, padding-left 0.25s ease;
}
.v6f-cats button:hover { color: var(--v6-ink); }
.v6f-cats button.active { color: var(--v6-gold); padding-left: 0.6rem; }
.v6f-cat-count { color: var(--v6-faint); font-size: 0.66rem; }
.v6f-cats button.active .v6f-cat-count { color: var(--v6-gold); }
.v6f-side-contact { margin-top: 2rem; }
.v6f-side-contact p {
  margin: 0 0 0.6rem;
  color: var(--v6-muted);
  font-size: 0.88rem;
}

/* ── list panel ── */
.v6f-list {
  border: 1px solid var(--v6-line);
  border-radius: 18px;
  background: linear-gradient(165deg, var(--v6-panel), rgba(12, 21, 18, 0.22));
  overflow: hidden;
}
.v6.light .v6f-list {
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.72), rgba(238, 244, 240, 0.4));
}
.v6f-list-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem clamp(1.2rem, 2.4vw, 1.8rem);
  border-bottom: 1px solid var(--v6-line);
  font-family: var(--v6-mono);
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--v6-faint);
}
.v6f-item { border-bottom: 1px solid var(--v6-line); }
.v6f-item:last-child { border-bottom: 0; }
.v6f-q-wrap { margin: 0; }
.v6f-q {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: baseline;
  gap: 1.1rem;
  width: 100%;
  padding: 1.15rem clamp(1.2rem, 2.4vw, 1.8rem);
  border: 0;
  background: transparent;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.2s ease;
}
.v6f-q:hover { background: rgba(255, 255, 255, 0.025); }
.v6.light .v6f-q:hover { background: rgba(2, 12, 20, 0.03); }
.v6f-idx {
  font-family: var(--v6-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: var(--v6-faint);
  font-variant-numeric: tabular-nums;
  transition: color 0.25s ease;
}
.v6f-idx.lit { color: var(--v6-gold); }
.v6f-q-text {
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: 1.02rem;
  letter-spacing: -0.01em;
  color: var(--v6-ink);
}
.v6f-toggle {
  position: relative;
  align-self: center;
  width: 14px;
  height: 14px;
}
.v6f-toggle i {
  position: absolute;
  top: 50%; left: 0;
  width: 100%;
  height: 1.5px;
  background: var(--v6-faint);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.25s ease;
}
.v6f-toggle i:last-child { transform: rotate(90deg); }
.v6f-toggle.open i { background: var(--v6-gold); }
.v6f-toggle.open i:last-child { transform: rotate(0deg); }

/* answer expands via grid-rows — no JS height measuring */
.v6f-a {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.v6f-a.open { grid-template-rows: 1fr; }
.v6f-a-clip { overflow: hidden; }
.v6f-a-inner { padding: 0 clamp(1.2rem, 2.4vw, 1.8rem) 1.3rem calc(clamp(1.2rem, 2.4vw, 1.8rem) + 1.1rem + 1.6ch); }
.v6f-a-inner p {
  margin: 0;
  color: var(--v6-muted);
  font-size: 0.94rem;
  line-height: 1.65;
  max-width: 46rem;
}
.v6f-chip {
  display: inline-block;
  margin-top: 0.9rem;
  font-family: var(--v6-mono);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--v6-gold);
  border: 1px solid var(--v6-line-strong);
  border-radius: 999px;
  padding: 0.22rem 0.6rem;
}
mark {
  background: color-mix(in srgb, var(--v6-gold) 24%, transparent);
  color: var(--v6-ink);
  border-radius: 3px;
  padding: 0 0.1em;
}

/* ── empty state ── */
.v6f-empty {
  padding: 3.5rem 1.5rem;
  text-align: center;
}
.v6f-empty p {
  margin: 0 0 1rem;
  font-family: var(--v6-mono);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--v6-faint);
}

/* ── cta ── */
.v6f-cta {
  text-align: center;
  padding: clamp(3rem, 9vh, 6rem) clamp(1.1rem, 4vw, 3rem) clamp(6rem, 15vh, 10rem);
}
.v6f-cta-title {
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: clamp(1.9rem, 4.6vw, 3.2rem);
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 0 0 1rem;
}
.v6f-cta-sub {
  color: var(--v6-muted);
  max-width: 30rem;
  margin: 0 auto 2.2rem;
}
.v6f-cta-actions {
  display: flex;
  justify-content: center;
}

/* ── responsive ── */
@media (max-width: 900px) {
  .v6f-body { grid-template-columns: 1fr; }
  .v6f-side { position: static; }
  .v6f-cats { flex-direction: row; flex-wrap: wrap; gap: 0.5rem; border-top: 0; }
  .v6f-cats button {
    border: 1px solid var(--v6-line);
    border-radius: 999px;
    padding: 0.45rem 0.9rem;
  }
  .v6f-cats button.active { border-color: var(--v6-line-strong); padding-left: 0.9rem; }
  .v6f-side-contact { display: none; }
  .v6f-search kbd { display: none; }
  .v6f-a-inner { padding-left: clamp(1.2rem, 2.4vw, 1.8rem); }
}
@media (max-width: 640px) {
  .v6f-q { grid-template-columns: auto 1fr auto; gap: 0.7rem; padding: 1rem; }
  .v6f-list-head { padding-inline: 1rem; }
  .v6f-a-inner { padding: 0 1rem 1.15rem; }
  .v6f-search input { font-size: 1rem; }
}
</style>
