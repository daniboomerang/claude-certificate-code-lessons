// CCAR-F — Domain 1, Lesson 1.1: Agentic Loops
// Run with: node agent-loop.mjs
//
// This uses a fake Claude function, so it consumes no API tokens.

// Claude sees these definitions. They describe what it is allowed to request.
const toolDefinitions = [
  {
    name: 'calculator',
    description: 'Multiply two numbers',
    input_schema: {
      type: 'object',
      properties: {
        a: { type: 'number' },
        b: { type: 'number' }
      },
      required: ['a', 'b']
    }
  }
]

// The coordinator owns these handlers. Claude does not see their code.
const handlers = {
  calculator: ({ a, b }) => a * b
}

// This array is the logical session history.
const messages = [
  {
    role: 'user',
    content: 'What is 17 multiplied by 6?'
  }
]

// This stands in for a real API call. A real call would send `messages` and
// `toolDefinitions` to Claude. The fake lets us observe the loop for free.
async function callClaude({ messages: currentMessages, tools }) {
  const toolResult = currentMessages
    .flatMap((message) => (Array.isArray(message.content) ? message.content : []))
    .find((block) => block.type === 'tool_result' && block.tool_use_id === 'call_1')

  if (!toolResult) {
    return {
      stop_reason: 'tool_use',
      content: [
        {
          type: 'tool_use',
          id: 'call_1',
          name: tools[0].name,
          input: { a: 17, b: 6 }
        }
      ]
    }
  }

  return {
    stop_reason: 'end_turn',
    content: [
      {
        type: 'text',
        text: `17 multiplied by 6 is ${toolResult.content}.`
      }
    ]
  }
}

async function runAgentLoop() {
  const maxIterations = 5 // Safety boundary, not the normal stopping mechanism.

  for (let iteration = 1; iteration <= maxIterations; iteration += 1) {
    console.log(`\n--- Model turn ${iteration} ---`)

    // This call starts the next model turn with the complete history.
    const response = await callClaude({
      messages,
      tools: toolDefinitions
    })

    console.log('Claude stop_reason:', response.stop_reason)
    console.log('Claude response:', JSON.stringify(response.content, null, 2))

    // Preserve Claude's complete response as an assistant message.
    messages.push({ role: 'assistant', content: response.content })

    if (response.stop_reason === 'end_turn') {
      const finalText = response.content.find((block) => block.type === 'text')
      console.log('\nFinal answer:', finalText.text)
      return
    }

    const toolRequests = response.content.filter((block) => block.type === 'tool_use')
    const toolResults = []

    for (const request of toolRequests) {
      const handler = handlers[request.name]

      if (!handler) {
        toolResults.push({
          type: 'tool_result',
          tool_use_id: request.id,
          is_error: true,
          content: `No handler exists for ${request.name}`
        })
        continue
      }

      // Ordinary deterministic JavaScript executes here. There is no LLM here.
      const result = await handler(request.input)
      console.log(`Handler ${request.name} returned:`, result)

      toolResults.push({
        type: 'tool_result',
        tool_use_id: request.id,
        content: String(result)
      })
    }

    // Tool results come from outside Claude, so the API represents them in a
    // separate user message. The IDs pair results with their requests.
    messages.push({ role: 'user', content: toolResults })
  }

  throw new Error('Safety limit reached before Claude returned end_turn')
}

await runAgentLoop()

