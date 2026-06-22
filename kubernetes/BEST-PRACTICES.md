# Kubernetes Best Practices & Real-World System Design

> Reference: https://kubernetes.io/docs/concepts/configuration/overview/
> K8s Security 2025: https://www.cncf.io/blog/2025/12/15/kubernetes-security-2025-stable-features-and-2026-preview/

---

## Part 1 — Real-World System Designs

### 1.1 E-Commerce Platform on Kubernetes

A full production e-commerce platform (Amazon/Flipkart-style):

```
                          ┌─────────────────────────────────────────────────────────┐
                          │                  AWS / GCP / Azure                       │
                          │                                                          │
    Users                 │   ┌────────────────────────────────────────────────┐    │
      │                   │   │              Kubernetes Cluster                 │    │
      │ HTTPS             │   │                                                │    │
      ▼                   │   │   Namespace: production                        │    │
   CloudFront / CDN       │   │                                                │    │
      │                   │   │   ┌──────────────┐  ┌──────────────────────┐  │    │
      ▼                   │   │   │   Ingress     │  │   Cert Manager       │  │    │
   LoadBalancer           │   │   │  (nginx)      │  │   (TLS auto-renew)   │  │    │
      │                   │   │   └──────┬───────┘  └──────────────────────┘  │    │
      │                   │   │          │                                     │    │
      │ routes to         │   │   ┌──────▼────────────────────────────────┐   │    │
      │                   │   │   │                                        │   │    │
      │                   │   │   │  /  → frontend (React)  3 replicas    │   │    │
      │                   │   │   │  /api → backend (Node)  5 replicas    │   │    │
      │                   │   │   │  /checkout → payments   2 replicas    │   │    │
      │                   │   │   │  /search   → search svc 3 replicas    │   │    │
      │                   │   │   └──────────────────┬─────────────────────┘   │    │
      │                   │   │                      │                          │    │
      │                   │   │          ┌───────────▼─────────────┐           │    │
      │                   │   │          │  Internal Services        │           │    │
      │                   │   │          │  postgres-svc:5432        │           │    │
      │                   │   │          │  redis-svc:6379           │           │    │
      │                   │   │          │  kafka-svc:9092           │           │    │
      │                   │   │          └──────────────────────────┘           │    │
      │                   │   └────────────────────────────────────────────────┘    │
      │                   └─────────────────────────────────────────────────────────┘
      └──────────────────────────────────────────────────────────────────────────────►
```

**Kubernetes resources used:**
- `Deployment` for each service (frontend, backend, payments, search)
- `StatefulSet` for PostgreSQL and Kafka (stateful apps)
- `Service (ClusterIP)` for internal communication
- `Ingress` for external HTTP routing
- `HPA` to scale backend 2x→20x during sale events
- `PVC` for PostgreSQL storage (cloud disk)
- `ConfigMap` for app config per environment
- `Secret` for DB passwords, API keys
- `NetworkPolicy` to isolate payments service
- `PodDisruptionBudget` to ensure HA during node maintenance

---

### 1.2 Microservices Platform (Netflix/Spotify-Style)

```
┌───────────────────────────────────────────────────────────────────┐
│                       K8s Cluster                                   │
│                                                                     │
│   namespace: frontend          namespace: backend                   │
│   ┌────────────────────┐       ┌─────────────────────────────┐     │
│   │  web-app (React)   │──────►│  user-service               │     │
│   │  mobile-bff        │       │  content-service            │     │
│   └────────────────────┘       │  recommendation-service     │     │
│                                │  notification-service       │     │
│   namespace: data              └─────────────────────────────┘     │
│   ┌─────────────────────────────────────────────────────────┐     │
│   │  PostgreSQL (StatefulSet)   Redis (StatefulSet)          │     │
│   │  Kafka (StatefulSet)        Elasticsearch               │     │
│   └─────────────────────────────────────────────────────────┘     │
│                                                                     │
│   namespace: monitoring        namespace: ingress-nginx             │
│   ┌────────────────────┐       ┌────────────────────┐             │
│   │  Prometheus        │       │  Ingress Controller│             │
│   │  Grafana           │       │  + cert-manager    │             │
│   │  Loki              │       └────────────────────┘             │
│   └────────────────────┘                                           │
│                                                                     │
│   Service Mesh: Istio (for mTLS between services)                  │
└───────────────────────────────────────────────────────────────────┘
```

---

### 1.3 CI/CD Pipeline with Kubernetes

