import { Question } from '../types';

export const domain3sc2Questions: Question[] = [
  { id: 3211, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scenario: Evaluation Metrics Selection', difficulty: 'medium', keywords: ['scenario', 'metrics', 'selection', 'task type'],
    question: 'You are evaluating an AI agent that extracts structured data (name, date, amount) from unstructured invoices. Which evaluation approach is most appropriate?',
    options: {
      A: 'Use BLEU score to compare extracted text against reference extractions',
      B: 'Use field-level exact match accuracy: for each field (name, date, amount), compare extracted value against ground truth. Report per-field accuracy separately — this directly measures what matters (did we get the right value for each field?)',
      C: 'Use a 1-5 human rating scale for overall extraction quality',
      D: 'Use perplexity to measure how confidently the model extracted the fields'
    },
    answer: 'B',
    explanation: 'Metric selection should match the task. Structured extraction has a clear ground truth (correct or wrong per field). Field-level exact match is interpretable: "Name: 98%, Date: 94%, Amount: 99%." BLEU (designed for machine translation) is wrong here — partial string matches don\'t map to extraction correctness. Human ratings don\'t scale to thousands of invoices.' },

  { id: 3212, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scenario: Online vs Offline Eval', difficulty: 'hard', keywords: ['scenario', 'online', 'offline', 'A/B test'],
    question: 'Offline evaluation shows Model A outperforms Model B by 8% on your test set. But in a 2-week A/B test, Model A and Model B show identical user engagement and satisfaction. How do you interpret this?',
    options: {
      A: 'Trust the offline eval — A/B tests have too much noise over 2 weeks',
      B: 'Your offline test set does not represent the actual user query distribution. The 8% improvement is on cases your test set over-represents. Update your eval set to better reflect production traffic by sampling real user queries',
      C: 'Model B is better — it achieves the same results with presumably lower cost',
      D: 'Run the A/B test for another 2 weeks to get statistical significance'
    },
    answer: 'B',
    explanation: 'Offline-online eval gap is a signal that your offline test set has distribution mismatch. Your test set may over-represent edge cases or specific query types where Model A shines, but real users mostly ask different things. Fix: continuous eval set updates from production query samples, stratified sampling across query types. This gap is one of the most common pitfalls in AI evaluation.' },

  { id: 3213, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scenario: Insufficient Training Data', difficulty: 'hard', keywords: ['scenario', 'data', 'augmentation', 'synthetic'],
    question: 'You need to fine-tune a model for a niche legal document classification task but only have 200 labeled examples. Your validation accuracy is poor (65%) and you cannot afford more manual labeling. What is the best approach?',
    options: {
      A: 'Accept 65% accuracy and deploy — more data is not available',
      B: 'Use data augmentation: (1) Generate synthetic training examples using a larger LLM with the existing 200 as seeds. (2) Apply back-translation or paraphrasing for variety. (3) Use few-shot prompting on the larger model instead of fine-tuning the smaller one — few-shot with 200 examples may outperform fine-tuning with 200 examples',
      C: 'Increase the number of training epochs to squeeze more from 200 examples',
      D: 'Use a larger base model — it needs less fine-tuning data'
    },
    answer: 'B',
    explanation: 'Low data strategies: synthetic data generation (LLM writes 2,000 additional labeled examples from your 200 seeds), paraphrasing (each example → 5 variations), back-translation (EN → FR → EN creates diverse paraphrases). Also consider: few-shot prompting a capable model may outperform fine-tuning with insufficient data — less data needed for prompting than fine-tuning.' },

  { id: 3214, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scenario: A/B Test Design', difficulty: 'hard', keywords: ['scenario', 'A/B test', 'sample size', 'significance'],
    question: 'You want to A/B test two agent versions. Historically your success rate is 75%. You want to detect a 3% improvement (to 78%) with 80% power and α=0.05. Your traffic is 500 users/day. How long must you run the test?',
    options: {
      A: '1 day — 500 users is statistically sufficient',
      B: 'Calculate required N using sample size formula: approximately 3,500 users per variant (7,000 total) → at 500 users/day split 50/50 (250 per variant) → ~28 days. Running fewer days risks false conclusions from underpowered tests',
      C: '7 days — one week is the industry standard for A/B tests',
      D: 'Run until you see a statistically significant result, then stop'
    },
    answer: 'B',
    explanation: 'Proper A/B test design: calculate sample size BEFORE running. For detecting 3% uplift from 75% baseline with 80% power: n ≈ (1.96 + 0.84)² × 2 × 0.75 × 0.25 / (0.03)² ≈ 3,267 per variant. At 250/day per variant: ~14 days minimum. Run for pre-calculated duration regardless of early results — peeking and stopping early inflates false positive rate.' },

  { id: 3215, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scenario: Model Selection', difficulty: 'medium', keywords: ['scenario', 'model selection', 'benchmark', 'task-specific'],
    question: 'You need to choose between Model X (top score on MMLU benchmark) and Model Y (lower MMLU but higher score on your internal task-specific benchmark). Which do you choose for production and why?',
    options: {
      A: 'Model X — higher MMLU means it is more capable overall',
      B: 'Model Y — task-specific benchmark performance is the only metric that matters for your use case. General benchmarks (MMLU) measure broad academic knowledge, not your specific task. A model that excels at your task in your eval outperforms one that excels at a proxy',
      C: 'Run both in production and let user feedback decide over 6 months',
      D: 'Average the scores and pick the highest combined score'
    },
    answer: 'B',
    explanation: 'The golden rule: evaluate on your actual task, not general benchmarks. MMLU measures academic knowledge across 57 domains — impressive but may not correlate with "extract contract clauses from PDFs" or "classify customer intent." Task-specific eval is ground truth; general benchmarks are noisy proxies. If your internal benchmark is well-designed, trust it over MMLU.' },

  { id: 3216, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scenario: Evals at Scale', difficulty: 'hard', keywords: ['scenario', 'scale', 'LLM judge', 'cost'],
    question: 'You have 50,000 production queries per day and want to continuously evaluate response quality. Human evaluation costs $2/response ($100K/day at full scale). How do you make continuous quality evaluation economically viable?',
    options: {
      A: 'Only evaluate a random 1% sample (500/day) — sufficient for statistical confidence',
      B: 'Stratified sampling (1% = 500/day) for human gold-standard eval + LLM-as-judge on 10% (5,000/day) for broader coverage + fully automated metrics (latency, format check, toxicity) on 100%. Human labels calibrate the LLM judge; LLM judge extends coverage affordably',
      C: 'Switch to fully automated metrics only — LLM judging is too expensive',
      D: 'Evaluate all 50K queries once per week in a batch evaluation job'
    },
    answer: 'B',
    explanation: 'Evaluation pyramid for scale: (1) 100% automated cheap metrics (milliseconds, zero marginal cost). (2) LLM judge on 10% sample (~$0.01-0.05/query = $500-2,500/day vs $100K for humans). (3) Human gold-standard on 1% to calibrate LLM judge. This architecture monitors quality at scale while keeping costs under $5K/day instead of $100K.' },

  { id: 3217, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scenario: QLoRA Fine-Tuning', difficulty: 'hard', keywords: ['scenario', 'QLoRA', '4-bit', 'consumer GPU'],
    question: 'You want to fine-tune a 13B parameter model but only have a single consumer GPU with 24GB VRAM. A 13B FP16 model requires ~26GB. What technique enables fine-tuning on this hardware?',
    options: {
      A: 'Fine-tuning a 13B model on 24GB VRAM is impossible — get more hardware',
      B: 'QLoRA (Quantized LoRA): quantize the base model to 4-bit (reduces 13B model to ~7GB VRAM) + add LoRA adapters in FP16 (few GB) + optimizer states in FP32 (small adapters only). Total VRAM: ~10-12GB — fits comfortably on 24GB with room for batch data',
      C: 'Use gradient checkpointing alone to reduce memory requirements to fit 13B in 24GB',
      D: 'Quantize to INT8 first and then apply full fine-tuning'
    },
    answer: 'B',
    explanation: 'QLoRA breakthrough: 4-bit NF4 quantization reduces 13B FP16 (26GB) to ~7GB. LoRA adds trainable adapter layers in bfloat16 (< 1GB). Optimizer states only apply to adapter parameters (tiny). Total: ~10GB. Gradient checkpointing further reduces activation memory. QLoRA made 13B-70B fine-tuning accessible on consumer hardware, democratizing fine-tuning.' },

  { id: 3218, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scenario: Silent Degradation', difficulty: 'hard', keywords: ['scenario', 'silent', 'degradation', 'drift'],
    question: 'Your agent\'s BLEU score and user ratings are stable, but customers have started escalating to human support more frequently over the past month. What type of degradation is happening and how do you detect it?',
    options: {
      A: 'This is a customer behavior change, not an AI quality issue',
      B: 'Silent quality degradation: the agent is giving technically correct but unhelpful answers for a growing category of queries — not caught by BLEU (measures n-gram overlap, not usefulness) or overall ratings (diluted by many still-good responses). Investigate by clustering recent escalated cases to find the specific failure category',
      C: 'The customer support team changed their escalation policy',
      D: 'Increase the agent\'s response length to provide more complete answers'
    },
    answer: 'B',
    explanation: 'Aggregate metrics can mask category-specific degradation. If a specific query type (e.g., billing disputes) degrades but represents 15% of traffic, overall quality metrics only drop 15% × degradation_amount. Meanwhile, those users escalate at high rates. Fix: break down metrics by query category, monitor escalation rate per category independently, cluster escalation transcripts to find patterns.' },

  { id: 3219, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scenario: Constitutional AI in Practice', difficulty: 'hard', keywords: ['scenario', 'Constitutional AI', 'self-critique', 'revision'],
    question: 'You are building a customer service agent that sometimes gives responses that are technically correct but harsh or dismissive in tone. You cannot afford RLHF with human raters. What is a cost-effective alternative?',
    options: {
      A: 'Add "be polite" to the system prompt and hope for the best',
      B: 'Implement a Constitutional AI self-critique loop: after initial generation, prompt the model to critique its own response against principles ("Was this response empathetic? Could it be perceived as dismissive?") and generate a revised, improved version. No human labels required',
      C: 'Fine-tune on a generic politeness dataset from open-source data',
      D: 'Add a fixed post-processing step that appends "I hope this helps!" to all responses'
    },
    answer: 'B',
    explanation: 'CAI self-critique loop: Draft response → "Critique: Is this response empathetic and professional? Would a customer feel dismissed?" → model critiques ("The response is factually correct but sounds dismissive in sentence 2") → model revises → final response. No human labels needed. More principled than fixed appended text. Can be applied at inference time without retraining.' },

  { id: 3220, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Scenario: Benchmark Saturation', difficulty: 'medium', keywords: ['scenario', 'benchmark', 'saturation', 'ceiling'],
    question: 'Your model scores 95% on MMLU, your current internal eval benchmark, and your unit tests. Teams are arguing the model is "done." But users still report failures on complex reasoning tasks. What is happening?',
    options: {
      A: 'The model is done — 95% is excellent performance',
      B: 'Benchmark saturation: your evaluation suite is too easy and does not expose real-world complexity. Users are encountering out-of-distribution cases not in your benchmarks. Response: add harder evaluation sets, create task-specific evals from recent user failures, and implement continuous eval on production traffic samples',
      C: 'Users have incorrect expectations — 95% accuracy means 5% of queries will fail',
      D: 'The 5% failure cases are unsolvable with current AI technology'
    },
    answer: 'B',
    explanation: 'Benchmark saturation is a common trap: models improve until they saturate easy benchmarks, but real-world performance still lags. The ceiling of your eval set limits what failures you can detect. Solution: continuously harvest hard cases from production failures → add to eval set → maintain an eval set that stays ahead of model capability. Eval sets must evolve as models improve.' },
];
