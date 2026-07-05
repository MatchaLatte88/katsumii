# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build → dist/
npm run preview   # Preview the production build locally
```

No linting or test scripts are configured.

## Architecture

**Stack:** Vue 3 (Composition API, `<script setup>`) + Vite + Tailwind CSS v4 + vue-i18n v11 + vue-router v4 + Headless UI + Heroicons.

### Routing
`src/router.js` uses `createRouter` + `createWebHistory`. `src/AppShell.vue` mounts the router via `<RouterView />`. Routes: `/app` (home/landing → `App.vue`), `/features`, `/pricing`, `/manual`, `/faq`, `/contact`, `/impressum`, `/privacy`, `/terms`, `/welcome`. The `/` path redirects to `/app`. Legacy `app.html?page=X` URLs are redirected via a `beforeEach` guard. Page titles are set via `route.meta.title` in `router.afterEach`.

### Theme & Background system
Theme (`"light"` / `"dark"`) and background (`"honeycomb"` / `"lines"`) state is managed by two composables:

- **`src/composables/useTheme.js`** — reads initial value from `localStorage` or `prefers-color-scheme`. Exposes `theme` (ref), `isDark` (computed), `toggleTheme`. Applies `html.dark` class on every change.
- **`src/composables/useBg.js`** — reads from `localStorage`, migrates legacy values. Exposes `bg` (ref), `changeBg`. Forces `"honeycomb"` on mobile.

`AppShell.vue` calls both composables and `provide()`s `theme`, `isDark`, `toggleTheme`, `bg`, `changeBg` globally.

Every page-level component (`App.vue`, `FeaturesPage.vue`, etc.) **injects** these values instead of owning local state. `AppNav`, `BgSwitch`, `LangSwitch` also inject directly — they do not receive `theme`/`bg` as props.

### Dark mode / Tailwind
Tailwind v4 dark mode is configured via `@custom-variant dark` in `style.css` to use the `html.dark` class selector. Theme-conditional classes use Tailwind's `dark:` prefix (`text-gray-600 dark:text-slate-300`) rather than inline ternaries. For image source selection (`Dashboard_light.png` vs `_dark.png`), components inject `isDark`.

`KbBackground.vue` is a self-contained background component receiving `:pattern` and `:isDark` as props. Background patterns: `"honeycomb"` (SVG) and `"lines"` (canvas animation).

### i18n
`src/i18n.js` configures vue-i18n in **composition mode** (`legacy: false`). Locale is resolved from `localStorage` key `"katsumii-locale"`, falling back to browser language, then `"en"`. Supported locales: `en`, `de`, `es`, `tw`. Locale files live in `src/locales/*.json`. The `useI18n()` composable with `t()` is used throughout components.

### Asset URLs
Components reference public assets (images, etc.) via `import.meta.env.BASE_URL` to stay compatible with any Vite `base` config. Pattern: `` `${baseUrl}${path}` ``.

### Styling
do not create new style classes if not necessary, reuse as many as possible.
- Global styles: `src/style.css` (imported in `main.js`)
- Tailwind v4 via `@tailwindcss/postcss` plugin — configured in `postcss.config.js`, no `tailwind.config.js` needed
- Dark mode uses `dark:` Tailwind prefix classes (not inline ternaries). Configured via `@custom-variant dark (&:where(.dark, .dark *))` in `style.css`.
- CSS custom properties (`--hc-stroke`, `--orb-a`, etc.) are used for theme-aware backgrounds and are toggled via `html.dark`

## The product this site markets (Katsumii / X25V)

This repo is the marketing/landing site. The actual product being sold is a trading journal app, developed in a separate repo at `D:\X25V` (codename **X25V**). Knowing its shape helps write accurate feature/pricing/manual copy.

**Stack:** Vue 3 frontend + Python FastAPI backend, communicating over a local HTTP API (desktop-style app, not a hosted SaaS backend). Run via `RUN_X25.bat` (starts both servers); frontend dev server on `:5173`, backend (`uvicorn main:app --reload`) on `:8000`.

### Core concept: Three Trading Modes
The whole app is scoped to one of three modes, switched via a Pinia store (`appMode`) and persisted to localStorage (or `?mode=` query param):
- **Funded** — live prop-firm trading
- **Challenge** — demo/evaluation accounts
- **Personal** — personal trading

Each mode has its own DB tables (`trades`, `challenge_trades`, `personal_trades`) and API endpoints — data is fully siloed per mode. This three-mode split is a key selling point/feature to reflect accurately on the marketing site (features/pricing/manual pages).

### Frontend shape (`X25V/src/`)
Pinia stores: `appMode`, `filter` (account/setup/date filters), `settings`, `theme`. Views include AccountStats, TradeList, Dashboard, AdvStatistics, etc. Components organized into `Charts/`, `Modals/`, `Sidebars/`, `Nav/`, `Utility/`. Tailwind v4, class-based dark mode, custom brand colors: orange, teal, indigo.

### Backend shape (`X25V/backend/`)
~79 FastAPI endpoints (`main.py`). SQLAlchemy ORM models: `Trade`, `ChallengeTrade`, `PersonalTrades`, `Credentials`, `Challenges`, `PersonalAccounts`, `Setup`, `TradePreset`, `Settings`. Notable capabilities worth mentioning in marketing copy:
- Advanced analytics: equity curves, setup performance, account-level stats, win rate / R:R / ratios
- Alerts/notifications system
- Per-mode screenshot uploads (trade screenshots, setup screenshots)
- Automated weekly/monthly DB backups (daemon thread)
- SQLite (WAL mode) — local-first data storage, no external DB dependency

### Working across the two repos
The X25V repo has its own CLAUDE.md at `D:\X25V\CLAUDE.md`. Do not edit files there from this workspace unless explicitly asked — this repo (Katsumii Website) is separate and should only *reference* X25V's product facts for accurate copy, not modify its code.
