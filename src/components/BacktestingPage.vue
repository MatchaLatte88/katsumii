<template>
  <V6ModePage
    mode="backtest"
    :metrics="metrics"
    :sections="sections"
    :next="next"
  />
</template>

<script setup>
import V6ModePage from "./v6/V6ModePage.vue"

/* structure only — every string lives in modePages.backtest */
const metrics = [
  { status: "tracked", progress: "74%" },
  { status: "manual", progress: "64%" },
  { status: "manual", progress: "58%" },
  { status: "context", progress: "52%" },
]

const sections = [
  {
    id: "sessions-imports",
    rows: [
      { status: "tracked", progress: "74%" },
      { status: "manual", progress: "64%" },
      { status: "manual", progress: "60%" },
    ],
  },
  {
    id: "hypotheses",
    rows: [
      { status: "manual", progress: "58%" },
      { status: "manual", progress: "68%" },
      { status: "context", progress: "52%" },
    ],
  },
  {
    id: "session-analytics",
    rows: [
      { status: "live", progress: "72%" },
      { status: "tracked", progress: "62%" },
      { status: "archived", progress: "66%" },
    ],
  },
]

const next = { key: "funded", path: "/funded-accounts" }
</script>
