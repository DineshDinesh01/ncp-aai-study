'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadCertiqResult, DOMAIN_NAMES, DOMAIN_COLORS, formatTime } from '@/lib/utils';
import { Question, TestResult } from '@/lib/types';

function ScoreDonut({ correct, incorrect, unanswered, score }: { correct: number; incorrect: number; unanswered: number; score: number }) {
  const total = correct + incorrect + unanswered || 1;
  const R = 70;
  const CIRC = 2 * Math.PI * R;
  const correctLen = (correct / total) * CIRC;
  const incorrectLen = (incorrect / total) * CIRC;
  const unansweredLen = (unanswered / total) * CIRC;
  const scoreColor = score >= 90 ? 'var(--correct)' : score >= 75 ? 'var(--warning)' : 'var(--incorrect)';

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
      <svg width={180} height={180} viewBox="0 0 180 180">
        <circle cx={90} cy={90} r={R} fill="none" stroke="var(--border)" strokeWidth={18} />
        <circle
          cx={90} cy={90} r={R} fill="none" stroke="var(--correct)" strokeWidth={18}
          strokeDasharray={`${correctLen} ${CIRC - correctLen}`} strokeDashoffset={0}
          transform="rotate(-90 90 90)" strokeLinecap="butt"
        />
        <circle
          cx={90} cy={90} r={R} fill="none" stroke="var(--incorrect)" strokeWidth={18}
          strokeDasharray={`${incorrectLen} ${CIRC - incorrectLen}`} strokeDashoffset={-correctLen}
          transform="rotate(-90 90 90)" strokeLinecap="butt"
        />
        <circle
          cx={90} cy={90} r={R} fill="none" stroke="var(--warning)" strokeWidth={18}
          strokeDasharray={`${unansweredLen} ${CIRC - unansweredLen}`} strokeDashoffset={-(correctLen + incorrectLen)}
          transform="rotate(-90 90 90)" strokeLinecap="butt"
        />
        <text x={90} y={84} textAnchor="middle" fontSize={30} fontWeight={700} fill={scoreColor}>{score}%</text>
        <text x={90} y={106} textAnchor="middle" fontSize={12} fill="var(--muted)">score</text>
      </svg>
    </div>
  );
}

