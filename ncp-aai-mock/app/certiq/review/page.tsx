'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadCertiqResult, DOMAIN_NAMES, DOMAIN_COLORS } from '@/lib/utils';
import { Question, TestResult } from '@/lib/types';

export default function CertIQReview() {
  const [result, setResult] = useState<TestResult | null>(null);
  const [wrongQs, setWrongQs] = useState<Question[]>([]);

  useEffect(() => {
    const r = loadCertiqResult();
    if (!r) return;
    setResult(r);
    const norm = (a: string) => a.split('').sort().join('');
    setWrongQs(r.questions.filter(q => {
      const given = r.answers[q.id];
      if (!given) return true;
      return norm(given) !== norm(q.answer);
    }));
  }, []);

  if (!result) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: 16 }}>
      <p style={{ color: 'var(--muted)' }}>No CertIQ results to review.</p>
      <Link href="/certiq/mock" style={{ padding: '10px 24px', background: 'var(--green)', color: '#000', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Take Mock Test</Link>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/certiq/results" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 700 }}>← Results</Link>
        <span style={{ fontWeight: 600 }}>Review Wrong Answers ({wrongQs.length})</span>
        <Link href="/certiq/mock" style={{ padding: '6px 16px', borderRadius: 6, background: 'var(--green)', color: '#000', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Retake</Link>
      </nav>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px' }}>
        {wrongQs.length === 0 && (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <p style={{ fontSize: 18, fontWeight: 600 }}>Perfect score! No wrong answers.</p>
          </div>
        )}
        {wrongQs.map(q => {
          const givenAns = result.answers[q.id] || '(not answered)';
          const color = DOMAIN_COLORS[q.domain] || 'var(--green)';
          const opts = (['A', 'B', 'C', 'D', 'E'] as const).filter(opt => q.options[opt]);
          return (
            <div key={q.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: `${color}22`, color }}>Domain {q.domain}</span>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'var(--surface2)', color: 'var(--muted)' }}>{q.topic}</span>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(239,68,68,0.1)', color: 'var(--incorrect)' }}>Your answer: {givenAns}</span>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 16, fontWeight: 500 }}>{q.question}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                {opts.map(opt => {
                  const isCorrect = q.answer.includes(opt);
                  const isGiven = givenAns.includes(opt) && !isCorrect;
                  let bg = 'var(--surface2)', border = 'var(--border)', tc = 'var(--text)';
                  if (isCorrect) { bg = 'rgba(34,197,94,0.1)'; border = 'var(--correct)'; tc = 'var(--correct)'; }
                  else if (isGiven) { bg = 'rgba(239,68,68,0.1)'; border = 'var(--incorrect)'; tc = 'var(--incorrect)'; }
                  return (
                    <div key={opt} style={{ display: 'flex', gap: 10, padding: '10px 14px', background: bg, border: `1px solid ${border}`, borderRadius: 8 }}>
                      <span style={{ fontWeight: 700, color: isCorrect ? 'var(--correct)' : 'var(--green)', minWidth: 20, flexShrink: 0 }}>{opt}.</span>
                      <span style={{ color: tc }}>{q.options[opt]}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ background: 'rgba(118,185,0,0.08)', border: '1px solid rgba(118,185,0,0.2)', borderRadius: 8, padding: 14, fontSize: 13, color: 'var(--muted)' }}>
                <strong style={{ color: 'var(--green)' }}>Correct Answer: {q.answer}</strong> — {q.explanation}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
