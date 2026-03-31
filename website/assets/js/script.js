// NCP-AAI Study Guide — Main JavaScript

// ─── SEARCH (dynamic from topics.json with fallback) ────────────────────────
let searchIndex = [];

async function loadTopics() {
  const candidates = [
    "assets/data/topics.json",
    "../assets/data/topics.json",
    "../../assets/data/topics.json"
  ];
  for (const url of candidates) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        searchIndex = await res.json();
        return;
      }
    } catch (_) {
      // continue to next candidate
    }
  }
  // Fallback to a baked-in list if fetch fails (e.g., opened via file://)
  searchIndex = [
    { title: "Transformer Architecture", domain: "LLM Fundamentals", path: "topics/transformer-architecture.html" },
    { title: "Tokenization", domain: "LLM Fundamentals", path: "topics/tokenization.html" },
    { title: "Fine-Tuning with LoRA", domain: "Evaluation & Tuning", path: "topics/fine-tuning-lora.html" },
    { title: "Prompt Engineering", domain: "Cognition & Planning", path: "topics/prompt-engineering.html" },
    { title: "Chain-of-Thought Prompting", domain: "Cognition & Planning", path: "topics/chain-of-thought.html" },
    { title: "ReAct Agent Loop", domain: "Agent Architecture & Design", path: "topics/react-agent.html" },
    { title: "LangGraph Stateful Agents", domain: "Agent Architecture & Design", path: "topics/langgraph.html" },
    { title: "Tool Use & Function Calling", domain: "Agent Development", path: "topics/tool-use.html" },
    { title: "RAG Pipeline", domain: "Knowledge Integration", path: "topics/rag-pipeline.html" },
    { title: "Vector Databases", domain: "Knowledge Integration", path: "topics/vector-databases.html" },
    { title: "Multi-Agent Orchestration", domain: "Agent Architecture & Design", path: "topics/multi-agent.html" },
    { title: "NVIDIA Triton Inference Server", domain: "Deployment & Scaling", path: "topics/triton.html" },
    { title: "TensorRT-LLM", domain: "Deployment & Scaling", path: "topics/tensorrt-llm.html" },
    { title: "NeMo Guardrails", domain: "Safety, Ethics & Compliance", path: "topics/nemo-guardrails.html" },
    { title: "NeMo Toolkit", domain: "NVIDIA Platform Implementation", path: "topics/nemo-toolkit.html" },
    { title: "NVIDIA NIMs", domain: "NVIDIA Platform Implementation", path: "topics/nvidia-nims.html" },
    { title: "Agent Evaluation & Tuning", domain: "Evaluation & Tuning", path: "topics/agent-evaluation.html" },
    { title: "Human-AI Interaction & HITL", domain: "Human-AI Interaction", path: "topics/hitl-oversight.html" },
    { title: "Agent Observability", domain: "Run, Monitor & Maintain", path: "topics/agent-observability.html" },
    { title: "CrewAI", domain: "Agent Architecture & Design", path: "topics/crewai.html" },
    { title: "AutoGen", domain: "Agent Architecture & Design", path: "topics/autogen.html" },
    { title: "NVIDIA AgentIQ", domain: "NVIDIA Platform Implementation", path: "topics/agentiq.html" },
    { title: "Production Agent Error Handling", domain: "Agent Development", path: "topics/agent-error-handling.html" },
  ];
}

function resolveTopicHref(pathOrUrl) {
  const path = pathOrUrl || "";
  const inSubdir = window.location.pathname.includes("/topics/") ||
                   window.location.pathname.includes("/domains/") ||
                   window.location.pathname.includes("/resources/") ||
                   window.location.pathname.includes("/mock-tests/") ||
                   window.location.pathname.includes("/graph/") ||
                   window.location.pathname.includes("/labs/") ||
                   window.location.pathname.includes("/playground/");
  const prefix = inSubdir ? "../" : "";
  return prefix + path;
}

function initSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { results.classList.remove('active'); return; }

    const matches = searchIndex.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.domain.toLowerCase().includes(q)
    ).slice(0, 6);

    if (!matches.length) { results.classList.remove('active'); return; }

    results.innerHTML = matches.map(item => `
      <a class="search-result-item" href="${resolveTopicHref(item.path || item.url)}">
        <span class="result-tag">${item.domain}</span>
        <span>${item.title}</span>
      </a>
    `).join('');
    results.classList.add('active');
  });

  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.classList.remove('active');
    }
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') results.classList.remove('active');
  });
}

// ─── SIDEBAR DOMAIN TOGGLES ──────────────────────────────────────────────────
function initSidebarToggles() {
  document.querySelectorAll('.domain-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const topics = toggle.nextElementSibling;
      toggle.classList.toggle('open');
      topics.classList.toggle('open');
    });
  });
  // Auto-open active domain
  const activeLink = document.querySelector('.domain-topics .sidebar-link.active');
  if (activeLink) {
    const topics = activeLink.closest('.domain-topics');
    const toggle = topics.previousElementSibling;
    topics.classList.add('open');
    toggle.classList.add('open');
  }
}

// ─── COPY CODE BUTTONS ───────────────────────────────────────────────────────
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-block').querySelector('pre');
      navigator.clipboard.writeText(pre.innerText).then(() => {
        btn.textContent = '✓ Copied';
        setTimeout(() => btn.textContent = 'Copy', 2000);
      });
    });
  });
}

