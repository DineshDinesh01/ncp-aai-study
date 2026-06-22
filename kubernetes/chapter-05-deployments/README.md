# Chapter 05 — Deployments, ReplicaSets & Rolling Updates

> Official Docs: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/

## What You Will Learn
- What a Deployment is and why you need it
- ReplicaSet and how it maintains pod count
- Create, scale, update, and roll back Deployments
- Rolling update strategy explained

---

## 5.1 Why Not Just Use Pods?

Pods are ephemeral (temporary). If a Pod crashes:
- It is **gone** — it does NOT restart by itself.
- No automatic replacement.
- No version management.

**Deployments** solve this:
- Maintain N replicas of your app.
- Automatically replace crashed pods.
- Handle rolling updates (zero-downtime upgrades).
- Rollback to previous version instantly.

---

## 5.2 Deployment → ReplicaSet → Pods Hierarchy

```
Deployment (manages updates & rollback)
    │
    └── ReplicaSet (maintains pod count)
            │
            ├── Pod 1
            ├── Pod 2
            └── Pod 3
```

You almost never create a ReplicaSet directly — Deployments manage them for you.

---

## 5.3 Create a Deployment

Save as `deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3                    # Run 3 copies
  selector:
    matchLabels:
      app: nginx                 # This deployment manages pods with label app=nginx
  template:                      # Pod template (what each pod looks like)
    metadata:
      labels:
        app: nginx               # MUST match selector.matchLabels
    spec:
      containers:
      - name: nginx
        image: nginx:1.24        # Start with version 1.24
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "100m"
          limits:
            memory: "128Mi"
            cpu: "200m"
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
```

```bash
# Apply the deployment
kubectl apply -f deployment.yaml

# Watch pods being created
kubectl get pods -w

# Check deployment status
kubectl get deployments

# Output:
# NAME               READY   UP-TO-DATE   AVAILABLE   AGE
# nginx-deployment   3/3     3            3           30s

# See all: deployment + replicaset + pods
kubectl get all
```

---

## 5.4 Scale a Deployment

```bash
# Scale up to 5 replicas
kubectl scale deployment nginx-deployment --replicas=5
kubectl get pods

# Scale down to 2
kubectl scale deployment nginx-deployment --replicas=2

# OR update replicas in YAML and re-apply
# Change replicas: 3 to replicas: 5 in deployment.yaml
kubectl apply -f deployment.yaml
```

---

## 5.5 Rolling Update (Zero-Downtime Upgrade)

Update the image version in your YAML:

```yaml
# In deployment.yaml change:
image: nginx:1.24
# to:
image: nginx:1.25
```

```bash
kubectl apply -f deployment.yaml

# Watch the rolling update
kubectl rollout status deployment/nginx-deployment

# Output:
# Waiting for deployment "nginx-deployment" rollout to finish: 1 out of 3 new replicas have been updated...
# Waiting for deployment "nginx-deployment" rollout to finish: 2 out of 3 new replicas have been updated...
# deployment "nginx-deployment" successfully rolled out

# See rollout history
kubectl rollout history deployment/nginx-deployment
```

### How Rolling Update Works

```
Before update:  [Pod v1.24] [Pod v1.24] [Pod v1.24]
                                │
                    Start rolling update
                                │
Step 1:         [Pod v1.24] [Pod v1.24] [Pod v1.25]  ← new pod added
Step 2:         [Pod v1.24] [Pod v1.25] [Pod v1.25]  ← old pod removed
Step 3:         [Pod v1.25] [Pod v1.25] [Pod v1.25]  ← complete ✅
```

Traffic always routes to healthy pods → zero downtime.

---

## 5.6 Rollback a Deployment

```bash
# Undo the last update
kubectl rollout undo deployment/nginx-deployment

# Rollback to a specific revision
kubectl rollout history deployment/nginx-deployment
kubectl rollout undo deployment/nginx-deployment --to-revision=1

# Check after rollback
kubectl get pods
kubectl describe deployment nginx-deployment
```

---

## 5.7 Update Strategy Options

```yaml
spec:
  strategy:
    type: RollingUpdate          # default — zero downtime
    rollingUpdate:
      maxUnavailable: 1          # Max pods that can be unavailable during update
      maxSurge: 1                # Max extra pods created during update
```

```yaml
spec:
  strategy:
    type: Recreate               # Kill all old pods, then create new ones (has downtime)
```

---

## 5.8 Deployment Commands Reference

```bash
# Create
kubectl apply -f deployment.yaml

# Check status
kubectl get deployment nginx-deployment
kubectl describe deployment nginx-deployment

# Scale
kubectl scale deployment nginx-deployment --replicas=5

# Update image directly (without editing YAML)
kubectl set image deployment/nginx-deployment nginx=nginx:1.25

# Rollout
kubectl rollout status deployment/nginx-deployment
kubectl rollout history deployment/nginx-deployment
kubectl rollout undo deployment/nginx-deployment

# Delete
kubectl delete deployment nginx-deployment
```

---

## 5.9 Hands-On Lab

```bash
# Step 1: Create deployment with 2 replicas
cat > /tmp/deploy-lab.yaml << 'EOF'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 2
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
        image: nginx:1.24
        ports:
        - containerPort: 80
EOF
kubectl apply -f /tmp/deploy-lab.yaml

# Step 2: Verify
kubectl get deployment web-app
kubectl get pods -l app=web

# Step 3: Scale to 4
kubectl scale deployment web-app --replicas=4
kubectl get pods

# Step 4: Update image
kubectl set image deployment/web-app web=nginx:1.25
kubectl rollout status deployment/web-app

# Step 5: Check history
kubectl rollout history deployment/web-app

# Step 6: Rollback
kubectl rollout undo deployment/web-app
kubectl get pods

# Step 7: Delete pod manually — watch it get replaced
POD=$(kubectl get pods -l app=web -o name | head -1)
kubectl delete $POD
kubectl get pods -w   # watch it respawn

# Cleanup
kubectl delete deployment web-app
```

---

## References & Further Reading

- **Official Deployments docs**: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
- **Deployment YAML examples — Spacelift**: https://spacelift.io/blog/kubernetes-deployment-yaml
- **Deployment YAML — K21 Academy**: https://k21academy.com/kubernetes/kubernetes-deployment-yaml-explained-with-examples/
- **Deployment with YAML — Medium**: https://medium.com/@kajals909/kubernetes-deployment-explained-with-hands-on-yaml-examples-50f0718721d8
- **Mirantis deployment guide**: https://www.mirantis.com/blog/introduction-to-yaml-creating-a-kubernetes-deployment/

## Video Tutorials

- **TechWorld with Nana — Full Kubernetes Course**: https://www.classcentral.com/course/youtube-kubernetes-tutorial-for-beginners-full-course-in-4-hours-108866
- **Kubernetes Zero to Hero 2025**: https://www.youtube.com/watch?v=MTHGoGUFpvE
- **Beginner to Pro Complete Course**: https://www.youtube.com/watch?v=2T86xAtR6Fo

---

## Key Takeaways

- Never run a lone Pod in production — always use a **Deployment**.
- Deployments manage ReplicaSets which manage Pods.
- Rolling updates replace old pods gradually → zero downtime.
- `kubectl rollout undo` = instant rollback.
- Scale with `--replicas` flag or update YAML and re-apply.

---

## Next Chapter
[Chapter 06 — Services & Networking →](../chapter-06-services/README.md)
