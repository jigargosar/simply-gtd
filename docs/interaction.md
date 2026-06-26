# Interaction & Board UI (working draft)

> Scope: board layout behaviour, the done-filter, add placement, editing, drag, and empty states.
> Hub: [`roadmap.md`](./roadmap.md). Sibling specs: [`persistence.md`](./persistence.md), [`search.md`](./search.md), [`item-state.md`](./item-state.md).

## Decisions (locked)

- **I1 — Done-filter (header)**: a **three-state** filter over the main view: `Open` (done hidden — **default**) | `Done` (only done) | `All`. View-only — it never changes entity state. The selection **persists in the board blob** across reload. Replaces the binary "done show/hide toggle" framing in roadmap #11/#16.
- **I2 — Add placement**: new entries **insert at the top** — a new Item at the top of its Section, a new Section at the top of the board. (Reverses roadmap #12/#13 "appends at the bottom"; see open A1.)
- **I3 — Filtered section**: a Section the done-filter leaves with no visible items **stays visible**. It shows a footer **"N filtered"** whenever ≥1 of its items is hidden by the current filter (shown on full and empty sections alike), plus its add button. The footer counts filter-hidden items only — not archived items (archive is a separate surface).
- **I4 — Item text**: **multiline**.
- **I5 — Commit / cancel**: the edit popover has explicit **OK / Cancel** buttons (the "internal dialog"). Edits commit only via OK; Cancel discards. **Blur** (clicking away) with unsaved changes shows a confirm with three choices — **Save / Discard / Keep editing** — rather than silently saving or discarding.
- **I6 — First run**: seed one sample Section **"Welcome to simply-gtd"** with three items when there is no saved data:
  1. "Click a row to edit, complete, or archive it"
  2. "Tick the checkbox to mark an item done" — *seeded done* (demonstrates strikethrough + filter)
  3. "Use + add to capture new items; they appear at the top"
- **I7 — Empty Section** (zero items, not filter-hidden): show **title + add button**, nothing else.
- **I8 — Empty board** (no Sections): show an **instruction to add** a Section.
- **I9 — Done rendering**: done items render **struck-through** wherever shown (Done/All filter views, archive).

## Drag-reorder (cross-cutting)

Roadmap #7 locks drag for items-in-section, items-across-sections, and sections themselves. Implementation follows the **kanban example** in `repos/foldkit/examples/kanban/` (verify its pattern before building). The fractional `order` field (persistence P4) makes each reorder a single key recomputation.

## Resolved

- **A1** → add and restore are **consistent**: both insert at the **top**. item-state.md D7 updated to restore-at-top.
- **B1** → filter selection **persists** in the board blob (folded into I1).
- **B2** → done items **render struck-through** (now I9).
- **D1** → blur confirm choices are **Save / Discard / Keep editing** (folded into I5).
- **E1** → seed content **defined** (folded into I6).
