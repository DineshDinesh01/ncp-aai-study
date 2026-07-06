import { Question } from '../types';

export const domain3fQuestions: Question[] = [
  { id: 3101, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Calibration', difficulty: 'hard', keywords: ['calibration', 'confidence', 'reliability diagram', 'ECE'],
    question: 'A well-calibrated AI model means:',
    options: { A: 'The model has been tuned to run on calibrated hardware', B: 'When the model says it is 70% confident, it is correct approximately 70% of the time — probability estimates match actual accuracy', C: 'The model answers 70% of questions correctly', D: 'Calibration refers to prompt template optimization' },
    answer: 'B', explanation: 'Calibration: reliability diagram plots stated confidence vs actual accuracy. Perfect calibration = diagonal line. Overconfident model: says 90% confident, correct only 70%. Underconfident: says 60% confident, correct 85%. ECE (Expected Calibration Error) quantifies deviation from perfect calibration.' },

  { id: 3102, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Win Rate', difficulty: 'medium', keywords: ['win rate', 'pairwise', 'preference', 'comparison'],
    question: 'Win rate in pairwise model evaluation means:',
    options: { A: 'The percentage of benchmark tests the model achieves highest score', B: 'The proportion of head-to-head comparisons where human evaluators (or LLM judges) prefer model A over model B', C: 'Win rate measures inference speed', D: 'Win rate is the same as accuracy on benchmark tests' },
    answer: 'B', explanation: 'Win rate: present evaluators with (prompt, response_A, response_B) pairs → judge picks preferred response → win_rate_A = A_wins / total_comparisons. Win rate is relative and can reverse with different benchmarks or judge populations. Use randomized presentation order to control position bias.' },

  { id: 3103, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Evaluation Costs', difficulty: 'medium', keywords: ['evaluation cost', 'human eval', 'automatic', 'tradeoff'],
    question: 'The evaluation pyramid (cheapest to most expensive) for AI agents is:',
    options: { A: 'Human eval → LLM eval → automated metrics', B: 'Automated metrics (fast, cheap) → LLM-as-judge (moderate) → human expert evaluation (expensive, gold standard)', C: 'All evaluation methods cost the same', D: 'LLM-as-judge is always more accurate than human evaluation' },
    answer: 'B', explanation: 'Evaluation pyramid: run cheap automated metrics (BLEU, exact match, latency) on every eval run → LLM-as-judge for semantic quality on sample → human expert review for highest-stakes decisions. Reserve expensive human evals for final validation and calibrating LLM judges.' },

  { id: 3104, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Supervised Fine-Tuning', difficulty: 'hard', keywords: ['SFT', 'instruction tuning', 'FLAN', 'format'],
    question: 'Supervised Fine-Tuning (SFT) for instruction following trains on:',
    options: { A: 'Unlabeled web text with next-token prediction', B: '(instruction, output) pairs where the model learns to follow human-written instructions — shifting from raw completion to instruction execution', C: 'SFT uses human preference rankings, not example outputs', D: 'SFT is identical to pretraining' },
    answer: 'B', explanation: 'SFT: base model (next-token prediction) → fine-tuned on {instruction: "Summarize this article", output: "The article discusses..."} pairs → model learns instruction-following format. Critical step before RLHF. Quality of instruction-output pairs more important than quantity.' },

  { id: 3105, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Catastrophic Interference', difficulty: 'hard', keywords: ['catastrophic forgetting', 'interference', 'continual learning', 'plasticity'],
    question: 'Catastrophic interference in continual learning of AI agents refers to:',
    options: { A: 'Interference from electromagnetic fields disrupting GPU computation', B: 'New learning overwriting previous knowledge — fine-tuning on task B degrades performance on task A because the same parameters encode both', C: 'Interference between multiple simultaneously training agents', D: 'Catastrophic interference only occurs in recurrent networks' },
    answer: 'B', explanation: 'Catastrophic interference: neural network parameters shared across tasks → learning new task B updates parameters in ways that degrade task A performance. Mitigations: EWC (penalize changes to important weights), progressive neural networks (new columns per task), replay buffers (mix old and new data).' },

  { id: 3106, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Optimal Transport', difficulty: 'hard', keywords: ['optimal transport', 'Wasserstein', 'distribution', 'drift'],
    question: 'Wasserstein distance is preferred over KL divergence for measuring distribution drift because:',
    options: { A: 'Wasserstein is faster to compute', B: 'Wasserstein provides a meaningful distance even when distributions have non-overlapping support — KL divergence is undefined when one distribution assigns zero probability to events the other assigns non-zero', C: 'KL divergence requires more memory', D: 'Wasserstein distance is more commonly supported in Python libraries' },
    answer: 'B', explanation: 'Wasserstein (earth mover\'s distance): measures minimum cost to transform one distribution into another — geometrically meaningful even for non-overlapping distributions. KL divergence: undefined when P(x) > 0 but Q(x) = 0. For AI distribution monitoring, Wasserstein gives more robust drift signals.' },

  { id: 3107, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Human Preference Modeling', difficulty: 'hard', keywords: ['reward model', 'Bradley-Terry', 'preference', 'ranking'],
    question: 'Bradley-Terry models in RLHF reward modeling:',
    options: { A: 'Named after two NVIDIA researchers', B: 'Model pairwise preference probabilities from comparison data — P(response A preferred over B) — enabling scalar reward scores from relative human judgments', C: 'Only applicable to sports ranking systems', D: 'Bradley-Terry requires absolute quality scores, not pairwise preferences' },
    answer: 'B', explanation: 'Bradley-Terry: from pairwise comparisons (A > B, B > C, A > C) → infer latent quality scores for each response. RLHF: human judges compare response pairs → Bradley-Terry fits reward model to preference data → reward model predicts scalar quality score for any response.' },

  { id: 3108, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Evaluation Frequency', difficulty: 'medium', keywords: ['eval schedule', 'CI', 'continuous eval', 'regression'],
    question: 'Continuous evaluation (eval on every commit) in AI development catches:',
    options: { A: 'All possible issues before production deployment', B: 'Regressions immediately — the specific commit that caused quality degradation is identifiable, enabling rapid rollback before the issue compounds', C: 'Continuous eval is too expensive for production teams', D: 'Continuous eval is only useful for model training, not prompt changes' },
    answer: 'B', explanation: 'Continuous eval: every PR triggers eval suite → if quality drops > threshold → PR blocked. Without continuous eval: quality degradation accumulates across many commits → hard to identify which change caused it. Continuous eval pays for itself by preventing expensive debugging and user-facing regressions.' },

  { id: 3109, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Generalization vs Memorization', difficulty: 'hard', keywords: ['memorization', 'generalization', 'overfitting', 'train-test gap'],
    question: 'Distinguishing memorization from generalization in fine-tuned LLMs requires:',
    options: { A: 'Running the model on its training data to verify accuracy', B: 'Evaluating on held-out data that is genuinely out-of-distribution — paraphrased versions, different styles, and novel topic combinations not in training data', C: 'High test accuracy always indicates good generalization', D: 'Memorization is beneficial for fact-based question answering' },
    answer: 'B', explanation: 'Memorization detection: fine-tuned model aces training-set questions → could be memorization, not learning. Test: generate paraphrased versions of training questions → if performance drops sharply, model memorized surface form vs learning underlying concepts. True generalization shows minimal degradation.' },

  { id: 3110, domain: 3, domainName: 'Evaluation & Tuning', topic: 'LLM Judges', difficulty: 'medium', keywords: ['LLM judge', 'MT-Bench', 'Alpaca Eval', 'auto eval'],
    question: 'MT-Bench and similar LLM-as-judge frameworks evaluate:',
    options: { A: 'Multi-tenant benchmark performance across datacenters', B: 'Multi-turn conversation quality using GPT-4 or similar models as judges on a standardized set of challenging multi-turn questions', C: 'Mountain bike trail performance simulations', D: 'MT-Bench only evaluates coding ability' },
    answer: 'B', explanation: 'MT-Bench: 80 multi-turn questions across 8 categories (math, coding, reasoning, STEM, writing, roleplay, extraction, humanities). LLM judge scores 1-10. Validated against human preferences. Used to compare instruction-following ability across models. AlpacaEval: similar for single-turn.' },
];
