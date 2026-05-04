<template>
  <div :class="[theme === 'light' ? 'relative overflow-x-hidden min-h-screen bg-slate-50 text-gray-900' : 'relative overflow-x-hidden min-h-screen bg-slate-950 text-slate-100']">
    <div class="k-bg" :class="theme === 'light' ? 'k-bg-light' : 'k-bg-dark'" aria-hidden="true">
      <div class="k-bg-gradient" />
      <svg class="k-bg-grid" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="hc-terms" x="0" y="0" width="69.28" height="60" patternUnits="userSpaceOnUse">
            <path d="M34.64,0 L51.96,10 L51.96,30 L34.64,40 L17.32,30 L17.32,10 Z M0,0 L17.32,10 M17.32,30 L0,40 M51.96,10 L69.28,0 M69.28,40 L51.96,30 M34.64,40 L34.64,60 M0,40 L0,60" style="fill:none;stroke:var(--hc-stroke);stroke-width:1.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hc-terms)"/>
      </svg>
      <div class="k-bg-band" />
    </div>

    <AppNav
      :theme="theme"
      :navigation="navigation"
      brand-title="Katsumii"
      brand-subtitle="Terms of Service"
      :brand-href="baseUrl"
      @toggle-theme="toggleTheme"
    />

    <section class="relative isolate px-6 pb-20 pt-28 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <p :class="['text-sm font-semibold tracking-[0.2em] uppercase', theme === 'light' ? 'text-teal-600' : 'text-teal-300']">
          Legal
        </p>
        <h1 :class="['mt-4 text-4xl font-semibold tracking-tight sm:text-6xl', theme === 'light' ? 'text-gray-900' : 'text-white']">
          Terms of Service
        </h1>
        <p :class="['mx-auto mt-6 max-w-2xl text-lg', theme === 'light' ? 'text-gray-600' : 'text-gray-300']">
          Please read these terms carefully before purchasing or using Katsumii.
          Last updated: May 2025.
        </p>
      </div>

      <div class="mx-auto mt-14 max-w-3xl space-y-4">

        <article :class="cardClass">
          <h2 :class="headingClass">1. Scope &amp; Contracting Party</h2>
          <p :class="textClass">
            These Terms of Service ("Terms") govern the purchase and use of Katsumii, a desktop trading
            journal application ("Software"), provided by:<br /><br />
            Frederik Morbe<br />
            E-Mail: <a href="mailto:info@katsumii.com" :class="linkClass">info@katsumii.com</a><br />
            Website: katsumii.com
          </p>
          <p :class="['mt-4 text-sm leading-7', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            By purchasing a license or downloading and using the Software, you agree to be bound by these Terms.
            If you do not agree, do not use the Software.
          </p>
        </article>

        <article :class="cardClass">
          <h2 :class="headingClass">2. License Grant</h2>
          <p :class="textClass">
            Upon successful payment, you receive a non-exclusive, non-transferable, revocable license to install
            and use Katsumii on your own devices for personal or professional trading documentation purposes.
          </p>
          <ul :class="['mt-4 space-y-2 text-sm', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span>The license is granted to a single user and may not be shared, resold, or sublicensed.</span>
            </li>
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span>Installation on multiple personal devices owned by the same licensee is permitted.</span>
            </li>
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span>The license is perpetual for the purchased version. Updates may require a new purchase depending on the release type.</span>
            </li>
          </ul>
        </article>

        <article :class="cardClass">
          <h2 :class="headingClass">3. Restrictions</h2>
          <p :class="textClass">You may not:</p>
          <ul :class="['mt-4 space-y-2 text-sm', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span>Copy, modify, distribute, sell, or sublicense the Software or any part of it.</span>
            </li>
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span>Reverse-engineer, decompile, or disassemble the Software.</span>
            </li>
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span>Remove or alter any proprietary notices, labels, or license keys within the Software.</span>
            </li>
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span>Use the Software for any unlawful purpose or in violation of applicable law.</span>
            </li>
          </ul>
        </article>

        <article :class="cardClass">
          <h2 :class="headingClass">4. Payment &amp; Refunds</h2>
          <p :class="textClass">
            Payments are processed by <strong>Lemon Squeezy</strong> (Lemon Squeezy, LLC), who acts as Merchant
            of Record. All payment, tax, and invoicing obligations are handled by Lemon Squeezy on our behalf.
          </p>
          <p :class="['mt-4 text-sm leading-7', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            As the Software is a digital product delivered immediately upon purchase, the right of withdrawal
            under EU consumer law (14-day cooling-off period) expires upon download or activation, in accordance
            with Art. 16(m) of Directive 2011/83/EU — provided you have given prior explicit consent and
            acknowledged the loss of the right of withdrawal.
          </p>
          <p :class="['mt-4 text-sm leading-7', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            Refund requests outside this scope are handled on a case-by-case basis. Contact
            <a href="mailto:info@katsumii.com" :class="linkClass">info@katsumii.com</a> within 14 days
            of purchase.
          </p>
        </article>

        <article :class="cardClass">
          <h2 :class="headingClass">5. Intellectual Property</h2>
          <p :class="textClass">
            All intellectual property rights in and to the Software — including but not limited to source code,
            graphics, UI design, and documentation — remain exclusively with Frederik Morbe. These Terms do not
            transfer any ownership rights to you.
          </p>
        </article>

        <article :class="cardClass">
          <h2 :class="headingClass">6. Informational Purpose Only — Not a Basis for Real-Money Trading</h2>
          <p :class="textClass">
            <strong>Katsumii is a journaling and documentation tool exclusively.</strong> It is designed to
            help traders record, review, and reflect on trades they have already executed or are simulating
            for practice purposes. The Software is <strong>not</strong> intended to be used as a basis for
            making real-money trading or investment decisions.
          </p>
          <p :class="['mt-4 text-sm leading-7', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            Any data, statistics, charts, scores, ratings, or other outputs displayed within Katsumii are
            intended solely for <strong>informational and self-reflective purposes</strong>. They do not
            constitute a recommendation, signal, strategy, or instruction to buy, sell, or hold any financial
            instrument, asset, or contract.
          </p>
          <p :class="['mt-4 text-sm leading-7', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            You must not use any output of this Software as the primary or sole basis for entering, exiting,
            or managing any real-money trade or investment position. All real-money trading decisions must be
            made based on your own independent research, analysis, and judgment.
          </p>
        </article>

        <article :class="cardClass">
          <h2 :class="headingClass">7. No Financial Advice</h2>
          <p :class="textClass">
            Nothing in the Software, on katsumii.com, or in any communication from Frederik Morbe constitutes
            financial advice, investment advice, trading advice, or any other form of advice regulated under
            applicable financial services law (including but not limited to MiFID II, the German Securities
            Trading Act (WpHG), or equivalent regulations in other jurisdictions).
          </p>
          <p :class="['mt-4 text-sm leading-7', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            Frederik Morbe is not a licensed financial advisor, investment advisor, broker, or regulated
            financial services provider. If you require financial or investment advice, you should consult
            a qualified and regulated professional in your jurisdiction.
          </p>
        </article>

        <article :class="cardClass">
          <h2 :class="headingClass">8. Accuracy of Calculations &amp; Statistics</h2>
          <p :class="textClass">
            All calculations, statistics, metrics, scores, ratios, projections, and any other computed
            outputs within Katsumii — including but not limited to win rate, risk-reward ratio, expectancy,
            drawdown, profit factor, and setup scores — <strong>may contain errors, inaccuracies, or
            omissions</strong>.
          </p>
          <ul :class="['mt-4 space-y-2 text-sm', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span>Results depend entirely on data entered by the user. Incorrect or incomplete input will produce incorrect output.</span>
            </li>
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span>The Software may contain bugs or calculation errors that have not yet been identified or corrected.</span>
            </li>
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span>Statistical outputs are based on the recorded sample only and carry no predictive validity for future trading performance.</span>
            </li>
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span>No guarantee is made that any figure displayed is complete, current, or free from error.</span>
            </li>
          </ul>
          <p :class="['mt-4 text-sm leading-7', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            You are solely responsible for verifying all data and calculations before drawing any conclusions.
            Under no circumstances should any figure produced by Katsumii be relied upon as accurate without
            independent verification.
          </p>
        </article>

        <article :class="cardClass">
          <h2 :class="headingClass">9. Risk Warning — Trading Financial Instruments</h2>
          <p :class="textClass">
            Trading financial instruments — including but not limited to stocks, futures, forex, contracts for
            difference (CFDs), options, and cryptocurrencies — involves a <strong>substantial risk of financial
            loss</strong> and is not suitable for all individuals.
          </p>
          <ul :class="['mt-4 space-y-2 text-sm', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span>Past performance, whether real or recorded in this Software, is not indicative of future results.</span>
            </li>
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span>You may lose more than your initial capital, particularly when trading leveraged products.</span>
            </li>
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span>Simulated or backtested performance results have inherent limitations and do not represent actual trading results.</span>
            </li>
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span>Market conditions, execution quality, slippage, fees, and other real-world factors are not accounted for by the Software.</span>
            </li>
          </ul>
          <p :class="['mt-4 text-sm leading-7', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            You acknowledge that you use Katsumii entirely at your own risk and that Frederik Morbe bears no
            responsibility whatsoever for any financial losses incurred in connection with your trading activity,
            whether or not the Software was used in any part of your decision-making process.
          </p>
        </article>

        <article :class="cardClass">
          <h2 :class="headingClass">10. Software Provided "As Is"</h2>
          <p :class="textClass">
            The Software is provided "as is" and "as available" without warranty of any kind, express or
            implied, including but not limited to warranties of merchantability, fitness for a particular
            purpose, accuracy, reliability, or non-infringement. We do not warrant that the Software will
            be error-free, uninterrupted, or that any defects will be corrected.
          </p>
        </article>

        <article :class="cardClass">
          <h2 :class="headingClass">11. Limitation of Liability</h2>
          <p :class="textClass">
            To the maximum extent permitted by applicable law, Frederik Morbe shall not be liable for any
            direct, indirect, incidental, special, consequential, or punitive damages of any kind arising
            from or related to your use of or inability to use the Software, including but not limited to:
          </p>
          <ul :class="['mt-4 space-y-2 text-sm', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span>Any trading losses, investment losses, or financial harm — whether or not Katsumii was involved in the decision.</span>
            </li>
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span>Errors, inaccuracies, or omissions in calculations, statistics, or displayed data.</span>
            </li>
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span>Data loss, corruption, or unavailability of the Software.</span>
            </li>
            <li class="flex items-start gap-2">
              <span :class="dotClass" aria-hidden="true" />
              <span>Loss of profits, revenue, business opportunities, or goodwill.</span>
            </li>
          </ul>
          <p :class="['mt-4 text-sm leading-7', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            In any case, total aggregate liability of Frederik Morbe shall not exceed the amount you paid for
            the Software in the twelve months preceding the claim. Statutory liability for wilful misconduct
            and gross negligence, as well as liability under mandatory applicable law (e.g. product liability),
            remains unaffected.
          </p>
        </article>

        <article :class="cardClass">
          <h2 :class="headingClass">12. Governing Law &amp; Jurisdiction</h2>
          <p :class="textClass">
            These Terms are governed by the laws of the Federal Republic of Germany, excluding the UN
            Convention on Contracts for the International Sale of Goods (CISG). Mandatory consumer
            protection provisions of your country of residence remain unaffected.
          </p>
          <p :class="['mt-4 text-sm leading-7', theme === 'light' ? 'text-gray-600' : 'text-gray-400']">
            Any disputes arising from these Terms shall be subject to the jurisdiction of the courts competent
            for the registered address of Frederik Morbe, unless mandatory law provides otherwise.
          </p>
        </article>

        <article :class="cardClass">
          <h2 :class="headingClass">13. Changes to These Terms</h2>
          <p :class="textClass">
            We reserve the right to update these Terms at any time. Material changes will be announced
            on katsumii.com. Continued use of the Software after the effective date of updated Terms
            constitutes your acceptance of the changes.
          </p>
        </article>

        <article :class="cardClass">
          <h2 :class="headingClass">14. Contact</h2>
          <p :class="textClass">
            For questions about these Terms, please contact:<br /><br />
            <a href="mailto:info@katsumii.com" :class="linkClass">info@katsumii.com</a>
          </p>
        </article>

      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue"
