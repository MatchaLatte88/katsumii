<template>
  <V6ModePage
    mode="personal"
    :metrics="metrics"
    :sections="sections"
    :next="next"
  />
</template>

<script setup>
import V6ModePage from "./v6/V6ModePage.vue"

/* structure only — every string lives in modePages.personal */
const metrics = [
  { status: "tracked", progress: "78%" },
  { status: "manual", progress: "62%" },
  { status: "live", progress: "56%" },
  { status: "tracked", progress: "70%" },
]

const sections = [
  {
    id: "accounts-goals",
    rows: [
      { status: "tracked", progress: "78%" },
      { status: "manual", progress: "62%" },
      { status: "live", progress: "56%" },
    ],
  },
  {
    id: "journal-calendar",
    rows: [
      { status: "manual", progress: "76%" },
      { status: "live", progress: "68%" },
      { status: "manual", progress: "64%" },
    ],
  },
  {
    id: "strategy-tracking",
    rows: [
      { status: "tracked", progress: "70%" },
      { status: "manual", progress: "58%" },
      { status: "context", progress: "66%" },
    ],
  },
]

const next = { key: "backtest", path: "/backtesting" }
</script>
