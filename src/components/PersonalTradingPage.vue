<template>
  <V6ModePage :page="page" />
</template>

<script setup>
import V6ModePage from "./v6/V6ModePage.vue"

const page = {
  eyebrow: "Discipline 03 — Personal",
  h1: { pre: "Same discipline, your", em: "money" },
  sub: "Katsumii gives personal traders a focused journal cockpit: personal accounts, daily goals, self-defined DLL/MLL limits, trade notes, calendar reviews and strategy tracking — without turning the page into a report wall.",
  chips: ["Personal accounts", "Daily goals", "Journal workflow", "Strategy tracking"],
  metrics: [
    {
      label: "Personal accounts", value: "Multi", status: "Organized", progress: "78%",
      copy: "Keep separate live, swing or practice accounts reviewable without mixing histories.",
    },
    {
      label: "Daily goals", value: "Set", status: "Review", progress: "62%",
      copy: "Use daily goals as a planning and review aid, not as a promise of trading results.",
    },
    {
      label: "Personal limits", value: "DLL/MLL", status: "Aware", progress: "56%",
      copy: "Self-defined daily and max-loss limits stay visible next to the journal.",
    },
    {
      label: "Strategy tracking", value: "Tagged", status: "Clean", progress: "70%",
      copy: "Connect trades to strategies so reviews can focus on behavior, setup quality and process.",
    },
  ],
  sections: [
    {
      id: "accounts-goals",
      kicker: "Personal accounts",
      title: "Keep personal accounts and daily goals in one cockpit.",
      copy: "Personal trading still needs structure. Katsumii gives each account its own context, so daily goals, balances, notes and review state do not blur together.",
      note: "Goals and limits are documentation tools. Katsumii does not provide financial advice or predict future trading performance.",
      rows: [
        {
          name: "Personal accounts", status: "Separate", value: "Accounts", progress: "78%",
          copy: "Review different personal accounts without merging unrelated histories.",
        },
        {
          name: "Daily goals", status: "Planned", value: "Daily", progress: "62%",
          copy: "Place the day's intended focus beside the trades that followed.",
        },
        {
          name: "Personal DLL/MLL", status: "Visible", value: "Limits", progress: "56%",
          copy: "Self-defined risk limits stay visible as review context before more trades are added.",
        },
      ],
    },
    {
      id: "journal-calendar",
      kicker: "Trade journal",
      title: "Document trades, then review the week from the calendar.",
      copy: "The journal is built for repeated use: log the trade, attach context, tag behavior, then return through calendar reviews when patterns become easier to see.",
      note: "Calendar and journal views summarize entered information; they are not recommendations to trade, hold or change position size.",
      rows: [
        {
          name: "Trade journal", status: "Core", value: "Entries", progress: "76%",
          copy: "Capture execution, setup context, screenshots, notes and follow-up observations.",
        },
        {
          name: "Calendar reviews", status: "Rhythm", value: "Calendar", progress: "68%",
          copy: "Review daily and weekly behavior from a visual calendar instead of a spreadsheet dump.",
        },
        {
          name: "Process notes", status: "Traceable", value: "Notes", progress: "64%",
          copy: "Keep notes close to the trade so the review has context later.",
        },
      ],
    },
    {
      id: "strategy-tracking",
      kicker: "Strategy tracking",
      title: "Separate strategy behavior from account noise.",
      copy: "Personal trading reviews become clearer when setups, tags and mistakes can be compared across accounts and sessions without overloading the trader.",
      note: "Strategy tracking helps review historical behavior. It does not validate future profitability or remove trading risk.",
      rows: [
        {
          name: "Strategy tags", status: "Grouped", value: "Tags", progress: "70%",
          copy: "Connect entries to named strategies so review work starts with clean groups.",
        },
        {
          name: "Mistakes & emotions", status: "Logged", value: "Behavior", progress: "58%",
          copy: "Track behavioral context without burying it inside long journal text.",
        },
        {
          name: "Session context", status: "Readable", value: "Context", progress: "66%",
          copy: "Review performance by session, asset or timeframe when the sample is large enough.",
        },
      ],
    },
  ],
  disclaimer: {
    headline: "A journal system, not financial advice.",
    points: [
      "Katsumii helps you document trades, goals, limits and review context.",
      "Daily goals and strategy labels do not predict future results or reduce market risk.",
      "Trading decisions remain your responsibility.",
    ],
  },
  cta: {
    title: "Your capital.", em: "Your rules",
    sub: "Daily goals, personal loss limits and streaks that keep you honest.",
    next: { name: "Backtest", path: "/backtesting" },
  },
}
</script>
