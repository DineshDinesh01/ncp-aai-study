# Shared tools for all three agent patterns
import uuid

from langchain_core.tools import tool
from langchain_nvidia_ai_endpoints import NVIDIAEmbeddings
from pymilvus import MilvusClient

# Mock CRM data — simulates a real customer database
ACCOUNTS = {
    "alice@startup.io": {
        "name": "Alice Chen",
        "company": "StartupIO",
        "plan": "Pro",
        "seats_used": 3,
        "seats_total": 5,
        "mrr": 49,
        "billing_cycle": "monthly",
        "next_billing": "2026-05-01",
        "status": "active",
    },
    "bob@enterprise.co": {
        "name": "Bob Martinez",
        "company": "EnterpriseCo",
        "plan": "Business",
        "seats_used": 18,
        "seats_total": 25,
        "mrr": 149,
        "billing_cycle": "annual",
        "next_billing": "2027-01-15",
        "status": "active",
    },
    "carol@bigcorp.com": {
        "name": "Carol Kim",
        "company": "BigCorp",
        "plan": "Enterprise",
        "seats_used": 142,
        "seats_total": 200,
        "mrr": 899,
        "billing_cycle": "annual",
        "next_billing": "2026-09-01",
        "status": "active",
    },
}

# Knowledge base articles — indexed in Milvus for semantic search
KB_ARTICLES = [
    "Plans: Starter $19/mo (2 users), Pro $49/mo (5 users), Business $149/mo (25 users), Enterprise custom. All include SSO. Annual billing saves 20%.",
    "30-day money-back guarantee on all plans. Pro-rated refunds for annual subscriptions. Process takes 5-7 business days.",
    "Native integrations: Slack, Jira, GitHub, Salesforce, HubSpot. REST API on Business+. Webhooks on all plans. OAuth2 for SSO.",
    "SOC 2 Type II certified. AES-256 encryption at rest, TLS 1.3 in transit. GDPR compliant. EU data residency available on Enterprise.",
    "Upgrades are instant. You pay the prorated difference for the current billing cycle. Downgrades take effect at next billing date.",
    "REST API available on Business and Enterprise plans. Rate limit: 1000 req/min. API keys managed in Settings > Integrations > API.",
]

# --- Set up Milvus vector store for the KB ---
embedder = NVIDIAEmbeddings(
    base_url="http://nim-proxy.labs.svc:8080/v1",
    model="nvidia/nv-embedqa-e5-v5",
    api_key="not-needed",
)
milvus = MilvusClient("/tmp/support_kb.db")

# Index KB articles (idempotent — drops and recreates)
if milvus.has_collection("kb"):
    milvus.drop_collection("kb")
vectors = embedder.embed_documents(KB_ARTICLES)
milvus.create_collection(collection_name="kb", dimension=len(vectors[0]), auto_id=True)
milvus.insert(collection_name="kb", data=[
    {"vector": vec, "text": text} for vec, text in zip(vectors, KB_ARTICLES)
])
print(f"KB indexed: {len(KB_ARTICLES)} articles in Milvus")


# TODO: Implement the three tools

@tool
def check_account(email: str) -> str:
    """Look up a customer account by email. Returns subscription details including plan, seats, billing, and status."""
    account = ACCOUNTS[email]

    if account is None:
        return "No account found"
    else:
        return account


@tool
def search_kb(query: str) -> str:
    """Search the knowledge base for product information, pricing, policies, and how-to articles. Uses semantic search — understands meaning, not just keywords."""
    query_embedding = embedder.embed_query(query)
    result = milvus.search(collection_name="kb", data=query_embedding, limit=2)
    if result:
        final_response = ""
        for result in result:
            final_response = result["text"]+"/n /n"
        return final_response
    else:
        return "No results found"


@tool
def create_ticket(subject: str, priority: str, description: str) -> str:
    """Create a support ticket for issues requiring human follow-up. Priority: low, medium, or high."""
    return str(uuid.uuid4())



if __name__ == "__main__":
    # Test
    print("\n=== Account Lookup ===")
    print(check_account.invoke({"email": "alice@startup.io"}))
    print(check_account.invoke({"email": "unknown@test.com"}))

    print("\n=== KB Search (semantic) ===")
    print(search_kb.invoke({"query": "what is the pricing for Business plan?"}))
    print(search_kb.invoke({"query": "do you support Slack integration?"}))
    print(search_kb.invoke({"query": "is my data safe and GDPR compliant?"}))

    # print("\n=== Ticket Creation ===")
    # print(create_ticket.invoke({"subject": "SSO not working", "priority": "high", "description": "Customer reports SAML SSO login fails after IdP update"}))
