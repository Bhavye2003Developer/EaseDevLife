#!/bin/sh

cd frontend/
npm install

cd ../backend/
npm install

docker run -p 3000:3000 ghcr.io/browserless/chromium