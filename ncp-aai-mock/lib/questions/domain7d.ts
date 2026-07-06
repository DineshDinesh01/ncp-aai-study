import { Question } from '../types';

export const domain7dQuestions: Question[] = [
  { id: 7046, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NIM Customization', difficulty: 'hard', keywords: ['NIM', 'customization', 'PEFT', 'domain adaptation'],
    question: 'NVIDIA NIM supports model customization through:',
    options: { A: 'Full model retraining from scratch only', B: 'LoRA/PEFT adapters via the NeMo Customizer — adapters can be dynamically loaded at inference time without redeploying the base NIM', C: 'Customization is not supported in NIM', D: 'Only prompt engineering, not weight-level customization' },
    answer: 'B', explanation: 'NIM + NeMo Customizer: train LoRA adapter on domain data → adapter weights are compact (MB vs GB for base model) → NIM loads adapters at runtime based on request metadata → single NIM instance serves multiple specialized adapters.' },

  { id: 7047, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Triton Performance Tuning', difficulty: 'hard', keywords: ['Triton', 'dynamic batching', 'instance groups', 'throughput'],
    question: 'Triton Inference Server dynamic batching improves GPU throughput by:',
    options: { A: 'Batching user requests in the application layer before sending to Triton', B: 'Collecting multiple incoming requests within a configurable window and processing them as a single GPU batch, amortizing kernel launch overhead', C: 'Dynamic batching only works with TensorRT backends', D: 'Batching increases latency with no throughput benefit' },
    answer: 'B', explanation: 'Triton dynamic batching: preferred_batch_size: [4, 8, 16] + max_queue_delay_microseconds: 1000 → Triton waits up to 1ms to form a batch. Result: 4-16x GPU utilization improvement for latency-tolerant workloads vs serving single requests.' },

  { id: 7048, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NeMo Curator', difficulty: 'medium', keywords: ['NeMo Curator', 'data quality', 'deduplication', 'filtering'],
    question: 'NeMo Data Curator\'s deduplication capabilities use:',
    options: { A: 'MD5 checksums for exact duplicate detection only', B: 'MinHash LSH for fuzzy near-duplicate detection at scale — identifying semantically similar documents even with minor edits', C: 'Manual review for all deduplication decisions', D: 'Deduplication is not included in NeMo Curator' },
    answer: 'B', explanation: 'NeMo Curator deduplication: MinHash LSH efficiently finds near-duplicates across billion-document corpora. Documents with Jaccard similarity > threshold are de-duplicated — prevents training data memorization and quality degradation from repeated near-identical content.' },

  { id: 7049, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'AgentIQ', difficulty: 'medium', keywords: ['AgentIQ', 'observability', 'profiling', 'agentic'],
    question: 'NVIDIA AgentIQ provides observability for agentic systems through:',
    options: { A: 'GPU-level performance monitoring only', B: 'Workflow-level tracing: tracking agent tool calls, LLM invocations, token usage, latency per step, and success/failure rates across multi-agent pipelines', C: 'AgentIQ only monitors NVIDIA proprietary agents', D: 'AgentIQ requires NIM for operation' },
    answer: 'B', explanation: 'AgentIQ: end-to-end observability for agentic workflows. Traces every agent action, LLM call (tokens, cost, latency), tool execution, and routing decision. Enables identifying bottlenecks in complex multi-agent pipelines regardless of underlying framework.' },

  { id: 7050, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Inference Optimization', difficulty: 'hard', keywords: ['KV cache', 'continuous batching', 'TRT-LLM', 'PagedAttention'],
    question: 'TensorRT-LLM\'s in-flight batching (continuous batching) reduces latency by:',
    options: { A: 'Pre-computing responses for common queries', B: 'Continuously adding new requests to executing batches when sequences complete — maximizing GPU utilization vs waiting for all sequences to finish before accepting new requests', C: 'In-flight batching trades quality for speed', D: 'Batching only applies to offline inference workloads' },
    answer: 'B', explanation: 'In-flight/continuous batching: traditional batching waits for slowest sequence in batch. TRT-LLM continuous batching: when sequence N completes its last token, immediately slot in request N+1 without waiting. Results in 3-5x higher throughput for variable-length LLM workloads.' },

  { id: 7051, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'GPU Memory Management', difficulty: 'hard', keywords: ['GPU memory', 'fragmentation', 'vLLM', 'paging'],
    question: 'PagedAttention (used in vLLM and TensorRT-LLM) addresses GPU memory:',
    options: { A: 'Only applicable to CPU memory management', B: 'Fragmentation from dynamic KV cache sizes — paging allocates KV cache in fixed blocks enabling fine-grained memory sharing across concurrent requests', C: 'PagedAttention reduces memory usage by compressing KV caches', D: 'Only useful for very long sequences over 100K tokens' },
    answer: 'B', explanation: 'PagedAttention: KV cache stored in non-contiguous virtual memory pages (like OS virtual memory). Benefits: different requests can share KV cache pages for shared prefixes (prompt caching), eliminates fragmentation, enables more concurrent sequences per GPU.' },

  { id: 7052, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA AI Enterprise', difficulty: 'medium', keywords: ['NVIDIA AI Enterprise', 'support', 'NVAIE', 'license'],
    question: 'NVIDIA AI Enterprise (NVAIE) licensing provides:',
    options: { A: 'Free access to all NVIDIA AI software', B: 'Enterprise support, security patching, validated containers (NIM, NeMo), and compliance certifications for production AI deployments in regulated industries', C: 'Only access to GPU drivers', D: 'NVAIE is only for cloud deployments' },
    answer: 'B', explanation: 'NVAIE: enterprise software subscription → NIM microservices with SLA support, NeMo framework, Morpheus security AI, validated CSP marketplace listings, 24/7 enterprise support, security CVE patches. Required for regulated industries (healthcare, finance) deploying NVIDIA AI.' },

  { id: 7053, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'cuVS Library', difficulty: 'hard', keywords: ['cuVS', 'vector search', 'FAISS', 'GPU similarity'],
    question: 'cuVS (formerly RAFT) provides GPU-accelerated vector search via:',
    options: { A: 'Only exact nearest neighbor search on GPU', B: 'Approximate nearest neighbor indices (IVF-Flat, IVF-PQ, CAGRA graph-based) running on GPU — 10-100x faster than CPU FAISS for billion-scale vector collections', C: 'cuVS only supports 128-dimensional vectors', D: 'cuVS is limited to NVIDIA A100 GPUs' },
    answer: 'B', explanation: 'cuVS indices: IVF-Flat (exact), IVF-PQ (compressed, approximate), CAGRA (graph-based ANN). CAGRA especially: GPU-optimized graph index that outperforms HNSW on recall/throughput tradeoff for billion-scale use cases.' },

  { id: 7054, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Morpheus AI Security', difficulty: 'medium', keywords: ['Morpheus', 'cybersecurity', 'stream', 'threat detection'],
    question: 'NVIDIA Morpheus AI security framework is optimized for:',
    options: { A: 'Static code analysis for security vulnerabilities', B: 'Real-time streaming cybersecurity: processing network packets, logs, and telemetry through AI models to detect threats at line rate on GPU', C: 'Penetration testing automation', D: 'Morpheus only supports batch processing, not streaming' },
    answer: 'B', explanation: 'Morpheus: GPU-accelerated streaming ML pipeline for cybersecurity. Processes millions of events/second — network flows, syslog, DGA detection — in real-time. Integrates with SIEM/SOAR. Used for insider threat detection, phishing, malware classification at enterprise scale.' },

  { id: 7055, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Multi-GPU Communication', difficulty: 'hard', keywords: ['NCCL', 'AllReduce', 'NVLink', 'distributed'],
    question: 'NCCL (NVIDIA Collective Communications Library) AllReduce operations in distributed training:',
    options: { A: 'Only work with identical GPU models', B: 'Aggregate gradients across all GPUs simultaneously using ring or tree algorithms — essential for data-parallel training across multiple GPUs or nodes', C: 'AllReduce must be triggered manually by the training code', D: 'NCCL AllReduce is only for inference, not training' },
    answer: 'B', explanation: 'NCCL AllReduce: each GPU computes local gradients → NCCL performs ring-reduce across all GPUs → every GPU ends with identical average gradients → synchronized parameter update. Ring algorithm minimizes bandwidth overhead. NVLink provides high-bandwidth for intra-node NCCL.' },
];
