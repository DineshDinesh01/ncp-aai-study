'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadCertiqHistory, DOMAIN_NAMES, DOMAIN_COLORS, formatTime } from '@/lib/utils';
import { Question, TestResult } from '@/lib/types';

type Session = TestResult & { takenAt: string };

function dayKey(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

function wrongQuestions(s: Session): Question[] {
  const norm = (a: string) => a.split('').sort().join('');
  return s.questions.filter(q => {
    const given = s.answers[q.id];
    if (!given) return true;
    return norm(given) !== norm(q.answer);
  });
}

export default function CertIQHistory() {
  const [history, setHistory] = useState<Session[]>([]);
  const [openSession, setOpenSession] = useState<number | null>(null);

  useEffect(() => { setHistory(loadCertiqHistory()); }, []);

  if (history.length === 0) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: 16 }}>
      <p style={{ color: 'var(--muted)' }}>No test history yet. Take a CertIQ mock test first.</p>
      <Link href="/certiq/mock" style={{ padding: '10px 24px', background: 'var(--green)', color: '#000', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Take Mock Test</Link>
    </div>
  );

  // Group sessions by calendar day, most recent first
  const groups: Record<string, Session[]> = {};
  history.forEach(s => {
    const key = dayKey(s.takenAt);
    (groups[key] = groups[key] || []).push(s);
  });

  // Cross-session insights: wrong-answer rate per topic and per domain
  const topicStats: Record<string, { wrong: number; total: number }> = {};
  const domainStats: Record<number, { wrong: number; total: number }> = {};
  history.forEach(s => {
    const wrongIds = new Set(wrongQuestions(s).map(q => q.id));
    s.questions.forEach(q => {
      topicStats[q.topic] = topicStats[q.topic] || { wrong: 0, total: 0 };
      topicStats[q.topic].total++;
      if (wrongIds.has(q.id)) topicStats[q.topic].wrong++;

      domainStats[q.domain] = domainStats[q.domain] || { wrong: 0, total: 0 };
      domainStats[q.domain].total++;
      if (wrongIds.has(q.id)) domainStats[q.domain].wrong++;
    });
  });
  const topTopics = Object.entries(topicStats)
    .filter(([, d]) => d.wrong > 0)
    .sort((a, b) => (b[1].wrong / b[1].total) - (a[1].wrong / a[1].total))
    .slice(0, 8);

  const scoreTrend = [...history].reverse(); // oldest → newest for trend read

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/certiq" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 700 }}>← CertIQ</Link>
        <span style={{ fontWeight: 600 }}>Test History &amp; Insights</span>
        <Link href="/certiq/mock" style={{ padding: '6px 16px', borderRadius: 6, background: 'var(--green)', color: '#000', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>New Test</Link>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px' }}>

        {/* Score trend across sessions */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ fontSize: 13, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 14 }}>Score Trend (oldest → most recent)</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {scoreTrend.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 34, height: Math.max(6, s.score * 0.8), background: s.score >= 75 ? 'var(--correct)' : 'var(--incorrect)',
                  borderRadius: 4, marginBottom: 4,
                }} title={`${s.score}% on ${dayKey(s.takenAt)}`} />
                <div style={{ fontSize: 10, color: 'var(--muted)' }}>{s.score}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak topic insights across all sessions */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ fontSize: 13, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 14 }}>Weakest Topics (across all tests)</h2>
          {topTopics.length === 0 && <p style={{ color: 'var(--muted)', fontSize: 13 }}>No wrong answers recorded yet — nice.</p>}
          {topTopics.map(([topic, d]) => {
            const pct = Math.round((d.wrong / d.total) * 100);
            return (
              <div key={topic} style={{ display: 'grid', gridTemplateColumns: '200px 1fr 90px', gap: 10, alignItems: 'center', padding: '6px 0', fontSize: 13 }}>
                <span>{topic}</span>
                <div style={{ background: 'var(--surface2)', borderRadius: 4, height: 8, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: 'var(--incorrect)' }} />
                </div>
                <span style={{ color: 'var(--muted)' }}>{d.wrong}/{d.total} wrong</span>
              </div>
            );
          })}
        </div>

        {/* Day-wise session list */}
        {Object.entries(groups).map(([day, sessions]) => (
          <div key={day} style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, color: 'var(--text)' }}>{day}</h3>
            {sessions.map((s, idx) => {
              const wrongQs = wrongQuestions(s);
              const sessionId = history.indexOf(s);
              const isOpen = openSession === sessionId;
              return (
                <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, marginBottom: 12, overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenSession(isOpen ? null : sessionId)}
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text)' }}
                  >
                    <span style={{ fontSize: 13, color: 'var(--muted)' }}>
                      {new Date(s.takenAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} · {s.totalQuestions} questions · {formatTime(s.timeTaken)}
                    </span>
                    <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, color: s.score >= 75 ? 'var(--correct)' : 'var(--incorrect)' }}>{s.score}%</span>
                      <span style={{ fontSize: 12, color: 'var(--incorrect)' }}>{wrongQs.length} wrong</span>
                      <span style={{ fontSize: 12 }}>{isOpen ? '▲' : '▼'}</span>
                    </span>
                  </button>

                  {isOpen && (
                    <div style={{ borderTop: '1px solid var(--border)', padding: '16px 18px' }}>
                      {wrongQs.length === 0 && <p style={{ color: 'var(--muted)', fontSize: 13 }}>No wrong answers this session. 🎉</p>}
                      {wrongQs.map(q => {
                        const givenAns = s.answers[q.id] || '(not answered)';
                        const color = DOMAIN_COLORS[q.domain] || 'var(--green)';
                        const opts = (['A', 'B', 'C', 'D', 'E'] as const).filter(opt => opt !== 'E' || q.options.E);
                        return (
                          <div key={q.id} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 10, padding: 16, marginBottom: 14 }}>
                            <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: `${color}22`, color }}>{DOMAIN_NAMES[q.domain] || `Domain ${q.domain}`}</span>
                              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'var(--surface)', color: 'var(--muted)' }}>{q.topic}</span>
                              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(239,68,68,0.1)', color: 'var(--incorrect)' }}>Your answer: {givenAns}</span>
                            </div>
                            <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 14, fontWeight: 500 }}>{q.question}</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                              {opts.map(opt => {
                                const isCorrect = q.answer.includes(opt);
                                const isGiven = givenAns.includes(opt) && !isCorrect;
                                let bg = 'var(--surface)', border = 'var(--border)', tc = 'var(--text)';
                                if (isCorrect) { bg = 'rgba(34,197,94,0.1)'; border = 'var(--correct)'; tc = 'var(--correct)'; }
                                else if (isGiven) { bg = 'rgba(239,68,68,0.1)'; border = 'var(--incorrect)'; tc = 'var(--incorrect)'; }
                                return (
                                  <div key={opt} style={{ display: 'flex', gap: 8, padding: '8px 12px', background: bg, border: `1px solid ${border}`, borderRadius: 6, fontSize: 13 }}>
                                    <span style={{ fontWeight: 700, color: isCorrect ? 'var(--correct)' : 'var(--green)', minWidth: 18 }}>{opt}.</span>
                                    <span style={{ color: tc }}>{q.options[opt]}</span>
                                  </div>
                                );
                              })}
                            </div>
                            <div style={{ background: 'rgba(118,185,0,0.08)', border: '1px solid rgba(118,185,0,0.2)', borderRadius: 8, padding: 12, fontSize: 12, color: 'var(--muted)' }}>
                              <strong style={{ color: 'var(--green)' }}>Correct: {q.answer}</strong> — {q.explanation}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}