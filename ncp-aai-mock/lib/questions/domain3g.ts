import { Question } from '../types';

export const domain3gQuestions: Question[] = [
  { id: 3111, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Benchmark Suites', difficulty: 'medium', keywords: ['BIG-bench', 'MMLU', 'benchmark', 'suite'],
    question: 'BIG-bench (Beyond the Imitation Game) differs from MMLU in that:',
    options: { A: 'BIG-bench only tests coding ability', B: 'BIG-bench includes tasks designed to be beyond current model capabilities — probing emergent abilities and creative reasoning rather than knowledge recall', C: 'BIG-bench and MMLU test identical capabilities', D: 'MMLU is harder than BIG-bench for all models' },
    answer: 'B', explanation: 'BIG-bench: 200+ diverse tasks contributed by researchers worldwide — includes tasks models cannot yet do well (causal reasoning, novel analogies, social reasoning). MMLU: 57 academic knowledge domains testing recall. BIG-bench probes frontier capabilities; MMLU measures breadth of academic knowledge.' },

  { id: 3112, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Tool Call Evaluation', difficulty: 'medium', keywords: ['tool use', 'function calling', 'evaluation', 'correctness'],
    question: 'Evaluating agent tool call correctness requires checking:',
    options: { A: 'Only whether the tool returned a non-error response', B: 'Tool selection (right tool chosen?), argument correctness (right parameters?), sequencing (tools called in right order?), and outcome (task completed successfully?)', C: 'Tool evaluation is identical to API integration testing', D: 'Only the final output matters, not intermediate tool calls' },
    answer: 'B', explanation: 'Tool call eval dimensions: (1) Tool selection: did agent call search() vs calculator() correctly? (2) Arguments: search(query="2024 revenue") vs search(query="revenue") — specificity matters. (3) Sequence: read_file before write_file. (4) Outcome: did executing the tool calls achieve the goal? Each dimension can fail independently.' },

  { id: 3113, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Constitutional AI Evaluation', difficulty: 'hard', keywords: ['Constitutional AI', 'principle', 'harmlessness', 'RLAIF'],
    question: 'Constitutional AI (CAI) evaluates model outputs against:',
    options: { A: 'A government-approved list of permissible AI outputs', B: 'A set of principles (the constitution) used to critique and revise outputs — models self-critique responses for harms before RLAIF training', C: 'Constitutional law requirements for AI transparency', D: 'CAI only evaluates legal and compliance requirements' },
    answer: 'B', explanation: 'CAI: (1) SL-CAI: model generates response → prompted to critique using constitutional principles ("Is this harmful? Illegal? Dishonest?") → revises → use revised responses for SFT. (2) RL-CAI: AI feedback (RLAIF) using constitution as judge instead of human labelers. Scales safety evaluation without human bottleneck.' },

  { id: 3114, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Evaluation Data Contamination', difficulty: 'hard', keywords: ['contamination', 'test set', 'memorization', 'leakage'],
    question: 'Detecting benchmark contamination (test data in training) can be done by:',
    options: { A: 'Contamination is impossible to detect after training', B: 'Comparing model performance on original benchmark vs paraphrased versions — contaminated models show large performance drops on paraphrases vs originals', C: 'Only using proprietary benchmarks not available on the internet', D: 'Contamination only matters for models trained on Common Crawl' },
    answer: 'B', explanation: 'Contamination detection: if model scores 85% on MMLU but only 60% on paraphrased MMLU (same knowledge, different wording) → likely memorized benchmark answers rather than learned the underlying knowledge. Canary strings in private test sets also detect memorization.' },

  { id: 3115, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Hyperparameter Tuning', difficulty: 'medium', keywords: ['hyperparameter', 'learning rate', 'Bayesian optimization', 'sweep'],
    question: 'Bayesian hyperparameter optimization (Optuna, W&B Sweeps) outperforms grid search for LLM fine-tuning because:',
    options: { A: 'Bayesian methods test more hyperparameter combinations', B: 'Bayesian optimization models the hyperparameter-performance relationship and focuses trials on promising regions — more efficient than exhaustive grid search', C: 'Grid search is always more accurate for final selection', D: 'Bayesian optimization requires fewer GPU resources in total' },
    answer: 'B', explanation: 'Bayesian optimization: trial 1-5 explore space → build surrogate model of performance landscape → trial 6+ focus on regions likely to improve → convergence in 20-50 trials vs grid search needing hundreds. For LLM fine-tuning with expensive GPU hours, Bayesian sweeps deliver better results at lower cost.' },

  { id: 3116, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Output Length Calibration', difficulty: 'medium', keywords: ['length', 'verbosity', 'calibration', 'instructions'],
    question: 'Addressing LLM verbosity (over-long responses) during fine-tuning:',
    options: { A: 'Set max_tokens to limit response length', B: 'Include length-appropriate examples in fine-tuning data and add length preference feedback in RLHF — teaching the model when conciseness is preferred vs thoroughness', C: 'Verbosity is only a prompt engineering concern, not a fine-tuning concern', D: 'Fine-tuning increases verbosity and cannot reduce it' },
    answer: 'B', explanation: 'Length calibration via fine-tuning: curate training examples matching desired length distribution (short answers for factual, longer for explanations) → SFT learns appropriate length per task type. RLHF: rate concise answers higher when verbosity adds no value → model learns length appropriateness not just content quality.' },

  { id: 3117, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Safety Benchmarks', difficulty: 'hard', keywords: ['TruthfulQA', 'AdvBench', 'HarmBench', 'safety eval'],
    question: 'TruthfulQA evaluates AI models on:',
    options: { A: 'General factual accuracy across knowledge domains', B: 'Whether models give truthful answers to questions where humans commonly believe falsehoods — testing if models parrot misconceptions or provide accurate corrections', C: 'TruthfulQA is a medical accuracy benchmark', D: 'TruthfulQA only tests political and social questions' },
    answer: 'B', explanation: 'TruthfulQA: 817 questions where humans often give wrong answers due to misconceptions, urban legends, or biases ("Does eating carrots improve your eyesight?" "Is lightning never striking the same place twice?"). Tests if models propagate human misconceptions or provide accurate nuanced answers. Models trained on human text often fail.' },

  { id: 3118, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Instruction Following Evaluation', difficulty: 'medium', keywords: ['IFEval', 'constraint', 'following', 'format'],
    question: 'IFEval (Instruction Following Evaluation) measures:',
    options: { A: 'How well models follow general conversational instructions', B: 'Precise adherence to verifiable formatting constraints: "respond in exactly 3 bullet points", "use the word \'indeed\' at least once", "write fewer than 100 words"', C: 'IFEval only tests code formatting instructions', D: 'IFEval uses human raters for all evaluation decisions' },
    answer: 'B', explanation: 'IFEval: programmatically verifiable constraints — count bullets, check word presence, measure response length, verify language. No human judgment needed — either the model followed the constraint or didn\'t. Reveals models that understand instructions vs models that approximate them. Strong complement to open-ended quality evaluation.' },

  { id: 3119, domain: 3, domainName: 'Evaluation & Tuning', topic: 'PEFT Comparison', difficulty: 'hard', keywords: ['LoRA', 'prefix tuning', 'adapter', 'PEFT comparison'],
    question: 'Prompt tuning (soft prompts) vs LoRA for efficient fine-tuning:',
    options: { A: 'Prompt tuning and LoRA modify the same parameters', B: 'Prompt tuning: prepends trainable continuous token embeddings (no weight changes). LoRA: adds low-rank weight updates to attention layers. LoRA generally outperforms prompt tuning, especially for smaller models', C: 'Prompt tuning always outperforms LoRA', D: 'Neither method modifies model parameters' },
    answer: 'B', explanation: 'Soft prompt tuning: 20-100 trainable virtual tokens prepended to input. Only these tokens trained. Very parameter-efficient but underperforms LoRA on complex tasks. LoRA: modifies weight matrices in transformer layers (though still small fraction of params). LoRA\'s advantage grows with task complexity.' },

  { id: 3120, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Evaluation Infrastructure', difficulty: 'medium', keywords: ['eval infrastructure', 'CI', 'pipeline', 'automation'],
    question: 'A complete AI evaluation infrastructure includes:',
    options: { A: 'Only a spreadsheet tracking manual test results', B: 'Automated eval pipeline triggered by model/prompt changes, versioned eval datasets, reproducible scoring, result storage for trend analysis, and alerting on regressions', C: 'Evaluation infrastructure is only needed at the model training stage', D: 'Third-party evaluation services replace internal infrastructure needs' },
    answer: 'B', explanation: 'Eval infrastructure: Git push → CI triggers eval suite → eval harness loads versioned test sets → runs against new model/prompt → scores stored in database → compared to baseline → dashboard shows trends → alert if metric drops > threshold. Without this: quality regressions undetected until users complain.' },
];