```
Developer pushes code
        │
        ▼
    GitHub Actions / GitLab CI
        │
        ├── 1. Run tests
        ├── 2. Build Docker image
        ├── 3. Push to ECR/GCR/DockerHub
        └── 4. helm upgrade --install (deploy to K8s)
                │
                ▼
           Kubernetes Cluster
                │
                ├── dev namespace (auto-deploys on PR)
                ├── staging namespace (auto-deploys on merge to main)
                └── production namespace (manual approval required)
```

GitOps with ArgoCD:
```
Git repo (source of truth)
        │
        │  ArgoCD watches for changes
        ▼
    ArgoCD (deployed in K8s)
        │
        │  syncs automatically
        ▼
  Kubernetes cluster matches Git state
```

---

## Part 2 — Production Best Practices

### 2.1 Pod/Container Best Practices

```yaml
# ✅ GOOD production pod spec
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: app
    image: myapp:1.2.3          # ✅ Never use :latest
    
    resources:                   # ✅ Always set requests/limits
      requests:
        memory: "128Mi"
        cpu: "100m"
      limits:
        memory: "256Mi"
        cpu: "500m"
    
    readinessProbe:              # ✅ Always add probes
      httpGet:
        path: /healthz
        port: 8080
      initialDelaySeconds: 10
      periodSeconds: 5
    
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
      initialDelaySeconds: 30
      periodSeconds: 10
    
    securityContext:             # ✅ Security hardening
      runAsNonRoot: true
      runAsUser: 1000
      readOnlyRootFilesystem: true
      allowPrivilegeEscalation: false
    
    env:                         # ✅ Config from ConfigMap/Secret
    - name: DB_HOST
      valueFrom:
        configMapKeyRef:
          name: app-config
          key: DB_HOST
    - name: DB_PASSWORD
      valueFrom:
        secretKeyRef:
          name: app-secret
          key: DB_PASSWORD
  
  securityContext:              # ✅ Pod-level security
    seccompProfile:
      type: RuntimeDefault
```

---

### 2.2 Deployment Best Practices

```yaml
# ✅ GOOD production deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  annotations:
    kubernetes.io/change-cause: "Deploy v1.2.3 - fix checkout bug"  # ✅ Track changes
spec:
  replicas: 3                    # ✅ Never run 1 replica in production
  
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1          # ✅ Keep enough healthy pods
      maxSurge: 1
  
  selector:
    matchLabels:
      app: my-app
  
  template:
    metadata:
      labels:
        app: my-app
        version: "1.2.3"         # ✅ Label with version for easy tracking
```

---

### 2.3 Service / Networking Best Practices

```
✅ DO:
  - Use ClusterIP for internal services (most services)
  - Use a single Ingress controller for all HTTP traffic
  - Enable TLS on all Ingress rules (use cert-manager)
  - Use NetworkPolicy to restrict traffic between services
  - Use readiness probes so Services don't route to unready pods

❌ DON'T:
  - Don't expose NodePort in production (use Ingress instead)
  - Don't use hostNetwork: true (security risk)
  - Don't skip NetworkPolicies in multi-tenant clusters
```

---

### 2.4 Security Best Practices (K8s v1.36)

```
1. Authentication & Authorization
   ✅ Enable RBAC (it's default in modern K8s)
   ✅ Use least-privilege roles — only grant what's needed
   ✅ Rotate service account tokens regularly
   ✅ Use namespaced roles (Role) not cluster-wide (ClusterRole) where possible

2. Secrets Management
   ✅ Never store secrets in Git
   ✅ Use External Secrets Operator + Vault/AWS Secrets Manager
   ✅ Enable etcd encryption at rest
   ✅ Rotate secrets regularly

3. Container Security
   ✅ Run containers as non-root
   ✅ Use read-only root filesystem
   ✅ Scan images with Trivy / Snyk before deployment
   ✅ Use distroless or minimal base images
   ✅ Never use privileged: true unless absolutely necessary

4. Network Security
   ✅ Default deny all ingress/egress NetworkPolicies
   ✅ Allow only required traffic explicitly
   ✅ Use mTLS with service mesh (Istio/Linkerd) for east-west traffic

5. Cluster Hardening
   ✅ Keep Kubernetes updated (latest: v1.36.1 as of June 2026)
   ✅ Enable audit logging
   ✅ Use Pod Security Standards (baseline/restricted)
   ✅ Restrict access to etcd
```

---

### 2.5 Resource Management Best Practices

