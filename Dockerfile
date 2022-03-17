FROM nginx:1.21.6-alpine

# Nginx config
COPY ./nginx.conf /etc/nginx/nginx.conf

# Web files
COPY ./src/* /usr/share/