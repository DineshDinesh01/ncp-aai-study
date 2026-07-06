import { Question } from '../types';

export const domain7PrepartoQuestions: Question[] = [
  {
    id: 7801,
    domain: 7,
    domainName: 'NVIDIA Platform Implementation',
    topic: 'Scenario: NIM Microservice Deployment',
    question: 'Your team is deploying Llama-3.1-70B-Instruct for an enterprise agentic application. You want to avoid cloud API dependencies for data sovereignty reasons and need OpenAI-compatible endpoints for your existing codebase. Which NVIDIA product enables this, and what is the minimum required environment?',
    options: {
      A: 'NVIDIA NeMo Framework — run nemo train --inference-mode on any Linux server.',
      B: 'NVIDIA NIM (Inference Microservice) — pull the certified container from NGC (nvcr.io/nim/meta/llama-3.1-70b-instruct), deploy on a server with compatible NVIDIA GPUs (A100, H100, or supported RTX), and get OpenAI-compatible /v1/chat/completions endpoint with TensorRT-LLM backend.',
      C: 'NVIDIA AI Workbench — launch the Llama-3.1-70B model from the workbench catalog on any developer laptop.',
      D: 'NVIDIA NGC catalog — download model weights directly and serve with any Python HTTP server.'
    },
    answer: 'B',
    explanation: 'NIM (B) is the correct answer: (1) NGC-hosted certified containers provide a one-pull deployment. (2) Compatible GPUs with sufficient VRAM (A100 80GB for 70B in fp16, or 4×A10G with tensor parallelism). (3) OpenAI-compatible endpoints enable zero-code-change integration. NeMo (A) is a training framework, not a one-command inference deployment. AI Workbench (C) is a dev environment — 70B models don\'t run on developer laptops. NGC weights (D) require manual serving setup.',
    keywords: ['NIM', 'NGC', 'Llama', 'data sovereignty', 'OpenAI-compatible'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 7802,
    domain: 7,
    domainName: 'NVIDIA Platform Implementation',
    topic: 'Scenario: NVIDIA AI Enterprise',
    question: 'Your enterprise IT team evaluates NVIDIA AI Enterprise (NVAIE) for standardizing AI infrastructure. Select TWO capabilities NVAIE provides that differentiate it from using open-source NVIDIA tools directly.',
    options: {
      A: 'NVAIE provides enterprise-grade support SLAs, security patches, CVE updates, and certified container images for the full NVIDIA AI software stack (NIM, NeMo, RAPIDS, Triton) — ensuring production reliability and compliance requirements.',
      B: 'NVAIE automatically tunes all hyperparameters for any model training job without user input.',
      C: 'NVAIE includes access to NVIDIA AI Enterprise License that unlocks additional GPU performance not available on the same hardware without the license.',
      D: 'NVAIE provides certified integrations with enterprise platforms (VMware vSphere, Red Hat OpenShift, cloud providers) enabling deployment on existing enterprise infrastructure.',
      E: 'NVAIE replaces the need for Kubernetes in enterprise AI deployments by providing its own container orchestration platform.'
    },
    answer: 'AD',
    explanation: '(A) Enterprise support and certified security-patched containers are NVAIE\'s primary value proposition for enterprise buyers — open-source tools have no SLA. (D) Certified enterprise platform integrations (VMware, OpenShift, AWS/Azure/GCP marketplace) are documented NVAIE features enabling deployment on existing approved enterprise infrastructure. Option B is fabricated — NVAIE doesn\'t auto-tune hyperparameters. Option C is false — NVAIE doesn\'t unlock additional hardware performance. Option E is false — NVAIE works with Kubernetes.',
    keywords: ['NVIDIA AI Enterprise', 'NVAIE', 'enterprise support', 'certified containers', 'OpenShift'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 7803,
    domain: 7,
    domainName: 'NVIDIA Platform Implementation',
    topic: 'Scenario: NVIDIA Blueprints',
    question: 'Your team wants to build an enterprise RAG chatbot with NVIDIA\'s recommended architecture. Rather than architecting from scratch, you evaluate NVIDIA Blueprints. What does an NVIDIA Blueprint provide, and which blueprint is MOST relevant for this use case?',
    options: {
      A: 'NVIDIA Blueprints are code templates for CUDA programming; the "CUDA RAG Blueprint" provides GPU-accelerated text processing kernels.',
      B: 'NVIDIA Blueprints are reference architectures with production-ready code, container configurations, and deployment guides for common agentic AI use cases. The "RAG" or "PDF to Podcast" blueprint provides a complete pipeline: NeMo Retriever for embeddings, Milvus for vector storage, NIM for LLM serving — deployable via Helm charts.',
      C: 'NVIDIA Blueprints are benchmark suites for measuring GPU performance on AI workloads.',
      D: 'NVIDIA Blueprints are pre-trained models fine-tuned for specific industries, downloadable from NGC.'
    },
    answer: 'B',
    explanation: 'NVIDIA Blueprints (B) are reference architectures for common AI application patterns: complete code + configuration + deployment guides, integrating NVIDIA\'s recommended stack (NeMo Retriever embeddings, Milvus vector DB, NIM for LLM). The enterprise RAG blueprint provides everything needed to deploy a production RAG system. Option A confuses Blueprints with CUDA samples. Option C describes benchmarks (MLPerf). Option D describes NGC model catalog.',
    keywords: ['NVIDIA Blueprints', 'reference architecture', 'RAG blueprint', 'Helm', 'NeMo Retriever'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 7804,
    domain: 7,
    domainName: 'NVIDIA Platform Implementation',
    topic: 'Scenario: NeMo Framework for Training',
    question: 'Your team needs to fine-tune a 13B parameter model on 50K proprietary medical records using NeMo Framework. Select TWO NeMo Framework capabilities that facilitate this fine-tuning task.',
    options: {
      A: 'NeMo\'s P-Tuning and Prompt Learning modules enable parameter-efficient fine-tuning by learning soft prompt vectors prepended to inputs, without modifying model weights — useful when full fine-tuning risks catastrophic forgetting.',
      B: 'NeMo automatically generates synthetic training data from the 50K records to expand the dataset to 500K without human review.',
      C: 'NeMo supports distributed training with Tensor Parallelism, Pipeline Parallelism, and Data Parallelism (via Megatron-LM) enabling fine-tuning of 13B+ models across multiple GPUs that wouldn\'t fit on a single GPU.',
      D: 'NeMo compresses the 13B model to 1B parameters automatically during fine-tuning to fit consumer hardware.',
      E: 'NeMo\'s built-in de-identification tools automatically mask PHI (Protected Health Information) in medical training data before fine-tuning.'
    },
    answer: 'AC',
    explanation: '(A) P-Tuning and Prompt Learning are documented NeMo parameter-efficient fine-tuning methods — learning soft prompt embeddings rather than adjusting all model weights. (C) NeMo\'s Megatron-LM integration provides 3D parallelism (tensor + pipeline + data) for training large models across multiple GPUs — essential for 13B models that don\'t fit on a single GPU. Option B is false — NeMo doesn\'t auto-generate synthetic data. Option D is false — NeMo doesn\'t auto-compress models. Option E is a NeMo Curator/Privacy capability, not NeMo Framework fine-tuning.',
    keywords: ['NeMo Framework', 'P-Tuning', 'Megatron-LM', 'distributed training', 'parallelism'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 7805,
    domain: 7,
    domainName: 'NVIDIA Platform Implementation',
    topic: 'Scenario: NGC Catalog Usage',
    question: 'A data scientist needs to start a new computer vision project and wants to leverage NVIDIA\'s pre-trained models and development containers. Which NVIDIA resource provides access to pre-trained models, containers, Helm charts, and fine-tuning scripts in a single curated catalog?',
    options: {
      A: 'NVIDIA Developer Zone (developer.nvidia.com) — the public documentation site.',
      B: 'NVIDIA NGC (nvcr.io) — the GPU-optimized software hub containing pre-trained models, NIM containers, Jupyter notebooks, Helm charts, and benchmark datasets from NVIDIA and partners.',
      C: 'NVIDIA AI Workbench — a local desktop tool for running experiments.',
      D: 'NVIDIA CUDA Toolkit — the GPU programming toolkit containing drivers and libraries.'
    },
    answer: 'B',
    explanation: 'NVIDIA NGC (B) is the curated catalog: pre-trained models (ResNet, BERT, LLaMA), NIM containers (nvcr.io/nim/...), Helm charts for Kubernetes deployment, fine-tuning notebooks, and benchmark datasets. Everything is optimized for NVIDIA GPUs and versioned for reproducibility. Developer Zone (A) is documentation. AI Workbench (C) is a development environment. CUDA Toolkit (D) is the low-level GPU programming SDK.',
    keywords: ['NGC', 'nvcr.io', 'pre-trained models', 'Helm charts', 'NIM containers'],
    difficulty: 'easy',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 7806,
    domain: 7,
    domainName: 'NVIDIA Platform Implementation',
    topic: 'CUDA-X AI Stack',
    question: 'Select TWO accurate statements about the NVIDIA CUDA-X AI software stack and its role in accelerating agentic AI workloads.',
    options: {
      A: 'CUDA-X AI provides domain-specific libraries (cuDNN for deep learning primitives, cuBLAS for linear algebra, cuVS for vector similarity) that application frameworks like PyTorch and NeMo use internally, providing GPU acceleration without requiring developers to write CUDA code directly.',
      B: 'CUDA-X AI libraries only work with NVIDIA\'s proprietary model formats and cannot accelerate models from the open-source PyTorch or TensorFlow ecosystems.',
      C: 'RAPIDS (part of CUDA-X AI) provides GPU-accelerated data processing (cuDF for DataFrames, cuML for ML algorithms) that can accelerate the data pipeline stages of agentic workflows, such as preprocessing retrieved documents or processing structured data tool outputs.',
      D: 'CUDA-X AI requires developers to convert all models to CUDA C++ code before deployment.',
      E: 'cuDNN and cuBLAS are optional add-ons that only benefit models larger than 70B parameters.'
    },
    answer: 'AC',
    explanation: '(A) CUDA-X AI\'s layered design is correct: application frameworks (PyTorch, TensorFlow, NeMo) call cuDNN/cuBLAS under the hood — developers get GPU acceleration through familiar frameworks without writing CUDA. (C) RAPIDS acceleration of data processing is directly relevant to agentic AI: preprocessing thousands of retrieved documents, running ML on structured data from tool calls — these are common agentic data pipeline operations. Option B is false — CUDA-X AI libraries accelerate any framework using NVIDIA GPUs. Option D is false — developers use Python/framework APIs. Option E is false — cuDNN/cuBLAS are used for all model sizes.',
    keywords: ['CUDA-X AI', 'cuDNN', 'RAPIDS', 'cuBLAS', 'GPU acceleration'],
    difficulty: 'medium',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 7807,
    domain: 7,
    domainName: 'NVIDIA Platform Implementation',
    topic: 'Scenario: NVIDIA AI Workbench',
    question: 'A machine learning engineer joins a team that uses NVIDIA AI Workbench for experiment management. They need to run a NeMo fine-tuning experiment on a local RTX 4090 and then scale it to an A100 cluster. What does NVIDIA AI Workbench enable in this scenario?',
    options: {
      A: 'AI Workbench provides a unified development environment that runs the same containerized project on local GPU hardware (RTX 4090) and can connect to and launch the same project on remote GPU clusters (A100) — with environment reproducibility guaranteed by container versioning.',
      B: 'AI Workbench automatically optimizes the model architecture for each hardware target, producing different model files for RTX vs A100.',
      C: 'AI Workbench streams GPU compute from the remote A100 to appear as local compute on the engineer\'s laptop.',
      D: 'AI Workbench is a cloud service that requires an internet connection and cannot run on local hardware.'
    },
    answer: 'A',
    explanation: 'NVIDIA AI Workbench (A) is a development environment manager: (1) Local dev: run on RTX 4090 with the full project container. (2) Remote scale: connect to remote GPU cluster (NGC, cloud, on-prem) and launch the same container — same environment, same code, same configurations. Container-based reproducibility eliminates "works on my machine" issues. Option B is false — Workbench doesn\'t change model architecture. Option C is false — it manages environments, doesn\'t stream GPU compute. Option D is false — it runs locally.',
    keywords: ['AI Workbench', 'local development', 'remote cluster', 'containerized', 'reproducibility'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 7808,
    domain: 7,
    domainName: 'NVIDIA Platform Implementation',
    topic: 'Scenario: NVIDIA ACE for Avatar Agents',
    question: 'Your company wants to build an interactive avatar-based customer service agent that speaks naturally, animates facial expressions to match speech, and understands spoken user queries. Which NVIDIA technology stack addresses this multi-modal interactive agent requirement?',
    options: {
      A: 'NVIDIA NIM microservices for LLM + standard TTS/STT libraries.',
      B: 'NVIDIA ACE (Avatar Cloud Engine): integrates Riva (ASR+TTS), Audio2Face (speech-to-facial animation), NIM (LLM response generation), and NeMo (speech synthesis) into a unified pipeline for real-time interactive digital human agents.',
      C: 'NVIDIA Omniverse for 3D rendering + a separately hosted LLM with no speech capability.',
      D: 'NVIDIA CUDA for low-level GPU programming + OpenCV for face detection.'
    },
    answer: 'B',
    explanation: 'NVIDIA ACE (B) is the purpose-built stack for interactive avatar agents: Riva handles speech recognition (user query → text) and synthesis (text → lifelike speech); Audio2Face drives real-time facial animation synchronized to speech; NIM provides the LLM reasoning backbone. These are integrated in ACE\'s pipeline for digital human applications. Option A lacks facial animation and uses generic TTS. Option C (Omniverse alone) is a rendering platform without the AI speech pipeline. Option D is low-level GPU programming, not an avatar framework.',
    keywords: ['NVIDIA ACE', 'Avatar Cloud Engine', 'Riva', 'Audio2Face', 'digital human'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 7809,
    domain: 7,
    domainName: 'NVIDIA Platform Implementation',
    topic: 'NIM API Compatibility',
    question: 'Select TWO accurate statements about NVIDIA NIM\'s API compatibility that make it suitable for enterprises with existing LLM application infrastructure.',
    options: {
      A: 'NIM implements the OpenAI Chat Completions API (/v1/chat/completions) and Embeddings API (/v1/embeddings), meaning any application built against the OpenAI Python client or REST API can switch to NIM by changing only the base_url parameter.',
      B: 'NIM requires a custom NVIDIA SDK to be installed in the application codebase — it is not compatible with the OpenAI Python client.',
      C: 'NIM supports streaming responses using the same Server-Sent Events (SSE) format as OpenAI, enabling streaming-compatible LangChain, LlamaIndex, and custom streaming applications to work without code changes.',
      D: 'NIM\'s OpenAI-compatible API is limited to text-only models — multi-modal NIM models (vision-language) require a different API format.',
      E: 'NIM automatically translates all OpenAI API calls to the Anthropic API format, providing a universal proxy.'
    },
    answer: 'AC',
    explanation: '(A) NIM\'s OpenAI-compatible endpoint is its primary integration feature: set openai.base_url = "http://nim-host:8000/v1" and openai.api_key = "nim-key" — the same OpenAI Python client works unchanged. This is documented and is NIM\'s core value for enterprises with existing OpenAI-based code. (C) Streaming via SSE in the same format as OpenAI is also supported — LangChain\'s streaming callbacks and LlamaIndex\'s async streaming work with NIM without modification. Option B is false. Option D is false — vision NIM models use the same API format. Option E is fabricated.',
    keywords: ['NIM', 'OpenAI-compatible', 'base_url', 'streaming', 'SSE'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 7810,
    domain: 7,
    domainName: 'NVIDIA Platform Implementation',
    topic: 'Scenario: Omniverse for Simulation',
    question: 'A robotics company uses agentic AI to control warehouse robots. They need to test agent policies in simulation before deploying to physical robots. Which NVIDIA platform provides a physics-accurate simulation environment for testing AI agent policies?',
    options: {
      A: 'NVIDIA DRIVE — the autonomous vehicle platform.',
      B: 'NVIDIA Isaac Sim (built on Omniverse) — a physically accurate robotics simulation environment that uses NVIDIA PhysX for rigid body dynamics and ray tracing for photorealistic sensor simulation, enabling agent policy testing in sim before real-world deployment.',
      C: 'NVIDIA NIM — deploy the agent as a microservice and test it against a virtual robot API.',
      D: 'NVIDIA AI Workbench — run simulation experiments in a local container.'
    },
    answer: 'B',
    explanation: 'NVIDIA Isaac Sim (B), built on Omniverse, is the standard answer for robotics simulation: PhysX provides physics accuracy; RTX ray tracing generates photorealistic camera/sensor data; ROS2 integration means policies tested in sim transfer to real robots (sim-to-real). NVIDIA DRIVE (A) is for autonomous vehicles, not warehouse robots. NIM (C) is an inference microservice, not a simulation environment. AI Workbench (D) is a development environment manager.',
    keywords: ['Isaac Sim', 'Omniverse', 'simulation', 'robotics', 'PhysX'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 7811,
    domain: 7,
    domainName: 'NVIDIA Platform Implementation',
    topic: 'TensorRT-LLM vs vLLM',
    question: 'Select TWO accurate statements about choosing between TensorRT-LLM and vLLM for LLM inference in an NVIDIA GPU environment.',
    options: {
      A: 'TensorRT-LLM provides deeper NVIDIA hardware optimization (kernel fusion, FP8 quantization, custom CUDA kernels for specific GPU architectures like H100) but requires a compilation step per model configuration; vLLM is framework-agnostic, easier to set up, and supports rapid model switching.',
      B: 'vLLM only supports NVIDIA GPUs, while TensorRT-LLM supports both NVIDIA and AMD GPUs.',
      C: 'TensorRT-LLM achieves the highest throughput for fixed model configurations on NVIDIA hardware (especially H100/A100) due to hardware-specific optimizations; vLLM\'s PagedAttention and continuous batching excel at maximizing concurrency for variable-length workloads.',
      D: 'vLLM and TensorRT-LLM are functionally identical — the only difference is the company that maintains them.',
      E: 'TensorRT-LLM cannot serve more than one model simultaneously on a single GPU.'
    },
    answer: 'AC',
    explanation: '(A) Describes the fundamental tradeoff: TensorRT-LLM compiles model-specific kernels for maximum throughput (15-30% better than vLLM on H100 for fixed workloads) but requires recompilation for each model configuration change. vLLM is dynamic (no compilation), making it better for rapid experimentation. (C) Completes the picture: TensorRT-LLM\'s H100-optimized kernels provide best-in-class throughput for production fixed-model deployments; vLLM\'s PagedAttention provides best concurrency management for mixed-length request patterns. Option B is false — vLLM supports AMD ROCm. Option D is false — they have fundamentally different architectures. Option E is false.',
    keywords: ['TensorRT-LLM', 'vLLM', 'PagedAttention', 'H100', 'throughput comparison'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 7812,
    domain: 7,
    domainName: 'NVIDIA Platform Implementation',
    topic: 'Scenario: Multi-GPU Tensor Parallelism',
    question: 'You are deploying a 70B parameter model in fp16 (requires ~140GB VRAM). You have 4 × A100 40GB GPUs available (total 160GB). Which parallelism strategy fits the model across these 4 GPUs in NIM/TensorRT-LLM?',
    options: {
      A: 'Data parallelism — run 4 copies of the model, one per GPU, each handling different batches.',
      B: 'Tensor parallelism (TP=4) — split each model layer\'s weight matrices across all 4 GPUs, so each GPU holds 1/4 of every layer. A single forward pass requires all 4 GPUs to communicate (all-reduce) at each layer, but the 140GB model fits in 4×35GB per GPU.',
      C: 'Pipeline parallelism (PP=4) — assign sequential model layers to different GPUs (GPU 1: layers 1-20, GPU 2: layers 21-40, etc.).',
      D: 'Model parallelism is not supported in NIM — you must upgrade to 80GB A100s.'
    },
    answer: 'B',
    explanation: 'Tensor parallelism (B, TP=4) is the correct choice for fitting a model that exceeds single-GPU memory: each GPU holds 140GB/4 = 35GB of model weights (fits in 40GB). All-reduce communication between GPUs at each layer adds latency but is manageable on NVLink. Pipeline parallelism (C) would work but creates pipeline bubbles (idle GPUs waiting for the previous stage). Data parallelism (A) requires each GPU to hold the full model — impossible at 140GB on 40GB GPUs. Option D is false — NIM and TensorRT-LLM support both TP and PP.',
    keywords: ['tensor parallelism', 'model parallelism', 'A100', 'distributed inference', 'NVLink'],
    difficulty: 'hard',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 7813,
    domain: 7,
    domainName: 'NVIDIA Platform Implementation',
    topic: 'NVIDIA Platform Stack Layers',
    question: 'Select TWO accurate statements about how the layers of the NVIDIA AI platform stack relate to each other in a production agentic deployment.',
    options: {
      A: 'NIM microservices sit at the application layer, consuming optimized inference from TensorRT-LLM or Triton at the serving layer, which in turn uses cuDNN/cuBLAS CUDA-X AI libraries for GPU-accelerated compute — creating a clean abstraction hierarchy.',
      B: 'NeMo Framework and NIM are interchangeable — any model trained in NeMo can be served directly by NIM without any format conversion.',
      C: 'NVIDIA AI Enterprise provides enterprise support and certified containers for the entire stack (NIM, NeMo, Triton, RAPIDS), enabling production deployment with compliance requirements.',
      D: 'The CUDA driver is optional for NIM deployments — NIM can run on CPUs without any NVIDIA GPU hardware.',
      E: 'NGC is only accessible to customers with active NVIDIA AI Enterprise licenses.'
    },
    answer: 'AC',
    explanation: '(A) Correctly describes the platform abstraction hierarchy: CUDA-X AI → Triton/TRT-LLM → NIM → Applications. Each layer abstracts the one below, allowing application developers to use NIM\'s API without knowing CUDA. (C) NVIDIA AI Enterprise\'s role as the enterprise support wrapper for the entire stack is accurate — it provides SLAs, CVE patching, and compliance artifacts for all layers. Option B is partially true but overstated — NeMo-trained models need export to a serving format. Option D is false — NIM requires NVIDIA GPUs. Option E is false — NGC has free public access.',
    keywords: ['NVIDIA stack', 'abstraction layers', 'NVIDIA AI Enterprise', 'NIM', 'CUDA-X AI'],
    difficulty: 'hard',
    type: 'multi',
    answerCount: 2,
    quality: 'preparto'
  },
  {
    id: 7814,
    domain: 7,
    domainName: 'NVIDIA Platform Implementation',
    topic: 'Scenario: Riva for Speech',
    question: 'Your voice-enabled agent needs to transcribe user speech in real-time (ASR) and synthesize natural-sounding responses (TTS) with sub-300ms round-trip latency. NVIDIA Riva is evaluated. Select TWO Riva capabilities relevant to this requirement.',
    options: {
      A: 'Riva provides streaming ASR that starts transcribing as the user speaks (not waiting for end of utterance), achieving time-to-first-word latencies under 300ms on GPU.',
      B: 'Riva\'s ASR models only support US English and cannot be used for multilingual voice agents.',
      C: 'Riva\'s TTS produces natural-sounding speech with configurable voice characteristics and speaking rate, deployed as a gRPC or REST microservice for low-latency integration with agent pipelines.',
      D: 'Riva automatically learns new words from user corrections without any retraining or custom vocabulary configuration.',
      E: 'Riva requires a minimum of 8 A100 GPUs for production deployment.'
    },
    answer: 'AC',
    explanation: '(A) Riva\'s streaming ASR is a key capability for real-time agents: partial transcription starts immediately as speech begins, achieving sub-300ms latency with GPU acceleration. (C) Riva TTS is production-ready as a gRPC microservice with configurable voice parameters, meeting the synthesis side of the requirement. Option B is false — Riva supports multiple languages (English, Spanish, German, Hindi, etc.). Option D is false — Riva doesn\'t auto-learn from corrections; custom vocabulary configuration requires a separate process. Option E is false — Riva can run on a single T4 GPU.',
    keywords: ['Riva', 'ASR', 'TTS', 'streaming transcription', 'voice agent'],
    difficulty: 'medium',
    type: 'multi',
    answerCount: 2,
    isScenario: true,
    quality: 'preparto'
  },
  {
    id: 7815,
    domain: 7,
    domainName: 'NVIDIA Platform Implementation',
    topic: 'Scenario: RAPIDS for Agent Data Processing',
    question: 'Your data analytics agent processes 10GB CSV files as part of its tool execution — reading, filtering, and aggregating financial data before generating insights. Processing currently takes 45 seconds using pandas (CPU). A colleague suggests NVIDIA RAPIDS. What improvement does RAPIDS provide?',
    options: {
      A: 'RAPIDS cuDF provides a pandas-compatible DataFrame API that runs on GPU, replacing CPU pandas operations with GPU-accelerated equivalents — typically achieving 10-50x speedups on large dataset operations, reducing 45s to 1-5s.',
      B: 'RAPIDS automatically converts the pandas DataFrame operations to SQL queries that run in the agent\'s connected database.',
      C: 'RAPIDS compresses the CSV file to 100MB before reading, reducing I/O time.',
      D: 'RAPIDS requires rewriting all pandas code in CUDA C++ to achieve GPU acceleration.'
    },
    answer: 'A',
    explanation: 'RAPIDS cuDF (A) is pandas-compatible: `import cudf as pd` replaces `import pandas as pd` and existing pandas code (read_csv, groupby, merge, filter) runs on GPU automatically. GPU-parallel execution of DataFrame operations achieves 10-50x speedups for large datasets. For a 10GB file, GPU memory bandwidth and parallel compute give dramatic speedups on operations like groupby and merge that are serialized on CPU. Option B is fabricated. Option C is false — RAPIDS doesn\'t compress data. Option D is false — no CUDA coding needed with cuDF.',
    keywords: ['RAPIDS', 'cuDF', 'pandas-compatible', 'GPU DataFrame', 'data processing'],
    difficulty: 'medium',
    type: 'single',
    isScenario: true,
    quality: 'preparto'
  },
];