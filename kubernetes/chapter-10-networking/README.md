# Chapter 10 — Networking Deep Dive

> Official Docs: https://kubernetes.io/docs/concepts/cluster-administration/networking/
> Network Policies: https://kubernetes.io/docs/concepts/services-networking/network-policies/

## What You Will Learn
- How Kubernetes networking works (the model)
- CNI plugins (Calico, Flannel, Cilium)
- Cluster DNS in depth
- Network Policies (firewall rules for pods)

---

## 10.1 The Kubernetes Networking Model

Kubernetes enforces these networking rules:
1. Every Pod gets its **own unique IP address**.
2. Pods on any node can communicate with all pods on any other node **without NAT**.
3. Agents on a node can communicate with all pods on that node.

```
Node 1                     Node 2
┌────────────────┐         ┌────────────────┐
│ Pod A          │         │ Pod C          │
│ IP: 10.244.0.2 │────────▶│ IP: 10.244.1.5 │
│                │  direct │                │
│ Pod B          │  route  │ Pod D          │
│ IP: 10.244.0.3 │         │ IP: 10.244.1.6 │
└────────────────┘         └────────────────┘
```

---

## 10.2 CNI — Container Network Interface

A **CNI plugin** implements the Kubernetes networking model. It sets up Pod IPs, routes, etc.

| CNI Plugin | Key Features | Best For |
|-----------|-------------|----------|
| **Flannel** | Simple, overlay network | Dev/small clusters |
| **Calico** | Network policies, BGP routing | Production, on-prem |
| **Cilium** | eBPF-based, Layer 7 policies | Modern production, observability |
| **Weave** | Simple, auto-discovery | Small clusters |

Minikube uses **kindnet** by default. You can switch:
```bash
# Start with Calico
minikube start --cni=calico

# Start with Cilium
minikube start --cni=cilium
```

---

## 10.3 Cluster DNS — How Pods Find Services

Kubernetes runs **CoreDNS** as the cluster DNS server.

Every Service automatically gets a DNS entry:
```
<service-name>.<namespace>.svc.cluster.local
```

Examples:
```bash
# Same namespace: use just the service name
curl http://nginx-service

# Different namespace: use full FQDN
curl http://nginx-service.production.svc.cluster.local

# Database connection string (app using DB in same namespace)
postgresql://postgres-service:5432/mydb
```

### Test DNS resolution:
```bash
kubectl run dns-debug --image=busybox -it --rm -- sh

# Inside the pod:
nslookup kubernetes            # Should resolve cluster's API server
nslookup nginx-service         # Resolves service in same namespace
cat /etc/resolv.conf           # See DNS config injected by K8s
```

---

## 10.4 How kube-proxy Handles Traffic

`kube-proxy` runs on every node and uses `iptables` (or `ipvs`) rules to route traffic:

```
Client Pod → Service IP (ClusterIP) → kube-proxy iptables → Pod IP
```

When you create a Service, kube-proxy adds iptables rules:
```bash
# View iptables rules (on minikube)
minikube ssh
sudo iptables -t nat -L KUBE-SERVICES | head -20
```

---

## 10.5 Network Policies — Pod-Level Firewalls

By default, **all pods can talk to all pods**. **Network Policies** restrict this.

> Network Policies require a CNI that supports them (Calico, Cilium, Weave).

### Default deny all ingress:
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-ingress
  namespace: production
spec:
  podSelector: {}           # Applies to ALL pods in namespace
  policyTypes:
  - Ingress
  # No ingress rules = deny all ingress
```

### Allow only specific traffic:
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: backend             # Policy applies to backend pods
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend        # Only frontend pods can reach backend
    ports:
    - protocol: TCP
      port: 8080
```

### Allow traffic from specific namespace:
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-monitoring
spec:
  podSelector:
    matchLabels:
      app: myapp
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: monitoring   # From monitoring namespace
```

---

## 10.6 DNS for Pods (not Services)

Pods also get DNS entries (less commonly used):
```
<pod-ip-dashes>.<namespace>.pod.cluster.local
# Example: 10-244-0-5.default.pod.cluster.local
```

---

## 10.7 Hands-On Lab — Network Policy

```bash
# Step 1: Enable Calico on Minikube (needed for NetworkPolicy)
minikube start --cni=calico
# Wait for calico pods
kubectl get pods -n kube-system | grep calico

# Step 2: Create test namespaces and pods
kubectl create namespace web-tier
kubectl create namespace db-tier

kubectl run frontend --image=nginx:1.25 -n web-tier --labels="app=frontend"
kubectl run backend  --image=nginx:1.25 -n web-tier --labels="app=backend"
kubectl run database --image=nginx:1.25 -n db-tier  --labels="app=database"

# Step 3: Verify default — all can talk
kubectl exec -n web-tier frontend -- wget -qO- backend.web-tier.svc.cluster.local 2>/dev/null || echo "Need service"

# Step 4: Apply Network Policy — deny all to backend
cat > /tmp/netpol.yaml << 'EOF'
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: backend-policy
  namespace: web-tier
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend     # Only frontend can reach backend
    ports:
    - protocol: TCP
      port: 80
EOF
kubectl apply -f /tmp/netpol.yaml

# Step 5: Check the policy
kubectl get networkpolicy -n web-tier
kubectl describe networkpolicy backend-policy -n web-tier

# Cleanup
kubectl delete namespace web-tier db-tier
```

---

## References & Further Reading

- **Kubernetes networking model**: https://kubernetes.io/docs/concepts/cluster-administration/networking/
- **Network Policies**: https://kubernetes.io/docs/concepts/services-networking/network-policies/
- **CoreDNS docs**: https://kubernetes.io/docs/tasks/administer-cluster/coredns/
- **Calico docs**: https://docs.tigera.io/calico/latest/about/
- **Cilium docs**: https://docs.cilium.io/en/stable/

## Video Tutorials

- **TechWorld with Nana — Full K8s Course**: https://www.classcentral.com/course/youtube-kubernetes-tutorial-for-beginners-full-course-in-4-hours-108866
- **Kubernetes Networking Explained**: https://www.youtube.com/watch?v=2T86xAtR6Fo

---

## Key Takeaways

- Every Pod gets a unique IP — pods can communicate directly without NAT.
- **CNI plugins** (Calico, Cilium, Flannel) implement the network model.
- **CoreDNS** provides cluster DNS — services resolve via `<name>.<ns>.svc.cluster.local`.
- **Network Policies** are pod-level firewall rules — need a compatible CNI.
- Default: all pods can talk to all pods. NetworkPolicy restricts this.

---

## Next Chapter
[Chapter 11 — Helm Package Manager →](../chapter-11-helm/README.md)
