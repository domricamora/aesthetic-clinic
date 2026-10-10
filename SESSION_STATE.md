# SESSION_STATE.md — HAND-OFF, START HERE

Updated 2026-10-10.

## What this is

**Aesthetic Clinic**, the showcase tenant of the Aesthetic Clinic SaaS Platform by recursive-frog.com. Forked on 2026-10-10 from a sibling clinic codebase with `git archive` (fresh history, no shared remote, own databases). It has nothing to do with the sibling sites: never copy files, scripts or `.env` between the folders.

- Master plan for this build: `C:\Users\Nick\.claude\plans\i-want-you-to-dazzling-stream.md` (phases 0 to 6). Feature spec: `plan.md`. Product and brand: `PRODUCT.md`.
- Repo: https://github.com/domricamora/aesthetic-clinic (private).
- Local: http://localhost/beautyclinic/public (login `/login`, admin `/dashboard`). DBs `beautyclinic` and `beautyclinic_testing`.
- Live: https://aesthetic-clinic.recursive-frog.com, cPanel `htrjymuo@ck.deskpulse.click:9022`, folder `~/public_html/aesthetic-clinic.recursive-frog.com`, DB and user `htrjymuo_aesthetic-clinic`. Credentials only in the server `.env`.

## Demo logins (password `password`)

admin@aesthetic-clinic.test (Super Admin), owner@aesthetic-clinic.test, reception@aesthetic-clinic.test.

## Progress

- [x] Phase 0: fork, detach, rebrand strings, deploy guard retargeted (`scripts/deploy.ps1` derives `https://<slug>.recursive-frog.com` from `config/clinic.php` slug `aesthetic-clinic`), 241 tests green.
- [x] Phase 1: tokens in `resources/css/app.css` (rose canvas, blush, clay `#A4604F` actions, cocoa ink, 10px radius, Gilda Display + Geist), SVG mark `components/brand-mark.tsx` + favicons from `php scripts/build-mark.php`.
- [x] Phase 2: 38 Unsplash photos of Asian practitioners/patients (`public/media/photos/credits.json`), hero loop `public/media/video/hero-clinic.mp4` cut from four Pexels clinic clips (`CREDITS.md`).
- [x] Phase 3: new `site-layout.tsx` (recursive-frog showcase strip, header, footer credit), `home.tsx` on the mockup, `platform.tsx` (`/platform`, demo logins), all public page heroes light, plum fills moved to clay. Fixed chat widget root-relative fetches.
- [x] Phase 4: admin re-themed by tokens; dashboard KPI panel `components/admin/analytics-panel.tsx` + SVG charts `components/admin/charts.tsx`; `ClinicAnalytics` gained patients, utilisation, branches, categories, practitioners, funnel, sources, monthly. Fixed previous-period bound and the refund sign bug. Platform screenshots in `public/media/photos/platform-*.jpg` (re-capture after visual changes).
- [x] Phase 5: `ShowcaseHistorySeeder` (a year through the real actions, ~2.5 min).
- [ ] Phase 6: login page demo logins + auth/settings polish, mobile QA, impeccable finish review + DESIGN.md, deploy.

Tests: 247 (6 new analytics tests). Last full run green before the analytics work; POS + analytics files green after.

## Commands

- Tests: `php artisan test` (serial; `--parallel` fails because test helpers like `facial()` and `boss()` are declared in other test files).
- Build: `MSYS_NO_PATHCONV=1 ASSET_URL=/beautyclinic/public npm run build`
- Reset demo: `php artisan migrate:fresh --seed`
- Deploy: `pwsh -File scripts/deploy.ps1` (refuses any target other than this slug's site, folder and database).

## Gotchas (carried from the parent codebase)

- Models holding a photo path need the `AssetUrl` cast (sub-folder serving).
- Date-only columns cast `date:Y-m-d` when they reach the browser.
- Write source files with the Write tool; bash heredocs break on unpaired apostrophes.
- Wayfinder bakes APP_URL into routes at build time.
- `<PasskeyVerify>` needs `routes` (`loginOptions()`, `passkeyLogin()`).
- Never hard-code a root-relative URL; use Wayfinder, `url()` or `Vite::asset()`.
- PHPStan has 11 pre-existing errors in older files; do not claim it passes.
- Browser QA: `playwright-core` in the session scratchpad + `~/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe`.
