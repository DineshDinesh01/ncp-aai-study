# CLAUDE Code Write-Up: `ncp-aai-study`

Last updated: 2026-03-27

## 1) Project summary

This repository is a static study website for the NVIDIA NCP-AAI certification.

It has two core parts:

1. A prebuilt static site in `website/` (HTML + CSS + JS, no Node build pipeline).
2. A Python generator in `scripts/generate_site.py` that converts markdown notes from `notes/` into topic pages under `website/topics/`.

The site includes:

- home page with roadmap + domain cards
- 8 domain overview pages
- topic pages (some fully authored, some placeholders)
- free resources page
- interactive mock test page (timer, filtering, scoring)
- D3 knowledge graph page

## 2) Runtime architecture

## 2.1 Static runtime

- All pages are static HTML.
- Shared styling is in `website/assets/css/style.css`.
- Shared behavior is in `website/assets/js/script.js`.
- Some pages add inline page-specific JavaScript:
  - `website/mock-tests/index.html` (timer/filter/score logic)
  - `website/graph/index.html` (D3 force graph rendering)

## 2.2 Generator runtime

`scripts/generate_site.py`:

- scans `notes/**/*.md`
- parses frontmatter (`title`, `domain`, `pipeline`, `nvidia`, `subtitle`)
- splits content using `## 1. ...` style headings
- converts simple markdown to HTML (code fences, bold, inline code, paragraphs)
- writes topic pages to `website/topics/<slug>.html`

CLI options:

- `--list` lists note files
- `--topic <slug>` generates one topic
- no argument generates all notes

## 2.3 Source-of-truth behavior

- The current live site content is mostly hand-authored HTML under `website/`.
- The Python generator is available, but the tracked `notes/` directory is currently empty.
- `data/`, `labs/`, and `website/labs/` are currently scaffolding directories with no tracked files.

## 3) File-by-file inventory

## 3.1 Root files

| File | Purpose |
|---|---|
| `.gitignore` | Ignores Python cache/artifacts, `.env`, local Chroma DB, notebook checkpoints. |
| `README.md` | Main project doc: setup, architecture, study workflow, generator usage, deployment guidance. |
| `CONTRIBUTING.md` | Contributor workflow for adding topics and mock-test questions. |
| `LICENSE` | MIT license. |

## 3.2 Script

| File | Purpose |
|---|---|
| `scripts/generate_site.py` | Markdown-to-topic-page generator with built-in sidebar/template/toc rendering. |

## 3.3 Shared assets

| File | Purpose |
|---|---|
| `website/assets/css/style.css` | Global design system (variables, layout, sidebar, cards, code blocks, quiz, responsive rules). |
| `website/assets/js/script.js` | Global client behavior: search, sidebar toggles, copy buttons, quiz checks, checklist persistence, progress bar animation, mobile sidebar toggle. |

## 3.4 Top-level website pages

| File | Purpose |
|---|---|
| `website/index.html` | Main landing page with 15-week roadmap, exam-domain cards, progress bars, checklist, and pipeline overview. |
| `website/resources/index.html` | Curated free resources grouped by NVIDIA resources, courses, docs, repos, and mock-test sources. |
| `website/mock-tests/index.html` | Interactive 15-question test with domain filters, per-question feedback, timer, and domain-level score breakdown. |
| `website/graph/index.html` | D3 force-directed graph of topics with domain color legend and click-through navigation to topic pages. |

## 3.5 Domain overview pages

| File | Purpose |
|---|---|
| `website/domains/llm-fundamentals.html` | Domain 1 overview (transformers, tokenization, LoRA) with study order and exam tips. |
| `website/domains/prompt-engineering.html` | Domain 2 overview with prompting technique comparison and exam focus notes. |
| `website/domains/agentic-system-design.html` | Domain 3 overview emphasizing ReAct + LangGraph and routing/looping patterns. |
| `website/domains/tool-use.html` | Domain 4 overview centered on function-calling schemas and tool execution model. |
| `website/domains/memory-rag.html` | Domain 5 overview on memory types, RAG pipeline, and retrieval tuning. |
| `website/domains/multi-agent.html` | Domain 6 overview of multi-agent patterns and framework comparison. |
| `website/domains/deployment.html` | Domain 7 overview of NVIDIA deployment stack (TensorRT-LLM, NIMs, Triton). |
| `website/domains/safety-guardrails.html` | Domain 8 overview of rail types, Colang concepts, and safety exam topics. |

## 3.6 Topic pages (fully authored)

