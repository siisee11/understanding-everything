# Learning and interaction design

Design a guided discovery, not a dashboard or illustrated summary.

## Narrative architecture

Use four to seven sections. A useful default arc is:

1. Concrete situation, event, or user-visible outcome.
2. Prediction, comparison, ordering, or trace the learner can attempt.
3. Observable consequence with immediate plain-language feedback.
4. Concept name and minimum mechanism needed to explain the consequence.
5. Changed case that tests whether the learner can transfer the idea.
6. Boundary condition, optional depth, and practical meaning.

Keep one idea per section. Introduce vocabulary only when the learner needs it.
Put a short statement before each interaction explaining what to change and
what to watch. Put the takeaway immediately after it.

Do not force a quiz where prediction would be artificial. For a code path,
let the learner advance an event through concrete components; for a historical
or policy mechanism, let the learner order causes or compare outcomes. The
required property is active anticipation followed by visible evidence, not a
particular control type.

## Interaction contract

For every interaction specify:

- Learner action.
- Visible response.
- Intended insight.
- Initial state and meaningful extremes.
- Textual equivalent for learners who cannot use or perceive the visual.
- Plain-language feedback that states what changed and why without requiring
  the newly introduced term.

Reject decorative motion, arbitrary scores, fake precision, and controls that
do not change the explanation. Two excellent interactions are better than five
weak ones.

## Choose the medium

- Semantic HTML and CSS: tokens, text choices, cards, tables, controls,
  timelines, and discrete states.
- SVG: labeled relationships, geometry, networks, and inspectable diagrams.
- Canvas: dense particles, continuous fields, or simulations where DOM/SVG is
  impractical. Provide an accessible name and text alternative.
- Simple formulas: show only the terms the learner is manipulating and update
  the substituted values alongside the visual.

Use native buttons, ranges, checkboxes, radios, and selects. Make the default
state informative and keep reset behavior deterministic. Avoid hidden hover-only
content and endless animation.

## Visual restraint

Let one dominant model or walkthrough carry the page. Follow the required
editorial UI contract linked from SKILL.md: prose stays in one narrow reading
column; each numbered step has one muted goal callout; and the interaction sits
directly beside the explanation it tests. Do not surround paragraphs with
cards, create unrelated KPI tiles, use an oversized marketing hero, or imitate
a monitoring dashboard. Preserve labels and units near the marks they explain.

Write in the user's language. Define jargon with an example before relying on
it. Clearly label educational simplifications, assumed inputs, and model limits.
