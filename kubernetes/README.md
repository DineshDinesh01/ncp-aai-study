# Kubernetes Complete Study Guide — Beginner to Advanced

A structured, hands-on tutorial series covering Kubernetes from zero to production-ready.

---

## Chapters

| # | Chapter | Topics |
|---|---------|--------|
| 01 | [Introduction to Kubernetes](chapter-01-introduction/README.md) | What is K8s, why use it, containers vs VMs |
| 02 | [Kubernetes Architecture](chapter-02-architecture/README.md) | Control plane, nodes, etcd, API server |
| 03 | [Installation & Setup](chapter-03-installation/README.md) | Minikube, kubectl, kubeadm |
| 04 | [Pods — The Basics](chapter-04-pods/README.md) | Create/run/debug pods, YAML manifests |
| 05 | [Deployments](chapter-05-deployments/README.md) | ReplicaSets, rolling updates, rollback |
| 06 | [Services & Networking](chapter-06-services/README.md) | ClusterIP, NodePort, LoadBalancer, Ingress |
| 07 | [ConfigMaps & Secrets](chapter-07-configmaps-secrets/README.md) | Externalise config, manage secrets |
| 08 | [Storage & Volumes](chapter-08-storage/README.md) | PV, PVC, StorageClass, emptyDir |
| 09 | [Namespaces & RBAC](chapter-09-namespaces-rbac/README.md) | Multi-tenancy, roles, service accounts |
| 10 | [Networking Deep Dive](chapter-10-networking/README.md) | CNI, DNS, Network Policies |
| 11 | [Helm — Package Manager](chapter-11-helm/README.md) | Charts, values, releases, repositories |
| 12 | [Monitoring & Logging](chapter-12-monitoring-logging/README.md) | Prometheus, Grafana, EFK stack |

---

## Prerequisites
- Basic Linux command line
- Docker fundamentals (images, containers)
- Any text editor (VSCode recommended)

## How to Use This Guide
1. Follow chapters **in order** — each builds on the previous.
2. Every chapter has:
   - **Concept** section (theory with diagrams)
   - **Hands-On Lab** section (practice commands)
   - **YAML examples** you can copy-paste
   - **Best practices** for production
   - **Real-world system design** examples
   - **References** to official docs + video tutorials
   - **Key Takeaways** at the end
3. Run every command yourself — reading alone won't build muscle memory.

---

## Best Practices & Real-World Design
[BEST-PRACTICES.md](BEST-PRACTICES.md) — Production patterns, HA, security, cost optimization, CI/CD, and Medium blog tips.

---

## Free Video Courses

| Course | Creator | Link |
|--------|---------|------|
| Kubernetes Tutorial for Beginners (4 hours) | TechWorld with Nana | [Watch](https://www.classcentral.com/course/youtube-kubernetes-tutorial-for-beginners-full-course-in-4-hours-108866) |
| Complete Kubernetes Course — Beginner to Pro | DevOps Directive | [Watch](https://www.youtube.com/watch?v=2T86xAtR6Fo) |
| Kubernetes Zero to Hero (2025 Edition) | — | [Watch](https://www.youtube.com/watch?v=MTHGoGUFpvE) |
| Kubernetes for Absolute Beginners | — | [Watch](https://www.classcentral.com/course/youtube-kubernetes-for-the-absolute-beginners-45688) |
| 200 Best K8s YouTube Videos | — | [Browse](https://developereducators.com/best/kubernetes/) |
| Best K8s Courses 2026 (ranked list) | Class Central | [Browse](https://www.classcentral.com/report/best-kubernetes-courses/) |

---

## Official References

- **Kubernetes docs**: https://kubernetes.io/docs/home/
- **Kubernetes tutorials**: https://kubernetes.io/docs/tutorials/
- **Latest release (v1.36.1, June 2026)**: https://kubernetes.io/releases/
- **kubectl cheat sheet**: https://kubernetes.io/docs/reference/kubectl/cheatsheet/
- **K8s Security 2025 updates**: https://www.cncf.io/blog/2025/12/15/kubernetes-security-2025-stable-features-and-2026-preview/
