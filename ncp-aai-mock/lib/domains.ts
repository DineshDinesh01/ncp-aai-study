import { DomainInfo } from './types';

export const DOMAINS: DomainInfo[] = [
  { id: 1, name: 'Agent Architecture and Design', weight: 15, color: '#76b900' },
  { id: 2, name: 'Agent Development', weight: 15, color: '#00a3e0' },
  { id: 3, name: 'Evaluation and Tuning', weight: 13, color: '#f59e0b' },
  { id: 4, name: 'Deployment and Scaling', weight: 13, color: '#ef4444' },
  { id: 5, name: 'Cognition, Planning, and Memory', weight: 10, color: '#8b5cf6' },
  { id: 6, name: 'Knowledge Integration and Data Handling', weight: 10, color: '#06b6d4' },
  { id: 7, name: 'NVIDIA Platform Implementation', weight: 7, color: '#76b900' },
  { id: 8, name: 'Reliability and Error Handling', weight: 8, color: '#f97316' },
  { id: 9, name: 'Safety, Ethics, and Compliance', weight: 5, color: '#ec4899' },
  { id: 10, name: 'Human-AI Interaction and Oversight', weight: 5, color: '#14b8a6' },
];

export const PASS_SCORE = 75;
export const TARGET_SCORE = 90;
export const EXAM_QUESTIONS = 65;
export const EXAM_MINUTES = 90;