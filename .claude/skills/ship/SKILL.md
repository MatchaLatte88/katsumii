---
name: ship
description: Release the Katsumii website — write the changelog entry, bump the version, commit and push to main (which deploys via GitHub Actions). Use when asked to "ship", "release", "push the site", "deploy", or "changelog + version + push". Trigger words — "ship", "release", "deploy", "push it live".
---

# Ship the Katsumii website

One push to `main` deploys the site: `.github/workflows/` builds and publishes to
GitHub Pages at `www.katsumii.com`. So shipping is a release, not just a commit —
work through the steps below in order and do not skip the pre-flight.

## 0. Pre-flight (never skip)

```bash
git status --short
npm run build
```

**Untracked files are the classic way to ship a broken site.** Anything under
`public/` that the code now references must be tracked, or it exists locally,
builds fine locally, and 404s in production — CI only ever sees what is committed.
Two traps in this repo:

- `.gitignore` excludes `public/Screenshots/**/*.png`. Only the optimized
  `Screenshots/opt/*.webp` files are served. A new screenshot means running
  `npm run screenshots` and committing the WebP, not the PNG.
- Vite copies all of `public/` into `dist/`, *including gitignored files*. The
  local preview server therefore serves images that production does not have.

So: for every `??` line in `git status`, decide explicitly whether it belongs in
the release. If the diff touches image paths, grep the changed components for the
asset names and confirm each one is tracked (`git ls-files <path>`).

The build must pass. If it fails, stop and report — do not ship a red build.

## 1. Pick the version

`package.json` and `changelog.json[0].version` must always be the same string.
The footer renders `changelog[0].version` (see `V6Shell.vue`), so a mismatch is
visible on the live site.

- **patch** (`0.10.0 → 0.10.1`) — asset re-exports, copy fixes, small bug fixes,
  nothing a visitor would call new.
- **minor** (`0.10.1 → 0.11.0`) — new or rebuilt pages, layout/design changes,
  removed sections, anything a visitor would notice.
- **major** — reserved for the public launch; ask before using it.

When it sits on the line, choose minor.

## 2. Write the changelog entry

`changelog.json` is a plain array, **newest entry first**. Prepend:

```json
{
  "version": "0.11.0",
  "date": "2026-07-28",
  "title": "Short headline in sentence case",
  "changes": [
    "One concrete change per line, written for a reader, not a commit log"
  ]
}
```

- `date` is today's actual date in `YYYY-MM-DD` — resolve it, never guess or copy
  the previous entry's date.
- `title` is a headline, not a summary of everything.
- `changes` describe the effect, not the mechanics. Prefer
  "Local & offline rebuilt in the V6 design" over "refactored LocalOfflinePage.vue".
- Group related edits into one line rather than listing every file.

Then set the same version in `package.json`.

Edit both files with targeted string replacements. **Never re-serialize
`changelog.json` or the locale files through `JSON.parse`/`JSON.stringify`** — it
reformats compact one-line objects and buries the real change in a huge diff.

## 3. Commit and push

Commit message: the changelog title with the version appended, matching history:

```
Unify page container width and add full-viewport section bands (v0.10.0)
```

Include the trailer:

```
Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
```

Stage everything that belongs to the release, then push to `main`. Do not use
`--no-verify` and do not force-push.

## 4. Report

State the pushed version, the commit hash, and that the deploy workflow is now
running. If anything was left out of the release, say so explicitly.
