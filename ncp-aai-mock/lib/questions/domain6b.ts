import { Question } from '../types';

export const domain6bQuestions: Question[] = [
  { id: 6021, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Late Chunking', difficulty: 'hard', keywords: ['late chunking', 'jina', 'long context embedding', 'chunking'],
    question: 'Late chunking (e.g., Jina\'s approach) improves retrieval by:',
    options: { A: 'Chunking documents late in the processing pipeline after embedding', B: 'Embedding the full document first, then chunking the contextual embeddings — preserving inter-chunk context', C: 'Delaying chunking until query time for fresh splits', D: 'Using large chunk sizes and splitting only on retrieval' },
    answer: 'B', explanation: 'Late chunking embeds the whole document with a long-context encoder first, then splits the resulting contextual token embeddings into chunks — each chunk retains full document context.' },

  { id: 6022, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Agentic Data Processing', difficulty: 'medium', keywords: ['data processing', 'pipeline', 'validation', 'transformation'],
    question: 'In agentic data processing pipelines, data validation should occur:',
    options: { A: 'Only at the end before storing results', B: 'At each stage boundary — validating inputs before processing and outputs before passing to the next stage', C: 'Only during batch processing jobs', D: 'Never — trust the data sources' },
    answer: 'B', explanation: 'Stage-level validation catches bad data early — detecting issues at the source is cheaper than discovering corrupt data in production. Each stage has a contract for valid inputs and outputs.' },

  { id: 6023, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Knowledge Graph RAG', difficulty: 'hard', keywords: ['knowledge graph', 'entity linking', 'graph traversal', 'SPARQL'],
    question: 'In GraphRAG, community summaries are used to:',
    options: { A: 'Summarize user community feedback', B: 'Hierarchically summarize clusters of related entities/relationships for global question answering about large corpora', C: 'Create community forums about the document corpus', D: 'Group similar vector embeddings in the database' },
    answer: 'B', explanation: 'Microsoft\'s GraphRAG builds a hierarchy of community summaries — local entity clusters roll up to global corpus-level summaries — enabling answers to questions requiring holistic corpus understanding.' },

  { id: 6024, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Semantic Chunking', difficulty: 'medium', keywords: ['semantic chunking', 'similarity', 'breakpoint', 'topic'],
    question: 'Semantic chunking splits documents based on:',
    options: { A: 'Fixed character counts', B: 'Embedding similarity between adjacent sentences — splitting where semantic content shifts significantly', C: 'Predefined section headings and HTML tags', D: 'Keyword density thresholds' },
    answer: 'B', explanation: 'Semantic chunking embeds sentences and finds split points where cosine similarity between adjacent sentences drops (topic shift), producing chunks with coherent topics rather than arbitrary splits.' },

  { id: 6025, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Agentic Index Building', difficulty: 'medium', keywords: ['index', 'build', 'update', 'incremental'],
    question: 'For a knowledge base that updates daily with new documents, the optimal indexing strategy is:',
    options: { A: 'Rebuild the entire index nightly from scratch', B: 'Incremental indexing — only process changed/new documents, update affected index entries without rebuilding all', C: 'Never update the index once built', D: 'Maintain separate indexes for each day\'s documents' },
    answer: 'B', explanation: 'Incremental indexing scales with change volume, not corpus size. Track document hashes to identify changes, process only modified docs, upsert affected vectors — far more efficient than full rebuilds.' },

  { id: 6026, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Firecrawl and Web Scraping', difficulty: 'medium', keywords: ['web scraping', 'firecrawl', 'crawling', 'knowledge base'],
    question: 'When building knowledge bases from web content for RAG, which challenge must be addressed?',
    options: { A: 'Web content is always low quality and should be avoided', B: 'Handling dynamic JS-rendered content, respecting robots.txt, deduplication, and legal compliance', C: 'Web content requires no preprocessing before embedding', D: 'Web scraping is prohibited by all LLM providers' },
    answer: 'B', explanation: 'Web knowledge base challenges: JavaScript rendering (use Playwright/Puppeteer), robots.txt compliance (legal/ethical), deduplication (same content from multiple pages), freshness (content changes).' },

  { id: 6027, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Dense vs Sparse', difficulty: 'medium', keywords: ['dense retrieval', 'DPR', 'BM25', 'ColBERT'],
    question: 'ColBERT improves on standard dense retrieval by:',
    options: { A: 'Using BM25 sparse matching only', B: 'Creating late-interaction embeddings — per-token query embeddings interact with per-token document embeddings for fine-grained relevance', C: 'Coloring documents by relevance score for visual ranking', D: 'Using color-coded semantic categories' },
    answer: 'B', explanation: 'ColBERT\'s late interaction: query and document are independently encoded into per-token vectors. MaxSim (max similarity of query token to all doc tokens, summed) captures fine-grained matching that single-vector retrieval misses.' },

  { id: 6028, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Unstructured Data', difficulty: 'medium', keywords: ['unstructured', 'parsing', 'Unstructured.io', 'multi-modal'],
    question: 'The Unstructured.io library addresses which data challenge for RAG?',
    options: { A: 'Adding structure to database schemas', B: 'Parsing diverse unstructured document formats (PDF, DOCX, HTML, images) into clean text while preserving layout information', C: 'Unstructuring (flattening) nested JSON data', D: 'Managing unstructured GPU memory allocation' },
    answer: 'B', explanation: 'Unstructured.io handles 25+ document formats with layout-aware parsing — detecting tables, lists, headers, and figures, converting complex documents into clean, structured text for downstream embedding.' },

  { id: 6029, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'RAG Pipeline Testing', difficulty: 'medium', keywords: ['RAG testing', 'retrieval testing', 'unit test', 'integration'],
    question: 'Testing a RAG pipeline requires evaluating separately:',
    options: { A: 'Only the final answer quality', B: 'Retrieval quality (are the right chunks retrieved?) AND generation quality (is the LLM using context correctly?)', C: 'Only the embedding model performance', D: 'Only the vector database query speed' },
    answer: 'B', explanation: 'RAG testing needs separate evaluation: retrieval (is context_recall and context_precision acceptable?) and generation (given correct context, does the LLM answer faithfully?). Each can fail independently.' },

  { id: 6030, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Hybrid Database', difficulty: 'medium', keywords: ['multi-vector', 'hybrid database', 'vector+SQL', 'structured+unstructured'],
    question: 'Combining a vector database with a relational database in an agent\'s knowledge layer allows:',
    options: { A: 'Using twice the storage for better redundancy', B: 'Semantic search over unstructured content AND precise structured queries (filter by date, category, price) in a unified system', C: 'Automatic migration between database types', D: 'Vector databases to inherit SQL ACID properties' },
    answer: 'B', explanation: 'Hybrid knowledge layers: vector DB for semantic retrieval of documents/text, relational DB for precise structured queries. Agents can combine "find similar products" (vector) with "where price < $100" (SQL).' },

  { id: 6031, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Data Lineage', difficulty: 'medium', keywords: ['data lineage', 'provenance', 'tracking', 'source'],
    question: 'Data lineage tracking in RAG knowledge bases ensures:',
    options: { A: 'Data is transmitted along phone lines', B: 'Every chunk can be traced back to its source document, enabling citation, auditability, and staleness detection', C: 'Data follows a linear path through the pipeline', D: 'Lineage data is stored in a separate database' },
    answer: 'B', explanation: 'Lineage metadata (source URL, document ID, ingestion timestamp, chunk position) enables: accurate citations in responses, detecting stale chunks, auditing what data was retrieved, and debugging incorrect answers.' },

  { id: 6032, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Embedding Batching', difficulty: 'medium', keywords: ['batch embedding', 'throughput', 'efficiency', 'GPU'],
    question: 'Batching documents during the embedding step of RAG ingestion:',
    options: { A: 'Reduces embedding quality due to interference between documents', B: 'Dramatically improves throughput by maximizing GPU utilization for matrix operations across multiple documents simultaneously', C: 'Is only beneficial for very small documents', D: 'Should be avoided to prevent out-of-memory errors' },
    answer: 'B', explanation: 'GPUs are optimized for large matrix operations. Batching 32-128 documents simultaneously fills GPU compute units, achieving 10-100x higher throughput than one-at-a-time embedding.' },

  { id: 6033, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'RAG Failure Modes', difficulty: 'medium', keywords: ['failure modes', 'retrieval failure', 'context stuffing', 'off-topic'],
    question: 'Which are common RAG failure modes? (Choose two)',
    options: { A: 'Retrieval failure — the correct document is not retrieved (low recall)', B: 'Too many documents in the index — more is always better', C: 'Context poisoning — irrelevant retrieved content misleads the LLM', D: 'Using embedding models that are too powerful' },
    answer: 'AC', explanation: 'Retrieval failure (wrong or missing relevant chunks) and context poisoning (irrelevant chunks confuse the LLM) are the two fundamental RAG failure modes, requiring retrieval quality optimization and filtering.' },

  { id: 6034, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'SQL Agent Tools', difficulty: 'medium', keywords: ['SQL agent', 'schema', 'query generation', 'validation'],
    question: 'A robust Text-to-SQL agent must handle:',
    options: { A: 'Only SELECT queries for safety', B: 'Schema understanding, query generation, execution, result interpretation, AND error recovery from invalid SQL', C: 'Only queries on a single table at a time', D: 'SQL queries without access to the actual database' },
    answer: 'B', explanation: 'Production SQL agents need: schema introspection (what tables/columns exist?), query generation, execution, result formatting, AND retry-with-correction when generated SQL fails execution.' },

  { id: 6035, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'JSON Data Extraction', difficulty: 'medium', keywords: ['structured extraction', 'JSON', 'entity extraction', 'information extraction'],
    question: 'The most reliable approach for extracting structured data from unstructured text in agent pipelines is:',
    options: { A: 'Regex patterns for all extraction tasks', B: 'LLM with structured output constraints (JSON schema) providing entity and relationship extraction with validation', C: 'Keyword matching with predefined dictionaries', D: 'Human review of all text before extraction' },
    answer: 'B', explanation: 'LLMs with structured output constraints handle the variability of natural language that breaks regex, while schema enforcement ensures valid output format — the best balance of flexibility and reliability.' },

  { id: 6036, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Vector Quantization', difficulty: 'hard', keywords: ['PQ', 'product quantization', 'IVF', 'compression'],
    question: 'Product Quantization (PQ) in vector databases trades:',
    options: { A: 'Search accuracy for storage efficiency — approximating distances rather than exact computation', B: 'Product-level granularity for batch-level', C: 'Quantization accuracy for quantization speed', D: 'No tradeoffs — it improves both speed and accuracy' },
    answer: 'A', explanation: 'PQ compresses vectors by encoding them as products of sub-quantizers, reducing storage 10-100x and enabling faster approximate distance computation, at the cost of slightly reduced recall vs exact search.' },

  { id: 6037, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Multimodal Embeddings', difficulty: 'medium', keywords: ['CLIP', 'multimodal', 'image-text', 'joint embedding'],
    question: 'CLIP (Contrastive Language-Image Pre-training) enables agents to:',
    options: { A: 'Clip images to remove borders before processing', B: 'Search images with text queries and text with image queries — both share the same embedding space', C: 'Clip maximum token lengths in prompts', D: 'Connect local image files to the internet' },
    answer: 'B', explanation: 'CLIP trains image and text encoders to produce embeddings in the same space where semantically related image-text pairs are close. Enables cross-modal retrieval: "find images matching this description".' },

  { id: 6038, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Access Control in RAG', difficulty: 'hard', keywords: ['row-level security', 'RBAC', 'authorization', 'retrieval'],
    question: 'Row-level security in RAG vector databases ensures:',
    options: { A: 'Database rows are physically secure from tampering', B: 'Users only retrieve documents they are authorized to access, even during semantic similarity search', C: 'Rows are processed in security-conscious order', D: 'Security certificates are stored with each vector row' },
    answer: 'B', explanation: 'Row-level security in vector DBs (Pinecone namespace, Weaviate tenants, filters on user/role metadata) ensures users can\'t retrieve privileged documents via semantic search, even if their query is semantically similar.' },

  { id: 6039, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Knowledge Base Versioning', difficulty: 'medium', keywords: ['version', 'snapshot', 'rollback', 'knowledge base'],
    question: 'Versioning a RAG knowledge base enables:',
    options: { A: 'Faster embedding generation', B: 'Rolling back to a previous state if new data degrades response quality, and A/B testing different knowledge versions', C: 'Automatic version upgrades of the embedding model', D: 'Versioning only matters for code, not data' },
    answer: 'B', explanation: 'Versioned knowledge bases allow: snapshot before risky updates, rollback if quality degrades, A/B testing (version A vs B for different users), and audit trails for compliance.' },

  { id: 6040, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Index Refresh Strategies', difficulty: 'medium', keywords: ['refresh', 'rebuild', 'live', 'near-real-time'],
    question: 'Near-real-time index updates (seconds delay) are appropriate when:',
    options: { A: 'All RAG applications — always use real-time updates', B: 'The application requires fresh knowledge (news, live prices, support tickets) where stale data causes incorrect responses', C: 'The corpus changes less than once per week', D: 'Real-time is never cost-effective' },
    answer: 'B', explanation: 'Near-real-time indexing (streaming pipelines, change data capture) is justified when knowledge staleness materially affects answer quality. For stable corpora (books, policies), daily or weekly batch updates suffice.' },
];