```
✅ Always set resource requests AND limits
✅ Use LimitRange to set defaults per namespace
✅ Use ResourceQuota to cap namespace usage
✅ Use HPA for auto-scaling under load
✅ Use VPA (Vertical Pod Autoscaler) to right-size requests
✅ Set PodDisruptionBudget for HA during maintenance

# LimitRange — set default requests/limits for a namespace
apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
  namespace: production
spec:
  limits:
  - type: Container
    default:
      cpu: "500m"
      memory: "256Mi"
    defaultRequest:
      cpu: "100m"
      memory: "128Mi"
```

---

### 2.6 High Availability (HA) Best Practices

```
1. Run 3+ replicas for critical services
2. Use anti-affinity to spread pods across nodes:

   affinity:
     podAntiAffinity:
       requiredDuringSchedulingIgnoredDuringExecution:
       - labelSelector:
           matchLabels:
             app: my-app
         topologyKey: kubernetes.io/hostname    # Different nodes

3. PodDisruptionBudget — protect during node drains:
   apiVersion: policy/v1
   kind: PodDisruptionBudget
   spec:
     minAvailable: 2           # At least 2 pods always running
     selector:
       matchLabels:
         app: my-app

4. Use multi-zone clusters in production (AZ1, AZ2, AZ3)
5. Test chaos engineering with tools like Chaos Monkey / Chaos Mesh
```

---

### 2.7 Cost Optimization Best Practices

```
✅ Right-size resource requests (don't over-provision)
✅ Use spot/preemptible instances for non-critical workloads
✅ Use HPA to scale down when load is low
✅ Use Cluster Autoscaler to remove idle nodes
✅ Set Pod TTL for batch jobs
✅ Use tools: Kubecost, OpenCost to track spending per namespace/team
```

---

## Part 3 — Medium Blog Tips

When writing this as a Medium blog:

1. **Title ideas:**
   - "Complete Kubernetes Guide for Beginners: From Zero to Production (2026)"
   - "Kubernetes Step-by-Step: 12 Chapters with Real-World Examples"

2. **Structure each article:**
   - Hook: real-world problem you solve
   - Concept explanation with diagram
   - Hands-on YAML with commands
   - Best practices section
   - References and video links

3. **Add code blocks** with proper syntax highlighting (Medium supports this)

4. **Good images to create:**
   - Architecture diagrams (use draw.io or Excalidraw)
   - Terminal screenshots of commands running
   - Grafana dashboard screenshots

5. **SEO tips for Medium:**
   - Tag: kubernetes, devops, cloud-native, docker, containers
   - Publish in "Better Programming" or "ITNEXT" publications
   - Add canonical URL if cross-posting

---

## All External References

### Official Documentation
- **Kubernetes docs**: https://kubernetes.io/docs/home/
- **Kubernetes tutorials**: https://kubernetes.io/docs/tutorials/
- **K8s releases**: https://kubernetes.io/releases/
- **kubectl cheat sheet**: https://kubernetes.io/docs/reference/kubectl/cheatsheet/
- **K8s security 2025**: https://www.cncf.io/blog/2025/12/15/kubernetes-security-2025-stable-features-and-2026-preview/

### Video Courses (Free)
- **TechWorld with Nana — 4-hour K8s course**: https://www.classcentral.com/course/youtube-kubernetes-tutorial-for-beginners-full-course-in-4-hours-108866
- **Complete Kubernetes Course — Beginner to Pro**: https://www.youtube.com/watch?v=2T86xAtR6Fo
- **Kubernetes Zero to Hero (2025 Edition)**: https://www.youtube.com/watch?v=MTHGoGUFpvE
- **Kubernetes for Absolute Beginners**: https://www.classcentral.com/course/youtube-kubernetes-for-the-absolute-beginners-45688
- **200 Best K8s Videos on YouTube**: https://developereducators.com/best/kubernetes/

### Paid Courses
- **Best K8s Courses 2026**: https://www.classcentral.com/report/best-kubernetes-courses/
- **Coursera Kubernetes**: https://www.coursera.org/courses?query=kubernetes

### Tools & Ecosystem
- **Minikube**: https://minikube.sigs.k8s.io/docs/start/
- **Helm**: https://helm.sh/docs/
- **Artifact Hub (Helm charts)**: https://artifacthub.io/
- **Calico (CNI)**: https://docs.tigera.io/calico/latest/about/
- **Cilium (CNI)**: https://docs.cilium.io/en/stable/
- **ArgoCD (GitOps)**: https://argo-cd.readthedocs.io/
- **Prometheus**: https://prometheus.io/docs/
- **Grafana**: https://grafana.com/docs/
- **Loki**: https://grafana.com/docs/loki/latest/

### GKE (Google Kubernetes Engine) Learning
- **GKE get started**: https://docs.cloud.google.com/kubernetes-engine/docs/learn/get-started-with-kubernetes
