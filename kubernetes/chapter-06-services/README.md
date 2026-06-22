# Chapter 06 — Services & Networking

> Official Docs: https://kubernetes.io/docs/concepts/services-networking/service/

## What You Will Learn
- Why Services exist (the Pod IP problem)
- ClusterIP, NodePort, LoadBalancer service types
- Ingress controller for HTTP routing
- DNS within the cluster

---

## 6.1 The Problem: Pod IPs are Unstable

Pods are temporary. Every time a pod restarts or is replaced, it gets a **new IP address**.

```
Before: nginx-pod-abc123 → IP: 10.244.0.5
After crash & restart: nginx-pod-xyz789 → IP: 10.244.0.8  (different!)
```

Other apps cannot hardcode pod IPs. **Services** solve this by providing a **stable endpoint**.

---

## 6.2 What is a Service?

A **Service** is a stable network abstraction that:
- Gets a permanent IP (ClusterIP) that never changes.
- Uses **label selectors** to find Pods.
- Load-balances traffic across all matching Pods.
- Watches for Pods being added/removed automatically.

```
          Client
            │
            ▼
    ┌───────────────┐
    │    Service    │  ← Stable IP: 10.96.0.100
    │   (nginx-svc) │
    └───────────────┘
         │   │   │
         ▼   ▼   ▼
      Pod1 Pod2 Pod3   ← Pods come and go, Service stays
```

---

## 6.3 Service Types

| Type | Accessible From | Use Case |
|------|----------------|----------|
| **ClusterIP** | Inside cluster only | Default; backend-to-backend communication |
| **NodePort** | Outside cluster via Node IP + port | Dev/testing; quick external access |
| **LoadBalancer** | Outside via cloud load balancer | Production on cloud (AWS, GCP, Azure) |
| **ExternalName** | Maps to external DNS name | Redirect to external service |

---

## 6.4 ClusterIP Service (Default)

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: ClusterIP           # Default type (internal only)
  selector:
    app: nginx              # Routes to pods with label app=nginx
  ports:
  - protocol: TCP
    port: 80                # Service port (what clients call)
    targetPort: 80          # Pod port (where traffic goes)
```

```bash
kubectl apply -f service.yaml
kubectl get services

# Output:
# NAME            TYPE        CLUSTER-IP      PORT(S)   AGE
# nginx-service   ClusterIP   10.96.0.100     80/TCP    10s

# Test from inside the cluster
kubectl run test --image=busybox -it --rm -- wget -O- nginx-service:80
```

---

## 6.5 NodePort Service (External Access)

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-nodeport
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 80             # Service port
    targetPort: 80       # Pod port
    nodePort: 30080      # External port on each node (30000-32767)
```

```bash
kubectl apply -f nodeport.yaml

# Get Minikube's IP
minikube ip
# e.g., 192.168.49.2

# Access app from your browser or curl
curl http://192.168.49.2:30080

# With minikube, easier way:
minikube service nginx-nodeport
```

---

## 6.6 LoadBalancer Service (Cloud)

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-lb
spec:
  type: LoadBalancer
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
```

On Minikube:
```bash
kubectl apply -f loadbalancer.yaml
# Note: LoadBalancer stays "pending" on Minikube without a cloud provider

# Use this to simulate:
minikube tunnel   # Run in separate terminal
kubectl get service nginx-lb  # now shows EXTERNAL-IP
```

---

## 6.7 Complete Example: Deployment + Service Together

`app-full.yaml`:
```yaml
# Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web
        image: nginx:1.25
        ports:
        - containerPort: 80
---
# Service (--- separates multiple resources in one file)
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  type: NodePort
  selector:
    app: web
  ports:
  - port: 80
    targetPort: 80
    nodePort: 30090
```

```bash
kubectl apply -f app-full.yaml
kubectl get all
minikube service web-service
```

---

## 6.8 Kubernetes DNS — Service Discovery

Inside a cluster, every Service gets a DNS name automatically:

```
<service-name>.<namespace>.svc.cluster.local
```

Examples:
```bash
# Same namespace: just use service name
curl nginx-service

# Different namespace: use full name
curl nginx-service.production.svc.cluster.local

# Test DNS from inside a pod
kubectl run dns-test --image=busybox -it --rm -- nslookup nginx-service
```

---

## 6.9 Ingress — HTTP Routing

A **Service** of type NodePort/LoadBalancer has one IP per app. **Ingress** allows routing multiple apps through a **single IP/domain** using HTTP rules.

```
Internet
    │
    ▼
Ingress Controller (nginx)
    │
    ├── /api    → api-service
    ├── /web    → web-service
    └── /admin  → admin-service
```

### Enable Ingress on Minikube
```bash
minikube addons enable ingress
kubectl get pods -n ingress-nginx
```

### Ingress YAML
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: myapp.local
    http:
      paths:
      - path: /web
        pathType: Prefix
        backend:
          service:
            name: web-service
            port:
              number: 80
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 8080
```

---

## 6.10 Hands-On Lab

```bash
# Step 1: Create a deployment
kubectl create deployment webapp --image=nginx:1.25 --replicas=3

# Step 2: Expose as ClusterIP
kubectl expose deployment webapp --port=80 --target-port=80 --name=webapp-svc
kubectl get service webapp-svc

# Step 3: Test from inside cluster
kubectl run test-pod --image=busybox -it --rm -- wget -O- webapp-svc:80

# Step 4: Expose as NodePort
kubectl expose deployment webapp --port=80 --target-port=80 --type=NodePort --name=webapp-nodeport
kubectl get service webapp-nodeport
minikube service webapp-nodeport

# Step 5: Watch load balancing
for i in {1..10}; do curl $(minikube service webapp-nodeport --url); done

# Cleanup
kubectl delete deployment webapp
kubectl delete service webapp-svc webapp-nodeport
```

---

## References & Further Reading

- **Official Services docs**: https://kubernetes.io/docs/concepts/services-networking/service/
- **Services tutorial**: https://kubernetes.io/docs/tutorials/kubernetes-basics/expose/expose-intro/
- **Ingress docs**: https://kubernetes.io/docs/concepts/services-networking/ingress/
- **Spacelift Kubernetes tutorial (Services)**: https://spacelift.io/blog/kubernetes-tutorial
- **DataCamp Kubernetes tutorial**: https://www.datacamp.com/tutorial/kubernetes

## Video Tutorials

- **TechWorld with Nana — Kubernetes Services**: https://www.classcentral.com/course/youtube-kubernetes-tutorial-for-beginners-full-course-in-4-hours-108866
- **Complete K8s Course**: https://www.youtube.com/watch?v=2T86xAtR6Fo

---

## Key Takeaways

- Services give Pods a **stable IP and DNS name**.
- **ClusterIP**: internal only. **NodePort**: external via port. **LoadBalancer**: cloud LB.
- Services use **label selectors** — labels on pods must match.
- **Ingress** routes multiple services through one IP using HTTP rules.
- Cluster DNS: `<service>.<namespace>.svc.cluster.local`

---

## Next Chapter
[Chapter 07 — ConfigMaps & Secrets →](../chapter-07-configmaps-secrets/README.md)
