# Interaction & Board UI (working draft)

> Scope: board layout behaviour, the done-filter, add placement, editing, drag, and empty states.
> Hub: [`roadmap.md`](./roadmap.md). Sibling specs: [`persistence.md`](./persistence.md), [`search.md`](./search.md), [`item-state.md`](./item-state.md).

## Decisions (locked)

- **I1 — Done-filter (header)**: a **three-state** filter over the main view: `Open` (done hidden — **default**) | `Done` (only done) | `All`. View-only — it never changes entity state. Replaces the binary "done show/hide toggle" framing in roadmap #11/#16.
- **I2 — Add placement**: new entries **insert at the top** — a new Item at the top of its Section, a new Section at the top of the board. (Reverses roadmap #12/#13 "appends at the bottom"; see open A1.)
- **I3 — Filtered section**: a Section the done-filter leaves with no visible items **stays visible**. It shows a footer **"N filtered"** whenever ≥1 of its items is hidden by the current filter (shown on full and empty sections alike), plus its add button. The footer counts filter-hidden items only — not archived items (archive is a separate surface).
- **I4 — Item text**: **multiline**.
- **I5 — Commit / cancel**: the edit popover has explicit **OK / Cancel** buttons (the "internal dialog"). Edits commit only via OK; Cancel discards. **Blur** (clicking away) with unsaved changes shows a **confirm popup** rather than silently saving or discarding.
- **I6 — First run**: seed a **sample Section** (with a couple of items) when there is no saved data.
- **I7 — Empty Section** (zero items, not filter-hidden): show **title + add button**, nothing else.
- **I8 — Empty board** (no Sections): show an **instruction to add** a Section.

## Drag-reorder (cross-cutting)

Roadmap #7 locks drag for items-in-section, items-across-sections, and sections themselves. Implementation follows the **kanban example** in `repos/foldkit/examples/kanban/` (verify its pattern before building). The fractional `order` field (persistence P4) makes each reorder a single key recomputation.

## Open

- **A1 — add vs restore direction**: I2 inserts new entries at the **top**, but item-state.md **D7** restores (unarchives) to the **bottom**. Decide whether add and restore should be consistent, and update whichever doc is wrong. Roadmap #12/#13 also still say "bottom" and need updating to match I2.
- **B1 — filter persistence**: whether the I1 filter selection persists across reload is undefined.
- **B2 — done rendering**: whether done items render struck-through, and where, is undefined (roadmap #16 assumed strikethrough; not re-confirmed).
- **D1 — blur popup**: the exact wording and choices of the I5 blur confirm are undefined (e.g. Save / Discard / Keep editing).
- **E1 — seed content**: the actual sample Section/items for I6 are undefined.
