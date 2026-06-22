# Chapter 11 — Helm: The Kubernetes Package Manager

> Official Docs: https://helm.sh/docs/
> Artifact Hub (find charts): https://artifacthub.io/

## What You Will Learn
- What Helm is and why it exists
- Charts, Values, Releases
- Install, upgrade, rollback with Helm
- Write your own Helm chart
- Best practices for Helm in production

---

## 11.1 The Problem: YAML Sprawl

A real-world app might need 10+ Kubernetes YAML files:
- Deployment, Service, Ingress
- ConfigMap, Secret
- HPA, PDB, ServiceAccount
- RBAC roles, NetworkPolicy...

If you need to deploy this in 3 environments (dev/staging/prod), you end up with 30+ YAMLs, mostly duplicated with tiny differences.

**Helm** solves this with **templates + values**.

---

## 11.2 What is Helm?

Helm is a **package manager for Kubernetes**, like `apt` for Ubuntu or `npm` for Node.js.

```
Without Helm:   kubectl apply -f deployment.yaml
                kubectl apply -f service.yaml
                kubectl apply -f configmap.yaml
                kubectl apply -f ingress.yaml
                ... (10 more commands)

With Helm:      helm install my-app ./my-chart
                helm upgrade my-app ./my-chart --set image.tag=v2.0
                helm rollback my-app 1
                helm uninstall my-app
```

---

## 11.3 Helm Concepts

| Term | Meaning |
|------|---------|
| **Chart** | A package of Kubernetes templates (like an npm package) |
| **Values** | Configuration variables injected into templates |
| **Release** | A deployed instance of a chart |
| **Repository** | A collection of charts (like npm registry) |

---

## 11.4 Install Helm

```bash
# Linux / macOS
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Verify
helm version

# macOS with Homebrew
brew install helm
```

---

## 11.5 Install an App with Helm (Real World Example: nginx)

```bash
# Add the official nginx chart repo
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

# Search for charts
helm search repo nginx

# Install nginx ingress controller
helm install nginx-ingress ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace

# List installed releases
helm list -A

# Check status
helm status nginx-ingress -n ingress-nginx
kubectl get pods -n ingress-nginx
```

---

## 11.6 Helm Chart Structure

```
my-app/
├── Chart.yaml          # Chart metadata (name, version, description)
├── values.yaml         # Default configuration values
├── templates/          # Kubernetes YAML templates
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── configmap.yaml
│   └── _helpers.tpl    # Reusable template helpers
└── charts/             # Sub-chart dependencies
```

---

## 11.7 Create Your Own Chart

```bash
# Create chart scaffold
helm create my-webapp
ls my-webapp/
```

### Chart.yaml
```yaml
apiVersion: v2
name: my-webapp
description: A Helm chart for my web application
type: application
version: 0.1.0        # Chart version
appVersion: "1.0.0"   # App version
```

### values.yaml
```yaml
# Default values — override per environment
replicaCount: 2

image:
  repository: nginx
  tag: "1.25"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  host: myapp.local

resources:
  requests:
    memory: "64Mi"
    cpu: "100m"
  limits:
    memory: "128Mi"
    cpu: "200m"

env:
  APP_ENV: production
  LOG_LEVEL: info
```

