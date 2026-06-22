# Chapter 02 — Kubernetes Architecture

## What You Will Learn
- The two types of nodes: Control Plane and Worker Nodes
- What runs on each type
- How all components talk to each other
- The concept of "desired state"

---

## 2.1 The Big Picture

A Kubernetes cluster has two kinds of machines:

```
┌──────────────────────────────────────────────────────────────────┐
│                        KUBERNETES CLUSTER                         │
│                                                                    │
│  ┌──────────────────────────────┐                                 │
│  │      CONTROL PLANE (Master)  │   ← The "brain"                 │
│  │                              │                                 │
│  │  API Server                  │                                 │
│  │  etcd                        │                                 │
│  │  Scheduler                   │                                 │
│  │  Controller Manager          │                                 │
│  └──────────────────────────────┘                                 │
│                │                                                   │
│       ┌────────┴────────┐                                         │
│       ▼                 ▼                                         │
│  ┌──────────┐     ┌──────────┐                                    │
│  │  Worker  │     │  Worker  │   ← Where your apps run            │
│  │  Node 1  │     │  Node 2  │                                    │
│  │  kubelet │     │  kubelet │                                    │
│  │  kube-   │     │  kube-   │                                    │
│  │  proxy   │     │  proxy   │                                    │
│  │  runtime │     │  runtime │                                    │
│  └──────────┘     └──────────┘                                    │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2.2 Control Plane Components

The control plane is the "brain" — it makes all decisions.

### 2.2.1 API Server (`kube-apiserver`)
- **The front door** of Kubernetes.
- Every request (from `kubectl`, dashboards, CI/CD) goes through the API Server.
- Validates and processes REST API calls.
- Stores the result in etcd.

```
kubectl apply -f pod.yaml
       │
       ▼
  API Server  ──► validates ──► stores in etcd ──► notifies scheduler
```

### 2.2.2 etcd
- A **distributed key-value database**.
- Stores the entire cluster state (what pods exist, their status, config, secrets).
- Think of it as the cluster's "memory" or "source of truth".
- If etcd is lost, the cluster loses its state — **always back it up in production**.

### 2.2.3 Scheduler (`kube-scheduler`)
- Watches for new Pods that haven't been assigned to a node yet.
- Picks the best node to run each Pod based on:
  - Available CPU/memory
  - Node labels
  - Affinity rules
  - Taints and tolerations

### 2.2.4 Controller Manager (`kube-controller-manager`)
- Runs a set of **controllers** in a single process.
- Each controller watches cluster state and works to match desired state.

| Controller | Job |
|-----------|-----|
| Node Controller | Notices when nodes go down |
| ReplicaSet Controller | Ensures correct number of pod copies |
| Endpoints Controller | Links Services to Pods |
| Service Account Controller | Creates default service accounts |

---

## 2.3 Worker Node Components

Worker nodes are where your application containers actually run.

### 2.3.1 kubelet
- An agent that runs on **every worker node**.
- Receives Pod specifications from the API Server.
- Ensures containers described in those specs are running and healthy.
- Reports node/pod status back to the API Server.

### 2.3.2 kube-proxy
- Runs on every node.
- Manages network rules (iptables/ipvs) to allow communication to Pods.
- Implements the "Service" abstraction — routes traffic to the correct pod.

### 2.3.3 Container Runtime
- The software that actually runs containers (e.g., **containerd**, CRI-O, Docker).
- kubelet tells the runtime to start/stop containers.

---

## 2.4 How It All Works Together — Step by Step

**Scenario:** You run `kubectl apply -f deployment.yaml`

```
Step 1: kubectl sends YAML to API Server
Step 2: API Server validates it and stores it in etcd
Step 3: Scheduler sees "unscheduled pods" → picks a node → updates etcd
Step 4: kubelet on that node sees new work from API Server
Step 5: kubelet tells container runtime to pull image & start container
Step 6: Container starts, kubelet reports "Running" to API Server
Step 7: API Server updates etcd with current state
```

---

## 2.5 Desired State vs Actual State

This is the **most important concept** in Kubernetes.

- You tell Kubernetes: "I want 3 copies of my nginx app" — this is **desired state**.
- Kubernetes constantly checks: how many are actually running? — this is **actual state**.
- If actual ≠ desired, Kubernetes fixes it automatically.

```
Desired State:  3 nginx pods
Actual State:   2 nginx pods  (one crashed)
                     │
                     ▼
     Controller Manager detects mismatch
                     │
                     ▼
     Scheduler creates 1 new pod → Node 2
                     │
                     ▼
     Actual State:  3 nginx pods  ✅
```

---

## 2.6 Cloud Provider Integration (Optional)

In managed Kubernetes (EKS, GKE, AKS), the cloud provider runs and manages the control plane for you. You only manage worker nodes (or they manage those too).

```
Your Laptop
    │ kubectl
    ▼
AWS EKS Control Plane (managed by AWS)
    │
    ▼
Your Worker Nodes (EC2 instances)
```

---

## 2.7 Hands-On Lab — Architecture Quiz

Answer these before moving on:

1. Which component stores all cluster data?
2. Which component decides which node a Pod runs on?
3. What runs on every worker node to manage containers?
4. If you have 3 pods desired but 2 are running, which component fixes this?
5. What is "desired state"?

---

## Key Takeaways

- Kubernetes cluster = **Control Plane** + **Worker Nodes**
- Control Plane components: API Server, etcd, Scheduler, Controller Manager
- Worker Node components: kubelet, kube-proxy, container runtime
- Kubernetes continuously reconciles **desired state** with **actual state**
- The API Server is the single entry point for all cluster operations

---

## Next Chapter
[Chapter 03 — Installation & Setup →](../chapter-03-installation/README.md)
