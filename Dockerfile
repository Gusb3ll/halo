FROM node:16-alpine

WORKDIR /cunny

COPY package.json yarn.lock turbo.json .yarnrc.yml ./
COPY .yarn ./.yarn

COPY apps/server ./apps/server

RUN yarn install

EXPOSE 4000

RUN yarn build:server

CMD ["yarn", "start:server"]
