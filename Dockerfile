## docker build -t ghcr.io/maurisff/teste-automacao-build-workflows-github:latest .
FROM node:14.18.1-alpine AS builder

RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./
COPY babel.*.js ./
COPY tsconfig*.json ./

RUN npm i 

COPY ./src ./src
COPY ./scripts ./scripts

RUN npm run build

FROM node:14.18.1-alpine

WORKDIR /usr/app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm i --only=production

## We just need the build to execute the command
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["npm","start"]