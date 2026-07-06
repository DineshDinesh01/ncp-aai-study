import { Question } from '../types';

export const domain4scQuestions: Question[] = [
  { id: 4201, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scenario: NIM Deployment', difficulty: 'hard', keywords: ['scenario', 'NIM', 'deployment', 'GPU'],
    question: 'You need to deploy a Llama 3.1 70B model using NVIDIA NIM on a single A100 80GB GPU server. The model requires ~140GB of GPU memory in FP16. What is your deployment strategy?',
    options: {
      A: 'Deploy on a single A100 — NIM will handle memory automatically',
      B: 'Use tensor parallelism across 2× A100 80GB GPUs (total 160GB VRAM), configure NIM with tensor_parallelism=2 to split model weights across both GPUs',
      C: 'Use INT4 quantization to reduce model size to ~35GB and fit on one GPU',
      D: 'Use model offloading to system RAM for the overflow memory'
    },
    answer: 'B',
    explanation: 'A 70B FP16 model requires ~140GB VRAM. One A100 80GB is insufficient. Tensor parallelism splits weight matrices across 2 GPUs: each holds ~70GB. NIM supports this via tensor_parallelism configuration. INT4 (Option C) is an alternative but sacrifices quality; RAM offloading (Option D) creates severe latency bottlenecks.' },

  { id: 4202, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scenario: Auto-Scaling', difficulty: 'medium', keywords: ['scenario', 'autoscaling', 'GPU', 'HPA'],
    question: 'Your AI agent service handles 100 requests/day on weekdays but spikes to 2000 requests/day on Monday mornings. Your current fixed deployment of 2 GPU pods cannot handle the spike, causing timeouts. What is the best scaling solution?',
    options: {
      A: 'Permanently provision 10 GPU pods to handle peak load',
      B: 'Configure Kubernetes HPA with a custom metric (GPU utilization or queue depth) to scale from 2 to 10 pods automatically, combined with predictive scaling that pre-warms pods before Monday 9am based on historical patterns',
      C: 'Queue all Monday requests and process them throughout the week',
      D: 'Add a rate limiter that rejects requests above 100/hour on Mondays'
    },
    answer: 'B',
    explanation: 'Reactive + predictive scaling: HPA reacts to current load (GPU utilization > 70% → add pods) and predictive scaling pre-warms based on historical Monday patterns (scale up at 8:45am before the spike). Permanent over-provisioning wastes ~$3K+/month in idle GPU costs. Rate limiting (Option D) fails users rather than serving them.' },

  { id: 4203, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scenario: Blue-Green Deployment', difficulty: 'medium', keywords: ['scenario', 'blue-green', 'rollback', 'deployment'],
    question: 'You are deploying a new version of your AI agent (v2) while v1 is serving production traffic. You need zero downtime and instant rollback capability if v2 has quality issues. What deployment strategy should you use?',
    options: {
      A: 'Deploy v2 directly over v1 with a rolling update',
      B: 'Blue-green deployment: keep v1 (blue) running, deploy v2 (green) alongside it, run smoke tests on green, then switch the load balancer from blue to green — rollback = switch back to blue in seconds',
      C: 'Canary: deploy v2 to 5% of users first, monitor for 1 week, then promote',
      D: 'Deploy v2 during a maintenance window with planned downtime'
    },
    answer: 'B',
    explanation: 'Blue-green for instant rollback: both versions run simultaneously; traffic switches are instantaneous at the load balancer. If v2 has issues → flip back to v1 in <30 seconds with no rebuild needed. Rolling updates (Option A) have partial exposure during rollout with slower rollback. Canary (Option C) is better for gradual validation but slower to fully deploy.' },

  { id: 4204, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scenario: Cost Spike', difficulty: 'hard', keywords: ['scenario', 'cost', 'runaway', 'budget'],
    question: 'Your AI platform\'s cloud bill spikes from $10K to $80K unexpectedly in one week. GPU costs are normal, but LLM API costs are 8x higher. What is your investigation and remediation plan?',
    options: {
      A: 'Set a hard API spend cap of $10K and alert when reached',
      B: 'Investigate: check per-user/per-feature token usage breakdowns, look for runaway automation (a script making thousands of API calls in a loop), check for prompt expansion bugs. Remediate: add per-user/per-session token budgets, implement anomaly detection alerting when cost/hour exceeds 3x baseline',
      C: 'Switch immediately to a cheaper LLM provider',
      D: 'Disable the feature that uses the LLM API until the cause is found'
    },
    answer: 'B',
    explanation: 'Cost spike investigation: the 8x increase suggests a runaway process or a few high-usage sessions rather than normal growth. Breakdown analysis reveals the culprit. Common causes: infinite loops calling the API, a test script left running in production, or a bug sending 100x the intended context. Prevention: per-session token budgets + real-time cost anomaly alerts.' },

  { id: 4205, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scenario: Triton Configuration', difficulty: 'hard', keywords: ['scenario', 'Triton', 'batching', 'throughput'],
    question: 'Your Triton Inference Server is handling 50 requests/second but GPU utilization is only 30%. Each request takes 20ms individually. How do you improve throughput without adding more GPUs?',
    options: {
      A: 'Increase the number of Triton worker threads',
      B: 'Enable dynamic batching in Triton: set preferred_batch_size=[8,16] and max_queue_delay_microseconds=5000 — Triton will batch concurrent requests together, sending them to the GPU as a single batch and improving GPU utilization to 80%+',
      C: 'Use a smaller model that processes faster',
      D: 'Add request caching to avoid reprocessing similar inputs'
    },
    answer: 'B',
    explanation: 'Low GPU utilization with many requests = batching opportunity. Individual 20ms requests processed one at a time → GPU is mostly idle between kernel launches. Dynamic batching collects 8-16 requests over 5ms → single GPU batch processes 16 requests in ~22ms → effective throughput increases from 50 req/s to ~700 req/s while GPU utilization reaches 85%.' },

  { id: 4206, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scenario: Multi-Region', difficulty: 'hard', keywords: ['scenario', 'multi-region', 'latency', 'data residency'],
    question: 'You have EU users complaining of 800ms latency to your US-based AI service. Additionally, GDPR requires EU user data not to leave Europe. What architecture change is required?',
    options: {
      A: 'Add a CDN to cache AI responses closer to EU users',
      B: 'Deploy a separate AI service stack in an EU region (eu-west-1): EU user requests route to EU service, EU user data processed and stored in EU only, satisfying both latency (<200ms) and data residency requirements',
      C: 'Use gzip compression to speed up response transmission',
      D: 'Negotiate a GDPR exception for transatlantic data transfer'
    },
    answer: 'B',
    explanation: 'EU deployment is the only solution that satisfies both requirements: (1) Latency: US → EU round-trip is 100-150ms minimum; EU-local service eliminates transatlantic latency. (2) GDPR: Standard Contractual Clauses allow transatlantic data transfer but "data must not leave EU" requirements mandate local processing. CDN cannot cache unique AI responses.' },

  { id: 4207, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scenario: Rollback Strategy', difficulty: 'medium', keywords: ['scenario', 'rollback', 'model', 'production'],
    question: 'You deployed a new model fine-tune (v3) and quality metrics are degrading 6 hours after deployment. Users are complaining. What is your immediate action and what process would have prevented this?',
    options: {
      A: 'Redeploy v3 with a fixed prompt — the model is fine, the prompt needs adjustment',
      B: 'Immediately roll back to v2 (restore serving the last known-good model), then investigate v3 in a non-production environment. Prevention: a staged rollout (10% → 50% → 100% traffic) with automated quality gates would have caught this at 10%',
      C: 'Continue with v3 and issue a user-facing message about temporary degradation',
      D: 'Retrain v3 with additional data to fix the quality issue'
    },
    answer: 'B',
    explanation: 'Immediate rollback is the right call — stop user impact first, investigate second. Having v2 tagged in the model registry makes rollback a single command. Prevention: staged rollout with automated quality gates (if metric X drops > 5% at any traffic slice → auto-rollback) would have limited exposure to 10% of users for ~1 hour rather than 100% for 6 hours.' },

  { id: 4208, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scenario: Kubernetes Resource Limits', difficulty: 'medium', keywords: ['scenario', 'Kubernetes', 'OOM', 'resource limits'],
    question: 'Your AI agent pods are being OOMKilled (Out of Memory) by Kubernetes every few hours, causing service disruptions. The model requires 20GB GPU memory and 16GB CPU memory. What Kubernetes configuration is wrong?',
    options: {
      A: 'The model is too large — switch to a smaller model',
      B: 'The pod resource limits are set too low (e.g., memory limit=8Gi). Set limits.memory=20Gi (or higher to allow for overhead), set requests.memory=16Gi, and ensure the node has sufficient allocatable memory',
      C: 'OOMKilled means the disk is full — add more storage',
      D: 'Kubernetes automatically adjusts limits — no configuration is needed'
    },
    answer: 'B',
    explanation: 'OOMKilled = pod exceeded its memory limit, Kubernetes killed it. Fix: set memory limits that match or exceed actual model requirements plus overhead (OS, Python runtime ~2-4GB). resource.limits.memory must be ≥ actual peak memory usage. Also check for memory leaks in long-running inference loops that gradually increase usage.' },

  { id: 4209, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scenario: Observability Gap', difficulty: 'medium', keywords: ['scenario', 'observability', 'debugging', 'production'],
    question: 'A user reports the AI agent gave them wrong information about a product, but you cannot reproduce the issue or find which component failed. Your logs only show "request received" and "response sent." What observability was missing?',
    options: {
      A: 'More detailed error logs would have helped',
      B: 'Distributed tracing with span-level detail: each LLM call, tool call, retrieval step, and intermediate result should be logged with a trace_id so you can replay the exact execution path for any specific request',
      C: 'The user\'s device logs should be collected for debugging',
      D: 'Store full conversation transcripts for manual review'
    },
    answer: 'B',
    explanation: 'Without distributed tracing, debugging production AI failures is nearly impossible. Each request should generate a trace with spans for: retrieval (what was retrieved?), LLM call (what prompt was sent? what was the raw response?), tool calls (what was called? what did it return?). With trace_id, you can reconstruct exactly what happened for request #abc123.' },

  { id: 4210, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scenario: Batch vs Real-Time', difficulty: 'medium', keywords: ['scenario', 'batch', 'real-time', 'inference'],
    question: 'Your AI pipeline needs to process 1 million customer records nightly to generate personalized recommendations. You currently use the same real-time API endpoint and it takes 48 hours to complete. What architectural change is needed?',
    options: {
      A: 'Buy more GPU servers to speed up the real-time API',
      B: 'Switch to batch inference: submit all 1M records as a batch job, use larger batch sizes (32-128 per forward pass) for maximum GPU utilization, and schedule it as an overnight job — batch inference is 10-50x more cost-efficient than real-time for offline processing',
      C: 'Process records in parallel across 50 real-time API threads',
      D: 'Reduce the number of records processed from 1M to 100K'
    },
    answer: 'B',
    explanation: 'Batch inference is the right tool for offline bulk processing. Real-time APIs optimize for low latency (one-at-a-time), batch optimizes for throughput (many at once). Batch processing 1M records: larger batches maximize GPU utilization, no HTTP overhead per request, purpose-built infrastructure (SageMaker Batch Transform, vLLM offline mode). Reduces runtime from 48h to 2-4h.' },
];
