import { Question } from '../types';

export const domain6cQuestions: Question[] = [
  { id: 6041, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Ontology Engineering', difficulty: 'hard', keywords: ['ontology', 'OWL', 'class hierarchy', 'reasoning'],
    question: 'Ontologies in AI knowledge integration provide:',
    options: { A: 'Ontogenetic development tracking for AI models', B: 'Formal representations of domain concepts, their properties, and relationships — enabling logical inference and semantic search', C: 'Object-oriented programming hierarchies for knowledge', D: 'Ontologies are only for academic research, not production AI' },
    answer: 'B', explanation: 'Ontologies (OWL, RDF): define concepts (Product, Customer), properties (hasColor, purchasedBy), and relationships (Product subClassOf Item). Enable: SPARQL queries, logical inference ("all mammals are warm-blooded"), and semantic integration across systems.' },

  { id: 6042, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Data Cleaning', difficulty: 'medium', keywords: ['data cleaning', 'missing values', 'outlier', 'imputation'],
    question: 'Data quality issues that most impact RAG system performance include:',
    options: { A: 'Documents with formal or academic writing style', B: 'Duplicate documents, truncated/corrupted content, and outdated information that conflicts with current knowledge', C: 'Documents containing technical jargon', D: 'Long documents that require more chunking' },
    answer: 'B', explanation: 'RAG quality killers: duplicates (same content retrieved multiple times → wastes context window), truncated content (incomplete sentences confuse LLM), outdated info (model cites stale facts as current). Each degrades answer quality differently.' },

  { id: 6043, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Enterprise Knowledge Graphs', difficulty: 'hard', keywords: ['enterprise KG', 'entity resolution', 'data integration', 'golden record'],
    question: 'Entity resolution in enterprise knowledge graph construction addresses:',
    options: { A: 'Resolving conflicts between enterprise policy and AI agent behavior', B: 'Identifying that "IBM Corp", "International Business Machines", and "IBM" refer to the same entity across different data sources', C: 'Resolving entity permissions for knowledge access', D: 'Enterprise resolution of AI ethics disputes' },
    answer: 'B', explanation: 'Entity resolution (deduplication): same real-world entity has different identifiers across systems. Blocking (candidate pairs) + matching (similarity scoring) + clustering → single canonical entity. Enables unified querying across disparate data sources.' },

  { id: 6044, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Knowledge Freshness', difficulty: 'medium', keywords: ['freshness', 'staleness', 'TTL', 'validity'],
    question: 'Time-to-Live (TTL) metadata on knowledge base entries enables:',
    options: { A: 'Setting limits on how long agents can live', B: 'Automatically flagging or expiring knowledge that may have become stale — prompting re-verification or re-ingestion', C: 'Tracking total time agents have been running', D: 'TTL is only for cache invalidation, not knowledge management' },
    answer: 'B', explanation: 'TTL-based freshness: news articles (TTL: 24 hours), product specs (TTL: 30 days), legal regulations (TTL: yearly review). At TTL expiry: flag for human review or trigger automatic re-crawl and re-embedding. Prevents confident answers based on outdated data.' },

  { id: 6045, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Streaming Data Integration', difficulty: 'hard', keywords: ['streaming', 'Kafka', 'real-time', 'event stream'],
    question: 'Apache Kafka integration with RAG knowledge bases enables:',
    options: { A: 'Kafka is for Java applications only, not AI', B: 'Real-time ingestion pipelines — new events/documents flow through Kafka topics → processed and indexed → available for retrieval within seconds', C: 'Kafka only handles audio/video streaming for RAG', D: 'Batch processing with 24-hour delays' },
    answer: 'B', explanation: 'Kafka → RAG pipeline: publish event → Kafka topic → consumer (embedding service) processes → upserts to vector store → searchable in near-real-time. Enables: support ticket knowledge (index immediately), product update announcements, market data.' },

  { id: 6046, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Query Expansion', difficulty: 'medium', keywords: ['query expansion', 'synonym', 'HyDE', 'reformulation'],
    question: 'HyDE (Hypothetical Document Embeddings) improves retrieval by:',
    options: { A: 'Generating hypothetical answers to expand the query', B: 'Generating a hypothetical document that would answer the query, embedding it, and using that embedding for retrieval — bridging semantic gap between short queries and long documents', C: 'Creating hypothetical user profiles for personalization', D: 'Expanding the vector database with generated documents' },
    answer: 'B', explanation: 'HyDE: LLM generates "if a document answering this question existed, it would say..." → embed the hypothetical document → retrieve based on that embedding. Addresses query-document semantic gap: query "best Python framework" → hypothetical "Flask and Django are popular Python frameworks..."' },

  { id: 6047, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Federated Knowledge', difficulty: 'hard', keywords: ['federated', 'distributed knowledge', 'privacy', 'on-premises'],
    question: 'Federated knowledge retrieval addresses the need to:',
    options: { A: 'Use federal government data in AI systems', B: 'Query knowledge across multiple isolated stores (on-prem, cloud, third-party) without centralizing sensitive data, respecting data residency requirements', C: 'Build knowledge systems using a federation of different AI models', D: 'Distribute knowledge queries across time zones' },
    answer: 'B', explanation: 'Federated retrieval: query plan fans out to multiple knowledge stores (HR system, legal database, internal wiki) → each returns local results → aggregated without centralizing sensitive data. Addresses: data governance, privacy, and regulatory constraints.' },

  { id: 6048, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Named Entity Recognition', difficulty: 'medium', keywords: ['NER', 'entity extraction', 'spaCy', 'transformer'],
    question: 'Named Entity Recognition (NER) in knowledge pipeline preprocessing:',
    options: { A: 'Recognizes famous named entities like celebrities', B: 'Identifies and classifies entities (persons, organizations, locations, dates) enabling structured metadata for better retrieval filtering', C: 'Names and registers new entities in the knowledge base', D: 'NER is only useful for multilingual knowledge bases' },
    answer: 'B', explanation: 'NER for RAG: "Apple acquired Instagram for $1B in 2012" → entities: {org: Apple, org: Instagram, money: $1B, date: 2012}. Filter retrieval: "show me Apple acquisitions" → filter on entity=Apple + type=acquisition. Structured metadata enhances vector search.' },

  { id: 6049, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Data Schema Mapping', difficulty: 'medium', keywords: ['schema mapping', 'data integration', 'heterogeneous', 'translation'],
    question: 'Schema mapping in multi-source knowledge integration solves:',
    options: { A: 'Creating visual maps of data schema relationships', B: 'Translating between different data schemas — "customer_id" in CRM maps to "client_number" in billing system — enabling unified queries across disparate data sources', C: 'Mapping data to geographical schemas', D: 'Schema mapping is only needed for database migrations' },
    answer: 'B', explanation: 'Schema mapping: source A has {firstName, lastName}, source B has {full_name} → mapping: full_name = firstName + " " + lastName. Enables unified knowledge integration without changing source systems. Critical for enterprise multi-system agents.' },

  { id: 6050, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Knowledge Conflict Resolution', difficulty: 'hard', keywords: ['conflict resolution', 'contradictions', 'truth', 'source credibility'],
    question: 'When multiple knowledge sources disagree in RAG (source A says X, source B says Y), the agent should:',
    options: { A: 'Always prefer the most recent source', B: 'Surface the disagreement, assess source credibility/recency, present both views with attribution, and recommend verification for critical decisions', C: 'Randomly select one source to avoid bias', D: 'Average the two claims mathematically' },
    answer: 'B', explanation: 'Knowledge conflicts: surface them explicitly ("Source A (2023 regulatory doc) says X. Source B (2024 legal opinion) says Y. The conflict may reflect regulatory changes."). Never silently pick one. Credibility, recency, and source type should guide, not determine.' },

  { id: 6051, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Agentic Data Pipelines', difficulty: 'medium', keywords: ['ETL', 'pipeline', 'orchestration', 'Airflow'],
    question: 'AI-powered ETL pipelines using LLM agents improve traditional ETL by:',
    options: { A: 'Replacing all human data engineers', B: 'Handling unstructured transformations (extract entities from text, classify documents, generate summaries) that rule-based ETL cannot express', C: 'Making ETL pipelines faster through parallelization', D: 'LLM ETL only works with text data, not structured data' },
    answer: 'B', explanation: 'Agentic ETL: LLM agent step in pipeline can: classify incoming documents, extract structured data from free-text fields, translate between schemas, generate data quality reports. Complements rule-based ETL with ML-powered intelligence.' },

  { id: 6052, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Document Intelligence', difficulty: 'medium', keywords: ['document AI', 'form extraction', 'PDF', 'OCR'],
    question: 'Multi-modal document AI (vision + language) improves knowledge extraction from PDFs by:',
    options: { A: 'Converting all PDFs to plain text first', B: 'Processing layout, tables, figures, and text together — preserving document structure that\'s lost in text extraction (table row/column relationships, figure captions)', C: 'Multi-modal is only needed for image-heavy documents', D: 'OCR is sufficient for all PDF types' },
    answer: 'B', explanation: 'Multi-modal PDF processing: layout-aware models (LayoutLM, Donut) understand that text in adjacent cells of a table are related. Pure OCR/text extraction loses: table structure, figure-caption associations, and header-content relationships.' },

  { id: 6053, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Knowledge Graph Embeddings', difficulty: 'hard', keywords: ['TransE', 'RotatE', 'knowledge graph embedding', 'link prediction'],
    question: 'Knowledge graph embedding models (TransE, RotatE) enable:',
    options: { A: 'Embedding knowledge in the model\'s weights during pre-training', B: 'Vector representations of entities and relations enabling: link prediction (completing missing facts), similarity search, and integration with neural models', C: 'Graph embedding visualization for knowledge exploration', D: 'Only applicable to small, manually curated knowledge graphs' },
    answer: 'B', explanation: 'KG embeddings: each entity/relation → dense vector. TransE: head + relation ≈ tail. Enables: "complete this fact" (link prediction), "find similar entities", and integration with RAG (retrieve via embedding similarity across KG entities).' },

  { id: 6054, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Relevance Feedback', difficulty: 'medium', keywords: ['relevance feedback', 'Rocchio', 'query refinement', 'interactive'],
    question: 'Explicit relevance feedback in RAG systems (user marks relevant/irrelevant results) enables:',
    options: { A: 'Training a new retrieval model from user feedback', B: 'Query refinement — moving query embedding toward relevant results and away from irrelevant ones for improved retrieval on subsequent queries', C: 'Feedback is stored but not used in the current session', D: 'Relevance feedback requires collecting data from many users' },
    answer: 'B', explanation: 'Rocchio-style query refinement: new_query = α×original + β×Σrelevant - γ×Σirrelevant. User marks 2 retrieved docs as relevant, 1 as irrelevant → refined query embedding → better retrieval. In-session personalization without model retraining.' },

  { id: 6055, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Data Governance', difficulty: 'medium', keywords: ['data governance', 'catalog', 'lineage', 'compliance'],
    question: 'Data catalogs (DataHub, Apache Atlas) support AI agent knowledge systems by:',
    options: { A: 'Cataloging AI models for discovery', B: 'Providing discoverable, governed metadata about available data assets — agents can understand what data exists, its quality, lineage, and access permissions', C: 'Creating printed catalogs of data for offline access', D: 'Data catalogs are only for data science teams, not AI agents' },
    answer: 'B', explanation: 'Data catalogs for agents: "what datasets are available?" → catalog provides: schema, quality metrics, data lineage (where did it come from?), ownership, and access controls. Enables agents to self-discover data sources and understand data context.' },

  { id: 6056, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Cross-Lingual Retrieval', difficulty: 'hard', keywords: ['multilingual', 'cross-lingual', 'LASER', 'mBERT'],
    question: 'Cross-lingual retrieval (query in English, retrieve Spanish documents) requires:',
    options: { A: 'Translating all documents to English before indexing', B: 'Multilingual embeddings (mE5, LaBSE) that map semantically similar text to nearby vectors regardless of language', C: 'Running separate retrievers per language', D: 'Cross-lingual retrieval is not yet technically feasible' },
    answer: 'B', explanation: 'Multilingual embeddings: English "bank failure" and Spanish "quiebra bancaria" → similar embedding vectors. Single multilingual vector index supports queries in any language retrieving documents in any other language without translation.' },

  { id: 6057, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Contextual Compression', difficulty: 'medium', keywords: ['contextual compression', 'extractive', 'abstractive', 'LLM compress'],
    question: 'LLM-based contextual compression of retrieved documents:',
    options: { A: 'Compresses documents using standard compression algorithms', B: 'Extracts only the portion of each retrieved document relevant to the specific query, reducing context noise and token usage', C: 'Compresses all documents before indexing to save storage', D: 'Only removes stopwords from retrieved text' },
    answer: 'B', explanation: 'Contextual compression: query="NVIDIA A100 specs" + retrieved doc (full product page) → LLM extracts only the A100 spec section. Instead of injecting the full 2000-token page, inject the relevant 200-token excerpt. Cleaner context → better generation.' },

  { id: 6058, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Domain Adaptation', difficulty: 'hard', keywords: ['domain adaptation', 'vocabulary', 'embeddings', 'specialized'],
    question: 'Domain-specific embedding models (BioBERT for medicine, LegalBERT for law) outperform general models because:',
    options: { A: 'They are larger in parameter count', B: 'Specialized vocabulary and semantic relationships learned from domain-specific corpora better capture domain meaning (e.g., medical symptom-disease relationships)', C: 'They use different tokenization algorithms', D: 'General models don\'t work at all in specialized domains' },
    answer: 'B', explanation: 'BioBERT: trained on PubMed abstracts → understands "myocardial infarction" ≈ "heart attack", drug-interaction patterns. General BERT misses these domain-specific semantic relationships. For medical/legal/code RAG, domain-specific embeddings meaningfully improve retrieval.' },

  { id: 6059, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Dynamic Knowledge', difficulty: 'medium', keywords: ['dynamic knowledge', 'ephemeral', 'session', 'transient'],
    question: 'Session-level ephemeral knowledge in RAG agents stores:',
    options: { A: 'Session-specific sensitive data that must be deleted', B: 'Information shared or discovered during the current session — preferences, constraints, context — that augments the persistent knowledge base for this interaction only', C: 'Ephemeral means temporary copies of the full knowledge base', D: 'Session tokens for authentication only' },
    answer: 'B', explanation: 'Session knowledge: "User mentioned they need results in EUR (not USD) and prefer concise answers." Store this session-specific context → inject into subsequent retrievals and generation without polluting the persistent knowledge base.' },

  { id: 6060, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Knowledge Distillation for RAG', difficulty: 'hard', keywords: ['distillation', 'compression', 'knowledge', 'efficient retrieval'],
    question: 'Distilling knowledge from a large corpus into compact retrieval-optimized summaries provides:',
    options: { A: 'The same result as standard chunking but with less storage', B: 'Condensed, query-optimized representations that surface key facts faster than retrieving and reading full documents at query time', C: 'Only applicable when the knowledge base exceeds 1TB', D: 'Distillation removes precision and should be avoided' },
    answer: 'B', explanation: 'Knowledge distillation for RAG: pre-process corpus → generate summaries optimized for retrieval ("Key facts: X, Y, Z") → index summaries alongside full docs. At query time: retrieve summaries first for context, full docs for detail when needed.' },
];
