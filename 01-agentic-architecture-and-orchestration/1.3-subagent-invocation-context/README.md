# Domain 1 · Lesson 1.3 · Subagent Invocation and Context Passing

## Official location

- Domain: **1 — Agentic Architecture & Orchestration**
- Task statement: **1.3 — Configure subagent invocation, context passing, and spawning**
- Curriculum: [Subagent Invocation and Context Passing](https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context)
- Exercise: **Implement Context Passing with Structured Metadata**

## The whole lesson in one picture

```text
                 ┌─ Agent call ─> WEB ───────┐
COORDINATOR ─────┤                           ├─> full Finding[] ─> SYNTHESIS
                 └─ Agent call ─> DOCUMENT ──┘
                     same response / parallel        metadata preserved
```

Each agent starts isolated. The coordinator must explicitly pass everything it needs.

## The metadata rule

Do not pass only this:

```ts
"Solar efficiency increased."
```

Pass this complete object:

```ts
{
  claim: "Solar efficiency increased.",
  source_url: "https://example.com/report",
  document_name: "Solar Report",
  page_number: 14,
  confidence: "high",
  retrieved_by: "web-researcher"
}
```

If synthesis produces an unattributed claim, first ask: **did the coordinator strip the metadata?** A stronger synthesis prompt cannot cite information it never received.

## Read the pseudocode

[Open `context-passing.ts`](./context-passing.ts)

It is deliberately almost pseudocode. It shows the architecture without SDK setup or API calls.

## Five exam rules

1. The coordinator needs `Agent` (`Task` in older exam terminology) in `allowedTools` to spawn subagents in an unattended exam-style setup.
2. Every agent definition has a description, system prompt, and restricted tools.
3. Independent research agents start in parallel: multiple `Agent` calls in one coordinator response.
4. The coordinator passes the complete `Finding[]` into synthesis—never only the claims.
5. Every final claim must resolve to its URL or document/page metadata.

## `forkSession` is different

- **Parallel `Agent` calls:** perform independent tasks concurrently to reduce latency.
- **`forkSession`:** branch from an existing session/history to explore a different path.

Forking is about **conversation lineage**. Parallel spawning is about **concurrent work**.

## Active recall

The web and document agents return perfect citations, but the final report has none. Which exact boundary would you inspect first?