import AppNav from "./AppNav.vue"

const baseUrl = import.meta.env.BASE_URL

const navigation = [
  { name: "FAQ", href: `${baseUrl}app.html?page=faq` },
  { name: "Imprint", href: `${baseUrl}app.html?page=impressum` },
  { name: "Back", href: baseUrl },
]

const theme = ref("light")

const applyTheme = (value) => {
  theme.value = value
  localStorage.setItem("katsumii-theme", value)
}

const toggleTheme = () => {
  applyTheme(theme.value === "dark" ? "light" : "dark")
}

onMounted(() => {
  const savedTheme = localStorage.getItem("katsumii-theme")
  if (savedTheme === "light" || savedTheme === "dark") {
    theme.value = savedTheme
  }
})

watch(theme, (value) => {
  document.documentElement.classList.toggle("dark", value === "dark")
})

const cardClass = computed(() => [
  "rounded-2xl border p-6 backdrop-blur sm:p-8",
  theme.value === "light" ? "border-gray-200 bg-white/85" : "border-white/10 bg-gray-800/70",
])

const headingClass = computed(() => [
  "text-sm font-semibold uppercase tracking-[0.12em]",
  theme.value === "light" ? "text-teal-600" : "text-teal-300",
])

const textClass = computed(() => [
  "mt-3 text-sm leading-7",
  theme.value === "light" ? "text-gray-700" : "text-gray-300",
])

