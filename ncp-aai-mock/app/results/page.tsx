'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadTestResult, loadTestHistory, DOMAIN_NAMES, DOMAIN_COLORS, formatTime, saveDrillQuestions } from '@/lib/utils';
import { TestResult } from '@/lib/types';

export default function Results() {
  const [result, setResult] = useState<TestResult | null>(null);
  const [history, setHistory] = useState<Array<{ score: number; takenAt: string }>>([]);

  useEffect(() => {
    const r = loadTestResult();
    setResult(r);
    const h = loadTestHistory();
    // oldest first, max 6 entries
    setHistory(h.slice(0, 6).reverse());
  }, []);

  const handleDrill = () => {
    if (!result) return;
    const norm = (a: string) => a.split('').sort().join('');
    const wrongIds = result.questions
      .filter(q => {
        const given = result.answers[q.id];
        if (!given) return true;
        return norm(given) !== norm(q.answer);
      })
      .map(q => q.id);
    saveDrillQuestions(wrongIds);
    window.location.href = '/drill';
  };

  const drillDomain = (domainNum: number) => {
    if (!result) return;
    const norm = (a: string) => a.split('').sort().join('');
    const ids = result.questions
      .filter(q => q.domain === domainNum)
      .filter(q => {
        const given = result.answers[q.id];
        if (!given) return true;
        return norm(given) !== norm(q.answer);
      })
      .map(q => q.id);
    if (ids.length === 0) return;
    saveDrillQuestions(ids);
    window.location.href = '/drill';
  };

  if (!result) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: 16 }}>
      <p style={{ color: 'var(--muted)' }}>No results found. Take a mock test first.</p>
      <Link href="/mock" style={{ padding: '10px 24px', background: 'var(--green)', color: '#000', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Start Mock Test</Link>
    </div>
  );

  const { score, correct, totalQuestions, incorrect, unanswered, passed, domainScores, timeTaken } = result;
  const toTarget = Math.max(0, 90 - score);
  const scoreColor = score >= 90 ? 'var(--correct)' : score >= 75 ? 'var(--warning)' : 'var(--incorrect)';

  const scoreC = (s: number) => s >= 90 ? 'var(--correct)' : s >= 75 ? 'var(--warning)' : 'var(--incorrect)';

  const readinessSummary = score >= 90
    ? { icon: '🏆', text: 'Exam ready! Schedule your exam now.', color: 'var(--correct)' }
    : score >= 80
    ? { icon: '📈', text: 'Close! Focus on weak domains below to push past 90%.', color: 'var(--warning)' }
    : score >= 75
    ? { icon: '✅', text: 'Passing — but aim for 85%+ before exam day for a safety margin.', color: 'var(--warning)' }
    : { icon: '⚠️', text: 'Not there yet. Drill your weak domains every day until the exam.', color: 'var(--incorrect)' };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 700 }}>← NCP-AAI PrepMaster</Link>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link href="/review" style={{ padding: '6px 16px', borderRadius: 6, background: 'var(--surface2)', color: 'var(--text)', textDecoration: 'none', fontSize: 14, border: '1px solid var(--border)' }}>Review Answers</Link>
          <Link href="/mock" style={{ padding: '6px 16px', borderRadius: 6, background: 'var(--green)', color: '#000', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Retake Test</Link>
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>

        {/* Progress Trend */}
        {history.length > 1 && (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, marginRight: 4 }}>PROGRESS:</span>
            {history.map((h, i) => {
              const isCurrent = i === history.length - 1;
              return (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{
                    fontSize: 13, fontWeight: isCurrent ? 800 : 500,
                    color: scoreC(h.score),
                    background: isCurrent ? 'rgba(118,185,0,0.12)' : 'transparent',
                    padding: isCurrent ? '2px 8px' : '0',
                    borderRadius: isCurrent ? 4 : 0,
                    border: isCurrent ? '1px solid var(--green)' : 'none',
                  }}>
                    {h.score}%
                  </span>
                  {i < history.length - 1 && <span style={{ color: 'var(--muted)', fontSize: 12 }}>→</span>}
                </span>
              );
            })}
            {history[history.length - 1].score > history[0].score && (
              <span style={{ fontSize: 12, color: 'var(--correct)', marginLeft: 8 }}>
                +{history[history.length - 1].score - history[0].score}% improvement
              </span>
            )}
          </div>
        )}

        {/* Readiness Summary */}
        <div style={{ background: 'var(--surface)', border: `1px solid ${readinessSummary.color}`, borderRadius: 10, padding: '12px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>{readinessSummary.icon}</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: readinessSummary.color }}>{readinessSummary.text}</span>
        </div>

        {/* Score Hero */}
        <div style={{ background: 'var(--surface)', border: `2px solid ${scoreColor}`, borderRadius: 16, padding: 32, textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 64, fontWeight: 800, color: scoreColor, marginBottom: 8 }}>{score}%</div>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
            {passed ? (score >= 90 ? '🏆 Excellent! Exam Ready!' : '✅ Passed') : '❌ Not Passed'}
          </div>
          {toTarget > 0 && (
            <div style={{ color: 'var(--warning)', fontSize: 14 }}>Need {toTarget}% more to reach the 90% target</div>
          )}
          {score >= 90 && <div style={{ color: 'var(--correct)', fontSize: 14 }}>You are ready for the NCP-AAI exam!</div>}
        </div>

        {/* Summary Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
          {[
            { label: 'Correct', value: correct, color: 'var(--correct)' },
            { label: 'Incorrect', value: incorrect, color: 'var(--incorrect)' },
            { label: 'Unanswered', value: unanswered, color: 'var(--warning)' },
            { label: 'Time Taken', value: formatTime(timeTaken), color: 'var(--muted)' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Domain Breakdown */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Domain Breakdown</h2>
          {Object.entries(domainScores).sort((a, b) => Number(a[0]) - Number(b[0])).map(([domain, s]) => {
            const d = Number(domain);
            const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
            const color = DOMAIN_COLORS[d];
            const needsWork = pct < 75;
            const wrongInDomain = result.questions.filter(q => {
              if (q.domain !== d) return false;
              const given = result.answers[q.id];
              if (!given) return true;
              const norm = (a: string) => a.split('').sort().join('');
              return norm(given) !== norm(q.answer);
            }).length;
            return (
              <div key={domain} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div>
                    <span style={{ fontSize: 12, color, fontWeight: 600 }}>D{d} · </span>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{DOMAIN_NAMES[d]}</span>
                    {needsWork && <span style={{ marginLeft: 8, fontSize: 11, color: 'var(--warning)' }}>⚠ Review needed</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: pct >= 75 ? 'var(--correct)' : 'var(--incorrect)' }}>
                      {s.correct}/{s.total} ({pct}%)
                    </span>
                    {needsWork && wrongInDomain > 0 && (
                      <button
                        onClick={() => drillDomain(d)}
                        style={{ padding: '3px 10px', background: 'rgba(239,68,68,0.12)', border: '1px solid var(--incorrect)', color: 'var(--incorrect)', borderRadius: 5, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}
                      >
                        🎯 Drill ({wrongInDomain})
                      </button>
                    )}
                  </div>
                </div>
                <div style={{ height: 6, background: 'var(--border)', borderRadius: 3 }}>
                  <div style={{ height: 6, background: pct >= 75 ? color : 'var(--incorrect)', borderRadius: 3, width: `${pct}%`, transition: 'width 0.5s' }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommendations */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>📌 Study Recommendations</h2>
          {Object.entries(domainScores)
            .filter(([, s]) => s.total > 0 && s.correct / s.total < 0.75)
            .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total))
            .map(([domain, s]) => {
              const d = Number(domain);
              const pct = Math.round((s.correct / s.total) * 100);
              const wrongInDomain = result.questions.filter(q => {
                if (q.domain !== d) return false;
                const given = result.answers[q.id];
                if (!given) return true;
                const norm = (a: string) => a.split('').sort().join('');
                return norm(given) !== norm(q.answer);
              }).length;
              return (
                <div key={domain} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{DOMAIN_NAMES[d]}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>Current: {pct}% → Target: 75%+</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    {wrongInDomain > 0 && (
                      <button
                        onClick={() => drillDomain(d)}
                        style={{ padding: '6px 12px', background: 'rgba(239,68,68,0.12)', border: '1px solid var(--incorrect)', color: 'var(--incorrect)', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                      >
                        🎯 Drill Wrong ({wrongInDomain})
                      </button>
                    )}
                    <Link
                      href={`/study?domain=${d}&scenario=true`}
                      style={{ padding: '6px 12px', background: 'rgba(118,185,0,0.15)', color: 'var(--green)', borderRadius: 6, textDecoration: 'none', fontSize: 12, fontWeight: 600 }}
                    >
                      Hard Scenarios →
                    </Link>
                  </div>
                </div>
              );
            })}
          {Object.entries(domainScores).every(([, s]) => s.total === 0 || s.correct / s.total >= 0.75) && (
            <p style={{ color: 'var(--correct)', fontSize: 14 }}>✅ All domains above passing threshold! Focus on reaching 90%+ overall.</p>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/review" style={{ padding: '12px 24px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
            📋 Review Wrong Answers ({incorrect})
          </Link>
          {(incorrect + unanswered) > 0 && (
            <button onClick={handleDrill} style={{ padding: '12px 24px', background: 'rgba(239,68,68,0.15)', border: '1px solid var(--incorrect)', color: 'var(--incorrect)', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              🎯 Drill All Wrong ({incorrect + unanswered})
            </button>
          )}
          <Link href="/mock" style={{ padding: '12px 24px', background: 'var(--green)', color: '#000', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
            🔄 Take Another Mock Test
          </Link>
          <Link href="/" style={{ padding: '12px 24px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 8, textDecoration: 'none', fontSize: 14 }}>
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
