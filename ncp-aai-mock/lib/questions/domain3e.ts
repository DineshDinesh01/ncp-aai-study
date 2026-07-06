import { Question } from '../types';

export const domain3eQuestions: Question[] = [
  { id: 3091, domain: 3, domainName: 'Evaluation & Tuning', topic: 'RAGAS Framework', difficulty: 'medium', keywords: ['RAGAS', 'RAG evaluation', 'faithfulness', 'answer relevancy'],
    question: 'RAGAS (RAG Assessment) framework evaluates RAG pipelines on:',
    options: { A: 'Only retrieval precision and recall', B: 'Faithfulness (is answer supported by context?), Answer Relevancy (does answer address query?), Context Precision, and Context Recall', C: 'Response time and cost only', D: 'RAGAS only evaluates the retrieval component, not generation' },
    answer: 'B', explanation: 'RAGAS metrics: Faithfulness (no hallucination beyond context), Answer Relevancy (on-topic response), Context Precision (retrieved context is relevant), Context Recall (all relevant context was retrieved). Covers both retrieval and generation quality.' },

  { id: 3092, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Reinforcement Learning Setup', difficulty: 'hard', keywords: ['reward shaping', 'sparse reward', 'dense reward', 'RL'],
    question: 'Reward shaping in RLHF addresses the problem that:',
    options: { A: 'The reward model needs to be shaped like a specific function', B: 'Sparse rewards (only at the end) are hard to learn from — intermediate rewards guide the policy more efficiently toward desired behavior', C: 'Rewards must be shaped to fit within a fixed range', D: 'Shape of reward curves determines training stability' },
    answer: 'B', explanation: 'Reward shaping: final response quality (sparse) supplemented with: intermediate step quality bonuses, format adherence, and length appropriateness. Denser signals → faster learning. Shaping must avoid encouraging rewarded behavior that misses the true goal (reward hacking).' },

  { id: 3093, domain: 3, domainName: 'Evaluation & Tuning', topic: 'AgentBench Evaluation', difficulty: 'medium', keywords: ['AgentBench', 'task evaluation', 'multi-task', 'realistic'],
    question: 'AgentBench evaluates LLM agents on:',
    options: { A: 'Only language generation benchmarks', B: 'Interactive task performance in realistic environments: OS tasks, database queries, knowledge graph operations, web browsing, code games', C: 'Agent hardware benchmarks for GPU performance', D: 'Bench-press style physical capability testing' },
    answer: 'B', explanation: 'AgentBench: evaluates agents in real interactive environments requiring multi-step actions. Tests actual agent capability — does the agent achieve the task in a live system? Not just "does it generate reasonable text?"' },

  { id: 3094, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Statistical Significance', difficulty: 'hard', keywords: ['statistical significance', 'p-value', 'sample size', 'evaluation'],
    question: 'When comparing two AI agent versions with A/B testing, statistical significance requires:',
    options: { A: 'At least 10 test cases to be conclusive', B: 'Sufficient sample size determined by effect size, variance, and desired power — small differences require much larger samples than large differences', C: 'Always use p < 0.01 threshold for AI evaluations', D: 'Statistical significance is not applicable to AI system evaluation' },
    answer: 'B', explanation: 'Sample size calculation: Cohen\'s d for effect size, target power (0.8), alpha (0.05) → required N. A 5% accuracy improvement requires ~1500+ samples to be statistically significant. Premature conclusion from 100 samples leads to misleading comparisons.' },

  { id: 3095, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Ablation Studies', difficulty: 'medium', keywords: ['ablation', 'component', 'contribution', 'isolation'],
    question: 'Ablation studies in AI agent development help by:',
    options: { A: 'Removing underperforming agents from the system', B: 'Systematically removing or disabling components to measure each component\'s independent contribution to overall performance', C: 'Ablating (burning) test data to prevent overfitting', D: 'Ablation studies are only for academic research papers' },
    answer: 'B', explanation: 'Ablation: "agent with CoT + tools + memory = 85%" → remove memory: "85% → 78%: memory adds 7%" → remove tools: "85% → 60%: tools add 25%" → remove CoT: "85% → 70%: CoT adds 15%". Identifies which components are actually useful.' },

  { id: 3096, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Cross-Validation for Agents', difficulty: 'medium', keywords: ['cross-validation', 'overfitting', 'held-out', 'generalization'],
    question: 'K-fold cross-validation for fine-tuned AI agent evaluation helps:',
    options: { A: 'Training K agents simultaneously for ensemble', B: 'Estimating generalization performance more reliably than a single train/test split — reduces variance from lucky/unlucky test set selection', C: 'K-fold is only applicable to classification tasks', D: 'Cross-validation is too expensive for LLM fine-tuning' },
    answer: 'B', explanation: 'K-fold for agent fine-tuning: split data into K folds → train K times, each time holding out a different fold for evaluation → average results. Especially important with small fine-tuning datasets where single split results are high-variance.' },

  { id: 3097, domain: 3, domainName: 'Evaluation & Tuning', topic: 'LoRA vs Full Fine-Tuning', difficulty: 'hard', keywords: ['LoRA', 'full fine-tuning', 'comparison', 'efficiency'],
    question: 'Full fine-tuning outperforms LoRA when:',
    options: { A: 'The task requires significant behavioral changes from the base model, especially when large amounts of domain-specific training data are available', B: 'Always — full fine-tuning always outperforms LoRA', C: 'When GPU memory is constrained', D: 'LoRA always outperforms full fine-tuning with sufficient data' },
    answer: 'A', explanation: 'Full fine-tuning advantage: when large behavioral shift from base model is needed (completely different output style, format, domain) with sufficient high-quality data. LoRA is efficient for adaptation; full fine-tuning provides more capacity for fundamental change.' },

  { id: 3098, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Evaluation Bias', difficulty: 'hard', keywords: ['evaluation bias', 'position bias', 'verbosity bias', 'judge'],
    question: 'Position bias in LLM-as-judge evaluation means:',
    options: { A: 'Judges evaluate from a biased political position', B: 'LLM judges tend to favor responses shown first or last in pairwise comparisons — requiring positional randomization to get unbiased judgments', C: 'Evaluation results are biased by evaluator position in the company', D: 'Position bias only affects human evaluators, not LLM judges' },
    answer: 'B', explanation: 'LLM judge biases: position bias (favors first response in pairwise), verbosity bias (longer = better), self-enhancement (favors responses from same model family). Mitigations: swap order and average, penalize length explicitly, use diverse judge models.' },

  { id: 3099, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Red Line Evaluation', difficulty: 'hard', keywords: ['red line', 'safety evaluation', 'absolute', 'bright line'],
    question: 'Red-line evaluation for AI agents tests:',
    options: { A: 'Agent performance near the boundary of acceptable behavior', B: 'That agents reliably refuse absolutely prohibited actions (CSAM, bioweapon synthesis) 100% of the time — zero tolerance metric', C: 'Testing with red-colored prompts for visual differentiation', D: 'Agent behavior on borderline policy cases only' },
    answer: 'B', explanation: 'Red-line evaluation: bright-line prohibitions must hold 100% — not "usually" or "mostly." Test suite of 1000+ adversarial prompts attempting to elicit prohibited content across diverse framings. Zero failures required for deployment approval.' },

  { id: 3100, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Model Card Metrics', difficulty: 'easy', keywords: ['model card', 'metrics', 'fairness', 'documentation'],
    question: 'Model cards should report evaluation metrics broken down by:',
    options: { A: 'Only overall aggregate performance', B: 'Demographic subgroups (gender, age, race, language), use case categories, and geographic regions to surface differential performance and potential bias', C: 'Only the best-performing subgroups to avoid misrepresentation', D: 'Model cards don\'t need quantitative metrics' },
    answer: 'B', explanation: 'Disaggregated metrics in model cards: "Overall accuracy 85%. By gender: male 88%, female 82%. By language: English 90%, Spanish 75%, Hindi 65%." Surfaces differential performance that aggregate metrics hide. Required for responsible AI deployment.' },
];
