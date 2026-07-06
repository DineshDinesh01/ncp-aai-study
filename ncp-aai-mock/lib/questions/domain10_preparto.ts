import { Question } from '../types';

export const domain10PrepartoQuestions: Question[] = [
  {
    id: 10801,
    domain: 10,
    domainName: 'Human-AI Interaction & Oversight',
    topic: 'Scenario: HITL Escalation Design',
    question: 'Your autonomous procurement agent can approve purchase orders up to $50,000 without human review. An audit reveals that over the past quarter it approved 23 orders that violated vendor conflict-of-interest policies — all under the $50k threshold, so no human ever reviewed them. Select TWO architectural changes that directly address this failure.',
    options: {
      A: 'Lower the auto-approval threshold to $10,000 to increase human review frequency.',
      B: 'Add a policy-compliance check tool that runs on every order regardless of amount, with automatic escalation to a human reviewer when a conflict-of-interest flag is raised.',
      C: 'Retrain the LLM on historical purchase orders so it learns to detect policy violations itself.',
      D: 'Implement a secondary review agent that independently evaluates every agent decision against the vendor conflict-of-interest policy before execution.',
      E: 'Add an audit log dashboard so compliance officers can spot-check decisions weekly.'
    },
    answer: 'BD',
    explanation: 'The root failure is that the HITL threshold was dollar-based but the risk dimension (conflict of interest) was non-monetary. Fix (B): a mandatory policy-compliance gate on every order decouples risk from dollar amount — any COI flag triggers human review regardless of spend. Fix (D): a second independent agent as a checker adds a defense-in-depth layer before execution. Option A just shifts the threshold without addressing the correct risk signal. Option C (fine-tuning) cannot reliably encode dynamic vendor relationships. Option E (audit log) catches problems after the fact rather than preventing them.',
    keywords: ['HITL', 'escalation', 'compliance check', 'human-in-the-loop', 'procurement agent'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 10802,
    domain: 10,
    domainName: 'Human-AI Interaction & Oversight',
    topic: 'Scenario: Confidence Threshold Tuning',
    question: 'Your medical triage agent routes patient symptom descriptions to: (1) self-care advice, (2) schedule GP appointment, or (3) go to emergency room. You set a confidence threshold — below it, a human nurse reviews. Users complain the agent escalates too aggressively (80% of cases go to a nurse). Stakeholders want to reduce human review to 20%. What is the correct approach?',
    options: {
      A: 'Raise the confidence threshold so the agent handles more cases autonomously — tune until human review rate hits 20%.',
      B: 'Analyze the calibration curve of the agent\'s confidence scores against ground-truth outcomes; if confidence is well-calibrated, raise the threshold. If miscalibrated (overconfident or underconfident), recalibrate the model first before changing the threshold.',
      C: 'Remove the confidence threshold entirely and replace with a rule-based system that only escalates category 3 (ER) cases.',
      D: 'Switch to a more capable model — larger models have inherently better-calibrated confidence scores.'
    },
    answer: 'B',
    explanation: 'Threshold tuning without calibration analysis is dangerous in a medical context. The confidence score must be calibrated — meaning a score of 0.8 should correspond to ~80% actual accuracy. If the model is underconfident (always scores low even when correct), raising the threshold is safe. If it is miscalibrated (confidence doesn\'t correlate with accuracy), blindly raising the threshold increases patient harm risk. Option A is reckless — it optimizes for cost reduction without verifying safety. Option C removes the safety net entirely. Option D is false — model size doesn\'t guarantee calibration.',
    keywords: ['confidence threshold', 'calibration', 'HITL', 'medical triage', 'human oversight'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 10803,
    domain: 10,
    domainName: 'Human-AI Interaction & Oversight',
    topic: 'Scenario: Approval Workflow',
    question: 'You are building an AI legal contract review agent that suggests redlines (edits) on vendor contracts. The legal team wants to maintain full oversight but not be overwhelmed. Select TWO interaction patterns that balance agent autonomy with human control.',
    options: {
      A: 'Agent auto-applies all suggested redlines and notifies the legal team by email for post-hoc review.',
      B: 'Agent presents redlines with inline explanations ("This clause limits our IP rights — recommend deletion because…") and requires one-click approval per redline before applying.',
      C: 'Agent processes contracts in batch overnight and delivers a summary report each morning.',
      D: 'Agent flags only clauses it is uncertain about (confidence < 0.7) for human review, auto-applies high-confidence suggestions.',
      E: 'Agent provides a risk-tiered review: standard clauses are auto-approved, non-standard clauses require human approval, and novel/high-risk clauses escalate to senior counsel.'
    },
    answer: 'BE',
    explanation: 'Option B implements explainable HITL — the agent shows its reasoning per redline, and the human approves individually. This preserves full oversight without overwhelming the reviewer. Option E implements risk-tiered escalation — proportional oversight based on clause novelty and risk, which is how experienced legal ops teams already work. Option A (auto-apply with notification) violates the principle that high-stakes actions require pre-execution approval. Option C (batch/overnight) removes the human from the loop during the decision window. Option D (confidence-only gating) is unreliable for legal text where the model may be confidently wrong.',
    keywords: ['approval workflow', 'HITL', 'explainability', 'risk-tiered', 'legal agent'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 10804,
    domain: 10,
    domainName: 'Human-AI Interaction & Oversight',
    topic: 'Scenario: Agent Transparency',
    question: 'Users of your financial planning agent report that they don\'t trust its recommendations because they cannot tell how it reached conclusions. You need to increase transparency without rebuilding the agent. Select TWO techniques that improve explainability for end users.',
    options: {
      A: 'Display a step-by-step reasoning trace showing which data sources were consulted, what calculations were performed, and which rules were applied to reach the recommendation.',
      B: 'Show a confidence percentage next to each recommendation (e.g., "87% confident").',
      C: 'Add a "Why did the agent recommend this?" button that triggers the agent to generate a plain-English explanation of its reasoning for that specific recommendation.',
      D: 'Publish the model weights so technically sophisticated users can inspect the model directly.',
      E: 'Replace the LLM-based agent with a rules-based system that is inherently explainable.'
    },
    answer: 'AC',
    explanation: 'Option A (reasoning trace) shows the work — sources, calculations, rules — which addresses the core trust gap. This is standard in financial contexts where regulators require audit trails. Option C (on-demand explanation) lets users drill into the reasoning for specific recommendations without overwhelming the UI with traces on every interaction. Option B (confidence %) addresses uncertainty quantification but not reasoning transparency — users still don\'t know WHY. Option D is impractical and a security risk. Option E is a complete rebuild, not an incremental improvement.',
    keywords: ['explainability', 'reasoning trace', 'transparency', 'on-demand explanation', 'trust'],
    difficulty: 'medium',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 10805,
    domain: 10,
    domainName: 'Human-AI Interaction & Oversight',
    topic: 'Scenario: Feedback Loop Design',
    question: 'Your customer support agent handles 10,000 conversations per day. You want to use human feedback to continuously improve it. A naive approach of having humans review all conversations is too expensive. What is the most effective feedback collection strategy?',
    options: {
      A: 'Randomly sample 1% of conversations daily and have human reviewers score them on a rubric.',
      B: 'Use implicit signals (thumbs up/down, escalation rate, re-open rate) combined with targeted human review of conversations where the agent expressed low confidence or where the user escalated.',
      C: 'Ask users to rate every response 1-5 stars before they can proceed to the next message.',
      D: 'Deploy a separate LLM-as-judge that scores every conversation automatically, eliminating the need for human feedback.'
    },
    answer: 'B',
    explanation: 'Implicit signals (escalation, re-open, thumb ratings) are cheap and scale to 100% coverage without user friction. Targeting human review at high-uncertainty or escalated conversations maximizes signal per human-hour — these are exactly the cases where agent behavior is most ambiguous. Option A (random 1% sampling) gives coverage but misses the hard cases where improvement is most needed. Option C (mandatory rating) creates friction that degrades UX and biases feedback toward frustrated users. Option D (LLM-as-judge) removes the human from the loop entirely — appropriate as a filter but not a replacement for ground-truth human judgment.',
    keywords: ['feedback loop', 'implicit signals', 'RLHF', 'human review', 'escalation signals'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 10806,
    domain: 10,
    domainName: 'Human-AI Interaction & Oversight',
    topic: 'NVIDIA AgentIQ Oversight',
    question: 'Select TWO capabilities NVIDIA AgentIQ provides that directly support human oversight of agentic systems in production.',
    options: {
      A: 'Real-time GPU memory defragmentation to prevent agent OOM crashes during peak load.',
      B: 'Token-level and workflow-level profiling that makes every tool call, retrieval step, and LLM invocation visible — enabling operators to trace exactly what an agent did during any given interaction.',
      C: 'On-device LoRA fine-tuning triggered automatically when agent accuracy drops below a configurable threshold.',
      D: 'Latency and cost dashboards that surface which agent steps are slow or expensive, enabling targeted optimization decisions by human operators.',
      E: 'Automatic rollback of agent deployments when a downstream API returns a 5xx error.'
    },
    answer: 'BD',
    explanation: 'AgentIQ (NVIDIA\'s agent observability toolkit) provides: (B) full execution tracing — every tool call, retrieval, and LLM invocation is instrumented with timing and token data, giving operators a complete audit trail for any interaction. (D) Aggregate dashboards showing latency and cost per step let human operators make informed optimization decisions about where to invest (caching, parallelization, model swap). Option A (GPU defragmentation) is a CUDA runtime concern, not AgentIQ. Option C (auto fine-tuning) doesn\'t exist in AgentIQ. Option E (auto-rollback on 5xx) is a deployment infrastructure concern handled by Kubernetes or service mesh, not AgentIQ.',
    keywords: ['AgentIQ', 'observability', 'profiling', 'audit trail', 'human oversight'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: false,
    quality: 'preparto'
  },
  {
    id: 10807,
    domain: 10,
    domainName: 'Human-AI Interaction & Oversight',
    topic: 'Scenario: Escalation Trigger Design',
    question: 'Your HR onboarding agent handles new employee questions. During testing, you identify four situations where the agent should escalate to a human HR specialist. Which of the following is NOT a valid escalation trigger?',
    options: {
      A: 'The employee\'s question involves a legal complaint or accommodation request under disability law.',
      B: 'The agent\'s response would require accessing a system it does not have credentials for.',
      C: 'The question has been asked more than 3 times in the conversation without the user expressing satisfaction.',
      D: 'The question is about company benefits packages, which change quarterly.'
    },
    answer: 'D',
    explanation: 'Benefits package questions (D) are high-frequency, well-structured, and suitable for agent handling with a regularly updated knowledge base — not a valid reason to escalate to a human. The agent should handle these with a fresh retrieval from the current benefits documentation. Valid triggers: (A) Legal complaints require a qualified HR professional due to liability — the agent should never handle these. (B) Credential gaps prevent the agent from completing the task — escalation is the correct failure mode. (C) Repeated failure to satisfy (loop detection) indicates the agent is stuck — escalation prevents frustrating the user further.',
    keywords: ['escalation trigger', 'HITL', 'HR agent', 'valid escalation', 'loop detection'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 10808,
    domain: 10,
    domainName: 'Human-AI Interaction & Oversight',
    topic: 'Scenario: Audit Log Requirements',
    question: 'Your company is deploying an AI agent to make credit limit adjustment decisions for retail customers. The compliance team requires a complete audit trail. Select TWO items that MUST be in the audit log for each decision to satisfy regulatory requirements for automated financial decisions.',
    options: {
      A: 'The GPU model and VRAM usage at the time of inference.',
      B: 'The exact input data used (customer profile, credit score, payment history snapshot) at the time the decision was made.',
      C: 'The complete reasoning chain — which factors the agent weighted and how — leading to the specific credit limit decision.',
      D: 'The response latency in milliseconds for the inference call.',
      E: 'The name of the LLM model version that produced the decision.'
    },
    answer: 'BC',
    explanation: 'Regulations like ECOA (Equal Credit Opportunity Act) and GDPR Article 22 require that automated decisions affecting individuals be explainable and auditable. (B) The exact input snapshot is mandatory — you must be able to reconstruct what data the model saw at decision time, not just the current state of the database. (C) The reasoning chain satisfies the "right to explanation" requirement — regulators and customers must be able to understand why a specific decision was made. Option A (GPU stats) and D (latency) are operational metrics, not audit requirements. Option E (model version) is useful for debugging but is not a regulatory requirement for the decision audit trail itself.',
    keywords: ['audit log', 'compliance', 'ECOA', 'GDPR', 'automated decision', 'right to explanation'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 10809,
    domain: 10,
    domainName: 'Human-AI Interaction & Oversight',
    topic: 'Human-AI Collaboration Patterns',
    question: 'Select TWO interaction patterns from the list below that represent "human-on-the-loop" oversight (as opposed to "human-in-the-loop").',
    options: {
      A: 'The agent executes actions autonomously and sends a daily digest report to a human supervisor who can review and reverse actions within 24 hours.',
      B: 'The agent pauses before every irreversible action and presents its planned action to a human for explicit approval.',
      C: 'The agent monitors its own performance metrics and sends an alert to a human operator when accuracy drops below a threshold, who can then intervene.',
      D: 'The agent requires a human to confirm every tool call before execution.',
      E: 'The agent handles all low-risk queries autonomously but routes edge cases to a human queue for resolution.'
    },
    answer: 'AC',
    explanation: '"Human-on-the-loop" means the human monitors and can intervene, but is not in the critical path of every decision. (A) Autonomous execution with post-hoc review digest is classic human-on-the-loop — the human sees what happened and can reverse, but didn\'t approve in advance. (C) Autonomous operation with exception alerting is human-on-the-loop — the human is notified when something goes wrong, not before every action. "Human-in-the-loop" (B, D) requires explicit human approval before actions execute. Option E is a hybrid: low-risk = human-on-the-loop, edge cases = human-in-the-loop.',
    keywords: ['human-on-the-loop', 'human-in-the-loop', 'oversight patterns', 'autonomous', 'monitoring'],
    difficulty: 'medium',
    type: 'multi',
    answerCount: 2,
    isScenario: false,
    quality: 'preparto'
  },
  {
    id: 10810,
    domain: 10,
    domainName: 'Human-AI Interaction & Oversight',
    topic: 'Scenario: Trust Calibration',
    question: 'You deployed an AI coding agent 3 months ago. Developer adoption is low — engineers say they don\'t trust it even though internal benchmarks show 89% accuracy. A UX researcher finds that developers distrust the agent because it "sounds equally confident whether it\'s right or wrong." What is the root cause and correct fix?',
    options: {
      A: 'The agent needs a better system prompt that tells it to be more humble.',
      B: 'The agent lacks uncertainty communication — it doesn\'t distinguish between high-confidence answers and uncertain ones. Fix: implement confidence-aware response generation that hedges uncertain answers ("I\'m less certain here, you should verify…") and cites sources for verifiable claims.',
      C: 'The benchmark methodology is flawed — 89% accuracy on benchmarks doesn\'t translate to real-world trust, so a better benchmark is needed.',
      D: 'Developers have automation bias resistance — the fix is change management training, not a technical change.'
    },
    answer: 'B',
    explanation: 'The root cause is a calibration UX failure: the agent\'s tone doesn\'t match its actual uncertainty. When an agent sounds equally confident on a well-known algorithm vs. a niche library bug, developers can\'t calibrate their trust — so they default to distrust of everything. The fix is uncertainty-aware generation: for low-confidence responses, hedge ("I believe… but verify"), cite sources that the developer can check, and explicitly flag when the question falls outside the training distribution. Option A (system prompt humility) is too coarse — it makes the agent hedgy even when correct, degrading usefulness. Option C misdiagnoses the problem. Option D blames the users rather than the system design.',
    keywords: ['trust calibration', 'uncertainty communication', 'confidence hedging', 'UX', 'automation bias'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 10811,
    domain: 10,
    domainName: 'Human-AI Interaction & Oversight',
    topic: 'Oversight Mechanisms',
    question: 'Select TWO mechanisms that represent correct implementation of the "minimal footprint" principle for agentic AI systems.',
    options: {
      A: 'The agent requests only the specific database tables it needs for the current task, rather than requesting read access to the entire database schema.',
      B: 'The agent prefers reversible actions (draft an email) over irreversible ones (send an email) unless explicitly instructed otherwise.',
      C: 'The agent stores all intermediate reasoning in a persistent vector database for future reference.',
      D: 'The agent uses the largest available model to maximize the chance of task success.',
      E: 'The agent caches all tool call results locally to reduce API costs.'
    },
    answer: 'AB',
    explanation: 'The "minimal footprint" principle (from NVIDIA and broader AI safety literature) means agents should: request only necessary permissions (A), prefer reversible over irreversible actions (B), avoid storing unnecessary data, and confirm with users when uncertain about scope. Option A (scoped DB access) limits blast radius if the agent makes an error. Option B (draft vs. send) preserves human ability to review before commitment. Option C (persistent storage of all reasoning) expands the footprint unnecessarily. Option D (largest model) is a capability choice unrelated to footprint. Option E (caching) is an optimization, not a footprint-minimization technique.',
    keywords: ['minimal footprint', 'reversible actions', 'least privilege', 'agentic safety', 'oversight'],
    difficulty: 'medium',
    type: 'multi',
    answerCount: 2,
    isScenario: false,
    quality: 'preparto'
  },
  {
    id: 10812,
    domain: 10,
    domainName: 'Human-AI Interaction & Oversight',
    topic: 'Scenario: Handoff Design',
    question: 'Your AI customer service agent is handing off a frustrated customer to a human agent. What information MUST the handoff package contain for the human agent to be effective without making the customer repeat themselves?',
    options: {
      A: 'The full raw conversation transcript only — the human can read it and form their own view.',
      B: 'A structured handoff summary: (1) issue category and current status, (2) what the AI already tried and why it failed, (3) customer sentiment score, (4) account context (tenure, tier, past issues), and (5) recommended next action.',
      C: 'The customer\'s account number and name — the human agent can pull everything else from the CRM.',
      D: 'The conversation transcript plus a one-sentence summary of the issue.'
    },
    answer: 'B',
    explanation: 'Effective AI-to-human handoff requires a structured package that saves the human agent from re-deriving context. The five elements in (B) map to real human agent needs: (1) issue status tells them where things stand immediately; (2) what-was-tried prevents the frustrating "have you tried turning it off and on again" repeat; (3) sentiment score prepares the agent emotionally and prioritizes urgency; (4) account context enables personalized, tier-appropriate responses; (5) recommended action gives the human a starting point. Option A (raw transcript only) requires the human to read and synthesize everything — slow and error-prone under call pressure. Option C provides too little context. Option D is better than C but lacks structure.',
    keywords: ['handoff', 'human escalation', 'structured summary', 'customer service', 'context transfer'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 10813,
    domain: 10,
    domainName: 'Human-AI Interaction & Oversight',
    topic: 'Scenario: Override Mechanism',
    question: 'Your supply chain optimization agent runs continuously, making inventory reorder decisions every 15 minutes. A regional manager needs to be able to override the agent\'s decisions for their region during a local promotional event. Select TWO requirements for a safe override mechanism.',
    options: {
      A: 'The override must be logged with the manager\'s identity, timestamp, reason code, and the agent\'s original recommendation that was overridden.',
      B: 'Overrides should be permanent — once a human overrides the agent, the agent should not re-evaluate that decision.',
      C: 'The override UI should show the agent\'s reasoning for its original decision so the manager can make an informed override choice.',
      D: 'Overrides should automatically expire after a configurable time window (e.g., 48 hours) so the agent resumes normal operation after the promotional event.',
      E: 'The system should require two managers to co-approve any override to prevent abuse.'
    },
    answer: 'AD',
    explanation: '(A) Audit logging is non-negotiable: every override must record who overrode, when, why, and what the agent\'s original recommendation was — this satisfies accountability and enables post-event analysis of whether overrides improved or degraded outcomes. (D) Time-bounded expiry is critical: without it, an override set during a 2-day promotional event silently persists for weeks, preventing the agent from resuming optimized decisions. Option B (permanent override) is dangerous — it removes agent optimization indefinitely and defeats the purpose of an autonomous system. Option C (show agent reasoning in override UI) is good UX but not a safety requirement. Option E (two-manager co-approval) adds friction that defeats the purpose of a rapid override during a live event.',
    keywords: ['override mechanism', 'audit log', 'time-bounded', 'human control', 'supply chain'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 10814,
    domain: 10,
    domainName: 'Human-AI Interaction & Oversight',
    topic: 'Scenario: Transparency Reporting',
    question: 'Your organization is required by an enterprise customer to provide monthly transparency reports on your AI agent\'s decision-making. Select TWO metrics that belong in a transparency report for an agentic system (vs. a traditional ML model report).',
    options: {
      A: 'Tool call frequency distribution — which tools the agent invoked most often and in what sequences.',
      B: 'Model perplexity scores on a held-out test set.',
      C: 'Human escalation rate by intent category — what proportion of queries in each category required human intervention.',
      D: 'Gradient norm during the last fine-tuning run.',
      E: 'Attention head visualization for sample queries.'
    },
    answer: 'AC',
    explanation: 'Transparency reporting for agentic systems differs from traditional ML — the report should reflect agent behavior, not model internals. (A) Tool call frequency shows what the agent actually did in production — which capabilities it relied on, whether it overused certain tools, and whether tool sequences match intended workflows. (C) Human escalation rate by intent category directly measures where the agent is failing or uncertain — high escalation in a category signals a capability gap needing attention. Options B, D, E are ML training/evaluation metrics irrelevant to operational transparency for a deployed agent. They describe model internals, not agent behavior.',
    keywords: ['transparency report', 'tool call frequency', 'escalation rate', 'agentic metrics', 'oversight'],
    difficulty: 'medium',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 10815,
    domain: 10,
    domainName: 'Human-AI Interaction & Oversight',
    topic: 'Scenario: Disagreement Protocol',
    question: 'Your AI research agent and a senior analyst disagree on a market forecast. The agent projects 15% growth; the analyst believes 8%. The analyst cannot identify a specific error in the agent\'s reasoning but has domain intuition from 20 years of experience. What is the correct organizational protocol?',
    options: {
      A: 'Default to the agent — it processed more data objectively without emotional bias.',
      B: 'Default to the analyst — human judgment always overrides AI in high-stakes decisions.',
      C: 'Treat the disagreement as a signal to investigate further: document both forecasts, have the agent explain which specific data points drove its projection, ask the analyst to articulate their intuition as testable hypotheses, and present both views to decision-makers with the uncertainty range.',
      D: 'Average the two forecasts (11.5%) as a compromise that incorporates both perspectives.'
    },
    answer: 'C',
    explanation: 'Neither reflexive AI-deference (A) nor reflexive human-deference (B) is correct. The disagreement itself is information — experienced analysts\' intuitions often encode pattern-matching that the agent\'s data doesn\'t capture (e.g., regulatory changes, relationship signals, qualitative market shifts). The correct protocol: (1) Make the agent\'s reasoning inspectable — which data drove 15%? (2) Convert the analyst\'s intuition into hypotheses ("I think X sector is weaker than the data shows because…"). (3) Present both to decision-makers with explicit uncertainty. This is the human-AI collaboration model: AI as analytical tool, human as context-provider, with transparent disagreement surfaced rather than hidden. Averaging (D) is epistemically meaningless.',
    keywords: ['human-AI disagreement', 'collaboration protocol', 'domain intuition', 'uncertainty', 'oversight'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  }
];