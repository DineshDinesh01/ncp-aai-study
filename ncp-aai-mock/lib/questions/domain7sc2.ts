import { Question } from '../types';

export const domain7sc2Questions: Question[] = [
  { id: 7211, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Scenario: NIM vs Custom Deployment', difficulty: 'hard', keywords: ['scenario', 'NIM', 'vs', 'custom inference'],
    question: 'Your team is debating: (A) deploy Llama 3.1 using NVIDIA NIM, or (B) build a custom inference stack with raw PyTorch + FastAPI. You need production deployment in 3 weeks. Which do you choose?',
    options: {
      A: 'Build custom — NIM is just a wrapper and adds unnecessary overhead',
      B: 'NIM: it provides production-ready inference (TensorRT-LLM optimized, continuous batching, health endpoints, OpenAI-compatible API, Prometheus metrics) out of the box. 3 weeks is not enough time to build, test, and optimize a custom inference stack. Use NIM, customize if specific needs arise later',
      C: 'Custom stack — you will need it eventually so start now',
      D: 'Both simultaneously — run a 3-week comparison to choose the winner'
    },
    answer: 'B',
    explanation: 'Build vs buy for inference: NIM provides: TensorRT-LLM backend (already optimized), OpenAI-compatible API (existing client libraries work), /health endpoints (Kubernetes integration ready), Prometheus metrics (monitoring ready). Building custom: weeks of work for inference server, optimization, API design, monitoring. For a 3-week deadline, NIM is correct. Build custom only when NIM limitations become concrete blockers.' },

  { id: 7212, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Scenario: Guardrails Implementation', difficulty: 'hard', keywords: ['scenario', 'NeMo Guardrails', 'safety', 'topical'],
    question: 'Your enterprise AI assistant keeps going off-topic — users ask it about company products but it starts discussing competitor products and personal opinions. You need to add topical guardrails without retraining. What NVIDIA tool addresses this?',
    options: {
      A: 'Add a post-processing filter to remove competitor mentions from responses',
      B: 'NeMo Guardrails: define Colang flows that specify allowed topics, blocked topics, and canonical responses for sensitive areas. No retraining needed — guardrails intercept conversations at runtime and redirect off-topic queries back to allowed domains',
      C: 'Increase the system prompt length with more detailed topic restrictions',
      D: 'Fine-tune the model on company-specific data to make it naturally stay on topic'
    },
    answer: 'B',
    explanation: 'NeMo Guardrails for topical control: define flows in Colang ("when user asks about competitors → respond with redirect message"), deploy as a runtime layer between user and LLM. Changes take effect immediately without retraining. More reliable than prompt-based restrictions (which can be overridden) because guardrails intercept before the LLM even sees the off-topic query.' },

  { id: 7213, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Scenario: Multi-GPU Training Failure', difficulty: 'hard', keywords: ['scenario', 'multi-GPU', 'NCCL', 'training crash'],
    question: 'Your 8-GPU training job crashes 2 hours in with "NCCL error: Connection refused." The error occurs inconsistently — sometimes at hour 2, sometimes hour 3. What is the most likely cause?',
    options: {
      A: 'The model is too large for 8 GPUs — reduce model size',
      B: 'Network/interconnect instability: NCCL timeouts from intermittent NVLink or InfiniBand errors, or firewall rules intermittently blocking NCCL communication ports. Investigate: check GPU XID errors in DCGM, inspect network logs, enable NCCL_DEBUG=INFO to see communication failure details',
      C: 'NCCL is not compatible with your CUDA version',
      D: 'Increase the NCCL timeout setting from default to 30 minutes'
    },
    answer: 'B',
    explanation: 'Intermittent NCCL failures are almost always network/interconnect issues. Investigation: DCGM XID errors reveal GPU hardware problems, nvidia-smi nvlink status shows NVLink errors, NCCL_DEBUG=INFO logs show which AllReduce operation failed and why. Common causes: faulty NVLink cable, overheating GPU causing link reset, firewall blocking NCCL ephemeral ports. Timeout increase (Option D) masks symptoms rather than fixing the root cause.' },

  { id: 7214, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Scenario: TRT-LLM Quantization Choice', difficulty: 'hard', keywords: ['scenario', 'quantization', 'accuracy', 'TRT-LLM'],
    question: 'You need to serve a 13B model on a single A100 40GB GPU (requires 26GB in FP16, does not fit). You are evaluating INT8 vs INT4 quantization using TensorRT-LLM. Your task requires high accuracy (medical summarization). Which do you choose?',
    options: {
      A: 'INT4 — more aggressive quantization means faster inference',
      B: 'INT8 with SmoothQuant calibration: 13B in INT8 ≈ 13GB (fits A100 40GB with room for KV cache). INT8 typically loses < 1% accuracy on medical text tasks. INT4 at ≈6.5GB is smaller but risks 2-5% accuracy degradation, unacceptable for medical summarization accuracy requirements',
      C: 'Neither — use model distillation to create a 7B model that fits in FP16',
      D: 'Use FP16 with CPU offloading for the layers that do not fit in GPU memory'
    },
    answer: 'B',
    explanation: 'Quantization choice depends on accuracy requirements. Medical summarization: high accuracy critical → INT8 is the right tradeoff. INT8 (SmoothQuant or GPTQ INT8): ≈1% accuracy loss, 2x memory reduction vs FP16. INT4 (AWQ/GPTQ INT4): ≈2-5% accuracy loss, 4x memory reduction. For medical use cases, 1% accuracy loss is acceptable; 5% is not. Choose the least aggressive quantization that fits your hardware.' },

  { id: 7215, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Scenario: NGC Model Selection', difficulty: 'medium', keywords: ['scenario', 'NGC', 'model', 'selection'],
    question: 'You need a foundation model for a customer service chatbot. You are browsing NGC and see Llama 3.1 8B NIM, Mistral 7B NIM, and NVIDIA Nemotron-4 15B NIM. Your key requirements: low latency (< 500ms), English-only, instruction-following. How do you select?',
    options: {
      A: 'Always choose the largest model available (Nemotron 15B) for best quality',
      B: 'Benchmark all three on your specific task: deploy each NIM, run 200 representative customer service queries, measure: task success rate, response latency, and cost per query. The 8B models may match 15B quality on your task at half the latency and cost — always benchmark rather than assume bigger = better',
      C: 'Choose Mistral 7B — it is the most popular open-source model',
      D: 'Choose based on the model with highest MMLU score among the options'
    },
    answer: 'B',
    explanation: 'Model selection via task-specific benchmarking is always correct. Larger models have more parameters but on constrained instruction-following tasks, 7-8B models often match or approach 15B quality while delivering 2x lower latency. MMLU tests academic knowledge breadth, not customer service conversation quality. Benchmark on YOUR task, YOUR data, YOUR latency requirements before committing.' },

  { id: 7216, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Scenario: Triton Ensemble', difficulty: 'hard', keywords: ['scenario', 'Triton', 'ensemble', 'pipeline'],
    question: 'Your AI pipeline: (1) preprocess text → (2) run embedding model → (3) run classification model → (4) post-process results. Currently this pipeline is managed in Python with 4 separate API calls. What Triton feature optimizes this?',
    options: {
      A: 'Deploy all 4 steps as separate Triton models and call them sequentially from your application',
      B: 'Triton Ensemble Pipelines: define a DAG where models are chained — Triton handles the data flow between preprocessing, embedding, classification, and postprocessing in a single end-to-end request with no round-trips between steps, significantly reducing total latency',
      C: 'Combine all 4 steps into one large model for better performance',
      D: 'Use Triton\'s BLS (Business Logic Scripting) to write the pipeline in Python inside Triton'
    },
    answer: 'B',
    explanation: 'Triton Ensemble: define model A feeds into model B feeds into model C — all within Triton\'s execution engine. Vs 4 separate API calls: eliminates 3 round-trips (network serialization/deserialization between steps), Triton manages tensor data locality between models, and the full pipeline appears as a single model endpoint. Typical latency reduction: 40-60% for multi-step pipelines.' },

  { id: 7217, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Scenario: RAPIDS Acceleration', difficulty: 'medium', keywords: ['scenario', 'RAPIDS', 'cuDF', 'preprocessing'],
    question: 'Your ML data preprocessing pipeline uses pandas and takes 45 minutes to process 500GB of training data daily. This is the bottleneck for your model retraining frequency. How do you accelerate it?',
    options: {
      A: 'Buy a server with more CPU cores to parallelize pandas operations',
      B: 'Replace pandas with RAPIDS cuDF: GPU-accelerated DataFrame library with near-identical API. The same preprocessing code (with minor changes) runs on GPU and processes 500GB in 2-3 minutes instead of 45 minutes, enabling daily retraining instead of weekly',
      C: 'Rewrite the preprocessing in C++ for maximum performance',
      D: 'Use Dask to distribute the pandas workload across 20 CPUs'
    },
    answer: 'B',
    explanation: 'cuDF GPU acceleration: 10-100x speedup vs pandas for data preprocessing operations (group-by, merge, sort, filter, apply). API compatibility means minimal code changes. 500GB in 45 minutes (CPU) → 2-3 minutes (GPU A100). This changes retraining from weekly (bottlenecked by preprocessing) to potentially multiple times per day. ROI: one A100 GPU vs 20-node CPU cluster for equivalent throughput.' },

  { id: 7218, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Scenario: NeMo Customizer', difficulty: 'hard', keywords: ['scenario', 'NeMo Customizer', 'LoRA', 'production'],
    question: 'Your company wants to fine-tune Llama 3.1 70B for internal legal document review but has no ML engineers — only data scientists with labeled data. What NVIDIA platform component enables fine-tuning without ML infrastructure expertise?',
    options: {
      A: 'This requires ML engineers — fine-tuning is too complex for data scientists alone',
      B: 'NVIDIA NeMo Customizer (part of NVIDIA AI Enterprise): provides a managed fine-tuning API — data scientists upload labeled data, select base model and LoRA config, submit training job. NeMo Customizer handles: infrastructure, distributed training, checkpoint management, and producing a deployable adapter. No ML infra knowledge required',
      C: 'Use AutoML tools to automatically select the best fine-tuning approach',
      D: 'Prompt engineering is sufficient — fine-tuning is not needed for legal tasks'
    },
    answer: 'B',
    explanation: 'NeMo Customizer: managed fine-tuning service. Data scientist workflow: upload JSONL training data → select base NIM model → configure LoRA hyperparameters (rank, alpha) → submit → receive trained adapter → deploy to NIM. No Kubernetes, no GPU cluster management, no distributed training code. Democratizes fine-tuning for teams without deep ML infrastructure expertise.' },

  { id: 7219, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Scenario: Prometheus Alerting', difficulty: 'medium', keywords: ['scenario', 'Prometheus', 'DCGM', 'alerting'],
    question: 'Your GPU cluster serves production NIM traffic. You want to be alerted before GPU memory is exhausted (to prevent OOMKilled inference requests) rather than after. How do you implement proactive alerting?',
    options: {
      A: 'Check GPU memory manually every hour using nvidia-smi',
      B: 'Configure DCGM Exporter → Prometheus → AlertManager: create alert rule "DCGM_FI_DEV_FB_USED > 90% of DCGM_FI_DEV_FB_TOTAL for 5 minutes → page oncall." This fires a warning alert at 90% memory, giving time to scale before 100% causes OOM failures',
      C: 'Set Kubernetes memory limits to prevent OOM — this is automatic',
      D: 'Monitor CPU memory instead — GPU OOM is handled automatically'
    },
    answer: 'B',
    explanation: 'Proactive GPU monitoring: DCGM → Prometheus scrapes GPU metrics every 15s → AlertManager evaluates rules → alert fires at 90% memory (threshold) with 5-minute sustained duration (prevents false positives from brief spikes). Action: scale up GPU pods or reduce batch size before 100% causes OOM. Kubernetes memory limits (Option C) catch CPU RAM OOM but not GPU VRAM OOM.' },

  { id: 7220, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Scenario: Production NIM Security', difficulty: 'hard', keywords: ['scenario', 'NIM', 'security', 'authentication'],
    question: 'You expose a NIM endpoint on the public internet for your mobile app. Within 24 hours, you receive a $50,000 unexpected cloud bill from an unknown party making millions of inference calls. What security controls were missing?',
    options: {
      A: 'NIM should have detected the abuse and stopped automatically',
      B: 'Missing: API authentication (any internet user could call the endpoint), rate limiting per API key, budget alerts and hard spending caps. Immediate response: rotate credentials, restrict to known IP ranges, implement JWT/API key authentication, add rate limits (1,000 requests/key/hour), set cloud budget alerts at $100',
      C: 'The cloud provider is responsible for preventing unauthorized billing',
      D: 'Add a CAPTCHA to the NIM endpoint to prevent automated abuse'
    },
    answer: 'B',
    explanation: 'Public AI endpoint security must-haves: (1) Authentication: API keys or JWT — reject unauthenticated requests. (2) Authorization: verify the key is valid and has sufficient quota. (3) Rate limiting: prevent individual keys from excessive usage. (4) Budget alerts: cloud spending anomaly detection. (5) IP allowlisting for sensitive deployments. Never expose inference endpoints without authentication — LLM inference is expensive and easy to abuse.' },
];
