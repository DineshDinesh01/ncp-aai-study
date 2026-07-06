import { Question } from '../types';

export const domain3Questions: Question[] = [
  { id: 3001, domain: 3, domainName: 'Evaluation & Tuning', topic: 'RAGAS', difficulty: 'medium', keywords: ['RAGAS', 'faithfulness', 'answer relevancy', 'RAG evaluation'],
    question: 'The RAGAS faithfulness metric measures:',
    options: { A: 'Whether the retrieved documents are from trusted sources', B: 'Whether the generated answer is factually consistent with the retrieved context', C: 'Whether the user found the answer helpful', D: 'Whether the retrieval step was fast enough' },
    answer: 'B', explanation: 'RAGAS faithfulness checks if all claims in the generated answer can be inferred from the retrieved context, detecting hallucinations in RAG systems.' },

  { id: 3002, domain: 3, domainName: 'Evaluation & Tuning', topic: 'LLM-as-Judge', difficulty: 'medium', keywords: ['LLM-as-judge', 'evaluation', 'automated', 'scoring'],
    question: 'LLM-as-judge evaluation involves:',
    options: { A: 'Using a judge to rule on LLM patent disputes', B: 'Using a capable LLM to score another model\'s outputs according to defined rubrics', C: 'Having legal judges evaluate AI outputs', D: 'Using the same LLM to both generate and evaluate with a single call' },
    answer: 'B', explanation: 'LLM-as-judge uses a strong LLM (like GPT-4 or Claude) as an automated evaluator, scoring responses on criteria like correctness, helpfulness, and safety.' },

  { id: 3003, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Fine-tuning vs Prompting', difficulty: 'medium', keywords: ['fine-tuning', 'prompting', 'PEFT', 'LoRA'],
    question: 'Fine-tuning is preferred over prompt engineering when:',
    options: { A: 'You want a quick prototype without much data', B: 'You need consistent style/format across many outputs and have sufficient labeled training data', C: 'The task changes frequently', D: 'You want to avoid any GPU usage' },
    answer: 'B', explanation: 'Fine-tuning bakes behavior into model weights — better for consistent tone/format, domain-specific knowledge, and tasks where prompts become unwieldy.' },

  { id: 3004, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Context Recall', difficulty: 'medium', keywords: ['context recall', 'RAGAS', 'retrieval quality'],
    question: 'RAGAS context recall measures:',
    options: { A: 'How fast the retrieval system returns results', B: 'What proportion of the ground truth answer can be attributed to the retrieved context', C: 'How many documents were retrieved in total', D: 'Whether the context is stored in RAM vs disk' },
    answer: 'B', explanation: 'Context recall checks if the retrieved context contains the information needed to answer correctly — high recall means the retriever found the right documents.' },

  { id: 3005, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Benchmark Datasets', difficulty: 'easy', keywords: ['benchmark', 'MMLU', 'HumanEval', 'evaluation'],
    question: 'HumanEval is a benchmark primarily designed to evaluate:',
    options: { A: 'Human performance on standardized tests', B: 'LLM ability to generate correct Python code solutions to programming problems', C: 'Emotional intelligence in AI systems', D: 'Model performance on medical diagnosis tasks' },
    answer: 'B', explanation: 'HumanEval contains 164 Python programming problems with test cases — models generate solutions that are evaluated by running the test suite.' },

  { id: 3006, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Hallucination Detection', difficulty: 'medium', keywords: ['hallucination', 'factuality', 'grounding', 'detection'],
    question: 'Which approach is most effective for detecting factual hallucinations in LLM outputs?',
    options: { A: 'Checking if the response is longer than 100 words', B: 'Cross-referencing claims in the output against reliable knowledge sources or retrieved evidence', C: 'Measuring perplexity of the generated text', D: 'Counting the number of tokens generated' },
    answer: 'B', explanation: 'Hallucination detection requires grounding — comparing claims in the output against verified facts, retrieved documents, or database records.' },

  { id: 3007, domain: 3, domainName: 'Evaluation & Tuning', topic: 'A/B Testing', difficulty: 'medium', keywords: ['A/B testing', 'comparison', 'statistical significance'],
    question: 'When running A/B tests between two agent versions, which consideration is most important?',
    options: { A: 'Always prefer the newer version regardless of metrics', B: 'Ensure statistical significance by testing on sufficient sample sizes with controlled variables', C: 'Run tests only on weekdays', D: 'Use the version with fewer parameters' },
    answer: 'B', explanation: 'A/B tests require enough samples to reach statistical significance, controlled conditions (same user distribution, time period), and clearly defined success metrics.' },

  { id: 3008, domain: 3, domainName: 'Evaluation & Tuning', topic: 'LoRA Fine-tuning', difficulty: 'hard', keywords: ['LoRA', 'PEFT', 'parameter efficient', 'rank'],
    question: 'LoRA (Low-Rank Adaptation) reduces fine-tuning costs by:',
    options: { A: 'Using a smaller dataset for training', B: 'Training only low-rank decomposition matrices added to frozen base model weights, not the full model', C: 'Reducing the model\'s inference precision to INT4', D: 'Removing transformer layers from the model' },
    answer: 'B', explanation: 'LoRA inserts trainable low-rank matrices (rank r << d) alongside frozen base weights. Only these small matrices are trained, reducing memory and compute by orders of magnitude.' },

  { id: 3009, domain: 3, domainName: 'Evaluation & Tuning', topic: 'RLHF', difficulty: 'hard', keywords: ['RLHF', 'reward model', 'PPO', 'human feedback'],
    question: 'In RLHF (Reinforcement Learning from Human Feedback), the reward model is trained to:',
    options: { A: 'Generate new text responses', B: 'Predict which of two model responses a human would prefer, providing a learned reward signal', C: 'Manage the GPU\'s reward circuitry', D: 'Automatically label training data' },
    answer: 'B', explanation: 'The RLHF reward model learns to predict human preferences from comparison data (which response is better), then guides policy model training via PPO to maximize this learned reward.' },

  { id: 3010, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Evaluation Metrics', difficulty: 'medium', keywords: ['BLEU', 'ROUGE', 'BERTScore', 'NLG metrics'],
    question: 'BERTScore improves on BLEU/ROUGE for text generation evaluation because:',
    options: { A: 'It is faster to compute', B: 'It uses contextual embeddings to measure semantic similarity rather than n-gram overlap', C: 'It was developed by a larger research team', D: 'It only evaluates grammar correctness' },
    answer: 'B', explanation: 'BERTScore computes similarity using contextual embeddings from BERT, capturing semantic equivalence that BLEU/ROUGE miss due to their surface-form n-gram matching.' },

  { id: 3011, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Evaluation Pipeline', difficulty: 'medium', keywords: ['evaluation pipeline', 'automated', 'regression', 'CI/CD'],
    question: 'Integrating agent evaluation into CI/CD pipelines provides which benefit?',
    options: { A: 'Automatically deploys the best model to production', B: 'Catches quality regressions automatically before every deployment', C: 'Reduces the need for monitoring in production', D: 'Eliminates the need for human evaluation entirely' },
    answer: 'B', explanation: 'Automated evaluation in CI/CD runs quality checks on every code change, preventing regressions in agent behavior from reaching production.' },

  { id: 3012, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Human Evaluation', difficulty: 'medium', keywords: ['human evaluation', 'annotation', 'inter-annotator agreement'],
    question: 'Inter-annotator agreement (IAA) in human evaluation measures:',
    options: { A: 'The speed at which human annotators complete tasks', B: 'The consistency of judgments across different human evaluators for the same items', C: 'The total cost of running human evaluations', D: 'Whether annotators followed the annotation guidelines' },
    answer: 'B', explanation: 'IAA metrics (Cohen\'s kappa, Krippendorff\'s alpha) quantify how consistently different annotators rate the same outputs, validating evaluation quality and identifying ambiguous criteria.' },

  { id: 3013, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Context Precision', difficulty: 'medium', keywords: ['context precision', 'RAGAS', 'signal-to-noise'],
    question: 'RAGAS context precision measures:',
    options: { A: 'The pixel precision of document screenshots', B: 'What proportion of retrieved context is actually relevant to answering the question', C: 'The precision of floating-point numbers in embeddings', D: 'How precisely the query matched document titles' },
    answer: 'B', explanation: 'Context precision penalizes retrieval of irrelevant documents — high precision means most retrieved chunks contain useful information, reducing noise in the prompt.' },

  { id: 3014, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Answer Relevancy', difficulty: 'easy', keywords: ['answer relevancy', 'RAGAS', 'on-topic'],
    question: 'RAGAS answer relevancy measures:',
    options: { A: 'Whether the answer is grammatically correct', B: 'How well the generated answer addresses the actual question asked', C: 'Whether the answer length is appropriate', D: 'The speed of answer generation' },
    answer: 'B', explanation: 'Answer relevancy scores how directly the generated response addresses the user\'s question — detecting generic, off-topic, or incomplete answers.' },

  { id: 3015, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Evaluation Dataset', difficulty: 'medium', keywords: ['evaluation dataset', 'golden set', 'ground truth', 'QA pairs'],
    question: 'A "golden evaluation dataset" for agent testing should contain:',
    options: { A: 'Only easy test cases the agent handles perfectly', B: 'Diverse, representative input-output pairs with verified ground truth answers covering edge cases', C: 'Random samples from training data', D: 'Only multi-choice questions' },
    answer: 'B', explanation: 'Golden datasets need diversity (easy to hard, common to edge cases), coverage of the task distribution, and verified correct answers to give meaningful quality signal.' },

  { id: 3016, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Fine-tuning Data', difficulty: 'medium', keywords: ['fine-tuning data', 'data quality', 'GIGO', 'dataset'],
    question: 'The most critical factor for successful LLM fine-tuning is:',
    options: { A: 'Using the maximum possible number of training examples', B: 'High quality, diverse, and correctly labeled training data aligned with the target task', C: 'Training for the maximum number of epochs', D: 'Using the same data for training and evaluation' },
    answer: 'B', explanation: 'Data quality dominates fine-tuning success. GIGO (garbage in, garbage out) — noisy, mislabeled, or unrepresentative data produces unreliable models even with perfect training code.' },

  { id: 3017, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Overfitting', difficulty: 'medium', keywords: ['overfitting', 'catastrophic forgetting', 'regularization'],
    question: 'Catastrophic forgetting in fine-tuned LLMs refers to:',
    options: { A: 'The model generating offensive content', B: 'The model losing general capabilities as it over-adapts to the fine-tuning task', C: 'GPU memory overflow during training', D: 'The model forgetting user names between sessions' },
    answer: 'B', explanation: 'Catastrophic forgetting occurs when fine-tuning on a narrow task degrades the model\'s general capabilities — mitigated by PEFT methods (LoRA) that freeze most base weights.' },

  { id: 3018, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Prompt Optimization', difficulty: 'medium', keywords: ['prompt optimization', 'DSPy', 'automated', 'APE'],
    question: 'DSPy (Declarative Self-improving Python) enables:',
    options: { A: 'Automatic GPU driver installation', B: 'Programmatic optimization of LLM prompts and few-shot examples to maximize a defined metric', C: 'Dynamic Python class generation', D: 'Distributed SQL query processing' },
    answer: 'B', explanation: 'DSPy treats prompts as learnable parameters, automatically optimizing instructions and few-shot examples to maximize a metric, removing manual prompt engineering.' },

  { id: 3019, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Regression Testing', difficulty: 'medium', keywords: ['regression', 'baseline', 'version comparison'],
    question: 'Agent regression testing ensures:',
    options: { A: 'The agent\'s responses get shorter over time', B: 'New model/prompt versions do not degrade performance on previously passing test cases', C: 'The agent regresses to an earlier training state', D: 'CPU usage decreases with each new version' },
    answer: 'B', explanation: 'Regression tests run the same benchmark on old vs new versions, catching cases where improvements to one capability break another.' },

  { id: 3020, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Alignment', difficulty: 'hard', keywords: ['alignment', 'helpfulness', 'harmlessness', 'honesty'],
    question: 'The Anthropic alignment objectives (HHH) stand for:',
    options: { A: 'High-performance, High-precision, High-recall', B: 'Helpful, Harmless, Honest', C: 'Human, Hardware, Hybrid', D: 'Holistic, Hierarchical, Heterogeneous' },
    answer: 'B', explanation: 'Anthropic\'s Constitutional AI targets three alignment objectives: Helpful (genuinely useful), Harmless (doesn\'t cause harm), Honest (accurate, calibrated, non-deceptive).' },

  { id: 3021, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Prompt Sensitivity', difficulty: 'medium', keywords: ['prompt sensitivity', 'robustness', 'variation'],
    question: 'Testing an agent\'s prompt sensitivity involves:',
    options: { A: 'Measuring how sensitive the GPU is to temperature changes', B: 'Evaluating whether small prompt variations cause large, unexpected changes in agent behavior', C: 'Testing how quickly the agent responds to prompts', D: 'Checking if the prompt passes content filters' },
    answer: 'B', explanation: 'Robust agents should handle paraphrased, reordered, or slightly modified inputs consistently. High prompt sensitivity indicates brittle behavior that fails in production.' },

  { id: 3022, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Safety Evaluation', difficulty: 'medium', keywords: ['red-teaming', 'adversarial', 'safety testing'],
    question: 'Red-teaming in AI agent evaluation involves:',
    options: { A: 'Using a red LED to illuminate the server rack', B: 'Adversarially probing the agent to find failure modes, jailbreaks, and safety violations', C: 'Evaluating the agent on red-colored test inputs', D: 'Testing the agent\'s performance with GPU cooling issues' },
    answer: 'B', explanation: 'Red-teaming employs adversarial testing — deliberately crafting inputs to break safety guardrails, elicit harmful content, or expose unexpected failure modes.' },

  { id: 3023, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Task Decomposition Quality', difficulty: 'medium', keywords: ['task decomposition', 'plan quality', 'subtask'],
    question: 'When evaluating an agent\'s planning quality, the most important metric is:',
    options: { A: 'The number of subtasks generated', B: 'Whether the decomposed plan correctly achieves the goal when executed', C: 'The length of the plan in words', D: 'Whether the plan uses parallel execution' },
    answer: 'B', explanation: 'Plan quality is ultimately measured by goal achievement — does executing the plan successfully accomplish the user\'s objective? Metrics like goal completion rate capture this.' },

  { id: 3024, domain: 3, domainName: 'Evaluation & Tuning', topic: 'MMLU Benchmark', difficulty: 'easy', keywords: ['MMLU', 'benchmark', 'knowledge', 'academic'],
    question: 'MMLU (Massive Multitask Language Understanding) evaluates:',
    options: { A: 'Model speed on multi-GPU clusters', B: 'LLM knowledge across 57 academic subjects from elementary to professional level', C: 'The model\'s ability to learn new languages', D: 'Multi-modal understanding of images and text' },
    answer: 'B', explanation: 'MMLU tests LLM factual knowledge across 57 subjects (STEM, humanities, social sciences, etc.) from elementary through professional level using multiple-choice questions.' },

  { id: 3025, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Calibration', difficulty: 'hard', keywords: ['calibration', 'confidence', 'uncertainty', 'ECE'],
    question: 'A well-calibrated LLM agent means:',
    options: { A: 'The model parameters are set to precise values', B: 'The model\'s expressed confidence levels accurately reflect actual accuracy rates', C: 'The inference hardware is properly calibrated', D: 'The training learning rate was correctly chosen' },
    answer: 'B', explanation: 'Calibration means when the model says it\'s 80% confident, it should be correct ~80% of the time. Miscalibration — overconfident wrong answers — is a major safety issue.' },

  { id: 3026, domain: 3, domainName: 'Evaluation & Tuning', topic: 'QLoRA', difficulty: 'hard', keywords: ['QLoRA', 'quantization', 'NF4', 'memory efficient'],
    question: 'QLoRA combines quantization with LoRA to achieve:',
    options: { A: 'Faster query processing in SQL databases', B: 'Fine-tuning of very large models on limited GPU memory by using 4-bit quantization for base weights', C: 'Query-level optimization in RAG pipelines', D: 'Queue-based load balancing for model serving' },
    answer: 'B', explanation: 'QLoRA stores base model weights in 4-bit NF4 format (reducing memory ~8x) while keeping LoRA adapters in float16, enabling 70B+ model fine-tuning on consumer GPUs.' },

  { id: 3027, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Instruction Tuning', difficulty: 'medium', keywords: ['instruction tuning', 'FLAN', 'IFT', 'instruction following'],
    question: 'Instruction fine-tuning (IFT) trains models to:',
    options: { A: 'Follow CPU instruction sets more efficiently', B: 'Follow natural language instructions for a wide variety of tasks, improving zero-shot generalization', C: 'Tune hyperparameters automatically', D: 'Tune hardware performance' },
    answer: 'B', explanation: 'IFT trains models on diverse (instruction, response) pairs, teaching them to follow instructions across many task types — the technique behind InstructGPT and FLAN.' },

  { id: 3028, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Constitutional AI', difficulty: 'hard', keywords: ['constitutional AI', 'CAI', 'principles', 'Anthropic'],
    question: 'Constitutional AI (CAI) from Anthropic trains safe models by:',
    options: { A: 'Having constitutional lawyers review all outputs', B: 'Using a set of principles to guide the model to critique and revise its own outputs for safety', C: 'Encoding the US Constitution into model weights', D: 'Requiring constitutional approval for each generation' },
    answer: 'B', explanation: 'CAI uses AI feedback (AIAIF) — the model critiques outputs against a written constitution of principles, then revises them, reducing reliance on human annotators for safety.' },

  { id: 3029, domain: 3, domainName: 'Evaluation & Tuning', topic: 'Evaluation Cost', difficulty: 'medium', keywords: ['evaluation cost', 'budget', 'tradeoff', 'sampling'],
    question: 'To reduce evaluation costs while maintaining statistical validity, which approach is recommended?',
    options: { A: 'Evaluate on the full dataset every time', B: 'Use stratified sampling to select a representative subset that covers task diversity efficiently', C: 'Only evaluate on the easiest test cases', D: 'Evaluate once per year maximum' },
    answer: 'B', explanation: 'Stratified sampling ensures the evaluation subset represents the full task distribution (domains, difficulty levels), providing valid signal at a fraction of the full evaluation cost.' },

  { id: 3030, domain: 3, domainName: 'Evaluation & Tuning', topic: 'PEFT Methods', difficulty: 'medium', keywords: ['PEFT', 'adapters', 'prefix tuning', 'prompt tuning'],
    question: 'Which PEFT methods avoid modifying base model weights? (Choose two)',
    options: { A: 'Prefix tuning (learnable prefix tokens prepended to each layer)', B: 'Full fine-tuning of all parameters', C: 'Prompt tuning (soft prompt tokens in the input embedding)', D: 'Retraining from scratch on task data' },
    answer: 'AC', explanation: 'Prefix tuning (layer-wise learnable prefixes) and prompt tuning (input embedding soft prompts) add no parameters to the base model and require much less compute than full fine-tuning.' },
];
