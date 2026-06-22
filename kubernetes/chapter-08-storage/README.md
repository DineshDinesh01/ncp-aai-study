# Chapter 08 — Storage & Volumes

> Official Docs: https://kubernetes.io/docs/concepts/storage/

## What You Will Learn
- Why storage in Kubernetes is different
- emptyDir, hostPath volumes
- PersistentVolume (PV), PersistentVolumeClaim (PVC)
- StorageClass and dynamic provisioning

---

## 8.1 The Storage Problem

Containers are **stateless by design** — when a container restarts, all data inside it is lost.

For stateful apps (databases, file storage), you need **persistent storage** that:
- Survives container restarts.
- Can be shared between containers.
- Exists independently of Pods.

---

## 8.2 Volume Types Overview

| Volume Type | Lifetime | Use Case |
|------------|---------|----------|
| `emptyDir` | Pod lifetime | Temporary shared storage between containers |
| `hostPath` | Node lifetime | Access files on the node (dev only) |
| `PersistentVolume` | Independent | Database, file storage (production) |
| `configMap` | Pod lifetime | Mount config files |
| `secret` | Pod lifetime | Mount secrets as files |
| `nfs` | Independent | Network File System |

---

## 8.3 emptyDir — Temporary Volume

Created when a Pod starts. Deleted when Pod is deleted. Shared between all containers in the Pod.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: emptydir-demo
spec:
  containers:
  - name: writer
    image: busybox
    command: ["sh", "-c", "echo Hello > /data/message.txt && sleep 3600"]
    volumeMounts:
    - name: shared-data
      mountPath: /data

  - name: reader
    image: busybox
    command: ["sh", "-c", "sleep 5 && cat /data/message.txt && sleep 3600"]
    volumeMounts:
    - name: shared-data
      mountPath: /data

  volumes:
  - name: shared-data
    emptyDir: {}           # Temporary shared volume
```

---

## 8.4 hostPath — Node Directory (Dev Only)

Mounts a file or directory from the **node's filesystem** into a Pod.

> WARNING: Not suitable for production (pod is tied to specific node).

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: hostpath-demo
spec:
  containers:
  - name: app
    image: nginx:1.25
    volumeMounts:
    - name: host-volume
      mountPath: /usr/share/nginx/html
  volumes:
  - name: host-volume
    hostPath:
      path: /tmp/mywebsite       # Must exist on the node
      type: DirectoryOrCreate
```

---

## 8.5 PersistentVolume (PV) & PersistentVolumeClaim (PVC)

This is the correct way to handle storage in production.

```
Admin creates PV  →  Developer creates PVC  →  PVC binds to PV  →  Pod uses PVC
```

### Step 1: Create a PersistentVolume (Admin)

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: my-pv
spec:
  capacity:
    storage: 1Gi              # Storage size
  accessModes:
  - ReadWriteOnce             # One node can mount read-write
  persistentVolumeReclaimPolicy: Retain   # Keep data after PVC deleted
  hostPath:
    path: /tmp/k8s-pv         # On Minikube, uses hostPath
```

### Step 2: Create a PersistentVolumeClaim (Developer)

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 500Mi          # Request 500Mi — matches our 1Gi PV
```

### Step 3: Use PVC in a Pod/Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15
        env:
        - name: POSTGRES_PASSWORD
          value: "password"
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data    # Data persists here
      volumes:
      - name: postgres-storage
        persistentVolumeClaim:
          claimName: my-pvc                      # Use our PVC
```

---

## 8.6 Access Modes

| Mode | Short | Meaning |
|------|-------|---------|
| ReadWriteOnce | RWO | One node, read-write |
| ReadOnlyMany | ROX | Many nodes, read-only |
| ReadWriteMany | RWX | Many nodes, read-write |
| ReadWriteOncePod | RWOP | One pod, read-write (K8s 1.22+) |

---

## 8.7 StorageClass — Dynamic Provisioning

Instead of manually creating PVs, **StorageClass** automatically creates them when a PVC is requested.

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/no-provisioner   # Replace with cloud provisioner
volumeBindingMode: WaitForFirstConsumer
```

