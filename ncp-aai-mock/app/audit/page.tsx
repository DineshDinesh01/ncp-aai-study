'use client';
import { useState, useEffect } from 'react';
import { ALL_QUESTIONS } from '@/lib/questions';
import { DOMAIN_NAMES, DOMAIN_COLORS } from '@/lib/utils';
import { Question } from '@/lib/types';

const FLAGGED_KEY = 'ncp_flagged_questions';
const CLEARED_KEY = 'ncp_cleared_questions';

function isSuspect(q: Question): boolean {
  if (q.quality === 'standard') return true;
  if (!q.topic.toLowerCase().includes('scenario') && q.question.length < 100) return true;
  return false;
}

export default function AuditPage() {
  const [domainFilter, setDomainFilter] = useState<number | null>(null);
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [cleared, setCleared] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 20;

  useEffect(() => {
    try {
      const f = JSON.parse(localStorage.getItem(FLAGGED_KEY) || '[]') as number[];
      const c = JSON.parse(localStorage.getItem(CLEARED_KEY) || '[]') as number[];
      setFlagged(new Set(f));
      setCleared(new Set(c));
    } catch { /* ignore */ }
  }, []);

  const persist = (nextFlagged: Set<number>, nextCleared: Set<number>) => {
    localStorage.setItem(FLAGGED_KEY, JSON.stringify([...nextFlagged]));
    localStorage.setItem(CLEARED_KEY, JSON.stringify([...nextCleared]));
  };

  const flag = (id: number) => {
    const nf = new Set(flagged); nf.add(id);
    const nc = new Set(cleared); nc.delete(id);
    setFlagged(nf); setCleared(nc); persist(nf, nc);
  };

  const clear = (id: number) => {
    const nf = new Set(flagged); nf.delete(id);
    const nc = new Set(cleared); nc.add(id);
    setFlagged(nf); setCleared(nc); persist(nf, nc);
  };

  const suspects = ALL_QUESTIONS.filter(isSuspect);
  const filtered = domainFilter ? suspects.filter(q => q.domain === domainFilter) : suspects;
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const reviewedCount = suspects.filter(q => flagged.has(q.id) || cleared.has(q.id)).length;
  const flaggedCount = suspects.filter(q => flagged.has(q.id)).length;
  const clearedCount = suspects.filter(q => cleared.has(q.id)).length;

  const domains = [1,2,3,4,5,6,7,8,9,10];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Nav */}
      <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <span style={{ fontWeight: 700, fontSize: 15 }}>🔍 Question Audit</span>
        <a href="/" style={{ color: 'var(--muted)', fontSize: 13, textDecoration: 'none' }}>← Dashboard</a>
      </nav>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Suspect Questions', value: suspects.length, color: 'var(--warning)' },
            { label: 'Reviewed', value: reviewedCount, color: 'var(--green)' },
            { label: 'Flagged (remove later)', value: flaggedCount, color: 'var(--incorrect)' },
            { label: 'Cleared (keep)', value: clearedCount, color: 'var(--correct)' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20 }}>
          Showing questions that are either marked as &apos;standard&apos; quality or are knowledge questions with a short stem (&lt;100 chars). These are candidates for replacement with Preparto-style questions. Nothing is deleted — flagging just marks them for your reference.
        </p>

        {/* Domain Filter */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          <button
            onClick={() => { setDomainFilter(null); setPage(0); }}
            style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid var(--border)', background: domainFilter === null ? 'var(--green)' : 'var(--surface2)', color: domainFilter === null ? '#000' : 'var(--text)', cursor: 'pointer', fontSize: 13, fontWeight: domainFilter === null ? 700 : 400 }}
          >
            All ({suspects.length})
          </button>
          {domains.map(d => {
            const count = suspects.filter(q => q.domain === d).length;
            if (count === 0) return null;
            return (
              <button
                key={d}
                onClick={() => { setDomainFilter(d); setPage(0); }}
                style={{ padding: '6px 14px', borderRadius: 6, border: `1px solid ${domainFilter === d ? DOMAIN_COLORS[d] : 'var(--border)'}`, background: domainFilter === d ? DOMAIN_COLORS[d] + '22' : 'var(--surface2)', color: domainFilter === d ? DOMAIN_COLORS[d] : 'var(--text)', cursor: 'pointer', fontSize: 12 }}
              >
                D{d} ({count})
              </button>
            );
          })}
        </div>

        {/* Question List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {pageItems.map(q => {
            const isFl = flagged.has(q.id);
            const isCl = cleared.has(q.id);
            const color = DOMAIN_COLORS[q.domain];
            return (
              <div key={q.id} style={{
                background: 'var(--surface)', border: `1px solid ${isFl ? 'var(--incorrect)' : isCl ? 'var(--correct)' : 'var(--border)'}`,
                borderRadius: 10, padding: 16,
              }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: color + '22', color }}>{DOMAIN_NAMES[q.domain]}</span>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>{q.topic}</span>
                  <span style={{ fontSize: 11, padding: '2px 6px', borderRadius: 4, background: 'var(--surface2)', color: 'var(--muted)', textTransform: 'capitalize' }}>{q.difficulty}</span>
                  <span style={{ fontSize: 10, color: 'var(--muted)', marginLeft: 'auto' }}>ID: {q.id}</span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 12, color: 'var(--text)' }}>{q.question}</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => flag(q.id)}
                    style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid var(--incorrect)', background: isFl ? 'rgba(239,68,68,0.15)' : 'transparent', color: 'var(--incorrect)', cursor: 'pointer', fontSize: 12, fontWeight: isFl ? 700 : 400 }}
                  >
                    {isFl ? '⚑ Flagged' : '⚑ Flag'}
                  </button>
                  <button
                    onClick={() => clear(q.id)}
                    style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid var(--correct)', background: isCl ? 'rgba(34,197,94,0.15)' : 'transparent', color: 'var(--correct)', cursor: 'pointer', fontSize: 12, fontWeight: isCl ? 700 : 400 }}
                  >
                    {isCl ? '✓ Cleared' : '✓ Looks Good'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', gap: 8, marginTop: 24, justifyContent: 'center', alignItems: 'center' }}>
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface2)', color: page === 0 ? 'var(--muted)' : 'var(--text)', cursor: page === 0 ? 'not-allowed' : 'pointer', fontSize: 13 }}>← Prev</button>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>Page {page + 1} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface2)', color: page === totalPages - 1 ? 'var(--muted)' : 'var(--text)', cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer', fontSize: 13 }}>Next →</button>
          </div>
        )}
      </div>
    </div>
  );
}
