# Learning and interaction design

Design guided discovery, not a dashboard, illustrated summary, or collection of
unrelated widgets.

## Common discovery arc

A useful profile-independent arc is:

1. Concrete situation, event, goal, or user-visible outcome.
2. Prediction, comparison, trace, or action the learner can attempt.
3. Observable consequence with immediate plain-language feedback.
4. Minimum mechanism needed to explain the consequence.
5. Formal name introduced as shorthand for what is already visible.
6. Changed case that tests transfer.
7. Boundary condition, model limitation, and practical meaning.

Keep one conceptual jump per narrative unit. Put a short instruction before an
interaction explaining what to change and what to watch. Put the causal takeaway
immediately after it. Let the selected production profile decide whether the
narrative unit is an editorial step, connected scene, or playable stage.

Do not force a quiz where prediction would be artificial. For a code path, let
the learner advance an event through real components. For a historical or policy
mechanism, compare plausible choices and consequences without pretending the
model is deterministic. Active anticipation followed by visible evidence is the
requirement, not a particular control type.

## Interaction contract

For every interaction specify:

- Learner action.
- Visible response.
- Intended insight.
- Initial state, meaningful intermediate cases, and extremes.
- Reset or replay behavior.
- Textual and keyboard equivalent.
- Plain-language feedback stating what changed and why.
- State intentionally carried into the next unit, if any.

Reject decorative motion, arbitrary scores, fake precision, and controls that do
not change the explanation. One coherent model is better than several unrelated
widgets. Two excellent interactions are better than five weak ones.

## Choose the medium

- Semantic HTML and CSS: text choices, tables, controls, timelines, and discrete
  states.
- SVG: labeled relationships, geometry, networks, direct manipulation, and
  inspectable diagrams.
- Canvas or WebGL: dense agents, continuous fields, spatial scenes, or simulations
  where DOM and SVG are impractical. Provide an accessible name and text
  alternative.
- Simple formulas: show only manipulated terms and update substituted values
  alongside the visual.

Prefer native buttons, ranges, checkboxes, radios, and selects. A custom visual
handle must have a synchronized native or keyboard-operable equivalent. Make the
default state informative and resets deterministic. Avoid hover-only content and
endless ambient animation.

## Visual coherence

Let one dominant model, walkthrough, or playable rule carry the page. Reuse
semantic colors, shapes, actors, units, and state meanings. Preserve labels near
the marks they explain. Avoid unrelated cards, KPI grids, oversized marketing
heroes, generic glass effects, or dashboard chrome unless the subject itself is
a dashboard.

Write in the user's language. Define jargon with an example before relying on
it. State specific assumptions and model limits beside the affected scene; do
not replace them with a generic page-level difficulty or simplification badge.
