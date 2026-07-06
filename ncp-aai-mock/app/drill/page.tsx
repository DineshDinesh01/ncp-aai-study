'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ALL_QUESTIONS } from '@/lib/questions';
import { loadDrillQuestions, calcScore, formatTime, shuffle } from '@/lib/utils';
import { Question } from '@/lib/types';

const DRILL_TIME = 30 * 60;

export default function DrillMode() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [multiSelected, setMultiSelected] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(DRILL_TIME);
  const [phase, setPhase] = useState<'ready' | 'exam' | 'done'>('ready');
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const ids = loadDrillQuestions();
    if (ids.length === 0) { router.push('/mock'); return; }
    const qs = shuffle(ALL_QUESTIONS.filter(q => ids.includes(q.id)));
    setQuestions(qs);
  }, [router]);

  const handleSubmit = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    const result = calcScore(questions, answers);
    setScore(result.score);
    setPhase('done');
  }, [questions, answers]);

  useEffect(() => {
    if (phase === 'exam') {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => { if (t <= 1) { handleSubmit(); return 0; } return t - 1; });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, handleSubmit]);

  const isMulti = (q: Question) => q.answer.length > 1;
  const norm = (a: string) => a.split('').sort().join('');

  const handleSelect = (opt: string) => {
    const q = questions[current];
    if (!q || showExplanation) return;
    if (isMulti(q)) {
      setMultiSelected(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]);
    } else {
      setAnswers(a => ({ ...a, [q.id]: opt }));
      setShowExplanation(true);
    }
  };

  const confirmMulti = () => {
    const q = questions[current];
    if (!q || multiSelected.length === 0) return;
    setAnswers(a => ({ ...a, [q.id]: multiSelected.sort().join('') }));
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setMultiSelected([]);
    if (current + 1 >= questions.length) handleSubmit();
    else setCurrent(c => c + 1);
  };

  if (questions.length === 0) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--muted)' }}>
      Loading drill questions...
    </div>
  );

  const timerColor = timeLeft < 300 ? 'var(--incorrect)' : timeLeft < 900 ? 'var(--warning)' : 'var(--green)';

  if (phase === 'ready') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 40, maxWidth: 440, width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🎯</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Drill Mode</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 24, fontSize: 14 }}>
          Practice your {questions.length} wrong/unanswered questions. Get immediate feedback after each answer so you learn as you go.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32, textAlign: 'left' }}>
          {[['Questions', String(questions.length)], ['Time Limit', '30 minutes'], ['Feedback', 'Immediate'], ['Goal', 'Learn from mistakes']].map(([k, v]) => (
            <div key={k} style={{ background: 'var(--surface2)', borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>{k}</div>
              <div style={{ fontWeight: 600 }}>{v}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setPhase('exam')} style={{ width: '100%', padding: '14px', background: 'var(--incorrect)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
          Start Drill
        </button>
        <div style={{ marginTop: 12 }}>
          <Link href="/results" style={{ color: 'var(--muted)', fontSize: 13, textDecoration: 'none' }}>← Back to Results</Link>
        </div>
      </div>
    </div>
  );

  if (phase === 'done') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 40, maxWidth: 440, width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Drill Complete</h1>
        <div style={{ fontSize: 56, fontWeight: 800, color: score >= 75 ? 'var(--correct)' : 'var(--warning)', margin: '16px 0' }}>{score}%</div>
        <p style={{ color: 'var(--muted)', marginBottom: 32, fontSize: 14 }}>{questions.length} questions drilled</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Link href="/mock" style={{ padding: '12px', background: 'var(--green)', color: '#000', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14, display: 'block' }}>
            ▶ Take Full Mock Test
          </Link>
          <Link href="/results" style={{ padding: '12px', background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 8, textDecoration: 'none', fontSize: 14, display: 'block' }}>
            ← Back to Results
          </Link>
        </div>
      </div>
    </div>
  );

  const q = questions[current];
  const given = answers[q?.id];

  const getOptStyle = (opt: string): React.CSSProperties => {
    if (!showExplanation) {
      const isSel = isMulti(q) ? multiSelected.includes(opt) : given === opt;
      return { background: isSel ? 'rgba(118,185,0,0.12)' : 'var(--surface2)', border: `1.5px solid ${isSel ? 'var(--green)' : 'var(--border)'}`, color: 'var(--text)' };
    }
    const isCorrect = norm(q.answer).includes(opt);
    const isSelected = isMulti(q) ? multiSelected.includes(opt) : given === opt;
    if (isCorrect) return { background: 'rgba(35,134,54,0.15)', border: '1.5px solid var(--correct)', color: 'var(--text)' };
    if (isSelected) return { background: 'rgba(218,54,51,0.15)', border: '1.5px solid var(--incorrect)', color: 'var(--text)' };
    return { background: 'var(--surface2)', border: '1.5px solid var(--border)', color: 'var(--muted)' };
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ fontSize: 13, color: 'var(--muted)' }}>
          🎯 Drill <span style={{ color: 'var(--incorrect)', fontWeight: 700 }}>{current + 1}</span> / {questions.length}
        </div>
        <div style={{ fontWeight: 700, fontSize: 16, color: timerColor, fontFamily: 'monospace' }}>⏱ {formatTime(timeLeft)}</div>
        <div style={{ fontSize: 11, color: 'var(--muted)' }}>D{q.domain} · {q.difficulty}</div>
      </div>

      <div style={{ height: 3, background: 'var(--border)' }}>
        <div style={{ height: 3, background: 'var(--incorrect)', width: `${((current + 1) / questions.length) * 100}%`, transition: 'width 0.2s' }} />
      </div>

      <div style={{ flex: 1, maxWidth: 800, margin: '0 auto', width: '100%', padding: '24px 20px' }}>
        <div style={{ marginBottom: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(118,185,0,0.15)', color: 'var(--green)' }}>{q.topic}</span>
          {isMulti(q) && <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(14,165,233,0.15)', color: '#0ea5e9' }}>Select {q.answerCount ?? 2}</span>}
        </div>

        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, fontWeight: 500 }}>{q.question}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {(['A', 'B', 'C', 'D', 'E'] as const).filter(opt => opt !== 'E' || q.options.E).map(opt => (
            <button key={opt} onClick={() => handleSelect(opt)} disabled={showExplanation}
              style={{ ...getOptStyle(opt), padding: '12px 16px', borderRadius: 8, cursor: showExplanation ? 'default' : 'pointer', display: 'flex', gap: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 14, lineHeight: 1.5 }}>
              <span style={{ fontWeight: 700, minWidth: 20, flexShrink: 0 }}>{opt}.</span>
              <span>{q.options[opt]}</span>
              {showExplanation && norm(q.answer).includes(opt) && <span style={{ marginLeft: 'auto', color: 'var(--correct)', flexShrink: 0 }}>✓</span>}
            </button>
          ))}
        </div>

        {isMulti(q) && !showExplanation && multiSelected.length > 0 && (
          <button onClick={confirmMulti} style={{ padding: '10px 24px', background: 'var(--green)', color: '#000', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 14, marginBottom: 16 }}>
            Confirm ({multiSelected.length}/{q.answerCount ?? 2} selected)
          </button>
        )}

        {showExplanation && (
          <div>
            <div style={{ background: 'rgba(118,185,0,0.08)', border: '1px solid rgba(118,185,0,0.2)', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: 'var(--green)', fontWeight: 600, marginBottom: 8 }}>EXPLANATION</div>
              <p style={{ fontSize: 14, lineHeight: 1.65, margin: 0 }}>{q.explanation}</p>
              {q.keywords.length > 0 && (
                <div style={{ marginTop: 10, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {q.keywords.map(k => <span key={k} style={{ fontSize: 11, padding: '2px 7px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 3, color: 'var(--muted)' }}>{k}</span>)}
                </div>
              )}
            </div>
            <button onClick={nextQuestion} style={{ padding: '12px 32px', background: 'var(--green)', color: '#000', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              {current + 1 >= questions.length ? 'Finish Drill' : 'Next Question →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
