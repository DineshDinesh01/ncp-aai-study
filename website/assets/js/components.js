class SiteHeader extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute('basepath') || '.';
    const active = this.getAttribute('active') || 'home';
    
    this.innerHTML = `
      <header class="topbar">
        <button id="menu-toggle" class="menu-toggle" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
        <a class="topbar-logo" href="${base}/index.html">
          <div class="logo-dot">N</div>
          NCP-AAI Study Guide
        </a>
        <div class="topbar-search">
          <span class="search-icon">🔍</span>
          <input type="text" id="search-input" placeholder="Search topics, tools, concepts…"/>
          <div class="search-results" id="search-results"></div>
        </div>
        <nav class="topbar-nav">
          <a href="${base}/index.html" class="${active==='home'?'active':''}"><span class="link-icon">🏠</span> Home</a>
          <a href="${base}/labs/index.html" class="${active==='labs'?'active':''}"><span class="link-icon">🔬</span> Labs</a>
          <a href="${base}/playground/index.html" class="${active==='playground'?'active':''}"><span class="link-icon">⚡</span> Playground</a>
          <a href="${base}/resources/index.html" class="${active==='resources'?'active':''}">Resources</a>
          <a href="${base}/notes/index.html" class="${active==='notes'?'active':''}"><span class="link-icon">📝</span> Notes</a>
          <a href="${base}/mock-tests/index.html" class="${active==='mock'?'active':''}">Mock Tests</a>
          <a href="${base}/graph/index.html" class="${active==='graph'?'active':''}">Graph</a>
        </nav>
      </header>
    `;
    // Register Service Worker and Manifest for PWA Support
    if ('serviceWorker' in navigator) {
      // Don't use window.addEventListener('load') here because components might load after window load
      navigator.serviceWorker.register(`${base}/sw.js`)
        .then(registration => console.log('PWA Service Worker registered with scope:', registration.scope))
        .catch(err => console.log('SW registration failed:', err));
    }
    
    if (!document.querySelector('link[rel="manifest"]')) {
      const manifestLink = document.createElement('link');
      manifestLink.rel = 'manifest';
      manifestLink.href = `${base}/manifest.json`;
      document.head.appendChild(manifestLink);
    }
  }
}

