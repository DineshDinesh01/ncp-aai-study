import { Question } from '../types';

export const domain5dQuestions: Question[] = [
  { id: 5061, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Procedural Knowledge', difficulty: 'medium', keywords: ['procedural', 'how-to', 'skill', 'execution'],
    question: 'Procedural memory in AI agents stores:',
    options: { A: 'Legal procedures and compliance requirements', B: '"How-to" knowledge — sequences of actions for accomplishing tasks — analogous to muscle memory in humans', C: 'Database stored procedures for data access', D: 'Agent execution procedures for deployment' },
    answer: 'B', explanation: 'Procedural memory: "how to search the web" (call search API, extract results, format), "how to write a function" (define signature, implement body, add tests). Skills vs facts — knowing how to do something vs knowing that something is true.' },

  { id: 5062, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Abstract Planning', difficulty: 'hard', keywords: ['abstraction', 'hierarchical planning', 'STRIPS', 'abstract'],
    question: 'Hierarchical Task Networks (HTN) plan by:',
    options: { A: 'Building task hierarchies for team management', B: 'Decomposing abstract tasks into subtasks recursively until primitive executable actions are reached — enabling planning at multiple abstraction levels', C: 'Organizing tasks in a corporate hierarchy structure', D: 'Using neural networks in a hierarchical architecture' },
    answer: 'B', explanation: 'HTN planning: "write report" → {research, outline, write_sections, review} → each decomposed further until primitive actions. Enables human-like planning that works at abstract level first, only detailing when necessary.' },

  { id: 5063, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Context Switching', difficulty: 'medium', keywords: ['context switching', 'multitask', 'attention', 'focus'],
    question: 'Context switching costs in AI agents occur when:',
    options: { A: 'Agents switch between CPU and GPU computation', B: 'Agents must load different task contexts (tools, instructions, history) when switching between concurrent user tasks, consuming time and tokens', C: 'Operating systems switch processes', D: 'Context switches only occur in multi-threaded systems' },
    answer: 'B', explanation: 'Agent context switching: completing task A (accounting) → switching to task B (marketing research) requires loading completely different tools, system prompts, conversation history, and knowledge. Design for minimal context switch overhead in multi-task systems.' },

  { id: 5064, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Planning Representation', difficulty: 'hard', keywords: ['PDDL', 'planning domain', 'representation', 'classical AI'],
    question: 'PDDL (Planning Domain Definition Language) representations for agents:',
    options: { A: 'Is a Python library for planning', B: 'Formally specify planning problems (objects, predicates, actions with preconditions/effects) enabling classical planners to generate provably correct plans', C: 'Define Python packages for download', D: 'PDDL is obsolete — LLMs have replaced formal planning' },
    answer: 'B', explanation: 'PDDL: formal planning specification — actions have typed parameters, preconditions (what must be true), effects (what becomes true/false). Classical planners (FastDownward, LAPKT) generate optimal/complete plans that LLM planning can\'t guarantee.' },

  { id: 5065, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Goal Prioritization', difficulty: 'medium', keywords: ['goal priority', 'conflict resolution', 'utility', 'tradeoff'],
    question: 'When an agent has conflicting goals (be helpful AND be safe), resolution is typically by:',
    options: { A: 'Random selection between conflicting goals', B: 'Priority ordering — safety > ethics > helpfulness — with higher-priority goals overriding lower-priority ones when they conflict', C: 'Maximizing a combined utility function of all goals', D: 'Asking the user to resolve all goal conflicts manually' },
    answer: 'B', explanation: 'Goal priority hierarchy (Anthropic\'s approach): broadly safe > broadly ethical > adherent to principles > helpful. When helpfulness conflicts with safety, safety wins. This prevents agents from being tricked into unsafe behavior "to help the user."' },

  { id: 5066, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Cognitive Architectures', difficulty: 'hard', keywords: ['ACT-R', 'production rules', 'declarative', 'procedural module'],
    question: 'The ACT-R cognitive architecture separates:',
    options: { A: 'Active tasks from completed tasks in agent memory', B: 'Declarative memory (facts) from procedural memory (skills/rules) as distinct modules, with production rules controlling access and use of memories', C: 'Active reasoning from retrieval tasks', D: 'ACT-R only applies to human cognition research, not AI' },
    answer: 'B', explanation: 'ACT-R: declarative module (semantic memory as chunks) + procedural module (production rules "IF goal IS X AND memory Y active THEN action Z"). Influences modern agent design: separate knowledge storage from action selection.' },

  { id: 5067, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Spatial Memory', difficulty: 'medium', keywords: ['cognitive map', 'spatial', 'navigation', 'map'],
    question: 'Cognitive maps in AI agent systems enable:',
    options: { A: 'Map visualization in agent user interfaces', B: 'Structured spatial representations of environments enabling navigation, object localization, and relationship reasoning without re-exploring', C: 'Cognitive science research applications only', D: 'Mapping the cognitive processes of human users' },
    answer: 'B', explanation: 'Cognitive maps: structured representation of spatial relationships (room layouts, document structures, workflow diagrams). Agent builds map incrementally, can navigate without re-discovery. Critical for embodied agents and document-navigation tasks.' },

  { id: 5068, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Memory Retrieval Failures', difficulty: 'medium', keywords: ['retrieval failure', 'missing context', 'false memory', 'hallucination'],
    question: 'False memory in AI agents (confidently recalling inaccurate information) is mitigated by:',
    options: { A: 'Increasing the agent\'s memory capacity', B: 'Grounding recall in retrieved source documents (with citations) rather than relying solely on generative model knowledge', C: 'False memory only occurs in small models', D: 'Confidence scores prevent false memories automatically' },
    answer: 'B', explanation: 'False memory mitigation: when recalling facts, retrieve from external knowledge base rather than generating from model weights. "According to [document X, retrieved]: ..." provides verifiable grounding vs potentially hallucinated recall.' },

  { id: 5069, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Lookahead in Planning', difficulty: 'hard', keywords: ['lookahead', 'simulation', 'tree search', 'MCTS'],
    question: 'Monte Carlo Tree Search (MCTS) applied to agent planning enables:',
    options: { A: 'Random search through action space using Monte Carlo sampling', B: 'Systematic exploration of possible action sequences with rollouts estimating future outcomes — balancing exploration of new paths with exploitation of promising ones', C: 'Casino-style random action selection for exploration', D: 'MCTS only applies to game-playing AI, not language agents' },
    answer: 'B', explanation: 'MCTS for planning: expand tree of possible actions → rollout simulations of promising branches → backpropagate estimated outcome values → select highest-value action. Used in AlphaGo and increasingly for LLM reasoning (reasoning trees).' },

  { id: 5070, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Attention to Detail', difficulty: 'medium', keywords: ['precision', 'detail', 'accuracy', 'specification'],
    question: 'Specification precision in agent task instructions affects:',
    options: { A: 'Only the response length', B: 'Ambiguous instructions produce variable outputs; precise specifications with examples and constraints produce reliable, reproducible agent behavior', C: 'Precision is only important for code generation tasks', D: 'LLMs interpret all levels of specificity equally' },
    answer: 'B', explanation: '"Write a summary" → variable length, format, depth. "Write a 3-bullet executive summary in <100 words, focusing on business impact, using formal language" → reproducible, constrained output. Specification precision correlates with output reliability.' },

  { id: 5071, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Collaborative Planning', difficulty: 'medium', keywords: ['collaborative', 'human-agent', 'joint planning', 'co-planning'],
    question: 'Human-agent collaborative planning works best when:',
    options: { A: 'The agent does all planning and the human only approves', B: 'The agent handles rapid enumeration and evaluation of options while the human provides domain values, constraints, and final judgment on tradeoffs', C: 'The human does all planning and the agent only executes', D: 'Collaborative planning is slower than either alone and should be avoided' },
    answer: 'B', explanation: 'Human-agent planning collaboration: agent generates options (fast, comprehensive), human applies value judgments and domain constraints (authoritative). Agent: "Here are 5 approaches with tradeoffs." Human: "We need to avoid vendor lock-in, so option 2." Agent refines.' },

  { id: 5072, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Memory Consolidation', difficulty: 'hard', keywords: ['consolidation', 'summarization', 'compression', 'insight extraction'],
    question: 'Memory consolidation in AI agents (similar to sleep consolidation in humans) involves:',
    options: { A: 'Deleting unused memories to free storage', B: 'Periodically processing episodic memories to extract general principles, update semantic knowledge, and create compressed summaries', C: 'Consolidating multiple agents into one', D: 'Memory consolidation is only relevant for continual learning' },
    answer: 'B', explanation: 'Memory consolidation: periodic background process reviews episodic logs → extracts patterns ("users often ask about X after Y") → updates semantic knowledge → creates compressed summaries replacing verbose episodes. Simulates human memory integration during rest.' },

  { id: 5073, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Constraint Satisfaction', difficulty: 'hard', keywords: ['constraint satisfaction', 'CSP', 'backtracking', 'propagation'],
    question: 'Constraint satisfaction problems (CSP) in agent planning involve:',
    options: { A: 'Satisfying user constraints on response format', B: 'Finding assignments to variables that satisfy all constraints simultaneously — scheduling meetings where all participants are available at the same time', C: 'Customer satisfaction planning for products', D: 'Constraint satisfaction is only for operations research, not AI agents' },
    answer: 'B', explanation: 'CSP planning: variables (meeting times), domains (available slots), constraints (participant availability, room capacity, minimum duration). Backtracking + constraint propagation solves efficiently. Agents use CSP for scheduling, resource allocation, and combinatorial optimization tasks.' },

  { id: 5074, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Execution Monitoring', difficulty: 'medium', keywords: ['execution monitoring', 'progress', 'deviation', 'corrective'],
    question: 'Execution monitoring in agent systems tracks:',
    options: { A: 'CPU and memory usage during agent execution', B: 'Whether execution is proceeding as planned — detecting deviations from expected state and triggering replanning or recovery actions', C: 'Employee monitoring of agent developers', D: 'Code execution monitoring for security purposes' },
    answer: 'B', explanation: 'Execution monitoring: after each action, check: did the action produce expected results? Is current state consistent with plan? If anomaly detected → diagnose (plan failure? Environmental change?) → adapt (replan, repair, or escalate). Closes the plan-execute-monitor loop.' },

  { id: 5075, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Information Foraging', difficulty: 'medium', keywords: ['information foraging', 'scent', 'search strategy', 'exploration'],
    question: 'Information foraging theory applied to AI agents suggests agents should:',
    options: { A: 'Search exhaustively through all available information sources', B: 'Follow "information scent" — signals indicating which direction is likely to yield relevant information — switching sources when scent drops', C: 'Store all found information regardless of relevance', D: 'Information foraging only applies to web browsing agents' },
    answer: 'B', explanation: 'Information foraging for agents: start search, estimate relevance signals (title match, source quality) → follow promising leads → if information density drops ("scent is weak") → abandon current path → try different approach. Efficient vs exhaustive search.' },
];
