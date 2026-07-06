import { Question } from '../types';

export const domain8dQuestions: Question[] = [
  { id: 8061, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Failure Detection', difficulty: 'medium', keywords: ['health check', 'liveness', 'readiness', 'probe'],
    question: 'Kubernetes liveness vs readiness probes serve different purposes:',
    options: { A: 'They are synonymous and interchangeable', B: 'Liveness: is the container alive? (restart if failed). Readiness: is it ready to serve traffic? (remove from load balancer if not ready, don\'t restart)', C: 'Readiness probes determine if the container should be restarted', D: 'Liveness probes are only for stateful applications' },
    answer: 'B', explanation: 'Liveness: container in deadlock → kubelet kills & restarts it. Readiness: model loading, warming up → container excluded from Service endpoints until ready. For AI: readiness probe calls /health or /v1/health/ready, returns 200 when model fully loaded.' },

  { id: 8062, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Distributed Tracing', difficulty: 'medium', keywords: ['distributed tracing', 'Jaeger', 'Zipkin', 'trace ID'],
    question: 'Distributed tracing across multi-agent AI pipelines provides:',
    options: { A: 'Geographic tracking of request origins', B: 'End-to-end request visibility with span hierarchies — showing exactly where latency was spent (LLM call? Tool execution? Agent routing?) and where errors occurred', C: 'Only applicable to microservices, not agents', D: 'Distributed tracing requires proprietary NVIDIA tooling' },
    answer: 'B', explanation: 'Distributed tracing: trace_id propagated through all agents and services → Jaeger/Zipkin visualizes: user_request (root) → orchestrator → specialist_agent_1 → llm_call (800ms) + tool_call (200ms). Immediate visibility into performance and failure location across complex pipelines.' },

  { id: 8063, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Bulkhead Pattern', difficulty: 'hard', keywords: ['bulkhead', 'isolation', 'thread pool', 'resource'],
    question: 'The bulkhead pattern for AI agent resilience prevents:',
    options: { A: 'Data leaks between user sessions', B: 'One failing AI component from exhausting shared resources and cascading failures — by isolating each service\'s resource pool (connections, threads, memory)', C: 'Bulkheads are only for database connection pooling', D: 'The pattern trades reliability for performance' },
    answer: 'B', explanation: 'Bulkhead: LLM API has dedicated thread pool (max 20 threads), vector DB has separate pool (max 10). If LLM API is slow/down, only those 20 threads are blocked. Vector DB remains fully available. Without bulkheads: one slow service drains all threads → system-wide failure.' },

  { id: 8064, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Error Budget Burn Rate', difficulty: 'hard', keywords: ['error budget', 'burn rate', 'SLO', 'alerting'],
    question: 'SLO error budget burn rate alerts trigger when:',
    options: { A: 'The error rate exceeds a fixed threshold in the last 5 minutes', B: 'The current error rate would exhaust the monthly error budget before the month ends — e.g., 50x normal burn rate would exhaust 30-day budget in 14 hours', C: 'Any single error occurs in production', D: 'CPU usage exceeds 80% for 5 minutes' },
    answer: 'B', explanation: 'Burn rate alerting: monthly_budget = 1 - SLO = 0.1% errors allowed. If current_rate = 50x_normal → budget exhausted in 30days/50 = 14.4 hours → page oncall immediately. 5x_rate → budget exhausted in 6 days → Slack warning. Burn rate links error rate to business impact.' },

  { id: 8065, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Synthetic Monitoring', difficulty: 'medium', keywords: ['synthetic monitoring', 'canary probe', 'uptime', 'black box'],
    question: 'Synthetic monitoring for AI agents provides:',
    options: { A: 'Monitoring with simulated/fake traffic to reduce costs', B: 'Scheduled automated test requests that continuously verify critical user flows are working — detecting issues before real users encounter them', C: 'Only applicable to non-production environments', D: 'Synthetic monitoring replaces real user monitoring' },
    answer: 'B', explanation: 'Synthetic monitoring: schedule "probe" every 30 seconds → ask "What is the capital of France?" → verify response contains "Paris" → measure latency. Detects: AI returning wrong answers (quality), slow responses (performance), complete failures. Alerts before users report issues.' },

  { id: 8066, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Graceful Degradation Design', difficulty: 'medium', keywords: ['graceful degradation', 'feature toggle', 'fallback', 'degraded mode'],
    question: 'Progressive feature degradation for AI agents means:',
    options: { A: 'Degrading AI quality over time as models age', B: 'Disabling non-essential features incrementally under load: primary AI → simplified AI → cached responses → static responses — maintaining core functionality', C: 'Permanently removing features that cause errors', D: 'Degradation should never occur in production systems' },
    answer: 'B', explanation: 'Progressive degradation tiers: Tier 1: full AI with all tools. Tier 2: AI without web search (slow). Tier 3: lightweight model instead of full model. Tier 4: pre-cached response for common queries. Tier 5: "Service busy" with callback. Each tier maintains more functionality than full failure.' },

  { id: 8067, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Recovery Testing', difficulty: 'hard', keywords: ['disaster recovery', 'recovery time', 'RTO', 'RPO'],
    question: 'Recovery Time Objective (RTO) and Recovery Point Objective (RPO) for AI systems:',
    options: { A: 'RTO = maximum data loss; RPO = maximum downtime', B: 'RTO = maximum acceptable downtime before service restored; RPO = maximum acceptable data loss — AI systems need both: model availability (RTO) and conversation history recovery (RPO)', C: 'RTO and RPO only apply to databases, not AI services', D: 'Both metrics are determined during incidents, not planned in advance' },
    answer: 'B', explanation: 'AI DR planning: RTO for model service ("model must be back in < 15 minutes"), RPO for conversation data ("may lose last 5 minutes of conversation"). GPU provisioning complexity means AI RTOs are typically longer than stateless services. Test DR quarterly with actual failover drills.' },

  { id: 8068, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Rate Limiting Patterns', difficulty: 'medium', keywords: ['rate limiting', 'token bucket', 'sliding window', 'per-user'],
    question: 'Per-user rate limiting for AI agents prevents:',
    options: { A: 'Users from accessing the system too quickly', B: 'Single users from monopolizing AI resources — ensuring fair access for all users and protecting the system from abuse or runaway automated clients', C: 'Rate limiting increases latency for all users equally', D: 'Rate limiting is only needed for external-facing APIs' },
    answer: 'B', explanation: 'Per-user rate limits: user A hits 100 req/min limit due to bulk automation → user A throttled, users B-Z unaffected. Without per-user limits: one abusive user degrades service for all. Implementation: Redis per-user counter with expiry, return 429 when exceeded.' },

  { id: 8069, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Incident Response Automation', difficulty: 'hard', keywords: ['runbook automation', 'auto-remediation', 'PagerDuty', 'self-healing'],
    question: 'Auto-remediation for common AI system incidents should:',
    options: { A: 'Automatically fix all detected issues without human oversight', B: 'Handle well-understood, low-risk fixes (restart unhealthy pod, clear model cache, scale up) while escalating novel or high-risk issues to humans', C: 'Never auto-remediate without multiple human approvals', D: 'Only apply to infrastructure issues, not AI-specific failures' },
    answer: 'B', explanation: 'Auto-remediation scope: safe automations: pod restart if OOM (well-understood), cache clear if stale responses detected, scale-up if queue depth exceeds threshold. Human escalation: novel error patterns, data corruption suspicion, cost anomalies. Reduces MTTR for routine incidents while preserving human judgment for complex ones.' },

  { id: 8070, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Testing in Production', difficulty: 'hard', keywords: ['production testing', 'dark launch', 'shadow traffic', 'safety'],
    question: 'Dark launching new AI agent versions (shadow mode) involves:',
    options: { A: 'Testing only during night hours to avoid user impact', B: 'Routing production traffic to both old and new systems in parallel, returning old system results to users while comparing new system outputs offline', C: 'Disabling user access during testing periods', D: 'Dark launching requires a completely separate production environment' },
    answer: 'B', explanation: 'Shadow/dark launch: production request → served by current system (user sees this response) + forked to new system (response discarded). Compare: does new system agree? Where do they differ? How much faster/slower? Zero user risk while testing on real production traffic distribution.' },
];
