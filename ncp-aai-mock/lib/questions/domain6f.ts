import { Question } from '../types';

export const domain6fQuestions: Question[] = [
  { id: 6086, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Dense Passage Retrieval', difficulty: 'hard', keywords: ['DPR', 'bi-encoder', 'cross-encoder', 'dense'],
    question: 'Bi-encoder vs cross-encoder architecture in retrieval systems:',
    options: { A: 'Bi-encoders encode two documents, cross-encoders encode one', B: 'Bi-encoder: independently encodes query and documents (fast, scalable for retrieval). Cross-encoder: jointly encodes query+document pairs (slow but highly accurate for reranking a small candidate set)', C: 'Cross-encoders are used at retrieval stage for better accuracy', D: 'Both architectures have identical computational complexity' },
    answer: 'B', explanation: 'Two-stage retrieval: bi-encoder retrieves top-100 candidates (efficient — pre-compute doc embeddings). Cross-encoder reranks top-100 → top-10 (accurate — joint attention between query and each candidate). Bi-encoder alone: fast but less accurate. Cross-encoder alone: too slow to score all documents at query time.' },

  { id: 6087, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Index Sharding', difficulty: 'hard', keywords: ['sharding', 'partition', 'distributed', 'scale'],
    question: 'Sharding vector indices across multiple nodes enables:',
    options: { A: 'Better embedding quality through distributed computation', B: 'Horizontal scaling beyond single-machine memory limits — each shard holds a partition of the index, queries fan-out to all shards and results are merged', C: 'Sharding eliminates the need for approximate nearest neighbor algorithms', D: 'Index sharding only applies to relational databases, not vector stores' },
    answer: 'B', explanation: 'Vector index sharding: 10B document corpus → 5 nodes × 2B docs each. Query → broadcast to all 5 nodes → each returns top-K local results → merger combines 5×top-K → selects global top-K. Enables billion-scale retrieval by distributing memory and compute horizontally.' },

  { id: 6088, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Retrieval Augmented Thinking', difficulty: 'hard', keywords: ['rationale', 'chain', 'retrieve', 'generate'],
    question: 'Iterative retrieval (retrieve-read-retrieve) in complex QA improves over single-shot retrieval by:',
    options: { A: 'Retrieving the same documents multiple times for confidence', B: 'Using intermediate reasoning steps to generate better follow-up queries — first retrieval reveals needed context for a more specific second retrieval', C: 'Iterative retrieval triples computation with minimal benefit', D: 'Only useful when the initial retrieval returns zero results' },
    answer: 'B', explanation: 'Iterative retrieval: Q="Who leads the team that built the system used for X?" → Retrieval 1: find system used for X → "System Y, built by Team Z" → Retrieval 2: "Who leads Team Z?" → "Alice Smith". Single-shot retrieval of "Who leads the team" without knowing Team Z would fail.' },

  { id: 6089, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Data Governance for RAG', difficulty: 'medium', keywords: ['governance', 'access control', 'sensitivity', 'classification'],
    question: 'Data governance for RAG knowledge bases must ensure:',
    options: { A: 'All documents are publicly accessible for maximum utility', B: 'Document sensitivity levels flow through to retrieval — confidential documents only returned to authorized users, preventing information leakage across security boundaries', C: 'Data governance only applies to structured data, not RAG documents', D: 'Governance is the responsibility of the cloud provider, not the application' },
    answer: 'B', explanation: 'RAG governance: document classification (public, internal, confidential, restricted) → embed with sensitivity metadata → retrieval filter: user_clearance >= document_sensitivity → "confidential" HR docs not returned to contractors. Without governance: all users get all retrieved documents regardless of authorization.' },

  { id: 6090, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Streaming Ingestion', difficulty: 'hard', keywords: ['streaming', 'Flink', 'real-time', 'pipeline'],
    question: 'Apache Flink for real-time RAG knowledge base updates processes:',
    options: { A: 'Flink only processes batch data, not real-time streams', B: 'Continuous streams of document change events — embedding and indexing documents within seconds of source changes enabling near-real-time knowledge base freshness', C: 'Flink requires significant data volume before processing begins', D: 'Streaming ingestion is always preferable to batch for RAG' },
    answer: 'B', explanation: 'Flink RAG pipeline: source events → Flink stream processor → {parse, clean, chunk, embed} → vector store upsert. Latency: source update → indexed in ~10-30 seconds. Compare to batch (nightly): 24-hour staleness. Use streaming for time-sensitive knowledge (news, prices, policies), batch for stable content.' },

  { id: 6091, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Negative Sampling', difficulty: 'hard', keywords: ['negative sampling', 'hard negatives', 'training', 'contrastive'],
    question: 'Hard negative mining for RAG embedding model training:',
    options: { A: 'Removing negative examples from training data', B: 'Selecting challenging negative examples (documents that are topically similar but don\'t answer the query) to train embedding models to make finer-grained distinctions', C: 'Hard negatives are noise and should be filtered out', D: 'Hard negatives only apply to image embedding models' },
    answer: 'B', explanation: 'Hard negatives: "What is photosynthesis?" positive: correct explanation. Easy negative: "history of Rome" (clearly irrelevant). Hard negative: "cellular respiration" (related biology, not the answer). Training on hard negatives forces model to learn subtle distinctions → better at differentiating genuinely similar but non-answer documents.' },

  { id: 6092, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Knowledge Base Auditing', difficulty: 'medium', keywords: ['audit', 'coverage', 'quality', 'drift'],
    question: 'Regular knowledge base health audits for RAG systems check:',
    options: { A: 'Only document count and storage size', B: 'Coverage gaps (topics not covered), staleness (outdated content), quality issues (duplicates, poor formatting, incorrect information), and usage patterns (which docs are retrieved but not useful)', C: 'Only performed after user complaints about wrong answers', D: 'Audits are not needed if automated ingestion pipelines are in place' },
    answer: 'B', explanation: 'KB health audit: (1) Coverage: topic modeling identifies gaps. (2) Staleness: flag documents older than policy TTL. (3) Quality: low-coherence chunks (bad OCR, mid-table splits). (4) Usage patterns: documents retrieved frequently but rated unhelpful → candidates for revision or removal. Quarterly audit cadence.' },

  { id: 6093, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Cross-Modal Grounding', difficulty: 'hard', keywords: ['visual grounding', 'image', 'text', 'alignment'],
    question: 'Cross-modal grounding in multimodal AI knowledge systems:',
    options: { A: 'Translating text queries into image search', B: 'Aligning language concepts with visual representations — "the diagram in section 3.2 shows X" → agent can link the text reference to the actual image for accurate multimodal responses', C: 'Cross-modal grounding is only needed for robotics', D: 'Text and images are always stored separately and not linked' },
    answer: 'B', explanation: 'Cross-modal grounding: technical document has text "Figure 2 shows architecture" + Figure 2 image. Multimodal indexing: chunk text + associate figure by spatial proximity → query "explain the architecture" → retrieve text chunk + associated figure → LLM reasons over both modalities → accurate response with visual context.' },

  { id: 6094, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Retrieval Augmented Reasoning', difficulty: 'hard', keywords: ['FLARE', 'RAR', 'proactive', 'generation'],
    question: 'FLARE (Forward-Looking Active REtrieval) addresses the problem of:',
    options: { A: 'Forward compatibility in RAG API versions', B: 'Retrieval happening only at query start — FLARE proactively retrieves during generation when the model\'s confidence drops, identifying what additional knowledge is needed mid-generation', C: 'FLARE is a data preprocessing technique, not a retrieval method', D: 'FLARE only works with Wikipedia as the knowledge source' },
    answer: 'B', explanation: 'FLARE: during generation, monitor token probability. When low-confidence segment detected (model uncertain): pause generation → retrieve relevant context for the uncertain segment → resume generation with additional context. Unlike RAG (retrieve once at start), FLARE retrieves adaptively throughout generation.' },

  { id: 6095, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Knowledge Cutoff Management', difficulty: 'medium', keywords: ['knowledge cutoff', 'LLM', 'freshness', 'augmentation'],
    question: 'Managing LLM knowledge cutoff limitations in production RAG systems:',
    options: { A: 'Frequently retrain the LLM on newer data', B: 'Index post-cutoff information in the RAG knowledge base — retrieved context provides the LLM with information beyond its training cutoff date', C: 'Display the training cutoff date and let users evaluate relevance', D: 'Knowledge cutoff only matters for news-related queries' },
    answer: 'B', explanation: 'RAG for post-cutoff knowledge: LLM training cutoff 2024-01, current date 2025-06 → LLM doesn\'t know events from 2024-2025. RAG solution: index 2024-2025 news, documentation, research → retrieved context provides post-cutoff information → LLM reasons over retrieved context → answers are current.' },
];
