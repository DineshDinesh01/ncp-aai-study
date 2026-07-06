import { Question } from '../types';

export const domain1sc2Questions: Question[] = [
  { id: 1211, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Scenario: Orchestrator Design', difficulty: 'hard', keywords: ['scenario', 'orchestrator', 'failure', 'subtask'],
    question: 'You are designing a multi-agent pipeline where an orchestrator dispatches tasks to 4 specialist agents. One specialist agent (the data-fetcher) has 95% uptime. When it is down, the entire pipeline fails. How do you redesign for resilience?',
    options: {
      A: 'Increase the data-fetcher uptime to 99.9% by upgrading its infrastructure',
      B: 'Make the orchestrator aware of agent health — route to a backup data-fetcher when the primary is down, implement graceful degradation (proceed with cached data if fresh fetch fails), and never let one specialist\'s failure block the entire pipeline',
      C: 'Add a retry loop — retry the data-fetcher 10 times before giving up',
      D: 'Move data-fetching logic directly into the orchestrator to eliminate the dependency'
    },
    answer: 'B',
    explanation: 'Single-specialist bottleneck: the orchestrator must handle specialist unavailability gracefully. Pattern: health-check specialists before dispatch → route to healthy backup → if no backup, proceed with degraded data (cache/approximate) rather than full failure. Retries alone (Option C) block the pipeline during the retry window.' },

  { id: 1212, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Scenario: Event-Driven Architecture', difficulty: 'hard', keywords: ['scenario', 'event', 'async', 'queue'],
    question: 'Your synchronous agent API takes 120 seconds for complex tasks. Users timeout after 30 seconds, leaving tasks half-done in the background. What architectural change do you need?',
    options: {
      A: 'Increase the HTTP timeout to 120 seconds on the client side',
      B: 'Adopt an async task pattern: API call returns a task_id immediately (< 1s), agent processes asynchronously in the background, client polls GET /tasks/{id}/status or receives a webhook callback when complete',
      C: 'Optimize the agent to complete all tasks within 30 seconds',
      D: 'Split the task into 4 sequential 30-second API calls that chain together'
    },
    answer: 'B',
    explanation: 'Long-running agent tasks require async patterns. Synchronous HTTP is wrong for 120-second operations. Async: POST /agent/run → {task_id: "abc123", status: "queued"} → client polls GET /tasks/abc123 → eventually {status: "complete", result: {...}}. Or webhook: agent calls back when done. This is the standard pattern for background AI jobs.' },

  { id: 1213, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Scenario: Agent Versioning', difficulty: 'medium', keywords: ['scenario', 'versioning', 'A/B', 'rollout'],
    question: 'You want to test a new agent prompt version (v2) against the current production version (v1) without disrupting users. How do you do this safely?',
    options: {
      A: 'Deploy v2 to all users for a week, then revert if metrics drop',
      B: 'Shadow test: run v2 alongside v1 on the same traffic, compare outputs offline without users seeing v2 responses. Then canary: route 5% of users to v2, monitor quality metrics for 48 hours, gradually increase to 100% if metrics hold',
      C: 'Ask volunteer users to try v2 and give feedback',
      D: 'Run v2 only on synthetic test cases, never on real user traffic'
    },
    answer: 'B',
    explanation: 'Safe agent versioning: shadow testing first (zero user risk, side-by-side comparison at scale) → canary at 5% (real users, limited blast radius) → progressive rollout with quality gates. This catches regressions that synthetic tests miss (real user query distribution always differs from test sets) while limiting exposure.' },

  { id: 1214, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Scenario: Data Isolation', difficulty: 'hard', keywords: ['scenario', 'multi-tenant', 'isolation', 'data leakage'],
    question: 'Your multi-tenant AI platform serves 50 enterprise customers. During testing, you discover that Agent A (serving Company X) occasionally retrieves documents from Company Y\'s knowledge base. What is the root cause and fix?',
    options: {
      A: 'The vector database is corrupted — rebuild it from scratch',
      B: 'Missing tenant isolation in retrieval: the vector database query does not filter by tenant_id. Fix: add mandatory metadata filter to every retrieval query (WHERE tenant_id = current_tenant) and add integration tests that verify cross-tenant retrieval returns zero results',
      C: 'Encrypt each company\'s data with a different key to prevent cross-reading',
      D: 'Give each company a completely separate agent deployment'
    },
    answer: 'B',
    explanation: 'Multi-tenant vector DB isolation: every embedded document must be tagged with tenant_id metadata, and every retrieval query must filter by the calling tenant\'s ID. A missing WHERE clause in a retrieval function causes the leak. Encryption (Option C) prevents external attackers but not internal application logic bugs. Separate deployments (Option D) solve it but are operationally expensive.' },

  { id: 1215, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Scenario: Tool Dependency', difficulty: 'medium', keywords: ['scenario', 'dependency', 'tool', 'third-party'],
    question: 'Your agent depends on a third-party geocoding API (converts addresses to coordinates). This API goes down 2-3 times per month for 1-2 hours. What architecture reduces the blast radius of these outages?',
    options: {
      A: 'SLA-penalize the vendor for every outage',
      B: 'Implement a caching layer (Redis with 24-hour TTL) for previously geocoded addresses, add a secondary fallback geocoding provider, and design the agent workflow to proceed with approximate location data if geocoding fails',
      C: 'Only call the geocoding API once per day in a batch job',
      D: 'Remove the geocoding feature entirely to eliminate the dependency'
    },
    answer: 'B',
    explanation: 'Third-party API resilience: cache (most addresses are re-requested), fallback provider (multi-vendor for critical dependencies), and graceful degradation (proceed without exact coordinates if needed). Addresses rarely change, making caching highly effective. Multi-vendor is the industry standard for critical infrastructure dependencies.' },

  { id: 1216, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Scenario: Monolith vs Microservices', difficulty: 'medium', keywords: ['scenario', 'architecture', 'monolith', 'microservices'],
    question: 'You are starting a new AI agent project with 3 engineers. A senior architect wants to immediately build 12 microservices. A junior engineer suggests a modular monolith first. Who is right and why?',
    options: {
      A: 'The architect is right — microservices are always the correct approach for production AI',
      B: 'The junior engineer is right for this stage. A modular monolith with 3 engineers lets you move fast, refactor easily, and discover the right service boundaries. Microservices add deployment complexity that slows small teams. Extract services only when scale or team growth requires it',
      C: 'Both approaches are equivalent — choose based on personal preference',
      D: 'Start with microservices because refactoring a monolith later is impossible'
    },
    answer: 'B',
    explanation: '"Majestic monolith" principle: at 3 engineers, microservices overhead (12 deployments, network calls, distributed tracing, service discovery) slows you down more than the benefits justify. Build modular (clear internal boundaries) but deployed as one unit. Extract microservices when you hit scaling limits or team grows to 15+. Martin Fowler: "Don\'t start with microservices."' },

  { id: 1217, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Scenario: Context Injection', difficulty: 'hard', keywords: ['scenario', 'context', 'system prompt', 'injection'],
    question: 'Your customer service agent needs to know the customer\'s account tier, recent purchases, and open tickets at the start of every conversation. These are retrieved from 3 different APIs. Currently, this takes 3 sequential API calls totaling 1.5 seconds. How do you reduce this?',
    options: {
      A: 'Cache all customer data for 24 hours to eliminate API calls',
      B: 'Parallelize all 3 API calls concurrently — they are independent and can execute simultaneously, reducing 1.5 seconds to ~0.5 seconds (the slowest single call). Pre-fetch when the session starts before the user sends their first message',
      C: 'Reduce to only fetching the most important data (account tier only)',
      D: 'Move context fetching to the second agent turn to avoid blocking the first response'
    },
    answer: 'B',
    explanation: 'Independent API calls should always run in parallel. 3 sequential 500ms calls = 1.5s. 3 parallel 500ms calls = 500ms. Additionally, pre-fetching when the user connects (before they type) moves the wait off the critical path. Combined: customer connects → immediately fire 3 parallel fetches → user types their first message → context is already ready.' },

  { id: 1218, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Scenario: Agent Specialization', difficulty: 'medium', keywords: ['scenario', 'specialization', 'routing', 'expert'],
    question: 'You have one large general-purpose agent handling all queries. It handles HR questions, IT support, and legal queries. Performance is inconsistent — it excels at HR but struggles with technical IT questions. What architecture change improves this?',
    options: {
      A: 'Fine-tune the general agent on all three domains simultaneously',
      B: 'Introduce specialist agents: HR-agent (fine-tuned on HR data + HR tools), IT-agent (fine-tuned on technical docs + diagnostic tools), Legal-agent (fine-tuned on legal docs). Route queries from a lightweight orchestrator. Each specialist outperforms a generalist in its domain',
      C: 'Add more IT examples to the general agent\'s system prompt',
      D: 'Use a larger base model for the general agent'
    },
    answer: 'B',
    explanation: 'Specialist agents outperform generalists for domain-specific tasks. A general agent\'s system prompt cannot deeply encode the depth of IT diagnostic knowledge that a specialist fine-tuned on 10,000 IT support tickets can. The routing overhead is minimal (< 100ms LLM classification) vs the quality gains. This is the standard enterprise multi-agent architecture.' },

  { id: 1219, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Scenario: Human Approval Gate', difficulty: 'hard', keywords: ['scenario', 'approval', 'irreversible', 'human-in-the-loop'],
    question: 'Your AI agent can: (A) search the web, (B) draft emails, (C) send emails to customers, (D) issue refunds up to $500. Which actions should require human approval before execution?',
    options: {
      A: 'All actions should require approval to be safe',
      B: 'Reversible/low-risk actions (A: search, B: draft) can be autonomous. Irreversible/high-impact actions (C: send email, D: issue refund) require human approval — the cost of a wrong action (sent email, wrong refund) far exceeds the cost of a human review step',
      C: 'Only refunds over $100 require approval — emails are low risk',
      D: 'None — humans in the loop defeat the purpose of an AI agent'
    },
    answer: 'B',
    explanation: 'Risk-based autonomy: categorize actions by reversibility and impact. Web search (no side effects, fully reversible), email draft (review before sending, reversible). Send email (cannot un-send to 1,000 customers), issue refund (financial impact) → human gate required. The principle: autonomy where it\'s safe, oversight where the blast radius is high.' },

  { id: 1220, domain: 1, domainName: 'Agent Architecture & Design', topic: 'Scenario: MCP Integration', difficulty: 'hard', keywords: ['scenario', 'MCP', 'protocol', 'tool server'],
    question: 'You want your AI agent to access 8 different internal company tools (HR system, CRM, ticketing system, etc.) each maintained by different teams. Each team uses a different API format. How does the Model Context Protocol (MCP) help?',
    options: {
      A: 'MCP is a messaging queue system that routes tool calls to the right team',
      B: 'MCP provides a standardized server/client protocol: each team wraps their tool as an MCP server with a consistent interface. Your agent is an MCP client that connects to any MCP server the same way — eliminating custom integration code per tool',
      C: 'MCP encrypts all tool communications for security',
      D: 'MCP is only for connecting to external cloud services, not internal tools'
    },
    answer: 'B',
    explanation: 'MCP standardizes the agent-tool interface: instead of custom code for each of 8 APIs (8 different auth methods, 8 different request formats, 8 different error formats), each tool team wraps their API as an MCP server. The agent connects to all 8 via the same protocol. Adding tool 9: implement MCP server, connect — no agent code changes required.' },
];
