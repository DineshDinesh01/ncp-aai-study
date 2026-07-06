import { Question, TestResult, StudyProgress } from './types';

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function selectMockQuestions(all: Question[], count = 65): Question[] {
  const byDomain: Record<number, Question[]> = {};
  all.forEach(q => {
    if (!byDomain[q.domain]) byDomain[q.domain] = [];
    byDomain[q.domain].push(q);
  });
  const weights: Record<number, number> = {
    1: 0.15, 2: 0.15, 3: 0.13, 4: 0.13, 5: 0.10,
    6: 0.10, 7: 0.07, 8: 0.08, 9: 0.05, 10: 0.05,
  };
  const selected: Question[] = [];
  Object.entries(weights).forEach(([domain, w]) => {
    const n = Math.round(count * w);
    const pool = shuffle(byDomain[Number(domain)] || []);
    selected.push(...pool.slice(0, n));
  });
  return shuffle(selected).slice(0, count);
}

export function calcScore(questions: Question[], answers: Record<number, string>): TestResult {
  const domainScores: Record<number, { correct: number; total: number }> = {};
  let correct = 0, incorrect = 0, unanswered = 0;

  questions.forEach(q => {
    if (!domainScores[q.domain]) domainScores[q.domain] = { correct: 0, total: 0 };
    domainScores[q.domain].total++;
    const given = answers[q.id];
    if (!given) { unanswered++; return; }
    const normalizeAnswer = (a: string) => a.split('').sort().join('');
    if (normalizeAnswer(given) === normalizeAnswer(q.answer)) {
      correct++;
      domainScores[q.domain].correct++;
    } else {
      incorrect++;
    }
  });

  return {
    totalQuestions: questions.length,
    correct,
    incorrect,
    unanswered,
    score: Math.round((correct / questions.length) * 100),
    passed: correct / questions.length >= 0.75,
    domainScores,
    answers,
    questions,
    timeTaken: 0,
  };
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function saveProgress(progress: StudyProgress) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('ncp_study_progress', JSON.stringify({
    ...progress,
    attempted: Array.from(progress.attempted),
    correct: Array.from(progress.correct),
    incorrect: Array.from(progress.incorrect),
  }));
}

export function loadProgress(): StudyProgress {
  if (typeof window === 'undefined') return { attempted: [], correct: [], incorrect: [], lastSession: '' };
  try {
    const raw = localStorage.getItem('ncp_study_progress');
    if (!raw) return { attempted: [], correct: [], incorrect: [], lastSession: '' };
    return JSON.parse(raw);
  } catch { return { attempted: [], correct: [], incorrect: [], lastSession: '' }; }
}

const TRACKER_API = 'http://localhost:9147';

async function postToTracker(type: 'ncp' | 'certiq', result: TestResult) {
  try {
    await fetch(`${TRACKER_API}/api/results?type=${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    });
  } catch { /* API offline — silently ignore */ }
}

export function saveTestResult(result: TestResult) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('ncp_last_result', JSON.stringify(result));
  saveTestHistory(result);
  postToTracker('ncp', result);
}

export function saveTestHistory(result: TestResult) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem('ncp_test_history');
    const history: (TestResult & { takenAt: string })[] = raw ? JSON.parse(raw) : [];
    const entry = { ...result, takenAt: new Date().toISOString() };
    history.unshift(entry);
    if (history.length > 10) history.splice(10);
    localStorage.setItem('ncp_test_history', JSON.stringify(history));
  } catch { /* ignore */ }
}

export function loadTestHistory(): (TestResult & { takenAt: string })[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('ncp_test_history');
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function loadTestResult(): TestResult | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('ncp_last_result');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export const DOMAIN_NAMES: Record<number, string> = {
  1: 'Agent Architecture & Design',
  2: 'Agent Development',
  3: 'Evaluation & Tuning',
  4: 'Deployment & Scaling',
  5: 'Cognition, Planning & Memory',
  6: 'Knowledge Integration & Data',
  7: 'NVIDIA Platform Implementation',
  8: 'Reliability & Error Handling',
  9: 'Safety, Ethics & Compliance',
  10: 'Human-AI Interaction & Oversight',
};

export const DOMAIN_WEIGHTS: Record<number, number> = {
  1: 15, 2: 15, 3: 13, 4: 13, 5: 10,
  6: 10, 7: 7, 8: 8, 9: 5, 10: 5,
};

export function saveCertiqHistory(result: TestResult) {
  if (typeof window === 'undefined') return;
  const existing = loadCertiqHistory();
  const entry = { ...result, takenAt: new Date().toISOString() };
  const updated = [entry, ...existing].slice(0, 10);
  localStorage.setItem('certiq_test_history', JSON.stringify(updated));
}

export function loadCertiqHistory(): (TestResult & { takenAt: string })[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('certiq_test_history');
    if (raw) return JSON.parse(raw);
    // Seed from single last result if history not yet created
    const last = localStorage.getItem('certiq_last_result');
    if (last) {
      const r = JSON.parse(last) as TestResult;
      const entry = { ...r, takenAt: new Date().toISOString() };
      localStorage.setItem('certiq_test_history', JSON.stringify([entry]));
      return [entry];
    }
    return [];
  } catch { return []; }
}

export function saveCertiqResult(result: TestResult) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('certiq_last_result', JSON.stringify(result));
  saveCertiqHistory(result);
  postToTracker('certiq', result);
}

export function loadCertiqResult(): TestResult | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('certiq_last_result');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export const DOMAIN_COLORS: Record<number, string> = {
  1: '#76b900', 2: '#0ea5e9', 3: '#f59e0b', 4: '#8b5cf6',
  5: '#ec4899', 6: '#06b6d4', 7: '#10b981', 8: '#ef4444',
  9: '#f97316', 10: '#6366f1',
};

export function saveSetProgress(setIndex: number) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('ncp_last_set', String(setIndex));
}

export function loadLastSet(): number {
  if (typeof window === 'undefined') return 0;
  return Number(localStorage.getItem('ncp_last_set') || '0');
}

export function markSetDone(setIndex: number, score: number) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`ncp_set_done_${setIndex}`, String(score));
}

export function getSetScore(setIndex: number): number | null {
  if (typeof window === 'undefined') return null;
  const v = localStorage.getItem(`ncp_set_done_${setIndex}`);
  return v !== null ? Number(v) : null;
}

export function saveDrillQuestions(questionIds: number[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('ncp_drill_ids', JSON.stringify(questionIds));
}

export function loadDrillQuestions(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('ncp_drill_ids');
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
