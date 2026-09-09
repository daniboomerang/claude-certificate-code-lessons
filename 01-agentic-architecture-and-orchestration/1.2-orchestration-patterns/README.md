# Domain 1 · Lesson 1.2 · Multi-Agent Orchestration

## Official location

- Domain: **1 — Agentic Architecture & Orchestration**
- Task statement: **1.2 — Orchestrate multi-agent systems with coordinator-subagent patterns**
- Curriculum: [Multi-Agent Orchestration](https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns)
- Exercise: **Build a Hub-and-Spoke Research Coordinator**

## Module identity — organizing several agents

**What this module is:** The **architecture and responsibility model** for several agents working on one goal. A central coordinator decomposes the task, delegates to specialist subagents, receives every result, checks coverage, and re-delegates gaps.

**One thing to remember:** **The coordinator owns the whole, while each subagent owns only its assignment.**

**What it is not:** This is not mainly about the low-level model/tool loop from 1.1, nor about the exact SDK configuration and metadata format from 1.3. It answers **who coordinates what**, not precisely **how the invocation is wired**.

**Actor naming:** Here, the coordinator is a **Claude agent role**, not the external loop code shown in 1.1. The runtime still executes that coordinator agent's tool requests underneath.

**How it differs from the neighboring modules:**

- **1.1:** one agent repeatedly uses tools.
- **1.2:** one coordinator organizes multiple isolated agents.
- **1.3:** the concrete spawning gate, agent definitions, parallel calls, and context payloads.

**Exam recognition signal:** A final result misses entire categories, agents duplicate work, agents communicate directly, or nobody evaluates and fills coverage gaps.

## The smallest useful picture

```text
                         ┌── explicit prompt ──> Web-search subagent
User topic ──> COORDINATOR                              │
                 │        └── explicit prompt ──> Document subagent
                 │                                     │
                 └──── receives every result <─────────┘
                                    │
                         evaluate coverage gaps
                                    │
                    missing topic? re-delegate through hub
                                    │
                              final report
```

The coordinator owns the whole process:

1. Decompose the broad topic.
2. Select a subagent for each assignment.
3. Put every required fact into that invocation's context object.
4. Collect results—subagents never pass results directly to one another.
5. Evaluate coverage and re-delegate missing work.

## Run it

```bash
node hub-and-spoke.mjs
```

No API, network access, or tokens are used. The two subagents are deterministic functions so you can see the orchestration without SDK noise.

## What the simulation does

The coordinator decomposes `renewable energy technologies` into six categories. On the first pass, the mock document agent fails to cover biomass. The coordinator—not either subagent—detects that gap and sends an explicit, targeted second request to the web agent. The final coverage becomes 100%.

## Read the code in this order

1. `decompose()` — breadth belongs to the coordinator.
2. `makeContext()` — isolated subagents only know explicitly passed context.
3. `invokeSubagent()` — the coordinator is the hub for every invocation.
4. `assessCoverage()` — aggregation is not enough; the hub evaluates quality.
5. `while` loop in `research()` — gaps cause targeted re-delegation.

## Exam rules made visible

- **Missing entire categories:** inspect coordinator decomposition first.
- **Poor subagent result:** inspect the context passed by the coordinator.
- **Subagent A needs output from B:** the coordinator must pass it explicitly.
- **A simple dispatcher stops after one pass; a coordinator evaluates and refines.**
- For this exam, choose strict hub-and-spoke communication even though real products may support other topologies.

## Active recall

If the final report covers solar and wind deeply but completely misses geothermal and tidal, which component is the first suspect—and why?
