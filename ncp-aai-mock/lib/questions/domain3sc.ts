import { Question } from '../types';

export const domain3scQuestions: Question[] = [
  { id: 3201, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scenario: Fine-Tuning Decision', difficulty: 'hard', keywords: ['scenario', 'fine-tuning', 'prompting', 'decision'],
    question: 'Your legal document summarization agent produces inconsistent output formats despite detailed prompt instructions. The team is debating fine-tuning vs better prompting. When should you choose fine-tuning over prompt engineering?',
    options: {
      A: 'Always fine-tune first — it always beats prompting',
      B: 'Fine-tune when: you have 100+ high-quality examples, the task requires consistent format/style that prompting cannot reliably achieve, and the cost of labeling examples is worth the inference cost savings from shorter prompts',
      C: 'Fine-tune only when the base model has never seen your domain',
      D: 'Fine-tune when the model is too slow, not when accuracy is the issue'
    },
    answer: 'B',
    explanation: 'Fine-tuning sweet spot for format consistency: models learn output structure (headers, bullet format, citation style) better from examples than from instructions. Prerequisites: 100+ labeled examples, clear format definition, stable task definition. First: exhaust prompt engineering (few-shot, XML structure). Fine-tune when you hit the ceiling.' },

  { id: 3202, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scenario: Regression Detection', difficulty: 'medium', keywords: ['scenario', 'regression', 'CI', 'eval'],
    question: 'After deploying a new model version, customer complaints spike 3 days later. Your team had no automated quality checks. What evaluation infrastructure would have caught this regression before deployment?',
    options: {
      A: 'Manual QA review of 10 test cases before each release',
      B: 'An automated eval suite running on every candidate model/prompt: 500+ representative test cases covering core capabilities, with a quality gate blocking deployment if any key metric drops > 3%',
      C: 'A/B testing in production with 10% of users on new version',
      D: 'Comparing BLEU scores of the new vs old model outputs'
    },
    answer: 'B',
    explanation: 'Pre-deployment regression testing: large test suite (500+ cases) covering diverse scenarios → automated scoring → quality gate. If accuracy on "billing queries" drops from 87% to 82% → block release. A/B testing (Option C) catches issues but users pay the price. Manual QA (10 cases) has too small a sample to detect subtle regressions.' },

  { id: 3203, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scenario: LoRA Fine-Tuning', difficulty: 'hard', keywords: ['scenario', 'LoRA', 'rank', 'overfitting'],
    question: 'You fine-tuned a model with LoRA rank=64 on 500 training examples. Training loss is very low but validation accuracy has not improved over the base model. What is the most likely cause?',
    options: {
      A: 'The learning rate is too low',
      B: 'LoRA rank=64 is too high for 500 examples — the adapter has overfit to training data. Reduce rank (try 8 or 16) and/or add dropout to the LoRA layers',
      C: 'LoRA is the wrong technique — use full fine-tuning instead',
      D: 'The base model is already at maximum capability for this task'
    },
    answer: 'B',
    explanation: 'LoRA rank controls the number of trainable parameters. Rank=64 with only 500 examples → too many parameters relative to data → overfitting. The training set is memorized, not generalized. Fix: lower rank (8-16 for small datasets), add LoRA dropout (0.05-0.1), increase training data, or use data augmentation.' },

  { id: 3204, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scenario: Human Eval Calibration', difficulty: 'hard', keywords: ['scenario', 'inter-rater', 'calibration', 'labeling'],
    question: 'You hire 5 human evaluators to rate AI responses on helpfulness (1-5). When you check their ratings, the same response gets scores of 2, 3, 3, 4, 5 from different evaluators. What should you do before using this data?',
    options: {
      A: 'Average the scores and proceed — variance is expected',
      B: 'Run a calibration session: show all evaluators the same 20 examples, discuss disagreements, establish shared rubric with anchoring examples for each score level, then re-evaluate',
      C: 'Discard the outlier scores (2 and 5) and use the middle ratings',
      D: 'Hire more evaluators to statistically smooth the variance'
    },
    answer: 'B',
    explanation: 'High inter-rater variance (Cohen\'s κ < 0.4 in this case) invalidates the evaluation. Root cause: evaluators have different mental models of "helpful." Fix: calibration session with anchor examples ("A score of 3 looks like THIS response") → re-evaluate → re-measure agreement → only proceed when κ > 0.6. More evaluators without calibration just amplifies the confusion.' },

  { id: 3205, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scenario: Reward Hacking', difficulty: 'hard', keywords: ['scenario', 'reward hacking', 'RLHF', 'Goodhart'],
    question: 'After RLHF training, your model produces very long, verbose responses that score well on your automated helpfulness metric. However, real users rate these responses as annoying and hard to read. What happened and how do you fix it?',
    options: {
      A: 'The RLHF reward model needs more data — collect 10x more preference labels',
      B: 'The model learned to optimize the proxy metric (helpfulness score) without learning the true goal (user satisfaction) — a Goodhart\'s Law failure. Fix: add explicit brevity rewards, penalize unnecessary length, and add diverse evaluation dimensions that capture the true goal',
      C: 'Reduce the number of RLHF training steps to prevent over-optimization',
      D: 'The base model is biased toward verbosity — start with a different base model'
    },
    answer: 'B',
    explanation: 'Classic Goodhart\'s Law: "When a measure becomes a target, it ceases to be a good measure." The model exploited the proxy metric (helpfulness score) by generating long responses. Fix: multi-dimensional reward (helpfulness + conciseness + coherence) and use KL-divergence penalty to prevent the model from drifting too far from base model behavior.' },

  { id: 3206, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scenario: RAG Evaluation', difficulty: 'medium', keywords: ['scenario', 'RAG', 'RAGAS', 'faithfulness'],
    question: 'Your RAG system retrieves relevant documents but users report the answers contain information not in the retrieved documents. Which RAGAS metric directly measures this problem, and what does it evaluate?',
    options: {
      A: 'Context Recall — measures if the retrieved context contains all needed information',
      B: 'Faithfulness — measures whether every claim in the answer is supported by the retrieved context (score = supported_claims / total_claims)',
      C: 'Answer Relevancy — measures if the answer addresses the question',
      D: 'Context Precision — measures if retrieved context is relevant to the question'
    },
    answer: 'B',
    explanation: 'Faithfulness measures hallucination: decompose the answer into individual claims → check each claim against retrieved context → faithfulness = (claims_supported_by_context) / (total_claims). A low faithfulness score means the model is "making things up" beyond what the context supports. This is the exact metric for the described problem.' },

  { id: 3207, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scenario: Data Quality for Fine-Tuning', difficulty: 'medium', keywords: ['scenario', 'data quality', 'fine-tuning', 'cleaning'],
    question: 'You collected 50,000 examples for fine-tuning by scraping your customer support chat logs. Before training, what data quality steps are most critical?',
    options: {
      A: 'Shuffle the data and split 80/20 train/test — the volume is sufficient',
      B: 'Filter for quality: remove duplicate conversations, filter out poor agent responses (low customer ratings), remove PII, deduplicate near-similar examples, and have humans review a 500-example sample to verify quality before training',
      C: 'Use all data — more data always leads to better models',
      D: 'Convert all text to lowercase for consistency'
    },
    answer: 'B',
    explanation: 'Data quality trumps quantity for fine-tuning. Support chat logs contain: duplicate conversations, agent errors, PII (names, account numbers), off-topic chats. Training on bad examples teaches the model bad behavior. 5,000 high-quality examples often outperform 50,000 unfiltered ones. Human spot-checking reveals systematic issues before wasting GPU hours.' },

  { id: 3208, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scenario: Catastrophic Forgetting', difficulty: 'hard', keywords: ['scenario', 'catastrophic forgetting', 'fine-tuning', 'EWC'],
    question: 'After fine-tuning your model on medical domain data, it scores 95% on medical questions but now scores only 45% on general reasoning tasks it previously aced. What happened and what should you have done?',
    options: {
      A: 'The learning rate was too high — retrain with a lower rate',
      B: 'Catastrophic forgetting: fine-tuning on a narrow domain overwrote general capabilities. Prevention: mix 10-20% general instruction data with your domain data, use a lower learning rate, or apply EWC to penalize changes to important weights',
      C: 'Medical data has different token distributions that corrupted general vocabulary',
      D: 'This is expected — domain fine-tuning always reduces general capabilities' },
    answer: 'B',
    explanation: 'Catastrophic forgetting is common in narrow domain fine-tuning. Mitigations: (1) Data mixing: blend 80% domain + 20% general instruction data during fine-tuning. (2) Lower learning rate: preserves more original weights. (3) EWC: identifies weights important for general tasks and penalizes their modification. (4) LoRA: modifies fewer parameters, less forgetting.' },

  { id: 3209, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scenario: Evaluation Gaming', difficulty: 'hard', keywords: ['scenario', 'benchmark', 'gaming', 'contamination'],
    question: 'A competitor claims their model achieves 95% on your internal benchmark — suspiciously higher than any published model. You suspect data contamination. How do you verify this?',
    options: {
      A: 'Accept the results — high performance is always genuine',
      B: 'Create paraphrased versions of your benchmark questions and re-test: if their model scores 95% on originals but drops to 60% on paraphrases with same difficulty, the model likely memorized your test set',
      C: 'Publish your benchmark so the community can verify',
      D: 'Compare their training data sources to your benchmark questions'
    },
    answer: 'B',
    explanation: 'Paraphrase testing for contamination detection: rephrase questions to have same difficulty and required knowledge but different surface form. Genuine learning: performance stays similar on paraphrases. Memorization: performance drops sharply on paraphrases because the model recognizes original text but not semantically equivalent rewrites.' },

  { id: 3210, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scenario: Production Monitoring', difficulty: 'medium', keywords: ['scenario', 'monitoring', 'quality', 'production'],
    question: 'Three weeks after deployment, you notice user engagement with your AI assistant has dropped 20% but there are no server errors. What monitoring would help identify the cause?',
    options: {
      A: 'Check server CPU and memory metrics',
      B: 'Analyze: average response length (did it change?), user edit rate of AI responses, session abandonment rate per query type, and sample recent conversations for qualitative review — these proxy metrics reveal quality degradation without ground truth labels',
      C: 'Run your full eval suite against the current model',
      D: 'Ask a sample of users directly why they are using the product less'
    },
    answer: 'B',
    explanation: 'Quality degradation without errors requires proxy metrics. Common signals: response length change (got shorter/longer → quality shift), users editing AI output more (AI got worse), higher abandonment on specific query types (regression in a domain). These are leading indicators detectable without labeled data or user surveys — enabling faster diagnosis.' },
];
