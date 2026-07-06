import { Question } from '../types';

export const domain4fQuestions: Question[] = [
  { id: 4121, domain: 4, domainName: 'Deployment & Scaling', topic: 'Container Security', difficulty: 'medium', keywords: ['container', 'security', 'rootless', 'OPA'],
    question: 'Running AI agent containers in rootless mode improves security by:',
    options: { A: 'Disabling the root filesystem making it read-only', B: 'Eliminating root privileges inside the container — if the container is compromised, the attacker cannot escalate to host root privileges', C: 'Rootless containers have no performance impact', D: 'Rootless mode is only available in Docker Enterprise' },
    answer: 'B', explanation: 'Rootless containers: process inside runs as unprivileged user (UID 1000) even if container declares root. Container breakout → host access as unprivileged user, not root. Combined with seccomp/AppArmor profiles → defense-in-depth for AI inference containers handling sensitive data.' },

  { id: 4122, domain: 4, domainName: 'Deployment & Scaling', topic: 'Model Artifact Management', difficulty: 'medium', keywords: ['model registry', 'versioning', 'lineage', 'MLflow'],
    question: 'A model registry (MLflow Model Registry, Weights & Biases) tracks:',
    options: { A: 'Only model weights as binary files', B: 'Model versions with metadata: training metrics, dataset versions, hyperparameters, evaluation results — enabling traceability and controlled promotion through staging → production', C: 'Registry tracks only code, not model artifacts', D: 'Model registries are only for traditional ML, not LLM agents' },
    answer: 'B', explanation: 'Model registry: model_v1.2 → {training_data: v3.1, hyperparams: {lr: 1e-4, epochs: 3}, eval_results: {accuracy: 87.3%, faithfulness: 0.94}, promoted_by: "alice@company.com", status: "production"}. Full lineage from experiment → staging → production.' },

  { id: 4123, domain: 4, domainName: 'Deployment & Scaling', topic: 'Inference Caching', difficulty: 'hard', keywords: ['semantic cache', 'exact cache', 'GPTCache', 'latency'],
    question: 'Semantic caching for LLM responses (GPTCache) differs from exact-match caching by:',
    options: { A: 'Semantic caching stores responses in semantic databases', B: 'Using embedding similarity to identify semantically equivalent queries — "What\'s the weather like?" and "How\'s the weather?" retrieve the same cached response', C: 'Semantic caching requires 10x more storage than exact caching', D: 'Semantic caching cannot be used with streaming responses' },
    answer: 'B', explanation: 'Semantic cache: embed query → find similar queries in cache (cosine similarity > 0.95) → return cached response. Hit rate 20-40% vs 5-10% for exact match. Risk: similar queries may genuinely need different answers ("How much does plan A cost?" vs "How much does plan B cost?"). Tune similarity threshold carefully.' },

  { id: 4124, domain: 4, domainName: 'Deployment & Scaling', topic: 'Compliance Deployment', difficulty: 'medium', keywords: ['HIPAA', 'compliance', 'data residency', 'regulated'],
    question: 'Deploying AI agents for healthcare (HIPAA compliance) requires:',
    options: { A: 'Only encrypting data at rest', B: 'BAA with cloud providers, PHI never sent to external LLM APIs, encryption at rest and in transit, audit logs, access controls, and breach notification procedures', C: 'Using only on-premises infrastructure', D: 'Healthcare AI cannot use LLMs due to HIPAA' },
    answer: 'B', explanation: 'HIPAA AI deployment: Business Associate Agreement (BAA) with cloud provider, PHI de-identification before external API calls OR use HIPAA-compliant LLM deployment (Azure OpenAI HIPAA BAA, AWS Bedrock). Audit every PHI access, minimum necessary data principle, 6-year retention of access logs.' },

  { id: 4125, domain: 4, domainName: 'Deployment & Scaling', topic: 'Load Balancing', difficulty: 'medium', keywords: ['load balancer', 'least connections', 'weighted', 'health check'],
    question: 'Least-connections load balancing for AI agent backends is preferable to round-robin because:',
    options: { A: 'It distributes requests alphabetically across backends', B: 'LLM requests have highly variable processing time — long-running requests cause imbalance. Least-connections directs traffic to the backend with fewest active requests', C: 'Round-robin is deprecated in modern load balancers', D: 'Least-connections requires more network overhead' },
    answer: 'B', explanation: 'LLM load imbalance: round-robin sends request 10 to backend 1 even if backend 1 is processing a 2-minute complex task while backend 2 is idle. Least-connections: backend 2 has 0 active connections vs backend 1\'s 5 → route to backend 2 → better throughput.' },

  { id: 4126, domain: 4, domainName: 'Deployment & Scaling', topic: 'Observability Stack', difficulty: 'medium', keywords: ['metrics', 'logs', 'traces', 'Grafana'],
    question: 'The three pillars of AI system observability are:',
    options: { A: 'CPU, memory, and disk usage', B: 'Metrics (aggregated time-series), Logs (discrete events with context), and Traces (request flow across services) — each providing different visibility into system behavior', C: 'Accuracy, latency, and cost', D: 'Development, staging, and production environments' },
    answer: 'B', explanation: 'Observability pillars: Metrics (Prometheus): "token throughput = 1200/sec, p95 latency = 2.3s." Logs (Loki): "ERROR 2024-01-15 14:23:11 [agent] Tool timeout after 30s for user_123." Traces (Jaeger): request → agent → LLM call (800ms) → tool (200ms) → response. Together provide full system understanding.' },

  { id: 4127, domain: 4, domainName: 'Deployment & Scaling', topic: 'API Design for Agents', difficulty: 'medium', keywords: ['idempotency', 'REST', 'API design', 'agent API'],
    question: 'Idempotency keys in AI agent APIs prevent:',
    options: { A: 'Users from submitting duplicate requests', B: 'Duplicate actions from network retries — if a "send email" request is retried due to timeout, the agent checks if it already processed this request ID and doesn\'t send twice', C: 'Idempotency is only needed for payment APIs', D: 'API rate limiting duplicate requests' },
    answer: 'B', explanation: 'Idempotency key: client generates UUID, sends with "send_email" request. Agent stores (idempotency_key, result). If request retried (network timeout): agent finds key → returns cached result → no duplicate email. Critical for irreversible actions: emails, payments, database writes.' },

  { id: 4128, domain: 4, domainName: 'Deployment & Scaling', topic: 'GPU Scheduling', difficulty: 'hard', keywords: ['preemption', 'priority', 'MPS', 'time-slicing'],
    question: 'NVIDIA Multi-Instance GPU (MIG) for inference isolation provides:',
    options: { A: 'Running the same model on multiple GPUs simultaneously', B: 'Hardware-level partitioning of one GPU into up to 7 independent instances with guaranteed isolated compute, memory, and cache resources per tenant', C: 'MIG is only for training workloads', D: 'MIG requires identical workloads across all GPU instances' },
    answer: 'B', explanation: 'MIG on A100/H100: partition one GPU into 1g.5gb to 7g.80gb instances. Each instance: dedicated SM partitions, isolated memory, separate L2 cache. Tenant A\'s inference cannot interfere with Tenant B\'s. QoS guarantees per tenant. Contrast with time-slicing: MIG provides spatial isolation, time-slicing provides temporal.' },

  { id: 4129, domain: 4, domainName: 'Deployment & Scaling', topic: 'Cost Attribution', difficulty: 'medium', keywords: ['cost attribution', 'chargeback', 'tagging', 'FinOps'],
    question: 'Cloud cost attribution for AI workloads using resource tagging enables:',
    options: { A: 'Automatic cost reduction through tag-based optimization', B: 'Chargeback to departments/projects: "Team A\'s chatbot used $12,000 GPU-hours last month" — enabling accountability and data-driven budget decisions', C: 'Tags reduce cloud provider billing rates', D: 'Cost attribution is only relevant for organizations over 1000 employees' },
    answer: 'B', explanation: 'Tag-based attribution: tag all resources with {team: "customer-support", product: "chatbot-v2", environment: "production"} → cloud billing reports → aggregate cost by team/product/env → chargeback to business units → teams make cost-aware decisions about model choice and efficiency.' },

  { id: 4130, domain: 4, domainName: 'Deployment & Scaling', topic: 'Graceful Shutdown', difficulty: 'medium', keywords: ['graceful shutdown', 'SIGTERM', 'drain', 'in-flight'],
    question: 'Graceful shutdown handling for AI agent services should:',
    options: { A: 'Immediately terminate all connections on shutdown signal', B: 'On SIGTERM: stop accepting new requests, complete or checkpoint in-flight agent tasks, drain connections, then exit — ensuring no lost work', C: 'Graceful shutdown is only needed for database services', D: 'Kubernetes handles graceful shutdown automatically without application changes' },
    answer: 'B', explanation: 'Graceful shutdown: SIGTERM received → remove from load balancer (stop new requests) → wait for in-flight requests to complete up to terminationGracePeriodSeconds (e.g., 300s for long agent tasks) → drain cleanly. For multi-step agent tasks: checkpoint current progress to allow resumption on restart.' },
];
