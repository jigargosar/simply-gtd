# Search (working draft)

> Scope: the header search box — what it matches, what it covers, and what clicking a result does.
> Hub: [`roadmap.md`](./roadmap.md). Sibling specs: [`persistence.md`](./persistence.md), [`interaction.md`](./interaction.md), [`item-state.md`](./item-state.md).

## Decisions (locked)

- **S1 — Scope**: search matches **item text and section titles**. Resolves roadmap Q-search-scope. A section-title hit and an item-text hit can both appear in the same flat dropdown.
- **S2 — Corpus**: **no scope restriction**. Any match is shown regardless of state — archived entities included — with archived hits **marked as archived** in the result. The Archive view keeps its own search (item-state.md D5); the header search is the unrestricted one.
- **S3 — Result click**: clicking a result **scrolls to and highlights** the entity on the main view.

## Open

- **C1 — archived result click**: S3 (scroll + highlight on the main view) cannot apply to an **archived** hit, which isn't on the main view. Its click behaviour is undefined — candidate: open the Archive view and highlight there.
- **C2 — archived-hit presentation**: whether the archived marker is just a label, or also groups/sorts archived hits separately in the dropdown, is undefined.
- **C3 — match style**: substring vs token/fuzzy matching is unspecified (roadmap #5 says "simple text search").
