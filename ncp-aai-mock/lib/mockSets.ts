import { Question } from './types';

export const QUESTIONS_PER_SET = 65;

// Must sum to 65
export const DOMAIN_ALLOCATIONS: Record<number, number> = {
  1: 9, 2: 9, 3: 9, 4: 8, 5: 7, 6: 6, 7: 4, 8: 5, 9: 4, 10: 4,
};

function isScenario(q: Question): boolean {
  if (q.isScenario === true) return true;
  if (q.topic.toLowerCase().includes('scenario')) return true;
  const text = q.question.toLowerCase();
  return (
    text.startsWith('you are building') ||
    text.startsWith('you are deploying') ||
    text.startsWith('you are implementing') ||
    text.startsWith('you are designing') ||
    text.startsWith('your team is') ||
    text.startsWith('your engineering team') ||
    text.startsWith('you have been') ||
    text.startsWith("you're building") ||
    text.startsWith('during a production') ||
    text.startsWith('a customer reports') ||
    text.startsWith('an audit reveals') ||
    text.startsWith('a security researcher')
  );
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateAllMockSets(questions: Question[]): Question[][] {
  const byDomain: Record<number, { scenario: Question[]; knowledge: Question[] }> = {};

  for (const q of questions) {
    if (!byDomain[q.domain]) byDomain[q.domain] = { scenario: [], knowledge: [] };
    if (isScenario(q)) {
      byDomain[q.domain].scenario.push(q);
    } else {
      byDomain[q.domain].knowledge.push(q);
    }
  }

  // Shuffle each pool with a fixed seed so sets are deterministic across page loads
  for (const d of Object.keys(byDomain)) {
    const dn = Number(d);
    byDomain[dn].scenario = seededShuffle(byDomain[dn].scenario, dn * 17 + 31);
    byDomain[dn].knowledge = seededShuffle(byDomain[dn].knowledge, dn * 43 + 97);
  }

  // Track how many have been used from each pool
  const usedScenario: Record<number, number> = {};
  const usedKnowledge: Record<number, number> = {};
  for (const d of Object.keys(byDomain)) {
    usedScenario[Number(d)] = 0;
    usedKnowledge[Number(d)] = 0;
  }

  const sets: Question[][] = [];

  while (true) {
    const setQuestions: Question[] = [];
    let canFill = true;

    for (const [domainStr, alloc] of Object.entries(DOMAIN_ALLOCATIONS)) {
      const d = Number(domainStr);
      const pool = byDomain[d] || { scenario: [], knowledge: [] };

      const scenarioAlloc = Math.floor(alloc / 2);
      const knowledgeAlloc = alloc - scenarioAlloc;

      const availableScenario = pool.scenario.length - (usedScenario[d] || 0);
      const availableKnowledge = pool.knowledge.length - (usedKnowledge[d] || 0);

      if (availableScenario < scenarioAlloc || availableKnowledge < knowledgeAlloc) {
        canFill = false;
        break;
      }

      const scenarioSlice = pool.scenario.slice(usedScenario[d], usedScenario[d] + scenarioAlloc);
      const knowledgeSlice = pool.knowledge.slice(usedKnowledge[d], usedKnowledge[d] + knowledgeAlloc);

      setQuestions.push(...scenarioSlice, ...knowledgeSlice);
      usedScenario[d] = (usedScenario[d] || 0) + scenarioAlloc;
      usedKnowledge[d] = (usedKnowledge[d] || 0) + knowledgeAlloc;
    }

    if (!canFill) break;

    // Shuffle within set so domain grouping isn't obvious
    sets.push(seededShuffle(setQuestions, sets.length * 7919 + 1234));
  }

  return sets;
}

let _cachedSets: Question[][] | null = null;

export function resetMockSetCache() {
  _cachedSets = null;
}

export function getMockSet(questions: Question[], setIndex: number): Question[] {
  if (!_cachedSets) {
    _cachedSets = generateAllMockSets(questions);
  }
  if (setIndex < 0 || setIndex >= _cachedSets.length) return _cachedSets[0] ?? [];
  return _cachedSets[setIndex];
}

export function getTotalSets(questions: Question[]): number {
  if (!_cachedSets) {
    _cachedSets = generateAllMockSets(questions);
  }
  return _cachedSets.length;
}
