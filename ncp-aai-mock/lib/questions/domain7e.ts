import { Question } from '../types';

export const domain7eQuestions: Question[] = [
  { id: 7056, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NIM Deployment Modes', difficulty: 'medium', keywords: ['NIM', 'on-premises', 'cloud', 'air-gapped'],
    question: 'NVIDIA NIM can be deployed in air-gapped (offline) environments by:',
    options: { A: 'Air-gapped deployment is not supported by NIM', B: 'Pulling NIM container images from NGC to a private registry with internet access, then deploying containers from the private registry to the air-gapped environment', C: 'NIM requires constant internet connectivity for model validation', D: 'Air-gapped NIMs must be licensed separately' },
    answer: 'B', explanation: 'NIM air-gapped: 1) internet-connected machine: docker pull nvcr.io/nim/meta/llama3.1-8b-instruct:1.0.0 → push to private registry. 2) air-gapped environment: pull from private registry → run. Model weights cached in container. NVIDIA AI Enterprise license allows offline deployment for secure/regulated environments.' },

  { id: 7057, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'cuGraph', difficulty: 'hard', keywords: ['cuGraph', 'graph analytics', 'NetworkX', 'GPU'],
    question: 'RAPIDS cuGraph accelerates graph analytics by:',
    options: { A: 'Drawing faster graph visualizations on GPU', B: 'GPU-accelerating graph algorithms (PageRank, BFS, community detection, shortest paths) with NetworkX-compatible API — 100-1000x speedup over CPU graph libraries', C: 'cuGraph only supports directed acyclic graphs', D: 'cuGraph requires proprietary NVIDIA graph format' },
    answer: 'B', explanation: 'cuGraph: drop-in GPU replacement for NetworkX. nx.pagerank(G) → cg.pagerank(G). For knowledge graphs with millions of nodes/edges: CPU takes hours, cuGraph takes seconds. Used in GraphRAG to accelerate community detection and traversal for large enterprise knowledge graphs.' },

  { id: 7058, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NIM Structured Outputs', difficulty: 'medium', keywords: ['JSON mode', 'structured output', 'schema', 'constrained decoding'],
    question: 'NIM structured outputs (JSON mode with schema validation) work by:',
    options: { A: 'Post-processing LLM output to fix JSON formatting', B: 'Constrained decoding: using grammar/schema to only allow token sequences forming valid JSON matching the specified schema — guarantees structurally valid output', C: 'Adding JSON formatting instructions to every system prompt', D: 'JSON mode only works for simple flat objects, not nested schemas' },
    answer: 'B', explanation: 'Constrained decoding for JSON: parse JSON schema → convert to grammar → at each decode step, mask out tokens that would violate grammar → model only selects from valid continuations. Result: 100% syntactically valid JSON matching schema, no post-processing, no parsing errors.' },

  { id: 7059, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'TensorRT Quantization', difficulty: 'hard', keywords: ['TensorRT', 'INT8', 'PTQ', 'QAT', 'calibration'],
    question: 'Post-Training Quantization (PTQ) in TensorRT requires a calibration dataset because:',
    options: { A: 'Calibration data is used to retrain the quantized model', B: 'PTQ calibrates activation quantization ranges by running representative inputs through the model — without calibration, dynamic range estimation is inaccurate causing quality degradation', C: 'Calibration dataset updates the model weights', D: 'TensorRT PTQ does not require calibration for INT8' },
    answer: 'B', explanation: 'PTQ calibration: weights → quantized at initialization (static). Activations → range depends on input distribution. Calibration: run 100-1000 representative samples → measure actual activation ranges → set INT8 clipping thresholds. Without calibration: clipping range wrong → significant accuracy loss.' },

  { id: 7060, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA Omniverse', difficulty: 'medium', keywords: ['Omniverse', 'USD', 'simulation', 'digital twin'],
    question: 'NVIDIA Omniverse enables agentic AI applications through:',
    options: { A: 'Providing a social network for NVIDIA developers', B: 'USD-based simulation environments where AI agents can be trained and tested in physically accurate virtual worlds before deployment in real environments', C: 'Omniverse is only for entertainment and game development', D: 'Omniverse requires specialized non-standard hardware' },
    answer: 'B', explanation: 'Omniverse for agentic AI: digital twin simulations (factories, autonomous vehicles, robots) → agents learn and are validated in simulation → transfer to reality. USD (Universal Scene Description) enables multi-application collaboration. Isaac Sim (robot simulation) built on Omniverse.' },

  { id: 7061, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA DOCA', difficulty: 'hard', keywords: ['DOCA', 'BlueField', 'DPU', 'data center'],
    question: 'NVIDIA DOCA SDK on BlueField DPUs enables agentic AI security by:',
    options: { A: 'Adding AI capabilities directly to network switch hardware', B: 'Moving network security functions (firewalling, zero-trust, encryption) off host CPUs onto DPUs — freeing CPU/GPU compute for AI while enforcing security in hardware', C: 'DOCA only supports Mellanox legacy networking', D: 'BlueField DPUs must run the same OS as the host' },
    answer: 'B', explanation: 'DOCA on BlueField: network traffic → DPU processes (firewall, DPI, encryption) → only authorized traffic reaches host GPU. AI workloads run unimpeded on GPUs while DPU handles all networking security. Zero-trust implementation in hardware that AI processes cannot bypass.' },

  { id: 7062, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NGC Containers', difficulty: 'easy', keywords: ['NGC', 'container', 'registry', 'verified'],
    question: 'NVIDIA NGC container images provide value through:',
    options: { A: 'Containers that automatically configure all NVIDIA hardware', B: 'Pre-built, optimized, and tested containers with CUDA, cuDNN, and framework dependencies pre-installed — eliminating complex GPU software stack setup', C: 'NGC containers include model weights for all NVIDIA AI models', D: 'NGC containers only work on NVIDIA Cloud' },
    answer: 'B', explanation: 'NGC containers: docker pull nvcr.io/nvidia/pytorch:24.01-py3 → get: Ubuntu + CUDA 12.3 + cuDNN 9 + PyTorch 2.2 + apex + Transformer Engine + dozens of optimized libraries. Verified to work together. Eliminates dependency hell in AI development. Signed containers with CVE scanning.' },

  { id: 7063, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NeMo Evaluation', difficulty: 'medium', keywords: ['NeMo', 'evaluation', 'lm-eval-harness', 'benchmark'],
    question: 'NeMo Framework integrates with lm-evaluation-harness to:',
    options: { A: 'Evaluate network latency of NeMo deployments', B: 'Run standardized LLM benchmarks (MMLU, HellaSwag, TruthfulQA, GSM8K) directly on models being trained or fine-tuned in NeMo without exporting', C: 'NeMo evaluation requires converting models to ONNX format first', D: 'Evaluation is only supported for NeMo base models, not fine-tuned variants' },
    answer: 'B', explanation: 'NeMo + lm-eval: mid-training or post-fine-tuning evaluation without checkpoint export. Trigger benchmark suite → MMLU, ARC, HellaSwag etc. → results logged to W&B or TensorBoard → compare against base model and previous checkpoints. Continuous evaluation during training identifies optimal checkpoint.' },

  { id: 7064, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'CUDA Programming', difficulty: 'hard', keywords: ['CUDA', 'kernel', 'thread', 'warp'],
    question: 'CUDA warp divergence in custom AI kernels occurs when:',
    options: { A: 'Different GPU warps execute different programs', B: 'Threads within a warp (32 threads executing in SIMT) take different conditional branches — serializing execution of both branches reducing effective parallelism', C: 'Warps are allocated to different streaming multiprocessors', D: 'Warp divergence only occurs in memory-bound kernels' },
    answer: 'B', explanation: 'Warp divergence: if (thread_id % 2 == 0) { path_A } else { path_B } → within a 32-thread warp, 16 take path_A, 16 take path_B → both paths execute sequentially → 50% efficiency. Minimize conditional branches within kernels. Rearrange data so threads in same warp follow same path.' },

  { id: 7065, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NIM API Endpoints', difficulty: 'easy', keywords: ['NIM', 'API', 'health', 'metrics', 'endpoint'],
    question: 'Standard NIM microservice API endpoints include:',
    options: { A: 'Only the /v1/chat/completions endpoint', B: '/v1/chat/completions (inference), /v1/health/ready (readiness), /v1/health/live (liveness), /v1/models (available models), /metrics (Prometheus)', C: 'NIM API endpoints are proprietary and not standardized', D: 'NIM health endpoints require authentication tokens' },
    answer: 'B', explanation: 'NIM standard endpoints: /v1/chat/completions (OpenAI-compatible inference), /v1/completions (legacy), /v1/embeddings (for embedding NIMs), /v1/health/ready (returns 200 when model loaded), /v1/health/live (returns 200 when process running), /metrics (Prometheus metrics). Same across all NIM types.' },
];
