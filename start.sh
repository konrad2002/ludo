#!/bin/sh

cd /app/server
node dist/main.js &

cd /app/web-app
npm start &

nginx -g "daemon off;"