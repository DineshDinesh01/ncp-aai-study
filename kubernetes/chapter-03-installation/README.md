# Chapter 03 — Installation & Setup: Minikube + Real Kubernetes Cluster

> **Latest Kubernetes version as of June 2026: v1.36.1**
> Official release page: https://kubernetes.io/releases/
> Official install docs: https://kubernetes.io/docs/setup/

## What You Will Learn
- Install `kubectl` (works for all cluster types)
- **Path A** — Local dev cluster with Minikube
- **Path B** — Real multi-node cluster with kubeadm (on VMs/bare metal)
- **Path C** — Managed Kubernetes on cloud (EKS, GKE, AKS)
- How to switch between clusters with kubeconfig

---

## 3.1 Install kubectl (Required for All Paths)

`kubectl` is the CLI tool that works against **any** Kubernetes cluster — local or cloud.

### Linux
```bash
# Download latest stable kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

# Install
chmod +x kubectl
sudo mv kubectl /usr/local/bin/

# Verify
kubectl version --client
# Client Version: v1.36.1
```

### macOS
```bash
brew install kubectl
kubectl version --client
```

### Windows
```powershell
choco install kubernetes-cli
kubectl version --client
```

### Enable Autocomplete (Save hours of typing)
```bash
# Bash
echo 'source <(kubectl completion bash)' >> ~/.bashrc
echo 'alias k=kubectl' >> ~/.bashrc
echo 'complete -F __start_kubectl k' >> ~/.bashrc
source ~/.bashrc

# Zsh
echo 'source <(kubectl completion zsh)' >> ~/.zshrc
source ~/.zshrc

# Now you can type: k get po<TAB>  →  k get pods
```

---

## PATH A — Minikube (Local Single-Node Cluster)

**Best for:** Learning, local development, testing YAML manifests.

```
Your Laptop
└── Minikube VM / Container
    └── Single-node K8s cluster (control plane + worker in one)
```

### 3.A.1 Install Minikube

```bash
# Linux
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# macOS
brew install minikube

# Windows
choco install minikube
```

### 3.A.2 Start Minikube

```bash
# With Docker driver (recommended — no VM needed)
minikube start --driver=docker

# With more resources (for heavier workloads)
minikube start --driver=docker --cpus=4 --memory=8192

# With a specific K8s version
minikube start --kubernetes-version=v1.36.1

# Start with Calico CNI (needed for NetworkPolicy)
minikube start --cni=calico
```

Expected output:
```
😄  minikube v1.34.0 on Linux
✨  Using the docker driver
👍  Starting control plane node minikube
🐳  Preparing Kubernetes v1.36.1 on Docker
✅  Done! kubectl is now configured to use "minikube"
```

### 3.A.3 Verify Minikube Cluster

```bash
kubectl get nodes
# NAME       STATUS   ROLES           AGE   VERSION
# minikube   Ready    control-plane   60s   v1.36.1

kubectl cluster-info
kubectl get pods -n kube-system
```

### 3.A.4 Minikube Useful Commands

```bash
minikube status           # is the cluster running?
minikube stop             # pause cluster (state preserved)
minikube start            # resume
minikube delete           # wipe completely

minikube dashboard        # open web UI in browser
minikube ssh              # SSH into the node
minikube ip               # get node IP (for NodePort access)
minikube service <name>   # open a NodePort service in browser
minikube tunnel           # simulate LoadBalancer (run in separate terminal)

minikube addons list
minikube addons enable ingress
minikube addons enable metrics-server
minikube addons enable dashboard
```

### 3.A.5 Minikube Multi-Node (Simulate Real Cluster)

```bash
# 1 control plane + 2 worker nodes
minikube start --nodes=3 --driver=docker

kubectl get nodes
# NAME           STATUS   ROLES           AGE   VERSION
# minikube       Ready    control-plane   2m    v1.36.1
# minikube-m02   Ready    <none>          90s   v1.36.1
# minikube-m03   Ready    <none>          60s   v1.36.1
```

---

## PATH B — Real Kubernetes Cluster with kubeadm

**Best for:** Learning production setup, on-prem, bare metal, VMs.