// ─── QUIZ COMPONENT ──────────────────────────────────────────────────────────
function initQuiz() {
  document.querySelectorAll('.quiz-question').forEach(q => {
    const options = q.querySelectorAll('.quiz-option');
    const checkBtn = q.querySelector('.quiz-check-btn');
    const feedback = q.querySelector('.quiz-feedback');
    const correct = q.dataset.answer;
    let selected = null;

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selected = opt.dataset.value;
      });
    });

    if (checkBtn) {
      checkBtn.addEventListener('click', () => {
        if (!selected) return;
        options.forEach(opt => {
          if (opt.dataset.value === correct) opt.classList.add('correct');
          else if (opt.dataset.value === selected) opt.classList.add('wrong');
        });
        feedback.classList.add('show');
        feedback.classList.add(selected === correct ? 'correct-fb' : 'wrong-fb');
        checkBtn.disabled = true;
      });
    }
  });
}

// ─── CHECKLIST PERSISTENCE ───────────────────────────────────────────────────
function initChecklist() {
  document.querySelectorAll('.check').forEach(check => {
    const key = 'check_' + check.dataset.id;
    if (localStorage.getItem(key) === 'done') {
      check.classList.add('done');
      check.textContent = '✓';
    }
    check.addEventListener('click', () => {
      if (check.classList.toggle('done')) {
        check.textContent = '✓';
        localStorage.setItem(key, 'done');
      } else {
        check.textContent = '';
        localStorage.removeItem(key);
      }
    });
  });
}

// ─── ACTIVE SIDEBAR LINK ─────────────────────────────────────────────────────
function setActiveSidebarLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.sidebar-link').forEach(link => {
    if (link.href && link.href.includes(path.split('/').pop())) {
      link.classList.add('active');
    }
  });
}

// ─── PROGRESS BARS ANIMATION ─────────────────────────────────────────────────
function animateProgressBars() {
  const bars = document.querySelectorAll('.progress-bar-fill, .card-progress-bar');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width || entry.target.style.width;
      }
    });
  });
  bars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    bar.dataset.width = width;
    observer.observe(bar);
  });
}

// ─── MOBILE SIDEBAR TOGGLE ───────────────────────────────────────────────────
function initMobileSidebar() {
  const btn = document.getElementById('menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (btn && sidebar) {
    btn.addEventListener('click', () => sidebar.classList.toggle('open'));
  }
  // Close sidebar when clicking outside
  document.addEventListener('click', e => {
    if (sidebar && sidebar.classList.contains('open')) {
      if (!sidebar.contains(e.target) && !btn.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    }
  });
}

// ─── TOPIC VISIT TRACKING (localStorage progress) ────────────────────────────
const DOMAIN_TOPICS = {
  'llm':        ['transformer-architecture', 'tokenization', 'fine-tuning-lora'],
  'prompt':     ['prompt-engineering', 'chain-of-thought'],
  'agentic':    ['react-agent', 'langgraph', 'crewai', 'autogen', 'multi-agent'],
  'tools':      ['tool-use', 'agent-error-handling'],
  'rag':        ['rag-pipeline', 'vector-databases'],
  'deploy':     ['triton', 'tensorrt-llm', 'nvidia-nims', 'nemo-toolkit'],
  'safety':     ['nemo-guardrails'],
  'evaluation': ['agent-evaluation', 'fine-tuning-lora'],
  'hitl':       ['hitl-oversight'],
  'monitor':    ['agent-observability'],
  'nvidia':     ['agentiq', 'nemo-toolkit'],
};

function trackTopicVisit() {
  if (!window.location.pathname.includes('/topics/')) return;
  const slug = window.location.pathname.split('/').pop().replace('.html', '');
  // Mark as visited after 15 seconds of reading
  setTimeout(() => {
    localStorage.setItem('visited_' + slug, 'true');
    // Pulse the sidebar link if present
    const link = document.querySelector(`.sidebar-link[href="${slug}.html"]`);
    if (link) link.style.color = 'var(--nvidia-green)';
  }, 15000);
}

function computeDomainProgress() {
  for (const [key, slugs] of Object.entries(DOMAIN_TOPICS)) {
    const visited = slugs.filter(s => localStorage.getItem('visited_' + s)).length;
    const pct = Math.round((visited / slugs.length) * 100);
    // Update progress section bars
    const barEl = document.querySelector(`[data-domain="${key}"] .progress-bar-fill`);
    const pctEl = document.querySelector(`[data-domain="${key}"] .progress-pct`);
    if (barEl) { barEl.style.width = pct + '%'; barEl.dataset.width = pct + '%'; }
    if (pctEl) { pctEl.textContent = pct + '%'; }
    // Update card progress bars
    const cardBar = document.querySelector(`[data-domain-card="${key}"] .card-progress-bar`);
    if (cardBar) { cardBar.style.width = pct + '%'; }
  }
}

function initResetProgress() {
  const btn = document.getElementById('reset-progress');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (!confirm('Reset all your reading progress?')) return;
    Object.values(DOMAIN_TOPICS).flat().forEach(slug => {
      localStorage.removeItem('visited_' + slug);
    });
    computeDomainProgress();
  });
}

// ─── INIT ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadTopics().finally(initSearch);
  initSidebarToggles();
  initCopyButtons();
  initQuiz();
  initChecklist();
  setActiveSidebarLink();
  animateProgressBars();
  initMobileSidebar();
  trackTopicVisit();
  computeDomainProgress();
  initResetProgress();
});
