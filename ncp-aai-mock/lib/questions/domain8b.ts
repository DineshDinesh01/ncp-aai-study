import { Question } from '../types';

export const domain8bQuestions: Question[] = [
  { id: 8021, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Distributed Saga', difficulty: 'hard', keywords: ['saga', 'choreography', 'orchestration', 'distributed'],
    question: 'Choreography-based sagas differ from orchestration-based sagas in that:',
    options: { A: 'Choreography requires a central coordinator; orchestration does not', B: 'Choreography uses events (services react to events); orchestration uses a central coordinator that directs each service', C: 'They are identical patterns with different names', D: 'Choreography is only for dance performance AI' },
    answer: 'B', explanation: 'Choreography: services publish events and react to others\' events (decentralized). Orchestration: a saga orchestrator explicitly commands each service step (centralized, easier to debug but a potential bottleneck).' },

  { id: 8022, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Graceful Shutdown', difficulty: 'medium', keywords: ['graceful shutdown', 'SIGTERM', 'drain', 'in-flight'],
    question: 'Graceful shutdown for AI agent services ensures:',
    options: { A: 'Services shut down only when no users are connected', B: 'In-flight requests complete processing before the service stops, preventing partial responses or corrupted state', C: 'Services restart automatically after shutdown', D: 'Graceful means shutdown takes at least 30 seconds' },
    answer: 'B', explanation: 'Graceful shutdown: receive SIGTERM → stop accepting new requests → drain in-flight requests → flush buffers → clean up connections → exit. Prevents abrupt cutoffs that leave users with partial/corrupted responses.' },

  { id: 8023, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Failure Budget', difficulty: 'medium', keywords: ['failure budget', 'allowance', 'testing', 'chaos'],
    question: 'A failure budget approach to reliability means:',
    options: { A: 'Budgeting money for handling failures', B: 'Accepting that some failures are acceptable and testing resilience by deliberately spending failure budget in controlled experiments', C: 'Only fixing failures that are within the allocated budget', D: 'Avoiding all failures at any cost' },
    answer: 'B', explanation: 'Failure budget: if your SLO is 99.9%, 0.1% downtime is "available" to spend. Use it for risk: deploy new features, run chaos experiments. When budget runs out, freeze new deployments until reliability improves.' },

  { id: 8024, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Recovery Testing', difficulty: 'medium', keywords: ['recovery testing', 'DR drill', 'runbook', 'incident'],
    question: 'Disaster recovery drills for AI agent systems should:',
    options: { A: 'Only be run during actual incidents to avoid disruption', B: 'Be run regularly in staging to validate runbooks, measure actual RTO, and train the team before real incidents', C: 'Be documented but never actually executed', D: 'Only be run by the original developers' },
    answer: 'B', explanation: 'DR drills validate runbooks are current and correct, measure actual recovery time vs target RTO, and train teams on procedures before the pressure of a real incident.' },

  { id: 8025, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Agent Monitoring Metrics', difficulty: 'medium', keywords: ['token cost', 'success rate', 'hallucination rate', 'agent metrics'],
    question: 'Which operational metrics are most valuable for monitoring production AI agents? (Choose two)',
    options: { A: 'Task completion rate — did the agent successfully fulfill user requests?', B: 'Model parameter count of the deployed model', C: 'Token usage and cost per session to track efficiency and budget', D: 'Number of developers who contributed to the agent code' },
    answer: 'AC', explanation: 'Task completion rate measures effectiveness (are users getting help?). Token cost tracks operational efficiency and budget compliance. Both are directly actionable operational metrics.' },

  { id: 8026, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Timeout Hierarchy', difficulty: 'hard', keywords: ['timeout', 'hierarchy', 'connection', 'request', 'session'],
    question: 'A proper timeout hierarchy for AI agent services has:',
    options: { A: 'One global timeout for all operations', B: 'Nested timeouts: connection timeout < request timeout < session timeout, each protecting a different layer', C: 'Only network timeouts since LLM timeouts aren\'t configurable', D: 'No timeouts — let operations complete naturally' },
    answer: 'B', explanation: 'Connection timeout (TCP/TLS handshake, typically 5s), request timeout (single LLM call, 30-120s), session timeout (full multi-turn interaction, 5-30 min) — each prevents a different class of hanging operations.' },

  { id: 8027, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Error Rates', difficulty: 'medium', keywords: ['error rate', 'threshold', 'alerting', 'SLO'],
    question: 'A 5xx error rate alert threshold for a production AI agent should trigger at:',
    options: { A: 'The first single error seen', B: 'A sustained rate above the baseline that threatens the SLO error budget (e.g., >1% for 5 minutes)', C: '100% error rate only — anything less is acceptable', D: 'Once per hour regardless of rate' },
    answer: 'B', explanation: 'Single errors are expected noise. Alerts should trigger on sustained elevated rates that threaten SLOs: e.g., >1% error rate for 5 minutes indicates a systemic issue requiring investigation.' },

  { id: 8028, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Content Safety Errors', difficulty: 'medium', keywords: ['content safety', 'blocked', 'moderation', 'false positive'],
    question: 'When an AI agent\'s content safety filter blocks a legitimate medical professional query, the recovery strategy should be:',
    options: { A: 'Disable all content filtering permanently', B: 'Implement domain-specific exemption policies with role-based trust levels and logging of all exemptions for audit', C: 'Escalate all medical queries to human review permanently', D: 'Tell users to rephrase their query without guidance' },
    answer: 'B', explanation: 'Domain exemptions with RBAC: verified medical professionals access a less restricted policy tier. All exemption usage is logged for audit to detect misuse. Balances safety with professional utility.' },

  { id: 8029, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Cascading Failures', difficulty: 'hard', keywords: ['cascading failure', 'dependency', 'isolation', 'bulkhead'],
    question: 'Cascading failure in multi-agent systems occurs when:',
    options: { A: 'Agents generate cascading improvements in quality', B: 'One failing service overwhelms neighboring services through retry storms, connection pool exhaustion, or queue backup', C: 'Multiple agents cascade their outputs into a final answer', D: 'Cascade is a normal operating mode for agent pipelines' },
    answer: 'B', explanation: 'Cascading failures: slow DB → agent retries → DB more overloaded → connection pool exhausts → agent queue fills → orchestrator times out → user-facing errors. Bulkheads and circuit breakers prevent cascade.' },

  { id: 8030, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Incident Response', difficulty: 'medium', keywords: ['incident', 'severity', 'response', 'postmortem'],
    question: 'A blameless postmortem after an AI agent incident focuses on:',
    options: { A: 'Identifying which individual made the mistake and holding them accountable', B: 'Systemic improvements to processes, architecture, and tooling that prevent recurrence', C: 'Documenting incidents only for legal protection', D: 'Proving the incident was caused by external factors' },
    answer: 'B', explanation: 'Blameless postmortems focus on system failures not individual blame — identifying what broke, why the system allowed it, and what process/architecture/monitoring changes prevent recurrence.' },

  { id: 8031, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Circuit Breaker States', difficulty: 'medium', keywords: ['circuit breaker', 'half-open', 'probe', 'recovery'],
    question: 'The "half-open" circuit breaker state serves to:',
    options: { A: 'Half of requests succeed in this state by design', B: 'Probe a recently failed service by allowing a limited number of test requests to check if recovery has occurred', C: 'Partially open the connection for lower bandwidth', D: 'Handle exactly 50% of traffic during maintenance' },
    answer: 'B', explanation: 'Half-open: after cooldown timeout, allow 1-few probe requests. If they succeed → transition to Closed (normal). If they fail → back to Open (another cooldown). Prevents premature recovery assumptions.' },

  { id: 8032, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Structured Error Responses', difficulty: 'easy', keywords: ['error response', 'RFC 7807', 'problem details', 'structured'],
    question: 'Structured error responses (RFC 7807 Problem Details) for AI agent APIs provide:',
    options: { A: 'Automatic error correction built into the HTTP standard', B: 'Machine-parseable error details enabling programmatic error handling by API consumers', C: 'Encrypted error messages for security', D: 'Shorter error messages to reduce bandwidth' },
    answer: 'B', explanation: 'RFC 7807 defines a standard JSON error format with type, title, status, detail, instance — enabling API consumers to programmatically handle specific error types without parsing error strings.' },

  { id: 8033, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Alerting Best Practices', difficulty: 'medium', keywords: ['alerting', 'alert fatigue', 'actionable', 'pager'],
    question: 'Alert fatigue in AI agent operations is caused by:',
    options: { A: 'Having too many engineers on-call', B: 'Too many low-signal alerts requiring no immediate action, causing engineers to ignore or delay responding to alerts', C: 'Alerts that are too descriptive', D: 'On-call engineers not getting enough sleep' },
    answer: 'B', explanation: 'Alert fatigue: too many non-actionable alerts → engineers learn to ignore alerts → critical alerts missed. Principle: every alert should be actionable, paging-worthy, and require investigation.' },

  { id: 8034, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Network Resilience', difficulty: 'medium', keywords: ['network partition', 'retry', 'resilience', 'timeout'],
    question: 'The recommended response to network partition errors in distributed agent systems is:',
    options: { A: 'Immediately give up and return an error to the user', B: 'Apply exponential backoff retry, use circuit breaker to prevent cascade, and degrade gracefully if partition persists', C: 'Increase timeout values indefinitely until connection resumes', D: 'Restart all agent instances simultaneously' },
    answer: 'B', explanation: 'Network partitions are transient — retry with backoff handles brief outages. Circuit breakers prevent amplification during extended partitions. Graceful degradation (cached responses, reduced functionality) serves users through longer partitions.' },

  { id: 8035, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Model Serving Reliability', difficulty: 'medium', keywords: ['model serving', 'redundancy', 'replica', 'failover'],
    question: 'To achieve high availability for LLM inference in production, you should deploy:',
    options: { A: 'A single large GPU instance for maximum performance', B: 'Multiple replicas with health checks, load balancing, and automatic failover when a replica becomes unhealthy', C: 'Active-passive with manual failover only', D: 'No redundancy is needed since cloud providers have 100% uptime' },
    answer: 'B', explanation: 'Single instance = single point of failure. HA requires: multiple replicas (N+1 minimum), health checks (liveness/readiness probes), automatic traffic failover when a replica fails health checks.' },

  { id: 8036, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Error Propagation', difficulty: 'hard', keywords: ['error propagation', 'exception', 'boundary', 'isolation'],
    question: 'The principle of "error containment" in multi-agent systems means:',
    options: { A: 'Collecting all errors in a central container', B: 'Errors in one agent should not propagate to crash or degrade other agents — each agent handles its own failures independently', C: 'Containing error messages to 100 characters', D: 'Using Docker containers to isolate errors physically' },
    answer: 'B', explanation: 'Error containment prevents blast radius expansion: a failing research agent should return an error result, not crash the orchestrator. Try/catch at agent boundaries, fallbacks, and independent failure domains achieve this.' },

  { id: 8037, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Async Error Patterns', difficulty: 'hard', keywords: ['async error', 'result type', 'either monad', 'error handling'],
    question: 'Using Result types (Ok/Error) or Either monads in agent code improves error handling by:',
    options: { A: 'Improving performance by avoiding exception overhead', B: 'Making error paths explicit in the type system — callers must handle both success and error cases, preventing silent failures', C: 'Monads automatically fix errors', D: 'Only applicable in functional programming languages' },
    answer: 'B', explanation: 'Result types make errors first-class: `result = agent.execute(); result.match(ok=process, error=handle)`. Unlike exceptions (invisible until thrown), Result forces explicit error handling at call sites.' },

  { id: 8038, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Reliability Patterns', difficulty: 'medium', keywords: ['availability', 'fault tolerance', 'patterns', 'retry'],
    question: 'Which resilience patterns are essential for production AI agent pipelines? (Choose two)',
    options: { A: 'Circuit breakers to prevent cascade failures when downstream services fail', B: 'Unlimited retries for all operations to ensure eventual success', C: 'Bulkheads to isolate failures in one component from affecting others', D: 'Synchronous-only communication to simplify error handling' },
    answer: 'AC', explanation: 'Circuit breakers prevent cascade (fail fast when a service is down). Bulkheads isolate failure domains (one slow tool doesn\'t exhaust all threads). Together they form the core of resilient AI agent infrastructure.' },

  { id: 8039, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Error Classification Strategies', difficulty: 'medium', keywords: ['classification', 'categorize', 'systematic', 'triage'],
    question: 'Systematic error classification for AI agents should categorize by:',
    options: { A: 'Alphabetical order of error messages', B: 'Severity (critical/high/medium/low), type (transient/permanent/user_error), and source (LLM/tool/network/auth)', C: 'Time of day the error occurred', D: 'Length of the error message' },
    answer: 'B', explanation: 'Multi-dimensional classification: severity drives response urgency, type drives retry strategy (transient=retry, permanent=don\'t, user_error=respond gracefully), source drives which team investigates.' },

  { id: 8040, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Monitoring Agent Costs', difficulty: 'medium', keywords: ['cost monitoring', 'budget', 'alert', 'anomaly'],
    question: 'Cost anomaly detection for AI agent deployments should alert when:',
    options: { A: 'Any single request costs more than average', B: 'Token consumption or API spend deviates significantly from historical baselines, indicating runaway loops or abuse', C: 'Monthly costs exceed last month by any amount', D: 'The most expensive request of the day occurs' },
    answer: 'B', explanation: 'Runaway agent loops and prompt injection attacks can cause sudden 10-100x cost spikes. Anomaly detection on token consumption rate catches these before they incur massive unexpected bills.' },
];
