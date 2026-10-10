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
- [ ] Phase 1: brand and design system (mockup look, soft 8px corners, serif display + Geist)
- [ ] Phase 2: Asian photos + hero video
- [ ] Phase 3: marketing site redesign + recursive-frog showcase layer
- [ ] Phase 4: admin theme + KPI dashboard
- [ ] Phase 5: 12-month showcase seed data
- [ ] Phase 6: QA, deploy, hand-off

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
