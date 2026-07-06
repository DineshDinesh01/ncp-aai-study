import { Question } from '../types';

export const domain4sc2Questions: Question[] = [
  { id: 4211, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scenario: vLLM vs TGI', difficulty: 'hard', keywords: ['scenario', 'vLLM', 'TGI', 'inference server'],
    question: 'You need to self-host a 7B LLM for your agent. You are choosing between vLLM and HuggingFace TGI. Your primary requirement is maximum throughput for serving 1,000 concurrent users. Which do you choose and why?',
    options: {
      A: 'TGI — it is from HuggingFace which is the most popular ML platform',
      B: 'vLLM — PagedAttention provides superior memory efficiency allowing more concurrent sequences than TGI. For high concurrency, vLLM\'s continuous batching with PagedAttention typically achieves 2-4x higher throughput than alternatives',
      C: 'Both are equivalent — choose based on team familiarity',
      D: 'Neither — use the OpenAI API for high concurrency instead of self-hosting'
    },
    answer: 'B',
    explanation: 'For high-concurrency production inference, vLLM\'s PagedAttention is the key differentiator: it eliminates KV cache fragmentation, allowing more sequences to run concurrently on the same GPU memory. Benchmarks consistently show vLLM outperforming TGI on throughput-critical workloads. TGI has advantages in model support breadth, but for throughput, vLLM wins.' },

  { id: 4212, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scenario: Infrastructure as Code', difficulty: 'medium', keywords: ['scenario', 'Terraform', 'IaC', 'reproducibility'],
    question: 'Your team manually configured the GPU cluster for your AI service through the cloud console. A new engineer accidentally deletes a security group, causing a 4-hour outage to recreate it from memory. What practice would have prevented this?',
    options: {
      A: 'Give only senior engineers access to the cloud console',
      B: 'Infrastructure as Code (Terraform/Pulumi): all infrastructure defined in version-controlled code. The deleted security group is recreated in 30 seconds with terraform apply. Console access becomes read-only for most engineers — all changes go through code review',
      C: 'Take daily screenshots of all console configurations as documentation',
      D: 'Enable AWS CloudTrail to log who deleted the security group for accountability'
    },
    answer: 'B',
    explanation: 'IaC for AI infrastructure: every security group, VPC, GPU instance, and NIM deployment defined in Terraform. Accidental deletion → git diff shows what changed → terraform apply restores in seconds. Additional benefits: reproducibility (spin up identical staging environment), PR review for infrastructure changes, disaster recovery from git clone + terraform apply.' },

  { id: 4213, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scenario: Latency SLO Breach', difficulty: 'hard', keywords: ['scenario', 'latency', 'SLO', 'p99'],
    question: 'Your AI API\'s SLO is p95 latency < 2 seconds. Monitoring shows p95 = 1.8s (OK) but p99 = 8 seconds. Affected users at the 99th percentile are the highest-value enterprise customers who send long complex queries. What do you investigate first?',
    options: {
      A: 'p99 is within acceptable range — only p95 is in the SLO',
      B: 'Investigate tail latency causes: long prompt/completion token counts (longer = slower), GPU memory pressure causing queuing at high load, garbage collection pauses, or a specific query pattern. Profile 99th-percentile requests to find common characteristics and optimize for them specifically',
      C: 'Increase the p95 SLO to p99 to capture the enterprise customers',
      D: 'Add more GPUs to reduce queue depth and improve tail latency'
    },
    answer: 'B',
    explanation: 'p99 tail latency matters enormously for high-value users and long-running agent tasks. Investigation: log token counts for p99 requests (often they are 10x longer), check GPU utilization at p99 times (queuing effect), look for periodic spikes (GC, model loading). Fix: token count limits, priority queuing for premium users, or separate fast/slow queues by expected complexity.' },

  { id: 4214, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scenario: Secret Management', difficulty: 'hard', keywords: ['scenario', 'secret', 'Vault', 'rotation'],
    question: 'Your NIM deployment needs API keys for 5 downstream services. Currently these are stored as Kubernetes Secrets (base64-encoded, not encrypted at rest). A security audit flags this as a critical risk. What is the remediation?',
    options: {
      A: 'Base64 encode the secrets more thoroughly before storing them in Kubernetes',
      B: 'Migrate to HashiCorp Vault or cloud provider secret manager (AWS Secrets Manager): secrets stored encrypted, short-lived leases with auto-rotation, audit log of every secret access, and pods receive secrets via Vault agent injection at runtime — never stored in Kubernetes etcd',
      C: 'Encrypt the Kubernetes Secrets using a KMS key (enable encryption at rest in etcd)',
      D: 'Remove all secrets and hardcode them in the Docker image to avoid Kubernetes Secret risks'
    },
    answer: 'B',
    explanation: 'Kubernetes Secrets base64 is not encryption — anyone with kubectl access reads them. Proper secret management: Vault provides encryption at rest, dynamic short-lived credentials (API keys rotate every hour), fine-grained access control (pod A can only access secret X), and audit trail. etcd encryption (Option C) is an improvement but lacks dynamic rotation and audit logging.' },

  { id: 4215, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scenario: GPU Optimization', difficulty: 'hard', keywords: ['scenario', 'MIG', 'GPU sharing', 'utilization'],
    question: 'You have an H100 80GB GPU running one large LLM inference workload that uses 40GB (50% of GPU). The other 40GB sits idle. You have a second smaller inference workload that needs 20GB. How do you run both efficiently?',
    options: {
      A: 'You need a second H100 GPU — sharing is not supported in production',
      B: 'Use NVIDIA MIG (Multi-Instance GPU): partition the H100 into two isolated instances (e.g., 3g.40gb + 2g.20gb). Each workload runs in its own MIG instance with dedicated compute, memory, and cache — full isolation, no interference, 100% GPU utilization',
      C: 'Use NVIDIA MPS (Multi-Process Service) to time-share the GPU between workloads',
      D: 'Run both workloads on the same GPU without partitioning — they will share memory automatically'
    },
    answer: 'B',
    explanation: 'MIG for isolation + utilization: H100 supports up to 7 MIG instances. For two workloads needing 40GB and 20GB: 3g.40gb + 2g.20gb partitioning. Each gets hardware-isolated compute (streaming multiprocessors), dedicated VRAM, isolated L2 cache. No interference between workloads. Doubles GPU utilization from 50% to 75-80%. MPS shares time but not memory partitions — less isolation.' },

  { id: 4216, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scenario: Model Registry', difficulty: 'medium', keywords: ['scenario', 'model registry', 'lineage', 'rollback'],
    question: 'Your production model was fine-tuned 3 months ago. Quality has degraded but no one remembers which training data version, hyperparameters, or evaluation results correspond to the current production model. How do you investigate and prevent this in the future?',
    options: {
      A: 'Retrain the model from scratch with better documentation this time',
      B: 'Implement a model registry (MLflow, W&B Model Registry): every trained model is logged with training data version, hyperparameters, all eval metrics, and the person who promoted it to production. Investigation becomes: look up production model → see full lineage → identify what changed. Rollback: promote the previous registered version',
      C: 'Store model weights in S3 with timestamp-based naming convention',
      D: 'Add a comment in the code with today\'s training details'
    },
    answer: 'B',
    explanation: 'Model registry is essential for production ML governance. Without it: "which model is in production?" is unanswerable. Registry provides: immutable model artifacts, linked metadata (data version, code commit, hyperparameters, eval results), promotion history (who approved to production when), and one-click rollback to any previous version. S3 timestamps alone don\'t capture evaluation results or training context.' },

  { id: 4217, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scenario: Load Testing AI', difficulty: 'hard', keywords: ['scenario', 'load test', 'AI', 'realistic'],
    question: 'You load test your AI agent service by sending 1,000 concurrent requests with the same 10-word prompt "What is the capital of France?" The test passes. In production, requests vary from 10 to 2,000 tokens. Why does this load test give a false sense of confidence?',
    options: {
      A: 'The load test is valid — if it handles 1,000 concurrent short requests, it handles any traffic',
      B: 'LLM performance is highly token-dependent: a 2,000-token prompt takes 20x longer to process than a 10-token prompt and uses 20x more KV cache memory. Load testing with uniform short prompts doesn\'t reveal queue backup, memory pressure, or throughput drops under realistic mixed-length traffic',
      C: 'The test uses too many concurrent users — realistic load is lower',
      D: 'Load testing AI is fundamentally different and should use user sessions, not concurrent requests'
    },
    answer: 'B',
    explanation: 'AI load testing must use realistic token distributions. Short-prompt load tests miss: KV cache memory pressure from long contexts, output token variability (different completion lengths), and the compounding effect of long requests blocking short ones. Best practice: sample from production prompt length distribution, include the longest 5% of prompts (tail cases), and measure queue depth under mixed load.' },

  { id: 4218, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scenario: DR Test', difficulty: 'medium', keywords: ['scenario', 'disaster recovery', 'failover', 'RTO'],
    question: 'Your AI service has a documented disaster recovery plan with RTO = 15 minutes. You have never tested it. The documented steps involve 12 manual steps. Is your RTO achievable?',
    options: {
      A: 'Yes — 15 minutes is plenty of time for 12 steps',
      B: 'Unknown until tested — and likely not achievable. 12 manual steps during a stressful incident with possibly new responders typically takes 45-90 minutes. Test: run a game day where you simulate the failure and measure actual recovery time. Then automate the runbook to reduce human steps',
      C: 'RTO documentation is sufficient — testing is not necessary unless an incident occurs',
      D: 'Reduce the RTO target to 60 minutes to match the actual procedure time'
    },
    answer: 'B',
    explanation: 'Untested RTO is fiction. 12 manual steps during a real incident: engineer is stressed, documentation is ambiguous, systems behave unexpectedly, on-call may be new. Actual time: 3-5x the estimated time. Fix: (1) Run quarterly DR tests measuring actual recovery time. (2) Automate runbook steps where possible. (3) Document is living — update after each test. "Hope" is not an SLA.' },

  { id: 4219, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scenario: GPU Memory OOM', difficulty: 'hard', keywords: ['scenario', 'OOM', 'batch size', 'gradient'],
    question: 'During fine-tuning of a 7B model, your A100 80GB GPU runs out of memory (CUDA OOM error) at batch size 8. You need to use an effective batch of 32 for training stability. What technique lets you achieve this without more GPUs?',
    options: {
      A: 'Reduce model size to 3B to fit larger batches',
      B: 'Use gradient accumulation: run 4 forward passes with batch size 8 (accumulating gradients each step) and only update weights after 4 steps. Effective batch size = 8 × 4 = 32 with no additional memory cost over batch size 8',
      C: 'Increase GPU swap space to use system RAM for overflow memory',
      D: 'Use mixed precision training (FP16) to double the effective memory'
    },
    answer: 'B',
    explanation: 'Gradient accumulation is the standard solution: accumulate_steps=4, batch_size=8 → 4 forward passes each with batch=8 → accumulate gradients → single optimizer step equivalent to batch=32. Memory usage = single batch size (8), not accumulated (32). Used universally in LLM training when memory limits batch size. FP16 (Option D) also helps but doesn\'t achieve the same effective batch scaling.' },

  { id: 4220, domain: 4, domainName: 'Deployment & Scaling', topic: 'Scenario: Multi-Cloud Strategy', difficulty: 'medium', keywords: ['scenario', 'multi-cloud', 'vendor lock-in', 'availability'],
    question: 'Your AI service is 100% on AWS. AWS raises GPU instance prices by 40%. You want to avoid this vendor dependency in the future. What deployment architecture gives you flexibility?',
    options: {
      A: 'Negotiate better pricing with AWS — multi-cloud is too complex',
      B: 'Containerize all services (Docker + Kubernetes), use cloud-agnostic infrastructure tools (Terraform, not CloudFormation), store models in a portable format, and maintain deployment configs for at least one alternative cloud (GCP or Azure). This enables migration or split-deployment without rewriting your application',
      C: 'Move all workloads to bare-metal owned servers to eliminate cloud dependency',
      D: 'Distribute equally across all cloud providers from day one'
    },
    answer: 'B',
    explanation: 'Multi-cloud portability strategy: containers + Kubernetes abstract away cloud-specific infrastructure. Terraform deploys to any cloud. Model artifacts in S3/GCS/Azure Blob are cloud-specific but easily mirrored. This doesn\'t mean running on multiple clouds simultaneously (expensive, complex) — it means you can migrate in days, not months, giving real negotiating leverage with cloud providers.' },
];