const linkClass = computed(() => [
  "underline underline-offset-2 transition-colors",
  theme.value === "light" ? "text-teal-600 hover:text-teal-500" : "text-cyan-400 hover:text-cyan-300",
])

const dotClass = computed(() => [
  "mt-1.5 h-1.5 w-1.5 flex-none rounded-full",
  theme.value === "light" ? "bg-teal-500" : "bg-cyan-400",
])
</script>

<style scoped>
.k-bg {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}
.k-bg-dark { --orb-a: rgba(59,130,246,0.28); --orb-b: rgba(34,211,238,0.22); --hc-stroke: rgba(34,211,238,0.02); }
.k-bg-light { --orb-a: rgba(6,182,212,0.16); --orb-b: rgba(59,130,246,0.12); --hc-stroke: rgba(8,145,178,0.04); }
.k-bg-gradient {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 70% 55% at 8% 18%, var(--orb-a), transparent 60%),
    radial-gradient(ellipse 55% 45% at 88% 80%, var(--orb-b), transparent 55%);
}
.k-bg-grid {
  position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.8;
  mask-image: linear-gradient(180deg, transparent 0%, black 12%, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, black 12%, black 80%, transparent 100%);
}
.k-bg-band {
  position: absolute; top: -30%; right: 0; width: 52%; height: 160%;
  background: linear-gradient(to bottom, transparent, rgba(34,211,238,0.018) 40%, transparent);
  transform: skewX(-6deg); border-left: 1px solid rgba(34,211,238,0.055); transform-origin: top right;
}
</style>