class SiteSidebar extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute('basepath') || '.';
    const activeRaw = this.getAttribute('active') || '';
    
    // Quick helper to mark active links
    const isAct = (path) => activeRaw === path ? 'active' : '';

    this.innerHTML = `
      <aside class="sidebar">
        <div class="sidebar-section">
          <div class="sidebar-section-title">Navigation</div>
          <a class="sidebar-link ${isAct('home')}" href="${base}/index.html"><span class="link-icon">🏠</span> Home</a>
          <a class="sidebar-link ${isAct('labs')}" href="${base}/labs/index.html"><span class="link-icon">🔬</span> Hands-On Labs</a>
          <a class="sidebar-link ${isAct('playground')}" href="${base}/playground/index.html"><span class="link-icon">⚡</span> Playground</a>
          <a class="sidebar-link ${isAct('resources')}" href="${base}/resources/index.html"><span class="link-icon">📚</span> Free Resources</a>
          <a class="sidebar-link ${isAct('notes')}" href="${base}/notes/index.html"><span class="link-icon">📝</span> My Write-ups</a>
          <a class="sidebar-link ${isAct('mock')}" href="${base}/mock-tests/index.html"><span class="link-icon">✅</span> Mock Tests</a>
          <a class="sidebar-link ${isAct('graph')}" href="${base}/graph/index.html"><span class="link-icon">🕸️</span> Knowledge Graph</a>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-section-title">Exam Domains</div>

          <div class="domain-group">
            <div class="domain-toggle">🤖 Agent Architecture & Design <span class="toggle-arrow">▶</span></div>
            <div class="domain-topics">
              <a class="sidebar-link ${isAct('react-agent')}" href="${base}/topics/react-agent.html">ReAct Agent Loop</a>
              <a class="sidebar-link ${isAct('langgraph')}" href="${base}/topics/langgraph.html">LangGraph</a>
              <a class="sidebar-link ${isAct('crewai')}" href="${base}/topics/crewai.html">CrewAI</a>
              <a class="sidebar-link ${isAct('autogen')}" href="${base}/topics/autogen.html">AutoGen</a>
              <a class="sidebar-link ${isAct('multi-agent')}" href="${base}/topics/multi-agent.html">Multi-Agent Orchestration</a>
            </div>
          </div>

          <div class="domain-group">
            <div class="domain-toggle">🔧 Agent Development <span class="toggle-arrow">▶</span></div>
            <div class="domain-topics">
              <a class="sidebar-link ${isAct('tool-use')}" href="${base}/topics/tool-use.html">Tool Use & Function Calling</a>
              <a class="sidebar-link ${isAct('agent-error-handling')}" href="${base}/topics/agent-error-handling.html">Production Error Handling</a>
              <a class="sidebar-link ${isAct('transformer-architecture')}" href="${base}/topics/transformer-architecture.html">Transformer Architecture</a>
              <a class="sidebar-link ${isAct('tokenization')}" href="${base}/topics/tokenization.html">Tokenization</a>
            </div>
          </div>

          <div class="domain-group">
            <div class="domain-toggle">📊 Evaluation & Tuning <span class="toggle-arrow">▶</span></div>
            <div class="domain-topics">
              <a class="sidebar-link ${isAct('agent-evaluation')}" href="${base}/topics/agent-evaluation.html">Agent Evaluation & RAGAS</a>
              <a class="sidebar-link ${isAct('fine-tuning-lora')}" href="${base}/topics/fine-tuning-lora.html">Fine-Tuning with LoRA</a>
            </div>
          </div>

          <div class="domain-group">
            <div class="domain-toggle">🚀 Deployment & Scaling <span class="toggle-arrow">▶</span></div>
            <div class="domain-topics">
              <a class="sidebar-link ${isAct('triton')}" href="${base}/topics/triton.html">NVIDIA Triton</a>
              <a class="sidebar-link ${isAct('tensorrt-llm')}" href="${base}/topics/tensorrt-llm.html">TensorRT-LLM</a>
              <a class="sidebar-link ${isAct('nvidia-nims')}" href="${base}/topics/nvidia-nims.html">NVIDIA NIMs</a>
            </div>
          </div>

          <div class="domain-group">
            <div class="domain-toggle">🧠 Cognition, Planning & Memory <span class="toggle-arrow">▶</span></div>
            <div class="domain-topics">
              <a class="sidebar-link ${isAct('prompt-engineering')}" href="${base}/topics/prompt-engineering.html">Prompt Engineering</a>
              <a class="sidebar-link ${isAct('chain-of-thought')}" href="${base}/topics/chain-of-thought.html">Chain-of-Thought & Planning</a>
            </div>
          </div>

          <div class="domain-group">
            <div class="domain-toggle">🗄️ Knowledge Integration & RAG <span class="toggle-arrow">▶</span></div>
            <div class="domain-topics">
              <a class="sidebar-link ${isAct('rag-pipeline')}" href="${base}/topics/rag-pipeline.html">RAG Pipeline</a>
              <a class="sidebar-link ${isAct('vector-databases')}" href="${base}/topics/vector-databases.html">Vector Databases</a>
            </div>
          </div>

          <div class="domain-group">
            <div class="domain-toggle">⬡ NVIDIA Platform <span class="toggle-arrow">▶</span></div>
            <div class="domain-topics">
              <a class="sidebar-link ${isAct('nemo-toolkit')}" href="${base}/topics/nemo-toolkit.html">NeMo Toolkit</a>
              <a class="sidebar-link ${isAct('nvidia-nims')}" href="${base}/topics/nvidia-nims.html">NVIDIA NIMs</a>
              <a class="sidebar-link ${isAct('agentiq')}" href="${base}/topics/agentiq.html">NVIDIA AgentIQ</a>
            </div>
          </div>

          <div class="domain-group">
            <div class="domain-toggle">🛡️ Safety & Compliance <span class="toggle-arrow">▶</span></div>
            <div class="domain-topics">
              <a class="sidebar-link ${isAct('nemo-guardrails')}" href="${base}/topics/nemo-guardrails.html">NeMo Guardrails</a>
            </div>
          </div>

          <div class="domain-group">
            <div class="domain-toggle">👤 Human-AI Interaction <span class="toggle-arrow">▶</span></div>
            <div class="domain-topics">
              <a class="sidebar-link ${isAct('hitl-oversight')}" href="${base}/topics/hitl-oversight.html">HITL & Oversight</a>
            </div>
          </div>

          <div class="domain-group">
            <div class="domain-toggle">📡 Run, Monitor & Maintain <span class="toggle-arrow">▶</span></div>
            <div class="domain-topics">
              <a class="sidebar-link ${isAct('agent-observability')}" href="${base}/topics/agent-observability.html">Agent Observability</a>
            </div>
          </div>
        </div>
      </aside>
    `;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute('basepath') || '.';
    this.innerHTML = `
      <footer class="footer">
        <span>NCP-AAI Study Guide — Open Source</span>
        <span><a href="${base}/index.html">← Back to Home</a></span>
      </footer>
    `;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-sidebar', SiteSidebar);
customElements.define('site-footer', SiteFooter);
