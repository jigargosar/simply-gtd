# Archive Specs (working draft)

> Trello-style archive for the List-of-Lists app. Replaces hard delete. Living doc — built during grilling.

## Core model: one flag rules

Every entity (Section, Item) carries a single `status` flag:

```
status : 'active' | 'archived' | 'deleted'
```

All actions are transitions of this one flag. There is **no cascade bookkeeping** — visibility is *derived* from an entity's own flag plus its parent's flag.

### Transitions

- **Archive**: `active → archived` (from the per-entity kebab menu).
- **Unarchive**: `archived → active` (from the Archive view).
- **Delete forever**: `archived → deleted` (from the Archive view; terminal; confirms).

### Derived visibility (the whole point of the single flag)

- **Board** shows Section S iff `S.status == active`; within S, shows Item I iff `I.status == active`.
- **Archive view** shows: archived Sections (as blocks, with their child items inside), and archived Items whose parent Section is still active (orphan archived items).
- An Item that is `active` but whose parent Section is `archived` is **not on the board and not independently in the archive** — it rides inside its archived Section's block and returns when the Section is unarchived.

This makes the tricky cases fall out for free:

- Archive Section → its `active` items are hidden (parent archived) but keep `status=active`; unarchiving the Section brings them straight back.
- Archive an Item individually, then archive its Section, then unarchive the Section → the item **stays archived** because its own flag is still `archived`. No memory needed; the item's own flag *is* the memory.

## Decisions (locked)

- **D1**: One `status` flag per entity: `active | archived | deleted`. Every action is a transition of it.
- **D2**: Visibility is derived from `own.status` + `parent.status`. No separate cascade tracking.
- **D3**: Archive = `active→archived`; Unarchive = `archived→active`; Delete = `archived→deleted`.
- **D4**: Delete is reachable only from the Archive view (must archive before deleting). Delete confirms; archive/unarchive do not.
- **D5**: Archive view is **grouped** — archived Sections as blocks (with their items), archived orphan Items listed with origin-section label. Search available within the archive.
- **D6**: Only Sections + Items have a status flag. No board-level archive.
- **D7 (restore position)**: A restored Section appends to the **bottom of the board**; a restored Item appends to the **bottom of its parent Section**. Original ordinal not preserved.
- **D8**: `done` is independent of `status`. done = visible + complete; archived = hidden from board.

## Single remaining edge

- **E1**: Deleting a Section (`archived→deleted`) — what happens to items still parented to it? Pure single-flag leaves them as orphans with stale flags. Recommend: **cascade `deleted` to all its items** on section delete (cleanup), since a deleted section is unreachable anyway. _Confirm._
