<template>
  <div :class="[theme === 'light' ? 'relative min-h-screen bg-slate-50 text-gray-900' : 'relative min-h-screen bg-slate-950 text-slate-100']">
    <!-- Background -->
    <div class="k-bg" :class="theme === 'light' ? 'k-bg-light' : 'k-bg-dark'" aria-hidden="true">
      <div class="k-bg-gradient" />
      <svg class="k-bg-grid" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="hc-manual" x="0" y="0" width="69.28" height="60" patternUnits="userSpaceOnUse">
            <path d="M34.64,0 L51.96,10 L51.96,30 L34.64,40 L17.32,30 L17.32,10 Z M0,0 L17.32,10 M17.32,30 L0,40 M51.96,10 L69.28,0 M69.28,40 L51.96,30 M34.64,40 L34.64,60 M0,40 L0,60" style="fill:none;stroke:var(--hc-stroke);stroke-width:1.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hc-manual)"/>
      </svg>
      <div class="k-bg-band" />
    </div>

    <AppNav
      :theme="theme"
      :navigation="navLinks"
      brand-title="Katsumii"
      brand-subtitle="Manual"
      :brand-href="baseUrl"
      @toggle-theme="toggleTheme"
    />

    <!-- Layout wrapper: sidebar + content -->
    <div class="relative flex pt-24">

      <!-- ===== Desktop sidebar ===== -->
      <aside
        :class="[
          'hidden md:flex flex-col w-64 shrink-0 sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pb-10 border-r',
          theme === 'light' ? 'border-gray-200 bg-white/50 backdrop-blur' : 'border-blue-400/15 bg-slate-950/50 backdrop-blur'
        ]"
      >
        <div class="flex flex-col gap-1 px-3 py-4">
          <!-- Overview -->
          <button
            :class="['flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200',
              !activeTopic
                ? (theme === 'light' ? 'bg-teal-50 text-teal-700' : 'bg-cyan-400/10 text-cyan-300')
                : (theme === 'light' ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200')
            ]"
            @click="goOverview"
          >
            <HomeIcon class="size-4 shrink-0" />
            {{ t('manualPage.nav.overview') }}
          </button>

          <div :class="['my-2 border-t', theme === 'light' ? 'border-gray-100' : 'border-white/5']" />

          <!-- Topics -->
          <div v-for="topic in TOPICS" :key="topic.id">
            <button
              :class="['flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200',
                activeTopic?.id === topic.id
                  ? (theme === 'light' ? 'bg-teal-50 text-teal-700' : 'bg-cyan-400/10 text-cyan-300')
                  : (theme === 'light' ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200')
              ]"
              @click="selectTopic(topic)"
            >
              <div class="flex items-center gap-2.5">
                <component :is="topic.icon" class="size-4 shrink-0" />
                {{ t(topic.titleKey) }}
              </div>
              <ChevronDownIcon
                :class="['size-3.5 shrink-0 transition-transform duration-300',
                  activeTopic?.id === topic.id ? 'rotate-180' : 'rotate-0'
                ]"
              />
            </button>

            <!-- Article sub-list -->
            <div v-if="activeTopic?.id === topic.id" class="mt-1 ml-4 flex flex-col gap-0.5">
              <button
                v-for="article in topic.articles"
                :key="article.id"
                :class="['flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200',
                  activeArticle?.id === article.id
                    ? (theme === 'light' ? 'bg-teal-600/10 font-semibold text-teal-700' : 'bg-cyan-400/15 font-semibold text-cyan-300')
                    : (theme === 'light' ? 'text-gray-500 hover:bg-gray-50 hover:text-gray-800' : 'text-slate-500 hover:bg-slate-800/40 hover:text-slate-300')
                ]"
                @click="selectArticle(article)"
              >
                <div
                  :class="['size-1.5 shrink-0 rounded-full',
                    activeArticle?.id === article.id
                      ? (theme === 'light' ? 'bg-teal-600' : 'bg-cyan-400')
                      : (theme === 'light' ? 'bg-gray-300' : 'bg-slate-600')
                  ]"
                />
                {{ t(article.titleKey) }}
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- ===== Mobile sidebar overlay ===== -->
      <Transition name="sidebar-fade">
        <div v-if="sidebarOpen" class="fixed inset-0 z-50 flex md:hidden">
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="sidebarOpen = false" />
          <aside
            :class="[
              'relative z-10 flex w-72 flex-col overflow-y-auto pb-10 pt-20 shadow-2xl',
              theme === 'light' ? 'bg-white border-r border-gray-200' : 'bg-slate-900 border-r border-blue-400/15'
            ]"
          >
            <!-- Same sidebar content as desktop -->
            <div class="flex flex-col gap-1 px-3 py-4">
              <button
                :class="['flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200',
                  !activeTopic
                    ? (theme === 'light' ? 'bg-teal-50 text-teal-700' : 'bg-cyan-400/10 text-cyan-300')
                    : (theme === 'light' ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200')
                ]"
                @click="() => { goOverview(); sidebarOpen = false }"
              >
                <HomeIcon class="size-4 shrink-0" />
                {{ t('manualPage.nav.overview') }}
              </button>

              <div :class="['my-2 border-t', theme === 'light' ? 'border-gray-100' : 'border-white/5']" />

              <div v-for="topic in TOPICS" :key="`mob-${topic.id}`">
                <button
                  :class="['flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200',
                    activeTopic?.id === topic.id
                      ? (theme === 'light' ? 'bg-teal-50 text-teal-700' : 'bg-cyan-400/10 text-cyan-300')
                      : (theme === 'light' ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200')
                  ]"
                  @click="() => { selectTopic(topic); sidebarOpen = false }"
                >
                  <div class="flex items-center gap-2.5">
                    <component :is="topic.icon" class="size-4 shrink-0" />
                    {{ t(topic.titleKey) }}
                  </div>
                  <ChevronDownIcon :class="['size-3.5 shrink-0 transition-transform duration-300', activeTopic?.id === topic.id ? 'rotate-180' : 'rotate-0']" />
                </button>

                <div v-if="activeTopic?.id === topic.id" class="mt-1 ml-4 flex flex-col gap-0.5">
                  <button
                    v-for="article in topic.articles"
                    :key="article.id"
                    :class="['flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200',
                      activeArticle?.id === article.id
                        ? (theme === 'light' ? 'bg-teal-600/10 font-semibold text-teal-700' : 'bg-cyan-400/15 font-semibold text-cyan-300')
                        : (theme === 'light' ? 'text-gray-500 hover:bg-gray-50 hover:text-gray-800' : 'text-slate-500 hover:bg-slate-800/40 hover:text-slate-300')
                    ]"
                    @click="() => { selectArticle(article); sidebarOpen = false }"
                  >
                    <div :class="['size-1.5 shrink-0 rounded-full', activeArticle?.id === article.id ? (theme === 'light' ? 'bg-teal-600' : 'bg-cyan-400') : (theme === 'light' ? 'bg-gray-300' : 'bg-slate-600')]" />
                    {{ t(article.titleKey) }}
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Transition>

      <!-- ===== Main content ===== -->
      <main class="flex-1 min-w-0 px-6 py-8 lg:px-12 xl:px-16">

        <!-- OVERVIEW VIEW -->
        <template v-if="!activeTopic">
          <div class="mx-auto max-w-4xl">
            <p :class="['text-sm font-semibold tracking-[0.2em] uppercase', theme === 'light' ? 'text-teal-600' : 'text-teal-300']">
              {{ t('manualPage.hero.eyebrow') }}
            </p>
            <h1 :class="['mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl', theme === 'light' ? 'text-gray-900' : 'text-white']">
              {{ t('manualPage.hero.heading') }}
            </h1>
            <p :class="['mt-4 max-w-2xl text-lg', theme === 'light' ? 'text-gray-600' : 'text-slate-400']">
              {{ t('manualPage.hero.description') }}
            </p>

            <!-- Topic cards -->
            <div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <button
                v-for="topic in TOPICS"
                :key="topic.id"
                class="group relative rounded-2xl border p-5 text-left backdrop-blur transition-all duration-300 hover:-translate-y-0.5"
                :class="theme === 'light'
                  ? 'border-gray-200 bg-white/85 shadow-[0_6px_22px_-14px_rgba(15,23,42,0.2)] hover:shadow-[0_12px_32px_-14px_rgba(15,23,42,0.28)]'
                  : 'border-white/10 bg-gray-800/70 hover:bg-gray-800/80'"
                @click="selectTopic(topic)"
              >
                <component
                  :is="topic.icon"
                  :class="['size-7 transition-colors duration-300', theme === 'light' ? 'text-teal-600 group-hover:text-teal-500' : 'text-cyan-400 group-hover:text-cyan-300']"
                />
                <h3 :class="['mt-3 font-semibold', theme === 'light' ? 'text-gray-900' : 'text-white']">
                  {{ t(topic.titleKey) }}
                </h3>
                <p :class="['mt-1 text-sm leading-relaxed', theme === 'light' ? 'text-gray-500' : 'text-slate-400']">
                  {{ t(topic.descriptionKey) }}
                </p>
                <div class="mt-4 flex items-center justify-between">
                  <span :class="['text-xs font-medium', theme === 'light' ? 'text-gray-400' : 'text-slate-500']">
                    {{ topic.articles.length }}&thinsp;{{ topic.articles.length === 1 ? t('manualPage.article') : t('manualPage.articles') }}
                  </span>
                  <ChevronRightIcon :class="['size-4 transition-transform duration-300 group-hover:translate-x-0.5', theme === 'light' ? 'text-gray-400' : 'text-slate-500']" />
                </div>
              </button>
            </div>
          </div>
        </template>

        <!-- ARTICLE VIEW -->
        <template v-else>
          <div class="mx-auto max-w-3xl">
            <!-- Breadcrumb -->
            <nav class="flex flex-wrap items-center gap-1.5 text-sm">
              <button
                :class="['font-medium transition-colors duration-200', theme === 'light' ? 'text-teal-600 hover:text-teal-800' : 'text-cyan-400 hover:text-cyan-300']"
                @click="goOverview"
              >
                {{ t('manualPage.nav.overview') }}
              </button>
              <ChevronRightIcon :class="['size-3.5 shrink-0', theme === 'light' ? 'text-gray-400' : 'text-slate-500']" />
              <span :class="[activeArticle ? 'cursor-pointer font-medium transition-colors duration-200 ' + (theme === 'light' ? 'text-teal-600 hover:text-teal-800' : 'text-cyan-400 hover:text-cyan-300') : (theme === 'light' ? 'text-gray-900 font-medium' : 'text-white font-medium')]"
                @click="activeArticle && (activeArticle = activeTopic.articles[0])"
              >
                {{ t(activeTopic.titleKey) }}
              </span>
              <template v-if="activeArticle">
                <ChevronRightIcon :class="['size-3.5 shrink-0', theme === 'light' ? 'text-gray-400' : 'text-slate-500']" />
                <span :class="['font-medium', theme === 'light' ? 'text-gray-900' : 'text-white']">{{ t(activeArticle.titleKey) }}</span>
              </template>
            </nav>

            <!-- Article -->
            <article v-if="activeArticle" class="mt-8">
              <span :class="['inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em]', theme === 'light' ? 'border-teal-200 bg-teal-50 text-teal-700' : 'border-cyan-300/30 bg-cyan-400/10 text-cyan-300']">
                <component :is="activeTopic.icon" class="size-3" />
                {{ t(activeTopic.titleKey) }}
              </span>

              <h1 :class="['mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl', theme === 'light' ? 'text-gray-900' : 'text-white']">
                {{ t(activeArticle.titleKey) }}
              </h1>

              <div :class="['mt-8 space-y-5 text-[1.02rem] leading-relaxed', theme === 'light' ? 'text-gray-700' : 'text-slate-300']">
                <p v-for="(para, i) in articleContent" :key="i">{{ para }}</p>
              </div>
            </article>

            <!-- Prev / Next -->
            <div :class="['mt-14 flex items-center justify-between gap-4 border-t pt-6', theme === 'light' ? 'border-gray-200' : 'border-white/10']">
              <button
                v-if="prevArticle"
                :class="[
                  'group flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 hover:-translate-x-0.5',
                  theme === 'light' ? 'border-gray-200 bg-white text-gray-700 hover:border-teal-200 hover:text-teal-700' : 'border-white/10 bg-gray-800/60 text-slate-300 hover:border-cyan-400/30 hover:text-cyan-300'
                ]"
                @click="selectArticle(prevArticle)"
              >
                <ArrowLeftIcon class="size-4" />
                {{ t(prevArticle.titleKey) }}
              </button>
              <div v-else />

              <button
                v-if="nextArticle"
                :class="[
                  'group ml-auto flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 hover:translate-x-0.5',
                  theme === 'light' ? 'border-gray-200 bg-white text-gray-700 hover:border-teal-200 hover:text-teal-700' : 'border-white/10 bg-gray-800/60 text-slate-300 hover:border-cyan-400/30 hover:text-cyan-300'
                ]"
                @click="selectArticle(nextArticle)"
              >
                {{ t(nextArticle.titleKey) }}
                <ArrowRightIcon class="size-4" />
              </button>
            </div>
          </div>
        </template>

        <div class="h-20" />
      </main>
    </div>

    <!-- Mobile FAB -->
    <button
      class="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full px-4 py-3 shadow-lg transition-all duration-300 hover:scale-105 md:hidden"
      :class="theme === 'light' ? 'bg-white border border-gray-200 text-gray-700' : 'bg-slate-800 border border-white/10 text-slate-300'"
      @click="sidebarOpen = !sidebarOpen"
    >
      <XMarkIcon v-if="sidebarOpen" class="size-5" />
      <Bars3Icon v-else class="size-5" />
      <span class="text-sm font-medium">{{ sidebarOpen ? 'Close' : 'Topics' }}</span>
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue"
import { useI18n } from "vue-i18n"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Bars3Icon,
  BookOpenIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  HomeIcon,
  RocketLaunchIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline"
