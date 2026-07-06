'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadTestResult, loadTestHistory, DOMAIN_NAMES, DOMAIN_COLORS } from '@/lib/utils';
import { Question, TestResult } from '@/lib/types';

type HistoryEntry = TestResult & { takenAt: string };

export default function Review() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [result, setResult] = useState<TestResult | null>(null);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<'all' | 'wrong' | 'unanswered'>('wrong');

  useEffect(() => {
    const hist = loadTestHistory();
    if (hist.length > 0) {
      setHistory(hist);
      setResult(hist[0]);
    } else {
      // fallback to single last result
      const last = loadTestResult();
      if (last) setResult(last);
    }
  }, []);

  const selectTest = (idx: number) => {
    setSelectedIdx(idx);
    setResult(history[idx]);
    setExpanded(new Set());
    setFilter('wrong');
  };

  const toggleExpand = (id: number) => {
    setExpanded(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const expandAll = () => {
    if (!result) return;
    setExpanded(new Set(getDisplayQuestions().map(q => q.id)));
  };

  const collapseAll = () => setExpanded(new Set());

  const getOptionStyle = (q: Question, opt: string, given: string | undefined) => {
    const norm = (a: string) => a.split('').sort().join('');
    const isCorrect = norm(q.answer).includes(opt);
    const isSelected = given?.includes(opt);
    if (isCorrect) return { background: 'rgba(35,134,54,0.15)', border: '1.5px solid var(--correct)', color: 'var(--text)' };
    if (isSelected && !isCorrect) return { background: 'rgba(218,54,51,0.15)', border: '1.5px solid var(--incorrect)', color: 'var(--text)' };
    return { background: 'var(--surface2)', border: '1.5px solid var(--border)', color: 'var(--muted)' };
  };

  if (!result) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: 16 }}>
      <p style={{ color: 'var(--muted)' }}>No results found. Take a mock test first.</p>
      <Link href="/mock" style={{ padding: '10px 24px', background: 'var(--green)', color: '#000', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Start Mock Test</Link>
    </div>
  );

  const getDisplayQuestions = () => {
    if (!result) return [];
    if (filter === 'wrong') {
      return result.questions.filter(q => {
        const given = result.answers[q.id];
        if (!given) return false;
        const norm = (a: string) => a.split('').sort().join('');
        return norm(given) !== norm(q.answer);
      });
    }
    if (filter === 'unanswered') return result.questions.filter(q => !result.answers[q.id]);
    return result.questions;
  };

  const displayQs = getDisplayQuestions();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/results" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 700 }}>← Results</Link>
        <span style={{ fontWeight: 600, fontSize: 15 }}>Answer Review</span>
        <Link href="/mock" style={{ padding: '6px 16px', borderRadius: 6, background: 'var(--green)', color: '#000', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Retake</Link>
      </nav>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px 20px' }}>

        {/* History selector */}
        {history.length > 1 && (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px', marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10, fontWeight: 600 }}>SELECT TEST TO REVIEW ({history.length} saved)</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {history.map((h, i) => {
                const d = new Date(h.takenAt);
                const label = `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                const scoreColor = h.score >= 85 ? 'var(--correct)' : h.score >= 75 ? 'var(--warning)' : 'var(--incorrect)';
                const isSelected = i === selectedIdx;
                return (
                  <button key={i} onClick={() => selectTest(i)}
                    style={{ padding: '8px 14px', borderRadius: 7, border: `1.5px solid ${isSelected ? 'var(--green)' : 'var(--border)'}`,
                      background: isSelected ? 'rgba(118,185,0,0.1)' : 'var(--surface2)', cursor: 'pointer', fontSize: 12, textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, color: scoreColor }}>{h.score}%</div>
                    <div style={{ color: 'var(--muted)', fontSize: 11 }}>{label}</div>
                    <div style={{ color: 'var(--muted)', fontSize: 11 }}>{h.incorrect} wrong · {h.unanswered} skipped</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Summary bar */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: result.score >= 75 ? 'var(--correct)' : 'var(--incorrect)' }}>{result.score}%</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>{result.correct} correct · {result.incorrect} wrong · {result.unanswered} skipped · {result.totalQuestions} total</div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <button onClick={expandAll} style={{ padding: '5px 12px', borderRadius: 5, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--muted)', cursor: 'pointer', fontSize: 12 }}>Expand All</button>
            <button onClick={collapseAll} style={{ padding: '5px 12px', borderRadius: 5, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--muted)', cursor: 'pointer', fontSize: 12 }}>Collapse All</button>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {([['wrong', `Wrong (${result.incorrect})`], ['unanswered', `Unanswered (${result.unanswered})`], ['all', `All (${result.totalQuestions})`]] as const).map(([f, label]) => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '8px 16px', borderRadius: 6, border: `1.5px solid ${filter === f ? 'var(--green)' : 'var(--border)'}`, background: filter === f ? 'rgba(118,185,0,0.12)' : 'var(--surface)', color: filter === f ? 'var(--green)' : 'var(--muted)', cursor: 'pointer', fontSize: 13, fontWeight: filter === f ? 600 : 400 }}>
              {label}
            </button>
          ))}
        </div>

        {displayQs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--muted)' }}>
            {filter === 'wrong' ? '✅ No wrong answers! Great job!' : 'No questions in this category.'}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {displayQs.map((q, idx) => {
              const given = result.answers[q.id];
              const norm = (a: string) => a.split('').sort().join('');
              const isCorrect = given && norm(given) === norm(q.answer);
              const isExpanded = expanded.has(q.id);
              const color = DOMAIN_COLORS[q.domain];

              return (
                <div key={q.id} style={{ background: 'var(--surface)', border: `1px solid ${isCorrect ? 'var(--correct)' : !given ? 'var(--border)' : 'var(--incorrect)'}`, borderRadius: 12, overflow: 'hidden' }}>
                  <button onClick={() => toggleExpand(q.id)} style={{ width: '100%', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{isCorrect ? '✅' : !given ? '⬜' : '❌'}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                        <span style={{ fontSize: 11, color, fontWeight: 600 }}>D{q.domain} · {DOMAIN_NAMES[q.domain]}</span>
                        <span style={{ fontSize: 11, color: 'var(--muted)' }}>{q.topic}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                        <p style={{ fontSize: 14, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>{idx + 1}. {q.question}</p>
                        {result.questionTimes?.[q.id] != null && (
                          <span style={{ fontSize: 11, flexShrink: 0, whiteSpace: 'nowrap', color: (result.questionTimes[q.id] ?? 0) > 180 ? 'var(--warning)' : 'var(--muted)' }}>
                            ⏱ {Math.floor((result.questionTimes[q.id] ?? 0) / 60)}m {(result.questionTimes[q.id] ?? 0) % 60}s{(result.questionTimes[q.id] ?? 0) > 180 ? ' ⚠' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    <span style={{ color: 'var(--muted)', fontSize: 12, flexShrink: 0 }}>{isExpanded ? '▲' : '▼'}</span>
                  </button>

                  {isExpanded && (
                    <div style={{ padding: '0 20px 20px', borderTop: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16, marginBottom: 16 }}>
                        {(['A', 'B', 'C', 'D', 'E'] as const).filter(opt => opt !== 'E' || q.options.E).map(opt => {
                          const s = getOptionStyle(q, opt, given);
                          const isCorrectOpt = norm(q.answer).includes(opt);
                          return (
                            <div key={opt} style={{ padding: '10px 14px', borderRadius: 8, ...s, display: 'flex', gap: 10 }}>
                              <span style={{ fontWeight: 700, minWidth: 20, color: isCorrectOpt ? 'var(--correct)' : given?.includes(opt) ? 'var(--incorrect)' : 'var(--muted)' }}>{opt}.</span>
                              <span style={{ fontSize: 14 }}>{q.options[opt]}</span>
                              {isCorrectOpt && <span style={{ marginLeft: 'auto', color: 'var(--correct)', flexShrink: 0 }}>✓ Correct</span>}
                              {given?.includes(opt) && !isCorrectOpt && <span style={{ marginLeft: 'auto', color: 'var(--incorrect)', flexShrink: 0 }}>✗ Your Answer</span>}
                            </div>
                          );
                        })}
                      </div>

                      <div style={{ background: 'rgba(118,185,0,0.08)', border: '1px solid rgba(118,185,0,0.2)', borderRadius: 8, padding: 14 }}>
                        <div style={{ fontSize: 12, color: 'var(--green)', fontWeight: 600, marginBottom: 6 }}>EXPLANATION</div>
                        <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text)', margin: 0 }}>{q.explanation}</p>
                      </div>

                      {q.keywords.length > 0 && (
                        <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {q.keywords.map(k => <span key={k} style={{ fontSize: 11, padding: '2px 8px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--muted)' }}>{k}</span>)}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
