from langchain_core.tools import tool
from openai import OpenAI
from ddgs import DDGS
from typing import TypedDict
from dotenv import load_dotenv

import os

load_dotenv()

API_KEY = os.getenv('API_KEY')
API_URL = "https://api.groq.com/openai/v1"
open_ai_client = OpenAI(api_key=API_KEY, base_url=API_URL)


class AgentState(TypedDict):
    input: str
    status: str
    stage: int
    response: dict
    stage_name: str


SUMMARY_PROMPT = """
You are a summary agent.

Your responsibility is to give a summary
of the search results.

Search Results:
{response}
"""


def do_api_call(system_role: str, system_message: str, user_role: str, user_message: str) -> str:
    completion = open_ai_client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {"role": system_role, "content": system_message},
            {"role": user_role, "content": user_message},
        ],
        temperature=0.1,
    )
    return completion.choices[0].message.content


def do_google_search(query: str, max_results: int = 10):
    try:
        results = []
        with DDGS() as ddgs:
            search_results = ddgs.text(
                query=query,
                backend="google",
                max_results=max_results,
            )
            for item in search_results:
                results.append({
                    "title": item.get("title"),
                    "url": item.get("href"),
                    "description": item.get("body"),
                })
        return results
    except Exception as e:
        print(f"Error: {e}")
        return []


def do_start_processing(input_query: AgentState) -> AgentState:
    search_response = do_google_search(input_query["input"], 5)
    print(search_response)

    formatted_results = "\n\n".join([
        f"Title: {item['title']}\n"
        f"Description: {item['description']}"
        for item in search_response
    ])

    user_msg = SUMMARY_PROMPT.format(response=formatted_results)

    sys_msg = """
    Answer all user queries.

    If user asks about any model-related query,
    say a sarcastic story.
    """

    response = do_api_call(
        system_role="system",
        system_message=sys_msg,
        user_role="user",
        user_message=user_msg,
    )

    return {
        "status": "Completed",
        "stage": 1,
        "response": response,
        "stage_name": "Summary response",
    }