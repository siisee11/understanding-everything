# Model and scene engineering

Read this reference for `simulation-essay-v1` and `playable-post-v1`.

## Separate responsibilities

Develop complex pages with these logical boundaries even when the final file is
bundled into one HTML document:

- Model: pure state transitions, formulas, constraints, and seeded randomness.
- Scenario: declared initial states, representative cases, and recordings.
- Renderer: SVG, Canvas, WebGL, DOM, labels, and layout only.
- Interaction controller: pointer, touch, keyboard, native control, and focus.
- Scene or stage controller: what becomes available and what state carries on.
- Narration: live text, instructions, takeaways, and text alternatives.

Do not make rendered pixels or labels the only source of model truth.

## Model specification

Before coding, record:

- State variables with units and valid ranges.
- Derived values and formulas.
- Invariants that must remain fixed under each learner action.
- Assumptions, omissions, and known failure boundaries.
- Initial, representative, intermediate, and extreme reference states.
- Whether randomness exists and how its seed is stored and reset.
- Which claims each visible output is allowed to support.

Implement a pure calculation or transition layer and test it independently from
the renderer. For stochastic models, verify distributions or multiple seeds;
never treat one visually striking run as evidence of a general relationship.

## Interaction synchronization

- Derive every visual and textual output from one current state.
- Keep direct-manipulation handles synchronized with native controls.
- Restore focus after rerendering an SVG or replacing DOM.
- Clamp invalid values and make units visible near inputs and outputs.
- Make reset deterministic and replay independent of previous runs.
- Do not allow hidden stale state to survive between scenes or stages unless the
  storyboard explicitly carries it forward.

## Rendering and performance

- Use device-pixel-ratio-aware Canvas sizing and crisp SVG text.
- Render only while state or time changes. Pause offscreen work.
- Avoid allocations inside hot animation loops when practical.
- Recompose dense layouts at narrow breakpoints instead of shrinking labels.
- Keep touch targets usable and prevent a drag from trapping page scroll.
- Provide a text description of the current state and important changes.

## Independent verification

Write an oracle outside the render path for formulas and deterministic
transitions. Test reference values, monotonic relationships, conservation or
other invariants, boundary cases, reset, and seed reproducibility. Compare every
displayed example number with the oracle after content edits.
