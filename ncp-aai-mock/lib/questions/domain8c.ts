import { Question } from '../types';

export const domain8cQuestions: Question[] = [
  { id: 8041, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Chaos Testing LLMs', difficulty: 'hard', keywords: ['chaos testing', 'LLM', 'adversarial', 'resilience'],
    question: 'LLM-specific chaos tests for agent systems should include:',
    options: { A: 'Only network failure scenarios', B: 'Injecting malformed LLM responses, timeout responses, and maximum token responses to validate agent error handling for all LLM failure modes', C: 'Only testing with production load', D: 'Chaos testing is too dangerous to run against LLM services' },
    answer: 'B', explanation: 'LLM chaos tests: inject 500 errors, truncated responses, valid JSON with wrong schema, responses exceeding token limits, responses with unusual characters. Validate the agent handles each gracefully without crashing or producing incorrect outputs.' },

  { id: 8042, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Idempotency Patterns', difficulty: 'medium', keywords: ['idempotency key', 'deduplication', 'safe retry', 'exactly-once'],
    question: 'Idempotency keys for agent API calls prevent:',
    options: { A: 'Duplicate API authentication', B: 'Duplicate side effects when clients retry on network failure — same idempotency key → server recognizes duplicate → returns original result without re-executing', C: 'Key reuse in encryption algorithms', D: 'Idempotency keys are only for payment processing' },
    answer: 'B', explanation: 'Idempotency key pattern: client generates unique key → sends with request. Server stores (key, result). On retry with same key: return stored result, don\'t re-execute. Enables safe retries for non-idempotent operations like agent task execution.' },

  { id: 8043, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Partial Success Handling', difficulty: 'medium', keywords: ['partial success', 'partial failure', 'compensation', 'retry'],
    question: 'Handling partial success in multi-step agent tasks requires:',
    options: { A: 'Failing the entire task if any step partially succeeds', B: 'Tracking which steps completed, storing intermediate results, and supporting resume-from-checkpoint rather than full restart on failure', C: 'Treating partial success as complete failure', D: 'Partial success should never occur in properly designed systems' },
    answer: 'B', explanation: 'Partial success handling: 8 of 10 steps completed before failure → checkpoint stores completed steps + outputs → on retry, resume from step 9 with saved context → avoid re-executing expensive completed steps.' },

  { id: 8044, domain: 8, domainName: 'Reliability & Error Handling', topic: 'SLI Definition', difficulty: 'medium', keywords: ['SLI', 'measurement', 'instrumentation', 'indicator'],
    question: 'A Service Level Indicator (SLI) for AI agent quality should measure:',
    options: { A: 'Developer satisfaction with the agent codebase', B: 'A quantifiable metric reflecting user experience (e.g., % of requests where agent successfully completed the requested task)', C: 'The maximum possible quality achievable', D: 'SLIs only apply to infrastructure, not AI agent quality' },
    answer: 'B', explanation: 'AI agent SLIs: task_success_rate = successful_completions / total_requests, measured as sliding window %. Supplement with: user_satisfaction_score (thumbs up/down), p95_latency, and error_rate. SLIs must be measurable, not subjective.' },

  { id: 8045, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Dependency Failure Handling', difficulty: 'hard', keywords: ['dependency', 'fallback', 'degraded mode', 'graceful'],
    question: 'Graceful degradation when a key tool dependency is unavailable means:',
    options: { A: 'Refusing all requests until the dependency recovers', B: 'Switching to a reduced-capability mode — completing the request with available tools while transparently communicating limitations to the user', C: 'Queueing all requests until the dependency recovers', D: 'Graceful degradation is not possible when tools are unavailable' },
    answer: 'B', explanation: 'Graceful degradation: web search tool unavailable → agent uses only internal knowledge base + acknowledges "I can\'t access current web results, so my answer reflects training data only." User gets a useful response with clear scope limitation.' },

  { id: 8046, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Tracing Correlation', difficulty: 'medium', keywords: ['correlation ID', 'trace ID', 'distributed tracing', 'request tracking'],
    question: 'Propagating correlation IDs (trace IDs) across all agent service calls enables:',
    options: { A: 'Correlating AI performance with stock market data', B: 'End-to-end request tracking — a single user request can be followed across all microservices, LLM calls, tool calls, and database queries', C: 'Security audit of correlated access patterns', D: 'Correlation IDs only work within a single service' },
    answer: 'B', explanation: 'Correlation ID propagation: request_id X flows through orchestrator → research agent (X) → LLM API (X) → tool service (X) → database (X). Query all logs for request_id=X → complete picture of what happened for that specific user request.' },

  { id: 8047, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Preemptive Error Detection', difficulty: 'hard', keywords: ['anomaly detection', 'prediction', 'early warning', 'proactive'],
    question: 'Predictive failure detection for AI agent systems uses:',
    options: { A: 'Only reactive alerting after failures occur', B: 'ML models trained on historical metrics to detect early warning patterns before failures manifest — alerting while recovery is still easy', C: 'Prediction markets for teams to bet on system reliability', D: 'Predictive detection requires more data than production systems generate' },
    answer: 'B', explanation: 'Predictive monitoring: train LSTM/Prophet on historical metrics → detect anomalies ("token error rate is trending up 20% over last hour, will breach SLO in 2 hours") → alert early while capacity exists to investigate and fix proactively.' },

  { id: 8048, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Memory Leak Prevention', difficulty: 'medium', keywords: ['memory leak', 'resource cleanup', 'context', 'session'],
    question: 'Memory leaks in long-running AI agent processes commonly occur from:',
    options: { A: 'Excessive logging that fills disk space', B: 'Accumulating conversation histories, cached embeddings, or tool result caches without eviction policies or cleanup on session end', C: 'Memory leaks only occur in C++ code, not Python agents', D: 'GPU memory leaks only, not CPU/RAM' },
    answer: 'B', explanation: 'Agent memory leaks: session context grows unbounded (conversation history never cleared after session ends), embedding caches without LRU eviction, tool result caches without TTL. Track heap growth over time; add eviction policies for all in-memory stores.' },

  { id: 8049, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Error Reporting Quality', difficulty: 'medium', keywords: ['error reporting', 'Sentry', 'stack trace', 'context'],
    question: 'Production error reporting for AI agents should capture:',
    options: { A: 'Only the exception type and message', B: 'Full stack trace, request context (session_id, user_id, prompt), agent state at failure time, and environmental context (model version, tool versions)', C: 'Error reporting violates user privacy', D: 'Only the most recent error of each type to reduce noise' },
    answer: 'B', explanation: 'Rich error reports: exception + stack + "what was the agent doing" (which step, which tool called) + "what was the context" (prompt excerpt, conversation length) + "environment" (model=llama3-8b, tool_version=1.2). Enables reproduction and root cause analysis.' },

  { id: 8050, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Degraded Mode Testing', difficulty: 'medium', keywords: ['degraded mode', 'testing', 'fallback verification', 'chaos'],
    question: 'Testing agent behavior in degraded mode (some tools unavailable) should verify:',
    options: { A: 'That the agent crashes gracefully with a clear error', B: 'That the agent correctly identifies available tools, uses alternatives where possible, and communicates limitations to users clearly', C: 'Degraded mode only needs to be tested in production', D: 'Tests are not needed if the code has fallback handlers' },
    answer: 'B', explanation: 'Degraded mode tests: disable tool X → check agent doesn\'t crash → check agent tries alternative tools → check user receives useful partial response with honest acknowledgment of limitations. Tests validate the full graceful degradation path.' },

  { id: 8051, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Retry Strategies', difficulty: 'medium', keywords: ['retry', 'backoff', 'jitter', 'strategies'],
    question: 'The TENACITY library (Python) for retry logic in agent tools provides:',
    options: { A: 'Persistent storage for agent memory', B: 'Declarative retry logic with configurable backoff strategies, stop conditions, and retry predicates via decorators', C: 'Tenacious (aggressive) retry without backoff', D: 'Transaction management for database retries only' },
    answer: 'B', explanation: 'Tenacity: @retry(stop=stop_after_attempt(5), wait=wait_exponential(min=1, max=60), retry=retry_if_exception_type(RateLimitError)). Declarative, readable retry logic that handles all retry patterns without manual loop boilerplate.' },

  { id: 8052, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Load Testing AI', difficulty: 'medium', keywords: ['load testing', 'Locust', 'k6', 'AI load'],
    question: 'Load testing AI agent APIs with k6 or Locust requires adapting standard load tests to account for:',
    options: { A: 'No adaptation needed — standard web load testing applies', B: 'Variable response times (1-60s vs ms for typical APIs), token-based cost accumulation, and LLM API rate limit interaction', C: 'Only testing with static/cached responses to avoid real AI costs', D: 'Load testing is not applicable to AI agents' },
    answer: 'B', explanation: 'AI-specific load testing: p95 latency target is 5-30s (not 500ms); cost tracking ($X per test run); LLM API rate limits may artificially cap throughput; use realistic prompt variation (not identical requests that hit cache); warm-up time for model loading.' },

  { id: 8053, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Configuration Drift', difficulty: 'medium', keywords: ['configuration drift', 'consistency', 'environments', 'GitOps'],
    question: 'Configuration drift between AI agent environments (dev/staging/prod) is prevented by:',
    options: { A: 'Manually comparing environments weekly', B: 'GitOps practices with all configuration in version control, automated reconciliation ensuring running state matches declared state', C: 'Using identical hardware in all environments', D: 'Configuration drift is acceptable between non-production environments' },
    answer: 'B', explanation: 'GitOps for AI config: all configs (model names, hyperparams, tool endpoints) in git → ArgoCD/Flux reconciles K8s state to match git. Any configuration change requires a PR → eliminates manual drift → reproducible environments.' },

  { id: 8054, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Incident Management', difficulty: 'medium', keywords: ['incident management', 'communication', 'status page', 'updates'],
    question: 'During an AI agent system incident, stakeholder communication should include:',
    options: { A: 'Sharing full technical details immediately with all users', B: 'Regular status updates on: what\'s affected, current impact, what team is doing, estimated resolution time — even while the issue is still being diagnosed', C: 'Communicating only after the incident is fully resolved', D: 'Only communicating with the engineering team during active incidents' },
    answer: 'B', explanation: 'Incident communication: update status page every 30 min, even if just "investigating root cause." Users prefer transparent uncertainty ("we\'re investigating, ETA unknown") over silence. Post-incident summary (postmortem) with timeline and corrective actions.' },

  { id: 8055, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Testing LLM Outputs', difficulty: 'hard', keywords: ['LLM testing', 'semantic assertion', 'behavioral test', 'evaluation'],
    question: 'Semantic assertions for testing AI agent outputs check that:',
    options: { A: 'The output contains specific keywords', B: 'The meaning and intent of the output meets requirements — "does the response correctly address the user\'s question?" — using LLM-as-judge or embedding similarity', C: 'Output format exactly matches a template', D: 'Semantic assertions are manual tests, not automatable' },
    answer: 'B', explanation: 'Semantic assertions: beyond "does output contain X" → "does output answer the question correctly?" Use LLM-as-judge or embed output + expected and check similarity > threshold. Enables automated testing of nuanced AI output quality.' },

  { id: 8056, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Agent Timeout Design', difficulty: 'medium', keywords: ['timeout', 'deadline propagation', 'context deadline', 'grpc'],
    question: 'Deadline propagation in distributed agent systems ensures:',
    options: { A: 'All requests must complete before a fixed daily deadline', B: 'Each downstream call inherits the remaining deadline from the parent request — preventing downstream services from working past the user\'s timeout', C: 'Deadlines propagate errors to upstream services', D: 'gRPC deadline propagation only works with gRPC clients' },
    answer: 'B', explanation: 'Deadline propagation: user request has 30s deadline. Orchestrator calls agent with remaining 28s deadline. Agent calls tool with remaining 15s. If deadline exceeded anywhere → immediate cancellation. Prevents orphaned work on timed-out requests.' },

  { id: 8057, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Token Budget Reliability', difficulty: 'medium', keywords: ['token budget', 'cost cap', 'runaway', 'control'],
    question: 'Hard token budget limits in agent orchestrators prevent:',
    options: { A: 'Users from accessing the agent\'s full capabilities', B: 'Runaway LLM loops that could accumulate millions of tokens and thousands of dollars in API costs from a single malfunctioning agent task', C: 'Agents from using advanced reasoning', D: 'Token limits reduce response quality too much to be useful' },
    answer: 'B', explanation: 'Token budget enforcement: orchestrator tracks cumulative tokens used per task. At threshold (e.g., 100K tokens) → halt and return partial result with explanation. Prevents: infinite retry loops, recursive agent calls, and adversarially crafted runaway tasks.' },

  { id: 8058, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Failure Communication', difficulty: 'easy', keywords: ['failure message', 'user notification', 'actionable', 'transparency'],
    question: 'When an AI agent fails to complete a task, the ideal user communication includes:',
    options: { A: 'Technical error code only for troubleshooting', B: 'What was accomplished (partial results), why it failed, what the user can do next, and estimated time if it\'s a temporary issue', C: 'Only "I encountered an error, please try again"', D: 'Full technical stack trace for transparency' },
    answer: 'B', explanation: 'Good failure communication: "I was able to gather 3 of 5 required data points. I couldn\'t access the HR system (connection timeout). Here\'s what I found so far. You can try again in 10 minutes when HR system typically recovers, or contact IT support."' },

  { id: 8059, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Observability as Code', difficulty: 'medium', keywords: ['observability as code', 'alert rules', 'dashboard', 'terraform'],
    question: 'Defining monitoring alert rules and dashboards as code (vs manual UI configuration):',
    options: { A: 'Requires more maintenance overhead without benefits', B: 'Version controls monitoring configuration, enables review of alert changes in PRs, and ensures monitoring is recreated with each environment', C: 'Only applicable for software-defined networking', D: 'Dashboards as code cannot handle complex AI metrics' },
    answer: 'B', explanation: 'Monitoring as code: Grafana dashboards in JSON → git. Alert rules in YAML → Prometheus rules files. Deploy with Terraform. Benefits: review alert changes (prevent false alarms), recreate monitoring in new environments automatically, audit who changed what.' },

  { id: 8060, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Error Budget Policies', difficulty: 'hard', keywords: ['error budget policy', 'freeze', 'innovation', 'reliability'],
    question: 'An error budget policy for AI agents states that when the error budget is exhausted:',
    options: { A: 'The service must be shut down immediately', B: 'Feature work is paused and the team focuses exclusively on reliability improvements until budget is replenished', C: 'Error budget exhaustion triggers an automatic service restart', D: 'New SLOs are set with lower targets to accommodate actual performance' },
    answer: 'B', explanation: 'Error budget policy: budget exhausted → no new feature deployments → all engineering resources on reliability (root cause analysis, fixes, testing improvements). Creates healthy tension: move fast (burn budget) vs reliability (replenish budget).' },
];
