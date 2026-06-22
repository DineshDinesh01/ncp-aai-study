# Chapter 04 — Pods: The Smallest Unit in Kubernetes

> Official Docs: https://kubernetes.io/docs/concepts/workloads/pods/

## What You Will Learn
- What a Pod is and why it exists
- Create Pods imperatively (command line) and declaratively (YAML)
- Inspect, debug, and delete Pods
- Multi-container Pods
- Pod lifecycle phases

---

## 4.1 What is a Pod?

A **Pod** is the smallest deployable unit in Kubernetes. It is a wrapper around one or more containers that:
- Share the same **network namespace** (same IP address)
- Share the same **storage volumes**
- Are always scheduled together on the same node

```
┌─────────────────────────Pod──────────────────────────┐
│                                                        │
│   ┌────────────────┐    ┌────────────────┐            │
│   │  Container A   │    │  Container B   │            │
│   │  (nginx:1.25)  │    │  (log-shipper) │            │
│   └────────────────┘    └────────────────┘            │
│                                                        │
│   Shared IP: 10.244.0.5                               │
│   Shared Volume: /var/log                             │
└────────────────────────────────────────────────────────┘
```

> **Rule of thumb:** Run ONE main process per container, ONE container per Pod (unless sidecar pattern).

---

## 4.2 Create a Pod Imperatively (Quick Way)

```bash
# Run an nginx pod
kubectl run my-nginx --image=nginx:1.25

# Verify it's running
kubectl get pods

# Output:
# NAME       READY   STATUS    RESTARTS   AGE
# my-nginx   1/1     Running   0          10s

# Get more details
kubectl describe pod my-nginx

# Get logs
kubectl logs my-nginx

# Access the container shell
kubectl exec -it my-nginx -- bash
```

---

## 4.3 Create a Pod with YAML (Declarative Way)

Save this as `pod.yaml`:

```yaml
apiVersion: v1          # API version for Pod
kind: Pod               # Resource type
metadata:
  name: my-nginx        # Pod name
  labels:
    app: nginx          # Labels — used by Services/Selectors
    env: dev
spec:
  containers:
  - name: nginx-container
    image: nginx:1.25   # Docker image
    ports:
    - containerPort: 80 # Port the container exposes
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
```

Apply it:
```bash
kubectl apply -f pod.yaml

# Check status
kubectl get pods

# See full details
kubectl describe pod my-nginx

# Delete the pod
kubectl delete pod my-nginx
# OR
kubectl delete -f pod.yaml
```

---

## 4.4 Understanding the YAML Structure

Every Kubernetes YAML has 4 required top-level fields:

```yaml
apiVersion: v1          # Which API group/version
kind: Pod               # What kind of resource
metadata:               # Name, labels, annotations
  name: my-app
spec:                   # Desired state — what you want
  containers:
  - name: app
    image: nginx
```

---

## 4.5 Pod with Environment Variables

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: env-demo
spec:
  containers:
  - name: app
    image: nginx:1.25
    env:
    - name: MY_VAR
      value: "hello-kubernetes"
    - name: MY_NODE_NAME
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName   # Inject node name dynamically
```

---

## 4.6 Multi-Container Pod (Sidecar Pattern)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: sidecar-demo
spec:
  containers:
  - name: main-app
    image: nginx:1.25
    volumeMounts:
    - name: shared-logs
      mountPath: /var/log/nginx

  - name: log-shipper        # Sidecar container
    image: busybox
    command: ["sh", "-c", "tail -f /var/log/nginx/access.log"]
    volumeMounts:
    - name: shared-logs
      mountPath: /var/log/nginx

  volumes:
  - name: shared-logs
    emptyDir: {}             # Temporary shared volume
```

---

## 4.7 Pod Lifecycle Phases

| Phase | Meaning |
|-------|---------|
| **Pending** | Pod accepted but containers not running yet (pulling image, scheduling) |
| **Running** | At least one container is running |
| **Succeeded** | All containers completed successfully (exit 0) |
| **Failed** | All containers terminated, at least one with non-zero exit |
| **Unknown** | State cannot be determined (node lost) |

```bash
# Watch pod status in real time
kubectl get pods -w

# See why a pod is stuck
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl logs <pod-name> --previous   # logs from last crashed container
```

---

## 4.8 Liveness & Readiness Probes

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: probe-demo
spec:
  containers:
  - name: app
    image: nginx:1.25
    ports:
    - containerPort: 80

    livenessProbe:           # Restart container if this fails
      httpGet:
        path: /
        port: 80
      initialDelaySeconds: 5
      periodSeconds: 10

    readinessProbe:          # Remove from Service if this fails
      httpGet:
        path: /
        port: 80
      initialDelaySeconds: 3
      periodSeconds: 5
```

> **Liveness probe** = "Is the app alive?" — restarts container on failure.
> **Readiness probe** = "Is the app ready to serve traffic?" — removes from load balancer on failure.

---

## 4.9 Hands-On Lab

```bash
# Lab 1: Imperative pod
kubectl run lab-pod --image=nginx:1.25
kubectl get pods
kubectl describe pod lab-pod
kubectl logs lab-pod
kubectl exec -it lab-pod -- nginx -v
kubectl delete pod lab-pod

# Lab 2: Declarative pod
cat > /tmp/lab-pod.yaml << 'EOF'
apiVersion: v1
kind: Pod
metadata:
  name: lab-pod
  labels:
    app: lab
spec:
  containers:
  - name: nginx
    image: nginx:1.25
    ports:
    - containerPort: 80
    resources:
      requests:
        memory: "64Mi"
        cpu: "100m"
      limits:
        memory: "128Mi"
        cpu: "200m"
EOF

kubectl apply -f /tmp/lab-pod.yaml
kubectl get pods -o wide
kubectl describe pod lab-pod
kubectl delete -f /tmp/lab-pod.yaml

# Lab 3: Port forward to test
kubectl run test-nginx --image=nginx:1.25
kubectl port-forward pod/test-nginx 8080:80
# Open browser: http://localhost:8080
# Ctrl+C to stop
kubectl delete pod test-nginx
```

---

## References & Further Reading

- **Official Pods docs**: https://kubernetes.io/docs/concepts/workloads/pods/
- **Pod YAML examples**: https://octopus.com/devops/kubernetes-deployments/kubernetes-pod-yaml/
- **Deploying first Pod tutorial**: https://www.kerno.io/blog/deploying-your-first-pod-in-kubernetes
- **DataCamp Kubernetes tutorial**: https://www.datacamp.com/tutorial/kubernetes
- **Spacelift Kubernetes tutorial**: https://spacelift.io/blog/kubernetes-tutorial

## Video Tutorials

- **Kubernetes Full Course — TechWorld with Nana**: https://www.classcentral.com/course/youtube-kubernetes-tutorial-for-beginners-full-course-in-4-hours-108866
- **Kubernetes for Absolute Beginners**: https://www.classcentral.com/course/youtube-kubernetes-for-the-absolute-beginners-45688
- **Complete K8s Beginner to Pro**: https://www.youtube.com/watch?v=2T86xAtR6Fo

---

## Key Takeaways

- A Pod wraps one or more containers and shares network + storage.
- Always prefer **YAML manifests** over imperative commands for production.
- `kubectl apply -f` = create or update. `kubectl delete -f` = remove.
- Liveness probes restart unhealthy containers; readiness probes control traffic routing.
- Pods are ephemeral — don't rely on a single Pod; use Deployments instead.

---

## Next Chapter
[Chapter 05 — Deployments →](../chapter-05-deployments/README.md)
