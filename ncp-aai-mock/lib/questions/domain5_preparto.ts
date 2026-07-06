import { Question } from '../types';

export const domain5PrepartoQuestions: Question[] = [
  {
    id: 5801,
    domain: 5,
    domainName: 'Cognition, Planning & Memory',
    topic: 'Scenario: Memory Type Selection',
    question: 'Your personal assistant agent needs to: (1) remember that a specific user prefers morning meetings (persists across months), (2) track which action items were discussed in today\'s call (lost after the call), and (3) know how to format a calendar invite in the company\'s standard format (fixed procedure). Map each need to the correct memory type.',
    options: {
      A: 'All three types should use a vector database — unified storage simplifies the architecture.',
      B: '(1) Episodic memory in a persistent store (user preference history, keyed by user ID); (2) Working/procedural memory in the current context window; (3) Semantic memory about company procedures encoded in the system prompt.',
      C: '(1) Episodic memory in a persistent vector store retrieved by user ID; (2) Working memory in context window (ephemeral, cleared after call); (3) Procedural memory encoded in the system prompt or as a fixed tool definition.',
      D: '(1) Semantic memory in a knowledge base; (2) Episodic memory in a session store; (3) Working memory computed fresh each call.'
    },
    answer: 'C',
    explanation: 'The three memory types map precisely: (1) Episodic = autobiographical, personal history, persistent — user preference across months belongs in a retrievable persistent store. (2) Working memory = current context, ephemeral by design — today\'s action items are in-session and should be cleared. (3) Procedural = "how to do things," stable and never changes — encoded in system prompt or tool definition, never needs retrieval. Option B is close but incorrectly labels (2) as procedural. Option D scrambles the assignments.',
    keywords: ['episodic memory', 'working memory', 'procedural memory', 'semantic memory', 'memory types'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 5802,
    domain: 5,
    domainName: 'Cognition, Planning & Memory',
    topic: 'Scenario: Vector Store Selection',
    question: 'Your agent needs a vector store for long-term semantic memory. You have 50 million document embeddings (768-dim) and require: sub-50ms p99 query latency, metadata filtering (filter by document_type and date_range), and horizontal scalability to 500M documents in 6 months. Select TWO vector databases that satisfy these requirements.',
    options: {
      A: 'FAISS (Facebook AI Similarity Search) — in-memory index with millisecond query latency.',
      B: 'Milvus — distributed vector database with horizontal scaling, metadata filtering via scalar fields, and sub-50ms query latency at billion-scale with appropriate index types (HNSW, IVF).',
      C: 'ChromaDB — lightweight embedded vector database ideal for development and small datasets.',
      D: 'Pinecone — fully managed vector database service with metadata filtering, automatic scaling, and p99 latency SLAs for production workloads.',
      E: 'NumPy arrays with cosine similarity — custom implementation for full control over the similarity computation.'
    },
    answer: 'BD',
    explanation: '(B) Milvus is purpose-built for billion-scale: distributed architecture scales horizontally, HNSW/IVF indexes provide sub-50ms at scale, and scalar field filtering handles document_type and date_range. (D) Pinecone (managed) also satisfies all three: production p99 SLAs, metadata filtering with namespaces and filter syntax, and automatic scaling. FAISS (A) is in-memory — 50M 768-dim vectors = ~150GB RAM, not scalable to 500M. ChromaDB (C) is for development/small scale. NumPy (E) is O(N) search — unacceptable at 50M+.',
    keywords: ['Milvus', 'Pinecone', 'vector database', 'metadata filtering', 'horizontal scaling'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 5803,
    domain: 5,
    domainName: 'Cognition, Planning & Memory',
    topic: 'Scenario: Chain-of-Thought vs Tree-of-Thoughts',
    question: 'You are building an agent to solve complex mathematical proof problems where multiple approaches might be valid, and dead ends are common. The agent currently uses standard Chain-of-Thought (CoT) prompting and frequently gets stuck after choosing an unproductive approach without backtracking. What planning approach addresses this limitation?',
    options: {
      A: 'Add more detailed step-by-step instructions in the system prompt to guide the agent through proof strategies.',
      B: 'Tree of Thoughts (ToT): decompose the problem into a tree of intermediate "thought" steps, evaluate multiple branches in parallel (or with beam search), prune dead ends based on self-evaluation, and backtrack to explore alternatives.',
      C: 'Increase the temperature parameter from 0.0 to 0.7 to encourage more diverse reasoning paths.',
      D: 'Use retrieval-augmented generation to retrieve similar solved proofs and guide the current proof by analogy.'
    },
    answer: 'B',
    explanation: 'Tree of Thoughts (B) directly addresses the backtracking limitation: CoT commits to a single reasoning path without the ability to explore alternatives or backtrack. ToT maintains a tree of partial solutions, evaluates each "thought" node (is this approach promising?), and prunes dead ends — enabling the agent to abandon an unproductive proof strategy and try another. Temperature increase (C) adds randomness but not systematic exploration. RAG (D) helps with analogical reasoning but doesn\'t provide the backtracking mechanism.',
    keywords: ['Tree of Thoughts', 'Chain-of-Thought', 'backtracking', 'planning', 'beam search'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 5804,
    domain: 5,
    domainName: 'Cognition, Planning & Memory',
    topic: 'Scenario: Working Memory Limits',
    question: 'Your agent\'s task requires processing a 200-page contract (200,000 tokens) to identify all penalty clauses. Your LLM has a 128K context window. Select TWO strategies that correctly handle this document size without losing relevant information.',
    options: {
      A: 'Truncate the document to the first 128K tokens — penalty clauses in the early sections are usually more important.',
      B: 'Hierarchical chunking: split the document into sections, process each section independently for penalty clause extraction, then aggregate results across all sections in a final summarization step.',
      C: 'Map-reduce over document chunks: use an LLM to extract penalty clauses from each chunk (map), then aggregate all extracted clauses and deduplicate in a reduce step.',
      D: 'Increase the LLM\'s context window to 1M tokens by adjusting the max_tokens parameter.',
      E: 'Convert the entire document to a bullet-point summary first, then search for penalty clauses in the summary.'
    },
    answer: 'BC',
    explanation: '(B) Hierarchical chunking is the standard document processing pattern for large documents: extract information section-by-section, then synthesize. Penalty clauses are unlikely to span chunk boundaries, making per-section extraction viable. (C) Map-reduce is the programmatic formulation of the same idea: parallel extraction (map) followed by aggregation (reduce) — this scales to arbitrarily large documents. Option A (truncate) misses 60% of the document. Option D is false — max_tokens controls output length, not context window. Option E (summarize first) loses the specific clause language needed for legal accuracy.',
    keywords: ['document processing', 'map-reduce', 'chunking', 'hierarchical', 'working memory'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 5805,
    domain: 5,
    domainName: 'Cognition, Planning & Memory',
    topic: 'Scenario: MCTS Planning',
    question: 'You are building an agent for strategic game playing where the agent must plan 10-15 moves ahead. A ReAct agent makes locally optimal moves but consistently loses because it can\'t see downstream consequences. What planning paradigm addresses long-horizon planning with adversarial dynamics?',
    options: {
      A: 'Chain-of-Thought with step-by-step move analysis looking 3 moves ahead.',
      B: 'Monte Carlo Tree Search (MCTS): build a game tree by simulating random rollouts from each candidate move, use rollout outcomes to estimate the value of each move, and backpropagate results to inform the root decision — enabling principled long-horizon planning.',
      C: 'Few-shot prompting with expert game transcripts to teach the model good move patterns.',
      D: 'Ensemble of ReAct agents each making independent move decisions, then voting on the best move.'
    },
    answer: 'B',
    explanation: 'MCTS (B) is specifically designed for long-horizon planning with adversarial dynamics: (1) Exploration: UCB1 selection balances exploring new moves vs exploiting known good ones. (2) Simulation: random rollouts estimate long-horizon value without exhaustive search. (3) Backpropagation: outcomes propagate from leaf nodes back to the root. This is why AlphaGo/AlphaZero use MCTS. CoT (A) with 3-move lookahead is insufficient for 10-15 move planning. Few-shot (C) teaches patterns but not deep planning. Ensemble voting (D) doesn\'t address long-horizon reasoning.',
    keywords: ['MCTS', 'Monte Carlo Tree Search', 'planning', 'game playing', 'long-horizon'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 5806,
    domain: 5,
    domainName: 'Cognition, Planning & Memory',
    topic: 'Episodic vs Semantic Memory',
    question: 'Select TWO accurate statements that distinguish episodic memory from semantic memory in the context of agentic AI systems.',
    options: {
      A: 'Episodic memory stores specific past experiences with temporal context (e.g., "User John requested a refund on March 15 for order #4521"), while semantic memory stores general facts and concepts (e.g., "Refunds are processed within 5-7 business days").',
      B: 'Episodic memory is always more accurate than semantic memory because it stores exact events without abstraction.',
      C: 'In an agentic system, semantic memory is typically implemented as a knowledge base or vector store of domain facts retrieved by topic similarity, while episodic memory stores interaction logs retrieved by temporal ID or user context.',
      D: 'Semantic memory requires more storage than episodic memory because it stores all possible knowledge about a domain.',
      E: 'Episodic memory is only useful for conversational agents — task-execution agents do not benefit from episodic memory.'
    },
    answer: 'AC',
    explanation: '(A) The core definitional distinction: episodic = autobiographical/event-based with temporal grounding; semantic = factual/conceptual knowledge without temporal specificity. (C) Describes the practical implementation in agentic systems: semantic knowledge bases are retrieved by topic (embedding similarity), episodic logs are retrieved by user/session context (lookup by ID or temporal filter). Option B is false — episodic memories can be distorted or incomplete. Option D is not generally true. Option E is false — task agents benefit from remembering past task outcomes (episodic).',
    keywords: ['episodic memory', 'semantic memory', 'knowledge base', 'temporal context', 'memory architecture'],
    difficulty: 'medium',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 5807,
    domain: 5,
    domainName: 'Cognition, Planning & Memory',
    topic: 'Scenario: Plan-Execute-Revise',
    question: 'Your data analysis agent creates a plan at the start of each task but frequently discovers mid-execution that the data doesn\'t match the assumed structure (e.g., CSV columns are named differently than expected). The agent continues executing the original plan despite this, producing wrong results. What architectural fix addresses this?',
    options: {
      A: 'Add more data format examples to the system prompt so the agent knows more formats in advance.',
      B: 'Implement a Plan-Execute-Observe-Revise loop: after each execution step, the agent observes the actual output, checks it against expectations, and if the observation reveals a plan-breaking discrepancy, revises the remaining plan before continuing.',
      C: 'Use a pre-processing step that normalizes all CSV column names to a standard format before the agent sees the data.',
      D: 'Switch from Plan-Execute to pure ReAct so the agent decides each step without upfront planning.'
    },
    answer: 'B',
    explanation: 'Plan-Execute-Observe-Revise (B) adds the missing feedback loop: after each step, the agent explicitly checks whether observations match expectations and revises the plan if they don\'t. This is the agentic equivalent of "measure twice, cut once" extended to each step. Option A (more examples) doesn\'t give the agent the runtime ability to adapt to unexpected data. Option C (preprocessing) solves only the column naming case — doesn\'t handle the general problem of unexpected data structures. Option D (pure ReAct) abandons the efficiency of upfront planning for well-defined tasks.',
    keywords: ['Plan-Execute-Revise', 'adaptive planning', 'observation', 'replanning', 'agent loop'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 5808,
    domain: 5,
    domainName: 'Cognition, Planning & Memory',
    topic: 'Scenario: mem0 Implementation',
    question: 'You are implementing persistent memory for a customer service agent using mem0. After each conversation, you want the agent to remember customer preferences automatically. Select TWO correct implementation steps for integrating mem0 into your agent.',
    options: {
      A: 'Call mem0.add(messages, user_id=user_id) at the end of each conversation turn, passing the full message history — mem0 uses an LLM to extract and store meaningful facts.',
      B: 'Manually parse each user message with regex to extract facts before storing in mem0.',
      C: 'At the start of each new conversation turn, call mem0.search(query=user_message, user_id=user_id) to retrieve relevant past memories and inject them into the agent\'s system prompt as context.',
      D: 'Configure mem0 to automatically intercept all LLM calls and append memories without any code changes.',
      E: 'Store memories in mem0 using fixed category tags (PREFERENCE, COMPLAINT, ORDER) that you assign manually per turn.'
    },
    answer: 'AC',
    explanation: '(A) mem0.add() is the standard memory storage call: you pass the conversation messages and user_id; mem0 uses an internal LLM to extract facts worth remembering (preferences, complaints, key information) and stores them in the configured vector store. No manual parsing required. (C) mem0.search() retrieves the top-K most relevant past memories for the current query — these are injected into context so the agent has relevant history without loading the entire history. Option B (manual regex) defeats the purpose of mem0\'s automatic extraction. Option D doesn\'t reflect mem0\'s actual API. Option E (manual category tags) is optional but not required.',
    keywords: ['mem0', 'memory integration', 'add', 'search', 'persistent memory'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 5809,
    domain: 5,
    domainName: 'Cognition, Planning & Memory',
    topic: 'Vector Store Index Types',
    question: 'Select TWO accurate statements about choosing between HNSW and IVF index types in a vector database for an agent\'s long-term memory.',
    options: {
      A: 'HNSW (Hierarchical Navigable Small World) provides near-exact nearest-neighbor search with high recall (>95%) and low query latency, making it suitable for memory retrieval where recall accuracy is critical.',
      B: 'IVF (Inverted File Index) with appropriate nprobe settings trades some recall for significantly lower memory usage than HNSW, making it suitable when the memory store contains hundreds of millions of vectors and memory is constrained.',
      C: 'HNSW indexes are always preferred over IVF because they have perfect recall (100%) at any scale.',
      D: 'IVF index requires the entire vector database to be loaded into GPU memory before queries can be executed.',
      E: 'Both HNSW and IVF indexes are only compatible with cosine similarity distance metrics and cannot use Euclidean distance.'
    },
    answer: 'AB',
    explanation: '(A) HNSW is a graph-based index optimized for high-recall ANN search with excellent query latency — the default choice for production systems where recall matters (agent memory retrieval). Its drawback is higher memory usage (stores graph structure). (B) IVF quantizes vectors into cluster centroids and searches a subset of clusters — this dramatically reduces memory vs HNSW while maintaining acceptable recall with tuned nprobe. At 500M+ vectors, IVF + PQ is often the only feasible option. Option C is false — HNSW has tunable recall, not perfect recall. Option D is false — IVF works with on-disk storage. Option E is false — both support multiple distance metrics.',
    keywords: ['HNSW', 'IVF', 'vector index', 'recall', 'memory efficiency'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 5810,
    domain: 5,
    domainName: 'Cognition, Planning & Memory',
    topic: 'Scenario: Reflexion Pattern',
    question: 'Your coding agent frequently submits code that fails test cases on the first attempt. After the failure, it has no mechanism to learn from the error and tries a completely different random approach. Which cognitive architecture enables the agent to systematically improve by reflecting on its own failures?',
    options: {
      A: 'Increase the number of code generation samples (pass@k) and return the first one that passes tests.',
      B: 'Reflexion: after each failed attempt, store the failure details (error type, line number, test case that failed) in an episodic memory buffer. On subsequent attempts, the agent retrieves its failure history and explicitly reasons about what went wrong before generating a new solution.',
      C: 'Use a larger model — better base capability reduces first-attempt failure rates.',
      D: 'Add a code linter as a pre-submission check to catch syntax errors before test execution.'
    },
    answer: 'B',
    explanation: 'Reflexion (B) is a documented cognitive architecture (Shinn et al., 2023) that addresses exactly this: verbal self-reflection stored in episodic memory enables the agent to learn within a single session without gradient updates. The agent writes a natural language reflection ("I forgot to handle the null case in line 12") stored in memory, which is injected into the context for the next attempt. This creates a within-session improvement loop. pass@k (A) is a quality metric, not an architecture for improvement. Larger models (C) reduce failures but don\'t add learning capability. Linting (D) only catches syntax, not logic errors.',
    keywords: ['Reflexion', 'self-reflection', 'episodic memory', 'within-session learning', 'cognitive architecture'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 5811,
    domain: 5,
    domainName: 'Cognition, Planning & Memory',
    topic: 'Scenario: pgvector vs Dedicated Vector DB',
    question: 'Your startup is building a RAG-based agent with 2 million document embeddings. Your backend already uses PostgreSQL. A team member suggests using pgvector (PostgreSQL vector extension) instead of Milvus. Under which conditions is pgvector the CORRECT choice?',
    options: {
      A: 'Always — pgvector is faster than Milvus at any scale because it runs in the same database process as your other data.',
      B: 'When your team wants to avoid managing a separate vector database infrastructure, your query volume is moderate (<1000 queries/second), and your vector data is co-located with relational data that benefits from SQL JOINs at query time.',
      C: 'When you need billion-scale vector search with sub-10ms latency SLAs.',
      D: 'When your embeddings have more than 2000 dimensions — pgvector handles high-dimensional vectors better than Milvus.'
    },
    answer: 'B',
    explanation: 'pgvector is the right choice when: (1) Your team already operates PostgreSQL — no new infrastructure. (2) Query volume is within PostgreSQL\'s scaling range (pgvector with HNSW index handles thousands of queries/second reasonably). (3) Your use case benefits from JOIN-ing vector results with relational data (e.g., "find similar documents WHERE author IN (approved_list)"). At 2M embeddings with moderate query volume, pgvector is perfectly adequate. Option A is false — dedicated vector DBs outperform pgvector at scale. Option C describes when you need Milvus, not pgvector. Option D is false — pgvector has dimension limits and higher-dimensional performance is worse.',
    keywords: ['pgvector', 'PostgreSQL', 'Milvus', 'vector database', 'infrastructure tradeoffs'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 5812,
    domain: 5,
    domainName: 'Cognition, Planning & Memory',
    topic: 'Cognitive Load and Context Management',
    question: 'Select TWO accurate statements about managing an LLM agent\'s cognitive load (effective use of context window) for complex multi-step tasks.',
    options: {
      A: 'Placing the most important instructions (goal, constraints, output format) at the very beginning and end of the context is supported by research showing LLMs have primacy and recency effects — information in the middle of long contexts is attended to less reliably.',
      B: 'Adding more detailed context always improves agent performance — longer prompts are always better.',
      C: 'For multi-step tasks, using a structured scratchpad (explicit working memory section in the prompt) where the agent writes intermediate results reduces cognitive load by externalizing computations rather than holding them implicitly in attention.',
      D: 'The LLM\'s context window processes all tokens with equal attention regardless of position.',
      E: 'Compressing all instructions into as few tokens as possible is always the optimal strategy for complex agents.'
    },
    answer: 'AC',
    explanation: '(A) "Lost in the middle" is a documented phenomenon (Liu et al., 2023): LLMs show primacy and recency effects — instructions at the start and end of long contexts are followed more reliably than those in the middle. This informs context layout design. (C) Structured scratchpads (externalizing intermediate computations) is a proven technique: instead of holding all computation implicitly in attention, the agent writes intermediate steps explicitly, reducing the cognitive burden of maintaining implicit state. Option B is false — irrelevant context degrades performance. Option D is false — "lost in the middle" disproves this. Option E is false — clarity matters more than compression.',
    keywords: ['lost in the middle', 'primacy effect', 'scratchpad', 'cognitive load', 'context layout'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 5813,
    domain: 5,
    domainName: 'Cognition, Planning & Memory',
    topic: 'Scenario: External Tool for Memory',
    question: 'Your agent needs to perform exact keyword lookups (find all instances of "Section 4.2" in a contract), fuzzy semantic search (find clauses about "termination" even if worded as "contract dissolution"), and structured metadata queries (find clauses added after 2024-01-01). Which retrieval architecture handles all three requirements?',
    options: {
      A: 'Pure dense vector search (embedding similarity) handles all three use cases.',
      B: 'Hybrid search with three retrieval paths: BM25/TF-IDF for exact keyword lookup, dense embedding search for semantic similarity, and a relational index (SQL/metadata filter) for structured queries — combined with a re-ranker that merges and scores results from all three paths.',
      C: 'Pure sparse search (BM25) handles all three because exact matching is always more precise than fuzzy matching.',
      D: 'Store all documents in a graph database and use graph traversal for all three query types.'
    },
    answer: 'B',
    explanation: 'The hybrid approach (B) is required because each retrieval path excels at a different query type: exact keyword lookup requires BM25/TF-IDF (dense embeddings miss exact strings in long documents); semantic search requires dense embeddings (BM25 misses paraphrases); metadata queries require structured index (neither BM25 nor embeddings can filter on date fields efficiently). The re-ranker (e.g., cross-encoder) merges and scores candidates from all paths. Pure dense search (A) fails on exact keyword lookup. Pure BM25 (C) fails on semantic search. Graph DB (D) doesn\'t inherently solve embedding-based search.',
    keywords: ['hybrid search', 'BM25', 'dense search', 'metadata filtering', 're-ranking'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 5814,
    domain: 5,
    domainName: 'Cognition, Planning & Memory',
    topic: 'Planning Horizon Tradeoffs',
    question: 'Select TWO accurate statements about the tradeoffs between short-horizon reactive planning (ReAct style) and long-horizon proactive planning (Plan-and-Execute style) in agentic systems.',
    options: {
      A: 'ReAct\'s step-by-step planning is more robust to unexpected observations because it re-plans after every action, while Plan-and-Execute can fail when execution diverges significantly from the upfront plan.',
      B: 'Plan-and-Execute always produces better results than ReAct because it thinks more carefully before acting.',
      C: 'Plan-and-Execute enables parallelization of independent sub-tasks identified during planning, while ReAct\'s sequential observation-action loop cannot exploit task parallelism.',
      D: 'ReAct requires the agent to have access to a planning tool that generates multi-step plans before execution begins.',
      E: 'Long-horizon planning is only beneficial for tasks that take more than 10 minutes to complete.'
    },
    answer: 'AC',
    explanation: '(A) ReAct\'s adaptive strength: by replanning after every observation, it handles surprises gracefully. Plan-and-Execute\'s weakness: if early execution reveals the plan is based on wrong assumptions, the agent must restart planning (expensive). (C) Plan-and-Execute\'s key efficiency advantage: the planner identifies which sub-tasks are independent and can be parallelized — a ReAct loop that decides one step at a time cannot make this optimization. Option B is false — ReAct outperforms for dynamic, unpredictable environments. Option D is backwards — ReAct doesn\'t require a planner, Plan-and-Execute does. Option E\'s threshold is fabricated.',
    keywords: ['ReAct', 'Plan-and-Execute', 'adaptability', 'parallelization', 'planning tradeoffs'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 5815,
    domain: 5,
    domainName: 'Cognition, Planning & Memory',
    topic: 'Scenario: Forgetting and Memory Decay',
    question: 'Your agent\'s persistent memory store has grown to 2 million entries over 2 years. You notice that retrievals are returning stale, outdated information (e.g., old preferences that have changed) that competes with and overrides more recent, accurate information. What is the BEST memory management strategy?',
    options: {
      A: 'Delete all memories older than 6 months on a rolling basis.',
      B: 'Implement recency-weighted retrieval: at query time, apply a time-decay factor to similarity scores (e.g., multiply by e^(-λt) where t is age) so that recent memories score higher than equally-similar older ones, combined with a periodic consolidation job that merges or supersedes conflicting older memories with newer ones.',
      C: 'Increase the number of retrieved memories from top-5 to top-20 and let the LLM sort out which is most current.',
      D: 'Reset the memory store every 6 months to keep it fresh.'
    },
    answer: 'B',
    explanation: 'Recency-weighted retrieval (B) addresses both symptoms: (1) Time-decay scoring ensures recent preferences win over older ones when both are retrieved. (2) Periodic consolidation identifies conflicting memories (old preference: "prefers email" vs new: "prefers Slack") and resolves them, keeping the store clean. Option A (time-based deletion) loses valuable long-term preferences that haven\'t changed. Option C (more memories) makes the problem worse — more stale memories compete for the LLM\'s attention. Option D (reset) is destructive and loses all valid long-term memory.',
    keywords: ['memory decay', 'recency weighting', 'time-decay', 'memory consolidation', 'stale memory'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
];