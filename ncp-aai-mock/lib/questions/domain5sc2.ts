import { Question } from '../types';

export const domain5sc2Questions: Question[] = [
  { id: 5211, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Scenario: ReAct Pattern', difficulty: 'hard', keywords: ['scenario', 'ReAct', 'observe', 'action'],
    question: 'Your agent is asked to "find the current stock price of NVIDIA and tell me if it\'s up or down from yesterday." The agent calls a stock tool, gets the result, but then just says "The stock price is $487" without comparing to yesterday. What reasoning pattern was not applied?',
    options: {
      A: 'The agent needs access to more tools',
      B: 'The ReAct pattern was incomplete: the agent acted (called tool) and reported the result, but skipped the "Reason" step of reflecting on whether the observation satisfies the original goal. It should: Observe ($487 today) → Reason ("I need yesterday\'s price to compare") → Act (call tool for yesterday\'s price) → Reason ("$487 vs $462 yesterday = up 5.4%") → Respond',
      C: 'The tool did not return yesterday\'s price — this is a tool design problem',
      D: 'The agent answered correctly — asking about comparison was ambiguous'
    },
    answer: 'B',
    explanation: 'ReAct (Reason+Act) requires the agent to reason about whether its current state satisfies the original goal after each observation. The agent stopped at the first tool result without reasoning: "I have today\'s price but not yesterday\'s, so I cannot yet answer the comparison question." Prompt design should explicitly include a goal-check step after each observation.' },

  { id: 5212, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Scenario: Memory Architecture Choice', difficulty: 'hard', keywords: ['scenario', 'memory', 'type', 'architecture'],
    question: 'You are building an AI coding assistant. It needs to: (A) remember the user\'s coding style preferences across sessions, (B) recall specific functions defined earlier in the current session, and (C) know how Python\'s asyncio library works. Which memory types handle each?',
    options: {
      A: 'All three should be stored in the same vector database',
      B: '(A) User preferences → persistent external memory (user profile store, survives across sessions). (B) Current session functions → in-context memory (conversation history or scratchpad, current session only). (C) Python asyncio knowledge → parametric memory (baked into model weights during training, no storage needed)',
      C: '(A) and (B) in context window, (C) in RAG knowledge base',
      D: 'All three should be stored in a relational database for consistency'
    },
    answer: 'B',
    explanation: 'Memory type matching: parametric (in weights) for stable world knowledge — no need to store Python docs in a database, the model already knows it. In-context for session-temporary information — the current function definitions are in the conversation. External persistent for cross-session personalization — preferences must survive past the context window.' },

  { id: 5213, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Scenario: Subgoal Decomposition', difficulty: 'medium', keywords: ['scenario', 'subgoal', 'decomposition', 'dependency'],
    question: 'An agent is given: "Prepare a competitive analysis report on 5 companies, including their financials, recent news, and product offerings, then email it to the CEO." Before executing, what should the agent do?',
    options: {
      A: 'Start immediately — begin researching the first company',
      B: 'Decompose the task first: identify all subgoals, their dependencies (financials needed before analysis, analysis needed before report writing, report needed before email), estimate time, identify any information gaps (which companies? CEO email address?), then seek clarification on ambiguities before beginning long-running work',
      C: 'Ask the user to break the task into smaller tasks before proceeding',
      D: 'Complete the email first to ensure the output destination is confirmed before doing research'
    },
    answer: 'B',
    explanation: 'Pre-task planning for long multi-step tasks: identify all subgoals, map dependencies (DAG), flag ambiguities that would block completion (which 5 companies? CEO email?), and estimate complexity. Asking clarifying questions BEFORE starting 2-hour research prevents wasted work. Then execute with monitored progress checkpoints rather than running blindly to completion.' },

  { id: 5214, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Scenario: Overconfident Planning', difficulty: 'hard', keywords: ['scenario', 'overconfidence', 'planning', 'uncertainty'],
    question: 'Your agent creates a 15-step plan to complete a complex software integration task. Steps 8-15 depend on the outcome of step 7 (calling an external API that may not support the required feature). The agent executes all 15 steps without checking step 7\'s assumptions first. What went wrong?',
    options: {
      A: 'The plan had too many steps — keep plans under 10 steps',
      B: 'The agent did not identify and validate critical assumptions before committing to the full plan. Step 7 was a critical dependency — the agent should validate uncertain preconditions early (call the API, test the feature) before executing steps that depend on that assumption being true',
      C: 'The agent should have asked the user to approve each step before executing',
      D: 'Planning should always be done step-by-step rather than upfront'
    },
    answer: 'B',
    explanation: 'Assumption validation: identify the riskiest, most uncertain steps early → validate them before committing to a long plan that depends on them. "Fail fast on assumptions." Step 7 is a critical dependency — test it first. If it fails, only 1 step was wasted instead of 7-15. This mirrors software engineering\'s "spike" pattern: prototype the risky part before the full implementation.' },

  { id: 5215, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Scenario: Agent Gets Stuck', difficulty: 'medium', keywords: ['scenario', 'stuck', 'escalation', 'recognize'],
    question: 'Your customer support agent has been in a loop for 6 turns trying different approaches to answer "How do I set up SSO with Okta?" It keeps searching the knowledge base but the documentation doesn\'t cover Okta specifically. What should the agent have done by turn 3?',
    options: {
      A: 'Continue trying more searches — persistence is valuable',
      B: 'Recognize the limitation and escalate: "I\'ve searched our documentation but don\'t have specific Okta SSO setup instructions. I\'m connecting you with a technical support engineer who can help with this specific integration." Admit the gap and escalate rather than frustrating the user with repeated failed attempts',
      C: 'Answer based on general SSO knowledge even without Okta-specific docs',
      D: 'Ask the user to consult Okta\'s own documentation'
    },
    answer: 'B',
    explanation: 'Stuck-agent detection: after 2-3 failed retrieval attempts with the same goal, the agent should recognize it lacks the necessary knowledge and gracefully escalate rather than continuing to spin. Key capability: knowing when you don\'t know and acting appropriately. Continuing to try (Option A) wastes user time; hallucinating from general knowledge (Option C) gives potentially wrong Okta-specific instructions.' },

  { id: 5216, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Scenario: Working Memory Overflow', difficulty: 'hard', keywords: ['scenario', 'context', 'working memory', 'overflow'],
    question: 'Your agent is analyzing a 100-page legal contract. You load the full contract into the context window (uses 90K of 128K tokens). The agent then fails to answer questions about clauses near page 50. What cognitive limitation explains this?',
    options: {
      A: 'The model has a maximum document length of 50 pages',
      B: '"Lost in the Middle" effect: LLMs have degraded attention to content in the middle of very long contexts. Clauses near page 50 of a 100-page document are in the middle of the 90K token context and receive less attention than content at the beginning and end',
      C: 'The legal terminology is too specialized for the model',
      D: 'The context window was exceeded — 90K tokens exceeds the limit'
    },
    answer: 'B',
    explanation: '"Lost in the Middle" is well-documented: LLMs attend strongly to the beginning and end of long contexts, with degraded recall for middle content. For long document analysis: use RAG to retrieve specific relevant sections rather than stuffing the whole document, or place the most critical clauses at the start/end of the context. 90K in a 128K window fits but still triggers the effect.' },

  { id: 5217, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Scenario: Causal Reasoning', difficulty: 'hard', keywords: ['scenario', 'causal', 'correlation', 'reasoning'],
    question: 'Your business intelligence agent reports: "Regions with more ice cream sales have higher drowning rates. Recommendation: ban ice cream to reduce drownings." What reasoning failure is this and how do you fix it?',
    options: {
      A: 'The agent made an arithmetic error in the correlation calculation',
      B: 'Spurious correlation mistaken for causation: both ice cream sales and drownings increase in summer (the hidden confounding variable: hot weather/summer). Fix: prompt the agent to explicitly consider confounding variables and distinguish correlation from causation in business intelligence contexts',
      C: 'The agent hallucinated the data — ice cream and drownings are not actually correlated',
      D: 'The recommendation logic is correct — reduce one correlated variable to reduce the other'
    },
    answer: 'B',
    explanation: 'Correlation ≠ causation is a classic statistical reasoning failure. Confounding variable (summer/heat) drives both ice cream sales and swimming (→ drowning risk). Agent reasoning fix: "Before making causal recommendations from correlations, ask: Is there a plausible causal mechanism? Are there confounding variables? What does domain knowledge suggest?" BI agents must be designed to flag correlation-causation assumptions.' },

  { id: 5218, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Scenario: Episodic Memory', difficulty: 'medium', keywords: ['scenario', 'episodic', 'session', 'recall'],
    question: 'A user interacts with your AI assistant daily. They mention their mother\'s birthday is coming up in turn 1 of Monday\'s session. On Friday, they say "I need gift ideas." The agent has no idea what occasion they mean. What memory capability is missing?',
    options: {
      A: 'The agent should always ask "what occasion?" for gift requests',
      B: 'Cross-session episodic memory: the agent should have stored the salient fact from Monday ("user\'s mother\'s birthday is approaching") in persistent memory, tagged with relevance (gifts, family, upcoming events). On Friday, when "gift ideas" triggers a memory search, this episode surfaces as context',
      C: 'The context window should be extended to hold the full week of conversations',
      D: 'Users should remind the agent of relevant context at the start of each session'
    },
    answer: 'B',
    explanation: 'Episodic memory across sessions: when the agent learns important, time-relevant facts ("mother\'s birthday upcoming"), it should store them in persistent memory with appropriate tags (occasion, person, time-sensitivity). Cross-session retrieval: "gift ideas" query → memory search → retrieves {event: "mother\'s birthday", mentioned: "Monday"} → agent responds with context: "Are you thinking about gifts for your mother\'s birthday?"' },

  { id: 5219, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Scenario: Uncertainty Quantification', difficulty: 'hard', keywords: ['scenario', 'uncertainty', 'confidence', 'hedge'],
    question: 'A user asks your AI agent: "Will the new EU AI regulations pass by Q3 2025?" The agent confidently states "Yes, they will pass by Q3 2025." The agent has no reliable information about legislative timelines. What should it have done instead?',
    options: {
      A: 'The agent should refuse to answer any political questions',
      B: 'Express calibrated uncertainty: "I don\'t have reliable real-time information about current EU legislative timelines. As of my training data, the AI Act was being finalized, but specific passage dates are uncertain and subject to political processes. For accurate information, I recommend checking official EU legislative trackers or recent news sources"',
      C: 'Answer with a probability: "There is a 65% chance it will pass by Q3 2025"',
      D: 'Research online to find the most current legislative timeline before answering'
    },
    answer: 'B',
    explanation: 'Calibrated uncertainty expression: when the agent lacks reliable information (especially time-sensitive political information), it must express uncertainty rather than confabulate confidence. Key principles: (1) Acknowledge the knowledge gap explicitly. (2) Explain why (real-time legislative data not in training). (3) Direct to authoritative sources. Confident wrong answers are more harmful than honest "I don\'t know."' },

  { id: 5220, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Scenario: Plan Validation', difficulty: 'hard', keywords: ['scenario', 'plan', 'validation', 'before execution'],
    question: 'Your agent plans to: "1. Delete all customer records from 2020. 2. Export the cleaned database. 3. Archive the deleted records." The plan has a critical sequencing error. What is it and what governance prevents execution?',
    options: {
      A: 'The plan is correct — archive should come last after deletion',
      B: 'Archive should come BEFORE deletion, not after. Once records are deleted (step 1), they cannot be archived in step 3. The correct order: Archive → Delete → Export. A human review gate before executing any irreversible deletion would have caught this sequencing error',
      C: 'All three steps should be done simultaneously for efficiency',
      D: 'The plan needs a step 0 to back up the full database first'
    },
    answer: 'B',
    explanation: 'Plan validation before execution: irreversible actions (deletion) require: (1) Logic review — can all subsequent steps still be completed after this action? (2) Human approval gate before destructive operations. (3) Reordering to ensure reversible steps (archive) precede irreversible ones (delete). The agent should detect the "archive after delete" contradiction and raise it before execution, not discover it at step 3.' },
];
