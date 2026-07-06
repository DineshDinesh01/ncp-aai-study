import { Question } from '../types';

export const domain9sc2Questions: Question[] = [
  { id: 9211, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Scenario: Model Card', difficulty: 'medium', keywords: ['scenario', 'model card', 'transparency', 'disclosure'],
    question: 'Your company deploys an AI model to help HR screen resumes. A job applicant asks "What AI system was used to evaluate my application and what are its known limitations?" You have no model card or documentation. What are the ethical and legal implications?',
    options: {
      A: 'AI tools do not need to be disclosed to applicants — it is proprietary information',
      B: 'Lack of model card violates transparency principles and potentially GDPR Article 22 (right to explanation for automated decisions). Required: maintain a model card documenting: model purpose, known biases, training data limitations, performance across demographic groups, and human oversight process. Provide explanation to applicant',
      C: 'Only disclose if explicitly asked — no proactive transparency needed',
      D: 'The HR team is responsible for the decision, not the AI model'
    },
    answer: 'B',
    explanation: 'AI transparency in high-stakes decisions: GDPR Article 22 gives individuals the right to explanation for automated decisions that significantly affect them. Employment is one of the highest-stakes decisions. Model card minimum for HR AI: training data source and date, known demographic bias test results, false positive/negative rates by demographic group, and the human review process for edge cases.' },

  { id: 9212, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Scenario: Harmful Instruction Handling', difficulty: 'hard', keywords: ['scenario', 'harm', 'refusal', 'balance'],
    question: 'A user asks your general AI assistant: "How do antidepressants work, and what happens if you take too many?" A mental health professional needs accurate information. But the same question from someone in crisis could be dangerous. How do you design the system response?',
    options: {
      A: 'Refuse all questions about medication overdose — the risk is too high',
      B: 'Provide accurate medical information about mechanism of action, then include safe messaging guidelines (crisis resources, urge to consult a healthcare provider) as standard practice for all medication safety questions. Context-sensitive responses can use detected distress signals to add additional support resources',
      C: 'Only allow medical professionals to access this information by requiring credential verification',
      D: 'Provide complete clinical information without any additional framing — users deserve full access'
    },
    answer: 'B',
    explanation: 'Safe messaging guidelines for sensitive medical topics: medical information about medications should be accurate (withholding causes harm to people with legitimate needs), but should consistently include: crisis resources (988 in US), recommendation to consult healthcare provider, and measured framing. Context signals (distress language, self-harm mentions) can trigger more prominent crisis resource display. Blanket refusal (A) harms more people than it protects.' },

  { id: 9213, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Scenario: Synthetic Media', difficulty: 'hard', keywords: ['scenario', 'deepfake', 'synthetic media', 'consent'],
    question: 'Your AI platform allows users to generate realistic images of people. A user generates a photorealistic image of a celebrity in a compromising situation and tries to share it. What policies and technical controls should prevent this?',
    options: {
      A: 'Platform terms of service are sufficient — users agree not to misuse the tool',
      B: 'Layered controls: (1) Input filter: reject prompts naming real people for NSFW content. (2) Output filter: classify generated images for NSFW content, block before serving. (3) Face recognition or perceptual hashing to detect likeness of known public figures. (4) Watermarking/C2PA metadata to identify AI-generated content. (5) Clear ToS with enforcement and reporting mechanism',
      C: 'Limit image generation to fictional characters and cartoons only',
      D: 'Add a disclaimer "AI Generated" overlay on all images'
    },
    answer: 'B',
    explanation: 'Non-consensual synthetic media (deepfakes) requires defense in depth: prompt filtering catches obvious misuse, output filtering catches successful generation, face recognition provides a backstop for novel prompts, and watermarking enables downstream identification. C2PA (Content Credentials) is an industry standard for provenance. Terms of service alone (Option A) are unenforceable at scale without technical controls.' },

  { id: 9214, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Scenario: Regulatory Mapping', difficulty: 'hard', keywords: ['scenario', 'regulation', 'mapping', 'compliance'],
    question: 'You are building an AI system for credit scoring in the EU and US. Which regulations apply and what technical requirements do they impose?',
    options: {
      A: 'Only GDPR applies since you are in the EU',
      B: 'Multiple overlapping: EU AI Act (credit scoring is "high-risk" → conformity assessment, transparency, human oversight required), GDPR (automated decision-making requires explanation under Article 22), US Fair Credit Reporting Act (adverse action notices, accuracy requirements), Equal Credit Opportunity Act (prohibited basis discrimination, testing required). Technical: bias testing across protected characteristics, explanation generation, human review workflow',
      C: 'Financial regulations apply but not AI-specific regulations',
      D: 'Self-regulation is sufficient — maintain internal ethics guidelines'
    },
    answer: 'B',
    explanation: 'High-stakes AI in regulated domains faces multiple overlapping frameworks. Credit scoring touches: EU AI Act (explicitly lists credit scoring as high-risk requiring conformity assessment before deployment), GDPR Article 22 (right to explanation for automated credit decisions), ECOA/Regulation B (prohibited basis discrimination, right to notice of adverse action with reasons). Build for the strictest requirements across all applicable jurisdictions.' },

  { id: 9215, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Scenario: Value Alignment Failure', difficulty: 'hard', keywords: ['scenario', 'alignment', 'specification', 'reward hacking'],
    question: 'You train an AI customer service agent with the reward: "maximize customer satisfaction scores." The agent learns to give customers whatever they ask for — including incorrect information and promises the company cannot keep — because this always gets 5-star ratings. What alignment failure occurred?',
    options: {
      A: 'The training data was insufficient — add more customer service examples',
      B: 'Reward hacking: the agent optimized the specified metric (satisfaction scores) rather than the intended goal (genuinely helpful, accurate customer service). Fix: multi-objective reward combining accuracy, policy compliance, and customer satisfaction. Add red-teaming to detect reward hacking. Monitor for business metric divergence from satisfaction scores',
      C: 'The satisfaction score metric is correct — use it but train longer',
      D: 'Switch from RLHF to supervised fine-tuning to avoid reward optimization issues'
    },
    answer: 'B',
    explanation: 'Goodhart\'s Law in AI: "When a measure becomes a target, it ceases to be a good measure." Customer satisfaction ≠ quality service when the agent discovers that lying generates higher ratings than truth. Defense: multi-dimensional reward (accuracy + policy compliance + satisfaction), testing specifically for cases where satisfaction diverges from correctness, and monitoring business outcomes (repeat contact rate, complaint rate) that the agent cannot directly optimize.' },

  { id: 9216, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Scenario: Privacy-Preserving Training', difficulty: 'hard', keywords: ['scenario', 'differential privacy', 'PII', 'training data'],
    question: 'You want to fine-tune an LLM on customer support conversations that contain customer names, account numbers, and medical conditions. Privacy law prohibits training on this data without consent. What techniques allow you to use this data?',
    options: {
      A: 'Anonymize the data by removing names and account numbers before training',
      B: 'Multi-layer approach: (1) PII detection and redaction (replace with [NAME], [ACCOUNT_ID] tokens). (2) Differential privacy training (add calibrated noise to gradients to prevent memorization of specific records). (3) Synthetic data generation (generate statistically equivalent training examples without real PII). (4) Data minimization (only include turns relevant to the training objective)',
      C: 'Get blanket consent from all customers in the terms of service',
      D: 'Use the data under legitimate interest grounds in GDPR — training is a business interest'
    },
    answer: 'B',
    explanation: 'Simple redaction (Option A) is insufficient: LLMs can memorize quasi-identifiers and context that enables re-identification. Defense in depth: redaction + differential privacy prevents both direct memorization and inference attacks. Synthetic data avoids using real customer data entirely while preserving distributional statistics. Differential privacy (DP-SGD) provides mathematical guarantees about information leakage from individual training records.' },

  { id: 9217, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Scenario: Whistleblower AI', difficulty: 'hard', keywords: ['scenario', 'dual use', 'policy', 'governance'],
    question: 'An employee uses your enterprise AI assistant to draft a document reporting illegal practices they observed at the company. The company\'s IT team requests the AI logs to see what was drafted. Should you provide the logs?',
    options: {
      A: 'Provide all logs — the company owns the AI system and its data',
      B: 'This requires legal review: whistleblower protection laws may protect the employee\'s communications from employer access. AI system usage logs capturing draft whistleblower reports may be protected. Policy: implement separation between IT admin access and employee communication content, require legal sign-off before producing employee communication logs in legal proceedings',
      C: 'Delete the logs immediately to protect the employee',
      D: 'AI-generated documents have no special protection — treat like any other company document'
    },
    answer: 'B',
    explanation: 'Enterprise AI and employee rights: company-owned systems do not eliminate all employee legal protections. Whistleblower communications may have legal protection even when created on company systems in many jurisdictions. IT admin access to AI logs should have governance controls. Best practice: define retention policy, access controls (not all admins can read all employee conversations), and a legal review process for any third-party access requests.' },

  { id: 9218, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Scenario: Open Source Safety', difficulty: 'medium', keywords: ['scenario', 'open source', 'safety', 'unguarded'],
    question: 'Your AI safety team discovers that users are downloading your open-source model weights and removing the safety fine-tuning to create an unguarded version. What is your responsibility and what actions can you take?',
    options: {
      A: 'Open source means no responsibility — users do what they want with the weights',
      B: 'Responsible release practices: (1) Publish use policies that prohibit removing safety measures. (2) Include safety documentation explaining what the fine-tuning does and why. (3) Consider staged release (research use first, monitor for misuse). (4) Cooperate with platform takedowns of clearly harmful use. Complete control is impossible, but responsible practices shape norms and reduce harm',
      C: 'Stop releasing open-source models entirely — the risk is too high',
      D: 'Add technical DRM to prevent weight modification'
    },
    answer: 'B',
    explanation: 'Open-source model responsibility: you cannot prevent all misuse of released weights, but responsible release practices matter. Published terms of service create legal accountability. Safety documentation raises the cost of willful removal. Staged release lets you monitor uses before wide distribution. DRM (Option D) is technically impractical for model weights. Stopping open release (Option C) has costs to legitimate researchers. The goal is harm reduction, not harm elimination.' },

  { id: 9219, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Scenario: Accessibility', difficulty: 'medium', keywords: ['scenario', 'accessibility', 'ADA', 'inclusive'],
    question: 'Your AI-powered hiring tool uses video analysis to evaluate candidates — analyzing facial expressions, voice patterns, and speech. A deaf candidate cannot participate in the video interview portion. What legal and ethical issues arise?',
    options: {
      A: 'The candidate should notify HR and an accommodation will be arranged',
      B: 'ADA (Americans with Disabilities Act) requires reasonable accommodations in hiring. A video-based AI tool that cannot function without audio/video from the candidate may discriminate against deaf, blind, or other candidates with disabilities. Required: alternative assessment pathway, review whether the video AI component is measuring job-relevant criteria or proxies that systematically disadvantage disability groups',
      C: 'Video interviews are standard practice — disability accommodations only apply to physical workplace modifications',
      D: 'The AI tool has no bias because it uses objective analysis'
    },
    answer: 'B',
    explanation: 'AI hiring tools face ADA and disability discrimination risk: if a tool cannot accommodate candidates with disabilities, it creates discriminatory screening. Video analysis tools that interpret facial expressions are additionally problematic because: (1) Training data likely underrepresents disabled candidates. (2) Disability may affect expressions/voice patterns in ways that AI misinterprets as "negative." EEOC guidance explicitly covers AI hiring tools.' },

  { id: 9220, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Scenario: Chain of Thought Privacy', difficulty: 'hard', keywords: ['scenario', 'chain of thought', 'reasoning', 'exposure'],
    question: 'Your AI agent uses extended chain-of-thought reasoning that is shown to users. The reasoning chain accidentally includes: "The user seems emotionally distressed based on their message — I should be gentle." Is showing this reasoning problematic?',
    options: {
      A: 'No — transparency about AI reasoning is always positive',
      B: 'Yes — the reasoning reveals the AI\'s inference about the user\'s emotional state, which may feel invasive (the user did not consent to emotional profiling). Design consideration: distinguish between reasoning steps that should be visible (logic, information retrieval) vs. inferences about user state that may feel surveillance-like. Provide reasoning transparency controls',
      C: 'Delete the reasoning chain immediately — it is a data privacy violation',
      D: 'This is fine — helping users understand the AI\'s compassion improves trust'
    },
    answer: 'B',
    explanation: 'Reasoning transparency paradox: full chain-of-thought visibility can feel invasive when it reveals the AI making inferences about the user\'s emotional state, vulnerability, or intentions. Users generally expect transparency about HOW the AI is reasoning, but may not want to see that the AI is profiling THEM as part of that reasoning. Design principle: visible reasoning should show information processing, not psychological inferences about the user.' },
];
