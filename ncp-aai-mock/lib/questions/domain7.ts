import { Question } from '../types';

export const domain7Questions: Question[] = [
  { id: 7001, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA AgentIQ', difficulty: 'medium', keywords: ['AgentIQ', 'NVIDIA', 'toolkit', 'agentic'],
    question: 'NVIDIA AgentIQ is:',
    options: { A: 'A GPU performance monitoring dashboard', B: 'An open-source toolkit for building, evaluating, and deploying production AI agent systems on NVIDIA infrastructure', C: 'An AI-powered IQ testing application', D: 'A framework for training LLMs from scratch' },
    answer: 'B', explanation: 'AgentIQ provides a unified framework for building composable, evaluatable agentic AI applications optimized for NVIDIA hardware and NIM microservices.' },

  { id: 7002, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NeMo Framework', difficulty: 'medium', keywords: ['NeMo', 'NVIDIA', 'training', 'customization'],
    question: 'NVIDIA NeMo Framework is primarily used for:',
    options: { A: 'Game development with AI characters', B: 'Training, fine-tuning, and customizing large language models at scale on NVIDIA GPUs', C: 'Network monitoring (NEMO = Network Monitoring)', D: 'NLP model visualization and debugging' },
    answer: 'B', explanation: 'NeMo provides end-to-end workflows for training LLMs and ASR models at scale, including data curation, training with Megatron, and evaluation on NVIDIA DGX infrastructure.' },

  { id: 7003, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NeMo Guardrails', difficulty: 'medium', keywords: ['NeMo Guardrails', 'safety', 'Colang', 'rails'],
    question: 'NeMo Guardrails uses which domain-specific language for defining safety rails?',
    options: { A: 'Python with decorators', B: 'Colang — a conversational language for defining dialogue flows and safety rules', C: 'YAML configuration files only', D: 'SQL for rule definition' },
    answer: 'B', explanation: 'Colang is NVIDIA\'s purpose-built language for NeMo Guardrails, enabling definition of conversation flows, input/output rails, and topic restrictions in a readable format.' },

  { id: 7004, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NGC Catalog', difficulty: 'easy', keywords: ['NGC', 'catalog', 'model', 'container'],
    question: 'NVIDIA NGC (GPU Cloud) catalog provides:',
    options: { A: 'A cloud gaming service for NVIDIA users', B: 'A curated repository of pre-trained AI models, containers, and SDKs optimized for NVIDIA GPUs', C: 'Next-Gen Computing pricing information', D: 'A network gateway for GPU clusters' },
    answer: 'B', explanation: 'NGC hosts production-ready AI assets — models (LLMs, vision, speech), optimized containers, Helm charts — validated and optimized for NVIDIA hardware.' },

  { id: 7005, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NIM Deployment', difficulty: 'medium', keywords: ['NIM', 'deployment', 'Docker', 'API key'],
    question: 'To deploy a NIM microservice locally, a developer needs:',
    options: { A: 'A paid NVIDIA Enterprise subscription only', B: 'An NVIDIA GPU with appropriate drivers, Docker, and an NVIDIA API key (NGC key)', C: 'A cloud account from any provider', D: 'Python 2.7 or earlier' },
    answer: 'B', explanation: 'NIM runs as a Docker container requiring compatible NVIDIA GPU/drivers, Docker with NVIDIA Container Toolkit, and an NGC API key for image pull authorization.' },

  { id: 7006, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'CUDA Optimization', difficulty: 'hard', keywords: ['CUDA', 'kernel', 'optimization', 'memory bandwidth'],
    question: 'Memory bandwidth is typically the bottleneck for LLM inference because:',
    options: { A: 'GPUs have limited compute FLOPS for matrix operations', B: 'LLM inference requires loading large weight matrices from GPU memory for each token, saturating bandwidth', C: 'CUDA kernels are not optimized for transformer operations', D: 'Memory bandwidth affects training but not inference' },
    answer: 'B', explanation: 'LLM inference is memory-bandwidth bound — each token generated requires loading the entire model\'s weights from HBM. Techniques like quantization and weight tiling address this bottleneck.' },

  { id: 7007, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Blueprint Agents', difficulty: 'medium', keywords: ['Blueprint', 'reference', 'architecture', 'NVIDIA'],
    question: 'NVIDIA AI Blueprints provide:',
    options: { A: 'Architectural blueprints for NVIDIA data center buildings', B: 'Reference applications and workflows demonstrating best-practice implementations of AI use cases on NVIDIA platforms', C: 'Blueprint code that must not be modified', D: 'Data blueprints for database schema design' },
    answer: 'B', explanation: 'AI Blueprints are production-ready reference implementations (RAG pipeline, multimodal agent, etc.) that developers can customize, accelerating time-to-value on NVIDIA infrastructure.' },

  { id: 7008, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NEMO Guardrails Implementation', difficulty: 'medium', keywords: ['rails', 'topical', 'input', 'output', 'dialog'],
    question: 'NeMo Guardrails supports which types of safety rails? (Choose two)',
    options: { A: 'Input rails (filtering harmful user inputs before the LLM)', B: 'Hardware rails (preventing GPU overheating)', C: 'Output rails (filtering harmful LLM responses)', D: 'Network rails (filtering malicious network traffic)' },
    answer: 'AC', explanation: 'NeMo Guardrails implements input rails (block/transform harmful queries), dialog rails (keep conversation on-topic), and output rails (filter/transform unsafe responses).' },

  { id: 7009, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Milvus Integration', difficulty: 'medium', keywords: ['Milvus', 'vector database', 'NVIDIA', 'GPU-accelerated'],
    question: 'Milvus vector database integrates with NVIDIA by:',
    options: { A: 'Using NVIDIA GPUs for accelerated similarity search with CUDA-powered indexing', B: 'Storing model weights on NVIDIA GPUs', C: 'Using NVIDIA Networking for high-bandwidth data transfer', D: 'Milvus has no specific NVIDIA integration' },
    answer: 'A', explanation: 'Milvus supports GPU-accelerated indexing (RAFT/cuVS library from NVIDIA), dramatically accelerating vector index building and search for large-scale deployments.' },

  { id: 7010, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'DGX Cloud', difficulty: 'medium', keywords: ['DGX Cloud', 'AI supercomputer', 'cloud', 'H100'],
    question: 'NVIDIA DGX Cloud provides:',
    options: { A: 'A consumer gaming cloud service', B: 'On-demand access to NVIDIA DGX AI supercomputing infrastructure via major cloud providers', C: 'A cloud storage service for NVIDIA drivers', D: 'A cloud-based GPU rendering service for 3D graphics' },
    answer: 'B', explanation: 'DGX Cloud gives enterprises on-demand access to DGX H100/A100 systems through AWS, GCP, Azure, and Oracle Cloud, enabling large-scale AI training and inference without hardware investment.' },

  { id: 7011, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'TensorRT Optimization', difficulty: 'hard', keywords: ['TensorRT', 'INT8', 'FP16', 'engine', 'optimization'],
    question: 'TensorRT optimizes model inference by performing which operations? (Choose two)',
    options: { A: 'Layer fusion — combining multiple sequential operations into a single optimized CUDA kernel', B: 'Training the model on additional data', C: 'Precision calibration — reducing FP32 weights to FP16/INT8 with minimal accuracy loss', D: 'Adding new layers to improve model accuracy' },
    answer: 'AC', explanation: 'TensorRT\'s key optimizations are layer/tensor fusion (fewer kernel launches, less memory bandwidth) and precision reduction (FP16/INT8 quantization with PTQ calibration).' },

  { id: 7012, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA NIM OpenAI Compatibility', difficulty: 'easy', keywords: ['NIM', 'OpenAI compatible', 'drop-in', 'API'],
    question: 'NVIDIA NIM microservices are OpenAI API-compatible, which means:',
    options: { A: 'They require an OpenAI subscription to use', B: 'Existing code using the OpenAI Python SDK can use NIM with minimal changes (base_url change only)', C: 'NIM models are owned by OpenAI', D: 'NIM uses OpenAI\'s infrastructure' },
    answer: 'B', explanation: 'NIM\'s OpenAI-compatible REST API means you change only the base_url to point to your NIM endpoint — the same openai.ChatCompletion.create() code works with NIM-hosted models.' },

  { id: 7013, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'NVIDIA AI Enterprise', difficulty: 'medium', keywords: ['NVIDIA AI Enterprise', 'support', 'security', 'enterprise'],
    question: 'NVIDIA AI Enterprise adds to the open-source ecosystem:',
    options: { A: 'Additional model parameters for better performance', B: 'Enterprise support, security patches, software validation, and SLAs for production AI deployments', C: 'Access to proprietary NVIDIA datasets', D: 'Free cloud compute credits' },
    answer: 'B', explanation: 'NVIDIA AI Enterprise is the commercial software layer providing enterprise-grade support, security response, validated containers, and compliance certifications for production AI.' },

  { id: 7014, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'Inference Pipeline', difficulty: 'medium', keywords: ['inference pipeline', 'ensemble', 'Triton', 'preprocessing'],
    question: 'Triton Inference Server\'s ensemble models enable:',
    options: { A: 'Running multiple unrelated models simultaneously', B: 'Chaining preprocessing → model inference → postprocessing into a single, efficient pipeline', C: 'Voting across multiple models for better accuracy', D: 'Ensembling training runs from different seeds' },
    answer: 'B', explanation: 'Triton ensembles define a pipeline of models (tokenizer → LLM → detokenizer) that execute as a unit, with Triton managing data flow between steps for efficiency.' },

  { id: 7015, domain: 7, domainName: 'NVIDIA Platform Implementation', topic: 'RAPIDS Integration', difficulty: 'medium', keywords: ['RAPIDS', 'cuDF', 'GPU data', 'data science'],
    question: 'NVIDIA RAPIDS cuDF integrates with AI agent pipelines by:',
    options: { A: 'Providing GPU-accelerated dataframe operations for fast data preprocessing and feature engineering', B: 'Replacing the LLM with a GPU-accelerated decision tree', C: 'Rapids water cooling for GPU thermal management', D: 'Accelerating network packet processing' },
    answer: 'A', explanation: 'cuDF provides a pandas-compatible GPU dataframe library, accelerating data preprocessing steps (filtering, joins, aggregations) in agent pipelines by 10-100x over CPU pandas.' },
];
