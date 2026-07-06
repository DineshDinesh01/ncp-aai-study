import { Question } from '../types';

export const domain8scQuestions: Question[] = [
  { id: 8201, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Scenario: Circuit Breaker', difficulty: 'hard', keywords: ['scenario', 'circuit breaker', 'cascade', 'failure'],
    question: 'Your AI agent calls an external LLM API that starts responding slowly (30s timeouts). Your agents queue up waiting for responses, exhausting all thread pool resources, and eventually your entire application becomes unresponsive. What pattern would have prevented this?',
    options: {
      A: 'Increase the thread pool size to handle more concurrent waiting requests',
      B: 'A circuit breaker on the LLM API call: after 5 consecutive timeouts, the circuit opens and immediately returns an error (fast fail) instead of waiting 30s each time. This frees threads to handle other requests and prevents resource exhaustion',
      C: 'Set a shorter timeout of 5 seconds for the LLM API call',
      D: 'Deploy the application on a larger server with more threads available'
    },
    answer: 'B',
    explanation: 'Cascading failure via resource exhaustion is the classic problem. Without a circuit breaker: 100 requests queued, each waiting 30s → 100 threads blocked → new requests also blocked → application dead. Circuit breaker: open after failures → new requests fail fast (< 1ms) → threads available for other work → system remains responsive even while downstream is degraded.' },

  { id: 8202, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Scenario: Incident Response', difficulty: 'medium', keywords: ['scenario', 'incident', 'P1', 'response'],
    question: 'At 2am, your AI customer service agent starts returning completely wrong answers to all users — it says your product costs $0 and is "discontinued." 5,000 users see this in 10 minutes. What is the correct incident response order?',
    options: {
      A: 'First investigate root cause, then disable the agent if it is serious',
      B: 'Immediately disable or roll back the agent (stop the bleeding), then simultaneously: alert the team, communicate to users ("our AI assistant is temporarily unavailable"), investigate root cause, and prepare a post-incident review',
      C: 'Fix the incorrect information in the knowledge base and redeploy',
      D: 'Let the incident continue while you investigate to collect more data'
    },
    answer: 'B',
    explanation: 'P1 incident response: STOP first (minimize user impact), then investigate. With 5,000 users/10 minutes seeing wrong information, every minute of delay is 500 more affected users. Rollback to last known-good version takes 30 seconds. Investigation takes hours — you do them in parallel. Fix the bleeding before diagnosing why it happened.' },

  { id: 8203, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Scenario: Graceful Degradation', difficulty: 'medium', keywords: ['scenario', 'degradation', 'fallback', 'outage'],
    question: 'Your primary LLM API is down. Your AI agent serves 10,000 users who are actively using it. You have a smaller, less capable backup model. What is better — switch to the backup model or show an error to all users?',
    options: {
      A: 'Show all users an error — a wrong answer is worse than no answer',
      B: 'Switch to the backup model with clear user notification: "We\'re experiencing technical issues. Responses may be slower or less detailed than usual." Graceful degradation maintains service at reduced quality rather than complete failure',
      C: 'Queue all requests and wait for the primary model to recover',
      D: 'Route 50% of users to the backup model and show errors to the other 50%'
    },
    answer: 'B',
    explanation: 'Graceful degradation principle: reduced capability > no capability for most users. A smaller model can handle FAQ, basic queries, and simple tasks adequately. Users are informed of limitations. The key is transparency: tell users the system is degraded so they can calibrate expectations and choose to wait for full capability if their query is complex. Full outage is always the last resort.' },

  { id: 8204, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Scenario: Memory Leak', difficulty: 'hard', keywords: ['scenario', 'memory leak', 'agent', 'long running'],
    question: 'Your AI agent service runs fine for the first 6 hours but memory usage grows continuously and pods crash with OOMKilled after 8 hours. The agent maintains conversation histories in a dictionary. What is the likely cause and fix?',
    options: {
      A: 'The model weights are being loaded multiple times — fix the model loading code',
      B: 'The conversation history dictionary grows indefinitely because old sessions are never removed. Fix: implement TTL-based session expiry (remove sessions idle > 2 hours) and cap maximum conversation history length per session',
      C: 'Increase pod memory limits to 64GB to accommodate growth',
      D: 'Switch to a stateless agent that stores no conversation history'
    },
    answer: 'B',
    explanation: 'Agent memory leaks commonly occur from unbounded data structures. Every user session adds to the in-memory dictionary and is never cleaned up → linear memory growth → OOMKilled. Fix: (1) TTL expiry: background job removes sessions with last_active > 2 hours. (2) History capping: keep only last 20 turns per session. (3) Persist to Redis with built-in TTL. Increasing limits only delays the crash.' },

  { id: 8205, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Scenario: SLO Breach', difficulty: 'hard', keywords: ['scenario', 'SLO', 'error budget', 'burn rate'],
    question: 'Your AI API has a 99.5% availability SLO (monthly error budget = 3.6 hours). On Monday morning, an error rate spike runs for 2 hours, consuming 55% of your monthly error budget. What should happen next?',
    options: {
      A: 'Continue normal operations — 45% of the budget remains for the month',
      B: 'Trigger an error budget review: freeze non-critical deployments for the rest of the month, focus engineering on reliability improvements, and investigate root cause to prevent recurrence — you cannot risk losing the remaining 45% budget',
      C: 'Wait to see if the budget is exceeded before taking action',
      D: 'Increase the SLO to 99% to give more error budget headroom'
    },
    answer: 'B',
    explanation: 'Error budget management: 55% consumed in 1 of 30 days = you\'re burning budget at 16.5x the sustainable rate. If this pace continues, you\'ll breach SLO by day 2. Correct response: error budget policy triggers → freeze risky changes → all-hands on reliability. This is why error budget policies exist — they create automatic governance, not just metrics.' },
];
