1. Generate a Master Key once (run this once and save the output permanently):  
  cd copilot  
  python -c "from src.core.encryption.key_hierarchy import generate_master_key_b64; print(generate_master_key_b64())"  
  2. Update the deployment YAML with that key:  
  - name: ENCRYPTION_ENABLED  
    value: "true"  
  - name: ENCRYPTION_MASTER_KEY  
    value: "<the key you generated above>"  
  - name: ENCRYPTION_SESSION_UNLOCK_MODE  
    value: server  
  3. Run the backfill against the production Elasticsearch, using that same key, before deploying the server:  
  ENCRYPTION_ENABLED=True ENCRYPTION_MASTER_KEY=<key> \  
    python -m src.scripts.encryption.encrypt_backfill --confirm  
  4. Deploy the server. The startup log will show a line like:  
  [Startup:ENC] Provider loaded OK: aes256gcm / AES-256-GCM  
  5. If you see [Startup:ENC] Provider FAILED, the Master Key is wrong or missing.  
  6. Never change the Master Key after data has been encrypted. There is no safe way to re-key the data without running a full key rotation script.