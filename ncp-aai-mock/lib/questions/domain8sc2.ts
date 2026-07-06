import { Question } from '../types';

export const domain8sc2Questions: Question[] = [
  { id: 8211, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Scenario: Timeout Cascade', difficulty: 'hard', keywords: ['scenario', 'timeout', 'cascade', 'chain'],
    question: 'User request timeout is 30 seconds. Your agent calls Service A (timeout: 28s) → Service A calls Service B (timeout: 25s) → Service B calls the LLM API (timeout: 20s). The LLM takes 22 seconds. What happens and what is wrong with this design?',
    options: {
      A: 'The LLM timeout (20s) fires, but the request succeeds in Service B\'s retry',
      B: 'The LLM API call times out at 20s. Service B retries (another 20s = 40s total), but Service A already timed out at 28s. Service B is doing wasted retries after its caller has already given up. Fix: propagate deadlines — each service subtracts elapsed time from the parent deadline rather than using independent timeouts',
      C: 'All services time out simultaneously at 20 seconds',
      D: 'The 30-second user timeout is the only timeout that matters'
    },
    answer: 'B',
    explanation: 'Timeout cascade without deadline propagation: Service B happily retries the LLM at second 21, 41, 61 — but Service A already gave up at second 28 and returned an error to the user. Service B is doing ghost work. Deadline propagation: user has 30s → Service A gets 28s → Service A passes remaining_time to Service B → Service B passes remaining_time to LLM → all timeouts are consistent with the user-facing deadline.' },

  { id: 8212, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Scenario: Health Check Design', difficulty: 'medium', keywords: ['scenario', 'health check', 'model loaded', 'shallow'],
    question: 'Your NIM container health check returns 200 OK, so Kubernetes routes traffic to it. But users get errors because the LLM model weights are still loading (takes 90 seconds after container start). What is wrong with the health check?',
    options: {
      A: 'Increase the container startup timeout to 120 seconds',
      B: 'The liveness check (/health/live — container running) returns 200, but the readiness check (/health/ready — model loaded and ready to serve) was not configured. Kubernetes should only route traffic to pods where the readiness probe succeeds, not just the liveness probe',
      C: 'Add a 90-second sleep at the start of the container before starting NIM',
      D: 'The LLM model weights should be baked into the Docker image to eliminate loading time'
    },
    answer: 'B',
    explanation: 'Liveness vs readiness: liveness = "is the container process running?" readiness = "is the container ready to serve requests?" NIM provides /v1/health/live (liveness) and /v1/health/ready (readiness — returns 200 only after model is fully loaded). Kubernetes: livenessProbe → restart if dead. readinessProbe → remove from load balancer until ready. Configure BOTH in your deployment spec.' },

  { id: 8213, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Scenario: Error Budget Policy', difficulty: 'hard', keywords: ['scenario', 'error budget', 'policy', 'freeze'],
    question: 'Your team has a monthly error budget of 4.32 hours (99.9% SLO). Three weeks into the month, you have consumed 4 hours (93%) due to two incidents. A developer wants to deploy a high-risk feature before month end. What does your error budget policy say?',
    options: {
      A: 'Approve the deployment — 7% budget remains for the next 7 days',
      B: 'Freeze high-risk deployments: with 93% budget consumed in 3 weeks, the burn rate is unsustainable. The remaining 7% (18 minutes) provides almost no buffer for a deployment gone wrong. Error budget policy: when budget > 80% consumed, freeze all non-critical changes until next month\'s budget resets',
      C: 'Approve with extra monitoring — watch the metrics closely during deployment',
      D: 'Negotiate with stakeholders to expand the error budget for this month'
    },
    answer: 'B',
    explanation: 'Error budget policy enforcement: the policy exists precisely to prevent this situation. 7% remaining = 18 minutes of downtime budget. A risky deployment that causes even a 20-minute incident exhausts the budget and breaches the SLO. The developer\'s intuition ("some budget remains") ignores the burn rate context. Policy > individual judgment. Feature ships next month when full budget is available.' },

  { id: 8214, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Scenario: Chaos Engineering', difficulty: 'hard', keywords: ['scenario', 'chaos', 'game day', 'injection'],
    question: 'Your team wants to start a chaos engineering program for your AI agent platform. You have never done chaos engineering before. What is the correct starting point?',
    options: {
      A: 'Immediately start killing random pods in production to test real resilience',
      B: 'Start in staging/pre-prod with the most predictable, well-understood failure scenarios first: stop the LLM API (does fallback trigger?), delay responses by 5 seconds (do timeouts work?). Graduate to production only after building confidence. Measure and document steady state before each experiment',
      C: 'Chaos engineering is only for large companies like Netflix — skip it',
      D: 'Run chaos experiments without telling the team to simulate real incidents'
    },
    answer: 'B',
    explanation: 'Chaos engineering maturity: beginners start in non-production with low-blast-radius experiments. Establish steady state first ("normal: p95 = 1.2s, error rate = 0.1%"). Inject known failure ("stop LLM API"). Observe: does circuit breaker open? Does fallback serve traffic? Measure deviation from steady state. Graduate to production only after months of non-prod success. Running undeclared production chaos (Option D) is reckless, not scientific.' },

  { id: 8215, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Scenario: Partial Failure Handling', difficulty: 'hard', keywords: ['scenario', 'partial failure', 'degraded', 'response'],
    question: 'Your AI agent aggregates results from 5 data sources to answer a question. Source 3 is down. The agent currently returns an error if ANY source fails. How should it handle this partial failure?',
    options: {
      A: 'Retry source 3 indefinitely until it recovers',
      B: 'Return a best-effort response from the 4 available sources with explicit disclosure: "Note: this answer is based on 4 of 5 data sources. [Source 3 Name] was unavailable and may contain additional relevant information." This is more useful than a complete failure and is honest about the limitation',
      C: 'Cache the last known result from source 3 and use it without disclosure',
      D: 'Queue the request until source 3 recovers, however long that takes'
    },
    answer: 'B',
    explanation: 'Partial success handling: an answer from 4/5 sources is almost always more useful than no answer. Transparency is critical: disclosing which source was unavailable lets users judge if the missing source is material to their specific question. A legal researcher may care deeply if the regulatory database (source 3) was unavailable; a different user may not. Disclose the limitation, let users decide.' },

  { id: 8216, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Scenario: Monitoring Alert Fatigue', difficulty: 'medium', keywords: ['scenario', 'alert fatigue', 'noise', 'tuning'],
    question: 'Your team receives 200 Slack alerts per day from your AI monitoring system. Engineers have stopped reading them. Last week, a real P1 incident was missed because it was buried in alert noise. How do you fix this?',
    options: {
      A: 'Add more alerts to ensure nothing is missed',
      B: 'Alert audit and consolidation: categorize each alert by (1) actionability — does it require human response? (2) frequency — how often does it fire? Silence or auto-resolve non-actionable and noisy alerts, aggregate related alerts into single notifications, reserve paging for true P1/P2 incidents only. Target: < 10 meaningful alerts per day',
      C: 'Assign one engineer full-time to read and triage all 200 alerts',
      D: 'Move alerts from Slack to email so engineers can filter them more easily'
    },
    answer: 'B',
    explanation: 'Alert fatigue is a serious operational safety issue — it causes engineers to ignore all alerts, including critical ones. Alert principles: (1) Every alert must be actionable (if no action needed, it\'s a metric not an alert). (2) Alert on symptoms, not causes (one "user-facing error rate high" vs 20 component-level alerts). (3) Tune thresholds to eliminate noise. (4) Regular alert review cadence to prune stale alerts.' },

  { id: 8217, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Scenario: Postmortem Culture', difficulty: 'medium', keywords: ['scenario', 'postmortem', 'blameless', 'learning'],
    question: 'After a 2-hour AI service outage caused by a misconfigured deployment, the engineering manager wants to identify "who is responsible" and include it in the postmortem. What is wrong with this approach?',
    options: {
      A: 'Nothing — accountability is important for learning',
      B: 'Blame-focused postmortems create a culture of fear where engineers hide mistakes and avoid risky but necessary work. Blameless postmortems focus on: what systemic failures allowed this to happen? What process/automation would have prevented it? Individual blame is replaced by systemic improvement to prevent recurrence regardless of who is involved',
      C: 'Postmortems are only needed for outages longer than 4 hours',
      D: 'The manager is correct — someone must be responsible for the misconfiguration'
    },
    answer: 'B',
    explanation: 'Blameless postmortem culture: "People do not intentionally cause outages. When a human makes an error, it is a sign that the system allowed that error to propagate unchecked." Focus: What deployment safeguard was missing? Why did the misconfiguration not get caught in review? What automated validation would have prevented this? The output is process improvements, not personnel actions. This is Google SRE\'s foundational principle.' },

  { id: 8218, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Scenario: Synthetic Monitoring', difficulty: 'medium', keywords: ['scenario', 'synthetic', 'canary', 'monitoring'],
    question: 'Your AI agent serves 10,000 users but most don\'t give explicit feedback. You want to detect quality regressions within 5 minutes of them occurring, not hours later when support tickets arrive. What monitoring approach achieves this?',
    options: {
      A: 'Analyze support ticket volume daily for quality trends',
      B: 'Synthetic canary monitoring: every 2 minutes, automatically send a test query with a known expected answer (e.g., "What is 2+2?" → expect "4"). An LLM judge evaluates the response. If quality drops, alert within minutes — well before any user files a ticket',
      C: 'Sample 1% of real user queries and have humans review them daily',
      D: 'Monitor server error rates — quality issues always show up as 5xx errors'
    },
    answer: 'B',
    explanation: 'Synthetic monitoring for AI quality: automated "probe" queries sent continuously → expected answers verified automatically → alert on first failure. Detects: model regression (wrong answer to known question), latency spike (answer takes too long), safety failure (inappropriate response to canary prompt). 2-minute detection vs 4-hour support ticket detection. Critical for production AI systems that need rapid quality alerting.' },

  { id: 8219, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Scenario: Queue Overflow', difficulty: 'hard', keywords: ['scenario', 'queue', 'backpressure', 'overflow'],
    question: 'Your AI agent request queue depth has been growing for 3 hours. New requests join the queue and wait 20+ minutes before being served. Users are abandoning and resubmitting, making the queue worse. What is the correct response?',
    options: {
      A: 'Increase queue capacity to hold all waiting requests',
      B: 'Apply backpressure: stop accepting new requests (return 503 with Retry-After header) when queue depth exceeds threshold, drain the existing queue by scaling up serving capacity, purge requests that have waited longer than the user timeout (they will have abandoned already), and communicate estimated wait time to users',
      C: 'Process requests in LIFO order to serve the newest users first',
      D: 'Add more queue workers to process requests faster'
    },
    answer: 'B',
    explanation: 'Queue overflow recovery: (1) Backpressure — stop accepting work you cannot process. "503 Service Busy, retry in 300 seconds" is better than 20-minute silent waits. (2) Scale up: add serving capacity immediately. (3) Purge dead entries: requests older than user timeout are zombie work — the user already gave up. (4) Transparency: inform users of queue status. Unlimited queue growth causes ever-increasing latency for all users.' },

  { id: 8220, domain: 8, domainName: 'Reliability & Error Handling', topic: 'Scenario: Recovery Validation', difficulty: 'medium', keywords: ['scenario', 'recovery', 'validation', 'incident'],
    question: 'After a 3-hour outage, your team declares the incident resolved and closes it. 30 minutes later, the same failure mode recurs causing another 2-hour outage. What should have happened before declaring recovery?',
    options: {
      A: 'Wait 24 hours before declaring recovery for any incident',
      B: 'Validate recovery with smoke tests: after applying the fix, run a set of automated tests verifying the specific failure mode is resolved, verify system metrics have returned to pre-incident baseline (not just "no errors in last 5 minutes"), and monitor closely for 30-60 minutes before declaring resolution. "Fixed" requires evidence, not just absence of recent errors',
      C: 'The second incident is unrelated — coincidences happen',
      D: 'Declare recovery and immediately do a full root-cause analysis to prevent recurrence'
    },
    answer: 'B',
    explanation: 'Recovery validation is as important as the fix itself. Common failure: "no errors in 5 minutes → declare fixed" without testing whether the fix actually addresses the root cause. Validation checklist: (1) Run targeted smoke tests that would have caught the original failure. (2) Verify all impacted metrics (latency, error rate, queue depth) are back to baseline. (3) Soak period (30-60 min monitoring) before closing. "Resolved" = evidence of resolution, not hope.' },
];
