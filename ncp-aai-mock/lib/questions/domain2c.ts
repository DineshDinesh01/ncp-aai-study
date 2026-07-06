import { Question } from '../types';

export const domain2cQuestions: Question[] = [
  { id: 2101, domain: 2, domainName: 'Agent Development', topic: 'Prompt Engineering Advanced', difficulty: 'hard', keywords: ['few-shot', 'chain-of-thought', 'prompting', 'advanced'],
    question: 'Self-consistency prompting improves LLM accuracy by:',
    options: { A: 'Using the same prompt multiple times to ensure consistency', B: 'Sampling multiple reasoning paths with temperature > 0 and taking the majority answer, averaging out errors', C: 'Checking that the model\'s output is consistent with its system prompt', D: 'Ensuring all examples in few-shot prompts are consistent' },
    answer: 'B', explanation: 'Self-consistency (Wang et al.): generate N reasoning chains with temperature > 0 → vote on the most common final answer. Works because different paths independently arriving at the same answer = higher confidence.' },

  { id: 2102, domain: 2, domainName: 'Agent Development', topic: 'Tool Implementation', difficulty: 'medium', keywords: ['tool implementation', 'timeout', 'input validation', 'idempotent'],
    question: 'Idempotent tool implementations are important in agents because:',
    options: { A: 'Idempotent tools run faster than non-idempotent ones', B: 'When agents retry tool calls on failure, idempotent tools produce the same result whether called once or multiple times', C: 'Idempotency is only relevant for database write operations', D: 'Non-idempotent tools are prohibited by LLM providers' },
    answer: 'B', explanation: 'Idempotent tool design: "create_record_if_not_exists" vs "insert_record" — retry-safe. With network timeouts and agent retries, non-idempotent tools can cause duplicate records, double payments, or repeated notifications.' },

  { id: 2103, domain: 2, domainName: 'Agent Development', topic: 'Testing Agents', difficulty: 'medium', keywords: ['unit test', 'mock LLM', 'deterministic', 'testing'],
    question: 'The challenge of unit testing LLM agent components is primarily:',
    options: { A: 'LLM API calls are too expensive to run in tests', B: 'LLM outputs are non-deterministic — the same prompt can produce different outputs, making assertion-based testing difficult', C: 'Unit testing frameworks don\'t support async code', D: 'LLM providers don\'t offer test environments' },
    answer: 'B', explanation: 'Testing LLM agents: non-determinism breaks traditional assert-based tests. Solutions: mock LLM (return fixed responses), semantic assertions (does output contain expected info?), and golden-file comparison with fuzzy matching.' },

  { id: 2104, domain: 2, domainName: 'Agent Development', topic: 'RLHF Implementation', difficulty: 'hard', keywords: ['RLHF', 'reward model', 'preference', 'fine-tuning'],
    question: 'Constitutional AI (Anthropic\'s approach) differs from standard RLHF by:',
    options: { A: 'Using human raters for all feedback rather than a reward model', B: 'Having the model critique and revise its own outputs against a set of principles, reducing reliance on human labelers', C: 'Training only on legal and constitutional documents', D: 'Using constitutional law to constrain model outputs' },
    answer: 'B', explanation: 'Constitutional AI: model self-critiques outputs against a "constitution" of principles (be helpful, avoid harm, be honest) → revises → this AI-generated preference data trains the reward model. Scales better than pure human feedback.' },

  { id: 2105, domain: 2, domainName: 'Agent Development', topic: 'Debugging Strategies', difficulty: 'medium', keywords: ['debugging', 'logging', 'tracing', 'step-by-step'],
    question: 'The most effective approach for debugging a complex agent workflow failure is:',
    options: { A: 'Restart the agent and hope the issue doesn\'t recur', B: 'Replay the exact interaction with detailed step-by-step logging enabled, inspecting each tool call input/output and LLM decision', C: 'Increase the model size to reduce error frequency', D: 'Ask the LLM to explain why it failed' },
    answer: 'B', explanation: 'Agent debugging: deterministic replay with verbose logging reveals: which tool received which input → what it returned → how the LLM interpreted results → what decision was made. Step-by-step inspection identifies the exact failure point.' },

  { id: 2106, domain: 2, domainName: 'Agent Development', topic: 'Grounding Techniques', difficulty: 'medium', keywords: ['grounding', 'citation', 'source attribution', 'factuality'],
    question: 'Citation grounding in agent responses helps by:',
    options: { A: 'Improving response formatting aesthetics', B: 'Enabling users and auditors to verify claims against source documents, and reducing unverified hallucinations in the response', C: 'Increasing response length for thoroughness', D: 'Citations are only needed for academic writing' },
    answer: 'B', explanation: 'Citation grounding: agent includes [Source: Document X, page Y] in responses. Users can verify claims → builds trust. LLM knowing it must cite → more careful about claims → reduced hallucination. Auditors can check compliance.' },

  { id: 2107, domain: 2, domainName: 'Agent Development', topic: 'Code Generation Agents', difficulty: 'medium', keywords: ['code generation', 'code agent', 'execution', 'debugging'],
    question: 'Code interpreter agents (LLM + code execution) enable:',
    options: { A: 'Only static code generation without execution', B: 'Iterative code refinement — generate code, execute, observe errors/output, refine based on results', C: 'Executing any arbitrary code with no restrictions', D: 'Replacing all software developers with AI' },
    answer: 'B', explanation: 'Code interpreter agents: write code → execute in sandbox → observe results/errors → LLM analyzes output/error → refine code → retry. Iterative execution closes the loop, enabling the agent to self-debug without human intervention.' },

  { id: 2108, domain: 2, domainName: 'Agent Development', topic: 'Conversation State', difficulty: 'medium', keywords: ['conversation', 'session', 'state', 'persistence'],
    question: 'Persisting conversation state across agent sessions requires:',
    options: { A: 'Keeping the agent process running indefinitely', B: 'Storing conversation history and extracted state in an external store (database, cache) and loading it at session start', C: 'Only in-memory storage for performance', D: 'Conversation state should never be persisted for privacy' },
    answer: 'B', explanation: 'Cross-session state: serialize conversation history + key extracted facts → store in Redis/DB → on new session, load and inject. Enables "continue where we left off" experiences without keeping stateful processes alive.' },

  { id: 2109, domain: 2, domainName: 'Agent Development', topic: 'Agent Health Checks', difficulty: 'easy', keywords: ['health check', 'liveness', 'readiness', 'probe'],
    question: 'Liveness vs readiness probes for AI agent services differ in that:',
    options: { A: 'Liveness checks are more thorough than readiness checks', B: 'Liveness: "is the process alive?" (restart if dead); Readiness: "is the agent ready to handle requests?" (don\'t route traffic if not)', C: 'They are different names for the same check', D: 'Readiness probes are only used in Kubernetes' },
    answer: 'B', explanation: 'Liveness probe: process is running and not deadlocked → restart if fails. Readiness probe: model loaded, connections warm, can handle requests → stop routing traffic if fails. Both needed for robust K8s deployment.' },

  { id: 2110, domain: 2, domainName: 'Agent Development', topic: 'Structured Prompting', difficulty: 'medium', keywords: ['XML tags', 'delimiters', 'structured prompt', 'sections'],
    question: 'Using XML tags or delimiters in prompts to separate sections (instructions, context, examples, query) helps because:',
    options: { A: 'XML is faster to parse than plain text', B: 'Clear structure helps LLMs correctly identify which content is instructions vs context vs the actual query to process', C: 'XML delimiters prevent prompt injection', D: 'Structured prompts are required by all LLM APIs' },
    answer: 'B', explanation: 'Structured prompts with <instructions>, <context>, <examples>, <query> tags: LLM clearly distinguishes role of each section, reducing confusion. Also helps with prompt injection: content in <context> is data, not instructions.' },

  { id: 2111, domain: 2, domainName: 'Agent Development', topic: 'Model Comparison', difficulty: 'medium', keywords: ['model comparison', 'evaluation', 'benchmark', 'A/B test'],
    question: 'A/B testing two LLM models for an agent requires measuring:',
    options: { A: 'Only API cost difference between the two models', B: 'Task success rate, output quality metrics (human or automated), latency, cost, and safety/adherence metrics', C: 'Only speed — fastest model wins', D: 'Parameter count as a proxy for quality' },
    answer: 'B', explanation: 'LLM model A/B testing: controlled traffic split → measure: task completion (did it achieve the goal?), quality (human eval or model-as-judge score), p95 latency, cost per request, safety failures, and user satisfaction.' },

  { id: 2112, domain: 2, domainName: 'Agent Development', topic: 'Context Management', difficulty: 'hard', keywords: ['context management', 'token budget', 'prioritization', 'truncation'],
    question: 'When an agent\'s context window is filling up, the optimal strategy is:',
    options: { A: 'Truncate from the end to keep the beginning', B: 'Prioritize: system prompt (keep), recent messages (keep), old messages (summarize), relevant retrieved context (keep)', C: 'Switch to a model with a larger context window', D: 'Restart the conversation from scratch' },
    answer: 'B', explanation: 'Context prioritization: system prompt = essential (always keep), recent messages = short-term memory (keep), old messages = summarize into compact form, retrieved context = keep most relevant. Don\'t blindly truncate from either end.' },

  { id: 2113, domain: 2, domainName: 'Agent Development', topic: 'Agent Evaluation Pipelines', difficulty: 'medium', keywords: ['eval pipeline', 'CI/CD', 'regression', 'automated'],
    question: 'Integrating agent evaluation into CI/CD pipelines means:',
    options: { A: 'Running full human evaluation on every code change', B: 'Automated regression test suite runs on each PR, blocking merges if agent quality drops below thresholds', C: 'Only evaluating in production based on user feedback', D: 'CI/CD doesn\'t apply to AI systems' },
    answer: 'B', explanation: 'Eval in CI/CD: benchmark test suite (golden Q&A pairs, scenario tests) runs automatically on each PR → alerts if accuracy/safety metrics drop. Catches regressions from prompt changes, dependency updates, or code changes before merge.' },

  { id: 2114, domain: 2, domainName: 'Agent Development', topic: 'Input Preprocessing', difficulty: 'medium', keywords: ['preprocessing', 'sanitization', 'normalization', 'input'],
    question: 'Input preprocessing before sending to an LLM agent should include:',
    options: { A: 'Removing all formatting to simplify the input', B: 'Sanitizing for injection attacks, normalizing encoding, validating length, and stripping/escaping potentially harmful content', C: 'Automatically translating all inputs to English', D: 'Preprocessing is not needed if the LLM handles the input' },
    answer: 'B', explanation: 'Input preprocessing: length check (within token budget), encoding normalization (UTF-8), injection detection (does input try to override system prompt?), PII detection (handle before sending to API), and malicious content filtering.' },

  { id: 2115, domain: 2, domainName: 'Agent Development', topic: 'Agent Communication Patterns', difficulty: 'medium', keywords: ['request-response', 'fire-and-forget', 'callback', 'communication'],
    question: 'The request-response communication pattern between agents provides:',
    options: { A: 'The highest throughput of all communication patterns', B: 'Synchronous confirmation that the called agent received and processed the request, with result returned to caller', C: 'Best for fire-and-forget tasks where results aren\'t needed', D: 'Only appropriate when agents are on the same host' },
    answer: 'B', explanation: 'Request-response: caller waits for result. Good when: caller needs result to continue, failure of called agent should fail the caller, response time is short. Bad when: long-running tasks or fire-and-forget notifications.' },

  { id: 2116, domain: 2, domainName: 'Agent Development', topic: 'Response Validation', difficulty: 'medium', keywords: ['response validation', 'hallucination', 'fact-check', 'grounding'],
    question: 'Post-generation validation of LLM agent outputs should check for:',
    options: { A: 'Grammar and spelling only', B: 'Adherence to instructions, absence of prohibited content, factual consistency with provided context, and required format', C: 'Response length within acceptable limits', D: 'Only checking for toxicity' },
    answer: 'B', explanation: 'Output validation pipeline: instruction adherence (did it follow the task?), safety (no prohibited content), consistency (claims supported by retrieved context?), format (valid JSON/required structure), and confidence (appropriate uncertainty expressed?).' },

  { id: 2117, domain: 2, domainName: 'Agent Development', topic: 'Parallel Development', difficulty: 'medium', keywords: ['team', 'parallel development', 'mocking', 'contract'],
    question: 'Multiple teams building agents in parallel without blocking each other requires:',
    options: { A: 'One team to finish their agent before others can start', B: 'Agreed interfaces/contracts with mocked implementations that allow parallel development against stable specs', C: 'All teams to use the same development branch', D: 'Daily synchronization meetings to coordinate agent interactions' },
    answer: 'B', explanation: 'Parallel agent development: define agent API contracts (OpenAPI spec, JSON schema) first. Team A builds orchestrator against mock of Team B\'s agent. Both develop in parallel, integrate when ready. Contract = coordination mechanism.' },

  { id: 2118, domain: 2, domainName: 'Agent Development', topic: 'Few-Shot Examples', difficulty: 'medium', keywords: ['few-shot', 'examples', 'in-context learning', 'demonstration'],
    question: 'Selecting few-shot examples for in-context learning should prioritize:',
    options: { A: 'The longest examples to maximize information', B: 'Diverse, high-quality examples representative of the task, including edge cases, matched to the current query\'s difficulty level', C: 'The easiest examples to ensure the model succeeds', D: 'Always using exactly 3 examples regardless of task complexity' },
    answer: 'B', explanation: 'Optimal few-shot selection: diversity (cover different sub-cases), quality (correct and well-formatted examples), relevance (semantically similar to current query), and appropriate difficulty. Dynamic selection (retrieve relevant examples) beats static.' },

  { id: 2119, domain: 2, domainName: 'Agent Development', topic: 'Agent Logging Standards', difficulty: 'easy', keywords: ['structured logging', 'JSON logs', 'log levels', 'agent logs'],
    question: 'Structured logging (JSON format) for AI agents is preferred over plain text because:',
    options: { A: 'JSON logs are more human-readable', B: 'Machine-parseable logs enable: automated alerting, metrics extraction, filtering by agent/session/request, and integration with observability platforms', C: 'JSON uses less storage than plain text', D: 'LLM providers require JSON log format' },
    answer: 'B', explanation: 'Structured logs: {timestamp, agent_id, session_id, action, tool_called, tokens_used, latency_ms, error}. Machine-parseable → Grafana dashboards, PagerDuty alerts, cost attribution, and debugging by filtering session_id.' },

  { id: 2120, domain: 2, domainName: 'Agent Development', topic: 'Effective Prompt Templates', difficulty: 'medium', keywords: ['template', 'f-string', 'prompt template', 'parameterized'],
    question: 'Parameterized prompt templates improve agent development by:',
    options: { A: 'Making prompts shorter by removing context', B: 'Separating prompt structure (static) from task content (dynamic), enabling reuse, testing, and version control of prompts', C: 'Automatically optimizing prompt parameters', D: 'Reducing the cost of each API call' },
    answer: 'B', explanation: 'Prompt templates: "Analyze the following {document_type} for {analysis_type}:\n\n{content}" — structure is version-controlled, tested; dynamic parts filled at runtime. Enables: A/B testing templates, tracking which version caused a regression.' },

  { id: 2121, domain: 2, domainName: 'Agent Development', topic: 'SDK Integration Patterns', difficulty: 'medium', keywords: ['SDK', 'client library', 'integration', 'wrapper'],
    question: 'Creating a thin wrapper around LLM SDK calls in agent code provides:',
    options: { A: 'Improved LLM performance through the wrapper layer', B: 'Abstraction enabling retry logic, logging, and model switching without changing every call site throughout the codebase', C: 'Security improvement by hiding API keys in the wrapper', D: 'The wrapper adds unnecessary complexity' },
    answer: 'B', explanation: 'LLM client wrapper: add retry-with-backoff, structured logging, cost tracking, and fallback model logic once in the wrapper. All agent code calls wrapper → change behavior everywhere by updating the wrapper only.' },

  { id: 2122, domain: 2, domainName: 'Agent Development', topic: 'Performance Optimization', difficulty: 'hard', keywords: ['batching', 'throughput', 'optimization', 'performance'],
    question: 'Request batching in LLM agent systems improves efficiency by:',
    options: { A: 'Grouping multiple user requests into one large LLM call', B: 'Sending multiple independent LLM requests in parallel rather than sequentially, reducing wall-clock time', C: 'Combining multiple users\' prompts into a single prompt', D: 'Batching is only applicable for training, not inference' },
    answer: 'B', explanation: 'Parallel request batching: if agent needs to analyze 10 documents, send all 10 LLM calls in parallel via asyncio.gather() instead of sequentially. Reduces 10× serial latency to ~1× parallel latency (bounded by slowest call).' },

  { id: 2123, domain: 2, domainName: 'Agent Development', topic: 'Dynamic Tool Loading', difficulty: 'hard', keywords: ['dynamic tools', 'tool registry', 'lazy loading', 'plugin'],
    question: 'Dynamic tool loading (vs static tool lists) in agents enables:',
    options: { A: 'Faster tool execution through pre-loading', B: 'Loading only tools relevant to the current task/user context, reducing prompt size and avoiding tool selection confusion from irrelevant options', C: 'Tools can be updated without restarting the agent', D: 'Both B and C' },
    answer: 'D', explanation: 'Dynamic tool loading provides: (1) context-relevant tools only → smaller prompt, less LLM confusion; (2) hot-swappable tools → update tool implementations without agent restart. Both benefits combine.' },

  { id: 2124, domain: 2, domainName: 'Agent Development', topic: 'Agent Documentation', difficulty: 'easy', keywords: ['documentation', 'runbook', 'README', 'developer'],
    question: 'Agent runbooks for operations teams should include:',
    options: { A: 'Implementation code for the agent', B: 'Common failure scenarios and symptoms, diagnostic steps, remediation procedures, and escalation contacts', C: 'Only architectural diagrams', D: 'User-facing feature documentation' },
    answer: 'B', explanation: 'Operations runbooks: "Symptom: high error rate → Check: LLM API status, token budget exhaustion, tool service health → Remediation: enable fallback model, clear token budget alert → Escalate to: [team contact] if unresolved in 30 min."' },

  { id: 2125, domain: 2, domainName: 'Agent Development', topic: 'Natural Language Interfaces', difficulty: 'medium', keywords: ['natural language', 'NLU', 'intent', 'entity'],
    question: 'Intent classification in natural language agent interfaces determines:',
    options: { A: 'The grammatical intent of the sentence', B: 'What the user is trying to accomplish, routing to the appropriate agent or workflow for that intent category', C: 'The user\'s emotional intent (sentiment)', D: 'Intent is not relevant for LLM-based agents' },
    answer: 'B', explanation: 'Intent classification: "I want to cancel my subscription" → cancel_subscription intent → route to CancellationAgent. Enables: specialized handling per intent, analytics on what users want, and prioritization of high-value intents.' },

  { id: 2126, domain: 2, domainName: 'Agent Development', topic: 'Sensitive Data Handling', difficulty: 'hard', keywords: ['PII', 'anonymization', 'redaction', 'data privacy'],
    question: 'When user input may contain PII that should not be sent to external LLM APIs, the approach is:',
    options: { A: 'Block all inputs containing potential PII', B: 'Detect PII entities, pseudonymize/redact before sending to API, then re-identify in the response', C: 'Use only on-premise LLMs for all use cases', D: 'PII detection is the user\'s responsibility, not the system\'s' },
    answer: 'B', explanation: 'PII-safe LLM pipeline: detect entities (NER model) → replace with tokens ([PERSON_1], [EMAIL_1]) → send to API → replace tokens back in response. Complies with data residency requirements while using cloud LLMs.' },

  { id: 2127, domain: 2, domainName: 'Agent Development', topic: 'Error Messages', difficulty: 'easy', keywords: ['error messages', 'user-facing', 'actionable', 'helpful'],
    question: 'User-facing error messages from AI agents should:',
    options: { A: 'Expose full technical error details including stack traces', B: 'Explain what went wrong in user terms, what to do next, and whether the issue is temporary or requires escalation', C: 'Simply say "An error occurred" without details', D: 'Always redirect to human support for any error' },
    answer: 'B', explanation: 'User-facing errors: "I couldn\'t access that file (permission denied). Please check file permissions or contact your admin. If this persists, try [alternative]. Reference: ERR-2024-X for support." Actionable, not technical jargon.' },

  { id: 2128, domain: 2, domainName: 'Agent Development', topic: 'Multi-Step Workflows', difficulty: 'medium', keywords: ['workflow', 'orchestration', 'state machine', 'steps'],
    question: 'State machines for modeling agent workflows provide:',
    options: { A: 'Better LLM performance through structured reasoning', B: 'Explicit, auditable representation of valid states and transitions, preventing agents from entering invalid states', C: 'Automatic state recovery after failures', D: 'State machines are too complex for most agent workflows' },
    answer: 'B', explanation: 'State machine for agents: states = {collecting_info, validating, processing, completed, error}, transitions = valid paths between. Enforces: can\'t process without validating first, error state is always recoverable. Makes agent behavior predictable.' },

  { id: 2129, domain: 2, domainName: 'Agent Development', topic: 'Prompt Injection Defense', difficulty: 'hard', keywords: ['prompt injection', 'defense', 'sanitization', 'detection'],
    question: 'Defense-in-depth against prompt injection in agents includes: (Choose two)',
    options: { A: 'Input validation checking for common injection patterns before sending to LLM', B: 'Never using external content in prompts', C: 'Output validation checking if the agent\'s response followed injected instructions', D: 'Using shorter system prompts to reduce injection surface' },
    answer: 'AC', explanation: 'Defense-in-depth: (1) Input-side: detect injection patterns ("ignore previous instructions"), escape/label external content as data not instructions; (2) Output-side: does response match expected task behavior? Anomalous responses suggest injection succeeded.' },

  { id: 2130, domain: 2, domainName: 'Agent Development', topic: 'Continuous Improvement', difficulty: 'medium', keywords: ['continuous improvement', 'feedback', 'iteration', 'metrics'],
    question: 'A continuous improvement loop for deployed agents consists of:',
    options: { A: 'Weekly meetings to discuss agent performance', B: 'Collect usage → analyze failures → identify patterns → prioritize improvements → implement → evaluate → deploy', C: 'Quarterly model upgrades only', D: 'Waiting for user complaints before making changes' },
    answer: 'B', explanation: 'Agent improvement loop: automated collection of interactions + outcomes → failure analysis (clustering, root cause) → prioritized improvements (highest impact) → A/B test → deploy if metrics improve. Data-driven iteration.' },

  { id: 2131, domain: 2, domainName: 'Agent Development', topic: 'Tool Result Handling', difficulty: 'medium', keywords: ['tool result', 'error handling', 'parsing', 'interpretation'],
    question: 'When a tool returns an unexpected result format to an agent, the robust handling approach is:',
    options: { A: 'Pass the raw unexpected result to the LLM and hope it handles it', B: 'Validate the result against expected schema, handle known error codes, and provide structured error with context if invalid', C: 'Retry the same tool call without any changes', D: 'Fail the entire agent task immediately' },
    answer: 'B', explanation: 'Tool result handling: validate schema → known error codes → structured error info. "Tool returned 403: insufficient permissions for resource X. Suggest trying read-only alternative or requesting access." Context helps agent recover gracefully.' },

  { id: 2132, domain: 2, domainName: 'Agent Development', topic: 'NeMo Framework Development', difficulty: 'medium', keywords: ['NeMo', 'NVIDIA', 'framework', 'development'],
    question: 'NVIDIA NeMo framework simplifies LLM agent development by providing:',
    options: { A: 'Only pre-trained model weights for download', B: 'End-to-end toolkit: data curation, training, fine-tuning, alignment (RLHF), and evaluation for LLMs and multimodal models', C: 'A drag-and-drop interface for building agents', D: 'NeMo is only for research, not production development' },
    answer: 'B', explanation: 'NeMo covers the full LLM development lifecycle: data preparation → training from scratch or continue pre-training → supervised fine-tuning → RLHF alignment → evaluation → export (to TensorRT-LLM, NIM). Production-grade toolkit.' },

  { id: 2133, domain: 2, domainName: 'Agent Development', topic: 'Embeddings Selection', difficulty: 'medium', keywords: ['embedding model', 'selection', 'MTEB', 'domain-specific'],
    question: 'Selecting an embedding model for domain-specific RAG should consider:',
    options: { A: 'Always use the largest embedding model available', B: 'Performance on MTEB benchmarks for your task type (retrieval, similarity), domain relevance, and inference cost', C: 'Only use embedding models from your LLM provider', D: 'Embedding model doesn\'t matter — only the LLM quality matters' },
    answer: 'B', explanation: 'Embedding selection: MTEB leaderboard shows retrieval performance across domains. Domain-specific models (legal, medical, code) often outperform general models on domain data. Balance performance vs. inference cost vs. model size.' },

  { id: 2134, domain: 2, domainName: 'Agent Development', topic: 'Agent Rollout Strategy', difficulty: 'medium', keywords: ['rollout', 'deployment', 'staged', 'feature flag'],
    question: 'Feature flags for AI agent capabilities enable:',
    options: { A: 'Flagging inappropriate content in agent responses', B: 'Gradually enabling new features for subsets of users, enabling rollback if issues arise without full redeployment', C: 'Mandatory feature reviews before deployment', D: 'Flagging agents that don\'t meet quality standards' },
    answer: 'B', explanation: 'Feature flags: new "advanced reasoning" mode enabled for 5% of users first → monitor quality metrics → if no regression, expand to 25% → 100%. Full rollback by toggling flag, not redeployment. Enables dark launches and A/B tests.' },

  { id: 2135, domain: 2, domainName: 'Agent Development', topic: 'Model Context Window Strategies', difficulty: 'medium', keywords: ['context window', 'long document', 'chunking strategy', 'map reduce'],
    question: 'Map-reduce approach for processing documents longer than the context window works by:',
    options: { A: 'Compressing documents to fit within the context window', B: 'Map: process each chunk independently with the same query; Reduce: aggregate/synthesize chunk results into a final answer', C: 'Running on a Hadoop cluster for distributed processing', D: 'Only applicable to code documents, not natural language' },
    answer: 'B', explanation: 'Map-reduce for long docs: split → map each chunk ("summarize this chunk") in parallel → reduce ("synthesize these summaries into one answer"). Handles unlimited document length while staying within context limits.' },

  { id: 2136, domain: 2, domainName: 'Agent Development', topic: 'Cross-Agent Testing', difficulty: 'hard', keywords: ['integration testing', 'contract testing', 'cross-agent', 'end-to-end'],
    question: 'Contract testing between agents (vs full integration testing) provides:',
    options: { A: 'Legally binding agreements between agent development teams', B: 'Lightweight verification that each agent honors its API contract without requiring the full system to run together', C: 'More thorough testing than integration testing in all cases', D: 'Testing that includes production data automatically' },
    answer: 'B', explanation: 'Contract tests (Pact, etc.): test that "Agent A as consumer" and "Agent B as provider" both honor the agreed contract. Runs without full system deployment. Catches API contract violations before integration testing.' },

  { id: 2137, domain: 2, domainName: 'Agent Development', topic: 'Model Evaluation at Scale', difficulty: 'medium', keywords: ['LLM-as-judge', 'evaluation', 'scale', 'automated'],
    question: 'LLM-as-judge evaluation at scale works by:',
    options: { A: 'Having an LLM read and rate every human evaluation', B: 'Using a capable LLM (e.g., GPT-4) to evaluate other model outputs against a rubric, enabling automated quality assessment at volume', C: 'Judges are LLMs that decide on training data inclusion', D: 'All evaluation must use human judges for reliability' },
    answer: 'B', explanation: 'LLM-as-judge: prompt evaluator LLM with "Rate this response 1-5 on helpfulness and accuracy. Response: [response]." Correlates well with human judgment on many tasks, enabling evaluation of thousands of examples that human labelers couldn\'t review.' },

  { id: 2138, domain: 2, domainName: 'Agent Development', topic: 'Agent Documentation Generation', difficulty: 'easy', keywords: ['documentation', 'auto-generation', 'docstring', 'API docs'],
    question: 'Automatically generating agent tool documentation from code helps because:',
    options: { A: 'Documentation is always more accurate than human-written docs', B: 'Documentation stays synchronized with code changes and reduces manual maintenance burden', C: 'Auto-generated docs are better for LLM tool descriptions', D: 'Auto-generation is required for compliance certification' },
    answer: 'B', explanation: 'Auto-generated docs from code (type hints, docstrings): always current since regenerated on build. Human-maintained docs drift from code. For tool descriptions, auto-generate from well-documented function signatures → inject into LLM prompts.' },

  { id: 2139, domain: 2, domainName: 'Agent Development', topic: 'Security Testing', difficulty: 'hard', keywords: ['penetration testing', 'red team', 'jailbreak', 'adversarial'],
    question: 'Red-teaming AI agents before production deployment involves:',
    options: { A: 'Having the development team review their own code', B: 'Systematically attempting to break safety constraints, elicit harmful outputs, and find exploitable vulnerabilities through adversarial testing', C: 'Testing under high load conditions', D: 'Having marketing review agent responses for brand safety' },
    answer: 'B', explanation: 'AI red-teaming: adversarially probe for: jailbreaks, prompt injection vulnerabilities, data leakage, harmful output generation, safety bypass techniques, and unexpected behaviors. Find vulnerabilities before attackers do.' },

  { id: 2140, domain: 2, domainName: 'Agent Development', topic: 'Tool Deprecation', difficulty: 'medium', keywords: ['deprecation', 'versioning', 'migration', 'backwards compatibility'],
    question: 'Deprecating a tool from an agent\'s toolbox should follow:',
    options: { A: 'Immediate removal without notice', B: 'Deprecation notice period with usage tracking, migration guidance to replacement tool, then removal after low usage confirmed', C: 'Keep deprecated tools indefinitely to avoid breaking changes', D: 'Only deprecate tools that have never been used' },
    answer: 'B', explanation: 'Tool deprecation: mark deprecated in docs → track usage → notify agent teams → provide migration path to replacement → remove after usage drops or migration period ends. Avoids breaking running agents abruptly.' },

  { id: 2141, domain: 2, domainName: 'Agent Development', topic: 'API Rate Limiting', difficulty: 'medium', keywords: ['rate limit', 'quota', 'throttling', 'backoff'],
    question: 'When hitting LLM API rate limits, the correct response pattern is:',
    options: { A: 'Immediately fail and surface error to user', B: 'Exponential backoff with jitter, respecting Retry-After headers, and queue overflow when all retries exhausted', C: 'Infinite retry until the rate limit clears', D: 'Switch to a different user\'s API key' },
    answer: 'B', explanation: 'Rate limit handling: catch 429 → read Retry-After header if present → exponential backoff: 1s, 2s, 4s, 8s + random jitter → max retries (5-7) → fail with informative message. Jitter prevents thundering herd on shared rate limits.' },

  { id: 2142, domain: 2, domainName: 'Agent Development', topic: 'Gradio/Streamlit UIs', difficulty: 'easy', keywords: ['Gradio', 'Streamlit', 'rapid prototyping', 'UI'],
    question: 'Gradio and Streamlit are useful for AI agent development for:',
    options: { A: 'Production-grade enterprise UI deployment', B: 'Rapid prototyping and demo UIs enabling non-UI developers to quickly build interactive interfaces for testing agents', C: 'Only for academic research demonstrations', D: 'Building mobile applications for agent access' },
    answer: 'B', explanation: 'Gradio/Streamlit: few lines of Python → interactive web UI for testing agents. Not production-grade but valuable for: quick demos, stakeholder feedback, rapid iteration on agent behavior before building proper frontend.' },

  { id: 2143, domain: 2, domainName: 'Agent Development', topic: 'Multi-Turn Conversation Design', difficulty: 'medium', keywords: ['multi-turn', 'conversation design', 'context', 'dialogue'],
    question: 'Maintaining coherent multi-turn conversations in agents requires:',
    options: { A: 'Sending only the latest message to the LLM for each turn', B: 'Including the full conversation history in each request so the LLM has context for prior turns, pronouns, and references', C: 'Using a separate memory model for conversation tracking', D: 'Asking users to repeat their context each turn' },
    answer: 'B', explanation: 'Multi-turn context: include [system] + [user: turn1] + [assistant: response1] + [user: turn2] in each request. Without history, LLM can\'t resolve pronouns ("fix that bug" — which bug?), understand references, or maintain task state.' },

  { id: 2144, domain: 2, domainName: 'Agent Development', topic: 'Token Efficiency', difficulty: 'medium', keywords: ['token efficiency', 'compression', 'prompt optimization', 'cost'],
    question: 'Prompt compression techniques (Selective Context, LLMLingua) reduce costs by:',
    options: { A: 'Compressing the model\'s KV cache', B: 'Removing tokens from prompts that contribute little information (filler words, redundant context) while preserving meaning', C: 'Using zip compression on prompts before sending', D: 'Reducing the precision of floating-point embeddings' },
    answer: 'B', explanation: 'LLMLingua-style compression: tokenize prompt → score each token\'s importance (perplexity/attention-based) → drop low-importance tokens → 2-4x shorter prompt with ~same information. Significant cost reduction for long document processing.' },

  { id: 2145, domain: 2, domainName: 'Agent Development', topic: 'Dependency Injection Patterns', difficulty: 'hard', keywords: ['dependency injection', 'inversion of control', 'testability', 'coupling'],
    question: 'Constructor injection vs property injection for agent dependencies:',
    options: { A: 'They are identical in practice', B: 'Constructor injection makes dependencies explicit and required — agent can\'t be created without them, preventing partial initialization bugs', C: 'Property injection is always preferable for flexibility', D: 'Neither should be used — use global singletons instead' },
    answer: 'B', explanation: 'Constructor injection: dependencies required at construction time — can\'t create an agent without LLM client, tool registry, etc. Prevents "forgot to inject X" bugs. Property injection allows partial initialization (anti-pattern for required deps).' },

  { id: 2146, domain: 2, domainName: 'Agent Development', topic: 'Agent Performance Profiling', difficulty: 'medium', keywords: ['profiling', 'bottleneck', 'optimization', 'timing'],
    question: 'Profiling an agent workflow to find performance bottlenecks reveals that 80% of latency comes from:',
    options: { A: 'Python interpreter overhead', B: 'Network I/O waiting for LLM API responses — the solution is parallelizing independent LLM calls, not optimizing Python code', C: 'JSON serialization and deserialization', D: 'Memory allocation for conversation history' },
    answer: 'B', explanation: 'Typical agent profiling: LLM API wait time dominates (80-95% of latency). Optimization: parallelize independent calls (asyncio.gather), cache repeated computations, use streaming to reduce perceived latency — not micro-optimizations.' },

  { id: 2147, domain: 2, domainName: 'Agent Development', topic: 'Domain-Specific Fine-Tuning', difficulty: 'hard', keywords: ['fine-tuning', 'domain adaptation', 'specialized', 'training data'],
    question: 'When does fine-tuning outperform prompt engineering alone for domain-specific agents?',
    options: { A: 'Always — fine-tuning is always better than prompting', B: 'When the task requires domain-specific knowledge, style, or behavior that can\'t be fully captured in a reasonable-length system prompt', C: 'Only when training data exceeds 1 million examples', D: 'Fine-tuning is never worth the cost for modern large models' },
    answer: 'B', explanation: 'Fine-tuning wins when: specialized terminology permeates responses (medical, legal, code style), strict format adherence is needed, latency is critical (shorter prompts), or confidential domain knowledge can\'t be in prompts.' },

  { id: 2148, domain: 2, domainName: 'Agent Development', topic: 'Behavioral Testing', difficulty: 'hard', keywords: ['behavioral testing', 'specification', 'BDD', 'scenario'],
    question: 'Behavioral-Driven Development (BDD) for AI agents specifies tests as:',
    options: { A: 'Unit tests for all agent functions', B: 'Natural language scenarios ("Given X, When Y, Then Z") that describe expected agent behavior from a user perspective', C: 'Behavior-tracking dashboards for deployed agents', D: 'Training data in behavioral format' },
    answer: 'B', explanation: 'BDD for agents: "Given the user asks about drug interactions, When the agent responds, Then it should recommend consulting a doctor and not prescribe dosages." Scenarios as living documentation and automated tests aligned with intended behavior.' },

  { id: 2149, domain: 2, domainName: 'Agent Development', topic: 'Async Tools', difficulty: 'medium', keywords: ['async tool', 'long-running', 'polling', 'webhook'],
    question: 'Long-running tool operations (> 30 seconds) in agents should use:',
    options: { A: 'Synchronous blocking with a 5-minute timeout', B: 'Async pattern: tool returns job_id immediately → agent polls status or receives webhook callback when complete', C: 'Retry every second until complete', D: 'Stream results progressively to the agent' },
    answer: 'B', explanation: 'Long-running async tools: tool starts job → returns {job_id, status: pending} → agent continues other work or waits → polls/receives callback when complete. Prevents blocking the entire agent conversation waiting for slow operations.' },

  { id: 2150, domain: 2, domainName: 'Agent Development', topic: 'Development Best Practices', difficulty: 'medium', keywords: ['best practices', 'development', 'standards', 'principles'],
    question: 'The principle of "minimum viable agent" (MVA) in development suggests:',
    options: { A: 'Building the smallest possible agent with no useful capabilities', B: 'Starting with the simplest agent that solves the core use case, then adding complexity only when the simple version proves insufficient', C: 'Using the minimum number of tokens per request', D: 'Minimum viable applies only to product planning, not technical development' },
    answer: 'B', explanation: 'MVA: solve the core problem with a simple single-agent + tools before building multi-agent orchestration. Many complex agent failures stem from premature complexity. Simple agents are more debuggable, reliable, and maintainable.' },
];
