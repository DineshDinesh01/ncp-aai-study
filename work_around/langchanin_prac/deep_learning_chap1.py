import os
import operator
from typing import TypedDict, Annotated

from dotenv import load_dotenv
from ddgs import DDGS

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


# ==========================================================
# GOOGLE SEARCH TOOL
# ==========================================================
@tool
def do_google_search(query: str) -> str:
    """
    Search the web for current or recent information.

    Use this tool for:
    - weather
    - latest news
    - current events
    - recent updates
    - real-time information

    Input:
    - query: search query

    Returns:
    Relevant search snippets.
    """

    print(f"\nCalling Tool: do_google_search")
    print(f"Args: {query}")

    try:
        with DDGS() as ddgs:
            results = list(
                ddgs.text(
                    query=query,
                    max_results=5
                )
            )

        if not results:
            return "No search results found."

        formatted_results = []

        for idx, item in enumerate(results, start=1):

            title = item.get("title", "")
            snippet = item.get("body", "")
            url = item.get("href", "")

            formatted_results.append(
                f"""
Search Result {idx}

Title:
{title}

Snippet:
{snippet}

Source:
{url}
                """.strip()
            )

        return "\n\n".join(formatted_results)

    except Exception as e:
        return f"Search failed: {str(e)}"


# ==========================================================
# TOOLS
# ==========================================================
tools = [do_google_search]

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

agent = graph.compile()


# ==========================================================
# RUN
# ==========================================================
if __name__ == "__main__":

    user_query = input(
        "\nAsk: "
    )

    messages = [
        HumanMessage(
            content=user_query
        )
    ]

    result = agent.invoke(
        {
            "messages": messages
        },
        config={
            "recursion_limit": 5
        }
    )

    print("\nFINAL ANSWER:\n")
    print(
        result["messages"][-1].content
    )