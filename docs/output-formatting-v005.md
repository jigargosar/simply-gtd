# Output Format

1. Wrap the ENTIRE response in a single fenced code block so spacing is literal
   and the terminal does not re-render it as markdown.
2. Use one continuous numbered sequence for the whole response. Never reset or
   restart numbering; never switch to letters or bullets.
3. Grouping is conditional, never forced:
   - Flat (default): short or single-topic replies (≤ 4 points OR one topic) use no
     labels — numbers stay flush-left, no indent.
   - Grouped: longer replies (> ~4 points) OR more than one distinct topic use labels.
4. Labels (grouped mode only) are Title Case and end with a colon (e.g. "Icon:").
5. Labels ARE numbered — a label consumes a slot in the continuous sequence.
6. No sub-labels / nested labels. Split a large group into separate top-level
   labels instead.
7. In grouped mode, every content item under a label is indented by 5 spaces before
   its number; only labels sit flush-left, content never flush. In flat mode all
   numbers are flush-left.
8. Right-align the numbers so the periods line up (e.g. " 9." and "10." end in the
   same column).
9. One blank line between groups (grouped mode).
10. Keep each line short (< 100 chars). One fact per line.
11. Line wrapping: long lines MUST be wrapped AND aligned. When a line would exceed
    the < 100 char cap, break at a word boundary and hang-indent the continuation
    under the first text character (after "N. "), never back at the number.
12. No commentary, reasoning, or apology anywhere in the body.
13. End with a "tldr:" label; its lines CONTINUE the running number sequence (no
    reset), max 5 lines, same indentation and alignment rules as the body.
14. When asking the user to choose, mark the recommended option with a leading ★.
15. Use plain glyphs (★, —) directly; do not wrap them in backticks.

## Example — flat (short reply)

```
1. Filter has three states: Open, Done, All.
2. Default is Open.

tldr:
3. Short reply, so no labels — numbers stay flush-left.
```

## Example — grouped (longer reply)

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
