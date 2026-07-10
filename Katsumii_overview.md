# Katsumii Frontend Overview

Purpose: compact product/context brief for Codex, Claude, or web-design coding agents working on Katsumii.com or the Katsumii app UI.

## Product Summary

Katsumii is a local-first trading journal and performance cockpit for active traders, with a strong focus on prop-firm workflows. It tracks trades, accounts, challenges, backtests, strategies, screenshots, fees, payouts, journal notes, emotions, mistakes, assets, and risk rules. It is designed as an operational trading workspace, not a marketing site.

Core promise: help traders document execution, monitor prop-firm/account risk, understand their edge, and reduce manual work through import/sync tools.

Runs locally: Vue 3 frontend, FastAPI/SQLite backend, no cloud auth by default.

## Target Users

- Prop-firm traders managing funded accounts, combines/challenges, payout rules, MLL/DLL, winning days, consistency, and inactivity rules.
- Futures/CFD/FX traders who need dense trade journaling and performance analytics.
- Backtesters using FXReplay or CSV exports who want session-based review.
- Power users trading multiple accounts/copy groups and needing fast data entry plus risk visibility.

## App Goal

Katsumii should feel like a calm, high-density trading control room:

- Fast daily trade capture.
- Always-visible risk/account status.
- Deep filtering and analytics across modes.
- Clear prop-firm progress and payout management.
- Reliable local data ownership.
- Reusable workflows for imports, sync, reports, presets, strategies, and account setup.

## Mental Model

Everything is scoped by trading mode:

- `Funded`: live/funded prop accounts; payout, winning days, MLL/DLL, account health.
- `Challenge`: evaluation/combine accounts; target, min days, pass/fail, conversion to funded.
- `Personal`: personal capital accounts; personal DLL/MLL and daily goals.
- `Backtest`: backtest sessions instead of accounts; FXReplay/CSV imports and hypothesis review.

Backtest has no `Today` screen. It uses `Sessions`.

## Global Shell

Main app shell:

- Top bar: Katsumii brand, mode tabs, inactivity alert banner, date/time/session, layout toggles, fullscreen, theme toggle.
- Left sidebar: New Trade Entry, Quick Entry, CSV Import, FXReplay Import in Backtest, main workspace nav, tools, reports, management, settings.
- Filter bar: global filters applied to stats/trades/analytics.
- Optional Quick Stats bar: Net P&L, trades, WR, R, PF, avg win/loss, expectancy.
- Right sidebar: compact/extended performance and risk widgets.

Global filters include account/session, market session, strategy, color tag, tag, emotion, mistake, asset, timeframe, direction, closed by, what-if outcome, scaled trade, date range.

## Design Direction

Use a serious product UI, not a landing-page feel.

- Dense but calm.
- Trading cockpit / analytics workstation.
- Compact cards, tables, modals, chips, toggles, segmented controls.
- Monospace/tabular numbers for financial metrics.
- Strong but controlled status colors: profit, loss, warning, accent, muted.
- Prioritize scanability, repeated use, and low cognitive friction.
- Avoid huge hero sections inside the app.
- Preserve power-user density.

## Primary Navigation / Screens

### Today

Daily command center for non-backtest modes.

Features:

- Daily hero/metrics area.
- Today P&L, trade count, win/loss, R multiple.
- DLL/MLL worst-case status.
- Accounts traded, green accounts, total active accounts.
- Personal goals.
- Day/trade streaks.
- Strategy usage today.
- Equity-by-trade.
- Switch between account view and timeline/trade table.

### Dashboard

Main performance overview for the active mode/filter scope.

Features:

- Net P&L hero.
- Period/mode/scope context.
- Gross, fees, expectancy, effective RRR, account count.
- BE threshold and exclude-BE toggle.
- Trade breakdown: trades, wins, losses, BE, avg win/loss, win/loss/BE days.
- Execution quality: winrate donut, RRR, PF, avg duration, best/worst day, risk efficiency.
- Edge drivers: best day, best session, best strategy, streaks.
- Equity workspace: per-trade/per-day, amount/%/R, limits 10/30/100, include corrections.
- Daily P&L heatmap and mini calendar.

### Accounts / Overview

Account health and prop-firm progress board.

Features:

