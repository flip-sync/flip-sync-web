#!/bin/bash
docker build -t flip-sync .
docker stop flip-sync || true
docker rm flip-sync || true
docker run -d --name flip-sync -p 3000:3000 flip-sync 