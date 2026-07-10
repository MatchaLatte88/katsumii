<template>
  <V6ModePage :page="page" />
</template>

<script setup>
import V6ModePage from "./v6/V6ModePage.vue"

const page = {
  eyebrow: "Discipline 01 — Funded",
  h1: { pre: "Guarded, every", em: "session" },
  sub: "Katsumii gives funded accounts their own risk cockpit: MLL/DLL distance, health signals, payout context, winning days, corrections and multi-account review — without mixing modes.",
  chips: ["MLL/DLL distance", "Account health", "Payout context", "Multi-account view"],
  metrics: [
    {
      label: "Account health", value: "Healthy", status: "Review", progress: "82%",
      copy: "Combines account result context with rule distance and recent behavior.",
    },
    {
      label: "MLL/DLL distance", value: "68%", status: "Aware", progress: "68%",
      copy: "Makes distance to key loss limits visible before adding more exposure.",
    },
    {
      label: "Payout context", value: "Open", status: "Manual", progress: "45%",
      copy: "Tracks payout-related notes and corrections as documentation context.",
    },
    {
      label: "Account set", value: "Multi", status: "Active", progress: "74%",
      copy: "Keeps active and archived funded accounts reviewable without losing history.",
    },
  ],
  sections: [
    {
      id: "account-health",
      kicker: "Account health",
      title: "See funded risk state without digging through a journal.",
      copy: "Funded accounts need a different mental model than backtesting or personal trading. Katsumii keeps rule distance, account state and recent performance in the same review surface.",
      note: "Health indicators are review aids based on your entered data and settings; they are not official prop-firm determinations.",
      rows: [
        {
          name: "MLL distance", status: "Visible", value: "MLL", progress: "72%",
          copy: "Max loss distance stays available as a first-order account signal.",
        },
        {
          name: "DLL distance", status: "Aware", value: "DLL", progress: "58%",
          copy: "Daily loss distance is tracked separately from total account pressure.",
        },
        {
          name: "Funded risk visibility", status: "Review", value: "Health", progress: "82%",
          copy: "Account risk is shown in context with recent trades and rule settings.",
        },
      ],
    },
    {
      id: "payouts",
      kicker: "Payout context",
      title: "Document payout periods, winning days and corrections.",
      copy: "Payout workflows often involve more than raw P&L. Katsumii gives payout-related context a place in the account history so reviews stay organized.",
      note: "Katsumii can help document payout context, but it does not promise eligibility, processing, payout approval or timing.",
      rows: [
        {
          name: "Payout tracking", status: "Context", value: "Period", progress: "52%",
          copy: "Track payout-period notes next to account performance and trade history.",
        },
        {
          name: "Winning days", status: "Counted", value: "3 days", progress: "60%",
          copy: "Winning-day context can be reviewed where it matters for the account.",
        },
        {
          name: "Corrections / payout effects", status: "Manual", value: "Notes", progress: "44%",
          copy: "Corrections and payout effects can be documented without rewriting history.",
        },
      ],
    },
    {
      id: "multi-account",
      kicker: "Multi-account overview",
      title: "Active and archived funded accounts stay organized.",
      copy: "A funded trader may need to review multiple accounts over time. Katsumii keeps account histories separated while preserving the bigger picture.",
      note: "Archived account history is for documentation and review; it does not change external account records or firm-side decisions.",
      rows: [
        {
          name: "Active accounts", status: "Live", value: "Active", progress: "74%",
          copy: "Active funded accounts remain available for current health and performance review.",
        },
        {
          name: "Archived accounts", status: "History", value: "Archive", progress: "66%",
          copy: "Archived accounts stay accessible for later analysis without cluttering live work.",
        },
        {
          name: "Multi-account review", status: "Compare", value: "Multi", progress: "70%",
          copy: "Account-level context helps compare behavior without merging unrelated records.",
        },
      ],
    },
  ],
  disclaimer: {
    headline: "Built for visibility, not payout promises.",
    points: [
      "Katsumii helps document funded-account activity, rules and review context.",
      "Payout eligibility and account status remain subject to the prop firm's systems and decisions.",
      "Risk visibility can support discipline, but it cannot guarantee outcomes or prevent losses.",
    ],
  },
  cta: {
    title: "Trade funded.", em: "Stay funded",
    sub: "Every rule that keeps your account alive — always in sight.",
    next: { name: "Challenge", path: "/prop-firm-challenges" },
  },
}
</script>
