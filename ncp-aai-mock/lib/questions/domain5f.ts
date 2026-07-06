import { Question } from '../types';

export const domain5fQuestions: Question[] = [
  { id: 5086, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Action Primitives', difficulty: 'medium', keywords: ['action space', 'primitive', 'composition', 'tool'],
    question: 'Defining a minimal but complete action primitive set for agents involves:',
    options: { A: 'Giving agents the maximum number of tools possible', B: 'Identifying atomic actions that cannot be decomposed further but can be composed to achieve any desired outcome — balancing expressiveness with simplicity', C: 'Action primitives are always defined by the underlying framework', D: 'More action primitives always leads to better agent performance' },
    answer: 'B', explanation: 'Action primitive design: search(query), read(url), write(file, content), execute(code), send_message(to, content). These compose into complex behaviors. Too few primitives: agents can\'t achieve tasks. Too many (100+ tools): agents spend planning budget selecting tools.' },

  { id: 5087, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Temporal Abstraction', difficulty: 'hard', keywords: ['temporal abstraction', 'options framework', 'subgoal', 'hierarchical RL'],
    question: 'The options framework in hierarchical reinforcement learning enables:',
    options: { A: 'Providing configuration options for RL hyperparameters', B: 'Temporal abstraction: defining multi-step "options" (subgoal behaviors) that can be executed as single high-level actions, enabling long-horizon planning', C: 'Options are only for continuous action spaces', D: 'The options framework is deprecated in favor of LLM planning' },
    answer: 'B', explanation: 'Options framework: option = (initiation_set, policy, termination_condition). "navigate_to_kitchen" option: initiates from any room, follows navigation policy, terminates when in kitchen. Enables planning at abstract level ("go to kitchen, make coffee") vs primitive level ("left, left, forward, stop, ...").' },

  { id: 5088, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Memory Interference', difficulty: 'medium', keywords: ['interference', 'proactive', 'retroactive', 'memory'],
    question: 'Proactive interference in AI agent memory occurs when:',
    options: { A: 'The agent proactively retrieves memories before being asked', B: 'Older memories interfere with learning new information — outdated facts prevent incorporation of updated knowledge', C: 'Memory retrieval proactively triggers related memories', D: 'Proactive inference is only relevant for continual learning models' },
    answer: 'B', explanation: 'Proactive interference: agent has strong "old HQ address = 123 Main St" memory → struggles to learn new address "456 Oak Ave" because old memory dominates retrieval. Mitigation: explicit memory update mechanism (not just add, but replace), timestamp-weighted retrieval favoring recent information.' },

  { id: 5089, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Perception-Action Cycle', difficulty: 'medium', keywords: ['perception', 'action', 'sensorimotor', 'loop'],
    question: 'The agent perception-action loop in agentic AI systems represents:',
    options: { A: 'The software loop that polls for new user input', B: 'The fundamental cycle: observe environment state → process (reason/plan) → select action → execute → observe resulting state → repeat', C: 'Only applicable to physical robots, not software agents', D: 'Perception-action loops require real-time processing under 100ms' },
    answer: 'B', explanation: 'Perception-action loop: observe (read email, check calendar) → process (LLM reasoning: "I should schedule this meeting") → act (call calendar_api) → observe result ("meeting created") → process next step. The fundamental computational structure of all agentic systems.' },

  { id: 5090, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Planning Horizon', difficulty: 'hard', keywords: ['horizon', 'discount', 'long-term', 'myopic'],
    question: 'Myopic (short-horizon) planning in agents leads to:',
    options: { A: 'Agents that can only see a limited number of steps ahead in time', B: 'Suboptimal solutions that maximize immediate reward but miss better long-term strategies — "greedy local decisions undermine global goals"', C: 'Myopic planning is always preferred for computational efficiency', D: 'Myopic planning only affects RL agents, not LLM agents' },
    answer: 'B', explanation: 'Myopic planning: greedy step-by-step execution without forward simulation → locally optimal, globally suboptimal. Example: agent sends email immediately (greedy) vs drafting, reviewing, and revising (long-horizon) → long-horizon produces better result. Lookahead or explicit planning stages counteract myopia.' },

  { id: 5091, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Working Memory Limits', difficulty: 'medium', keywords: ['working memory', '7 plus minus 2', 'cognitive load', 'chunking'],
    question: 'Miller\'s law (7±2 cognitive chunks) applied to AI agent context design suggests:',
    options: { A: 'AI agents can only process 7 items at a time in their context', B: 'Structure information into meaningful chunks (rather than raw tokens) to reduce cognitive load — "5 key constraints" vs "paragraph of 5 nested conditional requirements"', C: 'AI working memory is exactly 7 tokens', D: 'Miller\'s law only applies to human cognition, not AI' },
    answer: 'B', explanation: 'Chunking for AI prompts: instead of 500 words of context → structure as {goal, constraints[5 items], relevant_facts[5 items], current_state}. Structured chunks are easier to reason about than unstructured prose. LLMs (like humans) benefit from well-organized information presentation.' },

  { id: 5092, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Counterfactual Reasoning', difficulty: 'hard', keywords: ['counterfactual', 'what-if', 'causal', 'simulation'],
    question: 'Counterfactual reasoning in AI agents enables:',
    options: { A: 'Reasoning about past events that cannot be changed', B: '"What would happen if..." simulation: evaluating alternative actions before committing, learning from mistakes by analyzing what different choices would have produced', C: 'Counterfactual reasoning is a form of hallucination', D: 'Only applicable for post-hoc explanation generation' },
    answer: 'B', explanation: 'Counterfactual reasoning: "If I had sent the email yesterday instead of today, would the meeting be scheduled?" Agent mentally simulates alternative timelines → learns causal structure → makes better decisions. Enables counterfactual explanations for users: "If you had provided X, I would have Y."' },

  { id: 5093, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Intentionality', difficulty: 'hard', keywords: ['intentionality', 'aboutness', 'goal', 'representation'],
    question: 'Intentionality in AI agent design (agents having "goals about" things) is operationalized through:',
    options: { A: 'Giving agents explicit human-like intentions and desires', B: 'Goal representations that direct computational processes toward achieving specified states — agents act to satisfy goal conditions regardless of whether they have subjective experience', C: 'Intentionality proves AI agents are conscious', D: 'Intentionality is irrelevant for practical agent engineering' },
    answer: 'B', explanation: 'Practical intentionality: agent goal = "user_task_completed" → all processing directed toward achieving that state. Goal representation shapes action selection, resource allocation, planning. Functional intentionality (without consciousness claims) is sufficient for effective agent design and safety analysis.' },

  { id: 5094, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Knowledge Representation Tradeoffs', difficulty: 'hard', keywords: ['knowledge representation', 'expressiveness', 'tractability', 'logic'],
    question: 'More expressive knowledge representations (first-order logic) vs less expressive (propositional) tradeoff:',
    options: { A: 'More expressive is always better for agent planning', B: 'Higher expressiveness enables richer knowledge but increases computational complexity — first-order logic is undecidable, propositional is decidable but limited in what it can express', C: 'Expressiveness and tractability are independent properties', D: 'LLMs eliminate all knowledge representation tradeoffs' },
    answer: 'B', explanation: 'Expressiveness-tractability tradeoff: propositional logic (fast, decidable, limited) → description logics (OWL, decidable with careful design) → first-order logic (undecidable in general). Agent knowledge representation: balance what needs to be expressed against what can be efficiently reasoned about at query time.' },

  { id: 5095, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Interrupt Handling', difficulty: 'medium', keywords: ['interrupt', 'preemption', 'priority', 'context save'],
    question: 'Handling user interruptions mid-task in long-running AI agents requires:',
    options: { A: 'Ignoring interruptions until the current task completes', B: 'Saving task checkpoint/context, switching to handle the interruption, then offering to resume the interrupted task — analogous to OS interrupt handling', C: 'Abandoning the interrupted task permanently', D: 'Only single-step tasks should be offered to avoid interruption issues' },
    answer: 'B', explanation: 'Agent interrupt handling: task in progress (research report, 5 minutes in) → user sends "actually, stop — focus on X instead" → agent saves checkpoint (what was found so far, what remains) → handles new request → later offers "I had a previous task researching Y. Want me to resume?" Preserves work-in-progress.' },
];
