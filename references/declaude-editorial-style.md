# Declaude editorial UI contract

Use this contract for every explainer unless the user explicitly requests a
different visual system. It is derived from the general design language of
<https://declaude.org/watermarking/>, not from copied source code or branding.
Keep the explainer's content, prose, diagrams, and implementation original.

## Required page rhythm

1. Use one centered reading column, approximately 722px or 45.125rem wide.
2. Start with a modest title and two or three short framing paragraphs. Do not
   use a full-screen or oversized marketing hero. Do not add an eyebrow, badge,
   or metadata line for inferred difficulty, audience level, reading time, or a
   generic `educational simplification` label unless the user asks for it.
3. Organize the body into four to seven numbered steps. Each step must contain:
   - a compact heading such as `1. The core choice`;
   - one italic or muted goal callout with a left accent rule;
   - a short explanation;
   - an interaction or figure when manipulation adds understanding;
   - an immediate caption or takeaway in plain language.
4. Keep interactions inside the prose flow. Avoid side navigation, dashboard
   chrome, unrelated cards, KPI grids, and persistent toolbars.

## Required visual tokens

Preserve these defaults from the bundled template:

- Page: warm off-white `#faf9f6`.
- Main text: near-black `#1a1a18`.
- Muted text: `#6b6862`.
- Accent: burnt orange `#b3541e`.
- Rules: warm gray `#e3e0d8`.
- Figure surface: white with a 1px rule and 12px radius.
- Inset example surface: `#faf8f1`, optionally with a thin accent rule.
- Typeface: native system sans-serif for prose. A restrained serif may appear
  only inside a quoted sentence, formula specimen, or content demonstration.
- Base type: about 17px with roughly 1.65 line height on desktop.
- Content width: 45.125rem maximum with comfortable mobile gutters.

Use one additional semantic color only when the subject requires it. Never make
color the sole carrier of meaning.

## Controls and motion

- Primary buttons: near-black fill, off-white text, 8px radius.
- Secondary buttons: transparent fill, warm-gray border, muted text, 8px radius.
- Keep controls compact and place them directly under the model they affect.
- Show the changed state in the figure and explain it in nearby live text.
- Use short, causal transitions only. Never add ambient animation, parallax,
  glass effects, decorative blobs, gradient backgrounds, or heavy shadows.
- Preserve visible focus, reduced motion, keyboard operation, and touch targets.

## Content-specific adaptation

Adapt the diagram, data marks, labels, and interaction mechanics to the topic,
but do not redesign the surrounding page shell. A repository call path may use
an SVG sequence; a bond explainer may use a price curve; a text-watermark lesson
may use weighted word bars. All should still read as the same calm, narrow,
step-by-step editorial series.

If the user asks for another style, follow that request and record the departure
in the delivery note. Accessibility requirements always override visual mimicry.
