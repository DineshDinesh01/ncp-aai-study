# Deployment & NVIDIA Stack — Exam Notes
**Domain weight: ~10-12% of NCP-AAI exam**

---

## NVIDIA Triton Inference Server

### Port Map (memorize this)
| Port | Protocol | Purpose |
|------|----------|---------|
| **8000** | HTTP | Inference requests |
| **8001** | gRPC | Inference requests (preferred for production — ~30% lower overhead) |
| **8002** | Prometheus | Metrics scrape endpoint |

### config.pbtxt (mandatory for every model)
```
name: "my_model"
backend: "tensorrtllm"       # or python, onnxruntime, pytorch
max_batch_size: 8
input [{ name: "input_ids" data_type: TYPE_INT32 dims: [-1] }]
output [{ name: "output_ids" data_type: TYPE_INT32 dims: [-1] }]
```
- **Without config.pbtxt → Triton refuses to load the model**

### Key Metrics (Prometheus)
| Metric | Meaning |
|--------|---------|
| `nv_inference_request_success` | Successful inference count |
| `nv_inference_request_failure` | Failed requests — alert on spike |
| `nv_inference_queue_duration_us` | Wait time in queue (high = GPU saturated) |
| `nv_inference_compute_infer_duration_us` | Actual GPU compute time |
| `nv_gpu_utilization` | GPU utilization % |

### perf_analyzer Concurrency Range
`--concurrency-range 1:16:2` → tests at 1, 3, 5, 7, 9, 11, 13, 15
Format: **min:max:step**

---

## TensorRT-LLM

### Quantization by GPU Generation
| GPU | FP8 | INT8 SmoothQuant | INT4 AWQ |
|-----|-----|-----------------|---------|
| H100 Hopper | ✅ | ✅ | ✅ |
| Ada Lovelace (RTX 40xx) | ✅ | ✅ | ✅ |
| A100 | ❌ | ✅ | ✅ |
| V100 / T4 | ❌ | ✅ (limited) | ✅ |

**FP8 = H100 and Ada ONLY** — exam-critical

### Quantization Trade-offs
| Format | VRAM saving | Quality loss | GPU req |
|--------|------------|--------------|--------|
| FP16 (baseline) | 0% | 0% | Any |
| INT8 W8A8 (SmoothQuant) | ~50% | Minimal | A100+ |
| INT4 W4A16 (AWQ) | ~75% | Small | A100+ |
| FP8 E4M3 | ~50% | Near-zero | H100/Ada |

### In-Flight Batching (Continuous Batching)
- New requests **join** and completed requests **leave** at every token decode step
- Maximizes GPU utilization vs static batching
- Also called: iteration-level batching, continuous batching

### Paged KV Cache
- KV cache split into non-contiguous **pages** (like OS virtual memory)
- Benefits:
  1. Near-zero memory fragmentation
  2. **Prefix caching**: share KV pages across requests with common prefixes
  3. Supports longer sequences

---

## NVIDIA NIMs

### What They Are
- **Containerized inference microservices** for LLMs and other models
- **OpenAI-compatible REST API** at `integrate.api.nvidia.com/v1`
- Drop-in: change `base_url` + `api_key`, existing code works unchanged

### Using NIMs in Code
```python
from openai import OpenAI
client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key="nvapi-xxx"
)
# All existing OpenAI SDK code works unchanged
```

### NIM vs AgentIQ
| Aspect | NIMs | AgentIQ |
|--------|------|---------|
| What | Inference microservice | Workflow toolkit |
| Role | Serve model predictions | Orchestrate agent pipelines |
| Deployment | Docker container | Python library |
| Relationship | AgentIQ workflows CALL NIM endpoints |

---

## NVIDIA AgentIQ

### Key Capabilities
- **langgraph_wrapper**: wrap existing LangGraph graph with profiling
- **Profiling output**: total_latency_ms, total_tokens, total_cost_usd, per-step breakdown
- **Evaluation integration**: push to NeMo Evaluator for CI/CD benchmarking
- **YAML config**: define workflows and models declaratively

### Workflow Types
| Type | Use Case |
|------|---------|
| react_agent | Standard ReAct loop |
| **langgraph_wrapper** | Wrap existing LangGraph graph |
| tool_calling_agent | OpenAI function calling agent |
| custom | Arbitrary async Python function |

---

## NeMo Microservices Ecosystem

| Service | GA | Primary Function |
|---------|-----|----------------|
| **NeMo Curator** | April 2025 | Data curation, deduplication, synthetic data generation |
| **NeMo Customizer** | April 2025 | Fine-tuning via REST API (LoRA, SFT, DPO) |
| **NeMo Evaluator** | April 2025 | 100+ benchmarks, LLM-as-judge, CI/CD integration |
| **NeMo Retriever** | April 2025 | Multimodal RAG: tables, charts, images from PDFs |
| **NeMo Guardrails** | Earlier | Safety rails via Colang DSL |

---

## Exam Quick-Fire Facts

| Question | Answer |
|----------|--------|
| Triton HTTP port | 8000 |
| Triton gRPC port | 8001 |
| Triton metrics port | 8002 |
| Mandatory Triton file | config.pbtxt |
| FP8 GPU requirement | H100 Hopper and Ada Lovelace only |
| In-flight batching | New requests join at every decode step |
| Paged KV cache benefit | Near-zero fragmentation + prefix caching |
| NIM API format | OpenAI-compatible |
| NeMo Customizer rank param | adapter_dim |
| NeMo Curator job | Data curation, deduplication, synthetic data |
