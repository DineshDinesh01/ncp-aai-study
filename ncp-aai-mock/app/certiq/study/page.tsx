'use client';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CERTIQ_QUESTIONS } from '@/lib/questions/certiq';
import { DOMAIN_NAMES, DOMAIN_COLORS } from '@/lib/utils';

const PAGE_SIZE = 10;

function CertIQStudyContent() {
  const searchParams = useSearchParams();
  const initDomain = Number(searchParams.get('domain') || 0);
  const [domain, setDomain] = useState(initDomain);
  const [page, setPage] = useState(0);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState('');

  const filtered = CERTIQ_QUESTIONS.filter(q => {
    if (domain !== 0 && q.domain !== domain) return false;
    if (search) {
      const s = search.toLowerCase();
      return q.question.toLowerCase().includes(s) || q.topic.toLowerCase().includes(s) || q.keywords.some(k => k.toLowerCase().includes(s));
    }
    return true;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageQs = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px' }}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} placeholder="Search questions..."
          style={{ flex: 1, minWidth: 200, padding: '8px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 14 }} />
        <select value={domain} onChange={e => { setDomain(Number(e.target.value)); setPage(0); }}
          style={{ padding: '8px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 14 }}>
          <option value={0}>All Domains</option>
          {[1,2,3,4,5,6,7,8,9,10].map(d => <option key={d} value={d}>Domain {d}: {DOMAIN_NAMES[d]}</option>)}
        </select>
      </div>
      <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>{filtered.length} questions</div>
      {pageQs.map((q, idx) => {
        const isRevealed = revealed.has(q.id);
        const color = DOMAIN_COLORS[q.domain] || 'var(--green)';
        const opts = (['A', 'B', 'C', 'D', 'E'] as const).filter(opt => q.options[opt]);
        return (
          <div key={q.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: `${color}22`, color }}>{DOMAIN_NAMES[q.domain] || `Domain ${q.domain}`}</span>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'var(--surface2)', color: 'var(--muted)' }}>{q.topic}</span>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'var(--surface2)', color: 'var(--muted)' }}>#{page * PAGE_SIZE + idx + 1}</span>
              {q.verified === false && (
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(239,68,68,0.15)', color: 'var(--incorrect)', fontWeight: 700 }}>⚠ UNVERIFIED — AI best-guess answer, not confirmed against Certiq</span>
              )}
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 16, fontWeight: 500 }}>{q.question}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {opts.map(opt => {
                const isCorrect = isRevealed && q.answer.includes(opt);
                return (
                  <div key={opt} style={{ display: 'flex', gap: 10, padding: '10px 14px', background: isCorrect ? 'rgba(34,197,94,0.1)' : 'var(--surface2)', border: `1px solid ${isCorrect ? 'var(--correct)' : 'var(--border)'}`, borderRadius: 8 }}>
                    <span style={{ fontWeight: 700, color: isCorrect ? 'var(--correct)' : 'var(--green)', minWidth: 20, flexShrink: 0 }}>{opt}.</span>
                    <span style={{ color: isCorrect ? 'var(--correct)' : 'var(--text)' }}>{q.options[opt]}</span>
                  </div>
                );
              })}
            </div>
            {isRevealed ? (
              <div style={{ background: 'rgba(118,185,0,0.08)', border: '1px solid rgba(118,185,0,0.2)', borderRadius: 8, padding: 14, fontSize: 13, color: 'var(--muted)' }}>
                <strong style={{ color: 'var(--green)' }}>Answer: {q.answer}</strong> — {q.explanation}
              </div>
            ) : (
              <button onClick={() => setRevealed(r => { const n = new Set(r); n.add(q.id); return n; })}
                style={{ padding: '8px 20px', background: 'var(--green)', color: '#000', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                Reveal Answer
              </button>
            )}
          </div>
        );
      })}
      {totalPages > 1 && (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 24 }}>
          <button disabled={page === 0} onClick={() => setPage(p => p - 1)} style={{ padding: '8px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 6, color: page === 0 ? 'var(--muted)' : 'var(--text)', cursor: page === 0 ? 'not-allowed' : 'pointer' }}>← Prev</button>
          <span style={{ padding: '8px 16px', color: 'var(--muted)', fontSize: 13 }}>Page {page + 1} / {totalPages}</span>
          <button disabled={page === totalPages - 1} onClick={() => setPage(p => p + 1)} style={{ padding: '8px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 6, color: page === totalPages - 1 ? 'var(--muted)' : 'var(--text)', cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer' }}>Next →</button>
        </div>
      )}
    </div>
  );
}

export default function CertIQStudy() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/certiq" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 700 }}>← CertIQ</Link>
        <span style={{ fontWeight: 600 }}>Study Mode</span>
        <Link href="/certiq/mock" style={{ padding: '6px 16px', borderRadius: 6, background: 'var(--green)', color: '#000', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Mock Test</Link>
      </nav>
      <Suspense fallback={<div style={{ padding: 40, color: 'var(--muted)' }}>Loading...</div>}>
        <CertIQStudyContent />
      </Suspense>
    </div>
  );
}
