import os
import operator
import uuid
from typing import TypedDict, Annotated
from langchain_community.tools.tavily_search import TavilySearchResults
from dotenv import load_dotenv
import sqlite3
from langgraph.checkpoint.sqlite import SqliteSaver


from langchain_core.messages import (
    AnyMessage,
    HumanMessage,
    SystemMessage,
    ToolMessage
)

from langchain_core.tools import tool
from langgraph.graph import StateGraph
from langgraph.constants import START, END
from langchain_groq import ChatGroq
from langgraph.types import interrupt, Command

# ==========================================================
# LOAD ENV
# ==========================================================
load_dotenv()


# ==========================================================
# LLM
# ==========================================================
llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model="qwen/qwen3-32b"
)


# ==========================================================
# STATE
# ==========================================================
class AgentState(TypedDict):
    messages: Annotated[
        list[AnyMessage],
        operator.add
    ]
    approval: str

# SQLite connection
conn = sqlite3.connect(
    "checkpoint.db",
    check_same_thread=False
)

# LangGraph checkpointer
checkpointer = SqliteSaver(conn)

# ==========================================================
# SYSTEM PROMPT
# ==========================================================
SYSTEM_PROMPT = """
You are a smart research assistant.

IMPORTANT RULES:

1. Use the search tool ONLY for:
   - latest information
   - current events
   - weather
   - news
   - recent facts
   - time-sensitive information

2. After receiving search results:
   - analyze the content
   - answer the user's question directly
   - NEVER only list links
   - NEVER say "check these websites"

3. You can search a maximum of 2 times.

4. Do NOT repeatedly search the same thing.

5. Give the best possible answer using the search results.

Examples:

User: What is weather in SF?

Bad Answer:
"Here are some weather websites..."

Good Answer:
"San Francisco is currently around 16°C with partly cloudy skies."

User: Latest AI news

Good Answer:
"Recent AI developments include..."
"""

tool = TavilySearchResults(max_results=2)


# ==========================================================
# TOOLS
# ==========================================================
tools = [tool]

tool_map = {
    tool.name: tool
    for tool in tools
}

llm_with_tools = llm.bind_tools(tools)


# ==========================================================
# LLM NODE
# ==========================================================
def llm_call(state: AgentState):

    messages = state["messages"]

    final_messages = [
        SystemMessage(content=SYSTEM_PROMPT)
    ] + messages

    response = llm_with_tools.invoke(
        final_messages
    )

    return {
        "messages": [response]
    }

def human_approval(state: AgentState):

    last_message = state["messages"][-1]

    tool_calls = last_message.tool_calls

    approval = interrupt(
        {
            "question":
                "Do you approve tool execution?",
            "tool_calls": tool_calls
        }
    )

    return {
        "approval": approval
    }

# ==========================================================
# TOOL NODE
# ==========================================================
def take_action(state: AgentState):

    tool_calls = state[
        "messages"
    ][-1].tool_calls

    results = []

    for tool_call in tool_calls:

        tool_name = tool_call["name"]
        tool_args = tool_call["args"]

        if tool_name not in tool_map:

            result = (
                "Invalid tool name."
            )

        else:
            result = tool_map[
                tool_name
            ].invoke(tool_args)

        results.append(
            ToolMessage(
                tool_call_id=tool_call["id"],
                name=tool_name,
                content=str(result)
            )
        )

    print("\nBack to LLM...\n")

    return {
        "messages": results
    }


# ==========================================================
# ROUTER
# ==========================================================
def should_continue(
    state: AgentState
):

    last_message = state[
        "messages"
    ][-1]

    return (
        hasattr(
            last_message,
            "tool_calls"
        )
        and len(
            last_message.tool_calls
        ) > 0
    )

def approval_router(
    state: AgentState
):
    if (
        state.get("approval")
        == "yes"
    ):
        return "tool"

    return END

# ==========================================================
# GRAPH
# ==========================================================
graph = StateGraph(AgentState)

graph.add_node("llm", llm_call)

graph.add_node(
    "approval",
    human_approval
)

graph.add_node(
    "tool",
    take_action
)

graph.add_edge(
    START,
    "llm"
)

# IMPORTANT — YOU MISSED THIS
graph.add_conditional_edges(
    "llm",
    should_continue,
    {
        True: "approval",
        False: END
    }
)

graph.add_conditional_edges(
    "approval",
    approval_router,
    {
        "tool": "tool",
        END: END
    }
)

graph.add_edge(
    "tool",
    "llm"
)

agent = graph.compile(checkpointer=checkpointer)
# ==========================================================
# RUN
# ==========================================================
def run_stream(events):

    interrupted = False

    print("\n========== STREAMING ==========\n")

    for event in events:

        for node_name, node_output in event.items():

            print(f"\nNODE: {node_name}")

            # --------------------------------
            # INTERRUPT HANDLING
            # --------------------------------
            if "__interrupt__" in node_output:

                interrupted = True

                interrupt_data = node_output[
                    "__interrupt__"
                ][0].value

                print("\nHUMAN APPROVAL REQUIRED")

                print(
                    f"\nQuestion: "
                    f"{interrupt_data['question']}"
                )

                print("\nTool Calls:")

                for tool_call in interrupt_data[
                    "tool_calls"
                ]:
                    print(
                        f"\nTool: "
                        f"{tool_call['name']}"
                    )

                    print(
                        f"Args: "
                        f"{tool_call['args']}"
                    )

            # --------------------------------
            # MESSAGE PRINTING
            # --------------------------------
            messages = node_output.get(
                "messages",
                []
            )

            for msg in messages:

                print(
                    f"\nTYPE: "
                    f"{type(msg).__name__}"
                )

                if hasattr(msg, "content"):
                    print(
                        f"CONTENT:\n"
                        f"{msg.content}"
                    )

                if (
                    hasattr(msg, "tool_calls")
                    and msg.tool_calls
                ):

                    print(
                        "\nTOOL CALLS:"
                    )

                    for tool_call in msg.tool_calls:

                        print(
                            f"Tool Name: "
                            f"{tool_call['name']}"
                        )

                        print(
                            f"Args: "
                            f"{tool_call['args']}"
                        )

    print(
        "\n===============================\n"
    )

    return interrupted


# ==========================================================
# RUN
# ==========================================================
if __name__ == "__main__":

    thread = {
        "configurable": {
            "thread_id": "user_1"
        }
    }

    while True:

        user_query = input("\nAsk: ")

        if user_query.lower() == "exit":
            print("\nExiting...")
            break

        # --------------------------------
        # START GRAPH
        # --------------------------------
        events = agent.stream(
            {
                "messages": [
                    HumanMessage(
                        content=user_query
                    )
                ]
            },
            config={
                **thread,
                "recursion_limit": 5
            },
            stream_mode="updates"
        )

        interrupted = run_stream(
            events
        )

        # --------------------------------
        # RESUME AFTER HITL
        # --------------------------------
        while interrupted:

            approval = input(
                "\nApprove tool? "
                "(yes/no): "
            ).strip().lower()

            events = agent.stream(
                Command(
                    resume=approval
                ),
                config=thread,
                stream_mode="updates"
            )

            interrupted = run_stream(
                events
            )