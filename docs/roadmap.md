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
11. **No top-level menu**: hamburger dropped — too few globals to justify it. Globals live as visible header controls: a **done show/hide toggle** and an **Archive view** button.
12. **Add Item**: small "+ add" text button at the **end** of each section → opens the inline popover; new item appends at the bottom.
13. **Add Section**: same pattern — small add button at the end of the board → inline popover.
14. **One inline popover per entity**: clicking an Item or Section title opens a single **lightweight popover anchored to it** (not a board-dimming modal). It holds the edit field(s) plus the entity's 3–5 actions (edit / done / archive / move).
15. **No hover-reveal, no ⋮ menu**: actions live in the inline popover. Hover dies on touch and hurts discoverability; with few items per section a click-to-open row is cleaner and touch-safe.
16. **Done**: ticking **strikethroughs in place** (order unchanged). The header done-toggle controls done-item visibility.
17. **Search**: input in the sticky header; typing shows a **flat dropdown** of matching results on the page (each result shows its section label).

## Sub-designs (cross-referenced)

- **Item state / lifecycle** → [`item-state.md`](./item-state.md) — two-axis model (archived, done), delete-as-removal, transitions, derived visibility, archive view. E1 resolved (D10: section-delete cascades behind count-confirm).

## Open questions (board-level)

- Q-search-scope: does search match item text only, or also section titles?
- Q-done-flag: does the top-level done flag **hide** completed items, or toggle the strikethrough styling itself?
- Q-add-placement: confirm new items append at bottom (vs top) — flagged to eval against similar apps.
