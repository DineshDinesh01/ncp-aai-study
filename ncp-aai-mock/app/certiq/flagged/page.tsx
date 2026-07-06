'use client';
import { useState } from 'react';
import Link from 'next/link';
import { flaggedQuestions } from '@/lib/questions/flagged';
import { DOMAIN_NAMES, DOMAIN_COLORS } from '@/lib/utils';

export default function FlaggedQuestions() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const sorted = [...flaggedQuestions].sort(
    (a, b) => (b.recurrenceCount || 0) - (a.recurrenceCount || 0)
  );

  const toggleReveal = (id: number) => {
    setRevealed(r => {
      const n = new Set(r);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/certiq" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 700 }}>← CertIQ</Link>
        <span style={{ fontWeight: 600 }}>My Flagged Questions (from Certiq)</span>
        <span style={{ width: 80 }} />
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 18, marginBottom: 20, fontSize: 13, color: 'var(--muted)' }}>
          These are the {flaggedQuestions.length} questions you reported getting wrong on the real Certiq exam
          across multiple sittings, sorted by how many times each one recurred. Certiq doesn&apos;t expose the
          original options/correct answer after a test, so the options and answer shown below are best-effort
          reconstructions for drilling the concept — not verified against Certiq&apos;s actual answer key.
        </div>

        {sorted.map(q => {
          const isRevealed = revealed.has(q.id);
          const color = DOMAIN_COLORS[q.domain] || 'var(--green)';
          const opts = (['A', 'B', 'C', 'D', 'E'] as const).filter(opt => opt !== 'E' || q.options.E);
          const count = q.recurrenceCount || 1;
          return (
            <div key={q.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: `${color}22`, color }}>{DOMAIN_NAMES[q.domain] || `Domain ${q.domain}`}</span>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'var(--surface2)', color: 'var(--muted)' }}>{q.topic}</span>
                <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 20, background: count >= 4 ? 'rgba(239,68,68,0.15)' : count >= 2 ? 'rgba(245,158,11,0.15)' : 'var(--surface2)', color: count >= 4 ? 'var(--incorrect)' : count >= 2 ? 'var(--warning)' : 'var(--muted)', fontWeight: 700 }}>
                  Recurred {count}x
                </span>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(239,68,68,0.1)', color: 'var(--incorrect)', fontWeight: 700 }}>⚠ UNVERIFIED</span>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 16, fontWeight: 500 }}>{q.question}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                {opts.map(opt => {
                  const isCorrect = isRevealed && q.answer.includes(opt);
                  return (
                    <div key={opt} style={{ display: 'flex', gap: 10, padding: '10px 14px', background: isCorrect ? 'rgba(34,197,94,0.1)' : 'var(--surface2)', border: `1px solid ${isCorrect ? 'var(--correct)' : 'var(--border)'}`, borderRadius: 8 }}>
                      <span style={{ fontWeight: 700, color: isCorrect ? 'var(--correct)' : 'var(--green)', minWidth: 20, flexShrink: 0 }}>{opt}.</span>
                      <span>{q.options[opt]}</span>
                    </div>
                  );
                })}
              </div>
              {isRevealed ? (
                <div style={{ background: 'rgba(118,185,0,0.08)', border: '1px solid rgba(118,185,0,0.2)', borderRadius: 8, padding: 14, fontSize: 13, color: 'var(--muted)' }}>
                  <strong style={{ color: 'var(--green)' }}>Best-guess answer: {q.answer}</strong> — {q.explanation}
                </div>
              ) : (
                <button onClick={() => toggleReveal(q.id)} style={{ padding: '8px 16px', background: 'var(--green)', color: '#000', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                  Reveal Answer
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
