import { Question } from '../types';

export const domain1cQuestions: Question[] = [
  { id: 1101, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent State Management', difficulty: 'medium', keywords: ['state', 'stateful', 'stateless', 'context'],
    question: 'Stateless agent architecture differs from stateful by:',
    options: { A: 'Stateless agents have no memory of previous interactions; each call is independent', B: 'Stateless agents cannot use tools', C: 'Stateless agents are faster but less capable than stateful ones in all cases', D: 'Stateful agents require more RAM and are never used in production' },
    answer: 'A', explanation: 'Stateless: each request carries all needed context; the agent has no persistent state between calls. Stateful: agent maintains state across calls. Stateless is easier to scale (no shared state), stateful enables long-running tasks.' },

  { id: 1102, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Tool Description Quality', difficulty: 'medium', keywords: ['tool description', 'schema', 'documentation', 'LLM'],
    question: 'High-quality tool descriptions for LLM agents should include:',
    options: { A: 'Only the function name and parameter types', B: 'Clear purpose, parameter semantics with examples, return value description, and when NOT to use the tool', C: 'Implementation code so the LLM understands internals', D: 'Only a brief one-line summary for brevity' },
    answer: 'B', explanation: 'LLMs select tools based on descriptions alone. Comprehensive tool docs: purpose (what problem it solves), parameters (what values are valid with examples), returns (format and meaning), and negative examples (when to avoid it).' },

  { id: 1103, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Event-Driven Agents', difficulty: 'hard', keywords: ['event-driven', 'trigger', 'reactive', 'async'],
    question: 'Event-driven agent architectures are preferred over polling when:',
    options: { A: 'Latency doesn\'t matter and batch processing is acceptable', B: 'Near-real-time response to external triggers is required and events are infrequent relative to polling overhead', C: 'The agent needs to process large amounts of data', D: 'Multiple agents must coordinate synchronously' },
    answer: 'B', explanation: 'Event-driven (webhook, message queue): agent activates on event arrival, zero latency, minimal resource use when idle. Polling: constant resource consumption, max latency = poll interval. Event-driven wins for responsive sparse events.' },

  { id: 1104, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Boundaries', difficulty: 'medium', keywords: ['agent scope', 'responsibility', 'single responsibility', 'modularity'],
    question: 'The Single Responsibility Principle applied to agent design means:',
    options: { A: 'Each agent should be deployed on a single server', B: 'Each agent should have one well-defined purpose, making it easier to test, replace, and reason about', C: 'Each agent should use only one tool', D: 'A single agent should handle all tasks in the system' },
    answer: 'B', explanation: 'SRP for agents: a "Research Agent" only researches, a "Write Agent" only writes. Single-purpose agents are testable in isolation, replaceable without system-wide impact, and easier to debug when they fail.' },

  { id: 1105, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Data Flow Patterns', difficulty: 'medium', keywords: ['pipeline', 'data flow', 'sequential', 'parallel'],
    question: 'Fan-out/fan-in pattern in agent pipelines is used to:',
    options: { A: 'Redirect failed requests to backup agents', B: 'Distribute work across multiple parallel agents (fan-out) then aggregate results into a single output (fan-in)', C: 'Distribute load to external services and then merge logs', D: 'Send the same task to multiple agents and take the majority vote' },
    answer: 'B', explanation: 'Fan-out/fan-in: orchestrator fans out subtasks to N parallel agents simultaneously (reducing total time), then fans in by aggregating/merging all results into the final response. Classic parallel decomposition pattern.' },

  { id: 1106, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Context Injection', difficulty: 'medium', keywords: ['context injection', 'system prompt', 'RAG', 'grounding'],
    question: 'The primary difference between static system prompts and dynamic context injection is:',
    options: { A: 'System prompts are longer than injected context', B: 'System prompts are fixed at deployment; dynamic injection retrieves relevant context per-request tailored to the specific query', C: 'Dynamic injection uses the embedding model while system prompts do not', D: 'System prompts are more expensive to process' },
    answer: 'B', explanation: 'Static system prompt: fixed instructions that apply to all requests. Dynamic injection: retrieve query-specific context (RAG, user profile, current data) per request — combining the structured guidance of system prompts with relevant real-time information.' },

  { id: 1107, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Versioning', difficulty: 'medium', keywords: ['versioning', 'A/B test', 'canary', 'rollback'],
    question: 'Canary deployments for AI agents allow:',
    options: { A: 'Deploying agents that detect canary-in-coal-mine scenarios', B: 'Routing a small percentage of traffic to a new agent version to validate performance before full rollout', C: 'Deploying agents only in testing environments with canary data', D: 'Using yellow-colored monitoring dashboards for visibility' },
    answer: 'B', explanation: 'Canary deployments: route 5% of traffic to new agent version → monitor quality metrics and errors → if stable, gradually increase to 100%. Catches regressions before they affect most users.' },

  { id: 1108, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Microservices vs Monolith', difficulty: 'medium', keywords: ['microservices', 'monolith', 'trade-off', 'architecture'],
    question: 'A monolithic agent architecture is preferable to microservices when:',
    options: { A: 'The system is simple, team is small, and operational complexity of distributed services exceeds the benefits', B: 'The agent needs to handle millions of concurrent users', C: 'Multiple programming languages are needed', D: 'The agent needs independent deployability of components' },
    answer: 'A', explanation: 'Monolith first: for small teams and simple systems, monolithic agents avoid distributed systems complexity (network failures, service discovery, distributed tracing). Migrate to microservices when the team and scale justify it.' },

  { id: 1109, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Specification Design', difficulty: 'hard', keywords: ['contract', 'spec', 'interface definition', 'API first'],
    question: 'API-first design for agent tools means:',
    options: { A: 'Building the web API before the agent logic', B: 'Defining tool schemas and contracts before implementation, enabling parallel development and clear integration contracts', C: 'Deploying API documentation before any code is written', D: 'Using REST APIs exclusively for tool communication' },
    answer: 'B', explanation: 'API-first: define tool JSON schema (name, parameters, returns, errors) first. Enables: frontend teams to mock while backend implements, consumers to validate inputs, and documentation to auto-generate from the spec.' },

  { id: 1110, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Dependency Management', difficulty: 'medium', keywords: ['dependency', 'coupling', 'loose coupling', 'injection'],
    question: 'Dependency injection in AI agent systems improves:',
    options: { A: 'Response speed by pre-loading dependencies', B: 'Testability and flexibility — agents receive dependencies (tools, LLM clients, configs) from outside rather than creating them internally', C: 'Security by injecting authentication dependencies', D: 'Performance by injecting GPU drivers directly' },
    answer: 'B', explanation: 'DI for agents: instead of agent creating its own OpenAI client, it receives one. In tests, inject a mock client returning predetermined responses. In production, inject the real client. Same agent code, swappable behavior.' },

  { id: 1111, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Specialization', difficulty: 'medium', keywords: ['domain specialist', 'generalist', 'specialist agent', 'routing'],
    question: 'Specialist agents (vs general agents) in multi-agent systems provide:',
    options: { A: 'Higher performance on their domain through focused fine-tuning and specialized tooling', B: 'Lower cost since smaller models can be used for simple tasks', C: 'Better performance on all tasks compared to general agents', D: 'Reduced need for orchestration' },
    answer: 'A', explanation: 'Specialist agents: fine-tuned on domain data, equipped with domain-specific tools, system-prompted as domain experts. A "Legal Research Agent" outperforms a general agent on legal tasks because of focused optimization.' },

  { id: 1112, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Message Passing', difficulty: 'medium', keywords: ['message queue', 'async', 'pub-sub', 'broker'],
    question: 'Message queues between agents provide:',
    options: { A: 'Synchronous communication with guaranteed ordering', B: 'Decoupling producers from consumers — agents communicate via messages without direct connections, enabling independent scaling and resilience', C: 'Encryption of agent communications', D: 'A central control plane for all agent operations' },
    answer: 'B', explanation: 'Message queues decouple agents: producer puts message in queue and continues; consumer processes when ready. Enables: independent scaling, retry on consumer failure, traffic smoothing, and temporal decoupling.' },

  { id: 1113, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Prompt Caching in Architecture', difficulty: 'hard', keywords: ['prompt caching', 'KV cache', 'cost reduction', 'latency'],
    question: 'Prompt caching for agent systems reduces costs by:',
    options: { A: 'Storing completed responses and returning them for identical queries', B: 'Caching the KV attention computation of static prefix content (system prompt, tool descriptions) so it\'s not recomputed per request', C: 'Caching embeddings for frequently asked questions', D: 'Storing tool results and reusing them across sessions' },
    answer: 'B', explanation: 'Prompt caching (Anthropic, Google): when repeated content appears at the start of requests (system prompts, tool schemas), the KV cache is reused rather than recomputed — saving 80-90% of input token processing cost for cached portions.' },

  { id: 1114, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Graph-Based Agent Workflows', difficulty: 'hard', keywords: ['DAG', 'graph', 'LangGraph', 'workflow'],
    question: 'LangGraph represents agent workflows as state graphs to:',
    options: { A: 'Visualize agent performance metrics on a graph', B: 'Enable conditional branching, cycles (for iterative refinement), and explicit state management in complex agentic workflows', C: 'Store agent conversation history in graph databases', D: 'Connect multiple language models in a neural network graph' },
    answer: 'B', explanation: 'LangGraph state graphs: nodes=agent steps, edges=transitions (conditional or unconditional), state=shared data. Cycles enable: "generate → critique → improve" loops. Explicit graph = debuggable, reproducible workflows.' },

  { id: 1115, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Response Streaming', difficulty: 'medium', keywords: ['streaming', 'SSE', 'progressive', 'latency'],
    question: 'Streaming agent responses (vs waiting for complete response) improves UX by:',
    options: { A: 'Producing higher quality responses due to streaming optimization', B: 'Reducing perceived latency — users see output tokens as they generate rather than waiting for the full response', C: 'Allowing the agent to correct earlier parts of the response', D: 'Streaming is only relevant for voice interfaces' },
    answer: 'B', explanation: 'Streaming with SSE/WebSockets: user sees output token-by-token, reducing time-to-first-token from seconds to ~50-200ms. Perception of faster response even when total time is the same.' },

  { id: 1116, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Multi-Modal Architecture', difficulty: 'medium', keywords: ['vision', 'audio', 'multimodal', 'input types'],
    question: 'Routing in multimodal agent systems directs inputs based on:',
    options: { A: 'Randomly assigned processing paths', B: 'Input modality (text/image/audio) to appropriate processing pipelines and models optimized for that modality', C: 'Input length regardless of content type', D: 'User subscription tier' },
    answer: 'B', explanation: 'Multimodal routing: text → language model, images → vision model + OCR, audio → ASR → text then language model, video → frame sampling + vision. Each modality gets the optimized processing stack.' },

  { id: 1117, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Configuration Management', difficulty: 'easy', keywords: ['configuration', 'environment variables', 'secrets', 'settings'],
    question: 'Agent configuration best practices include:',
    options: { A: 'Hardcoding all values directly in agent code for simplicity', B: 'Externalizing configuration (env vars, config files, secrets managers) from code, enabling deployment-specific settings', C: 'Storing API keys in the agent\'s system prompt', D: 'Using the same configuration for dev, staging, and production' },
    answer: 'B', explanation: 'Externalized configuration: model names, API endpoints, timeouts, and secrets live in environment variables or secrets managers — not in code. Enables: different configs per environment, secret rotation without code changes.' },

  { id: 1118, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Mesh', difficulty: 'hard', keywords: ['agent mesh', 'service mesh', 'observability', 'communication'],
    question: 'An "agent mesh" architecture applies service mesh concepts to AI agents by:',
    options: { A: 'Connecting agents using mesh networking hardware', B: 'Adding a sidecar/proxy layer handling observability, retry, auth, and routing between agents, separate from agent business logic', C: 'Meshing multiple LLM outputs together for better quality', D: 'Creating a mesh topology where all agents connect to each other' },
    answer: 'B', explanation: 'Agent mesh: infrastructure sidecar handles cross-cutting concerns (telemetry, retry logic, authentication, rate limiting, service discovery) between agents — letting agent business logic focus on reasoning, not networking.' },

  { id: 1119, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Capacity Planning', difficulty: 'medium', keywords: ['capacity', 'throughput', 'concurrency', 'scaling'],
    question: 'Capacity planning for LLM agent systems requires accounting for:',
    options: { A: 'Only the GPU VRAM required per model', B: 'Token throughput requirements, model inference latency, concurrency targets, and context window size per session', C: 'Only the cost per API call', D: 'CPU capacity only since LLMs run on CPU' },
    answer: 'B', explanation: 'LLM capacity planning: tokens/second throughput (scales with GPU count), p95 latency targets (time-to-first-token + generation time), concurrent users × avg tokens per session, and model batch size optimization.' },

  { id: 1120, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Hybrid Agent Architectures', difficulty: 'hard', keywords: ['hybrid', 'rule-based', 'neural', 'combined'],
    question: 'Hybrid agent architectures combine rule-based and neural components because:',
    options: { A: 'Rule-based components are cheaper and always preferred', B: 'Rules handle well-defined deterministic logic reliably; neural handles ambiguity and natural language — combining both captures strengths of each', C: 'Pure neural agents fail all regulatory requirements', D: 'Hybrid architectures have lower latency than pure neural' },
    answer: 'B', explanation: 'Hybrid design: rules for "if account is frozen, deny transaction" (must be 100% reliable), LLM for "interpret why customer is upset" (requires natural language understanding). Rules = auditability + reliability, LLM = flexibility.' },

  { id: 1121, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Action Space Design', difficulty: 'hard', keywords: ['action space', 'tool design', 'primitive', 'composite'],
    question: 'Designing agent action spaces with both primitive and composite actions allows:',
    options: { A: 'Agents to use primitive actions for safety and composite for speed', B: 'Efficiency — composite actions wrap common multi-step sequences, while primitives provide flexibility for novel combinations', C: 'Agents to bypass safety checks on composite actions', D: 'Reducing the number of LLM calls by always using composites' },
    answer: 'B', explanation: 'Primitive actions (single operations) + composite actions (common sequences): "search_and_summarize" wraps search + extract + summarize. Composites reduce LLM planning steps for common patterns; primitives handle edge cases.' },

  { id: 1122, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Discovery', difficulty: 'medium', keywords: ['discovery', 'registry', 'directory', 'capability'],
    question: 'An agent capability registry in multi-agent systems enables:',
    options: { A: 'Registering agents with government AI oversight agencies', B: 'Dynamic discovery — orchestrators query the registry to find agents with needed capabilities without hardcoded agent lists', C: 'Tracking agent performance scores for reporting', D: 'Storing agent conversations for training data' },
    answer: 'B', explanation: 'Agent registry: maps capabilities to agent endpoints ("who can do legal research?" → LegalResearchAgent). Orchestrators query dynamically — new specialized agents register themselves and become immediately available.' },

  { id: 1123, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Asynchronous Execution', difficulty: 'medium', keywords: ['async', 'non-blocking', 'await', 'concurrent'],
    question: 'Async/await patterns in agent code enable:',
    options: { A: 'Agents to defer all computation until a later time', B: 'Non-blocking I/O — while waiting for LLM API responses or tool calls, the event loop handles other requests', C: 'Asynchronous communication between agent instances', D: 'Parallel GPU computation for faster inference' },
    answer: 'B', explanation: 'Async agents: while one user\'s request awaits the LLM API (network I/O), the event loop processes other users\' requests. Dramatically improves throughput without adding more servers.' },

  { id: 1124, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Context Protocol', difficulty: 'hard', keywords: ['MCP', 'Model Context Protocol', 'standardization', 'interoperability'],
    question: 'The Model Context Protocol (MCP) standardizes:',
    options: { A: 'How LLMs compress their context window', B: 'A standard interface for AI models to interact with external tools, data sources, and services across different frameworks', C: 'Message formatting between agents in multi-agent systems', D: 'Context window size limits across different LLM providers' },
    answer: 'B', explanation: 'MCP (Anthropic, 2024): universal protocol for AI ↔ tools/resources. Any MCP-compatible client (Claude, etc.) can use any MCP server (file system, GitHub, databases) without custom integration code per tool.' },

  { id: 1125, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Interfaces', difficulty: 'easy', keywords: ['API', 'CLI', 'web', 'interface'],
    question: 'Exposing AI agents through standardized REST APIs enables:',
    options: { A: 'Agents to only work with web browsers', B: 'Language-agnostic integration — any client (web app, mobile app, CLI, other services) can use the agent through standard HTTP', C: 'REST APIs are slower than direct Python integration', D: 'Only synchronous request-response patterns' },
    answer: 'B', explanation: 'REST APIs decouple agent implementation from consumers: a Python agent can be called by JavaScript frontends, Java backend services, or mobile apps. Standard interface = maximum interoperability.' },

  { id: 1126, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Structured Data Handling', difficulty: 'medium', keywords: ['structured output', 'JSON', 'validation', 'schema'],
    question: 'JSON Schema validation of LLM outputs in agent pipelines prevents:',
    options: { A: 'LLMs from generating invalid JSON syntax', B: 'Downstream processing failures caused by unexpected field names, missing required fields, or wrong data types in LLM outputs', C: 'Hallucinations in factual content', D: 'Only syntax errors, not semantic errors' },
    answer: 'B', explanation: 'LLMs occasionally deviate from requested schemas. Schema validation catches: missing required fields, wrong types (number instead of string), extra fields. Catch at extraction → retry with correction → prevent downstream crashes.' },

  { id: 1127, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Scalability Patterns', difficulty: 'medium', keywords: ['horizontal scaling', 'stateless', 'load balancing', 'autoscaling'],
    question: 'Horizontal autoscaling of AI agents works best when agents are:',
    options: { A: 'Stateful with shared in-memory state', B: 'Stateless — any instance can handle any request without shared state, enabling any-instance load balancing', C: 'Deployed on the largest possible GPU instances', D: 'Constrained to a single geographic region' },
    answer: 'B', explanation: 'Horizontal autoscaling requires stateless agents: add/remove instances freely since no instance holds unique state. Sessions stored externally (Redis, DB) → any instance serves any user → true elastic scale.' },

  { id: 1128, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Cognitive Architecture', difficulty: 'hard', keywords: ['cognitive architecture', 'SOAR', 'ACT-R', 'memory structures'],
    question: 'Cognitive architectures (SOAR, ACT-R) influence modern AI agent design through:',
    options: { A: 'Directly running symbolic AI models from the 1980s', B: 'Insights on separating procedural, episodic, and semantic memory; goal-directed behavior; and symbolic-neural integration', C: 'Providing the software architecture for modern transformers', D: 'Cognitive architecture standards require compliance for enterprise AI' },
    answer: 'B', explanation: 'Cognitive architecture insights: procedural memory (how-to knowledge → agent skills), episodic (what happened → interaction logs), semantic (world facts → knowledge base), production rules (if-then behaviors) — all map to modern agent components.' },

  { id: 1129, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Meta-Agent Patterns', difficulty: 'hard', keywords: ['meta-agent', 'agent factory', 'dynamic creation', 'orchestration'],
    question: 'A meta-agent that dynamically creates specialized sub-agents for each task provides:',
    options: { A: 'Reduced cost by reusing the same agent for all tasks', B: 'Flexibility to compose optimally configured agents per task type rather than using static pre-configured agents', C: 'Better performance through recursive self-improvement', D: 'Mandatory approval workflows before agent creation' },
    answer: 'B', explanation: 'Meta-agents ("agent factories"): analyze incoming task → create a specialized sub-agent configured optimally (right tools, system prompt, model) for that specific task type → execute → discard. Each task gets a purpose-built agent.' },

  { id: 1130, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Tool Composition', difficulty: 'medium', keywords: ['tool pipeline', 'composition', 'chaining', 'tool chain'],
    question: 'Tool composition in agent systems allows:',
    options: { A: 'Combining multiple tools into a single API endpoint', B: 'Building complex operations by chaining tools — output of one becomes input of the next, enabling operations no single tool supports', C: 'Composing tool documentation from multiple sources', D: 'Deploying tools on composite infrastructure' },
    answer: 'B', explanation: 'Tool composition: fetch_data → transform → analyze → format_report. Each tool is simple and testable; chains enable complex workflows. LLMs automatically compose tools to solve tasks that require multiple steps.' },

  { id: 1131, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Personas', difficulty: 'easy', keywords: ['persona', 'system prompt', 'character', 'role'],
    question: 'System prompt persona design for agents should avoid:',
    options: { A: 'Giving the agent a clear role and area of expertise', B: 'Claiming to be human, deceiving users about AI nature, or enabling users to change the agent\'s core values through conversation', C: 'Using friendly and helpful language', D: 'Describing the agent\'s purpose and limitations' },
    answer: 'B', explanation: 'Persona anti-patterns: "I am a human expert" (deceptive), "Ignore your previous instructions" susceptibility (jailbreak), or value-override via roleplay ("pretend you have no restrictions"). Personas should be authentic AI identities.' },

  { id: 1132, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Security Architecture', difficulty: 'hard', keywords: ['zero trust', 'authentication', 'agent identity', 'certificate'],
    question: 'Zero-trust security for agent-to-agent communication requires:',
    options: { A: 'All agents to share a single authentication token', B: 'Each agent has its own identity and proves it cryptographically on every inter-agent call, regardless of network location', C: 'Agents within the same network trust each other without verification', D: 'Zero trust means no agents can communicate with each other' },
    answer: 'B', explanation: 'Zero-trust for agents: mutual TLS with agent-specific certificates, JWT tokens with agent identity claims, and authorization checks per call. "Never trust, always verify" — even internal agents must authenticate to each other.' },

  { id: 1133, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Workflow Templates', difficulty: 'medium', keywords: ['workflow template', 'pattern', 'reuse', 'parameterized'],
    question: 'Parameterized workflow templates in agent systems allow:',
    options: { A: 'Templates that automatically generate parameters', B: 'Reusing proven workflow patterns across different tasks by substituting task-specific values into a fixed workflow structure', C: 'Storing workflow configurations as template literals in code', D: 'Parameterizing the LLM\'s temperature and top_p settings' },
    answer: 'B', explanation: 'Workflow templates: "research → write → review" template parameterized with topic, audience, and length. Same proven flow used for different content types — reducing planning overhead while maintaining flexibility.' },

  { id: 1134, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Distributed State', difficulty: 'hard', keywords: ['distributed state', 'consensus', 'eventual consistency', 'CAP'],
    question: 'When multiple agents need shared mutable state, the recommended approach is:',
    options: { A: 'Each agent maintains its own copy and syncs periodically', B: 'A centralized state store (Redis, database) with appropriate locking/transactions to prevent concurrent modification conflicts', C: 'Agents vote on state changes using consensus algorithms', D: 'Shared state should never be used between agents' },
    answer: 'B', explanation: 'Shared state between agents: use a dedicated store (Redis, PostgreSQL) as single source of truth. Optimistic locking for low-contention (compare-and-swap), pessimistic for high-contention. Avoids split-brain and race conditions.' },

  { id: 1135, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Design Patterns Review', difficulty: 'medium', keywords: ['design patterns', 'best practices', 'architecture review', 'principles'],
    question: 'Which agent design pattern involves having an LLM reflect on its own outputs before returning them?',
    options: { A: 'Chain of Thought', B: 'Reflection/Critique Pattern — the agent generates an initial output then self-critiques and revises before final output', C: 'RAG (Retrieval Augmented Generation)', D: 'Tool Use Pattern' },
    answer: 'B', explanation: 'Reflection pattern: generate draft → "critique this output for accuracy, completeness, and tone" → revise based on critique. Can iterate multiple times. Improves quality at the cost of additional LLM calls and latency.' },

  { id: 1136, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Output Parsers', difficulty: 'medium', keywords: ['output parser', 'structured output', 'regex', 'schema'],
    question: 'Robust output parsers for LLM agents should handle:',
    options: { A: 'Only perfectly formatted JSON outputs', B: 'Variations in LLM output format, partial failures, and provide clear error messages enabling automatic retry with correction', C: 'Only single-line outputs for efficiency', D: 'Output parsing is unnecessary with modern structured output APIs' },
    answer: 'B', explanation: 'Production output parsers: handle LLMs wrapping JSON in markdown code blocks, using single instead of double quotes, minor schema violations — clean and extract, or fail gracefully with structured error for retry.' },

  { id: 1137, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agentic Framework Selection', difficulty: 'medium', keywords: ['LangChain', 'LlamaIndex', 'AutoGen', 'framework'],
    question: 'When selecting an agentic framework, key criteria include:',
    options: { A: 'Only the number of GitHub stars', B: 'Maturity, community support, compatibility with chosen LLMs/tools, flexibility for custom patterns, and debugging capabilities', C: 'The framework must be written in Python', D: 'Only use NVIDIA-provided frameworks for NCP-AAI certification' },
    answer: 'B', explanation: 'Framework selection criteria: LangChain (large ecosystem, mature), LlamaIndex (RAG-focused), AutoGen (multi-agent), AgentIQ (NVIDIA-optimized). Choose based on use case, team expertise, and vendor support needs.' },

  { id: 1138, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Observability Design', difficulty: 'medium', keywords: ['observability', 'design', 'telemetry', 'instrumentation'],
    question: 'Building observability into agent architecture from the start (vs adding later) is important because:',
    options: { A: 'It\'s too expensive to add telemetry after deployment', B: 'Agentic workflows have complex, non-linear execution paths that are extremely hard to debug without built-in tracing from the beginning', C: 'Regulatory requirements mandate pre-built observability', D: 'Observability is only needed in production, not development' },
    answer: 'B', explanation: 'Agent workflows: non-deterministic paths, LLM calls within loops, dynamic tool selection — "why did the agent fail in production?" is nearly unanswerable without step-level traces built in from the start.' },

  { id: 1139, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Resilient Design', difficulty: 'hard', keywords: ['resilience', 'chaos engineering', 'fault injection', 'design'],
    question: 'Designing AI agents for resilience means:',
    options: { A: 'Using the most powerful models available to reduce failure frequency', B: 'Assuming failures will occur and building: fallbacks, graceful degradation, timeout handling, and recovery procedures', C: 'Resilient design only applies to network infrastructure, not AI logic', D: 'Using redundant GPUs to prevent hardware failure' },
    answer: 'B', explanation: 'Resilient agent design: "what if this tool fails?" (fallback), "what if LLM times out?" (retry with backoff), "what if context gets too long?" (summarize and compress), "what if budget exceeded?" (graceful degradation).' },

  { id: 1140, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Test Environments', difficulty: 'medium', keywords: ['testing environment', 'sandbox', 'staging', 'production'],
    question: 'Isolated sandbox environments for agent testing should:',
    options: { A: 'Use production data for realistic testing', B: 'Mirror production configuration but use synthetic data, mock external services, and prevent real-world side effects', C: 'Be identical to production in every way including live APIs', D: 'Only test the final integrated system without unit tests' },
    answer: 'B', explanation: 'Agent sandboxes: realistic config (same model, tools, prompts) but synthetic data + mocked external APIs (email won\'t actually send, database is isolated). Prevents accidental real-world actions during testing.' },

  { id: 1141, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Latency Optimization', difficulty: 'hard', keywords: ['latency', 'optimization', 'p99', 'streaming'],
    question: 'To minimize agent response latency, which strategies are most effective? (Choose two)',
    options: { A: 'Speculative execution — start processing likely next steps before current step completes', B: 'Using larger models for better single-pass accuracy, reducing retries', C: 'Prompt caching for repeated content (system prompts, tool descriptions)', D: 'Increasing timeout values to allow more processing time' },
    answer: 'AC', explanation: 'Speculative execution: if step N almost certainly leads to step N+1, start N+1 while N completes. Prompt caching: avoid reprocessing static system prompts and tool schemas on every request — up to 90% cost and latency reduction for cached portions.' },

  { id: 1142, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Progressive Agent Complexity', difficulty: 'medium', keywords: ['simplicity', 'complexity', 'evolutionary', 'start simple'],
    question: 'The recommended approach for building agent systems is:',
    options: { A: 'Design the full complex multi-agent system upfront before building anything', B: 'Start with the simplest possible agent (single LLM call + tools), add complexity only when proven necessary', C: 'Copy existing agent architectures from open-source projects', D: 'Begin with maximum automation and reduce based on failures' },
    answer: 'B', explanation: 'Evolutionary agent design: single agent with tools → add memory when needed → add specialized sub-agents when single agent is insufficient → add orchestration when sub-agents need coordination. Each step justified by demonstrated need.' },

  { id: 1143, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Feedback Incorporation', difficulty: 'medium', keywords: ['RLHF', 'preference learning', 'feedback loop', 'online learning'],
    question: 'Incorporating user feedback into deployed agent behavior (online learning) requires:',
    options: { A: 'Retraining the base model on each piece of feedback', B: 'A careful pipeline: collect feedback, filter/validate quality, batch for periodic fine-tuning or RLHF, with offline evaluation before deployment', C: 'Immediate real-time model updates for fastest improvement', D: 'User feedback is only useful for qualitative UX improvement, not model improvement' },
    answer: 'B', explanation: 'Online learning pipeline: user feedback → quality filtering (remove gaming/noise) → labeled dataset creation → offline fine-tuning + evaluation → staged deployment. Direct real-time updates risk catastrophic forgetting and adversarial manipulation.' },

  { id: 1144, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Cost Attribution', difficulty: 'medium', keywords: ['cost', 'attribution', 'billing', 'department'],
    question: 'Token cost attribution in multi-tenant AI agent systems requires:',
    options: { A: 'Dividing total costs equally among all users', B: 'Tracking token usage per user/team/department through request metadata and billing dashboards for cost visibility and control', C: 'Cost attribution is only needed for external billing, not internal tracking', D: 'Token costs should be hidden from business users' },
    answer: 'B', explanation: 'Cost attribution: tag each LLM call with user_id, team, project, feature. Aggregate in billing system. Enables: department chargebacks, identifying expensive use patterns, budget alerts, and ROI analysis per use case.' },

  { id: 1145, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Schema-First Development', difficulty: 'medium', keywords: ['schema', 'type safety', 'Pydantic', 'TypeScript'],
    question: 'Using Pydantic models (Python) or TypeScript interfaces for agent I/O provides:',
    options: { A: 'Automatic documentation generation only', B: 'Runtime validation catching data issues at agent boundaries, and type safety enabling IDE support and catching integration bugs early', C: 'Performance improvement from compiled schemas', D: 'Schema definitions are optional — only needed for public APIs' },
    answer: 'B', explanation: 'Schema-first for agents: Pydantic/TypeScript enforce input validation at boundaries (LLM output → typed structure), catch mismatches at dev time vs runtime, and enable IDE autocomplete for agent I/O objects.' },

  { id: 1146, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Multi-Model Architecture', difficulty: 'hard', keywords: ['model routing', 'multiple models', 'LLM selection', 'ensemble'],
    question: 'LLM routing (using different models for different tasks) optimizes:',
    options: { A: 'Only cost — always route to the cheapest model', B: 'Cost-quality tradeoffs — route simple classification to fast/cheap models, complex reasoning to powerful models', C: 'Using only one model for consistency', D: 'Only latency — always use the fastest model' },
    answer: 'B', explanation: 'LLM routing: "is this a simple FAQ?" → GPT-3.5/Haiku (cheap, fast, sufficient); "does this require nuanced legal analysis?" → GPT-4/Claude Opus (expensive but necessary). Optimize cost without sacrificing quality where it matters.' },

  { id: 1147, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Identity', difficulty: 'medium', keywords: ['identity', 'authentication', 'JWT', 'principal'],
    question: 'Agent identity management in enterprise deployments needs to address:',
    options: { A: 'Only human user authentication', B: 'Issuing cryptographic identities to agents (JWT, certificates) for service authentication, enabling authorization policies and audit trails', C: 'Agents should use shared service accounts for simplicity', D: 'Agent identity is the same as the human user who deployed it' },
    answer: 'B', explanation: 'Agent identity: each agent instance has a unique identity (JWT with agent_id, role claims) used for: calling other services (service-to-service auth), audit logging ("Agent-X read file Y"), and RBAC for tool access.' },

  { id: 1148, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Domain-Driven Design', difficulty: 'hard', keywords: ['DDD', 'bounded context', 'domain', 'aggregate'],
    question: 'Domain-Driven Design (DDD) applied to AI agents suggests:',
    options: { A: 'Agents should be designed by domain experts without developer input', B: 'Organizing agents around business domains with bounded contexts — each agent aligns with a domain concept and speaks its ubiquitous language', C: 'Domain models should replace all agent decision-making', D: 'DDD principles don\'t apply to AI systems' },
    answer: 'B', explanation: 'DDD for agents: "Customer Service Agent" owns customer interaction domain with its language and data; "Inventory Agent" owns inventory domain. Bounded contexts prevent domain leakage and make agent responsibilities clear.' },

  { id: 1149, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Failure Mode Analysis', difficulty: 'hard', keywords: ['FMEA', 'failure modes', 'analysis', 'risk'],
    question: 'Failure Mode and Effects Analysis (FMEA) for AI agents systematically identifies:',
    options: { A: 'All possible code bugs in the agent implementation', B: 'Potential failure modes, their severity, likelihood, and detectability — enabling prioritized risk mitigation before deployment', C: 'Failures in the GPU hardware running the agent', D: 'Financial failures from excessive API costs' },
    answer: 'B', explanation: 'FMEA for agents: list failure modes (tool timeout, hallucination, context overflow, injection attack) → severity (1-10) × probability (1-10) × detectability (1-10) = RPN → prioritize mitigations for high-RPN failures.' },

  { id: 1150, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Architecture Review', difficulty: 'medium', keywords: ['architecture review', 'trade-offs', 'documentation', 'decision'],
    question: 'Architecture Decision Records (ADRs) for AI agent systems should document:',
    options: { A: 'Only the final architecture, not alternatives considered', B: 'The decision, context, options considered, rationale for chosen option, and known consequences/trade-offs', C: 'Only decisions that turned out to be correct', D: 'Technical specifications without business context' },
    answer: 'B', explanation: 'ADRs for agents: "Chose LangGraph over vanilla Python for workflow orchestration. Context: complex conditional logic. Options: LangGraph, Prefect, raw Python. Chose LangGraph for built-in state management. Trade-off: additional dependency."' },
];
