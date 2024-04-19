#!/bin/sh

cd frontend/
npm install

cd ../backend/
npm install

docker run -p 3172:3000 ghcr.io/browserless/chromium