### templates/deployment.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "my-webapp.fullname" . }}
  labels:
    {{- include "my-webapp.labels" . | nindent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      {{- include "my-webapp.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include "my-webapp.selectorLabels" . | nindent 8 }}
    spec:
      containers:
      - name: {{ .Chart.Name }}
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
        imagePullPolicy: {{ .Values.image.pullPolicy }}
        ports:
        - containerPort: {{ .Values.service.port }}
        resources:
          {{- toYaml .Values.resources | nindent 10 }}
        env:
        {{- range $key, $val := .Values.env }}
        - name: {{ $key }}
          value: {{ $val | quote }}
        {{- end }}
```

---

## 11.8 Deploy with Different Values per Environment

```bash
# values-dev.yaml
replicaCount: 1
image:
  tag: "1.24"
env:
  APP_ENV: development
  LOG_LEVEL: debug
```

```bash
# values-prod.yaml
replicaCount: 5
image:
  tag: "1.25"
env:
  APP_ENV: production
  LOG_LEVEL: warn
```

```bash
# Deploy to dev
helm install my-webapp ./my-webapp -f values-dev.yaml -n dev

# Deploy to production
helm install my-webapp ./my-webapp -f values-prod.yaml -n production

# Upgrade production
helm upgrade my-webapp ./my-webapp -f values-prod.yaml -n production --set image.tag=1.26

# Rollback
helm rollback my-webapp 1 -n production

# History
helm history my-webapp -n production
```

---

## 11.9 Real-World System Design: E-commerce App with Helm

A real e-commerce application deployed on Kubernetes with Helm:

```
┌─────────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster                         │
│                                                              │
│   Namespace: production                                      │
│                                                              │
│   ┌──────────────┐    ┌──────────────┐    ┌─────────────┐  │
│   │  frontend    │    │  backend-api │    │  payments   │  │
│   │  (React)     │    │  (Node.js)   │    │  service    │  │
│   │  3 replicas  │    │  5 replicas  │    │  2 replicas │  │
│   └──────┬───────┘    └──────┬───────┘    └──────┬──────┘  │
│          │                   │                    │         │
│          └───────────────────┴────────────────────┘         │
│                              │                               │
│                    ┌─────────▼────────┐                     │
│                    │    PostgreSQL     │                     │
│                    │  (StatefulSet)   │                     │
│                    │  with PVC        │                     │
│                    └──────────────────┘                     │
│                                                              │
│   Helm releases: frontend-chart, api-chart, payments-chart  │
└─────────────────────────────────────────────────────────────┘
```

Each service has its own Helm chart with environment-specific values.

---

## 11.10 Helm Best Practices

```
✅ DO:
  - Use semantic versioning for chart versions (0.1.0, 1.0.0)
  - Separate values files per environment (values-dev.yaml, values-prod.yaml)
  - Pin image tags (never use :latest in production)
  - Use helm lint before deploying
  - Store charts in git (GitOps approach)
  - Use --atomic flag to auto-rollback on failed upgrades

❌ DON'T:
  - Don't store secrets directly in values.yaml → use external-secrets or Vault
  - Don't use helm install on CI without --wait flag
  - Don't modify rendered YAML directly — change templates or values
  - Don't mix helm-managed and kubectl-managed resources for the same app
```

---

## 11.11 Essential Helm Commands

```bash
# Repos
helm repo add <name> <url>
helm repo update
helm repo list
helm search repo <keyword>

# Releases
helm install <release> <chart>
helm upgrade <release> <chart>
helm uninstall <release>
helm list
helm list -A              # all namespaces
helm history <release>
helm rollback <release> <revision>

# Inspect
helm status <release>
helm get values <release>
helm get manifest <release>
helm get all <release>

# Development
helm create <chart-name>
helm lint <chart>
helm template <chart>     # Render templates locally (no cluster needed)
helm install --dry-run --debug <release> <chart>   # Simulate install
```

---

## Hands-On Lab — Install Prometheus with Helm

```bash
# Step 1: Add Prometheus chart repo
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Step 2: Install Prometheus stack
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace

# Step 3: Check what got installed
helm list -n monitoring
kubectl get pods -n monitoring

# Step 4: Access Grafana dashboard
kubectl port-forward -n monitoring svc/prometheus-grafana 3000:80
# Open http://localhost:3000 — admin/prom-operator

# Step 5: Uninstall
helm uninstall prometheus -n monitoring
kubectl delete namespace monitoring
```

---

## References & Further Reading

- **Official Helm docs**: https://helm.sh/docs/
- **Artifact Hub (find charts)**: https://artifacthub.io/
- **Helm best practices**: https://helm.sh/docs/chart_best_practices/
- **Helm + Kubernetes guide — Medium**: https://medium.com/@mayanksaini4455/kubernetes-and-helmfile-complete-guide-from-basics-to-real-world-usage-8c0f4e50876d
- **Helm chart tutorial**: https://www.classcentral.com/course/youtube-kubernetes-tutorial-for-beginners-full-course-in-4-hours-108866

## Video Tutorials

- **TechWorld with Nana — Helm full tutorial**: https://www.classcentral.com/course/youtube-kubernetes-tutorial-for-beginners-full-course-in-4-hours-108866
- **Complete K8s Beginner to Pro**: https://www.youtube.com/watch?v=2T86xAtR6Fo
- **Kubernetes Zero to Hero**: https://www.youtube.com/watch?v=MTHGoGUFpvE

---

## Key Takeaways

- Helm = package manager for Kubernetes. One command deploys/upgrades/rolls back entire apps.
- Chart = templates + values. Values differ per environment.
- `helm install`, `helm upgrade`, `helm rollback`, `helm uninstall` are the 4 core commands.
- Always use `helm lint` and `helm template` before deploying.
- Pin image tags, separate values per environment, never store secrets in values.yaml.

---

## Next Chapter
[Chapter 12 — Monitoring & Logging →](../chapter-12-monitoring-logging/README.md)
