# Discovery-first explanation contract

Apply this contract across domains. It governs the learner's cognitive sequence,
not the topic, terminology, visual metaphor, or interaction type.

## Start from the learner's world

Begin with something the learner can observe, choose, compare, or trace without
knowing the target concept. Use concrete actors, objects, actions, states,
inputs, and consequences. Do not begin with a definition, taxonomy, thesis
summary, architecture noun, formula, or list of terms.

The opening must answer, in ordinary language:

- What is happening?
- Why might the learner care or be surprised?
- What can the learner try or predict next?

If the opening contains a necessary domain term, replace it with a concrete
description first. Introduce the term later as a convenient name for something
the learner has already seen.

## Use the discovery loop

For each core idea, design this loop:

1. **Need:** Present a concrete situation that creates a question.
2. **Anticipate:** Ask the learner to predict, choose, order, compare, or advance
   the next state. Do not grade prior knowledge.
3. **Reveal:** Show the consequence immediately and keep the evidence visible.
4. **Explain:** State what changed and why in ordinary language.
5. **Name:** Introduce the formal term as shorthand for the observed pattern.
6. **Transfer:** Change one meaningful feature and let the learner apply the
   same idea again.

Combine or omit a stage when the content makes it artificial, but preserve the
order: experience and consequence before abstraction.

## Control cognitive load

- Make one conceptual jump per step.
- Default to one new essential term per step. Group two only when separating
  them would distort the mechanism.
- Reuse the same concrete situation until the core relationship is stable.
- Do not make the learner manipulate more than one new variable at first.
- Put formulas, implementation internals, edge cases, exhaustive taxonomies,
  and specialist vocabulary behind optional depth for novice audiences.
- Make the beginner core reach a useful conclusion without opening optional
  material.
- Keep citations close to supported claims but outside the sentence where the
  learner first encounters an idea.

## Translate abstraction into evidence

For every abstract statement, provide an observable counterpart. Depending on
the domain, this may be a changed value, reordered event, highlighted code path,
before-and-after state, competing choice, visible constraint, or concrete
outcome. If the learner cannot point to what changed, the explanation is still
too abstract.

Do not rely on an analogy alone. Use it to establish intuition, then state where
the real mechanism matches and where the analogy stops.

## Adapt without changing the contract

- Topic or concept: manipulate a causal input, compare cases, or reveal a hidden
  mechanism.
- Supplied article or paper: turn its central claim into a question the learner
  can test against evidence; do not merely animate the article's outline.
- Repository or feature: start from a user action or external input, then let
  the learner trace concrete state and boundaries before naming abstractions.
- Historical, social, or policy mechanism: compare plausible choices, order
  causes, or inspect consequences without pretending the model is deterministic.

Use content-specific representations while preserving need, anticipation,
evidence, explanation, naming, and transfer.

## Cold-reader gate

Before implementation and again after browser QA, verify:

- A learner with the stated prerequisites can understand the opening without a
  glossary.
- The first interaction is meaningful before the formal term appears.
- Each step's takeaway can be stated without newly introduced jargon.
- Optional depth can be skipped without breaking the core explanation.
- The transfer case changes the surface details while preserving the mechanism.
- A wrong prediction receives explanatory feedback rather than a score alone.

If any check fails, rewrite the narrative before polishing the visual design.
