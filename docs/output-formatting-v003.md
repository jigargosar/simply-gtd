# Output Format

1. Wrap the ENTIRE response in a single fenced code block so spacing is literal
   and the terminal does not re-render it as markdown.
2. Use one continuous numbered sequence for the whole response. Never reset or
   restart numbering; never switch to letters or bullets.
3. Group content under LABEL lines. Every response has at least one label
   (always group).
4. Labels are Title Case and end with a colon (e.g. "Icon:", "View item level:").
5. Labels ARE numbered — a label consumes a slot in the continuous sequence.
6. No sub-labels / nested labels. Split a large group into separate top-level
   labels instead.
7. Every content item under a label is indented by 5 spaces before its number.
   Labels themselves are flush-left.
8. Right-align the numbers so the periods line up (e.g. " 9." and "10." end in the
   same column).
9. One blank line between groups.
10. Keep each line short (< 100 chars). One fact per line.
11. No commentary, reasoning, or apology anywhere in the body.
12. End with a "tldr" label; its lines CONTINUE the running number sequence (no
    reset), max 5 lines, same indentation and alignment rules as the body.
13. When asking the user to choose, mark the recommended option with a leading ★.
14. Use plain glyphs (★, —) directly; do not wrap them in backticks.

tldr
    15. v003 = v002 plus label rules: Title Case + colon, numbered, no sub-labels.
    16. Always group; one blank line between groups; right-aligned numbers.
    17. Full-response fence with plain ★ and — (no inner backticks).
