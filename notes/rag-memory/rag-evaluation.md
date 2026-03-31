# RAG, Memory & Evaluation — Exam Notes
**Domain weight: RAG ~12-15%, Evaluation ~8-10%**

---

## RAG Pipeline Stages

```
Documents → Chunking → Embedding → Vector Store → Retrieval → Reranking → LLM → Answer
```

### 1. Chunking
| Strategy | Chunk splits on | Best for |
|----------|----------------|---------|
| Fixed size | Character/token count | Simple docs |
| Recursive | Paragraph → sentence → word | General purpose |
| Semantic | Sentence embedding similarity | Coherent topics |
| Markdown/HTML | Header tags | Structured docs |

**overlap**: shared tokens between adjacent chunks prevents context loss at boundaries
- Typical: 50-100 token overlap with 256-512 token chunk size

### 2. Embedding Models
- `NV-Embed-QA`: NVIDIA retrieval-optimized — use for NIM-based RAG
- `text-embedding-3-small`: OpenAI general purpose
- `all-MiniLM-L6-v2`: HuggingFace lightweight, local inference

### 3. Vector Databases

#### HNSW (How ChromaDB/Pinecone work)
- **O(log N)** search complexity — not O(N) brute force
- Multi-layer graph: navigate sparse top layers → dense bottom layer
- Parameters: M (connections/node), ef_construction (build quality), ef (search quality)

#### Distance Metrics
| Metric | Best for | Property |
|--------|---------|---------|
| **Cosine similarity** | Text embeddings | Angle between vectors, magnitude-independent |
| L2 (Euclidean) | Image embeddings, spatial | Actual distance in space |
| Dot product | After L2 normalization | = cosine similarity (faster) |

### 4. Two-Stage Retrieval (with Reranker)
```
Query → Vector search (k=50, fast) → Cross-encoder reranker (top 5, accurate) → LLM
```
- **Bi-encoder** (vector search): one embedding per doc, fast O(log N)
- **Cross-encoder** (reranker): scores (query, doc) pairs together, accurate but slow O(k)
- **ColBERT**: per-token embeddings, MaxSim scoring — between bi and cross-encoder quality

### 5. Advanced Retrieval Strategies
- **HyDE (Hypothetical Document Embeddings)**: generate hypothetical answer, embed it, search
- **Hybrid search**: BM25 (keyword) + vector search, merge with Reciprocal Rank Fusion
- **Multi-query**: rephrase query N ways, run N searches, deduplicate results
- **Parent-child chunking**: index small child chunks, retrieve parent for more context

---

## RAGAS Evaluation Metrics

### The Four Core Metrics

| Metric | Measures | Formula concept | Range |
|--------|---------|----------------|-------|
| **Faithfulness** | Answer grounded in context | Supported claims / total claims | 0–1 (1 = no hallucination) |
| **Context Precision** | Retrieved chunks are relevant | Relevant chunks / total retrieved | 0–1 (1 = all retrieved are useful) |
| **Context Recall** | All needed info was retrieved | Retrieved needed info / all needed info | 0–1 (1 = nothing missed) |
| **Answer Relevancy** | Answer addresses the question | Semantic similarity of answer to question | 0–1 |

### Diagnosing RAG Problems

| Symptom | Root Cause | Fix |
|---------|-----------|-----|
| High Precision + Low Recall | k too low; missing chunks | Increase k; fix chunking |
| Low Precision + High Recall | k too high; too much noise | Reduce k; add reranker |
| Low Faithfulness | LLM hallucinating | Fix prompt; improve retrieval |
| Low Answer Relevancy | Answer off-topic | Fix prompt template |

---

## Agent Memory Types

| Memory Type | Storage | Persistence | Example |
|-------------|---------|------------|---------|
| **Short-term (working)** | LLM context window | Session only | messages array |
| **Long-term episodic** | Vector DB | Cross-session | Past interactions |
| **Long-term semantic** | Knowledge base / RAG | Permanent | Domain facts |
| **Procedural** | Prompt / code | Permanent | Agent instructions |

### LangGraph Memory
- `MemorySaver`: in-process, lost on restart — dev only
- `PostgresSaver`: PostgreSQL, multi-server — production
- `thread_id` in config = conversation session identifier

---

## Agent Evaluation KPIs (4 Core)

1. **Task Completion Rate** — % tasks completed without human escalation
2. **Reasoning Accuracy** — correctness of intermediate reasoning steps
3. **Latency per Step** — wall-clock time per node/tool call
4. **Cost per Interaction** — total token cost for a complete agent run

### Shadow Mode A/B Testing
- **Both agents** run on real production traffic
- **Users only see Strategy A** responses
- Strategy B's outputs and metrics logged offline
- Zero production risk — compare after N requests

---

## NeMo Evaluator (GA April 2025)

- 100+ academic benchmarks (MMLU, HumanEval, GSM8K)
- LLM-as-a-judge scoring for open-ended evaluation
- RAG metrics (RAGAS suite)
- Agent-specific metrics (task completion, tool call accuracy)
- **CI/CD integration**: block deployment if metrics drop below threshold

---

## Exam Quick-Fire Facts

| Question | Answer |
|----------|--------|
| RAGAS hallucination metric | Faithfulness |
| High precision + low recall RAG issue | k too low; fix: increase k |
| Low precision + high recall RAG issue | k too high; fix: add reranker |
| HNSW search complexity | O(log N) |
| Standard text embedding distance metric | Cosine similarity |
| Short-term agent memory | LLM context window (messages array) |
| Episodic vs semantic memory | Episodic = past events; Semantic = factual knowledge |
| 4 NCP-AAI agent KPIs | Task completion, reasoning accuracy, latency/step, cost/interaction |
| Shadow mode definition | Both agents run; users only see Agent A responses |
