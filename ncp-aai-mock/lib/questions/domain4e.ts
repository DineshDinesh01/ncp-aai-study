import { Question } from '../types';

export const domain4eQuestions: Question[] = [
  { id: 4111, domain: 4, domainName: 'Deployment & Scaling', topic: 'AI Infrastructure GitOps', difficulty: 'medium', keywords: ['GitOps', 'ArgoCD', 'Flux', 'declarative'],
    question: 'GitOps for AI model deployment (ArgoCD, Flux) provides:',
    options: { A: 'Git integration for AI model training only', B: 'Automated synchronization of production Kubernetes state with git-declared desired state — all deployment changes reviewed as code', C: 'Version control for ML training code only', D: 'GitOps requires manual approval for every model deployment' },
    answer: 'B', explanation: 'GitOps for AI: update model version in values.yaml → git PR → review → merge → ArgoCD detects drift → applies new model deployment automatically. All changes traceable to git commits. Rollback = revert git commit.' },

  { id: 4112, domain: 4, domainName: 'Deployment & Scaling', topic: 'NIM Fleet Management', difficulty: 'medium', keywords: ['fleet management', 'multiple NIMs', 'orchestration', 'management'],
    question: 'Managing a fleet of NIM microservices (different models for different use cases) requires:',
    options: { A: 'Manual configuration of each NIM independently', B: 'Centralized orchestration: service catalog, health monitoring across all NIMs, unified routing, and coordinated version updates', C: 'All NIMs must run the same model version', D: 'NIM fleet management requires NVIDIA enterprise support exclusively' },
    answer: 'B', explanation: 'NIM fleet management: service registry (what NIMs are running?), health monitoring (all NIMs report via /health), smart routing (route requests to appropriate NIM based on model, load), and coordinated rollouts (update NIMs in sequence with validation).' },

  { id: 4113, domain: 4, domainName: 'Deployment & Scaling', topic: 'Cold Start Optimization', difficulty: 'hard', keywords: ['cold start', 'model loading', 'warmup', 'preloading'],
    question: 'Minimizing cold start latency for LLM agent deployments involves:',
    options: { A: 'Using SSDs instead of HDDs for model weight storage', B: 'Keeping minimum instances warm, preloading model weights before predicted demand spikes, and using memory-mapped files for faster loading', C: 'Cold starts are unavoidable and users must wait', D: 'Running agents on CPUs eliminates cold starts' },
    answer: 'B', explanation: 'Cold start reduction: minimum replicas (never scale to zero for latency-sensitive), predictive scaling (scale up before rush hour based on traffic patterns), memory-mapped weights (mmap avoids double-buffering), and multi-level caching (weights in shared memory).' },

  { id: 4114, domain: 4, domainName: 'Deployment & Scaling', topic: 'Multi-Cluster Management', difficulty: 'hard', keywords: ['federation', 'multi-cluster', 'workload distribution', 'global'],
    question: 'Kubernetes Federation or multi-cluster management for AI deployments enables:',
    options: { A: 'Combining multiple Kubernetes clusters into one larger cluster', B: 'Deploying workloads across multiple clusters for geo-distribution, disaster recovery, and avoiding cloud provider limits', C: 'Federation is only for on-premises deployments', D: 'Multi-cluster requires identical hardware in all clusters' },
    answer: 'B', explanation: 'Multi-cluster AI: deploy NIM replicas across AWS us-east-1 and eu-west-1 clusters. Benefits: geo-routing (users to nearest region), DR (one cluster fails, others serve), provider limits (one cloud limits GPU quotas), and cost optimization (spot availability differs by region).' },

  { id: 4115, domain: 4, domainName: 'Deployment & Scaling', topic: 'Runtime Monitoring', difficulty: 'medium', keywords: ['runtime', 'drift', 'performance degradation', 'monitoring'],
    question: 'Detecting model performance degradation in production AI agents requires:',
    options: { A: 'Periodic manual testing by the QA team', B: 'Automated continuous evaluation using shadow scoring, proxy metrics (user engagement, correction rates), and drift detection on output distributions', C: 'Degradation is impossible to detect without ground truth labels', D: 'Only monitoring infrastructure metrics (CPU, memory) indicates performance changes' },
    answer: 'B', explanation: 'Degradation detection without ground truth: user negative feedback rate spike, increase in correction/edit after AI response, output length distribution shift, sentiment distribution change. These proxy signals correlate with quality degradation even without labeled eval data.' },

  { id: 4116, domain: 4, domainName: 'Deployment & Scaling', topic: 'Progressive Delivery', difficulty: 'medium', keywords: ['progressive delivery', 'feature flags', 'ring deployment', 'staged'],
    question: 'Ring deployment for AI agent updates rolls out to:',
    options: { A: 'Ring-shaped server racks for optimal cooling', B: 'Progressively larger user groups in rings (1% → 5% → 25% → 100%) with quality monitoring between rings before wider rollout', C: 'Ring deployments only apply to mobile applications', D: 'All rings deploy simultaneously for consistency' },
    answer: 'B', explanation: 'Ring deployment: Ring 0 (internal employees) → Ring 1 (1% users) → Ring 2 (5% users) → Ring 3 (25%) → Ring 4 (100%). Monitor quality metrics at each ring. Automated gate: if Ring 1 shows regression, stop rollout before Ring 2.' },

  { id: 4117, domain: 4, domainName: 'Deployment & Scaling', topic: 'Spot Instance Strategy', difficulty: 'medium', keywords: ['spot instances', 'preemption', 'checkpointing', 'fault tolerance'],
    question: 'Training AI models on spot/preemptible instances requires:',
    options: { A: 'Training cannot be done on spot instances due to preemption risk', B: 'Frequent checkpointing to durable storage so training can resume from the latest checkpoint after spot instance preemption', C: 'Spot instances must be reserved 24 hours in advance', D: 'Spot training is only suitable for very short training runs' },
    answer: 'B', explanation: 'Spot training: checkpoint every 5-10 minutes to S3/GCS. When preempted (typically 2-3 min warning): save checkpoint → training terminates → spot fleet acquires new instances → resume from last checkpoint. 60-90% cost savings worth the complexity.' },

  { id: 4118, domain: 4, domainName: 'Deployment & Scaling', topic: 'SageMaker and Managed Training', difficulty: 'medium', keywords: ['SageMaker', 'managed training', 'EC2', 'infrastructure'],
    question: 'Managed training services (SageMaker, Vertex AI) reduce AI operational burden by:',
    options: { A: 'Eliminating the need for training data preparation', B: 'Handling infrastructure provisioning, distributed training setup, experiment tracking, and model registry integration without manual cluster management', C: 'Managed services always outperform self-managed training in cost', D: 'Only for small models under 7B parameters' },
    answer: 'B', explanation: 'Managed training: submit job with training script + data location + instance type → cloud handles: instance provisioning, distributed training (multi-node), spot interruption recovery, logging, metrics, and storing model artifacts. Team focuses on ML, not infrastructure.' },

  { id: 4119, domain: 4, domainName: 'Deployment & Scaling', topic: 'Cost Efficiency Metrics', difficulty: 'medium', keywords: ['cost per query', 'efficiency', 'ROI', 'throughput'],
    question: 'Key cost efficiency metrics for AI agent deployments include:',
    options: { A: 'Only total monthly cloud bill', B: 'Cost per query, cost per successful task completion, tokens per dollar, and GPU utilization rate — enabling cost optimization decisions', C: 'Only cost per GPU hour', D: 'Cost efficiency is a business concern not relevant to engineering' },
    answer: 'B', explanation: 'AI cost metrics: cost_per_query = total_cost / queries_handled, cost_per_success = total_cost / successful_completions. GPU utilization (target 85%+, lower = waste). Tokens per dollar (model efficiency). These metrics guide: model choice, batching strategy, and scaling decisions.' },

  { id: 4120, domain: 4, domainName: 'Deployment & Scaling', topic: 'Infrastructure Resilience Patterns', difficulty: 'hard', keywords: ['redundancy', 'active-active', 'active-passive', 'failover'],
    question: 'Active-active deployment for AI agents vs active-passive differs in that:',
    options: { A: 'Active-active has two servers that can\'t both process simultaneously', B: 'Active-active: all instances serve traffic simultaneously (2x capacity, instant failover); Active-passive: standby only activates when primary fails (wasted capacity, slower failover)', C: 'Active-passive always has lower latency than active-active', D: 'The terms are interchangeable for AI deployments' },
    answer: 'B', explanation: 'Active-active: both regions serve traffic, user traffic split. One region fails → remaining serves 100% of traffic (may need scale-up). Instant failover. Active-passive: primary serves all, secondary is warm standby. Failover takes 1-5 minutes. Active-active preferred for high-availability AI.' },
];