```
VM 1 (control-plane)   VM 2 (worker)   VM 3 (worker)
┌────────────────┐     ┌────────────┐  ┌────────────┐
│  API Server    │     │  kubelet   │  │  kubelet   │
│  etcd          │────►│  kube-proxy│  │  kube-proxy│
│  Scheduler     │     │  containerd│  │  containerd│
│  Controller    │     └────────────┘  └────────────┘
└────────────────┘
```

### 3.B.1 VM Requirements

| Node | CPU | RAM | Disk | OS |
|------|-----|-----|------|----|
| control-plane | 2+ vCPU | 4+ GB | 20+ GB | Ubuntu 22.04 |
| worker-1 | 2+ vCPU | 2+ GB | 20+ GB | Ubuntu 22.04 |
| worker-2 | 2+ vCPU | 2+ GB | 20+ GB | Ubuntu 22.04 |

> You can use VirtualBox, Vagrant, VMware, or any cloud VMs (AWS EC2, GCP Compute Engine).

### 3.B.2 Prepare ALL Nodes (Run on every VM)

```bash
# Step 1: Update system
sudo apt-get update && sudo apt-get upgrade -y

# Step 2: Disable swap (Kubernetes requires this)
sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

# Step 3: Load required kernel modules
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

# Step 4: Set sysctl params
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

sudo sysctl --system

# Step 5: Verify modules loaded
lsmod | grep br_netfilter
lsmod | grep overlay
```

### 3.B.3 Install Container Runtime (containerd) — All Nodes

```bash
# Install containerd
sudo apt-get install -y containerd

# Configure containerd
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml

# Enable systemd cgroup driver (important!)
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml

# Restart and enable
sudo systemctl restart containerd
sudo systemctl enable containerd

# Verify
sudo systemctl status containerd
```

### 3.B.4 Install kubeadm, kubelet, kubectl — All Nodes

```bash
# Install dependencies
sudo apt-get install -y apt-transport-https ca-certificates curl gpg

# Add Kubernetes apt repository
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.36/deb/Release.key | \
  sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.36/deb/ /' | \
  sudo tee /etc/apt/sources.list.d/kubernetes.list

# Install kubeadm, kubelet, kubectl
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl

# Pin versions (prevent accidental upgrades)
sudo apt-mark hold kubelet kubeadm kubectl

# Enable kubelet
sudo systemctl enable kubelet

# Verify
kubeadm version
kubectl version --client
```

### 3.B.5 Initialize Control Plane — Only on Master Node

```bash
# Get the IP of your control-plane node
hostname -I   # note this IP, e.g., 192.168.1.10

# Initialize the cluster
sudo kubeadm init \
  --pod-network-cidr=10.244.0.0/16 \
  --apiserver-advertise-address=192.168.1.10   # replace with your control-plane IP

# ⬆ This takes 1-2 minutes
# At the end you'll see:
# Your Kubernetes control-plane has initialized successfully!
```

Expected output at end:
```
Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Then you can join any number of worker nodes by running the following on each:

  kubeadm join 192.168.1.10:6443 --token abcdef.0123456789abcdef \
    --discovery-token-ca-cert-hash sha256:xxxx...
```

### 3.B.6 Configure kubectl Access

```bash
# Run on control-plane node (as regular user, NOT root)
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# Verify
kubectl get nodes
# NAME            STATUS     ROLES           AGE
# control-plane   NotReady   control-plane   2m    ← NotReady = no CNI yet
```

### 3.B.7 Install CNI Plugin (Flannel) — Control Plane Only

```bash
# Install Flannel (simple, works with pod-network-cidr=10.244.0.0/16)
kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml

# Wait 30 seconds, then check
kubectl get nodes
# NAME            STATUS   ROLES           AGE   VERSION
# control-plane   Ready    control-plane   3m    v1.36.1   ← Now Ready!

kubectl get pods -n kube-flannel
```

> Alternative CNIs: Calico (`kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml`) or Cilium.

### 3.B.8 Join Worker Nodes — Run on Each Worker

```bash
# Use the join command from kubeadm init output
sudo kubeadm join 192.168.1.10:6443 \
  --token abcdef.0123456789abcdef \
  --discovery-token-ca-cert-hash sha256:xxxx...

# If token expired (tokens last 24h), generate a new one on control-plane:
kubeadm token create --print-join-command
```

