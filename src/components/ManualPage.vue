<template>
  <main ref="rootEl" class="v6-manual">
    <div class="v6man-layout">
      <!-- SCRIM (mobile sidebar) -->
      <div v-if="sidebarOpen" class="v6man-scrim" @click="sidebarOpen = false"></div>

      <!-- SIDEBAR -->
      <aside class="v6man-side" :class="{ open: sidebarOpen }">
        <div class="v6man-search">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
            <circle cx="9" cy="9" r="5.5" />
            <path d="m13.2 13.2 3.6 3.6" />
          </svg>
          <input
            v-model="searchQuery"
            type="search"
            :placeholder="t('manualPage.search.placeholder')"
            @keydown.esc="searchQuery = ''"
          />
        </div>

        <button
          type="button"
          class="v6man-overview-link"
          :class="{ active: !activeTopic }"
          @click="goOverview(); sidebarOpen = false"
        >
          {{ t('manualPage.nav.overview') }}
        </button>

        <nav class="v6man-topics" :aria-label="t('manualPage.nav.overview')">
          <div v-for="(topic, ti) in visibleTopics" :key="topic.id" class="v6man-topic">
            <button
              type="button"
              class="v6man-topic-btn"
              :class="{ active: activeTopic?.id === topic.id }"
              :aria-expanded="isExpanded(topic)"
              @click="selectTopic(topic); sidebarOpen = false"
            >
              <span class="v6man-idx">{{ pad(topicIndex(topic) + 1) }}</span>
              <span>{{ t(topic.titleKey) }}</span>
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" :class="{ open: isExpanded(topic) }" aria-hidden="true">
                <path d="m3 4.5 3 3 3-3" />
              </svg>
            </button>
            <div v-if="isExpanded(topic)" class="v6man-articles">
              <button
                v-for="article in matchingArticles(topic)"
                :key="article.id"
                type="button"
                :class="{ active: activeArticle?.id === article.id && activeTopic?.id === topic.id }"
                @click="selectTopic(topic, article); sidebarOpen = false"
              >
                {{ t(article.titleKey) }}
              </button>
            </div>
          </div>
          <p v-if="query && visibleTopics.length === 0" class="v6man-noresults">{{ t('manualPage.search.noResults') }}</p>
        </nav>
      </aside>

      <!-- CONTENT -->
      <div class="v6man-content">
        <!-- OVERVIEW -->
        <template v-if="!activeTopic">
          <section :key="'overview'" class="v6man-view">
            <p class="v6-eyebrow"><i></i>{{ t('manualPage.hero.eyebrow') }}</p>
            <h1 class="v6-h1 v6man-title">{{ t('manualPage.hero.heading') }}<b class="v6-dot">.</b></h1>
            <p class="v6man-sub">{{ t('manualPage.hero.description') }}</p>

            <div class="v6man-cards">
              <button
                v-for="(topic, ti) in TOPICS"
                :key="topic.id"
                type="button"
                class="v6man-card"
                @click="selectTopic(topic)"
              >
                <span class="v6man-idx">{{ pad(ti + 1) }}</span>
                <h2>{{ t(topic.titleKey) }}</h2>
                <p>{{ t(topic.descriptionKey) }}</p>
                <span class="v6man-card-foot">
                  <span>{{ topic.articles.length }} {{ topic.articles.length === 1 ? t('manualPage.article') : t('manualPage.articles') }}</span>
                  <span aria-hidden="true">→</span>
                </span>
              </button>
            </div>
          </section>
        </template>

        <!-- ARTICLE -->
        <template v-else>
          <section :key="articleViewKey" class="v6man-view v6man-article">
            <nav class="v6man-crumb" aria-label="Breadcrumb">
              <button type="button" @click="goOverview">{{ t('manualPage.nav.overview') }}</button>
              <span aria-hidden="true">/</span>
              <button type="button" @click="selectTopic(activeTopic)">{{ t(activeTopic.titleKey) }}</button>
              <template v-if="activeArticle">
                <span aria-hidden="true">/</span>
                <span class="v6man-crumb-here" aria-current="page">{{ t(activeArticle.titleKey) }}</span>
              </template>
            </nav>

            <article v-if="activeArticle">
              <p class="v6-eyebrow"><i></i>{{ t(activeTopic.titleKey) }} — {{ pad(currentIndex + 1) }} / {{ pad(activeTopic.articles.length) }}</p>
              <h1 class="v6-h2 v6man-article-title">{{ t(activeArticle.titleKey) }}</h1>
              <div class="v6man-body">
                <p v-for="(para, i) in articleContent" :key="i">{{ para }}</p>
              </div>
            </article>

            <!-- prev / next -->
            <nav class="v6man-pager" aria-label="Article navigation">
              <button v-if="prevArticle" type="button" @click="selectTopic(activeTopic, prevArticle)">
                <span class="v6man-pager-label"><span aria-hidden="true">←</span> {{ t('manualPage.prev') }}</span>
                <span class="v6man-pager-title">{{ t(prevArticle.titleKey) }}</span>
              </button>
              <button v-else type="button" class="v6man-pager-home" @click="goOverview">
                <span class="v6man-pager-label"><span aria-hidden="true">←</span> {{ t('manualPage.backToOverview') }}</span>
              </button>
              <button v-if="nextArticle" type="button" class="v6man-pager-next" @click="selectTopic(activeTopic, nextArticle)">
                <span class="v6man-pager-label">{{ t('manualPage.next') }} <span aria-hidden="true">→</span></span>
                <span class="v6man-pager-title">{{ t(nextArticle.titleKey) }}</span>
              </button>
            </nav>
          </section>
        </template>
      </div>
    </div>

    <!-- MOBILE FAB -->
    <button type="button" class="v6man-fab" @click="sidebarOpen = !sidebarOpen">
      <svg v-if="sidebarOpen" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
        <path d="m4 4 8 8M12 4l-8 8" />
      </svg>
      <svg v-else viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
        <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />
      </svg>
      {{ sidebarOpen ? t('manualPage.mobile.closeTopics') : t('manualPage.mobile.openTopics') }}
    </button>
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"

