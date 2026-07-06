'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ALL_QUESTIONS } from '@/lib/questions';
import { loadProgress, saveProgress, DOMAIN_NAMES, DOMAIN_COLORS } from '@/lib/utils';
import { Question, StudyProgress } from '@/lib/types';

const DOMAINS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const PAGE_SIZE = 10;

function normalizeTopic(topic: string): string {
  return topic.replace(/^Scenario:\s*/i, '').trim();
}

function StudyContent() {
  const searchParams = useSearchParams();
  const initDomain = Number(searchParams.get('domain') || 0);

  const [domain, setDomain] = useState(initDomain);
  const [page, setPage] = useState(0);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [progress, setProgress] = useState<StudyProgress>({ attempted: [], correct: [], incorrect: [], lastSession: '' });
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState<string>('all');
  const [topic, setTopic] = useState<string>('all');
  const [scenarioOnly, setScenarioOnly] = useState(false);

  // Deduplicated, normalized topic list
  const allTopics = Array.from(new Set(
    ALL_QUESTIONS.map(q => normalizeTopic(q.topic))
  )).sort().filter(t => t.length > 2);

  useEffect(() => { setProgress(loadProgress()); }, []);
  useEffect(() => { setPage(0); setRevealed(new Set()); }, [domain, search, difficulty, topic, scenarioOnly]);

  const filtered = ALL_QUESTIONS.filter(q => {
    if (domain !== 0 && q.domain !== domain) return false;
    if (difficulty !== 'all' && q.difficulty !== difficulty) return false;
    if (topic !== 'all' && normalizeTopic(q.topic) !== topic) return false;
    if (scenarioOnly && !q.isScenario) return false;
    if (search) {
      const s = search.toLowerCase();
      return q.question.toLowerCase().includes(s) || q.topic.toLowerCase().includes(s) || q.keywords.some(k => k.toLowerCase().includes(s));
    }
    return true;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageQs = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleReveal = (q: Question, selectedOpt?: string) => {
    setRevealed(r => { const n = new Set(r); n.add(q.id); return n; });
    const norm = (a: string) => a.split('').sort().join('');
    const prog = { ...progress };
    if (!prog.attempted.includes(q.id)) prog.attempted = [...prog.attempted, q.id];
    if (selectedOpt) {
      const isCorrect = norm(selectedOpt) === norm(q.answer);
      if (isCorrect && !prog.correct.includes(q.id)) {
        prog.correct = [...prog.correct, q.id];
        prog.incorrect = prog.incorrect.filter(id => id !== q.id);
      } else if (!isCorrect && !prog.incorrect.includes(q.id)) {
        prog.incorrect = [...prog.incorrect, q.id];
      }
    }
    prog.lastSession = new Date().toISOString();
    setProgress(prog);
    saveProgress(prog);
  };

  const activeDrill = scenarioOnly && difficulty === 'hard';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 700 }}>← Dashboard</Link>
        <span style={{ fontWeight: 600 }}>Study Mode — {filtered.length} of {ALL_QUESTIONS.length} Questions</span>
        <Link href="/mock" style={{ padding: '6px 16px', borderRadius: 6, background: 'var(--green)', color: '#000', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Mock Test</Link>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px' }}>

        {/* Domain Quick-Drill bar */}
        <div style={{ marginBottom: 16, overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: 8, paddingBottom: 4, minWidth: 'max-content', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--muted)', whiteSpace: 'nowrap', fontWeight: 600 }}>Quick Drill:</span>
            {[1,2,3,4,5,6,7,8,9,10].map(d => {
              const active = domain === d && activeDrill;
              return (
                <button key={d}
                  onClick={() => { setDomain(d); setDifficulty('hard'); setScenarioOnly(true); setTopic('all'); setSearch(''); }}
                  style={{
                    padding: '5px 12px',
                    background: active ? 'var(--green)' : 'var(--surface2)',
                    border: `1px solid ${active ? 'var(--green)' : 'var(--border)'}`,
                    borderRadius: 20, fontSize: 12, cursor: 'pointer',
                    color: active ? '#000' : 'var(--muted)',
                    whiteSpace: 'nowrap', fontWeight: 600,
                  }}>
                  D{d}
                </button>
              );
            })}
            <button
              onClick={() => { setDomain(0); setDifficulty('hard'); setScenarioOnly(true); setTopic('all'); setSearch(''); }}
              style={{
                padding: '5px 14px',
                background: domain === 0 && activeDrill ? 'rgba(239,68,68,0.25)' : 'rgba(239,68,68,0.1)',
                border: '1px solid var(--incorrect)',
                borderRadius: 20, fontSize: 12, cursor: 'pointer',
                color: 'var(--incorrect)', whiteSpace: 'nowrap', fontWeight: 700,
              }}>
              All Hard Scenarios
            </button>
            {(domain !== 0 || difficulty !== 'all' || scenarioOnly || topic !== 'all' || search) && (
              <button
                onClick={() => { setDomain(0); setDifficulty('all'); setScenarioOnly(false); setTopic('all'); setSearch(''); }}
                style={{ padding: '5px 12px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 20, fontSize: 12, cursor: 'pointer', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                ✕ Reset
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 16, marginBottom: 24, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text" placeholder="Search questions, topics, keywords..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: 200, padding: '8px 12px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 14 }}
          />
          <select value={domain} onChange={e => setDomain(Number(e.target.value))}
            style={{ padding: '8px 12px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 13 }}>
            <option value={0}>All Domains</option>
            {DOMAINS.slice(1).map(d => <option key={d} value={d}>D{d}: {DOMAIN_NAMES[d]}</option>)}
          </select>
          <select value={topic} onChange={e => setTopic(e.target.value)}
            style={{ padding: '8px 12px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 13, maxWidth: 220 }}>
            <option value="all">All Topics</option>
            {allTopics.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={difficulty} onChange={e => setDifficulty(e.target.value)}
            style={{ padding: '8px 12px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 13 }}>
            <option value="all">All Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--muted)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            <input type="checkbox" checked={scenarioOnly} onChange={e => setScenarioOnly(e.target.checked)} />
            Scenario only
          </label>
        </div>

        {/* Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {pageQs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60, color: 'var(--muted)' }}>
              No questions match your filters.{' '}
              <button onClick={() => { setDomain(0); setDifficulty('all'); setScenarioOnly(false); setTopic('all'); setSearch(''); }}
                style={{ color: 'var(--green)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, textDecoration: 'underline' }}>
                Reset filters
              </button>
            </div>
          ) : pageQs.map((q, idx) => (
            <StudyQuestion
              key={q.id}
              q={q}
              num={page * PAGE_SIZE + idx + 1}
              revealed={revealed.has(q.id)}
              onReveal={(opt) => handleReveal(q, opt)}
              wasCorrect={progress.correct.includes(q.id)}
              wasAttempted={progress.attempted.includes(q.id)}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 32 }}>
            <button onClick={() => { setPage(0); setRevealed(new Set()); }} disabled={page === 0} style={pageBtn(page === 0)}>«</button>
            <button onClick={() => { setPage(p => p - 1); setRevealed(new Set()); }} disabled={page === 0} style={pageBtn(page === 0)}>‹ Prev</button>
            <span style={{ fontSize: 13, color: 'var(--muted)', padding: '0 12px' }}>Page {page + 1} of {totalPages}</span>
            <button onClick={() => { setPage(p => p + 1); setRevealed(new Set()); }} disabled={page === totalPages - 1} style={pageBtn(page === totalPages - 1)}>Next ›</button>
            <button onClick={() => { setPage(totalPages - 1); setRevealed(new Set()); }} disabled={page === totalPages - 1} style={pageBtn(page === totalPages - 1)}>»</button>
          </div>
        )}
      </div>
    </div>
  );
}

const pageBtn = (disabled: boolean): React.CSSProperties => ({
  padding: '8px 14px', background: 'var(--surface)', border: '1px solid var(--border)',
  color: disabled ? 'var(--muted)' : 'var(--text)', borderRadius: 6,
  cursor: disabled ? 'not-allowed' : 'pointer', fontSize: 13,
});

function StudyQuestion({ q, num, revealed, onReveal, wasCorrect, wasAttempted }: {
  q: Question; num: number; revealed: boolean; onReveal: (opt?: string) => void;
  wasCorrect: boolean; wasAttempted: boolean;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const isMulti = q.answer.length > 1;
  const answerCount = q.answerCount ?? (isMulti ? q.answer.length : 1);
  const color = DOMAIN_COLORS[q.domain];

  const handleSelect = (opt: string) => {
    if (revealed) return;
    if (isMulti) setSelected(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]);
    else { setSelected([opt]); onReveal(opt); }
  };

  const handleCheck = () => { if (selected.length > 0) onReveal(selected.sort().join('')); };

  const getOptStyle = (opt: string): React.CSSProperties => {
    if (!revealed) {
      const isSel = selected.includes(opt);
      return { background: isSel ? 'rgba(118,185,0,0.12)' : 'var(--surface2)', border: `1.5px solid ${isSel ? 'var(--green)' : 'var(--border)'}`, color: 'var(--text)' };
    }
    const norm = (a: string) => a.split('').sort().join('');
    const isCorrect = norm(q.answer).includes(opt);
    const isSelected = selected.includes(opt);
    if (isCorrect) return { background: 'rgba(35,134,54,0.15)', border: '1.5px solid var(--correct)', color: 'var(--text)' };
    if (isSelected) return { background: 'rgba(218,54,51,0.15)', border: '1.5px solid var(--incorrect)', color: 'var(--text)' };
    return { background: 'var(--surface2)', border: '1.5px solid var(--border)', color: 'var(--muted)' };
  };

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color, fontWeight: 600 }}>D{q.domain}</span>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>{q.topic}</span>
          <span style={{ fontSize: 11, padding: '1px 6px', borderRadius: 3, background: 'var(--surface2)', color: 'var(--muted)', textTransform: 'capitalize' }}>{q.difficulty}</span>
          {isMulti && <span style={{ fontSize: 11, padding: '1px 6px', borderRadius: 3, background: 'rgba(14,165,233,0.15)', color: '#0ea5e9' }}>Select {answerCount}</span>}
          {q.quality === 'preparto' && <span style={{ fontSize: 11, padding: '1px 6px', borderRadius: 3, background: 'rgba(118,185,0,0.15)', color: 'var(--green)' }}>Exam-level</span>}
          {wasAttempted && <span style={{ fontSize: 11, padding: '1px 6px', borderRadius: 3, background: wasCorrect ? 'rgba(35,134,54,0.15)' : 'rgba(218,54,51,0.15)', color: wasCorrect ? 'var(--correct)' : 'var(--incorrect)' }}>{wasCorrect ? '✓ Correct before' : '✗ Incorrect before'}</span>}
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.65, marginBottom: 16, fontWeight: 500 }}><span style={{ color: 'var(--muted)', marginRight: 8 }}>#{num}</span>{q.question}</p>
      </div>

      <div style={{ padding: '0 20px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {(['A', 'B', 'C', 'D', 'E'] as const).filter(opt => opt !== 'E' || q.options.E).map(opt => {
          const norm = (a: string) => a.split('').sort().join('');
          const isCorrect = revealed && norm(q.answer).includes(opt);
          return (
            <button key={opt} onClick={() => handleSelect(opt)} disabled={revealed}
              style={{ ...getOptStyle(opt), padding: '10px 14px', borderRadius: 8, cursor: revealed ? 'default' : 'pointer', display: 'flex', gap: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 14, lineHeight: 1.5 }}>
              <span style={{ fontWeight: 700, minWidth: 20, flexShrink: 0, color: isCorrect ? 'var(--correct)' : selected.includes(opt) && revealed ? 'var(--incorrect)' : 'var(--green)' }}>{opt}.</span>
              <span>{q.options[opt]}</span>
              {isCorrect && <span style={{ marginLeft: 'auto', color: 'var(--correct)', flexShrink: 0 }}>✓</span>}
            </button>
          );
        })}
      </div>

      {isMulti && !revealed && selected.length > 0 && (
        <div style={{ padding: '0 20px 16px' }}>
          <button onClick={handleCheck} style={{ padding: '8px 20px', background: 'var(--green)', color: '#000', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
            Check Answer ({selected.length}/{answerCount} selected)
          </button>
        </div>
      )}

      {!revealed && selected.length === 0 && !isMulti && (
        <div style={{ padding: '0 20px 12px' }}>
          <button onClick={() => onReveal()} style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--muted)', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
            Show Answer
          </button>
        </div>
      )}

      {revealed && (
        <div style={{ margin: '0 20px 20px', background: 'rgba(118,185,0,0.08)', border: '1px solid rgba(118,185,0,0.2)', borderRadius: 8, padding: 14 }}>
          <div style={{ fontSize: 12, color: 'var(--green)', fontWeight: 600, marginBottom: 6 }}>EXPLANATION</div>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text)', margin: 0 }}>{q.explanation}</p>
          {q.keywords.length > 0 && (
            <div style={{ marginTop: 10, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              {q.keywords.map(k => <span key={k} style={{ fontSize: 11, padding: '2px 7px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 3, color: 'var(--muted)' }}>{k}</span>)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function StudyPage() {
  return <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--muted)' }}>Loading...</div>}><StudyContent /></Suspense>;
}
