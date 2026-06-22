# Chapter 03 — Installation & Setup

> **Latest Kubernetes version as of June 2026: v1.36.1**
> Official release page: https://kubernetes.io/releases/

## What You Will Learn
- Install `kubectl` (the Kubernetes CLI)
- Set up a local cluster using **Minikube**
- Verify the installation
- Run your first command against the cluster

---

## 3.1 Tools You Need

| Tool | Purpose | Install Guide |
|------|---------|--------------|
| **kubectl** | CLI to talk to any Kubernetes cluster | https://kubernetes.io/docs/tasks/tools/ |
| **Minikube** | Runs a local single-node cluster on your laptop | https://minikube.sigs.k8s.io/docs/start/ |
| **Docker** | Container runtime (used by Minikube) | https://docs.docker.com/get-docker/ |

---

## 3.2 Install kubectl

### Linux
```bash
# Download latest stable version
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

# Make it executable and move to PATH
chmod +x kubectl
sudo mv kubectl /usr/local/bin/

# Verify
kubectl version --client
```

### macOS (Homebrew)
```bash
brew install kubectl
kubectl version --client
```

### Windows (Chocolatey)
```powershell
choco install kubernetes-cli
kubectl version --client
```

---

## 3.3 Install Minikube

### Linux / macOS
```bash
# Linux
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# macOS
brew install minikube
```

### Windows
```powershell
choco install minikube
```

---

## 3.4 Start Your First Cluster

```bash
# Start with Docker driver (recommended)
minikube start --driver=docker

# You should see output like:
# 😄  minikube v1.34.0
# ✨  Using the docker driver
# 👍  Starting control plane node minikube
# 🐳  Preparing Kubernetes v1.36.1 on Docker
# ✅  Done! kubectl is now configured to use "minikube"
```

---

## 3.5 Verify the Cluster

```bash
# Check cluster info
kubectl cluster-info

# See the nodes in your cluster
kubectl get nodes

# Expected output:
# NAME       STATUS   ROLES           AGE   VERSION
# minikube   Ready    control-plane   30s   v1.36.1

# Check all system pods running
kubectl get pods -n kube-system
```

---

## 3.6 Essential kubectl Commands Cheat Sheet

```bash
# Get resources
kubectl get pods                    # list pods in default namespace
kubectl get pods -n kube-system     # list pods in kube-system namespace
kubectl get pods -A                 # all namespaces
kubectl get nodes                   # list nodes
kubectl get services                # list services
kubectl get deployments             # list deployments
kubectl get all                     # show everything

# Describe (detailed info)
kubectl describe pod <pod-name>
kubectl describe node minikube

# Logs
kubectl logs <pod-name>
kubectl logs -f <pod-name>          # follow/stream logs

# Execute into a pod (like docker exec)
kubectl exec -it <pod-name> -- bash

# Delete resources
kubectl delete pod <pod-name>
kubectl delete -f myfile.yaml

# Apply a YAML manifest
kubectl apply -f myfile.yaml

# Get resource as YAML
kubectl get pod <pod-name> -o yaml
```

---

## 3.7 kubectl Autocomplete (Very Useful!)

```bash
# Bash
echo 'source <(kubectl completion bash)' >> ~/.bashrc
echo 'alias k=kubectl' >> ~/.bashrc
echo 'complete -F __start_kubectl k' >> ~/.bashrc
source ~/.bashrc

# Zsh
echo 'source <(kubectl completion zsh)' >> ~/.zshrc
source ~/.zshrc
```

---

## 3.8 Minikube Useful Commands

```bash
minikube status           # check cluster status
minikube stop             # stop the cluster (saves state)
minikube delete           # delete the cluster completely
minikube dashboard        # open Kubernetes dashboard in browser
minikube ssh              # SSH into the minikube VM
minikube addons list      # list available addons
minikube addons enable metrics-server   # enable metrics server
```

---

## 3.9 Hands-On Lab

Complete all these steps:

```bash
# Step 1: Start cluster
minikube start --driver=docker

# Step 2: Verify nodes
kubectl get nodes

# Step 3: Check system pods
kubectl get pods -n kube-system

# Step 4: Open the Kubernetes dashboard
minikube dashboard

# Step 5: Get cluster info
kubectl cluster-info

# Step 6: Check kubectl version
kubectl version
```

Expected: All nodes show `Ready`, all kube-system pods show `Running`.

---

## References & Further Reading

- **Official kubectl install docs**: https://kubernetes.io/docs/tasks/tools/
- **Minikube official docs**: https://minikube.sigs.k8s.io/docs/start/
- **kubectl cheat sheet (official)**: https://kubernetes.io/docs/reference/kubectl/cheatsheet/
- **Kubernetes releases**: https://kubernetes.io/releases/

## Video Tutorials

- **TechWorld with Nana — Kubernetes Full Course (4 hours)**: https://www.classcentral.com/course/youtube-kubernetes-tutorial-for-beginners-full-course-in-4-hours-108866
- **Complete Kubernetes Course Beginner to Pro**: https://www.youtube.com/watch?v=2T86xAtR6Fo
- **Kubernetes Zero to Hero (2025 Edition)**: https://www.youtube.com/watch?v=MTHGoGUFpvE

---

## Key Takeaways

- `kubectl` is your main tool — learn it well.
- Minikube gives you a full Kubernetes cluster on your laptop.
- `kubectl get`, `describe`, `logs`, `exec`, `apply`, `delete` are the 6 most used commands.
- Always verify with `kubectl get nodes` after starting Minikube.

---

## Next Chapter
[Chapter 04 — Pods →](../chapter-04-pods/README.md)
