import { Question } from '../types';

export const domain5gQuestions: Question[] = [
  { id: 5096, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Analogical Problem Solving', difficulty: 'hard', keywords: ['analogy', 'transfer', 'source', 'target'],
    question: 'Analogical problem solving in AI agents involves:',
    options: { A: 'Using analogies as rhetorical devices in responses', B: 'Identifying structural similarities between a new problem (target) and a solved problem (source) — transferring the solution strategy across domains', C: 'Analogical reasoning is only applicable to literary tasks', D: 'Analogies reduce problem complexity but always reduce accuracy' },
    answer: 'B', explanation: 'Analogical transfer: new problem "design agent retry policy" → structurally similar to "design network packet retransmission" (solved) → apply exponential backoff, jitter, max retries → adapt: for agents, check error type first (transient vs permanent). Cross-domain solution transfer via structural mapping.' },

  { id: 5097, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Memory Salience', difficulty: 'medium', keywords: ['salience', 'importance', 'attention', 'priority'],
    question: 'Memory salience scoring for automatic importance assessment uses signals like:',
    options: { A: 'Memory file size as the primary salience indicator', B: 'Recency (how recently created), frequency (how often retrieved), emotional valence (strong user reaction), and explicit importance markers (user said "remember this")', C: 'All memories have equal salience by design', D: 'Salience can only be determined by human annotation' },
    answer: 'B', explanation: 'Automatic salience: base_score = recency_weight * age_decay + frequency_weight * access_count + surprise_weight * unexpected_info + explicit_weight * flagged_by_user. High-salience memories retrieved preferentially in limited context windows. Auto-archiving low-salience old memories manages memory growth.' },

  { id: 5098, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Inhibition in Cognition', difficulty: 'hard', keywords: ['inhibition', 'distraction', 'noise', 'filtering'],
    question: 'Cognitive inhibition for AI agents (suppressing irrelevant information) is important because:',
    options: { A: 'Inhibition prevents agents from having too many memories', B: 'Without active suppression of irrelevant context, agents are distracted by noise — a highly retrieved but irrelevant memory can override the correct answer', C: 'Inhibition only applies to visual perception tasks', D: 'LLM attention mechanisms automatically handle all filtering' },
    answer: 'B', explanation: 'Cognitive inhibition example: agent asked "What is our Q4 plan?" but has many cached documents from previous years → without inhibition, retrieves salient old Q4 plans → generates wrong response. Inhibition: temporal filter ("only consider 2024 documents"), relevance threshold pruning.' },

  { id: 5099, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Schema-Based Reasoning', difficulty: 'medium', keywords: ['schema', 'template', 'expectation', 'default'],
    question: 'Schema-based reasoning in AI agents uses pre-built mental structures to:',
    options: { A: 'Validate JSON schema formats in API calls', B: 'Rapidly fill in expected details for familiar situations without explicit reasoning — "meeting schema": attendees, agenda, location, duration, follow-up', C: 'Schema reasoning only applies to database schema design', D: 'Schemas constrain agents from handling novel situations' },
    answer: 'B', explanation: 'Agent schemas: "new employee onboarding schema" → {setup_accounts, assign_buddy, schedule_orientation, provision_equipment, add_to_slack_channels} — agent fills in defaults and quickly identifies what\'s missing. Schemas encode typical patterns for familiar task types, enabling efficient handling.' },

  { id: 5100, domain: 5, domainName: 'Cognition, Planning & Memory', topic: 'Goal Commitment', difficulty: 'medium', keywords: ['commitment', 'goal stability', 'sunk cost', 'replanning'],
    question: 'Appropriate goal commitment vs flexibility in AI agents means:',
    options: { A: 'Agents should always stick to their initial plan regardless of new information', B: 'Maintaining goals long enough to achieve sub-goals (avoiding premature abandonment) while remaining open to replanning when evidence clearly indicates the goal is unachievable or misaligned', C: 'Agents should replan after every single action', D: 'Goal commitment is only relevant for multi-step tasks over 10 minutes' },
    answer: 'B', explanation: 'Goal commitment balance: too flexible → "grass is greener" thrashing, never completing tasks. Too rigid → sunk cost fallacy, pursuing clearly failed approach. Signal for replanning: cost_to_continue >> expected_benefit, or new information fundamentally changes the problem definition.' },
];
