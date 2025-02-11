#!/bin/bash
docker pull seungbeom97/flip-sync:latest
docker stop flip-sync || true
docker rm flip-sync || true
docker run -d \
  --name flip-sync \
  -p 3000:3000 \
  --env-file .env \
  --restart always \
  seungbeom97/flip-sync:latest 