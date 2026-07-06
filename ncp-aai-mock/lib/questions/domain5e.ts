import { Question } from '../types';

export const domain5eQuestions: Question[] = [
  { id: 5076, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Problem Representation', difficulty: 'medium', keywords: ['problem representation', 'state space', 'framing', 'encoding'],
    question: 'The way an agent represents a problem significantly affects planning because:',
    options: { A: 'Better graphics make problems easier to visualize', B: 'Good representations make solution paths obvious; poor representations hide solutions or make the search space exponentially larger', C: 'Problem representation only affects memory usage', D: 'LLMs automatically find the optimal representation' },
    answer: 'B', explanation: 'Problem representation: the "N-queens" problem as a 2D boolean grid makes constraint propagation obvious. As a flat array, it\'s less clear. LLMs can be prompted to "choose the most useful representation for this problem" before planning.' },

  { id: 5077, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Attention Allocation', difficulty: 'hard', keywords: ['attention allocation', 'saliency', 'relevance', 'focus'],
    question: 'Dynamic attention allocation in context-heavy agent prompts should prioritize:',
    options: { A: 'Evenly distributing attention across all context', B: 'Information most relevant to the current subtask at the head and tail of the context window, leveraging position-based attention patterns', C: 'Oldest information for temporal consistency', D: 'Longest context sections for comprehensiveness' },
    answer: 'B', explanation: '"Lost in the middle" effect: LLMs attend better to content at start and end of long contexts. Strategic placement: system prompt (start) + most relevant retrieved context (end of context, before the query) + less critical history in the middle.' },

  { id: 5078, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Memory Tagging', difficulty: 'medium', keywords: ['tagging', 'annotation', 'memory classification', 'retrieval'],
    question: 'Auto-tagging memories with importance, topic, and recency scores enables:',
    options: { A: 'Memory deduplication by comparing tags', B: 'Intelligent retrieval: weight recent high-importance memories more heavily, surface topic-relevant memories first, expire low-importance old memories', C: 'Faster storage by reducing memory size', D: 'Tags are only useful for human-browsable memory systems' },
    answer: 'B', explanation: 'Memory scoring: importance_score = f(recency, frequency_accessed, task_relevance, user_feedback) → higher-scoring memories retrieved preferentially. Low-importance + old → candidate for pruning. Multi-dimensional scoring beats simple recency or frequency alone.' },

  { id: 5079, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Plan Libraries', difficulty: 'medium', keywords: ['plan library', 'case-based', 'reuse', 'adaptation'],
    question: 'Case-Based Reasoning (CBR) for agent planning retrieves:',
    options: { A: 'Legal cases relevant to the current task', B: 'Previously successful plans for similar tasks, adapts them to current situation, executes, and stores the result for future retrieval', C: 'Cases where the agent failed for learning', D: 'Only exact matches from past plans without adaptation' },
    answer: 'B', explanation: 'CBR cycle: Retrieve (find similar past case) → Reuse (adapt old plan to new situation) → Revise (fix execution failures) → Retain (store new case). Efficient for recurring task types where starting from scratch is wasteful.' },

  { id: 5080, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Self-Model', difficulty: 'hard', keywords: ['self-model', 'capabilities', 'limitations', 'self-knowledge'],
    question: 'An agent\'s self-model (knowledge of its own capabilities and limitations) enables:',
    options: { A: 'Agents to model themselves as humans for better empathy', B: 'Appropriate task acceptance/rejection, honest uncertainty expression, and correct delegation — "I can do X but not Y, I should ask the database expert for Y"', C: 'Narcissistic agent behavior that prioritizes self-interest', D: 'Self-models are only for physical embodied robots' },
    answer: 'B', explanation: 'Agent self-model: "I don\'t have access to real-time web data (capability gap)" → proactively disclose; "I perform well on summarization but poorly on mathematical proofs" → delegate math to specialized agent; "I\'m uncertain about events after 2024" → express uncertainty.' },

  { id: 5081, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Implicit Knowledge', difficulty: 'hard', keywords: ['tacit knowledge', 'implicit', 'elicitation', 'capture'],
    question: 'Tacit/implicit knowledge (expertise hard to articulate explicitly) in AI agents is captured through:',
    options: { A: 'It is impossible to capture tacit knowledge in AI', B: 'Learning from expert demonstrations (imitation learning), observing expert decisions, and RLHF on expert-rated outputs rather than explicit rules', C: 'Asking experts to write down all their knowledge', D: 'Tacit knowledge only exists in human memory, not learnable by AI' },
    answer: 'B', explanation: 'Capturing tacit knowledge: expert code reviewer can\'t articulate all their rules → instead: observe 1000 expert code reviews → learn from demonstrations → agent internalizes the implicit patterns that experts use but can\'t fully verbalize.' },

  { id: 5082, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Goal-Directed Attention', difficulty: 'medium', keywords: ['goal', 'attention', 'selective', 'filtering'],
    question: 'Goal-directed filtering in agent perception reduces cognitive load by:',
    options: { A: 'Limiting the agent to only one goal at a time', B: 'Preprocessing raw inputs to surface only information relevant to the current active goal — ignoring irrelevant stimuli', C: 'Filtering out all negative information', D: 'Goal filters are hardcoded and not updated during task execution' },
    answer: 'B', explanation: 'Goal-directed filtering: goal = "find security vulnerabilities in this code" → parse code, surface: unvalidated inputs, hardcoded secrets, SQL strings, auth logic. Filter out: formatting, comments, unrelated logic. Reduces irrelevant context that dilutes agent attention.' },

  { id: 5083, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Memory Bandwidth', difficulty: 'hard', keywords: ['retrieval speed', 'performance', 'index', 'cache'],
    question: 'Tiered memory architecture in AI agents places frequently accessed information in:',
    options: { A: 'The same tier regardless of access frequency for simplicity', B: 'Fast in-context memory (token budget) or warm cache (Redis) — expensive memory for high-frequency items, cheaper storage for rare access patterns', C: 'The largest storage tier for maximum capacity', D: 'Memory tiering is only for operating systems, not AI agents' },
    answer: 'B', explanation: 'Tiered agent memory: hot (in prompt context): current task facts. Warm (Redis cache): recent sessions, user preferences. Cold (vector database): historical knowledge, documents. Hottest data costs most per bit but provides lowest latency retrieval.' },

  { id: 5084, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Episodic Buffer', difficulty: 'medium', keywords: ['episodic buffer', 'Baddeley', 'working memory', 'integration'],
    question: 'The episodic buffer in Baddeley\'s working memory model (applied to AI) serves as:',
    options: { A: 'A buffer for episodic memory updates', B: 'Integration point combining information from different sources (conversation history, retrieved facts, current task) into a coherent working representation', C: 'A buffer that stores recent episodes for training', D: 'Only relevant for models with explicit episodic memory modules' },
    answer: 'B', explanation: 'Episodic buffer for agents: integrates: retrieved long-term memories + current conversation context + task state + retrieved documents into a unified coherent working context for the LLM. Serves as the "integration workspace" for multi-source reasoning.' },

  { id: 5085, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Symbolic Grounding', difficulty: 'hard', keywords: ['grounding', 'symbol', 'reference', 'meaning'],
    question: 'The symbol grounding problem in AI agents refers to:',
    options: { A: 'Grounding agent outputs in verified sources', B: 'How symbols (words, concepts) acquire meaning connected to real-world referents — preventing manipulation of ungrounded symbols that lack genuine semantic content', C: 'Connecting symbolic AI systems to ground-level infrastructure', D: 'Using ground truth labels to train symbolic reasoning' },
    answer: 'B', explanation: 'Symbol grounding: does the agent\'s representation of "hot" connect to real temperature sensation? Or is it just a statistical pattern without genuine meaning? Grounded agents connect symbols to perception/action; ungrounded agents manipulate form without semantic content.' },
];
