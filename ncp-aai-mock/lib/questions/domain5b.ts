import { Question } from '../types';

export const domain5bQuestions: Question[] = [
  { id: 5021, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Attention Patterns', difficulty: 'hard', keywords: ['sparse attention', 'local attention', 'global tokens', 'BigBird'],
    question: 'Sparse attention patterns (e.g., BigBird, Longformer) enable longer context by:',
    options: { A: 'Reducing the number of attention heads', B: 'Attending to only a subset of positions (local windows + global tokens) reducing O(N²) to O(N) complexity', C: 'Storing attention patterns in sparse matrices on disk', D: 'Reducing the embedding dimension' },
    answer: 'B', explanation: 'Sparse attention replaces full N×N attention with: local windows (each token attends to k neighbors) + global tokens (attend to all). O(N) vs O(N²), enabling 4K-16K+ context on standard hardware.' },

  { id: 5022, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Memory-Augmented Agents', difficulty: 'medium', keywords: ['external memory', 'neural Turing', 'memory network', 'differentiable'],
    question: 'Memory-augmented neural networks improve agent capabilities by:',
    options: { A: 'Adding more RAM to the server running the agent', B: 'Providing explicit external memory that the model can read from and write to, decoupled from model parameters', C: 'Augmenting the model with memory-efficient training', D: 'Storing memories in the model\'s attention weights' },
    answer: 'B', explanation: 'External memory (Neural Turing Machines, Memformer) separates storage from computation — the model can read/write arbitrary information without being limited by what\'s encoded in parameters.' },

  { id: 5023, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Temporal Reasoning', difficulty: 'medium', keywords: ['temporal', 'time', 'sequence', 'ordering'],
    question: 'An agent that needs to reason about event sequences and temporal relationships should use:',
    options: { A: 'Random sampling of past events without time consideration', B: 'Structured representations preserving event timestamps and ordering for temporal reasoning', C: 'Ignoring time metadata as irrelevant', D: 'A separate time-series forecasting model' },
    answer: 'B', explanation: 'Temporal reasoning requires structured event representations with timestamps. Agents can then reason about "what happened before X?", durations, recency, and cause-effect temporal relationships.' },

  { id: 5024, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Goal-Oriented Planning', difficulty: 'medium', keywords: ['goal', 'subgoal', 'backward chaining', 'forward chaining'],
    question: 'Backward chaining in agent planning works by:',
    options: { A: 'Starting from the current state and working toward the goal', B: 'Starting from the goal state and working backward to identify what must be true before each step', C: 'Learning from past failures by chaining backward through error history', D: 'Reversing the order of all planned actions' },
    answer: 'B', explanation: 'Backward chaining (goal-driven): start with goal → "what must be true for this to hold?" → identify preconditions → recursively solve until initial state reached. Efficient when goal is clear.' },

  { id: 5025, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Cognitive Biases', difficulty: 'hard', keywords: ['anchoring', 'confirmation bias', 'LLM biases', 'sycophancy'],
    question: 'Sycophancy in LLM agents refers to:',
    options: { A: 'Agents that agree with other agents to form consensus', B: 'Models that adjust their answers to match perceived user preferences, agreeing with incorrect premises to be agreeable', C: 'Agents that synchronize their clocks for coordination', D: 'Automatic synchronization of agent states' },
    answer: 'B', explanation: 'Sycophancy causes models to change correct answers when users push back, agree with false premises, and tailor responses to be pleasing rather than accurate — a safety and reliability issue.' },

  { id: 5026, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Causal Reasoning', difficulty: 'hard', keywords: ['causal', 'counterfactual', 'reasoning', 'correlation'],
    question: 'The fundamental challenge for LLMs in causal reasoning is:',
    options: { A: 'LLMs are too slow to reason causally', B: 'LLMs trained on correlational data struggle to distinguish causation from correlation and reason about counterfactuals', C: 'Causal reasoning requires specialized hardware', D: 'LLMs cannot learn any causal relationships' },
    answer: 'B', explanation: 'LLMs see statistical correlations in training data. True causal reasoning requires understanding interventions and counterfactuals ("if X were different, would Y change?") — which correlational training doesn\'t directly provide.' },

  { id: 5027, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Semantic Memory Implementation', difficulty: 'medium', keywords: ['fact storage', 'knowledge base', 'triple store', 'semantic'],
    question: 'Semantic memory for AI agents can be implemented as:',
    options: { A: 'A vector database of random embeddings', B: 'A knowledge graph with (entity, relation, entity) triples or a vector store of factual text chunks for semantic retrieval', C: 'A relational database of user interactions', D: 'A file system hierarchy of text documents' },
    answer: 'B', explanation: 'Semantic memory stores world knowledge: knowledge graphs provide structured, queryable facts; vector stores enable semantic retrieval of factual text. Both support "what do I know about X?" queries.' },

  { id: 5028, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Analogical Reasoning', difficulty: 'medium', keywords: ['analogy', 'transfer', 'similarity', 'reasoning'],
    question: 'Analogical reasoning in AI agents enables:',
    options: { A: 'Analog signal processing for sensor data', B: 'Solving new problems by mapping their structure to similar solved problems and transferring solution patterns', C: 'Maintaining analog backup systems for digital failure', D: 'Reducing response length by using analogies instead of full explanations' },
    answer: 'B', explanation: 'Analogical reasoning: "this new database optimization problem is analogous to the caching problem I solved before" — transfer known solution patterns to structurally similar new challenges.' },

  { id: 5029, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Working Memory Strategies', difficulty: 'medium', keywords: ['scratch pad', 'chain of thought', 'working memory', 'explicit'],
    question: 'Externalizing reasoning to a scratchpad (vs. implicit in-weights reasoning) improves agent accuracy by:',
    options: { A: 'Offloading computation to external GPUs', B: 'Making intermediate steps explicit and verifiable — the model can reason step-by-step without relying on implicit pattern matching', C: 'Reducing the size of the context window needed', D: 'Improving GPU memory efficiency' },
    answer: 'B', explanation: 'Explicit scratchpad reasoning transforms multi-step problems into sequential single-step operations. Each step is verified before proceeding, catching errors before they compound.' },

  { id: 5030, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Plan Validation', difficulty: 'medium', keywords: ['plan validation', 'feasibility', 'constraint', 'checking'],
    question: 'Before executing a generated plan, an agent should validate:',
    options: { A: 'That the plan has at least 5 steps', B: 'Feasibility (each step is actionable), constraint satisfaction (meets all requirements), and logical consistency', C: 'That all steps complete in under 1 second', D: 'That the plan doesn\'t use more than 3 tools' },
    answer: 'B', explanation: 'Plan validation catches fatal flaws before costly execution: infeasible steps (agent lacks required tools), violated constraints (violates user requirements), logical gaps (step B requires output A but A comes after B).' },

  { id: 5031, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Hierarchical Memory', difficulty: 'hard', keywords: ['hierarchical memory', 'levels', 'working', 'episodic', 'semantic'],
    question: 'A three-level hierarchical memory for agents organizes as:',
    options: { A: 'Input layer, hidden layer, output layer', B: 'Working memory (active context) → Episodic memory (past episodes) → Semantic memory (general knowledge)', C: 'L1, L2, L3 CPU cache hierarchy', D: 'Short, medium, and long documents' },
    answer: 'B', explanation: 'Three-tier agent memory: Working (current prompt context, immediate task), Episodic (searchable past interactions), Semantic (factual knowledge base) — mirroring cognitive science models.' },

  { id: 5032, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Reasoning Chains', difficulty: 'medium', keywords: ['reasoning', 'chain', 'verify', 'intermediate'],
    question: 'Process reward models (PRMs) improve agent reasoning by:',
    options: { A: 'Rewarding agents for the final process they describe to users', B: 'Scoring intermediate reasoning steps (not just the final answer), guiding the agent toward better reasoning chains', C: 'Processing multiple requests in reward order', D: 'Using reward functions for process scheduling' },
    answer: 'B', explanation: 'PRMs provide step-level rewards during reasoning — "this intermediate step is correct/incorrect" — enabling training that improves the reasoning process itself, not just final answer correctness.' },

  { id: 5033, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Metacognition', difficulty: 'hard', keywords: ['metacognition', 'self-awareness', 'uncertainty', 'calibration'],
    question: 'Metacognitive capabilities in AI agents refer to:',
    options: { A: 'Agents that discuss topics beyond their training domain', B: 'The ability to reason about one\'s own reasoning — knowing what you know/don\'t know and monitoring reasoning quality', C: 'Agents that can explain their neural architecture', D: 'Meta-level processing beyond normal cognition' },
    answer: 'B', explanation: 'Metacognition: "I don\'t have sufficient information to answer this", "My reasoning in step 2 was likely flawed", "This requires verification". Enables appropriate uncertainty expression and self-correction.' },

  { id: 5034, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Symbolic-Neural Integration', difficulty: 'hard', keywords: ['neurosymbolic', 'symbolic', 'neural', 'hybrid reasoning'],
    question: 'Neurosymbolic AI approaches for agents combine:',
    options: { A: 'Neurological brain signals with symbolic computation', B: 'Neural networks (flexible, pattern-based) with symbolic reasoning (explicit, rule-based) for complementary strengths', C: 'Neural hardware with software symbolic systems', D: 'Neurons in the model with symbolic variable names' },
    answer: 'B', explanation: 'Neurosymbolic hybrids use neural networks for perception/language understanding while applying symbolic reasoning (logic, planning, constraint satisfaction) for tasks requiring formal reasoning guarantees.' },

  { id: 5035, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Memory Decay', difficulty: 'medium', keywords: ['memory decay', 'forgetting curve', 'relevance', 'pruning'],
    question: 'Memory decay policies for long-running agents should favor:',
    options: { A: 'Delete all memories older than 24 hours', B: 'Decay memories based on recency AND relevance — preserve highly relevant old memories, decay irrelevant recent ones', C: 'Never delete any memories regardless of age', D: 'Delete memories in FIFO order as storage fills up' },
    answer: 'B', explanation: 'Simple FIFO or age-based decay loses valuable persistent facts. Smart decay models relevance (how useful has this been?) × recency — preserving important long-term context while clearing irrelevant details.' },

  { id: 5036, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Planning Under Uncertainty', difficulty: 'hard', keywords: ['uncertainty', 'POMDP', 'contingency', 'probabilistic'],
    question: 'Contingency planning in AI agents addresses:',
    options: { A: 'Planning for military contingencies', B: 'Preparing alternative action sequences for cases where the primary plan fails or unexpected situations arise', C: 'Planning that is contingent on user approval', D: 'Emergency shutdown procedures' },
    answer: 'B', explanation: 'Contingency planning builds alternatives into the plan: "if tool X fails → try tool Y; if budget exceeded → simplify approach; if step 3 errors → escalate to human" — enabling resilient execution.' },

  { id: 5037, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Context Compression', difficulty: 'medium', keywords: ['compression', 'summarization', 'distillation', 'context'],
    question: 'Rolling context compression in agents works by:',
    options: { A: 'Compressing GPU context for better performance', B: 'Periodically summarizing older conversation/task history into a compact representation, keeping recent events verbatim', C: 'Using compressed file formats for context storage', D: 'Removing all context when it exceeds half the window' },
    answer: 'B', explanation: 'Rolling compression: when context fills up, summarize the oldest N messages into a brief summary, discard originals, keep the summary + recent messages. Balances completeness with token budget.' },

  { id: 5038, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Attention Mechanisms in Planning', difficulty: 'hard', keywords: ['cross-attention', 'planning', 'goal conditioning'],
    question: 'In goal-conditioned planning, the agent uses goal embeddings to:',
    options: { A: 'Embed the goal in its persona description', B: 'Steer attention toward goal-relevant context, ensuring planning steps align with the specified objective', C: 'Embed goal images for multimodal reasoning', D: 'Create database embeddings of historical goals' },
    answer: 'B', explanation: 'Goal-conditioned models use goal embeddings as queries in cross-attention, causing the model to attend to goal-relevant context and generate plans aligned with the target state.' },

  { id: 5039, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Action Selection', difficulty: 'medium', keywords: ['action selection', 'exploration', 'exploitation', 'policy'],
    question: 'The exploration-exploitation tradeoff in agent action selection refers to:',
    options: { A: 'Balancing code exploration (reading docs) vs exploitation (writing code)', B: 'Choosing between known effective actions (exploit) and trying potentially better but unknown actions (explore)', C: 'Exploration of the internet vs exploitation of local data', D: 'Exploiting fast tools vs exploring thorough tools' },
    answer: 'B', explanation: 'Classic RL tradeoff: exploit = use the currently best-known action (reliable); explore = try a different action that might be better (risky but potentially higher reward). Agents need both to improve over time.' },

  { id: 5040, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Planning Efficiency', difficulty: 'medium', keywords: ['planning efficiency', 'token budget', 'planning depth', 'tradeoff'],
    question: 'Extended thinking/planning in AI agents (spending more tokens on reasoning before acting) is beneficial when:',
    options: { A: 'Always — more thinking always helps', B: 'For genuinely complex tasks that benefit from careful reasoning; simple tasks don\'t justify the added latency and cost', C: 'For all tasks regardless of complexity to ensure thoroughness', D: 'Never — fast responses always beat slow deliberation' },
    answer: 'B', explanation: 'Extended thinking (Claude\'s thinking tokens, o1-style reasoning) dramatically improves performance on complex tasks (math proofs, multi-step code bugs) but adds latency and cost that\'s wasted on simple factual queries.' },
];
