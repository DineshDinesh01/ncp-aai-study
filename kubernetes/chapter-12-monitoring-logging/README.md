# Chapter 12 — Monitoring & Logging

> Prometheus: https://prometheus.io/docs/
> Grafana: https://grafana.com/docs/
> Official K8s Logging: https://kubernetes.io/docs/concepts/cluster-administration/logging/

## What You Will Learn
- Kubernetes monitoring with Prometheus + Grafana
- Centralized logging with EFK stack (Elasticsearch, Fluentd, Kibana)
- Real-world observability patterns
- Best practices for production monitoring

---

## 12.1 Why Monitoring Matters

In production, you must know:
- Is my app running? (availability)
- How fast is it responding? (latency)
- How much CPU/memory is it using? (resource usage)
- Why did it crash? (logs)
- What happened before the crash? (traces)

The three pillars of observability:
```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   METRICS   │  │    LOGS     │  │   TRACES    │
│             │  │             │  │             │
│ Prometheus  │  │ EFK / Loki  │  │   Jaeger /  │
│ + Grafana   │  │             │  │   Zipkin    │
└─────────────┘  └─────────────┘  └─────────────┘
    Numbers         Text output      Request path
```

---

## 12.2 Prometheus — Metrics Collection

**Prometheus** scrapes metrics from your apps and K8s components.

```
App / K8s components
        │  expose /metrics endpoint
        ▼
   Prometheus  ←── scrapes every 15s
        │
        │  stores time-series data
        ▼
    Grafana  ←── queries & visualizes
```

### Install Prometheus Stack with Helm

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --set grafana.adminPassword=admin123

kubectl get pods -n monitoring
# This installs: Prometheus, Grafana, Alertmanager, node-exporter, kube-state-metrics
```

### Access Prometheus UI
```bash
kubectl port-forward -n monitoring svc/prometheus-kube-prometheus-prometheus 9090:9090
# Open: http://localhost:9090
```

### Access Grafana
```bash
kubectl port-forward -n monitoring svc/prometheus-grafana 3000:80
# Open: http://localhost:3000
# Login: admin / admin123
# Pre-built dashboards for K8s are already loaded!
```

---

## 12.3 Key Prometheus Queries (PromQL)

```promql
# CPU usage per pod
rate(container_cpu_usage_seconds_total{namespace="default"}[5m])

# Memory usage per pod
container_memory_usage_bytes{namespace="default"}

# HTTP error rate (5xx)
rate(http_requests_total{status=~"5.."}[5m])

# Pod restart count
kube_pod_container_status_restarts_total{namespace="default"}

# Node CPU usage
1 - avg(rate(node_cpu_seconds_total{mode="idle"}[5m]))
```

---

## 12.4 Alerting with Alertmanager

```yaml
# PrometheusRule — fire alert if pod restarts > 3 times
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: pod-restart-alert
  namespace: monitoring
  labels:
    release: prometheus
spec:
  groups:
  - name: pod-alerts
    rules:
    - alert: PodRestartingTooMuch
      expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: "Pod {{ $labels.pod }} is restarting too much"
        description: "Pod {{ $labels.pod }} in {{ $labels.namespace }} has restarted {{ $value }} times in last 15 min"
