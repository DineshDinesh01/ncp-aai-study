from dotenv import load_dotenv
import os

from langchain.agents import create_agent
from langchain_core.tools import tool
from langchain_groq import ChatGroq
from ddgs import DDGS
from langchain_core.messages import AIMessage, ToolMessage

load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0.1
)


@tool
def do_google_search(query: str) -> str:
    """Search for real-time information."""

    better_query = (
        f"{query} latest weather news India"
    )

    with DDGS() as ddgs:
        results = ddgs.text(
            query=better_query,
            max_results=5
        )

        output = []

        for item in results:
            output.append(
                f"""
Title: {item.get("title")}
URL: {item.get("href")}
Description: {item.get("body")}
                """.strip()
            )

    return "\n\n".join(output)

system_prompt = """
You are a helpful AI research assistant.

You have access to tools.

Behavior:
- Think step by step internally.
- Use tools when real-time or external information is needed.
- Carefully analyze tool outputs.
- Summarize findings clearly.

Important:
- Do NOT write tool calls manually.
- Use the provided tool system automatically.
- Never generate XML, JSON, or function syntax yourself.
- Let the framework handle tool execution.

Return only a helpful final answer to the user.
"""

agent = create_agent(
    model=llm,
    tools=[do_google_search],
    system_prompt=system_prompt
)

response = agent.invoke({
    "messages": [
        {
            "role": "user",
            "content": "does any reported news about savuku shankar in tamilnadu today"
        }
    ]
})

print("\n===== REACT TRACE =====\n")

for msg in response["messages"]:

    if isinstance(msg, AIMessage) and msg.tool_calls:
        print("ACTION:")
        for tool_call in msg.tool_calls:
            print(
                f"Calling tool: {tool_call['name']}"
            )
            print(
                f"Arguments: {tool_call['args']}"
            )
        print()

    elif isinstance(msg, ToolMessage):
        print("OBSERVATION:")
        print(msg.content[:500])
        print()

print("===== FINAL ANSWER =====\n")
print(response["messages"][-1].content)