import { Question } from '../types';

export const domain3PrepartoQuestions: Question[] = [
  {
    id: 3801,
    domain: 3,
    domainName: 'Evaluation and Tuning',
    topic: 'Scenario: RAGAS Metrics Selection',
    question: 'Your RAG-based customer support agent is returning answers that sound fluent and confident but include facts not found in the retrieved documents. Which RAGAS metric directly measures this failure mode, and what does a low score indicate?',
    options: {
      A: 'Answer Relevancy — a low score means the answer does not address the question asked.',
      B: 'Faithfulness — a low score means the answer contains claims not supported by the retrieved context (hallucinations relative to the context).',
      C: 'Context Precision — a low score means the retrieved chunks contain too much irrelevant content.',
      D: 'Context Recall — a low score means the retrieval pipeline missed relevant chunks that were in the knowledge base.'
    },
    answer: 'B',
    explanation: 'Faithfulness measures whether every claim in the generated answer can be traced back to the retrieved context. A low faithfulness score = the LLM is generating facts beyond (or contradicting) what it was given — the exact failure mode described. Answer Relevancy (A) measures whether the answer addresses the question. Context Precision (C) measures whether retrieved chunks are relevant. Context Recall (D) measures retrieval completeness.',
    keywords: ['RAGAS', 'faithfulness', 'hallucination', 'RAG evaluation', 'context'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 3802,
    domain: 3,
    domainName: 'Evaluation and Tuning',
    topic: 'Scenario: LLM-as-Judge Setup',
    question: 'You are setting up an LLM-as-judge evaluation pipeline for your agent. The judge model must score agent responses on a 1-5 scale for helpfulness. Select TWO practices that most improve the reliability and consistency of LLM-as-judge scoring.',
    options: {
      A: 'Use the same model as the judge that generated the responses, so it understands its own output best.',
      B: 'Provide the judge with a detailed rubric defining what scores 1, 3, and 5 look like with concrete examples (few-shot rubric anchoring), reducing score variance from subjective interpretation.',
      C: 'Run each response through the judge 3 times and average the scores, since LLM judges are non-deterministic.',
      D: 'Use a model different from (and more capable than) the generator as the judge to reduce self-preference bias, and set temperature=0 for deterministic scoring.',
      E: 'Ask the judge to score all criteria simultaneously in a single prompt to save API calls.'
    },
    answer: 'BD',
    explanation: '(B) Few-shot rubric anchoring with concrete examples for each score level dramatically reduces variance — without anchoring, different judges (and even the same judge across calls) interpret "helpful" differently. (D) Using a more capable, different model as judge reduces self-preference bias (models tend to rate their own outputs higher) and temperature=0 makes scoring deterministic. Option A introduces self-preference bias. Option C (averaging) helps but doesn\'t fix calibration — better to fix the root cause. Option E (simultaneous criteria) reduces score quality — sequential scoring per criterion is more reliable.',
    keywords: ['LLM-as-judge', 'rubric', 'self-preference bias', 'temperature', 'evaluation'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 3803,
    domain: 3,
    domainName: 'Evaluation and Tuning',
    topic: 'Scenario: Fine-tuning Strategy Selection',
    question: 'Your agent uses a 70B parameter base model that excels at general reasoning but consistently produces verbose, unstructured output for tool call results — missing the compact JSON format your pipeline requires. You have 500 examples of ideal input-output pairs. Which fine-tuning approach is MOST cost-effective?',
    options: {
      A: 'Full fine-tuning on all 70B parameters using the 500 examples.',
      B: 'LoRA fine-tuning: freeze the base model and train low-rank adapter matrices on the attention and MLP layers, targeting the output format behavior with far fewer trainable parameters.',
      C: 'RLHF with a reward model trained to prefer compact JSON output over verbose text.',
      D: 'Distillation: train a smaller 7B model on the 500 examples to replace the 70B model entirely.'
    },
    answer: 'B',
    explanation: 'LoRA is the cost-effective choice for format adaptation: (1) 500 examples is appropriate for LoRA but insufficient for full fine-tuning of a 70B model without catastrophic forgetting. (2) Only adapter parameters are trained (typically <1% of model parameters), requiring far less GPU memory and compute. (3) Preserves the base model\'s reasoning while adapting output format. Full fine-tuning (A) with 500 examples would likely overfit. RLHF (C) requires a separate reward model — overkill for a format task. Distillation (D) degrades the 70B reasoning quality.',
    keywords: ['LoRA', 'fine-tuning', 'format adaptation', 'adapter', 'efficient training'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 3804,
    domain: 3,
    domainName: 'Evaluation and Tuning',
    topic: 'Scenario: NeMo Curator Data Curation',
    question: 'You are preparing a fine-tuning dataset for a medical Q&A agent using NVIDIA NeMo Curator. The raw dataset has 500K documents from web scrapes, including duplicates, low-quality content, and PII. Select THREE NeMo Curator capabilities that address these data quality issues.',
    options: {
      A: 'NeMo Curator\'s fuzzy deduplication (MinHash LSH) identifies and removes near-duplicate documents at scale, preventing the model from memorizing repeated content.',
      B: 'NeMo Curator automatically generates synthetic question-answer pairs from documents to augment the training set.',
      C: 'NeMo Curator includes a PII redaction module that identifies and masks personal information (names, phone numbers, SSNs) using NER models before the data enters training.',
      D: 'NeMo Curator converts all documents to NVIDIA\'s proprietary binary training format for faster GPU ingestion.',
      E: 'NeMo Curator\'s quality classifier (trained on high-quality reference corpora) scores and filters out low-quality web content based on perplexity and educational value signals.'
    },
    answer: 'ACE',
    explanation: 'All three are actual NeMo Curator capabilities: (A) MinHash LSH fuzzy deduplication handles near-duplicates at scale — exact dedup misses paraphrased duplicates. (C) PII redaction via NER is a documented NeMo Curator module for privacy compliance. (E) Quality filtering using classifier models trained on reference data (like Wikipedia) is NeMo Curator\'s document quality scoring. Option B is not a NeMo Curator feature — synthetic data generation is a separate concern. Option D is fabricated — NeMo Curator outputs standard formats.',
    keywords: ['NeMo Curator', 'deduplication', 'PII', 'quality filtering', 'MinHash'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 3,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 3805,
    domain: 3,
    domainName: 'Evaluation and Tuning',
    topic: 'Scenario: Trajectory Evaluation',
    question: 'You want to evaluate whether your multi-step research agent correctly solves problems, not just produces correct final answers. The agent sometimes reaches the right answer via wrong intermediate steps (lucky guesses). What evaluation approach specifically catches this?',
    options: {
      A: 'End-to-end accuracy: compare the agent\'s final answer to the ground truth answer.',
      B: 'Trajectory evaluation: evaluate the agent\'s complete sequence of tool calls, reasoning steps, and intermediate conclusions against an expected "golden trajectory" or a set of valid trajectories.',
      C: 'Human evaluation: have domain experts rate the quality of final answers.',
      D: 'Latency benchmarking: measure how quickly the agent reaches correct answers.'
    },
    answer: 'B',
    explanation: 'Trajectory evaluation specifically tests the PROCESS not just the outcome. A lucky-guess failure (right answer, wrong path) scores 100% on end-to-end accuracy but fails on trajectory evaluation because the tool call sequence doesn\'t reflect valid reasoning. This matters for: (1) identifying brittle behavior that will fail on similar but not identical queries, (2) ensuring the agent actually uses the right information sources. End-to-end accuracy (A) misses the lucky guess problem by design.',
    keywords: ['trajectory evaluation', 'process evaluation', 'golden trajectory', 'agentic evaluation', 'intermediate steps'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 3806,
    domain: 3,
    domainName: 'Evaluation and Tuning',
    topic: 'SFT vs RLHF vs DPO',
    question: 'Select TWO accurate statements that distinguish DPO (Direct Preference Optimization) from RLHF with PPO for fine-tuning an agent to prefer more helpful responses.',
    options: {
      A: 'DPO eliminates the need for a separate reward model by directly optimizing the policy on preference pairs (chosen vs rejected responses), while RLHF requires training a reward model first.',
      B: 'DPO always produces better results than RLHF because it uses more training data per step.',
      C: 'DPO training is more stable than RLHF with PPO because it avoids the reinforcement learning optimization loop, which can suffer from reward hacking and instability.',
      D: 'RLHF with PPO requires preference pairs while DPO requires absolute quality scores for each response.',
      E: 'DPO can only be applied to models under 7B parameters due to memory constraints.'
    },
    answer: 'AC',
    explanation: '(A) DPO\'s key innovation: it reformulates preference optimization as a classification problem on (chosen, rejected) pairs, embedding the reward model implicitly — no separate reward model training or RL loop needed. (C) PPO-based RLHF is notorious for training instability (reward hacking, KL penalty tuning, PPO hyperparameter sensitivity). DPO\'s supervised learning objective is significantly more stable. Option B is false — RLHF can outperform DPO in some settings. Option D is backwards — both use preference pairs. Option E is false — DPO has been applied to 70B+ models.',
    keywords: ['DPO', 'RLHF', 'PPO', 'preference optimization', 'reward model'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 3807,
    domain: 3,
    domainName: 'Evaluation and Tuning',
    topic: 'Scenario: AgentEval',
    question: 'Your company is using NVIDIA AgentEval to evaluate an automated customer refund agent. The evaluator team defines three criteria: accuracy of refund calculation, policy compliance, and communication clarity. What does AgentEval use to score each criterion, and what is its key advantage over manual review?',
    options: {
      A: 'AgentEval uses deterministic rule-based checkers for each criterion; its advantage is speed over manual review.',
      B: 'AgentEval uses LLM judges (QuantifierAgent and CriticAgent) that evaluate agent task completion against defined criteria; its advantage is scalable, consistent evaluation of complex qualitative criteria that rule-based systems cannot score.',
      C: 'AgentEval uses human annotators assisted by an LLM pre-screener; its advantage is higher accuracy than pure automated evaluation.',
      D: 'AgentEval uses statistical comparison against a baseline model; its advantage is detecting regressions without needing defined criteria.'
    },
    answer: 'B',
    explanation: 'NVIDIA AgentEval uses a QuantifierAgent (scores how well criteria are met) and CriticAgent (evaluates whether the task was successfully completed) — both LLM-based. The key advantage: criteria like "policy compliance" and "communication clarity" require judgment that rule-based systems cannot encode, but LLM judges can evaluate consistently at scale. This enables evaluation of thousands of agent interactions rather than sampling for manual review. Options A, C, D describe different approaches that don\'t match AgentEval\'s architecture.',
    keywords: ['AgentEval', 'QuantifierAgent', 'CriticAgent', 'LLM judge', 'evaluation'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 3808,
    domain: 3,
    domainName: 'Evaluation and Tuning',
    topic: 'Scenario: Benchmark Selection',
    question: 'You need to select a benchmark to evaluate whether your agent can solve multi-step reasoning tasks that require using tools (web search, calculator, code execution) across multiple turns. Which benchmark is MOST appropriate?',
    options: {
      A: 'MMLU (Massive Multitask Language Understanding) — tests broad knowledge across 57 academic subjects.',
      B: 'GAIA (General AI Assistants benchmark) — tests real-world task completion requiring multi-step reasoning, tool use, and web navigation, using tasks a human could do in minutes.',
      C: 'HellaSwag — tests commonsense natural language inference and sentence completion.',
      D: 'HumanEval — tests code generation ability by asking models to complete Python functions.'
    },
    answer: 'B',
    explanation: 'GAIA is specifically designed for agentic evaluation: tasks require multi-step reasoning + tool use (web search, file reading, calculator) and are validated against real-world answers. It tests the exact capability described. MMLU (A) is a knowledge test with no tool use. HellaSwag (C) tests commonsense inference, not agentic tool use. HumanEval (D) tests code generation, not multi-step agentic task completion.',
    keywords: ['GAIA', 'benchmark', 'agentic evaluation', 'tool use', 'multi-step'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 3809,
    domain: 3,
    domainName: 'Evaluation and Tuning',
    topic: 'RAGAS Metric Interpretation',
    question: 'Select TWO accurate interpretations of RAGAS evaluation results for a RAG agent that shows: Faithfulness=0.92, Answer Relevancy=0.61, Context Precision=0.45, Context Recall=0.88.',
    options: {
      A: 'The retrieval pipeline is returning mostly relevant chunks (high Context Recall) but many of those chunks contain irrelevant content (low Context Precision) — suggesting the retrieval is too broad.',
      B: 'The high Faithfulness score means the agent is not hallucinating, but the low Answer Relevancy means answers are grounded but not well-targeted to what the user actually asked.',
      C: 'The low Context Precision means the LLM is not reading the retrieved documents correctly.',
      D: 'Context Recall of 0.88 means 88% of retrieved documents are from the correct domain.',
      E: 'The primary fix should be to use a larger LLM, as larger models have higher Answer Relevancy.'
    },
    answer: 'AB',
    explanation: '(A) Context Precision=0.45 (low) + Context Recall=0.88 (high) is the classic "broad retrieval" pattern: the pipeline finds the right information (high recall) but also retrieves many irrelevant chunks (low precision). Fix: rerank retrieved chunks or use stricter similarity thresholds. (B) Faithfulness=0.92 (high) means the LLM is faithfully grounding in context, not hallucinating. Answer Relevancy=0.61 (low) means the answers aren\'t addressing the user\'s question well — a prompt engineering issue, not a retrieval issue. Option C misinterprets Precision. Option D misinterprets Recall. Option E is not supported by these metrics.',
    keywords: ['RAGAS', 'context precision', 'context recall', 'faithfulness', 'answer relevancy'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 3810,
    domain: 3,
    domainName: 'Evaluation and Tuning',
    topic: 'LoRA Configuration',
    question: 'Select TWO accurate statements about configuring LoRA for fine-tuning a large language model on a domain-specific agent task.',
    options: {
      A: 'Increasing the LoRA rank (r) increases the number of trainable parameters and the adapter\'s capacity to capture domain-specific patterns, at the cost of more memory and compute.',
      B: 'LoRA adapters must be merged into the base model weights before inference — they cannot be loaded as separate modules.',
      C: 'The LoRA alpha parameter controls the scaling of the adapter output; setting alpha=2*r is a common heuristic that ensures stable training without manual learning rate adjustment.',
      D: 'LoRA can only be applied to attention layers (Q, K, V projections) and cannot be applied to MLP layers or embeddings.',
      E: 'Multiple LoRA adapters can be loaded simultaneously onto the same base model at inference time (using techniques like LoRA-Mix), enabling a single base model to serve multiple fine-tuned variants.'
    },
    answer: 'AE',
    explanation: '(A) Rank is the key LoRA hyperparameter: r=4 gives minimal capacity (suitable for simple format adaptation); r=64 gives much higher capacity for complex domain shift. The tradeoff is memory/compute per rank. (E) Multi-adapter serving (LoRA multiplexing via frameworks like S-LoRA or LoRA-Mix) is a production technique that allows one base model to serve many fine-tuned variants simultaneously — critical for multi-tenant deployments. Option B is false — LoRA adapters can be loaded separately at inference (PEFT library). Option C\'s alpha heuristic is commonly cited but not universally correct. Option D is false — LoRA can be applied to any linear layer.',
    keywords: ['LoRA', 'rank', 'alpha', 'adapter', 'multi-adapter'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 3811,
    domain: 3,
    domainName: 'Evaluation and Tuning',
    topic: 'Scenario: Evaluation Dataset Contamination',
    question: 'Your agent achieves 94% on your internal evaluation benchmark but only 71% when tested on a new held-out dataset created by your QA team. What is the MOST likely explanation and correct fix?',
    options: {
      A: 'The QA team created harder questions; the fix is to re-train on more diverse data.',
      B: 'Evaluation contamination: examples from the internal benchmark leaked into fine-tuning data, inflating scores. Fix: use strict data pipeline separation (train/val/test splits never shared) and create evaluation sets AFTER training data is frozen.',
      C: 'The internal benchmark uses different scoring rubrics; align the rubrics and re-evaluate.',
      D: 'The agent performs better on formal language (internal benchmark) than informal language (QA team\'s questions); fine-tune on informal examples.'
    },
    answer: 'B',
    explanation: 'A 23-point gap between internal and held-out benchmarks is the hallmark of evaluation contamination: the model has effectively "seen" the benchmark questions during training (or the internal eval set wasn\'t properly held out). This is a common failure mode when evaluation datasets are built before training data is filtered. The fix is strict data governance: freeze the evaluation set before any data collection, and never include evaluation examples in training or fine-tuning data. Options A, C, D are possible but explain much smaller gaps.',
    keywords: ['contamination', 'benchmark', 'data leakage', 'train-test split', 'evaluation'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 3812,
    domain: 3,
    domainName: 'Evaluation and Tuning',
    topic: 'Scenario: Online vs Offline Evaluation',
    question: 'Select TWO accurate distinctions between offline evaluation (running metrics on a fixed dataset) and online evaluation (A/B testing in production) for an agentic system.',
    options: {
      A: 'Offline evaluation is faster and cheaper but measures proxy metrics (e.g., RAGAS scores) that may not correlate with actual business outcomes; online evaluation measures real user behavior but requires live traffic.',
      B: 'Online A/B testing is always more accurate than offline evaluation because it uses real data.',
      C: 'Offline evaluation can test safety properties (e.g., "does the agent refuse harmful requests?") more safely than online evaluation, because you can include adversarial test cases without risking real user harm.',
      D: 'Online evaluation is only valid for agents with more than 10,000 daily active users.',
      E: 'Offline evaluation results directly predict online performance because both use the same agent.'
    },
    answer: 'AC',
    explanation: '(A) The proxy metric problem is a real limitation of offline evaluation: a RAGAS faithfulness score of 0.95 doesn\'t guarantee users will find the agent helpful or complete their tasks. Online A/B testing measures what actually matters: task completion, user satisfaction, revenue impact. (C) Safety testing is much safer offline: you can run thousands of jailbreak attempts, harmful queries, and edge cases against the agent without exposing real users to potential harm. Option B is false — online tests can have confounds. Option D is false — any live traffic is sufficient for A/B. Option E is false — distribution shift is common.',
    keywords: ['offline evaluation', 'online evaluation', 'A/B testing', 'proxy metrics', 'safety testing'],
    difficulty: 'medium',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 3813,
    domain: 3,
    domainName: 'Evaluation and Tuning',
    topic: 'Scenario: QLoRA for Resource-Constrained Fine-Tuning',
    question: 'Your team needs to fine-tune a 13B parameter model on a single A100 80GB GPU. Standard LoRA still requires loading the full model in fp16 (~26GB) plus activations and optimizer states. What technique enables fine-tuning on this single GPU?',
    options: {
      A: 'QLoRA: quantize the frozen base model to 4-bit (NF4 format), then apply LoRA adapters in bf16. The 4-bit base reduces VRAM to ~6.5GB, leaving room for adapters, activations, and optimizer states on one A100.',
      B: 'Gradient checkpointing alone: recompute activations during the backward pass instead of storing them, reducing peak VRAM by ~40%.',
      C: 'Model parallelism: split the 13B model across multiple virtual GPU partitions within the A100\'s memory.',
      D: 'Use bfloat16 instead of float16 — it halves memory usage compared to float32 but has better range than float16.'
    },
    answer: 'A',
    explanation: 'QLoRA (Quantized LoRA) is specifically designed for this scenario: 4-bit NF4 quantization of the base model reduces a 13B model from ~26GB (fp16) to ~6.5GB, making it fit on a single A100. LoRA adapters train in bf16 on top of the frozen quantized base. Gradient checkpointing (B) reduces activation memory but doesn\'t address the 26GB model weight issue. Model parallelism (C) across "virtual partitions" in one GPU isn\'t a standard technique. bfloat16 (D) vs float32 is a 2x reduction, still too large at 13GB.',
    keywords: ['QLoRA', 'quantization', 'NF4', 'A100', 'memory-efficient fine-tuning'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 3814,
    domain: 3,
    domainName: 'Evaluation and Tuning',
    topic: 'RAGAS vs Human Evaluation Tradeoffs',
    question: 'Select TWO accurate statements about the tradeoffs between RAGAS automated evaluation and human evaluation for a production RAG agent.',
    options: {
      A: 'RAGAS can evaluate thousands of queries per hour at near-zero marginal cost, making it suitable for continuous regression testing after each model update.',
      B: 'RAGAS faithfulness scores are always more reliable than human faithfulness judgments because they are objective and deterministic.',
      C: 'Human evaluation captures nuanced quality dimensions (e.g., tone appropriateness, cultural sensitivity, implicit context) that RAGAS metrics cannot measure.',
      D: 'RAGAS requires a golden reference answer for every query, making it unusable for open-ended questions where multiple correct answers exist.',
      E: 'Human evaluation should replace RAGAS entirely once a model reaches production.'
    },
    answer: 'AC',
    explanation: '(A) Automation at scale is RAGAS\'s core advantage: CI/CD pipelines can run thousands of test cases after every commit, catching regressions automatically. Human evaluation at this scale is cost-prohibitive. (C) Human evaluators capture dimensions that RAGAS metrics don\'t: does the tone match the brand voice? Is the answer culturally appropriate? Does it address the user\'s implicit intent? These require human judgment. Option B is false — RAGAS metrics are LLM-based and have their own biases. Option D is false — Answer Relevancy and Faithfulness don\'t require golden answers. Option E creates a false dichotomy — both are needed.',
    keywords: ['RAGAS', 'human evaluation', 'automated testing', 'regression testing', 'scale'],
    difficulty: 'medium',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 3815,
    domain: 3,
    domainName: 'Evaluation and Tuning',
    topic: 'Scenario: Catastrophic Forgetting',
    question: 'After fine-tuning your general-purpose agent on 10,000 domain-specific examples, you observe that it now performs well on domain tasks but scores 30% lower on general reasoning benchmarks than the base model. This is a classic case of what phenomenon, and what is the best preventative technique?',
    options: {
      A: 'Overfitting — use a smaller training dataset and add dropout.',
      B: 'Catastrophic forgetting — the fine-tuned model overwrites general capabilities with domain-specific patterns. Prevent with Elastic Weight Consolidation (EWC) or LoRA (which doesn\'t modify base weights) or by including a mix of general examples in the fine-tuning dataset.',
      C: 'Distribution shift — the domain training data has a different statistical distribution than benchmark evaluation data.',
      D: 'Mode collapse — the model converges to producing a narrow range of outputs that score well on domain metrics.'
    },
    answer: 'B',
    explanation: 'Catastrophic forgetting occurs when continued training on new data overwrites the neural network weights that encoded previously learned capabilities. The drop in general reasoning is the diagnostic signal. Prevention options: (1) LoRA fine-tuning leaves base weights frozen — the most practical solution. (2) EWC adds a regularization penalty that slows weight changes for parameters important to the original task. (3) Data mixing (including general examples in the fine-tuning batch) retains general capability through continued exposure. Option A describes overfitting (poor generalization within domain). Option C describes deployment distribution shift. Option D is a generative model failure mode.',
    keywords: ['catastrophic forgetting', 'LoRA', 'EWC', 'fine-tuning', 'base model'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
];