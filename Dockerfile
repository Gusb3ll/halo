FROM node:18-alpine as builder

WORKDIR /cunny

COPY package.json yarn.lock turbo.json .yarnrc.yml ./
COPY .yarn ./.yarn

COPY apps/server ./apps/server

RUN yarn install

RUN yarn build:server

FROM node:18-alpine

COPY --from=builder /cunny/node_modules ./node_modules
COPY --from=builder /cunny/apps/server ./apps/server
COPY --from=builder /cunny/package.json ./

EXPOSE 8080

CMD ["yarn", "start:server"]
