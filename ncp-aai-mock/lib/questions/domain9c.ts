import { Question } from '../types';

export const domain9cQuestions: Question[] = [
  { id: 9031, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Responsible Disclosure', difficulty: 'medium', keywords: ['responsible disclosure', 'CVE', 'security vulnerability', 'AI'],
    question: 'Responsible disclosure of AI safety vulnerabilities (jailbreaks, prompt injections) involves:',
    options: { A: 'Publishing vulnerability details immediately for maximum public awareness', B: 'Privately notifying the AI developer with details, providing reasonable time for a fix before public disclosure', C: 'Only disclosing to government agencies, never publicly', D: 'Selling vulnerability details to the highest bidder' },
    answer: 'B', explanation: 'Responsible disclosure (coordinated vulnerability disclosure): notify developer privately → provide 90-day window for fix → coordinate disclosure timing. Prevents mass exploitation while enabling the vendor to patch before attackers can use the information.' },

  { id: 9032, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Consent and Agency', difficulty: 'hard', keywords: ['user agency', 'autonomy', 'consent', 'paternalism'],
    question: 'Balancing AI safety guardrails with user autonomy requires:',
    options: { A: 'Always applying maximum restrictions regardless of user preferences', B: 'Context-appropriate guardrails that prevent genuine harm while respecting adult users\' rights to access information and make informed choices', C: 'Letting users disable all safety features through settings', D: 'User autonomy always overrides safety concerns' },
    answer: 'B', explanation: 'Safety vs autonomy: restrict genuinely harmful content (CSAM, bioweapon synthesis) regardless of user preferences. For dual-use information (knives, chemistry, security research) → context-dependent with age verification and professional credentials.' },

  { id: 9033, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'AI Transparency Reports', difficulty: 'medium', keywords: ['transparency report', 'disclosure', 'statistics', 'public'],
    question: 'AI safety transparency reports from AI companies should include:',
    options: { A: 'Only positive metrics demonstrating model safety', B: 'Content moderation statistics, safety incident counts, policy changes, and known limitations — enabling public accountability', C: 'Proprietary information should never be disclosed for competitive reasons', D: 'Transparency reports are legally required only for search engines' },
    answer: 'B', explanation: 'AI transparency reports: how many harmful outputs were blocked? What categories? How many jailbreak attempts? What policy changes were made? Following social media transparency report norms, enabling researchers and policymakers to assess real-world AI safety.' },

  { id: 9034, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Algorithmic Accountability', difficulty: 'medium', keywords: ['accountability', 'audit', 'algorithm', 'decision'],
    question: 'Algorithmic accountability for AI agents making consequential decisions requires:',
    options: { A: 'Only the AI system being able to audit itself', B: 'External audit rights, decision logging, human override capability, and clear responsibility assignment for AI-influenced outcomes', C: 'Accountability is only needed for fully autonomous AI', D: 'Algorithms are too complex for meaningful external accountability' },
    answer: 'B', explanation: 'Algorithmic accountability: third-party auditors can examine decision process (audit rights), every decision is logged with reasoning (audit trail), humans can reverse AI decisions (override), and legal/organizational responsibility is clearly assigned (accountability).' },

  { id: 9035, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Privacy by Design', difficulty: 'medium', keywords: ['privacy by design', 'data minimization', 'default', 'proactive'],
    question: 'Privacy by Design for AI agents means:',
    options: { A: 'Adding privacy features after the agent is built', B: 'Embedding privacy protections into the agent\'s architecture from the start: collect minimum needed data, anonymize where possible, delete when no longer needed', C: 'Designing agents that only work for private companies', D: 'Using private cloud deployment exclusively' },
    answer: 'B', explanation: 'Privacy by Design (Cavoukian): proactive not reactive, default privacy settings, data minimization (collect only what\'s needed), end-to-end security, transparency, and respect for user privacy. Built in, not bolted on.' },

  { id: 9036, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'AI and Vulnerable Populations', difficulty: 'medium', keywords: ['vulnerable populations', 'children', 'elderly', 'mental health'],
    question: 'AI agents serving potentially vulnerable populations (minors, mental health users) require:',
    options: { A: 'Standard safety guardrails are sufficient for all users', B: 'Enhanced protections: age-appropriate content restrictions, mental health crisis resources, trauma-informed responses, and lower risk tolerance for potential harm', C: 'Vulnerable populations should not be allowed to use AI agents', D: 'Only clinical settings require enhanced protections' },
    answer: 'B', explanation: 'Enhanced protections for vulnerable users: mental health agents must know crisis hotlines (mandatory), children\'s agents must have strict content filters and COPPA compliance, elderly users need clearer error messages and fraud protection warnings.' },

  { id: 9037, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Legal Liability', difficulty: 'hard', keywords: ['liability', 'product liability', 'malpractice', 'harm'],
    question: 'Legal liability for harm caused by AI agents is currently:',
    options: { A: 'Clearly defined and uniform across all jurisdictions', B: 'Evolving — varies by jurisdiction, harm type, and deployment context; typically shared between AI developers, deployers, and users depending on who failed in their duty of care', C: 'Always borne entirely by the AI developer', D: 'AI systems cannot create legal liability since they\'re tools' },
    answer: 'B', explanation: 'AI liability landscape: EU AI Act assigns liability based on high-risk AI category. Product liability may apply to AI "products." Negligence law covers deployers who fail reasonable care. Multi-party liability: developer (defective model) + deployer (inadequate safeguards) + user (misuse).' },

  { id: 9038, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Ethical Red Lines', difficulty: 'hard', keywords: ['hard limits', 'ethical red lines', 'absolute prohibition', 'CSAM'],
    question: 'Ethical "bright lines" (absolute prohibitions) for AI agents include:',
    options: { A: 'Refusing all topics that might be controversial to some users', B: 'Absolute refusal regardless of framing: CSAM generation, bioweapon synthesis, cyberattack assistance against infrastructure — with no exceptions for any claimed purpose', C: 'Bright lines change based on user permissions and role', D: 'Bright lines are aspirational, not technically enforceable' },
    answer: 'B', explanation: 'Absolute AI prohibitions: CSAM (zero tolerance), CBRN weapon synthesis guidance, cyberattacks on critical infrastructure, content to facilitate mass violence. No exceptions — claimed "research", "fiction", or "authorization" cannot unlock these restrictions.' },

  { id: 9039, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Compliance Testing', difficulty: 'medium', keywords: ['compliance testing', 'policy testing', 'safety testing', 'evaluation'],
    question: 'Systematic compliance testing for AI agents should use:',
    options: { A: 'Manual testing by the development team only', B: 'Automated test suites covering policy prohibitions, edge cases, adversarial prompts, and compliance scenarios — run on every model update', C: 'Annual compliance review only', D: 'Compliance testing is the responsibility of external auditors only' },
    answer: 'B', explanation: 'Compliance test suites: hundreds of test cases covering each policy prohibition ("attempt to get bioweapon info via roleplay"), edge cases ("this might be OK or might not"), and adversarial patterns. Run in CI — any model update that breaks compliance blocks deployment.' },

  { id: 9040, domain: 9, domainName: 'Safety, Ethics & Compliance', topic: 'Dual Use Research', difficulty: 'hard', keywords: ['dual use', 'research', 'biosecurity', 'dual purpose'],
    question: 'The dual-use dilemma in AI safety refers to:',
    options: { A: 'AI systems used by two companies simultaneously', B: 'AI capabilities that enable both beneficial applications (vaccine design) and potential misuse (bioweapon design) — requiring careful governance of the same underlying capability', C: 'Software that can run on two operating systems', D: 'AI models that can be fine-tuned for two different purposes' },
    answer: 'B', explanation: 'Dual-use: protein folding AI enables both drug discovery (beneficial) and potential bioweapon design (harmful). Code generation enables legitimate software development and malware creation. Governance challenge: enabling beneficial use while preventing harmful application of same capability.' },
];
