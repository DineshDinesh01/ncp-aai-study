import { Question } from '../types';

export const domain7bQuestions: Question[] = [
  { id: 7016, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NIM Customization', difficulty: 'hard', keywords: ['NIM', 'LoRA', 'customization', 'model'],
    question: 'Customizing a NIM-deployed model for domain-specific tasks is best done through:',
    options: { A: 'Modifying the NIM container source code', B: 'NeMo fine-tuning workflows to create LoRA adapters, then deploying the base NIM with the adapter loaded', C: 'Changing the NIM\'s system prompt only', D: 'Training a new model from scratch and replacing the NIM' },
    answer: 'B', explanation: 'NIM supports LoRA adapters — fine-tune with NeMo to create lightweight adapters for domain-specific behavior, then deploy the standard base NIM with the adapter, combining optimization with customization.' },

  { id: 7017, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Hopper Architecture', difficulty: 'hard', keywords: ['H100', 'Hopper', 'transformer engine', 'FP8'],
    question: 'NVIDIA H100\'s Transformer Engine provides performance for LLMs via:',
    options: { A: 'Higher clock speeds than A100', B: 'FP8 mixed-precision training and inference with automatic per-tensor scaling, achieving 2x+ performance vs A100 at FP16', C: 'A dedicated AI chip separate from the GPU die', D: 'Larger VRAM capacity only' },
    answer: 'B', explanation: 'H100\'s Transformer Engine dynamically chooses between FP8/FP16 precision per tensor operation, providing 2x+ LLM throughput vs A100 while maintaining training convergence via per-tensor scaling factors.' },

  { id: 7018, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA Networking', difficulty: 'medium', keywords: ['NVLink', 'InfiniBand', 'GPU interconnect', 'bandwidth'],
    question: 'NVLink in NVIDIA DGX systems enables:',
    options: { A: 'Internet connectivity for GPU clusters', B: 'High-bandwidth GPU-to-GPU interconnects (900 GB/s for H100) enabling fast data sharing for multi-GPU model training/inference', C: 'Network link monitoring for GPU health', D: 'VPN connectivity between GPU nodes' },
    answer: 'B', explanation: 'NVLink provides ~18x higher bandwidth than PCIe for GPU-to-GPU communication within a node — critical for tensor parallelism where GPUs must exchange activation data at every layer.' },

  { id: 7019, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'cuVS Library', difficulty: 'hard', keywords: ['cuVS', 'vector search', 'GPU accelerated', 'RAFT'],
    question: 'NVIDIA cuVS (formerly RAFT) accelerates vector similarity search by:',
    options: { A: 'Using compressed vector representations', B: 'Providing GPU-accelerated ANN algorithms (IVF-Flat, IVF-PQ, HNSW) that leverage CUDA for 10-100x faster index build and search', C: 'Vectorizing scalar computations', D: 'Converting vector databases to use NVIDIA\'s proprietary format' },
    answer: 'B', explanation: 'cuVS implements GPU-accelerated ANN algorithms (IVF-Flat, IVF-PQ, HNSW) enabling billion-scale vector search that would take minutes on CPU to complete in seconds on NVIDIA GPUs.' },

  { id: 7020, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA Inference Architecture', difficulty: 'medium', keywords: ['NIMs', 'architecture', 'layers', 'inference stack'],
    question: 'The NVIDIA inference stack for production AI consists of (bottom to top):',
    options: { A: 'Data → Training → Deployment → Monitoring', B: 'Hardware (GPU) → CUDA/NCCL → TensorRT → Triton → NIM microservices → Applications', C: 'User → Application → Model → GPU → Cloud', D: 'CPU → RAM → GPU → SSD → Network' },
    answer: 'B', explanation: 'NVIDIA\'s inference stack layers: GPU hardware → CUDA runtime → TensorRT optimization → Triton serving → NIM microservice packaging → application integration — each layer optimizes for the next.' },

  { id: 7021, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'AgentIQ Architecture', difficulty: 'medium', keywords: ['AgentIQ', 'profiler', 'evaluator', 'workflow'],
    question: 'NVIDIA AgentIQ\'s profiler component helps developers:',
    options: { A: 'Profile GPU hardware performance', B: 'Measure agent workflow performance — identifying which steps consume the most tokens, time, and cost', C: 'Profile user interaction patterns', D: 'Profile network bandwidth usage' },
    answer: 'B', explanation: 'AgentIQ\'s built-in profiler instruments each agent workflow step, reporting token counts, latency, and cost per step — enabling data-driven optimization of agentic pipelines.' },

  { id: 7022, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA Morpheus', difficulty: 'hard', keywords: ['Morpheus', 'cybersecurity', 'AI', 'NVIDIA'],
    question: 'NVIDIA Morpheus is optimized for:',
    options: { A: 'Morphing 3D models with AI', B: 'GPU-accelerated AI cybersecurity — real-time analysis of network traffic, logs, and events for threat detection', C: 'Modifying model architectures at runtime', D: 'Natural language morphological analysis' },
    answer: 'B', explanation: 'Morpheus is NVIDIA\'s cybersecurity AI framework — processing massive volumes of network/log data on GPUs in real-time to detect threats, using AI models for anomaly detection and classification.' },

  { id: 7023, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NIM for Embeddings', difficulty: 'medium', keywords: ['NIM', 'embedding', 'NV-Embed', 'retrieval'],
    question: 'NVIDIA NIM includes embedding model microservices because:',
    options: { A: 'Embedding is only relevant for training, not inference', B: 'Production RAG requires optimized, GPU-accelerated embedding inference for both real-time queries and batch ingestion', C: 'Embedding models are too small to benefit from NIMs', D: 'NIM embedding services are only for NVIDIA\'s own models' },
    answer: 'B', explanation: 'NIM packages embedding models (NV-Embed, E5, BGE) as optimized microservices with TensorRT acceleration, providing 10x+ throughput improvement over CPU-based or naive GPU embedding.' },

  { id: 7024, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA NeMo Data Curator', difficulty: 'medium', keywords: ['NeMo', 'data curator', 'deduplication', 'quality filter'],
    question: 'NVIDIA NeMo Data Curator helps with:',
    options: { A: 'Curating museum-quality displays of NVIDIA products', B: 'Large-scale data preprocessing pipelines for LLM training — deduplication, quality filtering, format standardization at scale', C: 'Curating user preferences for model fine-tuning', D: 'Managing NVIDIA software licenses' },
    answer: 'B', explanation: 'NeMo Data Curator provides GPU-accelerated data preparation for LLM training: document deduplication (exact + fuzzy), quality scoring, language identification, and formatting for trillion-token datasets.' },

  { id: 7025, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA RIVA', difficulty: 'medium', keywords: ['RIVA', 'speech', 'ASR', 'TTS', 'multimodal'],
    question: 'NVIDIA RIVA provides:',
    options: { A: 'A GPU graphics rendering framework', B: 'GPU-accelerated speech AI services (ASR, TTS, NLP) that can be integrated into voice-enabled AI agents', C: 'Real-time video analytics', D: 'A database for storing AI model metadata' },
    answer: 'B', explanation: 'RIVA provides on-prem or cloud GPU-accelerated speech APIs: Automatic Speech Recognition (ASR), Text-to-Speech (TTS), and NLP models, enabling multimodal agents with voice input/output.' },

  { id: 7026, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NIM API Standards', difficulty: 'easy', keywords: ['OpenAI compatible', 'REST', 'NIM', 'integration'],
    question: 'NIM\'s OpenAI-compatible API means existing OpenAI-based agent code can switch to NIM by:',
    options: { A: 'Completely rewriting the agent code', B: 'Changing only the base_url to the NIM endpoint and model name — all other code remains identical', C: 'Installing an NVIDIA-specific Python SDK', D: 'Retraining the model on NIM infrastructure' },
    answer: 'B', explanation: 'NIM\'s API compatibility: openai.OpenAI(base_url="http://nim-endpoint/v1", api_key="...") → instant switch. The same .chat.completions.create() calls work identically with any NIM-hosted model.' },

  { id: 7027, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA Networking AI', difficulty: 'hard', keywords: ['BlueField', 'DPU', 'networking', 'offload'],
    question: 'NVIDIA BlueField DPUs benefit AI infrastructure by:',
    options: { A: 'Providing additional GPU compute for model inference', B: 'Offloading networking, security, and storage tasks from CPUs/GPUs to the DPU, freeing GPU resources for AI compute', C: 'Blue-colored field cooling for GPU thermal management', D: 'Providing high-bandwidth memory for model weights' },
    answer: 'B', explanation: 'BlueField DPUs handle network processing, encryption, and storage I/O offloaded from main CPUs/GPUs — GPUs are freed from networking overhead and can dedicate 100% of resources to AI inference.' },

  { id: 7028, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA Isaac', difficulty: 'medium', keywords: ['Isaac', 'robotics', 'simulation', 'ROS'],
    question: 'NVIDIA Isaac ROS integrates AI agents with robotics by:',
    options: { A: 'Naming robots after the physicist Isaac Newton', B: 'Providing GPU-accelerated ROS2 packages for perception, planning, and control in robotics AI applications', C: 'A game engine for robot simulations', D: 'Industrial strength cleaning robots' },
    answer: 'B', explanation: 'Isaac ROS brings GPU acceleration to ROS2 — CUDA-optimized nodes for stereo depth, object detection, and navigation — enabling AI-powered robots to process sensor data at real-time rates.' },

  { id: 7029, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA Omniverse Agents', difficulty: 'medium', keywords: ['Omniverse', '3D', 'simulation', 'digital twin'],
    question: 'NVIDIA Omniverse can serve as an agent environment by:',
    options: { A: 'Providing omniscient view of all GPU operations', B: 'Creating photorealistic 3D simulated environments where AI agents can be trained and tested before real-world deployment', C: 'Omnidirectional wireless GPU communication', D: 'Storing all versions of AI models in a unified repository' },
    answer: 'B', explanation: 'Omniverse provides physically accurate 3D simulations (physics, rendering) for training and testing agents (robots, autonomous vehicles, warehouse AI) — synthetic training data generation and safe testing.' },

  { id: 7030, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'CUDA Programming for Agents', difficulty: 'hard', keywords: ['CUDA', 'kernel', 'custom op', 'optimization'],
    question: 'Custom CUDA kernels in agent tooling are justified when:',
    options: { A: 'The developer prefers low-level programming', B: 'A specific operation (custom attention, specialized postprocessing) lacks an optimized library implementation and is on the critical path', C: 'Any operation involving more than 1000 elements', D: 'PyTorch cannot run on the target GPU' },
    answer: 'B', explanation: 'Custom CUDA kernels require significant expertise and maintenance. Only justified for operations: (1) on the critical performance path, (2) not optimally handled by existing libraries (PyTorch, cuBLAS, TensorRT).' },
];
