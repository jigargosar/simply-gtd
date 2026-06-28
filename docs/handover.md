# Handover

> As of 2026-06-27.

## Current state

- `main` is clean. App code is the Foldkit starter template (`src/main.ts` + `src/entry.ts`). No view implemented yet.
- Specs are locked: `roadmap.md`, `item-state.md`, `interaction.md`, `persistence.md`, `search.md`, `visual.md`.
- Current working mock: `docs/mockups-002/board-mock.html` (data-driven, full states gallery) — our first preview direction; we are finalizing the view structure from it. Status + pending items in `visual.md` → "Mock — resume notes". Off-limits `docs/mockups/` (vNNN) files are distinct and not to be opened.

## Next (phase order)

1. Finish + confirm the HTML mock — re-screenshot the recent changes and settle the 3 unconfirmed decisions (see visual.md "Unconfirmed").
2. Foldkit view-first mock — render `view(sampleModel)` on the Foldkit layer *before* modeling, to surface the component set. Decide scene vs a separate preview entry.
3. Then finalize the Schema/model + build (concept is locked; field shape is tentative — see persistence.md status):
   - Board view on the Foldkit component layer (`@foldkit/ui` + Submodels): edit popover (I4/I5) -> Dialog/Popover, section collapse (I10) -> Disclosure, done-filter (I1) -> segmented control, search (S1-S4) -> Combobox/Input, drag (#7, V8) -> `@foldkit/ui` DragAndDrop.
   - Model real fields per `persistence.md`: `id`, fractional `order`, `archived`, `done`, created/modified.

## Open spec questions

- Multi-board: single board permanently, or multi-board later?
- Ordinal persistence: confirm fractional `order` (P4) survives archive -> unarchive (D7 = restore at top).
- Empty-title rule: can an Item/Section have a blank title; behaviour on clear + close?
- Modified-timestamp: which actions bump it (text edit only, or also done-toggle/archive)?
