# Browser and accessibility QA

Validate the finished file, then inspect the rendered behavior.

## Deterministic checks

Run:

    node <skill-directory>/scripts/validate-explainer.mjs <absolute-index-html>

The validator reads `explainer-profile` and applies common plus profile-specific
checks. Fix every error. Review warnings and either fix them or document why
they do not apply.

## Common browser checks

Serve the output locally and test at approximately 1280px and 390px widths.

Check:

- The first render explains something before input.
- Every control, direct-manipulation handle, state link, reset, and replay works.
- Representative, intermediate, and extreme values update every dependent label,
  text description, and mark.
- Correct and incorrect learner actions both receive explanatory feedback.
- The console remains free of errors and important assets load.
- Text, controls, SVG labels, formulas, and sources do not overlap or clip.
- No page-level horizontal overflow appears on narrow screens.
- Dense figures recompose rather than become uniformly tiny.
- Keyboard order is logical, focus is visible, and pointer-only gestures have an
  equivalent path.
- Touch targets remain usable and dragging does not trap page scrolling.
- Meaning never depends on color alone.
- Important dynamic text is announced through an appropriate live region.
- Motion stops or becomes non-essential under `prefers-reduced-motion`.
- Canvas has an accessible name and equivalent explanatory text.
- Source links and code references support the claims attached to them.
- JavaScript-disabled content states the core relationship and model limits.

Run the cold-reader gate from `discovery-first-explanation.md` after QA.

## Profile-specific checks

### editorial-v1

- Preserve one narrow reading column, modest heading scale, numbered steps,
  muted goal callouts, bordered figures, and compact dark/ghost controls.
- Confirm the core remains complete if optional details stay closed.
- Reject decorative gradients, oversized heroes, dashboard grids, and heavy
  visual chrome that displace the reading flow.

### simulation-essay-v1

- Confirm shared state, semantic colors, units, and object identity remain
  consistent across connected scenes.
- Test direct manipulation and its synchronized native or keyboard control.
- Exercise pause, replay, reset, in-prose state links, and synchronized views.
- Verify the mobile scene changes composition when the desktop view is dense.
- Check performance while animating and confirm offscreen work stops when used.
- Compare displayed reference states with an independent calculation oracle.

### playable-post-v1

- Complete manual, automated, and sandbox or transfer paths.
- Verify staged control unlocking, goal feedback, history metrics, presets,
  pause, speed, replay, and deterministic reset where present.
- Replay the same seed and confirm the same result; test additional seeds before
  accepting a general stochastic claim.
- Confirm the final debrief distinguishes model behavior from real-world claims.

## Evidence honesty

Capture a screenshot when it materially helps inspection. If browser tooling
prevents a check, run deterministic validation, inspect the source, and report
the exact unverified behavior. Never turn an unavailable test into a pass.
