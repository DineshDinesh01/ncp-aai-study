'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { loadCertiqResult } from '@/lib/utils';
import { TestResult } from '@/lib/types';
import { CERTIQ_QUESTIONS } from '@/lib/questions/certiq';

export default function CertIQDashboard() {
  const [lastResult, setLastResult] = useState<TestResult | null>(null);
  useEffect(() => { setLastResult(loadCertiqResult()); }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 700 }}>← NCP-AAI PrepMaster</Link>
        <span style={{ fontWeight: 700, fontSize: 15 }}>CertIQ — Study Guide Practice</span>
      </nav>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎯</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>CertIQ Practice</h1>
          <p style={{ color: 'var(--muted)', fontSize: 15 }}>{CERTIQ_QUESTIONS.length} questions from the deduplicated NCP-AAI question bank</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <Link href="/certiq/mock" style={{ textDecoration: 'none' }}>
            <div style={{ background: 'var(--surface)', border: '2px solid var(--green)', borderRadius: 12, padding: 24, textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📝</div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Mock Test</div>
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>{CERTIQ_QUESTIONS.length} questions · split into 2 sets or take the full exam</div>
            </div>
          </Link>
          <Link href="/certiq/study" style={{ textDecoration: 'none' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📖</div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Study Mode</div>
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>Browse, filter by domain, and reveal answers</div>
            </div>
          </Link>
        </div>
        {lastResult && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Link href="/certiq/results" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Last Results</div>
                <div style={{ color: lastResult.score >= 75 ? 'var(--correct)' : 'var(--incorrect)', fontWeight: 700, fontSize: 22 }}>{lastResult.score}%</div>
              </div>
            </Link>
            <Link href="/certiq/review" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Review Wrong</div>
                <div style={{ color: 'var(--muted)', fontSize: 13 }}>{lastResult.incorrect} incorrect answers to review</div>
              </div>
            </Link>
          </div>
        )}
        <Link href="/certiq/flagged" style={{ textDecoration: 'none' }}>
          <div style={{ background: 'var(--surface)', border: '2px solid var(--incorrect)', borderRadius: 12, padding: 24, textAlign: 'center', cursor: 'pointer', marginTop: 16 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🚩</div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>My Flagged Questions (from real Certiq)</div>
            <div style={{ color: 'var(--muted)', fontSize: 13 }}>Questions you actually got wrong on Certiq, ranked by how often each one recurred</div>
          </div>
        </Link>
        <Link href="/certiq/history" style={{ textDecoration: 'none' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, textAlign: 'center', cursor: 'pointer', marginTop: 16 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📅</div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Day-wise History &amp; Insights</div>
            <div style={{ color: 'var(--muted)', fontSize: 13 }}>Every past test, grouped by day, with full review + weakest-topic trends</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
