import { Question } from '../types';

export const domain2Questions: Question[] = [
  { id: 2001, domain: 2, domainName: 'Agent Development', topic: 'LangGraph', difficulty: 'medium', keywords: ['LangGraph', 'node', 'edge', 'state'],
    question: 'In LangGraph, what is the role of the StateGraph class?',
    options: { A: 'It manages database connections for agent state persistence', B: 'It defines the agent workflow as a graph of nodes and edges operating on a shared state object', C: 'It provides a REST API for external agent communication', D: 'It fine-tunes LLMs on agent conversation data' },
    answer: 'B', explanation: 'StateGraph is LangGraph\'s core abstraction — you define nodes (processing functions) and edges (transitions), all reading from and writing to a typed shared state object.' },

  { id: 2002, domain: 2, domainName: 'Agent Development', topic: 'LlamaIndex', difficulty: 'medium', keywords: ['LlamaIndex', 'query engine', 'index'],
    question: 'LlamaIndex\'s VectorStoreIndex is primarily used for:',
    options: { A: 'Training new language models', B: 'Indexing documents for semantic similarity search in RAG pipelines', C: 'Managing user authentication tokens', D: 'Scheduling GPU compute jobs' },
    answer: 'B', explanation: 'VectorStoreIndex embeds documents into a vector store enabling fast semantic retrieval — the core data structure for RAG-based agents in LlamaIndex.' },

  { id: 2003, domain: 2, domainName: 'Agent Development', topic: 'Prompt Engineering', difficulty: 'easy', keywords: ['few-shot', 'prompt', 'examples'],
    question: 'Few-shot prompting in agent development involves:',
    options: { A: 'Training the model on a few hundred examples', B: 'Providing 2-5 input/output examples in the prompt to demonstrate the desired behavior', C: 'Using a smaller model with fewer parameters', D: 'Limiting the agent to a few tool calls per session' },
    answer: 'B', explanation: 'Few-shot examples in the system or user prompt demonstrate the expected format and reasoning pattern, dramatically improving output consistency without fine-tuning.' },

  { id: 2004, domain: 2, domainName: 'Agent Development', topic: 'Structured Output', difficulty: 'medium', keywords: ['structured output', 'JSON', 'Pydantic', 'schema'],
    question: 'When an agent must return structured data (e.g., a list of entities), the best approach is:',
    options: { A: 'Parse free-form text with regex after generation', B: 'Use structured output with a Pydantic/JSON schema that the LLM is constrained to follow', C: 'Fine-tune the model on structured examples', D: 'Use a separate NLP pipeline to extract structure' },
    answer: 'B', explanation: 'Structured output (constrained decoding or JSON mode) forces the LLM to produce valid schema-conforming output, eliminating brittle text parsing.' },

  { id: 2005, domain: 2, domainName: 'Agent Development', topic: 'Streaming', difficulty: 'medium', keywords: ['streaming', 'SSE', 'token streaming', 'UX'],
    question: 'Token streaming in agent applications provides which key benefit?',
    options: { A: 'Reduces total tokens generated', B: 'Improves perceived responsiveness by showing partial output as it is generated', C: 'Enables parallel model inference', D: 'Reduces GPU memory requirements' },
    answer: 'B', explanation: 'Streaming sends tokens to the client as they\'re generated rather than waiting for completion, dramatically reducing time-to-first-token and improving UX.' },

  { id: 2006, domain: 2, domainName: 'Agent Development', topic: 'Conversation Memory', difficulty: 'medium', keywords: ['conversation memory', 'buffer', 'summary', 'memory types'],
    question: 'Which LangChain memory type summarizes older conversation turns to stay within context limits?',
    options: { A: 'ConversationBufferMemory', B: 'ConversationSummaryMemory', C: 'VectorStoreMemory', D: 'EntityMemory' },
    answer: 'B', explanation: 'ConversationSummaryMemory periodically summarizes older turns into a compressed summary, enabling indefinite conversation length without exceeding context windows.' },

  { id: 2007, domain: 2, domainName: 'Agent Development', topic: 'Tool Registration', difficulty: 'easy', keywords: ['tool registration', '@tool', 'decorator', 'LangChain'],
    question: 'In LangChain, the @tool decorator is used to:',
    options: { A: 'Deploy the agent to production', B: 'Register a Python function as a tool that the agent can discover and call', C: 'Monitor agent performance metrics', D: 'Connect to a vector database' },
    answer: 'B', explanation: 'The @tool decorator wraps a Python function with metadata (name, description, schema) making it discoverable by the LangChain agent runtime as an invocable capability.' },

  { id: 2008, domain: 2, domainName: 'Agent Development', topic: 'Agent Executor', difficulty: 'medium', keywords: ['AgentExecutor', 'LCEL', 'runnable'],
    question: 'What does the AgentExecutor in LangChain provide?',
    options: { A: 'A serverless compute platform for running agents', B: 'The runtime loop that repeatedly calls the agent, executes tool calls, and feeds results back until done', C: 'A training harness for RLHF fine-tuning', D: 'A UI framework for chat interfaces' },
    answer: 'B', explanation: 'AgentExecutor handles the ReAct loop: call LLM → parse action → execute tool → feed observation back → repeat until final answer, with error handling and iteration limits.' },

  { id: 2009, domain: 2, domainName: 'Agent Development', topic: 'LCEL', difficulty: 'medium', keywords: ['LCEL', 'pipe operator', 'chain', 'LangChain'],
    question: 'LangChain Expression Language (LCEL) uses the pipe operator (|) to:',
    options: { A: 'Perform bitwise OR operations on agent states', B: 'Compose runnable components sequentially, passing output of one as input to the next', C: 'Route requests between different LLM providers', D: 'Filter sensitive content from responses' },
    answer: 'B', explanation: 'LCEL\'s pipe operator creates composable chains: prompt | llm | output_parser creates a pipeline where each component\'s output flows into the next.' },

  { id: 2010, domain: 2, domainName: 'Agent Development', topic: 'LlamaIndex Agents', difficulty: 'medium', keywords: ['ReActAgent', 'OpenAIAgent', 'LlamaIndex agent'],
    question: 'In LlamaIndex, which agent type natively integrates with OpenAI\'s function calling for tool use?',
    options: { A: 'ReActAgent', B: 'OpenAIAgent', C: 'SubQuestionQueryEngine', D: 'RouterQueryEngine' },
    answer: 'B', explanation: 'OpenAIAgent in LlamaIndex leverages OpenAI\'s native function calling API for structured, reliable tool invocation with lower latency than text-parsed ReAct.' },

  { id: 2011, domain: 2, domainName: 'Agent Development', topic: 'Async Development', difficulty: 'hard', keywords: ['async', 'asyncio', 'concurrent', 'Python'],
    question: 'Why is async/await (asyncio) important when developing production AI agents?',
    options: { A: 'It makes the agent\'s responses more accurate', B: 'It enables concurrent I/O operations (multiple LLM calls, tool calls) without blocking the event loop', C: 'It reduces model parameter count', D: 'It automatically handles rate limiting' },
    answer: 'B', explanation: 'LLM and tool calls are I/O bound. Async execution allows many calls to be in-flight simultaneously, enabling parallelism and higher throughput without threads.' },

  { id: 2012, domain: 2, domainName: 'Agent Development', topic: 'Checkpointing', difficulty: 'medium', keywords: ['checkpoint', 'persistence', 'LangGraph', 'resume'],
    question: 'LangGraph\'s checkpointing feature enables:',
    options: { A: 'Automatic model fine-tuning during inference', B: 'Persisting agent state after each step so execution can be resumed, inspected, or replayed', C: 'GPU memory management across multiple nodes', D: 'Compressing conversation history automatically' },
    answer: 'B', explanation: 'Checkpointing saves graph state to a persistent store (SQLite, Redis, Postgres) after each node, enabling time-travel debugging, human-in-the-loop pauses, and resumability.' },

  { id: 2013, domain: 2, domainName: 'Agent Development', topic: 'Prompt Templates', difficulty: 'easy', keywords: ['PromptTemplate', 'ChatPromptTemplate', 'variable substitution'],
    question: 'ChatPromptTemplate in LangChain is used to:',
    options: { A: 'Train a new chat model', B: 'Define reusable, parameterized message templates with variable placeholders', C: 'Monitor chat session latency', D: 'Store conversation history to a database' },
    answer: 'B', explanation: 'ChatPromptTemplate defines structured message sequences (system, human, AI) with variable placeholders that are filled at runtime, enabling reusable, testable prompt definitions.' },

  { id: 2014, domain: 2, domainName: 'Agent Development', topic: 'Output Parsers', difficulty: 'medium', keywords: ['output parser', 'JSON', 'PydanticOutputParser'],
    question: 'PydanticOutputParser in LangChain provides what capability?',
    options: { A: 'Validates user input against a schema', B: 'Parses LLM text output into a structured Pydantic model, with automatic retry on parse failure', C: 'Converts Pydantic models to SQL tables', D: 'Monitors LLM output for harmful content' },
    answer: 'B', explanation: 'PydanticOutputParser extracts structured data from LLM responses by providing format instructions and parsing the output into a typed Pydantic model.' },

  { id: 2015, domain: 2, domainName: 'Agent Development', topic: 'Human-in-the-Loop Development', difficulty: 'medium', keywords: ['interrupt', 'human approval', 'LangGraph', 'breakpoint'],
    question: 'LangGraph\'s interrupt() function allows developers to:',
    options: { A: 'Terminate the agent immediately on error', B: 'Pause agent execution to request human input or approval before continuing', C: 'Interrupt GPU computation for efficiency', D: 'Stop all background threads' },
    answer: 'B', explanation: 'interrupt() pauses graph execution at a defined checkpoint, persists state, and waits for external input (human approval, additional data) before resuming.' },

  { id: 2016, domain: 2, domainName: 'Agent Development', topic: 'RAG Development', difficulty: 'medium', keywords: ['RAG', 'retriever', 'chain', 'context stuffing'],
    question: 'In a RAG chain, what is the correct order of operations?',
    options: { A: 'Generate → Retrieve → Augment', B: 'Retrieve relevant documents → Augment prompt with context → Generate answer', C: 'Train → Deploy → Query', D: 'Embed → Fine-tune → Serve' },
    answer: 'B', explanation: 'RAG: first retrieve relevant context from the knowledge base, then augment the LLM prompt with that context, then generate a grounded answer.' },

  { id: 2017, domain: 2, domainName: 'Agent Development', topic: 'Agent Testing', difficulty: 'medium', keywords: ['testing', 'unit test', 'mock', 'evaluation'],
    question: 'When unit testing an agent, which approach best isolates the agent logic from LLM non-determinism?',
    options: { A: 'Run the agent against a live LLM 100 times and average results', B: 'Mock the LLM with deterministic pre-defined responses to test decision logic in isolation', C: 'Only test agents in production with real users', D: 'Disable all tools during testing' },
    answer: 'B', explanation: 'Mocking the LLM with fixed responses makes tests deterministic and fast, letting you verify routing logic, tool call handling, and state management independently.' },

  { id: 2018, domain: 2, domainName: 'Agent Development', topic: 'Multi-Step Reasoning', difficulty: 'hard', keywords: ['multi-step', 'chain of thought', 'reasoning', 'intermediate'],
    question: 'For tasks requiring multi-step mathematical reasoning, which prompting approach is most effective?',
    options: { A: 'Zero-shot with a brief question', B: 'Chain-of-Thought with step-by-step intermediate reasoning demonstrated in examples', C: 'Retrieval of similar past solutions', D: 'Generating 10 candidate answers and voting' },
    answer: 'B', explanation: 'CoT prompting guides the LLM to show intermediate reasoning steps, dramatically improving accuracy on multi-step reasoning tasks compared to direct answer prompts.' },

  { id: 2019, domain: 2, domainName: 'Agent Development', topic: 'Tool Development', difficulty: 'medium', keywords: ['tool development', 'docstring', 'schema', 'description'],
    question: 'What makes a well-designed agent tool description?',
    options: { A: 'Long technical documentation explaining implementation details', B: 'Clear, concise natural language explaining WHEN and HOW to use the tool including parameter semantics', C: 'The tool\'s git commit history', D: 'Performance benchmarks of the tool' },
    answer: 'B', explanation: 'The LLM decides which tool to call based on descriptions. Clear, use-case-focused descriptions with unambiguous parameter explanations prevent misuse.' },

  { id: 2020, domain: 2, domainName: 'Agent Development', topic: 'CrewAI', difficulty: 'medium', keywords: ['CrewAI', 'crew', 'role', 'task'],
    question: 'In CrewAI, an Agent\'s "role" and "goal" attributes primarily influence:',
    options: { A: 'The agent\'s computational resource allocation', B: 'The persona and objective that shape the agent\'s LLM behavior during task execution', C: 'The network routing of agent messages', D: 'The database schema for storing results' },
    answer: 'B', explanation: 'CrewAI\'s role and goal are injected into the system prompt, shaping how the LLM approaches tasks — a "Senior Researcher" acts differently than a "Content Writer".' },

  { id: 2021, domain: 2, domainName: 'Agent Development', topic: 'Rate Limiting', difficulty: 'medium', keywords: ['rate limit', 'throttling', 'token bucket', 'API'],
    question: 'When building agents that make many LLM API calls, which strategy prevents hitting rate limits?',
    options: { A: 'Make all calls simultaneously as fast as possible', B: 'Implement exponential backoff on 429 errors and use token bucket algorithms to pre-rate-limit', C: 'Switch LLM providers after every 10 calls', D: 'Cache all responses permanently' },
    answer: 'B', explanation: 'Exponential backoff handles rate limit errors gracefully, while token bucket algorithms proactively pace calls within quota to prevent hitting limits in the first place.' },

  { id: 2022, domain: 2, domainName: 'Agent Development', topic: 'Callbacks', difficulty: 'medium', keywords: ['callbacks', 'hooks', 'observability', 'LangChain'],
    question: 'LangChain callbacks are primarily used for:',
    options: { A: 'Calling external REST APIs from agents', B: 'Hooking into agent lifecycle events (LLM start/end, tool call, error) for logging and monitoring', C: 'Defining the agent\'s tool set', D: 'Managing conversation sessions' },
    answer: 'B', explanation: 'Callbacks intercept agent lifecycle events, enabling custom logging, monitoring integration (LangSmith, W&B), token counting, and custom error handling without modifying core logic.' },

  { id: 2023, domain: 2, domainName: 'Agent Development', topic: 'Embeddings', difficulty: 'easy', keywords: ['embeddings', 'vector', 'semantic', 'similarity'],
    question: 'Text embeddings in agent development are used to:',
    options: { A: 'Compress images for storage', B: 'Represent text as dense numerical vectors that capture semantic meaning for similarity search', C: 'Encrypt agent communications', D: 'Fine-tune language models' },
    answer: 'B', explanation: 'Embeddings map text to high-dimensional vectors where semantically similar texts are geometrically close, enabling semantic search in RAG and memory retrieval.' },

  { id: 2024, domain: 2, domainName: 'Agent Development', topic: 'Document Loaders', difficulty: 'easy', keywords: ['document loader', 'PDF', 'web', 'ingestion'],
    question: 'In LlamaIndex and LangChain, document loaders are responsible for:',
    options: { A: 'Loading model weights from disk', B: 'Ingesting content from various sources (PDF, web, database) into a format suitable for indexing', C: 'Loading trained agent configurations', D: 'Managing GPU memory allocation' },
    answer: 'B', explanation: 'Document loaders handle source-specific parsing (PDFs, CSVs, web pages, Notion, etc.) and convert content into uniform Document objects for chunking and embedding.' },

  { id: 2025, domain: 2, domainName: 'Agent Development', topic: 'Agent State Design', difficulty: 'hard', keywords: ['state', 'TypedDict', 'annotation', 'reducer'],
    question: 'In LangGraph, using Annotated[list, operator.add] for a state field means:',
    options: { A: 'The field is read-only and cannot be modified', B: 'When multiple nodes update this field, their outputs are appended (accumulated) rather than overwriting', C: 'The field is encrypted using operator.add as a key', D: 'The field must contain numeric values only' },
    answer: 'B', explanation: 'Reducers in LangGraph define how state updates are merged. operator.add as reducer means new values are appended to the list rather than replacing it — useful for message history.' },

  { id: 2026, domain: 2, domainName: 'Agent Development', topic: 'SubQuestionQueryEngine', difficulty: 'medium', keywords: ['SubQuestionQueryEngine', 'LlamaIndex', 'decomposition'],
    question: 'LlamaIndex\'s SubQuestionQueryEngine improves complex query handling by:',
    options: { A: 'Running the query multiple times on the same index', B: 'Decomposing a complex query into simpler sub-questions, routing each to the appropriate data source', C: 'Splitting large documents into smaller chunks', D: 'Caching frequent query results' },
    answer: 'B', explanation: 'SubQuestionQueryEngine uses an LLM to break complex queries into targeted sub-questions, routes each to the appropriate data tool, then synthesizes a comprehensive final answer.' },

  { id: 2027, domain: 2, domainName: 'Agent Development', topic: 'Error Recovery', difficulty: 'medium', keywords: ['error recovery', 'fallback', 'retry', 'resilience'],
    question: 'Which approach provides the most robust error recovery in agent tool execution?',
    options: { A: 'Log the error and return None silently', B: 'Pass the error message back to the LLM as an observation and let it reason about alternatives', C: 'Immediately throw an exception to the user', D: 'Skip the failed tool and continue to the next step' },
    answer: 'B', explanation: 'Feeding error messages back to the LLM as tool observations leverages the model\'s reasoning ability to diagnose the error and attempt alternative approaches.' },

  { id: 2028, domain: 2, domainName: 'Agent Development', topic: 'Agent Configuration', difficulty: 'easy', keywords: ['configuration', 'model', 'temperature', 'parameters'],
    question: 'For an agent that needs deterministic, factual responses (e.g., data extraction), the temperature parameter should be set to:',
    options: { A: '1.0 or higher for creativity', B: '0 or near 0 for reproducibility and consistency', C: '0.5 for balance', D: 'Temperature has no effect on agentic tasks' },
    answer: 'B', explanation: 'Temperature 0 makes the model maximally deterministic (greedy decoding), essential for tasks where consistency and accuracy matter more than creativity.' },

  { id: 2029, domain: 2, domainName: 'Agent Development', topic: 'Multi-Agent Communication', difficulty: 'hard', keywords: ['supervisor', 'worker', 'handoff', 'routing'],
    question: 'In LangGraph multi-agent systems, a Command object is used to:',
    options: { A: 'Issue shell commands on the host system', B: 'Route control to a different node/agent and optionally update shared state in a single operation', C: 'Command the LLM to use a specific tool', D: 'Terminate the agent graph' },
    answer: 'B', explanation: 'Command(goto="node_name", update={"key": "value"}) allows a node to both update state and specify the next node, enabling dynamic routing with state updates atomically.' },

  { id: 2030, domain: 2, domainName: 'Agent Development', topic: 'Python Agent Development', difficulty: 'easy', keywords: ['Python', 'environment', 'dependencies', 'virtual env'],
    question: 'Best practice for managing Python dependencies in an agent project is:',
    options: { A: 'Install all packages globally', B: 'Use virtual environments (venv/conda) with pinned dependency versions in requirements.txt', C: 'Use only the standard library to avoid conflicts', D: 'Install packages as root user' },
    answer: 'B', explanation: 'Virtual environments isolate dependencies per project, while pinned versions ensure reproducible builds and prevent unexpected breakage from upstream package updates.' },

  { id: 2031, domain: 2, domainName: 'Agent Development', topic: 'Agent Logging', difficulty: 'easy', keywords: ['logging', 'debug', 'verbose', 'observability'],
    question: 'When debugging an agent that produces incorrect outputs, the first step should be:',
    options: { A: 'Retrain the model from scratch', B: 'Enable verbose logging to trace each LLM call, tool invocation, and state transition', C: 'Reduce the agent\'s context window', D: 'Switch to a different LLM provider' },
    answer: 'B', explanation: 'Verbose/trace logging reveals the exact sequence of LLM prompts, tool calls, and state changes, pinpointing where reasoning goes wrong without guesswork.' },

  { id: 2032, domain: 2, domainName: 'Agent Development', topic: 'API Integration', difficulty: 'medium', keywords: ['REST API', 'OpenAPI', 'tool', 'integration'],
    question: 'When wrapping a REST API as an agent tool, which information must be included in the tool definition?',
    options: { A: 'The API server\'s hardware specifications', B: 'The endpoint URL, HTTP method, required parameters with types, and clear description of what it returns', C: 'The API provider\'s business model', D: 'The number of concurrent users the API handles' },
    answer: 'B', explanation: 'The LLM needs the endpoint, method, parameter names/types/descriptions, and what the response means to correctly form tool calls and interpret results.' },

  { id: 2033, domain: 2, domainName: 'Agent Development', topic: 'Context Management', difficulty: 'medium', keywords: ['context management', 'trimming', 'summarization', 'token budget'],
    question: 'Which two techniques are commonly used to manage token budgets in long-running agent conversations? (Choose two)',
    options: { A: 'Conversation summarization of older turns', B: 'Increasing the LLM\'s parameter count', C: 'Message trimming (dropping oldest messages)', D: 'Switching to a different language for responses' },
    answer: 'AC', explanation: 'Summarization compresses old context to key facts while trimming removes it entirely. Both reduce token count, with summarization preserving more information.' },

  { id: 2034, domain: 2, domainName: 'Agent Development', topic: 'Agent Deployment', difficulty: 'medium', keywords: ['FastAPI', 'deployment', 'REST endpoint', 'serve'],
    question: 'The recommended approach for exposing a LangGraph agent as a REST API is:',
    options: { A: 'Export the agent as a Python pickle file', B: 'Wrap it with FastAPI or use LangServe to create production-ready HTTP endpoints', C: 'Use agent\'s CLI interface only', D: 'Deploy as a browser extension' },
    answer: 'B', explanation: 'FastAPI/LangServe provide production REST endpoints with input validation, streaming support, documentation, and horizontal scaling — the standard for serving agents.' },

  { id: 2035, domain: 2, domainName: 'Agent Development', topic: 'Agent Security', difficulty: 'medium', keywords: ['input validation', 'sanitization', 'injection', 'security'],
    question: 'To prevent prompt injection via user inputs, agent developers should:',
    options: { A: 'Trust all user inputs since the LLM will handle them correctly', B: 'Validate and sanitize inputs, use separate system/user message roles, and apply output guards', C: 'Only accept inputs under 10 words', D: 'Disable tool access for all users' },
    answer: 'B', explanation: 'Defense requires: input validation (reject/sanitize malicious patterns), strict role separation (system vs user messages), and output guards to catch exfiltrated data.' },

  { id: 2036, domain: 2, domainName: 'Agent Development', topic: 'Graph Cycles', difficulty: 'hard', keywords: ['cycle', 'loop', 'conditional edge', 'recursion'],
    question: 'In LangGraph, adding a cycle (loop) to the graph enables:',
    options: { A: 'Infinite recursion that crashes the system', B: 'Iterative refinement — the agent can loop back to try again based on intermediate results', C: 'Parallel execution of all graph nodes', D: 'Automatic checkpointing of every state' },
    answer: 'B', explanation: 'Cycles in LangGraph enable retry and refinement loops — e.g., agent generates a plan, executes it, evaluates results, and loops back to re-plan if the result is unsatisfactory.' },

  { id: 2037, domain: 2, domainName: 'Agent Development', topic: 'Agent Observability Tools', difficulty: 'medium', keywords: ['LangSmith', 'tracing', 'evaluation', 'monitoring'],
    question: 'LangSmith is primarily used for:',
    options: { A: 'Training new language models', B: 'Tracing, evaluating, and monitoring LangChain/LangGraph agent runs in development and production', C: 'Managing GPU cluster allocations', D: 'Converting models between frameworks' },
    answer: 'B', explanation: 'LangSmith provides detailed traces of every LLM call and tool invocation, evaluation datasets, regression testing, and production monitoring for LangChain agents.' },

  { id: 2038, domain: 2, domainName: 'Agent Development', topic: 'ReAct Implementation', difficulty: 'medium', keywords: ['ReAct', 'thought', 'action', 'observation'],
    question: 'In a ReAct agent implementation, the agent\'s output follows which structured format?',
    options: { A: 'Input → Output → Score', B: 'Thought (reasoning) → Action (tool + params) → Observation (tool result) → repeat', C: 'Query → Embed → Retrieve → Answer', D: 'Plan → Execute → Verify → Deploy' },
    answer: 'B', explanation: 'ReAct structures agent output as alternating Thought (internal reasoning), Action (tool invocation), and Observation (tool result) cycles until a final answer is reached.' },

  { id: 2039, domain: 2, domainName: 'Agent Development', topic: 'Pydantic Integration', difficulty: 'medium', keywords: ['Pydantic', 'validation', 'schema', 'type safety'],
    question: 'Why is Pydantic widely used in LLM agent development?',
    options: { A: 'It trains language models faster', B: 'It provides runtime type validation and schema definition for LLM inputs, outputs, and tool parameters', C: 'It manages GPU memory allocation', D: 'It replaces the need for system prompts' },
    answer: 'B', explanation: 'Pydantic enforces type safety at runtime, generates JSON schemas for tool definitions, and validates LLM-generated structured outputs — essential for reliable agent systems.' },

  { id: 2040, domain: 2, domainName: 'Agent Development', topic: 'Agent Memory Implementation', difficulty: 'medium', keywords: ['entity memory', 'knowledge graph', 'entity extraction'],
    question: 'ConversationEntityMemory in LangChain tracks:',
    options: { A: 'System performance entities like CPU and GPU', B: 'Named entities (people, places, products) mentioned across conversation turns, building a knowledge graph', C: 'Database entity-relationship diagrams', D: 'User account entities for authentication' },
    answer: 'B', explanation: 'EntityMemory extracts and accumulates facts about named entities mentioned in conversation, enabling agents to recall "Alice is the CEO of Acme Corp" from prior turns.' },

  { id: 2041, domain: 2, domainName: 'Agent Development', topic: 'Async Patterns', difficulty: 'hard', keywords: ['asyncio.gather', 'parallel', 'concurrency', 'tasks'],
    question: 'asyncio.gather() is used in agent development to:',
    options: { A: 'Collect training data asynchronously', B: 'Run multiple coroutines concurrently and wait for all to complete, enabling parallel tool execution', C: 'Gather system metrics during agent runs', D: 'Merge multiple models into one' },
    answer: 'B', explanation: 'asyncio.gather() takes multiple async coroutines and runs them concurrently, enabling an agent to call multiple tools or APIs simultaneously rather than sequentially.' },

  { id: 2042, domain: 2, domainName: 'Agent Development', topic: 'Model Selection', difficulty: 'medium', keywords: ['model selection', 'capability', 'cost', 'latency tradeoff'],
    question: 'When selecting an LLM for a production agent, which factors must be balanced? (Choose two)',
    options: { A: 'Model capability and reasoning quality', B: 'The model\'s country of origin', C: 'Inference cost and latency', D: 'Number of training epochs used' },
    answer: 'AC', explanation: 'Model selection requires balancing capability (can it do the task accurately?) against cost and latency (can we afford it at scale?). These are the primary production trade-offs.' },

  { id: 2043, domain: 2, domainName: 'Agent Development', topic: 'Environment Variables', difficulty: 'easy', keywords: ['API key', 'environment variable', 'secrets', '.env'],
    question: 'The best practice for managing LLM API keys in agent applications is:',
    options: { A: 'Hardcode them in the source code for convenience', B: 'Store them in environment variables or a secrets manager, never in code or version control', C: 'Share them with all team members via email', D: 'Commit them to a private GitHub repository' },
    answer: 'B', explanation: 'API keys in code risk accidental exposure via version control. Environment variables and secrets managers (Vault, AWS Secrets Manager) provide secure, auditable access.' },

  { id: 2044, domain: 2, domainName: 'Agent Development', topic: 'Agent Chaining', difficulty: 'medium', keywords: ['sequential chain', 'pipeline', 'data flow'],
    question: 'A SequentialChain in LangChain passes:',
    options: { A: 'Instructions sequentially to the same user', B: 'The output of each chain as input to the next in a defined sequence', C: 'Sequences of GPU instructions', D: 'Request IDs in sequential order' },
    answer: 'B', explanation: 'SequentialChain composes multiple chains into a pipeline where each chain\'s output becomes the next chain\'s input, enabling multi-step processing workflows.' },

  { id: 2045, domain: 2, domainName: 'Agent Development', topic: 'Response Quality', difficulty: 'medium', keywords: ['response quality', 'hallucination', 'grounding', 'citation'],
    question: 'To reduce hallucinations in a RAG-based agent, which two practices are most effective? (Choose two)',
    options: { A: 'Increase generation temperature to 1.5', B: 'Instruct the model to only answer from retrieved context and say "I don\'t know" when context is insufficient', C: 'Add source citations to the prompt, requiring the model to reference specific retrieved passages', D: 'Remove all retrieved context from prompts' },
    answer: 'BC', explanation: 'Constraining the model to retrieved context and requiring citations grounds responses in evidence, dramatically reducing hallucination in RAG systems.' },

  { id: 2046, domain: 2, domainName: 'Agent Development', topic: 'Agent Frameworks Comparison', difficulty: 'medium', keywords: ['LangChain', 'LlamaIndex', 'comparison', 'use case'],
    question: 'LlamaIndex is primarily optimized for:',
    options: { A: 'Building conversational chatbots without retrieval', B: 'Data indexing, retrieval, and RAG pipelines over complex document corpora', C: 'Training new foundation models', D: 'Deploying models to mobile devices' },
    answer: 'B', explanation: 'LlamaIndex excels at complex data ingestion, indexing, and retrieval — its core differentiator is sophisticated RAG over diverse, complex document collections.' },

  { id: 2047, domain: 2, domainName: 'Agent Development', topic: 'Type Safety', difficulty: 'medium', keywords: ['TypedDict', 'type hints', 'mypy', 'runtime safety'],
    question: 'Using TypedDict for LangGraph state definitions provides:',
    options: { A: 'Automatic model fine-tuning based on state', B: 'Type-safe state schema that IDE tools and mypy can validate, preventing common state mutation errors', C: 'Encrypted state storage', D: 'Faster graph traversal' },
    answer: 'B', explanation: 'TypedDict makes the expected state structure explicit and machine-checkable, enabling IDE autocomplete, mypy validation, and clear documentation of what each node can read/write.' },

  { id: 2048, domain: 2, domainName: 'Agent Development', topic: 'Parallelism in Development', difficulty: 'medium', keywords: ['Send API', 'map-reduce', 'parallel nodes', 'LangGraph'],
    question: 'LangGraph\'s Send API enables:',
    options: { A: 'Sending emails from within agent workflows', B: 'Dynamically spawning parallel branches of the graph, each processing a different item from a list', C: 'Streaming tokens to multiple clients simultaneously', D: 'Sending agent state to external monitoring systems' },
    answer: 'B', explanation: 'Send() creates dynamic parallel graph branches — perfect for map-reduce patterns where you process N items concurrently then aggregate results.' },

  { id: 2049, domain: 2, domainName: 'Agent Development', topic: 'Production Readiness', difficulty: 'medium', keywords: ['production', 'reliability', 'monitoring', 'SLA'],
    question: 'Which aspects are essential for making an agent production-ready? (Choose two)',
    options: { A: 'Comprehensive error handling and graceful degradation', B: 'Using the largest available model regardless of cost', C: 'Monitoring and alerting on key agent metrics (success rate, latency, cost)', D: 'Running all computations synchronously' },
    answer: 'AC', explanation: 'Production agents need robust error handling (they will encounter unexpected inputs) and monitoring to detect degradation, cost overruns, or outages before users are impacted.' },

  { id: 2050, domain: 2, domainName: 'Agent Development', topic: 'Semantic Kernel', difficulty: 'medium', keywords: ['Semantic Kernel', 'Microsoft', 'plugins', 'kernel'],
    question: 'Microsoft\'s Semantic Kernel framework organizes agent capabilities as:',
    options: { A: 'Docker containers', B: 'Plugins — collections of functions that the kernel can orchestrate with LLMs', C: 'Database stored procedures', D: 'REST microservices only' },
    answer: 'B', explanation: 'Semantic Kernel uses a plugin model where native (C#/Python) or semantic (prompt) functions are organized into plugins that the kernel\'s planner can invoke to complete user tasks.' },
];
