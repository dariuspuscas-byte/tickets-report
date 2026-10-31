# tickets-report

Support ticket **#4471** ("dates parse mm/dd in eu locales", marked known) merged 412 reports as one
issue. It holds three problems. Each has its own ticket here:

- [#1 parser](../../issues/1) — shared parser reads day-first tenants' dates month first
- [#2 hint](../../issues/2) — booking-v3 form hint says MM/DD/YYYY, form reads day first
- [#3 one-day](../../issues/3) — dates land one day off (timezone), not a swap

## The kb page

- Source: [`kb/src/routes/kb/incidents/4471-split/+page.svx`](kb/src/routes/kb/incidents/4471-split/+page.svx),
  with its logic in [`kb/src/lib/kb/problems.ts`](kb/src/lib/kb/problems.ts) and
  [`kb/src/lib/kb/ProblemTable.svelte`](kb/src/lib/kb/ProblemTable.svelte).
- As the desk sees it: [`page/4471-split.html`](page/4471-split.html) ([screenshot](page/4471-split.png)).

`kb/` is the support desk's kb export (2026-10-04) with that page added, plus a render harness
(`package.json`, `svelte.config.js`, `vite.config.js`, `src/app.html`). Build: `cd kb && npm i && npx vite build`.
