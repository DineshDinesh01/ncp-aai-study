# Chapter 07 — ConfigMaps & Secrets

> Official ConfigMap Docs: https://kubernetes.io/docs/concepts/configuration/configmap/
> Official Secrets Docs: https://kubernetes.io/docs/concepts/configuration/secret/

## What You Will Learn
- Externalise app configuration using ConfigMaps
- Store sensitive data using Secrets
- Inject config as environment variables or files
- Best practices for secret management

---

## 7.1 The Problem: Hardcoded Config in Images

Bad practice:
```dockerfile
ENV DB_HOST=prod-db.company.com
ENV DB_PORT=5432
ENV DB_PASSWORD=supersecret123
```

Problems:
- To change config, you must **rebuild the image**.
- Secrets are baked into the image — visible in image history.
- Same image can't run in dev + staging + prod without modification.

**Solution: ConfigMaps and Secrets** decouple config from code.

---

## 7.2 ConfigMap — Non-Sensitive Configuration

A **ConfigMap** stores key-value pairs of **non-sensitive** configuration.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_ENV: "production"
  APP_PORT: "8080"
  LOG_LEVEL: "info"
  DB_HOST: "postgres-service"
  DB_PORT: "5432"
```

```bash
kubectl apply -f configmap.yaml
kubectl get configmaps
kubectl describe configmap app-config
```

---

## 7.3 Using ConfigMap as Environment Variables

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: nginx:1.25
        envFrom:
        - configMapRef:
            name: app-config      # Inject ALL keys from ConfigMap as env vars
```

Or inject specific keys:
```yaml
        env:
        - name: MY_APP_ENV         # Env var name in container
          valueFrom:
            configMapKeyRef:
              name: app-config     # ConfigMap name
              key: APP_ENV         # Key in ConfigMap
```

---

## 7.4 Using ConfigMap as a File (Volume Mount)

Useful for config files like `nginx.conf`, `application.properties`:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-config
data:
  nginx.conf: |
    server {
        listen 80;
        location / {
            root /usr/share/nginx/html;
            index index.html;
        }
        location /health {
            return 200 'OK';
        }
    }
```

Mount it into a container:
```yaml
spec:
  containers:
  - name: nginx
    image: nginx:1.25
    volumeMounts:
    - name: config-volume
      mountPath: /etc/nginx/conf.d    # File appears here
  volumes:
  - name: config-volume
    configMap:
      name: nginx-config
```

---

## 7.5 Secret — Sensitive Configuration

A **Secret** is like a ConfigMap but for **sensitive data** (passwords, API keys, tokens).

> Secrets are base64-encoded in Kubernetes, NOT encrypted by default.
> For real encryption, use Sealed Secrets, HashiCorp Vault, or cloud KMS.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  # Values MUST be base64 encoded
  # echo -n "mypassword" | base64  → bXlwYXNzd29yZA==
  DB_PASSWORD: bXlwYXNzd29yZA==
  DB_USERNAME: YWRtaW4=
```

### Create base64 values:
```bash
echo -n "mypassword" | base64    # bXlwYXNzd29yZA==
echo -n "admin" | base64         # YWRtaW4=

# Decode to verify
echo "bXlwYXNzd29yZA==" | base64 --decode
```

### Create Secret from command line:
```bash
kubectl create secret generic db-secret \
  --from-literal=DB_PASSWORD=mypassword \
  --from-literal=DB_USERNAME=admin
```

---

## 7.6 Using Secrets as Environment Variables

```yaml
spec:
  containers:
  - name: app
    image: myapp:1.0
    env:
    - name: DATABASE_PASSWORD
      valueFrom:
        secretKeyRef:
          name: db-secret
          key: DB_PASSWORD
    - name: DATABASE_USER
      valueFrom:
        secretKeyRef:
          name: db-secret
          key: DB_USERNAME
```

Or inject all:
```yaml
    envFrom:
    - secretRef:
        name: db-secret
```

---

## 7.7 Complete Example: App with ConfigMap + Secret

