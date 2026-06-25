# Roadmap — List-of-Lists App (working draft)

> Status: **requirements gathering in progress**. This is a living notes file built during grilling. Decisions move from "Open" to "Locked" as they're confirmed.

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
9. **Removal model**: Trello-style **Archive**, not delete. Full design in [`archive-specs.md`](./archive-specs.md) (D1–D8 locked).

## Archive model — understood so far

10. Nothing is hard-deleted; the destructive action is **Archive**.
11. Archive triggered from a per-entity **kebab menu** (per Item, per Section).
12. Archiving a **Section cascades** to its Items.
13. Separate **Archive view** lists archived entities; entries can be **Unarchived**.
14. In the Archive view, **no confirmation** on archive/unarchive.
15. Recoverability comes from archive/unarchive — not a generic undo stack.

## Open questions

- Q7: Is archive terminal, or is there also "Delete forever" from the Archive view?
- Q8: Unarchiving a Section — do its cascade-archived Items return with it?
- Q9: Archive an Item individually, then unarchive just it back to its Section? (assume yes)
- Q10: Archive view layout — flat list vs grouped (Sections vs Items, items show origin section)?
- Q11: Any board-level archive, or just Sections + Items?
- Q12: `done` checkbox is independent of archive (done = visible+complete; archived = hidden)?