import AppNav from "./AppNav.vue"

const { t, tm } = useI18n()
const baseUrl = import.meta.env.BASE_URL

// ---------- Theme ----------
const savedTheme = localStorage.getItem("katsumii-theme")
const theme = ref(savedTheme === "dark" ? "dark" : "light")

const toggleTheme = () => {
  const next = theme.value === "dark" ? "light" : "dark"
  theme.value = next
  localStorage.setItem("katsumii-theme", next)
}

watch(theme, (v) => document.documentElement.classList.toggle("dark", v === "dark"), { immediate: true })

// ---------- Nav ----------
const navLinks = computed(() => [
  { name: t("manualPage.nav.home"), href: baseUrl },
  { name: t("manualPage.nav.faq"), href: `${baseUrl}app.html?page=faq` },
])

// ---------- Topics ----------
const TOPICS = [
  {
    id: "getting-started",
    icon: RocketLaunchIcon,
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
    icon: BookOpenIcon,
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
    icon: BriefcaseIcon,
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
    icon: ChartBarIcon,
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
    icon: CalendarDaysIcon,
    titleKey: "manualPage.topics.calendar.title",
    descriptionKey: "manualPage.topics.calendar.description",
    articles: [
      { id: "navigation", titleKey: "manualPage.topics.calendar.articles.navigation.title", contentKey: "manualPage.topics.calendar.articles.navigation.content" },
      { id: "patterns",   titleKey: "manualPage.topics.calendar.articles.patterns.title",   contentKey: "manualPage.topics.calendar.articles.patterns.content" },
    ],
  },
  {
    id: "settings",
    icon: Cog6ToothIcon,
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
const activeTopic = ref(null)
const activeArticle = ref(null)
const sidebarOpen = ref(false)

const articleContent = computed(() => {
  if (!activeArticle.value) return []
  return tm(activeArticle.value.contentKey)
})

const allArticlesFlat = computed(() => activeTopic.value?.articles ?? [])

const currentIndex = computed(() =>
  allArticlesFlat.value.findIndex((a) => a.id === activeArticle.value?.id)
)

const prevArticle = computed(() => {
  const i = currentIndex.value
  return i > 0 ? allArticlesFlat.value[i - 1] : null
})

const nextArticle = computed(() => {
  const i = currentIndex.value
  return i >= 0 && i < allArticlesFlat.value.length - 1 ? allArticlesFlat.value[i + 1] : null
})

// ---------- Actions ----------
const selectTopic = (topic) => {
  activeTopic.value = topic
  activeArticle.value = topic.articles[0]
  const url = new URL(window.location.href)
  url.searchParams.set("topic", topic.id)
  history.replaceState(null, "", url.toString())
  window.scrollTo({ top: 0, behavior: "smooth" })
}

const selectArticle = (article) => {
  activeArticle.value = article
  window.scrollTo({ top: 0, behavior: "smooth" })
}

const goOverview = () => {
  activeTopic.value = null
  activeArticle.value = null
  const url = new URL(window.location.href)
  url.searchParams.delete("topic")
  history.replaceState(null, "", url.toString())
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// ---------- Deep-link ----------
onMounted(() => {
  const topicParam = new URLSearchParams(window.location.search).get("topic")
  if (topicParam) {
    const found = TOPICS.find((tp) => tp.id === topicParam)
    if (found) {
      activeTopic.value = found
      activeArticle.value = found.articles[0]
    }
  }
})
</script>

<style scoped>
.font-display { font-family: "Sora", sans-serif; }

.k-bg {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}
.k-bg-dark  { --orb-a: rgba(59,130,246,0.22); --orb-b: rgba(34,211,238,0.18); --hc-stroke: rgba(34,211,238,0.02); }
.k-bg-light { --orb-a: rgba(6,182,212,0.13);  --orb-b: rgba(59,130,246,0.10); --hc-stroke: rgba(8,145,178,0.04); }
.k-bg-gradient {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 5% 15%, var(--orb-a), transparent 60%),
    radial-gradient(ellipse 50% 40% at 90% 75%, var(--orb-b), transparent 55%);
}
.k-bg-grid {
  position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.8;
  mask-image: linear-gradient(180deg, transparent 0%, black 12%, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, black 12%, black 80%, transparent 100%);
}
.k-bg-band {
  position: absolute; top: -30%; right: 0; width: 52%; height: 160%;
  background: linear-gradient(to bottom, transparent, rgba(34,211,238,0.015) 40%, transparent);
  transform: skewX(-6deg); border-left: 1px solid rgba(34,211,238,0.04); transform-origin: top right;
}

.sidebar-fade-enter-active,
.sidebar-fade-leave-active { transition: opacity 0.2s ease; }
.sidebar-fade-enter-from,
.sidebar-fade-leave-to { opacity: 0; }
</style>
