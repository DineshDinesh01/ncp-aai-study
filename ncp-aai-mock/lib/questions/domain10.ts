import { Question } from '../types';

export const domain10Questions: Question[] = [
  { id: 10001, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'HITL', difficulty: 'easy', keywords: ['HITL', 'human-in-the-loop', 'approval', 'oversight'],
    question: 'Human-in-the-loop (HITL) in AI agent systems means:',
    options: { A: 'Humans train the AI model in a loop', B: 'Humans are incorporated into the agent\'s decision process at key points for review, approval, or correction', C: 'The agent loops indefinitely waiting for human input', D: 'Humans monitor the loop counter of the agent' },
    answer: 'B', explanation: 'HITL designs deliberately insert humans at critical decision points — before irreversible actions, high-stakes decisions, or uncertain situations — maintaining meaningful human control.' },

  { id: 10002, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Approval Workflows', difficulty: 'medium', keywords: ['approval', 'workflow', 'confirmation', 'dangerous actions'],
    question: 'For which types of agent actions are approval workflows most critical?',
    options: { A: 'Reading publicly available information', B: 'Irreversible or high-impact actions (sending emails, making purchases, deleting data, executing code)', C: 'Generating text drafts for human review', D: 'Summarizing existing documents' },
    answer: 'B', explanation: 'Approval workflows are essential for actions that cannot be undone or have significant real-world impact. Low-stakes reversible actions can typically proceed autonomously.' },

  { id: 10003, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Escalation Policy', difficulty: 'medium', keywords: ['escalation', 'uncertainty', 'handoff', 'human agent'],
    question: 'Automatic escalation in AI agents should trigger when:',
    options: { A: 'The agent generates a response longer than 500 words', B: 'Agent confidence is low, the task is outside defined scope, or user expresses frustration', C: 'The conversation exceeds 10 turns', D: 'The agent uses more than 3 tools in one response' },
    answer: 'B', explanation: 'Escalation policies prevent agents from confidently giving wrong answers — triggering handoff to humans when the agent is uncertain, off-scope, or when user sentiment indicates the interaction is failing.' },

  { id: 10004, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Trust Calibration', difficulty: 'hard', keywords: ['trust', 'automation bias', 'appropriate trust', 'calibration'],
    question: 'Automation bias in human-AI collaboration refers to:',
    options: { A: 'AI systems showing bias toward automated tasks', B: 'Human tendency to over-trust and under-scrutinize automated AI recommendations, even when wrong', C: 'Bias in automated model evaluation metrics', D: 'The bias that AI training introduces toward automation' },
    answer: 'B', explanation: 'Automation bias causes humans to rubberstamp AI recommendations without critical review, increasing error rates when the AI is wrong. UI/UX design should encourage appropriate skepticism.' },

  { id: 10005, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Feedback Collection', difficulty: 'easy', keywords: ['feedback', 'thumbs up', 'rating', 'improvement'],
    question: 'In-product feedback mechanisms (thumbs up/down, rating scales) in AI agent interfaces primarily enable:',
    options: { A: 'Real-time model retraining after each interaction', B: 'Collection of preference signal to identify failure modes and drive offline model improvement', C: 'User authentication via behavioral signals', D: 'Measuring agent response time' },
    answer: 'B', explanation: 'User feedback signals identify quality failures at scale, providing preference data for RLHF fine-tuning and surface patterns of user dissatisfaction that drive prompt/model improvements.' },

  { id: 10006, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Intervention Design', difficulty: 'medium', keywords: ['intervention', 'override', 'stop', 'abort'],
    question: 'AI agent interfaces must always include:',
    options: { A: 'A progress bar showing model inference speed', B: 'A clear mechanism for users to stop, abort, or override the agent at any point', C: 'Real-time display of all tool calls for transparency', D: 'Automatic correction of user typos' },
    answer: 'B', explanation: 'Human oversight requires that users can always interrupt an agent before, during, or after action execution. A "stop" mechanism is a fundamental safety requirement.' },

  { id: 10007, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Conversational Design', difficulty: 'medium', keywords: ['conversational design', 'UX', 'dialog', 'turn taking'],
    question: 'Effective conversational agent UX design principles include:',
    options: { A: 'Maximizing information in each response regardless of context', B: 'Asking one clarifying question at a time, using progressive disclosure, and confirming understanding', C: 'Using technical jargon to demonstrate agent capability', D: 'Avoiding follow-up questions to reduce conversation length' },
    answer: 'B', explanation: 'Good conversational UX: focus each exchange (one question per turn), reveal complexity progressively, confirm before major actions, and match language to user expertise.' },

  { id: 10008, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Transparency UX', difficulty: 'medium', keywords: ['transparency', 'visibility', 'reasoning', 'provenance'],
    question: 'Showing users which sources an agent retrieved to answer their question serves to:',
    options: { A: 'Increase response length and appear more comprehensive', B: 'Enable users to verify claims, build trust, and identify when information is outdated or incorrect', C: 'Satisfy legal requirements to show all retrieved documents', D: 'Demonstrate technical sophistication' },
    answer: 'B', explanation: 'Source attribution enables human verification — users can check if the source is authoritative, current, and accurately cited, catching hallucinations or outdated information.' },

  { id: 10009, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Agentic Risk Levels', difficulty: 'hard', keywords: ['autonomy spectrum', 'risk level', 'oversight level', 'human control'],
    question: 'As agent autonomy increases (from suggestion to full automation), the required human oversight:',
    options: { A: 'Should decrease proportionally to leverage the automation benefit', B: 'Should increase to compensate for higher risk — more autonomous actions have greater impact', C: 'Remains constant regardless of autonomy level', D: 'Is no longer needed once the agent demonstrates reliability' },
    answer: 'B', explanation: 'Higher autonomy = higher impact potential = higher risk. The oversight mechanism should scale with autonomy — automated suggestions need less oversight than an agent that autonomously executes multi-step workflows.' },

  { id: 10010, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Handoff Quality', difficulty: 'medium', keywords: ['handoff', 'context transfer', 'human agent', 'summary'],
    question: 'When an AI agent escalates to a human agent, the handoff should include:',
    options: { A: 'Only the user\'s final message', B: 'Full conversation context, steps taken, what was tried, reason for escalation, and user sentiment', C: 'The agent\'s internal reasoning trace', D: 'Only the technical error that triggered escalation' },
    answer: 'B', explanation: 'Quality handoffs give human agents full context to avoid asking the user to repeat themselves — prior attempts, conversation history, reason for escalation, and emotional state are all critical.' },

  { id: 10011, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Minimal Footprint', difficulty: 'medium', keywords: ['minimal footprint', 'conservative', 'reversible', 'cautious'],
    question: 'The "minimal footprint" principle for AI agents means:',
    options: { A: 'Using the smallest possible model to reduce costs', B: 'Taking the least invasive, most reversible actions to accomplish goals, requesting only necessary permissions', C: 'Minimizing the number of tool calls per session', D: 'Reducing the agent\'s memory usage' },
    answer: 'B', explanation: 'Minimal footprint agents prefer reversible actions, request only needed permissions, avoid accumulating resources or capabilities beyond the task, and confirm before irreversible steps.' },

  { id: 10012, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Cognitive Load', difficulty: 'medium', keywords: ['cognitive load', 'user burden', 'information overload'],
    question: 'AI agents that surface too many choices or too much information simultaneously cause:',
    options: { A: 'Faster user decisions due to more information', B: 'Decision paralysis and cognitive overload, reducing user satisfaction and increasing errors', C: 'Better user outcomes due to comprehensive coverage', D: 'Reduced need for human oversight' },
    answer: 'B', explanation: 'Information overload from AI agents causes decision paralysis — users make worse decisions with more choices (paradox of choice). Progressive disclosure and smart defaults reduce cognitive load.' },

  { id: 10013, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Uncertainty Communication', difficulty: 'medium', keywords: ['uncertainty', 'confidence', 'hedging', 'communication'],
    question: 'When an AI agent is uncertain about an answer, the recommended behavior is:',
    options: { A: 'Generate a confident-sounding answer anyway to avoid user anxiety', B: 'Communicate uncertainty explicitly ("I\'m not certain, but...") and recommend verification for important decisions', C: 'Refuse to answer any uncertain questions', D: 'Generate multiple conflicting answers and let the user choose' },
    answer: 'B', explanation: 'Calibrated uncertainty communication (hedging language, confidence levels, recommendation to verify) maintains user trust and prevents over-reliance on AI answers in high-stakes situations.' },

  { id: 10014, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Accessibility', difficulty: 'easy', keywords: ['accessibility', 'WCAG', 'inclusion', 'design'],
    question: 'AI agent interfaces must consider accessibility to ensure:',
    options: { A: 'The interface loads faster on older hardware', B: 'Users with disabilities can equally access and benefit from AI agent capabilities', C: 'The agent can access more external systems', D: 'Accessibility to proprietary data sources' },
    answer: 'B', explanation: 'WCAG compliance ensures AI benefits are accessible to users with visual, motor, or cognitive disabilities — screen reader compatibility, keyboard navigation, and clear language are essential.' },

  { id: 10015, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'User Consent', difficulty: 'medium', keywords: ['consent', 'data collection', 'user agreement', 'privacy'],
    question: 'Before deploying an AI agent that collects and learns from user interactions, organizations must:',
    options: { A: 'Collect all possible user data to maximize learning', B: 'Obtain informed consent, clearly disclose data use, and provide opt-out mechanisms', C: 'Process data without disclosure since it improves the product', D: 'Only require consent for EU-based users' },
    answer: 'B', explanation: 'Informed consent requires clear disclosure of what data is collected, how it\'s used (including for training), and how users can opt out — required by GDPR, CCPA, and ethical AI practice.' },
];
