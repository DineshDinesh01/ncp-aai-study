import { Question } from '../types';

export const domain7scQuestions: Question[] = [
  { id: 7201, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Scenario: NIM Performance Tuning', difficulty: 'hard', keywords: ['scenario', 'NIM', 'latency', 'throughput'],
    question: 'You deployed a Llama 3.1 8B NIM and benchmarked it: GPU utilization is 40%, throughput is 200 tokens/sec, and p95 latency is 800ms. Your target is 600 tokens/sec with p95 < 300ms. What NIM configurations should you tune first?',
    options: {
      A: 'Upgrade to a larger H100 GPU for better performance',
      B: 'Enable continuous batching (already default in TRT-LLM backend), tune max_batch_size and max_num_tokens, reduce KV cache fraction to allow more concurrent sequences, and verify tensor parallelism settings match GPU count',
      C: 'Reduce the model to 4B parameters via distillation',
      D: 'Switch to a different inference framework like vLLM'
    },
    answer: 'B',
    explanation: '40% GPU utilization means the GPU is underutilized — a batching and concurrency problem, not hardware limitation. Tuning: increase max_batch_size to process more concurrent requests, tune max_num_tokens (max total tokens in a batch), verify KV cache allocation. These changes alone typically get GPU utilization to 80-90% and 3-5x throughput improvement without hardware upgrades.' },

  { id: 7202, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Scenario: NeMo Fine-Tuning', difficulty: 'hard', keywords: ['scenario', 'NeMo', 'SFT', 'customization'],
    question: 'You want to fine-tune Llama 3.1 8B on 5,000 domain-specific examples using NeMo. The full model is 16GB and you have one A100 40GB GPU. Which NeMo technique allows training on this single GPU?',
    options: {
      A: 'You need at least 2 GPUs to fine-tune a 16GB model — purchase more hardware',
      B: 'Use NeMo\'s PEFT/LoRA support: LoRA adds small trainable adapter weights (< 1% of model parameters) rather than modifying all 8B parameters. Memory footprint for LoRA training is ~20GB (model) + ~4GB (adapters + optimizer) = fits on A100 40GB',
      C: 'Use gradient checkpointing only — this eliminates the need for LoRA',
      D: 'Quantize the model to INT4 before fine-tuning to fit in memory'
    },
    answer: 'B',
    explanation: 'LoRA on single GPU: full fine-tuning of 8B model in FP32 needs ~96GB for model + gradients + optimizer states. LoRA: freeze base model (stored in FP16/BF16 = ~16GB), train only low-rank adapter matrices (~100M params). Total training memory: ~20GB model + ~4GB adapters/optimizer = ~24GB — comfortably fits A100 40GB with room for batch data.' },

  { id: 7203, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Scenario: TensorRT Optimization', difficulty: 'hard', keywords: ['scenario', 'TensorRT', 'latency', 'optimization'],
    question: 'Your image classification model runs at 50ms latency in PyTorch on an A100 GPU. A colleague suggests converting to TensorRT. What is a realistic expected outcome after TensorRT conversion with INT8 calibration?',
    options: {
      A: 'No meaningful speedup — TensorRT only helps for batch processing',
      B: '3-8x latency reduction (to 6-17ms): TensorRT performs kernel fusion, eliminates redundant operations, uses INT8 tensor cores (2x faster than FP32), and optimizes memory layout for the specific GPU — typical results on vision models',
      C: 'Exact 10x speedup — TensorRT always delivers exactly 10x improvement',
      D: '1.1x improvement — the GPU is already optimally utilizing its hardware'
    },
    answer: 'B',
    explanation: 'TensorRT optimizations for vision models: (1) Layer fusion: conv+bn+relu → single kernel. (2) INT8 quantization: 2-4x faster on Tensor Cores vs FP32. (3) Optimal memory layout (NHWC vs NCHW). (4) Platform-specific kernel selection. Combined: 3-8x is typical for CNNs. Transformers (LLMs) see 1.5-3x. Results vary by model architecture and batch size.' },

  { id: 7204, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Scenario: DCGM Alert', difficulty: 'medium', keywords: ['scenario', 'DCGM', 'GPU', 'health', 'XID'],
    question: 'Your DCGM monitoring shows XID error code 79 appearing on one GPU in your NIM cluster, and that GPU\'s requests are failing intermittently. What does this indicate and what is the immediate action?',
    options: {
      A: 'XID 79 is a software error — restart the NIM container on that GPU',
      B: 'XID 79 (GPU has fallen off the bus) indicates a hardware failure — drain traffic from that GPU immediately, investigate whether it is a PCIe slot/cable issue or GPU hardware failure, and replace the GPU or server if hardware is defective',
      C: 'XID errors are informational warnings — no action needed',
      D: 'Reboot the entire server to clear all GPU errors'
    },
    answer: 'B',
    explanation: 'XID 79 = GPU has fallen off the bus — a serious hardware error indicating PCIe communication failure or GPU hardware defect. Immediate response: (1) Drain traffic from that node. (2) Check physical connections. (3) Run nvidia-smi and check for persistent errors. (4) nvidia-bug-report.sh for diagnosis. (5) Replace GPU if hardware fault confirmed. Restarting containers without addressing the hardware issue will not fix this.' },

  { id: 7205, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Scenario: AgentIQ Integration', difficulty: 'medium', keywords: ['scenario', 'AgentIQ', 'profiling', 'bottleneck'],
    question: 'You are building a multi-agent pipeline: orchestrator → research agent → writer agent → reviewer agent. End-to-end latency is 45 seconds but you don\'t know which agent is the bottleneck. How does NVIDIA AgentIQ help?',
    options: {
      A: 'AgentIQ only monitors GPU-level metrics, not agent-level performance',
      B: 'AgentIQ provides workflow-level tracing showing time spent in each agent, each LLM call, and each tool call — you can see "research agent spent 32 of 45 seconds on 6 web searches" and optimize specifically that bottleneck',
      C: 'You need to add manual timing code to each agent to measure performance',
      D: 'AgentIQ only works with NVIDIA NIM agents, not custom agents'
    },
    answer: 'B',
    explanation: 'AgentIQ workflow tracing: the 45s total shows as a trace tree — orchestrator (1s) → research_agent (32s: 3 LLM calls + 6 web searches at 5s each) → writer_agent (8s) → reviewer_agent (4s). Immediately identifies: web searches are the bottleneck. Next action: parallelize the 6 searches, cache common queries, or reduce search count. Without tracing, you\'d guess and optimize the wrong component.' },
];
