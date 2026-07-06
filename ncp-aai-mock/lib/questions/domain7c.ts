import { Question } from '../types';

export const domain7cQuestions: Question[] = [
  { id: 7031, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'TensorRT-LLM Optimization', difficulty: 'hard', keywords: ['TensorRT-LLM', 'kernel fusion', 'optimization', 'inference'],
    question: 'TensorRT-LLM\'s kernel fusion optimization improves LLM inference by:',
    options: { A: 'Fusing multiple transformer layers into one GPU kernel', B: 'Combining multiple sequential GPU operations into one kernel, reducing memory bandwidth and kernel launch overhead', C: 'Fusing different model architectures into a single model', D: 'Kernel fusion is a networking technique, not GPU optimization' },
    answer: 'B', explanation: 'Kernel fusion: LayerNorm → QKV projection → attention → output projection normally require 4 separate GPU kernels and 4× memory read/write. Fused kernel does all 4 steps in one pass → 2-4x faster with less memory bandwidth.' },

  { id: 7032, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA CUDA Graphs', difficulty: 'hard', keywords: ['CUDA graphs', 'latency', 'kernel launch', 'repetitive'],
    question: 'CUDA Graphs benefit LLM inference latency by:',
    options: { A: 'Graphing GPU utilization for monitoring purposes', B: 'Pre-recording the sequence of GPU operations into a graph, then replaying it with minimal CPU overhead — eliminating kernel launch latency for repeated operations', C: 'Optimizing CUDA code by creating dependency graphs', D: 'Providing visual graphs of GPU computation' },
    answer: 'B', explanation: 'CUDA Graphs: capture the sequence of CUDA operations as a replayable graph. For LLM token generation (same ops each step), replay is much faster than re-launching kernels each iteration. Reduces per-token latency by 10-20%.' },

  { id: 7033, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'RAPIDS cuDF', difficulty: 'medium', keywords: ['RAPIDS', 'cuDF', 'GPU dataframe', 'data processing'],
    question: 'NVIDIA RAPIDS cuDF accelerates data preprocessing for AI by:',
    options: { A: 'Providing Rapid Application Development tools for AI', B: 'GPU-accelerated pandas-compatible DataFrames — identical API to pandas but operations run on GPU, achieving 10-100x speedup on large datasets', C: 'RAPIDS is only for financial data analysis', D: 'cuDF requires rewriting all pandas code from scratch' },
    answer: 'B', explanation: 'cuDF: drop-in replacement for pandas (same API) that executes on GPU. `import cudf as pd` → existing pandas code runs on GPU. 10-100x faster for large-scale data preprocessing (tokenization, feature engineering, cleaning) in AI pipelines.' },

  { id: 7034, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NGC Catalog', difficulty: 'easy', keywords: ['NGC', 'catalog', 'containers', 'models'],
    question: 'NVIDIA NGC (NVIDIA GPU Cloud) catalog provides:',
    options: { A: 'GPU cloud computing credits for NVIDIA customers', B: 'Registry of GPU-optimized AI containers, pre-trained models, and Helm charts for deploying NVIDIA AI software', C: 'A cloud gaming platform for NVIDIA GPU owners', D: 'NGC is deprecated and replaced by NIM' },
    answer: 'B', explanation: 'NGC: hub for NVIDIA-optimized software. Contains: NIM containers, NeMo training images, RAPIDS containers, pre-trained model weights (NV-Embed, Llama3-NIM), and Helm charts. Single source for production-ready NVIDIA AI artifacts.' },

  { id: 7035, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NEMO Guardrails Config', difficulty: 'medium', keywords: ['NeMo Guardrails', 'config', 'Colang', 'flow'],
    question: 'Colang (the NeMo Guardrails programming language) defines:',
    options: { A: 'CUDA kernel configurations', B: 'Conversation flows and guardrail rules using a domain-specific language that specifies how the AI should handle specific user inputs', C: 'Color schemes for NVIDIA AI dashboards', D: 'Column-level security for GPU data access' },
    answer: 'B', explanation: 'Colang is NeMo Guardrails\' DSL: define "flows" (conversation patterns), "define user intents" (recognize user asks), "define bot behaviors" (how to respond). Example: "when user ask about dangerous activity → bot refuse and redirect."' },

  { id: 7036, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Triton Model Ensemble', difficulty: 'hard', keywords: ['Triton ensemble', 'pipeline', 'pre-processing', 'post-processing'],
    question: 'Triton Inference Server ensemble pipelines enable:',
    options: { A: 'Running an ensemble of identical models for robustness', B: 'Chaining multiple models and pre/post-processing steps in a single deployable unit — tokenizer → LLM → detokenizer without extra network hops', C: 'Ensemble learning combining multiple predictions', D: 'Only applicable for classical ML models, not LLMs' },
    answer: 'B', explanation: 'Triton ensemble: compose tokenizer (Python model) + LLM (TensorRT-LLM backend) + detokenizer (Python model) as an ensemble. Client sends text → ensemble handles tokenization → LLM inference → detokenization → returns text. Single endpoint.' },

  { id: 7037, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NEMO Customizer', difficulty: 'medium', keywords: ['NeMo Customizer', 'fine-tuning service', 'managed', 'API'],
    question: 'NVIDIA AI Enterprise NeMo Customizer provides:',
    options: { A: 'A customization tool for NVIDIA GPU settings', B: 'Managed fine-tuning service — submit training job via API, NeMo Customizer handles data, training, and returns deployable LoRA adapter', C: 'Custom CUDA kernels for specific AI operations', D: 'UI customization for NVIDIA AI dashboards' },
    answer: 'B', explanation: 'NeMo Customizer: API-driven fine-tuning. Upload dataset → specify base model + hyperparameters → submit job → service handles GPU provisioning, distributed training, and delivers LoRA adapter ready for NIM deployment. No infrastructure management.' },

  { id: 7038, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA AI Enterprise', difficulty: 'easy', keywords: ['AI Enterprise', 'support', 'certified', 'enterprise'],
    question: 'NVIDIA AI Enterprise software suite provides:',
    options: { A: 'Enterprise GPU hardware with extended warranties', B: 'Enterprise-grade support, security updates, and certifications for NVIDIA AI software (NIM, NeMo, RAPIDS) on validated hardware', C: 'A separate operating system for AI servers', D: 'Enterprise licenses for competitor AI tools' },
    answer: 'B', explanation: 'NVIDIA AI Enterprise: subscription providing enterprise-grade support SLAs, security vulnerability patching, certified containers (CVE scans), and NVIDIA Support access for all NVIDIA AI platform components on NVIDIA-certified hardware.' },

  { id: 7039, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'DCGM Metrics', difficulty: 'medium', keywords: ['DCGM', 'GPU metrics', 'monitoring', 'prometheus'],
    question: 'DCGM (Data Center GPU Manager) Prometheus exporter provides:',
    options: { A: 'GPU datacenter global management console', B: 'Real-time GPU metrics (utilization, memory, temperature, power, errors) in Prometheus format for integration with Grafana monitoring stacks', C: 'Direct control of GPU power settings', D: 'DCGM is only for training, not inference monitoring' },
    answer: 'B', explanation: 'DCGM exporter: per-GPU metrics → Prometheus → Grafana dashboards. Key AI metrics: GPU utilization (%), GPU memory used (GB), SM occupancy, temperature, ECC errors, NVLink bandwidth. Essential for GPU fleet observability.' },

  { id: 7040, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA Networking Scale', difficulty: 'hard', keywords: ['InfiniBand', 'RoCE', 'NCCL', 'collective operations'],
    question: 'NCCL (NVIDIA Collective Communications Library) optimizes:',
    options: { A: 'Network configuration for NVIDIA cloud services', B: 'AllReduce, AllGather, and Broadcast operations across GPUs/nodes, utilizing NVLink and InfiniBand for optimal multi-GPU training throughput', C: 'NCCL is a neural network compression tool', D: 'Non-Consecutive Communication Links between GPU chips' },
    answer: 'B', explanation: 'NCCL: implements collective operations (AllReduce for gradient aggregation) using ring/tree algorithms optimized for NVLink (intra-node) and InfiniBand/RoCE (inter-node). Critical for distributed training — gradient sync is the communication bottleneck.' },

  { id: 7041, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVTX Profiling', difficulty: 'hard', keywords: ['NVTX', 'Nsight', 'profiling', 'annotation'],
    question: 'NVTX (NVIDIA Tools Extension) annotations in agent code help by:',
    options: { A: 'Automatically optimizing CUDA kernels', B: 'Adding named markers/ranges to GPU timelines — visible in Nsight profiles, showing which agent workflow steps correspond to which GPU operations', C: 'Extending GPU voltage for overclock profiling', D: 'NVTX is only for game development profiling' },
    answer: 'B', explanation: 'NVTX: add `nvtx.push_range("retrieval_step")` in agent code → appears as colored bars in Nsight Systems timeline alongside CUDA kernel execution → correlate "agent chose to call this tool" with "these GPU kernels ran at that time."' },

  { id: 7042, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NIM Structured Output', difficulty: 'medium', keywords: ['NIM', 'structured output', 'JSON', 'grammar'],
    question: 'NIM microservices support constrained/structured output generation via:',
    options: { A: 'Post-processing to validate NIM outputs', B: 'Grammar-based sampling constraints that guarantee outputs match a specified JSON schema or regex pattern, eliminating need for retries', C: 'Structured configuration files for NIM deployment', D: 'Structured outputs require separate post-processing microservices' },
    answer: 'B', explanation: 'NIM structured outputs: specifying a JSON schema → the LLM sampling process is constrained to only produce tokens that could form valid JSON matching that schema. 100% schema compliance without retries — critical for tool-calling agent reliability.' },

  { id: 7043, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA Health Monitoring', difficulty: 'medium', keywords: ['GPU health', 'ECC errors', 'XID errors', 'monitoring'],
    question: 'XID error codes in NVIDIA GPU monitoring indicate:',
    options: { A: 'Extended Identification numbers for GPU inventory', B: 'Specific GPU hardware/driver errors (XID 79 = GPU hang, XID 48 = DBE memory errors) that signal hardware problems requiring attention', C: 'Cross-infrastructure diagnostics for AI deployments', D: 'XID codes are unique identifiers for AI model versions' },
    answer: 'B', explanation: 'XID errors: hardware/driver error events logged by NVIDIA drivers. XID 79 (GPU hang) → reset GPU or replace; XID 48 (Double Bit Error in GPU memory) → ECC correction failed → potential data corruption → investigate hardware. Critical for production reliability.' },

  { id: 7044, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NIM Security', difficulty: 'hard', keywords: ['NIM security', 'authentication', 'model access', 'NGC API key'],
    question: 'Securing NIM microservices in production requires:',
    options: { A: 'NIM containers are secure by default with no additional configuration', B: 'API key authentication (NGC API key or custom auth), network policies limiting access, and secrets management for credentials', C: 'Only HTTPS encryption is needed for NIM security', D: 'Security is handled by the LLM model itself' },
    answer: 'B', explanation: 'NIM production security: authenticate requests (NGC API key or integrate with enterprise auth), K8s NetworkPolicy (only authorized services access NIM port), store API keys in Vault/K8s secrets, TLS for in-transit encryption, and audit logging.' },

  { id: 7045, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA Platform Ecosystem', difficulty: 'easy', keywords: ['ecosystem', 'partners', 'integrations', 'cloud'],
    question: 'NVIDIA NIM is available on which cloud platforms and services?',
    options: { A: 'Only on NVIDIA\'s own data centers', B: 'AWS, Azure, Google Cloud, and major MLOps platforms (Vertex AI, SageMaker, Azure AI) as well as on-premises via NVIDIA AI Enterprise', C: 'NIM is only available as on-premises software', D: 'Only on Azure through a Microsoft partnership' },
    answer: 'B', explanation: 'NIM availability: multi-cloud (AWS Marketplace, Azure AI, Google Cloud) + on-prem (NVIDIA AI Enterprise). Also integrated into MLOps platforms. Hybrid deployment: same NIM API regardless of where it runs — cloud for flexibility, on-prem for data sovereignty.' },
];
