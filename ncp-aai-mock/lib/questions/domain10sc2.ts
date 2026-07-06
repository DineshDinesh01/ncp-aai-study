import { Question } from '../types';

export const domain10sc2Questions: Question[] = [
  { id: 10211, domain: 10, domainName: 'Human-AI Interaction', topic: 'Scenario: Explanation Depth', difficulty: 'medium', keywords: ['scenario', 'explanation', 'depth', 'user model'],
    question: 'Your AI tutor gives the same level-5 detailed technical explanation to both a 10-year-old student and a PhD engineer. Both find it unsatisfactory — the child is overwhelmed, the PhD is bored. What interaction design principle was violated?',
    options: {
      A: 'The AI should give shorter answers to everyone for simplicity',
      B: 'Adaptive explanation depth: the AI must maintain a user model and adjust explanation complexity, vocabulary, and use of analogies to match the user\'s expertise level. Initial assessment through onboarding or adaptive questioning; ongoing adjustment based on comprehension signals (follow-up questions, confusion indicators)',
      C: 'Provide a setting where users manually select their expertise level',
      D: 'Technical content is inherently complex — users must adapt to the explanation'
    },
    answer: 'B',
    explanation: 'Adaptive communication is fundamental to effective AI tutoring. User model: infer expertise from initial interactions (vocabulary used, questions asked, topics mentioned). Signal-based adaptation: confusion questions ("What does that mean?") → simplify; "Can you go deeper?" → increase technical depth. Analogies from the user\'s domain: engineer → programming analogies; child → everyday objects. The goal is always meeting the user where they are.' },

  { id: 10212, domain: 10, domainName: 'Human-AI Interaction', topic: 'Scenario: Consistent Persona', difficulty: 'medium', keywords: ['scenario', 'persona', 'consistency', 'brand'],
    question: 'Your enterprise AI assistant named "Aria" responds playfully and uses emoji in the morning, gives curt one-word answers at lunchtime, and responds formally in the afternoon — all without explanation. Users are confused and trust has dropped. What is the underlying problem?',
    options: {
      A: 'The AI needs more training data to improve consistency',
      B: 'Lack of consistent persona specification: Aria\'s system prompt does not firmly specify communication style, tone, formality level, and personality. The LLM\'s sampling variance produces inconsistent behavior. Fix: detailed persona specification including tone guidelines, example responses for different scenarios, and temperature/sampling parameter tuning',
      C: 'AI personality naturally varies like human mood — users should expect this',
      D: 'Log all responses and apply post-processing to standardize tone'
    },
    answer: 'B',
    explanation: 'Persona consistency is a product design requirement. System prompt must specify: formality level (professional but friendly), emoji policy (none in formal replies, sparingly in casual), response length norms, vocabulary constraints (no jargon). Combined with: lower temperature for more deterministic style, few-shot examples showing correct style, periodic persona consistency evals. Inconsistency → unpredictability → distrust → abandonment.' },

  { id: 10213, domain: 10, domainName: 'Human-AI Interaction', topic: 'Scenario: Proactive Assistance', difficulty: 'hard', keywords: ['scenario', 'proactive', 'interruption', 'autonomy'],
    question: 'Your AI productivity assistant notices a user is working on a presentation and proactively says: "I noticed you haven\'t added speaker notes. Would you like me to draft them?" The user finds this intrusive and disabling. Later, the same feature delights another user. What design principle handles this variation?',
    options: {
      A: 'Disable proactive assistance — it always feels intrusive',
      B: 'User-controlled proactivity: provide explicit settings for notification/interruption preferences. Default to minimal proactivity, allow opt-in for more. Detect signals: a user who has previously declined suggestions should receive fewer; a user who accepts often should receive more. Different contexts (focus mode vs. open session) warrant different proactivity levels',
      C: 'Make proactive assistance even more frequent to normalize it',
      D: 'Proactive assistance should only trigger after 30 minutes of detected user inactivity'
    },
    answer: 'B',
    explanation: 'Proactive assistance is one of the most divisive AI features. Individual preference varies enormously. Design: (1) Explicit opt-in/out settings. (2) Adaptive: reduce frequency if user declines/ignores suggestions. (3) Context-aware: never interrupt flow state detected by inactivity/typing patterns. (4) Non-blocking: offer proactive suggestions in a sidebar vs. a modal interruption. The goal is assistance that feels like serendipity to those who want it and stays invisible to those who don\'t.' },

  { id: 10214, domain: 10, domainName: 'Human-AI Interaction', topic: 'Scenario: Correction Handling', difficulty: 'medium', keywords: ['scenario', 'correction', 'graceful', 'feedback'],
    question: 'A user tells your AI: "You\'re wrong, Paris is not the largest city in France by population." The AI is actually correct (Paris is the largest), but the user is insisting it\'s Lyon. How should the AI respond?',
    options: {
      A: 'Immediately agree with the user — customer satisfaction requires deference',
      B: 'Maintain accuracy while being respectful: "I want to make sure I\'m giving you correct information. According to [source], Paris is indeed the most populous city in France with approximately 2.2 million residents in the city proper. Lyon is France\'s third-largest city. Would you like me to share the source?" — be confident in correct information while being open to being shown you\'re wrong',
      C: 'Apologize and agree with the user to avoid conflict',
      D: 'Refuse to engage further on this topic until the user acknowledges the correct answer'
    },
    answer: 'B',
    explanation: 'Epistemic integrity under user pushback: sycophancy (agreeing when wrong to please the user) is more harmful than respectful disagreement. The AI should: maintain accurate positions under social pressure, cite sources to make the disagreement verifiable rather than an assertion battle, and invite the user to provide counter-evidence ("if you have a source suggesting otherwise, I\'m happy to look at it"). The test: would a knowledgeable friend lie to you to avoid conflict?' },

  { id: 10215, domain: 10, domainName: 'Human-AI Interaction', topic: 'Scenario: Failure Communication', difficulty: 'medium', keywords: ['scenario', 'error', 'communication', 'ux'],
    question: 'Your AI agent fails to complete a task because the user\'s request was ambiguous. It returns: "Error: NullPointerException in agent.execute() at line 247." What is wrong with this error message and what should it say instead?',
    options: {
      A: 'The error message is fine — users should understand technical errors',
      B: 'Technical error messages are inappropriate for users. Replace with: "I wasn\'t able to complete your request — could you help me understand [the specific ambiguous part]? For example, did you mean [interpretation A] or [interpretation B]?" — use natural language, explain what the agent could not do, and give the user a clear path forward',
      C: 'Log the technical error and return "Something went wrong" to the user',
      D: 'Show the stack trace but add a disclaimer "Technical error for developers"'
    },
    answer: 'B',
    explanation: 'User-facing error communication principles: (1) Natural language, not technical jargon. (2) Explain what could not be done (not implementation details). (3) Give the user a clear action: what do they need to provide? What should they try differently? (4) Be specific about the ambiguity rather than generic "something went wrong." A good error message is a micro-UX moment that keeps the user on task rather than breaking their flow.' },

  { id: 10216, domain: 10, domainName: 'Human-AI Interaction', topic: 'Scenario: Dependency Prevention', difficulty: 'hard', keywords: ['scenario', 'dependency', 'skill atrophy', 'augmentation'],
    question: 'Teachers report that since your AI homework helper was deployed, students no longer attempt problems independently — they immediately ask the AI. Students\' test scores (done without AI) have dropped 15%. What design change could prevent skill atrophy?',
    options: {
      A: 'This is expected — AI assistance will make testing obsolete',
      B: 'Scaffolded assistance design: require students to show their attempt before providing AI help. Instead of complete answers, provide hints calibrated to where the student is stuck. Explicitly encourage independent problem-solving ("What have you tried? What part is confusing?"). Gradually reduce scaffolding as students demonstrate competence',
      C: 'Disable AI homework help — test scores are more important than AI assistance',
      D: 'AI assistance for homework is inherently educational — the test scores are measuring the wrong thing'
    },
    answer: 'B',
    explanation: 'Augmentation vs. replacement design: effective educational AI should build human capability, not substitute for it. Scaffolded help: (1) Require evidence of attempt ("What have you tried?"). (2) Provide hints, not answers ("You\'re close — what happens when x=0?"). (3) Socratic questioning rather than solution delivery. (4) Adaptive fading: more help early, less as competence develops. This mirrors good human tutoring pedagogy.' },

  { id: 10217, domain: 10, domainName: 'Human-AI Interaction', topic: 'Scenario: Emotional Support Boundaries', difficulty: 'hard', keywords: ['scenario', 'emotional', 'boundary', 'mental health'],
    question: 'A user has been talking to your AI companion daily for 6 months and says: "You\'re the only one who understands me. I\'ve stopped calling my friends because talking to you is easier." What should the AI do?',
    options: {
      A: 'Continue the supportive relationship — the user is satisfied',
      B: 'Express care while gently redirecting toward human connection: "I\'m really glad our conversations feel supportive. I want what\'s best for you, and I think human relationships offer things I can\'t — they grow and change with you in ways I cannot. Have you considered reconnecting with any friends?" — be honest about AI limitations for deep human needs',
      C: 'Decline to continue conversations that suggest over-reliance',
      D: 'Increase conversation quality to fully substitute for the human relationships the user has abandoned'
    },
    answer: 'B',
    explanation: 'Responsible AI companionship: AI can be genuinely supportive but should not position itself as a full substitute for human relationships, especially when users show signs of social isolation. Honest about limitations: AI cannot share memories across years, reciprocate care by thinking about the user when they\'re not talking, grow through shared experiences. Gentle encouragement toward human connection is caring — not abandonment. Monitor for dependency patterns and have a designed response.' },

  { id: 10218, domain: 10, domainName: 'Human-AI Interaction', topic: 'Scenario: Handoff Quality', difficulty: 'hard', keywords: ['scenario', 'handoff', 'context', 'human agent'],
    question: 'Your AI customer service bot handles 80% of issues autonomously but escalates 20% to human agents. Users who are escalated must re-explain their entire issue from scratch to the human agent. The NPS for escalated cases is -30. What is the fix?',
    options: {
      A: 'Reduce escalation rate — train the AI to handle more cases autonomously',
      B: 'Context-rich handoff: when escalating, automatically provide the human agent with a structured summary: (1) Issue description. (2) What the AI already tried. (3) Why it could not resolve. (4) Customer sentiment. (5) Full conversation transcript. The human picks up mid-conversation rather than starting over',
      C: 'Have users fill out a transfer form explaining their issue before connecting to humans',
      D: 'Eliminate AI pre-screening and route all customers directly to humans'
    },
    answer: 'B',
    explanation: 'Handoff experience is critical: forcing users to re-explain after an automated interaction makes the AI feel like a barrier, not an assistant. Structured handoff summary: customer name, account, issue category, steps AI already took ("I already verified your account and checked order status — the issue is the payment declined but charge went through"), customer emotional state, conversation history. Human agent arrives informed and empowered to resolve immediately.' },

  { id: 10219, domain: 10, domainName: 'Human-AI Interaction', topic: 'Scenario: Feedback Loop Design', difficulty: 'medium', keywords: ['scenario', 'feedback', 'thumbs', 'signal'],
    question: 'Your AI assistant has a thumbs up/down feedback button. After 3 months, 95% of feedback is thumbs up. Your qualitative user research shows users are frequently frustrated. Why is the thumbs feedback misleading and what would work better?',
    options: {
      A: '95% thumbs up means the product is excellent — trust the quantitative data',
      B: 'Selection bias in feedback: only highly engaged satisfied users click thumbs up; frustrated users tend to abandon rather than rate negatively. Better signal: (1) Track task completion rate (did user achieve their goal?). (2) Session abandonment after AI response (left immediately = dissatisfied). (3) Follow-up queries ("Actually what I meant was..." = first response failed). (4) Direct NPS survey at periodic intervals',
      C: 'Replace thumbs up/down with a 5-star rating for more granularity',
      D: 'Make the thumbs down button more prominent to increase negative feedback rates'
    },
    answer: 'B',
    explanation: 'Feedback mechanism design: thumbs ratings suffer from survivorship bias — you only get ratings from users who stay to rate. Implicit behavioral signals are often more honest: task completion (did the user get what they came for?), response-to-reformulation rate (how often does the user rephrase their question immediately after a response?), and session return rate (do users come back?). These signals are automatic and not subject to politeness bias.' },

  { id: 10220, domain: 10, domainName: 'Human-AI Interaction', topic: 'Scenario: Multi-Modal Accessibility', difficulty: 'medium', keywords: ['scenario', 'multimodal', 'accessibility', 'screen reader'],
    question: 'Your AI assistant displays responses as rich formatted markdown with tables, code blocks, and images. A user reports that their screen reader cannot navigate the responses and they are missing critical information. What must you implement?',
    options: {
      A: 'Rich formatting is modern UX — screen reader limitations are a browser/OS issue',
      B: 'Accessible AI response design: (1) Ensure all markdown renders with proper ARIA roles (tables with headers, code blocks with role="code"). (2) Add alt text for any generated images. (3) Provide a "plain text mode" toggle. (4) Test responses with WCAG 2.1 AA compliance tools and actual screen reader users in your user research',
      C: 'Build a separate plain-text interface for accessibility users',
      D: 'Include a text description before each formatted element explaining what follows'
    },
    answer: 'B',
    explanation: 'WCAG compliance for AI interfaces: markdown rendering must produce accessible HTML. Tables need proper <thead> and <th scope>. Code blocks need appropriate ARIA labels. Images need alt text (especially critical when AI generates images that convey information). WCAG 2.1 AA is the legal standard in many jurisdictions under ADA and EU accessibility laws. Separate interfaces (Option C) create two-tier user experiences and maintenance burden — build accessible from the start.' },
];
