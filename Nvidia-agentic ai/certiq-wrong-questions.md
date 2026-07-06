# Certiq — Questions Answered Wrong (Deduplicated)

Deduplicated list of the questions you reported getting wrong on the real Certiq exam,
grouped by the day you first saw them. Wording is unchanged from what you provided.
Repeats across days are noted, not duplicated.

## July 1, 2026 3:40 PM

1. Your agent is designed to manage tasks through a service management API. The API responds with detailed event logs, but these logs contain both metadata and structured data.
   To ensure the agent correctly interprets and processes the data from these logs, what's the most prudent approach?
   *(seen again: Jun 30)*

2. Your deployed legal assistant shows great performance but occasionally repeats incorrect legal terms.
   Which tuning method best improves factual reliability?

3. You're building a RAG system that uses RAG Fusion.
   Which of the following approaches would be most effective in determining how to combine information from multiple retrieved chunks?
   *(seen again: Jun 30)*

4. When evaluating GPU utilization inefficiencies in deploying Llama Nemotron models across A100 and H100 clusters, which approaches help identify optimal resource allocation strategies? (Choose two.)
   *(seen again: Jun 30)*

5. After deploying a financial assistant agent, users report occasional inconsistencies in how transactions are categorized.
   What is the best first step for diagnosing the issue?
   *(seen again: Jun 24)*

6. You are implementing a RAG (Retrieval-Augmented Generation) solution.
   What is the primary purpose of implementing semantic guardrails within a RAG system?
   *(seen again: 4 more times on Jul 1, and again on Jun 30 — asked most often overall)*

7. This question addresses important concerns in the field of AI ethics and compliance, particularly as organizations develop more autonomous AI agents. Implementing effective guardrails against bias, ensuring data privacy, and adhering to regulations are essential components of responsible AI development.
   Which of the following statements accurately describes how RAGAS (Retrieval Augmented Generation Assessment) can be utilized for implementing safety checks and guardrails in agentic AI applications?
   *(seen again: 2 more times on Jul 1, and again on Jun 30)*

8. A logistics company is implementing an agentic AI system for supply chain optimization that manages inventory levels, predicts demand, and automatically reorders supplies across multiple warehouses. Supply chain managers need to monitor AI decisions, understand the reasoning behind inventory recommendations, and intervene when business conditions change rapidly. The system must present complex data analytics in an intuitive way that enables quick decision-making while providing detailed insights when needed. Managers have varying levels of technical expertise and need interfaces that support both high-level oversight and detailed analysis.
   Which user interface design approach would BEST support effective human oversight of this complex multi-agent supply chain system?
   *(seen again: 2 more times on Jul 1)*

9. When evaluating an agent's integration with external tools and APIs for data retrieval and action execution, which analysis approaches effectively identify reliability and performance issues?
   Pick the 2 correct responses below
   *(seen again: Jun 30)*

10. An autonomous vehicle company operates a multi-agent AI system across its fleet to process real-time sensor data, make driving decisions, and communicate with cloud infrastructure. The company needs fleet-wide monitoring to track GPU utilization, inference times, and memory usage, correlate performance with driving conditions and system load, and predict safety issues before they occur.
    Which monitoring and observability approach would BEST meet these fleet-scale, safety-critical requirements?
    *(seen again: Jun 30)*

11. When evaluating a multi-agent customer service system experiencing unpredictable scaling costs and performance bottlenecks during peak hours, which analysis approaches effectively identify optimization opportunities for both infrastructure efficiency and service reliability?
    Pick the 2 correct responses below
    *(seen again: Jun 30)*

## June 30, 2026 3:26 PM

12. You are using an LLM-as-a-Judge to evaluate a RAG pipeline.
    What is the primary benefit of synthetically generating question-answer pairs, rather than relying solely on human-created test cases?

13. An AI engineer at an oil and gas company is designing a multi-agent AI system to support drilling operations. Different agents are responsible for subsurface modeling, risk analysis, and resource allocation. These agents must share operational context, reason through interdependent planning steps, and justify their collaborative decisions using structured, transparent logic. The architecture must support memory persistence, sequential decision-making and chain-of-thought prompting across agents.
    Which implementation best supports this design?
    *(seen again: Jun 30, later in same session)*

14. Which memory architecture is most appropriate for an agent that must track conversation flow and remember user preferences across multiple interactions?

15. In a ReAct (Reasoning-Acting) agent architecture, what is the correct sequence of operations when the agent encounters a complex multi-step problem requiring external tool usage?

16. A large enterprise is preparing to roll out its AI-powered customer support agents worldwide. To maintain high availability and reliability, the operations team must select the best approach for monitoring, updating, and managing all agent instances across different locations.
    Which solution most effectively ensures reliable operation and simplified management of large-scale agent deployments?

17. Which two validation approaches are MOST critical for ensuring agent reliability in production deployments? (Choose two.)
    *(seen again: Jun 24)*

18. You are developing a RAG solution and have decided to use a classifier branch as part of your semantic guardrail system to assess the risk of generated text.
    Which of the following is a key benefit of using a classifier branch compared to solely relying on prompt filtering?

19. An AI Engineer has deployed a multi-agent system to manage supply chain logistics. Stakeholders request greater insight into how the agents decide on actions across tasks.
    Which approach would best improve decision transparency without modifying the underlying model architecture?

## June 24, 2026 1:06 PM

20. You are designing the architecture for a RAG (Retrieval-Augmented Generation) system, and you are concerned about ensuring data freshness and minimizing latency.
    Which of the following is the most important consideration when designing the architecture?

21. A healthcare AI company is deploying diagnostic agents that process medical imaging and patient data. The system must deliver consistent sub-100ms inference times for critical diagnoses while supporting deployment across multiple hospital sites with different NVIDIA GPU configurations (from RTX 6000 workstations to DGX systems). The agents need to maintain high accuracy while being portable across different hardware environments and capable of running efficiently on various GPU memory configurations.
    Which optimization strategy would deliver the BEST performance improvements while maintaining deployment flexibility across diverse NVIDIA hardware configurations?

---

**Total: 21 unique questions** out of 39 raw entries you pasted (18 were repeats across sittings).
Most-repeated: **#6 (semantic guardrails, 6x)**, **#7 (RAGAS, 4x)**, **#8 (logistics UI oversight, 3x)**.

These same 21 questions (with best-guess options/answers, marked unverified) are already loaded in the
app at `/certiq/flagged`.
