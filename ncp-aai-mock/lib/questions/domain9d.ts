import { Question } from '../types';

export const domain9dQuestions: Question[] = [
  { id: 9041, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Bias Auditing', difficulty: 'medium', keywords: ['bias audit', 'fairness', 'third-party', 'audit'],
    question: 'External bias audits for AI systems differ from internal testing by:',
    options: { A: 'External audits are more expensive but provide the same value', B: 'Independent auditors without organizational incentives to minimize findings can credibly identify biases the internal team may overlook or downplay', C: 'External audits only check technical metrics, not ethical ones', D: 'External audits are only required for government AI systems' },
    answer: 'B', explanation: 'External bias audits: independent auditors with no stake in favorable results → credible, comprehensive bias assessment → public accountability. NYC Local Law 144 requires annual independent bias audits for automated employment decision tools. Trend toward mandatory third-party auditing.' },

  { id: 9042, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Privacy Enhancing Technologies', difficulty: 'hard', keywords: ['homomorphic encryption', 'secure computation', 'privacy', 'federated'],
    question: 'Federated learning preserves privacy by:',
    options: { A: 'Encrypting all training data before sending to the model', B: 'Training models on local data at each client site and only sharing model updates (gradients) rather than raw data — data never leaves the client environment', C: 'Federating data across multiple federal agencies', D: 'Privacy is preserved by anonymizing data before sending for training' },
    answer: 'B', explanation: 'Federated learning: hospital A trains on its patient data → sends gradient update (not patient data) to central server → server aggregates updates from all hospitals → improved model sent back. Medical data never leaves the hospital. Combine with differential privacy for gradient privacy.' },

  { id: 9043, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Algorithmic Transparency', difficulty: 'medium', keywords: ['XAI', 'explanability', 'transparency', 'GDPR'],
    question: 'The right to explanation under GDPR Article 22 requires AI systems to:',
    options: { A: 'Open source all AI model code', B: 'Provide meaningful information about the logic of automated decision-making when decisions significantly affect individuals (loan approval, hiring, medical diagnosis)', C: 'Disclose all training data used', D: 'Publish model weights publicly for verification' },
    answer: 'B', explanation: 'GDPR Article 22: individuals have right to not be subject to solely automated decisions with legal/significant effects. When such systems exist → must provide meaningful explanation of logic involved. "Your loan was denied because debt-to-income ratio of 45% exceeded our threshold of 36%."' },

  { id: 9044, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Environmental Responsibility', difficulty: 'medium', keywords: ['carbon footprint', 'energy', 'sustainable', 'green AI'],
    question: 'Responsible AI development includes minimizing environmental impact by:',
    options: { A: 'Environmental concerns are irrelevant to AI development', B: 'Training efficiency improvements (hardware, architecture), model pruning/distillation for inference, green energy sourcing, and reporting compute/energy usage in publications', C: 'Only large organizations need to consider AI environmental impact', D: 'Using CPU instead of GPU always reduces environmental impact' },
    answer: 'B', explanation: 'Green AI: reporting CO2 equivalent per model (model cards), using renewable energy data centers, preferring more efficient architectures over brute-force scaling, knowledge distillation to create smaller models for deployment. Training a large LLM emits ~300 tons CO2.' },

  { id: 9045, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Consent in AI Systems', difficulty: 'medium', keywords: ['consent', 'opt-in', 'opt-out', 'informed consent'],
    question: 'Meaningful informed consent for AI system interactions requires:',
    options: { A: 'A 50-page terms of service document covering all AI capabilities', B: 'Clear disclosure of what AI can/cannot do, how data is used, what is retained, and genuine opt-out alternatives — in plain language before engagement', C: 'Only required for medical and legal AI applications', D: 'Consent is implied by continued use of the service' },
    answer: 'B', explanation: 'Informed consent for AI: "This conversation is handled by AI (Claude). Your messages may be used to improve future AI systems. You can request human assistance at any time. [Allow / Decline data use]". Genuine consent requires alternatives to consent — can still use service if they decline data use.' },

  { id: 9046, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'AI Incident Classification', difficulty: 'hard', keywords: ['AI incident', 'severity', 'classification', 'response'],
    question: 'AI-specific incident severity classification differs from traditional software because:',
    options: { A: 'AI incidents are always more severe than software bugs', B: 'AI failures include harm-based dimensions: who is harmed (individuals vs groups), severity of harm (inconvenience vs physical harm), and reversibility — requiring severity scales beyond availability/performance', C: 'AI incidents only include system downtime', D: 'AI incident severity is determined solely by the number of affected users' },
    answer: 'B', explanation: 'AI incident severity dimensions: (1) System impact (downtime). (2) Output harm (wrong info, bias). (3) Affected population (individual, demographic group, society). (4) Harm reversibility (embarrassment vs financial loss vs physical harm). Severity 1 ≠ just outage — could be discriminatory outputs at scale.' },

  { id: 9047, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Power Concentration Risks', difficulty: 'hard', keywords: ['power concentration', 'lock-in', 'monopoly', 'governance'],
    question: 'Risks of AI power concentration (few organizations controlling powerful AI) include:',
    options: { A: 'Power concentration is beneficial because large organizations maintain safety better', B: 'Excessive concentration enables unilateral influence over economies, governments, and information ecosystems without accountability — undermining democratic oversight', C: 'Power concentration only matters for nation-states, not corporations', D: 'Market competition naturally prevents harmful AI power concentration' },
    answer: 'B', explanation: 'AI power concentration risks: single entity controlling critical AI infrastructure can: manipulate information at scale, extract economic rent, resist oversight, create dependencies that are impossible to undo. Responsible AI development avoids actions that give any single entity (including Anthropic/NVIDIA) disproportionate AI control.' },

  { id: 9048, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Contestability', difficulty: 'medium', keywords: ['contestability', 'appeal', 'override', 'human review'],
    question: 'Contestability mechanisms for AI decisions provide:',
    options: { A: 'Ways for users to contest the terms of service', B: 'Pathways for affected individuals to challenge AI decisions and have them reviewed by humans — essential for high-stakes automated decisions', C: 'Mechanisms for AI systems to contest human overrides', D: 'Contestability is only required for government AI, not commercial AI' },
    answer: 'B', explanation: 'Contestability: loan denied by AI → applicant can request human review → human examiner reviews case → decision reconsidered. Required by GDPR Article 22, proposed EU AI Act. AI decisions affecting employment, credit, housing, healthcare must be contestable by affected individuals.' },

  { id: 9049, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Safety Evaluation Red Teaming', difficulty: 'medium', keywords: ['red team', 'safety testing', 'adversarial', 'attack'],
    question: 'AI red team exercises assess safety by:',
    options: { A: 'Testing the system with standard use cases only', B: 'Adversarially probing the system with creative, realistic harmful scenarios to find failure modes before deployment — simulating malicious or careless users', C: 'Red teaming is only performed by external security firms', D: 'Red team findings are kept confidential and not used to improve the system' },
    answer: 'B', explanation: 'AI red teaming: diverse team (security, ethics, domain experts, diverse demographics) attempts to elicit harmful outputs through roleplay, jailbreaks, edge cases, multi-step manipulation. Findings directly inform safety mitigations before deployment. Ongoing red teaming as new capabilities emerge.' },

  { id: 9050, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Documentation Requirements', difficulty: 'easy', keywords: ['documentation', 'audit trail', 'compliance', 'regulatory'],
    question: 'AI system documentation required for compliance typically includes:',
    options: { A: 'Only technical architecture diagrams', B: 'Training data sources and quality, model architecture, intended use and limitations, performance metrics by subgroup, update history, and risk assessment', C: 'Documentation is optional if the system performs well', D: 'Only required after a compliance failure occurs' },
    answer: 'B', explanation: 'Compliance documentation: system card/model card, data provenance records, evaluation results (including demographic breakdowns), bias audit results, privacy impact assessment, security assessment, incident history, and change log. Required for EU AI Act, emerging global AI regulations.' },
];
