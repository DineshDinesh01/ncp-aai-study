# Chapter 09 — Namespaces & RBAC

> Official Namespaces Docs: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/
> Official RBAC Docs: https://kubernetes.io/docs/reference/access-authn-authz/rbac/

## What You Will Learn
- Organise cluster resources with Namespaces
- Control who can do what with RBAC
- Roles, ClusterRoles, RoleBindings
- Service Accounts

---

## 9.1 Namespaces — Virtual Clusters

A **Namespace** divides a physical cluster into multiple virtual clusters. It's like folders on your computer.

```
┌──────────────────── Kubernetes Cluster ──────────────────────┐
│                                                                │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│  │    dev     │  │  staging   │  │ production │             │
│  │ namespace  │  │ namespace  │  │ namespace  │             │
│  │            │  │            │  │            │             │
│  │ nginx-pod  │  │ nginx-pod  │  │ nginx-pod  │             │
│  │ my-service │  │ my-service │  │ my-service │             │
│  └────────────┘  └────────────┘  └────────────┘             │
└────────────────────────────────────────────────────────────────┘
```

Same resource name can exist in different namespaces without conflict.

---

## 9.2 Default Namespaces

```bash
kubectl get namespaces

# NAME              STATUS
# default           Active   ← Your resources go here if not specified
# kube-system       Active   ← Kubernetes system components
# kube-public       Active   ← Public cluster info (readable by all)
# kube-node-lease   Active   ← Node heartbeat leases
```

---

## 9.3 Create and Use Namespaces

```bash
# Create a namespace
kubectl create namespace dev
kubectl create namespace staging
kubectl create namespace production

# List namespaces
kubectl get namespaces

# Deploy to a specific namespace
kubectl apply -f deployment.yaml -n dev
kubectl apply -f deployment.yaml -n production

# List pods in a namespace
kubectl get pods -n dev
kubectl get pods -n production
kubectl get pods -A   # All namespaces
```

### Namespace in YAML

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
  namespace: dev          # Explicitly set namespace
spec:
  containers:
  - name: app
    image: nginx:1.25
```

---

## 9.4 Set Default Namespace (Avoid typing -n every time)

```bash
# Set default namespace for current context
kubectl config set-context --current --namespace=dev

# Verify
kubectl config view --minify | grep namespace

# Now all commands use 'dev' namespace by default
kubectl get pods    # Shows pods in 'dev' namespace

# Switch back to default
kubectl config set-context --current --namespace=default
```

---

## 9.5 Resource Quotas per Namespace

Limit how much CPU/memory a namespace can use:

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: dev-quota
  namespace: dev
spec:
  hard:
    requests.cpu: "2"
    requests.memory: 2Gi
    limits.cpu: "4"
    limits.memory: 4Gi
    pods: "20"
    services: "10"
```

```bash
kubectl apply -f quota.yaml
kubectl describe resourcequota dev-quota -n dev
```

---

## 9.6 RBAC — Role-Based Access Control

**RBAC** controls **who** can perform **what actions** on **which resources**.

```
User / ServiceAccount
        │
        │ has
        ▼
   RoleBinding
        │
        │ references
        ▼
     Role
        │
        │ grants access to
        ▼
   Resources (pods, deployments, secrets...)
```

### RBAC Objects

| Object | Scope | Purpose |
|--------|-------|---------|
| **Role** | Namespace | Permissions within one namespace |
| **ClusterRole** | Cluster-wide | Permissions across all namespaces |
| **RoleBinding** | Namespace | Assign Role to user/group/SA |
| **ClusterRoleBinding** | Cluster-wide | Assign ClusterRole to user |

---

## 9.7 Create a Role

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
  namespace: dev
rules:
- apiGroups: [""]             # "" = core API group
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
```

Verbs you can use: `get`, `list`, `watch`, `create`, `update`, `patch`, `delete`

---

## 9.8 Create a RoleBinding

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods-binding
  namespace: dev
subjects:
- kind: User
  name: jane              # The user being granted the role
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader        # The role to assign
  apiGroup: rbac.authorization.k8s.io
```

---

## 9.9 ClusterRole — Admin Example

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: deployment-manager
rules:
- apiGroups: ["apps"]
  resources: ["deployments", "replicasets"]
  verbs: ["*"]            # All actions
- apiGroups: [""]
  resources: ["pods", "services"]
  verbs: ["get", "list", "watch"]
```

---

## 9.10 Service Accounts

A **ServiceAccount** is an identity for **processes running in pods** (vs users for humans).

```yaml
# Create a ServiceAccount
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-app-sa
  namespace: dev
```

```yaml
# Use it in a Pod
spec:
  serviceAccountName: my-app-sa
  containers:
  - name: app
    image: myapp:1.0
```

Bind a role to a ServiceAccount:
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: my-app-binding
  namespace: dev
subjects:
- kind: ServiceAccount
  name: my-app-sa
  namespace: dev
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

---

## 9.11 Hands-On Lab

```bash
# Step 1: Create namespaces
kubectl create namespace team-a
kubectl create namespace team-b

# Step 2: Deploy to each namespace
kubectl create deployment web --image=nginx:1.25 -n team-a
kubectl create deployment api --image=nginx:1.25 -n team-b

# Step 3: Verify isolation
kubectl get pods -n team-a
kubectl get pods -n team-b
kubectl get pods   # default namespace — empty

# Step 4: Create a read-only role for team-a pods
cat > /tmp/rbac-lab.yaml << 'EOF'
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-viewer
  namespace: team-a
rules:
- apiGroups: [""]
  resources: ["pods", "pods/log"]
  verbs: ["get", "list", "watch"]
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: viewer-sa
  namespace: team-a
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: viewer-binding
  namespace: team-a
subjects:
- kind: ServiceAccount
  name: viewer-sa
  namespace: team-a
roleRef:
  kind: Role
  name: pod-viewer
  apiGroup: rbac.authorization.k8s.io
EOF
kubectl apply -f /tmp/rbac-lab.yaml

# Step 5: Check what the SA can do
kubectl auth can-i get pods --namespace=team-a --as=system:serviceaccount:team-a:viewer-sa
kubectl auth can-i delete pods --namespace=team-a --as=system:serviceaccount:team-a:viewer-sa

# Cleanup
kubectl delete namespace team-a team-b
```

---

## References & Further Reading

- **Namespaces docs**: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/
- **RBAC docs**: https://kubernetes.io/docs/reference/access-authn-authz/rbac/
- **Resource Quotas**: https://kubernetes.io/docs/concepts/policy/resource-quotas/
- **Service Accounts**: https://kubernetes.io/docs/concepts/security/service-accounts/

## Video Tutorials

- **TechWorld with Nana — Namespaces**: https://www.classcentral.com/course/youtube-kubernetes-tutorial-for-beginners-full-course-in-4-hours-108866
- **Complete K8s Course**: https://www.youtube.com/watch?v=2T86xAtR6Fo

---

## Key Takeaways

- **Namespaces** = logical partitions. Use them for dev/staging/prod or teams.
- `kubectl get pods -n <namespace>` or `-A` for all namespaces.
- **RBAC** controls access: Role → defines permissions. RoleBinding → assigns role to user/SA.
- **ServiceAccount** = identity for pods (not humans).
- `kubectl auth can-i` = test what permissions an identity has.

---

## Next Chapter
[Chapter 10 — Networking Deep Dive →](../chapter-10-networking/README.md)
