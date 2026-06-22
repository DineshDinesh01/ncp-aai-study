# Deployment Operations Manual  
  
**Maintained by:** Intics AI | **Updated:** 2026-06-22  
  
---  
  
## Machine Access  
  
| Hostname  | IP               | SSH User  | Password          |  
|-----------|------------------|-----------|-------------------|  
| Bapple    | 192.168.10.245   | deploy    | deploy@123        |  
| Flash     | 192.168.10.248   | deploy    | deploy@123        |  
| Falcon    | 192.168.10.239   | deploy    | deploy@123        |  
| Spectre   | 192.168.10.240   | deploy    | Deploy@Zuci@2024  |  
| Tsar      | 192.68.10.241    | deploy    | April@321         |  
  
```bash  
ssh deploy@192.168.10.245```  
  
---  
  
## 192.168.10.245 — Bapple (ABB CDE Engine)  
  
### Containers  
  
| Container ID | Name               | Image                            | Ports             | Status    |  
|--------------|--------------------|----------------------------------|-------------------|-----------|  
| b9e2c7e867ed | abb-copilot-api    | zsubscription/abb-copilot-api:1.0| 8001→8000         | Up 4 weeks|  
| df28bf2d74c2 | rfp-elasticsearch  | elasticsearch:8.11.1             | 9200→9200         | Up (healthy)|  
| 741da8c83816 | rfp-kibana         | kibana:8.11.1                    | 5601→5601         | Up 4 weeks|  
  
> **Frontend** runs on the host (not Docker): `PORT=3002 npm run start` → http://192.168.10.245:3002  
  
### Frontend — Start / Restart  
  
```bash  
cd ~/intics-build/data/data/medical_overall_doc/workspace/abb/document-copilot/rfp-workflow/frontendPORT=3002 nohup npm run start > frontend.log 2>&1 &  
  
# Verify  
curl -s -o /dev/null -w "%{http_code}" http://localhost:3002   # expect 200  
# Kill if port busy  
fuser -k 3002/tcp```  
  
### Nginx (on Bapple)  
  
Config: `/etc/nginx/sites-available/default`  
  
**ABB app location block** (currently commented out):  
```nginx  
#    location /abb-document-copilot {  
#        proxy_pass http://192.168.10.245:3002/abb-document-copilot;  
#        proxy_set_header Host $host;  
#        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
#        proxy_set_header X-Real-IP $remote_addr;  
#        proxy_hide_header Cache-Control;  
#        proxy_pass_header Date;  
#        client_max_body_size 100M;  
#        proxy_read_timeout 1000s;  
#    }  
```  
  
Remove `#` to enable. Then:  
```bash  
sudo nginx -t                  # must show "syntax is ok"sudo systemctl reload nginx```  
  
---  
  
## 192.168.10.248 — Flash (Ryapte / Tata Project)  
  
### Containers  
  
| Container ID | Name               | Image                               | Ports       | Status     |  
|--------------|--------------------|-------------------------------------|-------------|------------|  
| dce384b7b6b6 | rfp-api            | zsubscription/ryapte-backend-v4     | 8000→8000   | Up 6 days  |  
| 24dfc82bd276 | rfp-frontend       | zsubscription/ryapte-frontend-v4    | 3000→3000   | Up 6 days  |  
| 9a91ddb00e21 | rfp-elasticsearch  | elasticsearch:8.11.1                | 9200→9200   | Up (healthy)|  
| 5def8ada8b56 | rfp-kibana         | kibana:8.11.1                       | 5601→5601   | Up 6 days  |  
| 6bc03acb2a8c | vision_embedding   | zsubscription/abb-iris-engine:1.0   | 8001→8001   | Up 9 days  |  
  
> **Access:** http://192.168.10.248:3000  
  
---  
  
## Common Commands  
  
```bash  
# Status  
docker ps  
  
# Logs  
docker logs -f --tail=100 <container-name>  
  
# Restart  
docker restart <container-name>  
  
# Elasticsearch health  
curl http://localhost:9200/_cluster/health?pretty  
```  
  
---  
  
## Troubleshooting  
  
| Symptom | Fix |  
|---------|-----|  
| 502 on `/abb-document-copilot` | Check frontend: `curl http://localhost:3002` — if down, restart it (see above) |  
| Container keeps restarting | `docker logs --tail=50 <name>` to find crash reason |  
| ES shows `yellow` status | Normal on single-node — no action needed. `red` = restart ES |  
| Port 3002 already in use | `fuser -k 3002/tcp` then restart frontend |