const { t, tm } = useI18n()

const TOPICS = [
  {
    id: "getting-started",
    titleKey: "manualPage.topics.gettingStarted.title",
    descriptionKey: "manualPage.topics.gettingStarted.description",
    articles: [
      { id: "installation", titleKey: "manualPage.topics.gettingStarted.articles.installation.title", contentKey: "manualPage.topics.gettingStarted.articles.installation.content" },
      { id: "first-launch",  titleKey: "manualPage.topics.gettingStarted.articles.firstLaunch.title",  contentKey: "manualPage.topics.gettingStarted.articles.firstLaunch.content" },
      { id: "setup",         titleKey: "manualPage.topics.gettingStarted.articles.setup.title",         contentKey: "manualPage.topics.gettingStarted.articles.setup.content" },
    ],
  },
  {
    id: "journal",
    titleKey: "manualPage.topics.journal.title",
    descriptionKey: "manualPage.topics.journal.description",
    articles: [
      { id: "logging",      titleKey: "manualPage.topics.journal.articles.logging.title",      contentKey: "manualPage.topics.journal.articles.logging.content" },
      { id: "screenshots",  titleKey: "manualPage.topics.journal.articles.screenshots.title",  contentKey: "manualPage.topics.journal.articles.screenshots.content" },
      { id: "tags",         titleKey: "manualPage.topics.journal.articles.tags.title",         contentKey: "manualPage.topics.journal.articles.tags.content" },
      { id: "notes",        titleKey: "manualPage.topics.journal.articles.notes.title",        contentKey: "manualPage.topics.journal.articles.notes.content" },
    ],
  },
  {
    id: "accounts",
    titleKey: "manualPage.topics.accounts.title",
    descriptionKey: "manualPage.topics.accounts.description",
    articles: [
      { id: "add-account", titleKey: "manualPage.topics.accounts.articles.addAccount.title", contentKey: "manualPage.topics.accounts.articles.addAccount.content" },
      { id: "prop-rules",  titleKey: "manualPage.topics.accounts.articles.propRules.title",  contentKey: "manualPage.topics.accounts.articles.propRules.content" },
      { id: "progress",    titleKey: "manualPage.topics.accounts.articles.progress.title",   contentKey: "manualPage.topics.accounts.articles.progress.content" },
    ],
  },
  {
    id: "analytics",
    titleKey: "manualPage.topics.analytics.title",
    descriptionKey: "manualPage.topics.analytics.description",
    articles: [
      { id: "dashboard",   titleKey: "manualPage.topics.analytics.articles.dashboard.title",  contentKey: "manualPage.topics.analytics.articles.dashboard.content" },
      { id: "setup-stats", titleKey: "manualPage.topics.analytics.articles.setupStats.title", contentKey: "manualPage.topics.analytics.articles.setupStats.content" },
      { id: "consistency", titleKey: "manualPage.topics.analytics.articles.consistency.title",contentKey: "manualPage.topics.analytics.articles.consistency.content" },
    ],
  },
  {
    id: "calendar",
    titleKey: "manualPage.topics.calendar.title",
    descriptionKey: "manualPage.topics.calendar.description",
    articles: [
      { id: "navigation", titleKey: "manualPage.topics.calendar.articles.navigation.title", contentKey: "manualPage.topics.calendar.articles.navigation.content" },
      { id: "patterns",   titleKey: "manualPage.topics.calendar.articles.patterns.title",   contentKey: "manualPage.topics.calendar.articles.patterns.content" },
    ],
  },
  {
    id: "settings",
    titleKey: "manualPage.topics.settings.title",
    descriptionKey: "manualPage.topics.settings.description",
    articles: [
      { id: "general", titleKey: "manualPage.topics.settings.articles.general.title", contentKey: "manualPage.topics.settings.articles.general.content" },
      { id: "alerts",  titleKey: "manualPage.topics.settings.articles.alerts.title",  contentKey: "manualPage.topics.settings.articles.alerts.content" },
      { id: "backup",  titleKey: "manualPage.topics.settings.articles.backup.title",  contentKey: "manualPage.topics.settings.articles.backup.content" },
    ],
  },
]

