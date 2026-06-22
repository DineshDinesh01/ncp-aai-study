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


# ==========================================================
# GRAPH
# ==========================================================
graph = StateGraph(
    AgentState
)

graph.add_node(
    "llm",
    llm_call
)

graph.add_node(
    "tool",
    take_action
)

graph.add_edge(
    START,
    "llm"
)

graph.add_conditional_edges(
    "llm",
    should_continue,
    {
        True: "tool",
        False: END
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
if __name__ == "__main__":

    # Persistent thread memory
    thread = {
        "configurable": {
            "thread_id": "user_1"
        }
    }

    while True:

        user_query = input("\nAsk: ")

        # Exit condition
        if user_query.lower() == "exit":
            print("\nExiting...")
            break

        # User message
        messages = [
            HumanMessage(
                content=user_query
            )
        ]

        # Stream graph execution
        events = agent.stream(
            {
                "messages": messages
            },
            config={
                **thread,
                "recursion_limit": 5
            },
            stream_mode="updates"
        )

        print("\n========== STREAMING ==========\n")

        # Iterate through graph updates
        for event in events:

            for node_name, node_output in event.items():

                print(
                    f"\nNODE: {node_name}"
                )

                messages = node_output.get(
                    "messages",
                    []
                )

                for msg in messages:

                    print(
                        f"\nTYPE: {type(msg).__name__}"
                    )

                    # Print content
                    if hasattr(msg, "content"):
                        print(
                            f"CONTENT:\n{msg.content}"
                        )

                    # Print tool calls
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