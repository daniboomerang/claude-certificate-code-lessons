// PSEUDOCODE — architecture only; no SDK or API call is executed.

type Session = {
  verifiedCustomerId?: string
}

const session: Session = {}

function getCustomer(email: string) {
  const customer = { id: 'cus_123', verified: true, email }

  if (customer.verified) session.verifiedCustomerId = customer.id
  return customer
}

function processRefund(customerId: string, amount: number) {
  // This is the enforcement point. A prompt cannot replace this check.
  if (session.verifiedCustomerId !== customerId) {
    return {
      error: 'BLOCKED: verify this customer before processing a refund.'
    }
  }

  return { status: 'REFUND_PROCESSED', customerId, amount }
}

// Even if Claude requests this first, code refuses it.
processRefund('cus_123', 50)
// => { error: 'BLOCKED: verify this customer before processing a refund.' }

getCustomer('customer@example.com')
processRefund('cus_123', 50)
// => { status: 'REFUND_PROCESSED', customerId: 'cus_123', amount: 50 }

function createHandoff() {
  // This object is all the human gets: no transcript is assumed.
  return {
    customerId: session.verifiedCustomerId,
    conversationSummary: 'Customer requests a refund and disputes a billing charge.',
    rootCause: 'The duplicate charge needs a human billing review.',
    refundAmount: 50,
    recommendedAction: 'Review the duplicate charge and approve or reject the refund.'
  }
}
