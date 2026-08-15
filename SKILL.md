---
name: create-interactive-explainer
description: Research, scope, build, and verify a self-contained interactive learning page from an open-ended question, unfamiliar topic, URL, article, paper, document, GitHub repository, or local codebase. Use when the user wants to understand something through a visual walkthrough, simulator, stepper, adjustable model, or interactive explainer instead of ordinary prose. Narrow broad requests with one focused question at a time; use a domain-independent discovery-first plain-language sequence; investigate claims or real code; cite evidence; distinguish simplification from fact; and test the HTML for behavior, responsiveness, and accessibility. Follow the bundled declaude.org/watermarking-inspired editorial UI unless the user requests another visual system. Do not use for short explanations, static marketing sites, monitoring dashboards, or changes to an existing product page unless the user explicitly asks for an explainer artifact.
---

# Create Interactive Explainer

Turn curiosity into a small learning environment. Treat research, editorial
selection, interaction design, implementation, and verification as one
workflow. Do not merely decorate a prose article or summarize a repository.

## Route the request

1. Read [scope-and-routing.md](references/scope-and-routing.md).
2. Classify the evidence input:
   - Topic or question only: read [topic-research.md](references/topic-research.md).
   - Supplied URL, article, paper, transcript, or document: read
     [source-intake.md](references/source-intake.md).
   - GitHub URL, repository, or source files: read
     [codebase-investigation.md](references/codebase-investigation.md).
   - Mixed input: read every applicable intake reference and name the evidence
     hierarchy before drafting.
3. Ask a scope question only when the request fails the scope test. Ask one
   concise question at a time and offer a recommended option. Do not ask about
   visual taste, framework choice, filenames, or other decisions that can be
   made safely from context.

## Establish the learning contract

Before building, write a private working brief containing:

- Audience and assumed prerequisite knowledge.
- Words and concepts the learner can already be expected to know.
- One-sentence learning objective.
- The spine: the single causal path, mechanism, or mental model the page tracks.
- In-scope concepts and explicit out-of-scope branches.
- The first concrete situation, observable event, or user action that makes the
  core question matter before terminology is introduced.
- One prediction or comparison the learner can make before seeing the answer.
- The vocabulary budget for each step and the optional advanced branch.
- Evidence sources and freshness requirements.
- Two to five proposed interactions.

For each proposed interaction, answer all three questions:

1. What does the learner change or do?
2. What visibly changes in response?
3. What relationship or insight should the learner discover?

Remove any interaction that cannot answer all three. Read
[learning-and-interaction-design.md](references/learning-and-interaction-design.md)
before storyboarding or implementation.

Read [discovery-first-explanation.md](references/discovery-first-explanation.md)
before drafting. Use its domain-independent sequence: create a concrete need,
invite a prediction or trace, reveal an observable consequence, name the concept
only after the learner has a use for it, and verify transfer with a changed
case. Keep a short beginner path independently complete; place formalism,
implementation detail, exceptions, and specialist vocabulary behind optional
depth unless the inferred audience already knows the prerequisites.

Read [declaude-editorial-style.md](references/declaude-editorial-style.md)
before implementation. Treat it as a required UI contract, not a mood-board:
use the narrow editorial column, numbered step rhythm, one-idea callouts, bordered
experiment figures, and restrained control treatment defined there. Depart from
that system only when the user explicitly asks for another style or when a
content-specific visualization needs a documented accessibility exception.

## Investigate before explaining

- Read the supplied material or real implementation rather than relying on
  memory or names.
- Use current web research for time-sensitive, high-stakes, or unfamiliar
  claims. Prefer primary sources and official documentation.
- Treat provided articles as narrative leads, not automatic ground truth.
- For code, resolve the branch and commit, trace actual entry points and call
  paths, and anchor claims to file and line evidence.
- Keep research read-only unless the user separately requests product or
  repository changes.

## Build the page

1. Design four to seven short sections, each teaching one idea. Follow the
   discovery-first sequence rather than definition-first exposition. Make the
   core path understandable without opening advanced details.
2. Prefer semantic HTML for words, tokens, controls, tables, and discrete
   states; SVG for inspectable relationships and diagrams; Canvas only for
   dense or continuous simulations. Never use Canvas merely for appearance.
3. Copy [explainer-template.html](assets/explainer-template.html) as the
   starting point. Preserve its `declaude-editorial-v1` marker and design tokens.
   Replace every placeholder and remove unused example blocks. Do not replace
   the narrow editorial layout with a wide dashboard, oversized marketing hero,
   card grid, glassmorphism, or decorative gradient treatment.
4. Write original prose in the user's language. Use concrete actors, actions,
   states, and consequences before abstractions. Introduce a domain term only
   after its meaning is visible, define it in the same sentence, and do not use
   it as shorthand until the learner has encountered it. Paraphrase source
   material, quote sparingly, cite near factual claims without interrupting the
   first explanation, and end with a source list.
5. Keep inferred audience level, reading time, and generic labels such as
   `beginner`, `advanced`, or `educational simplification` out of the visible
   masthead unless the user requests them. Keep those planning assumptions
   private. State specific model assumptions or simplifications beside the
   explanation they qualify instead of using a generic page-level badge.
6. Make the first render useful before interaction. Preserve a readable
   explanation when JavaScript is unavailable.
7. Use a user-specified output location when given. Otherwise write to a
   durable, task-owned artifact directory outside a checked-out repository when
   available. If that is impossible, use an artifacts/interactive-explainers
   directory without modifying product source folders. Never overwrite an
   existing explainer without approval.

## Verify and deliver

1. Read [fact-checking.md](references/fact-checking.md) and resolve every
   unsupported or contradicted claim.
2. Run scripts/validate-explainer.mjs against the final HTML and fix every
   error. Treat warnings as review items, not automatic failures.
3. Read [browser-and-accessibility-qa.md](references/browser-and-accessibility-qa.md).
   When browser tooling is available, serve the page locally and exercise every
   interaction at desktop and narrow mobile widths, using keyboard input as
   well as pointer input. Fix console errors, overflow, stale states, and
   inaccessible controls.
4. Do not claim browser, accessibility, or visual verification that was not
   actually performed. State the precise limitation when a check is unavailable.
5. Deliver the absolute page path, the one-sentence learning objective, the
   principal sources or code revision, and any material limitations. Do not
   publish or deploy unless the user requests it.
