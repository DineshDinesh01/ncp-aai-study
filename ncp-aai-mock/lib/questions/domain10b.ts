import { Question } from '../types';

export const domain10bQuestions: Question[] = [
  { id: 10016, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Cognitive Load', difficulty: 'medium', keywords: ['cognitive load', 'UX', 'interface', 'clarity'],
    question: 'AI interfaces should minimize cognitive load for users by:',
    options: { A: 'Providing as much information as possible in each response', B: 'Progressive disclosure — showing only what\'s needed now, allowing users to request more detail on demand', C: 'Using technical language to convey expertise', D: 'Minimizing all text to reduce reading load' },
    answer: 'B', explanation: 'Progressive disclosure matches information to user need — present the essential answer first, allow drilling down for more detail. This reduces overwhelm without hiding important information.' },

  { id: 10017, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Feedback Loops', difficulty: 'medium', keywords: ['feedback', 'user feedback', 'correction', 'learning'],
    question: 'Effective user feedback mechanisms in AI systems should enable:',
    options: { A: 'Users to retrain the model directly from the UI', B: 'Easy reporting of errors with enough context for developers to reproduce and fix the issue', C: 'Anonymous feedback only to protect privacy', D: 'Feedback only through formal bug reports' },
    answer: 'B', explanation: 'Useful feedback captures: what the AI did, what the user expected, the specific input — enough context for developers to reproduce the failure and improve the system.' },

  { id: 10018, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'HITL Patterns', difficulty: 'hard', keywords: ['human in the loop', 'patterns', 'review', 'approval'],
    question: 'The "Human on the Loop" pattern (vs Human in the Loop) means:',
    options: { A: 'Humans are trapped in a loop by AI systems', B: 'AI operates autonomously with humans monitoring and able to intervene, rather than approving each action', C: 'Humans review only the final output, not intermediate steps', D: 'Humans are on standby for emergencies only' },
    answer: 'B', explanation: '"Human on the Loop": AI acts autonomously, humans monitor in real-time and can override/stop at any point. vs "Human in the Loop": human approval required for each significant action. HOTL enables speed with oversight.' },

  { id: 10019, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Autonomy Calibration', difficulty: 'medium', keywords: ['autonomy', 'trust', 'calibration', 'gradual'],
    question: 'Gradually expanding AI agent autonomy based on demonstrated performance is called:',
    options: { A: 'Autonomy inflation', B: 'Trust calibration — expanding autonomy as the agent proves reliable, contracting it when performance degrades', C: 'Progressive automation', D: 'Autonomous trust building' },
    answer: 'B', explanation: 'Trust calibration: start with high oversight → measure performance → expand autonomy where proven reliable → contract autonomy if errors emerge. Prevents both under-trusting (inefficiency) and over-trusting (risk).' },

  { id: 10020, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Conversational Design', difficulty: 'medium', keywords: ['conversational', 'dialogue', 'turn-taking', 'clarification'],
    question: 'Effective conversational design for AI agents includes:',
    options: { A: 'Agents that never ask clarifying questions to avoid annoying users', B: 'Proactive clarification for ambiguous requests, appropriate turn-taking, and graceful handling of conversation redirects', C: 'Answering every possible interpretation simultaneously', D: 'Maintaining a single topic throughout the conversation' },
    answer: 'B', explanation: 'Good conversational AI: asks when the cost of wrong interpretation exceeds the cost of asking (ambiguous tasks), handles topic switches gracefully, and uses natural dialogue patterns without overwhelming users.' },

  { id: 10021, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Override Mechanisms', difficulty: 'medium', keywords: ['override', 'kill switch', 'stop', 'interrupt'],
    question: 'Emergency override mechanisms in deployed AI agents must be:',
    options: { A: 'Hidden from users to prevent misuse', B: 'Accessible, immediate, and tested regularly — ensuring humans can stop agent actions faster than the agent can cause harm', C: 'Only available to system administrators', D: 'Activated only after the agent completes its current task' },
    answer: 'B', explanation: 'Override mechanisms must be: visible (users know they exist), low-latency (immediate effect), accessible (not buried in menus), and regularly tested (verified to work before needed in emergencies).' },

  { id: 10022, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Personalization Ethics', difficulty: 'hard', keywords: ['personalization', 'manipulation', 'user model', 'filter bubble'],
    question: 'The ethical risk of AI personalization is:',
    options: { A: 'Personalized responses are too time-consuming to generate', B: 'Over-personalization creates filter bubbles, enables manipulation, and reduces exposure to diverse perspectives', C: 'Personalization violates terms of service', D: 'Personalized AI responses are always less accurate' },
    answer: 'B', explanation: 'Personalization risks: filter bubbles (only see confirming content), manipulation (exploit user patterns for engagement), and echo chambers (reinforce existing beliefs) — requiring careful design and user controls.' },

  { id: 10023, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Agent Handoff', difficulty: 'medium', keywords: ['handoff', 'escalation', 'human agent', 'context transfer'],
    question: 'When an AI agent escalates to a human agent, the handoff should include:',
    options: { A: 'A clean slate — humans prefer to start fresh without AI context', B: 'Full conversation history, what the AI tried, why it failed/escalated, and recommended next steps', C: 'Only the user\'s original query', D: 'A summary written by the AI disguised as user-written' },
    answer: 'B', explanation: 'Good handoff context: full conversation, AI\'s attempted solutions and outcomes, reason for escalation, and suggested next steps — preventing users from repeating themselves and enabling immediate effective human help.' },

  { id: 10024, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Response Formatting', difficulty: 'easy', keywords: ['formatting', 'markdown', 'structure', 'readability'],
    question: 'AI agent responses should match formatting to context by:',
    options: { A: 'Always using markdown headers and bullet points', B: 'Using plain prose for conversational responses, structured formatting for complex technical content, and code blocks for code', C: 'Minimizing all formatting to reduce token count', D: 'Matching the user\'s input formatting exactly' },
    answer: 'B', explanation: 'Context-appropriate formatting: casual questions get conversational prose; technical documentation gets headers and lists; code gets code blocks. Inappropriate formatting (bullets for everything) degrades readability.' },

  { id: 10025, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Accessibility', difficulty: 'medium', keywords: ['accessibility', 'WCAG', 'a11y', 'inclusive design'],
    question: 'AI agent interfaces must consider accessibility by:',
    options: { A: 'Only supporting text-based interaction for simplicity', B: 'WCAG compliance for visual interfaces, alternative text for AI outputs, and support for assistive technologies', C: 'Making AI systems free for users with disabilities', D: 'Accessibility is not required for AI systems' },
    answer: 'B', explanation: 'AI agent accessibility: WCAG 2.1 AA compliance, screen reader compatibility, alt text for generated images, keyboard navigation, adjustable text size, and caption support for audio outputs.' },

  { id: 10026, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'User Mental Models', difficulty: 'hard', keywords: ['mental model', 'expectation', 'anthropomorphism', 'calibration'],
    question: 'When users anthropomorphize AI agents (attributing human-like understanding and feelings), AI designers should:',
    options: { A: 'Encourage anthropomorphism as it increases engagement', B: 'Help users maintain accurate mental models through appropriate language, disclosing limitations, and not over-claiming capabilities', C: 'Block all human-like language in agent responses', D: 'Ignore it — users will naturally calibrate over time' },
    answer: 'B', explanation: 'Uncalibrated anthropomorphism leads to over-trust (relying on AI where it fails) and misplaced empathy (worrying about "hurting" the AI). Design should correct misconceptions while preserving natural interaction.' },

  { id: 10027, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Audit Logging', difficulty: 'medium', keywords: ['audit log', 'accountability', 'trail', 'governance'],
    question: 'Comprehensive audit logging for AI agent interactions serves:',
    options: { A: 'Only debugging purposes during development', B: 'Accountability (who authorized what), compliance (regulatory audit trails), and debugging (reproduce issues in production)', C: 'Only for security breach investigations', D: 'Audit logs are only needed for financial transactions' },
    answer: 'B', explanation: 'AI audit logs serve multiple stakeholders: legal (compliance evidence), security (breach investigation), operations (debugging), and governance (accountability for consequential AI decisions).' },

  { id: 10028, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Human Factors', difficulty: 'medium', keywords: ['human factors', 'ergonomics', 'workload', 'stress'],
    question: 'Automation bias in human-AI teams refers to:',
    options: { A: 'Bias toward automating everything without human judgment', B: 'The tendency for humans to over-rely on automated recommendations without critical evaluation, especially under high cognitive load', C: 'AI systems that are biased toward automation topics', D: 'Humans refusing to use automation tools' },
    answer: 'B', explanation: 'Automation bias: humans accept AI recommendations without critical evaluation — especially when tired, distracted, or time-pressured. Mitigation: require explicit confirmation for consequential actions, present AI outputs as recommendations not facts.' },

  { id: 10029, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Multi-Modal Interaction', difficulty: 'medium', keywords: ['multimodal', 'voice', 'gesture', 'screen'],
    question: 'Multimodal AI interfaces (voice + screen) improve user experience when:',
    options: { A: 'Used in all situations regardless of context', B: 'Modalities are matched to task type — voice for hands-free/navigation, screen for complex info display and review', C: 'Voice and screen always present the same information simultaneously', D: 'Multimodal is only appropriate for mobile devices' },
    answer: 'B', explanation: 'Effective multimodal design: voice for input/commands when hands are occupied; screen for complex data review, charts, and document review; hybrid for guided workflows combining both.' },

  { id: 10030, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Proactive vs Reactive', difficulty: 'medium', keywords: ['proactive', 'reactive', 'push', 'notification'],
    question: 'AI agents should proactively interrupt users when:',
    options: { A: 'The agent has something potentially interesting to share', B: 'The situation is time-sensitive AND the information would change the user\'s current course of action without this notification', C: 'The agent completes any subtask', D: 'The agent is idle and has pending updates' },
    answer: 'B', explanation: 'Proactive interruption criteria: (1) time-sensitive — delay would cause harm; (2) actionable — changes what the user should do now. Without both, the interruption is noise that trains users to ignore all agent notifications.' },

  { id: 10031, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'AI Personas', difficulty: 'medium', keywords: ['persona', 'character', 'brand', 'consistency'],
    question: 'A consistent AI agent persona improves user experience by:',
    options: { A: 'Making the AI appear human to increase engagement', B: 'Providing predictable interaction patterns, tone, and behavior that users can learn and rely on', C: 'Hiding the system\'s AI nature from users', D: 'Reducing the need for safety guidelines since the persona sets expectations' },
    answer: 'B', explanation: 'Consistent persona: users learn the agent\'s "style" — what it will and won\'t do, how it communicates, when it asks for help. Predictability reduces cognitive load and builds appropriate trust calibration.' },

  { id: 10032, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Consent Mechanisms', difficulty: 'medium', keywords: ['consent', 'opt-in', 'data use', 'transparency'],
    question: 'Informed consent for AI agent data usage requires:',
    options: { A: 'A single click "I agree" checkbox before use', B: 'Clear explanation of what data is collected, how it\'s used, how long it\'s retained, and genuine opt-in/opt-out choices', C: 'Consent buried in terms of service that users must find', D: 'Implicit consent by using the service' },
    answer: 'B', explanation: 'Meaningful consent: specific (what exactly is collected), informed (how it\'s used), voluntary (real opt-out without service degradation), and revocable (can withdraw consent and have data deleted).' },

  { id: 10033, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'XAI in Practice', difficulty: 'hard', keywords: ['XAI', 'LIME', 'SHAP', 'explanation'],
    question: 'SHAP (SHapley Additive exPlanations) values help users understand AI decisions by:',
    options: { A: 'Creating visual shapes to represent AI decisions', B: 'Quantifying each feature\'s contribution to a prediction — showing which inputs pushed the decision in which direction', C: 'Providing shape-based visual explanations of neural networks', D: 'Generating natural language explanations from neural activations' },
    answer: 'B', explanation: 'SHAP assigns each feature a value indicating: direction (positive=increases prediction, negative=decreases) and magnitude (larger value=more influence). Enables "this prediction is high because age=65 (+0.3) and income is low (-0.1)".' },

  { id: 10034, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Longitudinal Trust', difficulty: 'hard', keywords: ['longitudinal', 'trust repair', 'failure', 'recovery'],
    question: 'After an AI agent makes a serious error, rebuilding user trust requires:',
    options: { A: 'Replacing the agent with a new version without acknowledgment', B: 'Transparent acknowledgment of the failure, explanation of root cause, demonstration of fixes, and evidence of improved testing', C: 'Simply apologizing and moving on without changes', D: 'Increasing the number of disclaimers in the interface' },
    answer: 'B', explanation: 'Trust repair after failure: (1) acknowledge it happened, (2) explain why (builds understanding), (3) show concrete fixes, (4) demonstrate improved testing. Covers both emotional and rational dimensions of trust.' },

  { id: 10035, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Monitoring Human Teams', difficulty: 'medium', keywords: ['team oversight', 'dashboard', 'visibility', 'intervention'],
    question: 'An oversight dashboard for human supervisors of AI agent fleets should show:',
    options: { A: 'Detailed logs of every agent action for manual review', B: 'Aggregated metrics, anomaly highlights, and exception alerts — surfacing what needs human attention without overwhelming with noise', C: 'Only agent error counts without context', D: 'Only summary statistics without ability to drill down' },
    answer: 'B', explanation: 'Effective oversight dashboards: aggregate normal operations into metrics, surface anomalies and exceptions that warrant attention, enable drill-down on flagged cases — balancing visibility with cognitive load.' },
];
