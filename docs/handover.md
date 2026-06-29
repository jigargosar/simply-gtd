# Handover

> As of 2026-06-29.

## Current state

- `main` is clean and pushed. The app entry (`src/main.ts` + `src/entry.ts`) is still the Foldkit starter (counter); not the product.
- **`preview-v001` is now an interactive board** (grew it; greeting starter replaced). Isolated from the app entry.
  - `src/preview-v001/main.ts` — Model `{ sections, filter }` with `Section { id, title, collapsed, items }` and `Item { id, text, done }`; `filter: S.Literals(['Open','Done','All'])`. Facts: `SelectedFilter`, `ToggledSectionCollapse`. `update` via `M.tagsExhaustive` + `evo`; no Commands yet. View decomposed into slice-taking helpers (`itemView` / `sectionView` / `filterView` / `headerView` ...). Icons are inline `h.svg`/`h.path` (Lucide path data) via core primitives; interactive controls use `@foldkit/ui` `Button.view`. Working: live done-filter (Open/Done/All) + per-section collapse.
  - `entry.ts` / `preview.html` unchanged. Dev URL: `http://localhost:5173/src/preview-v001/preview.html`.
  - `vite.config.ts` — multi-page input (`main` + `preview`) unchanged.
  - Verified in-browser (no console errors); `typecheck` / `lint` / `format` clean.
- **Model kept minimal, derived from the view.** No `archived` / `order` / timestamps until something renders them. Seed = the mock's sample sections (Inbox / This Week / ...), NOT yet the I6 "Welcome" seed.
- Specs locked: `roadmap.md`, `item-state.md`, `interaction.md`, `persistence.md`, `search.md`, `visual.md`. Implemented per spec where in scope: I1 done-filter (view-only, 3-state), I3 "N filtered" footer, I7 empty section, I10 collapse-with-count.
- **Mock is a visual reference for the view only** (`docs/mockups/board-mock.html`) — not a data/implementation blueprint.

## Conventions / decisions this session

- **No worktrees.** Banned in `CLAUDE.md` Rules until the user lifts it. Work in the shared checkout.
- **Lint:** `pnpm lint` = `oxlint --disable-nested-config` (stops oxlint loading vendored `repos/**/.oxlintrc.json`, which fails on a missing JS plugin).
- **Typecheck:** `tsconfig.json` now `exclude: ["repos", "dist", "node_modules"]`.
- **IDE:** vendored `repos/` is excluded in WebStorm (`.idea`, user-managed) to silence TS2307 on example deps (`clsx`, `maplibre-gl`). Not a lint issue.
- **Code shape guardrails (now in `CLAUDE.md`):** whole-project rules — ~3 nesting levels max then extract; no "small/throwaway" exemptions (broken windows); pass narrow slices not whole objects; keep sibling calls at one level of abstraction. Framed as human-readability limits, not style.
- **Mock = reference for the view, not implementation.** Don't copy its data / JS / icons; derive the model from the view being built.
- **No premature abstraction.** Plain `collapsed` boolean + fact, not per-section `Disclosure` submodels. Reach for `@foldkit/ui` submodels only when plain state strains.
- **Library-only visuals.** Foldkit ships no icon set; render icons with core SVG primitives (`h.svg`/`h.path`) and use `@foldkit/ui` for interactive controls. No custom icon abstraction layer.
- **`docs/_archive/` ban extended** (`CLAUDE.md`): off-limits in the working tree AND git history; ignore any incidental surfacing. Behavioral, not via ignore files.
- **Update `handover.md` after every significant chunk of work**, not just at end of session.

## Next (phase order)

1. **Inline edit (next):** add `Editing | NotEditing` (`ts()`) to Model + `StartedEditingItem` / `ChangedItemDraft` / `SubmittedItemEdit` / `CancelledItemEdit`; edit panel in `itemView` (todo example is the template). Plain state, no Dialog submodel yet.
2. Add item / section (needs ids → first Command, Crypto UUID per kanban; insert-at-top, I2) and done-toggle (`ToggledItemDone`, nested `evo`).
3. Then: move picker, drag (kanban `DragAndDrop`), archive view + restore, search, persistence (localStorage blob). Introduce `@foldkit/ui` submodels as each behavior earns it.
4. When `update` passes ~15–20 cases / the view grows: split into `model.ts` / `message.ts` / `command.ts` / `update.ts` / `view/` and add `story.test.ts` + `scene.test.ts`.
5. Swap mock seed → I6 "Welcome to simply-gtd" first-run seed once persistence lands.

## Aspiration — learning

Recreate `docs/learn/` explainers that teach the board code in `src/preview-v001/`: the Model → view → Message → update loop on the real code (Schema model, `evo`, decomposed slice-taking view fns, `Button.view`, inline `h.svg`), as an interactive page (step-through, click-to-reveal, loop rail) driven via the foldkit MCP. Every API claim cited from the foldkit subtree.

## Open spec questions

- Multi-board: single board permanently, or multi-board later?
- Ordinal persistence: confirm fractional `order` (P4) survives archive -> unarchive (D7 = restore at top).
- Empty-title rule: can an Item/Section have a blank title; behaviour on clear + close?
- Modified-timestamp: which actions bump it (text edit only, or also done-toggle/archive)?
