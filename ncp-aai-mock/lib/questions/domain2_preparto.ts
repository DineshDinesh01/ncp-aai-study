import { Question } from '../types';

export const domain2PrepartoQuestions: Question[] = [
  {
    id: 2801,
    domain: 2,
    domainName: 'Agent Development',
    topic: 'Scenario: NeMo Agent Toolkit Integration',
    question: 'Your team has an existing LangChain-based research agent in production. You want to add observability without rewriting the agent. You evaluate NVIDIA AgentIQ (NeMo Agent Toolkit). Select TWO capabilities AgentIQ provides that make it suitable for this requirement.',
    options: {
      A: 'AgentIQ compiles the LangChain agent\'s Python code to optimized C++ at first run, reducing inference latency by 10x.',
      B: 'AgentIQ wraps existing LangChain agents with a thin instrumentation layer using its profiler decorator, requiring no changes to the agent\'s core logic.',
      C: 'AgentIQ provides a workflow profiler that captures per-step latency, token counts, and tool call traces, exportable to OpenTelemetry-compatible backends.',
      D: 'AgentIQ automatically identifies and fixes bugs in LangChain agent code by analyzing execution traces.',
      E: 'AgentIQ replaces LangChain\'s memory module with a GPU-accelerated vector memory system by default.'
    },
    answer: 'BC',
    explanation: '(B) AgentIQ\'s non-invasive wrapping is its key value proposition: a @profiler decorator or wrapper function instruments existing agents without changing their logic. (C) The workflow profiler captures latency and token metrics per step and exports to OpenTelemetry, Phoenix, Weave, and Langfuse. Option A is fabricated — AgentIQ does not compile Python to C++. Option D is fabricated — AgentIQ observes, it does not fix code. Option E is false — AgentIQ doesn\'t replace LangChain memory.',
    keywords: ['AgentIQ', 'NeMo', 'LangChain', 'observability', 'instrumentation'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 2802,
    domain: 2,
    domainName: 'Agent Development',
    topic: 'Scenario: Framework Selection',
    question: 'You are building a customer onboarding agent that needs: (1) a directed graph of steps with conditional branching, (2) persistent checkpointing so users can resume mid-onboarding after closing the browser, (3) human-in-the-loop review for identity verification. Which framework is the BEST fit?',
    options: {
      A: 'LangChain AgentExecutor — it has the most tool integrations and is the most widely used.',
      B: 'LangGraph — it natively models agent behavior as a stateful directed graph with built-in checkpointing backends and interrupt() support for human-in-the-loop.',
      C: 'CrewAI — it excels at role-based multi-agent collaboration with autonomous task delegation.',
      D: 'Semantic Kernel — it provides the best enterprise integration with Microsoft Azure services.'
    },
    answer: 'B',
    explanation: 'LangGraph is purpose-built for the requirements listed: (1) Directed graph with conditional edges handles branching. (2) SqliteSaver/PostgresSaver checkpointers enable browser-close resume via thread_id. (3) interrupt() built-in pauses execution at a node for human approval. AgentExecutor (A) lacks native graph modeling and checkpointing. CrewAI (C) is for role-based multi-agent, not single-agent with checkpointing. Semantic Kernel (D) doesn\'t have native graph checkpointing.',
    keywords: ['LangGraph', 'checkpointing', 'human-in-the-loop', 'interrupt', 'framework'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 2803,
    domain: 2,
    domainName: 'Agent Development',
    topic: 'Scenario: Structured Output',
    question: 'Your agent calls an external weather API and must pass the result to a downstream analytics pipeline that expects a specific JSON schema: {"temperature": float, "unit": "celsius"|"fahrenheit", "confidence": float}. The LLM currently returns free-text weather summaries. What is the BEST fix?',
    options: {
      A: 'Parse the LLM\'s free-text output with a regex that extracts numbers and units.',
      B: 'Use the LLM\'s structured output mode (e.g., response_format={"type": "json_schema", "json_schema": {...}}) or tool calling with a typed output schema to guarantee schema-conformant JSON every call.',
      C: 'Add a post-processing agent that reads the free-text summary and reformats it as JSON.',
      D: 'Fine-tune the LLM on examples of correct JSON output for weather summaries.'
    },
    answer: 'B',
    explanation: 'Structured output mode (or function calling with a typed return schema) guarantees schema-conformant output at the model level — the LLM is constrained to produce valid JSON matching the defined schema. Regex (A) breaks on edge cases and can\'t handle confidence scores reliably. A post-processing agent (C) adds latency and another LLM call. Fine-tuning (D) is expensive and still not guaranteed to produce exact schema conformance at every call.',
    keywords: ['structured output', 'JSON schema', 'function calling', 'typed output', 'schema'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 2804,
    domain: 2,
    domainName: 'Agent Development',
    topic: 'Scenario: Tool Definition Best Practices',
    question: 'During testing, your agent correctly identifies that it needs to call the create_ticket tool but passes the wrong parameter types: it passes a string for a field defined as integer, and omits a required field. Select TWO changes to the tool definition that would prevent these errors.',
    options: {
      A: 'Add "required" array to the JSON Schema specifying which parameters are mandatory, so the LLM sees which fields must be included.',
      B: 'Increase the max_tokens parameter for the LLM call so it has more room to generate complete tool calls.',
      C: 'Add type annotations and enum constraints to each parameter in the JSON Schema (e.g., "type": "integer", "minimum": 1), with a clear "description" for each field explaining expected format.',
      D: 'Add retry logic that re-calls the LLM with the error message if tool validation fails.',
      E: 'Switch from function calling to ReAct-style tool invocation where the agent writes tool calls as plain text.'
    },
    answer: 'AC',
    explanation: '(A) The "required" array in JSON Schema directly tells the LLM which fields must be present — missing required fields are a primary cause of omission errors. (C) Type annotations with constraints (integer, minimum, enum) give the LLM the information it needs to construct valid parameter values. Together these address both failure modes. Option B (more tokens) doesn\'t help with type errors. Option D (retry with error) is a fallback, not a prevention. Option E (plain text ReAct) removes schema enforcement entirely.',
    keywords: ['JSON Schema', 'required fields', 'type constraints', 'tool definition', 'function calling'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 2805,
    domain: 2,
    domainName: 'Agent Development',
    topic: 'Scenario: Memory Pattern Selection',
    question: 'Your sales agent needs to remember: (1) customer preferences from past conversations (persists across sessions), (2) items discussed in the current conversation (lost when session ends), and (3) how to perform a product lookup (never changes). Which memory pattern correctly maps each type?',
    options: {
      A: 'Use a single in-memory dict for all three — it is the simplest implementation.',
      B: 'Use a vector database (e.g., Milvus) for all three, storing embeddings for every piece of information.',
      C: 'Map them to: (1) Episodic memory in a persistent vector store — past conversation summaries retrieved by customer ID; (2) Working memory in the current context window; (3) Procedural memory encoded in the agent\'s system prompt or tool definition.',
      D: 'Map them to: (1) Redis cache with 24-hour TTL; (2) PostgreSQL session table; (3) A separate retrieval agent.'
    },
    answer: 'C',
    explanation: 'The three memory types map precisely: (1) Episodic = personal history, persistent, retrieved by similarity — vector store is correct. (2) Working = current session context — context window is the right store, ephemeral by design. (3) Procedural = "how to do things" — encoded in system prompt or tool schema, never needs to be retrieved at runtime. Option A loses cross-session memory. Option B vectorizes static procedural knowledge wastefully. Option D uses appropriate persistence for (1) but maps the other two incorrectly.',
    keywords: ['episodic memory', 'working memory', 'procedural memory', 'vector store', 'memory patterns'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 2806,
    domain: 2,
    domainName: 'Agent Development',
    topic: 'Scenario: CrewAI Role Design',
    question: 'You are designing a CrewAI crew for market research: a Researcher role, an Analyst role, and a Writer role. The Researcher frequently passes raw, unfiltered web content to the Analyst, causing the Analyst to spend most of its context on irrelevant data. What is the BEST fix within CrewAI\'s paradigm?',
    options: {
      A: 'Switch the crew to LangGraph so you can control inter-agent message content with typed state.',
      B: 'Add a task description to the Researcher\'s Task object that specifies the exact output format: "Return only: company name, founding year, revenue, key products — no other text." This constrains what gets passed to the Analyst.',
      C: 'Increase the Analyst\'s context window by using a model with 200K tokens.',
      D: 'Add a new role — Data Cleaner — between Researcher and Analyst whose sole task is to filter and structure the Researcher\'s output before the Analyst sees it.'
    },
    answer: 'BD',
    explanation: '(B) Task output format specification in CrewAI directly controls what is passed downstream — the most lightweight fix. (D) A filtering intermediary agent is appropriate when the transformation is complex enough to warrant it: a Data Cleaner role can strip boilerplate, extract structured data, and handle edge cases. These can be used together (B prevents bad output, D handles cases that slip through). Option A abandons the chosen framework. Option C treats the symptom, not the cause.',
    keywords: ['CrewAI', 'task output', 'inter-agent', 'role design', 'context management'],
    difficulty: 'medium',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 2807,
    domain: 2,
    domainName: 'Agent Development',
    topic: 'Scenario: Prompt Template Engineering',
    question: 'Your agent\'s system prompt is 3,000 tokens and changes every request (customer name, product line, account tier injected). At 1,000 requests/day, your prompt token costs are high. Select TWO strategies that reduce costs without degrading agent quality.',
    options: {
      A: 'Use prompt caching: structure the system prompt so the static portion comes first (cacheable prefix), and inject dynamic variables only at the end of the user message.',
      B: 'Remove the system prompt entirely and embed all instructions in the first user message.',
      C: 'Compress the static instructions using an LLM summarizer nightly and replace the system prompt with the compressed version.',
      D: 'Use a smaller model for requests from low-tier accounts and the full model for high-tier accounts.',
      E: 'Cache the embedding of the system prompt and reuse it across requests to avoid re-tokenizing.'
    },
    answer: 'AD',
    explanation: '(A) Prompt caching (supported by Anthropic Claude, OpenAI) caches the static prefix of the system prompt across requests — you pay full price for the first call, then ~10% for cache hits on subsequent calls. Putting dynamic content at the end maximizes cache hit rate. (D) Model tiering by account tier is a legitimate cost optimization that preserves quality for high-value customers. Option B degrades instruction following (system prompts are more authoritative). Option C introduces compression artifacts. Option E describes token embedding reuse — LLM APIs don\'t work this way.',
    keywords: ['prompt caching', 'cost optimization', 'model tiering', 'token cost', 'system prompt'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 2808,
    domain: 2,
    domainName: 'Agent Development',
    topic: 'Scenario: Semantic Kernel Plugin Design',
    question: 'You are building a Semantic Kernel agent for an enterprise HR system. The agent needs to read employee records (read-only) and submit time-off requests (write operation with approval workflow). Which Semantic Kernel design correctly separates these concerns?',
    options: {
      A: 'Create one SKPlugin with all functions in a single class, using a flag parameter to distinguish read vs write operations.',
      B: 'Create two separate SKPlugins: an EmployeeRecordPlugin (read-only functions, no side effects) and a TimeOffPlugin (write functions requiring approval confirmation before execution), each with kernel functions decorated with clear descriptions.',
      C: 'Use a single KernelFunction with a routing prompt that decides whether to read or write based on the user\'s message.',
      D: 'Implement all operations as HTTP REST calls directly in the agent\'s system prompt using a code interpreter tool.'
    },
    answer: 'B',
    explanation: 'Semantic Kernel plugins should follow single-responsibility: (B) separate read-only and write plugins enforce least-privilege by design — the agent can be configured to allow only the read plugin in certain contexts. Each @kernel_function gets a clear name and description that Semantic Kernel uses for automatic function selection. Option A violates separation of concerns. Option C (routing prompt) lacks schema-based function selection. Option D bypasses SK\'s function calling infrastructure.',
    keywords: ['Semantic Kernel', 'plugin', 'kernel_function', 'least-privilege', 'separation'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 2809,
    domain: 2,
    domainName: 'Agent Development',
    topic: 'LlamaIndex vs LangChain RAG Agent',
    question: 'Select TWO accurate statements that distinguish LlamaIndex\'s agent RAG approach from LangChain\'s RAG chain approach for building document question-answering agents.',
    options: {
      A: 'LlamaIndex\'s QueryEngineTool wraps any index as a tool callable by a ReAct or OpenAI Tools agent, allowing the agent to decide when to retrieve vs when to answer from context — unlike a static LangChain RAG chain that always retrieves.',
      B: 'LangChain does not support vector store integration, while LlamaIndex has native support for over 20 vector store backends.',
      C: 'LlamaIndex provides a richer set of index types out of the box (VectorStoreIndex, KnowledgeGraphIndex, SummaryIndex, TreeIndex), each optimized for different query patterns over the same document set.',
      D: 'LlamaIndex agents cannot use external tools beyond document retrieval, while LangChain agents support arbitrary tool use.',
      E: 'LangChain RAG chains guarantee higher answer accuracy because they always retrieve before answering.'
    },
    answer: 'AC',
    explanation: '(A) Correctly describes LlamaIndex\'s agent approach: QueryEngineTool makes retrieval an agent-controlled decision, avoiding unnecessary retrieval for questions the agent can answer from context. (C) LlamaIndex\'s variety of index types (Tree, Summary, KG, Vector) is a documented differentiator — each targets different query patterns. Option B is false — LangChain has extensive vector store support. Option D is false — LlamaIndex agents support arbitrary tool use via FunctionTool. Option E is false — always retrieving can hurt accuracy with irrelevant context.',
    keywords: ['LlamaIndex', 'LangChain', 'QueryEngineTool', 'index types', 'RAG agent'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 2810,
    domain: 2,
    domainName: 'Agent Development',
    topic: 'Function Calling vs ReAct',
    question: 'Select TWO accurate statements about when to prefer function calling (tool use API) over ReAct (reasoning + acting via text) for agent tool invocation.',
    options: {
      A: 'Function calling is preferred when tools have strict parameter schemas, because the LLM is constrained to produce valid JSON rather than free-text tool invocations that may have parsing errors.',
      B: 'ReAct is preferred for all production systems because its reasoning traces are more interpretable.',
      C: 'Function calling produces lower latency than ReAct for equivalent tool calls because it eliminates the intermediate reasoning text generation step.',
      D: 'Function calling should be avoided when more than 5 tools are available, as the schema list overflows the context window.',
      E: 'Function calling enables parallel tool execution (calling multiple tools in one LLM response) in models that support it, which ReAct cannot do natively.'
    },
    answer: 'AE',
    explanation: '(A) Function calling enforces schema compliance at the model level — no regex parsing needed, no hallucinated parameter names. (E) Models supporting parallel function calling (e.g., GPT-4, Claude 3.5) can return multiple tool calls in a single response for parallel execution — ReAct\'s sequential reason-then-act loop cannot do this natively. Option B is false — function calling is often more interpretable via structured traces. Option C is not generally true — the difference is minimal and context-dependent. Option D is false — modern models handle dozens of tool schemas.',
    keywords: ['function calling', 'ReAct', 'parallel tool calls', 'JSON schema', 'tool invocation'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 2811,
    domain: 2,
    domainName: 'Agent Development',
    topic: 'Scenario: Agent Testing Strategy',
    question: 'Your agent passes all unit tests (individual tool mocks return expected values) but fails in production: it calls the correct tools in the wrong order for complex multi-step tasks. What type of testing was missing and what should you add?',
    options: {
      A: 'Add more unit tests that cover edge cases in individual tool responses.',
      B: 'Add trajectory evaluation tests: record the expected sequence of tool calls for representative multi-step scenarios, then assert that the agent\'s actual tool call sequence matches (or produces equivalent outcomes).',
      C: 'Add integration tests that call real external APIs instead of mocks.',
      D: 'Add a stress test that runs the agent 1000 times to detect non-determinism.'
    },
    answer: 'B',
    explanation: 'Unit tests (individual tool mocks) verify tool behavior but not the agent\'s reasoning about tool ordering — that requires trajectory evaluation. Trajectory tests capture: for task X, the expected sequence is [tool_A(params1), tool_B(params2), tool_C(params3)] and verify the agent produces this sequence. This is the standard approach for testing agentic behavior. Option A (more unit tests) doesn\'t test ordering. Option C (real APIs) is valuable but expensive and slow. Option D (stress testing) tests reliability, not correctness of ordering.',
    keywords: ['trajectory evaluation', 'testing', 'tool ordering', 'agent testing', 'integration'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 2812,
    domain: 2,
    domainName: 'Agent Development',
    topic: 'Scenario: Streaming Agent Responses',
    question: 'Users report that your research agent "feels slow" — it waits 30 seconds before displaying any output, even though the first paragraph is ready in 5 seconds. What is the BEST implementation change?',
    options: {
      A: 'Use streaming output: enable stream=True on the LLM call and yield tokens to the frontend as they are generated, so users see output after ~1-2 seconds of first token.',
      B: 'Switch to a faster LLM model that generates complete responses in under 10 seconds.',
      C: 'Cache common research queries and serve cached responses instantly.',
      D: 'Add a progress bar that shows "Researching..." to set user expectations during the wait.'
    },
    answer: 'A',
    explanation: 'Streaming (A) solves the perceived latency problem: the time-to-first-token is typically 1-2 seconds; users see text appearing immediately and are engaged. The total time doesn\'t change but perceived responsiveness improves dramatically. This is standard practice for LLM-based interfaces. Option B reduces total time but still has a blank-screen wait. Option C only helps for repeated identical queries. Option D is cosmetic — users still wait without seeing content.',
    keywords: ['streaming', 'time-to-first-token', 'latency', 'UX', 'stream=True'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 2813,
    domain: 2,
    domainName: 'Agent Development',
    topic: 'Multi-Framework Interoperability',
    question: 'Select TWO accurate statements about NVIDIA AgentIQ\'s design that enable it to work alongside agents built on multiple frameworks without requiring rewrites.',
    options: {
      A: 'AgentIQ defines a common workflow interface that adapts to LangChain RunnableSequence, LlamaIndex QueryPipeline, CrewAI Crew, and custom Python functions through typed wrappers, treating each as an AgentIQ workflow.',
      B: 'AgentIQ replaces each framework\'s native executor with its own runtime engine at import time via Python monkey-patching.',
      C: 'AgentIQ instruments frameworks by hooking into their callback/event systems (e.g., LangChain callbacks, LlamaIndex event handlers), so telemetry is collected without modifying agent code.',
      D: 'AgentIQ requires all agents to be converted to NVIDIA\'s proprietary agent schema format before instrumentation.',
      E: 'AgentIQ only supports NVIDIA NIM-hosted models and cannot instrument agents using OpenAI or Anthropic APIs.'
    },
    answer: 'AC',
    explanation: '(A) AgentIQ\'s typed workflow interface is its core abstraction: it wraps any callable (LangChain chain, LlamaIndex pipeline, CrewAI crew, pure Python) as an AgentIQ workflow for unified observability. (C) AgentIQ uses each framework\'s native callback/event system for non-invasive instrumentation — no agent code changes. Option B (monkey-patching) is not how AgentIQ works. Option D is false — no proprietary conversion needed. Option E is false — AgentIQ is model-agnostic.',
    keywords: ['AgentIQ', 'multi-framework', 'callbacks', 'workflow interface', 'instrumentation'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 2814,
    domain: 2,
    domainName: 'Agent Development',
    topic: 'Scenario: Tool Error Recovery',
    question: 'Your agent calls an external CRM API that intermittently returns 503 errors (service temporarily unavailable). Currently, the agent propagates the error to the user: "I couldn\'t retrieve customer data." What is the BEST production-grade error recovery strategy?',
    options: {
      A: 'Wrap the CRM tool call with exponential backoff retry (3 attempts: 1s, 2s, 4s delays), and if all retries fail, return a structured error object that the agent\'s error-handling node can use to either try a fallback data source or generate a partial response with a caveat.',
      B: 'Increase the timeout on the CRM API call from 5 seconds to 30 seconds.',
      C: 'Add a try/except block that silently ignores the error and returns an empty response so the agent continues.',
      D: 'Cache all CRM responses for 1 hour so transient failures don\'t affect the agent.'
    },
    answer: 'A',
    explanation: 'Exponential backoff retry handles transient 503s (the vast majority of cases) without user impact. The structured error object enables the agent\'s error-handling logic to make intelligent decisions: try a secondary data source, continue with partial data, or generate a qualified response. Option B (longer timeout) just makes the user wait longer. Option C (silent ignore) returns incorrect results — the agent proceeds as if it has no customer data. Option D (caching) helps with repeated queries but doesn\'t address the first request or stale data issues.',
    keywords: ['retry', 'exponential backoff', 'error handling', 'fallback', 'CRM'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 2815,
    domain: 2,
    domainName: 'Agent Development',
    topic: 'Agent Memory with mem0',
    question: 'Select TWO accurate statements about using mem0 as an agent memory layer in production agentic applications.',
    options: {
      A: 'mem0 automatically extracts and stores key facts from conversation turns (e.g., user preferences, past decisions) into a vector-backed memory store, making them retrievable in future sessions without manual state management.',
      B: 'mem0 requires the agent to explicitly call a save_memory() function after every turn to persist information — it does not auto-extract facts.',
      C: 'mem0 supports multi-level memory: user-level (personal preferences), agent-level (agent persona state), and session-level (current conversation), allowing fine-grained scoping of what is remembered.',
      D: 'mem0 stores all memories in plaintext in a local SQLite file and does not support cloud-based vector databases.',
      E: 'mem0 is a proprietary NVIDIA tool available only within the NeMo framework.'
    },
    answer: 'AC',
    explanation: '(A) mem0\'s key feature is automatic fact extraction: it uses an LLM to identify and extract important information from conversation turns and stores them in a vector database without the developer manually deciding what to save. (C) mem0 supports hierarchical memory scopes (user, agent, session) allowing precise retrieval context. Option B is false — auto-extraction is mem0\'s core value. Option D is false — mem0 supports multiple vector stores including Qdrant, Pinecone, and cloud databases. Option E is false — mem0 is an open-source library (pypi: mem0ai), not NVIDIA-proprietary.',
    keywords: ['mem0', 'memory extraction', 'multi-level memory', 'vector store', 'session memory'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
];
