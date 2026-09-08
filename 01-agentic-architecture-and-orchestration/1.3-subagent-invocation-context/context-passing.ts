// PSEUDOCODE — architecture only; no SDK or API call is executed.

type Finding = {
  claim: string
  source_url?: string
  document_name?: string
  page_number?: number
  confidence: 'low' | 'medium' | 'high'
  retrieved_by: 'web-researcher' | 'document-analyst'
}

const options = {
  allowedTools: ['Agent'], // Called Task in older exam material: spawning gate.
  agents: {
    'web-researcher': {
      description: 'Find web evidence with URLs and titles',
      prompt: 'Return Finding[] with source metadata.',
      tools: ['WebSearch']
    },
    'document-analyst': {
      description: 'Read documents and preserve page references',
      prompt: 'Return Finding[] with document and page metadata.',
      tools: ['Read']
    },
    synthesizer: {
      description: 'Write a report with a citation for every claim',
      prompt: 'Use only the complete Finding[] you receive.',
      tools: []
    }
  }
}

async function coordinator(topic: string) {
  // Conceptually: two Agent tool calls emitted in ONE coordinator response.
  const [webFindings, documentFindings]: Finding[][] = await Promise.all([
    Agent('web-researcher', { topic, goal: 'Find current web evidence' }),
    Agent('document-analyst', { topic, goal: 'Find document evidence' })
  ])

  // Preserve complete objects. Do NOT map findings to claim strings.
  const allFindings: Finding[] = [...webFindings, ...documentFindings]

  const report = await Agent('synthesizer', {
    topic,
    findings: allFindings
  })

  // System/code verifies the absolute requirement.
  assertEveryClaimHasSource(report)
  return report
}

