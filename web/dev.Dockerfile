FROM nginx:alpine

COPY config/angular.conf /etc/nginx/angular.conf
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/security-headers.conf /etc/nginx/security-headers.conf

COPY ./dist/apps/host /usr/share/nginx/html

EXPOSE 80
