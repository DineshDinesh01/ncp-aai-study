import { Question } from '../types';

export const domain4bQuestions: Question[] = [
  { id: 4031, domain: 4, domainName: 'Deployment & Scaling', topic: 'Model Serving', difficulty: 'medium', keywords: ['model serving', 'inference server', 'TorchServe', 'model endpoint'],
    question: 'The key difference between batch inference and online inference serving is:',
    options: { A: 'Batch inference handles single requests; online handles batches', B: 'Online serves individual requests with low latency; batch processes large datasets offline at high throughput', C: 'Online inference is always more expensive', D: 'Batch inference requires GPUs; online inference can use CPUs' },
    answer: 'B', explanation: 'Online inference (user-facing): low latency is critical, typically small batches. Batch inference (analytics, preprocessing): throughput optimized, larger batches, higher latency acceptable.' },

  { id: 4032, domain: 4, domainName: 'Deployment & Scaling', topic: 'Kubernetes GPU', difficulty: 'medium', keywords: ['GPU resources', 'NVIDIA device plugin', 'limits', 'requests'],
    question: 'To request GPU resources in a Kubernetes Pod spec, you must set:',
    options: { A: 'env: NVIDIA_GPU: "1"', B: 'resources.limits["nvidia.com/gpu"]: 1 with the NVIDIA device plugin installed in the cluster', C: 'affinity: gpuRequired: true', D: 'nodeSelector: gpu: enabled' },
    answer: 'B', explanation: 'Kubernetes GPU scheduling requires: NVIDIA device plugin DaemonSet (exposes GPU resources), and resource.limits["nvidia.com/gpu"] in the container spec to reserve GPU allocation.' },

  { id: 4033, domain: 4, domainName: 'Deployment & Scaling', topic: 'CI/CD for AI', difficulty: 'medium', keywords: ['MLOps', 'CI/CD', 'model pipeline', 'automated deployment'],
    question: 'A CI/CD pipeline for AI agent deployment should include: (Choose two)',
    options: { A: 'Automated quality evaluation against benchmark datasets before merging', B: 'Immediate production deployment without testing to minimize release lag', C: 'Automated security scanning of dependencies and agent code', D: 'Manual approval required for every single deployment' },
    answer: 'AC', explanation: 'AI CI/CD must include quality gates (automated eval catching regressions) and security scanning (CVE detection in AI framework dependencies) before any deployment proceeds.' },

  { id: 4034, domain: 4, domainName: 'Deployment & Scaling', topic: 'Inference Optimization', difficulty: 'hard', keywords: ['flash attention', 'sliding window', 'attention optimization'],
    question: 'Flash Attention improves transformer inference efficiency by:',
    options: { A: 'Using a flash memory cache for model weights', B: 'Recomputing attention scores in tiles to avoid storing the full N×N attention matrix, reducing memory by O(N²) to O(N)', C: 'Flashing (resetting) the KV cache between requests', D: 'Optimizing the flash storage I/O for weight loading' },
    answer: 'B', explanation: 'Flash Attention computes attention in small blocks that fit in GPU SRAM, avoiding the O(N²) memory bottleneck of standard attention. This enables much longer sequences on the same GPU.' },

  { id: 4035, domain: 4, domainName: 'Deployment & Scaling', topic: 'Model Sharding', difficulty: 'hard', keywords: ['pipeline parallelism', 'stages', 'microbatch', 'GPU stages'],
    question: 'Pipeline parallelism differs from tensor parallelism in that:',
    options: { A: 'Pipeline parallelism is only for training, not inference', B: 'Pipeline parallelism splits the model vertically (different layers on different GPUs) vs tensor parallelism\'s horizontal layer splitting', C: 'Pipeline parallelism requires specialized hardware', D: 'There is no meaningful difference for LLM inference' },
    answer: 'B', explanation: 'Pipeline: GPU 1 handles layers 1-12, GPU 2 handles layers 13-24 — each GPU processes its full layers sequentially. Tensor: each GPU processes a slice of each layer — requires communication at every layer.' },

  { id: 4036, domain: 4, domainName: 'Deployment & Scaling', topic: 'Continuous Batching', difficulty: 'hard', keywords: ['continuous batching', 'iteration-level', 'vLLM', 'Orca'],
    question: 'Continuous batching (iteration-level scheduling) improves LLM serving throughput by:',
    options: { A: 'Batching all requests overnight for processing', B: 'Adding new requests mid-batch as slots free up, rather than waiting for all requests in a batch to finish', C: 'Processing requests in a continuous stream without any batching', D: 'Continuously training the model during serving' },
    answer: 'B', explanation: 'Traditional batching waits for all batch members to finish (wasted GPU time when some finish early). Continuous batching fills vacated slots immediately, maintaining near-100% GPU utilization.' },

  { id: 4037, domain: 4, domainName: 'Deployment & Scaling', topic: 'Resource Quotas', difficulty: 'medium', keywords: ['resource quota', 'namespace', 'limits', 'multi-tenant'],
    question: 'Kubernetes ResourceQuotas in multi-tenant AI deployments enforce:',
    options: { A: 'Quality levels for AI responses per tenant', B: 'Maximum CPU/GPU/memory that all pods in a namespace can collectively consume', C: 'API rate limits per tenant', D: 'Model size limits for tenant deployments' },
    answer: 'B', explanation: 'ResourceQuotas prevent any single tenant from consuming all cluster resources, ensuring fair allocation in multi-tenant AI serving environments.' },

  { id: 4038, domain: 4, domainName: 'Deployment & Scaling', topic: 'Observability Stack', difficulty: 'medium', keywords: ['Prometheus', 'Grafana', 'metrics', 'alerting'],
    question: 'A standard observability stack for AI agent deployments consists of:',
    options: { A: 'print() statements and manual log checking', B: 'Prometheus (metrics collection) + Grafana (visualization) + Alertmanager (alerting) + Jaeger/Tempo (tracing)', C: 'Only application logs stored in files', D: 'Cloud vendor console only' },
    answer: 'B', explanation: 'The CNCF observability stack: Prometheus scrapes metrics, Grafana visualizes them, Alertmanager fires alerts on threshold breaches, distributed tracing (Jaeger) connects cross-service spans.' },

  { id: 4039, domain: 4, domainName: 'Deployment & Scaling', topic: 'Inference Cost Modeling', difficulty: 'medium', keywords: ['cost modeling', 'token cost', 'GPU hour', 'TCO'],
    question: 'Total cost of ownership (TCO) for a self-hosted LLM vs API service considers:',
    options: { A: 'Only the GPU hardware purchase price', B: 'GPU hardware, electricity, networking, engineering time, maintenance, scaling costs vs API cost per token', C: 'Only the license cost of the model', D: 'API cost only since self-hosting has no costs' },
    answer: 'B', explanation: 'Self-hosting TCO includes: capital (GPUs), operational (electricity, networking), labor (DevOps, MLOps), and opportunity cost. API services have simpler per-token pricing but less control.' },

  { id: 4040, domain: 4, domainName: 'Deployment & Scaling', topic: 'A/B Testing Infrastructure', difficulty: 'medium', keywords: ['A/B testing', 'shadow mode', 'traffic splitting', 'experimentation'],
    question: 'Shadow mode testing for new agent versions works by:',
    options: { A: 'Testing the new version in a darkened server room', B: 'Sending all requests to both old and new versions simultaneously, comparing outputs without exposing new results to users', C: 'Testing only during nighttime low-traffic hours', D: 'Using shadow memory (GPU swap) for new model weights' },
    answer: 'B', explanation: 'Shadow mode runs new versions against real traffic in parallel, comparing outputs to identify differences before the new version handles actual user requests — risk-free real-world testing.' },

  { id: 4041, domain: 4, domainName: 'Deployment & Scaling', topic: 'Multi-Region Deployment', difficulty: 'medium', keywords: ['multi-region', 'latency', 'global', 'CDN'],
    question: 'Multi-region AI agent deployments reduce latency for global users by:',
    options: { A: 'Deploying more powerful GPUs in a single region', B: 'Serving requests from the geographically closest region, reducing network round-trip time', C: 'Caching all possible responses globally', D: 'Using satellite internet for lower latency connections' },
    answer: 'B', explanation: 'Each network hop adds ~30ms. Serving from a nearby region (US user → US region) vs. distant (US user → Asia) can save 100-300ms — significant for interactive agent sessions.' },

  { id: 4042, domain: 4, domainName: 'Deployment & Scaling', topic: 'Service Dependencies', difficulty: 'medium', keywords: ['service dependency', 'dependency injection', 'startup', 'readiness'],
    question: 'Agent services with external dependencies (databases, APIs) should use Kubernetes init containers to:',
    options: { A: 'Initialize the agent\'s prompt template at startup', B: 'Wait for dependencies to be ready before the main container starts, preventing failed starts from missing services', C: 'Initialize GPU drivers before model loading', D: 'Pre-warm the LLM with initial requests' },
    answer: 'B', explanation: 'Init containers run to completion before app containers start. They can check if the database is ready, vector store is accessible, and LLM endpoint responds before the agent begins serving.' },

  { id: 4043, domain: 4, domainName: 'Deployment & Scaling', topic: 'Model Warm-up', difficulty: 'medium', keywords: ['warm-up', 'JIT', 'first request', 'compilation'],
    question: 'Model warm-up before serving traffic is important because:',
    options: { A: 'GPU requires physical warm-up time like engines', B: 'The first inference triggers JIT compilation, memory allocation, and CUDA kernel initialization — subsequent requests are much faster', C: 'Warm-up improves model accuracy', D: 'Warm-up trains the model on sample data' },
    answer: 'B', explanation: 'First inference: JIT compiles CUDA kernels, allocates GPU buffers, loads model to GPU. Subsequent: uses pre-compiled kernels and allocated memory. Warm-up prevents the first real user from experiencing slow first-request latency.' },

  { id: 4044, domain: 4, domainName: 'Deployment & Scaling', topic: 'LLM Gateway', difficulty: 'medium', keywords: ['LLM gateway', 'LiteLLM', 'provider abstraction', 'fallback'],
    question: 'An LLM gateway (e.g., LiteLLM) provides which benefits to agent deployments? (Choose two)',
    options: { A: 'Unified API across multiple LLM providers with automatic fallback on provider failure', B: 'Training new LLMs from scratch', C: 'Cost tracking and budget enforcement across all LLM API calls', D: 'Replacing the need for vector databases' },
    answer: 'AC', explanation: 'LLM gateways: abstract multiple providers (OpenAI/Anthropic/Cohere/NVIDIA) behind one interface with fallback, AND provide cost tracking, rate limiting, and budget controls across all providers.' },

  { id: 4045, domain: 4, domainName: 'Deployment & Scaling', topic: 'GPU Memory Management', difficulty: 'hard', keywords: ['VRAM', 'OOM', 'memory', 'offloading'],
    question: 'When a model is too large for available GPU VRAM, the recommended approach is:',
    options: { A: 'Simply run it on CPU instead', B: 'Use quantization (reduce precision), model parallelism (spread across GPUs), or CPU offloading (move unused layers)', C: 'Truncate model layers until it fits', D: 'Buy more GPU memory immediately' },
    answer: 'B', explanation: 'GPU memory constraints can be addressed by: quantization (8-bit or 4-bit reduces memory 2-4x), tensor parallelism (distribute across GPUs), or CPU offloading (load layers on demand at cost of latency).' },

  { id: 4046, domain: 4, domainName: 'Deployment & Scaling', topic: 'Deployment Patterns for LLMs', difficulty: 'medium', keywords: ['serverless inference', 'always-on', 'dedicated GPU', 'spot'],
    question: 'For low-traffic development agent deployments, which infrastructure pattern minimizes cost?',
    options: { A: 'Always-on dedicated A100 GPU instance', B: 'Serverless GPU (e.g., Modal, Replicate) or spot instances — scale to zero when idle', C: 'On-premise GPU cluster', D: 'CPU-only instances for all development' },
    answer: 'B', explanation: 'Development agents have sporadic traffic. Serverless GPU or spot instances scale to zero when idle, costing nothing during inactive periods vs. constant cost of dedicated instances.' },

  { id: 4047, domain: 4, domainName: 'Deployment & Scaling', topic: 'Token Throughput', difficulty: 'medium', keywords: ['TTFT', 'TPS', 'latency', 'throughput metrics'],
    question: 'TTFT (Time to First Token) is an important metric for interactive AI agents because:',
    options: { A: 'It measures overall request completion time', B: 'It determines perceived responsiveness — how long the user waits before seeing any output', C: 'It measures model accuracy on first tokens', D: 'It is the only metric that matters for LLM serving' },
    answer: 'B', explanation: 'TTFT is the latency until the first token appears in the UI. For streaming agents, users perceive this as "thinking time." Low TTFT (< 500ms) feels responsive; high TTFT (>2s) feels slow.' },

  { id: 4048, domain: 4, domainName: 'Deployment & Scaling', topic: 'Disaster Recovery', difficulty: 'medium', keywords: ['DR', 'backup', 'recovery', 'RTO', 'RPO'],
    question: 'RTO (Recovery Time Objective) and RPO (Recovery Point Objective) for AI agent systems define:',
    options: { A: 'Response Time Objective and Request Processing Objective', B: 'RTO: max acceptable downtime; RPO: max acceptable data loss — both define disaster recovery requirements', C: 'Runtime Options and Resource Planning Options', D: 'They are identical metrics with different names' },
    answer: 'B', explanation: 'RTO: "we must be back online within 2 hours" (downtime tolerance). RPO: "we can lose at most 1 hour of conversation data" (data loss tolerance). Both drive backup and failover architecture.' },

  { id: 4049, domain: 4, domainName: 'Deployment & Scaling', topic: 'CDN for Static Assets', difficulty: 'easy', keywords: ['CDN', 'static assets', 'global', 'performance'],
    question: 'For AI agent web applications, serving static assets (JS, CSS, images) via CDN reduces:',
    options: { A: 'LLM inference latency', B: 'Web application initial load time by caching assets at edge nodes geographically close to users', C: 'GPU costs for inference', D: 'API call latency to LLM providers' },
    answer: 'B', explanation: 'CDNs cache static web assets globally. Users download from the nearest edge node rather than the origin server, reducing page load times from seconds to milliseconds for global users.' },

  { id: 4050, domain: 4, domainName: 'Deployment & Scaling', topic: 'Prefill vs Decode', difficulty: 'hard', keywords: ['prefill', 'decode', 'TTFT', 'throughput', 'phases'],
    question: 'In LLM inference, the prefill phase (processing input tokens) is compute-bound while the decode phase (generating output tokens) is:',
    options: { A: 'Also compute-bound, just slower', B: 'Memory-bandwidth-bound — loading model weights from GPU HBM for each token generation step is the bottleneck', C: 'CPU-bound due to post-processing', D: 'Network-bound due to streaming tokens to clients' },
    answer: 'B', explanation: 'Decode generates one token per step: loads all model weights from GPU HBM each step → memory-bandwidth bound. Prefill processes all input tokens in a large matrix operation → compute-bound.' },

  { id: 4051, domain: 4, domainName: 'Deployment & Scaling', topic: 'Multi-Model Serving', difficulty: 'medium', keywords: ['multi-model', 'model routing', 'ensemble', 'serving'],
    question: 'Serving multiple model variants (7B for simple queries, 70B for complex) from one endpoint requires:',
    options: { A: 'Running the 70B model for all requests for consistent quality', B: 'A router that classifies query complexity and dispatches to the appropriate model tier', C: 'Running both models for every request and taking the better response', D: 'Users specifying which model they want in every request' },
    answer: 'B', explanation: 'Model routing classifies query complexity/sensitivity and dispatches accordingly — simple FAQ → 7B (fast, cheap), complex reasoning → 70B (powerful, expensive). Reduces cost while maintaining quality.' },

  { id: 4052, domain: 4, domainName: 'Deployment & Scaling', topic: 'Inference Profiles', difficulty: 'medium', keywords: ['profile', 'benchmark', 'throughput', 'latency profile'],
    question: 'Before deploying an LLM to production, performance profiling should characterize:',
    options: { A: 'The model developer\'s LinkedIn profile', B: 'Latency percentiles (P50/P95/P99) and throughput at various batch sizes and sequence lengths under realistic load', C: 'Model accuracy on training benchmarks only', D: 'GPU temperature during inference' },
    answer: 'B', explanation: 'Production performance profiles map realistic workload characteristics to observed performance — revealing at which batch sizes throughput peaks, where latency becomes unacceptable, and what hardware is needed.' },

  { id: 4053, domain: 4, domainName: 'Deployment & Scaling', topic: 'Spot Instance Strategy', difficulty: 'medium', keywords: ['spot', 'preemption', 'checkpoint', 'batch workloads'],
    question: 'Running batch AI inference on spot/preemptible instances requires:',
    options: { A: 'Guaranteed zero-interruption for accuracy', B: 'Checkpoint-and-resume capability to handle instance preemption without losing completed work', C: 'Real-time streaming to users', D: 'Spot instances cannot be used for AI workloads' },
    answer: 'B', explanation: 'Spot instances are preemptible (typically 2-minute warning). Batch jobs must save progress to persistent storage at regular intervals so preemption only loses the current checkpoint interval.' },

  { id: 4054, domain: 4, domainName: 'Deployment & Scaling', topic: 'LLM Caching', difficulty: 'medium', keywords: ['prefix caching', 'KV cache', 'prompt caching', 'cost reduction'],
    question: 'Prompt caching (Anthropic) and prefix caching (vLLM) reduce costs for agents by:',
    options: { A: 'Storing complete request-response pairs in a cache', B: 'Reusing the KV cache for repeated prompt prefixes (system prompts, few-shot examples) across multiple requests', C: 'Caching only the last response for identical queries', D: 'Removing repeated words from prompts automatically' },
    answer: 'B', explanation: 'When many requests share the same system prompt prefix, prefix caching avoids recomputing the KV cache for those tokens — saving 40-80% of input tokens costs for heavily templated agents.' },

  { id: 4055, domain: 4, domainName: 'Deployment & Scaling', topic: 'GPU Oversubscription', difficulty: 'hard', keywords: ['oversubscription', 'GPU', 'timesharing', 'MIG', 'MPS'],
    question: 'NVIDIA MPS (Multi-Process Service) enables:',
    options: { A: 'Multiple GPU physical partitions with hardware isolation', B: 'Multiple CUDA processes to share GPU resources simultaneously via time-multiplexing for higher utilization', C: 'Master-Process-Slave GPU architecture', D: 'Monitoring GPU performance from multiple servers' },
    answer: 'B', explanation: 'MPS allows multiple CUDA processes to share GPU SM resources concurrently (within context switches), improving utilization when individual processes don\'t fully saturate the GPU.' },

  { id: 4056, domain: 4, domainName: 'Deployment & Scaling', topic: 'Feature Flags', difficulty: 'medium', keywords: ['feature flags', 'toggle', 'gradual rollout', 'kill switch'],
    question: 'Feature flags for AI agent deployments enable:',
    options: { A: 'Managing Python feature imports', B: 'Enabling/disabling features for specific users or percentages without code deployments — essential for gradual rollout', C: 'Flagging low-quality AI responses for review', D: 'Feature extraction for ML training' },
    answer: 'B', explanation: 'Feature flags enable: A/B testing new prompts/models, gradual rollout to 1%→10%→100% users, instant kill switch if a feature causes issues — all without code deployments.' },

  { id: 4057, domain: 4, domainName: 'Deployment & Scaling', topic: 'SLA Design', difficulty: 'medium', keywords: ['SLA', 'availability', 'nines', 'downtime'],
    question: '99.9% availability ("three nines") for an AI agent service means:',
    options: { A: '99.9% accuracy in agent responses', B: 'Maximum ~8.77 hours of downtime per year (~43 minutes per month)', C: '99.9% of requests complete within 1 second', D: '99.9% of API calls succeed without errors' },
    answer: 'B', explanation: '99.9% uptime = 0.1% downtime = 8.76 hours/year = 43 min/month. Each additional "nine" reduces this: 99.99% = 52 min/year = 4.4 min/month. Know the math for SLA design.' },

  { id: 4058, domain: 4, domainName: 'Deployment & Scaling', topic: 'Network Policies', difficulty: 'medium', keywords: ['network policy', 'egress', 'ingress', 'Kubernetes security'],
    question: 'Kubernetes NetworkPolicies in AI agent deployments restrict:',
    options: { A: 'GPU network bandwidth for model inference', B: 'Which pods can communicate with which other pods/external services, implementing zero-trust networking', C: 'The network speed for downloading model weights', D: 'Kubernetes API server network access' },
    answer: 'B', explanation: 'NetworkPolicies implement zero-trust: only explicitly allowed traffic flows. An agent pod should only communicate with its allowed tools and databases — not arbitrary internal services or external internet.' },

  { id: 4059, domain: 4, domainName: 'Deployment & Scaling', topic: 'Model Deployment Automation', difficulty: 'medium', keywords: ['automated deployment', 'GitOps', 'ArgoCD', 'MLflow'],
    question: 'GitOps-based model deployment ensures:',
    options: { A: 'Git repositories are automatically backed up', B: 'All deployment state is declared in Git — changes to models/configs trigger automated, auditable deployments', C: 'Git history is used to train better models', D: 'Model weights are stored in Git LFS' },
    answer: 'B', explanation: 'GitOps (ArgoCD, Flux) makes Git the source of truth for deployment state. PRs to model configs trigger automated deployments with full audit trail, approval workflows, and rollback via git revert.' },

  { id: 4060, domain: 4, domainName: 'Deployment & Scaling', topic: 'Edge Deployment', difficulty: 'hard', keywords: ['edge', 'on-device', 'quantization', 'mobile'],
    question: 'Deploying LLMs on edge devices (phones, IoT) primarily requires:',
    options: { A: 'Connecting edge devices to cloud LLM APIs', B: 'Aggressive quantization (4-bit, 2-bit) and model compression to fit within severe memory and compute constraints', C: 'Using the largest available model for quality', D: 'Edge devices cannot run LLMs under any circumstances' },
    answer: 'B', explanation: 'Edge deployment needs models to fit in 4-8GB RAM with battery-friendly inference. Techniques: 4-bit quantization (Llama.cpp/GGUF), pruning, distillation, and architecture optimization for mobile inference.' },
];
