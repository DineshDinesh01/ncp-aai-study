import { Question } from '../types';

export const domain2sc2Questions: Question[] = [
  { id: 2211, domain: 2, domainName: 'Agent Development', topic: 'Scenario: Output Validation', difficulty: 'hard', keywords: ['scenario', 'output', 'validation', 'structured'],
    question: 'Your agent generates JSON output for downstream systems but occasionally produces malformed JSON (missing brackets, trailing commas). This crashes the downstream pipeline 5% of the time. What is the right development fix?',
    options: {
      A: 'Add "always output valid JSON" to the system prompt',
      B: 'Use structured output / JSON mode (forcing the LLM to produce schema-compliant JSON via constrained decoding), add a JSON parser validation step before passing to downstream, and implement a retry with correction prompt on parse failure',
      C: 'Wrap the downstream pipeline in a try-catch to handle bad JSON',
      D: 'Post-process the output with regex to fix common JSON errors'
    },
    answer: 'B',
    explanation: 'Defense-in-depth for structured output: (1) Constrained decoding (JSON mode) prevents most malformed output at generation time. (2) Downstream validation catches edge cases. (3) Self-correction retry: on parse failure, re-prompt "Your previous output was not valid JSON. Please output only valid JSON." Error handling in downstream (Option C) masks the problem rather than fixing it.' },

  { id: 2212, domain: 2, domainName: 'Agent Development', topic: 'Scenario: Idempotency Bug', difficulty: 'hard', keywords: ['scenario', 'idempotency', 'duplicate', 'tool call'],
    question: 'Your agent books calendar events for users. Due to a network timeout, the agent retries a booking request and the user ends up with 2 duplicate meeting invites for the same event. What development pattern would have prevented this?',
    options: {
      A: 'Add a 5-second delay between retries to reduce duplicates',
      B: 'Generate an idempotency key before the first call (e.g., hash of event details + user_id + date). Pass this key to the calendar API. On retry, the API checks if this key was already processed and returns the existing event instead of creating a duplicate',
      C: 'Query the calendar for existing events before each new booking',
      D: 'Never retry failed calendar API calls — fail-fast instead'
    },
    answer: 'B',
    explanation: 'Idempotency keys are the correct solution for exactly-once semantics in distributed systems. The key uniquely identifies the intent: "create this specific meeting for this user." Retries are safe because the server recognizes the key and returns the previous result. Option C (check before create) has a race condition — two retries can both check, see no event, and both create.' },

  { id: 2213, domain: 2, domainName: 'Agent Development', topic: 'Scenario: Prompt Versioning', difficulty: 'medium', keywords: ['scenario', 'prompt', 'version control', 'regression'],
    question: 'A developer edits the system prompt to improve one user scenario. When deployed, it breaks 3 other previously working scenarios. There is no record of what changed. What development practice was missing?',
    options: {
      A: 'Prompts are too simple to need version control',
      B: 'Prompts must be version-controlled (Git), and any prompt change must trigger the full evaluation suite before deployment. The regression shows the eval suite was also missing. Treat prompts as code: PR review, automated testing, staged rollout',
      C: 'Use a separate prompt for each user scenario to prevent cross-contamination',
      D: 'Only change prompts during scheduled maintenance windows'
    },
    answer: 'B',
    explanation: 'Prompts are code. Best practices: store in version control (Git), use a prompt management system (LangSmith, PromptLayer), run eval suite on every change (CI gate), require PR approval for prompt changes. Without this, prompt edits become the most common source of silent quality regressions in production AI systems.' },

  { id: 2214, domain: 2, domainName: 'Agent Development', topic: 'Scenario: Async Tool Execution', difficulty: 'hard', keywords: ['scenario', 'async', 'tool', 'long-running'],
    question: 'Your agent calls a report-generation tool that takes 3 minutes to complete. The agent waits synchronously, blocking the thread and the user sees nothing for 3 minutes. How should long-running tools be handled?',
    options: {
      A: 'Set the tool timeout to 5 minutes so it can complete',
      B: 'Implement async tool calls: tool returns a job_id immediately, agent sends status updates to the user ("Your report is generating, ~3 minutes remaining"), agent polls or receives a callback when complete, then continues the conversation with the result',
      C: 'Break report generation into many small tools each completing in 10 seconds',
      D: 'Run the report generation in a background thread without informing the user'
    },
    answer: 'B',
    explanation: 'Long-running tool async pattern: tool.start() → {job_id} → agent: "Your report is being generated, I\'ll let you know when it\'s ready" → tool.poll(job_id) → "Report complete!" → present results. This keeps the user informed (reducing perceived wait), avoids thread blocking, and enables concurrent work on other tasks while waiting.' },

  { id: 2215, domain: 2, domainName: 'Agent Development', topic: 'Scenario: SDK Selection', difficulty: 'medium', keywords: ['scenario', 'framework', 'LangChain', 'selection'],
    question: 'Your team is debating between using LangChain, LlamaIndex, or building from scratch for a RAG agent. You need production deployment in 6 weeks with a 3-person team. What is the right choice?',
    options: {
      A: 'Always build from scratch for full control in production',
      B: 'Use an established framework (LangChain or LlamaIndex). They provide RAG components (chunking, embedding, retrieval, memory, tool calling) out-of-the-box. 6 weeks and 3 people is tight — spending time on infrastructure instead of product logic is the wrong tradeoff. Migrate off if framework limitations become real blockers',
      C: 'LangChain and LlamaIndex are only for prototypes — never production',
      D: 'Use all three simultaneously for maximum flexibility'
    },
    answer: 'B',
    explanation: 'Framework vs scratch decision: with time pressure, frameworks accelerate development dramatically (days not weeks for RAG pipeline). Many production AI systems run on LangChain or LlamaIndex. Build from scratch when: you have specific performance requirements the framework can\'t meet, or the framework adds complexity you don\'t need. For a RAG agent in 6 weeks, framework is the right call.' },

  { id: 2216, domain: 2, domainName: 'Agent Development', topic: 'Scenario: Chain-of-Thought Debugging', difficulty: 'hard', keywords: ['scenario', 'chain-of-thought', 'wrong reasoning', 'debug'],
    question: 'Your agent shows its reasoning (chain-of-thought) but the reasoning steps are correct while the final answer is wrong. Example: "Step 1: X is true. Step 2: Y implies Z. Step 3: Therefore the answer is [wrong answer]." What is happening?',
    options: {
      A: 'The model is lying in its reasoning — chain-of-thought is not trustworthy',
      B: 'The final answer generation step is not conditioned on the reasoning — the model is generating both the reasoning and the answer somewhat independently. Fix: prompt the model to explicitly state "Based on the steps above, my final answer is..." and validate that the answer logically follows from the stated reasoning',
      C: 'Use a different model — this one has a reasoning bug',
      D: 'Remove chain-of-thought to prevent the reasoning from interfering'
    },
    answer: 'B',
    explanation: 'CoT and answer disconnection is a known failure mode — reasoning steps can be correct while the answer generation doesn\'t fully utilize them. Fix: explicit grounding ("therefore the answer must be..."), or have a separate verification step that checks the answer against the reasoning. Alternatively, use structured output where the answer field is always filled last after the reasoning fields.' },

  { id: 2217, domain: 2, domainName: 'Agent Development', topic: 'Scenario: Fallback LLM', difficulty: 'medium', keywords: ['scenario', 'fallback', 'model', 'provider'],
    question: 'Your primary LLM provider has a regional outage 2-3 times per quarter affecting your production agent for 1-2 hours each time. Your SLA requires 99.5% uptime. How do you architect for this?',
    options: {
      A: 'Accept the outages — 2-3 hours per quarter is within the 99.5% SLA',
      B: 'Implement a multi-provider failover: primary (e.g., Anthropic) → secondary (e.g., OpenAI or Azure OpenAI) → tertiary (e.g., local NIM). Detect primary failure via health check, automatically reroute to secondary within 30 seconds. The prompt may need minor adjustments per provider',
      C: 'Deploy your own local LLM to eliminate provider dependency',
      D: 'Negotiate a better SLA with your LLM provider'
    },
    answer: 'B',
    explanation: '2-3 outages × 1.5h avg = 3-4.5 hours downtime per quarter. That\'s 98.3-98.7% uptime — well below 99.5% SLA. Multi-provider failover is the standard solution: route to secondary provider on primary failure. Key engineering challenge: normalize prompts across providers (different system prompt formats, context window sizes, API schemas). Worth the effort for high-availability requirements.' },

  { id: 2218, domain: 2, domainName: 'Agent Development', topic: 'Scenario: Structured Logging', difficulty: 'medium', keywords: ['scenario', 'logging', 'debug', 'observability'],
    question: 'After a production incident, your team spends 4 hours searching through unstructured log lines to reconstruct what the agent did. Logs look like: "2024-01-15 Agent processed request. Tool called. Done." What logging practice would have reduced investigation time?',
    options: {
      A: 'Log every token generated for maximum detail',
      B: 'Structured JSON logging with consistent fields: {timestamp, trace_id, user_id, event_type, tool_name, tool_args_hash, tool_result_summary, latency_ms, tokens_used}. Each agent turn creates a trace you can query: WHERE trace_id=\'abc123\' ORDER BY timestamp',
      C: 'Use a centralized logging service like Datadog — it automatically structures logs',
      D: 'Add more descriptive text to each log line'
    },
    answer: 'B',
    explanation: 'Structured logging enables log analytics. {trace_id} links all events for one request. {event_type: "tool_call", tool_name: "search_crm", latency_ms: 450} is queryable — "find all requests where search_crm took > 1000ms." Unstructured text requires grep/parsing. Centralized services (Option C) help with storage but you must first emit structured logs from your code.' },

  { id: 2219, domain: 2, domainName: 'Agent Development', topic: 'Scenario: Sensitive Data in Prompts', difficulty: 'hard', keywords: ['scenario', 'sensitive', 'API key', 'secret'],
    question: 'A developer accidentally included a customer\'s API key in an agent prompt while debugging and committed the log to the git repository. The log also got sent to your logging service. What is the immediate response?',
    options: {
      A: 'Delete the commit from git history and the log entry — this resolves it',
      B: 'Immediately rotate/revoke the exposed API key (assume it is compromised), notify the affected customer, remove from git history (git filter-branch or BFG), scrub from logging service, and implement preventive controls: secret scanning in CI, log sanitization for known secret patterns',
      C: 'Monitor for unauthorized usage of the key for 30 days before rotating',
      D: 'The key is only at risk if attackers see the git history — make the repo private'
    },
    answer: 'B',
    explanation: 'Secret exposure response: assume compromised, rotate immediately. Git history deletion does not un-expose what was already cloned or indexed. Customer notification is a legal and trust obligation. Prevention: pre-commit hooks with truffleHog/GitGuardian scan for secrets, log scrubbing middleware that detects and masks patterns matching API key formats before logs are written.' },

  { id: 2220, domain: 2, domainName: 'Agent Development', topic: 'Scenario: Test Coverage', difficulty: 'medium', keywords: ['scenario', 'test', 'coverage', 'edge case'],
    question: 'Your agent test suite has 50 tests covering happy-path scenarios and all pass. In production, failures cluster around: empty inputs, very long inputs, inputs in languages other than English, and inputs containing special characters. What does this reveal about your test strategy?',
    options: {
      A: 'Your agent has a bug — fix the edge cases individually as they appear',
      B: 'Your test suite only covers happy-path cases. A robust test strategy requires: boundary tests (empty, max-length, single character), language diversity tests, special character tests, adversarial inputs, and tests derived from actual production failures. Create a regression test for every production bug found',
      C: 'Increase the total number of happy-path tests to improve coverage',
      D: 'Edge cases are rare enough to ignore until users complain'
    },
    answer: 'B',
    explanation: 'Happy-path-only testing is a classic gap. In production, users do everything developers don\'t anticipate. Systematic test categories: boundary conditions, internationalization (i18n), encoding edge cases, adversarial inputs. Most importantly: every production failure becomes a regression test — this is how test suites evolve to match real-world usage patterns.' },
];
