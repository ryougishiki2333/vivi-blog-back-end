FROM node:16-alpine

WORKDIR /back-end

COPY . .

RUN npm i --registry=http://mirrors.cloud.tencent.com/npm/

RUN npm run build