// ---------- State ----------
const rootEl = ref(null)
const activeTopic = ref(null)
const activeArticle = ref(null)
const sidebarOpen = ref(false)
const searchQuery = ref("")

const pad = (n) => String(n).padStart(2, "0")
const topicIndex = (topic) => TOPICS.findIndex((tp) => tp.id === topic.id)
const articleViewKey = computed(() => `${activeTopic.value?.id}:${activeArticle.value?.id}`)

// ---------- Search (sidebar) ----------
const query = computed(() => searchQuery.value.trim().toLowerCase())

const topicMatches = (topic) => t(topic.titleKey).toLowerCase().includes(query.value)

const matchingArticles = (topic) => {
  if (!query.value || topicMatches(topic)) return topic.articles
  return topic.articles.filter((a) => t(a.titleKey).toLowerCase().includes(query.value))
}

const visibleTopics = computed(() => {
  if (!query.value) return TOPICS
  return TOPICS.filter((tp) => topicMatches(tp) || matchingArticles(tp).length > 0)
})

/* topics expand when active or while a search narrows them down */
const isExpanded = (topic) => activeTopic.value?.id === topic.id || (!!query.value && matchingArticles(topic).length > 0)

// ---------- Article context ----------
const articleContent = computed(() => {
  if (!activeArticle.value) return []
  const raw = tm(activeArticle.value.contentKey)
  return Array.isArray(raw) ? raw : []
})

const currentIndex = computed(() =>
  (activeTopic.value?.articles ?? []).findIndex((a) => a.id === activeArticle.value?.id)
)

const prevArticle = computed(() => {
  const i = currentIndex.value
  return i > 0 ? activeTopic.value.articles[i - 1] : null
})

const nextArticle = computed(() => {
  const i = currentIndex.value
  const list = activeTopic.value?.articles ?? []
  return i >= 0 && i < list.length - 1 ? list[i + 1] : null
})

// ---------- Actions / deep-link ----------
const syncUrl = () => {
  const url = new URL(window.location.href)
  if (activeTopic.value) {
    url.searchParams.set("topic", activeTopic.value.id)
    if (activeArticle.value) url.searchParams.set("article", activeArticle.value.id)
    else url.searchParams.delete("article")
  } else {
    url.searchParams.delete("topic")
    url.searchParams.delete("article")
  }
  history.replaceState(null, "", url.toString())
}

const selectTopic = (topic, article) => {
  activeTopic.value = topic
  activeArticle.value = article || topic.articles[0]
  syncUrl()
  window.scrollTo({ top: 0, behavior: "smooth" })
}

