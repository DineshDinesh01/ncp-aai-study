import { Question } from '../types';

export const domain2bQuestions: Question[] = [
  { id: 2051, domain: 2, domainName: 'Agent Development', topic: 'LangGraph State', difficulty: 'medium', keywords: ['state', 'TypedDict', 'update', 'reducer'],
    question: 'In LangGraph, to accumulate messages instead of overwriting them, the state field should use:',
    options: { A: 'A plain list field with no annotation', B: 'Annotated[list[BaseMessage], add_messages] as the reducer', C: 'A dictionary mapping timestamps to messages', D: 'A global variable outside the state class' },
    answer: 'B', explanation: 'add_messages is LangGraph\'s built-in reducer that appends new messages to existing ones rather than overwriting — essential for maintaining conversation history.' },

  { id: 2052, domain: 2, domainName: 'Agent Development', topic: 'Pydantic v2', difficulty: 'medium', keywords: ['Pydantic v2', 'model_validator', 'field_validator', 'schema'],
    question: 'Pydantic v2\'s model_validator(mode="before") runs:',
    options: { A: 'After all field validations complete', B: 'Before individual field validators, enabling cross-field validation on raw input data', C: 'Only during model training', D: 'Before the model is instantiated in memory' },
    answer: 'B', explanation: 'mode="before" validators receive the raw unvalidated data dict, useful for transforming or cross-validating fields before Pydantic processes individual field types.' },

  { id: 2053, domain: 2, domainName: 'Agent Development', topic: 'OpenAI Assistants', difficulty: 'medium', keywords: ['OpenAI Assistants', 'thread', 'run', 'file search'],
    question: 'OpenAI Assistants API manages conversation history via:',
    options: { A: 'The developer manually passing conversation history in each API call', B: 'Threads — persistent conversation containers that automatically maintain message history', C: 'A shared global conversation history for all users', D: 'JSON files the developer manages on disk' },
    answer: 'B', explanation: 'Threads persist all messages (user, assistant, tool calls) server-side. Developers just add messages to a thread and start runs — no manual history management needed.' },

  { id: 2054, domain: 2, domainName: 'Agent Development', topic: 'LangChain Hub', difficulty: 'easy', keywords: ['LangChain Hub', 'prompt', 'community', 'pull'],
    question: 'LangChain Hub is used to:',
    options: { A: 'Host deployed agent services', B: 'Share and discover community-contributed prompt templates that can be pulled and used in agents', C: 'Hub all LangChain services behind a single endpoint', D: 'Store agent conversation logs' },
    answer: 'B', explanation: 'Hub.pull("user/prompt-name") fetches community-tested prompt templates, enabling reuse of battle-tested prompts for common agent tasks (RAG Q&A, summarization, extraction).' },

  { id: 2055, domain: 2, domainName: 'Agent Development', topic: 'Agentic RAG', difficulty: 'medium', keywords: ['agentic RAG', 'query rewriting', 'self-RAG', 'corrective RAG'],
    question: 'Corrective RAG (CRAG) improves standard RAG by:',
    options: { A: 'Correcting grammatical errors in retrieved documents', B: 'Evaluating retrieved document relevance and falling back to web search when retrieval quality is insufficient', C: 'Correcting the query after generation if the answer seems wrong', D: 'Automatically updating the vector database with correct information' },
    answer: 'B', explanation: 'CRAG evaluates retrieved document relevance — if poor, it reformulates the query or falls back to web search, addressing the fundamental RAG problem of irrelevant retrieval.' },

  { id: 2056, domain: 2, domainName: 'Agent Development', topic: 'LangSmith Testing', difficulty: 'medium', keywords: ['LangSmith', 'dataset', 'evaluator', 'CI'],
    question: 'LangSmith datasets are used to:',
    options: { A: 'Store model training data', B: 'Define example inputs/outputs for evaluation — running the agent against examples and scoring outputs', C: 'Cache agent responses for faster retrieval', D: 'Store agent deployment configurations' },
    answer: 'B', explanation: 'LangSmith datasets define (input, reference_output) pairs. Running evaluators against datasets measures agent quality, enabling regression detection when code or prompts change.' },

  { id: 2057, domain: 2, domainName: 'Agent Development', topic: 'Vector Store Integration', difficulty: 'medium', keywords: ['Chroma', 'Pinecone', 'add_documents', 'similarity_search'],
    question: 'When integrating a vector store with LangChain, the as_retriever() method creates:',
    options: { A: 'A database connection pool for the vector store', B: 'A LangChain Retriever interface wrapping the vector store for use in chains and agents', C: 'An HTTP server for serving the vector index', D: 'A scheduler for regular index updates' },
    answer: 'B', explanation: 'as_retriever() wraps any vector store in the standard LangChain Retriever interface, making it composable with LCEL chains, RAG pipelines, and agent retrieval tools.' },

  { id: 2058, domain: 2, domainName: 'Agent Development', topic: 'Custom Tools', difficulty: 'easy', keywords: ['custom tool', 'BaseTool', 'args_schema', 'name'],
    question: 'A BaseTool subclass in LangChain requires defining:',
    options: { A: 'Only the tool\'s name field', B: 'name, description, args_schema (Pydantic), and _run() method at minimum', C: 'The tool\'s deployment URL', D: 'A neural network architecture for the tool' },
    answer: 'B', explanation: 'BaseTool requires: name (identifier), description (guides LLM selection), args_schema (Pydantic validates inputs), and _run() (implementation). Optional: _arun() for async support.' },

  { id: 2059, domain: 2, domainName: 'Agent Development', topic: 'Graph Persistence', difficulty: 'medium', keywords: ['SqliteSaver', 'PostgresSaver', 'checkpointer', 'memory'],
    question: 'LangGraph\'s InMemorySaver vs SqliteSaver differ in:',
    options: { A: 'InMemory is faster; SqliteSaver provides cross-process persistence that survives restarts', B: 'SqliteSaver is faster but InMemory has more storage capacity', C: 'They are functionally identical with different syntax', D: 'InMemory supports more concurrent users' },
    answer: 'A', explanation: 'InMemorySaver is process-local (lost on restart, good for development). SqliteSaver persists to disk, enabling state recovery after crashes and multi-session continuity.' },

  { id: 2060, domain: 2, domainName: 'Agent Development', topic: 'Anthropic Tool Use', difficulty: 'medium', keywords: ['Anthropic', 'tool_use', 'content block', 'claude'],
    question: 'In Anthropic\'s Claude API, tool_use content blocks in the assistant response contain:',
    options: { A: 'The tool\'s Python source code', B: 'The tool id, name, and input parameters — parsed by the developer to execute the tool', C: 'The tool\'s execution result', D: 'The user\'s original tool request' },
    answer: 'B', explanation: 'Claude returns tool_use content blocks with id, name, and input dict when it wants to call a tool. The developer executes the tool and returns a tool_result content block with the id and output.' },

  { id: 2061, domain: 2, domainName: 'Agent Development', topic: 'Retry with LLM Feedback', difficulty: 'hard', keywords: ['retry', 'feedback', 'LLM correction', 'self-healing'],
    question: 'In an agent pipeline that validates tool outputs, a "retry with feedback" pattern means:',
    options: { A: 'Retrying failed HTTP requests with backoff', B: 'When output validation fails, passing the validation error back to the LLM so it can generate a corrected response', C: 'Asking users to retry when the agent fails', D: 'Retrying with a different model on validation failure' },
    answer: 'B', explanation: 'Self-healing agents pass validation errors (e.g., "your JSON was missing required field X") as feedback to the LLM, which can then regenerate a corrected output — dramatically reducing pipeline failures.' },

  { id: 2062, domain: 2, domainName: 'Agent Development', topic: 'Message Types', difficulty: 'easy', keywords: ['HumanMessage', 'AIMessage', 'SystemMessage', 'ToolMessage'],
    question: 'In LangChain\'s message schema, ToolMessage contains:',
    options: { A: 'The tool\'s definition and schema', B: 'The result of a tool execution, linked to the AI\'s tool_call via tool_call_id', C: 'A message sent from one tool to another', D: 'The human\'s original request to use a tool' },
    answer: 'B', explanation: 'ToolMessage carries tool execution results. The tool_call_id links it to the specific AIMessage tool_call that requested it, enabling the LLM to correlate results with requests.' },

  { id: 2063, domain: 2, domainName: 'Agent Development', topic: 'Agent Evaluation Metrics', difficulty: 'medium', keywords: ['trajectory', 'step accuracy', 'efficiency', 'evaluation'],
    question: 'Trajectory-based agent evaluation assesses:',
    options: { A: 'The geographic trajectory of deployed agent servers', B: 'Whether the agent took the correct sequence of steps (tool calls, reasoning) to reach the answer, not just the final answer', C: 'The speed trajectory of model inference over time', D: 'User interaction trajectories on the frontend' },
    answer: 'B', explanation: 'Final answer accuracy misses process quality. Trajectory evaluation checks: were the right tools used in the right order? Did the agent reason correctly? Is the path efficient?' },

  { id: 2064, domain: 2, domainName: 'Agent Development', topic: 'Prompt Injection Defense', difficulty: 'hard', keywords: ['prompt injection defense', 'input filtering', 'segregation'],
    question: 'The most effective defense against prompt injection in RAG systems is:',
    options: { A: 'Using a larger LLM that is more resistant to injection', B: 'Separating retrieval instructions from retrieved content, and using structured prompts that prevent content from overriding instructions', C: 'Encrypting all retrieved documents', D: 'Only retrieving documents from trusted internal sources' },
    answer: 'B', explanation: 'Defense: use XML/delimiters to clearly demarcate trusted instructions from untrusted retrieved content, instruct the model explicitly to treat retrieved content as data not instructions.' },

  { id: 2065, domain: 2, domainName: 'Agent Development', topic: 'Langchain LCEL Composition', difficulty: 'medium', keywords: ['LCEL', 'RunnableParallel', 'RunnableLambda', 'compose'],
    question: 'RunnableParallel in LCEL enables:',
    options: { A: 'Running chains on parallel CPU threads', B: 'Executing multiple runnables simultaneously with the same input, collecting all outputs as a dict', C: 'Parallel GPU computation for faster inference', D: 'Running the same chain multiple times for consistency' },
    answer: 'B', explanation: 'RunnableParallel({ "summary": summarize_chain, "keywords": extract_chain }) runs both chains on the same input concurrently, returning {"summary": ..., "keywords": ...} — ideal for multi-perspective analysis.' },

  { id: 2066, domain: 2, domainName: 'Agent Development', topic: 'Agent Network Communication', difficulty: 'medium', keywords: ['HTTP', 'gRPC', 'WebSocket', 'agent communication'],
    question: 'gRPC is preferred over REST for high-performance agent-to-agent communication because:',
    options: { A: 'gRPC supports more HTTP verbs than REST', B: 'gRPC uses Protocol Buffers (binary serialization) and HTTP/2 multiplexing for lower latency and higher throughput', C: 'gRPC requires less setup than REST', D: 'REST does not support streaming' },
    answer: 'B', explanation: 'gRPC\'s binary Protocol Buffer serialization is faster and smaller than JSON, HTTP/2 multiplexing reduces connection overhead, and bidirectional streaming enables efficient agent communication patterns.' },

  { id: 2067, domain: 2, domainName: 'Agent Development', topic: 'Conditional Tool Calling', difficulty: 'medium', keywords: ['conditional', 'tool selection', 'reasoning', 'intent'],
    question: 'An agent that calls different tools based on query type (math → calculator, web question → search) is demonstrating:',
    options: { A: 'Random tool selection', B: 'Intent-based tool routing — using the query\'s intent to select the most appropriate tool', C: 'Tool overuse that should be simplified', D: 'A configuration error in the tool registry' },
    answer: 'B', explanation: 'Intelligent tool routing shows the agent understands query intent — math queries need computation tools, current events need search, code questions need execution. This is core ReAct behavior.' },

  { id: 2068, domain: 2, domainName: 'Agent Development', topic: 'Testing Multi-Agent', difficulty: 'hard', keywords: ['integration test', 'mock agent', 'multi-agent testing'],
    question: 'When testing a supervisor-worker multi-agent system, the recommended approach is:',
    options: { A: 'Only test the supervisor in isolation, workers are self-documenting', B: 'Unit test each agent independently with mocked neighbors, then integration test with real agents on representative scenarios', C: 'Only run end-to-end tests since unit tests are unreliable for agents', D: 'Test the entire system manually on production data' },
    answer: 'B', explanation: 'Layered testing: unit test each agent with mocked responses from neighboring agents (deterministic), then integration test with real agents to verify coordination, finally E2E for full workflow validation.' },

  { id: 2069, domain: 2, domainName: 'Agent Development', topic: 'Function Calling Response', difficulty: 'medium', keywords: ['tool_calls', 'finish_reason', 'tool_use', 'response'],
    question: 'When an LLM response has finish_reason="tool_calls" (OpenAI), it indicates:',
    options: { A: 'The model finished generating and has no more tool calls', B: 'The model wants to invoke one or more tools and has returned tool_calls in the response', C: 'The model was stopped by a content filter', D: 'Token limit was reached before completion' },
    answer: 'B', explanation: 'finish_reason="tool_calls" signals the developer to extract tool_calls from the response, execute each tool, and return results as tool messages for the next model call.' },

  { id: 2070, domain: 2, domainName: 'Agent Development', topic: 'Parallel Tool Execution', difficulty: 'medium', keywords: ['parallel tools', 'simultaneous', 'batch tool calls'],
    question: 'Modern LLMs can return multiple tool_calls in a single response to enable:',
    options: { A: 'Sequential execution of each tool one at a time', B: 'Parallel execution of independent tools simultaneously, reducing total latency', C: 'Backup tool calls if the primary tool fails', D: 'Logging all intended tools for auditing' },
    answer: 'B', explanation: 'Parallel tool calling lets the LLM request multiple independent tools (search AND calculator AND weather) in one response. Executing them in parallel cuts latency vs sequential execution.' },

  { id: 2071, domain: 2, domainName: 'Agent Development', topic: 'Context Window Optimization', difficulty: 'medium', keywords: ['context optimization', 'token reduction', 'summarize', 'compress'],
    question: 'LLMLingua and similar prompt compression tools reduce agent costs by:',
    options: { A: 'Replacing long prompts with shorter model names', B: 'Removing redundant tokens from prompts while preserving semantic meaning, using small LMs as compressors', C: 'Limiting agent responses to 100 tokens', D: 'Using smaller models that require fewer tokens' },
    answer: 'B', explanation: 'LLMLingua uses a small LM to identify and remove low-perplexity (predictable/redundant) tokens from prompts, achieving 3-20x compression with minimal accuracy loss.' },

  { id: 2072, domain: 2, domainName: 'Agent Development', topic: 'Streaming with Tools', difficulty: 'hard', keywords: ['streaming', 'tool calling', 'astream', 'events'],
    question: 'In LangChain, astream_events() is preferred over astream() for complex agent pipelines because:',
    options: { A: 'astream_events is faster at generating tokens', B: 'astream_events surfaces all intermediate events (LLM tokens, tool calls, tool results) enabling granular UI updates', C: 'astream only works for synchronous code', D: 'astream_events uses less memory' },
    answer: 'B', explanation: 'astream_events emits typed events for every intermediate step (on_llm_start, on_tool_start, on_tool_end), allowing UIs to show tool execution progress, not just final text streaming.' },

  { id: 2073, domain: 2, domainName: 'Agent Development', topic: 'Model Context Protocol', difficulty: 'hard', keywords: ['MCP', 'server', 'client', 'tools', 'resources'],
    question: 'In the Model Context Protocol (MCP), the distinction between "tools" and "resources" is:',
    options: { A: 'Tools are more expensive than resources', B: 'Tools are callable functions with side effects; resources are readable data/context (files, database entries)', C: 'Resources are tools with no return value', D: 'There is no meaningful distinction' },
    answer: 'B', explanation: 'MCP tools perform actions and can have side effects (search, API calls, code execution). Resources are read-only context (configuration, files, database records) the model can read without side effects.' },

  { id: 2074, domain: 2, domainName: 'Agent Development', topic: 'Agent Architecture Patterns', difficulty: 'medium', keywords: ['tool node', 'ToolNode', 'LangGraph tools'],
    question: 'LangGraph\'s ToolNode automatically:',
    options: { A: 'Generates tool schemas from Python type hints', B: 'Executes all tool_calls in the last AI message, collecting results as ToolMessages', C: 'Monitors tool execution performance', D: 'Routes tool calls to different services based on load' },
    answer: 'B', explanation: 'ToolNode is a pre-built LangGraph node that extracts tool_calls from the last AIMessage, executes each tool from the bound tools list, and returns ToolMessages with results.' },

  { id: 2075, domain: 2, domainName: 'Agent Development', topic: 'Agent Development Best Practices', difficulty: 'easy', keywords: ['best practices', 'development', 'iteration', 'testing'],
    question: 'When building an agent from scratch, the recommended development approach is:',
    options: { A: 'Build the complete production architecture first, then test', B: 'Start with the simplest possible implementation that works, measure, then iteratively add complexity', C: 'Copy existing agent code from open source projects without understanding it', D: 'Build all features simultaneously to save time' },
    answer: 'B', explanation: 'Iterative development: simple working implementation → measure quality → identify bottlenecks → add complexity where needed. Avoids over-engineering systems that may not need the complexity.' },

  { id: 2076, domain: 2, domainName: 'Agent Development', topic: 'LlamaIndex Query Pipelines', difficulty: 'medium', keywords: ['QueryPipeline', 'LlamaIndex', 'pipeline', 'DAG'],
    question: 'LlamaIndex QueryPipeline enables:',
    options: { A: 'Managing SQL query performance for LlamaIndex', B: 'Declarative composition of query processing steps as a DAG, enabling complex retrieval pipelines', C: 'Queuing queries for batch processing', D: 'Pipeline for model training in LlamaIndex' },
    answer: 'B', explanation: 'QueryPipeline lets you compose retrievers, LLMs, rerankers, and post-processors as a declarative DAG — enabling complex multi-step retrieval workflows with clean, testable code.' },

  { id: 2077, domain: 2, domainName: 'Agent Development', topic: 'Agent Profiling', difficulty: 'medium', keywords: ['profiling', 'latency', 'bottleneck', 'optimization'],
    question: 'To identify the main latency bottleneck in an agent pipeline, you should:',
    options: { A: 'Assume it\'s always the LLM call', B: 'Profile each component (LLM calls, tool executions, retrieval) to measure actual time spent in each stage', C: 'Reduce context window size and see if it gets faster', D: 'Switch to a different LLM provider' },
    answer: 'B', explanation: 'Profiling reveals actual bottlenecks — sometimes retrieval (slow vector DB), sometimes tool I/O (external API), sometimes LLM (model too large for the task). Never assume without measuring.' },

  { id: 2078, domain: 2, domainName: 'Agent Development', topic: 'Workspace Isolation', difficulty: 'hard', keywords: ['workspace', 'sandbox', 'isolation', 'code execution'],
    question: 'When building agents that execute user-provided code, which security measure is essential?',
    options: { A: 'Run code directly in the agent process for lowest latency', B: 'Execute code in isolated sandboxes (containers, VMs, or restricted environments like E2B) with resource limits', C: 'Only allow pre-approved code snippets from a library', D: 'Trust LLM-generated code since it\'s safer than user-provided code' },
    answer: 'B', explanation: 'Arbitrary code execution requires sandboxing (E2B, Docker, Pyodide) with CPU/memory/network limits. Running in the agent process allows malicious code to escape and harm the host system.' },

  { id: 2079, domain: 2, domainName: 'Agent Development', topic: 'Few-Shot vs Zero-Shot', difficulty: 'medium', keywords: ['few-shot', 'zero-shot', 'examples', 'prompting'],
    question: 'Few-shot examples in agent system prompts are most beneficial when:',
    options: { A: 'The task is so common the model knows it perfectly already', B: 'The output format or reasoning style is non-standard and requires demonstration', C: 'Training data is not available', D: 'Few-shot always outperforms zero-shot for every task' },
    answer: 'B', explanation: 'Few-shot examples shine for non-standard formats (custom JSON structures, specific reasoning chains) where zero-shot struggles because the model hasn\'t seen exactly this pattern in training.' },

  { id: 2080, domain: 2, domainName: 'Agent Development', topic: 'Agent Versioning', difficulty: 'medium', keywords: ['versioning', 'prompt versioning', 'model version', 'deployment'],
    question: 'Tracking prompt versions alongside code versions is important because:',
    options: { A: 'Longer prompts have higher version numbers', B: 'Prompt changes can dramatically alter agent behavior — versioning enables attribution, rollback, and A/B comparison', C: 'LLM providers require prompt version headers', D: 'Prompt versioning reduces API costs' },
    answer: 'B', explanation: 'Prompts are code — changing a system prompt can fundamentally alter agent behavior. Version control enables: "which prompt version caused the regression?" and safe rollback to known-good prompts.' },

  { id: 2081, domain: 2, domainName: 'Agent Development', topic: 'Gemini Integration', difficulty: 'medium', keywords: ['Gemini', 'Google', 'multimodal', 'integration'],
    question: 'Google\'s Gemini models differentiate from other LLMs for agent use with their:',
    options: { A: 'Smaller parameter count for faster inference', B: 'Native multimodal capability — processing text, images, audio, and video in a single model', C: 'Exclusive support for Python agents', D: 'Built-in blockchain verification of outputs' },
    answer: 'B', explanation: 'Gemini\'s natively multimodal architecture processes mixed media (text + images + audio) in a single model pass — enabling agents that reason over documents with embedded figures, screenshots, and audio.' },

  { id: 2082, domain: 2, domainName: 'Agent Development', topic: 'Tool Return Types', difficulty: 'medium', keywords: ['tool return', 'content', 'artifact', 'type'],
    question: 'An agent tool that returns a large binary file (image, PDF) should return it as:',
    options: { A: 'Base64-encoded string in the tool message content', B: 'A URL or reference to the file stored in external storage, not the file bytes directly in the message', C: 'A hex-encoded string for compatibility', D: 'The raw bytes directly in the tool response' },
    answer: 'B', explanation: 'Large binary objects don\'t belong in message content — they waste context tokens and hit API limits. Return a URL or storage reference that can be accessed when needed.' },

  { id: 2083, domain: 2, domainName: 'Agent Development', topic: 'Agent Middleware', difficulty: 'medium', keywords: ['middleware', 'interceptor', 'preprocessing', 'postprocessing'],
    question: 'Middleware in agent request pipelines enables:',
    options: { A: 'Running agents on mid-tier hardware', B: 'Cross-cutting concerns (logging, auth, rate limiting, telemetry) applied uniformly to all agent requests without modifying agent logic', C: 'Bridging between different programming languages in the agent stack', D: 'Middle-out compression of agent messages' },
    answer: 'B', explanation: 'Middleware (interceptors, hooks) applies cross-cutting concerns uniformly: every request gets logged, authenticated, rate-limited, and traced — without polluting agent business logic with these concerns.' },

  { id: 2084, domain: 2, domainName: 'Agent Development', topic: 'Dependency Injection', difficulty: 'medium', keywords: ['dependency injection', 'configurable', 'testable', 'swappable'],
    question: 'Dependency injection in agent development improves:',
    options: { A: 'Model inference speed by injecting compute dependencies', B: 'Testability and configurability — agents receive their LLM, tools, and memory as injected dependencies rather than hardcoding them', C: 'Token injection for authentication', D: 'Python import dependency resolution' },
    answer: 'B', explanation: 'DI decouples agent logic from specific implementations — the same agent code can use GPT-4 in production and a mock LLM in tests, or swap vector stores without changing agent logic.' },

  { id: 2085, domain: 2, domainName: 'Agent Development', topic: 'Agent Documentation', difficulty: 'easy', keywords: ['documentation', 'docstring', 'README', 'OpenAPI'],
    question: 'Auto-generating API documentation for deployed agents using OpenAPI/Swagger provides:',
    options: { A: 'Automatic code generation from documentation', B: 'Interactive documentation that developers can use to explore and test agent endpoints', C: 'Legal documentation for AI liability', D: 'Training data for the agent' },
    answer: 'B', explanation: 'OpenAPI documentation (FastAPI\'s /docs endpoint) provides interactive API exploration, request/response schemas, and example calls — dramatically reducing integration friction for developers.' },

  { id: 2086, domain: 2, domainName: 'Agent Development', topic: 'Agent Security Scanning', difficulty: 'medium', keywords: ['dependency scanning', 'CVE', 'security', 'supply chain'],
    question: 'AI agent projects should include dependency security scanning because:',
    options: { A: 'AI frameworks are never vulnerable', B: 'LLM agent frameworks have many dependencies with frequent CVEs — outdated dependencies can expose critical vulnerabilities', C: 'Security scanning improves model accuracy', D: 'Required by all LLM providers' },
    answer: 'B', explanation: 'Agent frameworks (LangChain, LlamaIndex, transformers) have complex dependency trees. Regular CVE scanning (Snyk, pip-audit) catches vulnerable transitive dependencies before they\'re exploited.' },

  { id: 2087, domain: 2, domainName: 'Agent Development', topic: 'Async Streaming', difficulty: 'hard', keywords: ['async generator', 'streaming', 'yield', 'backpressure'],
    question: 'Python async generators (async def + yield) are used in agent streaming to:',
    options: { A: 'Generate async function names automatically', B: 'Produce token streams lazily — yielding each token/chunk as it arrives rather than buffering all output', C: 'Generate random tokens for testing', D: 'Yield control between parallel agent instances' },
    answer: 'B', explanation: 'Async generators yield chunks as they arrive (from streaming LLM APIs or tool outputs), enabling true streaming to clients with minimal buffering and built-in backpressure.' },

  { id: 2088, domain: 2, domainName: 'Agent Development', topic: 'Tool Discovery', difficulty: 'medium', keywords: ['tool discovery', 'dynamic', 'runtime', 'catalog'],
    question: 'Dynamic tool discovery at runtime (vs static tool lists) enables agents to:',
    options: { A: 'Use tools that are only defined during inference', B: 'Access new tools added to the catalog without redeploying the agent — the tool set evolves without code changes', C: 'Dynamically adjust tool execution speed', D: 'Discover which users are using which tools' },
    answer: 'B', explanation: 'Dynamic discovery queries a tool registry at runtime — new tools appear automatically when added to the catalog, old tools can be deprecated, and per-user tool sets can be customized.' },

  { id: 2089, domain: 2, domainName: 'Agent Development', topic: 'Stateful Sessions', difficulty: 'medium', keywords: ['session ID', 'thread ID', 'stateful', 'persistence'],
    question: 'In LangGraph, the config["configurable"]["thread_id"] is used to:',
    options: { A: 'Set the execution thread count for performance', B: 'Identify which conversation session\'s state to load and save when checkpointing', C: 'Configure the LLM inference thread priority', D: 'Thread multiple tool calls into a sequence' },
    answer: 'B', explanation: 'thread_id is the session identifier — when provided to a compiled graph with a checkpointer, it loads that session\'s prior state on invoke and saves new state after execution.' },

  { id: 2090, domain: 2, domainName: 'Agent Development', topic: 'Agent Config Pattern', difficulty: 'medium', keywords: ['RunnableConfig', 'configurable', 'dynamic config'],
    question: 'LangChain\'s RunnableConfig enables:',
    options: { A: 'Configuring hardware for LangChain execution', B: 'Passing runtime configuration (user ID, session params, callbacks) to any runnable without changing its interface', C: 'Configuring the Python runtime environment', D: 'Setting configuration once globally for all chains' },
    answer: 'B', explanation: 'RunnableConfig carries per-invocation metadata (callbacks, tags, metadata, configurable fields) through the entire chain without polluting individual component interfaces.' },

  { id: 2091, domain: 2, domainName: 'Agent Development', topic: 'Event-Driven Agents', difficulty: 'hard', keywords: ['event-driven', 'trigger', 'event loop', 'reactive'],
    question: 'An event-driven agent architecture differs from a request-response agent in that:',
    options: { A: 'Event-driven agents are always faster', B: 'Event-driven agents are triggered by events from various sources rather than waiting for direct user requests', C: 'Event-driven agents cannot use LLMs', D: 'Event-driven agents only process single events at a time' },
    answer: 'B', explanation: 'Event-driven agents react to triggers (file uploaded, ticket created, threshold exceeded) from queues, webhooks, or schedulers — enabling autonomous monitoring and proactive actions.' },

  { id: 2092, domain: 2, domainName: 'Agent Development', topic: 'Functional Tool Design', difficulty: 'medium', keywords: ['pure function', 'side effects', 'idempotent', 'testable'],
    question: 'Designing agent tools as pure functions (no hidden state, no side effects for query tools) improves:',
    options: { A: 'GPU utilization during tool execution', B: 'Testability, reproducibility, and reasoning — pure functions are predictable, mockable, and unit-testable', C: 'Response speed since pure functions cache better', D: 'Only matters for functional programming languages' },
    answer: 'B', explanation: 'Pure functions: given the same inputs, always return the same output. Easy to unit test (no setup), mock (deterministic), and reason about (no hidden interactions). Essential for reliable tool design.' },

  { id: 2093, domain: 2, domainName: 'Agent Development', topic: 'Agent Chaining Anti-patterns', difficulty: 'medium', keywords: ['anti-pattern', 'over-chaining', 'complexity', 'debugging'],
    question: 'Over-chaining in agent design (10+ sequential steps for simple tasks) causes:',
    options: { A: 'Better accuracy due to more reasoning steps', B: 'Error amplification — mistakes compound through each step, making debugging extremely difficult', C: 'Improved performance through optimization', D: 'Better observability since there are more events to trace' },
    answer: 'B', explanation: 'Each step in a chain can introduce errors. 10 steps with 95% accuracy each yields only 60% end-to-end accuracy. Minimize chain length — each step must add clear value.' },

  { id: 2094, domain: 2, domainName: 'Agent Development', topic: 'OpenAI Structured Outputs', difficulty: 'medium', keywords: ['structured outputs', 'response_format', 'json_schema', 'guaranteed'],
    question: 'OpenAI\'s Structured Outputs (with strict=True) guarantees:',
    options: { A: '100% accuracy in the content of the output', B: 'The generated JSON will always be valid according to the provided schema, with no schema violations', C: 'Faster response times than unstructured output', D: 'Outputs are smaller in token count' },
    answer: 'B', explanation: 'strict=True in response_format enables constrained decoding that guarantees valid JSON schema adherence — eliminating JSON parse errors that plague unstructured tool call parsing.' },

  { id: 2095, domain: 2, domainName: 'Agent Development', topic: 'Agent Memory Retrieval', difficulty: 'medium', keywords: ['memory retrieval', 'similarity', 'MMR', 'top-k'],
    question: 'When retrieving relevant memories for an agent\'s context, the top_k parameter controls:',
    options: { A: 'The top K users whose memories are retrieved', B: 'The number of most similar memories retrieved — balancing context richness vs token budget', C: 'The maximum K tokens used for memory storage', D: 'The K-fold cross-validation of memory quality' },
    answer: 'B', explanation: 'top_k = 5 retrieves the 5 most relevant past memories to include in the context. Higher k provides richer context but costs more tokens — calibrate based on task and token budget.' },

  { id: 2096, domain: 2, domainName: 'Agent Development', topic: 'Production Debugging', difficulty: 'medium', keywords: ['debugging', 'production', 'replay', 'trace'],
    question: 'Replay-based debugging for production agent failures works by:',
    options: { A: 'Replaying the entire model training with different hyperparameters', B: 'Reproducing exact failure conditions offline by rerunning the logged inputs, state, and tool responses', C: 'Replaying system performance metrics from the time of failure', D: 'Having users replay their failing queries manually' },
    answer: 'B', explanation: 'Logged inputs + tool responses from production incidents can be replayed in development to exactly reproduce failures deterministically (with deterministic mock tool responses).' },

  { id: 2097, domain: 2, domainName: 'Agent Development', topic: 'Integration Patterns', difficulty: 'medium', keywords: ['webhook', 'polling', 'push', 'integration'],
    question: 'For integrating AI agents with slow external processes (reports that take 5 minutes), the preferred pattern is:',
    options: { A: 'Synchronous blocking — wait 5 minutes for the result', B: 'Async with polling or webhook callback — submit job, receive notification when complete', C: 'Increase agent timeout to 10 minutes', D: 'Run multiple concurrent requests until one succeeds' },
    answer: 'B', explanation: 'Long-running external processes require async patterns: submit job → get job ID → poll status OR receive webhook when done. Synchronous blocking for minutes degrades user experience and ties up resources.' },

  { id: 2098, domain: 2, domainName: 'Agent Development', topic: 'Code Generation Agents', difficulty: 'medium', keywords: ['code generation', 'code execution', 'verify', 'interpreter'],
    question: 'A code generation agent should always verify generated code by:',
    options: { A: 'Checking if it looks syntactically correct with a quick review', B: 'Executing it in a sandbox and checking output against expected results or test cases', C: 'Running static analysis only without execution', D: 'Trusting LLM-generated code since it rarely has bugs' },
    answer: 'B', explanation: 'LLMs generate plausible-looking but often subtly incorrect code. The only reliable verification is execution — run it with test inputs in a safe sandbox and check results.' },

  { id: 2099, domain: 2, domainName: 'Agent Development', topic: 'Document Understanding', difficulty: 'medium', keywords: ['document', 'parsing', 'extraction', 'structured'],
    question: 'For extracting structured information (tables, forms) from PDFs in an agent pipeline, which approach is most reliable?',
    options: { A: 'Raw text extraction ignoring layout', B: 'Multimodal LLM (vision model) or dedicated document parsing library (pymupdf, pdfplumber) that understands document structure', C: 'Converting PDF to audio and using speech recognition', D: 'Manual copy-paste by users' },
    answer: 'B', explanation: 'Layout-aware document parsers (pdfplumber, pymupdf) extract tables and structured data correctly. For complex layouts, multimodal LLMs can "read" the document as an image for higher accuracy.' },

  { id: 2100, domain: 2, domainName: 'Agent Development', topic: 'Agent Development Lifecycle', difficulty: 'easy', keywords: ['lifecycle', 'development', 'staging', 'production'],
    question: 'The recommended agent development lifecycle stages are:',
    options: { A: 'Directly deploy to production and fix issues as they arise', B: 'Prototype → Evaluate → Stage (shadow mode) → Production → Monitor → Iterate', C: 'Train → Fine-tune → Deploy (one-time process)', D: 'No defined lifecycle — agents are always in development' },
    answer: 'B', explanation: 'Agent lifecycle: rapid prototype → benchmark evaluation → staging/shadow mode against production traffic → gradual rollout → continuous monitoring → iterative improvement based on metrics.' },
];
