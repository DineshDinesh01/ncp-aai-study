import { Question } from '../types';

export const domain9bQuestions: Question[] = [
  { id: 9016, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Fairness Metrics', difficulty: 'hard', keywords: ['demographic parity', 'equalized odds', 'fairness', 'metrics'],
    question: 'Demographic parity as a fairness metric requires:',
    options: { A: 'Equal accuracy for all demographic groups', B: 'Equal positive prediction rates across demographic groups regardless of actual base rates', C: 'Demographic data must be excluded from all inputs', D: 'Equal numbers of representatives from each demographic in training data' },
    answer: 'B', explanation: 'Demographic parity: P(positive prediction | group A) = P(positive prediction | group B). Note: demographic parity can conflict with accuracy when base rates differ across groups.' },

  { id: 9017, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Model Cards', difficulty: 'easy', keywords: ['model card', 'documentation', 'intended use', 'limitations'],
    question: 'Model cards for AI agents document:',
    options: { A: 'Trading cards featuring AI model designs', B: 'Intended use cases, performance metrics across groups, known limitations, ethical considerations, and misuse risks', C: 'Only technical specifications like parameter count', D: 'Marketing materials for the AI product' },
    answer: 'B', explanation: 'Model cards (Mitchell et al.) provide structured transparency documentation: what the model does, how it performs across demographic groups, known limitations, ethical considerations, and recommended/not-recommended uses.' },

  { id: 9018, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Data Sheets', difficulty: 'medium', keywords: ['datasheets for datasets', 'documentation', 'dataset transparency'],
    question: 'Datasheets for Datasets (Gebru et al.) improve AI safety by:',
    options: { A: 'Providing electrical specifications for GPU data centers', B: 'Documenting dataset composition, collection process, known biases, and intended/prohibited uses for transparency', C: 'Rating data quality on a numerical scale', D: 'Listing all individual data points in the dataset' },
    answer: 'B', explanation: 'Datasheets document how datasets were collected, preprocessed, labeled, and what biases may exist — enabling downstream practitioners to make informed decisions about appropriate use.' },

  { id: 9019, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Toxicity Detection', difficulty: 'medium', keywords: ['toxicity', 'Perspective API', 'classifier', 'content moderation'],
    question: 'Toxicity classifiers in AI agent pipelines are used to:',
    options: { A: 'Detect toxic chemicals in server rooms', B: 'Score text for harmful content (hate speech, threats, harassment) to filter inputs or flag outputs for review', C: 'Measure the toxicity of training data collections', D: 'Detect code vulnerabilities in agent implementations' },
    answer: 'B', explanation: 'Toxicity classifiers (Perspective API, NVIDIA\'s models) score text on harmful content dimensions — used in input pre-filtering (block before processing) and output post-filtering (catch generated harmful content).' },

  { id: 9020, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Privacy-Preserving AI', difficulty: 'hard', keywords: ['differential privacy', 'federated learning', 'privacy', 'PET'],
    question: 'Differential privacy in LLM fine-tuning protects against:',
    options: { A: 'Data center power outages', B: 'Membership inference attacks — adding calibrated noise during training prevents the model from memorizing individual training examples', C: 'Differential latency between GPU nodes', D: 'Copyright violations in training data' },
    answer: 'B', explanation: 'Differential privacy adds noise to gradients during training (DP-SGD), providing mathematical guarantees that individual training examples can\'t be extracted from model outputs via membership inference attacks.' },

  { id: 9021, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Adversarial Robustness', difficulty: 'hard', keywords: ['adversarial', 'robustness', 'attack', 'defense'],
    question: 'Adversarial training improves AI agent robustness by:',
    options: { A: 'Training agents to be adversarial toward users', B: 'Including adversarial examples (modified inputs designed to fool the model) during fine-tuning to improve resistance', C: 'Using adversarial hardware for training', D: 'Having adversarial teams review all agent responses' },
    answer: 'B', explanation: 'Adversarial training: generate adversarial inputs (slight perturbations that cause wrong outputs), include them in training → model learns to be robust to these inputs while maintaining accuracy on clean inputs.' },

  { id: 9022, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'CCPA Compliance', difficulty: 'medium', keywords: ['CCPA', 'California', 'privacy rights', 'consumer'],
    question: 'Under CCPA, California consumers have the right to:',
    options: { A: 'Access free AI services from California companies', B: 'Know what personal data AI companies collect, request deletion, and opt out of data sale to third parties', C: 'Correct AI-generated misinformation about themselves only in California', D: 'CCPA only applies to physical goods, not AI services' },
    answer: 'B', explanation: 'CCPA grants: right to know (what\'s collected), right to delete, right to opt out of data selling, right to non-discrimination for exercising rights — applying to any business serving California residents at scale.' },

  { id: 9023, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Incident Disclosure', difficulty: 'medium', keywords: ['disclosure', 'breach', 'notification', 'transparency'],
    question: 'AI safety incident disclosure is important because:',
    options: { A: 'Legal requirements mandate disclosure of all AI errors', B: 'Transparency about failures enables industry-wide learning and maintains public trust in AI systems', C: 'Disclosure attracts investment to AI safety research', D: 'Incidents can only be fixed after public disclosure' },
    answer: 'B', explanation: 'Transparent incident disclosure (even voluntary) enables the broader community to learn from failures, identify systemic issues, and build better safety practices — building long-term trust even as short-term trust takes a hit.' },

  { id: 9024, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'AI Governance', difficulty: 'medium', keywords: ['governance', 'committee', 'review board', 'policy'],
    question: 'An AI governance committee in an enterprise organization is responsible for:',
    options: { A: 'Writing code for AI agents', B: 'Establishing policies for responsible AI use, approving high-risk deployments, and monitoring compliance across the organization', C: 'Managing GPU procurement for AI projects', D: 'Providing government oversight of AI companies' },
    answer: 'B', explanation: 'AI governance committees: define acceptable use policies, require impact assessments for high-risk AI, review sensitive deployments, and ensure compliance with regulations and ethical principles across the organization.' },

  { id: 9025, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Misinformation', difficulty: 'medium', keywords: ['misinformation', 'factuality', 'citation', 'grounding'],
    question: 'To prevent AI agents from spreading misinformation, developers should implement:',
    options: { A: 'Block all queries about news or current events', B: 'Grounding in verified sources, requiring citations, expressing uncertainty, and fact-checking tool integration', C: 'Only answer questions with yes or no to avoid elaboration errors', D: 'Let users decide what is true based on AI outputs' },
    answer: 'B', explanation: 'Anti-misinformation measures: RAG with authoritative sources, citation requirements, calibrated uncertainty expression ("I\'m not certain..."), and fact-checking tool calls for important claims.' },

  { id: 9026, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'NIST AI RMF', difficulty: 'hard', keywords: ['NIST AI RMF', 'risk management', 'framework', 'govern'],
    question: 'The NIST AI Risk Management Framework\'s four core functions are:',
    options: { A: 'Plan, Design, Test, Deploy', B: 'Govern, Map, Measure, Manage — covering organizational context, risk identification, measurement, and ongoing management', C: 'Identify, Protect, Detect, Respond', D: 'Data, Model, Deploy, Monitor' },
    answer: 'B', explanation: 'NIST AI RMF: Govern (organizational AI risk culture and accountability), Map (identify AI context and risks), Measure (analyze and assess risks), Manage (prioritize and treat risks with ongoing monitoring).' },

  { id: 9027, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Harm Categories', difficulty: 'medium', keywords: ['harm', 'categories', 'physical', 'psychological', 'financial'],
    question: 'AI harm taxonomies categorize potential AI harms as:',
    options: { A: 'Only financial harms to companies deploying AI', B: 'Multiple categories: physical (injury), psychological (distress), financial (fraud), societal (discrimination), privacy, and reputational harms', C: 'Only harms to the AI system itself', D: 'Harms are not categorizable — each is unique' },
    answer: 'B', explanation: 'Harm taxonomies enable systematic risk assessment. Physical harms (incorrect medical advice), psychological (manipulation), financial (scam facilitation), societal (discrimination), and privacy harms each require different mitigations.' },

  { id: 9028, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Ethical AI Deployment', difficulty: 'easy', keywords: ['ethics', 'deployment', 'impact assessment', 'stakeholders'],
    question: 'An AI Impact Assessment before deploying a new agent should evaluate:',
    options: { A: 'Only the technical performance metrics', B: 'Potential benefits and harms to all stakeholders, privacy implications, fairness impacts, and legal compliance', C: 'Only the cost and timeline of deployment', D: 'Impact on the company\'s stock price' },
    answer: 'B', explanation: 'AI Impact Assessments (required by EU AI Act for high-risk systems) systematically evaluate: who benefits, who might be harmed, what data is used, whether it perpetuates discrimination, and legal compliance.' },

  { id: 9029, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Watermarking', difficulty: 'hard', keywords: ['watermarking', 'AI detection', 'provenance', 'synthetic'],
    question: 'AI-generated content watermarking serves to:',
    options: { A: 'Protect AI company intellectual property', B: 'Embed imperceptible signals in AI-generated content enabling origin attribution and detection as AI-generated', C: 'Improve the visual quality of AI-generated images', D: 'Watermark GPU drivers for license compliance' },
    answer: 'B', explanation: 'Watermarking (e.g., Google\'s SynthID) embeds subtle statistical patterns in AI outputs. Detectors can identify AI-generated content, enabling provenance tracking and disclosure compliance.' },

  { id: 9030, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Supply Chain AI Safety', difficulty: 'hard', keywords: ['supply chain', 'third party', 'model provenance', 'vetting'],
    question: 'AI supply chain risks include:',
    options: { A: 'Physical supply of GPU chips to AI companies', B: 'Backdoored pre-trained models, poisoned datasets, and malicious plugins from third-party providers compromising deployed agents', C: 'Supply of electricity to data centers', D: 'Shortage of AI engineers in the talent supply chain' },
    answer: 'B', explanation: 'AI supply chain attacks: poisoned base models (with backdoors activated by specific triggers), compromised datasets, malicious tool plugins, or tampered model checkpoints from untrusted sources.' },
];
