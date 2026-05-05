<template>
  <section id="top" class="hero-section relative px-5 pb-24 pt-32 sm:px-6 sm:pb-32 sm:pt-36 lg:px-10 lg:pt-40">
    <div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div class="reveal">
        <p
          :class="[
            'inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] shadow-sm',
            theme === 'light'
              ? 'border-teal-200 bg-teal-50 text-teal-700'
              : 'border-cyan-300/30 bg-cyan-400/10 text-cyan-200'
          ]"
        >
          {{ t('hero.badge') }}
        </p>

        <div class="mt-7 flex items-center gap-4 sm:gap-5">
          <img :src="assetUrl('logo.png')" alt="Katsumii logo" class="hero-logo h-16 w-16 flex-shrink-0 object-contain sm:h-24 sm:w-24" />
          <div>
            <h1
              :class="[
                'font-display text-5xl font-semibold leading-none tracking-tight sm:text-6xl lg:text-7xl',
                theme === 'light' ? 'text-gray-900' : 'text-slate-100'
              ]"
            >
              KATSUMII
            </h1>
            <p :class="['mt-2 text-lg font-medium tracking-tight sm:text-2xl', theme === 'light' ? 'text-gray-500' : 'text-slate-400']">
              {{ t('hero.tagline') }}
              <span
                ref="typedWordEl"
                :class="['font-semibold', theme === 'light' ? 'text-teal-600' : 'text-cyan-300']"
              >clarity</span><span
                class="typed-cursor"
                :class="theme === 'light' ? 'text-teal-600' : 'text-cyan-300'"
              >|</span>
            </p>
          </div>
        </div>

        <p
          :class="[
            'mt-7 max-w-2xl text-base leading-8 sm:text-lg',
            theme === 'light' ? 'text-gray-600' : 'text-slate-300'
          ]"
        >
          {{ t('hero.description') }}
        </p>

        <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            :href="checkoutUrl"
            :target="linkTarget(checkoutUrl)"
            :rel="linkRel(checkoutUrl)"
            :class="[
              'inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5',
              theme === 'light'
                ? 'bg-teal-600 text-white shadow-[0_16px_42px_-20px_rgba(13,148,136,0.9)] hover:bg-teal-500'
                : 'bg-cyan-300 text-slate-950 shadow-[0_16px_42px_-20px_rgba(34,211,238,0.9)] hover:bg-cyan-200'
            ]"
          >
            {{ t('hero.ctaBuy') }}
          </a>
          <a
            href="#showcase"
            :class="[
              'inline-flex min-h-12 items-center justify-center rounded-full border px-6 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5',
              theme === 'light'
                ? 'border-gray-300 bg-white/80 text-gray-700 hover:bg-white'
                : 'border-blue-400/30 bg-slate-900/70 text-slate-200 hover:bg-slate-800/80'
            ]"
          >
            {{ t('hero.ctaTour') }}
          </a>
        </div>

        <div
          class="mt-8 grid max-w-xl grid-cols-3 overflow-hidden rounded-2xl border"
          :class="theme === 'light' ? 'border-gray-200/80 bg-white/68 shadow-sm' : 'border-cyan-300/15 bg-slate-950/35'"
        >
          <div
            v-for="item in heroStats"
            :key="`hero-proof-${item.label}`"
            class="px-3 py-3"
          >
            <p :class="['text-sm font-bold sm:text-base', theme === 'light' ? 'text-gray-950' : 'text-slate-50']">{{ item.value }}</p>
            <p :class="['mt-1 text-[11px] leading-tight', theme === 'light' ? 'text-gray-500' : 'text-slate-400']">{{ item.label }}</p>
          </div>
        </div>
      </div>

      <div class="reveal hero-visual relative">
        <div
          :class="[
            'k-card hero-window k-main-tile k-glass overflow-hidden border',
            theme === 'light'
              ? 'border-gray-200/90 bg-white/88 shadow-[0_30px_90px_-42px_rgba(15,23,42,0.42)]'
              : 'border-cyan-300/20 bg-slate-900/82 shadow-[0_34px_100px_-46px_rgba(0,0,0,0.86)]'
          ]"
        >
          <div
            :class="[
              'flex items-center justify-between border-b px-4 py-2.5',
              theme === 'light' ? 'border-gray-200 bg-gray-50/80' : 'border-blue-400/20 bg-slate-950/60'
            ]"
          >
            <span :class="['text-xs font-semibold uppercase tracking-[0.16em]', theme === 'light' ? 'text-teal-700' : 'text-cyan-300']">{{ t('showcase.dashboardWindowLabel') }}</span>
            <div class="flex items-center gap-1.5">
              <span class="h-2.5 w-2.5 rounded-full bg-red-400/50" />
              <span class="h-2.5 w-2.5 rounded-full bg-yellow-400/50" />
              <span class="h-2.5 w-2.5 rounded-full bg-green-400/50" />
            </div>
          </div>

          <div class="relative overflow-hidden" style="max-height: 260px;">
            <img
              :src="theme === 'light' ? assetUrl('Dashboard_light.png') : assetUrl('Dashboard_dark.png')"
              alt="Katsumii dashboard"
              class="w-full object-cover object-top"
            />
            <div
              class="pointer-events-none absolute inset-x-0 bottom-0 h-20"
              :class="theme === 'light' ? 'bg-gradient-to-t from-white/80 to-transparent' : 'bg-gradient-to-t from-slate-900/80 to-transparent'"
            />
          </div>

          <div
            :class="[
              'grid grid-cols-3 divide-x border-t',
              theme === 'light' ? 'divide-gray-200 border-gray-200' : 'divide-blue-400/20 border-blue-400/20'
            ]"
          >
            <div
              v-for="item in heroStats"
              :key="item.label"
              class="px-3 py-3 text-center"
            >
              <p :class="['text-base font-semibold', theme === 'light' ? 'text-gray-900' : 'text-slate-100']">{{ item.value }}</p>
              <p :class="['text-[11px] mt-0.5', theme === 'light' ? 'text-gray-500' : 'text-slate-400']">{{ item.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue"
import { useI18n } from "vue-i18n"

defineProps({
  theme: { type: String, required: true },
  assetUrl: { type: Function, required: true },
  checkoutUrl: { type: String, required: true },
  linkTarget: { type: Function, required: true },
  linkRel: { type: Function, required: true },
})

const { t, tm } = useI18n()
const heroStats = computed(() => tm('heroStats'))
const typedWordEl = ref(null)
let typingTimer = null

const startTypewriter = () => {
  const words = ['discipline.', 'consistency.', 'precision.', 'confidence.', 'clarity.']
  let wordIdx = 0
  let charIdx = words[0].length
  let deleting = false

  const tick = () => {
    if (!typedWordEl.value) return
    const word = words[wordIdx]
    if (deleting) {
      charIdx--
      typedWordEl.value.textContent = word.slice(0, charIdx)
      if (charIdx === 0) {
        deleting = false
        wordIdx = (wordIdx + 1) % words.length
        typingTimer = setTimeout(tick, 280)
      } else {
        typingTimer = setTimeout(tick, 55)
      }
    } else {
      charIdx++
      typedWordEl.value.textContent = word.slice(0, charIdx)
      if (charIdx === word.length) {
        deleting = true
        typingTimer = setTimeout(tick, 3500)
      } else {
        typingTimer = setTimeout(tick, 85)
      }
    }
  }

  typingTimer = setTimeout(() => { deleting = true; tick() }, 2200)
}

onMounted(startTypewriter)
onUnmounted(() => clearTimeout(typingTimer))
</script>
