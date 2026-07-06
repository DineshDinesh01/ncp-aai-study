import { Question } from '../types';

export const domain7fQuestions: Question[] = [
  { id: 7066, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NIM Benchmarking', difficulty: 'medium', keywords: ['benchmarking', 'throughput', 'latency', 'genai-perf'],
    question: 'NVIDIA GenAI-Perf tool benchmarks NIM deployments by measuring:',
    options: { A: 'Only GPU memory usage during inference', B: 'Token throughput (tokens/second), inter-token latency, time-to-first-token, and request concurrency scaling under configurable load patterns', C: 'GenAI-Perf only works with NVIDIA proprietary benchmarks', D: 'Benchmarking NIMs requires manual HTTP load testing scripts' },
    answer: 'B', explanation: 'GenAI-Perf: automated NIM benchmarking → simulate concurrent users, variable prompt/output lengths → reports: output_token_throughput (1200 tok/s), inter_token_latency_p95 (25ms), time_to_first_token_p95 (450ms). Compares optimization strategies (quantization, batching settings) objectively.' },

  { id: 7067, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Hopper Architecture', difficulty: 'hard', keywords: ['H100', 'Hopper', 'transformer engine', 'FP8'],
    question: 'NVIDIA H100 Transformer Engine provides AI speedups through:',
    options: { A: 'Dedicated transformer cores separate from CUDA cores', B: 'Dynamic per-tensor FP8 quantization with automatic scaling — uses FP8 for matrix multiply (compute) while maintaining FP16/BF16 for accumulation to preserve accuracy', C: 'Transformer Engine is software-only, requiring no hardware changes', D: 'H100 Transformer Engine only works with specific LLM architectures' },
    answer: 'B', explanation: 'Transformer Engine: identifies transformer layers (attention, FFN) → dynamically quantizes weight/activation tensors to FP8 at compute time → H100 FP8 tensor cores execute 2x faster than BF16 → accumulate in higher precision → dequantize. Minimal accuracy loss with ~2x throughput for transformer models.' },

  { id: 7068, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NeMo Framework', difficulty: 'medium', keywords: ['NeMo', 'toolkit', 'ASR', 'TTS', 'NLP'],
    question: 'NVIDIA NeMo framework provides collections for:',
    options: { A: 'Only LLM fine-tuning workflows', B: 'Automatic Speech Recognition (ASR), Text-to-Speech (TTS), Natural Language Processing (NLP), and LLM training/customization — unified framework for conversational AI', C: 'NeMo is only for computer vision tasks', D: 'NeMo requires NVIDIA Omniverse to function' },
    answer: 'B', explanation: 'NeMo collections: NeMo ASR (Conformer, Parakeet models), NeMo TTS (FastPitch, HiFiGAN), NeMo NLP/LLM (Megatron-LM foundation, SFT/PEFT/RLHF pipelines). Unified training framework supporting trillion-parameter models with tensor/pipeline/sequence parallelism.' },

  { id: 7069, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA Inference Platform', difficulty: 'medium', keywords: ['inference stack', 'Triton', 'TRT-LLM', 'NIM'],
    question: 'The NVIDIA inference stack layers are:',
    options: { A: 'NIM → Triton → TensorRT-LLM from bottom to top', B: 'TensorRT-LLM (model optimization) → Triton Inference Server (serving framework) → NIM (enterprise-packaged microservice) from bottom to top', C: 'NIM, Triton, and TRT-LLM are independent and don\'t stack', D: 'Triton is built on NIM, which is built on TensorRT-LLM' },
    answer: 'B', explanation: 'NVIDIA inference stack: TRT-LLM (lowest): kernel fusion, quantization, optimized attention. Triton (middle): multi-model serving, dynamic batching, ensemble pipelines, backends including TRT-LLM. NIM (top): pre-configured Triton + TRT-LLM + model + health endpoints + enterprise support in a single container.' },

  { id: 7070, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Parallel Computing', difficulty: 'hard', keywords: ['tensor parallelism', 'model parallel', 'shard', 'multi-GPU'],
    question: 'Tensor parallelism for large LLM inference splits:',
    options: { A: 'Splits different requests across different GPUs', B: 'Splits individual weight matrices across multiple GPUs — each GPU holds a shard of each layer, requiring synchronized communication within each transformer layer', C: 'Splits model into layers distributed across GPUs (pipeline parallelism)', D: 'Tensor parallelism is only used during training, not inference' },
    answer: 'B', explanation: 'Tensor parallelism: attention weight matrix [hidden_dim × hidden_dim] → split column-wise across 8 GPUs → each GPU holds [hidden_dim × hidden_dim/8] → local matmul → AllReduce to aggregate → next layer. Used in NIM for models too large for one GPU. Requires high-bandwidth interconnects (NVLink).' },

  { id: 7071, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Quantization Methods', difficulty: 'hard', keywords: ['GPTQ', 'AWQ', 'SmoothQuant', 'INT4'],
    question: 'AWQ (Activation-Aware Weight Quantization) vs GPTQ differs in that:',
    options: { A: 'AWQ uses 4-bit weights while GPTQ uses 8-bit weights', B: 'AWQ identifies and protects "salient" weights (1% most important based on activation magnitudes) from aggressive quantization — higher accuracy than GPTQ at same bit-width', C: 'GPTQ uses activation statistics while AWQ does not', D: 'Both methods produce identical results for the same bit-width' },
    answer: 'B', explanation: 'AWQ: analyze activation magnitudes across calibration set → identify top-1% salient weights → scale channels to bring salient weights within quantization precision → quantize. Result: AWQ INT4 often matches GPTQ INT4 accuracy while being hardware-friendlier (no custom CUDA kernels for each layer needed).' },

  { id: 7072, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA Earth-2', difficulty: 'medium', keywords: ['Earth-2', 'climate', 'FourCastNet', 'simulation'],
    question: 'NVIDIA Earth-2 applies AI to:',
    options: { A: 'Simulating game environments named "Earth"', B: 'High-resolution climate and weather simulation using neural networks — replacing traditional physics-based models with AI surrogates for 1000x speedup', C: 'Earth-2 is a data center located on the second floor', D: 'Only applicable to satellite imagery analysis' },
    answer: 'B', explanation: 'Earth-2: FourCastNet and CorrDiff neural network models trained to emulate global weather simulation. 10-day global weather forecast: traditional NWP: hours of supercomputing. FourCastNet on A100 GPU: seconds. Used for climate risk analysis, disaster preparedness, and generating high-resolution local climate projections.' },

  { id: 7073, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Model Compilation', difficulty: 'hard', keywords: ['torch.compile', 'dynamo', 'TorchScript', 'optimization'],
    question: 'torch.compile (PyTorch 2.0) improves inference performance by:',
    options: { A: 'Compiling Python code to C for faster execution', B: 'JIT-compiling PyTorch graphs using TorchDynamo (graph capture) and Inductor/TensorRT (backend optimization) — fusing operations and reducing kernel launches', C: 'torch.compile is equivalent to converting to TorchScript', D: 'torch.compile only works with CUDA 11.0 and newer' },
    answer: 'B', explanation: 'torch.compile: @torch.compile decorator → TorchDynamo captures model graph by tracing → Inductor backend analyzes graph → fuses consecutive operations → generates optimized CUDA/C++ kernels. Typical speedup: 1.5-2.5x for transformer inference with minimal code changes.' },

  { id: 7074, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA AI Foundation Models', difficulty: 'easy', keywords: ['foundation model', 'NGC', 'pretrained', 'NVIDIA'],
    question: 'NVIDIA AI Foundation Models available via NGC/API catalog include:',
    options: { A: 'Only NVIDIA\'s proprietary models trained from scratch', B: 'Both NVIDIA-developed models (Nemotron, DINO, Segformer) and optimized third-party models (Llama, Mistral, Stable Diffusion) tuned for NVIDIA hardware', C: 'Foundation models are not available through NVIDIA', D: 'All foundation models in NGC are free without restrictions' },
    answer: 'B', explanation: 'NVIDIA AI Foundation catalog: NVIDIA-developed: Nemotron (LLM), EfficientViT (vision), CosmosSim (world generation). Optimized third-party: Llama 3.1, Mistral, Stable Diffusion XL, SDXL-turbo. All optimized for NVIDIA hardware via TensorRT-LLM. Available via NIM for API access or containers for self-hosting.' },

  { id: 7075, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'DCGM Monitoring', difficulty: 'medium', keywords: ['DCGM', 'GPU health', 'metrics', 'monitoring'],
    question: 'NVIDIA DCGM (Data Center GPU Manager) provides production monitoring of:',
    options: { A: 'Only GPU memory usage and temperature', B: 'Comprehensive GPU health: utilization, memory, temperature, power, PCIe bandwidth, NVLink throughput, ECC error counts, XID errors, and workload-level metrics', C: 'DCGM only runs on NVIDIA DGX systems', D: 'DCGM requires proprietary NVIDIA monitoring software' },
    answer: 'B', explanation: 'DCGM metrics exported to Prometheus: DCGM_FI_DEV_GPU_UTIL (utilization %), DCGM_FI_DEV_FB_USED (memory used), DCGM_FI_DEV_GPU_TEMP (temperature), DCGM_FI_DEV_POWER_USAGE (watts), DCGM_FI_DEV_NVLINK_BANDWIDTH_L0 (NVLink traffic). Grafana dashboards visualize fleet GPU health.' },
];
