<template>
  <main class="v6-legal">
    <div class="v6l-layout">
      <!-- TOC -->
      <aside class="v6l-toc">
        <p class="v6l-toc-head">{{ t(`${prefix}.hero.title`) }}</p>
        <nav :aria-label="t(`${prefix}.hero.title`)">
          <a
            v-for="(section, i) in sections"
            :key="section.title"
            :href="`#section-${i}`"
            :class="{ active: activeSection === i }"
            @click.prevent="scrollTo(i)"
          >
            <span class="v6l-toc-idx">{{ pad(i + 1) }}</span>
            <span>{{ tocLabel(section.title) }}</span>
          </a>
        </nav>
      </aside>

      <!-- CONTENT -->
      <div class="v6l-content">
        <header class="v6l-hero">
          <p class="v6-eyebrow"><i></i>{{ t(`${prefix}.hero.label`) }}</p>
          <h1 class="v6-h1 v6l-title">{{ t(`${prefix}.hero.title`) }}<b class="v6-dot">.</b></h1>
          <p class="v6l-sub">{{ t(`${prefix}.hero.description`) }}</p>
        </header>

        <article
          v-for="(section, i) in sections"
          :id="`section-${i}`"
          :key="section.title"
          ref="sectionEls"
          class="v6l-section"
        >
          <h2>{{ section.title }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <ul v-if="section.list?.length">
            <li v-for="item in section.list" :key="item">{{ item }}</li>
          </ul>
          <p v-for="paragraph in section.paragraphsAfter ?? []" :key="paragraph">{{ paragraph }}</p>
        </article>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { useI18n } from "vue-i18n"

const props = defineProps({
  prefix: { type: String, required: true }, // locale namespace, e.g. "termsPage"
})

const { locale, t, tm } = useI18n()

const sections = computed(() => {
  const raw = tm(`${props.prefix}.sections`)
  return Array.isArray(raw) ? raw : []
})

const pad = (n) => String(n).padStart(2, "0")
/* strip the leading "1. " numbering — the TOC renders its own index */
const tocLabel = (title) => title.replace(/^\d+\.\s*/, "")

// ---------- scrollspy ----------
const sectionEls = ref([])
const activeSection = ref(0)
let observer = null

const scrollTo = (i) => {
  const el = sectionEls.value[i]
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 96
  window.scrollTo({ top, behavior: "smooth" })
}

const observe = () => {
  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const idx = sectionEls.value.indexOf(entry.target)
        if (idx !== -1) activeSection.value = idx
      })
    },
    { rootMargin: "-20% 0px -70% 0px" },
  )
  sectionEls.value.forEach((el) => observer.observe(el))
}

onMounted(observe)
watch(locale, () => requestAnimationFrame(observe))
onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
/* Legal layout — shared tokens/chrome live in src/styles/v6.css */
.v6-legal { position: relative; z-index: 1; }

.v6l-layout {
  max-width: 1240px;
  margin: 0 auto;
  padding: var(--v6-document-top) var(--v6-gutter) var(--v6-document-bottom);
  display: grid;
  grid-template-columns: 264px 1fr;
  gap: clamp(2rem, 4vw, 4.5rem);
  align-items: start;
}

/* ── toc ── */
.v6l-toc {
  position: sticky;
  top: 6rem;
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
  scrollbar-width: thin;
}
.v6l-toc-head {
  margin: 0 0 0.4rem;
  padding-bottom: 0.7rem;
  border-bottom: 1px solid var(--v6-line);
  font-family: var(--v6-mono);
  font-size: 0.6rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--v6-faint);
}
.v6l-toc nav { display: flex; flex-direction: column; }
.v6l-toc a {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  padding: 0.42rem 0.2rem;
  text-decoration: none;
  font-size: 0.82rem;
  line-height: 1.35;
  color: var(--v6-muted);
  transition: color 0.2s ease;
}
.v6l-toc a:hover { color: var(--v6-ink); }
.v6l-toc a.active { color: var(--v6-gold); }
.v6l-toc-idx {
  flex: none;
  font-family: var(--v6-mono);
  font-size: 0.62rem;
  color: var(--v6-faint);
  font-variant-numeric: tabular-nums;
}
.v6l-toc a.active .v6l-toc-idx { color: var(--v6-gold); }

/* ── content ── */
.v6l-hero { margin-bottom: clamp(2.5rem, 6vh, 4rem); }
.v6l-title { font-size: clamp(2.2rem, 4.6vw, 3.6rem); }
.v6l-sub { max-width: 38rem; color: var(--v6-muted); margin: 0; }

.v6l-section {
  max-width: 44rem;
  padding: 1.8rem 0;
  border-top: 1px solid var(--v6-line);
  scroll-margin-top: 6rem;
}
.v6l-section h2 {
  margin: 0 0 1rem;
  font-family: var(--v6-mono);
  font-size: 0.74rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--v6-gold);
}
.v6l-section p {
  margin: 0 0 0.9rem;
  color: var(--v6-muted);
  font-size: 0.94rem;
  line-height: 1.7;
}
.v6l-section p:last-child { margin-bottom: 0; }
.v6l-section ul {
  list-style: none;
  margin: 0 0 0.9rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.v6l-section ul li {
  position: relative;
  padding-left: 1.2rem;
  color: var(--v6-muted);
  font-size: 0.92rem;
  line-height: 1.6;
}
.v6l-section ul li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--v6-gold);
  opacity: 0.7;
}

/* ── responsive ── */
@media (max-width: 900px) {
  .v6l-layout { grid-template-columns: 1fr; }
  .v6l-toc { position: static; max-height: none; order: 2; margin-top: 3rem; }
}
</style>