| File | Purpose |
|---|---|
| `website/topics/transformer-architecture.html` | Deep long-form topic with architecture internals, formulas, code, lab steps, and exam glossary. |
| `website/topics/langgraph.html` | Deep long-form topic on stateful graph orchestration, conditional routing, checkpointing, labs, and exam prep. |
| `website/topics/react-agent.html` | 9-section ReAct walkthrough with examples and LangChain/NIM integration snippets. |
| `website/topics/tool-use.html` | 9-section function-calling topic with schema examples, LangChain tools, and NIM API usage. |
| `website/topics/rag-pipeline.html` | 9-section RAG topic with chunking/embedding/retrieval pipeline and LlamaIndex examples. |
| `website/topics/nemo-guardrails.html` | 9-section NeMo Guardrails topic with rail types, Colang examples, and implementation flow. |

## 3.7 Topic pages (placeholder stubs)

These pages currently contain a lightweight template and a "Study This Topic" callout, not full 9-section authored content:

| File | Purpose |
|---|---|
| `website/topics/tokenization.html` | Placeholder topic page. |
| `website/topics/fine-tuning-lora.html` | Placeholder topic page. |
| `website/topics/prompt-engineering.html` | Placeholder topic page. |
| `website/topics/chain-of-thought.html` | Placeholder topic page. |
| `website/topics/vector-databases.html` | Placeholder topic page. |
| `website/topics/multi-agent.html` | Placeholder topic page. |
| `website/topics/triton.html` | Placeholder topic page. |
| `website/topics/tensorrt-llm.html` | Placeholder topic page. |
| `website/topics/nvidia-nims.html` | Placeholder topic page. |

## 4) Key implementation mechanics

## 4.1 Global JS responsibilities (`website/assets/js/script.js`)

- Search over a hard-coded `searchIndex` array.
- Sidebar expand/collapse and auto-open around active page.
- "Copy" button handling for code blocks.
- Generic quiz interaction for `.quiz-question` blocks.
- Checklist state via `localStorage` keys (`check_<id>`).
- Active sidebar-link detection using current pathname.
- IntersectionObserver animation for progress bars.
- Mobile sidebar toggle support.

## 4.2 Mock test page behavior

`website/mock-tests/index.html` has inline JS for:

- 90-minute countdown timer with pause/resume.
- Domain-based question filtering.
- Per-question correctness marking.
- Submission scoring with both total and per-domain percentages.

## 4.3 Knowledge graph behavior

`website/graph/index.html` has inline D3 logic for:

- static node/link arrays
- force simulation (link, charge, center, collide)
- drag interactions
- zoom/pan
- tooltip + click-to-open topic page

## 4.4 Generator constraints (`scripts/generate_site.py`)

- Frontmatter parser is lightweight and not full YAML.
- Markdown conversion is minimal (not full markdown spec).
- Sidebar entries are hard-coded in script template.
- Table-of-contents titles are fixed to the standard 9 section names.
- `prev_link` and `next_link` are currently left empty in generated output.

## 5) Known inconsistencies and maintenance risks

## 5.1 Missing page references

Two places reference `../topics/nemo-toolkit.html`, but that file is not present:

- `website/assets/js/script.js`
- `website/domains/deployment.html`

## 5.2 Manual sync points when adding topics

Adding a new topic currently requires updating multiple places manually:

- create/update `website/topics/<topic>.html` or generate from `notes/`
- update `website/assets/js/script.js` `searchIndex`
- update relevant domain page cards/sidebar links
- optionally update home page/domain cards if surfaced there
- optionally update graph nodes/links

## 5.3 Content maturity split

The repo mixes:

- fully authored deep topic pages
- generated or hand-made placeholder stubs

This is intentional for progressive build-out, but it means user experience differs strongly by topic.

## 6) How to extend this repo safely

Recommended sequence for new topic work:

1. Write note in `notes/<domain>/<topic>.md` using the 9-section template.
2. Run `python3 scripts/generate_site.py --topic <slug>`.
3. Verify generated output in `website/topics/<slug>.html`.
4. Add the topic to `website/assets/js/script.js` `searchIndex`.
5. Add link/card entry in the appropriate domain page.
6. If relevant, add node/link in `website/graph/index.html`.
7. Manually click-test navigation from home, domain page, search dropdown, and graph.

## 7) Quick orientation for a new coding agent

If you are entering this repo fresh:

- Treat `website/` as the product.
- Treat `scripts/generate_site.py` as content tooling.
- Assume no backend, no bundler, no transpilation.
- Prefer small HTML/CSS/JS edits over framework rewrites.
- Keep sidebar/search/domain/topic links synchronized manually.
- Check for placeholder topic pages before claiming a topic is fully implemented.

