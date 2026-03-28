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

**Stack:** Vue 3 (Composition API, `<script setup>`) + Vite + Tailwind CSS v4 + vue-i18n v11 + Headless UI + Heroicons.

### Routing (no router)
`src/main.js` reads `?page=` from the URL query string and mounts one of four top-level page components directly. There is no Vue Router. Pages: `App` (home/landing), `FaqPage`, `ImpressumPage`, `FeaturesPage`.

### Theme & Background system
`App.vue` owns the `theme` (`"light"` / `"dark"`) and `bg` (`"stars"` / `"flow"` / `"aurora"` / `"honeycomb"`) state. Theme is initialized from `localStorage` or system `prefers-color-scheme`, and persists on toggle. Background animations (stars, flow, aurora) run on `<canvas>` elements inside `.k-bg`; the honeycomb option is an inline SVG. All canvas animations are managed via `ref` + lifecycle hooks in `App.vue`.

`App.vue` passes `theme` and `bg` down to `AppNav` as props; nav emits `toggle-theme` and `change-bg` back up. `AppNav` delegates theme toggling to `DarkLightSwitch`, language switching to `LangSwitch`, and background selection to `BgSwitch` — all receive `theme` as a prop and use `v-model` or emit events upward.

### i18n
`src/i18n.js` configures vue-i18n in **composition mode** (`legacy: false`). Locale is resolved from `localStorage` key `"katsumii-locale"`, falling back to browser language, then `"en"`. Supported locales: `en`, `de`, `es`, `tw`. Locale files live in `src/locales/*.json`. The `useI18n()` composable with `t()` is used throughout components.

### Asset URLs
Components reference public assets (images, etc.) via `import.meta.env.BASE_URL` to stay compatible with any Vite `base` config. Pattern: `` `${baseUrl}${path}` ``.

### Styling
- Global styles: `src/style.css` (imported in `main.js`)
- Tailwind v4 via `@tailwindcss/postcss` plugin — configured in `postcss.config.js`, no `tailwind.config.js` needed
- Theme-conditional classes are applied inline with ternary arrays: `theme === 'light' ? '...' : '...'`
- CSS custom properties (`--hc-stroke`, etc.) are used for theme-aware SVG strokes