const goOverview = () => {
  activeTopic.value = null
  activeArticle.value = null
  syncUrl()
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// ---------- Keyboard: ← / → between articles ----------
const onKeydown = (e) => {
  if (!activeTopic.value || e.ctrlKey || e.metaKey || e.altKey) return
  const tag = document.activeElement?.tagName
  if (tag === "INPUT" || tag === "TEXTAREA") return
  if (e.key === "ArrowLeft" && prevArticle.value) selectTopic(activeTopic.value, prevArticle.value)
  if (e.key === "ArrowRight" && nextArticle.value) selectTopic(activeTopic.value, nextArticle.value)
}

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const found = TOPICS.find((tp) => tp.id === params.get("topic"))
  if (found) {
    activeTopic.value = found
    activeArticle.value = found.articles.find((a) => a.id === params.get("article")) || found.articles[0]
  }
  window.addEventListener("keydown", onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown)
})
</script>

<style scoped>
/* Manual layout — shared tokens/chrome live in src/styles/v6.css */
.v6-manual { position: relative; z-index: 1; }

.v6man-layout {
  max-width: 1240px;
  margin: 0 auto;
  padding: var(--v6-document-top) var(--v6-gutter) var(--v6-document-bottom);
  display: grid;
  grid-template-columns: 264px 1fr;
  gap: clamp(2rem, 4vw, 4rem);
  align-items: start;
}

/* ── sidebar ── */
.v6man-side {
  position: sticky;
  top: 6rem;
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
  scrollbar-width: thin;
}
.v6man-search {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.8rem;
  margin-bottom: 1.1rem;
  border: 1px solid var(--v6-line);
  border-radius: 10px;
  background: var(--v6-panel);
  transition: border-color 0.25s ease;
}
.v6man-search:focus-within { border-color: var(--v6-line-strong); }
.v6man-search svg { flex: none; width: 15px; height: 15px; color: var(--v6-faint); }
.v6man-search:focus-within svg { color: var(--v6-gold); }
.v6man-search input {
  width: 100%;
  background: transparent;
  border: 0;
  outline: none;
  color: var(--v6-ink);
  font-size: 0.85rem;
}
.v6man-search input::placeholder { color: var(--v6-faint); }
.v6man-search input::-webkit-search-cancel-button { display: none; }

.v6man-overview-link {
  display: block;
  width: 100%;
  padding: 0.7rem 0.2rem;
  border: 0;
  border-bottom: 1px solid var(--v6-line);
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-family: var(--v6-mono);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--v6-muted);
  transition: color 0.2s ease;
}
.v6man-overview-link:hover { color: var(--v6-ink); }
.v6man-overview-link.active { color: var(--v6-gold); }

.v6man-topic { border-bottom: 1px solid var(--v6-line); }
.v6man-topic-btn {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
  padding: 0.75rem 0.2rem;
  border: 0;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-family: var(--v6-mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--v6-muted);
  transition: color 0.2s ease;
}
.v6man-topic-btn:hover { color: var(--v6-ink); }
.v6man-topic-btn.active { color: var(--v6-gold); }
.v6man-topic-btn svg {
  width: 12px;
  height: 12px;
  margin-left: auto;
  transition: transform 0.3s ease;
}
.v6man-topic-btn svg.open { transform: rotate(180deg); }
.v6man-idx {
  font-family: var(--v6-mono);
  font-size: 0.64rem;
  color: var(--v6-faint);
  font-variant-numeric: tabular-nums;
}
.v6man-topic-btn.active .v6man-idx { color: var(--v6-gold); }

.v6man-articles {
  display: flex;
  flex-direction: column;
  padding: 0 0 0.7rem;
  border-left: 1px solid var(--v6-line);
  margin-left: 0.55rem;
}
.v6man-articles button {
  padding: 0.42rem 0 0.42rem 1rem;
  border: 0;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-size: 0.86rem;
  color: var(--v6-muted);
  transition: color 0.2s ease;
  position: relative;
}
.v6man-articles button:hover { color: var(--v6-ink); }
.v6man-articles button.active { color: var(--v6-gold); }
.v6man-articles button.active::before {
  content: "";
  position: absolute;
  left: -1px;
  top: 20%;
  bottom: 20%;
  width: 2px;
  background: var(--v6-gold);
}
.v6man-noresults {
  margin: 1rem 0 0;
  font-family: var(--v6-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--v6-faint);
}

