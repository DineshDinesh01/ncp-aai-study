# NCP-AAI Study Guide

Open-source study system for the **NVIDIA-Certified Professional: Agentic AI (NCP-AAI)** certification.

Every resource listed is **free**. No paywall. No credit card required.

---

## What Is This?

A complete self-study kit that includes:

- A **knowledge website** covering all 8 exam domains with full explanations, code examples, and labs
- An **interactive mock test** with 15 practice questions, a timer, and domain-level scoring
- A **D3.js knowledge graph** showing how topics connect
- A **15-week study plan** with free courses, hands-on drills, and evaluation criteria
- A **site generator script** so you can write your own notes and publish them to the website

---

## Prerequisites

You need the following installed before running anything:

- **Python 3.10+** — [python.org/downloads](https://www.python.org/downloads/)
- **Git** — [git-scm.com](https://git-scm.com/)
- A modern browser (Chrome, Firefox, Edge)

No Node.js. No build step. The website is plain HTML + CSS + JS.

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/ncp-aai-study.git
cd ncp-aai-study
```

### 2. Open the website

The website is static HTML — just open it in a browser.

**Option A — Direct open (simplest):**
```bash
# macOS
open website/index.html

# Linux
xdg-open website/index.html

# Windows
start website/index.html
```

**Option B — Local server (recommended, avoids browser CORS issues):**
```bash
python3 -m http.server 8080 --directory website
```
Then go to: `http://localhost:8080`

### 3. Get free NVIDIA NIM API credits (for labs)

Sign up at [build.nvidia.com](https://build.nvidia.com) — you get 1000 free credits to call hosted AI models. No credit card needed.

Set your key in a `.env` file (never commit this):
```bash
cp .env.example .env
# Edit .env and add: NVIDIA_API_KEY=nvapi-your-key-here
```

---

## Repo Structure

```
ncp-aai-study/
├── website/                        ← The knowledge website (open index.html)
│   ├── index.html                  ← Home page: 15-week roadmap + domain cards
│   ├── assets/
│   │   ├── css/style.css           ← Dark NVIDIA-themed stylesheet
│   │   └── js/script.js            ← Search, quiz, sidebar, checklist
│   ├── domains/                    ← 8 domain overview pages
│   │   ├── llm-fundamentals.html
│   │   ├── prompt-engineering.html
│   │   ├── agentic-system-design.html
│   │   ├── tool-use.html
│   │   ├── memory-rag.html
│   │   ├── multi-agent.html
│   │   ├── deployment.html
│   │   └── safety-guardrails.html
│   ├── topics/                     ← 13 topic pages (full 9-section content)
│   │   ├── transformer-architecture.html
│   │   ├── langgraph.html
│   │   ├── rag-pipeline.html
│   │   ├── tool-use.html
│   │   ├── react-agent.html
│   │   ├── nemo-guardrails.html
│   │   └── ...                     ← + 7 stub pages (study content coming soon)
│   ├── resources/index.html        ← Curated free courses, docs, GitHub repos
│   ├── mock-tests/index.html       ← 15 interactive questions with timer + scoring
│   └── graph/index.html            ← D3.js knowledge graph (click to navigate)
│
├── notes/                          ← Write your own study notes here
│   └── <domain>/<topic>.md         ← One markdown file per topic
│
├── data/                           ← JSON data files
│   ├── topics.json                 ← Master topic list
│   ├── resources.json              ← Curated resources
│   ├── gap_matrix.json             ← Your skill self-assessment
│   ├── question_bank.json          ← Your practice questions
│   └── mock_test_results.json      ← Track your mock test scores
│
├── labs/                           ← Hands-on lab notebooks (Google Colab ready)
│   └── lab-001-*/                  ← One folder per lab
│
├── scripts/
│   └── generate_site.py            ← Auto-generate HTML pages from your notes
│
├── .env.example                    ← Template for API keys (copy to .env)
├── CONTRIBUTING.md                 ← How to add topics, questions, or labs
├── LICENSE                         ← MIT
└── README.md                       ← You are here
```

---

## Writing Your Own Study Notes

Create a markdown file in `notes/<domain-slug>/<topic-slug>.md`. Use this template:

```markdown
---
title: Your Topic Name
domain: LLM Fundamentals
pipeline: LLM Core
nvidia: NeMo Toolkit
subtitle: One-line description of this topic
---

## 1. Definition
What is it? Write 1–2 plain-English paragraphs.

## 2. Why It Exists
What problem does it solve?

## 3. How It Works (Internal)
Step-by-step mechanism.

## 4. Where It Fits in the Pipeline
Show its position in the data/agent flow.

## 5. Implementation
Working Python code example.

## 6. NVIDIA Ecosystem
Which NVIDIA tool handles this? How do you use it?

## 7. Hands-On Lab
A concrete exercise you can do in under 30 minutes.

## 8. Common Mistakes
Top 3–5 beginner mistakes and how to fix them.

## 9. Exam Relevance
Key terms, question types, sample question.
```

Then run the generator to publish it to the website:

```bash
python3 scripts/generate_site.py
```

To generate a single topic:
```bash
python3 scripts/generate_site.py --topic transformer-architecture
```

To list all available notes:
```bash
python3 scripts/generate_site.py --list
```

---

## Running the Mock Test

Open `website/mock-tests/index.html` in your browser.

- Click **Start Timer** to begin the 90-minute countdown
- Filter questions by domain using the buttons at the top
- Select an answer and click **Check Answer** to see immediate feedback
- Click **Submit Test** at the end to see your domain-by-domain score breakdown

---

## Deploying to GitHub Pages (Free Hosting)

Make your study site publicly accessible:

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial release"
git push origin main

# 2. Deploy the website folder to GitHub Pages
git subtree push --prefix website origin gh-pages
```

Your site will be live at:
```
https://<your-username>.github.io/ncp-aai-study/
```

If the `gh-pages` branch already exists and you want to force-push it:
```bash
git push origin `git subtree split --prefix website main`:gh-pages --force
```

---

## Free Resources to Start With

| Course | Platform | What You'll Learn |
|--------|----------|-------------------|
| HuggingFace AI Agents Course | HuggingFace | Agents from beginner to expert — earns a free certificate |
| Agentic AI (Andrew Ng) | DeepLearning.AI | Building agentic workflows step by step |
| AI Agents in LangGraph | DeepLearning.AI | LangGraph orchestration and stateful agents |
| HuggingFace NLP Course | HuggingFace | Transformers, tokenizers, fine-tuning |
| NVIDIA DLI Free Courses | NVIDIA | Triton, deployment, RAG with NVIDIA tools |

All links are in `website/resources/index.html`.

---

## Contributing

Found a mistake? Want to add a topic, question, or lab? See [CONTRIBUTING.md](CONTRIBUTING.md).

The short version:
1. Fork the repo
2. Add your content (topic page or question) following the templates
3. Open a pull request

---

## License

[MIT](LICENSE) — free to use, share, fork, and modify.