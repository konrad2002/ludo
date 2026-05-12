# FRONTWND
FROM node:20-alpine AS web-build

WORKDIR /app/web-app
COPY web-app/package*.json ./
RUN npm install

COPY web-app .
RUN npm run build


# BACKEND
FROM node:20-alpine AS server-build

WORKDIR /app/server
COPY server/package*.json ./
RUN npm install

COPY server .
RUN npm run build


# PROD IMAGE
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache nginx bash

COPY --from=web-build /app/web-app /app/web-app
COPY --from=server-build /app/server /app/server

RUN cd server && npm install --only=production
RUN cd web-app && npm install --only=production

COPY nginx.conf /etc/nginx/nginx.conf

COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]