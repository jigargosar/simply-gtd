# CLAUDE.md

simply-gtd — a local-only "list-of-lists" GTD app. Foldkit (Effect + Elm architecture), single user, browser storage, no backend.

## Read first

- `AGENTS.md` — Foldkit conventions, patterns, and the quality bar. Authoritative; follow it.
- `docs/roadmap.md` — product spec hub: concept, locked decisions, open questions.
- `docs/archive-specs.md` — single-flag archive model (D1–D8); open edge **E1**.
- `repos/foldkit/` — vendored framework subtree; canonical reference. Read-only, never import from it (import from `foldkit`).

## Model in one line

Board → Sections (titled) → Items (text + done + timestamps). Removal is a single `status` flag per entity: `active | archived | deleted`; visibility derived from own + parent flag.

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
