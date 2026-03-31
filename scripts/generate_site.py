#!/usr/bin/env python3
"""
NCP-AAI Study Guide — Site Generator
Converts markdown notes in notes/ into HTML topic pages in website/topics/

Usage:
    python scripts/generate_site.py
    python scripts/generate_site.py --topic transformer-architecture
"""

import os, re, json, argparse
from pathlib import Path

BASE = Path(__file__).parent.parent
NOTES_DIR = BASE / "notes"
TOPICS_DIR = BASE / "website" / "topics"
ASSETS_PREFIX = "../assets"

SIDEBAR_HTML = """
<aside class="sidebar">
  <div class="sidebar-section"><div class="sidebar-section-title">Navigation</div>
    <a class="sidebar-link" href="../index.html"><span class="link-icon">🏠</span> Home</a>
    <a class="sidebar-link" href="../resources/index.html"><span class="link-icon">📚</span> Resources</a>
    <a class="sidebar-link" href="../mock-tests/index.html"><span class="link-icon">📝</span> Mock Tests</a>
    <a class="sidebar-link" href="../graph/index.html"><span class="link-icon">🕸️</span> Knowledge Graph</a>
  </div>
  <div class="sidebar-section"><div class="sidebar-section-title">Domains</div>
    <div class="domain-group"><div class="domain-toggle">🧠 LLM Fundamentals <span class="toggle-arrow">▶</span></div>
    <div class="domain-topics">
      <a class="sidebar-link {active_transformer-architecture}" href="transformer-architecture.html">Transformer Architecture</a>
      <a class="sidebar-link {active_tokenization}" href="tokenization.html">Tokenization</a>
      <a class="sidebar-link {active_fine-tuning-lora}" href="fine-tuning-lora.html">Fine-Tuning with LoRA</a>
    </div></div>
    <div class="domain-group"><div class="domain-toggle">✍️ Prompt Engineering <span class="toggle-arrow">▶</span></div>
    <div class="domain-topics">
      <a class="sidebar-link {active_prompt-engineering}" href="prompt-engineering.html">Prompt Engineering</a>
      <a class="sidebar-link {active_chain-of-thought}" href="chain-of-thought.html">Chain-of-Thought</a>
    </div></div>
    <div class="domain-group"><div class="domain-toggle">🤖 Agentic System Design <span class="toggle-arrow">▶</span></div>
    <div class="domain-topics">
      <a class="sidebar-link {active_react-agent}" href="react-agent.html">ReAct Agent Loop</a>
      <a class="sidebar-link {active_langgraph}" href="langgraph.html">LangGraph</a>
    </div></div>
    <div class="domain-group"><div class="domain-toggle">🔧 Tool Use <span class="toggle-arrow">▶</span></div>
    <div class="domain-topics">
      <a class="sidebar-link {active_tool-use}" href="tool-use.html">Tool Use</a>
    </div></div>
    <div class="domain-group"><div class="domain-toggle">🗄️ Memory &amp; RAG <span class="toggle-arrow">▶</span></div>
    <div class="domain-topics">
      <a class="sidebar-link {active_rag-pipeline}" href="rag-pipeline.html">RAG Pipeline</a>
      <a class="sidebar-link {active_vector-databases}" href="vector-databases.html">Vector Databases</a>
    </div></div>
    <div class="domain-group"><div class="domain-toggle">👥 Multi-Agent <span class="toggle-arrow">▶</span></div>
    <div class="domain-topics">
      <a class="sidebar-link {active_multi-agent}" href="multi-agent.html">Multi-Agent Orchestration</a>
    </div></div>
    <div class="domain-group"><div class="domain-toggle">🚀 Deployment <span class="toggle-arrow">▶</span></div>
    <div class="domain-topics">
      <a class="sidebar-link {active_triton}" href="triton.html">NVIDIA Triton</a>
      <a class="sidebar-link {active_tensorrt-llm}" href="tensorrt-llm.html">TensorRT-LLM</a>
      <a class="sidebar-link {active_nvidia-nims}" href="nvidia-nims.html">NVIDIA NIMs</a>
    </div></div>
    <div class="domain-group"><div class="domain-toggle">🛡️ Safety &amp; Guardrails <span class="toggle-arrow">▶</span></div>
    <div class="domain-topics">
      <a class="sidebar-link {active_nemo-guardrails}" href="nemo-guardrails.html">NeMo Guardrails</a>
    </div></div>
  </div>
</aside>
"""

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>{title} — NCP-AAI Study Guide</title>
  <link rel="stylesheet" href="../assets/css/style.css"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"/>
