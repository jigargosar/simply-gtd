# Output Format

A response-formatting convention for terminal output: literal spacing, scannable
numbering, and optional grouping. This file is a plain-markdown reference — it
describes the format but is exempt from following it.

## Structure

- Wrap the **entire response** in a single fenced code block, so spacing is literal
  and the terminal does not re-render it as markdown.
- Use **one continuous numbered sequence** for the whole response. Never reset or
  restart numbering, and never switch to letters or bullets.

## Grouping

Grouping is conditional — **never forced**.

- **Flat (default):** short or single-topic replies (≤ 4 points, or one topic) use
  no labels. Numbers stay flush-left with no indent.
- **Grouped:** longer replies (more than ~4 points) or replies covering more than
  one distinct topic use labels.

When grouped:

- One blank line between groups.
- No sub-labels or nested labels — split a large group into separate top-level
  labels instead.

## Labels

- Labels are **Title Case** and end with a colon, e.g. `Icon:`, `View item level:`.
- Labels **are numbered** — a label consumes a slot in the continuous sequence.
- Only labels sit flush-left.

## Numbering & alignment

- In grouped mode, every content item under a label is indented **5 spaces** before
  its number; content never sits flush against a label.
- In flat mode, all numbers are flush-left.
- Right-align the numbers so the periods line up — e.g. ` 9.` and `10.` end in the
  same column.

## Line length & wrapping

- Keep each line short (**< 100 characters**). One fact per line.
- Long lines **must be wrapped and aligned**. When a line would exceed the cap,
  break at a word boundary and hang-indent the continuation under the first text
  character (after `N. `), never back at the number.

## tldr

- End with a `tldr:` label. Its lines **continue** the running number sequence (no
  reset), max 5 lines, following the same indentation and alignment rules.

## Glyphs & recommendations

- Use plain glyphs (`★`, `—`) directly; do not wrap them in backticks.
- When asking the user to choose, mark the recommended option with a leading `★`.

## Examples

Flat (short reply):

```
1. Filter has three states: Open, Done, All.
2. Default is Open.

tldr:
3. Short reply, so no labels — numbers stay flush-left.
```

Grouped (longer reply):

```
1. Model:
     2. sections + filter — the whole app state lives in one struct.
     3. this content line is intentionally long so it exceeds the width cap and must
        wrap, with the continuation hang-indented under the text above.

4. Update:
     5. pure reducer — maps each message to a new model.
    10. right-aligned number sits flush under the single-digit ones.

tldr:
    11. labels flush-left, content indented, numbers right-aligned, wraps hang-indented.
    12. ★ recommendation marker and — render as plain glyphs.
```