- Card, compact card, and list modes.
- Configurable visible fields/columns.
- Account P&L, balance, MLL/DLL distance, challenge progress, activity, rebill, status.
- Account details modal.
- Equity curves and MLL curve.
- Payout history and payout modal.
- Winning days and MLL corrections.
- Set current equity / balance correction.
- Status handling: passed, failed, archived, restored.
- Convert challenge to funded.
- Copy group modal.
- Archive/delete account.

### Trades

Complete trade log.

Features:

- List view with configurable/resizable columns.
- Gallery view for screenshot trades.
- Sections: Today, Yesterday, This Week, Last Week, Older.
- Shows P&L, risk, R:R, size, account/session, open/close, duration, asset, timeframe, direction, levels, pips, strategy, closed by, tags, mistakes, emotion, notes, scale in/out.
- Trade info modal.
- Edit trade modal.
- Screenshot viewer.
- Comment/link actions.
- Delete trade.
- Show archived toggle.

### Input Trade

Full trade-entry form.

Features:

- Required: account/challenge/session, P&L, strategy.
- Optional: preset, open/close date/time, duration, asset, timeframe, direction, size, risk, closed by, would-have-been, scale in/out, fees, entry/exit levels, planned RRR, pips, extra number, tags, mistakes, emotion, color, comment, link, screenshots.
- Auto duration calculation, overnight handling.
- Fee components: commission, exchange, SEC, overnight, other, total fee.
- Trade presets create/apply/delete.
- Editable visible fields per mode.
- Copy-to-group for leader accounts, with review before saving.

### Calendar

Calendar performance view.

Features:

- Monthly calendar with day P&L, trade count, journal marker.
- Weekly P&L summaries.
- Monthly/yearly performance tiles.
- Month navigation.
- Day modal with trades and journal context.
- Optional % and R display.
- Visual styles: plasma, aurora, honeycomb, gradient, off.

### Analysis

Advanced analytics screen.

Features:

- Edge summary: best tags, asset, timeframe, worst mistake.
- Key metrics groups: extremes, ratios, periods, trade mechanics.
- Baseline averages and fee impact.
- Diagnostic lab: drawdown, rolling edge, outlier concentration, quality ratios.
- Risk/sizing analysis.
- Duration quality.
- P&L distribution histogram.
- Deep breakdown tabs: asset, timeframe, direction, mistake, mood, etc.
- BE threshold and exclude-BE controls.
- Configurable analysis view.

### Deep Chart

Separate deeper charting/visual analysis workspace. Use for focused chart-level review beyond dashboard summaries.

### Journal

Daily reflective journal.

Features:

- Date/month list.
- New entry today or by selected date.
- Tiptap rich text editor.
- Autosave.
- Formatting: bold, italic, strike, headings, bullet/ordered lists, blockquote, horizontal rule.
- Per-day stats in editor: trade count, P&L, win percentage.
- Screenshots/attachments.
- Calendar day markers when journal entries exist.

### Backtest Sessions

Backtest-mode account replacement.

Features:

- Session grid with session count, active/archived, total P&L.
- Cards show period, source, sparkline, WR, trades, final P&L, strategy.
- Create/edit session.
- Fields: name, strategy, initial balance, source, period start/end, hypothesis/notes, color.
- Detail modal.
- Import FXReplay or CSV.

### CSV Import

Broker CSV import wizard.

Steps:

1. Upload.
2. Resolve issues / map columns.
3. Review.
4. Done.

Features:

- Account/session target selection.
- Broker preset or manual mapping.
- Auto-detect support.
- Import modes: completed trades, executions/fills, executions with ID.
- Required mappings: open date, P&L.
- Optional mappings: asset, direction, size, close date, etc.
- Date format controls.
- Buy/sell selectors.
- Pairing key for split executions.
- Symbol mapping and asset creation.
- Custom import presets.

### FXReplay Import

Backtest import flow.

Features:

- Import FXReplay exports into existing/new backtest sessions.
- Session name, strategy, balance, hypothesis, color.
- Bulk import of backtest trades.

### API Sync / Integrations

Provider sync hub.

Providers:

- MetaTrader 5: reads closed trades from locally running MT5 terminal.
- ProjectX / TopstepX: ProjectX Gateway API.
- Capital.com: REST API, demo/live.
- OANDA: v20 REST API, practice/live.

Features:

