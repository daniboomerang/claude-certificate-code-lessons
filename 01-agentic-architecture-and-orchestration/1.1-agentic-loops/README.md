# Domain 1 · Lesson 1.1 · Agentic Loops

## Where this belongs

- Certification domain: **1 — Agentic Architecture & Orchestration**
- Curriculum task: **1.1 — Agentic Loops**
- Curriculum lesson: [Agentic Loops](https://claudecertificationguide.com/learn/1-agentic-architecture/1-1-agentic-loops)
- Official Anthropic documentation: [How tool use works](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works)

## Module identity — one agent using tools

**What this module is:** The basic runtime loop for **one Claude conversation**. Claude can request a tool, but external code executes it and returns the result. The coordinator keeps calling the same conversation until Claude finishes.

**One thing to remember:** **Claude chooses; code executes; the loop continues.**

**What it is not:** This is not multi-agent orchestration. The calculator is a deterministic tool, not another agent, and Claude does not run the calculator code itself.

**Actor naming:** In this lesson, “coordinator” means the **external host/runtime code** running the loop. It is not a coordinator agent. In 1.2 and 1.3, “coordinator” means a **Claude agent role** that plans and delegates; its tool requests are still executed by an underlying runtime like this one.

**How it differs from the next modules:**

- **1.1:** one agent ↔ tools — how a model/tool turn works.
- **1.2:** coordinator ↔ several agents — who owns and organizes delegated work.
- **1.3:** coordinator → subagent invocation — how spawning and context transfer are configured.

**Exam recognition signal:** A question mentions `tool_use`, `tool_result`, `stop_reason`, handlers, or repeated model calls.

## The idea

Claude chooses which available tool to request. The coordinator executes the matching handler, records the result, and calls Claude again with the updated history.

```text
Coordinator calls Claude with history + tool definitions
                         |
                         v
              Claude requests calculator
                         |
                         v
          Coordinator finds calculator handler
                         |
                         v
             Handler returns result: 102
                         |
                         v
        Coordinator adds tool_result to history
                         |
                         v
             Coordinator calls Claude again
                         |
                         v
                Claude returns end_turn
```

## Run the lesson

This simulation uses no network and no API tokens. It replaces the real Claude API with a tiny fake so the loop is easy to see.

```bash
node agent-loop.mjs
```

## What to notice in the code

1. `toolDefinitions` describe what Claude may request.
2. `handlers` connect tool names to real executable functions.
3. `messages` holds the session history.
4. The assistant `tool_use` and external `tool_result` are separate messages.
5. The `while` loop calls Claude again after adding the result.
6. `end_turn` ends the loop; the iteration limit is only a safety boundary.

## Recall question

Who chooses the tool, who executes the handler, and which line starts the next model turn?
