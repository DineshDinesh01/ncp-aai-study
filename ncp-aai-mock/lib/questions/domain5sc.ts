import { Question } from '../types';

export const domain5scQuestions: Question[] = [
  { id: 5201, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Scenario: Task Decomposition', difficulty: 'hard', keywords: ['scenario', 'decomposition', 'planning', 'subtask'],
    question: 'You ask your agent: "Research the top 5 competitors to our product, analyze their pricing, and draft a competitive positioning document." The agent starts writing the document immediately without researching. What planning failure occurred and how do you fix it?',
    options: {
      A: 'The agent misunderstood the task — rewrite the prompt more clearly',
      B: 'The agent skipped the planning phase. Add an explicit planning step: "Before taking any action, write a numbered plan of all steps you will execute." This forces decomposition (research → analyze → draft) before execution begins',
      C: 'The model is not capable of multi-step tasks — use a better model',
      D: 'Use a separate agent for each subtask (research agent, analysis agent, writing agent)'
    },
    answer: 'B',
    explanation: 'Explicit planning prompts prevent premature execution. "Write a plan first" forces the agent to decompose: [1] Search each competitor, [2] Extract pricing from each site, [3] Compare pricing models, [4] Draft document. Without this, LLMs often jump to the most salient action (writing) rather than the correct first step (research).' },

  { id: 5202, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Scenario: Memory Retrieval Failure', difficulty: 'medium', keywords: ['scenario', 'RAG', 'retrieval', 'memory'],
    question: 'A user told your agent their preferred communication style (formal, bullet points) at the start of a long conversation. 20 turns later, the agent has forgotten this and is responding informally. The agent uses in-context conversation history. What is the problem?',
    options: {
      A: 'The agent\'s personality changed over the conversation',
      B: 'The user preference from turn 1 was truncated out of the context window when history grew too long. Fix: extract and store important user preferences in a persistent structured profile that is always prepended to each turn',
      C: 'The user should repeat their preferences periodically',
      D: 'The model\'s attention fades for information stated early in long conversations'
    },
    answer: 'B',
    explanation: '"Lost in the middle" and truncation together: early context gets removed as the window fills up. Persistent preference store solves this: when user says "I prefer formal bullet points" → extract to user_profile.json → prepend {user_preferences: "formal tone, bullet points"} to EVERY subsequent system prompt. Survives indefinitely regardless of conversation length.' },

  { id: 5203, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Scenario: Reasoning Chain Error', difficulty: 'hard', keywords: ['scenario', 'chain-of-thought', 'error', 'verification'],
    question: 'Your math-solving agent consistently makes errors in multi-step calculations. It shows its reasoning but the errors propagate from step 3 onwards. How do you improve reliability?',
    options: {
      A: 'Use a model with more parameters — it will make fewer math errors',
      B: 'Add a verification step: after the agent generates a solution, have it check each step independently, or use a code interpreter tool to execute the calculations programmatically and verify the numeric result',
      C: 'Increase the temperature to explore more solution paths',
      D: 'Provide more math examples in the few-shot prompt'
    },
    answer: 'B',
    explanation: 'LLMs make arithmetic errors even with correct reasoning logic. Fix: chain-of-thought + tool use. Generate the reasoning → write the calculation as code → execute in Python interpreter → verify result matches. "Let me verify: 127 × 43 = [executes code: 5461]." This catches propagated errors that even careful chain-of-thought misses.' },

  { id: 5204, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Scenario: Plan Adaptation', difficulty: 'hard', keywords: ['scenario', 'replanning', 'adaptation', 'unexpected'],
    question: 'Your agent is executing a 10-step data pipeline plan. At step 6, a required data source returns an error — the data is unavailable. The agent should adapt, but instead continues executing steps 7-10 with missing data, producing garbage output. What architectural fix is needed?',
    options: {
      A: 'Add error handling: if step 6 fails, retry up to 3 times before failing the entire job',
      B: 'After each tool call, explicitly prompt the agent to evaluate: "Did this step succeed? If not, does my plan need to change?" This creates a monitor-adapt loop so the agent can replan when reality diverges from the plan',
      C: 'Pre-validate all data sources before starting any plan execution',
      D: 'Use a more capable model that handles errors better'
    },
    answer: 'B',
    explanation: 'Agents without explicit monitoring continue executing plans even when preconditions for later steps have failed. The ReAct pattern (Reason-Act-Observe-Reason) handles this: after each action, the agent reasons about whether the current state still supports the plan. Step 6 fails → "Data unavailable. I cannot proceed with step 7-10. I should either find an alternative source or report the limitation."' },

  { id: 5205, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Scenario: Uncertainty Handling', difficulty: 'medium', keywords: ['scenario', 'uncertainty', 'confidence', 'hallucination'],
    question: 'Your medical information agent confidently answers questions about rare drug interactions with no knowledge base to back it up, sometimes providing incorrect information. What is the most dangerous failure mode and how do you fix it?',
    options: {
      A: 'The agent should refuse all medical questions',
      B: 'The agent is generating confident-sounding responses when it is actually uncertain — overconfident hallucination. Fix: require the agent to cite retrieved sources for every medical claim, and explicitly state uncertainty when sources are unavailable: "I don\'t have reliable information on this specific interaction — please consult a pharmacist"',
      C: 'Add a disclaimer that the agent is not a medical professional',
      D: 'Limit the agent to only answering questions with yes/no responses'
    },
    answer: 'B',
    explanation: 'Calibrated uncertainty is critical in high-stakes domains. An agent that says "I don\'t know" is safer than one that confidently confabulates. Fixes: (1) Grounded generation — only state facts that appear in retrieved context. (2) Confidence thresholding — if retrieval confidence is low, defer to human expert. (3) Explicit uncertainty expression is a feature, not a weakness.' },
];
