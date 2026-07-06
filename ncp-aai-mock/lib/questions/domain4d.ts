import { Question } from '../types';

export const domain4dQuestions: Question[] = [
  { id: 4091, domain: 4, domainName: 'Deployment & Scaling', topic: 'Cloud Native Patterns', difficulty: 'medium', keywords: ['12-factor', 'cloud native', 'principles', 'patterns'],
    question: 'The 12-Factor App methodology applied to AI agents emphasizes:',
    options: { A: 'Using exactly 12 microservices per agent system', B: 'Stateless processes, externalized config, declarative setup, and disposable containers for robust, scalable agent deployment', C: 'Only 12 tools per agent for simplicity', D: '12-Factor only applies to web applications, not AI agents' },
    answer: 'B', explanation: '12-Factor for AI: Config in env vars (not code), Stateless processes (any instance handles any request), Dev/prod parity, Logs as streams (to stdout), Disposable (fast startup/shutdown). Core principles for cloud-native AI.' },

  { id: 4092, domain: 4, domainName: 'Deployment & Scaling', topic: 'LLM Serving Optimization', difficulty: 'hard', keywords: ['continuous batching', 'PagedAttention', 'vLLM', 'throughput'],
    question: 'PagedAttention in vLLM improves LLM serving throughput by:',
    options: { A: 'Paging model weights in and out of GPU memory', B: 'Managing KV cache in non-contiguous memory pages like OS virtual memory — eliminating fragmentation and enabling larger batch sizes', C: 'Processing queries in pages of 100 at a time', D: 'Using page tables to route requests to different GPU pages' },
    answer: 'B', explanation: 'PagedAttention: KV cache stored in fixed-size blocks (like OS pages), non-contiguous in GPU memory. Eliminates fragmentation (traditional approach wastes 60% of KV cache memory to pre-allocated contiguous regions). 2-4x throughput improvement.' },

  { id: 4093, domain: 4, domainName: 'Deployment & Scaling', topic: 'Rate Limiting Architecture', difficulty: 'medium', keywords: ['rate limiting', 'token bucket', 'sliding window', 'implementation'],
    question: 'Token bucket rate limiting for AI agent APIs is preferred over fixed window because:',
    options: { A: 'Token bucket is simpler to implement', B: 'Token bucket allows bursting up to bucket capacity while smoothing average rate, unlike fixed window which can allow 2x the rate at window boundaries', C: 'Token bucket prevents all API abuse', D: 'Fixed window rate limiting doesn\'t work for HTTP APIs' },
    answer: 'B', explanation: 'Fixed window problem: 100 req/min window, user sends 100 at 0:59 and 100 at 1:01 → 200 requests in 2 seconds. Token bucket: tokens accumulate at fill_rate, burst up to bucket_size → no boundary exploits, natural burst handling.' },

  { id: 4094, domain: 4, domainName: 'Deployment & Scaling', topic: 'Cost Models', difficulty: 'medium', keywords: ['TCO', 'total cost of ownership', 'GPU', 'cloud vs on-prem'],
    question: 'Total Cost of Ownership (TCO) analysis for GPU inference should include:',
    options: { A: 'Only GPU hardware purchase cost', B: 'Hardware cost, power/cooling, networking, storage, software licenses, operations/maintenance, and opportunity cost of tied capital', C: 'Only per-token API cost for cloud inference', D: 'TCO is only relevant for on-premise deployments' },
    answer: 'B', explanation: 'GPU TCO: hardware ($100K-$400K per H100 node) + power (6-14kW × cost) + cooling + facility + networking + software (CUDA, serving framework) + operations (MLOps engineer time) + hardware depreciation. Cloud TCO = pay-per-use without capital.' },

  { id: 4095, domain: 4, domainName: 'Deployment & Scaling', topic: 'Kubernetes Operators', difficulty: 'hard', keywords: ['operator pattern', 'custom resource', 'CRD', 'controller'],
    question: 'AI-specific Kubernetes operators (e.g., NVIDIA GPU Operator) use the operator pattern to:',
    options: { A: 'Hire human operators for GPU management', B: 'Encode operational knowledge as code — a controller watches custom resources and reconciles actual state to desired state automatically', C: 'Operate multiple Kubernetes clusters from one control plane', D: 'Provide a dashboard for GPU cluster operators' },
    answer: 'B', explanation: 'Operator pattern: define CRD (e.g., NIMDeployment), write controller that watches these resources. User creates NIMDeployment → controller automatically provisions GPU resources, downloads model, deploys NIM service. Operational expertise as code.' },

  { id: 4096, domain: 4, domainName: 'Deployment & Scaling', topic: 'Observability Stack', difficulty: 'medium', keywords: ['Prometheus', 'Grafana', 'Jaeger', 'OpenTelemetry'],
    question: 'OpenTelemetry for AI agent observability provides:',
    options: { A: 'A commercial observability platform for AI', B: 'Vendor-neutral instrumentation SDK for metrics, logs, and traces — export to any backend (Grafana, Datadog, Jaeger) without vendor lock-in', C: 'Open-source replacement for Prometheus only', D: 'Telemetry specifically for AI model inference' },
    answer: 'B', explanation: 'OTel: instrument agent once with OTel SDK → export to any observability backend. Enables: migration between observability platforms without re-instrumentation, standardized trace context propagation across all services.' },

  { id: 4097, domain: 4, domainName: 'Deployment & Scaling', topic: 'Secrets Management', difficulty: 'medium', keywords: ['secrets', 'Vault', 'AWS Secrets Manager', 'rotation'],
    question: 'Dynamic secrets (HashiCorp Vault, AWS Secrets Manager) for AI agents provide:',
    options: { A: 'Secrets that change automatically every minute', B: 'Short-lived credentials generated on-demand per service, rotated automatically, with access logged and audited', C: 'Secrets stored in encrypted environment variables', D: 'Dynamic API key generation for LLM providers' },
    answer: 'B', explanation: 'Dynamic secrets: agent requests database credentials from Vault → Vault creates a DB user with TTL=1hr → agent uses credentials → they expire automatically. No long-lived secrets that could be stolen; full audit log of who accessed what.' },

  { id: 4098, domain: 4, domainName: 'Deployment & Scaling', topic: 'Networking Policies', difficulty: 'hard', keywords: ['network policy', 'zero trust', 'segmentation', 'Kubernetes'],
    question: 'Kubernetes NetworkPolicies for AI agent pods should implement:',
    options: { A: 'Allow all traffic between all pods for simplicity', B: 'Default-deny all, then explicitly allow: only required ingress (load balancer → agent) and egress (agent → LLM API, tool APIs)', C: 'Policies are only needed for internet-facing services', D: 'GPU pods are exempt from network policies due to performance requirements' },
    answer: 'B', explanation: 'NetworkPolicy best practice: start with deny all. Add explicit allows: LB ingress to agent, agent egress to specific external APIs. Prevents: lateral movement if pod is compromised, accidental data exfiltration, and unauthorized inter-service calls.' },

  { id: 4099, domain: 4, domainName: 'Deployment & Scaling', topic: 'GPU Scheduling', difficulty: 'hard', keywords: ['GPU scheduling', 'resource quota', 'priority', 'preemption'],
    question: 'Priority-based GPU scheduling in Kubernetes enables:',
    options: { A: 'GPUs to schedule their own workloads', B: 'High-priority production inference to preempt lower-priority batch training jobs when GPU resources are constrained', C: 'Prioritizing newer GPU models over older ones', D: 'GPU scheduling based on user seniority in the organization' },
    answer: 'B', explanation: 'K8s priority classes: production-inference (high priority, never preempted), model-training (medium, can be preempted), batch-jobs (low, preempted first). Preemption ensures production SLAs are met even under resource pressure.' },

  { id: 4100, domain: 4, domainName: 'Deployment & Scaling', topic: 'CDN and API Gateway', difficulty: 'medium', keywords: ['API gateway', 'Kong', 'rate limiting', 'authentication'],
    question: 'An API Gateway layer for AI agent services provides:',
    options: { A: 'Direct gateway to AI model internals for debugging', B: 'Centralized authentication, rate limiting, request routing, SSL termination, and API versioning — keeping agent pods clean of cross-cutting concerns', C: 'A gateway is only needed for consumer-facing APIs, not internal agents', D: 'API gateways introduce too much latency for AI workloads' },
    answer: 'B', explanation: 'API Gateway for AI: Kong/AWS API Gateway handles auth (JWT/API key validation), rate limiting (prevent abuse), routing (v1 → old model, v2 → new model), logging (request/response), SSL termination. Agent pods focus on AI logic only.' },

  { id: 4101, domain: 4, domainName: 'Deployment & Scaling', topic: 'Chaos Engineering for AI', difficulty: 'hard', keywords: ['chaos engineering', 'fault injection', 'steady state', 'hypothesis'],
    question: 'Chaos engineering experiments for AI agent systems should test:',
    options: { A: 'Only hardware failure scenarios', B: 'LLM API unavailability, tool timeouts, context overflow, and high-concurrency scenarios to validate resilience hypotheses', C: 'Only scenarios that can be reproduced deterministically', D: 'Chaos engineering is only for financial systems' },
    answer: 'B', explanation: 'AI-specific chaos experiments: LLM API 500 errors → do agents fall back gracefully? Tool latency → does agent timeout correctly? Inject prompt injection → do safety guardrails hold? Context limit hit → does compression work? Validate in staging before production.' },

  { id: 4102, domain: 4, domainName: 'Deployment & Scaling', topic: 'Multi-Tenant AI', difficulty: 'hard', keywords: ['multi-tenant', 'isolation', 'tenant', 'SaaS'],
    question: 'Multi-tenant AI agent platforms achieve tenant isolation through:',
    options: { A: 'Separate physical hardware for each tenant', B: 'Namespace isolation in Kubernetes, per-tenant vector stores (namespaces/collections), and tenant-specific context injection', C: 'Only isolated by terms of service agreements', D: 'Shared model with tenant-specific usernames' },
    answer: 'B', explanation: 'Multi-tenant AI isolation: K8s namespaces (compute isolation), per-tenant vector store collections (data isolation), JWT with tenant claims (auth), tenant ID in all requests (audit), and per-tenant model fine-tunes if needed.' },

  { id: 4103, domain: 4, domainName: 'Deployment & Scaling', topic: 'Warm vs Cold Deployment', difficulty: 'medium', keywords: ['warm deployment', 'rolling update', 'deployment strategy', 'availability'],
    question: 'Rolling deployment updates for AI agent services ensure:',
    options: { A: 'All pods update simultaneously for fastest rollout', B: 'Zero downtime by updating pods incrementally — maintaining N% of old pods serving while N% of new pods are starting', C: 'Rolling updates are too slow and should be avoided', D: 'Rolling updates require complete traffic stoppage' },
    answer: 'B', explanation: 'Rolling update: update 1 pod → wait until healthy → update next → repeat. During update: old version handles traffic for in-progress requests, new version gets new requests. maxUnavailable=0 → no capacity reduction during rollout.' },

  { id: 4104, domain: 4, domainName: 'Deployment & Scaling', topic: 'Async Job Processing', difficulty: 'medium', keywords: ['Celery', 'job queue', 'worker', 'async processing'],
    question: 'For long-running agent tasks (multi-minute workflows), the recommended architecture is:',
    options: { A: 'HTTP request-response with a very long timeout', B: 'Async job queue: HTTP returns job_id immediately, background workers process tasks, client polls or receives webhook when complete', C: 'WebSocket connection maintained for the full duration', D: 'Serverless functions with 15-minute timeouts' },
    answer: 'B', explanation: 'Long-running async pattern: POST /jobs → returns {job_id, status: queued}. Worker processes task. Client polls GET /jobs/{id} or receives webhook callback. Decouples HTTP response from task completion, enabling horizontal worker scaling.' },

  { id: 4105, domain: 4, domainName: 'Deployment & Scaling', topic: 'Deployment Rollback', difficulty: 'medium', keywords: ['rollback', 'helm rollback', 'revision', 'recovery'],
    question: 'Automated rollback triggers for AI agent deployments should activate when:',
    options: { A: 'Any production error occurs', B: 'Quality metrics (error rate, task success rate, response quality score) drop below defined thresholds within the post-deployment observation window', C: 'A developer requests rollback manually', D: 'The deployment has been running for more than 24 hours' },
    answer: 'B', explanation: 'Automated rollback: monitor error rate, task completion rate, and quality scores for 15-30 min post-deployment. If: error_rate > 2% OR task_success < 80% of baseline → automated Helm rollback. Catches regressions faster than manual monitoring.' },

  { id: 4106, domain: 4, domainName: 'Deployment & Scaling', topic: 'Memory Optimization', difficulty: 'hard', keywords: ['Flash Attention', 'activation recomputation', 'memory efficiency', 'SDPA'],
    question: 'Flash Attention (Dao et al.) reduces GPU memory usage for inference by:',
    options: { A: 'Using flash storage (SSD) to offload attention matrices', B: 'Computing attention in tiles that fit in SRAM, avoiding materializing the full O(N²) attention matrix in HBM (GPU main memory)', C: 'Flashing/resetting attention caches between requests', D: 'Using a smaller attention matrix that flashes through the model' },
    answer: 'B', explanation: 'Flash Attention: standard attention materializes N×N attention matrix in HBM (memory bottleneck). Flash Attention uses tiling to compute attention block-by-block in SRAM (fast cache) → never materializes full matrix → 5-10x memory reduction for attention.' },

  { id: 4107, domain: 4, domainName: 'Deployment & Scaling', topic: 'Service Level Objectives', difficulty: 'medium', keywords: ['error budget', 'burn rate', 'SLO', 'alerting'],
    question: 'SLO burn rate alerts notify when:',
    options: { A: 'The error budget is 100% burned', B: 'Error budget is being consumed faster than sustainable — a high burn rate means the SLO will be violated before the period ends', C: 'CPU burns at high utilization', D: 'Burn rate alerts fire for any SLO violation' },
    answer: 'B', explanation: 'Burn rate: if monthly error budget is 1% of traffic and you\'re seeing 10% errors in the last hour, burn rate = 10x. At this rate, monthly budget exhausted in 3 days. Alert when burn_rate > threshold while there\'s still time to fix it.' },

  { id: 4108, domain: 4, domainName: 'Deployment & Scaling', topic: 'Batch Inference', difficulty: 'medium', keywords: ['batch inference', 'throughput', 'asynchronous', 'offline'],
    question: 'Batch inference optimization for offline agent processing should:',
    options: { A: 'Process each request individually for best quality', B: 'Group requests into optimal batches (maximize GPU utilization), process asynchronously, and prioritize by deadline', C: 'Always use maximum batch size regardless of request size', D: 'Batch processing is only for training, not inference' },
    answer: 'B', explanation: 'Batch inference: group N requests → one GPU forward pass → N responses. Optimal batch size: fills GPU memory without overflow. For offline processing: sort by deadline, use dynamic batching (mix short and long requests by padding).' },

  { id: 4109, domain: 4, domainName: 'Deployment & Scaling', topic: 'Helm Charts for AI', difficulty: 'medium', keywords: ['Helm', 'chart', 'templating', 'values'],
    question: 'Helm charts for AI agent deployment provide:',
    options: { A: 'A nautical-themed deployment tool', B: 'Templated, versioned Kubernetes manifests enabling parameterized deployment (model name, replica count, resource limits) across environments', C: 'Helm is only for simple applications, not complex AI systems', D: 'Charts must be created from scratch for each AI model' },
    answer: 'B', explanation: 'Helm for AI: define NIM deployment as chart with values.yaml (model: llama3-8b, replicas: 3, gpu: nvidia.com/gpu: 1). Different values files for dev/staging/prod. Chart versioned → rollback to previous chart version.' },

  { id: 4110, domain: 4, domainName: 'Deployment & Scaling', topic: 'AI Gateway Patterns', difficulty: 'hard', keywords: ['LLM gateway', 'semantic router', 'model gateway', 'LiteLLM'],
    question: 'LLM gateways (LiteLLM, PortKey) serve as:',
    options: { A: 'Physical network gateways for GPU traffic', B: 'Unified API layer abstracting multiple LLM providers with routing, fallback, caching, cost tracking, and provider-agnostic interface', C: 'Only cost optimization tools without routing capability', D: 'LLM gateways require custom protocol adapters' },
    answer: 'B', explanation: 'LLM gateway: one API endpoint → routes to OpenAI/Anthropic/Cohere based on cost/availability/capability. Adds: semantic caching, fallback (Anthropic → OpenAI if one is down), cost tracking per team/feature, rate limiting, and observability.' },
];
