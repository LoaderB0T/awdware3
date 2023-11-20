# stage 1
FROM node:alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install

COPY . .

RUN pnpm nx construct host --build -m build --verbose
RUN pnpm nx hash --verbose

# stage 2
FROM nginx:alpine

COPY config/angular.conf /etc/nginx/angular.conf
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/security-headers.conf /etc/nginx/security-headers.conf

COPY --from=builder /app/dist/apps/host /usr/share/nginx/html

EXPOSE 80
