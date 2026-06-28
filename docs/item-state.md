# Item State (working draft)

> Scope: requirements/behaviour for the state of an entity (Section, Item) — not implementation.
> Two orthogonal axes plus a delete action. Replaces the old "archive-specs" framing.

## The two axes

Every entity (Section, Item) carries two independent boolean axes:

- archived: `not-archived | archived`
- done: `not-done | done`

They are orthogonal — all four combinations are valid:

| archived     | done     | meaning                                            |
| ------------ | -------- | -------------------------------------------------- |
| not-archived | not-done | open item on the board                             |
| not-archived | done     | completed item, struck through, still on the board |
| archived     | not-done | archived, never completed                          |
| archived     | done     | completed, then archived                           |

There is no "active" state — "active" was just an ambiguous name for `not-archived`. Name each axis by its own pair.

## Delete is an action, not a state

`delete` permanently removes the record. There is no `deleted` state: local-only, single-user, no sync, no undo-of-delete ⇒ nothing ever reads a deleted record, so no tombstone is kept.

- Reachable only from the Archive view (an entity must be `archived` first).
- Confirms (archive/unarchive do not).
- Revisit this only if sync, audit, or undo-delete is added — those are the only drivers for a persisted `deleted` state. Locked decisions (#2 local-only, #3 single-user) currently exclude them.

## Transitions

- archive: `not-archived → archived`
- unarchive: `archived → not-archived`
- delete: `archived → ∅ (gone)`
- done toggle: `not-done ⟷ done` (independent of the archive axis)

Lifecycle on the archive axis: `not-archived ⟶archive⟶ archived ⟶delete⟶ ∅` (and `archived ⟶unarchive⟶ not-archived`).

## Derived visibility (no cascade tracking)

Visibility is derived from an entity's own `archived` flag plus its parent's — never separately tracked.

- Board shows Section S iff `S` is `not-archived`; within S, shows Item I iff `I` is `not-archived`. The done-toggle then filters that set by `done/not-done` (a view filter, not a state change).
- Archive view shows: archived Sections (as blocks, with their child items inside) and archived orphan Items whose parent Section is still `not-archived` (shown with origin-section label). Search available within the archive.
- An Item that is `not-archived` but whose parent Section is `archived` is not on the board and not independently in the archive — it rides inside its archived Section's block and returns when the Section is unarchived. Its own flag is the memory.

## Decisions (locked)

- D1: Two orthogonal boolean axes per entity: `archived/not-archived`, `done/not-done`. No "active."
- D2: Visibility derived from `own.archived` + `parent.archived`. No separate cascade tracking.
- D3: Transitions: archive, unarchive, delete, done-toggle.
- D4: Delete reachable only from the Archive view; delete confirms; archive/unarchive do not.
- D5: Archive view is grouped — archived Sections as blocks (with their items), archived orphan Items with origin-section label. Search within the archive.
- D6: Only Sections + Items carry state. No board-level archive/delete.
- D7 (restore position): Restored Section inserts at the **top** of the board; restored Item inserts at the **top** of its parent Section. Original ordinal not preserved. Consistent with add-at-top ([`interaction.md`](./interaction.md) I2).
- D8: `done` is independent of `archived`; all four combinations are valid.
- D9 (no deleted state): Delete removes the record; no tombstone. Revisit only if sync/audit/undo-delete is added.
- D10 (E1 — section delete cascade): Deleting an archived Section removes the Section and all its items, behind a count-aware confirm ("Delete section and its N items permanently?"). Double-gated (archive first, then confirm) is the bulk-loss guard.