</head>
<body>
<header class="topbar">
  <a class="topbar-logo" href="../index.html"><div class="logo-dot">N</div> NCP-AAI Study Guide</a>
  <div class="topbar-search"><span class="search-icon">🔍</span>
    <input type="text" id="search-input" placeholder="Search topics…"/>
    <div class="search-results" id="search-results"></div>
  </div>
  <nav class="topbar-nav">
    <a href="../index.html">Home</a>
    <a href="../resources/index.html">Resources</a>
    <a href="../mock-tests/index.html">Mock Tests</a>
  </nav>
</header>
<div class="layout">
{sidebar}
<main class="main"><div class="content">
  <div class="breadcrumb">
    <a href="../index.html">Home</a><span class="sep">›</span>
    <span>{domain}</span><span class="sep">›</span><span>{title}</span>
  </div>
  <div class="page-header">
    <div class="tags">
      <span class="tag tag-domain">{domain}</span>
      {pipeline_tag}
      {nvidia_tag}
    </div>
    <h1 class="page-title">{title}</h1>
    <p class="page-subtitle">{subtitle}</p>
  </div>
  {toc}
  {sections}
  <div class="topic-nav">
    {prev_link}
    {next_link}
  </div>
</div>
<footer class="footer">
  <span>NCP-AAI Study Guide — Open Source (MIT)</span>
  <span><a href="../index.html">← Back to Home</a></span>
