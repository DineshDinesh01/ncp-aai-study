import { Question } from '../types';

export const domain8Questions: Question[] = [
  { id: 8001, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Circuit Breaker', difficulty: 'medium', keywords: ['circuit breaker', 'open', 'closed', 'half-open', 'resilience'],
    question: 'A circuit breaker in agent systems transitions to the "open" state when:',
    options: { A: 'An electrical circuit is completed for higher performance', B: 'Failure rate exceeds a threshold, stopping requests to a failing service to allow it to recover', C: 'The agent opens a file for reading', D: 'The system load exceeds capacity' },
    answer: 'B', explanation: 'Circuit breakers track failure rates. Open state stops all requests to a failing service (fail fast), preventing cascade failures. After timeout, it moves to half-open to test recovery.' },

  { id: 8002, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Fallback Mechanisms', difficulty: 'medium', keywords: ['fallback', 'graceful degradation', 'cached', 'alternative'],
    question: 'Graceful degradation in AI agent systems means:',
    options: { A: 'The system degrades its hardware gracefully during shutdown', B: 'Providing reduced but functional service when primary components fail, rather than complete outage', C: 'Gradually reducing model quality over time', D: 'Degrading user experience intentionally to save costs' },
    answer: 'B', explanation: 'Graceful degradation provides fallbacks: if the primary LLM fails, use a cached response; if a tool fails, inform the user rather than crashing; reduced capability beats zero capability.' },

  { id: 8003, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Timeout Handling', difficulty: 'easy', keywords: ['timeout', 'deadline', 'SLA', 'request timeout'],
    question: 'Why must AI agent systems set timeouts on LLM API calls?',
    options: { A: 'To reduce token costs by stopping long generations', B: 'To prevent indefinite blocking when services are slow or hung, enabling timely error handling', C: 'To limit the length of generated responses', D: 'Timeouts are not needed for AI systems' },
    answer: 'B', explanation: 'Without timeouts, a slow or hung LLM API call blocks the agent indefinitely. Timeouts enable fail-fast behavior, allowing retries or fallbacks within acceptable latency budgets.' },

  { id: 8004, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Retry Strategies', difficulty: 'medium', keywords: ['retry', 'idempotent', 'at-least-once', 'exactly-once'],
    question: 'Before implementing automatic retries for failed agent actions, the key safety check is:',
    options: { A: 'Whether the retry will be faster than the original attempt', B: 'Whether the action is idempotent (safe to repeat) to avoid duplicate side effects', C: 'Whether the action was logged before failing', D: 'Whether the failure was due to a 4xx error code' },
    answer: 'B', explanation: 'Retrying non-idempotent actions (like "send email" or "place order") can cause duplicates. Only retry idempotent operations (reads, searches) or implement exactly-once semantics.' },

  { id: 8005, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Dead Letter Queue', difficulty: 'hard', keywords: ['DLQ', 'dead letter', 'message queue', 'poison message'],
    question: 'A Dead Letter Queue (DLQ) in agentic messaging systems is used to:',
    options: { A: 'Queue messages from deceased users', B: 'Capture messages that repeatedly fail processing for later inspection and remediation', C: 'Prioritize urgent messages at the front of the queue', D: 'Store completed successfully processed messages' },
    answer: 'B', explanation: 'DLQs receive messages that fail processing after max retries. They prevent poison messages from blocking queues and enable offline debugging of systematically failing inputs.' },

  { id: 8006, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Health Monitoring', difficulty: 'easy', keywords: ['health check', 'heartbeat', 'uptime', 'monitoring'],
    question: 'Agent health monitoring should track which metrics? (Choose two)',
    options: { A: 'Request success/failure rates and error types', B: 'The agent developer\'s heart rate', C: 'Response time distributions (P50, P95, P99)', D: 'The number of questions in the training dataset' },
    answer: 'AC', explanation: 'Success/error rates detect functional failures. Response time percentiles detect performance degradation. Both are essential SLO indicators for production agents.' },

  { id: 8007, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Error Classification', difficulty: 'medium', keywords: ['4xx', '5xx', 'transient', 'permanent', 'error types'],
    question: 'In agent error handling, transient errors differ from permanent errors in that:',
    options: { A: 'Transient errors are more serious and require immediate escalation', B: 'Transient errors are temporary (network timeout, rate limit) and worth retrying; permanent errors (bad input) should not be retried', C: 'Transient errors only occur in cloud deployments', D: 'There is no meaningful distinction for AI agents' },
    answer: 'B', explanation: 'Retry strategy depends on error type. Rate limits (429), timeouts (504), and server errors (503) are transient — retry. Bad request (400), not found (404), and auth errors (401) are permanent — don\'t retry.' },

  { id: 8008, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Bulkhead Pattern', difficulty: 'hard', keywords: ['bulkhead', 'isolation', 'resource pool', 'failure isolation'],
    question: 'The bulkhead pattern applied to AI agent systems involves:',
    options: { A: 'Adding physical barriers to data centers', B: 'Isolating resource pools (thread pools, connection pools) per service to prevent one failing service from exhausting shared resources', C: 'Using bulk processing for efficiency', D: 'Separating training and inference workloads' },
    answer: 'B', explanation: 'Named after ship bulkheads, this pattern partitions resources so a failing or overloaded component (e.g., slow embedding service) can\'t exhaust shared resources and bring down the entire system.' },

  { id: 8009, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Saga Pattern', difficulty: 'hard', keywords: ['saga', 'distributed transaction', 'compensation', 'rollback'],
    question: 'The Saga pattern handles failures in multi-step agent workflows by:',
    options: { A: 'Telling a story about the failure to the user', B: 'Executing compensating transactions to undo completed steps when a later step fails', C: 'Restarting the entire workflow from scratch', D: 'Parallel execution of all workflow steps' },
    answer: 'B', explanation: 'Sagas break distributed transactions into local transactions with compensating actions (book hotel → compensation: cancel hotel). If step N fails, steps N-1 through 1 compensations undo prior work.' },

  { id: 8010, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Rate Limit Handling', difficulty: 'medium', keywords: ['rate limit', '429', 'Retry-After', 'backoff'],
    question: 'When an LLM API returns HTTP 429 (Too Many Requests), the agent should:',
    options: { A: 'Immediately retry with the same request', B: 'Read the Retry-After header and wait the specified time before retrying, using exponential backoff', C: 'Switch immediately to a different API provider', D: 'Log the error and give up' },
    answer: 'B', explanation: 'Respecting Retry-After headers prevents amplifying the rate limit problem. Exponential backoff with jitter spreads retries, reducing thundering herd effects during recovery.' },

  { id: 8011, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Context Length Errors', difficulty: 'medium', keywords: ['context length', 'token limit', 'overflow', 'truncation'],
    question: 'When an agent encounters a context length exceeded error, the recommended handling is:',
    options: { A: 'Increase the model\'s context limit by changing a parameter', B: 'Implement hierarchical summarization or context compression, then retry with a reduced context', C: 'Split the user\'s message into smaller parts without context', D: 'Return an error to the user without attempting recovery' },
    answer: 'B', explanation: 'Context overflow requires compression — summarize older parts of context, reduce retrieved chunk count, or use a longer-context model — then retry. Simply splitting messages loses coherence.' },

  { id: 8012, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Idempotency Keys', difficulty: 'hard', keywords: ['idempotency', 'key', 'duplicate', 'prevention'],
    question: 'Idempotency keys in agent API calls prevent:',
    options: { A: 'Identical responses to identical questions', B: 'Duplicate side effects when the same operation is retried due to a timeout or network failure', C: 'Identical embeddings for identical text', D: 'Duplicate messages in conversation history' },
    answer: 'B', explanation: 'Idempotency keys (unique ID per request) allow APIs to detect and safely ignore duplicate requests, enabling safe retry without side effects like double-charging or double-sending.' },

  { id: 8013, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Observability', difficulty: 'medium', keywords: ['observability', 'logs', 'metrics', 'traces', 'three pillars'],
    question: 'The three pillars of observability for AI agent systems are:',
    options: { A: 'Accuracy, Speed, Cost', B: 'Logs (events), Metrics (aggregated measurements), Traces (distributed request paths)', C: 'Model, View, Controller', D: 'GPU, CPU, RAM monitoring' },
    answer: 'B', explanation: 'Logs capture discrete events, metrics track aggregated time-series performance, traces follow requests across distributed service boundaries — together providing full system observability.' },

  { id: 8014, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Error Budgets', difficulty: 'medium', keywords: ['error budget', 'SLO', 'SLA', 'reliability'],
    question: 'An error budget in SRE terms represents:',
    options: { A: 'The financial budget allocated for handling errors', B: 'The acceptable amount of unreliability (1 - SLO target) that can be spent before reliability work must pause feature development', C: 'The maximum number of errors per day allowed', D: 'The time budget for fixing individual errors' },
    answer: 'B', explanation: 'Error budget = 1 - SLO target. If SLO is 99.9%, the error budget is 0.1% downtime (~43 min/month). When budget is exhausted, reliability takes priority over new features.' },

  { id: 8015, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Chaos Engineering', difficulty: 'hard', keywords: ['chaos engineering', 'fault injection', 'resilience testing'],
    question: 'Chaos engineering for AI agent systems involves:',
    options: { A: 'Running agents with intentionally bad prompts to test response quality', B: 'Deliberately injecting failures (API timeouts, network partitions) into production to verify resilience mechanisms', C: 'Testing agents under chaotic, rapidly changing business requirements', D: 'Introducing random delays in token generation for realism' },
    answer: 'B', explanation: 'Chaos engineering (e.g., Netflix Chaos Monkey) proactively introduces failures in production or staging to validate that circuit breakers, retries, and fallbacks actually work under real conditions.' },

  { id: 8016, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Structured Logging', difficulty: 'easy', keywords: ['structured logging', 'JSON logs', 'correlation ID', 'searchable'],
    question: 'Structured logging (JSON format) for agent systems is preferred because:',
    options: { A: 'JSON logs are smaller than text logs', B: 'Structured fields enable programmatic parsing, querying, and alerting by log aggregation systems', C: 'JSON is the fastest format to write', D: 'Human readability is the primary benefit' },
    answer: 'B', explanation: 'JSON logs can be ingested by Elasticsearch, Splunk, or CloudWatch with field-level indexing. Filtering by agent_id, error_type, or trace_id across millions of log lines is then trivial.' },

  { id: 8017, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Async Error Handling', difficulty: 'medium', keywords: ['async', 'exception', 'asyncio', 'error propagation'],
    question: 'In async Python agent code, unhandled exceptions in asyncio tasks:',
    options: { A: 'Automatically bubble up to the main thread', B: 'Are silently swallowed unless you await the task or attach a done callback with exception handling', C: 'Crash the entire Python process immediately', D: 'Trigger automatic retry of the task' },
    answer: 'B', explanation: 'Asyncio task exceptions are not automatically propagated — they must be observed via awaiting the task or using task.add_done_callback(). Unobserved exceptions cause subtle silent failures.' },

  { id: 8018, domain: 8, domainName: 'Reliability & Error Handling', topic: 'SLA Monitoring', difficulty: 'medium', keywords: ['SLA', 'SLO', 'alerting', 'incident'],
    question: 'An SLO (Service Level Objective) alert for an AI agent should fire when:',
    options: { A: 'A single request fails', B: 'The error rate or latency exceeds the defined threshold, threatening the SLO burn rate', C: 'GPU utilization exceeds 80%', D: 'A developer pushes code to the repository' },
    answer: 'B', explanation: 'SLO-based alerting uses error budget burn rate — alert when the current failure/latency rate would exhaust the monthly error budget within a short window (e.g., 1 hour).' },

  { id: 8019, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Testing Error Paths', difficulty: 'medium', keywords: ['error path testing', 'negative tests', 'edge cases'],
    question: 'Testing error paths in agent systems is important because:',
    options: { A: 'Error paths are never reached in production', B: 'Error handling code often contains bugs that compound failures; untested paths fail unexpectedly under load', C: 'Error testing increases code coverage metrics artificially', D: 'Error paths only matter for financial applications' },
    answer: 'B', explanation: 'Error handling is complex and rarely exercised during happy-path development. Untested error paths often contain bugs that manifest at the worst time (under load, incident response).' },

  { id: 8020, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Content Filtering Errors', difficulty: 'medium', keywords: ['content filter', 'safety error', 'moderation', 'handling'],
    question: 'When an LLM API returns a content filtering error for a legitimate user request, the agent should:',
    options: { A: 'Expose the internal filter reason to the user verbatim', B: 'Attempt to rephrase the request to avoid the filter trigger and inform the user of the issue gracefully', C: 'Silently retry the exact same request', D: 'Log the user\'s account for suspicious activity' },
    answer: 'B', explanation: 'Content filter false positives on legitimate requests should be handled gracefully — attempt rephrasing, inform the user that processing encountered an issue, and offer alternatives.' },
];
