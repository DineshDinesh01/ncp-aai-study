import { Question } from '../types';

export const domain1Questions: Question[] = [
  { id: 1001, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Tool Integration', difficulty: 'medium', keywords: ['microservice', 'tool', 'architecture'],
    question: 'When designing tool integration for an agent that needs to perform mathematical calculations, web searches, and API calls, which architecture pattern provides the most scalable and maintainable approach?',
    options: { A: 'External tool services with manual configuration for each agent instance', B: 'Microservice-based tool architecture with standardized interfaces', C: 'Monolithic tool handler with conditional logic for different tool types', D: 'Embedded tool functions within the main agent code' },
    answer: 'B', explanation: 'Microservice-based tool architecture assigns each capability to its own independently deployable service with a standardized interface, achieving separation of concerns, fault isolation, and horizontal scalability.' },

  { id: 1002, domain: 1, domainName: 'Agent Architecture & Design', topic: 'ReAct Pattern', difficulty: 'easy', keywords: ['ReAct', 'reasoning', 'acting', 'iterative'],
    question: 'Which agent pattern allows an agent to observe the environment, reason about what action to take, and act in iterative cycles?',
    options: { A: 'Chain-of-Thought prompting', B: 'ReAct (Reasoning + Acting)', C: 'Tree of Thoughts', D: 'Prompt chaining' },
    answer: 'B', explanation: 'ReAct interleaves reasoning traces with actions, allowing agents to dynamically adjust plans based on environment feedback.' },

  { id: 1003, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Multi-Agent Systems', difficulty: 'medium', keywords: ['orchestrator', 'multi-agent', 'routing'],
    question: 'In a multi-agent system, what is the primary role of the orchestrator agent?',
    options: { A: 'Execute individual tool calls directly', B: 'Store and retrieve conversation history', C: 'Coordinate subtasks and route work between specialized agents', D: 'Handle user authentication and authorization' },
    answer: 'C', explanation: 'The orchestrator coordinates the overall workflow, decides which specialized sub-agent handles each subtask, and aggregates results.' },

  { id: 1004, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Autonomous vs Workflow', difficulty: 'medium', keywords: ['autonomous', 'workflow', 'adaptive'],
    question: 'How does an autonomous agent differ from a predefined workflow when applied to complex enterprise tasks?',
    options: { A: 'Agents optimize for execution speed; workflows prioritize goal alignment', B: 'Workflows provide deterministic task sequencing; agents adapt decisions dynamically based on goals and context', C: 'Workflows emphasize parallelism; agents emphasize serialization', D: 'Agents use rule-based logic; workflows use ML-based decisions' },
    answer: 'B', explanation: 'Autonomous agents reason dynamically and adapt, while workflows follow fixed conditional paths. Agents are better for novel, complex tasks.' },

  { id: 1005, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Tool Calling', difficulty: 'easy', keywords: ['function calling', 'tool use', 'structured output'],
    question: 'What mechanism enables an LLM-based agent to invoke external functions or APIs during a conversation?',
    options: { A: 'Prompt injection', B: 'Function/tool calling with structured JSON output', C: 'Fine-tuning on API documentation', D: 'RAG retrieval from API docs' },
    answer: 'B', explanation: 'Function calling allows the LLM to output structured JSON specifying which tool to call and with what parameters, which the agent runtime then executes.' },

  { id: 1006, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent State Machine', difficulty: 'hard', keywords: ['state machine', 'LangGraph', 'nodes', 'edges'],
    question: 'In LangGraph, how is agent behavior primarily modeled?',
    options: { A: 'As a linear chain of LLM calls', B: 'As a state machine with nodes (actions) and edges (transitions)', C: 'As a decision tree with hardcoded branches', D: 'As a neural network with trainable weights' },
    answer: 'B', explanation: 'LangGraph models agentic flows as a directed graph where nodes represent computation steps and edges define conditional transitions based on state.' },

  { id: 1007, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Loop', difficulty: 'easy', keywords: ['perceive', 'plan', 'act', 'agent loop'],
    question: 'The basic cognitive loop of an AI agent consists of which sequence?',
    options: { A: 'Train → Deploy → Monitor', B: 'Perceive → Plan → Act → Observe', C: 'Retrieve → Generate → Validate', D: 'Prompt → Complete → Cache' },
    answer: 'B', explanation: 'The standard agent loop is: Perceive (sense environment), Plan (reason about action), Act (execute), then Observe (assess outcome) — repeating until goal achieved.' },

  { id: 1008, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Event-Driven Architecture', difficulty: 'hard', keywords: ['event-driven', 'async', 'message queue'],
    question: 'Which architecture is most appropriate for agents that must react to real-time events from multiple external systems without blocking?',
    options: { A: 'Synchronous request-response with polling', B: 'Event-driven architecture with message queues', C: 'Batch processing pipeline', D: 'Monolithic server-side rendering' },
    answer: 'B', explanation: 'Event-driven architectures decouple producers and consumers via message queues, enabling non-blocking, scalable agent reactions to real-time events.' },

  { id: 1009, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Subagent Pattern', difficulty: 'medium', keywords: ['subagent', 'decomposition', 'specialist'],
    question: 'What is the key benefit of the subagent decomposition pattern in complex AI systems?',
    options: { A: 'Reduces total token usage to zero', B: 'Allows specialization — each subagent masters a narrow domain, improving accuracy', C: 'Eliminates the need for tool calling', D: 'Enables training-free adaptation' },
    answer: 'B', explanation: 'Breaking a complex task into specialist subagents reduces cognitive load per agent, improves accuracy via specialization, and enables independent scaling.' },

  { id: 1010, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Parallelism', difficulty: 'medium', keywords: ['parallel', 'fan-out', 'concurrent', 'MapReduce'],
    question: 'An agent needs to research 10 different topics simultaneously. Which architectural pattern best supports this?',
    options: { A: 'Sequential chain processing each topic one at a time', B: 'Fan-out/fan-in with parallel subagent execution', C: 'Single LLM call with all topics in the prompt', D: 'Batch processing overnight' },
    answer: 'B', explanation: 'Fan-out distributes tasks to parallel subagents, fan-in aggregates results — dramatically reducing latency for independent parallel workloads.' },

  { id: 1011, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Context Window', difficulty: 'medium', keywords: ['context window', 'token limit', 'summarization'],
    question: 'When an agent\'s conversation history exceeds the LLM\'s context window, what is the most effective mitigation strategy?',
    options: { A: 'Truncate the beginning of the conversation', B: 'Summarize older context and maintain a rolling window with recent + summary', C: 'Restart the agent from scratch', D: 'Switch to a smaller model with fewer parameters' },
    answer: 'B', explanation: 'Hierarchical summarization preserves key information from older context while keeping recent messages verbatim, balancing completeness with token budget.' },

  { id: 1012, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Tool Registry', difficulty: 'medium', keywords: ['tool registry', 'discovery', 'dynamic tools'],
    question: 'A tool registry in an agentic system serves which primary purpose?',
    options: { A: 'Store training data for fine-tuning', B: 'Provide dynamic discovery and metadata for available tools the agent can invoke', C: 'Cache LLM responses to reduce API costs', D: 'Monitor agent performance metrics' },
    answer: 'B', explanation: 'A tool registry catalogs available tools with their schemas, descriptions, and invocation details, enabling agents to dynamically discover and use capabilities.' },

  { id: 1013, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Feedback Loop', difficulty: 'easy', keywords: ['feedback', 'RLHF', 'continuous improvement'],
    question: 'Why is integrating a feedback loop from user interactions important in production AI agents?',
    options: { A: 'It reduces the GPU memory required for inference', B: 'It enables iterative improvement of agent behavior based on real-world outcomes', C: 'It eliminates the need for testing', D: 'It automatically fixes software bugs' },
    answer: 'B', explanation: 'Feedback loops capture success/failure signals from real usage, enabling continuous refinement of prompts, tools, or fine-tuned models.' },

  { id: 1014, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Types', difficulty: 'easy', keywords: ['reactive', 'proactive', 'goal-based'],
    question: 'A goal-based agent differs from a simple reactive agent in that it:',
    options: { A: 'Uses more GPU memory', B: 'Considers future states and selects actions to achieve a specified goal', C: 'Only responds to direct user queries', D: 'Cannot use external tools' },
    answer: 'B', explanation: 'Goal-based agents maintain an internal goal state and reason about which sequence of actions achieves it, unlike reactive agents that simply map inputs to outputs.' },

  { id: 1015, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Stateless vs Stateful', difficulty: 'medium', keywords: ['stateless', 'stateful', 'session', 'memory'],
    question: 'What is the key trade-off between stateless and stateful agent designs?',
    options: { A: 'Stateless agents are more accurate; stateful agents are faster', B: 'Stateless agents are easier to scale horizontally; stateful agents maintain context across interactions', C: 'Stateless agents require more memory; stateful agents use less', D: 'There is no meaningful difference in production' },
    answer: 'B', explanation: 'Stateless agents can be horizontally scaled freely but lose context between calls. Stateful agents preserve context (better UX) but require session affinity or external state stores.' },

  { id: 1016, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Hierarchical Multi-Agent', difficulty: 'hard', keywords: ['hierarchical', 'supervisor', 'worker', 'delegation'],
    question: 'In a hierarchical multi-agent system, the supervisor agent is responsible for:',
    options: { A: 'Executing all leaf-level tasks directly', B: 'Decomposing high-level goals into subtasks and assigning them to worker agents', C: 'Storing vector embeddings for retrieval', D: 'Managing user interface rendering' },
    answer: 'B', explanation: 'Supervisor agents operate at a higher abstraction level, breaking complex goals into subtasks and coordinating worker agents, then synthesizing their outputs.' },

  { id: 1017, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Reflection Pattern', difficulty: 'medium', keywords: ['reflection', 'self-critique', 'self-improvement'],
    question: 'The reflection pattern in agentic AI allows the agent to:',
    options: { A: 'Mirror user inputs verbatim', B: 'Critique its own outputs and iteratively improve them before returning a final answer', C: 'Cache prior responses for reuse', D: 'Reduce hallucination by restricting vocabulary' },
    answer: 'B', explanation: 'Reflection-based agents generate an initial response, then critique it using an evaluator (same or separate LLM), and refine until quality criteria are met.' },

  { id: 1018, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Tool Schema', difficulty: 'medium', keywords: ['JSON schema', 'tool definition', 'OpenAI function'],
    question: 'When defining a tool for an LLM agent, which element is most critical for the model to correctly invoke the tool?',
    options: { A: 'The tool\'s implementation language', B: 'A clear natural language description and JSON schema defining parameters', C: 'The hosting server\'s IP address', D: 'The tool\'s version number' },
    answer: 'B', explanation: 'LLMs decide which tool to call and how based on the tool description and parameter schema. Poor descriptions lead to incorrect invocations.' },

  { id: 1019, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Communication', difficulty: 'hard', keywords: ['A2A', 'agent-to-agent', 'protocol', 'message passing'],
    question: 'In a multi-agent architecture, agents typically communicate through:',
    options: { A: 'Direct database writes that other agents poll', B: 'Structured message passing via shared state, queues, or standardized A2A protocols', C: 'Hardcoded function calls between agents', D: 'User-mediated copy-paste of outputs' },
    answer: 'B', explanation: 'Structured message passing (via shared state objects, message queues, or emerging A2A protocols like Google\'s Agent-to-Agent) enables loose coupling and auditability.' },

  { id: 1020, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Guardrails Architecture', difficulty: 'medium', keywords: ['guardrails', 'input validation', 'output filtering'],
    question: 'Where in the agent pipeline should guardrails be applied for maximum safety?',
    options: { A: 'Only at the input stage', B: 'Only at the output stage', C: 'At both input (intent filtering) and output (content validation) stages', D: 'Inside the LLM weights via fine-tuning only' },
    answer: 'C', explanation: 'Defense-in-depth requires guardrails at input (block harmful intents before processing) and output (filter unsafe responses before delivery) stages.' },

  { id: 1021, domain: 1, domainName: 'Agent Architecture & Design', topic: 'LLM as Backbone', difficulty: 'easy', keywords: ['LLM backbone', 'reasoning engine', 'decision making'],
    question: 'In LLM-based agent architectures, the LLM primarily serves as:',
    options: { A: 'The database storing agent memory', B: 'The reasoning engine that decides which actions to take based on observations', C: 'The execution runtime for tool calls', D: 'The networking layer for API communication' },
    answer: 'B', explanation: 'The LLM acts as the agent\'s "brain" — interpreting context, reasoning about goals, and deciding which tools to invoke and in what order.' },

  { id: 1022, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Composability', difficulty: 'medium', keywords: ['composable', 'modular', 'building blocks'],
    question: 'Why is composability important in agentic AI system design?',
    options: { A: 'It reduces the total number of parameters needed', B: 'It allows complex systems to be built from reusable, independently testable agent components', C: 'It eliminates the need for LLMs entirely', D: 'It ensures all agents use the same model' },
    answer: 'B', explanation: 'Composable agents can be combined like building blocks — a research agent + writer agent + critic agent — each independently testable and replaceable.' },

  { id: 1023, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Prompt Engineering Architecture', difficulty: 'medium', keywords: ['system prompt', 'few-shot', 'prompt template'],
    question: 'The system prompt in an agent architecture primarily serves to:',
    options: { A: 'Provide training data for the model', B: 'Define the agent\'s persona, capabilities, constraints, and behavioral guidelines', C: 'Store retrieved documents from vector search', D: 'Configure the server\'s network settings' },
    answer: 'B', explanation: 'The system prompt sets the foundational context — role, tools available, behavioral rules, output format — before any user interaction begins.' },

  { id: 1024, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agentic vs Traditional Pipeline', difficulty: 'easy', keywords: ['agentic', 'dynamic', 'traditional pipeline'],
    question: 'What distinguishes an agentic AI pipeline from a traditional ML pipeline?',
    options: { A: 'Agentic pipelines use larger models', B: 'Agentic pipelines dynamically determine their own execution steps based on intermediate results', C: 'Traditional pipelines are faster than agentic ones', D: 'Agentic pipelines cannot use GPU acceleration' },
    answer: 'B', explanation: 'Traditional ML pipelines have fixed execution graphs. Agentic pipelines are dynamic — the agent decides what to do next based on what it observes.' },

  { id: 1025, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Long-Running Tasks', difficulty: 'hard', keywords: ['long-running', 'checkpoint', 'async', 'persistence'],
    question: 'For agents handling long-running tasks (hours to days), which architectural feature is essential?',
    options: { A: 'Larger context windows only', B: 'Checkpoint and resume capabilities with persistent state storage', C: 'More powerful GPUs', D: 'Synchronous blocking execution' },
    answer: 'B', explanation: 'Long-running agents need to checkpoint state periodically so they can resume after failures, restarts, or context limits without losing progress.' },

  { id: 1026, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Planner-Executor', difficulty: 'medium', keywords: ['planner', 'executor', 'plan-and-execute'],
    question: 'In the plan-and-execute agent architecture, what are the two distinct roles?',
    options: { A: 'Trainer and Inferencer', B: 'Planner (creates step-by-step plan) and Executor (carries out each step)', C: 'Reader and Writer', D: 'Frontend and Backend' },
    answer: 'B', explanation: 'Plan-and-execute separates strategic planning (high-level reasoning) from tactical execution (tool calls), allowing each stage to use appropriately sized models.' },

  { id: 1027, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Memory Types', difficulty: 'medium', keywords: ['in-context', 'external', 'memory types'],
    question: 'Which types of memory can an AI agent use? (Choose two)',
    options: { A: 'In-context memory (current conversation window)', B: 'Biological memory stored in synaptic weights', C: 'External memory (vector databases, key-value stores)', D: 'Quantum memory registers' },
    answer: 'AC', explanation: 'Agents primarily use in-context memory (what fits in the current prompt) and external memory (vector DBs, databases) for long-term information storage and retrieval.' },

  { id: 1028, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Conditional Branching', difficulty: 'medium', keywords: ['conditional', 'branching', 'router', 'decision'],
    question: 'A router node in LangGraph is used to:',
    options: { A: 'Route network packets between servers', B: 'Direct agent execution to different nodes based on a condition or LLM decision', C: 'Load-balance user requests across replicas', D: 'Translate between different LLM APIs' },
    answer: 'B', explanation: 'Router nodes inspect the current state and return the name of the next node to visit, enabling conditional branching in the agent graph.' },

  { id: 1029, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Benchmarking', difficulty: 'medium', keywords: ['benchmark', 'evaluation', 'agent performance'],
    question: 'When benchmarking an AI agent\'s architectural design, which metric is most relevant for multi-step task completion?',
    options: { A: 'Tokens per second throughput', B: 'Task success rate across diverse benchmark scenarios', C: 'Model parameter count', D: 'API response time in isolation' },
    answer: 'B', explanation: 'Task success rate measures whether the agent actually completes end-to-end tasks correctly — the most direct measure of architectural quality for agentic systems.' },

  { id: 1030, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Single vs Multi-Agent', difficulty: 'easy', keywords: ['single agent', 'multi-agent', 'when to use'],
    question: 'When should you prefer a multi-agent architecture over a single powerful agent?',
    options: { A: 'Always — multi-agent is always better', B: 'When tasks are too complex for one agent\'s context window or benefit from parallelism and specialization', C: 'Only when the task involves images', D: 'Never — single agents are always more reliable' },
    answer: 'B', explanation: 'Multi-agent systems excel when tasks exceed single context limits, can be parallelized, or benefit from specialized subagents. Simpler tasks are better handled by a single agent to reduce complexity.' },

  { id: 1031, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Loop Termination', difficulty: 'medium', keywords: ['termination', 'stopping condition', 'max iterations'],
    question: 'What is the most important safety mechanism to add to an agent loop?',
    options: { A: 'Unlimited retry logic for all failures', B: 'Maximum iteration/step limits and explicit termination conditions', C: 'Automatic model upgrades when performance drops', D: 'Logging every token to disk' },
    answer: 'B', explanation: 'Without termination conditions, agents can loop infinitely wasting resources or causing harm. Max iteration limits and success/failure termination conditions are essential.' },

  { id: 1032, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Tool Result Handling', difficulty: 'medium', keywords: ['tool result', 'error handling', 'observation'],
    question: 'After an agent receives an error response from a tool call, the best practice is to:',
    options: { A: 'Immediately terminate the agent session', B: 'Pass the error as an observation back to the LLM for reasoning about alternative actions', C: 'Silently retry indefinitely', D: 'Return the error directly to the user without processing' },
    answer: 'B', explanation: 'The LLM should observe the error result and reason about alternative approaches — this is the "Observe" phase of ReAct, enabling adaptive behavior.' },

  { id: 1033, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Latency Optimization', difficulty: 'hard', keywords: ['latency', 'streaming', 'async', 'optimization'],
    question: 'Which combination of techniques best reduces perceived latency in an interactive agent system?',
    options: { A: 'Larger model + synchronous execution', B: 'Streaming token output + parallel tool execution where possible', C: 'Smaller context windows + caching only', D: 'Batch all requests and return together' },
    answer: 'B', explanation: 'Streaming shows users partial results immediately while parallel tool execution reduces wall-clock time for independent operations.' },

  { id: 1034, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Versioning', difficulty: 'medium', keywords: ['versioning', 'deployment', 'rollback'],
    question: 'Why is version control of agent configurations (prompts, tool schemas, model versions) important?',
    options: { A: 'It reduces GPU memory usage', B: 'It enables reproducible behavior, auditability, and safe rollback when changes cause regressions', C: 'It eliminates the need for monitoring', D: 'It automatically improves model accuracy' },
    answer: 'B', explanation: 'Agents are defined by prompts, tools, and model choices. Versioning these enables reproducible testing, A/B comparisons, and rollback when updates degrade performance.' },

  { id: 1035, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Cognitive Architecture', difficulty: 'hard', keywords: ['cognitive', 'BDI', 'belief-desire-intention'],
    question: 'The BDI (Belief-Desire-Intention) cognitive architecture maps to LLM agents in which way?',
    options: { A: 'Belief=weights, Desire=loss function, Intention=gradients', B: 'Belief=agent\'s world model/context, Desire=goal, Intention=plan of action', C: 'Belief=user input, Desire=output, Intention=model version', D: 'BDI has no relevance to LLM-based agents' },
    answer: 'B', explanation: 'In LLM agents: Beliefs = the agent\'s understanding of the current state (context/memory), Desires = the goals, Intentions = the committed plan being executed.' },

  { id: 1036, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agentic Patterns', difficulty: 'medium', keywords: ['prompt chaining', 'routing', 'parallelization', 'orchestration'],
    question: 'Which agentic workflow pattern involves breaking a large task into parallel independent subtasks and combining results?',
    options: { A: 'Prompt chaining', B: 'Routing', C: 'Parallelization', D: 'Single-shot prompting' },
    answer: 'C', explanation: 'Parallelization fans out independent subtasks to concurrent workers and fans in the aggregated results, reducing end-to-end latency for divisible workloads.' },

  { id: 1037, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agentic Patterns', difficulty: 'medium', keywords: ['evaluator-optimizer', 'self-refinement'],
    question: 'In the evaluator-optimizer agentic pattern, what are the two key roles?',
    options: { A: 'Data collector and model trainer', B: 'Generator (produces output) and Evaluator (critiques and scores quality)', C: 'Frontend and backend services', D: 'Encoder and decoder transformer blocks' },
    answer: 'B', explanation: 'The generator produces candidate outputs and the evaluator scores them against criteria, creating a feedback loop that drives iterative improvement until quality thresholds are met.' },

  { id: 1038, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Observability', difficulty: 'medium', keywords: ['tracing', 'observability', 'LangSmith', 'logging'],
    question: 'What is the primary purpose of agent tracing and observability tools like LangSmith?',
    options: { A: 'To train better LLMs from agent outputs', B: 'To provide visibility into every step of agent execution for debugging, optimization, and monitoring', C: 'To replace unit testing in agent codebases', D: 'To automatically fix agent bugs in production' },
    answer: 'B', explanation: 'Observability tools trace every LLM call, tool invocation, and state transition, making it possible to debug failures, measure latency, and detect quality issues.' },

  { id: 1039, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Security', difficulty: 'hard', keywords: ['prompt injection', 'security', 'adversarial'],
    question: 'Prompt injection attacks against AI agents attempt to:',
    options: { A: 'Increase the agent\'s token generation speed', B: 'Hijack the agent\'s behavior by embedding malicious instructions in external content it processes', C: 'Reduce the agent\'s context window size', D: 'Improve the agent\'s accuracy on benchmarks' },
    answer: 'B', explanation: 'Prompt injection embeds adversarial instructions in retrieved documents, web pages, or tool outputs that override the agent\'s intended behavior, a critical security threat.' },

  { id: 1040, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Scope', difficulty: 'easy', keywords: ['scope', 'permissions', 'least privilege'],
    question: 'The principle of least privilege applied to AI agents means:',
    options: { A: 'Using the smallest available LLM model', B: 'Granting agents only the minimal set of tools and permissions required for their specific task', C: 'Limiting agents to text-only interactions', D: 'Running agents on the fewest possible servers' },
    answer: 'B', explanation: 'Just like in security engineering, agents should have minimal permissions — only the tools and data access their task requires — reducing the blast radius of errors or attacks.' },

  { id: 1041, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Chain-of-Thought', difficulty: 'easy', keywords: ['chain-of-thought', 'reasoning', 'CoT'],
    question: 'Chain-of-Thought (CoT) prompting improves agent performance primarily by:',
    options: { A: 'Reducing the number of tokens generated', B: 'Encouraging the model to show intermediate reasoning steps before producing a final answer', C: 'Caching previous responses for reuse', D: 'Enabling the model to access the internet directly' },
    answer: 'B', explanation: 'CoT prompts the LLM to reason step-by-step, improving accuracy on complex reasoning tasks by making intermediate thinking explicit.' },

  { id: 1042, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Retry Logic', difficulty: 'easy', keywords: ['retry', 'exponential backoff', 'resilience'],
    question: 'When implementing retry logic for API failures in an agent, the recommended backoff strategy is:',
    options: { A: 'Immediate retry without delay', B: 'Exponential backoff with jitter', C: 'Fixed 5-second delay between all retries', D: 'Linear backoff starting at 60 seconds' },
    answer: 'B', explanation: 'Exponential backoff with jitter progressively increases wait times while randomizing them, preventing retry storms that could overwhelm already-stressed downstream services.' },

  { id: 1043, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Dynamic Conversation Management', difficulty: 'medium', keywords: ['dynamic conversation', 'session management', 'context'],
    question: 'A company deploying a customer support agent needs to handle diverse, dynamic inputs. Which two strategies should they implement? (Choose two)',
    options: { A: 'Integrating a feedback loop from user interactions to iteratively improve agent behavior', B: 'Using rule-based logic as the primary decision framework', C: 'Implementing retry logic for API failures to ensure robust external communications', D: 'Preferring hardcoded responses for all frequent queries' },
    answer: 'AC', explanation: 'Feedback loops enable continuous improvement while retry logic handles transient API failures — both essential for production-grade dynamic conversation agents.' },

  { id: 1044, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Context Awareness', difficulty: 'medium', keywords: ['context', 'session', 'awareness', 'stateful'],
    question: 'Context-aware agents maintain awareness of:',
    options: { A: 'Only the most recent user message', B: 'The full conversation history, user preferences, and environmental state relevant to the task', C: 'Only structured database records', D: 'System performance metrics' },
    answer: 'B', explanation: 'Context-aware agents track the full relevant context — prior exchanges, user goals, discovered information, and environmental state — to provide coherent multi-turn assistance.' },

  { id: 1045, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Ecosystem', difficulty: 'medium', keywords: ['ecosystem', 'LangChain', 'LlamaIndex', 'CrewAI'],
    question: 'Which frameworks are commonly used for building agentic AI applications? (Choose two)',
    options: { A: 'LangGraph/LangChain', B: 'Apache Hadoop', C: 'LlamaIndex', D: 'MySQL' },
    answer: 'AC', explanation: 'LangGraph/LangChain and LlamaIndex are leading frameworks for building agentic pipelines, providing tools for LLM orchestration, memory, tool use, and RAG.' },

  { id: 1046, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Design Principles', difficulty: 'easy', keywords: ['design principles', 'simplicity', 'modularity'],
    question: 'The most important principle when designing agent architectures for production is:',
    options: { A: 'Maximize the number of agent components', B: 'Start with the simplest architecture that meets requirements and add complexity only when needed', C: 'Always use the largest available LLM', D: 'Avoid using any external tools' },
    answer: 'B', explanation: 'Complexity in agent systems compounds — bugs, latency, and cost all scale with architectural complexity. Start simple, measure, then add components when there\'s clear evidence they\'re needed.' },

  { id: 1047, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Input/Output Contracts', difficulty: 'medium', keywords: ['contract', 'schema', 'validation', 'interface'],
    question: 'Defining strict input/output contracts for agent components provides which benefit?',
    options: { A: 'Guarantees the LLM will never hallucinate', B: 'Enables independent testing, versioning, and replacement of components without breaking the overall system', C: 'Reduces model inference time by 50%', D: 'Eliminates the need for system prompts' },
    answer: 'B', explanation: 'Well-defined contracts (schemas, interfaces) decouple components — you can swap a retriever, tool, or LLM without rewriting the orchestration layer.' },

  { id: 1048, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agent Specialization', difficulty: 'medium', keywords: ['specialized', 'generalist', 'domain expert'],
    question: 'When is a specialized agent preferred over a generalist agent?',
    options: { A: 'When the task is simple and well-defined', B: 'When domain-specific accuracy, terminology, and deep knowledge are critical (e.g., medical, legal, financial)', C: 'When hardware resources are extremely limited', D: 'Never — generalist agents always outperform specialists' },
    answer: 'B', explanation: 'Specialized agents (fine-tuned or highly prompted for a domain) outperform generalists in accuracy, terminology use, and regulatory compliance for domain-specific tasks.' },

  { id: 1049, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Agentic vs Chatbot', difficulty: 'easy', keywords: ['chatbot', 'agent', 'autonomy', 'action'],
    question: 'What fundamentally distinguishes an AI agent from a simple chatbot?',
    options: { A: 'Agents use larger language models', B: 'Agents can take actions in the world (execute tools, write code, browse web) to achieve goals', C: 'Chatbots have better grammar', D: 'Agents only work with structured data' },
    answer: 'B', explanation: 'Chatbots generate conversational text. Agents take actions — calling APIs, executing code, modifying files, browsing the web — to achieve goals in the real world.' },

  { id: 1050, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Emergent Agent Behavior', difficulty: 'hard', keywords: ['emergent', 'unexpected', 'complex systems'],
    question: 'Emergent behavior in multi-agent systems refers to:',
    options: { A: 'Behaviors that are explicitly programmed into each agent', B: 'Unexpected complex behaviors arising from the interactions between simpler agents following local rules', C: 'The agent\'s ability to emerge from training data', D: 'Behavior that only appears during model fine-tuning' },
    answer: 'B', explanation: 'Emergence is a hallmark of complex systems — individual agents following simple rules can produce sophisticated collective behaviors not designed into any single agent.' },
];
