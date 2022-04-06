FROM nginx

WORKDIR /usr/newsfindme/

RUN mkdir /usr/newsfindme/css

RUN mkdir /usr/newsfindme/js

RUN mkdir /usr/newsfindme/img

RUN mkdir /usr/newsfindme/interfaces

# Nginx config
COPY ./nginx.conf /etc/nginx/nginx.conf

# Web files
COPY ./src/index.html .

COPY ./src/css/ ./css/

COPY ./src/img/ ./img/

COPY ./src/interfaces/ ./interfaces/ 

COPY ./src/js/ ./js/