On cloud:
```yaml
# AWS EBS
provisioner: ebs.csi.aws.com

# GCP PD
provisioner: pd.csi.storage.gke.io

# Azure Disk
provisioner: disk.csi.azure.com
```

PVC with StorageClass:
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: auto-pvc
spec:
  storageClassName: fast-ssd    # Reference to StorageClass
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
```

---

## 8.8 Check PV and PVC Status

```bash
kubectl get pv
kubectl get pvc
kubectl describe pvc my-pvc

# PVC Status meanings:
# Pending    = waiting for a PV to bind to
# Bound      = successfully bound to a PV
# Lost       = PV was deleted while PVC still exists
```

---

## 8.9 Hands-On Lab — Persistent Postgres

```bash
# Step 1: Create PV and PVC
cat > /tmp/storage-lab.yaml << 'EOF'
apiVersion: v1
kind: PersistentVolume
metadata:
  name: postgres-pv
spec:
  capacity:
    storage: 500Mi
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  hostPath:
    path: /tmp/postgres-data
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 500Mi
EOF
kubectl apply -f /tmp/storage-lab.yaml

# Step 2: Check binding
kubectl get pv
kubectl get pvc  # Should show "Bound"

# Step 3: Deploy postgres with persistent storage
cat > /tmp/postgres-deploy.yaml << 'EOF'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15
        env:
        - name: POSTGRES_PASSWORD
          value: "testpass"
        - name: POSTGRES_DB
          value: "testdb"
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: data
          mountPath: /var/lib/postgresql/data
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: postgres-pvc
EOF
kubectl apply -f /tmp/postgres-deploy.yaml

# Step 4: Test persistence
kubectl get pods -l app=postgres
kubectl exec -it $(kubectl get pod -l app=postgres -o name) -- psql -U postgres -d testdb -c "CREATE TABLE test (id INT);"

# Step 5: Delete and recreate pod — data should persist
kubectl delete pod -l app=postgres
kubectl get pods -w   # watch new pod start
kubectl exec -it $(kubectl get pod -l app=postgres -o name) -- psql -U postgres -d testdb -c "\dt"
# Table 'test' should still exist!

# Cleanup
kubectl delete deployment postgres
kubectl delete pvc postgres-pvc
kubectl delete pv postgres-pv
```

---

## References & Further Reading

- **Official Storage docs**: https://kubernetes.io/docs/concepts/storage/
- **PersistentVolumes docs**: https://kubernetes.io/docs/concepts/storage/persistent-volumes/
- **StorageClass docs**: https://kubernetes.io/docs/concepts/storage/storage-classes/
- **K8s for Beginners Part 3 (Storage)**: https://medium.com/@laxmanpajjuri/kubernetes-for-beginners-part-3-configmaps-secrets-storage-explained-5a4b99c0060f
- **Understanding Volumes — Medium**: https://medium.com/@gudisagebi1/understanding-configmap-secrets-and-volumes-in-kubernetes-7d51b590336c

## Video Tutorials

- **TechWorld with Nana — Full K8s Course**: https://www.classcentral.com/course/youtube-kubernetes-tutorial-for-beginners-full-course-in-4-hours-108866
- **Kubernetes Zero to Hero 2025**: https://www.youtube.com/watch?v=MTHGoGUFpvE

---

## Key Takeaways

- Container storage is ephemeral — use Volumes for persistence.
- **emptyDir**: temporary, pod-scoped. **hostPath**: node file (dev only).
- **PV**: cluster-level storage resource (admin creates). **PVC**: user's request for storage.
- **StorageClass**: automates PV creation on cloud providers.
- PVC status: `Pending` → `Bound` means it successfully connected to a PV.

---

## Next Chapter
[Chapter 09 — Namespaces & RBAC →](../chapter-09-namespaces-rbac/README.md)
