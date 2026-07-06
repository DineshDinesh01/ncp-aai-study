import { Question } from '../types';

export const domain5Questions: Question[] = [
  { id: 5001, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Tree of Thoughts', difficulty: 'hard', keywords: ['Tree of Thoughts', 'ToT', 'search', 'branching'],
    question: 'Tree of Thoughts (ToT) improves on Chain-of-Thought by:',
    options: { A: 'Using tree data structures for storing prompts', B: 'Exploring multiple reasoning paths as a tree, evaluating intermediate steps, and backtracking from dead ends', C: 'Generating thoughts in the shape of a tree diagram', D: 'Reducing reasoning to binary decisions at each step' },
    answer: 'B', explanation: 'ToT treats problem solving as a search over a tree of thoughts — generating multiple paths, evaluating their promise, and using search algorithms (BFS/DFS) to find optimal solutions.' },

  { id: 5002, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Episodic vs Semantic Memory', difficulty: 'medium', keywords: ['episodic', 'semantic', 'memory', 'types'],
    question: 'In agent memory systems, episodic memory stores:',
    options: { A: 'General world knowledge and facts', B: 'Specific past experiences and events in temporal context (what happened, when)', C: 'Procedural instructions for common tasks', D: 'The agent\'s current working variables' },
    answer: 'B', explanation: 'Episodic memory captures specific past experiences ("last Tuesday, user asked about X and I responded Y"). Semantic memory stores general facts independent of specific episodes.' },

  { id: 5003, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Working Memory', difficulty: 'medium', keywords: ['working memory', 'context', 'short-term', 'window'],
    question: 'In LLM agents, working memory corresponds to:',
    options: { A: 'The training dataset used to build the model', B: 'The active context window — information currently in the prompt being processed', C: 'The agent\'s long-term knowledge base', D: 'The GPU\'s VRAM buffer' },
    answer: 'B', explanation: 'Working memory is what the agent "holds in mind" right now — the current conversation, retrieved documents, and intermediate results in the active context window.' },

  { id: 5004, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Plan-and-Execute', difficulty: 'medium', keywords: ['plan-and-execute', 'upfront planning', 'replanning'],
    question: 'A key advantage of the plan-and-execute pattern over pure ReAct is:',
    options: { A: 'It uses less GPU memory', B: 'It creates a complete plan upfront enabling more systematic execution and better handling of long-horizon tasks', C: 'It eliminates the need for tools', D: 'It always produces shorter responses' },
    answer: 'B', explanation: 'Plan-and-execute creates a full task plan before execution, improving coherence for long-horizon tasks. ReAct decides each step reactively, which can lose sight of the overall goal.' },

  { id: 5005, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Self-Reflection', difficulty: 'medium', keywords: ['self-reflection', 'Reflexion', 'verbal reinforcement'],
    question: 'The Reflexion framework improves agent performance by:',
    options: { A: 'Reflecting GPU performance metrics back to the model', B: 'Having the agent verbally reflect on failure observations and store insights in episodic memory to guide future attempts', C: 'Using reflection in Python to inspect agent objects at runtime', D: 'Reflecting user queries back to them for clarification' },
    answer: 'B', explanation: 'Reflexion uses verbal reinforcement learning — the agent observes outcomes, generates a verbal reflection on what went wrong, and stores this in memory to avoid repeating mistakes.' },

  { id: 5006, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'MCTS Planning', difficulty: 'hard', keywords: ['MCTS', 'Monte Carlo Tree Search', 'planning', 'simulation'],
    question: 'Monte Carlo Tree Search (MCTS) applied to LLM agent planning involves:',
    options: { A: 'Randomly sampling Monte Carlo methods for numerical integration', B: 'Using simulation rollouts to evaluate future states, guiding tree-based search for optimal action sequences', C: 'A Monte Carlo casino-themed agent persona', D: 'Searching a database of past tree-structured plans' },
    answer: 'B', explanation: 'MCTS builds a search tree by: selecting promising nodes, expanding with new actions, simulating to terminal states, and backpropagating rewards — enabling principled long-horizon planning.' },

  { id: 5007, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Long-term Memory', difficulty: 'medium', keywords: ['long-term memory', 'vector database', 'retrieval', 'persistence'],
    question: 'Agent long-term memory is typically implemented using:',
    options: { A: 'Increasing the LLM\'s context window to fit all historical information', B: 'External vector databases that store and retrieve relevant memories via semantic search', C: 'Fine-tuning the LLM on all past conversation data', D: 'In-memory Python dictionaries that reset on restart' },
    answer: 'B', explanation: 'External vector databases (Pinecone, Chroma, Weaviate) store embeddings of past interactions, enabling semantic retrieval of relevant memories without growing the context window.' },

  { id: 5008, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Procedural Memory', difficulty: 'medium', keywords: ['procedural', 'how-to', 'skills', 'instructions'],
    question: 'Procedural memory in an AI agent system stores:',
    options: { A: 'Logs of past user interactions', B: 'How-to knowledge — step-by-step processes, skills, and best practices the agent can follow', C: 'Personal facts about the user', D: 'The agent\'s emotional state' },
    answer: 'B', explanation: 'Procedural memory encodes skills and processes (how to debug code, how to write a report) — often implemented as retrievable tool instructions or few-shot examples.' },

  { id: 5009, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Goal Decomposition', difficulty: 'medium', keywords: ['goal decomposition', 'subgoals', 'planning', 'hierarchy'],
    question: 'Hierarchical goal decomposition in agent planning involves:',
    options: { A: 'Randomly breaking goals into pieces', B: 'Recursively decomposing high-level goals into progressively simpler subgoals until leaf-level actions are reached', C: 'Sorting goals by priority without decomposition', D: 'Delegating all goals to human operators' },
    answer: 'B', explanation: 'Hierarchical decomposition creates a goal tree where high-level objectives break into mid-level subgoals, which break into executable actions — matching how humans plan complex tasks.' },

  { id: 5010, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Memory Retrieval', difficulty: 'medium', keywords: ['memory retrieval', 'similarity search', 'recency', 'importance'],
    question: 'Generative Agents (Park et al.) retrieve memories based on which combination of factors?',
    options: { A: 'Random selection from all stored memories', B: 'Recency, importance, and relevance — weighted combination to surface the most contextually appropriate memories', C: 'Alphabetical ordering of memory content', D: 'Memory creation time only' },
    answer: 'B', explanation: 'The Generative Agents paper weights recency (how recently accessed), importance (how significant when stored), and relevance (similarity to current context) in memory retrieval.' },

  { id: 5011, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Chain-of-Thought Variants', difficulty: 'medium', keywords: ['zero-shot CoT', 'self-consistency', 'CoT variants'],
    question: 'Self-consistency in Chain-of-Thought prompting improves accuracy by:',
    options: { A: 'Using the same prompt every time without variation', B: 'Generating multiple reasoning chains with diverse paths and taking the majority vote answer', C: 'Ensuring the model never changes its mind', D: 'Using consistent formatting in all responses' },
    answer: 'B', explanation: 'Self-consistency samples N reasoning chains, then marginalizes over the reasoning paths by taking the most common final answer — effective for math and reasoning tasks.' },

  { id: 5012, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Cognitive Load', difficulty: 'medium', keywords: ['cognitive load', 'context compression', 'attention'],
    question: 'Context compression techniques in agent systems reduce cognitive load by:',
    options: { A: 'Making the AI think faster', B: 'Distilling large context windows into compact, information-dense representations the LLM can reason over efficiently', C: 'Compressing GPU computation graphs', D: 'Reducing the agent\'s vocabulary size' },
    answer: 'B', explanation: 'Techniques like LLMLingua (prompt compression) and summary-based context management preserve essential information in fewer tokens, staying within context limits while reducing distraction.' },

  { id: 5013, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Attention Mechanisms', difficulty: 'hard', keywords: ['attention', 'transformer', 'self-attention', 'KV cache'],
    question: 'The transformer\'s self-attention mechanism enables agents to:',
    options: { A: 'Attend to all positions in the input simultaneously, weighting relevance to build contextual representations', B: 'Process tokens strictly left-to-right', C: 'Cache attention scores permanently', D: 'Skip irrelevant input positions entirely' },
    answer: 'A', explanation: 'Self-attention computes pairwise attention weights across all positions, allowing the model to dynamically focus on relevant context regardless of position — the key to long-range reasoning.' },

  { id: 5014, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Scratchpad', difficulty: 'easy', keywords: ['scratchpad', 'scratch', 'intermediate', 'thinking'],
    question: 'A scratchpad in agent architectures serves as:',
    options: { A: 'Temporary GPU buffer for model weights', B: 'A space for the agent to write intermediate thoughts, calculations, and plans before producing a final answer', C: 'A log of past user interactions', D: 'A testing environment for new tools' },
    answer: 'B', explanation: 'Scratchpads let agents "show their work" — intermediate reasoning that helps them (and observers) track progress through complex multi-step problems.' },

  { id: 5015, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Retrieval-Augmented Generation', difficulty: 'easy', keywords: ['RAG', 'retrieval', 'augmented', 'generation'],
    question: 'RAG improves LLM responses by:',
    options: { A: 'Retraining the model on the query at inference time', B: 'Retrieving relevant external documents and augmenting the prompt with this context before generation', C: 'Using regex to augment text outputs', D: 'Randomly augmenting training data' },
    answer: 'B', explanation: 'RAG grounds LLM responses in retrieved evidence, reducing hallucination and keeping knowledge current without expensive retraining.' },

  { id: 5016, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Agent Reasoning Patterns', difficulty: 'medium', keywords: ['deductive', 'inductive', 'abductive', 'reasoning'],
    question: 'Abductive reasoning in AI agents involves:',
    options: { A: 'Removing (abducting) irrelevant information from context', B: 'Inferring the most plausible explanation for observed evidence', C: 'Reasoning from general principles to specific conclusions', D: 'Reasoning from specific examples to general rules' },
    answer: 'B', explanation: 'Abductive reasoning infers the best explanation (hypothesis) for observations — "given these symptoms, the most likely diagnosis is..." — used in diagnostic and scientific reasoning agents.' },

  { id: 5017, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Memory Consolidation', difficulty: 'hard', keywords: ['consolidation', 'summarization', 'distillation', 'long-term'],
    question: 'Memory consolidation in agent systems (analogous to human sleep consolidation) involves:',
    options: { A: 'Compressing all memories into a single vector', B: 'Periodically processing and summarizing raw interaction logs into compact, structured knowledge representations', C: 'Deleting memories older than 24 hours', D: 'Consolidating multiple agents into one' },
    answer: 'B', explanation: 'Like human sleep-based consolidation, agent memory consolidation extracts key insights from raw experience logs, structures them into retrievable knowledge, and prunes redundancy.' },

  { id: 5018, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Task Planning Quality', difficulty: 'medium', keywords: ['planning quality', 'feasibility', 'ordering', 'dependencies'],
    question: 'A high-quality agent plan should ensure:',
    options: { A: 'Maximum number of steps for thoroughness', B: 'Correct dependency ordering, feasibility of each step, and coverage of the full goal', C: 'Minimum time to generate the plan', D: 'That each step can be completed in under 1 second' },
    answer: 'B', explanation: 'Good plans have correct step ordering (dependencies respected), feasible steps (the agent can actually do each one), and completeness (all goal requirements addressed).' },

  { id: 5019, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Inner Monologue', difficulty: 'medium', keywords: ['inner monologue', 'chain of thought', 'reasoning trace', 'CoT'],
    question: 'The "inner monologue" technique for AI agents:',
    options: { A: 'Enables agents to speak their thoughts aloud to users', B: 'Uses a hidden reasoning trace in the model context that guides decisions without being shown to the user', C: 'Records the agent\'s internal dialogue to a log file', D: 'Requires the agent to narrate every action' },
    answer: 'B', explanation: 'Inner monologue gives agents a private "thinking space" in the context window to reason step-by-step before producing user-visible output, improving decision quality.' },

  { id: 5020, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Attention Span', difficulty: 'medium', keywords: ['long context', 'lost in middle', 'attention', 'position bias'],
    question: 'The "lost in the middle" problem in LLMs means:',
    options: { A: 'Models struggle with middle sections of training datasets', B: 'Models underutilize information placed in the middle of long contexts compared to beginning/end', C: 'Models lose configuration settings stored in the middle of config files', D: 'Models fail on medium-difficulty questions' },
    answer: 'B', explanation: 'Research shows LLMs recall information better from context beginning and end than middle. This affects RAG design — critical information placement in prompts matters.' },
];
