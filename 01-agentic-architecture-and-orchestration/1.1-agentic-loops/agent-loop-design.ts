// DESIGN PSEUDOCODE — one agent, one conversation, external tools.

// BEFORE THE FIRST MODEL TURN, the host/runtime loads:
conversation = [user's question]
tools = [calculator's name, description, input shape]
handlers = { calculator: deterministic calculator code }

LOOP until Claude says "I am finished":
  response = CALL CLAUDE with (conversation, tools)

  ADD response to conversation

  IF response requests a tool:
    FOR EACH requested tool:
      handler = handlers[requested tool name]
      result = RUN handler(requested input)  // No LLM here.
      ADD tool_result to conversation

    CONTINUE LOOP  // Call the SAME Claude conversation again.

  IF response ends the turn:
    RETURN final text

// Ownership:
// Claude chooses which available tool to request.
// The host/runtime finds and runs the handler.
// The conversation history carries the result into the next Claude turn.
