'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ALL_QUESTIONS } from '@/lib/questions';
import { calcScore, formatTime, saveTestResult, markSetDone, getSetScore } from '@/lib/utils';
import { getMockSet, getTotalSets } from '@/lib/mockSets';
import { Question } from '@/lib/types';

const TOTAL_TIME = 90 * 60;

export default function MockTest() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [phase, setPhase] = useState<'pick' | 'exam'>('pick');
  const [selectedSet, setSelectedSet] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [multiSelected, setMultiSelected] = useState<string[]>([]);
  const [setScores, setSetScores] = useState<(number | null)[]>([]);
  const [totalSets, setTotalSets] = useState(0);
  const [questionTimes, setQuestionTimes] = useState<Record<number, number>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const questionStartRef = useRef<number>(Date.now());
  // Refs for handleSubmit to read current values without stale closure bugs
  const answersRef = useRef<Record<number, string>>({});
  const questionsRef = useRef<Question[]>([]);
  const timeLeftRef = useRef(TOTAL_TIME);
  const currentRef = useRef(0);
  const questionTimesRef = useRef<Record<number, number>>({});
  const selectedSetRef = useRef<number | null>(null);

  useEffect(() => {
    const n = getTotalSets(ALL_QUESTIONS);
    setTotalSets(n);
    const scores: (number | null)[] = [];
    for (let i = 0; i < n; i++) scores.push(getSetScore(i));
    setSetScores(scores);
  }, []);

  useEffect(() => {
    if (phase === 'exam' && !submitted) {
      timerRef.current = setInterval(() => {
        timeLeftRef.current -= 1;
        setTimeLeft(timeLeftRef.current);
        if (timeLeftRef.current <= 0) {
          clearInterval(timerRef.current!);
          handleSubmit();
        }
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, submitted]);

  const recordTimeOnQuestion = (qId: number) => {
    const spent = Math.round((Date.now() - questionStartRef.current) / 1000);
    questionTimesRef.current = { ...questionTimesRef.current, [qId]: (questionTimesRef.current[qId] || 0) + spent };
    setQuestionTimes({ ...questionTimesRef.current });
    questionStartRef.current = Date.now();
  };

  const startSet = (idx: number) => {
    const qs = getMockSet(ALL_QUESTIONS, idx);
    questionsRef.current = qs;
    answersRef.current = {};
    timeLeftRef.current = TOTAL_TIME;
    currentRef.current = 0;
    questionTimesRef.current = {};
    selectedSetRef.current = idx;
    setSelectedSet(idx);
    setQuestions(qs);
    setAnswers({});
    setFlagged(new Set());
    setTimeLeft(TOTAL_TIME);
    setCurrent(0);
    setMultiSelected([]);
    setSubmitted(false);
    setQuestionTimes({});
    questionStartRef.current = Date.now();
    setPhase('exam');
  };

  const isMultiAnswer = (q: Question) => q.answer.length > 1;

  const handleSelect = (opt: string) => {
    const q = questions[current];
    if (!q) return;
    if (isMultiAnswer(q)) {
      setMultiSelected(prev => {
        const next = prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt];
        const ans = next.sort().join('');
        if (ans) { answersRef.current = { ...answersRef.current, [q.id]: ans }; setAnswers({ ...answersRef.current }); }
        else { const a2 = { ...answersRef.current }; delete a2[q.id]; answersRef.current = a2; setAnswers({ ...a2 }); }
        return next;
      });
    } else {
      answersRef.current = { ...answersRef.current, [q.id]: opt };
      setAnswers({ ...answersRef.current });
    }
  };

  const goTo = (idx: number) => {
    if (idx < 0 || idx >= questions.length) return;
    const prevQ = questions[current];
    if (prevQ) {
      recordTimeOnQuestion(prevQ.id);
      if (isMultiAnswer(prevQ)) {
        const cur = answers[prevQ.id] || '';
        setMultiSelected(cur.split('').filter(Boolean));
      }
    }
    currentRef.current = idx;
    setCurrent(idx);
    const nextQ = questions[idx];
    if (nextQ && isMultiAnswer(nextQ)) {
      const cur = answers[nextQ.id] || '';
      setMultiSelected(cur.split('').filter(Boolean));
    } else {
      setMultiSelected([]);
    }
  };

  const toggleFlag = () => {
    const id = questions[current]?.id;
    if (!id) return;
    setFlagged(f => { const n = new Set(f); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const handleSubmit = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSubmitted(true);
    // Use refs — always current values, no stale closure
    const qs = questionsRef.current;
    const ans = answersRef.current;
    const currentQ = qs[currentRef.current];
    const finalTimes = { ...questionTimesRef.current };
    if (currentQ) {
      const spent = Math.round((Date.now() - questionStartRef.current) / 1000);
      finalTimes[currentQ.id] = (finalTimes[currentQ.id] || 0) + spent;
    }
    const result = calcScore(qs, ans);
    result.timeTaken = TOTAL_TIME - timeLeftRef.current;
    result.questionTimes = finalTimes;
    saveTestResult(result);
    const set = selectedSetRef.current;
    if (set !== null) {
      markSetDone(set, result.score);
      setSetScores(prev => { const next = [...prev]; next[set] = result.score; return next; });
    }
    router.push('/results');
  }, [router]);

  // --- SET PICKER ---
  if (phase === 'pick') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>NCP-AAI Mock Test</span>
          <a href="/" style={{ color: 'var(--muted)', fontSize: 13, textDecoration: 'none' }}>← Dashboard</a>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Choose Your Mock Test Set</h1>
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>
              {totalSets} unique sets · 65 questions each · 90 minutes · 50% scenario / 50% knowledge · No question repeats across sets
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {Array.from({ length: totalSets }, (_, i) => {
              const score = setScores[i] ?? null;
              const done = score !== null;
              return (
                <div key={i} style={{
                  background: 'var(--surface)', border: `1px solid ${done ? 'var(--correct)' : 'var(--border)'}`,
                  borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>MOCK TEST</div>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>Set {i + 1}</div>
                    </div>
                    {done && (
                      <div style={{
                        background: score >= 75 ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                        color: score >= 75 ? 'var(--correct)' : 'var(--incorrect)',
                        padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                      }}>
                        {score}%
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {[['65 Qs', 'var(--muted)'], ['90 min', 'var(--muted)'], ['50/50 split', '#0ea5e9']].map(([label, color]) => (
                      <span key={label} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'var(--surface2)', color }}>{label}</span>
                    ))}
                    {done && (
                      <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(34,197,94,0.1)', color: 'var(--correct)' }}>
                        ✓ Completed
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => startSet(i)}
                    style={{
                      padding: '10px', background: done ? 'var(--surface2)' : 'var(--green)',
                      color: done ? 'var(--text)' : '#000', border: done ? '1px solid var(--border)' : 'none',
                      borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer',
                    }}
                  >
                    {done ? '↺ Retake' : '▶ Start Set'}
                  </button>
                </div>
              );
            })}
          </div>

          {totalSets === 0 && (
            <div style={{ textAlign: 'center', padding: 48, color: 'var(--muted)' }}>
              Loading sets...
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- EXAM UI ---
  if (questions.length === 0) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--muted)' }}>Loading questions...</div>;

  const q = questions[current];
  const isFlagged = flagged.has(q.id);
  const answered = answers[q.id];
  const isMulti = isMultiAnswer(q);
  const answerCount = q.answerCount ?? (isMulti ? q.answer.length : 1);
  const timerColor = timeLeft < 600 ? 'var(--incorrect)' : timeLeft < 1800 ? 'var(--warning)' : 'var(--green)';

  const getOptionClass = (opt: string) => {
    if (isMulti) return multiSelected.includes(opt) ? 'option-btn selected' : 'option-btn';
    return answered === opt ? 'option-btn selected' : 'option-btn';
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ fontSize: 13, color: 'var(--muted)' }}>
          <span style={{ color: 'var(--text)', fontWeight: 600 }}>Q {current + 1}</span> / {questions.length}
          <span style={{ marginLeft: 8, fontSize: 11, background: 'var(--surface2)', padding: '2px 8px', borderRadius: 4 }}>Domain {q.domain}</span>
          {selectedSet !== null && <span style={{ marginLeft: 6, fontSize: 11, color: 'var(--muted)' }}>Set {selectedSet + 1}</span>}
        </div>
        <div style={{ fontWeight: 700, fontSize: 16, color: timerColor, fontFamily: 'monospace' }}>⏱ {formatTime(timeLeft)}</div>
        <button onClick={() => setShowConfirm(true)} style={{ padding: '6px 16px', background: 'var(--green)', color: '#000', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
          Submit Test
        </button>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: 'var(--border)' }}>
        <div style={{ height: 3, background: 'var(--green)', width: `${((current + 1) / questions.length) * 100}%`, transition: 'width 0.2s' }} />
      </div>

      <div style={{ flex: 1, display: 'flex', gap: 0, maxWidth: 1200, margin: '0 auto', width: '100%', padding: '24px 20px' }}>
        {/* Main Question */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(118,185,0,0.15)', color: 'var(--green)' }}>{q.topic}</span>
            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'var(--surface2)', color: 'var(--muted)', textTransform: 'capitalize' }}>{q.difficulty}</span>
            {isMulti && <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(14,165,233,0.15)', color: '#0ea5e9' }}>Select {answerCount}</span>}
            {isFlagged && <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(210,153,34,0.15)', color: 'var(--warning)' }}>🚩 Flagged</span>}
          </div>

          {isMulti && (
            <div style={{ marginBottom: 12, fontSize: 13, color: '#0ea5e9', fontWeight: 500 }}>
              Choose {answerCount} answers that apply. ({multiSelected.length}/{answerCount} selected)
            </div>
          )}

          <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, fontWeight: 500 }}>{q.question}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {(['A', 'B', 'C', 'D', 'E'] as const).filter(opt => opt !== 'E' || q.options.E).map(opt => (
              <button key={opt} className={getOptionClass(opt)} onClick={() => handleSelect(opt)}>
                {isMulti ? (
                  <span style={{
                    width: 18, height: 18, border: `2px solid ${multiSelected.includes(opt) ? '#0ea5e9' : 'var(--border)'}`,
                    borderRadius: 4, background: multiSelected.includes(opt) ? '#0ea5e9' : 'transparent',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginRight: 4,
                  }}>
                    {multiSelected.includes(opt) && <span style={{ color: '#000', fontSize: 11, fontWeight: 700 }}>✓</span>}
                  </span>
                ) : (
                  <span style={{ fontWeight: 700, color: 'var(--green)', minWidth: 20, flexShrink: 0 }}>{opt}.</span>
                )}
                <span>{q.options[opt]}</span>
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
            <button onClick={toggleFlag} style={{ padding: '8px 16px', background: isFlagged ? 'rgba(210,153,34,0.2)' : 'var(--surface2)', border: `1px solid ${isFlagged ? 'var(--warning)' : 'var(--border)'}`, color: isFlagged ? 'var(--warning)' : 'var(--muted)', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
              🚩 {isFlagged ? 'Unflag' : 'Flag for Review'}
            </button>
            <button onClick={() => goTo(current - 1)} disabled={current === 0} style={{ padding: '8px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', color: current === 0 ? 'var(--muted)' : 'var(--text)', borderRadius: 6, cursor: current === 0 ? 'not-allowed' : 'pointer', fontSize: 13 }}>
              ← Prev
            </button>
            <button onClick={() => goTo(current + 1)} disabled={current === questions.length - 1} style={{ padding: '8px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', color: current === questions.length - 1 ? 'var(--muted)' : 'var(--text)', borderRadius: 6, cursor: current === questions.length - 1 ? 'not-allowed' : 'pointer', fontSize: 13 }}>
              Next →
            </button>
            <button onClick={() => setPhase('pick')} style={{ padding: '8px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--muted)', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
              ← Sets
            </button>
          </div>
        </div>

        {/* Navigation Panel */}
        <div style={{ width: 220, marginLeft: 24, flexShrink: 0 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 16, position: 'sticky', top: 80 }}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10, color: 'var(--muted)' }}>NAVIGATION</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
              {questions.map((qn, idx) => {
                let cls = 'nav-dot';
                if (idx === current) cls += ' current';
                else if (flagged.has(qn.id)) cls += ' flagged';
                else if (answers[qn.id]) cls += ' answered';
                return (
                  <button key={qn.id} className={cls} onClick={() => goTo(idx)} title={`Q${idx+1}`}>
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                <span className="nav-dot answered" style={{ width: 12, height: 12, fontSize: 0 }} />
                <span>Answered ({Object.keys(answers).length})</span>
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                <span className="nav-dot flagged" style={{ width: 12, height: 12, fontSize: 0 }} />
                <span>Flagged ({flagged.size})</span>
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span className="nav-dot" style={{ width: 12, height: 12, fontSize: 0 }} />
                <span>Not answered ({questions.length - Object.keys(answers).length})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}
      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, maxWidth: 380, width: '90%' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Submit Test?</h3>
            <p style={{ color: 'var(--muted)', marginBottom: 8, fontSize: 14 }}>
              Answered: <strong style={{ color: 'var(--text)' }}>{Object.keys(answers).length}</strong> / {questions.length}
            </p>
            <p style={{ color: 'var(--muted)', marginBottom: 24, fontSize: 14 }}>
              Unanswered: <strong style={{ color: 'var(--warning)' }}>{questions.length - Object.keys(answers).length}</strong>
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowConfirm(false)} style={{ flex: 1, padding: 12, background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>
                Continue Test
              </button>
              <button onClick={handleSubmit} style={{ flex: 1, padding: 12, background: 'var(--green)', color: '#000', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
