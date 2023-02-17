# stage 1
FROM node:alpine AS builder

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .
COPY decorate-angular-cli.js .
RUN pnpm install

COPY . .

RUN pnpm nx construct --build -m build
RUN pnpm nx hash

# stage 2
FROM nginx:alpine

COPY config/angular.conf /etc/nginx/angular.conf
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/security-headers.conf /etc/nginx/security-headers.conf

COPY --from=builder /app/dist/apps/host /usr/share/nginx/html

EXPOSE 80
