'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CERTIQ_QUESTIONS } from '@/lib/questions/certiq';
import { shuffle, calcScore, formatTime, saveCertiqResult } from '@/lib/utils';
import { Question } from '@/lib/types';

const TOTAL_TIME = 90 * 60;
const SET_SIZE = Math.ceil(CERTIQ_QUESTIONS.length / 2); // ~74 each
const FULL_SET_NUM = 0; // sentinel selectedSet value for "take everything in one sitting"

function getCertiqSet(setNum: number): Question[] {
  const sorted = [...CERTIQ_QUESTIONS].sort((a, b) => a.id - b.id);
  if (setNum === FULL_SET_NUM) return sorted;
  if (setNum === 1) return sorted.slice(0, SET_SIZE);
  return sorted.slice(SET_SIZE);
}

function timeBudgetFor(count: number): number {
  return Math.round((count / SET_SIZE) * TOTAL_TIME);
}

function loadSetScore(setNum: number): number | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(`certiq_set${setNum}_score`);
  return raw ? Number(raw) : null;
}

function saveSetScore(setNum: number, score: number) {
  localStorage.setItem(`certiq_set${setNum}_score`, String(score));
}

const TOTAL_SETS = Math.ceil(CERTIQ_QUESTIONS.length / SET_SIZE);