/* ── content views ── */
.v6man-view { animation: v6man-in 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
@keyframes v6man-in {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .v6man-view { animation: none; }
}
.v6man-title { font-size: clamp(2.2rem, 4.6vw, 3.6rem); }
.v6man-sub { max-width: 34rem; color: var(--v6-muted); margin: 0; }

/* overview cards */
.v6man-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.1rem;
  margin-top: 2.6rem;
}
.v6man-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.4rem 1.4rem 1.2rem;
  border: 1px solid var(--v6-line);
  border-radius: 16px;
  background: linear-gradient(165deg, var(--v6-panel), rgba(12, 21, 18, 0.22));
  cursor: pointer;
  text-align: left;
  transition: border-color 0.3s ease, transform 0.3s ease;
}
.v6.light .v6man-card {
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.72), rgba(238, 244, 240, 0.4));
}
.v6man-card:hover { border-color: var(--v6-line-strong); transform: translateY(-3px); }
.v6man-card h2 {
  margin: 0.8rem 0 0.4rem;
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: 1.08rem;
  letter-spacing: -0.01em;
  color: var(--v6-ink);
}
.v6man-card p {
  margin: 0;
  color: var(--v6-muted);
  font-size: 0.88rem;
  line-height: 1.55;
}
.v6man-card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 1.1rem;
  padding-top: 0.8rem;
  border-top: 1px solid var(--v6-line);
  font-family: var(--v6-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--v6-faint);
}
.v6man-card:hover .v6man-card-foot { color: var(--v6-gold); }

/* article view */
.v6man-crumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 2rem;
  font-family: var(--v6-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--v6-faint);
}
.v6man-crumb button {
  border: 0;
  background: transparent;
  cursor: pointer;
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  color: var(--v6-muted);
  padding: 0;
  transition: color 0.2s ease;
}
.v6man-crumb button:hover { color: var(--v6-gold-hi); }
.v6man-crumb-here { color: var(--v6-gold); }
.v6man-article-title { margin: 1.2rem 0 0; }
.v6man-body { margin-top: 2rem; max-width: 44rem; }
.v6man-body p {
  margin: 0 0 1.2rem;
  color: var(--v6-muted);
  font-size: 1rem;
  line-height: 1.75;
}
.v6man-body p:first-child { color: var(--v6-ink); }

/* prev / next */
.v6man-pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.1rem;
  margin-top: 3.2rem;
  padding-top: 1.6rem;
  border-top: 1px solid var(--v6-line);
  max-width: 44rem;
}
.v6man-pager button {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.95rem 1.1rem;
  border: 1px solid var(--v6-line);
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.25s ease;
}
.v6man-pager button:hover { border-color: var(--v6-line-strong); }
.v6man-pager-next { align-items: flex-end; text-align: right; grid-column: 2; }
.v6man-pager-label {
  font-family: var(--v6-mono);
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--v6-faint);
}
.v6man-pager button:hover .v6man-pager-label { color: var(--v6-gold); }
.v6man-pager-title {
  font-family: var(--v6-display);
  font-weight: 700;
  font-size: 0.94rem;
  color: var(--v6-ink);
}
.v6man-pager-home { justify-content: center; }

/* ── mobile ── */
.v6man-scrim { display: none; }
.v6man-fab { display: none; }

@media (max-width: 900px) {
  .v6man-layout { grid-template-columns: 1fr; }
  .v6man-cards { grid-template-columns: 1fr; }
  .v6man-pager { grid-template-columns: 1fr; }
  .v6man-pager-next { grid-column: auto; }
  .v6man-search input { font-size: 1rem; }

  .v6man-scrim {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 40;
    background: rgba(2, 8, 14, 0.55);
    backdrop-filter: blur(4px);
  }
  .v6man-side {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 41;
    width: min(20rem, 85vw);
    max-height: none;
    padding: 5.5rem 1.2rem 6rem;
    background: rgba(9, 14, 22, 0.97);
    border-right: 1px solid var(--v6-line);
    transform: translateX(-100%);
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .v6.light .v6man-side { background: rgba(250, 252, 253, 0.98); }
  .v6man-side.open { transform: translateX(0); }

  .v6man-fab {
    position: fixed;
    bottom: 1.4rem;
    left: 1.4rem;
    z-index: 42;
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.7rem 1.1rem;
    border: 1px solid var(--v6-line-strong);
    border-radius: 999px;
    background: rgba(9, 14, 22, 0.92);
    backdrop-filter: blur(10px);
    cursor: pointer;
    font-family: var(--v6-mono);
    font-size: 0.66rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--v6-gold);
  }
  .v6.light .v6man-fab { background: rgba(250, 252, 253, 0.95); }
  .v6man-fab svg { width: 14px; height: 14px; }
}
</style>
