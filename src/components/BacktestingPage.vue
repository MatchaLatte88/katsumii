<template>
  <V6ModePage :page="page" />
</template>

<script setup>
import V6ModePage from "./v6/V6ModePage.vue"

const page = {
  eyebrow: "Discipline 04 — Backtest",
  h1: { pre: "Rehearse the", em: "edge" },
  sub: "Katsumii keeps backtesting structured: sessions, FXReplay and CSV imports, hypotheses, notes, strategy validation context and session analytics that stay separate from live trading records.",
  chips: ["Backtest sessions", "FXReplay import", "Hypotheses", "Session analytics"],
  metrics: [
    {
      label: "Backtest sessions", value: "Lab", status: "Separate", progress: "74%",
      copy: "Keep replay work distinct from live and funded account history.",
    },
    {
      label: "FXReplay import", value: "Ready", status: "Import", progress: "64%",
      copy: "Bring replay exports into a review workflow built for strategy testing.",
    },
    {
      label: "Hypotheses", value: "Notes", status: "Tracked", progress: "58%",
      copy: "Keep the reason for the test next to the trades that tested it.",
    },
    {
      label: "Validation context", value: "Review", status: "Careful", progress: "52%",
      copy: "Summaries support review discipline without claiming future performance.",
    },
  ],
  sections: [
    {
      id: "sessions-imports",
      kicker: "Backtest sessions",
      title: "Keep replay sessions cleanly separated and importable.",
      copy: "A backtest should be reviewable later, not only remembered. Katsumii gives sessions a structured place for imported trades, manual notes and strategy context.",
      note: "Imported backtest data depends on export quality and your mapping choices. Always review imported records before using them for conclusions.",
      rows: [
        {
          name: "Backtest sessions", status: "Separate", value: "Session", progress: "74%",
          copy: "Group replay trades into dedicated sessions instead of mixing them with live accounts.",
        },
        {
          name: "FXReplay import", status: "Mapped", value: "FXReplay", progress: "64%",
          copy: "Use replay exports as the starting point for structured analysis.",
        },
        {
          name: "CSV import", status: "Flexible", value: "CSV", progress: "60%",
          copy: "Bring tabular backtest records into the journal workflow when fields match your setup.",
        },
      ],
    },
    {
      id: "hypotheses",
      kicker: "Hypotheses & notes",
      title: "Write down what the session is supposed to prove.",
      copy: "Backtesting is easier to trust when the hypothesis, session notes and review criteria are captured before the result becomes tempting to reinterpret.",
      note: "Katsumii can organize test context, but it does not decide whether a strategy is suitable for live trading.",
      rows: [
        {
          name: "Hypotheses", status: "Documented", value: "Thesis", progress: "58%",
          copy: "Record the idea being tested before reviewing the sample.",
        },
        {
          name: "Session notes", status: "Context", value: "Notes", progress: "68%",
          copy: "Keep market conditions, mistakes and observations attached to the session.",
        },
        {
          name: "Strategy validation", status: "Review", value: "Validate", progress: "52%",
          copy: "Use validation context as evidence to inspect, not as a performance guarantee.",
        },
      ],
    },
    {
      id: "session-analytics",
      kicker: "Session analytics",
      title: "Review the session without dragging in unrelated trades.",
      copy: "Session analytics help compare samples, setups and rules inside the backtest workflow, so live account pressure does not distort the analysis.",
      note: "Historical backtest analysis cannot guarantee live execution quality, liquidity, slippage or future results.",
      rows: [
        {
          name: "Session metrics", status: "Scoped", value: "Metrics", progress: "72%",
          copy: "Review performance inside the selected session boundary.",
        },
        {
          name: "Setup comparison", status: "Tagged", value: "Tags", progress: "62%",
          copy: "Compare strategies, setups and notes when enough samples are logged.",
        },
        {
          name: "Review archive", status: "Traceable", value: "Archive", progress: "66%",
          copy: "Keep old sessions available so a strategy review can evolve over time.",
        },
      ],
    },
  ],
  disclaimer: {
    headline: "Backtesting supports analysis, not certainty.",
    points: [
      "Katsumii organizes imported and manually documented backtest data.",
      "A backtest result is historical analysis and does not guarantee live results.",
      "Strategy validation remains a trader judgment call.",
    ],
  },
  cta: {
    title: "Test first.", em: "Trade second",
    sub: "Compare strategies before risking a cent.",
    next: { name: "Funded", path: "/funded-accounts" },
  },
}
</script>
