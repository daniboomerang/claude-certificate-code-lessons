# Domain 1 · Lesson 1.1 · Agentic Loops

## Official location

- Domain: **1 — Agentic Architecture & Orchestration**
- Task statement: **1.1 — Design and implement agentic loops for autonomous task execution**
- Curriculum: [Agentic Loops](https://claudecertificationguide.com/learn/1-agentic-architecture/1-1-agentic-loops)
- Official documentation: [How tool use works](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works)

## Module identity — one agent using tools

**What this is:** The basic runtime loop for **one Claude conversation**.

**Remember:** **Claude chooses; code executes; the loop continues.**

**Not this:** The calculator is a tool, not a second agent. Claude requests it; the external host/runtime executes its code.

## Read this first — what exists before Claude starts

```text
HOST / RUNTIME loads:

1. conversation history
   [user question]

2. tool definitions Claude may request
   [calculator: “multiply two numbers”]

3. private handler map
   calculator → real deterministic calculator code
```

Claude sees the conversation and tool definitions. Claude does **not** run or see the handler code.

## The complete flow

```text
HOST / RUNTIME                         CLAUDE
────────────────────────────────────────────────────────
load history + tool definitions
call Claude ─────────────────────────> sees question + tools
                                      decides: “use calculator”
receives tool request <────────────── tool_use(calculator, {17, 6})
finds handler and runs code
gets result: 102
adds tool_result to history
call same conversation again ────────> sees result: 102
                                      decides: “I can answer now”
receives final text <──────────────── end_turn
return final answer
```

## Design pseudocode

[Open `agent-loop-design.ts`](./agent-loop-design.ts)

```text
load conversation + tool definitions + handlers

LOOP:
  call Claude with conversation + tool definitions

  if Claude requests a tool:
    runtime runs matching handler
    runtime adds tool result to conversation
    loop again

  if Claude ends the turn:
    return final answer
```

## Who owns what?

| Part | Owns |
|---|---|
| Claude | Choosing whether to request an available tool; interpreting its result |
| Host/runtime | Calling Claude, running the requested handler, preserving history |
| Tool handler | Deterministic work such as calculation, database access, or a file read |

## How this differs from the next lessons

- **1.1:** one Claude conversation ↔ tools.
- **1.2:** one coordinator agent organizes several agents.
- **1.3:** the concrete configuration and information passed when spawning those agents.
- **1.4:** a tool handler blocks an unsafe action with a deterministic gate.

## Exam recognition signal

Look for `tool_use`, `tool_result`, `stop_reason`, handlers, or repeated model calls.

## Optional runnable implementation reference

[Open `agent-loop.mjs`](./agent-loop.mjs)

This is a token-free simulation. Only read it after the flow makes sense; it adds JavaScript details, not a new architectural idea.

```bash
node agent-loop.mjs
```

## Active recall

Claude asks for a calculator. What happens next, and which component does it?
