# Search (working draft)

> Scope: the header search box — what it matches, what it covers, and what clicking a result does.
> Hub: [`roadmap.md`](./roadmap.md). Sibling specs: [`persistence.md`](./persistence.md), [`interaction.md`](./interaction.md), [`item-state.md`](./item-state.md).

## Decisions (locked)

- **S1 — Scope**: search matches **item text and section titles**. Resolves roadmap Q-search-scope. A section-title hit and an item-text hit can both appear in the same flat dropdown.
- **S2 — Corpus**: **no scope restriction**. Any match is shown regardless of state — archived entities included. Archived hits sit **inline in the same ranked list**, each tagged with an **archived badge** (C2). The Archive view keeps its own search (item-state.md D5); the header search is the unrestricted one.
- **S3 — Result click**: a **main-view** hit **scrolls to and highlights** the entity on the main view. An **archived** hit instead **opens the Archive view and highlights** it there (C1).
- **S4 — Match style**: **case-insensitive substring** match. No fuzzy/token matching (consistent with roadmap #5 "simple text search").

## Resolved

- **C1** → archived result click: opens the Archive view and highlights there (folded into S3).
- **C2** → archived-hit presentation: shown inline in the ranked list with an archived badge (folded into S2).
- **C3** → match style: case-insensitive substring, no token/fuzzy (folded into S4).
