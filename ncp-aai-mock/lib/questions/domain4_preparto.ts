import { Question } from '../types';

export const domain4PrepartoQuestions: Question[] = [
  {
    id: 4801,
    domain: 4,
    domainName: 'Deployment and Scaling',
    topic: 'Scenario: NVIDIA NIM Deployment',
    question: 'Your team is deploying a Llama-3-70B model to serve your customer support agent. You need: (1) a production-ready inference container with optimized throughput, (2) OpenAI-compatible API endpoints so your existing LangChain agents work without code changes, and (3) GPU memory optimization. Which NVIDIA product directly addresses all three requirements?',
    options: {
      A: 'NVIDIA Triton Inference Server — an open-source inference serving framework for any model format.',
      B: 'NVIDIA NIM (NVIDIA Inference Microservice) — pre-built, optimized container for Llama-3-70B with TensorRT-LLM backend, OpenAI-compatible /v1/chat/completions endpoint, and automatic GPU memory optimization.',
      C: 'NVIDIA AI Workbench — a development environment for building and testing AI applications locally.',
      D: 'NVIDIA NeMo Framework — a training and fine-tuning toolkit for LLMs with inference capability.'
    },
    answer: 'B',
    explanation: 'NVIDIA NIM is specifically designed for this scenario: (1) Pre-built containers with TensorRT-LLM backend provide optimized throughput out of the box. (2) OpenAI-compatible endpoints (/v1/chat/completions, /v1/models) mean zero code changes for LangChain agents using the OpenAI client. (3) TensorRT-LLM includes automatic KV cache optimization and quantization. Triton (A) requires manual model configuration. AI Workbench (C) is a dev environment. NeMo (D) is primarily for training.',
    keywords: ['NIM', 'NVIDIA NIM', 'TensorRT-LLM', 'OpenAI-compatible', 'inference microservice'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 4802,
    domain: 4,
    domainName: 'Deployment and Scaling',
    topic: 'Scenario: Triton Inference Server Configuration',
    question: 'You are configuring NVIDIA Triton Inference Server for a high-throughput agent embedding pipeline processing 10,000 requests/minute. Select TWO Triton features that would most improve throughput for this batch embedding workload.',
    options: {
      A: 'Dynamic batching: Triton collects multiple incoming requests within a configurable wait window and sends them as a single batch to the GPU, dramatically improving GPU utilization for embedding models.',
      B: 'Model warm-up: pre-loading the model weights into GPU memory at startup to avoid cold-start latency on the first request.',
      C: 'Concurrent model execution: running multiple instances of the embedding model on the same GPU or across multiple GPUs, allowing parallel execution of batches.',
      D: 'Request priority queuing: routing premium-tier requests to a dedicated GPU partition.',
      E: 'Model versioning: keeping multiple embedding model versions deployed simultaneously for A/B testing.'
    },
    answer: 'AC',
    explanation: '(A) Dynamic batching is Triton\'s most impactful throughput feature: instead of processing one embedding at a time (wasting GPU parallelism), it accumulates requests and sends batches — GPU utilization goes from ~5% (single request) to >80% (full batches). (C) Concurrent model execution (instance_group in model config) runs multiple model instances in parallel — essential for 10K req/min throughput. Option B (warm-up) reduces cold-start latency but doesn\'t increase steady-state throughput. Option D (priority queuing) is a fairness feature. Option E (versioning) is for deployment management.',
    keywords: ['Triton', 'dynamic batching', 'concurrent execution', 'throughput', 'instance_group'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 4803,
    domain: 4,
    domainName: 'Deployment and Scaling',
    topic: 'Scenario: Canary Deployment',
    question: 'You are releasing a new version of your agent\'s LLM (upgrading from Llama-3-8B to Llama-3-70B). The 70B model is slower but produces better answers. You want to validate production behavior before full rollout. Which deployment strategy is MOST appropriate?',
    options: {
      A: 'Blue-green deployment: switch 100% of traffic from the 8B model to the 70B model, monitor for 24 hours, then roll back if issues arise.',
      B: 'Canary deployment: route 5% of traffic to the 70B model, monitor latency, error rates, and user satisfaction metrics, gradually increase traffic if metrics are positive.',
      C: 'Shadow deployment: route all traffic to both models simultaneously, compare outputs offline, but only serve users the 8B model responses.',
      D: 'Feature flag deployment: enable the 70B model only for users who opt-in via a settings toggle.'
    },
    answer: 'B',
    explanation: 'Canary deployment is the textbook approach for validating a new model version in production: (1) Small initial traffic (5%) limits blast radius if the 70B model has unexpected issues. (2) Real production traffic reveals behaviors that staging doesn\'t. (3) Gradual ramp (5% → 25% → 100%) based on metrics allows data-driven confidence building. Blue-green (A) creates a cliff: if the 70B model has issues, 100% of users are affected. Shadow (C) is excellent for offline comparison but doesn\'t validate user-facing behavior. Feature flag (D) creates selection bias — opt-in users aren\'t representative.',
    keywords: ['canary deployment', 'traffic splitting', 'rollout', 'A/B testing', 'model deployment'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 4804,
    domain: 4,
    domainName: 'Deployment and Scaling',
    topic: 'Scenario: TensorRT-LLM Optimization',
    question: 'Your agent\'s LLM inference is the bottleneck: the model takes 8 seconds to generate a 500-token response on an A100 GPU. Select TWO TensorRT-LLM optimizations that would most reduce this latency.',
    options: {
      A: 'INT8 weight-only quantization: convert model weights from fp16 to INT8, reducing memory bandwidth requirements and enabling faster weight loading during inference.',
      B: 'Increase the batch size from 1 to 32 to improve GPU utilization for each request.',
      C: 'Continuous batching (inflight batching): process new requests as soon as a slot in the batch is available (between tokens), rather than waiting for an entire batch to complete.',
      D: 'KV cache quantization: compress the key-value cache in memory, allowing more context to fit in GPU memory and reducing cache miss latency.',
      E: 'Use a larger A100 with 80GB VRAM instead of the current 40GB model.'
    },
    answer: 'AD',
    explanation: '(A) Weight-only INT8 quantization reduces memory bandwidth usage by ~2x (loading 8-bit weights vs 16-bit), directly reducing the memory-bound portion of token generation latency. (D) KV cache quantization (FP8 KV cache in TensorRT-LLM) reduces KV cache memory footprint, allowing longer sequences to stay in GPU memory and reducing latency from cache eviction. Option B (increasing batch size) improves throughput, not single-request latency. Option C (continuous batching) improves multi-user throughput, not single-request latency. Option E (more VRAM) helps if the bottleneck is cache eviction, but doesn\'t address computation speed.',
    keywords: ['TensorRT-LLM', 'quantization', 'KV cache', 'INT8', 'latency'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 4805,
    domain: 4,
    domainName: 'Deployment and Scaling',
    topic: 'Scenario: Horizontal Scaling',
    question: 'Your agent API serves 500 concurrent users at peak. Each request takes ~3 seconds (LLM inference + tool calls). A single server handles 20 concurrent requests before latency degrades. How many server replicas do you need at peak, and which autoscaling metric is MOST appropriate?',
    options: {
      A: '25 replicas; scale on CPU utilization > 70%.',
      B: '25 replicas; scale on custom metric: active_requests_per_replica > 15 (keeping 25% headroom below the 20-request saturation point).',
      C: '500 replicas — one per concurrent user — to guarantee dedicated resources.',
      D: '10 replicas; scale on memory utilization > 80%.'
    },
    answer: 'B',
    explanation: '500 concurrent users ÷ 20 requests/replica = 25 replicas. The scaling metric matters: CPU utilization (A) is a poor proxy for LLM inference workloads (inference is GPU-bound, CPU stays low). The correct metric is active_requests_per_replica: when replicas approach saturation (>15 requests, keeping headroom below the 20-request limit), add replicas proactively. This prevents latency spikes before they occur. 500 replicas (C) is massively over-provisioned and expensive. 10 replicas (D) is under-provisioned at 50 requests each — 2.5x beyond saturation.',
    keywords: ['horizontal scaling', 'autoscaling', 'replicas', 'concurrent requests', 'custom metrics'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 4806,
    domain: 4,
    domainName: 'Deployment and Scaling',
    topic: 'Scenario: GPU Memory Optimization',
    question: 'You are deploying a 70B parameter model in fp16 on two A100 80GB GPUs using tensor parallelism. During load testing, you observe OOM (out of memory) errors when concurrent requests exceed 8. Select TWO techniques to increase max concurrency without adding more GPUs.',
    options: {
      A: 'Reduce the KV cache allocation: configure TensorRT-LLM to allocate less GPU memory for the KV cache and rely on CPU offloading for overflow.',
      B: 'Enable paged attention (PagedAttention): manage KV cache in fixed-size pages rather than pre-allocating contiguous blocks, dramatically reducing KV cache fragmentation and waste.',
      C: 'Reduce the model\'s context window from 8K to 2K tokens: this reduces per-request KV cache size by 4x, fitting more concurrent requests.',
      D: 'Switch from fp16 to fp32: higher precision improves memory efficiency.',
      E: 'Use model quantization (INT4/INT8): reduce model weight size, freeing GPU memory for more concurrent KV caches.'
    },
    answer: 'BE',
    explanation: '(B) PagedAttention (the core innovation in vLLM, also in TensorRT-LLM) eliminates KV cache fragmentation — contiguous block allocation wastes 60-80% of KV cache memory due to internal fragmentation; paged allocation reduces waste to near-zero, fitting more concurrent requests. (E) Quantization reduces the model\'s static memory footprint (70B fp16 = ~140GB; INT4 = ~35GB per model), freeing memory for additional KV caches — the key driver of concurrency. Option A (CPU offload) increases latency. Option C (reduce context) changes product behavior. Option D is backwards — fp32 uses MORE memory.',
    keywords: ['PagedAttention', 'KV cache', 'quantization', 'GPU memory', 'concurrency'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 4807,
    domain: 4,
    domainName: 'Deployment and Scaling',
    topic: 'Scenario: Multi-Model Serving',
    question: 'Your platform serves 15 different fine-tuned variants of the same base model (Llama-3-8B), each specialized for a different customer. Loading all 15 models simultaneously requires 15× the GPU memory. What serving architecture solves this?',
    options: {
      A: 'Deploy 15 separate GPU instances, one per customer model.',
      B: 'Use LoRA adapter serving: load the single base model once into GPU memory and dynamically swap LoRA adapters per request using a multi-LoRA serving framework (e.g., S-LoRA or Punica), so all 15 variants share the base model weights.',
      C: 'Merge all 15 LoRA adapters into the base model weights and use a classifier to route users to the correct output head.',
      D: 'Serve all 15 models sequentially on a single GPU, loading each model on demand and evicting the previous one.'
    },
    answer: 'B',
    explanation: 'Multi-LoRA serving (B) is designed exactly for this scenario: S-LoRA and Punica batch requests for different LoRA adapters together, serving multiple adapter variants on a single base model loaded once. Memory footprint = base model + all adapter weights (adapters are tiny, typically 10-100MB each vs 16GB for the base). This is 15x more memory-efficient than 15 separate model instances. Option A is 15x the cost. Option C destroys adapter specialization. Option D (sequential loading) creates unacceptable latency per-request.',
    keywords: ['S-LoRA', 'multi-LoRA', 'adapter serving', 'base model sharing', 'Punica'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 4808,
    domain: 4,
    domainName: 'Deployment and Scaling',
    topic: 'NIM vs Triton Comparison',
    question: 'Select TWO accurate statements that correctly distinguish NVIDIA NIM from NVIDIA Triton Inference Server in terms of their intended use cases and capabilities.',
    options: {
      A: 'NIM is a higher-level abstraction: pre-packaged containers for specific models (Llama, Mistral, Stable Diffusion, etc.) with OpenAI-compatible APIs, requiring minimal configuration. Triton is a general-purpose serving framework that requires manual model configuration, backend selection, and performance tuning.',
      B: 'Triton supports heterogeneous model serving (serving PyTorch, ONNX, TensorRT, and custom backends on the same server), while NIM only serves NVIDIA-certified LLMs.',
      C: 'NIM containers always outperform Triton deployments for the same model because NIM uses proprietary inference optimizations unavailable to Triton.',
      D: 'Triton is only available on NVIDIA datacenter GPUs, while NIM can run on consumer-grade RTX GPUs.',
      E: 'NIM and Triton are mutually exclusive — NIM containers do not use Triton internally.'
    },
    answer: 'AB',
    explanation: '(A) Accurately describes the abstraction level difference: NIM = plug-and-play for certified models; Triton = flexible framework for any model, any backend, requiring expert configuration. (B) Triton\'s multi-backend support (PyTorchLibTorch, ONNX Runtime, TensorRT, Python, FIL, DALI, OpenVINO) is a documented differentiator. Option C is false — NIM actually uses Triton internally for many models. Option D is false — Triton runs on RTX GPUs too. Option E is false — many NIM containers use Triton as their serving layer.',
    keywords: ['NIM', 'Triton', 'abstraction', 'multi-backend', 'model serving'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 4809,
    domain: 4,
    domainName: 'Deployment and Scaling',
    topic: 'Load Balancing Strategies',
    question: 'Select TWO accurate statements about load balancing strategies for an LLM inference cluster where requests have highly variable response times (short questions finish in 0.5s, complex reasoning takes 15s).',
    options: {
      A: 'Least-connections load balancing (route to the replica with fewest active connections) outperforms round-robin for variable-length LLM requests, because it avoids sending new requests to replicas already handling slow, long-running requests.',
      B: 'Round-robin load balancing performs best for LLM workloads because all requests have roughly equal computational cost.',
      C: 'Request-length-aware routing (route short requests to fast replicas, long requests to high-memory replicas) reduces overall latency by matching request complexity to replica capability.',
      D: 'Consistent hashing should be used for LLM load balancing to ensure the same user always routes to the same replica, warming their personal context cache.',
      E: 'Power-of-two-choices: sample two random replicas and route to the less loaded one — provides near-optimal load distribution with O(1) routing overhead.'
    },
    answer: 'AE',
    explanation: '(A) Least-connections is empirically better than round-robin for high-variance workloads: round-robin sends the 12th request to a replica already processing a 15-second request, while least-connections routes it to a replica that just finished 3 quick requests. (E) Power-of-two-choices is a well-studied distributed systems technique: sampling two replicas and picking the less loaded one provides near-optimal load distribution with minimal coordination overhead. Option B is false — LLM request costs are highly variable. Option C is a valid technique but requires complexity estimation upfront. Option D has limited benefit unless the agent uses session-pinned context (not standard).',
    keywords: ['load balancing', 'least-connections', 'power-of-two', 'LLM serving', 'variable latency'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 4810,
    domain: 4,
    domainName: 'Deployment and Scaling',
    topic: 'Scenario: Cost Optimization',
    question: 'Your agent deployment costs $50K/month in GPU compute. Usage analysis shows: 60% of requests are simple FAQ lookups, 30% are complex multi-step reasoning tasks, and 10% are code generation. How do you reduce costs while maintaining quality for complex tasks?',
    options: {
      A: 'Replace all models with a single 7B model — it costs 10x less than the current 70B model.',
      B: 'Implement a routing layer that classifies request complexity: send FAQ lookups to a fast, cheap 7B model (NIM-hosted); send complex reasoning to the 70B model; send code generation to a code-specialized model. Optimize each tier for its task.',
      C: 'Switch from GPU to CPU inference for FAQ lookups only.',
      D: 'Reduce the number of tokens generated by truncating all responses to 100 tokens.'
    },
    answer: 'B',
    explanation: 'Cascading model routing (B) is the industry-standard cost optimization: FAQs (60% of volume, 10x cheaper on 7B) saves 60% of that volume\'s cost. Complex tasks (30%) keep the high-quality 70B. Code tasks (10%) use a specialized model (e.g., Code Llama) that may be both cheaper and better than general 70B for code. The routing classifier adds minimal overhead (<50ms). Option A degrades quality for 40% of requests (complex + code). Option C (CPU inference) is 10-50x slower, degrading UX. Option D truncates useful responses.',
    keywords: ['cost optimization', 'model routing', 'cascading', '7B vs 70B', 'tiered models'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 4811,
    domain: 4,
    domainName: 'Deployment and Scaling',
    topic: 'Scenario: Container Orchestration for Agents',
    question: 'You are deploying a multi-agent system to Kubernetes where the Orchestrator agent and 5 Specialist agents must communicate. The Orchestrator scales horizontally (3-10 replicas) while Specialist agents scale independently. Select TWO Kubernetes design decisions that correctly handle inter-agent communication in this setup.',
    options: {
      A: 'Deploy each Specialist agent type as a separate Kubernetes Service with a stable DNS name, allowing any Orchestrator replica to discover and call any Specialist replica via service-level load balancing.',
      B: 'Use Kubernetes ConfigMaps to store the IP addresses of all Specialist agents and mount them in the Orchestrator pods.',
      C: 'Deploy all agents in a single pod to avoid network latency between them.',
      D: 'Use a message queue (e.g., Redis Streams or RabbitMQ) for Orchestrator-to-Specialist communication, decoupling scaling of producers (Orchestrators) from consumers (Specialists).',
      E: 'Use NodePort services for each Specialist agent to expose them on fixed ports across the cluster.'
    },
    answer: 'AD',
    explanation: '(A) Kubernetes Services with stable DNS names are the standard pattern for inter-pod communication: any Orchestrator replica calls specialist-billing.namespace.svc.cluster.local and Kubernetes\'s load balancer routes to any available Specialist replica — horizontal scaling is transparent. (D) Message queue decoupling is the robust pattern for independently scaling producers/consumers: Orchestrators publish tasks; Specialist replicas consume at their own rate. This prevents Orchestrator stalls when Specialists are busy. Option B (ConfigMaps for IPs) breaks when pods scale/restart. Option C (single pod) eliminates independent scaling. Option E (NodePort) is for external exposure, not inter-pod communication.',
    keywords: ['Kubernetes', 'Service', 'DNS', 'message queue', 'multi-agent deployment'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 4812,
    domain: 4,
    domainName: 'Deployment and Scaling',
    topic: 'Scenario: Speculative Decoding',
    question: 'Your agent generates long tool call responses (200-500 tokens) and latency is the primary complaint. A colleague suggests speculative decoding. What does speculative decoding do, and which scenario does it MOST improve?',
    options: {
      A: 'Speculative decoding uses a smaller draft model to propose multiple tokens at once, which the larger target model verifies in parallel. It reduces latency for long-form generation tasks where the draft model predictions are frequently accepted.',
      B: 'Speculative decoding pre-generates all possible response tokens at model load time and serves them from cache, eliminating generation latency for common responses.',
      C: 'Speculative decoding runs multiple model instances in parallel and returns the response from whichever instance finishes first.',
      D: 'Speculative decoding uses beam search with a larger beam width to find higher quality responses in fewer forward passes.'
    },
    answer: 'A',
    explanation: 'Speculative decoding (A) uses a small, fast draft model (e.g., 1B) to speculatively generate N tokens ahead, then uses the large target model to verify all N tokens in a single forward pass (which takes the same time as generating 1 token). Accepted tokens are free; rejected tokens trigger re-generation. For tool call responses (structured, predictable text), draft acceptance rates are high — latency reduction of 2-3x is common. Option B (pre-generation cache) is a different technique (semantic caching). Option C (parallel instances returning first) is speculative execution, not speculative decoding. Option D (beam search) is about output quality, not speed.',
    keywords: ['speculative decoding', 'draft model', 'latency', 'token generation', 'LLM serving'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 4813,
    domain: 4,
    domainName: 'Deployment and Scaling',
    topic: 'A/B Testing Models in Production',
    question: 'Select TWO best practices for A/B testing two LLM versions in production to determine which produces better agent task completion rates.',
    options: {
      A: 'Assign users to model variants using a deterministic hash of their user ID, ensuring each user consistently experiences the same model variant throughout the experiment period.',
      B: 'Randomly assign each REQUEST to a model variant, since request-level randomization gives faster statistical significance.',
      C: 'Define the primary metric (task completion rate) before launch and pre-calculate the required sample size for statistical significance at 95% confidence, rather than stopping the test when you see a favorable result.',
      D: 'Run the A/B test for exactly 7 days regardless of sample size collected.',
      E: 'Use the same model for control and variant but change only the system prompt to isolate model behavior from prompt behavior.'
    },
    answer: 'AC',
    explanation: '(A) User-level assignment (not request-level) prevents the same user experiencing both models — this eliminates the "novelty effect" and crossover contamination. Deterministic hashing ensures consistent assignment without a database lookup. (C) Pre-registering your primary metric and calculating sample size prevents p-hacking (stopping when you see a favorable result). This is foundational experimental rigor. Option B (request-level) causes within-user contamination and novelty bias. Option D (fixed 7 days) ignores sample size — you might stop underpowered or waste resources running an already-conclusive test. Option E is testing prompts, not model versions.',
    keywords: ['A/B testing', 'user assignment', 'sample size', 'statistical significance', 'p-hacking'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 4814,
    domain: 4,
    domainName: 'Deployment and Scaling',
    topic: 'Scenario: Cold Start Problem',
    question: 'Your agent API on Kubernetes is configured with HPA (Horizontal Pod Autoscaler) to scale from 0 to 10 replicas. During morning traffic spikes, the first 2 minutes of requests experience 30-second latency because new pods take time to load the 13B model (20 seconds) and initialize the agent framework (10 seconds). What is the BEST solution?',
    options: {
      A: 'Set the HPA minimum replicas to 2 (prevent scale-to-zero) and use KEDA to pre-scale based on scheduled cron patterns (e.g., scale to 5 replicas at 8:45 AM before the 9 AM spike).',
      B: 'Reduce the minimum replicas to 0 and add a 60-second grace period before scaling down to give users time to see the slow responses.',
      C: 'Replace Kubernetes HPA with manual scaling — update replica count every hour based on historical traffic data.',
      D: 'Cache the model weights in a shared PersistentVolumeClaim mounted by all pods to reduce model loading time.'
    },
    answer: 'A',
    explanation: 'Two complementary techniques: (1) Minimum replicas = 2 ensures there are always warm pods ready — eliminates cold starts for baseline traffic. (2) KEDA (Kubernetes Event-Driven Autoscaler) supports cron-based scaling: pre-scale to expected peak capacity before the traffic arrives, so pods are warm when users arrive. Option B (grace period) just delays scale-down — doesn\'t fix cold starts. Option C (manual scaling) is operationally expensive and error-prone. Option D (shared PVC) reduces loading time but doesn\'t prevent cold starts (pods still need to load the model).',
    keywords: ['cold start', 'HPA', 'KEDA', 'pre-scaling', 'warm pods'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 4815,
    domain: 4,
    domainName: 'Deployment and Scaling',
    topic: 'Continuous Batching in LLM Serving',
    question: 'Select TWO accurate statements that describe how continuous batching (also called inflight batching) improves LLM serving throughput compared to static batching.',
    options: {
      A: 'Continuous batching allows new requests to join an ongoing batch mid-generation (as soon as a slot is freed by a completed sequence), eliminating the "waiter problem" where fast requests wait for slow ones to finish before the next batch starts.',
      B: 'Continuous batching increases average response quality by running each request through the model multiple times before returning a result.',
      C: 'Continuous batching reduces GPU memory usage by sharing KV cache memory between concurrent sequences in the same batch.',
      D: 'Static batching must wait for all sequences in a batch to finish before accepting new requests, causing GPU idle time when sequences have variable lengths — continuous batching eliminates this idle time.',
      E: 'Continuous batching requires all requests to have the same input token length to form valid batches.'
    },
    answer: 'AD',
    explanation: '(A) The "join mid-generation" capability is continuous batching\'s core innovation: when sequence #3 finishes at token 50 while sequences #1 and #2 are still generating, sequence #4 can immediately fill that slot — no waiting. (D) Explains WHY static batching wastes GPU cycles: if a batch has one 1000-token request and nine 50-token requests, the GPU idles for 950 tokens while waiting for the long request. Continuous batching refills those slots continuously. Option B is false. Option C describes PagedAttention, not continuous batching. Option E is the opposite of continuous batching\'s advantage.',
    keywords: ['continuous batching', 'inflight batching', 'static batching', 'GPU utilization', 'throughput'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
];