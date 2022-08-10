FROM node:16-alpine as builder

RUN npm i --location=global pnpm

WORKDIR /cunny

COPY package.json turbo.json pnpm-lock.yaml ./

COPY apps/server ./apps/server

RUN pnpm install

RUN pnpm build:server

FROM node:16-alpine

RUN npm i --location=global pnpm

COPY --from=builder /cunny/node_modules ./node_modules
COPY --from=builder /cunny/apps/server ./apps/server
COPY --from=builder /cunny/package.json ./

EXPOSE 4000

CMD ["pnpm", "start:server"]
