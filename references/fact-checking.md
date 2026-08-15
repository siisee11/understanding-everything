# Fact checking

The page is complete only when every checkable claim is supported or clearly
framed as a model, simplification, or inference.

## Claim ledger

Extract factual, numeric, historical, causal, comparative, legal, product, and
implementation claims from prose, labels, captions, formulas, defaults, and
tooltips. Assign one status:

- Supported: a source passage, data record, or real code directly supports it.
- Simplified: evidence supports the underlying relationship, and the page
  visibly labels the educational simplification.
- Inference: evidence supports the premises, and the page labels the conclusion
  as an inference.
- Needs source: plausible but not verified.
- Unsupported: no source supports it.
- Contradicted: a source or implementation shows otherwise.

Only supported, simplified, and inference may ship. Resolve every other status
by finding evidence, correcting the claim, softening it honestly, or removing
it. Re-run the ledger after edits.

## Evidence standards

- Read the source passage; do not count a search result, citation title, or URL
  as support.
- Put citations close to important claims and include a final source list.
- Preserve dates, units, jurisdictions, sample definitions, and model versions
  that affect interpretation.
- For code, verify snippets and behavior against the recorded commit and cite
  repository-relative paths and lines.
- For simulations, verify formulas, defaults, boundary cases, and displayed
  numbers independently of the animation code.
- For stochastic or agent-based models, record the random seed, verify multiple
  seeds or sensitivity cases, and do not generalize from one run.
- For playable stages, distinguish behavior demonstrated inside the declared
  toy model from claims about real people, markets, health, or policy.
- If credible sources disagree, show the disagreement and its consequence.

Do not use the page's own generated output as evidence that its explanation is
correct.
