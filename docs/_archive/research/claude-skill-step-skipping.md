## Why steps in a skill get skipped

1. Skipping is real and confirmed by Anthropic's own docs: their workflow guidance exists specifically to "prevent Claude from skipping critical validation." [1]
2. Cause — invisible steps. Any step that produces no visible output (verify, lint, re-read) is the first to be dropped; output looks complete, process wasn't. [2][5]
3. Cause — task-completion bias. Given a direct multi-step task, the model favors reaching the end result over honoring per-step process rules. [4]
4. Cause — attention dilution. Later instructions get less attention than earlier ones; longer skill body = lower compliance per step. [3][6]
5. Cause — instruction budget. Frontier models reliably hold ~150–200 instructions; every extra rule equally dilutes all others. [3]
6. Cause — over-length skill. Anthropic caps SKILL.md at <500 lines; past that, clarity and step-adherence degrade. [1]
7. Cause — nested references. Steps in files linked >1 level deep get partially read (`head -100`) and silently truncated. [1]
8. Cause — training bias toward simple instructions; complex nested step sequences are under-represented, so models default to skipping them. [6]
9. Cause — ambiguous/soft phrasing ("always", "should") is weaker than imperative ("MUST"), and conflicting rules trigger omission. [6][1]

## Fixes that target step-skipping

10. Make every step emit visible output — rewrite silent steps so completion is observable. [2][5]
11. Use a copy-able checklist in the skill; Claude checks items off as it goes — Anthropic's explicit anti-skip pattern. [1]
12. Add a feedback loop: run validator → fix → repeat → "only proceed when validation passes." [1]
13. Keep SKILL.md lean and <500 lines; push detail into one-level-deep reference files. [1]
14. Put process rules in the user turn, not only the skill — "don't skip steps" works better there per Anthropic testing. [2]
15. Strengthen phrasing for critical steps ("MUST"), make rules prominent, not buried. [1]
16. Anti-bias caveat: this is partly inherent LLM behavior, not purely a bug — issue #18454 was closed "not planned," so authoring/workflow design is the lever, not waiting for a fix. [4]

## Sources

- [1] [Anthropic — Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [2] [Marc Bara — Claude Skills Have Two Reliability Problems](https://medium.com/@marc.bara.iniesta/claude-skills-have-two-reliability-problems-not-one-299401842ca8)
- [3] [Your CLAUDE.md Is Doing Too Much](https://rahuulmiishra.medium.com/your-claude-md-is-doing-too-much-heres-how-to-fix-it-2cc495ed3599)
- [4] [claude-code issue #18454 — ignores CLAUDE.md/Skills in multi-step tasks](https://github.com/anthropics/claude-code/issues/18454)
- [5] [Claude Skills Not Working? 5 Fixes](https://buildtolaunch.substack.com/p/claude-skills-not-working-fix)
- [6] [Unite.AI — Why LLMs Skip Instructions (SIFo benchmark)](https://www.unite.ai/why-large-language-models-skip-instructions-and-how-to-address-the-issue/)

tldr

- Steps get skipped from: invisible/no-output steps, task-completion bias, attention dilution, instruction overload, over-length skills, deep nesting.
- Anthropic confirms it and gives the fixes: visible-output steps, copy-able checklists, validate-loops, <500-line lean skills, MUST phrasing, rules in the user turn.
- It's partly inherent LLM behavior (bug closed "not planned"), so skill authoring is the real lever.
