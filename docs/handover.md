# Handover

> As of 2026-06-28.

## Current state

- `main` is clean and pushed. The app entry (`src/main.ts` + `src/entry.ts`) is still the Foldkit starter (counter); not the product.
- **Foldkit view-first preview started** (phase 2). Isolated, throwaway, separate from the app entry:
  - `src/preview-v001/main.ts` — Model `{ greeting }`, one `ClickedGreeting` fact, `update` flips the text, `view` renders a clickable greeting via `@foldkit/ui` `Button.view`. The button is extracted to `helloButtonView(greeting: string)`.
  - `src/preview-v001/entry.ts` — `Runtime.makeApplication` + `run` into `#root` (mirrors the template, incl. devtools overlay).
  - `src/preview-v001/preview.html` — own page. Dev URL: `http://localhost:5173/src/preview-v001/preview.html`.
  - `vite.config.ts` — multi-page `build.rollupOptions.input` (`main` + `preview`); preview entry added to `optimizeDeps.entries`.
- Specs locked: `roadmap.md`, `item-state.md`, `interaction.md`, `persistence.md`, `search.md`, `visual.md`.
- Working mock + first preview direction: `docs/mockups-002/board-mock.html` (data-driven, full states gallery). We are finalizing view structure from it. Off-limits `docs/mockups/` (vNNN) files are distinct.
- Teaching artifacts in `docs/learn/`: `view-anatomy.md`, `view-anatomy.html` (interactive: step-through + click-to-reveal + quiz), `view-anatomy-v002.html` (distinctive redesign with the Model→view→Message→update loop rail). All cover the current preview `view` only, cited from the foldkit subtree.

## Conventions / decisions this session

- **No worktrees.** Banned in `CLAUDE.md` Rules until the user lifts it. Work in the shared checkout.
- **Lint:** `pnpm lint` = `oxlint --disable-nested-config` (stops oxlint loading vendored `repos/**/.oxlintrc.json`, which fails on a missing JS plugin).
- **Typecheck:** `tsconfig.json` now `exclude: ["repos", "dist", "node_modules"]`.
- **IDE:** vendored `repos/` is excluded in WebStorm (`.idea`, user-managed) to silence TS2307 on example deps (`clsx`, `maplibre-gl`). Not a lint issue.
- **Code shape guardrails (now in `CLAUDE.md`):** whole-project rules — ~3 nesting levels max then extract; no "small/throwaway" exemptions (broken windows); pass narrow slices not whole objects; keep sibling calls at one level of abstraction. Framed as human-readability limits, not style.

## Next (phase order)

1. Grow `preview-v001` from the mock: build the static board with stateless helpers + Tailwind classes mirroring `board-mock.html` (header, done-filter, section cards, item variants). Decompose into `sectionView` / `itemView` / `filterView` etc. from the start. No behavior yet.
2. Introduce stateful Submodels as behavior lands: section collapse → Disclosure, edit → Dialog, move → Popover, search → Combobox, drag → DragAndDrop.
3. Finalize Schema/model + build the real app view (field shape tentative — see `persistence.md`): `id`, fractional `order`, `archived`, `done`, created/modified.

## Open spec questions

- Multi-board: single board permanently, or multi-board later?
- Ordinal persistence: confirm fractional `order` (P4) survives archive -> unarchive (D7 = restore at top).
- Empty-title rule: can an Item/Section have a blank title; behaviour on clear + close?
- Modified-timestamp: which actions bump it (text edit only, or also done-toggle/archive)?
