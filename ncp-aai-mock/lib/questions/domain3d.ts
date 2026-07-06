import { Question } from '../types';

export const domain3dQuestions: Question[] = [
  { id: 3071, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Alignment Techniques', difficulty: 'hard', keywords: ['RLAIF', 'AI feedback', 'synthetic', 'constitutional'],
    question: 'RLAIF (Reinforcement Learning from AI Feedback) advantages over RLHF include:',
    options: { A: 'RLAIF always produces safer models', B: 'Scalability — AI feedback can be generated at volume without human annotator bottlenecks', C: 'AI feedback is more accurate than human feedback in all cases', D: 'RLAIF doesn\'t require any human input' },
    answer: 'B', explanation: 'RLAIF: LLM evaluates response quality and provides feedback → reward model trained on AI preferences. Scales to millions of examples without human bottleneck. Trade-off: inherits biases of the AI rater model.' },

  { id: 3072, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Quantization Methods', difficulty: 'hard', keywords: ['GPTQ', 'AWQ', 'post-training', 'quantization'],
    question: 'GPTQ (Generative Pre-Training Quantization) achieves near-lossless INT4 quantization by:',
    options: { A: 'Training the model from scratch in INT4 precision', B: 'Layer-wise quantization with second-order weight optimization — adjusting remaining weights to minimize reconstruction error per layer', C: 'Grouping weights by magnitude before quantization', D: 'Generative pruning of transformer weights to target precision' },
    answer: 'B', explanation: 'GPTQ: quantize one layer at a time using Hessian information to compensate — when weight W_i is quantized (loses precision), remaining weights in the layer are updated to minimize the output error from quantization.' },

  { id: 3073, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Evaluation Pitfalls', difficulty: 'medium', keywords: ['leakage', 'contamination', 'benchmark', 'test set'],
    question: 'Benchmark contamination in LLM evaluation occurs when:',
    options: { A: 'Multiple teams use the same benchmark', B: 'Test set examples or their paraphrases appear in the training data, inflating benchmark scores beyond true generalization ability', C: 'The benchmark tests too many different tasks', D: 'Human evaluators are contaminated by reading model outputs' },
    answer: 'B', explanation: 'Contamination: if MMLU test questions appeared in training data, the model memorizes answers rather than demonstrating true knowledge. Inflated scores mislead. Mitigation: hold-out eval sets, use private benchmarks, and contamination detection.' },

  { id: 3074, domain: 3, domainName: 'Evaluation & Tuning', topic: 'LoRA Rank Selection', difficulty: 'hard', keywords: ['LoRA rank', 'rank selection', 'parameter count', 'efficiency'],
    question: 'Selecting a higher LoRA rank (e.g., r=64 vs r=8) for fine-tuning:',
    options: { A: 'Always improves performance due to more parameters', B: 'Increases model capacity and training parameters but risks overfitting on small datasets and increases VRAM requirements', C: 'Has no effect on training since LoRA is parameter-efficient', D: 'Is only relevant for models over 70B parameters' },
    answer: 'B', explanation: 'LoRA rank: r=8 (low, few params, good for small datasets), r=64 (more capacity, may improve performance on large datasets but risks overfitting, uses more VRAM). Start with r=8-16, increase if underfitting.' },

  { id: 3075, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Sequence Length Effects', difficulty: 'medium', keywords: ['sequence length', 'long context', 'performance', 'degradation'],
    question: '"Lost in the Middle" phenomenon in long-context LLMs refers to:',
    options: { A: 'LLMs losing training progress midway through fine-tuning', B: 'Models attending better to content at the beginning and end of long contexts, with information in the middle being utilized less effectively', C: 'Context window limitations causing truncation in the middle', D: 'Model performance degrading when context grows beyond 4K tokens' },
    answer: 'B', explanation: '"Lost in the middle": models show U-shaped performance on retrieval from long contexts — best for content at positions near start and end, worst for content in the middle. Critical for RAG with many retrieved chunks.' },

  { id: 3076, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Speculative Decoding', difficulty: 'hard', keywords: ['speculative decoding', 'draft model', 'speedup', 'acceptance'],
    question: 'Speculative decoding improves inference throughput by:',
    options: { A: 'Speculatively pre-computing responses for common queries', B: 'Using a small draft model to generate candidate tokens quickly, then having the large model verify multiple tokens in parallel', C: 'Reducing the number of decoding steps through speculation', D: 'Speculating about user intent to reduce prompt length' },
    answer: 'B', explanation: 'Speculative decoding: draft model (e.g., 7B) generates k tokens → large model (e.g., 70B) verifies all k in one forward pass → accept correct tokens, reject from first error. 2-3x throughput improvement with identical output distribution.' },

  { id: 3077, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Data Augmentation', difficulty: 'medium', keywords: ['back-translation', 'paraphrase', 'augmentation', 'NLP'],
    question: 'Back-translation as a data augmentation technique for agent training:',
    options: { A: 'Translates backwards through history to find original content', B: 'Translates text to another language then back to original language, creating paraphrased training examples with preserved semantics', C: 'Reversing the training data order', D: 'Only applicable to multilingual agents' },
    answer: 'B', explanation: 'Back-translation: English → French → English produces semantically equivalent but differently-phrased training examples. Increases dataset diversity and robustness to paraphrasing at low cost, especially useful for instruction following.' },

  { id: 3078, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Reward Hacking', difficulty: 'hard', keywords: ['reward hacking', 'Goodhart\'s law', 'proxy metric', 'gaming'],
    question: 'Goodhart\'s Law applied to AI agent training warns:',
    options: { A: 'Good agent performance cannot be measured accurately', B: '"When a measure becomes a target, it ceases to be a good measure" — optimizing a proxy metric causes the agent to game the metric rather than achieve true goals', C: 'Good models are harder to train than average ones', D: 'Law requiring disclosure of AI decision metrics' },
    answer: 'B', explanation: 'Reward hacking/Goodhart\'s Law: RLHF reward model → agent finds outputs that score high on reward model but not genuinely helpful. Example: very long responses score high → agent outputs verbose but useless text. Metrics must be carefully designed.' },

  { id: 3079, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Perplexity', difficulty: 'medium', keywords: ['perplexity', 'language model', 'cross-entropy', 'evaluation'],
    question: 'Perplexity as an LLM evaluation metric measures:',
    options: { A: 'How confused users are by model responses', B: 'Exponentiated average negative log-likelihood — lower perplexity means the model assigns higher probability to held-out text (better language modeling)', C: 'The complexity of model architecture', D: 'The diversity of model outputs' },
    answer: 'B', explanation: 'Perplexity = exp(cross-entropy loss on test set). Lower = model better predicts test data = better language model. GPT-2: ~20 PPL on WikiText-103; GPT-3: ~5. Useful for comparing models on same domain; not comparable across different tokenizers/datasets.' },

  { id: 3080, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Multi-Task Evaluation', difficulty: 'medium', keywords: ['multi-task', 'generalization', 'evaluation', 'diverse tasks'],
    question: 'HELM (Holistic Evaluation of Language Models) improves on single-metric benchmarks by:',
    options: { A: 'Testing models on helmet safety scenarios', B: 'Evaluating across 42 scenarios with multiple metrics (accuracy, calibration, robustness, efficiency, fairness) for comprehensive comparison', C: 'Using only human evaluators across all metrics', D: 'Focusing exclusively on safety and ethical behavior' },
    answer: 'B', explanation: 'HELM: standardized evaluation across diverse tasks (QA, summarization, sentiment, toxicity) with multiple metrics per scenario. Reveals trade-offs: a model excellent at accuracy may be poor at calibration. Holistic view vs single-number ranking.' },

  { id: 3081, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Sample Efficiency', difficulty: 'hard', keywords: ['sample efficiency', 'few-shot', 'data efficiency', 'learning'],
    question: 'Sample efficiency in LLM fine-tuning refers to:',
    options: { A: 'How efficiently the model samples from its output distribution', B: 'Achieving desired performance with minimal training examples — some tasks need 100 examples, others 100K', C: 'The efficiency of data sampling algorithms during training', D: 'Sample size requirements for statistical significance in evaluation' },
    answer: 'B', explanation: 'Sample efficiency: how many labeled examples needed for target performance? LLMs are highly sample-efficient for format/style learning (10s of examples) but need more for factual domain knowledge or complex reasoning patterns.' },

  { id: 3082, domain: 3, domainName: 'Evaluation & Tuning', topic: 'LLM Calibration', difficulty: 'hard', keywords: ['calibration', 'expected calibration error', 'confidence', 'reliability'],
    question: 'A well-calibrated LLM is one where:',
    options: { A: 'The model always gives confident answers', B: 'Expressed confidence matches empirical accuracy — when the model says 80% confident, it\'s correct approximately 80% of the time', C: 'The model is calibrated on standard benchmarks before deployment', D: 'The model\'s parameters are calibrated for the target hardware' },
    answer: 'B', explanation: 'Calibration: reliability diagram shows predicted confidence vs actual accuracy. Perfectly calibrated → diagonal line. Most LLMs are overconfident — say 90% confident but only right 70% of the time. ECE (Expected Calibration Error) measures miscalibration.' },

  { id: 3083, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Soft Prompt Tuning', difficulty: 'hard', keywords: ['soft prompt', 'prompt tuning', 'learnable', 'prefix'],
    question: 'Prefix tuning (Li & Lam, 2021) differs from full fine-tuning by:',
    options: { A: 'Adding a fixed prefix to the input before fine-tuning', B: 'Training only prefix vectors prepended to each transformer layer\'s keys and values, keeping all model weights frozen', C: 'Fine-tuning only the first few layers of the model', D: 'Using a pre-fixed learning rate schedule' },
    answer: 'B', explanation: 'Prefix tuning: prepend trainable vectors to K,V at each attention layer. Only these ~0.1% of parameters train. Model sees "virtual tokens" that steer behavior without modifying any actual model weights. More expressive than prompt tuning.' },

  { id: 3084, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Error Analysis', difficulty: 'medium', keywords: ['error analysis', 'confusion matrix', 'failure modes', 'categories'],
    question: 'Systematic error analysis of AI agent failures should categorize errors by:',
    options: { A: 'Alphabetical order of error messages', B: 'Root cause categories (knowledge gaps, reasoning errors, instruction following, context handling) to prioritize where to improve', C: 'Error frequency only — fix most common errors first', D: 'Error analysis is only for classification tasks' },
    answer: 'B', explanation: 'Error categorization: knowledge errors (model doesn\'t know the fact) → fix with fine-tuning/RAG; reasoning errors → improve CoT prompting; instruction errors → improve prompt clarity; context errors → improve context management.' },

  { id: 3085, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Model Distillation', difficulty: 'hard', keywords: ['knowledge distillation', 'student', 'teacher', 'soft targets'],
    question: 'Knowledge distillation trains small student models by:',
    options: { A: 'Copying teacher model weights to the student', B: 'Training student on "soft targets" — teacher\'s probability distribution over all tokens — which carry more information than hard labels', C: 'Distilling only the most important knowledge from teacher training data', D: 'Knowledge distillation and fine-tuning are synonymous' },
    answer: 'B', explanation: 'Distillation: hard labels (correct answer) vs soft targets (teacher\'s full probability distribution). Soft targets encode "this answer is very close to correct" and "these other answers are related" — richer supervision than one-hot labels.' },

  { id: 3086, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Training Stability', difficulty: 'hard', keywords: ['gradient clipping', 'loss spikes', 'stability', 'training'],
    question: 'Gradient clipping during LLM fine-tuning prevents:',
    options: { A: 'Gradients from being too small (vanishing gradient problem)', B: 'Gradient explosion — when large gradient magnitudes cause unstable weight updates that corrupt training progress', C: 'Clipping outdated gradients from previous training runs', D: 'GPU memory overflow from large gradient tensors' },
    answer: 'B', explanation: 'Gradient clipping: if gradient norm > threshold, scale all gradients to have norm = threshold. Prevents "gradient explosion" (extreme weight updates from anomalous training examples) while allowing normal training to proceed.' },

  { id: 3087, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Evaluation Automation', difficulty: 'medium', keywords: ['automated evaluation', 'G-Eval', 'model judge', 'rubric'],
    question: 'G-Eval (Liu et al.) for NLG evaluation uses:',
    options: { A: 'GPU-accelerated evaluation for faster assessment', B: 'LLMs with chain-of-thought prompting and a detailed rubric to score generated text on dimensions like coherence, relevance, and fluency', C: 'Graph-based evaluation of semantic similarity', D: 'Government evaluation standards for NLG systems' },
    answer: 'B', explanation: 'G-Eval: prompts a strong LLM with the generated text, reference, and scoring criteria → LLM reasons through quality dimensions (coherence, consistency, fluency) step-by-step → produces numeric score. Correlates well with human judgment.' },

  { id: 3088, domain: 3, domainName: 'Evaluation & Tuning', topic: 'PEFT Comparison', difficulty: 'hard', keywords: ['PEFT', 'LoRA', 'DoRA', 'adapter', 'comparison'],
    question: 'DoRA (Weight-Decomposed Low-Rank Adaptation) improves on LoRA by:',
    options: { A: 'Doubling the rank for better performance', B: 'Decomposing weights into magnitude and direction components, updating both separately for better gradient flow and learning dynamics', C: 'Using dropout in LoRA layers for regularization', D: 'Direct optimization on RLHF reward rather than supervised loss' },
    answer: 'B', explanation: 'DoRA: W = m × (W₀ + ΔW) / ||W₀ + ΔW||. Separates magnitude (scalar m, learned) from direction (normalized, adapted via LoRA). Better matches full fine-tuning behavior and often outperforms LoRA at same rank.' },

  { id: 3089, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Multi-Metric Evaluation', difficulty: 'medium', keywords: ['composite score', 'weighting', 'trade-off', 'metrics'],
    question: 'Composite evaluation scores for AI agents (weighted combination of metrics) risk:',
    options: { A: 'Taking too long to compute', B: 'Masking important failures — a high composite score can hide unacceptable performance on individual critical metrics', C: 'Requiring too many human evaluators', D: 'Being incompatible with automated evaluation' },
    answer: 'B', explanation: 'Composite score risk: helpfulness=9, safety=2 → composite=5.5 (acceptable). But safety=2 is unacceptable! Always check individual metrics especially for critical safety/accuracy requirements; composites can hide deal-breakers.' },

  { id: 3090, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Efficient Fine-Tuning Infrastructure', difficulty: 'medium', keywords: ['gradient checkpointing', 'mixed precision', 'flash attention', 'memory'],
    question: 'Gradient checkpointing during fine-tuning reduces GPU memory by:',
    options: { A: 'Checkpointing gradients to disk instead of keeping in memory', B: 'Trading compute for memory — recomputing activations during backward pass rather than storing all forward-pass activations', C: 'Saving gradient checkpoints to resume interrupted training', D: 'Using gradient compression before checkpointing to disk' },
    answer: 'B', explanation: 'Gradient checkpointing: during forward pass, discard intermediate activations (save memory). During backward pass, recompute needed activations on-demand. Reduces activation memory by 60-80% at the cost of ~30% slower training.' },
];
