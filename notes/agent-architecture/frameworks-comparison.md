# Agent Architecture & Frameworks — Exam Notes
**Domain weight: ~15-20% of NCP-AAI exam (highest weight domain)**

---

## ReAct Agent Loop

### The Loop
```
Thought → Action (tool call) → Observation (result) → repeat → Final Answer
```
- **Thought**: LLM reasons about current state
- **Action**: specifies a tool and arguments
- **Observation**: tool output appended to context
- Loop until LLM outputs "Final Answer:" without a tool call

### Key Settings
- temperature=0.0 for tool selection (deterministic)
- max_iterations to prevent infinite loops
- Tool schema: OpenAI function format (name, description, parameters)

---

## LangGraph

### Three Primitives
1. **StateGraph** — holds typed shared state (TypedDict)
2. **Nodes** — Python functions that read/write state; return partial update dict
3. **Edges** — connections between nodes (simple, conditional, or END)

### State Reducers
```python
# operator.add = append semantics for lists
messages: Annotated[list[BaseMessage], operator.add]
```

### Checkpointers
| Checkpointer | Use Case |
|-------------|----------|
| MemorySaver | Development, single-server |
| SqliteSaver | Single-server persistence |
| **PostgresSaver** | Production, multi-replica, HA |

### interrupt() Pattern
```python
# In a node:
value = interrupt("Please review this plan")  # Pauses graph

# Resume:
graph.invoke(Command(resume=approved_value), config=same_config)
```

### Key API Facts
- `get_state_history(config)` → all past checkpoints (time-travel debugging)
- `graph.compile(checkpointer=memory, interrupt_before=["node_name"])` → pre-interrupt
- Conditional edge returning END → graph terminates, current state returned

---

## CrewAI

### Three Primitives (in order)
**Agent → Task → Crew**

### Agent Key Attributes
- `role`: persona label
- `goal`: optimization objective
- `backstory`: behavioral context
- `tools`: list of Tool objects
- `allow_delegation`: can sub-delegate to others (default: False)
- `memory=True`: enable agent-level memory

### Task Key Attributes
- `description`: what to do
- `expected_output`: exact format expected
- `agent`: which agent handles it
- `context=[task1, task2]`: receive output of upstream tasks
- `output_file`: save result to file
- `async_execution=True`: run in parallel

### Process Types
| Process | Behavior |
|---------|---------|
| `Process.sequential` | Tasks run in order, each gets previous output |
| `Process.hierarchical` | Manager LLM dynamically assigns tasks to workers |

### CrewAI Flows
```python
@start()       # Entry point
@listen(method) # Triggers after named method completes
@router(method) # Returns string routing to next @listen branch
```
State shared via Pydantic BaseModel class attribute.

### Scale
10M+ agent executions in 30 days — production-grade.

---

## AutoGen

### Core Agent Types
| Agent | Has LLM? | Executes Code? | Primary Role |
|-------|----------|----------------|-------------|
| UserProxyAgent | Optional | **Yes** | Code execution, human relay |
| AssistantAgent | **Yes** | No | Reasoning, planning, code writing |
| GroupChatManager | **Yes** | No | Turn selection in GroupChat |

### human_input_mode Options
- `NEVER`: fully automated
- `ALWAYS`: pause every turn
- `TERMINATE`: only pause when agent signals stop

### Termination Patterns
1. TERMINATE keyword in message → detected by `is_termination_msg` lambda
2. `max_consecutive_auto_reply`: per-agent limit
3. `max_round` in GroupChat: hard turn limit

### GroupChatManager
- Uses own LLM to select next speaker when `speaker_selection_method="auto"`
- `speaker_selection_method="round_robin"`: agents take turns in order

### Self-Correction Loop
UserProxy executes code → error returned as message → AssistantAgent sees error and revises

### 2025 Status
AutoGen consolidated into Microsoft Agent Framework (AG2) — enters maintenance mode. Concepts still tested on NCP-AAI exam.

---

## Framework Comparison Table

| Dimension | LangGraph | CrewAI | AutoGen |
|-----------|-----------|--------|---------|
| Mental model | Graph / state machine | Team of role-based workers | Conversation between agents |
| Code execution | No (via tool nodes) | No (via tools) | **Yes (UserProxyAgent)** |
| State management | Typed TypedDict + reducers | Pydantic Flow state | Conversation history |
| Loops | Native (cyclic graph) | Via Flows routing | max_round conversation turns |
| Best for | Complex stateful workflows, HITL | Structured role-based pipelines | Code-generation, self-correction |
| NVIDIA exam weight | High (most detailed coverage) | Medium (primitives, Flows) | Medium (agent types, termination) |

---

## Multi-Agent Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| **Hierarchical** | Manager → workers (dynamic delegation) | Task decomposition |
| **Peer-to-peer** | Agents communicate via shared state | Collaborative reasoning |
| **Blackboard** | Shared knowledge store all agents read/write | Complex multi-phase problems |
| **Mixture of Agents (MoA)** | N LLMs → aggregator synthesizer | Ensemble quality improvement |
| **Supervisor** | Central agent routes to specialized agents | Customer service, triage |

---

## Exam Quick-Fire Facts

| Question | Answer |
|----------|--------|
| LangGraph primitive for shared state | StateGraph |
| Which resume function in LangGraph? | Command(resume=value) |
| CrewAI primitives in order | Agent → Task → Crew |
| Process type for dynamic assignment | Process.hierarchical |
| AutoGen code executor agent | UserProxyAgent |
| GroupChat turn selection | GroupChatManager |
| Blackboard pattern shared resource | Shared knowledge repository |
| AutoGen termination keyword | TERMINATE at end of message |
| CrewAI Flow entry decorator | @start() |
| LangGraph multi-server checkpointer | PostgresSaver |
