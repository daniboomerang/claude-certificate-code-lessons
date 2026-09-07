// CCAR-F 1.2 — token-free hub-and-spoke orchestration simulation.

const REQUIRED = ['solar', 'wind', 'geothermal', 'tidal', 'biomass', 'fusion']

// Breadth is the coordinator's responsibility.
function decompose(topic) {
  if (topic === 'renewable energy technologies') return [...REQUIRED]
  throw new Error(`Add a decomposition rule for: ${topic}`)
}

// Every invocation gets a fresh, explicit context object. There is no shared memory.
function makeContext({ topic, goal, subtopic, priorResults = [] }) {
  return { topic, goal, subtopic, priorResults }
}

// Deterministic stand-ins for two isolated LLM subagents.
const subagents = {
  webSearch(context) {
    return { subtopic: context.subtopic, finding: `Web evidence about ${context.subtopic}` }
  },
  documentAnalysis(context) {
    // A deliberate first-pass failure makes the refinement loop visible.
    if (context.subtopic === 'biomass') return null
    return { subtopic: context.subtopic, finding: `Document evidence about ${context.subtopic}` }
  }
}

function assessCoverage(expected, results) {
  const covered = new Set(results.map((result) => result.subtopic))
  const missing = expected.filter((subtopic) => !covered.has(subtopic))
  return { missing, completeness: (expected.length - missing.length) / expected.length }
}

async function research(topic) {
  const goal = `Produce broad research about ${topic}`
  const subtopics = decompose(topic)
  const results = []
  const trace = []

  // The coordinator partitions work and invokes each spoke itself.
  for (const [index, subtopic] of subtopics.entries()) {
    const agentName = index < 3 ? 'webSearch' : 'documentAnalysis'
    const context = makeContext({ topic, goal, subtopic })
    trace.push(`coordinator -> ${agentName}: ${JSON.stringify(context)}`)
    const result = subagents[agentName](context)
    if (result) results.push(result)
  }

  // The coordinator evaluates and re-delegates; spokes never contact each other.
  let coverage = assessCoverage(subtopics, results)
  let refinement = 0
  const maxRefinements = 2

  while (coverage.missing.length > 0 && refinement < maxRefinements) {
    refinement += 1
    for (const subtopic of coverage.missing) {
      const context = makeContext({ topic, goal, subtopic, priorResults: [...results] })
      trace.push(`coordinator -> webSearch (refinement ${refinement}): ${subtopic}`)
      results.push(subagents.webSearch(context))
    }
    coverage = assessCoverage(subtopics, results)
  }

  return { topic, results, coverage, trace }
}

const report = await research('renewable energy technologies')

console.log(report.trace.join('\n'))
console.log('\nCovered:', report.results.map((result) => result.subtopic).join(', '))
console.log('Missing:', report.coverage.missing.join(', ') || 'none')
console.log('Completeness:', `${report.coverage.completeness * 100}%`)

if (report.coverage.completeness !== 1) throw new Error('Expected 100% coverage')

