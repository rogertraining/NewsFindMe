FROM node:16-slim

RUN apt-get update \
  npm install --global yarn

WORKDIR /newsfindme-api

COPY package.json package-lock.json /newsfindme-api/

RUN yarn

COPY . . 

USER node

CMD yarn dev