import { Question } from '../types';

export const domain10scQuestions: Question[] = [
  { id: 10201, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Scenario: Automation Bias', difficulty: 'hard', keywords: ['scenario', 'automation bias', 'over-reliance', 'review'],
    question: 'Your AI system generates medical imaging diagnoses that doctors review and approve. Audit shows doctors approve 97% of AI diagnoses in under 10 seconds, but the AI has a known 5% error rate on rare conditions. What is happening and what should you change?',
    options: {
      A: 'The doctors are efficient — 10 seconds is sufficient review time',
      B: 'Automation bias: doctors are rubber-stamping AI decisions without genuine independent review. Fix: redesign the interface so doctors must actively engage — require them to form their own diagnosis before seeing the AI suggestion, or flag rare-condition cases for extended mandatory review time',
      C: 'Increase the AI\'s accuracy to reduce the error rate to 1%',
      D: 'Show the AI confidence score so doctors know when to review more carefully'
    },
    answer: 'B',
    explanation: 'Automation bias: humans defer to automated systems even when they should apply independent judgment. 97% approval in 10s means doctors are not genuinely reviewing — they\'re clicking approve. Fix: cognitive forcing functions — hide AI diagnosis until doctor submits their own, or require free-text justification for approvals. Simply showing confidence scores (Option D) does not prevent automation bias.' },

  { id: 10202, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Scenario: User Trust Calibration', difficulty: 'medium', keywords: ['scenario', 'trust', 'calibration', 'UX'],
    question: 'User research shows half your AI assistant users trust it too much (relying on it for critical decisions without verification) while the other half trust it too little (re-checking every response even when accurate). What UX changes address both groups?',
    options: {
      A: 'Show a generic "AI can make mistakes" disclaimer on every page',
      B: 'Show calibrated confidence indicators per response (high/medium/low confidence with specific reasoning), provide source citations for factual claims, and clearly flag when the AI is uncertain or recommending expert consultation — this helps over-trusters verify when warranted and reassures under-trusters when responses are well-grounded',
      C: 'Segment users and show different UX to high-trust vs low-trust users',
      D: 'Only reduce over-trust — under-trust is not a problem since caution is good'
    },
    answer: 'B',
    explanation: 'Calibrated trust design serves both groups: response-level confidence + sources gives over-trusters signals to know when to verify while giving under-trusters evidence to rely on confident, well-cited responses. A generic disclaimer (Option A) is ignored by both groups. Under-trust is also a problem — users who can\'t rely on AI miss productivity benefits and erode adoption.' },

  { id: 10203, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Scenario: Human in the Loop', difficulty: 'hard', keywords: ['scenario', 'HITL', 'oversight', 'approval'],
    question: 'Your AI agent autonomously manages social media posts for a brand. It drafts, schedules, and publishes posts without human review. On one occasion, it published an insensitive post during a news crisis, causing a PR incident. What oversight mechanism should have been in place?',
    options: {
      A: 'The AI\'s content guidelines need to be more comprehensive',
      B: 'Human approval gate for publishing: all posts require human review and explicit approval before going live. For time-sensitive content, implement a "30-minute approval window" with escalation if no response. The autonomous publish capability should not exist for brand-sensitive content',
      C: 'Add a sentiment analyzer to automatically detect insensitive content',
      D: 'Disable the AI\'s access to post directly and require copy-paste by a human'
    },
    answer: 'B',
    explanation: 'Brand publishing is a high-stakes, irreversible action requiring human judgment. No automated content filter can reliably detect all culturally sensitive timing (a crisis that breaks 1 hour before scheduled publication). The correct architecture: draft autonomously (leverage AI productivity) → human approves (leverage human judgment and context awareness) → publish. AI autonomy for drafting, human oversight for irreversible public actions.' },

  { id: 10204, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Scenario: Transparency', difficulty: 'medium', keywords: ['scenario', 'transparency', 'disclosure', 'AI identity'],
    question: 'Your company deploys an AI chatbot for sales that builds rapport with users over multiple sessions. Some users have developed trust relationships, sharing personal details, believing they are talking with a named human sales rep "Alex." Is this acceptable and why?',
    options: {
      A: 'This is acceptable — it improves user experience and the chatbot is effective',
      B: 'This is deceptive and unethical. Users must be informed they are interacting with an AI — at the start of the relationship, not buried in terms of service. Impersonating a specific human employee violates trust and in many jurisdictions violates consumer protection laws (FTC, EU AI Act)',
      C: 'Only disclose if the user directly asks "Are you human?"',
      D: 'Disclosure is optional if users do not share sensitive personal information'
    },
    answer: 'B',
    explanation: 'AI identity deception is a fundamental ethical violation. Users are sharing personal information, making purchase decisions, and forming relationships based on a false premise (talking to a human named Alex). Legal context: FTC has sanctioned AI identity deception; EU AI Act explicitly requires disclosure that a user is interacting with an AI in chatbot interactions. The business harm of disclosure is far less than the harm and liability of discovered deception.' },

  { id: 10205, domain: 10, domainName: 'Human-AI Interaction & Oversight', topic: 'Scenario: Feedback Loop', difficulty: 'medium', keywords: ['scenario', 'feedback', 'improvement', 'RLHF'],
    question: 'You want to continuously improve your AI agent using user feedback, but you only get explicit feedback (thumbs up/down) on 2% of responses. How do you build a meaningful improvement signal from 98% of interactions where users give no explicit feedback?',
    options: {
      A: 'Run a quarterly survey asking users to rate overall satisfaction',
      B: 'Mine implicit signals: track response editing (user modified AI output = negative), follow-up questions on same topic (answer was unclear/incomplete), conversation abandonment after AI response (user gave up), copy-to-clipboard events (answer was useful). These scale across 100% of interactions',
      C: 'Hire human raters to evaluate a random sample of responses monthly',
      D: 'Increase the friction for explicit feedback to make users give more ratings'
    },
    answer: 'B',
    explanation: 'Implicit feedback scales where explicit feedback cannot. Behavioral signals across all interactions provide a continuous stream of quality signals: editing = "AI was wrong/incomplete," asking again = "answer was unclear," abandoning = "AI failed." These aggregate into a reliable quality signal without burdening users. Used alongside explicit feedback (for calibration) and human evaluation (for gold standard), you get a comprehensive feedback loop.' },
];
