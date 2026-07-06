import { Question } from '../types';

export const domain1bQuestions: Question[] = [
  { id: 1051, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Tool Types', difficulty: 'easy', keywords: ['tool types', 'read', 'write', 'action'],
    question: 'Which category of agent tools carries the highest risk if executed incorrectly?',
    options: { A: 'Read-only tools that retrieve information', B: 'Write/action tools that modify state (send email, delete file, execute code)', C: 'Search tools that query databases', D: 'Logging tools that record events' },
    answer: 'B', explanation: 'Action tools have real-world consequences that may be irreversible. Read-only tools are inherently safer since they don\'t change state.' },

  { id: 1052, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Persona', difficulty: 'easy', keywords: ['persona', 'role', 'system prompt', 'identity'],
    question: 'Defining a clear agent persona in the system prompt helps with:',
    options: { A: 'Reducing GPU memory usage', B: 'Establishing consistent tone, expertise level, and behavioral boundaries for the agent', C: 'Automatically selecting which tools to use', D: 'Encrypting agent communications' },
    answer: 'B', explanation: 'A well-defined persona (e.g., "You are a senior NVIDIA engineer") shapes tone, vocabulary, expertise claims, and behavioral defaults consistently across all interactions.' },

  { id: 1053, domain: 1, domainName: 'Agent Architecture & Design', topic: 'DAG vs Graph', difficulty: 'medium', keywords: ['DAG', 'directed acyclic graph', 'cycles', 'workflow'],
    question: 'The key difference between a DAG-based workflow and a cyclic agent graph is:',
    options: { A: 'DAGs are faster; cyclic graphs are more accurate', B: 'DAGs have no loops — each step runs once; cyclic graphs allow retry/refinement loops', C: 'DAGs use more memory than cyclic graphs', D: 'There is no meaningful difference' },
    answer: 'B', explanation: 'DAGs guarantee termination (each step once) suitable for linear pipelines. Cyclic graphs support iterative refinement but require explicit termination conditions to avoid infinite loops.' },

  { id: 1054, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Cold Start', difficulty: 'medium', keywords: ['cold start', 'initialization', 'warm-up', 'latency'],
    question: 'Agent cold start latency is primarily caused by:',
    options: { A: 'The agent needing time to "think" before responding', B: 'Loading model weights into GPU memory and establishing connections to tools/databases for the first request', C: 'Network congestion during peak hours', D: 'Authentication overhead for the first request' },
    answer: 'B', explanation: 'Cold start involves GPU memory allocation and model weight loading (seconds for large models) plus connection pool establishment. Warm instances reuse loaded models and open connections.' },

  { id: 1055, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Schema Design', difficulty: 'medium', keywords: ['schema', 'tool input', 'validation', 'required fields'],
    question: 'In tool schema design, marking a parameter as "required" vs "optional" is important because:',
    options: { A: 'Required parameters are processed faster by the LLM', B: 'The LLM must include all required parameters; missing required params cause tool call failures', C: 'Optional parameters are ignored by the tool runtime', D: 'Required parameters are automatically validated before the LLM calls the tool' },
    answer: 'B', explanation: 'Required parameters must be present in the LLM\'s tool call JSON or the runtime rejects it. Clear required/optional distinction guides the LLM to provide necessary inputs.' },

  { id: 1056, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Topology', difficulty: 'hard', keywords: ['topology', 'star', 'mesh', 'pipeline', 'multi-agent'],
    question: 'A "star topology" in multi-agent systems means:',
    options: { A: 'All agents are equal and communicate directly with each other', B: 'One central orchestrator communicates with all worker agents; workers don\'t communicate directly', C: 'Agents form a chain where each passes output to the next', D: 'Each agent runs on a separate star-rated GPU' },
    answer: 'B', explanation: 'Star topology centralizes communication through one hub — the orchestrator manages all coordination, simplifying routing but creating a single point of failure.' },

  { id: 1057, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Grounding', difficulty: 'medium', keywords: ['grounding', 'factual', 'hallucination', 'knowledge'],
    question: 'Grounding in the context of AI agents refers to:',
    options: { A: 'Connecting the agent to electrical ground for safety', B: 'Connecting agent outputs to verifiable evidence, facts, or real-world data sources', C: 'Setting the agent\'s base URL for API calls', D: 'The process of initializing agent memory at startup' },
    answer: 'B', explanation: 'Grounded agents base their outputs on retrieved documents, tool results, or database records — reducing hallucination by tethering claims to verifiable sources.' },

  { id: 1058, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Delegation Pattern', difficulty: 'medium', keywords: ['delegation', 'handoff', 'subtask', 'routing'],
    question: 'In the delegation pattern, an agent delegates a subtask when:',
    options: { A: 'It wants to avoid doing difficult work', B: 'The subtask requires specialized knowledge or tools better handled by a specialist subagent', C: 'The agent runs out of context window space', D: 'The user requests it explicitly' },
    answer: 'B', explanation: 'Delegation improves quality and efficiency — a coding agent delegates code review to a specialist reviewer agent rather than trying to do both equally well in one model call.' },

  { id: 1059, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent-Environment Interface', difficulty: 'medium', keywords: ['environment', 'observation', 'action space', 'interface'],
    question: 'The agent-environment interface defines:',
    options: { A: 'The physical server environment where the agent runs', B: 'What the agent can observe (inputs) and what actions it can take (output/action space)', C: 'The network environment configuration', D: 'The GPU driver version the agent requires' },
    answer: 'B', explanation: 'Clearly defining observations (what the agent sees) and actions (what it can do) is fundamental to agent design — it determines the problem scope and limits unintended behaviors.' },

  { id: 1060, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Token Economics', difficulty: 'medium', keywords: ['tokens', 'cost', 'context', 'budget'],
    question: 'Token budget management in production agents requires balancing:',
    options: { A: 'Model accuracy vs response speed', B: 'Information completeness (more context = better reasoning) vs cost (more tokens = higher API cost)', C: 'GPU utilization vs CPU utilization', D: 'Response length vs user satisfaction' },
    answer: 'B', explanation: 'Every token has a cost. Effective token management keeps the most relevant context in the prompt (enabling good reasoning) while trimming redundant information (controlling cost).' },

  { id: 1061, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Graph Compilation', difficulty: 'hard', keywords: ['compile', 'LangGraph', 'validation', 'runnable'],
    question: 'In LangGraph, calling graph.compile() serves to:',
    options: { A: 'Compile Python code into bytecode for faster execution', B: 'Validate the graph structure and return a runnable object that can process inputs', C: 'Compile training data for fine-tuning', D: 'Compress the graph for storage' },
    answer: 'B', explanation: 'compile() validates graph connectivity (no orphaned nodes, valid edges), applies checkpointer configuration, and returns a CompiledGraph that exposes invoke/stream methods.' },

  { id: 1062, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Interruption Handling', difficulty: 'medium', keywords: ['interrupt', 'cancel', 'timeout', 'graceful'],
    question: 'When a user cancels an in-progress agent task, the agent should:',
    options: { A: 'Ignore the cancellation and complete the task', B: 'Immediately terminate all in-flight operations, save state if possible, and return a cancellation acknowledgment', C: 'Complete the current step and stop at the next checkpoint', D: 'Ask the user to confirm cancellation 3 times' },
    answer: 'B', explanation: 'Graceful cancellation requires propagating cancellation signals to all child operations, releasing resources (connections, files), and optionally saving partial state for resume.' },

  { id: 1063, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Zero-Shot Agent', difficulty: 'easy', keywords: ['zero-shot', 'no examples', 'general purpose'],
    question: 'A zero-shot ReAct agent uses tools:',
    options: { A: 'With zero latency', B: 'Without example demonstrations — relying solely on tool descriptions and LLM capability', C: 'Only for tasks with zero ambiguity', D: 'On zero external API calls' },
    answer: 'B', explanation: 'Zero-shot agents receive only tool definitions (names, descriptions, schemas) and rely on the LLM\'s instruction-following to correctly invoke tools without seeing examples.' },

  { id: 1064, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Output Format', difficulty: 'medium', keywords: ['output format', 'structured', 'markdown', 'JSON'],
    question: 'When an agent must return structured data to downstream systems, the recommended output approach is:',
    options: { A: 'Free-form prose that describes the data', B: 'Structured JSON or Pydantic models with enforced schema via structured output mode', C: 'Markdown formatted text with headers', D: 'CSV format for all data types' },
    answer: 'B', explanation: 'Structured output enforces schema compliance, enabling reliable downstream parsing. Free-form prose requires fragile parsing and frequently breaks on variations in phrasing.' },

  { id: 1065, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Discovery', difficulty: 'hard', keywords: ['agent discovery', 'registry', 'capability', 'MCP'],
    question: 'Model Context Protocol (MCP) aims to standardize:',
    options: { A: 'How LLMs train on contextual data', B: 'How AI agents discover and invoke tools/resources from external providers via a common protocol', C: 'The context window size across different models', D: 'Memory compression algorithms for context management' },
    answer: 'B', explanation: 'MCP (from Anthropic) defines a standard server-client protocol for agents to discover and use tools/resources from any MCP-compatible provider, enabling a composable tool ecosystem.' },

  { id: 1066, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agentic Frameworks Comparison', difficulty: 'medium', keywords: ['framework', 'comparison', 'LangGraph', 'AutoGen'],
    question: 'Microsoft AutoGen specializes in:',
    options: { A: 'Auto-generating training datasets', B: 'Multi-agent conversations where agents collaborate by chatting with each other to solve tasks', C: 'Automatically generating tool schemas', D: 'Auto-scaling agent deployments' },
    answer: 'B', explanation: 'AutoGen enables conversational multi-agent patterns — a UserProxy, AssistantAgent, and CriticAgent can hold group chats where each agent contributes from its perspective to solve complex tasks.' },

  { id: 1067, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Stochastic Behavior', difficulty: 'medium', keywords: ['determinism', 'stochastic', 'temperature', 'reproducibility'],
    question: 'The primary challenge of stochastic LLM behavior in production agents is:',
    options: { A: 'Higher inference cost compared to deterministic systems', B: 'Inconsistent behavior on identical inputs makes debugging, testing, and reliability guarantees difficult', C: 'Stochastic behavior improves creativity but degrades factual accuracy', D: 'Higher GPU temperature during stochastic sampling' },
    answer: 'B', explanation: 'Stochastic outputs make agents non-deterministic — the same input can produce different (sometimes wrong) outputs, complicating testing, reliability measurement, and user trust.' },

  { id: 1068, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Semantic Routing', difficulty: 'medium', keywords: ['semantic routing', 'intent', 'classifier', 'routing'],
    question: 'Semantic routing in agentic systems uses:',
    options: { A: 'URL routing for different agent endpoints', B: 'LLM or embedding-based intent classification to route user requests to the appropriate specialized agent', C: 'Semantic versioning for agent deployments', D: 'Hash-based load balancing across agent replicas' },
    answer: 'B', explanation: 'Semantic routers analyze query intent via embedding similarity or LLM classification, directing requests to the specialist agent best suited for that topic (coding, customer service, analysis, etc.).' },

  { id: 1069, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Context Budget', difficulty: 'hard', keywords: ['context budget', 'allocation', 'instruction', 'history', 'tools'],
    question: 'In managing an agent\'s context window budget, which allocation priority is correct?',
    options: { A: 'Conversation history > System instructions > Tools > Retrieved context', B: 'System instructions (high priority) > Retrieved context > Conversation history > Padding', C: 'Tools (largest space) > All other content', D: 'Retrieved context takes 100% of context budget for best RAG performance' },
    answer: 'B', explanation: 'System instructions define core behavior (critical, always present). Retrieved context is highly task-relevant. Older conversation history is lower priority and can be compressed or trimmed.' },

  { id: 1070, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Emergent Planning', difficulty: 'hard', keywords: ['emergent', 'planning', 'implicit', 'in-weights'],
    question: 'When a large LLM (GPT-4, Claude Opus) generates agent plans without explicit planning modules, this is called:',
    options: { A: 'Emergent planning — planning capability arising from scale of training without explicit design', B: 'Hardcoded planning — planning rules encoded in model weights', C: 'Zero-shot planning — planning with zero prior examples', D: 'Stochastic planning — random plan generation' },
    answer: 'A', explanation: 'Large models exhibit emergent planning — the ability to decompose tasks, reason about dependencies, and sequence actions arises from scale without explicit planning algorithms.' },

  { id: 1071, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Modular Agent Components', difficulty: 'easy', keywords: ['modules', 'LLM', 'tools', 'memory', 'action executor'],
    question: 'The four essential components of a complete AI agent system are:',
    options: { A: 'GPU, CPU, RAM, Storage', B: 'LLM (reasoning), Tools (actions), Memory (persistence), Action Executor (runs tools)', C: 'Frontend, Backend, Database, Cache', D: 'Encoder, Decoder, Attention, FFN' },
    answer: 'B', explanation: 'Complete agent architectures need: LLM for reasoning/planning, tools for taking actions, memory for context persistence, and an execution layer to actually run tool calls and observe results.' },

  { id: 1072, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Information Architecture', difficulty: 'medium', keywords: ['information architecture', 'agent', 'sources', 'hierarchy'],
    question: 'Agents should prioritize which information sources when answering? (Best order)',
    options: { A: 'Training knowledge > Retrieved documents > Tool outputs > User instructions', B: 'User instructions > Tool outputs > Retrieved documents > Training knowledge', C: 'Training knowledge is always most reliable', D: 'All sources should be weighted equally' },
    answer: 'B', explanation: 'Recency and task-specificity hierarchy: User instructions define the task (highest priority), fresh tool outputs reflect current reality, retrieved docs provide domain knowledge, training knowledge is the fallback baseline.' },

  { id: 1073, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Testing Pyramid', difficulty: 'medium', keywords: ['testing', 'unit', 'integration', 'end-to-end'],
    question: 'The agent testing pyramid consists of (base to top):',
    options: { A: 'Unit tests (prompt components, tools) → Integration tests (agent + tools) → End-to-end tests (full workflows)', B: 'E2E tests first, then unit tests at the top', C: 'Only LLM evaluations matter for agents', D: 'Security tests → Performance tests → Feature tests' },
    answer: 'A', explanation: 'Test pyramid: Many fast unit tests (individual tools, prompt templates) provide the foundation. Fewer integration tests check agent+tool composition. Minimal but comprehensive E2E tests verify complete workflows.' },

  { id: 1074, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Parallelism Safety', difficulty: 'hard', keywords: ['race condition', 'parallel', 'state mutation', 'thread safety'],
    question: 'Race conditions in multi-agent parallel execution occur when:',
    options: { A: 'Two agents race to solve the same problem first', B: 'Multiple agents concurrently read and write shared state without proper synchronization, causing inconsistency', C: 'Agents compete for GPU resources', D: 'Network latency causes agents to execute out of order' },
    answer: 'B', explanation: 'Without synchronization, parallel agents can overwrite each other\'s state updates. Immutable state patterns, optimistic locking, or reducer functions prevent race conditions in LangGraph.' },

  { id: 1075, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Function Calling Standards', difficulty: 'medium', keywords: ['OpenAI', 'Anthropic', 'tool_use', 'function_call'],
    question: 'The difference between OpenAI "function_call" and Anthropic "tool_use" content blocks is:',
    options: { A: 'Conceptually identical — both define LLM-invoked tools with name, input, and ID', B: 'OpenAI supports more tools per call', C: 'Anthropic\'s tool_use is slower due to additional parsing', D: 'They are incompatible and require different agent frameworks' },
    answer: 'A', explanation: 'Both implement the same concept (structured tool invocation) with slightly different JSON schemas. Agent frameworks like LangChain abstract over both, providing a unified interface.' },

  { id: 1076, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Observability Gaps', difficulty: 'hard', keywords: ['observability', 'gap', 'non-determinism', 'drift'],
    question: 'The hardest observability challenge in production LLM agents is:',
    options: { A: 'Measuring GPU utilization per agent', B: 'Detecting quality degradation — when responses become subtly wrong or less helpful without explicit errors', C: 'Counting the number of tool calls per session', D: 'Measuring API response time' },
    answer: 'B', explanation: 'Silent quality degradation (model provider changes, prompt drift, distribution shift) doesn\'t trigger error alerts but harms users. Requires continuous automated evaluation against quality metrics.' },

  { id: 1077, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Composition Patterns', difficulty: 'medium', keywords: ['composition', 'chain', 'parallel', 'conditional'],
    question: 'The "conditional routing" composition pattern routes agent execution based on:',
    options: { A: 'Random routing for load distribution', B: 'The content of agent state or LLM output — sending execution to different branches based on conditions', C: 'Network conditions at routing time', D: 'The user\'s subscription tier' },
    answer: 'B', explanation: 'Conditional routing examines state (e.g., "is the query about code or documents?") and routes to different specialized subgraphs, enabling intent-based branching.' },

  { id: 1078, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Conversation Design', difficulty: 'easy', keywords: ['conversation', 'multi-turn', 'session', 'history'],
    question: 'Multi-turn conversation management requires the agent to:',
    options: { A: 'Start fresh for every user message', B: 'Maintain context across turns — tracking what was asked, answered, and agreed upon in the conversation', C: 'Limit conversations to 3 turns maximum', D: 'Use a different model for each turn' },
    answer: 'B', explanation: 'Multi-turn conversations build on prior exchanges. Agents must track conversation history (user requests, agent responses, resolved ambiguities) to provide coherent, context-aware follow-up responses.' },

  { id: 1079, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Cost Attribution', difficulty: 'medium', keywords: ['cost', 'attribution', 'tracking', 'budget'],
    question: 'For multi-tenant agent applications, tracking costs per user/session is important because:',
    options: { A: 'It helps the LLM generate cheaper responses', B: 'It enables cost attribution, budget enforcement, and identification of expensive query patterns', C: 'It automatically reduces token usage', D: 'It is required by all LLM API providers' },
    answer: 'B', explanation: 'Per-session cost tracking enables chargeback to customers, identification of expensive users/queries, enforcement of usage quotas, and optimization of high-cost patterns.' },

  { id: 1080, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Adaptive Behavior', difficulty: 'medium', keywords: ['adaptive', 'personalization', 'user model', 'preferences'],
    question: 'An adaptive agent that personalizes responses to individual users requires:',
    options: { A: 'A separate LLM model per user', B: 'A user preference store that persists learned preferences, style, and domain knowledge across sessions', C: 'Retraining on each user\'s data separately', D: 'User-specific temperature settings only' },
    answer: 'B', explanation: 'Adaptive personalization requires persistent user profiles — stored preferences (verbosity, technical level, topics of interest) retrieved and injected into each new session\'s system prompt.' },

  { id: 1081, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Hybrid Architectures', difficulty: 'hard', keywords: ['hybrid', 'rule-based', 'LLM', 'deterministic'],
    question: 'A hybrid agent architecture combining LLM reasoning with rule-based components is preferred when:',
    options: { A: 'You want to use only one type of system', B: 'Certain decisions must be deterministic, auditable, or regulatory-compliant while others benefit from LLM flexibility', C: 'LLMs are too expensive for all tasks', D: 'Rule-based systems are always more accurate than LLMs' },
    answer: 'B', explanation: 'Hybrids route deterministic/compliance-critical decisions through rules (auditable, 100% consistent) while using LLM for ambiguous/nuanced reasoning — combining reliability and flexibility.' },

  { id: 1082, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent APIs', difficulty: 'medium', keywords: ['API design', 'agent endpoint', 'streaming', 'sync vs async'],
    question: 'A well-designed agent API should support which response modes? (Choose two)',
    options: { A: 'Synchronous blocking (wait for complete response) for simple integrations', B: 'Only synchronous for consistency', C: 'Streaming (server-sent events/WebSocket) for real-time token delivery', D: 'Only batch processing for efficiency' },
    answer: 'AC', explanation: 'Production agent APIs support both: synchronous for simple integrations expecting a complete response, and streaming for interactive UIs that show real-time token generation.' },

  { id: 1083, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Context Propagation', difficulty: 'hard', keywords: ['context propagation', 'trace', 'correlation', 'distributed'],
    question: 'Context propagation in distributed multi-agent systems refers to:',
    options: { A: 'Propagating the LLM\'s context window across services', B: 'Passing trace IDs, user context, and causal metadata through all services in a request chain for observability', C: 'Propagating configuration changes across all agents simultaneously', D: 'Syncing user context to all database replicas' },
    answer: 'B', explanation: 'Context propagation (via W3C trace-context headers) passes correlation IDs through all services/agents in a request, enabling distributed traces to be assembled for debugging.' },

  { id: 1084, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Memory Scoping', difficulty: 'medium', keywords: ['memory scope', 'session', 'user', 'global'],
    question: 'Agent memory scoping defines which level of context persists across what boundaries:',
    options: { A: 'All memory should be global and shared across all users', B: 'Session memory (current conversation), user memory (across sessions), global memory (shared knowledge base)', C: 'Memory should never persist across requests for privacy', D: 'Only session-level memory is ever appropriate' },
    answer: 'B', explanation: 'Memory has natural scopes: session (current conversation context), user (cross-session preferences and history), and global (shared knowledge, tools, FAQs available to all users).' },

  { id: 1085, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Tool Composition', difficulty: 'medium', keywords: ['tool composition', 'pipeline', 'chaining tools'],
    question: 'An agent chaining multiple tool calls (search → summarize → format) demonstrates:',
    options: { A: 'Inefficient use of tokens since one tool should be sufficient', B: 'Tool composition — using outputs of one tool as inputs to the next to accomplish complex goals', C: 'A bug in the agent\'s tool selection logic', D: 'Overly complex design that should be simplified' },
    answer: 'B', explanation: 'Tool composition enables complex workflows from simple primitives: search returns raw content → summarizer condenses it → formatter structures the output. Each tool excels at one thing.' },

  { id: 1086, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Trust Boundaries', difficulty: 'hard', keywords: ['trust', 'boundary', 'untrusted input', 'privilege'],
    question: 'An agent\'s trust boundary defines:',
    options: { A: 'How much users trust the agent\'s responses', B: 'The boundary between trusted (system-controlled) inputs and untrusted (user/external) inputs that receive higher scrutiny', C: 'The maximum number of trusted tool calls per session', D: 'Which LLM providers are trusted for the application' },
    answer: 'B', explanation: 'Trust boundaries determine which inputs get elevated privilege (system instructions, trusted tools) vs. which are treated as potentially adversarial (user input, retrieved web content).' },

  { id: 1087, domain: 1, domainName: 'Agent Architecture & Design', topic: 'API Gateway Pattern', difficulty: 'medium', keywords: ['API gateway', 'facade', 'aggregator', 'microservices'],
    question: 'An agent facade pattern consolidates:',
    options: { A: 'Multiple LLM models behind one interface', B: 'Multiple specialized agents behind a single unified API surface for callers', C: 'Multiple databases into one query interface', D: 'Multiple user accounts into one profile' },
    answer: 'B', explanation: 'A facade agent presents a single interface that internally routes to specialized agents (research, coding, writing) — callers interact with one endpoint, unaware of the internal agent topology.' },

  { id: 1088, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Backpressure', difficulty: 'hard', keywords: ['backpressure', 'queue', 'overload', 'flow control'],
    question: 'Backpressure mechanisms in agent systems prevent:',
    options: { A: 'Agents from pushing back against user requests', B: 'Overload cascades where slow downstream services cause request queues to grow unboundedly upstream', C: 'GPU memory from backing up during inference', D: 'Model weights from being overwritten during updates' },
    answer: 'B', explanation: 'Backpressure signals upstream services to slow down when downstream capacity is exceeded — preventing queue overflow, memory exhaustion, and cascading failures under load.' },

  { id: 1089, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Metrics', difficulty: 'medium', keywords: ['metrics', 'KPI', 'agent performance', 'business'],
    question: 'Which metrics best measure business value delivery of a customer service AI agent? (Choose two)',
    options: { A: 'Task completion rate (% of queries fully resolved by the agent)', B: 'Number of parameters in the deployed model', C: 'Customer satisfaction score (CSAT) after AI interactions', D: 'GPU utilization during peak hours' },
    answer: 'AC', explanation: 'Task completion rate measures effectiveness (did the agent solve the problem?). CSAT measures user satisfaction (did users find the interaction helpful?). Both directly reflect business value.' },

  { id: 1090, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Scale Considerations', difficulty: 'medium', keywords: ['scale', 'concurrent', 'sessions', 'stateless'],
    question: 'To support 10,000 concurrent agent sessions, the architecture must prioritize:',
    options: { A: 'Running one massive agent on a single GPU cluster', B: 'Stateless agent services with external state stores, enabling horizontal scaling to many instances', C: 'Reducing the LLM\'s parameter count to handle more sessions', D: 'Storing all session state in-process memory' },
    answer: 'B', explanation: 'At scale, stateless agent services (no in-process session state) can be horizontally scaled freely. External state stores (Redis, DynamoDB) serve as the shared state layer across instances.' },

  { id: 1091, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Conversation Patterns', difficulty: 'medium', keywords: ['one-shot', 'multi-turn', 'batch', 'patterns'],
    question: 'One-shot agent interactions are appropriate when:',
    options: { A: 'Always — one-shot is more efficient than multi-turn', B: 'The task is self-contained and can be completed with a single well-specified request and response', C: 'The user has only one question ever', D: 'One-shot reduces hallucination rates' },
    answer: 'B', explanation: 'One-shot is ideal for atomic tasks: generate a document, answer a factual question, classify an item. Complex, evolving tasks requiring clarification or refinement benefit from multi-turn design.' },

  { id: 1092, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Failure Modes', difficulty: 'medium', keywords: ['failure modes', 'stuck', 'hallucination', 'off-track'],
    question: 'Which are common agent failure modes in production? (Choose two)',
    options: { A: 'Getting stuck in loops — repeatedly trying the same failing action without progress', B: 'Generating responses too quickly', C: 'Hallucinating tool results without actually calling the tool', D: 'Using too few tokens in responses' },
    answer: 'AC', explanation: 'Loop failures (retrying with no progress) and hallucinated tool calls (fabricating results rather than executing) are two of the most common and dangerous agent failure modes.' },

  { id: 1093, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent System Design', difficulty: 'hard', keywords: ['system design', 'reliability', 'scalability', 'maintainability'],
    question: 'The CAP theorem considerations for multi-agent state stores prioritize:',
    options: { A: 'Consistency over availability for financial agents (wrong state = wrong transactions)', B: 'Availability over consistency always for all agent types', C: 'Partition tolerance is optional for most agents', D: 'CAP theorem does not apply to AI systems' },
    answer: 'A', explanation: 'For financial/transactional agents, state consistency is critical — reading stale state could cause duplicate charges or missed payments. Use strongly consistent stores (RDBMS) despite availability trade-offs.' },

  { id: 1094, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Knowledge Cutoff', difficulty: 'easy', keywords: ['knowledge cutoff', 'outdated', 'real-time', 'RAG'],
    question: 'To provide agents with information beyond their training knowledge cutoff, you should:',
    options: { A: 'Retrain the model on new data every day', B: 'Use RAG to retrieve current information from up-to-date sources at query time', C: 'Ask users to provide context in every message', D: 'Use an older model with a more recent cutoff' },
    answer: 'B', explanation: 'RAG decouples knowledge freshness from model training — agents retrieve current information (news, documentation, database records) at query time without retraining.' },

  { id: 1095, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Webhook Integration', difficulty: 'medium', keywords: ['webhook', 'async', 'callback', 'event'],
    question: 'Webhooks in agent architectures enable:',
    options: { A: 'Web-based UI for agent management', B: 'Asynchronous notification — external systems push events to the agent when they occur, avoiding polling', C: 'Hooking agent code into web frameworks', D: 'Secure HTTPS connections for agent APIs' },
    answer: 'B', explanation: 'Webhooks let the agent react to external events (payment completed, file uploaded, code committed) without polling — the external system pushes to the agent when the event occurs.' },

  { id: 1096, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Message Bus Pattern', difficulty: 'hard', keywords: ['message bus', 'pub-sub', 'event-driven', 'decoupled'],
    question: 'A message bus architecture for multi-agent systems provides:',
    options: { A: 'A physical bus connecting GPU memory to CPUs', B: 'Loose coupling — agents publish events and subscribe to events without direct dependencies on each other', C: 'A bus route for agent API requests', D: 'Shared memory between co-located agents' },
    answer: 'B', explanation: 'Pub-sub message buses (Kafka, RabbitMQ) let agents communicate without direct connections — producers publish events to topics, consumers subscribe independently, enabling flexible agent topologies.' },

  { id: 1097, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Minimal Agent', difficulty: 'easy', keywords: ['minimal', 'simple', 'LLM + tools', 'basic'],
    question: 'The minimal viable agent architecture consists of:',
    options: { A: 'LLM + memory + tools + monitoring + orchestration + security layer', B: 'An LLM with tool calling capability and a loop that executes tool calls until the task is complete', C: 'A complete microservice mesh with dedicated services for each component', D: 'A pre-trained model with no additional configuration' },
    answer: 'B', explanation: 'The minimal agent is just: LLM with tools + execution loop. Start here and add complexity (memory, monitoring, orchestration) only when you have evidence it\'s needed.' },

  { id: 1098, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Contracts', difficulty: 'medium', keywords: ['contract', 'interface', 'SLA', 'guarantees'],
    question: 'Defining service contracts between agent components enables:',
    options: { A: 'Legally binding agreements for AI-generated content', B: 'Independent development and testing of components; any implementation satisfying the contract can be swapped', C: 'Automatic code generation from contracts', D: 'Guaranteed response time SLAs for LLM calls' },
    answer: 'B', explanation: 'Contracts (interface definitions, schemas, behavioral specs) decouple components — you can swap the retriever, LLM, or tool implementation without touching other components.' },

  { id: 1099, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Collaboration', difficulty: 'medium', keywords: ['collaboration', 'consensus', 'debate', 'multi-agent'],
    question: 'The "multi-agent debate" pattern improves response quality by:',
    options: { A: 'Having multiple agents argue and the loudest one wins', B: 'Multiple agents generate independent responses, critique each other\'s answers, and reach a refined consensus', C: 'Letting users vote on which agent response they prefer', D: 'Using debate training data to improve the model' },
    answer: 'B', explanation: 'Multi-agent debate leverages the "society of mind" — independent agents generate diverse perspectives, critique each other\'s reasoning, and iterate toward a higher-quality consensus answer.' },

  { id: 1100, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Production Architecture Review', difficulty: 'hard', keywords: ['production', 'review', 'checklist', 'readiness'],
    question: 'A production agent architecture review should verify: (Choose two)',
    options: { A: 'Rate limiting and backpressure mechanisms exist to prevent runaway costs/load', B: 'The agent uses the maximum available model size', C: 'Graceful degradation paths exist when LLM API or tools are unavailable', D: 'The agent\'s code is written in Python specifically' },
    answer: 'AC', explanation: 'Production readiness requires: rate limiting/backpressure (prevent cost explosions and cascade failures) and graceful degradation (keep serving users at reduced capability when dependencies fail).' },
];
