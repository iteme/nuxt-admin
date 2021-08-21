FROM node:14-alpine

RUN mkdir -p /app/upload
COPY .nuxt /app/.nuxt
COPY server /app/server
COPY dist /app/dist
COPY node_modules /app/node_modules
COPY nuxt.config.ts /app/nuxt.config.ts
COPY package.json /app/package.json

WORKDIR /app

RUN apk update && apk add bash

EXPOSE 3031
CMD ["npm", "start"]