### 3.B.9 Verify Full Cluster

```bash
# Back on control-plane
kubectl get nodes
# NAME            STATUS   ROLES           AGE   VERSION
# control-plane   Ready    control-plane   10m   v1.36.1
# worker-1        Ready    <none>          2m    v1.36.1
# worker-2        Ready    <none>          90s   v1.36.1

kubectl get pods -A    # All system pods should be Running
```

### 3.B.10 Reset a Node (if something goes wrong)

```bash
# On the node to reset
sudo kubeadm reset
sudo rm -rf /etc/cni/net.d
sudo iptables -F && sudo iptables -t nat -F

# Then re-run kubeadm init (master) or kubeadm join (worker)
```

---

## PATH C — Managed Kubernetes (Cloud — Easiest for Production)

No need to manage control plane — cloud provider runs it for you.

### 3.C.1 Google GKE (Google Kubernetes Engine)

```bash
# Install gcloud CLI first: https://cloud.google.com/sdk/docs/install

# Authenticate
gcloud auth login

# Create a GKE cluster
gcloud container clusters create my-cluster \
  --zone us-central1-a \
  --num-nodes 3 \
  --machine-type e2-medium

# Configure kubectl to use it
gcloud container clusters get-credentials my-cluster --zone us-central1-a

# Verify
kubectl get nodes
```

### 3.C.2 AWS EKS (Elastic Kubernetes Service)

```bash
# Install eksctl: https://eksctl.io/installation/
# Install AWS CLI: https://aws.amazon.com/cli/

# Create EKS cluster (takes ~15 minutes)
eksctl create cluster \
  --name my-cluster \
  --region us-east-1 \
  --nodegroup-name standard-workers \
  --node-type t3.medium \
  --nodes 3

# kubectl is auto-configured
kubectl get nodes
```

### 3.C.3 Azure AKS (Azure Kubernetes Service)

```bash
# Install Azure CLI: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

az login

# Create resource group
az group create --name myResourceGroup --location eastus

# Create AKS cluster
az aks create \
  --resource-group myResourceGroup \
  --name myAKSCluster \
  --node-count 3 \
  --node-vm-size Standard_DS2_v2 \
  --generate-ssh-keys

# Configure kubectl
az aks get-credentials --resource-group myResourceGroup --name myAKSCluster

kubectl get nodes
```

---

## 3.2 Managing Multiple Clusters with kubeconfig

When you have Minikube + real cluster + cloud cluster, `kubectl` uses **kubeconfig** to switch between them.

```bash
# List all contexts (clusters)
kubectl config get-contexts

# Output:
# CURRENT   NAME        CLUSTER     AUTHINFO    NAMESPACE
# *         minikube    minikube    minikube    default
#           my-cluster  my-cluster  admin       default
#           arn:aws:..  eks-prod    aws-user    default

# Switch context
kubectl config use-context my-cluster
kubectl config use-context minikube

# See current context
kubectl config current-context

# Merge multiple kubeconfig files
export KUBECONFIG=~/.kube/config:~/.kube/eks-config
kubectl config view --merge --flatten > ~/.kube/merged-config
export KUBECONFIG=~/.kube/merged-config
```

### Install kubectx + kubens (Quick context/namespace switching)
```bash
# macOS
brew install kubectx

# Linux
sudo git clone https://github.com/ahmetb/kubectx /opt/kubectx
sudo ln -s /opt/kubectx/kubectx /usr/local/bin/kubectx
sudo ln -s /opt/kubectx/kubens /usr/local/bin/kubens

# Usage
kubectx                  # list all contexts
kubectx minikube         # switch to minikube
kubectx my-cluster       # switch to real cluster
kubens dev               # switch to dev namespace
kubens production        # switch to production namespace
```

---

## 3.3 Comparison: Which Setup to Use When?

| Scenario | Best Choice | Why |
|----------|-------------|-----|
| Learning K8s basics | Minikube | Simple, no cost, fast |
| Simulating multi-node | Minikube --nodes=3 | Still local, easy setup |
| Learning production setup | kubeadm on VMs | Real experience, no cloud cost |
| Production on-prem | kubeadm / Rancher / k3s | Full control |
| Production on cloud | EKS / GKE / AKS | Managed CP, less ops overhead |
| CI/CD testing | kind (K8s in Docker) | Fast spin-up/teardown |

