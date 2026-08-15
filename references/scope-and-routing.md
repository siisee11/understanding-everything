# Scope and routing

Use scope negotiation to protect learning quality, not to delay work.

## Scope test

A request is ready when all of the following are true:

- One learner and approximate prerequisite level can be inferred.
- The desired understanding can be stated in one sentence.
- One causal path, mechanism, decision, or mental model can organize the page.
- For a novice, the independently complete core can fit in two to four concepts,
  one to three meaningful interactions, and roughly five to ten minutes.
- For an intermediate or expert audience, the core can fit in three to six
  concepts, two to five interactions, and roughly ten to twenty minutes.

Proceed without a question when these conditions hold, even if some minor
design choices remain. Choose sensible defaults and state them briefly.

## Signals that the request is too broad

- It combines several independent mechanisms, audiences, or goals.
- A beginner overview and professional decision tool would require different
  pages.
- The topic is a field or textbook rather than a teachable path.
- The request could reasonably produce more than one unrelated simulator.
- Repository inspection reveals multiple features with the same label or
  separate client, server, and agent systems whose boundaries matter.

Do not decide a repository request is broad from its name alone. Inspect the
top-level structure and likely entry points first; then ask only if real
ambiguity remains.

## Clarification protocol

Ask one concise question at a time. Offer two or three mutually exclusive
directions, put the recommended foundation first, and explain each in one short
phrase. Avoid an open-ended questionnaire.

Use a domain-independent option pattern:

- Recommended foundation: one concrete mechanism and its most visible
  consequence, assuming no specialist vocabulary.
- Formal or implementation focus: calculation, internal execution path, or
  technical machinery for learners with the prerequisites.
- Context focus: surrounding history, policy, ecosystem, tradeoffs, or downstream
  effects rather than the core mechanism itself.

If the learner asks for everything, select the foundation path and list the
other branches as follow-up topics. Ask another question only when the answer
still leaves multiple incompatible learning objectives.

## Working scope statement

Before research, record:

- Learner:
- Objective:
- Spine:
- Include:
- Exclude:
- Evidence mode: topic, supplied source, codebase, or mixed.
- Core path:
- Optional depth:

Do not require the user to approve this statement for a narrow request. For a
broad request, restate the narrowed scope after the user's answer and proceed.
