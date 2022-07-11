FROM node:16-alpine as builder

WORKDIR /usr/app

COPY package.json yarn.lock turbo.json .yarnrc.yml ./
COPY .yarn ./.yarn

COPY apps/server ./apps/server

RUN yarn install

RUN yarn build:server

EXPOSE 8080

CMD ["yarn", "start:server"]
