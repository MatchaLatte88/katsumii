<template>
  <V6ModePage
    mode="funded"
    :metrics="metrics"
    :sections="sections"
    :next="next"
  />
</template>

<script setup>
import V6ModePage from "./v6/V6ModePage.vue"

/* structure only — every string lives in modePages.funded */
const metrics = [
  { status: "live", progress: "82%" },
  { status: "live", progress: "68%" },
  { status: "manual", progress: "45%" },
  { status: "tracked", progress: "74%" },
]

const sections = [
  {
    id: "account-health",
    rows: [
      { status: "live", progress: "72%" },
      { status: "live", progress: "58%" },
      { status: "context", progress: "82%" },
    ],
  },
  {
    id: "payouts",
    rows: [
      { status: "manual", progress: "52%" },
      { status: "tracked", progress: "60%" },
      { status: "manual", progress: "44%" },
    ],
  },
  {
    id: "multi-account",
    rows: [
      { status: "live", progress: "74%" },
      { status: "archived", progress: "66%" },
      { status: "context", progress: "70%" },
    ],
  },
]

const next = { key: "challenge", path: "/prop-firm-challenges" }
</script>