export default function CertIQMockTest() {
  const router = useRouter();
  const [phase, setPhase] = useState<'pick' | 'exam'>('pick');
  const [selectedSet, setSelectedSet] = useState<number>(1);
  const [setScores, setSetScores] = useState<(number | null)[]>([]);
  const [fullScore, setFullScore] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [timeBudget, setTimeBudgetState] = useState(TOTAL_TIME);
  const [submitted, setSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [multiSelected, setMultiSelected] = useState<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const scores = Array.from({ length: TOTAL_SETS }, (_, i) => loadSetScore(i + 1));
    setSetScores(scores);
    setFullScore(loadSetScore(FULL_SET_NUM));
  }, []);

  useEffect(() => {
    if (phase === 'exam' && !submitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => { if (t <= 1) { handleSubmit(); return 0; } return t - 1; });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, submitted]);

  const startSet = (setNum: number) => {
    const qs = getCertiqSet(setNum);
    setSelectedSet(setNum);
    setQuestions(shuffle(qs));
    setCurrent(0);
    setAnswers({});
    setFlagged(new Set());
    const budget = setNum === FULL_SET_NUM ? timeBudgetFor(qs.length) : TOTAL_TIME;
    setTimeBudgetState(budget);
    setTimeLeft(budget);
    setSubmitted(false);
    setMultiSelected([]);
    setPhase('exam');
  };

  const startFullExam = () => startSet(FULL_SET_NUM);

  const isMultiAnswer = (q: Question) => q.answer.length > 1;

  const handleSelect = (opt: string) => {
    const q = questions[current];
    if (!q) return;
    if (isMultiAnswer(q)) {
      setMultiSelected(prev => {
        const next = prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt];
        const ans = next.sort().join('');
        if (ans) setAnswers(a => ({ ...a, [q.id]: ans }));
        else { const a2 = { ...answers }; delete a2[q.id]; setAnswers(a2); }
        return next;
      });
    } else {
      setAnswers(a => ({ ...a, [q.id]: opt }));
    }
  };

  const goTo = (idx: number) => {
    if (idx < 0 || idx >= questions.length) return;
    const prevQ = questions[current];
    if (prevQ && isMultiAnswer(prevQ)) setMultiSelected((answers[prevQ.id] || '').split('').filter(Boolean));
    setCurrent(idx);
    const nextQ = questions[idx];
    if (nextQ && isMultiAnswer(nextQ)) setMultiSelected((answers[nextQ.id] || '').split('').filter(Boolean));
    else setMultiSelected([]);
  };

  const toggleFlag = () => {
    const id = questions[current]?.id;
    if (!id) return;
    setFlagged(f => { const n = new Set(f); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const handleSubmit = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSubmitted(true);
    const result = calcScore(questions, answers);
    result.timeTaken = timeBudget - timeLeft;
    saveCertiqResult(result);
    saveSetScore(selectedSet, result.score);
    router.push('/certiq/results');
  }, [questions, answers, timeLeft, timeBudget, router, selectedSet]);

  // ── Set picker ──────────────────────────────────────────────────
  if (phase === 'pick') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
          <a href="/certiq" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 700 }}>← CertIQ</a>
          <span style={{ fontWeight: 700, fontSize: 15 }}>CertIQ Mock — Choose Set</span>
        </nav>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '48px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Select a CertIQ Test</h1>
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>{CERTIQ_QUESTIONS.length} questions · default is split into {TOTAL_SETS} disjoint sets, or take everything in one sitting</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 16 }}>
            {Array.from({ length: TOTAL_SETS }, (_, i) => {
              const setNum = i + 1;
              const qs = getCertiqSet(setNum);
              const score = setScores[i];
              const done = score !== null;
              const scoreColor = score !== null ? (score >= 75 ? 'var(--correct)' : 'var(--incorrect)') : 'var(--muted)';
              return (
                <div
                  key={setNum}
                  onClick={() => startSet(setNum)}
                  style={{ background: 'var(--surface)', border: `2px solid ${done ? (score! >= 75 ? 'var(--correct)' : 'var(--incorrect)') : 'var(--border)'}`, borderRadius: 12, padding: 28, cursor: 'pointer', position: 'relative', transition: 'border-color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--green)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = done ? (score! >= 75 ? 'var(--correct)' : 'var(--incorrect)') : 'var(--border)')}
                >
                  {done && (
                    <div style={{ position: 'absolute', top: 12, right: 12, fontSize: 11, fontWeight: 700, color: scoreColor, background: 'var(--surface2)', padding: '2px 8px', borderRadius: 4 }}>
                      {score}% {score! >= 75 ? '✓' : '✗'}
                    </div>
                  )}
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>CertIQ Set {setNum} · Default</div>
                  <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{qs.length} Questions</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>90 minutes</div>
                  <div style={{ padding: '10px 0', borderTop: '1px solid var(--border)', fontSize: 13, color: done ? scoreColor : 'var(--muted)' }}>
                    {done ? `Last score: ${score}%` : 'Not attempted'}
                  </div>
                  <button style={{ width: '100%', marginTop: 12, padding: '10px', background: 'var(--green)', color: '#000', border: 'none', borderRadius: 6, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                    {done ? 'Retake Set' : 'Start Set'} {setNum} →
                  </button>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 12, margin: '4px 0 16px' }}>— or —</div>
          <div
            onClick={startFullExam}
            style={{ background: 'var(--surface)', border: `2px dashed ${fullScore !== null ? (fullScore >= 75 ? 'var(--correct)' : 'var(--incorrect)') : 'var(--border)'}`, borderRadius: 12, padding: 24, cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}
          >
            <div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>Full Exam · All questions in one sitting</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{CERTIQ_QUESTIONS.length} Questions · {formatTime(timeBudgetFor(CERTIQ_QUESTIONS.length))} time budget</div>
              {fullScore !== null && (
                <div style={{ fontSize: 13, marginTop: 6, color: fullScore >= 75 ? 'var(--correct)' : 'var(--incorrect)' }}>Last score: {fullScore}%</div>
              )}
            </div>
            <button style={{ padding: '10px 20px', background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 6, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              {fullScore !== null ? 'Retake Full Exam' : 'Start Full Exam'} →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Exam ────────────────────────────────────────────────────────
  if (questions.length === 0) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--muted)' }}>Loading questions...</div>;

  const q = questions[current];
  const isFlagged = flagged.has(q.id);
  const answered = answers[q.id];
  const isMulti = isMultiAnswer(q);
  const timerColor = timeLeft < 600 ? 'var(--incorrect)' : timeLeft < 1800 ? 'var(--warning)' : 'var(--green)';
  const opts = (['A', 'B', 'C', 'D', 'E'] as const).filter(opt => q.options[opt]);

  const getOptionClass = (opt: string) => {
    if (isMulti) return multiSelected.includes(opt) ? 'option-btn selected' : 'option-btn';
    return answered === opt ? 'option-btn selected' : 'option-btn';
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ fontSize: 13, color: 'var(--muted)' }}>
          <span style={{ color: 'var(--text)', fontWeight: 600 }}>Q {current + 1}</span> / {questions.length}
          <span style={{ marginLeft: 8, fontSize: 11, background: 'var(--surface2)', padding: '2px 8px', borderRadius: 4 }}>{selectedSet === FULL_SET_NUM ? 'Full Exam' : `Set ${selectedSet}`}</span>
          <span style={{ marginLeft: 6, fontSize: 11, background: 'var(--surface2)', padding: '2px 8px', borderRadius: 4 }}>Domain {q.domain}</span>
        </div>
        <div style={{ fontWeight: 700, fontSize: 16, color: timerColor, fontFamily: 'monospace' }}>⏱ {formatTime(timeLeft)}</div>
        <button onClick={() => setShowConfirm(true)} style={{ padding: '6px 16px', background: 'var(--green)', color: '#000', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Submit Test</button>
      </div>
      <div style={{ height: 3, background: 'var(--border)' }}>
        <div style={{ height: 3, background: 'var(--green)', width: `${((current + 1) / questions.length) * 100}%`, transition: 'width 0.2s' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', gap: 0, maxWidth: 1200, margin: '0 auto', width: '100%', padding: '24px 20px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(118,185,0,0.15)', color: 'var(--green)' }}>{q.topic}</span>
            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'var(--surface2)', color: 'var(--muted)', textTransform: 'capitalize' }}>{q.difficulty}</span>
            {isMulti && <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(14,165,233,0.15)', color: '#0ea5e9' }}>Choose 2</span>}
            {isFlagged && <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(210,153,34,0.15)', color: 'var(--warning)' }}>🚩 Flagged</span>}
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, fontWeight: 500 }}>{q.question}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {opts.map(opt => (
              <button key={opt} className={getOptionClass(opt)} onClick={() => handleSelect(opt)}>
                <span style={{ fontWeight: 700, color: 'var(--green)', minWidth: 20, flexShrink: 0 }}>{opt}.</span>
                <span>{q.options[opt]}</span>
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
            <button onClick={toggleFlag} style={{ padding: '8px 16px', background: isFlagged ? 'rgba(210,153,34,0.2)' : 'var(--surface2)', border: `1px solid ${isFlagged ? 'var(--warning)' : 'var(--border)'}`, color: isFlagged ? 'var(--warning)' : 'var(--muted)', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
              🚩 {isFlagged ? 'Unflag' : 'Flag for Review'}
            </button>
            <button onClick={() => goTo(current - 1)} disabled={current === 0} style={{ padding: '8px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', color: current === 0 ? 'var(--muted)' : 'var(--text)', borderRadius: 6, cursor: current === 0 ? 'not-allowed' : 'pointer', fontSize: 13 }}>← Prev</button>
            <button onClick={() => goTo(current + 1)} disabled={current === questions.length - 1} style={{ padding: '8px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', color: current === questions.length - 1 ? 'var(--muted)' : 'var(--text)', borderRadius: 6, cursor: current === questions.length - 1 ? 'not-allowed' : 'pointer', fontSize: 13 }}>Next →</button>
          </div>
        </div>
        <div style={{ width: 220, marginLeft: 24, flexShrink: 0 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 16, position: 'sticky', top: 80 }}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10, color: 'var(--muted)' }}>NAVIGATION</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
              {questions.map((qn, idx) => {
                let cls = 'nav-dot';
                if (idx === current) cls += ' current';
                else if (flagged.has(qn.id)) cls += ' flagged';
                else if (answers[qn.id]) cls += ' answered';
                return <button key={qn.id} className={cls} onClick={() => goTo(idx)} title={`Q${idx+1}`}>{idx + 1}</button>;
              })}
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}><span className="nav-dot answered" style={{ width: 12, height: 12, fontSize: 0 }} /><span>Answered ({Object.keys(answers).length})</span></div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}><span className="nav-dot flagged" style={{ width: 12, height: 12, fontSize: 0 }} /><span>Flagged ({flagged.size})</span></div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><span className="nav-dot" style={{ width: 12, height: 12, fontSize: 0 }} /><span>Not answered ({questions.length - Object.keys(answers).length})</span></div>
            </div>
          </div>
        </div>
      </div>
      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, maxWidth: 380, width: '90%' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Submit {selectedSet === FULL_SET_NUM ? 'Full Exam' : `Set ${selectedSet}`}?</h3>
            <p style={{ color: 'var(--muted)', marginBottom: 8, fontSize: 14 }}>Answered: <strong style={{ color: 'var(--text)' }}>{Object.keys(answers).length}</strong> / {questions.length}</p>
            <p style={{ color: 'var(--muted)', marginBottom: 24, fontSize: 14 }}>Unanswered: <strong style={{ color: 'var(--warning)' }}>{questions.length - Object.keys(answers).length}</strong></p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowConfirm(false)} style={{ flex: 1, padding: 12, background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>Continue Test</button>
              <button onClick={handleSubmit} style={{ flex: 1, padding: 12, background: 'var(--green)', color: '#000', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}