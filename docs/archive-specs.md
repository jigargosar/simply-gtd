# Archive Specs (working draft)

> Trello-style archive for the List-of-Lists app. Replaces hard delete. Living doc — built during grilling.

## Model so far

1. Nothing is hard-deleted; the destructive action on Items and Sections is **Archive**.
2. Archive is triggered from a per-entity **kebab menu** (one per Item, one per Section).
3. Archiving a **Section cascades** to its Items.
4. A separate **Archive view** lists archived entities; entries can be **Unarchived** (restored).
5. In the Archive view, **no confirmation** on archive/unarchive.
6. Recoverability comes entirely from archive/unarchive — no generic undo stack.
7. `done` checkbox is independent: done = visible + complete; archived = hidden from board.

## Open questions

- Q7: Is archive terminal, or also "Delete forever" from the Archive view?
- Q8: Unarchiving a Section — do its cascade-archived Items return with it?
- Q9: Archive an Item individually, then unarchive just it back to its Section?
- Q10: Archive view layout — flat vs grouped (Sections vs Items; items show origin section)?
- Q11: Any board-level archive, or just Sections + Items?

## Decisions (locked)

- **D1 (Q7)**: Two-stage removal. Archive is reversible; the Archive view also offers **Delete forever** (terminal, and this one *does* confirm).
- **D2 (Q8)**: Cascade is symmetric. Archiving a Section takes its Items down with it; restoring the Section brings those same Items back as a unit. The Section remembers what it cascaded.
- **D3 (Q9)**: Items can be archived individually (Section untouched) and restored back to their origin Section. Only Items cascaded by a Section archive ride back with that Section.
- **D4 (Q10)**: Archive view is **grouped** — archived Sections as blocks; archived Items listed with their origin-section label. Search available within the archive.
- **D5 (Q11)**: Only Sections + Items are archivable. No board-level archive.
- **D6 (edge: archive-item-then-archive-section)**: An individually-archived Item **stays archived** when its Section is restored. Section-restore only returns what section-archive took down.
- **D7 (edge: restore position)**: A restored Section appends to the **bottom of the board**; a restored Item appends to the **bottom of its origin Section**. Original ordinal is not preserved.
- **D8**: `done` is independent of archive. done = visible + complete; archived = hidden from board.
