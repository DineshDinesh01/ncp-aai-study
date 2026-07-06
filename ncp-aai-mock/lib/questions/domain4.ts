import { Question } from '../types';

export const domain4Questions: Question[] = [
  { id: 4001, domain: 4, domainName: 'Deployment & Scaling', topic: 'NVIDIA NIM', difficulty: 'easy', keywords: ['NIM', 'microservice', 'containerized', 'inference'],
    question: 'What is NVIDIA NIM (NVIDIA Inference Microservices)?',
    options: { A: 'A Python library for building neural networks', B: 'Pre-built, optimized, containerized microservices for deploying AI models with production-ready APIs', C: 'A network monitoring tool for GPU clusters', D: 'A fine-tuning framework for NVIDIA models' },
    answer: 'B', explanation: 'NIM packages optimized AI models (LLMs, embedding, reranking) into Docker containers with OpenAI-compatible APIs, simplifying production deployment on NVIDIA infrastructure.' },

  { id: 4002, domain: 4, domainName: 'Deployment & Scaling', topic: 'Kubernetes', difficulty: 'medium', keywords: ['Kubernetes', 'K8s', 'orchestration', 'containers'],
    question: 'Why is Kubernetes preferred for deploying production AI agents at scale?',
    options: { A: 'It trains models faster than bare metal', B: 'It provides automated scaling, self-healing, load balancing, and declarative deployment of containerized workloads', C: 'It eliminates the need for GPU hardware', D: 'It provides built-in LLM fine-tuning capabilities' },
    answer: 'B', explanation: 'Kubernetes handles the operational complexity of running many agent containers: auto-scaling on load, restarting failed pods, load balancing, rolling updates.' },

  { id: 4003, domain: 4, domainName: 'Deployment & Scaling', topic: 'Triton Inference Server', difficulty: 'medium', keywords: ['Triton', 'NVIDIA', 'model serving', 'multi-framework'],
    question: 'NVIDIA Triton Inference Server provides which key capabilities? (Choose two)',
    options: { A: 'Serving models from multiple frameworks (TensorRT, PyTorch, ONNX) under a unified API', B: 'Training new models from scratch', C: 'Dynamic batching to improve GPU utilization', D: 'Automatic model architecture search' },
    answer: 'AC', explanation: 'Triton supports multiple framework backends and implements dynamic batching — grouping concurrent requests into optimal batch sizes to maximize GPU throughput.' },

  { id: 4004, domain: 4, domainName: 'Deployment & Scaling', topic: 'Horizontal Scaling', difficulty: 'easy', keywords: ['horizontal scaling', 'replicas', 'load balancer', 'stateless'],
    question: 'Horizontal scaling of AI agent services involves:',
    options: { A: 'Adding more GPU memory to existing servers', B: 'Adding more service replicas behind a load balancer to handle increased concurrent requests', C: 'Increasing the LLM\'s parameter count', D: 'Expanding the agent\'s context window' },
    answer: 'B', explanation: 'Horizontal scaling adds more service instances, distributing load across replicas. This works well for stateless agent services but requires external state management.' },

  { id: 4005, domain: 4, domainName: 'Deployment & Scaling', topic: 'TensorRT-LLM', difficulty: 'hard', keywords: ['TensorRT-LLM', 'optimization', 'quantization', 'throughput'],
    question: 'NVIDIA TensorRT-LLM improves LLM inference performance by:',
    options: { A: 'Using larger batch sizes during training', B: 'Compiling LLM computations into optimized CUDA kernels and supporting quantization for NVIDIA GPUs', C: 'Automatically upgrading to newer GPU models', D: 'Moving computation to CPU for better efficiency' },
    answer: 'B', explanation: 'TensorRT-LLM compiles transformer operations into fused CUDA kernels optimized for specific NVIDIA GPU architectures, with support for FP8/INT8 quantization and paged attention.' },

  { id: 4006, domain: 4, domainName: 'Deployment & Scaling', topic: 'Auto-scaling', difficulty: 'medium', keywords: ['HPA', 'auto-scaling', 'metrics', 'Keda'],
    question: 'For AI agent deployments, which metric is most appropriate for triggering auto-scaling?',
    options: { A: 'CPU temperature', B: 'Request queue depth or GPU utilization as a proxy for inference demand', C: 'Disk I/O operations', D: 'Number of logged-in users' },
    answer: 'B', explanation: 'AI workloads are GPU-bound. Request queue depth (backlog) or GPU utilization better reflects actual inference demand than CPU metrics for scaling decisions.' },

  { id: 4007, domain: 4, domainName: 'Deployment & Scaling', topic: 'Load Balancing', difficulty: 'medium', keywords: ['load balancing', 'round-robin', 'least connections', 'session affinity'],
    question: 'For stateful agent sessions requiring conversation history, the load balancer should use:',
    options: { A: 'Random routing to any available instance', B: 'Session affinity (sticky sessions) to route each user consistently to the same instance', C: 'Round-robin across all instances', D: 'The geographically nearest instance only' },
    answer: 'B', explanation: 'Stateful agents need session affinity so follow-up requests reach the instance holding that session\'s state. Alternatively, externalize state to Redis and use any load balancing strategy.' },

  { id: 4008, domain: 4, domainName: 'Deployment & Scaling', topic: 'Containerization', difficulty: 'easy', keywords: ['Docker', 'container', 'image', 'deployment'],
    question: 'Containerizing AI agent applications with Docker ensures:',
    options: { A: 'The agent runs faster due to container optimization', B: 'Consistent, reproducible deployment across development, staging, and production environments', C: 'Automatic GPU driver updates', D: 'Reduced model parameter count' },
    answer: 'B', explanation: 'Docker containers package the agent code, dependencies, and configuration into an immutable image, eliminating "works on my machine" issues across environments.' },

  { id: 4009, domain: 4, domainName: 'Deployment & Scaling', topic: 'Model Quantization', difficulty: 'medium', keywords: ['quantization', 'INT8', 'FP16', 'memory'],
    question: 'INT8 quantization of an LLM reduces memory usage by approximately:',
    options: { A: '10%', B: '25%', C: '50% (FP16→INT8)', D: '75%' },
    answer: 'C', explanation: 'INT8 uses 1 byte per weight vs FP16\'s 2 bytes, roughly halving model memory footprint while maintaining acceptable accuracy with proper calibration.' },

  { id: 4010, domain: 4, domainName: 'Deployment & Scaling', topic: 'Blue-Green Deployment', difficulty: 'medium', keywords: ['blue-green', 'zero downtime', 'rollback', 'deployment'],
    question: 'Blue-green deployment for AI agent services provides:',
    options: { A: 'Coloring the UI blue and green for different users', B: 'Zero-downtime deployments with instant rollback by maintaining two identical production environments', C: 'A/B testing between two model versions simultaneously', D: 'GPU cluster cooling using blue and green colored cooling systems' },
    answer: 'B', explanation: 'Blue-green runs two production environments. Traffic shifts from blue (old) to green (new) atomically, and rollback is instant by shifting traffic back to blue.' },

  { id: 4011, domain: 4, domainName: 'Deployment & Scaling', topic: 'Canary Deployment', difficulty: 'medium', keywords: ['canary', 'gradual rollout', 'risk mitigation', 'percentage traffic'],
    question: 'Canary deployments roll out new agent versions by:',
    options: { A: 'Testing only on canary birds (a mascot server)', B: 'Gradually shifting a small percentage of traffic to the new version, monitoring for issues before full rollout', C: 'Deploying only during nighttime hours', D: 'Testing on a single geographic region first' },
    answer: 'B', explanation: 'Canary deployments send 1-5% of traffic to the new version first. If metrics are healthy, traffic shifts gradually to 100%, limiting blast radius of bad deployments.' },

  { id: 4012, domain: 4, domainName: 'Deployment & Scaling', topic: 'Latency Optimization', difficulty: 'hard', keywords: ['latency', 'P99', 'tail latency', 'optimization'],
    question: 'Which strategies reduce LLM inference latency in production? (Choose two)',
    options: { A: 'KV-cache to avoid recomputing attention for previously seen tokens', B: 'Increasing model parameter count', C: 'Speculative decoding to generate multiple tokens per forward pass', D: 'Synchronous blocking I/O for all requests' },
    answer: 'AC', explanation: 'KV-cache avoids redundant attention computation for cached tokens. Speculative decoding uses a small draft model to propose tokens verified in parallel by the large model, reducing steps.' },

  { id: 4013, domain: 4, domainName: 'Deployment & Scaling', topic: 'GPU Resource Management', difficulty: 'medium', keywords: ['GPU', 'MIG', 'resource', 'partition'],
    question: 'NVIDIA Multi-Instance GPU (MIG) technology enables:',
    options: { A: 'Running multiple GPUs as one large virtual GPU', B: 'Partitioning a single A100/H100 GPU into isolated instances for concurrent workloads', C: 'Moving computation between CPU and GPU automatically', D: 'Distributing model training across internet-connected GPUs' },
    answer: 'B', explanation: 'MIG creates up to 7 isolated GPU instances from a single A100/H100, each with dedicated compute/memory, enabling safe multi-tenant inference without contention.' },

  { id: 4014, domain: 4, domainName: 'Deployment & Scaling', topic: 'Paged Attention', difficulty: 'hard', keywords: ['PagedAttention', 'vLLM', 'KV cache', 'memory'],
    question: 'PagedAttention (used in vLLM) improves LLM serving efficiency by:',
    options: { A: 'Paginating the model\'s output to users in pages', B: 'Managing KV cache memory in fixed-size pages, enabling dynamic allocation and sharing across requests', C: 'Loading model weights page by page from disk', D: 'Using virtual memory for gradient storage during training' },
    answer: 'B', explanation: 'PagedAttention eliminates KV cache fragmentation by using OS-inspired paging. This allows vLLM to serve 2-4x more concurrent requests on the same hardware vs naive KV allocation.' },

  { id: 4015, domain: 4, domainName: 'Deployment & Scaling', topic: 'Microservices Architecture', difficulty: 'medium', keywords: ['microservices', 'decoupling', 'service mesh', 'API gateway'],
    question: 'In a microservices architecture for AI agents, an API gateway provides:',
    options: { A: 'A user interface for the agent', B: 'A single entry point handling authentication, routing, rate limiting, and load balancing for all agent services', C: 'A database for storing agent conversations', D: 'A GPU scheduler for model inference' },
    answer: 'B', explanation: 'API gateways (Kong, AWS API Gateway) centralize cross-cutting concerns — auth, rate limits, SSL termination, request routing — keeping individual microservices lean.' },

  { id: 4016, domain: 4, domainName: 'Deployment & Scaling', topic: 'Monitoring', difficulty: 'easy', keywords: ['monitoring', 'Prometheus', 'Grafana', 'metrics'],
    question: 'For production AI agent monitoring, which metrics should be tracked? (Choose two)',
    options: { A: 'Request latency (P50, P95, P99) for each service', B: 'The number of parameters in the deployed model', C: 'Error rates and failed tool call rates', D: 'The developer\'s coffee consumption' },
    answer: 'AC', explanation: 'Latency percentiles detect performance degradation. Error rates reveal failing components. Both are essential SLO indicators for production AI agent services.' },

  { id: 4017, domain: 4, domainName: 'Deployment & Scaling', topic: 'Distributed Tracing', difficulty: 'medium', keywords: ['distributed tracing', 'Jaeger', 'OpenTelemetry', 'span'],
    question: 'Distributed tracing in multi-agent systems helps identify:',
    options: { A: 'Which GPU is running the hottest', B: 'Latency bottlenecks across the full request path spanning multiple services and LLM calls', C: 'The agent\'s geographic distribution', D: 'Which team member wrote each service' },
    answer: 'B', explanation: 'Distributed traces capture timing across service boundaries with context propagation, revealing exactly where time is spent in complex multi-agent, multi-service call chains.' },

  { id: 4018, domain: 4, domainName: 'Deployment & Scaling', topic: 'Cost Optimization', difficulty: 'medium', keywords: ['cost', 'spot instances', 'caching', 'optimization'],
    question: 'Which strategies reduce LLM inference costs in production? (Choose two)',
    options: { A: 'Semantic caching of common queries to avoid redundant LLM calls', B: 'Using the largest available model for all tasks', C: 'Routing simple queries to smaller, cheaper models (model routing)', D: 'Disabling all monitoring to save on data storage' },
    answer: 'AC', explanation: 'Semantic caching serves cached responses for semantically similar queries. Model routing matches task complexity to the cheapest adequate model, with large models only for complex tasks.' },

  { id: 4019, domain: 4, domainName: 'Deployment & Scaling', topic: 'Helm Charts', difficulty: 'medium', keywords: ['Helm', 'chart', 'Kubernetes', 'package'],
    question: 'Helm charts in Kubernetes deployments of AI agents provide:',
    options: { A: 'GPU performance tuning dashboards', B: 'Templated, versioned packages of Kubernetes manifests for repeatable, configurable deployments', C: 'Helm navigation for distributed GPU clusters', D: 'Automatic model fine-tuning pipelines' },
    answer: 'B', explanation: 'Helm packages Kubernetes manifests into versioned charts with configurable values, enabling one-command deployment and upgrade of complex multi-component AI agent stacks.' },

  { id: 4020, domain: 4, domainName: 'Deployment & Scaling', topic: 'Multi-GPU Inference', difficulty: 'hard', keywords: ['tensor parallelism', 'pipeline parallelism', 'multi-GPU', 'sharding'],
    question: 'Tensor parallelism in multi-GPU LLM inference refers to:',
    options: { A: 'Running different model versions on different GPUs', B: 'Splitting individual model layers across multiple GPUs so each processes a slice of the tensor', C: 'Distributing batches of requests across GPUs', D: 'Storing different training epochs on different GPUs' },
    answer: 'B', explanation: 'Tensor parallelism shards each layer horizontally — each GPU computes a portion of the matrix multiplication, reducing per-GPU memory and enabling models too large for a single GPU.' },

  { id: 4021, domain: 4, domainName: 'Deployment & Scaling', topic: 'Health Checks', difficulty: 'easy', keywords: ['health check', 'readiness', 'liveness', 'Kubernetes'],
    question: 'The difference between liveness and readiness probes in Kubernetes is:',
    options: { A: 'Liveness checks disk health; readiness checks network health', B: 'Liveness restarts unhealthy pods; readiness gates traffic (stops sending requests to warming-up pods)', C: 'Liveness is for CPU; readiness is for GPU', D: 'They are identical with different names' },
    answer: 'B', explanation: 'Liveness probe failure triggers pod restart (app is deadlocked). Readiness probe failure removes the pod from the load balancer (LLM model still loading) without restarting it.' },

  { id: 4022, domain: 4, domainName: 'Deployment & Scaling', topic: 'Service Mesh', difficulty: 'hard', keywords: ['Istio', 'service mesh', 'mTLS', 'traffic management'],
    question: 'A service mesh like Istio benefits multi-agent deployments by providing:',
    options: { A: 'A mesh topology for GPU interconnects', B: 'Automatic mTLS between services, traffic management, and observability without changing application code', C: 'LLM mesh networking for distributed inference', D: 'A mesh of pre-trained model checkpoints' },
    answer: 'B', explanation: 'Istio injects sidecar proxies that handle service-to-service mTLS encryption, circuit breaking, retries, and telemetry transparently — without modifying agent code.' },

  { id: 4023, domain: 4, domainName: 'Deployment & Scaling', topic: 'Semantic Caching', difficulty: 'medium', keywords: ['semantic cache', 'GPTCache', 'similarity threshold', 'cost reduction'],
    question: 'Semantic caching for LLM applications differs from traditional caching by:',
    options: { A: 'Storing responses in RAM instead of disk', B: 'Returning cached responses for semantically similar queries (not just exact matches) using embedding similarity', C: 'Caching only semantic (meaning-bearing) words', D: 'Using semantics to choose cache eviction policies' },
    answer: 'B', explanation: 'Semantic caches embed incoming queries and check similarity against cached queries. Above a threshold, the cached response is returned without an LLM call, saving cost and latency.' },

  { id: 4024, domain: 4, domainName: 'Deployment & Scaling', topic: 'Environment Configuration', difficulty: 'easy', keywords: ['ConfigMap', 'Secret', 'environment', 'Kubernetes'],
    question: 'Kubernetes Secrets vs ConfigMaps differ in:',
    options: { A: 'Secrets are stored in etcd encrypted; ConfigMaps store non-sensitive configuration', B: 'ConfigMaps support more data formats', C: 'Secrets are faster to read than ConfigMaps', D: 'They are identical with different names' },
    answer: 'A', explanation: 'Secrets are base64-encoded and typically encrypted at rest for sensitive data (API keys, passwords). ConfigMaps store non-sensitive configuration data (URLs, feature flags).' },

  { id: 4025, domain: 4, domainName: 'Deployment & Scaling', topic: 'Throughput vs Latency', difficulty: 'medium', keywords: ['throughput', 'latency', 'tradeoff', 'batching'],
    question: 'In LLM serving, increasing batch size generally:',
    options: { A: 'Decreases both throughput and latency', B: 'Increases throughput (tokens/second) but increases latency for individual requests', C: 'Decreases throughput while improving individual request latency', D: 'Has no effect on either metric' },
    answer: 'B', explanation: 'Larger batches better utilize GPU matrix operations, improving total throughput. But requests wait longer to form the batch, increasing individual request latency — a classic tradeoff.' },

  { id: 4026, domain: 4, domainName: 'Deployment & Scaling', topic: 'Model Registry', difficulty: 'medium', keywords: ['model registry', 'MLflow', 'versioning', 'artifact'],
    question: 'A model registry in MLOps serves what purpose?',
    options: { A: 'Registers user accounts for model access', B: 'Centrally stores, versions, and manages ML model artifacts with metadata for deployment lifecycle', C: 'Tracks GPU hardware inventory', D: 'Manages DNS registration for AI services' },
    answer: 'B', explanation: 'Model registries (MLflow, W&B, SageMaker) version model artifacts, track lineage, manage lifecycle stages (staging/production), and serve as the source of truth for deployed models.' },

  { id: 4027, domain: 4, domainName: 'Deployment & Scaling', topic: 'Serverless AI', difficulty: 'medium', keywords: ['serverless', 'Lambda', 'scale to zero', 'cold start'],
    question: 'The main challenge of deploying LLM agents on serverless platforms (AWS Lambda, Cloud Run) is:',
    options: { A: 'Serverless platforms don\'t support Python', B: 'Cold start latency — loading multi-GB model weights into memory on first request', C: 'Serverless platforms are more expensive than dedicated servers', D: 'Serverless cannot handle concurrent requests' },
    answer: 'B', explanation: 'LLM models are multi-GB in size. Serverless cold starts involve downloading and loading these weights, causing 30-120+ second delays unacceptable for interactive agents.' },

  { id: 4028, domain: 4, domainName: 'Deployment & Scaling', topic: 'NVIDIA AI Workbench', difficulty: 'medium', keywords: ['AI Workbench', 'development', 'GPU', 'NVIDIA'],
    question: 'NVIDIA AI Workbench is designed for:',
    options: { A: 'Physical workbench ergonomics for AI researchers', B: 'Simplifying AI development environment setup and enabling seamless transition from local to cloud GPU development', C: 'Workbench-style dashboard for monitoring GPU clusters', D: 'Automated workload benchmarking for AI models' },
    answer: 'B', explanation: 'NVIDIA AI Workbench provides a unified dev environment that works identically on local NVIDIA GPU, cloud, and datacenter, simplifying environment management for AI projects.' },

  { id: 4029, domain: 4, domainName: 'Deployment & Scaling', topic: 'Rolling Updates', difficulty: 'easy', keywords: ['rolling update', 'zero downtime', 'Kubernetes', 'maxSurge'],
    question: 'Kubernetes rolling updates ensure zero downtime by:',
    options: { A: 'Stopping all old pods before starting new ones', B: 'Gradually replacing old pod instances with new ones, maintaining minimum availability throughout', C: 'Rolling back any failing deployments automatically', D: 'Running updates only during maintenance windows' },
    answer: 'B', explanation: 'Rolling updates bring up new pods one at a time (configurable maxSurge/maxUnavailable), keeping the old version running until new pods pass readiness checks.' },

  { id: 4030, domain: 4, domainName: 'Deployment & Scaling', topic: 'vLLM', difficulty: 'medium', keywords: ['vLLM', 'serving', 'throughput', 'OpenAI compatible'],
    question: 'vLLM is widely used for LLM serving because it provides:',
    options: { A: 'Visual interface for LLM management', B: 'High-throughput serving with PagedAttention and an OpenAI-compatible API', C: 'Video generation capabilities for LLMs', D: 'Vertical scaling of model parameters' },
    answer: 'B', explanation: 'vLLM\'s PagedAttention enables 2-4x higher throughput vs naive serving. Its OpenAI-compatible REST API allows drop-in replacement for OpenAI calls in existing agent code.' },
];
