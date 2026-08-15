# playable-post-v1 profile

Use this profile when learner action, challenge, replay, and consequence are the
primary explanatory medium. Benchmark the general progression of playable posts
such as <https://ncase.me/polygons/> and scenario labs such as
<https://ncase.me/covid-19/> without copying their characters, prose, code,
assets, exact layout, or visual identity.

## Playable progression

Build a coherent progression rather than a collection of minigames:

1. Present a concrete goal or surprising situation.
2. Let the learner perform the core rule manually.
3. Give immediate causal feedback, not a score alone.
4. Automate the same rule only after it has been experienced.
5. Expose one meaningful parameter or policy lever at a time.
6. Preserve a history trail, comparison, or outcome metric.
7. Offer repeatable preset scenarios when comparison matters.
8. End with a constrained sandbox or changed transfer challenge.
9. Debrief what the model demonstrates and what it cannot demonstrate.

Combine stages when the topic is small, but preserve manual experience before
automation and guided play before unrestricted exploration.

## Stage contract

For every stage record privately:

- Goal and learner action.
- Available and intentionally locked controls.
- Immediate visible consequence.
- Success, failure, or completion condition.
- Plain-language feedback explaining the causal result.
- State retained or reset before the next stage.
- Outcome metric or history that matters.

Use original characters or abstractions suited to the topic. Do not add
gamification points, celebration, or failure states unless they teach the model.

## Reproducibility and safety

- Separate the model, renderer, interaction controller, stages, presets, and
  history recorder during development.
- Use a deterministic seed for stochastic models and expose replayable presets.
- Reset must restore the same declared initial state.
- Validate multiple seeds or sensitivity cases before making a general claim.
- For health, finance, policy, and social systems, label toy-model assumptions,
  uncertainty, omitted mechanisms, and non-prescriptive boundaries beside the
  relevant stage.

## Acceptance gate

- Manual, automated, and sandbox or transfer stages are all present.
- A learner action causes immediate visual and textual feedback.
- Reset, replay, pause, speed, and presets work whenever the model uses them.
- Outcome history is meaningful and not an arbitrary score.
- Correct and incorrect paths both explain what happened.
- Pointer, touch, and keyboard paths reach the same learning states.
- The final debrief separates the observed model behavior from real-world claims.
