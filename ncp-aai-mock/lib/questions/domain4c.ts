import { Question } from '../types';

export const domain4cQuestions: Question[] = [
  { id: 4061, domain: 4, domainName: 'Deployment & Scaling', topic: 'Service Mesh', difficulty: 'hard', keywords: ['Istio', 'Envoy', 'service mesh', 'sidecar'],
    question: 'Istio service mesh provides value for AI agent deployments by:',
    options: { A: 'Providing AI-specific inference optimization', B: 'Handling cross-cutting concerns (mTLS, traffic management, observability, circuit breaking) transparently via sidecar proxies', C: 'Replacing Kubernetes for container orchestration', D: 'Providing GPU-accelerated networking' },
    answer: 'B', explanation: 'Istio sidecar (Envoy): every AI agent pod gets a proxy that handles: mutual TLS between services, traffic splitting (canary), distributed tracing, retries/circuit breakers — without changing application code.' },

  { id: 4062, domain: 4, domainName: 'Deployment & Scaling', topic: 'FinOps for AI', difficulty: 'medium', keywords: ['FinOps', 'cloud cost', 'optimization', 'GPU cost'],
    question: 'Reserved Instances vs Spot/Preemptible instances for AI agent GPU workloads:',
    options: { A: 'Always use Spot for lowest cost regardless of workload type', B: 'Use Reserved for baseline predictable load (60-70% savings), Spot for batch/fault-tolerant workloads (90% savings)', C: 'Always use On-Demand for reliability', D: 'Reserved instances are never cost-effective for AI' },
    answer: 'B', explanation: 'GPU FinOps: Reserve baseline capacity (1-3 year commitment, large discount) + Spot instances for elastic burst. Training jobs are ideal for Spot (can checkpoint and resume). Inference SLA requirements → On-Demand/Reserved baseline.' },

  { id: 4063, domain: 4, domainName: 'Deployment & Scaling', topic: 'Deployment Automation', difficulty: 'medium', keywords: ['IaC', 'Terraform', 'Pulumi', 'infrastructure'],
    question: 'Infrastructure as Code (Terraform/Pulumi) for AI deployments provides:',
    options: { A: 'Automated infrastructure quality testing', B: 'Reproducible, version-controlled infrastructure that can be reviewed, tested, and rolled back like application code', C: 'Automatic cost optimization of cloud resources', D: 'GPU driver management and updates' },
    answer: 'B', explanation: 'IaC for AI: define GPU cluster, NIM deployments, networking, and monitoring as code → check into git → review infrastructure changes in PRs → automated provisioning → rollback by reverting git commit. Infrastructure as code, not manual clicks.' },

  { id: 4064, domain: 4, domainName: 'Deployment & Scaling', topic: 'GPU Cluster Management', difficulty: 'hard', keywords: ['Slurm', 'Kubernetes', 'GPU scheduling', 'cluster'],
    question: 'NVIDIA GPU Operator for Kubernetes automates:',
    options: { A: 'Operating GPU hardware maintenance and repairs', B: 'Installing and managing GPU drivers, CUDA, device plugins, and GPU Feature Discovery on Kubernetes nodes', C: 'Scheduling GPU jobs across cloud providers', D: 'Monitoring GPU temperatures and throttling workloads' },
    answer: 'B', explanation: 'GPU Operator: deploys all required GPU software components as Kubernetes resources — NVIDIA drivers, container toolkit, device plugin (exposes GPUs as schedulable resources), DCGM exporter (metrics), and GFD (feature discovery). One operator to manage all.' },

  { id: 4065, domain: 4, domainName: 'Deployment & Scaling', topic: 'Model Registry', difficulty: 'medium', keywords: ['model registry', 'MLflow', 'versioning', 'lineage'],
    question: 'A model registry for AI agents should track:',
    options: { A: 'Only model file storage locations', B: 'Model artifacts, training data versions, hyperparameters, evaluation metrics, lineage (derived from which base model), and deployment history', C: 'Only production-deployed models', D: 'Registration of AI models with government bodies' },
    answer: 'B', explanation: 'Model registry (MLflow, Weights & Biases): complete artifact provenance — model file + training data version + hyperparams + eval metrics + parent model. Enables: "which model is in production?", "how was it trained?", "which data did it use?"' },

  { id: 4066, domain: 4, domainName: 'Deployment & Scaling', topic: 'Distributed Inference', difficulty: 'hard', keywords: ['tensor parallelism', 'pipeline parallelism', 'distributed', 'multi-GPU'],
    question: 'Pipeline parallelism for LLM inference distributes work by:',
    options: { A: 'Splitting different requests across different GPUs', B: 'Partitioning model layers across GPUs — GPU 1 processes layers 1-8, GPU 2 processes 9-16, etc., with data flowing as a pipeline', C: 'Running the same model on each GPU for redundancy', D: 'Distributing vector operations across GPU cores' },
    answer: 'B', explanation: 'Pipeline parallelism: layer partitioning across GPUs. Micro-batching fills the pipeline: while GPU 2 processes batch 1 (layers 9-16), GPU 1 starts batch 2 (layers 1-8). Enables models larger than single GPU memory.' },

  { id: 4067, domain: 4, domainName: 'Deployment & Scaling', topic: 'Serverless AI', difficulty: 'medium', keywords: ['serverless', 'Lambda', 'cold start', 'event-driven'],
    question: 'The primary challenge of deploying AI agents on serverless functions (AWS Lambda, Google Cloud Functions) is:',
    options: { A: 'Serverless doesn\'t support Python', B: 'Cold start latency (model loading time) making first-request latency unacceptably high for interactive use cases', C: 'Serverless is too expensive for any AI workload', D: 'Serverless cannot connect to external APIs' },
    answer: 'B', explanation: 'Serverless cold starts: loading model weights from disk on first invocation takes 5-60 seconds. Solutions: provisioned concurrency (keep warm), lightweight agents using API-based LLMs (no local model loading), or accept cold starts for batch workloads.' },

  { id: 4068, domain: 4, domainName: 'Deployment & Scaling', topic: 'Traffic Management', difficulty: 'medium', keywords: ['load balancing', 'weighted routing', 'sticky session', 'traffic'],
    question: 'Sticky sessions (session affinity) in AI agent load balancing:',
    options: { A: 'Always route requests from the same user to the same agent instance', B: 'Route all requests from the same session to the same stateful agent instance, useful when agents maintain in-memory session state', C: 'Make sessions persistent across agent restarts', D: 'Sticky sessions degrade performance and should always be avoided' },
    answer: 'B', explanation: 'Sticky sessions: when agent maintains non-shared in-memory state (conversation history, loaded documents), route same user to same instance. Drawback: uneven load distribution. Better: externalize state to Redis → stateless → any instance.' },

  { id: 4069, domain: 4, domainName: 'Deployment & Scaling', topic: 'A/B Testing Infrastructure', difficulty: 'medium', keywords: ['A/B testing', 'experimentation', 'shadow mode', 'traffic split'],
    question: 'Shadow mode deployment for new AI agent versions:',
    options: { A: 'Deploys the new agent to shadow environments only', B: 'Routes production traffic to both old and new agent, but only serves old responses to users — new agent runs silently for comparison', C: 'Deploys at night (shadow time) to avoid user impact', D: 'Uses a shadow copy of production data for testing' },
    answer: 'B', explanation: 'Shadow mode: production traffic mirrored to new agent version. New agent processes requests and generates responses, but users only see old agent responses. Compare outputs offline to validate quality before any live traffic cutover.' },

  { id: 4070, domain: 4, domainName: 'Deployment & Scaling', topic: 'Storage for AI', difficulty: 'medium', keywords: ['object storage', 'model weights', 'S3', 'storage'],
    question: 'Object storage (S3/GCS/Azure Blob) for AI model weights in production should use:',
    options: { A: 'Lowest storage tier (glacier/archive) to minimize cost', B: 'Standard or Infrequent Access tiers with versioning enabled and cross-region replication for disaster recovery', C: 'Local SSDs exclusively for maximum throughput', D: 'Database storage for structured metadata only' },
    answer: 'B', explanation: 'Production model storage: Standard tier (fast access for downloads), versioning (rollback to previous model), cross-region replication (DR), lifecycle policies (move old versions to cheaper tiers). Balance cost, availability, and recovery speed.' },

  { id: 4071, domain: 4, domainName: 'Deployment & Scaling', topic: 'Blue-Green Deployment', difficulty: 'medium', keywords: ['blue-green', 'deployment', 'switchover', 'rollback'],
    question: 'Blue-green deployment for AI agents enables:',
    options: { A: 'Colorful dashboards for monitoring agent health', B: 'Zero-downtime deployment by maintaining two identical production environments and instantly switching traffic between them', C: 'Staging blue agents before promoting to production green agents', D: 'Running two different agent models simultaneously for redundancy' },
    answer: 'B', explanation: 'Blue-green: blue (current production), green (new version) deployed and tested → switch traffic instantly (DNS or load balancer change) → if issues, switch back instantly. Full rollback in seconds vs redeployment taking minutes.' },

  { id: 4072, domain: 4, domainName: 'Deployment & Scaling', topic: 'Multi-Region AI', difficulty: 'hard', keywords: ['multi-region', 'global', 'latency', 'data residency'],
    question: 'Multi-region AI agent deployments must handle:',
    options: { A: 'Only the cost of running in multiple regions', B: 'Data residency compliance, model/data synchronization across regions, and routing users to the nearest region for latency', C: 'Translating requests to local languages automatically', D: 'Multi-region is only needed for consumer applications' },
    answer: 'B', explanation: 'Multi-region challenges: data residency (EU data stays in EU per GDPR), synchronization (model updates propagated to all regions), and latency routing (Route53 latency-based → nearest deployment). Each region may need separate model deployments for compliance.' },

  { id: 4073, domain: 4, domainName: 'Deployment & Scaling', topic: 'Kubernetes HPA', difficulty: 'medium', keywords: ['HPA', 'autoscaling', 'custom metrics', 'Kubernetes'],
    question: 'Kubernetes Horizontal Pod Autoscaler (HPA) with custom metrics for AI agents can scale based on:',
    options: { A: 'Only CPU and memory utilization', B: 'Custom metrics like LLM request queue depth, average response latency, or token throughput exposed via Prometheus', C: 'Only when manually triggered by operators', D: 'GPU memory utilization only' },
    answer: 'B', explanation: 'Custom HPA metrics for AI: expose `llm_queue_depth` or `avg_response_latency_ms` via Prometheus → KEDA or metrics-server → HPA scales pods when queue depth > N. More relevant than CPU for LLM workloads.' },

  { id: 4074, domain: 4, domainName: 'Deployment & Scaling', topic: 'Content Delivery', difficulty: 'medium', keywords: ['CDN', 'edge caching', 'API caching', 'static assets'],
    question: 'Semantic caching for AI agent APIs (vs traditional response caching) caches:',
    options: { A: 'All responses by exact request match', B: 'Responses by semantic similarity of queries — "how do I reset password" and "forgot password process" return the same cached response', C: 'Only static content like images and CSS', D: 'Responses cached in a CDN by geographic location' },
    answer: 'B', explanation: 'Semantic caching: embed query → nearest neighbor search in cache → if similar enough query found, return cached response. Handles paraphrase variations that exact-match caching misses. Significantly reduces LLM API calls for common queries.' },

  { id: 4075, domain: 4, domainName: 'Deployment & Scaling', topic: 'Container Security', difficulty: 'hard', keywords: ['container security', 'image scanning', 'rootless', 'security context'],
    question: 'Security best practices for AI agent containers include:',
    options: { A: 'Running containers as root for full permissions', B: 'Non-root user, read-only filesystem, dropped capabilities, and image scanning for known CVEs before deployment', C: 'Using the latest base image tag without pinning versions', D: 'Sharing credentials via environment variables only' },
    answer: 'B', explanation: 'Container security: USER 1000 (non-root), readOnlyRootFilesystem: true, capabilities: drop [ALL], securityContext.runAsNonRoot: true, image SHA pinning (not tags), and Trivy/Grype scanning in CI pipeline.' },

  { id: 4076, domain: 4, domainName: 'Deployment & Scaling', topic: 'Deployment Testing', difficulty: 'medium', keywords: ['smoke test', 'canary test', 'deployment validation', 'health check'],
    question: 'Post-deployment smoke tests for AI agents should verify:',
    options: { A: 'All features work identically to the previous version', B: 'Core happy-path functionality (can the agent respond to a basic query?), integration health (LLM API reachable?), and absence of obvious regressions', C: 'Complete end-to-end test suite execution', D: 'Smoke tests are only for physical hardware' },
    answer: 'B', explanation: 'Smoke tests: lightweight, fast (< 5 min), run immediately post-deployment. Test: "ping" health endpoint, send sample query, verify LLM API connectivity, check tool availability. Catch catastrophic failures before routing real traffic.' },

  { id: 4077, domain: 4, domainName: 'Deployment & Scaling', topic: 'Edge Deployment', difficulty: 'hard', keywords: ['edge', 'on-device', 'quantization', 'embedded'],
    question: 'Deploying LLM agents at the edge (on-device, IoT) requires:',
    options: { A: 'Full-size models with cloud offloading for all inference', B: 'Aggressive quantization (INT4/INT8), model pruning, and knowledge distillation to fit models within edge device memory constraints', C: 'Edge devices can only run rule-based systems, not LLMs', D: 'On-device deployment is not possible for LLMs' },
    answer: 'B', explanation: 'Edge LLM deployment: 4-bit quantization → 7B model fits in 4GB RAM; pruning → remove unimportant weights; distillation → small student learns from large teacher. Llama.cpp, ONNX Runtime, and TFLite enable mobile/edge LLM deployment.' },

  { id: 4078, domain: 4, domainName: 'Deployment & Scaling', topic: 'SLO Definition', difficulty: 'medium', keywords: ['SLO', 'SLI', 'SLA', 'availability'],
    question: 'For an AI agent API, a realistic SLO set includes:',
    options: { A: '100% availability and < 100ms response time at all times', B: '99.9% availability, p95 latency < 5s, p99 < 30s, error rate < 0.1%', C: 'SLOs only apply to traditional software, not AI systems', D: 'Response quality is the only SLO that matters' },
    answer: 'B', explanation: 'AI agent SLOs: availability (99.9% = 8.7 hr/year downtime), latency percentiles (p95, p99 — LLMs are slow, adjust targets accordingly), and error rate. Different from traditional APIs: LLM latency is 1-30s not ms.' },

  { id: 4079, domain: 4, domainName: 'Deployment & Scaling', topic: 'Dependency Management in Deployment', difficulty: 'medium', keywords: ['pinning', 'lockfile', 'reproducibility', 'dependency'],
    question: 'Pinning exact dependency versions in AI agent deployments prevents:',
    options: { A: 'Developers from updating dependencies', B: 'Unexpected behavior changes when transitive dependency updates change model loading, API behaviors, or tool functionality', C: 'Security patches from being applied', D: 'Version pinning is only relevant for neural network frameworks' },
    answer: 'B', explanation: 'Dependency pinning: pin exact versions (requirements.txt with ==, pyproject.toml with exact), use lockfiles (poetry.lock, pip-compile output). A transformers library minor update can change model output behavior unexpectedly.' },

  { id: 4080, domain: 4, domainName: 'Deployment & Scaling', topic: 'Deployment Documentation', difficulty: 'easy', keywords: ['deployment docs', 'runbook', 'changelog', 'release notes'],
    question: 'Deployment changelogs for AI agents should capture:',
    options: { A: 'Only technical code changes', B: 'Model version changes, prompt modifications, tool additions/removals, configuration changes, and expected behavior changes for each release', C: 'Bug fixes only, not feature additions', D: 'Deployment notes are optional for AI systems' },
    answer: 'B', explanation: 'AI deployment changelog: model version (llama-3.2 → llama-3.3), prompt changes, new/removed tools, configuration tweaks, expected behavior changes, and rollback instructions. Critical when debugging regressions to find what changed.' },

  { id: 4081, domain: 4, domainName: 'Deployment & Scaling', topic: 'Managed AI Services', difficulty: 'easy', keywords: ['managed service', 'API', 'vertex AI', 'bedrock'],
    question: 'Using managed LLM APIs (OpenAI, Anthropic, Google Vertex AI) vs self-hosting models for production agents:',
    options: { A: 'Managed APIs are always cheaper for high-volume use', B: 'Managed APIs provide lower operational overhead and faster time-to-market; self-hosting provides data privacy, lower per-token cost at scale, and customization', C: 'Self-hosting is always required for enterprise deployments', D: 'There is no cost difference between managed and self-hosted' },
    answer: 'B', explanation: 'Trade-off: Managed APIs → no infrastructure, pay-per-token, latest models, SLA provided, but: data leaves your environment, higher marginal cost at scale. Self-hosted → data stays internal, cheaper at high volume, but significant operational burden.' },

  { id: 4082, domain: 4, domainName: 'Deployment & Scaling', topic: 'GPU Sharing', difficulty: 'hard', keywords: ['MIG', 'GPU sharing', 'Multi-Instance GPU', 'vGPU'],
    question: 'NVIDIA MIG (Multi-Instance GPU) allows:',
    options: { A: 'Multiple agents to share one GPU memory bank', B: 'Partitioning a single H100/A100 GPU into up to 7 isolated instances, each with dedicated memory and compute — perfect for hosting multiple small models', C: 'GPU migration between physical hosts without interruption', D: 'Migrating from CPU to GPU computation automatically' },
    answer: 'B', explanation: 'MIG: H100 → up to 7 isolated GPU instances (each with slice of memory/compute). Instance 1 hosts NIM-A (7B model), Instance 2 hosts NIM-B (embedding model) — hardware-isolated, preventing one model from impacting another.' },

  { id: 4083, domain: 4, domainName: 'Deployment & Scaling', topic: 'Log Management', difficulty: 'medium', keywords: ['ELK', 'Loki', 'centralized logging', 'aggregation'],
    question: 'Centralized log aggregation for distributed AI agent systems (ELK, Grafana Loki) provides:',
    options: { A: 'Automatic log compression for cost savings only', B: 'Single pane of glass for searching across all agent instances — correlating logs from multiple pods by request ID to trace an issue', C: 'Log management only needed for compliance purposes', D: 'Replaces application-level logging' },
    answer: 'B', explanation: 'Centralized logging: multiple agent pods → ship logs to Loki/Elasticsearch → query all logs for request_id=X to see the full trace across all services that handled request X. Essential for distributed system debugging.' },

  { id: 4084, domain: 4, domainName: 'Deployment & Scaling', topic: 'Security Scanning', difficulty: 'medium', keywords: ['SAST', 'DAST', 'dependency scanning', 'pipeline'],
    question: 'Security scanning in CI/CD pipelines for AI agent code should include:',
    options: { A: 'Only manual code review by security team', B: 'SAST (static analysis for code vulnerabilities), dependency scanning (known CVEs in packages), and secret scanning (no credentials in code)', C: 'Security scanning is only needed for payment processing code', D: 'AI-specific security tools only, not general software security' },
    answer: 'B', explanation: 'AI agent security scanning pipeline: SAST (Bandit for Python, ESLint security rules) → dependency check (Snyk, Dependabot CVEs) → secret scanning (detect API keys in code) → container scanning (Trivy) → all automated in CI.' },

  { id: 4085, domain: 4, domainName: 'Deployment & Scaling', topic: 'Production Readiness', difficulty: 'medium', keywords: ['production readiness', 'checklist', 'review', 'launch criteria'],
    question: 'A production readiness review for AI agents should verify:',
    options: { A: 'Only that the feature is complete', B: 'Observability (logging/metrics/tracing), runbooks, failure mode testing, security review, load testing, and rollback procedures', C: 'Only automated test coverage', D: 'Business value only — technical readiness is the engineer\'s responsibility' },
    answer: 'B', explanation: 'PRR checklist for AI agents: ✓ Observability (can we debug production issues?) ✓ Runbooks (team knows how to operate) ✓ Load tested (survives peak traffic?) ✓ Security reviewed ✓ On-call trained ✓ Rollback tested. Not just "does it work?"' },

  { id: 4086, domain: 4, domainName: 'Deployment & Scaling', topic: 'Networking for AI', difficulty: 'medium', keywords: ['VPC', 'private link', 'network isolation', 'egress'],
    question: 'Restricting AI agent outbound network access (egress) in production serves to:',
    options: { A: 'Reduce network costs', B: 'Prevent data exfiltration by compromised agents — limiting to known API endpoints blocks an attacker from using the agent to leak data', C: 'Improve LLM response speed by reducing network hops', D: 'Egress restriction is not necessary for AI agents' },
    answer: 'B', explanation: 'Egress control: allowlist only required endpoints (LLM API, tool APIs) → block all other outbound. If a prompt injection compromises the agent, it can\'t phone home to attacker endpoints or exfiltrate data to unauthorized destinations.' },

  { id: 4087, domain: 4, domainName: 'Deployment & Scaling', topic: 'AI Platform Services', difficulty: 'medium', keywords: ['BentoML', 'Ray Serve', 'model serving', 'platform'],
    question: 'Ray Serve for AI agent deployment provides:',
    options: { A: 'A restaurant service for AI engineers', B: 'Python-native serving framework with built-in autoscaling, batching, and the ability to serve multi-model inference pipelines (agent + embedding + reranker)', C: 'Only model serving without application logic', D: 'Ray Serve is only for training, not serving' },
    answer: 'B', explanation: 'Ray Serve: serves Python code (including complex agent pipelines) with: autoscaling, batching, multi-model composition, and native Python without HTTP adapter boilerplate. Ideal for agentic pipelines that aren\'t pure model inference.' },

  { id: 4088, domain: 4, domainName: 'Deployment & Scaling', topic: 'Database Connection Pooling', difficulty: 'medium', keywords: ['connection pooling', 'PgBouncer', 'database', 'connections'],
    question: 'Connection pooling for AI agent database access is critical because:',
    options: { A: 'Agents need persistent database connections for state', B: 'Each LLM request may spawn multiple database queries; without pooling, connection overhead and limits become bottlenecks at scale', C: 'Pooling improves query execution speed', D: 'Connection pooling is only needed for high-traffic traditional web apps' },
    answer: 'B', explanation: 'AI agent at scale: 100 concurrent users × each agent opens DB connection = 100 connections → PostgreSQL max_connections exhausted. PgBouncer: pool of 20 connections serves 100+ agent instances by queuing and reusing connections.' },

  { id: 4089, domain: 4, domainName: 'Deployment & Scaling', topic: 'Deployment Metrics', difficulty: 'medium', keywords: ['DORA', 'deployment frequency', 'lead time', 'MTTR'],
    question: 'DORA metrics for AI agent teams measure deployment health via:',
    options: { A: 'Data, Operations, Resources, and Architecture metrics', B: 'Deployment Frequency, Lead Time for Changes, Change Failure Rate, and MTTR — measuring speed and stability of delivery', C: 'Development Operations Reliability Assessment scores', D: 'DORA metrics only apply to traditional software, not AI' },
    answer: 'B', explanation: 'DORA for AI agents: Deployment Frequency (how often do you ship?), Lead Time (idea to production), Change Failure Rate (what % of deployments cause incidents?), MTTR (how fast do you recover?). Elite teams deploy multiple times daily.' },

  { id: 4090, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scaling Strategies', difficulty: 'hard', keywords: ['vertical scaling', 'horizontal scaling', 'scale-up', 'scale-out'],
    question: 'For LLM inference serving, horizontal scaling (more instances) is preferred over vertical scaling (bigger GPU) because:',
    options: { A: 'Bigger GPUs can\'t run LLMs due to memory limitations', B: 'Horizontal scaling provides availability redundancy, elastic capacity, and near-linear throughput increase; vertical has diminishing returns and creates a single point of failure', C: 'Horizontal scaling is always cheaper', D: 'Vertical scaling cannot be used for LLM workloads' },
    answer: 'B', explanation: 'Horizontal LLM scaling: each NIM pod serves ~100 req/min → add pods to match load → any pod can fail without downtime. Vertical: one big GPU serves more, but: single point of failure, model can outgrow even the biggest GPU, limited availability.' },
];
