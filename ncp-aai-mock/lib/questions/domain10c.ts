import { Question } from '../types';

export const domain10cQuestions: Question[] = [
  { id: 10036, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'AI Disclosure', difficulty: 'easy', keywords: ['disclosure', 'AI identity', 'transparency', 'chatbot'],
    question: 'When AI agent disclosure to users is legally or ethically required:',
    options: { A: 'Only when the user directly asks "are you a human?"', B: 'At the start of any interaction where users could reasonably believe they are speaking with a human, before they form incorrect beliefs', C: 'Disclosure is never legally required for AI systems', D: 'Only for medical and legal AI applications' },
    answer: 'B', explanation: 'Proactive disclosure: EU AI Act requires disclosure when AI interacts with humans. US FTC guidance: deceptive AI personas are unfair/deceptive. Don\'t wait until asked — disclose AI nature before users develop false beliefs that affect their behavior.' },

  { id: 10037, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Appropriate Reliance', difficulty: 'hard', keywords: ['appropriate reliance', 'over-reliance', 'under-reliance', 'trust'],
    question: 'Under-reliance on AI agents occurs when:',
    options: { A: 'Users use AI agents less than once per day', B: 'Users apply excessive skepticism and ignore accurate AI recommendations, negating the productivity benefits of the AI system', C: 'AI agents are deployed in under-resourced settings', D: 'Users rely less on AI during training periods' },
    answer: 'B', explanation: 'Under-reliance: user consistently overrides accurate AI recommendations ("I don\'t trust the AI\'s analysis") → AI provides no benefit. As harmful as over-reliance for overall system performance. Appropriate reliance = trust when AI is likely right, question when it might be wrong.' },

  { id: 10038, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Counterfactual Communication', difficulty: 'medium', keywords: ['counterfactual', 'explanation', 'recourse', 'what-if'],
    question: 'Counterfactual explanations in AI decisions tell users:',
    options: { A: 'What the AI would have done in a counter-universe', B: '"What would need to change for the decision to be different?" — enabling actionable recourse ("if your income were $X higher, the loan would be approved")', C: 'Historical counterfactuals about how decisions would have differed in the past', D: 'Counterfactual explanations are only for researchers, not end users' },
    answer: 'B', explanation: 'Counterfactual explanations: actionable recourse. "Your credit score is 620, limit 680 → increase credit score by 60 points" enables action. Pure "why" explanation ("score is too low") provides no actionable path. Required by GDPR right to explanation.' },

  { id: 10039, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Value Alignment in Interaction', difficulty: 'hard', keywords: ['value alignment', 'user values', 'preference', 'elicitation'],
    question: 'Eliciting user values and preferences for AI agent alignment in practice involves:',
    options: { A: 'Asking users to fill out a 100-question value questionnaire before use', B: 'Implicit learning from user interactions, ratings, and corrections combined with explicit preference settings for key alignment dimensions', C: 'All users receive identical value alignment settings', D: 'Value alignment is determined by the AI developer, not users' },
    answer: 'B', explanation: 'Practical value elicitation: explicit settings (conciseness level, expertise assumed, communication style) + implicit learning (accepted vs rejected suggestions, thumbs up/down, edit patterns) + periodic preference check-ins. Balance ease with personalization.' },

  { id: 10040, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Interface Patterns for Oversight', difficulty: 'medium', keywords: ['interface', 'oversight', 'review', 'intervention'],
    question: 'Effective human oversight UI for AI agent systems should provide:',
    options: { A: 'Real-time video feed of agent server rooms', B: 'Action preview before execution, easy approve/reject/modify controls, clear confidence signals, and one-click rollback for recent actions', C: 'Text logs of all agent actions without interaction controls', D: 'Oversight UI should be hidden from end users to avoid confusion' },
    answer: 'B', explanation: 'Oversight UI: "The agent is about to send this email. [Approve] [Edit] [Cancel]" before consequential actions. Confidence displayed: "High confidence this is the right action." Recent action history with [Undo] buttons. Enables active oversight without interrupting flow.' },

  { id: 10041, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Cultural Sensitivity', difficulty: 'medium', keywords: ['cultural', 'localization', 'bias', 'global'],
    question: 'Culturally sensitive AI agent design addresses:',
    options: { A: 'Translating responses into different languages only', B: 'Cultural differences in communication styles, value systems, implicit norms, and sensitive topics that vary significantly across regions and communities', C: 'Using culture-specific emojis in responses', D: 'Cultural sensitivity is only relevant for entertainment AI applications' },
    answer: 'B', explanation: 'Cultural AI sensitivity: directness norms differ (US vs Japan), privacy expectations vary (individualist vs collectivist cultures), humor is culturally specific, religious sensitivities differ by region. Global AI agents need cultural intelligence beyond language translation.' },

  { id: 10042, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Uncertainty Communication', difficulty: 'medium', keywords: ['uncertainty', 'confidence', 'hedging', 'communication'],
    question: 'AI agents should communicate uncertainty when:',
    options: { A: 'Never — users prefer confident responses', B: 'The information may be incomplete, outdated, or outside the agent\'s expertise — using hedges that accurately convey the confidence level', C: 'Only when explicitly asked about confidence', D: 'Always include maximum uncertainty warnings to avoid liability' },
    answer: 'B', explanation: 'Calibrated uncertainty: "Based on my training data through 2024, the rate is approximately 3%—you should verify this for current figures." Vs confidently stating an outdated figure. Honest uncertainty enables users to decide when to verify, rather than blindly trusting.' },

  { id: 10043, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Interaction Design Testing', difficulty: 'medium', keywords: ['usability testing', 'UX', 'heuristic evaluation', 'AI UX'],
    question: 'Usability testing of AI agent interfaces should include:',
    options: { A: 'Only testing with expert users who understand AI limitations', B: 'Representative users performing real tasks, measuring task completion, error rates, and trust calibration — testing with diverse demographics', C: 'Automated UI tests without human participants', D: 'Testing only the happy path to demonstrate best-case performance' },
    answer: 'B', explanation: 'AI UX testing: observe real users performing actual tasks (not demos) → measure: task success rate, time on task, error recovery, trust miscalibration (over/under relying), satisfaction, and accessibility. Include diverse users: age, technical expertise, disability status.' },

  { id: 10044, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Learning from Human Corrections', difficulty: 'medium', keywords: ['correction', 'learning', 'adaptation', 'feedback loop'],
    question: 'When a user corrects an AI agent\'s response, best practice is to:',
    options: { A: 'Ignore corrections to maintain consistent behavior', B: 'Apply the correction immediately in the conversation, acknowledge it, and log for future improvement while not over-generalizing from a single correction', C: 'Immediately retrain the model on the correction', D: 'Ask the user to submit a formal feedback form' },
    answer: 'B', explanation: 'Handling corrections: acknowledge ("Thanks for the correction—"), apply in current conversation context, log for quality analysis. Don\'t over-generalize ("I was wrong → never trust myself"). Single correction updates current session; systematic corrections update the model.' },

  { id: 10045, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Oversight Scaling', difficulty: 'hard', keywords: ['scalable oversight', 'debate', 'AI assistance', 'evaluation'],
    question: 'The scalable oversight problem in AI refers to:',
    options: { A: 'Difficulty scaling human oversight teams as AI deployment grows', B: 'How humans can effectively evaluate AI outputs that exceed human capability — when AI is better than any individual human evaluator at a task', C: 'Scaling AI systems to match human-level oversight capability', D: 'Oversight infrastructure that scales automatically with traffic' },
    answer: 'B', explanation: 'Scalable oversight: if AI produces a mathematical proof humans can\'t verify, how do we ensure it\'s correct? Proposed solutions: AI-assisted oversight (use AI to help humans evaluate AI), debate (competing AIs argue and humans judge), and recursive reward modeling.' },
];
