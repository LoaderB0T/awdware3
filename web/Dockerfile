# stage 1

ARG skipBuild=false

FROM node:alpine AS builder

ENV YARN_CACHE_FOLDER=/tmp/yarn-cache

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY decorate-angular-cli.js .
RUN yarn install

COPY . .

RUN yarn nx run-many --target=build --projects=host,home,projects

# stage 2

FROM nginx:alpine

COPY config/angular.conf /etc/nginx/angular.conf
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/security-headers.conf /etc/nginx/security-headers.conf

COPY --from=builder /app/dist/apps/host /usr/share/nginx/html
COPY --from=builder /app/dist/apps/home /usr/share/nginx/html/assets/modules/home
COPY --from=builder /app/dist/apps/projects /usr/share/nginx/html/assets/modules/projects

EXPOSE 80
