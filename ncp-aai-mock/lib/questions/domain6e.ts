import { Question } from '../types';

export const domain6eQuestions: Question[] = [
  { id: 6076, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Embedding Drift', difficulty: 'hard', keywords: ['embedding drift', 'model upgrade', 'reindexing', 'compatibility'],
    question: 'When upgrading the embedding model in a production RAG system:',
    options: { A: 'Only new documents need to be re-embedded with the new model', B: 'The entire knowledge base must be re-embedded with the new model — old embeddings from different models are incompatible in the same index', C: 'Embedding model upgrades are backwards compatible', D: 'Old and new model embeddings can coexist in one FAISS index' },
    answer: 'B', explanation: 'Embedding incompatibility: text-embedding-ada-002 produces 1536-dim vectors in a different geometric space than text-embedding-3-large 3072-dim. Mixing in one index: query embedding (new model) ≠ document embedding (old model) space → retrieval meaningless. Plan: re-embed all docs during model migration.' },

  { id: 6077, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Query Rewriting', difficulty: 'medium', keywords: ['query rewriting', 'expansion', 'reformulation', 'HyDE'],
    question: 'Query rewriting in RAG pipelines improves retrieval by:',
    options: { A: 'Fixing spelling and grammar in user queries', B: 'Transforming user queries to better match the knowledge base language style, expanding abbreviations, adding synonyms, or generating multiple query variants', C: 'Query rewriting changes the meaning of the original query', D: 'Only useful for non-English queries' },
    answer: 'B', explanation: 'Query rewriting: user asks "how do I fix the bug with null pointer?" → rewrite to "NullPointerException handling Java troubleshooting debugging" → retrieve better. Multi-query: generate 3-5 variants → retrieve for each → deduplicate → more comprehensive coverage. Significant recall improvement with minimal overhead.' },

  { id: 6078, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Sparse Dense Retrieval', difficulty: 'hard', keywords: ['SPLADE', 'sparse', 'dense', 'expansion'],
    question: 'SPLADE (Sparse + Dense) retrieval models outperform BM25 while maintaining interpretability by:',
    options: { A: 'Using both CPU (sparse) and GPU (dense) for retrieval', B: 'Learning sparse representations that expand query/documents with related terms (like BM25 extension) while remaining in inverted index format — scalable and interpretable', C: 'SPLADE combines two separate retrieval systems with score fusion', D: 'SPLADE is only applicable to legal document retrieval' },
    answer: 'B', explanation: 'SPLADE: trains transformer to produce sparse token-weight vectors → "car" query activates "automobile", "vehicle", "sedan" tokens. Stored as inverted index (fast BM25-like lookup). Outperforms BM25 (learned expansions) while scalable (sparse) and interpretable (token weights visible).' },

  { id: 6079, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Knowledge Graph Construction', difficulty: 'hard', keywords: ['NER', 'relation extraction', 'entity linking', 'triplet'],
    question: 'Automated knowledge graph construction from text extracts:',
    options: { A: 'Only factual statements from Wikipedia', B: 'Named entities (NER), relationships between entities (relation extraction), and links to canonical entity IDs (entity linking) to form (subject, predicate, object) triplets', C: 'Knowledge graphs must be constructed manually by domain experts', D: 'LLMs cannot be used for knowledge graph construction' },
    answer: 'B', explanation: 'KG construction pipeline: "Apple was founded by Steve Jobs" → NER: {Apple: ORG, Steve Jobs: PERSON} → relation extraction: (Apple, founded_by, Steve_Jobs) → entity linking: Apple → Q312 (Wikidata), Steve_Jobs → Q19837. Automated pipeline scales to millions of documents vs manual expert construction.' },

  { id: 6080, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Long Context vs RAG', difficulty: 'medium', keywords: ['long context', 'RAG', 'needle in haystack', 'tradeoff'],
    question: 'Long context LLMs (1M+ tokens) vs RAG for knowledge access tradeoffs:',
    options: { A: 'Long context always outperforms RAG for all knowledge access tasks', B: 'Long context: simpler architecture, higher latency, higher cost per query. RAG: lower cost, scalable to billions of docs, explicit knowledge management — optimal choice depends on corpus size and query latency requirements', C: 'RAG always outperforms long context on factual accuracy', D: 'Long context eliminates the need for knowledge base maintenance' },
    answer: 'B', explanation: 'Long context: stuffing 500K tokens per query @ $0.01/1K tokens = $5/query. RAG: retrieve 5K tokens = $0.05/query — 100x cheaper. Long context advantage: no retrieval failures, handles cross-document reasoning. RAG advantage: scales beyond 1M tokens, updatable knowledge, lower cost. Most production systems use RAG.' },

  { id: 6081, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Knowledge Decay', difficulty: 'medium', keywords: ['TTL', 'staleness', 'freshness', 'expiry'],
    question: 'TTL (Time-to-Live) metadata for knowledge chunks implements:',
    options: { A: 'A timer that automatically deletes chunks after expiry', B: 'Freshness tracking: retrieval query checks if chunk age > TTL → filters out stale chunks or triggers refresh — ensuring responses don\'t use outdated information', C: 'TTL metadata is only useful for news articles', D: 'TTL is too complex for production RAG systems' },
    answer: 'B', explanation: 'TTL in practice: pricing document chunk TTL = 7 days (prices change weekly). Tech blog chunk TTL = 180 days. When query retrieves chunks: filter out chunks where (now - chunk_created_at) > TTL. Result: responses based on current information. Freshness-aware retrieval prevents stale data contamination.' },

  { id: 6082, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Chunking for Code', difficulty: 'medium', keywords: ['code chunking', 'AST', 'function', 'semantic unit'],
    question: 'Code-aware chunking (vs naive character splitting) uses:',
    options: { A: 'Splitting at every 512 characters regardless of code structure', B: 'AST (Abstract Syntax Tree) parsing to split at natural code boundaries: functions, classes, and modules — preserving semantic units for correct retrieval', C: 'Code should not be included in RAG knowledge bases', D: 'Code chunking uses line count, not characters, as the split criterion' },
    answer: 'B', explanation: 'Code chunking: character splitting → function split mid-body → incomplete, non-functional chunk. AST chunking: each function/class as its own chunk → retrieving "how to authenticate" → gets complete auth function, not half. Tree-sitter or language-server AST parsing enables language-aware chunking for any programming language.' },

  { id: 6083, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Feedback for Knowledge Improvement', difficulty: 'medium', keywords: ['RLVR', 'verification', 'knowledge quality', 'grounding'],
    question: 'Retrieval-augmented verification (RAV) improves knowledge base quality by:',
    options: { A: 'Verifying that all knowledge was retrieved at least once', B: 'Using the LLM to identify claims that are unsupported, contradictory, or inconsistently stated across knowledge chunks — flagging for human review and correction', C: 'RAV is only applicable to mathematical knowledge bases', D: 'Verification must be done by external human annotators' },
    answer: 'B', explanation: 'RAV pipeline: ingest document → LLM checks: "Do any chunks contradict each other?" "Are there claims made without supporting evidence?" "Are there factual inconsistencies?" → flag problems for human review before indexing. Prevents garbage-in-garbage-out for knowledge base quality.' },

  { id: 6084, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Multi-Document QA', difficulty: 'hard', keywords: ['multi-hop', 'fusion', 'synthesis', 'multi-document'],
    question: 'Multi-document question answering (answer spans multiple retrieved documents) requires:',
    options: { A: 'Concatenating all documents and passing to LLM', B: 'Evidence fusion: retrieving relevant passages from multiple sources, identifying complementary and contradictory information, and synthesizing a coherent answer with attribution', C: 'Multi-document QA is only possible with very large context windows', D: 'Using only the single best-matching document for reliability' },
    answer: 'B', explanation: 'Multi-document synthesis: "What is the company\'s AI strategy?" → retrieve from: CEO speech (strategic vision), annual report (investments), product announcements (capabilities), employee interviews (culture) → LLM synthesizes: "From multiple sources, the company\'s AI strategy involves X (CEO speech), Y (annual report)..."' },

  { id: 6085, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Embedding Quantization', difficulty: 'hard', keywords: ['embedding quantization', 'int8', 'binary', 'Matryoshka'],
    question: 'Matryoshka Representation Learning (MRL) embeddings enable:',
    options: { A: 'Nesting smaller models inside larger embedding models', B: 'Training single embedding models that produce useful embeddings at multiple dimensions (768, 384, 128) — enabling cost/quality tradeoff without retraining', C: 'Matryoshka refers to the Russian doll architecture for transformers', D: 'MRL is only applicable to image embeddings' },
    answer: 'B', explanation: 'MRL: train embedding model such that first 128 dimensions are already meaningful → use 128-dim for approximate pre-filtering (fast, cheap) → re-rank with full 768-dim embeddings (accurate). Deployed: fast approximate retrieval using truncated embeddings → precise reranking with full embeddings. Single model, multiple operating points.' },
];
