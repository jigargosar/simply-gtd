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
- Board mockup lives at `docs/mockups/board-mock.html`.
- Never read, list, or search `docs/_archive/`.
- NEVER use worktrees. Do not call EnterWorktree; work in the shared checkout. Banned until the user explicitly lifts this.

## Code shape — human guardrails (whole project, no exceptions)

Limits on what a person can hold in their head, not style. Apply to every function: view, update, command, helper, test.

- Keep nesting to ~3 levels. Deeper, extract a named function. A reader must see head and tail, know which bracket belongs to whom, and where a new argument would go.
- No exemptions for "small", "throwaway", or "just one function". Broken windows: one tolerated mess becomes the norm the whole project copies.
- Pass the slice a function uses, not the whole object (a field, not the whole `Model`). The signature is the honest dependency list; an unused parameter should lint. A whole-object parameter in a long body is a hidden global.
- At a composition point, keep every sibling call at one level of abstraction. If siblings are extracted, extract the small one too, so the parent reads as a list of named calls and their inputs.
- If a function is not scannable at a glance, extract until it is.