function QuestionCard({ q, given, isCorrect }: { q: Question; given: string | undefined; isCorrect: boolean }) {
  const opts = (['A', 'B', 'C', 'D', 'E'] as const).filter(opt => q.options[opt]);
  const color = DOMAIN_COLORS[q.domain] || 'var(--green)';
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, marginBottom: 16 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: `${color}22`, color }}>{DOMAIN_NAMES[q.domain] || `Domain ${q.domain}`}</span>
        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: isCorrect ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: isCorrect ? 'var(--correct)' : 'var(--incorrect)' }}>
          Your answer: {given || 'Not answered'}
        </span>
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 16, fontWeight: 500 }}>{q.question}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {opts.map(opt => {
          const isAnswer = q.answer.includes(opt);
          const isGiven = (given || '').includes(opt) && !isAnswer;
          let bg = 'var(--surface2)', border = 'var(--border)', tc = 'var(--text)';
          if (isAnswer) { bg = 'rgba(34,197,94,0.1)'; border = 'var(--correct)'; tc = 'var(--correct)'; }
          else if (isGiven) { bg = 'rgba(239,68,68,0.1)'; border = 'var(--incorrect)'; tc = 'var(--incorrect)'; }
          return (
            <div key={opt} style={{ display: 'flex', gap: 10, padding: '10px 14px', background: bg, border: `1px solid ${border}`, borderRadius: 8 }}>
              <span style={{ fontWeight: 700, color: isAnswer ? 'var(--correct)' : 'var(--green)', minWidth: 20, flexShrink: 0 }}>{opt}.</span>
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
}

export default function CertIQResults() {
  const [result, setResult] = useState<TestResult | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(true);
  useEffect(() => { setResult(loadCertiqResult()); }, []);

  if (!result) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: 16 }}>
      <p style={{ color: 'var(--muted)' }}>No CertIQ results found. Take a mock test first.</p>
      <Link href="/certiq/mock" style={{ padding: '10px 24px', background: 'var(--green)', color: '#000', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Start CertIQ Mock Test</Link>
    </div>
  );

  const { score, correct, totalQuestions, incorrect, unanswered, passed, domainScores, timeTaken, questions, answers } = result;
  const scoreColor = score >= 90 ? 'var(--correct)' : score >= 75 ? 'var(--warning)' : 'var(--incorrect)';

  const norm = (a: string) => a.split('').sort().join('');
  const correctQs = questions.filter(q => answers[q.id] && norm(answers[q.id]) === norm(q.answer));
  const wrongQs = questions.filter(q => !answers[q.id] || norm(answers[q.id]) !== norm(q.answer));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/certiq" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 700 }}>← CertIQ</Link>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link href="/certiq/review" style={{ padding: '6px 16px', borderRadius: 6, background: 'var(--surface2)', color: 'var(--text)', textDecoration: 'none', fontSize: 14, border: '1px solid var(--border)' }}>Review Answers</Link>
          <Link href="/certiq/mock" style={{ padding: '6px 16px', borderRadius: 6, background: 'var(--green)', color: '#000', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Retake Test</Link>
        </div>
      </nav>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 4, color: passed ? 'var(--correct)' : 'var(--incorrect)' }}>{passed ? '✓ PASSED' : '✗ NOT PASSED'}</div>
          <div style={{ color: 'var(--muted)', fontSize: 14 }}>CertIQ Mock Test · {formatTime(timeTaken)} taken</div>
        </div>

        <ScoreDonut correct={correct} incorrect={incorrect} unanswered={unanswered} score={score} />
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 32, fontSize: 12, color: 'var(--muted)' }}>
          <span><span style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--correct)', borderRadius: 2, marginRight: 6 }} />Correct ({correct})</span>
          <span><span style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--incorrect)', borderRadius: 2, marginRight: 6 }} />Incorrect ({incorrect})</span>
          <span><span style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--warning)', borderRadius: 2, marginRight: 6 }} />Unanswered ({unanswered})</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
          {([['Correct', correct, 'var(--correct)'], ['Incorrect', incorrect, 'var(--incorrect)'], ['Unanswered', unanswered, 'var(--warning)'], ['Total', totalQuestions, 'var(--text)']] as [string, number, string][]).map(([label, val, color]) => (
            <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color }}>{val}</div>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Domain Breakdown</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
          {Object.entries(domainScores).map(([d, s]) => {
            const pct = s.total ? Math.round((s.correct / s.total) * 100) : 0;
            const color = DOMAIN_COLORS[Number(d)] || 'var(--green)';
            return (
              <div key={d} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13 }}>Domain {d}: {DOMAIN_NAMES[Number(d)]}</span>
                  <span style={{ fontWeight: 600, color: pct >= 75 ? 'var(--correct)' : 'var(--incorrect)' }}>{pct}% ({s.correct}/{s.total})</span>
                </div>
                <div style={{ height: 4, background: 'var(--border)', borderRadius: 2 }}>
                  <div style={{ height: 4, background: color, borderRadius: 2, width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={() => setShowWrong(v => !v)} style={{ width: '100%', textAlign: 'left', padding: '14px 16px', background: 'var(--surface)', border: '1px solid var(--incorrect)', borderRadius: 8, color: 'var(--incorrect)', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: showWrong ? 16 : 24 }}>
          {showWrong ? '▾' : '▸'} Wrong Answers ({wrongQs.length})
        </button>
        {showWrong && (
          <div style={{ marginBottom: 24 }}>
            {wrongQs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: 'var(--muted)' }}>🎉 No wrong answers.</div>
            ) : wrongQs.map(q => <QuestionCard key={q.id} q={q} given={answers[q.id]} isCorrect={false} />)}
          </div>
        )}

        <button onClick={() => setShowCorrect(v => !v)} style={{ width: '100%', textAlign: 'left', padding: '14px 16px', background: 'var(--surface)', border: '1px solid var(--correct)', borderRadius: 8, color: 'var(--correct)', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: showCorrect ? 16 : 0 }}>
          {showCorrect ? '▾' : '▸'} Correct Answers ({correctQs.length})
        </button>
        {showCorrect && (
          <div>
            {correctQs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: 'var(--muted)' }}>No correct answers yet — keep practicing.</div>
            ) : correctQs.map(q => <QuestionCard key={q.id} q={q} given={answers[q.id]} isCorrect={true} />)}
          </div>
        )}
      </div>
    </div>
  );
}
