'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ALL_QUESTIONS } from '@/lib/questions';
import { loadProgress, loadTestResult, DOMAIN_NAMES, DOMAIN_WEIGHTS, DOMAIN_COLORS } from '@/lib/utils';
import { StudyProgress, TestResult } from '@/lib/types';

export default function Dashboard() {
  const [progress, setProgress] = useState<StudyProgress>({ attempted: [], correct: [], incorrect: [], lastSession: '' });
  const [lastResult, setLastResult] = useState<TestResult | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
    setLastResult(loadTestResult());
  }, []);

  const totalQs = ALL_QUESTIONS.length;
  const domains = [1,2,3,4,5,6,7,8,9,10];
  const avgScore = lastResult ? lastResult.score : 0;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Nav */}
      <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)' }} />
          <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.3px' }}>NCP-AAI PrepMaster</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link href="/study" style={{ padding: '6px 16px', borderRadius: 6, background: 'var(--surface2)', color: 'var(--text)', textDecoration: 'none', fontSize: 14, border: '1px solid var(--border)' }}>Study</Link>
          <Link href="/certiq" style={{ padding: '6px 16px', borderRadius: 6, background: 'var(--surface2)', color: 'var(--text)', textDecoration: 'none', fontSize: 14, border: '1px solid var(--border)' }}>CertIQ</Link>
          <Link href="/dashboard" style={{ padding: '6px 16px', borderRadius: 6, background: 'var(--surface2)', color: 'var(--text)', textDecoration: 'none', fontSize: 14, border: '1px solid var(--border)' }}>📊 Progress</Link>
          <Link href="/tips" style={{ padding: '6px 16px', borderRadius: 6, background: 'var(--surface2)', color: 'var(--text)', textDecoration: 'none', fontSize: 14, border: '1px solid var(--border)' }}>💡 Exam Tips</Link>
          <Link href="/audit" style={{ padding: '6px 16px', borderRadius: 6, background: 'var(--surface2)', color: 'var(--text)', textDecoration: 'none', fontSize: 14, border: '1px solid var(--border)' }}>🔍 Audit</Link>
          <Link href="/mock" style={{ padding: '6px 16px', borderRadius: 6, background: 'var(--green)', color: '#000', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Mock Test</Link>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>NVIDIA NCP-AAI Exam Prep</h1>
          <p style={{ color: 'var(--muted)', fontSize: 15 }}>Master Agentic AI • Score 90%+ • {totalQs} Practice Questions</p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Total Questions', value: totalQs, sub: 'across 10 domains', color: 'var(--green)' },
            { label: 'Last Score', value: avgScore ? `${avgScore}%` : '—', sub: avgScore >= 90 ? '✓ Ready!' : avgScore > 0 ? `Need ${90 - avgScore}% more` : 'Take a mock test', color: avgScore >= 90 ? 'var(--correct)' : avgScore > 0 ? 'var(--warning)' : 'var(--muted)' },
            { label: 'Questions Attempted', value: progress.attempted.length, sub: `${Math.round(progress.attempted.length/totalQs*100)}% coverage`, color: 'var(--green)' },
            { label: 'Pass Mark', value: '75%', sub: 'Target: 90%+', color: '#0ea5e9' },
          ].map(card => (
            <div key={card.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px' }}>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>{card.label}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: card.color, marginBottom: 4 }}>{card.value}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{card.sub}</div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
          <Link href="/mock" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'var(--green)', color: '#000', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
            ▶ Start Mock Test — Choose Your Set
          </Link>
          <Link href="/study" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'var(--surface)', color: 'var(--text)', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 15, border: '1px solid var(--border)' }}>
            📖 Study Mode — Browse All Questions
          </Link>
          <Link href="/certiq" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'var(--surface)', color: 'var(--text)', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 15, border: '1px solid var(--border)' }}>
            🎯 CertIQ — Study Guide Practice
          </Link>
          <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'var(--surface)', color: 'var(--text)', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 15, border: '1px solid var(--border)' }}>
            📊 Progress Dashboard
          </Link>
          <Link href="/tips" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'var(--surface)', color: 'var(--text)', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 15, border: '1px solid var(--border)' }}>
            💡 Exam Tips & Strategy
          </Link>
          {lastResult && (
            <Link href="/results" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'var(--surface)', color: 'var(--text)', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 15, border: '1px solid var(--border)' }}>
              📊 Last Results — {lastResult.score}%
            </Link>
          )}
        </div>

        {/* Domain Progress */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Domain Coverage</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 12 }}>
            {domains.map(d => {
              const domainQs = ALL_QUESTIONS.filter(q => q.domain === d);
              const attempted = domainQs.filter(q => progress.attempted.includes(q.id));
              const correct = domainQs.filter(q => progress.correct.includes(q.id));
              const pct = domainQs.length ? Math.round(attempted.length / domainQs.length * 100) : 0;
              const correctPct = attempted.length ? Math.round(correct.length / attempted.length * 100) : 0;
              const color = DOMAIN_COLORS[d];
              return (
                <Link key={d} href={`/study?domain=${d}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px', cursor: 'pointer', transition: 'border-color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = color)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                      <div>
                        <div style={{ fontSize: 11, color, fontWeight: 600, marginBottom: 2 }}>DOMAIN {d} · {DOMAIN_WEIGHTS[d]}%</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{DOMAIN_NAMES[d]}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 20, fontWeight: 700, color }}>{pct}%</div>
                        <div style={{ fontSize: 11, color: 'var(--muted)' }}>{attempted.length}/{domainQs.length}</div>
                      </div>
                    </div>
                    <div style={{ height: 4, background: 'var(--border)', borderRadius: 2 }}>
                      <div style={{ height: 4, background: color, borderRadius: 2, width: `${pct}%`, transition: 'width 0.3s' }} />
                    </div>
                    {attempted.length > 0 && (
                      <div style={{ marginTop: 6, fontSize: 11, color: correctPct >= 75 ? 'var(--correct)' : 'var(--warning)' }}>
                        {correctPct}% accuracy on attempted
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Exam info */}
        <div style={{ marginTop: 40, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>About the NCP-AAI Exam</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, fontSize: 13 }}>
            {[['Format', 'Multiple choice + Multi-select'], ['Questions', '65 questions'], ['Duration', '90 minutes'], ['Passing Score', '75% (target 90%+)'], ['Delivery', 'Online proctored'], ['Provider', 'NVIDIA Certification']].map(([k,v]) => (
              <div key={k}><div style={{ color: 'var(--muted)', marginBottom: 2 }}>{k}</div><div style={{ fontWeight: 600 }}>{v}</div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
