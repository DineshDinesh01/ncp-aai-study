'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DOMAIN_NAMES, DOMAIN_COLORS, loadTestHistory, loadCertiqHistory } from '@/lib/utils';
import { TestResult } from '@/lib/types';

const API = 'http://localhost:9147';

interface DomainStat { domain: number; correct: number; total: number; accuracy: number; }
interface Stats { total_tests: number; best_score: number; avg_score: number; total_correct: number; total_qs: number; total_passed: number; }
interface AppData { overall: Stats; ncp: Stats; certiq: Stats; byDomain: DomainStat[]; }
interface DailyRow { day: string; best_score: number; }
interface HistoryRow { id: number; session_type: string; score: number; correct: number; incorrect: number; total: number; passed: number; time_taken: number; taken_at: string; }

type LocalHistory = (TestResult & { takenAt: string })[];

function buildStats(history: LocalHistory): Stats {
  if (!history.length) return { total_tests: 0, best_score: 0, avg_score: 0, total_correct: 0, total_qs: 0, total_passed: 0 };
  return {
    total_tests: history.length,
    best_score: Math.max(...history.map(h => h.score)),
    avg_score: Math.round(history.reduce((s, h) => s + h.score, 0) / history.length),
    total_correct: history.reduce((s, h) => s + h.correct, 0),
    total_qs: history.reduce((s, h) => s + h.totalQuestions, 0),
    total_passed: history.filter(h => h.passed).length,
  };
}

function buildDomainStats(history: LocalHistory): DomainStat[] {
  const domainMap: Record<number, { correct: number; total: number }> = {};
  for (const h of history) {
    for (const [d, s] of Object.entries(h.domainScores || {})) {
      const dn = Number(d);
      if (!domainMap[dn]) domainMap[dn] = { correct: 0, total: 0 };
      domainMap[dn].correct += (s as { correct: number; total: number }).correct;
      domainMap[dn].total += (s as { correct: number; total: number }).total;
    }
  }
  return Object.entries(domainMap).map(([d, s]) => ({
    domain: Number(d), correct: s.correct, total: s.total,
    accuracy: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0,
  }));
}

function buildAppData(ncpHistory: LocalHistory, certiqHistory: LocalHistory): AppData {
  const ncp = buildStats(ncpHistory);
  const certiq = buildStats(certiqHistory);
  const allHistory = [...ncpHistory, ...certiqHistory];
  const overall = buildStats(allHistory);
  const byDomain = buildDomainStats(ncpHistory); // domain breakdown only from NCP tests
  return { overall, ncp, certiq, byDomain };
}

const SPRINT_DAYS = [
  { day: 1, title: 'Baseline', desc: 'Take Set 1 (65 Qs, 90 min). Review every wrong answer. Use Drill mode immediately after.' },
  { day: 2, title: 'Domain Focus', desc: 'Study D1 + D2 (30% of exam). Topic filter: NeMo, NIM, LangGraph, ReAct, tool-calling.' },
  { day: 3, title: 'Full Mock', desc: 'Take Set 2. Target 75%+. Drill wrong answers same session. Check slow-question flags.' },
  { day: 4, title: 'Weak Domain Attack', desc: 'Open Results → weakest 3 domains → Study those topics specifically. Use Scenario filter.' },
  { day: 5, title: 'Final Check', desc: 'Take Set 3. If 85%+ → you\'re ready. If not → drill flagged questions, then rest. Pass = 75%.' },
];

function ScoreColor(s: number) { return s >= 85 ? 'var(--correct)' : s >= 75 ? 'var(--warning)' : 'var(--incorrect)'; }

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px' }}>
      <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: color || 'var(--text)', marginBottom: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--muted)' }}>{sub}</div>}
    </div>
  );
}

function MiniBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${Math.min(pct, 100)}%`, background: color, borderRadius: 3, transition: 'width 0.4s' }} />
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState<AppData | null>(null);
  const [daily, setDaily] = useState<DailyRow[]>([]);
  const [apiHistory, setApiHistory] = useState<HistoryRow[]>([]);
  const [localHistory, setLocalHistory] = useState<LocalHistory>([]);
  const [certiqHistory, setCertiqHistory] = useState<LocalHistory>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'ncp' | 'certiq'>('all');
  const [usingApi, setUsingApi] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sprintDay, setSprintDay] = useState(1);

  const loadLocal = () => {
    const ncp = loadTestHistory();
    const ciq = loadCertiqHistory();
    setLocalHistory(ncp);
    setCertiqHistory(ciq);
    setStats(buildAppData(ncp, ciq));
    setUsingApi(false);
  };

  const fetchData = async (type?: string) => {
    setLoading(true);
    try {
      const [s, d, h] = await Promise.all([
        fetch(`${API}/api/stats${type ? `?type=${type}` : ''}`, { signal: AbortSignal.timeout(2000) }).then(r => r.json()),
        fetch(`${API}/api/daily${type ? `?type=${type}` : ''}&limit=14`, { signal: AbortSignal.timeout(2000) }).then(r => r.json()),
        fetch(`${API}/api/history${type ? `?type=${type}` : ''}&limit=20`, { signal: AbortSignal.timeout(2000) }).then(r => r.json()),
      ]);
      setStats(s);
      setDaily(Array.isArray(d) ? d.reverse() : []);
      setApiHistory(Array.isArray(h) ? h : []);
      setUsingApi(true);
    } catch {
      loadLocal();
    }
    setLoading(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem('ncp_sprint_start');
    if (!stored) {
      localStorage.setItem('ncp_sprint_start', new Date().toDateString());
      setSprintDay(1);
    } else {
      const start = new Date(stored);
      const now = new Date();
      const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      setSprintDay(Math.min(5, Math.max(1, diff + 1)));
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) fetchData(activeTab === 'all' ? undefined : activeTab);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const currentStats = activeTab === 'ncp' ? stats?.ncp : activeTab === 'certiq' ? stats?.certiq : stats?.overall;
  const domainStats = stats?.byDomain || [];
  const activeHistory = activeTab === 'certiq' ? certiqHistory : activeTab === 'ncp' ? localHistory : [...localHistory, ...certiqHistory].sort((a, b) => new Date(b.takenAt).getTime() - new Date(a.takenAt).getTime());

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 700 }}>← NCP-AAI PrepMaster</Link>
        <span style={{ fontWeight: 700, fontSize: 15 }}>Progress Dashboard</span>
        <button onClick={() => fetchData(activeTab === 'all' ? undefined : activeTab)}
          style={{ padding: '6px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', cursor: 'pointer', fontSize: 13 }}>
          ↻ Refresh
        </button>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>

        {/* 5-Day Sprint Plan */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, marginBottom: 28 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>📅 5-Day Sprint to Pass NCP-AAI</div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {SPRINT_DAYS.map(({ day, title, desc }) => {
              const isToday = day === sprintDay;
              const isDone = day < sprintDay;
              const borderColor = isToday ? 'var(--green)' : isDone ? 'var(--correct)' : 'var(--border)';
              const bg = isToday ? 'rgba(118,185,0,0.08)' : 'var(--surface2)';
              return (
                <div key={day} style={{ minWidth: 180, flex: 1, background: bg, border: `1.5px solid ${borderColor}`, borderRadius: 10, padding: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: isToday ? 'var(--green)' : isDone ? 'var(--correct)' : 'var(--muted)' }}>
                      {isDone ? '✓' : `D${day}`}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: isToday ? 'var(--text)' : 'var(--muted)' }}>{title}</span>
                    {isToday && <span style={{ fontSize: 10, padding: '1px 6px', background: 'var(--green)', color: '#000', borderRadius: 10, fontWeight: 700 }}>TODAY</span>}
                  </div>
                  <p style={{ fontSize: 12, color: isToday ? 'var(--text)' : 'var(--muted)', lineHeight: 1.5, margin: 0 }}>{desc}</p>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: 'var(--muted)' }}>
            Pass mark: 75% · Target: 85%+ in practice · Exam-day nerves typically cost 5-8%
          </div>
        </div>


        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {(['all', 'ncp', 'certiq'] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              style={{ padding: '8px 20px', borderRadius: 8, border: '1px solid var(--border)', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                background: activeTab === t ? 'var(--green)' : 'var(--surface)', color: activeTab === t ? '#000' : 'var(--text)' }}>
              {t === 'all' ? 'All Tests' : t === 'ncp' ? 'NCP-AAI' : 'CertIQ'}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--muted)' }}>Loading...</div>
        ) : (
          <>
            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 32 }}>
              <StatCard label="Tests Taken" value={currentStats?.total_tests ?? '—'} />
              <StatCard label="Best Score" value={currentStats?.best_score != null && currentStats.best_score > 0 ? `${currentStats.best_score}%` : '—'}
                color={ScoreColor(currentStats?.best_score ?? 0)} />
              <StatCard label="Avg Score" value={currentStats?.avg_score != null && currentStats.avg_score > 0 ? `${currentStats.avg_score}%` : '—'}
                color={ScoreColor(currentStats?.avg_score ?? 0)} />
              <StatCard label="Tests Passed" value={currentStats?.total_passed ?? '—'}
                sub={currentStats?.total_tests ? `${Math.round((currentStats.total_passed / currentStats.total_tests) * 100)}% pass rate` : undefined} />
              <StatCard label="Total Qs Answered" value={currentStats?.total_qs ?? '—'} />
            </div>

            {/* NCP vs CertIQ side by side */}
            {activeTab === 'all' && stats && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 32 }}>
                {[{ label: 'NCP-AAI', key: 'ncp', href: '/mock' }, { label: 'CertIQ', key: 'certiq', href: '/certiq/mock' }].map(({ label, key, href }) => {
                  const s = key === 'ncp' ? stats.ncp : stats.certiq;
                  return (
                    <div key={key} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <span style={{ fontWeight: 700, fontSize: 15 }}>{label}</span>
                        <Link href={href} style={{ fontSize: 13, color: 'var(--green)', textDecoration: 'none' }}>Take Test →</Link>
                      </div>
                      {s?.total_tests > 0 ? (
                        <>
                          <div style={{ fontSize: 28, fontWeight: 700, color: ScoreColor(s.best_score), marginBottom: 4 }}>{s.best_score}% best</div>
                          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>{s.avg_score}% avg · {s.total_tests} tests</div>
                          <MiniBar pct={s.best_score} color={ScoreColor(s.best_score)} />
                        </>
                      ) : (
                        <div style={{ color: 'var(--muted)', fontSize: 13 }}>No tests taken yet</div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}


            {/* Daily progress chart (API only) */}
            {daily.length > 0 && (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
                <div style={{ fontWeight: 600, marginBottom: 20 }}>Daily Progress (last {daily.length} days)</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 100 }}>
                  {daily.map((d, i) => {
                    const h = Math.max(4, (d.best_score / 100) * 100);
                    const color = ScoreColor(d.best_score);
                    return (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600 }}>{d.best_score}%</div>
                        <div style={{ width: '100%', height: h, background: color, borderRadius: '3px 3px 0 0', opacity: 0.85 }} title={`${d.day}: ${d.best_score}%`} />
                        <div style={{ fontSize: 9, color: 'var(--muted)', writingMode: 'vertical-rl', transform: 'rotate(180deg)', height: 30 }}>{d.day?.slice(5)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Domain breakdown */}
            {domainStats.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontWeight: 600, marginBottom: 14 }}>Domain Accuracy</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 10 }}>
                  {domainStats.sort((a, b) => a.accuracy - b.accuracy).map(d => {
                    const color = DOMAIN_COLORS[d.domain] || 'var(--green)';
                    const needsWork = d.accuracy < 75;
                    return (
                      <div key={d.domain} style={{ background: 'var(--surface)', border: `1px solid ${needsWork ? 'rgba(239,68,68,0.3)' : 'var(--border)'}`, borderRadius: 10, padding: '14px 16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <div>
                            <span style={{ fontSize: 13, color: 'var(--text)' }}>
                              <span style={{ color, fontWeight: 600 }}>D{d.domain}</span> {DOMAIN_NAMES[d.domain]}
                            </span>
                            {needsWork && <div style={{ fontSize: 11, color: 'var(--incorrect)', marginTop: 2 }}>⚠ Needs work</div>}
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 15, fontWeight: 700, color: ScoreColor(d.accuracy) }}>{d.accuracy}%</div>
                            <div style={{ fontSize: 11, color: 'var(--muted)' }}>{d.correct}/{d.total}</div>
                          </div>
                        </div>
                        <MiniBar pct={d.accuracy} color={color} />
                        {needsWork && (
                          <Link href={`/study?domain=${d.domain}`} style={{ display: 'inline-block', marginTop: 8, fontSize: 12, color: 'var(--green)', textDecoration: 'none' }}>
                            Study Domain {d.domain} →
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Test history — API when online, localStorage fallback */}
            {usingApi && apiHistory.length > 0 ? (
              <div>
                <div style={{ fontWeight: 600, marginBottom: 14 }}>Test History ({apiHistory.length} tests)</div>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}>
                        {['Date', 'Type', 'Score', 'Correct', 'Incorrect', 'Time', 'Result', 'Review'].map(h => (
                          <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: 'var(--muted)', fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {apiHistory.map((r, i) => (
                        <tr key={r.id} style={{ borderBottom: i < apiHistory.length - 1 ? '1px solid var(--border)' : 'none' }}>
                          <td style={{ padding: '10px 14px', color: 'var(--muted)' }}>{r.taken_at}</td>
                          <td style={{ padding: '10px 14px' }}>
                            <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
                              background: r.session_type === 'ncp' ? 'rgba(118,185,0,0.15)' : 'rgba(14,165,233,0.15)',
                              color: r.session_type === 'ncp' ? 'var(--green)' : '#0ea5e9' }}>
                              {r.session_type === 'ncp' ? 'NCP-AAI' : 'CertIQ'}
                            </span>
                          </td>
                          <td style={{ padding: '10px 14px', fontWeight: 700, color: ScoreColor(r.score) }}>{r.score}%</td>
                          <td style={{ padding: '10px 14px', color: 'var(--correct)' }}>{r.correct}</td>
                          <td style={{ padding: '10px 14px', color: 'var(--incorrect)' }}>{r.incorrect}</td>
                          <td style={{ padding: '10px 14px', color: 'var(--muted)' }}>{Math.floor(r.time_taken / 60)}m {r.time_taken % 60}s</td>
                          <td style={{ padding: '10px 14px' }}>
                            <span style={{ color: r.passed ? 'var(--correct)' : 'var(--incorrect)', fontWeight: 600, fontSize: 12 }}>
                              {r.passed ? '✓ PASS' : '✗ FAIL'}
                            </span>
                          </td>
                          <td style={{ padding: '10px 14px' }}>
                            <Link href={r.session_type === 'certiq' ? '/certiq/review' : '/review'}
                              style={{ fontSize: 12, color: 'var(--green)', textDecoration: 'none', fontWeight: 600 }}>
                              View →
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : activeHistory.length > 0 ? (
              <div>
                <div style={{ fontWeight: 600, marginBottom: 14 }}>Test History ({activeHistory.length} tests)</div>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}>
                        {['Date', 'Type', 'Score', 'Correct', 'Incorrect', 'Result', 'Review'].map(h => (
                          <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: 'var(--muted)', fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {activeHistory.map((r, i) => {
                        const isCertiq = certiqHistory.includes(r);
                        return (
                          <tr key={i} style={{ borderBottom: i < activeHistory.length - 1 ? '1px solid var(--border)' : 'none' }}>
                            <td style={{ padding: '10px 14px', color: 'var(--muted)' }}>{new Date(r.takenAt).toLocaleDateString()}</td>
                            <td style={{ padding: '10px 14px' }}>
                              <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
                                background: isCertiq ? 'rgba(14,165,233,0.15)' : 'rgba(118,185,0,0.15)',
                                color: isCertiq ? '#0ea5e9' : 'var(--green)' }}>
                                {isCertiq ? 'CertIQ' : 'NCP-AAI'}
                              </span>
                            </td>
                            <td style={{ padding: '10px 14px', fontWeight: 700, color: ScoreColor(r.score) }}>{r.score}%</td>
                            <td style={{ padding: '10px 14px', color: 'var(--correct)' }}>{r.correct}</td>
                            <td style={{ padding: '10px 14px', color: 'var(--incorrect)' }}>{r.incorrect}</td>
                            <td style={{ padding: '10px 14px' }}>
                              <span style={{ color: r.passed ? 'var(--correct)' : 'var(--incorrect)', fontWeight: 600, fontSize: 12 }}>
                                {r.passed ? '✓ PASS' : '✗ FAIL'}
                              </span>
                            </td>
                            <td style={{ padding: '10px 14px' }}>
                              <Link href={isCertiq ? '/certiq/review' : '/review'}
                                style={{ fontSize: 12, color: 'var(--green)', textDecoration: 'none', fontWeight: 600 }}>
                                View →
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : !loading && (
              <div style={{ textAlign: 'center', padding: 60, color: 'var(--muted)' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>📊</div>
                <p>No test history yet. Take a mock test and your results will appear here.</p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 20 }}>
                  <Link href="/mock" style={{ padding: '10px 24px', background: 'var(--green)', color: '#000', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Start NCP-AAI Mock</Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
