FROM node:16-slim

RUN apt-get update 

RUN mkdir -p /home/node/newsfindme-api/node_modules

WORKDIR /home/node/newsfindme-api

COPY package.json package-lock.json ./

RUN npm install

COPY . . 

USER node

EXPOSE 3000

CMD npm run dev