# Domain 1 · Lesson 1.2 · Multi-Agent Orchestration

## Official location

- Domain: **1 — Agentic Architecture & Orchestration**
- Task statement: **1.2 — Orchestrate multi-agent systems with coordinator-subagent patterns**
- Curriculum: [Multi-Agent Orchestration](https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns)
- Exercise: **Build a Hub-and-Spoke Research Coordinator**

## Module identity — organizing several agents

**What this is:** The responsibility design for **one coordinator agent and several specialist subagents**.

**Remember:** **The coordinator owns the whole; each subagent owns only its assignment.**

**Not this:** It is not primarily about tool handlers (1.1), nor the SDK configuration and metadata shape (1.3). It is about who decides the research plan, checks breadth, and fixes gaps.

## Read this first — what exists before work starts

```text
HOST / RUNTIME loads:

1. coordinator agent
   overall goal: answer the user’s broad question

2. subagent definitions
   web researcher, document analyst, etc.

3. Agent tool
   lets the coordinator request a named subagent
```

The coordinator is a **Claude agent role**. The host/runtime still executes its `Agent` tool requests underneath, using the same basic loop from 1.1.

## The complete flow

```text
USER gives broad topic
        ↓
COORDINATOR receives it
        ↓
COORDINATOR decomposes it into full breadth
        ↓
COORDINATOR requests subagents with explicit assignments
        ↓
HOST/RUNTIME starts isolated subagents
        ↓
SUBAGENTS return results only to COORDINATOR
        ↓
COORDINATOR checks coverage against original topic
        ↓
missing category? ─ yes → targeted re-delegation → check again
        ↓ no
COORDINATOR produces final report
```

## Design pseudocode

[Open `hub-and-spoke-design.ts`](./hub-and-spoke-design.ts)

```text
subtopics = coordinator decomposes broad topic

for each independent assignment:
  coordinator requests a named subagent
  request includes assignment + all needed context

runtime returns results to coordinator
coverage = coordinator evaluates results

while coverage has gaps:
  coordinator re-delegates targeted missing work

return coordinator’s final report
```

## Who owns what?

| Part | Owns |
|---|---|
| Coordinator agent | Decomposition, agent selection, explicit context, aggregation, gap repair |
| Subagent | Its bounded assignment only |
| Host/runtime | Starting subagents and returning their results to the coordinator |

## The rule that makes it hub-and-spoke

```text
subagent A ─X─> subagent B

subagent A ─> coordinator ─> subagent B
```

For this exam, all information between subagents passes through the coordinator.

## How this differs from neighboring lessons

- **1.1:** the model/tool loop underneath any agent.
- **1.2:** the multi-agent plan and ownership model.
- **1.3:** how named subagents are spawned and what their isolated contexts contain.
- **1.4:** deterministic rules that block an invalid action within a workflow.

## Exam recognition signal

The result misses whole categories, agents duplicate work, agents communicate directly, or no one checks coverage after delegation.

## Optional runnable implementation reference

[Open `hub-and-spoke.mjs`](./hub-and-spoke.mjs)

This token-free simulation adds JavaScript detail. Read it only after the flow and ownership model feel clear.

```bash
node hub-and-spoke.mjs
```

## Active recall

A report covers solar and wind deeply but omits geothermal and tidal. Which role made the first mistake, and what should happen next?
