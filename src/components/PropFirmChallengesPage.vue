<template>
  <V6ModePage
    mode="challenge"
    :metrics="metrics"
    :sections="sections"
    :next="next"
  />
</template>

<script setup>
import V6ModePage from "./v6/V6ModePage.vue"

/* structure only — every string lives in modePages.challenge */
const metrics = [
  { status: "live", progress: "72%" },
  { status: "live", progress: "63%" },
  { status: "tracked", progress: "80%" },
  { status: "context", progress: "56%" },
]

const sections = [
  {
    id: "progress",
    rows: [
      { status: "live", progress: "72%" },
      { status: "tracked", progress: "80%" },
      { status: "context", progress: "56%" },
    ],
  },
  {
    id: "loss-limits",
    rows: [
      { status: "live", progress: "63%" },
      { status: "live", progress: "78%" },
      { status: "live", progress: "58%" },
    ],
  },
  {
    id: "consistency-alerts",
    rows: [
      { status: "context", progress: "68%" },
      { status: "tracked", progress: "42%" },
      { status: "context", progress: "60%" },
    ],
  },
]

const next = { key: "personal", path: "/personal-trading" }
</script>
