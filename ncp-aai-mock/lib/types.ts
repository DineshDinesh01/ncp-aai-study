export interface Question {
  id: number;
  domain: number;
  domainName: string;
  topic: string;
  question: string;
  options: { A: string; B: string; C: string; D?: string; E?: string };
  answer: string;
  explanation: string;
  keywords: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  type?: 'single' | 'multi';
  answerCount?: number;
  isScenario?: boolean;
  quality?: 'standard' | 'preparto';
  verified?: boolean;
  recurrenceCount?: number;
}

export interface DomainInfo {
  id: number;
  name: string;
  weight: number;
  color: string;
}

export interface MockTestSession {
  questions: Question[];
  answers: Record<number, string>;
  flagged: Set<number>;
  startTime: number;
  endTime?: number;
  submitted: boolean;
}

export interface TestResult {
  totalQuestions: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  score: number;
  passed: boolean;
  domainScores: Record<number, { correct: number; total: number }>;
  answers: Record<number, string>;
  questions: Question[];
  timeTaken: number;
  questionTimes?: Record<number, number>;
}

export interface StudyProgress {
  attempted: number[];
  correct: number[];
  incorrect: number[];
  lastSession: string;
}