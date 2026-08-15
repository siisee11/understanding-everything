# Production profiles

Choose one dominant production profile after scoping and before storyboarding.
The profile defines what leads the learning experience, not how ambitious or
polished the page should be. Research, discovery-first explanation, evidence,
plain language, accessibility, responsive behavior, and browser QA apply to all
profiles.

## Profile selection

### editorial-v1

Choose this when prose can carry the independently useful core and interactions
clarify discrete claims, comparisons, traces, or calculations. Use a calm narrow
reading column with four to seven short steps and one to three strong in-flow
figures. The figures may be interactive; this is not a static profile.

Typical fits include a focused concept introduction, a short repository call
path, an article-derived mechanism, or a comparison whose states are discrete.

### simulation-essay-v1

Choose this when several later ideas reuse the same spatial, temporal,
quantitative, or system model. The learner should manipulate or scrub that model
and watch connected representations update. Prose frames the question, but the
continuous model provides the evidence.

Choose it when at least two are true:

- Direct manipulation reveals a relationship hidden by prose.
- Multiple scenes reuse the same objects, state, or semantic colors.
- Time, geometry, accumulated state, or synchronized views matter.
- The model must be progressively constructed before the formal explanation.

### playable-post-v1

Choose this when learner action is the primary explanatory medium. The page
should teach a rule manually, automate it, expose parameters gradually, compare
outcomes, and end in a constrained sandbox or transfer challenge.

Choose it when at least two are true:

- The learner can pursue a concrete goal before knowing the formal concept.
- Success, failure, or an unexpected outcome supplies the key evidence.
- Repeated or recorded scenarios teach more than a single continuous diagram.
- A history trail, outcome metric, or replay makes consequences understandable.

## Dominant-profile rule

Do not combine profiles by accumulating all of their chrome and validators.
Choose the profile that leads the core path, then borrow only useful techniques.
For example, an editorial page may contain one direct-manipulation figure, and
a simulation essay may end with a short sandbox. Keep the dominant profile's
marker, narrative rhythm, template, and acceptance checks.

If the user explicitly names a profile, use it unless it cannot represent the
requested learning objective honestly. Explain a genuine mismatch rather than
silently switching. Do not ask the user to choose a profile when the content
provides enough evidence to select one.

## Shared output contract

Every delivered page must:

- Declare exactly one `<meta name="explainer-profile" content="...">` marker.
- Declare `discovery-first-v1` as the learning design.
- Remain understandable in its initial state and without JavaScript.
- Put each important learner action next to what changes and why.
- Keep model assumptions and limitations visible near the qualified result.
- Cite factual claims and separate evidence, inference, and simplification.
- Provide deterministic reset behavior and textual equivalents for visuals.
- Recompose for narrow screens instead of relying on page-level horizontal
  scrolling or unreadable uniform shrinking.
- Preserve keyboard, touch, visible focus, reduced motion, and live feedback.
