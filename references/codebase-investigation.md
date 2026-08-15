# Codebase investigation

Explain the implementation that exists at a specific revision.

## Resolve the evidence boundary

- Prefer the user's local checkout when it is clearly the repository in scope.
- For a GitHub URL, inspect the repository through an available connector, gh,
  or a temporary read-only clone. Do not modify the target repository.
- Record repository identity, branch, and commit SHA before drawing conclusions.
- Read repository instructions, architecture docs, manifests, and tests, but
  verify behavior in implementation code.

## Trace the feature

Start from observable entry points and follow the path end to end:

1. User or external input.
2. UI, CLI, API, event, or message handler.
3. State and domain types.
4. Client-server or process boundary.
5. Authentication, session, conversation, channel, or request identity.
6. Service, model, agent, or provider dispatch.
7. Streaming, events, retries, and error handling.
8. Persistence, caches, queues, or durable state.
9. Rendering or returned output.
10. Tests that prove the important paths and edge cases.

Search definitions, imports, call sites, event names, schemas, and test
fixtures. Names and comments are leads, not proof. Distinguish verified runtime
behavior, documented intent, and inference.

## Scope after inspection

If one coherent path answers the request, proceed. If inspection reveals
several materially different systems, ask which path the learner wants. Offer
options grounded in the code, such as end-to-end user chat, client rendering,
server streaming, or agent-to-agent messaging.

## Evidence in the page

- Cite claims with repository-relative path and line number or a stable commit
  link when possible.
- Quote only short, exact snippets that teach a specific transition.
- Build architecture edges from real imports and calls.
- Use an execution stepper for ordered state changes and a flow diagram for
  boundaries; do not paste large files as a visual.
- State the inspected revision and explain that code may drift.
