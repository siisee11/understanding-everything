# Understanding Everything

[![skills.sh](https://skills.sh/b/siisee11/understanding-everything)](https://skills.sh/siisee11/understanding-everything)

A reusable Codex skill that turns an unfamiliar topic, source article, paper,
GitHub repository, or local codebase into a researched interactive explainer.

It is designed around shared learning constraints:

- **Discovery before terminology:** the learner encounters a concrete situation,
  predicts or traces what happens, observes the result, and only then learns the
  formal name.
- **Evidence before decoration:** claims, calculations, and real code paths are
  verified before they become interactions.
- **One dominant production profile:** the skill chooses an editorial lesson,
  connected simulation essay, or playable post based on what should lead the
  learning experience.

## Production profiles

- `editorial-v1`: prose leads a calm, narrow, four-to-seven-step explanation;
  interactions clarify discrete claims.
- `simulation-essay-v1`: one persistent model and visual vocabulary accumulate
  across connected scenes.
- `playable-post-v1`: manual play leads to automation, parameter exploration,
  outcome history, and a sandbox or transfer challenge.

All three profiles share scoping, discovery-first explanation, authoritative
research, source citation, model limitations, accessibility, responsive QA, and
self-contained delivery.

## What the skill does

- Narrows requests that are too broad with one focused question.
- Researches current, authoritative sources or traces real repository code.
- Separates a short, independently useful core path from optional depth.
- Builds a self-contained HTML page with meaningful interactions.
- Verifies claims, calculations, behavior, responsive layout, and accessibility.
- Keeps inferred audience labels and generic difficulty badges out of the page.

## Install

Install it from [skills.sh](https://skills.sh/) with the open Agent Skills CLI:

```bash
npx skills add siisee11/understanding-everything
```

For a non-interactive global Codex installation:

```bash
npx skills add siisee11/understanding-everything --skill understanding-everything --agent codex --global --yes
```

To install manually instead, place this repository's skill files in a directory
discovered by Codex, for example:

```text
~/.codex/skills/understanding-everything/
├── SKILL.md
├── agents/
├── assets/
├── references/
└── scripts/
```

## Use

Invoke the skill explicitly:

```text
$understanding-everything 금리와 기존 채권 가격이 왜 반대로 움직이는지 알고 싶어.
```

It also accepts source-driven and repository-driven requests:

```text
$understanding-everything 이 글의 핵심 메커니즘을 조사해서 인터랙티브하게 설명해줘: <URL>

$understanding-everything 이 GitHub 저장소에서 채팅 기능이 어떻게 동작하는지 조사해서 설명해줘: <REPOSITORY_URL>
```

## Examples

The Korean examples below explain the same bond-and-interest-rate relationship
through different production profiles. Each page is a self-contained HTML file.

- [`editorial-v1`](examples/bond-rate-discovery/index.html): a narrow,
  discovery-first lesson built around short steps and focused figures.
- [`simulation-essay-v1`](examples/bond-rate-simulation-essay/index.html): one
  bond model and visual language carried across five connected scenes.
- [`playable-post-v1`](examples/bond-rate-playable-post/index.html): manual price
  matching, automated repricing, outcome history, transfer, and a sandbox.
- [Early foundations prototype](examples/rates-bonds-foundations/index.html):
  the broader first experiment retained to show how the workflow evolved.

The editorial example also includes its
[desktop](examples/bond-rate-discovery/screenshots/desktop.png) and
[mobile](examples/bond-rate-discovery/screenshots/mobile.png) QA captures.

![Bond and interest-rate explainer](examples/bond-rate-discovery/screenshots/desktop.png)

## Validate an explainer

```bash
node scripts/validate-explainer.mjs /absolute/path/to/index.html
```

The validator reads the page's `explainer-profile` marker, applies common HTML,
accessibility, responsive, source, and self-contained checks, then adds the
selected profile's structural checks. Browser QA, independent model verification,
and cold-reader review remain required because learning quality cannot be proven
by static checks alone.
