# stage 1
FROM node:alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .
COPY .npmrc .
RUN pnpm install
RUN pnpm run postinstall

COPY . .

RUN pnpm nx construct host --build -m build -e build --verbose
RUN pnpm nx hash --verbose

# stage 2
FROM nginx:alpine

COPY config/angular.conf /etc/nginx/angular.conf
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/security-headers.conf /etc/nginx/security-headers.conf

COPY --from=builder /app/dist/apps/host/browser /usr/share/nginx/html

EXPOSE 80
