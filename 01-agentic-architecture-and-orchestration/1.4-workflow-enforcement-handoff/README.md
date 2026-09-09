# Domain 1 · Lesson 1.4 · Workflow Enforcement and Handoff

## Official location

- Domain: **1 — Agentic Architecture & Orchestration**
- Task statement: **1.4 — Implement multi-step workflows with enforcement and handoff patterns**
- Curriculum: [Workflow Enforcement and Handoff](https://claudecertificationguide.com/learn/1-agentic-architecture/1-4-workflow-enforcement-handoff)
- Exercise: **Build a Prerequisite Gate for Financial Operations**

## Module identity — enforcing an order that must not be skipped

**What this module is:** A deterministic workflow gate. The model may request any tool, in any order, but host code refuses a high-stakes action until its prerequisite is true.

**One thing to remember:** **Prompts suggest; gates enforce.**

**What it is not:** This is not asking Claude more forcefully to follow a rule. “Always verify before refunding” can improve behavior, but it cannot guarantee it. For money, security, or compliance, the handler itself must block the unsafe action.

**How it differs from the previous modules:**

- **1.1:** the generic loop that executes a requested tool and returns its result.
- **1.2:** the coordinator's strategy for organizing several agents.
- **1.3:** how a coordinator spawns subagents and passes their context.
- **1.4:** the code-level policy that prevents an invalid workflow transition, even if the model requests it.

**Exam recognition signal:** A single mistake causes financial loss, a security breach, or a compliance violation—or a human receives an incomplete escalation summary.

## The smallest useful picture

```text
Claude requests process_refund
             |
             v
  is session.verifiedCustomerId present?
          |                       |
         no                      yes
          |                       |
  return BLOCKED error       execute refund
          |
Claude sees error, then requests get_customer
```

The model is allowed to try the wrong order. The gate is responsible for refusing it.

## Read the pseudocode

[Open `workflow-gate.ts`](./workflow-gate.ts)

It is intentionally almost pseudocode. It has three things to find:

1. `session.verifiedCustomerId` — the fact the system remembers.
2. `processRefund()` — the prerequisite gate.
3. `createHandoff()` — the complete package a human receives without the transcript.

## The handoff rule

A human agent cannot scroll through the original chat. A handoff must stand on its own:

```text
customer ID
what the customer asked for and what was tried
root cause
refund amount (if relevant)
recommended action
```

## Exam decision rule

| Situation | Correct control |
|---|---|
| Formatting/style preference | Prompt guidance is acceptable |
| Refund, payment, transfer | Programmatic gate |
| Identity, access, security | Programmatic gate |
| Regulatory/compliance step | Programmatic gate |

## Active recall

Claude tries `process_refund` before `get_customer`. Which part is supposed to stop the mistake: the model prompt, the coordinator plan, or the refund handler?