`full-app.yaml`:
```yaml
# ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_ENV: production
  DB_HOST: postgres-service
  DB_PORT: "5432"
---
# Secret
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
type: Opaque
data:
  DB_PASSWORD: bXlwYXNzd29yZA==
---
# Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: nginx:1.25
        envFrom:
        - configMapRef:
            name: app-config
        - secretRef:
            name: app-secret
```

---

## 7.8 ConfigMap Commands Reference

```bash
# Create
kubectl apply -f configmap.yaml
kubectl create configmap my-config --from-literal=key=value
kubectl create configmap my-config --from-file=config.properties

# Read
kubectl get configmaps
kubectl describe configmap my-config
kubectl get configmap my-config -o yaml

# Delete
kubectl delete configmap my-config
```

## 7.9 Secret Commands Reference

```bash
# Create
kubectl create secret generic my-secret --from-literal=password=secret123
kubectl create secret generic my-secret --from-file=ssh-key=~/.ssh/id_rsa

# Read (values are base64 encoded in output)
kubectl get secrets
kubectl describe secret my-secret
kubectl get secret my-secret -o yaml

# Decode a secret value
kubectl get secret my-secret -o jsonpath='{.data.password}' | base64 --decode

# Delete
kubectl delete secret my-secret
```

---

## 7.10 Hands-On Lab

```bash
# Step 1: Create a ConfigMap
kubectl create configmap game-config \
  --from-literal=GAME_ENV=dev \
  --from-literal=MAX_PLAYERS=10

kubectl describe configmap game-config

# Step 2: Create a Secret
kubectl create secret generic game-secret \
  --from-literal=ADMIN_PASSWORD=secret999 \
  --from-literal=API_KEY=abcd1234efgh

kubectl describe secret game-secret

# Step 3: Deploy an app using both
cat > /tmp/configtest.yaml << 'EOF'
apiVersion: v1
kind: Pod
metadata:
  name: config-test
spec:
  containers:
  - name: test
    image: busybox
    command: ["sh", "-c", "env && sleep 3600"]
    envFrom:
    - configMapRef:
        name: game-config
    - secretRef:
        name: game-secret
EOF
kubectl apply -f /tmp/configtest.yaml

# Step 4: Check env vars are injected
kubectl exec config-test -- env | grep -E "GAME|MAX|ADMIN|API"

# Cleanup
kubectl delete pod config-test
kubectl delete configmap game-config
kubectl delete secret game-secret
```

---

## References & Further Reading

- **Official ConfigMaps docs**: https://kubernetes.io/docs/concepts/configuration/configmap/
- **Official Secrets docs**: https://kubernetes.io/docs/concepts/configuration/secret/
- **ConfigMaps & Secrets explained — Medium**: https://medium.com/@gudisagebi1/understanding-configmap-secrets-and-volumes-in-kubernetes-7d51b590336c
- **ConfigMaps Secrets guide — Gravitee**: https://www.gravitee.io/blog/kubernetes-configurations-secrets-configmaps
- **K8s for Beginners Part 3**: https://medium.com/@laxmanpajjuri/kubernetes-for-beginners-part-3-configmaps-secrets-storage-explained-5a4b99c0060f
- **Devtron ConfigMap & Secrets guide**: https://devtron.ai/blog/kubernetes-configmaps-secrets/
- **Preventing credential leaks**: https://oneuptime.com/blog/post/2025-11-27-configmaps-secrets/view

## Video Tutorials

- **TechWorld with Nana — Full K8s Course**: https://www.classcentral.com/course/youtube-kubernetes-tutorial-for-beginners-full-course-in-4-hours-108866
- **Complete K8s Beginner to Pro**: https://www.youtube.com/watch?v=2T86xAtR6Fo

---

## Key Takeaways

- **ConfigMap** = non-sensitive config (ports, hostnames, feature flags).
- **Secret** = sensitive config (passwords, tokens, keys) — base64 encoded, not encrypted.
- Both can be injected as **env vars** or **mounted as files**.
- Never hardcode config inside your Docker image.
- For real secret security, use **Vault** or **Sealed Secrets** on top of K8s Secrets.

---

## Next Chapter
[Chapter 08 — Storage & Volumes →](../chapter-08-storage/README.md)
