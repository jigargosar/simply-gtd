# CLAUDE.md

simply-gtd — a local-only "list-of-lists" GTD app. Foldkit (Effect + Elm architecture), single user, browser storage, no backend.

## Read first

- `AGENTS.md` — Foldkit conventions, patterns, and the quality bar. Authoritative; follow it.
- `docs/roadmap.md` — product spec hub: concept, locked decisions, open questions.
- `docs/item-state.md` — two-axis item-state model (D1–D10): `archived` + `done`, delete-as-removal. E1 resolved.
- `repos/foldkit/` — vendored framework subtree; canonical reference. Read-only, never import from it (import from `foldkit`).
- `docs/handover.md` — current implementation status and next steps. Read at the start of each session; update it at the end.

## Model in one line

Board → Sections (titled) → Items (text + done + timestamps). Each entity carries two orthogonal axes — `archived/not-archived` and `done/not-done` (no "active"); delete removes the record (no `deleted` state); visibility derived from own + parent `archived`.

## Commands

- `pnpm dev` — Vite dev server
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm test` — vitest
- `pnpm lint` — oxlint
- `pnpm format` — prettier

## Rules

- pnpm only. TypeScript strict — no `any`, no `as`, no `!`, no `@ts-ignore`.
- Stay inside Foldkit/Effect; no React, no escape hatches, no two-way binding.
- Model fields are Schema types. Immutable updates via `evo()` — never spread.
- Messages are facts, never commands; never `NoOp`.
