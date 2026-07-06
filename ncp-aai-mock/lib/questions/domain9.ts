import { Question } from '../types';

export const domain9Questions: Question[] = [
  { id: 9001, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'NeMo Guardrails', difficulty: 'medium', keywords: ['NeMo Guardrails', 'safety', 'LLM', 'rails'],
    question: 'Which NVIDIA framework specifically adds programmable safety guardrails to LLM-based applications?',
    options: { A: 'NVIDIA AgentIQ', B: 'NeMo Guardrails', C: 'TensorRT-LLM', D: 'RAPIDS cuDF' },
    answer: 'B', explanation: 'NeMo Guardrails provides programmable safety rails using the Colang language, enabling developers to define topical, safety, and security rules for LLM applications.' },

  { id: 9002, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'PII Protection', difficulty: 'medium', keywords: ['PII', 'personal data', 'GDPR', 'privacy'],
    question: 'When handling user data in AI agent systems under GDPR, which principles apply? (Choose two)',
    options: { A: 'Data minimization — collect only data necessary for the specific purpose', B: 'Data maximization — collect as much data as possible for future use', C: 'Purpose limitation — only use data for the specified purpose it was collected for', D: 'Retention maximization — keep data forever for potential future value' },
    answer: 'AC', explanation: 'GDPR requires data minimization (collect only what\'s needed) and purpose limitation (use only for stated purpose). Violating these risks significant fines and reputational damage.' },

  { id: 9003, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Bias Detection', difficulty: 'medium', keywords: ['bias', 'fairness', 'demographic', 'disparate impact'],
    question: 'To detect demographic bias in an AI agent\'s outputs, you should:',
    options: { A: 'Check if all outputs are the same length', B: 'Evaluate agent performance and outcomes across demographic groups and measure disparate impact', C: 'Ensure the training data has equal numbers from each country', D: 'Remove all demographic references from agent outputs' },
    answer: 'B', explanation: 'Bias testing requires disaggregated evaluation — measuring accuracy, refusal rates, and outcome quality separately for demographic groups to detect unequal treatment.' },

  { id: 9004, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Audit Trails', difficulty: 'medium', keywords: ['audit trail', 'logging', 'accountability', 'compliance'],
    question: 'Immutable audit logs for AI agent systems are required by compliance frameworks because:',
    options: { A: 'They improve agent response speed', B: 'They provide tamper-evident records of all agent decisions and actions for accountability and incident investigation', C: 'They reduce storage costs', D: 'They automatically fix compliance violations' },
    answer: 'B', explanation: 'Compliance frameworks (SOC2, HIPAA, financial regulations) require audit trails so every agent decision can be traced, reviewed, and attributed — essential for accountability.' },

  { id: 9005, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Responsible AI', difficulty: 'easy', keywords: ['responsible AI', 'principles', 'fairness', 'accountability'],
    question: 'Microsoft\'s Responsible AI principles include which of the following? (Choose two)',
    options: { A: 'Fairness — AI systems should treat all people equitably', B: 'Maximum performance — accuracy is the only important metric', C: 'Reliability and Safety — systems should perform reliably and safely', D: 'Commercial priority — business value overrides ethical concerns' },
    answer: 'AC', explanation: 'Microsoft\'s 6 Responsible AI principles include Fairness, Reliability and Safety (plus Inclusiveness, Privacy, Transparency, Accountability) — not commercial prioritization.' },

  { id: 9006, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Output Validation', difficulty: 'medium', keywords: ['output validation', 'schema', 'hallucination', 'grounding'],
    question: 'Output validation in AI agent systems helps catch:',
    options: { A: 'Grammatical errors in generated text', B: 'Schema violations, hallucinated facts, policy violations, and harmful content before delivery to users', C: 'Token generation speed issues', D: 'GPU memory errors during inference' },
    answer: 'B', explanation: 'Output validation layers check generated content against schema requirements, fact-grounding rules, content policies, and safety classifiers before it reaches users.' },

  { id: 9007, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Transparency', difficulty: 'easy', keywords: ['transparency', 'explainability', 'disclosure', 'AI'],
    question: 'AI transparency requirements typically mandate:',
    options: { A: 'Making all model weights publicly available', B: 'Disclosing that a system is AI-powered, explaining decisions, and providing users recourse for contested decisions', C: 'Publishing all training data to the public', D: 'Using only open-source AI models' },
    answer: 'B', explanation: 'Transparency principles require users to know they\'re interacting with AI, to understand (at least broadly) how decisions are made, and to have mechanisms to contest automated decisions.' },

  { id: 9008, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Jailbreaking', difficulty: 'hard', keywords: ['jailbreak', 'adversarial', 'safety bypass', 'attack'],
    question: 'Jailbreaking attempts against AI agents try to:',
    options: { A: 'Improve agent performance by bypassing resource limits', B: 'Trick the agent into ignoring safety guidelines via adversarial prompts that manipulate its reasoning', C: 'Access the agent\'s source code', D: 'Optimize the agent\'s inference speed' },
    answer: 'B', explanation: 'Jailbreaks use adversarial prompt techniques (role-playing, hypothetical framing, token manipulation) to bypass safety training and elicit harmful content or behaviors.' },

  { id: 9009, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Data Privacy', difficulty: 'medium', keywords: ['data privacy', 'training data', 'memorization', 'extraction'],
    question: 'The training data memorization risk in LLMs means:',
    options: { A: 'LLMs remember all training data with perfect fidelity', B: 'LLMs may reproduce sensitive training data (PII, confidential info) when queried with appropriate prompts', C: 'Training data is permanently stored in the model\'s context', D: 'Models memorize only factual information, not personal data' },
    answer: 'B', explanation: 'Research shows LLMs can regurgitate memorized training data (phone numbers, addresses, code snippets) under certain prompting conditions — a privacy and IP risk.' },

  { id: 9010, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Content Moderation', difficulty: 'medium', keywords: ['content moderation', 'harmful content', 'hate speech', 'CSAM'],
    question: 'A multi-layer content safety strategy for AI agents includes:',
    options: { A: 'Training the model only — no additional guardrails needed', B: 'Input filtering + output filtering + human review for high-risk content categories', C: 'Blocking all user-generated content', D: 'Only monitoring outputs without intervention' },
    answer: 'B', explanation: 'Defense in depth requires multiple layers: input filters (block before processing), model alignment (resist harmful generation), output filters (catch failures), and human review for edge cases.' },

  { id: 9011, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'EU AI Act', difficulty: 'hard', keywords: ['EU AI Act', 'high-risk', 'compliance', 'regulation'],
    question: 'Under the EU AI Act, AI systems used in hiring, credit scoring, or law enforcement are classified as:',
    options: { A: 'Low-risk requiring minimal compliance', B: 'High-risk systems requiring conformity assessments, transparency, human oversight, and registration', C: 'Prohibited systems that cannot be deployed in the EU', D: 'Moderate-risk requiring voluntary codes of practice' },
    answer: 'B', explanation: 'The EU AI Act classifies AI for employment, credit, education, and law enforcement as high-risk, requiring mandatory conformity assessments, data governance, technical documentation, and human oversight.' },

  { id: 9012, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Copyright and IP', difficulty: 'medium', keywords: ['copyright', 'IP', 'training data', 'fair use'],
    question: 'When AI agents generate content based on copyrighted training data, organizations should:',
    options: { A: 'Assume all AI-generated content is copyright-free', B: 'Implement policies for IP attribution, avoid reproducing copyrighted works verbatim, and consult legal counsel', C: 'Never use LLMs for content generation', D: 'Require users to waive all IP rights before using AI agents' },
    answer: 'B', explanation: 'LLM copyright law is unsettled. Prudent practice: avoid verbatim reproduction, implement attribution where appropriate, set policies on AI-generated content ownership, and monitor legal developments.' },

  { id: 9013, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Alignment Techniques', difficulty: 'hard', keywords: ['RLHF', 'Constitutional AI', 'DPO', 'alignment'],
    question: 'Direct Preference Optimization (DPO) improves on RLHF by:',
    options: { A: 'Using direct feedback from users instead of human raters', B: 'Directly optimizing model preferences without a separate reward model, simplifying the alignment pipeline', C: 'Directly editing model weights to remove harmful behaviors', D: 'Using direct gradient updates without a value function' },
    answer: 'B', explanation: 'DPO mathematically shows that preference optimization can be done without a separate reward model, directly finetuning on preference data with a simpler, more stable training procedure than RLHF+PPO.' },

  { id: 9014, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Explainability', difficulty: 'medium', keywords: ['explainability', 'XAI', 'SHAP', 'LIME'],
    question: 'Explainability in AI agent decision-making is important for:',
    options: { A: 'Making the model generate longer responses', B: 'Enabling stakeholders to understand, audit, and contest AI decisions — especially in regulated contexts', C: 'Improving inference speed', D: 'Reducing the need for human oversight' },
    answer: 'B', explanation: 'XAI enables trust — users/regulators can verify decisions are reasonable, detect bias, and exercise rights to contest automated decisions as required by GDPR and the EU AI Act.' },

  { id: 9015, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Catastrophic Risk', difficulty: 'hard', keywords: ['catastrophic risk', 'misuse', 'CBRN', 'dual use'],
    question: 'When building AI agents that could assist with dual-use research (legitimate science vs. harmful applications), the recommended approach is:',
    options: { A: 'Allow all scientific queries since intent cannot be determined', B: 'Implement domain-specific guardrails, uplift prevention measures, and human oversight for high-risk queries', C: 'Block all chemistry and biology queries regardless of context', D: 'Require no special handling since LLMs don\'t actually know dangerous information' },
    answer: 'B', explanation: 'Dual-use risks (CBRN materials, bioweapons uplift) require specific detection systems, targeted guardrails (not blanket blocks that harm legitimate research), and human review for borderline cases.' },
];