- Provider cards with status.
- Connection settings.
- Detect/open account for MT5.
- Map external accounts to Katsumii accounts.
- Sync closed trades.
- Saved mappings.
- Symbol-to-asset mapping modal.
- Create missing assets from unmapped symbols.

### Reports

Export hub.

Features:

- HTML Performance Report.
- Uses current mode and active filters.
- Self-contained offline report.
- Includes equity curve, calendar heatmap, breakdowns, key metrics.
- Dark/light toggle in generated report.

### Tools

Utility screen.

Tools:

- R:R Visualizer.
- Position Size Calculator.
- Timezone Converter.
- Currency Converter.
- Equity Simulator / Account Growth Projector.
- Futures Contract Specs.

### Account Manager

Create/edit accounts for Funded, Challenge, Personal.

Features:

- Account identity: name, rank, broker, company, platform, market type, external ID, status, color.
- Copy group: group name, leader/follower.
- Strategy assignment.
- Risk profile: initial size, target, max loss, daily max loss, trailing/MLL type, MLL lock profit, max lots, min trading days.
- Current balance/equity correction.
- Account presets.
- Active/archive management.

### Setup / Strategy Manager

Trading strategy library.

Features:

- Create/edit/delete strategies.
- Default strategy is protected.
- Fields: label, sort order, asset, session, tier, winrate, RRR, risk, risk %, instruction, comment.
- Strategy screenshots and viewer.

### Asset Manager

Tradable asset library.

Features:

- Active/inactive assets.
- Search and group filter.
- Add/edit/delete asset.
- Fields: label, symbol, group, tick size, tick value, sort order, active.
- Bulk activate/deactivate visible assets.
- Active assets appear in trade forms/import mappings.

### Reference Manager

Shared metadata manager.

Entities:

- Tags.
- Mistakes/errors.
- Emotions/moods.
- Brokers.
- Macro time periods.

Features:

- CRUD metadata.
- Broker P&L reporting: net fees included vs gross fees excluded.
- Macro period presets and custom time ranges.

### Settings

App preferences and backup/safety.

Features:

- Inactivity alerts.
- Challenge pass confetti.
- Include archived accounts in stats.
- Start view.
- Auto backup schedule.
- Number locale.
- Currency.
- Date format.
- PnL extra display: %, R, both.
- Quick stats bar.
- Right sidebar.
- Show copy follower accounts.
- Light/dark backgrounds.
- Theme: light, dark, system.
- Per-mode color themes.
- Global mode visibility.
- Personal daily goal and daily max loss.
- Backup folder, keep last N backups.
- Export/import backup.
- Export trades CSV.
- Restore last auto-backup.
- Reset settings.
- Hard reset Katsumii.
- Bug report area.

## Important Data/UX Concepts

- `BE threshold`: trades with absolute P&L under threshold are treated as breakeven in many displays.
- `Exclude BE`: toggles whether BE trades count in some metrics.
- `Fees`: brokers may report P&L net or gross. Do not aggregate raw P&L blindly.
- `Corrections`: payouts and manual equity adjustments affect displayed balance, P&L, MLL, and winning days.
- `Copy groups`: accounts can be grouped as leader/follower for copied trade entry.
- `Archived accounts`: can be hidden from workflows/stats, but may be included via settings/toggles.
- `Mode scoped data`: Funded, Challenge, Personal, Backtest use separate datasets and endpoints.
- `Activity/inactivity`: app tracks last trade dates and warns near deadlines.

## Visual System Notes

Common UI patterns:

- Small uppercase eyebrow labels.
- Compact financial cards.
- Glass/dark/light surfaces.
- Accent color changes per mode.
- Status chips and color tags.
- Resizable tables.
- Dense modals.
- Toggle switches.
- Segmented controls.
- Tab rows.
- Mono/tabular financial values.
- Positive/negative/warning risk coloring.

Avoid:

- Marketing hero layouts inside the app.
- Low-density decorative cards.
- Overly playful visuals.
- Huge gradients/orbs as the main design language.
- Hiding essential risk data behind too many clicks.

## Best One-Sentence Description

Katsumii is a local trading journal and prop-firm control cockpit that lets serious traders log trades, manage accounts/challenges/backtests, monitor payout and drawdown rules, import/sync executions, and analyze their edge across every meaningful trading dimension.
