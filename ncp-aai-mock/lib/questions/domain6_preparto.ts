import { Question } from '../types';

export const domain6PrepartoQuestions: Question[] = [
  {
    id: 6801,
    domain: 6,
    domainName: 'Knowledge Integration & Data Handling',
    topic: 'Scenario: Chunking Strategy Selection',
    question: 'You are building a RAG system for a legal knowledge base containing 10,000 multi-section contracts (average 50 pages each). Legal practitioners ask questions that often require context from 2-3 adjacent paragraphs but rarely the entire contract. Which chunking strategy BEST balances retrieval precision with contextual completeness?',
    options: {
      A: 'Fixed-size chunking at 512 tokens with no overlap — simple and consistent.',
      B: 'Recursive character text splitting with 1024-token chunks and 128-token overlap, splitting preferentially at paragraph and sentence boundaries to avoid splitting mid-sentence.',
      C: 'Whole-document chunking — index each contract as a single document.',
      D: 'Sentence-level chunking — each sentence is a separate embedding for maximum granularity.'
    },
    answer: 'B',
    explanation: 'Recursive splitting with overlap (B) is optimal for legal documents: (1) 1024-token chunks capture 2-3 paragraphs of legal context. (2) 128-token overlap ensures a question about a clause boundary doesn\'t fall between two chunks with neither providing full context. (3) Splitting at paragraph/sentence boundaries prevents mid-thought splits that confuse the LLM. Fixed-size (A) splits mid-sentence. Whole-document (C) retrieves too much irrelevant text. Sentence-level (D) loses the contextual continuity that legal analysis requires.',
    keywords: ['chunking', 'recursive splitting', 'overlap', 'RAG', 'legal documents'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 6802,
    domain: 6,
    domainName: 'Knowledge Integration & Data Handling',
    topic: 'Scenario: NVIDIA cuVS for Vector Search',
    question: 'Your agent\'s RAG pipeline currently uses CPU-based FAISS for vector similarity search, achieving 2,000 queries/second with 128ms average latency. A 10x traffic increase is imminent. Select TWO capabilities of NVIDIA cuVS that would address this scaling challenge.',
    options: {
      A: 'cuVS provides GPU-accelerated vector similarity search that achieves 10-100x throughput improvement over CPU-based FAISS by parallelizing distance computations across thousands of CUDA cores simultaneously.',
      B: 'cuVS automatically migrates your FAISS index to a cloud-hosted service without any code changes.',
      C: 'cuVS includes GPU-accelerated index build algorithms (CAGRA, IVF-Flat, IVF-PQ) that reduce index construction time from hours to minutes for billion-scale vector datasets.',
      D: 'cuVS replaces the need for embedding models by generating its own vector representations from raw text.',
      E: 'cuVS provides a FAISS-compatible API wrapper (faiss-gpu) that minimizes migration effort from CPU FAISS to GPU-accelerated search.'
    },
    answer: 'AC',
    explanation: '(A) cuVS\'s GPU acceleration is its primary value: massively parallel CUDA execution of distance computations (cosine, L2) delivers 10-100x throughput improvements over CPU FAISS — handling 20,000-200,000 queries/second on a single GPU. (C) GPU-accelerated index build is a documented cuVS advantage: building an HNSW or CAGRA index on 100M vectors takes hours on CPU but minutes on GPU — critical for frequent re-indexing. Option B is fabricated. Option D is fabricated — cuVS does search, not embedding. Option E partially exists (faiss-gpu) but isn\'t the primary cuVS positioning.',
    keywords: ['cuVS', 'GPU acceleration', 'CAGRA', 'vector search', 'throughput'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 6803,
    domain: 6,
    domainName: 'Knowledge Integration & Data Handling',
    topic: 'Scenario: Hybrid Search Implementation',
    question: 'Your product search agent performs well for semantic queries ("comfortable running shoes for wide feet") but fails on exact product code queries ("SKU-2847-BLK-11"). Pure dense embedding search scores SKU-2847-BLK-11 poorly because exact character sequences aren\'t well-captured in semantic space. What is the BEST fix?',
    options: {
      A: 'Add SKU codes to the document metadata and use a pre-filter to identify exact matches before semantic search.',
      B: 'Fine-tune the embedding model on product SKU data so it learns to embed SKU codes accurately.',
      C: 'Implement hybrid search: combine BM25 sparse retrieval (exact keyword/token matching, high recall for SKU codes) with dense embedding search (semantic similarity), using Reciprocal Rank Fusion (RRF) to merge results from both systems.',
      D: 'Add a preprocessing step that converts SKU queries to natural language ("find item SKU-2847-BLK-11") before embedding.'
    },
    answer: 'C',
    explanation: 'Hybrid search (C) solves the dual-mode query problem: BM25 excels at exact token matching (SKU codes are tokenized exactly); dense search handles semantic queries. RRF fuses results by rank position rather than raw scores, avoiding the normalization problem when combining scores from different retrieval systems. Option A (metadata filter) works for known exact SKU but fails for fuzzy SKU variants. Option B (fine-tuning) improves embedding of SKUs but still won\'t match BM25 for exact string retrieval. Option D (NL conversion) adds a transformation step that may not improve embedding similarity for exact codes.',
    keywords: ['hybrid search', 'BM25', 'dense retrieval', 'RRF', 'exact matching'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 6804,
    domain: 6,
    domainName: 'Knowledge Integration & Data Handling',
    topic: 'Scenario: Re-ranking Pipeline',
    question: 'Your RAG system retrieves 20 candidate chunks per query using embedding similarity, but the agent frequently uses the 15th-20th ranked chunk as its primary source — suggesting the initial ranking doesn\'t match relevance well. Select TWO approaches to improve retrieval ranking quality before the LLM reads the candidates.',
    options: {
      A: 'Add a cross-encoder re-ranker (e.g., ms-marco-MiniLM-L-12-v2) as a second stage: pass all 20 candidate (query, chunk) pairs through the cross-encoder, which performs full attention across both texts for more accurate relevance scoring than bi-encoder similarity alone.',
      B: 'Increase the number of retrieved candidates from 20 to 100 and pass all to the LLM.',
      C: 'Use NVIDIA NeMo Retriever\'s re-ranking model, which is optimized for enterprise document retrieval and provides relevance scores calibrated for domain-specific content.',
      D: 'Switch from cosine similarity to Euclidean distance for embedding comparison.',
      E: 'Add query expansion: generate 3 paraphrase variants of each query and retrieve candidates for all 4 queries, then merge and deduplicate.'
    },
    answer: 'AC',
    explanation: '(A) Cross-encoder re-ranking is the standard second-stage approach: bi-encoders create separate query/document embeddings (fast but approximate); cross-encoders attend jointly to query+document (slower but much more accurate). Using a cross-encoder to re-rank the top-20 bi-encoder results dramatically improves precision. (C) NVIDIA NeMo Retriever\'s re-ranker is a production-grade option specifically for enterprise RAG, providing calibrated relevance scores. Option B (pass 100 to LLM) hits context limits and degrades generation quality. Option D (distance metric) changes but doesn\'t fundamentally fix ranking quality. Option E (query expansion) improves recall but not precision ranking.',
    keywords: ['cross-encoder', 're-ranking', 'NeMo Retriever', 'bi-encoder', 'two-stage retrieval'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 6805,
    domain: 6,
    domainName: 'Knowledge Integration & Data Handling',
    topic: 'Scenario: Document Parsing Pipeline',
    question: 'You need to ingest 100,000 PDF documents for a RAG system. The PDFs include: text-based contracts, scanned image-only invoices, and technical diagrams with embedded text. Which parsing approach handles ALL three document types?',
    options: {
      A: 'PyPDF2 for all documents — it handles all PDF types natively.',
      B: 'A multi-modal parsing pipeline: (1) PyMuPDF/pdfplumber for text-layer PDFs; (2) OCR engine (e.g., Tesseract, NVIDIA OCRNet) for scanned image-only PDFs; (3) A vision-language model or specialized diagram parser for technical diagrams with embedded text.',
      C: 'Convert all PDFs to plain text using PDF-to-text command-line tools, then chunk.',
      D: 'Use only a vision-language model for all documents — it handles all three types in a single pass.'
    },
    answer: 'B',
    explanation: 'Each document type requires a different parser: (1) Text-layer PDFs: PyMuPDF/pdfplumber extracts text directly without OCR. (2) Scanned image-only: requires OCR — no text layer exists; PyPDF2 returns empty text. (3) Diagrams with embedded text: neither standard text extraction nor basic OCR handles diagram layout accurately — requires specialized parsing. A routing pipeline that detects document type and applies the correct parser is the production approach. PyPDF2 (A) fails on scanned PDFs. PDF-to-text (C) fails on images. VLM-only (D) is accurate but expensive for the 90%+ of text-layer documents that don\'t need it.',
    keywords: ['document parsing', 'OCR', 'PDF', 'multi-modal', 'pipeline'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 6806,
    domain: 6,
    domainName: 'Knowledge Integration & Data Handling',
    topic: 'Embedding Model Selection',
    question: 'Select TWO accurate criteria for selecting an embedding model for a domain-specific RAG system in the financial services industry.',
    options: {
      A: 'Evaluate the model on a domain-specific retrieval benchmark (or create one with labeled financial query-document pairs), since general-purpose MTEB rankings may not reflect performance on financial terminology and regulatory language.',
      B: 'Always choose the embedding model with the highest score on the MTEB (Massive Text Embedding Benchmark) general leaderboard — it will also be best for financial domain.',
      C: 'Consider the embedding dimension and inference latency alongside retrieval quality — a model with 1536-dim embeddings may achieve slightly higher accuracy but require 4x the storage and query time vs a 384-dim model.',
      D: 'Use an embedding model trained specifically on code, since financial formulas and spreadsheet data are code-like.',
      E: 'Select the embedding model with the largest vocabulary tokenizer, as larger vocabularies always improve retrieval on specialized terminology.'
    },
    answer: 'AC',
    explanation: '(A) Domain specificity matters: financial documents contain specialized terminology (LIBOR, tranches, covenant ratios) that general embedding models may handle poorly. Domain-specific benchmarking or fine-tuning is standard practice. (C) The retrieval quality vs. infrastructure cost tradeoff is a real production decision: 1536-dim vs 384-dim affects storage (4x), index size, and query latency. For many financial applications, a 384-dim model with domain fine-tuning outperforms a larger general model with less infrastructure cost. Option B is false — domain performance doesn\'t correlate with MTEB rank. Option D is false — code models are trained for programming language semantics. Option E is a false heuristic.',
    keywords: ['embedding model', 'domain-specific', 'MTEB', 'embedding dimension', 'financial'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 6807,
    domain: 6,
    domainName: 'Knowledge Integration & Data Handling',
    topic: 'Scenario: Knowledge Graph RAG',
    question: 'Your medical knowledge agent needs to answer questions about drug interactions (Drug A interacts with Drug B, which is contraindicated for patients with Condition C). Pure vector search retrieves individual drug fact chunks but misses multi-hop relationships ("Does Patient X taking Drug A and having Condition C face risks?"). What retrieval approach handles multi-hop reasoning?',
    options: {
      A: 'Increase chunk size to 4096 tokens so each chunk contains more drug relationship context.',
      B: 'GraphRAG: store drug-interaction data as a knowledge graph (nodes: drugs, conditions, patients; edges: interacts_with, contraindicated_for, has_condition), then use graph traversal to follow relationship chains for multi-hop queries.',
      C: 'Use a chain-of-thought prompt that asks the LLM to reason about interactions step by step from retrieved flat text.',
      D: 'Fine-tune the LLM on a drug interaction dataset so it knows the relationships parametrically.'
    },
    answer: 'B',
    explanation: 'GraphRAG (B) is purpose-built for multi-hop relationship queries: a knowledge graph explicitly encodes Drug A → interacts_with → Drug B → contraindicated_for → Condition C as traversable edges. The agent queries: "Find all drugs that interact with Drug A and are contraindicated for Condition C" — this is a 2-hop graph traversal, trivial for a graph database (Neo4j, Neptune) but not solvable by pure vector search. Larger chunks (A) don\'t create relationship links. CoT (C) requires the LLM to hold all relationship chains in context simultaneously — error-prone for complex multi-hop. Fine-tuning (D) stores knowledge parametrically, not updateable without retraining.',
    keywords: ['GraphRAG', 'knowledge graph', 'multi-hop', 'drug interactions', 'graph traversal'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 6808,
    domain: 6,
    domainName: 'Knowledge Integration & Data Handling',
    topic: 'Scenario: Metadata Filtering',
    question: 'Your enterprise knowledge base contains documents from 12 product lines, 8 regions, and documents classified as Public, Internal, or Confidential. User queries must be restricted to: (1) their authorized product lines, (2) their region, and (3) their clearance level. Which RAG architecture correctly enforces these access controls?',
    options: {
      A: 'Use a single index for all documents; rely on the LLM\'s reasoning to filter out unauthorized content based on instructions in the system prompt.',
      B: 'Implement pre-retrieval metadata filtering: at query time, apply database-level filters (product_line IN user.authorized_products AND region = user.region AND classification <= user.clearance) before or during vector search, so unauthorized documents are never retrieved or passed to the LLM.',
      C: 'Create separate vector indexes per user — each user has their own index containing only authorized documents.',
      D: 'Post-process LLM responses with a keyword filter that removes sentences mentioning unauthorized products or regions.'
    },
    answer: 'B',
    explanation: 'Pre-retrieval metadata filtering (B) is the only architecturally sound approach for access control: unauthorized documents must NEVER be retrieved, because any information passed to the LLM can leak into responses even with post-processing. Pre-filtering at the vector store level (Milvus, Pinecone, pgvector all support this) ensures access control is enforced before retrieval. Option A (LLM filtering) is not a security control — LLMs can be prompted to reveal filtered content. Option C (per-user indexes) is operationally unscalable. Option D (post-processing) fails because the LLM already saw unauthorized content.',
    keywords: ['metadata filtering', 'access control', 'pre-filtering', 'authorization', 'RAG security'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 6809,
    domain: 6,
    domainName: 'Knowledge Integration & Data Handling',
    topic: 'RAG Pipeline Failure Modes',
    question: 'Select TWO distinct failure modes of RAG pipelines that require different remediation strategies.',
    options: {
      A: 'Retrieval failure: the correct answer exists in the knowledge base but is not retrieved (low Context Recall). Remediation: improve chunking, embedding model, or retrieval parameters (top-K, similarity threshold).',
      B: 'Generation failure: the correct information was retrieved but the LLM ignored it and generated a different answer from its parametric memory. Remediation: improve prompt instructions to emphasize grounding in retrieved context; reduce LLM temperature.',
      C: 'Indexing failure: the knowledge base is too large for the embedding model to process. Remediation: switch to a smaller embedding model with fewer parameters.',
      D: 'Vector database failure: embeddings stored in the vector database automatically expire after 30 days without refresh.',
      E: 'Query failure: user queries with more than 50 tokens cannot be embedded correctly by any embedding model.'
    },
    answer: 'AB',
    explanation: '(A) Retrieval failure (low recall) and generation failure (ignoring retrieved context) are the two most important distinct RAG failure modes, each requiring completely different fixes: retrieval failures need better retrieval (embeddings, chunking, top-K); generation failures need better prompting (emphasizing context grounding) or model selection. These require separate diagnostic metrics (Context Recall vs Faithfulness in RAGAS). Options C, D, E describe fabricated or incorrect failure modes.',
    keywords: ['RAG failure modes', 'retrieval failure', 'generation failure', 'faithfulness', 'context recall'],
    difficulty: 'medium',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 6810,
    domain: 6,
    domainName: 'Knowledge Integration & Data Handling',
    topic: 'NeMo Retriever',
    question: 'Select TWO accurate statements about NVIDIA NeMo Retriever\'s role in enterprise RAG pipelines.',
    options: {
      A: 'NeMo Retriever provides NVIDIA-optimized embedding models (e.g., NV-EmbedQA, NV-RerankQA) deployable as NIM microservices with OpenAI-compatible APIs, enabling drop-in replacement of embedding API calls in existing RAG pipelines.',
      B: 'NeMo Retriever automatically crawls and indexes the entire public internet to provide a universal knowledge base for enterprise agents.',
      C: 'NeMo Retriever includes a re-ranking model (NV-RerankQA) that improves retrieval precision by scoring retrieved candidates on full query-document relevance, not just embedding similarity.',
      D: 'NeMo Retriever replaces vector databases entirely by storing document embeddings in GPU memory permanently.',
      E: 'NeMo Retriever can only be used with Milvus as the vector store — it is incompatible with other vector databases.'
    },
    answer: 'AC',
    explanation: '(A) NeMo Retriever\'s embedding models (like llama-3.2-nv-embedqa-1b-v2) are deployed as NIM microservices with OpenAI-compatible endpoints — you replace "text-embedding-ada-002" with the NIM endpoint URL and your LangChain/LlamaIndex code works unchanged. (C) NV-RerankQA is a cross-encoder re-ranking model provided as part of NeMo Retriever, improving precision in the second stage of retrieval. Option B is fabricated. Option D is false — NeMo Retriever works with vector databases. Option E is false — NeMo Retriever is compatible with any vector store that accepts embeddings.',
    keywords: ['NeMo Retriever', 'NV-EmbedQA', 'NV-RerankQA', 'NIM', 'embedding microservice'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 6811,
    domain: 6,
    domainName: 'Knowledge Integration & Data Handling',
    topic: 'Scenario: Incremental Index Updates',
    question: 'Your knowledge base receives 500 new documents per day. Currently you rebuild the entire vector index nightly (taking 4 hours). This means new documents are not searchable for up to 24 hours. How do you reduce the time-to-searchable for new documents?',
    options: {
      A: 'Move to a 2-hour rebuild cycle instead of 24-hour.',
      B: 'Implement incremental indexing: new documents are embedded and inserted into the vector index immediately upon ingestion (supported by Milvus\'s streaming insert, Pinecone\'s upsert), making them searchable within seconds. Periodic full re-indexes run for optimization (compaction, re-balancing) but are not required for new document availability.',
      C: 'Store new documents in a separate "hot" index that is queried in parallel with the main index, merged at query time.',
      D: 'Cache user queries and refresh cache when new documents arrive.'
    },
    answer: 'B',
    explanation: 'Incremental indexing (B) is the production solution: modern vector databases (Milvus, Pinecone, Weaviate) support real-time document insertion — embed the document, call insert/upsert, and it\'s immediately searchable. Full re-indexing is only needed for index optimization (not document availability). Option A (2-hour cycle) still has a 2-hour gap. Option C (parallel hot index) is a valid workaround but more complex than needed — incremental insert is simpler and equivalent. Option D (caching) doesn\'t address the searchability problem.',
    keywords: ['incremental indexing', 'Milvus', 'Pinecone', 'upsert', 'real-time indexing'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 6812,
    domain: 6,
    domainName: 'Knowledge Integration & Data Handling',
    topic: 'Contextual Chunking',
    question: 'Select TWO accurate statements about contextual chunking (also called contextual retrieval) as a technique to improve RAG performance over standard chunking.',
    options: {
      A: 'Contextual chunking prepends a short LLM-generated context description to each chunk before embedding (e.g., "This chunk is from Section 3 of the Q3 2024 earnings report and discusses revenue breakdown by geography"), providing retrieval context that would otherwise be lost when a chunk is isolated from its source document.',
      B: 'Contextual chunking eliminates the need for metadata filtering because the context description contains all necessary information for access control.',
      C: 'Contextual chunking improves recall because the prepended context helps the embedding model create more informative embeddings that capture the chunk\'s role within the larger document, reducing the "orphan chunk" problem where isolated chunks are too short to be meaningful.',
      D: 'Contextual chunking requires storing two copies of each chunk — one with context for retrieval and one without for generation.',
      E: 'Contextual chunking always doubles retrieval quality regardless of the source document type.'
    },
    answer: 'AC',
    explanation: '(A) Accurately describes contextual chunking: an LLM generates a 1-2 sentence description of each chunk\'s role in the document (which section, what topic, from which document) prepended before embedding. This is the Anthropic "contextual retrieval" technique. (C) The "orphan chunk" problem is real: isolated chunks like "The growth rate was 23%" are unembeddable without context. Contextual descriptions make such chunks retrievable. Option B is false — contextual descriptions don\'t handle access control. Option D is false — you use the contextualized version for both retrieval and can optionally pass the original to the LLM. Option E\'s "always" claim is false.',
    keywords: ['contextual chunking', 'contextual retrieval', 'orphan chunk', 'prepended context', 'embedding quality'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 6813,
    domain: 6,
    domainName: 'Knowledge Integration & Data Handling',
    topic: 'Scenario: Knowledge Base Freshness',
    question: 'Your financial news agent uses a RAG knowledge base last updated 3 days ago. A user asks about yesterday\'s market movement. The agent confidently answers with outdated information from 3 days ago, presenting it as current. What architectural safeguards prevent this hallucination-adjacent failure?',
    options: {
      A: 'Increase RAG retrieval to top-20 chunks — more context reduces the chance of outdated information being used.',
      B: 'Embed document ingestion timestamps as metadata; at query time, apply a recency filter (e.g., only retrieve documents from the last 24 hours for "latest" queries) and have the agent explicitly state the knowledge cutoff date in its response.',
      C: 'Add a post-processing step that appends "as of [last update date]" to all agent responses.',
      D: 'Fine-tune the LLM to always say "I don\'t know" when asked about recent events.'
    },
    answer: 'B',
    explanation: 'Temporal metadata filtering (B) is the correct architectural fix: (1) Timestamp metadata on every document enables recency-aware retrieval — "latest market data" queries filter to recent documents. (2) Explicit knowledge cutoff disclosure in the agent\'s response tells users when the information is from. Option A (more chunks) retrieves more outdated information, not less. Option C (append disclaimer) addresses disclosure but not the retrieval of outdated data. Option D (always say "I don\'t know") is overly restrictive and degrades utility for questions where the 3-day-old data is still valid.',
    keywords: ['knowledge freshness', 'temporal metadata', 'recency filter', 'knowledge cutoff', 'timestamp'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 6814,
    domain: 6,
    domainName: 'Knowledge Integration & Data Handling',
    topic: 'Sparse vs Dense Retrieval',
    question: 'Select TWO accurate statements that correctly describe scenarios where sparse retrieval (BM25/TF-IDF) outperforms dense embedding retrieval.',
    options: {
      A: 'Sparse retrieval outperforms dense retrieval for exact technical term queries (e.g., "RFC-7231", "ISO-27001", "CUDA 12.2 PTX") where the exact character sequence must match and the query has no semantic paraphrase.',
      B: 'Sparse retrieval always outperforms dense retrieval for queries under 10 words.',
      C: 'Sparse retrieval is preferred when the knowledge base is multilingual and the embedding model was only trained on English data, as BM25 operates at the character/token level without language semantics.',
      D: 'Sparse retrieval produces better results for semantic queries like "explain the benefits of renewable energy" compared to dense retrieval.',
      E: 'Sparse retrieval requires GPU acceleration to achieve low query latency, while dense retrieval can run on CPU.'
    },
    answer: 'AC',
    explanation: '(A) Exact technical identifiers (RFCs, ISO standards, version numbers, error codes) are BM25\'s strength: exact token matching finds "CUDA 12.2 PTX" with 100% recall; dense search may fail because the embedding model doesn\'t know that "CUDA 12.2 PTX" is a distinct entity. (C) Multilingual mismatch is a real scenario: if the embedding model is English-only but the knowledge base has French documents, BM25 (character-level TF-IDF) still finds token matches in any language. Option B\'s length threshold is fabricated. Option D is the opposite — semantic queries are dense retrieval\'s strength. Option E is backwards — BM25 is CPU-native, dense retrieval benefits from GPU.',
    keywords: ['BM25', 'sparse retrieval', 'exact matching', 'multilingual', 'technical terms'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 6815,
    domain: 6,
    domainName: 'Knowledge Integration & Data Handling',
    topic: 'Scenario: Multi-Modal RAG',
    question: 'Your product support agent needs to answer questions about hardware installations using a knowledge base that includes both text installation guides and wiring diagram images. A user asks "How do I connect the power supply to the GPU?" and the critical information is in a diagram. Standard text-only RAG misses this. What architecture handles multi-modal retrieval?',
    options: {
      A: 'OCR all diagrams to text before indexing so the standard text RAG pipeline can handle them.',
      B: 'Implement multi-modal RAG: use a multi-modal embedding model (e.g., CLIP, NVIDIA NVCLIP) to create joint text-image embeddings; index both text chunks and diagram images in the same vector space; at query time, retrieve both relevant text and relevant images and pass them to a vision-language model (e.g., Llama-3.2-Vision) for answer generation.',
      C: 'Route diagram-related queries to a separate image classifier that returns pre-defined installation steps.',
      D: 'Ask users to describe what they see in the diagram so the text-only agent can help them.'
    },
    answer: 'B',
    explanation: 'Multi-modal RAG (B) is the correct architecture: joint text-image embedding models (CLIP-style) enable querying both text and image content in the same vector space with a text query. Retrieved images are passed to a vision-language model that can read the diagram and extract the wiring information. OCR (A) works for text in diagrams but loses spatial layout information critical for wiring diagrams (which wire connects where). Option C (classifier) is brittle — it only handles pre-defined question types. Option D degrades user experience.',
    keywords: ['multi-modal RAG', 'CLIP', 'vision-language model', 'image retrieval', 'NVCLIP'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
];