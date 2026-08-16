---
name: understanding-everything
description: Research, scope, build, and verify a self-contained interactive learning page from an open-ended question, unfamiliar topic, URL, article, paper, document, GitHub repository, or local codebase. Use when the user wants a visual walkthrough, simulator, playable lesson, adjustable model, or interactive explainer instead of ordinary prose. Narrow broad requests with one focused question at a time; investigate claims or real code; cite evidence; distinguish simplification from fact; choose automatically among editorial-v1, simulation-essay-v1, and playable-post-v1; and test behavior, responsiveness, calculations, and accessibility. Do not use for short prose explanations, static marketing sites, monitoring dashboards, or changes to an existing product page unless the user explicitly requests an explainer artifact.
---

# Understanding Everything

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
   visual taste, framework choice, filenames, or safe implementation defaults.
4. Read [production-profiles.md](references/production-profiles.md) and choose
   one dominant profile. Honor a profile explicitly requested by the user.

## Establish the learning contract

Before building, write a private working brief containing:

- Audience and assumed prerequisite knowledge.
- One-sentence learning objective.
- The spine: the single causal path, mechanism, decision, or mental model.
- In-scope concepts and explicit out-of-scope branches.
- A concrete opening situation that matters before terminology appears.
- One prediction, trace, comparison, or playable goal.
- Vocabulary budget and optional depth.
- Evidence sources and freshness requirements.
- Chosen production profile and why it fits.
- Planned learner actions, visible responses, and intended discoveries.
- For a model-driven profile: state variables, invariants, assumptions, and
  deterministic reference cases.

For every interaction answer:

1. What does the learner change or do?
2. What visibly changes in response?
3. What relationship or insight becomes observable?
4. What equivalent text or control supports a learner who cannot use the visual?

Remove any interaction that cannot answer all four. Read
[learning-and-interaction-design.md](references/learning-and-interaction-design.md)
and [discovery-first-explanation.md](references/discovery-first-explanation.md)
before storyboarding.

## Apply the selected profile

- For `editorial-v1`, read
  [declaude-editorial-style.md](references/declaude-editorial-style.md) and start
  from [explainer-template.html](assets/explainer-template.html).
- For `simulation-essay-v1`, read
  [simulation-essay-profile.md](references/simulation-essay-profile.md) and
  [model-and-scene-engineering.md](references/model-and-scene-engineering.md),
  then start from
  [simulation-essay-template.html](assets/simulation-essay-template.html).
- For `playable-post-v1`, read
  [playable-post-profile.md](references/playable-post-profile.md) and
  [model-and-scene-engineering.md](references/model-and-scene-engineering.md),
  then start from [playable-post-template.html](assets/playable-post-template.html).

Treat benchmark pages as evidence of general techniques, not assets or layouts
to copy. Keep prose, visuals, code, characters, and interaction choreography
original to the topic.

## Investigate before explaining

- Read supplied material or the real implementation instead of relying on names.
- Use current web research for time-sensitive, high-stakes, or unfamiliar
  claims. Prefer primary sources and official documentation.
- Treat supplied articles as narrative leads, not automatic ground truth.
- For code, resolve branch and commit, trace actual entry points and call paths,
  and anchor claims to file and line evidence.
- Keep research read-only unless the user separately requests repository changes.

## Build the page

1. Follow the chosen profile's narrative unit: editorial steps, connected
   simulation scenes, or playable stages. Do not target a scene count for its
   own sake.
2. Prefer semantic HTML for text and discrete state; SVG for inspectable
   relationships; Canvas or WebGL only for dense, spatial, or continuous models.
3. Keep calculations and state transitions separate from rendering. A complex
   page may be developed as modules, but bundle the delivered artifact into a
   self-contained HTML file unless the user requests another packaging format.
4. Write original prose in the user's language. Use concrete actors, actions,
   states, and consequences before abstractions. Introduce a term only after its
   meaning is visible, cite important claims near their use, and end with sources.
5. Keep inferred audience, reading time, and generic labels such as `beginner`,
   `advanced`, or `educational simplification` out of the visible masthead unless
   requested. Put specific assumptions beside the model they qualify.
6. Make the first render useful before interaction and preserve a readable
   explanation when JavaScript is unavailable.
7. Use a user-specified output location. Otherwise use a durable task-owned
   artifact directory outside product source when available. Never overwrite an
   existing explainer without approval.

## Verify and deliver

1. Read [fact-checking.md](references/fact-checking.md) and resolve every
   unsupported or contradicted claim.
2. Run `scripts/validate-explainer.mjs` against the final HTML. It detects the
   `explainer-profile` marker and applies common plus profile-specific checks.
3. Read [browser-and-accessibility-qa.md](references/browser-and-accessibility-qa.md).
   Exercise every interaction at desktop and narrow mobile widths with pointer
   and keyboard input. Fix console errors, overflow, stale states, inaccessible
   controls, and broken representative or extreme states.
4. For simulations and playable models, independently verify formulas,
   invariants, seeded scenarios, and displayed reference values outside the
   rendering path.
5. Do not claim verification that was not performed. State exact limitations.
6. Deliver the absolute page path, selected profile, learning objective,
   principal sources or code revision, verification performed, and material
   limitations. Do not publish or deploy unless the user requests it.
