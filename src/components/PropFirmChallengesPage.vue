<template>
  <V6ModePage :page="page" />
</template>

<script setup>
import V6ModePage from "./v6/V6ModePage.vue"

const page = {
  eyebrow: "Discipline 02 — Challenge",
  h1: { pre: "Pass with", em: "proof" },
  sub: "Katsumii turns prop-firm evaluations into a visible control cockpit: progress, targets, trading days, loss limits, consistency context, inactivity alerts and pass-fail status around the trades you document.",
  chips: ["Challenge progress", "Rule distance", "Inactivity alerts", "Status context"],
  metrics: [
    {
      label: "Profit target", value: "72%", status: "Tracking", progress: "72%",
      copy: "Shows how logged trades move the account toward the configured target.",
    },
    {
      label: "Daily loss room", value: "63%", status: "Aware", progress: "63%",
      copy: "Keeps daily-loss distance visible as a review signal before adding more risk.",
    },
    {
      label: "Trading days", value: "4 / 5", status: "Open", progress: "80%",
      copy: "Tracks documented active days against the configured minimum.",
    },
    {
      label: "Status context", value: "Review", status: "Manual", progress: "56%",
      copy: "Frames pass-fail context from your logged data, without replacing firm-side decisions.",
    },
  ],
  sections: [
    {
      id: "progress",
      kicker: "Challenge progress",
      title: "Profit target, trading days and evaluation state in one view.",
      copy: "A challenge account should not feel like a normal journal with a few extra notes. Katsumii separates the workflow so every logged trade can be reviewed against the current evaluation context.",
      note: "Katsumii can organize and calculate from your entered data, but the prop firm remains the source of truth for official challenge status.",
      rows: [
        {
          name: "Profit target", status: "Visible", value: "Target", progress: "72%",
          copy: "Configured target progress is shown alongside account results.",
        },
        {
          name: "Minimum trading days", status: "Open", value: "4 / 5", progress: "80%",
          copy: "Logged activity days are counted so reviews do not miss a day requirement.",
        },
        {
          name: "Challenge status", status: "Context", value: "Review", progress: "56%",
          copy: "Pass-fail context stays visible as a documentation aid, not an official guarantee.",
        },
      ],
    },
    {
      id: "loss-limits",
      kicker: "Rule distance",
      title: "Daily loss, max loss and trailing drawdown stay scannable.",
      copy: "The cockpit focuses attention on distance to limits, because a challenge review often depends on understanding where the account sits before the next decision.",
      note: "Limit calculations depend on the rules you configure and the trades you log. Always compare with the prop firm's official dashboard.",
      rows: [
        {
          name: "Daily loss limit", status: "Aware", value: "DLL", progress: "63%",
          copy: "Daily loss room is represented as a distance signal instead of hidden in a report.",
        },
        {
          name: "Max loss", status: "Stable", value: "MLL", progress: "78%",
          copy: "Overall loss distance helps separate a bad day from broader account pressure.",
        },
        {
          name: "Trailing drawdown", status: "Rule-set", value: "Trail", progress: "58%",
          copy: "Trailing logic can be tracked as configured context when the evaluation uses it.",
        },
      ],
    },
    {
      id: "consistency-alerts",
      kicker: "Consistency & alerts",
      title: "Consistency rules and inactivity windows get their own signals.",
      copy: "Some evaluations are not only about P&L. Katsumii gives recurring process constraints a place in the account workflow, so they are part of the review instead of a forgotten side note.",
      note: "Katsumii helps document and surface rule context; it does not certify eligibility, compliance or future payouts.",
      rows: [
        {
          name: "Consistency rules", status: "Monitor", value: "Rule", progress: "68%",
          copy: "Consistency context can be reviewed next to trades and account progress.",
        },
        {
          name: "Inactivity alerts", status: "Timed", value: "Days", progress: "42%",
          copy: "Time-based reminders keep inactivity windows visible during slower periods.",
        },
        {
          name: "Pass-fail context", status: "Manual", value: "Status", progress: "60%",
          copy: "Status labels support review discipline without making official firm-side claims.",
        },
      ],
    },
  ],
  disclaimer: {
    headline: "A control cockpit, not a compliance guarantee.",
    points: [
      "Katsumii documents and analyzes the trades and rules you enter.",
      "Prop firms can use their own calculations, rule interpretations and dashboards.",
      "Challenge success, account approval, payouts or rule compliance are never guaranteed.",
    ],
  },
  cta: {
    title: "Track it.", em: "Convert it",
    sub: "From first evaluation trade to funded — one step to convert a passed challenge.",
    next: { name: "Personal", path: "/personal-trading" },
  },
}
</script>