```

---

## 12.5 Kubernetes Logging Architecture

```
┌─────────────────────────────────────────────────────┐
│                    K8s Node                          │
│                                                      │
│  ┌─────────────────┐                               │
│  │      Pod        │                               │
│  │  ┌───────────┐  │                               │
│  │  │ Container │──┼──► stdout/stderr              │
│  │  └───────────┘  │         │                     │
│  └─────────────────┘         │                     │
│                               ▼                    │
│                    /var/log/containers/*.log        │
│                               │                    │
│                    ┌──────────▼──────┐             │
│                    │   Fluentd/      │             │
│                    │   Fluent Bit    │             │
│                    │   (DaemonSet)   │             │
│                    └──────────┬──────┘             │
└───────────────────────────────┼─────────────────────┘
                                 │
                                 ▼
                     Elasticsearch / Loki
                                 │
                                 ▼
                          Kibana / Grafana
```

---

## 12.6 Quick Logging with kubectl

```bash
# Basic logs
kubectl logs <pod-name>
kubectl logs <pod-name> -c <container-name>   # Multi-container pod
kubectl logs -f <pod-name>                    # Stream/follow logs
kubectl logs --previous <pod-name>            # Crashed container logs
kubectl logs --since=1h <pod-name>            # Last 1 hour
kubectl logs --tail=100 <pod-name>            # Last 100 lines

# Logs from all pods in a deployment
kubectl logs -l app=nginx --all-containers=true
```

---

## 12.7 Install Loki + Grafana (Modern Logging Stack)

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Install Loki Stack (Loki + Promtail)
helm install loki grafana/loki-stack \
  --namespace monitoring \
  --set grafana.enabled=true \
  --set prometheus.enabled=false

# Add Loki as data source in Grafana → query logs with LogQL
```

### LogQL Examples
```logql
# All logs from namespace=production
{namespace="production"}

# Error logs from a specific app
{app="my-app"} |= "ERROR"

# Count of errors per minute
rate({app="my-app"} |= "ERROR" [1m])
```

---

## 12.8 Real-World System Design: Full Observability Stack

A production e-commerce platform observability setup:

```
┌─────────────────────────────────────────────────────────────────┐
│                       Production Cluster                         │
│                                                                   │
│   Apps (frontend, backend, payments)                             │
│         │ metrics (/metrics)    │ logs (stdout)                  │
│         ▼                       ▼                                │
│   ┌─────────────┐        ┌─────────────┐                        │
│   │ Prometheus  │        │  Promtail   │ (DaemonSet)            │
│   │ (scrapes)   │        │ (collects)  │                        │
│   └──────┬──────┘        └──────┬──────┘                        │
│          │                      │                                │
│          ▼                      ▼                                │
│   ┌─────────────┐        ┌─────────────┐                        │
│   │  Thanos     │        │    Loki     │ (log storage)          │
│   │ (long-term  │        └──────┬──────┘                        │
│   │  storage)   │               │                                │
│   └──────┬──────┘               │                                │
│          └──────────┬───────────┘                                │
│                     ▼                                            │
│              ┌─────────────┐     ┌─────────────┐                │
│              │   Grafana   │     │ Alertmanager│                │
│              │ (dashboards)│     │ (PagerDuty, │                │
│              └─────────────┘     │  Slack)     │                │
│                                  └─────────────┘                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 12.9 HPA — Horizontal Pod Autoscaler

Automatically scale pods based on CPU/memory usage:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 2
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70    # Scale up when CPU > 70%
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80    # Scale up when memory > 80%
```

```bash
# Apply HPA
kubectl apply -f hpa.yaml

# Watch HPA in action
kubectl get hpa -w

# Enable metrics-server on minikube first
minikube addons enable metrics-server
kubectl top pods
kubectl top nodes
```

---

## 12.10 Best Practices for Production Monitoring

```
✅ Monitoring Best Practices:
  - Set resource requests/limits on every container (enables HPA + quota)
  - Use liveness + readiness probes on every Pod
  - Expose /metrics endpoint (use Prometheus client libraries)
  - Alert on symptoms (user impact) not just causes
  - Use dashboards for golden signals: latency, traffic, errors, saturation
  - Store logs structured (JSON) — easier to query

✅ Logging Best Practices:
  - Log to stdout/stderr — never to files inside containers
  - Use structured logging (JSON format)
  - Include correlation IDs for request tracing
  - Set log retention policies
  - Never log sensitive data (passwords, tokens)

✅ Alerting Best Practices:
  - Alert on what matters to users, not internal metrics
  - Every alert should be actionable — if nobody acts on it, remove it
  - Use alert severity levels: critical, warning, info
  - Runbook links in alert annotations (what to do when it fires)
```

---

## 12.11 Hands-On Lab — Monitor Your App

```bash
# Step 1: Enable metrics-server
minikube addons enable metrics-server

# Step 2: Deploy a sample app
kubectl create deployment cpu-demo --image=nginx:1.25 --replicas=3

# Step 3: Check resource usage
kubectl top pods
kubectl top nodes

# Step 4: Create HPA
kubectl autoscale deployment cpu-demo --cpu-percent=50 --min=2 --max=10
kubectl get hpa

# Step 5: Install Prometheus with Helm
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install monitoring prometheus-community/kube-prometheus-stack \
  -n monitoring --create-namespace \
  --set grafana.adminPassword=admin123

# Step 6: Access Grafana
kubectl port-forward -n monitoring svc/monitoring-grafana 3000:80 &
echo "Open http://localhost:3000 — login: admin/admin123"

# Step 7: Explore pre-built dashboards:
#   - Kubernetes / Compute Resources / Cluster
#   - Kubernetes / Compute Resources / Namespace
#   - Node Exporter / Nodes

# Cleanup
kubectl delete deployment cpu-demo
kubectl delete hpa cpu-demo
helm uninstall monitoring -n monitoring
kubectl delete namespace monitoring
```

---

## References & Further Reading

- **Prometheus docs**: https://prometheus.io/docs/
- **Grafana docs**: https://grafana.com/docs/
- **Loki docs**: https://grafana.com/docs/loki/latest/
- **Official K8s logging**: https://kubernetes.io/docs/concepts/cluster-administration/logging/
- **kube-prometheus-stack**: https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack
- **CNCF Security 2025 features**: https://www.cncf.io/blog/2025/12/15/kubernetes-security-2025-stable-features-and-2026-preview/

## Video Tutorials

- **TechWorld with Nana — K8s Full Course**: https://www.classcentral.com/course/youtube-kubernetes-tutorial-for-beginners-full-course-in-4-hours-108866
- **Best K8s Courses 2026 — Class Central**: https://www.classcentral.com/report/best-kubernetes-courses/
- **Kubernetes Zero to Hero 2025**: https://www.youtube.com/watch?v=MTHGoGUFpvE

---

## Key Takeaways

- Monitoring = metrics (Prometheus) + logs (Loki/EFK) + traces (Jaeger).
- Prometheus scrapes `/metrics` endpoints; Grafana visualizes them.
- Log to stdout/stderr always — Kubernetes and log shippers handle the rest.
- HPA scales pods automatically based on CPU/memory.
- Always set resource requests+limits — HPA and schedulers depend on them.
- Alert on user-impact symptoms, not just internal numbers.

---

## What's Next?

You've completed the core Kubernetes curriculum. Topics to explore further:

| Topic | Resource |
|-------|---------|
| CKA Certification | https://kubernetes.io/training/ |
| StatefulSets (for databases) | https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/ |
| GitOps with ArgoCD | https://argo-cd.readthedocs.io/ |
| Service Mesh (Istio) | https://istio.io/docs/ |
| Kubernetes Security | https://www.cncf.io/blog/2025/12/15/kubernetes-security-2025-stable-features-and-2026-preview/ |
| Multi-cluster with Fleet | https://fleet.rancher.io/ |

---

## Back to Table of Contents
[← README](../README.md)
