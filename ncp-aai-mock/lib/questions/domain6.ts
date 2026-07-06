import { Question } from '../types';

export const domain6Questions: Question[] = [
  { id: 6001, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Chunking Strategies', difficulty: 'medium', keywords: ['chunking', 'chunk size', 'overlap', 'splitting'],
    question: 'When chunking documents for RAG, recursive character splitting is preferred because:',
    options: { A: 'It splits documents into exactly equal sized chunks always', B: 'It tries to split on natural boundaries (paragraphs, sentences) before falling back to character-level splits', C: 'It is the fastest splitting algorithm', D: 'It requires no configuration parameters' },
    answer: 'B', explanation: 'Recursive character splitting respects document structure — trying paragraph, then sentence, then word, then character splits — producing more semantically coherent chunks than fixed-size splitting.' },

  { id: 6002, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Vector Databases', difficulty: 'easy', keywords: ['vector database', 'Pinecone', 'Chroma', 'Weaviate'],
    question: 'Vector databases are specialized for:',
    options: { A: 'Storing relational data with ACID guarantees', B: 'High-dimensional vector storage and efficient approximate nearest neighbor (ANN) similarity search', C: 'Time-series data storage and analysis', D: 'Document key-value storage with indexing' },
    answer: 'B', explanation: 'Vector databases use ANN algorithms (HNSW, IVF) optimized for finding the K nearest vectors to a query embedding in high-dimensional space — the core operation for semantic search.' },

  { id: 6003, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Hybrid Search', difficulty: 'medium', keywords: ['hybrid search', 'BM25', 'dense retrieval', 'RRF'],
    question: 'Hybrid search in RAG systems combines:',
    options: { A: 'Multiple embedding models from different vendors', B: 'Dense vector search (semantic) with sparse keyword search (BM25) for better retrieval coverage', C: 'Cloud and on-premise search systems', D: 'Graph search with tree search algorithms' },
    answer: 'B', explanation: 'Hybrid search merges dense retrieval (semantic similarity) and sparse BM25 (keyword matching), covering both semantic relevance and exact keyword requirements via Reciprocal Rank Fusion.' },

  { id: 6004, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Embedding Models', difficulty: 'medium', keywords: ['embedding', 'sentence-transformers', 'OpenAI embedding', 'dimensionality'],
    question: 'When selecting an embedding model for RAG, the most important factor is:',
    options: { A: 'The model\'s parameter count', B: 'Performance on retrieval benchmarks (MTEB) relevant to your domain and data type', C: 'The model\'s training date', D: 'The embedding dimensionality (always choose highest)' },
    answer: 'B', explanation: 'MTEB (Massive Text Embedding Benchmark) evaluates embedding models across retrieval, classification, and clustering tasks. Domain-specific performance predicts real-world RAG quality better than general specs.' },

  { id: 6005, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Reranking', difficulty: 'medium', keywords: ['reranking', 'cross-encoder', 'two-stage', 'ColBERT'],
    question: 'Reranking in a two-stage RAG pipeline:',
    options: { A: 'Re-embeds all documents after each query', B: 'Applies a more accurate (but slower) cross-encoder model to reorder the top-K retrieved results', C: 'Randomly shuffles retrieved results', D: 'Removes duplicate documents from results' },
    answer: 'B', explanation: 'Two-stage RAG: fast ANN retrieves top-K candidates, then a cross-encoder reranker (which sees query+document together) reorders them by actual relevance — improving precision without full-corpus cross-encoding.' },

  { id: 6006, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Document Processing', difficulty: 'easy', keywords: ['PDF parsing', 'OCR', 'table extraction', 'preprocessing'],
    question: 'Processing PDFs for RAG requires handling which challenges? (Choose two)',
    options: { A: 'Extracting text while preserving structure and handling tables/figures correctly', B: 'Converting PDF to an audio format', C: 'Handling scanned/image-based PDFs with OCR', D: 'Removing all images to reduce file size' },
    answer: 'AC', explanation: 'PDFs pose two main RAG challenges: structured text extraction (tables, columns, formatting) and OCR for scanned documents where text isn\'t extractable directly.' },

  { id: 6007, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Knowledge Graph', difficulty: 'hard', keywords: ['knowledge graph', 'entity', 'relation', 'GraphRAG'],
    question: 'GraphRAG improves standard vector RAG by:',
    options: { A: 'Using graph neural networks for embedding generation', B: 'Organizing knowledge as an entity-relation graph enabling multi-hop reasoning across connected facts', C: 'Graphing query performance over time', D: 'Using graph databases for faster vector storage' },
    answer: 'B', explanation: 'GraphRAG represents knowledge as entities and relationships. Multi-hop queries traverse graph edges, enabling reasoning like "Who works for the CEO of the company that acquired X?" impossible in flat vector search.' },

  { id: 6008, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Retrieval Strategies', difficulty: 'medium', keywords: ['MMR', 'diversity', 'retrieval', 'max marginal relevance'],
    question: 'Maximum Marginal Relevance (MMR) retrieval helps by:',
    options: { A: 'Maximizing the relevance of each individual retrieved document independently', B: 'Balancing relevance to the query with diversity among retrieved documents to reduce redundancy', C: 'Finding the maximum score across all documents', D: 'Marginalizing out irrelevant documents probabilistically' },
    answer: 'B', explanation: 'MMR iteratively selects documents that are relevant to the query but dissimilar to already-selected documents, ensuring diverse coverage vs. returning 5 copies of the same fact.' },

  { id: 6009, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Data Pipeline', difficulty: 'medium', keywords: ['ETL', 'data pipeline', 'ingestion', 'preprocessing'],
    question: 'A knowledge base ingestion pipeline for RAG typically includes which steps? (Choose two)',
    options: { A: 'Load documents → Clean/normalize → Chunk → Embed → Store in vector DB', B: 'Train a new embedding model on the documents', C: 'Validate chunk quality and test retrieval accuracy on sample queries', D: 'Convert all documents to spoken audio' },
    answer: 'AC', explanation: 'Standard ingestion: load → clean → chunk → embed → store. Quality validation (checking chunks are coherent, retrieval returns relevant results) is essential before production use.' },

  { id: 6010, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Metadata Filtering', difficulty: 'medium', keywords: ['metadata', 'filtering', 'pre-filtering', 'namespace'],
    question: 'Metadata filtering in vector search helps by:',
    options: { A: 'Removing metadata from documents before embedding', B: 'Pre-filtering the search space by attributes (date, category, author) before or after similarity search', C: 'Filtering out low-quality embeddings', D: 'Reducing embedding dimensions using metadata' },
    answer: 'B', explanation: 'Metadata filters (e.g., retrieve only documents from Q4 2024 or category="finance") dramatically reduce the search space, improving both precision and latency.' },

  { id: 6011, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Data Quality', difficulty: 'medium', keywords: ['data quality', 'deduplication', 'noise', 'cleaning'],
    question: 'Why is data quality critical for RAG knowledge bases?',
    options: { A: 'Low-quality data increases embedding dimensions', B: 'Noisy, duplicate, or incorrect data gets retrieved and degrades answer quality — GIGO applies to retrieval too', C: 'Data quality only matters for fine-tuning, not retrieval', D: 'Higher quality data compresses to smaller storage' },
    answer: 'B', explanation: 'GIGO (garbage in, garbage out) applies fully to RAG — if the knowledge base contains errors, contradictions, or noise, the LLM will retrieve and repeat them, degrading answer quality.' },

  { id: 6012, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Contextual Retrieval', difficulty: 'hard', keywords: ['contextual retrieval', 'context', 'chunk context', 'Anthropic'],
    question: 'Anthropic\'s Contextual Retrieval technique improves chunk relevance by:',
    options: { A: 'Using context to determine chunk size dynamically', B: 'Prepending chunk-specific context (its role in the larger document) to each chunk before embedding', C: 'Retrieving context from contextual databases', D: 'Using context windows for storing all chunks simultaneously' },
    answer: 'B', explanation: 'Contextual Retrieval adds a brief explanation of each chunk\'s context ("This section discusses X from Chapter 3 of Y") before embedding, dramatically improving retrieval relevance for isolated chunks.' },

  { id: 6013, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'HNSW', difficulty: 'hard', keywords: ['HNSW', 'ANN', 'graph', 'index'],
    question: 'HNSW (Hierarchical Navigable Small World) is an ANN algorithm that:',
    options: { A: 'Uses a hierarchy of hash tables for retrieval', B: 'Builds a multi-layer proximity graph enabling logarithmic-time approximate nearest neighbor search', C: 'Hierarchically clusters documents by topic', D: 'Uses small-world networks for social graph analysis' },
    answer: 'B', explanation: 'HNSW builds a layered graph where top layers have long-range connections for coarse navigation and bottom layers have fine-grained local connections, enabling O(log N) ANN search.' },

  { id: 6014, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Semantic Search vs Keyword Search', difficulty: 'easy', keywords: ['semantic search', 'keyword', 'TF-IDF', 'BM25'],
    question: 'Semantic search outperforms keyword search (BM25) when:',
    options: { A: 'The query uses exact technical terminology from the documents', B: 'The query intent and document content are related but use different vocabulary (synonyms, paraphrases)', C: 'The documents are very short (under 10 words)', D: 'The search corpus has fewer than 100 documents' },
    answer: 'B', explanation: 'Semantic search excels at matching concepts across vocabulary variations (query: "car accident" matches document: "vehicle collision"). BM25 excels when exact terminology matters.' },

  { id: 6015, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Parent-Child Chunking', difficulty: 'hard', keywords: ['parent-child', 'small-to-big', 'chunk hierarchy'],
    question: 'The parent-child chunking strategy (small-to-big retrieval) works by:',
    options: { A: 'Having parent agents chunk for child agents', B: 'Indexing small child chunks for precision retrieval but returning the larger parent chunk as context to the LLM', C: 'Creating a family tree of related documents', D: 'Chunking parent documents before their child documents' },
    answer: 'B', explanation: 'Small child chunks improve retrieval precision (exact match). But the LLM receives the parent chunk (more context), balancing retrieval accuracy with generation context richness.' },

  { id: 6016, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Query Expansion', difficulty: 'medium', keywords: ['query expansion', 'HyDE', 'hypothetical', 'rewriting'],
    question: 'HyDE (Hypothetical Document Embeddings) improves retrieval by:',
    options: { A: 'Expanding the database with hypothetically generated documents', B: 'Generating a hypothetical ideal answer to the query, then using that answer\'s embedding for retrieval instead of the query\'s', C: 'Hypothetically testing different embedding models', D: 'Expanding the document index with hypothetical synonyms' },
    answer: 'B', explanation: 'HyDE generates a hypothetical "perfect document" answer to the query, then embeds it. This embedding better matches actual document space than the query embedding alone.' },

  { id: 6017, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Data Governance', difficulty: 'medium', keywords: ['data governance', 'PII', 'access control', 'compliance'],
    question: 'When building a RAG knowledge base for a regulated industry, which data governance concerns are critical? (Choose two)',
    options: { A: 'Ensuring PII is identified, redacted, or access-controlled before ingestion', B: 'Maximizing chunk size to reduce the number of embeddings stored', C: 'Implementing access controls so users only retrieve documents they\'re authorized to see', D: 'Using the highest-dimensional embedding model available' },
    answer: 'AC', explanation: 'Regulated data requires PII protection (GDPR, HIPAA) and authorization-aware retrieval — users should not retrieve documents beyond their access level, even via semantic search.' },

  { id: 6018, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Multi-modal RAG', difficulty: 'hard', keywords: ['multi-modal', 'vision', 'image', 'CLIP'],
    question: 'Multi-modal RAG extends traditional text RAG to support:',
    options: { A: 'Multiple concurrent user sessions', B: 'Retrieval and reasoning over mixed content (text, images, tables, charts) using multi-modal embeddings', C: 'Multiple retrieval algorithms running in parallel', D: 'Multiple vector database backends' },
    answer: 'B', explanation: 'Multi-modal RAG uses models like CLIP to embed both text and images in a shared space, enabling retrieval of relevant images/diagrams alongside text for richer answers.' },

  { id: 6019, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Knowledge Base Updates', difficulty: 'medium', keywords: ['incremental update', 're-indexing', 'staleness', 'refresh'],
    question: 'For frequently updated knowledge bases (e.g., news, documentation), the best strategy is:',
    options: { A: 'Re-index the entire knowledge base every hour', B: 'Implement incremental indexing that adds/updates/deletes vectors as source documents change', C: 'Accept staleness and only re-index annually', D: 'Switch to a relational database instead' },
    answer: 'B', explanation: 'Incremental indexing tracks document changes (new, modified, deleted) and updates only affected vectors, balancing freshness against the cost of full re-indexing.' },

  { id: 6020, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Structured Data Agents', difficulty: 'medium', keywords: ['text-to-SQL', 'structured data', 'database', 'NL2SQL'],
    question: 'Text-to-SQL agents enable:',
    options: { A: 'Converting SQL databases to text files', B: 'Natural language querying of relational databases by generating SQL from user questions', C: 'Automatically structuring unstructured text into SQL tables', D: 'Converting SQL queries to NoSQL operations' },
    answer: 'B', explanation: 'Text-to-SQL agents translate natural language queries ("How many customers bought product X last month?") into valid SQL, enabling non-technical users to query databases conversationally.' },
];
