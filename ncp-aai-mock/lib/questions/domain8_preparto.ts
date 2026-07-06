import { Question } from '../types';

export const domain8PrepartoQuestions: Question[] = [
  {
    id: 8801,
    domain: 8,
    domainName: 'Reliability & Error Handling',
    topic: 'Scenario: Circuit Breaker Pattern',
    question: 'Your agent calls a downstream CRM API that is occasionally slow (>10s responses) due to database maintenance windows. When the CRM is slow, your agent holds open connections and eventually all agent workers are blocked waiting, causing a cascade failure. Which pattern prevents this cascade?',
    options: {
      A: 'Add a 30-second timeout to all CRM calls — after 30 seconds, raise an exception.',
      B: 'Implement a circuit breaker: monitor CRM call success rates and latency; when failures exceed threshold (e.g., 50% failure rate in 60 seconds), "open" the circuit and immediately return a cached response or fallback for all subsequent CRM calls without attempting the call, until a probe succeeds.',
      C: 'Increase the agent worker pool from 10 to 100 to handle more queued requests.',
      D: 'Move to synchronous serial processing — process one request at a time to prevent connection pool exhaustion.'
    },
    answer: 'B',
    explanation: 'Circuit breaker (B) directly prevents cascade failure: the pattern has three states — CLOSED (normal), OPEN (failing, don\'t call), HALF-OPEN (probe to check recovery). When CRM is slow/failing, the circuit opens and subsequent calls immediately return fallback responses — no waiting, no connection blocking. This breaks the cascade: healthy agent workers can serve requests without being blocked on the CRM. Timeout (A) reduces blocking but doesn\'t prevent it — all 10 workers can still be blocked for 30 seconds each. More workers (C) delays cascade but doesn\'t prevent it. Serial processing (D) eliminates parallelism.',
    keywords: ['circuit breaker', 'cascade failure', 'OPEN state', 'fallback', 'resilience'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 8802,
    domain: 8,
    domainName: 'Reliability & Error Handling',
    topic: 'Scenario: AgentIQ Profiling',
    question: 'You are diagnosing high latency in your LangChain agent using NVIDIA AgentIQ. The profiler shows total task time: 8.2 seconds. Select TWO insights AgentIQ\'s profiling report provides that help identify the specific bottleneck.',
    options: {
      A: 'AgentIQ\'s workflow profiler decomposes total latency into per-step breakdowns: LLM inference time (e.g., 3.1s), retrieval time (e.g., 0.8s), tool call time (e.g., 4.1s), and overhead (0.2s) — immediately showing that the tool call is the bottleneck at 50% of total time.',
      B: 'AgentIQ automatically fixes the bottleneck by rewriting slow tool calls in CUDA C++.',
      C: 'AgentIQ tracks token usage per step (input tokens, output tokens, cost estimate) enabling identification of steps that consume disproportionate context budget.',
      D: 'AgentIQ provides GPU memory allocation profiles showing which CUDA kernels are consuming GPU memory during inference.',
      E: 'AgentIQ replaces LangChain\'s callback system with a faster alternative that reduces overhead by 90%.'
    },
    answer: 'AC',
    explanation: '(A) AgentIQ\'s workflow profiler is the core latency diagnosis tool: per-step timing breakdown shows exactly which step (LLM inference, retrieval, tool call, agent overhead) consumes the most time. Without this, developers guess. (C) Per-step token tracking identifies context-heavy steps — a step consuming 50K tokens costs more and takes longer; this guides context optimization. Option B is fabricated. Option D is GPU kernel profiling (Nsight, not AgentIQ). Option E is fabricated.',
    keywords: ['AgentIQ', 'profiling', 'latency breakdown', 'token tracking', 'bottleneck'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 8803,
    domain: 8,
    domainName: 'Reliability & Error Handling',
    topic: 'Scenario: Retry Strategy',
    question: 'Your agent calls an LLM API that occasionally returns 429 (rate limit) and 503 (service unavailable) errors. Currently it retries immediately and repeatedly, which causes "thundering herd" — all failing requests retry simultaneously, amplifying server load. What retry strategy prevents this?',
    options: {
      A: 'Retry immediately up to 10 times for all error codes.',
      B: 'Exponential backoff with jitter: on first failure, wait 1s + random(0-500ms); on second failure, wait 2s + random(0-1000ms); on nth failure, wait min(2^n seconds, 60s) + random jitter. Retry 429 and 503 but not 400 (client error) or 401 (authentication).',
      C: 'Queue all failed requests and retry them all at midnight when traffic is lower.',
      D: 'Retry only once after a fixed 5-second delay, then fail permanently.'
    },
    answer: 'B',
    explanation: 'Exponential backoff with jitter (B) is the standard solution: exponential wait prevents immediate re-hammering; jitter (random offset) desynchronizes retry timing across concurrent callers, preventing thundering herd. Selective retry (429, 503 = transient; 400, 401 = permanent) prevents wasted retries on non-transient errors. This is explicitly recommended in AWS, GCP, and Anthropic\'s API best practices. Immediate retry (A) causes thundering herd. Midnight batch (C) unacceptable for real-time agents. Single retry (D) insufficient for production reliability.',
    keywords: ['exponential backoff', 'jitter', 'thundering herd', 'retry strategy', '429'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 8804,
    domain: 8,
    domainName: 'Reliability & Error Handling',
    topic: 'Scenario: Graceful Degradation',
    question: 'Your agent relies on three services: (1) LLM inference, (2) vector search for RAG, and (3) a live pricing API. When all are available, it provides personalized recommendations with current prices. Design a graceful degradation strategy for when each service fails independently.',
    options: {
      A: 'Fail completely if any one service is unavailable — partial information could mislead users.',
      B: 'Implement tiered degradation: (1) If pricing API fails → use last-known-good cached prices (stale data, disclosed to user); (2) if RAG fails → fall back to LLM parametric knowledge only (disclosed as "general knowledge, may not reflect current inventory"); (3) if LLM fails → return a static "service temporarily unavailable" message.',
      C: 'Route all users to a human agent when any service fails.',
      D: 'Disable the agent for maintenance during any service failure.'
    },
    answer: 'B',
    explanation: 'Graceful degradation (B) prioritizes partial value over zero value: (1) Stale prices with disclosure are better than no prices for many purchasing decisions. (2) LLM parametric knowledge (less precise but available) is better than no recommendation. (3) Total LLM failure is unrecoverable — return a clear message. Each failure tier degrades to a lower capability while remaining useful. Option A provides no value during partial failures. Option C (human routing) doesn\'t scale and may overwhelm human agents. Option D (maintenance mode) is a last resort, not first response.',
    keywords: ['graceful degradation', 'tiered fallback', 'cached responses', 'disclosure', 'resilience'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 8805,
    domain: 8,
    domainName: 'Reliability & Error Handling',
    topic: 'Scenario: Dead Letter Queue',
    question: 'Your event-driven agent pipeline processes customer order events from a queue. Occasionally, malformed events cause the agent to crash during processing, and the event returns to the queue — creating an infinite retry loop that blocks other events. What infrastructure pattern prevents this?',
    options: {
      A: 'Increase agent timeout to 5 minutes so it has more time to process malformed events.',
      B: 'Implement a dead letter queue (DLQ): configure the message queue to move events that have failed processing N times (e.g., 3 attempts) to a separate DLQ. The main agent queue is unblocked; DLQ events are reviewed separately for manual remediation or reprocessing after investigation.',
      C: 'Add try/except around all event processing code to prevent crashes — silently discard events that cause exceptions.',
      D: 'Validate all events before inserting them into the queue, using a JSON Schema validator at the source.'
    },
    answer: 'B',
    explanation: 'Dead letter queue (B) is the standard pattern for poison message handling: after N failed attempts, the message is moved to the DLQ automatically by the broker (SQS, RabbitMQ, Kafka all support this). The main queue unblocks; the DLQ provides visibility into problem events for investigation and reprocessing after the bug is fixed. Option A increases timeout but doesn\'t solve the infinite loop. Option C (silent discard) loses data — the order was never processed. Option D (source validation) prevents future malformed events but doesn\'t help events already in the queue.',
    keywords: ['dead letter queue', 'DLQ', 'poison message', 'infinite loop', 'message queue'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 8806,
    domain: 8,
    domainName: 'Reliability & Error Handling',
    topic: 'OpenTelemetry for Agent Observability',
    question: 'Select TWO accurate statements about using OpenTelemetry (OTel) for observability in production agentic AI systems.',
    options: {
      A: 'OpenTelemetry\'s distributed tracing propagates a trace context (trace_id, span_id) across all components of an agent pipeline — LLM calls, tool executions, RAG retrievals, subagent invocations — creating a single unified trace view that correlates all events from a single user request.',
      B: 'OpenTelemetry requires you to replace your existing logging framework (loguru, logging) with OTel-specific logging calls and cannot integrate with existing loggers.',
      C: 'OpenTelemetry\'s semantic conventions for LLM systems (gen_ai.*) provide standardized attribute names for LLM-specific telemetry (model name, input tokens, output tokens, finish reason) that are compatible with observability backends like Jaeger, Grafana Tempo, and Datadog.',
      D: 'OpenTelemetry can only collect metrics — it does not support distributed tracing for agentic workflows.',
      E: 'OpenTelemetry requires NVIDIA-specific GPU hardware to instrument LLM inference calls.'
    },
    answer: 'AC',
    explanation: '(A) Distributed tracing is OTel\'s core value for agents: a single user request spawns multiple spans (LLM call, tool call, subagent invocation) — trace context propagation links them all under one trace_id. This enables end-to-end latency analysis and error attribution. (C) The gen_ai.* semantic conventions (OTel semantic conventions for GenAI) provide standardized attributes (gen_ai.request.model, gen_ai.usage.input_tokens, etc.) ensuring compatibility across observability backends. Option B is false — OTel integrates with existing loggers. Option D is false — OTel supports traces, metrics, AND logs. Option E is false — OTel is hardware-agnostic.',
    keywords: ['OpenTelemetry', 'distributed tracing', 'gen_ai conventions', 'trace_id', 'observability'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 8807,
    domain: 8,
    domainName: 'Reliability & Error Handling',
    topic: 'Scenario: Fallback Model Chain',
    question: 'Your primary LLM (Llama-3.1-70B on NIM) has an SLA of 99.5% uptime but your application requires 99.9% uptime. How do you achieve the higher SLA?',
    options: {
      A: 'Increase request timeout from 30s to 60s — more time reduces the perceived downtime.',
      B: 'Implement a fallback model chain: primary = Llama-3.1-70B (NIM), fallback = Llama-3.1-8B (NIM), final fallback = a cloud API (OpenAI/Anthropic). Health checks poll each tier; if primary is unavailable, traffic automatically routes to fallback, disclosing reduced capability to users.',
      C: 'Cache all LLM responses for 24 hours and serve cached responses when the primary LLM is down.',
      D: 'Run two identical NIM instances behind a load balancer — if one goes down, the other handles all traffic.'
    },
    answer: 'B',
    explanation: 'A fallback chain (B) composes uptime: if primary (99.5%) is down, fallback (99.5%) takes over. Combined uptime = 1 - (0.005 × 0.005) = 99.9975%, exceeding the 99.9% target. The quality-tiered approach (70B → 8B → cloud) maintains service with degraded but functional responses. Option A (longer timeout) doesn\'t increase availability. Option C (24hr cache) is inappropriate for dynamic conversational responses. Option D (two identical instances) achieves ~99.9975% on paper, but both instances can fail together if there\'s a common infrastructure issue — the fallback chain adds diversity.',
    keywords: ['fallback model', 'uptime SLA', 'model chain', 'health check', 'reliability'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 8808,
    domain: 8,
    domainName: 'Reliability & Error Handling',
    topic: 'Scenario: Agent Output Validation',
    question: 'Your agent generates SQL queries as part of a data analysis workflow. On several occasions, it generated queries that deleted production data (DELETE without WHERE clause). What architectural safeguards prevent destructive SQL execution?',
    options: {
      A: 'Add a system prompt instruction: "Never generate DELETE statements without a WHERE clause."',
      B: 'Implement a multi-layer safeguard: (1) SQL AST parsing to detect and block destructive statements (DELETE, DROP, TRUNCATE) before execution; (2) execute all agent-generated queries on a read-only database replica; (3) require human approval for any DML statement that affects more than 1000 rows.',
      C: 'Switch to a more capable model that is less likely to generate destructive queries.',
      D: 'Log all queries to an audit table and run a nightly job to detect destructive patterns.'
    },
    answer: 'B',
    explanation: 'Defense-in-depth (B) is required for SQL execution safety: (1) AST parsing provides programmatic enforcement — not bypassable by prompt injection or model behavior. (2) Read-only replica makes destructive execution physically impossible for all non-explicitly-approved queries. (3) Human approval for bulk changes is the final safeguard. Option A (prompt instruction) is the weakest defense — models can still generate DELETE without WHERE. Option C (better model) reduces frequency but doesn\'t eliminate the risk. Option D (nightly audit) detects damage after it occurs — too late.',
    keywords: ['SQL safety', 'AST parsing', 'read-only replica', 'human approval', 'defense-in-depth'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 8809,
    domain: 8,
    domainName: 'Reliability & Error Handling',
    topic: 'Idempotency in Agent Actions',
    question: 'Select TWO accurate statements about designing idempotent agent actions in production agentic systems.',
    options: {
      A: 'An idempotent agent action produces the same result whether called once or multiple times — essential for retry-safe operations. For example, using a PUT request with a unique idempotency key for payment processing prevents duplicate charges on retry.',
      B: 'All agent tool calls are idempotent by default when using function calling in modern LLMs.',
      C: 'Using idempotency keys (UUID generated before the call, passed with the request, checked by the server) enables safe retry of any action: if the server already processed a request with that key, it returns the original result without re-executing.',
      D: 'Making agent actions idempotent requires rewriting all external APIs to support idempotency, which is only feasible for APIs your team controls.',
      E: 'Idempotency is only needed for financial transactions — read-only operations and non-financial writes do not require idempotency keys.'
    },
    answer: 'AC',
    explanation: '(A) Defines idempotency correctly and gives the practical example: payment APIs (Stripe, etc.) use idempotency keys to prevent double-charges on retry — calling the same endpoint twice with the same key returns the same charge ID without a second charge. (C) Describes the implementation pattern: client generates UUID before the call; server stores key+result; on duplicate, returns stored result. This is how Stripe, Square, and Twilio implement idempotency. Option B is false — LLM function calling doesn\'t make APIs idempotent. Option D is false — many external APIs support idempotency keys natively. Option E is false — email sending, file creation, and order placement also need idempotency.',
    keywords: ['idempotency', 'idempotency key', 'UUID', 'retry safety', 'payment'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 8810,
    domain: 8,
    domainName: 'Reliability & Error Handling',
    topic: 'Scenario: Health Checks and Readiness Probes',
    question: 'Your NIM-based LLM agent is deployed on Kubernetes. During deployments, new pods are sometimes added to the load balancer before the 13B model is fully loaded into GPU memory (~20 seconds), causing users to receive 503 errors for the first 20 seconds after a new pod starts. What Kubernetes configuration prevents this?',
    options: {
      A: 'Add a Kubernetes readiness probe (e.g., HTTP GET /v1/models every 5 seconds, starting after 15 seconds) that only marks the pod as ready when the NIM endpoint returns 200 — preventing traffic routing until model loading completes.',
      B: 'Set terminationGracePeriodSeconds to 60 to give pods extra time to shut down.',
      C: 'Increase the number of replicas from 2 to 10 so new pods represent a smaller fraction of total capacity.',
      D: 'Disable rolling updates and use Recreate strategy — wait for all old pods to terminate before starting new ones.'
    },
    answer: 'A',
    explanation: 'Kubernetes readiness probes (A) are the exact solution: a readiness probe checks whether the pod is ready to serve traffic. NIM\'s /v1/models endpoint returns a non-200 response while the model is loading and 200 when ready. Kubernetes waits for the readiness probe to succeed before adding the pod to the Service endpoints — users never see an unready pod. Option B (grace period) is for shutdown, not startup. Option C (more replicas) dilutes the problem but doesn\'t fix it. Option D (Recreate) causes 100% downtime during deployment.',
    keywords: ['readiness probe', 'Kubernetes', 'NIM', 'model loading', 'deployment'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 8811,
    domain: 8,
    domainName: 'Reliability & Error Handling',
    topic: 'Structured Error Handling',
    question: 'Select TWO best practices for structured error handling in production agent tool calls that enable downstream error recovery.',
    options: {
      A: 'Return structured error objects from tool calls (e.g., {"error": true, "error_type": "API_TIMEOUT", "retry_after": 5, "fallback_available": true}) rather than raising exceptions that terminate the agent run — enabling the agent\'s error handling node to make informed recovery decisions.',
      B: 'Swallow all exceptions inside tool functions and return empty strings — this prevents the LLM from seeing error messages and generating incorrect responses.',
      C: 'Include actionable error context in tool error responses: which step failed, what was attempted, what the user can do next — enabling the agent to generate helpful error messages rather than opaque failure notices.',
      D: 'Use HTTP status codes directly as the error signal in agent tool responses — check status_code == 200 at each step.',
      E: 'Raise Python exceptions for all tool failures and let the agent framework handle them via its global exception handler.'
    },
    answer: 'AC',
    explanation: '(A) Structured error objects enable programmatic recovery: the agent\'s error handler reads error_type to decide (API_TIMEOUT → retry after 5s; QUOTA_EXCEEDED → use fallback; NOT_FOUND → inform user). Raw exceptions terminate the agent or require special handling. (C) Actionable context in errors enables the agent to generate useful messages: "I couldn\'t retrieve the inventory data because the warehouse API is in maintenance until 3 PM — would you like me to check the cached last-known inventory instead?" vs "Error: 503". Option B (empty strings) loses error signal. Option D (HTTP codes) doesn\'t communicate enough context for agent recovery decisions. Option E (global exception handler) catches too broadly.',
    keywords: ['structured errors', 'error recovery', 'error context', 'tool error handling', 'actionable errors'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 8812,
    domain: 8,
    domainName: 'Reliability & Error Handling',
    topic: 'Scenario: Observability Stack',
    question: 'You need to set up observability for a production multi-agent pipeline. You need: trace correlation across all agents, latency histograms per step, error rate dashboards, and LLM token usage tracking. Which observability stack components are needed?',
    options: {
      A: 'OpenTelemetry SDK for instrumentation (traces + metrics), an OTel Collector for aggregation, and a backend (Grafana + Tempo for traces, Prometheus + Grafana for metrics) — providing a complete open-source observability stack.',
      B: 'Print statements with timestamps at each agent step — sufficient for production observability.',
      C: 'NVIDIA AgentIQ for agent-specific profiling (per-step latency, token usage, workflow traces) integrated with OpenTelemetry export to standard backends — combining NVIDIA-specific AI observability with general infrastructure monitoring.',
      D: 'A single log aggregation tool (CloudWatch/Datadog) without distributed tracing — all agent events go to the same log stream.',
      E: 'GPU monitoring (nvidia-smi) as the primary observability tool for LLM agent pipelines.'
    },
    answer: 'AC',
    explanation: '(A) Describes the complete open-source observability stack: OTel SDK instruments code → OTel Collector aggregates → Grafana/Tempo handles traces, Prometheus/Grafana handles metrics. (C) AgentIQ + OTel is the NVIDIA-recommended approach: AgentIQ provides AI-specific profiling (per-step latency, token usage) and exports via OTel to standard backends — combining AI-specific insights with general infrastructure observability. Option B (print statements) has no aggregation, correlation, or dashboarding. Option D (log-only) lacks distributed tracing for multi-agent correlation. Option E (GPU monitoring) covers compute only, not agent logic.',
    keywords: ['observability stack', 'OpenTelemetry', 'AgentIQ', 'Grafana', 'distributed tracing'],
    difficulty: 'medium',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 8813,
    domain: 8,
    domainName: 'Reliability & Error Handling',
    topic: 'Scenario: Timeout Strategy',
    question: 'Your agent has a 30-second per-turn budget. It makes 3 sequential tool calls: (1) web search ~2s, (2) CRM lookup ~1s, (3) LLM generation ~8s = 11s total under normal conditions. On the CRM\'s slow day, step 2 takes 25s, blowing the budget. How do you correctly set timeouts?',
    options: {
      A: 'Set a single 30-second timeout for the entire turn — if the turn takes over 30 seconds, cancel everything.',
      B: 'Set per-step timeouts based on P99 latency + buffer: web search = 5s, CRM lookup = 5s, LLM generation = 20s. If any step exceeds its timeout, move to error handling for that step (fallback or skip) rather than canceling the entire turn.',
      C: 'Disable timeouts for CRM calls to allow unlimited waiting — CRM data is always necessary.',
      D: 'Increase the per-turn budget to 60 seconds to accommodate CRM slowness.'
    },
    answer: 'B',
    explanation: 'Per-step timeouts (B) provide surgical control: each step gets a timeout sized to its P99 latency with a safety margin. If CRM times out (5s), the agent moves to error handling for that step (use cached CRM data or continue without it) — the LLM generation still gets its full 20s budget. The total turn completes in ~27s even with the CRM timeout. A global 30s timeout (A) cancels everything if CRM is slow — no partial response. Unlimited CRM timeout (C) is the current problem. Increasing budget (D) still leaves the problem — CRM could take 60s too.',
    keywords: ['per-step timeout', 'P99 latency', 'timeout strategy', 'error handling', 'budget'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 8814,
    domain: 8,
    domainName: 'Reliability & Error Handling',
    topic: 'Agent Monitoring Metrics',
    question: 'Select TWO agent-specific metrics that are MORE informative than standard web application metrics (HTTP latency, error rate) for monitoring the health of a production agentic pipeline.',
    options: {
      A: 'Tool call success rate by tool name: tracks which specific tools are failing, enabling targeted remediation (e.g., "CRM_lookup is failing at 15% — investigate CRM health") rather than a generic "agent error rate" that doesn\'t indicate which component to fix.',
      B: 'CPU utilization of agent worker processes — higher CPU means more agent reasoning.',
      C: 'Task completion rate: the percentage of agent tasks that reach a successful terminal state (answer delivered, action completed) vs. those that fail, loop, or time out — the primary indicator of agent business value delivered.',
      D: 'Network bandwidth consumed by the agent — higher bandwidth means more tool calls.',
      E: 'Number of LLM API calls per minute — a direct measure of agent intelligence.'
    },
    answer: 'AC',
    explanation: '(A) Per-tool failure rates are actionable: "CRM_lookup is failing at 15%" directs the team to CRM health, not agent code. Generic error rate doesn\'t provide this granularity. (C) Task completion rate is the north-star agent metric: it measures whether the agent is actually achieving its purpose. An agent that generates responses to 100% of requests but fails to complete tasks has a 0% task completion rate — not visible in standard HTTP metrics. Option B (CPU) doesn\'t correlate with agent reasoning quality. Option D (bandwidth) doesn\'t indicate agent health. Option E (LLM calls/minute) measures throughput, not quality.',
    keywords: ['agent metrics', 'tool success rate', 'task completion rate', 'monitoring', 'observability'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 8815,
    domain: 8,
    domainName: 'Reliability & Error Handling',
    topic: 'Scenario: Rate Limit Management',
    question: 'Your agent makes up to 500 LLM API calls per minute during peak load. The LLM provider\'s rate limit is 200 calls per minute (RPM). During peak, you experience frequent 429 rate limit errors causing agent task failures. Select TWO strategies that correctly address this without reducing agent functionality.',
    options: {
      A: 'Implement a token bucket rate limiter in the agent: allow up to 200 calls/minute with burst capacity, queuing excess calls rather than failing them — callers wait instead of receiving errors.',
      B: 'Reduce agent functionality by limiting it to 200 tasks per minute regardless of demand.',
      C: 'Use multiple LLM API accounts under different email addresses to distribute load across higher aggregate rate limits.',
      D: 'Implement request batching where possible: combine multiple small LLM calls into fewer, larger calls using batch inference endpoints if the provider supports it.',
      E: 'Cache LLM responses for identical prompts using a semantic cache (find similar past prompts using embedding similarity and return cached responses if similarity > 0.95), reducing the number of actual API calls needed.'
    },
    answer: 'AE',
    explanation: '(A) Token bucket rate limiting is the correct pattern: queue excess requests up to a buffer capacity rather than failing them immediately — peak of 500 RPM means ~300 queued at peak, which drains during lower traffic periods. (E) Semantic caching reduces unique LLM calls: if 40% of peak calls are variations of the same questions (common in support agents), cache hit rate of 40% brings effective load from 500 to 300 RPM. These two together solve the problem without reducing functionality. Option B reduces functionality. Option C likely violates provider ToS. Option D is valid where batch endpoints exist but not universally available.',
    keywords: ['rate limiting', 'token bucket', 'semantic cache', '429', 'RPM'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
];