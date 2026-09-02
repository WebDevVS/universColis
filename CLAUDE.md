# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Server-rendered Node.js/Express app ("UniversColis" — a shipping/parcel price comparator). Handlebars views, MongoDB via Mongoose. Route paths, comments, and identifiers mix French and English.

## Commands

- `npm start` — runs `nodemon index.js` (dev server, auto-restarts on change)
- `npm run build:assets` — runs `scripts/minify.js`: minifies every `.js` in `static/js/` and every `.css` in `static/css/` (plus `static/css/purged/`) to `.min.*` siblings
- `npm run purgecss` — runs `purgecss-runner.js` (config in `purgecss.config.cjs`) to generate the trimmed stylesheets under `static/css/purged/`
- There is **no** `build:css` / `watch:css` script and **no** `src/css/` directory — `static/css/style.css` is the hand-edited source of truth; there is no compile step to run after editing it, just rebuild the `.min.css`/purged variants with the commands above when shipping.
- No `test` script and no test framework exist.

## Verifying changes

There is no automated test suite — validation is manual:
1. If the change touches CSS, edit `static/css/style.css` directly, then run `npm run build:assets` (and `npm run purgecss` if the change affects class usage) before checking in the browser.
2. Run `npm start`.
3. Manually check the affected pages in a browser.

## Required environment variables

Not documented elsewhere (no `.env.example`); inferred from `process.env` usage:
- `MONGO_URL` — MongoDB connection string; app calls `process.exit(1)` if it fails to connect
- `PORT` — defaults to 5555 if unset
- `NODE_ENV` — gates production behaviors (HTML minification, ad placements, error stack visibility)
- `BOXTAL_ACCESS_KEY`, `BOXTAL_SECRET_KEY` — Boxtal API auth, `config/auth.js` throws if missing
- `EUROSENDER_API_KEY` — Eurosender API auth, throws if missing
- `GEONAMES_USER`
- `BREVO_API_KEY` — used in `controllers/contactController.js`, declared in `render.yaml`

## Gotchas

- There is no `legacy/` directory in this repo — don't assume one exists.
- `static/css/style.css` is a single flat, hand-written stylesheet (plain `/* ===== SECTION ===== */` comment dividers, no ITCSS layers, no native CSS `@layer`). There's no `src/css/` build pipeline — edit `static/css/style.css` directly.
- The CSP in `config/express.js` explicitly allow-lists third-party domains. A new external script/asset domain must be added there or it will silently fail to load in production.
- CORS is hardcoded to `https://universcolis.fr` in `config/express.js`.
- Most routes are defined directly in `config/routes.js` and in the controller files, not in `routes/` (which contains only one file, `autocompleteRoute.js`).

## Design system rules

- Gradient (violet #8269A4 → coral #FA7E75): the brand palette, defined as CSS vars `--primary-color`/`--accent-color` in `static/css/style.css`. Reserve the gradient itself for nav, footer, and primary CTAs — never on decorative elements.
- `display: flex !important` is used on Font Awesome icon containers in `static/css/style.css` — keep doing this for new FA icon containers, since FA's own CSS loads with higher specificity otherwise.
- Accordion pattern (`grid-template-rows: 0fr`): requires an inner wrapper with `overflow: hidden` and `min-height: 0`.
- In practice `rgba()` is used far more than `color-mix()` in `static/css/style.css` (~570 vs ~60 occurrences) and shadows are plain black (`rgba(0,0,0,0.2)`, see `--shadow-standard`), not violet/coral-tinted — treat any "always use color-mix" or "shadows are always tinted" guidance as aspirational, not a description of the current stylesheet.
- There is no `/pro` section and no `#4E3472` dark-violet palette anywhere in this repo currently.

## Guide v2 migration

- Guides live in the `Article` Mongoose model (`models/Article.js`), which carries both the legacy v1 fields (flat `steps`/`materials`/`faq`) and the v2 fields (`parts[].sections[].blocks[]`, block type documented inline in the schema) side by side, discriminated by a `version: 'v1'|'v2'` field. `views/article_old.hbs` renders v1, `views/article.hbs` renders v2 via the `guide-blocks/` partials.
- 30+ reusable block-type partials exist in `views/partials/guide-blocks/` — always check for an existing one before creating a new component type.
- Per git history, guides migrated to v2 so far include: bougies (candles), bouteille de vin (wine bottle), appareil photo (camera), and antiquités (antiques/art objects) — verify current status in the database rather than assuming this list is exhaustive or current.
