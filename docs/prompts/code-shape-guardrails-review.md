# Prompt — review the code-shape guardrails

Portable prompt to improve and discuss the `CLAUDE.md` "Code shape — human guardrails" rules. Paste into a fresh session or hand to another agent.

---

Help me improve these engineering guardrail rules, and discuss them directly with me — reasoning, tradeoffs, and pushback welcome. This is a conversation, not a silent rewrite.

WHAT THESE RULES ARE
Hard limits on code shape, written for humans. Guardrails against unreadable code and
against AI-generated code drifting past what a person can follow. Not style preferences.
They apply to every function in the codebase.

THE CODE THAT MOTIVATED THEM
src/preview-v001/main.ts — a Foldkit view. We extracted the button into
helloButtonView(greeting: string), and debated nesting depth, whole-Model vs narrow-slice
parameters, sibling symmetry, and whether extracting a tiny single-use function is
over-engineering. Read that file as the running example; refer to it directly.

CURRENT TEXT (improve this):

## Code shape — human guardrails (whole project, no exceptions)

Limits on what a person can hold in their head, not style. Apply to every function: view, update, command, helper, test.

- Keep nesting to ~3 levels. Deeper, extract a named function. A reader must see head and tail, know which bracket belongs to whom, and where a new argument would go.
- No exemptions for "small", "throwaway", or "just one function". Broken windows: one tolerated mess becomes the norm the whole project copies.
- Pass the slice a function uses, not the whole object (a field, not the whole Model). The signature is the honest dependency list; an unused parameter should lint. A whole-object parameter in a long body is a hidden global.
- At a composition point, keep every sibling call at one level of abstraction. If siblings are extracted, extract the small one too, so the parent reads as a list of named calls and their inputs.
- If a function is not scannable at a glance, extract until it is.

WHAT I WANT FROM YOU
- Improve the wording to pure signal: each rule's purpose and effect obvious in as few words as possible. Hard limits, not suggestions. Plain verbs, sentence case, no filler.
- Keep the five ideas (nesting cap + extract; no size exemptions / broken windows; narrow slices not whole objects; sibling calls at one abstraction level; extract until scannable).
- Discuss directly: where a rule is too strict, too vague, or missing, say so and argue it against the code in main.ts. Propose changes, don't just apply them.
