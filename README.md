# Understanding Everything

A reusable Codex skill that turns an unfamiliar topic, source article, paper,
GitHub repository, or local codebase into a researched interactive explainer.

It is designed around two constraints:

- **Discovery before terminology:** the learner encounters a concrete situation,
  predicts or traces what happens, observes the result, and only then learns the
  formal name.
- **Calm editorial presentation:** generated pages use the narrow, step-by-step
  visual language inspired by [declaude's watermarking explainer](https://declaude.org/watermarking/).

## What the skill does

- Narrows requests that are too broad with one focused question.
- Researches current, authoritative sources or traces real repository code.
- Separates a short, independently useful core path from optional depth.
- Builds a self-contained HTML page with meaningful interactions.
- Verifies claims, calculations, behavior, responsive layout, and accessibility.
- Keeps inferred audience labels and generic difficulty badges out of the page.

## Install

Place this repository's skill files in a directory discovered by Codex, for
example:

```text
~/.codex/skills/create-interactive-explainer/
├── SKILL.md
├── agents/
├── assets/
├── references/
└── scripts/
```

## Use

Invoke the skill explicitly:

```text
$create-interactive-explainer 금리와 기존 채권 가격이 왜 반대로 움직이는지 알고 싶어.
```

It also accepts source-driven and repository-driven requests:

```text
$create-interactive-explainer 이 글의 핵심 메커니즘을 조사해서 인터랙티브하게 설명해줘: <URL>

$create-interactive-explainer 이 GitHub 저장소에서 채팅 기능이 어떻게 동작하는지 조사해서 설명해줘: <REPOSITORY_URL>
```

## Example

The included Korean example teaches why higher market rates can lower the price
of an existing fixed-rate bond. It begins with a choice between two concrete
payment promises and introduces financial terms only after the relationship is
visible.

- [Open the self-contained HTML](examples/bond-rate-discovery/index.html)
- [Desktop screenshot](examples/bond-rate-discovery/screenshots/desktop.png)
- [Mobile screenshot](examples/bond-rate-discovery/screenshots/mobile.png)

![Bond and interest-rate explainer](examples/bond-rate-discovery/screenshots/desktop.png)

## Validate an explainer

```bash
node scripts/validate-explainer.mjs /absolute/path/to/index.html
```

The validator checks the required editorial design tokens and learning-design
markers alongside basic HTML, accessibility, responsive, and self-contained
page requirements. Browser QA and editorial cold-reader review remain required
because prose quality cannot be proven by static checks alone.
