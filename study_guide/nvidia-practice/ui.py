import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

import chainlit as cl
from langgraph.graph import (
    StateGraph,
    START,
    END
)

from work_around.langGraph.research_assitant_agent import AgentState, do_start_processing

# Build graph once
init_graph = StateGraph(AgentState)

init_graph.add_node(
    "answering_node",
    do_start_processing
)

init_graph.add_edge(
    START,
    "answering_node"
)

init_graph.add_edge(
    "answering_node",
    END
)

graph = init_graph.compile()


@cl.on_message
async def main(message: cl.Message):

    user_input = message.content

    input_data = {
        "input": user_input
    }

    result = graph.invoke(input_data)

    await cl.Message(
        content=result["response"]
    ).send()