import Link from 'next/link';

const nvidiaProducts = [
  { name: 'NIM', full: 'NVIDIA Inference Microservices', what: 'Containerized, optimized LLM inference', diff: 'Pre-built Docker containers for any cloud/on-prem. One command deploy.' },
  { name: 'NeMo Guardrails', full: '', what: 'Input/output safety rails for LLMs', diff: 'Colang language for defining topical, jailbreak, and I/O rails.' },
  { name: 'AgentIQ', full: '', what: 'Agent observability & profiling toolkit', diff: 'Token-level + workflow-level tracing across every tool call and LLM invocation.' },
  { name: 'NeMo Retriever', full: '', what: 'Enterprise RAG retrieval service', diff: 'Optimized embedding models + cross-encoder reranking. Works with any vector DB.' },
  { name: 'cuVS', full: 'CUDA Vector Search', what: 'GPU-accelerated vector search library', diff: 'Drop-in FAISS replacement that runs on GPU. Massive throughput gains.' },
  { name: 'TensorRT-LLM', full: '', what: 'LLM inference optimization compiler', diff: 'Quantization + kernel fusion + paged KV-cache. Best latency for NVIDIA GPUs.' },
  { name: 'Triton Inference Server', full: '', what: 'Production model serving at scale', diff: 'Multi-framework (PyTorch, TF, ONNX), multi-GPU, dynamic batching.' },
  { name: 'NeMo Curator', full: '', what: 'Dataset curation for fine-tuning', diff: 'Filter, deduplicate, quality-score, and classify text at petabyte scale.' },
  { name: 'RAPIDS', full: '', what: 'GPU-accelerated data science', diff: 'Drop-in for pandas/sklearn/numpy. Same API, runs on GPU.' },
  { name: 'ACE', full: 'Avatar Cloud Engine', what: 'Real-time digital human inference', diff: 'Combines ASR + NLP + TTS + animation on GPU for interactive avatars.' },
];

const domainPriority = [
  { d: 1, w: 15, name: 'Agent Architecture', color: '#76b900', topics: 'ReAct, Plan-Execute, orchestrator/subagent, LangGraph state machines, fan-out/fan-in', tip: 'Most-tested: when to use multi-agent vs single agent, tool registry patterns' },
  { d: 2, w: 15, name: 'Agent Development', color: '#0ea5e9', topics: 'LangChain, LangGraph, NeMo Agent Toolkit, tool calling, structured outputs', tip: 'Know the NeMo Agent Toolkit capabilities cold — it shows up in multi-select' },
  { d: 3, w: 13, name: 'Evaluation & Tuning', color: '#f59e0b', topics: 'RAGAS metrics, LLM-as-judge, AgentEval, LoRA, SFT vs DPO, NeMo Curator', tip: 'RAGAS: know faithfulness vs relevancy vs context precision/recall definitions' },
  { d: 4, w: 13, name: 'Deployment & Scaling', color: '#8b5cf6', topics: 'NIM, Triton, TensorRT-LLM, horizontal scaling, A/B testing, GPU optimization', tip: 'NIM vs Triton vs TensorRT-LLM — know which layer each sits at' },
  { d: 5, w: 10, name: 'Cognition & Memory', color: '#ec4899', topics: 'Episodic/semantic/procedural memory, vector stores, chain-of-thought, MCTS', tip: 'Memory type classification is a common question' },
  { d: 6, w: 10, name: 'Knowledge & Data', color: '#06b6d4', topics: 'RAG chunking, hybrid search, re-ranking, cuVS, NeMo Retriever', tip: 'Know dense vs sparse vs hybrid retrieval trade-offs' },
  { d: 7, w: 7, name: 'NVIDIA Platform', color: '#10b981', topics: 'NGC catalog, NVAIE, NIM, Blueprints, ACE, AI Workbench', tip: 'Focus on which NVIDIA product solves which problem' },
  { d: 8, w: 8, name: 'Reliability', color: '#ef4444', topics: 'Circuit breakers, retry backoff, max iterations, AgentIQ, OpenTelemetry', tip: 'Agent loop safeguards: iteration cap + loop detection + graceful escalation' },
  { d: 9, w: 5, name: 'Safety & Ethics', color: '#f97316', topics: 'NeMo Guardrails, Colang, input/output rails, jailbreak, PII, watermarking', tip: 'Small domain but Guardrails questions are specific — study Colang rail types' },
  { d: 10, w: 5, name: 'Human-AI Oversight', color: '#6366f1', topics: 'HITL vs HOTL, escalation triggers, confidence thresholds, audit logs, handoff', tip: 'Human-in-the-loop vs human-on-the-loop distinction is frequently tested' },
];

