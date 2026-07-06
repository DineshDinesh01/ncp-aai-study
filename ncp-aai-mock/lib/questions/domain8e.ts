import { Question } from '../types';

export const domain8eQuestions: Question[] = [
  { id: 8071, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Error Categorization', difficulty: 'medium', keywords: ['error taxonomy', 'transient', 'permanent', 'classification'],
    question: 'Distinguishing transient from permanent errors in AI systems enables:',
    options: { A: 'Only transient errors should be logged for debugging', B: 'Correct retry strategy: transient errors (network timeout, rate limit) → retry with backoff; permanent errors (invalid API key, bad request schema) → fail immediately without retry', C: 'All errors should be retried three times before failing', D: 'Error classification is only important for user-facing error messages' },
    answer: 'B', explanation: 'Transient errors: HTTP 429 (rate limit), 503 (service unavailable), 408 (timeout) → exponential backoff retry appropriate. Permanent errors: HTTP 400 (malformed request), 401 (unauthorized), 404 (not found) → retrying is wasteful, fix the request or credentials first.' },

  { id: 8072, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Timeout Hierarchy', difficulty: 'hard', keywords: ['timeout', 'nested', 'context', 'deadline'],
    question: 'Deadline propagation in nested AI agent calls requires:',
    options: { A: 'Each service sets its own independent timeout', B: 'Passing remaining time budget through the call chain so sub-calls cannot exceed the parent\'s deadline — preventing "timed out waiting for a timed-out call"', C: 'Timeouts should only be set at the top-level service', D: 'Deadline propagation is only needed for database calls' },
    answer: 'B', explanation: 'Deadline propagation: user request has 30s budget → orchestrator has 29s left → LLM call allocated 20s → tool call allocated 5s. If tool call takes 6s, it times out with enough context to report partial results up the chain. Without propagation: each timeout unaware of parent\'s remaining budget.' },

  { id: 8073, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Fallback Chains', difficulty: 'medium', keywords: ['fallback', 'chain', 'priority', 'degraded'],
    question: 'A fallback chain for AI model serving (primary → secondary → tertiary) should:',
    options: { A: 'Always use the cheapest model as primary', B: 'Order fallbacks by decreasing capability: full model → smaller model → cached response → static response — maintaining service at reduced quality vs total failure', C: 'All fallbacks must produce identical responses to the primary model', D: 'Fallback chains should be avoided as they hide system failures' },
    answer: 'B', explanation: 'Fallback chain: GPT-4 (primary, best quality) → GPT-3.5 (fallback, good quality) → rule-based response (minimal quality) → "Service temporarily unavailable, please retry" (fail-safe). Each tier adds resilience. Users get degraded service rather than error during outages.' },

  { id: 8074, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Chaos Engineering', difficulty: 'hard', keywords: ['chaos engineering', 'fault injection', 'game day', 'resilience'],
    question: 'Game Day exercises in AI system reliability involve:',
    options: { A: 'Scheduling team social events to improve morale', B: 'Planned, controlled disruption exercises where teams intentionally inject failures to test and improve system resilience and team response procedures', C: 'Game Days only test network failures, not AI-specific failures', D: 'Game Days should be run in production on Fridays for realism' },
    answer: 'B', explanation: 'Game Day for AI: team assembles → inject: LLM API outage (block outbound calls) → observe: does fallback chain activate? Does monitoring alert? Does oncall respond correctly? → measure: MTTD (time to detect), MTTR (time to resolve). Improve procedures based on findings.' },

  { id: 8075, domain: 8, domainName: 'Reliability & Error Handling', topic: 'SLI Definition', difficulty: 'medium', keywords: ['SLI', 'metric', 'definition', 'valid request'],
    question: 'Defining AI agent SLIs (Service Level Indicators) requires distinguishing:',
    options: { A: 'Only tracking successful vs failed HTTP requests', B: 'Valid requests (well-formed, authorized) vs invalid ones — SLI should measure good outcomes for valid requests only, excluding errors caused by the client', C: 'All requests regardless of cause count equally toward SLI', D: 'SLIs should exclude all requests that fail for any reason' },
    answer: 'B', explanation: 'SLI precision: exclude from denominator: rate-limited requests (client error), malformed requests (client error), unauthorized (client error). Include: all valid, authorized requests. SLI = (valid_requests_with_good_response) / (all_valid_authorized_requests). Prevents client errors from unfairly degrading SLI.' },

  { id: 8076, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Production Readiness', difficulty: 'medium', keywords: ['production readiness', 'PRR', 'checklist', 'review'],
    question: 'Production Readiness Reviews (PRR) for AI agent systems should verify:',
    options: { A: 'Only that the code compiles and tests pass', B: 'Observability (metrics, logs, traces), runbooks for common failure modes, load testing results, on-call rotation, escalation procedures, and rollback plan', C: 'PRRs are only needed for systems with >1M users', D: 'PRR approval allows bypassing monitoring requirements' },
    answer: 'B', explanation: 'AI PRR checklist: monitoring dashboards exist? Alerts defined? Runbooks written for top 5 failure modes? Load tested to 2x expected peak? Oncall trained? Rollback procedure documented and tested? Data privacy compliance verified? SLOs agreed with stakeholders? All must pass before production launch.' },

  { id: 8077, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Non-Functional Requirements', difficulty: 'medium', keywords: ['NFR', 'availability', 'latency', 'throughput'],
    question: 'Setting AI agent non-functional requirements (NFRs) should consider:',
    options: { A: 'Only the maximum theoretical performance of the hardware', B: 'Business impact of degradation: what latency makes users abandon? What error rate is acceptable? What\'s the cost of each additional 9 of availability?', C: 'NFRs are always standardized across all AI applications', D: 'NFRs should be maximized without considering cost implications' },
    answer: 'B', explanation: 'NFR derivation: user research shows >3s response causes 40% abandonment → latency NFR: p95 < 3s. Each 9 of availability costs $50K/year in redundancy → business decides 99.9% (3 nines) sufficient, not 99.99%. NFRs must be specific, measurable, and tied to business impact — not arbitrary targets.' },

  { id: 8078, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Error Propagation', difficulty: 'hard', keywords: ['error propagation', 'partial failure', 'compensation', 'saga'],
    question: 'Compensating transactions in long-running AI agent workflows handle:',
    options: { A: 'Paying users compensation for AI errors', B: 'Undoing completed steps when a later step fails in a multi-step workflow — "book flight succeeded, book hotel failed → cancel flight (compensation)"', C: 'Compensating transactions are only for financial systems', D: 'Compensation is automatic and requires no developer implementation' },
    answer: 'B', explanation: 'Saga pattern compensation: step 1 (send draft email OK) → step 2 (get approval OK) → step 3 (send to distribution list FAILED). Compensation: retract approval notification (undo step 2). Send draft email may not be undoable — use forward recovery instead. Design compensations for each step before implementing the saga.' },

  { id: 8079, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Retry Budgets', difficulty: 'hard', keywords: ['retry budget', 'storm', 'amplification', 'backoff'],
    question: 'Retry storms in distributed AI systems occur when:',
    options: { A: 'All users simultaneously retry failed requests after an outage', B: 'Coordinated retries amplify load: all clients retry at the same time → 10x traffic on recovering service → service re-fails → more retries. Mitigated by jittered exponential backoff', C: 'Retry storms only affect stateless services', D: 'Adding more retries always improves reliability' },
    answer: 'B', explanation: 'Retry storm: LLM service brief hiccup → 1000 clients all get timeout → all retry after 5s → 1000 concurrent retries overwhelm recovering service → service fails again → thundering herd. Fix: jitter = random(0, retry_delay) added to each retry → clients spread out their retries → service recovers smoothly.' },

  { id: 8080, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Observing AI Quality', difficulty: 'medium', keywords: ['quality metrics', 'proxy', 'leading indicator', 'signal'],
    question: 'Leading indicators of AI agent quality degradation (before users complain) include:',
    options: { A: 'Only monitoring customer support ticket volume', B: 'Upstream signals: increased token count in responses (rambling), response time increase, rate of tool call failures, embedding drift in user queries vs training distribution', C: 'Quality can only be measured through user satisfaction surveys', D: 'Quality indicators are model-specific and not generalizable' },
    answer: 'B', explanation: 'Leading quality indicators: response length suddenly increasing (model becoming verbose = quality regression), tool call failure rate spike (wrong tool selected or bad parameters = reasoning degradation), embedding drift (user queries shifting to new domain model wasn\'t trained on). Alert before users notice.' },
];
