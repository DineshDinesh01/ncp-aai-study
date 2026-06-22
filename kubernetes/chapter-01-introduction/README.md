# Chapter 01 — Introduction to Kubernetes

## What You Will Learn
- What Kubernetes is and why it exists
- Containers vs Virtual Machines
- Problems Kubernetes solves
- Key Kubernetes terminology

---

## 1.1 What is Kubernetes?

Kubernetes (often written **K8s**) is an open-source **container orchestration platform** originally created by Google, now maintained by the CNCF (Cloud Native Computing Foundation).

In simple words:
> Kubernetes **automatically manages, scales, and heals** your containerised applications across a cluster of machines.

### Real-world analogy
Think of Kubernetes as an **airport control tower**:
- Planes (containers) need to land, take off, and be routed correctly.
- The control tower (Kubernetes) decides which runway (node/machine) each plane uses.
- If a runway is blocked (node failure), the control tower reroutes planes automatically.

---

## 1.2 Containers vs Virtual Machines

| Feature | Virtual Machine (VM) | Container |
|---------|----------------------|-----------|
| Startup time | Minutes | Seconds |
| Size | GBs | MBs |
| OS | Full guest OS per VM | Shares host OS kernel |
| Isolation | Strong (hypervisor) | Process-level |
| Portability | Limited | High |

**Why containers?**
- Containers package your app + its dependencies together.
- "Works on my machine" problem disappears.
- Docker is the most popular container runtime.

---

## 1.3 The Problem Kubernetes Solves

Imagine you have 100 containers running your app in production. Without Kubernetes:

1. **Scaling** — You have to manually start/stop containers on each server.
2. **Failure recovery** — If a container crashes, nobody restarts it automatically.
3. **Load balancing** — You have to configure it yourself.
4. **Rolling updates** — Deploying a new version without downtime is hard.
5. **Configuration management** — Secrets and config spread across machines.

Kubernetes solves **all of the above** automatically.

---

## 1.4 What Kubernetes Does

```
┌─────────────────────────────────────────────────────┐
│                    Kubernetes                        │
│                                                      │
│  ✅ Scheduling      → Decide which machine runs what │
│  ✅ Self-healing    → Restart crashed containers     │
│  ✅ Auto-scaling    → Add/remove containers on load  │
│  ✅ Rolling updates → Zero-downtime deployments      │
│  ✅ Service discovery → Containers find each other   │
│  ✅ Load balancing  → Distribute traffic             │
│  ✅ Secret mgmt     → Store passwords securely       │
└─────────────────────────────────────────────────────┘
```

---

## 1.5 Key Kubernetes Concepts (Vocabulary)

You will see these terms throughout the course. Don't memorise them now — just recognise them.

| Term | Simple Meaning |
|------|---------------|
| **Cluster** | A group of machines (nodes) managed by Kubernetes |
| **Node** | A single machine (physical or VM) in the cluster |
| **Pod** | The smallest unit — one or more containers running together |
| **Deployment** | Manages how many copies of your app run and how to update them |
| **Service** | Stable network address to reach your pods |
| **Namespace** | Virtual partition inside a cluster (like folders) |
| **kubectl** | Command-line tool to talk to Kubernetes |
| **YAML** | The file format used to define everything in Kubernetes |

---

## 1.6 Kubernetes Ecosystem at a Glance

```
Developer
    │
    │  writes YAML (desired state)
    ▼
kubectl ──────► Kubernetes API Server
                        │
              ┌─────────┴──────────┐
              │                    │
           Node 1               Node 2
         ┌────────┐           ┌────────┐
         │  Pod A │           │  Pod B │
         │  Pod C │           │  Pod D │
         └────────┘           └────────┘
```

---

## 1.7 Hands-On Lab — Verify Your Understanding

No cluster needed yet. Just answer these in your own words:

1. What is the difference between a container and a VM?
2. If a container crashes at 3am, what does Kubernetes do?
3. You need to run 10 copies of your web app. How does Kubernetes help?
4. What is `kubectl`?

---

## Key Takeaways

- Kubernetes orchestrates containers at scale.
- It handles scheduling, healing, scaling, and networking automatically.
- The core unit is a **Pod** (wraps containers).
- You describe **desired state** in YAML; Kubernetes makes it happen.

---

## Next Chapter
[Chapter 02 — Kubernetes Architecture →](../chapter-02-architecture/README.md)