export default function TipsPage() {
  const cardStyle = (borderColor?: string): React.CSSProperties => ({
    background: 'var(--surface)',
    border: `1px solid ${borderColor || 'var(--border)'}`,
    borderRadius: 12,
    padding: 20,
  });

  const badge = (text: string, bg: string, color: string): React.CSSProperties => ({
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: 20,
    background: bg,
    color,
    fontSize: 11,
    fontWeight: 700,
    whiteSpace: 'nowrap' as const,
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Nav */}
      <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>← Dashboard</Link>
        <span style={{ fontWeight: 700, fontSize: 15 }}>💡 Exam Strategy & Tips</span>
        <Link href="/mock" style={{ padding: '6px 16px', borderRadius: 6, background: 'var(--green)', color: '#000', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Start Mock Test →</Link>
      </nav>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>

        {/* Alert banner */}
        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid var(--incorrect)', borderRadius: 12, padding: '16px 20px', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 20 }}>⏰</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--incorrect)', marginBottom: 2 }}>5 Days to Exam</div>
            <div style={{ fontSize: 14, color: 'var(--muted)' }}>Focus on D1–D4 (56% of exam). Take 1 mock set/day. Drill wrong answers immediately after each test. Read the NVIDIA product cheat sheet daily.</div>
          </div>
        </div>

        {/* Section 1: Exam Format */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📋 Exam Format — Memorize These</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { label: '65 Questions', sub: '90 minutes total', color: 'var(--green)' },
              { label: '83 seconds', sub: 'per question max', color: '#0ea5e9' },
              { label: '75% to pass', sub: '49/65 correct minimum', color: 'var(--warning)' },
              { label: 'Target 85%+', sub: 'buffer for exam nerves', color: 'var(--correct)' },
              { label: 'No penalty', sub: 'never leave blank', color: 'var(--muted)' },
              { label: 'ALL must be right', sub: 'multi-select: partial = 0pts', color: 'var(--incorrect)' },
            ].map(item => (
              <div key={item.label} style={{ ...cardStyle(), textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: item.color, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Time Strategy */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>⏱ Time Strategy</h2>
          <div style={{ ...cardStyle(), display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { num: '1', rule: 'Flag any question taking >90 seconds', detail: 'Move on. Come back in the final 10 minutes. A slow question costs you easy points later.' },
              { num: '2', rule: 'Domain time budget', detail: 'D1+D2: ~27 min · D3+D4: ~24 min · D5+D6: ~18 min · D7–D10: ~21 min' },
              { num: '3', rule: 'Final 10 minutes: flag review + fill all blanks', detail: 'No penalty for wrong answers. Always guess — eliminate 2 and pick from the remaining 3.' },
              { num: '4', rule: 'Multi-select: eliminate first, then pick', detail: 'Identify the 2–3 obviously wrong answers first. Correct answers come from the remaining pool.' },
            ].map(item => (
              <div key={item.num} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--green)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{item.num}</div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 3 }}>{item.rule}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)' }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: NVIDIA Product Cheat Sheet */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>🔥 NVIDIA Product Cheat Sheet</h2>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 16 }}>The most-tested NVIDIA tools. Know what each does and what makes it unique.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {nvidiaProducts.map(p => (
              <div key={p.name} style={{ ...cardStyle('rgba(118,185,0,0.25)') }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontWeight: 800, color: 'var(--green)', fontSize: 14 }}>{p.name}</span>
                  {p.full && <span style={{ fontSize: 11, color: 'var(--muted)' }}>{p.full}</span>}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text)', marginBottom: 6 }}>{p.what}</div>
                <div style={{ fontSize: 12, color: '#0ea5e9', fontStyle: 'italic' }}>★ {p.diff}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Multi-Select Strategy */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🎯 Cracking "Select TWO" Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { step: 'Step 1', title: 'Eliminate fantasy answers', color: 'var(--incorrect)', detail: 'Wrong answers often describe things that don\'t exist: "compiles Python to CUDA kernels", "scores facial sentiment in real-time", "auto fine-tunes weights at runtime". These are fabricated capabilities.' },
              { step: 'Step 2', title: 'Eliminate scope mismatches', color: 'var(--warning)', detail: 'The answer may be TRUE but about the WRONG product. A question about NeMo Guardrails will have trap answers that describe Triton or TensorRT-LLM capabilities.' },
              { step: 'Step 3', title: 'Prefer specific over generic', color: '#0ea5e9', detail: '"Token-level profiling via AgentIQ with OpenTelemetry integration" beats "monitoring". The correct answer always names the specific NVIDIA product and its mechanism.' },
              { step: 'Step 4', title: 'Watch for trap pairs', color: 'var(--warning)', detail: 'Two answers sound similar but one is wrong: "framework-agnostic instrumentation" (correct) vs "LangChain-only instrumentation" (wrong). Read the qualifier carefully.' },
            ].map(item => (
              <div key={item.step} style={{ ...cardStyle(), display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ ...badge(item.step, 'var(--surface2)', item.color), flexShrink: 0 }}>{item.step}</div>
                <div>
                  <div style={{ fontWeight: 600, color: item.color, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Domain Priority */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>📅 5-Day Domain Priority</h2>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 16 }}>D1–D4 = 56% of exam. Master these first.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {domainPriority.map(d => (
              <div key={d.d} style={{ ...cardStyle(), display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ flexShrink: 0, textAlign: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: d.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#000', fontSize: 13 }}>D{d.d}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>{d.w}%</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{d.name}</span>
                    {d.w >= 13 && <span style={{ ...badge('HIGH', 'rgba(239,68,68,0.15)', 'var(--incorrect)') }}>HIGH WEIGHT</span>}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}><strong>Topics:</strong> {d.topics}</div>
                  <div style={{ fontSize: 12, color: '#0ea5e9' }}>💡 {d.tip}</div>
                </div>
                <Link href={`/study?domain=${d.d}&scenarioOnly=true`} style={{ padding: '6px 12px', background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 6, textDecoration: 'none', fontSize: 12, fontWeight: 600, flexShrink: 0, whiteSpace: 'nowrap' }}>
                  Study D{d.d} →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', paddingTop: 8 }}>
          <Link href="/mock" style={{ padding: '14px 28px', background: 'var(--green)', color: '#000', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
            ▶ Take Mock Test
          </Link>
          <Link href="/study" style={{ padding: '14px 28px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>
            📖 Study Mode
          </Link>
          <Link href="/drill" style={{ padding: '14px 28px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>
            🎯 Drill Wrong Answers
          </Link>
        </div>
      </div>
    </div>
  );
}
