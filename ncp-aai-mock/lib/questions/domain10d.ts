import { Question } from '../types';

export const domain10dQuestions: Question[] = [
  { id: 10046, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Appropriate Reliance', difficulty: 'hard', keywords: ['appropriate reliance', 'calibration', 'trust', 'human judgment'],
    question: 'Appropriate reliance on AI systems means users:',
    options: { A: 'Follow AI recommendations for all decisions without question', B: 'Rely on AI when it is reliable (high accuracy, clear reasoning) and apply skepticism when it is less reliable (novel situations, high stakes) — calibrated to actual AI performance', C: 'Never rely on AI for important decisions', D: 'Reliance should be uniform regardless of task type' },
    answer: 'B', explanation: 'Appropriate reliance: using AI for routine, well-practiced tasks where it performs well; applying more scrutiny for edge cases, high-stakes decisions, and novel domains. UI design supports calibration: show confidence levels, cite sources, flag low-confidence responses.' },

  { id: 10047, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Oversight Fatigue', difficulty: 'medium', keywords: ['oversight fatigue', 'alert fatigue', 'vigilance', 'automation'],
    question: 'Oversight fatigue in human-AI collaboration occurs when:',
    options: { A: 'Humans become physically tired from using AI tools', B: 'Frequent monitoring demands degrade vigilance — humans become less attentive to AI outputs after long periods of reviewing mostly-correct suggestions', C: 'AI systems become fatigued from continuous operation', D: 'Oversight fatigue is a myth — humans maintain consistent vigilance' },
    answer: 'B', explanation: 'Oversight fatigue: email triage AI is right 99.5% of the time → human clicks "approve" thousands of times without reading → when it fails (0.5%), human misses it. Mitigations: mandatory manual check for high-stakes items, varied interface requiring active engagement, rotation of oversight responsibilities.' },

  { id: 10048, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Personalization Ethics', difficulty: 'hard', keywords: ['personalization', 'filter bubble', 'echo chamber', 'manipulation'],
    question: 'Filter bubbles created by personalized AI recommendations risk:',
    options: { A: 'Reducing response personalization and user satisfaction', B: 'Narrowing users\' information exposure to content confirming existing beliefs — limiting epistemic diversity and potentially enabling manipulation', C: 'Filter bubbles only affect social media, not AI assistants', D: 'Personalization always improves user experience without downsides' },
    answer: 'B', explanation: 'Filter bubble risks in AI: personalized AI assistant learns user preferences → consistently recommends confirming content → user exposed to narrowing information set → beliefs polarize → reality perception distorted. Responsible design: diversity injection, user control over personalization, transparency about curation.' },

  { id: 10049, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Feedback Loop Design', difficulty: 'medium', keywords: ['feedback loop', 'RLHF', 'correction', 'user signal'],
    question: 'Implicit user feedback signals for AI improvement include:',
    options: { A: 'Only explicit star ratings submitted by users', B: 'Editing AI responses, abandoning conversations, rephrasing questions, copying vs. not copying output, and time-to-next-query — all indicating satisfaction without explicit ratings', C: 'Implicit signals are not reliable enough for model training', D: 'Only positive feedback should be collected to maintain morale' },
    answer: 'B', explanation: 'Implicit signals: user edits AI response → strong negative signal about response quality. User copies entire response → strong positive. User asks same question again → AI answer was unhelpful. Time-spent reading long response → engagement signal. These scale to millions of data points without annotation cost.' },

  { id: 10050, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Collaborative Intelligence', difficulty: 'medium', keywords: ['human-AI team', 'hybrid intelligence', 'augmentation', 'collaboration'],
    question: 'The best human-AI collaborative outcomes occur when:',
    options: { A: 'AI maximizes autonomy and minimizes human involvement', B: 'AI handles cognitive tasks at its strengths (speed, consistency, breadth) while humans contribute judgment, ethics, creativity, and accountability — each amplifying the other', C: 'Humans always make final decisions without AI input', D: 'AI gradually replaces all human cognitive tasks over time' },
    answer: 'B', explanation: 'Centaur model: human + AI > human alone or AI alone. AI: rapid search, pattern matching, synthesis, consistency. Human: contextual judgment, ethical reasoning, creativity, accountability. Design for augmentation not replacement — the goal is to expand human capabilities, not substitute for them.' },
];
