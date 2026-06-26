# Visual Design (working draft)

> Scope: the finished look — style direction, theme, layout, color, type, density, affordances.
> Hub: [`roadmap.md`](./roadmap.md). Sibling specs: [`interaction.md`](./interaction.md), [`persistence.md`](./persistence.md), [`search.md`](./search.md), [`item-state.md`](./item-state.md).
> Mockups: `docs/mockups/board-vNNN.html` (latest = current). Serve via `pnpx serve docs/mockups`.

## Decisions (locked)

- **V1 — Section style**: **soft cards** — each Section is a card with a 1px border, subtle shadow, rounded corners (~10px). Chosen over flat after side-by-side comparison.
- **V2 — Theme**: **light only**. Single palette.
- **V3 — Layout**: **single centered column**, max-width ~680px. Matches the "vertical stack of sections" concept; controlled line length for readability.
- **V4 — Done-filter control**: **segmented control** `[Open | Done | All]` in the header; active segment highlighted. All states visible at once.
- **V5 — Accent color**: **dodger blue** `#1e90ff` as the brand accent (active-filter tint, hover, checkbox fill). A darkened variant `#0b6bcb` is used for **text links, the `+ add` text, and the primary button fill** to meet WCAG AA contrast (bright dodger blue fails AA for small text / white-on-fill). Same hue family.
- **V6 — Typography**: **Inter**, single family (variable font, self-hosted). Chosen for small-size UI legibility (tall x-height, disambiguated `Il1`); no display pairing.
- **V7 — Density**: **comfortable** (~8px item padding); roomy rows, touch-friendly.
- **V8 — Drag affordance**: **explicit grip handle** (⠿/⋮⋮) on each item and section header for reordering; separates drag from click-to-open-popover.

## Open / to confirm

- **V5-confirm**: the bright-vs-darkened dodger split is a contrast workaround — confirm the darkened `#0b6bcb` reads acceptably as the link/`+add`/button color.
- Spacing scale, exact shadow values, focus-ring style, and icon set are not yet specified.
