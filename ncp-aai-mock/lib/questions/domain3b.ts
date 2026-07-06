import { Question } from '../types';

export const domain3bQuestions: Question[] = [
  { id: 3031, domain: 3, domainName: 'Evaluation & Tuning', topic: 'G-Eval', difficulty: 'medium', keywords: ['G-Eval', 'NLG evaluation', 'LLM evaluation', 'form-filling'],
    question: 'G-Eval evaluates NLG quality by:',
    options: { A: 'A grade-based rubric scored by grammar rules', B: 'Prompting an LLM to fill in evaluation forms with scores for defined criteria (coherence, consistency, fluency)', C: 'GPU-accelerated evaluation of generation speed', D: 'Group evaluation by multiple human raters' },
    answer: 'B', explanation: 'G-Eval frames NLG evaluation as a chain-of-thought prompting task — the LLM evaluator receives evaluation instructions and fills in scores on defined criteria, producing high human correlation.' },

  { id: 3032, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Retrieval Metrics', difficulty: 'medium', keywords: ['MRR', 'NDCG', 'MAP', 'retrieval metrics'],
    question: 'NDCG (Normalized Discounted Cumulative Gain) measures retrieval quality by:',
    options: { A: 'Counting the number of relevant documents retrieved', B: 'Rewarding relevant documents appearing at the top of results, with decreasing credit for lower positions', C: 'Normalizing all retrieval scores to 0-1 range', D: 'Measuring the number of documents in the corpus' },
    answer: 'B', explanation: 'NDCG weights relevance by rank position — a relevant document at rank 1 contributes more than one at rank 10. It measures both relevance and ordering quality.' },

  { id: 3033, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Synthetic Data', difficulty: 'medium', keywords: ['synthetic data', 'data augmentation', 'generation', 'fine-tuning'],
    question: 'Synthetic data generation for fine-tuning using GPT-4/Claude is effective because:',
    options: { A: 'Synthetic data is always higher quality than human-curated data', B: 'Large teacher models can generate labeled training examples for smaller student models at low cost', C: 'Synthetic data eliminates the need for evaluation', D: 'Synthetic data has no legal complications unlike real user data' },
    answer: 'B', explanation: 'Teacher-generated synthetic data enables knowledge distillation — a GPT-4 teacher generates thousands of (input, ideal_output) pairs cheaply, training a smaller specialized model.' },

  { id: 3034, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Evaluation Pitfalls', difficulty: 'medium', keywords: ['data contamination', 'benchmark saturation', 'overfitting'],
    question: 'Benchmark contamination occurs when:',
    options: { A: 'Benchmark servers are infected with malware', B: 'Training data includes benchmark test questions, causing inflated scores that don\'t reflect real-world performance', C: 'Too many models compete on the same benchmark', D: 'Benchmarks are contaminated with low-quality questions' },
    answer: 'B', explanation: 'If benchmark test sets appear in training data, models "memorize" answers giving artificially high scores that don\'t generalize. Held-out test sets and rolling benchmarks mitigate this.' },

  { id: 3035, domain: 3, domainName: 'Evaluation & Tuning', topic: 'MT-Bench', difficulty: 'medium', keywords: ['MT-Bench', 'multi-turn', 'conversation', 'LLM judge'],
    question: 'MT-Bench evaluates LLMs on:',
    options: { A: 'Machine translation quality', B: 'Multi-turn conversational ability across diverse tasks using GPT-4 as the judge', C: 'Multi-task benchmark for 100+ tasks simultaneously', D: 'Model throughput in tokens per second' },
    answer: 'B', explanation: 'MT-Bench uses 80 multi-turn questions across 8 categories. GPT-4 judges responses on a 1-10 scale, evaluating instruction following, reasoning, and conversation quality across turns.' },

  { id: 3036, domain: 3, domainName: 'Evaluation & Tuning', topic: 'SFT vs RLHF', difficulty: 'hard', keywords: ['SFT', 'supervised fine-tuning', 'RLHF', 'comparison'],
    question: 'Supervised Fine-Tuning (SFT) is used before RLHF because:',
    options: { A: 'SFT is cheaper and RLHF is free', B: 'SFT teaches basic instruction following — RLHF then refines the already-compliant model\'s behavior via preference learning', C: 'SFT and RLHF are identical processes', D: 'Regulatory requirements mandate SFT first' },
    answer: 'B', explanation: 'SFT creates a supervised baseline that follows instructions. RLHF then applies preference optimization on top, refining style, helpfulness, and safety. Starting RLHF from a base model is much harder.' },

  { id: 3037, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Evaluation Frequency', difficulty: 'medium', keywords: ['evaluation frequency', 'continuous', 'scheduled', 'triggered'],
    question: 'Production agent evaluation should be triggered by:',
    options: { A: 'Only when users complain about quality', B: 'Every model/prompt/code change (CI-triggered) AND on a scheduled basis to detect organic drift', C: 'Once per year during annual reviews', D: 'Only before major new feature releases' },
    answer: 'B', explanation: 'CI-triggered evals catch regressions from explicit changes. Scheduled evals catch organic drift (data distribution changes, API behavior changes) that occurs without code changes.' },

  { id: 3038, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Human Preference Data', difficulty: 'medium', keywords: ['preference data', 'annotation guidelines', 'agreement', 'quality'],
    question: 'High-quality human preference data for RLHF requires:',
    options: { A: 'As many annotators as possible regardless of training', B: 'Clear rubrics defining what "better" means, calibrated annotators, and quality control (inter-rater agreement checks)', C: 'Annotators with no domain knowledge for unbiased views', D: 'Automated tools to replace human annotation entirely' },
    answer: 'B', explanation: 'Preference quality depends on annotation guidelines clarity, annotator calibration (training on rubrics), and quality monitoring (IAA). Uncalibrated annotation produces noisy reward model training data.' },

  { id: 3039, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Chunk Size Optimization', difficulty: 'medium', keywords: ['chunk size', 'RAG', 'retrieval quality', 'hyperparameter'],
    question: 'When optimizing chunk size for RAG, the evaluation metric to optimize is:',
    options: { A: 'Minimize chunk size to maximize retrieval speed', B: 'Retrieval recall and answer quality on a representative evaluation set — not a fixed rule', C: 'Always use 512 tokens as the standard chunk size', D: 'Maximize chunk size to provide more context per retrieval' },
    answer: 'B', explanation: 'Optimal chunk size depends on document structure, query nature, and model context limits. Systematically evaluate different sizes on representative queries and pick based on measured quality.' },

  { id: 3040, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Comparison Evaluation', difficulty: 'medium', keywords: ['side-by-side', 'pairwise', 'comparison', 'preference'],
    question: 'Pairwise comparison (A vs B) evaluation is preferred over absolute scoring because:',
    options: { A: 'Pairwise comparison is easier to automate', B: 'Humans more reliably judge "which is better" than assign absolute numerical scores, reducing annotation variance', C: 'Pairwise produces more training data per comparison', D: 'Absolute scoring is harder to implement technically' },
    answer: 'B', explanation: 'Humans struggle with consistent absolute scales ("is this a 6 or 7?") but reliably judge relative preference ("which response is better?"). Pairwise yields higher inter-annotator agreement.' },

  { id: 3041, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Domain Adaptation', difficulty: 'medium', keywords: ['domain adaptation', 'continued pretraining', 'fine-tuning', 'domain'],
    question: 'Continued pretraining (as opposed to SFT) adapts LLMs to new domains by:',
    options: { A: 'Adding labeled task examples to teach specific behaviors', B: 'Continuing unsupervised pretraining on domain-specific text to improve domain knowledge distribution', C: 'Pretraining that was interrupted and then continued', D: 'Training on the previous model\'s outputs' },
    answer: 'B', explanation: 'Continued pretraining extends the next-token prediction objective on domain corpora (medical, legal, code) to inject domain vocabulary and knowledge before SFT refines task-specific behaviors.' },

  { id: 3042, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Automatic Metrics Limitations', difficulty: 'medium', keywords: ['Goodhart\'s law', 'gaming', 'proxy metric', 'limitation'],
    question: 'Goodhart\'s Law applied to LLM evaluation means:',
    options: { A: 'Good evaluation results in good models', B: 'When a metric becomes a target (optimized directly), it ceases to be a good measure — models learn to game metrics without improving', C: 'Goodhart\'s law only applies to economic metrics, not AI', D: 'More metrics always lead to better evaluation' },
    answer: 'B', explanation: 'Models optimized directly on BLEU, ROUGE, or LLM judge scores eventually find ways to score well without improving quality. Diverse metric portfolios and held-out evaluations mitigate Goodhart\'s Law.' },

  { id: 3043, domain: 3, domainName: 'Evaluation & Tuning', topic: 'LoRA Rank', difficulty: 'hard', keywords: ['LoRA rank', 'r', 'expressivity', 'tradeoff'],
    question: 'Increasing LoRA rank (r) in fine-tuning:',
    options: { A: 'Decreases model quality', B: 'Increases the number of trainable parameters and model expressivity, but also increases memory usage and overfitting risk', C: 'Has no effect on model behavior', D: 'Reduces training time' },
    answer: 'B', explanation: 'Rank r controls expressivity: higher r = more trainable parameters (2*r*d per layer), better capacity to learn complex behaviors, but more memory and risk of overfitting on small datasets.' },

  { id: 3044, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Catastrophic Forgetting Prevention', difficulty: 'hard', keywords: ['EWC', 'regularization', 'forgetting', 'preservation'],
    question: 'Elastic Weight Consolidation (EWC) prevents catastrophic forgetting by:',
    options: { A: 'Elastically expanding the model size during fine-tuning', B: 'Penalizing changes to parameters important for prior tasks, preserving general capabilities during fine-tuning', C: 'Consolidating weights into a smaller model after training', D: 'Using elastic search to find the best hyperparameters' },
    answer: 'B', explanation: 'EWC computes Fisher information matrix to identify parameters critical for prior tasks, adding a regularization term that resists changes to these important parameters during fine-tuning.' },

  { id: 3045, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Agent Benchmark Design', difficulty: 'hard', keywords: ['benchmark design', 'diversity', 'coverage', 'challenge'],
    question: 'A well-designed agent benchmark should include:',
    options: { A: 'Only tasks the agent can currently solve to build confidence', B: 'Diverse difficulty levels, domain coverage, edge cases, and adversarial inputs to stress-test all capabilities', C: 'Tasks only from the agent\'s training domain', D: 'Single-step tasks only since multi-step tasks are too variable' },
    answer: 'B', explanation: 'Good benchmarks have: easy tasks (verify basic functionality), medium tasks (core capabilities), hard tasks (push limits), edge cases (unusual inputs), and adversarial inputs (robustness testing).' },

  { id: 3046, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Fine-tuning Learning Rate', difficulty: 'medium', keywords: ['learning rate', 'fine-tuning', 'small LR', 'catastrophic forgetting'],
    question: 'Fine-tuning LLMs requires much smaller learning rates than training from scratch because:',
    options: { A: 'Smaller learning rates are always better for any training', B: 'Large learning rates destroy pre-trained weights carrying valuable knowledge — small LR preserves and gently updates them', C: 'API rate limits require slower learning', D: 'Hardware constraints require smaller values' },
    answer: 'B', explanation: 'Pre-trained weights represent millions of GPU-hours of learned knowledge. Large LR updates would corrupt this foundation. Typical fine-tuning LR: 1e-5 to 5e-5 vs 1e-4+ for pretraining.' },

  { id: 3047, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Evaluation Infrastructure', difficulty: 'medium', keywords: ['evaluation infrastructure', 'harness', 'lm-eval', 'automation'],
    question: 'The lm-evaluation-harness (EleutherAI) provides:',
    options: { A: 'Hardware harness for GPU testing', B: 'A standardized framework for evaluating LLMs across hundreds of benchmarks with consistent methodology', C: 'A harness for attaching LLMs to physical robots', D: 'Power management harness for GPU clusters' },
    answer: 'B', explanation: 'lm-evaluation-harness enables reproducible, standardized evaluation across 200+ benchmarks (HellaSwag, MMLU, etc.) with consistent prompting and scoring, enabling fair model comparison.' },

  { id: 3048, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Multi-metric Evaluation', difficulty: 'medium', keywords: ['multi-metric', 'tradeoff', 'pareto', 'composite score'],
    question: 'When multiple evaluation metrics conflict (accuracy improves but latency worsens), the resolution approach is:',
    options: { A: 'Always prioritize accuracy since it\'s most important', B: 'Define explicit performance requirements (SLOs) and treat constraints as hard limits, optimizing the primary metric within them', C: 'Average all metrics into a single score', D: 'Accept whichever metric has the highest absolute value' },
    answer: 'B', explanation: 'Multi-objective optimization requires clear priorities: "accuracy must be > 85% AND latency < 200ms" — treat hard constraints as floors, then maximize primary metric within those constraints.' },

  { id: 3049, domain: 3, domainName: 'Evaluation & Tuning', topic: 'RAG Evaluation End-to-End', difficulty: 'medium', keywords: ['end-to-end RAG', 'answer correctness', 'combined score'],
    question: 'RAGAS answer correctness combines:',
    options: { A: 'Only semantic similarity to ground truth', B: 'Both factual overlap (precision/recall of facts) and semantic similarity to the reference answer', C: 'Only exact string matching', D: 'BLEU score and ROUGE score averaged' },
    answer: 'B', explanation: 'Answer correctness = (factual overlap + semantic similarity) / 2 — factual overlap checks if all ground truth facts appear, semantic similarity measures overall meaning alignment.' },

  { id: 3050, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Evaluation Tooling', difficulty: 'easy', keywords: ['evaluation tools', 'DeepEval', 'TruLens', 'RAGAS'],
    question: 'Which tools are specifically designed for LLM application evaluation? (Choose two)',
    options: { A: 'DeepEval — an LLM testing framework with metrics like hallucination, bias, and toxicity detection', B: 'PyTorch — the deep learning framework for training', C: 'TruLens — an evaluation and feedback framework for LLM apps including RAG pipelines', D: 'Docker — container platform for deployment' },
    answer: 'AC', explanation: 'DeepEval provides 14+ LLM metrics (hallucination, bias, toxicity, G-Eval, RAGAS) in a pytest-style framework. TruLens instruments LLM apps for evaluation and feedback collection.' },
];
