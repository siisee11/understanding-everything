# Browser and accessibility QA

Validate the finished file, then inspect the rendered behavior.

## Deterministic checks

Run:

    node <skill-directory>/scripts/validate-explainer.mjs <absolute-index-html>

Fix all reported errors. Review warnings and either fix them or document why
they do not apply.

## Browser checks

When browser tooling is available, serve the output directory on a local-only
port and test at approximately 1280px and 390px widths.

Check:

- The first render explains something before any input.
- Every button, slider, radio, checkbox, select, stepper, and reset path works.
- Extreme and intermediate values update every dependent label and mark.
- The browser console remains free of errors.
- Text, controls, SVG labels, formulas, and source links do not overlap or clip.
- No page-level horizontal overflow appears on narrow screens.
- Keyboard order is logical, focus is visible, and every interaction works
  without a pointer.
- Meaning never depends on color alone.
- Dynamic text important to the learner is announced through an appropriate
  live region.
- Motion stops or becomes non-essential under prefers-reduced-motion.
- Canvas has an accessible name and equivalent explanatory text.
- Source links and code references lead to the evidence they claim to support.
- The rendered page still follows the `declaude-editorial-v1` contract: one
  narrow reading column, modest heading scale, numbered step headings, muted
  goal callouts, white bordered figures, and dark/ghost button hierarchy.
- No decorative gradient, oversized hero, wide dashboard grid, floating card
  field, or heavy shadow has displaced the editorial reading flow.

Test both correct and incorrect learner actions when the page includes
questions or feedback.

Run the cold-reader gate from discovery-first-explanation.md as an editorial
review. Confirm that the opening is understandable without a glossary, the
first action precedes unnecessary terminology, every result has plain-language
feedback, the core remains complete when optional depth is skipped, and a
changed case tests transfer rather than recall.

## Evidence honesty

Capture a screenshot when it materially helps the user inspect the result. If
browser tooling or authentication prevents a check, run the deterministic
validator, inspect the source, and report the exact unverified behavior. Never
turn an unavailable test into a passing claim.
