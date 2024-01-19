FROM node:14.15.4-alpine3.12

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app

COPY entrypoint.sh /home/node/app/entrypoint.sh

RUN chmod +x /home/node/app/entrypoint.sh

