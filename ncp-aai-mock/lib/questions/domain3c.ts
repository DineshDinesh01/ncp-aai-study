import { Question } from '../types';

export const domain3cQuestions: Question[] = [
  { id: 3051, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Retrieval Metrics', difficulty: 'medium', keywords: ['MRR', 'MAP', 'NDCG', 'retrieval evaluation'],
    question: 'Mean Reciprocal Rank (MRR) measures:',
    options: { A: 'The average rank of all relevant documents retrieved', B: 'The reciprocal of the rank of the first relevant document, averaged across queries — measuring how soon the first relevant result appears', C: 'The proportion of relevant documents retrieved', D: 'Mean response time for retrieval operations' },
    answer: 'B', explanation: 'MRR = average of 1/rank_of_first_relevant_result across queries. If the first relevant result is at rank 1, score=1.0; rank 2=0.5; rank 5=0.2. Measures "how quickly does a user find a relevant result?"' },

  { id: 3052, domain: 3, domainName: 'Evaluation & Tuning', topic: 'BLEU and ROUGE', difficulty: 'medium', keywords: ['BLEU', 'ROUGE', 'n-gram', 'text generation'],
    question: 'ROUGE-L metric evaluates generated text by:',
    options: { A: 'Counting shared unigrams between reference and generated text', B: 'Finding the longest common subsequence between generated and reference text, capturing sentence-level structure similarity', C: 'Measuring precision of bigrams in the generated text', D: 'Computing sentence embedding cosine similarity' },
    answer: 'B', explanation: 'ROUGE-L: LCS (Longest Common Subsequence) — measures longest sequence of words appearing in both generated and reference text in the same order (not necessarily contiguous). Captures fluency and recall.' },

  { id: 3053, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Human Evaluation Design', difficulty: 'hard', keywords: ['human evaluation', 'annotation', 'inter-rater', 'guidelines'],
    question: 'Inter-rater reliability in human evaluation of AI agents is measured by:',
    options: { A: 'Counting how many raters agree on each sample', B: 'Kappa statistics (Cohen\'s κ) measuring agreement above chance level, with κ > 0.6 considered acceptable for annotation tasks', C: 'The percentage of samples where all raters give identical scores', D: 'Correlation coefficient between rater scores' },
    answer: 'B', explanation: 'Cohen\'s κ: corrects for chance agreement. κ = (observed agreement - chance agreement) / (1 - chance agreement). κ < 0.4 = poor, 0.4-0.6 = moderate, 0.6-0.8 = substantial, > 0.8 = near-perfect. Low κ = evaluation not reliable.' },

  { id: 3054, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scaling Laws', difficulty: 'hard', keywords: ['scaling laws', 'Chinchilla', 'compute optimal', 'tokens'],
    question: 'Chinchilla scaling laws (Hoffmann et al.) revised understanding of optimal LLM training by showing:',
    options: { A: 'Larger models are always better regardless of training tokens', B: 'Models were undertrained — for a given compute budget, smaller models trained on more tokens outperform larger models trained on fewer tokens', C: 'Training beyond 1 trillion tokens shows no improvement', D: 'Model size and training tokens should be equal in gigabytes' },
    answer: 'B', explanation: 'Chinchilla: GPT-3 (175B params) was overtrained on compute but undertrained on data. Optimal ratio: ~20 training tokens per parameter. Smaller model + more data = better results for same compute budget.' },

  { id: 3055, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Catastrophic Forgetting', difficulty: 'hard', keywords: ['catastrophic forgetting', 'continual learning', 'EWC', 'replay'],
    question: 'Elastic Weight Consolidation (EWC) addresses catastrophic forgetting by:',
    options: { A: 'Elastic scaling of the model during training', B: 'Adding regularization that slows learning of weights important for previous tasks, preventing them from being overwritten by new task training', C: 'Consolidating multiple models into one elastic architecture', D: 'Using elastic network weights that stretch to accommodate new data' },
    answer: 'B', explanation: 'EWC: after task A, compute Fisher information matrix (which weights matter most for task A) → add penalty term to loss when training task B: λΣ Fisher_i × (θ_i - θ_A_i)². Important weights resist change; unimportant ones adapt freely.' },

  { id: 3056, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Prompt Optimization', difficulty: 'medium', keywords: ['APE', 'DSPy', 'prompt optimization', 'automatic'],
    question: 'Automatic Prompt Engineering (APE) and DSPy optimize prompts by:',
    options: { A: 'Having engineers automatically apply prompt patterns without manual review', B: 'Systematically searching the prompt space using the LLM itself or gradient-based methods to find high-performing prompt templates', C: 'Using compression to automatically shorten prompts', D: 'APE and DSPy are the same tool with different names' },
    answer: 'B', explanation: 'APE: LLM generates candidate instruction variants → evaluate on held-out examples → select best-performing. DSPy: declares program structure as signatures → bootstraps examples → optimizes prompts to maximize metric. Both automate prompt search.' },

  { id: 3057, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Preference Data Collection', difficulty: 'medium', keywords: ['preference data', 'comparison', 'pairwise', 'annotation'],
    question: 'Pairwise comparison is preferred over absolute rating for preference data collection because:',
    options: { A: 'It requires fewer examples to get statistical significance', B: 'Humans find it easier and more reliable to say "A is better than B" than to assign absolute scores on a numeric scale', C: 'Pairwise comparison is required by RLHF algorithms', D: 'Absolute ratings have proven completely unreliable' },
    answer: 'B', explanation: 'Pairwise comparison: "which response is better, A or B?" — humans do this reliably. Absolute rating: "rate this 4.3/5" — high inter-rater variance. Bradley-Terry model converts pairwise comparisons into quality scores.' },

  { id: 3058, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Task-Specific Metrics', difficulty: 'medium', keywords: ['task metrics', 'code generation', 'pass@k', 'functional'],
    question: 'pass@k metric for code generation agents measures:',
    options: { A: 'The percentage of code lines that pass syntax checking', B: 'The probability that at least 1 of k generated solutions passes all test cases', C: 'Number of code generation attempts before the first passing solution', D: 'The percentage of keywords from the problem present in the solution' },
    answer: 'B', explanation: 'pass@k: generate k code solutions per problem → run all test cases on each → pass@k = P(at least 1 of k solutions passes all tests). pass@1 = single-shot accuracy, pass@10 = probability best-of-10 passes.' },

  { id: 3059, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Model Merging', difficulty: 'hard', keywords: ['model merging', 'SLERP', 'TIES', 'DARE'],
    question: 'Model merging (SLERP, TIES-Merging) combines multiple fine-tuned models to:',
    options: { A: 'Average model weights to reduce file size', B: 'Combine specialized capabilities from multiple fine-tuned versions without additional training — each model contributes its expertise', C: 'Merge training datasets from multiple sources', D: 'Combine attention heads from different model layers' },
    answer: 'B', explanation: 'Model merging: model A (reasoning-tuned) + model B (instruction-tuned) → merged model with both capabilities. SLERP interpolates in weight space; TIES-Merging trims, elects, and merges; DARE prunes redundant delta weights. No training required.' },

  { id: 3060, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Evaluation Benchmarks', difficulty: 'medium', keywords: ['MMLU', 'HumanEval', 'HellaSwag', 'benchmark'],
    question: 'MMLU (Massive Multitask Language Understanding) benchmark evaluates:',
    options: { A: 'Multilingual translation across massive language pairs', B: 'Knowledge and reasoning across 57 subjects including STEM, humanities, and professional domains via multiple-choice questions', C: 'Multi-model language unit testing', D: 'Memory utilization of large language models' },
    answer: 'B', explanation: 'MMLU: 14K+ multiple-choice questions from 57 subjects (history, law, medicine, physics, ethics, CS, etc.). Tests: zero-shot knowledge, reasoning, and breadth of expertise. Standard benchmark for "how much does this model know?"' },

  { id: 3061, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Synthetic Data Generation', difficulty: 'medium', keywords: ['synthetic data', 'self-instruct', 'data generation', 'augmentation'],
    question: 'Self-Instruct (Wang et al.) generates fine-tuning data by:',
    options: { A: 'Instructing developers on how to generate their own training data', B: 'Using the LLM itself to generate new (instruction, response) pairs bootstrapped from a small seed set of manually written examples', C: 'Self-supervised training on unannotated internet text', D: 'Using regex to extract instruction-response pairs from existing text' },
    answer: 'B', explanation: 'Self-Instruct: seed 175 manual tasks → LLM generates new task instructions → LLM generates responses for new tasks → filter quality → add to dataset → repeat. Scaled to 52K examples with minimal human effort.' },

  { id: 3062, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Activation Analysis', difficulty: 'hard', keywords: ['activation', 'probing', 'representation', 'interpretability'],
    question: 'Probing classifiers in LLM interpretability research are used to:',
    options: { A: 'Probe user intentions in LLM conversations', B: 'Train simple linear classifiers on internal activations to determine what information is encoded at each layer of the transformer', C: 'Probe the model\'s training data for copyright violations', D: 'Testing model resilience with probing attacks' },
    answer: 'B', explanation: 'Probing: take activations from layer L → train logistic regression to predict property (e.g., part-of-speech of a token). If probing accuracy is high → that information is represented at layer L. Maps what each layer learns.' },

  { id: 3063, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Safety Evaluation', difficulty: 'hard', keywords: ['safety evaluation', 'red team', 'ASR', 'harmful'],
    question: 'Attack Success Rate (ASR) in AI safety evaluation measures:',
    options: { A: 'The rate at which security attacks on AI infrastructure succeed', B: 'The percentage of adversarial jailbreak attempts that successfully elicit harmful outputs from the model', C: 'How often the model attacks user queries unnecessarily', D: 'Success rate of phishing attacks using AI-generated content' },
    answer: 'B', explanation: 'ASR: for a test set of N jailbreak prompts, what fraction successfully bypasses safety constraints and generates harmful content? ASR tracks safety improvements: lower ASR = more robust model against adversarial attacks.' },

  { id: 3064, domain: 3, domainName: 'Evaluation & Tuning', topic: 'KV Cache Quantization', difficulty: 'hard', keywords: ['KV cache', 'quantization', 'memory', 'throughput'],
    question: 'KV cache quantization (INT8/INT4) in LLM serving reduces:',
    options: { A: 'Model accuracy by reducing key/value precision', B: 'GPU memory required for attention KV cache by 2-4x, enabling longer context or larger batch sizes on the same hardware', C: 'CPU memory for model weights', D: 'Training memory requirements' },
    answer: 'B', explanation: 'KV cache grows linearly with sequence length × layers × heads × 2 (K+V). INT8 KV cache: halves memory vs FP16; INT4: 4x reduction. Enables: longer sequences before OOM, or larger batches for higher throughput.' },

  { id: 3065, domain: 3, domainName: 'Evaluation & Tuning', topic: 'RLHF Variants', difficulty: 'hard', keywords: ['PPO', 'REINFORCE', 'online RLHF', 'DPO'],
    question: 'DPO (Direct Preference Optimization) simplifies RLHF by:',
    options: { A: 'Using deterministic preference labels instead of probabilistic ones', B: 'Directly training on preference pairs without needing a separate reward model or PPO optimization loop', C: 'Direct policy optimization using a smaller model to proxy human preferences', D: 'Optimizing directly on downstream performance metrics' },
    answer: 'B', explanation: 'DPO: standard RLHF needs [reward model training → PPO RL loop]. DPO eliminates reward model — directly optimizes policy from (chosen, rejected) pairs using a derived closed-form objective. Simpler, more stable, comparable quality.' },

  { id: 3066, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Continuous Evaluation', difficulty: 'medium', keywords: ['continuous eval', 'drift detection', 'monitoring', 'production'],
    question: 'Input distribution shift in production AI agents is detected by:',
    options: { A: 'Running the model evaluation suite on a schedule', B: 'Monitoring statistical properties of input queries (embedding distributions, query lengths, topic distributions) and alerting on significant drift', C: 'Asking users if the input has changed', D: 'Checking model accuracy on a fixed test set' },
    answer: 'B', explanation: 'Input drift detection: track distribution of query embeddings (or features) over time. If current week\'s distribution diverges significantly from training distribution → alert. Indicates queries the model wasn\'t trained for.' },

  { id: 3067, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Fine-Tuning Data Quality', difficulty: 'medium', keywords: ['data quality', 'filtering', 'deduplication', 'curation'],
    question: 'Data quality factors most critical for fine-tuning effectiveness are:',
    options: { A: 'Total dataset size — more data always wins', B: 'Accuracy of labels/responses, diversity of examples, absence of harmful/low-quality content, and relevance to target task', C: 'Equal representation of all possible inputs', D: 'Using only data from verified academic sources' },
    answer: 'B', explanation: '"Garbage in, garbage out." Fine-tuning quality: label accuracy (wrong labels teach wrong behavior), diversity (edge cases, varied phrasing), cleanliness (no harmful/off-topic examples), and relevance (same distribution as production).' },

  { id: 3068, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Tool Call Evaluation', difficulty: 'medium', keywords: ['tool call accuracy', 'function calling', 'argument accuracy', 'evaluation'],
    question: 'Evaluating tool-calling accuracy in agents should measure:',
    options: { A: 'Only whether the correct tool was selected', B: 'Tool selection accuracy AND argument accuracy — correct tool with wrong arguments still fails the task', C: 'Only whether the task ultimately succeeded', D: 'Number of tool calls made per query' },
    answer: 'B', explanation: 'Tool call evaluation: correct_tool + correct_args = success. Breakdown: (1) tool selection accuracy, (2) argument type accuracy, (3) argument value accuracy. Granular metrics identify whether the agent knows what to call or what to pass.' },

  { id: 3069, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Bias Detection', difficulty: 'hard', keywords: ['bias detection', 'counterfactual', 'stereotype', 'evaluation'],
    question: 'Counterfactual data augmentation (CDA) for bias evaluation works by:',
    options: { A: 'Generating counterfactual scenarios to train the model on', B: 'Testing whether model outputs change when demographic attributes are swapped (e.g., male ↔ female names), revealing spurious correlations', C: 'Using data augmentation to balance demographic classes in training', D: 'Evaluating model performance on counterfactual reasoning tasks' },
    answer: 'B', explanation: 'CDA for bias: "A male doctor examined the patient" → "A female doctor examined the patient." If model outputs change significantly (different follow-up actions, different tone), it reveals demographic bias in learned associations.' },

  { id: 3070, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Fine-Tuning Strategies', difficulty: 'hard', keywords: ['curriculum learning', 'progressive', 'difficulty', 'ordering'],
    question: 'Curriculum learning for fine-tuning agents involves:',
    options: { A: 'Following a standard curriculum of learning from existing models', B: 'Training on easier examples first, progressively introducing harder examples — mimicking how humans learn', C: 'Using a university curriculum as training data', D: 'Teaching the model multiple subjects in sequence' },
    answer: 'B', explanation: 'Curriculum learning: sort training examples by difficulty → train on easy first (model builds foundation) → gradually introduce hard examples. Empirically improves convergence speed and final performance vs random ordering.' },
];
