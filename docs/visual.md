# Visual Design (working draft)

> Scope: the finished look — style direction, theme, layout, color, type, density, affordances.
> Hub: [`roadmap.md`](./roadmap.md). Sibling specs: [`interaction.md`](./interaction.md), [`persistence.md`](./persistence.md), [`search.md`](./search.md), [`item-state.md`](./item-state.md).
> Mockups: `docs/mockups/board-vNNN.html` (latest = current). Serve via `pnpx serve docs/mockups`.

## Skills — load before UI / mockup / Foldkit work

| # | Skill | Role |
|---|-------|------|
| 1 | `frontend-design` | Aesthetic direction — distinctive, intentional, non-templated. |
| 2 | `frontend-baseline` | The floor — contrast, hierarchy, target sizes, overflow, states. Must clear it. |
| 3 | `ui-ux-pro-max` | Library — 50+ styles, 161 palettes, 57 font pairings, 99 UX guidelines. |
| 4 | `foldkit-skills:foldkit` | Framing + canonical conventions; points at the vendored subtree. |
| 5 | `foldkit-skills:audit-program` | Audit for anti-patterns, a11y gaps, quality regressions. |

These hold the rules; do not duplicate their content here — record only project picks below.

## Decisions (locked)

- **V1 — Section style**: **soft cards** — each Section is a card with a 1px border, subtle shadow, rounded corners (~10px). Chosen over flat after side-by-side comparison.
- **V2 — Theme**: **light only**. Single palette.
- **V3 — Layout**: **single centered column**, max-width ~680px. Matches the "vertical stack of sections" concept; controlled line length for readability.
- **V4 — Done-filter control**: **segmented control** `[Open | Done | All]` in the header; active segment highlighted. All states visible at once.
- **V5 — Accent color (dodger blue, two shades)**: bright `#1e90ff` only for graphical fills — checkbox, active-filter tint, hover — clears the 3:1 component floor (3.24:1 on white). Darkened `#0b6bcb` for **text links, `+ add` text, and primary button fill** — clears AA text (5.27:1 on white); bright dodger fails AA for small text. Same hue. Verified against `frontend-baseline`.
- **V6 — Typography**: **Inter**, single family (variable font, self-hosted). Chosen for small-size UI legibility (tall x-height, disambiguated `Il1`); no display pairing.
- **V7 — Density**: **comfortable** (~8px item padding — step on the V9 scale); roomy rows, touch-friendly.
- **V8 — Drag affordance**: **explicit grip handle** (⠿/⋮⋮) on each item and section header for reordering; separates drag from click-to-open-popover.
- **V9 — Spacing**: 4px base scale (4/8/12/16/24/32). Padding only — no `margin` except `auto` for centering.
- **V10 — Focus ring**: 2px solid `#0b6bcb` with 2px offset; on every interactive element, distinct from rest/hover.
- **V11 — Icons**: Lucide (line set; pairs with Inter).
- **V12 — Hit targets**: every interactive element ≥24×24px (goal 44×44); selected/hover states inset + rounded, never edge-to-edge bands.

## Open / to confirm

- Exact shadow values (elevation steps) and the tonal surface scale.
- Foldkit components to standardize on — to be listed after scanning `repos/foldkit/`. Canonical usage example already in `src/main.ts`: `import { Button } from '@foldkit/ui'`, used via `Button.view({ onClick, toView })`.

## Mock — resume notes

Mock: `docs/board-mock.html` — data-driven from a `board` object.
Serve: `pnpx serve docs -l 4178`. (In `docs/`, not off-limits `docs/mockups/`.)

### Verified
Header (title·search·controls); soft cards; single column; rows (checkbox·text·grip,
grips always-on, right-aligned with section grips); move-picker list.

### Applied — re-screenshot to confirm
Add buttons right; inline edit no-shadow (in-flow); data-driven rewrite (8 sections);
states gallery (footer "N filtered" + all-filtered, 3 filter states, archive view).

### Unconfirmed — decide on return
Move-picker design (→ interaction.md I11?); floating menus keep shadow vs inline edit
none; move-picker alignment + width.