---

## 3.4 k3s — Lightweight Kubernetes (Bonus)

**k3s** is a lightweight K8s distribution, perfect for Raspberry Pi, edge, or quick dev clusters.

```bash
# Install k3s (single command — installs everything!)
curl -sfL https://get.k3s.io | sh -

# Check cluster
sudo k3s kubectl get nodes

# Use regular kubectl
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
kubectl get nodes
```

Add a worker node to k3s:
```bash
# Get token from server
sudo cat /var/lib/rancher/k3s/server/node-token

# On worker node
curl -sfL https://get.k3s.io | K3S_URL=https://<server-ip>:6443 K3S_TOKEN=<token> sh -
```

---

## 3.5 Essential kubectl Commands Cheat Sheet

```bash
# Cluster info
kubectl cluster-info
kubectl get nodes
kubectl get nodes -o wide          # with IPs

# Get resources
kubectl get pods                   # default namespace
kubectl get pods -n kube-system    # specific namespace
kubectl get pods -A                # all namespaces
kubectl get pods -o wide           # with node info
kubectl get all                    # everything in namespace

# Details
kubectl describe pod <pod-name>
kubectl describe node <node-name>

# Logs
kubectl logs <pod-name>
kubectl logs -f <pod-name>         # stream
kubectl logs --previous <pod>      # crashed container

# Execute
kubectl exec -it <pod-name> -- bash

# Apply / Delete
kubectl apply -f file.yaml
kubectl delete -f file.yaml
kubectl delete pod <pod-name>

# Port forward
kubectl port-forward pod/<name> 8080:80

# Copy files
kubectl cp <pod-name>:/path/file ./local-file
```

---

## Hands-On Lab — Complete Both Paths

### Lab A: Minikube
```bash
minikube start --driver=docker --nodes=2
kubectl get nodes
kubectl run hello --image=nginx:1.25
kubectl get pods -o wide           # which node is it on?
kubectl expose pod hello --port=80 --type=NodePort
minikube service hello
minikube stop
```

### Lab B: kubeadm (use VMs or cloud instances)
```bash
# Follow 3.B.2 through 3.B.9 step by step
# Final check:
kubectl get nodes                  # 3 nodes: 1 control-plane, 2 workers
kubectl run test --image=nginx:1.25
kubectl get pods -o wide           # scheduled on a worker node
kubectl get pods -A                # all system pods Running
```

---

## References & Further Reading

- **kubectl install**: https://kubernetes.io/docs/tasks/tools/
- **Minikube docs**: https://minikube.sigs.k8s.io/docs/start/
- **kubeadm install guide**: https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/
- **kubeadm create cluster**: https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/
- **k3s docs**: https://docs.k3s.io/
- **GKE quickstart**: https://cloud.google.com/kubernetes-engine/docs/quickstart
- **EKS getting started**: https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html
- **AKS quickstart**: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli
- **kubectl cheat sheet**: https://kubernetes.io/docs/reference/kubectl/cheatsheet/
- **kubectx/kubens**: https://github.com/ahmetb/kubectx

## Video Tutorials

- **TechWorld with Nana — Full Kubernetes Course (4h)**: https://www.classcentral.com/course/youtube-kubernetes-tutorial-for-beginners-full-course-in-4-hours-108866
- **Kubernetes Zero to Hero 2025**: https://www.youtube.com/watch?v=MTHGoGUFpvE
- **Complete K8s Beginner to Pro**: https://www.youtube.com/watch?v=2T86xAtR6Fo

---

## Key Takeaways

- **kubectl** is universal — same commands work on Minikube, kubeadm, or cloud K8s.
- **Minikube** = best for learning. One command start, one command stop.
- **kubeadm** = real production-grade setup experience. Teaches you what actually runs.
- **Cloud (EKS/GKE/AKS)** = easiest for production. Control plane is managed for you.
- **kubeconfig + contexts** = how you switch between clusters without reinstalling anything.
- **k3s** = ultra-lightweight K8s for edge/Raspberry Pi/quick dev.

---

## Next Chapter
[Chapter 04 — Pods →](../chapter-04-pods/README.md)
