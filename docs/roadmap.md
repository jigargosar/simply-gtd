# Roadmap — List-of-Lists App (working draft)

> Status: **requirements gathering in progress**. Living hub. Detailed sub-designs live in cross-referenced files and are summarized here.

## Concept

A board is a vertical stack of **Sections**. Each Section has a title and a list of **Items**. Full CRUD on Sections and Items. Trello-style **archive** replaces hard delete.

## Locked decisions

1. **Structure**: Board → Sections (titled) → Items. Two CRUD entities: Section, Item.
2. **Persistence**: Local only (browser storage). No backend, no sync.
3. **Users**: Single user, no auth.
4. **Item shape**: text + **done checkbox** (todo-style) + created/modified timestamps.
5. **Search**: simple text search — type, get a filtered list.
6. **Item metadata**: created + modified timestamps only.
7. **Drag reorder**: items within a section, items across sections, and reordering sections.
8. **No bulk operations.**
9. **State model**: two orthogonal boolean axes per entity — `archived/not-archived` and `done/not-done` (no "active"). Delete is an action that removes the record (no `deleted` state). Visibility derived from own + parent `archived`. See [`item-state.md`](./item-state.md).

## Interaction & layout

10. **Header**: always-visible (sticky) top header. Holds search + the global controls directly (no hamburger).
11. **No top-level menu**: hamburger dropped — too few globals to justify it. Globals live as visible header controls: a **3-state done-filter** and an **Archive view** button. See [`interaction.md`](./interaction.md) I1.
12. **Add Item**: small "+ add" text button at the **end** of each section → opens the inline popover; new item **inserts at the top**. See [`interaction.md`](./interaction.md) I2.
13. **Add Section**: same pattern — small add button at the end of the board → inline popover; new section **inserts at the top**.
14. **One inline popover per entity**: clicking an Item or Section title opens a single **lightweight popover anchored to it** (not a board-dimming modal). It holds the edit field(s) plus the entity's 3–5 actions (edit / done / archive / move). See [`interaction.md`](./interaction.md) I4/I5.
15. **No hover-reveal, no ⋮ menu**: actions live in the inline popover. Hover dies on touch and hurts discoverability; with few items per section a click-to-open row is cleaner and touch-safe.
16. **Done**: ticking marks the item done in place (order unchanged), rendered **struck-through**. Done-item visibility is governed by the header 3-state filter (#11). See [`interaction.md`](./interaction.md) I1/I9.
17. **Search**: input in the sticky header; typing shows a **flat dropdown** of matching results on the page (each result shows its section label). See [`search.md`](./search.md).

## Sub-designs (cross-referenced)

- **Item state / lifecycle** → [`item-state.md`](./item-state.md) — two-axis model (archived, done), delete-as-removal, transitions, derived visibility, archive view. E1 resolved (D10: section-delete cascades behind count-confirm).
- **Persistence & data model** → [`persistence.md`](./persistence.md) — localStorage one-blob (P1/P2), uuid identity (P3), fractional-index ordering (P4), debounced autosave (P5).
- **Search** → [`search.md`](./search.md) — scope = text + titles (S1), unrestricted corpus with archived hits marked (S2), click scrolls + highlights (S3).
- **Interaction & board UI** → [`interaction.md`](./interaction.md) — 3-state done-filter (I1), add-at-top (I2), filtered-section footer (I3), multiline edit + OK/Cancel + blur-confirm (I4/I5), seed (I6), empty states (I7/I8), collapse (I10), drag via kanban precedent.
- **Visual design** → [`visual.md`](./visual.md) — soft cards (V1), light theme (V2), centered column (V3), segmented filter (V4), dodger-blue accent (V5), Inter (V6), comfortable density (V7), grip-handle drag (V8).

## Resolved questions (board-level)

- Q-search-scope → **resolved**: item text **+** section titles. See [`search.md`](./search.md) S1.
- Q-done-flag → **resolved**: a 3-state filter `Open | Done | All` governs visibility (not a strikethrough toggle). See [`interaction.md`](./interaction.md) I1.
- Q-add-placement → **resolved**: new entries **insert at the top**. See [`interaction.md`](./interaction.md) I2.

## Open questions (board-level)

- None outstanding. Prior threads are resolved — see the **Resolved** sections in [`interaction.md`](./interaction.md) (A1, B1, B2, D1, E1) and [`search.md`](./search.md) (C1–C3, folded into decisions S2–S4).
