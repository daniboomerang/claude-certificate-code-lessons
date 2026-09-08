# CCAR-F lesson index

Each completed lesson links to its explanation and code example. Unlinked items are placeholders for future lessons.

## Domain 1 — Agentic Architecture & Orchestration (27%)

- [1.1 — Design and implement agentic loops for autonomous task execution](./01-agentic-architecture-and-orchestration/1.1-agentic-loops/README.md)
  - [Code example](./01-agentic-architecture-and-orchestration/1.1-agentic-loops/agent-loop.mjs)
- [1.2 — Orchestrate multi-agent systems with coordinator-subagent patterns](./01-agentic-architecture-and-orchestration/1.2-orchestration-patterns/README.md)
  - [Code example](./01-agentic-architecture-and-orchestration/1.2-orchestration-patterns/hub-and-spoke.mjs)
- [1.3 — Configure subagent invocation, context passing, and spawning](./01-agentic-architecture-and-orchestration/1.3-subagent-invocation-context/README.md)
  - [Pseudocode example](./01-agentic-architecture-and-orchestration/1.3-subagent-invocation-context/context-passing.ts)
- 1.4 — Implement multi-step workflows with enforcement and handoff patterns
- 1.5 — Apply Agent SDK hooks for tool call interception and data normalization
- 1.6 — Design task decomposition strategies for complex workflows
- 1.7 — Manage session state, resumption, and forking

## Domain 2 — Tool Design & MCP Integration (18%)

- 2.1 — Design effective tool interfaces with clear descriptions and boundaries
- 2.2 — Implement structured error responses for MCP tools
- 2.3 — Distribute tools appropriately across agents and configure tool choice
- 2.4 — Integrate MCP servers into Claude Code and agent workflows
- 2.5 — Select and apply built-in tools (Read, Write, Edit, Bash, Grep, Glob) effectively

## Domain 3 — Claude Code Configuration & Workflows (20%)

- 3.1 — Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization
- 3.2 — Create and configure custom slash commands and skills
- 3.3 — Apply path-specific rules for conditional convention loading
- 3.4 — Determine when to use plan mode vs direct execution
- 3.5 — Apply iterative refinement techniques for progressive improvement
- 3.6 — Integrate Claude Code into CI/CD pipelines

## Domain 4 — Prompt Engineering & Structured Output (20%)

- 4.1 — Design prompts with explicit criteria to improve precision and reduce false positives
- 4.2 — Apply few-shot prompting to improve output consistency and quality
- 4.3 — Enforce structured output using tool use and JSON schemas
- 4.4 — Implement validation, retry, and feedback loops for extraction quality
- 4.5 — Design efficient batch processing strategies
- 4.6 — Design multi-instance and multi-pass review architectures

## Domain 5 — Context Management & Reliability (15%)

- 5.1 — Manage conversation context to preserve critical information across long interactions
- 5.2 — Design effective escalation and ambiguity resolution patterns
- 5.3 — Implement error propagation strategies across multi-agent systems
- 5.4 — Manage context effectively in large codebase exploration
- 5.5 — Design human review workflows and confidence calibration
- 5.6 — Preserve information provenance and handle uncertainty in multi-source synthesis

