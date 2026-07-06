import { Question } from '../types';

export const domain6scQuestions: Question[] = [
  { id: 6201, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Scenario: RAG Retrieval Failure', difficulty: 'hard', keywords: ['scenario', 'RAG', 'chunking', 'retrieval failure'],
    question: 'Your RAG chatbot for a 500-page technical manual correctly retrieves individual fact sentences but fails when users ask synthesis questions like "Explain the full process for X" that span sections 3, 7, and 12 of the manual. What is the retrieval architecture problem?',
    options: {
      A: 'The context window is too small to hold the full manual',
      B: 'Small chunk size (sentence-level) prevents retrieval of the complete procedure. Fix: use hierarchical indexing — small chunks for precision retrieval + link to larger parent sections. Also add document-level summaries as separate retrievable chunks for synthesis questions',
      C: 'The embedding model does not understand technical content',
      D: 'Increase the number of retrieved chunks from top-3 to top-20'
    },
    answer: 'B',
    explanation: 'Chunking mismatch: sentence-level chunks are great for specific fact lookup but fail for synthesis requiring multiple connected sections. Solutions: (1) Parent-child chunking: retrieve small → return large parent. (2) Section-level summaries as separate embeddings. (3) Query routing: detect synthesis questions → expand retrieval scope. Simply retrieving more chunks often retrieves noise rather than relevant sections.' },

  { id: 6202, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Scenario: Stale Knowledge', difficulty: 'medium', keywords: ['scenario', 'staleness', 'freshness', 'update'],
    question: 'Your internal company policy RAG bot is giving employees outdated policy information because HR updates documents weekly but your knowledge base is re-indexed monthly. Two employees made compliance errors due to stale information. What is the remediation?',
    options: {
      A: 'Add a disclaimer: "Policies may be out of date — verify with HR"',
      B: 'Implement event-driven indexing: configure webhooks or connectors so when HR updates a document in SharePoint/Confluence, the changed document is automatically re-embedded and re-indexed within minutes',
      C: 'Index documents daily instead of monthly',
      D: 'Store the last-updated date and show it to users with each response'
    },
    answer: 'B',
    explanation: 'Monthly re-indexing is unacceptable for frequently changing compliance documents. Event-driven indexing: document updated → webhook fires → indexing pipeline triggered → updated chunk in knowledge base within minutes. Daily batch (Option C) is better than monthly but still allows 24-hour staleness. Showing update dates (Option D) is good UX but doesn\'t fix the root staleness problem.' },

  { id: 6203, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Scenario: Hybrid Search', difficulty: 'medium', keywords: ['scenario', 'BM25', 'hybrid', 'keyword'],
    question: 'Your enterprise knowledge base RAG system performs well on conceptual queries but fails on specific product code lookups like "error code E-4721" or "model number SKU-98234." What retrieval improvement should you make?',
    options: {
      A: 'Re-train the embedding model on your product catalog data',
      B: 'Add BM25 keyword search alongside dense vector search (hybrid retrieval). Exact strings like product codes and error codes are found reliably by BM25, while conceptual queries remain handled by dense retrieval. Combine scores with RRF (Reciprocal Rank Fusion)',
      C: 'Create a separate database for product codes with exact-match lookup',
      D: 'Add product codes as metadata tags and filter by them'
    },
    answer: 'B',
    explanation: 'This is a classic dense vs sparse retrieval failure. Dense embeddings capture semantic similarity but struggle with exact token matches (codes, model numbers, part numbers). BM25 excels at exact string matching. Hybrid search (dense + BM25) via RRF handles both: "error code E-4721" → BM25 finds exact match; "how do I troubleshoot overheating?" → dense finds semantically relevant docs.' },

  { id: 6204, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Scenario: Context Quality', difficulty: 'hard', keywords: ['scenario', 'reranking', 'noise', 'context'],
    question: 'Your RAG system retrieves top-10 chunks but many are only tangentially related to the query. The LLM is getting confused by irrelevant context and producing lower quality answers. What should you add to the pipeline?',
    options: {
      A: 'Reduce retrieval to top-3 chunks to eliminate noise',
      B: 'Add a cross-encoder reranker after initial retrieval: the reranker scores each (query, chunk) pair for relevance and reorders results. Keep only top-3 by reranker score — higher precision context leads to better LLM answers',
      C: 'Increase the LLM context window to process all 10 chunks better',
      D: 'Use a more powerful embedding model for the initial retrieval'
    },
    answer: 'B',
    explanation: 'Two-stage retrieval with reranking: bi-encoder retrieves top-10 candidates quickly → cross-encoder reranks all 10 with high accuracy (joint query-chunk attention) → keep top-3 high-relevance chunks. Cross-encoders (BGE-reranker, Cohere rerank) are too slow to score the full corpus but perfect for reranking a small candidate set. Quality over quantity in context.' },

  { id: 6205, domain: 6, domainName: 'Knowledge Integration & Data', topic: 'Scenario: Knowledge Conflict', difficulty: 'hard', keywords: ['scenario', 'conflict', 'contradiction', 'resolution'],
    question: 'Your enterprise RAG system returns two chunks with contradictory information: one from a 2022 policy document saying "employees get 15 days PTO" and one from a 2024 update saying "employees get 20 days PTO." How should the agent handle this?',
    options: {
      A: 'Return both answers and let the user decide which is correct',
      B: 'The agent should explicitly acknowledge the conflict, cite the source dates, indicate which source is more authoritative/recent, and recommend the user verify with HR: "I found conflicting information: 2022 policy states 15 days but 2024 update states 20 days. The more recent policy likely applies but please confirm with HR."',
      C: 'Always use the most recently indexed document as the authoritative answer',
      D: 'Remove the older conflicting document from the knowledge base automatically'
    },
    answer: 'B',
    explanation: 'Knowledge conflicts require explicit handling rather than silent resolution. The agent should: (1) Surface both sources with dates. (2) Apply heuristics (recency, source authority) to suggest a likely answer. (3) Express uncertainty and recommend verification for high-stakes decisions. Silent resolution (picking one without disclosure) is worse than transparent uncertainty.' },
];