</footer>
</main></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>
<script src="../assets/js/script.js"></script>
</body></html>"""

SECTION_TITLES = [
    "Definition",
    "Why It Exists",
    "How It Works (Internal)",
    "Where It Fits in the Pipeline",
    "Implementation",
    "NVIDIA Ecosystem",
    "Hands-On Lab",
    "Common Mistakes",
    "Exam Relevance"
]

def parse_frontmatter(text):
    """Parse YAML-like frontmatter from markdown."""
    meta = {}
    if not text.startswith("---"):
        return meta, text
    end = text.find("---", 3)
    if end == -1:
        return meta, text
    fm = text[3:end].strip()
    for line in fm.splitlines():
        if ":" in line:
            k, _, v = line.partition(":")
            meta[k.strip()] = v.strip()
    return meta, text[end+3:].strip()

def markdown_to_html_sections(body):
    """Convert 9-section markdown body to HTML sections."""
    # Split by ## headings
    parts = re.split(r'^## (\d+\..*)', body, flags=re.MULTILINE)
    sections_html = ""
    i = 1
    while i < len(parts):
        title = parts[i].strip().lstrip('0123456789. ')
        content = parts[i+1].strip() if i+1 < len(parts) else ""
        # Convert markdown code blocks
        content = re.sub(
            r'```(\w+)?\n(.*?)```',
            lambda m: f'<div class="code-block"><div class="code-header"><span class="lang-badge">{m.group(1) or "code"}</span><button class="copy-btn">Copy</button></div><pre><code class="language-{m.group(1) or "plaintext"}">{m.group(2)}</code></pre></div>',
            content, flags=re.DOTALL
        )
        # Convert bold
        content = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', content)
        # Convert inline code
        content = re.sub(r'`([^`]+)`', r'<code>\1</code>', content)
        # Convert paragraphs
        paragraphs = [f'<p>{p.strip()}</p>' for p in content.split('\n\n') if p.strip()]
        
        num = str(i // 2 + 1) if (i // 2 + 1) <= 9 else str(i // 2 + 1)
        sections_html += f"""
  <div class="section" id="s{i//2+1}">
    <h2 class="section-title"><span class="section-number">{i//2+1}</span>{title}</h2>
    <div class="section-content">{''.join(paragraphs)}</div>
  </div>"""
        i += 2
    return sections_html

def build_toc(sections_html):
    """Build table of contents from sections."""
    items = ""
    for i, title in enumerate(SECTION_TITLES, 1):
        items += f'<li><a href="#s{i}"><span class="toc-num">{i}</span> {title}</a></li>\n'
    return f'<div class="toc"><div class="toc-title">Table of Contents</div><ul class="toc-list">{items}</ul></div>'

def build_sidebar(active_slug):
    """Build sidebar HTML with active link marked."""
    sidebar = SIDEBAR_HTML
    # Replace all {active_*} placeholders
    sidebar = re.sub(r'\{active_([^}]+)\}', lambda m: 'active' if m.group(1) == active_slug else '', sidebar)
    return sidebar

def process_note(note_path):
    """Process a single markdown note file into an HTML page."""
    slug = note_path.stem
    text = note_path.read_text(encoding='utf-8')
    meta, body = parse_frontmatter(text)
    
    title = meta.get('title', slug.replace('-', ' ').title())
    domain = meta.get('domain', 'LLM Fundamentals')
    pipeline = meta.get('pipeline', '')
    nvidia = meta.get('nvidia', '')
    subtitle = meta.get('subtitle', f'A comprehensive guide to {title} for the NCP-AAI certification.')
    
    pipeline_tag = f'<span class="tag tag-pipeline">Pipeline: {pipeline}</span>' if pipeline else ''
    nvidia_tag = f'<span class="tag tag-nvidia">NVIDIA: {nvidia}</span>' if nvidia else ''
    
    sections_html = markdown_to_html_sections(body)
    toc = build_toc(sections_html)
    sidebar = build_sidebar(slug)
    
    html = HTML_TEMPLATE.format(
        title=title,
        domain=domain,
        pipeline_tag=pipeline_tag,
        nvidia_tag=nvidia_tag,
        subtitle=subtitle,
        toc=toc,
        sections=sections_html,
        sidebar=sidebar,
        prev_link='',
        next_link=''
    )
    
    output_path = TOPICS_DIR / f"{slug}.html"
    output_path.write_text(html, encoding='utf-8')
    print(f"  ✓ Generated: {output_path.name}")
    return slug

def main():
    parser = argparse.ArgumentParser(description='Generate NCP-AAI website from markdown notes')
    parser.add_argument('--topic', help='Generate only a specific topic slug')
    parser.add_argument('--list', action='store_true', help='List all notes found')
    args = parser.parse_args()
    
    if not NOTES_DIR.exists():
        print(f"Notes directory not found: {NOTES_DIR}")
        print("Create notes in notes/<domain>/<topic-slug>.md using the 9-section template.")
        return
    
    note_files = list(NOTES_DIR.rglob("*.md"))
    
    if args.list:
        print(f"Found {len(note_files)} notes:")
        for f in note_files:
            print(f"  {f.relative_to(BASE)}")
        return
    
    if args.topic:
        note_files = [f for f in note_files if f.stem == args.topic]
        if not note_files:
            print(f"No note found for topic: {args.topic}")
            return
    
    if not note_files:
        print("No notes found. Write notes in notes/<domain>/<topic>.md first.")
        return
    
    TOPICS_DIR.mkdir(parents=True, exist_ok=True)
    print(f"\nGenerating {len(note_files)} topic pages...")
    for note in note_files:
        process_note(note)
    
    print(f"\n✅ Done! {len(note_files)} pages generated in {TOPICS_DIR}")
    print("\nNext: open website/index.html in a browser or push to GitHub Pages.")

if __name__ == '__main__':
    main()
