// DESIGN PSEUDOCODE — one coordinator agent, several isolated subagents.

// BEFORE WORK BEGINS, the host/runtime loads:
coordinator = Claude agent with the overall goal
subagent definitions = [web researcher, document analyst]
Agent tool = the tool the coordinator may request to spawn a subagent

coordinator receives user's broad topic
subtopics = coordinator DECOMPOSES topic into full breadth

FOR EACH independent assignment:
  coordinator EMITS an Agent tool request containing:
    - which subagent role to use
    - the assigned subtopic
    - every fact/context that subagent needs

host/runtime STARTS those subagents
subagents work in their OWN fresh contexts
host/runtime RETURNS every subagent result to coordinator

coverage = coordinator CHECKS results against all required subtopics

WHILE coverage has gaps:
  coordinator EMITS targeted Agent requests for only the missing work
  host/runtime RETURNS those new results
  coverage = coordinator CHECKS again

RETURN coordinator's final report

// Ownership:
// Coordinator: breadth, delegation, aggregation, gap repair.
// Subagent: only its bounded assignment.
// Host/runtime: actually starts subagents and carries results back.

