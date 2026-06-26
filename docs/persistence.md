# Persistence & Data Model (working draft)

> Scope: how the board is stored, identified, ordered, and saved. Implementation-leaning, but decisions only — not code.
> Hub: [`roadmap.md`](./roadmap.md). Sibling specs: [`search.md`](./search.md), [`interaction.md`](./interaction.md), [`item-state.md`](./item-state.md).

## Decisions (locked)

- **P1 — Backend**: `localStorage`. Synchronous, ~5MB, holds thousands of items at this scale. No IndexedDB, no backend, no sync (consistent with roadmap #2/#3).
- **P2 — Storage shape**: the whole board is one JSON blob under a single key. Load once into the model; persist the whole model on change. No per-entity keys — the single in-memory model is the source of truth, so partial writes buy nothing.
- **P3 — Identity**: every entity (Section, Item) has an `id` from `Effect.uuid`. Stable across insert/delete/reorder; used for popover targeting, parent references, and keyed view diffing. Never reused, never derived from position.
- **P4 — Ordering**: position is a string `order` field using **fractional indexing** (base-62 midpoint keys, via a proper library — Figma/Linear style). Sort entities by `order`. Insert/reorder computes one key between two neighbours — O(1) per move, no array rewrites, no renumbering. Identity (`id`) and order (`order`) are separate fields; `order` may change, `id` never does.
- **P5 — Save trigger**: debounced autosave, ~300ms, via a persist Command after updates. Batches typing bursts into a single write. No explicit "save" action.

## Open / to verify

- **P4-lib**: the fractional-indexing library must pass the TS-strict bar (no `as`, no `any`, no `!`). Verify its types before adopting; if it can't, wrap or replace.
- **P5-pattern**: confirm Foldkit's debounce/cancellation idiom (likely `Effect.sleep` + command cancellation) against the subtree before wiring P5.

## Model sketch (informative, not locked)

Each entity carries: `id` (uuid), `order` (fractional string), the two state axes from [`item-state.md`](./item-state.md) (`archived`, `done`), created/modified timestamps (roadmap #6), plus `title` (Section) / `text` (Item). Model fields are Schema types per project rules.
